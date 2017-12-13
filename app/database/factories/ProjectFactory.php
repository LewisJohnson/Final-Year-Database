<?php
use Faker\Generator as Faker;


$factory->define(SussexProjects\ProjectUg::class, function (Faker $faker) {
	$supervisor_id = $faker->numberBetween(3, 43);
	$marker_id = $faker->numberBetween(3, 43);

	while($supervisor_id == $marker_id){
		$marker_id = $faker->numberBetween(3, 43);
	}

	return [
		'title' => $faker->bs,
		'description' => $faker->realText($maxNbChars = 600, $indexSize = 2),
		'skills' => $faker->catchPhrase,
		'author_programme' => 'Computer Science',
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
		'author_programme' => 'Computer Science',
		'status' => 'on-offer',
		'supervisor_id' => $supervisor_id,
		'marker_id' => $marker_id
	];
});