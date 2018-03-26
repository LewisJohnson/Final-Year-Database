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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGY3Nzc2N2MxYzNjMWY5OWEzMDQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy90YWItdmlldy5qcyJdLCJuYW1lcyI6WyIkIiwidGFiQ2FyZCIsInRhYkNvbnRhaW5lciIsInRhYnMiLCJmaW5kIiwidGFic0NvbnRlbnQiLCJidXR0b25zIiwiY29udGVudEhvc3QiLCJmaXJzdFRhYlNlbGVjdGVkIiwiaGVscFRhYlNob3duIiwicHJldmlvdXNUYWIiLCJwcmV2aW91c1RhYkluZGV4IiwicHJldmlvdXNIZWlnaHQiLCJoZWxwRm9vdGVyU25pcHBldCIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwic3VjY2VzcyIsInJlc3VsdCIsIm9uIiwiY3VycmVudFRhYiIsInBhcmVudCIsImN1cnJlbnRDb250ZW50IiwiYXR0ciIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ3aW5kb3ciLCJ3aWR0aCIsImNvbmZpZyIsIm1vYmlsZVdpZHRoIiwiaW5kZXgiLCJzZXRUaW1lb3V0IiwiYXBwZW5kVG8iLCJodG1sIiwiZmFuY3lBbmltYXRpb25zIiwibmV3VGFiSGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJoZWlnaHQiLCJjc3MiLCJhbmltYXRlIiwiYW5pbXRpb25zIiwibWVkaXVtIiwiYmx1ciIsImRhdGEiLCJzaG93SGVscEZvb3RlciIsImFwcGVuZCIsIlN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJzZXRDb29raWUiLCJiaW5kIiwicmVzdG9yZU9sZFRhYkZyb21TdG9yYWdlIiwib2xkU2VsZWN0ZWRUYWIiLCJnZXRJdGVtIiwiZ2V0Q29va2llIiwiZmlyc3QiLCJjbGljayIsInRhYkNsaWNrZWQiLCJlYWNoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QkFBaUJMLGVBQWVNLE9BQWYsQ0FBdUJuRCxhQUFheUMsSUFBYixDQUFrQixhQUFsQixDQUF2QixDQUFyQjtBQUNBOztBQUVELEtBQUdTLGtCQUFrQixJQUFyQixFQUEwQjtBQUN6QjtBQUNBLE1BQUdFLFVBQVVwRCxhQUFheUMsSUFBYixDQUFrQixhQUFsQixDQUFWLE1BQWdELElBQW5ELEVBQXdEO0FBQ3ZELE9BQUlTLGlCQUFpQkUsVUFBVXBELGFBQWF5QyxJQUFiLENBQWtCLGFBQWxCLENBQVYsQ0FBckI7QUFDQTtBQUNEOztBQUVELEtBQUdTLGtCQUFrQixJQUFyQixFQUEwQjtBQUN6QjtBQUNBcEQsSUFBRSxXQUFGLEVBQWV1RCxLQUFmLEdBQXVCQyxLQUF2QjtBQUNBOztBQUVELEtBQUlDLGFBQWEsS0FBakI7QUFDQXRELE1BQUt1RCxJQUFMLENBQVUsWUFBVTtBQUNuQixNQUFHMUQsRUFBRSxJQUFGLEVBQVEyQyxJQUFSLENBQWEsVUFBYixNQUE2QlMsY0FBaEMsRUFBK0M7QUFDOUNwRCxLQUFFLElBQUYsRUFBUUksSUFBUixDQUFhLFVBQWIsRUFBeUJvRCxLQUF6QjtBQUNBQyxnQkFBYSxJQUFiO0FBQ0E7QUFDQTtBQUNELEVBTkQ7O0FBUUE7QUFDQSxLQUFHLENBQUNBLFVBQUosRUFBZTtBQUNkekQsSUFBRSxXQUFGLEVBQWV1RCxLQUFmLEdBQXVCQyxLQUF2QjtBQUNBO0FBQ0QsQyIsImZpbGUiOiJcXGpzXFx2aWV3c1xcdGFiLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGY3Nzc2N2MxYzNjMWY5OWEzMDQiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxuOyQoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdHZhciB0YWJDYXJkID0gJChcIi50YWItY2FyZFwiKTtcclxuXHR2YXIgdGFiQ29udGFpbmVyID0gJChcIi50YWItY29udGFpbmVyXCIpO1xyXG5cdHZhciB0YWJzID0gdGFiQ29udGFpbmVyLmZpbmQoXCJsaS50YWJcIik7XHJcblx0dmFyIHRhYnNDb250ZW50ID0gdGFicy5maW5kKFwiLmNvbnRlbnRcIik7XHJcblx0dmFyIGJ1dHRvbnMgPSB0YWJzLmZpbmQoXCI+IGJ1dHRvblwiKTtcclxuXHR2YXIgY29udGVudEhvc3QgPSAkKFwiLmNvbnRlbnQtaG9zdFwiKTtcclxuXHR2YXIgZmlyc3RUYWJTZWxlY3RlZCA9IHRydWU7XHJcblx0dmFyIGhlbHBUYWJTaG93biA9IGZhbHNlO1xyXG5cdHZhciBwcmV2aW91c1RhYiA9IG51bGw7XHJcblx0dmFyIHByZXZpb3VzVGFiSW5kZXggPSBudWxsO1xyXG5cdHZhciBwcmV2aW91c0hlaWdodCA9IG51bGw7XHJcblx0dmFyIGhlbHBGb290ZXJTbmlwcGV0ID0gbnVsbDtcclxuXHJcblx0Ly8gR2V0IGhlbHAgZm9vdGVyIHNuaXBwZXQgdXNpbmcgYWpheFxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICcvc25pcHBldD9zbmlwcGV0PWNhcmQtaGVscC1mb290ZXInLFxyXG5cdFx0dHlwZTonR0VUJyxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzdWx0KXtcclxuXHRcdFx0aGVscEZvb3RlclNuaXBwZXQgPSByZXN1bHQ7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG5cclxuXHQkKFwiLm9wZW4tdGFiXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGN1cnJlbnRUYWIgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cdFx0dmFyIGN1cnJlbnRDb250ZW50ID0gY3VycmVudFRhYi5maW5kKFwiLmNvbnRlbnRcIik7XHJcblxyXG5cdFx0aWYoY3VycmVudENvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0aWYocHJldmlvdXNUYWIgIT09IG51bGwpe1xyXG5cdFx0XHRcdGNvbnRlbnRIb3N0LnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ2NvbnRlbnQtaG9zdCcpO1xyXG5cclxuXHRcdFx0XHRpZigkKHdpbmRvdykud2lkdGgoKSA8PSBjb25maWcubW9iaWxlV2lkdGgpe1xyXG5cdFx0XHRcdFx0aWYoY3VycmVudFRhYi5pbmRleCgpID4gcHJldmlvdXNUYWIuaW5kZXgoKSl7XHJcblx0XHRcdFx0XHRcdGNvbnRlbnRIb3N0LmFkZENsYXNzKCdzbGlkZU91dExlZnQgYW5pbWF0ZWQgcXVpY2snKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbnRlbnRIb3N0LmFkZENsYXNzKCdzbGlkZU91dFJpZ2h0IGFuaW1hdGVkIHF1aWNrJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmKGN1cnJlbnRUYWIuaW5kZXgoKSA+IHByZXZpb3VzVGFiLmluZGV4KCkpe1xyXG5cdFx0XHRcdFx0XHRjb250ZW50SG9zdC5hZGRDbGFzcygnc2xpZGVPdXRVcCBhbmltYXRlZCBxdWljaycpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29udGVudEhvc3QuYWRkQ2xhc3MoJ3NsaWRlT3V0RG93biBhbmltYXRlZCBxdWljaycpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjb250ZW50SG9zdC5maW5kKFwiLmNvbnRlbnRcIikuYXBwZW5kVG8ocHJldmlvdXNUYWIpO1xyXG5cdFx0XHRcdGNvbnRlbnRIb3N0Lmh0bWwoXCJcIik7XHJcblx0XHRcdFx0Y3VycmVudENvbnRlbnQuYXBwZW5kVG8oY29udGVudEhvc3QpO1xyXG5cdFx0XHRcdGNvbnRlbnRIb3N0LnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ2NvbnRlbnQtaG9zdCcpO1xyXG5cclxuXHRcdFx0XHRpZigkKHdpbmRvdykud2lkdGgoKSA8PSBjb25maWcubW9iaWxlV2lkdGgpe1xyXG5cdFx0XHRcdFx0aWYoY3VycmVudFRhYi5pbmRleCgpID4gcHJldmlvdXNUYWJJbmRleCl7XHJcblx0XHRcdFx0XHRcdGNvbnRlbnRIb3N0LmFkZENsYXNzKCdzbGlkZUluUmlnaHQgYW5pbWF0ZWQgcXVpY2snKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbnRlbnRIb3N0LmFkZENsYXNzKCdzbGlkZUluTGVmdCBhbmltYXRlZCBxdWljaycpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZihjdXJyZW50VGFiLmluZGV4KCkgPiBwcmV2aW91c1RhYkluZGV4KXtcclxuXHRcdFx0XHRcdFx0Y29udGVudEhvc3QuYWRkQ2xhc3MoJ3NsaWRlSW5VcCBhbmltYXRlZCBxdWljaycpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29udGVudEhvc3QuYWRkQ2xhc3MoJ3NsaWRlSW5Eb3duIGFuaW1hdGVkIHF1aWNrJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihjb25maWcuZmFuY3lBbmltYXRpb25zKXtcclxuXHRcdFx0XHRcdGlmKCQod2luZG93KS53aWR0aCgpIDw9IGNvbmZpZy5tb2JpbGVXaWR0aCl7XHJcblx0XHRcdFx0XHRcdHZhciBuZXdUYWJIZWlnaHQgPSB0YWJDYXJkLm91dGVySGVpZ2h0KGZhbHNlKTtcclxuXHRcdFx0XHRcdH0gZWxzZXtcclxuXHRcdFx0XHRcdFx0dmFyIG5ld1RhYkhlaWdodCA9IHRhYkNhcmQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGFiQ2FyZC5jc3MoJ2hlaWdodCcsIHByZXZpb3VzSGVpZ2h0KTtcclxuXHJcblx0XHRcdFx0XHR0YWJDYXJkLmFuaW1hdGUoeyBoZWlnaHQ6IG5ld1RhYkhlaWdodCB9LCBjb25maWcuYW5pbXRpb25zLm1lZGl1bSwgJ2xpbmVhcicsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRhYkNhcmQuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xyXG5cdFx0XHRcdFx0XHRpZigkKHdpbmRvdykud2lkdGgoKSA8PSBjb25maWcubW9iaWxlV2lkdGgpe1xyXG5cdFx0XHRcdFx0XHRcdHByZXZpb3VzSGVpZ2h0ID0gdGFiQ2FyZC5vdXRlckhlaWdodChmYWxzZSk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRwcmV2aW91c0hlaWdodCA9IHRhYkNhcmQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGFic0NvbnRlbnQuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHRcdFx0XHR0YWJzQ29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgYWNjZW50IGFuZCBibHVyICh1bmZvY3VzKSBhbGwgb3RoZXIgYnV0dG9uc1xyXG5cdFx0XHRcdGJ1dHRvbnMucmVtb3ZlQ2xhc3MoXCJidXR0b24tLWFjY2VudFwiKTtcclxuXHRcdFx0XHRidXR0b25zLmJsdXIoKTtcclxuXHJcblx0XHRcdFx0Ly8gQVJJQVxyXG5cdFx0XHRcdGN1cnJlbnRDb250ZW50LmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHRcdFx0XHRjdXJyZW50Q29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHJcblx0XHRcdFx0dGFicy5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG5cclxuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwiYnV0dG9uLS1hY2NlbnRcIik7XHJcblxyXG5cdFx0XHRcdC8vIElmIHNldHRpbmdzIGFsbG93IGZvb3RlclxyXG5cdFx0XHRcdGlmKHRhYkNvbnRhaW5lci5kYXRhKFwiaGVscC1mb290ZXJcIikgJiYgY29uZmlnLnNob3dIZWxwRm9vdGVyKXtcclxuXHRcdFx0XHRcdC8vIElmIG5vdCB0aGUgZmlyc3QgdGFiIGFuZCB0YWIgbm90IGFscmVhZHkgc2hvd25cclxuXHRcdFx0XHRcdGlmKCFmaXJzdFRhYlNlbGVjdGVkICYmICFoZWxwVGFiU2hvd24pe1xyXG5cdFx0XHRcdFx0XHQvLyBJZiBBSkFYIHJlcXVlc3Qgd2FzIHN1Y2Nlc3NmdWxcclxuXHRcdFx0XHRcdFx0aWYoaGVscEZvb3RlclNuaXBwZXQgIT0gbnVsbCl7XHJcblx0XHRcdFx0XHRcdFx0dGFiQ2FyZC5hcHBlbmQoaGVscEZvb3RlclNuaXBwZXQpO1xyXG5cdFx0XHRcdFx0XHRcdGhlbHBUYWJTaG93biA9IHRydWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YoU3RvcmFnZSkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGFiQ29udGFpbmVyLmRhdGEoXCJjb29raWUtbmFtZVwiKSwgY3VycmVudFRhYi5kYXRhKFwidGFiLW5hbWVcIikpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBDb29raWUgZmFsbGJhY2tcclxuXHRcdFx0XHRcdHNldENvb2tpZSh0YWJDb250YWluZXIuZGF0YShcImNvb2tpZS1uYW1lXCIpLCBjdXJyZW50VGFiLmRhdGEoXCJ0YWItbmFtZVwiKSwgMzY1KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZpcnN0VGFiU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRwcmV2aW91c1RhYiA9IGN1cnJlbnRUYWI7XHJcblx0XHRcdFx0cHJldmlvdXNUYWJJbmRleCA9IHByZXZpb3VzVGFiLmluZGV4KCk7XHJcblx0XHRcdH0uYmluZCh0aGlzKSwgMTAwKTtcclxuXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHJlc3RvcmVPbGRUYWJGcm9tU3RvcmFnZSh0YWJDb250YWluZXIsIHRhYnMpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHJlc3RvcmVPbGRUYWJGcm9tU3RvcmFnZSh0YWJDb250YWluZXIsIHRhYnMpe1xyXG5cdGlmICh0eXBlb2YoU3RvcmFnZSkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdC8vIENoZWNrIHNlc3Npb24gc3RvcmFnZSBmaXJzdFxyXG5cdFx0dmFyIG9sZFNlbGVjdGVkVGFiID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0YWJDb250YWluZXIuZGF0YShcImNvb2tpZS1uYW1lXCIpKTtcclxuXHR9XHJcblxyXG5cdGlmKG9sZFNlbGVjdGVkVGFiID09IG51bGwpe1xyXG5cdFx0Ly8gRmFsbGJhY2sgdG8gc2VlIGlmIGNvb2tpZSBpcyBzZXRcclxuXHRcdGlmKGdldENvb2tpZSh0YWJDb250YWluZXIuZGF0YShcImNvb2tpZS1uYW1lXCIpKSAhPT0gbnVsbCl7XHJcblx0XHRcdHZhciBvbGRTZWxlY3RlZFRhYiA9IGdldENvb2tpZSh0YWJDb250YWluZXIuZGF0YShcImNvb2tpZS1uYW1lXCIpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmKG9sZFNlbGVjdGVkVGFiID09IG51bGwpe1xyXG5cdFx0Ly8gTm8gc2Vzc2lvbiBvciBjb29raWVcclxuXHRcdCQoXCIub3Blbi10YWJcIikuZmlyc3QoKS5jbGljaygpO1xyXG5cdH1cclxuXHJcblx0dmFyIHRhYkNsaWNrZWQgPSBmYWxzZTtcclxuXHR0YWJzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdGlmKCQodGhpcykuZGF0YShcInRhYi1uYW1lXCIpID09PSBvbGRTZWxlY3RlZFRhYil7XHJcblx0XHRcdCQodGhpcykuZmluZCgnPiBidXR0b24nKS5jbGljaygpO1xyXG5cdFx0XHR0YWJDbGlja2VkID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBUYWIgbmFtZSBub3QgZm91bmQsIGNvdWxkIGJlIGRpZmZlcmVudCBhdXRoZW50aWNhdGlvblxyXG5cdGlmKCF0YWJDbGlja2VkKXtcclxuXHRcdCQoXCIub3Blbi10YWJcIikuZmlyc3QoKS5jbGljaygpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZpZXdzL3RhYi12aWV3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==