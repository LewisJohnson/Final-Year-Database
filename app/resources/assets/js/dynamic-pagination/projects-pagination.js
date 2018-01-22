;$(function() {
	"use strict";

var projects_pageNumber = 2,
	projects_endOfTable = false,
	projects_awaitingResponse = false;


	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			if(!projects_endOfTable && !projects_awaitingResponse){
				$(".loader.projects").show();
				projects_awaitingResponse = true;
				var ajaxUrl = "/projects?page=" + projects_pageNumber;
				$.ajax({
					type : 'GET',
					url: ajaxUrl,
					success : function(data){
						$(".loader.projects").hide();
						if(data.length == 0){
							projects_endOfTable = true;
							$('#project-table').after('<div style="width: 10px;height: 10px;margin: 1rem auto;background: rgba(0, 0, 0, 0.07);border: 1px solid rgba(0, 0, 0, 0.11);border-radius: 90px;"></div>');
						}else{
							$('#project-table tbody').append($(data));
						}
						projects_pageNumber++;
					}
				}).done(function(data){
					projects_awaitingResponse = false;
					$(".loader.projects").hide();
				});
			} else {
				$(".loader.projects").hide();
			}
		}
	});
});