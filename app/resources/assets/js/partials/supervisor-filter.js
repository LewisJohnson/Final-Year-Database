/*
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";

	var input = $("#supervisor-report-search-input");

	input.keyup(function (e) {
		filterSupervisors();
	});

	function filterSupervisors(){
		var searchValue = input.val().trim().toLowerCase();
		$("#no-results").remove();

		if(searchValue == ""){
			$('.supervisor-row').show();
		} else {
			var isSupeervisorVisible = false;

			$('.supervisor-row').each(function(i , supervisorRow){
				supervisorRow = $(supervisorRow);
				if(supervisorRow.data("supervisor-name").toLowerCase().includes(searchValue)){
					supervisorRow.show();
					isSupeervisorVisible = true;
				} else {
					supervisorRow.hide();
				}

			});

			if(!isSupeervisorVisible){
				$('.main-content > div').append(
					'<div id="no-results" class="alert alert-secondary mt-2" role="alert">' +
						'<span>&#128270;</span>' +
						'<span class="ml-2">No results found.</span>' +
						'</span>' +
					'</div>');
			}
		}
	}
});
