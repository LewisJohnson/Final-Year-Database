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

	$("#test-import-student-form").on('submit', function (e) {
		e.preventDefault();

		var file_data = $(this).find('.file').prop('files')[0];
		var form_data = new FormData();
		form_data.append('studentFile', file_data);
		$.ajax({
			url: $(this).prop('action'),
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,
			type: 'post',
			success: function success(response) {
				$('#import-student-test-result').html(response);
				$('#import-student-test-result').addClass('fadeInUp animated');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDkzYzU1NjNiZTMzN2Q4YjQwYzYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9hZG1pbi5qcyJdLCJuYW1lcyI6WyIkIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJmaWxlX2RhdGEiLCJmaW5kIiwicHJvcCIsImZvcm1fZGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiYWpheCIsInVybCIsImNhY2hlIiwiY29udGVudFR5cGUiLCJwcm9jZXNzRGF0YSIsImRhdGEiLCJ0eXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiaHRtbCIsImFkZENsYXNzIiwiZm9ybSIsImNvbnRhaW5lciIsIm9sZENvbnRhaW5lckh0bWwiLCJjb25maXJtIiwidGl0bGUiLCJpY29uIiwidGhlbWUiLCJlc2NhcGVLZXkiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsImFuaW1hdGVGcm9tRWxlbWVudCIsImNvbnRlbnQiLCJidXR0b25zIiwiYXJjaGl2ZSIsImJ0bkNsYXNzIiwiYWN0aW9uIiwiY3NzIiwic3VjY2Vzc2Z1bCIsInNob3dOb3RpZmljYXRpb24iLCJtZXNzYWdlIiwiY2FuY2VsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7OztBQU1BLENBQUNBLEVBQUUsWUFBVztBQUNiOztBQUVBQSxHQUFFLDJCQUFGLEVBQStCQyxFQUEvQixDQUFrQyxRQUFsQyxFQUE0QyxVQUFTQyxDQUFULEVBQVc7QUFDdERBLElBQUVDLGNBQUY7O0FBRUEsTUFBSUMsWUFBWUosRUFBRSxJQUFGLEVBQVFLLElBQVIsQ0FBYSxPQUFiLEVBQXNCQyxJQUF0QixDQUEyQixPQUEzQixFQUFvQyxDQUFwQyxDQUFoQjtBQUNBLE1BQUlDLFlBQVksSUFBSUMsUUFBSixFQUFoQjtBQUNBRCxZQUFVRSxNQUFWLENBQWlCLGFBQWpCLEVBQWdDTCxTQUFoQztBQUNBSixJQUFFVSxJQUFGLENBQU87QUFDTkMsUUFBS1gsRUFBRSxJQUFGLEVBQVFNLElBQVIsQ0FBYSxRQUFiLENBREM7QUFFTk0sVUFBTyxLQUZEO0FBR05DLGdCQUFhLEtBSFA7QUFJTkMsZ0JBQWEsS0FKUDtBQUtOQyxTQUFNUixTQUxBO0FBTU5TLFNBQU0sTUFOQTtBQU9OQyxZQUFTLGlCQUFTQyxRQUFULEVBQWtCO0FBQzFCbEIsTUFBRSw2QkFBRixFQUFpQ21CLElBQWpDLENBQXNDRCxRQUF0QztBQUNBbEIsTUFBRSw2QkFBRixFQUFpQ29CLFFBQWpDLENBQTBDLG1CQUExQztBQUNBO0FBVkssR0FBUDtBQVlBLEVBbEJEOztBQW9CQXBCLEdBQUUsTUFBRixFQUFVQyxFQUFWLENBQWEsUUFBYixFQUF1QixtQkFBdkIsRUFBNEMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3ZEQSxJQUFFQyxjQUFGO0FBQ0EsTUFBSWtCLE9BQU9yQixFQUFFLElBQUYsQ0FBWDtBQUNBLE1BQUlzQixZQUFZdEIsRUFBRSxpQkFBRixDQUFoQjtBQUNBLE1BQUl1QixtQkFBbUJELFVBQVVILElBQVYsRUFBdkI7O0FBRUFuQixJQUFFd0IsT0FBRixDQUFVO0FBQ1RDLFVBQU8scUJBREU7QUFFVFQsU0FBTSxLQUZHO0FBR1RVLFNBQU0sNEtBSEc7QUFJVEMsVUFBTyxRQUpFO0FBS1RDLGNBQVcsSUFMRjtBQU1UQyxzQkFBbUIsSUFOVjtBQU9UQyx1QkFBcUIsS0FQWjtBQVFUQyxZQUFTLG1DQVJBO0FBU1RDLFlBQVM7QUFDUkMsYUFBUztBQUNSQyxlQUFVLFNBREY7QUFFUkMsYUFBUSxrQkFBVTtBQUNqQmIsZ0JBQVVILElBQVYsQ0FBZSw0Q0FBZjtBQUNBbkIsUUFBRSxTQUFGLEVBQWFzQixTQUFiLEVBQXdCYyxHQUF4QixDQUE0QixTQUE1QixFQUF1QyxPQUF2Qzs7QUFFQXBDLFFBQUVVLElBQUYsQ0FBTztBQUNOQyxZQUFLVSxLQUFLZixJQUFMLENBQVUsUUFBVixDQURDO0FBRU5VLGFBQUssTUFGQztBQUdOQyxnQkFBUSxpQkFBU0MsUUFBVCxFQUFrQjtBQUN6QixZQUFHQSxTQUFTbUIsVUFBWixFQUF1QjtBQUN0QmYsbUJBQVVILElBQVYsQ0FBZSwyQkFBZjtBQUNBLFNBRkQsTUFFTztBQUNORyxtQkFBVUgsSUFBVixDQUFlSSxnQkFBZjtBQUNBZSwwQkFBaUIsT0FBakIsRUFBMEJwQixTQUFTcUIsT0FBbkM7QUFDQTtBQUNEO0FBVkssT0FBUDtBQVlBO0FBbEJPLEtBREQ7QUFxQlJDLFlBQVE7QUFyQkE7QUFUQSxHQUFWO0FBaUNBLEVBdkNEO0FBd0NBLENBL0RBLEUiLCJmaWxlIjoiXFxqc1xcdmlld3NcXGFkbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA5M2M1NTYzYmUzMzdkOGI0MGM2IiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHQkKFwiI3Rlc3QtaW1wb3J0LXN0dWRlbnQtZm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyIGZpbGVfZGF0YSA9ICQodGhpcykuZmluZCgnLmZpbGUnKS5wcm9wKCdmaWxlcycpWzBdOyAgIFxyXG5cdFx0dmFyIGZvcm1fZGF0YSA9IG5ldyBGb3JtRGF0YSgpXHJcblx0XHRmb3JtX2RhdGEuYXBwZW5kKCdzdHVkZW50RmlsZScsIGZpbGVfZGF0YSk7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdGNhY2hlOiBmYWxzZSxcclxuXHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxyXG5cdFx0XHRwcm9jZXNzRGF0YTogZmFsc2UsXHJcblx0XHRcdGRhdGE6IGZvcm1fZGF0YSxcclxuXHRcdFx0dHlwZTogJ3Bvc3QnLFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0JCgnI2ltcG9ydC1zdHVkZW50LXRlc3QtcmVzdWx0JykuaHRtbChyZXNwb25zZSk7XHJcblx0XHRcdFx0JCgnI2ltcG9ydC1zdHVkZW50LXRlc3QtcmVzdWx0JykuYWRkQ2xhc3MoJ2ZhZGVJblVwIGFuaW1hdGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdCB9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnYm9keScpLm9uKCdzdWJtaXQnLCAnI2VuZE9mWWVhckFyY2hpdmUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR2YXIgZm9ybSA9ICQodGhpcyk7XHJcblx0XHR2YXIgY29udGFpbmVyID0gJCgnLmVveWEtY29udGFpbmVyJyk7XHJcblx0XHR2YXIgb2xkQ29udGFpbmVySHRtbCA9IGNvbnRhaW5lci5odG1sKCk7XHJcblxyXG5cdFx0JC5jb25maXJtKHtcclxuXHRcdFx0dGl0bGU6ICdFbmQgb2YgWWVhciBBcmNoaXZlJyxcclxuXHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMywzSDIxVjdIM1YzTTQsOEgyMFYyMUg0VjhNOS41LDExQTAuNSwwLjUgMCAwLDAgOSwxMS41VjEzSDE1VjExLjVBMC41LDAuNSAwIDAsMCAxNC41LDExSDkuNVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gYXJjaGl2ZT8nLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0YXJjaGl2ZToge1xyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0Y29udGFpbmVyLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXIgbG9hZGVyLS14LWxhcmdlXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCBjb250YWluZXIpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHR1cmw6IGZvcm0ucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdFx0XHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGFpbmVyLmh0bWwoJzxoMj5BcmNoaXZlIENvbXBsZXRlPC9oMj4nKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnRhaW5lci5odG1sKG9sZENvbnRhaW5lckh0bWwpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IHt9LFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvdmlld3MvYWRtaW4uanMiXSwic291cmNlUm9vdCI6IiJ9