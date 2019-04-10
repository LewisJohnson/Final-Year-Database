/*
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function() {
	"use strict";

	var tabCard = $(".tab-card");
	var tabContainer = $(".tab-container");
	var tabs = tabContainer.find("li.tab");
	var tabsContent = tabs.find(".content");
	var buttons = tabs.find("> button");
	var contentHost = $(".content-host");
	var firstTabSelected = true;
	var previousTab = null;
	var previousTabIndex = null;
	var previousHeight = null;
	
	$(".js-tab-button").on('click', function() {
		var currentTab = $(this).parent();
		var currentContent = currentTab.find(".content");

		// Remove all old sub tabs
		$(".sub-tab").remove();

		if(currentContent.attr("aria-hidden") == "true"){
			if(previousTab !== null){
				contentHost.removeClass().addClass('content-host');

				if($(window).width() <= config.mobileWidth){
					if(currentTab.index() > previousTab.index()){
						contentHost.addClass('slideOutLeft animated quick');
					} else {
						contentHost.addClass('slideOutRight animated quick');
					}
				} else {
					if(currentTab.index() > previousTab.index()){
						contentHost.addClass('slideOutUp animated quick');
					} else {
						contentHost.addClass('slideOutDown animated quick');
					}
				}
			}

			setTimeout(function() {
				contentHost.find(".content").appendTo(previousTab);
				contentHost.html("");
				currentContent.appendTo(contentHost);
				contentHost.removeClass().addClass('content-host');

				if($(window).width() <= config.mobileWidth){
					if(currentTab.index() > previousTabIndex){
						contentHost.addClass('slideInRight animated quick');
					} else {
						contentHost.addClass('slideInLeft animated quick');
					}
				} else {
					if(currentTab.index() > previousTabIndex){
						contentHost.addClass('slideInUp animated quick');
					} else {
						contentHost.addClass('slideInDown animated quick');
					}
				}

				if(config.fancyAnimations){
					if($(window).width() <= config.mobileWidth){
						var newTabHeight = tabCard.outerHeight(false);
					} else{
						var newTabHeight = tabCard.height();
					}

					tabCard.css('height', previousHeight);

					tabCard.animate({ height: newTabHeight }, config.animtions.medium, 'linear', function(){
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

				// Remove accent and blur (unfocus) all other buttons
				buttons.removeClass("btn-primary");
				buttons.blur();

				// ARIA
				currentContent.attr("aria-expanded", "true");
				currentContent.attr("aria-hidden", "false");

				tabs.removeClass("selected");

				$(this).addClass("btn-primary");

				if (typeof(Storage) !== "undefined") {
					sessionStorage.setItem(tabContainer.data("cookie-name"), currentTab.data("tab-name"));
				} else {
					// Cookie fallback
					setCookie(tabContainer.data("cookie-name"), currentTab.data("tab-name"), 365);
				}

				firstTabSelected = false;
				previousTab = currentTab;
				previousTabIndex = previousTab.index();


				// Create sub tabs
				$(currentContent.find('h5').get().reverse()).each(function(){
					var titleId = (currentTab.text().trim() + "-" + $(this).text().trim()).toLowerCase();
					$(this).attr('id', titleId);

					var tab = $(`
						<li class="sub-tab">
							<a class="btn w-100 text-right js-sub-tab-button" href="#${ titleId }">${ $(this).text().trim() }</a>
						</li>
					`).insertAfter(currentTab).hide();

					tab.fadeIn(200);
				});
			}.bind(this), 100);
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
		$(".js-tab-button").first().click();
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
		$(".js-tab-button").first().click();
	}
}
