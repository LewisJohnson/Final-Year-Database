;$(function() {
	"use strict";

	var submitButton = $("#supervisor-report-search-button");
	var input = $("#supervisor-report-search-input");

	$(submitButton).on("click", function() {
		scrollToSupervisor();
	});

	$(document).keyup(function (e) {
		if (input.is(":focus") && e.keyCode === 13) {
			scrollToSupervisor();
		}
	});

	function scrollToSupervisor(){
		var supervisor = $('#' +  input.val().replace(/[\s.]+/g, ''));

		if(supervisor.length < 1){
			showNotification("error", "Supervisor \"' + input.val() + '\" can not be found.");
		} else {
			supervisor.removeClass("animated shake");
			$("html, body").animate({ 
				scrollTop: supervisor.offset().top - 50 }, 600, 
				function() {
					supervisor.addClass("animated shake");
			});
		}
		
		input.val("");
	}
});