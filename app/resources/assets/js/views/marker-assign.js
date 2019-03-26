/*
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */


;$(function() {
	"use strict";

	$.ajax({
		url: 'admin/marker/automatic/preview',
		type: 'GET',
		success: function(response){
			$('#automatic-assign-content').addClass('animated fadeInUp');
			$('#automatic-assign-content').html(response.html);
			$('#loader-container').hide();
		}
	});

	$("body").on("submit", "#calculate-second-markers", function(e) {
		e.preventDefault();

		$('#loader-container').show();
		$('#loader-container p').html('Assigning second markers to projects...<br> This may take a few minutes.');
		$('.alert, h1, form').fadeOut(config.animtions.medium);
		$('#automatic-assign-content').html("");
		
		$.ajax({
			url: 'admin/marker/calculate',
			type: 'POST',
			data: $(this).serialize(),
			success: function(response) {
				$('#automatic-assign-content').addClass('animated fadeInUp');
				if(response.successful){
					$('#automatic-assign-content').html(JSON.parse(response.html));
				} else {
					$('#automatic-assign-content').addClass('alert alert-danger');
					$('#automatic-assign-content').html("&#9888;&#65039; " + response.message);
				}

				$('#loader-container').hide();
			}
		});
	});

	$("body").on("click", "#show-automatic-assignment-report", function(e) {
		e.preventDefault();
		$('.alert, h1, form').fadeOut(config.animtions.medium);
		$('#loader-container').show();
		$('#loader-container p').text('Getting second marker table...');

		$.ajax({
			url: 'admin/marker/report',
			type: 'GET',
			success: function(response){
				$('#loader-container').hide();
				$('#automatic-assign-content').addClass('animated fadeInUp');
				$('#automatic-assign-content').html(JSON.parse(response.html));
			}
		});
	});
});
