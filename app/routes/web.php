<?php
// Root Routes
Route::get('/', 'Index@index');
Route::get('/help', 'Index@help');
Route::get('/about', 'Index@about');

// Search Routes
Route::get('/search', 'ProjectController@search');

Route::group(['middleware' => ['auth']], function() {
	// Admin
	Route::get('/admin', 'AdminController@index');
	Route::get('/admin/students', 'AdminController@students');
	Route::get('/admin/supervisors', 'AdminController@supervisors');
	Route::get('/admin/topics', 'AdminController@topics');
	Route::get('/admin/login-as', 'AdminController@loginAsView');
	Route::get('/admin/login-as/{id}', 'AdminController@loginAs');

	// Supervisor
	Route::get('/supervisor', 'SupervisorController@index');

	// Student
	Route::patch('/student/{student}/selectProject', 'StudentController@selectProject');
	
	// Project routes
	Route::get('/projects', 'ProjectController@index');
	Route::post('/projects', 'ProjectController@store');
	Route::get('/projects/create', 'ProjectController@create');
	Route::get('/projects/{project}', 'ProjectController@show');

	// Project edit routes
	Route::get('/projects/{project}/edit', 'ProjectController@edit');
	Route::patch('/projects/{project}/edit', 'ProjectController@update');
	Route::delete('/projects/{project}/edit', 'ProjectController@destroy');

	// Project edit topic routes
	Route::put('/projects/{project}/edit/topic', 'ProjectTopicController@store');
	Route::delete('/projects/{project}/edit/topic', 'ProjectTopicController@destroy');
	Route::patch('/projects/{project}/edit/topic', 'ProjectTopicController@updatePrimaryTopic');

	// Topic routes
	Route::get('/topics', 'TopicController@index');
	Route::post('/topics', 'TopicController@store');
	Route::patch('/topics/{topic}', 'TopicController@edit');
	Route::delete('/topics/{topic}', 'TopicController@destroy');
	Route::get('/topics/{topic}', 'TopicController@show');
});

Auth::routes();