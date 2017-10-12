<?php
// Root Routes
Route::get('/', 'Index@index');
Route::get('/help', 'Index@help');
Route::get('/about', 'Index@about');

// Search Routes
Route::get('/search', 'ProjectController@search');

Route::group(['middleware' => ['auth']], function() {
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
	Route::any('/projects/topics', 'TopicController@index');
	Route::any('/projects/topics/{topic}', 'TopicController@show');
});

Auth::routes();