<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Faker\Generator as Faker;

$factory->define(SussexProjects\Student::class, function (Faker $faker) {
	return [
		'id' => function () {
			return factory(SussexProjects\User::class)->states('student')->create()->id;
		},
		'registration_number' => $faker->numberBetween(10000000,99999999),
		'project_status' => 'none',
		'share_name' => 1
	];
});