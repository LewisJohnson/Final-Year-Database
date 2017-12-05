$(function() {
"use strict";

var EditTopic = function EditTopic(element) {
	this.element_ = $(element);
	this.originalName = $(element).data("original-topic-name");
	this.topicId = $(element).data('topic-id');
	this.topicNameInput = $(element).find('input');
	this.editButton = $(element).find('.edit-topic');
	this.deleteButton = $(element).find('.delete-topic');
	this.init();
};

window['EditTopic'] = EditTopic;

EditTopic.prototype.CssClasses_ = {

};

EditTopic.prototype.Selectors_ = {
	EDIT_TOPIC: '.edit-topic-list .topic',
};

EditTopic.prototype.Urls_ = {
	DELETE_TOPIC: '/topics/',
	PATCH_TOPIC: '/topics/',
	NEW_TOPIC: '/topics/'
};

EditTopic.prototype.functions = {
	editTopic: function() {
		var response = confirm("Are you sure you want to change the topic name from \"" +  this.originalName +"\" to \"" +  this.topicNameInput.val() +"\"?");

		if(response){
			this.topicNameInput.prop('disabled', true);
			this.editButton.html('<div class="loader"></div>')
			$('.loader', this.element_).css('display', 'block');

			$.ajax({
				method: 'PATCH',
				url: this.Urls_.DELETE_TOPIC,
				context: this,
				data: {
					topic_id: this.topicId, 
					topic_name : this.topicNameInput.val()
				},
			}).done(function(){
				this.topicNameInput.prop('disabled', false);
				this.editButton.html('Edit');
				this.originalName = this.topicNameInput.val();
			});
		} else {
			this.topicNameInput.val(this.originalName);
		}
	},

	deleteTopic: function() {
		var response = confirm("Are you sure you want to delete the topic \"" +  this.originalName +"\"?");
		if(response){
			this.topicNameInput.prop('disabled', true);
			$.ajax({
				method: 'DELETE',
				url: this.Urls_.DELETE_TOPIC,
				context: this,
				data: {
					topic_id: this.topicId, 
				},
				success: function(result){
					this.element_.hide(800, function() {
						this.remove();
			 		});
				}
			});
		}
	},

	createEditTopicDOM: function(topicId, originalName){
		var elem = $(".edit-topic-list").prepend('<li class="topic" data-topic-id="' + topicId +'" data-original-topic-name="' + originalName +'"><input spellcheck="true" name="name" type="text" value="' + originalName +'"><button class="button edit-topic" type="submit">Edit</button><button class="button delete-topic button--danger">Delete</button></li>');
		EditTopic.prototype.initAll();
	}
};

EditTopic.prototype.init = function () {
	var editTopic = this;
	this.editButton.on('click', $.proxy(this.functions.editTopic, this, editTopic));
	this.deleteButton.on('click', $.proxy(this.functions.deleteTopic, this, editTopic));
};

EditTopic.prototype.initAll = function () {
	$(this.Selectors_.EDIT_TOPIC).each(function() {
		$(this).EditTopic = new EditTopic(this);
	});
};

EditTopic.prototype.initAll();

$('#new-topic-form').on('submit', function(e) {
	e.preventDefault();
	var submitButton = $(this).find(':submit');
	submitButton.html('<div class="loader"></div>');

	$('.loader', submitButton).css('display', 'block');

	$.ajax({
		url: $(this).prop('action'),
		type:'POST',
		context: $(this),
		data: $(this).serialize(),
		success:function(data){
			data = JSON.parse(data);
			EditTopic.prototype.functions.createEditTopicDOM(data["id"], data["name"]);
			},
		error: function () {}
	}).done(function(){
		$(this).find('input').val('');
		$(this).find(':submit').html('Add');
	});
});

$('#student-edit-list .checkbox input').on('change', function() {
	var status = $(this).parents().eq(3).data('status');
	var emailString = "mailto:";
	var checkboxSelector = '#student-edit-list.' + status + ' .checkbox input';
	var emailButtonselector = ".email-selected." + status;
	$(checkboxSelector).each(function() {
		if($(this).is(":checked")) {
			emailString += $(this).parent().parent().data('email');
			emailString += ",";
		}
	});
	$(emailButtonselector).prop('href', emailString);
});


$('.edit-student-list .email-selected').on('click', function(e) {
	if($(this).prop('href') === 'mailto:'){
		alert("You haven't selected anyone.")
		e.preventDefault();
	}
});

// Used for transactions
$('#show-raw-table-data').on('click', function() {
	if($(this).prop('checked')){
		$('table.full-detail').hide();
		$('table.raw-detail').show();
	} else {
		$('table.full-detail').show();
		$('table.raw-detail').hide();
	}
});
	
// NEW USER
// put this stuff in an array
$('#admin-form').hide();
$('#supervisor-form').hide();
$('#student-form').show();
$('#create-form-access-select').on('change', function(){
	if($('#student-option').is(":selected")) {
		$('#student-form').show();
	} else {
		$('#student-form').hide();
	}
	if($('#supervisor-option').is(":selected")) {
		$('#supervisor-form').show();
	} else {
		$('#supervisor-form').hide();
	}
	if($('#admin-option').is(":selected")) {
		$('#admin-form').show();
	} else {
		$('#admin-form').hide();
	}
});

// STRINGS
$('#admin-form').hide();
$('#supervisor-form').hide();
$('#student-form').show();
$('#create-form-access-select').on('change', function(){
	if($('#student-option').is(":selected")) {
		$('#student-form').show();
	} else {
		$('#student-form').hide();
	}
	if($('#supervisor-option').is(":selected")) {
		$('#supervisor-form').show();
	} else {
		$('#supervisor-form').hide();
	}
	if($('#admin-option').is(":selected")) {
		$('#admin-form').show();
	} else {
		$('#admin-form').hide();
	}
});
});