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
									createToast('error', response.message);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTVmNWMzZmZkZDUyODZmMTM0NTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9hZG1pbi5qcyJdLCJuYW1lcyI6WyIkIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJmaWxlRGF0YSIsImZpbmQiLCJwcm9wIiwicmVxdWVzdFR5cGUiLCJkYXRhIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImFqYXgiLCJ1cmwiLCJjYWNoZSIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJ0eXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiaHRtbCIsImFkZENsYXNzIiwiZm9ybSIsImNvbnRhaW5lciIsIm9sZENvbnRhaW5lckh0bWwiLCJjb25maXJtIiwidGl0bGUiLCJpY29uIiwidGhlbWUiLCJlc2NhcGVLZXkiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsImFuaW1hdGVGcm9tRWxlbWVudCIsImNvbnRlbnQiLCJidXR0b25zIiwiYXJjaGl2ZSIsImJ0bkNsYXNzIiwiYWN0aW9uIiwiY3NzIiwic3VjY2Vzc2Z1bCIsImNyZWF0ZVRvYXN0IiwibWVzc2FnZSIsImNhbmNlbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFNQSxDQUFDQSxFQUFFLFlBQVc7QUFDYjs7QUFFQUEsR0FBRSxzQkFBRixFQUEwQkMsRUFBMUIsQ0FBNkIsUUFBN0IsRUFBdUMsVUFBU0MsQ0FBVCxFQUFXO0FBQ2pEQSxJQUFFQyxjQUFGOztBQUVBLE1BQUlDLFdBQVdKLEVBQUUsSUFBRixFQUFRSyxJQUFSLENBQWEsT0FBYixFQUFzQkMsSUFBdEIsQ0FBMkIsT0FBM0IsRUFBb0MsQ0FBcEMsQ0FBZjtBQUNBLE1BQUlDLGNBQWNQLEVBQUUsSUFBRixFQUFRUSxJQUFSLENBQWEsTUFBYixDQUFsQjtBQUNBLE1BQUlDLFdBQVcsSUFBSUMsUUFBSixFQUFmOztBQUVBRCxXQUFTRSxNQUFULENBQWdCLGFBQWhCLEVBQStCUCxRQUEvQjtBQUNBSixJQUFFWSxJQUFGLENBQU87QUFDTkMsUUFBS2IsRUFBRSxJQUFGLEVBQVFNLElBQVIsQ0FBYSxRQUFiLENBREM7QUFFTlEsVUFBTyxLQUZEO0FBR05DLGdCQUFhLEtBSFA7QUFJTkMsZ0JBQWEsS0FKUDtBQUtOUixTQUFNQyxRQUxBO0FBTU5RLFNBQU0sTUFOQTtBQU9OQyxZQUFTLGlCQUFTQyxRQUFULEVBQWtCO0FBQzFCLFFBQUdaLGVBQWUsTUFBbEIsRUFBeUI7QUFDeEJQLE9BQUUsNkJBQUYsRUFBaUNvQixJQUFqQyxDQUFzQ0QsUUFBdEM7QUFDQW5CLE9BQUUsNkJBQUYsRUFBaUNxQixRQUFqQyxDQUEwQyxtQkFBMUM7QUFDQSxLQUhELE1BR087QUFDTnJCLE9BQUUsd0JBQUYsRUFBNEJvQixJQUE1QixDQUFpQ0QsUUFBakM7QUFDQW5CLE9BQUUsd0JBQUYsRUFBNEJxQixRQUE1QixDQUFxQyxtQkFBckM7QUFDQTtBQUNEO0FBZkssR0FBUDtBQWlCQSxFQXpCRDs7QUEyQkFyQixHQUFFLE1BQUYsRUFBVUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsbUJBQXZCLEVBQTRDLFVBQVNDLENBQVQsRUFBWTtBQUN2REEsSUFBRUMsY0FBRjtBQUNBLE1BQUltQixPQUFPdEIsRUFBRSxJQUFGLENBQVg7QUFDQSxNQUFJdUIsWUFBWXZCLEVBQUUsaUJBQUYsQ0FBaEI7QUFDQSxNQUFJd0IsbUJBQW1CRCxVQUFVSCxJQUFWLEVBQXZCOztBQUVBcEIsSUFBRXlCLE9BQUYsQ0FBVTtBQUNUQyxVQUFPLHFCQURFO0FBRVRULFNBQU0sS0FGRztBQUdUVSxTQUFNLDRLQUhHO0FBSVRDLFVBQU8sUUFKRTtBQUtUQyxjQUFXLElBTEY7QUFNVEMsc0JBQW1CLElBTlY7QUFPVEMsdUJBQXFCLEtBUFo7QUFRVEMsWUFBUyxtQ0FSQTtBQVNUQyxZQUFTO0FBQ1JDLGFBQVM7QUFDUkMsZUFBVSxTQURGO0FBRVJDLGFBQVEsa0JBQVU7QUFDakJiLGdCQUFVSCxJQUFWLENBQWUsNENBQWY7QUFDQXBCLFFBQUUsU0FBRixFQUFhdUIsU0FBYixFQUF3QmMsR0FBeEIsQ0FBNEIsU0FBNUIsRUFBdUMsT0FBdkM7O0FBRUFyQyxRQUFFWSxJQUFGLENBQU87QUFDTkMsWUFBS1MsS0FBS2hCLElBQUwsQ0FBVSxRQUFWLENBREM7QUFFTlcsYUFBSyxNQUZDO0FBR05DLGdCQUFRLGlCQUFTQyxRQUFULEVBQWtCO0FBQ3pCLFlBQUdBLFNBQVNtQixVQUFaLEVBQXVCO0FBQ3RCZixtQkFBVUgsSUFBVixDQUFlLDJCQUFmO0FBQ0EsU0FGRCxNQUVPO0FBQ05HLG1CQUFVSCxJQUFWLENBQWVJLGdCQUFmO0FBQ0FlLHFCQUFZLE9BQVosRUFBcUJwQixTQUFTcUIsT0FBOUI7QUFDQTtBQUNEO0FBVkssT0FBUDtBQVlBO0FBbEJPLEtBREQ7QUFxQlJDLFlBQVE7QUFyQkE7QUFUQSxHQUFWO0FBaUNBLEVBdkNEO0FBd0NBLENBdEVBLEUiLCJmaWxlIjoiXFxqc1xcdmlld3NcXGFkbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU1ZjVjM2ZmZGQ1Mjg2ZjEzNDU0IiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHQkKFwiLmltcG9ydC1zdHVkZW50LWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciBmaWxlRGF0YSA9ICQodGhpcykuZmluZCgnLmZpbGUnKS5wcm9wKCdmaWxlcycpWzBdOyAgIFxyXG5cdFx0dmFyIHJlcXVlc3RUeXBlID0gJCh0aGlzKS5kYXRhKCd0eXBlJyk7XHJcblx0XHR2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxyXG5cclxuXHRcdGZvcm1EYXRhLmFwcGVuZCgnc3R1ZGVudEZpbGUnLCBmaWxlRGF0YSk7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdGNhY2hlOiBmYWxzZSxcclxuXHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxyXG5cdFx0XHRwcm9jZXNzRGF0YTogZmFsc2UsXHJcblx0XHRcdGRhdGE6IGZvcm1EYXRhLFxyXG5cdFx0XHR0eXBlOiAncG9zdCcsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRpZihyZXF1ZXN0VHlwZSA9PSBcInRlc3RcIil7XHJcblx0XHRcdFx0XHQkKCcjaW1wb3J0LXN0dWRlbnQtdGVzdC1yZXN1bHQnKS5odG1sKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdCQoJyNpbXBvcnQtc3R1ZGVudC10ZXN0LXJlc3VsdCcpLmFkZENsYXNzKCdmYWRlSW5VcCBhbmltYXRlZCcpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKCcjaW1wb3J0LXN0dWRlbnQtcmVzdWx0JykuaHRtbChyZXNwb25zZSk7XHJcblx0XHRcdFx0XHQkKCcjaW1wb3J0LXN0dWRlbnQtcmVzdWx0JykuYWRkQ2xhc3MoJ2ZhZGVJblVwIGFuaW1hdGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHQgfSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJ2JvZHknKS5vbignc3VibWl0JywgJyNlbmRPZlllYXJBcmNoaXZlJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dmFyIGZvcm0gPSAkKHRoaXMpO1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9ICQoJy5lb3lhLWNvbnRhaW5lcicpO1xyXG5cdFx0dmFyIG9sZENvbnRhaW5lckh0bWwgPSBjb250YWluZXIuaHRtbCgpO1xyXG5cclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnRW5kIG9mIFllYXIgQXJjaGl2ZScsXHJcblx0XHRcdHR5cGU6ICdyZWQnLFxyXG5cdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTMsM0gyMVY3SDNWM000LDhIMjBWMjFINFY4TTkuNSwxMUEwLjUsMC41IDAgMCwwIDksMTEuNVYxM0gxNVYxMS41QTAuNSwwLjUgMCAwLDAgMTQuNSwxMUg5LjVaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGFyY2hpdmU/JyxcclxuXHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdGFyY2hpdmU6IHtcclxuXHRcdFx0XHRcdGJ0bkNsYXNzOiAnYnRuLXJlZCcsXHJcblx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGNvbnRhaW5lci5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyIGxvYWRlci0teC1sYXJnZVwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHQkKCcubG9hZGVyJywgY29udGFpbmVyKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0dXJsOiBmb3JtLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHRcdFx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYocmVzcG9uc2Uuc3VjY2Vzc2Z1bCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnRhaW5lci5odG1sKCc8aDI+QXJjaGl2ZSBDb21wbGV0ZTwvaDI+Jyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb250YWluZXIuaHRtbChvbGRDb250YWluZXJIdG1sKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRlVG9hc3QoJ2Vycm9yJywgcmVzcG9uc2UubWVzc2FnZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNhbmNlbDoge30sXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9hZG1pbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=