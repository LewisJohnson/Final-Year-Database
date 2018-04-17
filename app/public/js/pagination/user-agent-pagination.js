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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ({

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);


/***/ }),

/***/ 31:
/***/ (function(module, exports) {

/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

var agents_pageNumber = 2,
    agents_endOfTable = false,
    agents_awaitingResponse = false;

;$(function () {
	"use strict";

	$(window).scroll(function () {
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			if (!agents_endOfTable && !agents_awaitingResponse) {
				$(".loader.user-agent").show();
				agents_awaitingResponse = true;
				if ($('#show-fv-only').prop('checked')) {
					var ajaxUrl = "/system/user-agent?unique=1?page=" + agents_pageNumber;
				} else {
					var ajaxUrl = "/system/user-agent?page=" + agents_pageNumber;
				}
				$.ajax({
					type: 'GET',
					url: ajaxUrl,
					success: function success(data) {
						$(".loader.user-agent").hide();
						if (data.length == 0) {
							agents_endOfTable = true;
							$('#user-agent-table').after('<div style="width: 10px;height: 10px;margin: 1rem auto;background: rgba(0, 0, 0, 0.07);border: 1px solid rgba(0, 0, 0, 0.11);border-radius: 90px;"></div>');
						} else {
							$('#user-agent-table tbody').append($(data));
						}
						agents_pageNumber++;
					}
				}).done(function (data) {
					agents_awaitingResponse = false;
					$(".loader.user-agent").hide();
				});
			} else {
				$(".loader.user-agent").hide();
			}
		}
	});
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjcyZDhiMjNlYzM1OGU0YTYwOTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9keW5hbWljLXBhZ2luYXRpb24vdXNlci1hZ2VudC1wYWdpbmF0aW9uLmpzIl0sIm5hbWVzIjpbImFnZW50c19wYWdlTnVtYmVyIiwiYWdlbnRzX2VuZE9mVGFibGUiLCJhZ2VudHNfYXdhaXRpbmdSZXNwb25zZSIsIiQiLCJ3aW5kb3ciLCJzY3JvbGwiLCJzY3JvbGxUb3AiLCJoZWlnaHQiLCJkb2N1bWVudCIsInNob3ciLCJwcm9wIiwiYWpheFVybCIsImFqYXgiLCJ0eXBlIiwidXJsIiwic3VjY2VzcyIsImRhdGEiLCJoaWRlIiwibGVuZ3RoIiwiYWZ0ZXIiLCJhcHBlbmQiLCJkb25lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7OztBQU1BLElBQUlBLG9CQUFvQixDQUF4QjtBQUFBLElBQ0NDLG9CQUFvQixLQURyQjtBQUFBLElBRUNDLDBCQUEwQixLQUYzQjs7QUFJQSxDQUFDQyxFQUFFLFlBQVc7QUFDYjs7QUFFQUEsR0FBRUMsTUFBRixFQUFVQyxNQUFWLENBQWlCLFlBQVc7QUFDM0IsTUFBR0YsRUFBRUMsTUFBRixFQUFVRSxTQUFWLEtBQXdCSCxFQUFFQyxNQUFGLEVBQVVHLE1BQVYsRUFBeEIsR0FBNkNKLEVBQUVLLFFBQUYsRUFBWUQsTUFBWixLQUF1QixHQUF2RSxFQUE0RTtBQUMzRSxPQUFHLENBQUNOLGlCQUFELElBQXNCLENBQUNDLHVCQUExQixFQUFrRDtBQUNqREMsTUFBRSxvQkFBRixFQUF3Qk0sSUFBeEI7QUFDQVAsOEJBQTBCLElBQTFCO0FBQ0EsUUFBR0MsRUFBRSxlQUFGLEVBQW1CTyxJQUFuQixDQUF3QixTQUF4QixDQUFILEVBQXNDO0FBQ3JDLFNBQUlDLFVBQVUsc0NBQXNDWCxpQkFBcEQ7QUFDQSxLQUZELE1BRU87QUFDTixTQUFJVyxVQUFVLDZCQUE2QlgsaUJBQTNDO0FBQ0E7QUFDREcsTUFBRVMsSUFBRixDQUFPO0FBQ05DLFdBQU8sS0FERDtBQUVOQyxVQUFLSCxPQUZDO0FBR05JLGNBQVUsaUJBQVNDLElBQVQsRUFBYztBQUN2QmIsUUFBRSxvQkFBRixFQUF3QmMsSUFBeEI7QUFDQSxVQUFHRCxLQUFLRSxNQUFMLElBQWUsQ0FBbEIsRUFBb0I7QUFDbkJqQiwyQkFBb0IsSUFBcEI7QUFDQUUsU0FBRSxtQkFBRixFQUF1QmdCLEtBQXZCLENBQTZCLDJKQUE3QjtBQUNBLE9BSEQsTUFHSztBQUNKaEIsU0FBRSx5QkFBRixFQUE2QmlCLE1BQTdCLENBQW9DakIsRUFBRWEsSUFBRixDQUFwQztBQUNBO0FBQ0RoQjtBQUNBO0FBWkssS0FBUCxFQWFHcUIsSUFiSCxDQWFRLFVBQVNMLElBQVQsRUFBYztBQUNyQmQsK0JBQTBCLEtBQTFCO0FBQ0FDLE9BQUUsb0JBQUYsRUFBd0JjLElBQXhCO0FBQ0EsS0FoQkQ7QUFpQkEsSUF6QkQsTUF5Qk87QUFDTmQsTUFBRSxvQkFBRixFQUF3QmMsSUFBeEI7QUFDQTtBQUNEO0FBQ0QsRUEvQkQ7QUFnQ0EsQ0FuQ0EsRSIsImZpbGUiOiJcXGpzXFxwYWdpbmF0aW9uXFx1c2VyLWFnZW50LXBhZ2luYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjcyZDhiMjNlYzM1OGU0YTYwOTEiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxudmFyIGFnZW50c19wYWdlTnVtYmVyID0gMixcclxuXHRhZ2VudHNfZW5kT2ZUYWJsZSA9IGZhbHNlLFxyXG5cdGFnZW50c19hd2FpdGluZ1Jlc3BvbnNlID0gZmFsc2U7XHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSA+ICQoZG9jdW1lbnQpLmhlaWdodCgpIC0gMTAwKSB7XHJcblx0XHRcdGlmKCFhZ2VudHNfZW5kT2ZUYWJsZSAmJiAhYWdlbnRzX2F3YWl0aW5nUmVzcG9uc2Upe1xyXG5cdFx0XHRcdCQoXCIubG9hZGVyLnVzZXItYWdlbnRcIikuc2hvdygpO1xyXG5cdFx0XHRcdGFnZW50c19hd2FpdGluZ1Jlc3BvbnNlID0gdHJ1ZTtcclxuXHRcdFx0XHRpZigkKCcjc2hvdy1mdi1vbmx5JykucHJvcCgnY2hlY2tlZCcpKXtcclxuXHRcdFx0XHRcdHZhciBhamF4VXJsID0gXCIvc3lzdGVtL3VzZXItYWdlbnQ/dW5pcXVlPTE/cGFnZT1cIiArIGFnZW50c19wYWdlTnVtYmVyO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YXIgYWpheFVybCA9IFwiL3N5c3RlbS91c2VyLWFnZW50P3BhZ2U9XCIgKyBhZ2VudHNfcGFnZU51bWJlcjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdHR5cGUgOiAnR0VUJyxcclxuXHRcdFx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0XHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0JChcIi5sb2FkZXIudXNlci1hZ2VudFwiKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdGlmKGRhdGEubGVuZ3RoID09IDApe1xyXG5cdFx0XHRcdFx0XHRcdGFnZW50c19lbmRPZlRhYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjdXNlci1hZ2VudC10YWJsZScpLmFmdGVyKCc8ZGl2IHN0eWxlPVwid2lkdGg6IDEwcHg7aGVpZ2h0OiAxMHB4O21hcmdpbjogMXJlbSBhdXRvO2JhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wNyk7Ym9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjExKTtib3JkZXItcmFkaXVzOiA5MHB4O1wiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHQkKCcjdXNlci1hZ2VudC10YWJsZSB0Ym9keScpLmFwcGVuZCgkKGRhdGEpKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRhZ2VudHNfcGFnZU51bWJlcisrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRhZ2VudHNfYXdhaXRpbmdSZXNwb25zZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0JChcIi5sb2FkZXIudXNlci1hZ2VudFwiKS5oaWRlKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JChcIi5sb2FkZXIudXNlci1hZ2VudFwiKS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9keW5hbWljLXBhZ2luYXRpb24vdXNlci1hZ2VudC1wYWdpbmF0aW9uLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==