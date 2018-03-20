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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shopify_draggable_lib_swappable__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shopify_draggable_lib_swappable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shopify_draggable_lib_swappable__);
/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */



;$(function () {
	"use strict";

	/* =================================
 	4.4 Project Topics [Supervisor]
    ================================= */

	/**
 * Class constructor for project topics.
 *
 * @param {HTMLElement} element The element that will be upgraded.
 */

	var ProjectTopics = function ProjectTopics() {};
	window["ProjectTopics"] = ProjectTopics;

	ProjectTopics.prototype.CssClasses_ = {
		DATA_TABLE: 'data-table',
		IS_SELECTED: 'is-selected'
	};

	ProjectTopics.prototype.Selectors_ = {
		ADD_TOPIC_INPUT: '#addTopicInput',
		NEW_TOPIC_INPUT_CONTAINER: '#new-topic-input-container'
	};

	ProjectTopics.prototype.Keys_ = {
		SPACE: 32,
		ENTER: 13,
		COMMA: 45
	};

	var projectTopics = new ProjectTopics();

	ProjectTopics.prototype.functions = {
		addTopicToProject: function addTopicToProject(projectId, topicName) {
			$('.loader').show(0);
			var ajaxUrl = "/projects/topic-add";
			$.ajax({
				type: "POST",
				url: ajaxUrl,
				data: {
					topic_name: topicName,
					project_id: projectId
				},
				success: function success(response) {
					$(projectTopics.Selectors_.ADD_TOPIC_INPUT).val('');

					if ($(".topics-list.edit li.topic:last").length > 0) {
						$(".topics-list.edit li.topic:last").after('<li class="topic" data-topic-id="' + response["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + response["name"] + '</p></li>');
					} else {
						$(".topics-list.edit").prepend('<li class="topic first" data-topic-id="' + response["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + response["name"] + '</p></li>');
					}
				}
			}).done(function (response) {
				$('body').append(response);
				$('.loader').hide(0);
			});
		},

		removeTopicFromProject: function removeTopicFromProject(projectId, topicId) {
			$(".loader").show(0);
			var ajaxUrl = "/projects/topic-remove";
			$.ajax({
				type: "DELETE",
				url: ajaxUrl,
				data: {
					topic_id: topicId,
					project_id: projectId
				},
				success: function success() {
					$(".topics-list.edit li.topic").each(function (i, obj) {
						if ($(this).data("topic-id") == topicId) {
							$(this).remove();
						}
					});
				}
			}).done(function () {
				$(".loader").hide(0);
			});
		},

		updateProjectPrimaryTopic: function updateProjectPrimaryTopic(projectId, topicId) {
			$(".loader").show(0);
			var ajaxUrl = "/projects/topic-update-primary";
			$.ajax({
				type: "PATCH",
				url: ajaxUrl,
				data: {
					topic_id: topicId,
					project_id: projectId
				},
				success: function success() {
					$("#editProjectForm").attr("data-project-id", topicId);
					$(".topics-list.edit li.topic").each(function (i, obj) {
						if ($(this).data("topic-id") == topicId) {
							$(this).addClass("first");
						} else {
							$(this).removeClass("first");
						}
					});
				}
			}).done(function () {
				$(".loader").hide(0);
			});
		}
	};

	var swappable = new __WEBPACK_IMPORTED_MODULE_0__shopify_draggable_lib_swappable___default.a(document.querySelectorAll(".topics-list.edit"), {
		draggable: ".topic"
	});

	window["swappable"] = swappable;

	swappable.on('swappable:swapped', function () {
		var projectId = $('#editProjectForm').data('project-id');
		var originalPrimaryTopicId = $('#editProjectForm').data('primary-topic-id');
		var topicId = $(".topics-list.edit li:first-child").data('topic-id');

		if (topicId != originalPrimaryTopicId) {
			projectTopics.functions.updateProjectPrimaryTopic(projectId, topicId);
		}
	});

	// Add new topic
	$(projectTopics.Selectors_.ADD_TOPIC_INPUT).keypress(function (e) {
		if (e.which == projectTopics.Keys_.ENTER) {
			var projectId = $("#editProjectForm").data('project-id');
			projectTopics.functions.addTopicToProject(projectId, $(this).val());
		}
	});

	// Remove topic
	$('.topics-list.edit').on('click', '.topic .topic-remove', function () {
		var projectId = $("#editProjectForm").data('project-id');
		var topicId = $(this).parent('li').data('topic-id');
		projectTopics.functions.removeTopicFromProject(projectId, topicId);
	});

	$(projectTopics.Selectors_.NEW_TOPIC_INPUT_CONTAINER).on('click', function () {
		$(projectTopics.Selectors_.ADD_TOPIC_INPUT).focus();
	});

	/* ========
 	OTHER
 =========== */
	$('.supervisor-table').on('click', '.offer-action', function () {
		var actionButton = $(this);
		var actionType = actionButton.data('action-type');
		var tableRow = actionButton.parents().eq(1);

		actionButton.html('<div class="loader"></div>');
		$('.loader', actionButton).css('display', 'block');

		if (actionType === "accept") {
			var ajaxUrl = '/supervisor/student-accept';
		} else if (actionType === "reject") {
			var ajaxUrl = '/supervisor/student-reject';
		}

		if (ajaxUrl == null) {
			console.error("Invalid supervisor action.");
			return;
		}

		$.ajax({
			method: 'POST',
			url: ajaxUrl,
			data: {
				project_id: tableRow.data('project-id'),
				student_id: tableRow.data('student-id')
			},
			success: function success(response) {
				if (response.successful) {
					tableRow.hide(400, function () {
						tableRow.remove();
					});

					if (actionType === "accept") {
						showNotification('success', 'Student has been accepted.');
						updateAcceptedStudentsTable();
					} else if (actionType === "reject") {
						showNotification('', 'Student has been rejected.');
					}
				} else {
					showNotification('error', response.message);
					actionButton.html(actionType);
				}
			}
		});
	});

	$('.supervisor-table').on('submit', 'form.delete-project', function (e) {
		e.preventDefault();
		var form = $(this);
		var projectName = form.data('project-title');

		$.confirm({
			title: 'Delete',
			type: 'red',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement: false,
			content: 'Are you sure you want to delete <b>' + projectName + '</b>?',
			buttons: {
				confirm: {
					btnClass: 'btn-red',
					action: function action() {
						$.ajax({
							url: form.prop('action'),
							type: 'DELETE',
							success: function success(row) {
								form.parent().parent().replaceWith(row);
							}
						});
					}
				},
				cancel: {}
			}
		});
	});

	$('.supervisor-table').on('submit', 'form.restore-project', function (e) {
		e.preventDefault();
		var form = $(this);
		var projectName = form.data('project-title');

		$.confirm({
			title: 'Restore',
			type: 'green',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3M12,8V13L16.28,15.54L17,14.33L13.5,12.25V8H12Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement: false,
			content: 'Are you sure you want to restore <b>' + projectName + '</b>?',
			buttons: {
				confirm: {
					btnClass: 'btn-green',
					action: function action() {
						$.ajax({
							url: form.prop('action'),
							type: 'PATCH',
							success: function success(row) {
								form.parent().parent().replaceWith(row);
							}
						});
					}
				},
				cancel: {}
			}
		});
	});

	$('.expand').on('click', function (e) {
		var content = $(this).parents().eq(1).find('.content');

		if (content.attr("aria-expanded") == "true") {
			$(this).parent().removeClass("active");
			$(this).find("svg").css("transform", "rotateZ(0deg)");
			content.hide(200);
			content.attr("aria-expanded", "false");
			setCookie(content.data("cookie-name"), true, 365);
		} else {
			$(this).parent().addClass("active");
			$(this).find("svg").css("transform", "rotateZ(180deg)");
			content.show(200);
			content.attr("aria-expanded", "true");
			setCookie(content.data("cookie-name"), false, 365);
		}
	});

	$('#supervisor-accepted-students-table').on('click', '.supervisor-undo-accept', function (e) {
		var tableRow = $(this);
		var studentName = tableRow.data('student-name');
		var projectTitle = tableRow.data('project-title');

		$.confirm({
			title: 'Undo Project Selection',
			type: 'red',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement: false,
			content: 'Are you sure you want to un-accept <b>' + studentName + '</b> for <b>' + projectTitle + '</b> ?',
			buttons: {
				confirm: {
					btnClass: 'btn-red',
					action: function action() {
						$.ajax({
							method: 'PATCH',
							url: '/supervisor/student-undo',
							data: {
								project_id: tableRow.data('project-id'),
								student_id: tableRow.data('student-id')
							},
							success: function success(response) {
								if (response.successful) {
									tableRow.hide(400, function () {
										tableRow.remove();
									});
									showNotification('success', 'Undo successful.');
									updateAcceptedStudentsTable();
								} else {
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

	function updateAcceptedStudentsTable() {
		$.ajax({
			method: 'GET',
			url: '/supervisor/accepted-students-table',
			success: function success(data) {
				$("#supervisor-accepted-students-table").html(data);
			}
		});
	}
});

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Swappable", [], factory);
	else if(typeof exports === 'object')
		exports["Swappable"] = factory();
	else
		root["Swappable"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(62);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(45);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(89);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(93);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(45);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(33)('wks');
var uid = __webpack_require__(22);
var Symbol = __webpack_require__(6).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(43);
var toPrimitive = __webpack_require__(25);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(4);
var ctx = __webpack_require__(24);
var hide = __webpack_require__(12);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(71);
var defined = __webpack_require__(27);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(16);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractEvent = __webpack_require__(96);

var _AbstractEvent2 = _interopRequireDefault(_AbstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AbstractEvent2.default;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closest = undefined;

var _closest = __webpack_require__(117);

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.closest = _closest2.default;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sensor = __webpack_require__(130);

var _Sensor2 = _interopRequireDefault(_Sensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Sensor2.default;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SensorEvent = __webpack_require__(133);

Object.keys(_SensorEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SensorEvent[key];
    }
  });
});

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractPlugin = __webpack_require__(112);

var _AbstractPlugin2 = _interopRequireDefault(_AbstractPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AbstractPlugin2.default;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(65);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(13);
var dPs = __webpack_require__(70);
var enumBugKeys = __webpack_require__(34);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(44)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(74).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(49);
var enumBugKeys = __webpack_require__(34);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(33)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(10);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(27);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(28);
var wksExt = __webpack_require__(37);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(39);
var createDesc = __webpack_require__(16);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(25);
var has = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(43);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(119);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SwappableEvent = __webpack_require__(61);

Object.keys(_SwappableEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SwappableEvent[key];
    }
  });
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(15)(function () {
  return Object.defineProperty(__webpack_require__(44)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(66);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(79);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(68)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(47)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(28);
var $export = __webpack_require__(8);
var redefine = __webpack_require__(48);
var hide = __webpack_require__(12);
var has = __webpack_require__(10);
var Iterators = __webpack_require__(17);
var $iterCreate = __webpack_require__(69);
var setToStringTag = __webpack_require__(35);
var getPrototypeOf = __webpack_require__(51);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(10);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(72)(false);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(10);
var toObject = __webpack_require__(36);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(49);
var hiddenKeys = __webpack_require__(34).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(8);
var core = __webpack_require__(4);
var fails = __webpack_require__(15);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragEvent = __webpack_require__(106);

Object.keys(_DragEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DragEvent[key];
    }
  });
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DraggableEvent = __webpack_require__(107);

Object.keys(_DraggableEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DraggableEvent[key];
    }
  });
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MirrorEvent = __webpack_require__(108);

Object.keys(_MirrorEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MirrorEvent[key];
    }
  });
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mirror = __webpack_require__(109);

Object.defineProperty(exports, 'Mirror', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Mirror).default;
  }
});
Object.defineProperty(exports, 'defaultMirrorOptions', {
  enumerable: true,
  get: function get() {
    return _Mirror.defaultOptions;
  }
});

var _Announcement = __webpack_require__(113);

Object.defineProperty(exports, 'Announcement', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Announcement).default;
  }
});
Object.defineProperty(exports, 'defaultAnnouncementOptions', {
  enumerable: true,
  get: function get() {
    return _Announcement.defaultOptions;
  }
});

var _Scrollable = __webpack_require__(115);

Object.defineProperty(exports, 'Scrollable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Scrollable).default;
  }
});
Object.defineProperty(exports, 'defaultScrollableOptions', {
  enumerable: true,
  get: function get() {
    return _Scrollable.defaultOptions;
  }
});

var _Accessibility = __webpack_require__(128);

Object.defineProperty(exports, 'Accessibility', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Accessibility).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sensor = __webpack_require__(20);

Object.defineProperty(exports, 'Sensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Sensor).default;
  }
});

var _MouseSensor = __webpack_require__(131);

Object.defineProperty(exports, 'MouseSensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MouseSensor).default;
  }
});

var _TouchSensor = __webpack_require__(134);

Object.defineProperty(exports, 'TouchSensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TouchSensor).default;
  }
});

var _DragSensor = __webpack_require__(136);

Object.defineProperty(exports, 'DragSensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DragSensor).default;
  }
});

var _ForceTouchSensor = __webpack_require__(138);

Object.defineProperty(exports, 'ForceTouchSensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ForceTouchSensor).default;
  }
});

var _SensorEvent = __webpack_require__(21);

Object.keys(_SensorEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SensorEvent[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SwappableEvent = __webpack_require__(42);

Object.keys(_SwappableEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SwappableEvent[key];
    }
  });
});

var _Swappable = __webpack_require__(97);

var _Swappable2 = _interopRequireDefault(_Swappable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Swappable2.default;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwappableStopEvent = exports.SwappableSwappedEvent = exports.SwappableSwapEvent = exports.SwappableStartEvent = exports.SwappableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(18);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base swappable event
 * @class SwappableEvent
 * @module SwappableEvent
 * @extends AbstractEvent
 */
var SwappableEvent = exports.SwappableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(SwappableEvent, _AbstractEvent);

  function SwappableEvent() {
    (0, _classCallCheck3.default)(this, SwappableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SwappableEvent.__proto__ || Object.getPrototypeOf(SwappableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SwappableEvent, [{
    key: 'dragEvent',


    /**
     * Original drag event that triggered this swappable event
     * @property dragEvent
     * @type {DragEvent}
     * @readonly
     */
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return SwappableEvent;
}(_AbstractEvent3.default);

/**
 * Swappable start event
 * @class SwappableStartEvent
 * @module SwappableStartEvent
 * @extends SwappableEvent
 */


SwappableEvent.type = 'swappable';

var SwappableStartEvent = exports.SwappableStartEvent = function (_SwappableEvent) {
  (0, _inherits3.default)(SwappableStartEvent, _SwappableEvent);

  function SwappableStartEvent() {
    (0, _classCallCheck3.default)(this, SwappableStartEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SwappableStartEvent.__proto__ || Object.getPrototypeOf(SwappableStartEvent)).apply(this, arguments));
  }

  return SwappableStartEvent;
}(SwappableEvent);

/**
 * Swappable swap event
 * @class SwappableSwapEvent
 * @module SwappableSwapEvent
 * @extends SwappableEvent
 */


SwappableStartEvent.type = 'swappable:start';
SwappableStartEvent.cancelable = true;

var SwappableSwapEvent = exports.SwappableSwapEvent = function (_SwappableEvent2) {
  (0, _inherits3.default)(SwappableSwapEvent, _SwappableEvent2);

  function SwappableSwapEvent() {
    (0, _classCallCheck3.default)(this, SwappableSwapEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SwappableSwapEvent.__proto__ || Object.getPrototypeOf(SwappableSwapEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SwappableSwapEvent, [{
    key: 'over',


    /**
     * Draggable element you are over
     * @property over
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.over;
    }

    /**
     * Draggable container you are over
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'overContainer',
    get: function get() {
      return this.data.overContainer;
    }
  }]);
  return SwappableSwapEvent;
}(SwappableEvent);

/**
 * Swappable swapped event
 * @class SwappableSwappedEvent
 * @module SwappableSwappedEvent
 * @extends SwappableEvent
 */


SwappableSwapEvent.type = 'swappable:swap';
SwappableSwapEvent.cancelable = true;

var SwappableSwappedEvent = exports.SwappableSwappedEvent = function (_SwappableEvent3) {
  (0, _inherits3.default)(SwappableSwappedEvent, _SwappableEvent3);

  function SwappableSwappedEvent() {
    (0, _classCallCheck3.default)(this, SwappableSwappedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SwappableSwappedEvent.__proto__ || Object.getPrototypeOf(SwappableSwappedEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SwappableSwappedEvent, [{
    key: 'swappedElement',


    /**
     * The draggable element that you swapped with
     * @property swappedElement
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.swappedElement;
    }
  }]);
  return SwappableSwappedEvent;
}(SwappableEvent);

/**
 * Swappable stop event
 * @class SwappableStopEvent
 * @module SwappableStopEvent
 * @extends SwappableEvent
 */


SwappableSwappedEvent.type = 'swappable:swapped';

var SwappableStopEvent = exports.SwappableStopEvent = function (_SwappableEvent4) {
  (0, _inherits3.default)(SwappableStopEvent, _SwappableEvent4);

  function SwappableStopEvent() {
    (0, _classCallCheck3.default)(this, SwappableStopEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SwappableStopEvent.__proto__ || Object.getPrototypeOf(SwappableStopEvent)).apply(this, arguments));
  }

  return SwappableStopEvent;
}(SwappableEvent);

SwappableStopEvent.type = 'swappable:stop';

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(46);
__webpack_require__(75);
module.exports = __webpack_require__(37).f('iterator');


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(29);
var descriptor = __webpack_require__(16);
var setToStringTag = __webpack_require__(35);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(13);
var getKeys = __webpack_require__(30);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(31);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(50);
var toAbsoluteIndex = __webpack_require__(73);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(6).document;
module.exports = document && document.documentElement;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
var global = __webpack_require__(6);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(17);
var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(77);
var step = __webpack_require__(78);
var Iterators = __webpack_require__(17);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(47)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(81);
__webpack_require__(86);
__webpack_require__(87);
__webpack_require__(88);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(6);
var has = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(9);
var $export = __webpack_require__(8);
var redefine = __webpack_require__(48);
var META = __webpack_require__(82).KEY;
var $fails = __webpack_require__(15);
var shared = __webpack_require__(33);
var setToStringTag = __webpack_require__(35);
var uid = __webpack_require__(22);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(37);
var wksDefine = __webpack_require__(38);
var enumKeys = __webpack_require__(83);
var isArray = __webpack_require__(84);
var anObject = __webpack_require__(13);
var isObject = __webpack_require__(14);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(25);
var createDesc = __webpack_require__(16);
var _create = __webpack_require__(29);
var gOPNExt = __webpack_require__(85);
var $GOPD = __webpack_require__(40);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(30);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(53).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(39).f = $propertyIsEnumerable;
  __webpack_require__(52).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(28)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(14);
var has = __webpack_require__(10);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(15)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(30);
var gOPS = __webpack_require__(52);
var pIE = __webpack_require__(39);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(31);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(53).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 86 */
/***/ (function(module, exports) {



/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('asyncIterator');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('observable');


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
module.exports = __webpack_require__(4).Object.setPrototypeOf;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(8);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(92).set });


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(14);
var anObject = __webpack_require__(13);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(24)(Function.call, __webpack_require__(40).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
var $Object = __webpack_require__(4).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(29) });


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _canceled = Symbol('canceled');

/**
 * All events fired by draggable inherit this class. You can call `cancel()` to
 * cancel a specific event or you can check if an event has been canceled by
 * calling `canceled()`.
 * @abstract
 * @class AbstractEvent
 * @module AbstractEvent
 */

var AbstractEvent = function () {

  /**
   * AbstractEvent constructor.
   * @constructs AbstractEvent
   * @param {object} data - Event data
   */


  /**
   * Event type
   * @static
   * @abstract
   * @property type
   * @type {String}
   */
  function AbstractEvent(data) {
    (0, _classCallCheck3.default)(this, AbstractEvent);

    this[_canceled] = false;
    this.data = data;
  }

  /**
   * Read-only type
   * @abstract
   * @return {String}
   */


  /**
   * Event cancelable
   * @static
   * @abstract
   * @property cancelable
   * @type {Boolean}
   */


  (0, _createClass3.default)(AbstractEvent, [{
    key: 'cancel',


    /**
     * Cancels the event instance
     * @abstract
     */
    value: function cancel() {
      this[_canceled] = true;
    }

    /**
     * Check if event has been canceled
     * @abstract
     * @return {Boolean}
     */

  }, {
    key: 'canceled',
    value: function canceled() {
      return Boolean(this[_canceled]);
    }
  }, {
    key: 'type',
    get: function get() {
      return this.constructor.type;
    }

    /**
     * Read-only cancelable
     * @abstract
     * @return {Boolean}
     */

  }, {
    key: 'cancelable',
    get: function get() {
      return this.constructor.cancelable;
    }
  }]);
  return AbstractEvent;
}();

AbstractEvent.type = 'event';
AbstractEvent.cancelable = false;
exports.default = AbstractEvent;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(98);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Draggable2 = __webpack_require__(105);

var _Draggable3 = _interopRequireDefault(_Draggable2);

var _SwappableEvent = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = Symbol('onDragStart');
var onDragOver = Symbol('onDragOver');
var onDragStop = Symbol('onDragStop');

/**
 * Returns an announcement message when the Draggable element is swapped with another draggable element
 * @param {SwappableSwappedEvent} swappableEvent
 * @return {String}
 */
function onSwappableSwappedDefaultAnnouncement(_ref) {
  var dragEvent = _ref.dragEvent,
      swappedElement = _ref.swappedElement;

  var sourceText = dragEvent.source.textContent.trim() || dragEvent.source.id || 'swappable element';
  var overText = swappedElement.textContent.trim() || swappedElement.id || 'swappable element';

  return 'Swapped ' + sourceText + ' with ' + overText;
}

/**
 * @const {Object} defaultAnnouncements
 * @const {Function} defaultAnnouncements['swappabled:swapped']
 */
var defaultAnnouncements = {
  'swappabled:swapped': onSwappableSwappedDefaultAnnouncement
};

/**
 * Swappable is built on top of Draggable and allows swapping of draggable elements.
 * Order is irrelevant to Swappable.
 * @class Swappable
 * @module Swappable
 * @extends Draggable
 */

var Swappable = function (_Draggable) {
  (0, _inherits3.default)(Swappable, _Draggable);

  /**
   * Swappable constructor.
   * @constructs Swappable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Swappable containers
   * @param {Object} options - Options for Swappable
   */
  function Swappable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Swappable);

    /**
     * Last draggable element that was dragged over
     * @property lastOver
     * @type {HTMLElement}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Swappable.__proto__ || Object.getPrototypeOf(Swappable)).call(this, containers, Object.assign({}, options, {
      announcements: Object.assign({}, defaultAnnouncements, options.announcements || {})
    })));

    _this.lastOver = null;

    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragOver] = _this[onDragOver].bind(_this);
    _this[onDragStop] = _this[onDragStop].bind(_this);

    _this.on('drag:start', _this[onDragStart]).on('drag:over', _this[onDragOver]).on('drag:stop', _this[onDragStop]);
    return _this;
  }

  /**
   * Destroys Swappable instance.
   */


  (0, _createClass3.default)(Swappable, [{
    key: 'destroy',
    value: function destroy() {
      (0, _get3.default)(Swappable.prototype.__proto__ || Object.getPrototypeOf(Swappable.prototype), 'destroy', this).call(this);

      this.off('drag:start', this._onDragStart).off('drag:over', this._onDragOver).off('drag:stop', this._onDragStop);
    }

    /**
     * Drag start handler
     * @private
     * @param {DragStartEvent} event - Drag start event
     */

  }, {
    key: onDragStart,
    value: function value(event) {
      var swappableStartEvent = new _SwappableEvent.SwappableStartEvent({
        dragEvent: event
      });

      this.trigger(swappableStartEvent);

      if (swappableStartEvent.canceled()) {
        event.cancel();
      }
    }

    /**
     * Drag over handler
     * @private
     * @param {DragOverEvent} event - Drag over event
     */

  }, {
    key: onDragOver,
    value: function value(event) {
      if (event.over === event.originalSource || event.over === event.source || event.canceled()) {
        return;
      }

      var swappableSwapEvent = new _SwappableEvent.SwappableSwapEvent({
        dragEvent: event,
        over: event.over,
        overContainer: event.overContainer
      });

      this.trigger(swappableSwapEvent);

      if (swappableSwapEvent.canceled()) {
        return;
      }

      // swap originally swapped element back
      if (this.lastOver && this.lastOver !== event.over) {
        swap(this.lastOver, event.source);
      }

      if (this.lastOver === event.over) {
        this.lastOver = null;
      } else {
        this.lastOver = event.over;
      }

      swap(event.source, event.over);

      var swappableSwappedEvent = new _SwappableEvent.SwappableSwappedEvent({
        dragEvent: event,
        swappedElement: event.over
      });

      this.trigger(swappableSwappedEvent);
    }

    /**
     * Drag stop handler
     * @private
     * @param {DragStopEvent} event - Drag stop event
     */

  }, {
    key: onDragStop,
    value: function value(event) {
      var swappableStopEvent = new _SwappableEvent.SwappableStopEvent({
        dragEvent: event
      });

      this.trigger(swappableStopEvent);
      this.lastOver = null;
    }
  }]);
  return Swappable;
}(_Draggable3.default);

exports.default = Swappable;


function withTempElement(callback) {
  var tmpElement = document.createElement('div');
  callback(tmpElement);
  tmpElement.parentNode.removeChild(tmpElement);
}

function swap(source, over) {
  var overParent = over.parentNode;
  var sourceParent = source.parentNode;

  withTempElement(function (tmpElement) {
    sourceParent.insertBefore(tmpElement, source);
    overParent.insertBefore(source, over);
    sourceParent.insertBefore(over, tmpElement);
  });
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(99);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(102);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101);
module.exports = __webpack_require__(4).Object.getPrototypeOf;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(36);
var $getPrototypeOf = __webpack_require__(51);

__webpack_require__(54)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
var $Object = __webpack_require__(4).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(11);
var $getOwnPropertyDescriptor = __webpack_require__(40).f;

__webpack_require__(54)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragEvent = __webpack_require__(55);

Object.keys(_DragEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DragEvent[key];
    }
  });
});

var _DraggableEvent = __webpack_require__(56);

Object.keys(_DraggableEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DraggableEvent[key];
    }
  });
});

var _MirrorEvent = __webpack_require__(57);

Object.keys(_MirrorEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MirrorEvent[key];
    }
  });
});

var _Plugins = __webpack_require__(58);

Object.keys(_Plugins).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Plugins[key];
    }
  });
});

var _Sensors = __webpack_require__(59);

Object.keys(_Sensors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Sensors[key];
    }
  });
});

var _Draggable = __webpack_require__(140);

var _Draggable2 = _interopRequireDefault(_Draggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Draggable2.default;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragStopEvent = exports.DragPressureEvent = exports.DragOutContainerEvent = exports.DragOverContainerEvent = exports.DragOutEvent = exports.DragOverEvent = exports.DragMoveEvent = exports.DragStartEvent = exports.DragEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(18);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base drag event
 * @class DragEvent
 * @module DragEvent
 * @extends AbstractEvent
 */
var DragEvent = exports.DragEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(DragEvent, _AbstractEvent);

  function DragEvent() {
    (0, _classCallCheck3.default)(this, DragEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragEvent.__proto__ || Object.getPrototypeOf(DragEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragEvent, [{
    key: 'hasMirror',


    /**
     * Checks if mirror has been created
     * @return {Boolean}
     */
    value: function hasMirror() {
      return Boolean(this.mirror);
    }
  }, {
    key: 'source',


    /**
     * Draggables source element
     * @property source
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.source;
    }

    /**
     * Draggables original source element
     * @property originalSource
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'originalSource',
    get: function get() {
      return this.data.originalSource;
    }

    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'mirror',
    get: function get() {
      return this.data.mirror;
    }

    /**
     * Draggables source container element
     * @property sourceContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'sourceContainer',
    get: function get() {
      return this.data.sourceContainer;
    }

    /**
     * Sensor event
     * @property sensorEvent
     * @type {SensorEvent}
     * @readonly
     */

  }, {
    key: 'sensorEvent',
    get: function get() {
      return this.data.sensorEvent;
    }

    /**
     * Original event that triggered sensor event
     * @property originalEvent
     * @type {Event}
     * @readonly
     */

  }, {
    key: 'originalEvent',
    get: function get() {
      if (this.sensorEvent) {
        return this.sensorEvent.originalEvent;
      }

      return null;
    }
  }]);
  return DragEvent;
}(_AbstractEvent3.default);

/**
 * Drag start event
 * @class DragStartEvent
 * @module DragStartEvent
 * @extends DragEvent
 */


DragEvent.type = 'drag';

var DragStartEvent = exports.DragStartEvent = function (_DragEvent) {
  (0, _inherits3.default)(DragStartEvent, _DragEvent);

  function DragStartEvent() {
    (0, _classCallCheck3.default)(this, DragStartEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStartEvent.__proto__ || Object.getPrototypeOf(DragStartEvent)).apply(this, arguments));
  }

  return DragStartEvent;
}(DragEvent);

/**
 * Drag move event
 * @class DragMoveEvent
 * @module DragMoveEvent
 * @extends DragEvent
 */


DragStartEvent.type = 'drag:start';
DragStartEvent.cancelable = true;

var DragMoveEvent = exports.DragMoveEvent = function (_DragEvent2) {
  (0, _inherits3.default)(DragMoveEvent, _DragEvent2);

  function DragMoveEvent() {
    (0, _classCallCheck3.default)(this, DragMoveEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragMoveEvent.__proto__ || Object.getPrototypeOf(DragMoveEvent)).apply(this, arguments));
  }

  return DragMoveEvent;
}(DragEvent);

/**
 * Drag over event
 * @class DragOverEvent
 * @module DragOverEvent
 * @extends DragEvent
 */


DragMoveEvent.type = 'drag:move';

var DragOverEvent = exports.DragOverEvent = function (_DragEvent3) {
  (0, _inherits3.default)(DragOverEvent, _DragEvent3);

  function DragOverEvent() {
    (0, _classCallCheck3.default)(this, DragOverEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOverEvent.__proto__ || Object.getPrototypeOf(DragOverEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOverEvent, [{
    key: 'overContainer',


    /**
     * Draggable container you are over
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.overContainer;
    }

    /**
     * Draggable element you are over
     * @property over
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'over',
    get: function get() {
      return this.data.over;
    }
  }]);
  return DragOverEvent;
}(DragEvent);

/**
 * Drag out event
 * @class DragOutEvent
 * @module DragOutEvent
 * @extends DragEvent
 */


DragOverEvent.type = 'drag:over';
DragOverEvent.cancelable = true;

var DragOutEvent = exports.DragOutEvent = function (_DragEvent4) {
  (0, _inherits3.default)(DragOutEvent, _DragEvent4);

  function DragOutEvent() {
    (0, _classCallCheck3.default)(this, DragOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOutEvent.__proto__ || Object.getPrototypeOf(DragOutEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOutEvent, [{
    key: 'overContainer',


    /**
     * Draggable container you are over
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.overContainer;
    }

    /**
     * Draggable element you left
     * @property over
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'over',
    get: function get() {
      return this.data.over;
    }
  }]);
  return DragOutEvent;
}(DragEvent);

/**
 * Drag over container event
 * @class DragOverContainerEvent
 * @module DragOverContainerEvent
 * @extends DragEvent
 */


DragOutEvent.type = 'drag:out';

var DragOverContainerEvent = exports.DragOverContainerEvent = function (_DragEvent5) {
  (0, _inherits3.default)(DragOverContainerEvent, _DragEvent5);

  function DragOverContainerEvent() {
    (0, _classCallCheck3.default)(this, DragOverContainerEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOverContainerEvent.__proto__ || Object.getPrototypeOf(DragOverContainerEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOverContainerEvent, [{
    key: 'overContainer',


    /**
     * Draggable container you are over
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.overContainer;
    }
  }]);
  return DragOverContainerEvent;
}(DragEvent);

/**
 * Drag out container event
 * @class DragOutContainerEvent
 * @module DragOutContainerEvent
 * @extends DragEvent
 */


DragOverContainerEvent.type = 'drag:over:container';

var DragOutContainerEvent = exports.DragOutContainerEvent = function (_DragEvent6) {
  (0, _inherits3.default)(DragOutContainerEvent, _DragEvent6);

  function DragOutContainerEvent() {
    (0, _classCallCheck3.default)(this, DragOutContainerEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOutContainerEvent.__proto__ || Object.getPrototypeOf(DragOutContainerEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOutContainerEvent, [{
    key: 'overContainer',


    /**
     * Draggable container you left
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.overContainer;
    }
  }]);
  return DragOutContainerEvent;
}(DragEvent);

/**
 * Drag pressure event
 * @class DragPressureEvent
 * @module DragPressureEvent
 * @extends DragEvent
 */


DragOutContainerEvent.type = 'drag:out:container';

var DragPressureEvent = exports.DragPressureEvent = function (_DragEvent7) {
  (0, _inherits3.default)(DragPressureEvent, _DragEvent7);

  function DragPressureEvent() {
    (0, _classCallCheck3.default)(this, DragPressureEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragPressureEvent.__proto__ || Object.getPrototypeOf(DragPressureEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragPressureEvent, [{
    key: 'pressure',


    /**
     * Pressure applied on draggable element
     * @property pressure
     * @type {Number}
     * @readonly
     */
    get: function get() {
      return this.data.pressure;
    }
  }]);
  return DragPressureEvent;
}(DragEvent);

/**
 * Drag stop event
 * @class DragStopEvent
 * @module DragStopEvent
 * @extends DragEvent
 */


DragPressureEvent.type = 'drag:pressure';

var DragStopEvent = exports.DragStopEvent = function (_DragEvent8) {
  (0, _inherits3.default)(DragStopEvent, _DragEvent8);

  function DragStopEvent() {
    (0, _classCallCheck3.default)(this, DragStopEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStopEvent.__proto__ || Object.getPrototypeOf(DragStopEvent)).apply(this, arguments));
  }

  return DragStopEvent;
}(DragEvent);

DragStopEvent.type = 'drag:stop';

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableDestroyEvent = exports.DraggableInitializedEvent = exports.DraggableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(18);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base draggable event
 * @class DraggableEvent
 * @module DraggableEvent
 * @extends AbstractEvent
 */
var DraggableEvent = exports.DraggableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(DraggableEvent, _AbstractEvent);

  function DraggableEvent() {
    (0, _classCallCheck3.default)(this, DraggableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DraggableEvent.__proto__ || Object.getPrototypeOf(DraggableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DraggableEvent, [{
    key: 'draggable',


    /**
     * Draggable instance
     * @property draggable
     * @type {Draggable}
     * @readonly
     */
    get: function get() {
      return this.data.draggable;
    }
  }]);
  return DraggableEvent;
}(_AbstractEvent3.default);

/**
 * Draggable initialized event
 * @class DraggableInitializedEvent
 * @module DraggableInitializedEvent
 * @extends DraggableEvent
 */


DraggableEvent.type = 'draggable';

var DraggableInitializedEvent = exports.DraggableInitializedEvent = function (_DraggableEvent) {
  (0, _inherits3.default)(DraggableInitializedEvent, _DraggableEvent);

  function DraggableInitializedEvent() {
    (0, _classCallCheck3.default)(this, DraggableInitializedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DraggableInitializedEvent.__proto__ || Object.getPrototypeOf(DraggableInitializedEvent)).apply(this, arguments));
  }

  return DraggableInitializedEvent;
}(DraggableEvent);

/**
 * Draggable destory event
 * @class DraggableInitializedEvent
 * @module DraggableDestroyEvent
 * @extends DraggableDestroyEvent
 */


DraggableInitializedEvent.type = 'draggable:initialize';

var DraggableDestroyEvent = exports.DraggableDestroyEvent = function (_DraggableEvent2) {
  (0, _inherits3.default)(DraggableDestroyEvent, _DraggableEvent2);

  function DraggableDestroyEvent() {
    (0, _classCallCheck3.default)(this, DraggableDestroyEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DraggableDestroyEvent.__proto__ || Object.getPrototypeOf(DraggableDestroyEvent)).apply(this, arguments));
  }

  return DraggableDestroyEvent;
}(DraggableEvent);

DraggableDestroyEvent.type = 'draggable:destroy';

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MirrorDestroyEvent = exports.MirrorMoveEvent = exports.MirrorAttachedEvent = exports.MirrorCreatedEvent = exports.MirrorCreateEvent = exports.MirrorEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(18);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base mirror event
 * @class MirrorEvent
 * @module MirrorEvent
 * @extends AbstractEvent
 */
var MirrorEvent = exports.MirrorEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(MirrorEvent, _AbstractEvent);

  function MirrorEvent() {
    (0, _classCallCheck3.default)(this, MirrorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorEvent.__proto__ || Object.getPrototypeOf(MirrorEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorEvent, [{
    key: 'hasMirror',


    /**
     * Checks if mirror has been created
     * @return {Boolean}
     */
    value: function hasMirror() {
      return Boolean(this.mirror);
    }
  }, {
    key: 'source',


    /**
     * Draggables source element
     * @property source
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.source;
    }

    /**
     * Draggables original source element
     * @property originalSource
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'originalSource',
    get: function get() {
      return this.data.originalSource;
    }

    /**
     * Draggables source container element
     * @property sourceContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'sourceContainer',
    get: function get() {
      return this.data.sourceContainer;
    }

    /**
     * Sensor event
     * @property sensorEvent
     * @type {SensorEvent}
     * @readonly
     */

  }, {
    key: 'sensorEvent',
    get: function get() {
      return this.data.sensorEvent;
    }

    /**
     * Original event that triggered sensor event
     * @property originalEvent
     * @type {Event}
     * @readonly
     */

  }, {
    key: 'originalEvent',
    get: function get() {
      if (this.sensorEvent) {
        return this.sensorEvent.originalEvent;
      }

      return null;
    }
  }]);
  return MirrorEvent;
}(_AbstractEvent3.default);

/**
 * Mirror create event
 * @class MirrorCreateEvent
 * @module MirrorCreateEvent
 * @extends MirrorEvent
 */


var MirrorCreateEvent = exports.MirrorCreateEvent = function (_MirrorEvent) {
  (0, _inherits3.default)(MirrorCreateEvent, _MirrorEvent);

  function MirrorCreateEvent() {
    (0, _classCallCheck3.default)(this, MirrorCreateEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorCreateEvent.__proto__ || Object.getPrototypeOf(MirrorCreateEvent)).apply(this, arguments));
  }

  return MirrorCreateEvent;
}(MirrorEvent);

/**
 * Mirror created event
 * @class MirrorCreatedEvent
 * @module MirrorCreatedEvent
 * @extends MirrorEvent
 */


MirrorCreateEvent.type = 'mirror:create';

var MirrorCreatedEvent = exports.MirrorCreatedEvent = function (_MirrorEvent2) {
  (0, _inherits3.default)(MirrorCreatedEvent, _MirrorEvent2);

  function MirrorCreatedEvent() {
    (0, _classCallCheck3.default)(this, MirrorCreatedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorCreatedEvent.__proto__ || Object.getPrototypeOf(MirrorCreatedEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorCreatedEvent, [{
    key: 'mirror',


    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.mirror;
    }
  }]);
  return MirrorCreatedEvent;
}(MirrorEvent);

/**
 * Mirror attached event
 * @class MirrorAttachedEvent
 * @module MirrorAttachedEvent
 * @extends MirrorEvent
 */


MirrorCreatedEvent.type = 'mirror:created';

var MirrorAttachedEvent = exports.MirrorAttachedEvent = function (_MirrorEvent3) {
  (0, _inherits3.default)(MirrorAttachedEvent, _MirrorEvent3);

  function MirrorAttachedEvent() {
    (0, _classCallCheck3.default)(this, MirrorAttachedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorAttachedEvent.__proto__ || Object.getPrototypeOf(MirrorAttachedEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorAttachedEvent, [{
    key: 'mirror',


    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.mirror;
    }
  }]);
  return MirrorAttachedEvent;
}(MirrorEvent);

/**
 * Mirror move event
 * @class MirrorMoveEvent
 * @module MirrorMoveEvent
 * @extends MirrorEvent
 */


MirrorAttachedEvent.type = 'mirror:attached';

var MirrorMoveEvent = exports.MirrorMoveEvent = function (_MirrorEvent4) {
  (0, _inherits3.default)(MirrorMoveEvent, _MirrorEvent4);

  function MirrorMoveEvent() {
    (0, _classCallCheck3.default)(this, MirrorMoveEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorMoveEvent.__proto__ || Object.getPrototypeOf(MirrorMoveEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorMoveEvent, [{
    key: 'mirror',


    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.mirror;
    }
  }]);
  return MirrorMoveEvent;
}(MirrorEvent);

/**
 * Mirror destroy event
 * @class MirrorDestroyEvent
 * @module MirrorDestroyEvent
 * @extends MirrorEvent
 */


MirrorMoveEvent.type = 'mirror:move';
MirrorMoveEvent.cancelable = true;

var MirrorDestroyEvent = exports.MirrorDestroyEvent = function (_MirrorEvent5) {
  (0, _inherits3.default)(MirrorDestroyEvent, _MirrorEvent5);

  function MirrorDestroyEvent() {
    (0, _classCallCheck3.default)(this, MirrorDestroyEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorDestroyEvent.__proto__ || Object.getPrototypeOf(MirrorDestroyEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorDestroyEvent, [{
    key: 'mirror',


    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.mirror;
    }
  }]);
  return MirrorDestroyEvent;
}(MirrorEvent);

MirrorDestroyEvent.type = 'mirror:destroy';
MirrorDestroyEvent.cancelable = true;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _Mirror = __webpack_require__(110);

var _Mirror2 = _interopRequireDefault(_Mirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Mirror2.default;
exports.defaultOptions = _Mirror.defaultOptions;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = exports.onScroll = exports.onMirrorMove = exports.onMirrorCreated = exports.onDragStop = exports.onDragStart = undefined;

var _objectWithoutProperties2 = __webpack_require__(111);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPlugin2 = __webpack_require__(23);

var _AbstractPlugin3 = _interopRequireDefault(_AbstractPlugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = exports.onDragStart = Symbol('onDragStart');
var onDragStop = exports.onDragStop = Symbol('onDragStop');
var onMirrorCreated = exports.onMirrorCreated = Symbol('onMirrorCreated');
var onMirrorMove = exports.onMirrorMove = Symbol('onMirrorMove');
var onScroll = exports.onScroll = Symbol('onScroll');

/**
 * Mirror default options
 * @property {Object} defaultOptions
 * @property {Boolean} defaultOptions.constrainDimensions
 * @property {Boolean} defaultOptions.xAxis
 * @property {Boolean} defaultOptions.yAxis
 * @property {null} defaultOptions.cursorOffsetX
 * @property {null} defaultOptions.cursorOffsetY
 * @type {Object}
 */
var defaultOptions = exports.defaultOptions = {
  constrainDimensions: false,
  xAxis: true,
  yAxis: true,
  cursorOffsetX: null,
  cursorOffsetY: null
};

/**
 * Mirror plugin which controls the mirror positioning while dragging
 * @class Mirror
 * @module Mirror
 * @extends AbstractPlugin
 */

var Mirror = function (_AbstractPlugin) {
  (0, _inherits3.default)(Mirror, _AbstractPlugin);

  /**
   * Mirror constructor.
   * @constructs Mirror
   * @param {Draggable} draggable - Draggable instance
   */
  function Mirror(draggable) {
    (0, _classCallCheck3.default)(this, Mirror);

    /**
     * Mirror options
     * @property {Object} options
     * @property {Boolean} options.constrainDimensions
     * @property {Boolean} options.xAxis
     * @property {Boolean} options.yAxis
     * @property {Number|null} options.cursorOffsetX
     * @property {Number|null} options.cursorOffsetY
     * @type {Object}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Mirror.__proto__ || Object.getPrototypeOf(Mirror)).call(this, draggable));

    _this.options = Object.assign({}, defaultOptions, _this.getOptions());

    /**
     * Scroll offset for touch devices because the mirror is positioned fixed
     * @property {Object} scrollOffset
     * @property {Number} scrollOffset.x
     * @property {Number} scrollOffset.y
     */
    _this.scrollOffset = { x: 0, y: 0 };

    /**
     * Initial scroll offset for touch devices because the mirror is positioned fixed
     * @property {Object} scrollOffset
     * @property {Number} scrollOffset.x
     * @property {Number} scrollOffset.y
     */
    _this.initialScrollOffset = {
      x: window.scrollX,
      y: window.scrollY
    };

    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragStop] = _this[onDragStop].bind(_this);
    _this[onMirrorCreated] = _this[onMirrorCreated].bind(_this);
    _this[onMirrorMove] = _this[onMirrorMove].bind(_this);
    _this[onScroll] = _this[onScroll].bind(_this);
    return _this;
  }

  /**
   * Attaches plugins event listeners
   */


  (0, _createClass3.default)(Mirror, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('drag:start', this[onDragStart]).on('drag:stop', this[onDragStop]).on('mirror:created', this[onMirrorCreated]).on('mirror:move', this[onMirrorMove]);
    }

    /**
     * Detaches plugins event listeners
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('drag:start', this[onDragStart]).off('drag:stop', this[onDragStop]).off('mirror:created', this[onMirrorCreated]).off('mirror:move', this[onMirrorMove]);
    }

    /**
     * Returns options passed through draggable
     * @return {Object}
     */

  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.draggable.options.mirror || {};
    }
  }, {
    key: onDragStart,
    value: function value() {
      if ('ontouchstart' in window) {
        document.addEventListener('scroll', this[onScroll], true);
      }

      this.initialScrollOffset = {
        x: window.scrollX,
        y: window.scrollY
      };
    }
  }, {
    key: onDragStop,
    value: function value() {
      if ('ontouchstart' in window) {
        document.removeEventListener('scroll', this[onScroll], true);
      }

      this.initialScrollOffset = { x: 0, y: 0 };
      this.scrollOffset = { x: 0, y: 0 };
    }
  }, {
    key: onScroll,
    value: function value() {
      this.scrollOffset = {
        x: window.scrollX - this.initialScrollOffset.x,
        y: window.scrollY - this.initialScrollOffset.y
      };
    }

    /**
     * Mirror created handler
     * @param {MirrorCreatedEvent} mirrorEvent
     * @return {Promise}
     * @private
     */

  }, {
    key: onMirrorCreated,
    value: function value(_ref) {
      var _this2 = this;

      var mirror = _ref.mirror,
          source = _ref.source,
          sensorEvent = _ref.sensorEvent;

      var mirrorClass = this.draggable.getClassNameFor('mirror');

      var setState = function setState(_ref2) {
        var mirrorOffset = _ref2.mirrorOffset,
            initialX = _ref2.initialX,
            initialY = _ref2.initialY,
            args = (0, _objectWithoutProperties3.default)(_ref2, ['mirrorOffset', 'initialX', 'initialY']);

        _this2.mirrorOffset = mirrorOffset;
        _this2.initialX = initialX;
        _this2.initialY = initialY;
        return Object.assign({ mirrorOffset: mirrorOffset, initialX: initialX, initialY: initialY }, args);
      };

      var initialState = {
        mirror: mirror,
        source: source,
        sensorEvent: sensorEvent,
        mirrorClass: mirrorClass,
        scrollOffset: this.scrollOffset,
        options: this.options
      };

      return Promise.resolve(initialState)
      // Fix reflow here
      .then(computeMirrorDimensions).then(calculateMirrorOffset).then(resetMirror).then(addMirrorClasses).then(positionMirror({ initial: true })).then(removeMirrorID).then(setState);
    }

    /**
     * Mirror move handler
     * @param {MirrorMoveEvent} mirrorEvent
     * @return {Promise}
     * @private
     */

  }, {
    key: onMirrorMove,
    value: function value(_ref3) {
      var mirror = _ref3.mirror,
          sensorEvent = _ref3.sensorEvent;

      var initialState = {
        mirror: mirror,
        sensorEvent: sensorEvent,
        mirrorOffset: this.mirrorOffset,
        options: this.options,
        initialX: this.initialX,
        initialY: this.initialY,
        scrollOffset: this.scrollOffset
      };

      return Promise.resolve(initialState).then(positionMirror({ raf: true }));
    }
  }]);
  return Mirror;
}(_AbstractPlugin3.default);

/**
 * Computes mirror dimensions based on the source element
 * Adds sourceRect to state
 * @param {Object} state
 * @param {HTMLElement} state.source
 * @return {Promise}
 * @private
 */


exports.default = Mirror;
function computeMirrorDimensions(_ref4) {
  var source = _ref4.source,
      args = (0, _objectWithoutProperties3.default)(_ref4, ['source']);

  return withPromise(function (resolve) {
    var sourceRect = source.getBoundingClientRect();
    resolve(Object.assign({ source: source, sourceRect: sourceRect }, args));
  });
}

/**
 * Calculates mirror offset
 * Adds mirrorOffset to state
 * @param {Object} state
 * @param {SensorEvent} state.sensorEvent
 * @param {DOMRect} state.sourceRect
 * @return {Promise}
 * @private
 */
function calculateMirrorOffset(_ref5) {
  var sensorEvent = _ref5.sensorEvent,
      sourceRect = _ref5.sourceRect,
      options = _ref5.options,
      args = (0, _objectWithoutProperties3.default)(_ref5, ['sensorEvent', 'sourceRect', 'options']);

  return withPromise(function (resolve) {
    var top = options.cursorOffsetY === null ? sensorEvent.clientY - sourceRect.top : options.cursorOffsetY;
    var left = options.cursorOffsetX === null ? sensorEvent.clientX - sourceRect.left : options.cursorOffsetX;

    var mirrorOffset = { top: top, left: left };

    resolve(Object.assign({ sensorEvent: sensorEvent, sourceRect: sourceRect, mirrorOffset: mirrorOffset, options: options }, args));
  });
}

/**
 * Applys mirror styles
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @param {HTMLElement} state.source
 * @param {Object} state.options
 * @return {Promise}
 * @private
 */
function resetMirror(_ref6) {
  var mirror = _ref6.mirror,
      source = _ref6.source,
      options = _ref6.options,
      args = (0, _objectWithoutProperties3.default)(_ref6, ['mirror', 'source', 'options']);

  return withPromise(function (resolve) {
    var offsetHeight = void 0;
    var offsetWidth = void 0;

    if (options.constrainDimensions) {
      var computedSourceStyles = getComputedStyle(source);
      offsetHeight = computedSourceStyles.getPropertyValue('height');
      offsetWidth = computedSourceStyles.getPropertyValue('width');
    }

    mirror.style.position = 'fixed';
    mirror.style.pointerEvents = 'none';
    mirror.style.top = 0;
    mirror.style.left = 0;
    mirror.style.margin = 0;

    if (options.constrainDimensions) {
      mirror.style.height = offsetHeight;
      mirror.style.width = offsetWidth;
    }

    resolve(Object.assign({ mirror: mirror, source: source, options: options }, args));
  });
}

/**
 * Applys mirror class on mirror element
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @param {String} state.mirrorClass
 * @return {Promise}
 * @private
 */
function addMirrorClasses(_ref7) {
  var mirror = _ref7.mirror,
      mirrorClass = _ref7.mirrorClass,
      args = (0, _objectWithoutProperties3.default)(_ref7, ['mirror', 'mirrorClass']);

  return withPromise(function (resolve) {
    mirror.classList.add(mirrorClass);
    resolve(Object.assign({ mirror: mirror, mirrorClass: mirrorClass }, args));
  });
}

/**
 * Removes source ID from cloned mirror element
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @return {Promise}
 * @private
 */
function removeMirrorID(_ref8) {
  var mirror = _ref8.mirror,
      args = (0, _objectWithoutProperties3.default)(_ref8, ['mirror']);

  return withPromise(function (resolve) {
    mirror.removeAttribute('id');
    delete mirror.id;
    resolve(Object.assign({ mirror: mirror }, args));
  });
}

/**
 * Positions mirror with translate3d
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @param {SensorEvent} state.sensorEvent
 * @param {Object} state.mirrorOffset
 * @param {Number} state.initialY
 * @param {Number} state.initialX
 * @param {Object} state.options
 * @return {Promise}
 * @private
 */
function positionMirror() {
  var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref9$withFrame = _ref9.withFrame,
      withFrame = _ref9$withFrame === undefined ? false : _ref9$withFrame,
      _ref9$initial = _ref9.initial,
      initial = _ref9$initial === undefined ? false : _ref9$initial;

  return function (_ref10) {
    var mirror = _ref10.mirror,
        sensorEvent = _ref10.sensorEvent,
        mirrorOffset = _ref10.mirrorOffset,
        initialY = _ref10.initialY,
        initialX = _ref10.initialX,
        scrollOffset = _ref10.scrollOffset,
        options = _ref10.options,
        args = (0, _objectWithoutProperties3.default)(_ref10, ['mirror', 'sensorEvent', 'mirrorOffset', 'initialY', 'initialX', 'scrollOffset', 'options']);

    return withPromise(function (resolve) {
      var result = Object.assign({
        mirror: mirror,
        sensorEvent: sensorEvent,
        mirrorOffset: mirrorOffset,
        options: options
      }, args);

      if (mirrorOffset) {
        var x = sensorEvent.clientX - mirrorOffset.left - scrollOffset.x;
        var y = sensorEvent.clientY - mirrorOffset.top - scrollOffset.y;

        if (options.xAxis && options.yAxis || initial) {
          mirror.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
        } else if (options.xAxis && !options.yAxis) {
          mirror.style.transform = 'translate3d(' + x + 'px, ' + initialY + 'px, 0)';
        } else if (options.yAxis && !options.xAxis) {
          mirror.style.transform = 'translate3d(' + initialX + 'px, ' + y + 'px, 0)';
        }

        if (initial) {
          result.initialX = x;
          result.initialY = y;
        }
      }

      resolve(result);
    }, { frame: withFrame });
  };
}

/**
 * Wraps functions in promise with potential animation frame option
 * @param {Function} callback
 * @param {Object} options
 * @param {Boolean} options.raf
 * @return {Promise}
 * @private
 */
function withPromise(callback) {
  var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref11$raf = _ref11.raf,
      raf = _ref11$raf === undefined ? false : _ref11$raf;

  return new Promise(function (resolve, reject) {
    if (raf) {
      requestAnimationFrame(function () {
        callback(resolve, reject);
      });
    } else {
      callback(resolve, reject);
    }
  });
}

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * All draggable plugins inherit from this class.
 * @abstract
 * @class AbstractPlugin
 * @module AbstractPlugin
 */
var AbstractPlugin = function () {

  /**
   * AbstractPlugin constructor.
   * @constructs AbstractPlugin
   * @param {Draggable} draggable - Draggable instance
   */
  function AbstractPlugin(draggable) {
    (0, _classCallCheck3.default)(this, AbstractPlugin);


    /**
     * Draggable instance
     * @property draggable
     * @type {Draggable}
     */
    this.draggable = draggable;
  }

  /**
   * Override to add listeners
   * @abstract
   */


  (0, _createClass3.default)(AbstractPlugin, [{
    key: 'attach',
    value: function attach() {
      throw new Error('Not Implemented');
    }

    /**
     * Override to remove listeners
     * @abstract
     */

  }, {
    key: 'detach',
    value: function detach() {
      throw new Error('Not Implemented');
    }
  }]);
  return AbstractPlugin;
}();

exports.default = AbstractPlugin;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _Announcement = __webpack_require__(114);

var _Announcement2 = _interopRequireDefault(_Announcement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Announcement2.default;
exports.defaultOptions = _Announcement.defaultOptions;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPlugin2 = __webpack_require__(23);

var _AbstractPlugin3 = _interopRequireDefault(_AbstractPlugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onInitialize = Symbol('onInitialize');
var onDestroy = Symbol('onDestroy');
var announceEvent = Symbol('announceEvent');
var announceMessage = Symbol('announceMessage');

var ARIA_RELEVANT = 'aria-relevant';
var ARIA_ATOMIC = 'aria-atomic';
var ARIA_LIVE = 'aria-live';
var ROLE = 'role';

/**
 * Announcement default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.expire
 * @type {Object}
 */
var defaultOptions = exports.defaultOptions = {
  expire: 7000
};

/**
 * Announcement plugin
 * @class Announcement
 * @module Announcement
 * @extends AbstractPlugin
 */

var Announcement = function (_AbstractPlugin) {
  (0, _inherits3.default)(Announcement, _AbstractPlugin);

  /**
   * Announcement constructor.
   * @constructs Announcement
   * @param {Draggable} draggable - Draggable instance
   */
  function Announcement(draggable) {
    (0, _classCallCheck3.default)(this, Announcement);

    /**
     * Plugin options
     * @property options
     * @type {Object}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Announcement.__proto__ || Object.getPrototypeOf(Announcement)).call(this, draggable));

    _this.options = Object.assign({}, defaultOptions, _this.getOptions());

    /**
     * Original draggable trigger method. Hack until we have onAll or on('all')
     * @property originalTriggerMethod
     * @type {Function}
     */
    _this.originalTriggerMethod = _this.draggable.trigger;

    _this[onInitialize] = _this[onInitialize].bind(_this);
    _this[onDestroy] = _this[onDestroy].bind(_this);
    return _this;
  }

  /**
   * Attaches listeners to draggable
   */


  (0, _createClass3.default)(Announcement, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('draggable:initialize', this[onInitialize]);
    }

    /**
     * Detaches listeners from draggable
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('draggable:destroy', this[onDestroy]);
    }

    /**
     * Returns passed in options
     */

  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.draggable.options.announcements || {};
    }

    /**
     * Announces event
     * @private
     * @param {AbstractEvent} event
     */

  }, {
    key: announceEvent,
    value: function value(event) {
      var message = this.options[event.type];

      if (message && typeof message === 'string') {
        this[announceMessage](message);
      }

      if (message && typeof message === 'function') {
        this[announceMessage](message(event));
      }
    }

    /**
     * Announces message to screen reader
     * @private
     * @param {String} message
     */

  }, {
    key: announceMessage,
    value: function value(message) {
      announce(message, { expire: this.options.expire });
    }

    /**
     * Initialize hander
     * @private
     */

  }, {
    key: onInitialize,
    value: function value() {
      var _this2 = this;

      // Hack until there is an api for listening for all events
      this.draggable.trigger = function (event) {
        try {
          _this2[announceEvent](event);
        } finally {
          // Ensure that original trigger is called
          _this2.originalTriggerMethod.call(_this2.draggable, event);
        }
      };
    }

    /**
     * Destroy hander
     * @private
     */

  }, {
    key: onDestroy,
    value: function value() {
      this.draggable.trigger = this.originalTriggerMethod;
    }
  }]);
  return Announcement;
}(_AbstractPlugin3.default);

/**
 * @const {HTMLElement} liveRegion
 */


exports.default = Announcement;
var liveRegion = createRegion();

/**
 * Announces message via live region
 * @param {String} message
 * @param {Object} options
 * @param {Number} options.expire
 */
function announce(message, _ref) {
  var expire = _ref.expire;

  var element = document.createElement('div');
  element.innerHTML = message;
  liveRegion.appendChild(element);
  return setTimeout(function () {
    liveRegion.removeChild(element);
  }, expire);
}

/**
 * Creates region element
 * @return {HTMLElement}
 */
function createRegion() {
  var element = document.createElement('div');

  element.setAttribute('id', 'draggable-live-region');
  element.setAttribute(ARIA_RELEVANT, 'additions');
  element.setAttribute(ARIA_ATOMIC, 'true');
  element.setAttribute(ARIA_LIVE, 'assertive');
  element.setAttribute(ROLE, 'log');

  element.style.position = 'fixed';
  element.style.width = '1px';
  element.style.height = '1px';
  element.style.top = '-1px';
  element.style.overflow = 'hidden';

  return element;
}

// Append live region element as early as possible
document.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(liveRegion);
});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _Scrollable = __webpack_require__(116);

var _Scrollable2 = _interopRequireDefault(_Scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Scrollable2.default;
exports.defaultOptions = _Scrollable.defaultOptions;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = exports.scroll = exports.onDragStop = exports.onDragMove = exports.onDragStart = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPlugin2 = __webpack_require__(23);

var _AbstractPlugin3 = _interopRequireDefault(_AbstractPlugin2);

var _utils = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = exports.onDragStart = Symbol('onDragStart');
var onDragMove = exports.onDragMove = Symbol('onDragMove');
var onDragStop = exports.onDragStop = Symbol('onDragStop');
var scroll = exports.scroll = Symbol('scroll');

/**
 * Scrollable default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.speed
 * @property {Number} defaultOptions.sensitivity
 * @property {HTMLElement[]} defaultOptions.scrollableElements
 * @type {Object}
 */
var defaultOptions = exports.defaultOptions = {
  speed: 10,
  sensitivity: 30,
  scrollableElements: []
};

/**
 * Scrollable plugin which scrolls the closest scrollable parent
 * @class Scrollable
 * @module Scrollable
 * @extends AbstractPlugin
 */

var Scrollable = function (_AbstractPlugin) {
  (0, _inherits3.default)(Scrollable, _AbstractPlugin);

  /**
   * Scrollable constructor.
   * @constructs Scrollable
   * @param {Draggable} draggable - Draggable instance
   */
  function Scrollable(draggable) {
    (0, _classCallCheck3.default)(this, Scrollable);

    /**
     * Scrollable options
     * @property {Object} options
     * @property {Number} options.speed
     * @property {Number} options.sensitivity
     * @property {HTMLElement[]} options.scrollableElements
     * @type {Object}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Scrollable.__proto__ || Object.getPrototypeOf(Scrollable)).call(this, draggable));

    _this.options = Object.assign({}, defaultOptions, _this.getOptions());

    /**
     * Keeps current mouse position
     * @property {Object} currentMousePosition
     * @property {Number} currentMousePosition.clientX
     * @property {Number} currentMousePosition.clientY
     * @type {Object|null}
     */
    _this.currentMousePosition = null;

    /**
     * Scroll animation frame
     * @property scrollAnimationFrame
     * @type {Number|null}
     */
    _this.scrollAnimationFrame = null;

    /**
     * Closest scrollable element
     * @property scrollableElement
     * @type {HTMLElement|null}
     */
    _this.scrollableElement = null;

    /**
     * Animation frame looking for the closest scrollable element
     * @property findScrollableElementFrame
     * @type {Number|null}
     */
    _this.findScrollableElementFrame = null;

    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragMove] = _this[onDragMove].bind(_this);
    _this[onDragStop] = _this[onDragStop].bind(_this);
    _this[scroll] = _this[scroll].bind(_this);
    return _this;
  }

  /**
   * Attaches plugins event listeners
   */


  (0, _createClass3.default)(Scrollable, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('drag:start', this[onDragStart]).on('drag:move', this[onDragMove]).on('drag:stop', this[onDragStop]);
    }

    /**
     * Detaches plugins event listeners
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('drag:start', this[onDragStart]).off('drag:move', this[onDragMove]).off('drag:stop', this[onDragStop]);
    }

    /**
     * Returns options passed through draggable
     * @return {Object}
     */

  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.draggable.options.scrollable || {};
    }

    /**
     * Returns closest scrollable elements by element
     * @param {HTMLElement} target
     * @return {HTMLElement}
     */

  }, {
    key: 'getScrollableElement',
    value: function getScrollableElement(target) {
      if (this.hasDefinedScrollableElements()) {
        return (0, _utils.closest)(target, this.options.scrollableElements) || document.documentElement;
      } else {
        return closestScrollableElement(target);
      }
    }

    /**
     * Returns true if at least one scrollable element have been defined via options
     * @param {HTMLElement} target
     * @return {Boolean}
     */

  }, {
    key: 'hasDefinedScrollableElements',
    value: function hasDefinedScrollableElements() {
      return Boolean(this.options.scrollableElements.length !== 0);
    }

    /**
     * Drag start handler. Finds closest scrollable parent in separate frame
     * @param {DragStartEvent} dragEvent
     * @private
     */

  }, {
    key: onDragStart,
    value: function value(dragEvent) {
      var _this2 = this;

      this.findScrollableElementFrame = requestAnimationFrame(function () {
        _this2.scrollableElement = _this2.getScrollableElement(dragEvent.source);
      });
    }

    /**
     * Drag move handler. Remembers mouse position and initiates scrolling
     * @param {DragMoveEvent} dragEvent
     * @private
     */

  }, {
    key: onDragMove,
    value: function value(dragEvent) {
      var _this3 = this;

      this.findScrollableElementFrame = requestAnimationFrame(function () {
        _this3.scrollableElement = _this3.getScrollableElement(dragEvent.sensorEvent.target);
      });

      if (!this.scrollableElement) {
        return;
      }

      var sensorEvent = dragEvent.sensorEvent;
      var scrollOffset = { x: 0, y: 0 };

      if ('ontouchstart' in window) {
        scrollOffset.y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        scrollOffset.x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      }

      this.currentMousePosition = {
        clientX: sensorEvent.clientX - scrollOffset.x,
        clientY: sensorEvent.clientY - scrollOffset.y
      };

      this.scrollAnimationFrame = requestAnimationFrame(this[scroll]);
    }

    /**
     * Drag stop handler. Cancels scroll animations and resets state
     * @private
     */

  }, {
    key: onDragStop,
    value: function value() {
      cancelAnimationFrame(this.scrollAnimationFrame);
      cancelAnimationFrame(this.findScrollableElementFrame);

      this.scrollableElement = null;
      this.scrollAnimationFrame = null;
      this.findScrollableElementFrame = null;
      this.currentMousePosition = null;
    }

    /**
     * Scroll function that does the heavylifting
     * @private
     */

  }, {
    key: scroll,
    value: function value() {
      if (!this.scrollableElement) {
        return;
      }

      cancelAnimationFrame(this.scrollAnimationFrame);

      var windowHeight = window.innerHeight;
      var windowWidth = window.innerWidth;
      var rect = this.scrollableElement.getBoundingClientRect();
      var right = rect.right,
          left = rect.left;

      var top = void 0;
      var bottom = void 0;

      if (rect.top < 0) {
        top = 0;
      } else {
        top = rect.top;
      }

      if (windowHeight < rect.bottom) {
        if (this.scrollableElement !== document.documentElement) {
          this.scrollableElement = this.getScrollableElement(this.scrollableElement.parentNode);
        }

        bottom = windowHeight;
      } else {
        bottom = rect.bottom;
      }

      var offsetY = (Math.abs(bottom - this.currentMousePosition.clientY) <= this.options.sensitivity) - (Math.abs(top - this.currentMousePosition.clientY) <= this.options.sensitivity);
      var offsetX = (Math.abs(right - this.currentMousePosition.clientX) <= this.options.sensitivity) - (Math.abs(left - this.currentMousePosition.clientX) <= this.options.sensitivity);

      if (!offsetX && !offsetY) {
        offsetX = (windowWidth - this.currentMousePosition.clientX <= this.options.sensitivity) - (this.currentMousePosition.clientX <= this.options.sensitivity);
        offsetY = (windowHeight - this.currentMousePosition.clientY <= this.options.sensitivity) - (this.currentMousePosition.clientY <= this.options.sensitivity);
      }

      this.scrollableElement.scrollTop += offsetY * this.options.speed;
      this.scrollableElement.scrollLeft += offsetX * this.options.speed;

      this.scrollAnimationFrame = requestAnimationFrame(this[scroll]);
    }
  }]);
  return Scrollable;
}(_AbstractPlugin3.default);

/**
 * Checks if element has overflow
 * @param {HTMLElement} element
 * @return {Boolean}
 * @private
 */


exports.default = Scrollable;
function hasOverflow(element) {
  var overflowRegex = /(auto|scroll)/;
  var computedStyles = getComputedStyle(element, null);

  var overflow = computedStyles.getPropertyValue('overflow') + computedStyles.getPropertyValue('overflow-y') + computedStyles.getPropertyValue('overflow-x');

  return overflowRegex.test(overflow);
}

/**
 * Finds closest scrollable element
 * @param {HTMLElement} element
 * @return {HTMLElement}
 * @private
 */
function closestScrollableElement(element) {
  var scrollableElement = (0, _utils.closest)(element, function (currentElement) {
    return hasOverflow(currentElement);
  });

  return scrollableElement || document.scrollingElement || document.documentElement || null;
}

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _closest = __webpack_require__(118);

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _closest2.default;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(41);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = closest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchFunction = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;

/**
 * Get the closest parent element of a given element that matches the given
 * selector string or matching function
 *
 * @param {Element} element The child element to find a parent of
 * @param {String|Function} selector The string or function to use to match
 *     the parent element
 * @return {Element|null}
 */
function closest(element, value) {
  if (!element) {
    return null;
  }

  var selector = value;
  var callback = value;
  var nodeList = value;
  var singleElement = value;

  var isSelector = Boolean(typeof value === 'string');
  var isFunction = Boolean(typeof value === 'function');
  var isNodeList = Boolean(value instanceof NodeList || value instanceof Array);
  var isElement = Boolean(value instanceof HTMLElement);

  function conditionFn(currentElement) {
    if (!currentElement) {
      return currentElement;
    } else if (isSelector) {
      return matchFunction.call(currentElement, selector);
    } else if (isNodeList) {
      return [].concat((0, _toConsumableArray3.default)(nodeList)).includes(currentElement);
    } else if (isElement) {
      return singleElement === currentElement;
    } else if (isFunction) {
      return callback(currentElement);
    } else {
      return null;
    }
  }

  var current = element;

  do {
    current = current.correspondingUseElement || current.correspondingElement || current;
    if (conditionFn(current)) {
      return current;
    }
    current = current.parentNode;
  } while (current && current !== document.body && current !== document);

  return null;
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(46);
__webpack_require__(121);
module.exports = __webpack_require__(4).Array.from;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(24);
var $export = __webpack_require__(8);
var toObject = __webpack_require__(36);
var call = __webpack_require__(122);
var isArrayIter = __webpack_require__(123);
var toLength = __webpack_require__(50);
var createProperty = __webpack_require__(124);
var getIterFn = __webpack_require__(125);

$export($export.S + $export.F * !__webpack_require__(127)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(13);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(17);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(16);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(126);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(17);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(31);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Accessibility = __webpack_require__(129);

var _Accessibility2 = _interopRequireDefault(_Accessibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Accessibility2.default;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPlugin2 = __webpack_require__(23);

var _AbstractPlugin3 = _interopRequireDefault(_AbstractPlugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ARIA_GRABBED = 'aria-grabbed';
var ARIA_DROPEFFECT = 'aria-dropeffect';
var TABINDEX = 'tabindex';

/**
 * __WIP__ Accessibility plugin
 * @class Accessibility
 * @module Accessibility
 * @extends AbstractPlugin
 */

var Accessibility = function (_AbstractPlugin) {
  (0, _inherits3.default)(Accessibility, _AbstractPlugin);

  /**
   * Accessibility constructor.
   * @constructs Accessibility
   * @param {Draggable} draggable - Draggable instance
   */
  function Accessibility(draggable) {
    (0, _classCallCheck3.default)(this, Accessibility);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Accessibility.__proto__ || Object.getPrototypeOf(Accessibility)).call(this, draggable));

    _this._onInit = _this._onInit.bind(_this);
    _this._onDestroy = _this._onDestroy.bind(_this);
    return _this;
  }

  /**
   * Attaches listeners to draggable
   */


  (0, _createClass3.default)(Accessibility, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('init', this._onInit).on('destroy', this._onDestroy).on('drag:start', _onDragStart).on('drag:stop', _onDragStop);
    }

    /**
     * Detaches listeners from draggable
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('init', this._onInit).off('destroy', this._onDestroy).off('drag:start', _onDragStart).off('drag:stop', _onDragStop);
    }

    /**
     * Intialize handler
     * @private
     * @param {Object} param
     * @param {HTMLElement[]} param.containers
     */

  }, {
    key: '_onInit',
    value: function _onInit(_ref) {
      var containers = _ref.containers;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var container = _step.value;

          container.setAttribute(ARIA_DROPEFFECT, this.draggable.options.type);

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = container.querySelectorAll(this.draggable.options.draggable)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var element = _step2.value;

              element.setAttribute(TABINDEX, 0);
              element.setAttribute(ARIA_GRABBED, false);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Destroy handler handler
     * @private
     * @param {Object} param
     * @param {HTMLElement[]} param.containers
     */

  }, {
    key: '_onDestroy',
    value: function _onDestroy(_ref2) {
      var containers = _ref2.containers;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = containers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var container = _step3.value;

          container.removeAttribute(ARIA_DROPEFFECT);

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = container.querySelectorAll(this.draggable.options.draggable)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var element = _step4.value;

              element.removeAttribute(TABINDEX, 0);
              element.removeAttribute(ARIA_GRABBED, false);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }]);
  return Accessibility;
}(_AbstractPlugin3.default);

exports.default = Accessibility;


function _onDragStart(_ref3) {
  var source = _ref3.source;

  source.setAttribute(ARIA_GRABBED, true);
}

function _onDragStop(_ref4) {
  var source = _ref4.source;

  source.setAttribute(ARIA_GRABBED, false);
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base sensor class. Extend from this class to create a new or custom sensor
 * @class Sensor
 * @module Sensor
 */
var Sensor = function () {

  /**
   * Sensor constructor.
   * @constructs Sensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function Sensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Sensor);


    /**
     * Current containers
     * @property containers
     * @type {HTMLElement[]}
     */
    this.containers = containers;

    /**
     * Current options
     * @property options
     * @type {Object}
     */
    this.options = Object.assign({}, options);

    /**
     * Current drag state
     * @property dragging
     * @type {Boolean}
     */
    this.dragging = false;

    /**
     * Current container
     * @property currentContainer
     * @type {HTMLElement}
     */
    this.currentContainer = null;
  }

  /**
   * Attaches sensors event listeners to the DOM
   * @return {Sensor}
   */


  (0, _createClass3.default)(Sensor, [{
    key: 'attach',
    value: function attach() {
      return this;
    }

    /**
     * Detaches sensors event listeners to the DOM
     * @return {Sensor}
     */

  }, {
    key: 'detach',
    value: function detach() {
      return this;
    }

    /**
     * Triggers event on target element
     * @param {HTMLElement} element - Element to trigger event on
     * @param {SensorEvent} sensorEvent - Sensor event to trigger
     */

  }, {
    key: 'trigger',
    value: function trigger(element, sensorEvent) {
      var event = document.createEvent('Event');
      event.detail = sensorEvent;
      event.initEvent(sensorEvent.type, true, true);
      element.dispatchEvent(event);
      this.lastEvent = sensorEvent;
      return sensorEvent;
    }
  }]);
  return Sensor;
}();

exports.default = Sensor;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MouseSensor = __webpack_require__(132);

var _MouseSensor2 = _interopRequireDefault(_MouseSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _MouseSensor2.default;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(19);

var _Sensor2 = __webpack_require__(20);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onContextMenuWhileDragging = Symbol('onContextMenuWhileDragging');
var onMouseDown = Symbol('onMouseDown');
var onMouseMove = Symbol('onMouseMove');
var onMouseUp = Symbol('onMouseUp');

/**
 * This sensor picks up native browser mouse events and dictates drag operations
 * @class MouseSensor
 * @module MouseSensor
 * @extends Sensor
 */

var MouseSensor = function (_Sensor) {
  (0, _inherits3.default)(MouseSensor, _Sensor);

  /**
   * MouseSensor constructor.
   * @constructs MouseSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function MouseSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, MouseSensor);

    /**
     * Indicates if mouse button is still down
     * @property mouseDown
     * @type {Boolean}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (MouseSensor.__proto__ || Object.getPrototypeOf(MouseSensor)).call(this, containers, options));

    _this.mouseDown = false;

    /**
     * Mouse down timer which will end up triggering the drag start operation
     * @property mouseDownTimeout
     * @type {Number}
     */
    _this.mouseDownTimeout = null;

    /**
     * Indicates if context menu has been opened during drag operation
     * @property openedContextMenu
     * @type {Boolean}
     */
    _this.openedContextMenu = false;

    _this[onContextMenuWhileDragging] = _this[onContextMenuWhileDragging].bind(_this);
    _this[onMouseDown] = _this[onMouseDown].bind(_this);
    _this[onMouseMove] = _this[onMouseMove].bind(_this);
    _this[onMouseUp] = _this[onMouseUp].bind(_this);
    return _this;
  }

  /**
   * Attaches sensors event listeners to the DOM
   */


  (0, _createClass3.default)(MouseSensor, [{
    key: 'attach',
    value: function attach() {
      document.addEventListener('mousedown', this[onMouseDown], true);
    }

    /**
     * Detaches sensors event listeners to the DOM
     */

  }, {
    key: 'detach',
    value: function detach() {
      document.removeEventListener('mousedown', this[onMouseDown], true);
    }

    /**
     * Mouse down handler
     * @private
     * @param {Event} event - Mouse down event
     */

  }, {
    key: onMouseDown,
    value: function value(event) {
      var _this2 = this;

      if (event.button !== 0 || event.ctrlKey || event.metaKey) {
        return;
      }

      document.addEventListener('mouseup', this[onMouseUp]);
      document.addEventListener('dragstart', preventNativeDragStart);

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = (0, _utils.closest)(target, this.containers);

      if (!container) {
        return;
      }

      this.mouseDown = true;

      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = setTimeout(function () {
        if (!_this2.mouseDown) {
          return;
        }

        var dragStartEvent = new _SensorEvent.DragStartSensorEvent({
          clientX: event.clientX,
          clientY: event.clientY,
          target: target,
          container: container,
          originalEvent: event
        });

        _this2.trigger(container, dragStartEvent);

        _this2.currentContainer = container;
        _this2.dragging = !dragStartEvent.canceled();

        if (_this2.dragging) {
          document.addEventListener('contextmenu', _this2[onContextMenuWhileDragging]);
          document.addEventListener('mousemove', _this2[onMouseMove]);
        }
      }, this.options.delay);
    }

    /**
     * Mouse move handler
     * @private
     * @param {Event} event - Mouse move event
     */

  }, {
    key: onMouseMove,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);

      var dragMoveEvent = new _SensorEvent.DragMoveSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragMoveEvent);
    }

    /**
     * Mouse up handler
     * @private
     * @param {Event} event - Mouse up event
     */

  }, {
    key: onMouseUp,
    value: function value(event) {
      this.mouseDown = Boolean(this.openedContextMenu);

      if (this.openedContextMenu) {
        this.openedContextMenu = false;
        return;
      }

      document.removeEventListener('mouseup', this[onMouseUp]);
      document.removeEventListener('dragstart', preventNativeDragStart);

      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);

      var dragStopEvent = new _SensorEvent.DragStopSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStopEvent);

      document.removeEventListener('contextmenu', this[onContextMenuWhileDragging]);
      document.removeEventListener('mousemove', this[onMouseMove]);

      this.currentContainer = null;
      this.dragging = false;
    }

    /**
     * Context menu handler
     * @private
     * @param {Event} event - Context menu event
     */

  }, {
    key: onContextMenuWhileDragging,
    value: function value(event) {
      event.preventDefault();
      this.openedContextMenu = true;
    }
  }]);
  return MouseSensor;
}(_Sensor3.default);

exports.default = MouseSensor;


function preventNativeDragStart(event) {
  event.preventDefault();
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragPressureSensorEvent = exports.DragStopSensorEvent = exports.DragMoveSensorEvent = exports.DragStartSensorEvent = exports.SensorEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(18);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base sensor event
 * @class SensorEvent
 * @module SensorEvent
 * @extends AbstractEvent
 */
var SensorEvent = exports.SensorEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(SensorEvent, _AbstractEvent);

  function SensorEvent() {
    (0, _classCallCheck3.default)(this, SensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SensorEvent.__proto__ || Object.getPrototypeOf(SensorEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SensorEvent, [{
    key: 'originalEvent',


    /**
     * Original browser event that triggered a sensor
     * @property originalEvent
     * @type {Event}
     * @readonly
     */
    get: function get() {
      return this.data.originalEvent;
    }

    /**
     * Normalized clientX for both touch and mouse events
     * @property clientX
     * @type {Number}
     * @readonly
     */

  }, {
    key: 'clientX',
    get: function get() {
      return this.data.clientX;
    }

    /**
     * Normalized clientY for both touch and mouse events
     * @property clientY
     * @type {Number}
     * @readonly
     */

  }, {
    key: 'clientY',
    get: function get() {
      return this.data.clientY;
    }

    /**
     * Normalized target for both touch and mouse events
     * Returns the element that is behind cursor or touch pointer
     * @property target
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'target',
    get: function get() {
      return this.data.target;
    }

    /**
     * Container that initiated the sensor
     * @property container
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'container',
    get: function get() {
      return this.data.container;
    }

    /**
     * Trackpad pressure
     * @property pressure
     * @type {Number}
     * @readonly
     */

  }, {
    key: 'pressure',
    get: function get() {
      return this.data.pressure;
    }
  }]);
  return SensorEvent;
}(_AbstractEvent3.default);

/**
 * Drag start sensor event
 * @class DragStartSensorEvent
 * @module DragStartSensorEvent
 * @extends SensorEvent
 */


var DragStartSensorEvent = exports.DragStartSensorEvent = function (_SensorEvent) {
  (0, _inherits3.default)(DragStartSensorEvent, _SensorEvent);

  function DragStartSensorEvent() {
    (0, _classCallCheck3.default)(this, DragStartSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStartSensorEvent.__proto__ || Object.getPrototypeOf(DragStartSensorEvent)).apply(this, arguments));
  }

  return DragStartSensorEvent;
}(SensorEvent);

/**
 * Drag move sensor event
 * @class DragMoveSensorEvent
 * @module DragMoveSensorEvent
 * @extends SensorEvent
 */


DragStartSensorEvent.type = 'drag:start';

var DragMoveSensorEvent = exports.DragMoveSensorEvent = function (_SensorEvent2) {
  (0, _inherits3.default)(DragMoveSensorEvent, _SensorEvent2);

  function DragMoveSensorEvent() {
    (0, _classCallCheck3.default)(this, DragMoveSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragMoveSensorEvent.__proto__ || Object.getPrototypeOf(DragMoveSensorEvent)).apply(this, arguments));
  }

  return DragMoveSensorEvent;
}(SensorEvent);

/**
 * Drag stop sensor event
 * @class DragStopSensorEvent
 * @module DragStopSensorEvent
 * @extends SensorEvent
 */


DragMoveSensorEvent.type = 'drag:move';

var DragStopSensorEvent = exports.DragStopSensorEvent = function (_SensorEvent3) {
  (0, _inherits3.default)(DragStopSensorEvent, _SensorEvent3);

  function DragStopSensorEvent() {
    (0, _classCallCheck3.default)(this, DragStopSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStopSensorEvent.__proto__ || Object.getPrototypeOf(DragStopSensorEvent)).apply(this, arguments));
  }

  return DragStopSensorEvent;
}(SensorEvent);

/**
 * Drag pressure sensor event
 * @class DragPressureSensorEvent
 * @module DragPressureSensorEvent
 * @extends SensorEvent
 */


DragStopSensorEvent.type = 'drag:stop';

var DragPressureSensorEvent = exports.DragPressureSensorEvent = function (_SensorEvent4) {
  (0, _inherits3.default)(DragPressureSensorEvent, _SensorEvent4);

  function DragPressureSensorEvent() {
    (0, _classCallCheck3.default)(this, DragPressureSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragPressureSensorEvent.__proto__ || Object.getPrototypeOf(DragPressureSensorEvent)).apply(this, arguments));
  }

  return DragPressureSensorEvent;
}(SensorEvent);

DragPressureSensorEvent.type = 'drag:pressure';

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TouchSensor = __webpack_require__(135);

var _TouchSensor2 = _interopRequireDefault(_TouchSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TouchSensor2.default;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(19);

var _Sensor2 = __webpack_require__(20);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onTouchStart = Symbol('onTouchStart');
var onTouchHold = Symbol('onTouchHold');
var onTouchEnd = Symbol('onTouchEnd');
var onTouchMove = Symbol('onTouchMove');
var onScroll = Symbol('onScroll');

/**
 * Adds default document.ontouchmove. Workaround for preventing scrolling on touchmove
 */
document.ontouchmove = document.ontouchmove || function () {
  return true;
};

/**
 * This sensor picks up native browser touch events and dictates drag operations
 * @class TouchSensor
 * @module TouchSensor
 * @extends Sensor
 */

var TouchSensor = function (_Sensor) {
  (0, _inherits3.default)(TouchSensor, _Sensor);

  /**
   * TouchSensor constructor.
   * @constructs TouchSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function TouchSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, TouchSensor);

    /**
     * Closest scrollable container so accidental scroll can cancel long touch
     * @property currentScrollableParent
     * @type {HTMLElement}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (TouchSensor.__proto__ || Object.getPrototypeOf(TouchSensor)).call(this, containers, options));

    _this.currentScrollableParent = null;

    /**
     * TimeoutID for long touch
     * @property tapTimeout
     * @type {Number}
     */
    _this.tapTimeout = null;

    /**
     * touchMoved indicates if touch has moved during tapTimeout
     * @property touchMoved
     * @type {Boolean}
     */
    _this.touchMoved = false;

    _this[onTouchStart] = _this[onTouchStart].bind(_this);
    _this[onTouchHold] = _this[onTouchHold].bind(_this);
    _this[onTouchEnd] = _this[onTouchEnd].bind(_this);
    _this[onTouchMove] = _this[onTouchMove].bind(_this);
    _this[onScroll] = _this[onScroll].bind(_this);
    return _this;
  }

  /**
   * Attaches sensors event listeners to the DOM
   */


  (0, _createClass3.default)(TouchSensor, [{
    key: 'attach',
    value: function attach() {
      document.addEventListener('touchstart', this[onTouchStart]);
    }

    /**
     * Detaches sensors event listeners to the DOM
     */

  }, {
    key: 'detach',
    value: function detach() {
      document.removeEventListener('touchstart', this[onTouchStart]);
    }

    /**
     * Touch start handler
     * @private
     * @param {Event} event - Touch start event
     */

  }, {
    key: onTouchStart,
    value: function value(event) {
      var container = (0, _utils.closest)(event.target, this.containers);

      if (!container) {
        return;
      }

      document.addEventListener('touchmove', this[onTouchMove], { passive: false });
      document.addEventListener('touchend', this[onTouchEnd]);
      document.addEventListener('touchcancel', this[onTouchEnd]);

      // detect if body is scrolling on iOS
      document.addEventListener('scroll', this[onScroll]);
      container.addEventListener('contextmenu', onContextMenu);

      this.currentContainer = container;

      this.currentScrollableParent = (0, _utils.closest)(container, function (element) {
        return element.offsetHeight < element.scrollHeight;
      });

      if (this.currentScrollableParent) {
        this.currentScrollableParent.addEventListener('scroll', this[onScroll]);
      }

      this.tapTimeout = setTimeout(this[onTouchHold](event, container), this.options.delay);
    }

    /**
     * Touch hold handler
     * @private
     * @param {Event} event - Touch start event
     * @param {HTMLElement} container - Container element
     */

  }, {
    key: onTouchHold,
    value: function value(event, container) {
      var _this2 = this;

      return function () {
        if (_this2.touchMoved) {
          return;
        }

        var touch = event.touches[0] || event.changedTouches[0];
        var target = event.target;

        var dragStartEvent = new _SensorEvent.DragStartSensorEvent({
          clientX: touch.pageX,
          clientY: touch.pageY,
          target: target,
          container: container,
          originalEvent: event
        });

        _this2.trigger(container, dragStartEvent);

        _this2.dragging = !dragStartEvent.canceled();
      };
    }

    /**
     * Touch move handler
     * @private
     * @param {Event} event - Touch move event
     */

  }, {
    key: onTouchMove,
    value: function value(event) {
      this.touchMoved = true;

      if (!this.dragging) {
        return;
      }

      // Cancels scrolling while dragging
      event.preventDefault();
      event.stopPropagation();

      var touch = event.touches[0] || event.changedTouches[0];
      var target = document.elementFromPoint(touch.pageX - window.scrollX, touch.pageY - window.scrollY);

      var dragMoveEvent = new _SensorEvent.DragMoveSensorEvent({
        clientX: touch.pageX,
        clientY: touch.pageY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragMoveEvent);
    }

    /**
     * Touch end handler
     * @private
     * @param {Event} event - Touch end event
     */

  }, {
    key: onTouchEnd,
    value: function value(event) {
      this.touchMoved = false;

      document.removeEventListener('touchend', this[onTouchEnd]);
      document.removeEventListener('touchcancel', this[onTouchEnd]);
      document.removeEventListener('touchmove', this[onTouchMove], { passive: false });

      document.removeEventListener('scroll', this[onScroll]);

      if (this.currentContainer) {
        this.currentContainer.removeEventListener('contextmenu', onContextMenu);
      }

      if (this.currentScrollableParent) {
        this.currentScrollableParent.removeEventListener('scroll', this[onScroll]);
      }

      clearTimeout(this.tapTimeout);

      if (!this.dragging) {
        return;
      }

      var touch = event.touches[0] || event.changedTouches[0];
      var target = document.elementFromPoint(touch.pageX - window.scrollX, touch.pageY - window.scrollY);

      event.preventDefault();

      var dragStopEvent = new _SensorEvent.DragStopSensorEvent({
        clientX: touch.pageX,
        clientY: touch.pageY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStopEvent);

      this.currentContainer = null;
      this.dragging = false;
    }

    /**
     * Scroll handler, cancel potential drag and allow scroll on iOS or other touch devices
     * @private
     */

  }, {
    key: onScroll,
    value: function value() {
      clearTimeout(this.tapTimeout);
    }
  }]);
  return TouchSensor;
}(_Sensor3.default);

exports.default = TouchSensor;


function onContextMenu(event) {
  event.preventDefault();
  event.stopPropagation();
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragSensor = __webpack_require__(137);

var _DragSensor2 = _interopRequireDefault(_DragSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DragSensor2.default;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(19);

var _Sensor2 = __webpack_require__(20);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onMouseDown = Symbol('onMouseDown');
var onMouseUp = Symbol('onMouseUp');
var onDragStart = Symbol('onDragStart');
var onDragOver = Symbol('onDragOver');
var onDragEnd = Symbol('onDragEnd');
var onDrop = Symbol('onDrop');
var reset = Symbol('reset');

/**
 * This sensor picks up native browser drag events and dictates drag operations
 * @class DragSensor
 * @module DragSensor
 * @extends Sensor
 */

var DragSensor = function (_Sensor) {
  (0, _inherits3.default)(DragSensor, _Sensor);

  /**
   * DragSensor constructor.
   * @constructs DragSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function DragSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, DragSensor);

    /**
     * Mouse down timer which will end up setting the draggable attribute, unless canceled
     * @property mouseDownTimeout
     * @type {Number}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (DragSensor.__proto__ || Object.getPrototypeOf(DragSensor)).call(this, containers, options));

    _this.mouseDownTimeout = null;

    /**
     * Draggable element needs to be remembered to unset the draggable attribute after drag operation has completed
     * @property draggableElement
     * @type {HTMLElement}
     */
    _this.draggableElement = null;

    /**
     * Native draggable element could be links or images, their draggable state will be disabled during drag operation
     * @property nativeDraggableElement
     * @type {HTMLElement}
     */
    _this.nativeDraggableElement = null;

    _this[onMouseDown] = _this[onMouseDown].bind(_this);
    _this[onMouseUp] = _this[onMouseUp].bind(_this);
    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragOver] = _this[onDragOver].bind(_this);
    _this[onDragEnd] = _this[onDragEnd].bind(_this);
    _this[onDrop] = _this[onDrop].bind(_this);
    return _this;
  }

  /**
   * Attaches sensors event listeners to the DOM
   */


  (0, _createClass3.default)(DragSensor, [{
    key: 'attach',
    value: function attach() {
      document.addEventListener('mousedown', this[onMouseDown], true);
    }

    /**
     * Detaches sensors event listeners to the DOM
     */

  }, {
    key: 'detach',
    value: function detach() {
      document.removeEventListener('mousedown', this[onMouseDown], true);
    }

    /**
     * Drag start handler
     * @private
     * @param {Event} event - Drag start event
     */

  }, {
    key: onDragStart,
    value: function value(event) {
      var _this2 = this;

      // Need for firefox. "text" key is needed for IE
      event.dataTransfer.setData('text', '');
      event.dataTransfer.effectAllowed = this.options.type;

      var target = document.elementFromPoint(event.clientX, event.clientY);
      this.currentContainer = (0, _utils.closest)(event.target, this.containers);

      if (!this.currentContainer) {
        return;
      }

      var dragStartEvent = new _SensorEvent.DragStartSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      // Workaround
      setTimeout(function () {
        _this2.trigger(_this2.currentContainer, dragStartEvent);

        if (dragStartEvent.canceled()) {
          _this2.dragging = false;
        } else {
          _this2.dragging = true;
        }
      }, 0);
    }

    /**
     * Drag over handler
     * @private
     * @param {Event} event - Drag over event
     */

  }, {
    key: onDragOver,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = this.currentContainer;

      var dragMoveEvent = new _SensorEvent.DragMoveSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragMoveEvent);

      if (!dragMoveEvent.canceled()) {
        event.preventDefault();
        event.dataTransfer.dropEffect = this.options.type;
      }
    }

    /**
     * Drag end handler
     * @private
     * @param {Event} event - Drag end event
     */

  }, {
    key: onDragEnd,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      document.removeEventListener('mouseup', this[onMouseUp], true);

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = this.currentContainer;

      var dragStopEvent = new _SensorEvent.DragStopSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragStopEvent);

      this.dragging = false;

      this[reset]();
    }

    /**
     * Drop handler
     * @private
     * @param {Event} event - Drop event
     */

  }, {
    key: onDrop,
    value: function value(event) {
      // eslint-disable-line class-methods-use-this
      event.preventDefault();
    }

    /**
     * Mouse down handler
     * @private
     * @param {Event} event - Mouse down event
     */

  }, {
    key: onMouseDown,
    value: function value(event) {
      var _this3 = this;

      // Firefox bug for inputs within draggables https://bugzilla.mozilla.org/show_bug.cgi?id=739071
      if (event.target && (event.target.form || event.target.contenteditable)) {
        return;
      }

      var nativeDraggableElement = (0, _utils.closest)(event.target, function (element) {
        return element.draggable;
      });

      if (nativeDraggableElement) {
        nativeDraggableElement.draggable = false;
        this.nativeDraggableElement = nativeDraggableElement;
      }

      document.addEventListener('mouseup', this[onMouseUp], true);
      document.addEventListener('dragstart', this[onDragStart], false);
      document.addEventListener('dragover', this[onDragOver], false);
      document.addEventListener('dragend', this[onDragEnd], false);
      document.addEventListener('drop', this[onDrop], false);

      var target = (0, _utils.closest)(event.target, this.options.draggable);

      if (!target) {
        return;
      }

      this.mouseDownTimeout = setTimeout(function () {
        target.draggable = true;
        _this3.draggableElement = target;
      }, this.options.delay);
    }

    /**
     * Mouse up handler
     * @private
     * @param {Event} event - Mouse up event
     */

  }, {
    key: onMouseUp,
    value: function value() {
      this[reset]();
    }

    /**
     * Mouse up handler
     * @private
     * @param {Event} event - Mouse up event
     */

  }, {
    key: reset,
    value: function value() {
      clearTimeout(this.mouseDownTimeout);

      document.removeEventListener('mouseup', this[onMouseUp], true);
      document.removeEventListener('dragstart', this[onDragStart], false);
      document.removeEventListener('dragover', this[onDragOver], false);
      document.removeEventListener('dragend', this[onDragEnd], false);
      document.removeEventListener('drop', this[onDrop], false);

      if (this.nativeDraggableElement) {
        this.nativeDraggableElement.draggable = true;
        this.nativeDraggableElement = null;
      }

      if (this.draggableElement) {
        this.draggableElement.draggable = false;
        this.draggableElement = null;
      }
    }
  }]);
  return DragSensor;
}(_Sensor3.default);

exports.default = DragSensor;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ForceTouchSensor = __webpack_require__(139);

var _ForceTouchSensor2 = _interopRequireDefault(_ForceTouchSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ForceTouchSensor2.default;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Sensor2 = __webpack_require__(20);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onMouseForceWillBegin = Symbol('onMouseForceWillBegin');
var onMouseForceDown = Symbol('onMouseForceDown');
var onMouseDown = Symbol('onMouseDown');
var onMouseForceChange = Symbol('onMouseForceChange');
var onMouseMove = Symbol('onMouseMove');
var onMouseUp = Symbol('onMouseUp');
var onMouseForceGlobalChange = Symbol('onMouseForceGlobalChange');

/**
 * This sensor picks up native force touch events and dictates drag operations
 * @class ForceTouchSensor
 * @module ForceTouchSensor
 * @extends Sensor
 */

var ForceTouchSensor = function (_Sensor) {
  (0, _inherits3.default)(ForceTouchSensor, _Sensor);

  /**
   * ForceTouchSensor constructor.
   * @constructs ForceTouchSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function ForceTouchSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, ForceTouchSensor);

    /**
     * Draggable element needs to be remembered to unset the draggable attribute after drag operation has completed
     * @property mightDrag
     * @type {Boolean}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ForceTouchSensor.__proto__ || Object.getPrototypeOf(ForceTouchSensor)).call(this, containers, options));

    _this.mightDrag = false;

    _this[onMouseForceWillBegin] = _this[onMouseForceWillBegin].bind(_this);
    _this[onMouseForceDown] = _this[onMouseForceDown].bind(_this);
    _this[onMouseDown] = _this[onMouseDown].bind(_this);
    _this[onMouseForceChange] = _this[onMouseForceChange].bind(_this);
    _this[onMouseMove] = _this[onMouseMove].bind(_this);
    _this[onMouseUp] = _this[onMouseUp].bind(_this);
    return _this;
  }

  /**
   * Attaches sensors event listeners to the DOM
   */


  (0, _createClass3.default)(ForceTouchSensor, [{
    key: 'attach',
    value: function attach() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var container = _step.value;

          container.addEventListener('webkitmouseforcewillbegin', this[onMouseForceWillBegin], false);
          container.addEventListener('webkitmouseforcedown', this[onMouseForceDown], false);
          container.addEventListener('mousedown', this[onMouseDown], true);
          container.addEventListener('webkitmouseforcechanged', this[onMouseForceChange], false);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      document.addEventListener('mousemove', this[onMouseMove]);
      document.addEventListener('mouseup', this[onMouseUp]);
    }

    /**
     * Detaches sensors event listeners to the DOM
     */

  }, {
    key: 'detach',
    value: function detach() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var container = _step2.value;

          container.removeEventListener('webkitmouseforcewillbegin', this[onMouseForceWillBegin], false);
          container.removeEventListener('webkitmouseforcedown', this[onMouseForceDown], false);
          container.removeEventListener('mousedown', this[onMouseDown], true);
          container.removeEventListener('webkitmouseforcechanged', this[onMouseForceChange], false);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      document.removeEventListener('mousemove', this[onMouseMove]);
      document.removeEventListener('mouseup', this[onMouseUp]);
    }

    /**
     * Mouse force will begin handler
     * @private
     * @param {Event} event - Mouse force will begin event
     */

  }, {
    key: onMouseForceWillBegin,
    value: function value(event) {
      event.preventDefault();
      this.mightDrag = true;
    }

    /**
     * Mouse force down handler
     * @private
     * @param {Event} event - Mouse force down event
     */

  }, {
    key: onMouseForceDown,
    value: function value(event) {
      if (this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = event.currentTarget;

      var dragStartEvent = new _SensorEvent.DragStartSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragStartEvent);

      this.currentContainer = container;
      this.dragging = !dragStartEvent.canceled();
      this.mightDrag = false;
    }

    /**
     * Mouse up handler
     * @private
     * @param {Event} event - Mouse up event
     */

  }, {
    key: onMouseUp,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var dragStopEvent = new _SensorEvent.DragStopSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: null,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStopEvent);

      this.currentContainer = null;
      this.dragging = false;
      this.mightDrag = false;
    }

    /**
     * Mouse down handler
     * @private
     * @param {Event} event - Mouse down event
     */

  }, {
    key: onMouseDown,
    value: function value(event) {
      if (!this.mightDrag) {
        return;
      }

      // Need workaround for real click
      // Cancel potential drag events
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    /**
     * Mouse move handler
     * @private
     * @param {Event} event - Mouse force will begin event
     */

  }, {
    key: onMouseMove,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);

      var dragMoveEvent = new _SensorEvent.DragMoveSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragMoveEvent);
    }

    /**
     * Mouse force change handler
     * @private
     * @param {Event} event - Mouse force change event
     */

  }, {
    key: onMouseForceChange,
    value: function value(event) {
      if (this.dragging) {
        return;
      }

      var target = event.target;
      var container = event.currentTarget;

      var dragPressureEvent = new _SensorEvent.DragPressureSensorEvent({
        pressure: event.webkitForce,
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragPressureEvent);
    }

    /**
     * Mouse force global change handler
     * @private
     * @param {Event} event - Mouse force global change event
     */

  }, {
    key: onMouseForceGlobalChange,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var target = event.target;

      var dragPressureEvent = new _SensorEvent.DragPressureSensorEvent({
        pressure: event.webkitForce,
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragPressureEvent);
    }
  }]);
  return ForceTouchSensor;
}(_Sensor3.default);

exports.default = ForceTouchSensor;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _toConsumableArray2 = __webpack_require__(41);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(19);

var _Plugins = __webpack_require__(58);

var _Emitter = __webpack_require__(141);

var _Emitter2 = _interopRequireDefault(_Emitter);

var _Sensors = __webpack_require__(59);

var _DraggableEvent = __webpack_require__(56);

var _DragEvent = __webpack_require__(55);

var _MirrorEvent = __webpack_require__(57);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = Symbol('onDragStart');
var onDragMove = Symbol('onDragMove');
var onDragStop = Symbol('onDragStop');
var onDragPressure = Symbol('onDragPressure');
var getAppendableContainer = Symbol('getAppendableContainer');

/**
 * @const {Object} defaultAnnouncements
 * @const {Function} defaultAnnouncements['drag:start']
 * @const {Function} defaultAnnouncements['drag:stop']
 */
var defaultAnnouncements = {
  'drag:start': function dragStart(event) {
    return 'Picked up ' + (event.source.textContent.trim() || event.source.id || 'draggable element');
  },
  'drag:stop': function dragStop(event) {
    return 'Released ' + (event.source.textContent.trim() || event.source.id || 'draggable element');
  }
};

var defaultClasses = {
  'container:dragging': 'draggable-container--is-dragging',
  'source:dragging': 'draggable-source--is-dragging',
  'source:placed': 'draggable-source--placed',
  'container:placed': 'draggable-container--placed',
  'body:dragging': 'draggable--is-dragging',
  'draggable:over': 'draggable--over',
  'container:over': 'draggable-container--over',
  'source:original': 'draggable--original',
  mirror: 'draggable-mirror'
};

var defaultOptions = exports.defaultOptions = {
  draggable: '.draggable-source',
  handle: null,
  delay: 100,
  placedTimeout: 800,
  plugins: [],
  sensors: []
};

/**
 * This is the core draggable library that does the heavy lifting
 * @class Draggable
 * @module Draggable
 */

var Draggable = function () {

  /**
   * Draggable constructor.
   * @constructs Draggable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Draggable containers
   * @param {Object} options - Options for draggable
   */
  function Draggable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [document.body];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Draggable);


    /**
     * Draggable containers
     * @property containers
     * @type {HTMLElement[]}
     */
    if (containers instanceof NodeList || containers instanceof Array) {
      this.containers = [].concat((0, _toConsumableArray3.default)(containers));
    } else if (containers instanceof HTMLElement) {
      this.containers = [containers];
    } else {
      throw new Error('Draggable containers are expected to be of type `NodeList`, `HTMLElement[]` or `HTMLElement`');
    }

    this.options = Object.assign({}, defaultOptions, options, {
      classes: Object.assign({}, defaultClasses, options.classes || {}),
      announcements: Object.assign({}, defaultAnnouncements, options.announcements || {})
    });

    /**
     * Draggables event emitter
     * @property emitter
     * @type {Emitter}
     */
    this.emitter = new _Emitter2.default();

    /**
     * Current drag state
     * @property dragging
     * @type {Boolean}
     */
    this.dragging = false;

    /**
     * Active plugins
     * @property plugins
     * @type {Plugin[]}
     */
    this.plugins = [];

    /**
     * Active sensors
     * @property sensors
     * @type {Sensor[]}
     */
    this.sensors = [];

    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragMove] = this[onDragMove].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);
    this[onDragPressure] = this[onDragPressure].bind(this);

    document.addEventListener('drag:start', this[onDragStart], true);
    document.addEventListener('drag:move', this[onDragMove], true);
    document.addEventListener('drag:stop', this[onDragStop], true);
    document.addEventListener('drag:pressure', this[onDragPressure], true);

    this.addPlugin.apply(this, [_Plugins.Mirror, _Plugins.Accessibility, _Plugins.Scrollable, _Plugins.Announcement].concat((0, _toConsumableArray3.default)(this.options.plugins)));
    this.addSensor.apply(this, [_Sensors.MouseSensor, _Sensors.TouchSensor].concat((0, _toConsumableArray3.default)(this.options.sensors)));

    var draggableInitializedEvent = new _DraggableEvent.DraggableInitializedEvent({
      draggable: this
    });

    this.trigger(draggableInitializedEvent);
  }

  /**
   * Destroys Draggable instance. This removes all internal event listeners and
   * deactivates sensors and plugins
   */


  /**
   * Default plugins draggable uses
   * @static
   * @property {Object} Plugins
   * @property {Mirror} Plugins.Mirror
   * @property {Accessibility} Plugins.Accessibility
   * @property {Scrollable} Plugins.Scrollable
   * @property {Announcement} Plugins.Announcement
   * @type {Object}
   */


  (0, _createClass3.default)(Draggable, [{
    key: 'destroy',
    value: function destroy() {
      document.removeEventListener('drag:start', this[onDragStart], true);
      document.removeEventListener('drag:move', this[onDragMove], true);
      document.removeEventListener('drag:stop', this[onDragStop], true);
      document.removeEventListener('drag:pressure', this[onDragPressure], true);

      var draggableDestroyEvent = new _DraggableEvent.DraggableDestroyEvent({
        draggable: this
      });

      this.trigger(draggableDestroyEvent);

      this.removePlugin.apply(this, (0, _toConsumableArray3.default)(this.plugins.map(function (plugin) {
        return plugin.constructor;
      })));
      this.removeSensor.apply(this, (0, _toConsumableArray3.default)(this.sensors.map(function (sensor) {
        return sensor.constructor;
      })));
    }

    /**
     * Adds plugin to this draggable instance. This will end up calling the attach method of the plugin
     * @param {...typeof Plugin} plugins - Plugins that you want attached to draggable
     * @return {Draggable}
     * @example draggable.addPlugin(CustomA11yPlugin, CustomMirrorPlugin)
     */

  }, {
    key: 'addPlugin',
    value: function addPlugin() {
      var _this = this;

      for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
        plugins[_key] = arguments[_key];
      }

      var activePlugins = plugins.map(function (Plugin) {
        return new Plugin(_this);
      });
      activePlugins.forEach(function (plugin) {
        return plugin.attach();
      });
      this.plugins = [].concat((0, _toConsumableArray3.default)(this.plugins), (0, _toConsumableArray3.default)(activePlugins));
      return this;
    }

    /**
     * Removes plugins that are already attached to this draggable instance. This will end up calling
     * the detach method of the plugin
     * @param {...typeof Plugin} plugins - Plugins that you want detached from draggable
     * @return {Draggable}
     * @example draggable.removePlugin(MirrorPlugin, CustomMirrorPlugin)
     */

  }, {
    key: 'removePlugin',
    value: function removePlugin() {
      for (var _len2 = arguments.length, plugins = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        plugins[_key2] = arguments[_key2];
      }

      var removedPlugins = this.plugins.filter(function (plugin) {
        return plugins.includes(plugin.constructor);
      });
      removedPlugins.forEach(function (plugin) {
        return plugin.detach();
      });
      this.plugins = this.plugins.filter(function (plugin) {
        return !plugins.includes(plugin.constructor);
      });
      return this;
    }

    /**
     * Adds sensors to this draggable instance. This will end up calling the attach method of the sensor
     * @param {...typeof Sensor} sensors - Sensors that you want attached to draggable
     * @return {Draggable}
     * @example draggable.addSensor(ForceTouchSensor, CustomSensor)
     */

  }, {
    key: 'addSensor',
    value: function addSensor() {
      var _this2 = this;

      for (var _len3 = arguments.length, sensors = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        sensors[_key3] = arguments[_key3];
      }

      var activeSensors = sensors.map(function (Sensor) {
        return new Sensor(_this2.containers, _this2.options);
      });
      activeSensors.forEach(function (sensor) {
        return sensor.attach();
      });
      this.sensors = [].concat((0, _toConsumableArray3.default)(this.sensors), (0, _toConsumableArray3.default)(activeSensors));
      return this;
    }

    /**
     * Removes sensors that are already attached to this draggable instance. This will end up calling
     * the detach method of the sensor
     * @param {...typeof Sensor} sensors - Sensors that you want attached to draggable
     * @return {Draggable}
     * @example draggable.removeSensor(TouchSensor, DragSensor)
     */

  }, {
    key: 'removeSensor',
    value: function removeSensor() {
      for (var _len4 = arguments.length, sensors = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        sensors[_key4] = arguments[_key4];
      }

      var removedSensors = this.sensors.filter(function (sensor) {
        return sensors.includes(sensor.constructor);
      });
      removedSensors.forEach(function (sensor) {
        return sensor.detach();
      });
      this.sensors = this.sensors.filter(function (sensor) {
        return !sensors.includes(sensor.constructor);
      });
      return this;
    }

    /**
     * Adds container to this draggable instance
     * @param {...HTMLElement} containers - Containers you want to add to draggable
     * @return {Draggable}
     * @example draggable.addPlugin(CustomA11yPlugin, CustomMirrorPlugin)
     */

  }, {
    key: 'addContainer',
    value: function addContainer() {
      for (var _len5 = arguments.length, containers = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        containers[_key5] = arguments[_key5];
      }

      this.containers = [].concat((0, _toConsumableArray3.default)(this.containers), containers);
      return this;
    }

    /**
     * Removes container from this draggable instance
     * @param {...HTMLElement} containers - Containers you want to remove from draggable
     * @return {Draggable}
     * @example draggable.removePlugin(MirrorPlugin, CustomMirrorPlugin)
     */

  }, {
    key: 'removeContainer',
    value: function removeContainer() {
      for (var _len6 = arguments.length, containers = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        containers[_key6] = arguments[_key6];
      }

      this.containers = this.containers.filter(function (container) {
        return !containers.includes(container);
      });
      return this;
    }

    /**
     * Adds listener for draggable events
     * @param {String} type - Event name
     * @param {...Function} callbacks - Event callbacks
     * @return {Draggable}
     * @example draggable.on('drag:start', (dragEvent) => dragEvent.cancel());
     */

  }, {
    key: 'on',
    value: function on(type) {
      var _emitter;

      for (var _len7 = arguments.length, callbacks = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        callbacks[_key7 - 1] = arguments[_key7];
      }

      (_emitter = this.emitter).on.apply(_emitter, [type].concat(callbacks));
      return this;
    }

    /**
     * Removes listener from draggable
     * @param {String} type - Event name
     * @param {Function} callback - Event callback
     * @return {Draggable}
     * @example draggable.off('drag:start', handlerFunction);
     */

  }, {
    key: 'off',
    value: function off(type, callback) {
      this.emitter.off(type, callback);
      return this;
    }

    /**
     * Triggers draggable event
     * @param {AbstractEvent} event - Event instance
     * @return {Draggable}
     * @example draggable.trigger(event);
     */

  }, {
    key: 'trigger',
    value: function trigger(event) {
      this.emitter.trigger(event);
      return this;
    }

    /**
     * Returns class name for class identifier
     * @param {String} name - Name of class identifier
     * @return {String|null}
     */

  }, {
    key: 'getClassNameFor',
    value: function getClassNameFor(name) {
      return this.options.classes[name];
    }

    /**
     * Returns true if this draggable instance is currently dragging
     * @return {Boolean}
     */

  }, {
    key: 'isDragging',
    value: function isDragging() {
      return Boolean(this.dragging);
    }

    /**
     * Returns draggable elements for a given container, excluding the mirror and
     * original source element if present
     * @param {HTMLElement} container
     * @return {HTMLElement[]}
     */

  }, {
    key: 'getDraggableElementsForContainer',
    value: function getDraggableElementsForContainer(container) {
      var _this3 = this;

      var allDraggableElements = container.querySelectorAll(this.options.draggable);

      return [].concat((0, _toConsumableArray3.default)(allDraggableElements)).filter(function (childElement) {
        return childElement !== _this3.originalSource && childElement !== _this3.mirror;
      });
    }

    /**
     * Drag start handler
     * @private
     * @param {Event} event - DOM Drag event
     */

  }, {
    key: onDragStart,
    value: function value(event) {
      var _this4 = this;

      var sensorEvent = getSensorEvent(event);
      var target = sensorEvent.target,
          container = sensorEvent.container,
          originalEvent = sensorEvent.originalEvent;


      if (!this.containers.includes(container)) {
        return;
      }

      if (this.options.handle && target && !(0, _utils.closest)(target, this.options.handle)) {
        sensorEvent.cancel();
        return;
      }

      // Find draggable source element
      this.originalSource = (0, _utils.closest)(target, this.options.draggable);
      this.sourceContainer = container;

      if (!this.originalSource) {
        sensorEvent.cancel();
        return;
      }

      if (this.lastPlacedSource && this.lastPlacedContainer) {
        clearTimeout(this.placedTimeoutID);
        this.lastPlacedSource.classList.remove(this.getClassNameFor('source:placed'));
        this.lastPlacedContainer.classList.remove(this.getClassNameFor('container:placed'));
      }

      this.dragging = true;

      this.source = this.originalSource.cloneNode(true);

      var mirrorCreateEvent = new _MirrorEvent.MirrorCreateEvent({
        source: this.source,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent: sensorEvent
      });

      this.trigger(mirrorCreateEvent);

      if (!isDragEvent(originalEvent) && !mirrorCreateEvent.canceled()) {
        var appendableContainer = this[getAppendableContainer]({ source: this.originalSource });
        this.mirror = this.source.cloneNode(true);

        var mirrorCreatedEvent = new _MirrorEvent.MirrorCreatedEvent({
          source: this.source,
          originalSource: this.originalSource,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        var mirrorAttachedEvent = new _MirrorEvent.MirrorAttachedEvent({
          source: this.source,
          originalSource: this.originalSource,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        this.trigger(mirrorCreatedEvent);
        appendableContainer.appendChild(this.mirror);
        this.trigger(mirrorAttachedEvent);
      }

      this.originalSource.classList.add(this.getClassNameFor('source:original'));
      this.originalSource.parentNode.insertBefore(this.source, this.originalSource);

      this.originalSource.style.display = 'none';
      this.source.classList.add(this.getClassNameFor('source:dragging'));
      this.sourceContainer.classList.add(this.getClassNameFor('container:dragging'));
      document.body.classList.add(this.getClassNameFor('body:dragging'));
      applyUserSelect(document.body, 'none');

      var dragEvent = new _DragEvent.DragStartEvent({
        source: this.source,
        mirror: this.mirror,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent: sensorEvent
      });

      this.trigger(dragEvent);

      if (dragEvent.canceled()) {
        this.dragging = false;

        if (this.mirror) {
          this.mirror.parentNode.removeChild(this.mirror);
        }

        this.source.parentNode.removeChild(this.source);
        this.originalSource.style.display = null;

        this.source.classList.remove(this.getClassNameFor('source:dragging'));
        this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
        document.body.classList.remove(this.getClassNameFor('body:dragging'));
      } else {
        requestAnimationFrame(function () {
          return _this4[onDragMove](event);
        });
      }
    }

    /**
     * Drag move handler
     * @private
     * @param {Event} event - DOM Drag event
     */

  }, {
    key: onDragMove,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var sensorEvent = getSensorEvent(event);
      var container = sensorEvent.container;

      var target = sensorEvent.target;

      var dragMoveEvent = new _DragEvent.DragMoveEvent({
        source: this.source,
        mirror: this.mirror,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent: sensorEvent
      });

      this.trigger(dragMoveEvent);

      if (dragMoveEvent.canceled()) {
        sensorEvent.cancel();
      }

      if (this.mirror && !dragMoveEvent.canceled()) {
        var mirrorMoveEvent = new _MirrorEvent.MirrorMoveEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        this.trigger(mirrorMoveEvent);
      }

      target = (0, _utils.closest)(target, this.options.draggable);
      var withinCorrectContainer = (0, _utils.closest)(sensorEvent.target, this.containers);
      var overContainer = sensorEvent.overContainer || withinCorrectContainer;
      var isLeavingContainer = this.currentOverContainer && overContainer !== this.currentOverContainer;
      var isLeavingDraggable = this.currentOver && target !== this.currentOver;
      var isOverContainer = overContainer && this.currentOverContainer !== overContainer;
      var isOverDraggable = withinCorrectContainer && target && this.currentOver !== target;

      if (isLeavingDraggable) {
        var dragOutEvent = new _DragEvent.DragOutEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          over: this.currentOver
        });

        this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
        this.currentOver = null;

        this.trigger(dragOutEvent);
      }

      if (isLeavingContainer) {
        var dragOutContainerEvent = new _DragEvent.DragOutContainerEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: this.currentOverContainer
        });

        this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
        this.currentOverContainer = null;

        this.trigger(dragOutContainerEvent);
      }

      if (isOverContainer) {
        overContainer.classList.add(this.getClassNameFor('container:over'));

        var dragOverContainerEvent = new _DragEvent.DragOverContainerEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: overContainer
        });

        this.currentOverContainer = overContainer;

        this.trigger(dragOverContainerEvent);
      }

      if (isOverDraggable) {
        target.classList.add(this.getClassNameFor('draggable:over'));

        var dragOverEvent = new _DragEvent.DragOverEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: overContainer,
          over: target
        });

        this.currentOver = target;

        this.trigger(dragOverEvent);
      }
    }

    /**
     * Drag stop handler
     * @private
     * @param {Event} event - DOM Drag event
     */

  }, {
    key: onDragStop,
    value: function value(event) {
      var _this5 = this;

      if (!this.dragging) {
        return;
      }

      this.dragging = false;

      var sensorEvent = getSensorEvent(event);
      var dragStopEvent = new _DragEvent.DragStopEvent({
        source: this.source,
        mirror: this.mirror,
        originalSource: this.originalSource,
        sensorEvent: event.sensorEvent,
        sourceContainer: this.sourceContainer
      });

      this.trigger(dragStopEvent);

      this.source.parentNode.insertBefore(this.originalSource, this.source);
      this.source.parentNode.removeChild(this.source);
      this.originalSource.style.display = '';

      this.source.classList.remove(this.getClassNameFor('source:dragging'));
      this.originalSource.classList.remove(this.getClassNameFor('source:original'));
      this.originalSource.classList.add(this.getClassNameFor('source:placed'));
      this.sourceContainer.classList.add(this.getClassNameFor('container:placed'));
      this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
      document.body.classList.remove(this.getClassNameFor('body:dragging'));
      applyUserSelect(document.body, '');

      if (this.currentOver) {
        this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
      }

      if (this.currentOverContainer) {
        this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
      }

      if (this.mirror) {
        var mirrorDestroyEvent = new _MirrorEvent.MirrorDestroyEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: sensorEvent.container,
          sensorEvent: sensorEvent
        });

        this.trigger(mirrorDestroyEvent);

        if (!mirrorDestroyEvent.canceled()) {
          this.mirror.parentNode.removeChild(this.mirror);
        }
      }

      this.lastPlacedSource = this.originalSource;
      this.lastPlacedContainer = this.sourceContainer;

      this.placedTimeoutID = setTimeout(function () {
        if (_this5.lastPlacedSource) {
          _this5.lastPlacedSource.classList.remove(_this5.getClassNameFor('source:placed'));
        }

        if (_this5.lastPlacedContainer) {
          _this5.lastPlacedContainer.classList.remove(_this5.getClassNameFor('container:placed'));
        }

        _this5.lastPlacedSource = null;
        _this5.lastPlacedContainer = null;
      }, this.options.placedTimeout);

      this.source = null;
      this.mirror = null;
      this.originalSource = null;
      this.currentOverContainer = null;
      this.currentOver = null;
      this.sourceContainer = null;
    }

    /**
     * Drag pressure handler
     * @private
     * @param {Event} event - DOM Drag event
     */

  }, {
    key: onDragPressure,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var sensorEvent = getSensorEvent(event);
      var source = this.source || (0, _utils.closest)(sensorEvent.originalEvent.target, this.options.draggable);

      var dragPressureEvent = new _DragEvent.DragPressureEvent({
        sensorEvent: sensorEvent,
        source: source,
        pressure: sensorEvent.pressure
      });

      this.trigger(dragPressureEvent);
    }

    /**
     * Returns appendable container for mirror based on the appendTo option
     * @private
     * @param {Object} options
     * @param {HTMLElement} options.source - Current source
     * @return {HTMLElement}
     */

  }, {
    key: getAppendableContainer,
    value: function value(_ref) {
      var source = _ref.source;

      var appendTo = this.options.appendTo;

      if (typeof appendTo === 'string') {
        return document.querySelector(appendTo);
      } else if (appendTo instanceof HTMLElement) {
        return appendTo;
      } else if (typeof appendTo === 'function') {
        return appendTo(source);
      } else {
        return source.parentNode;
      }
    }
  }]);
  return Draggable;
}();

Draggable.Plugins = { Mirror: _Plugins.Mirror, Accessibility: _Plugins.Accessibility, Scrollable: _Plugins.Scrollable, Announcement: _Plugins.Announcement };
exports.default = Draggable;


function getSensorEvent(event) {
  return event.detail;
}

function isDragEvent(event) {
  return (/^drag/.test(event.type)
  );
}

function applyUserSelect(element, value) {
  element.style.webkitUserSelect = value;
  element.style.mozUserSelect = value;
  element.style.msUserSelect = value;
  element.style.oUserSelect = value;
  element.style.userSelect = value;
}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Emitter = __webpack_require__(142);

var _Emitter2 = _interopRequireDefault(_Emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Emitter2.default;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(41);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Emitter is a simple emitter class that provides you with `on()`, `off()` and `trigger()` methods
 * @class Emitter
 * @module Emitter
 */
var Emitter = function () {
  function Emitter() {
    (0, _classCallCheck3.default)(this, Emitter);

    this.callbacks = {};
  }

  /**
   * Registers callbacks by event name
   * @param {String} type
   * @param {...Function} callbacks
   */


  (0, _createClass3.default)(Emitter, [{
    key: "on",
    value: function on(type) {
      var _callbacks$type;

      if (!this.callbacks[type]) {
        this.callbacks[type] = [];
      }

      for (var _len = arguments.length, callbacks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        callbacks[_key - 1] = arguments[_key];
      }

      (_callbacks$type = this.callbacks[type]).push.apply(_callbacks$type, callbacks);

      return this;
    }

    /**
     * Unregisters callbacks by event name
     * @param {String} type
     * @param {Function} callback
     */

  }, {
    key: "off",
    value: function off(type, callback) {
      if (!this.callbacks[type]) {
        return null;
      }

      var copy = this.callbacks[type].slice(0);

      for (var i = 0; i < copy.length; i++) {
        if (callback === copy[i]) {
          this.callbacks[type].splice(i, 1);
        }
      }

      return this;
    }

    /**
     * Triggers event callbacks by event object
     * @param {AbstractEvent} event
     */

  }, {
    key: "trigger",
    value: function trigger(event) {
      if (!this.callbacks[event.type]) {
        return null;
      }

      var callbacks = [].concat((0, _toConsumableArray3.default)(this.callbacks[event.type]));
      var caughtErrors = [];

      for (var i = callbacks.length - 1; i >= 0; i--) {
        var callback = callbacks[i];
        try {
          callback(event);
        } catch (error) {
          caughtErrors.push(error);
        }
      }

      if (caughtErrors.length) {
        throw new Error("Draggable caught errors while triggering '" + event.type + "'", caughtErrors);
      }

      return this;
    }
  }]);
  return Emitter;
}();

exports.default = Emitter;

/***/ })
/******/ ]);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjZiNTViMTUxNWQwY2E0MzY2MGMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92aWV3cy9zdXBlcnZpc29yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2hvcGlmeS9kcmFnZ2FibGUvbGliL3N3YXBwYWJsZS5qcyJdLCJuYW1lcyI6WyIkIiwiUHJvamVjdFRvcGljcyIsIndpbmRvdyIsInByb3RvdHlwZSIsIkNzc0NsYXNzZXNfIiwiREFUQV9UQUJMRSIsIklTX1NFTEVDVEVEIiwiU2VsZWN0b3JzXyIsIkFERF9UT1BJQ19JTlBVVCIsIk5FV19UT1BJQ19JTlBVVF9DT05UQUlORVIiLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInByb2plY3RUb3BpY3MiLCJmdW5jdGlvbnMiLCJhZGRUb3BpY1RvUHJvamVjdCIsInByb2plY3RJZCIsInRvcGljTmFtZSIsInNob3ciLCJhamF4VXJsIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhIiwidG9waWNfbmFtZSIsInByb2plY3RfaWQiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJ2YWwiLCJsZW5ndGgiLCJhZnRlciIsInByZXBlbmQiLCJkb25lIiwiYXBwZW5kIiwiaGlkZSIsInJlbW92ZVRvcGljRnJvbVByb2plY3QiLCJ0b3BpY0lkIiwidG9waWNfaWQiLCJlYWNoIiwiaSIsIm9iaiIsInJlbW92ZSIsInVwZGF0ZVByb2plY3RQcmltYXJ5VG9waWMiLCJhdHRyIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInN3YXBwYWJsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImRyYWdnYWJsZSIsIm9uIiwib3JpZ2luYWxQcmltYXJ5VG9waWNJZCIsImtleXByZXNzIiwiZSIsIndoaWNoIiwicGFyZW50IiwiZm9jdXMiLCJhY3Rpb25CdXR0b24iLCJhY3Rpb25UeXBlIiwidGFibGVSb3ciLCJwYXJlbnRzIiwiZXEiLCJodG1sIiwiY3NzIiwiY29uc29sZSIsImVycm9yIiwibWV0aG9kIiwic3R1ZGVudF9pZCIsInN1Y2Nlc3NmdWwiLCJzaG93Tm90aWZpY2F0aW9uIiwidXBkYXRlQWNjZXB0ZWRTdHVkZW50c1RhYmxlIiwibWVzc2FnZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybSIsInByb2plY3ROYW1lIiwiY29uZmlybSIsInRpdGxlIiwiaWNvbiIsInRoZW1lIiwiZXNjYXBlS2V5IiwiYmFja2dyb3VuZERpc21pc3MiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJjb250ZW50IiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwiYWN0aW9uIiwicHJvcCIsInJvdyIsInJlcGxhY2VXaXRoIiwiY2FuY2VsIiwiZmluZCIsInNldENvb2tpZSIsInN0dWRlbnROYW1lIiwicHJvamVjdFRpdGxlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7Ozs7OztBQU1BOztBQUdBLENBQUNBLEVBQUUsWUFBVztBQUNiOztBQUVBOzs7O0FBSUE7Ozs7OztBQUtBLEtBQUlDLGdCQUFpQixTQUFTQSxhQUFULEdBQXlCLENBQUUsQ0FBaEQ7QUFDQUMsUUFBTyxlQUFQLElBQTBCRCxhQUExQjs7QUFFQUEsZUFBY0UsU0FBZCxDQUF3QkMsV0FBeEIs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Q0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVELE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0YsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOztBQUVBOztBQUVBLHND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QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7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QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxZQUFZO0FBQzNCLGdCQUFnQjtBQUNoQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRCxxQkFBcUI7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxZQUFZO0FBQ3pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNkZBQTZGLGFBQWE7QUFDMUc7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxTQUFTO0FBQ3hCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLFFBQVE7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTztBQUNQO0FBQ0EsQ0FBQyxFIiwiZmlsZSI6IlxcanNcXHZpZXdzXFxzdXBlcnZpc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI2YjU1YjE1MTVkMGNhNDM2NjBjIiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbmltcG9ydCBTd2FwcGFibGUgZnJvbSAnQHNob3BpZnkvZHJhZ2dhYmxlL2xpYi9zd2FwcGFibGUnO1xyXG5cclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuNCBQcm9qZWN0IFRvcGljcyBbU3VwZXJ2aXNvcl1cclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgcHJvamVjdCB0b3BpY3MuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgUHJvamVjdFRvcGljcyA9ICBmdW5jdGlvbiBQcm9qZWN0VG9waWNzKCkge307XHJcblx0d2luZG93W1wiUHJvamVjdFRvcGljc1wiXSA9IFByb2plY3RUb3BpY3M7XHJcblxyXG5cdFByb2plY3RUb3BpY3MucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHRQcm9qZWN0VG9waWNzLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0QUREX1RPUElDX0lOUFVUOiAnI2FkZFRvcGljSW5wdXQnLFxyXG5cdFx0TkVXX1RPUElDX0lOUFVUX0NPTlRBSU5FUjogJyNuZXctdG9waWMtaW5wdXQtY29udGFpbmVyJyxcclxuXHR9O1xyXG5cclxuXHRQcm9qZWN0VG9waWNzLnByb3RvdHlwZS5LZXlzXyA9IHtcclxuXHRcdFNQQUNFOiAzMixcclxuXHRcdEVOVEVSOiAxMyxcclxuXHRcdENPTU1BOiA0NVxyXG5cdH07XHJcblxyXG5cdHZhciBwcm9qZWN0VG9waWNzID0gbmV3IFByb2plY3RUb3BpY3MoKTtcclxuXHJcblx0UHJvamVjdFRvcGljcy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0YWRkVG9waWNUb1Byb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljTmFtZSkge1xyXG5cdFx0XHQkKCcubG9hZGVyJykuc2hvdygwKTtcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSBcIi9wcm9qZWN0cy90b3BpYy1hZGRcIjtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR0eXBlOiBcIlBPU1RcIixcclxuXHRcdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0dG9waWNfbmFtZTogdG9waWNOYW1lLFxyXG5cdFx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0XHQkKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5BRERfVE9QSUNfSU5QVVQpLnZhbCgnJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYoJChcIi50b3BpY3MtbGlzdC5lZGl0IGxpLnRvcGljOmxhc3RcIikubGVuZ3RoID4gMCl7XHJcblx0XHRcdFx0XHRcdCQoXCIudG9waWNzLWxpc3QuZWRpdCBsaS50b3BpYzpsYXN0XCIpLmFmdGVyKCc8bGkgY2xhc3M9XCJ0b3BpY1wiIGRhdGEtdG9waWMtaWQ9XCInICsgcmVzcG9uc2VbXCJpZFwiXSArICdcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRvcGljLXJlbW92ZVwiPlg8L2J1dHRvbj48cCBjbGFzcz1cInRvcGljLW5hbWVcIj4nICsgcmVzcG9uc2VbXCJuYW1lXCJdICsgJzwvcD48L2xpPicpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JChcIi50b3BpY3MtbGlzdC5lZGl0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljIGZpcnN0XCIgZGF0YS10b3BpYy1pZD1cIicgKyByZXNwb25zZVtcImlkXCJdICsgJ1wiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidG9waWMtcmVtb3ZlXCI+WDwvYnV0dG9uPjxwIGNsYXNzPVwidG9waWMtbmFtZVwiPicgKyByZXNwb25zZVtcIm5hbWVcIl0gKyAnPC9wPjwvbGk+Jyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHQkKCdib2R5JykuYXBwZW5kKHJlc3BvbnNlKTtcclxuXHRcdFx0XHQkKCcubG9hZGVyJykuaGlkZSgwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJlbW92ZVRvcGljRnJvbVByb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljSWQpIHtcclxuXHRcdFx0JChcIi5sb2FkZXJcIikuc2hvdygwKTtcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSBcIi9wcm9qZWN0cy90b3BpYy1yZW1vdmVcIjtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR0eXBlOiBcIkRFTEVURVwiLFxyXG5cdFx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHR0b3BpY19pZCA6IHRvcGljSWQsXHJcblx0XHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkKFwiLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWNcIikuZWFjaChmdW5jdGlvbihpLCBvYmopIHtcclxuXHRcdFx0XHRcdFx0aWYoJCh0aGlzKS5kYXRhKFwidG9waWMtaWRcIikgPT0gdG9waWNJZCl7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoXCIubG9hZGVyXCIpLmhpZGUoMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHR1cGRhdGVQcm9qZWN0UHJpbWFyeVRvcGljOiBmdW5jdGlvbiAocHJvamVjdElkLCB0b3BpY0lkKSB7XHJcblx0XHRcdCQoXCIubG9hZGVyXCIpLnNob3coMCk7XHJcblx0XHRcdHZhciBhamF4VXJsID0gXCIvcHJvamVjdHMvdG9waWMtdXBkYXRlLXByaW1hcnlcIjtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdHRvcGljX2lkIDogdG9waWNJZCxcclxuXHRcdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCQoXCIjZWRpdFByb2plY3RGb3JtXCIpLmF0dHIoXCJkYXRhLXByb2plY3QtaWRcIiwgdG9waWNJZCk7XHJcblx0XHRcdFx0XHQkKFwiLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWNcIikuZWFjaChmdW5jdGlvbihpLCBvYmopIHtcclxuXHRcdFx0XHRcdFx0aWYoJCh0aGlzKS5kYXRhKFwidG9waWMtaWRcIikgPT0gdG9waWNJZCl7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcImZpcnN0XCIpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJmaXJzdFwiKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoXCIubG9hZGVyXCIpLmhpZGUoMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHR9O1xyXG5cclxuXHRjb25zdCBzd2FwcGFibGUgPSBuZXcgU3dhcHBhYmxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9waWNzLWxpc3QuZWRpdFwiKSwge1xyXG5cdFx0ZHJhZ2dhYmxlOiBcIi50b3BpY1wiLFxyXG5cdH0pO1xyXG5cclxuXHR3aW5kb3dbXCJzd2FwcGFibGVcIl0gPSBzd2FwcGFibGU7XHJcblxyXG5cdHN3YXBwYWJsZS5vbignc3dhcHBhYmxlOnN3YXBwZWQnLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHByb2plY3RJZCA9ICQoJyNlZGl0UHJvamVjdEZvcm0nKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHR2YXIgb3JpZ2luYWxQcmltYXJ5VG9waWNJZCA9ICQoJyNlZGl0UHJvamVjdEZvcm0nKS5kYXRhKCdwcmltYXJ5LXRvcGljLWlkJyk7XHJcblx0XHR2YXIgdG9waWNJZCA9ICQoXCIudG9waWNzLWxpc3QuZWRpdCBsaTpmaXJzdC1jaGlsZFwiKS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cclxuXHRcdGlmKHRvcGljSWQgIT0gb3JpZ2luYWxQcmltYXJ5VG9waWNJZCl7XHJcblx0XHRcdHByb2plY3RUb3BpY3MuZnVuY3Rpb25zLnVwZGF0ZVByb2plY3RQcmltYXJ5VG9waWMocHJvamVjdElkLCB0b3BpY0lkKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gQWRkIG5ldyB0b3BpY1xyXG5cdCQocHJvamVjdFRvcGljcy5TZWxlY3RvcnNfLkFERF9UT1BJQ19JTlBVVCkua2V5cHJlc3MoZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYgKGUud2hpY2ggPT0gcHJvamVjdFRvcGljcy5LZXlzXy5FTlRFUikge1xyXG5cdFx0XHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0XHRwcm9qZWN0VG9waWNzLmZ1bmN0aW9ucy5hZGRUb3BpY1RvUHJvamVjdChwcm9qZWN0SWQsICQodGhpcykudmFsKCkpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBSZW1vdmUgdG9waWNcclxuXHQkKCcudG9waWNzLWxpc3QuZWRpdCcpLm9uKCdjbGljaycsICcudG9waWMgLnRvcGljLXJlbW92ZScsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0dmFyIHRvcGljSWQgPSAkKHRoaXMpLnBhcmVudCgnbGknKS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdFx0cHJvamVjdFRvcGljcy5mdW5jdGlvbnMucmVtb3ZlVG9waWNGcm9tUHJvamVjdChwcm9qZWN0SWQsIHRvcGljSWQpO1xyXG5cdH0pO1xyXG5cclxuXHQkKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5ORVdfVE9QSUNfSU5QVVRfQ09OVEFJTkVSKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdCQocHJvamVjdFRvcGljcy5TZWxlY3RvcnNfLkFERF9UT1BJQ19JTlBVVCkuZm9jdXMoKTtcclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT1cclxuXHRcdE9USEVSXHJcblx0PT09PT09PT09PT0gKi9cclxuXHQkKCcuc3VwZXJ2aXNvci10YWJsZScpLm9uKCdjbGljaycsICcub2ZmZXItYWN0aW9uJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgYWN0aW9uQnV0dG9uID0gJCh0aGlzKTtcclxuXHRcdHZhciBhY3Rpb25UeXBlID0gYWN0aW9uQnV0dG9uLmRhdGEoJ2FjdGlvbi10eXBlJyk7XHJcblx0XHR2YXIgdGFibGVSb3cgPSBhY3Rpb25CdXR0b24ucGFyZW50cygpLmVxKDEpO1xyXG5cclxuXHRcdGFjdGlvbkJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHQkKCcubG9hZGVyJywgYWN0aW9uQnV0dG9uKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRpZihhY3Rpb25UeXBlID09PSBcImFjY2VwdFwiKXtcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N1cGVydmlzb3Ivc3R1ZGVudC1hY2NlcHQnO1xyXG5cdFx0fSBlbHNlIGlmIChhY3Rpb25UeXBlID09PSBcInJlamVjdFwiKXtcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N1cGVydmlzb3Ivc3R1ZGVudC1yZWplY3QnO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGFqYXhVcmwgPT0gbnVsbCl7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIHN1cGVydmlzb3IgYWN0aW9uLlwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRwcm9qZWN0X2lkIDogdGFibGVSb3cuZGF0YSgncHJvamVjdC1pZCcpLFxyXG5cdFx0XHRcdHN0dWRlbnRfaWQgOiB0YWJsZVJvdy5kYXRhKCdzdHVkZW50LWlkJylcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdGlmKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpe1xyXG5cdFx0XHRcdFx0dGFibGVSb3cuaGlkZSg0MDAsIGZ1bmN0aW9uKCkgeyB0YWJsZVJvdy5yZW1vdmUoKTsgfSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmKGFjdGlvblR5cGUgPT09IFwiYWNjZXB0XCIpe1xyXG5cdFx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1N0dWRlbnQgaGFzIGJlZW4gYWNjZXB0ZWQuJyk7XHJcblx0XHRcdFx0XHRcdHVwZGF0ZUFjY2VwdGVkU3R1ZGVudHNUYWJsZSgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhY3Rpb25UeXBlID09PSBcInJlamVjdFwiKXtcclxuXHRcdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignJywgJ1N0dWRlbnQgaGFzIGJlZW4gcmVqZWN0ZWQuJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJ2Vycm9yJywgcmVzcG9uc2UubWVzc2FnZSk7XHJcblx0XHRcdFx0XHRhY3Rpb25CdXR0b24uaHRtbChhY3Rpb25UeXBlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuc3VwZXJ2aXNvci10YWJsZScpLm9uKCdzdWJtaXQnLCAnZm9ybS5kZWxldGUtcHJvamVjdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHZhciBmb3JtID0gJCh0aGlzKTtcclxuXHRcdHZhciBwcm9qZWN0TmFtZSA9IGZvcm0uZGF0YSgncHJvamVjdC10aXRsZScpO1xyXG5cclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnRGVsZXRlJyxcclxuXHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPicgKyBwcm9qZWN0TmFtZSArICc8L2I+PycsXHJcblx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRjb25maXJtOiB7XHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdHVybDogZm9ybS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0XHRcdFx0XHR0eXBlOidERUxFVEUnLFxyXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocm93KXtcclxuXHRcdFx0XHRcdFx0XHRcdGZvcm0ucGFyZW50KCkucGFyZW50KCkucmVwbGFjZVdpdGgocm93KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2FuY2VsOiB7fSxcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5zdXBlcnZpc29yLXRhYmxlJykub24oJ3N1Ym1pdCcsICdmb3JtLnJlc3RvcmUtcHJvamVjdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHZhciBmb3JtID0gJCh0aGlzKTtcclxuXHRcdHZhciBwcm9qZWN0TmFtZSA9IGZvcm0uZGF0YSgncHJvamVjdC10aXRsZScpO1xyXG5cclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnUmVzdG9yZScsXHJcblx0XHRcdHR5cGU6ICdncmVlbicsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTMsM0E5LDkgMCAwLDAgNCwxMkgxTDQuODksMTUuODlMNC45NiwxNi4wM0w5LDEySDZBNyw3IDAgMCwxIDEzLDVBNyw3IDAgMCwxIDIwLDEyQTcsNyAwIDAsMSAxMywxOUMxMS4wNywxOSA5LjMyLDE4LjIxIDguMDYsMTYuOTRMNi42NCwxOC4zNkM4LjI3LDIwIDEwLjUsMjEgMTMsMjFBOSw5IDAgMCwwIDIyLDEyQTksOSAwIDAsMCAxMywzTTEyLDhWMTNMMTYuMjgsMTUuNTRMMTcsMTQuMzNMMTMuNSwxMi4yNVY4SDEyWlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZXN0b3JlIDxiPicgKyBwcm9qZWN0TmFtZSArICc8L2I+PycsXHJcblx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRjb25maXJtOiB7XHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ncmVlbicsXHJcblx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0dXJsOiBmb3JtLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHRcdFx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJvdyl7XHJcblx0XHRcdFx0XHRcdFx0XHRmb3JtLnBhcmVudCgpLnBhcmVudCgpLnJlcGxhY2VXaXRoKHJvdyk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNhbmNlbDoge30sXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuZXhwYW5kJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIGNvbnRlbnQgPSAkKHRoaXMpLnBhcmVudHMoKS5lcSgxKS5maW5kKCcuY29udGVudCcpO1xyXG5cclxuXHRcdGlmKGNvbnRlbnQuYXR0cihcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoXCJzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigwZGVnKVwiKTtcclxuXHRcdFx0Y29udGVudC5oaWRlKDIwMCk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHRcdFx0c2V0Q29va2llKGNvbnRlbnQuZGF0YShcImNvb2tpZS1uYW1lXCIpLCB0cnVlLCAzNjUpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdCQodGhpcykuZmluZChcInN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDE4MGRlZylcIik7XHJcblx0XHRcdGNvbnRlbnQuc2hvdygyMDApO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHRcdFx0c2V0Q29va2llKGNvbnRlbnQuZGF0YShcImNvb2tpZS1uYW1lXCIpLCBmYWxzZSwgMzY1KTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JCgnI3N1cGVydmlzb3ItYWNjZXB0ZWQtc3R1ZGVudHMtdGFibGUnKS5vbignY2xpY2snLCAnLnN1cGVydmlzb3ItdW5kby1hY2NlcHQnLCBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgdGFibGVSb3cgPSAkKHRoaXMpO1xyXG5cdFx0dmFyIHN0dWRlbnROYW1lID0gdGFibGVSb3cuZGF0YSgnc3R1ZGVudC1uYW1lJyk7XHJcblx0XHR2YXIgcHJvamVjdFRpdGxlID0gdGFibGVSb3cuZGF0YSgncHJvamVjdC10aXRsZScpO1xyXG5cclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnVW5kbyBQcm9qZWN0IFNlbGVjdGlvbicsXHJcblx0XHRcdHR5cGU6ICdyZWQnLFxyXG5cdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTEyLjUsOEM5Ljg1LDggNy40NSw5IDUuNiwxMC42TDIsN1YxNkgxMUw3LjM4LDEyLjM4QzguNzcsMTEuMjIgMTAuNTQsMTAuNSAxMi41LDEwLjVDMTYuMDQsMTAuNSAxOS4wNSwxMi44MSAyMC4xLDE2TDIyLjQ3LDE1LjIyQzIxLjA4LDExLjAzIDE3LjE1LDggMTIuNSw4WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byB1bi1hY2NlcHQgPGI+JyArIHN0dWRlbnROYW1lICsgJzwvYj4gZm9yIDxiPicgKyBwcm9qZWN0VGl0bGUgKyAnPC9iPiA/JyxcclxuXHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdGJ0bkNsYXNzOiAnYnRuLXJlZCcsXHJcblx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdHVybDogJy9zdXBlcnZpc29yL3N0dWRlbnQtdW5kbycsXHJcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0cHJvamVjdF9pZCA6IHRhYmxlUm93LmRhdGEoJ3Byb2plY3QtaWQnKSxcclxuXHRcdFx0XHRcdFx0XHRcdHN0dWRlbnRfaWQgOiB0YWJsZVJvdy5kYXRhKCdzdHVkZW50LWlkJylcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYocmVzcG9uc2Uuc3VjY2Vzc2Z1bCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRhYmxlUm93LmhpZGUoNDAwLCBmdW5jdGlvbigpIHsgdGFibGVSb3cucmVtb3ZlKCk7IH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1VuZG8gc3VjY2Vzc2Z1bC4nKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlQWNjZXB0ZWRTdHVkZW50c1RhYmxlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IHt9LFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHRcclxuXHRmdW5jdGlvbiB1cGRhdGVBY2NlcHRlZFN0dWRlbnRzVGFibGUoKXtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdHVybDogJy9zdXBlcnZpc29yL2FjY2VwdGVkLXN0dWRlbnRzLXRhYmxlJyxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0JChcIiNzdXBlcnZpc29yLWFjY2VwdGVkLXN0dWRlbnRzLXRhYmxlXCIpLmh0bWwoZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZpZXdzL3N1cGVydmlzb3IuanMiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIlN3YXBwYWJsZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTd2FwcGFibGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU3dhcHBhYmxlXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2MCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oNjIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbi8qKiovIH0pLFxuLyogMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ1KTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICgodHlwZW9mIGNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg5KTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5Myk7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IF9fd2VicGFja19yZXF1aXJlX18oNDUpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjMnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKiovIH0pLFxuLyogNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgc3RvcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMzKSgnd2tzJyk7XG52YXIgdWlkID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMik7XG52YXIgU3ltYm9sID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG4vKioqLyB9KSxcbi8qIDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKiovIH0pLFxuLyogNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcbnZhciBJRThfRE9NX0RFRklORSA9IF9fd2VicGFja19yZXF1aXJlX18oNDMpO1xudmFyIHRvUHJpbWl0aXZlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IF9fd2VicGFja19yZXF1aXJlX18oOSkgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG52YXIgY29yZSA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG52YXIgY3R4ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG52YXIgaGlkZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vKioqLyB9KSxcbi8qIDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhX193ZWJwYWNrX3JlcXVpcmVfXygxNSkoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKiovIH0pLFxuLyogMTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDExICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcxKTtcbnZhciBkZWZpbmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRQID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcbnZhciBjcmVhdGVEZXNjID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oOSkgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDEzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDE0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDE3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLyoqKi8gfSksXG4vKiAxOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk2KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQWJzdHJhY3RFdmVudDIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jbG9zZXN0ID0gdW5kZWZpbmVkO1xuXG52YXIgX2Nsb3Nlc3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExNyk7XG5cbnZhciBfY2xvc2VzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbG9zZXN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5jbG9zZXN0ID0gX2Nsb3Nlc3QyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMjAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9TZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzMCk7XG5cbnZhciBfU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlbnNvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9TZW5zb3IyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9TZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTMzKTtcblxuT2JqZWN0LmtleXMoX1NlbnNvckV2ZW50KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfU2Vuc29yRXZlbnRba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbi8qKiovIH0pLFxuLyogMjIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0Fic3RyYWN0UGx1Z2luID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTIpO1xuXG52YXIgX0Fic3RyYWN0UGx1Z2luMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0UGx1Z2luKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0Fic3RyYWN0UGx1Z2luMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDI0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNjUpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAyNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMjggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8qKiovIH0pLFxuLyogMjkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcbnZhciBkUHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcwKTtcbnZhciBlbnVtQnVnS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpO1xudmFyIElFX1BST1RPID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMikoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NCkoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIF9fd2VicGFja19yZXF1aXJlX18oNzQpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDMwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OSk7XG52YXIgZW51bUJ1Z0tleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAzMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAzMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgc2hhcmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMykoJ2tleXMnKTtcbnZhciB1aWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDMzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDM0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cbi8qKiovIH0pLFxuLyogMzUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRlZiA9IF9fd2VicGFja19yZXF1aXJlX18oNykuZjtcbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcbnZhciBUQUcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMzYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDM3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbmV4cG9ydHMuZiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblxuLyoqKi8gfSksXG4vKiAzOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcbnZhciBjb3JlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcbnZhciBMSUJSQVJZID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOCk7XG52YXIgd2tzRXh0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmIChuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKSBkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7IHZhbHVlOiB3a3NFeHQuZihuYW1lKSB9KTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAzOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5leHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vKioqLyB9KSxcbi8qIDQwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBwSUUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KTtcbnZhciBjcmVhdGVEZXNjID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XG52YXIgdG9JT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG52YXIgdG9QcmltaXRpdmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcbnZhciBJRThfRE9NX0RFRklORSA9IF9fd2VicGFja19yZXF1aXJlX18oNDMpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDQxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTE5KTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogNDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Td2FwcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNjEpO1xuXG5PYmplY3Qua2V5cyhfU3dhcHBhYmxlRXZlbnQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9Td2FwcGFibGVFdmVudFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxuLyoqKi8gfSksXG4vKiA0MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFfX3dlYnBhY2tfcmVxdWlyZV9fKDkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX3JlcXVpcmVfXyg0NCkoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKiovIH0pLFxuLyogNDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDQ1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY2KTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3OSk7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQ2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgJGF0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2OCkodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbl9fd2VicGFja19yZXF1aXJlX18oNDcpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG5cblxuLyoqKi8gfSksXG4vKiA0NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIExJQlJBUlkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KTtcbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcbnZhciByZWRlZmluZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDgpO1xudmFyIGhpZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcbnZhciBJdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcbnZhciAkaXRlckNyZWF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oNjkpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNSk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUxKTtcbnZhciBJVEVSQVRPUiA9IF9fd2VicGFja19yZXF1aXJlX18oNSkoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gKCFCVUdHWSAmJiAkbmF0aXZlKSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuLyoqKi8gfSksXG4vKiA0OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xuXG5cbi8qKiovIH0pLFxuLyogNDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGhhcyA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xudmFyIGFycmF5SW5kZXhPZiA9IF9fd2VicGFja19yZXF1aXJlX18oNzIpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDUwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLyoqKi8gfSksXG4vKiA1MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xudmFyIHRvT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNik7XG52YXIgSUVfUFJPVE8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogNTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vKioqLyB9KSxcbi8qIDUzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oNDkpO1xudmFyIGhpZGRlbktleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiA1NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcbnZhciBjb3JlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcbnZhciBmYWlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiA1NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0RyYWdFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTA2KTtcblxuT2JqZWN0LmtleXMoX0RyYWdFdmVudCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0RyYWdFdmVudFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxuLyoqKi8gfSksXG4vKiA1NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0RyYWdnYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDcpO1xuXG5PYmplY3Qua2V5cyhfRHJhZ2dhYmxlRXZlbnQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9EcmFnZ2FibGVFdmVudFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxuLyoqKi8gfSksXG4vKiA1NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX01pcnJvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDgpO1xuXG5PYmplY3Qua2V5cyhfTWlycm9yRXZlbnQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9NaXJyb3JFdmVudFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxuLyoqKi8gfSksXG4vKiA1OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX01pcnJvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTA5KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdNaXJyb3InLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9NaXJyb3IpLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdkZWZhdWx0TWlycm9yT3B0aW9ucycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9NaXJyb3IuZGVmYXVsdE9wdGlvbnM7XG4gIH1cbn0pO1xuXG52YXIgX0Fubm91bmNlbWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEzKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdBbm5vdW5jZW1lbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Bbm5vdW5jZW1lbnQpLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdkZWZhdWx0QW5ub3VuY2VtZW50T3B0aW9ucycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Bbm5vdW5jZW1lbnQuZGVmYXVsdE9wdGlvbnM7XG4gIH1cbn0pO1xuXG52YXIgX1Njcm9sbGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExNSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU2Nyb2xsYWJsZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Njcm9sbGFibGUpLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdkZWZhdWx0U2Nyb2xsYWJsZU9wdGlvbnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU2Nyb2xsYWJsZS5kZWZhdWx0T3B0aW9ucztcbiAgfVxufSk7XG5cbnZhciBfQWNjZXNzaWJpbGl0eSA9IF9fd2VicGFja19yZXF1aXJlX18oMTI4KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdBY2Nlc3NpYmlsaXR5Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWNjZXNzaWJpbGl0eSkuZGVmYXVsdDtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKiovIH0pLFxuLyogNTkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9TZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTZW5zb3InLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZW5zb3IpLmRlZmF1bHQ7XG4gIH1cbn0pO1xuXG52YXIgX01vdXNlU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzEpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ01vdXNlU2Vuc29yJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTW91c2VTZW5zb3IpLmRlZmF1bHQ7XG4gIH1cbn0pO1xuXG52YXIgX1RvdWNoU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzQpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1RvdWNoU2Vuc29yJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG91Y2hTZW5zb3IpLmRlZmF1bHQ7XG4gIH1cbn0pO1xuXG52YXIgX0RyYWdTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzNik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ1NlbnNvcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdTZW5zb3IpLmRlZmF1bHQ7XG4gIH1cbn0pO1xuXG52YXIgX0ZvcmNlVG91Y2hTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzOCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRm9yY2VUb3VjaFNlbnNvcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZvcmNlVG91Y2hTZW5zb3IpLmRlZmF1bHQ7XG4gIH1cbn0pO1xuXG52YXIgX1NlbnNvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XG5cbk9iamVjdC5rZXlzKF9TZW5zb3JFdmVudCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX1NlbnNvckV2ZW50W2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKioqLyB9KSxcbi8qIDYwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfU3dhcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKTtcblxuT2JqZWN0LmtleXMoX1N3YXBwYWJsZUV2ZW50KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfU3dhcHBhYmxlRXZlbnRba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBfU3dhcHBhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5Nyk7XG5cbnZhciBfU3dhcHBhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N3YXBwYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Td2FwcGFibGUyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogNjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU3dhcHBhYmxlU3RvcEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTd2FwcGVkRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN3YXBFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3RhcnRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBzd2FwcGFibGUgZXZlbnRcbiAqIEBjbGFzcyBTd2FwcGFibGVFdmVudFxuICogQG1vZHVsZSBTd2FwcGFibGVFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgU3dhcHBhYmxlRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTd2FwcGFibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBkcmFnIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoaXMgc3dhcHBhYmxlIGV2ZW50XG4gICAgICogQHByb3BlcnR5IGRyYWdFdmVudFxuICAgICAqIEB0eXBlIHtEcmFnRXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZUV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogU3dhcHBhYmxlIHN0YXJ0IGV2ZW50XG4gKiBAY2xhc3MgU3dhcHBhYmxlU3RhcnRFdmVudFxuICogQG1vZHVsZSBTd2FwcGFibGVTdGFydEV2ZW50XG4gKiBAZXh0ZW5kcyBTd2FwcGFibGVFdmVudFxuICovXG5cblxuU3dhcHBhYmxlRXZlbnQudHlwZSA9ICdzd2FwcGFibGUnO1xuXG52YXIgU3dhcHBhYmxlU3RhcnRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3RhcnRFdmVudCA9IGZ1bmN0aW9uIChfU3dhcHBhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3RhcnRFdmVudCwgX1N3YXBwYWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTdGFydEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZVN0YXJ0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGVTdGFydEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3RhcnRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIFN3YXBwYWJsZVN0YXJ0RXZlbnQ7XG59KFN3YXBwYWJsZUV2ZW50KTtcblxuLyoqXG4gKiBTd2FwcGFibGUgc3dhcCBldmVudFxuICogQGNsYXNzIFN3YXBwYWJsZVN3YXBFdmVudFxuICogQG1vZHVsZSBTd2FwcGFibGVTd2FwRXZlbnRcbiAqIEBleHRlbmRzIFN3YXBwYWJsZUV2ZW50XG4gKi9cblxuXG5Td2FwcGFibGVTdGFydEV2ZW50LnR5cGUgPSAnc3dhcHBhYmxlOnN0YXJ0JztcblN3YXBwYWJsZVN0YXJ0RXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBTd2FwcGFibGVTd2FwRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN3YXBFdmVudCA9IGZ1bmN0aW9uIChfU3dhcHBhYmxlRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZVN3YXBFdmVudCwgX1N3YXBwYWJsZUV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlU3dhcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZVN3YXBFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZVN3YXBFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZVN3YXBFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3dhcHBhYmxlU3dhcEV2ZW50LCBbe1xuICAgIGtleTogJ292ZXInLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgZWxlbWVudCB5b3UgYXJlIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyIHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlckNvbnRhaW5lcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZVN3YXBFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG4vKipcbiAqIFN3YXBwYWJsZSBzd2FwcGVkIGV2ZW50XG4gKiBAY2xhc3MgU3dhcHBhYmxlU3dhcHBlZEV2ZW50XG4gKiBAbW9kdWxlIFN3YXBwYWJsZVN3YXBwZWRFdmVudFxuICogQGV4dGVuZHMgU3dhcHBhYmxlRXZlbnRcbiAqL1xuXG5cblN3YXBwYWJsZVN3YXBFdmVudC50eXBlID0gJ3N3YXBwYWJsZTpzd2FwJztcblN3YXBwYWJsZVN3YXBFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIFN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3dhcHBlZEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQzKTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTd2FwcGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3dhcHBlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3dhcHBlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3dhcHBlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTd2FwcGFibGVTd2FwcGVkRXZlbnQsIFt7XG4gICAga2V5OiAnc3dhcHBlZEVsZW1lbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJhZ2dhYmxlIGVsZW1lbnQgdGhhdCB5b3Ugc3dhcHBlZCB3aXRoXG4gICAgICogQHByb3BlcnR5IHN3YXBwZWRFbGVtZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zd2FwcGVkRWxlbWVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZVN3YXBwZWRFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG4vKipcbiAqIFN3YXBwYWJsZSBzdG9wIGV2ZW50XG4gKiBAY2xhc3MgU3dhcHBhYmxlU3RvcEV2ZW50XG4gKiBAbW9kdWxlIFN3YXBwYWJsZVN0b3BFdmVudFxuICogQGV4dGVuZHMgU3dhcHBhYmxlRXZlbnRcbiAqL1xuXG5cblN3YXBwYWJsZVN3YXBwZWRFdmVudC50eXBlID0gJ3N3YXBwYWJsZTpzd2FwcGVkJztcblxudmFyIFN3YXBwYWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3RvcEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3RvcEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQ0KTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTdG9wRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3RvcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3RvcEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3RvcEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gU3dhcHBhYmxlU3RvcEV2ZW50O1xufShTd2FwcGFibGVFdmVudCk7XG5cblN3YXBwYWJsZVN0b3BFdmVudC50eXBlID0gJ3N3YXBwYWJsZTpzdG9wJztcblxuLyoqKi8gfSksXG4vKiA2MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oNjMpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogNjMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg2NCk7XG52YXIgJE9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oNCkuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDY0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFfX3dlYnBhY2tfcmVxdWlyZV9fKDkpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogX193ZWJwYWNrX3JlcXVpcmVfXyg3KS5mIH0pO1xuXG5cbi8qKiovIH0pLFxuLyogNjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogNjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDY3KSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDY3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oNDYpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyg3NSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpLmYoJ2l0ZXJhdG9yJyk7XG5cblxuLyoqKi8gfSksXG4vKiA2OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNik7XG52YXIgZGVmaW5lZCA9IF9fd2VicGFja19yZXF1aXJlX18oMjcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDY5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY3JlYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOSk7XG52YXIgZGVzY3JpcHRvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNSk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbl9fd2VicGFja19yZXF1aXJlX18oMTIpKEl0ZXJhdG9yUHJvdG90eXBlLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDcwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkUCA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcbnZhciBnZXRLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMCk7XG5cbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDcxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMSk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiA3MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xudmFyIHRvTGVuZ3RoID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MCk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3Myk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDczICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciB0b0ludGVnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiA3NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuLyoqKi8gfSksXG4vKiA3NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDc2KTtcbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xudmFyIGhpZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcbnZhciBJdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcbnZhciBUT19TVFJJTkdfVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KSgndG9TdHJpbmdUYWcnKTtcblxudmFyIERPTUl0ZXJhYmxlcyA9ICgnQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCwnICtcbiAgJ0RPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsJyArXG4gICdNZWRpYUxpc3QsTWltZVR5cGVBcnJheSxOYW1lZE5vZGVNYXAsTm9kZUxpc3QsUGFpbnRSZXF1ZXN0TGlzdCxQbHVnaW4sUGx1Z2luQXJyYXksU1ZHTGVuZ3RoTGlzdCxTVkdOdW1iZXJMaXN0LCcgK1xuICAnU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsJyArXG4gICdUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdCcpLnNwbGl0KCcsJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgRE9NSXRlcmFibGVzLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBOQU1FID0gRE9NSXRlcmFibGVzW2ldO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG4vKioqLyB9KSxcbi8qIDc2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IF9fd2VicGFja19yZXF1aXJlX18oNzcpO1xudmFyIHN0ZXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc4KTtcbnZhciBJdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcbnZhciB0b0lPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cbi8qKiovIH0pLFxuLyogNzcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cblxuLyoqKi8gfSksXG4vKiA3OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDc5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg4MCksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA4MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDgxKTtcbl9fd2VicGFja19yZXF1aXJlX18oODYpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyg4Nyk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDg4KTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5TeW1ib2w7XG5cblxuLyoqKi8gfSksXG4vKiA4MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG52YXIgaGFzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG52YXIgREVTQ1JJUFRPUlMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xudmFyICRleHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xudmFyIHJlZGVmaW5lID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OCk7XG52YXIgTUVUQSA9IF9fd2VicGFja19yZXF1aXJlX18oODIpLktFWTtcbnZhciAkZmFpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcbnZhciBzaGFyZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMzKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzUpO1xudmFyIHVpZCA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpO1xudmFyIHdrcyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG52YXIgd2tzRXh0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNyk7XG52YXIgd2tzRGVmaW5lID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOCk7XG52YXIgZW51bUtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgzKTtcbnZhciBpc0FycmF5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NCk7XG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xudmFyIHRvUHJpbWl0aXZlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG52YXIgY3JlYXRlRGVzYyA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xudmFyIF9jcmVhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KTtcbnZhciBnT1BORXh0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NSk7XG52YXIgJEdPUEQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKTtcbnZhciAkRFAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xudmFyICRrZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMCk7XG52YXIgZ09QRCA9ICRHT1BELmY7XG52YXIgZFAgPSAkRFAuZjtcbnZhciBnT1BOID0gZ09QTkV4dC5mO1xudmFyICRTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyICRKU09OID0gZ2xvYmFsLkpTT047XG52YXIgX3N0cmluZ2lmeSA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBISURERU4gPSB3a3MoJ19oaWRkZW4nKTtcbnZhciBUT19QUklNSVRJVkUgPSB3a3MoJ3RvUHJpbWl0aXZlJyk7XG52YXIgaXNFbnVtID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpO1xudmFyIEFsbFN5bWJvbHMgPSBzaGFyZWQoJ3N5bWJvbHMnKTtcbnZhciBPUFN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdFtQUk9UT1RZUEVdO1xudmFyIFVTRV9OQVRJVkUgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xudmFyIFFPYmplY3QgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkUCh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoaXQsIGtleSwgRCkge1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYgKHByb3RvRGVzYykgZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZiAocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bykgZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnKSB7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKSB7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8pICRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSkge1xuICAgIGlmICghRC5lbnVtZXJhYmxlKSB7XG4gICAgICBpZiAoIWhhcyhpdCwgSElEREVOKSkgZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pIGl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwgeyBlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKSB9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKSB7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbCA9IGtleXMubGVuZ3RoO1xuICB2YXIga2V5O1xuICB3aGlsZSAobCA+IGkpICRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApIHtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpIHtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIGl0ID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmIChEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIEQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgdmFyIG5hbWVzID0gZ09QTih0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gIHZhciBJU19PUCA9IGl0ID09PSBPYmplY3RQcm90bztcbiAgdmFyIG5hbWVzID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKSByZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmICghVVNFX05BVElWRSkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90bykgJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIHNldHRlcikgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0IH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgX193ZWJwYWNrX3JlcXVpcmVfXyg1MykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KS5mID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgIV9fd2VicGFja19yZXF1aXJlX18oMjgpKSB7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBTeW1ib2w6ICRTeW1ib2wgfSk7XG5cbmZvciAodmFyIGVzNlN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaiA9IDA7IGVzNlN5bWJvbHMubGVuZ3RoID4gajspd2tzKGVzNlN5bWJvbHNbaisrXSk7XG5cbmZvciAodmFyIHdlbGxLbm93blN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBrID0gMDsgd2VsbEtub3duU3ltYm9scy5sZW5ndGggPiBrOykgd2tzRGVmaW5lKHdlbGxLbm93blN5bWJvbHNbaysrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBUeXBlRXJyb3Ioc3ltICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gICAgZm9yICh2YXIga2V5IGluIFN5bWJvbFJlZ2lzdHJ5KSBpZiAoU3ltYm9sUmVnaXN0cnlba2V5XSA9PT0gc3ltKSByZXR1cm4ga2V5O1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoeyBhOiBTIH0pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkge1xuICAgIHZhciBhcmdzID0gW2l0XTtcbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgICRyZXBsYWNlciA9IHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgaWYgKCFpc0FycmF5KHJlcGxhY2VyKSkgcmVwbGFjZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiAkcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgX193ZWJwYWNrX3JlcXVpcmVfXygxMikoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cblxuLyoqKi8gfSksXG4vKiA4MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgTUVUQSA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcbnZhciBzZXREZXNjID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KS5mO1xudmFyIGlkID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gKGl0KSB7XG4gIHNldERlc2MoaXQsIE1FVEEsIHsgdmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSkgc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6IE1FVEEsXG4gIE5FRUQ6IGZhbHNlLFxuICBmYXN0S2V5OiBmYXN0S2V5LFxuICBnZXRXZWFrOiBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG5cblxuLyoqKi8gfSksXG4vKiA4MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKTtcbnZhciBnT1BTID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Mik7XG52YXIgcElFID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gZ2V0S2V5cyhpdCk7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZiAoZ2V0U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdCk7XG4gICAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChzeW1ib2xzLmxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDg0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMSk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogODUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xudmFyIGdPUE4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUzKS5mO1xudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiA4NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cblxuLyoqKi8gfSksXG4vKiA4NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDM4KSgnYXN5bmNJdGVyYXRvcicpO1xuXG5cbi8qKiovIH0pLFxuLyogODggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygzOCkoJ29ic2VydmFibGUnKTtcblxuXG4vKioqLyB9KSxcbi8qIDg5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg5MCksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA5MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDkxKTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cblxuLyoqKi8gfSksXG4vKiA5MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IHNldFByb3RvdHlwZU9mOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDkyKS5zZXQgfSk7XG5cblxuLyoqKi8gfSksXG4vKiA5MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcbnZhciBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpKEZ1bmN0aW9uLmNhbGwsIF9fd2VicGFja19yZXF1aXJlX18oNDApLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaCAoZSkgeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmIChidWdneSkgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG5cbi8qKiovIH0pLFxuLyogOTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDk0KSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDk0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oOTUpO1xudmFyICRPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpIHtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDk1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IGNyZWF0ZTogX193ZWJwYWNrX3JlcXVpcmVfXygyOSkgfSk7XG5cblxuLyoqKi8gfSksXG4vKiA5NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBfY2FuY2VsZWQgPSBTeW1ib2woJ2NhbmNlbGVkJyk7XG5cbi8qKlxuICogQWxsIGV2ZW50cyBmaXJlZCBieSBkcmFnZ2FibGUgaW5oZXJpdCB0aGlzIGNsYXNzLiBZb3UgY2FuIGNhbGwgYGNhbmNlbCgpYCB0b1xuICogY2FuY2VsIGEgc3BlY2lmaWMgZXZlbnQgb3IgeW91IGNhbiBjaGVjayBpZiBhbiBldmVudCBoYXMgYmVlbiBjYW5jZWxlZCBieVxuICogY2FsbGluZyBgY2FuY2VsZWQoKWAuXG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBBYnN0cmFjdEV2ZW50XG4gKiBAbW9kdWxlIEFic3RyYWN0RXZlbnRcbiAqL1xuXG52YXIgQWJzdHJhY3RFdmVudCA9IGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogQWJzdHJhY3RFdmVudCBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgQWJzdHJhY3RFdmVudFxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIEV2ZW50IGRhdGFcbiAgICovXG5cblxuICAvKipcbiAgICogRXZlbnQgdHlwZVxuICAgKiBAc3RhdGljXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcHJvcGVydHkgdHlwZVxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gQWJzdHJhY3RFdmVudChkYXRhKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQWJzdHJhY3RFdmVudCk7XG5cbiAgICB0aGlzW19jYW5jZWxlZF0gPSBmYWxzZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWQtb25seSB0eXBlXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIEV2ZW50IGNhbmNlbGFibGVcbiAgICogQHN0YXRpY1xuICAgKiBAYWJzdHJhY3RcbiAgICogQHByb3BlcnR5IGNhbmNlbGFibGVcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQWJzdHJhY3RFdmVudCwgW3tcbiAgICBrZXk6ICdjYW5jZWwnLFxuXG5cbiAgICAvKipcbiAgICAgKiBDYW5jZWxzIHRoZSBldmVudCBpbnN0YW5jZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICB0aGlzW19jYW5jZWxlZF0gPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGV2ZW50IGhhcyBiZWVuIGNhbmNlbGVkXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2FuY2VsZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5jZWxlZCgpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXNbX2NhbmNlbGVkXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndHlwZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQtb25seSBjYW5jZWxhYmxlXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2FuY2VsYWJsZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jYW5jZWxhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQWJzdHJhY3RFdmVudDtcbn0oKTtcblxuQWJzdHJhY3RFdmVudC50eXBlID0gJ2V2ZW50JztcbkFic3RyYWN0RXZlbnQuY2FuY2VsYWJsZSA9IGZhbHNlO1xuZXhwb3J0cy5kZWZhdWx0ID0gQWJzdHJhY3RFdmVudDtcblxuLyoqKi8gfSksXG4vKiA5NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2dldDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk4KTtcblxudmFyIF9nZXQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0Mik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0RyYWdnYWJsZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwNSk7XG5cbnZhciBfRHJhZ2dhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdnYWJsZTIpO1xuXG52YXIgX1N3YXBwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkRyYWdTdGFydCA9IFN5bWJvbCgnb25EcmFnU3RhcnQnKTtcbnZhciBvbkRyYWdPdmVyID0gU3ltYm9sKCdvbkRyYWdPdmVyJyk7XG52YXIgb25EcmFnU3RvcCA9IFN5bWJvbCgnb25EcmFnU3RvcCcpO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYW5ub3VuY2VtZW50IG1lc3NhZ2Ugd2hlbiB0aGUgRHJhZ2dhYmxlIGVsZW1lbnQgaXMgc3dhcHBlZCB3aXRoIGFub3RoZXIgZHJhZ2dhYmxlIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3dhcHBhYmxlU3dhcHBlZEV2ZW50fSBzd2FwcGFibGVFdmVudFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBvblN3YXBwYWJsZVN3YXBwZWREZWZhdWx0QW5ub3VuY2VtZW50KF9yZWYpIHtcbiAgdmFyIGRyYWdFdmVudCA9IF9yZWYuZHJhZ0V2ZW50LFxuICAgICAgc3dhcHBlZEVsZW1lbnQgPSBfcmVmLnN3YXBwZWRFbGVtZW50O1xuXG4gIHZhciBzb3VyY2VUZXh0ID0gZHJhZ0V2ZW50LnNvdXJjZS50ZXh0Q29udGVudC50cmltKCkgfHwgZHJhZ0V2ZW50LnNvdXJjZS5pZCB8fCAnc3dhcHBhYmxlIGVsZW1lbnQnO1xuICB2YXIgb3ZlclRleHQgPSBzd2FwcGVkRWxlbWVudC50ZXh0Q29udGVudC50cmltKCkgfHwgc3dhcHBlZEVsZW1lbnQuaWQgfHwgJ3N3YXBwYWJsZSBlbGVtZW50JztcblxuICByZXR1cm4gJ1N3YXBwZWQgJyArIHNvdXJjZVRleHQgKyAnIHdpdGggJyArIG92ZXJUZXh0O1xufVxuXG4vKipcbiAqIEBjb25zdCB7T2JqZWN0fSBkZWZhdWx0QW5ub3VuY2VtZW50c1xuICogQGNvbnN0IHtGdW5jdGlvbn0gZGVmYXVsdEFubm91bmNlbWVudHNbJ3N3YXBwYWJsZWQ6c3dhcHBlZCddXG4gKi9cbnZhciBkZWZhdWx0QW5ub3VuY2VtZW50cyA9IHtcbiAgJ3N3YXBwYWJsZWQ6c3dhcHBlZCc6IG9uU3dhcHBhYmxlU3dhcHBlZERlZmF1bHRBbm5vdW5jZW1lbnRcbn07XG5cbi8qKlxuICogU3dhcHBhYmxlIGlzIGJ1aWx0IG9uIHRvcCBvZiBEcmFnZ2FibGUgYW5kIGFsbG93cyBzd2FwcGluZyBvZiBkcmFnZ2FibGUgZWxlbWVudHMuXG4gKiBPcmRlciBpcyBpcnJlbGV2YW50IHRvIFN3YXBwYWJsZS5cbiAqIEBjbGFzcyBTd2FwcGFibGVcbiAqIEBtb2R1bGUgU3dhcHBhYmxlXG4gKiBAZXh0ZW5kcyBEcmFnZ2FibGVcbiAqL1xuXG52YXIgU3dhcHBhYmxlID0gZnVuY3Rpb24gKF9EcmFnZ2FibGUpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlLCBfRHJhZ2dhYmxlKTtcblxuICAvKipcbiAgICogU3dhcHBhYmxlIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBTd2FwcGFibGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gU3dhcHBhYmxlIGNvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBTd2FwcGFibGVcbiAgICovXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZSk7XG5cbiAgICAvKipcbiAgICAgKiBMYXN0IGRyYWdnYWJsZSBlbGVtZW50IHRoYXQgd2FzIGRyYWdnZWQgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBsYXN0T3ZlclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGUpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgIGFubm91bmNlbWVudHM6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRBbm5vdW5jZW1lbnRzLCBvcHRpb25zLmFubm91bmNlbWVudHMgfHwge30pXG4gICAgfSkpKTtcblxuICAgIF90aGlzLmxhc3RPdmVyID0gbnVsbDtcblxuICAgIF90aGlzW29uRHJhZ1N0YXJ0XSA9IF90aGlzW29uRHJhZ1N0YXJ0XS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdPdmVyXSA9IF90aGlzW29uRHJhZ092ZXJdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ1N0b3BdID0gX3RoaXNbb25EcmFnU3RvcF0uYmluZChfdGhpcyk7XG5cbiAgICBfdGhpcy5vbignZHJhZzpzdGFydCcsIF90aGlzW29uRHJhZ1N0YXJ0XSkub24oJ2RyYWc6b3ZlcicsIF90aGlzW29uRHJhZ092ZXJdKS5vbignZHJhZzpzdG9wJywgX3RoaXNbb25EcmFnU3RvcF0pO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBTd2FwcGFibGUgaW5zdGFuY2UuXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3dhcHBhYmxlLCBbe1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgKDAsIF9nZXQzLmRlZmF1bHQpKFN3YXBwYWJsZS5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGUucHJvdG90eXBlKSwgJ2Rlc3Ryb3knLCB0aGlzKS5jYWxsKHRoaXMpO1xuXG4gICAgICB0aGlzLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdGFydCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdTdGFydEV2ZW50fSBldmVudCAtIERyYWcgc3RhcnQgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdGFydCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBzd2FwcGFibGVTdGFydEV2ZW50ID0gbmV3IF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTdGFydEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzd2FwcGFibGVTdGFydEV2ZW50KTtcblxuICAgICAgaWYgKHN3YXBwYWJsZVN0YXJ0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIG92ZXIgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnT3ZlckV2ZW50fSBldmVudCAtIERyYWcgb3ZlciBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ092ZXIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQub3ZlciA9PT0gZXZlbnQub3JpZ2luYWxTb3VyY2UgfHwgZXZlbnQub3ZlciA9PT0gZXZlbnQuc291cmNlIHx8IGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3dhcHBhYmxlU3dhcEV2ZW50ID0gbmV3IF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTd2FwRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBvdmVyOiBldmVudC5vdmVyLFxuICAgICAgICBvdmVyQ29udGFpbmVyOiBldmVudC5vdmVyQ29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHN3YXBwYWJsZVN3YXBFdmVudCk7XG5cbiAgICAgIGlmIChzd2FwcGFibGVTd2FwRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHN3YXAgb3JpZ2luYWxseSBzd2FwcGVkIGVsZW1lbnQgYmFja1xuICAgICAgaWYgKHRoaXMubGFzdE92ZXIgJiYgdGhpcy5sYXN0T3ZlciAhPT0gZXZlbnQub3Zlcikge1xuICAgICAgICBzd2FwKHRoaXMubGFzdE92ZXIsIGV2ZW50LnNvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxhc3RPdmVyID09PSBldmVudC5vdmVyKSB7XG4gICAgICAgIHRoaXMubGFzdE92ZXIgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sYXN0T3ZlciA9IGV2ZW50Lm92ZXI7XG4gICAgICB9XG5cbiAgICAgIHN3YXAoZXZlbnQuc291cmNlLCBldmVudC5vdmVyKTtcblxuICAgICAgdmFyIHN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IG5ldyBfU3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3dhcHBlZEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgc3dhcHBlZEVsZW1lbnQ6IGV2ZW50Lm92ZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc3dhcHBhYmxlU3dhcHBlZEV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0b3AgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnU3RvcEV2ZW50fSBldmVudCAtIERyYWcgc3RvcCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0b3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgc3dhcHBhYmxlU3RvcEV2ZW50ID0gbmV3IF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTdG9wRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHN3YXBwYWJsZVN0b3BFdmVudCk7XG4gICAgICB0aGlzLmxhc3RPdmVyID0gbnVsbDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZTtcbn0oX0RyYWdnYWJsZTMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN3YXBwYWJsZTtcblxuXG5mdW5jdGlvbiB3aXRoVGVtcEVsZW1lbnQoY2FsbGJhY2spIHtcbiAgdmFyIHRtcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2FsbGJhY2sodG1wRWxlbWVudCk7XG4gIHRtcEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0bXBFbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gc3dhcChzb3VyY2UsIG92ZXIpIHtcbiAgdmFyIG92ZXJQYXJlbnQgPSBvdmVyLnBhcmVudE5vZGU7XG4gIHZhciBzb3VyY2VQYXJlbnQgPSBzb3VyY2UucGFyZW50Tm9kZTtcblxuICB3aXRoVGVtcEVsZW1lbnQoZnVuY3Rpb24gKHRtcEVsZW1lbnQpIHtcbiAgICBzb3VyY2VQYXJlbnQuaW5zZXJ0QmVmb3JlKHRtcEVsZW1lbnQsIHNvdXJjZSk7XG4gICAgb3ZlclBhcmVudC5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyKTtcbiAgICBzb3VyY2VQYXJlbnQuaW5zZXJ0QmVmb3JlKG92ZXIsIHRtcEVsZW1lbnQpO1xuICB9KTtcbn1cblxuLyoqKi8gfSksXG4vKiA5OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2dldFByb3RvdHlwZU9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5OSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2dldE93blByb3BlcnR5RGVzY3JpcHRvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTAyKTtcblxudmFyIF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGRlc2MgPSAoMCwgX2dldE93blByb3BlcnR5RGVzY3JpcHRvcjIuZGVmYXVsdCkob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShvYmplY3QpO1xuXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7XG4gICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O1xuXG4gICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogOTkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwMCksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiAxMDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygxMDEpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuXG4vKioqLyB9KSxcbi8qIDEwMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpO1xudmFyICRnZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oNTEpO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDU0KSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cbi8qKiovIH0pLFxuLyogMTAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXygxMDMpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogMTAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMTA0KTtcbnZhciAkT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIHJldHVybiAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAxMDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKS5mO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDU0KSgnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7XG5cblxuLyoqKi8gfSksXG4vKiAxMDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9EcmFnRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU1KTtcblxuT2JqZWN0LmtleXMoX0RyYWdFdmVudCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0RyYWdFdmVudFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9EcmFnZ2FibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTYpO1xuXG5PYmplY3Qua2V5cyhfRHJhZ2dhYmxlRXZlbnQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9EcmFnZ2FibGVFdmVudFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9NaXJyb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTcpO1xuXG5PYmplY3Qua2V5cyhfTWlycm9yRXZlbnQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9NaXJyb3JFdmVudFtrZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9QbHVnaW5zID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OCk7XG5cbk9iamVjdC5rZXlzKF9QbHVnaW5zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfUGx1Z2luc1trZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9TZW5zb3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OSk7XG5cbk9iamVjdC5rZXlzKF9TZW5zb3JzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIgfHwga2V5ID09PSBcIl9fZXNNb2R1bGVcIikgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfU2Vuc29yc1trZXldO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIF9EcmFnZ2FibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0MCk7XG5cbnZhciBfRHJhZ2dhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdnYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9EcmFnZ2FibGUyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRyYWdTdG9wRXZlbnQgPSBleHBvcnRzLkRyYWdQcmVzc3VyZUV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0Q29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdXRFdmVudCA9IGV4cG9ydHMuRHJhZ092ZXJFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0RXZlbnQgPSBleHBvcnRzLkRyYWdFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIGRyYWcgZXZlbnRcbiAqIEBjbGFzcyBEcmFnRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ0V2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBEcmFnRXZlbnQgPSBleHBvcnRzLkRyYWdFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ0V2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ0V2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ0V2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnRXZlbnQsIFt7XG4gICAga2V5OiAnaGFzTWlycm9yJyxcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIG1pcnJvciBoYXMgYmVlbiBjcmVhdGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzTWlycm9yKCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5taXJyb3IpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NvdXJjZScsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgc291cmNlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgc291cmNlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBvcmlnaW5hbCBzb3VyY2UgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBvcmlnaW5hbFNvdXJjZVxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3JpZ2luYWxTb3VyY2UnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vcmlnaW5hbFNvdXJjZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIG1pcnJvciBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG1pcnJvclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbWlycm9yJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubWlycm9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgc291cmNlIGNvbnRhaW5lciBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IHNvdXJjZUNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc291cmNlQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbnNvciBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBzZW5zb3JFdmVudFxuICAgICAqIEB0eXBlIHtTZW5zb3JFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29yRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zZW5zb3JFdmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBldmVudCB0aGF0IHRyaWdnZXJlZCBzZW5zb3IgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgb3JpZ2luYWxFdmVudFxuICAgICAqIEB0eXBlIHtFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3JpZ2luYWxFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBpZiAodGhpcy5zZW5zb3JFdmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIERyYWcgc3RhcnQgZXZlbnRcbiAqIEBjbGFzcyBEcmFnU3RhcnRFdmVudFxuICogQG1vZHVsZSBEcmFnU3RhcnRFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnRXZlbnQudHlwZSA9ICdkcmFnJztcblxudmFyIERyYWdTdGFydEV2ZW50ID0gZXhwb3J0cy5EcmFnU3RhcnRFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTdGFydEV2ZW50LCBfRHJhZ0V2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnU3RhcnRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RhcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdGFydEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0YXJ0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RhcnRFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIG1vdmUgZXZlbnRcbiAqIEBjbGFzcyBEcmFnTW92ZUV2ZW50XG4gKiBAbW9kdWxlIERyYWdNb3ZlRXZlbnRcbiAqIEBleHRlbmRzIERyYWdFdmVudFxuICovXG5cblxuRHJhZ1N0YXJ0RXZlbnQudHlwZSA9ICdkcmFnOnN0YXJ0JztcbkRyYWdTdGFydEV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgRHJhZ01vdmVFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnTW92ZUV2ZW50LCBfRHJhZ0V2ZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJhZ01vdmVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnTW92ZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ01vdmVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdNb3ZlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnTW92ZUV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgb3ZlciBldmVudFxuICogQGNsYXNzIERyYWdPdmVyRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ092ZXJFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnTW92ZUV2ZW50LnR5cGUgPSAnZHJhZzptb3ZlJztcblxudmFyIERyYWdPdmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ092ZXJFdmVudCwgX0RyYWdFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ092ZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3ZlckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3ZlckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyIHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBlbGVtZW50IHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvdmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdPdmVyRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbi8qKlxuICogRHJhZyBvdXQgZXZlbnRcbiAqIEBjbGFzcyBEcmFnT3V0RXZlbnRcbiAqIEBtb2R1bGUgRHJhZ091dEV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdPdmVyRXZlbnQudHlwZSA9ICdkcmFnOm92ZXInO1xuRHJhZ092ZXJFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIERyYWdPdXRFdmVudCA9IGV4cG9ydHMuRHJhZ091dEV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdPdXRFdmVudCwgX0RyYWdFdmVudDQpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnT3V0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdPdXRFdmVudCwgW3tcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnRhaW5lciB5b3UgYXJlIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlckNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlckNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgZWxlbWVudCB5b3UgbGVmdFxuICAgICAqIEBwcm9wZXJ0eSBvdmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvdmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdPdXRFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIG92ZXIgY29udGFpbmVyIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ092ZXJDb250YWluZXJFdmVudFxuICogQG1vZHVsZSBEcmFnT3ZlckNvbnRhaW5lckV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdPdXRFdmVudC50eXBlID0gJ2RyYWc6b3V0JztcblxudmFyIERyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDUpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ092ZXJDb250YWluZXJFdmVudCwgX0RyYWdFdmVudDUpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdmVyQ29udGFpbmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ092ZXJDb250YWluZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdmVyQ29udGFpbmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3ZlckNvbnRhaW5lckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3ZlckNvbnRhaW5lckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyIHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ092ZXJDb250YWluZXJFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIG91dCBjb250YWluZXIgZXZlbnRcbiAqIEBjbGFzcyBEcmFnT3V0Q29udGFpbmVyRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ091dENvbnRhaW5lckV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdPdmVyQ29udGFpbmVyRXZlbnQudHlwZSA9ICdkcmFnOm92ZXI6Y29udGFpbmVyJztcblxudmFyIERyYWdPdXRDb250YWluZXJFdmVudCA9IGV4cG9ydHMuRHJhZ091dENvbnRhaW5lckV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ2KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdPdXRDb250YWluZXJFdmVudCwgX0RyYWdFdmVudDYpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdXRDb250YWluZXJFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnT3V0Q29udGFpbmVyRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnT3V0Q29udGFpbmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3V0Q29udGFpbmVyRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdPdXRDb250YWluZXJFdmVudCwgW3tcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnRhaW5lciB5b3UgbGVmdFxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ091dENvbnRhaW5lckV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgcHJlc3N1cmUgZXZlbnRcbiAqIEBjbGFzcyBEcmFnUHJlc3N1cmVFdmVudFxuICogQG1vZHVsZSBEcmFnUHJlc3N1cmVFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnT3V0Q29udGFpbmVyRXZlbnQudHlwZSA9ICdkcmFnOm91dDpjb250YWluZXInO1xuXG52YXIgRHJhZ1ByZXNzdXJlRXZlbnQgPSBleHBvcnRzLkRyYWdQcmVzc3VyZUV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ3KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdQcmVzc3VyZUV2ZW50LCBfRHJhZ0V2ZW50Nyk7XG5cbiAgZnVuY3Rpb24gRHJhZ1ByZXNzdXJlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnUHJlc3N1cmVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdQcmVzc3VyZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnUHJlc3N1cmVFdmVudCwgW3tcbiAgICBrZXk6ICdwcmVzc3VyZScsXG5cblxuICAgIC8qKlxuICAgICAqIFByZXNzdXJlIGFwcGxpZWQgb24gZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgcHJlc3N1cmVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5wcmVzc3VyZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdQcmVzc3VyZUV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgc3RvcCBldmVudFxuICogQGNsYXNzIERyYWdTdG9wRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ1N0b3BFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnUHJlc3N1cmVFdmVudC50eXBlID0gJ2RyYWc6cHJlc3N1cmUnO1xuXG52YXIgRHJhZ1N0b3BFdmVudCA9IGV4cG9ydHMuRHJhZ1N0b3BFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50OCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RvcEV2ZW50LCBfRHJhZ0V2ZW50OCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1N0b3BFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RvcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1N0b3BFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdTdG9wRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RvcEV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG5EcmFnU3RvcEV2ZW50LnR5cGUgPSAnZHJhZzpzdG9wJztcblxuLyoqKi8gfSksXG4vKiAxMDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIGRyYWdnYWJsZSBldmVudFxuICogQGNsYXNzIERyYWdnYWJsZUV2ZW50XG4gKiBAbW9kdWxlIERyYWdnYWJsZUV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBEcmFnZ2FibGVFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ2dhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnZ2FibGVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdnYWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ2dhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdnYWJsZUV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdnYWJsZScsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBpbnN0YW5jZVxuICAgICAqIEBwcm9wZXJ0eSBkcmFnZ2FibGVcbiAgICAgKiBAdHlwZSB7RHJhZ2dhYmxlfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnZ2FibGU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnZ2FibGVFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIERyYWdnYWJsZSBpbml0aWFsaXplZCBldmVudFxuICogQGNsYXNzIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudFxuICogQGV4dGVuZHMgRHJhZ2dhYmxlRXZlbnRcbiAqL1xuXG5cbkRyYWdnYWJsZUV2ZW50LnR5cGUgPSAnZHJhZ2dhYmxlJztcblxudmFyIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQgPSBleHBvcnRzLkRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdnYWJsZUV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQsIF9EcmFnZ2FibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50O1xufShEcmFnZ2FibGVFdmVudCk7XG5cbi8qKlxuICogRHJhZ2dhYmxlIGRlc3RvcnkgZXZlbnRcbiAqIEBjbGFzcyBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50XG4gKiBAbW9kdWxlIERyYWdnYWJsZURlc3Ryb3lFdmVudFxuICogQGV4dGVuZHMgRHJhZ2dhYmxlRGVzdHJveUV2ZW50XG4gKi9cblxuXG5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50LnR5cGUgPSAnZHJhZ2dhYmxlOmluaXRpYWxpemUnO1xuXG52YXIgRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVEZXN0cm95RXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdnYWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnZ2FibGVEZXN0cm95RXZlbnQsIF9EcmFnZ2FibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZURlc3Ryb3lFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnZ2FibGVEZXN0cm95RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnZ2FibGVEZXN0cm95RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnZ2FibGVEZXN0cm95RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnZ2FibGVEZXN0cm95RXZlbnQ7XG59KERyYWdnYWJsZUV2ZW50KTtcblxuRHJhZ2dhYmxlRGVzdHJveUV2ZW50LnR5cGUgPSAnZHJhZ2dhYmxlOmRlc3Ryb3knO1xuXG4vKioqLyB9KSxcbi8qIDEwOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5NaXJyb3JEZXN0cm95RXZlbnQgPSBleHBvcnRzLk1pcnJvck1vdmVFdmVudCA9IGV4cG9ydHMuTWlycm9yQXR0YWNoZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yQ3JlYXRlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JDcmVhdGVFdmVudCA9IGV4cG9ydHMuTWlycm9yRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBtaXJyb3IgZXZlbnRcbiAqIEBjbGFzcyBNaXJyb3JFdmVudFxuICogQG1vZHVsZSBNaXJyb3JFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgTWlycm9yRXZlbnQgPSBleHBvcnRzLk1pcnJvckV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShNaXJyb3JFdmVudCwgW3tcbiAgICBrZXk6ICdoYXNNaXJyb3InLFxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgbWlycm9yIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNNaXJyb3IoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLm1pcnJvcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc291cmNlJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBzb3VyY2UgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBzb3VyY2VcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNvdXJjZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIG9yaWdpbmFsIHNvdXJjZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG9yaWdpbmFsU291cmNlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbFNvdXJjZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9yaWdpbmFsU291cmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgc291cmNlIGNvbnRhaW5lciBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IHNvdXJjZUNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc291cmNlQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbnNvciBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBzZW5zb3JFdmVudFxuICAgICAqIEB0eXBlIHtTZW5zb3JFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29yRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zZW5zb3JFdmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBldmVudCB0aGF0IHRyaWdnZXJlZCBzZW5zb3IgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgb3JpZ2luYWxFdmVudFxuICAgICAqIEB0eXBlIHtFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3JpZ2luYWxFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBpZiAodGhpcy5zZW5zb3JFdmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1pcnJvckV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogTWlycm9yIGNyZWF0ZSBldmVudFxuICogQGNsYXNzIE1pcnJvckNyZWF0ZUV2ZW50XG4gKiBAbW9kdWxlIE1pcnJvckNyZWF0ZUV2ZW50XG4gKiBAZXh0ZW5kcyBNaXJyb3JFdmVudFxuICovXG5cblxudmFyIE1pcnJvckNyZWF0ZUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JDcmVhdGVFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTWlycm9yQ3JlYXRlRXZlbnQsIF9NaXJyb3JFdmVudCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yQ3JlYXRlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yQ3JlYXRlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JDcmVhdGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckNyZWF0ZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gTWlycm9yQ3JlYXRlRXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuLyoqXG4gKiBNaXJyb3IgY3JlYXRlZCBldmVudFxuICogQGNsYXNzIE1pcnJvckNyZWF0ZWRFdmVudFxuICogQG1vZHVsZSBNaXJyb3JDcmVhdGVkRXZlbnRcbiAqIEBleHRlbmRzIE1pcnJvckV2ZW50XG4gKi9cblxuXG5NaXJyb3JDcmVhdGVFdmVudC50eXBlID0gJ21pcnJvcjpjcmVhdGUnO1xuXG52YXIgTWlycm9yQ3JlYXRlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JDcmVhdGVkRXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JDcmVhdGVkRXZlbnQsIF9NaXJyb3JFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckNyZWF0ZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JDcmVhdGVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JDcmVhdGVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JDcmVhdGVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE1pcnJvckNyZWF0ZWRFdmVudCwgW3tcbiAgICBrZXk6ICdtaXJyb3InLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIG1pcnJvciBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG1pcnJvclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubWlycm9yO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWlycm9yQ3JlYXRlZEV2ZW50O1xufShNaXJyb3JFdmVudCk7XG5cbi8qKlxuICogTWlycm9yIGF0dGFjaGVkIGV2ZW50XG4gKiBAY2xhc3MgTWlycm9yQXR0YWNoZWRFdmVudFxuICogQG1vZHVsZSBNaXJyb3JBdHRhY2hlZEV2ZW50XG4gKiBAZXh0ZW5kcyBNaXJyb3JFdmVudFxuICovXG5cblxuTWlycm9yQ3JlYXRlZEV2ZW50LnR5cGUgPSAnbWlycm9yOmNyZWF0ZWQnO1xuXG52YXIgTWlycm9yQXR0YWNoZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yQXR0YWNoZWRFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckF0dGFjaGVkRXZlbnQsIF9NaXJyb3JFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckF0dGFjaGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yQXR0YWNoZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvckF0dGFjaGVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JBdHRhY2hlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShNaXJyb3JBdHRhY2hlZEV2ZW50LCBbe1xuICAgIGtleTogJ21pcnJvcicsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgbWlycm9yIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgbWlycm9yXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5taXJyb3I7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNaXJyb3JBdHRhY2hlZEV2ZW50O1xufShNaXJyb3JFdmVudCk7XG5cbi8qKlxuICogTWlycm9yIG1vdmUgZXZlbnRcbiAqIEBjbGFzcyBNaXJyb3JNb3ZlRXZlbnRcbiAqIEBtb2R1bGUgTWlycm9yTW92ZUV2ZW50XG4gKiBAZXh0ZW5kcyBNaXJyb3JFdmVudFxuICovXG5cblxuTWlycm9yQXR0YWNoZWRFdmVudC50eXBlID0gJ21pcnJvcjphdHRhY2hlZCc7XG5cbnZhciBNaXJyb3JNb3ZlRXZlbnQgPSBleHBvcnRzLk1pcnJvck1vdmVFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvck1vdmVFdmVudCwgX01pcnJvckV2ZW50NCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yTW92ZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvck1vdmVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvck1vdmVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvck1vdmVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTWlycm9yTW92ZUV2ZW50LCBbe1xuICAgIGtleTogJ21pcnJvcicsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgbWlycm9yIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgbWlycm9yXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5taXJyb3I7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNaXJyb3JNb3ZlRXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuLyoqXG4gKiBNaXJyb3IgZGVzdHJveSBldmVudFxuICogQGNsYXNzIE1pcnJvckRlc3Ryb3lFdmVudFxuICogQG1vZHVsZSBNaXJyb3JEZXN0cm95RXZlbnRcbiAqIEBleHRlbmRzIE1pcnJvckV2ZW50XG4gKi9cblxuXG5NaXJyb3JNb3ZlRXZlbnQudHlwZSA9ICdtaXJyb3I6bW92ZSc7XG5NaXJyb3JNb3ZlRXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBNaXJyb3JEZXN0cm95RXZlbnQgPSBleHBvcnRzLk1pcnJvckRlc3Ryb3lFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQ1KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckRlc3Ryb3lFdmVudCwgX01pcnJvckV2ZW50NSk7XG5cbiAgZnVuY3Rpb24gTWlycm9yRGVzdHJveUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckRlc3Ryb3lFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvckRlc3Ryb3lFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckRlc3Ryb3lFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTWlycm9yRGVzdHJveUV2ZW50LCBbe1xuICAgIGtleTogJ21pcnJvcicsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgbWlycm9yIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgbWlycm9yXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5taXJyb3I7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNaXJyb3JEZXN0cm95RXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuTWlycm9yRGVzdHJveUV2ZW50LnR5cGUgPSAnbWlycm9yOmRlc3Ryb3knO1xuTWlycm9yRGVzdHJveUV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG4vKioqLyB9KSxcbi8qIDEwOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0T3B0aW9ucyA9IHVuZGVmaW5lZDtcblxudmFyIF9NaXJyb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExMCk7XG5cbnZhciBfTWlycm9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01pcnJvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9NaXJyb3IyLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHRPcHRpb25zID0gX01pcnJvci5kZWZhdWx0T3B0aW9ucztcblxuLyoqKi8gfSksXG4vKiAxMTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdE9wdGlvbnMgPSBleHBvcnRzLm9uU2Nyb2xsID0gZXhwb3J0cy5vbk1pcnJvck1vdmUgPSBleHBvcnRzLm9uTWlycm9yQ3JlYXRlZCA9IGV4cG9ydHMub25EcmFnU3RvcCA9IGV4cG9ydHMub25EcmFnU3RhcnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTEpO1xuXG52YXIgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMik7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0UGx1Z2luMiA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXG52YXIgX0Fic3RyYWN0UGx1Z2luMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0UGx1Z2luMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkRyYWdTdGFydCA9IGV4cG9ydHMub25EcmFnU3RhcnQgPSBTeW1ib2woJ29uRHJhZ1N0YXJ0Jyk7XG52YXIgb25EcmFnU3RvcCA9IGV4cG9ydHMub25EcmFnU3RvcCA9IFN5bWJvbCgnb25EcmFnU3RvcCcpO1xudmFyIG9uTWlycm9yQ3JlYXRlZCA9IGV4cG9ydHMub25NaXJyb3JDcmVhdGVkID0gU3ltYm9sKCdvbk1pcnJvckNyZWF0ZWQnKTtcbnZhciBvbk1pcnJvck1vdmUgPSBleHBvcnRzLm9uTWlycm9yTW92ZSA9IFN5bWJvbCgnb25NaXJyb3JNb3ZlJyk7XG52YXIgb25TY3JvbGwgPSBleHBvcnRzLm9uU2Nyb2xsID0gU3ltYm9sKCdvblNjcm9sbCcpO1xuXG4vKipcbiAqIE1pcnJvciBkZWZhdWx0IG9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkZWZhdWx0T3B0aW9uc1xuICogQHByb3BlcnR5IHtCb29sZWFufSBkZWZhdWx0T3B0aW9ucy5jb25zdHJhaW5EaW1lbnNpb25zXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlZmF1bHRPcHRpb25zLnhBeGlzXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlZmF1bHRPcHRpb25zLnlBeGlzXG4gKiBAcHJvcGVydHkge251bGx9IGRlZmF1bHRPcHRpb25zLmN1cnNvck9mZnNldFhcbiAqIEBwcm9wZXJ0eSB7bnVsbH0gZGVmYXVsdE9wdGlvbnMuY3Vyc29yT2Zmc2V0WVxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGRlZmF1bHRPcHRpb25zID0gZXhwb3J0cy5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgY29uc3RyYWluRGltZW5zaW9uczogZmFsc2UsXG4gIHhBeGlzOiB0cnVlLFxuICB5QXhpczogdHJ1ZSxcbiAgY3Vyc29yT2Zmc2V0WDogbnVsbCxcbiAgY3Vyc29yT2Zmc2V0WTogbnVsbFxufTtcblxuLyoqXG4gKiBNaXJyb3IgcGx1Z2luIHdoaWNoIGNvbnRyb2xzIHRoZSBtaXJyb3IgcG9zaXRpb25pbmcgd2hpbGUgZHJhZ2dpbmdcbiAqIEBjbGFzcyBNaXJyb3JcbiAqIEBtb2R1bGUgTWlycm9yXG4gKiBAZXh0ZW5kcyBBYnN0cmFjdFBsdWdpblxuICovXG5cbnZhciBNaXJyb3IgPSBmdW5jdGlvbiAoX0Fic3RyYWN0UGx1Z2luKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvciwgX0Fic3RyYWN0UGx1Z2luKTtcblxuICAvKipcbiAgICogTWlycm9yIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBNaXJyb3JcbiAgICogQHBhcmFtIHtEcmFnZ2FibGV9IGRyYWdnYWJsZSAtIERyYWdnYWJsZSBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gTWlycm9yKGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvcik7XG5cbiAgICAvKipcbiAgICAgKiBNaXJyb3Igb3B0aW9uc1xuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBvcHRpb25zLmNvbnN0cmFpbkRpbWVuc2lvbnNcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IG9wdGlvbnMueEF4aXNcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IG9wdGlvbnMueUF4aXNcbiAgICAgKiBAcHJvcGVydHkge051bWJlcnxudWxsfSBvcHRpb25zLmN1cnNvck9mZnNldFhcbiAgICAgKiBAcHJvcGVydHkge051bWJlcnxudWxsfSBvcHRpb25zLmN1cnNvck9mZnNldFlcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvcikpLmNhbGwodGhpcywgZHJhZ2dhYmxlKSk7XG5cbiAgICBfdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIF90aGlzLmdldE9wdGlvbnMoKSk7XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgb2Zmc2V0IGZvciB0b3VjaCBkZXZpY2VzIGJlY2F1c2UgdGhlIG1pcnJvciBpcyBwb3NpdGlvbmVkIGZpeGVkXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9IHNjcm9sbE9mZnNldFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzY3JvbGxPZmZzZXQueFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzY3JvbGxPZmZzZXQueVxuICAgICAqL1xuICAgIF90aGlzLnNjcm9sbE9mZnNldCA9IHsgeDogMCwgeTogMCB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbCBzY3JvbGwgb2Zmc2V0IGZvciB0b3VjaCBkZXZpY2VzIGJlY2F1c2UgdGhlIG1pcnJvciBpcyBwb3NpdGlvbmVkIGZpeGVkXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9IHNjcm9sbE9mZnNldFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzY3JvbGxPZmZzZXQueFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzY3JvbGxPZmZzZXQueVxuICAgICAqL1xuICAgIF90aGlzLmluaXRpYWxTY3JvbGxPZmZzZXQgPSB7XG4gICAgICB4OiB3aW5kb3cuc2Nyb2xsWCxcbiAgICAgIHk6IHdpbmRvdy5zY3JvbGxZXG4gICAgfTtcblxuICAgIF90aGlzW29uRHJhZ1N0YXJ0XSA9IF90aGlzW29uRHJhZ1N0YXJ0XS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdTdG9wXSA9IF90aGlzW29uRHJhZ1N0b3BdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTWlycm9yQ3JlYXRlZF0gPSBfdGhpc1tvbk1pcnJvckNyZWF0ZWRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTWlycm9yTW92ZV0gPSBfdGhpc1tvbk1pcnJvck1vdmVdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uU2Nyb2xsXSA9IF90aGlzW29uU2Nyb2xsXS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgcGx1Z2lucyBldmVudCBsaXN0ZW5lcnNcbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShNaXJyb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSkub24oJ2RyYWc6c3RvcCcsIHRoaXNbb25EcmFnU3RvcF0pLm9uKCdtaXJyb3I6Y3JlYXRlZCcsIHRoaXNbb25NaXJyb3JDcmVhdGVkXSkub24oJ21pcnJvcjptb3ZlJywgdGhpc1tvbk1pcnJvck1vdmVdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBwbHVnaW5zIGV2ZW50IGxpc3RlbmVyc1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ2RyYWc6c3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSkub2ZmKCdkcmFnOnN0b3AnLCB0aGlzW29uRHJhZ1N0b3BdKS5vZmYoJ21pcnJvcjpjcmVhdGVkJywgdGhpc1tvbk1pcnJvckNyZWF0ZWRdKS5vZmYoJ21pcnJvcjptb3ZlJywgdGhpc1tvbk1pcnJvck1vdmVdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG9wdGlvbnMgcGFzc2VkIHRocm91Z2ggZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRPcHRpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZS5vcHRpb25zLm1pcnJvciB8fCB7fTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpc1tvblNjcm9sbF0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluaXRpYWxTY3JvbGxPZmZzZXQgPSB7XG4gICAgICAgIHg6IHdpbmRvdy5zY3JvbGxYLFxuICAgICAgICB5OiB3aW5kb3cuc2Nyb2xsWVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0b3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzW29uU2Nyb2xsXSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5pdGlhbFNjcm9sbE9mZnNldCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgdGhpcy5zY3JvbGxPZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IG9uU2Nyb2xsLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICAgIHRoaXMuc2Nyb2xsT2Zmc2V0ID0ge1xuICAgICAgICB4OiB3aW5kb3cuc2Nyb2xsWCAtIHRoaXMuaW5pdGlhbFNjcm9sbE9mZnNldC54LFxuICAgICAgICB5OiB3aW5kb3cuc2Nyb2xsWSAtIHRoaXMuaW5pdGlhbFNjcm9sbE9mZnNldC55XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1pcnJvciBjcmVhdGVkIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge01pcnJvckNyZWF0ZWRFdmVudH0gbWlycm9yRXZlbnRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25NaXJyb3JDcmVhdGVkLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfcmVmKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIG1pcnJvciA9IF9yZWYubWlycm9yLFxuICAgICAgICAgIHNvdXJjZSA9IF9yZWYuc291cmNlLFxuICAgICAgICAgIHNlbnNvckV2ZW50ID0gX3JlZi5zZW5zb3JFdmVudDtcblxuICAgICAgdmFyIG1pcnJvckNsYXNzID0gdGhpcy5kcmFnZ2FibGUuZ2V0Q2xhc3NOYW1lRm9yKCdtaXJyb3InKTtcblxuICAgICAgdmFyIHNldFN0YXRlID0gZnVuY3Rpb24gc2V0U3RhdGUoX3JlZjIpIHtcbiAgICAgICAgdmFyIG1pcnJvck9mZnNldCA9IF9yZWYyLm1pcnJvck9mZnNldCxcbiAgICAgICAgICAgIGluaXRpYWxYID0gX3JlZjIuaW5pdGlhbFgsXG4gICAgICAgICAgICBpbml0aWFsWSA9IF9yZWYyLmluaXRpYWxZLFxuICAgICAgICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWYyLCBbJ21pcnJvck9mZnNldCcsICdpbml0aWFsWCcsICdpbml0aWFsWSddKTtcblxuICAgICAgICBfdGhpczIubWlycm9yT2Zmc2V0ID0gbWlycm9yT2Zmc2V0O1xuICAgICAgICBfdGhpczIuaW5pdGlhbFggPSBpbml0aWFsWDtcbiAgICAgICAgX3RoaXMyLmluaXRpYWxZID0gaW5pdGlhbFk7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgbWlycm9yT2Zmc2V0OiBtaXJyb3JPZmZzZXQsIGluaXRpYWxYOiBpbml0aWFsWCwgaW5pdGlhbFk6IGluaXRpYWxZIH0sIGFyZ3MpO1xuICAgICAgfTtcblxuICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgICAgbWlycm9yOiBtaXJyb3IsXG4gICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgIG1pcnJvckNsYXNzOiBtaXJyb3JDbGFzcyxcbiAgICAgICAgc2Nyb2xsT2Zmc2V0OiB0aGlzLnNjcm9sbE9mZnNldCxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluaXRpYWxTdGF0ZSlcbiAgICAgIC8vIEZpeCByZWZsb3cgaGVyZVxuICAgICAgLnRoZW4oY29tcHV0ZU1pcnJvckRpbWVuc2lvbnMpLnRoZW4oY2FsY3VsYXRlTWlycm9yT2Zmc2V0KS50aGVuKHJlc2V0TWlycm9yKS50aGVuKGFkZE1pcnJvckNsYXNzZXMpLnRoZW4ocG9zaXRpb25NaXJyb3IoeyBpbml0aWFsOiB0cnVlIH0pKS50aGVuKHJlbW92ZU1pcnJvcklEKS50aGVuKHNldFN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNaXJyb3IgbW92ZSBoYW5kbGVyXG4gICAgICogQHBhcmFtIHtNaXJyb3JNb3ZlRXZlbnR9IG1pcnJvckV2ZW50XG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTWlycm9yTW92ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3JlZjMpIHtcbiAgICAgIHZhciBtaXJyb3IgPSBfcmVmMy5taXJyb3IsXG4gICAgICAgICAgc2Vuc29yRXZlbnQgPSBfcmVmMy5zZW5zb3JFdmVudDtcblxuICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgICAgbWlycm9yOiBtaXJyb3IsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgbWlycm9yT2Zmc2V0OiB0aGlzLm1pcnJvck9mZnNldCxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICBpbml0aWFsWDogdGhpcy5pbml0aWFsWCxcbiAgICAgICAgaW5pdGlhbFk6IHRoaXMuaW5pdGlhbFksXG4gICAgICAgIHNjcm9sbE9mZnNldDogdGhpcy5zY3JvbGxPZmZzZXRcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5pdGlhbFN0YXRlKS50aGVuKHBvc2l0aW9uTWlycm9yKHsgcmFmOiB0cnVlIH0pKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1pcnJvcjtcbn0oX0Fic3RyYWN0UGx1Z2luMy5kZWZhdWx0KTtcblxuLyoqXG4gKiBDb21wdXRlcyBtaXJyb3IgZGltZW5zaW9ucyBiYXNlZCBvbiB0aGUgc291cmNlIGVsZW1lbnRcbiAqIEFkZHMgc291cmNlUmVjdCB0byBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGF0ZS5zb3VyY2VcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKiBAcHJpdmF0ZVxuICovXG5cblxuZXhwb3J0cy5kZWZhdWx0ID0gTWlycm9yO1xuZnVuY3Rpb24gY29tcHV0ZU1pcnJvckRpbWVuc2lvbnMoX3JlZjQpIHtcbiAgdmFyIHNvdXJjZSA9IF9yZWY0LnNvdXJjZSxcbiAgICAgIGFyZ3MgPSAoMCwgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMy5kZWZhdWx0KShfcmVmNCwgWydzb3VyY2UnXSk7XG5cbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIHNvdXJjZVJlY3QgPSBzb3VyY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHsgc291cmNlOiBzb3VyY2UsIHNvdXJjZVJlY3Q6IHNvdXJjZVJlY3QgfSwgYXJncykpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIG1pcnJvciBvZmZzZXRcbiAqIEFkZHMgbWlycm9yT2Zmc2V0IHRvIHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7U2Vuc29yRXZlbnR9IHN0YXRlLnNlbnNvckV2ZW50XG4gKiBAcGFyYW0ge0RPTVJlY3R9IHN0YXRlLnNvdXJjZVJlY3RcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjYWxjdWxhdGVNaXJyb3JPZmZzZXQoX3JlZjUpIHtcbiAgdmFyIHNlbnNvckV2ZW50ID0gX3JlZjUuc2Vuc29yRXZlbnQsXG4gICAgICBzb3VyY2VSZWN0ID0gX3JlZjUuc291cmNlUmVjdCxcbiAgICAgIG9wdGlvbnMgPSBfcmVmNS5vcHRpb25zLFxuICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWY1LCBbJ3NlbnNvckV2ZW50JywgJ3NvdXJjZVJlY3QnLCAnb3B0aW9ucyddKTtcblxuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgdG9wID0gb3B0aW9ucy5jdXJzb3JPZmZzZXRZID09PSBudWxsID8gc2Vuc29yRXZlbnQuY2xpZW50WSAtIHNvdXJjZVJlY3QudG9wIDogb3B0aW9ucy5jdXJzb3JPZmZzZXRZO1xuICAgIHZhciBsZWZ0ID0gb3B0aW9ucy5jdXJzb3JPZmZzZXRYID09PSBudWxsID8gc2Vuc29yRXZlbnQuY2xpZW50WCAtIHNvdXJjZVJlY3QubGVmdCA6IG9wdGlvbnMuY3Vyc29yT2Zmc2V0WDtcblxuICAgIHZhciBtaXJyb3JPZmZzZXQgPSB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH07XG5cbiAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oeyBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsIHNvdXJjZVJlY3Q6IHNvdXJjZVJlY3QsIG1pcnJvck9mZnNldDogbWlycm9yT2Zmc2V0LCBvcHRpb25zOiBvcHRpb25zIH0sIGFyZ3MpKTtcbiAgfSk7XG59XG5cbi8qKlxuICogQXBwbHlzIG1pcnJvciBzdHlsZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RhdGUubWlycm9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGF0ZS5zb3VyY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZS5vcHRpb25zXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVzZXRNaXJyb3IoX3JlZjYpIHtcbiAgdmFyIG1pcnJvciA9IF9yZWY2Lm1pcnJvcixcbiAgICAgIHNvdXJjZSA9IF9yZWY2LnNvdXJjZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmNi5vcHRpb25zLFxuICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWY2LCBbJ21pcnJvcicsICdzb3VyY2UnLCAnb3B0aW9ucyddKTtcblxuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgb2Zmc2V0SGVpZ2h0ID0gdm9pZCAwO1xuICAgIHZhciBvZmZzZXRXaWR0aCA9IHZvaWQgMDtcblxuICAgIGlmIChvcHRpb25zLmNvbnN0cmFpbkRpbWVuc2lvbnMpIHtcbiAgICAgIHZhciBjb21wdXRlZFNvdXJjZVN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoc291cmNlKTtcbiAgICAgIG9mZnNldEhlaWdodCA9IGNvbXB1dGVkU291cmNlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpO1xuICAgICAgb2Zmc2V0V2lkdGggPSBjb21wdXRlZFNvdXJjZVN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpO1xuICAgIH1cblxuICAgIG1pcnJvci5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgbWlycm9yLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgbWlycm9yLnN0eWxlLnRvcCA9IDA7XG4gICAgbWlycm9yLnN0eWxlLmxlZnQgPSAwO1xuICAgIG1pcnJvci5zdHlsZS5tYXJnaW4gPSAwO1xuXG4gICAgaWYgKG9wdGlvbnMuY29uc3RyYWluRGltZW5zaW9ucykge1xuICAgICAgbWlycm9yLnN0eWxlLmhlaWdodCA9IG9mZnNldEhlaWdodDtcbiAgICAgIG1pcnJvci5zdHlsZS53aWR0aCA9IG9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIHJlc29sdmUoT2JqZWN0LmFzc2lnbih7IG1pcnJvcjogbWlycm9yLCBzb3VyY2U6IHNvdXJjZSwgb3B0aW9uczogb3B0aW9ucyB9LCBhcmdzKSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEFwcGx5cyBtaXJyb3IgY2xhc3Mgb24gbWlycm9yIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RhdGUubWlycm9yXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RhdGUubWlycm9yQ2xhc3NcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRNaXJyb3JDbGFzc2VzKF9yZWY3KSB7XG4gIHZhciBtaXJyb3IgPSBfcmVmNy5taXJyb3IsXG4gICAgICBtaXJyb3JDbGFzcyA9IF9yZWY3Lm1pcnJvckNsYXNzLFxuICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWY3LCBbJ21pcnJvcicsICdtaXJyb3JDbGFzcyddKTtcblxuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICBtaXJyb3IuY2xhc3NMaXN0LmFkZChtaXJyb3JDbGFzcyk7XG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHsgbWlycm9yOiBtaXJyb3IsIG1pcnJvckNsYXNzOiBtaXJyb3JDbGFzcyB9LCBhcmdzKSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgc291cmNlIElEIGZyb20gY2xvbmVkIG1pcnJvciBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHN0YXRlLm1pcnJvclxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZU1pcnJvcklEKF9yZWY4KSB7XG4gIHZhciBtaXJyb3IgPSBfcmVmOC5taXJyb3IsXG4gICAgICBhcmdzID0gKDAsIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMuZGVmYXVsdCkoX3JlZjgsIFsnbWlycm9yJ10pO1xuXG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIG1pcnJvci5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgZGVsZXRlIG1pcnJvci5pZDtcbiAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oeyBtaXJyb3I6IG1pcnJvciB9LCBhcmdzKSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFBvc2l0aW9ucyBtaXJyb3Igd2l0aCB0cmFuc2xhdGUzZFxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGF0ZS5taXJyb3JcbiAqIEBwYXJhbSB7U2Vuc29yRXZlbnR9IHN0YXRlLnNlbnNvckV2ZW50XG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUubWlycm9yT2Zmc2V0XG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdGUuaW5pdGlhbFlcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0ZS5pbml0aWFsWFxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlLm9wdGlvbnNcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwb3NpdGlvbk1pcnJvcigpIHtcbiAgdmFyIF9yZWY5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIF9yZWY5JHdpdGhGcmFtZSA9IF9yZWY5LndpdGhGcmFtZSxcbiAgICAgIHdpdGhGcmFtZSA9IF9yZWY5JHdpdGhGcmFtZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmOSR3aXRoRnJhbWUsXG4gICAgICBfcmVmOSRpbml0aWFsID0gX3JlZjkuaW5pdGlhbCxcbiAgICAgIGluaXRpYWwgPSBfcmVmOSRpbml0aWFsID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWY5JGluaXRpYWw7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmMTApIHtcbiAgICB2YXIgbWlycm9yID0gX3JlZjEwLm1pcnJvcixcbiAgICAgICAgc2Vuc29yRXZlbnQgPSBfcmVmMTAuc2Vuc29yRXZlbnQsXG4gICAgICAgIG1pcnJvck9mZnNldCA9IF9yZWYxMC5taXJyb3JPZmZzZXQsXG4gICAgICAgIGluaXRpYWxZID0gX3JlZjEwLmluaXRpYWxZLFxuICAgICAgICBpbml0aWFsWCA9IF9yZWYxMC5pbml0aWFsWCxcbiAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gX3JlZjEwLnNjcm9sbE9mZnNldCxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWYxMC5vcHRpb25zLFxuICAgICAgICBhcmdzID0gKDAsIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMuZGVmYXVsdCkoX3JlZjEwLCBbJ21pcnJvcicsICdzZW5zb3JFdmVudCcsICdtaXJyb3JPZmZzZXQnLCAnaW5pdGlhbFknLCAnaW5pdGlhbFgnLCAnc2Nyb2xsT2Zmc2V0JywgJ29wdGlvbnMnXSk7XG5cbiAgICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgbWlycm9yOiBtaXJyb3IsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgbWlycm9yT2Zmc2V0OiBtaXJyb3JPZmZzZXQsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgIH0sIGFyZ3MpO1xuXG4gICAgICBpZiAobWlycm9yT2Zmc2V0KSB7XG4gICAgICAgIHZhciB4ID0gc2Vuc29yRXZlbnQuY2xpZW50WCAtIG1pcnJvck9mZnNldC5sZWZ0IC0gc2Nyb2xsT2Zmc2V0Lng7XG4gICAgICAgIHZhciB5ID0gc2Vuc29yRXZlbnQuY2xpZW50WSAtIG1pcnJvck9mZnNldC50b3AgLSBzY3JvbGxPZmZzZXQueTtcblxuICAgICAgICBpZiAob3B0aW9ucy54QXhpcyAmJiBvcHRpb25zLnlBeGlzIHx8IGluaXRpYWwpIHtcbiAgICAgICAgICBtaXJyb3Iuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMCknO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMueEF4aXMgJiYgIW9wdGlvbnMueUF4aXMpIHtcbiAgICAgICAgICBtaXJyb3Iuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgaW5pdGlhbFkgKyAncHgsIDApJztcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnlBeGlzICYmICFvcHRpb25zLnhBeGlzKSB7XG4gICAgICAgICAgbWlycm9yLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgaW5pdGlhbFggKyAncHgsICcgKyB5ICsgJ3B4LCAwKSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5pdGlhbCkge1xuICAgICAgICAgIHJlc3VsdC5pbml0aWFsWCA9IHg7XG4gICAgICAgICAgcmVzdWx0LmluaXRpYWxZID0geTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgfSwgeyBmcmFtZTogd2l0aEZyYW1lIH0pO1xuICB9O1xufVxuXG4vKipcbiAqIFdyYXBzIGZ1bmN0aW9ucyBpbiBwcm9taXNlIHdpdGggcG90ZW50aWFsIGFuaW1hdGlvbiBmcmFtZSBvcHRpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLnJhZlxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHdpdGhQcm9taXNlKGNhbGxiYWNrKSB7XG4gIHZhciBfcmVmMTEgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgX3JlZjExJHJhZiA9IF9yZWYxMS5yYWYsXG4gICAgICByYWYgPSBfcmVmMTEkcmFmID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYxMSRyYWY7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAocmFmKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHJlc29sdmUsIHJlamVjdCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqKi8gfSksXG4vKiAxMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICB2YXIgdGFyZ2V0ID0ge307XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlO1xuICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDExMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQWxsIGRyYWdnYWJsZSBwbHVnaW5zIGluaGVyaXQgZnJvbSB0aGlzIGNsYXNzLlxuICogQGFic3RyYWN0XG4gKiBAY2xhc3MgQWJzdHJhY3RQbHVnaW5cbiAqIEBtb2R1bGUgQWJzdHJhY3RQbHVnaW5cbiAqL1xudmFyIEFic3RyYWN0UGx1Z2luID0gZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxuICAgKiBBYnN0cmFjdFBsdWdpbiBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgQWJzdHJhY3RQbHVnaW5cbiAgICogQHBhcmFtIHtEcmFnZ2FibGV9IGRyYWdnYWJsZSAtIERyYWdnYWJsZSBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gQWJzdHJhY3RQbHVnaW4oZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQWJzdHJhY3RQbHVnaW4pO1xuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgaW5zdGFuY2VcbiAgICAgKiBAcHJvcGVydHkgZHJhZ2dhYmxlXG4gICAgICogQHR5cGUge0RyYWdnYWJsZX1cbiAgICAgKi9cbiAgICB0aGlzLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0byBhZGQgbGlzdGVuZXJzXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEFic3RyYWN0UGx1Z2luLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IEltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdG8gcmVtb3ZlIGxpc3RlbmVyc1xuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBJbXBsZW1lbnRlZCcpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQWJzdHJhY3RQbHVnaW47XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFic3RyYWN0UGx1Z2luO1xuXG4vKioqLyB9KSxcbi8qIDExMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0T3B0aW9ucyA9IHVuZGVmaW5lZDtcblxudmFyIF9Bbm5vdW5jZW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExNCk7XG5cbnZhciBfQW5ub3VuY2VtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fubm91bmNlbWVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Bbm5vdW5jZW1lbnQyLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHRPcHRpb25zID0gX0Fubm91bmNlbWVudC5kZWZhdWx0T3B0aW9ucztcblxuLyoqKi8gfSksXG4vKiAxMTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdE9wdGlvbnMgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0UGx1Z2luMiA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXG52YXIgX0Fic3RyYWN0UGx1Z2luMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0UGx1Z2luMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkluaXRpYWxpemUgPSBTeW1ib2woJ29uSW5pdGlhbGl6ZScpO1xudmFyIG9uRGVzdHJveSA9IFN5bWJvbCgnb25EZXN0cm95Jyk7XG52YXIgYW5ub3VuY2VFdmVudCA9IFN5bWJvbCgnYW5ub3VuY2VFdmVudCcpO1xudmFyIGFubm91bmNlTWVzc2FnZSA9IFN5bWJvbCgnYW5ub3VuY2VNZXNzYWdlJyk7XG5cbnZhciBBUklBX1JFTEVWQU5UID0gJ2FyaWEtcmVsZXZhbnQnO1xudmFyIEFSSUFfQVRPTUlDID0gJ2FyaWEtYXRvbWljJztcbnZhciBBUklBX0xJVkUgPSAnYXJpYS1saXZlJztcbnZhciBST0xFID0gJ3JvbGUnO1xuXG4vKipcbiAqIEFubm91bmNlbWVudCBkZWZhdWx0IG9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkZWZhdWx0T3B0aW9uc1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IGRlZmF1bHRPcHRpb25zLmV4cGlyZVxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGRlZmF1bHRPcHRpb25zID0gZXhwb3J0cy5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgZXhwaXJlOiA3MDAwXG59O1xuXG4vKipcbiAqIEFubm91bmNlbWVudCBwbHVnaW5cbiAqIEBjbGFzcyBBbm5vdW5jZW1lbnRcbiAqIEBtb2R1bGUgQW5ub3VuY2VtZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdFBsdWdpblxuICovXG5cbnZhciBBbm5vdW5jZW1lbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0UGx1Z2luKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKEFubm91bmNlbWVudCwgX0Fic3RyYWN0UGx1Z2luKTtcblxuICAvKipcbiAgICogQW5ub3VuY2VtZW50IGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBBbm5vdW5jZW1lbnRcbiAgICogQHBhcmFtIHtEcmFnZ2FibGV9IGRyYWdnYWJsZSAtIERyYWdnYWJsZSBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gQW5ub3VuY2VtZW50KGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEFubm91bmNlbWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBQbHVnaW4gb3B0aW9uc1xuICAgICAqIEBwcm9wZXJ0eSBvcHRpb25zXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChBbm5vdW5jZW1lbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihBbm5vdW5jZW1lbnQpKS5jYWxsKHRoaXMsIGRyYWdnYWJsZSkpO1xuXG4gICAgX3RoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBfdGhpcy5nZXRPcHRpb25zKCkpO1xuXG4gICAgLyoqXG4gICAgICogT3JpZ2luYWwgZHJhZ2dhYmxlIHRyaWdnZXIgbWV0aG9kLiBIYWNrIHVudGlsIHdlIGhhdmUgb25BbGwgb3Igb24oJ2FsbCcpXG4gICAgICogQHByb3BlcnR5IG9yaWdpbmFsVHJpZ2dlck1ldGhvZFxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBfdGhpcy5vcmlnaW5hbFRyaWdnZXJNZXRob2QgPSBfdGhpcy5kcmFnZ2FibGUudHJpZ2dlcjtcblxuICAgIF90aGlzW29uSW5pdGlhbGl6ZV0gPSBfdGhpc1tvbkluaXRpYWxpemVdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRGVzdHJveV0gPSBfdGhpc1tvbkRlc3Ryb3ldLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBsaXN0ZW5lcnMgdG8gZHJhZ2dhYmxlXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQW5ub3VuY2VtZW50LCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdkcmFnZ2FibGU6aW5pdGlhbGl6ZScsIHRoaXNbb25Jbml0aWFsaXplXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgbGlzdGVuZXJzIGZyb20gZHJhZ2dhYmxlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZ2dhYmxlOmRlc3Ryb3knLCB0aGlzW29uRGVzdHJveV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcGFzc2VkIGluIG9wdGlvbnNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0T3B0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGUub3B0aW9ucy5hbm5vdW5jZW1lbnRzIHx8IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFubm91bmNlcyBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBYnN0cmFjdEV2ZW50fSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IGFubm91bmNlRXZlbnQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgbWVzc2FnZSA9IHRoaXMub3B0aW9uc1tldmVudC50eXBlXTtcblxuICAgICAgaWYgKG1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXNbYW5ub3VuY2VNZXNzYWdlXShtZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpc1thbm5vdW5jZU1lc3NhZ2VdKG1lc3NhZ2UoZXZlbnQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbm5vdW5jZXMgbWVzc2FnZSB0byBzY3JlZW4gcmVhZGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IGFubm91bmNlTWVzc2FnZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUobWVzc2FnZSkge1xuICAgICAgYW5ub3VuY2UobWVzc2FnZSwgeyBleHBpcmU6IHRoaXMub3B0aW9ucy5leHBpcmUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBoYW5kZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uSW5pdGlhbGl6ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgLy8gSGFjayB1bnRpbCB0aGVyZSBpcyBhbiBhcGkgZm9yIGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50c1xuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIF90aGlzMlthbm5vdW5jZUV2ZW50XShldmVudCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgLy8gRW5zdXJlIHRoYXQgb3JpZ2luYWwgdHJpZ2dlciBpcyBjYWxsZWRcbiAgICAgICAgICBfdGhpczIub3JpZ2luYWxUcmlnZ2VyTWV0aG9kLmNhbGwoX3RoaXMyLmRyYWdnYWJsZSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgaGFuZGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRlc3Ryb3ksXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlciA9IHRoaXMub3JpZ2luYWxUcmlnZ2VyTWV0aG9kO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQW5ub3VuY2VtZW50O1xufShfQWJzdHJhY3RQbHVnaW4zLmRlZmF1bHQpO1xuXG4vKipcbiAqIEBjb25zdCB7SFRNTEVsZW1lbnR9IGxpdmVSZWdpb25cbiAqL1xuXG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFubm91bmNlbWVudDtcbnZhciBsaXZlUmVnaW9uID0gY3JlYXRlUmVnaW9uKCk7XG5cbi8qKlxuICogQW5ub3VuY2VzIG1lc3NhZ2UgdmlhIGxpdmUgcmVnaW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmV4cGlyZVxuICovXG5mdW5jdGlvbiBhbm5vdW5jZShtZXNzYWdlLCBfcmVmKSB7XG4gIHZhciBleHBpcmUgPSBfcmVmLmV4cGlyZTtcblxuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gIGxpdmVSZWdpb24uYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBsaXZlUmVnaW9uLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICB9LCBleHBpcmUpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgcmVnaW9uIGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVSZWdpb24oKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2RyYWdnYWJsZS1saXZlLXJlZ2lvbicpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZShBUklBX1JFTEVWQU5ULCAnYWRkaXRpb25zJyk7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKEFSSUFfQVRPTUlDLCAndHJ1ZScpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZShBUklBX0xJVkUsICdhc3NlcnRpdmUnKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoUk9MRSwgJ2xvZycpO1xuXG4gIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICBlbGVtZW50LnN0eWxlLndpZHRoID0gJzFweCc7XG4gIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzFweCc7XG4gIGVsZW1lbnQuc3R5bGUudG9wID0gJy0xcHgnO1xuICBlbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbi8vIEFwcGVuZCBsaXZlIHJlZ2lvbiBlbGVtZW50IGFzIGVhcmx5IGFzIHBvc3NpYmxlXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpdmVSZWdpb24pO1xufSk7XG5cbi8qKiovIH0pLFxuLyogMTE1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHRPcHRpb25zID0gdW5kZWZpbmVkO1xuXG52YXIgX1Njcm9sbGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExNik7XG5cbnZhciBfU2Nyb2xsYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TY3JvbGxhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1Njcm9sbGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHRPcHRpb25zID0gX1Njcm9sbGFibGUuZGVmYXVsdE9wdGlvbnM7XG5cbi8qKiovIH0pLFxuLyogMTE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHRPcHRpb25zID0gZXhwb3J0cy5zY3JvbGwgPSBleHBvcnRzLm9uRHJhZ1N0b3AgPSBleHBvcnRzLm9uRHJhZ01vdmUgPSBleHBvcnRzLm9uRHJhZ1N0YXJ0ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdFBsdWdpbjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcblxudmFyIF9BYnN0cmFjdFBsdWdpbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdFBsdWdpbjIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkRyYWdTdGFydCA9IGV4cG9ydHMub25EcmFnU3RhcnQgPSBTeW1ib2woJ29uRHJhZ1N0YXJ0Jyk7XG52YXIgb25EcmFnTW92ZSA9IGV4cG9ydHMub25EcmFnTW92ZSA9IFN5bWJvbCgnb25EcmFnTW92ZScpO1xudmFyIG9uRHJhZ1N0b3AgPSBleHBvcnRzLm9uRHJhZ1N0b3AgPSBTeW1ib2woJ29uRHJhZ1N0b3AnKTtcbnZhciBzY3JvbGwgPSBleHBvcnRzLnNjcm9sbCA9IFN5bWJvbCgnc2Nyb2xsJyk7XG5cbi8qKlxuICogU2Nyb2xsYWJsZSBkZWZhdWx0IG9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkZWZhdWx0T3B0aW9uc1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IGRlZmF1bHRPcHRpb25zLnNwZWVkXG4gKiBAcHJvcGVydHkge051bWJlcn0gZGVmYXVsdE9wdGlvbnMuc2Vuc2l0aXZpdHlcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnRbXX0gZGVmYXVsdE9wdGlvbnMuc2Nyb2xsYWJsZUVsZW1lbnRzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZGVmYXVsdE9wdGlvbnMgPSBleHBvcnRzLmRlZmF1bHRPcHRpb25zID0ge1xuICBzcGVlZDogMTAsXG4gIHNlbnNpdGl2aXR5OiAzMCxcbiAgc2Nyb2xsYWJsZUVsZW1lbnRzOiBbXVxufTtcblxuLyoqXG4gKiBTY3JvbGxhYmxlIHBsdWdpbiB3aGljaCBzY3JvbGxzIHRoZSBjbG9zZXN0IHNjcm9sbGFibGUgcGFyZW50XG4gKiBAY2xhc3MgU2Nyb2xsYWJsZVxuICogQG1vZHVsZSBTY3JvbGxhYmxlXG4gKiBAZXh0ZW5kcyBBYnN0cmFjdFBsdWdpblxuICovXG5cbnZhciBTY3JvbGxhYmxlID0gZnVuY3Rpb24gKF9BYnN0cmFjdFBsdWdpbikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTY3JvbGxhYmxlLCBfQWJzdHJhY3RQbHVnaW4pO1xuXG4gIC8qKlxuICAgKiBTY3JvbGxhYmxlIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBTY3JvbGxhYmxlXG4gICAqIEBwYXJhbSB7RHJhZ2dhYmxlfSBkcmFnZ2FibGUgLSBEcmFnZ2FibGUgaW5zdGFuY2VcbiAgICovXG4gIGZ1bmN0aW9uIFNjcm9sbGFibGUoZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU2Nyb2xsYWJsZSk7XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGxhYmxlIG9wdGlvbnNcbiAgICAgKiBAcHJvcGVydHkge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBvcHRpb25zLnNwZWVkXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9wdGlvbnMuc2Vuc2l0aXZpdHlcbiAgICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50W119IG9wdGlvbnMuc2Nyb2xsYWJsZUVsZW1lbnRzXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTY3JvbGxhYmxlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2Nyb2xsYWJsZSkpLmNhbGwodGhpcywgZHJhZ2dhYmxlKSk7XG5cbiAgICBfdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIF90aGlzLmdldE9wdGlvbnMoKSk7XG5cbiAgICAvKipcbiAgICAgKiBLZWVwcyBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9IGN1cnJlbnRNb3VzZVBvc2l0aW9uXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGN1cnJlbnRNb3VzZVBvc2l0aW9uLmNsaWVudFhcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gY3VycmVudE1vdXNlUG9zaXRpb24uY2xpZW50WVxuICAgICAqIEB0eXBlIHtPYmplY3R8bnVsbH1cbiAgICAgKi9cbiAgICBfdGhpcy5jdXJyZW50TW91c2VQb3NpdGlvbiA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgYW5pbWF0aW9uIGZyYW1lXG4gICAgICogQHByb3BlcnR5IHNjcm9sbEFuaW1hdGlvbkZyYW1lXG4gICAgICogQHR5cGUge051bWJlcnxudWxsfVxuICAgICAqL1xuICAgIF90aGlzLnNjcm9sbEFuaW1hdGlvbkZyYW1lID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIENsb3Nlc3Qgc2Nyb2xsYWJsZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IHNjcm9sbGFibGVFbGVtZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fG51bGx9XG4gICAgICovXG4gICAgX3RoaXMuc2Nyb2xsYWJsZUVsZW1lbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQW5pbWF0aW9uIGZyYW1lIGxvb2tpbmcgZm9yIHRoZSBjbG9zZXN0IHNjcm9sbGFibGUgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBmaW5kU2Nyb2xsYWJsZUVsZW1lbnRGcmFtZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ8bnVsbH1cbiAgICAgKi9cbiAgICBfdGhpcy5maW5kU2Nyb2xsYWJsZUVsZW1lbnRGcmFtZSA9IG51bGw7XG5cbiAgICBfdGhpc1tvbkRyYWdTdGFydF0gPSBfdGhpc1tvbkRyYWdTdGFydF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnTW92ZV0gPSBfdGhpc1tvbkRyYWdNb3ZlXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdTdG9wXSA9IF90aGlzW29uRHJhZ1N0b3BdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW3Njcm9sbF0gPSBfdGhpc1tzY3JvbGxdLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBwbHVnaW5zIGV2ZW50IGxpc3RlbmVyc1xuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNjcm9sbGFibGUsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSkub24oJ2RyYWc6bW92ZScsIHRoaXNbb25EcmFnTW92ZV0pLm9uKCdkcmFnOnN0b3AnLCB0aGlzW29uRHJhZ1N0b3BdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBwbHVnaW5zIGV2ZW50IGxpc3RlbmVyc1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ2RyYWc6c3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSkub2ZmKCdkcmFnOm1vdmUnLCB0aGlzW29uRHJhZ01vdmVdKS5vZmYoJ2RyYWc6c3RvcCcsIHRoaXNbb25EcmFnU3RvcF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgb3B0aW9ucyBwYXNzZWQgdGhyb3VnaCBkcmFnZ2FibGVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldE9wdGlvbnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuc2Nyb2xsYWJsZSB8fCB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNsb3Nlc3Qgc2Nyb2xsYWJsZSBlbGVtZW50cyBieSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFNjcm9sbGFibGVFbGVtZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2Nyb2xsYWJsZUVsZW1lbnQodGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy5oYXNEZWZpbmVkU2Nyb2xsYWJsZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgcmV0dXJuICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuc2Nyb2xsYWJsZUVsZW1lbnRzKSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2xvc2VzdFNjcm9sbGFibGVFbGVtZW50KHRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGF0IGxlYXN0IG9uZSBzY3JvbGxhYmxlIGVsZW1lbnQgaGF2ZSBiZWVuIGRlZmluZWQgdmlhIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdoYXNEZWZpbmVkU2Nyb2xsYWJsZUVsZW1lbnRzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzRGVmaW5lZFNjcm9sbGFibGVFbGVtZW50cygpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMub3B0aW9ucy5zY3JvbGxhYmxlRWxlbWVudHMubGVuZ3RoICE9PSAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0YXJ0IGhhbmRsZXIuIEZpbmRzIGNsb3Nlc3Qgc2Nyb2xsYWJsZSBwYXJlbnQgaW4gc2VwYXJhdGUgZnJhbWVcbiAgICAgKiBAcGFyYW0ge0RyYWdTdGFydEV2ZW50fSBkcmFnRXZlbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShkcmFnRXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB0aGlzLmZpbmRTY3JvbGxhYmxlRWxlbWVudEZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLnNjcm9sbGFibGVFbGVtZW50ID0gX3RoaXMyLmdldFNjcm9sbGFibGVFbGVtZW50KGRyYWdFdmVudC5zb3VyY2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBtb3ZlIGhhbmRsZXIuIFJlbWVtYmVycyBtb3VzZSBwb3NpdGlvbiBhbmQgaW5pdGlhdGVzIHNjcm9sbGluZ1xuICAgICAqIEBwYXJhbSB7RHJhZ01vdmVFdmVudH0gZHJhZ0V2ZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdNb3ZlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShkcmFnRXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB0aGlzLmZpbmRTY3JvbGxhYmxlRWxlbWVudEZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMzLnNjcm9sbGFibGVFbGVtZW50ID0gX3RoaXMzLmdldFNjcm9sbGFibGVFbGVtZW50KGRyYWdFdmVudC5zZW5zb3JFdmVudC50YXJnZXQpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghdGhpcy5zY3JvbGxhYmxlRWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGRyYWdFdmVudC5zZW5zb3JFdmVudDtcbiAgICAgIHZhciBzY3JvbGxPZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcblxuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuICAgICAgICBzY3JvbGxPZmZzZXQueSA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDA7XG4gICAgICAgIHNjcm9sbE9mZnNldC54ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRNb3VzZVBvc2l0aW9uID0ge1xuICAgICAgICBjbGllbnRYOiBzZW5zb3JFdmVudC5jbGllbnRYIC0gc2Nyb2xsT2Zmc2V0LngsXG4gICAgICAgIGNsaWVudFk6IHNlbnNvckV2ZW50LmNsaWVudFkgLSBzY3JvbGxPZmZzZXQueVxuICAgICAgfTtcblxuICAgICAgdGhpcy5zY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzW3Njcm9sbF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RvcCBoYW5kbGVyLiBDYW5jZWxzIHNjcm9sbCBhbmltYXRpb25zIGFuZCByZXNldHMgc3RhdGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0b3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zY3JvbGxBbmltYXRpb25GcmFtZSk7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZpbmRTY3JvbGxhYmxlRWxlbWVudEZyYW1lKTtcblxuICAgICAgdGhpcy5zY3JvbGxhYmxlRWxlbWVudCA9IG51bGw7XG4gICAgICB0aGlzLnNjcm9sbEFuaW1hdGlvbkZyYW1lID0gbnVsbDtcbiAgICAgIHRoaXMuZmluZFNjcm9sbGFibGVFbGVtZW50RnJhbWUgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50TW91c2VQb3NpdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Nyb2xsIGZ1bmN0aW9uIHRoYXQgZG9lcyB0aGUgaGVhdnlsaWZ0aW5nXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBzY3JvbGwsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgaWYgKCF0aGlzLnNjcm9sbGFibGVFbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zY3JvbGxBbmltYXRpb25GcmFtZSk7XG5cbiAgICAgIHZhciB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIHZhciByZWN0ID0gdGhpcy5zY3JvbGxhYmxlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciByaWdodCA9IHJlY3QucmlnaHQsXG4gICAgICAgICAgbGVmdCA9IHJlY3QubGVmdDtcblxuICAgICAgdmFyIHRvcCA9IHZvaWQgMDtcbiAgICAgIHZhciBib3R0b20gPSB2b2lkIDA7XG5cbiAgICAgIGlmIChyZWN0LnRvcCA8IDApIHtcbiAgICAgICAgdG9wID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvcCA9IHJlY3QudG9wO1xuICAgICAgfVxuXG4gICAgICBpZiAod2luZG93SGVpZ2h0IDwgcmVjdC5ib3R0b20pIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnQgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnQgPSB0aGlzLmdldFNjcm9sbGFibGVFbGVtZW50KHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnQucGFyZW50Tm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBib3R0b20gPSB3aW5kb3dIZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib3R0b20gPSByZWN0LmJvdHRvbTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9mZnNldFkgPSAoTWF0aC5hYnMoYm90dG9tIC0gdGhpcy5jdXJyZW50TW91c2VQb3NpdGlvbi5jbGllbnRZKSA8PSB0aGlzLm9wdGlvbnMuc2Vuc2l0aXZpdHkpIC0gKE1hdGguYWJzKHRvcCAtIHRoaXMuY3VycmVudE1vdXNlUG9zaXRpb24uY2xpZW50WSkgPD0gdGhpcy5vcHRpb25zLnNlbnNpdGl2aXR5KTtcbiAgICAgIHZhciBvZmZzZXRYID0gKE1hdGguYWJzKHJpZ2h0IC0gdGhpcy5jdXJyZW50TW91c2VQb3NpdGlvbi5jbGllbnRYKSA8PSB0aGlzLm9wdGlvbnMuc2Vuc2l0aXZpdHkpIC0gKE1hdGguYWJzKGxlZnQgLSB0aGlzLmN1cnJlbnRNb3VzZVBvc2l0aW9uLmNsaWVudFgpIDw9IHRoaXMub3B0aW9ucy5zZW5zaXRpdml0eSk7XG5cbiAgICAgIGlmICghb2Zmc2V0WCAmJiAhb2Zmc2V0WSkge1xuICAgICAgICBvZmZzZXRYID0gKHdpbmRvd1dpZHRoIC0gdGhpcy5jdXJyZW50TW91c2VQb3NpdGlvbi5jbGllbnRYIDw9IHRoaXMub3B0aW9ucy5zZW5zaXRpdml0eSkgLSAodGhpcy5jdXJyZW50TW91c2VQb3NpdGlvbi5jbGllbnRYIDw9IHRoaXMub3B0aW9ucy5zZW5zaXRpdml0eSk7XG4gICAgICAgIG9mZnNldFkgPSAod2luZG93SGVpZ2h0IC0gdGhpcy5jdXJyZW50TW91c2VQb3NpdGlvbi5jbGllbnRZIDw9IHRoaXMub3B0aW9ucy5zZW5zaXRpdml0eSkgLSAodGhpcy5jdXJyZW50TW91c2VQb3NpdGlvbi5jbGllbnRZIDw9IHRoaXMub3B0aW9ucy5zZW5zaXRpdml0eSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUVsZW1lbnQuc2Nyb2xsVG9wICs9IG9mZnNldFkgKiB0aGlzLm9wdGlvbnMuc3BlZWQ7XG4gICAgICB0aGlzLnNjcm9sbGFibGVFbGVtZW50LnNjcm9sbExlZnQgKz0gb2Zmc2V0WCAqIHRoaXMub3B0aW9ucy5zcGVlZDtcblxuICAgICAgdGhpcy5zY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzW3Njcm9sbF0pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2Nyb2xsYWJsZTtcbn0oX0Fic3RyYWN0UGx1Z2luMy5kZWZhdWx0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgZWxlbWVudCBoYXMgb3ZlcmZsb3dcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5cblxuZXhwb3J0cy5kZWZhdWx0ID0gU2Nyb2xsYWJsZTtcbmZ1bmN0aW9uIGhhc092ZXJmbG93KGVsZW1lbnQpIHtcbiAgdmFyIG92ZXJmbG93UmVnZXggPSAvKGF1dG98c2Nyb2xsKS87XG4gIHZhciBjb21wdXRlZFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCk7XG5cbiAgdmFyIG92ZXJmbG93ID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnb3ZlcmZsb3cnKSArIGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ292ZXJmbG93LXknKSArIGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ292ZXJmbG93LXgnKTtcblxuICByZXR1cm4gb3ZlcmZsb3dSZWdleC50ZXN0KG92ZXJmbG93KTtcbn1cblxuLyoqXG4gKiBGaW5kcyBjbG9zZXN0IHNjcm9sbGFibGUgZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbG9zZXN0U2Nyb2xsYWJsZUVsZW1lbnQoZWxlbWVudCkge1xuICB2YXIgc2Nyb2xsYWJsZUVsZW1lbnQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGVsZW1lbnQsIGZ1bmN0aW9uIChjdXJyZW50RWxlbWVudCkge1xuICAgIHJldHVybiBoYXNPdmVyZmxvdyhjdXJyZW50RWxlbWVudCk7XG4gIH0pO1xuXG4gIHJldHVybiBzY3JvbGxhYmxlRWxlbWVudCB8fCBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBudWxsO1xufVxuXG4vKioqLyB9KSxcbi8qIDExNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2Nsb3Nlc3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExOCk7XG5cbnZhciBfY2xvc2VzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbG9zZXN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Nsb3Nlc3QyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTE4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9Db25zdW1hYmxlQXJyYXkyKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY2xvc2VzdDtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG1hdGNoRnVuY3Rpb24gPSBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3I7XG5cbi8qKlxuICogR2V0IHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IG9mIGEgZ2l2ZW4gZWxlbWVudCB0aGF0IG1hdGNoZXMgdGhlIGdpdmVuXG4gKiBzZWxlY3RvciBzdHJpbmcgb3IgbWF0Y2hpbmcgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGNoaWxkIGVsZW1lbnQgdG8gZmluZCBhIHBhcmVudCBvZlxuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHNlbGVjdG9yIFRoZSBzdHJpbmcgb3IgZnVuY3Rpb24gdG8gdXNlIHRvIG1hdGNoXG4gKiAgICAgdGhlIHBhcmVudCBlbGVtZW50XG4gKiBAcmV0dXJuIHtFbGVtZW50fG51bGx9XG4gKi9cbmZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudCwgdmFsdWUpIHtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgc2VsZWN0b3IgPSB2YWx1ZTtcbiAgdmFyIGNhbGxiYWNrID0gdmFsdWU7XG4gIHZhciBub2RlTGlzdCA9IHZhbHVlO1xuICB2YXIgc2luZ2xlRWxlbWVudCA9IHZhbHVlO1xuXG4gIHZhciBpc1NlbGVjdG9yID0gQm9vbGVhbih0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSBCb29sZWFuKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyk7XG4gIHZhciBpc05vZGVMaXN0ID0gQm9vbGVhbih2YWx1ZSBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpO1xuICB2YXIgaXNFbGVtZW50ID0gQm9vbGVhbih2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KTtcblxuICBmdW5jdGlvbiBjb25kaXRpb25GbihjdXJyZW50RWxlbWVudCkge1xuICAgIGlmICghY3VycmVudEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcbiAgICB9IGVsc2UgaWYgKGlzU2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBtYXRjaEZ1bmN0aW9uLmNhbGwoY3VycmVudEVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgICB9IGVsc2UgaWYgKGlzTm9kZUxpc3QpIHtcbiAgICAgIHJldHVybiBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkobm9kZUxpc3QpKS5pbmNsdWRlcyhjdXJyZW50RWxlbWVudCk7XG4gICAgfSBlbHNlIGlmIChpc0VsZW1lbnQpIHtcbiAgICAgIHJldHVybiBzaW5nbGVFbGVtZW50ID09PSBjdXJyZW50RWxlbWVudDtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhjdXJyZW50RWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50ID0gZWxlbWVudDtcblxuICBkbyB7XG4gICAgY3VycmVudCA9IGN1cnJlbnQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQgfHwgY3VycmVudC5jb3JyZXNwb25kaW5nRWxlbWVudCB8fCBjdXJyZW50O1xuICAgIGlmIChjb25kaXRpb25GbihjdXJyZW50KSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gIH0gd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gZG9jdW1lbnQuYm9keSAmJiBjdXJyZW50ICE9PSBkb2N1bWVudCk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiovIH0pLFxuLyogMTE5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXygxMjApLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogMTIwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oNDYpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMjEpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLkFycmF5LmZyb207XG5cblxuLyoqKi8gfSksXG4vKiAxMjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjdHggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcbnZhciB0b09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpO1xudmFyIGNhbGwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyMik7XG52YXIgaXNBcnJheUl0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyMyk7XG52YXIgdG9MZW5ndGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oMTI0KTtcbnZhciBnZXRJdGVyRm4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyNSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIV9fd2VicGFja19yZXF1aXJlX18oMTI3KShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcblxuXG4vKioqLyB9KSxcbi8qIDEyMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vKioqLyB9KSxcbi8qIDEyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG52YXIgSVRFUkFUT1IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTI0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcbnZhciBjcmVhdGVEZXNjID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTI1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBjbGFzc29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjYpO1xudmFyIElURVJBVE9SID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTI2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMSk7XG52YXIgVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTI3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBJVEVSQVRPUiA9IF9fd2VicGFja19yZXF1aXJlX18oNSkoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDEyOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0FjY2Vzc2liaWxpdHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyOSk7XG5cbnZhciBfQWNjZXNzaWJpbGl0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY2Nlc3NpYmlsaXR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0FjY2Vzc2liaWxpdHkyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTI5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0UGx1Z2luMiA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXG52YXIgX0Fic3RyYWN0UGx1Z2luMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0UGx1Z2luMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBBUklBX0dSQUJCRUQgPSAnYXJpYS1ncmFiYmVkJztcbnZhciBBUklBX0RST1BFRkZFQ1QgPSAnYXJpYS1kcm9wZWZmZWN0JztcbnZhciBUQUJJTkRFWCA9ICd0YWJpbmRleCc7XG5cbi8qKlxuICogX19XSVBfXyBBY2Nlc3NpYmlsaXR5IHBsdWdpblxuICogQGNsYXNzIEFjY2Vzc2liaWxpdHlcbiAqIEBtb2R1bGUgQWNjZXNzaWJpbGl0eVxuICogQGV4dGVuZHMgQWJzdHJhY3RQbHVnaW5cbiAqL1xuXG52YXIgQWNjZXNzaWJpbGl0eSA9IGZ1bmN0aW9uIChfQWJzdHJhY3RQbHVnaW4pIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoQWNjZXNzaWJpbGl0eSwgX0Fic3RyYWN0UGx1Z2luKTtcblxuICAvKipcbiAgICogQWNjZXNzaWJpbGl0eSBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgQWNjZXNzaWJpbGl0eVxuICAgKiBAcGFyYW0ge0RyYWdnYWJsZX0gZHJhZ2dhYmxlIC0gRHJhZ2dhYmxlIGluc3RhbmNlXG4gICAqL1xuICBmdW5jdGlvbiBBY2Nlc3NpYmlsaXR5KGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEFjY2Vzc2liaWxpdHkpO1xuXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQWNjZXNzaWJpbGl0eS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEFjY2Vzc2liaWxpdHkpKS5jYWxsKHRoaXMsIGRyYWdnYWJsZSkpO1xuXG4gICAgX3RoaXMuX29uSW5pdCA9IF90aGlzLl9vbkluaXQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uRGVzdHJveSA9IF90aGlzLl9vbkRlc3Ryb3kuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIGxpc3RlbmVycyB0byBkcmFnZ2FibGVcbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShBY2Nlc3NpYmlsaXR5LCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdpbml0JywgdGhpcy5fb25Jbml0KS5vbignZGVzdHJveScsIHRoaXMuX29uRGVzdHJveSkub24oJ2RyYWc6c3RhcnQnLCBfb25EcmFnU3RhcnQpLm9uKCdkcmFnOnN0b3AnLCBfb25EcmFnU3RvcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgbGlzdGVuZXJzIGZyb20gZHJhZ2dhYmxlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignaW5pdCcsIHRoaXMuX29uSW5pdCkub2ZmKCdkZXN0cm95JywgdGhpcy5fb25EZXN0cm95KS5vZmYoJ2RyYWc6c3RhcnQnLCBfb25EcmFnU3RhcnQpLm9mZignZHJhZzpzdG9wJywgX29uRHJhZ1N0b3ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGlhbGl6ZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IHBhcmFtLmNvbnRhaW5lcnNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX29uSW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkluaXQoX3JlZikge1xuICAgICAgdmFyIGNvbnRhaW5lcnMgPSBfcmVmLmNvbnRhaW5lcnM7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKEFSSUFfRFJPUEVGRkVDVCwgdGhpcy5kcmFnZ2FibGUub3B0aW9ucy50eXBlKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuZHJhZ2dhYmxlKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShUQUJJTkRFWCwgMCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgaGFuZGxlciBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IHBhcmFtLmNvbnRhaW5lcnNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX29uRGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRlc3Ryb3koX3JlZjIpIHtcbiAgICAgIHZhciBjb250YWluZXJzID0gX3JlZjIuY29udGFpbmVycztcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMzsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IChfc3RlcDMgPSBfaXRlcmF0b3IzLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcDMudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKEFSSUFfRFJPUEVGRkVDVCk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlO1xuICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCh0aGlzLmRyYWdnYWJsZS5vcHRpb25zLmRyYWdnYWJsZSlbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDQ7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSAoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWUpIHtcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBfc3RlcDQudmFsdWU7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoVEFCSU5ERVgsIDApO1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShBUklBX0dSQUJCRUQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjQgPSBlcnI7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgJiYgX2l0ZXJhdG9yNC5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3I0LnJldHVybigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IzLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBBY2Nlc3NpYmlsaXR5O1xufShfQWJzdHJhY3RQbHVnaW4zLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBY2Nlc3NpYmlsaXR5O1xuXG5cbmZ1bmN0aW9uIF9vbkRyYWdTdGFydChfcmVmMykge1xuICB2YXIgc291cmNlID0gX3JlZjMuc291cmNlO1xuXG4gIHNvdXJjZS5zZXRBdHRyaWJ1dGUoQVJJQV9HUkFCQkVELCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gX29uRHJhZ1N0b3AoX3JlZjQpIHtcbiAgdmFyIHNvdXJjZSA9IF9yZWY0LnNvdXJjZTtcblxuICBzb3VyY2Uuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgZmFsc2UpO1xufVxuXG4vKioqLyB9KSxcbi8qIDEzMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBzZW5zb3IgY2xhc3MuIEV4dGVuZCBmcm9tIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbmV3IG9yIGN1c3RvbSBzZW5zb3JcbiAqIEBjbGFzcyBTZW5zb3JcbiAqIEBtb2R1bGUgU2Vuc29yXG4gKi9cbnZhciBTZW5zb3IgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIFNlbnNvciBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgU2Vuc29yXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTZW5zb3IpO1xuXG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGNvbnRhaW5lcnNcbiAgICAgKiBAcHJvcGVydHkgY29udGFpbmVyc1xuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIHRoaXMuY29udGFpbmVycyA9IGNvbnRhaW5lcnM7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IG9wdGlvbnNcbiAgICAgKiBAcHJvcGVydHkgb3B0aW9uc1xuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGRyYWcgc3RhdGVcbiAgICAgKiBAcHJvcGVydHkgZHJhZ2dpbmdcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGNvbnRhaW5lclxuICAgICAqIEBwcm9wZXJ0eSBjdXJyZW50Q29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgKiBAcmV0dXJuIHtTZW5zb3J9XG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU2Vuc29yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICAgKiBAcmV0dXJuIHtTZW5zb3J9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGV2ZW50IG9uIHRhcmdldCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIEVsZW1lbnQgdG8gdHJpZ2dlciBldmVudCBvblxuICAgICAqIEBwYXJhbSB7U2Vuc29yRXZlbnR9IHNlbnNvckV2ZW50IC0gU2Vuc29yIGV2ZW50IHRvIHRyaWdnZXJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndHJpZ2dlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIoZWxlbWVudCwgc2Vuc29yRXZlbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgZXZlbnQuZGV0YWlsID0gc2Vuc29yRXZlbnQ7XG4gICAgICBldmVudC5pbml0RXZlbnQoc2Vuc29yRXZlbnQudHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgdGhpcy5sYXN0RXZlbnQgPSBzZW5zb3JFdmVudDtcbiAgICAgIHJldHVybiBzZW5zb3JFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNlbnNvcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vuc29yO1xuXG4vKioqLyB9KSxcbi8qIDEzMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX01vdXNlU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzIpO1xuXG52YXIgX01vdXNlU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01vdXNlU2Vuc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX01vdXNlU2Vuc29yMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDEzMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgX1NlbnNvcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcblxudmFyIF9TZW5zb3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Vuc29yMik7XG5cbnZhciBfU2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uQ29udGV4dE1lbnVXaGlsZURyYWdnaW5nID0gU3ltYm9sKCdvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZycpO1xudmFyIG9uTW91c2VEb3duID0gU3ltYm9sKCdvbk1vdXNlRG93bicpO1xudmFyIG9uTW91c2VNb3ZlID0gU3ltYm9sKCdvbk1vdXNlTW92ZScpO1xudmFyIG9uTW91c2VVcCA9IFN5bWJvbCgnb25Nb3VzZVVwJyk7XG5cbi8qKlxuICogVGhpcyBzZW5zb3IgcGlja3MgdXAgbmF0aXZlIGJyb3dzZXIgbW91c2UgZXZlbnRzIGFuZCBkaWN0YXRlcyBkcmFnIG9wZXJhdGlvbnNcbiAqIEBjbGFzcyBNb3VzZVNlbnNvclxuICogQG1vZHVsZSBNb3VzZVNlbnNvclxuICogQGV4dGVuZHMgU2Vuc29yXG4gKi9cblxudmFyIE1vdXNlU2Vuc29yID0gZnVuY3Rpb24gKF9TZW5zb3IpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTW91c2VTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIC8qKlxuICAgKiBNb3VzZVNlbnNvciBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgTW91c2VTZW5zb3JcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gQ29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIE1vdXNlU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTW91c2VTZW5zb3IpO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGlmIG1vdXNlIGJ1dHRvbiBpcyBzdGlsbCBkb3duXG4gICAgICogQHByb3BlcnR5IG1vdXNlRG93blxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1vdXNlU2Vuc29yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW91c2VTZW5zb3IpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogTW91c2UgZG93biB0aW1lciB3aGljaCB3aWxsIGVuZCB1cCB0cmlnZ2VyaW5nIHRoZSBkcmFnIHN0YXJ0IG9wZXJhdGlvblxuICAgICAqIEBwcm9wZXJ0eSBtb3VzZURvd25UaW1lb3V0XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBfdGhpcy5tb3VzZURvd25UaW1lb3V0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBpZiBjb250ZXh0IG1lbnUgaGFzIGJlZW4gb3BlbmVkIGR1cmluZyBkcmFnIG9wZXJhdGlvblxuICAgICAqIEBwcm9wZXJ0eSBvcGVuZWRDb250ZXh0TWVudVxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIF90aGlzLm9wZW5lZENvbnRleHRNZW51ID0gZmFsc2U7XG5cbiAgICBfdGhpc1tvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZ10gPSBfdGhpc1tvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZ10uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZURvd25dID0gX3RoaXNbb25Nb3VzZURvd25dLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VNb3ZlXSA9IF90aGlzW29uTW91c2VNb3ZlXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlVXBdID0gX3RoaXNbb25Nb3VzZVVwXS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE1vdXNlU2Vuc29yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBkb3duIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZG93biBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VEb3duLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmIChldmVudC5idXR0b24gIT09IDAgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXNbb25Nb3VzZVVwXSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBwcmV2ZW50TmF0aXZlRHJhZ1N0YXJ0KTtcblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB2YXIgY29udGFpbmVyID0gKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIHRoaXMuY29udGFpbmVycyk7XG5cbiAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5tb3VzZURvd25UaW1lb3V0KTtcbiAgICAgIHRoaXMubW91c2VEb3duVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIV90aGlzMi5tb3VzZURvd24pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnU3RhcnRFdmVudCk7XG5cbiAgICAgICAgX3RoaXMyLmN1cnJlbnRDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIF90aGlzMi5kcmFnZ2luZyA9ICFkcmFnU3RhcnRFdmVudC5jYW5jZWxlZCgpO1xuXG4gICAgICAgIGlmIChfdGhpczIuZHJhZ2dpbmcpIHtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIF90aGlzMltvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZ10pO1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIF90aGlzMltvbk1vdXNlTW92ZV0pO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIG1vdmUgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBtb3ZlIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZU1vdmUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgdXAgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSB1cCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VVcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHRoaXMubW91c2VEb3duID0gQm9vbGVhbih0aGlzLm9wZW5lZENvbnRleHRNZW51KTtcblxuICAgICAgaWYgKHRoaXMub3BlbmVkQ29udGV4dE1lbnUpIHtcbiAgICAgICAgdGhpcy5vcGVuZWRDb250ZXh0TWVudSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgcHJldmVudE5hdGl2ZURyYWdTdGFydCk7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzW29uQ29udGV4dE1lbnVXaGlsZURyYWdnaW5nXSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzW29uTW91c2VNb3ZlXSk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udGV4dCBtZW51IGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQ29udGV4dCBtZW51IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Db250ZXh0TWVudVdoaWxlRHJhZ2dpbmcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5vcGVuZWRDb250ZXh0TWVudSA9IHRydWU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNb3VzZVNlbnNvcjtcbn0oX1NlbnNvcjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1vdXNlU2Vuc29yO1xuXG5cbmZ1bmN0aW9uIHByZXZlbnROYXRpdmVEcmFnU3RhcnQoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuLyoqKi8gfSksXG4vKiAxMzMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdG9wU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdNb3ZlU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdGFydFNlbnNvckV2ZW50ID0gZXhwb3J0cy5TZW5zb3JFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIHNlbnNvciBldmVudFxuICogQGNsYXNzIFNlbnNvckV2ZW50XG4gKiBAbW9kdWxlIFNlbnNvckV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBTZW5zb3JFdmVudCA9IGV4cG9ydHMuU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU2Vuc29yRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNlbnNvckV2ZW50LCBbe1xuICAgIGtleTogJ29yaWdpbmFsRXZlbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBicm93c2VyIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIGEgc2Vuc29yXG4gICAgICogQHByb3BlcnR5IG9yaWdpbmFsRXZlbnRcbiAgICAgKiBAdHlwZSB7RXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9yaWdpbmFsRXZlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplZCBjbGllbnRYIGZvciBib3RoIHRvdWNoIGFuZCBtb3VzZSBldmVudHNcbiAgICAgKiBAcHJvcGVydHkgY2xpZW50WFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NsaWVudFgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jbGllbnRYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZWQgY2xpZW50WSBmb3IgYm90aCB0b3VjaCBhbmQgbW91c2UgZXZlbnRzXG4gICAgICogQHByb3BlcnR5IGNsaWVudFlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjbGllbnRZJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY2xpZW50WTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemVkIHRhcmdldCBmb3IgYm90aCB0b3VjaCBhbmQgbW91c2UgZXZlbnRzXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCB0aGF0IGlzIGJlaGluZCBjdXJzb3Igb3IgdG91Y2ggcG9pbnRlclxuICAgICAqIEBwcm9wZXJ0eSB0YXJnZXRcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RhcmdldCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnRhcmdldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb250YWluZXIgdGhhdCBpbml0aWF0ZWQgdGhlIHNlbnNvclxuICAgICAqIEBwcm9wZXJ0eSBjb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFja3BhZCBwcmVzc3VyZVxuICAgICAqIEBwcm9wZXJ0eSBwcmVzc3VyZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3ByZXNzdXJlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEucHJlc3N1cmU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTZW5zb3JFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIERyYWcgc3RhcnQgc2Vuc29yIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ1N0YXJ0U2Vuc29yRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ1N0YXJ0U2Vuc29yRXZlbnRcbiAqIEBleHRlbmRzIFNlbnNvckV2ZW50XG4gKi9cblxuXG52YXIgRHJhZ1N0YXJ0U2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdGFydFNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9TZW5zb3JFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RhcnRTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnU3RhcnRTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RhcnRTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdGFydFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0YXJ0U2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RhcnRTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgbW92ZSBzZW5zb3IgZXZlbnRcbiAqIEBjbGFzcyBEcmFnTW92ZVNlbnNvckV2ZW50XG4gKiBAbW9kdWxlIERyYWdNb3ZlU2Vuc29yRXZlbnRcbiAqIEBleHRlbmRzIFNlbnNvckV2ZW50XG4gKi9cblxuXG5EcmFnU3RhcnRTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6c3RhcnQnO1xuXG52YXIgRHJhZ01vdmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVTZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfU2Vuc29yRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdNb3ZlU2Vuc29yRXZlbnQsIF9TZW5zb3JFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyYWdNb3ZlU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ01vdmVTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdNb3ZlU2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnTW92ZVNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ01vdmVTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgc3RvcCBzZW5zb3IgZXZlbnRcbiAqIEBjbGFzcyBEcmFnU3RvcFNlbnNvckV2ZW50XG4gKiBAbW9kdWxlIERyYWdTdG9wU2Vuc29yRXZlbnRcbiAqIEBleHRlbmRzIFNlbnNvckV2ZW50XG4gKi9cblxuXG5EcmFnTW92ZVNlbnNvckV2ZW50LnR5cGUgPSAnZHJhZzptb3ZlJztcblxudmFyIERyYWdTdG9wU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdG9wU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RvcFNlbnNvckV2ZW50LCBfU2Vuc29yRXZlbnQzKTtcblxuICBmdW5jdGlvbiBEcmFnU3RvcFNlbnNvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdTdG9wU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU3RvcFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0b3BTZW5zb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdTdG9wU2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuLyoqXG4gKiBEcmFnIHByZXNzdXJlIHNlbnNvciBldmVudFxuICogQGNsYXNzIERyYWdQcmVzc3VyZVNlbnNvckV2ZW50XG4gKiBAbW9kdWxlIERyYWdQcmVzc3VyZVNlbnNvckV2ZW50XG4gKiBAZXh0ZW5kcyBTZW5zb3JFdmVudFxuICovXG5cblxuRHJhZ1N0b3BTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6c3RvcCc7XG5cbnZhciBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50NCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnUHJlc3N1cmVTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdQcmVzc3VyZVNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQudHlwZSA9ICdkcmFnOnByZXNzdXJlJztcblxuLyoqKi8gfSksXG4vKiAxMzQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Ub3VjaFNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTM1KTtcblxudmFyIF9Ub3VjaFNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub3VjaFNlbnNvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Ub3VjaFNlbnNvcjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMzUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9TZW5zb3IyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMCk7XG5cbnZhciBfU2Vuc29yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlbnNvcjIpO1xuXG52YXIgX1NlbnNvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvblRvdWNoU3RhcnQgPSBTeW1ib2woJ29uVG91Y2hTdGFydCcpO1xudmFyIG9uVG91Y2hIb2xkID0gU3ltYm9sKCdvblRvdWNoSG9sZCcpO1xudmFyIG9uVG91Y2hFbmQgPSBTeW1ib2woJ29uVG91Y2hFbmQnKTtcbnZhciBvblRvdWNoTW92ZSA9IFN5bWJvbCgnb25Ub3VjaE1vdmUnKTtcbnZhciBvblNjcm9sbCA9IFN5bWJvbCgnb25TY3JvbGwnKTtcblxuLyoqXG4gKiBBZGRzIGRlZmF1bHQgZG9jdW1lbnQub250b3VjaG1vdmUuIFdvcmthcm91bmQgZm9yIHByZXZlbnRpbmcgc2Nyb2xsaW5nIG9uIHRvdWNobW92ZVxuICovXG5kb2N1bWVudC5vbnRvdWNobW92ZSA9IGRvY3VtZW50Lm9udG91Y2htb3ZlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFRoaXMgc2Vuc29yIHBpY2tzIHVwIG5hdGl2ZSBicm93c2VyIHRvdWNoIGV2ZW50cyBhbmQgZGljdGF0ZXMgZHJhZyBvcGVyYXRpb25zXG4gKiBAY2xhc3MgVG91Y2hTZW5zb3JcbiAqIEBtb2R1bGUgVG91Y2hTZW5zb3JcbiAqIEBleHRlbmRzIFNlbnNvclxuICovXG5cbnZhciBUb3VjaFNlbnNvciA9IGZ1bmN0aW9uIChfU2Vuc29yKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFRvdWNoU2Vuc29yLCBfU2Vuc29yKTtcblxuICAvKipcbiAgICogVG91Y2hTZW5zb3IgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIFRvdWNoU2Vuc29yXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBUb3VjaFNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFRvdWNoU2Vuc29yKTtcblxuICAgIC8qKlxuICAgICAqIENsb3Nlc3Qgc2Nyb2xsYWJsZSBjb250YWluZXIgc28gYWNjaWRlbnRhbCBzY3JvbGwgY2FuIGNhbmNlbCBsb25nIHRvdWNoXG4gICAgICogQHByb3BlcnR5IGN1cnJlbnRTY3JvbGxhYmxlUGFyZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFRvdWNoU2Vuc29yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVG91Y2hTZW5zb3IpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFRpbWVvdXRJRCBmb3IgbG9uZyB0b3VjaFxuICAgICAqIEBwcm9wZXJ0eSB0YXBUaW1lb3V0XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBfdGhpcy50YXBUaW1lb3V0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIHRvdWNoTW92ZWQgaW5kaWNhdGVzIGlmIHRvdWNoIGhhcyBtb3ZlZCBkdXJpbmcgdGFwVGltZW91dFxuICAgICAqIEBwcm9wZXJ0eSB0b3VjaE1vdmVkXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgX3RoaXMudG91Y2hNb3ZlZCA9IGZhbHNlO1xuXG4gICAgX3RoaXNbb25Ub3VjaFN0YXJ0XSA9IF90aGlzW29uVG91Y2hTdGFydF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Ub3VjaEhvbGRdID0gX3RoaXNbb25Ub3VjaEhvbGRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uVG91Y2hFbmRdID0gX3RoaXNbb25Ub3VjaEVuZF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Ub3VjaE1vdmVdID0gX3RoaXNbb25Ub3VjaE1vdmVdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uU2Nyb2xsXSA9IF90aGlzW29uU2Nyb2xsXS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFRvdWNoU2Vuc29yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzW29uVG91Y2hTdGFydF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXNbb25Ub3VjaFN0YXJ0XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG91Y2ggc3RhcnQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUb3VjaCBzdGFydCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uVG91Y2hTdGFydCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBjb250YWluZXIgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGV2ZW50LnRhcmdldCwgdGhpcy5jb250YWluZXJzKTtcblxuICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzW29uVG91Y2hNb3ZlXSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpc1tvblRvdWNoRW5kXSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXNbb25Ub3VjaEVuZF0pO1xuXG4gICAgICAvLyBkZXRlY3QgaWYgYm9keSBpcyBzY3JvbGxpbmcgb24gaU9TXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzW29uU2Nyb2xsXSk7XG4gICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBvbkNvbnRleHRNZW51KTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgICB0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50ID0gKDAsIF91dGlscy5jbG9zZXN0KShjb250YWluZXIsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm9mZnNldEhlaWdodCA8IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpc1tvblNjcm9sbF0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhcFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXNbb25Ub3VjaEhvbGRdKGV2ZW50LCBjb250YWluZXIpLCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvdWNoIGhvbGQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUb3VjaCBzdGFydCBldmVudFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciAtIENvbnRhaW5lciBlbGVtZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Ub3VjaEhvbGQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50LCBjb250YWluZXIpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX3RoaXMyLnRvdWNoTW92ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICAgIGNsaWVudFg6IHRvdWNoLnBhZ2VYLFxuICAgICAgICAgIGNsaWVudFk6IHRvdWNoLnBhZ2VZLFxuICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICAgIF90aGlzMi5kcmFnZ2luZyA9ICFkcmFnU3RhcnRFdmVudC5jYW5jZWxlZCgpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb3VjaCBtb3ZlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVG91Y2ggbW92ZSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uVG91Y2hNb3ZlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdGhpcy50b3VjaE1vdmVkID0gdHJ1ZTtcblxuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FuY2VscyBzY3JvbGxpbmcgd2hpbGUgZHJhZ2dpbmdcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHRvdWNoLnBhZ2VYIC0gd2luZG93LnNjcm9sbFgsIHRvdWNoLnBhZ2VZIC0gd2luZG93LnNjcm9sbFkpO1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IHRvdWNoLnBhZ2VYLFxuICAgICAgICBjbGllbnRZOiB0b3VjaC5wYWdlWSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvdWNoIGVuZCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRvdWNoIGVuZCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uVG91Y2hFbmQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB0aGlzLnRvdWNoTW92ZWQgPSBmYWxzZTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzW29uVG91Y2hFbmRdKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpc1tvblRvdWNoRW5kXSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzW29uVG91Y2hNb3ZlXSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpc1tvblNjcm9sbF0pO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50Q29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXNbb25TY3JvbGxdKTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGFwVGltZW91dCk7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5wYWdlWCAtIHdpbmRvdy5zY3JvbGxYLCB0b3VjaC5wYWdlWSAtIHdpbmRvdy5zY3JvbGxZKTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIGRyYWdTdG9wRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdG9wU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgY2xpZW50WTogdG91Y2gucGFnZVksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgaGFuZGxlciwgY2FuY2VsIHBvdGVudGlhbCBkcmFnIGFuZCBhbGxvdyBzY3JvbGwgb24gaU9TIG9yIG90aGVyIHRvdWNoIGRldmljZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uU2Nyb2xsLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRhcFRpbWVvdXQpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG91Y2hTZW5zb3I7XG59KF9TZW5zb3IzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUb3VjaFNlbnNvcjtcblxuXG5mdW5jdGlvbiBvbkNvbnRleHRNZW51KGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xufVxuXG4vKioqLyB9KSxcbi8qIDEzNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0RyYWdTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzNyk7XG5cbnZhciBfRHJhZ1NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EcmFnU2Vuc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0RyYWdTZW5zb3IyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTM3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfU2Vuc29yMiA9IF9fd2VicGFja19yZXF1aXJlX18oMjApO1xuXG52YXIgX1NlbnNvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZW5zb3IyKTtcblxudmFyIF9TZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb25Nb3VzZURvd24gPSBTeW1ib2woJ29uTW91c2VEb3duJyk7XG52YXIgb25Nb3VzZVVwID0gU3ltYm9sKCdvbk1vdXNlVXAnKTtcbnZhciBvbkRyYWdTdGFydCA9IFN5bWJvbCgnb25EcmFnU3RhcnQnKTtcbnZhciBvbkRyYWdPdmVyID0gU3ltYm9sKCdvbkRyYWdPdmVyJyk7XG52YXIgb25EcmFnRW5kID0gU3ltYm9sKCdvbkRyYWdFbmQnKTtcbnZhciBvbkRyb3AgPSBTeW1ib2woJ29uRHJvcCcpO1xudmFyIHJlc2V0ID0gU3ltYm9sKCdyZXNldCcpO1xuXG4vKipcbiAqIFRoaXMgc2Vuc29yIHBpY2tzIHVwIG5hdGl2ZSBicm93c2VyIGRyYWcgZXZlbnRzIGFuZCBkaWN0YXRlcyBkcmFnIG9wZXJhdGlvbnNcbiAqIEBjbGFzcyBEcmFnU2Vuc29yXG4gKiBAbW9kdWxlIERyYWdTZW5zb3JcbiAqIEBleHRlbmRzIFNlbnNvclxuICovXG5cbnZhciBEcmFnU2Vuc29yID0gZnVuY3Rpb24gKF9TZW5zb3IpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1NlbnNvciwgX1NlbnNvcik7XG5cbiAgLyoqXG4gICAqIERyYWdTZW5zb3IgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIERyYWdTZW5zb3JcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gQ29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIERyYWdTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU2Vuc29yKTtcblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGRvd24gdGltZXIgd2hpY2ggd2lsbCBlbmQgdXAgc2V0dGluZyB0aGUgZHJhZ2dhYmxlIGF0dHJpYnV0ZSwgdW5sZXNzIGNhbmNlbGVkXG4gICAgICogQHByb3BlcnR5IG1vdXNlRG93blRpbWVvdXRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5tb3VzZURvd25UaW1lb3V0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBlbGVtZW50IG5lZWRzIHRvIGJlIHJlbWVtYmVyZWQgdG8gdW5zZXQgdGhlIGRyYWdnYWJsZSBhdHRyaWJ1dGUgYWZ0ZXIgZHJhZyBvcGVyYXRpb24gaGFzIGNvbXBsZXRlZFxuICAgICAqIEBwcm9wZXJ0eSBkcmFnZ2FibGVFbGVtZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIF90aGlzLmRyYWdnYWJsZUVsZW1lbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogTmF0aXZlIGRyYWdnYWJsZSBlbGVtZW50IGNvdWxkIGJlIGxpbmtzIG9yIGltYWdlcywgdGhlaXIgZHJhZ2dhYmxlIHN0YXRlIHdpbGwgYmUgZGlzYWJsZWQgZHVyaW5nIGRyYWcgb3BlcmF0aW9uXG4gICAgICogQHByb3BlcnR5IG5hdGl2ZURyYWdnYWJsZUVsZW1lbnRcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgX3RoaXMubmF0aXZlRHJhZ2dhYmxlRWxlbWVudCA9IG51bGw7XG5cbiAgICBfdGhpc1tvbk1vdXNlRG93bl0gPSBfdGhpc1tvbk1vdXNlRG93bl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZVVwXSA9IF90aGlzW29uTW91c2VVcF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnU3RhcnRdID0gX3RoaXNbb25EcmFnU3RhcnRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ092ZXJdID0gX3RoaXNbb25EcmFnT3Zlcl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnRW5kXSA9IF90aGlzW29uRHJhZ0VuZF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Ecm9wXSA9IF90aGlzW29uRHJvcF0uYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnU2Vuc29yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0YXJ0IGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRHJhZyBzdGFydCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIC8vIE5lZWQgZm9yIGZpcmVmb3guIFwidGV4dFwiIGtleSBpcyBuZWVkZWQgZm9yIElFXG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICcnKTtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gdGhpcy5vcHRpb25zLnR5cGU7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC50YXJnZXQsIHRoaXMuY29udGFpbmVycyk7XG5cbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRyYWdTdGFydEV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnU3RhcnRTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXb3JrYXJvdW5kXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoX3RoaXMyLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdGFydEV2ZW50KTtcblxuICAgICAgICBpZiAoZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICAgIF90aGlzMi5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzMi5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgb3ZlciBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERyYWcgb3ZlciBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ092ZXIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmN1cnJlbnRDb250YWluZXI7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnTW92ZVNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihjb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuXG4gICAgICBpZiAoIWRyYWdNb3ZlRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IHRoaXMub3B0aW9ucy50eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgZW5kIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRHJhZyBlbmQgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdFbmQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpc1tvbk1vdXNlVXBdLCB0cnVlKTtcblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jdXJyZW50Q29udGFpbmVyO1xuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICB0aGlzW3Jlc2V0XSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyb3AgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBEcm9wIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Ecm9wLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGRvd24gaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBkb3duIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZURvd24sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgLy8gRmlyZWZveCBidWcgZm9yIGlucHV0cyB3aXRoaW4gZHJhZ2dhYmxlcyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03MzkwNzFcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgKGV2ZW50LnRhcmdldC5mb3JtIHx8IGV2ZW50LnRhcmdldC5jb250ZW50ZWRpdGFibGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG5hdGl2ZURyYWdnYWJsZUVsZW1lbnQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGV2ZW50LnRhcmdldCwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZHJhZ2dhYmxlO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChuYXRpdmVEcmFnZ2FibGVFbGVtZW50KSB7XG4gICAgICAgIG5hdGl2ZURyYWdnYWJsZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmF0aXZlRHJhZ2dhYmxlRWxlbWVudCA9IG5hdGl2ZURyYWdnYWJsZUVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0sIHRydWUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpc1tvbkRyYWdTdGFydF0sIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpc1tvbkRyYWdPdmVyXSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXNbb25EcmFnRW5kXSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXNbb25Ecm9wXSwgZmFsc2UpO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMubW91c2VEb3duVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0YXJnZXQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMzLmRyYWdnYWJsZUVsZW1lbnQgPSB0YXJnZXQ7XG4gICAgICB9LCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIHVwIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgdXAgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlVXAsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgdGhpc1tyZXNldF0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSB1cCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIHVwIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogcmVzZXQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubW91c2VEb3duVGltZW91dCk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0sIHRydWUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpc1tvbkRyYWdTdGFydF0sIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpc1tvbkRyYWdPdmVyXSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXNbb25EcmFnRW5kXSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXNbb25Ecm9wXSwgZmFsc2UpO1xuXG4gICAgICBpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMubmF0aXZlRHJhZ2dhYmxlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5hdGl2ZURyYWdnYWJsZUVsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVFbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdTZW5zb3I7XG59KF9TZW5zb3IzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcmFnU2Vuc29yO1xuXG4vKioqLyB9KSxcbi8qIDEzOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0ZvcmNlVG91Y2hTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzOSk7XG5cbnZhciBfRm9yY2VUb3VjaFNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Gb3JjZVRvdWNoU2Vuc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0ZvcmNlVG91Y2hTZW5zb3IyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTM5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX1NlbnNvcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcblxudmFyIF9TZW5zb3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Vuc29yMik7XG5cbnZhciBfU2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uTW91c2VGb3JjZVdpbGxCZWdpbiA9IFN5bWJvbCgnb25Nb3VzZUZvcmNlV2lsbEJlZ2luJyk7XG52YXIgb25Nb3VzZUZvcmNlRG93biA9IFN5bWJvbCgnb25Nb3VzZUZvcmNlRG93bicpO1xudmFyIG9uTW91c2VEb3duID0gU3ltYm9sKCdvbk1vdXNlRG93bicpO1xudmFyIG9uTW91c2VGb3JjZUNoYW5nZSA9IFN5bWJvbCgnb25Nb3VzZUZvcmNlQ2hhbmdlJyk7XG52YXIgb25Nb3VzZU1vdmUgPSBTeW1ib2woJ29uTW91c2VNb3ZlJyk7XG52YXIgb25Nb3VzZVVwID0gU3ltYm9sKCdvbk1vdXNlVXAnKTtcbnZhciBvbk1vdXNlRm9yY2VHbG9iYWxDaGFuZ2UgPSBTeW1ib2woJ29uTW91c2VGb3JjZUdsb2JhbENoYW5nZScpO1xuXG4vKipcbiAqIFRoaXMgc2Vuc29yIHBpY2tzIHVwIG5hdGl2ZSBmb3JjZSB0b3VjaCBldmVudHMgYW5kIGRpY3RhdGVzIGRyYWcgb3BlcmF0aW9uc1xuICogQGNsYXNzIEZvcmNlVG91Y2hTZW5zb3JcbiAqIEBtb2R1bGUgRm9yY2VUb3VjaFNlbnNvclxuICogQGV4dGVuZHMgU2Vuc29yXG4gKi9cblxudmFyIEZvcmNlVG91Y2hTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShGb3JjZVRvdWNoU2Vuc29yLCBfU2Vuc29yKTtcblxuICAvKipcbiAgICogRm9yY2VUb3VjaFNlbnNvciBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgRm9yY2VUb3VjaFNlbnNvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBDb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gRm9yY2VUb3VjaFNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEZvcmNlVG91Y2hTZW5zb3IpO1xuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGVsZW1lbnQgbmVlZHMgdG8gYmUgcmVtZW1iZXJlZCB0byB1bnNldCB0aGUgZHJhZ2dhYmxlIGF0dHJpYnV0ZSBhZnRlciBkcmFnIG9wZXJhdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICogQHByb3BlcnR5IG1pZ2h0RHJhZ1xuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKEZvcmNlVG91Y2hTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihGb3JjZVRvdWNoU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5taWdodERyYWcgPSBmYWxzZTtcblxuICAgIF90aGlzW29uTW91c2VGb3JjZVdpbGxCZWdpbl0gPSBfdGhpc1tvbk1vdXNlRm9yY2VXaWxsQmVnaW5dLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VGb3JjZURvd25dID0gX3RoaXNbb25Nb3VzZUZvcmNlRG93bl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZURvd25dID0gX3RoaXNbb25Nb3VzZURvd25dLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VGb3JjZUNoYW5nZV0gPSBfdGhpc1tvbk1vdXNlRm9yY2VDaGFuZ2VdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VNb3ZlXSA9IF90aGlzW29uTW91c2VNb3ZlXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlVXBdID0gX3RoaXNbb25Nb3VzZVVwXS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEZvcmNlVG91Y2hTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZXdpbGxiZWdpbicsIHRoaXNbb25Nb3VzZUZvcmNlV2lsbEJlZ2luXSwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlZG93bicsIHRoaXNbb25Nb3VzZUZvcmNlRG93bl0sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpc1tvbk1vdXNlRG93bl0sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlY2hhbmdlZCcsIHRoaXNbb25Nb3VzZUZvcmNlQ2hhbmdlXSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpc1tvbk1vdXNlTW92ZV0pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXNbb25Nb3VzZVVwXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZXdpbGxiZWdpbicsIHRoaXNbb25Nb3VzZUZvcmNlV2lsbEJlZ2luXSwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlZG93bicsIHRoaXNbb25Nb3VzZUZvcmNlRG93bl0sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpc1tvbk1vdXNlRG93bl0sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlY2hhbmdlZCcsIHRoaXNbb25Nb3VzZUZvcmNlQ2hhbmdlXSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXNbb25Nb3VzZU1vdmVdKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGZvcmNlIHdpbGwgYmVnaW4gaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBmb3JjZSB3aWxsIGJlZ2luIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZUZvcmNlV2lsbEJlZ2luLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMubWlnaHREcmFnID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBmb3JjZSBkb3duIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZm9yY2UgZG93biBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VGb3JjZURvd24sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gIWRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCk7XG4gICAgICB0aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIHVwIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgdXAgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlVXAsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGRvd24gaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBkb3duIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZURvd24sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMubWlnaHREcmFnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTmVlZCB3b3JrYXJvdW5kIGZvciByZWFsIGNsaWNrXG4gICAgICAvLyBDYW5jZWwgcG90ZW50aWFsIGRyYWcgZXZlbnRzXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBtb3ZlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZm9yY2Ugd2lsbCBiZWdpbiBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VNb3ZlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnTW92ZVNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGZvcmNlIGNoYW5nZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIGZvcmNlIGNoYW5nZSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VGb3JjZUNoYW5nZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50KHtcbiAgICAgICAgcHJlc3N1cmU6IGV2ZW50LndlYmtpdEZvcmNlLFxuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGZvcmNlIGdsb2JhbCBjaGFuZ2UgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBmb3JjZSBnbG9iYWwgY2hhbmdlIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZUZvcmNlR2xvYmFsQ2hhbmdlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgdmFyIGRyYWdQcmVzc3VyZUV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudCh7XG4gICAgICAgIHByZXNzdXJlOiBldmVudC53ZWJraXRGb3JjZSxcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdQcmVzc3VyZUV2ZW50KTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEZvcmNlVG91Y2hTZW5zb3I7XG59KF9TZW5zb3IzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGb3JjZVRvdWNoU2Vuc29yO1xuXG4vKioqLyB9KSxcbi8qIDE0MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0T3B0aW9ucyA9IHVuZGVmaW5lZDtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b0NvbnN1bWFibGVBcnJheTIpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9QbHVnaW5zID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OCk7XG5cbnZhciBfRW1pdHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTQxKTtcblxudmFyIF9FbWl0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VtaXR0ZXIpO1xuXG52YXIgX1NlbnNvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU5KTtcblxudmFyIF9EcmFnZ2FibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTYpO1xuXG52YXIgX0RyYWdFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTUpO1xuXG52YXIgX01pcnJvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Nyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkRyYWdTdGFydCA9IFN5bWJvbCgnb25EcmFnU3RhcnQnKTtcbnZhciBvbkRyYWdNb3ZlID0gU3ltYm9sKCdvbkRyYWdNb3ZlJyk7XG52YXIgb25EcmFnU3RvcCA9IFN5bWJvbCgnb25EcmFnU3RvcCcpO1xudmFyIG9uRHJhZ1ByZXNzdXJlID0gU3ltYm9sKCdvbkRyYWdQcmVzc3VyZScpO1xudmFyIGdldEFwcGVuZGFibGVDb250YWluZXIgPSBTeW1ib2woJ2dldEFwcGVuZGFibGVDb250YWluZXInKTtcblxuLyoqXG4gKiBAY29uc3Qge09iamVjdH0gZGVmYXVsdEFubm91bmNlbWVudHNcbiAqIEBjb25zdCB7RnVuY3Rpb259IGRlZmF1bHRBbm5vdW5jZW1lbnRzWydkcmFnOnN0YXJ0J11cbiAqIEBjb25zdCB7RnVuY3Rpb259IGRlZmF1bHRBbm5vdW5jZW1lbnRzWydkcmFnOnN0b3AnXVxuICovXG52YXIgZGVmYXVsdEFubm91bmNlbWVudHMgPSB7XG4gICdkcmFnOnN0YXJ0JzogZnVuY3Rpb24gZHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgcmV0dXJuICdQaWNrZWQgdXAgJyArIChldmVudC5zb3VyY2UudGV4dENvbnRlbnQudHJpbSgpIHx8IGV2ZW50LnNvdXJjZS5pZCB8fCAnZHJhZ2dhYmxlIGVsZW1lbnQnKTtcbiAgfSxcbiAgJ2RyYWc6c3RvcCc6IGZ1bmN0aW9uIGRyYWdTdG9wKGV2ZW50KSB7XG4gICAgcmV0dXJuICdSZWxlYXNlZCAnICsgKGV2ZW50LnNvdXJjZS50ZXh0Q29udGVudC50cmltKCkgfHwgZXZlbnQuc291cmNlLmlkIHx8ICdkcmFnZ2FibGUgZWxlbWVudCcpO1xuICB9XG59O1xuXG52YXIgZGVmYXVsdENsYXNzZXMgPSB7XG4gICdjb250YWluZXI6ZHJhZ2dpbmcnOiAnZHJhZ2dhYmxlLWNvbnRhaW5lci0taXMtZHJhZ2dpbmcnLFxuICAnc291cmNlOmRyYWdnaW5nJzogJ2RyYWdnYWJsZS1zb3VyY2UtLWlzLWRyYWdnaW5nJyxcbiAgJ3NvdXJjZTpwbGFjZWQnOiAnZHJhZ2dhYmxlLXNvdXJjZS0tcGxhY2VkJyxcbiAgJ2NvbnRhaW5lcjpwbGFjZWQnOiAnZHJhZ2dhYmxlLWNvbnRhaW5lci0tcGxhY2VkJyxcbiAgJ2JvZHk6ZHJhZ2dpbmcnOiAnZHJhZ2dhYmxlLS1pcy1kcmFnZ2luZycsXG4gICdkcmFnZ2FibGU6b3Zlcic6ICdkcmFnZ2FibGUtLW92ZXInLFxuICAnY29udGFpbmVyOm92ZXInOiAnZHJhZ2dhYmxlLWNvbnRhaW5lci0tb3ZlcicsXG4gICdzb3VyY2U6b3JpZ2luYWwnOiAnZHJhZ2dhYmxlLS1vcmlnaW5hbCcsXG4gIG1pcnJvcjogJ2RyYWdnYWJsZS1taXJyb3InXG59O1xuXG52YXIgZGVmYXVsdE9wdGlvbnMgPSBleHBvcnRzLmRlZmF1bHRPcHRpb25zID0ge1xuICBkcmFnZ2FibGU6ICcuZHJhZ2dhYmxlLXNvdXJjZScsXG4gIGhhbmRsZTogbnVsbCxcbiAgZGVsYXk6IDEwMCxcbiAgcGxhY2VkVGltZW91dDogODAwLFxuICBwbHVnaW5zOiBbXSxcbiAgc2Vuc29yczogW11cbn07XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY29yZSBkcmFnZ2FibGUgbGlicmFyeSB0aGF0IGRvZXMgdGhlIGhlYXZ5IGxpZnRpbmdcbiAqIEBjbGFzcyBEcmFnZ2FibGVcbiAqIEBtb2R1bGUgRHJhZ2dhYmxlXG4gKi9cblxudmFyIERyYWdnYWJsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogRHJhZ2dhYmxlIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBEcmFnZ2FibGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gRHJhZ2dhYmxlIGNvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBkcmFnZ2FibGVcbiAgICovXG4gIGZ1bmN0aW9uIERyYWdnYWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW2RvY3VtZW50LmJvZHldO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnZ2FibGUpO1xuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyc1xuICAgICAqIEBwcm9wZXJ0eSBjb250YWluZXJzXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgaWYgKGNvbnRhaW5lcnMgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBjb250YWluZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuY29udGFpbmVycyA9IFtdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KShjb250YWluZXJzKSk7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXJzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY29udGFpbmVycyA9IFtjb250YWluZXJzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEcmFnZ2FibGUgY29udGFpbmVycyBhcmUgZXhwZWN0ZWQgdG8gYmUgb2YgdHlwZSBgTm9kZUxpc3RgLCBgSFRNTEVsZW1lbnRbXWAgb3IgYEhUTUxFbGVtZW50YCcpO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zLCB7XG4gICAgICBjbGFzc2VzOiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2xhc3Nlcywgb3B0aW9ucy5jbGFzc2VzIHx8IHt9KSxcbiAgICAgIGFubm91bmNlbWVudHM6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRBbm5vdW5jZW1lbnRzLCBvcHRpb25zLmFubm91bmNlbWVudHMgfHwge30pXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIGV2ZW50IGVtaXR0ZXJcbiAgICAgKiBAcHJvcGVydHkgZW1pdHRlclxuICAgICAqIEB0eXBlIHtFbWl0dGVyfVxuICAgICAqL1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBfRW1pdHRlcjIuZGVmYXVsdCgpO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBkcmFnIHN0YXRlXG4gICAgICogQHByb3BlcnR5IGRyYWdnaW5nXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQWN0aXZlIHBsdWdpbnNcbiAgICAgKiBAcHJvcGVydHkgcGx1Z2luc1xuICAgICAqIEB0eXBlIHtQbHVnaW5bXX1cbiAgICAgKi9cbiAgICB0aGlzLnBsdWdpbnMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEFjdGl2ZSBzZW5zb3JzXG4gICAgICogQHByb3BlcnR5IHNlbnNvcnNcbiAgICAgKiBAdHlwZSB7U2Vuc29yW119XG4gICAgICovXG4gICAgdGhpcy5zZW5zb3JzID0gW107XG5cbiAgICB0aGlzW29uRHJhZ1N0YXJ0XSA9IHRoaXNbb25EcmFnU3RhcnRdLmJpbmQodGhpcyk7XG4gICAgdGhpc1tvbkRyYWdNb3ZlXSA9IHRoaXNbb25EcmFnTW92ZV0uYmluZCh0aGlzKTtcbiAgICB0aGlzW29uRHJhZ1N0b3BdID0gdGhpc1tvbkRyYWdTdG9wXS5iaW5kKHRoaXMpO1xuICAgIHRoaXNbb25EcmFnUHJlc3N1cmVdID0gdGhpc1tvbkRyYWdQcmVzc3VyZV0uYmluZCh0aGlzKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6c3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzptb3ZlJywgdGhpc1tvbkRyYWdNb3ZlXSwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpzdG9wJywgdGhpc1tvbkRyYWdTdG9wXSwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpwcmVzc3VyZScsIHRoaXNbb25EcmFnUHJlc3N1cmVdLCB0cnVlKTtcblxuICAgIHRoaXMuYWRkUGx1Z2luLmFwcGx5KHRoaXMsIFtfUGx1Z2lucy5NaXJyb3IsIF9QbHVnaW5zLkFjY2Vzc2liaWxpdHksIF9QbHVnaW5zLlNjcm9sbGFibGUsIF9QbHVnaW5zLkFubm91bmNlbWVudF0uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMub3B0aW9ucy5wbHVnaW5zKSkpO1xuICAgIHRoaXMuYWRkU2Vuc29yLmFwcGx5KHRoaXMsIFtfU2Vuc29ycy5Nb3VzZVNlbnNvciwgX1NlbnNvcnMuVG91Y2hTZW5zb3JdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzLm9wdGlvbnMuc2Vuc29ycykpKTtcblxuICAgIHZhciBkcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gbmV3IF9EcmFnZ2FibGVFdmVudC5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KHtcbiAgICAgIGRyYWdnYWJsZTogdGhpc1xuICAgIH0pO1xuXG4gICAgdGhpcy50cmlnZ2VyKGRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIERyYWdnYWJsZSBpbnN0YW5jZS4gVGhpcyByZW1vdmVzIGFsbCBpbnRlcm5hbCBldmVudCBsaXN0ZW5lcnMgYW5kXG4gICAqIGRlYWN0aXZhdGVzIHNlbnNvcnMgYW5kIHBsdWdpbnNcbiAgICovXG5cblxuICAvKipcbiAgICogRGVmYXVsdCBwbHVnaW5zIGRyYWdnYWJsZSB1c2VzXG4gICAqIEBzdGF0aWNcbiAgICogQHByb3BlcnR5IHtPYmplY3R9IFBsdWdpbnNcbiAgICogQHByb3BlcnR5IHtNaXJyb3J9IFBsdWdpbnMuTWlycm9yXG4gICAqIEBwcm9wZXJ0eSB7QWNjZXNzaWJpbGl0eX0gUGx1Z2lucy5BY2Nlc3NpYmlsaXR5XG4gICAqIEBwcm9wZXJ0eSB7U2Nyb2xsYWJsZX0gUGx1Z2lucy5TY3JvbGxhYmxlXG4gICAqIEBwcm9wZXJ0eSB7QW5ub3VuY2VtZW50fSBQbHVnaW5zLkFubm91bmNlbWVudFxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdnYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6c3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSwgdHJ1ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOm1vdmUnLCB0aGlzW29uRHJhZ01vdmVdLCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6c3RvcCcsIHRoaXNbb25EcmFnU3RvcF0sIHRydWUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZzpwcmVzc3VyZScsIHRoaXNbb25EcmFnUHJlc3N1cmVdLCB0cnVlKTtcblxuICAgICAgdmFyIGRyYWdnYWJsZURlc3Ryb3lFdmVudCA9IG5ldyBfRHJhZ2dhYmxlRXZlbnQuRHJhZ2dhYmxlRGVzdHJveUV2ZW50KHtcbiAgICAgICAgZHJhZ2dhYmxlOiB0aGlzXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyYWdnYWJsZURlc3Ryb3lFdmVudCk7XG5cbiAgICAgIHRoaXMucmVtb3ZlUGx1Z2luLmFwcGx5KHRoaXMsICgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMucGx1Z2lucy5tYXAoZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gcGx1Z2luLmNvbnN0cnVjdG9yO1xuICAgICAgfSkpKTtcbiAgICAgIHRoaXMucmVtb3ZlU2Vuc29yLmFwcGx5KHRoaXMsICgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMuc2Vuc29ycy5tYXAoZnVuY3Rpb24gKHNlbnNvcikge1xuICAgICAgICByZXR1cm4gc2Vuc29yLmNvbnN0cnVjdG9yO1xuICAgICAgfSkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHBsdWdpbiB0byB0aGlzIGRyYWdnYWJsZSBpbnN0YW5jZS4gVGhpcyB3aWxsIGVuZCB1cCBjYWxsaW5nIHRoZSBhdHRhY2ggbWV0aG9kIG9mIHRoZSBwbHVnaW5cbiAgICAgKiBAcGFyYW0gey4uLnR5cGVvZiBQbHVnaW59IHBsdWdpbnMgLSBQbHVnaW5zIHRoYXQgeW91IHdhbnQgYXR0YWNoZWQgdG8gZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5hZGRQbHVnaW4oQ3VzdG9tQTExeVBsdWdpbiwgQ3VzdG9tTWlycm9yUGx1Z2luKVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRQbHVnaW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRQbHVnaW4oKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGx1Z2lucyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBwbHVnaW5zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWN0aXZlUGx1Z2lucyA9IHBsdWdpbnMubWFwKGZ1bmN0aW9uIChQbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQbHVnaW4oX3RoaXMpO1xuICAgICAgfSk7XG4gICAgICBhY3RpdmVQbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gcGx1Z2luLmF0dGFjaCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnBsdWdpbnMgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5wbHVnaW5zKSwgKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkoYWN0aXZlUGx1Z2lucykpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBwbHVnaW5zIHRoYXQgYXJlIGFscmVhZHkgYXR0YWNoZWQgdG8gdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2UuIFRoaXMgd2lsbCBlbmQgdXAgY2FsbGluZ1xuICAgICAqIHRoZSBkZXRhY2ggbWV0aG9kIG9mIHRoZSBwbHVnaW5cbiAgICAgKiBAcGFyYW0gey4uLnR5cGVvZiBQbHVnaW59IHBsdWdpbnMgLSBQbHVnaW5zIHRoYXQgeW91IHdhbnQgZGV0YWNoZWQgZnJvbSBkcmFnZ2FibGVcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLnJlbW92ZVBsdWdpbihNaXJyb3JQbHVnaW4sIEN1c3RvbU1pcnJvclBsdWdpbilcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVtb3ZlUGx1Z2luJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlUGx1Z2luKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBwbHVnaW5zID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgcGx1Z2luc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVtb3ZlZFBsdWdpbnMgPSB0aGlzLnBsdWdpbnMuZmlsdGVyKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbnMuaW5jbHVkZXMocGx1Z2luLmNvbnN0cnVjdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmVtb3ZlZFBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW4uZGV0YWNoKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucGx1Z2lucyA9IHRoaXMucGx1Z2lucy5maWx0ZXIoZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gIXBsdWdpbnMuaW5jbHVkZXMocGx1Z2luLmNvbnN0cnVjdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBzZW5zb3JzIHRvIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlLiBUaGlzIHdpbGwgZW5kIHVwIGNhbGxpbmcgdGhlIGF0dGFjaCBtZXRob2Qgb2YgdGhlIHNlbnNvclxuICAgICAqIEBwYXJhbSB7Li4udHlwZW9mIFNlbnNvcn0gc2Vuc29ycyAtIFNlbnNvcnMgdGhhdCB5b3Ugd2FudCBhdHRhY2hlZCB0byBkcmFnZ2FibGVcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLmFkZFNlbnNvcihGb3JjZVRvdWNoU2Vuc29yLCBDdXN0b21TZW5zb3IpXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2FkZFNlbnNvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFNlbnNvcigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIHNlbnNvcnMgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICBzZW5zb3JzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVTZW5zb3JzID0gc2Vuc29ycy5tYXAoZnVuY3Rpb24gKFNlbnNvcikge1xuICAgICAgICByZXR1cm4gbmV3IFNlbnNvcihfdGhpczIuY29udGFpbmVycywgX3RoaXMyLm9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgICBhY3RpdmVTZW5zb3JzLmZvckVhY2goZnVuY3Rpb24gKHNlbnNvcikge1xuICAgICAgICByZXR1cm4gc2Vuc29yLmF0dGFjaCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbnNvcnMgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5zZW5zb3JzKSwgKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkoYWN0aXZlU2Vuc29ycykpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBzZW5zb3JzIHRoYXQgYXJlIGFscmVhZHkgYXR0YWNoZWQgdG8gdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2UuIFRoaXMgd2lsbCBlbmQgdXAgY2FsbGluZ1xuICAgICAqIHRoZSBkZXRhY2ggbWV0aG9kIG9mIHRoZSBzZW5zb3JcbiAgICAgKiBAcGFyYW0gey4uLnR5cGVvZiBTZW5zb3J9IHNlbnNvcnMgLSBTZW5zb3JzIHRoYXQgeW91IHdhbnQgYXR0YWNoZWQgdG8gZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5yZW1vdmVTZW5zb3IoVG91Y2hTZW5zb3IsIERyYWdTZW5zb3IpXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZVNlbnNvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVNlbnNvcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgc2Vuc29ycyA9IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIHNlbnNvcnNbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbW92ZWRTZW5zb3JzID0gdGhpcy5zZW5zb3JzLmZpbHRlcihmdW5jdGlvbiAoc2Vuc29yKSB7XG4gICAgICAgIHJldHVybiBzZW5zb3JzLmluY2x1ZGVzKHNlbnNvci5jb25zdHJ1Y3Rvcik7XG4gICAgICB9KTtcbiAgICAgIHJlbW92ZWRTZW5zb3JzLmZvckVhY2goZnVuY3Rpb24gKHNlbnNvcikge1xuICAgICAgICByZXR1cm4gc2Vuc29yLmRldGFjaCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbnNvcnMgPSB0aGlzLnNlbnNvcnMuZmlsdGVyKGZ1bmN0aW9uIChzZW5zb3IpIHtcbiAgICAgICAgcmV0dXJuICFzZW5zb3JzLmluY2x1ZGVzKHNlbnNvci5jb25zdHJ1Y3Rvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgY29udGFpbmVyIHRvIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHsuLi5IVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnMgeW91IHdhbnQgdG8gYWRkIHRvIGRyYWdnYWJsZVxuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUuYWRkUGx1Z2luKEN1c3RvbUExMXlQbHVnaW4sIEN1c3RvbU1pcnJvclBsdWdpbilcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYWRkQ29udGFpbmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkQ29udGFpbmVyKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBjb250YWluZXJzID0gQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgY29udGFpbmVyc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lcnMgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5jb250YWluZXJzKSwgY29udGFpbmVycyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGNvbnRhaW5lciBmcm9tIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHsuLi5IVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnMgeW91IHdhbnQgdG8gcmVtb3ZlIGZyb20gZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5yZW1vdmVQbHVnaW4oTWlycm9yUGx1Z2luLCBDdXN0b21NaXJyb3JQbHVnaW4pXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZUNvbnRhaW5lcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUNvbnRhaW5lcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgY29udGFpbmVycyA9IEFycmF5KF9sZW42KSwgX2tleTYgPSAwOyBfa2V5NiA8IF9sZW42OyBfa2V5NisrKSB7XG4gICAgICAgIGNvbnRhaW5lcnNbX2tleTZdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXJzID0gdGhpcy5jb250YWluZXJzLmZpbHRlcihmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiAhY29udGFpbmVycy5pbmNsdWRlcyhjb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGxpc3RlbmVyIGZvciBkcmFnZ2FibGUgZXZlbnRzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBFdmVudCBuYW1lXG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gY2FsbGJhY2tzIC0gRXZlbnQgY2FsbGJhY2tzXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIChkcmFnRXZlbnQpID0+IGRyYWdFdmVudC5jYW5jZWwoKSk7XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24odHlwZSkge1xuICAgICAgdmFyIF9lbWl0dGVyO1xuXG4gICAgICBmb3IgKHZhciBfbGVuNyA9IGFyZ3VtZW50cy5sZW5ndGgsIGNhbGxiYWNrcyA9IEFycmF5KF9sZW43ID4gMSA/IF9sZW43IC0gMSA6IDApLCBfa2V5NyA9IDE7IF9rZXk3IDwgX2xlbjc7IF9rZXk3KyspIHtcbiAgICAgICAgY2FsbGJhY2tzW19rZXk3IC0gMV0gPSBhcmd1bWVudHNbX2tleTddO1xuICAgICAgfVxuXG4gICAgICAoX2VtaXR0ZXIgPSB0aGlzLmVtaXR0ZXIpLm9uLmFwcGx5KF9lbWl0dGVyLCBbdHlwZV0uY29uY2F0KGNhbGxiYWNrcykpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lciBmcm9tIGRyYWdnYWJsZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gRXZlbnQgbmFtZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRXZlbnQgY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIGhhbmRsZXJGdW5jdGlvbik7XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5lbWl0dGVyLm9mZih0eXBlLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBkcmFnZ2FibGUgZXZlbnRcbiAgICAgKiBAcGFyYW0ge0Fic3RyYWN0RXZlbnR9IGV2ZW50IC0gRXZlbnQgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLnRyaWdnZXIoZXZlbnQpO1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihldmVudCkge1xuICAgICAgdGhpcy5lbWl0dGVyLnRyaWdnZXIoZXZlbnQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjbGFzcyBuYW1lIGZvciBjbGFzcyBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIGNsYXNzIGlkZW50aWZpZXJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd8bnVsbH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2xhc3NOYW1lRm9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lRm9yKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xhc3Nlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2UgaXMgY3VycmVudGx5IGRyYWdnaW5nXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNEcmFnZ2luZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRHJhZ2dpbmcoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmRyYWdnaW5nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGRyYWdnYWJsZSBlbGVtZW50cyBmb3IgYSBnaXZlbiBjb250YWluZXIsIGV4Y2x1ZGluZyB0aGUgbWlycm9yIGFuZFxuICAgICAqIG9yaWdpbmFsIHNvdXJjZSBlbGVtZW50IGlmIHByZXNlbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXJcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXREcmFnZ2FibGVFbGVtZW50c0ZvckNvbnRhaW5lcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldERyYWdnYWJsZUVsZW1lbnRzRm9yQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBhbGxEcmFnZ2FibGVFbGVtZW50cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgICByZXR1cm4gW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKGFsbERyYWdnYWJsZUVsZW1lbnRzKSkuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkRWxlbWVudCAhPT0gX3RoaXMzLm9yaWdpbmFsU291cmNlICYmIGNoaWxkRWxlbWVudCAhPT0gX3RoaXMzLm1pcnJvcjtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RhcnQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBET00gRHJhZyBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciB0YXJnZXQgPSBzZW5zb3JFdmVudC50YXJnZXQsXG4gICAgICAgICAgY29udGFpbmVyID0gc2Vuc29yRXZlbnQuY29udGFpbmVyLFxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQgPSBzZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50O1xuXG5cbiAgICAgIGlmICghdGhpcy5jb250YWluZXJzLmluY2x1ZGVzKGNvbnRhaW5lcikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhhbmRsZSAmJiB0YXJnZXQgJiYgISgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuaGFuZGxlKSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIGRyYWdnYWJsZSBzb3VyY2UgZWxlbWVudFxuICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZSA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgICBpZiAoIXRoaXMub3JpZ2luYWxTb3VyY2UpIHtcbiAgICAgICAgc2Vuc29yRXZlbnQuY2FuY2VsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGFzdFBsYWNlZFNvdXJjZSAmJiB0aGlzLmxhc3RQbGFjZWRDb250YWluZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucGxhY2VkVGltZW91dElEKTtcbiAgICAgICAgdGhpcy5sYXN0UGxhY2VkU291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpwbGFjZWQnKSk7XG4gICAgICAgIHRoaXMubGFzdFBsYWNlZENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6cGxhY2VkJykpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLm9yaWdpbmFsU291cmNlLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgdmFyIG1pcnJvckNyZWF0ZUV2ZW50ID0gbmV3IF9NaXJyb3JFdmVudC5NaXJyb3JDcmVhdGVFdmVudCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKG1pcnJvckNyZWF0ZUV2ZW50KTtcblxuICAgICAgaWYgKCFpc0RyYWdFdmVudChvcmlnaW5hbEV2ZW50KSAmJiAhbWlycm9yQ3JlYXRlRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICB2YXIgYXBwZW5kYWJsZUNvbnRhaW5lciA9IHRoaXNbZ2V0QXBwZW5kYWJsZUNvbnRhaW5lcl0oeyBzb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UgfSk7XG4gICAgICAgIHRoaXMubWlycm9yID0gdGhpcy5zb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgIHZhciBtaXJyb3JDcmVhdGVkRXZlbnQgPSBuZXcgX01pcnJvckV2ZW50Lk1pcnJvckNyZWF0ZWRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbWlycm9yQXR0YWNoZWRFdmVudCA9IG5ldyBfTWlycm9yRXZlbnQuTWlycm9yQXR0YWNoZWRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIobWlycm9yQ3JlYXRlZEV2ZW50KTtcbiAgICAgICAgYXBwZW5kYWJsZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm1pcnJvcik7XG4gICAgICAgIHRoaXMudHJpZ2dlcihtaXJyb3JBdHRhY2hlZEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6b3JpZ2luYWwnKSk7XG4gICAgICB0aGlzLm9yaWdpbmFsU291cmNlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuc291cmNlLCB0aGlzLm9yaWdpbmFsU291cmNlKTtcblxuICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5zb3VyY2UuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOmRyYWdnaW5nJykpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdib2R5OmRyYWdnaW5nJykpO1xuICAgICAgYXBwbHlVc2VyU2VsZWN0KGRvY3VtZW50LmJvZHksICdub25lJyk7XG5cbiAgICAgIHZhciBkcmFnRXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnU3RhcnRFdmVudCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyYWdFdmVudCk7XG5cbiAgICAgIGlmIChkcmFnRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMubWlycm9yKSB7XG4gICAgICAgICAgdGhpcy5taXJyb3IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm1pcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNvdXJjZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc291cmNlKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcblxuICAgICAgICB0aGlzLnNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdib2R5OmRyYWdnaW5nJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM0W29uRHJhZ01vdmVdKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBtb3ZlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRE9NIERyYWcgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdNb3ZlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlbnNvckV2ZW50ID0gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHNlbnNvckV2ZW50LmNvbnRhaW5lcjtcblxuICAgICAgdmFyIHRhcmdldCA9IHNlbnNvckV2ZW50LnRhcmdldDtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnTW92ZUV2ZW50KHtcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoZHJhZ01vdmVFdmVudCk7XG5cbiAgICAgIGlmIChkcmFnTW92ZUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgc2Vuc29yRXZlbnQuY2FuY2VsKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1pcnJvciAmJiAhZHJhZ01vdmVFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHZhciBtaXJyb3JNb3ZlRXZlbnQgPSBuZXcgX01pcnJvckV2ZW50Lk1pcnJvck1vdmVFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIobWlycm9yTW92ZUV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0ID0gKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuICAgICAgdmFyIHdpdGhpbkNvcnJlY3RDb250YWluZXIgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKHNlbnNvckV2ZW50LnRhcmdldCwgdGhpcy5jb250YWluZXJzKTtcbiAgICAgIHZhciBvdmVyQ29udGFpbmVyID0gc2Vuc29yRXZlbnQub3ZlckNvbnRhaW5lciB8fCB3aXRoaW5Db3JyZWN0Q29udGFpbmVyO1xuICAgICAgdmFyIGlzTGVhdmluZ0NvbnRhaW5lciA9IHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgJiYgb3ZlckNvbnRhaW5lciAhPT0gdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lcjtcbiAgICAgIHZhciBpc0xlYXZpbmdEcmFnZ2FibGUgPSB0aGlzLmN1cnJlbnRPdmVyICYmIHRhcmdldCAhPT0gdGhpcy5jdXJyZW50T3ZlcjtcbiAgICAgIHZhciBpc092ZXJDb250YWluZXIgPSBvdmVyQ29udGFpbmVyICYmIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgIT09IG92ZXJDb250YWluZXI7XG4gICAgICB2YXIgaXNPdmVyRHJhZ2dhYmxlID0gd2l0aGluQ29ycmVjdENvbnRhaW5lciAmJiB0YXJnZXQgJiYgdGhpcy5jdXJyZW50T3ZlciAhPT0gdGFyZ2V0O1xuXG4gICAgICBpZiAoaXNMZWF2aW5nRHJhZ2dhYmxlKSB7XG4gICAgICAgIHZhciBkcmFnT3V0RXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnT3V0RXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgICAgb3ZlcjogdGhpcy5jdXJyZW50T3ZlclxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2RyYWdnYWJsZTpvdmVyJykpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoZHJhZ091dEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTGVhdmluZ0NvbnRhaW5lcikge1xuICAgICAgICB2YXIgZHJhZ091dENvbnRhaW5lckV2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ091dENvbnRhaW5lckV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICAgIG92ZXJDb250YWluZXI6IHRoaXMuY3VycmVudE92ZXJDb250YWluZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6b3ZlcicpKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKGRyYWdPdXRDb250YWluZXJFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc092ZXJDb250YWluZXIpIHtcbiAgICAgICAgb3ZlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6b3ZlcicpKTtcblxuICAgICAgICB2YXIgZHJhZ092ZXJDb250YWluZXJFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdPdmVyQ29udGFpbmVyRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgICAgb3ZlckNvbnRhaW5lcjogb3ZlckNvbnRhaW5lclxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyID0gb3ZlckNvbnRhaW5lcjtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoZHJhZ092ZXJDb250YWluZXJFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc092ZXJEcmFnZ2FibGUpIHtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2RyYWdnYWJsZTpvdmVyJykpO1xuXG4gICAgICAgIHZhciBkcmFnT3ZlckV2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ092ZXJFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyQ29udGFpbmVyOiBvdmVyQ29udGFpbmVyLFxuICAgICAgICAgIG92ZXI6IHRhcmdldFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyID0gdGFyZ2V0O1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihkcmFnT3ZlckV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0b3AgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBET00gRHJhZyBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0b3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICB2YXIgc2Vuc29yRXZlbnQgPSBnZXRTZW5zb3JFdmVudChldmVudCk7XG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdTdG9wRXZlbnQoe1xuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgc2Vuc29yRXZlbnQ6IGV2ZW50LnNlbnNvckV2ZW50LFxuICAgICAgICBzb3VyY2VDb250YWluZXI6IHRoaXMuc291cmNlQ29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLnNvdXJjZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm9yaWdpbmFsU291cmNlLCB0aGlzLnNvdXJjZSk7XG4gICAgICB0aGlzLnNvdXJjZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc291cmNlKTtcbiAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2Uuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICB0aGlzLnNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgICB0aGlzLm9yaWdpbmFsU291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpvcmlnaW5hbCcpKTtcbiAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2UuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpwbGFjZWQnKSk7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6ZHJhZ2dpbmcnKSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2JvZHk6ZHJhZ2dpbmcnKSk7XG4gICAgICBhcHBseVVzZXJTZWxlY3QoZG9jdW1lbnQuYm9keSwgJycpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T3Zlcikge1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2RyYWdnYWJsZTpvdmVyJykpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpvdmVyJykpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taXJyb3IpIHtcbiAgICAgICAgdmFyIG1pcnJvckRlc3Ryb3lFdmVudCA9IG5ldyBfTWlycm9yRXZlbnQuTWlycm9yRGVzdHJveUV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBzZW5zb3JFdmVudC5jb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihtaXJyb3JEZXN0cm95RXZlbnQpO1xuXG4gICAgICAgIGlmICghbWlycm9yRGVzdHJveUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgICB0aGlzLm1pcnJvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubWlycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RQbGFjZWRTb3VyY2UgPSB0aGlzLm9yaWdpbmFsU291cmNlO1xuICAgICAgdGhpcy5sYXN0UGxhY2VkQ29udGFpbmVyID0gdGhpcy5zb3VyY2VDb250YWluZXI7XG5cbiAgICAgIHRoaXMucGxhY2VkVGltZW91dElEID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfdGhpczUubGFzdFBsYWNlZFNvdXJjZSkge1xuICAgICAgICAgIF90aGlzNS5sYXN0UGxhY2VkU291cmNlLmNsYXNzTGlzdC5yZW1vdmUoX3RoaXM1LmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfdGhpczUubGFzdFBsYWNlZENvbnRhaW5lcikge1xuICAgICAgICAgIF90aGlzNS5sYXN0UGxhY2VkQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoX3RoaXM1LmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOnBsYWNlZCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzNS5sYXN0UGxhY2VkU291cmNlID0gbnVsbDtcbiAgICAgICAgX3RoaXM1Lmxhc3RQbGFjZWRDb250YWluZXIgPSBudWxsO1xuICAgICAgfSwgdGhpcy5vcHRpb25zLnBsYWNlZFRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgICB0aGlzLm1pcnJvciA9IG51bGw7XG4gICAgICB0aGlzLm9yaWdpbmFsU291cmNlID0gbnVsbDtcbiAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50T3ZlciA9IG51bGw7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lciA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBwcmVzc3VyZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERPTSBEcmFnIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnUHJlc3N1cmUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2Vuc29yRXZlbnQgPSBnZXRTZW5zb3JFdmVudChldmVudCk7XG4gICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2UgfHwgKDAsIF91dGlscy5jbG9zZXN0KShzZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSk7XG5cbiAgICAgIHZhciBkcmFnUHJlc3N1cmVFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdQcmVzc3VyZUV2ZW50KHtcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgcHJlc3N1cmU6IHNlbnNvckV2ZW50LnByZXNzdXJlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyYWdQcmVzc3VyZUV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFwcGVuZGFibGUgY29udGFpbmVyIGZvciBtaXJyb3IgYmFzZWQgb24gdGhlIGFwcGVuZFRvIG9wdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBvcHRpb25zLnNvdXJjZSAtIEN1cnJlbnQgc291cmNlXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogZ2V0QXBwZW5kYWJsZUNvbnRhaW5lcixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3JlZikge1xuICAgICAgdmFyIHNvdXJjZSA9IF9yZWYuc291cmNlO1xuXG4gICAgICB2YXIgYXBwZW5kVG8gPSB0aGlzLm9wdGlvbnMuYXBwZW5kVG87XG5cbiAgICAgIGlmICh0eXBlb2YgYXBwZW5kVG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFwcGVuZFRvKTtcbiAgICAgIH0gZWxzZSBpZiAoYXBwZW5kVG8gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gYXBwZW5kVG87XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gYXBwZW5kVG8oc291cmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdnYWJsZTtcbn0oKTtcblxuRHJhZ2dhYmxlLlBsdWdpbnMgPSB7IE1pcnJvcjogX1BsdWdpbnMuTWlycm9yLCBBY2Nlc3NpYmlsaXR5OiBfUGx1Z2lucy5BY2Nlc3NpYmlsaXR5LCBTY3JvbGxhYmxlOiBfUGx1Z2lucy5TY3JvbGxhYmxlLCBBbm5vdW5jZW1lbnQ6IF9QbHVnaW5zLkFubm91bmNlbWVudCB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gRHJhZ2dhYmxlO1xuXG5cbmZ1bmN0aW9uIGdldFNlbnNvckV2ZW50KGV2ZW50KSB7XG4gIHJldHVybiBldmVudC5kZXRhaWw7XG59XG5cbmZ1bmN0aW9uIGlzRHJhZ0V2ZW50KGV2ZW50KSB7XG4gIHJldHVybiAoL15kcmFnLy50ZXN0KGV2ZW50LnR5cGUpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5VXNlclNlbGVjdChlbGVtZW50LCB2YWx1ZSkge1xuICBlbGVtZW50LnN0eWxlLndlYmtpdFVzZXJTZWxlY3QgPSB2YWx1ZTtcbiAgZWxlbWVudC5zdHlsZS5tb3pVc2VyU2VsZWN0ID0gdmFsdWU7XG4gIGVsZW1lbnQuc3R5bGUubXNVc2VyU2VsZWN0ID0gdmFsdWU7XG4gIGVsZW1lbnQuc3R5bGUub1VzZXJTZWxlY3QgPSB2YWx1ZTtcbiAgZWxlbWVudC5zdHlsZS51c2VyU2VsZWN0ID0gdmFsdWU7XG59XG5cbi8qKiovIH0pLFxuLyogMTQxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfRW1pdHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTQyKTtcblxudmFyIF9FbWl0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VtaXR0ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfRW1pdHRlcjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxNDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b0NvbnN1bWFibGVBcnJheTIpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogVGhlIEVtaXR0ZXIgaXMgYSBzaW1wbGUgZW1pdHRlciBjbGFzcyB0aGF0IHByb3ZpZGVzIHlvdSB3aXRoIGBvbigpYCwgYG9mZigpYCBhbmQgYHRyaWdnZXIoKWAgbWV0aG9kc1xuICogQGNsYXNzIEVtaXR0ZXJcbiAqIEBtb2R1bGUgRW1pdHRlclxuICovXG52YXIgRW1pdHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRW1pdHRlcigpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBFbWl0dGVyKTtcblxuICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBieSBldmVudCBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGNhbGxiYWNrc1xuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEVtaXR0ZXIsIFt7XG4gICAga2V5OiBcIm9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKHR5cGUpIHtcbiAgICAgIHZhciBfY2FsbGJhY2tzJHR5cGU7XG5cbiAgICAgIGlmICghdGhpcy5jYWxsYmFja3NbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3NbdHlwZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNhbGxiYWNrcyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgY2FsbGJhY2tzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgKF9jYWxsYmFja3MkdHlwZSA9IHRoaXMuY2FsbGJhY2tzW3R5cGVdKS5wdXNoLmFwcGx5KF9jYWxsYmFja3MkdHlwZSwgY2FsbGJhY2tzKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVW5yZWdpc3RlcnMgY2FsbGJhY2tzIGJ5IGV2ZW50IG5hbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJvZmZcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoIXRoaXMuY2FsbGJhY2tzW3R5cGVdKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29weSA9IHRoaXMuY2FsbGJhY2tzW3R5cGVdLnNsaWNlKDApO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrID09PSBjb3B5W2ldKSB7XG4gICAgICAgICAgdGhpcy5jYWxsYmFja3NbdHlwZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGV2ZW50IGNhbGxiYWNrcyBieSBldmVudCBvYmplY3RcbiAgICAgKiBAcGFyYW0ge0Fic3RyYWN0RXZlbnR9IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJ0cmlnZ2VyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5jYWxsYmFja3NbZXZlbnQudHlwZV0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciBjYWxsYmFja3MgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5jYWxsYmFja3NbZXZlbnQudHlwZV0pKTtcbiAgICAgIHZhciBjYXVnaHRFcnJvcnMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IGNhbGxiYWNrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNhdWdodEVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2F1Z2h0RXJyb3JzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEcmFnZ2FibGUgY2F1Z2h0IGVycm9ycyB3aGlsZSB0cmlnZ2VyaW5nICdcIiArIGV2ZW50LnR5cGUgKyBcIidcIiwgY2F1Z2h0RXJyb3JzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFbWl0dGVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFbWl0dGVyO1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ac2hvcGlmeS9kcmFnZ2FibGUvbGliL3N3YXBwYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIl0sInNvdXJjZVJvb3QiOiIifQ==