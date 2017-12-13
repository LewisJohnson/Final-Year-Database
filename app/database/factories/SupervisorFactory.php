<?php
use Faker\Generator as Faker;

$supervisorIncrement = supervisorIncrement();

$factory->define(SussexProjects\Supervisor::class, function (Faker $faker) use ($supervisorIncrement) {
	$supervisorIncrement->next();
	return [
		'id' => $supervisorIncrement->current(),
		'title' => $faker->title,
		'project_load_masters' => $faker->randomDigitNotNull,
		'project_load_ug' => $faker->randomDigitNotNull,
		'accept_email_masters' => $faker->boolean($chanceOfGettingTrue = 70),
		'accept_email_ug' => $faker->boolean($chanceOfGettingTrue = 70),
		'take_students_masters' => $faker->boolean($chanceOfGettingTrue = 70),
		'take_students_ug' => $faker->boolean($chanceOfGettingTrue = 70)

	];
});

function supervisorIncrement()
{
	for ($i = 2; $i < 1000; $i++) {
		yield $i;
	}
}