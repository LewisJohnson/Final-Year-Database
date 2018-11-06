/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

import WordCloud from '../wordcloud';

;$(function() {
	"use strict";

	// Declared at the top of view.
	if(Window["pageEnabled"]){

		if(!WordCloud.isSupported){
			$('.content').text('Sorry, word cloud is not supported on your device.');
			return;
		}

		WordCloud.minFontSize = 12;

		$('.loader').show();
		$('.content').hide();

		var titleArray = [];
		var titleAndDescArray = [];

		// Get all the data for the cloud using the table
		$('.project-row').each(function(index) {
			var titleWords = $(this).data('title').toLowerCase().split(" ");

			for(var i = 0; i < titleWords.length; i++)
			{
				var matchedWord = titleArray.find(function(ele) {
					return ele[0] === titleWords[i];
				});

				if (matchedWord == null) {
					titleArray.push(new Array(titleWords[i], 1));
				} else {
					matchedWord[1] += 1;
				}
			}

			var descriptionWords = $(this).data('description').toLowerCase().split(" ");
			for(var i = 0; i < descriptionWords.length; i++)
			{
				var matchedWord = titleAndDescArray.find(function(ele) {
					return ele[0] === descriptionWords[i];
				});

				if (matchedWord == null) {
					titleAndDescArray.push(new Array(descriptionWords[i], 1));
				} else {
					matchedWord[1] += 1;
				}
			}
		});

		var titleAndDescArray = titleAndDescArray.concat(titleArray);

		var options = {
			list: titleAndDescArray,
			weightFactor: 30,
			rotateRatio: 0.5,
			rotationSteps: 2,
			color : '#1D4289',
			minSize: 12,
			font: 'Roboto, sans-serif'
		}


		var titleOptions = {
			list: titleArray,
			weightFactor: 30,
			rotateRatio: 0.5,
			rotationSteps: 2,
			color : '#1D4289',
			minSize: 12,
			font: 'Roboto, sans-serif'
		}

		WordCloud($('#word-cloud')[0], options);
		WordCloud($('#word-cloud-title-only')[0], titleOptions);

		$('#word-cloud-exclude-description').on('change', function(){
			if($(this).is(':checked')){
				$('#word-cloud').hide();
				$('#word-cloud-title-only').show();
			} else {
				$('#word-cloud').show();
				$('#word-cloud-title-only').hide();
			}
		});

		$('.loader-container').remove();
		$('.content').fadeIn(config.animtions.slow);
	}
});
