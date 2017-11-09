<?php

Route::group(['middleware' => ['web']], function() {

	// Root Routes
	Route::get('', 'Index@index');
	Route::get('help', 'Index@help');
	Route::get('about', 'Index@about');

	// Login Routes
    Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);
    Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);
    Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);
});


Route::group(['middleware' => ['auth']], function() {
	// Admin
	Route::get('admin', 'AdminController@index');
	Route::get('admin/students', 'AdminController@students');
	Route::get('admin/students/import', 'AdminController@importStudents');
	Route::get('admin/supervisors', 'AdminController@supervisors');
	Route::get('admin/topics', 'AdminController@topics');
	Route::get('admin/login-as', 'AdminController@loginAsView');
	Route::get('admin/login-as/{id}', 'AdminController@loginAs');

	// Admin Users
	Route::post('user', 'UserController@store');
	Route::get('user/create', 'UserController@create');
	Route::get('users/{user}', 'UserController@show');

	// Search Route
	Route::get('search', 'ProjectController@search');

	// Supervisor
	Route::get('supervisor', 'SupervisorController@index');

	// Student
	Route::post('student', 'StudentController@store');
	Route::patch('students/{student}/selectProject', 'StudentController@selectProject');
	
	// Project routes
	Route::get('projects', 'ProjectController@index');
	Route::post('projects', 'ProjectController@store');
	Route::get('projects/create', 'ProjectController@create');
	Route::get('projects/{project}', 'ProjectController@show');

	// Project edit routes
	Route::get('projects/{project}/edit', 'ProjectController@edit');
	Route::patch('projects/{project}/edit', 'ProjectController@update');
	Route::delete('projects/{project}/edit', 'ProjectController@destroy');

	// Project edit topic routes
	Route::put('projects/{project}/edit/topic', 'ProjectTopicController@store');
	Route::delete('projects/{project}/edit/topic', 'ProjectTopicController@destroy');
	Route::patch('projects/{project}/edit/topic', 'ProjectTopicController@updatePrimaryTopic');

	// Topic routes
	Route::get('topic', 'TopicController@index');
	Route::post('topic', 'TopicController@store');
	Route::patch('topics/{topic}', 'TopicController@edit');
	Route::delete('topics/{topic}', 'TopicController@destroy');
	Route::get('topics/{topic}', 'TopicController@show');
});
