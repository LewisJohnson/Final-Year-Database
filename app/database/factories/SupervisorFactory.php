<?php
use Faker\Generator as Faker;

$autoIncrement = autoIncrement();

$factory->define(SussexProjects\Supervisor::class, function (Faker $faker) {
	$autoIncrement->next();
	return [
		'title' => $faker->title,
		'project_load_masters' => $faker->randomDigitNotNull,
		'project_load_ug' => $faker->randomDigitNotNull,
		'accept_email_masters' => $faker->boolean($chanceOfGettingTrue = 70),
		'accept_email_ug' => $faker->boolean($chanceOfGettingTrue = 70),
		'take_students_masters' => $faker->boolean($chanceOfGettingTrue = 70),
		'take_students_ug' => $faker->boolean($chanceOfGettingTrue = 70)

	];
});

function autoIncrement()
{
	for ($i = 3; $i < 1000; $i++) {
		yield $i;
	}
}