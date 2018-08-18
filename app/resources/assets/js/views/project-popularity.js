/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

import WordCloud from '../wordcloud';

;$(function() {
	"use strict";

	var projects = new Array();

	// Get all the data for the cloud using the table
	$('.project-row').each(function(index) {
		// Temp array to put into other array
		var project = new Array();
		var title = $(this).find('.title').text();
		project.push(title);
		project.push(11 - index);

		// Push to main array
		projects.push(project);
	});

	console.log(projects);

	if(!WordCloud.isSupported){
		$("#word-cloud").text('Sorry, word cloud is not supported on your device.')
	}

	var width = $('#word-cloud').width();

	var options = {
		list: projects,
		weightFactor: function (size) {
			return size * width / 256;
		},
		rotateRatio: 0.5,
		rotationSteps: 2,
		font: "Roboto, sans-serif",
	}

	WordCloud($("#word-cloud")[0], options);
});
