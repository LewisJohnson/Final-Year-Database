<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Faker\Generator as Faker;

$topicMastersInc = topicMastersInc();
$topicUgInc = topicUgInc();

$names = [
	"3D Modelling",
	"Adaptive Behaviour",
	"Algorithmics",
	"Animation",
	"Artificial Life",
	"Cellular Automata",
	"Cognition",
	"Cognitive Modelling",
	"Cognitive Robotics",
	"Compiler",
	"Complex Systems",
	"Computational Neuroscience",
	"Computer Music",
	"Computer Vision",
	"Concurrency",
	"Content Management",
	"Data Analysis",
	"Data Mining",
	"Databases",
	"Discovery",
	"Distributed Systems",
	"E-Learning",
	"Evolutionary Computation",
	"Evolutionary Modelling",
	"Evolutionary Robotics",
	"File-Sharing",
	"Games",
	"GPU Programming",
	"Graphics",
	"Human Computer Interaction6",
	"Interaction Design",
	"iOS development",
	"Knowledge Based Systems",
	"Learning",
	"Machine Learning",
	"Mobile Computing",
	"Motion Capture",
	"Multimedia",
	"Natural Language Processing",
	"Network science",
	"Networking",
	"Neural Networks",
	"Optimization",
	"Physical Computing",
	"Program Logics",
	"Programming Languages",
	"Rational Reconstruction",
	"Security",
	"Simulation",
	"Software Checking",
	"Software Engineering",
	"Video Streaming",
	"Virtual Environments",
	"Web Technology"
];

$factory->define(SussexProjects\TopicUg::class, function (Faker $faker) use ($topicUgInc, $names) {
	$topicUgInc->next();
	return [
		'name' => $names[$topicUgInc->current()]
	];
});


$factory->define(SussexProjects\TopicMasters::class, function (Faker $faker) use ($topicMastersInc, $names) {
	$topicMastersInc->next();
	return [
		'name' => $names[$topicMastersInc->current()]
	];
});

function topicMastersInc(){
	for ($i = 0; $i < 1000; $i++) {
		yield $i;
	}
}

function topicUgInc(){
	for ($i = 0; $i < 1000; $i++) {
		yield $i;
	}
}