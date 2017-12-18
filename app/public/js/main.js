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
			success: function success(showDialog) {
				if (showDialog == "true") {
					$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideDialog();
					$(AjaxFunctions.prototype.Selectors_.CHANGE_AUTH_DIALOG)[0].dialog.isClosable = false;
					$(AjaxFunctions.prototype.Selectors_.CHANGE_AUTH_DIALOG)[0].dialog.showDialog();
				} else {
					location.reload();
				}
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

	var pageNumber = 2;
	var reachedEndOfProjectTable = false,
	    awaitingResponse = false;

	$(window).scroll(function () {
		if ($(window).scrollTop() + $(window).height() == $(document).height()) {

			if (!$('#project-table').hasClass("index")) {
				return;
			}

			if (!reachedEndOfProjectTable && !awaitingResponse) {
				$(".loader.projects").show();
				awaitingResponse = true;
				var urlPath = "/projects/paginated?page=" + pageNumber;
				$.ajax({
					type: 'GET',
					url: urlPath,
					success: function success(data) {
						$(".loader.projects").hide();
						if (data.length == 0) {
							reachedEndOfProjectTable = true;
							$('#project-table').after('<div style="width: 10px;height: 10px;margin: 1rem auto;background: rgba(0, 0, 0, 0.07);border: 1px solid rgba(0, 0, 0, 0.11);border-radius: 90px;"></div>');
						} else {
							$('#project-table tbody').append($(data));
							window.history.replaceState("", "", "/projects?page=" + pageNumber);
						}
						pageNumber += 1;
					},
					error: function error(data) {}
				}).done(function (data) {
					awaitingResponse = false;
				});
			} else {
				$(".loader.projects").hide();
			}
		}
	});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWM3MzljYTBkYWRmNjdhNTBmZWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kcmFnZ2FibGUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsiJCIsImFqYXhTZXR1cCIsImhlYWRlcnMiLCJhdHRyIiwiYXBwZW5kIiwic29ydFRhYmxlIiwidGFibGUiLCJjb2wiLCJyZXZlcnNlIiwidGIiLCJ0Qm9kaWVzIiwidHIiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInJvd3MiLCJpIiwic29ydCIsImEiLCJiIiwiY2VsbHMiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJsb2NhbGVDb21wYXJlIiwibGVuZ3RoIiwiYXBwZW5kQ2hpbGQiLCJtYWtlU29ydGFibGUiLCJ0aCIsInRIZWFkIiwiZGlyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1ha2VBbGxTb3J0YWJsZSIsInBhcmVudCIsImRvY3VtZW50IiwiYm9keSIsInQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFjY2VwdFN0dWRlbnQiLCJzdHVkZW50X2lkIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRhdGEiLCJzdWNjZXNzIiwicmVqZWN0U3R1ZGVudCIsInByb2plY3RfaWQiLCJvbiIsImUiLCJoaWRlIiwiYWRkQ2xhc3MiLCJwcmVwZW5kIiwiQWpheEZ1bmN0aW9ucyIsImRlbGV0ZVByb2plY3QiLCJ2YWwiLCJNb2JpbGVNZW51IiwiZWxlbWVudCIsIndpbmRvdyIsImFjdGl2YXRvciIsIlNlbGVjdG9yc18iLCJIQU1CVVJHRVJfQ09OVEFJTkVSIiwidW5kZXJsYXkiLCJVTkRFUkxBWSIsImluaXQiLCJDc3NDbGFzc2VzXyIsIlZJU0lCTEUiLCJNT0JJTEVfTUVOVSIsIm9wZW5NZW51IiwiY2xvc2VNZW51IiwicmVtb3ZlQ2xhc3MiLCJtb2JpbGVNZW51IiwiYmluZCIsImluaXRBbGwiLCJlYWNoIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImhlYWRlciIsImZpbmQiLCJESUFMT0dfSEVBREVSIiwiY29udGVudCIsIkRJQUxPR19DT05URU5UIiwiYmVmb3JlIiwiSHRtbFNuaXBwZXRzXyIsIkxPQURFUiIsImxvYWRlciIsImlzQ2xvc2FibGUiLCJhY3RpdmF0b3JCdXR0b25zIiwiQUNUSVZFIiwiRElBTE9HIiwic2hvd0xvYWRlciIsInNob3ciLCJoaWRlTG9hZGVyIiwic2hvd0RpYWxvZyIsImhpZGVEaWFsb2ciLCJkaWFsb2ciLCJwdXNoIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwiRGF0YVRhYmxlIiwiYm9keVJvd3MiLCJmb290Um93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImVxIiwiY3NzIiwiUHJvamVjdFRvcGljcyIsIkFERF9UT1BJQ19JTlBVVCIsIk5FV19UT1BJQ19JTlBVVF9DT05UQUlORVIiLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInByb2plY3RUb3BpY3MiLCJhZGRUb3BpY1RvUHJvamVjdCIsInByb2plY3RJZCIsInRvcGljTmFtZSIsImFqYXhVcmwiLCJ0eXBlIiwidG9waWNfbmFtZSIsIkpTT04iLCJwYXJzZSIsImFmdGVyIiwiZG9uZSIsInJlbW92ZVRvcGljRnJvbVByb2plY3QiLCJ0b3BpY0lkIiwidG9waWNfaWQiLCJvYmoiLCJyZW1vdmUiLCJ1cGRhdGVQcm9qZWN0UHJpbWFyeVRvcGljIiwic3dhcHBhYmxlIiwicXVlcnlTZWxlY3RvckFsbCIsImRyYWdnYWJsZSIsIm9yaWdpbmFsUHJpbWFyeVRvcGljSWQiLCJrZXlwcmVzcyIsIndoaWNoIiwiZm9jdXMiLCJTRUFSQ0hfSU5QVVQiLCJTRUFSQ0hfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0JVVFRPTiIsIkxPR19JTl9ESUFMT0ciLCJDSEFOR0VfQVVUSF9ESUFMT0ciLCJwcm9qZWN0TmFtZSIsImNvbmZpcm0iLCJsb2NhdGlvbiIsImhyZWYiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiaW5kZXgiLCJjbGFzc05hbWUiLCJtYXRjaCIsImpvaW4iLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJoYXNDbGFzcyIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwicmVzcG9uc2UiLCJodG1sIiwiY29udGV4dCIsImRlbGV0ZVRvcGljIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwicHJldmVudERlZmF1bHQiLCJzZXJpYWxpemUiLCJyZWxvYWQiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwic3RhdHVzIiwicGFyZW50cyIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJhbGVydCIsIk1hcmtlciIsInNlbGVjdGVkU3R1ZGVudCIsInNlbGVjdGVkU3VwZXJ2aXNvciIsInN0dWRlbnRUYWJsZSIsInN0dWRlbnREYXRhVGFibGUiLCJzdXBlcnZpc29yVGFibGUiLCJzdXBlcnZpc29yRGF0YVRhYmxlIiwibWFya2VyIiwic2VsZWN0U3R1ZGVudCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdHVkZW50Um93RE9NIiwidW5zZWxlY3RBbGwiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0IiwibWFya2VySWQiLCJtYXJrZXJfaWQiLCJwYWdlTnVtYmVyIiwicmVhY2hlZEVuZE9mUHJvamVjdFRhYmxlIiwiYXdhaXRpbmdSZXNwb25zZSIsInNjcm9sbCIsInNjcm9sbFRvcCIsImhlaWdodCIsInVybFBhdGgiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJtb2R1bGVzIiwiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImwiLCJtIiwiYyIsInZhbHVlIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0IiwibiIsIl9fZXNNb2R1bGUiLCJnZXREZWZhdWx0IiwiZ2V0TW9kdWxlRXhwb3J0cyIsIm9iamVjdCIsInByb3BlcnR5IiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsImRlZmF1bHQiLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiX2RlZmluZVByb3BlcnR5IiwiX2RlZmluZVByb3BlcnR5MiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJkZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJkZXNjcmlwdG9yIiwid3JpdGFibGUiLCJrZXkiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfc2V0UHJvdG90eXBlT2YiLCJfc2V0UHJvdG90eXBlT2YyIiwiX2NyZWF0ZSIsIl9jcmVhdGUyIiwiX3R5cGVvZjIiLCJfdHlwZW9mMyIsInN1YkNsYXNzIiwic3VwZXJDbGFzcyIsImNvbnN0cnVjdG9yIiwiX19wcm90b19fIiwic2VsZiIsIlJlZmVyZW5jZUVycm9yIiwiX2NsYXNzQ2FsbENoZWNrMiIsIl9jbGFzc0NhbGxDaGVjazMiLCJfY3JlYXRlQ2xhc3MyIiwiX2NyZWF0ZUNsYXNzMyIsIkFic3RyYWN0RXZlbnQiLCJfY2FuY2VsZWQiLCJjYW5jZWwiLCJjYW5jZWxlZCIsIkJvb2xlYW4iLCJjYW5jZWxhYmxlIiwiZ2xvYmFsIiwiTWF0aCIsIkZ1bmN0aW9uIiwiX19nIiwiaXQiLCJhbk9iamVjdCIsIklFOF9ET01fREVGSU5FIiwidG9QcmltaXRpdmUiLCJkUCIsImYiLCJPIiwiUCIsIkF0dHJpYnV0ZXMiLCJJT2JqZWN0IiwiZGVmaW5lZCIsImNvcmUiLCJ2ZXJzaW9uIiwiX19lIiwiY3JlYXRlRGVzYyIsInN0b3JlIiwidWlkIiwiU3ltYm9sIiwiVVNFX1NZTUJPTCIsIiRleHBvcnRzIiwiY2xvc2VzdCIsInNlbGVjdG9yIiwiY29uZGl0aW9uRm4iLCJjdXJyZW50RWxlbWVudCIsIm1hdGNoRnVuY3Rpb24iLCJFbGVtZW50IiwibWF0Y2hlcyIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsIm1vek1hdGNoZXNTZWxlY3RvciIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwiY3VycmVudCIsImNvcnJlc3BvbmRpbmdVc2VFbGVtZW50IiwiY29ycmVzcG9uZGluZ0VsZW1lbnQiLCJwYXJlbnROb2RlIiwic2Nyb2xsQW5pbWF0aW9uRnJhbWUiLCJfcmVmIiwiY2xpZW50WCIsImNsaWVudFkiLCJzcGVlZCIsInNlbnNpdGl2aXR5IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJzY3JvbGxGbiIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJvZmZzZXRZIiwiYWJzIiwiYm90dG9tIiwidG9wIiwib2Zmc2V0WCIsInJpZ2h0IiwibGVmdCIsInNjcm9sbExlZnQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJpc09iamVjdCIsImN0eCIsIlBST1RPVFlQRSIsIiRleHBvcnQiLCJzb3VyY2UiLCJJU19GT1JDRUQiLCJGIiwiSVNfR0xPQkFMIiwiRyIsIklTX1NUQVRJQyIsIlMiLCJJU19QUk9UTyIsIklTX0JJTkQiLCJCIiwiSVNfV1JBUCIsIlciLCJleHBQcm90byIsIm93biIsIm91dCIsInVuZGVmaW5lZCIsIkMiLCJhcmd1bWVudHMiLCJhcHBseSIsInZpcnR1YWwiLCJSIiwiVSIsIl91dGlscyIsIl9hY2Nlc3NpYmlsaXR5IiwiX2FjY2Vzc2liaWxpdHkyIiwiX21pcnJvciIsIl9taXJyb3IyIiwiX2NvbGxpZGFibGUiLCJfY29sbGlkYWJsZTIiLCJfc25hcHBhYmxlIiwiX3NuYXBwYWJsZTIiLCJfZHJhZ1NlbnNvciIsIl9kcmFnU2Vuc29yMiIsIl9tb3VzZVNlbnNvciIsIl9tb3VzZVNlbnNvcjIiLCJfdG91Y2hTZW5zb3IiLCJfdG91Y2hTZW5zb3IyIiwiX2ZvcmNlVG91Y2hTZW5zb3IiLCJfZm9yY2VUb3VjaFNlbnNvcjIiLCJfZHJhZ2dhYmxlRXZlbnQiLCJfZHJhZ0V2ZW50IiwiX21pcnJvckV2ZW50IiwiZGVmYXVsdHMiLCJoYW5kbGUiLCJkZWxheSIsInBsYWNlZFRpbWVvdXQiLCJuYXRpdmUiLCJwbHVnaW5zIiwiY2xhc3NlcyIsIm1pcnJvciIsIkRyYWdnYWJsZSIsIkFjY2Vzc2liaWxpdHkiLCJNaXJyb3IiLCJDb2xsaWRhYmxlIiwiU25hcHBhYmxlIiwiY29udGFpbmVycyIsIm9wdGlvbnMiLCJhc3NpZ24iLCJhY3RpdmVTZW5zb3JzIiwiYWN0aXZlUGx1Z2lucyIsImNhbGxiYWNrcyIsImRyYWdnaW5nIiwiZHJhZ1N0YXJ0IiwiZHJhZ01vdmUiLCJkcmFnU3RvcCIsImRyYWdQcmVzc3VyZSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24iLCJfZGlkSXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yIiwiaXRlcmF0b3IiLCJfc3RlcCIsIm5leHQiLCJyZXR1cm4iLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiIsIl9kaWRJdGVyYXRvckVycm9yMiIsIl9pdGVyYXRvckVycm9yMiIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJQbHVnaW4iLCJwbHVnaW4iLCJhdHRhY2giLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyIsIl9kaWRJdGVyYXRvckVycm9yMyIsIl9pdGVyYXRvckVycm9yMyIsIl9pdGVyYXRvcjMiLCJzZW5zb3JzIiwiX3N0ZXAzIiwiU2Vuc29yIiwic2Vuc29yIiwiZHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCIsIkRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQiLCJ0cmlnZ2VyRXZlbnQiLCJkZXN0cm95IiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQiLCJfZGlkSXRlcmF0b3JFcnJvcjQiLCJfaXRlcmF0b3JFcnJvcjQiLCJfaXRlcmF0b3I0IiwiX3N0ZXA0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRyYWdnYWJsZURlc3Ryb3lFdmVudCIsIkRyYWdnYWJsZURlc3Ryb3lFdmVudCIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241IiwiX2RpZEl0ZXJhdG9yRXJyb3I1IiwiX2l0ZXJhdG9yRXJyb3I1IiwiX2l0ZXJhdG9yNSIsIl9zdGVwNSIsImFjdGl2ZVBsdWdpbiIsImRldGFjaCIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242IiwiX2RpZEl0ZXJhdG9yRXJyb3I2IiwiX2l0ZXJhdG9yRXJyb3I2IiwiX2l0ZXJhdG9yNiIsIl9zdGVwNiIsImFjdGl2ZVNlbnNvciIsImNhbGxiYWNrIiwib2ZmIiwiY29weSIsInNwbGljZSIsInRyaWdnZXIiLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJldmVudCIsInNlbnNvckV2ZW50IiwiZ2V0U2Vuc29yRXZlbnQiLCJvcmlnaW5hbEV2ZW50Iiwic291cmNlQ29udGFpbmVyIiwiaXNEcmFnRXZlbnQiLCJhcHBlbmRhYmxlQ29udGFpbmVyIiwiZ2V0QXBwZW5kYWJsZUNvbnRhaW5lciIsImNsb25lTm9kZSIsIm1pcnJvckNyZWF0ZWRFdmVudCIsIk1pcnJvckNyZWF0ZWRFdmVudCIsIm1pcnJvckF0dGFjaGVkRXZlbnQiLCJNaXJyb3JBdHRhY2hlZEV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZ2V0Q2xhc3NOYW1lRm9yIiwibWlycm9yTW92ZUV2ZW50IiwiTWlycm9yTW92ZUV2ZW50Iiwic2Nyb2xsYWJsZVBhcmVudCIsIm9mZnNldEhlaWdodCIsInNjcm9sbEhlaWdodCIsImRyYWdFdmVudCIsIkRyYWdTdGFydEV2ZW50IiwicmVtb3ZlQ2hpbGQiLCJkcmFnTW92ZUV2ZW50IiwiRHJhZ01vdmVFdmVudCIsIm92ZXJDb250YWluZXIiLCJjbG9zZXN0Q29udGFpbmVyIiwiaXNMZWF2aW5nQ29udGFpbmVyIiwiY3VycmVudE92ZXJDb250YWluZXIiLCJpc0xlYXZpbmdEcmFnZ2FibGUiLCJjdXJyZW50T3ZlciIsImlzT3ZlckNvbnRhaW5lciIsImlzT3ZlckRyYWdnYWJsZSIsImRyYWdPdXRFdmVudCIsIkRyYWdPdXRFdmVudCIsIm92ZXIiLCJkcmFnT3V0Q29udGFpbmVyRXZlbnQiLCJEcmFnT3V0Q29udGFpbmVyRXZlbnQiLCJkcmFnT3ZlckNvbnRhaW5lckV2ZW50IiwiRHJhZ092ZXJDb250YWluZXJFdmVudCIsImRyYWdPdmVyRXZlbnQiLCJEcmFnT3ZlckV2ZW50IiwiX3RoaXMiLCJkcmFnU3RvcEV2ZW50IiwiRHJhZ1N0b3BFdmVudCIsIm1pcnJvckRlc3Ryb3lFdmVudCIsIk1pcnJvckRlc3Ryb3lFdmVudCIsImxhc3RTb3VyY2UiLCJsYXN0U291cmNlQ29udGFpbmVyIiwic2V0VGltZW91dCIsImRyYWdQcmVzc3VyZUV2ZW50IiwiRHJhZ1ByZXNzdXJlRXZlbnQiLCJwcmVzc3VyZSIsImFwcGVuZFRvIiwicXVlcnlTZWxlY3RvciIsIkhUTUxFbGVtZW50IiwiX3RoaXMyIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjciLCJfZGlkSXRlcmF0b3JFcnJvcjciLCJfaXRlcmF0b3JFcnJvcjciLCJfaXRlcmF0b3I3IiwiX3N0ZXA3IiwiY29udGFpbmVyRWwiLCJkZXRhaWwiLCJ0ZXN0IiwiRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQiLCJEcmFnU3RvcFNlbnNvckV2ZW50IiwiRHJhZ01vdmVTZW5zb3JFdmVudCIsIkRyYWdTdGFydFNlbnNvckV2ZW50IiwiU2Vuc29yRXZlbnQiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMiLCJfaW5oZXJpdHMyIiwiX2luaGVyaXRzMyIsIl9hYnN0cmFjdEV2ZW50IiwiX2Fic3RyYWN0RXZlbnQyIiwiX0Fic3RyYWN0RXZlbnQiLCJnZXRQcm90b3R5cGVPZiIsIl9TZW5zb3JFdmVudCIsIl9TZW5zb3JFdmVudDIiLCJfU2Vuc29yRXZlbnQzIiwiX1NlbnNvckV2ZW50NCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImxhc3RFdmVudCIsImV4ZWMiLCIka2V5cyIsImVudW1CdWdLZXlzIiwia2V5cyIsImJpdG1hcCIsImlkIiwicHgiLCJyYW5kb20iLCJjb25jYXQiLCJ0b1N0cmluZyIsInNwbGl0IiwiZFBzIiwiSUVfUFJPVE8iLCJFbXB0eSIsImNyZWF0ZURpY3QiLCJpZnJhbWUiLCJsdCIsImd0IiwiaWZyYW1lRG9jdW1lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJzcmMiLCJjb250ZW50V2luZG93Iiwib3BlbiIsIndyaXRlIiwiY2xvc2UiLCJjcmVhdGUiLCJQcm9wZXJ0aWVzIiwicmVzdWx0IiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJkZWYiLCJoYXMiLCJUQUciLCJ0YWciLCJzdGF0Iiwic2hhcmVkIiwiU0hBUkVEIiwiY2VpbCIsImZsb29yIiwiaXNOYU4iLCJmbiIsInZhbHVlT2YiLCJMSUJSQVJZIiwid2tzRXh0IiwiJFN5bWJvbCIsImNoYXJBdCIsIl9zeW1ib2wiLCJfc3ltYm9sMiIsIl90eXBlb2YiLCJhRnVuY3Rpb24iLCJ0aGF0IiwiY3JlYXRlRWxlbWVudCIsInJlZGVmaW5lIiwiSXRlcmF0b3JzIiwiJGl0ZXJDcmVhdGUiLCJzZXRUb1N0cmluZ1RhZyIsIklURVJBVE9SIiwiQlVHR1kiLCJGRl9JVEVSQVRPUiIsIktFWVMiLCJWQUxVRVMiLCJyZXR1cm5UaGlzIiwiQmFzZSIsIk5BTUUiLCJERUZBVUxUIiwiSVNfU0VUIiwiRk9SQ0VEIiwiZ2V0TWV0aG9kIiwia2luZCIsInByb3RvIiwidmFsdWVzIiwiZW50cmllcyIsIkRFRl9WQUxVRVMiLCJWQUxVRVNfQlVHIiwiJG5hdGl2ZSIsIiRkZWZhdWx0IiwiJGVudHJpZXMiLCIkYW55TmF0aXZlIiwibWV0aG9kcyIsIkl0ZXJhdG9yUHJvdG90eXBlIiwicElFIiwidG9JT2JqZWN0IiwiZ09QRCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImhpZGRlbktleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiYXJyYXlJbmRleE9mIiwibmFtZXMiLCJfZHJhZ2dhYmxlIiwiX2RyYWdnYWJsZTIiLCJfZHJvcHBhYmxlRXZlbnQiLCJEcm9wcGFibGUiLCJfb25EcmFnU3RhcnQiLCJfb25EcmFnTW92ZSIsIl9vbkRyYWdTdG9wIiwiZHJvcHBhYmxlcyIsIl9nZXREcm9wcGFibGVzIiwiZHJvcHBhYmxlIiwiaW5pdGlhbERyb3BwYWJsZSIsImRyb3BwYWJsZUVsZW1lbnQiLCJjb250YWlucyIsIl9jbG9zZXN0RHJvcHBhYmxlIiwib3ZlckVtcHR5RHJvcHBhYmxlIiwiX2Ryb3AiLCJsYXN0RHJvcHBhYmxlIiwiX3JlbGVhc2UiLCJvY2N1cGllZENsYXNzIiwiZHJvcHBhYmxlT3ZlckV2ZW50IiwiRHJvcHBhYmxlT3ZlckV2ZW50IiwiZHJvcHBhYmxlT3V0RXZlbnQiLCJEcm9wcGFibGVPdXRFdmVudCIsImZyb20iLCJpbmNsdWRlcyIsIk5vZGVMaXN0IiwiX3NvcnRhYmxlRXZlbnQiLCJTb3J0YWJsZSIsIl9vbkRyYWdPdmVyQ29udGFpbmVyIiwiX29uRHJhZ092ZXIiLCJzdGFydEluZGV4Iiwic29ydGFibGVTdGFydEV2ZW50IiwiU29ydGFibGVTdGFydEV2ZW50IiwibW92ZXMiLCJtb3ZlIiwic29ydGFibGVTb3J0ZWRFdmVudCIsIlNvcnRhYmxlU29ydGVkRXZlbnQiLCJzb3J0YWJsZVN0b3BFdmVudCIsIlNvcnRhYmxlU3RvcEV2ZW50Iiwib2xkSW5kZXgiLCJuZXdJbmRleCIsIm9mZnNldCIsImluZGV4T2YiLCJjaGlsZHJlbiIsImVtcHR5T3ZlckNvbnRhaW5lciIsImRpZmZlcmVudENvbnRhaW5lciIsInNhbWVDb250YWluZXIiLCJtb3ZlSW5zaWRlRW1wdHlDb250YWluZXIiLCJtb3ZlV2l0aGluQ29udGFpbmVyIiwibW92ZU91dHNpZGVDb250YWluZXIiLCJvbGRDb250YWluZXIiLCJuZXdDb250YWluZXIiLCJpbnNlcnRCZWZvcmUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJfc3dhcHBhYmxlRXZlbnQiLCJTd2FwcGFibGUiLCJzd2FwcGFibGVTdGFydEV2ZW50IiwiU3dhcHBhYmxlU3RhcnRFdmVudCIsImxhc3RPdmVyIiwic3dhcCIsInN3YXBwYWJsZVN3YXBwZWRFdmVudCIsIlN3YXBwYWJsZVN3YXBwZWRFdmVudCIsInN3YXBwZWRFbGVtZW50Iiwic3dhcHBhYmxlU3RvcEV2ZW50IiwiU3dhcHBhYmxlU3RvcEV2ZW50Iiwid2l0aFRlbXBFbGVtZW50IiwidG1wRWxlbWVudCIsIm92ZXJQYXJlbnQiLCJzb3VyY2VQYXJlbnQiLCJfY29sbGlkYWJsZUV2ZW50IiwiX29uUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY3VycmVudEFuaW1hdGlvbkZyYW1lIiwiY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCIsImNvbGxpZGFibGVJbkV2ZW50IiwiQ29sbGlkYWJsZUluRXZlbnQiLCJjb2xsaWRpbmdFbGVtZW50IiwiY29sbGlkYWJsZU91dEV2ZW50IiwiQ29sbGlkYWJsZU91dEV2ZW50IiwibGFzdENvbGxpZGluZ0VsZW1lbnQiLCJlbnRlcmluZ0NvbGxpZGFibGUiLCJsZWF2aW5nQ29sbGlkYWJsZSIsImNvbGxpZGFibGVzIiwiX2dldENvbGxpZGFibGVzIiwiX3NuYXBwYWJsZUV2ZW50IiwiX29uRHJhZ091dCIsImZpcnN0U291cmNlIiwic25hcEluRXZlbnQiLCJTbmFwSW5FdmVudCIsInNuYXBPdXRFdmVudCIsIlNuYXBPdXRFdmVudCIsIkFSSUFfR1JBQkJFRCIsIkFSSUFfRFJPUEVGRkVDVCIsIlRBQklOREVYIiwiX29uSW5pdCIsIl9vbkRlc3Ryb3kiLCJzZXRBdHRyaWJ1dGUiLCJfcmVmMiIsInJlbW92ZUF0dHJpYnV0ZSIsIl9yZWYzIiwiX3JlZjQiLCJfb25NaXJyb3JDcmVhdGVkIiwiX29uTWlycm9yTW92ZSIsIm9uTWlycm9yQ3JlYXRlZCIsIm1pcnJvckNsYXNzIiwic2V0U3RhdGUiLCJtaXJyb3JPZmZzZXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJjb21wdXRlTWlycm9yRGltZW5zaW9ucyIsImNhbGN1bGF0ZU1pcnJvck9mZnNldCIsImFkZE1pcnJvckNsYXNzZXMiLCJwb3NpdGlvbk1pcnJvciIsInJlbW92ZU1pcnJvcklEIiwiY2F0Y2giLCJyYWYiLCJyZXNldE1pcnJvciIsIndpdGhQcm9taXNlIiwicG9zaXRpb24iLCJwb2ludGVyRXZlbnRzIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsInNvdXJjZVJlY3QiLCJfcmVmNCR3aXRoRnJhbWUiLCJ3aXRoRnJhbWUiLCJ4IiwieSIsInRyYW5zZm9ybSIsImZyYW1lIiwiX3JlZjUiLCJfcmVmNSRyYWYiLCJyZWplY3QiLCJDb2xsaWRhYmxlRXZlbnQiLCJfQ29sbGlkYWJsZUV2ZW50IiwiX0NvbGxpZGFibGVFdmVudDIiLCJEcmFnRXZlbnQiLCJoYXNNaXJyb3IiLCJfRHJhZ0V2ZW50IiwiX0RyYWdFdmVudDIiLCJfRHJhZ0V2ZW50MyIsIl9EcmFnRXZlbnQ0IiwiX0RyYWdFdmVudDUiLCJfRHJhZ0V2ZW50NiIsIl9EcmFnRXZlbnQ3IiwiX0RyYWdFdmVudDgiLCJEcmFnZ2FibGVFdmVudCIsIl9EcmFnZ2FibGVFdmVudCIsIl9EcmFnZ2FibGVFdmVudDIiLCJEcm9wcGFibGVFdmVudCIsIl9Ecm9wcGFibGVFdmVudCIsIl9Ecm9wcGFibGVFdmVudDIiLCJNaXJyb3JFdmVudCIsIl9NaXJyb3JFdmVudCIsIl9NaXJyb3JFdmVudDIiLCJfTWlycm9yRXZlbnQzIiwiX01pcnJvckV2ZW50NCIsIlNuYXBFdmVudCIsIl9TbmFwRXZlbnQiLCJfU25hcEV2ZW50MiIsIlNvcnRhYmxlRXZlbnQiLCJfU29ydGFibGVFdmVudCIsIl9Tb3J0YWJsZUV2ZW50MiIsIl9Tb3J0YWJsZUV2ZW50MyIsIlN3YXBwYWJsZUV2ZW50IiwiX1N3YXBwYWJsZUV2ZW50IiwiX1N3YXBwYWJsZUV2ZW50MiIsIl9Td2FwcGFibGVFdmVudDMiLCJjcmVhdGVFdmVudENsYXNzIiwiX3NvcnRhYmxlIiwiX3NvcnRhYmxlMiIsIl9zd2FwcGFibGUiLCJfc3dhcHBhYmxlMiIsIl9kcm9wcGFibGUiLCJfZHJvcHBhYmxlMiIsIkV2ZW50Q29uc3RydWN0b3IiLCJfc2Vuc29yIiwiX3NlbnNvcjIiLCJfc2Vuc29yRXZlbnQiLCJEcmFnU2Vuc29yIiwiX1NlbnNvciIsImN1cnJlbnRDb250YWluZXIiLCJfb25Nb3VzZURvd24iLCJfb25Nb3VzZVVwIiwiX29uRHJhZ0VuZCIsIl9vbkRyYWdEcm9wIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImVmZmVjdEFsbG93ZWQiLCJlbGVtZW50RnJvbVBvaW50IiwiY3VycmVudFRhcmdldCIsImRyYWdTdGFydEV2ZW50IiwiZm9ybSIsImNvbnRlbnRlZGl0YWJsZSIsImNsZWFyVGltZW91dCIsIm1vdXNlRG93blRpbWVvdXQiLCJGb3JjZVRvdWNoU2Vuc29yIiwibWlnaHREcmFnIiwiX29uTW91c2VGb3JjZVdpbGxCZWdpbiIsIl9vbk1vdXNlRm9yY2VEb3duIiwiX29uTW91c2VGb3JjZUNoYW5nZSIsIl9vbk1vdXNlTW92ZSIsInN0b3BQcm9wYWdhdGlvbiIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsIndlYmtpdEZvcmNlIiwiX29uTW91c2VGb3JjZUdsb2JhbENoYW5nZSIsIk1vdXNlU2Vuc29yIiwibW91c2VEb3duIiwiYnV0dG9uIiwiVG91Y2hTZW5zb3IiLCJjdXJyZW50U2Nyb2xsYWJsZVBhcmVudCIsIl9vblRvdWNoU3RhcnQiLCJfb25Ub3VjaEhvbGQiLCJfb25Ub3VjaEVuZCIsIl9vblRvdWNoTW92ZSIsIl9vblNjcm9sbCIsInRhcFRpbWVvdXQiLCJfb25Db250ZXh0TWVudSIsInRvdWNoIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsInNjcm9sbFgiLCJzY3JvbGxZIiwiJE9iamVjdCIsIkQiLCJkZXNjIiwic2V0UHJvdG90eXBlT2YiLCJ0b0xlbmd0aCIsInRvSW5kZXgiLCJJU19JTkNMVURFUyIsIiR0aGlzIiwiZWwiLCJmcm9tSW5kZXgiLCJnZXRLZXlzIiwiZ09QUyIsImdldFN5bWJvbHMiLCJzeW1ib2xzIiwiaXNFbnVtIiwiZG9jdW1lbnRFbGVtZW50IiwiY29mIiwiaXNBcnJheSIsImFyZyIsIk1FVEEiLCJzZXREZXNjIiwiaXNFeHRlbnNpYmxlIiwiRlJFRVpFIiwicHJldmVudEV4dGVuc2lvbnMiLCJzZXRNZXRhIiwidyIsImZhc3RLZXkiLCJnZXRXZWFrIiwib25GcmVlemUiLCJtZXRhIiwiTkVFRCIsIktFWSIsImdPUE4iLCJ3aW5kb3dOYW1lcyIsImdldFdpbmRvd05hbWVzIiwidG9PYmplY3QiLCJPYmplY3RQcm90byIsImNoZWNrIiwic2V0IiwiYnVnZ3kiLCJ0b0ludGVnZXIiLCJUT19TVFJJTkciLCJwb3MiLCJTdHJpbmciLCJjaGFyQ29kZUF0IiwibWF4IiwibWluIiwiYWRkVG9VbnNjb3BhYmxlcyIsInN0ZXAiLCJpdGVyYXRlZCIsIl90IiwiX2kiLCJfayIsIkFyZ3VtZW50cyIsIiRhdCIsInBvaW50IiwiREVTQ1JJUFRPUlMiLCIkZmFpbHMiLCJ3a3MiLCJ3a3NEZWZpbmUiLCJrZXlPZiIsImVudW1LZXlzIiwiZ09QTkV4dCIsIiRHT1BEIiwiJERQIiwiJEpTT04iLCJfc3RyaW5naWZ5Iiwic3RyaW5naWZ5IiwiSElEREVOIiwiVE9fUFJJTUlUSVZFIiwiU3ltYm9sUmVnaXN0cnkiLCJBbGxTeW1ib2xzIiwiT1BTeW1ib2xzIiwiVVNFX05BVElWRSIsIlFPYmplY3QiLCJzZXR0ZXIiLCJmaW5kQ2hpbGQiLCJzZXRTeW1ib2xEZXNjIiwicHJvdG9EZXNjIiwid3JhcCIsInN5bSIsImlzU3ltYm9sIiwiJGRlZmluZVByb3BlcnR5IiwiJGRlZmluZVByb3BlcnRpZXMiLCIkY3JlYXRlIiwiJHByb3BlcnR5SXNFbnVtZXJhYmxlIiwiRSIsIiRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCIkZ2V0T3duUHJvcGVydHlOYW1lcyIsIiRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJJU19PUCIsIiRzZXQiLCJrZXlGb3IiLCJ1c2VTZXR0ZXIiLCJ1c2VTaW1wbGUiLCJyZXBsYWNlciIsIiRyZXBsYWNlciIsIlRPX1NUUklOR19UQUciLCJjb2xsZWN0aW9ucyIsIkNvbGxlY3Rpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQUEsRUFBRSxZQUFXO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBR0FBLEdBQUVDLFNBQUYsQ0FBWTtBQUNYQyxXQUFTO0FBQ1IsbUJBQWdC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VVUsSUFBVixJQUFrQlYsVUFBVTdsQixLQUE1QjtBQUNEOztBQUVEO0FBQU8sS0F6L0tHO0FBMC9LVixZQTlqTGdCO0FBQWhCO0FBK2pMQyxDQXprTEQsRTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JCQSx5QyIsImZpbGUiOiJcXGpzXFxtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNWM3MzljYTBkYWRmNjdhNTBmZWUiLCJpbXBvcnQge1N3YXBwYWJsZX0gZnJvbSBcIi4uLy4uLy4uL3B1YmxpYy9qcy9kcmFnZ2FibGVcIjtcclxuXHJcbi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4xLiBBSkFYIFNldHVwXHJcbjIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG4zLiBHZW5lcmljIEZ1bmN0aW9uc1xyXG40LiBDb21wb25lbnRzXHJcblx0NC4xIE1vYmlsZSBNZW51XHJcblx0NC4yIERpYWxvZyAvIE1vZGFsXHJcblx0NC4zIERhdGEgVGFibGVcclxuXHQ0LjQgUHJvamVjdCBUb3BpY3MgW1N1cGVydmlzb3JdXHJcblx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQ0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG41LlxyXG42LiBJbml0aWFsaXNlIEV2ZXJ5dGhpbmdcclxuKi9cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuLy8gdmFyICR0YWJsZSA9ICQoJy50YWJsZS0tZmxvYXQtaGVhZCcpO1xyXG4vLyAkdGFibGUuZmxvYXRUaGVhZCh7XHJcbi8vIFx0dG9wOiAzOSxcclxuLy8gXHRwb3NpdGlvbjogJ2ZpeGVkJ1xyXG4vLyB9KTtcclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAxLiBBSkFYIFNldHVwXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuJC5hamF4U2V0dXAoe1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpXHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8vIEFkZHMgZ2xvYmFsIHVuZGVybGF5XHJcbiQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ1bmRlcmxheVwiPjwvZGl2PicpO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgMy4gR2VuZXJpYyBGdW5jdGlvbnNcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5mdW5jdGlvbiBzb3J0VGFibGUodGFibGUsIGNvbCwgcmV2ZXJzZSkge1xyXG5cdHZhciB0YiA9IHRhYmxlLnRCb2RpZXNbMF0sIC8vIHVzZSBgPHRib2R5PmAgdG8gaWdub3JlIGA8dGhlYWQ+YCBhbmQgYDx0Zm9vdD5gIHJvd3NcclxuXHRcdHRyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGIucm93cywgMCksIC8vIHB1dCByb3dzIGludG8gYXJyYXlcclxuXHRcdGk7XHJcblx0cmV2ZXJzZSA9IC0oKCtyZXZlcnNlKSB8fCAtMSk7XHJcblx0dHIgPSB0ci5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IC8vIHNvcnQgcm93c1xyXG5cdFx0cmV0dXJuIHJldmVyc2UgLy8gYC0xICpgIGlmIHdhbnQgb3Bwb3NpdGUgb3JkZXJcclxuXHRcdFx0KiAoYS5jZWxsc1tjb2xdLnRleHRDb250ZW50LnRyaW0oKSAvLyB1c2luZyBgLnRleHRDb250ZW50LnRyaW0oKWAgZm9yIHRlc3RcclxuXHRcdFx0XHQubG9jYWxlQ29tcGFyZShiLmNlbGxzW2NvbF0udGV4dENvbnRlbnQudHJpbSgpKVxyXG5cdFx0XHQpO1xyXG5cdH0pO1xyXG5cdGZvcihpID0gMDsgaSA8IHRyLmxlbmd0aDsgKytpKSB0Yi5hcHBlbmRDaGlsZCh0cltpXSk7IC8vIGFwcGVuZCBlYWNoIHJvdyBpbiBvcmRlclxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlU29ydGFibGUodGFibGUpIHtcclxuXHR2YXIgdGggPSB0YWJsZS50SGVhZCwgaTtcclxuXHR0aCAmJiAodGggPSB0aC5yb3dzWzBdKSAmJiAodGggPSB0aC5jZWxscyk7XHJcblx0aWYgKHRoKSBpID0gdGgubGVuZ3RoO1xyXG5cdGVsc2UgcmV0dXJuOyAvLyBpZiBubyBgPHRoZWFkPmAgdGhlbiBkbyBub3RoaW5nXHJcblx0d2hpbGUgKC0taSA+PSAwKSAoZnVuY3Rpb24gKGkpIHtcclxuXHRcdHZhciBkaXIgPSAxO1xyXG5cdFx0dGhbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7c29ydFRhYmxlKHRhYmxlLCBpLCAoZGlyID0gMSAtIGRpcikpfSk7XHJcblx0fShpKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VBbGxTb3J0YWJsZShwYXJlbnQpIHtcclxuXHRwYXJlbnQgPSBwYXJlbnQgfHwgZG9jdW1lbnQuYm9keTtcclxuXHR2YXIgdCA9IHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGFibGUnKSwgaSA9IHQubGVuZ3RoO1xyXG5cdHdoaWxlICgtLWkgPj0gMCkgbWFrZVNvcnRhYmxlKHRbaV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhY2NlcHRTdHVkZW50KHN0dWRlbnRfaWQpIHtcclxuXHQkLmFqYXgoe1xyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHR1cmw6ICcvc3VwZXJ2aXNvci9hY2NlcHRTdHVkZW50JyxcclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0c3R1ZGVudF9pZCA6IHN0dWRlbnRfaWRcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVqZWN0U3R1ZGVudChzdHVkZW50X2lkLCBwcm9qZWN0X2lkKSB7XHJcblx0JC5hamF4KHtcclxuXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0dXJsOiAnL3N1cGVydmlzb3IvcmVqZWN0U3R1ZGVudCcsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQgOiBwcm9qZWN0X2lkLFxyXG5cdFx0XHRzdHVkZW50X2lkIDogc3R1ZGVudF9pZFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4kKCcuc2hvdy1tb3JlJykub24oJ2NsaWNrJywgIGZ1bmN0aW9uKGUpIHtcclxuXHQkKHRoaXMpLmhpZGUoKTtcclxuXHQkKCcucHJvamVjdCcpLmFkZENsYXNzKCdleHBhbmQnKTtcclxufSk7XHJcblxyXG4vLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcbiQoXCIudG9waWNzLWxpc3RcIikucHJlcGVuZCgkKFwiLmZpcnN0XCIpKTtcclxuXHJcbi8vIFNVUEVSVklTT1JcclxuJCgnI2RlbGV0ZVByb2plY3RCdXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuZGVsZXRlUHJvamVjdCgkKCcjdGl0bGUnKS52YWwoKSk7IH0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LiBDb21wb25lbnRzXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC4xIE1vYmlsZSBNZW51XHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAgICogQ2xhc3MgY29uc3RydWN0b3IgZm9yIG1vYmlsZSBtZW51LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiAgICovXHJcbnZhciBNb2JpbGVNZW51ID0gIGZ1bmN0aW9uIE1vYmlsZU1lbnUoZWxlbWVudCkge1xyXG5cdGlmKHdpbmRvd1snTW9iaWxlTWVudSddID09IG51bGwpe1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuYWN0aXZhdG9yID0gJCh0aGlzLlNlbGVjdG9yc18uSEFNQlVSR0VSX0NPTlRBSU5FUik7XHJcblx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0VklTSUJMRTogJ2lzLXZpc2libGUnXHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdE1PQklMRV9NRU5VOiAnbmF2Lm1vYmlsZScsXHJcblx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRVTkRFUkxBWTogJy5tb2JpbGUtbmF2LXVuZGVybGF5J1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XHJcblx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVklTSUJMRSk7XHJcblxyXG5cdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlZJU0lCTEUpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5WSVNJQkxFKTtcclxuXHRcclxuXHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlZJU0lCTEUpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgbW9iaWxlTWVudSA9IHRoaXM7XHJcblx0dGhpcy5hY3RpdmF0b3Iub24oJ2NsaWNrJywgbW9iaWxlTWVudS5vcGVuTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHR0aGlzLnVuZGVybGF5Lm9uKCdjbGljaycsIG1vYmlsZU1lbnUuY2xvc2VNZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5NT0JJTEVfTUVOVSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMubW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjIgRGlhbG9nIC8gTW9kYWxcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG52YXIgRGlhbG9nID0gZnVuY3Rpb24gRGlhbG9nKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0dGhpcy51bmRlcmxheSA9ICQoJy51bmRlcmxheScpO1xyXG5cdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdHRoaXMubG9hZGVyID0gJChlbGVtZW50KS5maW5kKFwiLmxvYWRlclwiKTtcclxuXHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydEaWFsb2cnXSA9IERpYWxvZztcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0QUNUSVZFOiAnYWN0aXZlJyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0RElBTE9HX0NPTlRFTlQ6ICcuY29udGVudCcsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLnNob3coMCk7XHJcblx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHR2YXIgZGlhbG9nID0gdGhpcztcclxuXHJcblx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuZGF0YSgnYWN0aXZhdG9yJykgJiYgJCh0aGlzKS5kYXRhKCdkaWFsb2cnKSA9PSBkaWFsb2cuZGlhbG9nTmFtZSl7XHJcblx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIEFkZCBzZXBlcmF0b3IgYWZ0ZXIgaGVhZGVyXHJcblx0ZGlhbG9nLmhlYWRlci5hcHBlbmQoJzxocj4nKTtcclxuXHJcblx0Ly8gRm9yIGRpc2FiaWx0eVxyXG5cdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblxyXG5cdC8vIFNldCB1bmRlcmxheVxyXG5cdGRpYWxvZy51bmRlcmxheS5vbignY2xpY2snLCBkaWFsb2cuaGlkZURpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cclxuXHR0cnl7XHJcblx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGRpYWxvZy5zaG93RGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblx0XHR9KTtcclxuXHR9IGNhdGNoKGVycil7XHJcblx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIFwiICsgZGlhbG9nLmRpYWxvZ05hbWUgKyBcIiBoYXMgbm8gYWN0aXZhdG9yIGJ1dHRvbi5cIik7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmRpYWxvZyA9IG5ldyBEaWFsb2codGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDQuMyBEYXRhIFRhYmxlXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAgICogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiAgICovXHJcbnZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHR0aGlzLnJvd3MgPSAkLm1lcmdlKHRoaXMuYm9keVJvd3MsIHRoaXMuZm9vdFJvd3MpO1xyXG5cdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG53aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdE1BU1RFUl9DSEVDS0JPWDogJ3RoZWFkIC5tYXN0ZXItY2hlY2tib3gnLFxyXG5cdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYodGhpcy5tYXN0ZXJDaGVja2JveC5pcygnOmNoZWNrZWQnKSl7XHJcblx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRpZiAocm93KSB7XHJcblx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcblx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHJcblx0JCh0aGlzLmNoZWNrYm94ZXMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0fSk7XHJcblxyXG5cdCQodGhpcy5oZWFkZXJzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdCQodGhpcykuY3NzKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcclxuXHR9KTtcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5kYXRhVGFibGUgPSBuZXcgRGF0YVRhYmxlKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjQgUHJvamVjdCBUb3BpY3MgW1N1cGVydmlzb3JdXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAgICogQ2xhc3MgY29uc3RydWN0b3IgZm9yIHByb2plY3QgdG9waWNzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiAgICovXHJcbnZhciBQcm9qZWN0VG9waWNzID0gIGZ1bmN0aW9uIFByb2plY3RUb3BpY3MoKSB7fTtcclxud2luZG93WydQcm9qZWN0VG9waWNzJ10gPSBQcm9qZWN0VG9waWNzO1xyXG5cclxuUHJvamVjdFRvcGljcy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5Qcm9qZWN0VG9waWNzLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdEFERF9UT1BJQ19JTlBVVDogJyNhZGRUb3BpY0lucHV0JyxcclxuXHRORVdfVE9QSUNfSU5QVVRfQ09OVEFJTkVSOiAnI25ldy10b3BpYy1pbnB1dC1jb250YWluZXInLFxyXG59O1xyXG5cclxuUHJvamVjdFRvcGljcy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0U1BBQ0U6IDMyLFxyXG5cdEVOVEVSOiAxMyxcclxuXHRDT01NQTogNDVcclxufTtcclxuXHJcbnZhciBwcm9qZWN0VG9waWNzID0gbmV3IFByb2plY3RUb3BpY3MoKTtcclxuXHJcblByb2plY3RUb3BpY3MucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRhZGRUb3BpY1RvUHJvamVjdDogZnVuY3Rpb24gKHByb2plY3RJZCwgdG9waWNOYW1lKSB7XHJcblx0XHQkKCcubG9hZGVyJykuc2hvdygwKTtcclxuXHRcdHZhciBhamF4VXJsID0gXCIvcHJvamVjdHMvYWRkVG9waWNcIjtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiUE9TVFwiLFxyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHR0b3BpY19uYW1lOiB0b3BpY05hbWUsXHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdCQocHJvamVjdFRvcGljcy5TZWxlY3RvcnNfLkFERF9UT1BJQ19JTlBVVCkudmFsKCcnKTtcclxuXHRcdFx0XHQkKFwiLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWM6bGFzdFwiKS5hZnRlcignPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIGRhdGFbXCJpZFwiXSArICdcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRvcGljLXJlbW92ZVwiPlg8L2J1dHRvbj48cCBjbGFzcz1cInRvcGljLW5hbWVcIj4nICsgZGF0YVtcIm5hbWVcIl0gKyAnPC9wPjwvbGk+Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdCQoJ2JvZHknKS5hcHBlbmQoZGF0YSk7XHJcblx0XHRcdCQoJy5sb2FkZXInKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlVG9waWNGcm9tUHJvamVjdDogZnVuY3Rpb24gKHByb2plY3RJZCwgdG9waWNJZCkge1xyXG5cdFx0JCgnLmxvYWRlcicpLnNob3coMCk7XHJcblx0XHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL3JlbW92ZVRvcGljXCI7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIkRFTEVURVwiLFxyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHR0b3BpY19pZCA6IHRvcGljSWQsXHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWMnKS5lYWNoKGZ1bmN0aW9uKGksIG9iaikge1xyXG5cdFx0XHRcdFx0aWYoJCh0aGlzKS5kYXRhKCd0b3BpYy1pZCcpID09IHRvcGljSWQpe1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHQkKCcubG9hZGVyJykuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZVByb2plY3RQcmltYXJ5VG9waWM6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljSWQpIHtcclxuXHRcdCQoJy5sb2FkZXInKS5zaG93KDApO1xyXG5cdFx0dmFyIGFqYXhVcmwgPSBcIi9wcm9qZWN0cy91cGRhdGVQcmltYXJ5VG9waWNcIjtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiUEFUQ0hcIixcclxuXHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0dG9waWNfaWQgOiB0b3BpY0lkLFxyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoJyNlZGl0UHJvamVjdEZvcm0nKS5hdHRyKCdkYXRhLXByb2plY3QtaWQnLCB0b3BpY0lkKTtcclxuXHRcdFx0XHQkKCcudG9waWNzLWxpc3QuZWRpdCBsaS50b3BpYycpLmVhY2goZnVuY3Rpb24oaSwgb2JqKSB7XHJcblx0XHRcdFx0XHRpZigkKHRoaXMpLmRhdGEoJ3RvcGljLWlkJykgPT0gdG9waWNJZCl7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJmaXJzdFwiKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJmaXJzdFwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCgnLmxvYWRlcicpLmhpZGUoMCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG59O1xyXG5cclxuY29uc3Qgc3dhcHBhYmxlID0gbmV3IFN3YXBwYWJsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9waWNzLWxpc3QuZWRpdCcpLCB7XHJcbiAgZHJhZ2dhYmxlOiAnLnRvcGljJyxcclxufSk7XHJcblxyXG5zd2FwcGFibGUub24oJ3N3YXBwYWJsZTpzd2FwcGVkJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgcHJvamVjdElkID0gJCgnI2VkaXRQcm9qZWN0Rm9ybScpLmRhdGEoJ3Byb2plY3QtaWQnKTtcclxuXHR2YXIgb3JpZ2luYWxQcmltYXJ5VG9waWNJZCA9ICQoJyNlZGl0UHJvamVjdEZvcm0nKS5kYXRhKCdwcmltYXJ5LXRvcGljLWlkJyk7XHJcblx0dmFyIHRvcGljSWQgPSAkKFwiLnRvcGljcy1saXN0LmVkaXQgbGk6Zmlyc3QtY2hpbGRcIikuZGF0YSgndG9waWMtaWQnKTtcclxuXHRpZih0b3BpY0lkICE9IG9yaWdpbmFsUHJpbWFyeVRvcGljSWQpe1xyXG5cdFx0cHJvamVjdFRvcGljcy5mdW5jdGlvbnMudXBkYXRlUHJvamVjdFByaW1hcnlUb3BpYyhwcm9qZWN0SWQsIHRvcGljSWQpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBBZGQgbmV3IHRvcGljXHJcbiQocHJvamVjdFRvcGljcy5TZWxlY3RvcnNfLkFERF9UT1BJQ19JTlBVVCkua2V5cHJlc3MoZnVuY3Rpb24oZSkge1xyXG5cdGlmIChlLndoaWNoID09IHByb2plY3RUb3BpY3MuS2V5c18uRU5URVIpIHtcclxuXHRcdHZhciBwcm9qZWN0SWQgPSAkKFwiI2VkaXRQcm9qZWN0Rm9ybVwiKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHRwcm9qZWN0VG9waWNzLmZ1bmN0aW9ucy5hZGRUb3BpY1RvUHJvamVjdChwcm9qZWN0SWQsICQodGhpcykudmFsKCkpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBSZW1vdmUgdG9waWNcclxuJCgnLnRvcGljcy1saXN0LmVkaXQnKS5vbignY2xpY2snLCAnLnRvcGljIC50b3BpYy1yZW1vdmUnLCBmdW5jdGlvbigpe1xyXG5cdHZhciBwcm9qZWN0SWQgPSAkKFwiI2VkaXRQcm9qZWN0Rm9ybVwiKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0dmFyIHRvcGljSWQgPSAkKHRoaXMpLnBhcmVudCgnbGknKS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdHByb2plY3RUb3BpY3MuZnVuY3Rpb25zLnJlbW92ZVRvcGljRnJvbVByb2plY3QocHJvamVjdElkLCB0b3BpY0lkKTtcclxufSk7XHJcblxyXG4kKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5ORVdfVE9QSUNfSU5QVVRfQ09OVEFJTkVSKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHQkKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5BRERfVE9QSUNfSU5QVVQpLmZvY3VzKCk7XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gICAqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4gICAqL1xyXG52YXIgQWpheEZ1bmN0aW9ucyA9ICBmdW5jdGlvbiBBamF4RnVuY3Rpb25zKCkge307XHJcbndpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRTRUFSQ0hfQ09OVEFJTkVSOiAnLnNlYXJjaC1jb250YWluZXInLFxyXG5cdFNFQVJDSF9GSUxURVJfQ09OVEFJTkVSOiAnLnNlYXJjaC1maWx0ZXItY29udGFpbmVyJyxcclxuXHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0TE9HX0lOX0RJQUxPRzogJy5sb2dpbi5kaWFsb2cnLFxyXG5cdENIQU5HRV9BVVRIX0RJQUxPRzogJy5jaGFuZ2UtYXV0aC5kaWFsb2cnXHJcbn07XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5LZXlzXyA9IHtcclxuXHRTUEFDRTogMzIsXHJcblx0RU5URVI6IDEzLFxyXG5cdENPTU1BOiA0NVxyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdGRlbGV0ZVByb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0TmFtZSkge1xyXG5cdFx0aWYoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgXFxcIlwiICsgcHJvamVjdE5hbWUgK1wiXFxcIj9cIikpe1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHR5cGU6IFwiREVMRVRFXCIsXHJcblx0XHRcdFx0dXJsOiBcImVkaXRcIixcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbih1cmwpe1xyXG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4uL1wiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhlbGVtZW50KXtcclxuXHQkKGVsZW1lbnQpLnJlbW92ZUNsYXNzIChmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xyXG5cdFx0cmV0dXJuIChjbGFzc05hbWUubWF0Y2ggKC9cXGJzaGFkb3dcXC1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXNcclxuJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy1mb2N1cycpO1xyXG59KTtcclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXMgb3V0XHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1c291dCcsICBmdW5jdGlvbihlKXtcclxuXHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctMmRwJyk7XHJcbn0pO1xyXG5cclxuLy8gU0VBUkNIXHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0JVVFRPTikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIGNvbnRhaW5lciA9ICQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0NPTlRBSU5FUik7XHJcblx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdGlmKGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0Y29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0fSBlbHNle1xyXG5cdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC42IEVkaXQgVG9waWNzIFtBZG1pbl1cclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICAgKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuICAgKi9cclxudmFyIEVkaXRUb3BpYyA9IGZ1bmN0aW9uIEVkaXRUb3BpYyhlbGVtZW50KSB7XHJcblx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHR0aGlzLm9yaWdpbmFsTmFtZSA9ICQoZWxlbWVudCkuZGF0YShcIm9yaWdpbmFsLXRvcGljLW5hbWVcIik7XHJcblx0dGhpcy50b3BpY0lkID0gJChlbGVtZW50KS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdHRoaXMudG9waWNOYW1lSW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XHJcblx0dGhpcy5lZGl0QnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZWRpdC10b3BpYycpO1xyXG5cdHRoaXMuZGVsZXRlQnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZGVsZXRlLXRvcGljJyk7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG53aW5kb3dbJ0VkaXRUb3BpYyddID0gRWRpdFRvcGljO1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHt9O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdEVESVRfVE9QSUM6ICcuZWRpdC10b3BpYy1saXN0IC50b3BpYycsXHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdERFTEVURV9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRQQVRDSF9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRORVdfVE9QSUM6ICcvdG9waWNzLydcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdGVkaXRUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcmVzcG9uc2UgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIFxcXCJcIiArICB0aGlzLm9yaWdpbmFsTmFtZSArXCJcXFwiIHRvIFxcXCJcIiArICB0aGlzLnRvcGljTmFtZUlucHV0LnZhbCgpICtcIlxcXCI/XCIpO1xyXG5cclxuXHRcdGlmKHJlc3BvbnNlKXtcclxuXHRcdFx0dGhpcy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHR0aGlzLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHQkKCcubG9hZGVyJywgdGhpcy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdHVybDogdGhpcy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0Y29udGV4dDogdGhpcyxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHR0b3BpY19pZDogdGhpcy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0dG9waWNfbmFtZSA6IHRoaXMudG9waWNOYW1lSW5wdXQudmFsKClcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dGhpcy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHR0aGlzLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdHRoaXMub3JpZ2luYWxOYW1lID0gdGhpcy50b3BpY05hbWVJbnB1dC52YWwoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnZhbCh0aGlzLm9yaWdpbmFsTmFtZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHJlc3BvbnNlID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHRvcGljIFxcXCJcIiArICB0aGlzLm9yaWdpbmFsTmFtZSArXCJcXFwiP1wiKTtcclxuXHRcdGlmKHJlc3BvbnNlKXtcclxuXHRcdFx0dGhpcy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0dXJsOiB0aGlzLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRjb250ZXh0OiB0aGlzLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdHRvcGljX2lkOiB0aGlzLnRvcGljSWQsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50LmhpZGUoODAwLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlRWRpdFRvcGljRE9NOiBmdW5jdGlvbih0b3BpY0lkLCBvcmlnaW5hbE5hbWUpe1xyXG5cdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0fVxyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBlZGl0VG9waWMgPSB0aGlzO1xyXG5cdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuRWRpdFRvcGljID0gbmV3IEVkaXRUb3BpYyh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNS4gT1RIRVJcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vLyBBY2NlcHQgU3R1ZGVudFxyXG4kKCcuYWNjZXB0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0YWNjZXB0U3R1ZGVudCgkKHRoaXMpLmRhdGEoJ3N0dWRlbnRfaWQnKSk7XHJcbn0pO1xyXG5cclxuLy8gUmVqZWN0IFN0dWRlbnRcclxuJCgnLnJlamVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdHJlamVjdFN0dWRlbnQoJCh0aGlzKS5kYXRhKCdzdHVkZW50X2lkJyksICQodGhpcykuZGF0YSgncHJvamVjdF9pZCcpKTtcclxufSk7XHJcblxyXG4kKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQT1NUJyxcclxuXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKHNob3dEaWFsb2cpe1xyXG5cdFx0XHRpZihzaG93RGlhbG9nID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uQ0hBTkdFX0FVVEhfRElBTE9HKVswXS5kaWFsb2cuaXNDbG9zYWJsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5DSEFOR0VfQVVUSF9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS50ZXh0KGRhdGFbXCJyZXNwb25zZUpTT05cIl1bXCJlcnJvcnNcIl1bXCJ1c2VybmFtZVwiXVswXSk7XHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdCQoJy5mb3JtLWZpZWxkJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4kKCcjbmV3LXRvcGljLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHJcblx0JCgnLmxvYWRlcicsIHN1Ym1pdEJ1dHRvbikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQT1NUJyxcclxuXHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zLmNyZWF0ZUVkaXRUb3BpY0RPTShkYXRhW1wiaWRcIl0sIGRhdGFbXCJuYW1lXCJdKTtcclxuXHRcdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAoKSB7fVxyXG5cdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJCgnI3N0dWRlbnQtZWRpdC1saXN0JykuZmluZCgnLmNoZWNrYm94IGlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBzdGF0dXMgPSAkKHRoaXMpLnBhcmVudHMoKS5lcSgzKS5kYXRhKCdzdGF0dXMnKTtcclxuXHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcjc3R1ZGVudC1lZGl0LWxpc3QuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHR2YXIgZW1haWxCdXR0b25zZWxlY3RvciA9IFwiLmVtYWlsLXNlbGVjdGVkLlwiICsgc3RhdHVzO1xyXG5cdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cdFx0XHRlbWFpbFN0cmluZyArPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxufSk7XHJcblxyXG4kKCcuZWRpdC1zdHVkZW50LWxpc3QgLmVtYWlsLXNlbGVjdGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicpe1xyXG5cdFx0YWxlcnQoXCJZb3UgaGF2ZW4ndCBzZWxlY3RlZCBhbnlvbmUuXCIpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBVc2VkIGZvciB0cmFuc2FjdGlvbnNcclxuJCgnI3Nob3ctcmF3LXRhYmxlLWRhdGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRpZigkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSl7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmhpZGUoKTtcclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuc2hvdygpO1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gTkVXIFVTRVJcclxuLy8gcHV0IHRoaXMgc3R1ZmYgaW4gYW4gYXJyYXlcclxuJCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcbiQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0aWYoJCgnI3N0dWRlbnQtb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjYWRtaW4tb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gU1RSSU5HU1xyXG4kKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRpZigkKCcjc3R1ZGVudC1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNhZG1pbi1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDYuIFNlY29uZCBNYXJrZXJcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbnZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcblxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbWFya2VyID0gdGhpcztcclxuXHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxuXHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxufVxyXG5cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50ID0gZnVuY3Rpb24oc3R1ZGVudFJvd0RPTSwgbWFya2VyKXtcclxuXHR2YXIgcm93ID0gJChzdHVkZW50Um93RE9NKTtcclxuXHRcdFxyXG5cdG1hcmtlci51bnNlbGVjdEFsbChtYXJrZXIpO1xyXG5cdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHRoaXMpLmRhdGEoJ21hcmtlci1pZCcpID09IHJvdy5kYXRhKCdzdXBlcnZpc29yLWlkJykpe1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFx0XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvciA9IGZ1bmN0aW9uKHN1cGVydmlzb3JSb3dET00sIG1hcmtlcil7XHJcblx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdGlmKHJvdy5hdHRyKCdkaXNhYmxlZCcpKXtyZXR1cm47fVxyXG5cclxuXHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ICE9IG51bGwpe1xyXG5cdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gcm93O1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nKFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N1cGVydmlzb3ItbmFtZScpLCBcclxuXHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksIFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKSk7XHJcblx0fVxyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnJlc2V0VmlldyA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihzdHVkZW50TmFtZSwgc3VwZXJ2aXNvck5hbWUsIG1hcmtlck5hbWUsIHByb2plY3Qpe1xyXG5cdCQoXCIjc3R1ZGVudC1uYW1lXCIpLnRleHQoc3R1ZGVudE5hbWUpO1xyXG5cdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdCQoXCIjbWFya2VyLW5hbWVcIikudGV4dChtYXJrZXJOYW1lKTtcclxuXHJcblx0JChcIiNwcm9qZWN0LXRpdGxlXCIpLmh0bWwoJzxiPlRpdGxlOiA8L2I+JyArIHByb2plY3RbXCJ0aXRsZVwiXSk7XHJcblx0JChcIiNwcm9qZWN0LWRlc2NyaXB0aW9uXCIpLmh0bWwoJzxiPkRlc2NyaXB0aW9uOiA8L2I+JyArIHByb2plY3RbXCJkZXNjcmlwdGlvblwiXSk7XHJcblxyXG5cdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG59XHJcblxyXG4kKCcjc3VibWl0QXNzaWduTWFya2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgbWFya2VyID0gd2luZG93WydNYXJrZXInXTtcclxuXHJcblx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdHJldHVybjtcclxuXHR9O1xyXG5cclxuXHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0dmFyIHByb2plY3RJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpW1wiaWRcIl07XHJcblx0dmFyIG1hcmtlcklkID0gbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvci5kYXRhKCdtYXJrZXItaWQnKTtcclxuXHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL2Fzc2lnbk1hcmtlclwiO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWQsXHJcblx0XHRcdG1hcmtlcl9pZDogbWFya2VySWRcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcblx0XHR9LFxyXG5cdFx0Ly8gQWRkIGZhaWxcclxuXHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQucmVtb3ZlKCk7XHJcblx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDYuIEluaXRpYWxpc2UgRXZlcnl0aGluZ1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5EaWFsb2cucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5NYXJrZXIucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHJcbnZhciBwYWdlTnVtYmVyID0gMjtcclxudmFyIHJlYWNoZWRFbmRPZlByb2plY3RUYWJsZSA9IGZhbHNlLCBcclxuXHRhd2FpdGluZ1Jlc3BvbnNlID0gZmFsc2U7XHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSA9PSAkKGRvY3VtZW50KS5oZWlnaHQoKSkge1xyXG5cclxuXHRcdGlmKCEkKCcjcHJvamVjdC10YWJsZScpLmhhc0NsYXNzKFwiaW5kZXhcIikpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIXJlYWNoZWRFbmRPZlByb2plY3RUYWJsZSAmJiAhYXdhaXRpbmdSZXNwb25zZSl7XHJcblx0XHRcdCQoXCIubG9hZGVyLnByb2plY3RzXCIpLnNob3coKTtcclxuXHRcdFx0YXdhaXRpbmdSZXNwb25zZSA9IHRydWU7XHJcblx0XHRcdHZhciB1cmxQYXRoID0gXCIvcHJvamVjdHMvcGFnaW5hdGVkP3BhZ2U9XCIgKyBwYWdlTnVtYmVyO1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdHR5cGUgOiAnR0VUJyxcclxuXHRcdFx0XHR1cmw6IHVybFBhdGgsXHJcblx0XHRcdFx0c3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0JChcIi5sb2FkZXIucHJvamVjdHNcIikuaGlkZSgpO1xyXG5cdFx0XHRcdFx0aWYoZGF0YS5sZW5ndGggPT0gMCl7XHJcblx0XHRcdFx0XHRcdHJlYWNoZWRFbmRPZlByb2plY3RUYWJsZSA9IHRydWU7XHJcblx0XHRcdFx0XHRcdCQoJyNwcm9qZWN0LXRhYmxlJykuYWZ0ZXIoJzxkaXYgc3R5bGU9XCJ3aWR0aDogMTBweDtoZWlnaHQ6IDEwcHg7bWFyZ2luOiAxcmVtIGF1dG87YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjA3KTtib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTEpO2JvcmRlci1yYWRpdXM6IDkwcHg7XCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0JCgnI3Byb2plY3QtdGFibGUgdGJvZHknKS5hcHBlbmQoJChkYXRhKSk7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShcIlwiLCBcIlwiLCBcIi9wcm9qZWN0cz9wYWdlPVwiICsgcGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRwYWdlTnVtYmVyICs9IDE7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcjogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGF3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKFwiLmxvYWRlci5wcm9qZWN0c1wiKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanMiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkRyYWdnYWJsZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEcmFnZ2FibGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRHJhZ2dhYmxlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNjMpO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY5KTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oNzApO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY4KTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNyk7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEFsbCBldmVudHMgZmlyZWQgYnkgZHJhZ2dhYmxlIGluaGVyaXQgdGhpcyBjbGFzcy4gWW91IGNhbiBjYWxsIGBjYW5jZWwoKWAgdG9cbiAqIGNhbmNlbCBhIHNwZWNpZmljIGV2ZW50IG9yIHlvdSBjYW4gY2hlY2sgaWYgYW4gZXZlbnQgaGFzIGJlZW4gY2FuY2VsZWQgYnlcbiAqIGNhbGxpbmcgYGNhbmNlbGVkKClgLlxuICogQGFic3RyYWN0XG4gKiBAY2xhc3NcbiAqL1xudmFyIEFic3RyYWN0RXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFic3RyYWN0RXZlbnQoZGF0YSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEFic3RyYWN0RXZlbnQpO1xuXG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQWJzdHJhY3RFdmVudCwgW3tcbiAgICBrZXk6ICdjYW5jZWwnLFxuXG5cbiAgICAvKipcbiAgICAgKiBDYW5jZWxzIGEgc3BlY2lmaWMgZXZlbnRcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgLy8gV2Ugc2hvdWxkIGJlIGRlY2xhcmluZyBpZiBldmVudHMgYXJlIGNhbmNlbGFibGVcbiAgICAgIC8vIGlmICghdGhpcy5jYW5jZWxhYmxlKSB7XG4gICAgICAvLyAgIHRocm93IG5ldyBFcnJvcignVGhpcyBldmVudCBpcyBub3QgY2FuY2VsYWJsZScpO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5fY2FuY2VsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGV2ZW50IGhhcyBiZWVuIGNhbmNlbGVkXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2FuY2VsZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5jZWxlZCgpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuX2NhbmNlbGVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0eXBlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnR5cGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2FuY2VsYWJsZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jYW5jZWxhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQWJzdHJhY3RFdmVudDtcbn0oKTtcblxuQWJzdHJhY3RFdmVudC50eXBlID0gJ2V2ZW50JztcbkFic3RyYWN0RXZlbnQuY2FuY2VsYWJsZSA9IGZhbHNlO1xuZXhwb3J0cy5kZWZhdWx0ID0gQWJzdHJhY3RFdmVudDtcblxuLyoqKi8gfSksXG4vKiA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIV9fd2VicGFja19yZXF1aXJlX18oMjApKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGFuT2JqZWN0ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcbiAgLCBJRThfRE9NX0RFRklORSA9IF9fd2VicGFja19yZXF1aXJlX18oNDEpXG4gICwgdG9QcmltaXRpdmUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cbi8qKiovIH0pLFxuLyogOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MylcbiAgLCBkZWZpbmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuLyoqKi8gfSksXG4vKiAxMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbi8qKiovIH0pLFxuLyogMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRQICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpXG4gICwgY3JlYXRlRGVzYyA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuLyoqKi8gfSksXG4vKiAxMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgc3RvcmUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKVxuICAsIFN5bWJvbCAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG4vKioqLyB9KSxcbi8qIDEzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNsb3Nlc3QgPSBjbG9zZXN0O1xuZXhwb3J0cy5zY3JvbGwgPSBzY3JvbGw7XG4vKiogQG1vZHVsZSB1dGlscyAqL1xuXG5mdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZGl0aW9uRm4oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoIWN1cnJlbnRFbGVtZW50KSB7XG4gICAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgbWF0Y2hGdW5jdGlvbiA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvcjtcbiAgICAgIHJldHVybiBtYXRjaEZ1bmN0aW9uLmNhbGwoY3VycmVudEVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yKGN1cnJlbnRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICB2YXIgY3VycmVudCA9IGVsZW1lbnQ7XG5cbiAgZG8ge1xuICAgIGN1cnJlbnQgPSBjdXJyZW50LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50IHx8IGN1cnJlbnQuY29ycmVzcG9uZGluZ0VsZW1lbnQgfHwgY3VycmVudDtcbiAgICBpZiAoY29uZGl0aW9uRm4oY3VycmVudCkpIHtcbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cbiAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICB9IHdoaWxlIChjdXJyZW50ICE9PSBkb2N1bWVudC5ib2R5ICYmIGN1cnJlbnQgIT09IGRvY3VtZW50KTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxudmFyIHNjcm9sbEFuaW1hdGlvbkZyYW1lID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBzY3JvbGwoZWxlbWVudCwgX3JlZikge1xuICB2YXIgY2xpZW50WCA9IF9yZWYuY2xpZW50WCxcbiAgICAgIGNsaWVudFkgPSBfcmVmLmNsaWVudFksXG4gICAgICBzcGVlZCA9IF9yZWYuc3BlZWQsXG4gICAgICBzZW5zaXRpdml0eSA9IF9yZWYuc2Vuc2l0aXZpdHk7XG5cbiAgaWYgKHNjcm9sbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc2Nyb2xsQW5pbWF0aW9uRnJhbWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsRm4oKSB7XG4gICAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBvZmZzZXRZID0gKE1hdGguYWJzKHJlY3QuYm90dG9tIC0gY2xpZW50WSkgPD0gc2Vuc2l0aXZpdHkpIC0gKE1hdGguYWJzKHJlY3QudG9wIC0gY2xpZW50WSkgPD0gc2Vuc2l0aXZpdHkpO1xuICAgIHZhciBvZmZzZXRYID0gKE1hdGguYWJzKHJlY3QucmlnaHQgLSBjbGllbnRYKSA8PSBzZW5zaXRpdml0eSkgLSAoTWF0aC5hYnMocmVjdC5sZWZ0IC0gY2xpZW50WCkgPD0gc2Vuc2l0aXZpdHkpO1xuICAgIGVsZW1lbnQuc2Nyb2xsVG9wICs9IG9mZnNldFkgKiBzcGVlZDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgKz0gb2Zmc2V0WCAqIHNwZWVkO1xuICAgIHNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbEZuKTtcbiAgfVxuXG4gIHNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbEZuKTtcbn1cblxuLyoqKi8gfSksXG4vKiAxNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuLyoqKi8gfSksXG4vKiAxNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KVxuICAsIGNvcmUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTApXG4gICwgY3R4ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSlcbiAgLCBoaWRlICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG4vKioqLyB9KSxcbi8qIDE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuLyoqKi8gfSksXG4vKiAxNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblxudmFyIF9hY2Nlc3NpYmlsaXR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Myk7XG5cbnZhciBfYWNjZXNzaWJpbGl0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hY2Nlc3NpYmlsaXR5KTtcblxudmFyIF9taXJyb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU0KTtcblxudmFyIF9taXJyb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWlycm9yKTtcblxudmFyIF9jb2xsaWRhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSk7XG5cbnZhciBfY29sbGlkYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xsaWRhYmxlKTtcblxudmFyIF9zbmFwcGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKTtcblxudmFyIF9zbmFwcGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc25hcHBhYmxlKTtcblxudmFyIF9kcmFnU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NCk7XG5cbnZhciBfZHJhZ1NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmFnU2Vuc29yKTtcblxudmFyIF9tb3VzZVNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oNjYpO1xuXG52YXIgX21vdXNlU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vdXNlU2Vuc29yKTtcblxudmFyIF90b3VjaFNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oNjcpO1xuXG52YXIgX3RvdWNoU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvdWNoU2Vuc29yKTtcblxudmFyIF9mb3JjZVRvdWNoU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NSk7XG5cbnZhciBfZm9yY2VUb3VjaFNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mb3JjZVRvdWNoU2Vuc29yKTtcblxudmFyIF9kcmFnZ2FibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTcpO1xuXG52YXIgX2RyYWdFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTYpO1xuXG52YXIgX21pcnJvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgZHJhZ2dhYmxlOiAnLmRyYWdnYWJsZS1zb3VyY2UnLFxuICBoYW5kbGU6IG51bGwsXG4gIGRlbGF5OiAwLFxuICBwbGFjZWRUaW1lb3V0OiA4MDAsXG4gIG5hdGl2ZTogZmFsc2UsXG4gIHBsdWdpbnM6IFtfbWlycm9yMi5kZWZhdWx0LCBfYWNjZXNzaWJpbGl0eTIuZGVmYXVsdF0sXG4gIGNsYXNzZXM6IHtcbiAgICAnY29udGFpbmVyOmRyYWdnaW5nJzogJ2RyYWdnYWJsZS1jb250YWluZXItLWlzLWRyYWdnaW5nJyxcbiAgICAnc291cmNlOmRyYWdnaW5nJzogJ2RyYWdnYWJsZS1zb3VyY2UtLWlzLWRyYWdnaW5nJyxcbiAgICAnc291cmNlOnBsYWNlZCc6ICdkcmFnZ2FibGUtc291cmNlLS1wbGFjZWQnLFxuICAgICdjb250YWluZXI6cGxhY2VkJzogJ2RyYWdnYWJsZS1jb250YWluZXItLXBsYWNlZCcsXG4gICAgJ2JvZHk6ZHJhZ2dpbmcnOiAnZHJhZ2dhYmxlLS1pcy1kcmFnZ2luZycsXG4gICAgJ2RyYWdnYWJsZTpvdmVyJzogJ2RyYWdnYWJsZS0tb3ZlcicsXG4gICAgJ2NvbnRhaW5lcjpvdmVyJzogJ2RyYWdnYWJsZS1jb250YWluZXItLW92ZXInLFxuICAgIG1pcnJvcjogJ2RyYWdnYWJsZS1taXJyb3InXG4gIH1cbn07XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY29yZSBkcmFnZ2FibGUgbGlicmFyeSB0aGF0IGRvZXMgdGhlIGhlYXZ5IGxpZnRpbmdcbiAqIEBtb2R1bGUgRHJhZ2dhYmxlXG4gKi9cblxudmFyIERyYWdnYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ2dhYmxlLCBudWxsLCBbe1xuICAgIGtleTogJ1BsdWdpbnMnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHsgQWNjZXNzaWJpbGl0eTogX2FjY2Vzc2liaWxpdHkyLmRlZmF1bHQsIE1pcnJvcjogX21pcnJvcjIuZGVmYXVsdCB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ0JlaGF2aW91cicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4geyBDb2xsaWRhYmxlOiBfY29sbGlkYWJsZTIuZGVmYXVsdCwgU25hcHBhYmxlOiBfc25hcHBhYmxlMi5kZWZhdWx0IH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnN0cnVjdG9yLlxuICAgICAqIEBjb25zdHJ1Y3RzIERyYWdnYWJsZVxuICAgICAqIEBwYXJhbSB7QXJyYXl8Tm9kZUxpc3R9IGNvbnRhaW5lcnMgLSBEcmFnZ2FibGUgY29udGFpbmVyc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgZHJhZ2dhYmxlXG4gICAgICovXG5cbiAgfV0pO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZSk7XG5cbiAgICB0aGlzLmNvbnRhaW5lcnMgPSBjb250YWluZXJzO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICB0aGlzLmFjdGl2ZVNlbnNvcnMgPSBbXTtcbiAgICB0aGlzLmFjdGl2ZVBsdWdpbnMgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IHt9O1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMuZHJhZ1N0YXJ0ID0gdGhpcy5kcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRyYWdNb3ZlID0gdGhpcy5kcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZHJhZ1N0b3AgPSB0aGlzLmRyYWdTdG9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kcmFnUHJlc3N1cmUgPSB0aGlzLmRyYWdQcmVzc3VyZS5iaW5kKHRoaXMpO1xuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0LCB0cnVlKTtcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6bW92ZScsIHRoaXMuZHJhZ01vdmUsIHRydWUpO1xuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpzdG9wJywgdGhpcy5kcmFnU3RvcCwgdHJ1ZSk7XG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnOnByZXNzdXJlJywgdGhpcy5kcmFnUHJlc3N1cmUsIHRydWUpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMub3B0aW9ucy5wbHVnaW5zW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgIHZhciBQbHVnaW4gPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgdmFyIHBsdWdpbiA9IG5ldyBQbHVnaW4odGhpcyk7XG4gICAgICAgIHBsdWdpbi5hdHRhY2goKTtcbiAgICAgICAgdGhpcy5hY3RpdmVQbHVnaW5zLnB1c2gocGx1Z2luKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gdGhpcy5zZW5zb3JzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgdmFyIFNlbnNvciA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICB2YXIgc2Vuc29yID0gbmV3IFNlbnNvcih0aGlzLmNvbnRhaW5lcnMsIG9wdGlvbnMpO1xuICAgICAgICBzZW5zb3IuYXR0YWNoKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlU2Vuc29ycy5wdXNoKHNlbnNvcik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMy5yZXR1cm4oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gbmV3IF9kcmFnZ2FibGVFdmVudC5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KHtcbiAgICAgIGRyYWdnYWJsZTogdGhpc1xuICAgIH0pO1xuXG4gICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgRHJhZ2dhYmxlIGluc3RhbmNlLiBUaGlzIHJlbW92ZXMgYWxsIGludGVybmFsIGV2ZW50IGxpc3RlbmVycyBhbmRcbiAgICogZGVhY3RpdmF0ZXMgc2Vuc29ycyBhbmQgcGx1Z2luc1xuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdnYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gdGhpcy5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA0OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gKF9zdGVwNCA9IF9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lciA9IF9zdGVwNC52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOnN0YXJ0JywgdGhpcy5kcmFnU3RhcnQsIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOm1vdmUnLCB0aGlzLmRyYWdNb3ZlLCB0cnVlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZzpzdG9wJywgdGhpcy5kcmFnU3RvcCwgdHJ1ZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6cHJlc3N1cmUnLCB0aGlzLmRyYWdQcmVzc3VyZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjQgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjQgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgJiYgX2l0ZXJhdG9yNC5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjQucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjQpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGRyYWdnYWJsZURlc3Ryb3lFdmVudCA9IG5ldyBfZHJhZ2dhYmxlRXZlbnQuRHJhZ2dhYmxlRGVzdHJveUV2ZW50KHtcbiAgICAgICAgZHJhZ2dhYmxlOiB0aGlzXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ2dhYmxlRGVzdHJveUV2ZW50KTtcblxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjUgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjUgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjUgPSB0aGlzLmFjdGl2ZVBsdWdpbnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDU7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgPSAoX3N0ZXA1ID0gX2l0ZXJhdG9yNS5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgYWN0aXZlUGx1Z2luID0gX3N0ZXA1LnZhbHVlO1xuXG4gICAgICAgICAgYWN0aXZlUGx1Z2luLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I1ID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3I1ID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ICYmIF9pdGVyYXRvcjUucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I1LnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I1KSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I2ID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I2ID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I2ID0gdGhpcy5hY3RpdmVTZW5zb3JzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA2OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ID0gKF9zdGVwNiA9IF9pdGVyYXRvcjYubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGFjdGl2ZVNlbnNvciA9IF9zdGVwNi52YWx1ZTtcblxuICAgICAgICAgIGFjdGl2ZVNlbnNvci5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yNiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yNiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiAmJiBfaXRlcmF0b3I2LnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I2O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgbGlzdGVuZXIgZm9yIGRyYWdnYWJsZSBldmVudHNcbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCAoZHJhZ0V2ZW50KSA9PiBkcmFnRXZlbnQuY2FuY2VsKCkpO1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoIXRoaXMuY2FsbGJhY2tzW3R5cGVdKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzW3R5cGVdID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2FsbGJhY2tzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lciBmcm9tIGRyYWdnYWJsZVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5vZmYoJ2RyYWc6c3RhcnQnLCBoYW5kbGVyRnVuY3Rpb24pO1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvZmYnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvZmYodHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghdGhpcy5jYWxsYmFja3NbdHlwZV0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgY29weSA9IHRoaXMuY2FsbGJhY2tzW3R5cGVdLnNsaWNlKDApO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3B5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayA9PT0gY29weVtpXSkge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW3R5cGVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndHJpZ2dlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIodHlwZSkge1xuICAgICAgaWYgKCF0aGlzLmNhbGxiYWNrc1t0eXBlXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMuY2FsbGJhY2tzW3R5cGVdLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzW3R5cGVdW2ldO1xuICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2ZSBzZW5zb3JzXG4gICAgICogQHJldHVybiB7QXJyYXl9IHNlbnNvcnNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29ycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlbnNvcnMoKSB7XG4gICAgICByZXR1cm4gW190b3VjaFNlbnNvcjIuZGVmYXVsdCwgX2ZvcmNlVG91Y2hTZW5zb3IyLmRlZmF1bHQsIHRoaXMub3B0aW9ucy5uYXRpdmUgPyBfZHJhZ1NlbnNvcjIuZGVmYXVsdCA6IF9tb3VzZVNlbnNvcjIuZGVmYXVsdF07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZHJhZ1N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB2YXIgc2Vuc29yRXZlbnQgPSBnZXRTZW5zb3JFdmVudChldmVudCk7XG4gICAgICB2YXIgdGFyZ2V0ID0gc2Vuc29yRXZlbnQudGFyZ2V0LFxuICAgICAgICAgIGNvbnRhaW5lciA9IHNlbnNvckV2ZW50LmNvbnRhaW5lcixcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50ID0gc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudDtcblxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhhbmRsZSAmJiB0YXJnZXQgJiYgISgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuaGFuZGxlKSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIGRyYWdnYWJsZSBzb3VyY2UgZWxlbWVudFxuICAgICAgdGhpcy5zb3VyY2UgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSk7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgICAgaWYgKCF0aGlzLnNvdXJjZSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKCFpc0RyYWdFdmVudChvcmlnaW5hbEV2ZW50KSkge1xuICAgICAgICB2YXIgYXBwZW5kYWJsZUNvbnRhaW5lciA9IHRoaXMuZ2V0QXBwZW5kYWJsZUNvbnRhaW5lcih7IHNvdXJjZTogdGhpcy5zb3VyY2UgfSk7XG4gICAgICAgIHRoaXMubWlycm9yID0gdGhpcy5zb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgIHZhciBtaXJyb3JDcmVhdGVkRXZlbnQgPSBuZXcgX21pcnJvckV2ZW50Lk1pcnJvckNyZWF0ZWRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbWlycm9yQXR0YWNoZWRFdmVudCA9IG5ldyBfbWlycm9yRXZlbnQuTWlycm9yQXR0YWNoZWRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChtaXJyb3JDcmVhdGVkRXZlbnQpO1xuICAgICAgICBhcHBlbmRhYmxlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubWlycm9yKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobWlycm9yQXR0YWNoZWRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignYm9keTpkcmFnZ2luZycpKTtcblxuICAgICAgaWYgKHRoaXMubWlycm9yKSB7XG4gICAgICAgIHZhciBtaXJyb3JNb3ZlRXZlbnQgPSBuZXcgX21pcnJvckV2ZW50Lk1pcnJvck1vdmVFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChtaXJyb3JNb3ZlRXZlbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIHRoZSBjbG9zZXN0IHNjcm9sbGFibGUgcGFyZW50XG4gICAgICB0aGlzLnNjcm9sbGFibGVQYXJlbnQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGNvbnRhaW5lciwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IDwgZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICB9KTtcblxuICAgICAgdmFyIGRyYWdFdmVudCA9IG5ldyBfZHJhZ0V2ZW50LkRyYWdTdGFydEV2ZW50KHtcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdFdmVudCk7XG5cbiAgICAgIGlmICghZHJhZ0V2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taXJyb3IpIHtcbiAgICAgICAgdGhpcy5taXJyb3IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm1pcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignYm9keTpkcmFnZ2luZycpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyRXZlbnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyRXZlbnQoZXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyaWdnZXIoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RyYWdNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciBjb250YWluZXIgPSBzZW5zb3JFdmVudC5jb250YWluZXI7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBzZW5zb3JFdmVudC50YXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ01vdmVFdmVudCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXJFdmVudChkcmFnTW92ZUV2ZW50KTtcblxuICAgICAgaWYgKGRyYWdNb3ZlRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWlycm9yICYmICFkcmFnTW92ZUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgdmFyIG1pcnJvck1vdmVFdmVudCA9IG5ldyBfbWlycm9yRXZlbnQuTWlycm9yTW92ZUV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG1pcnJvck1vdmVFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRhcmdldCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcbiAgICAgIHZhciBvdmVyQ29udGFpbmVyID0gc2Vuc29yRXZlbnQub3ZlckNvbnRhaW5lciB8fCB0aGlzLmNsb3Nlc3RDb250YWluZXIoc2Vuc29yRXZlbnQudGFyZ2V0KTtcbiAgICAgIHZhciBpc0xlYXZpbmdDb250YWluZXIgPSB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyICYmIG92ZXJDb250YWluZXIgIT09IHRoaXMuY3VycmVudE92ZXJDb250YWluZXI7XG4gICAgICB2YXIgaXNMZWF2aW5nRHJhZ2dhYmxlID0gdGhpcy5jdXJyZW50T3ZlciAmJiB0YXJnZXQgIT09IHRoaXMuY3VycmVudE92ZXI7XG4gICAgICB2YXIgaXNPdmVyQ29udGFpbmVyID0gb3ZlckNvbnRhaW5lciAmJiB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyICE9PSBvdmVyQ29udGFpbmVyO1xuICAgICAgdmFyIGlzT3ZlckRyYWdnYWJsZSA9IHRhcmdldCAmJiB0aGlzLmN1cnJlbnRPdmVyICE9PSB0YXJnZXQ7XG5cbiAgICAgIGlmIChpc0xlYXZpbmdEcmFnZ2FibGUpIHtcbiAgICAgICAgdmFyIGRyYWdPdXRFdmVudCA9IG5ldyBfZHJhZ0V2ZW50LkRyYWdPdXRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyOiB0aGlzLmN1cnJlbnRPdmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdPdXRFdmVudCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3Zlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcmFnZ2FibGU6b3ZlcicpKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlciA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0xlYXZpbmdDb250YWluZXIpIHtcbiAgICAgICAgdmFyIGRyYWdPdXRDb250YWluZXJFdmVudCA9IG5ldyBfZHJhZ0V2ZW50LkRyYWdPdXRDb250YWluZXJFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyQ29udGFpbmVyOiB0aGlzLm92ZXJDb250YWluZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ091dENvbnRhaW5lckV2ZW50KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpvdmVyJykpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzT3ZlckNvbnRhaW5lcikge1xuICAgICAgICBvdmVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpvdmVyJykpO1xuXG4gICAgICAgIHZhciBkcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ092ZXJDb250YWluZXJFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyQ29udGFpbmVyOiBvdmVyQ29udGFpbmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdPdmVyQ29udGFpbmVyRXZlbnQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgPSBvdmVyQ29udGFpbmVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNPdmVyRHJhZ2dhYmxlKSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcmFnZ2FibGU6b3ZlcicpKTtcblxuICAgICAgICB2YXIgZHJhZ092ZXJFdmVudCA9IG5ldyBfZHJhZ0V2ZW50LkRyYWdPdmVyRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgICAgb3ZlckNvbnRhaW5lcjogb3ZlckNvbnRhaW5lcixcbiAgICAgICAgICBvdmVyOiB0YXJnZXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ092ZXJFdmVudCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlciA9IHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkcmFnU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYWdTdG9wKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ1N0b3BFdmVudCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgIHNlbnNvckV2ZW50OiBldmVudC5zZW5zb3JFdmVudCxcbiAgICAgICAgc291cmNlQ29udGFpbmVyOiB0aGlzLnNvdXJjZUNvbnRhaW5lclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLnNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgICB0aGlzLnNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6cGxhY2VkJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOnBsYWNlZCcpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignYm9keTpkcmFnZ2luZycpKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudE92ZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50T3Zlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcmFnZ2FibGU6b3ZlcicpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudE92ZXJDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6b3ZlcicpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWlycm9yKSB7XG4gICAgICAgIHZhciBtaXJyb3JEZXN0cm95RXZlbnQgPSBuZXcgX21pcnJvckV2ZW50Lk1pcnJvckRlc3Ryb3lFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogc2Vuc29yRXZlbnQuY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChtaXJyb3JEZXN0cm95RXZlbnQpO1xuXG4gICAgICAgIGlmICghbWlycm9yRGVzdHJveUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgICB0aGlzLm1pcnJvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubWlycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgbGFzdFNvdXJjZSA9IHRoaXMuc291cmNlO1xuICAgICAgdmFyIGxhc3RTb3VyY2VDb250YWluZXIgPSB0aGlzLnNvdXJjZUNvbnRhaW5lcjtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChsYXN0U291cmNlKSB7XG4gICAgICAgICAgbGFzdFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKF90aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0U291cmNlQ29udGFpbmVyKSB7XG4gICAgICAgICAgbGFzdFNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKF90aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOnBsYWNlZCcpKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5vcHRpb25zLnBsYWNlZFRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgICB0aGlzLm1pcnJvciA9IG51bGw7XG4gICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuY3VycmVudE92ZXIgPSBudWxsO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIgPSBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RyYWdQcmVzc3VyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYWdQcmVzc3VyZShldmVudCkge1xuICAgICAgdmFyIHNlbnNvckV2ZW50ID0gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpO1xuICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuc291cmNlIHx8ICgwLCBfdXRpbHMuY2xvc2VzdCkoc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX2RyYWdFdmVudC5EcmFnUHJlc3N1cmVFdmVudCh7XG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgIHByZXNzdXJlOiBzZW5zb3JFdmVudC5wcmVzc3VyZVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdQcmVzc3VyZUV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRBcHBlbmRhYmxlQ29udGFpbmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QXBwZW5kYWJsZUNvbnRhaW5lcihfcmVmKSB7XG4gICAgICB2YXIgc291cmNlID0gX3JlZi5zb3VyY2U7XG5cbiAgICAgIHZhciBhcHBlbmRUbyA9IHRoaXMub3B0aW9ucy5hcHBlbmRUbztcblxuICAgICAgaWYgKHR5cGVvZiBhcHBlbmRUbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXBwZW5kVG8pO1xuICAgICAgfSBlbHNlIGlmIChhcHBlbmRUbyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBhcHBlbmRUbztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBhcHBlbmRUbyhzb3VyY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2xhc3NOYW1lRm9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lRm9yKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xhc3Nlc1tuYW1lXSB8fCBkZWZhdWx0cy5jbGFzc2VzW25hbWVdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Nsb3Nlc3RDb250YWluZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZXN0Q29udGFpbmVyKHRhcmdldCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb243ID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNyA9IGZhbHNlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I3ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNyA9IF90aGlzMi5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA3OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb243ID0gKF9zdGVwNyA9IF9pdGVyYXRvcjcubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjcgPSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyRWwgPSBfc3RlcDcudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBjb250YWluZXJFbCkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yNyA9IHRydWU7XG4gICAgICAgICAgX2l0ZXJhdG9yRXJyb3I3ID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb243ICYmIF9pdGVyYXRvcjcucmV0dXJuKSB7XG4gICAgICAgICAgICAgIF9pdGVyYXRvcjcucmV0dXJuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjcpIHtcbiAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ2dhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcmFnZ2FibGU7XG5cblxuZnVuY3Rpb24gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LmRldGFpbDtcbn1cblxuZnVuY3Rpb24gaXNEcmFnRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuICgvXmRyYWcvLnRlc3QoZXZlbnQudHlwZSlcbiAgKTtcbn1cblxuLyoqKi8gfSksXG4vKiAxOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0b3BTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQgPSBleHBvcnRzLlNlbnNvckV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9hYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9hYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU2Vuc29yRXZlbnQgPSBleHBvcnRzLlNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNlbnNvckV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTZW5zb3JFdmVudCwgW3tcbiAgICBrZXk6ICdvcmlnaW5hbEV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3JpZ2luYWxFdmVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjbGllbnRYJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY2xpZW50WDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjbGllbnRZJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY2xpZW50WTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0YXJnZXQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS50YXJnZXQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY29udGFpbmVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3ByZXNzdXJlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEucHJlc3N1cmU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTZW5zb3JFdmVudDtcbn0oX2Fic3RyYWN0RXZlbnQyLmRlZmF1bHQpO1xuXG52YXIgRHJhZ1N0YXJ0U2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdGFydFNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9TZW5zb3JFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RhcnRTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnU3RhcnRTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RhcnRTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdGFydFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0YXJ0U2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RhcnRTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG5EcmFnU3RhcnRTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6c3RhcnQnO1xuXG52YXIgRHJhZ01vdmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVTZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfU2Vuc29yRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdNb3ZlU2Vuc29yRXZlbnQsIF9TZW5zb3JFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyYWdNb3ZlU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ01vdmVTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdNb3ZlU2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnTW92ZVNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ01vdmVTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG5EcmFnTW92ZVNlbnNvckV2ZW50LnR5cGUgPSAnZHJhZzptb3ZlJztcblxudmFyIERyYWdTdG9wU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdG9wU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RvcFNlbnNvckV2ZW50LCBfU2Vuc29yRXZlbnQzKTtcblxuICBmdW5jdGlvbiBEcmFnU3RvcFNlbnNvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdTdG9wU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU3RvcFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0b3BTZW5zb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdTdG9wU2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuRHJhZ1N0b3BTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6c3RvcCc7XG5cbnZhciBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50NCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnUHJlc3N1cmVTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdQcmVzc3VyZVNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQudHlwZSA9ICdkcmFnOnByZXNzdXJlJztcblxuLyoqKi8gfSksXG4vKiAxOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTZW5zb3IgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNlbnNvcik7XG5cbiAgICB0aGlzLmNvbnRhaW5lcnMgPSBjb250YWluZXJzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndHJpZ2dlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIoZWxlbWVudCwgc2Vuc29yRXZlbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgZXZlbnQuZGV0YWlsID0gc2Vuc29yRXZlbnQ7XG4gICAgICBldmVudC5pbml0RXZlbnQoc2Vuc29yRXZlbnQudHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgdGhpcy5sYXN0RXZlbnQgPSBzZW5zb3JFdmVudDtcbiAgICAgIHJldHVybiBzZW5zb3JFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNlbnNvcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vuc29yO1xuXG4vKioqLyB9KSxcbi8qIDIwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDIxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NilcbiAgLCBlbnVtQnVnS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDIyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiAyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuLyoqKi8gfSksXG4vKiAyNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cbi8qKiovIH0pLFxuLyogMjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cbi8qKiovIH0pLFxuLyogMjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLyoqKi8gfSksXG4vKiAyNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRydWU7XG5cbi8qKiovIH0pLFxuLyogMjggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuICAsIGRQcyAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4OSlcbiAgLCBlbnVtQnVnS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpXG4gICwgSUVfUFJPVE8gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDApKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDgyKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDI5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbmV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKioqLyB9KSxcbi8qIDMwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLmZcbiAgLCBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMikoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHNoYXJlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpKCdrZXlzJylcbiAgLCB1aWQgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDMzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG4gICwgY29yZSAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKVxuICAsIExJQlJBUlkgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNylcbiAgLCB3a3NFeHQgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpXG4gICwgZGVmaW5lUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuZXhwb3J0cy5mID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMik7XG5cbi8qKiovIH0pLFxuLyogMzcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IF9fd2VicGFja19yZXF1aXJlX18oNzIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcxKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc4KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNilcbiAgLCBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNSkuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSAhX193ZWJwYWNrX3JlcXVpcmVfXyg2KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXygyMCkoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuLyoqKi8gfSksXG4vKiA0MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIExJQlJBUlkgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNylcbiAgLCAkZXhwb3J0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG4gICwgcmVkZWZpbmUgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KVxuICAsIGhpZGUgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSlcbiAgLCBoYXMgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBJdGVyYXRvcnMgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg1KVxuICAsIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMClcbiAgLCBnZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oOTEpXG4gICwgSVRFUkFUT1IgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cbi8qKiovIH0pLFxuLyogNDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHBJRSAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOSlcbiAgLCBjcmVhdGVEZXNjICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpXG4gICwgdG9JT2JqZWN0ICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpXG4gICwgdG9QcmltaXRpdmUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KVxuICAsIGhhcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIElFOF9ET01fREVGSU5FID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSlcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IF9fd2VicGFja19yZXF1aXJlX18oNikgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KVxuICAsIGhpZGRlbktleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcblxuLyoqKi8gfSksXG4vKiA0NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4vKioqLyB9KSxcbi8qIDQ2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBoYXMgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgdG9JT2JqZWN0ICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIGFycmF5SW5kZXhPZiA9IF9fd2VicGFja19yZXF1aXJlX18oODApKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzEpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqKi8gfSksXG4vKiA0NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xuXG4vKioqLyB9KSxcbi8qIDQ4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9kcmFnZ2FibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblxudmFyIF9kcmFnZ2FibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhZ2dhYmxlKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xuXG52YXIgX2Ryb3BwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjbGFzc2VzID0ge1xuICAnZHJvcHBhYmxlOmFjdGl2ZSc6ICdkcmFnZ2FibGUtZHJvcHBhYmxlLS1hY3RpdmUnLFxuICAnZHJvcHBhYmxlOm9jY3VwaWVkJzogJ2RyYWdnYWJsZS1kcm9wcGFibGUtLW9jY3VwaWVkJ1xufTtcblxudmFyIERyb3BwYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRHJvcHBhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IF9kcmFnZ2FibGUyLmRlZmF1bHQoY29udGFpbmVycywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl9vbkRyYWdTdGFydCA9IHRoaXMuX29uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnTW92ZSA9IHRoaXMuX29uRHJhZ01vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdTdG9wID0gdGhpcy5fb25EcmFnU3RvcC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCkub24oJ2RyYWc6bW92ZScsIHRoaXMuX29uRHJhZ01vdmUpLm9uKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyb3BwYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6bW92ZScsIHRoaXMuX29uRHJhZ01vdmUpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkuZGVzdHJveSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldENsYXNzTmFtZUZvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsYXNzTmFtZUZvcihuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNsYXNzZXNbbmFtZV0gfHwgY2xhc3Nlc1tuYW1lXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RhcnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcm9wcGFibGVzID0gdGhpcy5fZ2V0RHJvcHBhYmxlcygpO1xuICAgICAgdmFyIGRyb3BwYWJsZSA9IGV2ZW50LnNlbnNvckV2ZW50LnRhcmdldC5jbG9zZXN0KHRoaXMub3B0aW9ucy5kcm9wcGFibGUpO1xuXG4gICAgICBpZiAoIWRyb3BwYWJsZSkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluaXRpYWxEcm9wcGFibGUgPSBkcm9wcGFibGU7XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLmRyb3BwYWJsZXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnQgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJykpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTphY3RpdmUnKSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRyb3BwYWJsZSA9IHRoaXMuX2Nsb3Nlc3REcm9wcGFibGUoZXZlbnQuc2Vuc29yRXZlbnQudGFyZ2V0KTtcbiAgICAgIHZhciBvdmVyRW1wdHlEcm9wcGFibGUgPSBkcm9wcGFibGUgJiYgIWRyb3BwYWJsZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpKTtcblxuICAgICAgaWYgKG92ZXJFbXB0eURyb3BwYWJsZSAmJiB0aGlzLl9kcm9wKGV2ZW50LCBkcm9wcGFibGUpKSB7XG4gICAgICAgIHRoaXMubGFzdERyb3BwYWJsZSA9IGRyb3BwYWJsZTtcbiAgICAgIH0gZWxzZSBpZiAoKCFkcm9wcGFibGUgfHwgZHJvcHBhYmxlID09PSB0aGlzLmluaXRpYWxEcm9wcGFibGUpICYmIHRoaXMubGFzdERyb3BwYWJsZSkge1xuICAgICAgICB0aGlzLl9yZWxlYXNlKGV2ZW50KTtcbiAgICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdG9wKCkge1xuICAgICAgdmFyIG9jY3VwaWVkQ2xhc3MgPSB0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJyk7XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5kcm9wcGFibGVzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGRyb3BwYWJsZSA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgIGRyb3BwYWJsZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6YWN0aXZlJykpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxhc3REcm9wcGFibGUgJiYgdGhpcy5sYXN0RHJvcHBhYmxlICE9PSB0aGlzLmluaXRpYWxEcm9wcGFibGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsRHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUob2NjdXBpZWRDbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJvcHBhYmxlcyA9IG51bGw7XG4gICAgICB0aGlzLmxhc3REcm9wcGFibGUgPSBudWxsO1xuICAgICAgdGhpcy5pbml0aWFsRHJvcHBhYmxlID0gbnVsbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZHJvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9kcm9wKGV2ZW50LCBkcm9wcGFibGUpIHtcbiAgICAgIHZhciBkcm9wcGFibGVPdmVyRXZlbnQgPSBuZXcgX2Ryb3BwYWJsZUV2ZW50LkRyb3BwYWJsZU92ZXJFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGRyb3BwYWJsZTogZHJvcHBhYmxlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KGRyb3BwYWJsZU92ZXJFdmVudCk7XG5cbiAgICAgIGlmIChkcm9wcGFibGVPdmVyRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBvY2N1cGllZENsYXNzID0gdGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpO1xuXG4gICAgICBpZiAodGhpcy5sYXN0RHJvcHBhYmxlKSB7XG4gICAgICAgIHRoaXMubGFzdERyb3BwYWJsZS5jbGFzc0xpc3QucmVtb3ZlKG9jY3VwaWVkQ2xhc3MpO1xuICAgICAgfVxuXG4gICAgICBkcm9wcGFibGUuYXBwZW5kQ2hpbGQoZXZlbnQuc291cmNlKTtcbiAgICAgIGRyb3BwYWJsZS5jbGFzc0xpc3QuYWRkKG9jY3VwaWVkQ2xhc3MpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfcmVsZWFzZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZWxlYXNlKGV2ZW50KSB7XG4gICAgICB2YXIgZHJvcHBhYmxlT3V0RXZlbnQgPSBuZXcgX2Ryb3BwYWJsZUV2ZW50LkRyb3BwYWJsZU91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgZHJvcHBhYmxlOiB0aGlzLmxhc3REcm9wcGFibGVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoZHJvcHBhYmxlT3V0RXZlbnQpO1xuXG4gICAgICBpZiAoZHJvcHBhYmxlT3V0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5pdGlhbERyb3BwYWJsZS5hcHBlbmRDaGlsZChldmVudC5zb3VyY2UpO1xuICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY2xvc2VzdERyb3BwYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jbG9zZXN0RHJvcHBhYmxlKHRhcmdldCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKCF0aGlzLmRyb3BwYWJsZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oX3RoaXMuZHJvcHBhYmxlcykuaW5jbHVkZXMoZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0RHJvcHBhYmxlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXREcm9wcGFibGVzKCkge1xuICAgICAgdmFyIGRyb3BwYWJsZXMgPSB0aGlzLm9wdGlvbnMuZHJvcHBhYmxlO1xuXG4gICAgICBpZiAodHlwZW9mIGRyb3BwYWJsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRyb3BwYWJsZXMpO1xuICAgICAgfSBlbHNlIGlmIChkcm9wcGFibGVzIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZHJvcHBhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBkcm9wcGFibGVzO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZHJvcHBhYmxlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZHJvcHBhYmxlcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJvcHBhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcm9wcGFibGU7XG5cbi8qKiovIH0pLFxuLyogNDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX2RyYWdnYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG52YXIgX2RyYWdnYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmFnZ2FibGUpO1xuXG52YXIgX3NvcnRhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYxKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFNvcnRhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTb3J0YWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IF9kcmFnZ2FibGUyLmRlZmF1bHQoY29udGFpbmVycywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl9vbkRyYWdTdGFydCA9IHRoaXMuX29uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnT3ZlckNvbnRhaW5lciA9IHRoaXMuX29uRHJhZ092ZXJDb250YWluZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdPdmVyID0gdGhpcy5fb25EcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vbignZHJhZzpvdmVyOmNvbnRhaW5lcicsIHRoaXMuX29uRHJhZ092ZXJDb250YWluZXIpLm9uKCdkcmFnOm92ZXInLCB0aGlzLl9vbkRyYWdPdmVyKS5vbignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6b3Zlcjpjb250YWluZXInLCB0aGlzLl9vbkRyYWdPdmVyQ29udGFpbmVyKS5vZmYoJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkuZGVzdHJveSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdGFydChldmVudCkge1xuICAgICAgdGhpcy5zdGFydEluZGV4ID0gaW5kZXgoZXZlbnQuc291cmNlKTtcblxuICAgICAgdmFyIHNvcnRhYmxlU3RhcnRFdmVudCA9IG5ldyBfc29ydGFibGVFdmVudC5Tb3J0YWJsZVN0YXJ0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBzdGFydEluZGV4OiB0aGlzLnN0YXJ0SW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyKHNvcnRhYmxlU3RhcnRFdmVudCk7XG5cbiAgICAgIGlmIChzb3J0YWJsZVN0YXJ0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnT3ZlckNvbnRhaW5lcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdPdmVyQ29udGFpbmVyKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtb3ZlcyA9IG1vdmUoZXZlbnQuc291cmNlLCBldmVudC5vdmVyLCBldmVudC5vdmVyQ29udGFpbmVyKTtcblxuICAgICAgaWYgKCFtb3Zlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3J0YWJsZVNvcnRlZEV2ZW50ID0gbmV3IF9zb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydGVkRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBtb3ZlczogbW92ZXNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc29ydGFibGVTb3J0ZWRFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ092ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnT3ZlcihldmVudCkge1xuICAgICAgaWYgKGV2ZW50Lm92ZXIgPT09IGV2ZW50LnNvdXJjZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtb3ZlcyA9IG1vdmUoZXZlbnQuc291cmNlLCBldmVudC5vdmVyLCBldmVudC5vdmVyQ29udGFpbmVyKTtcblxuICAgICAgaWYgKCFtb3Zlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3J0YWJsZVNvcnRlZEV2ZW50ID0gbmV3IF9zb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydGVkRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBtb3ZlczogbW92ZXNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc29ydGFibGVTb3J0ZWRFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RvcChldmVudCkge1xuICAgICAgdmFyIHNvcnRhYmxlU3RvcEV2ZW50ID0gbmV3IF9zb3J0YWJsZUV2ZW50LlNvcnRhYmxlU3RvcEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgb2xkSW5kZXg6IHRoaXMuc3RhcnRJbmRleCxcbiAgICAgICAgbmV3SW5kZXg6IGluZGV4KGV2ZW50LnNvdXJjZSlcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc29ydGFibGVTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLnN0YXJ0SW5kZXggPSBudWxsO1xuICAgICAgdGhpcy5vZmZzZXQgPSBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNvcnRhYmxlO1xuXG5cbmZ1bmN0aW9uIGluZGV4KGVsZW1lbnQpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuLCBlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gbW92ZShzb3VyY2UsIG92ZXIsIG92ZXJDb250YWluZXIpIHtcbiAgdmFyIGVtcHR5T3ZlckNvbnRhaW5lciA9ICFvdmVyQ29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGRpZmZlcmVudENvbnRhaW5lciA9IG92ZXIgJiYgc291cmNlLnBhcmVudE5vZGUgIT09IG92ZXIucGFyZW50Tm9kZTtcbiAgdmFyIHNhbWVDb250YWluZXIgPSBvdmVyICYmIHNvdXJjZS5wYXJlbnROb2RlID09PSBvdmVyLnBhcmVudE5vZGU7XG5cbiAgaWYgKGVtcHR5T3ZlckNvbnRhaW5lcikge1xuICAgIHJldHVybiBtb3ZlSW5zaWRlRW1wdHlDb250YWluZXIoc291cmNlLCBvdmVyQ29udGFpbmVyKTtcbiAgfSBlbHNlIGlmIChzYW1lQ29udGFpbmVyKSB7XG4gICAgcmV0dXJuIG1vdmVXaXRoaW5Db250YWluZXIoc291cmNlLCBvdmVyKTtcbiAgfSBlbHNlIGlmIChkaWZmZXJlbnRDb250YWluZXIpIHtcbiAgICByZXR1cm4gbW92ZU91dHNpZGVDb250YWluZXIoc291cmNlLCBvdmVyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlSW5zaWRlRW1wdHlDb250YWluZXIoc291cmNlLCBvdmVyQ29udGFpbmVyKSB7XG4gIHZhciBvbGRDb250YWluZXIgPSBzb3VyY2UucGFyZW50Tm9kZTtcbiAgdmFyIG9sZEluZGV4ID0gaW5kZXgoc291cmNlKTtcblxuICBvdmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNvdXJjZSk7XG5cbiAgcmV0dXJuIHsgb2xkSW5kZXg6IG9sZEluZGV4LCBuZXdJbmRleDogaW5kZXgoc291cmNlKSwgb2xkQ29udGFpbmVyOiBvbGRDb250YWluZXIsIG5ld0NvbnRhaW5lcjogb3ZlckNvbnRhaW5lciB9O1xufVxuXG5mdW5jdGlvbiBtb3ZlV2l0aGluQ29udGFpbmVyKHNvdXJjZSwgb3Zlcikge1xuICB2YXIgb2xkSW5kZXggPSBpbmRleChzb3VyY2UpO1xuICB2YXIgbmV3SW5kZXggPSBpbmRleChvdmVyKTtcblxuICBpZiAob2xkSW5kZXggPCBuZXdJbmRleCkge1xuICAgIHNvdXJjZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzb3VyY2UsIG92ZXIubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgfSBlbHNlIHtcbiAgICBzb3VyY2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyKTtcbiAgfVxuXG4gIHJldHVybiB7IG9sZEluZGV4OiBvbGRJbmRleCwgbmV3SW5kZXg6IG5ld0luZGV4LCBvbGRDb250YWluZXI6IHNvdXJjZS5wYXJlbnROb2RlLCBuZXdDb250YWluZXI6IHNvdXJjZS5wYXJlbnROb2RlIH07XG59XG5cbmZ1bmN0aW9uIG1vdmVPdXRzaWRlQ29udGFpbmVyKHNvdXJjZSwgb3Zlcikge1xuICB2YXIgb2xkQ29udGFpbmVyID0gc291cmNlLnBhcmVudE5vZGU7XG4gIHZhciBvbGRJbmRleCA9IGluZGV4KHNvdXJjZSk7XG4gIHZhciBuZXdJbmRleCA9IGluZGV4KG92ZXIpO1xuXG4gIG92ZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyKTtcblxuICByZXR1cm4geyBvbGRJbmRleDogb2xkSW5kZXgsIG5ld0luZGV4OiBuZXdJbmRleCwgb2xkQ29udGFpbmVyOiBvbGRDb250YWluZXIsIG5ld0NvbnRhaW5lcjogc291cmNlLnBhcmVudE5vZGUgfTtcbn1cblxuLyoqKi8gfSksXG4vKiA1MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfZHJhZ2dhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cbnZhciBfZHJhZ2dhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYWdnYWJsZSk7XG5cbnZhciBfc3dhcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN3YXBwYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3dhcHBhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IF9kcmFnZ2FibGUyLmRlZmF1bHQoY29udGFpbmVycywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLl9vbkRyYWdTdGFydCA9IHRoaXMuX29uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnT3ZlciA9IHRoaXMuX29uRHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdTdG9wID0gdGhpcy5fb25EcmFnU3RvcC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCkub24oJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9uKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBwYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkuZGVzdHJveSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdGFydChldmVudCkge1xuICAgICAgdmFyIHN3YXBwYWJsZVN0YXJ0RXZlbnQgPSBuZXcgX3N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN0YXJ0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KHN3YXBwYWJsZVN0YXJ0RXZlbnQpO1xuXG4gICAgICBpZiAoc3dhcHBhYmxlU3RhcnRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5vdmVyID09PSBldmVudC5zb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxhc3RPdmVyICYmIHRoaXMubGFzdE92ZXIgIT09IGV2ZW50Lm92ZXIpIHtcbiAgICAgICAgc3dhcCh0aGlzLmxhc3RPdmVyLCBldmVudC5zb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RPdmVyID0gZXZlbnQub3ZlcjtcblxuICAgICAgc3dhcChldmVudC5zb3VyY2UsIGV2ZW50Lm92ZXIpO1xuXG4gICAgICAvLyBMZXQgdGhpcyBjYW5jZWwgdGhlIGFjdHVhbCBzd2FwXG4gICAgICB2YXIgc3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gbmV3IF9zd2FwcGFibGVFdmVudC5Td2FwcGFibGVTd2FwcGVkRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBzd2FwcGVkRWxlbWVudDogZXZlbnQub3ZlclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChzd2FwcGFibGVTd2FwcGVkRXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdG9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0b3AoZXZlbnQpIHtcbiAgICAgIHZhciBzd2FwcGFibGVTdG9wRXZlbnQgPSBuZXcgX3N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN0b3BFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc3dhcHBhYmxlU3RvcEV2ZW50KTtcbiAgICAgIHRoaXMubGFzdE92ZXIgPSBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3dhcHBhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTd2FwcGFibGU7XG5cblxuZnVuY3Rpb24gd2l0aFRlbXBFbGVtZW50KGNhbGxiYWNrKSB7XG4gIHZhciB0bXBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNhbGxiYWNrKHRtcEVsZW1lbnQpO1xuICB0bXBFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodG1wRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHN3YXAoc291cmNlLCBvdmVyKSB7XG4gIHZhciBvdmVyUGFyZW50ID0gb3Zlci5wYXJlbnROb2RlO1xuICB2YXIgc291cmNlUGFyZW50ID0gc291cmNlLnBhcmVudE5vZGU7XG5cbiAgd2l0aFRlbXBFbGVtZW50KGZ1bmN0aW9uICh0bXBFbGVtZW50KSB7XG4gICAgc291cmNlUGFyZW50Lmluc2VydEJlZm9yZSh0bXBFbGVtZW50LCBzb3VyY2UpO1xuICAgIG92ZXJQYXJlbnQuaW5zZXJ0QmVmb3JlKHNvdXJjZSwgb3Zlcik7XG4gICAgc291cmNlUGFyZW50Lmluc2VydEJlZm9yZShvdmVyLCB0bXBFbGVtZW50KTtcbiAgfSk7XG59XG5cbi8qKiovIH0pLFxuLyogNTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cbnZhciBfY29sbGlkYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBDb2xsaWRhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDb2xsaWRhYmxlKGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIENvbGxpZGFibGUpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLl9vbkRyYWdNb3ZlID0gdGhpcy5fb25EcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB0aGlzLl9vblJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ29sbGlkYWJsZSwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzptb3ZlJywgdGhpcy5fb25EcmFnTW92ZSk7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOm1vdmUnLCB0aGlzLl9vbkRyYWdNb3ZlKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ01vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnTW92ZShldmVudCkge1xuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnNlbnNvckV2ZW50LnRhcmdldDtcblxuICAgICAgdGhpcy5jdXJyZW50QW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGFyZ2V0KSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQpIHtcbiAgICAgICAgZXZlbnQuY2FuY2VsKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb2xsaWRhYmxlSW5FdmVudCA9IG5ldyBfY29sbGlkYWJsZUV2ZW50LkNvbGxpZGFibGVJbkV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY29sbGlkaW5nRWxlbWVudDogdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50XG4gICAgICB9KTtcblxuICAgICAgdmFyIGNvbGxpZGFibGVPdXRFdmVudCA9IG5ldyBfY29sbGlkYWJsZUV2ZW50LkNvbGxpZGFibGVPdXRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGNvbGxpZGluZ0VsZW1lbnQ6IHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZW50ZXJpbmdDb2xsaWRhYmxlID0gQm9vbGVhbih0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQgJiYgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCAhPT0gdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50KTtcbiAgICAgIHZhciBsZWF2aW5nQ29sbGlkYWJsZSA9IEJvb2xlYW4oIXRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCAmJiB0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50KTtcblxuICAgICAgaWYgKGVudGVyaW5nQ29sbGlkYWJsZSkge1xuICAgICAgICBpZiAodGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChjb2xsaWRhYmxlT3V0RXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KGNvbGxpZGFibGVJbkV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAobGVhdmluZ0NvbGxpZGFibGUpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KGNvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQgPSB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RvcChldmVudCkge1xuICAgICAgdmFyIGxhc3RDb2xsaWRpbmdFbGVtZW50ID0gdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50IHx8IHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQ7XG4gICAgICB2YXIgY29sbGlkYWJsZU91dEV2ZW50ID0gbmV3IF9jb2xsaWRhYmxlRXZlbnQuQ29sbGlkYWJsZU91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY29sbGlkaW5nRWxlbWVudDogbGFzdENvbGxpZGluZ0VsZW1lbnRcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobGFzdENvbGxpZGluZ0VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KGNvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGFyZ2V0KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGlkYWJsZXMgPSBfdGhpcy5fZ2V0Q29sbGlkYWJsZXMoKTtcbiAgICAgICAgX3RoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiBjb2xsaWRhYmxlcy5pbmNsdWRlcyhlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRDb2xsaWRhYmxlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRDb2xsaWRhYmxlcygpIHtcbiAgICAgIHZhciBjb2xsaWRhYmxlcyA9IHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuY29sbGlkYWJsZXM7XG5cbiAgICAgIGlmICh0eXBlb2YgY29sbGlkYWJsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbGxpZGFibGVzKSk7XG4gICAgICB9IGVsc2UgaWYgKGNvbGxpZGFibGVzIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgY29sbGlkYWJsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY29sbGlkYWJsZXMpO1xuICAgICAgfSBlbHNlIGlmIChjb2xsaWRhYmxlcyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBbY29sbGlkYWJsZXNdO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29sbGlkYWJsZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxpZGFibGVzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xsaWRhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb2xsaWRhYmxlO1xuXG4vKioqLyB9KSxcbi8qIDUyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9zbmFwcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNjApO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU25hcHBhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTbmFwcGFibGUoZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU25hcHBhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuXG4gICAgdGhpcy5fb25EcmFnU3RhcnQgPSB0aGlzLl9vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnT3ZlciA9IHRoaXMuX29uRHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdPdXQgPSB0aGlzLl9vbkRyYWdPdXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNuYXBwYWJsZSwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vbignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkub24oJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9uKCdkcmFnOm91dCcsIHRoaXMuX29uRHJhZ091dCkub24oJ2Ryb3BwYWJsZTpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub24oJ2Ryb3BwYWJsZTpvdXQnLCB0aGlzLl9vbkRyYWdPdXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6c3RvcCcsIHRoaXMuX29uRHJhZ1N0b3ApLm9mZignZHJhZzpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub2ZmKCdkcmFnOm91dCcsIHRoaXMuX29uRHJhZ091dCkub2ZmKCdkcm9wcGFibGU6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJvcHBhYmxlOm91dCcsIHRoaXMuX29uRHJhZ091dCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyc3RTb3VyY2UgPSBldmVudC5zb3VyY2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RvcCgpIHtcbiAgICAgIHRoaXMuZmlyc3RTb3VyY2UgPSBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNvdXJjZSA9IGV2ZW50LnNvdXJjZSB8fCBldmVudC5kcmFnRXZlbnQuc291cmNlO1xuICAgICAgdmFyIG1pcnJvciA9IGV2ZW50Lm1pcnJvciB8fCBldmVudC5kcmFnRXZlbnQubWlycm9yO1xuXG4gICAgICBpZiAoc291cmNlID09PSB0aGlzLmZpcnN0U291cmNlKSB7XG4gICAgICAgIHRoaXMuZmlyc3RTb3VyY2UgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzbmFwSW5FdmVudCA9IG5ldyBfc25hcHBhYmxlRXZlbnQuU25hcEluRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KHNuYXBJbkV2ZW50KTtcblxuICAgICAgaWYgKHNuYXBJbkV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobWlycm9yKSB7XG4gICAgICAgIG1pcnJvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICBzb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKF90aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpwbGFjZWQnKSk7XG4gICAgICB9LCB0aGlzLmRyYWdnYWJsZS5vcHRpb25zLnBsYWNlZFRpbWVvdXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnT3V0KGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtaXJyb3IgPSBldmVudC5taXJyb3IgfHwgZXZlbnQuZHJhZ0V2ZW50Lm1pcnJvcjtcbiAgICAgIHZhciBzb3VyY2UgPSBldmVudC5zb3VyY2UgfHwgZXZlbnQuZHJhZ0V2ZW50LnNvdXJjZTtcblxuICAgICAgdmFyIHNuYXBPdXRFdmVudCA9IG5ldyBfc25hcHBhYmxlRXZlbnQuU25hcE91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChzbmFwT3V0RXZlbnQpO1xuXG4gICAgICBpZiAoc25hcE91dEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobWlycm9yKSB7XG4gICAgICAgIG1pcnJvci5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU25hcHBhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTbmFwcGFibGU7XG5cbi8qKiovIH0pLFxuLyogNTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgQVJJQV9HUkFCQkVEID0gJ2FyaWEtZ3JhYmJlZCc7XG52YXIgQVJJQV9EUk9QRUZGRUNUID0gJ2FyaWEtZHJvcGVmZmVjdCc7XG52YXIgVEFCSU5ERVggPSAndGFiaW5kZXgnO1xuXG52YXIgQWNjZXNzaWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQWNjZXNzaWJpbGl0eShkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBBY2Nlc3NpYmlsaXR5KTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuXG4gICAgdGhpcy5fb25Jbml0ID0gdGhpcy5fb25Jbml0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EZXN0cm95ID0gdGhpcy5fb25EZXN0cm95LmJpbmQodGhpcyk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShBY2Nlc3NpYmlsaXR5LCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdpbml0JywgdGhpcy5fb25Jbml0KS5vbignZGVzdHJveScsIHRoaXMuX29uRGVzdHJveSkub24oJ2RyYWc6c3RhcnQnLCBfb25EcmFnU3RhcnQpLm9uKCdkcmFnOnN0b3AnLCBfb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdpbml0JywgdGhpcy5fb25Jbml0KS5vZmYoJ2Rlc3Ryb3knLCB0aGlzLl9vbkRlc3Ryb3kpLm9mZignZHJhZzpzdGFydCcsIF9vbkRyYWdTdGFydCkub2ZmKCdkcmFnOnN0b3AnLCBfb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uSW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkluaXQoX3JlZikge1xuICAgICAgdmFyIGNvbnRhaW5lcnMgPSBfcmVmLmNvbnRhaW5lcnM7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKEFSSUFfRFJPUEVGRkVDVCwgdGhpcy5kcmFnZ2FibGUub3B0aW9ucy50eXBlKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuZHJhZ2dhYmxlKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShUQUJJTkRFWCwgMCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EZXN0cm95KF9yZWYyKSB7XG4gICAgICB2YXIgY29udGFpbmVycyA9IF9yZWYyLmNvbnRhaW5lcnM7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IGNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAzLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShBUklBX0RST1BFRkZFQ1QpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yNCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5kcmFnZ2FibGUub3B0aW9ucy5kcmFnZ2FibGUpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA0OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gKF9zdGVwNCA9IF9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFRBQklOREVYLCAwKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoQVJJQV9HUkFCQkVELCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjQgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3I0ID0gZXJyO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ICYmIF9pdGVyYXRvcjQucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yNC5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNCkge1xuICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMyA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMy5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQWNjZXNzaWJpbGl0eTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQWNjZXNzaWJpbGl0eTtcblxuXG5mdW5jdGlvbiBfb25EcmFnU3RhcnQoX3JlZjMpIHtcbiAgdmFyIHNvdXJjZSA9IF9yZWYzLnNvdXJjZTtcblxuICBzb3VyY2Uuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIF9vbkRyYWdTdG9wKF9yZWY0KSB7XG4gIHZhciBzb3VyY2UgPSBfcmVmNC5zb3VyY2U7XG5cbiAgc291cmNlLnNldEF0dHJpYnV0ZShBUklBX0dSQUJCRUQsIGZhbHNlKTtcbn1cblxuLyoqKi8gfSksXG4vKiA1NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBNaXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1pcnJvcihkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3IpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLl9vbk1pcnJvckNyZWF0ZWQgPSB0aGlzLl9vbk1pcnJvckNyZWF0ZWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbk1pcnJvck1vdmUgPSB0aGlzLl9vbk1pcnJvck1vdmUuYmluZCh0aGlzKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE1pcnJvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignbWlycm9yOmNyZWF0ZWQnLCB0aGlzLl9vbk1pcnJvckNyZWF0ZWQpLm9uKCdtaXJyb3I6Y3JlYXRlZCcsIG9uTWlycm9yQ3JlYXRlZCkub24oJ21pcnJvcjptb3ZlJywgdGhpcy5fb25NaXJyb3JNb3ZlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ21pcnJvcjpjcmVhdGVkJywgdGhpcy5fb25NaXJyb3JDcmVhdGVkKS5vZmYoJ21pcnJvcjpjcmVhdGVkJywgb25NaXJyb3JDcmVhdGVkKS5vZmYoJ21pcnJvcjptb3ZlJywgdGhpcy5fb25NaXJyb3JNb3ZlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25NaXJyb3JDcmVhdGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTWlycm9yQ3JlYXRlZChfcmVmKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgbWlycm9yID0gX3JlZi5taXJyb3IsXG4gICAgICAgICAgc291cmNlID0gX3JlZi5zb3VyY2UsXG4gICAgICAgICAgc2Vuc29yRXZlbnQgPSBfcmVmLnNlbnNvckV2ZW50O1xuXG4gICAgICB2YXIgbWlycm9yQ2xhc3MgPSB0aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ21pcnJvcicpO1xuXG4gICAgICB2YXIgc2V0U3RhdGUgPSBmdW5jdGlvbiBzZXRTdGF0ZShkYXRhKSB7XG4gICAgICAgIF90aGlzLm1pcnJvck9mZnNldCA9IGRhdGEubWlycm9yT2Zmc2V0O1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH07XG5cbiAgICAgIFByb21pc2UucmVzb2x2ZSh7IG1pcnJvcjogbWlycm9yLCBzb3VyY2U6IHNvdXJjZSwgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LCBtaXJyb3JDbGFzczogbWlycm9yQ2xhc3MgfSkudGhlbihjb21wdXRlTWlycm9yRGltZW5zaW9ucykudGhlbihjYWxjdWxhdGVNaXJyb3JPZmZzZXQpLnRoZW4oYWRkTWlycm9yQ2xhc3NlcykudGhlbihwb3NpdGlvbk1pcnJvcigpKS50aGVuKHJlbW92ZU1pcnJvcklEKS50aGVuKHNldFN0YXRlKS5jYXRjaCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1pcnJvck1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25NaXJyb3JNb3ZlKF9yZWYyKSB7XG4gICAgICB2YXIgbWlycm9yID0gX3JlZjIubWlycm9yLFxuICAgICAgICAgIHNlbnNvckV2ZW50ID0gX3JlZjIuc2Vuc29yRXZlbnQ7XG5cbiAgICAgIFByb21pc2UucmVzb2x2ZSh7IG1pcnJvcjogbWlycm9yLCBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsIG1pcnJvck9mZnNldDogdGhpcy5taXJyb3JPZmZzZXQgfSkudGhlbihwb3NpdGlvbk1pcnJvcih7IHJhZjogdHJ1ZSB9KSkuY2F0Y2goKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1pcnJvcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTWlycm9yO1xuXG5cbmZ1bmN0aW9uIG9uTWlycm9yQ3JlYXRlZChfcmVmMykge1xuICB2YXIgbWlycm9yID0gX3JlZjMubWlycm9yLFxuICAgICAgc291cmNlID0gX3JlZjMuc291cmNlO1xuXG4gIFByb21pc2UucmVzb2x2ZSh7IG1pcnJvcjogbWlycm9yLCBzb3VyY2U6IHNvdXJjZSB9KS50aGVuKHJlc2V0TWlycm9yKS5jYXRjaCgpO1xufVxuXG5mdW5jdGlvbiByZXNldE1pcnJvcihkYXRhKSB7XG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHZhciBtaXJyb3IgPSBkYXRhLm1pcnJvcixcbiAgICAgICAgc291cmNlID0gZGF0YS5zb3VyY2U7XG5cblxuICAgIG1pcnJvci5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgbWlycm9yLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgbWlycm9yLnN0eWxlLnRvcCA9IDA7XG4gICAgbWlycm9yLnN0eWxlLmxlZnQgPSAwO1xuICAgIG1pcnJvci5zdHlsZS53aWR0aCA9IHNvdXJjZS5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgbWlycm9yLnN0eWxlLmhlaWdodCA9IHNvdXJjZS5vZmZzZXRIZWlnaHQgKyAncHgnO1xuXG4gICAgcmVzb2x2ZShkYXRhKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVNaXJyb3JEaW1lbnNpb25zKGRhdGEpIHtcbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIHNvdXJjZSA9IGRhdGEuc291cmNlO1xuXG4gICAgdmFyIHNvdXJjZVJlY3QgPSBzb3VyY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IHNvdXJjZVJlY3Q6IHNvdXJjZVJlY3QgfSkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlTWlycm9yT2Zmc2V0KGRhdGEpIHtcbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIHNlbnNvckV2ZW50ID0gZGF0YS5zZW5zb3JFdmVudCxcbiAgICAgICAgc291cmNlUmVjdCA9IGRhdGEuc291cmNlUmVjdDtcblxuICAgIHZhciBtaXJyb3JPZmZzZXQgPSB7IHRvcDogc2Vuc29yRXZlbnQuY2xpZW50WSAtIHNvdXJjZVJlY3QudG9wLCBsZWZ0OiBzZW5zb3JFdmVudC5jbGllbnRYIC0gc291cmNlUmVjdC5sZWZ0IH07XG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IG1pcnJvck9mZnNldDogbWlycm9yT2Zmc2V0IH0pKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZE1pcnJvckNsYXNzZXMoZGF0YSkge1xuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgbWlycm9yID0gZGF0YS5taXJyb3IsXG4gICAgICAgIG1pcnJvckNsYXNzID0gZGF0YS5taXJyb3JDbGFzcztcblxuICAgIG1pcnJvci5jbGFzc0xpc3QuYWRkKG1pcnJvckNsYXNzKTtcbiAgICByZXNvbHZlKGRhdGEpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTWlycm9ySUQoZGF0YSkge1xuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgbWlycm9yID0gZGF0YS5taXJyb3I7XG5cbiAgICBtaXJyb3IucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgIGRlbGV0ZSBtaXJyb3IuaWQ7XG4gICAgcmVzb2x2ZShkYXRhKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uTWlycm9yKCkge1xuICB2YXIgX3JlZjQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuICAgICAgX3JlZjQkd2l0aEZyYW1lID0gX3JlZjQud2l0aEZyYW1lLFxuICAgICAgd2l0aEZyYW1lID0gX3JlZjQkd2l0aEZyYW1lID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWY0JHdpdGhGcmFtZTtcblxuICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIHZhciBtaXJyb3IgPSBkYXRhLm1pcnJvcixcbiAgICAgICAgICBzZW5zb3JFdmVudCA9IGRhdGEuc2Vuc29yRXZlbnQsXG4gICAgICAgICAgbWlycm9yT2Zmc2V0ID0gZGF0YS5taXJyb3JPZmZzZXQ7XG5cblxuICAgICAgaWYgKG1pcnJvck9mZnNldCkge1xuICAgICAgICB2YXIgeCA9IHNlbnNvckV2ZW50LmNsaWVudFggLSBtaXJyb3JPZmZzZXQubGVmdDtcbiAgICAgICAgdmFyIHkgPSBzZW5zb3JFdmVudC5jbGllbnRZIC0gbWlycm9yT2Zmc2V0LnRvcDtcblxuICAgICAgICBtaXJyb3Iuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMCknO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH0sIHsgZnJhbWU6IHdpdGhGcmFtZSB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd2l0aFByb21pc2UoY2FsbGJhY2spIHtcbiAgdmFyIF9yZWY1ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgIF9yZWY1JHJhZiA9IF9yZWY1LnJhZixcbiAgICAgIHJhZiA9IF9yZWY1JHJhZiA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmNSRyYWY7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAocmFmKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHJlc29sdmUsIHJlamVjdCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqKi8gfSksXG4vKiA1NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Db2xsaWRhYmxlT3V0RXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVJbkV2ZW50ID0gZXhwb3J0cy5Db2xsaWRhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWJzdHJhY3RFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBDb2xsaWRhYmxlRXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDb2xsaWRhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBDb2xsaWRhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ29sbGlkYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ29sbGlkYWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sbGlkYWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShDb2xsaWRhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29sbGlkYWJsZUV2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbkNvbGxpZGFibGVFdmVudC50eXBlID0gJ2NvbGxpZGFibGUnO1xuXG52YXIgQ29sbGlkYWJsZUluRXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVJbkV2ZW50ID0gZnVuY3Rpb24gKF9Db2xsaWRhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoQ29sbGlkYWJsZUluRXZlbnQsIF9Db2xsaWRhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIENvbGxpZGFibGVJbkV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIENvbGxpZGFibGVJbkV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ29sbGlkYWJsZUluRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsaWRhYmxlSW5FdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ29sbGlkYWJsZUluRXZlbnQsIFt7XG4gICAga2V5OiAnY29sbGlkaW5nRWxlbWVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmNvbGxpZGluZ0VsZW1lbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xsaWRhYmxlSW5FdmVudDtcbn0oQ29sbGlkYWJsZUV2ZW50KTtcblxuQ29sbGlkYWJsZUluRXZlbnQudHlwZSA9ICdjb2xsaWRhYmxlOmluJztcblxudmFyIENvbGxpZGFibGVPdXRFdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZU91dEV2ZW50ID0gZnVuY3Rpb24gKF9Db2xsaWRhYmxlRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKENvbGxpZGFibGVPdXRFdmVudCwgX0NvbGxpZGFibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIENvbGxpZGFibGVPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBDb2xsaWRhYmxlT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChDb2xsaWRhYmxlT3V0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsaWRhYmxlT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENvbGxpZGFibGVPdXRFdmVudCwgW3tcbiAgICBrZXk6ICdjb2xsaWRpbmdFbGVtZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY29sbGlkaW5nRWxlbWVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbGxpZGFibGVPdXRFdmVudDtcbn0oQ29sbGlkYWJsZUV2ZW50KTtcblxuQ29sbGlkYWJsZU91dEV2ZW50LnR5cGUgPSAnY29sbGlkYWJsZTpvdXQnO1xuXG4vKioqLyB9KSxcbi8qIDU2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRyYWdTdG9wRXZlbnQgPSBleHBvcnRzLkRyYWdQcmVzc3VyZUV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0RXZlbnQgPSBleHBvcnRzLkRyYWdPdXRDb250YWluZXJFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0RXZlbnQgPSBleHBvcnRzLkRyYWdFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIERyYWdFdmVudCA9IGV4cG9ydHMuRHJhZ0V2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdFdmVudCwgW3tcbiAgICBrZXk6ICdoYXNNaXJyb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNNaXJyb3IoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLm1pcnJvcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc291cmNlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ21pcnJvcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm1pcnJvcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzb3VyY2VDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2VDb250YWluZXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29yRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zZW5zb3JFdmVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbEV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIGlmICh0aGlzLnNlbnNvckV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvckV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ0V2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbnZhciBEcmFnU3RhcnRFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0RXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RhcnRFdmVudCwgX0RyYWdFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1N0YXJ0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1N0YXJ0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU3RhcnRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdTdGFydEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1N0YXJ0RXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbkRyYWdTdGFydEV2ZW50LnR5cGUgPSAnZHJhZzpzdGFydCc7XG5cbnZhciBEcmFnTW92ZUV2ZW50ID0gZXhwb3J0cy5EcmFnTW92ZUV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdNb3ZlRXZlbnQsIF9EcmFnRXZlbnQyKTtcblxuICBmdW5jdGlvbiBEcmFnTW92ZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdNb3ZlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnTW92ZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ01vdmVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdNb3ZlRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbkRyYWdNb3ZlRXZlbnQudHlwZSA9ICdkcmFnOm1vdmUnO1xuXG52YXIgRHJhZ091dENvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0Q29udGFpbmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ091dENvbnRhaW5lckV2ZW50LCBfRHJhZ0V2ZW50Myk7XG5cbiAgZnVuY3Rpb24gRHJhZ091dENvbnRhaW5lckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdXRDb250YWluZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdXRDb250YWluZXJFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdPdXRDb250YWluZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ091dENvbnRhaW5lckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ091dENvbnRhaW5lckV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG5EcmFnT3V0Q29udGFpbmVyRXZlbnQudHlwZSA9ICdkcmFnOm91dDpjb250YWluZXInO1xuXG52YXIgRHJhZ091dEV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0RXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ091dEV2ZW50LCBfRHJhZ0V2ZW50NCk7XG5cbiAgZnVuY3Rpb24gRHJhZ091dEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdXRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdPdXRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ091dEV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ292ZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ091dEV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG5EcmFnT3V0RXZlbnQudHlwZSA9ICdkcmFnOm91dCc7XG5cbnZhciBEcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ1KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdPdmVyQ29udGFpbmVyRXZlbnQsIF9EcmFnRXZlbnQ1KTtcblxuICBmdW5jdGlvbiBEcmFnT3ZlckNvbnRhaW5lckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdmVyQ29udGFpbmVyRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnT3ZlckNvbnRhaW5lckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ092ZXJDb250YWluZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ092ZXJDb250YWluZXJFdmVudCwgW3tcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlckNvbnRhaW5lcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdPdmVyQ29udGFpbmVyRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbkRyYWdPdmVyQ29udGFpbmVyRXZlbnQudHlwZSA9ICdkcmFnOm92ZXI6Y29udGFpbmVyJztcblxudmFyIERyYWdPdmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDYpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ092ZXJFdmVudCwgX0RyYWdFdmVudDYpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ092ZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3ZlckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3ZlckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ292ZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ092ZXJFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ092ZXJFdmVudC50eXBlID0gJ2RyYWc6b3Zlcic7XG5cbnZhciBEcmFnUHJlc3N1cmVFdmVudCA9IGV4cG9ydHMuRHJhZ1ByZXNzdXJlRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDcpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1ByZXNzdXJlRXZlbnQsIF9EcmFnRXZlbnQ3KTtcblxuICBmdW5jdGlvbiBEcmFnUHJlc3N1cmVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnUHJlc3N1cmVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdQcmVzc3VyZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1ByZXNzdXJlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdQcmVzc3VyZUV2ZW50LCBbe1xuICAgIGtleTogJ3ByZXNzdXJlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEucHJlc3N1cmU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnUHJlc3N1cmVFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ1ByZXNzdXJlRXZlbnQudHlwZSA9ICdkcmFnOnByZXNzdXJlJztcblxudmFyIERyYWdTdG9wRXZlbnQgPSBleHBvcnRzLkRyYWdTdG9wRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDgpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1N0b3BFdmVudCwgX0RyYWdFdmVudDgpO1xuXG4gIGZ1bmN0aW9uIERyYWdTdG9wRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1N0b3BFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdG9wRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU3RvcEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1N0b3BFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ1N0b3BFdmVudC50eXBlID0gJ2RyYWc6c3RvcCc7XG5cbi8qKiovIH0pLFxuLyogNTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIERyYWdnYWJsZUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnZ2FibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ2dhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnZ2FibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ2dhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ2dhYmxlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ2dhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ2dhYmxlRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxuRHJhZ2dhYmxlRXZlbnQudHlwZSA9ICdkcmFnZ2FibGUnO1xuXG52YXIgRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ2dhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCwgX0RyYWdnYWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQ7XG59KERyYWdnYWJsZUV2ZW50KTtcblxuRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudC50eXBlID0gJ2RyYWdnYWJsZTppbml0aWFsaXplJztcblxudmFyIERyYWdnYWJsZURlc3Ryb3lFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnZ2FibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ2dhYmxlRGVzdHJveUV2ZW50LCBfRHJhZ2dhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGVEZXN0cm95RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ2dhYmxlRGVzdHJveUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ2dhYmxlRGVzdHJveUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ2dhYmxlRGVzdHJveUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ2dhYmxlRGVzdHJveUV2ZW50O1xufShEcmFnZ2FibGVFdmVudCk7XG5cbkRyYWdnYWJsZURlc3Ryb3lFdmVudC50eXBlID0gJ2RyYWdnYWJsZTpkZXN0cm95JztcblxuLyoqKi8gfSksXG4vKiA1OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Ecm9wcGFibGVPdXRFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlT3ZlckV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIERyb3BwYWJsZUV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyb3BwYWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyb3BwYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJvcHBhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wcGFibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJvcHBhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Ryb3BwYWJsZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyb3BwYWJsZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyb3BwYWJsZUV2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbkRyb3BwYWJsZUV2ZW50LnR5cGUgPSAnZHJvcHBhYmxlJztcblxudmFyIERyb3BwYWJsZU92ZXJFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlT3ZlckV2ZW50ID0gZnVuY3Rpb24gKF9Ecm9wcGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGVPdmVyRXZlbnQsIF9Ecm9wcGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJvcHBhYmxlT3ZlckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyb3BwYWJsZU92ZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyb3BwYWJsZU92ZXJFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZU92ZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyb3BwYWJsZU92ZXJFdmVudDtcbn0oRHJvcHBhYmxlRXZlbnQpO1xuXG5Ecm9wcGFibGVPdmVyRXZlbnQudHlwZSA9ICdkcm9wcGFibGU6b3Zlcic7XG5cbnZhciBEcm9wcGFibGVPdXRFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlT3V0RXZlbnQgPSBmdW5jdGlvbiAoX0Ryb3BwYWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGVPdXRFdmVudCwgX0Ryb3BwYWJsZUV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJvcHBhYmxlT3V0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcm9wcGFibGVPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZU91dEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJvcHBhYmxlT3V0RXZlbnQ7XG59KERyb3BwYWJsZUV2ZW50KTtcblxuRHJvcHBhYmxlT3V0RXZlbnQudHlwZSA9ICdkcm9wcGFibGU6b3V0JztcblxuLyoqKi8gfSksXG4vKiA1OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5NaXJyb3JEZXN0cm95RXZlbnQgPSBleHBvcnRzLk1pcnJvck1vdmVFdmVudCA9IGV4cG9ydHMuTWlycm9yQXR0YWNoZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yQ3JlYXRlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIE1pcnJvckV2ZW50ID0gZXhwb3J0cy5NaXJyb3JFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTWlycm9yRXZlbnQsIFt7XG4gICAga2V5OiAnc291cmNlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ21pcnJvcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm1pcnJvcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzb3VyY2VDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2VDb250YWluZXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29yRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zZW5zb3JFdmVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbEV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIGlmICh0aGlzLnNlbnNvckV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvckV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWlycm9yRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxudmFyIE1pcnJvckNyZWF0ZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yQ3JlYXRlZEV2ZW50ID0gZnVuY3Rpb24gKF9NaXJyb3JFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JDcmVhdGVkRXZlbnQsIF9NaXJyb3JFdmVudCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yQ3JlYXRlZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckNyZWF0ZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvckNyZWF0ZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckNyZWF0ZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIE1pcnJvckNyZWF0ZWRFdmVudDtcbn0oTWlycm9yRXZlbnQpO1xuXG5NaXJyb3JDcmVhdGVkRXZlbnQudHlwZSA9ICdtaXJyb3I6Y3JlYXRlZCc7XG5cbnZhciBNaXJyb3JBdHRhY2hlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JBdHRhY2hlZEV2ZW50ID0gZnVuY3Rpb24gKF9NaXJyb3JFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTWlycm9yQXR0YWNoZWRFdmVudCwgX01pcnJvckV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gTWlycm9yQXR0YWNoZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JBdHRhY2hlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yQXR0YWNoZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckF0dGFjaGVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JBdHRhY2hlZEV2ZW50O1xufShNaXJyb3JFdmVudCk7XG5cbk1pcnJvckF0dGFjaGVkRXZlbnQudHlwZSA9ICdtaXJyb3I6YXR0YWNoZWQnO1xuXG52YXIgTWlycm9yTW92ZUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JNb3ZlRXZlbnQsIF9NaXJyb3JFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvck1vdmVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JNb3ZlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JNb3ZlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JNb3ZlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JNb3ZlRXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuTWlycm9yTW92ZUV2ZW50LnR5cGUgPSAnbWlycm9yOm1vdmUnO1xuXG52YXIgTWlycm9yRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JEZXN0cm95RXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JEZXN0cm95RXZlbnQsIF9NaXJyb3JFdmVudDQpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckRlc3Ryb3lFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JEZXN0cm95RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JEZXN0cm95RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JEZXN0cm95RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JEZXN0cm95RXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuTWlycm9yRGVzdHJveUV2ZW50LnR5cGUgPSAnbWlycm9yOmRlc3Ryb3knO1xuXG4vKioqLyB9KSxcbi8qIDYwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNuYXBPdXRFdmVudCA9IGV4cG9ydHMuU25hcEluRXZlbnQgPSBleHBvcnRzLlNuYXBFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFNuYXBFdmVudCA9IGV4cG9ydHMuU25hcEV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNuYXBFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFNuYXBFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTbmFwRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTbmFwRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNuYXBFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTbmFwRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxudmFyIFNuYXBJbkV2ZW50ID0gZXhwb3J0cy5TbmFwSW5FdmVudCA9IGZ1bmN0aW9uIChfU25hcEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNuYXBJbkV2ZW50LCBfU25hcEV2ZW50KTtcblxuICBmdW5jdGlvbiBTbmFwSW5FdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwSW5FdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNuYXBJbkV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU25hcEluRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBTbmFwSW5FdmVudDtcbn0oU25hcEV2ZW50KTtcblxuU25hcEluRXZlbnQudHlwZSA9ICdzbmFwOmluJztcblxudmFyIFNuYXBPdXRFdmVudCA9IGV4cG9ydHMuU25hcE91dEV2ZW50ID0gZnVuY3Rpb24gKF9TbmFwRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNuYXBPdXRFdmVudCwgX1NuYXBFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIFNuYXBPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTbmFwT3V0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTbmFwT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBTbmFwT3V0RXZlbnQ7XG59KFNuYXBFdmVudCk7XG5cblNuYXBPdXRFdmVudC50eXBlID0gJ3NuYXA6b3V0JztcblxuLyoqKi8gfSksXG4vKiA2MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Tb3J0YWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTb3J0ZWRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9hYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9hYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU29ydGFibGVFdmVudCA9IGV4cG9ydHMuU29ydGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU29ydGFibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVFdmVudDtcbn0oX2Fic3RyYWN0RXZlbnQyLmRlZmF1bHQpO1xuXG52YXIgU29ydGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVN0YXJ0RXZlbnQgPSBmdW5jdGlvbiAoX1NvcnRhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGVTdGFydEV2ZW50LCBfU29ydGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gU29ydGFibGVTdGFydEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlU3RhcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlU3RhcnRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlU3RhcnRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVTdGFydEV2ZW50LCBbe1xuICAgIGtleTogJ3N0YXJ0SW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zdGFydEluZGV4O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVTdGFydEV2ZW50O1xufShTb3J0YWJsZUV2ZW50KTtcblxuU29ydGFibGVTdGFydEV2ZW50LnR5cGUgPSAnc29ydGFibGU6c3RhcnQnO1xuXG52YXIgU29ydGFibGVTb3J0ZWRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTb3J0ZWRFdmVudCA9IGZ1bmN0aW9uIChfU29ydGFibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGVTb3J0ZWRFdmVudCwgX1NvcnRhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZVNvcnRlZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlU29ydGVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTb3J0YWJsZVNvcnRlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVTb3J0ZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVTb3J0ZWRFdmVudCwgW3tcbiAgICBrZXk6ICdtb3ZlcycsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm1vdmVzO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVTb3J0ZWRFdmVudDtcbn0oU29ydGFibGVFdmVudCk7XG5cblNvcnRhYmxlU29ydGVkRXZlbnQudHlwZSA9ICdzb3J0YWJsZTpzb3J0ZWQnO1xuXG52YXIgU29ydGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU3RvcEV2ZW50ID0gZnVuY3Rpb24gKF9Tb3J0YWJsZUV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZVN0b3BFdmVudCwgX1NvcnRhYmxlRXZlbnQzKTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZVN0b3BFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZVN0b3BFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlU3RvcEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVTdG9wRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlU3RvcEV2ZW50LCBbe1xuICAgIGtleTogJ29sZEluZGV4JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub2xkSW5kZXg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbmV3SW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5uZXdJbmRleDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNvcnRhYmxlU3RvcEV2ZW50O1xufShTb3J0YWJsZUV2ZW50KTtcblxuU29ydGFibGVTdG9wRXZlbnQudHlwZSA9ICdzb3J0YWJsZTpzdG9wJztcblxuLyoqKi8gfSksXG4vKiA2MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Td2FwcGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3RhcnRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWJzdHJhY3RFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTd2FwcGFibGVFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBwYWJsZUV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZUV2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbnZhciBTd2FwcGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTdGFydEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGVTdGFydEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZVN0YXJ0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3RhcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZVN0YXJ0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGVTdGFydEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gU3dhcHBhYmxlU3RhcnRFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG5Td2FwcGFibGVTdGFydEV2ZW50LnR5cGUgPSAnc3dhcHBhYmxlOnN0YXJ0JztcblxudmFyIFN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3dhcHBlZEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTd2FwcGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3dhcHBlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3dhcHBlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3dhcHBlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTd2FwcGFibGVTd2FwcGVkRXZlbnQsIFt7XG4gICAga2V5OiAnc3dhcHBlZEVsZW1lbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zd2FwcGVkRWxlbWVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZVN3YXBwZWRFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG5Td2FwcGFibGVTd2FwcGVkRXZlbnQudHlwZSA9ICdzd2FwcGFibGU6c3dhcHBlZCc7XG5cbnZhciBTd2FwcGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN0b3BFdmVudCA9IGZ1bmN0aW9uIChfU3dhcHBhYmxlRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZVN0b3BFdmVudCwgX1N3YXBwYWJsZUV2ZW50Myk7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlU3RvcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZVN0b3BFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZVN0b3BFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZVN0b3BFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIFN3YXBwYWJsZVN0b3BFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG5Td2FwcGFibGVTdG9wRXZlbnQudHlwZSA9ICdzd2FwcGFibGU6c3RvcCc7XG5cbi8qKiovIH0pLFxuLyogNjMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQWJzdHJhY3RFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlID0gZXhwb3J0cy5Td2FwcGFibGUgPSBleHBvcnRzLlNvcnRhYmxlID0gZXhwb3J0cy5EcmFnZ2FibGUgPSB1bmRlZmluZWQ7XG5leHBvcnRzLmNyZWF0ZUV2ZW50Q2xhc3MgPSBjcmVhdGVFdmVudENsYXNzO1xuXG52YXIgX2RyYWdnYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG52YXIgX2RyYWdnYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmFnZ2FibGUpO1xuXG52YXIgX3NvcnRhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OSk7XG5cbnZhciBfc29ydGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc29ydGFibGUpO1xuXG52YXIgX3N3YXBwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTApO1xuXG52YXIgX3N3YXBwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zd2FwcGFibGUpO1xuXG52YXIgX2Ryb3BwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDgpO1xuXG52YXIgX2Ryb3BwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcm9wcGFibGUpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWJzdHJhY3RFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuRHJhZ2dhYmxlID0gX2RyYWdnYWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuU29ydGFibGUgPSBfc29ydGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLlN3YXBwYWJsZSA9IF9zd2FwcGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLkRyb3BwYWJsZSA9IF9kcm9wcGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLkFic3RyYWN0RXZlbnQgPSBfYWJzdHJhY3RFdmVudDIuZGVmYXVsdDtcbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50Q2xhc3Mob3B0aW9ucykge1xuICBmdW5jdGlvbiBFdmVudENvbnN0cnVjdG9yKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIEV2ZW50Q29uc3RydWN0b3IucHJvdG90eXBlID0gX2Fic3RyYWN0RXZlbnQyLmRlZmF1bHQucHJvdG90eXBlO1xuICBjcmVhdGVFdmVudENsYXNzLnR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIHJldHVybiBjcmVhdGVFdmVudENsYXNzO1xufVxuXG4vKioqLyB9KSxcbi8qIDY0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3NlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgX3NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZW5zb3IpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cbnZhciBfc2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIERyYWdTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU2Vuc29yLCBfU2Vuc29yKTtcblxuICBmdW5jdGlvbiBEcmFnU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1NlbnNvcik7XG5cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU2Vuc29yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1NlbnNvcikpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBfdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcblxuICAgIF90aGlzLl9vbk1vdXNlRG93biA9IF90aGlzLl9vbk1vdXNlRG93bi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZVVwID0gX3RoaXMuX29uTW91c2VVcC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25EcmFnU3RhcnQgPSBfdGhpcy5fb25EcmFnU3RhcnQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uRHJhZ092ZXIgPSBfdGhpcy5fb25EcmFnT3Zlci5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25EcmFnRW5kID0gX3RoaXMuX29uRHJhZ0VuZC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25EcmFnRHJvcCA9IF90aGlzLl9vbkRyYWdEcm9wLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuX29uRHJhZ092ZXIsIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuX29uRHJhZ0VuZCwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fb25EcmFnRHJvcCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCwgdHJ1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLl9vbkRyYWdPdmVyLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLl9vbkRyYWdFbmQsIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuX29uRHJhZ0Ryb3AsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlXG5cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdGFydChldmVudCkge1xuICAgICAgLy8gTmVlZCBmb3IgZmlyZWZveC4gXCJ0ZXh0XCIga2V5IGlzIG5lZWRlZCBmb3IgSUVcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJycpO1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSB0aGlzLm9wdGlvbnMudHlwZTtcblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdGFydEV2ZW50KTtcblxuICAgICAgaWYgKGRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAvLyBwcmV2ZW50IGRyYWcgZXZlbnQgaWYgZmlyZWQgZXZlbnQgaGFzIGJlZW4gcHJldmVudGVkXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnT3ZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdPdmVyKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3ZlckNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihjb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuXG4gICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG5cbiAgICAgIGlmICghZHJhZ01vdmVFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gdGhpcy5vcHRpb25zLnR5cGU7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ0VuZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdFbmQoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHByZXZlbnQgY2xpY2sgb24gZHJvcCBpZiBkcmFnZ2FibGUgY29udGFpbnMgYSBjbGlja2FibGUgZWxlbWVudFxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIGNvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnRHJvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdEcm9wKGV2ZW50KSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VEb3duJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgICAvLyBGaXJlZm94IGJ1ZyBmb3IgaW5wdXRzIHdpdGhpbiBkcmFnZ2FibGVzIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTczOTA3MVxuICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiAoZXZlbnQudGFyZ2V0LmZvcm0gfHwgZXZlbnQudGFyZ2V0LmNvbnRlbnRlZGl0YWJsZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm1vdXNlRG93blRpbWVvdXQpO1xuXG4gICAgICAgIHRoaXMubW91c2VEb3duVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRhcmdldC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlVXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZVVwKGV2ZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5tb3VzZURvd25UaW1lb3V0KTtcblxuICAgICAgdmFyIHRhcmdldCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoZXZlbnQudGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcblxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnU2Vuc29yO1xufShfc2Vuc29yMi5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRHJhZ1NlbnNvcjtcblxuLyoqKi8gfSksXG4vKiA2NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9zZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9zZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Vuc29yKTtcblxudmFyIF9zZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRm9yY2VUb3VjaFNlbnNvciA9IGZ1bmN0aW9uIChfU2Vuc29yKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKEZvcmNlVG91Y2hTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIGZ1bmN0aW9uIEZvcmNlVG91Y2hTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBGb3JjZVRvdWNoU2Vuc29yKTtcblxuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKEZvcmNlVG91Y2hTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihGb3JjZVRvdWNoU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIF90aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIF90aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuXG4gICAgX3RoaXMuX29uTW91c2VGb3JjZVdpbGxCZWdpbiA9IF90aGlzLl9vbk1vdXNlRm9yY2VXaWxsQmVnaW4uYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uTW91c2VGb3JjZURvd24gPSBfdGhpcy5fb25Nb3VzZUZvcmNlRG93bi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZURvd24gPSBfdGhpcy5fb25Nb3VzZURvd24uYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uTW91c2VGb3JjZUNoYW5nZSA9IF90aGlzLl9vbk1vdXNlRm9yY2VDaGFuZ2UuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uTW91c2VNb3ZlID0gX3RoaXMuX29uTW91c2VNb3ZlLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vbk1vdXNlVXAgPSBfdGhpcy5fb25Nb3VzZVVwLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEZvcmNlVG91Y2hTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZXdpbGxiZWdpbicsIHRoaXMuX29uTW91c2VGb3JjZVdpbGxCZWdpbiwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlZG93bicsIHRoaXMuX29uTW91c2VGb3JjZURvd24sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlY2hhbmdlZCcsIHRoaXMuX29uTW91c2VGb3JjZUNoYW5nZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2V3aWxsYmVnaW4nLCB0aGlzLl9vbk1vdXNlRm9yY2VXaWxsQmVnaW4sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZWRvd24nLCB0aGlzLl9vbk1vdXNlRm9yY2VEb3duLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZWNoYW5nZWQnLCB0aGlzLl9vbk1vdXNlRm9yY2VDaGFuZ2UsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZUZvcmNlV2lsbEJlZ2luJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VGb3JjZVdpbGxCZWdpbihldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMubWlnaHREcmFnID0gdHJ1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZUZvcmNlRG93bicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRm9yY2VEb3duKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gIWRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCk7XG4gICAgICB0aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlVXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZVVwKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlRG93bicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRG93bihldmVudCkge1xuICAgICAgaWYgKCF0aGlzLm1pZ2h0RHJhZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIE5lZWQgd29ya2Fyb3VuZCBmb3IgcmVhbCBjbGlja1xuICAgICAgLy8gQ2FuY2VsIHBvdGVudGlhbCBkcmFnIGV2ZW50c1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VGb3JjZUNoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRm9yY2VDaGFuZ2UoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50KHtcbiAgICAgICAgcHJlc3N1cmU6IGV2ZW50LndlYmtpdEZvcmNlLFxuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlRm9yY2VHbG9iYWxDaGFuZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZUZvcmNlR2xvYmFsQ2hhbmdlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50KHtcbiAgICAgICAgcHJlc3N1cmU6IGV2ZW50LndlYmtpdEZvcmNlLFxuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRm9yY2VUb3VjaFNlbnNvcjtcbn0oX3NlbnNvcjIuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZvcmNlVG91Y2hTZW5zb3I7XG5cbi8qKiovIH0pLFxuLyogNjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfc2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfc2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NlbnNvcik7XG5cbnZhciBfc2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIE1vdXNlU2Vuc29yID0gZnVuY3Rpb24gKF9TZW5zb3IpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTW91c2VTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIGZ1bmN0aW9uIE1vdXNlU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTW91c2VTZW5zb3IpO1xuXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTW91c2VTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNb3VzZVNlbnNvcikpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBfdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICBfdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcblxuICAgIF90aGlzLl9vbk1vdXNlRG93biA9IF90aGlzLl9vbk1vdXNlRG93bi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZU1vdmUgPSBfdGhpcy5fb25Nb3VzZU1vdmUuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uTW91c2VVcCA9IF90aGlzLl9vbk1vdXNlVXAuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTW91c2VTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZURvd24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubW91c2VEb3duVGltZW91dCk7XG4gICAgICB0aGlzLm1vdXNlRG93blRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFfdGhpczIubW91c2VEb3duKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRyYWdTdGFydEV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnU3RhcnRTZW5zb3JFdmVudCh7XG4gICAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICAgIF90aGlzMi5jdXJyZW50Q29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBfdGhpczIuZHJhZ2dpbmcgPSAhZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKTtcbiAgICAgIH0sIHRoaXMub3B0aW9ucy5kZWxheSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VVcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1vdXNlU2Vuc29yO1xufShfc2Vuc29yMi5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTW91c2VTZW5zb3I7XG5cbi8qKiovIH0pLFxuLyogNjcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfc2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfc2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NlbnNvcik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblxudmFyIF9zZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgVG91Y2hTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShUb3VjaFNlbnNvciwgX1NlbnNvcik7XG5cbiAgZnVuY3Rpb24gVG91Y2hTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBUb3VjaFNlbnNvcik7XG5cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChUb3VjaFNlbnNvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFRvdWNoU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIF90aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuICAgIF90aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50ID0gbnVsbDtcblxuICAgIF90aGlzLl9vblRvdWNoU3RhcnQgPSBfdGhpcy5fb25Ub3VjaFN0YXJ0LmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblRvdWNoSG9sZCA9IF90aGlzLl9vblRvdWNoSG9sZC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Ub3VjaEVuZCA9IF90aGlzLl9vblRvdWNoRW5kLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblRvdWNoTW92ZSA9IF90aGlzLl9vblRvdWNoTW92ZS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TY3JvbGwgPSBfdGhpcy5fb25TY3JvbGwuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoVG91Y2hTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMuX29uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TY3JvbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TY3JvbGwoKSB7XG4gICAgICAvLyBDYW5jZWwgcG90ZW50aWFsIGRyYWcgYW5kIGFsbG93IHNjcm9sbCBvbiBpT1Mgb3Igb3RoZXIgdG91Y2ggZGV2aWNlc1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGFwVGltZW91dCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgLy8gZGV0ZWN0IGlmIGJvZHkgaXMgc2Nyb2xsaW5nIG9uIGlPU1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgX29uQ29udGV4dE1lbnUpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50ID0gKDAsIF91dGlscy5jbG9zZXN0KShjb250YWluZXIsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm9mZnNldEhlaWdodCA8IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhcFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuX29uVG91Y2hIb2xkKGV2ZW50LCBjb250YWluZXIpLCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblRvdWNoSG9sZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoSG9sZChldmVudCwgY29udGFpbmVyKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgICBjbGllbnRYOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgICBjbGllbnRZOiB0b3VjaC5wYWdlWSxcbiAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgICB9KTtcblxuICAgICAgICBfdGhpczIudHJpZ2dlcihjb250YWluZXIsIGRyYWdTdGFydEV2ZW50KTtcblxuICAgICAgICBfdGhpczIuY3VycmVudENvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgX3RoaXMyLmRyYWdnaW5nID0gIWRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblRvdWNoTW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoTW92ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5wYWdlWCAtIHdpbmRvdy5zY3JvbGxYLCB0b3VjaC5wYWdlWSAtIHdpbmRvdy5zY3JvbGxZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgY2xpZW50WTogdG91Y2gucGFnZVksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnTW92ZUV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Ub3VjaEVuZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgX29uQ29udGV4dE1lbnUpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX29uU2Nyb2xsKTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGFwVGltZW91dCk7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogdG91Y2gucGFnZVgsXG4gICAgICAgIGNsaWVudFk6IHRvdWNoLnBhZ2VZLFxuICAgICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG91Y2hTZW5zb3I7XG59KF9zZW5zb3IyLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUb3VjaFNlbnNvcjtcblxuXG5mdW5jdGlvbiBfb25Db250ZXh0TWVudShldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG4vKioqLyB9KSxcbi8qIDY4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg3MyksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA2OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oNzQpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogNzAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDc1KSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDcxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg3NiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA3MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oNzcpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogNzMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg5OCk7XG52YXIgJE9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDc0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oOTkpO1xudmFyICRPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNzUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygxMDApO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cbi8qKiovIH0pLFxuLyogNzYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygxMDMpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMDEpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMDQpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMDUpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKS5TeW1ib2w7XG5cbi8qKiovIH0pLFxuLyogNzcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygxMDIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMDYpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM2KS5mKCdpdGVyYXRvcicpO1xuXG4vKioqLyB9KSxcbi8qIDc4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDc5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcblxuLyoqKi8gfSksXG4vKiA4MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCB0b0xlbmd0aCAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk1KVxuICAsIHRvSW5kZXggICA9IF9fd2VicGFja19yZXF1aXJlX18oOTQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiA4MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuICAsIGdPUFMgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ1KVxuICAsIHBJRSAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKiovIH0pLFxuLyogODIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuLyoqKi8gfSksXG4vKiA4MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IF9fd2VicGFja19yZXF1aXJlX18oMzgpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuLyoqKi8gfSksXG4vKiA4NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IF9fd2VicGFja19yZXF1aXJlX18oMzgpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG4vKioqLyB9KSxcbi8qIDg1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY3JlYXRlICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuICAsIGRlc2NyaXB0b3IgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMilcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzApXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbl9fd2VicGFja19yZXF1aXJlX18oMTEpKEl0ZXJhdG9yUHJvdG90eXBlLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cbi8qKiovIH0pLFxuLyogODYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuLyoqKi8gfSksXG4vKiA4NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2V0S2V5cyAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcbiAgLCB0b0lPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTtcblxuLyoqKi8gfSksXG4vKiA4OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgTUVUQSAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuICAsIGhhcyAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIHNldERlc2MgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KS5mXG4gICwgaWQgICAgICAgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG4vKioqLyB9KSxcbi8qIDg5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkUCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOClcbiAgLCBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG4gICwgZ2V0S2V5cyAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cbi8qKiovIH0pLFxuLyogOTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCBnT1BOICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ0KS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogOTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCB0b09iamVjdCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOTYpXG4gICwgSUVfUFJPVE8gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cbi8qKiovIH0pLFxuLyogOTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNilcbiAgLCBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpKEZ1bmN0aW9uLmNhbGwsIF9fd2VicGFja19yZXF1aXJlX18oNDMpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuLyoqKi8gfSksXG4vKiA5MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMylcbiAgLCBkZWZpbmVkICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cbi8qKiovIH0pLFxuLyogOTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHRvSW50ZWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDk1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cbi8qKiovIH0pLFxuLyogOTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cbi8qKiovIH0pLFxuLyogOTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3OSlcbiAgLCBzdGVwICAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NilcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNilcbiAgLCB0b0lPYmplY3QgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuLyoqKi8gfSksXG4vKiA5OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogX193ZWJwYWNrX3JlcXVpcmVfXygyOCl9KTtcblxuLyoqKi8gfSksXG4vKiA5OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIV9fd2VicGFja19yZXF1aXJlX18oNiksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IF9fd2VicGFja19yZXF1aXJlX18oOCkuZn0pO1xuXG4vKioqLyB9KSxcbi8qIDEwMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDkyKS5zZXR9KTtcblxuLyoqKi8gfSksXG4vKiAxMDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXG5cbi8qKiovIH0pLFxuLyogMTAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgJGF0ICA9IF9fd2VicGFja19yZXF1aXJlX18oOTMpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDQyKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuLyoqKi8gfSksXG4vKiAxMDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcbiAgLCBoYXMgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBERVNDUklQVE9SUyAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNilcbiAgLCAkZXhwb3J0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG4gICwgcmVkZWZpbmUgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KVxuICAsIE1FVEEgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4OCkuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuICAsIHNoYXJlZCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMilcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzApXG4gICwgdWlkICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKVxuICAsIHdrcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcbiAgLCB3a3NFeHQgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpXG4gICwgd2tzRGVmaW5lICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM1KVxuICAsIGtleU9mICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NylcbiAgLCBlbnVtS2V5cyAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oODEpXG4gICwgaXNBcnJheSAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg0KVxuICAsIGFuT2JqZWN0ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcbiAgLCB0b0lPYmplY3QgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpXG4gICwgY3JlYXRlRGVzYyAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxuICAsIF9jcmVhdGUgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOClcbiAgLCBnT1BORXh0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOTApXG4gICwgJEdPUEQgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKVxuICAsICREUCAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KVxuICAsICRrZXlzICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIF9fd2VicGFja19yZXF1aXJlX18oNDQpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgX193ZWJwYWNrX3JlcXVpcmVfXygyOSkuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIF9fd2VicGFja19yZXF1aXJlX18oNDUpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgX193ZWJwYWNrX3JlcXVpcmVfXygxMSkoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cbi8qKiovIH0pLFxuLyogMTA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMzUpKCdhc3luY0l0ZXJhdG9yJyk7XG5cbi8qKiovIH0pLFxuLyogMTA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMzUpKCdvYnNlcnZhYmxlJyk7XG5cbi8qKiovIH0pLFxuLyogMTA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oOTcpO1xudmFyIGdsb2JhbCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG4gICwgaGlkZSAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpXG4gICwgSXRlcmF0b3JzICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpXG4gICwgVE9fU1RSSU5HX1RBRyA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvZHJhZ2dhYmxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==