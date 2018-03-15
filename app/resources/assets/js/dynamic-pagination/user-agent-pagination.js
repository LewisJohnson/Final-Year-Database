/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

var agents_pageNumber = 2,
	agents_endOfTable = false,
	agents_awaitingResponse = false;

;$(function() {
	"use strict";

	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			if(!agents_endOfTable && !agents_awaitingResponse){
				$(".loader.user-agent").show();
				agents_awaitingResponse = true;
				if($('#show-fv-only').prop('checked')){
					var ajaxUrl = "/system/user-agent?unique=1?page=" + agents_pageNumber;
				} else {
					var ajaxUrl = "/system/user-agent?page=" + agents_pageNumber;
				}
				$.ajax({
					type : 'GET',
					url: ajaxUrl,
					success : function(data){
						$(".loader.user-agent").hide();
						if(data.length == 0){
							agents_endOfTable = true;
							$('#user-agent-table').after('<div style="width: 10px;height: 10px;margin: 1rem auto;background: rgba(0, 0, 0, 0.07);border: 1px solid rgba(0, 0, 0, 0.11);border-radius: 90px;"></div>');
						}else{
							$('#user-agent-table tbody').append($(data));
						}
						agents_pageNumber++;
					}
				}).done(function(data){
					agents_awaitingResponse = false;
					$(".loader.user-agent").hide();
				});
			} else {
				$(".loader.user-agent").hide();
			}
		}
	});
});