<?php

use Faker\Generator as Faker;
use SussexProjects\Feedback;

$factory->define(Feedback::class, function (Faker $faker)
{
	return [
		'comment' => '',
		'email' => '',
		'page' => '',
		'department' => '',
		'education_level' => '',
		'date' => ''

	];
});
