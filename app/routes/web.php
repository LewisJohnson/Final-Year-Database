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
| The following language lines are used throughout the application for
| messages we need to display to the user. You are free to modify the
| language lines according to your application's requirements.
|
| 1. Web Routes (Accessible by any request)
| 2. System admin routes
| 3. Project admin routes
| 4. Project and system admin routes
| 5. Project admin and system admin and supervisor routes
| 6. Supervisor routes
| 7. Student routes
| 8. Authenticated User routes (Anyone who is logged in)
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

Route::get('/mailable', function () {
    $student = SussexProjects\Student::all()->first();
    $supervisor = SussexProjects\Supervisor::all()->first();
    return new SussexProjects\Mail\StudentSelected($supervisor, $student);
});

/* =============
   1. WEB ROUTES
   ============= */
Route::group(['middleware' => ['web', 'checkDepartment']], function() {
	/* LOGIN ROUTES (AUTHENTICATION) */
	// Login form/view
	Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);

	// Perform login
	Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);

	// Perform logout
	Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);

	/* ROOT ROUTES */
	// Index page alias
	Route::get('index', 'HomeController@index');

	// Index page alias
	Route::get('home', 'HomeController@index');

	// Show home page (Default index route)
	Route::get('/', 'HomeController@index');

	/* HELP ROUTES */
	// Information page view
	Route::get('information', 'HomeController@information');

	// About page view
	Route::get('about', 'HomeController@about');

	// Help page view
	Route::get('help', 'HomeController@help');
});

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
});

/* ===============
   2. SYSTEM ADMIN ROUTES
   =============== */
Route::group(['middleware' => ['web', 'admin.system', 'checkDepartment']], function() {
	Route::get('admin/dashboard', 'AdminController@dashboard');
	Route::post('admin/dashboard/system', 'AdminController@configure');

	Route::post('admin/system/new-department', 'AdminController@addNewDepartment');

	Route::get('system/user-agent', 'AdminController@userAgentView');
});

/* ===============
   3. PROJECT ADMIN ROUTES
   =============== */
Route::group(['middleware' => ['web', 'admin.project', 'checkDepartment', 'adminPrivilegeCheck']], function() {
	
	// Admin hub
	Route::get('admin', 'AdminController@index');

	// Import student view
	Route::get('admin/students/import', 'AdminController@importStudentsView');

	// Import student form
	Route::post('admin/students/import', 'AdminController@importStudents');

	/* SUPERVISOR ARRANGMENTS ROUTES */
	// Amend supervisor arrangements form
	Route::get('admin/supervisor-arrangements-amend', 'AdminController@amendSupervisorArrangementsView');

	// Updated supervisor arrangements POST
	Route::patch('admin/supervisor-arrangements-amend', 'AdminController@amendSupervisorArrangements');

	/* SECOND SUPERVISOR (Marker) ROUTES */
	// Manual assign second marker view
	Route::get('admin/marker-assign-manual', 'AdminController@assignMarkerManualView');

	// Automatically assign second marker view
	Route::get('admin/marker-assign-automatic', 'AdminController@assignMarkerAutomaticView');

	// Automatically assigned second markers table
	Route::get('admin/marker-assign-automatic-table', 'AdminController@assignMarkerAutomaticTable');

	// Marker report
	Route::get('admin/marker-assign-report-table', 'AdminController@assignMarkerReportTable');

	// Perform automatic second marker assignment
	Route::post('admin/marker-calculate', 'AdminController@calculateSecondMarkers');

	// Manually assign second marker
	Route::patch('admin/marker-assign', 'StudentController@updateSecondMarker');

	/* LOGIN AS ROUTES */
	// Login as another user view
	Route::get('admin/login-as', 'AdminController@loginAsView');

	// Perform login alias
	Route::get('admin/login-as/{id}', 'AdminController@loginAs');

	/* CONFIGURATION ROUTES */
	// Yearly parameters configuration view
	Route::get('admin/parameters', 'AdminController@amendParametersView');

	// Yearly parameters form post
	Route::post('admin/parameters', 'AdminController@amendParameters');

	// End-of-Year archive view
	Route::get('admin/archive', 'AdminController@archiveView');

	// Perform End-of-Year archive
	Route::post('admin/archive', 'AdminController@archive');

	/* TRANSACTIONS ROUTES */
	// Transactions by time view
	Route::get('admin/transactions', 'TransactionController@index');

	// Transactions by project view
	Route::get('admin/transactions/by-project', 'TransactionController@byProject');

	/* TOPIC ROUTES */
	// Store new topic
	Route::post('topics', 'TopicController@store');

	// Update topic view
	Route::get('admin/topics-amend', 'AdminController@amendTopicsView');

	// Update topic
	Route::patch('topics', 'TopicController@update');

	// Delete topic
	Route::delete('topics', 'TopicController@destroy');

	/* STUDENT ROUTES */
	// Store new student POST
	Route::post('students', 'StudentController@store');
});

/* ===================================
   4. PROJECT AND SYSTEM ADMIN ROUTES
   ================================== */

Route::group(['middleware' => ['web', 'admin', 'checkDepartment']], function() {

	Route::get('users', 'UserController@index');
	Route::get('users/create', 'UserController@create');

	Route::post('users', 'UserController@store');
	Route::get('users/{user}/edit', 'UserController@edit');
	Route::post('users/{user}', 'UserController@update');
	Route::delete('users/{user}', 'UserController@destory');
});

/* ==============================
   5. SUPERVISOR AND ADMIN ROUTES
   ============================== */
Route::group(['middleware' => ['web', 'supervisor.admin', 'checkDepartment']], function() {
	// Project Transaction
	Route::get('projects/{id}/transactions', 'ProjectController@transactions');

	// Student Report
	Route::get('reports/student', 'StudentController@report');
});

/* =================
   6. SUPERVISOR ROUTES
   ================= */
Route::group(['middleware' => ['web', 'supervisor', 'checkDepartment']], function() {

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

	Route::get('users/{user}/projects', 'UserController@projects');

	/* PROJECT ROUTES */
	// Project page
	Route::get('projects', 'ProjectController@index');

	// Store new project POST
	Route::post('projects', 'ProjectController@store');

	// New project form
	Route::get('projects/create', 'ProjectController@create');

	// Projects by Supervisor
	Route::get('projects/by-supervisor', 'ProjectController@showSupervisors');

	// Projects by Topic
	Route::get('projects/by-topic', 'ProjectController@showTopics');

	// All projects with this topic
	Route::get('projects/by-topic/{uuid}', 'ProjectController@byTopic');

	// Project search
	Route::get('projects/search', 'ProjectController@search');

	/* PROJECT TOPIC ROUTES */
	// Add topic to project
	Route::post('projects/topic-add', 'ProjectController@addTopic');

	// Remove topic from project
	Route::delete('projects/topic-remove', 'ProjectController@removeTopic');

	// Update project primary topic
	Route::patch('projects/topic-update-primary', 'ProjectController@updatePrimaryTopic');

	// Show project with this id
	Route::get('projects/{project}', 'ProjectController@show');

	// Delete project with this id
	Route::delete('projects/{uuid}/delete', 'ProjectController@destroy');

	// Update project with this id
	Route::patch('projects/{uuid}/edit', 'ProjectController@update');

	// Show update project form
	Route::get('projects/{uuid}/edit', 'ProjectController@edit');

	/* REPORT ROUTES */
	// Supervisor report
	Route::get('reports/supervisor', 'SupervisorController@report');
});
