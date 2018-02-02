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
			theme: 'material',
			escapeKey: true,
			animateFromElement : false,
			content: function () {
				var self = this;
				return $.ajax({
					url: ajaxUrl,
					method: "GET"
				}).done(function (response) {
					self.setContent(response);
					self.setTitle(" ");
				}).fail(function(){
					self.setContent("Sorry, we couldn't load this project.");
				});
			}
		});
	});
});
