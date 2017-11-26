<?php

use Faker\Generator as Faker;

$factory->define(SussexInformaticsProjects\ProjectUg::class, function (Faker $faker) {
    return [
        'title' => $faker->bs,
        'description' => $faker->realText($maxNbChars = 600, $indexSize = 2),
        'skills' => $faker->catchPhrase,
        'author_programme' => 'Computer Science',
        'status' => 'on-offer',
        'supervisor_id' => 1,
        'start_date' => $faker->dateTime($max = 'now', $timezone = date_default_timezone_get()),
    ];
});
       // 'supervisor_id' => $faker->numberBetween(1,20),