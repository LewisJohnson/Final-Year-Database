<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

return [
		/*
		|--------------------------------------------------------------------------
		| Default Log Channel
		|--------------------------------------------------------------------------
		|
		| This option defines the default log channel that gets used when writing
		| messages to the logs. The name specified in this option should match
		| one of the channels defined in the "channels" configuration array.
		|
		*/
		'default' => env('LOG_CHANNEL', 'stack'),
		/*
		|--------------------------------------------------------------------------
		| Log Channels
		|--------------------------------------------------------------------------
		|
		| Here you may configure the log channels for your application. Out of
		| the box, Laravel uses the Monolog PHP logging library. This gives
		| you a variety of powerful log handlers / formatters to utilize.
		|
		| Available Drivers: "single", "daily", "slack", "syslog",
		|                    "errorlog", "custom", "stack"
		|
		*/
		'channels' => [
				'stack' => [
						'driver' => 'stack',
						'channels' => ['single'],
				],
				'single' => [
						'driver' => 'single',
						'path' => storage_path('logs/laravel.log'),
						'level' => 'debug',
				],
				'daily' => [
						'driver' => 'daily',
						'path' => storage_path('logs/laravel.log'),
						'level' => 'debug',
						'days' => 7,
				],
				'slack' => [
						'driver' => 'slack',
						'url' => env('LOG_SLACK_WEBHOOK_URL'),
						'username' => 'Laravel Log',
						'emoji' => ':boom:',
						'level' => 'critical',
				],
				'syslog' => [
						'driver' => 'syslog',
						'level' => 'debug',
				],
				'errorlog' => [
						'driver' => 'errorlog',
						'level' => 'debug',
				],
		],
];