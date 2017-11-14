$(function() { 

	// Makes primary topic first
	$(".topics-list").prepend($(".first"));

	// Project Edit
	var addTopicInput = $("#addTopicInput");

	addTopicInput.keypress(function(e) {
		if (e.which == 32) {
			addTopicAjax(addTopicInput.val());
		}
	});

	$('.topics-list.edit').on('click', '.topic .topic-remove', function(){
		var topicName = $(this).next().text();
		removeTopicAjax(topicName);
	});

	$('#newTopicInputContainer').click(function() {
		addTopicInput.focus();
	});

	// Project project
	$('#deleteProjectButton').click(function() {
		deleteProjectAjax($('#title').val());
	});

	$('#search-filter-button').click(function() {
		var container = $('.search-filter-container');
		if(container.hasClass('active')){
			$('.search-filter-container').removeClass('active');
			$('#search-filter-button').removeClass('active');
		} else{
			$('.search-filter-container').addClass('active');
			$('#search-filter-button').addClass('active');
		}
	});

	$('.search-input').on('focus',  function(e){
		$('.search-container').removeClass (function (index, className) {
			return (className.match (/\bshadow\-\S+/g) || []).join(' ');
		});
		$('.search-container').addClass('shadow-focus');
	});

	$('.search-input').on('focusout',  function(e){
		$('.search-container').removeClass (function (index, className) {
			return (className.match (/\bshadow\-\S+/g) || []).join(' ');
		});
		$('.search-container').addClass('shadow-2dp');
	});
});

function addTopicAjax(topic) {
	$.ajax({
		type: "PUT",
		url: "edit/topic",
		data: {topic : topic},
		success: function(newTopicName){
			$("#addTopicInput").val('');
			$(".topics-list.edit li.topic:last").after('<li class="topic"><button type="button" class="topic-remove">X</button><p class="topic-name">' + newTopicName + '</p></li>');
		}
	});
}

function removeTopicAjax(topic) {
	$.ajax({
		type: "DELETE",
		url: "edit/topic",
		data: {topic : topic},
		success: function(oldTopicName){
			$('.topics-list.edit li.topic').each(function(i, obj) {
				if($(this).find(".topic-name").text() == oldTopicName){
					$(this).remove();
					return;
				}
			});
		},
	});
}

function deleteProjectAjax(projectName) {
	if(confirm("Are you sure you want to delete \"" + projectName +"\"?")){
		$.ajax({
			type: "DELETE",
			url: "edit",
			success: function(url){
				window.location.href = "../";
			}
		});
	}
	else{
		return false;
	}
}