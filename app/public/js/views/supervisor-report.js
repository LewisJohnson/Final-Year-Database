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
			createToast("error", 'Supervisor "' + input.val() + '" can not be found.');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjcyZDhiMjNlYzM1OGU0YTYwOTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9zdXBlcnZpc29yLXJlcG9ydC5qcyJdLCJuYW1lcyI6WyIkIiwic3VibWl0QnV0dG9uIiwiaW5wdXQiLCJvbiIsInNjcm9sbFRvU3VwZXJ2aXNvciIsImRvY3VtZW50Iiwia2V5dXAiLCJlIiwiaXMiLCJrZXlDb2RlIiwic3VwZXJ2aXNvciIsInZhbCIsInJlcGxhY2UiLCJsZW5ndGgiLCJjcmVhdGVUb2FzdCIsInJlbW92ZUNsYXNzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsImFkZENsYXNzIiwiZm9jdXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBTUEsQ0FBQ0EsRUFBRSxZQUFXO0FBQ2I7O0FBRUEsS0FBSUMsZUFBZUQsRUFBRSxrQ0FBRixDQUFuQjtBQUNBLEtBQUlFLFFBQVFGLEVBQUUsaUNBQUYsQ0FBWjs7QUFFQUEsR0FBRUMsWUFBRixFQUFnQkUsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsWUFBVztBQUN0Q0M7QUFDQSxFQUZEOztBQUlBSixHQUFFSyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsVUFBVUMsQ0FBVixFQUFhO0FBQzlCLE1BQUlMLE1BQU1NLEVBQU4sQ0FBUyxRQUFULEtBQXNCRCxFQUFFRSxPQUFGLEtBQWMsRUFBeEMsRUFBNEM7QUFDM0NMO0FBQ0E7QUFDRCxFQUpEOztBQU1BLFVBQVNBLGtCQUFULEdBQTZCO0FBQzVCLE1BQUlNLGFBQWFWLEVBQUUsTUFBT0UsTUFBTVMsR0FBTixHQUFZQyxPQUFaLENBQW9CLFNBQXBCLEVBQStCLEVBQS9CLENBQVQsQ0FBakI7O0FBRUEsTUFBR0YsV0FBV0csTUFBWCxHQUFvQixDQUF2QixFQUF5QjtBQUN4QkMsZUFBWSxPQUFaLEVBQXFCLGlCQUFpQlosTUFBTVMsR0FBTixFQUFqQixHQUErQixxQkFBcEQ7QUFDQSxHQUZELE1BRU87QUFDTkQsY0FBV0ssV0FBWCxDQUF1QixnQkFBdkI7QUFDQWYsS0FBRSxZQUFGLEVBQWdCZ0IsT0FBaEIsQ0FBd0I7QUFDdkJDLGVBQVdQLFdBQVdRLE1BQVgsR0FBb0JDLEdBQXBCLEdBQTBCLEdBRGQsRUFBeEIsRUFDNkMsR0FEN0MsRUFFQyxZQUFXO0FBQ1ZULGVBQVdVLFFBQVgsQ0FBb0IsZ0JBQXBCO0FBQ0FWLGVBQVdXLEtBQVg7QUFDRCxJQUxEO0FBTUE7O0FBRURuQixRQUFNUyxHQUFOLENBQVUsRUFBVjtBQUNBO0FBQ0QsQ0FqQ0EsRSIsImZpbGUiOiJcXGpzXFx2aWV3c1xcc3VwZXJ2aXNvci1yZXBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjcyZDhiMjNlYzM1OGU0YTYwOTEiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxuOyQoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdHZhciBzdWJtaXRCdXR0b24gPSAkKFwiI3N1cGVydmlzb3ItcmVwb3J0LXNlYXJjaC1idXR0b25cIik7XHJcblx0dmFyIGlucHV0ID0gJChcIiNzdXBlcnZpc29yLXJlcG9ydC1zZWFyY2gtaW5wdXRcIik7XHJcblxyXG5cdCQoc3VibWl0QnV0dG9uKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0c2Nyb2xsVG9TdXBlcnZpc29yKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoaW5wdXQuaXMoXCI6Zm9jdXNcIikgJiYgZS5rZXlDb2RlID09PSAxMykge1xyXG5cdFx0XHRzY3JvbGxUb1N1cGVydmlzb3IoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gc2Nyb2xsVG9TdXBlcnZpc29yKCl7XHJcblx0XHR2YXIgc3VwZXJ2aXNvciA9ICQoJyMnICsgIGlucHV0LnZhbCgpLnJlcGxhY2UoL1tcXHMuXSsvZywgJycpKTtcclxuXHJcblx0XHRpZihzdXBlcnZpc29yLmxlbmd0aCA8IDEpe1xyXG5cdFx0XHRjcmVhdGVUb2FzdChcImVycm9yXCIsICdTdXBlcnZpc29yIFwiJyArIGlucHV0LnZhbCgpICsgJ1wiIGNhbiBub3QgYmUgZm91bmQuJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdXBlcnZpc29yLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZWQgc2hha2VcIik7XHJcblx0XHRcdCQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdHNjcm9sbFRvcDogc3VwZXJ2aXNvci5vZmZzZXQoKS50b3AgLSAxNTAgfSwgNjAwLFxyXG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c3VwZXJ2aXNvci5hZGRDbGFzcyhcImFuaW1hdGVkIHNoYWtlXCIpO1xyXG5cdFx0XHRcdFx0c3VwZXJ2aXNvci5mb2N1cygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnB1dC52YWwoXCJcIik7XHJcblx0fVxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9zdXBlcnZpc29yLXJlcG9ydC5qcyJdLCJzb3VyY2VSb290IjoiIn0=