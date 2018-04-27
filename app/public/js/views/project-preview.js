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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function () {
	"use strict";

	$("body").on("taphold", "#project-table .project-row", function (e) {
		var projectId = $(this).data("project-id");
		var ajaxUrl = $(this).data("preview-url");

		$.dialog({
			title: false,
			closeIcon: true,
			backgroundDismiss: true,
			draggable: true,
			dragWindowBorder: false,
			theme: 'material',
			escapeKey: true,
			animateFromElement: false,
			content: function content() {
				var self = this;
				return $.ajax({
					url: ajaxUrl,
					method: "GET"
				}).done(function (response) {
					self.setContent(response);
					self.setTitle(" ");
				}).fail(function () {
					self.setContent("Sorry, we couldn't load this project.");
				});
			}
		});
	});
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTVmNWMzZmZkZDUyODZmMTM0NTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9wcm9qZWN0LXByZXZpZXcuanMiXSwibmFtZXMiOlsiJCIsIm9uIiwiZSIsInByb2plY3RJZCIsImRhdGEiLCJhamF4VXJsIiwiZGlhbG9nIiwidGl0bGUiLCJjbG9zZUljb24iLCJiYWNrZ3JvdW5kRGlzbWlzcyIsImRyYWdnYWJsZSIsImRyYWdXaW5kb3dCb3JkZXIiLCJ0aGVtZSIsImVzY2FwZUtleSIsImFuaW1hdGVGcm9tRWxlbWVudCIsImNvbnRlbnQiLCJzZWxmIiwiYWpheCIsInVybCIsIm1ldGhvZCIsImRvbmUiLCJyZXNwb25zZSIsInNldENvbnRlbnQiLCJzZXRUaXRsZSIsImZhaWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBTUEsQ0FBQ0EsRUFBRSxZQUFXO0FBQ2I7O0FBRUFBLEdBQUUsTUFBRixFQUFVQyxFQUFWLENBQWEsU0FBYixFQUF3Qiw2QkFBeEIsRUFBdUQsVUFBU0MsQ0FBVCxFQUFZO0FBQ2xFLE1BQUlDLFlBQVlILEVBQUUsSUFBRixFQUFRSSxJQUFSLENBQWEsWUFBYixDQUFoQjtBQUNBLE1BQUlDLFVBQVVMLEVBQUUsSUFBRixFQUFRSSxJQUFSLENBQWEsYUFBYixDQUFkOztBQUVBSixJQUFFTSxNQUFGLENBQVM7QUFDUkMsVUFBTyxLQURDO0FBRVJDLGNBQVcsSUFGSDtBQUdSQyxzQkFBbUIsSUFIWDtBQUlSQyxjQUFXLElBSkg7QUFLUkMscUJBQWtCLEtBTFY7QUFNUkMsVUFBTyxVQU5DO0FBT1JDLGNBQVcsSUFQSDtBQVFSQyx1QkFBcUIsS0FSYjtBQVNSQyxZQUFTLG1CQUFZO0FBQ3BCLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFdBQU9oQixFQUFFaUIsSUFBRixDQUFPO0FBQ2JDLFVBQUtiLE9BRFE7QUFFYmMsYUFBUTtBQUZLLEtBQVAsRUFHSkMsSUFISSxDQUdDLFVBQVVDLFFBQVYsRUFBb0I7QUFDM0JMLFVBQUtNLFVBQUwsQ0FBZ0JELFFBQWhCO0FBQ0FMLFVBQUtPLFFBQUwsQ0FBYyxHQUFkO0FBQ0EsS0FOTSxFQU1KQyxJQU5JLENBTUMsWUFBVTtBQUNqQlIsVUFBS00sVUFBTCxDQUFnQix1Q0FBaEI7QUFDQSxLQVJNLENBQVA7QUFTQTtBQXBCTyxHQUFUO0FBc0JBLEVBMUJEO0FBMkJBLENBOUJBLEUiLCJmaWxlIjoiXFxqc1xcdmlld3NcXHByb2plY3QtcHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlNWY1YzNmZmRkNTI4NmYxMzQ1NCIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0JChcImJvZHlcIikub24oXCJ0YXBob2xkXCIsIFwiI3Byb2plY3QtdGFibGUgLnByb2plY3Qtcm93XCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBwcm9qZWN0SWQgPSAkKHRoaXMpLmRhdGEoXCJwcm9qZWN0LWlkXCIpO1xyXG5cdFx0dmFyIGFqYXhVcmwgPSAkKHRoaXMpLmRhdGEoXCJwcmV2aWV3LXVybFwiKTtcclxuXHJcblx0XHQkLmRpYWxvZyh7XHJcblx0XHRcdHRpdGxlOiBmYWxzZSxcclxuXHRcdFx0Y2xvc2VJY29uOiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0ZHJhZ2dhYmxlOiB0cnVlLFxyXG5cdFx0XHRkcmFnV2luZG93Qm9yZGVyOiBmYWxzZSxcclxuXHRcdFx0dGhlbWU6ICdtYXRlcmlhbCcsXHJcblx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdFx0cmV0dXJuICQuYWpheCh7XHJcblx0XHRcdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdFx0XHRtZXRob2Q6IFwiR0VUXCJcclxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0c2VsZi5zZXRDb250ZW50KHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdHNlbGYuc2V0VGl0bGUoXCIgXCIpO1xyXG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHNlbGYuc2V0Q29udGVudChcIlNvcnJ5LCB3ZSBjb3VsZG4ndCBsb2FkIHRoaXMgcHJvamVjdC5cIik7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9wcm9qZWN0LXByZXZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9