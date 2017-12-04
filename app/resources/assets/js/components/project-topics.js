import {Swappable} from '@shopify/draggable';

$(function() { 
	"use strict";

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
		updateProjectPrimaryTopic: function(projectId, topicId){
			$('.loader').show(0);
			var ajaxUrl = "/projects/updatePrimaryTopic";
			$.ajax({
				type: "PATCH",
				url: ajaxUrl,
				data: {
					topic_id: topicId, 
					project_id: projectId
				},
			}).done(function(){
				$('.loader').hide(0);
			});;
		},

		addTopicToProject: function (projectId, topicName) {
			$('.loader').show(0);
			var ajaxUrl = "/projects/addTopic";
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
					$(".topics-list.edit li.topic:last").after('<li class="topic" data-topic-id="' + data["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + data["name"] + '</p></li>');
				}
			}).done(function(data){
				$('body').append(data);
				$('.loader').hide(0);
			});
		},

		removeTopicFromProject: function (projectId, topicId) {
			$('.loader').show(0);
			var ajaxUrl = "/projects/removeTopic";
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
			});;
		}
	}

	const swappable = new Swappable(document.querySelectorAll('ul'), {
	  draggable: '.topic',
	});

	swappable.on('swappable:swapped', function(){
		var projectId = $('#editProjectForm').data('project-id');
		projectTopics.functions.updateProjectPrimaryTopic(projectId, $(".topics-list.edit li:first-child").data('topic-id'));
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

	$("#editProjectForm").on('submit', function(e){
		e.preventDefault();
	});

	$(projectTopics.Selectors_.NEW_TOPIC_INPUT_CONTAINER).on('click', function() { 
		$(projectTopics.Selectors_.ADD_TOPIC_INPUT).focus(); 
	});

});
