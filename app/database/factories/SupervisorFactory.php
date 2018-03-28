<?php

use Faker\Generator as Faker;

$factory->define(SussexProjects\Supervisor::class, function (Faker $faker) {
	return [
		'id' => function () {
			return factory(SussexProjects\User::class)->states('supervisor')->create()->id;
		},
		'title' => "Prof",
		'project_load_pg' => 6,
		'project_load_ug' => 6,
		'accept_email_pg' => true,
		'accept_email_ug' => true,
		'take_students_pg' => true,
		'take_students_ug' => true
	];
});
