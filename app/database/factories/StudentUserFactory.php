<?php

use Faker\Generator as Faker;

$factory->define(SussexInformaticsProjects\User::class, function (Faker $faker) {
	$username = 
    $faker->randomLetter.
    $faker->randomLetter.
    $faker->numberBetween(100,999);
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'username' => $username,
        'access_type' => "student",
        'password' => $password = bcrypt('password'),
        'email' => $username.'@sussex.ac.uk',
        'remember_token' => str_random(10),
    ];
});
