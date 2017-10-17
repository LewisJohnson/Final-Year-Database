<?php

use Faker\Generator as Faker;

$factory->define(App\Supervisor::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'contact_type' => "what",
        'project_load' => $faker->randomDigitNotNull,
        'take_students' => $faker->boolean($chanceOfGettingTrue = 90)
    ];
});
