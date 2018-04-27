<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Faker\Generator as Faker;

$factory->define(SussexProjects\Project::class, function (Faker $faker) {
	return [
		'title' => $faker->catchPhrase,
		'description' => $faker->realText($maxNbChars = 600, $indexSize = 2),
		'skills' => $faker->catchPhrase,
		'status' => 'on-offer',
		'supervisor_id' => SussexProjects\Supervisor::all()->random()->id,
	];
});
