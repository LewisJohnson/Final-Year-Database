<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web
|--------------------------------------------------------------------------
|
| 1. Web (Accessible by any request)
| 2. Admin
| 	2.1. Any admin
| 	2.2. System admin
| 	2.3. Project admin
| 		2.3.1 Or staff
|		2.3.2 Or External Marker
|		2.3.3 Or External Marker Or Supervisor
| 3. Supervisor
| 4. Student
| 5. Authenticated user (Anyone who is logged in)
| 6. Authenticated or LDAP Guest
|
| Please follow the CRUD convention
| Verb		URI						Action		Route Name
| -------------------------------------------------------------
| GET		/photos					index		photos.index
| GET		/photos/create			create		photos.create
| POST		/photos					store		photos.store
| GET		/photos/{photo}			show		photos.show
| GET		/photos/{photo}/edit	edit		photos.edit
| PUT/PATCH	/photos/{photo}			update		photos.update
| DELETE	/photos/{photo}			destroy		photos.destroy
*/

if(env('APP_DEBUG')){	
	// This can be used to test mailables
	Route::get('/mailable', function () {
		$student = SussexProjects\Student::first();
		$supervisor = SussexProjects\Supervisor::first();
		$project = SussexProjects\Project::first();
		return new SussexProjects\Mail\StudentAccepted($supervisor, $student, $project);
	});
}

/* =============
   1. WEB
   ============= */

// WITH department check
Route::group(['middleware' => ['web', 'checkDepartment']], function() {
	/* LOGIN (AUTHENTICATION) */
	// Login form/view
	Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);

	// Perform login
	Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);

	/* ROOT */
	// Index page alias
	Route::get('index', 'HomeController@index');

	// Index page alias
	Route::get('home', 'HomeController@index');

	// Show home page (Default index route)
	Route::get('/', 'HomeController@index');

	/* HELP */
	// About page view
	Route::get('about', 'HomeController@about');

	// Help page view
	Route::get('help', 'HomeController@help');
});

// Without department check
Route::group(['middleware' => ['web']], function() {
	/* DEPARTMENT */
	// Set department view (Most users landing page)
	Route::get('set-department', 'HomeController@setDepartmentView');

	// Perform set department
	Route::post('set-department', 'HomeController@setDepartment');

	/* OTHER */
	// Get HTML code snippet
	Route::get('snippet', 'HomeController@snippet');

	// Teapot error code
	Route::get('teapot', function(){ abort(418, "I'm a teapot"); });

	// Feedback form
	Route::get('feedback', 'HomeController@showFeedbackForm');

	// Feedback form post
	Route::post('feedback', 'HomeController@feedback');
});

/* ================
   2. ADMIN
   ================ */

/* ===================================
   2.1. ANY ADMIN
   ================================== */
Route::group(['middleware' => ['web', 'admin', 'checkDepartment']], function() {

	// All users view
	Route::get('users', 'UserController@index');

	// All users by year view
	Route::get('users/by-year', 'UserController@byYear');

	// Create user view
	Route::get('users/create', 'UserController@create');

	// Store user POST
	Route::post('users', 'UserController@store');

	// Update user view
	Route::get('users/{user}/edit', 'UserController@edit');

	// Update user POST
	Route::patch('users/{user}', 'UserController@update');

	// User information
	Route::get('users/info', 'UserController@info');

	// Delete user POST
	Route::delete('users', 'UserController@destroy');
});

/* ===================================
   2.2. SYSTEM ADMIN
   ================================== */
Route::group(['middleware' => ['web', 'systemAdministrator', 'checkDepartment']], function() {

	// System admin dashboard
	Route::get('admin/dashboard', 'SystemAdminController@systemDashboardView');

	// Updated configuration post
	Route::post('admin/dashboard/system', 'SystemAdminController@updateSystemConfiguration');

	// Add new department
	Route::post('admin/system/new-department', 'SystemAdminController@newDepartment');

	// User agent view
	Route::get('system/user-agent', 'SystemAdminController@userAgentView');

	// User feedback view
	Route::get('admin/feedback', 'SystemAdminController@feedback');

	// User feedback view
	Route::delete('admin/feedback', 'SystemAdminController@destroyFeedback');

});

/* ========================
   2.3. PROJECT ADMIN
   ======================== */
Route::group(['middleware' => ['web', 'projectAdministrator', 'checkDepartment']], function() {

	// Admin hub
	Route::get('admin', 'ProjectAdminController@index');

	// Import student view
	Route::get('admin/students/import', 'StudentController@importStudentsView');

	// Import student form
	Route::post('admin/students/import', 'StudentController@importStudents');

	/* PROJECT EVALUATION */
	// Un-finalise Project evaluation
	Route::post('evaluation/{evaluation}/undo', 'ProjectEvaluationController@undoFinalise');

	// Creates all project evaluations at once
	Route::get('evaluation/create-all', 'ProjectEvaluationController@createAll');

	/* SUPERVISOR ARRANGMENTS */
	// Amend supervisor arrangements form
	Route::get('admin/supervisor/arrangements', 'ProjectAdminController@amendSupervisorArrangementsView');

	// Updated supervisor arrangements POST
	Route::post('admin/supervisor/arrangements', 'ProjectAdminController@amendSupervisorArrangements');

	/* SECOND MARKER */
	// Manual assign second marker view
	Route::get('admin/marker/manual', 'ProjectAdminController@manualSecondMarkerView');

	// Manual second marker assignment
	Route::patch('admin/marker/manual', 'ProjectController@updateSecondMarker');

	// Automatically assign second marker view
	Route::get('admin/marker/automatic', 'ProjectAdminController@computeSecondMarkerView');

	// Automatically assigned second markers table
	Route::get('admin/marker/automatic/preview', 'ProjectAdminController@automaticSecondMarkerPreview');

	// Marker report
	Route::get('admin/marker/report', 'ProjectAdminController@secondMarkerReport');

	// Perform automatic second marker assignment
	Route::post('admin/marker/calculate', 'ProjectAdminController@calculateSecondMarkers');

	/* LOGIN AS */
	// Login as another user view
	Route::get('admin/login-as', 'ProjectAdminController@loginAsView');

	// Perform login alias
	Route::get('admin/login-as/{id}', 'ProjectAdminController@loginAs');

	/* CONFIGURATION */
	// Global parameters configuration view
	Route::get('admin/parameters', 'ModeController@index');

	// Global parameters form post
	Route::post('admin/parameters', 'ModeController@update');

	// End-of-Year archive view
	Route::get('admin/archive', 'ProjectAdminController@archiveView');

	// Perform End-of-Year archive
	Route::post('admin/archive', 'ProjectAdminController@archive');

	/* TRANSACTIONS */
	// Transactions by time view
	Route::get('admin/transactions', 'TransactionController@index');

	// Transactions by project view
	Route::get('admin/transactions/by-project', 'TransactionController@byProject');

	/* TOPIC */
	// Update topic view
	Route::get('admin/topics', 'ProjectAdminController@amendTopicsView');

	// Store new topic
	Route::post('topics', 'TopicController@store');

	// Update topic
	Route::patch('topics', 'TopicController@update');

	// Delete topic
	Route::delete('topics', 'TopicController@destroy');

	/* PROGRAMME */
	// Update topic view
	Route::get('admin/programmes', 'ProjectAdminController@amendProgrammesView');

	// Store new topic
	Route::post('programmes', 'ProgrammeController@store');

	// Update topic
	Route::patch('programmes', 'ProgrammeController@update');

	// Delete topic
	Route::delete('programmes', 'ProgrammeController@destroy');

	/* STUDENT */
	// Store new student POST
	Route::post('students', 'StudentController@store');

	/* PROJECT EVALUATION */
	// Manual finalisation view
	Route::get('/evaluations/finalise', 'ProjectEvaluationController@manualFinaliseView');

	// Manual finalisation
	Route::post('/evaluations/finalise', 'ProjectEvaluationController@manualFinalise');
});

/* =================================
   2.3.1 PROJECT ADMIN OR STAFF
   ================================= */
Route::group(['middleware' => ['web', 'staffOrProjectAdmin', 'checkDepartment']], function() {
	// Student Report
	Route::get('admin/export-student-summary', 'ProjectAdminController@exportStudentSummary');

	// Student Report
	Route::get('reports/student', 'StudentController@report');

	// Swap second marker view
	Route::get('admin/marker/swap', 'ProjectAdminController@swapSecondMarkerView');

	// Swap second marker POST
	Route::patch('admin/marker/swap', 'ProjectAdminController@swapSecondMarker');

	// Export second marker data view
	Route::get('admin/marker/export', 'ProjectAdminController@exportSecondMarkerDataView');

	// Export marker data
	Route::get('admin/marker/export-download', 'ProjectAdminController@exportSecondMarkerData');

	// Export second marker data view
	Route::get('/evaluations/amend-canvas-urls', 'ProjectEvaluationController@amendCanvasUrlsView');

	Route::post('/evaluations/amend-canvas-urls', 'ProjectEvaluationController@amendCanvasUrls');
});

/* =================================
   2.3.2 PROJECT ADMIN OR EXTERNAL MARKER
   ================================= */
Route::group(['middleware' => ['web', 'externalMarkerOrProjectAdmin', 'checkDepartment']], function() {
	/* PROJECT EVALUATION */
	// Project evaluation
	Route::get('reports/evaluations', 'ProjectEvaluationController@index');

	// All project evaluation data
	Route::get('/evaluations/all', 'ProjectEvaluationController@all');

	// Export project evaluation data
	Route::get('reports/evaluations/export', 'ProjectEvaluationController@export');

	// Student Feedback
	Route::get('/evaluations/student-feedback', 'ProjectEvaluationController@studentFeedback');

	// Export Student Feedback
	Route::get('/evaluations/student-feedback/export', 'ProjectEvaluationController@exportStudentFeedback');
});

/* =================================
   2.3.3 PROJECT ADMIN OR EXTERNAL MARKER OR SUPERVISOR
   ================================= */
Route::group(['middleware' => ['web', 'externalMarkerOrProjectAdminOrSupervisor', 'checkDepartment']], function() {
	/* PROJECT EVALUATION */
	// Project evaluation
	Route::get('projects/{project}/evaluation', 'ProjectEvaluationController@show');
});

/* =================
   3. SUPERVISOR
   ================= */
Route::group(['middleware' => ['web', 'supervisor', 'checkDepartment']], function() {
	// Project popularity
	Route::get('supervisor/project-popularity', 'SupervisorController@projectPopularity');

	// Receive emails form
	Route::patch('supervisor/receive-emails', 'SupervisorController@receiveEmails');

	// Accepted student table (Used with AJAX)
	Route::get('supervisor/accepted-students-table', 'SupervisorController@acceptedStudentsTable');

	// Accept student for their selected project
	Route::post('supervisor/student-accept', 'SupervisorController@acceptStudent');

	// Reject student for their selected project
	Route::post('supervisor/student-reject', 'SupervisorController@rejectStudent');

	// Undo student's accepted project
	Route::patch('supervisor/student-undo', 'SupervisorController@undoStudent');

	// Update project evaluation
	Route::patch('projects/{project}/evaluation', 'ProjectEvaluationController@update');

	// Submit project evaluation group
	Route::patch('projects/{project}/evaluation/submit/{group}', 'ProjectEvaluationController@submitGroup');

	// Unsubmit project evaluation group
	// Note: The only reason this is a GET is because we can't have a <form> in another <form> in the view
	Route::get('projects/{project}/evaluation/unsubmit/{group}', 'ProjectEvaluationController@unsubmitGroup');

	// Finalise project evaluation
	Route::patch('projects/{project}/evaluation/finalise', 'ProjectEvaluationController@finalise');

	// Defer project evaluation
	Route::post('projects/{evaluation}/evaluation/defer', 'ProjectEvaluationController@defer');

	// Undefer project evaluation
	Route::post('projects/{evaluation}/evaluation/undefer', 'ProjectEvaluationController@undefer');
});

/* =================
   4. STUDENT
   ================= */
Route::group(['middleware' => ['web', 'student', 'checkDepartment']], function() {
	// Propose project view
	Route::get('students/project/propose', 'StudentController@proposeProjectView');

	// Propose project POST
	Route::post('students/project/propose', 'StudentController@proposeProject');

	// Propose existing project view
	Route::get('students/project/propose-existing/{project}', 'StudentController@proposeExistingProjectView');

	// Propose existing project POST
	Route::post('students/project/propose-existing', 'StudentController@proposeExistingProject');

	// Project selection
	Route::patch('students/project/select', 'StudentController@selectProject');

	// Undo selected project
	Route::patch('students/project/undo', 'StudentController@undoSelectedProject');

	// Share name with other student
	Route::patch('students/share-name', 'StudentController@shareName');

	// Add project to favourites
	Route::patch('students/favourites/add', 'StudentController@addFavouriteProject');

	// Remove project from favourites
	Route::patch('students/favourites/remove', 'StudentController@removeFavouriteProject');
});

/* ============================
   5. AUTHENTICATED USER
   ============================ */
Route::group(['middleware' => ['web', 'auth', 'checkDepartment']], function() {

	/* PROJECT */
	// Store new project POST
	Route::post('projects', 'ProjectController@store');

	// Delete project
	Route::delete('projects/{project}', 'ProjectController@destroy');

	// Update project
	Route::patch('projects/{project}/edit', 'ProjectController@update');

	// Copy project
	Route::post('projects/{project}/copy', 'ProjectController@copy');

	// New project form
	Route::get('projects/create', 'ProjectController@create');

	// Show update project form
	Route::get('projects/{project}/edit', 'ProjectController@edit');

	// Check already used project title
	Route::post('projects/check-title', 'ProjectController@projectNameAlreadyExists');

	// Convert html using purify
	Route::post('projects/description-preview', 'ProjectController@projectDescriptionPreview');

	/* PROJECT TOPIC */
	// Add topic to project
	Route::post('projects/topic-add', 'ProjectController@addTopic');

	// Remove topic from project
	Route::patch('projects/topic-remove', 'ProjectController@removeTopic');

	// Update project primary topic
	Route::patch('projects/topic-update-primary', 'ProjectController@updatePrimaryTopic');

	/* REPORT */
	// Supervisor report
	Route::get('reports/supervisor', 'SupervisorController@report');
});

Route::group(['middleware' => ['web', 'auth']], function() {
	// Perform logout
	Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);
});

/* ===============================
   6. AUTHENTICATED OR LDAP GUESTS
================================== */
Route::group(['middleware' => ['web', 'ldapGuest', 'checkDepartment']], function() {

	/* USER */
	Route::get('users/{user}/projects', 'UserController@projects');

	/* PROJECT */
	// Project page
	Route::get('projects', 'ProjectController@index');

	// Projects by Supervisor
	Route::get('projects/by-supervisor', 'ProjectController@showSupervisors');

	// Projects by Topic
	Route::get('projects/by-topic', 'ProjectController@showTopics');

	// All projects with this topic
	Route::get('projects/by-topic/{topic}', 'ProjectController@byTopic');

	// Project search
	Route::get('projects/search', 'ProjectController@search');

	// Everything search
	Route::get('/search', 'HomeController@search');

	// Show project
	Route::get('projects/{project}', 'ProjectController@show');
});