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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ({

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(29);


/***/ }),

/***/ 29:
/***/ (function(module, exports) {

/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

;$(function () {
	"use strict";

	var projects_pageNumber = 2,
	    projects_endOfTable = false,
	    projects_awaitingResponse = false;

	$(window).scroll(function () {
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			if (!projects_endOfTable && !projects_awaitingResponse) {
				$(".loader.projects").show();
				projects_awaitingResponse = true;
				var ajaxUrl = "/projects?page=" + projects_pageNumber;
				$.ajax({
					type: 'GET',
					url: ajaxUrl,
					success: function success(data) {
						$(".loader.projects").hide();
						if (data.length == 0) {
							projects_endOfTable = true;
							$('#project-table').after('<div style="width: 10px;height: 10px;margin: 1rem auto;background: rgba(0, 0, 0, 0.07);border: 1px solid rgba(0, 0, 0, 0.11);border-radius: 90px;"></div>');
						} else {
							$('#project-table tbody').append($(data));
							window["ColumnToggleTable"].prototype.functions.refreshAll();
						}
						projects_pageNumber++;
					}
				}).done(function (data) {
					projects_awaitingResponse = false;
					$(".loader.projects").hide();
				});
			}
			if (projects_endOfTable) {
				$(".loader.projects").hide();
			}
		}
	});
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDNkZThiN2E4MjJkNzkzNzkyM2UiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9keW5hbWljLXBhZ2luYXRpb24vcHJvamVjdHMtcGFnaW5hdGlvbi5qcyJdLCJuYW1lcyI6WyIkIiwicHJvamVjdHNfcGFnZU51bWJlciIsInByb2plY3RzX2VuZE9mVGFibGUiLCJwcm9qZWN0c19hd2FpdGluZ1Jlc3BvbnNlIiwid2luZG93Iiwic2Nyb2xsIiwic2Nyb2xsVG9wIiwiaGVpZ2h0IiwiZG9jdW1lbnQiLCJzaG93IiwiYWpheFVybCIsImFqYXgiLCJ0eXBlIiwidXJsIiwic3VjY2VzcyIsImRhdGEiLCJoaWRlIiwibGVuZ3RoIiwiYWZ0ZXIiLCJhcHBlbmQiLCJwcm90b3R5cGUiLCJmdW5jdGlvbnMiLCJyZWZyZXNoQWxsIiwiZG9uZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFNQSxDQUFDQSxFQUFFLFlBQVc7QUFDYjs7QUFFRCxLQUFJQyxzQkFBc0IsQ0FBMUI7QUFBQSxLQUNDQyxzQkFBc0IsS0FEdkI7QUFBQSxLQUVDQyw0QkFBNEIsS0FGN0I7O0FBS0NILEdBQUVJLE1BQUYsRUFBVUMsTUFBVixDQUFpQixZQUFXO0FBQzNCLE1BQUdMLEVBQUVJLE1BQUYsRUFBVUUsU0FBVixLQUF3Qk4sRUFBRUksTUFBRixFQUFVRyxNQUFWLEVBQXhCLEdBQTZDUCxFQUFFUSxRQUFGLEVBQVlELE1BQVosS0FBdUIsR0FBdkUsRUFBNEU7QUFDM0UsT0FBRyxDQUFDTCxtQkFBRCxJQUF3QixDQUFDQyx5QkFBNUIsRUFBc0Q7QUFDckRILE1BQUUsa0JBQUYsRUFBc0JTLElBQXRCO0FBQ0FOLGdDQUE0QixJQUE1QjtBQUNBLFFBQUlPLFVBQVUsb0JBQW9CVCxtQkFBbEM7QUFDQUQsTUFBRVcsSUFBRixDQUFPO0FBQ05DLFdBQU8sS0FERDtBQUVOQyxVQUFLSCxPQUZDO0FBR05JLGNBQVUsaUJBQVNDLElBQVQsRUFBYztBQUN2QmYsUUFBRSxrQkFBRixFQUFzQmdCLElBQXRCO0FBQ0EsVUFBR0QsS0FBS0UsTUFBTCxJQUFlLENBQWxCLEVBQW9CO0FBQ25CZiw2QkFBc0IsSUFBdEI7QUFDQUYsU0FBRSxnQkFBRixFQUFvQmtCLEtBQXBCLENBQTBCLDJKQUExQjtBQUNBLE9BSEQsTUFHSztBQUNKbEIsU0FBRSxzQkFBRixFQUEwQm1CLE1BQTFCLENBQWlDbkIsRUFBRWUsSUFBRixDQUFqQztBQUNBWCxjQUFPLG1CQUFQLEVBQTRCZ0IsU0FBNUIsQ0FBc0NDLFNBQXRDLENBQWdEQyxVQUFoRDtBQUNBO0FBQ0RyQjtBQUNBO0FBYkssS0FBUCxFQWNHc0IsSUFkSCxDQWNRLFVBQVNSLElBQVQsRUFBYztBQUNyQlosaUNBQTRCLEtBQTVCO0FBQ0FILE9BQUUsa0JBQUYsRUFBc0JnQixJQUF0QjtBQUNBLEtBakJEO0FBa0JBO0FBQ0QsT0FBR2QsbUJBQUgsRUFBdUI7QUFDdEJGLE1BQUUsa0JBQUYsRUFBc0JnQixJQUF0QjtBQUNBO0FBQ0Q7QUFDRCxFQTdCRDtBQThCQSxDQXRDQSxFIiwiZmlsZSI6IlxcanNcXHBhZ2luYXRpb25cXHByb2plY3RzLXBhZ2luYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDNkZThiN2E4MjJkNzkzNzkyM2UiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxuOyQoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgcHJvamVjdHNfcGFnZU51bWJlciA9IDIsXHJcblx0cHJvamVjdHNfZW5kT2ZUYWJsZSA9IGZhbHNlLFxyXG5cdHByb2plY3RzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHJcblxyXG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCkgPiAkKGRvY3VtZW50KS5oZWlnaHQoKSAtIDEwMCkge1xyXG5cdFx0XHRpZighcHJvamVjdHNfZW5kT2ZUYWJsZSAmJiAhcHJvamVjdHNfYXdhaXRpbmdSZXNwb25zZSl7XHJcblx0XHRcdFx0JChcIi5sb2FkZXIucHJvamVjdHNcIikuc2hvdygpO1xyXG5cdFx0XHRcdHByb2plY3RzX2F3YWl0aW5nUmVzcG9uc2UgPSB0cnVlO1xyXG5cdFx0XHRcdHZhciBhamF4VXJsID0gXCIvcHJvamVjdHM/cGFnZT1cIiArIHByb2plY3RzX3BhZ2VOdW1iZXI7XHJcblx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdHR5cGUgOiAnR0VUJyxcclxuXHRcdFx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0XHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0JChcIi5sb2FkZXIucHJvamVjdHNcIikuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRpZihkYXRhLmxlbmd0aCA9PSAwKXtcclxuXHRcdFx0XHRcdFx0XHRwcm9qZWN0c19lbmRPZlRhYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHQkKCcjcHJvamVjdC10YWJsZScpLmFmdGVyKCc8ZGl2IHN0eWxlPVwid2lkdGg6IDEwcHg7aGVpZ2h0OiAxMHB4O21hcmdpbjogMXJlbSBhdXRvO2JhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wNyk7Ym9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjExKTtib3JkZXItcmFkaXVzOiA5MHB4O1wiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHQkKCcjcHJvamVjdC10YWJsZSB0Ym9keScpLmFwcGVuZCgkKGRhdGEpKTtcclxuXHRcdFx0XHRcdFx0XHR3aW5kb3dbXCJDb2x1bW5Ub2dnbGVUYWJsZVwiXS5wcm90b3R5cGUuZnVuY3Rpb25zLnJlZnJlc2hBbGwoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRwcm9qZWN0c19wYWdlTnVtYmVyKys7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdHByb2plY3RzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCQoXCIubG9hZGVyLnByb2plY3RzXCIpLmhpZGUoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihwcm9qZWN0c19lbmRPZlRhYmxlKXtcclxuXHRcdFx0XHQkKFwiLmxvYWRlci5wcm9qZWN0c1wiKS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9keW5hbWljLXBhZ2luYXRpb24vcHJvamVjdHMtcGFnaW5hdGlvbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=