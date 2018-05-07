/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";

	$("body").on("taphold", "#project-table .project-row", function(e) {
		var projectId = $(this).data("project-id");
		var ajaxUrl = $(this).data("preview-url");

		$.dialog({
			title: false,
			closeIcon: true,
			backgroundDismiss: true,
			draggable: true,
			dragWindowBorder: false,
			theme: 'modern',
			escapeKey: true,
			animateFromElement : true,
			content: function () {
				var self = this;
				return $.ajax({
					url: ajaxUrl,
					method: "GET"
				}).done(function (response) {
					self.setContent(response);
					self.setTitle("&nbsp;");
				}).fail(function(){
					self.setContent("Sorry, we couldn't load this project.");
				});
			}
		});
	});
});
