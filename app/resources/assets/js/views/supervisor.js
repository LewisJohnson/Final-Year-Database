/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

import Swappable from '@shopify/draggable/lib/swappable';


;$(function() {
	"use strict";

	/* =================================
		4.4 Project Topics [Supervisor]
	   ================================= */

	/**
	* Class constructor for project topics.
	*
	* @param {HTMLElement} element The element that will be upgraded.
	*/
	var ProjectTopics =  function ProjectTopics() {};
	window["ProjectTopics"] = ProjectTopics;

	ProjectTopics.prototype.CssClasses_ = {
		DATA_TABLE: 'data-table',
		IS_SELECTED: 'is-selected'
	};

	ProjectTopics.prototype.Selectors_ = {
		ADD_TOPIC_INPUT: '#addTopicInput',
		NEW_TOPIC_INPUT_CONTAINER: '#new-topic-input-container',
	};

	ProjectTopics.prototype.Keys_ = {
		SPACE: 32,
		ENTER: 13,
		COMMA: 45
	};

	var projectTopics = new ProjectTopics();

	ProjectTopics.prototype.functions = {
		addTopicToProject: function (projectId, topicName) {
			$('.loader').show(0);
			var ajaxUrl = "/projects/topic-add";
			$.ajax({
				type: "POST",
				url: ajaxUrl,
				data: {
					topic_name: topicName,
					project_id: projectId
				},
				success: function(response){
					$(projectTopics.Selectors_.ADD_TOPIC_INPUT).val('');

					if($(".topics-list.edit li.topic:last").length > 0){
						$(".topics-list.edit li.topic:last").after('<li class="topic" data-topic-id="' + response["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + response["name"] + '</p></li>');
					} else {
						$(".topics-list.edit").prepend('<li class="topic first" data-topic-id="' + response["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + response["name"] + '</p></li>');
					}
				}
			}).done(function(response){
				$('body').append(response);
				$('.loader').hide(0);
			});
		},

		removeTopicFromProject: function (projectId, topicId) {
			$(".loader").show(0);
			var ajaxUrl = "/projects/topic-remove";
			$.ajax({
				type: "DELETE",
				url: ajaxUrl,
				data: {
					topic_id : topicId,
					project_id: projectId
				},
				success: function(){
					$(".topics-list.edit li.topic").each(function(i, obj) {
						if($(this).data("topic-id") == topicId){
							$(this).remove();
						}
					});
				},
			}).done(function(){
				$(".loader").hide(0);
			});
		},

		updateProjectPrimaryTopic: function (projectId, topicId) {
			$(".loader").show(0);
			var ajaxUrl = "/projects/topic-update-primary";
			$.ajax({
				type: "PATCH",
				url: ajaxUrl,
				data: {
					topic_id : topicId,
					project_id: projectId
				},
				success: function(){
					$("#editProjectForm").attr("data-project-id", topicId);
					$(".topics-list.edit li.topic").each(function(i, obj) {
						if($(this).data("topic-id") == topicId){
							$(this).addClass("first");
						} else {
							$(this).removeClass("first");
						}
					});
				},
			}).done(function(){
				$(".loader").hide(0);
			});
		},
	};

	const swappable = new Swappable(document.querySelectorAll(".topics-list.edit"), {
		draggable: ".topic",
	});

	window["swappable"] = swappable;

	swappable.on('swappable:swapped', function(){
		var projectId = $('#editProjectForm').data('project-id');
		var originalPrimaryTopicId = $('#editProjectForm').data('primary-topic-id');
		var topicId = $(".topics-list.edit li:first-child").data('topic-id');

		if(topicId != originalPrimaryTopicId){
			projectTopics.functions.updateProjectPrimaryTopic(projectId, topicId);
		}
	});

	// Add new topic
	$(projectTopics.Selectors_.ADD_TOPIC_INPUT).keypress(function(e) {
		if (e.which == projectTopics.Keys_.ENTER) {
			var projectId = $("#editProjectForm").data('project-id');
			projectTopics.functions.addTopicToProject(projectId, $(this).val());
		}
	});

	// Remove topic
	$('.topics-list.edit').on('click', '.topic .topic-remove', function(){
		var projectId = $("#editProjectForm").data('project-id');
		var topicId = $(this).parent('li').data('topic-id');
		projectTopics.functions.removeTopicFromProject(projectId, topicId);
	});

	$(projectTopics.Selectors_.NEW_TOPIC_INPUT_CONTAINER).on('click', function() {
		$(projectTopics.Selectors_.ADD_TOPIC_INPUT).focus();
	});

	/* ========
		OTHER
	=========== */
	$('.supervisor-table').on('click', '.offer-action', function() {
		var actionButton = $(this);
		var actionType = actionButton.data('action-type');
		var tableRow = actionButton.parents().eq(1);

		actionButton.html('<div class="loader"></div>');
		$('.loader', actionButton).css('display', 'block');

		if(actionType === "accept"){
			var ajaxUrl = '/supervisor/student-accept';
		} else if (actionType === "reject"){
			var ajaxUrl = '/supervisor/student-reject';
		}

		if(ajaxUrl == null){
			console.error("Invalid supervisor action.");
			return;
		}

		$.ajax({
			method: 'POST',
			url: ajaxUrl,
			data: {
				project_id : tableRow.data('project-id'),
				student_id : tableRow.data('student-id')
			},
			success: function(response){
				if(response.successful){
					tableRow.hide(400, function() { tableRow.remove(); });
					
					if(actionType === "accept"){
						createToast('success', 'Student has been accepted.');
						updateAcceptedStudentsTable();
					} else if (actionType === "reject"){
						createToast('', 'Student has been rejected.');
					}
				} else {
					createToast('error', response.message);
					actionButton.html(actionType);
				}
			}
		});
	});

	$('.supervisor-table').on('submit', 'form.delete-project', function(e) {
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
							url: form.prop('action'),
							type:'DELETE',
							success:function(row){
								form.parent().parent().replaceWith(row);
							}
						});
					}
				},
				cancel: {},
			}
		});
	});

	$('.supervisor-table').on('submit', 'form.restore-project', function(e) {
		e.preventDefault();
		var form = $(this);
		var projectName = form.data('project-title');

		$.confirm({
			title: 'Restore',
			type: 'green',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3M12,8V13L16.28,15.54L17,14.33L13.5,12.25V8H12Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement : false,
			content: 'Are you sure you want to restore <b>' + projectName + '</b>?',
			buttons: {
				confirm: {
					btnClass: 'btn-green',
					action: function(){
						$.ajax({
							url: form.prop('action'),
							type:'PATCH',
							success:function(row){
								form.parent().parent().replaceWith(row);
							}
						});
					}
				},
				cancel: {},
			}
		});
	});

	$('.expand').on('click', function(e) {
		var content = $(this).parents().eq(1).find('.content');

		if(content.attr("aria-expanded") == "true"){
			$(this).parent().removeClass("active");
			$(this).find("svg").css("transform", "rotateZ(0deg)");
			content.hide(200);
			content.attr("aria-expanded", "false");
			setCookie(content.data("cookie-name"), true, 365);

		} else {
			$(this).parent().addClass("active");
			$(this).find("svg").css("transform", "rotateZ(180deg)");
			content.show(200);
			content.attr("aria-expanded", "true");
			setCookie(content.data("cookie-name"), false, 365);
		}
	});

	$('#supervisor-accepted-students-table').on('click', '.supervisor-undo-accept', function(e) {
		var tableRow = $(this);
		var studentName = tableRow.data('student-name');
		var projectTitle = tableRow.data('project-title');

		$.confirm({
			title: 'Undo Project Selection',
			type: 'red',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement : false,
			content: 'Are you sure you want to un-accept <b>' + studentName + '</b> for <b>' + projectTitle + '</b> ?',
			buttons: {
				confirm: {
					btnClass: 'btn-red',
					action: function(){
						$.ajax({
							method: 'PATCH',
							url: '/supervisor/student-undo',
							data: {
								project_id : tableRow.data('project-id'),
								student_id : tableRow.data('student-id')
							},
							success:function(response){
								if(response.successful){
									tableRow.hide(400, function() { tableRow.remove(); });
									createToast('success', 'Undo successful.');
									updateAcceptedStudentsTable();
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
	
	function updateAcceptedStudentsTable(){
		$.ajax({
			method: 'GET',
			url: '/supervisor/accepted-students-table',
			success: function(data){
				$("#supervisor-accepted-students-table").html(data);
			}
		});
	}

});
