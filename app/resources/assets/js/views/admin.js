/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";
	var dontRemindAgain = false;

	$(".delete-feedback").on('click', function(e){
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
		$.ajax({
			url: button.prop('href'),
			type: 'DELETE',
			data: {
				feedback_id: button.data('id'),
			},
			success:function(){
				createToast('', "Feedback deleted");
				
				button.parent().parent().hide(config.animtions.slow, function() {
					button.parent().parent().remove();
				});
			}
		});
	};

	$(".import-student-form").on('submit', function(e){
		e.preventDefault();

		if($(this).find('.file').length < 1){
			createToast('error', 'Something went wrong. Please refresh the page.');
			return;
		}

		var fileData = $(this).find('.file').prop('files')[0];
		var requestType = $(this).data('type');
		var formData = new FormData();

		formData.append('studentFile', fileData);
		formData.append('empty_programmes', $(this).find('#empty_programmes'));
		formData.append('auto_programmes', $(this).find('#auto_programmes'));
		formData.append('empty_students', $(this).find('#empty_students'));
		$.ajax({
			url: $(this).prop('action'),
			cache: false,
			contentType: false,
			processData: false,
			data: formData,
			type: 'post',
			success: function(response){
				if(!response.successful){
					createToast('error', response.message);
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
				createToast('success', response.responseText);
				$('#import-student-result').html('<p style="color: red"><b>An error has occurred.</b> This is likely caused by a foreign key constraint failure. Have you added all the programmes in the uploaded file to the database?</p>');
			},
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
