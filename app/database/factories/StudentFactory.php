<?php
use Faker\Generator as Faker;

$studentIncrement = studentIncrement();
$studentUgProjectIncrement = studentUgProjectIncrement();
$studentMastersProjectIncrement = studentMastersProjectIncrement();

$factory->define(SussexProjects\StudentUg::class, function (Faker $faker) use ($studentIncrement, $studentUgProjectIncrement) {
	$studentIncrement->next();
	$studentUgProjectIncrement->next();

	$project_id = null;
	$project_status = 'none';

	if($studentUgProjectIncrement->current() <= 100){
		$project_id = $studentUgProjectIncrement->current();
		$project_status = $faker->randomElement($array = array ('selected', 'accepted'));
	}

	return [
		'id' => $studentIncrement->current(),
		'registration_number' => $faker->numberBetween(10000000,99999999),
		'project_status' => $project_status,
		'project_id' => $project_id,
		'share_project' => $faker->boolean($chanceOfGettingTrue = 70)
	];
});

$factory->define(SussexProjects\StudentMasters::class, function (Faker $faker) use ($studentIncrement, $studentMastersProjectIncrement) {
	$studentIncrement->next();
	$studentMastersProjectIncrement->next();

	$project_id = null;
	$project_status = 'none';

	if($studentMastersProjectIncrement->current() <= 100){
		$project_id = $studentMastersProjectIncrement->current();
		$project_status = $faker->randomElement($array = array ('selected', 'accepted'));
	}

	return [
		'id' => $studentIncrement->current(),
		'registration_number' => $faker->numberBetween(10000000,99999999),
		'programme' => 'CompSci',
		'project_status' => $project_status,
		'project_id' => $project_id,
		'share_project' => $faker->boolean($chanceOfGettingTrue = 70)
	];
});

function studentIncrement(){
	for ($i = 43; $i < 1000; $i++) {
		yield $i;
	}
}

function studentUgProjectIncrement(){
	for ($i = 0; $i < 1000; $i++) {
		yield $i;
	}
}

function studentMastersProjectIncrement(){
	for ($i = 0; $i < 1000; $i++) {
		yield $i;
	}
}