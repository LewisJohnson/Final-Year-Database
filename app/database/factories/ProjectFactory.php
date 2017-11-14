<?php

use Faker\Generator as Faker;

$factory->define(App\Project::class, function (Faker $faker) {
    return [
        'title' => $faker->bs,
        'description' => $faker->realText($maxNbChars = 600, $indexSize = 2),
        'skills' => $faker->catchPhrase,
        'author_programme' => 'Computer Science',
        'status' => 'on-offer',
        'supervisor_id' => $faker->numberBetween(1,20),
        'start_date' => $faker->dateTime($max = 'now', $timezone = date_default_timezone_get()),
        'project_type' => 'final'
    ];
});
