<?php

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
| 2. Admin Routes (UG and Msc Admin)
| 3. Supervisor And Admin Routes (UG/Msc Admin/Supervisor)
| 4. Student Routes (UG and Msc Students)
| 5. Authenticated User Routes (Anyone who is logged in)
|
*/

/* =============
   1. WEB ROUTES
   ============= */
Route::group(['middleware' => ['web']], function() {

	Route::get('authenticaion-change', 'Auth\AuthController@show');

	// Login Routes
	Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);
	Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);
	Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);

	// Root Routes
	Route::get('/', 'HomeController@index');
	Route::get('index', 'HomeController@index');
	Route::get('home', 'HomeController@index');
	Route::get('information', 'HomeController@information');
	Route::get('about', 'HomeController@about');
	Route::get('help', 'HomeController@help');
});

/* ===============
   2. ADMIN ROUTES
   =============== */
Route::group(['middleware' => ['web', 'admin']], function() {
	Route::get('admin', 'AdminController@index');

	Route::get('admin/students/import', 'AdminController@importStudents');
	Route::get('admin/supervisor-arrangements-amend', 'AdminController@amendSupervisorArrangements');

	Route::get('admin/marker-assign', 'AdminController@showAssignMarker');
	Route::patch('admin/marker-assign', 'StudentController@updateMarker');

	Route::get('admin/topics-amend', 'AdminController@amendTopics');
	Route::get('admin/login-as', 'AdminController@loginAsView');
	Route::get('admin/login-as/{id}', 'AdminController@loginAs');
	Route::get('admin/archive', 'AdminController@archive');
	Route::get('admin/export', 'AdminController@export');
	Route::get('admin/parameters', 'AdminController@parameters');

	Route::get('admin/transactions', 'TransactionController@index');
	Route::get('admin/transactions/by-project', 'TransactionController@byProject');

	Route::get('system/user-agent', 'AdminController@userAgent');

	Route::post('users', 'UserController@store');
	Route::get('users/create', 'UserController@create');
	Route::get('users/edit/{id}', 'UserController@edit');

	// Topic routes
	Route::post('topics', 'TopicController@store');
	Route::patch('topics', 'TopicController@update');
	Route::delete('topics', 'TopicController@destroy');

	/* ==============
	   STUDENT ROUTES
	   ============== */
	Route::post('students', 'StudentController@store');
});

/* ==============================
   3. SUPERVISOR AND ADMIN ROUTES
   ============================== */
Route::group(['middleware' => ['web', 'supervisorOrSuperior']], function() {

	// Project Transaction
	Route::get('projects/{id}/transactions', 'ProjectController@transactions');

	// Supervisor
	Route::get('supervisor', 'SupervisorController@index');
	Route::get('supervisor/acceptedStudentsTable', 'SupervisorController@acceptedStudentTable');
	Route::post('supervisor/student-accept', 'SupervisorController@acceptStudent');
	Route::post('supervisor/student-reject', 'SupervisorController@rejectStudent');

	// Student Report
	Route::get('reports/student', 'StudentController@report');

	// Change Authenticaion
	Route::post('authenticaion-change', 'Auth\AuthController@change');
});

/* =================
   4. STUDENT ROUTES
   ================= */
Route::group(['middleware' => ['web', 'student']], function() {
	Route::get('students/project-propose', 'StudentController@showProposeProject');
	Route::post('students/project-propose', 'StudentController@proposeProject');
	Route::patch('students/project-select', 'StudentController@selectProject');
	Route::patch('students/project-share', 'StudentController@shareProject');

	Route::patch('students/add-favourite', 'StudentController@addFavouriteProject');
	Route::patch('students/remove-favourite', 'StudentController@removeFavouriteProject');
});


/* ============================
   5. AUTHENTICATED USER ROUTES
   ============================ */
Route::group(['middleware' => ['auth']], function() {

	// Project
	Route::get('projects', 'ProjectController@index');
	Route::post('projects', 'ProjectController@store');
	Route::delete('projects/{id}/delete', 'ProjectController@destroy');

	Route::get('projects/create', 'ProjectController@create');
	Route::get('projects/{id}', 'ProjectController@show');
	Route::get('projects/{id}/edit', 'ProjectController@edit');
	Route::patch('projects/{id}/edit', 'ProjectController@update');

	// Projects by Supervisor
	Route::get('projects/by-supervisor', 'ProjectController@supervisors');
	Route::get('projects/by-supervisor/{id}', 'ProjectController@bySupervisor');

	// Projects by Topic
	Route::get('projects/by-topic', 'TopicController@index');
	Route::get('projects/by-topic/{id}', 'ProjectController@byTopic');

	// Project search
	Route::post('projects/search', 'ProjectController@search');

	// Project edit topic routes
	Route::post('projects/topic-add', 'ProjectController@addTopic');
	Route::delete('projects/topic-remove', 'ProjectController@removeTopic');
	Route::patch('projects/topic-update-primary', 'ProjectController@updatePrimaryTopic');

	// Supervisor report
	Route::get('reports/supervisor', 'SupervisorController@report');

	Route::get('afterLogin', function (){return Auth::user()->isSupervisorOrSuperior();});
});
