<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Faker\Generator as Faker;
$supervisorNameIncrement = supervisorNameIncrement();

$factory->define(SussexProjects\Supervisor::class, function (Faker $faker) use ($supervisorNameIncrement) {
	$supervisorNameIncrement->next();
	$username = "eng_supervisor".$supervisorNameIncrement->current();

	return [
		'id' => function () use ($username) {
			return factory(SussexProjects\User::class)->states('supervisor')->create([
				'username' => $username,
				'id' => $username,
			])->id;
		},
		'title' => "Prof",
		'project_load_pg' => $faker->numberBetween(1,8),
		'project_load_ug' => $faker->numberBetween(1,8),
		'accept_email_pg' => $faker->boolean($chanceOfGettingTrue = 90),
		'accept_email_ug' => $faker->boolean($chanceOfGettingTrue = 90),
		'take_students_pg' => $faker->boolean($chanceOfGettingTrue = 90),
		'take_students_ug' => $faker->boolean($chanceOfGettingTrue = 90)
	];
});

function supervisorNameIncrement(){
	for ($i = 0; $i < 1000; $i++) {
		yield $i;
	}
}