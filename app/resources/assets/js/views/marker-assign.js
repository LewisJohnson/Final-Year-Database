;$(function() {
	"use strict";

	// Get help footer snippet using ajax
	$.ajax({
		url: '/admin/marker-assign-automatic-table',
		type:'GET',
		success:function(response){
			response = JSON.parse(response);

			$('#automatic-assign-container .content').addClass('animated fadeInUp');
			if(response.successful){
				$('#automatic-assign-container .content').html(response.html);
			} else {
				$('#automatic-assign-container .content').addClass('error-display');
				$('#automatic-assign-container .content').html(response.message);
			}

			$('#automatic-assign-container .loader-container').hide();
		},
	});
});
