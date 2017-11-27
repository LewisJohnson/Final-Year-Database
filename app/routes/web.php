<?php

Route::group(['middleware' => ['web']], function() {


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

	Route::get('/admin/summary/students', 'AdminController@summaryStudents');
	Route::get('/admin/summary/supervisors', 'AdminController@summarySupervisors');

	Route::get('/admin/students/import', 'AdminController@importStudents');
	Route::get('/admin/supervisors', 'AdminController@supervisors');
	Route::get('/admin/supervisors/arrangements/{id}', 'AdminController@supervisorArrangements');
	Route::get('/admin/topics', 'AdminController@topics');
	Route::get('/admin/login-as', 'AdminController@loginAsView');
	Route::get('/admin/login-as/{id}', 'AdminController@loginAs');
	Route::get('/admin/archive', 'AdminController@archive');
	Route::get('/admin/transactions', 'TransactionController@index');


	Route::get('/system/strings', 'StringsController@edit');

	// Route::get('/admin/transactions/projects', 'TransactionController@index');

	Route::post('users', 'UserController@store');
	Route::get('users/create', 'UserController@create');
	Route::get('users/edit/{id}', 'UserController@edit');

	Route::get('projects/{id}/edit', 'ProjectController@edit');

	// Project edit topic routes
	Route::put('projects/{id}/edit/topic', 'ProjectTopicController@store');
	Route::delete('projects/{id}/edit/topic', 'ProjectTopicController@destroy');
	Route::patch('projects/{id}/edit/topic', 'ProjectTopicController@updatePrimaryTopic');

	// Topic routes
	Route::post('topics', 'TopicController@store');
	Route::patch('topics/{id}', 'TopicController@update');
	Route::delete('topics/{id}', 'TopicController@destroy');
});

Route::group(['middleware' => ['auth']], function() {
	// Search Route
	Route::get('search', 'ProjectController@search');

	// Supervisor
	Route::get('supervisor', 'SupervisorController@index');
	Route::post('supervisor/acceptStudent', 'SupervisorController@acceptStudent');
	Route::post('supervisor/rejectStudent', 'SupervisorController@rejectStudent');

	// Student
	Route::post('students', 'StudentController@store');
	Route::get('students/proposeProject', 'StudentController@showProposeProject');
	Route::patch('students/selectProject', 'StudentController@selectProject');

	// Project routes
	Route::get('projects', 'ProjectController@index');
	Route::post('projects', 'ProjectController@store');
	
	Route::get('projects/bySupervisor/', 'ProjectController@supervisors');
	Route::get('projects/bySupervisor/{id}', 'ProjectController@bySupervisor');
	Route::get('projects/byTopic/', 'TopicController@index');
	Route::get('projects/byTopic/{id}', 'ProjectController@byTopic');

	Route::get('/reports/supervisor', 'SupervisorController@report');

	Route::get('projects/create', 'ProjectController@create');
	Route::get('projects/{id}', 'ProjectController@show');

	// Topic routes
	Route::post('authChange', 'Auth\AuthController@change');
});