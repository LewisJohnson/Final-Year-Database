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

/* =============
   1. WEB ROUTES
   ============= */
Route::group(['middleware' => ['web', 'checkDepartment']], function() {
	// Login Routes
	Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);
	Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);
	Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);

	// Root Routes
	Route::get('index', 'HomeController@index');
	Route::get('home', 'HomeController@index');
	Route::get('/', 'HomeController@index');

	// Help Routes
	Route::get('information', 'HomeController@information');
	Route::get('about', 'HomeController@about');
	Route::get('help', 'HomeController@help');

	Route::get('admin/system/new-department', 'AdminController@addNewDepartment');

});

Route::group(['middleware' => ['web']], function() {
	Route::get('set-department', 'HomeController@setDepartmentView');
	Route::post('set-department', 'HomeController@setDepartment');

	Route::get('snippet', 'HomeController@snippet');

	// Easter-egg
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
	Route::get('admin', 'AdminController@index');

	Route::get('admin/students/import', 'AdminController@importStudents');

	Route::get('admin/supervisor-arrangements-amend', 'AdminController@amendSupervisorArrangementsView');
	Route::patch('admin/supervisor-arrangements-amend', 'AdminController@amendSupervisorArrangements');

	Route::get('admin/marker-assign-manual', 'AdminController@assignMarkerManualView');
	Route::get('admin/marker-assign-automatic', 'AdminController@assignMarkerAutomaticView');
	Route::get('admin/marker-assign-automatic-table', 'AdminController@assignMarkerAutomaticTable');
	Route::get('admin/marker-assign-report-table', 'AdminController@assignMarkerReportTable');
	Route::post('admin/marker-calculate', 'AdminController@calculateSecondMarkers');

	Route::patch('admin/marker-assign', 'StudentController@updateSecondMarker');

	Route::get('admin/topics-amend', 'AdminController@amendTopicsView');

	Route::get('admin/login-as', 'AdminController@loginAsView');
	Route::get('admin/login-as/{id}', 'AdminController@loginAs');

	Route::get('admin/archive', 'AdminController@archiveView');
	Route::post('admin/archive', 'AdminController@archive');

	Route::get('admin/parameters', 'AdminController@parameters');

	Route::get('admin/transactions', 'TransactionController@index');
	Route::get('admin/transactions/by-project', 'TransactionController@byProject');

	// Topic routes
	Route::post('topics', 'TopicController@store');
	Route::patch('topics', 'TopicController@update');
	Route::delete('topics', 'TopicController@destroy');

	/* ==============
	   STUDENT ROUTES
	   ============== */
	Route::post('students', 'StudentController@store');
});

/* ===================================
   4. PROJECT AND SYSTEM ADMIN ROUTES
   ================================== */

Route::group(['middleware' => ['web', 'admin', 'checkDepartment']], function() {
	Route::resource('users', 'UserController');
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


	// Supervisor
	Route::get('supervisor', 'SupervisorController@index');

	Route::get('supervisor/project-report', 'SupervisorController@projectReport');

	Route::get('supervisor/accepted-students-table', 'SupervisorController@acceptedStudentTable');

	// Project offers
	Route::post('supervisor/student-accept', 'SupervisorController@acceptStudent');
	Route::post('supervisor/student-reject', 'SupervisorController@rejectStudent');
	Route::patch('supervisor/student-undo', 'SupervisorController@undoStudent');
});

/* =================
   7. STUDENT ROUTES
   ================= */
Route::group(['middleware' => ['web', 'student', 'checkDepartment']], function() {
	Route::get('students/project-propose', 'StudentController@proposeProjectView');
	Route::post('students/project-propose', 'StudentController@proposeProject');
	Route::patch('students/project-select', 'StudentController@selectProject');

	Route::patch('students/share-name', 'StudentController@shareName');

	Route::patch('students/add-favourite', 'StudentController@addFavouriteProject');
	Route::patch('students/remove-favourite', 'StudentController@removeFavouriteProject');
});


/* ============================
   8. AUTHENTICATED USER ROUTES
   ============================ */
Route::group(['middleware' => ['web', 'auth', 'checkDepartment']], function() {

	Route::get('users/{user}/projects', 'UserController@projects');

	// Project
	Route::get('projects', 'ProjectController@index');
	Route::post('projects', 'ProjectController@store');
	Route::get('projects/create', 'ProjectController@create');

	// Projects by Supervisor
	Route::get('projects/by-supervisor', 'ProjectController@showSupervisors');

	// Projects by Topic
	Route::get('projects/by-topic', 'ProjectController@showTopics');
	Route::get('projects/by-topic/{uuid}', 'ProjectController@byTopic');

	// // Project search
	Route::get('projects/search', 'ProjectController@search');

	// Project edit topic routes
	Route::post('projects/topic-add', 'ProjectController@addTopic');
	Route::delete('projects/topic-remove', 'ProjectController@removeTopic');
	Route::patch('projects/topic-update-primary', 'ProjectController@updatePrimaryTopic');

	Route::get('projects/{uuid}', 'ProjectController@show');
	Route::delete('projects/{uuid}/delete', 'ProjectController@destroy');
	Route::patch('projects/{uuid}/edit', 'ProjectController@update');
	Route::get('projects/{uuid}/edit', 'ProjectController@edit');

	// Supervisor report
	Route::get('reports/supervisor', 'SupervisorController@report');
});
