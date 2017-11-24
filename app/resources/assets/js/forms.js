$(function() { 

	// Makes primary topic first
	$(".topics-list").prepend($(".first"));

	// Project Edit
	var addTopicInput = $("#addTopicInput");


	// LISTENERS
	addTopicInput.keypress(function(e) {
		if (e.which == 32) {
			addTopicAjax(addTopicInput.val());
		}
	});

	$('.topics-list.edit').on('click', '.topic .topic-remove', function(){
		var topicName = $(this).next().text();
		removeTopicAjax(topicName);
	});

	$('#newTopicInputContainer').on('click', function() { 
		addTopicInput.focus(); 
	});

	$('.master-checkbox').on('click', function() { 
		$(this).parent().parent().siblings().find(':checkbox').attr('checked', this.checked);
	});

	$('#deleteProjectButton').on('click', function() { 
		deleteProjectAjax($('#title').val());
	});

	$('#search-filter-button').on('click', function() {
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

$("#loginForm").on('submit', function(e){
    e.preventDefault();

    $('.help-block', '#loginForm').css("display", "none");
    $('.form-field', this).css("display", "none");
	$('#login-loader').css("display", "block");

    $.ajax({
        url: $(this).attr('action'),
        type:'POST',
        data: $(this).serialize(),
        success:function(data){
        	$('#login-loader').css("display", "none");
        	$('#loginForm').append(data);
        },
        error: function (data) {
        	$('.help-block', '#loginForm').css("display", "block");
        	$('.help-block', '#loginForm').text(data["responseJSON"]["errors"]["username"][0]);
            
            $('.form-field', '#loginForm').css("display", "block");
            $('.form-field', '#loginForm').addClass("has-error");
            
            $('#login-loader').css("display", "none");
        }
    });
});

function addTopicAjax(topic) {
	$.ajax({
		type: "PUT",
		url: "/topic",
		data: {topic : topic},
		success: function(newTopicName){
			$("#addTopicInput").val('');
			$(".topics-list.edit li.topic:last").after('<li class="topic"><button type="button" class="topic-remove">X</button><p class="topic-name">' + newTopicName + '</p></li>');
		}
	}).done(function(){
		$('.loader').css("display", "none");
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