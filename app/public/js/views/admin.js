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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjZiNTViMTUxNWQwY2E0MzY2MGMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9hZG1pbi5qcyJdLCJuYW1lcyI6WyIkIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJmb3JtIiwiY29udGFpbmVyIiwib2xkQ29udGFpbmVySHRtbCIsImh0bWwiLCJjb25maXJtIiwidGl0bGUiLCJ0eXBlIiwiaWNvbiIsInRoZW1lIiwiZXNjYXBlS2V5IiwiYmFja2dyb3VuZERpc21pc3MiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJjb250ZW50IiwiYnV0dG9ucyIsImFyY2hpdmUiLCJidG5DbGFzcyIsImFjdGlvbiIsImNzcyIsImFqYXgiLCJ1cmwiLCJwcm9wIiwic3VjY2VzcyIsInJlc3BvbnNlIiwic3VjY2Vzc2Z1bCIsInNob3dOb3RpZmljYXRpb24iLCJtZXNzYWdlIiwiY2FuY2VsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7OztBQU1BLENBQUNBLEVBQUUsWUFBVztBQUNiOztBQUVBQSxHQUFFLE1BQUYsRUFBVUMsRUFBVixDQUFhLFFBQWIsRUFBdUIsbUJBQXZCLEVBQTRDLFVBQVNDLENBQVQsRUFBWTtBQUN2REEsSUFBRUMsY0FBRjtBQUNBLE1BQUlDLE9BQU9KLEVBQUUsSUFBRixDQUFYO0FBQ0EsTUFBSUssWUFBWUwsRUFBRSxpQkFBRixDQUFoQjtBQUNBLE1BQUlNLG1CQUFtQkQsVUFBVUUsSUFBVixFQUF2Qjs7QUFFQVAsSUFBRVEsT0FBRixDQUFVO0FBQ1RDLFVBQU8scUJBREU7QUFFVEMsU0FBTSxLQUZHO0FBR1RDLFNBQU0sNEtBSEc7QUFJVEMsVUFBTyxRQUpFO0FBS1RDLGNBQVcsSUFMRjtBQU1UQyxzQkFBbUIsSUFOVjtBQU9UQyx1QkFBcUIsS0FQWjtBQVFUQyxZQUFTLG1DQVJBO0FBU1RDLFlBQVM7QUFDUkMsYUFBUztBQUNSQyxlQUFVLFNBREY7QUFFUkMsYUFBUSxrQkFBVTtBQUNqQmYsZ0JBQVVFLElBQVYsQ0FBZSw0Q0FBZjtBQUNBUCxRQUFFLFNBQUYsRUFBYUssU0FBYixFQUF3QmdCLEdBQXhCLENBQTRCLFNBQTVCLEVBQXVDLE9BQXZDOztBQUVBckIsUUFBRXNCLElBQUYsQ0FBTztBQUNOQyxZQUFLbkIsS0FBS29CLElBQUwsQ0FBVSxRQUFWLENBREM7QUFFTmQsYUFBSyxNQUZDO0FBR05lLGdCQUFRLGlCQUFTQyxRQUFULEVBQWtCO0FBQ3pCLFlBQUdBLFNBQVNDLFVBQVosRUFBdUI7QUFDdEJ0QixtQkFBVUUsSUFBVixDQUFlLDJCQUFmO0FBQ0EsU0FGRCxNQUVPO0FBQ05GLG1CQUFVRSxJQUFWLENBQWVELGdCQUFmO0FBQ0FzQiwwQkFBaUIsT0FBakIsRUFBMEJGLFNBQVNHLE9BQW5DO0FBQ0E7QUFDRDtBQVZLLE9BQVA7QUFZQTtBQWxCTyxLQUREO0FBcUJSQyxZQUFRO0FBckJBO0FBVEEsR0FBVjtBQWlDQSxFQXZDRDtBQXdDQSxDQTNDQSxFIiwiZmlsZSI6IlxcanNcXHZpZXdzXFxhZG1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNmI1NWIxNTE1ZDBjYTQzNjYwYyIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0JCgnYm9keScpLm9uKCdzdWJtaXQnLCAnI2VuZE9mWWVhckFyY2hpdmUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR2YXIgZm9ybSA9ICQodGhpcyk7XHJcblx0XHR2YXIgY29udGFpbmVyID0gJCgnLmVveWEtY29udGFpbmVyJyk7XHJcblx0XHR2YXIgb2xkQ29udGFpbmVySHRtbCA9IGNvbnRhaW5lci5odG1sKCk7XHJcblxyXG5cdFx0JC5jb25maXJtKHtcclxuXHRcdFx0dGl0bGU6ICdFbmQgb2YgWWVhciBBcmNoaXZlJyxcclxuXHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMywzSDIxVjdIM1YzTTQsOEgyMFYyMUg0VjhNOS41LDExQTAuNSwwLjUgMCAwLDAgOSwxMS41VjEzSDE1VjExLjVBMC41LDAuNSAwIDAsMCAxNC41LDExSDkuNVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gYXJjaGl2ZT8nLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0YXJjaGl2ZToge1xyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0Y29udGFpbmVyLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXIgbG9hZGVyLS14LWxhcmdlXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCBjb250YWluZXIpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHR1cmw6IGZvcm0ucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdFx0XHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGFpbmVyLmh0bWwoJzxoMj5BcmNoaXZlIENvbXBsZXRlPC9oMj4nKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnRhaW5lci5odG1sKG9sZENvbnRhaW5lckh0bWwpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IHt9LFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvdmlld3MvYWRtaW4uanMiXSwic291cmNlUm9vdCI6IiJ9