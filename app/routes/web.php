<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| 1. Web Routes (Accessible by any request)
| 2. System admin routes
| 3. Project admin routes
| 4. Any admin routes
| 5. Project admin or staff routes
| 6. Supervisor routes
| 7. Student routes
| 8. Authenticated user routes (Anyone who is logged in)
| 9. Authenticated or LDAP Guest
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

// This can be used to test mailables
// Route::get('/mailable', function () {
// 	$student = SussexProjects\Student::all()->first();
// 	$supervisor = SussexProjects\Supervisor::all()->first();
// 	$project = SussexProjects\Project::all()->first();
// 	return new SussexProjects\Mail\SupervisorEditedProposedProject($supervisor, $student, $project);
// });

/* =============
   1. WEB ROUTES
   ============= */

// WITH department check
Route::group(['middleware' => ['web', 'checkDepartment']], function() {
	/* LOGIN ROUTES (AUTHENTICATION) */
	// Login form/view
	Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);

	// Perform login
	Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);

	/* ROOT ROUTES */
	// Index page alias
	Route::get('index', 'HomeController@index');

	// Index page alias
	Route::get('home', 'HomeController@index');

	// Show home page (Default index route)
	Route::get('/', 'HomeController@index');

	/* HELP ROUTES */
	// About page view
	Route::get('about', 'HomeController@about');

	// Help page view
	Route::get('help', 'HomeController@help');
});

// Without department check
Route::group(['middleware' => ['web']], function() {
	/* DEPARTMENT ROUTES */
	// Set department view (Most users landing page)
	Route::get('set-department', 'HomeController@setDepartmentView');

	// Perform set department
	Route::post('set-department', 'HomeController@setDepartment');

	/* OTHER ROUTES */
	// Get HTML code snippet
	Route::get('snippet', 'HomeController@snippet');

	// Teapot error code
	Route::get('teapot', function(){ abort(418, "I'm a teapot"); });

	// Feedback form
	Route::get('feedback', 'HomeController@showFeedbackForm');

	// Feedback form post
	Route::post('feedback', 'HomeController@feedback');
});

/* ===============
   2. SYSTEM ADMIN ROUTES
   =============== */
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
   3. PROJECT ADMIN ROUTES
   ======================== */
Route::group(['middleware' => ['web', 'projectAdministrator', 'checkDepartment', 'adminPrivilegeCheck']], function() {
	
	// Admin hub
	Route::get('admin', 'ProjectAdminController@index');

	// Import student view
	Route::get('admin/students/import', 'StudentController@importStudentsView');

	// Import student form
	Route::post('admin/students/import', 'StudentController@importStudents');

	/* SUPERVISOR ARRANGMENTS ROUTES */
	// Amend supervisor arrangements form
	Route::get('admin/supervisor-arrangements-amend', 'ProjectAdminController@amendSupervisorArrangementsView');

	// Updated supervisor arrangements POST
	Route::post('admin/supervisor-arrangements-amend', 'ProjectAdminController@amendSupervisorArrangements');

	/* SECOND SUPERVISOR (Marker) ROUTES */
	// Manual assign second marker view
	Route::get('admin/marker-assign-manual', 'ProjectAdminController@manualSecondMarkerView');

	// Automatically assign second marker view
	Route::get('admin/marker-assign-automatic', 'ProjectAdminController@computeSecondMarkerView');

	// Automatically assigned second markers table
	Route::get('admin/marker-assign-automatic-table', 'ProjectAdminController@assignSecondMarkerAutomaticTable');

	// Marker report
	Route::get('admin/marker-assign-report-table', 'ProjectAdminController@assignSecondMarkerReportTable');

	// Perform automatic second marker assignment
	Route::post('admin/marker-calculate', 'ProjectAdminController@calculateSecondMarkers');

	// Manually assign second marker
	Route::patch('admin/marker-assign', 'StudentController@updateSecondMarker');

	/* LOGIN AS ROUTES */
	// Login as another user view
	Route::get('admin/login-as', 'ProjectAdminController@loginAsView');

	// Perform login alias
	Route::get('admin/login-as/{id}', 'ProjectAdminController@loginAs');

	/* CONFIGURATION ROUTES */
	// Yearly parameters configuration view
	Route::get('admin/parameters', 'ProjectAdminController@amendParametersView');

	// Yearly parameters form post
	Route::post('admin/parameters', 'ProjectAdminController@amendParameters');

	// End-of-Year archive view
	Route::get('admin/archive', 'ProjectAdminController@archiveView');

	// Perform End-of-Year archive
	Route::post('admin/archive', 'ProjectAdminController@archive');

	/* TRANSACTIONS ROUTES */
	// Transactions by time view
	Route::get('admin/transactions', 'TransactionController@index');

	// Transactions by project view
	Route::get('admin/transactions/by-project', 'TransactionController@byProject');

	/* TOPIC ROUTES */
	// Update topic view
	Route::get('admin/topics-amend', 'ProjectAdminController@amendTopicsView');

	// Store new topic
	Route::post('topics', 'TopicController@store');

	// Update topic
	Route::patch('topics', 'TopicController@update');

	// Delete topic
	Route::delete('topics', 'TopicController@destroy');

	/* PROGRAMME ROUTES */
	// Update topic view
	Route::get('admin/programmes-amend', 'ProjectAdminController@amendProgrammesView');

	// Store new topic
	Route::post('programmes', 'ProgrammeController@store');

	// Update topic
	Route::patch('programmes', 'ProgrammeController@update');

	// Delete topic
	Route::delete('programmes', 'ProgrammeController@destroy');

	/* STUDENT ROUTES */
	// Store new student POST
	Route::post('students', 'StudentController@store');
});

/* ===================================
   4. PROJECT OR SYSTEM ADMIN ROUTES
   ================================== */
Route::group(['middleware' => ['web', 'admin', 'checkDepartment']], function() {

	// All users view
	Route::get('users', 'UserController@index');

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

/* =================================
   5. PROJECT ADMIN OR STAFF ROUTES
   ================================= */
Route::group(['middleware' => ['web', 'staffOrProjectAdmin', 'checkDepartment']], function() {

	// Student Report
	Route::get('reports/student', 'StudentController@report');

	// Swap second marker view
	Route::get('admin/marker-swap', 'ProjectAdminController@swapSecondMarkerView');

	// Swap second marker POST
	Route::patch('admin/marker-swap', 'ProjectAdminController@swapSecondMarker');

	// Export marker data view
	Route::get('admin/marker-export', 'ProjectAdminController@exportSecondMarkerDataView');

	// Export marker data
	Route::get('admin/marker-export-download', 'ProjectAdminController@exportSecondMarkerData');
});

/* =================
   6. SUPERVISOR ROUTES
   ================= */
Route::group(['middleware' => ['web', 'supervisor', 'checkDepartment']], function() {
	// Project popularity
	Route::get('supervisor/project-popularity', 'SupervisorController@projectPopularity');

	// Receive emails form
	Route::patch('supervisor/receive-emails', 'SupervisorController@receiveEmails');

	// Project report view
	Route::get('supervisor/project-report', 'SupervisorController@projectReport');

	// Accepted student table (Used with AJAX)
	Route::get('supervisor/accepted-students-table', 'SupervisorController@acceptedStudentTable');

	// Accept student for their selected project
	Route::post('supervisor/student-accept', 'SupervisorController@acceptStudent');

	// Reject student for their selected project
	Route::post('supervisor/student-reject', 'SupervisorController@rejectStudent');

	// Undo student's accepted project
	Route::patch('supervisor/student-undo', 'SupervisorController@undoStudent');
});

/* =================
   7. STUDENT ROUTES
   ================= */
Route::group(['middleware' => ['web', 'student', 'checkDepartment']], function() {
	// Propose project view
	Route::get('students/project-propose', 'StudentController@proposeProjectView');

	// Propose project POST
	Route::post('students/project-propose', 'StudentController@proposeProject');

	// Propose existing project view
	Route::get('students/project-propose-existing/{project}', 'StudentController@proposeExistingProjectView');

	// Propose existing project POST
	Route::post('students/project-propose-existing', 'StudentController@proposeExistingProject');

	// Project selection
	Route::patch('students/project-select', 'StudentController@selectProject');

	// Undo selected project
	Route::patch('students/undo-selected-project', 'StudentController@undoSelectedProject');

	// Share name with other student
	Route::patch('students/share-name', 'StudentController@shareName');

	// Add project to favourites
	Route::patch('students/add-favourite', 'StudentController@addFavouriteProject');

	// Remove project from favourites
	Route::patch('students/remove-favourite', 'StudentController@removeFavouriteProject');
});


/* ============================
   8. AUTHENTICATED USER ROUTES
   ============================ */
Route::group(['middleware' => ['web', 'auth', 'checkDepartment']], function() {

	/* PROJECT ROUTES */
	// Store new project POST
	Route::post('projects', 'ProjectController@store');

	// Delete project
	Route::delete('projects/{project}', 'ProjectController@destroy');

	// Update project 
	Route::patch('projects/{project}/edit', 'ProjectController@update');

	// New project form
	Route::get('projects/create', 'ProjectController@create');

	// Show update project form
	Route::get('projects/{project}/edit', 'ProjectController@edit');

	// Check already used project title
	Route::post('projects/check-title', 'ProjectController@projectNameAlreadyExists');

	// Convert html using purify
	Route::post('projects/description-preview', 'ProjectController@projectDescriptionPreview');

	/* PROJECT TOPIC ROUTES */
	// Add topic to project
	Route::post('projects/topic-add', 'ProjectController@addTopic');

	// Remove topic from project
	Route::patch('projects/topic-remove', 'ProjectController@removeTopic');

	// Update project primary topic
	Route::patch('projects/topic-update-primary', 'ProjectController@updatePrimaryTopic');

	/* REPORT ROUTES */
	// Supervisor report
	Route::get('reports/supervisor', 'SupervisorController@report');
});
	
/* ===============================
   9. AUTHENTICATED OR LDAP GUESTS
================================== */
Route::group(['middleware' => ['web', 'ldapGuest', 'checkDepartment']], function() {

	/* USER ROUTES */
	Route::get('users/{user}/projects', 'UserController@projects');

	/* PROJECT ROUTES */
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

	// Show project
	Route::get('projects/{project}', 'ProjectController@show');
});

Route::group(['middleware' => ['web', 'auth']], function() {
	// Perform logout
	Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);
});
