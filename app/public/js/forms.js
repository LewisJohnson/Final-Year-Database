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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

$(function () {

	// Makes primary topic first
	$(".topics-list").prepend($(".first"));

	// Project Edit
	var addTopicInput = $("#addTopicInput");

	// LISTENERS
	addTopicInput.keypress(function (e) {
		if (e.which == 32) {
			addTopicAjax(addTopicInput.val());
		}
	});

	$('.topics-list.edit').on('click', '.topic .topic-remove', function () {
		var topicName = $(this).next().text();
		removeTopicAjax(topicName);
	});

	$('#newTopicInputContainer').on('click', function () {
		addTopicInput.focus();
	});

	$('.master-checkbox').on('click', function () {
		$(this).parent().parent().siblings().find(':checkbox').attr('checked', this.checked);
	});

	$('#deleteProjectButton').click(function () {
		deleteProjectAjax($('#title').val());
	});

	$('#search-filter-button').click(function () {
		var container = $('.search-filter-container');
		if (container.hasClass('active')) {
			$('.search-filter-container').removeClass('active');
			$('#search-filter-button').removeClass('active');
		} else {
			$('.search-filter-container').addClass('active');
			$('#search-filter-button').addClass('active');
		}
	});

	$('.search-input').on('focus', function (e) {
		$('.search-container').removeClass(function (index, className) {
			return (className.match(/\bshadow\-\S+/g) || []).join(' ');
		});
		$('.search-container').addClass('shadow-focus');
	});

	$('.search-input').on('focusout', function (e) {
		$('.search-container').removeClass(function (index, className) {
			return (className.match(/\bshadow\-\S+/g) || []).join(' ');
		});
		$('.search-container').addClass('shadow-2dp');
	});
});

$("#loginForm").on('submit', function (e) {
	e.preventDefault();

	$('.help-block', '#loginForm').css("display", "none");
	$('.form-field', this).css("display", "none");
	$('#login-loader').css("display", "block");

	$.ajax({
		url: $(this).attr('action'),
		type: 'POST',
		data: $(this).serialize(),
		success: function success(data) {
			$('#login-loader').css("display", "none");
			$('#loginForm').append(data);
		},
		error: function error(data) {
			$('.help-block', '#loginForm').css("display", "block");
			$('.help-block', '#loginForm').text(data["responseJSON"]["errors"]["username"][0]);

			$('.form-field', '#loginForm').css("display", "block");
			$('.form-field', '#loginForm').addClass("has-error");

			$('#login-loader').css("display", "none");
		}
	});
});

function addTopicAjax(topic) {
	$.ajax({
		type: "PUT",
		url: "edit/topic",
		data: { topic: topic },
		success: function success(newTopicName) {
			$("#addTopicInput").val('');
			$(".topics-list.edit li.topic:last").after('<li class="topic"><button type="button" class="topic-remove">X</button><p class="topic-name">' + newTopicName + '</p></li>');
		}
	}).done(function () {
		$('.loader').css("display", "none");
	});
}

function removeTopicAjax(topic) {
	$.ajax({
		type: "DELETE",
		url: "edit/topic",
		data: { topic: topic },
		success: function success(oldTopicName) {
			$('.topics-list.edit li.topic').each(function (i, obj) {
				if ($(this).find(".topic-name").text() == oldTopicName) {
					$(this).remove();
					return;
				}
			});
		}
	});
}

function deleteProjectAjax(projectName) {
	if (confirm("Are you sure you want to delete \"" + projectName + "\"?")) {
		$.ajax({
			type: "DELETE",
			url: "edit",
			success: function success(url) {
				window.location.href = "../";
			}
		});
	} else {
		return false;
	}
}

/***/ })
/******/ ]);