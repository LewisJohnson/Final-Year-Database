$(function() {

	$('.student-edit-item .checkbox').change(function() {
        if($(this).is(":checked")) {
            $(this).parent().addClass("checked");
        } else {
        	$(this).parent().removeClass("checked");
        }

        var emailString = "mailto:";
        $('.student-edit-item .checkbox').each(function() {
        	if($(this).is(":checked")) {
				emailString += $(this).parent().data('email');
				emailString += ",";
			}
		});

		$('.edit-student-list .email-selected').prop('href', emailString);
    });


	$('.edit-student-list .email-selected').click(function(e) {
		if($(this).prop('href') === 'mailto:'){
			alert("You haven't selected anyone.")
			e.preventDefault();
		}
	});

	$('.edit-student-list .select-all').click(function() {
		var selector = ".edit-student-list." + $(this).data("project_status") + " li .checkbox";
		$(selector).each(function() {
			$(this).prop('checked', true).change();
		});
	});

	$('.edit-student-list .unselect-all').click(function() {
		var selector = ".edit-student-list." + $(this).data("project_status") + " li .checkbox";
		$(selector).each(function() {
			$(this).prop('checked', false).change();
		});
	});

	$('.add-topic').click(function() {
		deleteTopic($(this).prev().val());
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
});

function addTopic(name) {
	$.ajax({
		method: 'POST',
		url: '/topics',
		context: this,
		data: {name : name},
		success: function(){
			$(this).hide();
        }
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
			$(this).hide();
        }
    });
}