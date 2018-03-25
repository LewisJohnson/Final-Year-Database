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
			showNotification("error", "Supervisor \"' + input.val() + '\" can not be found.");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDNkZThiN2E4MjJkNzkzNzkyM2UiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9zdXBlcnZpc29yLXJlcG9ydC5qcyJdLCJuYW1lcyI6WyIkIiwic3VibWl0QnV0dG9uIiwiaW5wdXQiLCJvbiIsInNjcm9sbFRvU3VwZXJ2aXNvciIsImRvY3VtZW50Iiwia2V5dXAiLCJlIiwiaXMiLCJrZXlDb2RlIiwic3VwZXJ2aXNvciIsInZhbCIsInJlcGxhY2UiLCJsZW5ndGgiLCJzaG93Tm90aWZpY2F0aW9uIiwicmVtb3ZlQ2xhc3MiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwiYWRkQ2xhc3MiLCJmb2N1cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFNQSxDQUFDQSxFQUFFLFlBQVc7QUFDYjs7QUFFQSxLQUFJQyxlQUFlRCxFQUFFLGtDQUFGLENBQW5CO0FBQ0EsS0FBSUUsUUFBUUYsRUFBRSxpQ0FBRixDQUFaOztBQUVBQSxHQUFFQyxZQUFGLEVBQWdCRSxFQUFoQixDQUFtQixPQUFuQixFQUE0QixZQUFXO0FBQ3RDQztBQUNBLEVBRkQ7O0FBSUFKLEdBQUVLLFFBQUYsRUFBWUMsS0FBWixDQUFrQixVQUFVQyxDQUFWLEVBQWE7QUFDOUIsTUFBSUwsTUFBTU0sRUFBTixDQUFTLFFBQVQsS0FBc0JELEVBQUVFLE9BQUYsS0FBYyxFQUF4QyxFQUE0QztBQUMzQ0w7QUFDQTtBQUNELEVBSkQ7O0FBTUEsVUFBU0Esa0JBQVQsR0FBNkI7QUFDNUIsTUFBSU0sYUFBYVYsRUFBRSxNQUFPRSxNQUFNUyxHQUFOLEdBQVlDLE9BQVosQ0FBb0IsU0FBcEIsRUFBK0IsRUFBL0IsQ0FBVCxDQUFqQjs7QUFFQSxNQUFHRixXQUFXRyxNQUFYLEdBQW9CLENBQXZCLEVBQXlCO0FBQ3hCQyxvQkFBaUIsT0FBakIsRUFBMEIsc0RBQTFCO0FBQ0EsR0FGRCxNQUVPO0FBQ05KLGNBQVdLLFdBQVgsQ0FBdUIsZ0JBQXZCO0FBQ0FmLEtBQUUsWUFBRixFQUFnQmdCLE9BQWhCLENBQXdCO0FBQ3ZCQyxlQUFXUCxXQUFXUSxNQUFYLEdBQW9CQyxHQUFwQixHQUEwQixHQURkLEVBQXhCLEVBQzZDLEdBRDdDLEVBRUMsWUFBVztBQUNWVCxlQUFXVSxRQUFYLENBQW9CLGdCQUFwQjtBQUNBVixlQUFXVyxLQUFYO0FBQ0QsSUFMRDtBQU1BOztBQUVEbkIsUUFBTVMsR0FBTixDQUFVLEVBQVY7QUFDQTtBQUNELENBakNBLEUiLCJmaWxlIjoiXFxqc1xcdmlld3NcXHN1cGVydmlzb3ItcmVwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQzZGU4YjdhODIyZDc5Mzc5MjNlIiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHR2YXIgc3VibWl0QnV0dG9uID0gJChcIiNzdXBlcnZpc29yLXJlcG9ydC1zZWFyY2gtYnV0dG9uXCIpO1xyXG5cdHZhciBpbnB1dCA9ICQoXCIjc3VwZXJ2aXNvci1yZXBvcnQtc2VhcmNoLWlucHV0XCIpO1xyXG5cclxuXHQkKHN1Ym1pdEJ1dHRvbikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuXHRcdHNjcm9sbFRvU3VwZXJ2aXNvcigpO1xyXG5cdH0pO1xyXG5cclxuXHQkKGRvY3VtZW50KS5rZXl1cChmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKGlucHV0LmlzKFwiOmZvY3VzXCIpICYmIGUua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdFx0c2Nyb2xsVG9TdXBlcnZpc29yKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIHNjcm9sbFRvU3VwZXJ2aXNvcigpe1xyXG5cdFx0dmFyIHN1cGVydmlzb3IgPSAkKCcjJyArICBpbnB1dC52YWwoKS5yZXBsYWNlKC9bXFxzLl0rL2csICcnKSk7XHJcblxyXG5cdFx0aWYoc3VwZXJ2aXNvci5sZW5ndGggPCAxKXtcclxuXHRcdFx0c2hvd05vdGlmaWNhdGlvbihcImVycm9yXCIsIFwiU3VwZXJ2aXNvciBcXFwiJyArIGlucHV0LnZhbCgpICsgJ1xcXCIgY2FuIG5vdCBiZSBmb3VuZC5cIik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdXBlcnZpc29yLnJlbW92ZUNsYXNzKFwiYW5pbWF0ZWQgc2hha2VcIik7XHJcblx0XHRcdCQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdHNjcm9sbFRvcDogc3VwZXJ2aXNvci5vZmZzZXQoKS50b3AgLSAxNTAgfSwgNjAwLFxyXG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c3VwZXJ2aXNvci5hZGRDbGFzcyhcImFuaW1hdGVkIHNoYWtlXCIpO1xyXG5cdFx0XHRcdFx0c3VwZXJ2aXNvci5mb2N1cygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpbnB1dC52YWwoXCJcIik7XHJcblx0fVxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9zdXBlcnZpc29yLXJlcG9ydC5qcyJdLCJzb3VyY2VSb290IjoiIn0=