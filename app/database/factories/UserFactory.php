<?php

use Faker\Generator as Faker;

$factory->define(SussexProjects\User::class, 'access_type', function (Faker $faker) {
	$username = 
	$faker->randomLetter.
	$faker->randomLetter.
	$faker->numberBetween(100,999);
	return [
		'first_name' => $faker->firstName,
		'last_name' => $faker->lastName,
		'username' => $username,
		'password' => bcrypt('password'),
		'access_type' => 'access_type',
		'email' => $username.'@sussex.ac.uk'
	];
});