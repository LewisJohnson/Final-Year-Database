$(function() { 

$('.accept').on('click', function() {
	acceptStudent($(this).data('student_id'));
});

$('.reject').on('click', function() {
	rejectStudent($(this).data('student_id'), $(this).data('project_id'));
});

});

function acceptStudent(student_id) {
	$.ajax({
		method: 'POST',
		url: '/supervisor/acceptStudent',
		data: {
			student_id : student_id
		},
		success: function(){
			
		}
	});
}

function rejectStudent(student_id, project_id) {
	$.ajax({
		method: 'POST',
		url: '/supervisor/rejectStudent',
		data: {
			project_id : project_id,
			student_id : student_id
		},
		success: function(){
			
		}
	});
}


// function acceptStudent(student_id, project_id) {
// 	var url = '/student/' + student_id +'/selectProject';
// 	$.ajax({
// 		method: 'PATCH',
// 		url: url,
// 		data: {project_id : project_id},
// 		success: function(){
			
// 		}
// 	});
// }