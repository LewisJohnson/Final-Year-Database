/*
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";

	$.ajax({
		url: 'admin/marker/automatic-table',
		type: 'GET',
		success: function(response){
			$('#automatic-assign-container .content').addClass('animated fadeInUp');
			if(response.successful){
				$('#automatic-assign-container .content').html(response.html);
			} else {
				$('#automatic-assign-container .content').addClass('error-display');
				$('#automatic-assign-container .content').html(response.message);
			}

			$('#automatic-assign-container .loader-container').hide();
		}
	});

	$("body").on("submit", "#calculateSecondMarkers", function(e) {
		e.preventDefault();

		$('#automatic-assign-container .loader-container').show();
		$('#automatic-assign-container .loader-container p').html('Assigning second markers to projects...<br> This may take up to 2 minutes.');
		$('.config-danger, .config-tip, form').fadeOut(config.animtions.medium);
		$('#automatic-assign-container .content').html("");
		
		$.ajax({
			url: 'admin/marker/calculate',
			type: 'POST',
			data: $(this).serialize(),
			success: function(response) {
				$('#automatic-assign-container .content').addClass('animated fadeInUp');
				if(response.successful){
					$('#automatic-assign-container .content').html(JSON.parse(response.html));
				} else {
					$('#automatic-assign-container .content').addClass('error-display');
					$('#automatic-assign-container .content').html(response.message);
				}

				$('#automatic-assign-container .loader-container').hide();
			}
		});
	});

	$("body").on("click", "#showReportTable", function(e) {
		e.preventDefault();
		$(this).parent().parent().fadeOut(config.animtions.medium);
		$('.config-danger').fadeOut(config.animtions.medium);
		$('#automatic-assign-container .loader-container').show();
		$('#automatic-assign-container .loader-container p').text('Getting second marker table...');

		$.ajax({
			url: 'admin/marker/report',
			type: 'GET',
			success: function(response){
				$('#automatic-assign-container .content').addClass('animated fadeInUp');
				if(response.successful){
					$('#automatic-assign-container .content').html(JSON.parse(response.html));
				} else {
					$('#automatic-assign-container .content').addClass('error-display');
					$('#automatic-assign-container .content').html(response.message);
				}

				$('#automatic-assign-container .loader-container').hide();
			}
		});
	});
});
