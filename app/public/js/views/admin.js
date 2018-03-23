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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function () {
	"use strict";

	$(".import-student-form").on('submit', function (e) {
		e.preventDefault();

		var fileData = $(this).find('.file').prop('files')[0];
		var requestType = $(this).data('type');
		var formData = new FormData();

		formData.append('studentFile', fileData);
		$.ajax({
			url: $(this).prop('action'),
			cache: false,
			contentType: false,
			processData: false,
			data: formData,
			type: 'post',
			success: function success(response) {
				if (requestType == "test") {
					$('#import-student-test-result').html(response);
					$('#import-student-test-result').addClass('fadeInUp animated');
				} else {
					$('#import-student-result').html(response);
					$('#import-student-result').addClass('fadeInUp animated');
				}
			}
		});
	});

	$('body').on('submit', '#endOfYearArchive', function (e) {
		e.preventDefault();
		var form = $(this);
		var container = $('.eoya-container');
		var oldContainerHtml = container.html();

		$.confirm({
			title: 'End of Year Archive',
			type: 'red',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement: false,
			content: 'Are you sure you want to archive?',
			buttons: {
				archive: {
					btnClass: 'btn-red',
					action: function action() {
						container.html('<div class="loader loader--x-large"></div>');
						$('.loader', container).css('display', 'block');

						$.ajax({
							url: form.prop('action'),
							type: 'POST',
							success: function success(response) {
								if (response.successful) {
									container.html('<h2>Archive Complete</h2>');
								} else {
									container.html(oldContainerHtml);
									showNotification('error', response.message);
								}
							}
						});
					}
				},
				cancel: {}
			}
		});
	});
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDAyMTg2N2QzYWE4NmU3M2NiYjMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9hZG1pbi5qcyJdLCJuYW1lcyI6WyIkIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJmaWxlRGF0YSIsImZpbmQiLCJwcm9wIiwicmVxdWVzdFR5cGUiLCJkYXRhIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImFqYXgiLCJ1cmwiLCJjYWNoZSIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJ0eXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiaHRtbCIsImFkZENsYXNzIiwiZm9ybSIsImNvbnRhaW5lciIsIm9sZENvbnRhaW5lckh0bWwiLCJjb25maXJtIiwidGl0bGUiLCJpY29uIiwidGhlbWUiLCJlc2NhcGVLZXkiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsImFuaW1hdGVGcm9tRWxlbWVudCIsImNvbnRlbnQiLCJidXR0b25zIiwiYXJjaGl2ZSIsImJ0bkNsYXNzIiwiYWN0aW9uIiwiY3NzIiwic3VjY2Vzc2Z1bCIsInNob3dOb3RpZmljYXRpb24iLCJtZXNzYWdlIiwiY2FuY2VsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7OztBQU1BLENBQUNBLEVBQUUsWUFBVztBQUNiOztBQUVBQSxHQUFFLHNCQUFGLEVBQTBCQyxFQUExQixDQUE2QixRQUE3QixFQUF1QyxVQUFTQyxDQUFULEVBQVc7QUFDakRBLElBQUVDLGNBQUY7O0FBRUEsTUFBSUMsV0FBV0osRUFBRSxJQUFGLEVBQVFLLElBQVIsQ0FBYSxPQUFiLEVBQXNCQyxJQUF0QixDQUEyQixPQUEzQixFQUFvQyxDQUFwQyxDQUFmO0FBQ0EsTUFBSUMsY0FBY1AsRUFBRSxJQUFGLEVBQVFRLElBQVIsQ0FBYSxNQUFiLENBQWxCO0FBQ0EsTUFBSUMsV0FBVyxJQUFJQyxRQUFKLEVBQWY7O0FBRUFELFdBQVNFLE1BQVQsQ0FBZ0IsYUFBaEIsRUFBK0JQLFFBQS9CO0FBQ0FKLElBQUVZLElBQUYsQ0FBTztBQUNOQyxRQUFLYixFQUFFLElBQUYsRUFBUU0sSUFBUixDQUFhLFFBQWIsQ0FEQztBQUVOUSxVQUFPLEtBRkQ7QUFHTkMsZ0JBQWEsS0FIUDtBQUlOQyxnQkFBYSxLQUpQO0FBS05SLFNBQU1DLFFBTEE7QUFNTlEsU0FBTSxNQU5BO0FBT05DLFlBQVMsaUJBQVNDLFFBQVQsRUFBa0I7QUFDMUIsUUFBR1osZUFBZSxNQUFsQixFQUF5QjtBQUN4QlAsT0FBRSw2QkFBRixFQUFpQ29CLElBQWpDLENBQXNDRCxRQUF0QztBQUNBbkIsT0FBRSw2QkFBRixFQUFpQ3FCLFFBQWpDLENBQTBDLG1CQUExQztBQUNBLEtBSEQsTUFHTztBQUNOckIsT0FBRSx3QkFBRixFQUE0Qm9CLElBQTVCLENBQWlDRCxRQUFqQztBQUNBbkIsT0FBRSx3QkFBRixFQUE0QnFCLFFBQTVCLENBQXFDLG1CQUFyQztBQUNBO0FBQ0Q7QUFmSyxHQUFQO0FBaUJBLEVBekJEOztBQTJCQXJCLEdBQUUsTUFBRixFQUFVQyxFQUFWLENBQWEsUUFBYixFQUF1QixtQkFBdkIsRUFBNEMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3ZEQSxJQUFFQyxjQUFGO0FBQ0EsTUFBSW1CLE9BQU90QixFQUFFLElBQUYsQ0FBWDtBQUNBLE1BQUl1QixZQUFZdkIsRUFBRSxpQkFBRixDQUFoQjtBQUNBLE1BQUl3QixtQkFBbUJELFVBQVVILElBQVYsRUFBdkI7O0FBRUFwQixJQUFFeUIsT0FBRixDQUFVO0FBQ1RDLFVBQU8scUJBREU7QUFFVFQsU0FBTSxLQUZHO0FBR1RVLFNBQU0sNEtBSEc7QUFJVEMsVUFBTyxRQUpFO0FBS1RDLGNBQVcsSUFMRjtBQU1UQyxzQkFBbUIsSUFOVjtBQU9UQyx1QkFBcUIsS0FQWjtBQVFUQyxZQUFTLG1DQVJBO0FBU1RDLFlBQVM7QUFDUkMsYUFBUztBQUNSQyxlQUFVLFNBREY7QUFFUkMsYUFBUSxrQkFBVTtBQUNqQmIsZ0JBQVVILElBQVYsQ0FBZSw0Q0FBZjtBQUNBcEIsUUFBRSxTQUFGLEVBQWF1QixTQUFiLEVBQXdCYyxHQUF4QixDQUE0QixTQUE1QixFQUF1QyxPQUF2Qzs7QUFFQXJDLFFBQUVZLElBQUYsQ0FBTztBQUNOQyxZQUFLUyxLQUFLaEIsSUFBTCxDQUFVLFFBQVYsQ0FEQztBQUVOVyxhQUFLLE1BRkM7QUFHTkMsZ0JBQVEsaUJBQVNDLFFBQVQsRUFBa0I7QUFDekIsWUFBR0EsU0FBU21CLFVBQVosRUFBdUI7QUFDdEJmLG1CQUFVSCxJQUFWLENBQWUsMkJBQWY7QUFDQSxTQUZELE1BRU87QUFDTkcsbUJBQVVILElBQVYsQ0FBZUksZ0JBQWY7QUFDQWUsMEJBQWlCLE9BQWpCLEVBQTBCcEIsU0FBU3FCLE9BQW5DO0FBQ0E7QUFDRDtBQVZLLE9BQVA7QUFZQTtBQWxCTyxLQUREO0FBcUJSQyxZQUFRO0FBckJBO0FBVEEsR0FBVjtBQWlDQSxFQXZDRDtBQXdDQSxDQXRFQSxFIiwiZmlsZSI6IlxcanNcXHZpZXdzXFxhZG1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MDIxODY3ZDNhYTg2ZTczY2JiMyIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0JChcIi5pbXBvcnQtc3R1ZGVudC1mb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgZmlsZURhdGEgPSAkKHRoaXMpLmZpbmQoJy5maWxlJykucHJvcCgnZmlsZXMnKVswXTsgICBcclxuXHRcdHZhciByZXF1ZXN0VHlwZSA9ICQodGhpcykuZGF0YSgndHlwZScpO1xyXG5cdFx0dmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcclxuXHJcblx0XHRmb3JtRGF0YS5hcHBlbmQoJ3N0dWRlbnRGaWxlJywgZmlsZURhdGEpO1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHRjYWNoZTogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuXHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG5cdFx0XHRkYXRhOiBmb3JtRGF0YSxcclxuXHRcdFx0dHlwZTogJ3Bvc3QnLFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0aWYocmVxdWVzdFR5cGUgPT0gXCJ0ZXN0XCIpe1xyXG5cdFx0XHRcdFx0JCgnI2ltcG9ydC1zdHVkZW50LXRlc3QtcmVzdWx0JykuaHRtbChyZXNwb25zZSk7XHJcblx0XHRcdFx0XHQkKCcjaW1wb3J0LXN0dWRlbnQtdGVzdC1yZXN1bHQnKS5hZGRDbGFzcygnZmFkZUluVXAgYW5pbWF0ZWQnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCgnI2ltcG9ydC1zdHVkZW50LXJlc3VsdCcpLmh0bWwocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0JCgnI2ltcG9ydC1zdHVkZW50LXJlc3VsdCcpLmFkZENsYXNzKCdmYWRlSW5VcCBhbmltYXRlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0IH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCdib2R5Jykub24oJ3N1Ym1pdCcsICcjZW5kT2ZZZWFyQXJjaGl2ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHZhciBmb3JtID0gJCh0aGlzKTtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKCcuZW95YS1jb250YWluZXInKTtcclxuXHRcdHZhciBvbGRDb250YWluZXJIdG1sID0gY29udGFpbmVyLmh0bWwoKTtcclxuXHJcblx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogJ0VuZCBvZiBZZWFyIEFyY2hpdmUnLFxyXG5cdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0zLDNIMjFWN0gzVjNNNCw4SDIwVjIxSDRWOE05LjUsMTFBMC41LDAuNSAwIDAsMCA5LDExLjVWMTNIMTVWMTEuNUEwLjUsMC41IDAgMCwwIDE0LjUsMTFIOS41WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBhcmNoaXZlPycsXHJcblx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRhcmNoaXZlOiB7XHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRjb250YWluZXIuaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHRcdFx0XHRcdFx0JCgnLmxvYWRlcicsIGNvbnRhaW5lcikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdHVybDogZm9ybS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0XHRcdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRcdFx0XHRcdGlmKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb250YWluZXIuaHRtbCgnPGgyPkFyY2hpdmUgQ29tcGxldGU8L2gyPicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGFpbmVyLmh0bWwob2xkQ29udGFpbmVySHRtbCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJ2Vycm9yJywgcmVzcG9uc2UubWVzc2FnZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNhbmNlbDoge30sXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9hZG1pbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=