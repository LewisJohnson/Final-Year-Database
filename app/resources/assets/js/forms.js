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