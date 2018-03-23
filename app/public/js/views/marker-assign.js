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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(27);


/***/ }),

/***/ 27:
/***/ (function(module, exports) {

/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function () {
	"use strict";

	// Get help footer snippet using ajax

	$.ajax({
		url: '/admin/marker-assign-automatic-table',
		type: 'GET',
		success: function success(response) {
			response = JSON.parse(response);

			$('#automatic-assign-container .content').addClass('animated fadeInUp');
			if (response.successful) {
				$('#automatic-assign-container .content').html(response.html);
			} else {
				$('#automatic-assign-container .content').addClass('error-display');
				$('#automatic-assign-container .content').html(response.message);
			}

			$('#automatic-assign-container .loader-container').hide();
		}
	});

	$("body").on("submit", "#calculateSecondMarkers", function (e) {
		e.preventDefault();

		$('#automatic-assign-container .loader-container').show();
		$('#automatic-assign-container .loader-container p').text('Assigning second markers to students...');

		$.ajax({
			url: $(this).prop('action'),
			type: 'POST',
			data: $(this).serialize(),
			success: function success(response) {
				response = JSON.parse(response);

				$('#automatic-assign-container .content').addClass('animated fadeInUp');
				if (response.successful) {
					$('#automatic-assign-container .content').html(response.html);
				} else {
					$('#automatic-assign-container .content').addClass('error-display');
					$('#automatic-assign-container .content').html(response.message);
				}

				$('#automatic-assign-container .loader-container').hide();
			}
		});
	});

	$("body").on("click", "#showReportTable", function (e) {
		e.preventDefault();

		$('#automatic-assign-container .loader-container').show();
		$('#automatic-assign-container .loader-container p').text('Getting second marker table...');

		$.ajax({
			url: '/admin/marker-assign-report-table',
			type: 'GET',
			success: function success(response) {
				response = JSON.parse(response);

				$('#automatic-assign-container .content').addClass('animated fadeInUp');
				if (response.successful) {
					$('#automatic-assign-container .content').html(response.html);
				} else {
					$('#automatic-assign-container .content').addClass('error-display');
					$('#automatic-assign-container .content').html(response.message);
				}

				$('#automatic-assign-container .loader-container').hide();
			}
		});
	});
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGU0MDcyNmU1YTAzM2NlMzY3ZjIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9tYXJrZXItYXNzaWduLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4IiwidXJsIiwidHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsIkpTT04iLCJwYXJzZSIsImFkZENsYXNzIiwic3VjY2Vzc2Z1bCIsImh0bWwiLCJtZXNzYWdlIiwiaGlkZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2hvdyIsInRleHQiLCJwcm9wIiwiZGF0YSIsInNlcmlhbGl6ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFNQSxDQUFDQSxFQUFFLFlBQVc7QUFDYjs7QUFFQTs7QUFDQUEsR0FBRUMsSUFBRixDQUFPO0FBQ05DLE9BQUssc0NBREM7QUFFTkMsUUFBSyxLQUZDO0FBR05DLFdBQVEsaUJBQVNDLFFBQVQsRUFBa0I7QUFDekJBLGNBQVdDLEtBQUtDLEtBQUwsQ0FBV0YsUUFBWCxDQUFYOztBQUVBTCxLQUFFLHNDQUFGLEVBQTBDUSxRQUExQyxDQUFtRCxtQkFBbkQ7QUFDQSxPQUFHSCxTQUFTSSxVQUFaLEVBQXVCO0FBQ3RCVCxNQUFFLHNDQUFGLEVBQTBDVSxJQUExQyxDQUErQ0wsU0FBU0ssSUFBeEQ7QUFDQSxJQUZELE1BRU87QUFDTlYsTUFBRSxzQ0FBRixFQUEwQ1EsUUFBMUMsQ0FBbUQsZUFBbkQ7QUFDQVIsTUFBRSxzQ0FBRixFQUEwQ1UsSUFBMUMsQ0FBK0NMLFNBQVNNLE9BQXhEO0FBQ0E7O0FBRURYLEtBQUUsK0NBQUYsRUFBbURZLElBQW5EO0FBQ0E7QUFmSyxFQUFQOztBQWtCQVosR0FBRSxNQUFGLEVBQVVhLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLHlCQUF2QixFQUFtRCxVQUFTQyxDQUFULEVBQVk7QUFDOURBLElBQUVDLGNBQUY7O0FBRUFmLElBQUUsK0NBQUYsRUFBbURnQixJQUFuRDtBQUNBaEIsSUFBRSxpREFBRixFQUFxRGlCLElBQXJELENBQTBELHlDQUExRDs7QUFFQWpCLElBQUVDLElBQUYsQ0FBTztBQUNOQyxRQUFLRixFQUFFLElBQUYsRUFBUWtCLElBQVIsQ0FBYSxRQUFiLENBREM7QUFFTmYsU0FBSyxNQUZDO0FBR05nQixTQUFNbkIsRUFBRSxJQUFGLEVBQVFvQixTQUFSLEVBSEE7QUFJTmhCLFlBQVEsaUJBQVNDLFFBQVQsRUFBa0I7QUFDekJBLGVBQVdDLEtBQUtDLEtBQUwsQ0FBV0YsUUFBWCxDQUFYOztBQUVBTCxNQUFFLHNDQUFGLEVBQTBDUSxRQUExQyxDQUFtRCxtQkFBbkQ7QUFDQSxRQUFHSCxTQUFTSSxVQUFaLEVBQXVCO0FBQ3RCVCxPQUFFLHNDQUFGLEVBQTBDVSxJQUExQyxDQUErQ0wsU0FBU0ssSUFBeEQ7QUFDQSxLQUZELE1BRU87QUFDTlYsT0FBRSxzQ0FBRixFQUEwQ1EsUUFBMUMsQ0FBbUQsZUFBbkQ7QUFDQVIsT0FBRSxzQ0FBRixFQUEwQ1UsSUFBMUMsQ0FBK0NMLFNBQVNNLE9BQXhEO0FBQ0E7O0FBRURYLE1BQUUsK0NBQUYsRUFBbURZLElBQW5EO0FBQ0E7QUFoQkssR0FBUDtBQWtCQSxFQXhCRDs7QUEwQkFaLEdBQUUsTUFBRixFQUFVYSxFQUFWLENBQWEsT0FBYixFQUFzQixrQkFBdEIsRUFBMkMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3REQSxJQUFFQyxjQUFGOztBQUVBZixJQUFFLCtDQUFGLEVBQW1EZ0IsSUFBbkQ7QUFDQWhCLElBQUUsaURBQUYsRUFBcURpQixJQUFyRCxDQUEwRCxnQ0FBMUQ7O0FBRUFqQixJQUFFQyxJQUFGLENBQU87QUFDTkMsUUFBSyxtQ0FEQztBQUVOQyxTQUFLLEtBRkM7QUFHTkMsWUFBUSxpQkFBU0MsUUFBVCxFQUFrQjtBQUN6QkEsZUFBV0MsS0FBS0MsS0FBTCxDQUFXRixRQUFYLENBQVg7O0FBRUFMLE1BQUUsc0NBQUYsRUFBMENRLFFBQTFDLENBQW1ELG1CQUFuRDtBQUNBLFFBQUdILFNBQVNJLFVBQVosRUFBdUI7QUFDdEJULE9BQUUsc0NBQUYsRUFBMENVLElBQTFDLENBQStDTCxTQUFTSyxJQUF4RDtBQUNBLEtBRkQsTUFFTztBQUNOVixPQUFFLHNDQUFGLEVBQTBDUSxRQUExQyxDQUFtRCxlQUFuRDtBQUNBUixPQUFFLHNDQUFGLEVBQTBDVSxJQUExQyxDQUErQ0wsU0FBU00sT0FBeEQ7QUFDQTs7QUFFRFgsTUFBRSwrQ0FBRixFQUFtRFksSUFBbkQ7QUFDQTtBQWZLLEdBQVA7QUFpQkEsRUF2QkQ7QUF3QkEsQ0F4RUEsRSIsImZpbGUiOiJcXGpzXFx2aWV3c1xcbWFya2VyLWFzc2lnbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4ZTQwNzI2ZTVhMDMzY2UzNjdmMiIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Ly8gR2V0IGhlbHAgZm9vdGVyIHNuaXBwZXQgdXNpbmcgYWpheFxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICcvYWRtaW4vbWFya2VyLWFzc2lnbi1hdXRvbWF0aWMtdGFibGUnLFxyXG5cdFx0dHlwZTonR0VUJyxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cclxuXHRcdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5jb250ZW50JykuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJblVwJyk7XHJcblx0XHRcdGlmKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpe1xyXG5cdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmh0bWwocmVzcG9uc2UuaHRtbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5jb250ZW50JykuYWRkQ2xhc3MoJ2Vycm9yLWRpc3BsYXknKTtcclxuXHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5odG1sKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmxvYWRlci1jb250YWluZXInKS5oaWRlKCk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcInN1Ym1pdFwiLCBcIiNjYWxjdWxhdGVTZWNvbmRNYXJrZXJzXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyJykuc2hvdygpO1xyXG5cdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyIHAnKS50ZXh0KCdBc3NpZ25pbmcgc2Vjb25kIG1hcmtlcnMgdG8gc3R1ZGVudHMuLi4nKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cclxuXHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5hZGRDbGFzcygnYW5pbWF0ZWQgZmFkZUluVXAnKTtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmh0bWwocmVzcG9uc2UuaHRtbCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmFkZENsYXNzKCdlcnJvci1kaXNwbGF5Jyk7XHJcblx0XHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5odG1sKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIjc2hvd1JlcG9ydFRhYmxlXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyJykuc2hvdygpO1xyXG5cdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyIHAnKS50ZXh0KCdHZXR0aW5nIHNlY29uZCBtYXJrZXIgdGFibGUuLi4nKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICcvYWRtaW4vbWFya2VyLWFzc2lnbi1yZXBvcnQtdGFibGUnLFxyXG5cdFx0XHR0eXBlOidHRVQnLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cclxuXHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5hZGRDbGFzcygnYW5pbWF0ZWQgZmFkZUluVXAnKTtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmh0bWwocmVzcG9uc2UuaHRtbCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmFkZENsYXNzKCdlcnJvci1kaXNwbGF5Jyk7XHJcblx0XHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5odG1sKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZpZXdzL21hcmtlci1hc3NpZ24uanMiXSwic291cmNlUm9vdCI6IiJ9