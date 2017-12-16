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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__public_js_draggable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__public_js_draggable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__public_js_draggable__);


/* FILE STRUCTURE

1. AJAX Setup
2. HTML Modifications
3. Generic Functions
4. Components
	4.1 Mobile Menu
	4.2 Dialog / Modal
	4.3 Data Table
	4.4 Project Topics [Supervisor]
	4.5 Forms / AJAX Functions
	4.6 Edit Topics [Admin]
5.
6. Initialise Everything
*/

$(function () {
	"use strict";

	// var $table = $('.table--float-head');
	// $table.floatThead({
	// 	top: 39,
	// 	position: 'fixed'
	// });
	/* ======================
    1. AJAX Setup
    ====================== */

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	/* ======================
    2. HTML Modifications
    ====================== */
	// Adds global underlay
	$('body').append('<div class="underlay"></div>');

	/* ======================
    3. Generic Functions
    ====================== */
	function sortTable(table, col, reverse) {
		var tb = table.tBodies[0],
		    // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
		tr = Array.prototype.slice.call(tb.rows, 0),
		    // put rows into array
		i;
		reverse = -(+reverse || -1);
		tr = tr.sort(function (a, b) {
			// sort rows
			return reverse // `-1 *` if want opposite order
			* a.cells[col].textContent.trim() // using `.textContent.trim()` for test
			.localeCompare(b.cells[col].textContent.trim());
		});
		for (i = 0; i < tr.length; ++i) {
			tb.appendChild(tr[i]);
		} // append each row in order
	}

	function makeSortable(table) {
		var th = table.tHead,
		    i;
		th && (th = th.rows[0]) && (th = th.cells);
		if (th) i = th.length;else return; // if no `<thead>` then do nothing
		while (--i >= 0) {
			(function (i) {
				var dir = 1;
				th[i].addEventListener('click', function () {
					sortTable(table, i, dir = 1 - dir);
				});
			})(i);
		}
	}

	function makeAllSortable(parent) {
		parent = parent || document.body;
		var t = parent.getElementsByTagName('table'),
		    i = t.length;
		while (--i >= 0) {
			makeSortable(t[i]);
		}
	}

	function acceptStudent(student_id) {
		$.ajax({
			method: 'POST',
			url: '/supervisor/acceptStudent',
			data: {
				student_id: student_id
			},
			success: function success() {}
		});
	}

	function rejectStudent(student_id, project_id) {
		$.ajax({
			method: 'POST',
			url: '/supervisor/rejectStudent',
			data: {
				project_id: project_id,
				student_id: student_id
			},
			success: function success() {}
		});
	}

	$('.show-more').on('click', function (e) {
		$(this).hide();
		$('.project').addClass('expand');
	});

	// Makes primary topic first
	$(".topics-list").prepend($(".first"));

	// SUPERVISOR
	$('#deleteProjectButton').on('click', function () {
		AjaxFunctions.prototype.deleteProject($('#title').val());
	});

	/* ======================
    4. Components
    ====================== */

	/* ======================
    4.1 Mobile Menu
    ====================== */
	/**
    * Class constructor for mobile menu.
    *
    * @param {HTMLElement} element The element that will be upgraded.
    */
	var MobileMenu = function MobileMenu(element) {
		if (window['MobileMenu'] == null) {
			window['MobileMenu'] = this;
			this.element = $(element);
			this.activator = $(this.Selectors_.HAMBURGER_CONTAINER);
			this.underlay = $(this.Selectors_.UNDERLAY);
			this.init();
		}
	};

	MobileMenu.prototype.CssClasses_ = {
		VISIBLE: 'is-visible'
	};

	MobileMenu.prototype.Selectors_ = {
		MOBILE_MENU: 'nav.mobile',
		HAMBURGER_CONTAINER: '.hamburger-container',
		UNDERLAY: '.mobile-nav-underlay'
	};

	MobileMenu.prototype.openMenu = function () {
		this.activator.attr("aria-expanded", "true");
		this.element.addClass(this.CssClasses_.VISIBLE);

		this.underlay.attr("aria-hidden", "false");
		this.underlay.addClass(this.CssClasses_.VISIBLE);
	};

	MobileMenu.prototype.closeMenu = function () {
		this.activator.attr("aria-expanded", "false");
		this.element.removeClass(this.CssClasses_.VISIBLE);

		this.underlay.attr("aria-hidden", "true");
		this.underlay.removeClass(this.CssClasses_.VISIBLE);
	};

	MobileMenu.prototype.init = function () {
		var mobileMenu = this;
		this.activator.on('click', mobileMenu.openMenu.bind(mobileMenu));
		this.underlay.on('click', mobileMenu.closeMenu.bind(mobileMenu));
	};

	MobileMenu.prototype.initAll = function () {
		$(this.Selectors_.MOBILE_MENU).each(function () {
			this.mobileMenu = new MobileMenu(this);
		});
	};

	/* ======================
    4.2 Dialog / Modal
    ====================== */
	var Dialog = function Dialog(element) {
		this.element = $(element);
		this.dialogName = $(element).data('dialog');
		this.underlay = $('.underlay');
		this.header = $(element).find(this.Selectors_.DIALOG_HEADER);
		this.content = $(element).find(this.Selectors_.DIALOG_CONTENT);
		this.content.before(this.HtmlSnippets_.LOADER);
		this.loader = $(element).find(".loader");
		this.isClosable = true;
		this.activatorButtons = [];
		this.init();
	};

	window['Dialog'] = Dialog;

	Dialog.prototype.HtmlSnippets_ = {
		LOADER: '<div class="loader" style="width: 100px; height: 100px;top: 25%;"></div>'
	};

	Dialog.prototype.CssClasses_ = {
		ACTIVE: 'active'
	};

	Dialog.prototype.Selectors_ = {
		DIALOG: '.dialog',
		DIALOG_HEADER: '.header',
		DIALOG_CONTENT: '.content'
	};

	Dialog.prototype.showLoader = function () {
		this.loader.show(0);
		this.content.hide(0);
	};

	Dialog.prototype.hideLoader = function () {
		this.loader.hide(0);
		this.content.show(0);
	};

	Dialog.prototype.showDialog = function () {
		this.element.attr("aria-hidden", "false");
		this.underlay.addClass(this.CssClasses_.ACTIVE);
		this.underlay.data("owner", this.dialogName);
		this.element.addClass(this.CssClasses_.ACTIVE);
		window['MobileMenu'].closeMenu();
	};

	Dialog.prototype.hideDialog = function () {
		if (this.isClosable && this.underlay.data("owner") == this.dialogName) {
			this.element.attr("aria-hidden", "true");
			this.underlay.removeClass(this.CssClasses_.ACTIVE);
			this.element.removeClass(this.CssClasses_.ACTIVE);
		}
	};

	Dialog.prototype.init = function () {
		// Needed for context
		var dialog = this;

		// Find activator button
		$('button').each(function () {
			if ($(this).data('activator') && $(this).data('dialog') == dialog.dialogName) {
				dialog.activatorButtons.push($(this));
			}
		});

		// Add seperator after header
		dialog.header.append('<hr>');

		// For disabilty
		dialog.element.attr("aria-hidden", "true");

		// Set underlay
		dialog.underlay.on('click', dialog.hideDialog.bind(dialog));

		try {
			$(dialog.activatorButtons).each(function () {
				$(this).on('click', dialog.showDialog.bind(dialog));
			});
		} catch (err) {
			console.error("Dialog " + dialog.dialogName + " has no activator button.");
			console.error(err);
		}
	};

	Dialog.prototype.initAll = function () {
		$(this.Selectors_.DIALOG).each(function () {
			this.dialog = new Dialog(this);
		});
	};

	/* ======================
    4.3 Data Table
    ====================== */
	/**
    * Class constructor for data tables.
    *
    * @param {HTMLElement} element The element that will be upgraded.
    */
	var DataTable = function DataTable(element) {
		this.element = $(element);
		this.headers = $(element).find('thead tr th');
		this.bodyRows = $(element).find('tbody tr');
		this.footRows = $(element).find('tfoot tr');
		this.rows = $.merge(this.bodyRows, this.footRows);
		this.checkboxes = $(element).find(this.Selectors_.CHECKBOX);
		this.masterCheckbox = $(element).find(this.Selectors_.MASTER_CHECKBOX);
		this.init();
	};

	window['DataTable'] = DataTable;

	DataTable.prototype.CssClasses_ = {
		DATA_TABLE: 'data-table',
		IS_SELECTED: 'is-selected'
	};

	DataTable.prototype.Selectors_ = {
		DATA_TABLE: '.data-table',
		MASTER_CHECKBOX: 'thead .master-checkbox',
		CHECKBOX: 'tbody .checkbox-input',
		IS_SELECTED: '.is-selected'
	};

	DataTable.prototype.functions = {
		selectAllRows: function selectAllRows() {
			if (this.masterCheckbox.is(':checked')) {
				this.rows.addClass(DataTable.prototype.CssClasses_.IS_SELECTED);
				this.checkboxes.prop('checked', true);
			} else {
				this.rows.removeClass(DataTable.prototype.CssClasses_.IS_SELECTED);
				this.checkboxes.prop('checked', false);
			}
		},
		selectRow: function selectRow(checkbox, row) {
			if (row) {
				if (checkbox.is(':checked')) {
					row.addClass(DataTable.prototype.CssClasses_.IS_SELECTED);
				} else {
					row.removeClass(DataTable.prototype.CssClasses_.IS_SELECTED);
				}
			}
		}
	};

	DataTable.prototype.init = function () {
		var dataTable = this;
		this.masterCheckbox.on('change', $.proxy(this.functions.selectAllRows, dataTable));

		$(this.checkboxes).each(function (i) {
			$(this).on('change', $.proxy(dataTable.functions.selectRow, this, $(this), dataTable.bodyRows.eq(i)));
		});

		$(this.headers).each(function (i) {
			$(this).css("cursor", "pointer");
		});
	};

	DataTable.prototype.initAll = function () {
		$(this.Selectors_.DATA_TABLE).each(function () {
			this.dataTable = new DataTable(this);
		});
	};

	/* ======================
    4.4 Project Topics [Supervisor]
    ====================== */
	/**
    * Class constructor for project topics.
    *
    * @param {HTMLElement} element The element that will be upgraded.
    */
	var ProjectTopics = function ProjectTopics() {};
	window['ProjectTopics'] = ProjectTopics;

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
			var ajaxUrl = "/projects/addTopic";
			$.ajax({
				type: "POST",
				url: ajaxUrl,
				data: {
					topic_name: topicName,
					project_id: projectId
				},
				success: function success(data) {
					data = JSON.parse(data);
					$(projectTopics.Selectors_.ADD_TOPIC_INPUT).val('');
					$(".topics-list.edit li.topic:last").after('<li class="topic" data-topic-id="' + data["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + data["name"] + '</p></li>');
				}
			}).done(function (data) {
				$('body').append(data);
				$('.loader').hide(0);
			});
		},

		removeTopicFromProject: function removeTopicFromProject(projectId, topicId) {
			$('.loader').show(0);
			var ajaxUrl = "/projects/removeTopic";
			$.ajax({
				type: "DELETE",
				url: ajaxUrl,
				data: {
					topic_id: topicId,
					project_id: projectId
				},
				success: function success() {
					$('.topics-list.edit li.topic').each(function (i, obj) {
						if ($(this).data('topic-id') == topicId) {
							$(this).remove();
						}
					});
				}
			}).done(function () {
				$('.loader').hide(0);
			});
		},

		updateProjectPrimaryTopic: function updateProjectPrimaryTopic(projectId, topicId) {
			$('.loader').show(0);
			var ajaxUrl = "/projects/updatePrimaryTopic";
			$.ajax({
				type: "PATCH",
				url: ajaxUrl,
				data: {
					topic_id: topicId,
					project_id: projectId
				},
				success: function success() {
					$('#editProjectForm').attr('data-project-id', topicId);
					$('.topics-list.edit li.topic').each(function (i, obj) {
						if ($(this).data('topic-id') == topicId) {
							$(this).addClass("first");
						} else {
							$(this).removeClass("first");
						}
					});
				}
			}).done(function () {
				$('.loader').hide(0);
			});
		}
	};

	var swappable = new __WEBPACK_IMPORTED_MODULE_0__public_js_draggable__["Swappable"](document.querySelectorAll('.topics-list.edit'), {
		draggable: '.topic'
	});

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

	/* ======================
    4.5 Forms / AJAX Functions
    ====================== */
	/**
    * Class constructor for ajax functions.
    *
    * @param {HTMLElement} element The element that will be upgraded.
    */
	var AjaxFunctions = function AjaxFunctions() {};
	window['AjaxFunctions'] = AjaxFunctions;

	AjaxFunctions.prototype.CssClasses_ = {
		DATA_TABLE: 'data-table',
		IS_SELECTED: 'is-selected'
	};

	AjaxFunctions.prototype.Selectors_ = {
		SEARCH_INPUT: '.search-input',
		SEARCH_CONTAINER: '.search-container',
		SEARCH_FILTER_CONTAINER: '.search-filter-container',
		SEARCH_FILTER_BUTTON: '#search-filter-button',
		LOG_IN_DIALOG: '.login.dialog',
		CHANGE_AUTH_DIALOG: '.change-auth.dialog'
	};

	AjaxFunctions.prototype.Keys_ = {
		SPACE: 32,
		ENTER: 13,
		COMMA: 45
	};

	AjaxFunctions.prototype.functions = {
		deleteProject: function deleteProject(projectName) {
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
	};

	function removeAllShadowClasses(element) {
		$(element).removeClass(function (index, className) {
			return (className.match(/\bshadow\-\S+/g) || []).join(' ');
		});
	}

	// Project page search focus
	$(AjaxFunctions.prototype.Selectors_.SEARCH_INPUT).on('focus', function (e) {
		removeAllShadowClasses(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER);
		$(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER).addClass('shadow-focus');
	});

	// Project page search focus out
	$(AjaxFunctions.prototype.Selectors_.SEARCH_INPUT).on('focusout', function (e) {
		removeAllShadowClasses(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER);
		$(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER).addClass('shadow-2dp');
	});

	// SEARCH
	$(AjaxFunctions.prototype.Selectors_.SEARCH_FILTER_BUTTON).on('click', function () {
		var container = $(AjaxFunctions.prototype.Selectors_.SEARCH_FILTER_CONTAINER);
		var filterButton = $(this);

		if (container.hasClass('active')) {
			container.removeClass('active');
			filterButton.removeClass('active');
		} else {
			container.addClass('active');
			filterButton.addClass('active');
		}
	});

	/* ======================
    4.6 Edit Topics [Admin]
    ====================== */
	/**
    * Class constructor for ajax functions.
    *
    * @param {HTMLElement} element The element that will be upgraded.
    */
	var EditTopic = function EditTopic(element) {
		this.element = $(element);
		this.originalName = $(element).data("original-topic-name");
		this.topicId = $(element).data('topic-id');
		this.topicNameInput = $(element).find('input');
		this.editButton = $(element).find('.edit-topic');
		this.deleteButton = $(element).find('.delete-topic');
		this.init();
	};

	window['EditTopic'] = EditTopic;

	EditTopic.prototype.CssClasses_ = {};

	EditTopic.prototype.Selectors_ = {
		EDIT_TOPIC: '.edit-topic-list .topic'
	};

	EditTopic.prototype.Urls_ = {
		DELETE_TOPIC: '/topics/',
		PATCH_TOPIC: '/topics/',
		NEW_TOPIC: '/topics/'
	};

	EditTopic.prototype.functions = {
		editTopic: function editTopic() {
			var response = confirm("Are you sure you want to change the topic name from \"" + this.originalName + "\" to \"" + this.topicNameInput.val() + "\"?");

			if (response) {
				this.topicNameInput.prop('disabled', true);
				this.editButton.html('<div class="loader"></div>');
				$('.loader', this.element).css('display', 'block');

				$.ajax({
					method: 'PATCH',
					url: this.Urls_.DELETE_TOPIC,
					context: this,
					data: {
						topic_id: this.topicId,
						topic_name: this.topicNameInput.val()
					}
				}).done(function () {
					this.topicNameInput.prop('disabled', false);
					this.editButton.html('Edit');
					this.originalName = this.topicNameInput.val();
				});
			} else {
				this.topicNameInput.val(this.originalName);
			}
		},

		deleteTopic: function deleteTopic() {
			var response = confirm("Are you sure you want to delete the topic \"" + this.originalName + "\"?");
			if (response) {
				this.topicNameInput.prop('disabled', true);
				$.ajax({
					method: 'DELETE',
					url: this.Urls_.DELETE_TOPIC,
					context: this,
					data: {
						topic_id: this.topicId
					},
					success: function success() {
						this.element.hide(800, function () {
							this.remove();
						});
					}
				});
			}
		},

		createEditTopicDOM: function createEditTopicDOM(topicId, originalName) {
			$(".edit-topic-list").prepend('<li class="topic" data-topic-id="' + topicId + '" data-original-topic-name="' + originalName + '"><input spellcheck="true" name="name" type="text" value="' + originalName + '"><button class="button edit-topic" type="submit">Edit</button><button class="button delete-topic button--danger">Delete</button></li>');
			EditTopic.prototype.initAll();
		}
	};

	EditTopic.prototype.init = function () {
		var editTopic = this;
		this.editButton.on('click', $.proxy(this.functions.editTopic, this, editTopic));
		this.deleteButton.on('click', $.proxy(this.functions.deleteTopic, this, editTopic));
	};

	EditTopic.prototype.initAll = function () {
		$(this.Selectors_.EDIT_TOPIC).each(function () {
			this.EditTopic = new EditTopic(this);
		});
	};

	/* ======================
    5. OTHER
    ====================== */
	// Accept Student
	$('.accept').on('click', function () {
		acceptStudent($(this).data('student_id'));
	});

	// Reject Student
	$('.reject').on('click', function () {
		rejectStudent($(this).data('student_id'), $(this).data('project_id'));
	});

	$("#loginForm").on('submit', function (e) {
		e.preventDefault();

		$('.help-block', '#loginForm').css("display", "none");
		$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.showLoader();

		$.ajax({
			url: $(this).prop('action'),
			type: 'POST',
			data: $(this).serialize(),
			success: function success(data) {
				$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideDialog();
				$(AjaxFunctions.prototype.Selectors_.CHANGE_AUTH_DIALOG)[0].dialog.isClosable = false;
				$(AjaxFunctions.prototype.Selectors_.CHANGE_AUTH_DIALOG)[0].dialog.showDialog();
			},
			error: function error(data) {
				$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.showDialog();
				$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideLoader();

				$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).text(data["responseJSON"]["errors"]["username"][0]);
				$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).show();
				$('.form-field', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).addClass("has-error");
			}
		});
	});

	$('#new-topic-form').on('submit', function (e) {
		e.preventDefault();
		var submitButton = $(this).find(':submit');
		submitButton.html('<div class="loader"></div>');

		$('.loader', submitButton).css('display', 'block');

		$.ajax({
			url: $(this).prop('action'),
			type: 'POST',
			context: $(this),
			data: $(this).serialize(),
			success: function success(data) {
				data = JSON.parse(data);
				EditTopic.prototype.functions.createEditTopicDOM(data["id"], data["name"]);
			},
			error: function error() {}
		}).done(function () {
			$(this).find('input').val('');
			$(this).find(':submit').html('Add');
		});
	});

	$('#student-edit-list').find('.checkbox input').on('change', function () {
		var status = $(this).parents().eq(3).data('status');
		var emailString = "mailto:";
		var checkboxSelector = '#student-edit-list.' + status + ' .checkbox input';
		var emailButtonselector = ".email-selected." + status;
		$(checkboxSelector).each(function () {
			if ($(this).is(":checked")) {
				emailString += $(this).parent().parent().data('email');
				emailString += ",";
			}
		});
		$(emailButtonselector).prop('href', emailString);
	});

	$('.edit-student-list .email-selected').on('click', function (e) {
		if ($(this).prop('href') === 'mailto:') {
			alert("You haven't selected anyone.");
			e.preventDefault();
		}
	});

	// Used for transactions
	$('#show-raw-table-data').on('click', function () {
		if ($(this).prop('checked')) {
			$('table.full-detail').hide();
			$('table.raw-detail').show();
		} else {
			$('table.full-detail').show();
			$('table.raw-detail').hide();
		}
	});

	// NEW USER
	// put this stuff in an array
	$('#admin-form').hide();
	$('#supervisor-form').hide();
	$('#student-form').show();
	$('#create-form-access-select').on('change', function () {
		if ($('#student-option').is(":selected")) {
			$('#student-form').show();
		} else {
			$('#student-form').hide();
		}
		if ($('#supervisor-option').is(":selected")) {
			$('#supervisor-form').show();
		} else {
			$('#supervisor-form').hide();
		}
		if ($('#admin-option').is(":selected")) {
			$('#admin-form').show();
		} else {
			$('#admin-form').hide();
		}
	});

	// STRINGS
	$('#admin-form').hide();
	$('#supervisor-form').hide();
	$('#student-form').show();
	$('#create-form-access-select').on('change', function () {
		if ($('#student-option').is(":selected")) {
			$('#student-form').show();
		} else {
			$('#student-form').hide();
		}
		if ($('#supervisor-option').is(":selected")) {
			$('#supervisor-form').show();
		} else {
			$('#supervisor-form').hide();
		}
		if ($('#admin-option').is(":selected")) {
			$('#admin-form').show();
		} else {
			$('#admin-form').hide();
		}
	});

	/* ========================
    6. Second Marker
    ======================== */
	var Marker = function Marker() {
		if ($("#2nd-marker-student-table").length < 1 || $("#2nd-marker-supervisor-table").length < 1) {
			return;
		}
		this.selectedStudent = null;
		this.selectedSupervisor = null;
		this.studentTable = $("#2nd-marker-student-table");
		this.studentDataTable = this.studentTable[0].dataTable;
		this.supervisorTable = $("#2nd-marker-supervisor-table");
		this.supervisorDataTable = this.supervisorTable[0].dataTable;
		this.init();
	};

	Marker.prototype.init = function () {
		var marker = this;

		$(marker.studentDataTable.bodyRows).on('click', function () {
			Marker.prototype.selectStudent(this, marker);
		});

		$(marker.supervisorDataTable.bodyRows).on('click', function () {
			Marker.prototype.selectSupervisor(this, marker);
		});
	};

	Marker.prototype.initAll = function () {
		window['Marker'] = new Marker();
	};

	Marker.prototype.selectStudent = function (studentRowDOM, marker) {
		var row = $(studentRowDOM);

		marker.unselectAll(marker);
		row.addClass("is-selected");
		marker.selectedStudent = $(row);

		$(marker.supervisorDataTable.bodyRows).each(function () {
			if ($(this).data('marker-id') == row.data('supervisor-id')) {
				$(this).attr('disabled', true);
			} else {
				$(this).attr('disabled', false);
			}
		});
	};

	Marker.prototype.selectSupervisor = function (supervisorRowDOM, marker) {
		var row = $(supervisorRowDOM);

		if (row.attr('disabled')) {
			return;
		}

		if (marker.selectedStudent != null) {
			row.addClass("is-selected");
			marker.selectedSupervisor = row;
			Marker.prototype.showDialog(marker.selectedStudent.data('student-name'), marker.selectedStudent.data('supervisor-name'), row.data('marker-name'), marker.selectedStudent.data('project'));
		}
	};

	Marker.prototype.resetView = function (marker) {
		$(marker.studentDataTable.bodyRows).removeClass("is-selected");
		$(marker.supervisorDataTable.bodyRows).removeClass("is-selected");
		$(marker.supervisorDataTable.bodyRows).attr("disabled", true);
		marker.selectedStudent = null;
		marker.selectedSupervisor = null;
	};

	Marker.prototype.unselectAll = function (marker) {
		$(marker.studentDataTable.bodyRows).removeClass("is-selected");
		$(marker.supervisorDataTable.bodyRows).removeClass("is-selected");
	};

	Marker.prototype.showDialog = function (studentName, supervisorName, markerName, project) {
		$("#student-name").text(studentName);
		$("#supervisor-name").text(supervisorName);
		$("#marker-name").text(markerName);

		$("#project-title").html('<b>Title: </b>' + project["title"]);
		$("#project-description").html('<b>Description: </b>' + project["description"]);

		$("#assign-dialog")[0].dialog.showDialog();
	};

	$('#submitAssignMarker').on('click', function () {
		var marker = window['Marker'];

		if (marker.selectedStudent == null || marker.selectedSupervisor == null) {
			$("#assign-dialog")[0].dialog.hideDialog();
			return;
		};

		$("#assign-dialog")[0].dialog.showLoader();

		var projectId = marker.selectedStudent.data('project')["id"];
		var markerId = marker.selectedSupervisor.data('marker-id');
		var ajaxUrl = "/projects/assignMarker";

		$.ajax({
			type: "PATCH",
			url: ajaxUrl,
			data: {
				project_id: projectId,
				marker_id: markerId
			},
			success: function success(data) {}
			// Add fail
		}).done(function (data) {
			$("#assign-dialog")[0].dialog.hideDialog();
			$("#assign-dialog")[0].dialog.hideLoader();
			marker.selectedStudent.remove();
			marker.resetView(marker);
		});
	});

	/* ========================
    6. Initialise Everything
    ======================== */
	MobileMenu.prototype.initAll();
	Dialog.prototype.initAll();
	DataTable.prototype.initAll();
	EditTopic.prototype.initAll();
	Marker.prototype.initAll();

	// .on('click', function(){
	// 	var dataTable = this;
	// 	this.masterCheckbox.on('change', $.proxy(this.functions.selectAllRows, dataTable));

	// 	$(this.checkboxes).each(function(i) {
	// 		$(this).on('change', $.proxy(dataTable.functions.selectRow, this, $(this), dataTable.bodyRows.eq(i)));
	// 	});

	// 	$(this.headers).each(function(i) {
	// 		$(this).css("cursor", "pointer");
	// 	});
	// });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof4(exports)) === 'object' && ( false ? 'undefined' : _typeof4(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof4(exports)) === 'object') exports["Draggable"] = factory();else root["Draggable"] = factory();
})(this, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 63);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      exports.__esModule = true;

      exports.default = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      exports.__esModule = true;

      var _defineProperty = __webpack_require__(69);

      var _defineProperty2 = _interopRequireDefault(_defineProperty);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

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

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      exports.__esModule = true;

      var _setPrototypeOf = __webpack_require__(70);

      var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

      var _create = __webpack_require__(68);

      var _create2 = _interopRequireDefault(_create);

      var _typeof2 = __webpack_require__(37);

      var _typeof3 = _interopRequireDefault(_typeof2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

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

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      exports.__esModule = true;

      var _typeof2 = __webpack_require__(37);

      var _typeof3 = _interopRequireDefault(_typeof2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = function (self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
      };

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      /**
       * All events fired by draggable inherit this class. You can call `cancel()` to
       * cancel a specific event or you can check if an event has been canceled by
       * calling `canceled()`.
       * @abstract
       * @class
       */
      var AbstractEvent = function () {
        function AbstractEvent(data) {
          (0, _classCallCheck3.default)(this, AbstractEvent);

          this._canceled = false;
          this.data = data;
        }

        (0, _createClass3.default)(AbstractEvent, [{
          key: 'cancel',

          /**
           * Cancels a specific event
           * @abstract
           */
          value: function cancel() {
            // We should be declaring if events are cancelable
            // if (!this.cancelable) {
            //   throw new Error('This event is not cancelable');
            // }
            this._canceled = true;
          }

          /**
           * Check if event has been canceled
           * @abstract
           * @return {Boolean}
           */

        }, {
          key: 'canceled',
          value: function canceled() {
            return Boolean(this._canceled);
          }
        }, {
          key: 'type',
          get: function get() {
            return this.constructor.type;
          }
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

      /***/
    },
    /* 5 */
    /***/function (module, exports) {

      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
      if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

      /***/
    },
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

      // Thank's IE8 for his funny defineProperty
      module.exports = !__webpack_require__(20)(function () {
        return Object.defineProperty({}, 'a', { get: function get() {
            return 7;
          } }).a != 7;
      });

      /***/
    },
    /* 7 */
    /***/function (module, exports) {

      var hasOwnProperty = {}.hasOwnProperty;
      module.exports = function (it, key) {
        return hasOwnProperty.call(it, key);
      };

      /***/
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      var anObject = __webpack_require__(14),
          IE8_DOM_DEFINE = __webpack_require__(41),
          toPrimitive = __webpack_require__(34),
          dP = Object.defineProperty;

      exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPrimitive(P, true);
        anObject(Attributes);
        if (IE8_DOM_DEFINE) try {
          return dP(O, P, Attributes);
        } catch (e) {/* empty */}
        if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
        if ('value' in Attributes) O[P] = Attributes.value;
        return O;
      };

      /***/
    },
    /* 9 */
    /***/function (module, exports, __webpack_require__) {

      // to indexed object, toObject with fallback for non-array-like ES3 strings
      var IObject = __webpack_require__(83),
          defined = __webpack_require__(24);
      module.exports = function (it) {
        return IObject(defined(it));
      };

      /***/
    },
    /* 10 */
    /***/function (module, exports) {

      var core = module.exports = { version: '2.4.0' };
      if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

      /***/
    },
    /* 11 */
    /***/function (module, exports, __webpack_require__) {

      var dP = __webpack_require__(8),
          createDesc = __webpack_require__(22);
      module.exports = __webpack_require__(6) ? function (object, key, value) {
        return dP.f(object, key, createDesc(1, value));
      } : function (object, key, value) {
        object[key] = value;
        return object;
      };

      /***/
    },
    /* 12 */
    /***/function (module, exports, __webpack_require__) {

      var store = __webpack_require__(32)('wks'),
          uid = __webpack_require__(23),
          _Symbol = __webpack_require__(5).Symbol,
          USE_SYMBOL = typeof _Symbol == 'function';

      var $exports = module.exports = function (name) {
        return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
      };

      $exports.store = store;

      /***/
    },
    /* 13 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.closest = closest;
      exports.scroll = scroll;
      /** @module utils */

      function closest(element, selector) {
        if (!element) {
          return null;
        }

        function conditionFn(currentElement) {
          if (!currentElement) {
            return currentElement;
          } else if (typeof selector === 'string') {
            var matchFunction = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
            return matchFunction.call(currentElement, selector);
          } else {
            return selector(currentElement);
          }
        }

        var current = element;

        do {
          current = current.correspondingUseElement || current.correspondingElement || current;
          if (conditionFn(current)) {
            return current;
          }
          current = current.parentNode;
        } while (current !== document.body && current !== document);

        return null;
      }

      var scrollAnimationFrame = void 0;

      function scroll(element, _ref) {
        var clientX = _ref.clientX,
            clientY = _ref.clientY,
            speed = _ref.speed,
            sensitivity = _ref.sensitivity;

        if (scrollAnimationFrame) {
          cancelAnimationFrame(scrollAnimationFrame);
        }

        function scrollFn() {
          var rect = element.getBoundingClientRect();
          var offsetY = (Math.abs(rect.bottom - clientY) <= sensitivity) - (Math.abs(rect.top - clientY) <= sensitivity);
          var offsetX = (Math.abs(rect.right - clientX) <= sensitivity) - (Math.abs(rect.left - clientX) <= sensitivity);
          element.scrollTop += offsetY * speed;
          element.scrollLeft += offsetX * speed;
          scrollAnimationFrame = requestAnimationFrame(scrollFn);
        }

        scrollAnimationFrame = requestAnimationFrame(scrollFn);
      }

      /***/
    },
    /* 14 */
    /***/function (module, exports, __webpack_require__) {

      var isObject = __webpack_require__(16);
      module.exports = function (it) {
        if (!isObject(it)) throw TypeError(it + ' is not an object!');
        return it;
      };

      /***/
    },
    /* 15 */
    /***/function (module, exports, __webpack_require__) {

      var global = __webpack_require__(5),
          core = __webpack_require__(10),
          ctx = __webpack_require__(39),
          hide = __webpack_require__(11),
          PROTOTYPE = 'prototype';

      var $export = function $export(type, name, source) {
        var IS_FORCED = type & $export.F,
            IS_GLOBAL = type & $export.G,
            IS_STATIC = type & $export.S,
            IS_PROTO = type & $export.P,
            IS_BIND = type & $export.B,
            IS_WRAP = type & $export.W,
            exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
            expProto = exports[PROTOTYPE],
            target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
            key,
            own,
            out;
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
          : IS_WRAP && target[key] == out ? function (C) {
            var F = function F(a, b, c) {
              if (this instanceof C) {
                switch (arguments.length) {
                  case 0:
                    return new C();
                  case 1:
                    return new C(a);
                  case 2:
                    return new C(a, b);
                }return new C(a, b, c);
              }return C.apply(this, arguments);
            };
            F[PROTOTYPE] = C[PROTOTYPE];
            return F;
            // make static versions for prototype methods
          }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
          // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
          if (IS_PROTO) {
            (exports.virtual || (exports.virtual = {}))[key] = out;
            // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
            if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
          }
        }
      };
      // type bitmap
      $export.F = 1; // forced
      $export.G = 2; // global
      $export.S = 4; // static
      $export.P = 8; // proto
      $export.B = 16; // bind
      $export.W = 32; // wrap
      $export.U = 64; // safe
      $export.R = 128; // real proto method for `library` 
      module.exports = $export;

      /***/
    },
    /* 16 */
    /***/function (module, exports) {

      module.exports = function (it) {
        return (typeof it === 'undefined' ? 'undefined' : _typeof4(it)) === 'object' ? it !== null : typeof it === 'function';
      };

      /***/
    },
    /* 17 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _utils = __webpack_require__(13);

      var _accessibility = __webpack_require__(53);

      var _accessibility2 = _interopRequireDefault(_accessibility);

      var _mirror = __webpack_require__(54);

      var _mirror2 = _interopRequireDefault(_mirror);

      var _collidable = __webpack_require__(51);

      var _collidable2 = _interopRequireDefault(_collidable);

      var _snappable = __webpack_require__(52);

      var _snappable2 = _interopRequireDefault(_snappable);

      var _dragSensor = __webpack_require__(64);

      var _dragSensor2 = _interopRequireDefault(_dragSensor);

      var _mouseSensor = __webpack_require__(66);

      var _mouseSensor2 = _interopRequireDefault(_mouseSensor);

      var _touchSensor = __webpack_require__(67);

      var _touchSensor2 = _interopRequireDefault(_touchSensor);

      var _forceTouchSensor = __webpack_require__(65);

      var _forceTouchSensor2 = _interopRequireDefault(_forceTouchSensor);

      var _draggableEvent = __webpack_require__(57);

      var _dragEvent = __webpack_require__(56);

      var _mirrorEvent = __webpack_require__(59);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var defaults = {
        draggable: '.draggable-source',
        handle: null,
        delay: 0,
        placedTimeout: 800,
        native: false,
        plugins: [_mirror2.default, _accessibility2.default],
        classes: {
          'container:dragging': 'draggable-container--is-dragging',
          'source:dragging': 'draggable-source--is-dragging',
          'source:placed': 'draggable-source--placed',
          'container:placed': 'draggable-container--placed',
          'body:dragging': 'draggable--is-dragging',
          'draggable:over': 'draggable--over',
          'container:over': 'draggable-container--over',
          mirror: 'draggable-mirror'
        }
      };

      /**
       * This is the core draggable library that does the heavy lifting
       * @module Draggable
       */

      var Draggable = function () {
        (0, _createClass3.default)(Draggable, null, [{
          key: 'Plugins',
          get: function get() {
            return { Accessibility: _accessibility2.default, Mirror: _mirror2.default };
          }
        }, {
          key: 'Behaviour',
          get: function get() {
            return { Collidable: _collidable2.default, Snappable: _snappable2.default };
          }

          /**
           * Draggable constructor.
           * @constructs Draggable
           * @param {Array|NodeList} containers - Draggable containers
           * @param {Object} options - Options for draggable
           */

        }]);

        function Draggable() {
          var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (0, _classCallCheck3.default)(this, Draggable);

          this.containers = containers;
          this.options = Object.assign({}, defaults, options);
          this.activeSensors = [];
          this.activePlugins = [];
          this.callbacks = {};
          this.dragging = false;

          this.dragStart = this.dragStart.bind(this);
          this.dragMove = this.dragMove.bind(this);
          this.dragStop = this.dragStop.bind(this);
          this.dragPressure = this.dragPressure.bind(this);

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var container = _step.value;

              container.addEventListener('drag:start', this.dragStart, true);
              container.addEventListener('drag:move', this.dragMove, true);
              container.addEventListener('drag:stop', this.dragStop, true);
              container.addEventListener('drag:pressure', this.dragPressure, true);
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

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.options.plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var Plugin = _step2.value;

              var plugin = new Plugin(this);
              plugin.attach();
              this.activePlugins.push(plugin);
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

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.sensors()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var Sensor = _step3.value;

              var sensor = new Sensor(this.containers, options);
              sensor.attach();
              this.activeSensors.push(sensor);
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

          var draggableInitializedEvent = new _draggableEvent.DraggableInitializedEvent({
            draggable: this
          });

          this.triggerEvent(draggableInitializedEvent);
        }

        /**
         * Destroys Draggable instance. This removes all internal event listeners and
         * deactivates sensors and plugins
         */

        (0, _createClass3.default)(Draggable, [{
          key: 'destroy',
          value: function destroy() {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = this.containers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var container = _step4.value;

                container.removeEventListener('drag:start', this.dragStart, true);
                container.removeEventListener('drag:move', this.dragMove, true);
                container.removeEventListener('drag:stop', this.dragStop, true);
                container.removeEventListener('drag:pressure', this.dragPressure, true);
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

            var draggableDestroyEvent = new _draggableEvent.DraggableDestroyEvent({
              draggable: this
            });

            this.triggerEvent(draggableDestroyEvent);

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = this.activePlugins[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var activePlugin = _step5.value;

                activePlugin.detach();
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = this.activeSensors[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var activeSensor = _step6.value;

                activeSensor.detach();
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
            }
          }

          /**
           * Adds listener for draggable events
           * @example draggable.on('drag:start', (dragEvent) => dragEvent.cancel());
           */

        }, {
          key: 'on',
          value: function on(type, callback) {
            if (!this.callbacks[type]) {
              this.callbacks[type] = [];
            }

            this.callbacks[type].push(callback);
            return this;
          }

          /**
           * Removes listener from draggable
           * @example draggable.off('drag:start', handlerFunction);
           */

        }, {
          key: 'off',
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
        }, {
          key: 'trigger',
          value: function trigger(type) {
            if (!this.callbacks[type]) {
              return;
            }

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            for (var i = this.callbacks[type].length - 1; i >= 0; i--) {
              var callback = this.callbacks[type][i];
              callback.apply(undefined, args);
            }
          }

          /**
           * Active sensors
           * @return {Array} sensors
           */

        }, {
          key: 'sensors',
          value: function sensors() {
            return [_touchSensor2.default, _forceTouchSensor2.default, this.options.native ? _dragSensor2.default : _mouseSensor2.default];
          }
        }, {
          key: 'dragStart',
          value: function dragStart(event) {
            var sensorEvent = getSensorEvent(event);
            var target = sensorEvent.target,
                container = sensorEvent.container,
                originalEvent = sensorEvent.originalEvent;

            if (this.options.handle && target && !(0, _utils.closest)(target, this.options.handle)) {
              sensorEvent.cancel();
              return;
            }

            // Find draggable source element
            this.source = (0, _utils.closest)(target, this.options.draggable);
            this.sourceContainer = container;

            if (!this.source) {
              sensorEvent.cancel();
              return;
            }

            this.dragging = true;

            if (!isDragEvent(originalEvent)) {
              var appendableContainer = this.getAppendableContainer({ source: this.source });
              this.mirror = this.source.cloneNode(true);

              var mirrorCreatedEvent = new _mirrorEvent.MirrorCreatedEvent({
                source: this.source,
                mirror: this.mirror,
                sourceContainer: container,
                sensorEvent: sensorEvent
              });

              var mirrorAttachedEvent = new _mirrorEvent.MirrorAttachedEvent({
                source: this.source,
                mirror: this.mirror,
                sourceContainer: container,
                sensorEvent: sensorEvent
              });

              this.triggerEvent(mirrorCreatedEvent);
              appendableContainer.appendChild(this.mirror);
              this.triggerEvent(mirrorAttachedEvent);
            }

            this.source.classList.add(this.getClassNameFor('source:dragging'));
            this.sourceContainer.classList.add(this.getClassNameFor('container:dragging'));
            document.body.classList.add(this.getClassNameFor('body:dragging'));

            if (this.mirror) {
              var mirrorMoveEvent = new _mirrorEvent.MirrorMoveEvent({
                source: this.source,
                mirror: this.mirror,
                sourceContainer: container,
                sensorEvent: sensorEvent
              });

              this.triggerEvent(mirrorMoveEvent);
            }

            // Find the closest scrollable parent
            this.scrollableParent = (0, _utils.closest)(container, function (element) {
              return element.offsetHeight < element.scrollHeight;
            });

            var dragEvent = new _dragEvent.DragStartEvent({
              source: this.source,
              mirror: this.mirror,
              sourceContainer: container,
              sensorEvent: sensorEvent
            });

            this.triggerEvent(dragEvent);

            if (!dragEvent.canceled()) {
              return;
            }

            if (this.mirror) {
              this.mirror.parentNode.removeChild(this.mirror);
            }

            this.source.classList.remove(this.getClassNameFor('source:dragging'));
            this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
            document.body.classList.remove(this.getClassNameFor('body:dragging'));
          }
        }, {
          key: 'triggerEvent',
          value: function triggerEvent(event) {
            return this.trigger(event.type, event);
          }
        }, {
          key: 'dragMove',
          value: function dragMove(event) {
            var sensorEvent = getSensorEvent(event);
            var container = sensorEvent.container;

            var target = sensorEvent.target;

            var dragMoveEvent = new _dragEvent.DragMoveEvent({
              source: this.source,
              mirror: this.mirror,
              sourceContainer: container,
              sensorEvent: sensorEvent
            });

            this.triggerEvent(dragMoveEvent);

            if (dragMoveEvent.canceled()) {
              sensorEvent.cancel();
            }

            if (this.mirror && !dragMoveEvent.canceled()) {
              var mirrorMoveEvent = new _mirrorEvent.MirrorMoveEvent({
                source: this.source,
                mirror: this.mirror,
                sourceContainer: container,
                sensorEvent: sensorEvent
              });

              this.triggerEvent(mirrorMoveEvent);
            }

            target = (0, _utils.closest)(target, this.options.draggable);
            var overContainer = sensorEvent.overContainer || this.closestContainer(sensorEvent.target);
            var isLeavingContainer = this.currentOverContainer && overContainer !== this.currentOverContainer;
            var isLeavingDraggable = this.currentOver && target !== this.currentOver;
            var isOverContainer = overContainer && this.currentOverContainer !== overContainer;
            var isOverDraggable = target && this.currentOver !== target;

            if (isLeavingDraggable) {
              var dragOutEvent = new _dragEvent.DragOutEvent({
                source: this.source,
                mirror: this.mirror,
                sourceContainer: container,
                sensorEvent: sensorEvent,
                over: this.currentOver
              });

              this.triggerEvent(dragOutEvent);

              this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
              this.currentOver = null;
            }

            if (isLeavingContainer) {
              var dragOutContainerEvent = new _dragEvent.DragOutContainerEvent({
                source: this.source,
                mirror: this.mirror,
                sourceContainer: container,
                sensorEvent: sensorEvent,
                overContainer: this.overContainer
              });

              this.triggerEvent(dragOutContainerEvent);

              this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
              this.currentOverContainer = null;
            }

            if (isOverContainer) {
              overContainer.classList.add(this.getClassNameFor('container:over'));

              var dragOverContainerEvent = new _dragEvent.DragOverContainerEvent({
                source: this.source,
                mirror: this.mirror,
                sourceContainer: container,
                sensorEvent: sensorEvent,
                overContainer: overContainer
              });

              this.triggerEvent(dragOverContainerEvent);

              this.currentOverContainer = overContainer;
            }

            if (isOverDraggable) {
              target.classList.add(this.getClassNameFor('draggable:over'));

              var dragOverEvent = new _dragEvent.DragOverEvent({
                source: this.source,
                mirror: this.mirror,
                sourceContainer: container,
                sensorEvent: sensorEvent,
                overContainer: overContainer,
                over: target
              });

              this.triggerEvent(dragOverEvent);

              this.currentOver = target;
            }
          }
        }, {
          key: 'dragStop',
          value: function dragStop(event) {
            var _this = this;

            this.dragging = false;

            var sensorEvent = getSensorEvent(event);
            var dragStopEvent = new _dragEvent.DragStopEvent({
              source: this.source,
              mirror: this.mirror,
              sensorEvent: event.sensorEvent,
              sourceContainer: this.sourceContainer
            });

            this.triggerEvent(dragStopEvent);

            this.source.classList.remove(this.getClassNameFor('source:dragging'));
            this.source.classList.add(this.getClassNameFor('source:placed'));
            this.sourceContainer.classList.add(this.getClassNameFor('container:placed'));
            this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
            document.body.classList.remove(this.getClassNameFor('body:dragging'));

            if (this.currentOver) {
              this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
            }

            if (this.currentOverContainer) {
              this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
            }

            if (this.mirror) {
              var mirrorDestroyEvent = new _mirrorEvent.MirrorDestroyEvent({
                source: this.source,
                mirror: this.mirror,
                sourceContainer: sensorEvent.container,
                sensorEvent: sensorEvent
              });

              this.triggerEvent(mirrorDestroyEvent);

              if (!mirrorDestroyEvent.canceled()) {
                this.mirror.parentNode.removeChild(this.mirror);
              }
            }

            var lastSource = this.source;
            var lastSourceContainer = this.sourceContainer;

            setTimeout(function () {
              if (lastSource) {
                lastSource.classList.remove(_this.getClassNameFor('source:placed'));
              }

              if (lastSourceContainer) {
                lastSourceContainer.classList.remove(_this.getClassNameFor('container:placed'));
              }
            }, this.options.placedTimeout);

            this.source = null;
            this.mirror = null;
            this.currentOverContainer = null;
            this.currentOver = null;
            this.sourceContainer = null;
          }
        }, {
          key: 'dragPressure',
          value: function dragPressure(event) {
            var sensorEvent = getSensorEvent(event);
            var source = this.source || (0, _utils.closest)(sensorEvent.originalEvent.target, this.options.draggable);

            var dragPressureEvent = new _dragEvent.DragPressureEvent({
              sensorEvent: sensorEvent,
              source: source,
              pressure: sensorEvent.pressure
            });

            this.triggerEvent(dragPressureEvent);
          }
        }, {
          key: 'getAppendableContainer',
          value: function getAppendableContainer(_ref) {
            var source = _ref.source;

            var appendTo = this.options.appendTo;

            if (typeof appendTo === 'string') {
              return document.querySelector(appendTo);
            } else if (appendTo instanceof HTMLElement) {
              return appendTo;
            } else if (typeof appendTo === 'function') {
              return appendTo(source);
            } else {
              return document.body;
            }
          }
        }, {
          key: 'getClassNameFor',
          value: function getClassNameFor(name) {
            return this.options.classes[name] || defaults.classes[name];
          }
        }, {
          key: 'closestContainer',
          value: function closestContainer(target) {
            var _this2 = this;

            return (0, _utils.closest)(target, function (element) {
              var _iteratorNormalCompletion7 = true;
              var _didIteratorError7 = false;
              var _iteratorError7 = undefined;

              try {
                for (var _iterator7 = _this2.containers[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                  var containerEl = _step7.value;

                  if (element === containerEl) {
                    return true;
                  }
                }
              } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                  }
                } finally {
                  if (_didIteratorError7) {
                    throw _iteratorError7;
                  }
                }
              }

              return false;
            });
          }
        }]);
        return Draggable;
      }();

      exports.default = Draggable;

      function getSensorEvent(event) {
        return event.detail;
      }

      function isDragEvent(event) {
        return (/^drag/.test(event.type)
        );
      }

      /***/
    },
    /* 18 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DragPressureSensorEvent = exports.DragStopSensorEvent = exports.DragMoveSensorEvent = exports.DragStartSensorEvent = exports.SensorEvent = undefined;

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var SensorEvent = exports.SensorEvent = function (_AbstractEvent) {
        (0, _inherits3.default)(SensorEvent, _AbstractEvent);

        function SensorEvent() {
          (0, _classCallCheck3.default)(this, SensorEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SensorEvent.__proto__ || Object.getPrototypeOf(SensorEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(SensorEvent, [{
          key: 'originalEvent',
          get: function get() {
            return this.data.originalEvent;
          }
        }, {
          key: 'clientX',
          get: function get() {
            return this.data.clientX;
          }
        }, {
          key: 'clientY',
          get: function get() {
            return this.data.clientY;
          }
        }, {
          key: 'target',
          get: function get() {
            return this.data.target;
          }
        }, {
          key: 'container',
          get: function get() {
            return this.data.container;
          }
        }, {
          key: 'overContainer',
          get: function get() {
            return this.data.overContainer;
          }
        }, {
          key: 'pressure',
          get: function get() {
            return this.data.pressure;
          }
        }]);
        return SensorEvent;
      }(_abstractEvent2.default);

      var DragStartSensorEvent = exports.DragStartSensorEvent = function (_SensorEvent) {
        (0, _inherits3.default)(DragStartSensorEvent, _SensorEvent);

        function DragStartSensorEvent() {
          (0, _classCallCheck3.default)(this, DragStartSensorEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragStartSensorEvent.__proto__ || Object.getPrototypeOf(DragStartSensorEvent)).apply(this, arguments));
        }

        return DragStartSensorEvent;
      }(SensorEvent);

      DragStartSensorEvent.type = 'drag:start';

      var DragMoveSensorEvent = exports.DragMoveSensorEvent = function (_SensorEvent2) {
        (0, _inherits3.default)(DragMoveSensorEvent, _SensorEvent2);

        function DragMoveSensorEvent() {
          (0, _classCallCheck3.default)(this, DragMoveSensorEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragMoveSensorEvent.__proto__ || Object.getPrototypeOf(DragMoveSensorEvent)).apply(this, arguments));
        }

        return DragMoveSensorEvent;
      }(SensorEvent);

      DragMoveSensorEvent.type = 'drag:move';

      var DragStopSensorEvent = exports.DragStopSensorEvent = function (_SensorEvent3) {
        (0, _inherits3.default)(DragStopSensorEvent, _SensorEvent3);

        function DragStopSensorEvent() {
          (0, _classCallCheck3.default)(this, DragStopSensorEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragStopSensorEvent.__proto__ || Object.getPrototypeOf(DragStopSensorEvent)).apply(this, arguments));
        }

        return DragStopSensorEvent;
      }(SensorEvent);

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

      /***/
    },
    /* 19 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var Sensor = function () {
        function Sensor() {
          var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (0, _classCallCheck3.default)(this, Sensor);

          this.containers = containers;
          this.options = options;
        }

        (0, _createClass3.default)(Sensor, [{
          key: 'attach',
          value: function attach() {
            return this;
          }
        }, {
          key: 'detach',
          value: function detach() {
            return this;
          }
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

      /***/
    },
    /* 20 */
    /***/function (module, exports) {

      module.exports = function (exec) {
        try {
          return !!exec();
        } catch (e) {
          return true;
        }
      };

      /***/
    },
    /* 21 */
    /***/function (module, exports, __webpack_require__) {

      // 19.1.2.14 / 15.2.3.14 Object.keys(O)
      var $keys = __webpack_require__(46),
          enumBugKeys = __webpack_require__(25);

      module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
      };

      /***/
    },
    /* 22 */
    /***/function (module, exports) {

      module.exports = function (bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value
        };
      };

      /***/
    },
    /* 23 */
    /***/function (module, exports) {

      var id = 0,
          px = Math.random();
      module.exports = function (key) {
        return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
      };

      /***/
    },
    /* 24 */
    /***/function (module, exports) {

      // 7.2.1 RequireObjectCoercible(argument)
      module.exports = function (it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
      };

      /***/
    },
    /* 25 */
    /***/function (module, exports) {

      // IE 8- don't enum bug keys
      module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

      /***/
    },
    /* 26 */
    /***/function (module, exports) {

      module.exports = {};

      /***/
    },
    /* 27 */
    /***/function (module, exports) {

      module.exports = true;

      /***/
    },
    /* 28 */
    /***/function (module, exports, __webpack_require__) {

      // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
      var anObject = __webpack_require__(14),
          dPs = __webpack_require__(89),
          enumBugKeys = __webpack_require__(25),
          IE_PROTO = __webpack_require__(31)('IE_PROTO'),
          Empty = function Empty() {/* empty */},
          PROTOTYPE = 'prototype';

      // Create object with fake `null` prototype: use iframe Object with cleared prototype
      var _createDict = function createDict() {
        // Thrash, waste and sodomy: IE GC bug
        var iframe = __webpack_require__(40)('iframe'),
            i = enumBugKeys.length,
            lt = '<',
            gt = '>',
            iframeDocument;
        iframe.style.display = 'none';
        __webpack_require__(82).appendChild(iframe);
        iframe.src = 'javascript:'; // eslint-disable-line no-script-url
        // createDict = iframe.contentWindow.Object;
        // html.removeChild(iframe);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
        iframeDocument.close();
        _createDict = iframeDocument.F;
        while (i--) {
          delete _createDict[PROTOTYPE][enumBugKeys[i]];
        }return _createDict();
      };

      module.exports = Object.create || function create(O, Properties) {
        var result;
        if (O !== null) {
          Empty[PROTOTYPE] = anObject(O);
          result = new Empty();
          Empty[PROTOTYPE] = null;
          // add "__proto__" for Object.getPrototypeOf polyfill
          result[IE_PROTO] = O;
        } else result = _createDict();
        return Properties === undefined ? result : dPs(result, Properties);
      };

      /***/
    },
    /* 29 */
    /***/function (module, exports) {

      exports.f = {}.propertyIsEnumerable;

      /***/
    },
    /* 30 */
    /***/function (module, exports, __webpack_require__) {

      var def = __webpack_require__(8).f,
          has = __webpack_require__(7),
          TAG = __webpack_require__(12)('toStringTag');

      module.exports = function (it, tag, stat) {
        if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
      };

      /***/
    },
    /* 31 */
    /***/function (module, exports, __webpack_require__) {

      var shared = __webpack_require__(32)('keys'),
          uid = __webpack_require__(23);
      module.exports = function (key) {
        return shared[key] || (shared[key] = uid(key));
      };

      /***/
    },
    /* 32 */
    /***/function (module, exports, __webpack_require__) {

      var global = __webpack_require__(5),
          SHARED = '__core-js_shared__',
          store = global[SHARED] || (global[SHARED] = {});
      module.exports = function (key) {
        return store[key] || (store[key] = {});
      };

      /***/
    },
    /* 33 */
    /***/function (module, exports) {

      // 7.1.4 ToInteger
      var ceil = Math.ceil,
          floor = Math.floor;
      module.exports = function (it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
      };

      /***/
    },
    /* 34 */
    /***/function (module, exports, __webpack_require__) {

      // 7.1.1 ToPrimitive(input [, PreferredType])
      var isObject = __webpack_require__(16);
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

      /***/
    },
    /* 35 */
    /***/function (module, exports, __webpack_require__) {

      var global = __webpack_require__(5),
          core = __webpack_require__(10),
          LIBRARY = __webpack_require__(27),
          wksExt = __webpack_require__(36),
          defineProperty = __webpack_require__(8).f;
      module.exports = function (name) {
        var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
        if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
      };

      /***/
    },
    /* 36 */
    /***/function (module, exports, __webpack_require__) {

      exports.f = __webpack_require__(12);

      /***/
    },
    /* 37 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      exports.__esModule = true;

      var _iterator = __webpack_require__(72);

      var _iterator2 = _interopRequireDefault(_iterator);

      var _symbol = __webpack_require__(71);

      var _symbol2 = _interopRequireDefault(_symbol);

      var _typeof = typeof _symbol2.default === "function" && _typeof4(_iterator2.default) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof4(obj);
      } : function (obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof4(obj);
      };

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof(obj);
      } : function (obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
      };

      /***/
    },
    /* 38 */
    /***/function (module, exports) {

      var toString = {}.toString;

      module.exports = function (it) {
        return toString.call(it).slice(8, -1);
      };

      /***/
    },
    /* 39 */
    /***/function (module, exports, __webpack_require__) {

      // optional / simple context binding
      var aFunction = __webpack_require__(78);
      module.exports = function (fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;
        switch (length) {
          case 1:
            return function (a) {
              return fn.call(that, a);
            };
          case 2:
            return function (a, b) {
              return fn.call(that, a, b);
            };
          case 3:
            return function (a, b, c) {
              return fn.call(that, a, b, c);
            };
        }
        return function () /* ...args */{
          return fn.apply(that, arguments);
        };
      };

      /***/
    },
    /* 40 */
    /***/function (module, exports, __webpack_require__) {

      var isObject = __webpack_require__(16),
          document = __webpack_require__(5).document
      // in old IE typeof document.createElement is 'object'
      ,
          is = isObject(document) && isObject(document.createElement);
      module.exports = function (it) {
        return is ? document.createElement(it) : {};
      };

      /***/
    },
    /* 41 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = !__webpack_require__(6) && !__webpack_require__(20)(function () {
        return Object.defineProperty(__webpack_require__(40)('div'), 'a', { get: function get() {
            return 7;
          } }).a != 7;
      });

      /***/
    },
    /* 42 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var LIBRARY = __webpack_require__(27),
          $export = __webpack_require__(15),
          redefine = __webpack_require__(47),
          hide = __webpack_require__(11),
          has = __webpack_require__(7),
          Iterators = __webpack_require__(26),
          $iterCreate = __webpack_require__(85),
          setToStringTag = __webpack_require__(30),
          getPrototypeOf = __webpack_require__(91),
          ITERATOR = __webpack_require__(12)('iterator'),
          BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
      ,
          FF_ITERATOR = '@@iterator',
          KEYS = 'keys',
          VALUES = 'values';

      var returnThis = function returnThis() {
        return this;
      };

      module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
        $iterCreate(Constructor, NAME, next);
        var getMethod = function getMethod(kind) {
          if (!BUGGY && kind in proto) return proto[kind];
          switch (kind) {
            case KEYS:
              return function keys() {
                return new Constructor(this, kind);
              };
            case VALUES:
              return function values() {
                return new Constructor(this, kind);
              };
          }return function entries() {
            return new Constructor(this, kind);
          };
        };
        var TAG = NAME + ' Iterator',
            DEF_VALUES = DEFAULT == VALUES,
            VALUES_BUG = false,
            proto = Base.prototype,
            $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
            $default = $native || getMethod(DEFAULT),
            $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
            $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
            methods,
            key,
            IteratorPrototype;
        // Fix native
        if ($anyNative) {
          IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
          if (IteratorPrototype !== Object.prototype) {
            // Set @@toStringTag to native iterators
            setToStringTag(IteratorPrototype, TAG, true);
            // fix for some old engines
            if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
          }
        }
        // fix Array#{values, @@iterator}.name in V8 / FF
        if (DEF_VALUES && $native && $native.name !== VALUES) {
          VALUES_BUG = true;
          $default = function values() {
            return $native.call(this);
          };
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

      /***/
    },
    /* 43 */
    /***/function (module, exports, __webpack_require__) {

      var pIE = __webpack_require__(29),
          createDesc = __webpack_require__(22),
          toIObject = __webpack_require__(9),
          toPrimitive = __webpack_require__(34),
          has = __webpack_require__(7),
          IE8_DOM_DEFINE = __webpack_require__(41),
          gOPD = Object.getOwnPropertyDescriptor;

      exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
        O = toIObject(O);
        P = toPrimitive(P, true);
        if (IE8_DOM_DEFINE) try {
          return gOPD(O, P);
        } catch (e) {/* empty */}
        if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
      };

      /***/
    },
    /* 44 */
    /***/function (module, exports, __webpack_require__) {

      // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
      var $keys = __webpack_require__(46),
          hiddenKeys = __webpack_require__(25).concat('length', 'prototype');

      exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return $keys(O, hiddenKeys);
      };

      /***/
    },
    /* 45 */
    /***/function (module, exports) {

      exports.f = Object.getOwnPropertySymbols;

      /***/
    },
    /* 46 */
    /***/function (module, exports, __webpack_require__) {

      var has = __webpack_require__(7),
          toIObject = __webpack_require__(9),
          arrayIndexOf = __webpack_require__(80)(false),
          IE_PROTO = __webpack_require__(31)('IE_PROTO');

      module.exports = function (object, names) {
        var O = toIObject(object),
            i = 0,
            result = [],
            key;
        for (key in O) {
          if (key != IE_PROTO) has(O, key) && result.push(key);
        } // Don't enum bug & hidden keys
        while (names.length > i) {
          if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
          }
        }return result;
      };

      /***/
    },
    /* 47 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = __webpack_require__(11);

      /***/
    },
    /* 48 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _draggable = __webpack_require__(17);

      var _draggable2 = _interopRequireDefault(_draggable);

      var _utils = __webpack_require__(13);

      var _droppableEvent = __webpack_require__(58);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var classes = {
        'droppable:active': 'draggable-droppable--active',
        'droppable:occupied': 'draggable-droppable--occupied'
      };

      var Droppable = function () {
        function Droppable() {
          var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (0, _classCallCheck3.default)(this, Droppable);

          this.draggable = new _draggable2.default(containers, options);
          this.options = Object.assign({}, options);

          this._onDragStart = this._onDragStart.bind(this);
          this._onDragMove = this._onDragMove.bind(this);
          this._onDragStop = this._onDragStop.bind(this);

          this.draggable.on('drag:start', this._onDragStart).on('drag:move', this._onDragMove).on('drag:stop', this._onDragStop);
        }

        (0, _createClass3.default)(Droppable, [{
          key: 'destroy',
          value: function destroy() {
            this.draggable.off('drag:start', this._onDragStart).off('drag:move', this._onDragMove).off('drag:stop', this._onDragStop).destroy();
          }
        }, {
          key: 'on',
          value: function on(type, callback) {
            this.draggable.on(type, callback);
            return this;
          }
        }, {
          key: 'off',
          value: function off(type, callback) {
            this.draggable.off(type, callback);
            return this;
          }
        }, {
          key: 'getClassNameFor',
          value: function getClassNameFor(name) {
            return this.options.classes[name] || classes[name];
          }
        }, {
          key: '_onDragStart',
          value: function _onDragStart(event) {
            if (event.canceled()) {
              return;
            }

            this.droppables = this._getDroppables();
            var droppable = event.sensorEvent.target.closest(this.options.droppable);

            if (!droppable) {
              event.cancel();
              return;
            }

            this.initialDroppable = droppable;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.droppables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var droppableElement = _step.value;

                if (droppableElement.classList.contains(this.getClassNameFor('droppable:occupied'))) {
                  continue;
                }

                droppableElement.classList.add(this.getClassNameFor('droppable:active'));
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
        }, {
          key: '_onDragMove',
          value: function _onDragMove(event) {
            if (event.canceled()) {
              return;
            }

            var droppable = this._closestDroppable(event.sensorEvent.target);
            var overEmptyDroppable = droppable && !droppable.classList.contains(this.getClassNameFor('droppable:occupied'));

            if (overEmptyDroppable && this._drop(event, droppable)) {
              this.lastDroppable = droppable;
            } else if ((!droppable || droppable === this.initialDroppable) && this.lastDroppable) {
              this._release(event);
              this.lastDroppable = null;
            }
          }
        }, {
          key: '_onDragStop',
          value: function _onDragStop() {
            var occupiedClass = this.getClassNameFor('droppable:occupied');

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.droppables[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var droppable = _step2.value;

                droppable.classList.remove(this.getClassNameFor('droppable:active'));
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

            if (this.lastDroppable && this.lastDroppable !== this.initialDroppable) {
              this.initialDroppable.classList.remove(occupiedClass);
            }

            this.droppables = null;
            this.lastDroppable = null;
            this.initialDroppable = null;
          }
        }, {
          key: '_drop',
          value: function _drop(event, droppable) {
            var droppableOverEvent = new _droppableEvent.DroppableOverEvent({
              dragEvent: event,
              droppable: droppable
            });

            this.draggable.triggerEvent(droppableOverEvent);

            if (droppableOverEvent.canceled()) {
              return false;
            }

            var occupiedClass = this.getClassNameFor('droppable:occupied');

            if (this.lastDroppable) {
              this.lastDroppable.classList.remove(occupiedClass);
            }

            droppable.appendChild(event.source);
            droppable.classList.add(occupiedClass);

            return true;
          }
        }, {
          key: '_release',
          value: function _release(event) {
            var droppableOutEvent = new _droppableEvent.DroppableOutEvent({
              dragEvent: event,
              droppable: this.lastDroppable
            });

            this.draggable.triggerEvent(droppableOutEvent);

            if (droppableOutEvent.canceled()) {
              return;
            }

            this.initialDroppable.appendChild(event.source);
            this.lastDroppable.classList.remove(this.getClassNameFor('droppable:occupied'));
          }
        }, {
          key: '_closestDroppable',
          value: function _closestDroppable(target) {
            var _this = this;

            if (!this.droppables) {
              return null;
            }

            return (0, _utils.closest)(target, function (element) {
              return Array.from(_this.droppables).includes(element);
            });
          }
        }, {
          key: '_getDroppables',
          value: function _getDroppables() {
            var droppables = this.options.droppable;

            if (typeof droppables === 'string') {
              return document.querySelectorAll(droppables);
            } else if (droppables instanceof NodeList || droppables instanceof Array) {
              return droppables;
            } else if (typeof droppables === 'function') {
              return droppables();
            } else {
              return [];
            }
          }
        }]);
        return Droppable;
      }();

      exports.default = Droppable;

      /***/
    },
    /* 49 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _draggable = __webpack_require__(17);

      var _draggable2 = _interopRequireDefault(_draggable);

      var _sortableEvent = __webpack_require__(61);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var Sortable = function () {
        function Sortable() {
          var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (0, _classCallCheck3.default)(this, Sortable);

          this.draggable = new _draggable2.default(containers, options);

          this._onDragStart = this._onDragStart.bind(this);
          this._onDragOverContainer = this._onDragOverContainer.bind(this);
          this._onDragOver = this._onDragOver.bind(this);
          this._onDragStop = this._onDragStop.bind(this);

          this.draggable.on('drag:start', this._onDragStart).on('drag:over:container', this._onDragOverContainer).on('drag:over', this._onDragOver).on('drag:stop', this._onDragStop);
        }

        (0, _createClass3.default)(Sortable, [{
          key: 'destroy',
          value: function destroy() {
            this.draggable.off('drag:start', this._onDragStart).off('drag:over:container', this._onDragOverContainer).off('drag:over', this._onDragOver).off('drag:stop', this._onDragStop).destroy();
          }
        }, {
          key: 'on',
          value: function on(type, callback) {
            this.draggable.on(type, callback);
            return this;
          }
        }, {
          key: 'off',
          value: function off(type, callback) {
            this.draggable.off(type, callback);
            return this;
          }
        }, {
          key: '_onDragStart',
          value: function _onDragStart(event) {
            this.startIndex = index(event.source);

            var sortableStartEvent = new _sortableEvent.SortableStartEvent({
              dragEvent: event,
              startIndex: this.startIndex
            });

            this.draggable.trigger(sortableStartEvent);

            if (sortableStartEvent.canceled()) {
              event.cancel();
            }
          }
        }, {
          key: '_onDragOverContainer',
          value: function _onDragOverContainer(event) {
            if (event.canceled()) {
              return;
            }

            var moves = move(event.source, event.over, event.overContainer);

            if (!moves) {
              return;
            }

            var sortableSortedEvent = new _sortableEvent.SortableSortedEvent({
              dragEvent: event,
              moves: moves
            });

            this.draggable.triggerEvent(sortableSortedEvent);
          }
        }, {
          key: '_onDragOver',
          value: function _onDragOver(event) {
            if (event.over === event.source) {
              return;
            }

            var moves = move(event.source, event.over, event.overContainer);

            if (!moves) {
              return;
            }

            var sortableSortedEvent = new _sortableEvent.SortableSortedEvent({
              dragEvent: event,
              moves: moves
            });

            this.draggable.triggerEvent(sortableSortedEvent);
          }
        }, {
          key: '_onDragStop',
          value: function _onDragStop(event) {
            var sortableStopEvent = new _sortableEvent.SortableStopEvent({
              dragEvent: event,
              oldIndex: this.startIndex,
              newIndex: index(event.source)
            });

            this.draggable.triggerEvent(sortableStopEvent);

            this.startIndex = null;
            this.offset = null;
          }
        }]);
        return Sortable;
      }();

      exports.default = Sortable;

      function index(element) {
        return Array.prototype.indexOf.call(element.parentNode.children, element);
      }

      function move(source, over, overContainer) {
        var emptyOverContainer = !overContainer.children.length;
        var differentContainer = over && source.parentNode !== over.parentNode;
        var sameContainer = over && source.parentNode === over.parentNode;

        if (emptyOverContainer) {
          return moveInsideEmptyContainer(source, overContainer);
        } else if (sameContainer) {
          return moveWithinContainer(source, over);
        } else if (differentContainer) {
          return moveOutsideContainer(source, over);
        } else {
          return null;
        }
      }

      function moveInsideEmptyContainer(source, overContainer) {
        var oldContainer = source.parentNode;
        var oldIndex = index(source);

        overContainer.appendChild(source);

        return { oldIndex: oldIndex, newIndex: index(source), oldContainer: oldContainer, newContainer: overContainer };
      }

      function moveWithinContainer(source, over) {
        var oldIndex = index(source);
        var newIndex = index(over);

        if (oldIndex < newIndex) {
          source.parentNode.insertBefore(source, over.nextElementSibling);
        } else {
          source.parentNode.insertBefore(source, over);
        }

        return { oldIndex: oldIndex, newIndex: newIndex, oldContainer: source.parentNode, newContainer: source.parentNode };
      }

      function moveOutsideContainer(source, over) {
        var oldContainer = source.parentNode;
        var oldIndex = index(source);
        var newIndex = index(over);

        over.parentNode.insertBefore(source, over);

        return { oldIndex: oldIndex, newIndex: newIndex, oldContainer: oldContainer, newContainer: source.parentNode };
      }

      /***/
    },
    /* 50 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _draggable = __webpack_require__(17);

      var _draggable2 = _interopRequireDefault(_draggable);

      var _swappableEvent = __webpack_require__(62);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var Swappable = function () {
        function Swappable() {
          var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (0, _classCallCheck3.default)(this, Swappable);

          this.draggable = new _draggable2.default(containers, options);

          this._onDragStart = this._onDragStart.bind(this);
          this._onDragOver = this._onDragOver.bind(this);
          this._onDragStop = this._onDragStop.bind(this);

          this.draggable.on('drag:start', this._onDragStart).on('drag:over', this._onDragOver).on('drag:stop', this._onDragStop);
        }

        (0, _createClass3.default)(Swappable, [{
          key: 'destroy',
          value: function destroy() {
            this.draggable.off('drag:start', this._onDragStart).off('drag:over', this._onDragOver).off('drag:stop', this._onDragStop).destroy();
          }
        }, {
          key: 'on',
          value: function on(type, callback) {
            this.draggable.on(type, callback);
            return this;
          }
        }, {
          key: 'off',
          value: function off(type, callback) {
            this.draggable.off(type, callback);
            return this;
          }
        }, {
          key: '_onDragStart',
          value: function _onDragStart(event) {
            var swappableStartEvent = new _swappableEvent.SwappableStartEvent({
              dragEvent: event
            });

            this.draggable.triggerEvent(swappableStartEvent);

            if (swappableStartEvent.canceled()) {
              event.cancel();
            }
          }
        }, {
          key: '_onDragOver',
          value: function _onDragOver(event) {
            if (event.over === event.source) {
              return;
            }

            if (event.canceled()) {
              return;
            }

            if (this.lastOver && this.lastOver !== event.over) {
              swap(this.lastOver, event.source);
            }

            this.lastOver = event.over;

            swap(event.source, event.over);

            // Let this cancel the actual swap
            var swappableSwappedEvent = new _swappableEvent.SwappableSwappedEvent({
              dragEvent: event,
              swappedElement: event.over
            });

            this.draggable.triggerEvent(swappableSwappedEvent);
          }
        }, {
          key: '_onDragStop',
          value: function _onDragStop(event) {
            var swappableStopEvent = new _swappableEvent.SwappableStopEvent({
              dragEvent: event
            });

            this.draggable.triggerEvent(swappableStopEvent);
            this.lastOver = null;
          }
        }]);
        return Swappable;
      }();

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

      /***/
    },
    /* 51 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _utils = __webpack_require__(13);

      var _collidableEvent = __webpack_require__(55);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var Collidable = function () {
        function Collidable(draggable) {
          (0, _classCallCheck3.default)(this, Collidable);

          this.draggable = draggable;

          this._onDragMove = this._onDragMove.bind(this);
          this._onDragStop = this._onDragStop.bind(this);
          this._onRequestAnimationFrame = this._onRequestAnimationFrame.bind(this);
        }

        (0, _createClass3.default)(Collidable, [{
          key: 'attach',
          value: function attach() {
            this.draggable.on('drag:move', this._onDragMove);
            this.draggable.on('drag:stop', this._onDragStop);
          }
        }, {
          key: 'detach',
          value: function detach() {
            this.draggable.off('drag:move', this._onDragMove);
            this.draggable.off('drag:stop', this._onDragStop);
          }
        }, {
          key: '_onDragMove',
          value: function _onDragMove(event) {
            var target = event.sensorEvent.target;

            this.currentAnimationFrame = requestAnimationFrame(this._onRequestAnimationFrame(target));

            if (this.currentlyCollidingElement) {
              event.cancel();
            }

            var collidableInEvent = new _collidableEvent.CollidableInEvent({
              dragEvent: event,
              collidingElement: this.currentlyCollidingElement
            });

            var collidableOutEvent = new _collidableEvent.CollidableOutEvent({
              dragEvent: event,
              collidingElement: this.lastCollidingElement
            });

            var enteringCollidable = Boolean(this.currentlyCollidingElement && this.lastCollidingElement !== this.currentlyCollidingElement);
            var leavingCollidable = Boolean(!this.currentlyCollidingElement && this.lastCollidingElement);

            if (enteringCollidable) {
              if (this.lastCollidingElement) {
                this.draggable.triggerEvent(collidableOutEvent);
              }

              this.draggable.triggerEvent(collidableInEvent);
            } else if (leavingCollidable) {
              this.draggable.triggerEvent(collidableOutEvent);
            }

            this.lastCollidingElement = this.currentlyCollidingElement;
          }
        }, {
          key: '_onDragStop',
          value: function _onDragStop(event) {
            var lastCollidingElement = this.currentlyCollidingElement || this.lastCollidingElement;
            var collidableOutEvent = new _collidableEvent.CollidableOutEvent({
              dragEvent: event,
              collidingElement: lastCollidingElement
            });

            if (lastCollidingElement) {
              this.draggable.triggerEvent(collidableOutEvent);
            }

            this.lastCollidingElement = null;
            this.currentlyCollidingElement = null;
          }
        }, {
          key: '_onRequestAnimationFrame',
          value: function _onRequestAnimationFrame(target) {
            var _this = this;

            return function () {
              var collidables = _this._getCollidables();
              _this.currentlyCollidingElement = (0, _utils.closest)(target, function (element) {
                return collidables.includes(element);
              });
            };
          }
        }, {
          key: '_getCollidables',
          value: function _getCollidables() {
            var collidables = this.draggable.options.collidables;

            if (typeof collidables === 'string') {
              return Array.prototype.slice.call(document.querySelectorAll(collidables));
            } else if (collidables instanceof NodeList || collidables instanceof Array) {
              return Array.prototype.slice.call(collidables);
            } else if (collidables instanceof HTMLElement) {
              return [collidables];
            } else if (typeof collidables === 'function') {
              return collidables();
            } else {
              return [];
            }
          }
        }]);
        return Collidable;
      }();

      exports.default = Collidable;

      /***/
    },
    /* 52 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _snappableEvent = __webpack_require__(60);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var Snappable = function () {
        function Snappable(draggable) {
          (0, _classCallCheck3.default)(this, Snappable);

          this.draggable = draggable;

          this._onDragStart = this._onDragStart.bind(this);
          this._onDragStop = this._onDragStop.bind(this);
          this._onDragOver = this._onDragOver.bind(this);
          this._onDragOut = this._onDragOut.bind(this);
        }

        (0, _createClass3.default)(Snappable, [{
          key: 'attach',
          value: function attach() {
            this.draggable.on('drag:start', this._onDragStart).on('drag:stop', this._onDragStop).on('drag:over', this._onDragOver).on('drag:out', this._onDragOut).on('droppable:over', this._onDragOver).on('droppable:out', this._onDragOut);
          }
        }, {
          key: 'detach',
          value: function detach() {
            this.draggable.off('drag:start', this._onDragStart).off('drag:stop', this._onDragStop).off('drag:over', this._onDragOver).off('drag:out', this._onDragOut).off('droppable:over', this._onDragOver).off('droppable:out', this._onDragOut);
          }
        }, {
          key: '_onDragStart',
          value: function _onDragStart(event) {
            if (event.canceled()) {
              return;
            }

            this.firstSource = event.source;
          }
        }, {
          key: '_onDragStop',
          value: function _onDragStop() {
            this.firstSource = null;
          }
        }, {
          key: '_onDragOver',
          value: function _onDragOver(event) {
            var _this = this;

            if (event.canceled()) {
              return;
            }

            var source = event.source || event.dragEvent.source;
            var mirror = event.mirror || event.dragEvent.mirror;

            if (source === this.firstSource) {
              this.firstSource = null;
              return;
            }

            var snapInEvent = new _snappableEvent.SnapInEvent({
              dragEvent: event
            });

            this.draggable.triggerEvent(snapInEvent);

            if (snapInEvent.canceled()) {
              return;
            }

            if (mirror) {
              mirror.style.display = 'none';
            }

            source.classList.remove(this.draggable.getClassNameFor('source:dragging'));
            source.classList.add(this.draggable.getClassNameFor('source:placed'));

            setTimeout(function () {
              source.classList.remove(_this.draggable.getClassNameFor('source:placed'));
            }, this.draggable.options.placedTimeout);
          }
        }, {
          key: '_onDragOut',
          value: function _onDragOut(event) {
            if (event.canceled()) {
              return;
            }

            var mirror = event.mirror || event.dragEvent.mirror;
            var source = event.source || event.dragEvent.source;

            var snapOutEvent = new _snappableEvent.SnapOutEvent({
              dragEvent: event
            });

            this.draggable.triggerEvent(snapOutEvent);

            if (snapOutEvent.canceled()) {
              return;
            }

            if (mirror) {
              mirror.style.display = '';
            }

            source.classList.add(this.draggable.getClassNameFor('source:dragging'));
          }
        }]);
        return Snappable;
      }();

      exports.default = Snappable;

      /***/
    },
    /* 53 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var ARIA_GRABBED = 'aria-grabbed';
      var ARIA_DROPEFFECT = 'aria-dropeffect';
      var TABINDEX = 'tabindex';

      var Accessibility = function () {
        function Accessibility(draggable) {
          (0, _classCallCheck3.default)(this, Accessibility);

          this.draggable = draggable;

          this._onInit = this._onInit.bind(this);
          this._onDestroy = this._onDestroy.bind(this);
        }

        (0, _createClass3.default)(Accessibility, [{
          key: 'attach',
          value: function attach() {
            this.draggable.on('init', this._onInit).on('destroy', this._onDestroy).on('drag:start', _onDragStart).on('drag:stop', _onDragStop);
          }
        }, {
          key: 'detach',
          value: function detach() {
            this.draggable.off('init', this._onInit).off('destroy', this._onDestroy).off('drag:start', _onDragStart).off('drag:stop', _onDragStop);
          }
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
      }();

      exports.default = Accessibility;

      function _onDragStart(_ref3) {
        var source = _ref3.source;

        source.setAttribute(ARIA_GRABBED, true);
      }

      function _onDragStop(_ref4) {
        var source = _ref4.source;

        source.setAttribute(ARIA_GRABBED, false);
      }

      /***/
    },
    /* 54 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var Mirror = function () {
        function Mirror(draggable) {
          (0, _classCallCheck3.default)(this, Mirror);

          this.draggable = draggable;

          this._onMirrorCreated = this._onMirrorCreated.bind(this);
          this._onMirrorMove = this._onMirrorMove.bind(this);
        }

        (0, _createClass3.default)(Mirror, [{
          key: 'attach',
          value: function attach() {
            this.draggable.on('mirror:created', this._onMirrorCreated).on('mirror:created', onMirrorCreated).on('mirror:move', this._onMirrorMove);
          }
        }, {
          key: 'detach',
          value: function detach() {
            this.draggable.off('mirror:created', this._onMirrorCreated).off('mirror:created', onMirrorCreated).off('mirror:move', this._onMirrorMove);
          }
        }, {
          key: '_onMirrorCreated',
          value: function _onMirrorCreated(_ref) {
            var _this = this;

            var mirror = _ref.mirror,
                source = _ref.source,
                sensorEvent = _ref.sensorEvent;

            var mirrorClass = this.draggable.getClassNameFor('mirror');

            var setState = function setState(data) {
              _this.mirrorOffset = data.mirrorOffset;
              return data;
            };

            Promise.resolve({ mirror: mirror, source: source, sensorEvent: sensorEvent, mirrorClass: mirrorClass }).then(computeMirrorDimensions).then(calculateMirrorOffset).then(addMirrorClasses).then(positionMirror()).then(removeMirrorID).then(setState).catch();
          }
        }, {
          key: '_onMirrorMove',
          value: function _onMirrorMove(_ref2) {
            var mirror = _ref2.mirror,
                sensorEvent = _ref2.sensorEvent;

            Promise.resolve({ mirror: mirror, sensorEvent: sensorEvent, mirrorOffset: this.mirrorOffset }).then(positionMirror({ raf: true })).catch();
          }
        }]);
        return Mirror;
      }();

      exports.default = Mirror;

      function onMirrorCreated(_ref3) {
        var mirror = _ref3.mirror,
            source = _ref3.source;

        Promise.resolve({ mirror: mirror, source: source }).then(resetMirror).catch();
      }

      function resetMirror(data) {
        return withPromise(function (resolve) {
          var mirror = data.mirror,
              source = data.source;

          mirror.style.position = 'fixed';
          mirror.style.pointerEvents = 'none';
          mirror.style.top = 0;
          mirror.style.left = 0;
          mirror.style.width = source.offsetWidth + 'px';
          mirror.style.height = source.offsetHeight + 'px';

          resolve(data);
        });
      }

      function computeMirrorDimensions(data) {
        return withPromise(function (resolve) {
          var source = data.source;

          var sourceRect = source.getBoundingClientRect();
          resolve(Object.assign({}, data, { sourceRect: sourceRect }));
        });
      }

      function calculateMirrorOffset(data) {
        return withPromise(function (resolve) {
          var sensorEvent = data.sensorEvent,
              sourceRect = data.sourceRect;

          var mirrorOffset = { top: sensorEvent.clientY - sourceRect.top, left: sensorEvent.clientX - sourceRect.left };
          resolve(Object.assign({}, data, { mirrorOffset: mirrorOffset }));
        });
      }

      function addMirrorClasses(data) {
        return withPromise(function (resolve) {
          var mirror = data.mirror,
              mirrorClass = data.mirrorClass;

          mirror.classList.add(mirrorClass);
          resolve(data);
        });
      }

      function removeMirrorID(data) {
        return withPromise(function (resolve) {
          var mirror = data.mirror;

          mirror.removeAttribute('id');
          delete mirror.id;
          resolve(data);
        });
      }

      function positionMirror() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref4$withFrame = _ref4.withFrame,
            withFrame = _ref4$withFrame === undefined ? false : _ref4$withFrame;

        return function (data) {
          return withPromise(function (resolve) {
            var mirror = data.mirror,
                sensorEvent = data.sensorEvent,
                mirrorOffset = data.mirrorOffset;

            if (mirrorOffset) {
              var x = sensorEvent.clientX - mirrorOffset.left;
              var y = sensorEvent.clientY - mirrorOffset.top;

              mirror.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
            }

            resolve(data);
          }, { frame: withFrame });
        };
      }

      function withPromise(callback) {
        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref5$raf = _ref5.raf,
            raf = _ref5$raf === undefined ? false : _ref5$raf;

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

      /***/
    },
    /* 55 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.CollidableOutEvent = exports.CollidableInEvent = exports.CollidableEvent = undefined;

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var CollidableEvent = exports.CollidableEvent = function (_AbstractEvent) {
        (0, _inherits3.default)(CollidableEvent, _AbstractEvent);

        function CollidableEvent() {
          (0, _classCallCheck3.default)(this, CollidableEvent);
          return (0, _possibleConstructorReturn3.default)(this, (CollidableEvent.__proto__ || Object.getPrototypeOf(CollidableEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(CollidableEvent, [{
          key: 'dragEvent',
          get: function get() {
            return this.data.dragEvent;
          }
        }]);
        return CollidableEvent;
      }(_abstractEvent2.default);

      CollidableEvent.type = 'collidable';

      var CollidableInEvent = exports.CollidableInEvent = function (_CollidableEvent) {
        (0, _inherits3.default)(CollidableInEvent, _CollidableEvent);

        function CollidableInEvent() {
          (0, _classCallCheck3.default)(this, CollidableInEvent);
          return (0, _possibleConstructorReturn3.default)(this, (CollidableInEvent.__proto__ || Object.getPrototypeOf(CollidableInEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(CollidableInEvent, [{
          key: 'collidingElement',
          get: function get() {
            return this.data.collidingElement;
          }
        }]);
        return CollidableInEvent;
      }(CollidableEvent);

      CollidableInEvent.type = 'collidable:in';

      var CollidableOutEvent = exports.CollidableOutEvent = function (_CollidableEvent2) {
        (0, _inherits3.default)(CollidableOutEvent, _CollidableEvent2);

        function CollidableOutEvent() {
          (0, _classCallCheck3.default)(this, CollidableOutEvent);
          return (0, _possibleConstructorReturn3.default)(this, (CollidableOutEvent.__proto__ || Object.getPrototypeOf(CollidableOutEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(CollidableOutEvent, [{
          key: 'collidingElement',
          get: function get() {
            return this.data.collidingElement;
          }
        }]);
        return CollidableOutEvent;
      }(CollidableEvent);

      CollidableOutEvent.type = 'collidable:out';

      /***/
    },
    /* 56 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DragStopEvent = exports.DragPressureEvent = exports.DragOverEvent = exports.DragOverContainerEvent = exports.DragOutEvent = exports.DragOutContainerEvent = exports.DragMoveEvent = exports.DragStartEvent = exports.DragEvent = undefined;

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var DragEvent = exports.DragEvent = function (_AbstractEvent) {
        (0, _inherits3.default)(DragEvent, _AbstractEvent);

        function DragEvent() {
          (0, _classCallCheck3.default)(this, DragEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragEvent.__proto__ || Object.getPrototypeOf(DragEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(DragEvent, [{
          key: 'hasMirror',
          value: function hasMirror() {
            return Boolean(this.mirror);
          }
        }, {
          key: 'source',
          get: function get() {
            return this.data.source;
          }
        }, {
          key: 'mirror',
          get: function get() {
            return this.data.mirror;
          }
        }, {
          key: 'sourceContainer',
          get: function get() {
            return this.data.sourceContainer;
          }
        }, {
          key: 'sensorEvent',
          get: function get() {
            return this.data.sensorEvent;
          }
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
      }(_abstractEvent2.default);

      var DragStartEvent = exports.DragStartEvent = function (_DragEvent) {
        (0, _inherits3.default)(DragStartEvent, _DragEvent);

        function DragStartEvent() {
          (0, _classCallCheck3.default)(this, DragStartEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragStartEvent.__proto__ || Object.getPrototypeOf(DragStartEvent)).apply(this, arguments));
        }

        return DragStartEvent;
      }(DragEvent);

      DragStartEvent.type = 'drag:start';

      var DragMoveEvent = exports.DragMoveEvent = function (_DragEvent2) {
        (0, _inherits3.default)(DragMoveEvent, _DragEvent2);

        function DragMoveEvent() {
          (0, _classCallCheck3.default)(this, DragMoveEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragMoveEvent.__proto__ || Object.getPrototypeOf(DragMoveEvent)).apply(this, arguments));
        }

        return DragMoveEvent;
      }(DragEvent);

      DragMoveEvent.type = 'drag:move';

      var DragOutContainerEvent = exports.DragOutContainerEvent = function (_DragEvent3) {
        (0, _inherits3.default)(DragOutContainerEvent, _DragEvent3);

        function DragOutContainerEvent() {
          (0, _classCallCheck3.default)(this, DragOutContainerEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragOutContainerEvent.__proto__ || Object.getPrototypeOf(DragOutContainerEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(DragOutContainerEvent, [{
          key: 'overContainer',
          get: function get() {
            return this.data.overContainer;
          }
        }]);
        return DragOutContainerEvent;
      }(DragEvent);

      DragOutContainerEvent.type = 'drag:out:container';

      var DragOutEvent = exports.DragOutEvent = function (_DragEvent4) {
        (0, _inherits3.default)(DragOutEvent, _DragEvent4);

        function DragOutEvent() {
          (0, _classCallCheck3.default)(this, DragOutEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragOutEvent.__proto__ || Object.getPrototypeOf(DragOutEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(DragOutEvent, [{
          key: 'overContainer',
          get: function get() {
            return this.data.overContainer;
          }
        }, {
          key: 'over',
          get: function get() {
            return this.data.over;
          }
        }]);
        return DragOutEvent;
      }(DragEvent);

      DragOutEvent.type = 'drag:out';

      var DragOverContainerEvent = exports.DragOverContainerEvent = function (_DragEvent5) {
        (0, _inherits3.default)(DragOverContainerEvent, _DragEvent5);

        function DragOverContainerEvent() {
          (0, _classCallCheck3.default)(this, DragOverContainerEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragOverContainerEvent.__proto__ || Object.getPrototypeOf(DragOverContainerEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(DragOverContainerEvent, [{
          key: 'overContainer',
          get: function get() {
            return this.data.overContainer;
          }
        }]);
        return DragOverContainerEvent;
      }(DragEvent);

      DragOverContainerEvent.type = 'drag:over:container';

      var DragOverEvent = exports.DragOverEvent = function (_DragEvent6) {
        (0, _inherits3.default)(DragOverEvent, _DragEvent6);

        function DragOverEvent() {
          (0, _classCallCheck3.default)(this, DragOverEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragOverEvent.__proto__ || Object.getPrototypeOf(DragOverEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(DragOverEvent, [{
          key: 'overContainer',
          get: function get() {
            return this.data.overContainer;
          }
        }, {
          key: 'over',
          get: function get() {
            return this.data.over;
          }
        }]);
        return DragOverEvent;
      }(DragEvent);

      DragOverEvent.type = 'drag:over';

      var DragPressureEvent = exports.DragPressureEvent = function (_DragEvent7) {
        (0, _inherits3.default)(DragPressureEvent, _DragEvent7);

        function DragPressureEvent() {
          (0, _classCallCheck3.default)(this, DragPressureEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DragPressureEvent.__proto__ || Object.getPrototypeOf(DragPressureEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(DragPressureEvent, [{
          key: 'pressure',
          get: function get() {
            return this.data.pressure;
          }
        }]);
        return DragPressureEvent;
      }(DragEvent);

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

      /***/
    },
    /* 57 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DraggableDestroyEvent = exports.DraggableInitializedEvent = exports.DraggableEvent = undefined;

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var DraggableEvent = exports.DraggableEvent = function (_AbstractEvent) {
        (0, _inherits3.default)(DraggableEvent, _AbstractEvent);

        function DraggableEvent() {
          (0, _classCallCheck3.default)(this, DraggableEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DraggableEvent.__proto__ || Object.getPrototypeOf(DraggableEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(DraggableEvent, [{
          key: 'draggable',
          get: function get() {
            return this.data.draggable;
          }
        }]);
        return DraggableEvent;
      }(_abstractEvent2.default);

      DraggableEvent.type = 'draggable';

      var DraggableInitializedEvent = exports.DraggableInitializedEvent = function (_DraggableEvent) {
        (0, _inherits3.default)(DraggableInitializedEvent, _DraggableEvent);

        function DraggableInitializedEvent() {
          (0, _classCallCheck3.default)(this, DraggableInitializedEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DraggableInitializedEvent.__proto__ || Object.getPrototypeOf(DraggableInitializedEvent)).apply(this, arguments));
        }

        return DraggableInitializedEvent;
      }(DraggableEvent);

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

      /***/
    },
    /* 58 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DroppableOutEvent = exports.DroppableOverEvent = exports.DroppableEvent = undefined;

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var DroppableEvent = exports.DroppableEvent = function (_AbstractEvent) {
        (0, _inherits3.default)(DroppableEvent, _AbstractEvent);

        function DroppableEvent() {
          (0, _classCallCheck3.default)(this, DroppableEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DroppableEvent.__proto__ || Object.getPrototypeOf(DroppableEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(DroppableEvent, [{
          key: 'dragEvent',
          get: function get() {
            return this.data.dragEvent;
          }
        }, {
          key: 'droppable',
          get: function get() {
            return this.data.droppable;
          }
        }]);
        return DroppableEvent;
      }(_abstractEvent2.default);

      DroppableEvent.type = 'droppable';

      var DroppableOverEvent = exports.DroppableOverEvent = function (_DroppableEvent) {
        (0, _inherits3.default)(DroppableOverEvent, _DroppableEvent);

        function DroppableOverEvent() {
          (0, _classCallCheck3.default)(this, DroppableOverEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DroppableOverEvent.__proto__ || Object.getPrototypeOf(DroppableOverEvent)).apply(this, arguments));
        }

        return DroppableOverEvent;
      }(DroppableEvent);

      DroppableOverEvent.type = 'droppable:over';

      var DroppableOutEvent = exports.DroppableOutEvent = function (_DroppableEvent2) {
        (0, _inherits3.default)(DroppableOutEvent, _DroppableEvent2);

        function DroppableOutEvent() {
          (0, _classCallCheck3.default)(this, DroppableOutEvent);
          return (0, _possibleConstructorReturn3.default)(this, (DroppableOutEvent.__proto__ || Object.getPrototypeOf(DroppableOutEvent)).apply(this, arguments));
        }

        return DroppableOutEvent;
      }(DroppableEvent);

      DroppableOutEvent.type = 'droppable:out';

      /***/
    },
    /* 59 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.MirrorDestroyEvent = exports.MirrorMoveEvent = exports.MirrorAttachedEvent = exports.MirrorCreatedEvent = exports.MirrorEvent = undefined;

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var MirrorEvent = exports.MirrorEvent = function (_AbstractEvent) {
        (0, _inherits3.default)(MirrorEvent, _AbstractEvent);

        function MirrorEvent() {
          (0, _classCallCheck3.default)(this, MirrorEvent);
          return (0, _possibleConstructorReturn3.default)(this, (MirrorEvent.__proto__ || Object.getPrototypeOf(MirrorEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(MirrorEvent, [{
          key: 'source',
          get: function get() {
            return this.data.source;
          }
        }, {
          key: 'mirror',
          get: function get() {
            return this.data.mirror;
          }
        }, {
          key: 'sourceContainer',
          get: function get() {
            return this.data.sourceContainer;
          }
        }, {
          key: 'sensorEvent',
          get: function get() {
            return this.data.sensorEvent;
          }
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
      }(_abstractEvent2.default);

      var MirrorCreatedEvent = exports.MirrorCreatedEvent = function (_MirrorEvent) {
        (0, _inherits3.default)(MirrorCreatedEvent, _MirrorEvent);

        function MirrorCreatedEvent() {
          (0, _classCallCheck3.default)(this, MirrorCreatedEvent);
          return (0, _possibleConstructorReturn3.default)(this, (MirrorCreatedEvent.__proto__ || Object.getPrototypeOf(MirrorCreatedEvent)).apply(this, arguments));
        }

        return MirrorCreatedEvent;
      }(MirrorEvent);

      MirrorCreatedEvent.type = 'mirror:created';

      var MirrorAttachedEvent = exports.MirrorAttachedEvent = function (_MirrorEvent2) {
        (0, _inherits3.default)(MirrorAttachedEvent, _MirrorEvent2);

        function MirrorAttachedEvent() {
          (0, _classCallCheck3.default)(this, MirrorAttachedEvent);
          return (0, _possibleConstructorReturn3.default)(this, (MirrorAttachedEvent.__proto__ || Object.getPrototypeOf(MirrorAttachedEvent)).apply(this, arguments));
        }

        return MirrorAttachedEvent;
      }(MirrorEvent);

      MirrorAttachedEvent.type = 'mirror:attached';

      var MirrorMoveEvent = exports.MirrorMoveEvent = function (_MirrorEvent3) {
        (0, _inherits3.default)(MirrorMoveEvent, _MirrorEvent3);

        function MirrorMoveEvent() {
          (0, _classCallCheck3.default)(this, MirrorMoveEvent);
          return (0, _possibleConstructorReturn3.default)(this, (MirrorMoveEvent.__proto__ || Object.getPrototypeOf(MirrorMoveEvent)).apply(this, arguments));
        }

        return MirrorMoveEvent;
      }(MirrorEvent);

      MirrorMoveEvent.type = 'mirror:move';

      var MirrorDestroyEvent = exports.MirrorDestroyEvent = function (_MirrorEvent4) {
        (0, _inherits3.default)(MirrorDestroyEvent, _MirrorEvent4);

        function MirrorDestroyEvent() {
          (0, _classCallCheck3.default)(this, MirrorDestroyEvent);
          return (0, _possibleConstructorReturn3.default)(this, (MirrorDestroyEvent.__proto__ || Object.getPrototypeOf(MirrorDestroyEvent)).apply(this, arguments));
        }

        return MirrorDestroyEvent;
      }(MirrorEvent);

      MirrorDestroyEvent.type = 'mirror:destroy';

      /***/
    },
    /* 60 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SnapOutEvent = exports.SnapInEvent = exports.SnapEvent = undefined;

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var SnapEvent = exports.SnapEvent = function (_AbstractEvent) {
        (0, _inherits3.default)(SnapEvent, _AbstractEvent);

        function SnapEvent() {
          (0, _classCallCheck3.default)(this, SnapEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SnapEvent.__proto__ || Object.getPrototypeOf(SnapEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(SnapEvent, [{
          key: 'dragEvent',
          get: function get() {
            return this.data.dragEvent;
          }
        }]);
        return SnapEvent;
      }(_abstractEvent2.default);

      var SnapInEvent = exports.SnapInEvent = function (_SnapEvent) {
        (0, _inherits3.default)(SnapInEvent, _SnapEvent);

        function SnapInEvent() {
          (0, _classCallCheck3.default)(this, SnapInEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SnapInEvent.__proto__ || Object.getPrototypeOf(SnapInEvent)).apply(this, arguments));
        }

        return SnapInEvent;
      }(SnapEvent);

      SnapInEvent.type = 'snap:in';

      var SnapOutEvent = exports.SnapOutEvent = function (_SnapEvent2) {
        (0, _inherits3.default)(SnapOutEvent, _SnapEvent2);

        function SnapOutEvent() {
          (0, _classCallCheck3.default)(this, SnapOutEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SnapOutEvent.__proto__ || Object.getPrototypeOf(SnapOutEvent)).apply(this, arguments));
        }

        return SnapOutEvent;
      }(SnapEvent);

      SnapOutEvent.type = 'snap:out';

      /***/
    },
    /* 61 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SortableStopEvent = exports.SortableSortedEvent = exports.SortableStartEvent = exports.SortableEvent = undefined;

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var SortableEvent = exports.SortableEvent = function (_AbstractEvent) {
        (0, _inherits3.default)(SortableEvent, _AbstractEvent);

        function SortableEvent() {
          (0, _classCallCheck3.default)(this, SortableEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SortableEvent.__proto__ || Object.getPrototypeOf(SortableEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(SortableEvent, [{
          key: 'dragEvent',
          get: function get() {
            return this.data.dragEvent;
          }
        }]);
        return SortableEvent;
      }(_abstractEvent2.default);

      var SortableStartEvent = exports.SortableStartEvent = function (_SortableEvent) {
        (0, _inherits3.default)(SortableStartEvent, _SortableEvent);

        function SortableStartEvent() {
          (0, _classCallCheck3.default)(this, SortableStartEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SortableStartEvent.__proto__ || Object.getPrototypeOf(SortableStartEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(SortableStartEvent, [{
          key: 'startIndex',
          get: function get() {
            return this.data.startIndex;
          }
        }]);
        return SortableStartEvent;
      }(SortableEvent);

      SortableStartEvent.type = 'sortable:start';

      var SortableSortedEvent = exports.SortableSortedEvent = function (_SortableEvent2) {
        (0, _inherits3.default)(SortableSortedEvent, _SortableEvent2);

        function SortableSortedEvent() {
          (0, _classCallCheck3.default)(this, SortableSortedEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SortableSortedEvent.__proto__ || Object.getPrototypeOf(SortableSortedEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(SortableSortedEvent, [{
          key: 'moves',
          get: function get() {
            return this.data.moves;
          }
        }]);
        return SortableSortedEvent;
      }(SortableEvent);

      SortableSortedEvent.type = 'sortable:sorted';

      var SortableStopEvent = exports.SortableStopEvent = function (_SortableEvent3) {
        (0, _inherits3.default)(SortableStopEvent, _SortableEvent3);

        function SortableStopEvent() {
          (0, _classCallCheck3.default)(this, SortableStopEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SortableStopEvent.__proto__ || Object.getPrototypeOf(SortableStopEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(SortableStopEvent, [{
          key: 'oldIndex',
          get: function get() {
            return this.data.oldIndex;
          }
        }, {
          key: 'newIndex',
          get: function get() {
            return this.data.newIndex;
          }
        }]);
        return SortableStopEvent;
      }(SortableEvent);

      SortableStopEvent.type = 'sortable:stop';

      /***/
    },
    /* 62 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SwappableStopEvent = exports.SwappableSwappedEvent = exports.SwappableStartEvent = exports.SwappableEvent = undefined;

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var SwappableEvent = exports.SwappableEvent = function (_AbstractEvent) {
        (0, _inherits3.default)(SwappableEvent, _AbstractEvent);

        function SwappableEvent() {
          (0, _classCallCheck3.default)(this, SwappableEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SwappableEvent.__proto__ || Object.getPrototypeOf(SwappableEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(SwappableEvent, [{
          key: 'dragEvent',
          get: function get() {
            return this.data.dragEvent;
          }
        }]);
        return SwappableEvent;
      }(_abstractEvent2.default);

      var SwappableStartEvent = exports.SwappableStartEvent = function (_SwappableEvent) {
        (0, _inherits3.default)(SwappableStartEvent, _SwappableEvent);

        function SwappableStartEvent() {
          (0, _classCallCheck3.default)(this, SwappableStartEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SwappableStartEvent.__proto__ || Object.getPrototypeOf(SwappableStartEvent)).apply(this, arguments));
        }

        return SwappableStartEvent;
      }(SwappableEvent);

      SwappableStartEvent.type = 'swappable:start';

      var SwappableSwappedEvent = exports.SwappableSwappedEvent = function (_SwappableEvent2) {
        (0, _inherits3.default)(SwappableSwappedEvent, _SwappableEvent2);

        function SwappableSwappedEvent() {
          (0, _classCallCheck3.default)(this, SwappableSwappedEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SwappableSwappedEvent.__proto__ || Object.getPrototypeOf(SwappableSwappedEvent)).apply(this, arguments));
        }

        (0, _createClass3.default)(SwappableSwappedEvent, [{
          key: 'swappedElement',
          get: function get() {
            return this.data.swappedElement;
          }
        }]);
        return SwappableSwappedEvent;
      }(SwappableEvent);

      SwappableSwappedEvent.type = 'swappable:swapped';

      var SwappableStopEvent = exports.SwappableStopEvent = function (_SwappableEvent3) {
        (0, _inherits3.default)(SwappableStopEvent, _SwappableEvent3);

        function SwappableStopEvent() {
          (0, _classCallCheck3.default)(this, SwappableStopEvent);
          return (0, _possibleConstructorReturn3.default)(this, (SwappableStopEvent.__proto__ || Object.getPrototypeOf(SwappableStopEvent)).apply(this, arguments));
        }

        return SwappableStopEvent;
      }(SwappableEvent);

      SwappableStopEvent.type = 'swappable:stop';

      /***/
    },
    /* 63 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.AbstractEvent = exports.Droppable = exports.Swappable = exports.Sortable = exports.Draggable = undefined;
      exports.createEventClass = createEventClass;

      var _draggable = __webpack_require__(17);

      var _draggable2 = _interopRequireDefault(_draggable);

      var _sortable = __webpack_require__(49);

      var _sortable2 = _interopRequireDefault(_sortable);

      var _swappable = __webpack_require__(50);

      var _swappable2 = _interopRequireDefault(_swappable);

      var _droppable = __webpack_require__(48);

      var _droppable2 = _interopRequireDefault(_droppable);

      var _abstractEvent = __webpack_require__(4);

      var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.Draggable = _draggable2.default;
      exports.Sortable = _sortable2.default;
      exports.Swappable = _swappable2.default;
      exports.Droppable = _droppable2.default;
      exports.AbstractEvent = _abstractEvent2.default;
      function createEventClass(options) {
        function EventConstructor() {
          return null;
        }
        EventConstructor.prototype = _abstractEvent2.default.prototype;
        createEventClass.type = options.type;
        return createEventClass;
      }

      /***/
    },
    /* 64 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _sensor = __webpack_require__(19);

      var _sensor2 = _interopRequireDefault(_sensor);

      var _utils = __webpack_require__(13);

      var _sensorEvent = __webpack_require__(18);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var DragSensor = function (_Sensor) {
        (0, _inherits3.default)(DragSensor, _Sensor);

        function DragSensor() {
          var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (0, _classCallCheck3.default)(this, DragSensor);

          var _this = (0, _possibleConstructorReturn3.default)(this, (DragSensor.__proto__ || Object.getPrototypeOf(DragSensor)).call(this, containers, options));

          _this.dragging = false;
          _this.currentContainer = null;

          _this._onMouseDown = _this._onMouseDown.bind(_this);
          _this._onMouseUp = _this._onMouseUp.bind(_this);
          _this._onDragStart = _this._onDragStart.bind(_this);
          _this._onDragOver = _this._onDragOver.bind(_this);
          _this._onDragEnd = _this._onDragEnd.bind(_this);
          _this._onDragDrop = _this._onDragDrop.bind(_this);
          return _this;
        }

        (0, _createClass3.default)(DragSensor, [{
          key: 'attach',
          value: function attach() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var container = _step.value;

                container.addEventListener('mousedown', this._onMouseDown, true);
                container.addEventListener('dragstart', this._onDragStart, false);
                container.addEventListener('dragover', this._onDragOver, false);
                container.addEventListener('dragend', this._onDragEnd, false);
                container.addEventListener('drop', this._onDragDrop, false);
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

            document.addEventListener('mouseup', this._onMouseUp, true);
          }
        }, {
          key: 'detach',
          value: function detach() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var container = _step2.value;

                container.removeEventListener('mousedown', this._onMouseDown, true);
                container.removeEventListener('dragstart', this._onDragStart, false);
                container.removeEventListener('dragover', this._onDragOver, false);
                container.removeEventListener('dragend', this._onDragEnd, false);
                container.removeEventListener('drop', this._onDragDrop, false);
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

            document.removeEventListener('mouseup', this._onMouseUp, true);
          }

          // private

        }, {
          key: '_onDragStart',
          value: function _onDragStart(event) {
            // Need for firefox. "text" key is needed for IE
            event.dataTransfer.setData('text', '');
            event.dataTransfer.effectAllowed = this.options.type;

            var target = document.elementFromPoint(event.clientX, event.clientY);
            this.currentContainer = event.currentTarget;

            var dragStartEvent = new _sensorEvent.DragStartSensorEvent({
              clientX: event.clientX,
              clientY: event.clientY,
              target: target,
              container: this.currentContainer,
              originalEvent: event
            });

            this.trigger(this.currentContainer, dragStartEvent);

            if (dragStartEvent.canceled()) {
              this.dragging = false;
              // prevent drag event if fired event has been prevented
              event.preventDefault();
            } else {
              this.dragging = true;
            }
          }
        }, {
          key: '_onDragOver',
          value: function _onDragOver(event) {
            if (!this.dragging) {
              return;
            }

            var target = document.elementFromPoint(event.clientX, event.clientY);
            var container = event.currentTarget;

            var dragMoveEvent = new _sensorEvent.DragMoveSensorEvent({
              clientX: event.clientX,
              clientY: event.clientY,
              target: target,
              container: this.currentContainer,
              overContainer: container,
              originalEvent: event
            });

            this.trigger(container, dragMoveEvent);

            // event.preventDefault();
            // event.dataTransfer.dropEffect = 'copy';

            if (!dragMoveEvent.canceled()) {
              event.preventDefault();
              // event.dataTransfer.dropEffect = this.options.type;
            }
          }
        }, {
          key: '_onDragEnd',
          value: function _onDragEnd(event) {
            if (!this.dragging) {
              return;
            }

            // prevent click on drop if draggable contains a clickable element
            event.preventDefault();

            var container = event.currentTarget;

            var dragStopEvent = new _sensorEvent.DragStopSensorEvent({
              clientX: event.clientX,
              clientY: event.clientY,
              originalEvent: event,
              container: container
            });

            this.trigger(container, dragStopEvent);

            this.dragging = false;
          }
        }, {
          key: '_onDragDrop',
          value: function _onDragDrop(event) {
            // eslint-disable-line class-methods-use-this
            event.preventDefault();
          }
        }, {
          key: '_onMouseDown',
          value: function _onMouseDown(event) {
            // Firefox bug for inputs within draggables https://bugzilla.mozilla.org/show_bug.cgi?id=739071
            if (event.target && (event.target.form || event.target.contenteditable)) {
              return;
            }

            var target = (0, _utils.closest)(event.target, this.options.draggable);

            if (target) {
              clearTimeout(this.mouseDownTimeout);

              this.mouseDownTimeout = setTimeout(function () {
                target.draggable = true;
              }, this.options.delay);
            }
          }
        }, {
          key: '_onMouseUp',
          value: function _onMouseUp(event) {
            clearTimeout(this.mouseDownTimeout);

            var target = (0, _utils.closest)(event.target, this.options.draggable);

            if (target) {
              target.draggable = false;
            }
          }
        }]);
        return DragSensor;
      }(_sensor2.default);

      exports.default = DragSensor;

      /***/
    },
    /* 65 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _sensor = __webpack_require__(19);

      var _sensor2 = _interopRequireDefault(_sensor);

      var _sensorEvent = __webpack_require__(18);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var ForceTouchSensor = function (_Sensor) {
        (0, _inherits3.default)(ForceTouchSensor, _Sensor);

        function ForceTouchSensor() {
          var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (0, _classCallCheck3.default)(this, ForceTouchSensor);

          var _this = (0, _possibleConstructorReturn3.default)(this, (ForceTouchSensor.__proto__ || Object.getPrototypeOf(ForceTouchSensor)).call(this, containers, options));

          _this.dragging = false;
          _this.mightDrag = false;
          _this.currentContainer = null;

          _this._onMouseForceWillBegin = _this._onMouseForceWillBegin.bind(_this);
          _this._onMouseForceDown = _this._onMouseForceDown.bind(_this);
          _this._onMouseDown = _this._onMouseDown.bind(_this);
          _this._onMouseForceChange = _this._onMouseForceChange.bind(_this);
          _this._onMouseMove = _this._onMouseMove.bind(_this);
          _this._onMouseUp = _this._onMouseUp.bind(_this);
          return _this;
        }

        (0, _createClass3.default)(ForceTouchSensor, [{
          key: 'attach',
          value: function attach() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var container = _step.value;

                container.addEventListener('webkitmouseforcewillbegin', this._onMouseForceWillBegin, false);
                container.addEventListener('webkitmouseforcedown', this._onMouseForceDown, false);
                container.addEventListener('mousedown', this._onMouseDown, true);
                container.addEventListener('webkitmouseforcechanged', this._onMouseForceChange, false);
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

            document.addEventListener('mousemove', this._onMouseMove);
            document.addEventListener('mouseup', this._onMouseUp);
          }
        }, {
          key: 'detach',
          value: function detach() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var container = _step2.value;

                container.removeEventListener('webkitmouseforcewillbegin', this._onMouseForceWillBegin, false);
                container.removeEventListener('webkitmouseforcedown', this._onMouseForceDown, false);
                container.removeEventListener('mousedown', this._onMouseDown, true);
                container.removeEventListener('webkitmouseforcechanged', this._onMouseForceChange, false);
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

            document.removeEventListener('mousemove', this._onMouseMove);
            document.removeEventListener('mouseup', this._onMouseUp);
          }
        }, {
          key: '_onMouseForceWillBegin',
          value: function _onMouseForceWillBegin(event) {
            event.preventDefault();
            this.mightDrag = true;
          }
        }, {
          key: '_onMouseForceDown',
          value: function _onMouseForceDown(event) {
            if (this.dragging) {
              return;
            }

            var target = document.elementFromPoint(event.clientX, event.clientY);
            var container = event.currentTarget;

            var dragStartEvent = new _sensorEvent.DragStartSensorEvent({
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
        }, {
          key: '_onMouseUp',
          value: function _onMouseUp(event) {
            if (!this.dragging) {
              return;
            }

            var dragStopEvent = new _sensorEvent.DragStopSensorEvent({
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
        }, {
          key: '_onMouseDown',
          value: function _onMouseDown(event) {
            if (!this.mightDrag) {
              return;
            }

            // Need workaround for real click
            // Cancel potential drag events
            event.stopPropagation();
            event.stopImmediatePropagation();
            event.preventDefault();
          }
        }, {
          key: '_onMouseMove',
          value: function _onMouseMove(event) {
            if (!this.dragging) {
              return;
            }

            var target = document.elementFromPoint(event.clientX, event.clientY);

            var dragMoveEvent = new _sensorEvent.DragMoveSensorEvent({
              clientX: event.clientX,
              clientY: event.clientY,
              target: target,
              container: this.currentContainer,
              originalEvent: event
            });

            this.trigger(this.currentContainer, dragMoveEvent);
          }
        }, {
          key: '_onMouseForceChange',
          value: function _onMouseForceChange(event) {
            if (this.dragging) {
              return;
            }

            var target = event.target;
            var container = event.currentTarget;

            var dragPressureEvent = new _sensorEvent.DragPressureSensorEvent({
              pressure: event.webkitForce,
              clientX: event.clientX,
              clientY: event.clientY,
              target: target,
              container: container,
              originalEvent: event
            });

            this.trigger(container, dragPressureEvent);
          }
        }, {
          key: '_onMouseForceGlobalChange',
          value: function _onMouseForceGlobalChange(event) {
            if (!this.dragging) {
              return;
            }

            var target = event.target;

            var dragPressureEvent = new _sensorEvent.DragPressureSensorEvent({
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
      }(_sensor2.default);

      exports.default = ForceTouchSensor;

      /***/
    },
    /* 66 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _sensor = __webpack_require__(19);

      var _sensor2 = _interopRequireDefault(_sensor);

      var _sensorEvent = __webpack_require__(18);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var MouseSensor = function (_Sensor) {
        (0, _inherits3.default)(MouseSensor, _Sensor);

        function MouseSensor() {
          var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (0, _classCallCheck3.default)(this, MouseSensor);

          var _this = (0, _possibleConstructorReturn3.default)(this, (MouseSensor.__proto__ || Object.getPrototypeOf(MouseSensor)).call(this, containers, options));

          _this.dragging = false;
          _this.mouseDown = false;
          _this.currentContainer = null;

          _this._onMouseDown = _this._onMouseDown.bind(_this);
          _this._onMouseMove = _this._onMouseMove.bind(_this);
          _this._onMouseUp = _this._onMouseUp.bind(_this);
          return _this;
        }

        (0, _createClass3.default)(MouseSensor, [{
          key: 'attach',
          value: function attach() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var container = _step.value;

                container.addEventListener('mousedown', this._onMouseDown, true);
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

            document.addEventListener('mousemove', this._onMouseMove);
            document.addEventListener('mouseup', this._onMouseUp);
          }
        }, {
          key: 'detach',
          value: function detach() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var container = _step2.value;

                container.removeEventListener('mousedown', this._onMouseDown, true);
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

            document.removeEventListener('mousemove', this._onMouseMove);
            document.removeEventListener('mouseup', this._onMouseUp);
          }
        }, {
          key: '_onMouseDown',
          value: function _onMouseDown(event) {
            var _this2 = this;

            if (event.button === 2) {
              return;
            }

            this.mouseDown = true;
            var target = document.elementFromPoint(event.clientX, event.clientY);
            var container = event.currentTarget;

            clearTimeout(this.mouseDownTimeout);
            this.mouseDownTimeout = setTimeout(function () {
              if (!_this2.mouseDown) {
                return;
              }

              var dragStartEvent = new _sensorEvent.DragStartSensorEvent({
                clientX: event.clientX,
                clientY: event.clientY,
                target: target,
                container: container,
                originalEvent: event
              });

              _this2.trigger(container, dragStartEvent);

              _this2.currentContainer = container;
              _this2.dragging = !dragStartEvent.canceled();
            }, this.options.delay);
          }
        }, {
          key: '_onMouseMove',
          value: function _onMouseMove(event) {
            if (!this.dragging) {
              return;
            }

            var target = document.elementFromPoint(event.clientX, event.clientY);

            var dragMoveEvent = new _sensorEvent.DragMoveSensorEvent({
              clientX: event.clientX,
              clientY: event.clientY,
              target: target,
              container: this.currentContainer,
              originalEvent: event
            });

            this.trigger(this.currentContainer, dragMoveEvent);
          }
        }, {
          key: '_onMouseUp',
          value: function _onMouseUp(event) {
            this.mouseDown = false;

            if (!this.dragging) {
              return;
            }

            var target = document.elementFromPoint(event.clientX, event.clientY);

            var dragStopEvent = new _sensorEvent.DragStopSensorEvent({
              clientX: event.clientX,
              clientY: event.clientY,
              target: target,
              container: this.currentContainer,
              originalEvent: event
            });

            this.trigger(this.currentContainer, dragStopEvent);

            this.currentContainer = null;
            this.dragging = false;
          }
        }]);
        return MouseSensor;
      }(_sensor2.default);

      exports.default = MouseSensor;

      /***/
    },
    /* 67 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _classCallCheck2 = __webpack_require__(0);

      var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

      var _createClass2 = __webpack_require__(1);

      var _createClass3 = _interopRequireDefault(_createClass2);

      var _possibleConstructorReturn2 = __webpack_require__(3);

      var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

      var _inherits2 = __webpack_require__(2);

      var _inherits3 = _interopRequireDefault(_inherits2);

      var _sensor = __webpack_require__(19);

      var _sensor2 = _interopRequireDefault(_sensor);

      var _utils = __webpack_require__(13);

      var _sensorEvent = __webpack_require__(18);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var TouchSensor = function (_Sensor) {
        (0, _inherits3.default)(TouchSensor, _Sensor);

        function TouchSensor() {
          var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          (0, _classCallCheck3.default)(this, TouchSensor);

          var _this = (0, _possibleConstructorReturn3.default)(this, (TouchSensor.__proto__ || Object.getPrototypeOf(TouchSensor)).call(this, containers, options));

          _this.dragging = false;
          _this.currentContainer = null;
          _this.currentScrollableParent = null;

          _this._onTouchStart = _this._onTouchStart.bind(_this);
          _this._onTouchHold = _this._onTouchHold.bind(_this);
          _this._onTouchEnd = _this._onTouchEnd.bind(_this);
          _this._onTouchMove = _this._onTouchMove.bind(_this);
          _this._onScroll = _this._onScroll.bind(_this);
          return _this;
        }

        (0, _createClass3.default)(TouchSensor, [{
          key: 'attach',
          value: function attach() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var container = _step.value;

                container.addEventListener('touchstart', this._onTouchStart, false);
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

            document.addEventListener('touchend', this._onTouchEnd, false);
            document.addEventListener('touchcancel', this._onTouchEnd, false);
            document.addEventListener('touchmove', this._onTouchMove, false);
          }
        }, {
          key: 'detach',
          value: function detach() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var container = _step2.value;

                container.removeEventListener('touchstart', this._onTouchStart, false);
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

            document.removeEventListener('touchend', this._onTouchEnd, false);
            document.removeEventListener('touchcancel', this._onTouchEnd, false);
            document.removeEventListener('touchmove', this._onTouchMove, false);
          }
        }, {
          key: '_onScroll',
          value: function _onScroll() {
            // Cancel potential drag and allow scroll on iOS or other touch devices
            clearTimeout(this.tapTimeout);
          }
        }, {
          key: '_onTouchStart',
          value: function _onTouchStart(event) {
            event.preventDefault();
            var container = event.currentTarget;

            // detect if body is scrolling on iOS
            document.addEventListener('scroll', this._onScroll);
            container.addEventListener('contextmenu', _onContextMenu);

            this.currentScrollableParent = (0, _utils.closest)(container, function (element) {
              return element.offsetHeight < element.scrollHeight;
            });

            if (this.currentScrollableParent) {
              this.currentScrollableParent.addEventListener('scroll', this._onScroll);
            }

            this.tapTimeout = setTimeout(this._onTouchHold(event, container), this.options.delay);
          }
        }, {
          key: '_onTouchHold',
          value: function _onTouchHold(event, container) {
            var _this2 = this;

            return function () {
              var touch = event.touches[0] || event.changedTouches[0];
              var target = event.target;

              var dragStartEvent = new _sensorEvent.DragStartSensorEvent({
                clientX: touch.pageX,
                clientY: touch.pageY,
                target: target,
                container: container,
                originalEvent: event
              });

              _this2.trigger(container, dragStartEvent);

              _this2.currentContainer = container;
              _this2.dragging = !dragStartEvent.canceled();
            };
          }
        }, {
          key: '_onTouchMove',
          value: function _onTouchMove(event) {
            if (!this.dragging) {
              return;
            }

            event.stopPropagation();

            var touch = event.touches[0] || event.changedTouches[0];
            var target = document.elementFromPoint(touch.pageX - window.scrollX, touch.pageY - window.scrollY);

            var dragMoveEvent = new _sensorEvent.DragMoveSensorEvent({
              clientX: touch.pageX,
              clientY: touch.pageY,
              target: target,
              container: this.currentContainer,
              originalEvent: event
            });

            this.trigger(this.currentContainer, dragMoveEvent);
          }
        }, {
          key: '_onTouchEnd',
          value: function _onTouchEnd(event) {
            var container = event.currentTarget;

            document.removeEventListener('scroll', this._onScroll);
            container.removeEventListener('contextmenu', _onContextMenu);

            if (this.currentScrollableParent) {
              this.currentScrollableParent.removeEventListener('scroll', this._onScroll);
            }

            clearTimeout(this.tapTimeout);

            if (!this.dragging) {
              return;
            }

            var touch = event.touches[0] || event.changedTouches[0];

            event.preventDefault();

            var dragStopEvent = new _sensorEvent.DragStopSensorEvent({
              clientX: touch.pageX,
              clientY: touch.pageY,
              target: null,
              container: this.currentContainer,
              originalEvent: event
            });

            this.trigger(this.currentContainer, dragStopEvent);

            this.currentContainer = null;
            this.dragging = false;
          }
        }]);
        return TouchSensor;
      }(_sensor2.default);

      exports.default = TouchSensor;

      function _onContextMenu(event) {
        event.preventDefault();
      }

      /***/
    },
    /* 68 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = { "default": __webpack_require__(73), __esModule: true };

      /***/
    },
    /* 69 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = { "default": __webpack_require__(74), __esModule: true };

      /***/
    },
    /* 70 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = { "default": __webpack_require__(75), __esModule: true };

      /***/
    },
    /* 71 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = { "default": __webpack_require__(76), __esModule: true };

      /***/
    },
    /* 72 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = { "default": __webpack_require__(77), __esModule: true };

      /***/
    },
    /* 73 */
    /***/function (module, exports, __webpack_require__) {

      __webpack_require__(98);
      var $Object = __webpack_require__(10).Object;
      module.exports = function create(P, D) {
        return $Object.create(P, D);
      };

      /***/
    },
    /* 74 */
    /***/function (module, exports, __webpack_require__) {

      __webpack_require__(99);
      var $Object = __webpack_require__(10).Object;
      module.exports = function defineProperty(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
      };

      /***/
    },
    /* 75 */
    /***/function (module, exports, __webpack_require__) {

      __webpack_require__(100);
      module.exports = __webpack_require__(10).Object.setPrototypeOf;

      /***/
    },
    /* 76 */
    /***/function (module, exports, __webpack_require__) {

      __webpack_require__(103);
      __webpack_require__(101);
      __webpack_require__(104);
      __webpack_require__(105);
      module.exports = __webpack_require__(10).Symbol;

      /***/
    },
    /* 77 */
    /***/function (module, exports, __webpack_require__) {

      __webpack_require__(102);
      __webpack_require__(106);
      module.exports = __webpack_require__(36).f('iterator');

      /***/
    },
    /* 78 */
    /***/function (module, exports) {

      module.exports = function (it) {
        if (typeof it != 'function') throw TypeError(it + ' is not a function!');
        return it;
      };

      /***/
    },
    /* 79 */
    /***/function (module, exports) {

      module.exports = function () {/* empty */};

      /***/
    },
    /* 80 */
    /***/function (module, exports, __webpack_require__) {

      // false -> Array#indexOf
      // true  -> Array#includes
      var toIObject = __webpack_require__(9),
          toLength = __webpack_require__(95),
          toIndex = __webpack_require__(94);
      module.exports = function (IS_INCLUDES) {
        return function ($this, el, fromIndex) {
          var O = toIObject($this),
              length = toLength(O.length),
              index = toIndex(fromIndex, length),
              value;
          // Array#includes uses SameValueZero equality algorithm
          if (IS_INCLUDES && el != el) while (length > index) {
            value = O[index++];
            if (value != value) return true;
            // Array#toIndex ignores holes, Array#includes - not
          } else for (; length > index; index++) {
            if (IS_INCLUDES || index in O) {
              if (O[index] === el) return IS_INCLUDES || index || 0;
            }
          }return !IS_INCLUDES && -1;
        };
      };

      /***/
    },
    /* 81 */
    /***/function (module, exports, __webpack_require__) {

      // all enumerable object keys, includes symbols
      var getKeys = __webpack_require__(21),
          gOPS = __webpack_require__(45),
          pIE = __webpack_require__(29);
      module.exports = function (it) {
        var result = getKeys(it),
            getSymbols = gOPS.f;
        if (getSymbols) {
          var symbols = getSymbols(it),
              isEnum = pIE.f,
              i = 0,
              key;
          while (symbols.length > i) {
            if (isEnum.call(it, key = symbols[i++])) result.push(key);
          }
        }return result;
      };

      /***/
    },
    /* 82 */
    /***/function (module, exports, __webpack_require__) {

      module.exports = __webpack_require__(5).document && document.documentElement;

      /***/
    },
    /* 83 */
    /***/function (module, exports, __webpack_require__) {

      // fallback for non-array-like ES3 and non-enumerable old V8 strings
      var cof = __webpack_require__(38);
      module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
        return cof(it) == 'String' ? it.split('') : Object(it);
      };

      /***/
    },
    /* 84 */
    /***/function (module, exports, __webpack_require__) {

      // 7.2.2 IsArray(argument)
      var cof = __webpack_require__(38);
      module.exports = Array.isArray || function isArray(arg) {
        return cof(arg) == 'Array';
      };

      /***/
    },
    /* 85 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var create = __webpack_require__(28),
          descriptor = __webpack_require__(22),
          setToStringTag = __webpack_require__(30),
          IteratorPrototype = {};

      // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
      __webpack_require__(11)(IteratorPrototype, __webpack_require__(12)('iterator'), function () {
        return this;
      });

      module.exports = function (Constructor, NAME, next) {
        Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
        setToStringTag(Constructor, NAME + ' Iterator');
      };

      /***/
    },
    /* 86 */
    /***/function (module, exports) {

      module.exports = function (done, value) {
        return { value: value, done: !!done };
      };

      /***/
    },
    /* 87 */
    /***/function (module, exports, __webpack_require__) {

      var getKeys = __webpack_require__(21),
          toIObject = __webpack_require__(9);
      module.exports = function (object, el) {
        var O = toIObject(object),
            keys = getKeys(O),
            length = keys.length,
            index = 0,
            key;
        while (length > index) {
          if (O[key = keys[index++]] === el) return key;
        }
      };

      /***/
    },
    /* 88 */
    /***/function (module, exports, __webpack_require__) {

      var META = __webpack_require__(23)('meta'),
          isObject = __webpack_require__(16),
          has = __webpack_require__(7),
          setDesc = __webpack_require__(8).f,
          id = 0;
      var isExtensible = Object.isExtensible || function () {
        return true;
      };
      var FREEZE = !__webpack_require__(20)(function () {
        return isExtensible(Object.preventExtensions({}));
      });
      var setMeta = function setMeta(it) {
        setDesc(it, META, { value: {
            i: 'O' + ++id, // object ID
            w: {} // weak collections IDs
          } });
      };
      var fastKey = function fastKey(it, create) {
        // return primitive with prefix
        if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof4(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
        if (!has(it, META)) {
          // can't set metadata to uncaught frozen object
          if (!isExtensible(it)) return 'F';
          // not necessary to add metadata
          if (!create) return 'E';
          // add missing metadata
          setMeta(it);
          // return object ID
        }return it[META].i;
      };
      var getWeak = function getWeak(it, create) {
        if (!has(it, META)) {
          // can't set metadata to uncaught frozen object
          if (!isExtensible(it)) return true;
          // not necessary to add metadata
          if (!create) return false;
          // add missing metadata
          setMeta(it);
          // return hash weak collections IDs
        }return it[META].w;
      };
      // add metadata on freeze-family methods calling
      var onFreeze = function onFreeze(it) {
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

      /***/
    },
    /* 89 */
    /***/function (module, exports, __webpack_require__) {

      var dP = __webpack_require__(8),
          anObject = __webpack_require__(14),
          getKeys = __webpack_require__(21);

      module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = getKeys(Properties),
            length = keys.length,
            i = 0,
            P;
        while (length > i) {
          dP.f(O, P = keys[i++], Properties[P]);
        }return O;
      };

      /***/
    },
    /* 90 */
    /***/function (module, exports, __webpack_require__) {

      // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
      var toIObject = __webpack_require__(9),
          gOPN = __webpack_require__(44).f,
          toString = {}.toString;

      var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof4(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

      var getWindowNames = function getWindowNames(it) {
        try {
          return gOPN(it);
        } catch (e) {
          return windowNames.slice();
        }
      };

      module.exports.f = function getOwnPropertyNames(it) {
        return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
      };

      /***/
    },
    /* 91 */
    /***/function (module, exports, __webpack_require__) {

      // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
      var has = __webpack_require__(7),
          toObject = __webpack_require__(96),
          IE_PROTO = __webpack_require__(31)('IE_PROTO'),
          ObjectProto = Object.prototype;

      module.exports = Object.getPrototypeOf || function (O) {
        O = toObject(O);
        if (has(O, IE_PROTO)) return O[IE_PROTO];
        if (typeof O.constructor == 'function' && O instanceof O.constructor) {
          return O.constructor.prototype;
        }return O instanceof Object ? ObjectProto : null;
      };

      /***/
    },
    /* 92 */
    /***/function (module, exports, __webpack_require__) {

      // Works with __proto__ only. Old v8 can't work with null proto objects.
      /* eslint-disable no-proto */
      var isObject = __webpack_require__(16),
          anObject = __webpack_require__(14);
      var check = function check(O, proto) {
        anObject(O);
        if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
      };
      module.exports = {
        set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
        function (test, buggy, set) {
          try {
            set = __webpack_require__(39)(Function.call, __webpack_require__(43).f(Object.prototype, '__proto__').set, 2);
            set(test, []);
            buggy = !(test instanceof Array);
          } catch (e) {
            buggy = true;
          }
          return function setPrototypeOf(O, proto) {
            check(O, proto);
            if (buggy) O.__proto__ = proto;else set(O, proto);
            return O;
          };
        }({}, false) : undefined),
        check: check
      };

      /***/
    },
    /* 93 */
    /***/function (module, exports, __webpack_require__) {

      var toInteger = __webpack_require__(33),
          defined = __webpack_require__(24);
      // true  -> String#at
      // false -> String#codePointAt
      module.exports = function (TO_STRING) {
        return function (that, pos) {
          var s = String(defined(that)),
              i = toInteger(pos),
              l = s.length,
              a,
              b;
          if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
          a = s.charCodeAt(i);
          return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
        };
      };

      /***/
    },
    /* 94 */
    /***/function (module, exports, __webpack_require__) {

      var toInteger = __webpack_require__(33),
          max = Math.max,
          min = Math.min;
      module.exports = function (index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
      };

      /***/
    },
    /* 95 */
    /***/function (module, exports, __webpack_require__) {

      // 7.1.15 ToLength
      var toInteger = __webpack_require__(33),
          min = Math.min;
      module.exports = function (it) {
        return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
      };

      /***/
    },
    /* 96 */
    /***/function (module, exports, __webpack_require__) {

      // 7.1.13 ToObject(argument)
      var defined = __webpack_require__(24);
      module.exports = function (it) {
        return Object(defined(it));
      };

      /***/
    },
    /* 97 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var addToUnscopables = __webpack_require__(79),
          step = __webpack_require__(86),
          Iterators = __webpack_require__(26),
          toIObject = __webpack_require__(9);

      // 22.1.3.4 Array.prototype.entries()
      // 22.1.3.13 Array.prototype.keys()
      // 22.1.3.29 Array.prototype.values()
      // 22.1.3.30 Array.prototype[@@iterator]()
      module.exports = __webpack_require__(42)(Array, 'Array', function (iterated, kind) {
        this._t = toIObject(iterated); // target
        this._i = 0; // next index
        this._k = kind; // kind
        // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
      }, function () {
        var O = this._t,
            kind = this._k,
            index = this._i++;
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

      /***/
    },
    /* 98 */
    /***/function (module, exports, __webpack_require__) {

      var $export = __webpack_require__(15);
      // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
      $export($export.S, 'Object', { create: __webpack_require__(28) });

      /***/
    },
    /* 99 */
    /***/function (module, exports, __webpack_require__) {

      var $export = __webpack_require__(15);
      // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
      $export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(8).f });

      /***/
    },
    /* 100 */
    /***/function (module, exports, __webpack_require__) {

      // 19.1.3.19 Object.setPrototypeOf(O, proto)
      var $export = __webpack_require__(15);
      $export($export.S, 'Object', { setPrototypeOf: __webpack_require__(92).set });

      /***/
    },
    /* 101 */
    /***/function (module, exports) {

      /***/},
    /* 102 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var $at = __webpack_require__(93)(true);

      // 21.1.3.27 String.prototype[@@iterator]()
      __webpack_require__(42)(String, 'String', function (iterated) {
        this._t = String(iterated); // target
        this._i = 0; // next index
        // 21.1.5.2.1 %StringIteratorPrototype%.next()
      }, function () {
        var O = this._t,
            index = this._i,
            point;
        if (index >= O.length) return { value: undefined, done: true };
        point = $at(O, index);
        this._i += point.length;
        return { value: point, done: false };
      });

      /***/
    },
    /* 103 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      // ECMAScript 6 symbols shim

      var global = __webpack_require__(5),
          has = __webpack_require__(7),
          DESCRIPTORS = __webpack_require__(6),
          $export = __webpack_require__(15),
          redefine = __webpack_require__(47),
          META = __webpack_require__(88).KEY,
          $fails = __webpack_require__(20),
          shared = __webpack_require__(32),
          setToStringTag = __webpack_require__(30),
          uid = __webpack_require__(23),
          wks = __webpack_require__(12),
          wksExt = __webpack_require__(36),
          wksDefine = __webpack_require__(35),
          keyOf = __webpack_require__(87),
          enumKeys = __webpack_require__(81),
          isArray = __webpack_require__(84),
          anObject = __webpack_require__(14),
          toIObject = __webpack_require__(9),
          toPrimitive = __webpack_require__(34),
          createDesc = __webpack_require__(22),
          _create = __webpack_require__(28),
          gOPNExt = __webpack_require__(90),
          $GOPD = __webpack_require__(43),
          $DP = __webpack_require__(8),
          $keys = __webpack_require__(21),
          gOPD = $GOPD.f,
          dP = $DP.f,
          gOPN = gOPNExt.f,
          $Symbol = global.Symbol,
          $JSON = global.JSON,
          _stringify = $JSON && $JSON.stringify,
          PROTOTYPE = 'prototype',
          HIDDEN = wks('_hidden'),
          TO_PRIMITIVE = wks('toPrimitive'),
          isEnum = {}.propertyIsEnumerable,
          SymbolRegistry = shared('symbol-registry'),
          AllSymbols = shared('symbols'),
          OPSymbols = shared('op-symbols'),
          ObjectProto = Object[PROTOTYPE],
          USE_NATIVE = typeof $Symbol == 'function',
          QObject = global.QObject;
      // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
      var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

      // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
      var setSymbolDesc = DESCRIPTORS && $fails(function () {
        return _create(dP({}, 'a', {
          get: function get() {
            return dP(this, 'a', { value: 7 }).a;
          }
        })).a != 7;
      }) ? function (it, key, D) {
        var protoDesc = gOPD(ObjectProto, key);
        if (protoDesc) delete ObjectProto[key];
        dP(it, key, D);
        if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
      } : dP;

      var wrap = function wrap(tag) {
        var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
        sym._k = tag;
        return sym;
      };

      var isSymbol = USE_NATIVE && _typeof4($Symbol.iterator) == 'symbol' ? function (it) {
        return (typeof it === 'undefined' ? 'undefined' : _typeof4(it)) == 'symbol';
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
          }return setSymbolDesc(it, key, D);
        }return dP(it, key, D);
      };
      var $defineProperties = function defineProperties(it, P) {
        anObject(it);
        var keys = enumKeys(P = toIObject(P)),
            i = 0,
            l = keys.length,
            key;
        while (l > i) {
          $defineProperty(it, key = keys[i++], P[key]);
        }return it;
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
        var names = gOPN(toIObject(it)),
            result = [],
            i = 0,
            key;
        while (names.length > i) {
          if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
        }return result;
      };
      var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
        var IS_OP = it === ObjectProto,
            names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
            result = [],
            i = 0,
            key;
        while (names.length > i) {
          if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
        }return result;
      };

      // 19.4.1.1 Symbol([description])
      if (!USE_NATIVE) {
        $Symbol = function _Symbol2() {
          if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
          var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
          var $set = function $set(value) {
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
        __webpack_require__(44).f = gOPNExt.f = $getOwnPropertyNames;
        __webpack_require__(29).f = $propertyIsEnumerable;
        __webpack_require__(45).f = $getOwnPropertySymbols;

        if (DESCRIPTORS && !__webpack_require__(27)) {
          redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
        }

        wksExt.f = function (name) {
          return wrap(wks(name));
        };
      }

      $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

      for (var symbols =
      // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
      'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
        wks(symbols[i++]);
      }for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
        wksDefine(symbols[i++]);
      }$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
        // 19.4.2.1 Symbol.for(key)
        'for': function _for(key) {
          return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
        },
        // 19.4.2.5 Symbol.keyFor(sym)
        keyFor: function keyFor(key) {
          if (isSymbol(key)) return keyOf(SymbolRegistry, key);
          throw TypeError(key + ' is not a symbol!');
        },
        useSetter: function useSetter() {
          setter = true;
        },
        useSimple: function useSimple() {
          setter = false;
        }
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
          if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
          var args = [it],
              i = 1,
              replacer,
              $replacer;
          while (arguments.length > i) {
            args.push(arguments[i++]);
          }replacer = args[1];
          if (typeof replacer == 'function') $replacer = replacer;
          if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
            if ($replacer) value = $replacer.call(this, key, value);
            if (!isSymbol(value)) return value;
          };
          args[1] = replacer;
          return _stringify.apply($JSON, args);
        }
      });

      // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
      $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
      // 19.4.3.5 Symbol.prototype[@@toStringTag]
      setToStringTag($Symbol, 'Symbol');
      // 20.2.1.9 Math[@@toStringTag]
      setToStringTag(Math, 'Math', true);
      // 24.3.3 JSON[@@toStringTag]
      setToStringTag(global.JSON, 'JSON', true);

      /***/
    },
    /* 104 */
    /***/function (module, exports, __webpack_require__) {

      __webpack_require__(35)('asyncIterator');

      /***/
    },
    /* 105 */
    /***/function (module, exports, __webpack_require__) {

      __webpack_require__(35)('observable');

      /***/
    },
    /* 106 */
    /***/function (module, exports, __webpack_require__) {

      __webpack_require__(97);
      var global = __webpack_require__(5),
          hide = __webpack_require__(11),
          Iterators = __webpack_require__(26),
          TO_STRING_TAG = __webpack_require__(12)('toStringTag');

      for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
        var NAME = collections[i],
            Collection = global[NAME],
            proto = Collection && Collection.prototype;
        if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = Iterators.Array;
      }

      /***/
    }]
    /******/)
  );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGEwMDcxZWYzNGQwMzFiODlhYmIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kcmFnZ2FibGUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsiJCIsImFqYXhTZXR1cCIsImhlYWRlcnMiLCJhdHRyIiwiYXBwZW5kIiwic29ydFRhYmxlIiwidGFibGUiLCJjb2wiLCJyZXZlcnNlIiwidGIiLCJ0Qm9kaWVzIiwidHIiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInJvd3MiLCJpIiwic29ydCIsImEiLCJiIiwiY2VsbHMiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJsb2NhbGVDb21wYXJlIiwibGVuZ3RoIiwiYXBwZW5kQ2hpbGQiLCJtYWtlU29ydGFibGUiLCJ0aCIsInRIZWFkIiwiZGlyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1ha2VBbGxTb3J0YWJsZSIsInBhcmVudCIsImRvY3VtZW50IiwiYm9keSIsInQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFjY2VwdFN0dWRlbnQiLCJzdHVkZW50X2lkIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRhdGEiLCJzdWNjZXNzIiwicmVqZWN0U3R1ZGVudCIsInByb2plY3RfaWQiLCJvbiIsImUiLCJoaWRlIiwiYWRkQ2xhc3MiLCJwcmVwZW5kIiwiQWpheEZ1bmN0aW9ucyIsImRlbGV0ZVByb2plY3QiLCJ2YWwiLCJNb2JpbGVNZW51IiwiZWxlbWVudCIsIndpbmRvdyIsImFjdGl2YXRvciIsIlNlbGVjdG9yc18iLCJIQU1CVVJHRVJfQ09OVEFJTkVSIiwidW5kZXJsYXkiLCJVTkRFUkxBWSIsImluaXQiLCJDc3NDbGFzc2VzXyIsIlZJU0lCTEUiLCJNT0JJTEVfTUVOVSIsIm9wZW5NZW51IiwiY2xvc2VNZW51IiwicmVtb3ZlQ2xhc3MiLCJtb2JpbGVNZW51IiwiYmluZCIsImluaXRBbGwiLCJlYWNoIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImhlYWRlciIsImZpbmQiLCJESUFMT0dfSEVBREVSIiwiY29udGVudCIsIkRJQUxPR19DT05URU5UIiwiYmVmb3JlIiwiSHRtbFNuaXBwZXRzXyIsIkxPQURFUiIsImxvYWRlciIsImlzQ2xvc2FibGUiLCJhY3RpdmF0b3JCdXR0b25zIiwiQUNUSVZFIiwiRElBTE9HIiwic2hvd0xvYWRlciIsInNob3ciLCJoaWRlTG9hZGVyIiwic2hvd0RpYWxvZyIsImhpZGVEaWFsb2ciLCJkaWFsb2ciLCJwdXNoIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwiRGF0YVRhYmxlIiwiYm9keVJvd3MiLCJmb290Um93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImVxIiwiY3NzIiwiUHJvamVjdFRvcGljcyIsIkFERF9UT1BJQ19JTlBVVCIsIk5FV19UT1BJQ19JTlBVVF9DT05UQUlORVIiLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInByb2plY3RUb3BpY3MiLCJhZGRUb3BpY1RvUHJvamVjdCIsInByb2plY3RJZCIsInRvcGljTmFtZSIsImFqYXhVcmwiLCJ0eXBlIiwidG9waWNfbmFtZSIsIkpTT04iLCJwYXJzZSIsImFmdGVyIiwiZG9uZSIsInJlbW92ZVRvcGljRnJvbVByb2plY3QiLCJ0b3BpY0lkIiwidG9waWNfaWQiLCJvYmoiLCJyZW1vdmUiLCJ1cGRhdGVQcm9qZWN0UHJpbWFyeVRvcGljIiwic3dhcHBhYmxlIiwicXVlcnlTZWxlY3RvckFsbCIsImRyYWdnYWJsZSIsIm9yaWdpbmFsUHJpbWFyeVRvcGljSWQiLCJrZXlwcmVzcyIsIndoaWNoIiwiZm9jdXMiLCJTRUFSQ0hfSU5QVVQiLCJTRUFSQ0hfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0JVVFRPTiIsIkxPR19JTl9ESUFMT0ciLCJDSEFOR0VfQVVUSF9ESUFMT0ciLCJwcm9qZWN0TmFtZSIsImNvbmZpcm0iLCJsb2NhdGlvbiIsImhyZWYiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiaW5kZXgiLCJjbGFzc05hbWUiLCJtYXRjaCIsImpvaW4iLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJoYXNDbGFzcyIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwicmVzcG9uc2UiLCJodG1sIiwiY29udGV4dCIsImRlbGV0ZVRvcGljIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwicHJldmVudERlZmF1bHQiLCJzZXJpYWxpemUiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwic3RhdHVzIiwicGFyZW50cyIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJhbGVydCIsIk1hcmtlciIsInNlbGVjdGVkU3R1ZGVudCIsInNlbGVjdGVkU3VwZXJ2aXNvciIsInN0dWRlbnRUYWJsZSIsInN0dWRlbnREYXRhVGFibGUiLCJzdXBlcnZpc29yVGFibGUiLCJzdXBlcnZpc29yRGF0YVRhYmxlIiwibWFya2VyIiwic2VsZWN0U3R1ZGVudCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdHVkZW50Um93RE9NIiwidW5zZWxlY3RBbGwiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0IiwibWFya2VySWQiLCJtYXJrZXJfaWQiLCJ3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsIm1vZHVsZXMiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwibCIsIm0iLCJjIiwidmFsdWUiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJuIiwiX19lc01vZHVsZSIsImdldERlZmF1bHQiLCJnZXRNb2R1bGVFeHBvcnRzIiwib2JqZWN0IiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiZGVmYXVsdCIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJUeXBlRXJyb3IiLCJfZGVmaW5lUHJvcGVydHkiLCJfZGVmaW5lUHJvcGVydHkyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsImRlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJ3cml0YWJsZSIsImtleSIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl9zZXRQcm90b3R5cGVPZiIsIl9zZXRQcm90b3R5cGVPZjIiLCJfY3JlYXRlIiwiX2NyZWF0ZTIiLCJfdHlwZW9mMiIsIl90eXBlb2YzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiY29uc3RydWN0b3IiLCJfX3Byb3RvX18iLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJfY2xhc3NDYWxsQ2hlY2syIiwiX2NsYXNzQ2FsbENoZWNrMyIsIl9jcmVhdGVDbGFzczIiLCJfY3JlYXRlQ2xhc3MzIiwiQWJzdHJhY3RFdmVudCIsIl9jYW5jZWxlZCIsImNhbmNlbCIsImNhbmNlbGVkIiwiQm9vbGVhbiIsImNhbmNlbGFibGUiLCJnbG9iYWwiLCJNYXRoIiwiRnVuY3Rpb24iLCJfX2ciLCJpdCIsImFuT2JqZWN0IiwiSUU4X0RPTV9ERUZJTkUiLCJ0b1ByaW1pdGl2ZSIsImRQIiwiZiIsIk8iLCJQIiwiQXR0cmlidXRlcyIsIklPYmplY3QiLCJkZWZpbmVkIiwiY29yZSIsInZlcnNpb24iLCJfX2UiLCJjcmVhdGVEZXNjIiwic3RvcmUiLCJ1aWQiLCJTeW1ib2wiLCJVU0VfU1lNQk9MIiwiJGV4cG9ydHMiLCJjbG9zZXN0Iiwic2Nyb2xsIiwic2VsZWN0b3IiLCJjb25kaXRpb25GbiIsImN1cnJlbnRFbGVtZW50IiwibWF0Y2hGdW5jdGlvbiIsIkVsZW1lbnQiLCJtYXRjaGVzIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJjdXJyZW50IiwiY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQiLCJjb3JyZXNwb25kaW5nRWxlbWVudCIsInBhcmVudE5vZGUiLCJzY3JvbGxBbmltYXRpb25GcmFtZSIsIl9yZWYiLCJjbGllbnRYIiwiY2xpZW50WSIsInNwZWVkIiwic2Vuc2l0aXZpdHkiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInNjcm9sbEZuIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIm9mZnNldFkiLCJhYnMiLCJib3R0b20iLCJ0b3AiLCJvZmZzZXRYIiwicmlnaHQiLCJsZWZ0Iiwic2Nyb2xsVG9wIiwic2Nyb2xsTGVmdCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImlzT2JqZWN0IiwiY3R4IiwiUFJPVE9UWVBFIiwiJGV4cG9ydCIsInNvdXJjZSIsIklTX0ZPUkNFRCIsIkYiLCJJU19HTE9CQUwiLCJHIiwiSVNfU1RBVElDIiwiUyIsIklTX1BST1RPIiwiSVNfQklORCIsIkIiLCJJU19XUkFQIiwiVyIsImV4cFByb3RvIiwib3duIiwib3V0IiwidW5kZWZpbmVkIiwiQyIsImFyZ3VtZW50cyIsImFwcGx5IiwidmlydHVhbCIsIlIiLCJVIiwiX3V0aWxzIiwiX2FjY2Vzc2liaWxpdHkiLCJfYWNjZXNzaWJpbGl0eTIiLCJfbWlycm9yIiwiX21pcnJvcjIiLCJfY29sbGlkYWJsZSIsIl9jb2xsaWRhYmxlMiIsIl9zbmFwcGFibGUiLCJfc25hcHBhYmxlMiIsIl9kcmFnU2Vuc29yIiwiX2RyYWdTZW5zb3IyIiwiX21vdXNlU2Vuc29yIiwiX21vdXNlU2Vuc29yMiIsIl90b3VjaFNlbnNvciIsIl90b3VjaFNlbnNvcjIiLCJfZm9yY2VUb3VjaFNlbnNvciIsIl9mb3JjZVRvdWNoU2Vuc29yMiIsIl9kcmFnZ2FibGVFdmVudCIsIl9kcmFnRXZlbnQiLCJfbWlycm9yRXZlbnQiLCJkZWZhdWx0cyIsImhhbmRsZSIsImRlbGF5IiwicGxhY2VkVGltZW91dCIsIm5hdGl2ZSIsInBsdWdpbnMiLCJjbGFzc2VzIiwibWlycm9yIiwiRHJhZ2dhYmxlIiwiQWNjZXNzaWJpbGl0eSIsIk1pcnJvciIsIkNvbGxpZGFibGUiLCJTbmFwcGFibGUiLCJjb250YWluZXJzIiwib3B0aW9ucyIsImFzc2lnbiIsImFjdGl2ZVNlbnNvcnMiLCJhY3RpdmVQbHVnaW5zIiwiY2FsbGJhY2tzIiwiZHJhZ2dpbmciLCJkcmFnU3RhcnQiLCJkcmFnTW92ZSIsImRyYWdTdG9wIiwiZHJhZ1ByZXNzdXJlIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiIsIl9kaWRJdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3IiLCJpdGVyYXRvciIsIl9zdGVwIiwibmV4dCIsInJldHVybiIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIlBsdWdpbiIsInBsdWdpbiIsImF0dGFjaCIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zIiwiX2RpZEl0ZXJhdG9yRXJyb3IzIiwiX2l0ZXJhdG9yRXJyb3IzIiwiX2l0ZXJhdG9yMyIsInNlbnNvcnMiLCJfc3RlcDMiLCJTZW5zb3IiLCJzZW5zb3IiLCJkcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50IiwiRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCIsInRyaWdnZXJFdmVudCIsImRlc3Ryb3kiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCIsIl9kaWRJdGVyYXRvckVycm9yNCIsIl9pdGVyYXRvckVycm9yNCIsIl9pdGVyYXRvcjQiLCJfc3RlcDQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZHJhZ2dhYmxlRGVzdHJveUV2ZW50IiwiRHJhZ2dhYmxlRGVzdHJveUV2ZW50IiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUiLCJfZGlkSXRlcmF0b3JFcnJvcjUiLCJfaXRlcmF0b3JFcnJvcjUiLCJfaXRlcmF0b3I1IiwiX3N0ZXA1IiwiYWN0aXZlUGx1Z2luIiwiZGV0YWNoIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYiLCJfZGlkSXRlcmF0b3JFcnJvcjYiLCJfaXRlcmF0b3JFcnJvcjYiLCJfaXRlcmF0b3I2IiwiX3N0ZXA2IiwiYWN0aXZlU2Vuc29yIiwiY2FsbGJhY2siLCJvZmYiLCJjb3B5Iiwic3BsaWNlIiwidHJpZ2dlciIsIl9sZW4iLCJhcmdzIiwiX2tleSIsImV2ZW50Iiwic2Vuc29yRXZlbnQiLCJnZXRTZW5zb3JFdmVudCIsIm9yaWdpbmFsRXZlbnQiLCJzb3VyY2VDb250YWluZXIiLCJpc0RyYWdFdmVudCIsImFwcGVuZGFibGVDb250YWluZXIiLCJnZXRBcHBlbmRhYmxlQ29udGFpbmVyIiwiY2xvbmVOb2RlIiwibWlycm9yQ3JlYXRlZEV2ZW50IiwiTWlycm9yQ3JlYXRlZEV2ZW50IiwibWlycm9yQXR0YWNoZWRFdmVudCIsIk1pcnJvckF0dGFjaGVkRXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJnZXRDbGFzc05hbWVGb3IiLCJtaXJyb3JNb3ZlRXZlbnQiLCJNaXJyb3JNb3ZlRXZlbnQiLCJzY3JvbGxhYmxlUGFyZW50Iiwib2Zmc2V0SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiZHJhZ0V2ZW50IiwiRHJhZ1N0YXJ0RXZlbnQiLCJyZW1vdmVDaGlsZCIsImRyYWdNb3ZlRXZlbnQiLCJEcmFnTW92ZUV2ZW50Iiwib3ZlckNvbnRhaW5lciIsImNsb3Nlc3RDb250YWluZXIiLCJpc0xlYXZpbmdDb250YWluZXIiLCJjdXJyZW50T3ZlckNvbnRhaW5lciIsImlzTGVhdmluZ0RyYWdnYWJsZSIsImN1cnJlbnRPdmVyIiwiaXNPdmVyQ29udGFpbmVyIiwiaXNPdmVyRHJhZ2dhYmxlIiwiZHJhZ091dEV2ZW50IiwiRHJhZ091dEV2ZW50Iiwib3ZlciIsImRyYWdPdXRDb250YWluZXJFdmVudCIsIkRyYWdPdXRDb250YWluZXJFdmVudCIsImRyYWdPdmVyQ29udGFpbmVyRXZlbnQiLCJEcmFnT3ZlckNvbnRhaW5lckV2ZW50IiwiZHJhZ092ZXJFdmVudCIsIkRyYWdPdmVyRXZlbnQiLCJfdGhpcyIsImRyYWdTdG9wRXZlbnQiLCJEcmFnU3RvcEV2ZW50IiwibWlycm9yRGVzdHJveUV2ZW50IiwiTWlycm9yRGVzdHJveUV2ZW50IiwibGFzdFNvdXJjZSIsImxhc3RTb3VyY2VDb250YWluZXIiLCJzZXRUaW1lb3V0IiwiZHJhZ1ByZXNzdXJlRXZlbnQiLCJEcmFnUHJlc3N1cmVFdmVudCIsInByZXNzdXJlIiwiYXBwZW5kVG8iLCJxdWVyeVNlbGVjdG9yIiwiSFRNTEVsZW1lbnQiLCJfdGhpczIiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNyIsIl9kaWRJdGVyYXRvckVycm9yNyIsIl9pdGVyYXRvckVycm9yNyIsIl9pdGVyYXRvcjciLCJfc3RlcDciLCJjb250YWluZXJFbCIsImRldGFpbCIsInRlc3QiLCJEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCIsIkRyYWdTdG9wU2Vuc29yRXZlbnQiLCJEcmFnTW92ZVNlbnNvckV2ZW50IiwiRHJhZ1N0YXJ0U2Vuc29yRXZlbnQiLCJTZW5zb3JFdmVudCIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyIsIl9pbmhlcml0czIiLCJfaW5oZXJpdHMzIiwiX2Fic3RyYWN0RXZlbnQiLCJfYWJzdHJhY3RFdmVudDIiLCJfQWJzdHJhY3RFdmVudCIsImdldFByb3RvdHlwZU9mIiwiX1NlbnNvckV2ZW50IiwiX1NlbnNvckV2ZW50MiIsIl9TZW5zb3JFdmVudDMiLCJfU2Vuc29yRXZlbnQ0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwibGFzdEV2ZW50IiwiZXhlYyIsIiRrZXlzIiwiZW51bUJ1Z0tleXMiLCJrZXlzIiwiYml0bWFwIiwiaWQiLCJweCIsInJhbmRvbSIsImNvbmNhdCIsInRvU3RyaW5nIiwic3BsaXQiLCJkUHMiLCJJRV9QUk9UTyIsIkVtcHR5IiwiY3JlYXRlRGljdCIsImlmcmFtZSIsImx0IiwiZ3QiLCJpZnJhbWVEb2N1bWVudCIsInN0eWxlIiwiZGlzcGxheSIsInNyYyIsImNvbnRlbnRXaW5kb3ciLCJvcGVuIiwid3JpdGUiLCJjbG9zZSIsImNyZWF0ZSIsIlByb3BlcnRpZXMiLCJyZXN1bHQiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImRlZiIsImhhcyIsIlRBRyIsInRhZyIsInN0YXQiLCJzaGFyZWQiLCJTSEFSRUQiLCJjZWlsIiwiZmxvb3IiLCJpc05hTiIsImZuIiwidmFsdWVPZiIsIkxJQlJBUlkiLCJ3a3NFeHQiLCIkU3ltYm9sIiwiY2hhckF0IiwiX3N5bWJvbCIsIl9zeW1ib2wyIiwiX3R5cGVvZiIsImFGdW5jdGlvbiIsInRoYXQiLCJjcmVhdGVFbGVtZW50IiwicmVkZWZpbmUiLCJJdGVyYXRvcnMiLCIkaXRlckNyZWF0ZSIsInNldFRvU3RyaW5nVGFnIiwiSVRFUkFUT1IiLCJCVUdHWSIsIkZGX0lURVJBVE9SIiwiS0VZUyIsIlZBTFVFUyIsInJldHVyblRoaXMiLCJCYXNlIiwiTkFNRSIsIkRFRkFVTFQiLCJJU19TRVQiLCJGT1JDRUQiLCJnZXRNZXRob2QiLCJraW5kIiwicHJvdG8iLCJ2YWx1ZXMiLCJlbnRyaWVzIiwiREVGX1ZBTFVFUyIsIlZBTFVFU19CVUciLCIkbmF0aXZlIiwiJGRlZmF1bHQiLCIkZW50cmllcyIsIiRhbnlOYXRpdmUiLCJtZXRob2RzIiwiSXRlcmF0b3JQcm90b3R5cGUiLCJwSUUiLCJ0b0lPYmplY3QiLCJnT1BEIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiaGlkZGVuS2V5cyIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJhcnJheUluZGV4T2YiLCJuYW1lcyIsIl9kcmFnZ2FibGUiLCJfZHJhZ2dhYmxlMiIsIl9kcm9wcGFibGVFdmVudCIsIkRyb3BwYWJsZSIsIl9vbkRyYWdTdGFydCIsIl9vbkRyYWdNb3ZlIiwiX29uRHJhZ1N0b3AiLCJkcm9wcGFibGVzIiwiX2dldERyb3BwYWJsZXMiLCJkcm9wcGFibGUiLCJpbml0aWFsRHJvcHBhYmxlIiwiZHJvcHBhYmxlRWxlbWVudCIsImNvbnRhaW5zIiwiX2Nsb3Nlc3REcm9wcGFibGUiLCJvdmVyRW1wdHlEcm9wcGFibGUiLCJfZHJvcCIsImxhc3REcm9wcGFibGUiLCJfcmVsZWFzZSIsIm9jY3VwaWVkQ2xhc3MiLCJkcm9wcGFibGVPdmVyRXZlbnQiLCJEcm9wcGFibGVPdmVyRXZlbnQiLCJkcm9wcGFibGVPdXRFdmVudCIsIkRyb3BwYWJsZU91dEV2ZW50IiwiZnJvbSIsImluY2x1ZGVzIiwiTm9kZUxpc3QiLCJfc29ydGFibGVFdmVudCIsIlNvcnRhYmxlIiwiX29uRHJhZ092ZXJDb250YWluZXIiLCJfb25EcmFnT3ZlciIsInN0YXJ0SW5kZXgiLCJzb3J0YWJsZVN0YXJ0RXZlbnQiLCJTb3J0YWJsZVN0YXJ0RXZlbnQiLCJtb3ZlcyIsIm1vdmUiLCJzb3J0YWJsZVNvcnRlZEV2ZW50IiwiU29ydGFibGVTb3J0ZWRFdmVudCIsInNvcnRhYmxlU3RvcEV2ZW50IiwiU29ydGFibGVTdG9wRXZlbnQiLCJvbGRJbmRleCIsIm5ld0luZGV4Iiwib2Zmc2V0IiwiaW5kZXhPZiIsImNoaWxkcmVuIiwiZW1wdHlPdmVyQ29udGFpbmVyIiwiZGlmZmVyZW50Q29udGFpbmVyIiwic2FtZUNvbnRhaW5lciIsIm1vdmVJbnNpZGVFbXB0eUNvbnRhaW5lciIsIm1vdmVXaXRoaW5Db250YWluZXIiLCJtb3ZlT3V0c2lkZUNvbnRhaW5lciIsIm9sZENvbnRhaW5lciIsIm5ld0NvbnRhaW5lciIsImluc2VydEJlZm9yZSIsIm5leHRFbGVtZW50U2libGluZyIsIl9zd2FwcGFibGVFdmVudCIsIlN3YXBwYWJsZSIsInN3YXBwYWJsZVN0YXJ0RXZlbnQiLCJTd2FwcGFibGVTdGFydEV2ZW50IiwibGFzdE92ZXIiLCJzd2FwIiwic3dhcHBhYmxlU3dhcHBlZEV2ZW50IiwiU3dhcHBhYmxlU3dhcHBlZEV2ZW50Iiwic3dhcHBlZEVsZW1lbnQiLCJzd2FwcGFibGVTdG9wRXZlbnQiLCJTd2FwcGFibGVTdG9wRXZlbnQiLCJ3aXRoVGVtcEVsZW1lbnQiLCJ0bXBFbGVtZW50Iiwib3ZlclBhcmVudCIsInNvdXJjZVBhcmVudCIsIl9jb2xsaWRhYmxlRXZlbnQiLCJfb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjdXJyZW50QW5pbWF0aW9uRnJhbWUiLCJjdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50IiwiY29sbGlkYWJsZUluRXZlbnQiLCJDb2xsaWRhYmxlSW5FdmVudCIsImNvbGxpZGluZ0VsZW1lbnQiLCJjb2xsaWRhYmxlT3V0RXZlbnQiLCJDb2xsaWRhYmxlT3V0RXZlbnQiLCJsYXN0Q29sbGlkaW5nRWxlbWVudCIsImVudGVyaW5nQ29sbGlkYWJsZSIsImxlYXZpbmdDb2xsaWRhYmxlIiwiY29sbGlkYWJsZXMiLCJfZ2V0Q29sbGlkYWJsZXMiLCJfc25hcHBhYmxlRXZlbnQiLCJfb25EcmFnT3V0IiwiZmlyc3RTb3VyY2UiLCJzbmFwSW5FdmVudCIsIlNuYXBJbkV2ZW50Iiwic25hcE91dEV2ZW50IiwiU25hcE91dEV2ZW50IiwiQVJJQV9HUkFCQkVEIiwiQVJJQV9EUk9QRUZGRUNUIiwiVEFCSU5ERVgiLCJfb25Jbml0IiwiX29uRGVzdHJveSIsInNldEF0dHJpYnV0ZSIsIl9yZWYyIiwicmVtb3ZlQXR0cmlidXRlIiwiX3JlZjMiLCJfcmVmNCIsIl9vbk1pcnJvckNyZWF0ZWQiLCJfb25NaXJyb3JNb3ZlIiwib25NaXJyb3JDcmVhdGVkIiwibWlycm9yQ2xhc3MiLCJzZXRTdGF0ZSIsIm1pcnJvck9mZnNldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImNvbXB1dGVNaXJyb3JEaW1lbnNpb25zIiwiY2FsY3VsYXRlTWlycm9yT2Zmc2V0IiwiYWRkTWlycm9yQ2xhc3NlcyIsInBvc2l0aW9uTWlycm9yIiwicmVtb3ZlTWlycm9ySUQiLCJjYXRjaCIsInJhZiIsInJlc2V0TWlycm9yIiwid2l0aFByb21pc2UiLCJwb3NpdGlvbiIsInBvaW50ZXJFdmVudHMiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwic291cmNlUmVjdCIsIl9yZWY0JHdpdGhGcmFtZSIsIndpdGhGcmFtZSIsIngiLCJ5IiwidHJhbnNmb3JtIiwiZnJhbWUiLCJfcmVmNSIsIl9yZWY1JHJhZiIsInJlamVjdCIsIkNvbGxpZGFibGVFdmVudCIsIl9Db2xsaWRhYmxlRXZlbnQiLCJfQ29sbGlkYWJsZUV2ZW50MiIsIkRyYWdFdmVudCIsImhhc01pcnJvciIsIl9EcmFnRXZlbnQiLCJfRHJhZ0V2ZW50MiIsIl9EcmFnRXZlbnQzIiwiX0RyYWdFdmVudDQiLCJfRHJhZ0V2ZW50NSIsIl9EcmFnRXZlbnQ2IiwiX0RyYWdFdmVudDciLCJfRHJhZ0V2ZW50OCIsIkRyYWdnYWJsZUV2ZW50IiwiX0RyYWdnYWJsZUV2ZW50IiwiX0RyYWdnYWJsZUV2ZW50MiIsIkRyb3BwYWJsZUV2ZW50IiwiX0Ryb3BwYWJsZUV2ZW50IiwiX0Ryb3BwYWJsZUV2ZW50MiIsIk1pcnJvckV2ZW50IiwiX01pcnJvckV2ZW50IiwiX01pcnJvckV2ZW50MiIsIl9NaXJyb3JFdmVudDMiLCJfTWlycm9yRXZlbnQ0IiwiU25hcEV2ZW50IiwiX1NuYXBFdmVudCIsIl9TbmFwRXZlbnQyIiwiU29ydGFibGVFdmVudCIsIl9Tb3J0YWJsZUV2ZW50IiwiX1NvcnRhYmxlRXZlbnQyIiwiX1NvcnRhYmxlRXZlbnQzIiwiU3dhcHBhYmxlRXZlbnQiLCJfU3dhcHBhYmxlRXZlbnQiLCJfU3dhcHBhYmxlRXZlbnQyIiwiX1N3YXBwYWJsZUV2ZW50MyIsImNyZWF0ZUV2ZW50Q2xhc3MiLCJfc29ydGFibGUiLCJfc29ydGFibGUyIiwiX3N3YXBwYWJsZSIsIl9zd2FwcGFibGUyIiwiX2Ryb3BwYWJsZSIsIl9kcm9wcGFibGUyIiwiRXZlbnRDb25zdHJ1Y3RvciIsIl9zZW5zb3IiLCJfc2Vuc29yMiIsIl9zZW5zb3JFdmVudCIsIkRyYWdTZW5zb3IiLCJfU2Vuc29yIiwiY3VycmVudENvbnRhaW5lciIsIl9vbk1vdXNlRG93biIsIl9vbk1vdXNlVXAiLCJfb25EcmFnRW5kIiwiX29uRHJhZ0Ryb3AiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZWZmZWN0QWxsb3dlZCIsImVsZW1lbnRGcm9tUG9pbnQiLCJjdXJyZW50VGFyZ2V0IiwiZHJhZ1N0YXJ0RXZlbnQiLCJmb3JtIiwiY29udGVudGVkaXRhYmxlIiwiY2xlYXJUaW1lb3V0IiwibW91c2VEb3duVGltZW91dCIsIkZvcmNlVG91Y2hTZW5zb3IiLCJtaWdodERyYWciLCJfb25Nb3VzZUZvcmNlV2lsbEJlZ2luIiwiX29uTW91c2VGb3JjZURvd24iLCJfb25Nb3VzZUZvcmNlQ2hhbmdlIiwiX29uTW91c2VNb3ZlIiwic3RvcFByb3BhZ2F0aW9uIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwid2Via2l0Rm9yY2UiLCJfb25Nb3VzZUZvcmNlR2xvYmFsQ2hhbmdlIiwiTW91c2VTZW5zb3IiLCJtb3VzZURvd24iLCJidXR0b24iLCJUb3VjaFNlbnNvciIsImN1cnJlbnRTY3JvbGxhYmxlUGFyZW50IiwiX29uVG91Y2hTdGFydCIsIl9vblRvdWNoSG9sZCIsIl9vblRvdWNoRW5kIiwiX29uVG91Y2hNb3ZlIiwiX29uU2Nyb2xsIiwidGFwVGltZW91dCIsIl9vbkNvbnRleHRNZW51IiwidG91Y2giLCJ0b3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwic2Nyb2xsWCIsInNjcm9sbFkiLCIkT2JqZWN0IiwiRCIsImRlc2MiLCJzZXRQcm90b3R5cGVPZiIsInRvTGVuZ3RoIiwidG9JbmRleCIsIklTX0lOQ0xVREVTIiwiJHRoaXMiLCJlbCIsImZyb21JbmRleCIsImdldEtleXMiLCJnT1BTIiwiZ2V0U3ltYm9scyIsInN5bWJvbHMiLCJpc0VudW0iLCJkb2N1bWVudEVsZW1lbnQiLCJjb2YiLCJpc0FycmF5IiwiYXJnIiwiTUVUQSIsInNldERlc2MiLCJpc0V4dGVuc2libGUiLCJGUkVFWkUiLCJwcmV2ZW50RXh0ZW5zaW9ucyIsInNldE1ldGEiLCJ3IiwiZmFzdEtleSIsImdldFdlYWsiLCJvbkZyZWV6ZSIsIm1ldGEiLCJORUVEIiwiS0VZIiwiZ09QTiIsIndpbmRvd05hbWVzIiwiZ2V0V2luZG93TmFtZXMiLCJ0b09iamVjdCIsIk9iamVjdFByb3RvIiwiY2hlY2siLCJzZXQiLCJidWdneSIsInRvSW50ZWdlciIsIlRPX1NUUklORyIsInBvcyIsIlN0cmluZyIsImNoYXJDb2RlQXQiLCJtYXgiLCJtaW4iLCJhZGRUb1Vuc2NvcGFibGVzIiwic3RlcCIsIml0ZXJhdGVkIiwiX3QiLCJfaSIsIl9rIiwiQXJndW1lbnRzIiwiJGF0IiwicG9pbnQiLCJERVNDUklQVE9SUyIsIiRmYWlscyIsIndrcyIsIndrc0RlZmluZSIsImtleU9mIiwiZW51bUtleXMiLCJnT1BORXh0IiwiJEdPUEQiLCIkRFAiLCIkSlNPTiIsIl9zdHJpbmdpZnkiLCJzdHJpbmdpZnkiLCJISURERU4iLCJUT19QUklNSVRJVkUiLCJTeW1ib2xSZWdpc3RyeSIsIkFsbFN5bWJvbHMiLCJPUFN5bWJvbHMiLCJVU0VfTkFUSVZFIiwiUU9iamVjdCIsInNldHRlciIsImZpbmRDaGlsZCIsInNldFN5bWJvbERlc2MiLCJwcm90b0Rlc2MiLCJ3cmFwIiwic3ltIiwiaXNTeW1ib2wiLCIkZGVmaW5lUHJvcGVydHkiLCIkZGVmaW5lUHJvcGVydGllcyIsIiRjcmVhdGUiLCIkcHJvcGVydHlJc0VudW1lcmFibGUiLCJFIiwiJGdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIiRnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiJGdldE93blByb3BlcnR5U3ltYm9scyIsIklTX09QIiwiJHNldCIsImtleUZvciIsInVzZVNldHRlciIsInVzZVNpbXBsZSIsInJlcGxhY2VyIiwiJHJlcGxhY2VyIiwiVE9fU1RSSU5HX1RBRyIsImNvbGxlY3Rpb25zIiwiQ29sbGVjdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBQSxFQUFFLFlBQVc7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFHQUEsR0FBRUMsU0FBRixDQUFZO0FBQ1hDLFdBQVM7QUFDUixtQkFBZ0JGLEVBQUUseUJBQUYsRUFBNkJHLElBQTdCLENBQWtDLFNBQWxDO0FBRFI7QUFERSxFQUFaOztBQU9BOzs7QUFHQTtBQUNBSCxHQUFFLE1BQUYsRUFBVUksTUFBVixDQUFpQiw4QkFB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bnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGEwMDcxZWYzNGQwMzFiODlhYmIiLCJpbXBvcnQge1N3YXBwYWJsZX0gZnJvbSBcIi4uLy4uLy4uL3B1YmxpYy9qcy9kcmFnZ2FibGVcIjtcclxuXHJcbi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4xLiBBSkFYIFNldHVwXHJcbjIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG4zLiBHZW5lcmljIEZ1bmN0aW9uc1xyXG40LiBDb21wb25lbnRzXHJcblx0NC4xIE1vYmlsZSBNZW51XHJcblx0NC4yIERpYWxvZyAvIE1vZGFsXHJcblx0NC4zIERhdGEgVGFibGVcclxuXHQ0LjQgUHJvamVjdCBUb3BpY3MgW1N1cGVydmlzb3JdXHJcblx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQ0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG41LlxyXG42LiBJbml0aWFsaXNlIEV2ZXJ5dGhpbmdcclxuKi9cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuLy8gdmFyICR0YWJsZSA9ICQoJy50YWJsZS0tZmxvYXQtaGVhZCcpO1xyXG4vLyAkdGFibGUuZmxvYXRUaGVhZCh7XHJcbi8vIFx0dG9wOiAzOSxcclxuLy8gXHRwb3NpdGlvbjogJ2ZpeGVkJ1xyXG4vLyB9KTtcclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAxLiBBSkFYIFNldHVwXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuJC5hamF4U2V0dXAoe1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpXHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8vIEFkZHMgZ2xvYmFsIHVuZGVybGF5XHJcbiQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ1bmRlcmxheVwiPjwvZGl2PicpO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgMy4gR2VuZXJpYyBGdW5jdGlvbnNcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5mdW5jdGlvbiBzb3J0VGFibGUodGFibGUsIGNvbCwgcmV2ZXJzZSkge1xyXG5cdHZhciB0YiA9IHRhYmxlLnRCb2RpZXNbMF0sIC8vIHVzZSBgPHRib2R5PmAgdG8gaWdub3JlIGA8dGhlYWQ+YCBhbmQgYDx0Zm9vdD5gIHJvd3NcclxuXHRcdHRyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGIucm93cywgMCksIC8vIHB1dCByb3dzIGludG8gYXJyYXlcclxuXHRcdGk7XHJcblx0cmV2ZXJzZSA9IC0oKCtyZXZlcnNlKSB8fCAtMSk7XHJcblx0dHIgPSB0ci5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IC8vIHNvcnQgcm93c1xyXG5cdFx0cmV0dXJuIHJldmVyc2UgLy8gYC0xICpgIGlmIHdhbnQgb3Bwb3NpdGUgb3JkZXJcclxuXHRcdFx0KiAoYS5jZWxsc1tjb2xdLnRleHRDb250ZW50LnRyaW0oKSAvLyB1c2luZyBgLnRleHRDb250ZW50LnRyaW0oKWAgZm9yIHRlc3RcclxuXHRcdFx0XHQubG9jYWxlQ29tcGFyZShiLmNlbGxzW2NvbF0udGV4dENvbnRlbnQudHJpbSgpKVxyXG5cdFx0XHQpO1xyXG5cdH0pO1xyXG5cdGZvcihpID0gMDsgaSA8IHRyLmxlbmd0aDsgKytpKSB0Yi5hcHBlbmRDaGlsZCh0cltpXSk7IC8vIGFwcGVuZCBlYWNoIHJvdyBpbiBvcmRlclxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlU29ydGFibGUodGFibGUpIHtcclxuXHR2YXIgdGggPSB0YWJsZS50SGVhZCwgaTtcclxuXHR0aCAmJiAodGggPSB0aC5yb3dzWzBdKSAmJiAodGggPSB0aC5jZWxscyk7XHJcblx0aWYgKHRoKSBpID0gdGgubGVuZ3RoO1xyXG5cdGVsc2UgcmV0dXJuOyAvLyBpZiBubyBgPHRoZWFkPmAgdGhlbiBkbyBub3RoaW5nXHJcblx0d2hpbGUgKC0taSA+PSAwKSAoZnVuY3Rpb24gKGkpIHtcclxuXHRcdHZhciBkaXIgPSAxO1xyXG5cdFx0dGhbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7c29ydFRhYmxlKHRhYmxlLCBpLCAoZGlyID0gMSAtIGRpcikpfSk7XHJcblx0fShpKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VBbGxTb3J0YWJsZShwYXJlbnQpIHtcclxuXHRwYXJlbnQgPSBwYXJlbnQgfHwgZG9jdW1lbnQuYm9keTtcclxuXHR2YXIgdCA9IHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGFibGUnKSwgaSA9IHQubGVuZ3RoO1xyXG5cdHdoaWxlICgtLWkgPj0gMCkgbWFrZVNvcnRhYmxlKHRbaV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhY2NlcHRTdHVkZW50KHN0dWRlbnRfaWQpIHtcclxuXHQkLmFqYXgoe1xyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHR1cmw6ICcvc3VwZXJ2aXNvci9hY2NlcHRTdHVkZW50JyxcclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0c3R1ZGVudF9pZCA6IHN0dWRlbnRfaWRcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVqZWN0U3R1ZGVudChzdHVkZW50X2lkLCBwcm9qZWN0X2lkKSB7XHJcblx0JC5hamF4KHtcclxuXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0dXJsOiAnL3N1cGVydmlzb3IvcmVqZWN0U3R1ZGVudCcsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQgOiBwcm9qZWN0X2lkLFxyXG5cdFx0XHRzdHVkZW50X2lkIDogc3R1ZGVudF9pZFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4kKCcuc2hvdy1tb3JlJykub24oJ2NsaWNrJywgIGZ1bmN0aW9uKGUpIHtcclxuXHQkKHRoaXMpLmhpZGUoKTtcclxuXHQkKCcucHJvamVjdCcpLmFkZENsYXNzKCdleHBhbmQnKTtcclxufSk7XHJcblxyXG4vLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcbiQoXCIudG9waWNzLWxpc3RcIikucHJlcGVuZCgkKFwiLmZpcnN0XCIpKTtcclxuXHJcbi8vIFNVUEVSVklTT1JcclxuJCgnI2RlbGV0ZVByb2plY3RCdXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuZGVsZXRlUHJvamVjdCgkKCcjdGl0bGUnKS52YWwoKSk7IH0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LiBDb21wb25lbnRzXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC4xIE1vYmlsZSBNZW51XHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAgICogQ2xhc3MgY29uc3RydWN0b3IgZm9yIG1vYmlsZSBtZW51LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiAgICovXHJcbnZhciBNb2JpbGVNZW51ID0gIGZ1bmN0aW9uIE1vYmlsZU1lbnUoZWxlbWVudCkge1xyXG5cdGlmKHdpbmRvd1snTW9iaWxlTWVudSddID09IG51bGwpe1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuYWN0aXZhdG9yID0gJCh0aGlzLlNlbGVjdG9yc18uSEFNQlVSR0VSX0NPTlRBSU5FUik7XHJcblx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0VklTSUJMRTogJ2lzLXZpc2libGUnXHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdE1PQklMRV9NRU5VOiAnbmF2Lm1vYmlsZScsXHJcblx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRVTkRFUkxBWTogJy5tb2JpbGUtbmF2LXVuZGVybGF5J1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XHJcblx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVklTSUJMRSk7XHJcblxyXG5cdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlZJU0lCTEUpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5WSVNJQkxFKTtcclxuXHRcclxuXHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlZJU0lCTEUpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgbW9iaWxlTWVudSA9IHRoaXM7XHJcblx0dGhpcy5hY3RpdmF0b3Iub24oJ2NsaWNrJywgbW9iaWxlTWVudS5vcGVuTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHR0aGlzLnVuZGVybGF5Lm9uKCdjbGljaycsIG1vYmlsZU1lbnUuY2xvc2VNZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5NT0JJTEVfTUVOVSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMubW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjIgRGlhbG9nIC8gTW9kYWxcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG52YXIgRGlhbG9nID0gZnVuY3Rpb24gRGlhbG9nKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0dGhpcy51bmRlcmxheSA9ICQoJy51bmRlcmxheScpO1xyXG5cdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdHRoaXMubG9hZGVyID0gJChlbGVtZW50KS5maW5kKFwiLmxvYWRlclwiKTtcclxuXHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydEaWFsb2cnXSA9IERpYWxvZztcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0QUNUSVZFOiAnYWN0aXZlJyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0RElBTE9HX0NPTlRFTlQ6ICcuY29udGVudCcsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLnNob3coMCk7XHJcblx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHR2YXIgZGlhbG9nID0gdGhpcztcclxuXHJcblx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuZGF0YSgnYWN0aXZhdG9yJykgJiYgJCh0aGlzKS5kYXRhKCdkaWFsb2cnKSA9PSBkaWFsb2cuZGlhbG9nTmFtZSl7XHJcblx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIEFkZCBzZXBlcmF0b3IgYWZ0ZXIgaGVhZGVyXHJcblx0ZGlhbG9nLmhlYWRlci5hcHBlbmQoJzxocj4nKTtcclxuXHJcblx0Ly8gRm9yIGRpc2FiaWx0eVxyXG5cdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblxyXG5cdC8vIFNldCB1bmRlcmxheVxyXG5cdGRpYWxvZy51bmRlcmxheS5vbignY2xpY2snLCBkaWFsb2cuaGlkZURpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cclxuXHR0cnl7XHJcblx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGRpYWxvZy5zaG93RGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblx0XHR9KTtcclxuXHR9IGNhdGNoKGVycil7XHJcblx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIFwiICsgZGlhbG9nLmRpYWxvZ05hbWUgKyBcIiBoYXMgbm8gYWN0aXZhdG9yIGJ1dHRvbi5cIik7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmRpYWxvZyA9IG5ldyBEaWFsb2codGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDQuMyBEYXRhIFRhYmxlXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAgICogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiAgICovXHJcbnZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHR0aGlzLnJvd3MgPSAkLm1lcmdlKHRoaXMuYm9keVJvd3MsIHRoaXMuZm9vdFJvd3MpO1xyXG5cdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG53aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdE1BU1RFUl9DSEVDS0JPWDogJ3RoZWFkIC5tYXN0ZXItY2hlY2tib3gnLFxyXG5cdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYodGhpcy5tYXN0ZXJDaGVja2JveC5pcygnOmNoZWNrZWQnKSl7XHJcblx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRpZiAocm93KSB7XHJcblx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcblx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHJcblx0JCh0aGlzLmNoZWNrYm94ZXMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0fSk7XHJcblxyXG5cdCQodGhpcy5oZWFkZXJzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdCQodGhpcykuY3NzKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcclxuXHR9KTtcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5kYXRhVGFibGUgPSBuZXcgRGF0YVRhYmxlKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjQgUHJvamVjdCBUb3BpY3MgW1N1cGVydmlzb3JdXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAgICogQ2xhc3MgY29uc3RydWN0b3IgZm9yIHByb2plY3QgdG9waWNzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiAgICovXHJcbnZhciBQcm9qZWN0VG9waWNzID0gIGZ1bmN0aW9uIFByb2plY3RUb3BpY3MoKSB7fTtcclxud2luZG93WydQcm9qZWN0VG9waWNzJ10gPSBQcm9qZWN0VG9waWNzO1xyXG5cclxuUHJvamVjdFRvcGljcy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5Qcm9qZWN0VG9waWNzLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdEFERF9UT1BJQ19JTlBVVDogJyNhZGRUb3BpY0lucHV0JyxcclxuXHRORVdfVE9QSUNfSU5QVVRfQ09OVEFJTkVSOiAnI25ldy10b3BpYy1pbnB1dC1jb250YWluZXInLFxyXG59O1xyXG5cclxuUHJvamVjdFRvcGljcy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0U1BBQ0U6IDMyLFxyXG5cdEVOVEVSOiAxMyxcclxuXHRDT01NQTogNDVcclxufTtcclxuXHJcbnZhciBwcm9qZWN0VG9waWNzID0gbmV3IFByb2plY3RUb3BpY3MoKTtcclxuXHJcblByb2plY3RUb3BpY3MucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRhZGRUb3BpY1RvUHJvamVjdDogZnVuY3Rpb24gKHByb2plY3RJZCwgdG9waWNOYW1lKSB7XHJcblx0XHQkKCcubG9hZGVyJykuc2hvdygwKTtcclxuXHRcdHZhciBhamF4VXJsID0gXCIvcHJvamVjdHMvYWRkVG9waWNcIjtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiUE9TVFwiLFxyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHR0b3BpY19uYW1lOiB0b3BpY05hbWUsXHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdCQocHJvamVjdFRvcGljcy5TZWxlY3RvcnNfLkFERF9UT1BJQ19JTlBVVCkudmFsKCcnKTtcclxuXHRcdFx0XHQkKFwiLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWM6bGFzdFwiKS5hZnRlcignPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIGRhdGFbXCJpZFwiXSArICdcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRvcGljLXJlbW92ZVwiPlg8L2J1dHRvbj48cCBjbGFzcz1cInRvcGljLW5hbWVcIj4nICsgZGF0YVtcIm5hbWVcIl0gKyAnPC9wPjwvbGk+Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdCQoJ2JvZHknKS5hcHBlbmQoZGF0YSk7XHJcblx0XHRcdCQoJy5sb2FkZXInKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlVG9waWNGcm9tUHJvamVjdDogZnVuY3Rpb24gKHByb2plY3RJZCwgdG9waWNJZCkge1xyXG5cdFx0JCgnLmxvYWRlcicpLnNob3coMCk7XHJcblx0XHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL3JlbW92ZVRvcGljXCI7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIkRFTEVURVwiLFxyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHR0b3BpY19pZCA6IHRvcGljSWQsXHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWMnKS5lYWNoKGZ1bmN0aW9uKGksIG9iaikge1xyXG5cdFx0XHRcdFx0aWYoJCh0aGlzKS5kYXRhKCd0b3BpYy1pZCcpID09IHRvcGljSWQpe1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHQkKCcubG9hZGVyJykuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZVByb2plY3RQcmltYXJ5VG9waWM6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljSWQpIHtcclxuXHRcdCQoJy5sb2FkZXInKS5zaG93KDApO1xyXG5cdFx0dmFyIGFqYXhVcmwgPSBcIi9wcm9qZWN0cy91cGRhdGVQcmltYXJ5VG9waWNcIjtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiUEFUQ0hcIixcclxuXHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0dG9waWNfaWQgOiB0b3BpY0lkLFxyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoJyNlZGl0UHJvamVjdEZvcm0nKS5hdHRyKCdkYXRhLXByb2plY3QtaWQnLCB0b3BpY0lkKTtcclxuXHRcdFx0XHQkKCcudG9waWNzLWxpc3QuZWRpdCBsaS50b3BpYycpLmVhY2goZnVuY3Rpb24oaSwgb2JqKSB7XHJcblx0XHRcdFx0XHRpZigkKHRoaXMpLmRhdGEoJ3RvcGljLWlkJykgPT0gdG9waWNJZCl7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJmaXJzdFwiKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJmaXJzdFwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCgnLmxvYWRlcicpLmhpZGUoMCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG59O1xyXG5cclxuY29uc3Qgc3dhcHBhYmxlID0gbmV3IFN3YXBwYWJsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9waWNzLWxpc3QuZWRpdCcpLCB7XHJcbiAgZHJhZ2dhYmxlOiAnLnRvcGljJyxcclxufSk7XHJcblxyXG5zd2FwcGFibGUub24oJ3N3YXBwYWJsZTpzd2FwcGVkJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgcHJvamVjdElkID0gJCgnI2VkaXRQcm9qZWN0Rm9ybScpLmRhdGEoJ3Byb2plY3QtaWQnKTtcclxuXHR2YXIgb3JpZ2luYWxQcmltYXJ5VG9waWNJZCA9ICQoJyNlZGl0UHJvamVjdEZvcm0nKS5kYXRhKCdwcmltYXJ5LXRvcGljLWlkJyk7XHJcblx0dmFyIHRvcGljSWQgPSAkKFwiLnRvcGljcy1saXN0LmVkaXQgbGk6Zmlyc3QtY2hpbGRcIikuZGF0YSgndG9waWMtaWQnKTtcclxuXHRpZih0b3BpY0lkICE9IG9yaWdpbmFsUHJpbWFyeVRvcGljSWQpe1xyXG5cdFx0cHJvamVjdFRvcGljcy5mdW5jdGlvbnMudXBkYXRlUHJvamVjdFByaW1hcnlUb3BpYyhwcm9qZWN0SWQsIHRvcGljSWQpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBBZGQgbmV3IHRvcGljXHJcbiQocHJvamVjdFRvcGljcy5TZWxlY3RvcnNfLkFERF9UT1BJQ19JTlBVVCkua2V5cHJlc3MoZnVuY3Rpb24oZSkge1xyXG5cdGlmIChlLndoaWNoID09IHByb2plY3RUb3BpY3MuS2V5c18uRU5URVIpIHtcclxuXHRcdHZhciBwcm9qZWN0SWQgPSAkKFwiI2VkaXRQcm9qZWN0Rm9ybVwiKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHRwcm9qZWN0VG9waWNzLmZ1bmN0aW9ucy5hZGRUb3BpY1RvUHJvamVjdChwcm9qZWN0SWQsICQodGhpcykudmFsKCkpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBSZW1vdmUgdG9waWNcclxuJCgnLnRvcGljcy1saXN0LmVkaXQnKS5vbignY2xpY2snLCAnLnRvcGljIC50b3BpYy1yZW1vdmUnLCBmdW5jdGlvbigpe1xyXG5cdHZhciBwcm9qZWN0SWQgPSAkKFwiI2VkaXRQcm9qZWN0Rm9ybVwiKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0dmFyIHRvcGljSWQgPSAkKHRoaXMpLnBhcmVudCgnbGknKS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdHByb2plY3RUb3BpY3MuZnVuY3Rpb25zLnJlbW92ZVRvcGljRnJvbVByb2plY3QocHJvamVjdElkLCB0b3BpY0lkKTtcclxufSk7XHJcblxyXG4kKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5ORVdfVE9QSUNfSU5QVVRfQ09OVEFJTkVSKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHQkKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5BRERfVE9QSUNfSU5QVVQpLmZvY3VzKCk7XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gICAqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4gICAqL1xyXG52YXIgQWpheEZ1bmN0aW9ucyA9ICBmdW5jdGlvbiBBamF4RnVuY3Rpb25zKCkge307XHJcbndpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRTRUFSQ0hfQ09OVEFJTkVSOiAnLnNlYXJjaC1jb250YWluZXInLFxyXG5cdFNFQVJDSF9GSUxURVJfQ09OVEFJTkVSOiAnLnNlYXJjaC1maWx0ZXItY29udGFpbmVyJyxcclxuXHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0TE9HX0lOX0RJQUxPRzogJy5sb2dpbi5kaWFsb2cnLFxyXG5cdENIQU5HRV9BVVRIX0RJQUxPRzogJy5jaGFuZ2UtYXV0aC5kaWFsb2cnXHJcbn07XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5LZXlzXyA9IHtcclxuXHRTUEFDRTogMzIsXHJcblx0RU5URVI6IDEzLFxyXG5cdENPTU1BOiA0NVxyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdGRlbGV0ZVByb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xyXG5cdFx0aWYoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgXFxcIlwiICsgcHJvamVjdE5hbWUgK1wiXFxcIj9cIikpe1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHR5cGU6IFwiREVMRVRFXCIsXHJcblx0XHRcdFx0dXJsOiBcImVkaXRcIixcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbih1cmwpe1xyXG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4uL1wiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhlbGVtZW50KXtcclxuXHQkKGVsZW1lbnQpLnJlbW92ZUNsYXNzIChmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xyXG5cdFx0cmV0dXJuIChjbGFzc05hbWUubWF0Y2ggKC9cXGJzaGFkb3dcXC1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXNcclxuJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy1mb2N1cycpO1xyXG59KTtcclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXMgb3V0XHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1c291dCcsICBmdW5jdGlvbihlKXtcclxuXHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctMmRwJyk7XHJcbn0pO1xyXG5cclxuLy8gU0VBUkNIXHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0JVVFRPTikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIGNvbnRhaW5lciA9ICQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0NPTlRBSU5FUik7XHJcblx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdGlmKGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0Y29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0fSBlbHNle1xyXG5cdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC42IEVkaXQgVG9waWNzIFtBZG1pbl1cclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICAgKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuICAgKi9cclxudmFyIEVkaXRUb3BpYyA9IGZ1bmN0aW9uIEVkaXRUb3BpYyhlbGVtZW50KSB7XHJcblx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHR0aGlzLm9yaWdpbmFsTmFtZSA9ICQoZWxlbWVudCkuZGF0YShcIm9yaWdpbmFsLXRvcGljLW5hbWVcIik7XHJcblx0dGhpcy50b3BpY0lkID0gJChlbGVtZW50KS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdHRoaXMudG9waWNOYW1lSW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XHJcblx0dGhpcy5lZGl0QnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZWRpdC10b3BpYycpO1xyXG5cdHRoaXMuZGVsZXRlQnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZGVsZXRlLXRvcGljJyk7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG53aW5kb3dbJ0VkaXRUb3BpYyddID0gRWRpdFRvcGljO1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHt9O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdEVESVRfVE9QSUM6ICcuZWRpdC10b3BpYy1saXN0IC50b3BpYycsXHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdERFTEVURV9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRQQVRDSF9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRORVdfVE9QSUM6ICcvdG9waWNzLydcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdGVkaXRUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcmVzcG9uc2UgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIFxcXCJcIiArICB0aGlzLm9yaWdpbmFsTmFtZSArXCJcXFwiIHRvIFxcXCJcIiArICB0aGlzLnRvcGljTmFtZUlucHV0LnZhbCgpICtcIlxcXCI/XCIpO1xyXG5cclxuXHRcdGlmKHJlc3BvbnNlKXtcclxuXHRcdFx0dGhpcy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHR0aGlzLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHQkKCcubG9hZGVyJywgdGhpcy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdHVybDogdGhpcy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0Y29udGV4dDogdGhpcyxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHR0b3BpY19pZDogdGhpcy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0dG9waWNfbmFtZSA6IHRoaXMudG9waWNOYW1lSW5wdXQudmFsKClcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dGhpcy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHR0aGlzLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdHRoaXMub3JpZ2luYWxOYW1lID0gdGhpcy50b3BpY05hbWVJbnB1dC52YWwoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnZhbCh0aGlzLm9yaWdpbmFsTmFtZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHJlc3BvbnNlID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHRvcGljIFxcXCJcIiArICB0aGlzLm9yaWdpbmFsTmFtZSArXCJcXFwiP1wiKTtcclxuXHRcdGlmKHJlc3BvbnNlKXtcclxuXHRcdFx0dGhpcy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0dXJsOiB0aGlzLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRjb250ZXh0OiB0aGlzLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdHRvcGljX2lkOiB0aGlzLnRvcGljSWQsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50LmhpZGUoODAwLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlRWRpdFRvcGljRE9NOiBmdW5jdGlvbih0b3BpY0lkLCBvcmlnaW5hbE5hbWUpe1xyXG5cdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0fVxyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBlZGl0VG9waWMgPSB0aGlzO1xyXG5cdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuRWRpdFRvcGljID0gbmV3IEVkaXRUb3BpYyh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNS4gT1RIRVJcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vLyBBY2NlcHQgU3R1ZGVudFxyXG4kKCcuYWNjZXB0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0YWNjZXB0U3R1ZGVudCgkKHRoaXMpLmRhdGEoJ3N0dWRlbnRfaWQnKSk7XHJcbn0pO1xyXG5cclxuLy8gUmVqZWN0IFN0dWRlbnRcclxuJCgnLnJlamVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdHJlamVjdFN0dWRlbnQoJCh0aGlzKS5kYXRhKCdzdHVkZW50X2lkJyksICQodGhpcykuZGF0YSgncHJvamVjdF9pZCcpKTtcclxufSk7XHJcblxyXG4kKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQT1NUJyxcclxuXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkNIQU5HRV9BVVRIX0RJQUxPRylbMF0uZGlhbG9nLmlzQ2xvc2FibGUgPSBmYWxzZTtcclxuXHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkNIQU5HRV9BVVRIX0RJQUxPRylbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnNob3coKTtcclxuXHRcdFx0JCgnLmZvcm0tZmllbGQnLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmFkZENsYXNzKFwiaGFzLWVycm9yXCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdHZhciBzdWJtaXRCdXR0b24gPSAkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKTtcclxuXHRzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cclxuXHQkKCcubG9hZGVyJywgc3VibWl0QnV0dG9uKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0Y29udGV4dDogJCh0aGlzKSxcclxuXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMuY3JlYXRlRWRpdFRvcGljRE9NKGRhdGFbXCJpZFwiXSwgZGF0YVtcIm5hbWVcIl0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uICgpIHt9XHJcblx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0XHQkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKS5odG1sKCdBZGQnKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4kKCcjc3R1ZGVudC1lZGl0LWxpc3QnKS5maW5kKCcuY2hlY2tib3ggaW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIHN0YXR1cyA9ICQodGhpcykucGFyZW50cygpLmVxKDMpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdHZhciBlbWFpbFN0cmluZyA9IFwibWFpbHRvOlwiO1xyXG5cdHZhciBjaGVja2JveFNlbGVjdG9yID0gJyNzdHVkZW50LWVkaXQtbGlzdC4nICsgc3RhdHVzICsgJyAuY2hlY2tib3ggaW5wdXQnO1xyXG5cdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblx0JChjaGVja2JveFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcblx0XHRcdGVtYWlsU3RyaW5nICs9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZGF0YSgnZW1haWwnKTtcclxuXHRcdFx0ZW1haWxTdHJpbmcgKz0gXCIsXCI7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0JChlbWFpbEJ1dHRvbnNlbGVjdG9yKS5wcm9wKCdocmVmJywgZW1haWxTdHJpbmcpO1xyXG59KTtcclxuXHJcbiQoJy5lZGl0LXN0dWRlbnQtbGlzdCAuZW1haWwtc2VsZWN0ZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0aWYoJCh0aGlzKS5wcm9wKCdocmVmJykgPT09ICdtYWlsdG86Jyl7XHJcblx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIFVzZWQgZm9yIHRyYW5zYWN0aW9uc1xyXG4kKCcjc2hvdy1yYXctdGFibGUtZGF0YScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdGlmKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKXtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuaGlkZSgpO1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgndGFibGUuZnVsbC1kZXRhaWwnKS5zaG93KCk7XHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBORVcgVVNFUlxyXG4vLyBwdXQgdGhpcyBzdHVmZiBpbiBhbiBhcnJheVxyXG4kKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRpZigkKCcjc3R1ZGVudC1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNhZG1pbi1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBTVFJJTkdTXHJcbiQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG4kKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdGlmKCQoJyNzdHVkZW50LW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI2FkbWluLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNi4gU2Vjb25kIE1hcmtlclxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxudmFyIE1hcmtlciA9IGZ1bmN0aW9uIE1hcmtlcigpIHtcclxuXHRpZigkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKS5sZW5ndGggPCAxIHx8ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpLmxlbmd0aCA8IDEpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0dGhpcy5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdHRoaXMuc3R1ZGVudFRhYmxlID0gJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIik7XHJcblx0dGhpcy5zdHVkZW50RGF0YVRhYmxlID0gdGhpcy5zdHVkZW50VGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdHRoaXMuc3VwZXJ2aXNvclRhYmxlID0gJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIik7XHJcblx0dGhpcy5zdXBlcnZpc29yRGF0YVRhYmxlID0gdGhpcy5zdXBlcnZpc29yVGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxuXHJcblxyXG5NYXJrZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBtYXJrZXIgPSB0aGlzO1xyXG5cclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCh0aGlzLCBtYXJrZXIpO1xyXG5cdH0pO1xyXG5cclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvcih0aGlzLCBtYXJrZXIpO1xyXG5cdH0pO1xyXG59XHJcblxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHR3aW5kb3dbJ01hcmtlciddID0gbmV3IE1hcmtlcigpO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdHZhciByb3cgPSAkKHN0dWRlbnRSb3dET00pO1xyXG5cdFx0XHJcblx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9ICQocm93KTtcclxuXHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuZGF0YSgnbWFya2VyLWlkJykgPT0gcm93LmRhdGEoJ3N1cGVydmlzb3ItaWQnKSl7XHJcblx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHRcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yID0gZnVuY3Rpb24oc3VwZXJ2aXNvclJvd0RPTSwgbWFya2VyKXtcclxuXHR2YXIgcm93ID0gJChzdXBlcnZpc29yUm93RE9NKTtcclxuXHJcblx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgIT0gbnVsbCl7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2coXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1uYW1lJyksXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksIFxyXG5cdFx0XHRyb3cuZGF0YSgnbWFya2VyLW5hbWUnKSwgXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpKTtcclxuXHR9XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUucmVzZXRWaWV3ID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0JChcIiNzdHVkZW50LW5hbWVcIikudGV4dChzdHVkZW50TmFtZSk7XHJcblx0JChcIiNzdXBlcnZpc29yLW5hbWVcIikudGV4dChzdXBlcnZpc29yTmFtZSk7XHJcblx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHQkKFwiI3Byb2plY3QtdGl0bGVcIikuaHRtbCgnPGI+VGl0bGU6IDwvYj4nICsgcHJvamVjdFtcInRpdGxlXCJdKTtcclxuXHQkKFwiI3Byb2plY3QtZGVzY3JpcHRpb25cIikuaHRtbCgnPGI+RGVzY3JpcHRpb246IDwvYj4nICsgcHJvamVjdFtcImRlc2NyaXB0aW9uXCJdKTtcclxuXHJcblx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcbn1cclxuXHJcbiQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdHZhciBtYXJrZXIgPSB3aW5kb3dbJ01hcmtlciddO1xyXG5cclxuXHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9PSBudWxsKXtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH07XHJcblxyXG5cdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHR2YXIgcHJvamVjdElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JylbXCJpZFwiXTtcclxuXHR2YXIgbWFya2VySWQgPSBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yLmRhdGEoJ21hcmtlci1pZCcpO1xyXG5cdHZhciBhamF4VXJsID0gXCIvcHJvamVjdHMvYXNzaWduTWFya2VyXCI7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZCxcclxuXHRcdFx0bWFya2VyX2lkOiBtYXJrZXJJZFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuXHRcdH0sXHJcblx0XHQvLyBBZGQgZmFpbFxyXG5cdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5yZW1vdmUoKTtcclxuXHRcdG1hcmtlci5yZXNldFZpZXcobWFya2VyKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNi4gSW5pdGlhbGlzZSBFdmVyeXRoaW5nXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkRpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cclxuLy8gLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbi8vIFx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcbi8vIFx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHJcbi8vIFx0JCh0aGlzLmNoZWNrYm94ZXMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG4vLyBcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcbi8vIFx0fSk7XHJcblxyXG4vLyBcdCQodGhpcy5oZWFkZXJzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuLy8gXHRcdCQodGhpcykuY3NzKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcclxuLy8gXHR9KTtcclxuLy8gfSk7XHJcblxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanMiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkRyYWdnYWJsZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEcmFnZ2FibGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRHJhZ2dhYmxlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNjMpO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY5KTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oNzApO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY4KTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNyk7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEFsbCBldmVudHMgZmlyZWQgYnkgZHJhZ2dhYmxlIGluaGVyaXQgdGhpcyBjbGFzcy4gWW91IGNhbiBjYWxsIGBjYW5jZWwoKWAgdG9cbiAqIGNhbmNlbCBhIHNwZWNpZmljIGV2ZW50IG9yIHlvdSBjYW4gY2hlY2sgaWYgYW4gZXZlbnQgaGFzIGJlZW4gY2FuY2VsZWQgYnlcbiAqIGNhbGxpbmcgYGNhbmNlbGVkKClgLlxuICogQGFic3RyYWN0XG4gKiBAY2xhc3NcbiAqL1xudmFyIEFic3RyYWN0RXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFic3RyYWN0RXZlbnQoZGF0YSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEFic3RyYWN0RXZlbnQpO1xuXG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQWJzdHJhY3RFdmVudCwgW3tcbiAgICBrZXk6ICdjYW5jZWwnLFxuXG5cbiAgICAvKipcbiAgICAgKiBDYW5jZWxzIGEgc3BlY2lmaWMgZXZlbnRcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgLy8gV2Ugc2hvdWxkIGJlIGRlY2xhcmluZyBpZiBldmVudHMgYXJlIGNhbmNlbGFibGVcbiAgICAgIC8vIGlmICghdGhpcy5jYW5jZWxhYmxlKSB7XG4gICAgICAvLyAgIHRocm93IG5ldyBFcnJvcignVGhpcyBldmVudCBpcyBub3QgY2FuY2VsYWJsZScpO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5fY2FuY2VsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGV2ZW50IGhhcyBiZWVuIGNhbmNlbGVkXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2FuY2VsZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5jZWxlZCgpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuX2NhbmNlbGVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0eXBlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnR5cGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2FuY2VsYWJsZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jYW5jZWxhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQWJzdHJhY3RFdmVudDtcbn0oKTtcblxuQWJzdHJhY3RFdmVudC50eXBlID0gJ2V2ZW50JztcbkFic3RyYWN0RXZlbnQuY2FuY2VsYWJsZSA9IGZhbHNlO1xuZXhwb3J0cy5kZWZhdWx0ID0gQWJzdHJhY3RFdmVudDtcblxuLyoqKi8gfSksXG4vKiA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIV9fd2VicGFja19yZXF1aXJlX18oMjApKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGFuT2JqZWN0ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcbiAgLCBJRThfRE9NX0RFRklORSA9IF9fd2VicGFja19yZXF1aXJlX18oNDEpXG4gICwgdG9QcmltaXRpdmUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cbi8qKiovIH0pLFxuLyogOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MylcbiAgLCBkZWZpbmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuLyoqKi8gfSksXG4vKiAxMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbi8qKiovIH0pLFxuLyogMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRQICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpXG4gICwgY3JlYXRlRGVzYyA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuLyoqKi8gfSksXG4vKiAxMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgc3RvcmUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKVxuICAsIFN5bWJvbCAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG4vKioqLyB9KSxcbi8qIDEzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNsb3Nlc3QgPSBjbG9zZXN0O1xuZXhwb3J0cy5zY3JvbGwgPSBzY3JvbGw7XG4vKiogQG1vZHVsZSB1dGlscyAqL1xuXG5mdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZGl0aW9uRm4oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoIWN1cnJlbnRFbGVtZW50KSB7XG4gICAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgbWF0Y2hGdW5jdGlvbiA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvcjtcbiAgICAgIHJldHVybiBtYXRjaEZ1bmN0aW9uLmNhbGwoY3VycmVudEVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yKGN1cnJlbnRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICB2YXIgY3VycmVudCA9IGVsZW1lbnQ7XG5cbiAgZG8ge1xuICAgIGN1cnJlbnQgPSBjdXJyZW50LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50IHx8IGN1cnJlbnQuY29ycmVzcG9uZGluZ0VsZW1lbnQgfHwgY3VycmVudDtcbiAgICBpZiAoY29uZGl0aW9uRm4oY3VycmVudCkpIHtcbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cbiAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICB9IHdoaWxlIChjdXJyZW50ICE9PSBkb2N1bWVudC5ib2R5ICYmIGN1cnJlbnQgIT09IGRvY3VtZW50KTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxudmFyIHNjcm9sbEFuaW1hdGlvbkZyYW1lID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBzY3JvbGwoZWxlbWVudCwgX3JlZikge1xuICB2YXIgY2xpZW50WCA9IF9yZWYuY2xpZW50WCxcbiAgICAgIGNsaWVudFkgPSBfcmVmLmNsaWVudFksXG4gICAgICBzcGVlZCA9IF9yZWYuc3BlZWQsXG4gICAgICBzZW5zaXRpdml0eSA9IF9yZWYuc2Vuc2l0aXZpdHk7XG5cbiAgaWYgKHNjcm9sbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc2Nyb2xsQW5pbWF0aW9uRnJhbWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsRm4oKSB7XG4gICAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBvZmZzZXRZID0gKE1hdGguYWJzKHJlY3QuYm90dG9tIC0gY2xpZW50WSkgPD0gc2Vuc2l0aXZpdHkpIC0gKE1hdGguYWJzKHJlY3QudG9wIC0gY2xpZW50WSkgPD0gc2Vuc2l0aXZpdHkpO1xuICAgIHZhciBvZmZzZXRYID0gKE1hdGguYWJzKHJlY3QucmlnaHQgLSBjbGllbnRYKSA8PSBzZW5zaXRpdml0eSkgLSAoTWF0aC5hYnMocmVjdC5sZWZ0IC0gY2xpZW50WCkgPD0gc2Vuc2l0aXZpdHkpO1xuICAgIGVsZW1lbnQuc2Nyb2xsVG9wICs9IG9mZnNldFkgKiBzcGVlZDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgKz0gb2Zmc2V0WCAqIHNwZWVkO1xuICAgIHNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbEZuKTtcbiAgfVxuXG4gIHNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbEZuKTtcbn1cblxuLyoqKi8gfSksXG4vKiAxNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuLyoqKi8gfSksXG4vKiAxNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KVxuICAsIGNvcmUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTApXG4gICwgY3R4ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSlcbiAgLCBoaWRlICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG4vKioqLyB9KSxcbi8qIDE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuLyoqKi8gfSksXG4vKiAxNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblxudmFyIF9hY2Nlc3NpYmlsaXR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Myk7XG5cbnZhciBfYWNjZXNzaWJpbGl0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hY2Nlc3NpYmlsaXR5KTtcblxudmFyIF9taXJyb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU0KTtcblxudmFyIF9taXJyb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWlycm9yKTtcblxudmFyIF9jb2xsaWRhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSk7XG5cbnZhciBfY29sbGlkYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xsaWRhYmxlKTtcblxudmFyIF9zbmFwcGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKTtcblxudmFyIF9zbmFwcGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc25hcHBhYmxlKTtcblxudmFyIF9kcmFnU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NCk7XG5cbnZhciBfZHJhZ1NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmFnU2Vuc29yKTtcblxudmFyIF9tb3VzZVNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oNjYpO1xuXG52YXIgX21vdXNlU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vdXNlU2Vuc29yKTtcblxudmFyIF90b3VjaFNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oNjcpO1xuXG52YXIgX3RvdWNoU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvdWNoU2Vuc29yKTtcblxudmFyIF9mb3JjZVRvdWNoU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NSk7XG5cbnZhciBfZm9yY2VUb3VjaFNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mb3JjZVRvdWNoU2Vuc29yKTtcblxudmFyIF9kcmFnZ2FibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTcpO1xuXG52YXIgX2RyYWdFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTYpO1xuXG52YXIgX21pcnJvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgZHJhZ2dhYmxlOiAnLmRyYWdnYWJsZS1zb3VyY2UnLFxuICBoYW5kbGU6IG51bGwsXG4gIGRlbGF5OiAwLFxuICBwbGFjZWRUaW1lb3V0OiA4MDAsXG4gIG5hdGl2ZTogZmFsc2UsXG4gIHBsdWdpbnM6IFtfbWlycm9yMi5kZWZhdWx0LCBfYWNjZXNzaWJpbGl0eTIuZGVmYXVsdF0sXG4gIGNsYXNzZXM6IHtcbiAgICAnY29udGFpbmVyOmRyYWdnaW5nJzogJ2RyYWdnYWJsZS1jb250YWluZXItLWlzLWRyYWdnaW5nJyxcbiAgICAnc291cmNlOmRyYWdnaW5nJzogJ2RyYWdnYWJsZS1zb3VyY2UtLWlzLWRyYWdnaW5nJyxcbiAgICAnc291cmNlOnBsYWNlZCc6ICdkcmFnZ2FibGUtc291cmNlLS1wbGFjZWQnLFxuICAgICdjb250YWluZXI6cGxhY2VkJzogJ2RyYWdnYWJsZS1jb250YWluZXItLXBsYWNlZCcsXG4gICAgJ2JvZHk6ZHJhZ2dpbmcnOiAnZHJhZ2dhYmxlLS1pcy1kcmFnZ2luZycsXG4gICAgJ2RyYWdnYWJsZTpvdmVyJzogJ2RyYWdnYWJsZS0tb3ZlcicsXG4gICAgJ2NvbnRhaW5lcjpvdmVyJzogJ2RyYWdnYWJsZS1jb250YWluZXItLW92ZXInLFxuICAgIG1pcnJvcjogJ2RyYWdnYWJsZS1taXJyb3InXG4gIH1cbn07XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY29yZSBkcmFnZ2FibGUgbGlicmFyeSB0aGF0IGRvZXMgdGhlIGhlYXZ5IGxpZnRpbmdcbiAqIEBtb2R1bGUgRHJhZ2dhYmxlXG4gKi9cblxudmFyIERyYWdnYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ2dhYmxlLCBudWxsLCBbe1xuICAgIGtleTogJ1BsdWdpbnMnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHsgQWNjZXNzaWJpbGl0eTogX2FjY2Vzc2liaWxpdHkyLmRlZmF1bHQsIE1pcnJvcjogX21pcnJvcjIuZGVmYXVsdCB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ0JlaGF2aW91cicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4geyBDb2xsaWRhYmxlOiBfY29sbGlkYWJsZTIuZGVmYXVsdCwgU25hcHBhYmxlOiBfc25hcHBhYmxlMi5kZWZhdWx0IH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnN0cnVjdG9yLlxuICAgICAqIEBjb25zdHJ1Y3RzIERyYWdnYWJsZVxuICAgICAqIEBwYXJhbSB7QXJyYXl8Tm9kZUxpc3R9IGNvbnRhaW5lcnMgLSBEcmFnZ2FibGUgY29udGFpbmVyc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgZHJhZ2dhYmxlXG4gICAgICovXG5cbiAgfV0pO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZSk7XG5cbiAgICB0aGlzLmNvbnRhaW5lcnMgPSBjb250YWluZXJzO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICB0aGlzLmFjdGl2ZVNlbnNvcnMgPSBbXTtcbiAgICB0aGlzLmFjdGl2ZVBsdWdpbnMgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IHt9O1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMuZHJhZ1N0YXJ0ID0gdGhpcy5kcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRyYWdNb3ZlID0gdGhpcy5kcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZHJhZ1N0b3AgPSB0aGlzLmRyYWdTdG9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kcmFnUHJlc3N1cmUgPSB0aGlzLmRyYWdQcmVzc3VyZS5iaW5kKHRoaXMpO1xuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0LCB0cnVlKTtcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6bW92ZScsIHRoaXMuZHJhZ01vdmUsIHRydWUpO1xuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpzdG9wJywgdGhpcy5kcmFnU3RvcCwgdHJ1ZSk7XG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnOnByZXNzdXJlJywgdGhpcy5kcmFnUHJlc3N1cmUsIHRydWUpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMub3B0aW9ucy5wbHVnaW5zW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgIHZhciBQbHVnaW4gPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgdmFyIHBsdWdpbiA9IG5ldyBQbHVnaW4odGhpcyk7XG4gICAgICAgIHBsdWdpbi5hdHRhY2goKTtcbiAgICAgICAgdGhpcy5hY3RpdmVQbHVnaW5zLnB1c2gocGx1Z2luKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gdGhpcy5zZW5zb3JzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgdmFyIFNlbnNvciA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICB2YXIgc2Vuc29yID0gbmV3IFNlbnNvcih0aGlzLmNvbnRhaW5lcnMsIG9wdGlvbnMpO1xuICAgICAgICBzZW5zb3IuYXR0YWNoKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlU2Vuc29ycy5wdXNoKHNlbnNvcik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMy5yZXR1cm4oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gbmV3IF9kcmFnZ2FibGVFdmVudC5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KHtcbiAgICAgIGRyYWdnYWJsZTogdGhpc1xuICAgIH0pO1xuXG4gICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgRHJhZ2dhYmxlIGluc3RhbmNlLiBUaGlzIHJlbW92ZXMgYWxsIGludGVybmFsIGV2ZW50IGxpc3RlbmVycyBhbmRcbiAgICogZGVhY3RpdmF0ZXMgc2Vuc29ycyBhbmQgcGx1Z2luc1xuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdnYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gdGhpcy5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA0OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gKF9zdGVwNCA9IF9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lciA9IF9zdGVwNC52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOnN0YXJ0JywgdGhpcy5kcmFnU3RhcnQsIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOm1vdmUnLCB0aGlzLmRyYWdNb3ZlLCB0cnVlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZzpzdG9wJywgdGhpcy5kcmFnU3RvcCwgdHJ1ZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6cHJlc3N1cmUnLCB0aGlzLmRyYWdQcmVzc3VyZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjQgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjQgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgJiYgX2l0ZXJhdG9yNC5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjQucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjQpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGRyYWdnYWJsZURlc3Ryb3lFdmVudCA9IG5ldyBfZHJhZ2dhYmxlRXZlbnQuRHJhZ2dhYmxlRGVzdHJveUV2ZW50KHtcbiAgICAgICAgZHJhZ2dhYmxlOiB0aGlzXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ2dhYmxlRGVzdHJveUV2ZW50KTtcblxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjUgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjUgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjUgPSB0aGlzLmFjdGl2ZVBsdWdpbnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDU7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgPSAoX3N0ZXA1ID0gX2l0ZXJhdG9yNS5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgYWN0aXZlUGx1Z2luID0gX3N0ZXA1LnZhbHVlO1xuXG4gICAgICAgICAgYWN0aXZlUGx1Z2luLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I1ID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3I1ID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ICYmIF9pdGVyYXRvcjUucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I1LnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I1KSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I2ID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I2ID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I2ID0gdGhpcy5hY3RpdmVTZW5zb3JzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA2OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ID0gKF9zdGVwNiA9IF9pdGVyYXRvcjYubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGFjdGl2ZVNlbnNvciA9IF9zdGVwNi52YWx1ZTtcblxuICAgICAgICAgIGFjdGl2ZVNlbnNvci5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yNiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yNiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiAmJiBfaXRlcmF0b3I2LnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I2O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgbGlzdGVuZXIgZm9yIGRyYWdnYWJsZSBldmVudHNcbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCAoZHJhZ0V2ZW50KSA9PiBkcmFnRXZlbnQuY2FuY2VsKCkpO1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoIXRoaXMuY2FsbGJhY2tzW3R5cGVdKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzW3R5cGVdID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2FsbGJhY2tzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lciBmcm9tIGRyYWdnYWJsZVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5vZmYoJ2RyYWc6c3RhcnQnLCBoYW5kbGVyRnVuY3Rpb24pO1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvZmYnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvZmYodHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghdGhpcy5jYWxsYmFja3NbdHlwZV0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgY29weSA9IHRoaXMuY2FsbGJhY2tzW3R5cGVdLnNsaWNlKDApO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3B5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayA9PT0gY29weVtpXSkge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW3R5cGVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndHJpZ2dlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIodHlwZSkge1xuICAgICAgaWYgKCF0aGlzLmNhbGxiYWNrc1t0eXBlXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMuY2FsbGJhY2tzW3R5cGVdLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzW3R5cGVdW2ldO1xuICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2ZSBzZW5zb3JzXG4gICAgICogQHJldHVybiB7QXJyYXl9IHNlbnNvcnNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29ycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlbnNvcnMoKSB7XG4gICAgICByZXR1cm4gW190b3VjaFNlbnNvcjIuZGVmYXVsdCwgX2ZvcmNlVG91Y2hTZW5zb3IyLmRlZmF1bHQsIHRoaXMub3B0aW9ucy5uYXRpdmUgPyBfZHJhZ1NlbnNvcjIuZGVmYXVsdCA6IF9tb3VzZVNlbnNvcjIuZGVmYXVsdF07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZHJhZ1N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB2YXIgc2Vuc29yRXZlbnQgPSBnZXRTZW5zb3JFdmVudChldmVudCk7XG4gICAgICB2YXIgdGFyZ2V0ID0gc2Vuc29yRXZlbnQudGFyZ2V0LFxuICAgICAgICAgIGNvbnRhaW5lciA9IHNlbnNvckV2ZW50LmNvbnRhaW5lcixcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50ID0gc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudDtcblxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhhbmRsZSAmJiB0YXJnZXQgJiYgISgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuaGFuZGxlKSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIGRyYWdnYWJsZSBzb3VyY2UgZWxlbWVudFxuICAgICAgdGhpcy5zb3VyY2UgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSk7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgICAgaWYgKCF0aGlzLnNvdXJjZSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKCFpc0RyYWdFdmVudChvcmlnaW5hbEV2ZW50KSkge1xuICAgICAgICB2YXIgYXBwZW5kYWJsZUNvbnRhaW5lciA9IHRoaXMuZ2V0QXBwZW5kYWJsZUNvbnRhaW5lcih7IHNvdXJjZTogdGhpcy5zb3VyY2UgfSk7XG4gICAgICAgIHRoaXMubWlycm9yID0gdGhpcy5zb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgIHZhciBtaXJyb3JDcmVhdGVkRXZlbnQgPSBuZXcgX21pcnJvckV2ZW50Lk1pcnJvckNyZWF0ZWRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbWlycm9yQXR0YWNoZWRFdmVudCA9IG5ldyBfbWlycm9yRXZlbnQuTWlycm9yQXR0YWNoZWRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChtaXJyb3JDcmVhdGVkRXZlbnQpO1xuICAgICAgICBhcHBlbmRhYmxlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubWlycm9yKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobWlycm9yQXR0YWNoZWRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignYm9keTpkcmFnZ2luZycpKTtcblxuICAgICAgaWYgKHRoaXMubWlycm9yKSB7XG4gICAgICAgIHZhciBtaXJyb3JNb3ZlRXZlbnQgPSBuZXcgX21pcnJvckV2ZW50Lk1pcnJvck1vdmVFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChtaXJyb3JNb3ZlRXZlbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIHRoZSBjbG9zZXN0IHNjcm9sbGFibGUgcGFyZW50XG4gICAgICB0aGlzLnNjcm9sbGFibGVQYXJlbnQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGNvbnRhaW5lciwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IDwgZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICB9KTtcblxuICAgICAgdmFyIGRyYWdFdmVudCA9IG5ldyBfZHJhZ0V2ZW50LkRyYWdTdGFydEV2ZW50KHtcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdFdmVudCk7XG5cbiAgICAgIGlmICghZHJhZ0V2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taXJyb3IpIHtcbiAgICAgICAgdGhpcy5taXJyb3IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm1pcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignYm9keTpkcmFnZ2luZycpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyRXZlbnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyRXZlbnQoZXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyaWdnZXIoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RyYWdNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciBjb250YWluZXIgPSBzZW5zb3JFdmVudC5jb250YWluZXI7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBzZW5zb3JFdmVudC50YXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ01vdmVFdmVudCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXJFdmVudChkcmFnTW92ZUV2ZW50KTtcblxuICAgICAgaWYgKGRyYWdNb3ZlRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWlycm9yICYmICFkcmFnTW92ZUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgdmFyIG1pcnJvck1vdmVFdmVudCA9IG5ldyBfbWlycm9yRXZlbnQuTWlycm9yTW92ZUV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG1pcnJvck1vdmVFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRhcmdldCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcbiAgICAgIHZhciBvdmVyQ29udGFpbmVyID0gc2Vuc29yRXZlbnQub3ZlckNvbnRhaW5lciB8fCB0aGlzLmNsb3Nlc3RDb250YWluZXIoc2Vuc29yRXZlbnQudGFyZ2V0KTtcbiAgICAgIHZhciBpc0xlYXZpbmdDb250YWluZXIgPSB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyICYmIG92ZXJDb250YWluZXIgIT09IHRoaXMuY3VycmVudE92ZXJDb250YWluZXI7XG4gICAgICB2YXIgaXNMZWF2aW5nRHJhZ2dhYmxlID0gdGhpcy5jdXJyZW50T3ZlciAmJiB0YXJnZXQgIT09IHRoaXMuY3VycmVudE92ZXI7XG4gICAgICB2YXIgaXNPdmVyQ29udGFpbmVyID0gb3ZlckNvbnRhaW5lciAmJiB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyICE9PSBvdmVyQ29udGFpbmVyO1xuICAgICAgdmFyIGlzT3ZlckRyYWdnYWJsZSA9IHRhcmdldCAmJiB0aGlzLmN1cnJlbnRPdmVyICE9PSB0YXJnZXQ7XG5cbiAgICAgIGlmIChpc0xlYXZpbmdEcmFnZ2FibGUpIHtcbiAgICAgICAgdmFyIGRyYWdPdXRFdmVudCA9IG5ldyBfZHJhZ0V2ZW50LkRyYWdPdXRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyOiB0aGlzLmN1cnJlbnRPdmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdPdXRFdmVudCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3Zlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcmFnZ2FibGU6b3ZlcicpKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlciA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0xlYXZpbmdDb250YWluZXIpIHtcbiAgICAgICAgdmFyIGRyYWdPdXRDb250YWluZXJFdmVudCA9IG5ldyBfZHJhZ0V2ZW50LkRyYWdPdXRDb250YWluZXJFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyQ29udGFpbmVyOiB0aGlzLm92ZXJDb250YWluZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ091dENvbnRhaW5lckV2ZW50KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpvdmVyJykpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzT3ZlckNvbnRhaW5lcikge1xuICAgICAgICBvdmVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpvdmVyJykpO1xuXG4gICAgICAgIHZhciBkcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ092ZXJDb250YWluZXJFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyQ29udGFpbmVyOiBvdmVyQ29udGFpbmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdPdmVyQ29udGFpbmVyRXZlbnQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgPSBvdmVyQ29udGFpbmVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNPdmVyRHJhZ2dhYmxlKSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcmFnZ2FibGU6b3ZlcicpKTtcblxuICAgICAgICB2YXIgZHJhZ092ZXJFdmVudCA9IG5ldyBfZHJhZ0V2ZW50LkRyYWdPdmVyRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgICAgb3ZlckNvbnRhaW5lcjogb3ZlckNvbnRhaW5lcixcbiAgICAgICAgICBvdmVyOiB0YXJnZXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ092ZXJFdmVudCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlciA9IHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkcmFnU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYWdTdG9wKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ1N0b3BFdmVudCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgIHNlbnNvckV2ZW50OiBldmVudC5zZW5zb3JFdmVudCxcbiAgICAgICAgc291cmNlQ29udGFpbmVyOiB0aGlzLnNvdXJjZUNvbnRhaW5lclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLnNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgICB0aGlzLnNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6cGxhY2VkJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOnBsYWNlZCcpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignYm9keTpkcmFnZ2luZycpKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudE92ZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50T3Zlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcmFnZ2FibGU6b3ZlcicpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudE92ZXJDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6b3ZlcicpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWlycm9yKSB7XG4gICAgICAgIHZhciBtaXJyb3JEZXN0cm95RXZlbnQgPSBuZXcgX21pcnJvckV2ZW50Lk1pcnJvckRlc3Ryb3lFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogc2Vuc29yRXZlbnQuY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChtaXJyb3JEZXN0cm95RXZlbnQpO1xuXG4gICAgICAgIGlmICghbWlycm9yRGVzdHJveUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgICB0aGlzLm1pcnJvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubWlycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgbGFzdFNvdXJjZSA9IHRoaXMuc291cmNlO1xuICAgICAgdmFyIGxhc3RTb3VyY2VDb250YWluZXIgPSB0aGlzLnNvdXJjZUNvbnRhaW5lcjtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChsYXN0U291cmNlKSB7XG4gICAgICAgICAgbGFzdFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKF90aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0U291cmNlQ29udGFpbmVyKSB7XG4gICAgICAgICAgbGFzdFNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKF90aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOnBsYWNlZCcpKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5vcHRpb25zLnBsYWNlZFRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgICB0aGlzLm1pcnJvciA9IG51bGw7XG4gICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuY3VycmVudE92ZXIgPSBudWxsO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIgPSBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RyYWdQcmVzc3VyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYWdQcmVzc3VyZShldmVudCkge1xuICAgICAgdmFyIHNlbnNvckV2ZW50ID0gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpO1xuICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuc291cmNlIHx8ICgwLCBfdXRpbHMuY2xvc2VzdCkoc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX2RyYWdFdmVudC5EcmFnUHJlc3N1cmVFdmVudCh7XG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgIHByZXNzdXJlOiBzZW5zb3JFdmVudC5wcmVzc3VyZVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdQcmVzc3VyZUV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRBcHBlbmRhYmxlQ29udGFpbmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QXBwZW5kYWJsZUNvbnRhaW5lcihfcmVmKSB7XG4gICAgICB2YXIgc291cmNlID0gX3JlZi5zb3VyY2U7XG5cbiAgICAgIHZhciBhcHBlbmRUbyA9IHRoaXMub3B0aW9ucy5hcHBlbmRUbztcblxuICAgICAgaWYgKHR5cGVvZiBhcHBlbmRUbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXBwZW5kVG8pO1xuICAgICAgfSBlbHNlIGlmIChhcHBlbmRUbyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBhcHBlbmRUbztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBhcHBlbmRUbyhzb3VyY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2xhc3NOYW1lRm9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lRm9yKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xhc3Nlc1tuYW1lXSB8fCBkZWZhdWx0cy5jbGFzc2VzW25hbWVdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Nsb3Nlc3RDb250YWluZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZXN0Q29udGFpbmVyKHRhcmdldCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb243ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNyA9IGZhbHNlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I3ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNyA9IF90aGlzMi5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA3OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb243ID0gKF9zdGVwNyA9IF9pdGVyYXRvcjcubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjcgPSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyRWwgPSBfc3RlcDcudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBjb250YWluZXJFbCkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yNyA9IHRydWU7XG4gICAgICAgICAgX2l0ZXJhdG9yRXJyb3I3ID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb243ICYmIF9pdGVyYXRvcjcucmV0dXJuKSB7XG4gICAgICAgICAgICAgIF9pdGVyYXRvcjcucmV0dXJuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ2dhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcmFnZ2FibGU7XG5cblxuZnVuY3Rpb24gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LmRldGFpbDtcbn1cblxuZnVuY3Rpb24gaXNEcmFnRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuICgvXmRyYWcvLnRlc3QoZXZlbnQudHlwZSlcbiAgKTtcbn1cblxuLyoqKi8gfSksXG4vKiAxOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0b3BTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQgPSBleHBvcnRzLlNlbnNvckV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9hYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9hYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU2Vuc29yRXZlbnQgPSBleHBvcnRzLlNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNlbnNvckV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTZW5zb3JFdmVudCwgW3tcbiAgICBrZXk6ICdvcmlnaW5hbEV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3JpZ2luYWxFdmVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjbGllbnRYJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY2xpZW50WDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjbGllbnRZJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY2xpZW50WTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0YXJnZXQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS50YXJnZXQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY29udGFpbmVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3ByZXNzdXJlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEucHJlc3N1cmU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTZW5zb3JFdmVudDtcbn0oX2Fic3RyYWN0RXZlbnQyLmRlZmF1bHQpO1xuXG52YXIgRHJhZ1N0YXJ0U2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdGFydFNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9TZW5zb3JFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RhcnRTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnU3RhcnRTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RhcnRTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdGFydFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0YXJ0U2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RhcnRTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG5EcmFnU3RhcnRTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6c3RhcnQnO1xuXG52YXIgRHJhZ01vdmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVTZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfU2Vuc29yRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdNb3ZlU2Vuc29yRXZlbnQsIF9TZW5zb3JFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyYWdNb3ZlU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ01vdmVTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdNb3ZlU2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnTW92ZVNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ01vdmVTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG5EcmFnTW92ZVNlbnNvckV2ZW50LnR5cGUgPSAnZHJhZzptb3ZlJztcblxudmFyIERyYWdTdG9wU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdG9wU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RvcFNlbnNvckV2ZW50LCBfU2Vuc29yRXZlbnQzKTtcblxuICBmdW5jdGlvbiBEcmFnU3RvcFNlbnNvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdTdG9wU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU3RvcFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0b3BTZW5zb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdTdG9wU2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuRHJhZ1N0b3BTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6c3RvcCc7XG5cbnZhciBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50NCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnUHJlc3N1cmVTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdQcmVzc3VyZVNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQudHlwZSA9ICdkcmFnOnByZXNzdXJlJztcblxuLyoqKi8gfSksXG4vKiAxOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTZW5zb3IgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNlbnNvcik7XG5cbiAgICB0aGlzLmNvbnRhaW5lcnMgPSBjb250YWluZXJzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndHJpZ2dlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIoZWxlbWVudCwgc2Vuc29yRXZlbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgZXZlbnQuZGV0YWlsID0gc2Vuc29yRXZlbnQ7XG4gICAgICBldmVudC5pbml0RXZlbnQoc2Vuc29yRXZlbnQudHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgdGhpcy5sYXN0RXZlbnQgPSBzZW5zb3JFdmVudDtcbiAgICAgIHJldHVybiBzZW5zb3JFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNlbnNvcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vuc29yO1xuXG4vKioqLyB9KSxcbi8qIDIwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDIxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NilcbiAgLCBlbnVtQnVnS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDIyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiAyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuLyoqKi8gfSksXG4vKiAyNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cbi8qKiovIH0pLFxuLyogMjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cbi8qKiovIH0pLFxuLyogMjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLyoqKi8gfSksXG4vKiAyNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRydWU7XG5cbi8qKiovIH0pLFxuLyogMjggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuICAsIGRQcyAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4OSlcbiAgLCBlbnVtQnVnS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpXG4gICwgSUVfUFJPVE8gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDApKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDgyKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDI5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbmV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKioqLyB9KSxcbi8qIDMwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLmZcbiAgLCBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMikoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHNoYXJlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpKCdrZXlzJylcbiAgLCB1aWQgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDMzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG4gICwgY29yZSAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKVxuICAsIExJQlJBUlkgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNylcbiAgLCB3a3NFeHQgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpXG4gICwgZGVmaW5lUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuZXhwb3J0cy5mID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMik7XG5cbi8qKiovIH0pLFxuLyogMzcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IF9fd2VicGFja19yZXF1aXJlX18oNzIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcxKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc4KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNilcbiAgLCBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNSkuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSAhX193ZWJwYWNrX3JlcXVpcmVfXyg2KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXygyMCkoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuLyoqKi8gfSksXG4vKiA0MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIExJQlJBUlkgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNylcbiAgLCAkZXhwb3J0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG4gICwgcmVkZWZpbmUgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KVxuICAsIGhpZGUgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSlcbiAgLCBoYXMgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBJdGVyYXRvcnMgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg1KVxuICAsIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMClcbiAgLCBnZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oOTEpXG4gICwgSVRFUkFUT1IgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cbi8qKiovIH0pLFxuLyogNDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHBJRSAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOSlcbiAgLCBjcmVhdGVEZXNjICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpXG4gICwgdG9JT2JqZWN0ICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpXG4gICwgdG9QcmltaXRpdmUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KVxuICAsIGhhcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIElFOF9ET01fREVGSU5FID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSlcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IF9fd2VicGFja19yZXF1aXJlX18oNikgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KVxuICAsIGhpZGRlbktleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcblxuLyoqKi8gfSksXG4vKiA0NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4vKioqLyB9KSxcbi8qIDQ2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBoYXMgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgdG9JT2JqZWN0ICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIGFycmF5SW5kZXhPZiA9IF9fd2VicGFja19yZXF1aXJlX18oODApKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzEpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqKi8gfSksXG4vKiA0NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xuXG4vKioqLyB9KSxcbi8qIDQ4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9kcmFnZ2FibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblxudmFyIF9kcmFnZ2FibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhZ2dhYmxlKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xuXG52YXIgX2Ryb3BwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjbGFzc2VzID0ge1xuICAnZHJvcHBhYmxlOmFjdGl2ZSc6ICdkcmFnZ2FibGUtZHJvcHBhYmxlLS1hY3RpdmUnLFxuICAnZHJvcHBhYmxlOm9jY3VwaWVkJzogJ2RyYWdnYWJsZS1kcm9wcGFibGUtLW9jY3VwaWVkJ1xufTtcblxudmFyIERyb3BwYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRHJvcHBhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IF9kcmFnZ2FibGUyLmRlZmF1bHQoY29udGFpbmVycywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl9vbkRyYWdTdGFydCA9IHRoaXMuX29uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnTW92ZSA9IHRoaXMuX29uRHJhZ01vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdTdG9wID0gdGhpcy5fb25EcmFnU3RvcC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCkub24oJ2RyYWc6bW92ZScsIHRoaXMuX29uRHJhZ01vdmUpLm9uKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyb3BwYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6bW92ZScsIHRoaXMuX29uRHJhZ01vdmUpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkuZGVzdHJveSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldENsYXNzTmFtZUZvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsYXNzTmFtZUZvcihuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNsYXNzZXNbbmFtZV0gfHwgY2xhc3Nlc1tuYW1lXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RhcnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcm9wcGFibGVzID0gdGhpcy5fZ2V0RHJvcHBhYmxlcygpO1xuICAgICAgdmFyIGRyb3BwYWJsZSA9IGV2ZW50LnNlbnNvckV2ZW50LnRhcmdldC5jbG9zZXN0KHRoaXMub3B0aW9ucy5kcm9wcGFibGUpO1xuXG4gICAgICBpZiAoIWRyb3BwYWJsZSkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluaXRpYWxEcm9wcGFibGUgPSBkcm9wcGFibGU7XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLmRyb3BwYWJsZXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnQgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJykpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTphY3RpdmUnKSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRyb3BwYWJsZSA9IHRoaXMuX2Nsb3Nlc3REcm9wcGFibGUoZXZlbnQuc2Vuc29yRXZlbnQudGFyZ2V0KTtcbiAgICAgIHZhciBvdmVyRW1wdHlEcm9wcGFibGUgPSBkcm9wcGFibGUgJiYgIWRyb3BwYWJsZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpKTtcblxuICAgICAgaWYgKG92ZXJFbXB0eURyb3BwYWJsZSAmJiB0aGlzLl9kcm9wKGV2ZW50LCBkcm9wcGFibGUpKSB7XG4gICAgICAgIHRoaXMubGFzdERyb3BwYWJsZSA9IGRyb3BwYWJsZTtcbiAgICAgIH0gZWxzZSBpZiAoKCFkcm9wcGFibGUgfHwgZHJvcHBhYmxlID09PSB0aGlzLmluaXRpYWxEcm9wcGFibGUpICYmIHRoaXMubGFzdERyb3BwYWJsZSkge1xuICAgICAgICB0aGlzLl9yZWxlYXNlKGV2ZW50KTtcbiAgICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdG9wKCkge1xuICAgICAgdmFyIG9jY3VwaWVkQ2xhc3MgPSB0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJyk7XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5kcm9wcGFibGVzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGRyb3BwYWJsZSA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgIGRyb3BwYWJsZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6YWN0aXZlJykpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxhc3REcm9wcGFibGUgJiYgdGhpcy5sYXN0RHJvcHBhYmxlICE9PSB0aGlzLmluaXRpYWxEcm9wcGFibGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsRHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUob2NjdXBpZWRDbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJvcHBhYmxlcyA9IG51bGw7XG4gICAgICB0aGlzLmxhc3REcm9wcGFibGUgPSBudWxsO1xuICAgICAgdGhpcy5pbml0aWFsRHJvcHBhYmxlID0gbnVsbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZHJvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9kcm9wKGV2ZW50LCBkcm9wcGFibGUpIHtcbiAgICAgIHZhciBkcm9wcGFibGVPdmVyRXZlbnQgPSBuZXcgX2Ryb3BwYWJsZUV2ZW50LkRyb3BwYWJsZU92ZXJFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGRyb3BwYWJsZTogZHJvcHBhYmxlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KGRyb3BwYWJsZU92ZXJFdmVudCk7XG5cbiAgICAgIGlmIChkcm9wcGFibGVPdmVyRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBvY2N1cGllZENsYXNzID0gdGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpO1xuXG4gICAgICBpZiAodGhpcy5sYXN0RHJvcHBhYmxlKSB7XG4gICAgICAgIHRoaXMubGFzdERyb3BwYWJsZS5jbGFzc0xpc3QucmVtb3ZlKG9jY3VwaWVkQ2xhc3MpO1xuICAgICAgfVxuXG4gICAgICBkcm9wcGFibGUuYXBwZW5kQ2hpbGQoZXZlbnQuc291cmNlKTtcbiAgICAgIGRyb3BwYWJsZS5jbGFzc0xpc3QuYWRkKG9jY3VwaWVkQ2xhc3MpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfcmVsZWFzZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZWxlYXNlKGV2ZW50KSB7XG4gICAgICB2YXIgZHJvcHBhYmxlT3V0RXZlbnQgPSBuZXcgX2Ryb3BwYWJsZUV2ZW50LkRyb3BwYWJsZU91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgZHJvcHBhYmxlOiB0aGlzLmxhc3REcm9wcGFibGVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoZHJvcHBhYmxlT3V0RXZlbnQpO1xuXG4gICAgICBpZiAoZHJvcHBhYmxlT3V0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5pdGlhbERyb3BwYWJsZS5hcHBlbmRDaGlsZChldmVudC5zb3VyY2UpO1xuICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY2xvc2VzdERyb3BwYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jbG9zZXN0RHJvcHBhYmxlKHRhcmdldCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKCF0aGlzLmRyb3BwYWJsZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oX3RoaXMuZHJvcHBhYmxlcykuaW5jbHVkZXMoZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0RHJvcHBhYmxlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXREcm9wcGFibGVzKCkge1xuICAgICAgdmFyIGRyb3BwYWJsZXMgPSB0aGlzLm9wdGlvbnMuZHJvcHBhYmxlO1xuXG4gICAgICBpZiAodHlwZW9mIGRyb3BwYWJsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRyb3BwYWJsZXMpO1xuICAgICAgfSBlbHNlIGlmIChkcm9wcGFibGVzIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZHJvcHBhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBkcm9wcGFibGVzO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZHJvcHBhYmxlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZHJvcHBhYmxlcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJvcHBhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcm9wcGFibGU7XG5cbi8qKiovIH0pLFxuLyogNDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX2RyYWdnYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG52YXIgX2RyYWdnYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmFnZ2FibGUpO1xuXG52YXIgX3NvcnRhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYxKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFNvcnRhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTb3J0YWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IF9kcmFnZ2FibGUyLmRlZmF1bHQoY29udGFpbmVycywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl9vbkRyYWdTdGFydCA9IHRoaXMuX29uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnT3ZlckNvbnRhaW5lciA9IHRoaXMuX29uRHJhZ092ZXJDb250YWluZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdPdmVyID0gdGhpcy5fb25EcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vbignZHJhZzpvdmVyOmNvbnRhaW5lcicsIHRoaXMuX29uRHJhZ092ZXJDb250YWluZXIpLm9uKCdkcmFnOm92ZXInLCB0aGlzLl9vbkRyYWdPdmVyKS5vbignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6b3Zlcjpjb250YWluZXInLCB0aGlzLl9vbkRyYWdPdmVyQ29udGFpbmVyKS5vZmYoJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkuZGVzdHJveSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdGFydChldmVudCkge1xuICAgICAgdGhpcy5zdGFydEluZGV4ID0gaW5kZXgoZXZlbnQuc291cmNlKTtcblxuICAgICAgdmFyIHNvcnRhYmxlU3RhcnRFdmVudCA9IG5ldyBfc29ydGFibGVFdmVudC5Tb3J0YWJsZVN0YXJ0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBzdGFydEluZGV4OiB0aGlzLnN0YXJ0SW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyKHNvcnRhYmxlU3RhcnRFdmVudCk7XG5cbiAgICAgIGlmIChzb3J0YWJsZVN0YXJ0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnT3ZlckNvbnRhaW5lcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdPdmVyQ29udGFpbmVyKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtb3ZlcyA9IG1vdmUoZXZlbnQuc291cmNlLCBldmVudC5vdmVyLCBldmVudC5vdmVyQ29udGFpbmVyKTtcblxuICAgICAgaWYgKCFtb3Zlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3J0YWJsZVNvcnRlZEV2ZW50ID0gbmV3IF9zb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydGVkRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBtb3ZlczogbW92ZXNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc29ydGFibGVTb3J0ZWRFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ092ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnT3ZlcihldmVudCkge1xuICAgICAgaWYgKGV2ZW50Lm92ZXIgPT09IGV2ZW50LnNvdXJjZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtb3ZlcyA9IG1vdmUoZXZlbnQuc291cmNlLCBldmVudC5vdmVyLCBldmVudC5vdmVyQ29udGFpbmVyKTtcblxuICAgICAgaWYgKCFtb3Zlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3J0YWJsZVNvcnRlZEV2ZW50ID0gbmV3IF9zb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydGVkRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBtb3ZlczogbW92ZXNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc29ydGFibGVTb3J0ZWRFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RvcChldmVudCkge1xuICAgICAgdmFyIHNvcnRhYmxlU3RvcEV2ZW50ID0gbmV3IF9zb3J0YWJsZUV2ZW50LlNvcnRhYmxlU3RvcEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgb2xkSW5kZXg6IHRoaXMuc3RhcnRJbmRleCxcbiAgICAgICAgbmV3SW5kZXg6IGluZGV4KGV2ZW50LnNvdXJjZSlcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc29ydGFibGVTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLnN0YXJ0SW5kZXggPSBudWxsO1xuICAgICAgdGhpcy5vZmZzZXQgPSBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNvcnRhYmxlO1xuXG5cbmZ1bmN0aW9uIGluZGV4KGVsZW1lbnQpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuLCBlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gbW92ZShzb3VyY2UsIG92ZXIsIG92ZXJDb250YWluZXIpIHtcbiAgdmFyIGVtcHR5T3ZlckNvbnRhaW5lciA9ICFvdmVyQ29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGRpZmZlcmVudENvbnRhaW5lciA9IG92ZXIgJiYgc291cmNlLnBhcmVudE5vZGUgIT09IG92ZXIucGFyZW50Tm9kZTtcbiAgdmFyIHNhbWVDb250YWluZXIgPSBvdmVyICYmIHNvdXJjZS5wYXJlbnROb2RlID09PSBvdmVyLnBhcmVudE5vZGU7XG5cbiAgaWYgKGVtcHR5T3ZlckNvbnRhaW5lcikge1xuICAgIHJldHVybiBtb3ZlSW5zaWRlRW1wdHlDb250YWluZXIoc291cmNlLCBvdmVyQ29udGFpbmVyKTtcbiAgfSBlbHNlIGlmIChzYW1lQ29udGFpbmVyKSB7XG4gICAgcmV0dXJuIG1vdmVXaXRoaW5Db250YWluZXIoc291cmNlLCBvdmVyKTtcbiAgfSBlbHNlIGlmIChkaWZmZXJlbnRDb250YWluZXIpIHtcbiAgICByZXR1cm4gbW92ZU91dHNpZGVDb250YWluZXIoc291cmNlLCBvdmVyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlSW5zaWRlRW1wdHlDb250YWluZXIoc291cmNlLCBvdmVyQ29udGFpbmVyKSB7XG4gIHZhciBvbGRDb250YWluZXIgPSBzb3VyY2UucGFyZW50Tm9kZTtcbiAgdmFyIG9sZEluZGV4ID0gaW5kZXgoc291cmNlKTtcblxuICBvdmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNvdXJjZSk7XG5cbiAgcmV0dXJuIHsgb2xkSW5kZXg6IG9sZEluZGV4LCBuZXdJbmRleDogaW5kZXgoc291cmNlKSwgb2xkQ29udGFpbmVyOiBvbGRDb250YWluZXIsIG5ld0NvbnRhaW5lcjogb3ZlckNvbnRhaW5lciB9O1xufVxuXG5mdW5jdGlvbiBtb3ZlV2l0aGluQ29udGFpbmVyKHNvdXJjZSwgb3Zlcikge1xuICB2YXIgb2xkSW5kZXggPSBpbmRleChzb3VyY2UpO1xuICB2YXIgbmV3SW5kZXggPSBpbmRleChvdmVyKTtcblxuICBpZiAob2xkSW5kZXggPCBuZXdJbmRleCkge1xuICAgIHNvdXJjZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzb3VyY2UsIG92ZXIubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgfSBlbHNlIHtcbiAgICBzb3VyY2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyKTtcbiAgfVxuXG4gIHJldHVybiB7IG9sZEluZGV4OiBvbGRJbmRleCwgbmV3SW5kZXg6IG5ld0luZGV4LCBvbGRDb250YWluZXI6IHNvdXJjZS5wYXJlbnROb2RlLCBuZXdDb250YWluZXI6IHNvdXJjZS5wYXJlbnROb2RlIH07XG59XG5cbmZ1bmN0aW9uIG1vdmVPdXRzaWRlQ29udGFpbmVyKHNvdXJjZSwgb3Zlcikge1xuICB2YXIgb2xkQ29udGFpbmVyID0gc291cmNlLnBhcmVudE5vZGU7XG4gIHZhciBvbGRJbmRleCA9IGluZGV4KHNvdXJjZSk7XG4gIHZhciBuZXdJbmRleCA9IGluZGV4KG92ZXIpO1xuXG4gIG92ZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyKTtcblxuICByZXR1cm4geyBvbGRJbmRleDogb2xkSW5kZXgsIG5ld0luZGV4OiBuZXdJbmRleCwgb2xkQ29udGFpbmVyOiBvbGRDb250YWluZXIsIG5ld0NvbnRhaW5lcjogc291cmNlLnBhcmVudE5vZGUgfTtcbn1cblxuLyoqKi8gfSksXG4vKiA1MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfZHJhZ2dhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cbnZhciBfZHJhZ2dhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYWdnYWJsZSk7XG5cbnZhciBfc3dhcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN3YXBwYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3dhcHBhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IF9kcmFnZ2FibGUyLmRlZmF1bHQoY29udGFpbmVycywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl9vbkRyYWdTdGFydCA9IHRoaXMuX29uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnT3ZlciA9IHRoaXMuX29uRHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdTdG9wID0gdGhpcy5fb25EcmFnU3RvcC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCkub24oJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9uKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBwYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkuZGVzdHJveSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdGFydChldmVudCkge1xuICAgICAgdmFyIHN3YXBwYWJsZVN0YXJ0RXZlbnQgPSBuZXcgX3N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN0YXJ0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KHN3YXBwYWJsZVN0YXJ0RXZlbnQpO1xuXG4gICAgICBpZiAoc3dhcHBhYmxlU3RhcnRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5vdmVyID09PSBldmVudC5zb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxhc3RPdmVyICYmIHRoaXMubGFzdE92ZXIgIT09IGV2ZW50Lm92ZXIpIHtcbiAgICAgICAgc3dhcCh0aGlzLmxhc3RPdmVyLCBldmVudC5zb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RPdmVyID0gZXZlbnQub3ZlcjtcblxuICAgICAgc3dhcChldmVudC5zb3VyY2UsIGV2ZW50Lm92ZXIpO1xuXG4gICAgICAvLyBMZXQgdGhpcyBjYW5jZWwgdGhlIGFjdHVhbCBzd2FwXG4gICAgICB2YXIgc3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gbmV3IF9zd2FwcGFibGVFdmVudC5Td2FwcGFibGVTd2FwcGVkRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBzd2FwcGVkRWxlbWVudDogZXZlbnQub3ZlclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChzd2FwcGFibGVTd2FwcGVkRXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdG9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0b3AoZXZlbnQpIHtcbiAgICAgIHZhciBzd2FwcGFibGVTdG9wRXZlbnQgPSBuZXcgX3N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN0b3BFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc3dhcHBhYmxlU3RvcEV2ZW50KTtcbiAgICAgIHRoaXMubGFzdE92ZXIgPSBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3dhcHBhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTd2FwcGFibGU7XG5cblxuZnVuY3Rpb24gd2l0aFRlbXBFbGVtZW50KGNhbGxiYWNrKSB7XG4gIHZhciB0bXBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNhbGxiYWNrKHRtcEVsZW1lbnQpO1xuICB0bXBFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodG1wRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHN3YXAoc291cmNlLCBvdmVyKSB7XG4gIHZhciBvdmVyUGFyZW50ID0gb3Zlci5wYXJlbnROb2RlO1xuICB2YXIgc291cmNlUGFyZW50ID0gc291cmNlLnBhcmVudE5vZGU7XG5cbiAgd2l0aFRlbXBFbGVtZW50KGZ1bmN0aW9uICh0bXBFbGVtZW50KSB7XG4gICAgc291cmNlUGFyZW50Lmluc2VydEJlZm9yZSh0bXBFbGVtZW50LCBzb3VyY2UpO1xuICAgIG92ZXJQYXJlbnQuaW5zZXJ0QmVmb3JlKHNvdXJjZSwgb3Zlcik7XG4gICAgc291cmNlUGFyZW50Lmluc2VydEJlZm9yZShvdmVyLCB0bXBFbGVtZW50KTtcbiAgfSk7XG59XG5cbi8qKiovIH0pLFxuLyogNTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cbnZhciBfY29sbGlkYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBDb2xsaWRhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDb2xsaWRhYmxlKGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIENvbGxpZGFibGUpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLl9vbkRyYWdNb3ZlID0gdGhpcy5fb25EcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB0aGlzLl9vblJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ29sbGlkYWJsZSwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzptb3ZlJywgdGhpcy5fb25EcmFnTW92ZSk7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOm1vdmUnLCB0aGlzLl9vbkRyYWdNb3ZlKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ01vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnTW92ZShldmVudCkge1xuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnNlbnNvckV2ZW50LnRhcmdldDtcblxuICAgICAgdGhpcy5jdXJyZW50QW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGFyZ2V0KSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQpIHtcbiAgICAgICAgZXZlbnQuY2FuY2VsKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb2xsaWRhYmxlSW5FdmVudCA9IG5ldyBfY29sbGlkYWJsZUV2ZW50LkNvbGxpZGFibGVJbkV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY29sbGlkaW5nRWxlbWVudDogdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50XG4gICAgICB9KTtcblxuICAgICAgdmFyIGNvbGxpZGFibGVPdXRFdmVudCA9IG5ldyBfY29sbGlkYWJsZUV2ZW50LkNvbGxpZGFibGVPdXRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGNvbGxpZGluZ0VsZW1lbnQ6IHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZW50ZXJpbmdDb2xsaWRhYmxlID0gQm9vbGVhbih0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQgJiYgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCAhPT0gdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50KTtcbiAgICAgIHZhciBsZWF2aW5nQ29sbGlkYWJsZSA9IEJvb2xlYW4oIXRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCAmJiB0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50KTtcblxuICAgICAgaWYgKGVudGVyaW5nQ29sbGlkYWJsZSkge1xuICAgICAgICBpZiAodGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChjb2xsaWRhYmxlT3V0RXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KGNvbGxpZGFibGVJbkV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAobGVhdmluZ0NvbGxpZGFibGUpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KGNvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQgPSB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RvcChldmVudCkge1xuICAgICAgdmFyIGxhc3RDb2xsaWRpbmdFbGVtZW50ID0gdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50IHx8IHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQ7XG4gICAgICB2YXIgY29sbGlkYWJsZU91dEV2ZW50ID0gbmV3IF9jb2xsaWRhYmxlRXZlbnQuQ29sbGlkYWJsZU91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY29sbGlkaW5nRWxlbWVudDogbGFzdENvbGxpZGluZ0VsZW1lbnRcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobGFzdENvbGxpZGluZ0VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KGNvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGFyZ2V0KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGlkYWJsZXMgPSBfdGhpcy5fZ2V0Q29sbGlkYWJsZXMoKTtcbiAgICAgICAgX3RoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiBjb2xsaWRhYmxlcy5pbmNsdWRlcyhlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRDb2xsaWRhYmxlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRDb2xsaWRhYmxlcygpIHtcbiAgICAgIHZhciBjb2xsaWRhYmxlcyA9IHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuY29sbGlkYWJsZXM7XG5cbiAgICAgIGlmICh0eXBlb2YgY29sbGlkYWJsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbGxpZGFibGVzKSk7XG4gICAgICB9IGVsc2UgaWYgKGNvbGxpZGFibGVzIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgY29sbGlkYWJsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY29sbGlkYWJsZXMpO1xuICAgICAgfSBlbHNlIGlmIChjb2xsaWRhYmxlcyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBbY29sbGlkYWJsZXNdO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29sbGlkYWJsZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxpZGFibGVzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xsaWRhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb2xsaWRhYmxlO1xuXG4vKioqLyB9KSxcbi8qIDUyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9zbmFwcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNjApO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU25hcHBhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTbmFwcGFibGUoZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU25hcHBhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuXG4gICAgdGhpcy5fb25EcmFnU3RhcnQgPSB0aGlzLl9vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnT3ZlciA9IHRoaXMuX29uRHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdPdXQgPSB0aGlzLl9vbkRyYWdPdXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNuYXBwYWJsZSwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vbignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkub24oJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9uKCdkcmFnOm91dCcsIHRoaXMuX29uRHJhZ091dCkub24oJ2Ryb3BwYWJsZTpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub24oJ2Ryb3BwYWJsZTpvdXQnLCB0aGlzLl9vbkRyYWdPdXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6c3RvcCcsIHRoaXMuX29uRHJhZ1N0b3ApLm9mZignZHJhZzpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub2ZmKCdkcmFnOm91dCcsIHRoaXMuX29uRHJhZ091dCkub2ZmKCdkcm9wcGFibGU6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJvcHBhYmxlOm91dCcsIHRoaXMuX29uRHJhZ091dCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyc3RTb3VyY2UgPSBldmVudC5zb3VyY2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RvcCgpIHtcbiAgICAgIHRoaXMuZmlyc3RTb3VyY2UgPSBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNvdXJjZSA9IGV2ZW50LnNvdXJjZSB8fCBldmVudC5kcmFnRXZlbnQuc291cmNlO1xuICAgICAgdmFyIG1pcnJvciA9IGV2ZW50Lm1pcnJvciB8fCBldmVudC5kcmFnRXZlbnQubWlycm9yO1xuXG4gICAgICBpZiAoc291cmNlID09PSB0aGlzLmZpcnN0U291cmNlKSB7XG4gICAgICAgIHRoaXMuZmlyc3RTb3VyY2UgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzbmFwSW5FdmVudCA9IG5ldyBfc25hcHBhYmxlRXZlbnQuU25hcEluRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KHNuYXBJbkV2ZW50KTtcblxuICAgICAgaWYgKHNuYXBJbkV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobWlycm9yKSB7XG4gICAgICAgIG1pcnJvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICBzb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKF90aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpwbGFjZWQnKSk7XG4gICAgICB9LCB0aGlzLmRyYWdnYWJsZS5vcHRpb25zLnBsYWNlZFRpbWVvdXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnT3V0KGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtaXJyb3IgPSBldmVudC5taXJyb3IgfHwgZXZlbnQuZHJhZ0V2ZW50Lm1pcnJvcjtcbiAgICAgIHZhciBzb3VyY2UgPSBldmVudC5zb3VyY2UgfHwgZXZlbnQuZHJhZ0V2ZW50LnNvdXJjZTtcblxuICAgICAgdmFyIHNuYXBPdXRFdmVudCA9IG5ldyBfc25hcHBhYmxlRXZlbnQuU25hcE91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChzbmFwT3V0RXZlbnQpO1xuXG4gICAgICBpZiAoc25hcE91dEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobWlycm9yKSB7XG4gICAgICAgIG1pcnJvci5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU25hcHBhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTbmFwcGFibGU7XG5cbi8qKiovIH0pLFxuLyogNTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgQVJJQV9HUkFCQkVEID0gJ2FyaWEtZ3JhYmJlZCc7XG52YXIgQVJJQV9EUk9QRUZGRUNUID0gJ2FyaWEtZHJvcGVmZmVjdCc7XG52YXIgVEFCSU5ERVggPSAndGFiaW5kZXgnO1xuXG52YXIgQWNjZXNzaWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQWNjZXNzaWJpbGl0eShkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBBY2Nlc3NpYmlsaXR5KTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuXG4gICAgdGhpcy5fb25Jbml0ID0gdGhpcy5fb25Jbml0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EZXN0cm95ID0gdGhpcy5fb25EZXN0cm95LmJpbmQodGhpcyk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShBY2Nlc3NpYmlsaXR5LCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdpbml0JywgdGhpcy5fb25Jbml0KS5vbignZGVzdHJveScsIHRoaXMuX29uRGVzdHJveSkub24oJ2RyYWc6c3RhcnQnLCBfb25EcmFnU3RhcnQpLm9uKCdkcmFnOnN0b3AnLCBfb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdpbml0JywgdGhpcy5fb25Jbml0KS5vZmYoJ2Rlc3Ryb3knLCB0aGlzLl9vbkRlc3Ryb3kpLm9mZignZHJhZzpzdGFydCcsIF9vbkRyYWdTdGFydCkub2ZmKCdkcmFnOnN0b3AnLCBfb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uSW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkluaXQoX3JlZikge1xuICAgICAgdmFyIGNvbnRhaW5lcnMgPSBfcmVmLmNvbnRhaW5lcnM7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKEFSSUFfRFJPUEVGRkVDVCwgdGhpcy5kcmFnZ2FibGUub3B0aW9ucy50eXBlKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuZHJhZ2dhYmxlKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShUQUJJTkRFWCwgMCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EZXN0cm95KF9yZWYyKSB7XG4gICAgICB2YXIgY29udGFpbmVycyA9IF9yZWYyLmNvbnRhaW5lcnM7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IGNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAzLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShBUklBX0RST1BFRkZFQ1QpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yNCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5kcmFnZ2FibGUub3B0aW9ucy5kcmFnZ2FibGUpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA0OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gKF9zdGVwNCA9IF9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFRBQklOREVYLCAwKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoQVJJQV9HUkFCQkVELCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjQgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3I0ID0gZXJyO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ICYmIF9pdGVyYXRvcjQucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yNC5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNCkge1xuICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMyA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMy5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQWNjZXNzaWJpbGl0eTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQWNjZXNzaWJpbGl0eTtcblxuXG5mdW5jdGlvbiBfb25EcmFnU3RhcnQoX3JlZjMpIHtcbiAgdmFyIHNvdXJjZSA9IF9yZWYzLnNvdXJjZTtcblxuICBzb3VyY2Uuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIF9vbkRyYWdTdG9wKF9yZWY0KSB7XG4gIHZhciBzb3VyY2UgPSBfcmVmNC5zb3VyY2U7XG5cbiAgc291cmNlLnNldEF0dHJpYnV0ZShBUklBX0dSQUJCRUQsIGZhbHNlKTtcbn1cblxuLyoqKi8gfSksXG4vKiA1NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBNaXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1pcnJvcihkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3IpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLl9vbk1pcnJvckNyZWF0ZWQgPSB0aGlzLl9vbk1pcnJvckNyZWF0ZWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbk1pcnJvck1vdmUgPSB0aGlzLl9vbk1pcnJvck1vdmUuYmluZCh0aGlzKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE1pcnJvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignbWlycm9yOmNyZWF0ZWQnLCB0aGlzLl9vbk1pcnJvckNyZWF0ZWQpLm9uKCdtaXJyb3I6Y3JlYXRlZCcsIG9uTWlycm9yQ3JlYXRlZCkub24oJ21pcnJvcjptb3ZlJywgdGhpcy5fb25NaXJyb3JNb3ZlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ21pcnJvcjpjcmVhdGVkJywgdGhpcy5fb25NaXJyb3JDcmVhdGVkKS5vZmYoJ21pcnJvcjpjcmVhdGVkJywgb25NaXJyb3JDcmVhdGVkKS5vZmYoJ21pcnJvcjptb3ZlJywgdGhpcy5fb25NaXJyb3JNb3ZlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25NaXJyb3JDcmVhdGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTWlycm9yQ3JlYXRlZChfcmVmKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgbWlycm9yID0gX3JlZi5taXJyb3IsXG4gICAgICAgICAgc291cmNlID0gX3JlZi5zb3VyY2UsXG4gICAgICAgICAgc2Vuc29yRXZlbnQgPSBfcmVmLnNlbnNvckV2ZW50O1xuXG4gICAgICB2YXIgbWlycm9yQ2xhc3MgPSB0aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ21pcnJvcicpO1xuXG4gICAgICB2YXIgc2V0U3RhdGUgPSBmdW5jdGlvbiBzZXRTdGF0ZShkYXRhKSB7XG4gICAgICAgIF90aGlzLm1pcnJvck9mZnNldCA9IGRhdGEubWlycm9yT2Zmc2V0O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH07XG5cbiAgICAgIFByb21pc2UucmVzb2x2ZSh7IG1pcnJvcjogbWlycm9yLCBzb3VyY2U6IHNvdXJjZSwgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LCBtaXJyb3JDbGFzczogbWlycm9yQ2xhc3MgfSkudGhlbihjb21wdXRlTWlycm9yRGltZW5zaW9ucykudGhlbihjYWxjdWxhdGVNaXJyb3JPZmZzZXQpLnRoZW4oYWRkTWlycm9yQ2xhc3NlcykudGhlbihwb3NpdGlvbk1pcnJvcigpKS50aGVuKHJlbW92ZU1pcnJvcklEKS50aGVuKHNldFN0YXRlKS5jYXRjaCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1pcnJvck1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25NaXJyb3JNb3ZlKF9yZWYyKSB7XG4gICAgICB2YXIgbWlycm9yID0gX3JlZjIubWlycm9yLFxuICAgICAgICAgIHNlbnNvckV2ZW50ID0gX3JlZjIuc2Vuc29yRXZlbnQ7XG5cbiAgICAgIFByb21pc2UucmVzb2x2ZSh7IG1pcnJvcjogbWlycm9yLCBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsIG1pcnJvck9mZnNldDogdGhpcy5taXJyb3JPZmZzZXQgfSkudGhlbihwb3NpdGlvbk1pcnJvcih7IHJhZjogdHJ1ZSB9KSkuY2F0Y2goKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1pcnJvcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTWlycm9yO1xuXG5cbmZ1bmN0aW9uIG9uTWlycm9yQ3JlYXRlZChfcmVmMykge1xuICB2YXIgbWlycm9yID0gX3JlZjMubWlycm9yLFxuICAgICAgc291cmNlID0gX3JlZjMuc291cmNlO1xuXG4gIFByb21pc2UucmVzb2x2ZSh7IG1pcnJvcjogbWlycm9yLCBzb3VyY2U6IHNvdXJjZSB9KS50aGVuKHJlc2V0TWlycm9yKS5jYXRjaCgpO1xufVxuXG5mdW5jdGlvbiByZXNldE1pcnJvcihkYXRhKSB7XG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHZhciBtaXJyb3IgPSBkYXRhLm1pcnJvcixcbiAgICAgICAgc291cmNlID0gZGF0YS5zb3VyY2U7XG5cblxuICAgIG1pcnJvci5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgbWlycm9yLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgbWlycm9yLnN0eWxlLnRvcCA9IDA7XG4gICAgbWlycm9yLnN0eWxlLmxlZnQgPSAwO1xuICAgIG1pcnJvci5zdHlsZS53aWR0aCA9IHNvdXJjZS5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgbWlycm9yLnN0eWxlLmhlaWdodCA9IHNvdXJjZS5vZmZzZXRIZWlnaHQgKyAncHgnO1xuXG4gICAgcmVzb2x2ZShkYXRhKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVNaXJyb3JEaW1lbnNpb25zKGRhdGEpIHtcbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIHNvdXJjZSA9IGRhdGEuc291cmNlO1xuXG4gICAgdmFyIHNvdXJjZVJlY3QgPSBzb3VyY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IHNvdXJjZVJlY3Q6IHNvdXJjZVJlY3QgfSkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlTWlycm9yT2Zmc2V0KGRhdGEpIHtcbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIHNlbnNvckV2ZW50ID0gZGF0YS5zZW5zb3JFdmVudCxcbiAgICAgICAgc291cmNlUmVjdCA9IGRhdGEuc291cmNlUmVjdDtcblxuICAgIHZhciBtaXJyb3JPZmZzZXQgPSB7IHRvcDogc2Vuc29yRXZlbnQuY2xpZW50WSAtIHNvdXJjZVJlY3QudG9wLCBsZWZ0OiBzZW5zb3JFdmVudC5jbGllbnRYIC0gc291cmNlUmVjdC5sZWZ0IH07XG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IG1pcnJvck9mZnNldDogbWlycm9yT2Zmc2V0IH0pKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZE1pcnJvckNsYXNzZXMoZGF0YSkge1xuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgbWlycm9yID0gZGF0YS5taXJyb3IsXG4gICAgICAgIG1pcnJvckNsYXNzID0gZGF0YS5taXJyb3JDbGFzcztcblxuICAgIG1pcnJvci5jbGFzc0xpc3QuYWRkKG1pcnJvckNsYXNzKTtcbiAgICByZXNvbHZlKGRhdGEpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTWlycm9ySUQoZGF0YSkge1xuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgbWlycm9yID0gZGF0YS5taXJyb3I7XG5cbiAgICBtaXJyb3IucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgIGRlbGV0ZSBtaXJyb3IuaWQ7XG4gICAgcmVzb2x2ZShkYXRhKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uTWlycm9yKCkge1xuICB2YXIgX3JlZjQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuICAgICAgX3JlZjQkd2l0aEZyYW1lID0gX3JlZjQud2l0aEZyYW1lLFxuICAgICAgd2l0aEZyYW1lID0gX3JlZjQkd2l0aEZyYW1lID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWY0JHdpdGhGcmFtZTtcblxuICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIHZhciBtaXJyb3IgPSBkYXRhLm1pcnJvcixcbiAgICAgICAgICBzZW5zb3JFdmVudCA9IGRhdGEuc2Vuc29yRXZlbnQsXG4gICAgICAgICAgbWlycm9yT2Zmc2V0ID0gZGF0YS5taXJyb3JPZmZzZXQ7XG5cblxuICAgICAgaWYgKG1pcnJvck9mZnNldCkge1xuICAgICAgICB2YXIgeCA9IHNlbnNvckV2ZW50LmNsaWVudFggLSBtaXJyb3JPZmZzZXQubGVmdDtcbiAgICAgICAgdmFyIHkgPSBzZW5zb3JFdmVudC5jbGllbnRZIC0gbWlycm9yT2Zmc2V0LnRvcDtcblxuICAgICAgICBtaXJyb3Iuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMCknO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH0sIHsgZnJhbWU6IHdpdGhGcmFtZSB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd2l0aFByb21pc2UoY2FsbGJhY2spIHtcbiAgdmFyIF9yZWY1ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgIF9yZWY1JHJhZiA9IF9yZWY1LnJhZixcbiAgICAgIHJhZiA9IF9yZWY1JHJhZiA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmNSRyYWY7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAocmFmKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHJlc29sdmUsIHJlamVjdCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqKi8gfSksXG4vKiA1NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Db2xsaWRhYmxlT3V0RXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVJbkV2ZW50ID0gZXhwb3J0cy5Db2xsaWRhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWJzdHJhY3RFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBDb2xsaWRhYmxlRXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDb2xsaWRhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBDb2xsaWRhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ29sbGlkYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ29sbGlkYWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sbGlkYWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShDb2xsaWRhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29sbGlkYWJsZUV2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbkNvbGxpZGFibGVFdmVudC50eXBlID0gJ2NvbGxpZGFibGUnO1xuXG52YXIgQ29sbGlkYWJsZUluRXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVJbkV2ZW50ID0gZnVuY3Rpb24gKF9Db2xsaWRhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoQ29sbGlkYWJsZUluRXZlbnQsIF9Db2xsaWRhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIENvbGxpZGFibGVJbkV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIENvbGxpZGFibGVJbkV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ29sbGlkYWJsZUluRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsaWRhYmxlSW5FdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ29sbGlkYWJsZUluRXZlbnQsIFt7XG4gICAga2V5OiAnY29sbGlkaW5nRWxlbWVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmNvbGxpZGluZ0VsZW1lbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xsaWRhYmxlSW5FdmVudDtcbn0oQ29sbGlkYWJsZUV2ZW50KTtcblxuQ29sbGlkYWJsZUluRXZlbnQudHlwZSA9ICdjb2xsaWRhYmxlOmluJztcblxudmFyIENvbGxpZGFibGVPdXRFdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZU91dEV2ZW50ID0gZnVuY3Rpb24gKF9Db2xsaWRhYmxlRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKENvbGxpZGFibGVPdXRFdmVudCwgX0NvbGxpZGFibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIENvbGxpZGFibGVPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBDb2xsaWRhYmxlT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChDb2xsaWRhYmxlT3V0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsaWRhYmxlT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENvbGxpZGFibGVPdXRFdmVudCwgW3tcbiAgICBrZXk6ICdjb2xsaWRpbmdFbGVtZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY29sbGlkaW5nRWxlbWVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbGxpZGFibGVPdXRFdmVudDtcbn0oQ29sbGlkYWJsZUV2ZW50KTtcblxuQ29sbGlkYWJsZU91dEV2ZW50LnR5cGUgPSAnY29sbGlkYWJsZTpvdXQnO1xuXG4vKioqLyB9KSxcbi8qIDU2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRyYWdTdG9wRXZlbnQgPSBleHBvcnRzLkRyYWdQcmVzc3VyZUV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0RXZlbnQgPSBleHBvcnRzLkRyYWdPdXRDb250YWluZXJFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0RXZlbnQgPSBleHBvcnRzLkRyYWdFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIERyYWdFdmVudCA9IGV4cG9ydHMuRHJhZ0V2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdFdmVudCwgW3tcbiAgICBrZXk6ICdoYXNNaXJyb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNNaXJyb3IoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLm1pcnJvcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc291cmNlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ21pcnJvcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm1pcnJvcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzb3VyY2VDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2VDb250YWluZXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29yRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zZW5zb3JFdmVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbEV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIGlmICh0aGlzLnNlbnNvckV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvckV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ0V2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbnZhciBEcmFnU3RhcnRFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0RXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RhcnRFdmVudCwgX0RyYWdFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1N0YXJ0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1N0YXJ0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU3RhcnRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdTdGFydEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1N0YXJ0RXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbkRyYWdTdGFydEV2ZW50LnR5cGUgPSAnZHJhZzpzdGFydCc7XG5cbnZhciBEcmFnTW92ZUV2ZW50ID0gZXhwb3J0cy5EcmFnTW92ZUV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdNb3ZlRXZlbnQsIF9EcmFnRXZlbnQyKTtcblxuICBmdW5jdGlvbiBEcmFnTW92ZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdNb3ZlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnTW92ZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ01vdmVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdNb3ZlRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbkRyYWdNb3ZlRXZlbnQudHlwZSA9ICdkcmFnOm1vdmUnO1xuXG52YXIgRHJhZ091dENvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0Q29udGFpbmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ091dENvbnRhaW5lckV2ZW50LCBfRHJhZ0V2ZW50Myk7XG5cbiAgZnVuY3Rpb24gRHJhZ091dENvbnRhaW5lckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdXRDb250YWluZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdXRDb250YWluZXJFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdPdXRDb250YWluZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ091dENvbnRhaW5lckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ091dENvbnRhaW5lckV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG5EcmFnT3V0Q29udGFpbmVyRXZlbnQudHlwZSA9ICdkcmFnOm91dDpjb250YWluZXInO1xuXG52YXIgRHJhZ091dEV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0RXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ091dEV2ZW50LCBfRHJhZ0V2ZW50NCk7XG5cbiAgZnVuY3Rpb24gRHJhZ091dEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdXRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdPdXRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ091dEV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ292ZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ091dEV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG5EcmFnT3V0RXZlbnQudHlwZSA9ICdkcmFnOm91dCc7XG5cbnZhciBEcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ1KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdPdmVyQ29udGFpbmVyRXZlbnQsIF9EcmFnRXZlbnQ1KTtcblxuICBmdW5jdGlvbiBEcmFnT3ZlckNvbnRhaW5lckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdmVyQ29udGFpbmVyRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnT3ZlckNvbnRhaW5lckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ092ZXJDb250YWluZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ092ZXJDb250YWluZXJFdmVudCwgW3tcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlckNvbnRhaW5lcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdPdmVyQ29udGFpbmVyRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbkRyYWdPdmVyQ29udGFpbmVyRXZlbnQudHlwZSA9ICdkcmFnOm92ZXI6Y29udGFpbmVyJztcblxudmFyIERyYWdPdmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDYpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ092ZXJFdmVudCwgX0RyYWdFdmVudDYpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ092ZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3ZlckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3ZlckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ292ZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ092ZXJFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ092ZXJFdmVudC50eXBlID0gJ2RyYWc6b3Zlcic7XG5cbnZhciBEcmFnUHJlc3N1cmVFdmVudCA9IGV4cG9ydHMuRHJhZ1ByZXNzdXJlRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDcpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1ByZXNzdXJlRXZlbnQsIF9EcmFnRXZlbnQ3KTtcblxuICBmdW5jdGlvbiBEcmFnUHJlc3N1cmVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnUHJlc3N1cmVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdQcmVzc3VyZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1ByZXNzdXJlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdQcmVzc3VyZUV2ZW50LCBbe1xuICAgIGtleTogJ3ByZXNzdXJlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEucHJlc3N1cmU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnUHJlc3N1cmVFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ1ByZXNzdXJlRXZlbnQudHlwZSA9ICdkcmFnOnByZXNzdXJlJztcblxudmFyIERyYWdTdG9wRXZlbnQgPSBleHBvcnRzLkRyYWdTdG9wRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDgpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1N0b3BFdmVudCwgX0RyYWdFdmVudDgpO1xuXG4gIGZ1bmN0aW9uIERyYWdTdG9wRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1N0b3BFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdG9wRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU3RvcEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1N0b3BFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ1N0b3BFdmVudC50eXBlID0gJ2RyYWc6c3RvcCc7XG5cbi8qKiovIH0pLFxuLyogNTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIERyYWdnYWJsZUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnZ2FibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ2dhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnZ2FibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ2dhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ2dhYmxlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ2dhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ2dhYmxlRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxuRHJhZ2dhYmxlRXZlbnQudHlwZSA9ICdkcmFnZ2FibGUnO1xuXG52YXIgRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ2dhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCwgX0RyYWdnYWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQ7XG59KERyYWdnYWJsZUV2ZW50KTtcblxuRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudC50eXBlID0gJ2RyYWdnYWJsZTppbml0aWFsaXplJztcblxudmFyIERyYWdnYWJsZURlc3Ryb3lFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnZ2FibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ2dhYmxlRGVzdHJveUV2ZW50LCBfRHJhZ2dhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGVEZXN0cm95RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ2dhYmxlRGVzdHJveUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ2dhYmxlRGVzdHJveUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ2dhYmxlRGVzdHJveUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ2dhYmxlRGVzdHJveUV2ZW50O1xufShEcmFnZ2FibGVFdmVudCk7XG5cbkRyYWdnYWJsZURlc3Ryb3lFdmVudC50eXBlID0gJ2RyYWdnYWJsZTpkZXN0cm95JztcblxuLyoqKi8gfSksXG4vKiA1OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Ecm9wcGFibGVPdXRFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlT3ZlckV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIERyb3BwYWJsZUV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyb3BwYWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyb3BwYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJvcHBhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wcGFibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJvcHBhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Ryb3BwYWJsZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyb3BwYWJsZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyb3BwYWJsZUV2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbkRyb3BwYWJsZUV2ZW50LnR5cGUgPSAnZHJvcHBhYmxlJztcblxudmFyIERyb3BwYWJsZU92ZXJFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlT3ZlckV2ZW50ID0gZnVuY3Rpb24gKF9Ecm9wcGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGVPdmVyRXZlbnQsIF9Ecm9wcGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJvcHBhYmxlT3ZlckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyb3BwYWJsZU92ZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyb3BwYWJsZU92ZXJFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZU92ZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyb3BwYWJsZU92ZXJFdmVudDtcbn0oRHJvcHBhYmxlRXZlbnQpO1xuXG5Ecm9wcGFibGVPdmVyRXZlbnQudHlwZSA9ICdkcm9wcGFibGU6b3Zlcic7XG5cbnZhciBEcm9wcGFibGVPdXRFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlT3V0RXZlbnQgPSBmdW5jdGlvbiAoX0Ryb3BwYWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGVPdXRFdmVudCwgX0Ryb3BwYWJsZUV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJvcHBhYmxlT3V0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcm9wcGFibGVPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZU91dEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJvcHBhYmxlT3V0RXZlbnQ7XG59KERyb3BwYWJsZUV2ZW50KTtcblxuRHJvcHBhYmxlT3V0RXZlbnQudHlwZSA9ICdkcm9wcGFibGU6b3V0JztcblxuLyoqKi8gfSksXG4vKiA1OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5NaXJyb3JEZXN0cm95RXZlbnQgPSBleHBvcnRzLk1pcnJvck1vdmVFdmVudCA9IGV4cG9ydHMuTWlycm9yQXR0YWNoZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yQ3JlYXRlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIE1pcnJvckV2ZW50ID0gZXhwb3J0cy5NaXJyb3JFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTWlycm9yRXZlbnQsIFt7XG4gICAga2V5OiAnc291cmNlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ21pcnJvcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm1pcnJvcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzb3VyY2VDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2VDb250YWluZXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29yRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zZW5zb3JFdmVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbEV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIGlmICh0aGlzLnNlbnNvckV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvckV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWlycm9yRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxudmFyIE1pcnJvckNyZWF0ZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yQ3JlYXRlZEV2ZW50ID0gZnVuY3Rpb24gKF9NaXJyb3JFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JDcmVhdGVkRXZlbnQsIF9NaXJyb3JFdmVudCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yQ3JlYXRlZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckNyZWF0ZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvckNyZWF0ZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckNyZWF0ZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIE1pcnJvckNyZWF0ZWRFdmVudDtcbn0oTWlycm9yRXZlbnQpO1xuXG5NaXJyb3JDcmVhdGVkRXZlbnQudHlwZSA9ICdtaXJyb3I6Y3JlYXRlZCc7XG5cbnZhciBNaXJyb3JBdHRhY2hlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JBdHRhY2hlZEV2ZW50ID0gZnVuY3Rpb24gKF9NaXJyb3JFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTWlycm9yQXR0YWNoZWRFdmVudCwgX01pcnJvckV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gTWlycm9yQXR0YWNoZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JBdHRhY2hlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yQXR0YWNoZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckF0dGFjaGVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JBdHRhY2hlZEV2ZW50O1xufShNaXJyb3JFdmVudCk7XG5cbk1pcnJvckF0dGFjaGVkRXZlbnQudHlwZSA9ICdtaXJyb3I6YXR0YWNoZWQnO1xuXG52YXIgTWlycm9yTW92ZUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JNb3ZlRXZlbnQsIF9NaXJyb3JFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvck1vdmVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JNb3ZlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JNb3ZlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JNb3ZlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JNb3ZlRXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuTWlycm9yTW92ZUV2ZW50LnR5cGUgPSAnbWlycm9yOm1vdmUnO1xuXG52YXIgTWlycm9yRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JEZXN0cm95RXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JEZXN0cm95RXZlbnQsIF9NaXJyb3JFdmVudDQpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckRlc3Ryb3lFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JEZXN0cm95RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JEZXN0cm95RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JEZXN0cm95RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JEZXN0cm95RXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuTWlycm9yRGVzdHJveUV2ZW50LnR5cGUgPSAnbWlycm9yOmRlc3Ryb3knO1xuXG4vKioqLyB9KSxcbi8qIDYwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNuYXBPdXRFdmVudCA9IGV4cG9ydHMuU25hcEluRXZlbnQgPSBleHBvcnRzLlNuYXBFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFNuYXBFdmVudCA9IGV4cG9ydHMuU25hcEV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNuYXBFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFNuYXBFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTbmFwRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTbmFwRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNuYXBFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTbmFwRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxudmFyIFNuYXBJbkV2ZW50ID0gZXhwb3J0cy5TbmFwSW5FdmVudCA9IGZ1bmN0aW9uIChfU25hcEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNuYXBJbkV2ZW50LCBfU25hcEV2ZW50KTtcblxuICBmdW5jdGlvbiBTbmFwSW5FdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwSW5FdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNuYXBJbkV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU25hcEluRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBTbmFwSW5FdmVudDtcbn0oU25hcEV2ZW50KTtcblxuU25hcEluRXZlbnQudHlwZSA9ICdzbmFwOmluJztcblxudmFyIFNuYXBPdXRFdmVudCA9IGV4cG9ydHMuU25hcE91dEV2ZW50ID0gZnVuY3Rpb24gKF9TbmFwRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNuYXBPdXRFdmVudCwgX1NuYXBFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIFNuYXBPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTbmFwT3V0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTbmFwT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBTbmFwT3V0RXZlbnQ7XG59KFNuYXBFdmVudCk7XG5cblNuYXBPdXRFdmVudC50eXBlID0gJ3NuYXA6b3V0JztcblxuLyoqKi8gfSksXG4vKiA2MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Tb3J0YWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTb3J0ZWRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9hYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9hYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU29ydGFibGVFdmVudCA9IGV4cG9ydHMuU29ydGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU29ydGFibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVFdmVudDtcbn0oX2Fic3RyYWN0RXZlbnQyLmRlZmF1bHQpO1xuXG52YXIgU29ydGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVN0YXJ0RXZlbnQgPSBmdW5jdGlvbiAoX1NvcnRhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGVTdGFydEV2ZW50LCBfU29ydGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gU29ydGFibGVTdGFydEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlU3RhcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlU3RhcnRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlU3RhcnRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVTdGFydEV2ZW50LCBbe1xuICAgIGtleTogJ3N0YXJ0SW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zdGFydEluZGV4O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVTdGFydEV2ZW50O1xufShTb3J0YWJsZUV2ZW50KTtcblxuU29ydGFibGVTdGFydEV2ZW50LnR5cGUgPSAnc29ydGFibGU6c3RhcnQnO1xuXG52YXIgU29ydGFibGVTb3J0ZWRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTb3J0ZWRFdmVudCA9IGZ1bmN0aW9uIChfU29ydGFibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGVTb3J0ZWRFdmVudCwgX1NvcnRhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZVNvcnRlZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlU29ydGVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTb3J0YWJsZVNvcnRlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVTb3J0ZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVTb3J0ZWRFdmVudCwgW3tcbiAgICBrZXk6ICdtb3ZlcycsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm1vdmVzO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVTb3J0ZWRFdmVudDtcbn0oU29ydGFibGVFdmVudCk7XG5cblNvcnRhYmxlU29ydGVkRXZlbnQudHlwZSA9ICdzb3J0YWJsZTpzb3J0ZWQnO1xuXG52YXIgU29ydGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU3RvcEV2ZW50ID0gZnVuY3Rpb24gKF9Tb3J0YWJsZUV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZVN0b3BFdmVudCwgX1NvcnRhYmxlRXZlbnQzKTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZVN0b3BFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZVN0b3BFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlU3RvcEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVTdG9wRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlU3RvcEV2ZW50LCBbe1xuICAgIGtleTogJ29sZEluZGV4JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub2xkSW5kZXg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbmV3SW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5uZXdJbmRleDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNvcnRhYmxlU3RvcEV2ZW50O1xufShTb3J0YWJsZUV2ZW50KTtcblxuU29ydGFibGVTdG9wRXZlbnQudHlwZSA9ICdzb3J0YWJsZTpzdG9wJztcblxuLyoqKi8gfSksXG4vKiA2MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Td2FwcGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3RhcnRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWJzdHJhY3RFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTd2FwcGFibGVFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBwYWJsZUV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZUV2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbnZhciBTd2FwcGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTdGFydEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGVTdGFydEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZVN0YXJ0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3RhcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZVN0YXJ0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGVTdGFydEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gU3dhcHBhYmxlU3RhcnRFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG5Td2FwcGFibGVTdGFydEV2ZW50LnR5cGUgPSAnc3dhcHBhYmxlOnN0YXJ0JztcblxudmFyIFN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3dhcHBlZEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTd2FwcGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3dhcHBlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3dhcHBlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3dhcHBlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTd2FwcGFibGVTd2FwcGVkRXZlbnQsIFt7XG4gICAga2V5OiAnc3dhcHBlZEVsZW1lbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zd2FwcGVkRWxlbWVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZVN3YXBwZWRFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG5Td2FwcGFibGVTd2FwcGVkRXZlbnQudHlwZSA9ICdzd2FwcGFibGU6c3dhcHBlZCc7XG5cbnZhciBTd2FwcGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN0b3BFdmVudCA9IGZ1bmN0aW9uIChfU3dhcHBhYmxlRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZVN0b3BFdmVudCwgX1N3YXBwYWJsZUV2ZW50Myk7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlU3RvcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZVN0b3BFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZVN0b3BFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZVN0b3BFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIFN3YXBwYWJsZVN0b3BFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG5Td2FwcGFibGVTdG9wRXZlbnQudHlwZSA9ICdzd2FwcGFibGU6c3RvcCc7XG5cbi8qKiovIH0pLFxuLyogNjMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQWJzdHJhY3RFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlID0gZXhwb3J0cy5Td2FwcGFibGUgPSBleHBvcnRzLlNvcnRhYmxlID0gZXhwb3J0cy5EcmFnZ2FibGUgPSB1bmRlZmluZWQ7XG5leHBvcnRzLmNyZWF0ZUV2ZW50Q2xhc3MgPSBjcmVhdGVFdmVudENsYXNzO1xuXG52YXIgX2RyYWdnYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG52YXIgX2RyYWdnYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmFnZ2FibGUpO1xuXG52YXIgX3NvcnRhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OSk7XG5cbnZhciBfc29ydGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc29ydGFibGUpO1xuXG52YXIgX3N3YXBwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTApO1xuXG52YXIgX3N3YXBwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zd2FwcGFibGUpO1xuXG52YXIgX2Ryb3BwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDgpO1xuXG52YXIgX2Ryb3BwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcm9wcGFibGUpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWJzdHJhY3RFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuRHJhZ2dhYmxlID0gX2RyYWdnYWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuU29ydGFibGUgPSBfc29ydGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLlN3YXBwYWJsZSA9IF9zd2FwcGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLkRyb3BwYWJsZSA9IF9kcm9wcGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLkFic3RyYWN0RXZlbnQgPSBfYWJzdHJhY3RFdmVudDIuZGVmYXVsdDtcbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50Q2xhc3Mob3B0aW9ucykge1xuICBmdW5jdGlvbiBFdmVudENvbnN0cnVjdG9yKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIEV2ZW50Q29uc3RydWN0b3IucHJvdG90eXBlID0gX2Fic3RyYWN0RXZlbnQyLmRlZmF1bHQucHJvdG90eXBlO1xuICBjcmVhdGVFdmVudENsYXNzLnR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIHJldHVybiBjcmVhdGVFdmVudENsYXNzO1xufVxuXG4vKioqLyB9KSxcbi8qIDY0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3NlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgX3NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZW5zb3IpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cbnZhciBfc2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIERyYWdTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU2Vuc29yLCBfU2Vuc29yKTtcblxuICBmdW5jdGlvbiBEcmFnU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1NlbnNvcik7XG5cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU2Vuc29yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1NlbnNvcikpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBfdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcblxuICAgIF90aGlzLl9vbk1vdXNlRG93biA9IF90aGlzLl9vbk1vdXNlRG93bi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZVVwID0gX3RoaXMuX29uTW91c2VVcC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25EcmFnU3RhcnQgPSBfdGhpcy5fb25EcmFnU3RhcnQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uRHJhZ092ZXIgPSBfdGhpcy5fb25EcmFnT3Zlci5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25EcmFnRW5kID0gX3RoaXMuX29uRHJhZ0VuZC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25EcmFnRHJvcCA9IF90aGlzLl9vbkRyYWdEcm9wLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuX29uRHJhZ092ZXIsIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuX29uRHJhZ0VuZCwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fb25EcmFnRHJvcCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCwgdHJ1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLl9vbkRyYWdPdmVyLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLl9vbkRyYWdFbmQsIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuX29uRHJhZ0Ryb3AsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlXG5cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdGFydChldmVudCkge1xuICAgICAgLy8gTmVlZCBmb3IgZmlyZWZveC4gXCJ0ZXh0XCIga2V5IGlzIG5lZWRlZCBmb3IgSUVcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJycpO1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSB0aGlzLm9wdGlvbnMudHlwZTtcblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdGFydEV2ZW50KTtcblxuICAgICAgaWYgKGRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAvLyBwcmV2ZW50IGRyYWcgZXZlbnQgaWYgZmlyZWQgZXZlbnQgaGFzIGJlZW4gcHJldmVudGVkXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnT3ZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdPdmVyKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3ZlckNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihjb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuXG4gICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG5cbiAgICAgIGlmICghZHJhZ01vdmVFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gdGhpcy5vcHRpb25zLnR5cGU7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ0VuZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdFbmQoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHByZXZlbnQgY2xpY2sgb24gZHJvcCBpZiBkcmFnZ2FibGUgY29udGFpbnMgYSBjbGlja2FibGUgZWxlbWVudFxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIGNvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnRHJvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdEcm9wKGV2ZW50KSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VEb3duJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgICAvLyBGaXJlZm94IGJ1ZyBmb3IgaW5wdXRzIHdpdGhpbiBkcmFnZ2FibGVzIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTczOTA3MVxuICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiAoZXZlbnQudGFyZ2V0LmZvcm0gfHwgZXZlbnQudGFyZ2V0LmNvbnRlbnRlZGl0YWJsZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm1vdXNlRG93blRpbWVvdXQpO1xuXG4gICAgICAgIHRoaXMubW91c2VEb3duVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRhcmdldC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlVXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZVVwKGV2ZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5tb3VzZURvd25UaW1lb3V0KTtcblxuICAgICAgdmFyIHRhcmdldCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoZXZlbnQudGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcblxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnU2Vuc29yO1xufShfc2Vuc29yMi5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRHJhZ1NlbnNvcjtcblxuLyoqKi8gfSksXG4vKiA2NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9zZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9zZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Vuc29yKTtcblxudmFyIF9zZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRm9yY2VUb3VjaFNlbnNvciA9IGZ1bmN0aW9uIChfU2Vuc29yKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKEZvcmNlVG91Y2hTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIGZ1bmN0aW9uIEZvcmNlVG91Y2hTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBGb3JjZVRvdWNoU2Vuc29yKTtcblxuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKEZvcmNlVG91Y2hTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihGb3JjZVRvdWNoU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIF90aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIF90aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuXG4gICAgX3RoaXMuX29uTW91c2VGb3JjZVdpbGxCZWdpbiA9IF90aGlzLl9vbk1vdXNlRm9yY2VXaWxsQmVnaW4uYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uTW91c2VGb3JjZURvd24gPSBfdGhpcy5fb25Nb3VzZUZvcmNlRG93bi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZURvd24gPSBfdGhpcy5fb25Nb3VzZURvd24uYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uTW91c2VGb3JjZUNoYW5nZSA9IF90aGlzLl9vbk1vdXNlRm9yY2VDaGFuZ2UuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uTW91c2VNb3ZlID0gX3RoaXMuX29uTW91c2VNb3ZlLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vbk1vdXNlVXAgPSBfdGhpcy5fb25Nb3VzZVVwLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEZvcmNlVG91Y2hTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZXdpbGxiZWdpbicsIHRoaXMuX29uTW91c2VGb3JjZVdpbGxCZWdpbiwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlZG93bicsIHRoaXMuX29uTW91c2VGb3JjZURvd24sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlY2hhbmdlZCcsIHRoaXMuX29uTW91c2VGb3JjZUNoYW5nZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2V3aWxsYmVnaW4nLCB0aGlzLl9vbk1vdXNlRm9yY2VXaWxsQmVnaW4sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZWRvd24nLCB0aGlzLl9vbk1vdXNlRm9yY2VEb3duLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZWNoYW5nZWQnLCB0aGlzLl9vbk1vdXNlRm9yY2VDaGFuZ2UsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZUZvcmNlV2lsbEJlZ2luJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VGb3JjZVdpbGxCZWdpbihldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMubWlnaHREcmFnID0gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZUZvcmNlRG93bicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRm9yY2VEb3duKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gIWRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCk7XG4gICAgICB0aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlVXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZVVwKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlRG93bicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRG93bihldmVudCkge1xuICAgICAgaWYgKCF0aGlzLm1pZ2h0RHJhZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIE5lZWQgd29ya2Fyb3VuZCBmb3IgcmVhbCBjbGlja1xuICAgICAgLy8gQ2FuY2VsIHBvdGVudGlhbCBkcmFnIGV2ZW50c1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VGb3JjZUNoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRm9yY2VDaGFuZ2UoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50KHtcbiAgICAgICAgcHJlc3N1cmU6IGV2ZW50LndlYmtpdEZvcmNlLFxuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlRm9yY2VHbG9iYWxDaGFuZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZUZvcmNlR2xvYmFsQ2hhbmdlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50KHtcbiAgICAgICAgcHJlc3N1cmU6IGV2ZW50LndlYmtpdEZvcmNlLFxuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRm9yY2VUb3VjaFNlbnNvcjtcbn0oX3NlbnNvcjIuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZvcmNlVG91Y2hTZW5zb3I7XG5cbi8qKiovIH0pLFxuLyogNjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfc2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfc2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NlbnNvcik7XG5cbnZhciBfc2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIE1vdXNlU2Vuc29yID0gZnVuY3Rpb24gKF9TZW5zb3IpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTW91c2VTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIGZ1bmN0aW9uIE1vdXNlU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTW91c2VTZW5zb3IpO1xuXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTW91c2VTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNb3VzZVNlbnNvcikpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBfdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICBfdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcblxuICAgIF90aGlzLl9vbk1vdXNlRG93biA9IF90aGlzLl9vbk1vdXNlRG93bi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZU1vdmUgPSBfdGhpcy5fb25Nb3VzZU1vdmUuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uTW91c2VVcCA9IF90aGlzLl9vbk1vdXNlVXAuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTW91c2VTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZURvd24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubW91c2VEb3duVGltZW91dCk7XG4gICAgICB0aGlzLm1vdXNlRG93blRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFfdGhpczIubW91c2VEb3duKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRyYWdTdGFydEV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnU3RhcnRTZW5zb3JFdmVudCh7XG4gICAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICAgIF90aGlzMi5jdXJyZW50Q29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBfdGhpczIuZHJhZ2dpbmcgPSAhZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKTtcbiAgICAgIH0sIHRoaXMub3B0aW9ucy5kZWxheSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VVcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1vdXNlU2Vuc29yO1xufShfc2Vuc29yMi5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTW91c2VTZW5zb3I7XG5cbi8qKiovIH0pLFxuLyogNjcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfc2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfc2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NlbnNvcik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblxudmFyIF9zZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVG91Y2hTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShUb3VjaFNlbnNvciwgX1NlbnNvcik7XG5cbiAgZnVuY3Rpb24gVG91Y2hTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBUb3VjaFNlbnNvcik7XG5cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChUb3VjaFNlbnNvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFRvdWNoU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIF90aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuICAgIF90aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50ID0gbnVsbDtcblxuICAgIF90aGlzLl9vblRvdWNoU3RhcnQgPSBfdGhpcy5fb25Ub3VjaFN0YXJ0LmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblRvdWNoSG9sZCA9IF90aGlzLl9vblRvdWNoSG9sZC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Ub3VjaEVuZCA9IF90aGlzLl9vblRvdWNoRW5kLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblRvdWNoTW92ZSA9IF90aGlzLl9vblRvdWNoTW92ZS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TY3JvbGwgPSBfdGhpcy5fb25TY3JvbGwuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoVG91Y2hTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuX29uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TY3JvbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TY3JvbGwoKSB7XG4gICAgICAvLyBDYW5jZWwgcG90ZW50aWFsIGRyYWcgYW5kIGFsbG93IHNjcm9sbCBvbiBpT1Mgb3Igb3RoZXIgdG91Y2ggZGV2aWNlc1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGFwVGltZW91dCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgLy8gZGV0ZWN0IGlmIGJvZHkgaXMgc2Nyb2xsaW5nIG9uIGlPU1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgX29uQ29udGV4dE1lbnUpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50ID0gKDAsIF91dGlscy5jbG9zZXN0KShjb250YWluZXIsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm9mZnNldEhlaWdodCA8IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhcFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuX29uVG91Y2hIb2xkKGV2ZW50LCBjb250YWluZXIpLCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblRvdWNoSG9sZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoSG9sZChldmVudCwgY29udGFpbmVyKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgICBjbGllbnRYOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgICBjbGllbnRZOiB0b3VjaC5wYWdlWSxcbiAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgICB9KTtcblxuICAgICAgICBfdGhpczIudHJpZ2dlcihjb250YWluZXIsIGRyYWdTdGFydEV2ZW50KTtcblxuICAgICAgICBfdGhpczIuY3VycmVudENvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgX3RoaXMyLmRyYWdnaW5nID0gIWRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblRvdWNoTW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoTW92ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5wYWdlWCAtIHdpbmRvdy5zY3JvbGxYLCB0b3VjaC5wYWdlWSAtIHdpbmRvdy5zY3JvbGxZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgY2xpZW50WTogdG91Y2gucGFnZVksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnTW92ZUV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Ub3VjaEVuZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgX29uQ29udGV4dE1lbnUpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX29uU2Nyb2xsKTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGFwVGltZW91dCk7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogdG91Y2gucGFnZVgsXG4gICAgICAgIGNsaWVudFk6IHRvdWNoLnBhZ2VZLFxuICAgICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG91Y2hTZW5zb3I7XG59KF9zZW5zb3IyLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUb3VjaFNlbnNvcjtcblxuXG5mdW5jdGlvbiBfb25Db250ZXh0TWVudShldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG4vKioqLyB9KSxcbi8qIDY4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg3MyksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA2OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oNzQpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogNzAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDc1KSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDcxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg3NiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA3MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oNzcpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogNzMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg5OCk7XG52YXIgJE9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDc0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oOTkpO1xudmFyICRPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNzUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygxMDApO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cbi8qKiovIH0pLFxuLyogNzYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygxMDMpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMDEpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMDQpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMDUpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKS5TeW1ib2w7XG5cbi8qKiovIH0pLFxuLyogNzcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygxMDIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMDYpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM2KS5mKCdpdGVyYXRvcicpO1xuXG4vKioqLyB9KSxcbi8qIDc4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDc5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcblxuLyoqKi8gfSksXG4vKiA4MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCB0b0xlbmd0aCAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk1KVxuICAsIHRvSW5kZXggICA9IF9fd2VicGFja19yZXF1aXJlX18oOTQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiA4MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuICAsIGdPUFMgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ1KVxuICAsIHBJRSAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKiovIH0pLFxuLyogODIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuLyoqKi8gfSksXG4vKiA4MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IF9fd2VicGFja19yZXF1aXJlX18oMzgpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuLyoqKi8gfSksXG4vKiA4NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IF9fd2VicGFja19yZXF1aXJlX18oMzgpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG4vKioqLyB9KSxcbi8qIDg1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY3JlYXRlICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuICAsIGRlc2NyaXB0b3IgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMilcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzApXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbl9fd2VicGFja19yZXF1aXJlX18oMTEpKEl0ZXJhdG9yUHJvdG90eXBlLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cbi8qKiovIH0pLFxuLyogODYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuLyoqKi8gfSksXG4vKiA4NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2V0S2V5cyAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcbiAgLCB0b0lPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTtcblxuLyoqKi8gfSksXG4vKiA4OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgTUVUQSAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuICAsIGhhcyAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIHNldERlc2MgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KS5mXG4gICwgaWQgICAgICAgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG4vKioqLyB9KSxcbi8qIDg5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkUCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOClcbiAgLCBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG4gICwgZ2V0S2V5cyAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cbi8qKiovIH0pLFxuLyogOTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCBnT1BOICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ0KS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogOTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCB0b09iamVjdCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOTYpXG4gICwgSUVfUFJPVE8gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cbi8qKiovIH0pLFxuLyogOTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNilcbiAgLCBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpKEZ1bmN0aW9uLmNhbGwsIF9fd2VicGFja19yZXF1aXJlX18oNDMpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuLyoqKi8gfSksXG4vKiA5MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMylcbiAgLCBkZWZpbmVkICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cbi8qKiovIH0pLFxuLyogOTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHRvSW50ZWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDk1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cbi8qKiovIH0pLFxuLyogOTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cbi8qKiovIH0pLFxuLyogOTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3OSlcbiAgLCBzdGVwICAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NilcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNilcbiAgLCB0b0lPYmplY3QgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuLyoqKi8gfSksXG4vKiA5OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogX193ZWJwYWNrX3JlcXVpcmVfXygyOCl9KTtcblxuLyoqKi8gfSksXG4vKiA5OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIV9fd2VicGFja19yZXF1aXJlX18oNiksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IF9fd2VicGFja19yZXF1aXJlX18oOCkuZn0pO1xuXG4vKioqLyB9KSxcbi8qIDEwMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDkyKS5zZXR9KTtcblxuLyoqKi8gfSksXG4vKiAxMDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXG5cbi8qKiovIH0pLFxuLyogMTAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgJGF0ICA9IF9fd2VicGFja19yZXF1aXJlX18oOTMpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDQyKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuLyoqKi8gfSksXG4vKiAxMDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcbiAgLCBoYXMgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBERVNDUklQVE9SUyAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNilcbiAgLCAkZXhwb3J0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG4gICwgcmVkZWZpbmUgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KVxuICAsIE1FVEEgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4OCkuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuICAsIHNoYXJlZCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMilcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzApXG4gICwgdWlkICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKVxuICAsIHdrcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcbiAgLCB3a3NFeHQgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpXG4gICwgd2tzRGVmaW5lICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM1KVxuICAsIGtleU9mICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NylcbiAgLCBlbnVtS2V5cyAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oODEpXG4gICwgaXNBcnJheSAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg0KVxuICAsIGFuT2JqZWN0ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcbiAgLCB0b0lPYmplY3QgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpXG4gICwgY3JlYXRlRGVzYyAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxuICAsIF9jcmVhdGUgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOClcbiAgLCBnT1BORXh0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOTApXG4gICwgJEdPUEQgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKVxuICAsICREUCAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KVxuICAsICRrZXlzICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIF9fd2VicGFja19yZXF1aXJlX18oNDQpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgX193ZWJwYWNrX3JlcXVpcmVfXygyOSkuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIF9fd2VicGFja19yZXF1aXJlX18oNDUpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgX193ZWJwYWNrX3JlcXVpcmVfXygxMSkoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cbi8qKiovIH0pLFxuLyogMTA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMzUpKCdhc3luY0l0ZXJhdG9yJyk7XG5cbi8qKiovIH0pLFxuLyogMTA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMzUpKCdvYnNlcnZhYmxlJyk7XG5cbi8qKiovIH0pLFxuLyogMTA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oOTcpO1xudmFyIGdsb2JhbCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG4gICwgaGlkZSAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpXG4gICwgSXRlcmF0b3JzICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpXG4gICwgVE9fU1RSSU5HX1RBRyA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvZHJhZ2dhYmxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==