<?php
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
| 2. Admin Routes (UG and Msc Admin)
| 3. Supervisor And Admin Routes
| 4. Supervisor Routes
| 5. Student Routes (UG and Msc Students)
| 6. Authenticated User Routes (Anyone who is logged in)
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
	Route::get('index', 'HomeController@index');
	Route::get('home', 'HomeController@index');
	Route::get('/', 'HomeController@index');
	
	Route::get('information', 'HomeController@information');
	Route::get('about', 'HomeController@about');
	Route::get('help', 'HomeController@help');
});

/* ===============
   2. ADMIN ROUTES
   =============== */
Route::group(['middleware' => ['admin.system']], function() {
	Route::get('admin/dashboard', 'AdminController@dashboard');
	Route::post('admin/dashboard/system', 'AdminController@configure');
});

/* ===============
   2. ADMIN ROUTES
   =============== */
Route::group(['middleware' => ['admin']], function() {
	Route::get('admin', 'AdminController@index');

	Route::get('admin/students/import', 'AdminController@importStudents');
	
	Route::get('admin/supervisor-arrangements-amend', 'AdminController@showAmendSupervisorArrangements');
	Route::patch('admin/supervisor-arrangements-amend', 'AdminController@amendSupervisorArrangements');

	Route::get('admin/marker-assign', 'AdminController@showAssignMarker');
	Route::patch('admin/marker-assign', 'StudentController@updateMarker');

	Route::get('admin/topics-amend', 'AdminController@ShowAmendTopics');
	Route::get('admin/login-as', 'AdminController@loginAsView');
	Route::get('admin/login-as/{id}', 'AdminController@loginAs');
	Route::get('admin/archive', 'AdminController@archive');
	Route::get('admin/export', 'AdminController@export');
	Route::get('admin/parameters', 'AdminController@parameters');

	Route::get('admin/transactions', 'TransactionController@index');
	Route::get('admin/transactions/by-project', 'TransactionController@byProject');

	Route::get('system/user-agent', 'AdminController@userAgent');

	Route::post('users', 'UserController@store');
	Route::delete('users', 'UserController@delete');
	Route::get('users/create', 'UserController@create');
	Route::get('users/edit', 'UserController@showEdit');
	Route::get('users/{id}/edit', 'UserController@edit');
	Route::patch('users/{id}/edit', 'UserController@update');

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
Route::group(['middleware' => ['supervisorOrSuperior']], function() {
	// Project Transaction
	Route::get('projects/{id}/transactions', 'ProjectController@transactions');
	
	// Student Report
	Route::get('reports/student', 'StudentController@report');
});

/* =================
   5. SUPERVISOR ROUTES
   ================= */
Route::group(['middleware' => ['supervisor']], function() {

	// Project Transaction
	Route::get('supervisor/transactions', 'SupervisorController@transactions');
	
	// Supervisor
	Route::get('supervisor', 'SupervisorController@index');
	Route::get('supervisor/accepted-students-table', 'SupervisorController@acceptedStudentTable');
	Route::post('supervisor/student-accept', 'SupervisorController@acceptStudent');
	Route::post('supervisor/student-reject', 'SupervisorController@rejectStudent');
});

/* =================
   5. STUDENT ROUTES
   ================= */
Route::group(['middleware' => ['student']], function() {
	Route::get('students/project-propose', 'StudentController@showProposeProject');
	Route::post('students/project-propose', 'StudentController@proposeProject');
	Route::patch('students/project-select', 'StudentController@selectProject');
	Route::patch('students/project-share', 'StudentController@shareProject');

	Route::patch('students/add-favourite', 'StudentController@addFavouriteProject');
	Route::patch('students/remove-favourite', 'StudentController@removeFavouriteProject');
});


/* ============================
   6. AUTHENTICATED USER ROUTES
   ============================ */
Route::group(['middleware' => ['auth']], function() {


	// Project
	Route::get('projects', 'ProjectController@index');
	Route::post('projects', 'ProjectController@store');
	Route::get('projects/create', 'ProjectController@create');

	// Projects by Supervisor
	Route::get('projects/by-supervisor', 'ProjectController@showSupervisors');
	Route::get('projects/by-supervisor/{id}', 'ProjectController@bySupervisor');

	// Projects by Topic
	Route::get('projects/by-topic', 'ProjectController@showTopics');
	Route::get('projects/by-topic/{id}', 'ProjectController@byTopic');

	// // Project search
	Route::get('projects/search', 'ProjectController@search');

	// Project edit topic routes
	Route::post('projects/topic-add', 'ProjectController@addTopic');
	Route::delete('projects/topic-remove', 'ProjectController@removeTopic');
	Route::patch('projects/topic-update-primary', 'ProjectController@updatePrimaryTopic');

	Route::get('projects/{id}', 'ProjectController@show');
	Route::delete('projects/{id}/delete', 'ProjectController@destroy');
	Route::patch('projects/{id}/edit', 'ProjectController@update');
	Route::get('projects/{id}/edit', 'ProjectController@edit');
	Route::patch('projects/{id}/restore', 'ProjectController@restore');

	// Supervisor report
	Route::get('reports/supervisor', 'SupervisorController@report');

	// Change Authenticaion
	Route::post('authenticaion-change', 'Auth\AuthController@change');
	Route::get('showChangeAuthDialog', function (){
		return Auth::user()->isSupervisorOrSuperior() ? "true" : "false";
	});
});
