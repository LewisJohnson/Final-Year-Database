;$(function() {
	"use strict";

	$(".open-tab").on('click', function() {
		var currentTab = $(this).parent();
		var currentContent = currentTab.find(".content");
		var tabs = $(".tab-container li");
		var tabsContent = tabs.find(".content");
		var buttons = tabs.find("button");
		var host = $(".content-host");

		if(currentContent.attr("aria-hidden") == "true"){
			host.html(currentContent.html());
			host.append('<div class="footer"><p><b>Still need help?</b>&ensp;If you still need help, try contacting an administrator to see if they can sort it.</p></div>');
			tabsContent.attr("aria-expanded", "false");
			tabsContent.attr("aria-hidden", "true");

			buttons.removeClass("button--accent");
			buttons.blur();

			currentContent.attr("aria-expanded", "true");
			currentContent.attr("aria-hidden", "false");

			tabs.removeClass("selected");

			$(this).addClass("button--accent");
			setCookie("cht", currentTab.data("tab-name"), 365);
		}
	});
});