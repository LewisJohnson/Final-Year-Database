/*
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

/*
|--------------------------------------------------------------------------
| MAIN
|--------------------------------------------------------------------------
|
| The JavaScript functions required solely by Project or System Administrators
|
|------------------
| FILE STRUCTURE
|------------------
|
|  	1. Project Admin
|		1.1 Import Students
|		1.2 Delete User
|		1.3 End-Of-Year Archive
|		1.4 New Topic
|		1.5 New Programme
|		1.6 New User
|		1.7 Project Evaluation
|			1.7.1 Thresholds
|			1.7.2 Questions
|			1.7.3 Print
|			1.7.4 Manual Finalise
|			1.7.5 Delete
|		1.8 PE student Feedback
|			1.8.1 Print
|			1.8.2 Print All
|	2. System Admin
|		2.1 User Feedback
|		
*/

;$(function() {
	"use strict";

	/* ==================
		1. PROJECT ADMIN
	   ================== */

	// 1.1 Import Students
	$(".import-student-form").on('submit', function(e){
		e.preventDefault();

		if($(this).find('.file').length < 1){
			createToast('error', 'Please select a file.');
			return;
		}

		var modalTitle;
		var modalDesc;
		var modalType;

		if(requestType == "test"){
			modalTitle = "Test Import Students";
			modalDesc = "This test import will not affect any real data.";
			modalType = "blue";
		} else {
			modalTitle = "Import Students";
			modalDesc = "Please be sure of the file and options you have selected for import.";
			modalType = "red";
		}

		var fileData = $(this).find('.file').prop('files')[0];
		var requestType = $(this).data('type');
		var formData = new FormData();
		var formUrl = $(this).prop('action');

		formData.append('studentFile', fileData);

		modalDesc += '<br><p class="text-primary">FILE NAME: ' + fileData.name + '</p>';

		if($(this).find('#auto_programmes').is(":checked")){
			formData.append('auto_programmes', true);
			modalDesc += '<hr><p class="text-info">OPTION: Auto import programmes<br>';
			modalDesc += '<span class="text-muted">This will automatically import all of the programmes to the database.</span></p>';
		}
		
		if ($(this).find('#ignore_duplicate_entries').is(":checked")) {
			formData.append('ignore_duplicate_entries', true);
			modalDesc += '<hr><p class="text-info">OPTION: Ignore duplicate entries<br>';
			modalDesc += '<span class="text-muted">This  will ignore the duplicate entries on import.</span></p>';
		}

		if ($(this).find('#update_duplicate_entries').is(":checked")) {
			formData.append('update_duplicate_entries', true);
			modalDesc += '<hr><p class="text-warning">OPTION: Update duplicate entries<br>';
			modalDesc += '<span class="text-muted">This will update the Username, Last Name, First Name and Programme of a Student if a matching candidate number is found.</span></p>';
		}

		if($(this).find('#empty_programmes').is(":checked")){
			formData.append('empty_programmes', true);
			modalDesc += '<hr><span class="text-danger"><h5><b>⚠ DANGER ⚠<br> Empty programmes table</b></h5>';
			modalDesc += 'This will delete all programmes for <b>ALL</b> education levels.</span><hr>';
		}

		if($(this).find('#empty_students').is(":checked")){
			formData.append('empty_students', true);
			modalDesc += '<hr><span class="text-danger"><h5><b>⚠ DANGER ⚠<br> Empty students table</b></h5>';
			modalDesc += 'This will delete <b>ALL</b> students for this education level.</span><hr>';
		}

		$.confirm({
			title: modalTitle,
			type: modalType,
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement : false,
			content: modalDesc,
			buttons: {
				import: {
					btnClass: 'btn-red',
					action: function(){
						$.ajax({
							url: formUrl,
							cache: false,
							contentType: false,
							processData: false,
							data: formData,
							type: 'post',
							success: function(response){
								if(!response.successful){
									$('#import-student-result').html('<p style="color: red"><b>An error has occurred.</b>' + response.message + '</p>');
									return;
								}

								if(requestType == "test"){
									$('#import-student-test-result').html(response.message);
									$('#import-student-test-result').addClass('fadeInUp animated');
								} else {
									$('#import-student-result').html(response.message);
									$('#import-student-result').addClass('fadeInUp animated');
								}
							},
							error: function(response){
								$('#import-student-result').html('<p style="color: red"><b>An error has occurred.</b> This is likely caused by a foreign key constraint failure. Have you added all the programmes in the uploaded file to the database?</p>');
							},
						});
					}
				},
				cancel: {},
			}
		});
	});

	// 1.2 Delete User
	$('.delete-user').on('click', function(e) {
		e.preventDefault();
		var userDeleteButton = $(this);
		var userName = userDeleteButton.data('name');

		var isSupervisor = userDeleteButton.data('is-supervisor');
		var isStudent = userDeleteButton.data('is-student');

		var deleteConfirmationContent = 'Are you sure you want to delete <b>' + userName + '</b>?';

		if(isSupervisor){
			deleteConfirmationContent += '<br>Their projects and supervisor account will also be deleted.';
		}
		if(isStudent){
			deleteConfirmationContent += '<br>Their projects and student account will also be deleted.';
		}

		$.confirm({
			title: 'Delete User',
			type: 'red',
			icon: '<div class="svg-md"><div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement : true,
			content: function(){
				var self = this;
				self.setContent(deleteConfirmationContent);
				return $.ajax({
					url: 'users/info',
					type: 'GET',
					data: {
						id: userDeleteButton.data('id'),
					}
				}).done(function (response) {
					self.setContentAppend(response.message);
				}).fail(function(){
					self.setContentAppend('<div>We could not retrieve information about this user.</div>');
				});
			},
			buttons: {
				delete: {
					btnClass: 'btn-red',
					action: function(){
						$.ajax({
							method: 'DELETE',
							url: userDeleteButton.prop('action'),
							data: {
								id: userDeleteButton.data('id'),
							},
							success:function(response){
								if(response.successful){
									userDeleteButton.parent().remove();
									createToast('success', response.message);
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

	// 1.3 EOYA
	if($("#project_year").length > 0){
		updateEOYALinksAndButtonText();

		$("#project_year").on('change', function(){
			updateEOYALinksAndButtonText();
		});
	}

	function updateEOYALinksAndButtonText(){
		let projectYear = $("#project_year").val();

		//Update links
		$("#endOfYearArchive").attr('action', $("#endOfYearArchive").attr('data-base-url') + "?project_year=" + projectYear);
		$("#studentData").attr('href', $("#studentData").attr('data-base-url') + "?project_year=" + projectYear);

		//Update button text
		$("#studentData").text('Download Student Data for ' + projectYear);
		$("#eoyaButton").text('Archive ' + projectYear);

		if(projectYear == Window['projectYear']){
			$("#normalArchive").removeClass('d-none');
			$("#prevYearArchive").addClass('d-none');
		} else {
			$("#normalArchive").addClass('d-none');
			$("#prevYearArchive").removeClass('d-none');
		}
	}

	$("#studentData").on('click', function(){
		$("#eoyaButton")
			.attr('disabled', false)
			.attr('title', 'Start archiving')
			.removeClass('disabled');
	});

	
	$('body').on('submit', '#endOfYearArchive', function(e) {
		e.preventDefault();
		var form = $(this);
		var container = $('.eoya-container');
		var oldContainerHtml = container.html();
		var title = 'End of Year Archive';

		if($("#project_year").length > 0){
			title += ' for ' + $("#project_year").val();
		}

		$.confirm({
			title: title,
			type: 'red',
			icon: '<div class="svg-md"><div class="svg-container"><svg viewBox="0 0 24 24"><path d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z" /></svg></div></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement : false,
			content: 'Are you sure you want to archive? Make sure to double check the student data before pressing "Archive".',
			buttons: {
				archive: {
					btnClass: 'btn-red',
					action: function(){
						container.html('<div class="spinner spinner-border"></div>');

						$.ajax({
							url: form.prop('action'),
							type:'POST',
							success:function(response){
								if(response.successful){
									container.html('<h1>Archive Complete</h1><p class="subtitle">The year is complete, on to the next!</p>');
								} else {
									container.html(oldContainerHtml);
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

	// 1.4 New Topic
	/**
		* Create a new topic form submit.
	*/
	$('#new-topic-form').on('submit', function(e) {
		e.preventDefault();

		var submitButton = $(this).find(':submit');
		submitButton.html('<div class="spinner-border spinner-border-sm text-white"></div>');

		$.ajax({
			url: $(this).prop('action'),
			type:'POST',
			context: $(this),
			data: $(this).serialize(),
			success:function(data){
				data = JSON.parse(data);
				EditTopic.prototype.functions.createEditTopicDOM(data["id"], data["name"]);
			},
		}).always(function(){
			$(this).find('input').val('');
			$(this).find(':submit').html('Add');
		});
	});

	$(".js-topic input").on('keydown change', function(){
		var originalName = $(this).closest(".input-group").data("original-topic-name");
		var editButton = $(this).siblings(".input-group-append").find(".js-edit");

		if($(this).val() == originalName){
			editButton.removeClass("btn-outline-primary");
			editButton.addClass("disabled btn-outline-secondary");
		} else {
			editButton.removeClass("disabled btn-outline-secondary");
			editButton.addClass("btn-outline-primary");
		}
	});

	// 1.5 New Programme
	/**
		* Create a new programme form submit.
	*/
	$('#new-programme-form').on('submit', function(e) {
		e.preventDefault();

		var submitButton = $(this).find(':submit');
		submitButton.html('<div class="spinner-border spinner-border-sm text-light"></div>');

		$.ajax({
			url: $(this).prop('action'),
			type:'POST',
			context: $(this),
			data: $(this).serialize(),
			success:function(data){
				data = JSON.parse(data);
				EditProgramme.prototype.functions.createEditProgrammeDOM(data["id"], data["name"]);
			}
		}).always(function(){
			$(this).find('input').val('');
			$(this).find(':submit').html('Add');
		});
	});

	$(".js-programme input").on('keydown change', function(){
		var originalName = $(this).closest(".input-group").data("original-programme-name");
		var editButton = $(this).siblings(".input-group-append").find(".js-edit");

		if($(this).val() == originalName){
			editButton.removeClass("btn-outline-primary");
			editButton.addClass("disabled btn-outline-secondary");
		} else {
			editButton.removeClass("disabled btn-outline-secondary");
			editButton.addClass("btn-outline-primary");
		}
	});

	// 1.6 New User
	/**
		* New/Edit user form.
	*/
	var supervisorForm = $('#supervisor-form');
	var studentForm = $('#student-form');

	if($('.js-supervisor:checked').length < 1){
		supervisorForm.hide();
	} else {
		$('.js-student').attr('disabled', 'true');
		$('.js-staff').attr('disabled', 'true');
	}

	if($('.js-student:checked').length < 1){
		studentForm.hide();
	} else {
		$('.js-supervisor').attr('disabled', 'true');
	}

	if($('.js-staff:checked').length > 0){
		$('.js-student').attr('disabled', 'true');
	}

	$('.js-supervisor').on('change', function(){
		if($(this).prop('checked')){
			$('.js-student').attr('disabled', 'true');
			supervisorForm.show(config.animtions.medium);
		} else {
			$('.js-student').removeAttr('disabled');
			supervisorForm.hide(config.animtions.medium);
		}
	});

	$('.js-student').on('change', function(){
		if($(this).prop('checked')){
			$('.js-supervisor').attr('disabled', 'true');
			$('.js-staff').attr('disabled', 'true');
			$('.js-admin').attr('disabled', 'true');
			studentForm.show(config.animtions.medium);
		} else {
			$('.js-supervisor').removeAttr('disabled');
			$('.js-staff').removeAttr('disabled');
			$('.js-admin').removeAttr('disabled');
			studentForm.hide(config.animtions.medium);
		}
	});

	$('.js-staff').on('change', function(){
		if($(this).prop('checked')){
			$('.js-student').attr('disabled', 'true');
		} else {
			$('.js-student').removeAttr('disabled');
		}
	});

	/**
		* Auto generates the email from the username field.
	*/
	$('.user-form #username').on('keydown keyup change', function(){
		$('.user-form #email').val($(this).val() + "@sussex.ac.uk");
	});

	// 1.7 Project Evaluation
	// 1.7.1 Thresholds
	$("#new-threshold-button").on('click', function(){
		var newThresholdValue = parseInt($("#new-threshold-value").val());

		if(!Number.isInteger(newThresholdValue)){
			createToast('error', 'Threshold value must be an integer.');
			return;
		}

		if(newThresholdValue < 0 || newThresholdValue > 100){
			createToast('error', 'Threshold value must be between 0 - 100.');
			return;
		}

		// See if value already exists
		var thresholdValueAlreadyExists = false;

		$("input[name*='thresholds']").each(function(){
			if($(this).val() == newThresholdValue){
				thresholdValueAlreadyExists = true;
			}
		});

		if(thresholdValueAlreadyExists){
			createToast('error', 'Threshold values must be unqiue.');
			return;
		}

		$("#thresholds-list").append(
			`<li class="list-group-item">
				<div class="d-flex">
					<span>${newThresholdValue}%</span>
					<button type="button" class="btn btn-sm btn-outline-danger ml-auto js-deleteThreshold">Remove</button>
					<input type="hidden" name="thresholds[]" value="${newThresholdValue}">
				</div>
			</li>`
		);

		$("#new-threshold-value").val('');
	});

	$("body").on("click", ".js-deleteThreshold", function(){
		$(this).closest('li').remove();
	});

	// 1.7.2 Questions
	$("#new-question-button").on('click', function(){
		$("#questions-list").append(
			`<li class="border-bottom mb-3 pb-3">
				<div class="row">
					<div class="col-12 d-flex mb-2 align-items-center">
						<b>Question ${ $("#questions-list").children().length + 1 }</b>
						<button type="button" class="btn btn-sm btn-outline-danger ml-auto js-deleteQuestion">Remove</button>
					</div>

					<div class="col-1">
						<label>Group</label>
						<input class="form-control" type="text" name="group[]">
					</div>

					<div class="col-6">
						<label>Title</label>
						<input class="form-control" type="text" name="title[]">
					</div>

					<div class="col-3">
						<label>Type</label>
						<select class="form-control" name="type[]">
							<option value="3">Poster Presentation</option>
							<option value="4">Oral Presentation</option>
							<option value="5">Dissertation</option>
							<option value="9">Student Feedback</option>
							<option disabled><hr></option>
							<option value="0">Plain Text</option>
							<option value="1">Scale (Fail > Excellent)</option>
							<option value="2">Number</option>
							<option value="6">Yes/No</option>
							<option value="7">Yes/Possibly/No</option>
							<option value="8">Comment Only</option>
						</select>
					</div>

					<div class="col-2">
						<label>Submission Type</label>
						<select class="form-control" name="submissionType[]">
							<option value="0">Both</option>
							<option value="1">Supervisor Only</option>
							<option value="2">Optional</option>
						</select>
					</div>
				</div> 

				<div class="row mt-2">
					<div class="col-10">
						<label>Description</label>
						<input class="form-control" type="text" name="description[]">
					</div>
					<div class="col-2">
						<label>Min comment length</label>
						<input class="form-control" type="number" name="minCommentLength[]">
					</div>
				</div>
			</li>`
		);
	});

	$("body").on("click", ".js-deleteQuestion", function(){
		$(this).closest('li').remove();
	});

	// 1.7.3 Print
	$(".js-print-project-evaluation").on("click", function(){
		$('#ExpandQuestions:not([aria-expanded="true"])').click();
		$(".main-content").removeClass("mt-5");
		window.print();
	});

	//1.7.4 Manual Finalise
	$(".js-evaluation-checkbox").on("change", function(){
		var button = $("#manual-finalise");
		if($(".js-evaluation-checkbox:checked").length > 0){
			button.removeClass('disabled');
			button.prop('disabled', false);
			button.attr('title', '');
		} else {
			button.addClass('disabled');
			button.prop('disabled', true);
			button.attr('title', 'Please select 1 or more checkboxes');
		}
	});

	$("#manual-finalise").on("click", function(){

		var finalisedProjectTitles = 'Are you sure you want to finalise these project? <ul class="text-left">';
		
		$(".js-evaluation-checkbox").each(function(){
			if($(this).is(":checked")){
				finalisedProjectTitles += `<li>${ $(this).data('project-title') }</li>`;
			}
		});

		finalisedProjectTitles += "</ul>";

		$.confirm({
				title: 'Manual Finalise',
				type: 'red',
				icon: '<div class="svg-md"><div class="svg-container"><svg viewBox="0 0 24 24"><path d="M2.3,20.28L11.9,10.68L10.5,9.26L9.78,9.97C9.39,10.36 8.76,10.36 8.37,9.97L7.66,9.26C7.27,8.87 7.27,8.24 7.66,7.85L13.32,2.19C13.71,1.8 14.34,1.8 14.73,2.19L15.44,2.9C15.83,3.29 15.83,3.92 15.44,4.31L14.73,5L16.15,6.43C16.54,6.04 17.17,6.04 17.56,6.43C17.95,6.82 17.95,7.46 17.56,7.85L18.97,9.26L19.68,8.55C20.07,8.16 20.71,8.16 21.1,8.55L21.8,9.26C22.19,9.65 22.19,10.29 21.8,10.68L16.15,16.33C15.76,16.72 15.12,16.72 14.73,16.33L14.03,15.63C13.63,15.24 13.63,14.6 14.03,14.21L14.73,13.5L13.32,12.09L3.71,21.7C3.32,22.09 2.69,22.09 2.3,21.7C1.91,21.31 1.91,20.67 2.3,20.28M20,19A2,2 0 0,1 22,21V22H12V21A2,2 0 0,1 14,19H20Z" /></svg></div></div>',
				theme: 'modern',
				escapeKey: true,
				backgroundDismiss: true,
				animateFromElement : false,
				content: finalisedProjectTitles,
				buttons: {
					yes: {
						btnClass: 'btn-red',
						action: function(){
							$("#manual-finalise-form").submit();
						}
					},
					cancel: {},
				}
			});
	});

	// 1.7.5 Project Evaluation - Delete
	$(".js-delete-pe").on('click', function (e) {
		e.preventDefault();

		let url = $(e.target).attr("href");

		$.confirm({
			title: 'Delete Evaluation',
			content: 'Are you sure you want to delete this evaluation?<br>It has no questions answered so this is a safe action.',
			type: 'red',
			icon: '<div class="svg-md"><div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement: true,
			buttons: {
				formSubmit: {
					text: 'Delete',
					btnClass: 'btn-danger',
					action: function () {
						$.ajax({
							method: 'DELETE',
							url: url,
							success: function () {
								window.location.reload();
							}
						});
					}
				},
				cancel: function () { },
			}
		});
	});

	// 1.8 PE Student Feedback
	// 1.8.1 Print
	var isSingleStudentFeedbackPrint = false;

	$(".js-print-student-feedback").on("click", function(){
		isSingleStudentFeedbackPrint = true;

		var card = $(this).closest('.card');

		card.addClass("js-print-card");
		card.find(".card-title").addClass('h5').addClass('d-inline-block').before('<h5 class="d-inline-block delete-me">Student:&nbsp;</h5>');
		card.find(".card-subtitle").addClass('h5').addClass('d-inline-block').before('<br class="delete-me"><h5 class="d-inline-block delete-me">Project:&nbsp;</h5>');

		$("#card-container").removeClass("card-columns");
		$(".main-content").removeClass("mt-5").addClass("mt-3");
		$(".card:not(.js-print-card)").hide();
		window.print();
	});

	var isAllStudentFeedbackPrint = false;

	// 1.8.2 Print all
	$(".js-print-all-student-feedback").on("click", function(){
		isAllStudentFeedbackPrint = true;

		var cards = $('.card');

		cards.after('<p class="delete-me" style="page-break-before: always">');
		cards.find(".card-title").addClass('h5').addClass('d-inline-block').before('<h3 class="delete-me mt-3">Student Feedback</h3><br class="delete-me"><h5 class="d-inline-block delete-me">Student:&nbsp;</h5>');
		cards.find(".card-subtitle").addClass('h5').addClass('d-inline-block').before('<br class="delete-me"><h5 class="d-inline-block delete-me">Project:&nbsp;</h5>');

		$("#page-title").hide();
		$("#card-container").removeClass("card-columns");
		$(".main-content").removeClass("mt-5");
		window.print();
	});

	window.onafterprint = function(){
		if(isSingleStudentFeedbackPrint || isAllStudentFeedbackPrint){
			$(".js-print-card").removeClass("js-print-card");
			$(".h5").removeClass('h5 d-inline-block');
			$(".delete-me").remove();

			$("#card-container").addClass("card-columns");
			$(".card").show();

			isSingleStudentFeedbackPrint = false;
		}

		if(isAllStudentFeedbackPrint){
			$("#page-title").show();
			isAllStudentFeedbackPrint = false;
		}

		$(".main-content").removeClass("mt-3").addClass("mt-5");
	}

	/* =================
	 	2.SYSTEM ADMIN
	   ================ */

	// 2.1 User Feedback
	/**
		* Determines if a user should be warned when deleting user feedback
	*/
	var showDeleteUserFeedbackWarning = false;

	/**
		* Deletes user feedback
	*/
	$(".js-delete-feedback").on('click', function(e){
		e.preventDefault();
		var deleteButton = $(this);

		if(showDeleteUserFeedbackWarning){
			$.confirm({
				title: 'Delete Comment',
				type: 'red',
				icon: '<div class="svg-md"><div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div></div>',
				theme: 'modern',
				escapeKey: true,
				backgroundDismiss: true,
				animateFromElement : false,
				content: 'Are you sure you want to delete this piece of feedback?',
				buttons: {
					yes: {
						btnClass: 'btn-red',
						action: function(){
							deleteFeedback(deleteButton);
						}
					},
					neveragain: {
						text: "Yes, don't ask again",
						btnClass: 'btn-red-text',
						action: function(){
							showDeleteUserFeedbackWarning = false;
							deleteFeedback(deleteButton);
						}
					},
					cancel: {},
				}
			});
		} else {
			deleteFeedback(deleteButton);
		}
	});

	/**
		* Deletes user feedback
	*/
	function deleteFeedback(button){
		$.ajax({
			url: button.prop('href'),
			type: 'DELETE',
			data: {
				feedback_id: button.data('id'),
			},
			success:function(){
				createToast('', "Feedback deleted");
				
				button.parent().parent().hide(config.animtions.medium, function() {
					button.parent().parent().remove();
				});
			}
		});
	};
});
