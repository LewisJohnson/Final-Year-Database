<?php

use Faker\Generator as Faker;

$factory->define(SussexProjects\Supervisor::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'project_load' => $faker->randomDigitNotNull,
        'accept_email' => $faker->boolean($chanceOfGettingTrue = 90),
        'take_students' => $faker->boolean($chanceOfGettingTrue = 90)
    ];
});
