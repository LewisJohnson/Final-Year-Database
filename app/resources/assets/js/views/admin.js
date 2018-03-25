/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";

	$(".import-student-form").on('submit', function(e){
		e.preventDefault();

		var fileData = $(this).find('.file').prop('files')[0];   
		var requestType = $(this).data('type');
		var formData = new FormData()

		formData.append('studentFile', fileData);
		$.ajax({
			url: $(this).prop('action'),
			cache: false,
			contentType: false,
			processData: false,
			data: formData,
			type: 'post',
			success: function(response){
				if(requestType == "test"){
					$('#import-student-test-result').html(response);
					$('#import-student-test-result').addClass('fadeInUp animated');
				} else {
					$('#import-student-result').html(response);
					$('#import-student-result').addClass('fadeInUp animated');
				}
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
									container.html('<h2>Archive Complete</h2>');
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
