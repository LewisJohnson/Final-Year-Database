<?php

use Faker\Generator as Faker;

$factory->define(SussexProjects\Project::class, function (Faker $faker) {
	Session::put('education_level', current(get_education_levels()));
	Session::put('department', 'informatics');
	return [
		'title' => $faker->catchPhrase,
		'description' => $faker->realText($maxNbChars = 600, $indexSize = 2),
		'skills' => $faker->catchPhrase,
		'status' => 'on-offer',
	];
});
