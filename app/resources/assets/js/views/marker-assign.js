/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";

	// Get help footer snippet using ajax
	$.ajax({
		url: '/admin/marker-assign-automatic-table',
		type:'GET',
		success:function(response){
			$('#automatic-assign-container .content').addClass('animated fadeInUp');
			if(response.successful){
				$('#automatic-assign-container .content').html(response.html);
			} else {
				$('#automatic-assign-container .content').addClass('error-display');
				$('#automatic-assign-container .content').html(response.message);
			}

			$('#automatic-assign-container .loader-container').hide();
		},
	});

	$("body").on("submit", "#calculateSecondMarkers",  function(e) {
		e.preventDefault();

		$('#automatic-assign-container .loader-container').show();
		$('#automatic-assign-container .loader-container p').text('Assigning second markers to students...');

		$.ajax({
			url: $(this).prop('action'),
			type:'POST',
			data: $(this).serialize(),
			success:function(response){
				response = JSON.parse(response);

				$('#automatic-assign-container .content').addClass('animated fadeInUp');
				if(response.successful){
					$('#automatic-assign-container .content').html(response.html);
				} else {
					$('#automatic-assign-container .content').addClass('error-display');
					$('#automatic-assign-container .content').html(response.message);
				}

				$('#automatic-assign-container .loader-container').hide();
			},
		});
	});

	$("body").on("click", "#showReportTable",  function(e) {
		e.preventDefault();

		$('#automatic-assign-container .loader-container').show();
		$('#automatic-assign-container .loader-container p').text('Getting second marker table...');

		$.ajax({
			url: '/admin/marker-assign-report-table',
			type:'GET',
			success:function(response){
				response = JSON.parse(response);

				$('#automatic-assign-container .content').addClass('animated fadeInUp');
				if(response.successful){
					$('#automatic-assign-container .content').html(response.html);
				} else {
					$('#automatic-assign-container .content').addClass('error-display');
					$('#automatic-assign-container .content').html(response.message);
				}

				$('#automatic-assign-container .loader-container').hide();
			},
		});
	});
});
