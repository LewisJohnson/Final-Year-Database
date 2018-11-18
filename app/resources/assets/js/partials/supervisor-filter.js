/*
 * Copyright (C) University of Sussex 2018.
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

		if(searchValue == ""){
			$('.supervisor-row').show();''
		} else {
			$('.supervisor-row').each(function(i , supervisorRow){
				supervisorRow = $(supervisorRow);
				if(supervisorRow.data("supervisor-name").toLowerCase().includes(searchValue)){
					supervisorRow.show();
				} else {
					supervisorRow.hide();
				}
			});
		}
	}
});
