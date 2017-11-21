<?php

Route::group(['middleware' => ['web']], function() {

	// Root Routes
	Route::get('/', 'Index@index');
	Route::get('information', 'Index@information');
	Route::get('about', 'Index@about');
	Route::get('help', 'Index@help');

	// Login Routes
    Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);
    Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);
    Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);
});

Route::group(['middleware' => ['Admin_Ug']], function() {

	Route::get('/admin', 'AdminController@index');
	Route::get('/admin/students', 'AdminController@students');
	Route::get('/admin/students/import', 'AdminController@importStudents');
	Route::get('/admin/supervisors', 'AdminController@supervisors');
	Route::get('/admin/topics', 'AdminController@topics');
	Route::get('/admin/login-as', 'AdminController@loginAsView');
	Route::get('/admin/login-as/{id}', 'AdminController@loginAs');

	Route::post('users', 'UserController@store');
	Route::get('users/create', 'UserController@create');
	// Route::get('users/{user}', 'UserController@show');

	Route::get('projects/{id}/edit', 'ProjectController@edit');
	// Project edit topic routes
	Route::put('projects/{id}/edit/topic', 'ProjectTopicController@store');
	Route::delete('projects/{id}/edit/topic', 'ProjectTopicController@destroy');
	Route::patch('projects/{id}/edit/topic', 'ProjectTopicController@updatePrimaryTopic');

	// Topic routes
	Route::get('topics', 'TopicController@index');
	Route::post('topics', 'TopicController@store');
	Route::patch('topics/{topic}', 'TopicController@edit');
	Route::delete('topics/{topic}', 'TopicController@destroy');
	Route::get('topics/{topic}', 'TopicController@show');
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
	Route::get('projects/{id}', 'ProjectController@show');

	// Topic routes
	Route::get('topics', 'TopicController@index');
	Route::post('authChange', 'Auth\AuthController@change');
});

