<?php
use Faker\Generator as Faker;

$userIncrement = userIncrement();

$factory->define(SussexProjects\User::class, function (Faker $faker) use ($userIncrement) {
	$username = $faker->randomLetter.$faker->randomLetter.$faker->numberBetween(100,99999);
	$userIncrement->next();
	$privileges = "student";

	if($userIncrement->current() == 1){
		$username = "admin";
		$privileges = "admin_system, admin_ug, admin_masters";
	}

	if($userIncrement->current() == 2){
		$username = "admin_projects";
		$privileges = "admin_ug, admin_masters";
	}

	if($userIncrement->current() >= 3 && $userIncrement->current() <= 43){
		$privileges = "supervisor";
	}

	return [
		'first_name' => $faker->firstName,
		'last_name' => $faker->lastName,
		'username' => $username,
		'password' => bcrypt('password'),
		'privileges' => $privileges,
		'programme' => 'Computer Science',
		'email' => $username.'@susx.ac.uk'
	];
});

function userIncrement()
{
	for ($i = 0; $i < 1000; $i++) {
		yield $i;
	}
}