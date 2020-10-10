<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

use Faker\Generator as Faker;
$studentNameIncrement = studentNameIncrement();

$factory->define(SussexProjects\Student::class, function (Faker $faker) use ($studentNameIncrement){
	$studentNameIncrement->next();
	$username = "eng_student".$studentNameIncrement->current();

	return [
		'id' => function () use ($username) {
			return factory(SussexProjects\User::class)->states('student')->create([
				'username' => $username,
			])->id;
		},
		'registration_number' => $faker->numberBetween(10000000,99999999),
		'project_status' => 'none',
		'share_name' => 1
	];
});

function studentNameIncrement(){
	for ($i = 0; $i < 1000; $i++) {
		yield $i;
	}
}