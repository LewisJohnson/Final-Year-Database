<?php
use Faker\Generator as Faker;

$supervisorIncrement = supervisorIncrement();

$factory->define(SussexProjects\Supervisor::class, function (Faker $faker) use ($supervisorIncrement) {
	$supervisorIncrement->next();
	if($supervisorIncrement->current() == 1){
		return [
			'id' => $supervisorIncrement->current(),
			'title' => "Prof",
			'project_load_masters' => 6,
			'project_load_ug' => 6,
			'accept_email_masters' => true,
			'accept_email_ug' => true,
			'take_students_masters' => true,
			'take_students_ug' => true
		];
	}
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
	for ($i = 0; $i < 1000; $i++) {
		yield $i;
	}
}
