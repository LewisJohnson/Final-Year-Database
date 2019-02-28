/*
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";

	var isInEditMode = false;

	var isFinialised = Window['isFinialised'];
	var userIsSupervisor = Window['isSupervisor'];
	var userIsMarker = Window['isMarker'];
	var selectorModifier;

	if(isFinialised == null || userIsSupervisor == null || userIsMarker == null){
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

	$('body').on('click', '.delete', function(e){
		if(isInEditMode){
			$(this).closest('.form-field').remove();
		}
	});

	$("#edit").on('click', function(e){
		e.preventDefault();

		if(isInEditMode){
			window.location.reload();
		} else {
			editMode();
		}
	});

	$("#finalise").on('click', function(){
		finaliseMode();
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

	function finaliseMode(){
		editMode();

		$("#newFieldForm").hide();
		$("#finaliseFields").show();
		
		var supervisorMark = parseInt($("#supervisorMark").val());
		var markerMark = parseInt($("#markerMark").val());

		$("#isFinal").val(true);
	}

	function editMode(){
		// Into edit mode
		$(".comment" + selectorModifier).hide();
		$(".js-value" + selectorModifier).hide();

		$("#edit").text('Cancel');
		$("#save").show();

		$("textarea" + selectorModifier).show();
		$(".custom-range" + selectorModifier).show();

		if(!isFinialised){
			$("#finalise").hide();
		}

		isInEditMode = true;
	}
});
