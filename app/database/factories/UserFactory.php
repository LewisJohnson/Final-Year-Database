<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Faker\Generator as Faker;

$factory->define(SussexProjects\User::class, function (Faker $faker) {
	Session::put('education_level', current(get_education_levels()));
	Session::put('department', 'informatics');

	// Sussex style username
	$username = $faker->randomLetter.$faker->randomLetter.$faker->numberBetween(0,999);

	return [
		'first_name' => $faker->firstName,
		'last_name' => $faker->lastName,
		'username' => $username,
		'password' => bcrypt('password'),
		'programme' => 'Computer Science',
		'email' => $username.'@test.ac.uk'
	];
});

$factory->state(SussexProjects\User::class, 'staff', [
	'privileges' => 'staff',
]);

$factory->state(SussexProjects\User::class, 'student', [
	'privileges' => 'student',
]);

$factory->state(SussexProjects\User::class, 'supervisor', [
	'privileges' => 'supervisor',
]);