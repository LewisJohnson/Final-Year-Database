<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Faker\Generator as Faker;

$names = [
	"3D Modelling",
	"Adaptive Behaviour",
	"Algorithmic",
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
	"Human Computer Interaction",
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
	"Web Technology",
];

$topicNameIncrement = topicNameIncrement();
$topicIdIncrement = topicIdIncrement();

$factory->define(SussexProjects\Topic::class, function (Faker $faker) use ($topicNameIncrement, $topicIdIncrement, $names)
{
	$topicNameIncrement->next();
	$topicIdIncrement->next();

	return [
		'id'   => $topicNameIncrement->current(),
		'name' => $names[$topicNameIncrement->current()],
	];
});

function topicNameIncrement()
{
	for ($i = 0; $i < 1000; $i++)
	{
		yield $i;
	}
}

function topicIdIncrement()
{
	for ($i = 0; $i < 1000; $i++)
	{
		yield $i;
	}
}
