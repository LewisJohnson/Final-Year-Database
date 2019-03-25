/*
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";

	var isInEditMode = false;

	var userIsSupervisor = Window['isSupervisor'];
	var userIsMarker = Window['isMarker'];
	var selectorModifier;

	if(userIsSupervisor == null || userIsMarker == null){
		createToast('error', "Something went wrong (ERROR: Window variable 'isFinialised' is null).");
	}

	if(userIsSupervisor) {
		selectorModifier = ".supervisor ";
	} else if(userIsMarker) {
		selectorModifier = ".marker ";
	}

	// Hides the custom field delete buttons
	$("#save").hide();
	$(".js-input").hide();
	$(".custom-range").hide();

	$("#edit").on('click', function(e){
		e.preventDefault();

		if(isInEditMode){
			// This is the cancel button
			window.location.reload();
		} else {
			editMode();
		}
	});

	var userHasSeenShortJointReportLength = false;

	$("#finalise").on('click', function(e){
		$(".js-error").remove()
		var finalMark = parseInt($("#finalMark").val());

		if(!Number.isInteger(finalMark)){
			$(".dialog .container").append('<p class="js-error mt-2 p-2 text-white bg-danger">Final mark must be an integer.</p>');
			$(".dialog .container").scrollTop(999999);
			return;
		}

		if(finalMark < 0 || finalMark > 100){
			$(".dialog .container").append('<p class="js-error mt-2 p-2 text-white bg-danger">Final mark must be between 0 - 100.</p>');
			$(".dialog .container").scrollTop(999999);
			return;
		}

		if($("#jointReport").val().length < 120){
			$(".dialog .container").append('<p class="js-error mt-2 p-2 text-white bg-danger">The joint report must be at least 120 characters.</p>');
			$(".dialog .container").scrollTop(999999);
			return;
		}

		if($("#jointReport").val().length < 240 && !userHasSeenShortJointReportLength){
			$(".dialog .container").append('<div class="js-error alert alert-warning mt-2" role="alert">The joint report looks a bit short. If you\'re sure it\'s long enough, resubmit the form.</div>');
			$(".dialog .container").scrollTop(999999);
			userHasSeenShortJointReportLength = true;
			return;
		}

		$(".dialog .container").find("input, textarea").removeClass('d-inline-block').addClass('d-none');

		$("#projectEvaluationForm").append($(".dialog .container").find("input, textarea"));
		window['Dialog'].showLoader();

		$("#projectEvaluationForm").submit();
	});

	$('body').on('input change', '.custom-range', function(){
		showScaleText($(this));
	});

	$('.custom-range').each(function(){
		showScaleText($(this));
	});

	function showScaleText(input){
		var val = parseInt(input.val());
		var text = "";
		var rgb = "255,0,0";

		switch(val){
			case 0:
				text = "Fail";
				rgb = "200,10,10";
			break;

			case 1:
				text = "Border";
				rgb = "176,34,10";
			break;

			case 2:
				text = "Border+";
				rgb = "153,58,10";
			break;

			case 3:
				text = "Satisfactory";
				rgb = "120,120,10";
			break;

			case 4:
				text = "Satisfactory+";
				rgb = "180,180,10";
			break;

			case 5:
				text = "Good";
				rgb = "81,129,10";
			break;

			case 6:
				text = "Good+";
				rgb = "58,153,10";
			break;

			case 7:
				text = "Excellent";
				rgb = "10,200,10";
			break;
		}

		input.prev('.js-value').text(text);
		input.prev('.js-value').css('color', 'rgb(' + rgb + ')');
	}

	function editMode(){
		// Into edit mode
		$(".comment" + selectorModifier).hide();
		$(".js-value" + selectorModifier).hide();

		$("#edit").text('Cancel');
		$("#edit").addClass('btn-secondary');

		$("#save").show();
		$("#finaliseEvaluation").hide();
		
		$("textarea" + selectorModifier).show();
		$(".custom-range" + selectorModifier).prev('.js-value').show();
		$(".js-input" + selectorModifier).show();

		isInEditMode = true;
	}
});
