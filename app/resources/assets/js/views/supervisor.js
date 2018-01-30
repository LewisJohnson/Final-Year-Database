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
	window['ProjectTopics'] = ProjectTopics;

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
				success: function(data){
					data = JSON.parse(data);
					$(projectTopics.Selectors_.ADD_TOPIC_INPUT).val('');

					if($(".topics-list.edit li.topic:last").length > 0){
						$(".topics-list.edit li.topic:last").after('<li class="topic" data-topic-id="' + data["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + data["name"] + '</p></li>');
					} else {
						$(".topics-list.edit").prepend('<li class="topic first" data-topic-id="' + data["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + data["name"] + '</p></li>');
					}
				}
			}).done(function(data){
				$('body').append(data);
				$('.loader').hide(0);
			});
		},

		removeTopicFromProject: function (projectId, topicId) {
			$('.loader').show(0);
			var ajaxUrl = "/projects/topic-remove";
			$.ajax({
				type: "DELETE",
				url: ajaxUrl,
				data: {
					topic_id : topicId,
					project_id: projectId
				},
				success: function(){
					$('.topics-list.edit li.topic').each(function(i, obj) {
						if($(this).data('topic-id') == topicId){
							$(this).remove();
						}
					});
				},
			}).done(function(){
				$('.loader').hide(0);
			});
		},

		updateProjectPrimaryTopic: function (projectId, topicId) {
			$('.loader').show(0);
			var ajaxUrl = "/projects/topic-update-primary";
			$.ajax({
				type: "PATCH",
				url: ajaxUrl,
				data: {
					topic_id : topicId,
					project_id: projectId
				},
				success: function(){
					$('#editProjectForm').attr('data-project-id', topicId);
					$('.topics-list.edit li.topic').each(function(i, obj) {
						if($(this).data('topic-id') == topicId){
							$(this).addClass("first");
						} else {
							$(this).removeClass("first");
						}
					});
				},
			}).done(function(){
				$('.loader').hide(0);
			});
		},
	};

	const swappable = new Swappable(document.querySelectorAll('.topics-list.edit .topic'), {
		draggable: '.topic',
	});

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
	$('.supervisor-table .offer-action').on('click', function() {
		var actionButton = $(this);
		var actionType = actionButton.data('action-type');
		var tableRow = actionButton.parents().eq(1);
		var student_id = tableRow.data('student-id');

		actionButton.html('<div class="loader"></div>');
		$('.loader', actionButton).css('display', 'block');

		if(actionType === "accept"){
			$("#supervisor-accepted-students-table").html('<div class="loader loader--x-large"></div>');
			$('.loader', '#supervisor-accepted-students-table').css('display', 'block');

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
				student_id : student_id
			},
			success: function(data){
				tableRow.hide(400, function() {
					tableRow.remove();
				});
				if(actionType === "accept"){
					showNotification('', 'Student has been accepted.');
					$.ajax({
						method: 'GET',
						url: '/supervisor/accepted-students-table',
						success: function(data){
							$("#supervisor-accepted-students-table").html(data);
						},
						error: function() {
							actionButton.html(actionType);
						}
					});
				} else if (actionType === "reject"){
					showNotification('', 'Student has been rejected.');
				}
			},
			error: function() {
				actionButton.html(actionType);
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
});