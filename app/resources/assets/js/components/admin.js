$(function() {
	$('#student-edit-list .checkbox input').change(function() {
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


	$('.edit-student-list .email-selected').click(function(e) {
		if($(this).prop('href') === 'mailto:'){
			alert("You haven't selected anyone.")
			e.preventDefault();
		}
	});

	$('.add-topic').click(function() {
		addTopic($(this).prev().val());
	});

	$('.edit-topic').click(function() {
		$(this).prop('disabled', true);
		$('p', this).css("display", "none");
		$('.loader', this).css("display", "block");
		editTopic($(this).data('topic_name'), $(this).prev().val(), $(this));
		
	});

	$('.delete-topic').click(function() {
		deleteTopic($(this).data('topic_name'), $(this).parent());
	});

	$('#admin-form').hide();
	$('#supervisor-form').hide();
	$('#student-form').show();
	$('#create-form-access-select').change(function(){
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

function addTopic(name) {
	$.ajax({
		method: 'POST',
		url: '/topic',
		context: this,
		data: {name : name}
	}).done(function(){
		//todo: Create list item;
		location.reload();
	});
}

function editTopic(topic_name, name, button) {
	var url = '/topics/' + topic_name;
	$.ajax({
		method: 'PATCH',
		url: url,
		context: button,
		data: {name : name},
	}).done(function(){
		$(this).prop('disabled', false);
		$('p', this).css("display", "block");
		$('.loader', this).css("display", "none");
	});
}

function deleteTopic(topic_name, li) {
	var url = '/topics/' + topic_name;
	$.ajax({
		method: 'DELETE',
		url: url,
		context: li,
		success: function(result){
			$(this).remove();
		}
	});
}