<?php

Route::group(['middleware' => ['web']], function() {

	Route::get('authChange', 'Auth\AuthController@show');
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

Route::middleware(['Admin_Ug'])->group(function () {
	Route::get('/admin', 'AdminController@index');

	Route::get('admin/students/import', 'AdminController@importStudents');
	Route::get('admin/amendSupervisorArrangements', 'AdminController@amendSupervisorArrangements');

	Route::get('admin/assignMarker', 'AdminController@showAssignMarker');
	Route::patch('projects/assignMarker', 'ProjectController@updateMarker');

	Route::get('admin/amendTopics', 'AdminController@amendTopics');
	Route::get('admin/login-as', 'AdminController@loginAsView');
	Route::get('admin/login-as/{id}', 'AdminController@loginAs');
	Route::get('admin/archive', 'AdminController@archive');

	Route::get('admin/transactions', 'TransactionController@index');
	Route::get('admin/transactions/byProject', 'TransactionController@byProject');

	Route::get('system/strings', 'StringsController@edit');

	Route::post('users', 'UserController@store');
	Route::get('users/create', 'UserController@create');
	Route::get('users/edit/{id}', 'UserController@edit');

	// Topic routes
	Route::post('topics', 'TopicController@store');
	Route::patch('topics', 'TopicController@update');
	Route::delete('topics', 'TopicController@destroy');
});

Route::group(['middleware' => ['auth']], function() {
	/* ============== 
	   PROJECT ROUTES 
	   ============== */
	Route::get('projects', 'ProjectController@index');
	Route::post('projects', 'ProjectController@store');
	Route::get('projects/create', 'ProjectController@create');

	// Projects by Supervisor
	Route::get('projects/bySupervisor', 'ProjectController@supervisors');
	Route::get('projects/bySupervisor/{id}', 'ProjectController@bySupervisor');
	
	Route::get('projects/{id}', 'ProjectController@show');
	Route::get('projects/{id}/transactions', 'ProjectController@transactions');
	Route::get('projects/{id}/edit', 'ProjectController@edit');
	
	// Projects by Topic
	Route::get('projects/byTopic', 'TopicController@index');
	Route::get('projects/byTopic/{id}', 'ProjectController@byTopic');

	// Project search
	Route::post('projects/search', 'ProjectController@search');

	// Project edit topic routes
	Route::post('projects/addTopic', 'ProjectController@addTopic');
	Route::delete('projects/removeTopic', 'ProjectController@removeTopic');
	Route::patch('projects/updatePrimaryTopic', 'ProjectController@updatePrimaryTopic');

	/* ============== 
	   SUPERVISOR ROUTES 
	   ============== */
	Route::get('supervisor', 'SupervisorController@index');
	Route::post('supervisor/acceptStudent', 'SupervisorController@acceptStudent');
	Route::post('supervisor/rejectStudent', 'SupervisorController@rejectStudent');

	/* ============== 
	   STUDENT ROUTES 
	   ============== */
	Route::post('students', 'StudentController@store');
	Route::get('students/proposeProject', 'StudentController@showProposeProject');
	Route::patch('students/selectProject', 'StudentController@selectProject');
	Route::patch('students/shareProject', 'StudentController@shareProject');

	/* ============== 
	   REPORT ROUTES 
	   ============== */
	Route::get('reports/supervisor', 'SupervisorController@report');
	Route::get('reports/student', 'StudentController@report');

	// CHANGE AUTH
	Route::post('authChange', 'Auth\AuthController@change');
});