/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

/*
|--------------------------------------------------------------------------
| MAIN
|--------------------------------------------------------------------------
|
| A bunch of stuff.
|
|------------------
| FILE STRUCTURE
|------------------
|
|  	1. AJAX Setup
|	2. HTML Modifications
|	3. Forms
|	4. Click Events
| 	5. Change Events
|	6. HTML Editor
|   7. Other
*/

import '../js/components';

/* ================
	1. AJAX Setup
	================ */
$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
	}
});

$(document).ajaxSend(function(event, jqxhr, request) {
	if(!request.url.toLowerCase().includes('http')){
		request.url = config.ajaxBaseUrl + request.url;
	}
});

// DOC READY
"use strict";
;$(function() {
	/* ========================
		2. HTML Modifications
	   ======================== */

	if($('.show--scroll-to-top').length > 0){
		$('body').append('<button class="button button--raised button--accent scroll-to-top">Scroll to Top</button>');
	}

	if(config.fancyAnimations){
		var animatedSelector = ".animated-entrance div, .animated-entrance .card, .animated-entrance h1, .animated-entrance h2, .animated-entrance p, .animated-entrance li";
		$(animatedSelector).css("opacity", 0);

		// Animate all cards
		var animatedEntranceAnimationDelay = 0;

		$(animatedSelector).each(function(index, value) {
			animatedEntranceAnimationDelay += 50;
			setTimeout(function(){
				$(this).addClass("slideInUp animated");

				$(this).animate({
					opacity: 1
				}, 800);

			}.bind(this), animatedEntranceAnimationDelay);
		});

	}

	// Makes primary topic first
	$('.topics-list').prepend($('.first'));
	if($('.topics-list .no-topics').length < 1){
		$('[class="topics-list"] li').css("opacity", 0);

		var animatedTopicsAnimationDelay = 0;
		$('[class="topics-list"] li').each(function(index, value) {
			animatedTopicsAnimationDelay += 200;
			setTimeout(function(){
				$(this).addClass("slideInRight animated");

				$(this).animate({
					opacity: 1
				}, 800);

			}.bind(this), animatedTopicsAnimationDelay);
		});
	}

	$('.order-list-js').each(function() {
		var list = $(this);
		// sortUnorderedList(list);

		if(list.hasClass('last-name-header-list-js')){
			if(!list.attr('id')){
				console.error('A unique id is required.');
				return;
			}

			list.before('<div class="header-links" id="' + list.attr('id') + '-links"></div>');
			addLastNameHeadersToList(list);
		}

		if(list.hasClass('alpha-header-list-js')){
			if(!list.attr('id')){
				console.error('A unique id is required.');
				return;
			}

			list.before('<div class="header-links" id="' + list.attr('id') + '-links"></div>');
			addAlphaHeadersToList(list);
		}

		if(list.hasClass('title-header-list-js')){
			if(!list.attr('id')){
				console.error('A unique id is required.');
				return;
			}

			list.before('<div class="header-links" id="' + list.attr('id') + '-links"></div>');
			addTitleHeadersToList(list);
		}
	});

	/* ======================
		 3. FORMS
	   ====================== */

	// Used on the student index page
	$("#share-name-form").on('submit', function(e){
		e.preventDefault();

		$.ajax({
			url: $(this).prop('action'),
			type:'PATCH',
			data: $(this).serialize(),
			success:function(response){
				if(response.share_name){
					createToast('success', 'Your name is being shared with other students.');
				} else {
					createToast('', 'You are no longer sharing your name with other students.');
				}
				$('#share_name').prop('checked', response.share_name);
			},
		});
	});


	/**
		* Toggle reverencing emails.
		*
		* Visible on supervisor homepage
	*/
	$(".receive-emails-form").on('submit', function(e){
		e.preventDefault();

		$.ajax({
			url: $(this).prop('action'),
			type:'PATCH',
			data: $(this).serialize(),
			success:function(response){
				if(response.successful){
					createToast('success', response.message);
				} else {
					createToast('error', response.message);
				}
			},
		});
	});

	/**
		* Submit login details
	*/
	$("#loginForm").on('submit', function(e){
		e.preventDefault();

		$('.help-block', '#loginForm').css("display", "none");

		if($(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0] !== undefined){
			$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.showLoader();
		}

		$.ajax({
			url: $(this).prop('action'),
			type:'POST',
			data: $(this).serialize(),
			success: function(response){
				if(response.successful){
					if(response.url != null){
						window.location = response.url;
					} else {
						location.reload(true);
					}
				} else {
					$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_FORM).show();
					$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_FORM).text(response.message);
				}
			}
		}).always(function(response){
			if($(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0] !== undefined){
				$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideLoader();
			}
		});
	});


	/**
		* Create a new topic form submit
	*/
	$('#new-topic-form').on('submit', function(e) {
		e.preventDefault();

		var submitButton = $(this).find(':submit');
		submitButton.html('<div class="loader"></div>');
		$('.loader', submitButton).css('display', 'block');

		$.ajax({
			url: $(this).prop('action'),
			type:'POST',
			context: $(this),
			data: $(this).serialize(),
			success:function(data){
				data = JSON.parse(data);
				var elem = EditTopic.prototype.functions.createEditTopicDOM(data["id"], data["name"]);
			},
		}).always(function(){
			$(this).find('input').val('');
			$(this).find(':submit').html('Add');
		});
	});

	$('#new-programme-form').on('submit', function(e) {
		e.preventDefault();

		var submitButton = $(this).find(':submit');
		submitButton.html('<div class="loader"></div>');
		$('.loader', submitButton).css('display', 'block');

		$.ajax({
			url: $(this).prop('action'),
			type:'POST',
			context: $(this),
			data: $(this).serialize(),
			success:function(data){
				data = JSON.parse(data);
				var elem = EditProgramme.prototype.functions.createEditProgrammeDOM(data["id"], data["name"]);
			},
		}).always(function(){
			$(this).find('input').val('');
			$(this).find(':submit').html('Add');
		});
	});

	/**
		* New/Edit user form
	*/
	var supervisorForm = $('#supervisor-form');
	var studentForm = $('#student-form');

	supervisorForm.hide();
	studentForm.hide();

	$('.user-form-supervisor').each(function() {
		if($(this).prop('checked')){
			supervisorForm.show(400);
		}
	});

	$('.user-form-supervisor').on('change', function(){
		if($(this).prop('checked')){
			$('.user-form-student').attr('disabled', 'true');
			supervisorForm.show(400);
		} else {
			var checked = false;
			$('.user-form-student').removeAttr('disabled');
			$('.user-form-supervisor').each(function() {
				if($(this).prop('checked')){
					checked = true;
				}
			});

			if(!checked){
				supervisorForm.hide(400);
			}
		}
	});

	$('.user-form-student').each(function() {
		if($(this).prop('checked')){
			studentForm.show(400);
		}
	});

	$('.user-form-student').on('change', function(){
		if($(this).prop('checked')){
			studentForm.show(400);
			$('.user-form-supervisor').attr('disabled', 'true');
		} else {
			var checked = false;
			$('.user-form-supervisor').removeAttr('disabled');
			$('.user-form-student').each(function() {
				if($(this).prop('checked')){
					checked = true;
				}
			});

			if(!checked){
				studentForm.hide(400);
			}
		}
	});

	$('.user-form #username').on('keydown keyup change', function(){
		$('.user-form #email').val($(this).val() + "@sussex.ac.uk");
	});

	$('form.delete-project').on('submit', function(e) {
		e.preventDefault();
		var form = $(this);
		var projectName = form.data('project-title');

		$.confirm({
			title: 'Delete',
			type: 'red',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement : false,
			content: 'Are you sure you want to delete <b>' + projectName + '</b>?',
			buttons: {
				confirm: {
					btnClass: 'btn-red',
					action: function(){
						$.ajax({
							method: 'DELETE',
							url: form.prop('action'),
							data: {
								project_id: form.data('project-id'),
							},
							success:function(response){
								if(response.successful){
									window.location.href = response.url;
								} else {
									createToast('error', response.message);
								}
							}
						});
					}
				},
				cancel: {},
			}
		});
	});

	/* ======================
		 4. CLICK EVENTS
	   ====================== */
	// External links give an illusion of AJAX
	var alreadyChangingDocument = false;
	$("body").on("click", ".external-link",  function(e) {
		if(alreadyChangingDocument){
			return;
		}
		alreadyChangingDocument = true;
		var elemToHideSelector = $($(this).data('element-to-hide-selector'));
		var elemToReplace = $($(this).data('element-to-replace-with-loader-selector'));

		$(this).removeClass('active');

		elemToHideSelector.hide();
		elemToReplace.hide();
		elemToReplace.after('<div id="content-replaced-container" class="loader loader--x-large"></div>');

		$('#content-replaced-container').css('display', 'block');
	});

	$('nav.mobile .sub-dropdown').on('click', function(){
		var dropdown = $(this);
		var linkContainer = $(this).parent().parent();
		var content = dropdown.find('.dropdown-content');

		if(dropdown.attr("aria-expanded") == "true"){
			dropdown.attr("aria-expanded", false);
			dropdown.find(".svg-container svg").css("transform", "rotateZ(0deg)");
			dropdown.removeClass("active");
			
			content.attr("aria-hidden", true);
			content.removeClass("active");

			linkContainer.find('li').slideDown(config.animtions.slow);

		} else {
			dropdown.attr("aria-expanded", true);
			dropdown.find(".svg-container svg").css("transform", "rotateZ(180deg)");
			dropdown.addClass("active");
			
			content.attr("aria-hidden", false);
			content.addClass("active");
			
			linkContainer.find('li').each(function(index) {
				if($(this).index() != dropdown.parent().index()){
					$(this).slideUp(config.animtions.slow);
				}
			});
		}
	});

	$('.student-undo-select').on('click', function(e) {
		var card = $(this).parent();
		$.confirm({
			title: 'Undo Project Selection',
			type: 'red',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement : false,
			autoClose: 'cancel|10000',
			content: 'Are you sure you want to un-select your selected project?</b>',
			buttons: {
				confirm: {
					btnClass: 'btn-red',
					action: function(){
						$.ajax({
							method: 'PATCH',
							url: 'students/undo-selected-project',
							success:function(response){
								if(response.successful){
									createToast('success', 'Undo successful.');
									card.slideUp(400, function() { 
										location.reload();
									});

								} else {location.reload();
									createToast('error', response.message);
								}
							}
						});
					}
				},
				cancel: {},
			}
		});
	});

	// Site-wide feedback form
	$('#leave-feedback-button').on('click', function(e){
		$.confirm({
			title: 'Feedback',
			content: function () {
				var self = this;
				return $.ajax({
					url: 'feedback',
					dataType: 'html',
					method: 'GET',
				}).done(function (response) {
					self.setContent(response);
				}).fail(function(){
					self.setContent('Something went wrong.');
				});
			},
			type: 'blue',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path  d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement : true,
			buttons: {
				formSubmit: {
					text: 'Submit',
					btnClass: 'btn-blue',
					action: function () {
						var comment = this.$content.find('.comment').val();
						if(!comment){
							$.alert('Please provide some feedback.');
							return false;
						}

						$.ajax({
							url: 'feedback',
							method: 'POST',
							data: this.$content.find('form').serialize(),
							success:function(response){
								if(response.successful){
									createToast('success', response.message);
								} else {
									createToast('error', response.message);
								}
							}
						});
					}
				},
				cancel: function () {},
			},
			onContentReady: function () {
				$('#feedback-page').val(window.location.pathname);

				// bind to events
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					e.preventDefault();
					jc.$$formSubmit.trigger('click');
				});
			}
		});
	});

	// Submit receive email form when checkbox toggled
	$('.receive-emails-checkbox').on('click', function(e){
		$(this).submit();
	});
	
	// Adds or removes a project from a student favourites
	$(".favourite-container").on('click', function() {
		if($('.loader', svgContainer).css('display') !== 'none'){
			return;
		}

		var svgContainer = $(this);
		var svg = svgContainer.find('svg');

		if(window['project'] != null){
			var projectId = window['project'].data('project-id');
		} else {
			var projectId = $(this).data('project-id');
		}

		svg.hide(0);
		$('.loader', svgContainer).show(0);

		if(svg.hasClass('favourite')){
			var action = 'remove';
			var ajaxUrl = 'students/remove-favourite';

		} else {
			var action = 'add';
			var ajaxUrl = 'students/add-favourite';
		}

		$.ajax({
			url: ajaxUrl,
			type:'PATCH',
			data: {
				project_id: projectId
			},
			success:function(){
				if(action == "add"){
					svg.addClass('favourite');
				} else {
					svg.removeClass('favourite');
				}
			}
		}).always(function(data){
			svg.fadeIn(config.animtions.fast);
			$('.loader', svgContainer).hide(0);
		});
	});
	
	/* ======================
		 5. CHANGE EVENTS
	   ====================== */

	var dontRemindAgainAmoutMailtoLimit = false;
	$("body").on("change", ".email-table .checkbox input", function() {
		var select = function(dom){
			var status = dom.parents().eq(4).data('status');
			var adminEmail = dom.parents().eq(4).data('admin-email');
			var emailString = "mailto:" + adminEmail + "?bcc=";
			var checkboxSelector = '.email-table.' + status + ' .checkbox input';
			var emailButtonselector = ".email-selected." + status;
			var amountOfEmails = 0;

			$(checkboxSelector).each(function(index, value) {
				if(amountOfEmails > 100){
					return false;
				}

				if($(value).is(":checked") && !$(value).hasClass("master-checkbox")) {
					emailString += $(value).data('email');
					emailString += ",";
					amountOfEmails++;
				}
			});

			if(amountOfEmails > 100 && !dontRemindAgainAmoutMailtoLimit){
				$.confirm({
					type: 'red',
					icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg></div>',
					theme: 'modern',
					escapeKey: true,
					animateFromElement : false,
					backgroundDismiss: true,
					title: 'Mailto Limit Reached',
					content: 'URLs have a length limit of around 2000 characters. The amount of people you have selected is greater than this limit. The first 100 people you selected will be emailed.',
					buttons: {
						neveragain: {
							text: "Okay, don't remind me again",
							btnClass: 'btn-red-text',
							action: function(){
								dontRemindAgainAmoutMailtoLimit = true;
							}
						},
						okay: {},
					}
				});
			}

			$(emailButtonselector).prop('href', emailString);
		};
		setTimeout(select($(this)), 2000);
	});

	// Check title name
	if($('.project-title').length > 0){
		var titleCharCount = $('#title-character-count');
		var title = $('#title');
		var projectId = $('.project-form').data('project-id');

		// Bind value
		// Only bind blur to not spam DB
		title.on("blur",  function(){
			checkTitleInDatabase(projectId);
		});

		title.on("blur keydown change",  function(){
			checkTitleLength();
		});

		// Set initial value
		checkTitleLength(projectId);
		checkTitleInDatabase(projectId);
	}

	function checkTitleInDatabase(projectId){
		// Check already used titles
		$.ajax({
			url: 'projects/check-title',
			type:'POST',
			data: {
				project_title: title.val(),
				project_id: projectId
			},
			success:function(result){
				if(result.hasSameTitle){
					$('#title-already-used').fadeIn(config.animtions.medium);
					$('#similar-title-already-used').fadeOut(config.animtions.medium);
				} else {
					$('#title-already-used').fadeOut(config.animtions.medium);

					if(result.hasSimiliarTitle){
						$('#similar-title-already-used').fadeIn(config.animtions.medium);
					} else {
						$('#similar-title-already-used').fadeOut(config.animtions.medium);
					}
				}
			},
		});
	}

	function checkTitleLength(){
		var length = title.val().length;
		titleCharCount.text(length + '/40');

		if(length > 40){
			titleCharCount.css('color', 'red');
		} else {
			titleCharCount.css('color', 'darkgray');
		}
	}

	/* ======================
		 6. HTML EDITOR
	   ====================== */
	$('.html-editor').each(function(index, value){
		$.ajax({
			url: 'snippet?snippet=html-editor-toolbar',
			type:'GET',
			success:function(result){
				$('.html-editor--input').after(result);
			},
		});

		var buttonsHtml = "<div class='html-editor--top-buttons flex'><button class='html' type='button'>HTML</button><button class='preview' type='button'>PREVIEW</button></div>";
		var previewHtml = "<div class='html-editor--preview-container'><div class='html-editor--preview'></div></div>";

		$('.html-editor--input').before(buttonsHtml);
		$('.html-editor').after(previewHtml);

		$('.html-editor--preview-container').hide();
		$('.html-editor--top-buttons .html').addClass('active');
	});

	$('.html-editor--top-buttons .html').on('click', function(){
		$(this).addClass('active');
		$('.html-editor--top-buttons .preview').removeClass('active');

		$('.html-editor--input').show();
		$('.html-editor--toolbar').show();
		$('.html-editor--preview-container').hide();
	});

	$('.html-editor--top-buttons .preview').on('click', function(){
		if($(this).hasClass('active')){
			return;
		}

		$(this).addClass('active');
		$('.html-editor--top-buttons .html').removeClass('active');
		$('.html-editor--preview').html('<div style="display: block;margin: 70px auto;" class="loader loader--large"></div>');
		$('.html-editor--input').hide();
		$('.html-editor--toolbar').hide();
		$('.html-editor--preview-container').show();
		updateProjectPreview();
	});

	function updateProjectPreview(){
		$.ajax({
			url: 'projects/description-preview',
			type:'POST',
			data: {
				'description': $('.html-editor--input').val()
			},
			success: function(result){
				$('.html-editor--preview').html(result.message);
			}
		});
	}

	// Toggle label flips toggle
	$(".html-editor").on("click", ".html-editor--toolbar li button",  function(e) {
		switch($(this).data('type')){
			case "linebreak":
				insertAtCaret('html-editor--input', '<br>');
				break;

			case "ol":
				insertAtCaret('html-editor--input', '\n<ol>\n\t<li>Item 1</li>\n\t<li>Item 2</li>\n\t<li>Item 3</li>\n</ol>');
				break;

			case "ul":
				insertAtCaret('html-editor--input', '\n<ul>\n\t<li>Item x</li>\n\t<li>Item y</li>\n\t<li>Item z</li>\n</ul>');
				break;

			case "bold":
				wrapTextWithTag('html-editor--input', 'b');
				break;

			case "italic":
				wrapTextWithTag('html-editor--input', 'i');
				break;

			case "underline":
				wrapTextWithTag('html-editor--input', 'u');
				break;

			case "strike":
				wrapTextWithTag('html-editor--input', 's');
				break;
				
			case "video":
				var inputUrl = prompt("Enter the video URL", "https://www.");
				var html = '<video controls>\n';
					html += '<source src="'+ inputUrl +'" type="video/mp4">\n';
					html += '</video>\n';
				insertAtCaret('html-editor--input', html);
				break;

			case "img":
				var inputUrl = prompt("Enter the image URL", "https://www.");
				var inputAlt = prompt("Enter alt text", "Image of Sussex campus");
				insertAtCaret('html-editor--input', '<img alt="' + inputAlt + '" src="' + inputUrl + '">');
				break;

			case "link":
				var inputUrl = prompt("Enter the URL", "https://www.");
				var inputText = prompt("Enter display text", "Sussex");
				insertAtCaret('html-editor--input', '<a href="' + inputUrl + '">' + inputText + '</a>');
				break;

			case "code":
				wrapTextWithTag('html-editor--input', 'code');
				break;

			case "pre":
				wrapTextWithTag('html-editor--input', 'pre');
				break;

			case "info":
				$.dialog({
					theme: 'modern',
					escapeKey: true,
					animateFromElement : false,
					backgroundDismiss: true,
					title: 'HTML Editor',
					content: 'Here are some notes to... note about the HTML editor. <ul style="text-align: left;padding-top: 15px;"><li>All external links will open in a new tab.</li><li>All HTML 5 elements are valid for the description field, excluding;<ul><li>Script tags.</li><li>Heading tags.</li><li>HTML document tags.</li><li>Body tags.</li></li></ul></ul>',
				});
				break;
		}
	});

	/* ======================
		 7. OTHER
	   ====================== */
	$('[data-hover]').on('mouseenter', function(){
		if($('#showTransactionDetailOnHover').prop("checked")){
			$(this).attr('data-original', $(this).html());
			$(this).html($(this).data('hover'));
		}
	});

	$('[data-hover]').on('mouseleave', function(){
		if($('#showTransactionDetailOnHover').prop("checked")){
			$(this).html($(this).data('original'));
		}
	});
});
