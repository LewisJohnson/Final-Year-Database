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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

/*
|--------------------------------------------------------------------------
| jQuery HELPERS
|--------------------------------------------------------------------------
|
| Helper functions that need to be called after the DOM is ready.
|
*/

$(function () {

	/**
 	* Show scroll to top button.
 */
	$(window).scroll(function () {
		if ($(this).scrollTop() > config.showScrollToTopButtonOffset) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

	/**
 	* Scroll to top when button is clicked.
 */
	$("body").on("click", ".scroll-to-top", function (e) {
		$('html, body').animate({
			scrollTop: 0
		}, config.scrollToTopDuration);
	});

	/**
 	* The "Show more" button on students homepage.
 	* 
 	* Only shown if a student has selected, proposed or been accepted for a project.
 */
	$("body").on("click", ".show-more", function (e) {
		$(this).hide();
		$('.project').addClass('expand');
	});

	/**
 	* Toggle label flips toggle.
 	*
 	* Toggles a toggle if it's label is clicked.
 */
	$("body").on("click", ".switch-label.switch-label--toggle", function (e) {
		var id = "#" + $(this).attr('for');
		$(id).click();
	});

	/**
 	* Checkbox form toggle.
 	*
 	* Toggles a toggle if it's form is clicked.
 */
	$("body").on("click", ".form-field--toggle", function (e) {
		if ($(e.target).hasClass("toggle") || $(e.target).parent().hasClass("toggle")) {
			return;
		}

		$(this).find('input:checkbox').click();
	});

	/**
 	* EU Cookie banner.
 	*
 	* Hides banner when clicked.
 */
	$(".cookie-banner").on("click", "button", function (e) {
		setCookie('cookie-banner-seen', true, 365);
		$(this).parent().hide(config.animtions.medium);
	});

	/**
 	* Boolean valued checkbox.
 	*
 	* Instead of 'checked' attribute, the values will be true/false
 */
	$(".boolean-checkbox").each(function () {
		$(this).parent().parent().after('<input type="hidden" name="' + $(this).attr("name") + '" value="' + $(this).is(':checked') + '" />');
	});

	$("body").on("click", ".boolean-checkbox", function (e) {
		if ($(this).is(':checked')) {
			$(this).parent().parent().next().val("true");
		} else {
			$(this).parent().parent().next().val("false");
		}
	});

	/**
 	* Remember checkbox value with cookies.
 	*
 	* Toggles a toggle if it's form is clicked.
 */
	$('.remember-with-cookie:checkbox').on('change', function () {
		rememberFormValues("checkbox");
	});

	/**
 	* Assign project to window variable.
 	*
 	* Used as an easy way for functions to get current project data from other JS files.
 */
	if ($('.project-card').length > 0) {
		window['project'] = $('.project-card');
	}

	// Repopulate checkboxes
	repopulateCheckboxes();
});

// A catch all approach to AJAX errors.
$(document).ajaxError(function (event, request, settings) {
	if (config.showAjaxRequestFailNotification) {
		createToast('error', 'Something went wrong with that request.');
	}
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzAwMjM4ZjRiZDU4ZWExZjBiMDUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9qcXVlcnktaGVscGVycy5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwic2Nyb2xsIiwic2Nyb2xsVG9wIiwiY29uZmlnIiwic2hvd1Njcm9sbFRvVG9wQnV0dG9uT2Zmc2V0IiwiZmFkZUluIiwiZmFkZU91dCIsIm9uIiwiZSIsImFuaW1hdGUiLCJzY3JvbGxUb1RvcER1cmF0aW9uIiwiaGlkZSIsImFkZENsYXNzIiwiaWQiLCJhdHRyIiwiY2xpY2siLCJ0YXJnZXQiLCJoYXNDbGFzcyIsInBhcmVudCIsImZpbmQiLCJzZXRDb29raWUiLCJhbmltdGlvbnMiLCJtZWRpdW0iLCJlYWNoIiwiYWZ0ZXIiLCJpcyIsIm5leHQiLCJ2YWwiLCJyZW1lbWJlckZvcm1WYWx1ZXMiLCJsZW5ndGgiLCJyZXBvcHVsYXRlQ2hlY2tib3hlcyIsImRvY3VtZW50IiwiYWpheEVycm9yIiwiZXZlbnQiLCJyZXF1ZXN0Iiwic2V0dGluZ3MiLCJzaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uIiwiY3JlYXRlVG9hc3QiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7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RDs7QUFRQTs7Ozs7QUFLQTVCLEdBQUUsZ0NBQUYsRUFBb0NRLEVBQXBDLENBQXVDLFFBQXZDLEVBQWlELFlBQVc7QUFDM0RxQixxQkFBbUIsVUFBbkI7QUFDQSxFQUZEOztBQUtBOzs7OztBQUtBLEtBQUc3QixFQUFFLGVBQUYsRUFBbUI4QixNQUFuQixHQUE0QixDQUEvQixFQUFpQztBQUNoQzdCLFNBQU8sU0FBUCxJQUFvQkQsRUFBRSxlQUFGLENBQXBCO0FBQ0E7O0FBRUQ7QUFDQStCO0FBQ0EsQ0F4R0Q7O0FBMEdBO0FBQ0EvQixFQUFFZ0MsUUFBRixFQUFZQyxTQUFaLENBQXNCLFVBQVNDLEtBQVQsRUFBZ0JDLE9BQWhCLEVBQXlCQyxRQUF6QixFQUFtQztBQUN4RCxLQUFHaEMsT0FBT2lDLCtCQUFWLEVBQTBDO0FBQ3pDQyxjQUFZLE9BQVosRUFBcUIseUNBQXJCO0FBQ0E7QUFDRCxDQUpELEUiLCJmaWxlIjoiXFxqc1xcanF1ZXJ5LWhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzAwMjM4ZjRiZDU4ZWExZjBiMDUiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgalF1ZXJ5IEhFTFBFUlNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCBIZWxwZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjYWxsZWQgYWZ0ZXIgdGhlIERPTSBpcyByZWFkeS5cclxufFxyXG4qL1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXHJcblx0LyoqXHJcblx0XHQqIFNob3cgc2Nyb2xsIHRvIHRvcCBidXR0b24uXHJcblx0Ki9cclxuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcblx0XHRpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IGNvbmZpZy5zaG93U2Nyb2xsVG9Ub3BCdXR0b25PZmZzZXQpIHtcclxuXHRcdFx0JCgnLnNjcm9sbC10by10b3AnKS5mYWRlSW4oKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy5zY3JvbGwtdG8tdG9wJykuZmFkZU91dCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHRcdCogU2Nyb2xsIHRvIHRvcCB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCovXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5zY3JvbGwtdG8tdG9wXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHRcdFx0c2Nyb2xsVG9wOiAwXHJcblx0XHR9LCBjb25maWcuc2Nyb2xsVG9Ub3BEdXJhdGlvbik7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdFx0KiBUaGUgXCJTaG93IG1vcmVcIiBidXR0b24gb24gc3R1ZGVudHMgaG9tZXBhZ2UuXHJcblx0XHQqIFxyXG5cdFx0KiBPbmx5IHNob3duIGlmIGEgc3R1ZGVudCBoYXMgc2VsZWN0ZWQsIHByb3Bvc2VkIG9yIGJlZW4gYWNjZXB0ZWQgZm9yIGEgcHJvamVjdC5cclxuXHQqL1xyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuc2hvdy1tb3JlXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHQkKHRoaXMpLmhpZGUoKTtcclxuXHRcdCQoJy5wcm9qZWN0JykuYWRkQ2xhc3MoJ2V4cGFuZCcpO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHRcdCogVG9nZ2xlIGxhYmVsIGZsaXBzIHRvZ2dsZS5cclxuXHRcdCpcclxuXHRcdCogVG9nZ2xlcyBhIHRvZ2dsZSBpZiBpdCdzIGxhYmVsIGlzIGNsaWNrZWQuXHJcblx0Ki9cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLnN3aXRjaC1sYWJlbC5zd2l0Y2gtbGFiZWwtLXRvZ2dsZVwiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIGlkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoJ2ZvcicpO1xyXG5cdFx0JChpZCkuY2xpY2soKTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdFx0KiBDaGVja2JveCBmb3JtIHRvZ2dsZS5cclxuXHRcdCpcclxuXHRcdCogVG9nZ2xlcyBhIHRvZ2dsZSBpZiBpdCdzIGZvcm0gaXMgY2xpY2tlZC5cclxuXHQqL1xyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuZm9ybS1maWVsZC0tdG9nZ2xlXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRpZigkKGUudGFyZ2V0KS5oYXNDbGFzcyhcInRvZ2dsZVwiKSB8fCAkKGUudGFyZ2V0KS5wYXJlbnQoKS5oYXNDbGFzcyhcInRvZ2dsZVwiKSl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0OmNoZWNrYm94JykuY2xpY2soKTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0XHQqIEVVIENvb2tpZSBiYW5uZXIuXHJcblx0XHQqXHJcblx0XHQqIEhpZGVzIGJhbm5lciB3aGVuIGNsaWNrZWQuXHJcblx0Ki9cclxuXHQkKFwiLmNvb2tpZS1iYW5uZXJcIikub24oXCJjbGlja1wiLCBcImJ1dHRvblwiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0c2V0Q29va2llKCdjb29raWUtYmFubmVyLXNlZW4nLCB0cnVlLCAzNjUpO1xyXG5cdFx0JCh0aGlzKS5wYXJlbnQoKS5oaWRlKGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0XHQqIEJvb2xlYW4gdmFsdWVkIGNoZWNrYm94LlxyXG5cdFx0KlxyXG5cdFx0KiBJbnN0ZWFkIG9mICdjaGVja2VkJyBhdHRyaWJ1dGUsIHRoZSB2YWx1ZXMgd2lsbCBiZSB0cnVlL2ZhbHNlXHJcblx0Ki9cclxuXHQkKFwiLmJvb2xlYW4tY2hlY2tib3hcIikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkuYWZ0ZXIoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIicgKyAkKHRoaXMpLmF0dHIoXCJuYW1lXCIpICsgJ1wiIHZhbHVlPVwiJyArICQodGhpcykuaXMoJzpjaGVja2VkJykgKydcIiAvPicpO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmJvb2xlYW4tY2hlY2tib3hcIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5uZXh0KCkudmFsKFwidHJ1ZVwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkubmV4dCgpLnZhbChcImZhbHNlXCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHRcdCogUmVtZW1iZXIgY2hlY2tib3ggdmFsdWUgd2l0aCBjb29raWVzLlxyXG5cdFx0KlxyXG5cdFx0KiBUb2dnbGVzIGEgdG9nZ2xlIGlmIGl0J3MgZm9ybSBpcyBjbGlja2VkLlxyXG5cdCovXHJcblx0JCgnLnJlbWVtYmVyLXdpdGgtY29va2llOmNoZWNrYm94Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0cmVtZW1iZXJGb3JtVmFsdWVzKFwiY2hlY2tib3hcIik7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKipcclxuXHRcdCogQXNzaWduIHByb2plY3QgdG8gd2luZG93IHZhcmlhYmxlLlxyXG5cdFx0KlxyXG5cdFx0KiBVc2VkIGFzIGFuIGVhc3kgd2F5IGZvciBmdW5jdGlvbnMgdG8gZ2V0IGN1cnJlbnQgcHJvamVjdCBkYXRhIGZyb20gb3RoZXIgSlMgZmlsZXMuXHJcblx0Ki9cclxuXHRpZigkKCcucHJvamVjdC1jYXJkJykubGVuZ3RoID4gMCl7XHJcblx0XHR3aW5kb3dbJ3Byb2plY3QnXSA9ICQoJy5wcm9qZWN0LWNhcmQnKTtcclxuXHR9XHJcblxyXG5cdC8vIFJlcG9wdWxhdGUgY2hlY2tib3hlc1xyXG5cdHJlcG9wdWxhdGVDaGVja2JveGVzKCk7XHJcbn0pO1xyXG5cclxuLy8gQSBjYXRjaCBhbGwgYXBwcm9hY2ggdG8gQUpBWCBlcnJvcnMuXHJcbiQoZG9jdW1lbnQpLmFqYXhFcnJvcihmdW5jdGlvbihldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MpIHtcclxuXHRpZihjb25maWcuc2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbil7XHJcblx0XHRjcmVhdGVUb2FzdCgnZXJyb3InLCAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGF0IHJlcXVlc3QuJyk7XHJcblx0fVxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2pxdWVyeS1oZWxwZXJzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==