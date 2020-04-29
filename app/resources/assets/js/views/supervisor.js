/*
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

import Swappable from '@shopify/draggable/lib/swappable';


;$(function() {
	"use strict";

	/* =================================
		Project Topics [Supervisor]
	   ================================= */

	/**
	* Class constructor for project topics.
	*
	* @param {HTMLElement} element The element that will be upgraded.
	*/
	var ProjectTopics = function ProjectTopics() {};
	window["ProjectTopics"] = ProjectTopics;

	ProjectTopics.prototype.CssClasses_ = {
		DATA_TABLE: 'data-table',
		IS_SELECTED: 'is-selected'
	};

	ProjectTopics.prototype.Selectors_ = {
		EDIT_ADD_TOPIC_INPUT: '#add-topic-input',
		EDIT_NEW_TOPIC_INPUT_CONTAINER: '#new-topic-input-container',
		EDIT_PROJECT_FORM : '#edit-project-form',
		
		CREATE_ADD_TOPIC_INPUT: '#create-project-add-topic-input',
		CREATE_NEW_TOPIC_INPUT_CONTAINER: '#create-topic-input-container',
		CREATE_PROJECT_FORM : '#create-project-form',
	};

	var projectTopics = new ProjectTopics();

	ProjectTopics.prototype.functions = {
		addTopicToProjectBeingCreated: function (topicName) {
			if($(".topics-list.create li.topic:last").length > 0){
				$(".topics-list.create li.topic:last").after(`
					<li class="topic" data-topic-id="${ topicName }">
						<button type="button" class="btn rounded-0 topic-remove">X</button>
						<input type="text" readonly name="topics[]" class="topic-name" size="${ topicName.length }" value="${ topicName }">
					</li>`);
			} else {
				$(".topics-list.create").prepend(`
					<li class="topic first" data-topic-id="${ topicName }">
						<button type="button" class="btn rounded-0 topic-remove">X</button>
						<input type="text" readonly name="topics[]" class="topic-name" size="${ topicName.length }" value="${ topicName }">
					</li>`);
			}

			setTimeout(function(){
				$(projectTopics.Selectors_.CREATE_ADD_TOPIC_INPUT).val('');
			}, 20);
		},

		removeTopicToProjectBeingCreated: function (topicId) {
			$(".topics-list.create li.topic").each(function(i, obj) {
				if($(this).data("topic-id") == topicId){
					$(this).remove();
				}
			});
		},

		updateProjectPrimaryTopicToProjectBeingCreated: function (topicId) {
			$(".topics-list.create li.topic").each(function(i, obj) {
				if($(this).data("topic-id") == topicId){
					$(this).addClass("first");
				} else {
					$(this).removeClass("first");
				}
			});
		},

		// EXISTING PROJECT
		addTopicToProject: function (projectId, topicName) {
			$('.spinner').show();
			var ajaxUrl = "projects/topic-add";
			$.ajax({
				type: "POST",
				url: ajaxUrl,
				data: {
					topic_name: topicName,
					project_id: projectId
				},
				success: function(response){
					$(projectTopics.Selectors_.EDIT_ADD_TOPIC_INPUT).val('');

					if(response.successful){
						if($(".topics-list.edit li.topic:last").length > 0){
							$(".topics-list.edit li.topic:last").after('<li class="topic" data-topic-id="' + response.topic.id + '"><button type="button" class="btn rounded-0 topic-remove">X</button><p class="topic-name">' + response.topic.name + '</p></li>');
						} else {
							$(".topics-list.edit").prepend('<li class="topic first" data-topic-id="' + response.topic.id + '"><button type="button" class="btn rounded-0 topic-remove">X</button><p class="topic-name">' + response.topic.name + '</p></li>');
						}
					} else {
						createToast('error', response.message);
					}
				}
			}).always(function(data){
				$('.spinner').hide();
			});
		},

		removeTopicFromProject: function (projectId, topicId) {
			$(".loader").show();
			var ajaxUrl = "projects/topic-remove";
			$.ajax({
				type: "PATCH",
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
			}).always(function(){
				$(".loader").hide();
			});
		},

		updateProjectPrimaryTopic: function (projectId, topicId) {
			$(".spinner").show();
			var ajaxUrl = "projects/topic-update-primary";
			$.ajax({
				type: "PATCH",
				url: ajaxUrl,
				data: {
					topic_id : topicId,
					project_id: projectId
				},
				success: function(){
					$(".topics-list.edit li.topic").each(function(i, obj) {
						if($(this).data("topic-id") == topicId){
							$(this).addClass("first");
						} else {
							$(this).removeClass("first");
						}
					});
				},
			}).always(function(){
				$(".spinner").hide();
			});
		}
	};

	/*
		=================
		  CREATE PROJECT
		=================
	*/
	const createSwappable = new Swappable(document.querySelectorAll(".topics-list.create"), {
		draggable: ".topic",
	});

	createSwappable.on('swappable:swapped', function(){
		var originalPrimaryTopicId = $(projectTopics.Selectors_.CREATE_PROJECT_FORM).data('primary-topic-id');
		var topicId = $(".topics-list.create li:first-child").data('topic-id');

		if(topicId != originalPrimaryTopicId){
			projectTopics.functions.updateProjectPrimaryTopicToProjectBeingCreated(topicId);
		}
	});

	// Add new topic on COMMA pressed
	$(projectTopics.Selectors_.CREATE_ADD_TOPIC_INPUT).keypress(function(e) {
		if((e.which == 44 || e.keyCode == 188) && $(this).val() != "") {
			projectTopics.functions.addTopicToProjectBeingCreated($(this).val());
		}
	});

	// Add new topic on input blur
	$(projectTopics.Selectors_.CREATE_ADD_TOPIC_INPUT).on('blur', function(e) {
		if($(this).val() != "") {
			projectTopics.functions.addTopicToProjectBeingCreated($(this).val());
		}
	});

	// Remove topic
	$('.topics-list.create').on('click', '.topic .topic-remove', function(){
		var topicId = $(this).parent('li').data('topic-id');
		projectTopics.functions.removeTopicToProjectBeingCreated(topicId);
	});

	$(projectTopics.Selectors_.CREATE_NEW_TOPIC_INPUT_CONTAINER).on('click', function() {
		$(projectTopics.Selectors_.CREATE_ADD_TOPIC_INPUT).focus();
	});

	/*
		=================
		  EDIT PROJECT
		=================
	*/
	const editSwappable = new Swappable(document.querySelectorAll(".topics-list.edit"), {
		draggable: ".topic",
	});

	editSwappable.on('swappable:stop', function(){
		var projectId = $(projectTopics.Selectors_.EDIT_PROJECT_FORM).data('project-id');
		var topicId = $(".topics-list.edit li:first-child").data('topic-id');

		projectTopics.functions.updateProjectPrimaryTopic(projectId, topicId);
	});

	// Add new topic on COMMA press
	$(projectTopics.Selectors_.EDIT_ADD_TOPIC_INPUT).keypress(function(e) {
		if((e.which == 44 || e.keyCode == 188) && $(this).val() != "") {
			var projectId = $(projectTopics.Selectors_.EDIT_PROJECT_FORM).data('project-id');
			projectTopics.functions.addTopicToProject(projectId, $(this).val());
		}
	});

	// Add new topic on input blur
	$(projectTopics.Selectors_.EDIT_ADD_TOPIC_INPUT).on('blur', function(e) {
		if($(this).val() != "") {
			var projectId = $(projectTopics.Selectors_.EDIT_PROJECT_FORM).data('project-id');
			projectTopics.functions.addTopicToProject(projectId, $(this).val());
		}
	});

	// Remove topic
	$('.topics-list.edit').on('click', '.topic .topic-remove', function(){
		var projectId = $(projectTopics.Selectors_.EDIT_PROJECT_FORM).data('project-id');
		var topicId = $(this).parent('li').data('topic-id');
		projectTopics.functions.removeTopicFromProject(projectId, topicId);
	});

	$(projectTopics.Selectors_.EDIT_NEW_TOPIC_INPUT_CONTAINER).on('click', function() {
		$(projectTopics.Selectors_.EDIT_ADD_TOPIC_INPUT).focus();
	});

	/* ========
		OTHER
	=========== */
	$('.supervisor-table').on('click', '.offer-action', function() {
		var actionButton = $(this);
		var actionType = actionButton.data('action-type');
		var tableRow = actionButton.parents().eq(1);

		actionButton.html('<div class="spinner spinner-border spinner-border-sm"></div>');

		if(actionType === "accept"){
			var ajaxUrl = 'supervisor/student-accept';
		} else if (actionType === "reject"){
			var ajaxUrl = 'supervisor/student-reject';
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
						createToast('success', response.message);
						updateAcceptedStudentsTable();
					} else if (actionType === "reject"){
						createToast('', response.message);
					}

					if(response.email_successful === false)
					{
						var message = "The student was successful " + actionType + "ed. However, the confirmation email failed to send. We recommend you send one to them manually.";

						$.confirm({
							type: 'red',
							icon: '<div class="svg-md"><div class="svg-container"><svg viewBox="0 0 24 24"><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg></div></div>',
							theme: 'modern',
							escapeKey: true,
							animateFromElement : false,
							backgroundDismiss: true,
							title: 'Email Error',
							content: message,
							buttons: {
								okay: {},
							}
						});
					}
				} else {
					createToast('error', response.message);
					actionButton.html(actionType);
				}
			}
		});
	});

	$("body").on("change", ".supervisor-table .checkbox input", function() {
		var select = function(dom){
			var status = dom.parents().eq(4).data('status');
			var supervisorEmail = dom.parents().eq(4).data('supervisor-email');
			var emailString = "mailto:" + supervisorEmail + "?bcc=";
			var checkboxSelector = '.supervisor-table.' + status + ' .checkbox input';
			var emailButtonselector = ".email-selected." + status;

			$(checkboxSelector).each(function(index, value) {
				if($(value).is(":checked") && !$(value).hasClass("master-checkbox")) {
					emailString += $(value).data('email');
					emailString += ",";
				}
			});

			$(emailButtonselector).prop('href', emailString);
		};
		setTimeout(select($(this)), 2000);
	});

	$('#supervisor-accepted-students-table').on('click', '.supervisor-undo-accept', function(e) {
		var tableRow = $(this);
		var studentName = tableRow.data('student-name');
		var projectTitle = tableRow.data('project-title');

		$.confirm({
			title: 'Undo Project Selection',
			type: 'red',
			icon: '<div class="svg-md"><div class="svg-container"><svg viewBox="0 0 24 24"><path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" /></svg></div></div>',
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
							url: 'supervisor/student-undo',
							data: {
								project_id : tableRow.data('project-id'),
								student_id : tableRow.data('student-id')
							},
							success:function(response){
								if(response.successful){
									tableRow.hide(400, function() { tableRow.remove(); });
									createToast('success', response.message);
									updateAcceptedStudentsTable();
								} else {
									createToast('error', response.message);
								}

								if(!response.email_successful){
									var message = "The undo action was successful. However, the confirmation email failed to send. We recommend you send one to them manually.";
									$.confirm({
										type: 'red',
										icon: '<div class="svg-md"><div class="svg-container"><svg viewBox="0 0 24 24"><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg></div></div>',
										theme: 'modern',
										escapeKey: true,
										animateFromElement : false,
										backgroundDismiss: true,
										title: 'Email Error',
										content: message,
										buttons: {
											okay: {},
										}
									});
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
			url: 'supervisor/accepted-students-table',
			success: function(data){
				$("#supervisor-accepted-students-table").html(data);
			}
		});
	}

});
