<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Faker\Generator as Faker;

$factory->define(SussexProjects\ProjectTopic::class, function (Faker $faker) {
	return [
		'project_id' => SussexProjects\Project::all()->random()->id,
		'topic_id' => SussexProjects\Topic::all()->random()->id,
	];
});

$factory->state(SussexProjects\ProjectTopic::class, 'primary', [
	'primary' => 1
]);

$factory->state(SussexProjects\ProjectTopic::class, 'extra', [
	'primary' => 0
]);
