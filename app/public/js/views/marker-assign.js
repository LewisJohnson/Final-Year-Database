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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzAwMjM4ZjRiZDU4ZWExZjBiMDUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9tYXJrZXItYXNzaWduLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4IiwidXJsIiwidHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsImFkZENsYXNzIiwic3VjY2Vzc2Z1bCIsImh0bWwiLCJtZXNzYWdlIiwiaGlkZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2hvdyIsInRleHQiLCJwcm9wIiwiZGF0YSIsInNlcmlhbGl6ZSIsIkpTT04iLCJwYXJzZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFNQSxDQUFDQSxFQUFFLFlBQVc7QUFDYjs7QUFFQTs7QUFDQUEsR0FBRUMsSUFBRixDQUFPO0FBQ05DLE9BQUssc0NBREM7QUFFTkMsUUFBSyxLQUZDO0FBR05DLFdBQVEsaUJBQVNDLFFBQVQsRUFBa0I7QUFDekJMLEtBQUUsc0NBQUYsRUFBMENNLFFBQTFDLENBQW1ELG1CQUFuRDtBQUNBLE9BQUdELFNBQVNFLFVBQVosRUFBdUI7QUFDdEJQLE1BQUUsc0NBQUYsRUFBMENRLElBQTFDLENBQStDSCxTQUFTRyxJQUF4RDtBQUNBLElBRkQsTUFFTztBQUNOUixNQUFFLHNDQUFGLEVBQTBDTSxRQUExQyxDQUFtRCxlQUFuRDtBQUNBTixNQUFFLHNDQUFGLEVBQTBDUSxJQUExQyxDQUErQ0gsU0FBU0ksT0FBeEQ7QUFDQTs7QUFFRFQsS0FBRSwrQ0FBRixFQUFtRFUsSUFBbkQ7QUFDQTtBQWJLLEVBQVA7O0FBZ0JBVixHQUFFLE1BQUYsRUFBVVcsRUFBVixDQUFhLFFBQWIsRUFBdUIseUJBQXZCLEVBQW1ELFVBQVNDLENBQVQsRUFBWTtBQUM5REEsSUFBRUMsY0FBRjs7QUFFQWIsSUFBRSwrQ0FBRixFQUFtRGMsSUFBbkQ7QUFDQWQsSUFBRSxpREFBRixFQUFxRGUsSUFBckQsQ0FBMEQseUNBQTFEOztBQUVBZixJQUFFQyxJQUFGLENBQU87QUFDTkMsUUFBS0YsRUFBRSxJQUFGLEVBQVFnQixJQUFSLENBQWEsUUFBYixDQURDO0FBRU5iLFNBQUssTUFGQztBQUdOYyxTQUFNakIsRUFBRSxJQUFGLEVBQVFrQixTQUFSLEVBSEE7QUFJTmQsWUFBUSxpQkFBU0MsUUFBVCxFQUFrQjtBQUN6QkEsZUFBV2MsS0FBS0MsS0FBTCxDQUFXZixRQUFYLENBQVg7O0FBRUFMLE1BQUUsc0NBQUYsRUFBMENNLFFBQTFDLENBQW1ELG1CQUFuRDtBQUNBLFFBQUdELFNBQVNFLFVBQVosRUFBdUI7QUFDdEJQLE9BQUUsc0NBQUYsRUFBMENRLElBQTFDLENBQStDSCxTQUFTRyxJQUF4RDtBQUNBLEtBRkQsTUFFTztBQUNOUixPQUFFLHNDQUFGLEVBQTBDTSxRQUExQyxDQUFtRCxlQUFuRDtBQUNBTixPQUFFLHNDQUFGLEVBQTBDUSxJQUExQyxDQUErQ0gsU0FBU0ksT0FBeEQ7QUFDQTs7QUFFRFQsTUFBRSwrQ0FBRixFQUFtRFUsSUFBbkQ7QUFDQTtBQWhCSyxHQUFQO0FBa0JBLEVBeEJEOztBQTBCQVYsR0FBRSxNQUFGLEVBQVVXLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGtCQUF0QixFQUEyQyxVQUFTQyxDQUFULEVBQVk7QUFDdERBLElBQUVDLGNBQUY7O0FBRUFiLElBQUUsK0NBQUYsRUFBbURjLElBQW5EO0FBQ0FkLElBQUUsaURBQUYsRUFBcURlLElBQXJELENBQTBELGdDQUExRDs7QUFFQWYsSUFBRUMsSUFBRixDQUFPO0FBQ05DLFFBQUssbUNBREM7QUFFTkMsU0FBSyxLQUZDO0FBR05DLFlBQVEsaUJBQVNDLFFBQVQsRUFBa0I7QUFDekJBLGVBQVdjLEtBQUtDLEtBQUwsQ0FBV2YsUUFBWCxDQUFYOztBQUVBTCxNQUFFLHNDQUFGLEVBQTBDTSxRQUExQyxDQUFtRCxtQkFBbkQ7QUFDQSxRQUFHRCxTQUFTRSxVQUFaLEVBQXVCO0FBQ3RCUCxPQUFFLHNDQUFGLEVBQTBDUSxJQUExQyxDQUErQ0gsU0FBU0csSUFBeEQ7QUFDQSxLQUZELE1BRU87QUFDTlIsT0FBRSxzQ0FBRixFQUEwQ00sUUFBMUMsQ0FBbUQsZUFBbkQ7QUFDQU4sT0FBRSxzQ0FBRixFQUEwQ1EsSUFBMUMsQ0FBK0NILFNBQVNJLE9BQXhEO0FBQ0E7O0FBRURULE1BQUUsK0NBQUYsRUFBbURVLElBQW5EO0FBQ0E7QUFmSyxHQUFQO0FBaUJBLEVBdkJEO0FBd0JBLENBdEVBLEUiLCJmaWxlIjoiXFxqc1xcdmlld3NcXG1hcmtlci1hc3NpZ24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzAwMjM4ZjRiZDU4ZWExZjBiMDUiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxuOyQoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdC8vIEdldCBoZWxwIGZvb3RlciBzbmlwcGV0IHVzaW5nIGFqYXhcclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAnL2FkbWluL21hcmtlci1hc3NpZ24tYXV0b21hdGljLXRhYmxlJyxcclxuXHRcdHR5cGU6J0dFVCcsXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5jb250ZW50JykuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJblVwJyk7XHJcblx0XHRcdGlmKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpe1xyXG5cdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmh0bWwocmVzcG9uc2UuaHRtbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5jb250ZW50JykuYWRkQ2xhc3MoJ2Vycm9yLWRpc3BsYXknKTtcclxuXHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5odG1sKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmxvYWRlci1jb250YWluZXInKS5oaWRlKCk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcInN1Ym1pdFwiLCBcIiNjYWxjdWxhdGVTZWNvbmRNYXJrZXJzXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyJykuc2hvdygpO1xyXG5cdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyIHAnKS50ZXh0KCdBc3NpZ25pbmcgc2Vjb25kIG1hcmtlcnMgdG8gc3R1ZGVudHMuLi4nKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cclxuXHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5hZGRDbGFzcygnYW5pbWF0ZWQgZmFkZUluVXAnKTtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmh0bWwocmVzcG9uc2UuaHRtbCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmFkZENsYXNzKCdlcnJvci1kaXNwbGF5Jyk7XHJcblx0XHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5odG1sKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIjc2hvd1JlcG9ydFRhYmxlXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyJykuc2hvdygpO1xyXG5cdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyIHAnKS50ZXh0KCdHZXR0aW5nIHNlY29uZCBtYXJrZXIgdGFibGUuLi4nKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICcvYWRtaW4vbWFya2VyLWFzc2lnbi1yZXBvcnQtdGFibGUnLFxyXG5cdFx0XHR0eXBlOidHRVQnLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cclxuXHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5hZGRDbGFzcygnYW5pbWF0ZWQgZmFkZUluVXAnKTtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmh0bWwocmVzcG9uc2UuaHRtbCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQoJyNhdXRvbWF0aWMtYXNzaWduLWNvbnRhaW5lciAuY29udGVudCcpLmFkZENsYXNzKCdlcnJvci1kaXNwbGF5Jyk7XHJcblx0XHRcdFx0XHQkKCcjYXV0b21hdGljLWFzc2lnbi1jb250YWluZXIgLmNvbnRlbnQnKS5odG1sKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JCgnI2F1dG9tYXRpYy1hc3NpZ24tY29udGFpbmVyIC5sb2FkZXItY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZpZXdzL21hcmtlci1hc3NpZ24uanMiXSwic291cmNlUm9vdCI6IiJ9