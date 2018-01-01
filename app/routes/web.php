<?php

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

Route::middleware(['Admin_Ug'])->group(function () {
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

	Route::get('admin/transactions', 'TransactionController@index');
	Route::get('admin/transactions/by-project', 'TransactionController@byProject');

	Route::get('system/strings', 'StringsController@edit');
	Route::get('system/user-agent', 'AdminController@userAgent');

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
	Route::get('projects/{id}', 'ProjectController@show');
	Route::get('projects/{id}/transactions', 'ProjectController@transactions');
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

	/* ==============
	   SUPERVISOR ROUTES
	   ============== */
	Route::get('supervisor', 'SupervisorController@index');
	Route::post('supervisor/student-accept', 'SupervisorController@acceptStudent');
	Route::post('supervisor/student-reject', 'SupervisorController@rejectStudent');

	/* ==============
	   STUDENT ROUTES
	   ============== */
	Route::post('students', 'StudentController@store');
	Route::get('students/project-propose', 'StudentController@showProposeProject');
	Route::post('students/project-propose', 'StudentController@proposeProject');
	Route::patch('students/project-select', 'StudentController@selectProject');
	Route::patch('students/project-share', 'StudentController@shareProject');

	/* ==============
	   REPORT ROUTES
	   ============== */
	Route::get('reports/supervisor', 'SupervisorController@report');
	Route::get('reports/student', 'StudentController@report');

	// CHANGE AUTH
	Route::post('authenticaion-change', 'Auth\AuthController@change');

	Route::get('afterLogin', function (){
		if(Auth::user()->isSupervisorOrSuperior()){
			return "true";
		} else {
			return "false";
		}
	});
});
