<?php

Route::group(['middleware' => ['web']], function() {

	// Root Routes
	Route::get('', 'Index@index');
	Route::get('information', 'Index@information');
	Route::get('about', 'Index@about');
	Route::get('help', 'Index@help');

	// Login Routes
	Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);
	Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);
	Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);
});


Route::group(['middleware' => ['ug_admin']], function() {
	Route::get('ug/admin', 'Ug_AdminController@index');
	Route::get('ug/admin/students', 'Ug_AdminController@students');
	Route::get('ug/admin/students/import', 'Ug_AdminController@importStudents');
	Route::get('ug/admin/supervisors', 'Ug_AdminController@supervisors');
	Route::get('ug/admin/topics', 'Ug_AdminController@topics');
	Route::get('ug/admin/login-as', 'Ug_AdminController@loginAsView');
	Route::get('ug/admin/login-as/{id}', 'Ug_AdminController@loginAs');
});

Route::group(['middleware' => ['masters_admin']], function() {
	Route::get('masters/admin', 'Masters_AdminController@index');
	Route::get('masters/admin/students', 'Masters_AdminController@students');
	Route::get('masters/admin/students/import', 'Masters_AdminController@importStudents');
	Route::get('masters/admin/supervisors', 'Masters_AdminController@supervisors');
	Route::get('masters/admin/topics', 'Masters_AdminController@topics');
	Route::get('masters/admin/login-as', 'Masters_AdminController@loginAsView');
	Route::get('masters/admin/login-as/{id}', 'Masters_AdminController@loginAs');
});

Route::group(['middleware' => ['ug_admin', 'masters_admin']], function() {
	Route::post('users', 'UserController@store');
	Route::get('users/create', 'UserController@create');
	Route::get('users/{user}', 'UserController@show');

	// Project edit topic routes
	Route::put('projects/{project}/edit/topic', 'ProjectTopicController@store');
	Route::delete('projects/{project}/edit/topic', 'ProjectTopicController@destroy');
	Route::patch('projects/{project}/edit/topic', 'ProjectTopicController@updatePrimaryTopic');

	// Topic routes
	Route::get('topics', 'TopicController@index');
	Route::post('topics', 'TopicController@store');
	Route::patch('topics/{topic}', 'TopicController@edit');
	Route::delete('topics/{topic}', 'TopicController@destroy');
	Route::get('topics/{topic}', 'TopicController@show');
});


Route::group(['middleware' => ['masters']], function() {
	Route::get('masters/projects', 'Masters_ProjectController@index');
});

Route::group(['middleware' => ['ug_admin']], function() {
	Route::get('ug/projects', 'Ug_ProjectController@index');
	Route::get('ug/projects/{project}', 'Ug_ProjectController@show');
});

Route::group(['middleware' => ['auth']], function() {
	// Search Route
	Route::get('search', 'ProjectController@search');

	// Supervisor
	Route::get('supervisor', 'SupervisorController@index');

	// Student
	Route::post('students', 'StudentController@store');
	Route::patch('students/{student}/selectProject', 'StudentController@selectProject');
	
	// Project routes
	Route::get('projects', 'ProjectController@index');
	Route::post('projects', 'ProjectController@store');
	Route::get('projects/create', 'ProjectController@create');
	Route::get('projects/{project}', 'ProjectController@show');

	// Topic routes
	Route::get('topics', 'TopicController@index');
});
