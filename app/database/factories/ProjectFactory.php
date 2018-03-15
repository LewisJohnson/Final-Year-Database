<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Faker\Generator as Faker;


$factory->define(SussexProjects\ProjectUg::class, function (Faker $faker) {
	$supervisor_id = $faker->numberBetween(1, 43);
	$marker_id = $faker->numberBetween(1, 43);

	while($supervisor_id == $marker_id){
		$marker_id = $faker->numberBetween(1, 43);
	}

	return [
		'title' => $faker->bs,
		'description' => $faker->realText($maxNbChars = 600, $indexSize = 2),
		'skills' => $faker->catchPhrase,
		'status' => 'on-offer',
		'supervisor_id' => $supervisor_id,
		'marker_id' => $marker_id
	];
});

$factory->define(SussexProjects\ProjectMasters::class, function (Faker $faker) {
	$supervisor_id = $faker->numberBetween(3, 43);
	$marker_id = $faker->numberBetween(3, 43);

	while($supervisor_id == $marker_id){
		$marker_id = $faker->numberBetween(3, 43);
	}

	return [
		'title' => $faker->bs,
		'description' => $faker->realText($maxNbChars = 600, $indexSize = 2),
		'skills' => $faker->catchPhrase,
		'status' => 'on-offer',
		'supervisor_id' => $supervisor_id,
		'marker_id' => $marker_id
	];
});
