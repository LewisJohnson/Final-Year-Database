/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function () {
	"use strict";

	var tabCard = $(".tab-card");
	var tabContainer = $(".tab-container");
	var tabs = tabContainer.find("li.tab");
	var tabsContent = tabs.find(".content");
	var buttons = tabs.find("> button");
	var contentHost = $(".content-host");
	var firstTabSelected = true;
	var helpTabShown = false;
	var previousTab = null;
	var previousTabIndex = null;
	var previousHeight = null;
	var helpFooterSnippet = null;

	// Get help footer snippet using ajax
	$.ajax({
		url: '/snippet?snippet=card-help-footer',
		type: 'GET',
		success: function success(result) {
			helpFooterSnippet = result;
		}
	});

	$(".open-tab").on('click', function () {
		var currentTab = $(this).parent();
		var currentContent = currentTab.find(".content");

		if (currentContent.attr("aria-hidden") == "true") {
			if (previousTab !== null) {
				contentHost.removeClass().addClass('content-host');

				if ($(window).width() <= config.mobileWidth) {
					if (currentTab.index() > previousTab.index()) {
						contentHost.addClass('slideOutLeft animated quick');
					} else {
						contentHost.addClass('slideOutRight animated quick');
					}
				} else {
					if (currentTab.index() > previousTab.index()) {
						contentHost.addClass('slideOutUp animated quick');
					} else {
						contentHost.addClass('slideOutDown animated quick');
					}
				}
			}

			setTimeout(function () {
				contentHost.find(".content").appendTo(previousTab);
				contentHost.html("");
				currentContent.appendTo(contentHost);
				contentHost.removeClass().addClass('content-host');

				if ($(window).width() <= config.mobileWidth) {
					if (currentTab.index() > previousTabIndex) {
						contentHost.addClass('slideInRight animated quick');
					} else {
						contentHost.addClass('slideInLeft animated quick');
					}
				} else {
					if (currentTab.index() > previousTabIndex) {
						contentHost.addClass('slideInUp animated quick');
					} else {
						contentHost.addClass('slideInDown animated quick');
					}
				}

				if (config.fancyAnimations) {
					if ($(window).width() <= config.mobileWidth) {
						var newTabHeight = tabCard.outerHeight(false);
					} else {
						var newTabHeight = tabCard.height();
					}

					tabCard.css('height', previousHeight);

					tabCard.animate({ height: newTabHeight }, config.animtions.medium, 'linear', function () {
						tabCard.css('height', 'auto');
						if ($(window).width() <= config.mobileWidth) {
							previousHeight = tabCard.outerHeight(false);
						} else {
							previousHeight = tabCard.height();
						}
					});
				}

				tabsContent.attr("aria-expanded", "false");
				tabsContent.attr("aria-hidden", "true");

				// Remove accent and blur (unfocus) all other buttons
				buttons.removeClass("button--accent");
				buttons.blur();

				// ARIA
				currentContent.attr("aria-expanded", "true");
				currentContent.attr("aria-hidden", "false");

				tabs.removeClass("selected");

				$(this).addClass("button--accent");

				// If settings allow footer
				if (tabContainer.data("help-footer") && config.showHelpFooter) {
					// If not the first tab and tab not already shown
					if (!firstTabSelected && !helpTabShown) {
						// If AJAX request was successful
						if (helpFooterSnippet != null) {
							tabCard.append(helpFooterSnippet);
							helpTabShown = true;
						}
					}
				}

				if (typeof Storage !== "undefined") {
					sessionStorage.setItem(tabContainer.data("cookie-name"), currentTab.data("tab-name"));
				} else {
					// Cookie fallback
					setCookie(tabContainer.data("cookie-name"), currentTab.data("tab-name"), 365);
				}

				firstTabSelected = false;
				previousTab = currentTab;
				previousTabIndex = previousTab.index();
			}.bind(this), 100);
		}
	});

	restoreOldTabFromStorage(tabContainer, tabs);
});

function restoreOldTabFromStorage(tabContainer, tabs) {
	if (typeof Storage !== "undefined") {
		// Check session storage first
		var oldSelectedTab = sessionStorage.getItem(tabContainer.data("cookie-name"));
	}

	if (oldSelectedTab == null) {
		// Fallback to see if cookie is set
		if (getCookie(tabContainer.data("cookie-name")) !== null) {
			var oldSelectedTab = getCookie(tabContainer.data("cookie-name"));
		}
	}

	if (oldSelectedTab == null) {
		// No session or cookie
		$(".open-tab").first().click();
	}

	var tabClicked = false;
	tabs.each(function () {
		if ($(this).data("tab-name") === oldSelectedTab) {
			$(this).find('> button').click();
			tabClicked = true;
			return;
		}
	});

	// Tab name not found, could be different authentication
	if (!tabClicked) {
		$(".open-tab").first().click();
	}
}

/***/ })

/******/ });