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

$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > config.showScrollToTopButtonOffset) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

	$("body").on("click", ".scroll-to-top", function (e) {
		$('html, body').animate({
			scrollTop: 0
		}, config.scrollToTopDuration);
	});

	// Student home page project preview
	$("body").on("click", ".show-more", function (e) {
		$(this).hide();
		$('.project').addClass('expand');
	});

	// Toggle label flips toggle
	$("body").on("click", ".switch-label.switch-label--toggle", function (e) {
		var id = "#" + $(this).attr('for');
		$(id).click();
	});

	// Checkbox form toggle
	$("body").on("click", ".form-field--toggle", function (e) {
		if ($(e.target).hasClass("toggle") || $(e.target).parent().hasClass("toggle")) {
			return;
		}

		$(this).find('input:checkbox').click();
	});

	// Cookie Banner
	$(".cookie-banner").on("click", "button", function (e) {
		setCookie('cookie-banner-seen', true, 365);
		$(this).parent().hide(config.animtions.medium);
	});

	// $(".db-type-form").on("submit",  function(e) {
	// 	$.ajax({
	// 		method: 'POST',
	// 		url: $(this).prop('action'),
	// 		data: $(this).serialize()
	// 	}).done(function(){
	// 		location.reload(true);
	// 	});
	// });


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

	$('.remember-with-cookie:checkbox').on('change', function () {
		rememberFormValues("checkbox");
	});

	repopulateCheckboxes();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDNkZThiN2E4MjJkNzkzNzkyM2UiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9qcXVlcnktaGVscGVycy5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwic2Nyb2xsIiwic2Nyb2xsVG9wIiwiY29uZmlnIiwic2hvd1Njcm9sbFRvVG9wQnV0dG9uT2Zmc2V0IiwiZmFkZUluIiwiZmFkZU91dCIsIm9uIiwiZSIsImFuaW1hdGUiLCJzY3JvbGxUb1RvcER1cmF0aW9uIiwiaGlkZSIsImFkZENsYXNzIiwiaWQiLCJhdHRyIiwiY2xpY2siLCJ0YXJnZXQiLCJoYXNDbGFzcyIsInBhcmVudCIsImZpbmQiLCJzZXRDb29raWUiLCJhbmltdGlvbnMiLCJtZWRpdW0iLCJlYWNoIiwiYWZ0ZXIiLCJpcyIsIm5leHQiLCJ2YWwiLCJyZW1lbWJlckZvcm1WYWx1ZXMiLCJyZXBvcHVsYXRlQ2hlY2tib3hlcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFNQUEsRUFBRSxZQUFXO0FBQ1pBLEdBQUVDLE1BQUYsRUFBVUMsTUFBVixDQUFpQixZQUFVO0FBQzFCLE1BQUlGLEVBQUUsSUFBRixFQUFRRyxTQUFSLEtBQXNC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OiJcXGpzXFxqcXVlcnktaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0M2RlOGI3YTgyMmQ3OTM3OTIzZSIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gY29uZmlnLnNob3dTY3JvbGxUb1RvcEJ1dHRvbk9mZnNldCkge1xyXG5cdFx0XHQkKCcuc2Nyb2xsLXRvLXRvcCcpLmZhZGVJbigpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLnNjcm9sbC10by10b3AnKS5mYWRlT3V0KCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuc2Nyb2xsLXRvLXRvcFwiLCBmdW5jdGlvbihlKSB7XHJcblx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblx0XHRcdHNjcm9sbFRvcDogMFxyXG5cdFx0fSwgY29uZmlnLnNjcm9sbFRvVG9wRHVyYXRpb24pO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBTdHVkZW50IGhvbWUgcGFnZSBwcm9qZWN0IHByZXZpZXdcclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLnNob3ctbW9yZVwiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0JCh0aGlzKS5oaWRlKCk7XHJcblx0XHQkKCcucHJvamVjdCcpLmFkZENsYXNzKCdleHBhbmQnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVG9nZ2xlIGxhYmVsIGZsaXBzIHRvZ2dsZVxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuc3dpdGNoLWxhYmVsLnN3aXRjaC1sYWJlbC0tdG9nZ2xlXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgaWQgPSBcIiNcIiArICQodGhpcykuYXR0cignZm9yJyk7XHJcblx0XHQkKGlkKS5jbGljaygpO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8gQ2hlY2tib3ggZm9ybSB0b2dnbGVcclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmZvcm0tZmllbGQtLXRvZ2dsZVwiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYoJChlLnRhcmdldCkuaGFzQ2xhc3MoXCJ0b2dnbGVcIikgfHwgJChlLnRhcmdldCkucGFyZW50KCkuaGFzQ2xhc3MoXCJ0b2dnbGVcIikpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0JCh0aGlzKS5maW5kKCdpbnB1dDpjaGVja2JveCcpLmNsaWNrKCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIENvb2tpZSBCYW5uZXJcclxuXHQkKFwiLmNvb2tpZS1iYW5uZXJcIikub24oXCJjbGlja1wiLCBcImJ1dHRvblwiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0c2V0Q29va2llKCdjb29raWUtYmFubmVyLXNlZW4nLCB0cnVlLCAzNjUpO1xyXG5cdFx0JCh0aGlzKS5wYXJlbnQoKS5oaWRlKGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gJChcIi5kYi10eXBlLWZvcm1cIikub24oXCJzdWJtaXRcIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHQvLyBcdCQuYWpheCh7XHJcblx0Ly8gXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdC8vIFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0Ly8gXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKClcclxuXHQvLyBcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHQvLyBcdFx0bG9jYXRpb24ucmVsb2FkKHRydWUpO1xyXG5cdC8vIFx0fSk7XHJcblx0Ly8gfSk7XHJcblxyXG5cclxuXHQkKFwiLmJvb2xlYW4tY2hlY2tib3hcIikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkuYWZ0ZXIoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIicgKyAkKHRoaXMpLmF0dHIoXCJuYW1lXCIpICsgJ1wiIHZhbHVlPVwiJyArICQodGhpcykuaXMoJzpjaGVja2VkJykgKydcIiAvPicpO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmJvb2xlYW4tY2hlY2tib3hcIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5uZXh0KCkudmFsKFwidHJ1ZVwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkubmV4dCgpLnZhbChcImZhbHNlXCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKCcucmVtZW1iZXItd2l0aC1jb29raWU6Y2hlY2tib3gnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblx0XHRyZW1lbWJlckZvcm1WYWx1ZXMoXCJjaGVja2JveFwiKTtcclxuXHR9KTtcclxuXHJcblx0cmVwb3B1bGF0ZUNoZWNrYm94ZXMoKTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvanF1ZXJ5LWhlbHBlcnMuanMiXSwic291cmNlUm9vdCI6IiJ9