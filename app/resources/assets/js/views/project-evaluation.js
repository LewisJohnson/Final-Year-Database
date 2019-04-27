/*
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */


;$(function() {
	"use strict";
	
	$.fn.autogrow = function() {
		return this.each(function() {
			var textarea = this;
			$.fn.autogrow.resize(textarea);
			$(textarea).focus(function() {
				textarea.interval = setInterval(function() {
					$.fn.autogrow.resize(textarea);
				}, 500);
			}).blur(function() {
				clearInterval(textarea.interval);
			});
		});
	};

	$.fn.autogrow.resize = function(textarea) {
		var lineHeight = parseInt($(textarea).css('line-height'), 10);
		var lines = textarea.value.split('\n');
		var columns = textarea.cols;
		var lineCount = 0;
		$.each(lines, function() {
			lineCount += Math.ceil(this.length / columns) || 1;
		});
		var height = Math.max(100, (lineHeight * (lineCount / 3)));

		if($(textarea).parent().hasClass('col-md-6')) {
			$(textarea).css('height', height);
		} else {
			$(textarea).css('height', height / 2);
		}
	};

	var isInEditMode = false;
	var userIsSupervisor = Window['isSupervisor'];
	var userIsMarker = Window['isMarker'];
	var selectorModifier;

	if(userIsSupervisor == null || userIsMarker == null){
		createToast('error', "Something went wrong (ERROR: Window variable 'isFinialised' is null).");
	}

	$('#project-evaluation-form textarea').autogrow();

	if(userIsSupervisor) {
		selectorModifier = ".supervisor ";
	} else if(userIsMarker) {
		selectorModifier = ".marker ";
	}

	// Hide save and cancel buttons
	$("#save").hide();
	$("#cancel").hide();

	// Hides the custom field delete buttons
	$(".js-input").hide();
	$(".custom-range").hide();

	$("#edit").on('click', function(e){
		e.preventDefault();
		editMode();
	});

	$("#cancel").on('click', function(e){
		e.preventDefault();
		window.location.reload();
	});

	var userHasSeenShortJointReportLength = false;

	$("#finalise").on('click', function(e){
		e.preventDefault();

		$(".js-error").remove();
		var posterMark = parseInt($("#poster-final-mark").val());
		var presentationMark = parseInt($("#presentation-final-mark").val());
		var dissertationMark = parseInt($("#dissertation-final-mark").val());

		if(!Number.isInteger(posterMark) || !Number.isInteger(presentationMark) || !Number.isInteger(dissertationMark)){
			$(".dialog .container").append('<p class="js-error mt-2 p-2 text-white bg-danger">Values must be an integer.</p>');
			$(".dialog .container").scrollTop(999999);
			return;
		}

		if((posterMark < 0 || posterMark > 100) || (presentationMark < 0 || presentationMark > 100) || (dissertationMark < 0 || dissertationMark > 100)){
			$(".dialog .container").append('<p class="js-error mt-2 p-2 text-white bg-danger">Values must be between 0 - 100.</p>');
			$(".dialog .container").scrollTop(999999);
			return;
		}

		if($("#jointReport").length > 0){
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
		}

		window['Dialog'].showLoader();
		$("#project-evaluation-finalise-form").submit();
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
				text = "Border-";
				rgb = "237,44,24";
			break;

			case 2:
				text = "Border";
				rgb = "234,80,19";
			break;

			case 3:
				text = "Border+";
				rgb = "230,116,14";
			break;

			case 4:
				text = "Satisfactory-";
				rgb = "227,152,9";
			break;

			case 5:
				text = "Satisfactory";
				rgb = "223,188,4";
			break;

			case 6:
				text = "Satisfactory+";
				rgb = "180,195,3";
			break;

			case 7:
				text = "Good-";
				rgb = "137, 204, 2";
			break;

			case 8:
				text = "Good";
				rgb = "94, 212, 2";
			break;

			case 9:
				text = "Good+";
				rgb = "51, 220, 1";
			break;

			case 10:
				text = "Excellent";
				rgb = "9, 228, 1";
			break;

			default:
				text = "Not Set";
				rgb = "50, 50, 50";
			break;
		}

		if(input.is('[data-unset]')){
			text = "Not Set";
			rgb = "50, 50, 50";
		}

		input.prev('.js-value').text(text);
		input.prev('.js-value').css('color', 'rgb(' + rgb + ')');
	}

	function editMode(){
		// Into edit mode

		$(".js-value" + selectorModifier).each(function(){
			var group = $(this).data('group');

			if($("#submitted_group_" + group).length == 0){
				$(this).hide();
				$(this).next(".js-input" + selectorModifier).show();
				$(this).next("textarea" + selectorModifier).show();
				$(this).next(".custom-range" + selectorModifier).prev('.js-value').show();
				$(this).next(".comment" + selectorModifier).hide();
			}
		});

		$("[data-unset]").removeAttr("data-unset");

		$("#edit").hide();
		$("#cancel").show();
		$("#save").show();

		// Hide all submit buttons
		$(".js-submission").hide();

		// Hide finalise button
		$("#finaliseEvaluation").hide();

		isInEditMode = true;
	}
});