<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

use Faker\Generator as Faker;

$factory->define(SussexProjects\User::class, function (Faker $faker){
	// Sussex style username
	$username = $faker->randomLetter.$faker->randomLetter.$faker->numberBetween(0,999);

	return [
		'first_name' => $faker->firstName,
		'last_name' => $faker->lastName,
		'username' => $username,
		'programme' => 'Computer Science',
		'email' => $username.'@susx.ac.uk'
	];
});

$factory->state(SussexProjects\User::class, 'staff', [
	'privileges' => 'staff'
]);

$factory->state(SussexProjects\User::class, 'student', [
	'privileges' => 'student'
]);

$factory->state(SussexProjects\User::class, 'supervisor', [
	'privileges' => 'supervisor'
]);