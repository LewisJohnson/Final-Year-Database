;$(function() {
	"use strict";

	var tabCard = $(".tab-card");
	var tabContainer = $(".tab-container");
	var tabs = tabContainer.find("li.tab");
	var tabsContent = tabs.find(".content");
	var buttons = tabs.find("> button");
	var host = $(".content-host");
	var firstTabSelected = true;
	var helpTabShown = false;
	var previousTab = null;
	var previousHeight = null;

	$(".open-tab").on('click', function() {
		var currentTab = $(this).parent();
		var currentContent = currentTab.find(".content");

		if(currentContent.attr("aria-hidden") == "true"){

			if(previousTab !== null){ host.find(".content").appendTo(previousTab); }

			host.html("");
			currentContent.appendTo(host);

			if(tabContainer.data("help-footer") && !firstTabSelected && !helpTabShown && config.showHelpFooter){
				tabCard.append('\
					<div class="footer"> \
						<div class="svg-container"> \
							<svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"> \
								<path d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" /> \
							</svg> \
						</div> \
						<p><b>Still need help?</b>&ensp;If you still need help, try contacting an administrator to see if they can sort it.</p> \
					</div>');
				helpTabShown = true;
			}

			if(config.animateTabHeight){
				if($(window).width() <= config.mobileWidth){
					var newTabHeight = tabCard.outerHeight(false);
				} else{
					var newTabHeight = tabCard.height();
				}
				
				tabCard.css('height', previousHeight);

				tabCard.animate({ height: newTabHeight }, config.mediumAnimation, 'linear', function(){
					tabCard.css('height', 'auto');
					if($(window).width() <= config.mobileWidth){
						previousHeight = tabCard.outerHeight(false);
					} else{
						previousHeight = tabCard.height();
					}
				});
			}

			tabsContent.attr("aria-expanded", "false");
			tabsContent.attr("aria-hidden", "true");

			buttons.removeClass("button--accent");
			buttons.blur();

			currentContent.attr("aria-expanded", "true");
			currentContent.attr("aria-hidden", "false");

			tabs.removeClass("selected");

			$(this).addClass("button--accent");

			if (typeof(Storage) !== "undefined") {
				sessionStorage.setItem(tabContainer.data("cookie-name"), currentTab.data("tab-name"));
			} else {
				// Cookie fallback
				setCookie(tabContainer.data("cookie-name"), currentTab.data("tab-name"), 365);
			}

			firstTabSelected = false;
			previousTab = currentTab;
		}
	});

	restoreOldTabFromStorage(tabContainer, tabs);
});

function restoreOldTabFromStorage(tabContainer, tabs){
	if (typeof(Storage) !== "undefined") {
		// Check session storage first
		var oldSelectedTab = sessionStorage.getItem(tabContainer.data("cookie-name"));
	}

	if(oldSelectedTab == null){
		// Fallback to see if cookie is set
		if(getCookie(tabContainer.data("cookie-name")) !== null){
			var oldSelectedTab = getCookie(tabContainer.data("cookie-name"));
		}
	}

	if(oldSelectedTab == null){
		// No session or cookie
		$(".open-tab").first().click();
	}
	
	var tabClicked = false;
	tabs.each(function(){
		if($(this).data("tab-name") === oldSelectedTab){
			$(this).find('> button').click();
			tabClicked = true;
			return;
		}
	});
	
	// Tab name not found, could be different authentication
	if(!tabClicked){
		$(".open-tab").first().click();
	}
}
