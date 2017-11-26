<?php

use Faker\Generator as Faker;

$autoIncrement = autoIncrement();
$factory->define(SussexInformaticsProjects\Student::class, function (Faker $faker) use ($autoIncrement) {
	$autoIncrement->next();
    return [
    	'id' => $autoIncrement->current(),
        'registration_number' => $faker->numberBetween(10000000,99999999),
        'programme' => 'CompSci',
        'project_status' => $faker->randomElement($array = array ('none','selected','proposed','accepted')),
        'student_year' => $faker->randomElement($array = array ('final','masters')),
        'share_project' => $faker->boolean($chanceOfGettingTrue = 70)
    ];
});

function autoIncrement()
{
    for ($i = 3; $i < 1000; $i++) {
        yield $i;
    }
}