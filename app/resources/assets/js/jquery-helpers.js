/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

/*
|--------------------------------------------------------------------------
| jQuery HELPERS
|--------------------------------------------------------------------------
|
| Helper functions that need to be called after the DOM is ready.
|
*/

$(function() {

	/**
		* Show scroll to top button.
	*/
	$(window).scroll(function(){
		if ($(this).scrollTop() > config.showScrollToTopButtonOffset) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

	/**
		* Scroll to top when button is clicked.
	*/
	$("body").on("click", ".scroll-to-top", function(e) {
		$('html, body').animate({
			scrollTop: 0
		}, config.scrollToTopDuration);
	});

	/**
		* The "Show more" button on students homepage.
		* 
		* Only shown if a student has selected, proposed or been accepted for a project.
	*/
	$("body").on("click", ".show-more",  function(e) {
		$(this).hide();
		$('.project').addClass('expand');
	});

	/**
		* Toggle label flips toggle.
		*
		* Toggles a toggle if it's label is clicked.
	*/
	$("body").on("click", ".switch-label.switch-label--toggle",  function(e) {
		var id = "#" + $(this).attr('for');
		$(id).click();
	});


	/**
		* Checkbox form toggle.
		*
		* Toggles a toggle if it's form is clicked.
	*/
	$("body").on("click", ".form-field--toggle",  function(e) {
		if($(e.target).hasClass("toggle") || $(e.target).parent().hasClass("toggle")){
			return;
		}

		$(this).find('input:checkbox').click();
	});

	/**
		* EU Cookie banner.
		*
		* Hides banner when clicked.
	*/
	$(".cookie-banner").on("click", "button",  function(e) {
		setCookie('cookie-banner-seen', true, 365);
		$(this).parent().hide(config.animtions.medium);
	});

	/**
		* Boolean valued checkbox.
		*
		* Instead of 'checked' attribute, the values will be true/false
	*/
	$(".boolean-checkbox").each(function() {
		$(this).parent().parent().after('<input type="hidden" name="' + $(this).attr("name") + '" value="' + $(this).is(':checked') +'" />');
	});

	$("body").on("click", ".boolean-checkbox",  function(e) {
		if($(this).is(':checked')) {
			$(this).parent().parent().next().val("true");
		} else {
			$(this).parent().parent().next().val("false");
		}
	});

	/**
		* Remember checkbox value with cookies.
		*
		* Toggles a toggle if it's form is clicked.
	*/
	$('.remember-with-cookie:checkbox').on('change', function() {
		rememberFormValues("checkbox");
	});


	/**
		* Assign project to window variable.
		*
		* Used as an easy way for functions to get current project data from other JS files.
	*/
	if($('.project-card').length > 0){
		window['project'] = $('.project-card');
	}


	$('.sort-table thead tr th').on('click', function() {
		sortTable($(this), $(this).closest('table'));
	});

	// Repopulate checkboxes
	repopulateCheckboxes();
});

// A catch all approach to AJAX errors.
$(document).ajaxError(function(event, request, settings) {
	if(config.showAjaxRequestFailNotification){
		createToast('error', 'Something went wrong with that request.');
	}
});