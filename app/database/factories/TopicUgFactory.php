<?php

use Faker\Generator as Faker;

$factory->define(SussexProjects\TopicUg::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->randomElement(
        	$array = array (
        		'Animation',
        		'Machine-Learning',
        		'Databases', 
        		'Big-Data', 
        		'Games', 
        		'3D-Environments', 
        		'E-learning', 
        		'Music', 
        		'Web-Technology', 
        		'Compilers'
        )),
    ];
});
