<?php

use Faker\Generator as Faker;

$factory->define(App\Student::class, function (Faker $faker) {
    return [
        'registration_number' => $faker->numberBetween(10000000,99999999),
        'programme' => 'CompSci',
        'project_status' => $faker->randomElement(
        	$array = array (
        		'none',
        		'selected',
        		'proposed',
        )),
        'project_id' => 0,
        'share_project' => $faker->boolean($chanceOfGettingTrue = 70)
    ];
});
