/*
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";
	var dontRemindAgain = false;

	$(".js-delete-feedback").on('click', function(e){
		e.preventDefault();
		var deleteButton = $(this);

		if(dontRemindAgain){
			deleteFeedback(deleteButton);
		} else {
			$.confirm({
				title: 'Delete Comment',
				type: 'red',
				icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
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
							dontRemindAgain = true;
							deleteFeedback(deleteButton);
						}
					},
					cancel: {},
				}
			});
		}
	});

	function deleteFeedback(button){
		debugger;
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

		formData.append('studentFile', fileData);

		modalDesc += '<br><br><span class="text-primary">FILE: ' + fileData.name + '</span>';

		if($(this).find('#auto_programmes').is(":checked")){
			formData.append('auto_programmes', true);
			modalDesc += '<br><span class="text-primary">OPTION: Auto import programmes</span>';
		}

		if($(this).find('#empty_programmes').is(":checked")){
			formData.append('empty_programmes', true);
			modalDesc += '<br><span class="text-danger">OPTION: Empty programmes table. This will delete all programmes for <b>ALL<b> education levels.</span>';
		}

		if($(this).find('#empty_students').is(":checked")){
			formData.append('empty_students', true);
			modalDesc += '<br><span class="text-danger">OPTION: Empty students table. This will delete all students for this education level.</span>';
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
							url: $(this).prop('action'),
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
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
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

	$('body').on('submit', '#endOfYearArchive', function(e) {
		e.preventDefault();
		var form = $(this);
		var container = $('.eoya-container');
		var oldContainerHtml = container.html();

		$.confirm({
			title: 'End of Year Archive',
			type: 'red',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement : false,
			content: 'Are you sure you want to archive?',
			buttons: {
				archive: {
					btnClass: 'btn-red',
					action: function(){
						container.html('<div class="loader loader--x-large"></div>');
						$('.loader', container).css('display', 'block');

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
});
