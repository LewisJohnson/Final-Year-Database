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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function () {
	"use strict";

	var submitButton = $("#supervisor-report-search-button");
	var input = $("#supervisor-report-search-input");

	$(submitButton).on("click", function () {
		scrollToSupervisor();
	});

	$(document).keyup(function (e) {
		if (input.is(":focus") && e.keyCode === 13) {
			scrollToSupervisor();
		}
	});

	function scrollToSupervisor() {
		var supervisor = $('#' + input.val().replace(/[\s.]+/g, ''));

		if (supervisor.length < 1) {
			createToast("error", "Supervisor \"' + input.val() + '\" can not be found.");
		} else {
			supervisor.removeClass("animated shake");
			$("html, body").animate({
				scrollTop: supervisor.offset().top - 150 }, 600, function () {
				supervisor.addClass("animated shake");
				supervisor.focus();
			});
		}

		input.val("");
	}
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGY3Nzc2N2MxYzNjMWY5OWEzMDQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9zdXBlcnZpc29yLXJlcG9ydC5qcyJdLCJuYW1lcyI6WyIkIiwic3VibWl0QnV0dG9uIiwiaW5wdXQiLCJvbiIsInNjcm9sbFRvU3VwZXJ2aXNvciIsImRvY3VtZW50Iiwia2V5dXAiLCJlIiwiaXMiLCJrZXlDb2RlIiwic3VwZXJ2aXNvciIsInZhbCIsInJlcGxhY2UiLCJsZW5ndGgiLCJjcmVhdGVUb2FzdCIsInJlbW92ZUNsYXNzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsImFkZENsYXNzIiwiZm9jdXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBTUEsQ0FBQ0EsRUFBRSxZQUFXO0FBQ2I7O0FBRUEsS0FBSUMsZUFBZUQsRUFBRSxrQ0FBRixDQUFuQjtBQUNBLEtBQUlFLFFBQVFGLEVBQUUsaUNBQUYsQ0FBWjs7QUFFQUEsR0FBRUMsWUFBRixFQUFnQkUsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsWUFBVztBQUN0Q0M7QUFDQSxFQUZEOztBQUlBSixHQUFFSyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsVUFBVUMsQ0FBVixFQUFhO0FBQzlCLE1BQUlMLE1BQU1NLEVBQU4sQ0FBUyxRQUFULEtBQXNCRCxFQUFFRSxPQUFGLEtBQWMsRUFBeEMsRUFBNEM7QUFDM0NMO0FBQ0E7QUFDRCxFQUpEOztBQU1BLFVBQVNBLGtCQUFULEdBQTZCO0FBQzVCLE1BQUlNLGFBQWFWLEVBQUUsTUFBT0UsTUFBTVMsR0FBTixHQUFZQyxPQUFaLENBQW9CLFNBQXBCLEVBQStCLEVBQS9CLENBQVQsQ0FBakI7O0FBRUEsTUFBR0YsV0FBV0csTUFBWCxHQUFvQixDQUF2QixFQUF5QjtBQUN4QkMsZUFBWSxPQUFaLEVBQXFCLHNEQUFyQjtBQUNBLEdBRkQsTUFFTztBQUNOSixjQUFXSyxXQUFYLENBQXVCLGdCQUF2QjtBQUNBZixLQUFFLFlBQUYsRUFBZ0JnQixPQUFoQixDQUF3QjtBQUN2QkMsZUFBV1AsV0FBV1EsTUFBWCxHQUFvQkMsR0FBcEIsR0FBMEIsR0FEZCxFQUF4QixFQUM2QyxHQUQ3QyxFQUVDLFlBQVc7QUFDVlQsZUFBV1UsUUFBWCxDQUFvQixnQkFBcEI7QUFDQVYsZUFBV1csS0FBWDtBQUNELElBTEQ7QUFNQTs7QUFFRG5CLFFBQU1TLEdBQU4sQ0FBVSxFQUFWO0FBQ0E7QUFDRCxDQWpDQSxFIiwiZmlsZSI6IlxcanNcXHZpZXdzXFxzdXBlcnZpc29yLXJlcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkZjc3NzY3YzFjM2MxZjk5YTMwNCIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0dmFyIHN1Ym1pdEJ1dHRvbiA9ICQoXCIjc3VwZXJ2aXNvci1yZXBvcnQtc2VhcmNoLWJ1dHRvblwiKTtcclxuXHR2YXIgaW5wdXQgPSAkKFwiI3N1cGVydmlzb3ItcmVwb3J0LXNlYXJjaC1pbnB1dFwiKTtcclxuXHJcblx0JChzdWJtaXRCdXR0b24pLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHRzY3JvbGxUb1N1cGVydmlzb3IoKTtcclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmIChpbnB1dC5pcyhcIjpmb2N1c1wiKSAmJiBlLmtleUNvZGUgPT09IDEzKSB7XHJcblx0XHRcdHNjcm9sbFRvU3VwZXJ2aXNvcigpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBzY3JvbGxUb1N1cGVydmlzb3IoKXtcclxuXHRcdHZhciBzdXBlcnZpc29yID0gJCgnIycgKyAgaW5wdXQudmFsKCkucmVwbGFjZSgvW1xccy5dKy9nLCAnJykpO1xyXG5cclxuXHRcdGlmKHN1cGVydmlzb3IubGVuZ3RoIDwgMSl7XHJcblx0XHRcdGNyZWF0ZVRvYXN0KFwiZXJyb3JcIiwgXCJTdXBlcnZpc29yIFxcXCInICsgaW5wdXQudmFsKCkgKyAnXFxcIiBjYW4gbm90IGJlIGZvdW5kLlwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN1cGVydmlzb3IucmVtb3ZlQ2xhc3MoXCJhbmltYXRlZCBzaGFrZVwiKTtcclxuXHRcdFx0JChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XHJcblx0XHRcdFx0c2Nyb2xsVG9wOiBzdXBlcnZpc29yLm9mZnNldCgpLnRvcCAtIDE1MCB9LCA2MDAsXHJcblx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRzdXBlcnZpc29yLmFkZENsYXNzKFwiYW5pbWF0ZWQgc2hha2VcIik7XHJcblx0XHRcdFx0XHRzdXBlcnZpc29yLmZvY3VzKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlucHV0LnZhbChcIlwiKTtcclxuXHR9XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZpZXdzL3N1cGVydmlzb3ItcmVwb3J0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==