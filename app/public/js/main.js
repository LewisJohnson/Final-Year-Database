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
	makeAllSortable();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDJjYTBkMDFkMjVjZDljMWJhMmIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9kcmFnZ2FibGUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsiJCIsImFqYXhTZXR1cCIsImhlYWRlcnMiLCJhdHRyIiwiYXBwZW5kIiwic29ydFRhYmxlIiwidGFibGUiLCJjb2wiLCJyZXZlcnNlIiwidGIiLCJ0Qm9kaWVzIiwidHIiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsInJvd3MiLCJpIiwic29ydCIsImEiLCJiIiwiY2VsbHMiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJsb2NhbGVDb21wYXJlIiwibGVuZ3RoIiwiYXBwZW5kQ2hpbGQiLCJtYWtlU29ydGFibGUiLCJ0aCIsInRIZWFkIiwiZGlyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1ha2VBbGxTb3J0YWJsZSIsInBhcmVudCIsImRvY3VtZW50IiwiYm9keSIsInQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFjY2VwdFN0dWRlbnQiLCJzdHVkZW50X2lkIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRhdGEiLCJzdWNjZXNzIiwicmVqZWN0U3R1ZGVudCIsInByb2plY3RfaWQiLCJvbiIsImUiLCJoaWRlIiwiYWRkQ2xhc3MiLCJwcmVwZW5kIiwiQWpheEZ1bmN0aW9ucyIsImRlbGV0ZVByb2plY3QiLCJ2YWwiLCJNb2JpbGVNZW51IiwiZWxlbWVudCIsIndpbmRvdyIsImFjdGl2YXRvciIsIlNlbGVjdG9yc18iLCJIQU1CVVJHRVJfQ09OVEFJTkVSIiwidW5kZXJsYXkiLCJVTkRFUkxBWSIsImluaXQiLCJDc3NDbGFzc2VzXyIsIlZJU0lCTEUiLCJNT0JJTEVfTUVOVSIsIm9wZW5NZW51IiwiY2xvc2VNZW51IiwicmVtb3ZlQ2xhc3MiLCJtb2JpbGVNZW51IiwiYmluZCIsImluaXRBbGwiLCJlYWNoIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImhlYWRlciIsImZpbmQiLCJESUFMT0dfSEVBREVSIiwiY29udGVudCIsIkRJQUxPR19DT05URU5UIiwiYmVmb3JlIiwiSHRtbFNuaXBwZXRzXyIsIkxPQURFUiIsImxvYWRlciIsImlzQ2xvc2FibGUiLCJhY3RpdmF0b3JCdXR0b25zIiwiQUNUSVZFIiwiRElBTE9HIiwic2hvd0xvYWRlciIsInNob3ciLCJoaWRlTG9hZGVyIiwic2hvd0RpYWxvZyIsImhpZGVEaWFsb2ciLCJkaWFsb2ciLCJwdXNoIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwiRGF0YVRhYmxlIiwiYm9keVJvd3MiLCJmb290Um93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImVxIiwiY3NzIiwiUHJvamVjdFRvcGljcyIsIkFERF9UT1BJQ19JTlBVVCIsIk5FV19UT1BJQ19JTlBVVF9DT05UQUlORVIiLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInByb2plY3RUb3BpY3MiLCJhZGRUb3BpY1RvUHJvamVjdCIsInByb2plY3RJZCIsInRvcGljTmFtZSIsImFqYXhVcmwiLCJ0eXBlIiwidG9waWNfbmFtZSIsIkpTT04iLCJwYXJzZSIsImFmdGVyIiwiZG9uZSIsInJlbW92ZVRvcGljRnJvbVByb2plY3QiLCJ0b3BpY0lkIiwidG9waWNfaWQiLCJvYmoiLCJyZW1vdmUiLCJ1cGRhdGVQcm9qZWN0UHJpbWFyeVRvcGljIiwic3dhcHBhYmxlIiwicXVlcnlTZWxlY3RvckFsbCIsImRyYWdnYWJsZSIsIm9yaWdpbmFsUHJpbWFyeVRvcGljSWQiLCJrZXlwcmVzcyIsIndoaWNoIiwiZm9jdXMiLCJTRUFSQ0hfSU5QVVQiLCJTRUFSQ0hfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0JVVFRPTiIsIkxPR19JTl9ESUFMT0ciLCJDSEFOR0VfQVVUSF9ESUFMT0ciLCJwcm9qZWN0TmFtZSIsImNvbmZpcm0iLCJsb2NhdGlvbiIsImhyZWYiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiaW5kZXgiLCJjbGFzc05hbWUiLCJtYXRjaCIsImpvaW4iLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJoYXNDbGFzcyIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwicmVzcG9uc2UiLCJodG1sIiwiY29udGV4dCIsImRlbGV0ZVRvcGljIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwicHJldmVudERlZmF1bHQiLCJzZXJpYWxpemUiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwic3RhdHVzIiwicGFyZW50cyIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJhbGVydCIsIk1hcmtlciIsInNlbGVjdGVkU3R1ZGVudCIsInNlbGVjdGVkU3VwZXJ2aXNvciIsInN0dWRlbnRUYWJsZSIsInN0dWRlbnREYXRhVGFibGUiLCJzdXBlcnZpc29yVGFibGUiLCJzdXBlcnZpc29yRGF0YVRhYmxlIiwibWFya2VyIiwic2VsZWN0U3R1ZGVudCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdHVkZW50Um93RE9NIiwidW5zZWxlY3RBbGwiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0IiwibWFya2VySWQiLCJtYXJrZXJfaWQiLCJ3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsIm1vZHVsZXMiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwibCIsIm0iLCJjIiwidmFsdWUiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJuIiwiX19lc01vZHVsZSIsImdldERlZmF1bHQiLCJnZXRNb2R1bGVFeHBvcnRzIiwib2JqZWN0IiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiZGVmYXVsdCIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJUeXBlRXJyb3IiLCJfZGVmaW5lUHJvcGVydHkiLCJfZGVmaW5lUHJvcGVydHkyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsImRlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJ3cml0YWJsZSIsImtleSIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl9zZXRQcm90b3R5cGVPZiIsIl9zZXRQcm90b3R5cGVPZjIiLCJfY3JlYXRlIiwiX2NyZWF0ZTIiLCJfdHlwZW9mMiIsIl90eXBlb2YzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiY29uc3RydWN0b3IiLCJfX3Byb3RvX18iLCJzZWxmIiwiUmVmZXJlbmNlRXJyb3IiLCJfY2xhc3NDYWxsQ2hlY2syIiwiX2NsYXNzQ2FsbENoZWNrMyIsIl9jcmVhdGVDbGFzczIiLCJfY3JlYXRlQ2xhc3MzIiwiQWJzdHJhY3RFdmVudCIsIl9jYW5jZWxlZCIsImNhbmNlbCIsImNhbmNlbGVkIiwiQm9vbGVhbiIsImNhbmNlbGFibGUiLCJnbG9iYWwiLCJNYXRoIiwiRnVuY3Rpb24iLCJfX2ciLCJpdCIsImFuT2JqZWN0IiwiSUU4X0RPTV9ERUZJTkUiLCJ0b1ByaW1pdGl2ZSIsImRQIiwiZiIsIk8iLCJQIiwiQXR0cmlidXRlcyIsIklPYmplY3QiLCJkZWZpbmVkIiwiY29yZSIsInZlcnNpb24iLCJfX2UiLCJjcmVhdGVEZXNjIiwic3RvcmUiLCJ1aWQiLCJTeW1ib2wiLCJVU0VfU1lNQk9MIiwiJGV4cG9ydHMiLCJjbG9zZXN0Iiwic2Nyb2xsIiwic2VsZWN0b3IiLCJjb25kaXRpb25GbiIsImN1cnJlbnRFbGVtZW50IiwibWF0Y2hGdW5jdGlvbiIsIkVsZW1lbnQiLCJtYXRjaGVzIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJjdXJyZW50IiwiY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQiLCJjb3JyZXNwb25kaW5nRWxlbWVudCIsInBhcmVudE5vZGUiLCJzY3JvbGxBbmltYXRpb25GcmFtZSIsIl9yZWYiLCJjbGllbnRYIiwiY2xpZW50WSIsInNwZWVkIiwic2Vuc2l0aXZpdHkiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInNjcm9sbEZuIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIm9mZnNldFkiLCJhYnMiLCJib3R0b20iLCJ0b3AiLCJvZmZzZXRYIiwicmlnaHQiLCJsZWZ0Iiwic2Nyb2xsVG9wIiwic2Nyb2xsTGVmdCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImlzT2JqZWN0IiwiY3R4IiwiUFJPVE9UWVBFIiwiJGV4cG9ydCIsInNvdXJjZSIsIklTX0ZPUkNFRCIsIkYiLCJJU19HTE9CQUwiLCJHIiwiSVNfU1RBVElDIiwiUyIsIklTX1BST1RPIiwiSVNfQklORCIsIkIiLCJJU19XUkFQIiwiVyIsImV4cFByb3RvIiwib3duIiwib3V0IiwidW5kZWZpbmVkIiwiQyIsImFyZ3VtZW50cyIsImFwcGx5IiwidmlydHVhbCIsIlIiLCJVIiwiX3V0aWxzIiwiX2FjY2Vzc2liaWxpdHkiLCJfYWNjZXNzaWJpbGl0eTIiLCJfbWlycm9yIiwiX21pcnJvcjIiLCJfY29sbGlkYWJsZSIsIl9jb2xsaWRhYmxlMiIsIl9zbmFwcGFibGUiLCJfc25hcHBhYmxlMiIsIl9kcmFnU2Vuc29yIiwiX2RyYWdTZW5zb3IyIiwiX21vdXNlU2Vuc29yIiwiX21vdXNlU2Vuc29yMiIsIl90b3VjaFNlbnNvciIsIl90b3VjaFNlbnNvcjIiLCJfZm9yY2VUb3VjaFNlbnNvciIsIl9mb3JjZVRvdWNoU2Vuc29yMiIsIl9kcmFnZ2FibGVFdmVudCIsIl9kcmFnRXZlbnQiLCJfbWlycm9yRXZlbnQiLCJkZWZhdWx0cyIsImhhbmRsZSIsImRlbGF5IiwicGxhY2VkVGltZW91dCIsIm5hdGl2ZSIsInBsdWdpbnMiLCJjbGFzc2VzIiwibWlycm9yIiwiRHJhZ2dhYmxlIiwiQWNjZXNzaWJpbGl0eSIsIk1pcnJvciIsIkNvbGxpZGFibGUiLCJTbmFwcGFibGUiLCJjb250YWluZXJzIiwib3B0aW9ucyIsImFzc2lnbiIsImFjdGl2ZVNlbnNvcnMiLCJhY3RpdmVQbHVnaW5zIiwiY2FsbGJhY2tzIiwiZHJhZ2dpbmciLCJkcmFnU3RhcnQiLCJkcmFnTW92ZSIsImRyYWdTdG9wIiwiZHJhZ1ByZXNzdXJlIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiIsIl9kaWRJdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3IiLCJpdGVyYXRvciIsIl9zdGVwIiwibmV4dCIsInJldHVybiIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIlBsdWdpbiIsInBsdWdpbiIsImF0dGFjaCIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zIiwiX2RpZEl0ZXJhdG9yRXJyb3IzIiwiX2l0ZXJhdG9yRXJyb3IzIiwiX2l0ZXJhdG9yMyIsInNlbnNvcnMiLCJfc3RlcDMiLCJTZW5zb3IiLCJzZW5zb3IiLCJkcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50IiwiRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCIsInRyaWdnZXJFdmVudCIsImRlc3Ryb3kiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCIsIl9kaWRJdGVyYXRvckVycm9yNCIsIl9pdGVyYXRvckVycm9yNCIsIl9pdGVyYXRvcjQiLCJfc3RlcDQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZHJhZ2dhYmxlRGVzdHJveUV2ZW50IiwiRHJhZ2dhYmxlRGVzdHJveUV2ZW50IiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUiLCJfZGlkSXRlcmF0b3JFcnJvcjUiLCJfaXRlcmF0b3JFcnJvcjUiLCJfaXRlcmF0b3I1IiwiX3N0ZXA1IiwiYWN0aXZlUGx1Z2luIiwiZGV0YWNoIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYiLCJfZGlkSXRlcmF0b3JFcnJvcjYiLCJfaXRlcmF0b3JFcnJvcjYiLCJfaXRlcmF0b3I2IiwiX3N0ZXA2IiwiYWN0aXZlU2Vuc29yIiwiY2FsbGJhY2siLCJvZmYiLCJjb3B5Iiwic3BsaWNlIiwidHJpZ2dlciIsIl9sZW4iLCJhcmdzIiwiX2tleSIsImV2ZW50Iiwic2Vuc29yRXZlbnQiLCJnZXRTZW5zb3JFdmVudCIsIm9yaWdpbmFsRXZlbnQiLCJzb3VyY2VDb250YWluZXIiLCJpc0RyYWdFdmVudCIsImFwcGVuZGFibGVDb250YWluZXIiLCJnZXRBcHBlbmRhYmxlQ29udGFpbmVyIiwiY2xvbmVOb2RlIiwibWlycm9yQ3JlYXRlZEV2ZW50IiwiTWlycm9yQ3JlYXRlZEV2ZW50IiwibWlycm9yQXR0YWNoZWRFdmVudCIsIk1pcnJvckF0dGFjaGVkRXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJnZXRDbGFzc05hbWVGb3IiLCJtaXJyb3JNb3ZlRXZlbnQiLCJNaXJyb3JNb3ZlRXZlbnQiLCJzY3JvbGxhYmxlUGFyZW50Iiwib2Zmc2V0SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiZHJhZ0V2ZW50IiwiRHJhZ1N0YXJ0RXZlbnQiLCJyZW1vdmVDaGlsZCIsImRyYWdNb3ZlRXZlbnQiLCJEcmFnTW92ZUV2ZW50Iiwib3ZlckNvbnRhaW5lciIsImNsb3Nlc3RDb250YWluZXIiLCJpc0xlYXZpbmdDb250YWluZXIiLCJjdXJyZW50T3ZlckNvbnRhaW5lciIsImlzTGVhdmluZ0RyYWdnYWJsZSIsImN1cnJlbnRPdmVyIiwiaXNPdmVyQ29udGFpbmVyIiwiaXNPdmVyRHJhZ2dhYmxlIiwiZHJhZ091dEV2ZW50IiwiRHJhZ091dEV2ZW50Iiwib3ZlciIsImRyYWdPdXRDb250YWluZXJFdmVudCIsIkRyYWdPdXRDb250YWluZXJFdmVudCIsImRyYWdPdmVyQ29udGFpbmVyRXZlbnQiLCJEcmFnT3ZlckNvbnRhaW5lckV2ZW50IiwiZHJhZ092ZXJFdmVudCIsIkRyYWdPdmVyRXZlbnQiLCJfdGhpcyIsImRyYWdTdG9wRXZlbnQiLCJEcmFnU3RvcEV2ZW50IiwibWlycm9yRGVzdHJveUV2ZW50IiwiTWlycm9yRGVzdHJveUV2ZW50IiwibGFzdFNvdXJjZSIsImxhc3RTb3VyY2VDb250YWluZXIiLCJzZXRUaW1lb3V0IiwiZHJhZ1ByZXNzdXJlRXZlbnQiLCJEcmFnUHJlc3N1cmVFdmVudCIsInByZXNzdXJlIiwiYXBwZW5kVG8iLCJxdWVyeVNlbGVjdG9yIiwiSFRNTEVsZW1lbnQiLCJfdGhpczIiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNyIsIl9kaWRJdGVyYXRvckVycm9yNyIsIl9pdGVyYXRvckVycm9yNyIsIl9pdGVyYXRvcjciLCJfc3RlcDciLCJjb250YWluZXJFbCIsImRldGFpbCIsInRlc3QiLCJEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCIsIkRyYWdTdG9wU2Vuc29yRXZlbnQiLCJEcmFnTW92ZVNlbnNvckV2ZW50IiwiRHJhZ1N0YXJ0U2Vuc29yRXZlbnQiLCJTZW5zb3JFdmVudCIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyIsIl9pbmhlcml0czIiLCJfaW5oZXJpdHMzIiwiX2Fic3RyYWN0RXZlbnQiLCJfYWJzdHJhY3RFdmVudDIiLCJfQWJzdHJhY3RFdmVudCIsImdldFByb3RvdHlwZU9mIiwiX1NlbnNvckV2ZW50IiwiX1NlbnNvckV2ZW50MiIsIl9TZW5zb3JFdmVudDMiLCJfU2Vuc29yRXZlbnQ0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwibGFzdEV2ZW50IiwiZXhlYyIsIiRrZXlzIiwiZW51bUJ1Z0tleXMiLCJrZXlzIiwiYml0bWFwIiwiaWQiLCJweCIsInJhbmRvbSIsImNvbmNhdCIsInRvU3RyaW5nIiwic3BsaXQiLCJkUHMiLCJJRV9QUk9UTyIsIkVtcHR5IiwiY3JlYXRlRGljdCIsImlmcmFtZSIsImx0IiwiZ3QiLCJpZnJhbWVEb2N1bWVudCIsInN0eWxlIiwiZGlzcGxheSIsInNyYyIsImNvbnRlbnRXaW5kb3ciLCJvcGVuIiwid3JpdGUiLCJjbG9zZSIsImNyZWF0ZSIsIlByb3BlcnRpZXMiLCJyZXN1bHQiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImRlZiIsImhhcyIsIlRBRyIsInRhZyIsInN0YXQiLCJzaGFyZWQiLCJTSEFSRUQiLCJjZWlsIiwiZmxvb3IiLCJpc05hTiIsImZuIiwidmFsdWVPZiIsIkxJQlJBUlkiLCJ3a3NFeHQiLCIkU3ltYm9sIiwiY2hhckF0IiwiX3N5bWJvbCIsIl9zeW1ib2wyIiwiX3R5cGVvZiIsImFGdW5jdGlvbiIsInRoYXQiLCJjcmVhdGVFbGVtZW50IiwicmVkZWZpbmUiLCJJdGVyYXRvcnMiLCIkaXRlckNyZWF0ZSIsInNldFRvU3RyaW5nVGFnIiwiSVRFUkFUT1IiLCJCVUdHWSIsIkZGX0lURVJBVE9SIiwiS0VZUyIsIlZBTFVFUyIsInJldHVyblRoaXMiLCJCYXNlIiwiTkFNRSIsIkRFRkFVTFQiLCJJU19TRVQiLCJGT1JDRUQiLCJnZXRNZXRob2QiLCJraW5kIiwicHJvdG8iLCJ2YWx1ZXMiLCJlbnRyaWVzIiwiREVGX1ZBTFVFUyIsIlZBTFVFU19CVUciLCIkbmF0aXZlIiwiJGRlZmF1bHQiLCIkZW50cmllcyIsIiRhbnlOYXRpdmUiLCJtZXRob2RzIiwiSXRlcmF0b3JQcm90b3R5cGUiLCJwSUUiLCJ0b0lPYmplY3QiLCJnT1BEIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiaGlkZGVuS2V5cyIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJhcnJheUluZGV4T2YiLCJuYW1lcyIsIl9kcmFnZ2FibGUiLCJfZHJhZ2dhYmxlMiIsIl9kcm9wcGFibGVFdmVudCIsIkRyb3BwYWJsZSIsIl9vbkRyYWdTdGFydCIsIl9vbkRyYWdNb3ZlIiwiX29uRHJhZ1N0b3AiLCJkcm9wcGFibGVzIiwiX2dldERyb3BwYWJsZXMiLCJkcm9wcGFibGUiLCJpbml0aWFsRHJvcHBhYmxlIiwiZHJvcHBhYmxlRWxlbWVudCIsImNvbnRhaW5zIiwiX2Nsb3Nlc3REcm9wcGFibGUiLCJvdmVyRW1wdHlEcm9wcGFibGUiLCJfZHJvcCIsImxhc3REcm9wcGFibGUiLCJfcmVsZWFzZSIsIm9jY3VwaWVkQ2xhc3MiLCJkcm9wcGFibGVPdmVyRXZlbnQiLCJEcm9wcGFibGVPdmVyRXZlbnQiLCJkcm9wcGFibGVPdXRFdmVudCIsIkRyb3BwYWJsZU91dEV2ZW50IiwiZnJvbSIsImluY2x1ZGVzIiwiTm9kZUxpc3QiLCJfc29ydGFibGVFdmVudCIsIlNvcnRhYmxlIiwiX29uRHJhZ092ZXJDb250YWluZXIiLCJfb25EcmFnT3ZlciIsInN0YXJ0SW5kZXgiLCJzb3J0YWJsZVN0YXJ0RXZlbnQiLCJTb3J0YWJsZVN0YXJ0RXZlbnQiLCJtb3ZlcyIsIm1vdmUiLCJzb3J0YWJsZVNvcnRlZEV2ZW50IiwiU29ydGFibGVTb3J0ZWRFdmVudCIsInNvcnRhYmxlU3RvcEV2ZW50IiwiU29ydGFibGVTdG9wRXZlbnQiLCJvbGRJbmRleCIsIm5ld0luZGV4Iiwib2Zmc2V0IiwiaW5kZXhPZiIsImNoaWxkcmVuIiwiZW1wdHlPdmVyQ29udGFpbmVyIiwiZGlmZmVyZW50Q29udGFpbmVyIiwic2FtZUNvbnRhaW5lciIsIm1vdmVJbnNpZGVFbXB0eUNvbnRhaW5lciIsIm1vdmVXaXRoaW5Db250YWluZXIiLCJtb3ZlT3V0c2lkZUNvbnRhaW5lciIsIm9sZENvbnRhaW5lciIsIm5ld0NvbnRhaW5lciIsImluc2VydEJlZm9yZSIsIm5leHRFbGVtZW50U2libGluZyIsIl9zd2FwcGFibGVFdmVudCIsIlN3YXBwYWJsZSIsInN3YXBwYWJsZVN0YXJ0RXZlbnQiLCJTd2FwcGFibGVTdGFydEV2ZW50IiwibGFzdE92ZXIiLCJzd2FwIiwic3dhcHBhYmxlU3dhcHBlZEV2ZW50IiwiU3dhcHBhYmxlU3dhcHBlZEV2ZW50Iiwic3dhcHBlZEVsZW1lbnQiLCJzd2FwcGFibGVTdG9wRXZlbnQiLCJTd2FwcGFibGVTdG9wRXZlbnQiLCJ3aXRoVGVtcEVsZW1lbnQiLCJ0bXBFbGVtZW50Iiwib3ZlclBhcmVudCIsInNvdXJjZVBhcmVudCIsIl9jb2xsaWRhYmxlRXZlbnQiLCJfb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjdXJyZW50QW5pbWF0aW9uRnJhbWUiLCJjdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50IiwiY29sbGlkYWJsZUluRXZlbnQiLCJDb2xsaWRhYmxlSW5FdmVudCIsImNvbGxpZGluZ0VsZW1lbnQiLCJjb2xsaWRhYmxlT3V0RXZlbnQiLCJDb2xsaWRhYmxlT3V0RXZlbnQiLCJsYXN0Q29sbGlkaW5nRWxlbWVudCIsImVudGVyaW5nQ29sbGlkYWJsZSIsImxlYXZpbmdDb2xsaWRhYmxlIiwiY29sbGlkYWJsZXMiLCJfZ2V0Q29sbGlkYWJsZXMiLCJfc25hcHBhYmxlRXZlbnQiLCJfb25EcmFnT3V0IiwiZmlyc3RTb3VyY2UiLCJzbmFwSW5FdmVudCIsIlNuYXBJbkV2ZW50Iiwic25hcE91dEV2ZW50IiwiU25hcE91dEV2ZW50IiwiQVJJQV9HUkFCQkVEIiwiQVJJQV9EUk9QRUZGRUNUIiwiVEFCSU5ERVgiLCJfb25Jbml0IiwiX29uRGVzdHJveSIsInNldEF0dHJpYnV0ZSIsIl9yZWYyIiwicmVtb3ZlQXR0cmlidXRlIiwiX3JlZjMiLCJfcmVmNCIsIl9vbk1pcnJvckNyZWF0ZWQiLCJfb25NaXJyb3JNb3ZlIiwib25NaXJyb3JDcmVhdGVkIiwibWlycm9yQ2xhc3MiLCJzZXRTdGF0ZSIsIm1pcnJvck9mZnNldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImNvbXB1dGVNaXJyb3JEaW1lbnNpb25zIiwiY2FsY3VsYXRlTWlycm9yT2Zmc2V0IiwiYWRkTWlycm9yQ2xhc3NlcyIsInBvc2l0aW9uTWlycm9yIiwicmVtb3ZlTWlycm9ySUQiLCJjYXRjaCIsInJhZiIsInJlc2V0TWlycm9yIiwid2l0aFByb21pc2UiLCJwb3NpdGlvbiIsInBvaW50ZXJFdmVudHMiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwic291cmNlUmVjdCIsIl9yZWY0JHdpdGhGcmFtZSIsIndpdGhGcmFtZSIsIngiLCJ5IiwidHJhbnNmb3JtIiwiZnJhbWUiLCJfcmVmNSIsIl9yZWY1JHJhZiIsInJlamVjdCIsIkNvbGxpZGFibGVFdmVudCIsIl9Db2xsaWRhYmxlRXZlbnQiLCJfQ29sbGlkYWJsZUV2ZW50MiIsIkRyYWdFdmVudCIsImhhc01pcnJvciIsIl9EcmFnRXZlbnQiLCJfRHJhZ0V2ZW50MiIsIl9EcmFnRXZlbnQzIiwiX0RyYWdFdmVudDQiLCJfRHJhZ0V2ZW50NSIsIl9EcmFnRXZlbnQ2IiwiX0RyYWdFdmVudDciLCJfRHJhZ0V2ZW50OCIsIkRyYWdnYWJsZUV2ZW50IiwiX0RyYWdnYWJsZUV2ZW50IiwiX0RyYWdnYWJsZUV2ZW50MiIsIkRyb3BwYWJsZUV2ZW50IiwiX0Ryb3BwYWJsZUV2ZW50IiwiX0Ryb3BwYWJsZUV2ZW50MiIsIk1pcnJvckV2ZW50IiwiX01pcnJvckV2ZW50IiwiX01pcnJvckV2ZW50MiIsIl9NaXJyb3JFdmVudDMiLCJfTWlycm9yRXZlbnQ0IiwiU25hcEV2ZW50IiwiX1NuYXBFdmVudCIsIl9TbmFwRXZlbnQyIiwiU29ydGFibGVFdmVudCIsIl9Tb3J0YWJsZUV2ZW50IiwiX1NvcnRhYmxlRXZlbnQyIiwiX1NvcnRhYmxlRXZlbnQzIiwiU3dhcHBhYmxlRXZlbnQiLCJfU3dhcHBhYmxlRXZlbnQiLCJfU3dhcHBhYmxlRXZlbnQyIiwiX1N3YXBwYWJsZUV2ZW50MyIsImNyZWF0ZUV2ZW50Q2xhc3MiLCJfc29ydGFibGUiLCJfc29ydGFibGUyIiwiX3N3YXBwYWJsZSIsIl9zd2FwcGFibGUyIiwiX2Ryb3BwYWJsZSIsIl9kcm9wcGFibGUyIiwiRXZlbnRDb25zdHJ1Y3RvciIsIl9zZW5zb3IiLCJfc2Vuc29yMiIsIl9zZW5zb3JFdmVudCIsIkRyYWdTZW5zb3IiLCJfU2Vuc29yIiwiY3VycmVudENvbnRhaW5lciIsIl9vbk1vdXNlRG93biIsIl9vbk1vdXNlVXAiLCJfb25EcmFnRW5kIiwiX29uRHJhZ0Ryb3AiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZWZmZWN0QWxsb3dlZCIsImVsZW1lbnRGcm9tUG9pbnQiLCJjdXJyZW50VGFyZ2V0IiwiZHJhZ1N0YXJ0RXZlbnQiLCJmb3JtIiwiY29udGVudGVkaXRhYmxlIiwiY2xlYXJUaW1lb3V0IiwibW91c2VEb3duVGltZW91dCIsIkZvcmNlVG91Y2hTZW5zb3IiLCJtaWdodERyYWciLCJfb25Nb3VzZUZvcmNlV2lsbEJlZ2luIiwiX29uTW91c2VGb3JjZURvd24iLCJfb25Nb3VzZUZvcmNlQ2hhbmdlIiwiX29uTW91c2VNb3ZlIiwic3RvcFByb3BhZ2F0aW9uIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwid2Via2l0Rm9yY2UiLCJfb25Nb3VzZUZvcmNlR2xvYmFsQ2hhbmdlIiwiTW91c2VTZW5zb3IiLCJtb3VzZURvd24iLCJidXR0b24iLCJUb3VjaFNlbnNvciIsImN1cnJlbnRTY3JvbGxhYmxlUGFyZW50IiwiX29uVG91Y2hTdGFydCIsIl9vblRvdWNoSG9sZCIsIl9vblRvdWNoRW5kIiwiX29uVG91Y2hNb3ZlIiwiX29uU2Nyb2xsIiwidGFwVGltZW91dCIsIl9vbkNvbnRleHRNZW51IiwidG91Y2giLCJ0b3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwic2Nyb2xsWCIsInNjcm9sbFkiLCIkT2JqZWN0IiwiRCIsImRlc2MiLCJzZXRQcm90b3R5cGVPZiIsInRvTGVuZ3RoIiwidG9JbmRleCIsIklTX0lOQ0xVREVTIiwiJHRoaXMiLCJlbCIsImZyb21JbmRleCIsImdldEtleXMiLCJnT1BTIiwiZ2V0U3ltYm9scyIsInN5bWJvbHMiLCJpc0VudW0iLCJkb2N1bWVudEVsZW1lbnQiLCJjb2YiLCJpc0FycmF5IiwiYXJnIiwiTUVUQSIsInNldERlc2MiLCJpc0V4dGVuc2libGUiLCJGUkVFWkUiLCJwcmV2ZW50RXh0ZW5zaW9ucyIsInNldE1ldGEiLCJ3IiwiZmFzdEtleSIsImdldFdlYWsiLCJvbkZyZWV6ZSIsIm1ldGEiLCJORUVEIiwiS0VZIiwiZ09QTiIsIndpbmRvd05hbWVzIiwiZ2V0V2luZG93TmFtZXMiLCJ0b09iamVjdCIsIk9iamVjdFByb3RvIiwiY2hlY2siLCJzZXQiLCJidWdneSIsInRvSW50ZWdlciIsIlRPX1NUUklORyIsInBvcyIsIlN0cmluZyIsImNoYXJDb2RlQXQiLCJtYXgiLCJtaW4iLCJhZGRUb1Vuc2NvcGFibGVzIiwic3RlcCIsIml0ZXJhdGVkIiwiX3QiLCJfaSIsIl9rIiwiQXJndW1lbnRzIiwiJGF0IiwicG9pbnQiLCJERVNDUklQVE9SUyIsIiRmYWlscyIsIndrcyIsIndrc0RlZmluZSIsImtleU9mIiwiZW51bUtleXMiLCJnT1BORXh0IiwiJEdPUEQiLCIkRFAiLCIkSlNPTiIsIl9zdHJpbmdpZnkiLCJzdHJpbmdpZnkiLCJISURERU4iLCJUT19QUklNSVRJVkUiLCJTeW1ib2xSZWdpc3RyeSIsIkFsbFN5bWJvbHMiLCJPUFN5bWJvbHMiLCJVU0VfTkFUSVZFIiwiUU9iamVjdCIsInNldHRlciIsImZpbmRDaGlsZCIsInNldFN5bWJvbERlc2MiLCJwcm90b0Rlc2MiLCJ3cmFwIiwic3ltIiwiaXNTeW1ib2wiLCIkZGVmaW5lUHJvcGVydHkiLCIkZGVmaW5lUHJvcGVydGllcyIsIiRjcmVhdGUiLCIkcHJvcGVydHlJc0VudW1lcmFibGUiLCJFIiwiJGdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIiRnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiJGdldE93blByb3BlcnR5U3ltYm9scyIsIklTX09QIiwiJHNldCIsImtleUZvciIsInVzZVNldHRlciIsInVzZVNpbXBsZSIsInJlcGxhY2VyIiwiJHJlcGxhY2VyIiwiVE9fU1RSSU5HX1RBRyIsImNvbGxlY3Rpb25zIiwiQ29sbGVjdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBQSxFQUFFLFlBQVc7QUFDYjs7QUFHQTs7OztBQUdBQSxHQUFFQyxTQUFGLENBQVk7QUFDWEMsV0FBUztBQUNSLG1CQUFnQkYsRUFBRSx5QkFBRixFQUE2QkcsSUFBN0IsQ0FBa0MsU0FBbEM7QUFEUjtBQURFLEVBQVo7O0FBT0E7OztBQUdBO0FBQ0FILEdBQUUsTUFBRixFQUFVSSxNQUFWLENBQWlCLDhCQUFqQjs7QUFHQTs7O0FBR0EsVUFBU0MsU0FB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IG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDJjYTBkMDFkMjVjZDljMWJhMmIiLCJpbXBvcnQge1N3YXBwYWJsZX0gZnJvbSBcIi4uLy4uLy4uL3B1YmxpYy9qcy9kcmFnZ2FibGVcIjtcclxuXHJcbi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4xLiBBSkFYIFNldHVwXHJcbjIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG4zLiBHZW5lcmljIEZ1bmN0aW9uc1xyXG40LiBDb21wb25lbnRzXHJcblx0NC4xIE1vYmlsZSBNZW51XHJcblx0NC4yIERpYWxvZyAvIE1vZGFsXHJcblx0NC4zIERhdGEgVGFibGVcclxuXHQ0LjQgUHJvamVjdCBUb3BpY3MgW1N1cGVydmlzb3JdXHJcblx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQ0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG41LlxyXG42LiBJbml0aWFsaXNlIEV2ZXJ5dGhpbmdcclxuKi9cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgMS4gQUpBWCBTZXR1cFxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiQuYWpheFNldHVwKHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKVxyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vLyBBZGRzIGdsb2JhbCB1bmRlcmxheVxyXG4kKCdib2R5JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwidW5kZXJsYXlcIj48L2Rpdj4nKTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDMuIEdlbmVyaWMgRnVuY3Rpb25zXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZnVuY3Rpb24gc29ydFRhYmxlKHRhYmxlLCBjb2wsIHJldmVyc2UpIHtcclxuXHR2YXIgdGIgPSB0YWJsZS50Qm9kaWVzWzBdLCAvLyB1c2UgYDx0Ym9keT5gIHRvIGlnbm9yZSBgPHRoZWFkPmAgYW5kIGA8dGZvb3Q+YCByb3dzXHJcblx0XHR0ciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRiLnJvd3MsIDApLCAvLyBwdXQgcm93cyBpbnRvIGFycmF5XHJcblx0XHRpO1xyXG5cdHJldmVyc2UgPSAtKCgrcmV2ZXJzZSkgfHwgLTEpO1xyXG5cdHRyID0gdHIuc29ydChmdW5jdGlvbiAoYSwgYikgeyAvLyBzb3J0IHJvd3NcclxuXHRcdHJldHVybiByZXZlcnNlIC8vIGAtMSAqYCBpZiB3YW50IG9wcG9zaXRlIG9yZGVyXHJcblx0XHRcdCogKGEuY2VsbHNbY29sXS50ZXh0Q29udGVudC50cmltKCkgLy8gdXNpbmcgYC50ZXh0Q29udGVudC50cmltKClgIGZvciB0ZXN0XHJcblx0XHRcdFx0LmxvY2FsZUNvbXBhcmUoYi5jZWxsc1tjb2xdLnRleHRDb250ZW50LnRyaW0oKSlcclxuXHRcdFx0KTtcclxuXHR9KTtcclxuXHRmb3IoaSA9IDA7IGkgPCB0ci5sZW5ndGg7ICsraSkgdGIuYXBwZW5kQ2hpbGQodHJbaV0pOyAvLyBhcHBlbmQgZWFjaCByb3cgaW4gb3JkZXJcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVNvcnRhYmxlKHRhYmxlKSB7XHJcblx0dmFyIHRoID0gdGFibGUudEhlYWQsIGk7XHJcblx0dGggJiYgKHRoID0gdGgucm93c1swXSkgJiYgKHRoID0gdGguY2VsbHMpO1xyXG5cdGlmICh0aCkgaSA9IHRoLmxlbmd0aDtcclxuXHRlbHNlIHJldHVybjsgLy8gaWYgbm8gYDx0aGVhZD5gIHRoZW4gZG8gbm90aGluZ1xyXG5cdHdoaWxlICgtLWkgPj0gMCkgKGZ1bmN0aW9uIChpKSB7XHJcblx0XHR2YXIgZGlyID0gMTtcclxuXHRcdHRoW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge3NvcnRUYWJsZSh0YWJsZSwgaSwgKGRpciA9IDEgLSBkaXIpKX0pO1xyXG5cdH0oaSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlQWxsU29ydGFibGUocGFyZW50KSB7XHJcblx0cGFyZW50ID0gcGFyZW50IHx8IGRvY3VtZW50LmJvZHk7XHJcblx0dmFyIHQgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RhYmxlJyksIGkgPSB0Lmxlbmd0aDtcclxuXHR3aGlsZSAoLS1pID49IDApIG1ha2VTb3J0YWJsZSh0W2ldKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWNjZXB0U3R1ZGVudChzdHVkZW50X2lkKSB7XHJcblx0JC5hamF4KHtcclxuXHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0dXJsOiAnL3N1cGVydmlzb3IvYWNjZXB0U3R1ZGVudCcsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHN0dWRlbnRfaWQgOiBzdHVkZW50X2lkXHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlamVjdFN0dWRlbnQoc3R1ZGVudF9pZCwgcHJvamVjdF9pZCkge1xyXG5cdCQuYWpheCh7XHJcblx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdHVybDogJy9zdXBlcnZpc29yL3JlamVjdFN0dWRlbnQnLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRwcm9qZWN0X2lkIDogcHJvamVjdF9pZCxcclxuXHRcdFx0c3R1ZGVudF9pZCA6IHN0dWRlbnRfaWRcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuJCgnLnNob3ctbW9yZScpLm9uKCdjbGljaycsICBmdW5jdGlvbihlKSB7XHJcblx0JCh0aGlzKS5oaWRlKCk7XHJcblx0JCgnLnByb2plY3QnKS5hZGRDbGFzcygnZXhwYW5kJyk7XHJcbn0pO1xyXG5cclxuLy8gTWFrZXMgcHJpbWFyeSB0b3BpYyBmaXJzdFxyXG4kKFwiLnRvcGljcy1saXN0XCIpLnByZXBlbmQoJChcIi5maXJzdFwiKSk7XHJcblxyXG4vLyBTVVBFUlZJU09SXHJcbiQoJyNkZWxldGVQcm9qZWN0QnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLmRlbGV0ZVByb2plY3QoJCgnI3RpdGxlJykudmFsKCkpOyB9KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC4gQ29tcG9uZW50c1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDQuMSBNb2JpbGUgTWVudVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gICAqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBtb2JpbGUgbWVudS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4gICAqL1xyXG52YXIgTW9iaWxlTWVudSA9ICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsZW1lbnQpIHtcclxuXHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdHdpbmRvd1snTW9iaWxlTWVudSddID0gdGhpcztcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0dGhpcy51bmRlcmxheSA9ICQodGhpcy5TZWxlY3RvcnNfLlVOREVSTEFZKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdEhBTUJVUkdFUl9DT05UQUlORVI6ICcuaGFtYnVyZ2VyLWNvbnRhaW5lcicsXHJcblx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlZJU0lCTEUpO1xyXG5cclxuXHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5WSVNJQkxFKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmNsb3NlTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVklTSUJMRSk7XHJcblx0XHJcblx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5WSVNJQkxFKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIG1vYmlsZU1lbnUgPSB0aGlzO1xyXG5cdHRoaXMuYWN0aXZhdG9yLm9uKCdjbGljaycsIG1vYmlsZU1lbnUub3Blbk1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0dGhpcy51bmRlcmxheS5vbignY2xpY2snLCBtb2JpbGVNZW51LmNsb3NlTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uTU9CSUxFX01FTlUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLm1vYmlsZU1lbnUgPSBuZXcgTW9iaWxlTWVudSh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC4yIERpYWxvZyAvIE1vZGFsXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxudmFyIERpYWxvZyA9IGZ1bmN0aW9uIERpYWxvZyhlbGVtZW50KSB7XHJcblx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHR0aGlzLmRpYWxvZ05hbWUgPSAkKGVsZW1lbnQpLmRhdGEoJ2RpYWxvZycpO1xyXG5cdHRoaXMudW5kZXJsYXkgPSAkKCcudW5kZXJsYXknKTtcclxuXHR0aGlzLmhlYWRlciA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0hFQURFUik7XHJcblx0dGhpcy5jb250ZW50ID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfQ09OVEVOVCk7XHJcblx0dGhpcy5jb250ZW50LmJlZm9yZSh0aGlzLkh0bWxTbmlwcGV0c18uTE9BREVSKTtcclxuXHR0aGlzLmxvYWRlciA9ICQoZWxlbWVudCkuZmluZChcIi5sb2FkZXJcIik7XHJcblx0dGhpcy5pc0Nsb3NhYmxlID0gdHJ1ZTtcclxuXHR0aGlzLmFjdGl2YXRvckJ1dHRvbnMgPSBbXTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snRGlhbG9nJ10gPSBEaWFsb2c7XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0TE9BREVSOiAnPGRpdiBjbGFzcz1cImxvYWRlclwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4O3RvcDogMjUlO1wiPjwvZGl2PicsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdEFDVElWRTogJ2FjdGl2ZScsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RElBTE9HOiAnLmRpYWxvZycsXHJcblx0RElBTE9HX0hFQURFUjogJy5oZWFkZXInLFxyXG5cdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5zaG93TG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdHRoaXMuY29udGVudC5oaWRlKDApO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmxvYWRlci5oaWRlKDApO1xyXG5cdHRoaXMuY29udGVudC5zaG93KDApO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0dGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIiwgdGhpcy5kaWFsb2dOYW1lKTtcclxuXHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5oaWRlRGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLmlzQ2xvc2FibGUgJiYgdGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIikgPT0gdGhpcy5kaWFsb2dOYW1lKXtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdH1cclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0Ly8gTmVlZGVkIGZvciBjb250ZXh0XHJcblx0dmFyIGRpYWxvZyA9IHRoaXM7XHJcblxyXG5cdC8vIEZpbmQgYWN0aXZhdG9yIGJ1dHRvblxyXG5cdCQoJ2J1dHRvbicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHRoaXMpLmRhdGEoJ2FjdGl2YXRvcicpICYmICQodGhpcykuZGF0YSgnZGlhbG9nJykgPT0gZGlhbG9nLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHRkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucy5wdXNoKCQodGhpcykpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBBZGQgc2VwZXJhdG9yIGFmdGVyIGhlYWRlclxyXG5cdGRpYWxvZy5oZWFkZXIuYXBwZW5kKCc8aHI+Jyk7XHJcblxyXG5cdC8vIEZvciBkaXNhYmlsdHlcclxuXHRkaWFsb2cuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cclxuXHQvLyBTZXQgdW5kZXJsYXlcclxuXHRkaWFsb2cudW5kZXJsYXkub24oJ2NsaWNrJywgZGlhbG9nLmhpZGVEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHJcblx0dHJ5e1xyXG5cdFx0JChkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBkaWFsb2cuc2hvd0RpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cdFx0fSk7XHJcblx0fSBjYXRjaChlcnIpe1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIkRpYWxvZyBcIiArIGRpYWxvZy5kaWFsb2dOYW1lICsgXCIgaGFzIG5vIGFjdGl2YXRvciBidXR0b24uXCIpO1xyXG5cdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdH1cclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uRElBTE9HKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5kaWFsb2cgPSBuZXcgRGlhbG9nKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjMgRGF0YSBUYWJsZVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gICAqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4gICAqL1xyXG52YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdHRoaXMuZm9vdFJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rmb290IHRyJyk7XHJcblx0dGhpcy5yb3dzID0gJC5tZXJnZSh0aGlzLmJvZHlSb3dzLCB0aGlzLmZvb3RSb3dzKTtcclxuXHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHR0aGlzLm1hc3RlckNoZWNrYm94ID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5NQVNURVJfQ0hFQ0tCT1gpO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydEYXRhVGFibGUnXSA9IERhdGFUYWJsZTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0REFUQV9UQUJMRTogJy5kYXRhLXRhYmxlJyxcclxuXHRNQVNURVJfQ0hFQ0tCT1g6ICd0aGVhZCAubWFzdGVyLWNoZWNrYm94JyxcclxuXHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0SVNfU0VMRUNURUQ6ICcuaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRzZWxlY3RBbGxSb3dzOiBmdW5jdGlvbigpIHtcclxuXHRcdGlmKHRoaXMubWFzdGVyQ2hlY2tib3guaXMoJzpjaGVja2VkJykpe1xyXG5cdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdHRoaXMuY2hlY2tib3hlcy5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdHRoaXMuY2hlY2tib3hlcy5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2VsZWN0Um93OiBmdW5jdGlvbiAoY2hlY2tib3gsIHJvdykge1xyXG5cdFx0aWYgKHJvdykge1xyXG5cdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRyb3cuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBkYXRhVGFibGUgPSB0aGlzO1xyXG5cdHRoaXMubWFzdGVyQ2hlY2tib3gub24oJ2NoYW5nZScsICQucHJveHkodGhpcy5mdW5jdGlvbnMuc2VsZWN0QWxsUm93cywgZGF0YVRhYmxlKSk7XHJcblxyXG5cdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdCQodGhpcykub24oJ2NoYW5nZScsICQucHJveHkoZGF0YVRhYmxlLmZ1bmN0aW9ucy5zZWxlY3RSb3csIHRoaXMsICQodGhpcyksIGRhdGFUYWJsZS5ib2R5Um93cy5lcShpKSkpO1xyXG5cdH0pO1xyXG5cclxuXHQkKHRoaXMuaGVhZGVycykuZWFjaChmdW5jdGlvbihpKSB7XHJcblx0XHQkKHRoaXMpLmNzcyhcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XHJcblx0fSk7XHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uREFUQV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuZGF0YVRhYmxlID0gbmV3IERhdGFUYWJsZSh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC40IFByb2plY3QgVG9waWNzIFtTdXBlcnZpc29yXVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gICAqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBwcm9qZWN0IHRvcGljcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4gICAqL1xyXG52YXIgUHJvamVjdFRvcGljcyA9ICBmdW5jdGlvbiBQcm9qZWN0VG9waWNzKCkge307XHJcbndpbmRvd1snUHJvamVjdFRvcGljcyddID0gUHJvamVjdFRvcGljcztcclxuXHJcblByb2plY3RUb3BpY3MucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuUHJvamVjdFRvcGljcy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRBRERfVE9QSUNfSU5QVVQ6ICcjYWRkVG9waWNJbnB1dCcsXHJcblx0TkVXX1RPUElDX0lOUFVUX0NPTlRBSU5FUjogJyNuZXctdG9waWMtaW5wdXQtY29udGFpbmVyJyxcclxufTtcclxuXHJcblByb2plY3RUb3BpY3MucHJvdG90eXBlLktleXNfID0ge1xyXG5cdFNQQUNFOiAzMixcclxuXHRFTlRFUjogMTMsXHJcblx0Q09NTUE6IDQ1XHJcbn07XHJcblxyXG52YXIgcHJvamVjdFRvcGljcyA9IG5ldyBQcm9qZWN0VG9waWNzKCk7XHJcblxyXG5Qcm9qZWN0VG9waWNzLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0YWRkVG9waWNUb1Byb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljTmFtZSkge1xyXG5cdFx0JCgnLmxvYWRlcicpLnNob3coMCk7XHJcblx0XHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL2FkZFRvcGljXCI7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBPU1RcIixcclxuXHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0dG9waWNfbmFtZTogdG9waWNOYW1lLFxyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHQkKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5BRERfVE9QSUNfSU5QVVQpLnZhbCgnJyk7XHJcblx0XHRcdFx0JChcIi50b3BpY3MtbGlzdC5lZGl0IGxpLnRvcGljOmxhc3RcIikuYWZ0ZXIoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyBkYXRhW1wiaWRcIl0gKyAnXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ0b3BpYy1yZW1vdmVcIj5YPC9idXR0b24+PHAgY2xhc3M9XCJ0b3BpYy1uYW1lXCI+JyArIGRhdGFbXCJuYW1lXCJdICsgJzwvcD48L2xpPicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQkKCdib2R5JykuYXBwZW5kKGRhdGEpO1xyXG5cdFx0XHQkKCcubG9hZGVyJykuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZVRvcGljRnJvbVByb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljSWQpIHtcclxuXHRcdCQoJy5sb2FkZXInKS5zaG93KDApO1xyXG5cdFx0dmFyIGFqYXhVcmwgPSBcIi9wcm9qZWN0cy9yZW1vdmVUb3BpY1wiO1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJERUxFVEVcIixcclxuXHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0dG9waWNfaWQgOiB0b3BpY0lkLFxyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoJy50b3BpY3MtbGlzdC5lZGl0IGxpLnRvcGljJykuZWFjaChmdW5jdGlvbihpLCBvYmopIHtcclxuXHRcdFx0XHRcdGlmKCQodGhpcykuZGF0YSgndG9waWMtaWQnKSA9PSB0b3BpY0lkKXtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCgnLmxvYWRlcicpLmhpZGUoMCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHR1cGRhdGVQcm9qZWN0UHJpbWFyeVRvcGljOiBmdW5jdGlvbiAocHJvamVjdElkLCB0b3BpY0lkKSB7XHJcblx0XHQkKCcubG9hZGVyJykuc2hvdygwKTtcclxuXHRcdHZhciBhamF4VXJsID0gXCIvcHJvamVjdHMvdXBkYXRlUHJpbWFyeVRvcGljXCI7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHRvcGljX2lkIDogdG9waWNJZCxcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcjZWRpdFByb2plY3RGb3JtJykuYXR0cignZGF0YS1wcm9qZWN0LWlkJywgdG9waWNJZCk7XHJcblx0XHRcdFx0JCgnLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWMnKS5lYWNoKGZ1bmN0aW9uKGksIG9iaikge1xyXG5cdFx0XHRcdFx0aWYoJCh0aGlzKS5kYXRhKCd0b3BpYy1pZCcpID09IHRvcGljSWQpe1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwiZmlyc3RcIik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmlyc3RcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5sb2FkZXInKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSxcclxufTtcclxuXHJcbmNvbnN0IHN3YXBwYWJsZSA9IG5ldyBTd2FwcGFibGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvcGljcy1saXN0LmVkaXQnKSwge1xyXG4gIGRyYWdnYWJsZTogJy50b3BpYycsXHJcbn0pO1xyXG5cclxuc3dhcHBhYmxlLm9uKCdzd2FwcGFibGU6c3dhcHBlZCcsIGZ1bmN0aW9uKCl7XHJcblx0dmFyIHByb2plY3RJZCA9ICQoJyNlZGl0UHJvamVjdEZvcm0nKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0dmFyIG9yaWdpbmFsUHJpbWFyeVRvcGljSWQgPSAkKCcjZWRpdFByb2plY3RGb3JtJykuZGF0YSgncHJpbWFyeS10b3BpYy1pZCcpO1xyXG5cdHZhciB0b3BpY0lkID0gJChcIi50b3BpY3MtbGlzdC5lZGl0IGxpOmZpcnN0LWNoaWxkXCIpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0aWYodG9waWNJZCAhPSBvcmlnaW5hbFByaW1hcnlUb3BpY0lkKXtcclxuXHRcdHByb2plY3RUb3BpY3MuZnVuY3Rpb25zLnVwZGF0ZVByb2plY3RQcmltYXJ5VG9waWMocHJvamVjdElkLCB0b3BpY0lkKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gQWRkIG5ldyB0b3BpY1xyXG4kKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5BRERfVE9QSUNfSU5QVVQpLmtleXByZXNzKGZ1bmN0aW9uKGUpIHtcclxuXHRpZiAoZS53aGljaCA9PSBwcm9qZWN0VG9waWNzLktleXNfLkVOVEVSKSB7XHJcblx0XHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0cHJvamVjdFRvcGljcy5mdW5jdGlvbnMuYWRkVG9waWNUb1Byb2plY3QocHJvamVjdElkLCAkKHRoaXMpLnZhbCgpKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gUmVtb3ZlIHRvcGljXHJcbiQoJy50b3BpY3MtbGlzdC5lZGl0Jykub24oJ2NsaWNrJywgJy50b3BpYyAudG9waWMtcmVtb3ZlJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdHZhciB0b3BpY0lkID0gJCh0aGlzKS5wYXJlbnQoJ2xpJykuZGF0YSgndG9waWMtaWQnKTtcclxuXHRwcm9qZWN0VG9waWNzLmZ1bmN0aW9ucy5yZW1vdmVUb3BpY0Zyb21Qcm9qZWN0KHByb2plY3RJZCwgdG9waWNJZCk7XHJcbn0pO1xyXG5cclxuJChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uTkVXX1RPUElDX0lOUFVUX0NPTlRBSU5FUikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0JChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uQUREX1RPUElDX0lOUFVUKS5mb2N1cygpO1xyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICAgKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuICAgKi9cclxudmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG53aW5kb3dbJ0FqYXhGdW5jdGlvbnMnXSA9IEFqYXhGdW5jdGlvbnM7XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0U0VBUkNIX0lOUFVUOiAnLnNlYXJjaC1pbnB1dCcsXHJcblx0U0VBUkNIX0NPTlRBSU5FUjogJy5zZWFyY2gtY29udGFpbmVyJyxcclxuXHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0U0VBUkNIX0ZJTFRFUl9CVVRUT046ICcjc2VhcmNoLWZpbHRlci1idXR0b24nLFxyXG5cdExPR19JTl9ESUFMT0c6ICcubG9naW4uZGlhbG9nJyxcclxuXHRDSEFOR0VfQVVUSF9ESUFMT0c6ICcuY2hhbmdlLWF1dGguZGlhbG9nJ1xyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0U1BBQ0U6IDMyLFxyXG5cdEVOVEVSOiAxMyxcclxuXHRDT01NQTogNDVcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRkZWxldGVQcm9qZWN0OiBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcclxuXHRcdGlmKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIFxcXCJcIiArIHByb2plY3ROYW1lICtcIlxcXCI/XCIpKXtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR0eXBlOiBcIkRFTEVURVwiLFxyXG5cdFx0XHRcdHVybDogXCJlZGl0XCIsXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24odXJsKXtcclxuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuLi9cIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoZWxlbWVudCl7XHJcblx0JChlbGVtZW50KS5yZW1vdmVDbGFzcyAoZnVuY3Rpb24gKGluZGV4LCBjbGFzc05hbWUpIHtcclxuXHRcdHJldHVybiAoY2xhc3NOYW1lLm1hdGNoICgvXFxic2hhZG93XFwtXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1cycsICBmdW5jdGlvbihlKXtcclxuXHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxufSk7XHJcblxyXG4vLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzIG91dFxyXG4kKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LTJkcCcpO1xyXG59KTtcclxuXHJcbi8vIFNFQVJDSFxyXG4kKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9CVVRUT04pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdHZhciBmaWx0ZXJCdXR0b24gPSAkKHRoaXMpO1xyXG5cclxuXHRpZihjb250YWluZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRmaWx0ZXJCdXR0b24ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdH0gZWxzZXtcclxuXHRcdGNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRmaWx0ZXJCdXR0b24uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDQuNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAgICogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiAgICovXHJcbnZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5vcmlnaW5hbE5hbWUgPSAkKGVsZW1lbnQpLmRhdGEoXCJvcmlnaW5hbC10b3BpYy1uYW1lXCIpO1xyXG5cdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHR0aGlzLnRvcGljTmFtZUlucHV0ID0gJChlbGVtZW50KS5maW5kKCdpbnB1dCcpO1xyXG5cdHRoaXMuZWRpdEJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmVkaXQtdG9waWMnKTtcclxuXHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7fTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRFRElUX1RPUElDOiAnLmVkaXQtdG9waWMtbGlzdCAudG9waWMnLFxyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRERUxFVEVfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0TkVXX1RPUElDOiAnL3RvcGljcy8nXHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRlZGl0VG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHJlc3BvbnNlID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIHRvcGljIG5hbWUgZnJvbSBcXFwiXCIgKyAgdGhpcy5vcmlnaW5hbE5hbWUgK1wiXFxcIiB0byBcXFwiXCIgKyAgdGhpcy50b3BpY05hbWVJbnB1dC52YWwoKSArXCJcXFwiP1wiKTtcclxuXHJcblx0XHRpZihyZXNwb25zZSl7XHJcblx0XHRcdHRoaXMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0dGhpcy5lZGl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHRcdFx0JCgnLmxvYWRlcicsIHRoaXMuZWxlbWVudCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHR1cmw6IHRoaXMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdGNvbnRleHQ6IHRoaXMsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0dG9waWNfaWQ6IHRoaXMudG9waWNJZCxcclxuXHRcdFx0XHRcdHRvcGljX25hbWUgOiB0aGlzLnRvcGljTmFtZUlucHV0LnZhbCgpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHRoaXMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0dGhpcy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHR0aGlzLm9yaWdpbmFsTmFtZSA9IHRoaXMudG9waWNOYW1lSW5wdXQudmFsKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy50b3BpY05hbWVJbnB1dC52YWwodGhpcy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGRlbGV0ZVRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciByZXNwb25zZSA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSB0b3BpYyBcXFwiXCIgKyAgdGhpcy5vcmlnaW5hbE5hbWUgK1wiXFxcIj9cIik7XHJcblx0XHRpZihyZXNwb25zZSl7XHJcblx0XHRcdHRoaXMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxyXG5cdFx0XHRcdHVybDogdGhpcy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0Y29udGV4dDogdGhpcyxcclxuXHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHR0b3BpY19pZDogdGhpcy50b3BpY0lkLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHRoaXMuZWxlbWVudC5oaWRlKDgwMCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZUVkaXRUb3BpY0RPTTogZnVuY3Rpb24odG9waWNJZCwgb3JpZ2luYWxOYW1lKXtcclxuXHRcdCQoXCIuZWRpdC10b3BpYy1saXN0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyB0b3BpY0lkICsnXCIgZGF0YS1vcmlnaW5hbC10b3BpYy1uYW1lPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxpbnB1dCBzcGVsbGNoZWNrPVwidHJ1ZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGVkaXQtdG9waWNcIiB0eXBlPVwic3VibWl0XCI+RWRpdDwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidXR0b24gZGVsZXRlLXRvcGljIGJ1dHRvbi0tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC9saT4nKTtcclxuXHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdH1cclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgZWRpdFRvcGljID0gdGhpcztcclxuXHR0aGlzLmVkaXRCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5lZGl0VG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdHRoaXMuZGVsZXRlQnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZGVsZXRlVG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLkVESVRfVE9QSUMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLkVkaXRUb3BpYyA9IG5ldyBFZGl0VG9waWModGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDUuIE9USEVSXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLy8gQWNjZXB0IFN0dWRlbnRcclxuJCgnLmFjY2VwdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdGFjY2VwdFN0dWRlbnQoJCh0aGlzKS5kYXRhKCdzdHVkZW50X2lkJykpO1xyXG59KTtcclxuXHJcbi8vIFJlamVjdCBTdHVkZW50XHJcbiQoJy5yZWplY3QnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRyZWplY3RTdHVkZW50KCQodGhpcykuZGF0YSgnc3R1ZGVudF9pZCcpLCAkKHRoaXMpLmRhdGEoJ3Byb2plY3RfaWQnKSk7XHJcbn0pO1xyXG5cclxuJChcIiNsb2dpbkZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0JCgnLmhlbHAtYmxvY2snLCAnI2xvZ2luRm9ybScpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0dHlwZTonUE9TVCcsXHJcblx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5DSEFOR0VfQVVUSF9ESUFMT0cpWzBdLmRpYWxvZy5pc0Nsb3NhYmxlID0gZmFsc2U7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5DSEFOR0VfQVVUSF9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS50ZXh0KGRhdGFbXCJyZXNwb25zZUpTT05cIl1bXCJlcnJvcnNcIl1bXCJ1c2VybmFtZVwiXVswXSk7XHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdCQoJy5mb3JtLWZpZWxkJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4kKCcjbmV3LXRvcGljLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHJcblx0JCgnLmxvYWRlcicsIHN1Ym1pdEJ1dHRvbikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQT1NUJyxcclxuXHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zLmNyZWF0ZUVkaXRUb3BpY0RPTShkYXRhW1wiaWRcIl0sIGRhdGFbXCJuYW1lXCJdKTtcclxuXHRcdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAoKSB7fVxyXG5cdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJCgnI3N0dWRlbnQtZWRpdC1saXN0JykuZmluZCgnLmNoZWNrYm94IGlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBzdGF0dXMgPSAkKHRoaXMpLnBhcmVudHMoKS5lcSgzKS5kYXRhKCdzdGF0dXMnKTtcclxuXHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcjc3R1ZGVudC1lZGl0LWxpc3QuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHR2YXIgZW1haWxCdXR0b25zZWxlY3RvciA9IFwiLmVtYWlsLXNlbGVjdGVkLlwiICsgc3RhdHVzO1xyXG5cdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cdFx0XHRlbWFpbFN0cmluZyArPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxufSk7XHJcblxyXG4kKCcuZWRpdC1zdHVkZW50LWxpc3QgLmVtYWlsLXNlbGVjdGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicpe1xyXG5cdFx0YWxlcnQoXCJZb3UgaGF2ZW4ndCBzZWxlY3RlZCBhbnlvbmUuXCIpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBVc2VkIGZvciB0cmFuc2FjdGlvbnNcclxuJCgnI3Nob3ctcmF3LXRhYmxlLWRhdGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRpZigkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSl7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmhpZGUoKTtcclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuc2hvdygpO1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gTkVXIFVTRVJcclxuLy8gcHV0IHRoaXMgc3R1ZmYgaW4gYW4gYXJyYXlcclxuJCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcbiQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0aWYoJCgnI3N0dWRlbnQtb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjYWRtaW4tb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gU1RSSU5HU1xyXG4kKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRpZigkKCcjc3R1ZGVudC1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNhZG1pbi1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDYuIFNlY29uZCBNYXJrZXJcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbnZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcblxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbWFya2VyID0gdGhpcztcclxuXHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxuXHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxufVxyXG5cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50ID0gZnVuY3Rpb24oc3R1ZGVudFJvd0RPTSwgbWFya2VyKXtcclxuXHR2YXIgcm93ID0gJChzdHVkZW50Um93RE9NKTtcclxuXHRcdFxyXG5cdG1hcmtlci51bnNlbGVjdEFsbChtYXJrZXIpO1xyXG5cdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHRoaXMpLmRhdGEoJ21hcmtlci1pZCcpID09IHJvdy5kYXRhKCdzdXBlcnZpc29yLWlkJykpe1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFx0XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvciA9IGZ1bmN0aW9uKHN1cGVydmlzb3JSb3dET00sIG1hcmtlcil7XHJcblx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdGlmKHJvdy5hdHRyKCdkaXNhYmxlZCcpKXtyZXR1cm47fVxyXG5cclxuXHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ICE9IG51bGwpe1xyXG5cdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gcm93O1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nKFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N1cGVydmlzb3ItbmFtZScpLCBcclxuXHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksIFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKSk7XHJcblx0fVxyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnJlc2V0VmlldyA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihzdHVkZW50TmFtZSwgc3VwZXJ2aXNvck5hbWUsIG1hcmtlck5hbWUsIHByb2plY3Qpe1xyXG5cdCQoXCIjc3R1ZGVudC1uYW1lXCIpLnRleHQoc3R1ZGVudE5hbWUpO1xyXG5cdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdCQoXCIjbWFya2VyLW5hbWVcIikudGV4dChtYXJrZXJOYW1lKTtcclxuXHJcblx0JChcIiNwcm9qZWN0LXRpdGxlXCIpLmh0bWwoJzxiPlRpdGxlOiA8L2I+JyArIHByb2plY3RbXCJ0aXRsZVwiXSk7XHJcblx0JChcIiNwcm9qZWN0LWRlc2NyaXB0aW9uXCIpLmh0bWwoJzxiPkRlc2NyaXB0aW9uOiA8L2I+JyArIHByb2plY3RbXCJkZXNjcmlwdGlvblwiXSk7XHJcblxyXG5cdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG59XHJcblxyXG4kKCcjc3VibWl0QXNzaWduTWFya2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgbWFya2VyID0gd2luZG93WydNYXJrZXInXTtcclxuXHJcblx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdHJldHVybjtcclxuXHR9O1xyXG5cclxuXHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0dmFyIHByb2plY3RJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpW1wiaWRcIl07XHJcblx0dmFyIG1hcmtlcklkID0gbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvci5kYXRhKCdtYXJrZXItaWQnKTtcclxuXHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL2Fzc2lnbk1hcmtlclwiO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWQsXHJcblx0XHRcdG1hcmtlcl9pZDogbWFya2VySWRcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcblx0XHR9LFxyXG5cdFx0Ly8gQWRkIGZhaWxcclxuXHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQucmVtb3ZlKCk7XHJcblx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDYuIEluaXRpYWxpc2UgRXZlcnl0aGluZ1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5EaWFsb2cucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5NYXJrZXIucHJvdG90eXBlLmluaXRBbGwoKTtcclxubWFrZUFsbFNvcnRhYmxlKCk7XHJcblxyXG4vLyAub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuLy8gXHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuLy8gXHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuLy8gXHQkKHRoaXMuY2hlY2tib3hlcykuZWFjaChmdW5jdGlvbihpKSB7XHJcbi8vIFx0XHQkKHRoaXMpLm9uKCdjaGFuZ2UnLCAkLnByb3h5KGRhdGFUYWJsZS5mdW5jdGlvbnMuc2VsZWN0Um93LCB0aGlzLCAkKHRoaXMpLCBkYXRhVGFibGUuYm9keVJvd3MuZXEoaSkpKTtcclxuLy8gXHR9KTtcclxuXHJcbi8vIFx0JCh0aGlzLmhlYWRlcnMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG4vLyBcdFx0JCh0aGlzKS5jc3MoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpO1xyXG4vLyBcdH0pO1xyXG4vLyB9KTtcclxuXHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiRHJhZ2dhYmxlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRyYWdnYWJsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEcmFnZ2FibGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2Myk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oNjkpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbi8qKiovIH0pLFxuLyogMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MCk7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oNjgpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNyk7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQWxsIGV2ZW50cyBmaXJlZCBieSBkcmFnZ2FibGUgaW5oZXJpdCB0aGlzIGNsYXNzLiBZb3UgY2FuIGNhbGwgYGNhbmNlbCgpYCB0b1xuICogY2FuY2VsIGEgc3BlY2lmaWMgZXZlbnQgb3IgeW91IGNhbiBjaGVjayBpZiBhbiBldmVudCBoYXMgYmVlbiBjYW5jZWxlZCBieVxuICogY2FsbGluZyBgY2FuY2VsZWQoKWAuXG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzc1xuICovXG52YXIgQWJzdHJhY3RFdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQWJzdHJhY3RFdmVudChkYXRhKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQWJzdHJhY3RFdmVudCk7XG5cbiAgICB0aGlzLl9jYW5jZWxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShBYnN0cmFjdEV2ZW50LCBbe1xuICAgIGtleTogJ2NhbmNlbCcsXG5cblxuICAgIC8qKlxuICAgICAqIENhbmNlbHMgYSBzcGVjaWZpYyBldmVudFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAvLyBXZSBzaG91bGQgYmUgZGVjbGFyaW5nIGlmIGV2ZW50cyBhcmUgY2FuY2VsYWJsZVxuICAgICAgLy8gaWYgKCF0aGlzLmNhbmNlbGFibGUpIHtcbiAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGV2ZW50IGlzIG5vdCBjYW5jZWxhYmxlJyk7XG4gICAgICAvLyB9XG4gICAgICB0aGlzLl9jYW5jZWxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgZXZlbnQgaGFzIGJlZW4gY2FuY2VsZWRcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjYW5jZWxlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhbmNlbGVkKCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5fY2FuY2VsZWQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3R5cGUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudHlwZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjYW5jZWxhYmxlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNhbmNlbGFibGU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBBYnN0cmFjdEV2ZW50O1xufSgpO1xuXG5BYnN0cmFjdEV2ZW50LnR5cGUgPSAnZXZlbnQnO1xuQWJzdHJhY3RFdmVudC5jYW5jZWxhYmxlID0gZmFsc2U7XG5leHBvcnRzLmRlZmF1bHQgPSBBYnN0cmFjdEV2ZW50O1xuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4vKioqLyB9KSxcbi8qIDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhX193ZWJwYWNrX3JlcXVpcmVfXygyMCkoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG4vKioqLyB9KSxcbi8qIDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cbi8qKiovIH0pLFxuLyogOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgYW5PYmplY3QgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuICAsIElFOF9ET01fREVGSU5FID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSlcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IF9fd2VicGFja19yZXF1aXJlX18oNikgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuLyoqKi8gfSksXG4vKiA5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgzKVxuICAsIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDEwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuLyoqKi8gfSksXG4vKiAxMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZFAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOClcbiAgLCBjcmVhdGVEZXNjID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMik7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNikgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG4vKioqLyB9KSxcbi8qIDEyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBzdG9yZSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMikoJ3drcycpXG4gICwgdWlkICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpXG4gICwgU3ltYm9sICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNSkuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG5cbi8qKiovIH0pLFxuLyogMTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2xvc2VzdCA9IGNsb3Nlc3Q7XG5leHBvcnRzLnNjcm9sbCA9IHNjcm9sbDtcbi8qKiBAbW9kdWxlIHV0aWxzICovXG5cbmZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBjb25kaXRpb25GbihjdXJyZW50RWxlbWVudCkge1xuICAgIGlmICghY3VycmVudEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBtYXRjaEZ1bmN0aW9uID0gRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgcmV0dXJuIG1hdGNoRnVuY3Rpb24uY2FsbChjdXJyZW50RWxlbWVudCwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2VsZWN0b3IoY3VycmVudEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50ID0gZWxlbWVudDtcblxuICBkbyB7XG4gICAgY3VycmVudCA9IGN1cnJlbnQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQgfHwgY3VycmVudC5jb3JyZXNwb25kaW5nRWxlbWVudCB8fCBjdXJyZW50O1xuICAgIGlmIChjb25kaXRpb25GbihjdXJyZW50KSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gIH0gd2hpbGUgKGN1cnJlbnQgIT09IGRvY3VtZW50LmJvZHkgJiYgY3VycmVudCAhPT0gZG9jdW1lbnQpO1xuXG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgc2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIHNjcm9sbChlbGVtZW50LCBfcmVmKSB7XG4gIHZhciBjbGllbnRYID0gX3JlZi5jbGllbnRYLFxuICAgICAgY2xpZW50WSA9IF9yZWYuY2xpZW50WSxcbiAgICAgIHNwZWVkID0gX3JlZi5zcGVlZCxcbiAgICAgIHNlbnNpdGl2aXR5ID0gX3JlZi5zZW5zaXRpdml0eTtcblxuICBpZiAoc2Nyb2xsQW5pbWF0aW9uRnJhbWUpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShzY3JvbGxBbmltYXRpb25GcmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxGbigpIHtcbiAgICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIG9mZnNldFkgPSAoTWF0aC5hYnMocmVjdC5ib3R0b20gLSBjbGllbnRZKSA8PSBzZW5zaXRpdml0eSkgLSAoTWF0aC5hYnMocmVjdC50b3AgLSBjbGllbnRZKSA8PSBzZW5zaXRpdml0eSk7XG4gICAgdmFyIG9mZnNldFggPSAoTWF0aC5hYnMocmVjdC5yaWdodCAtIGNsaWVudFgpIDw9IHNlbnNpdGl2aXR5KSAtIChNYXRoLmFicyhyZWN0LmxlZnQgLSBjbGllbnRYKSA8PSBzZW5zaXRpdml0eSk7XG4gICAgZWxlbWVudC5zY3JvbGxUb3AgKz0gb2Zmc2V0WSAqIHNwZWVkO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArPSBvZmZzZXRYICogc3BlZWQ7XG4gICAgc2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsRm4pO1xuICB9XG5cbiAgc2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsRm4pO1xufVxuXG4vKioqLyB9KSxcbi8qIDE0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDE1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG4gICwgY29yZSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMClcbiAgLCBjdHggICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KVxuICAsIGhpZGUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cbi8qKiovIH0pLFxuLyogMTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG4vKioqLyB9KSxcbi8qIDE3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xuXG52YXIgX2FjY2Vzc2liaWxpdHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUzKTtcblxudmFyIF9hY2Nlc3NpYmlsaXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FjY2Vzc2liaWxpdHkpO1xuXG52YXIgX21pcnJvciA9IF9fd2VicGFja19yZXF1aXJlX18oNTQpO1xuXG52YXIgX21pcnJvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXJyb3IpO1xuXG52YXIgX2NvbGxpZGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUxKTtcblxudmFyIF9jb2xsaWRhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbGxpZGFibGUpO1xuXG52YXIgX3NuYXBwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpO1xuXG52YXIgX3NuYXBwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zbmFwcGFibGUpO1xuXG52YXIgX2RyYWdTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY0KTtcblxudmFyIF9kcmFnU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYWdTZW5zb3IpO1xuXG52YXIgX21vdXNlU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Nik7XG5cbnZhciBfbW91c2VTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW91c2VTZW5zb3IpO1xuXG52YXIgX3RvdWNoU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Nyk7XG5cbnZhciBfdG91Y2hTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG91Y2hTZW5zb3IpO1xuXG52YXIgX2ZvcmNlVG91Y2hTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY1KTtcblxudmFyIF9mb3JjZVRvdWNoU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZvcmNlVG91Y2hTZW5zb3IpO1xuXG52YXIgX2RyYWdnYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Nyk7XG5cbnZhciBfZHJhZ0V2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Nik7XG5cbnZhciBfbWlycm9yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGRlZmF1bHRzID0ge1xuICBkcmFnZ2FibGU6ICcuZHJhZ2dhYmxlLXNvdXJjZScsXG4gIGhhbmRsZTogbnVsbCxcbiAgZGVsYXk6IDAsXG4gIHBsYWNlZFRpbWVvdXQ6IDgwMCxcbiAgbmF0aXZlOiBmYWxzZSxcbiAgcGx1Z2luczogW19taXJyb3IyLmRlZmF1bHQsIF9hY2Nlc3NpYmlsaXR5Mi5kZWZhdWx0XSxcbiAgY2xhc3Nlczoge1xuICAgICdjb250YWluZXI6ZHJhZ2dpbmcnOiAnZHJhZ2dhYmxlLWNvbnRhaW5lci0taXMtZHJhZ2dpbmcnLFxuICAgICdzb3VyY2U6ZHJhZ2dpbmcnOiAnZHJhZ2dhYmxlLXNvdXJjZS0taXMtZHJhZ2dpbmcnLFxuICAgICdzb3VyY2U6cGxhY2VkJzogJ2RyYWdnYWJsZS1zb3VyY2UtLXBsYWNlZCcsXG4gICAgJ2NvbnRhaW5lcjpwbGFjZWQnOiAnZHJhZ2dhYmxlLWNvbnRhaW5lci0tcGxhY2VkJyxcbiAgICAnYm9keTpkcmFnZ2luZyc6ICdkcmFnZ2FibGUtLWlzLWRyYWdnaW5nJyxcbiAgICAnZHJhZ2dhYmxlOm92ZXInOiAnZHJhZ2dhYmxlLS1vdmVyJyxcbiAgICAnY29udGFpbmVyOm92ZXInOiAnZHJhZ2dhYmxlLWNvbnRhaW5lci0tb3ZlcicsXG4gICAgbWlycm9yOiAnZHJhZ2dhYmxlLW1pcnJvcidcbiAgfVxufTtcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb3JlIGRyYWdnYWJsZSBsaWJyYXJ5IHRoYXQgZG9lcyB0aGUgaGVhdnkgbGlmdGluZ1xuICogQG1vZHVsZSBEcmFnZ2FibGVcbiAqL1xuXG52YXIgRHJhZ2dhYmxlID0gZnVuY3Rpb24gKCkge1xuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnZ2FibGUsIG51bGwsIFt7XG4gICAga2V5OiAnUGx1Z2lucycsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4geyBBY2Nlc3NpYmlsaXR5OiBfYWNjZXNzaWJpbGl0eTIuZGVmYXVsdCwgTWlycm9yOiBfbWlycm9yMi5kZWZhdWx0IH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnQmVoYXZpb3VyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB7IENvbGxpZGFibGU6IF9jb2xsaWRhYmxlMi5kZWZhdWx0LCBTbmFwcGFibGU6IF9zbmFwcGFibGUyLmRlZmF1bHQgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29uc3RydWN0b3IuXG4gICAgICogQGNvbnN0cnVjdHMgRHJhZ2dhYmxlXG4gICAgICogQHBhcmFtIHtBcnJheXxOb2RlTGlzdH0gY29udGFpbmVycyAtIERyYWdnYWJsZSBjb250YWluZXJzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBkcmFnZ2FibGVcbiAgICAgKi9cblxuICB9XSk7XG5cbiAgZnVuY3Rpb24gRHJhZ2dhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ2dhYmxlKTtcblxuICAgIHRoaXMuY29udGFpbmVycyA9IGNvbnRhaW5lcnM7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMuYWN0aXZlU2Vuc29ycyA9IFtdO1xuICAgIHRoaXMuYWN0aXZlUGx1Z2lucyA9IFtdO1xuICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5kcmFnU3RhcnQgPSB0aGlzLmRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZHJhZ01vdmUgPSB0aGlzLmRyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kcmFnU3RvcCA9IHRoaXMuZHJhZ1N0b3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRyYWdQcmVzc3VyZSA9IHRoaXMuZHJhZ1ByZXNzdXJlLmJpbmQodGhpcyk7XG5cbiAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnOnN0YXJ0JywgdGhpcy5kcmFnU3RhcnQsIHRydWUpO1xuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzptb3ZlJywgdGhpcy5kcmFnTW92ZSwgdHJ1ZSk7XG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnOnN0b3AnLCB0aGlzLmRyYWdTdG9wLCB0cnVlKTtcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6cHJlc3N1cmUnLCB0aGlzLmRyYWdQcmVzc3VyZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5vcHRpb25zLnBsdWdpbnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgdmFyIFBsdWdpbiA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICB2YXIgcGx1Z2luID0gbmV3IFBsdWdpbih0aGlzKTtcbiAgICAgICAgcGx1Z2luLmF0dGFjaCgpO1xuICAgICAgICB0aGlzLmFjdGl2ZVBsdWdpbnMucHVzaChwbHVnaW4pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSB0aGlzLnNlbnNvcnMoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMzsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IChfc3RlcDMgPSBfaXRlcmF0b3IzLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZSkge1xuICAgICAgICB2YXIgU2Vuc29yID0gX3N0ZXAzLnZhbHVlO1xuXG4gICAgICAgIHZhciBzZW5zb3IgPSBuZXcgU2Vuc29yKHRoaXMuY29udGFpbmVycywgb3B0aW9ucyk7XG4gICAgICAgIHNlbnNvci5hdHRhY2goKTtcbiAgICAgICAgdGhpcy5hY3RpdmVTZW5zb3JzLnB1c2goc2Vuc29yKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICBfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yMy5yZXR1cm4pIHtcbiAgICAgICAgICBfaXRlcmF0b3IzLnJldHVybigpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQgPSBuZXcgX2RyYWdnYWJsZUV2ZW50LkRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQoe1xuICAgICAgZHJhZ2dhYmxlOiB0aGlzXG4gICAgfSk7XG5cbiAgICB0aGlzLnRyaWdnZXJFdmVudChkcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBEcmFnZ2FibGUgaW5zdGFuY2UuIFRoaXMgcmVtb3ZlcyBhbGwgaW50ZXJuYWwgZXZlbnQgbGlzdGVuZXJzIGFuZFxuICAgKiBkZWFjdGl2YXRlcyBzZW5zb3JzIGFuZCBwbHVnaW5zXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ2dhYmxlLCBbe1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjQgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDQ7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSAoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6c3RhcnQnLCB0aGlzLmRyYWdTdGFydCwgdHJ1ZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6bW92ZScsIHRoaXMuZHJhZ01vdmUsIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOnN0b3AnLCB0aGlzLmRyYWdTdG9wLCB0cnVlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZzpwcmVzc3VyZScsIHRoaXMuZHJhZ1ByZXNzdXJlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yNCA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCAmJiBfaXRlcmF0b3I0LnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNC5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNCkge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gbmV3IF9kcmFnZ2FibGVFdmVudC5EcmFnZ2FibGVEZXN0cm95RXZlbnQoe1xuICAgICAgICBkcmFnZ2FibGU6IHRoaXNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXJFdmVudChkcmFnZ2FibGVEZXN0cm95RXZlbnQpO1xuXG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNSA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yNSA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNSA9IHRoaXMuYWN0aXZlUGx1Z2luc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwNTsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IChfc3RlcDUgPSBfaXRlcmF0b3I1Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBhY3RpdmVQbHVnaW4gPSBfc3RlcDUudmFsdWU7XG5cbiAgICAgICAgICBhY3RpdmVQbHVnaW4uZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjUgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjUgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgJiYgX2l0ZXJhdG9yNS5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjUucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjUpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjYgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjYgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjYgPSB0aGlzLmFjdGl2ZVNlbnNvcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDY7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgPSAoX3N0ZXA2ID0gX2l0ZXJhdG9yNi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgYWN0aXZlU2Vuc29yID0gX3N0ZXA2LnZhbHVlO1xuXG4gICAgICAgICAgYWN0aXZlU2Vuc29yLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I2ID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3I2ID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ICYmIF9pdGVyYXRvcjYucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I2LnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I2KSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBsaXN0ZW5lciBmb3IgZHJhZ2dhYmxlIGV2ZW50c1xuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIChkcmFnRXZlbnQpID0+IGRyYWdFdmVudC5jYW5jZWwoKSk7XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghdGhpcy5jYWxsYmFja3NbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3NbdHlwZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYWxsYmFja3NbdHlwZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGxpc3RlbmVyIGZyb20gZHJhZ2dhYmxlXG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIGhhbmRsZXJGdW5jdGlvbik7XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgaWYgKCF0aGlzLmNhbGxiYWNrc1t0eXBlXSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBjb3B5ID0gdGhpcy5jYWxsYmFja3NbdHlwZV0uc2xpY2UoMCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrID09PSBjb3B5W2ldKSB7XG4gICAgICAgICAgdGhpcy5jYWxsYmFja3NbdHlwZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcih0eXBlKSB7XG4gICAgICBpZiAoIXRoaXMuY2FsbGJhY2tzW3R5cGVdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy5jYWxsYmFja3NbdHlwZV0ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3NbdHlwZV1baV07XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZlIHNlbnNvcnNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gc2Vuc29yc1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZW5zb3JzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2Vuc29ycygpIHtcbiAgICAgIHJldHVybiBbX3RvdWNoU2Vuc29yMi5kZWZhdWx0LCBfZm9yY2VUb3VjaFNlbnNvcjIuZGVmYXVsdCwgdGhpcy5vcHRpb25zLm5hdGl2ZSA/IF9kcmFnU2Vuc29yMi5kZWZhdWx0IDogX21vdXNlU2Vuc29yMi5kZWZhdWx0XTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkcmFnU3RhcnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciB0YXJnZXQgPSBzZW5zb3JFdmVudC50YXJnZXQsXG4gICAgICAgICAgY29udGFpbmVyID0gc2Vuc29yRXZlbnQuY29udGFpbmVyLFxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQgPSBzZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50O1xuXG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFuZGxlICYmIHRhcmdldCAmJiAhKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIHRoaXMub3B0aW9ucy5oYW5kbGUpKSB7XG4gICAgICAgIHNlbnNvckV2ZW50LmNhbmNlbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEZpbmQgZHJhZ2dhYmxlIHNvdXJjZSBlbGVtZW50XG4gICAgICB0aGlzLnNvdXJjZSA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgICBpZiAoIXRoaXMuc291cmNlKSB7XG4gICAgICAgIHNlbnNvckV2ZW50LmNhbmNlbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICBpZiAoIWlzRHJhZ0V2ZW50KG9yaWdpbmFsRXZlbnQpKSB7XG4gICAgICAgIHZhciBhcHBlbmRhYmxlQ29udGFpbmVyID0gdGhpcy5nZXRBcHBlbmRhYmxlQ29udGFpbmVyKHsgc291cmNlOiB0aGlzLnNvdXJjZSB9KTtcbiAgICAgICAgdGhpcy5taXJyb3IgPSB0aGlzLnNvdXJjZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgdmFyIG1pcnJvckNyZWF0ZWRFdmVudCA9IG5ldyBfbWlycm9yRXZlbnQuTWlycm9yQ3JlYXRlZEV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBtaXJyb3JBdHRhY2hlZEV2ZW50ID0gbmV3IF9taXJyb3JFdmVudC5NaXJyb3JBdHRhY2hlZEV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG1pcnJvckNyZWF0ZWRFdmVudCk7XG4gICAgICAgIGFwcGVuZGFibGVDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5taXJyb3IpO1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChtaXJyb3JBdHRhY2hlZEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zb3VyY2UuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOmRyYWdnaW5nJykpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdib2R5OmRyYWdnaW5nJykpO1xuXG4gICAgICBpZiAodGhpcy5taXJyb3IpIHtcbiAgICAgICAgdmFyIG1pcnJvck1vdmVFdmVudCA9IG5ldyBfbWlycm9yRXZlbnQuTWlycm9yTW92ZUV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG1pcnJvck1vdmVFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZpbmQgdGhlIGNsb3Nlc3Qgc2Nyb2xsYWJsZSBwYXJlbnRcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZVBhcmVudCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoY29udGFpbmVyLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHQgPCBlbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZHJhZ0V2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ1N0YXJ0RXZlbnQoe1xuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ0V2ZW50KTtcblxuICAgICAgaWYgKCFkcmFnRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1pcnJvcikge1xuICAgICAgICB0aGlzLm1pcnJvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubWlycm9yKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOmRyYWdnaW5nJykpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdib2R5OmRyYWdnaW5nJykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3RyaWdnZXJFdmVudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXJFdmVudChldmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlcihldmVudC50eXBlLCBldmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZHJhZ01vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmFnTW92ZShldmVudCkge1xuICAgICAgdmFyIHNlbnNvckV2ZW50ID0gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHNlbnNvckV2ZW50LmNvbnRhaW5lcjtcblxuICAgICAgdmFyIHRhcmdldCA9IHNlbnNvckV2ZW50LnRhcmdldDtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX2RyYWdFdmVudC5EcmFnTW92ZUV2ZW50KHtcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGRyYWdNb3ZlRXZlbnQpO1xuXG4gICAgICBpZiAoZHJhZ01vdmVFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHNlbnNvckV2ZW50LmNhbmNlbCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taXJyb3IgJiYgIWRyYWdNb3ZlRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICB2YXIgbWlycm9yTW92ZUV2ZW50ID0gbmV3IF9taXJyb3JFdmVudC5NaXJyb3JNb3ZlRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobWlycm9yTW92ZUV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0ID0gKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuICAgICAgdmFyIG92ZXJDb250YWluZXIgPSBzZW5zb3JFdmVudC5vdmVyQ29udGFpbmVyIHx8IHRoaXMuY2xvc2VzdENvbnRhaW5lcihzZW5zb3JFdmVudC50YXJnZXQpO1xuICAgICAgdmFyIGlzTGVhdmluZ0NvbnRhaW5lciA9IHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgJiYgb3ZlckNvbnRhaW5lciAhPT0gdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lcjtcbiAgICAgIHZhciBpc0xlYXZpbmdEcmFnZ2FibGUgPSB0aGlzLmN1cnJlbnRPdmVyICYmIHRhcmdldCAhPT0gdGhpcy5jdXJyZW50T3ZlcjtcbiAgICAgIHZhciBpc092ZXJDb250YWluZXIgPSBvdmVyQ29udGFpbmVyICYmIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgIT09IG92ZXJDb250YWluZXI7XG4gICAgICB2YXIgaXNPdmVyRHJhZ2dhYmxlID0gdGFyZ2V0ICYmIHRoaXMuY3VycmVudE92ZXIgIT09IHRhcmdldDtcblxuICAgICAgaWYgKGlzTGVhdmluZ0RyYWdnYWJsZSkge1xuICAgICAgICB2YXIgZHJhZ091dEV2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ091dEV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICAgIG92ZXI6IHRoaXMuY3VycmVudE92ZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ091dEV2ZW50KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2RyYWdnYWJsZTpvdmVyJykpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTGVhdmluZ0NvbnRhaW5lcikge1xuICAgICAgICB2YXIgZHJhZ091dENvbnRhaW5lckV2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ091dENvbnRhaW5lckV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICAgIG92ZXJDb250YWluZXI6IHRoaXMub3ZlckNvbnRhaW5lclxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChkcmFnT3V0Q29udGFpbmVyRXZlbnQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOm92ZXInKSk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNPdmVyQ29udGFpbmVyKSB7XG4gICAgICAgIG92ZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOm92ZXInKSk7XG5cbiAgICAgICAgdmFyIGRyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBuZXcgX2RyYWdFdmVudC5EcmFnT3ZlckNvbnRhaW5lckV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICAgIG92ZXJDb250YWluZXI6IG92ZXJDb250YWluZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ092ZXJDb250YWluZXJFdmVudCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lciA9IG92ZXJDb250YWluZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc092ZXJEcmFnZ2FibGUpIHtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2RyYWdnYWJsZTpvdmVyJykpO1xuXG4gICAgICAgIHZhciBkcmFnT3ZlckV2ZW50ID0gbmV3IF9kcmFnRXZlbnQuRHJhZ092ZXJFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyQ29udGFpbmVyOiBvdmVyQ29udGFpbmVyLFxuICAgICAgICAgIG92ZXI6IHRhcmdldFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChkcmFnT3ZlckV2ZW50KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyID0gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RyYWdTdG9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ1N0b3AoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgdmFyIHNlbnNvckV2ZW50ID0gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpO1xuICAgICAgdmFyIGRyYWdTdG9wRXZlbnQgPSBuZXcgX2RyYWdFdmVudC5EcmFnU3RvcEV2ZW50KHtcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgc2Vuc29yRXZlbnQ6IGV2ZW50LnNlbnNvckV2ZW50LFxuICAgICAgICBzb3VyY2VDb250YWluZXI6IHRoaXMuc291cmNlQ29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuc291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHRoaXMuc291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpwbGFjZWQnKSk7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6cGxhY2VkJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOmRyYWdnaW5nJykpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdib2R5OmRyYWdnaW5nJykpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T3Zlcikge1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2RyYWdnYWJsZTpvdmVyJykpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpvdmVyJykpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taXJyb3IpIHtcbiAgICAgICAgdmFyIG1pcnJvckRlc3Ryb3lFdmVudCA9IG5ldyBfbWlycm9yRXZlbnQuTWlycm9yRGVzdHJveUV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBzZW5zb3JFdmVudC5jb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG1pcnJvckRlc3Ryb3lFdmVudCk7XG5cbiAgICAgICAgaWYgKCFtaXJyb3JEZXN0cm95RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICAgIHRoaXMubWlycm9yLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5taXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBsYXN0U291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgICB2YXIgbGFzdFNvdXJjZUNvbnRhaW5lciA9IHRoaXMuc291cmNlQ29udGFpbmVyO1xuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGxhc3RTb3VyY2UpIHtcbiAgICAgICAgICBsYXN0U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoX3RoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6cGxhY2VkJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3RTb3VyY2VDb250YWluZXIpIHtcbiAgICAgICAgICBsYXN0U291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoX3RoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6cGxhY2VkJykpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLm9wdGlvbnMucGxhY2VkVGltZW91dCk7XG5cbiAgICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgICAgIHRoaXMubWlycm9yID0gbnVsbDtcbiAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50T3ZlciA9IG51bGw7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lciA9IG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZHJhZ1ByZXNzdXJlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhZ1ByZXNzdXJlKGV2ZW50KSB7XG4gICAgICB2YXIgc2Vuc29yRXZlbnQgPSBnZXRTZW5zb3JFdmVudChldmVudCk7XG4gICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2UgfHwgKDAsIF91dGlscy5jbG9zZXN0KShzZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSk7XG5cbiAgICAgIHZhciBkcmFnUHJlc3N1cmVFdmVudCA9IG5ldyBfZHJhZ0V2ZW50LkRyYWdQcmVzc3VyZUV2ZW50KHtcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgcHJlc3N1cmU6IHNlbnNvckV2ZW50LnByZXNzdXJlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldEFwcGVuZGFibGVDb250YWluZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBcHBlbmRhYmxlQ29udGFpbmVyKF9yZWYpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBfcmVmLnNvdXJjZTtcblxuICAgICAgdmFyIGFwcGVuZFRvID0gdGhpcy5vcHRpb25zLmFwcGVuZFRvO1xuXG4gICAgICBpZiAodHlwZW9mIGFwcGVuZFRvID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhcHBlbmRUbyk7XG4gICAgICB9IGVsc2UgaWYgKGFwcGVuZFRvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGFwcGVuZFRvO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGFwcGVuZFRvKHNvdXJjZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDbGFzc05hbWVGb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbGFzc05hbWVGb3IobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jbGFzc2VzW25hbWVdIHx8IGRlZmF1bHRzLmNsYXNzZXNbbmFtZV07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2xvc2VzdENvbnRhaW5lcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3Nlc3RDb250YWluZXIodGFyZ2V0KSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjcgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I3ID0gZmFsc2U7XG4gICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I3ID0gX3RoaXMyLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDc7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjcgPSAoX3N0ZXA3ID0gX2l0ZXJhdG9yNy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNyA9IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJFbCA9IF9zdGVwNy52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IGNvbnRhaW5lckVsKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I3ID0gdHJ1ZTtcbiAgICAgICAgICBfaXRlcmF0b3JFcnJvcjcgPSBlcnI7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjcgJiYgX2l0ZXJhdG9yNy5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yNy5yZXR1cm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNykge1xuICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnZ2FibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERyYWdnYWJsZTtcblxuXG5mdW5jdGlvbiBnZXRTZW5zb3JFdmVudChldmVudCkge1xuICByZXR1cm4gZXZlbnQuZGV0YWlsO1xufVxuXG5mdW5jdGlvbiBpc0RyYWdFdmVudChldmVudCkge1xuICByZXR1cm4gKC9eZHJhZy8udGVzdChldmVudC50eXBlKVxuICApO1xufVxuXG4vKioqLyB9KSxcbi8qIDE4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnU3RvcFNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnTW92ZVNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnU3RhcnRTZW5zb3JFdmVudCA9IGV4cG9ydHMuU2Vuc29yRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWJzdHJhY3RFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTZW5zb3JFdmVudCA9IGV4cG9ydHMuU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU2Vuc29yRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNlbnNvckV2ZW50LCBbe1xuICAgIGtleTogJ29yaWdpbmFsRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vcmlnaW5hbEV2ZW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NsaWVudFgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jbGllbnRYO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NsaWVudFknLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jbGllbnRZO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3RhcmdldCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnRhcmdldDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jb250YWluZXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXJDb250YWluZXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncHJlc3N1cmUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5wcmVzc3VyZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNlbnNvckV2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbnZhciBEcmFnU3RhcnRTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTdGFydFNlbnNvckV2ZW50LCBfU2Vuc29yRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdTdGFydFNlbnNvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdTdGFydFNlbnNvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1N0YXJ0U2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU3RhcnRTZW5zb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdTdGFydFNlbnNvckV2ZW50O1xufShTZW5zb3JFdmVudCk7XG5cbkRyYWdTdGFydFNlbnNvckV2ZW50LnR5cGUgPSAnZHJhZzpzdGFydCc7XG5cbnZhciBEcmFnTW92ZVNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnTW92ZVNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9TZW5zb3JFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ01vdmVTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJhZ01vdmVTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnTW92ZVNlbnNvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ01vdmVTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdNb3ZlU2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnTW92ZVNlbnNvckV2ZW50O1xufShTZW5zb3JFdmVudCk7XG5cbkRyYWdNb3ZlU2Vuc29yRXZlbnQudHlwZSA9ICdkcmFnOm1vdmUnO1xuXG52YXIgRHJhZ1N0b3BTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0b3BTZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfU2Vuc29yRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTdG9wU2Vuc29yRXZlbnQsIF9TZW5zb3JFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIERyYWdTdG9wU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1N0b3BTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdG9wU2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU3RvcFNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1N0b3BTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG5EcmFnU3RvcFNlbnNvckV2ZW50LnR5cGUgPSAnZHJhZzpzdG9wJztcblxudmFyIERyYWdQcmVzc3VyZVNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfU2Vuc29yRXZlbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdQcmVzc3VyZVNlbnNvckV2ZW50LCBfU2Vuc29yRXZlbnQ0KTtcblxuICBmdW5jdGlvbiBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdQcmVzc3VyZVNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6cHJlc3N1cmUnO1xuXG4vKioqLyB9KSxcbi8qIDE5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFNlbnNvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU2Vuc29yKTtcblxuICAgIHRoaXMuY29udGFpbmVycyA9IGNvbnRhaW5lcnM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihlbGVtZW50LCBzZW5zb3JFdmVudCkge1xuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBldmVudC5kZXRhaWwgPSBzZW5zb3JFdmVudDtcbiAgICAgIGV2ZW50LmluaXRFdmVudChzZW5zb3JFdmVudC50eXBlLCB0cnVlLCB0cnVlKTtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB0aGlzLmxhc3RFdmVudCA9IHNlbnNvckV2ZW50O1xuICAgICAgcmV0dXJuIHNlbnNvckV2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2Vuc29yO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTZW5zb3I7XG5cbi8qKiovIH0pLFxuLyogMjAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogMjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KVxuICAsIGVudW1CdWdLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMjIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG4vKioqLyB9KSxcbi8qIDIzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDI0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuLyoqKi8gfSksXG4vKiAyNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuLyoqKi8gfSksXG4vKiAyNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vKioqLyB9KSxcbi8qIDI3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuLyoqKi8gfSksXG4vKiAyOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG4gICwgZFBzICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg5KVxuICAsIGVudW1CdWdLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSlcbiAgLCBJRV9QUk9UTyAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzEpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MCkoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIF9fd2VicGFja19yZXF1aXJlX18oODIpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMjkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKiovIH0pLFxuLyogMzAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRlZiA9IF9fd2VicGFja19yZXF1aXJlX18oOCkuZlxuICAsIGhhcyA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBUQUcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTtcblxuLyoqKi8gfSksXG4vKiAzMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgc2hhcmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMikoJ2tleXMnKVxuICAsIHVpZCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDM0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG4vKioqLyB9KSxcbi8qIDM1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcbiAgLCBjb3JlICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTApXG4gICwgTElCUkFSWSAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KVxuICAsIHdrc0V4dCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNilcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oOCkuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwge3ZhbHVlOiB3a3NFeHQuZihuYW1lKX0pO1xufTtcblxuLyoqKi8gfSksXG4vKiAzNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5leHBvcnRzLmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblxuLyoqKi8gfSksXG4vKiAzNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3Mik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IF9fd2VicGFja19yZXF1aXJlX18oNzEpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTtcblxuLyoqKi8gfSksXG4vKiAzOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDM5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNzgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiA0MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuICAsIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuLyoqKi8gfSksXG4vKiA0MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFfX3dlYnBhY2tfcmVxdWlyZV9fKDYpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19yZXF1aXJlX18oNDApKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG4vKioqLyB9KSxcbi8qIDQyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgTElCUkFSWSAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KVxuICAsICRleHBvcnQgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcbiAgLCByZWRlZmluZSAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDcpXG4gICwgaGlkZSAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKVxuICAsIGhhcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIEl0ZXJhdG9ycyAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNilcbiAgLCAkaXRlckNyZWF0ZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oODUpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKVxuICAsIGdldFByb3RvdHlwZU9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5MSlcbiAgLCBJVEVSQVRPUiAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuLyoqKi8gfSksXG4vKiA0MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgcElFICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KVxuICAsIGNyZWF0ZURlc2MgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMilcbiAgLCB0b0lPYmplY3QgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpXG4gICwgaGFzICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKVxuICAsIGdPUEQgICAgICAgICAgID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcblxuLyoqKi8gfSksXG4vKiA0NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDYpXG4gICwgaGlkZGVuS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQ1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbi8qKiovIH0pLFxuLyogNDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGhhcyAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCB0b0lPYmplY3QgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpXG4gICwgYXJyYXlJbmRleE9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MCkoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMSkoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQ3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG5cbi8qKiovIH0pLFxuLyogNDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX2RyYWdnYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG52YXIgX2RyYWdnYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmFnZ2FibGUpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cbnZhciBfZHJvcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNsYXNzZXMgPSB7XG4gICdkcm9wcGFibGU6YWN0aXZlJzogJ2RyYWdnYWJsZS1kcm9wcGFibGUtLWFjdGl2ZScsXG4gICdkcm9wcGFibGU6b2NjdXBpZWQnOiAnZHJhZ2dhYmxlLWRyb3BwYWJsZS0tb2NjdXBpZWQnXG59O1xuXG52YXIgRHJvcHBhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBEcm9wcGFibGUoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcm9wcGFibGUpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBuZXcgX2RyYWdnYWJsZTIuZGVmYXVsdChjb250YWluZXJzLCBvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcblxuICAgIHRoaXMuX29uRHJhZ1N0YXJ0ID0gdGhpcy5fb25EcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdNb3ZlID0gdGhpcy5fb25EcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vbignZHJhZzptb3ZlJywgdGhpcy5fb25EcmFnTW92ZSkub24oJ2RyYWc6c3RvcCcsIHRoaXMuX29uRHJhZ1N0b3ApO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJvcHBhYmxlLCBbe1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOnN0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpLm9mZignZHJhZzptb3ZlJywgdGhpcy5fb25EcmFnTW92ZSkub2ZmKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKS5kZXN0cm95KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24odHlwZSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb2ZmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYodHlwZSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2xhc3NOYW1lRm9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lRm9yKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xhc3Nlc1tuYW1lXSB8fCBjbGFzc2VzW25hbWVdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdGFydChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyb3BwYWJsZXMgPSB0aGlzLl9nZXREcm9wcGFibGVzKCk7XG4gICAgICB2YXIgZHJvcHBhYmxlID0gZXZlbnQuc2Vuc29yRXZlbnQudGFyZ2V0LmNsb3Nlc3QodGhpcy5vcHRpb25zLmRyb3BwYWJsZSk7XG5cbiAgICAgIGlmICghZHJvcHBhYmxlKSB7XG4gICAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5pdGlhbERyb3BwYWJsZSA9IGRyb3BwYWJsZTtcblxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuZHJvcHBhYmxlc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6b2NjdXBpZWQnKSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOmFjdGl2ZScpKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ01vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnTW92ZShldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZHJvcHBhYmxlID0gdGhpcy5fY2xvc2VzdERyb3BwYWJsZShldmVudC5zZW5zb3JFdmVudC50YXJnZXQpO1xuICAgICAgdmFyIG92ZXJFbXB0eURyb3BwYWJsZSA9IGRyb3BwYWJsZSAmJiAhZHJvcHBhYmxlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJykpO1xuXG4gICAgICBpZiAob3ZlckVtcHR5RHJvcHBhYmxlICYmIHRoaXMuX2Ryb3AoZXZlbnQsIGRyb3BwYWJsZSkpIHtcbiAgICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlID0gZHJvcHBhYmxlO1xuICAgICAgfSBlbHNlIGlmICgoIWRyb3BwYWJsZSB8fCBkcm9wcGFibGUgPT09IHRoaXMuaW5pdGlhbERyb3BwYWJsZSkgJiYgdGhpcy5sYXN0RHJvcHBhYmxlKSB7XG4gICAgICAgIHRoaXMuX3JlbGVhc2UoZXZlbnQpO1xuICAgICAgICB0aGlzLmxhc3REcm9wcGFibGUgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdG9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0b3AoKSB7XG4gICAgICB2YXIgb2NjdXBpZWRDbGFzcyA9IHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6b2NjdXBpZWQnKTtcblxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmRyb3BwYWJsZXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgZHJvcHBhYmxlID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgZHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTphY3RpdmUnKSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGFzdERyb3BwYWJsZSAmJiB0aGlzLmxhc3REcm9wcGFibGUgIT09IHRoaXMuaW5pdGlhbERyb3BwYWJsZSkge1xuICAgICAgICB0aGlzLmluaXRpYWxEcm9wcGFibGUuY2xhc3NMaXN0LnJlbW92ZShvY2N1cGllZENsYXNzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcm9wcGFibGVzID0gbnVsbDtcbiAgICAgIHRoaXMubGFzdERyb3BwYWJsZSA9IG51bGw7XG4gICAgICB0aGlzLmluaXRpYWxEcm9wcGFibGUgPSBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19kcm9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2Ryb3AoZXZlbnQsIGRyb3BwYWJsZSkge1xuICAgICAgdmFyIGRyb3BwYWJsZU92ZXJFdmVudCA9IG5ldyBfZHJvcHBhYmxlRXZlbnQuRHJvcHBhYmxlT3ZlckV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgZHJvcHBhYmxlOiBkcm9wcGFibGVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoZHJvcHBhYmxlT3ZlckV2ZW50KTtcblxuICAgICAgaWYgKGRyb3BwYWJsZU92ZXJFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9jY3VwaWVkQ2xhc3MgPSB0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJyk7XG5cbiAgICAgIGlmICh0aGlzLmxhc3REcm9wcGFibGUpIHtcbiAgICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUob2NjdXBpZWRDbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIGRyb3BwYWJsZS5hcHBlbmRDaGlsZChldmVudC5zb3VyY2UpO1xuICAgICAgZHJvcHBhYmxlLmNsYXNzTGlzdC5hZGQob2NjdXBpZWRDbGFzcyk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19yZWxlYXNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3JlbGVhc2UoZXZlbnQpIHtcbiAgICAgIHZhciBkcm9wcGFibGVPdXRFdmVudCA9IG5ldyBfZHJvcHBhYmxlRXZlbnQuRHJvcHBhYmxlT3V0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBkcm9wcGFibGU6IHRoaXMubGFzdERyb3BwYWJsZVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChkcm9wcGFibGVPdXRFdmVudCk7XG5cbiAgICAgIGlmIChkcm9wcGFibGVPdXRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbml0aWFsRHJvcHBhYmxlLmFwcGVuZENoaWxkKGV2ZW50LnNvdXJjZSk7XG4gICAgICB0aGlzLmxhc3REcm9wcGFibGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jbG9zZXN0RHJvcHBhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2Nsb3Nlc3REcm9wcGFibGUodGFyZ2V0KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMuZHJvcHBhYmxlcykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShfdGhpcy5kcm9wcGFibGVzKS5pbmNsdWRlcyhlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXREcm9wcGFibGVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldERyb3BwYWJsZXMoKSB7XG4gICAgICB2YXIgZHJvcHBhYmxlcyA9IHRoaXMub3B0aW9ucy5kcm9wcGFibGU7XG5cbiAgICAgIGlmICh0eXBlb2YgZHJvcHBhYmxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZHJvcHBhYmxlcyk7XG4gICAgICB9IGVsc2UgaWYgKGRyb3BwYWJsZXMgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBkcm9wcGFibGVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGRyb3BwYWJsZXM7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkcm9wcGFibGVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBkcm9wcGFibGVzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcm9wcGFibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERyb3BwYWJsZTtcblxuLyoqKi8gfSksXG4vKiA0OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfZHJhZ2dhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cbnZhciBfZHJhZ2dhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYWdnYWJsZSk7XG5cbnZhciBfc29ydGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNjEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU29ydGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNvcnRhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU29ydGFibGUpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBuZXcgX2RyYWdnYWJsZTIuZGVmYXVsdChjb250YWluZXJzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuX29uRHJhZ1N0YXJ0ID0gdGhpcy5fb25EcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdPdmVyQ29udGFpbmVyID0gdGhpcy5fb25EcmFnT3ZlckNvbnRhaW5lci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ092ZXIgPSB0aGlzLl9vbkRyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnU3RvcCA9IHRoaXMuX29uRHJhZ1N0b3AuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdkcmFnOnN0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpLm9uKCdkcmFnOm92ZXI6Y29udGFpbmVyJywgdGhpcy5fb25EcmFnT3ZlckNvbnRhaW5lcikub24oJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9uKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlLCBbe1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOnN0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpLm9mZignZHJhZzpvdmVyOmNvbnRhaW5lcicsIHRoaXMuX29uRHJhZ092ZXJDb250YWluZXIpLm9mZignZHJhZzpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub2ZmKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKS5kZXN0cm95KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24odHlwZSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb2ZmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYodHlwZSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB0aGlzLnN0YXJ0SW5kZXggPSBpbmRleChldmVudC5zb3VyY2UpO1xuXG4gICAgICB2YXIgc29ydGFibGVTdGFydEV2ZW50ID0gbmV3IF9zb3J0YWJsZUV2ZW50LlNvcnRhYmxlU3RhcnRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuc3RhcnRJbmRleFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXIoc29ydGFibGVTdGFydEV2ZW50KTtcblxuICAgICAgaWYgKHNvcnRhYmxlU3RhcnRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdmVyQ29udGFpbmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ092ZXJDb250YWluZXIoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG1vdmVzID0gbW92ZShldmVudC5zb3VyY2UsIGV2ZW50Lm92ZXIsIGV2ZW50Lm92ZXJDb250YWluZXIpO1xuXG4gICAgICBpZiAoIW1vdmVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNvcnRhYmxlU29ydGVkRXZlbnQgPSBuZXcgX3NvcnRhYmxlRXZlbnQuU29ydGFibGVTb3J0ZWRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIG1vdmVzOiBtb3Zlc1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChzb3J0YWJsZVNvcnRlZEV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnT3ZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdPdmVyKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQub3ZlciA9PT0gZXZlbnQuc291cmNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG1vdmVzID0gbW92ZShldmVudC5zb3VyY2UsIGV2ZW50Lm92ZXIsIGV2ZW50Lm92ZXJDb250YWluZXIpO1xuXG4gICAgICBpZiAoIW1vdmVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNvcnRhYmxlU29ydGVkRXZlbnQgPSBuZXcgX3NvcnRhYmxlRXZlbnQuU29ydGFibGVTb3J0ZWRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIG1vdmVzOiBtb3Zlc1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChzb3J0YWJsZVNvcnRlZEV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdG9wKGV2ZW50KSB7XG4gICAgICB2YXIgc29ydGFibGVTdG9wRXZlbnQgPSBuZXcgX3NvcnRhYmxlRXZlbnQuU29ydGFibGVTdG9wRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBvbGRJbmRleDogdGhpcy5zdGFydEluZGV4LFxuICAgICAgICBuZXdJbmRleDogaW5kZXgoZXZlbnQuc291cmNlKVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChzb3J0YWJsZVN0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuc3RhcnRJbmRleCA9IG51bGw7XG4gICAgICB0aGlzLm9mZnNldCA9IG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU29ydGFibGU7XG5cblxuZnVuY3Rpb24gaW5kZXgoZWxlbWVudCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChlbGVtZW50LnBhcmVudE5vZGUuY2hpbGRyZW4sIGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBtb3ZlKHNvdXJjZSwgb3Zlciwgb3ZlckNvbnRhaW5lcikge1xuICB2YXIgZW1wdHlPdmVyQ29udGFpbmVyID0gIW92ZXJDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgZGlmZmVyZW50Q29udGFpbmVyID0gb3ZlciAmJiBzb3VyY2UucGFyZW50Tm9kZSAhPT0gb3Zlci5wYXJlbnROb2RlO1xuICB2YXIgc2FtZUNvbnRhaW5lciA9IG92ZXIgJiYgc291cmNlLnBhcmVudE5vZGUgPT09IG92ZXIucGFyZW50Tm9kZTtcblxuICBpZiAoZW1wdHlPdmVyQ29udGFpbmVyKSB7XG4gICAgcmV0dXJuIG1vdmVJbnNpZGVFbXB0eUNvbnRhaW5lcihzb3VyY2UsIG92ZXJDb250YWluZXIpO1xuICB9IGVsc2UgaWYgKHNhbWVDb250YWluZXIpIHtcbiAgICByZXR1cm4gbW92ZVdpdGhpbkNvbnRhaW5lcihzb3VyY2UsIG92ZXIpO1xuICB9IGVsc2UgaWYgKGRpZmZlcmVudENvbnRhaW5lcikge1xuICAgIHJldHVybiBtb3ZlT3V0c2lkZUNvbnRhaW5lcihzb3VyY2UsIG92ZXIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVJbnNpZGVFbXB0eUNvbnRhaW5lcihzb3VyY2UsIG92ZXJDb250YWluZXIpIHtcbiAgdmFyIG9sZENvbnRhaW5lciA9IHNvdXJjZS5wYXJlbnROb2RlO1xuICB2YXIgb2xkSW5kZXggPSBpbmRleChzb3VyY2UpO1xuXG4gIG92ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc291cmNlKTtcblxuICByZXR1cm4geyBvbGRJbmRleDogb2xkSW5kZXgsIG5ld0luZGV4OiBpbmRleChzb3VyY2UpLCBvbGRDb250YWluZXI6IG9sZENvbnRhaW5lciwgbmV3Q29udGFpbmVyOiBvdmVyQ29udGFpbmVyIH07XG59XG5cbmZ1bmN0aW9uIG1vdmVXaXRoaW5Db250YWluZXIoc291cmNlLCBvdmVyKSB7XG4gIHZhciBvbGRJbmRleCA9IGluZGV4KHNvdXJjZSk7XG4gIHZhciBuZXdJbmRleCA9IGluZGV4KG92ZXIpO1xuXG4gIGlmIChvbGRJbmRleCA8IG5ld0luZGV4KSB7XG4gICAgc291cmNlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNvdXJjZSwgb3Zlci5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICB9IGVsc2Uge1xuICAgIHNvdXJjZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzb3VyY2UsIG92ZXIpO1xuICB9XG5cbiAgcmV0dXJuIHsgb2xkSW5kZXg6IG9sZEluZGV4LCBuZXdJbmRleDogbmV3SW5kZXgsIG9sZENvbnRhaW5lcjogc291cmNlLnBhcmVudE5vZGUsIG5ld0NvbnRhaW5lcjogc291cmNlLnBhcmVudE5vZGUgfTtcbn1cblxuZnVuY3Rpb24gbW92ZU91dHNpZGVDb250YWluZXIoc291cmNlLCBvdmVyKSB7XG4gIHZhciBvbGRDb250YWluZXIgPSBzb3VyY2UucGFyZW50Tm9kZTtcbiAgdmFyIG9sZEluZGV4ID0gaW5kZXgoc291cmNlKTtcbiAgdmFyIG5ld0luZGV4ID0gaW5kZXgob3Zlcik7XG5cbiAgb3Zlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzb3VyY2UsIG92ZXIpO1xuXG4gIHJldHVybiB7IG9sZEluZGV4OiBvbGRJbmRleCwgbmV3SW5kZXg6IG5ld0luZGV4LCBvbGRDb250YWluZXI6IG9sZENvbnRhaW5lciwgbmV3Q29udGFpbmVyOiBzb3VyY2UucGFyZW50Tm9kZSB9O1xufVxuXG4vKioqLyB9KSxcbi8qIDUwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9kcmFnZ2FibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblxudmFyIF9kcmFnZ2FibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhZ2dhYmxlKTtcblxudmFyIF9zd2FwcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU3dhcHBhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTd2FwcGFibGUoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGUpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBuZXcgX2RyYWdnYWJsZTIuZGVmYXVsdChjb250YWluZXJzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuX29uRHJhZ1N0YXJ0ID0gdGhpcy5fb25EcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdPdmVyID0gdGhpcy5fb25EcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vbignZHJhZzpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub24oJ2RyYWc6c3RvcCcsIHRoaXMuX29uRHJhZ1N0b3ApO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3dhcHBhYmxlLCBbe1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOnN0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpLm9mZignZHJhZzpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub2ZmKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKS5kZXN0cm95KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24odHlwZSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb2ZmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYodHlwZSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB2YXIgc3dhcHBhYmxlU3RhcnRFdmVudCA9IG5ldyBfc3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3RhcnRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc3dhcHBhYmxlU3RhcnRFdmVudCk7XG5cbiAgICAgIGlmIChzd2FwcGFibGVTdGFydEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgZXZlbnQuY2FuY2VsKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ092ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnT3ZlcihldmVudCkge1xuICAgICAgaWYgKGV2ZW50Lm92ZXIgPT09IGV2ZW50LnNvdXJjZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGFzdE92ZXIgJiYgdGhpcy5sYXN0T3ZlciAhPT0gZXZlbnQub3Zlcikge1xuICAgICAgICBzd2FwKHRoaXMubGFzdE92ZXIsIGV2ZW50LnNvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdE92ZXIgPSBldmVudC5vdmVyO1xuXG4gICAgICBzd2FwKGV2ZW50LnNvdXJjZSwgZXZlbnQub3Zlcik7XG5cbiAgICAgIC8vIExldCB0aGlzIGNhbmNlbCB0aGUgYWN0dWFsIHN3YXBcbiAgICAgIHZhciBzd2FwcGFibGVTd2FwcGVkRXZlbnQgPSBuZXcgX3N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN3YXBwZWRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIHN3YXBwZWRFbGVtZW50OiBldmVudC5vdmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KHN3YXBwYWJsZVN3YXBwZWRFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RvcChldmVudCkge1xuICAgICAgdmFyIHN3YXBwYWJsZVN0b3BFdmVudCA9IG5ldyBfc3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3RvcEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXJFdmVudChzd2FwcGFibGVTdG9wRXZlbnQpO1xuICAgICAgdGhpcy5sYXN0T3ZlciA9IG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTd2FwcGFibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN3YXBwYWJsZTtcblxuXG5mdW5jdGlvbiB3aXRoVGVtcEVsZW1lbnQoY2FsbGJhY2spIHtcbiAgdmFyIHRtcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2FsbGJhY2sodG1wRWxlbWVudCk7XG4gIHRtcEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0bXBFbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gc3dhcChzb3VyY2UsIG92ZXIpIHtcbiAgdmFyIG92ZXJQYXJlbnQgPSBvdmVyLnBhcmVudE5vZGU7XG4gIHZhciBzb3VyY2VQYXJlbnQgPSBzb3VyY2UucGFyZW50Tm9kZTtcblxuICB3aXRoVGVtcEVsZW1lbnQoZnVuY3Rpb24gKHRtcEVsZW1lbnQpIHtcbiAgICBzb3VyY2VQYXJlbnQuaW5zZXJ0QmVmb3JlKHRtcEVsZW1lbnQsIHNvdXJjZSk7XG4gICAgb3ZlclBhcmVudC5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyKTtcbiAgICBzb3VyY2VQYXJlbnQuaW5zZXJ0QmVmb3JlKG92ZXIsIHRtcEVsZW1lbnQpO1xuICB9KTtcbn1cblxuLyoqKi8gfSksXG4vKiA1MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblxudmFyIF9jb2xsaWRhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU1KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIENvbGxpZGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENvbGxpZGFibGUoZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ29sbGlkYWJsZSk7XG5cbiAgICB0aGlzLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcblxuICAgIHRoaXMuX29uRHJhZ01vdmUgPSB0aGlzLl9vbkRyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnU3RvcCA9IHRoaXMuX29uRHJhZ1N0b3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vblJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHRoaXMuX29uUmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQodGhpcyk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShDb2xsaWRhYmxlLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdkcmFnOm1vdmUnLCB0aGlzLl9vbkRyYWdNb3ZlKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ2RyYWc6bW92ZScsIHRoaXMuX29uRHJhZ01vdmUpO1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnTW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQuc2Vuc29yRXZlbnQudGFyZ2V0O1xuXG4gICAgICB0aGlzLmN1cnJlbnRBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9vblJlcXVlc3RBbmltYXRpb25GcmFtZSh0YXJnZXQpKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbGxpZGFibGVJbkV2ZW50ID0gbmV3IF9jb2xsaWRhYmxlRXZlbnQuQ29sbGlkYWJsZUluRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBjb2xsaWRpbmdFbGVtZW50OiB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgY29sbGlkYWJsZU91dEV2ZW50ID0gbmV3IF9jb2xsaWRhYmxlRXZlbnQuQ29sbGlkYWJsZU91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY29sbGlkaW5nRWxlbWVudDogdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBlbnRlcmluZ0NvbGxpZGFibGUgPSBCb29sZWFuKHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCAmJiB0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50ICE9PSB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQpO1xuICAgICAgdmFyIGxlYXZpbmdDb2xsaWRhYmxlID0gQm9vbGVhbighdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50ICYmIHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQpO1xuXG4gICAgICBpZiAoZW50ZXJpbmdDb2xsaWRhYmxlKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KGNvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoY29sbGlkYWJsZUluRXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChsZWF2aW5nQ29sbGlkYWJsZSkge1xuICAgICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoY29sbGlkYWJsZU91dEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCA9IHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdG9wKGV2ZW50KSB7XG4gICAgICB2YXIgbGFzdENvbGxpZGluZ0VsZW1lbnQgPSB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQgfHwgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudDtcbiAgICAgIHZhciBjb2xsaWRhYmxlT3V0RXZlbnQgPSBuZXcgX2NvbGxpZGFibGVFdmVudC5Db2xsaWRhYmxlT3V0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBjb2xsaWRpbmdFbGVtZW50OiBsYXN0Q29sbGlkaW5nRWxlbWVudFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChsYXN0Q29sbGlkaW5nRWxlbWVudCkge1xuICAgICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoY29sbGlkYWJsZU91dEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCA9IG51bGw7XG4gICAgICB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblJlcXVlc3RBbmltYXRpb25GcmFtZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblJlcXVlc3RBbmltYXRpb25GcmFtZSh0YXJnZXQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsaWRhYmxlcyA9IF90aGlzLl9nZXRDb2xsaWRhYmxlcygpO1xuICAgICAgICBfdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50ID0gKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGxpZGFibGVzLmluY2x1ZGVzKGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldENvbGxpZGFibGVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldENvbGxpZGFibGVzKCkge1xuICAgICAgdmFyIGNvbGxpZGFibGVzID0gdGhpcy5kcmFnZ2FibGUub3B0aW9ucy5jb2xsaWRhYmxlcztcblxuICAgICAgaWYgKHR5cGVvZiBjb2xsaWRhYmxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29sbGlkYWJsZXMpKTtcbiAgICAgIH0gZWxzZSBpZiAoY29sbGlkYWJsZXMgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBjb2xsaWRhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjb2xsaWRhYmxlcyk7XG4gICAgICB9IGVsc2UgaWYgKGNvbGxpZGFibGVzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIFtjb2xsaWRhYmxlc107XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb2xsaWRhYmxlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gY29sbGlkYWJsZXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbGxpZGFibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbGxpZGFibGU7XG5cbi8qKiovIH0pLFxuLyogNTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3NuYXBwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2MCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTbmFwcGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNuYXBwYWJsZShkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwcGFibGUpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLl9vbkRyYWdTdGFydCA9IHRoaXMuX29uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnU3RvcCA9IHRoaXMuX29uRHJhZ1N0b3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdPdmVyID0gdGhpcy5fb25EcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ091dCA9IHRoaXMuX29uRHJhZ091dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU25hcHBhYmxlLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdkcmFnOnN0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpLm9uKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKS5vbignZHJhZzpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub24oJ2RyYWc6b3V0JywgdGhpcy5fb25EcmFnT3V0KS5vbignZHJvcHBhYmxlOm92ZXInLCB0aGlzLl9vbkRyYWdPdmVyKS5vbignZHJvcHBhYmxlOm91dCcsIHRoaXMuX29uRHJhZ091dCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOnN0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkub2ZmKCdkcmFnOm92ZXInLCB0aGlzLl9vbkRyYWdPdmVyKS5vZmYoJ2RyYWc6b3V0JywgdGhpcy5fb25EcmFnT3V0KS5vZmYoJ2Ryb3BwYWJsZTpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub2ZmKCdkcm9wcGFibGU6b3V0JywgdGhpcy5fb25EcmFnT3V0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RhcnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJzdFNvdXJjZSA9IGV2ZW50LnNvdXJjZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdG9wKCkge1xuICAgICAgdGhpcy5maXJzdFNvdXJjZSA9IG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ092ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnT3ZlcihldmVudCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc291cmNlID0gZXZlbnQuc291cmNlIHx8IGV2ZW50LmRyYWdFdmVudC5zb3VyY2U7XG4gICAgICB2YXIgbWlycm9yID0gZXZlbnQubWlycm9yIHx8IGV2ZW50LmRyYWdFdmVudC5taXJyb3I7XG5cbiAgICAgIGlmIChzb3VyY2UgPT09IHRoaXMuZmlyc3RTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5maXJzdFNvdXJjZSA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNuYXBJbkV2ZW50ID0gbmV3IF9zbmFwcGFibGVFdmVudC5TbmFwSW5FdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyRXZlbnQoc25hcEluRXZlbnQpO1xuXG4gICAgICBpZiAoc25hcEluRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChtaXJyb3IpIHtcbiAgICAgICAgbWlycm9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG5cbiAgICAgIHNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgICAgc291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5kcmFnZ2FibGUuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6cGxhY2VkJykpO1xuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc291cmNlLmNsYXNzTGlzdC5yZW1vdmUoX3RoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcbiAgICAgIH0sIHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMucGxhY2VkVGltZW91dCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ091dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdPdXQoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG1pcnJvciA9IGV2ZW50Lm1pcnJvciB8fCBldmVudC5kcmFnRXZlbnQubWlycm9yO1xuICAgICAgdmFyIHNvdXJjZSA9IGV2ZW50LnNvdXJjZSB8fCBldmVudC5kcmFnRXZlbnQuc291cmNlO1xuXG4gICAgICB2YXIgc25hcE91dEV2ZW50ID0gbmV3IF9zbmFwcGFibGVFdmVudC5TbmFwT3V0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlckV2ZW50KHNuYXBPdXRFdmVudCk7XG5cbiAgICAgIGlmIChzbmFwT3V0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChtaXJyb3IpIHtcbiAgICAgICAgbWlycm9yLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgIH1cblxuICAgICAgc291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5kcmFnZ2FibGUuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTbmFwcGFibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNuYXBwYWJsZTtcblxuLyoqKi8gfSksXG4vKiA1MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBBUklBX0dSQUJCRUQgPSAnYXJpYS1ncmFiYmVkJztcbnZhciBBUklBX0RST1BFRkZFQ1QgPSAnYXJpYS1kcm9wZWZmZWN0JztcbnZhciBUQUJJTkRFWCA9ICd0YWJpbmRleCc7XG5cbnZhciBBY2Nlc3NpYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBY2Nlc3NpYmlsaXR5KGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEFjY2Vzc2liaWxpdHkpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLl9vbkluaXQgPSB0aGlzLl9vbkluaXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kgPSB0aGlzLl9vbkRlc3Ryb3kuYmluZCh0aGlzKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEFjY2Vzc2liaWxpdHksIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24oJ2luaXQnLCB0aGlzLl9vbkluaXQpLm9uKCdkZXN0cm95JywgdGhpcy5fb25EZXN0cm95KS5vbignZHJhZzpzdGFydCcsIF9vbkRyYWdTdGFydCkub24oJ2RyYWc6c3RvcCcsIF9vbkRyYWdTdG9wKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ2luaXQnLCB0aGlzLl9vbkluaXQpLm9mZignZGVzdHJveScsIHRoaXMuX29uRGVzdHJveSkub2ZmKCdkcmFnOnN0YXJ0JywgX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6c3RvcCcsIF9vbkRyYWdTdG9wKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Jbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uSW5pdChfcmVmKSB7XG4gICAgICB2YXIgY29udGFpbmVycyA9IF9yZWYuY29udGFpbmVycztcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBjb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoQVJJQV9EUk9QRUZGRUNULCB0aGlzLmRyYWdnYWJsZS5vcHRpb25zLnR5cGUpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5kcmFnZ2FibGUub3B0aW9ucy5kcmFnZ2FibGUpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFRBQklOREVYLCAwKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoQVJJQV9HUkFCQkVELCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRlc3Ryb3koX3JlZjIpIHtcbiAgICAgIHZhciBjb250YWluZXJzID0gX3JlZjIuY29udGFpbmVycztcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMzsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IChfc3RlcDMgPSBfaXRlcmF0b3IzLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcDMudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKEFSSUFfRFJPUEVGRkVDVCk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlO1xuICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCh0aGlzLmRyYWdnYWJsZS5vcHRpb25zLmRyYWdnYWJsZSlbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDQ7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSAoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWUpIHtcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBfc3RlcDQudmFsdWU7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoVEFCSU5ERVgsIDApO1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShBUklBX0dSQUJCRUQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjQgPSBlcnI7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgJiYgX2l0ZXJhdG9yNC5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3I0LnJldHVybigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IzLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBBY2Nlc3NpYmlsaXR5O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBY2Nlc3NpYmlsaXR5O1xuXG5cbmZ1bmN0aW9uIF9vbkRyYWdTdGFydChfcmVmMykge1xuICB2YXIgc291cmNlID0gX3JlZjMuc291cmNlO1xuXG4gIHNvdXJjZS5zZXRBdHRyaWJ1dGUoQVJJQV9HUkFCQkVELCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gX29uRHJhZ1N0b3AoX3JlZjQpIHtcbiAgdmFyIHNvdXJjZSA9IF9yZWY0LnNvdXJjZTtcblxuICBzb3VyY2Uuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgZmFsc2UpO1xufVxuXG4vKioqLyB9KSxcbi8qIDU0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIE1pcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWlycm9yKGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvcik7XG5cbiAgICB0aGlzLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcblxuICAgIHRoaXMuX29uTWlycm9yQ3JlYXRlZCA9IHRoaXMuX29uTWlycm9yQ3JlYXRlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uTWlycm9yTW92ZSA9IHRoaXMuX29uTWlycm9yTW92ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTWlycm9yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdtaXJyb3I6Y3JlYXRlZCcsIHRoaXMuX29uTWlycm9yQ3JlYXRlZCkub24oJ21pcnJvcjpjcmVhdGVkJywgb25NaXJyb3JDcmVhdGVkKS5vbignbWlycm9yOm1vdmUnLCB0aGlzLl9vbk1pcnJvck1vdmUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignbWlycm9yOmNyZWF0ZWQnLCB0aGlzLl9vbk1pcnJvckNyZWF0ZWQpLm9mZignbWlycm9yOmNyZWF0ZWQnLCBvbk1pcnJvckNyZWF0ZWQpLm9mZignbWlycm9yOm1vdmUnLCB0aGlzLl9vbk1pcnJvck1vdmUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1pcnJvckNyZWF0ZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25NaXJyb3JDcmVhdGVkKF9yZWYpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBtaXJyb3IgPSBfcmVmLm1pcnJvcixcbiAgICAgICAgICBzb3VyY2UgPSBfcmVmLnNvdXJjZSxcbiAgICAgICAgICBzZW5zb3JFdmVudCA9IF9yZWYuc2Vuc29yRXZlbnQ7XG5cbiAgICAgIHZhciBtaXJyb3JDbGFzcyA9IHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignbWlycm9yJyk7XG5cbiAgICAgIHZhciBzZXRTdGF0ZSA9IGZ1bmN0aW9uIHNldFN0YXRlKGRhdGEpIHtcbiAgICAgICAgX3RoaXMubWlycm9yT2Zmc2V0ID0gZGF0YS5taXJyb3JPZmZzZXQ7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfTtcblxuICAgICAgUHJvbWlzZS5yZXNvbHZlKHsgbWlycm9yOiBtaXJyb3IsIHNvdXJjZTogc291cmNlLCBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsIG1pcnJvckNsYXNzOiBtaXJyb3JDbGFzcyB9KS50aGVuKGNvbXB1dGVNaXJyb3JEaW1lbnNpb25zKS50aGVuKGNhbGN1bGF0ZU1pcnJvck9mZnNldCkudGhlbihhZGRNaXJyb3JDbGFzc2VzKS50aGVuKHBvc2l0aW9uTWlycm9yKCkpLnRoZW4ocmVtb3ZlTWlycm9ySUQpLnRoZW4oc2V0U3RhdGUpLmNhdGNoKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTWlycm9yTW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1pcnJvck1vdmUoX3JlZjIpIHtcbiAgICAgIHZhciBtaXJyb3IgPSBfcmVmMi5taXJyb3IsXG4gICAgICAgICAgc2Vuc29yRXZlbnQgPSBfcmVmMi5zZW5zb3JFdmVudDtcblxuICAgICAgUHJvbWlzZS5yZXNvbHZlKHsgbWlycm9yOiBtaXJyb3IsIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCwgbWlycm9yT2Zmc2V0OiB0aGlzLm1pcnJvck9mZnNldCB9KS50aGVuKHBvc2l0aW9uTWlycm9yKHsgcmFmOiB0cnVlIH0pKS5jYXRjaCgpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWlycm9yO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNaXJyb3I7XG5cblxuZnVuY3Rpb24gb25NaXJyb3JDcmVhdGVkKF9yZWYzKSB7XG4gIHZhciBtaXJyb3IgPSBfcmVmMy5taXJyb3IsXG4gICAgICBzb3VyY2UgPSBfcmVmMy5zb3VyY2U7XG5cbiAgUHJvbWlzZS5yZXNvbHZlKHsgbWlycm9yOiBtaXJyb3IsIHNvdXJjZTogc291cmNlIH0pLnRoZW4ocmVzZXRNaXJyb3IpLmNhdGNoKCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0TWlycm9yKGRhdGEpIHtcbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIG1pcnJvciA9IGRhdGEubWlycm9yLFxuICAgICAgICBzb3VyY2UgPSBkYXRhLnNvdXJjZTtcblxuXG4gICAgbWlycm9yLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICBtaXJyb3Iuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICBtaXJyb3Iuc3R5bGUudG9wID0gMDtcbiAgICBtaXJyb3Iuc3R5bGUubGVmdCA9IDA7XG4gICAgbWlycm9yLnN0eWxlLndpZHRoID0gc291cmNlLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICBtaXJyb3Iuc3R5bGUuaGVpZ2h0ID0gc291cmNlLm9mZnNldEhlaWdodCArICdweCc7XG5cbiAgICByZXNvbHZlKGRhdGEpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZU1pcnJvckRpbWVuc2lvbnMoZGF0YSkge1xuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgc291cmNlID0gZGF0YS5zb3VyY2U7XG5cbiAgICB2YXIgc291cmNlUmVjdCA9IHNvdXJjZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHsgc291cmNlUmVjdDogc291cmNlUmVjdCB9KSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVNaXJyb3JPZmZzZXQoZGF0YSkge1xuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgc2Vuc29yRXZlbnQgPSBkYXRhLnNlbnNvckV2ZW50LFxuICAgICAgICBzb3VyY2VSZWN0ID0gZGF0YS5zb3VyY2VSZWN0O1xuXG4gICAgdmFyIG1pcnJvck9mZnNldCA9IHsgdG9wOiBzZW5zb3JFdmVudC5jbGllbnRZIC0gc291cmNlUmVjdC50b3AsIGxlZnQ6IHNlbnNvckV2ZW50LmNsaWVudFggLSBzb3VyY2VSZWN0LmxlZnQgfTtcbiAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHsgbWlycm9yT2Zmc2V0OiBtaXJyb3JPZmZzZXQgfSkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkTWlycm9yQ2xhc3NlcyhkYXRhKSB7XG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHZhciBtaXJyb3IgPSBkYXRhLm1pcnJvcixcbiAgICAgICAgbWlycm9yQ2xhc3MgPSBkYXRhLm1pcnJvckNsYXNzO1xuXG4gICAgbWlycm9yLmNsYXNzTGlzdC5hZGQobWlycm9yQ2xhc3MpO1xuICAgIHJlc29sdmUoZGF0YSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVNaXJyb3JJRChkYXRhKSB7XG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHZhciBtaXJyb3IgPSBkYXRhLm1pcnJvcjtcblxuICAgIG1pcnJvci5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgZGVsZXRlIG1pcnJvci5pZDtcbiAgICByZXNvbHZlKGRhdGEpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25NaXJyb3IoKSB7XG4gIHZhciBfcmVmNCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICBfcmVmNCR3aXRoRnJhbWUgPSBfcmVmNC53aXRoRnJhbWUsXG4gICAgICB3aXRoRnJhbWUgPSBfcmVmNCR3aXRoRnJhbWUgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZjQkd2l0aEZyYW1lO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgdmFyIG1pcnJvciA9IGRhdGEubWlycm9yLFxuICAgICAgICAgIHNlbnNvckV2ZW50ID0gZGF0YS5zZW5zb3JFdmVudCxcbiAgICAgICAgICBtaXJyb3JPZmZzZXQgPSBkYXRhLm1pcnJvck9mZnNldDtcblxuXG4gICAgICBpZiAobWlycm9yT2Zmc2V0KSB7XG4gICAgICAgIHZhciB4ID0gc2Vuc29yRXZlbnQuY2xpZW50WCAtIG1pcnJvck9mZnNldC5sZWZ0O1xuICAgICAgICB2YXIgeSA9IHNlbnNvckV2ZW50LmNsaWVudFkgLSBtaXJyb3JPZmZzZXQudG9wO1xuXG4gICAgICAgIG1pcnJvci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwKSc7XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgfSwgeyBmcmFtZTogd2l0aEZyYW1lIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3aXRoUHJvbWlzZShjYWxsYmFjaykge1xuICB2YXIgX3JlZjUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgX3JlZjUkcmFmID0gX3JlZjUucmFmLFxuICAgICAgcmFmID0gX3JlZjUkcmFmID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWY1JHJhZjtcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmIChyYWYpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2socmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKioqLyB9KSxcbi8qIDU1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNvbGxpZGFibGVPdXRFdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZUluRXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIENvbGxpZGFibGVFdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKENvbGxpZGFibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIENvbGxpZGFibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBDb2xsaWRhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChDb2xsaWRhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsaWRhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENvbGxpZGFibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xsaWRhYmxlRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxuQ29sbGlkYWJsZUV2ZW50LnR5cGUgPSAnY29sbGlkYWJsZSc7XG5cbnZhciBDb2xsaWRhYmxlSW5FdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZUluRXZlbnQgPSBmdW5jdGlvbiAoX0NvbGxpZGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDb2xsaWRhYmxlSW5FdmVudCwgX0NvbGxpZGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gQ29sbGlkYWJsZUluRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ29sbGlkYWJsZUluRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChDb2xsaWRhYmxlSW5FdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbGxpZGFibGVJbkV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShDb2xsaWRhYmxlSW5FdmVudCwgW3tcbiAgICBrZXk6ICdjb2xsaWRpbmdFbGVtZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY29sbGlkaW5nRWxlbWVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbGxpZGFibGVJbkV2ZW50O1xufShDb2xsaWRhYmxlRXZlbnQpO1xuXG5Db2xsaWRhYmxlSW5FdmVudC50eXBlID0gJ2NvbGxpZGFibGU6aW4nO1xuXG52YXIgQ29sbGlkYWJsZU91dEV2ZW50ID0gZXhwb3J0cy5Db2xsaWRhYmxlT3V0RXZlbnQgPSBmdW5jdGlvbiAoX0NvbGxpZGFibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoQ29sbGlkYWJsZU91dEV2ZW50LCBfQ29sbGlkYWJsZUV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gQ29sbGlkYWJsZU91dEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIENvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKENvbGxpZGFibGVPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbGxpZGFibGVPdXRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ29sbGlkYWJsZU91dEV2ZW50LCBbe1xuICAgIGtleTogJ2NvbGxpZGluZ0VsZW1lbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jb2xsaWRpbmdFbGVtZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29sbGlkYWJsZU91dEV2ZW50O1xufShDb2xsaWRhYmxlRXZlbnQpO1xuXG5Db2xsaWRhYmxlT3V0RXZlbnQudHlwZSA9ICdjb2xsaWRhYmxlOm91dCc7XG5cbi8qKiovIH0pLFxuLyogNTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHJhZ1N0b3BFdmVudCA9IGV4cG9ydHMuRHJhZ1ByZXNzdXJlRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdXRFdmVudCA9IGV4cG9ydHMuRHJhZ091dENvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnTW92ZUV2ZW50ID0gZXhwb3J0cy5EcmFnU3RhcnRFdmVudCA9IGV4cG9ydHMuRHJhZ0V2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9hYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9hYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRHJhZ0V2ZW50ID0gZXhwb3J0cy5EcmFnRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ0V2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ0V2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ0V2ZW50LCBbe1xuICAgIGtleTogJ2hhc01pcnJvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc01pcnJvcigpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMubWlycm9yKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzb3VyY2UnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbWlycm9yJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubWlycm9yO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NvdXJjZUNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNvdXJjZUNvbnRhaW5lcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZW5zb3JFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNlbnNvckV2ZW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29yaWdpbmFsRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgaWYgKHRoaXMuc2Vuc29yRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxudmFyIERyYWdTdGFydEV2ZW50ID0gZXhwb3J0cy5EcmFnU3RhcnRFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTdGFydEV2ZW50LCBfRHJhZ0V2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnU3RhcnRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RhcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdGFydEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0YXJ0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RhcnRFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ1N0YXJ0RXZlbnQudHlwZSA9ICdkcmFnOnN0YXJ0JztcblxudmFyIERyYWdNb3ZlRXZlbnQgPSBleHBvcnRzLkRyYWdNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ01vdmVFdmVudCwgX0RyYWdFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyYWdNb3ZlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ01vdmVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdNb3ZlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnTW92ZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ01vdmVFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ01vdmVFdmVudC50eXBlID0gJ2RyYWc6bW92ZSc7XG5cbnZhciBEcmFnT3V0Q29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdXRDb250YWluZXJFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnT3V0Q29udGFpbmVyRXZlbnQsIF9EcmFnRXZlbnQzKTtcblxuICBmdW5jdGlvbiBEcmFnT3V0Q29udGFpbmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ091dENvbnRhaW5lckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ091dENvbnRhaW5lckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ091dENvbnRhaW5lckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3V0Q29udGFpbmVyRXZlbnQsIFt7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXJDb250YWluZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnT3V0Q29udGFpbmVyRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbkRyYWdPdXRDb250YWluZXJFdmVudC50eXBlID0gJ2RyYWc6b3V0OmNvbnRhaW5lcic7XG5cbnZhciBEcmFnT3V0RXZlbnQgPSBleHBvcnRzLkRyYWdPdXRFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnT3V0RXZlbnQsIF9EcmFnRXZlbnQ0KTtcblxuICBmdW5jdGlvbiBEcmFnT3V0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ091dEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ091dEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ091dEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3V0RXZlbnQsIFt7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXJDb250YWluZXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb3ZlcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnT3V0RXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbkRyYWdPdXRFdmVudC50eXBlID0gJ2RyYWc6b3V0JztcblxudmFyIERyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDUpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ092ZXJDb250YWluZXJFdmVudCwgX0RyYWdFdmVudDUpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdmVyQ29udGFpbmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ092ZXJDb250YWluZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdmVyQ29udGFpbmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3ZlckNvbnRhaW5lckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3ZlckNvbnRhaW5lckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ092ZXJDb250YWluZXJFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ092ZXJDb250YWluZXJFdmVudC50eXBlID0gJ2RyYWc6b3Zlcjpjb250YWluZXInO1xuXG52YXIgRHJhZ092ZXJFdmVudCA9IGV4cG9ydHMuRHJhZ092ZXJFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50Nikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnT3ZlckV2ZW50LCBfRHJhZ0V2ZW50Nik7XG5cbiAgZnVuY3Rpb24gRHJhZ092ZXJFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnT3ZlckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ092ZXJFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdPdmVyRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdPdmVyRXZlbnQsIFt7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXJDb250YWluZXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb3ZlcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnT3ZlckV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG5EcmFnT3ZlckV2ZW50LnR5cGUgPSAnZHJhZzpvdmVyJztcblxudmFyIERyYWdQcmVzc3VyZUV2ZW50ID0gZXhwb3J0cy5EcmFnUHJlc3N1cmVFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50Nykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnUHJlc3N1cmVFdmVudCwgX0RyYWdFdmVudDcpO1xuXG4gIGZ1bmN0aW9uIERyYWdQcmVzc3VyZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdQcmVzc3VyZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1ByZXNzdXJlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnUHJlc3N1cmVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ1ByZXNzdXJlRXZlbnQsIFt7XG4gICAga2V5OiAncHJlc3N1cmUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5wcmVzc3VyZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdQcmVzc3VyZUV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG5EcmFnUHJlc3N1cmVFdmVudC50eXBlID0gJ2RyYWc6cHJlc3N1cmUnO1xuXG52YXIgRHJhZ1N0b3BFdmVudCA9IGV4cG9ydHMuRHJhZ1N0b3BFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50OCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RvcEV2ZW50LCBfRHJhZ0V2ZW50OCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1N0b3BFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RvcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1N0b3BFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdTdG9wRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RvcEV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG5EcmFnU3RvcEV2ZW50LnR5cGUgPSAnZHJhZzpzdG9wJztcblxuLyoqKi8gfSksXG4vKiA1NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5EcmFnZ2FibGVEZXN0cm95RXZlbnQgPSBleHBvcnRzLkRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQgPSBleHBvcnRzLkRyYWdnYWJsZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9hYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9hYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRHJhZ2dhYmxlRXZlbnQgPSBleHBvcnRzLkRyYWdnYWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdnYWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ2dhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ2dhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnZ2FibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdnYWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnZ2FibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnZ2FibGUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnZ2FibGU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnZ2FibGVFdmVudDtcbn0oX2Fic3RyYWN0RXZlbnQyLmRlZmF1bHQpO1xuXG5EcmFnZ2FibGVFdmVudC50eXBlID0gJ2RyYWdnYWJsZSc7XG5cbnZhciBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnZ2FibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50LCBfRHJhZ2dhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudDtcbn0oRHJhZ2dhYmxlRXZlbnQpO1xuXG5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50LnR5cGUgPSAnZHJhZ2dhYmxlOmluaXRpYWxpemUnO1xuXG52YXIgRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVEZXN0cm95RXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdnYWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnZ2FibGVEZXN0cm95RXZlbnQsIF9EcmFnZ2FibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZURlc3Ryb3lFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnZ2FibGVEZXN0cm95RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnZ2FibGVEZXN0cm95RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnZ2FibGVEZXN0cm95RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnZ2FibGVEZXN0cm95RXZlbnQ7XG59KERyYWdnYWJsZUV2ZW50KTtcblxuRHJhZ2dhYmxlRGVzdHJveUV2ZW50LnR5cGUgPSAnZHJhZ2dhYmxlOmRlc3Ryb3knO1xuXG4vKioqLyB9KSxcbi8qIDU4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRyb3BwYWJsZU91dEV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVPdmVyRXZlbnQgPSBleHBvcnRzLkRyb3BwYWJsZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9hYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9hYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRHJvcHBhYmxlRXZlbnQgPSBleHBvcnRzLkRyb3BwYWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyb3BwYWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJvcHBhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcm9wcGFibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcm9wcGFibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZHJvcHBhYmxlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJvcHBhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJvcHBhYmxlRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxuRHJvcHBhYmxlRXZlbnQudHlwZSA9ICdkcm9wcGFibGUnO1xuXG52YXIgRHJvcHBhYmxlT3ZlckV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVPdmVyRXZlbnQgPSBmdW5jdGlvbiAoX0Ryb3BwYWJsZUV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyb3BwYWJsZU92ZXJFdmVudCwgX0Ryb3BwYWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBEcm9wcGFibGVPdmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlT3ZlckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJvcHBhYmxlT3ZlckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJvcHBhYmxlT3ZlckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJvcHBhYmxlT3ZlckV2ZW50O1xufShEcm9wcGFibGVFdmVudCk7XG5cbkRyb3BwYWJsZU92ZXJFdmVudC50eXBlID0gJ2Ryb3BwYWJsZTpvdmVyJztcblxudmFyIERyb3BwYWJsZU91dEV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVPdXRFdmVudCA9IGZ1bmN0aW9uIChfRHJvcHBhYmxlRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyb3BwYWJsZU91dEV2ZW50LCBfRHJvcHBhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBEcm9wcGFibGVPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcm9wcGFibGVPdXRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyb3BwYWJsZU91dEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJvcHBhYmxlT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcm9wcGFibGVPdXRFdmVudDtcbn0oRHJvcHBhYmxlRXZlbnQpO1xuXG5Ecm9wcGFibGVPdXRFdmVudC50eXBlID0gJ2Ryb3BwYWJsZTpvdXQnO1xuXG4vKioqLyB9KSxcbi8qIDU5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk1pcnJvckRlc3Ryb3lFdmVudCA9IGV4cG9ydHMuTWlycm9yTW92ZUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JBdHRhY2hlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JDcmVhdGVkRXZlbnQgPSBleHBvcnRzLk1pcnJvckV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9hYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9hYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgTWlycm9yRXZlbnQgPSBleHBvcnRzLk1pcnJvckV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShNaXJyb3JFdmVudCwgW3tcbiAgICBrZXk6ICdzb3VyY2UnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbWlycm9yJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubWlycm9yO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NvdXJjZUNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNvdXJjZUNvbnRhaW5lcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZW5zb3JFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNlbnNvckV2ZW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29yaWdpbmFsRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgaWYgKHRoaXMuc2Vuc29yRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNaXJyb3JFdmVudDtcbn0oX2Fic3RyYWN0RXZlbnQyLmRlZmF1bHQpO1xuXG52YXIgTWlycm9yQ3JlYXRlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JDcmVhdGVkRXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckNyZWF0ZWRFdmVudCwgX01pcnJvckV2ZW50KTtcblxuICBmdW5jdGlvbiBNaXJyb3JDcmVhdGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yQ3JlYXRlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yQ3JlYXRlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWlycm9yQ3JlYXRlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gTWlycm9yQ3JlYXRlZEV2ZW50O1xufShNaXJyb3JFdmVudCk7XG5cbk1pcnJvckNyZWF0ZWRFdmVudC50eXBlID0gJ21pcnJvcjpjcmVhdGVkJztcblxudmFyIE1pcnJvckF0dGFjaGVkRXZlbnQgPSBleHBvcnRzLk1pcnJvckF0dGFjaGVkRXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JBdHRhY2hlZEV2ZW50LCBfTWlycm9yRXZlbnQyKTtcblxuICBmdW5jdGlvbiBNaXJyb3JBdHRhY2hlZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckF0dGFjaGVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JBdHRhY2hlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWlycm9yQXR0YWNoZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIE1pcnJvckF0dGFjaGVkRXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuTWlycm9yQXR0YWNoZWRFdmVudC50eXBlID0gJ21pcnJvcjphdHRhY2hlZCc7XG5cbnZhciBNaXJyb3JNb3ZlRXZlbnQgPSBleHBvcnRzLk1pcnJvck1vdmVFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvck1vdmVFdmVudCwgX01pcnJvckV2ZW50Myk7XG5cbiAgZnVuY3Rpb24gTWlycm9yTW92ZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvck1vdmVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvck1vdmVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvck1vdmVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIE1pcnJvck1vdmVFdmVudDtcbn0oTWlycm9yRXZlbnQpO1xuXG5NaXJyb3JNb3ZlRXZlbnQudHlwZSA9ICdtaXJyb3I6bW92ZSc7XG5cbnZhciBNaXJyb3JEZXN0cm95RXZlbnQgPSBleHBvcnRzLk1pcnJvckRlc3Ryb3lFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckRlc3Ryb3lFdmVudCwgX01pcnJvckV2ZW50NCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yRGVzdHJveUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckRlc3Ryb3lFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvckRlc3Ryb3lFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckRlc3Ryb3lFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIE1pcnJvckRlc3Ryb3lFdmVudDtcbn0oTWlycm9yRXZlbnQpO1xuXG5NaXJyb3JEZXN0cm95RXZlbnQudHlwZSA9ICdtaXJyb3I6ZGVzdHJveSc7XG5cbi8qKiovIH0pLFxuLyogNjAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU25hcE91dEV2ZW50ID0gZXhwb3J0cy5TbmFwSW5FdmVudCA9IGV4cG9ydHMuU25hcEV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9hYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9hYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU25hcEV2ZW50ID0gZXhwb3J0cy5TbmFwRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU25hcEV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU25hcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNuYXBFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNuYXBFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNuYXBFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU25hcEV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNuYXBFdmVudDtcbn0oX2Fic3RyYWN0RXZlbnQyLmRlZmF1bHQpO1xuXG52YXIgU25hcEluRXZlbnQgPSBleHBvcnRzLlNuYXBJbkV2ZW50ID0gZnVuY3Rpb24gKF9TbmFwRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU25hcEluRXZlbnQsIF9TbmFwRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFNuYXBJbkV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNuYXBJbkV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU25hcEluRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTbmFwSW5FdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIFNuYXBJbkV2ZW50O1xufShTbmFwRXZlbnQpO1xuXG5TbmFwSW5FdmVudC50eXBlID0gJ3NuYXA6aW4nO1xuXG52YXIgU25hcE91dEV2ZW50ID0gZXhwb3J0cy5TbmFwT3V0RXZlbnQgPSBmdW5jdGlvbiAoX1NuYXBFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU25hcE91dEV2ZW50LCBfU25hcEV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gU25hcE91dEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNuYXBPdXRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNuYXBPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNuYXBPdXRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIFNuYXBPdXRFdmVudDtcbn0oU25hcEV2ZW50KTtcblxuU25hcE91dEV2ZW50LnR5cGUgPSAnc25hcDpvdXQnO1xuXG4vKioqLyB9KSxcbi8qIDYxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNvcnRhYmxlU3RvcEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVNvcnRlZEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVN0YXJ0RXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX2Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWJzdHJhY3RFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTb3J0YWJsZUV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNvcnRhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTb3J0YWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZUV2ZW50O1xufShfYWJzdHJhY3RFdmVudDIuZGVmYXVsdCk7XG5cbnZhciBTb3J0YWJsZVN0YXJ0RXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU3RhcnRFdmVudCA9IGZ1bmN0aW9uIChfU29ydGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZVN0YXJ0RXZlbnQsIF9Tb3J0YWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZVN0YXJ0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU29ydGFibGVTdGFydEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGVTdGFydEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVTdGFydEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZVN0YXJ0RXZlbnQsIFt7XG4gICAga2V5OiAnc3RhcnRJbmRleCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnN0YXJ0SW5kZXg7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZVN0YXJ0RXZlbnQ7XG59KFNvcnRhYmxlRXZlbnQpO1xuXG5Tb3J0YWJsZVN0YXJ0RXZlbnQudHlwZSA9ICdzb3J0YWJsZTpzdGFydCc7XG5cbnZhciBTb3J0YWJsZVNvcnRlZEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVNvcnRlZEV2ZW50ID0gZnVuY3Rpb24gKF9Tb3J0YWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZVNvcnRlZEV2ZW50LCBfU29ydGFibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIFNvcnRhYmxlU29ydGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU29ydGFibGVTb3J0ZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlU29ydGVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTb3J0YWJsZVNvcnRlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZVNvcnRlZEV2ZW50LCBbe1xuICAgIGtleTogJ21vdmVzJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubW92ZXM7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZVNvcnRlZEV2ZW50O1xufShTb3J0YWJsZUV2ZW50KTtcblxuU29ydGFibGVTb3J0ZWRFdmVudC50eXBlID0gJ3NvcnRhYmxlOnNvcnRlZCc7XG5cbnZhciBTb3J0YWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTdG9wRXZlbnQgPSBmdW5jdGlvbiAoX1NvcnRhYmxlRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNvcnRhYmxlU3RvcEV2ZW50LCBfU29ydGFibGVFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIFNvcnRhYmxlU3RvcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlU3RvcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGVTdG9wRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTb3J0YWJsZVN0b3BFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVTdG9wRXZlbnQsIFt7XG4gICAga2V5OiAnb2xkSW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vbGRJbmRleDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICduZXdJbmRleCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm5ld0luZGV4O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVTdG9wRXZlbnQ7XG59KFNvcnRhYmxlRXZlbnQpO1xuXG5Tb3J0YWJsZVN0b3BFdmVudC50eXBlID0gJ3NvcnRhYmxlOnN0b3AnO1xuXG4vKioqLyB9KSxcbi8qIDYyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlN3YXBwYWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN3YXBwYWJsZUV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3dhcHBhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3dhcHBhYmxlRXZlbnQ7XG59KF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0KTtcblxudmFyIFN3YXBwYWJsZVN0YXJ0RXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN0YXJ0RXZlbnQgPSBmdW5jdGlvbiAoX1N3YXBwYWJsZUV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZVN0YXJ0RXZlbnQsIF9Td2FwcGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlU3RhcnRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGVTdGFydEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3RhcnRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZVN0YXJ0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBTd2FwcGFibGVTdGFydEV2ZW50O1xufShTd2FwcGFibGVFdmVudCk7XG5cblN3YXBwYWJsZVN0YXJ0RXZlbnQudHlwZSA9ICdzd2FwcGFibGU6c3RhcnQnO1xuXG52YXIgU3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTd2FwcGVkRXZlbnQgPSBmdW5jdGlvbiAoX1N3YXBwYWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGVTd2FwcGVkRXZlbnQsIF9Td2FwcGFibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZVN3YXBwZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGVTd2FwcGVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGVTd2FwcGVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGVTd2FwcGVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBwYWJsZVN3YXBwZWRFdmVudCwgW3tcbiAgICBrZXk6ICdzd2FwcGVkRWxlbWVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnN3YXBwZWRFbGVtZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3dhcHBhYmxlU3dhcHBlZEV2ZW50O1xufShTd2FwcGFibGVFdmVudCk7XG5cblN3YXBwYWJsZVN3YXBwZWRFdmVudC50eXBlID0gJ3N3YXBwYWJsZTpzd2FwcGVkJztcblxudmFyIFN3YXBwYWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3RvcEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3RvcEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQzKTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTdG9wRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3RvcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3RvcEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3RvcEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gU3dhcHBhYmxlU3RvcEV2ZW50O1xufShTd2FwcGFibGVFdmVudCk7XG5cblN3YXBwYWJsZVN0b3BFdmVudC50eXBlID0gJ3N3YXBwYWJsZTpzdG9wJztcblxuLyoqKi8gfSksXG4vKiA2MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5BYnN0cmFjdEV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGUgPSBleHBvcnRzLlN3YXBwYWJsZSA9IGV4cG9ydHMuU29ydGFibGUgPSBleHBvcnRzLkRyYWdnYWJsZSA9IHVuZGVmaW5lZDtcbmV4cG9ydHMuY3JlYXRlRXZlbnRDbGFzcyA9IGNyZWF0ZUV2ZW50Q2xhc3M7XG5cbnZhciBfZHJhZ2dhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cbnZhciBfZHJhZ2dhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYWdnYWJsZSk7XG5cbnZhciBfc29ydGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ5KTtcblxudmFyIF9zb3J0YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zb3J0YWJsZSk7XG5cbnZhciBfc3dhcHBhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MCk7XG5cbnZhciBfc3dhcHBhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N3YXBwYWJsZSk7XG5cbnZhciBfZHJvcHBhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OCk7XG5cbnZhciBfZHJvcHBhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Ryb3BwYWJsZSk7XG5cbnZhciBfYWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfYWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5EcmFnZ2FibGUgPSBfZHJhZ2dhYmxlMi5kZWZhdWx0O1xuZXhwb3J0cy5Tb3J0YWJsZSA9IF9zb3J0YWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuU3dhcHBhYmxlID0gX3N3YXBwYWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuRHJvcHBhYmxlID0gX2Ryb3BwYWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuQWJzdHJhY3RFdmVudCA9IF9hYnN0cmFjdEV2ZW50Mi5kZWZhdWx0O1xuZnVuY3Rpb24gY3JlYXRlRXZlbnRDbGFzcyhvcHRpb25zKSB7XG4gIGZ1bmN0aW9uIEV2ZW50Q29uc3RydWN0b3IoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgRXZlbnRDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBfYWJzdHJhY3RFdmVudDIuZGVmYXVsdC5wcm90b3R5cGU7XG4gIGNyZWF0ZUV2ZW50Q2xhc3MudHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgcmV0dXJuIGNyZWF0ZUV2ZW50Q2xhc3M7XG59XG5cbi8qKiovIH0pLFxuLyogNjQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfc2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfc2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NlbnNvcik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblxudmFyIF9zZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRHJhZ1NlbnNvciA9IGZ1bmN0aW9uIChfU2Vuc29yKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIGZ1bmN0aW9uIERyYWdTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU2Vuc29yKTtcblxuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIF90aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuXG4gICAgX3RoaXMuX29uTW91c2VEb3duID0gX3RoaXMuX29uTW91c2VEb3duLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vbk1vdXNlVXAgPSBfdGhpcy5fb25Nb3VzZVVwLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vbkRyYWdTdGFydCA9IF90aGlzLl9vbkRyYWdTdGFydC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25EcmFnT3ZlciA9IF90aGlzLl9vbkRyYWdPdmVyLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vbkRyYWdFbmQgPSBfdGhpcy5fb25EcmFnRW5kLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vbkRyYWdEcm9wID0gX3RoaXMuX29uRHJhZ0Ryb3AuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ1NlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0LCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5fb25EcmFnT3ZlciwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5fb25EcmFnRW5kLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLl9vbkRyYWdEcm9wLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwLCB0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuX29uRHJhZ092ZXIsIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuX29uRHJhZ0VuZCwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5fb25EcmFnRHJvcCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXAsIHRydWUpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGVcblxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAvLyBOZWVkIGZvciBmaXJlZm94LiBcInRleHRcIiBrZXkgaXMgbmVlZGVkIGZvciBJRVxuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnJyk7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9IHRoaXMub3B0aW9ucy50eXBlO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICBpZiAoZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIC8vIHByZXZlbnQgZHJhZyBldmVudCBpZiBmaXJlZCBldmVudCBoYXMgYmVlbiBwcmV2ZW50ZWRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnTW92ZVNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvdmVyQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG5cbiAgICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcblxuICAgICAgaWYgKCFkcmFnTW92ZUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSB0aGlzLm9wdGlvbnMudHlwZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnRW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ0VuZChldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gcHJldmVudCBjbGljayBvbiBkcm9wIGlmIGRyYWdnYWJsZSBjb250YWlucyBhIGNsaWNrYWJsZSBlbGVtZW50XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgdmFyIGRyYWdTdG9wRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdTdG9wU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdEcm9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ0Ryb3AoZXZlbnQpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZURvd24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICAgIC8vIEZpcmVmb3ggYnVnIGZvciBpbnB1dHMgd2l0aGluIGRyYWdnYWJsZXMgaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NzM5MDcxXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIChldmVudC50YXJnZXQuZm9ybSB8fCBldmVudC50YXJnZXQuY29udGVudGVkaXRhYmxlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGV2ZW50LnRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSk7XG5cbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubW91c2VEb3duVGltZW91dCk7XG5cbiAgICAgICAgdGhpcy5tb3VzZURvd25UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGFyZ2V0LmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5kZWxheSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VVcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLm1vdXNlRG93blRpbWVvdXQpO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldC5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdTZW5zb3I7XG59KF9zZW5zb3IyLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcmFnU2Vuc29yO1xuXG4vKioqLyB9KSxcbi8qIDY1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3NlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgX3NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZW5zb3IpO1xuXG52YXIgX3NlbnNvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBGb3JjZVRvdWNoU2Vuc29yID0gZnVuY3Rpb24gKF9TZW5zb3IpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRm9yY2VUb3VjaFNlbnNvciwgX1NlbnNvcik7XG5cbiAgZnVuY3Rpb24gRm9yY2VUb3VjaFNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEZvcmNlVG91Y2hTZW5zb3IpO1xuXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRm9yY2VUb3VjaFNlbnNvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEZvcmNlVG91Y2hTZW5zb3IpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgX3RoaXMubWlnaHREcmFnID0gZmFsc2U7XG4gICAgX3RoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG5cbiAgICBfdGhpcy5fb25Nb3VzZUZvcmNlV2lsbEJlZ2luID0gX3RoaXMuX29uTW91c2VGb3JjZVdpbGxCZWdpbi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZUZvcmNlRG93biA9IF90aGlzLl9vbk1vdXNlRm9yY2VEb3duLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vbk1vdXNlRG93biA9IF90aGlzLl9vbk1vdXNlRG93bi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZUZvcmNlQ2hhbmdlID0gX3RoaXMuX29uTW91c2VGb3JjZUNoYW5nZS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZU1vdmUgPSBfdGhpcy5fb25Nb3VzZU1vdmUuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uTW91c2VVcCA9IF90aGlzLl9vbk1vdXNlVXAuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRm9yY2VUb3VjaFNlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNld2lsbGJlZ2luJywgdGhpcy5fb25Nb3VzZUZvcmNlV2lsbEJlZ2luLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2Vkb3duJywgdGhpcy5fb25Nb3VzZUZvcmNlRG93biwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2VjaGFuZ2VkJywgdGhpcy5fb25Nb3VzZUZvcmNlQ2hhbmdlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZXdpbGxiZWdpbicsIHRoaXMuX29uTW91c2VGb3JjZVdpbGxCZWdpbiwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlZG93bicsIHRoaXMuX29uTW91c2VGb3JjZURvd24sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlY2hhbmdlZCcsIHRoaXMuX29uTW91c2VGb3JjZUNoYW5nZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlRm9yY2VXaWxsQmVnaW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZUZvcmNlV2lsbEJlZ2luKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5taWdodERyYWcgPSB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlRm9yY2VEb3duJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VGb3JjZURvd24oZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgdmFyIGRyYWdTdGFydEV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnU3RhcnRTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnU3RhcnRFdmVudCk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSAhZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKTtcbiAgICAgIHRoaXMubWlnaHREcmFnID0gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VVcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlVXAoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMubWlnaHREcmFnID0gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VEb3duJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMubWlnaHREcmFnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTmVlZCB3b3JrYXJvdW5kIGZvciByZWFsIGNsaWNrXG4gICAgICAvLyBDYW5jZWwgcG90ZW50aWFsIGRyYWcgZXZlbnRzXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZU1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnTW92ZUV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZUZvcmNlQ2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VGb3JjZUNoYW5nZShldmVudCkge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgdmFyIGNvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnUHJlc3N1cmVFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQoe1xuICAgICAgICBwcmVzc3VyZTogZXZlbnQud2Via2l0Rm9yY2UsXG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnUHJlc3N1cmVFdmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VGb3JjZUdsb2JhbENoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRm9yY2VHbG9iYWxDaGFuZ2UoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnUHJlc3N1cmVFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQoe1xuICAgICAgICBwcmVzc3VyZTogZXZlbnQud2Via2l0Rm9yY2UsXG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnUHJlc3N1cmVFdmVudCk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBGb3JjZVRvdWNoU2Vuc29yO1xufShfc2Vuc29yMi5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRm9yY2VUb3VjaFNlbnNvcjtcblxuLyoqKi8gfSksXG4vKiA2NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9zZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9zZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Vuc29yKTtcblxudmFyIF9zZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgTW91c2VTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNb3VzZVNlbnNvciwgX1NlbnNvcik7XG5cbiAgZnVuY3Rpb24gTW91c2VTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNb3VzZVNlbnNvcik7XG5cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNb3VzZVNlbnNvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vdXNlU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIF90aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICAgIF90aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuXG4gICAgX3RoaXMuX29uTW91c2VEb3duID0gX3RoaXMuX29uTW91c2VEb3duLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vbk1vdXNlTW92ZSA9IF90aGlzLl9vbk1vdXNlTW92ZS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25Nb3VzZVVwID0gX3RoaXMuX29uTW91c2VVcC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShNb3VzZVNlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlRG93bicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRG93bihldmVudCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmIChldmVudC5idXR0b24gPT09IDIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5tb3VzZURvd25UaW1lb3V0KTtcbiAgICAgIHRoaXMubW91c2VEb3duVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIV90aGlzMi5tb3VzZURvd24pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnU3RhcnRFdmVudCk7XG5cbiAgICAgICAgX3RoaXMyLmN1cnJlbnRDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIF90aGlzMi5kcmFnZ2luZyA9ICFkcmFnU3RhcnRFdmVudC5jYW5jZWxlZCgpO1xuICAgICAgfSwgdGhpcy5vcHRpb25zLmRlbGF5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZU1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnTW92ZUV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZVVwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VVcChldmVudCkge1xuICAgICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcblxuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9zZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTW91c2VTZW5zb3I7XG59KF9zZW5zb3IyLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNb3VzZVNlbnNvcjtcblxuLyoqKi8gfSksXG4vKiA2NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9zZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9zZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Vuc29yKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xuXG52YXIgX3NlbnNvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBUb3VjaFNlbnNvciA9IGZ1bmN0aW9uIChfU2Vuc29yKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFRvdWNoU2Vuc29yLCBfU2Vuc29yKTtcblxuICBmdW5jdGlvbiBUb3VjaFNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFRvdWNoU2Vuc29yKTtcblxuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFRvdWNoU2Vuc29yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVG91Y2hTZW5zb3IpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgX3RoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gICAgX3RoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQgPSBudWxsO1xuXG4gICAgX3RoaXMuX29uVG91Y2hTdGFydCA9IF90aGlzLl9vblRvdWNoU3RhcnQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uVG91Y2hIb2xkID0gX3RoaXMuX29uVG91Y2hIb2xkLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblRvdWNoRW5kID0gX3RoaXMuX29uVG91Y2hFbmQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uVG91Y2hNb3ZlID0gX3RoaXMuX29uVG91Y2hNb3ZlLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShUb3VjaFNlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fb25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLl9vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSwgZmFsc2UpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNjcm9sbCgpIHtcbiAgICAgIC8vIENhbmNlbCBwb3RlbnRpYWwgZHJhZyBhbmQgYWxsb3cgc2Nyb2xsIG9uIGlPUyBvciBvdGhlciB0b3VjaCBkZXZpY2VzXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50YXBUaW1lb3V0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Ub3VjaFN0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICAvLyBkZXRlY3QgaWYgYm9keSBpcyBzY3JvbGxpbmcgb24gaU9TXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9vblNjcm9sbCk7XG4gICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBfb25Db250ZXh0TWVudSk7XG5cbiAgICAgIHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGNvbnRhaW5lciwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IDwgZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9vblNjcm9sbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudGFwVGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5fb25Ub3VjaEhvbGQoZXZlbnQsIGNvbnRhaW5lciksIHRoaXMub3B0aW9ucy5kZWxheSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hIb2xkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uVG91Y2hIb2xkKGV2ZW50LCBjb250YWluZXIpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICAgIGNsaWVudFg6IHRvdWNoLnBhZ2VYLFxuICAgICAgICAgIGNsaWVudFk6IHRvdWNoLnBhZ2VZLFxuICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICAgIF90aGlzMi5jdXJyZW50Q29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBfdGhpczIuZHJhZ2dpbmcgPSAhZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHRvdWNoLnBhZ2VYIC0gd2luZG93LnNjcm9sbFgsIHRvdWNoLnBhZ2VZIC0gd2luZG93LnNjcm9sbFkpO1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfc2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IHRvdWNoLnBhZ2VYLFxuICAgICAgICBjbGllbnRZOiB0b3VjaC5wYWdlWSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblRvdWNoRW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9vblNjcm9sbCk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBfb25Db250ZXh0TWVudSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50YXBUaW1lb3V0KTtcblxuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIGRyYWdTdG9wRXZlbnQgPSBuZXcgX3NlbnNvckV2ZW50LkRyYWdTdG9wU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgY2xpZW50WTogdG91Y2gucGFnZVksXG4gICAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUb3VjaFNlbnNvcjtcbn0oX3NlbnNvcjIuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRvdWNoU2Vuc29yO1xuXG5cbmZ1bmN0aW9uIF9vbkNvbnRleHRNZW51KGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8qKiovIH0pLFxuLyogNjggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDczKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDY5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg3NCksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA3MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oNzUpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogNzEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDc2KSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDcyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg3NyksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA3MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDk4KTtcbnZhciAkT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCkuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNzQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg5OSk7XG52YXIgJE9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuLyoqKi8gfSksXG4vKiA3NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDEwMCk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTApLk9iamVjdC5zZXRQcm90b3R5cGVPZjtcblxuLyoqKi8gfSksXG4vKiA3NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDEwMyk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDEwMSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDEwNCk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDEwNSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTApLlN5bWJvbDtcblxuLyoqKi8gfSksXG4vKiA3NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDEwMik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDEwNik7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpLmYoJ2l0ZXJhdG9yJyk7XG5cbi8qKiovIH0pLFxuLyogNzggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cbi8qKiovIH0pLFxuLyogNzkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xuXG4vKioqLyB9KSxcbi8qIDgwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIHRvTGVuZ3RoICA9IF9fd2VicGFja19yZXF1aXJlX18oOTUpXG4gICwgdG9JbmRleCAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5NCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG4vKioqLyB9KSxcbi8qIDgxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpXG4gICwgZ09QUyAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDUpXG4gICwgcElFICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjkpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciByZXN1bHQgICAgID0gZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9IHBJRS5mXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqKi8gfSksXG4vKiA4MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNSkuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4vKioqLyB9KSxcbi8qIDgzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOCk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDg0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOCk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG5cbi8qKiovIH0pLFxuLyogODUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjcmVhdGUgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpXG4gICwgZGVzY3JpcHRvciAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxuICAsIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMClcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxuX193ZWJwYWNrX3JlcXVpcmVfXygxMSkoSXRlcmF0b3JQcm90b3R5cGUsIF9fd2VicGFja19yZXF1aXJlX18oMTIpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcblxuLyoqKi8gfSksXG4vKiA4NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59O1xuXG4vKioqLyB9KSxcbi8qIDg3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnZXRLZXlzICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuICAsIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDg4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBNRVRBICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpXG4gICwgaGFzICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgc2V0RGVzYyAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIV9fd2VicGFja19yZXF1aXJlX18oMjApKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24oaXQpe1xuICBzZXREZXNjKGl0LCBNRVRBLCB7dmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9fSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKXNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiAgICAgIE1FVEEsXG4gIE5FRUQ6ICAgICBmYWxzZSxcbiAgZmFzdEtleTogIGZhc3RLZXksXG4gIGdldFdlYWs6ICBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG5cbi8qKiovIH0pLFxuLyogODkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRQICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KVxuICAsIGFuT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcbiAgLCBnZXRLZXlzICA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNikgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuLyoqKi8gfSksXG4vKiA5MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIGdPUE4gICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDQpLmZcbiAgLCB0b1N0cmluZyAgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiA5MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIHRvT2JqZWN0ICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5NilcbiAgLCBJRV9QUk9UTyAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzEpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuLyoqKi8gfSksXG4vKiA5MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuICAsIGFuT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uKHRlc3QsIGJ1Z2d5LCBzZXQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSkoRnVuY3Rpb24uY2FsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyg0MykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG4vKioqLyB9KSxcbi8qIDkzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciB0b0ludGVnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMzKVxuICAsIGRlZmluZWQgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiA5NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cbi8qKiovIH0pLFxuLyogOTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuLyoqKi8gfSksXG4vKiA5NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuLyoqKi8gfSksXG4vKiA5NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGFkZFRvVW5zY29wYWJsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc5KVxuICAsIHN0ZXAgICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg2KVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KVxuICAsIHRvSU9iamVjdCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNDIpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG4vKioqLyB9KSxcbi8qIDk4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KX0pO1xuXG4vKioqLyB9KSxcbi8qIDk5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhX193ZWJwYWNrX3JlcXVpcmVfXyg2KSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogX193ZWJwYWNrX3JlcXVpcmVfXyg4KS5mfSk7XG5cbi8qKiovIH0pLFxuLyogMTAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IF9fd2VicGFja19yZXF1aXJlX18oOTIpLnNldH0pO1xuXG4vKioqLyB9KSxcbi8qIDEwMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cblxuLyoqKi8gfSksXG4vKiAxMDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciAkYXQgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5MykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbl9fd2VicGFja19yZXF1aXJlX18oNDIpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG4vKioqLyB9KSxcbi8qIDEwMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KVxuICAsIGhhcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIERFU0NSSVBUT1JTICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KVxuICAsICRleHBvcnQgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcbiAgLCByZWRlZmluZSAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDcpXG4gICwgTUVUQSAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg4KS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG4gICwgc2hhcmVkICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKVxuICAsIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMClcbiAgLCB1aWQgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpXG4gICwgd2tzICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuICAsIHdrc0V4dCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNilcbiAgLCB3a3NEZWZpbmUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzUpXG4gICwga2V5T2YgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg3KVxuICAsIGVudW1LZXlzICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MSlcbiAgLCBpc0FycmF5ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oODQpXG4gICwgYW5PYmplY3QgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuICAsIHRvSU9iamVjdCAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIHRvUHJpbWl0aXZlICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNClcbiAgLCBjcmVhdGVEZXNjICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpXG4gICwgX2NyZWF0ZSAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuICAsIGdPUE5FeHQgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5MClcbiAgLCAkR09QRCAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDMpXG4gICwgJERQICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpXG4gICwgJGtleXMgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgVE9fUFJJTUlUSVZFICAgPSB3a3MoJ3RvUHJpbWl0aXZlJylcbiAgLCBpc0VudW0gICAgICAgICA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIE9QU3ltYm9scyAgICAgID0gc2hhcmVkKCdvcC1zeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvKSRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIGl0ICA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBJU19PUCAgPSBpdCA9PT0gT2JqZWN0UHJvdG9cbiAgICAsIG5hbWVzICA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIVVTRV9OQVRJVkUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZih0aGlzID09PSBPYmplY3RQcm90bykkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKXNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0fSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgX193ZWJwYWNrX3JlcXVpcmVfXyg0NCkuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgX193ZWJwYWNrX3JlcXVpcmVfXyg0NSkuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIV9fd2VicGFja19yZXF1aXJlX18oMjcpKXtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24obmFtZSl7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfVxufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbmZvcih2YXIgc3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzKHN5bWJvbHNbaSsrXSk7XG5cbmZvcih2YXIgc3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3NEZWZpbmUoc3ltYm9sc1tpKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICBpZihpc1N5bWJvbChrZXkpKXJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgICB0aHJvdyBUeXBlRXJyb3Ioa2V5ICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgICAsIGkgICAgPSAxXG4gICAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZighaXNTeW1ib2wodmFsdWUpKXJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcblxuLyoqKi8gfSksXG4vKiAxMDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygzNSkoJ2FzeW5jSXRlcmF0b3InKTtcblxuLyoqKi8gfSksXG4vKiAxMDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygzNSkoJ29ic2VydmFibGUnKTtcblxuLyoqKi8gfSksXG4vKiAxMDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg5Nyk7XG52YXIgZ2xvYmFsICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcbiAgLCBoaWRlICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSlcbiAgLCBJdGVyYXRvcnMgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNilcbiAgLCBUT19TVFJJTkdfVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMikoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9kcmFnZ2FibGUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9