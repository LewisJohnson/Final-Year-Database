$(function() {
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

	// Topics
	$('.add-topic').on('click', function() {
		addTopic($(this).prev().val());
	});

	$('.edit-topic').on('click', function() {
		$(this).prop('disabled', true);
		$(this).html('<div class="loader"></div>')
		$('.loader', this).css('display', 'block');
		editTopic($(this).data('topic-id'), $(this).prev().val(), $(this));
	});

	$('.delete-topic').on('click', function() {
		$(this).prev().prev().prop('disabled', true);
		var response = confirm("Are you sure you want to delete \"" +  $(this).prev().prev().val() +"\"?");
		if(response == true){
			deleteTopic($(this).data('topic-id'), $(this).parent());
		} else {
			$(this).prev().prev().prop('disabled', false);
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

function addTopic(name) {
	$.ajax({
		method: 'POST',
		url: '/topics',
		context: this,
		data: {name : name}
	}).done(function(){
		//todo: Create list item;
		location.reload();
	});
}

function editTopic(topicId, name, button) {
	var url = '/topics/' + topicId;
	$.ajax({
		method: 'PATCH',
		url: url,
		context: button,
		data: {name : name},
	}).done(function(){
		$(this).prop('disabled', false);
		$(this).html('Edit')
	});
}

function deleteTopic(topicId, li) {
	var url = '/topics/' + topicId;
	$.ajax({
		method: 'DELETE',
		url: url,
		context: li,
		success: function(result){
			$(this).remove();
		}
	});
}