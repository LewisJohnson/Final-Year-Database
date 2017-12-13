<?php
use Faker\Generator as Faker;

$userIncrement = userIncrement();

$factory->define(SussexProjects\User::class, function (Faker $faker) use ($userIncrement) {
	$username = $faker->randomLetter.$faker->randomLetter.$faker->numberBetween(100,99999);
	$userIncrement->next();
	$access_type = "student";

	if($userIncrement->current() == 1){
		$username = 'admin_ug';
		$access_type = "admin_ug";
	}

	if($userIncrement->current() == 2){
		$username = 'admin_masters';
		$access_type = "admin_masters";
	}

	if($userIncrement->current() >= 3 && $userIncrement->current() <= 43){
		$access_type = "supervisor";
	}

	return [
		'first_name' => $faker->firstName,
		'last_name' => $faker->lastName,
		'username' => $username,
		'password' => bcrypt('password'),
		'access_type' => $access_type,
		'email' => $username.'@susx.ac.uk'
	];
});

function userIncrement()
{
	for ($i = 0; $i < 1000; $i++) {
		yield $i;
	}
}