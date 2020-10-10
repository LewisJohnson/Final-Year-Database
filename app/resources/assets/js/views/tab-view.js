/*
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
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
	
	var tabInUrl = getQueryVariable("tab-name");
	var headingInUrl = getQueryVariable("header-name");
	

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
					var titleId = slugify(currentTab.text()) + "-" + slugify($(this).text());
					$(this).attr('id', titleId);

					var tab = $(`
						<li class="sub-tab">
							<a class="btn w-100 text-right" href="#${ titleId }">${ $(this).text().trim() }</a>
						</li>
					`).insertAfter(currentTab).hide();

					tab.fadeIn(200);
				});
			}.bind(this), 100);
		}
	});

	if(tabInUrl == false){
		restoreOldTabFromStorage(tabContainer, tabs);
	} else {
		$("[data-tab-name='" + tabInUrl + "'] > button").click();

		if(headingInUrl != false){
			setTimeout(function() {
				$('html, body').animate({
					scrollTop: $("[href='#" + headingInUrl + "']").offset().top + 1000
				}, 200, function(){
					$("#" + headingInUrl).addClass("animated flash");
				});
				
			}, 300);
		}
	}
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

function getQueryVariable(variable)
{
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}

	return(false);
}

function slugify(string) {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}