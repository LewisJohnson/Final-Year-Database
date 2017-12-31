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
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shopify_draggable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shopify_draggable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shopify_draggable__);


$(function () {
	"use strict";

	/* FILE STRUCTURE
 
 1. AJAX Setup
 2. HTML Modifications
 3. Helper Functions
 4. Components
 	4.1 Mobile Menu
 	4.2 Dialog / Modal
 	4.3 Data Table
 	4.4 Project Topics [Supervisor]
 	4.5 Forms / AJAX Functions
 	4.6 Edit Topics [Admin]
 5. Second Marker
 6. Dynamic Pagination
 7. Supervisor
 8. Other
 9. Initialise Everything
 */

	/* ================
 	1. AJAX Setup
    ================ */

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
			'MADE-BY': 'Lewis Johnson'
		}
	});

	/* ========================
 	2. HTML Modifications
    ======================== */
	$('body').append('<div class="underlay"></div>');

	/* ======================
 	3. Helpers Functions
    ====================== */
	function removeAllShadowClasses(element) {
		$(element).removeClass(function (index, className) {
			return (className.match(/\bshadow\-\S+/g) || []).join(' ');
		});
	}

	/* ===============
 	4. Components
    =============== */

	/* ==================
 	 4.1 Mobile Menu
    ================== */

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

	/* ====================
 	4.2 Dialog / Modal
    ==================== */
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

	/* ================
 	4.3 Data Table
    ================ */

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

	/* =================================
 	4.4 Project Topics [Supervisor]
    ================================= */

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
			var ajaxUrl = "/projects/topic-add";
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
			var ajaxUrl = "/projects/topic-remove";
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
			var ajaxUrl = "/projects/topic-update-primary";
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

	var swappable = new __WEBPACK_IMPORTED_MODULE_0__shopify_draggable__["Swappable"](document.querySelectorAll('.topics-list.edit'), {
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

	/* ============================
 	4.5 Forms / AJAX Functions
    ============================ */

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

	/* ========================
    4.6 Edit Topics [Admin]
    ======================== */

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

	/* ==================
 	5. Second Marker
    ================== */

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
		var ajaxUrl = "/projects/marker-assign";

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

	/* =========================
 	6. Dynamic Pagination
    ========================= */
	var projects_pageNumber = 2,
	    projects_endOfTable = false,
	    projects_awaitingResponse = false;

	$(window).scroll(function () {
		if ($(window).scrollTop() + $(window).height() == $(document).height()) {

			if (!$('#project-table').hasClass("index")) {
				return;
			}

			if (!projects_endOfTable && !projects_awaitingResponse) {
				$(".loader.projects").show();
				projects_awaitingResponse = true;
				var urlPath = "/projects?partial=true?page=" + projects_pageNumber;
				$.ajax({
					type: 'GET',
					url: urlPath,
					success: function success(data) {
						$(".loader.projects").hide();
						if (data.length == 0) {
							projects_endOfTable = true;
							$('#project-table').after('<div style="width: 10px;height: 10px;margin: 1rem auto;background: rgba(0, 0, 0, 0.07);border: 1px solid rgba(0, 0, 0, 0.11);border-radius: 90px;"></div>');
						} else {
							$('#project-table tbody').append($(data));
							window.history.replaceState("", "", "/projects?page=" + projects_pageNumber);
						}
						projects_pageNumber += 1;
					},
					error: function error(data) {
						$('#project-table').after('<p style="margin:1rem auto;text-align:center;color:#e00;">There\'s a problem reaching the server.</p>');
						projects_awaitingResponse = false;
						$(".loader.projects").hide();
					}
				}).done(function (data) {
					projects_awaitingResponse = false;
					$(".loader.projects").hide();
				});
			} else {
				$(".loader.projects").hide();
			}
		}
	});

	var agents_pageNumber = 2,
	    agents_endOfTable = false,
	    agents_awaitingResponse = false;

	$(window).scroll(function () {
		if ($(window).scrollTop() + $(window).height() == $(document).height()) {

			if (!$('#user-agent-table')) {
				return;
			}

			if (!agents_endOfTable && !agents_awaitingResponse) {
				$(".loader.user-agent").show();
				agents_awaitingResponse = true;
				var urlPath = "/system/user-agent?partial=true?page=" + agents_pageNumber;
				$.ajax({
					type: 'GET',
					url: urlPath,
					success: function success(data) {
						$(".loader.user-agent").hide();

						if (data.length == 0) {
							agents_endOfTable = true;
							$('#user-agent-table').after('<div style="width: 10px;height: 10px;margin: 1rem auto;background: rgba(0, 0, 0, 0.07);border: 1px solid rgba(0, 0, 0, 0.11);border-radius: 90px;"></div>');
						} else {
							$('#user-agent-table tbody').append($(data));
							window.history.replaceState("", "", "/system/user-agent?page=" + agents_pageNumber);
						}

						agents_pageNumber += 1;
					},
					error: function error(data) {
						$('#user-agent-table').after('<p style="margin:1rem auto;text-align:center;color:#e00;">There\'s a problem reaching the server.</p>');
						agents_awaitingResponse = false;
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

	/* ======================
 	 7. SUPERVISOR
    ====================== */
	// Accept Student
	$('.supervisor-table .accept').on('click', function () {
		var student_id = $(this).data('student_id');
		$.ajax({
			method: 'POST',
			url: '/supervisor/student-accept',
			data: {
				student_id: student_id
			},
			success: function success() {}
		});
	});

	// Reject Student
	$('.supervisor-table .reject').on('click', function () {
		rejectStudent($(this).data('student_id'), $(this).data('project_id'));
	});

	$('#deleteProjectButton').on('click', function () {
		AjaxFunctions.prototype.deleteProject($('#title').val());
	});

	function acceptStudent(student_id) {}

	function rejectStudent(student_id, project_id) {
		$.ajax({
			method: 'POST',
			url: '/supervisor/student-reject',
			data: {
				project_id: project_id,
				student_id: student_id
			},
			success: function success() {}
		});
	}

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

	/* ======================
 	 8. OTHER
    ====================== */
	$('.show-more').on('click', function (e) {
		$(this).hide();
		$('.project').addClass('expand');
	});

	// Makes primary topic first
	$(".topics-list").prepend($(".first"));

	// SUPERVISOR


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

	/* ===============
 	9. Initialise
    =============== */
	MobileMenu.prototype.initAll();
	Dialog.prototype.initAll();
	DataTable.prototype.initAll();
	EditTopic.prototype.initAll();
	Marker.prototype.initAll();

	// END OF FILE
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Draggable", [], factory);
	else if(typeof exports === 'object')
		exports["Draggable"] = factory();
	else
		root["Draggable"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
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

var _defineProperty = __webpack_require__(59);

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

var _typeof2 = __webpack_require__(46);

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

var _setPrototypeOf = __webpack_require__(90);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(94);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(46);

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

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractEvent = __webpack_require__(58);

var _AbstractEvent2 = _interopRequireDefault(_AbstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AbstractEvent2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(34)('wks')
  , uid        = __webpack_require__(22)
  , Symbol     = __webpack_require__(7).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(14)
  , IE8_DOM_DEFINE = __webpack_require__(43)
  , toPrimitive    = __webpack_require__(27)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(71)
  , defined = __webpack_require__(29);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(7)
  , core      = __webpack_require__(4)
  , ctx       = __webpack_require__(26)
  , hide      = __webpack_require__(13)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
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
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(17)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(8)
  , createDesc = __webpack_require__(18);
module.exports = __webpack_require__(11) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scroll = exports.closest = undefined;

var _closest = __webpack_require__(97);

var _closest2 = _interopRequireDefault(_closest);

var _scroll = __webpack_require__(108);

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.closest = _closest2.default;
exports.scroll = _scroll2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sensor = __webpack_require__(63);

var _Sensor2 = _interopRequireDefault(_Sensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Sensor2.default;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(50)
  , enumBugKeys = __webpack_require__(35);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(99);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SensorEvent = __webpack_require__(110);

Object.defineProperty(exports, 'SensorEvent', {
  enumerable: true,
  get: function get() {
    return _SensorEvent.SensorEvent;
  }
});
Object.defineProperty(exports, 'DragStartSensorEvent', {
  enumerable: true,
  get: function get() {
    return _SensorEvent.DragStartSensorEvent;
  }
});
Object.defineProperty(exports, 'DragMoveSensorEvent', {
  enumerable: true,
  get: function get() {
    return _SensorEvent.DragMoveSensorEvent;
  }
});
Object.defineProperty(exports, 'DragStopSensorEvent', {
  enumerable: true,
  get: function get() {
    return _SensorEvent.DragStopSensorEvent;
  }
});
Object.defineProperty(exports, 'DragPressureSensorEvent', {
  enumerable: true,
  get: function get() {
    return _SensorEvent.DragPressureSensorEvent;
  }
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mirror = exports.Accessibility = undefined;

var _Draggable = __webpack_require__(128);

var _Draggable2 = _interopRequireDefault(_Draggable);

var _Plugins = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Accessibility = _Plugins.Accessibility;
exports.Mirror = _Plugins.Mirror;
exports.default = _Draggable2.default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(62);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(14)
  , dPs         = __webpack_require__(70)
  , enumBugKeys = __webpack_require__(35)
  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(44)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
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
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34)('keys')
  , uid    = __webpack_require__(22);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f
  , has = __webpack_require__(12)
  , TAG = __webpack_require__(6)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(29);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(7)
  , core           = __webpack_require__(4)
  , LIBRARY        = __webpack_require__(30)
  , wksExt         = __webpack_require__(38)
  , defineProperty = __webpack_require__(8).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(40)
  , createDesc     = __webpack_require__(18)
  , toIObject      = __webpack_require__(9)
  , toPrimitive    = __webpack_require__(27)
  , has            = __webpack_require__(12)
  , IE8_DOM_DEFINE = __webpack_require__(43)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(11) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(142);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(145);

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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(11) && !__webpack_require__(17)(function(){
  return Object.defineProperty(__webpack_require__(44)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16)
  , document = __webpack_require__(7).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForceTouchSensor = exports.DragSensor = exports.TouchSensor = exports.MouseSensor = exports.Sensor = undefined;

var _Sensor = __webpack_require__(19);

var _Sensor2 = _interopRequireDefault(_Sensor);

var _MouseSensor = __webpack_require__(64);

var _MouseSensor2 = _interopRequireDefault(_MouseSensor);

var _TouchSensor = __webpack_require__(111);

var _TouchSensor2 = _interopRequireDefault(_TouchSensor);

var _DragSensor = __webpack_require__(113);

var _DragSensor2 = _interopRequireDefault(_DragSensor);

var _ForceTouchSensor = __webpack_require__(115);

var _ForceTouchSensor2 = _interopRequireDefault(_ForceTouchSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Sensor = _Sensor2.default;
exports.MouseSensor = _MouseSensor2.default;
exports.TouchSensor = _TouchSensor2.default;
exports.DragSensor = _DragSensor2.default;
exports.ForceTouchSensor = _ForceTouchSensor2.default;

/***/ }),
/* 46 */
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(68)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(48)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(30)
  , $export        = __webpack_require__(10)
  , redefine       = __webpack_require__(49)
  , hide           = __webpack_require__(13)
  , has            = __webpack_require__(12)
  , Iterators      = __webpack_require__(20)
  , $iterCreate    = __webpack_require__(69)
  , setToStringTag = __webpack_require__(36)
  , getPrototypeOf = __webpack_require__(52)
  , ITERATOR       = __webpack_require__(6)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(12)
  , toIObject    = __webpack_require__(9)
  , arrayIndexOf = __webpack_require__(72)(false)
  , IE_PROTO     = __webpack_require__(33)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(28)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(12)
  , toObject    = __webpack_require__(37)
  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(50)
  , hiddenKeys = __webpack_require__(35).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Accessibility = exports.defaultMirrorOption = exports.Mirror = undefined;

var _Mirror = __webpack_require__(129);

var _Mirror2 = _interopRequireDefault(_Mirror);

var _Accessibility = __webpack_require__(132);

var _Accessibility2 = _interopRequireDefault(_Accessibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Mirror = _Mirror2.default;
exports.defaultMirrorOption = _Mirror.defaultMirrorOption;
exports.Accessibility = _Accessibility2.default;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(10)
  , core    = __webpack_require__(4)
  , fails   = __webpack_require__(17);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sortable = exports.Swappable = exports.Droppable = exports.Draggable = exports.Plugins = exports.Sensors = exports.BaseEvent = undefined;

var _AbstractEvent = __webpack_require__(5);

var _AbstractEvent2 = _interopRequireDefault(_AbstractEvent);

var _Sensors = __webpack_require__(45);

var Sensors = _interopRequireWildcard(_Sensors);

var _Plugins = __webpack_require__(117);

var Plugins = _interopRequireWildcard(_Plugins);

var _Draggable = __webpack_require__(25);

var _Draggable2 = _interopRequireDefault(_Draggable);

var _Droppable = __webpack_require__(140);

var _Droppable2 = _interopRequireDefault(_Droppable);

var _Swappable = __webpack_require__(150);

var _Swappable2 = _interopRequireDefault(_Swappable);

var _Sortable = __webpack_require__(154);

var _Sortable2 = _interopRequireDefault(_Sortable);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BaseEvent = _AbstractEvent2.default;
exports.Sensors = Sensors;
exports.Plugins = Plugins;
exports.Draggable = _Draggable2.default;
exports.Droppable = _Droppable2.default;
exports.Swappable = _Swappable2.default;
exports.Sortable = _Sortable2.default;

/***/ }),
/* 58 */
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
 * All events fired by draggable inherit this class. You can call `cancel()` to
 * cancel a specific event or you can check if an event has been canceled by
 * calling `canceled()`.
 * @abstract
 * @class AbstractEvent
 * @module AbstractEvent
 */
var AbstractEvent = function () {

  /**
   * Event type
   * @static
   * @abstract
   * @property type
   * @type {String}
   */
  function AbstractEvent(data) {
    (0, _classCallCheck3.default)(this, AbstractEvent);

    this._canceled = false;
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(11), 'Object', {defineProperty: __webpack_require__(8).f});

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 63 */
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MouseSensor = __webpack_require__(65);

var _MouseSensor2 = _interopRequireDefault(_MouseSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _MouseSensor2.default;

/***/ }),
/* 65 */
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

var _utils = __webpack_require__(15);

var _Sensor2 = __webpack_require__(19);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(24);

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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(75);
module.exports = __webpack_require__(38).f('iterator');

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28)
  , defined   = __webpack_require__(29);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
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

var create         = __webpack_require__(31)
  , descriptor     = __webpack_require__(18)
  , setToStringTag = __webpack_require__(36)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(6)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(8)
  , anObject = __webpack_require__(14)
  , getKeys  = __webpack_require__(21);

module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(32);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(9)
  , toLength  = __webpack_require__(51)
  , toIndex   = __webpack_require__(73);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7).document && document.documentElement;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
var global        = __webpack_require__(7)
  , hide          = __webpack_require__(13)
  , Iterators     = __webpack_require__(20)
  , TO_STRING_TAG = __webpack_require__(6)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(77)
  , step             = __webpack_require__(78)
  , Iterators        = __webpack_require__(20)
  , toIObject        = __webpack_require__(9);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(48)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
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

module.exports = function(){ /* empty */ };

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(81);
__webpack_require__(87);
__webpack_require__(88);
__webpack_require__(89);
module.exports = __webpack_require__(4).Symbol;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(7)
  , has            = __webpack_require__(12)
  , DESCRIPTORS    = __webpack_require__(11)
  , $export        = __webpack_require__(10)
  , redefine       = __webpack_require__(49)
  , META           = __webpack_require__(82).KEY
  , $fails         = __webpack_require__(17)
  , shared         = __webpack_require__(34)
  , setToStringTag = __webpack_require__(36)
  , uid            = __webpack_require__(22)
  , wks            = __webpack_require__(6)
  , wksExt         = __webpack_require__(38)
  , wksDefine      = __webpack_require__(39)
  , keyOf          = __webpack_require__(83)
  , enumKeys       = __webpack_require__(84)
  , isArray        = __webpack_require__(85)
  , anObject       = __webpack_require__(14)
  , toIObject      = __webpack_require__(9)
  , toPrimitive    = __webpack_require__(27)
  , createDesc     = __webpack_require__(18)
  , _create        = __webpack_require__(31)
  , gOPNExt        = __webpack_require__(86)
  , $GOPD          = __webpack_require__(41)
  , $DP            = __webpack_require__(8)
  , $keys          = __webpack_require__(21)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(54).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(40).f  = $propertyIsEnumerable;
  __webpack_require__(53).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(30)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
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
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(22)('meta')
  , isObject = __webpack_require__(16)
  , has      = __webpack_require__(12)
  , setDesc  = __webpack_require__(8).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(17)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(21)
  , toIObject = __webpack_require__(9);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21)
  , gOPS    = __webpack_require__(53)
  , pIE     = __webpack_require__(40);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(32);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(9)
  , gOPN      = __webpack_require__(54).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {



/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('asyncIterator');

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('observable');

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(92);
module.exports = __webpack_require__(4).Object.setPrototypeOf;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(10);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(93).set});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(16)
  , anObject = __webpack_require__(14);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(26)(Function.call, __webpack_require__(41).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
var $Object = __webpack_require__(4).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(31)});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _closest = __webpack_require__(98);

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _closest2.default;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(23);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = closest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchFunction = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;

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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(101);
module.exports = __webpack_require__(4).Array.from;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(26)
  , $export        = __webpack_require__(10)
  , toObject       = __webpack_require__(37)
  , call           = __webpack_require__(102)
  , isArrayIter    = __webpack_require__(103)
  , toLength       = __webpack_require__(51)
  , createProperty = __webpack_require__(104)
  , getIterFn      = __webpack_require__(105);

$export($export.S + $export.F * !__webpack_require__(107)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(14);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(20)
  , ITERATOR   = __webpack_require__(6)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8)
  , createDesc      = __webpack_require__(18);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(106)
  , ITERATOR  = __webpack_require__(6)('iterator')
  , Iterators = __webpack_require__(20);
module.exports = __webpack_require__(4).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(32)
  , TAG = __webpack_require__(6)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(6)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scroll = __webpack_require__(109);

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _scroll2.default;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scroll;
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

/***/ }),
/* 110 */
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

var _AbstractEvent2 = __webpack_require__(5);

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
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TouchSensor = __webpack_require__(112);

var _TouchSensor2 = _interopRequireDefault(_TouchSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TouchSensor2.default;

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

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(15);

var _Sensor2 = __webpack_require__(19);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(24);

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
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragSensor = __webpack_require__(114);

var _DragSensor2 = _interopRequireDefault(_DragSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DragSensor2.default;

/***/ }),
/* 114 */
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

var _utils = __webpack_require__(15);

var _Sensor2 = __webpack_require__(19);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(24);

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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ForceTouchSensor = __webpack_require__(116);

var _ForceTouchSensor2 = _interopRequireDefault(_ForceTouchSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ForceTouchSensor2.default;

/***/ }),
/* 116 */
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

var _Sensor2 = __webpack_require__(19);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(24);

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
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwapAnimation = exports.Snappable = exports.Collidable = undefined;

var _Collidable = __webpack_require__(118);

var _Collidable2 = _interopRequireDefault(_Collidable);

var _Snappable = __webpack_require__(122);

var _Snappable2 = _interopRequireDefault(_Snappable);

var _SwapAnimation = __webpack_require__(126);

var _SwapAnimation2 = _interopRequireDefault(_SwapAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Collidable = _Collidable2.default;
exports.Snappable = _Snappable2.default;
exports.SwapAnimation = _SwapAnimation2.default;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Collidable = __webpack_require__(119);

var _Collidable2 = _interopRequireDefault(_Collidable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Collidable2.default;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(15);

var _CollidableEvent = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

      var collidableInEvent = new _CollidableEvent.CollidableInEvent({
        dragEvent: event,
        collidingElement: this.currentlyCollidingElement
      });

      var collidableOutEvent = new _CollidableEvent.CollidableOutEvent({
        dragEvent: event,
        collidingElement: this.lastCollidingElement
      });

      var enteringCollidable = Boolean(this.currentlyCollidingElement && this.lastCollidingElement !== this.currentlyCollidingElement);
      var leavingCollidable = Boolean(!this.currentlyCollidingElement && this.lastCollidingElement);

      if (enteringCollidable) {
        if (this.lastCollidingElement) {
          this.draggable.trigger(collidableOutEvent);
        }

        this.draggable.trigger(collidableInEvent);
      } else if (leavingCollidable) {
        this.draggable.trigger(collidableOutEvent);
      }

      this.lastCollidingElement = this.currentlyCollidingElement;
    }
  }, {
    key: '_onDragStop',
    value: function _onDragStop(event) {
      var lastCollidingElement = this.currentlyCollidingElement || this.lastCollidingElement;
      var collidableOutEvent = new _CollidableEvent.CollidableOutEvent({
        dragEvent: event,
        collidingElement: lastCollidingElement
      });

      if (lastCollidingElement) {
        this.draggable.trigger(collidableOutEvent);
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

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CollidableEvent = __webpack_require__(121);

Object.defineProperty(exports, 'CollidableInEvent', {
  enumerable: true,
  get: function get() {
    return _CollidableEvent.CollidableInEvent;
  }
});
Object.defineProperty(exports, 'CollidableOutEvent', {
  enumerable: true,
  get: function get() {
    return _CollidableEvent.CollidableOutEvent;
  }
});

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollidableOutEvent = exports.CollidableInEvent = exports.CollidableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(5);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base collidable event
 * @class CollidableEvent
 * @module CollidableEvent
 * @extends AbstractEvent
 */
var CollidableEvent = exports.CollidableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(CollidableEvent, _AbstractEvent);

  function CollidableEvent() {
    (0, _classCallCheck3.default)(this, CollidableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (CollidableEvent.__proto__ || Object.getPrototypeOf(CollidableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(CollidableEvent, [{
    key: 'dragEvent',


    /**
     * Drag event that triggered this colliable event
     * @property dragEvent
     * @type {DragEvent}
     * @readonly
     */
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return CollidableEvent;
}(_AbstractEvent3.default);

/**
 * Collidable in event
 * @class CollidableInEvent
 * @module CollidableInEvent
 * @extends CollidableEvent
 */


CollidableEvent.type = 'collidable';

var CollidableInEvent = exports.CollidableInEvent = function (_CollidableEvent) {
  (0, _inherits3.default)(CollidableInEvent, _CollidableEvent);

  function CollidableInEvent() {
    (0, _classCallCheck3.default)(this, CollidableInEvent);
    return (0, _possibleConstructorReturn3.default)(this, (CollidableInEvent.__proto__ || Object.getPrototypeOf(CollidableInEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(CollidableInEvent, [{
    key: 'collidingElement',


    /**
     * Element you are currently colliding with
     * @property collidingElement
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.collidingElement;
    }
  }]);
  return CollidableInEvent;
}(CollidableEvent);

/**
 * Collidable out event
 * @class CollidableOutEvent
 * @module CollidableOutEvent
 * @extends CollidableEvent
 */


CollidableInEvent.type = 'collidable:in';

var CollidableOutEvent = exports.CollidableOutEvent = function (_CollidableEvent2) {
  (0, _inherits3.default)(CollidableOutEvent, _CollidableEvent2);

  function CollidableOutEvent() {
    (0, _classCallCheck3.default)(this, CollidableOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (CollidableOutEvent.__proto__ || Object.getPrototypeOf(CollidableOutEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(CollidableOutEvent, [{
    key: 'collidingElement',


    /**
     * Element you were previously colliding with
     * @property collidingElement
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.collidingElement;
    }
  }]);
  return CollidableOutEvent;
}(CollidableEvent);

CollidableOutEvent.type = 'collidable:out';

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Snappable = __webpack_require__(123);

var _Snappable2 = _interopRequireDefault(_Snappable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Snappable2.default;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _SnappableEvent = __webpack_require__(124);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

      var snapInEvent = new _SnappableEvent.SnapInEvent({
        dragEvent: event
      });

      this.draggable.trigger(snapInEvent);

      if (snapInEvent.canceled()) {
        return;
      }

      if (mirror) {
        mirror.style.display = 'none';
      }

      source.classList.remove(this.draggable.getClassNameFor('source:dragging'));
      source.classList.add(this.draggable.getClassNameFor('source:placed'));

      // Need to cancel this in drag out
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

      var snapOutEvent = new _SnappableEvent.SnapOutEvent({
        dragEvent: event
      });

      this.draggable.trigger(snapOutEvent);

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

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SnappableEvent = __webpack_require__(125);

Object.defineProperty(exports, 'SnapInEvent', {
  enumerable: true,
  get: function get() {
    return _SnappableEvent.SnapInEvent;
  }
});
Object.defineProperty(exports, 'SnapOutEvent', {
  enumerable: true,
  get: function get() {
    return _SnappableEvent.SnapOutEvent;
  }
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapOutEvent = exports.SnapInEvent = exports.SnapEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(5);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base snap event
 * @class SnapEvent
 * @module SnapEvent
 * @extends AbstractEvent
 */
var SnapEvent = exports.SnapEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(SnapEvent, _AbstractEvent);

  function SnapEvent() {
    (0, _classCallCheck3.default)(this, SnapEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SnapEvent.__proto__ || Object.getPrototypeOf(SnapEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SnapEvent, [{
    key: 'dragEvent',


    /**
     * Drag event that triggered this snap event
     * @property dragEvent
     * @type {DragEvent}
     * @readonly
     */
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return SnapEvent;
}(_AbstractEvent3.default);

/**
 * Snap in event
 * @class SnapInEvent
 * @module SnapInEvent
 * @extends SnapEvent
 */


SnapEvent.type = 'snap';

var SnapInEvent = exports.SnapInEvent = function (_SnapEvent) {
  (0, _inherits3.default)(SnapInEvent, _SnapEvent);

  function SnapInEvent() {
    (0, _classCallCheck3.default)(this, SnapInEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SnapInEvent.__proto__ || Object.getPrototypeOf(SnapInEvent)).apply(this, arguments));
  }

  return SnapInEvent;
}(SnapEvent);

/**
 * Snap out event
 * @class SnapOutEvent
 * @module SnapOutEvent
 * @extends SnapEvent
 */


SnapInEvent.type = 'snap:in';
SnapInEvent.cancelable = true;

var SnapOutEvent = exports.SnapOutEvent = function (_SnapEvent2) {
  (0, _inherits3.default)(SnapOutEvent, _SnapEvent2);

  function SnapOutEvent() {
    (0, _classCallCheck3.default)(this, SnapOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SnapOutEvent.__proto__ || Object.getPrototypeOf(SnapOutEvent)).apply(this, arguments));
  }

  return SnapOutEvent;
}(SnapEvent);

SnapOutEvent.type = 'snap:out';
SnapOutEvent.cancelable = true;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSwapAnimationOptions = undefined;

var _SwapAnimation = __webpack_require__(127);

var _SwapAnimation2 = _interopRequireDefault(_SwapAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SwapAnimation2.default;
exports.defaultSwapAnimationOptions = _SwapAnimation.defaultOptions;

/***/ }),
/* 127 */
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = exports.defaultOptions = {
  duration: 150,
  easingFunction: 'ease-in-out'
};

var SwapAnimation = function () {
  function SwapAnimation(draggable) {
    (0, _classCallCheck3.default)(this, SwapAnimation);

    this.draggable = draggable;

    this.options = Object.assign({}, defaultOptions, this.getOptions());

    this.onSortableSorted = this.onSortableSorted.bind(this);
  }

  (0, _createClass3.default)(SwapAnimation, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('sortable:sorted', this.onSortableSorted);
    }
  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('sortable:sorted', this.onSortableSorted);
    }
  }, {
    key: 'onSortableSorted',
    value: function onSortableSorted(_ref) {
      var _this = this;

      var oldIndex = _ref.oldIndex,
          newIndex = _ref.newIndex,
          dragEvent = _ref.dragEvent;
      var source = dragEvent.source,
          over = dragEvent.over;


      cancelAnimationFrame(this.lastAnimationFrame);

      // Can be done in a separate frame
      this.lastAnimationFrame = requestAnimationFrame(function () {
        if (oldIndex >= newIndex) {
          animate(source, over, _this.options);
        } else {
          animate(over, source, _this.options);
        }
      });
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.draggable.options.swapAnimation || {};
    }
  }]);
  return SwapAnimation;
}();

exports.default = SwapAnimation;


function animate(top, bottom, _ref2) {
  var duration = _ref2.duration,
      easingFunction = _ref2.easingFunction;

  var height = top.offsetHeight;

  var _arr = [top, bottom];
  for (var _i = 0; _i < _arr.length; _i++) {
    var element = _arr[_i];
    element.style.pointerEvents = 'none';
  }

  top.style.transform = 'translate3d(0, ' + height + 'px, 0)';
  bottom.style.transform = 'translate3d(0, -' + height + 'px, 0)';

  requestAnimationFrame(function () {
    var _arr2 = [top, bottom];

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var _element = _arr2[_i2];
      _element.addEventListener('transitionend', resetElementOnTransitionEnd);
      _element.style.transition = 'transform ' + duration + 'ms ' + easingFunction;
      _element.style.transform = '';
    }
  });
}

function resetElementOnTransitionEnd(event) {
  event.target.style.transition = '';
  event.target.style.pointerEvents = '';
  event.target.removeEventListener('transitionend', resetElementOnTransitionEnd);
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(23);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(15);

var _Plugins = __webpack_require__(55);

var _Sensors = __webpack_require__(45);

var _DraggableEvent = __webpack_require__(134);

var _DragEvent = __webpack_require__(136);

var _MirrorEvent = __webpack_require__(138);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = Symbol('onDragStart');
var onDragMove = Symbol('onDragMove');
var onDragStop = Symbol('onDragStop');
var onDragPressure = Symbol('onDragPressure');
var getAppendableContainer = Symbol('getAppendableContainer');

var defaults = {
  draggable: '.draggable-source',
  handle: null,
  delay: 100,
  placedTimeout: 800,
  plugins: [],
  sensors: [],
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

    this.options = Object.assign({}, defaults, options);
    this.callbacks = {};

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

    this.addPlugin.apply(this, [_Plugins.Mirror, _Plugins.Accessibility].concat((0, _toConsumableArray3.default)(this.options.plugins)));
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


  (0, _createClass3.default)(Draggable, [{
    key: 'destroy',
    value: function destroy() {
      document.removeEventListener('drag:start', this.dragStart, true);
      document.removeEventListener('drag:move', this.dragMove, true);
      document.removeEventListener('drag:stop', this.dragStop, true);
      document.removeEventListener('drag:pressure', this.dragPressure, true);

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
     * @param {Function} callback - Event callback
     * @return {Draggable}
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
     * @param {String} type - Event name
     * @param {Function} callback - Event callback
     * @return {Draggable}
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

    /**
     * Triggers draggable event
     * @param {AbstractEvent} event - Event instance
     * @return {Draggable}
     * @example draggable.trigger(event);
     */

  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (!this.callbacks[event.type]) {
        return null;
      }
      var callbacks = [].concat((0, _toConsumableArray3.default)(this.callbacks[event.type]));
      for (var i = callbacks.length - 1; i >= 0; i--) {
        var callback = callbacks[i];
        callback(event);
      }
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
      return this.options.classes[name] || defaults.classes[name];
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
     * Drag start handler
     * @private
     * @param {Event} event - DOM Drag event
     */

  }, {
    key: onDragStart,
    value: function value(event) {
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

      this.dragging = true;

      this.source = this.originalSource.cloneNode(true);

      if (!isDragEvent(originalEvent)) {
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

      this.originalSource.parentNode.insertBefore(this.source, this.originalSource);

      this.originalSource.style.display = 'none';
      this.source.classList.add(this.getClassNameFor('source:dragging'));
      this.sourceContainer.classList.add(this.getClassNameFor('container:dragging'));
      document.body.classList.add(this.getClassNameFor('body:dragging'));
      applyUserSelect(document.body, 'none');

      if (this.mirror) {
        var mirrorMoveEvent = new _MirrorEvent.MirrorMoveEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        this.trigger(mirrorMoveEvent);
      }

      var dragEvent = new _DragEvent.DragStartEvent({
        source: this.source,
        mirror: this.mirror,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent: sensorEvent
      });

      this.trigger(dragEvent);

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

        this.trigger(dragOutEvent);

        this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
        this.currentOver = null;
      }

      if (isLeavingContainer) {
        var dragOutContainerEvent = new _DragEvent.DragOutContainerEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: this.overContainer
        });

        this.trigger(dragOutContainerEvent);

        this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
        this.currentOverContainer = null;
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

        this.trigger(dragOverContainerEvent);

        this.currentOverContainer = overContainer;
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

        this.trigger(dragOverEvent);

        this.currentOver = target;
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
      var _this3 = this;

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

      var lastSource = this.originalSource;
      var lastSourceContainer = this.sourceContainer;

      setTimeout(function () {
        if (lastSource) {
          lastSource.classList.remove(_this3.getClassNameFor('source:placed'));
        }

        if (lastSourceContainer) {
          lastSourceContainer.classList.remove(_this3.getClassNameFor('container:placed'));
        }
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
        return document.body;
      }
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

function applyUserSelect(element, value) {
  element.style.webkitUserSelect = value;
  element.style.mozUserSelect = value;
  element.style.msUserSelect = value;
  element.style.oUserSelect = value;
  element.style.userSelect = value;
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMirrorOption = undefined;

var _Mirror = __webpack_require__(130);

var _Mirror2 = _interopRequireDefault(_Mirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Mirror2.default;
exports.defaultMirrorOption = _Mirror.defaultOptions;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _objectWithoutProperties2 = __webpack_require__(131);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = exports.defaultOptions = {
  constrainDimensions: false,
  xAxis: true,
  yAxis: true
};

var Mirror = function () {
  function Mirror(draggable) {
    (0, _classCallCheck3.default)(this, Mirror);

    this.draggable = draggable;
    this.options = Object.assign({}, defaultOptions, this.getOptions());

    this.onMirrorCreated = this.onMirrorCreated.bind(this);
    this.onMirrorMove = this.onMirrorMove.bind(this);
  }

  (0, _createClass3.default)(Mirror, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('mirror:created', this.onMirrorCreated).on('mirror:move', this.onMirrorMove);
    }
  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('mirror:created', this.onMirrorCreated).off('mirror:move', this.onMirrorMove);
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.draggable.options.mirror || {};
    }
  }, {
    key: 'onMirrorCreated',
    value: function onMirrorCreated(_ref) {
      var _this = this;

      var mirror = _ref.mirror,
          source = _ref.source,
          sensorEvent = _ref.sensorEvent;

      var mirrorClass = this.draggable.getClassNameFor('mirror');

      var setState = function setState(_ref2) {
        var mirrorOffset = _ref2.mirrorOffset,
            initialX = _ref2.initialX,
            initialY = _ref2.initialY,
            args = (0, _objectWithoutProperties3.default)(_ref2, ['mirrorOffset', 'initialX', 'initialY']);

        _this.mirrorOffset = mirrorOffset;
        _this.initialX = initialX;
        _this.initialY = initialY;
        return Object.assign({ mirrorOffset: mirrorOffset, initialX: initialX, initialY: initialY }, args);
      };

      var initialState = {
        mirror: mirror,
        source: source,
        sensorEvent: sensorEvent,
        mirrorClass: mirrorClass,
        options: this.options
      };

      return Promise.resolve(initialState)
      // Fix reflow here
      .then(computeMirrorDimensions).then(calculateMirrorOffset).then(resetMirror).then(addMirrorClasses).then(positionMirror({ initial: true })).then(removeMirrorID).then(setState);
    }
  }, {
    key: 'onMirrorMove',
    value: function onMirrorMove(_ref3) {
      var mirror = _ref3.mirror,
          sensorEvent = _ref3.sensorEvent;

      var initialState = {
        mirror: mirror,
        sensorEvent: sensorEvent,
        mirrorOffset: this.mirrorOffset,
        options: this.options,
        initialX: this.initialX,
        initialY: this.initialY
      };

      return Promise.resolve(initialState).then(positionMirror({ raf: true }));
    }
  }]);
  return Mirror;
}();

exports.default = Mirror;


function computeMirrorDimensions(_ref4) {
  var source = _ref4.source,
      args = (0, _objectWithoutProperties3.default)(_ref4, ['source']);

  return withPromise(function (resolve) {
    var sourceRect = source.getBoundingClientRect();
    resolve(Object.assign({ source: source, sourceRect: sourceRect }, args));
  });
}

function calculateMirrorOffset(_ref5) {
  var sensorEvent = _ref5.sensorEvent,
      sourceRect = _ref5.sourceRect,
      args = (0, _objectWithoutProperties3.default)(_ref5, ['sensorEvent', 'sourceRect']);

  return withPromise(function (resolve) {
    var mirrorOffset = {
      top: sensorEvent.clientY - sourceRect.top,
      left: sensorEvent.clientX - sourceRect.left
    };

    resolve(Object.assign({ sensorEvent: sensorEvent, sourceRect: sourceRect, mirrorOffset: mirrorOffset }, args));
  });
}

function resetMirror(_ref6) {
  var mirror = _ref6.mirror,
      source = _ref6.source,
      options = _ref6.options,
      args = (0, _objectWithoutProperties3.default)(_ref6, ['mirror', 'source', 'options']);

  return withPromise(function (resolve) {
    var offsetHeight = void 0;
    var offsetWidth = void 0;

    if (options.constrainDimensions) {
      offsetHeight = source.offsetHeight;
      offsetWidth = source.offsetWidth;
    }

    mirror.style.position = 'fixed';
    mirror.style.pointerEvents = 'none';
    mirror.style.top = 0;
    mirror.style.left = 0;

    if (options.constrainDimensions) {
      mirror.style.height = offsetHeight + 'px';
      mirror.style.width = offsetWidth + 'px';
    }

    resolve(Object.assign({ mirror: mirror, source: source, options: options }, args));
  });
}

function addMirrorClasses(_ref7) {
  var mirror = _ref7.mirror,
      mirrorClass = _ref7.mirrorClass,
      args = (0, _objectWithoutProperties3.default)(_ref7, ['mirror', 'mirrorClass']);

  return withPromise(function (resolve) {
    mirror.classList.add(mirrorClass);
    resolve(Object.assign({ mirror: mirror, mirrorClass: mirrorClass }, args));
  });
}

function removeMirrorID(_ref8) {
  var mirror = _ref8.mirror,
      args = (0, _objectWithoutProperties3.default)(_ref8, ['mirror']);

  return withPromise(function (resolve) {
    mirror.removeAttribute('id');
    delete mirror.id;
    resolve(Object.assign({ mirror: mirror }, args));
  });
}

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
        options = _ref10.options,
        args = (0, _objectWithoutProperties3.default)(_ref10, ['mirror', 'sensorEvent', 'mirrorOffset', 'initialY', 'initialX', 'options']);

    return withPromise(function (resolve) {
      var result = Object.assign({
        mirror: mirror,
        sensorEvent: sensorEvent,
        mirrorOffset: mirrorOffset,
        options: options
      }, args);

      if (mirrorOffset) {
        var x = sensorEvent.clientX - mirrorOffset.left;
        var y = sensorEvent.clientY - mirrorOffset.top;

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
/* 131 */
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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Accessibility = __webpack_require__(133);

var _Accessibility2 = _interopRequireDefault(_Accessibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Accessibility2.default;

/***/ }),
/* 133 */
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

var ARIA_GRABBED = 'aria-grabbed';
var ARIA_DROPEFFECT = 'aria-dropeffect';
var TABINDEX = 'tabindex';

/**
 * __WIP__ Accessibility plugin
 * @class Accessibility
 * @module Accessibility
 */

var Accessibility = function () {

  /**
   * Accessibility constructor.
   * @constructs Accessibility
   * @param {Draggable} draggable - Draggable instance
   */
  function Accessibility(draggable) {
    (0, _classCallCheck3.default)(this, Accessibility);


    /**
     * Draggable instance
     * @property draggable
     * @type {Draggable}
     */
    this.draggable = draggable;

    this._onInit = this._onInit.bind(this);
    this._onDestroy = this._onDestroy.bind(this);
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

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DraggableEvent = __webpack_require__(135);

Object.defineProperty(exports, 'DraggableInitializedEvent', {
  enumerable: true,
  get: function get() {
    return _DraggableEvent.DraggableInitializedEvent;
  }
});
Object.defineProperty(exports, 'DraggableDestroyEvent', {
  enumerable: true,
  get: function get() {
    return _DraggableEvent.DraggableDestroyEvent;
  }
});

/***/ }),
/* 135 */
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

var _AbstractEvent2 = __webpack_require__(5);

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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragEvent = __webpack_require__(137);

Object.defineProperty(exports, 'DragStartEvent', {
  enumerable: true,
  get: function get() {
    return _DragEvent.DragStartEvent;
  }
});
Object.defineProperty(exports, 'DragMoveEvent', {
  enumerable: true,
  get: function get() {
    return _DragEvent.DragMoveEvent;
  }
});
Object.defineProperty(exports, 'DragOutContainerEvent', {
  enumerable: true,
  get: function get() {
    return _DragEvent.DragOutContainerEvent;
  }
});
Object.defineProperty(exports, 'DragOutEvent', {
  enumerable: true,
  get: function get() {
    return _DragEvent.DragOutEvent;
  }
});
Object.defineProperty(exports, 'DragOverContainerEvent', {
  enumerable: true,
  get: function get() {
    return _DragEvent.DragOverContainerEvent;
  }
});
Object.defineProperty(exports, 'DragOverEvent', {
  enumerable: true,
  get: function get() {
    return _DragEvent.DragOverEvent;
  }
});
Object.defineProperty(exports, 'DragStopEvent', {
  enumerable: true,
  get: function get() {
    return _DragEvent.DragStopEvent;
  }
});
Object.defineProperty(exports, 'DragPressureEvent', {
  enumerable: true,
  get: function get() {
    return _DragEvent.DragPressureEvent;
  }
});

/***/ }),
/* 137 */
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

var _AbstractEvent2 = __webpack_require__(5);

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
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MirrorEvent = __webpack_require__(139);

Object.defineProperty(exports, 'MirrorCreatedEvent', {
  enumerable: true,
  get: function get() {
    return _MirrorEvent.MirrorCreatedEvent;
  }
});
Object.defineProperty(exports, 'MirrorAttachedEvent', {
  enumerable: true,
  get: function get() {
    return _MirrorEvent.MirrorAttachedEvent;
  }
});
Object.defineProperty(exports, 'MirrorMoveEvent', {
  enumerable: true,
  get: function get() {
    return _MirrorEvent.MirrorMoveEvent;
  }
});
Object.defineProperty(exports, 'MirrorDestroyEvent', {
  enumerable: true,
  get: function get() {
    return _MirrorEvent.MirrorDestroyEvent;
  }
});

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MirrorDestroyEvent = exports.MirrorMoveEvent = exports.MirrorAttachedEvent = exports.MirrorCreatedEvent = exports.MirrorEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(5);

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
  return MirrorEvent;
}(_AbstractEvent3.default);

/**
 * Mirror created event
 * @class MirrorCreatedEvent
 * @module MirrorCreatedEvent
 * @extends MirrorEvent
 */


var MirrorCreatedEvent = exports.MirrorCreatedEvent = function (_MirrorEvent) {
  (0, _inherits3.default)(MirrorCreatedEvent, _MirrorEvent);

  function MirrorCreatedEvent() {
    (0, _classCallCheck3.default)(this, MirrorCreatedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorCreatedEvent.__proto__ || Object.getPrototypeOf(MirrorCreatedEvent)).apply(this, arguments));
  }

  return MirrorCreatedEvent;
}(MirrorEvent);

/**
 * Mirror attached event
 * @class MirrorAttachedEvent
 * @module MirrorAttachedEvent
 * @extends MirrorEvent
 */


MirrorCreatedEvent.type = 'mirror:created';

var MirrorAttachedEvent = exports.MirrorAttachedEvent = function (_MirrorEvent2) {
  (0, _inherits3.default)(MirrorAttachedEvent, _MirrorEvent2);

  function MirrorAttachedEvent() {
    (0, _classCallCheck3.default)(this, MirrorAttachedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorAttachedEvent.__proto__ || Object.getPrototypeOf(MirrorAttachedEvent)).apply(this, arguments));
  }

  return MirrorAttachedEvent;
}(MirrorEvent);

/**
 * Mirror move event
 * @class MirrorMoveEvent
 * @module MirrorMoveEvent
 * @extends MirrorEvent
 */


MirrorAttachedEvent.type = 'mirror:attached';

var MirrorMoveEvent = exports.MirrorMoveEvent = function (_MirrorEvent3) {
  (0, _inherits3.default)(MirrorMoveEvent, _MirrorEvent3);

  function MirrorMoveEvent() {
    (0, _classCallCheck3.default)(this, MirrorMoveEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorMoveEvent.__proto__ || Object.getPrototypeOf(MirrorMoveEvent)).apply(this, arguments));
  }

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

var MirrorDestroyEvent = exports.MirrorDestroyEvent = function (_MirrorEvent4) {
  (0, _inherits3.default)(MirrorDestroyEvent, _MirrorEvent4);

  function MirrorDestroyEvent() {
    (0, _classCallCheck3.default)(this, MirrorDestroyEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorDestroyEvent.__proto__ || Object.getPrototypeOf(MirrorDestroyEvent)).apply(this, arguments));
  }

  return MirrorDestroyEvent;
}(MirrorEvent);

MirrorDestroyEvent.type = 'mirror:destroy';
MirrorDestroyEvent.cancelable = true;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Droppable = __webpack_require__(141);

var _Droppable2 = _interopRequireDefault(_Droppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Droppable2.default;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(23);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(42);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(15);

var _Draggable2 = __webpack_require__(25);

var _Draggable3 = _interopRequireDefault(_Draggable2);

var _DroppableEvent = __webpack_require__(148);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = Symbol('onDragStart');
var onDragMove = Symbol('onDragMove');
var onDragStop = Symbol('onDragStop');
var drop = Symbol('drop');
var release = Symbol('release');
var closestDroppable = Symbol('closestDroppable');
var getDroppables = Symbol('getDroppables');

var classes = {
  'droppable:active': 'draggable-droppable--active',
  'droppable:occupied': 'draggable-droppable--occupied'
};

var defaults = {
  droppable: '.draggable-droppable'
};

/**
 * Droppable is built on top of Draggable and allows dropping draggable elements
 * into droppable element
 * @class Droppable
 * @module Droppable
 * @extends Draggable
 */

var Droppable = function (_Draggable) {
  (0, _inherits3.default)(Droppable, _Draggable);

  /**
   * Droppable constructor.
   * @constructs Droppable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Droppable containers
   * @param {Object} options - Options for Droppable
   */
  function Droppable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Droppable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Droppable.__proto__ || Object.getPrototypeOf(Droppable)).call(this, containers, options));

    _this.options = Object.assign({}, defaults, _this.options);

    /**
     * All droppable elements on drag start
     * @property droppables
     * @type {HTMLElement[]}
     */
    _this.droppables = null;

    /**
     * Last droppable element that the source was dropped into
     * @property lastDroppable
     * @type {HTMLElement}
     */
    _this.lastDroppable = null;

    /**
     * Initial droppable element that the source was drag from
     * @property initialDroppable
     * @type {HTMLElement}
     */
    _this.initialDroppable = null;

    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragMove] = _this[onDragMove].bind(_this);
    _this[onDragStop] = _this[onDragStop].bind(_this);

    _this.on('drag:start', _this[onDragStart]).on('drag:move', _this[onDragMove]).on('drag:stop', _this[onDragStop]);
    return _this;
  }

  /**
   * Destroys Droppable instance.
   */


  (0, _createClass3.default)(Droppable, [{
    key: 'destroy',
    value: function destroy() {
      (0, _get3.default)(Droppable.prototype.__proto__ || Object.getPrototypeOf(Droppable.prototype), 'destroy', this).call(this);

      this.off('drag:start', this[onDragStart]).off('drag:move', this[onDragMove]).off('drag:stop', this[onDragStop]);
    }

    /**
     * Returns class name for class identifier
     * @param {String} name - Name of class identifier
     * @return {String|null}
     */

  }, {
    key: 'getClassNameFor',
    value: function getClassNameFor(name) {
      return (0, _get3.default)(Droppable.prototype.__proto__ || Object.getPrototypeOf(Droppable.prototype), 'getClassNameFor', this).call(this, name) || classes[name];
    }

    /**
     * Drag start handler
     * @private
     * @param {DragStartEvent} event - Drag start event
     */

  }, {
    key: onDragStart,
    value: function value(event) {
      if (event.canceled()) {
        return;
      }

      this.droppables = [].concat((0, _toConsumableArray3.default)(this[getDroppables]()));
      var droppable = (0, _utils.closest)(event.sensorEvent.target, this.options.droppable);

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

    /**
     * Drag move handler
     * @private
     * @param {DragMoveEvent} event - Drag move event
     */

  }, {
    key: onDragMove,
    value: function value(event) {
      if (event.canceled()) {
        return;
      }

      var droppable = this[closestDroppable](event.sensorEvent.target);
      var overEmptyDroppable = droppable && !droppable.classList.contains(this.getClassNameFor('droppable:occupied'));

      if (overEmptyDroppable && this[drop](event, droppable)) {
        this.lastDroppable = droppable;
      } else if ((!droppable || droppable === this.initialDroppable) && this.lastDroppable) {
        this[release](event);
        this.lastDroppable = null;
      }
    }

    /**
     * Drag stop handler
     * @private
     * @param {DragStopEvent} event - Drag stop event
     */

  }, {
    key: onDragStop,
    value: function value() {
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

    /**
     * Drop method drops a draggable element into a droppable element
     * @private
     * @param {DragMoveEvent} event - Drag move event
     * @param {HTMLElement} droppable - Droppable element to drop draggable into
     */

  }, {
    key: drop,
    value: function value(event, droppable) {
      var droppableOverEvent = new _DroppableEvent.DroppableOverEvent({
        dragEvent: event,
        droppable: droppable
      });

      this.trigger(droppableOverEvent);

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

    /**
     * Release method moves the previously dropped element back into its original position
     * @private
     * @param {DragMoveEvent} event - Drag move event
     */

  }, {
    key: release,
    value: function value(event) {
      var droppableOutEvent = new _DroppableEvent.DroppableOutEvent({
        dragEvent: event,
        droppable: this.lastDroppable
      });

      this.trigger(droppableOutEvent);

      if (droppableOutEvent.canceled()) {
        return;
      }

      this.initialDroppable.appendChild(event.source);
      this.lastDroppable.classList.remove(this.getClassNameFor('droppable:occupied'));
    }

    /**
     * Returns closest droppable element for even target
     * @private
     * @param {HTMLElement} target - Event target
     * @return {HTMLElement|null}
     */

  }, {
    key: closestDroppable,
    value: function value(target) {
      var _this2 = this;

      if (!this.droppables) {
        return null;
      }

      return (0, _utils.closest)(target, function (element) {
        return _this2.droppables.includes(element);
      });
    }

    /**
     * Returns all current droppable elements for this draggable instance
     * @private
     * @return {NodeList|HTMLElement[]|Array}
     */

  }, {
    key: getDroppables,
    value: function value() {
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
}(_Draggable3.default);

exports.default = Droppable;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(144);
module.exports = __webpack_require__(4).Object.getPrototypeOf;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(37)
  , $getPrototypeOf = __webpack_require__(52);

__webpack_require__(56)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(147);
var $Object = __webpack_require__(4).Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(9)
  , $getOwnPropertyDescriptor = __webpack_require__(41).f;

__webpack_require__(56)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DroppableEvent = __webpack_require__(149);

Object.defineProperty(exports, 'DroppableOverEvent', {
  enumerable: true,
  get: function get() {
    return _DroppableEvent.DroppableOverEvent;
  }
});
Object.defineProperty(exports, 'DroppableOutEvent', {
  enumerable: true,
  get: function get() {
    return _DroppableEvent.DroppableOutEvent;
  }
});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DroppableOutEvent = exports.DroppableOverEvent = exports.DroppableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(5);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base droppable event
 * @class DroppableEvent
 * @module DroppableEvent
 * @extends AbstractEvent
 */
var DroppableEvent = exports.DroppableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(DroppableEvent, _AbstractEvent);

  function DroppableEvent() {
    (0, _classCallCheck3.default)(this, DroppableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DroppableEvent.__proto__ || Object.getPrototypeOf(DroppableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DroppableEvent, [{
    key: 'dragEvent',


    /**
     * Original drag event that triggered this droppable event
     * @property dragEvent
     * @type {DragEvent}
     * @readonly
     */
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return DroppableEvent;
}(_AbstractEvent3.default);

/**
 * Droppable over event
 * @class DroppableOverEvent
 * @module DroppableOverEvent
 * @extends DroppableEvent
 */


DroppableEvent.type = 'droppable';

var DroppableOverEvent = exports.DroppableOverEvent = function (_DroppableEvent) {
  (0, _inherits3.default)(DroppableOverEvent, _DroppableEvent);

  function DroppableOverEvent() {
    (0, _classCallCheck3.default)(this, DroppableOverEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DroppableOverEvent.__proto__ || Object.getPrototypeOf(DroppableOverEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DroppableOverEvent, [{
    key: 'droppable',


    /**
     * The droppable element you are over
     * @property droppable
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.droppable;
    }
  }]);
  return DroppableOverEvent;
}(DroppableEvent);

/**
 * Droppable out event
 * @class DroppableOutEvent
 * @module DroppableOutEvent
 * @extends DroppableEvent
 */


DroppableOverEvent.type = 'droppable:over';
DroppableOverEvent.cancelable = true;

var DroppableOutEvent = exports.DroppableOutEvent = function (_DroppableEvent2) {
  (0, _inherits3.default)(DroppableOutEvent, _DroppableEvent2);

  function DroppableOutEvent() {
    (0, _classCallCheck3.default)(this, DroppableOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DroppableOutEvent.__proto__ || Object.getPrototypeOf(DroppableOutEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DroppableOutEvent, [{
    key: 'droppable',


    /**
     * The droppable element you _were_ over
     * @property droppable
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.droppable;
    }
  }]);
  return DroppableOutEvent;
}(DroppableEvent);

DroppableOutEvent.type = 'droppable:out';
DroppableOutEvent.cancelable = true;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Swappable = __webpack_require__(151);

var _Swappable2 = _interopRequireDefault(_Swappable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Swappable2.default;

/***/ }),
/* 151 */
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

var _get2 = __webpack_require__(42);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Draggable2 = __webpack_require__(25);

var _Draggable3 = _interopRequireDefault(_Draggable2);

var _SwappableEvent = __webpack_require__(152);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = Symbol('onDragStart');
var onDragOver = Symbol('onDragOver');
var onDragStop = Symbol('onDragStop');

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
    var _this = (0, _possibleConstructorReturn3.default)(this, (Swappable.__proto__ || Object.getPrototypeOf(Swappable)).call(this, containers, options));

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
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SwappableEvent = __webpack_require__(153);

Object.defineProperty(exports, 'SwappableStartEvent', {
  enumerable: true,
  get: function get() {
    return _SwappableEvent.SwappableStartEvent;
  }
});
Object.defineProperty(exports, 'SwappableSwapEvent', {
  enumerable: true,
  get: function get() {
    return _SwappableEvent.SwappableSwapEvent;
  }
});
Object.defineProperty(exports, 'SwappableSwappedEvent', {
  enumerable: true,
  get: function get() {
    return _SwappableEvent.SwappableSwappedEvent;
  }
});
Object.defineProperty(exports, 'SwappableStopEvent', {
  enumerable: true,
  get: function get() {
    return _SwappableEvent.SwappableStopEvent;
  }
});

/***/ }),
/* 153 */
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

var _AbstractEvent2 = __webpack_require__(5);

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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sortable = __webpack_require__(155);

var _Sortable2 = _interopRequireDefault(_Sortable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Sortable2.default;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(23);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(42);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Draggable2 = __webpack_require__(25);

var _Draggable3 = _interopRequireDefault(_Draggable2);

var _SortableEvent = __webpack_require__(156);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = Symbol('onDragStart');
var onDragOverContainer = Symbol('onDragOverContainer');
var onDragOver = Symbol('onDragOver');
var onDragStop = Symbol('onDragStop');

/**
 * Sortable is built on top of Draggable and allows sorting of draggable elements. Sortable will keep
 * track of the original index and emits the new index as you drag over draggable elements.
 * @class Sortable
 * @module Sortable
 * @extends Draggable
 */

var Sortable = function (_Draggable) {
  (0, _inherits3.default)(Sortable, _Draggable);

  /**
   * Sortable constructor.
   * @constructs Sortable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Sortable containers
   * @param {Object} options - Options for Sortable
   */
  function Sortable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Sortable);

    /**
     * start index of source on drag start
     * @property startIndex
     * @type {Number}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Sortable.__proto__ || Object.getPrototypeOf(Sortable)).call(this, containers, options));

    _this.startIndex = null;

    /**
     * start container on drag start
     * @property startContainer
     * @type {HTMLElement}
     * @default null
     */
    _this.startContainer = null;

    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragOverContainer] = _this[onDragOverContainer].bind(_this);
    _this[onDragOver] = _this[onDragOver].bind(_this);
    _this[onDragStop] = _this[onDragStop].bind(_this);

    _this.on('drag:start', _this[onDragStart]).on('drag:over:container', _this[onDragOverContainer]).on('drag:over', _this[onDragOver]).on('drag:stop', _this[onDragStop]);
    return _this;
  }

  /**
   * Destroys Sortable instance.
   */


  (0, _createClass3.default)(Sortable, [{
    key: 'destroy',
    value: function destroy() {
      (0, _get3.default)(Sortable.prototype.__proto__ || Object.getPrototypeOf(Sortable.prototype), 'destroy', this).call(this);

      this.off('drag:start', this[onDragStart]).off('drag:over:container', this[onDragOverContainer]).off('drag:over', this[onDragOver]).off('drag:stop', this[onDragStop]);
    }

    /**
     * Returns true index of element within its container during drag operation, i.e. excluding mirror and original source
     * @param {HTMLElement} element - An element
     * @return {Number}
     */

  }, {
    key: 'index',
    value: function index(element) {
      var _this2 = this;

      return [].concat((0, _toConsumableArray3.default)(element.parentNode.children)).filter(function (childElement) {
        return childElement !== _this2.originalSource && childElement !== _this2.mirror;
      }).indexOf(element);
    }

    /**
     * Drag start handler
     * @private
     * @param {DragStartEvent} event - Drag start event
     */

  }, {
    key: onDragStart,
    value: function value(event) {
      this.startContainer = event.source.parentNode;
      this.startIndex = this.index(event.source);

      var sortableStartEvent = new _SortableEvent.SortableStartEvent({
        dragEvent: event,
        startIndex: this.startIndex,
        startContainer: this.startContainer
      });

      this.trigger(sortableStartEvent);

      if (sortableStartEvent.canceled()) {
        event.cancel();
      }
    }

    /**
     * Drag over container handler
     * @private
     * @param {DragOverContainerEvent} event - Drag over container event
     */

  }, {
    key: onDragOverContainer,
    value: function value(event) {
      if (event.canceled()) {
        return;
      }

      var source = event.source,
          over = event.over,
          overContainer = event.overContainer;

      var oldIndex = this.index(source);

      var sortableSortEvent = new _SortableEvent.SortableSortEvent({
        dragEvent: event,
        currentIndex: oldIndex,
        source: source,
        over: over
      });

      this.trigger(sortableSortEvent);

      if (sortableSortEvent.canceled()) {
        return;
      }

      var moves = move(source, over, overContainer);

      if (!moves) {
        return;
      }

      var oldContainer = moves.oldContainer,
          newContainer = moves.newContainer;

      var newIndex = this.index(event.source);

      var sortableSortedEvent = new _SortableEvent.SortableSortedEvent({
        dragEvent: event,
        oldIndex: oldIndex,
        newIndex: newIndex,
        oldContainer: oldContainer,
        newContainer: newContainer
      });

      this.trigger(sortableSortedEvent);
    }

    /**
     * Drag over handler
     * @private
     * @param {DragOverEvent} event - Drag over event
     */

  }, {
    key: onDragOver,
    value: function value(event) {
      if (event.over === event.originalSource || event.over === event.source) {
        return;
      }

      var source = event.source,
          over = event.over,
          overContainer = event.overContainer;

      var oldIndex = this.index(source);

      var sortableSortEvent = new _SortableEvent.SortableSortEvent({
        dragEvent: event,
        currentIndex: oldIndex,
        source: source,
        over: over
      });

      this.trigger(sortableSortEvent);

      if (sortableSortEvent.canceled()) {
        return;
      }

      var moves = move(source, over, overContainer);

      if (!moves) {
        return;
      }

      var oldContainer = moves.oldContainer,
          newContainer = moves.newContainer;

      var newIndex = this.index(source);

      var sortableSortedEvent = new _SortableEvent.SortableSortedEvent({
        dragEvent: event,
        oldIndex: oldIndex,
        newIndex: newIndex,
        oldContainer: oldContainer,
        newContainer: newContainer
      });

      this.trigger(sortableSortedEvent);
    }

    /**
     * Drag stop handler
     * @private
     * @param {DragStopEvent} event - Drag stop event
     */

  }, {
    key: onDragStop,
    value: function value(event) {
      var sortableStopEvent = new _SortableEvent.SortableStopEvent({
        dragEvent: event,
        oldIndex: this.startIndex,
        newIndex: this.index(event.source),
        oldContainer: this.startContainer,
        newContainer: event.source.parentNode
      });

      this.trigger(sortableStopEvent);

      this.startIndex = null;
      this.startContainer = null;
    }
  }]);
  return Sortable;
}(_Draggable3.default);

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

  overContainer.appendChild(source);

  return { oldContainer: oldContainer, newContainer: overContainer };
}

function moveWithinContainer(source, over) {
  var oldIndex = index(source);
  var newIndex = index(over);

  if (oldIndex < newIndex) {
    source.parentNode.insertBefore(source, over.nextElementSibling);
  } else {
    source.parentNode.insertBefore(source, over);
  }

  return { oldContainer: source.parentNode, newContainer: source.parentNode };
}

function moveOutsideContainer(source, over) {
  var oldContainer = source.parentNode;

  over.parentNode.insertBefore(source, over);

  return { oldContainer: oldContainer, newContainer: source.parentNode };
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SortableEvent = __webpack_require__(157);

Object.defineProperty(exports, 'SortableStartEvent', {
  enumerable: true,
  get: function get() {
    return _SortableEvent.SortableStartEvent;
  }
});
Object.defineProperty(exports, 'SortableSortEvent', {
  enumerable: true,
  get: function get() {
    return _SortableEvent.SortableSortEvent;
  }
});
Object.defineProperty(exports, 'SortableSortedEvent', {
  enumerable: true,
  get: function get() {
    return _SortableEvent.SortableSortedEvent;
  }
});
Object.defineProperty(exports, 'SortableStopEvent', {
  enumerable: true,
  get: function get() {
    return _SortableEvent.SortableStopEvent;
  }
});

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortableStopEvent = exports.SortableSortedEvent = exports.SortableSortEvent = exports.SortableStartEvent = exports.SortableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(5);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base sortable event
 * @class SortableEvent
 * @module SortableEvent
 * @extends AbstractEvent
 */
var SortableEvent = exports.SortableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(SortableEvent, _AbstractEvent);

  function SortableEvent() {
    (0, _classCallCheck3.default)(this, SortableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SortableEvent.__proto__ || Object.getPrototypeOf(SortableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableEvent, [{
    key: 'dragEvent',


    /**
     * Original drag event that triggered this sortable event
     * @property dragEvent
     * @type {DragEvent}
     * @readonly
     */
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return SortableEvent;
}(_AbstractEvent3.default);

/**
 * Sortable start event
 * @class SortableStartEvent
 * @module SortableStartEvent
 * @extends SortableEvent
 */


SortableEvent.type = 'sortable';

var SortableStartEvent = exports.SortableStartEvent = function (_SortableEvent) {
  (0, _inherits3.default)(SortableStartEvent, _SortableEvent);

  function SortableStartEvent() {
    (0, _classCallCheck3.default)(this, SortableStartEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SortableStartEvent.__proto__ || Object.getPrototypeOf(SortableStartEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableStartEvent, [{
    key: 'startIndex',


    /**
     * Start index of source on sortable start
     * @property startIndex
     * @type {Number}
     * @readonly
     */
    get: function get() {
      return this.data.startIndex;
    }

    /**
     * Start container on sortable start
     * @property startContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'startContainer',
    get: function get() {
      return this.data.startContainer;
    }
  }]);
  return SortableStartEvent;
}(SortableEvent);

/**
 * Sortable sort event
 * @class SortableSortEvent
 * @module SortableSortEvent
 * @extends SortableEvent
 */


SortableStartEvent.type = 'sortable:start';
SortableStartEvent.cancelable = true;

var SortableSortEvent = exports.SortableSortEvent = function (_SortableEvent2) {
  (0, _inherits3.default)(SortableSortEvent, _SortableEvent2);

  function SortableSortEvent() {
    (0, _classCallCheck3.default)(this, SortableSortEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SortableSortEvent.__proto__ || Object.getPrototypeOf(SortableSortEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableSortEvent, [{
    key: 'currentIndex',


    /**
     * Index of current draggable element
     * @property currentIndex
     * @type {Number}
     * @readonly
     */
    get: function get() {
      return this.data.currentIndex;
    }

    /**
     * Draggable element you are hovering over
     * @property over
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'over',
    get: function get() {
      return this.data.oldIndex;
    }

    /**
     * Draggable container element you are hovering over
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'overContainer',
    get: function get() {
      return this.data.newIndex;
    }
  }]);
  return SortableSortEvent;
}(SortableEvent);

/**
 * Sortable sorted event
 * @class SortableSortedEvent
 * @module SortableSortedEvent
 * @extends SortableEvent
 */


SortableSortEvent.type = 'sortable:sort';
SortableSortEvent.cancelable = true;

var SortableSortedEvent = exports.SortableSortedEvent = function (_SortableEvent3) {
  (0, _inherits3.default)(SortableSortedEvent, _SortableEvent3);

  function SortableSortedEvent() {
    (0, _classCallCheck3.default)(this, SortableSortedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SortableSortedEvent.__proto__ || Object.getPrototypeOf(SortableSortedEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableSortedEvent, [{
    key: 'oldIndex',


    /**
     * Index of last sorted event
     * @property oldIndex
     * @type {Number}
     * @readonly
     */
    get: function get() {
      return this.data.oldIndex;
    }

    /**
     * New index of this sorted event
     * @property newIndex
     * @type {Number}
     * @readonly
     */

  }, {
    key: 'newIndex',
    get: function get() {
      return this.data.newIndex;
    }

    /**
     * Old container of draggable element
     * @property oldContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'oldContainer',
    get: function get() {
      return this.data.oldContainer;
    }

    /**
     * New container of draggable element
     * @property newContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'newContainer',
    get: function get() {
      return this.data.newContainer;
    }
  }]);
  return SortableSortedEvent;
}(SortableEvent);

/**
 * Sortable stop event
 * @class SortableStopEvent
 * @module SortableStopEvent
 * @extends SortableEvent
 */


SortableSortedEvent.type = 'sortable:sorted';

var SortableStopEvent = exports.SortableStopEvent = function (_SortableEvent4) {
  (0, _inherits3.default)(SortableStopEvent, _SortableEvent4);

  function SortableStopEvent() {
    (0, _classCallCheck3.default)(this, SortableStopEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SortableStopEvent.__proto__ || Object.getPrototypeOf(SortableStopEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableStopEvent, [{
    key: 'oldIndex',


    /**
     * Original index on sortable start
     * @property oldIndex
     * @type {Number}
     * @readonly
     */
    get: function get() {
      return this.data.oldIndex;
    }

    /**
     * New index of draggable element
     * @property newIndex
     * @type {Number}
     * @readonly
     */

  }, {
    key: 'newIndex',
    get: function get() {
      return this.data.newIndex;
    }

    /**
     * Original container of draggable element
     * @property oldContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'oldContainer',
    get: function get() {
      return this.data.oldContainer;
    }

    /**
     * New container of draggable element
     * @property newContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'newContainer',
    get: function get() {
      return this.data.newContainer;
    }
  }]);
  return SortableStopEvent;
}(SortableEvent);

SortableStopEvent.type = 'sortable:stop';

/***/ })
/******/ ]);
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDE0NjNhOTgwNzIxN2ViODc3ZGMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2hvcGlmeS9kcmFnZ2FibGUvbGliL2RyYWdnYWJsZS5idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImFwcGVuZCIsInJlbW92ZUFsbFNoYWRvd0NsYXNzZXMiLCJlbGVtZW50IiwicmVtb3ZlQ2xhc3MiLCJpbmRleCIsImNsYXNzTmFtZSIsIm1hdGNoIiwiam9pbiIsIk1vYmlsZU1lbnUiLCJ3aW5kb3ciLCJhY3RpdmF0b3IiLCJTZWxlY3RvcnNfIiwiSEFNQlVSR0VSX0NPTlRBSU5FUiIsInVuZGVybGF5IiwiVU5ERVJMQVkiLCJpbml0IiwicHJvdG90eXBlIiwiQ3NzQ2xhc3Nlc18iLCJWSVNJQkxFIiwiTU9CSUxFX01FTlUiLCJvcGVuTWVudSIsImFkZENsYXNzIiwiY2xvc2VNZW51IiwibW9iaWxlTWVudSIsIm9uIiwiYmluZCIsImluaXRBbGwiLCJlYWNoIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImRhdGEiLCJoZWFkZXIiLCJmaW5kIiwiRElBTE9HX0hFQURFUiIsImNvbnRlbnQiLCJESUFMT0dfQ09OVEVOVCIsImJlZm9yZSIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dMb2FkZXIiLCJzaG93IiwiaGlkZSIsImhpZGVMb2FkZXIiLCJzaG93RGlhbG9nIiwiaGlkZURpYWxvZyIsImRpYWxvZyIsInB1c2giLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJlcSIsImNzcyIsIlByb2plY3RUb3BpY3MiLCJBRERfVE9QSUNfSU5QVVQiLCJORVdfVE9QSUNfSU5QVVRfQ09OVEFJTkVSIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJwcm9qZWN0VG9waWNzIiwiYWRkVG9waWNUb1Byb2plY3QiLCJwcm9qZWN0SWQiLCJ0b3BpY05hbWUiLCJhamF4VXJsIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJ0b3BpY19uYW1lIiwicHJvamVjdF9pZCIsInN1Y2Nlc3MiLCJKU09OIiwicGFyc2UiLCJ2YWwiLCJhZnRlciIsImRvbmUiLCJyZW1vdmVUb3BpY0Zyb21Qcm9qZWN0IiwidG9waWNJZCIsInRvcGljX2lkIiwib2JqIiwicmVtb3ZlIiwidXBkYXRlUHJvamVjdFByaW1hcnlUb3BpYyIsInN3YXBwYWJsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImRyYWdnYWJsZSIsIm9yaWdpbmFsUHJpbWFyeVRvcGljSWQiLCJrZXlwcmVzcyIsImUiLCJ3aGljaCIsInBhcmVudCIsImZvY3VzIiwiQWpheEZ1bmN0aW9ucyIsIlNFQVJDSF9JTlBVVCIsIlNFQVJDSF9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQlVUVE9OIiwiTE9HX0lOX0RJQUxPRyIsIkNIQU5HRV9BVVRIX0RJQUxPRyIsImRlbGV0ZVByb2plY3QiLCJwcm9qZWN0TmFtZSIsImNvbmZpcm0iLCJsb2NhdGlvbiIsImhyZWYiLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJoYXNDbGFzcyIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwicmVzcG9uc2UiLCJodG1sIiwibWV0aG9kIiwiY29udGV4dCIsImRlbGV0ZVRvcGljIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwicHJlcGVuZCIsIk1hcmtlciIsImxlbmd0aCIsInNlbGVjdGVkU3R1ZGVudCIsInNlbGVjdGVkU3VwZXJ2aXNvciIsInN0dWRlbnRUYWJsZSIsInN0dWRlbnREYXRhVGFibGUiLCJzdXBlcnZpc29yVGFibGUiLCJzdXBlcnZpc29yRGF0YVRhYmxlIiwibWFya2VyIiwic2VsZWN0U3R1ZGVudCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdHVkZW50Um93RE9NIiwidW5zZWxlY3RBbGwiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0IiwidGV4dCIsIm1hcmtlcklkIiwibWFya2VyX2lkIiwicHJvamVjdHNfcGFnZU51bWJlciIsInByb2plY3RzX2VuZE9mVGFibGUiLCJwcm9qZWN0c19hd2FpdGluZ1Jlc3BvbnNlIiwic2Nyb2xsIiwic2Nyb2xsVG9wIiwiaGVpZ2h0IiwidXJsUGF0aCIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJhZ2VudHNfcGFnZU51bWJlciIsImFnZW50c19lbmRPZlRhYmxlIiwiYWdlbnRzX2F3YWl0aW5nUmVzcG9uc2UiLCJzdHVkZW50X2lkIiwicmVqZWN0U3R1ZGVudCIsImFjY2VwdFN0dWRlbnQiLCJzdGF0dXMiLCJwYXJlbnRzIiwiZW1haWxTdHJpbmciLCJjaGVja2JveFNlbGVjdG9yIiwiZW1haWxCdXR0b25zZWxlY3RvciIsImFsZXJ0IiwicHJl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QU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxPQUFPO0FBQ1A7QUFD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QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNk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QUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFD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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3Qjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsbUNBQW1DO0FBQ2hELGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxZQUFZO0FBQzNCLGdCQUFnQjtBQUNoQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSx1QkFBdUI7QUFDdEM7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3Qjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUEsVUFBVTtBQUNWOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTztBQUNQO0FBQ0EsQ0FBQyxFOzs7Ozs7QUN6L1FELHlDIiwiZmlsZSI6IlxcanNcXG1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwMTQ2M2E5ODA3MjE3ZWI4NzdkYyIsImltcG9ydCB7U3dhcHBhYmxlfSBmcm9tICdAc2hvcGlmeS9kcmFnZ2FibGUnO1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKiBGSUxFIFNUUlVDVFVSRVxyXG5cclxuMS4gQUpBWCBTZXR1cFxyXG4yLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuMy4gSGVscGVyIEZ1bmN0aW9uc1xyXG40LiBDb21wb25lbnRzXHJcblx0NC4xIE1vYmlsZSBNZW51XHJcblx0NC4yIERpYWxvZyAvIE1vZGFsXHJcblx0NC4zIERhdGEgVGFibGVcclxuXHQ0LjQgUHJvamVjdCBUb3BpY3MgW1N1cGVydmlzb3JdXHJcblx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQ0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG41LiBTZWNvbmQgTWFya2VyXHJcbjYuIER5bmFtaWMgUGFnaW5hdGlvblxyXG43LiBTdXBlcnZpc29yXHJcbjguIE90aGVyXHJcbjkuIEluaXRpYWxpc2UgRXZlcnl0aGluZ1xyXG4qL1xyXG5cclxuLyogPT09PT09PT09PT09PT09PVxyXG5cdDEuIEFKQVggU2V0dXBcclxuICAgPT09PT09PT09PT09PT09PSAqL1xyXG4kLmFqYXhTZXR1cCh7XHJcblx0aGVhZGVyczoge1xyXG5cdFx0J1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JyksXHJcblx0XHQnTUFERS1CWSc6ICdMZXdpcyBKb2huc29uJ1xyXG5cdH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ1bmRlcmxheVwiPjwvZGl2PicpO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdDMuIEhlbHBlcnMgRnVuY3Rpb25zXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZnVuY3Rpb24gcmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhlbGVtZW50KXtcclxuXHQkKGVsZW1lbnQpLnJlbW92ZUNsYXNzIChmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xyXG5cdFx0cmV0dXJuIChjbGFzc05hbWUubWF0Y2ggKC9cXGJzaGFkb3dcXC1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PVxyXG5cdDQuIENvbXBvbmVudHNcclxuICAgPT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT1cclxuXHQgNC4xIE1vYmlsZSBNZW51XHJcbiAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgbW9iaWxlIG1lbnUuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBNb2JpbGVNZW51ID0gIGZ1bmN0aW9uIE1vYmlsZU1lbnUoZWxlbWVudCkge1xyXG5cdGlmKHdpbmRvd1snTW9iaWxlTWVudSddID09IG51bGwpe1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuYWN0aXZhdG9yID0gJCh0aGlzLlNlbGVjdG9yc18uSEFNQlVSR0VSX0NPTlRBSU5FUik7XHJcblx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0VklTSUJMRTogJ2lzLXZpc2libGUnXHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdE1PQklMRV9NRU5VOiAnbmF2Lm1vYmlsZScsXHJcblx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRVTkRFUkxBWTogJy5tb2JpbGUtbmF2LXVuZGVybGF5J1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XHJcblx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVklTSUJMRSk7XHJcblxyXG5cdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlZJU0lCTEUpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5WSVNJQkxFKTtcclxuXHJcblx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5WSVNJQkxFKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIG1vYmlsZU1lbnUgPSB0aGlzO1xyXG5cdHRoaXMuYWN0aXZhdG9yLm9uKCdjbGljaycsIG1vYmlsZU1lbnUub3Blbk1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0dGhpcy51bmRlcmxheS5vbignY2xpY2snLCBtb2JpbGVNZW51LmNsb3NlTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uTU9CSUxFX01FTlUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLm1vYmlsZU1lbnUgPSBuZXcgTW9iaWxlTWVudSh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09XHJcblx0NC4yIERpYWxvZyAvIE1vZGFsXHJcbiAgID09PT09PT09PT09PT09PT09PT09ICovXHJcbnZhciBEaWFsb2cgPSBmdW5jdGlvbiBEaWFsb2coZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5kaWFsb2dOYW1lID0gJChlbGVtZW50KS5kYXRhKCdkaWFsb2cnKTtcclxuXHR0aGlzLnVuZGVybGF5ID0gJCgnLnVuZGVybGF5Jyk7XHJcblx0dGhpcy5oZWFkZXIgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19IRUFERVIpO1xyXG5cdHRoaXMuY29udGVudCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0NPTlRFTlQpO1xyXG5cdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0dGhpcy5sb2FkZXIgPSAkKGVsZW1lbnQpLmZpbmQoXCIubG9hZGVyXCIpO1xyXG5cdHRoaXMuaXNDbG9zYWJsZSA9IHRydWU7XHJcblx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG53aW5kb3dbJ0RpYWxvZyddID0gRGlhbG9nO1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdExPQURFUjogJzxkaXYgY2xhc3M9XCJsb2FkZXJcIiBzdHlsZT1cIndpZHRoOiAxMDBweDsgaGVpZ2h0OiAxMDBweDt0b3A6IDI1JTtcIj48L2Rpdj4nLFxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRBQ1RJVkU6ICdhY3RpdmUnLFxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdERJQUxPRzogJy5kaWFsb2cnLFxyXG5cdERJQUxPR19IRUFERVI6ICcuaGVhZGVyJyxcclxuXHRESUFMT0dfQ09OVEVOVDogJy5jb250ZW50JyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuc2hvd0xvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5sb2FkZXIuc2hvdygwKTtcclxuXHR0aGlzLmNvbnRlbnQuaGlkZSgwKTtcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuaGlkZUxvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5sb2FkZXIuaGlkZSgwKTtcclxuXHR0aGlzLmNvbnRlbnQuc2hvdygwKTtcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIsIHRoaXMuZGlhbG9nTmFtZSk7XHJcblx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHR3aW5kb3dbJ01vYmlsZU1lbnUnXS5jbG9zZU1lbnUoKTtcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuaGlkZURpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5pc0Nsb3NhYmxlICYmIHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIpID09IHRoaXMuZGlhbG9nTmFtZSl7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHR9XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdC8vIE5lZWRlZCBmb3IgY29udGV4dFxyXG5cdHZhciBkaWFsb2cgPSB0aGlzO1xyXG5cclxuXHQvLyBGaW5kIGFjdGl2YXRvciBidXR0b25cclxuXHQkKCdidXR0b24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoJCh0aGlzKS5kYXRhKCdhY3RpdmF0b3InKSAmJiAkKHRoaXMpLmRhdGEoJ2RpYWxvZycpID09IGRpYWxvZy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0ZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMucHVzaCgkKHRoaXMpKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gQWRkIHNlcGVyYXRvciBhZnRlciBoZWFkZXJcclxuXHRkaWFsb2cuaGVhZGVyLmFwcGVuZCgnPGhyPicpO1xyXG5cclxuXHQvLyBGb3IgZGlzYWJpbHR5XHJcblx0ZGlhbG9nLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHJcblx0Ly8gU2V0IHVuZGVybGF5XHJcblx0ZGlhbG9nLnVuZGVybGF5Lm9uKCdjbGljaycsIGRpYWxvZy5oaWRlRGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblxyXG5cdHRyeXtcclxuXHRcdCQoZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcykub24oJ2NsaWNrJywgZGlhbG9nLnNob3dEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHRcdH0pO1xyXG5cdH0gY2F0Y2goZXJyKXtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJEaWFsb2cgXCIgKyBkaWFsb2cuZGlhbG9nTmFtZSArIFwiIGhhcyBubyBhY3RpdmF0b3IgYnV0dG9uLlwiKTtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHR9XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLkRJQUxPRykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuZGlhbG9nID0gbmV3IERpYWxvZyh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT1cclxuXHQ0LjMgRGF0YSBUYWJsZVxyXG4gICA9PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcbipcclxuKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIERhdGFUYWJsZSA9IGZ1bmN0aW9uIERhdGFUYWJsZShlbGVtZW50KSB7XHJcblx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHR0aGlzLmZvb3RSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Zm9vdCB0cicpO1xyXG5cdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0dGhpcy5jaGVja2JveGVzID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5DSEVDS0JPWCk7XHJcblx0dGhpcy5tYXN0ZXJDaGVja2JveCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uTUFTVEVSX0NIRUNLQk9YKTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snRGF0YVRhYmxlJ10gPSBEYXRhVGFibGU7XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICcuZGF0YS10YWJsZScsXHJcblx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0Q0hFQ0tCT1g6ICd0Ym9keSAuY2hlY2tib3gtaW5wdXQnLFxyXG5cdElTX1NFTEVDVEVEOiAnLmlzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0c2VsZWN0QWxsUm93czogZnVuY3Rpb24oKSB7XHJcblx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0dGhpcy5yb3dzLmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5yb3dzLnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNlbGVjdFJvdzogZnVuY3Rpb24gKGNoZWNrYm94LCByb3cpIHtcclxuXHRcdGlmIChyb3cpIHtcclxuXHRcdFx0aWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0cm93LmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJvdy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHQkKHRoaXMuY2hlY2tib3hlcykuZWFjaChmdW5jdGlvbihpKSB7XHJcblx0XHQkKHRoaXMpLm9uKCdjaGFuZ2UnLCAkLnByb3h5KGRhdGFUYWJsZS5mdW5jdGlvbnMuc2VsZWN0Um93LCB0aGlzLCAkKHRoaXMpLCBkYXRhVGFibGUuYm9keVJvd3MuZXEoaSkpKTtcclxuXHR9KTtcclxuXHJcblx0JCh0aGlzLmhlYWRlcnMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0JCh0aGlzKS5jc3MoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLkRBVEFfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQ0LjQgUHJvamVjdCBUb3BpY3MgW1N1cGVydmlzb3JdXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiogQ2xhc3MgY29uc3RydWN0b3IgZm9yIHByb2plY3QgdG9waWNzLlxyXG4qXHJcbiogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBQcm9qZWN0VG9waWNzID0gIGZ1bmN0aW9uIFByb2plY3RUb3BpY3MoKSB7fTtcclxud2luZG93WydQcm9qZWN0VG9waWNzJ10gPSBQcm9qZWN0VG9waWNzO1xyXG5cclxuUHJvamVjdFRvcGljcy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5Qcm9qZWN0VG9waWNzLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdEFERF9UT1BJQ19JTlBVVDogJyNhZGRUb3BpY0lucHV0JyxcclxuXHRORVdfVE9QSUNfSU5QVVRfQ09OVEFJTkVSOiAnI25ldy10b3BpYy1pbnB1dC1jb250YWluZXInLFxyXG59O1xyXG5cclxuUHJvamVjdFRvcGljcy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0U1BBQ0U6IDMyLFxyXG5cdEVOVEVSOiAxMyxcclxuXHRDT01NQTogNDVcclxufTtcclxuXHJcbnZhciBwcm9qZWN0VG9waWNzID0gbmV3IFByb2plY3RUb3BpY3MoKTtcclxuXHJcblByb2plY3RUb3BpY3MucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRhZGRUb3BpY1RvUHJvamVjdDogZnVuY3Rpb24gKHByb2plY3RJZCwgdG9waWNOYW1lKSB7XHJcblx0XHQkKCcubG9hZGVyJykuc2hvdygwKTtcclxuXHRcdHZhciBhamF4VXJsID0gXCIvcHJvamVjdHMvdG9waWMtYWRkXCI7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBPU1RcIixcclxuXHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0dG9waWNfbmFtZTogdG9waWNOYW1lLFxyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHQkKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5BRERfVE9QSUNfSU5QVVQpLnZhbCgnJyk7XHJcblx0XHRcdFx0JChcIi50b3BpY3MtbGlzdC5lZGl0IGxpLnRvcGljOmxhc3RcIikuYWZ0ZXIoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyBkYXRhW1wiaWRcIl0gKyAnXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ0b3BpYy1yZW1vdmVcIj5YPC9idXR0b24+PHAgY2xhc3M9XCJ0b3BpYy1uYW1lXCI+JyArIGRhdGFbXCJuYW1lXCJdICsgJzwvcD48L2xpPicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQkKCdib2R5JykuYXBwZW5kKGRhdGEpO1xyXG5cdFx0XHQkKCcubG9hZGVyJykuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZVRvcGljRnJvbVByb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljSWQpIHtcclxuXHRcdCQoJy5sb2FkZXInKS5zaG93KDApO1xyXG5cdFx0dmFyIGFqYXhVcmwgPSBcIi9wcm9qZWN0cy90b3BpYy1yZW1vdmVcIjtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiREVMRVRFXCIsXHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHRvcGljX2lkIDogdG9waWNJZCxcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcudG9waWNzLWxpc3QuZWRpdCBsaS50b3BpYycpLmVhY2goZnVuY3Rpb24oaSwgb2JqKSB7XHJcblx0XHRcdFx0XHRpZigkKHRoaXMpLmRhdGEoJ3RvcGljLWlkJykgPT0gdG9waWNJZCl7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5sb2FkZXInKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dXBkYXRlUHJvamVjdFByaW1hcnlUb3BpYzogZnVuY3Rpb24gKHByb2plY3RJZCwgdG9waWNJZCkge1xyXG5cdFx0JCgnLmxvYWRlcicpLnNob3coMCk7XHJcblx0XHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL3RvcGljLXVwZGF0ZS1wcmltYXJ5XCI7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHRvcGljX2lkIDogdG9waWNJZCxcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcjZWRpdFByb2plY3RGb3JtJykuYXR0cignZGF0YS1wcm9qZWN0LWlkJywgdG9waWNJZCk7XHJcblx0XHRcdFx0JCgnLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWMnKS5lYWNoKGZ1bmN0aW9uKGksIG9iaikge1xyXG5cdFx0XHRcdFx0aWYoJCh0aGlzKS5kYXRhKCd0b3BpYy1pZCcpID09IHRvcGljSWQpe1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwiZmlyc3RcIik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmlyc3RcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5sb2FkZXInKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSxcclxufTtcclxuXHJcbmNvbnN0IHN3YXBwYWJsZSA9IG5ldyBTd2FwcGFibGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvcGljcy1saXN0LmVkaXQnKSwge1xyXG5cdGRyYWdnYWJsZTogJy50b3BpYycsXHJcbn0pO1xyXG5cclxuc3dhcHBhYmxlLm9uKCdzd2FwcGFibGU6c3dhcHBlZCcsIGZ1bmN0aW9uKCl7XHJcblx0dmFyIHByb2plY3RJZCA9ICQoJyNlZGl0UHJvamVjdEZvcm0nKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0dmFyIG9yaWdpbmFsUHJpbWFyeVRvcGljSWQgPSAkKCcjZWRpdFByb2plY3RGb3JtJykuZGF0YSgncHJpbWFyeS10b3BpYy1pZCcpO1xyXG5cdHZhciB0b3BpY0lkID0gJChcIi50b3BpY3MtbGlzdC5lZGl0IGxpOmZpcnN0LWNoaWxkXCIpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0aWYodG9waWNJZCAhPSBvcmlnaW5hbFByaW1hcnlUb3BpY0lkKXtcclxuXHRcdHByb2plY3RUb3BpY3MuZnVuY3Rpb25zLnVwZGF0ZVByb2plY3RQcmltYXJ5VG9waWMocHJvamVjdElkLCB0b3BpY0lkKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gQWRkIG5ldyB0b3BpY1xyXG4kKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5BRERfVE9QSUNfSU5QVVQpLmtleXByZXNzKGZ1bmN0aW9uKGUpIHtcclxuXHRpZiAoZS53aGljaCA9PSBwcm9qZWN0VG9waWNzLktleXNfLkVOVEVSKSB7XHJcblx0XHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0cHJvamVjdFRvcGljcy5mdW5jdGlvbnMuYWRkVG9waWNUb1Byb2plY3QocHJvamVjdElkLCAkKHRoaXMpLnZhbCgpKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gUmVtb3ZlIHRvcGljXHJcbiQoJy50b3BpY3MtbGlzdC5lZGl0Jykub24oJ2NsaWNrJywgJy50b3BpYyAudG9waWMtcmVtb3ZlJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdHZhciB0b3BpY0lkID0gJCh0aGlzKS5wYXJlbnQoJ2xpJykuZGF0YSgndG9waWMtaWQnKTtcclxuXHRwcm9qZWN0VG9waWNzLmZ1bmN0aW9ucy5yZW1vdmVUb3BpY0Zyb21Qcm9qZWN0KHByb2plY3RJZCwgdG9waWNJZCk7XHJcbn0pO1xyXG5cclxuJChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uTkVXX1RPUElDX0lOUFVUX0NPTlRBSU5FUikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0JChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uQUREX1RPUElDX0lOUFVUKS5mb2N1cygpO1xyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQ0LjUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcbipcclxuKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG53aW5kb3dbJ0FqYXhGdW5jdGlvbnMnXSA9IEFqYXhGdW5jdGlvbnM7XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0U0VBUkNIX0lOUFVUOiAnLnNlYXJjaC1pbnB1dCcsXHJcblx0U0VBUkNIX0NPTlRBSU5FUjogJy5zZWFyY2gtY29udGFpbmVyJyxcclxuXHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0U0VBUkNIX0ZJTFRFUl9CVVRUT046ICcjc2VhcmNoLWZpbHRlci1idXR0b24nLFxyXG5cdExPR19JTl9ESUFMT0c6ICcubG9naW4uZGlhbG9nJyxcclxuXHRDSEFOR0VfQVVUSF9ESUFMT0c6ICcuY2hhbmdlLWF1dGguZGlhbG9nJ1xyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0U1BBQ0U6IDMyLFxyXG5cdEVOVEVSOiAxMyxcclxuXHRDT01NQTogNDVcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRkZWxldGVQcm9qZWN0OiBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcclxuXHRcdGlmKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIFxcXCJcIiArIHByb2plY3ROYW1lICtcIlxcXCI/XCIpKXtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR0eXBlOiBcIkRFTEVURVwiLFxyXG5cdFx0XHRcdHVybDogXCJlZGl0XCIsXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24odXJsKXtcclxuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuLi9cIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXNcclxuJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy1mb2N1cycpO1xyXG59KTtcclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXMgb3V0XHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1c291dCcsICBmdW5jdGlvbihlKXtcclxuXHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctMmRwJyk7XHJcbn0pO1xyXG5cclxuLy8gU0VBUkNIXHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0JVVFRPTikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIGNvbnRhaW5lciA9ICQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0NPTlRBSU5FUik7XHJcblx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdGlmKGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0Y29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0fSBlbHNle1xyXG5cdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgRWRpdFRvcGljID0gZnVuY3Rpb24gRWRpdFRvcGljKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHR0aGlzLnRvcGljSWQgPSAkKGVsZW1lbnQpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0dGhpcy5kZWxldGVCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5kZWxldGUtdG9waWMnKTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snRWRpdFRvcGljJ10gPSBFZGl0VG9waWM7XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge307XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFBBVENIX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciByZXNwb25zZSA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gXFxcIlwiICsgIHRoaXMub3JpZ2luYWxOYW1lICtcIlxcXCIgdG8gXFxcIlwiICsgIHRoaXMudG9waWNOYW1lSW5wdXQudmFsKCkgK1wiXFxcIj9cIik7XHJcblxyXG5cdFx0aWYocmVzcG9uc2Upe1xyXG5cdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdHRoaXMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdCQoJy5sb2FkZXInLCB0aGlzLmVsZW1lbnQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRtZXRob2Q6ICdQQVRDSCcsXHJcblx0XHRcdFx0dXJsOiB0aGlzLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRjb250ZXh0OiB0aGlzLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdHRvcGljX2lkOiB0aGlzLnRvcGljSWQsXHJcblx0XHRcdFx0XHR0b3BpY19uYW1lIDogdGhpcy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHRcdHRoaXMuZWRpdEJ1dHRvbi5odG1sKCdFZGl0Jyk7XHJcblx0XHRcdFx0dGhpcy5vcmlnaW5hbE5hbWUgPSB0aGlzLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudG9waWNOYW1lSW5wdXQudmFsKHRoaXMub3JpZ2luYWxOYW1lKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRkZWxldGVUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcmVzcG9uc2UgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgdG9waWMgXFxcIlwiICsgIHRoaXMub3JpZ2luYWxOYW1lICtcIlxcXCI/XCIpO1xyXG5cdFx0aWYocmVzcG9uc2Upe1xyXG5cdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcclxuXHRcdFx0XHR1cmw6IHRoaXMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdGNvbnRleHQ6IHRoaXMsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0dG9waWNfaWQ6IHRoaXMudG9waWNJZCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuaGlkZSg4MDAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjcmVhdGVFZGl0VG9waWNET006IGZ1bmN0aW9uKHRvcGljSWQsIG9yaWdpbmFsTmFtZSl7XHJcblx0XHQkKFwiLmVkaXQtdG9waWMtbGlzdFwiKS5wcmVwZW5kKCc8bGkgY2xhc3M9XCJ0b3BpY1wiIGRhdGEtdG9waWMtaWQ9XCInICsgdG9waWNJZCArJ1wiIGRhdGEtb3JpZ2luYWwtdG9waWMtbmFtZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48aW5wdXQgc3BlbGxjaGVjaz1cInRydWVcIiBuYW1lPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBlZGl0LXRvcGljXCIgdHlwZT1cInN1Ym1pdFwiPkVkaXQ8L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRlbGV0ZS10b3BpYyBidXR0b24tLWRhbmdlclwiPkRlbGV0ZTwvYnV0dG9uPjwvbGk+Jyk7XHJcblx0XHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHR9XHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGVkaXRUb3BpYyA9IHRoaXM7XHJcblx0dGhpcy5lZGl0QnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZWRpdFRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHR0aGlzLmRlbGV0ZUJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmRlbGV0ZVRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5FRElUX1RPUElDKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5FZGl0VG9waWMgPSBuZXcgRWRpdFRvcGljKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09XHJcblx0NS4gU2Vjb25kIE1hcmtlclxyXG4gICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbnZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIG1hcmtlciA9IHRoaXM7XHJcblxyXG5cdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50KHRoaXMsIG1hcmtlcik7XHJcblx0fSk7XHJcblxyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yKHRoaXMsIG1hcmtlcik7XHJcblx0fSk7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50ID0gZnVuY3Rpb24oc3R1ZGVudFJvd0RPTSwgbWFya2VyKXtcclxuXHR2YXIgcm93ID0gJChzdHVkZW50Um93RE9NKTtcclxuXHJcblx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9ICQocm93KTtcclxuXHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuZGF0YSgnbWFya2VyLWlkJykgPT0gcm93LmRhdGEoJ3N1cGVydmlzb3ItaWQnKSl7XHJcblx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvciA9IGZ1bmN0aW9uKHN1cGVydmlzb3JSb3dET00sIG1hcmtlcil7XHJcblx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdGlmKHJvdy5hdHRyKCdkaXNhYmxlZCcpKXtyZXR1cm47fVxyXG5cclxuXHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ICE9IG51bGwpe1xyXG5cdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gcm93O1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nKFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N1cGVydmlzb3ItbmFtZScpLFxyXG5cdFx0XHRyb3cuZGF0YSgnbWFya2VyLW5hbWUnKSxcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JykpO1xyXG5cdH1cclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5yZXNldFZpZXcgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUudW5zZWxlY3RBbGwgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oc3R1ZGVudE5hbWUsIHN1cGVydmlzb3JOYW1lLCBtYXJrZXJOYW1lLCBwcm9qZWN0KXtcclxuXHQkKFwiI3N0dWRlbnQtbmFtZVwiKS50ZXh0KHN0dWRlbnROYW1lKTtcclxuXHQkKFwiI3N1cGVydmlzb3ItbmFtZVwiKS50ZXh0KHN1cGVydmlzb3JOYW1lKTtcclxuXHQkKFwiI21hcmtlci1uYW1lXCIpLnRleHQobWFya2VyTmFtZSk7XHJcblxyXG5cdCQoXCIjcHJvamVjdC10aXRsZVwiKS5odG1sKCc8Yj5UaXRsZTogPC9iPicgKyBwcm9qZWN0W1widGl0bGVcIl0pO1xyXG5cdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0W1wiZGVzY3JpcHRpb25cIl0pO1xyXG5cclxuXHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxufVxyXG5cclxuJCgnI3N1Ym1pdEFzc2lnbk1hcmtlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0dmFyIG1hcmtlciA9IHdpbmRvd1snTWFya2VyJ107XHJcblxyXG5cdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPT0gbnVsbCB8fCBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID09IG51bGwpe1xyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRyZXR1cm47XHJcblx0fTtcclxuXHJcblx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdHZhciBwcm9qZWN0SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKVtcImlkXCJdO1xyXG5cdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblx0dmFyIGFqYXhVcmwgPSBcIi9wcm9qZWN0cy9tYXJrZXItYXNzaWduXCI7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZCxcclxuXHRcdFx0bWFya2VyX2lkOiBtYXJrZXJJZFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuXHRcdH0sXHJcblx0XHQvLyBBZGQgZmFpbFxyXG5cdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5yZW1vdmUoKTtcclxuXHRcdG1hcmtlci5yZXNldFZpZXcobWFya2VyKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdDYuIER5bmFtaWMgUGFnaW5hdGlvblxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbnZhciBwcm9qZWN0c19wYWdlTnVtYmVyID0gMixcclxuXHRwcm9qZWN0c19lbmRPZlRhYmxlID0gZmFsc2UsXHJcblx0cHJvamVjdHNfYXdhaXRpbmdSZXNwb25zZSA9IGZhbHNlO1xyXG5cclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCkgPT0gJChkb2N1bWVudCkuaGVpZ2h0KCkpIHtcclxuXHJcblx0XHRpZighJCgnI3Byb2plY3QtdGFibGUnKS5oYXNDbGFzcyhcImluZGV4XCIpKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCFwcm9qZWN0c19lbmRPZlRhYmxlICYmICFwcm9qZWN0c19hd2FpdGluZ1Jlc3BvbnNlKXtcclxuXHRcdFx0JChcIi5sb2FkZXIucHJvamVjdHNcIikuc2hvdygpO1xyXG5cdFx0XHRwcm9qZWN0c19hd2FpdGluZ1Jlc3BvbnNlID0gdHJ1ZTtcclxuXHRcdFx0dmFyIHVybFBhdGggPSBcIi9wcm9qZWN0cz9wYXJ0aWFsPXRydWU/cGFnZT1cIiArIHByb2plY3RzX3BhZ2VOdW1iZXI7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dHlwZSA6ICdHRVQnLFxyXG5cdFx0XHRcdHVybDogdXJsUGF0aCxcclxuXHRcdFx0XHRzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHQkKFwiLmxvYWRlci5wcm9qZWN0c1wiKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRpZihkYXRhLmxlbmd0aCA9PSAwKXtcclxuXHRcdFx0XHRcdFx0cHJvamVjdHNfZW5kT2ZUYWJsZSA9IHRydWU7XHJcblx0XHRcdFx0XHRcdCQoJyNwcm9qZWN0LXRhYmxlJykuYWZ0ZXIoJzxkaXYgc3R5bGU9XCJ3aWR0aDogMTBweDtoZWlnaHQ6IDEwcHg7bWFyZ2luOiAxcmVtIGF1dG87YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjA3KTtib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTEpO2JvcmRlci1yYWRpdXM6IDkwcHg7XCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0JCgnI3Byb2plY3QtdGFibGUgdGJvZHknKS5hcHBlbmQoJChkYXRhKSk7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShcIlwiLCBcIlwiLCBcIi9wcm9qZWN0cz9wYWdlPVwiICsgcHJvamVjdHNfcGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRwcm9qZWN0c19wYWdlTnVtYmVyICs9IDE7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcjogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHQkKCcjcHJvamVjdC10YWJsZScpLmFmdGVyKCc8cCBzdHlsZT1cIm1hcmdpbjoxcmVtIGF1dG87dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6I2UwMDtcIj5UaGVyZVxcJ3MgYSBwcm9ibGVtIHJlYWNoaW5nIHRoZSBzZXJ2ZXIuPC9wPicpO1xyXG5cdFx0XHRcdFx0cHJvamVjdHNfYXdhaXRpbmdSZXNwb25zZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0JChcIi5sb2FkZXIucHJvamVjdHNcIikuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRwcm9qZWN0c19hd2FpdGluZ1Jlc3BvbnNlID0gZmFsc2U7XHJcblx0XHRcdFx0JChcIi5sb2FkZXIucHJvamVjdHNcIikuaGlkZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoXCIubG9hZGVyLnByb2plY3RzXCIpLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxudmFyIGFnZW50c19wYWdlTnVtYmVyID0gMixcclxuXHRhZ2VudHNfZW5kT2ZUYWJsZSA9IGZhbHNlLFxyXG5cdGFnZW50c19hd2FpdGluZ1Jlc3BvbnNlID0gZmFsc2U7XHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSA9PSAkKGRvY3VtZW50KS5oZWlnaHQoKSkge1xyXG5cclxuXHRcdGlmKCEkKCcjdXNlci1hZ2VudC10YWJsZScpKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCFhZ2VudHNfZW5kT2ZUYWJsZSAmJiAhYWdlbnRzX2F3YWl0aW5nUmVzcG9uc2Upe1xyXG5cdFx0XHQkKFwiLmxvYWRlci51c2VyLWFnZW50XCIpLnNob3coKTtcclxuXHRcdFx0YWdlbnRzX2F3YWl0aW5nUmVzcG9uc2UgPSB0cnVlO1xyXG5cdFx0XHR2YXIgdXJsUGF0aCA9IFwiL3N5c3RlbS91c2VyLWFnZW50P3BhcnRpYWw9dHJ1ZT9wYWdlPVwiICsgYWdlbnRzX3BhZ2VOdW1iZXI7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0dHlwZSA6ICdHRVQnLFxyXG5cdFx0XHRcdHVybDogdXJsUGF0aCxcclxuXHRcdFx0XHRzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHQkKFwiLmxvYWRlci51c2VyLWFnZW50XCIpLmhpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRpZihkYXRhLmxlbmd0aCA9PSAwKXtcclxuXHRcdFx0XHRcdFx0YWdlbnRzX2VuZE9mVGFibGUgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHQkKCcjdXNlci1hZ2VudC10YWJsZScpLmFmdGVyKCc8ZGl2IHN0eWxlPVwid2lkdGg6IDEwcHg7aGVpZ2h0OiAxMHB4O21hcmdpbjogMXJlbSBhdXRvO2JhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wNyk7Ym9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjExKTtib3JkZXItcmFkaXVzOiA5MHB4O1wiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdCQoJyN1c2VyLWFnZW50LXRhYmxlIHRib2R5JykuYXBwZW5kKCQoZGF0YSkpO1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoXCJcIiwgXCJcIiwgXCIvc3lzdGVtL3VzZXItYWdlbnQ/cGFnZT1cIiArIGFnZW50c19wYWdlTnVtYmVyKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRhZ2VudHNfcGFnZU51bWJlciArPSAxO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0JCgnI3VzZXItYWdlbnQtdGFibGUnKS5hZnRlcignPHAgc3R5bGU9XCJtYXJnaW46MXJlbSBhdXRvO3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiNlMDA7XCI+VGhlcmVcXCdzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLjwvcD4nKTtcclxuXHRcdFx0XHRcdGFnZW50c19hd2FpdGluZ1Jlc3BvbnNlID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGFnZW50c19hd2FpdGluZ1Jlc3BvbnNlID0gZmFsc2U7XHJcblx0XHRcdFx0JChcIi5sb2FkZXIudXNlci1hZ2VudFwiKS5oaWRlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JChcIi5sb2FkZXIudXNlci1hZ2VudFwiKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgNy4gU1VQRVJWSVNPUlxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8vIEFjY2VwdCBTdHVkZW50XHJcbiQoJy5zdXBlcnZpc29yLXRhYmxlIC5hY2NlcHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgc3R1ZGVudF9pZCA9ICQodGhpcykuZGF0YSgnc3R1ZGVudF9pZCcpO1xyXG5cdCQuYWpheCh7XHJcblx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdHVybDogJy9zdXBlcnZpc29yL3N0dWRlbnQtYWNjZXB0JyxcclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0c3R1ZGVudF9pZCA6IHN0dWRlbnRfaWRcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyBSZWplY3QgU3R1ZGVudFxyXG4kKCcuc3VwZXJ2aXNvci10YWJsZSAucmVqZWN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0cmVqZWN0U3R1ZGVudCgkKHRoaXMpLmRhdGEoJ3N0dWRlbnRfaWQnKSwgJCh0aGlzKS5kYXRhKCdwcm9qZWN0X2lkJykpO1xyXG59KTtcclxuXHJcbiQoJyNkZWxldGVQcm9qZWN0QnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuZGVsZXRlUHJvamVjdCgkKCcjdGl0bGUnKS52YWwoKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gYWNjZXB0U3R1ZGVudChzdHVkZW50X2lkKSB7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiByZWplY3RTdHVkZW50KHN0dWRlbnRfaWQsIHByb2plY3RfaWQpIHtcclxuXHQkLmFqYXgoe1xyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHR1cmw6ICcvc3VwZXJ2aXNvci9zdHVkZW50LXJlamVjdCcsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQgOiBwcm9qZWN0X2lkLFxyXG5cdFx0XHRzdHVkZW50X2lkIDogc3R1ZGVudF9pZFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4kKCcjc3R1ZGVudC1lZGl0LWxpc3QnKS5maW5kKCcuY2hlY2tib3ggaW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIHN0YXR1cyA9ICQodGhpcykucGFyZW50cygpLmVxKDMpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdHZhciBlbWFpbFN0cmluZyA9IFwibWFpbHRvOlwiO1xyXG5cdHZhciBjaGVja2JveFNlbGVjdG9yID0gJyNzdHVkZW50LWVkaXQtbGlzdC4nICsgc3RhdHVzICsgJyAuY2hlY2tib3ggaW5wdXQnO1xyXG5cdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblx0JChjaGVja2JveFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcblx0XHRcdGVtYWlsU3RyaW5nICs9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZGF0YSgnZW1haWwnKTtcclxuXHRcdFx0ZW1haWxTdHJpbmcgKz0gXCIsXCI7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0JChlbWFpbEJ1dHRvbnNlbGVjdG9yKS5wcm9wKCdocmVmJywgZW1haWxTdHJpbmcpO1xyXG59KTtcclxuXHJcbiQoJy5lZGl0LXN0dWRlbnQtbGlzdCAuZW1haWwtc2VsZWN0ZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0aWYoJCh0aGlzKS5wcm9wKCdocmVmJykgPT09ICdtYWlsdG86Jyl7XHJcblx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgOC4gT1RIRVJcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4kKCcuc2hvdy1tb3JlJykub24oJ2NsaWNrJywgIGZ1bmN0aW9uKGUpIHtcclxuXHQkKHRoaXMpLmhpZGUoKTtcclxuXHQkKCcucHJvamVjdCcpLmFkZENsYXNzKCdleHBhbmQnKTtcclxufSk7XHJcblxyXG4vLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcbiQoXCIudG9waWNzLWxpc3RcIikucHJlcGVuZCgkKFwiLmZpcnN0XCIpKTtcclxuXHJcbi8vIFNVUEVSVklTT1JcclxuXHJcblxyXG4kKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQT1NUJyxcclxuXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKHNob3dEaWFsb2cpe1xyXG5cdFx0XHRpZihzaG93RGlhbG9nID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uQ0hBTkdFX0FVVEhfRElBTE9HKVswXS5kaWFsb2cuaXNDbG9zYWJsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5DSEFOR0VfQVVUSF9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS50ZXh0KGRhdGFbXCJyZXNwb25zZUpTT05cIl1bXCJlcnJvcnNcIl1bXCJ1c2VybmFtZVwiXVswXSk7XHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdCQoJy5mb3JtLWZpZWxkJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4kKCcjbmV3LXRvcGljLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHJcblx0JCgnLmxvYWRlcicsIHN1Ym1pdEJ1dHRvbikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQT1NUJyxcclxuXHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zLmNyZWF0ZUVkaXRUb3BpY0RPTShkYXRhW1wiaWRcIl0sIGRhdGFbXCJuYW1lXCJdKTtcclxuXHRcdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAoKSB7fVxyXG5cdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuLy8gVXNlZCBmb3IgdHJhbnNhY3Rpb25zXHJcbiQoJyNzaG93LXJhdy10YWJsZS1kYXRhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0aWYoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpe1xyXG5cdFx0JCgndGFibGUuZnVsbC1kZXRhaWwnKS5oaWRlKCk7XHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLnNob3coKTtcclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5oaWRlKCk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIE5FVyBVU0VSXHJcbi8vIHB1dCB0aGlzIHN0dWZmIGluIGFuIGFycmF5XHJcbiQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG4kKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdGlmKCQoJyNzdHVkZW50LW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI2FkbWluLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIFNUUklOR1NcclxuJCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcbiQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0aWYoJCgnI3N0dWRlbnQtb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjYWRtaW4tb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PVxyXG5cdDkuIEluaXRpYWxpc2VcclxuICAgPT09PT09PT09PT09PT09ICovXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRGlhbG9nLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuTWFya2VyLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblxyXG4vLyBFTkQgT0YgRklMRVxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJEcmFnZ2FibGVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRHJhZ2dhYmxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRyYWdnYWJsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1Nyk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oNTkpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbi8qKiovIH0pLFxuLyogMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICgodHlwZW9mIGNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkwKTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5NCk7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IF9fd2VicGFja19yZXF1aXJlX18oNDYpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbi8qKiovIH0pLFxuLyogNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU4KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQWJzdHJhY3RFdmVudDIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBzdG9yZSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNCkoJ3drcycpXG4gICwgdWlkICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpXG4gICwgU3ltYm9sICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG5cbi8qKiovIH0pLFxuLyogNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbi8qKiovIH0pLFxuLyogOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgYW5PYmplY3QgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuICAsIElFOF9ET01fREVGSU5FID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjcpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cbi8qKiovIH0pLFxuLyogOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MSlcbiAgLCBkZWZpbmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuLyoqKi8gfSksXG4vKiAxMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIGNvcmUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNClcbiAgLCBjdHggICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KVxuICAsIGhpZGUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cbi8qKiovIH0pLFxuLyogMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhX193ZWJwYWNrX3JlcXVpcmVfXygxNykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG4vKioqLyB9KSxcbi8qIDEyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDEzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkUCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KVxuICAsIGNyZWF0ZURlc2MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSkgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG4vKioqLyB9KSxcbi8qIDE0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDE1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnNjcm9sbCA9IGV4cG9ydHMuY2xvc2VzdCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbG9zZXN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5Nyk7XG5cbnZhciBfY2xvc2VzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbG9zZXN0KTtcblxudmFyIF9zY3JvbGwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwOCk7XG5cbnZhciBfc2Nyb2xsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Njcm9sbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuY2xvc2VzdCA9IF9jbG9zZXN0Mi5kZWZhdWx0O1xuZXhwb3J0cy5zY3JvbGwgPSBfc2Nyb2xsMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuLyoqKi8gfSksXG4vKiAxNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuLyoqKi8gfSksXG4vKiAxOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cbi8qKiovIH0pLFxuLyogMTkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9TZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYzKTtcblxudmFyIF9TZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Vuc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1NlbnNvcjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAyMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vKioqLyB9KSxcbi8qIDIxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MClcbiAgLCBlbnVtQnVnS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMzUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDIyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDIzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IF9fd2VicGFja19yZXF1aXJlX18oOTkpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTtcblxuLyoqKi8gfSksXG4vKiAyNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1NlbnNvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTApO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NlbnNvckV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NlbnNvckV2ZW50LlNlbnNvckV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ1N0YXJ0U2Vuc29yRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnTW92ZVNlbnNvckV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnU3RvcFNlbnNvckV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NlbnNvckV2ZW50LkRyYWdTdG9wU2Vuc29yRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TZW5zb3JFdmVudC5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudDtcbiAgfVxufSk7XG5cbi8qKiovIH0pLFxuLyogMjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuTWlycm9yID0gZXhwb3J0cy5BY2Nlc3NpYmlsaXR5ID0gdW5kZWZpbmVkO1xuXG52YXIgX0RyYWdnYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTI4KTtcblxudmFyIF9EcmFnZ2FibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJhZ2dhYmxlKTtcblxudmFyIF9QbHVnaW5zID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuQWNjZXNzaWJpbGl0eSA9IF9QbHVnaW5zLkFjY2Vzc2liaWxpdHk7XG5leHBvcnRzLk1pcnJvciA9IF9QbHVnaW5zLk1pcnJvcjtcbmV4cG9ydHMuZGVmYXVsdCA9IF9EcmFnZ2FibGUyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Mik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG4vKioqLyB9KSxcbi8qIDI3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG4vKioqLyB9KSxcbi8qIDI4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuLyoqKi8gfSksXG4vKiAyOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cbi8qKiovIH0pLFxuLyogMzAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG4vKioqLyB9KSxcbi8qIDMxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcbiAgLCBkUHMgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNzApXG4gICwgZW51bUJ1Z0tleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM1KVxuICAsIElFX1BST1RPICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ0KSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgX193ZWJwYWNrX3JlcXVpcmVfXyg3NCkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAzMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDMzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBzaGFyZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KSgna2V5cycpXG4gICwgdWlkICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDM0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuLyoqKi8gfSksXG4vKiAzNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuLyoqKi8gfSksXG4vKiAzNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZGVmID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KS5mXG4gICwgaGFzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcbiAgLCBUQUcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDM3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDM4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbmV4cG9ydHMuZiA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cbi8qKiovIH0pLFxuLyogMzkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIGNvcmUgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KVxuICAsIExJQlJBUlkgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMClcbiAgLCB3a3NFeHQgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzgpXG4gICwgZGVmaW5lUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKiovIH0pLFxuLyogNDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHBJRSAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MClcbiAgLCBjcmVhdGVEZXNjICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpXG4gICwgdG9JT2JqZWN0ICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpXG4gICwgdG9QcmltaXRpdmUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KVxuICAsIGhhcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcbiAgLCBJRThfRE9NX0RFRklORSA9IF9fd2VicGFja19yZXF1aXJlX18oNDMpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcblxuLyoqKi8gfSksXG4vKiA0MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2dldFByb3RvdHlwZU9mID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNDIpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldFByb3RvdHlwZU9mKTtcblxudmFyIF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0NSk7XG5cbnZhciBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldE93blByb3BlcnR5RGVzY3JpcHRvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHZhciBkZXNjID0gKDAsIF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IyLmRlZmF1bHQpKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gIGlmIChkZXNjID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcGFyZW50ID0gKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykge1xuICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBnZXR0ZXIgPSBkZXNjLmdldDtcblxuICAgIGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpO1xuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDQzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gIV9fd2VicGFja19yZXF1aXJlX18oMTEpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19yZXF1aXJlX18oNDQpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG4vKioqLyB9KSxcbi8qIDQ0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpXG4gICwgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG4vKioqLyB9KSxcbi8qIDQ1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkZvcmNlVG91Y2hTZW5zb3IgPSBleHBvcnRzLkRyYWdTZW5zb3IgPSBleHBvcnRzLlRvdWNoU2Vuc29yID0gZXhwb3J0cy5Nb3VzZVNlbnNvciA9IGV4cG9ydHMuU2Vuc29yID0gdW5kZWZpbmVkO1xuXG52YXIgX1NlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgX1NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZW5zb3IpO1xuXG52YXIgX01vdXNlU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NCk7XG5cbnZhciBfTW91c2VTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTW91c2VTZW5zb3IpO1xuXG52YXIgX1RvdWNoU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTEpO1xuXG52YXIgX1RvdWNoU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RvdWNoU2Vuc29yKTtcblxudmFyIF9EcmFnU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTMpO1xuXG52YXIgX0RyYWdTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJhZ1NlbnNvcik7XG5cbnZhciBfRm9yY2VUb3VjaFNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTE1KTtcblxudmFyIF9Gb3JjZVRvdWNoU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZvcmNlVG91Y2hTZW5zb3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLlNlbnNvciA9IF9TZW5zb3IyLmRlZmF1bHQ7XG5leHBvcnRzLk1vdXNlU2Vuc29yID0gX01vdXNlU2Vuc29yMi5kZWZhdWx0O1xuZXhwb3J0cy5Ub3VjaFNlbnNvciA9IF9Ub3VjaFNlbnNvcjIuZGVmYXVsdDtcbmV4cG9ydHMuRHJhZ1NlbnNvciA9IF9EcmFnU2Vuc29yMi5kZWZhdWx0O1xuZXhwb3J0cy5Gb3JjZVRvdWNoU2Vuc29yID0gX0ZvcmNlVG91Y2hTZW5zb3IyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogNDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IF9fd2VicGFja19yZXF1aXJlX18oNjYpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc5KTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciAkYXQgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2OCkodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbl9fd2VicGFja19yZXF1aXJlX18oNDgpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG4vKioqLyB9KSxcbi8qIDQ4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgTElCUkFSWSAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKVxuICAsICRleHBvcnQgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMClcbiAgLCByZWRlZmluZSAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDkpXG4gICwgaGlkZSAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKVxuICAsIGhhcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcbiAgLCBJdGVyYXRvcnMgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG4gICwgJGl0ZXJDcmVhdGUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY5KVxuICAsIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNilcbiAgLCBnZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG4gICwgSVRFUkFUT1IgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuLyoqKi8gfSksXG4vKiA0OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xuXG4vKioqLyB9KSxcbi8qIDUwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBoYXMgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuICAsIHRvSU9iamVjdCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCBhcnJheUluZGV4T2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcyKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMzKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKiovIH0pLFxuLyogNTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOClcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuLyoqKi8gfSksXG4vKiA1MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcbiAgLCB0b09iamVjdCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG4gICwgSUVfUFJPVE8gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMzKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cbi8qKiovIH0pLFxuLyogNTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuLyoqKi8gfSksXG4vKiA1NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG4gICwgaGlkZGVuS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMzUpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDU1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFjY2Vzc2liaWxpdHkgPSBleHBvcnRzLmRlZmF1bHRNaXJyb3JPcHRpb24gPSBleHBvcnRzLk1pcnJvciA9IHVuZGVmaW5lZDtcblxudmFyIF9NaXJyb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyOSk7XG5cbnZhciBfTWlycm9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01pcnJvcik7XG5cbnZhciBfQWNjZXNzaWJpbGl0eSA9IF9fd2VicGFja19yZXF1aXJlX18oMTMyKTtcblxudmFyIF9BY2Nlc3NpYmlsaXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjY2Vzc2liaWxpdHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLk1pcnJvciA9IF9NaXJyb3IyLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHRNaXJyb3JPcHRpb24gPSBfTWlycm9yLmRlZmF1bHRNaXJyb3JPcHRpb247XG5leHBvcnRzLkFjY2Vzc2liaWxpdHkgPSBfQWNjZXNzaWJpbGl0eTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA1NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMClcbiAgLCBjb3JlICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KVxuICAsIGZhaWxzICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU29ydGFibGUgPSBleHBvcnRzLlN3YXBwYWJsZSA9IGV4cG9ydHMuRHJvcHBhYmxlID0gZXhwb3J0cy5EcmFnZ2FibGUgPSBleHBvcnRzLlBsdWdpbnMgPSBleHBvcnRzLlNlbnNvcnMgPSBleHBvcnRzLkJhc2VFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9BYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQpO1xuXG52YXIgX1NlbnNvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ1KTtcblxudmFyIFNlbnNvcnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfU2Vuc29ycyk7XG5cbnZhciBfUGx1Z2lucyA9IF9fd2VicGFja19yZXF1aXJlX18oMTE3KTtcblxudmFyIFBsdWdpbnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfUGx1Z2lucyk7XG5cbnZhciBfRHJhZ2dhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cbnZhciBfRHJhZ2dhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdnYWJsZSk7XG5cbnZhciBfRHJvcHBhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNDApO1xuXG52YXIgX0Ryb3BwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ecm9wcGFibGUpO1xuXG52YXIgX1N3YXBwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTUwKTtcblxudmFyIF9Td2FwcGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3dhcHBhYmxlKTtcblxudmFyIF9Tb3J0YWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTU0KTtcblxudmFyIF9Tb3J0YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0YWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuQmFzZUV2ZW50ID0gX0Fic3RyYWN0RXZlbnQyLmRlZmF1bHQ7XG5leHBvcnRzLlNlbnNvcnMgPSBTZW5zb3JzO1xuZXhwb3J0cy5QbHVnaW5zID0gUGx1Z2lucztcbmV4cG9ydHMuRHJhZ2dhYmxlID0gX0RyYWdnYWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuRHJvcHBhYmxlID0gX0Ryb3BwYWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuU3dhcHBhYmxlID0gX1N3YXBwYWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuU29ydGFibGUgPSBfU29ydGFibGUyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogNTggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEFsbCBldmVudHMgZmlyZWQgYnkgZHJhZ2dhYmxlIGluaGVyaXQgdGhpcyBjbGFzcy4gWW91IGNhbiBjYWxsIGBjYW5jZWwoKWAgdG9cbiAqIGNhbmNlbCBhIHNwZWNpZmljIGV2ZW50IG9yIHlvdSBjYW4gY2hlY2sgaWYgYW4gZXZlbnQgaGFzIGJlZW4gY2FuY2VsZWQgYnlcbiAqIGNhbGxpbmcgYGNhbmNlbGVkKClgLlxuICogQGFic3RyYWN0XG4gKiBAY2xhc3MgQWJzdHJhY3RFdmVudFxuICogQG1vZHVsZSBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBBYnN0cmFjdEV2ZW50ID0gZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxuICAgKiBFdmVudCB0eXBlXG4gICAqIEBzdGF0aWNcbiAgICogQGFic3RyYWN0XG4gICAqIEBwcm9wZXJ0eSB0eXBlXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBBYnN0cmFjdEV2ZW50KGRhdGEpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBBYnN0cmFjdEV2ZW50KTtcblxuICAgIHRoaXMuX2NhbmNlbGVkID0gZmFsc2U7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkLW9ubHkgdHlwZVxuICAgKiBAYWJzdHJhY3RcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBFdmVudCBjYW5jZWxhYmxlXG4gICAqIEBzdGF0aWNcbiAgICogQGFic3RyYWN0XG4gICAqIEBwcm9wZXJ0eSBjYW5jZWxhYmxlXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEFic3RyYWN0RXZlbnQsIFt7XG4gICAga2V5OiAnY2FuY2VsJyxcblxuXG4gICAgLyoqXG4gICAgICogQ2FuY2VscyB0aGUgZXZlbnQgaW5zdGFuY2VcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgdGhpcy5fY2FuY2VsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGV2ZW50IGhhcyBiZWVuIGNhbmNlbGVkXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2FuY2VsZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5jZWxlZCgpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuX2NhbmNlbGVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0eXBlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnR5cGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhZC1vbmx5IGNhbmNlbGFibGVcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjYW5jZWxhYmxlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNhbmNlbGFibGU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBBYnN0cmFjdEV2ZW50O1xufSgpO1xuXG5BYnN0cmFjdEV2ZW50LnR5cGUgPSAnZXZlbnQnO1xuQWJzdHJhY3RFdmVudC5jYW5jZWxhYmxlID0gZmFsc2U7XG5leHBvcnRzLmRlZmF1bHQgPSBBYnN0cmFjdEV2ZW50O1xuXG4vKioqLyB9KSxcbi8qIDU5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg2MCksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA2MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDYxKTtcbnZhciAkT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyICRleHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogX193ZWJwYWNrX3JlcXVpcmVfXyg4KS5mfSk7XG5cbi8qKiovIH0pLFxuLyogNjIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cbi8qKiovIH0pLFxuLyogNjMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2Ugc2Vuc29yIGNsYXNzLiBFeHRlbmQgZnJvbSB0aGlzIGNsYXNzIHRvIGNyZWF0ZSBhIG5ldyBvciBjdXN0b20gc2Vuc29yXG4gKiBAY2xhc3MgU2Vuc29yXG4gKiBAbW9kdWxlIFNlbnNvclxuICovXG52YXIgU2Vuc29yID0gZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxuICAgKiBTZW5zb3IgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIFNlbnNvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBDb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU2Vuc29yKTtcblxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBjb250YWluZXJzXG4gICAgICogQHByb3BlcnR5IGNvbnRhaW5lcnNcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnRbXX1cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRhaW5lcnMgPSBjb250YWluZXJzO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBvcHRpb25zXG4gICAgICogQHByb3BlcnR5IG9wdGlvbnNcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBkcmFnIHN0YXRlXG4gICAgICogQHByb3BlcnR5IGRyYWdnaW5nXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBjb250YWluZXJcbiAgICAgKiBAcHJvcGVydHkgY3VycmVudENvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICogQHJldHVybiB7U2Vuc29yfVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICogQHJldHVybiB7U2Vuc29yfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBldmVudCBvbiB0YXJnZXQgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBFbGVtZW50IHRvIHRyaWdnZXIgZXZlbnQgb25cbiAgICAgKiBAcGFyYW0ge1NlbnNvckV2ZW50fSBzZW5zb3JFdmVudCAtIFNlbnNvciBldmVudCB0byB0cmlnZ2VyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RyaWdnZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyKGVsZW1lbnQsIHNlbnNvckV2ZW50KSB7XG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgIGV2ZW50LmRldGFpbCA9IHNlbnNvckV2ZW50O1xuICAgICAgZXZlbnQuaW5pdEV2ZW50KHNlbnNvckV2ZW50LnR5cGUsIHRydWUsIHRydWUpO1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIHRoaXMubGFzdEV2ZW50ID0gc2Vuc29yRXZlbnQ7XG4gICAgICByZXR1cm4gc2Vuc29yRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTZW5zb3I7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNlbnNvcjtcblxuLyoqKi8gfSksXG4vKiA2NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX01vdXNlU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NSk7XG5cbnZhciBfTW91c2VTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTW91c2VTZW5zb3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfTW91c2VTZW5zb3IyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogNjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxudmFyIF9TZW5zb3IyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfU2Vuc29yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlbnNvcjIpO1xuXG52YXIgX1NlbnNvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZyA9IFN5bWJvbCgnb25Db250ZXh0TWVudVdoaWxlRHJhZ2dpbmcnKTtcbnZhciBvbk1vdXNlRG93biA9IFN5bWJvbCgnb25Nb3VzZURvd24nKTtcbnZhciBvbk1vdXNlTW92ZSA9IFN5bWJvbCgnb25Nb3VzZU1vdmUnKTtcbnZhciBvbk1vdXNlVXAgPSBTeW1ib2woJ29uTW91c2VVcCcpO1xuXG4vKipcbiAqIFRoaXMgc2Vuc29yIHBpY2tzIHVwIG5hdGl2ZSBicm93c2VyIG1vdXNlIGV2ZW50cyBhbmQgZGljdGF0ZXMgZHJhZyBvcGVyYXRpb25zXG4gKiBAY2xhc3MgTW91c2VTZW5zb3JcbiAqIEBtb2R1bGUgTW91c2VTZW5zb3JcbiAqIEBleHRlbmRzIFNlbnNvclxuICovXG5cbnZhciBNb3VzZVNlbnNvciA9IGZ1bmN0aW9uIChfU2Vuc29yKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1vdXNlU2Vuc29yLCBfU2Vuc29yKTtcblxuICAvKipcbiAgICogTW91c2VTZW5zb3IgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIE1vdXNlU2Vuc29yXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBNb3VzZVNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1vdXNlU2Vuc29yKTtcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBpZiBtb3VzZSBidXR0b24gaXMgc3RpbGwgZG93blxuICAgICAqIEBwcm9wZXJ0eSBtb3VzZURvd25cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNb3VzZVNlbnNvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vdXNlU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGRvd24gdGltZXIgd2hpY2ggd2lsbCBlbmQgdXAgdHJpZ2dlcmluZyB0aGUgZHJhZyBzdGFydCBvcGVyYXRpb25cbiAgICAgKiBAcHJvcGVydHkgbW91c2VEb3duVGltZW91dFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgX3RoaXMubW91c2VEb3duVGltZW91dCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgaWYgY29udGV4dCBtZW51IGhhcyBiZWVuIG9wZW5lZCBkdXJpbmcgZHJhZyBvcGVyYXRpb25cbiAgICAgKiBAcHJvcGVydHkgb3BlbmVkQ29udGV4dE1lbnVcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBfdGhpcy5vcGVuZWRDb250ZXh0TWVudSA9IGZhbHNlO1xuXG4gICAgX3RoaXNbb25Db250ZXh0TWVudVdoaWxlRHJhZ2dpbmddID0gX3RoaXNbb25Db250ZXh0TWVudVdoaWxlRHJhZ2dpbmddLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VEb3duXSA9IF90aGlzW29uTW91c2VEb3duXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlTW92ZV0gPSBfdGhpc1tvbk1vdXNlTW92ZV0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZVVwXSA9IF90aGlzW29uTW91c2VVcF0uYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShNb3VzZVNlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzW29uTW91c2VEb3duXSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzW29uTW91c2VEb3duXSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgZG93biBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIGRvd24gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlRG93bixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwIHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgcHJldmVudE5hdGl2ZURyYWdTdGFydCk7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLmNvbnRhaW5lcnMpO1xuXG4gICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubW91c2VEb3duVGltZW91dCk7XG4gICAgICB0aGlzLm1vdXNlRG93blRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFfdGhpczIubW91c2VEb3duKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRyYWdTdGFydEV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnU3RhcnRTZW5zb3JFdmVudCh7XG4gICAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICAgIF90aGlzMi5jdXJyZW50Q29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBfdGhpczIuZHJhZ2dpbmcgPSAhZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKTtcblxuICAgICAgICBpZiAoX3RoaXMyLmRyYWdnaW5nKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBfdGhpczJbb25Db250ZXh0TWVudVdoaWxlRHJhZ2dpbmddKTtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBfdGhpczJbb25Nb3VzZU1vdmVdKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5vcHRpb25zLmRlbGF5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBtb3ZlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgbW92ZSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VNb3ZlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnTW92ZVNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIHVwIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgdXAgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlVXAsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB0aGlzLm1vdXNlRG93biA9IEJvb2xlYW4odGhpcy5vcGVuZWRDb250ZXh0TWVudSk7XG5cbiAgICAgIGlmICh0aGlzLm9wZW5lZENvbnRleHRNZW51KSB7XG4gICAgICAgIHRoaXMub3BlbmVkQ29udGV4dE1lbnUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpc1tvbk1vdXNlVXBdKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHByZXZlbnROYXRpdmVEcmFnU3RhcnQpO1xuXG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIGRyYWdTdG9wRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdG9wU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpc1tvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZ10pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpc1tvbk1vdXNlTW92ZV0pO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnRleHQgbWVudSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIENvbnRleHQgbWVudSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uQ29udGV4dE1lbnVXaGlsZURyYWdnaW5nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMub3BlbmVkQ29udGV4dE1lbnUgPSB0cnVlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTW91c2VTZW5zb3I7XG59KF9TZW5zb3IzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNb3VzZVNlbnNvcjtcblxuXG5mdW5jdGlvbiBwcmV2ZW50TmF0aXZlRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8qKiovIH0pLFxuLyogNjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDY3KSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDY3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oNDcpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyg3NSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMzgpLmYoJ2l0ZXJhdG9yJyk7XG5cbi8qKiovIH0pLFxuLyogNjggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHRvSW50ZWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpXG4gICwgZGVmaW5lZCAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOSk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG4vKioqLyB9KSxcbi8qIDY5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY3JlYXRlICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKVxuICAsIGRlc2NyaXB0b3IgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOClcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbl9fd2VicGFja19yZXF1aXJlX18oMTMpKEl0ZXJhdG9yUHJvdG90eXBlLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcblxuLyoqKi8gfSksXG4vKiA3MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZFAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpXG4gICwgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuICAsIGdldEtleXMgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XG5cbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSkgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuLyoqKi8gfSksXG4vKiA3MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuLyoqKi8gfSksXG4vKiA3MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCB0b0xlbmd0aCAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUxKVxuICAsIHRvSW5kZXggICA9IF9fd2VicGFja19yZXF1aXJlX18oNzMpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiA3MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOClcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNzQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuLyoqKi8gfSksXG4vKiA3NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDc2KTtcbnZhciBnbG9iYWwgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIGhpZGUgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKVxuICAsIEl0ZXJhdG9ycyAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuICAsIFRPX1NUUklOR19UQUcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuXG4vKioqLyB9KSxcbi8qIDc2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IF9fd2VicGFja19yZXF1aXJlX18oNzcpXG4gICwgc3RlcCAgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNzgpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OCkoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cbi8qKiovIH0pLFxuLyogNzcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xuXG4vKioqLyB9KSxcbi8qIDc4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cbi8qKiovIH0pLFxuLyogNzkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDgwKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDgwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oODEpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyg4Nyk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDg4KTtcbl9fd2VicGFja19yZXF1aXJlX18oODkpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLlN5bWJvbDtcblxuLyoqKi8gfSksXG4vKiA4MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIGhhcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcbiAgLCBERVNDUklQVE9SUyAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpXG4gICwgJGV4cG9ydCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKVxuICAsIHJlZGVmaW5lICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OSlcbiAgLCBNRVRBICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oODIpLktFWVxuICAsICRmYWlscyAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNylcbiAgLCBzaGFyZWQgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM2KVxuICAsIHVpZCAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMilcbiAgLCB3a3MgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNilcbiAgLCB3a3NFeHQgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzgpXG4gICwgd2tzRGVmaW5lICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KVxuICAsIGtleU9mICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MylcbiAgLCBlbnVtS2V5cyAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oODQpXG4gICwgaXNBcnJheSAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg1KVxuICAsIGFuT2JqZWN0ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcbiAgLCB0b0lPYmplY3QgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjcpXG4gICwgY3JlYXRlRGVzYyAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KVxuICAsIF9jcmVhdGUgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMSlcbiAgLCBnT1BORXh0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oODYpXG4gICwgJEdPUEQgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKVxuICAsICREUCAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KVxuICAsICRrZXlzICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIF9fd2VicGFja19yZXF1aXJlX18oNTQpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgX193ZWJwYWNrX3JlcXVpcmVfXyg0MCkuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIF9fd2VicGFja19yZXF1aXJlX18oNTMpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgX193ZWJwYWNrX3JlcXVpcmVfXygxMykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cbi8qKiovIH0pLFxuLyogODIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIE1FVEEgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMikoJ21ldGEnKVxuICAsIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNilcbiAgLCBoYXMgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpXG4gICwgc2V0RGVzYyAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIV9fd2VicGFja19yZXF1aXJlX18oMTcpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24oaXQpe1xuICBzZXREZXNjKGl0LCBNRVRBLCB7dmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9fSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKXNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiAgICAgIE1FVEEsXG4gIE5FRUQ6ICAgICBmYWxzZSxcbiAgZmFzdEtleTogIGZhc3RLZXksXG4gIGdldFdlYWs6ICBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG5cbi8qKiovIH0pLFxuLyogODMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdldEtleXMgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpXG4gICwgdG9JT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07XG5cbi8qKiovIH0pLFxuLyogODQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcbiAgLCBnT1BTICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MylcbiAgLCBwSUUgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDg1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMik7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG5cbi8qKiovIH0pLFxuLyogODYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCBnT1BOICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU0KS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogODcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXG5cbi8qKiovIH0pLFxuLyogODggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygzOSkoJ2FzeW5jSXRlcmF0b3InKTtcblxuLyoqKi8gfSksXG4vKiA4OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDM5KSgnb2JzZXJ2YWJsZScpO1xuXG4vKioqLyB9KSxcbi8qIDkwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg5MSksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA5MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDkyKTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cbi8qKiovIH0pLFxuLyogOTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogX193ZWJwYWNrX3JlcXVpcmVfXyg5Mykuc2V0fSk7XG5cbi8qKiovIH0pLFxuLyogOTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNilcbiAgLCBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpKEZ1bmN0aW9uLmNhbGwsIF9fd2VicGFja19yZXF1aXJlX18oNDEpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuLyoqKi8gfSksXG4vKiA5NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oOTUpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogOTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg5Nik7XG52YXIgJE9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oNCkuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG5cbi8qKiovIH0pLFxuLyogOTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyICRleHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKVxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtjcmVhdGU6IF9fd2VicGFja19yZXF1aXJlX18oMzEpfSk7XG5cbi8qKiovIH0pLFxuLyogOTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbG9zZXN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5OCk7XG5cbnZhciBfY2xvc2VzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbG9zZXN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Nsb3Nlc3QyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogOTggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b0NvbnN1bWFibGVBcnJheTIpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjbG9zZXN0O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbWF0Y2hGdW5jdGlvbiA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvcjtcblxuZnVuY3Rpb24gY2xvc2VzdChlbGVtZW50LCB2YWx1ZSkge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBzZWxlY3RvciA9IHZhbHVlO1xuICB2YXIgY2FsbGJhY2sgPSB2YWx1ZTtcbiAgdmFyIG5vZGVMaXN0ID0gdmFsdWU7XG4gIHZhciBzaW5nbGVFbGVtZW50ID0gdmFsdWU7XG5cbiAgdmFyIGlzU2VsZWN0b3IgPSBCb29sZWFuKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpO1xuICB2YXIgaXNGdW5jdGlvbiA9IEJvb2xlYW4odHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKTtcbiAgdmFyIGlzTm9kZUxpc3QgPSBCb29sZWFuKHZhbHVlIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSk7XG4gIHZhciBpc0VsZW1lbnQgPSBCb29sZWFuKHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpO1xuXG4gIGZ1bmN0aW9uIGNvbmRpdGlvbkZuKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgaWYgKCFjdXJyZW50RWxlbWVudCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnRFbGVtZW50O1xuICAgIH0gZWxzZSBpZiAoaXNTZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIG1hdGNoRnVuY3Rpb24uY2FsbChjdXJyZW50RWxlbWVudCwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSBpZiAoaXNOb2RlTGlzdCkge1xuICAgICAgcmV0dXJuIFtdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KShub2RlTGlzdCkpLmluY2x1ZGVzKGN1cnJlbnRFbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKGlzRWxlbWVudCkge1xuICAgICAgcmV0dXJuIHNpbmdsZUVsZW1lbnQgPT09IGN1cnJlbnRFbGVtZW50O1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGN1cnJlbnRFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgdmFyIGN1cnJlbnQgPSBlbGVtZW50O1xuXG4gIGRvIHtcbiAgICBjdXJyZW50ID0gY3VycmVudC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudCB8fCBjdXJyZW50LmNvcnJlc3BvbmRpbmdFbGVtZW50IHx8IGN1cnJlbnQ7XG4gICAgaWYgKGNvbmRpdGlvbkZuKGN1cnJlbnQpKSB7XG4gICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG4gICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgfSB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBkb2N1bWVudC5ib2R5ICYmIGN1cnJlbnQgIT09IGRvY3VtZW50KTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqKi8gfSksXG4vKiA5OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oMTAwKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDEwMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KTtcbl9fd2VicGFja19yZXF1aXJlX18oMTAxKTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5BcnJheS5mcm9tO1xuXG4vKioqLyB9KSxcbi8qIDEwMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGN0eCAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNilcbiAgLCAkZXhwb3J0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTApXG4gICwgdG9PYmplY3QgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuICAsIGNhbGwgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDIpXG4gICwgaXNBcnJheUl0ZXIgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwMylcbiAgLCB0b0xlbmd0aCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNTEpXG4gICwgY3JlYXRlUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwNClcbiAgLCBnZXRJdGVyRm4gICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTA1KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhX193ZWJwYWNrX3JlcXVpcmVfXygxMDcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBhTGVuICAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5cbi8qKiovIH0pLFxuLyogMTAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDEwMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG4gICwgSVRFUkFUT1IgICA9IF9fd2VicGFja19yZXF1aXJlX18oNikoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMTA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KVxuICAsIGNyZWF0ZURlc2MgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5kZXgsIHZhbHVlKXtcbiAgaWYoaW5kZXggaW4gb2JqZWN0KSRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuXG4vKioqLyB9KSxcbi8qIDEwNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgY2xhc3NvZiAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDYpXG4gICwgSVRFUkFUT1IgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oMjApO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuLyoqKi8gfSksXG4vKiAxMDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKVxuICAsIFRBRyA9IF9fd2VicGFja19yZXF1aXJlX18oNikoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG4vKioqLyB9KSxcbi8qIDEwNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgSVRFUkFUT1IgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cbi8qKiovIH0pLFxuLyogMTA4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2Nyb2xsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDkpO1xuXG52YXIgX3Njcm9sbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY3JvbGwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfc2Nyb2xsMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDEwOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gc2Nyb2xsO1xudmFyIHNjcm9sbEFuaW1hdGlvbkZyYW1lID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBzY3JvbGwoZWxlbWVudCwgX3JlZikge1xuICB2YXIgY2xpZW50WCA9IF9yZWYuY2xpZW50WCxcbiAgICAgIGNsaWVudFkgPSBfcmVmLmNsaWVudFksXG4gICAgICBzcGVlZCA9IF9yZWYuc3BlZWQsXG4gICAgICBzZW5zaXRpdml0eSA9IF9yZWYuc2Vuc2l0aXZpdHk7XG5cbiAgaWYgKHNjcm9sbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc2Nyb2xsQW5pbWF0aW9uRnJhbWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsRm4oKSB7XG4gICAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBvZmZzZXRZID0gKE1hdGguYWJzKHJlY3QuYm90dG9tIC0gY2xpZW50WSkgPD0gc2Vuc2l0aXZpdHkpIC0gKE1hdGguYWJzKHJlY3QudG9wIC0gY2xpZW50WSkgPD0gc2Vuc2l0aXZpdHkpO1xuICAgIHZhciBvZmZzZXRYID0gKE1hdGguYWJzKHJlY3QucmlnaHQgLSBjbGllbnRYKSA8PSBzZW5zaXRpdml0eSkgLSAoTWF0aC5hYnMocmVjdC5sZWZ0IC0gY2xpZW50WCkgPD0gc2Vuc2l0aXZpdHkpO1xuICAgIGVsZW1lbnQuc2Nyb2xsVG9wICs9IG9mZnNldFkgKiBzcGVlZDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgKz0gb2Zmc2V0WCAqIHNwZWVkO1xuICAgIHNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbEZuKTtcbiAgfVxuXG4gIHNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbEZuKTtcbn1cblxuLyoqKi8gfSksXG4vKiAxMTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdG9wU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdNb3ZlU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdGFydFNlbnNvckV2ZW50ID0gZXhwb3J0cy5TZW5zb3JFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2Ugc2Vuc29yIGV2ZW50XG4gKiBAY2xhc3MgU2Vuc29yRXZlbnRcbiAqIEBtb2R1bGUgU2Vuc29yRXZlbnRcbiAqIEBleHRlbmRzIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIFNlbnNvckV2ZW50ID0gZXhwb3J0cy5TZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTZW5zb3JFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFNlbnNvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNlbnNvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTZW5zb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU2Vuc29yRXZlbnQsIFt7XG4gICAga2V5OiAnb3JpZ2luYWxFdmVudCcsXG5cblxuICAgIC8qKlxuICAgICAqIE9yaWdpbmFsIGJyb3dzZXIgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgYSBzZW5zb3JcbiAgICAgKiBAcHJvcGVydHkgb3JpZ2luYWxFdmVudFxuICAgICAqIEB0eXBlIHtFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3JpZ2luYWxFdmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemVkIGNsaWVudFggZm9yIGJvdGggdG91Y2ggYW5kIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwcm9wZXJ0eSBjbGllbnRYXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2xpZW50WCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmNsaWVudFg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplZCBjbGllbnRZIGZvciBib3RoIHRvdWNoIGFuZCBtb3VzZSBldmVudHNcbiAgICAgKiBAcHJvcGVydHkgY2xpZW50WVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NsaWVudFknLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jbGllbnRZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZWQgdGFyZ2V0IGZvciBib3RoIHRvdWNoIGFuZCBtb3VzZSBldmVudHNcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IHRoYXQgaXMgYmVoaW5kIGN1cnNvciBvciB0b3VjaCBwb2ludGVyXG4gICAgICogQHByb3BlcnR5IHRhcmdldFxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndGFyZ2V0JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEudGFyZ2V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnRhaW5lciB0aGF0IGluaXRpYXRlZCB0aGUgc2Vuc29yXG4gICAgICogQHByb3BlcnR5IGNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYWNrcGFkIHByZXNzdXJlXG4gICAgICogQHByb3BlcnR5IHByZXNzdXJlXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncHJlc3N1cmUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5wcmVzc3VyZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNlbnNvckV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogRHJhZyBzdGFydCBzZW5zb3IgZXZlbnRcbiAqIEBjbGFzcyBEcmFnU3RhcnRTZW5zb3JFdmVudFxuICogQG1vZHVsZSBEcmFnU3RhcnRTZW5zb3JFdmVudFxuICogQGV4dGVuZHMgU2Vuc29yRXZlbnRcbiAqL1xuXG5cbnZhciBEcmFnU3RhcnRTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTdGFydFNlbnNvckV2ZW50LCBfU2Vuc29yRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdTdGFydFNlbnNvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdTdGFydFNlbnNvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1N0YXJ0U2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU3RhcnRTZW5zb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdTdGFydFNlbnNvckV2ZW50O1xufShTZW5zb3JFdmVudCk7XG5cbi8qKlxuICogRHJhZyBtb3ZlIHNlbnNvciBldmVudFxuICogQGNsYXNzIERyYWdNb3ZlU2Vuc29yRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ01vdmVTZW5zb3JFdmVudFxuICogQGV4dGVuZHMgU2Vuc29yRXZlbnRcbiAqL1xuXG5cbkRyYWdTdGFydFNlbnNvckV2ZW50LnR5cGUgPSAnZHJhZzpzdGFydCc7XG5cbnZhciBEcmFnTW92ZVNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnTW92ZVNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9TZW5zb3JFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ01vdmVTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJhZ01vdmVTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnTW92ZVNlbnNvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ01vdmVTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdNb3ZlU2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnTW92ZVNlbnNvckV2ZW50O1xufShTZW5zb3JFdmVudCk7XG5cbi8qKlxuICogRHJhZyBzdG9wIHNlbnNvciBldmVudFxuICogQGNsYXNzIERyYWdTdG9wU2Vuc29yRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ1N0b3BTZW5zb3JFdmVudFxuICogQGV4dGVuZHMgU2Vuc29yRXZlbnRcbiAqL1xuXG5cbkRyYWdNb3ZlU2Vuc29yRXZlbnQudHlwZSA9ICdkcmFnOm1vdmUnO1xuXG52YXIgRHJhZ1N0b3BTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0b3BTZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfU2Vuc29yRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTdG9wU2Vuc29yRXZlbnQsIF9TZW5zb3JFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIERyYWdTdG9wU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1N0b3BTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdG9wU2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU3RvcFNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1N0b3BTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgcHJlc3N1cmUgc2Vuc29yIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnRcbiAqIEBleHRlbmRzIFNlbnNvckV2ZW50XG4gKi9cblxuXG5EcmFnU3RvcFNlbnNvckV2ZW50LnR5cGUgPSAnZHJhZzpzdG9wJztcblxudmFyIERyYWdQcmVzc3VyZVNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfU2Vuc29yRXZlbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdQcmVzc3VyZVNlbnNvckV2ZW50LCBfU2Vuc29yRXZlbnQ0KTtcblxuICBmdW5jdGlvbiBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdQcmVzc3VyZVNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6cHJlc3N1cmUnO1xuXG4vKioqLyB9KSxcbi8qIDExMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1RvdWNoU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTIpO1xuXG52YXIgX1RvdWNoU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RvdWNoU2Vuc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1RvdWNoU2Vuc29yMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDExMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG52YXIgX1NlbnNvcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9TZW5zb3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Vuc29yMik7XG5cbnZhciBfU2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uVG91Y2hTdGFydCA9IFN5bWJvbCgnb25Ub3VjaFN0YXJ0Jyk7XG52YXIgb25Ub3VjaEhvbGQgPSBTeW1ib2woJ29uVG91Y2hIb2xkJyk7XG52YXIgb25Ub3VjaEVuZCA9IFN5bWJvbCgnb25Ub3VjaEVuZCcpO1xudmFyIG9uVG91Y2hNb3ZlID0gU3ltYm9sKCdvblRvdWNoTW92ZScpO1xudmFyIG9uU2Nyb2xsID0gU3ltYm9sKCdvblNjcm9sbCcpO1xuXG4vKipcbiAqIEFkZHMgZGVmYXVsdCBkb2N1bWVudC5vbnRvdWNobW92ZS4gV29ya2Fyb3VuZCBmb3IgcHJldmVudGluZyBzY3JvbGxpbmcgb24gdG91Y2htb3ZlXG4gKi9cbmRvY3VtZW50Lm9udG91Y2htb3ZlID0gZG9jdW1lbnQub250b3VjaG1vdmUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogVGhpcyBzZW5zb3IgcGlja3MgdXAgbmF0aXZlIGJyb3dzZXIgdG91Y2ggZXZlbnRzIGFuZCBkaWN0YXRlcyBkcmFnIG9wZXJhdGlvbnNcbiAqIEBjbGFzcyBUb3VjaFNlbnNvclxuICogQG1vZHVsZSBUb3VjaFNlbnNvclxuICogQGV4dGVuZHMgU2Vuc29yXG4gKi9cblxudmFyIFRvdWNoU2Vuc29yID0gZnVuY3Rpb24gKF9TZW5zb3IpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoVG91Y2hTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIC8qKlxuICAgKiBUb3VjaFNlbnNvciBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgVG91Y2hTZW5zb3JcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gQ29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIFRvdWNoU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgVG91Y2hTZW5zb3IpO1xuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzdCBzY3JvbGxhYmxlIGNvbnRhaW5lciBzbyBhY2NpZGVudGFsIHNjcm9sbCBjYW4gY2FuY2VsIGxvbmcgdG91Y2hcbiAgICAgKiBAcHJvcGVydHkgY3VycmVudFNjcm9sbGFibGVQYXJlbnRcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoVG91Y2hTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihUb3VjaFNlbnNvcikpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogVGltZW91dElEIGZvciBsb25nIHRvdWNoXG4gICAgICogQHByb3BlcnR5IHRhcFRpbWVvdXRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIF90aGlzLnRhcFRpbWVvdXQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogdG91Y2hNb3ZlZCBpbmRpY2F0ZXMgaWYgdG91Y2ggaGFzIG1vdmVkIGR1cmluZyB0YXBUaW1lb3V0XG4gICAgICogQHByb3BlcnR5IHRvdWNoTW92ZWRcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBfdGhpcy50b3VjaE1vdmVkID0gZmFsc2U7XG5cbiAgICBfdGhpc1tvblRvdWNoU3RhcnRdID0gX3RoaXNbb25Ub3VjaFN0YXJ0XS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvblRvdWNoSG9sZF0gPSBfdGhpc1tvblRvdWNoSG9sZF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Ub3VjaEVuZF0gPSBfdGhpc1tvblRvdWNoRW5kXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvblRvdWNoTW92ZV0gPSBfdGhpc1tvblRvdWNoTW92ZV0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25TY3JvbGxdID0gX3RoaXNbb25TY3JvbGxdLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoVG91Y2hTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXNbb25Ub3VjaFN0YXJ0XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpc1tvblRvdWNoU3RhcnRdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb3VjaCBzdGFydCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRvdWNoIHN0YXJ0IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Ub3VjaFN0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIGNvbnRhaW5lciA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoZXZlbnQudGFyZ2V0LCB0aGlzLmNvbnRhaW5lcnMpO1xuXG4gICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXNbb25Ub3VjaE1vdmVdLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzW29uVG91Y2hFbmRdKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpc1tvblRvdWNoRW5kXSk7XG5cbiAgICAgIC8vIGRldGVjdCBpZiBib2R5IGlzIHNjcm9sbGluZyBvbiBpT1NcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXNbb25TY3JvbGxdKTtcbiAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICAgIHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGNvbnRhaW5lciwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IDwgZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzW29uU2Nyb2xsXSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudGFwVGltZW91dCA9IHNldFRpbWVvdXQodGhpc1tvblRvdWNoSG9sZF0oZXZlbnQsIGNvbnRhaW5lciksIHRoaXMub3B0aW9ucy5kZWxheSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG91Y2ggaG9sZCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRvdWNoIHN0YXJ0IGV2ZW50XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGFpbmVyIC0gQ29udGFpbmVyIGVsZW1lbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvblRvdWNoSG9sZCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQsIGNvbnRhaW5lcikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfdGhpczIudG91Y2hNb3ZlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgdmFyIGRyYWdTdGFydEV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnU3RhcnRTZW5zb3JFdmVudCh7XG4gICAgICAgICAgY2xpZW50WDogdG91Y2gucGFnZVgsXG4gICAgICAgICAgY2xpZW50WTogdG91Y2gucGFnZVksXG4gICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnU3RhcnRFdmVudCk7XG5cbiAgICAgICAgX3RoaXMyLmRyYWdnaW5nID0gIWRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvdWNoIG1vdmUgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUb3VjaCBtb3ZlIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Ub3VjaE1vdmUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB0aGlzLnRvdWNoTW92ZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDYW5jZWxzIHNjcm9sbGluZyB3aGlsZSBkcmFnZ2luZ1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICB2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2gucGFnZVggLSB3aW5kb3cuc2Nyb2xsWCwgdG91Y2gucGFnZVkgLSB3aW5kb3cuc2Nyb2xsWSk7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnTW92ZVNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogdG91Y2gucGFnZVgsXG4gICAgICAgIGNsaWVudFk6IHRvdWNoLnBhZ2VZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG91Y2ggZW5kIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVG91Y2ggZW5kIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Ub3VjaEVuZCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHRoaXMudG91Y2hNb3ZlZCA9IGZhbHNlO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXNbb25Ub3VjaEVuZF0pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzW29uVG91Y2hFbmRdKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXNbb25Ub3VjaE1vdmVdLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzW29uU2Nyb2xsXSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51Jywgb25Db250ZXh0TWVudSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpc1tvblNjcm9sbF0pO1xuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50YXBUaW1lb3V0KTtcblxuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHRvdWNoLnBhZ2VYIC0gd2luZG93LnNjcm9sbFgsIHRvdWNoLnBhZ2VZIC0gd2luZG93LnNjcm9sbFkpO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IHRvdWNoLnBhZ2VYLFxuICAgICAgICBjbGllbnRZOiB0b3VjaC5wYWdlWSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNjcm9sbCBoYW5kbGVyLCBjYW5jZWwgcG90ZW50aWFsIGRyYWcgYW5kIGFsbG93IHNjcm9sbCBvbiBpT1Mgb3Igb3RoZXIgdG91Y2ggZGV2aWNlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25TY3JvbGwsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGFwVGltZW91dCk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUb3VjaFNlbnNvcjtcbn0oX1NlbnNvcjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRvdWNoU2Vuc29yO1xuXG5cbmZ1bmN0aW9uIG9uQ29udGV4dE1lbnUoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG59XG5cbi8qKiovIH0pLFxuLyogMTEzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfRHJhZ1NlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTE0KTtcblxudmFyIF9EcmFnU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdTZW5zb3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfRHJhZ1NlbnNvcjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxudmFyIF9TZW5zb3IyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfU2Vuc29yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlbnNvcjIpO1xuXG52YXIgX1NlbnNvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbk1vdXNlRG93biA9IFN5bWJvbCgnb25Nb3VzZURvd24nKTtcbnZhciBvbk1vdXNlVXAgPSBTeW1ib2woJ29uTW91c2VVcCcpO1xudmFyIG9uRHJhZ1N0YXJ0ID0gU3ltYm9sKCdvbkRyYWdTdGFydCcpO1xudmFyIG9uRHJhZ092ZXIgPSBTeW1ib2woJ29uRHJhZ092ZXInKTtcbnZhciBvbkRyYWdFbmQgPSBTeW1ib2woJ29uRHJhZ0VuZCcpO1xudmFyIG9uRHJvcCA9IFN5bWJvbCgnb25Ecm9wJyk7XG52YXIgcmVzZXQgPSBTeW1ib2woJ3Jlc2V0Jyk7XG5cbi8qKlxuICogVGhpcyBzZW5zb3IgcGlja3MgdXAgbmF0aXZlIGJyb3dzZXIgZHJhZyBldmVudHMgYW5kIGRpY3RhdGVzIGRyYWcgb3BlcmF0aW9uc1xuICogQGNsYXNzIERyYWdTZW5zb3JcbiAqIEBtb2R1bGUgRHJhZ1NlbnNvclxuICogQGV4dGVuZHMgU2Vuc29yXG4gKi9cblxudmFyIERyYWdTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU2Vuc29yLCBfU2Vuc29yKTtcblxuICAvKipcbiAgICogRHJhZ1NlbnNvciBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgRHJhZ1NlbnNvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBDb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gRHJhZ1NlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdTZW5zb3IpO1xuXG4gICAgLyoqXG4gICAgICogTW91c2UgZG93biB0aW1lciB3aGljaCB3aWxsIGVuZCB1cCBzZXR0aW5nIHRoZSBkcmFnZ2FibGUgYXR0cmlidXRlLCB1bmxlc3MgY2FuY2VsZWRcbiAgICAgKiBAcHJvcGVydHkgbW91c2VEb3duVGltZW91dFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1NlbnNvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdTZW5zb3IpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLm1vdXNlRG93blRpbWVvdXQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGVsZW1lbnQgbmVlZHMgdG8gYmUgcmVtZW1iZXJlZCB0byB1bnNldCB0aGUgZHJhZ2dhYmxlIGF0dHJpYnV0ZSBhZnRlciBkcmFnIG9wZXJhdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICogQHByb3BlcnR5IGRyYWdnYWJsZUVsZW1lbnRcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgX3RoaXMuZHJhZ2dhYmxlRWxlbWVudCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBOYXRpdmUgZHJhZ2dhYmxlIGVsZW1lbnQgY291bGQgYmUgbGlua3Mgb3IgaW1hZ2VzLCB0aGVpciBkcmFnZ2FibGUgc3RhdGUgd2lsbCBiZSBkaXNhYmxlZCBkdXJpbmcgZHJhZyBvcGVyYXRpb25cbiAgICAgKiBAcHJvcGVydHkgbmF0aXZlRHJhZ2dhYmxlRWxlbWVudFxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBfdGhpcy5uYXRpdmVEcmFnZ2FibGVFbGVtZW50ID0gbnVsbDtcblxuICAgIF90aGlzW29uTW91c2VEb3duXSA9IF90aGlzW29uTW91c2VEb3duXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlVXBdID0gX3RoaXNbb25Nb3VzZVVwXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdTdGFydF0gPSBfdGhpc1tvbkRyYWdTdGFydF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnT3Zlcl0gPSBfdGhpc1tvbkRyYWdPdmVyXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdFbmRdID0gX3RoaXNbb25EcmFnRW5kXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyb3BdID0gX3RoaXNbb25Ecm9wXS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpc1tvbk1vdXNlRG93bl0sIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpc1tvbk1vdXNlRG93bl0sIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RhcnQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBEcmFnIHN0YXJ0IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnU3RhcnQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgLy8gTmVlZCBmb3IgZmlyZWZveC4gXCJ0ZXh0XCIga2V5IGlzIG5lZWRlZCBmb3IgSUVcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJycpO1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSB0aGlzLm9wdGlvbnMudHlwZTtcblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGV2ZW50LnRhcmdldCwgdGhpcy5jb250YWluZXJzKTtcblxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFdvcmthcm91bmRcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIudHJpZ2dlcihfdGhpczIuY3VycmVudENvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICAgIGlmIChkcmFnU3RhcnRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgICAgX3RoaXMyLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMyLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBvdmVyIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRHJhZyBvdmVyIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnT3ZlcixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY3VycmVudENvbnRhaW5lcjtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG5cbiAgICAgIGlmICghZHJhZ01vdmVFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gdGhpcy5vcHRpb25zLnR5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBlbmQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBEcmFnIGVuZCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ0VuZCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0sIHRydWUpO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmN1cnJlbnRDb250YWluZXI7XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihjb250YWluZXIsIGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgIHRoaXNbcmVzZXRdKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJvcCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERyb3AgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyb3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgZG93biBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIGRvd24gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlRG93bixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAvLyBGaXJlZm94IGJ1ZyBmb3IgaW5wdXRzIHdpdGhpbiBkcmFnZ2FibGVzIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTczOTA3MVxuICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiAoZXZlbnQudGFyZ2V0LmZvcm0gfHwgZXZlbnQudGFyZ2V0LmNvbnRlbnRlZGl0YWJsZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbmF0aXZlRHJhZ2dhYmxlRWxlbWVudCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoZXZlbnQudGFyZ2V0LCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5kcmFnZ2FibGU7XG4gICAgICB9KTtcblxuICAgICAgaWYgKG5hdGl2ZURyYWdnYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgbmF0aXZlRHJhZ2dhYmxlRWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uYXRpdmVEcmFnZ2FibGVFbGVtZW50ID0gbmF0aXZlRHJhZ2dhYmxlRWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXNbb25Nb3VzZVVwXSwgdHJ1ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzW29uRHJhZ092ZXJdLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpc1tvbkRyYWdFbmRdLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpc1tvbkRyb3BdLCBmYWxzZSk7XG5cbiAgICAgIHZhciB0YXJnZXQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGV2ZW50LnRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSk7XG5cbiAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb3VzZURvd25UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRhcmdldC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICBfdGhpczMuZHJhZ2dhYmxlRWxlbWVudCA9IHRhcmdldDtcbiAgICAgIH0sIHRoaXMub3B0aW9ucy5kZWxheSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgdXAgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSB1cCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VVcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgICB0aGlzW3Jlc2V0XSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIHVwIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgdXAgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiByZXNldCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5tb3VzZURvd25UaW1lb3V0KTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXNbb25Nb3VzZVVwXSwgdHJ1ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzW29uRHJhZ092ZXJdLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpc1tvbkRyYWdFbmRdLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpc1tvbkRyb3BdLCBmYWxzZSk7XG5cbiAgICAgIGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVEcmFnZ2FibGVFbGVtZW50LmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMubmF0aXZlRHJhZ2dhYmxlRWxlbWVudCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWdnYWJsZUVsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ1NlbnNvcjtcbn0oX1NlbnNvcjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERyYWdTZW5zb3I7XG5cbi8qKiovIH0pLFxuLyogMTE1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfRm9yY2VUb3VjaFNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTE2KTtcblxudmFyIF9Gb3JjZVRvdWNoU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZvcmNlVG91Y2hTZW5zb3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfRm9yY2VUb3VjaFNlbnNvcjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfU2Vuc29yMiA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgX1NlbnNvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZW5zb3IyKTtcblxudmFyIF9TZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb25Nb3VzZUZvcmNlV2lsbEJlZ2luID0gU3ltYm9sKCdvbk1vdXNlRm9yY2VXaWxsQmVnaW4nKTtcbnZhciBvbk1vdXNlRm9yY2VEb3duID0gU3ltYm9sKCdvbk1vdXNlRm9yY2VEb3duJyk7XG52YXIgb25Nb3VzZURvd24gPSBTeW1ib2woJ29uTW91c2VEb3duJyk7XG52YXIgb25Nb3VzZUZvcmNlQ2hhbmdlID0gU3ltYm9sKCdvbk1vdXNlRm9yY2VDaGFuZ2UnKTtcbnZhciBvbk1vdXNlTW92ZSA9IFN5bWJvbCgnb25Nb3VzZU1vdmUnKTtcbnZhciBvbk1vdXNlVXAgPSBTeW1ib2woJ29uTW91c2VVcCcpO1xudmFyIG9uTW91c2VGb3JjZUdsb2JhbENoYW5nZSA9IFN5bWJvbCgnb25Nb3VzZUZvcmNlR2xvYmFsQ2hhbmdlJyk7XG5cbi8qKlxuICogVGhpcyBzZW5zb3IgcGlja3MgdXAgbmF0aXZlIGZvcmNlIHRvdWNoIGV2ZW50cyBhbmQgZGljdGF0ZXMgZHJhZyBvcGVyYXRpb25zXG4gKiBAY2xhc3MgRm9yY2VUb3VjaFNlbnNvclxuICogQG1vZHVsZSBGb3JjZVRvdWNoU2Vuc29yXG4gKiBAZXh0ZW5kcyBTZW5zb3JcbiAqL1xuXG52YXIgRm9yY2VUb3VjaFNlbnNvciA9IGZ1bmN0aW9uIChfU2Vuc29yKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKEZvcmNlVG91Y2hTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIC8qKlxuICAgKiBGb3JjZVRvdWNoU2Vuc29yIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBGb3JjZVRvdWNoU2Vuc29yXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBGb3JjZVRvdWNoU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRm9yY2VUb3VjaFNlbnNvcik7XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgZWxlbWVudCBuZWVkcyB0byBiZSByZW1lbWJlcmVkIHRvIHVuc2V0IHRoZSBkcmFnZ2FibGUgYXR0cmlidXRlIGFmdGVyIGRyYWcgb3BlcmF0aW9uIGhhcyBjb21wbGV0ZWRcbiAgICAgKiBAcHJvcGVydHkgbWlnaHREcmFnXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRm9yY2VUb3VjaFNlbnNvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEZvcmNlVG91Y2hTZW5zb3IpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuXG4gICAgX3RoaXNbb25Nb3VzZUZvcmNlV2lsbEJlZ2luXSA9IF90aGlzW29uTW91c2VGb3JjZVdpbGxCZWdpbl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZUZvcmNlRG93bl0gPSBfdGhpc1tvbk1vdXNlRm9yY2VEb3duXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlRG93bl0gPSBfdGhpc1tvbk1vdXNlRG93bl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZUZvcmNlQ2hhbmdlXSA9IF90aGlzW29uTW91c2VGb3JjZUNoYW5nZV0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZU1vdmVdID0gX3RoaXNbb25Nb3VzZU1vdmVdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VVcF0gPSBfdGhpc1tvbk1vdXNlVXBdLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRm9yY2VUb3VjaFNlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNld2lsbGJlZ2luJywgdGhpc1tvbk1vdXNlRm9yY2VXaWxsQmVnaW5dLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2Vkb3duJywgdGhpc1tvbk1vdXNlRm9yY2VEb3duXSwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzW29uTW91c2VEb3duXSwgdHJ1ZSk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2VjaGFuZ2VkJywgdGhpc1tvbk1vdXNlRm9yY2VDaGFuZ2VdLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzW29uTW91c2VNb3ZlXSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpc1tvbk1vdXNlVXBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5jb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lciA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNld2lsbGJlZ2luJywgdGhpc1tvbk1vdXNlRm9yY2VXaWxsQmVnaW5dLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2Vkb3duJywgdGhpc1tvbk1vdXNlRm9yY2VEb3duXSwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzW29uTW91c2VEb3duXSwgdHJ1ZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2VjaGFuZ2VkJywgdGhpc1tvbk1vdXNlRm9yY2VDaGFuZ2VdLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpc1tvbk1vdXNlTW92ZV0pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXNbb25Nb3VzZVVwXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgZm9yY2Ugd2lsbCBiZWdpbiBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIGZvcmNlIHdpbGwgYmVnaW4gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlRm9yY2VXaWxsQmVnaW4sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5taWdodERyYWcgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGZvcmNlIGRvd24gaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBmb3JjZSBkb3duIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZUZvcmNlRG93bixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgdmFyIGRyYWdTdGFydEV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnU3RhcnRTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnU3RhcnRFdmVudCk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSAhZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKTtcbiAgICAgIHRoaXMubWlnaHREcmFnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgdXAgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSB1cCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VVcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMubWlnaHREcmFnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgZG93biBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIGRvd24gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlRG93bixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5taWdodERyYWcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBOZWVkIHdvcmthcm91bmQgZm9yIHJlYWwgY2xpY2tcbiAgICAgIC8vIENhbmNlbCBwb3RlbnRpYWwgZHJhZyBldmVudHNcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIG1vdmUgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBmb3JjZSB3aWxsIGJlZ2luIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZU1vdmUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgZm9yY2UgY2hhbmdlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZm9yY2UgY2hhbmdlIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZUZvcmNlQ2hhbmdlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgdmFyIGNvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnUHJlc3N1cmVFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQoe1xuICAgICAgICBwcmVzc3VyZTogZXZlbnQud2Via2l0Rm9yY2UsXG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnUHJlc3N1cmVFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgZm9yY2UgZ2xvYmFsIGNoYW5nZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIGZvcmNlIGdsb2JhbCBjaGFuZ2UgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlRm9yY2VHbG9iYWxDaGFuZ2UsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50KHtcbiAgICAgICAgcHJlc3N1cmU6IGV2ZW50LndlYmtpdEZvcmNlLFxuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRm9yY2VUb3VjaFNlbnNvcjtcbn0oX1NlbnNvcjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZvcmNlVG91Y2hTZW5zb3I7XG5cbi8qKiovIH0pLFxuLyogMTE3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlN3YXBBbmltYXRpb24gPSBleHBvcnRzLlNuYXBwYWJsZSA9IGV4cG9ydHMuQ29sbGlkYWJsZSA9IHVuZGVmaW5lZDtcblxudmFyIF9Db2xsaWRhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTgpO1xuXG52YXIgX0NvbGxpZGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sbGlkYWJsZSk7XG5cbnZhciBfU25hcHBhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjIpO1xuXG52YXIgX1NuYXBwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TbmFwcGFibGUpO1xuXG52YXIgX1N3YXBBbmltYXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyNik7XG5cbnZhciBfU3dhcEFuaW1hdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Td2FwQW5pbWF0aW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5Db2xsaWRhYmxlID0gX0NvbGxpZGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLlNuYXBwYWJsZSA9IF9TbmFwcGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLlN3YXBBbmltYXRpb24gPSBfU3dhcEFuaW1hdGlvbjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMTggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Db2xsaWRhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTkpO1xuXG52YXIgX0NvbGxpZGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sbGlkYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Db2xsaWRhYmxlMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDExOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxudmFyIF9Db2xsaWRhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyMCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBDb2xsaWRhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDb2xsaWRhYmxlKGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIENvbGxpZGFibGUpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLl9vbkRyYWdNb3ZlID0gdGhpcy5fb25EcmFnTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB0aGlzLl9vblJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ29sbGlkYWJsZSwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzptb3ZlJywgdGhpcy5fb25EcmFnTW92ZSk7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOm1vdmUnLCB0aGlzLl9vbkRyYWdNb3ZlKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ01vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnTW92ZShldmVudCkge1xuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnNlbnNvckV2ZW50LnRhcmdldDtcblxuICAgICAgdGhpcy5jdXJyZW50QW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGFyZ2V0KSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQpIHtcbiAgICAgICAgZXZlbnQuY2FuY2VsKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb2xsaWRhYmxlSW5FdmVudCA9IG5ldyBfQ29sbGlkYWJsZUV2ZW50LkNvbGxpZGFibGVJbkV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY29sbGlkaW5nRWxlbWVudDogdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50XG4gICAgICB9KTtcblxuICAgICAgdmFyIGNvbGxpZGFibGVPdXRFdmVudCA9IG5ldyBfQ29sbGlkYWJsZUV2ZW50LkNvbGxpZGFibGVPdXRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGNvbGxpZGluZ0VsZW1lbnQ6IHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZW50ZXJpbmdDb2xsaWRhYmxlID0gQm9vbGVhbih0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQgJiYgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCAhPT0gdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50KTtcbiAgICAgIHZhciBsZWF2aW5nQ29sbGlkYWJsZSA9IEJvb2xlYW4oIXRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCAmJiB0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50KTtcblxuICAgICAgaWYgKGVudGVyaW5nQ29sbGlkYWJsZSkge1xuICAgICAgICBpZiAodGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXIoY29sbGlkYWJsZU91dEV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXIoY29sbGlkYWJsZUluRXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChsZWF2aW5nQ29sbGlkYWJsZSkge1xuICAgICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyKGNvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQgPSB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RvcChldmVudCkge1xuICAgICAgdmFyIGxhc3RDb2xsaWRpbmdFbGVtZW50ID0gdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50IHx8IHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQ7XG4gICAgICB2YXIgY29sbGlkYWJsZU91dEV2ZW50ID0gbmV3IF9Db2xsaWRhYmxlRXZlbnQuQ29sbGlkYWJsZU91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY29sbGlkaW5nRWxlbWVudDogbGFzdENvbGxpZGluZ0VsZW1lbnRcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobGFzdENvbGxpZGluZ0VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlcihjb2xsaWRhYmxlT3V0RXZlbnQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uUmVxdWVzdEFuaW1hdGlvbkZyYW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uUmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRhcmdldCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxpZGFibGVzID0gX3RoaXMuX2dldENvbGxpZGFibGVzKCk7XG4gICAgICAgIF90aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbGlkYWJsZXMuaW5jbHVkZXMoZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0Q29sbGlkYWJsZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0Q29sbGlkYWJsZXMoKSB7XG4gICAgICB2YXIgY29sbGlkYWJsZXMgPSB0aGlzLmRyYWdnYWJsZS5vcHRpb25zLmNvbGxpZGFibGVzO1xuXG4gICAgICBpZiAodHlwZW9mIGNvbGxpZGFibGVzID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb2xsaWRhYmxlcykpO1xuICAgICAgfSBlbHNlIGlmIChjb2xsaWRhYmxlcyBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGNvbGxpZGFibGVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGNvbGxpZGFibGVzKTtcbiAgICAgIH0gZWxzZSBpZiAoY29sbGlkYWJsZXMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gW2NvbGxpZGFibGVzXTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbGxpZGFibGVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBjb2xsaWRhYmxlcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29sbGlkYWJsZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29sbGlkYWJsZTtcblxuLyoqKi8gfSksXG4vKiAxMjAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Db2xsaWRhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyMSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQ29sbGlkYWJsZUluRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQ29sbGlkYWJsZUV2ZW50LkNvbGxpZGFibGVJbkV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQ29sbGlkYWJsZU91dEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0NvbGxpZGFibGVFdmVudC5Db2xsaWRhYmxlT3V0RXZlbnQ7XG4gIH1cbn0pO1xuXG4vKioqLyB9KSxcbi8qIDEyMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Db2xsaWRhYmxlT3V0RXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVJbkV2ZW50ID0gZXhwb3J0cy5Db2xsaWRhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIGNvbGxpZGFibGUgZXZlbnRcbiAqIEBjbGFzcyBDb2xsaWRhYmxlRXZlbnRcbiAqIEBtb2R1bGUgQ29sbGlkYWJsZUV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBDb2xsaWRhYmxlRXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDb2xsaWRhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBDb2xsaWRhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ29sbGlkYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ29sbGlkYWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sbGlkYWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShDb2xsaWRhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZyBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGlzIGNvbGxpYWJsZSBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBkcmFnRXZlbnRcbiAgICAgKiBAdHlwZSB7RHJhZ0V2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xsaWRhYmxlRXZlbnQ7XG59KF9BYnN0cmFjdEV2ZW50My5kZWZhdWx0KTtcblxuLyoqXG4gKiBDb2xsaWRhYmxlIGluIGV2ZW50XG4gKiBAY2xhc3MgQ29sbGlkYWJsZUluRXZlbnRcbiAqIEBtb2R1bGUgQ29sbGlkYWJsZUluRXZlbnRcbiAqIEBleHRlbmRzIENvbGxpZGFibGVFdmVudFxuICovXG5cblxuQ29sbGlkYWJsZUV2ZW50LnR5cGUgPSAnY29sbGlkYWJsZSc7XG5cbnZhciBDb2xsaWRhYmxlSW5FdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZUluRXZlbnQgPSBmdW5jdGlvbiAoX0NvbGxpZGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDb2xsaWRhYmxlSW5FdmVudCwgX0NvbGxpZGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gQ29sbGlkYWJsZUluRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ29sbGlkYWJsZUluRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChDb2xsaWRhYmxlSW5FdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbGxpZGFibGVJbkV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShDb2xsaWRhYmxlSW5FdmVudCwgW3tcbiAgICBrZXk6ICdjb2xsaWRpbmdFbGVtZW50JyxcblxuXG4gICAgLyoqXG4gICAgICogRWxlbWVudCB5b3UgYXJlIGN1cnJlbnRseSBjb2xsaWRpbmcgd2l0aFxuICAgICAqIEBwcm9wZXJ0eSBjb2xsaWRpbmdFbGVtZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jb2xsaWRpbmdFbGVtZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29sbGlkYWJsZUluRXZlbnQ7XG59KENvbGxpZGFibGVFdmVudCk7XG5cbi8qKlxuICogQ29sbGlkYWJsZSBvdXQgZXZlbnRcbiAqIEBjbGFzcyBDb2xsaWRhYmxlT3V0RXZlbnRcbiAqIEBtb2R1bGUgQ29sbGlkYWJsZU91dEV2ZW50XG4gKiBAZXh0ZW5kcyBDb2xsaWRhYmxlRXZlbnRcbiAqL1xuXG5cbkNvbGxpZGFibGVJbkV2ZW50LnR5cGUgPSAnY29sbGlkYWJsZTppbic7XG5cbnZhciBDb2xsaWRhYmxlT3V0RXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVPdXRFdmVudCA9IGZ1bmN0aW9uIChfQ29sbGlkYWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShDb2xsaWRhYmxlT3V0RXZlbnQsIF9Db2xsaWRhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBDb2xsaWRhYmxlT3V0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ29sbGlkYWJsZU91dEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ29sbGlkYWJsZU91dEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sbGlkYWJsZU91dEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShDb2xsaWRhYmxlT3V0RXZlbnQsIFt7XG4gICAga2V5OiAnY29sbGlkaW5nRWxlbWVudCcsXG5cblxuICAgIC8qKlxuICAgICAqIEVsZW1lbnQgeW91IHdlcmUgcHJldmlvdXNseSBjb2xsaWRpbmcgd2l0aFxuICAgICAqIEBwcm9wZXJ0eSBjb2xsaWRpbmdFbGVtZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jb2xsaWRpbmdFbGVtZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29sbGlkYWJsZU91dEV2ZW50O1xufShDb2xsaWRhYmxlRXZlbnQpO1xuXG5Db2xsaWRhYmxlT3V0RXZlbnQudHlwZSA9ICdjb2xsaWRhYmxlOm91dCc7XG5cbi8qKiovIH0pLFxuLyogMTIyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfU25hcHBhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjMpO1xuXG52YXIgX1NuYXBwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TbmFwcGFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfU25hcHBhYmxlMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDEyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfU25hcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyNCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTbmFwcGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNuYXBwYWJsZShkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwcGFibGUpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLl9vbkRyYWdTdGFydCA9IHRoaXMuX29uRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnU3RvcCA9IHRoaXMuX29uRHJhZ1N0b3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdPdmVyID0gdGhpcy5fb25EcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ091dCA9IHRoaXMuX29uRHJhZ091dC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU25hcHBhYmxlLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdkcmFnOnN0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpLm9uKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKS5vbignZHJhZzpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub24oJ2RyYWc6b3V0JywgdGhpcy5fb25EcmFnT3V0KS5vbignZHJvcHBhYmxlOm92ZXInLCB0aGlzLl9vbkRyYWdPdmVyKS5vbignZHJvcHBhYmxlOm91dCcsIHRoaXMuX29uRHJhZ091dCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOnN0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkub2ZmKCdkcmFnOm92ZXInLCB0aGlzLl9vbkRyYWdPdmVyKS5vZmYoJ2RyYWc6b3V0JywgdGhpcy5fb25EcmFnT3V0KS5vZmYoJ2Ryb3BwYWJsZTpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub2ZmKCdkcm9wcGFibGU6b3V0JywgdGhpcy5fb25EcmFnT3V0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RhcnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maXJzdFNvdXJjZSA9IGV2ZW50LnNvdXJjZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdG9wKCkge1xuICAgICAgdGhpcy5maXJzdFNvdXJjZSA9IG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ092ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnT3ZlcihldmVudCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc291cmNlID0gZXZlbnQuc291cmNlIHx8IGV2ZW50LmRyYWdFdmVudC5zb3VyY2U7XG4gICAgICB2YXIgbWlycm9yID0gZXZlbnQubWlycm9yIHx8IGV2ZW50LmRyYWdFdmVudC5taXJyb3I7XG5cbiAgICAgIGlmIChzb3VyY2UgPT09IHRoaXMuZmlyc3RTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5maXJzdFNvdXJjZSA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNuYXBJbkV2ZW50ID0gbmV3IF9TbmFwcGFibGVFdmVudC5TbmFwSW5FdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyKHNuYXBJbkV2ZW50KTtcblxuICAgICAgaWYgKHNuYXBJbkV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobWlycm9yKSB7XG4gICAgICAgIG1pcnJvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICBzb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcblxuICAgICAgLy8gTmVlZCB0byBjYW5jZWwgdGhpcyBpbiBkcmFnIG91dFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKF90aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpwbGFjZWQnKSk7XG4gICAgICB9LCB0aGlzLmRyYWdnYWJsZS5vcHRpb25zLnBsYWNlZFRpbWVvdXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnT3V0KGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtaXJyb3IgPSBldmVudC5taXJyb3IgfHwgZXZlbnQuZHJhZ0V2ZW50Lm1pcnJvcjtcbiAgICAgIHZhciBzb3VyY2UgPSBldmVudC5zb3VyY2UgfHwgZXZlbnQuZHJhZ0V2ZW50LnNvdXJjZTtcblxuICAgICAgdmFyIHNuYXBPdXRFdmVudCA9IG5ldyBfU25hcHBhYmxlRXZlbnQuU25hcE91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXIoc25hcE91dEV2ZW50KTtcblxuICAgICAgaWYgKHNuYXBPdXRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG1pcnJvcikge1xuICAgICAgICBtaXJyb3Iuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgfVxuXG4gICAgICBzb3VyY2UuY2xhc3NMaXN0LmFkZCh0aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNuYXBwYWJsZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU25hcHBhYmxlO1xuXG4vKioqLyB9KSxcbi8qIDEyNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1NuYXBwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjUpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NuYXBJbkV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NuYXBwYWJsZUV2ZW50LlNuYXBJbkV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU25hcE91dEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NuYXBwYWJsZUV2ZW50LlNuYXBPdXRFdmVudDtcbiAgfVxufSk7XG5cbi8qKiovIH0pLFxuLyogMTI1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNuYXBPdXRFdmVudCA9IGV4cG9ydHMuU25hcEluRXZlbnQgPSBleHBvcnRzLlNuYXBFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2Ugc25hcCBldmVudFxuICogQGNsYXNzIFNuYXBFdmVudFxuICogQG1vZHVsZSBTbmFwRXZlbnRcbiAqIEBleHRlbmRzIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIFNuYXBFdmVudCA9IGV4cG9ydHMuU25hcEV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNuYXBFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFNuYXBFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTbmFwRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTbmFwRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNuYXBFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoaXMgc25hcCBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBkcmFnRXZlbnRcbiAgICAgKiBAdHlwZSB7RHJhZ0V2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTbmFwRXZlbnQ7XG59KF9BYnN0cmFjdEV2ZW50My5kZWZhdWx0KTtcblxuLyoqXG4gKiBTbmFwIGluIGV2ZW50XG4gKiBAY2xhc3MgU25hcEluRXZlbnRcbiAqIEBtb2R1bGUgU25hcEluRXZlbnRcbiAqIEBleHRlbmRzIFNuYXBFdmVudFxuICovXG5cblxuU25hcEV2ZW50LnR5cGUgPSAnc25hcCc7XG5cbnZhciBTbmFwSW5FdmVudCA9IGV4cG9ydHMuU25hcEluRXZlbnQgPSBmdW5jdGlvbiAoX1NuYXBFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTbmFwSW5FdmVudCwgX1NuYXBFdmVudCk7XG5cbiAgZnVuY3Rpb24gU25hcEluRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU25hcEluRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTbmFwSW5FdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNuYXBJbkV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gU25hcEluRXZlbnQ7XG59KFNuYXBFdmVudCk7XG5cbi8qKlxuICogU25hcCBvdXQgZXZlbnRcbiAqIEBjbGFzcyBTbmFwT3V0RXZlbnRcbiAqIEBtb2R1bGUgU25hcE91dEV2ZW50XG4gKiBAZXh0ZW5kcyBTbmFwRXZlbnRcbiAqL1xuXG5cblNuYXBJbkV2ZW50LnR5cGUgPSAnc25hcDppbic7XG5TbmFwSW5FdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIFNuYXBPdXRFdmVudCA9IGV4cG9ydHMuU25hcE91dEV2ZW50ID0gZnVuY3Rpb24gKF9TbmFwRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNuYXBPdXRFdmVudCwgX1NuYXBFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIFNuYXBPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTbmFwT3V0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTbmFwT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBTbmFwT3V0RXZlbnQ7XG59KFNuYXBFdmVudCk7XG5cblNuYXBPdXRFdmVudC50eXBlID0gJ3NuYXA6b3V0JztcblNuYXBPdXRFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxuLyoqKi8gfSksXG4vKiAxMjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdFN3YXBBbmltYXRpb25PcHRpb25zID0gdW5kZWZpbmVkO1xuXG52YXIgX1N3YXBBbmltYXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyNyk7XG5cbnZhciBfU3dhcEFuaW1hdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Td2FwQW5pbWF0aW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1N3YXBBbmltYXRpb24yLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHRTd2FwQW5pbWF0aW9uT3B0aW9ucyA9IF9Td2FwQW5pbWF0aW9uLmRlZmF1bHRPcHRpb25zO1xuXG4vKioqLyB9KSxcbi8qIDEyNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0T3B0aW9ucyA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdE9wdGlvbnMgPSBleHBvcnRzLmRlZmF1bHRPcHRpb25zID0ge1xuICBkdXJhdGlvbjogMTUwLFxuICBlYXNpbmdGdW5jdGlvbjogJ2Vhc2UtaW4tb3V0J1xufTtcblxudmFyIFN3YXBBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN3YXBBbmltYXRpb24oZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcEFuaW1hdGlvbik7XG5cbiAgICB0aGlzLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcblxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCB0aGlzLmdldE9wdGlvbnMoKSk7XG5cbiAgICB0aGlzLm9uU29ydGFibGVTb3J0ZWQgPSB0aGlzLm9uU29ydGFibGVTb3J0ZWQuYmluZCh0aGlzKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBBbmltYXRpb24sIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24oJ3NvcnRhYmxlOnNvcnRlZCcsIHRoaXMub25Tb3J0YWJsZVNvcnRlZCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdzb3J0YWJsZTpzb3J0ZWQnLCB0aGlzLm9uU29ydGFibGVTb3J0ZWQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uU29ydGFibGVTb3J0ZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblNvcnRhYmxlU29ydGVkKF9yZWYpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBvbGRJbmRleCA9IF9yZWYub2xkSW5kZXgsXG4gICAgICAgICAgbmV3SW5kZXggPSBfcmVmLm5ld0luZGV4LFxuICAgICAgICAgIGRyYWdFdmVudCA9IF9yZWYuZHJhZ0V2ZW50O1xuICAgICAgdmFyIHNvdXJjZSA9IGRyYWdFdmVudC5zb3VyY2UsXG4gICAgICAgICAgb3ZlciA9IGRyYWdFdmVudC5vdmVyO1xuXG5cbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGFzdEFuaW1hdGlvbkZyYW1lKTtcblxuICAgICAgLy8gQ2FuIGJlIGRvbmUgaW4gYSBzZXBhcmF0ZSBmcmFtZVxuICAgICAgdGhpcy5sYXN0QW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAob2xkSW5kZXggPj0gbmV3SW5kZXgpIHtcbiAgICAgICAgICBhbmltYXRlKHNvdXJjZSwgb3ZlciwgX3RoaXMub3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYW5pbWF0ZShvdmVyLCBzb3VyY2UsIF90aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRPcHRpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZS5vcHRpb25zLnN3YXBBbmltYXRpb24gfHwge307XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTd2FwQW5pbWF0aW9uO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTd2FwQW5pbWF0aW9uO1xuXG5cbmZ1bmN0aW9uIGFuaW1hdGUodG9wLCBib3R0b20sIF9yZWYyKSB7XG4gIHZhciBkdXJhdGlvbiA9IF9yZWYyLmR1cmF0aW9uLFxuICAgICAgZWFzaW5nRnVuY3Rpb24gPSBfcmVmMi5lYXNpbmdGdW5jdGlvbjtcblxuICB2YXIgaGVpZ2h0ID0gdG9wLm9mZnNldEhlaWdodDtcblxuICB2YXIgX2FyciA9IFt0b3AsIGJvdHRvbV07XG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBfYXJyLmxlbmd0aDsgX2krKykge1xuICAgIHZhciBlbGVtZW50ID0gX2FycltfaV07XG4gICAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICB9XG5cbiAgdG9wLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLCAnICsgaGVpZ2h0ICsgJ3B4LCAwKSc7XG4gIGJvdHRvbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoMCwgLScgKyBoZWlnaHQgKyAncHgsIDApJztcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgIHZhciBfYXJyMiA9IFt0b3AsIGJvdHRvbV07XG5cbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBfYXJyMi5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgX2VsZW1lbnQgPSBfYXJyMltfaTJdO1xuICAgICAgX2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHJlc2V0RWxlbWVudE9uVHJhbnNpdGlvbkVuZCk7XG4gICAgICBfZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAnICsgZHVyYXRpb24gKyAnbXMgJyArIGVhc2luZ0Z1bmN0aW9uO1xuICAgICAgX2VsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRFbGVtZW50T25UcmFuc2l0aW9uRW5kKGV2ZW50KSB7XG4gIGV2ZW50LnRhcmdldC5zdHlsZS50cmFuc2l0aW9uID0gJyc7XG4gIGV2ZW50LnRhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJyc7XG4gIGV2ZW50LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgcmVzZXRFbGVtZW50T25UcmFuc2l0aW9uRW5kKTtcbn1cblxuLyoqKi8gfSksXG4vKiAxMjggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b0NvbnN1bWFibGVBcnJheTIpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxudmFyIF9QbHVnaW5zID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NSk7XG5cbnZhciBfU2Vuc29ycyA9IF9fd2VicGFja19yZXF1aXJlX18oNDUpO1xuXG52YXIgX0RyYWdnYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzQpO1xuXG52YXIgX0RyYWdFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTM2KTtcblxudmFyIF9NaXJyb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTM4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uRHJhZ1N0YXJ0ID0gU3ltYm9sKCdvbkRyYWdTdGFydCcpO1xudmFyIG9uRHJhZ01vdmUgPSBTeW1ib2woJ29uRHJhZ01vdmUnKTtcbnZhciBvbkRyYWdTdG9wID0gU3ltYm9sKCdvbkRyYWdTdG9wJyk7XG52YXIgb25EcmFnUHJlc3N1cmUgPSBTeW1ib2woJ29uRHJhZ1ByZXNzdXJlJyk7XG52YXIgZ2V0QXBwZW5kYWJsZUNvbnRhaW5lciA9IFN5bWJvbCgnZ2V0QXBwZW5kYWJsZUNvbnRhaW5lcicpO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGRyYWdnYWJsZTogJy5kcmFnZ2FibGUtc291cmNlJyxcbiAgaGFuZGxlOiBudWxsLFxuICBkZWxheTogMTAwLFxuICBwbGFjZWRUaW1lb3V0OiA4MDAsXG4gIHBsdWdpbnM6IFtdLFxuICBzZW5zb3JzOiBbXSxcbiAgY2xhc3Nlczoge1xuICAgICdjb250YWluZXI6ZHJhZ2dpbmcnOiAnZHJhZ2dhYmxlLWNvbnRhaW5lci0taXMtZHJhZ2dpbmcnLFxuICAgICdzb3VyY2U6ZHJhZ2dpbmcnOiAnZHJhZ2dhYmxlLXNvdXJjZS0taXMtZHJhZ2dpbmcnLFxuICAgICdzb3VyY2U6cGxhY2VkJzogJ2RyYWdnYWJsZS1zb3VyY2UtLXBsYWNlZCcsXG4gICAgJ2NvbnRhaW5lcjpwbGFjZWQnOiAnZHJhZ2dhYmxlLWNvbnRhaW5lci0tcGxhY2VkJyxcbiAgICAnYm9keTpkcmFnZ2luZyc6ICdkcmFnZ2FibGUtLWlzLWRyYWdnaW5nJyxcbiAgICAnZHJhZ2dhYmxlOm92ZXInOiAnZHJhZ2dhYmxlLS1vdmVyJyxcbiAgICAnY29udGFpbmVyOm92ZXInOiAnZHJhZ2dhYmxlLWNvbnRhaW5lci0tb3ZlcicsXG4gICAgbWlycm9yOiAnZHJhZ2dhYmxlLW1pcnJvcidcbiAgfVxufTtcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb3JlIGRyYWdnYWJsZSBsaWJyYXJ5IHRoYXQgZG9lcyB0aGUgaGVhdnkgbGlmdGluZ1xuICogQGNsYXNzIERyYWdnYWJsZVxuICogQG1vZHVsZSBEcmFnZ2FibGVcbiAqL1xuXG52YXIgRHJhZ2dhYmxlID0gZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxuICAgKiBEcmFnZ2FibGUgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIERyYWdnYWJsZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBEcmFnZ2FibGUgY29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGRyYWdnYWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gRHJhZ2dhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbZG9jdW1lbnQuYm9keV07XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZSk7XG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBjb250YWluZXJzXG4gICAgICogQHByb3BlcnR5IGNvbnRhaW5lcnNcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnRbXX1cbiAgICAgKi9cbiAgICBpZiAoY29udGFpbmVycyBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGNvbnRhaW5lcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5jb250YWluZXJzID0gW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKGNvbnRhaW5lcnMpKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lcnMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgdGhpcy5jb250YWluZXJzID0gW2NvbnRhaW5lcnNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RyYWdnYWJsZSBjb250YWluZXJzIGFyZSBleHBlY3RlZCB0byBiZSBvZiB0eXBlIGBOb2RlTGlzdGAsIGBIVE1MRWxlbWVudFtdYCBvciBgSFRNTEVsZW1lbnRgJyk7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGRyYWcgc3RhdGVcbiAgICAgKiBAcHJvcGVydHkgZHJhZ2dpbmdcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmUgcGx1Z2luc1xuICAgICAqIEBwcm9wZXJ0eSBwbHVnaW5zXG4gICAgICogQHR5cGUge1BsdWdpbltdfVxuICAgICAqL1xuICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQWN0aXZlIHNlbnNvcnNcbiAgICAgKiBAcHJvcGVydHkgc2Vuc29yc1xuICAgICAqIEB0eXBlIHtTZW5zb3JbXX1cbiAgICAgKi9cbiAgICB0aGlzLnNlbnNvcnMgPSBbXTtcblxuICAgIHRoaXNbb25EcmFnU3RhcnRdID0gdGhpc1tvbkRyYWdTdGFydF0uYmluZCh0aGlzKTtcbiAgICB0aGlzW29uRHJhZ01vdmVdID0gdGhpc1tvbkRyYWdNb3ZlXS5iaW5kKHRoaXMpO1xuICAgIHRoaXNbb25EcmFnU3RvcF0gPSB0aGlzW29uRHJhZ1N0b3BdLmJpbmQodGhpcyk7XG4gICAgdGhpc1tvbkRyYWdQcmVzc3VyZV0gPSB0aGlzW29uRHJhZ1ByZXNzdXJlXS5iaW5kKHRoaXMpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpzdGFydCcsIHRoaXNbb25EcmFnU3RhcnRdLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOm1vdmUnLCB0aGlzW29uRHJhZ01vdmVdLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOnN0b3AnLCB0aGlzW29uRHJhZ1N0b3BdLCB0cnVlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOnByZXNzdXJlJywgdGhpc1tvbkRyYWdQcmVzc3VyZV0sIHRydWUpO1xuXG4gICAgdGhpcy5hZGRQbHVnaW4uYXBwbHkodGhpcywgW19QbHVnaW5zLk1pcnJvciwgX1BsdWdpbnMuQWNjZXNzaWJpbGl0eV0uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMub3B0aW9ucy5wbHVnaW5zKSkpO1xuICAgIHRoaXMuYWRkU2Vuc29yLmFwcGx5KHRoaXMsIFtfU2Vuc29ycy5Nb3VzZVNlbnNvciwgX1NlbnNvcnMuVG91Y2hTZW5zb3JdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzLm9wdGlvbnMuc2Vuc29ycykpKTtcblxuICAgIHZhciBkcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gbmV3IF9EcmFnZ2FibGVFdmVudC5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KHtcbiAgICAgIGRyYWdnYWJsZTogdGhpc1xuICAgIH0pO1xuXG4gICAgdGhpcy50cmlnZ2VyKGRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIERyYWdnYWJsZSBpbnN0YW5jZS4gVGhpcyByZW1vdmVzIGFsbCBpbnRlcm5hbCBldmVudCBsaXN0ZW5lcnMgYW5kXG4gICAqIGRlYWN0aXZhdGVzIHNlbnNvcnMgYW5kIHBsdWdpbnNcbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnZ2FibGUsIFt7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOnN0YXJ0JywgdGhpcy5kcmFnU3RhcnQsIHRydWUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZzptb3ZlJywgdGhpcy5kcmFnTW92ZSwgdHJ1ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOnN0b3AnLCB0aGlzLmRyYWdTdG9wLCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6cHJlc3N1cmUnLCB0aGlzLmRyYWdQcmVzc3VyZSwgdHJ1ZSk7XG5cbiAgICAgIHZhciBkcmFnZ2FibGVEZXN0cm95RXZlbnQgPSBuZXcgX0RyYWdnYWJsZUV2ZW50LkRyYWdnYWJsZURlc3Ryb3lFdmVudCh7XG4gICAgICAgIGRyYWdnYWJsZTogdGhpc1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihkcmFnZ2FibGVEZXN0cm95RXZlbnQpO1xuXG4gICAgICB0aGlzLnJlbW92ZVBsdWdpbi5hcHBseSh0aGlzLCAoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzLnBsdWdpbnMubWFwKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbi5jb25zdHJ1Y3RvcjtcbiAgICAgIH0pKSk7XG4gICAgICB0aGlzLnJlbW92ZVNlbnNvci5hcHBseSh0aGlzLCAoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzLnNlbnNvcnMubWFwKGZ1bmN0aW9uIChzZW5zb3IpIHtcbiAgICAgICAgcmV0dXJuIHNlbnNvci5jb25zdHJ1Y3RvcjtcbiAgICAgIH0pKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBwbHVnaW4gdG8gdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2UuIFRoaXMgd2lsbCBlbmQgdXAgY2FsbGluZyB0aGUgYXR0YWNoIG1ldGhvZCBvZiB0aGUgcGx1Z2luXG4gICAgICogQHBhcmFtIHsuLi50eXBlb2YgUGx1Z2lufSBwbHVnaW5zIC0gUGx1Z2lucyB0aGF0IHlvdSB3YW50IGF0dGFjaGVkIHRvIGRyYWdnYWJsZVxuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUuYWRkUGx1Z2luKEN1c3RvbUExMXlQbHVnaW4sIEN1c3RvbU1pcnJvclBsdWdpbilcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYWRkUGx1Z2luJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkUGx1Z2luKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBsdWdpbnMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgcGx1Z2luc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjdGl2ZVBsdWdpbnMgPSBwbHVnaW5zLm1hcChmdW5jdGlvbiAoUGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBuZXcgUGx1Z2luKF90aGlzKTtcbiAgICAgIH0pO1xuICAgICAgYWN0aXZlUGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbi5hdHRhY2goKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wbHVnaW5zID0gW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMucGx1Z2lucyksICgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKGFjdGl2ZVBsdWdpbnMpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgcGx1Z2lucyB0aGF0IGFyZSBhbHJlYWR5IGF0dGFjaGVkIHRvIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlLiBUaGlzIHdpbGwgZW5kIHVwIGNhbGxpbmdcbiAgICAgKiB0aGUgZGV0YWNoIG1ldGhvZCBvZiB0aGUgcGx1Z2luXG4gICAgICogQHBhcmFtIHsuLi50eXBlb2YgUGx1Z2lufSBwbHVnaW5zIC0gUGx1Z2lucyB0aGF0IHlvdSB3YW50IGRldGFjaGVkIGZyb20gZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5yZW1vdmVQbHVnaW4oTWlycm9yUGx1Z2luLCBDdXN0b21NaXJyb3JQbHVnaW4pXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZVBsdWdpbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVBsdWdpbigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgcGx1Z2lucyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIHBsdWdpbnNbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbW92ZWRQbHVnaW5zID0gdGhpcy5wbHVnaW5zLmZpbHRlcihmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW5zLmluY2x1ZGVzKHBsdWdpbi5jb25zdHJ1Y3Rvcik7XG4gICAgICB9KTtcbiAgICAgIHJlbW92ZWRQbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gcGx1Z2luLmRldGFjaCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnBsdWdpbnMgPSB0aGlzLnBsdWdpbnMuZmlsdGVyKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuICFwbHVnaW5zLmluY2x1ZGVzKHBsdWdpbi5jb25zdHJ1Y3Rvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgc2Vuc29ycyB0byB0aGlzIGRyYWdnYWJsZSBpbnN0YW5jZS4gVGhpcyB3aWxsIGVuZCB1cCBjYWxsaW5nIHRoZSBhdHRhY2ggbWV0aG9kIG9mIHRoZSBzZW5zb3JcbiAgICAgKiBAcGFyYW0gey4uLnR5cGVvZiBTZW5zb3J9IHNlbnNvcnMgLSBTZW5zb3JzIHRoYXQgeW91IHdhbnQgYXR0YWNoZWQgdG8gZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5hZGRTZW5zb3IoRm9yY2VUb3VjaFNlbnNvciwgQ3VzdG9tU2Vuc29yKVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRTZW5zb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRTZW5zb3IoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBzZW5zb3JzID0gQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgICAgc2Vuc29yc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWN0aXZlU2Vuc29ycyA9IHNlbnNvcnMubWFwKGZ1bmN0aW9uIChTZW5zb3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW5zb3IoX3RoaXMyLmNvbnRhaW5lcnMsIF90aGlzMi5vcHRpb25zKTtcbiAgICAgIH0pO1xuICAgICAgYWN0aXZlU2Vuc29ycy5mb3JFYWNoKGZ1bmN0aW9uIChzZW5zb3IpIHtcbiAgICAgICAgcmV0dXJuIHNlbnNvci5hdHRhY2goKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZW5zb3JzID0gW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMuc2Vuc29ycyksICgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKGFjdGl2ZVNlbnNvcnMpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgc2Vuc29ycyB0aGF0IGFyZSBhbHJlYWR5IGF0dGFjaGVkIHRvIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlLiBUaGlzIHdpbGwgZW5kIHVwIGNhbGxpbmdcbiAgICAgKiB0aGUgZGV0YWNoIG1ldGhvZCBvZiB0aGUgc2Vuc29yXG4gICAgICogQHBhcmFtIHsuLi50eXBlb2YgU2Vuc29yfSBzZW5zb3JzIC0gU2Vuc29ycyB0aGF0IHlvdSB3YW50IGF0dGFjaGVkIHRvIGRyYWdnYWJsZVxuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUucmVtb3ZlU2Vuc29yKFRvdWNoU2Vuc29yLCBEcmFnU2Vuc29yKVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZW1vdmVTZW5zb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVTZW5zb3IoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIHNlbnNvcnMgPSBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBzZW5zb3JzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG5cbiAgICAgIHZhciByZW1vdmVkU2Vuc29ycyA9IHRoaXMuc2Vuc29ycy5maWx0ZXIoZnVuY3Rpb24gKHNlbnNvcikge1xuICAgICAgICByZXR1cm4gc2Vuc29ycy5pbmNsdWRlcyhzZW5zb3IuY29uc3RydWN0b3IpO1xuICAgICAgfSk7XG4gICAgICByZW1vdmVkU2Vuc29ycy5mb3JFYWNoKGZ1bmN0aW9uIChzZW5zb3IpIHtcbiAgICAgICAgcmV0dXJuIHNlbnNvci5kZXRhY2goKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZW5zb3JzID0gdGhpcy5zZW5zb3JzLmZpbHRlcihmdW5jdGlvbiAoc2Vuc29yKSB7XG4gICAgICAgIHJldHVybiAhc2Vuc29ycy5pbmNsdWRlcyhzZW5zb3IuY29uc3RydWN0b3IpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGNvbnRhaW5lciB0byB0aGlzIGRyYWdnYWJsZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7Li4uSFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBDb250YWluZXJzIHlvdSB3YW50IHRvIGFkZCB0byBkcmFnZ2FibGVcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLmFkZFBsdWdpbihDdXN0b21BMTF5UGx1Z2luLCBDdXN0b21NaXJyb3JQbHVnaW4pXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2FkZENvbnRhaW5lcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZENvbnRhaW5lcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgY29udGFpbmVycyA9IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICAgIGNvbnRhaW5lcnNbX2tleTVdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXJzID0gW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMuY29udGFpbmVycyksIGNvbnRhaW5lcnMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBjb250YWluZXIgZnJvbSB0aGlzIGRyYWdnYWJsZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7Li4uSFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBDb250YWluZXJzIHlvdSB3YW50IHRvIHJlbW92ZSBmcm9tIGRyYWdnYWJsZVxuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUucmVtb3ZlUGx1Z2luKE1pcnJvclBsdWdpbiwgQ3VzdG9tTWlycm9yUGx1Z2luKVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZW1vdmVDb250YWluZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVDb250YWluZXIoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNvbnRhaW5lcnMgPSBBcnJheShfbGVuNiksIF9rZXk2ID0gMDsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgICAgICBjb250YWluZXJzW19rZXk2XSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGFpbmVycyA9IHRoaXMuY29udGFpbmVycy5maWx0ZXIoZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gIWNvbnRhaW5lcnMuaW5jbHVkZXMoY29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBsaXN0ZW5lciBmb3IgZHJhZ2dhYmxlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gRXZlbnQgbmFtZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRXZlbnQgY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLm9uKCdkcmFnOnN0YXJ0JywgKGRyYWdFdmVudCkgPT4gZHJhZ0V2ZW50LmNhbmNlbCgpKTtcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgaWYgKCF0aGlzLmNhbGxiYWNrc1t0eXBlXSkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrc1t0eXBlXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNhbGxiYWNrc1t0eXBlXS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbGlzdGVuZXIgZnJvbSBkcmFnZ2FibGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEV2ZW50IG5hbWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEV2ZW50IGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5vZmYoJ2RyYWc6c3RhcnQnLCBoYW5kbGVyRnVuY3Rpb24pO1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvZmYnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvZmYodHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghdGhpcy5jYWxsYmFja3NbdHlwZV0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgY29weSA9IHRoaXMuY2FsbGJhY2tzW3R5cGVdLnNsaWNlKDApO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3B5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayA9PT0gY29weVtpXSkge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW3R5cGVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgZHJhZ2dhYmxlIGV2ZW50XG4gICAgICogQHBhcmFtIHtBYnN0cmFjdEV2ZW50fSBldmVudCAtIEV2ZW50IGluc3RhbmNlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS50cmlnZ2VyKGV2ZW50KTtcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndHJpZ2dlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5jYWxsYmFja3NbZXZlbnQudHlwZV0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgY2FsbGJhY2tzID0gW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMuY2FsbGJhY2tzW2V2ZW50LnR5cGVdKSk7XG4gICAgICBmb3IgKHZhciBpID0gY2FsbGJhY2tzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXTtcbiAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjbGFzcyBuYW1lIGZvciBjbGFzcyBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIGNsYXNzIGlkZW50aWZpZXJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd8bnVsbH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2xhc3NOYW1lRm9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lRm9yKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xhc3Nlc1tuYW1lXSB8fCBkZWZhdWx0cy5jbGFzc2VzW25hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGRyYWdnYWJsZSBpbnN0YW5jZSBpcyBjdXJyZW50bHkgZHJhZ2dpbmdcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpc0RyYWdnaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNEcmFnZ2luZygpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuZHJhZ2dpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RhcnQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBET00gRHJhZyBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIHNlbnNvckV2ZW50ID0gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpO1xuICAgICAgdmFyIHRhcmdldCA9IHNlbnNvckV2ZW50LnRhcmdldCxcbiAgICAgICAgICBjb250YWluZXIgPSBzZW5zb3JFdmVudC5jb250YWluZXIsXG4gICAgICAgICAgb3JpZ2luYWxFdmVudCA9IHNlbnNvckV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG5cblxuICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lcnMuaW5jbHVkZXMoY29udGFpbmVyKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFuZGxlICYmIHRhcmdldCAmJiAhKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIHRoaXMub3B0aW9ucy5oYW5kbGUpKSB7XG4gICAgICAgIHNlbnNvckV2ZW50LmNhbmNlbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEZpbmQgZHJhZ2dhYmxlIHNvdXJjZSBlbGVtZW50XG4gICAgICB0aGlzLm9yaWdpbmFsU291cmNlID0gKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICAgIGlmICghdGhpcy5vcmlnaW5hbFNvdXJjZSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLm9yaWdpbmFsU291cmNlLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgaWYgKCFpc0RyYWdFdmVudChvcmlnaW5hbEV2ZW50KSkge1xuICAgICAgICB2YXIgYXBwZW5kYWJsZUNvbnRhaW5lciA9IHRoaXNbZ2V0QXBwZW5kYWJsZUNvbnRhaW5lcl0oeyBzb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UgfSk7XG4gICAgICAgIHRoaXMubWlycm9yID0gdGhpcy5zb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgIHZhciBtaXJyb3JDcmVhdGVkRXZlbnQgPSBuZXcgX01pcnJvckV2ZW50Lk1pcnJvckNyZWF0ZWRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbWlycm9yQXR0YWNoZWRFdmVudCA9IG5ldyBfTWlycm9yRXZlbnQuTWlycm9yQXR0YWNoZWRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIobWlycm9yQ3JlYXRlZEV2ZW50KTtcbiAgICAgICAgYXBwZW5kYWJsZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm1pcnJvcik7XG4gICAgICAgIHRoaXMudHJpZ2dlcihtaXJyb3JBdHRhY2hlZEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLnNvdXJjZSwgdGhpcy5vcmlnaW5hbFNvdXJjZSk7XG5cbiAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMuc291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignYm9keTpkcmFnZ2luZycpKTtcbiAgICAgIGFwcGx5VXNlclNlbGVjdChkb2N1bWVudC5ib2R5LCAnbm9uZScpO1xuXG4gICAgICBpZiAodGhpcy5taXJyb3IpIHtcbiAgICAgICAgdmFyIG1pcnJvck1vdmVFdmVudCA9IG5ldyBfTWlycm9yRXZlbnQuTWlycm9yTW92ZUV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihtaXJyb3JNb3ZlRXZlbnQpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZHJhZ0V2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ1N0YXJ0RXZlbnQoe1xuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihkcmFnRXZlbnQpO1xuXG4gICAgICBpZiAoIWRyYWdFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWlycm9yKSB7XG4gICAgICAgIHRoaXMubWlycm9yLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5taXJyb3IpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6ZHJhZ2dpbmcnKSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2JvZHk6ZHJhZ2dpbmcnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBtb3ZlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRE9NIERyYWcgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdNb3ZlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlbnNvckV2ZW50ID0gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHNlbnNvckV2ZW50LmNvbnRhaW5lcjtcblxuICAgICAgdmFyIHRhcmdldCA9IHNlbnNvckV2ZW50LnRhcmdldDtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnTW92ZUV2ZW50KHtcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoZHJhZ01vdmVFdmVudCk7XG5cbiAgICAgIGlmIChkcmFnTW92ZUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgc2Vuc29yRXZlbnQuY2FuY2VsKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1pcnJvciAmJiAhZHJhZ01vdmVFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHZhciBtaXJyb3JNb3ZlRXZlbnQgPSBuZXcgX01pcnJvckV2ZW50Lk1pcnJvck1vdmVFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIobWlycm9yTW92ZUV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0ID0gKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuICAgICAgdmFyIHdpdGhpbkNvcnJlY3RDb250YWluZXIgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKHNlbnNvckV2ZW50LnRhcmdldCwgdGhpcy5jb250YWluZXJzKTtcbiAgICAgIHZhciBvdmVyQ29udGFpbmVyID0gc2Vuc29yRXZlbnQub3ZlckNvbnRhaW5lciB8fCB3aXRoaW5Db3JyZWN0Q29udGFpbmVyO1xuICAgICAgdmFyIGlzTGVhdmluZ0NvbnRhaW5lciA9IHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgJiYgb3ZlckNvbnRhaW5lciAhPT0gdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lcjtcbiAgICAgIHZhciBpc0xlYXZpbmdEcmFnZ2FibGUgPSB0aGlzLmN1cnJlbnRPdmVyICYmIHRhcmdldCAhPT0gdGhpcy5jdXJyZW50T3ZlcjtcbiAgICAgIHZhciBpc092ZXJDb250YWluZXIgPSBvdmVyQ29udGFpbmVyICYmIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgIT09IG92ZXJDb250YWluZXI7XG4gICAgICB2YXIgaXNPdmVyRHJhZ2dhYmxlID0gd2l0aGluQ29ycmVjdENvbnRhaW5lciAmJiB0YXJnZXQgJiYgdGhpcy5jdXJyZW50T3ZlciAhPT0gdGFyZ2V0O1xuXG4gICAgICBpZiAoaXNMZWF2aW5nRHJhZ2dhYmxlKSB7XG4gICAgICAgIHZhciBkcmFnT3V0RXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnT3V0RXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgICAgb3ZlcjogdGhpcy5jdXJyZW50T3ZlclxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoZHJhZ091dEV2ZW50KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2RyYWdnYWJsZTpvdmVyJykpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTGVhdmluZ0NvbnRhaW5lcikge1xuICAgICAgICB2YXIgZHJhZ091dENvbnRhaW5lckV2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ091dENvbnRhaW5lckV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICAgIG92ZXJDb250YWluZXI6IHRoaXMub3ZlckNvbnRhaW5lclxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoZHJhZ091dENvbnRhaW5lckV2ZW50KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpvdmVyJykpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzT3ZlckNvbnRhaW5lcikge1xuICAgICAgICBvdmVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpvdmVyJykpO1xuXG4gICAgICAgIHZhciBkcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ092ZXJDb250YWluZXJFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyQ29udGFpbmVyOiBvdmVyQ29udGFpbmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihkcmFnT3ZlckNvbnRhaW5lckV2ZW50KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyID0gb3ZlckNvbnRhaW5lcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzT3ZlckRyYWdnYWJsZSkge1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignZHJhZ2dhYmxlOm92ZXInKSk7XG5cbiAgICAgICAgdmFyIGRyYWdPdmVyRXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnT3ZlckV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICAgIG92ZXJDb250YWluZXI6IG92ZXJDb250YWluZXIsXG4gICAgICAgICAgb3ZlcjogdGFyZ2V0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihkcmFnT3ZlckV2ZW50KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyID0gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RvcCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERPTSBEcmFnIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnU3RvcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ1N0b3BFdmVudCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICBzZW5zb3JFdmVudDogZXZlbnQuc2Vuc29yRXZlbnQsXG4gICAgICAgIHNvdXJjZUNvbnRhaW5lcjogdGhpcy5zb3VyY2VDb250YWluZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuc291cmNlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMub3JpZ2luYWxTb3VyY2UsIHRoaXMuc291cmNlKTtcbiAgICAgIHRoaXMuc291cmNlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zb3VyY2UpO1xuICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZS5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgIHRoaXMuc291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2UuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpwbGFjZWQnKSk7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6ZHJhZ2dpbmcnKSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2JvZHk6ZHJhZ2dpbmcnKSk7XG4gICAgICBhcHBseVVzZXJTZWxlY3QoZG9jdW1lbnQuYm9keSwgJycpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T3Zlcikge1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2RyYWdnYWJsZTpvdmVyJykpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpvdmVyJykpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taXJyb3IpIHtcbiAgICAgICAgdmFyIG1pcnJvckRlc3Ryb3lFdmVudCA9IG5ldyBfTWlycm9yRXZlbnQuTWlycm9yRGVzdHJveUV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBzZW5zb3JFdmVudC5jb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihtaXJyb3JEZXN0cm95RXZlbnQpO1xuXG4gICAgICAgIGlmICghbWlycm9yRGVzdHJveUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgICB0aGlzLm1pcnJvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubWlycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgbGFzdFNvdXJjZSA9IHRoaXMub3JpZ2luYWxTb3VyY2U7XG4gICAgICB2YXIgbGFzdFNvdXJjZUNvbnRhaW5lciA9IHRoaXMuc291cmNlQ29udGFpbmVyO1xuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGxhc3RTb3VyY2UpIHtcbiAgICAgICAgICBsYXN0U291cmNlLmNsYXNzTGlzdC5yZW1vdmUoX3RoaXMzLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0U291cmNlQ29udGFpbmVyKSB7XG4gICAgICAgICAgbGFzdFNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKF90aGlzMy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpwbGFjZWQnKSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMub3B0aW9ucy5wbGFjZWRUaW1lb3V0KTtcblxuICAgICAgdGhpcy5zb3VyY2UgPSBudWxsO1xuICAgICAgdGhpcy5taXJyb3IgPSBudWxsO1xuICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZSA9IG51bGw7XG4gICAgICB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuY3VycmVudE92ZXIgPSBudWxsO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgcHJlc3N1cmUgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBET00gRHJhZyBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1ByZXNzdXJlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlbnNvckV2ZW50ID0gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpO1xuICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuc291cmNlIHx8ICgwLCBfdXRpbHMuY2xvc2VzdCkoc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnUHJlc3N1cmVFdmVudCh7XG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgIHByZXNzdXJlOiBzZW5zb3JFdmVudC5wcmVzc3VyZVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihkcmFnUHJlc3N1cmVFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhcHBlbmRhYmxlIGNvbnRhaW5lciBmb3IgbWlycm9yIGJhc2VkIG9uIHRoZSBhcHBlbmRUbyBvcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gb3B0aW9ucy5zb3VyY2UgLSBDdXJyZW50IHNvdXJjZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IGdldEFwcGVuZGFibGVDb250YWluZXIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF9yZWYpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBfcmVmLnNvdXJjZTtcblxuICAgICAgdmFyIGFwcGVuZFRvID0gdGhpcy5vcHRpb25zLmFwcGVuZFRvO1xuXG4gICAgICBpZiAodHlwZW9mIGFwcGVuZFRvID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhcHBlbmRUbyk7XG4gICAgICB9IGVsc2UgaWYgKGFwcGVuZFRvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGFwcGVuZFRvO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGFwcGVuZFRvKHNvdXJjZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdnYWJsZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRHJhZ2dhYmxlO1xuXG5cbmZ1bmN0aW9uIGdldFNlbnNvckV2ZW50KGV2ZW50KSB7XG4gIHJldHVybiBldmVudC5kZXRhaWw7XG59XG5cbmZ1bmN0aW9uIGlzRHJhZ0V2ZW50KGV2ZW50KSB7XG4gIHJldHVybiAoL15kcmFnLy50ZXN0KGV2ZW50LnR5cGUpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5VXNlclNlbGVjdChlbGVtZW50LCB2YWx1ZSkge1xuICBlbGVtZW50LnN0eWxlLndlYmtpdFVzZXJTZWxlY3QgPSB2YWx1ZTtcbiAgZWxlbWVudC5zdHlsZS5tb3pVc2VyU2VsZWN0ID0gdmFsdWU7XG4gIGVsZW1lbnQuc3R5bGUubXNVc2VyU2VsZWN0ID0gdmFsdWU7XG4gIGVsZW1lbnQuc3R5bGUub1VzZXJTZWxlY3QgPSB2YWx1ZTtcbiAgZWxlbWVudC5zdHlsZS51c2VyU2VsZWN0ID0gdmFsdWU7XG59XG5cbi8qKiovIH0pLFxuLyogMTI5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHRNaXJyb3JPcHRpb24gPSB1bmRlZmluZWQ7XG5cbnZhciBfTWlycm9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzApO1xuXG52YXIgX01pcnJvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9NaXJyb3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfTWlycm9yMi5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0TWlycm9yT3B0aW9uID0gX01pcnJvci5kZWZhdWx0T3B0aW9ucztcblxuLyoqKi8gfSksXG4vKiAxMzAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdE9wdGlvbnMgPSB1bmRlZmluZWQ7XG5cbnZhciBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzEpO1xuXG52YXIgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMik7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGRlZmF1bHRPcHRpb25zID0gZXhwb3J0cy5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgY29uc3RyYWluRGltZW5zaW9uczogZmFsc2UsXG4gIHhBeGlzOiB0cnVlLFxuICB5QXhpczogdHJ1ZVxufTtcblxudmFyIE1pcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWlycm9yKGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvcik7XG5cbiAgICB0aGlzLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgdGhpcy5nZXRPcHRpb25zKCkpO1xuXG4gICAgdGhpcy5vbk1pcnJvckNyZWF0ZWQgPSB0aGlzLm9uTWlycm9yQ3JlYXRlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25NaXJyb3JNb3ZlID0gdGhpcy5vbk1pcnJvck1vdmUuYmluZCh0aGlzKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE1pcnJvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignbWlycm9yOmNyZWF0ZWQnLCB0aGlzLm9uTWlycm9yQ3JlYXRlZCkub24oJ21pcnJvcjptb3ZlJywgdGhpcy5vbk1pcnJvck1vdmUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignbWlycm9yOmNyZWF0ZWQnLCB0aGlzLm9uTWlycm9yQ3JlYXRlZCkub2ZmKCdtaXJyb3I6bW92ZScsIHRoaXMub25NaXJyb3JNb3ZlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRPcHRpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZS5vcHRpb25zLm1pcnJvciB8fCB7fTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbk1pcnJvckNyZWF0ZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1pcnJvckNyZWF0ZWQoX3JlZikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIG1pcnJvciA9IF9yZWYubWlycm9yLFxuICAgICAgICAgIHNvdXJjZSA9IF9yZWYuc291cmNlLFxuICAgICAgICAgIHNlbnNvckV2ZW50ID0gX3JlZi5zZW5zb3JFdmVudDtcblxuICAgICAgdmFyIG1pcnJvckNsYXNzID0gdGhpcy5kcmFnZ2FibGUuZ2V0Q2xhc3NOYW1lRm9yKCdtaXJyb3InKTtcblxuICAgICAgdmFyIHNldFN0YXRlID0gZnVuY3Rpb24gc2V0U3RhdGUoX3JlZjIpIHtcbiAgICAgICAgdmFyIG1pcnJvck9mZnNldCA9IF9yZWYyLm1pcnJvck9mZnNldCxcbiAgICAgICAgICAgIGluaXRpYWxYID0gX3JlZjIuaW5pdGlhbFgsXG4gICAgICAgICAgICBpbml0aWFsWSA9IF9yZWYyLmluaXRpYWxZLFxuICAgICAgICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWYyLCBbJ21pcnJvck9mZnNldCcsICdpbml0aWFsWCcsICdpbml0aWFsWSddKTtcblxuICAgICAgICBfdGhpcy5taXJyb3JPZmZzZXQgPSBtaXJyb3JPZmZzZXQ7XG4gICAgICAgIF90aGlzLmluaXRpYWxYID0gaW5pdGlhbFg7XG4gICAgICAgIF90aGlzLmluaXRpYWxZID0gaW5pdGlhbFk7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgbWlycm9yT2Zmc2V0OiBtaXJyb3JPZmZzZXQsIGluaXRpYWxYOiBpbml0aWFsWCwgaW5pdGlhbFk6IGluaXRpYWxZIH0sIGFyZ3MpO1xuICAgICAgfTtcblxuICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgICAgbWlycm9yOiBtaXJyb3IsXG4gICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgIG1pcnJvckNsYXNzOiBtaXJyb3JDbGFzcyxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluaXRpYWxTdGF0ZSlcbiAgICAgIC8vIEZpeCByZWZsb3cgaGVyZVxuICAgICAgLnRoZW4oY29tcHV0ZU1pcnJvckRpbWVuc2lvbnMpLnRoZW4oY2FsY3VsYXRlTWlycm9yT2Zmc2V0KS50aGVuKHJlc2V0TWlycm9yKS50aGVuKGFkZE1pcnJvckNsYXNzZXMpLnRoZW4ocG9zaXRpb25NaXJyb3IoeyBpbml0aWFsOiB0cnVlIH0pKS50aGVuKHJlbW92ZU1pcnJvcklEKS50aGVuKHNldFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbk1pcnJvck1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1pcnJvck1vdmUoX3JlZjMpIHtcbiAgICAgIHZhciBtaXJyb3IgPSBfcmVmMy5taXJyb3IsXG4gICAgICAgICAgc2Vuc29yRXZlbnQgPSBfcmVmMy5zZW5zb3JFdmVudDtcblxuICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgICAgbWlycm9yOiBtaXJyb3IsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgbWlycm9yT2Zmc2V0OiB0aGlzLm1pcnJvck9mZnNldCxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICBpbml0aWFsWDogdGhpcy5pbml0aWFsWCxcbiAgICAgICAgaW5pdGlhbFk6IHRoaXMuaW5pdGlhbFlcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5pdGlhbFN0YXRlKS50aGVuKHBvc2l0aW9uTWlycm9yKHsgcmFmOiB0cnVlIH0pKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1pcnJvcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTWlycm9yO1xuXG5cbmZ1bmN0aW9uIGNvbXB1dGVNaXJyb3JEaW1lbnNpb25zKF9yZWY0KSB7XG4gIHZhciBzb3VyY2UgPSBfcmVmNC5zb3VyY2UsXG4gICAgICBhcmdzID0gKDAsIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMuZGVmYXVsdCkoX3JlZjQsIFsnc291cmNlJ10pO1xuXG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHZhciBzb3VyY2VSZWN0ID0gc291cmNlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJlc29sdmUoT2JqZWN0LmFzc2lnbih7IHNvdXJjZTogc291cmNlLCBzb3VyY2VSZWN0OiBzb3VyY2VSZWN0IH0sIGFyZ3MpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZU1pcnJvck9mZnNldChfcmVmNSkge1xuICB2YXIgc2Vuc29yRXZlbnQgPSBfcmVmNS5zZW5zb3JFdmVudCxcbiAgICAgIHNvdXJjZVJlY3QgPSBfcmVmNS5zb3VyY2VSZWN0LFxuICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWY1LCBbJ3NlbnNvckV2ZW50JywgJ3NvdXJjZVJlY3QnXSk7XG5cbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIG1pcnJvck9mZnNldCA9IHtcbiAgICAgIHRvcDogc2Vuc29yRXZlbnQuY2xpZW50WSAtIHNvdXJjZVJlY3QudG9wLFxuICAgICAgbGVmdDogc2Vuc29yRXZlbnQuY2xpZW50WCAtIHNvdXJjZVJlY3QubGVmdFxuICAgIH07XG5cbiAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oeyBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsIHNvdXJjZVJlY3Q6IHNvdXJjZVJlY3QsIG1pcnJvck9mZnNldDogbWlycm9yT2Zmc2V0IH0sIGFyZ3MpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0TWlycm9yKF9yZWY2KSB7XG4gIHZhciBtaXJyb3IgPSBfcmVmNi5taXJyb3IsXG4gICAgICBzb3VyY2UgPSBfcmVmNi5zb3VyY2UsXG4gICAgICBvcHRpb25zID0gX3JlZjYub3B0aW9ucyxcbiAgICAgIGFyZ3MgPSAoMCwgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMy5kZWZhdWx0KShfcmVmNiwgWydtaXJyb3InLCAnc291cmNlJywgJ29wdGlvbnMnXSk7XG5cbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIG9mZnNldEhlaWdodCA9IHZvaWQgMDtcbiAgICB2YXIgb2Zmc2V0V2lkdGggPSB2b2lkIDA7XG5cbiAgICBpZiAob3B0aW9ucy5jb25zdHJhaW5EaW1lbnNpb25zKSB7XG4gICAgICBvZmZzZXRIZWlnaHQgPSBzb3VyY2Uub2Zmc2V0SGVpZ2h0O1xuICAgICAgb2Zmc2V0V2lkdGggPSBzb3VyY2Uub2Zmc2V0V2lkdGg7XG4gICAgfVxuXG4gICAgbWlycm9yLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICBtaXJyb3Iuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICBtaXJyb3Iuc3R5bGUudG9wID0gMDtcbiAgICBtaXJyb3Iuc3R5bGUubGVmdCA9IDA7XG5cbiAgICBpZiAob3B0aW9ucy5jb25zdHJhaW5EaW1lbnNpb25zKSB7XG4gICAgICBtaXJyb3Iuc3R5bGUuaGVpZ2h0ID0gb2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgIG1pcnJvci5zdHlsZS53aWR0aCA9IG9mZnNldFdpZHRoICsgJ3B4JztcbiAgICB9XG5cbiAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oeyBtaXJyb3I6IG1pcnJvciwgc291cmNlOiBzb3VyY2UsIG9wdGlvbnM6IG9wdGlvbnMgfSwgYXJncykpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkTWlycm9yQ2xhc3NlcyhfcmVmNykge1xuICB2YXIgbWlycm9yID0gX3JlZjcubWlycm9yLFxuICAgICAgbWlycm9yQ2xhc3MgPSBfcmVmNy5taXJyb3JDbGFzcyxcbiAgICAgIGFyZ3MgPSAoMCwgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMy5kZWZhdWx0KShfcmVmNywgWydtaXJyb3InLCAnbWlycm9yQ2xhc3MnXSk7XG5cbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgbWlycm9yLmNsYXNzTGlzdC5hZGQobWlycm9yQ2xhc3MpO1xuICAgIHJlc29sdmUoT2JqZWN0LmFzc2lnbih7IG1pcnJvcjogbWlycm9yLCBtaXJyb3JDbGFzczogbWlycm9yQ2xhc3MgfSwgYXJncykpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTWlycm9ySUQoX3JlZjgpIHtcbiAgdmFyIG1pcnJvciA9IF9yZWY4Lm1pcnJvcixcbiAgICAgIGFyZ3MgPSAoMCwgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMy5kZWZhdWx0KShfcmVmOCwgWydtaXJyb3InXSk7XG5cbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgbWlycm9yLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcbiAgICBkZWxldGUgbWlycm9yLmlkO1xuICAgIHJlc29sdmUoT2JqZWN0LmFzc2lnbih7IG1pcnJvcjogbWlycm9yIH0sIGFyZ3MpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uTWlycm9yKCkge1xuICB2YXIgX3JlZjkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuICAgICAgX3JlZjkkd2l0aEZyYW1lID0gX3JlZjkud2l0aEZyYW1lLFxuICAgICAgd2l0aEZyYW1lID0gX3JlZjkkd2l0aEZyYW1lID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWY5JHdpdGhGcmFtZSxcbiAgICAgIF9yZWY5JGluaXRpYWwgPSBfcmVmOS5pbml0aWFsLFxuICAgICAgaW5pdGlhbCA9IF9yZWY5JGluaXRpYWwgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZjkkaW5pdGlhbDtcblxuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYxMCkge1xuICAgIHZhciBtaXJyb3IgPSBfcmVmMTAubWlycm9yLFxuICAgICAgICBzZW5zb3JFdmVudCA9IF9yZWYxMC5zZW5zb3JFdmVudCxcbiAgICAgICAgbWlycm9yT2Zmc2V0ID0gX3JlZjEwLm1pcnJvck9mZnNldCxcbiAgICAgICAgaW5pdGlhbFkgPSBfcmVmMTAuaW5pdGlhbFksXG4gICAgICAgIGluaXRpYWxYID0gX3JlZjEwLmluaXRpYWxYLFxuICAgICAgICBvcHRpb25zID0gX3JlZjEwLm9wdGlvbnMsXG4gICAgICAgIGFyZ3MgPSAoMCwgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMy5kZWZhdWx0KShfcmVmMTAsIFsnbWlycm9yJywgJ3NlbnNvckV2ZW50JywgJ21pcnJvck9mZnNldCcsICdpbml0aWFsWScsICdpbml0aWFsWCcsICdvcHRpb25zJ10pO1xuXG4gICAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIG1pcnJvcjogbWlycm9yLFxuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgIG1pcnJvck9mZnNldDogbWlycm9yT2Zmc2V0LFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICB9LCBhcmdzKTtcblxuICAgICAgaWYgKG1pcnJvck9mZnNldCkge1xuICAgICAgICB2YXIgeCA9IHNlbnNvckV2ZW50LmNsaWVudFggLSBtaXJyb3JPZmZzZXQubGVmdDtcbiAgICAgICAgdmFyIHkgPSBzZW5zb3JFdmVudC5jbGllbnRZIC0gbWlycm9yT2Zmc2V0LnRvcDtcblxuICAgICAgICBpZiAob3B0aW9ucy54QXhpcyAmJiBvcHRpb25zLnlBeGlzIHx8IGluaXRpYWwpIHtcbiAgICAgICAgICBtaXJyb3Iuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMCknO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMueEF4aXMgJiYgIW9wdGlvbnMueUF4aXMpIHtcbiAgICAgICAgICBtaXJyb3Iuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgaW5pdGlhbFkgKyAncHgsIDApJztcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnlBeGlzICYmICFvcHRpb25zLnhBeGlzKSB7XG4gICAgICAgICAgbWlycm9yLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgaW5pdGlhbFggKyAncHgsICcgKyB5ICsgJ3B4LCAwKSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5pdGlhbCkge1xuICAgICAgICAgIHJlc3VsdC5pbml0aWFsWCA9IHg7XG4gICAgICAgICAgcmVzdWx0LmluaXRpYWxZID0geTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgfSwgeyBmcmFtZTogd2l0aEZyYW1lIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3aXRoUHJvbWlzZShjYWxsYmFjaykge1xuICB2YXIgX3JlZjExID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgIF9yZWYxMSRyYWYgPSBfcmVmMTEucmFmLFxuICAgICAgcmFmID0gX3JlZjExJHJhZiA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmMTEkcmFmO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKHJhZikge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsbGJhY2socmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhyZXNvbHZlLCByZWplY3QpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKiovIH0pLFxuLyogMTMxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqKi8gfSksXG4vKiAxMzIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9BY2Nlc3NpYmlsaXR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzMpO1xuXG52YXIgX0FjY2Vzc2liaWxpdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWNjZXNzaWJpbGl0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9BY2Nlc3NpYmlsaXR5Mi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDEzMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBBUklBX0dSQUJCRUQgPSAnYXJpYS1ncmFiYmVkJztcbnZhciBBUklBX0RST1BFRkZFQ1QgPSAnYXJpYS1kcm9wZWZmZWN0JztcbnZhciBUQUJJTkRFWCA9ICd0YWJpbmRleCc7XG5cbi8qKlxuICogX19XSVBfXyBBY2Nlc3NpYmlsaXR5IHBsdWdpblxuICogQGNsYXNzIEFjY2Vzc2liaWxpdHlcbiAqIEBtb2R1bGUgQWNjZXNzaWJpbGl0eVxuICovXG5cbnZhciBBY2Nlc3NpYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxuICAgKiBBY2Nlc3NpYmlsaXR5IGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBBY2Nlc3NpYmlsaXR5XG4gICAqIEBwYXJhbSB7RHJhZ2dhYmxlfSBkcmFnZ2FibGUgLSBEcmFnZ2FibGUgaW5zdGFuY2VcbiAgICovXG4gIGZ1bmN0aW9uIEFjY2Vzc2liaWxpdHkoZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQWNjZXNzaWJpbGl0eSk7XG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBpbnN0YW5jZVxuICAgICAqIEBwcm9wZXJ0eSBkcmFnZ2FibGVcbiAgICAgKiBAdHlwZSB7RHJhZ2dhYmxlfVxuICAgICAqL1xuICAgIHRoaXMuZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuXG4gICAgdGhpcy5fb25Jbml0ID0gdGhpcy5fb25Jbml0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EZXN0cm95ID0gdGhpcy5fb25EZXN0cm95LmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgbGlzdGVuZXJzIHRvIGRyYWdnYWJsZVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEFjY2Vzc2liaWxpdHksIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24oJ2luaXQnLCB0aGlzLl9vbkluaXQpLm9uKCdkZXN0cm95JywgdGhpcy5fb25EZXN0cm95KS5vbignZHJhZzpzdGFydCcsIF9vbkRyYWdTdGFydCkub24oJ2RyYWc6c3RvcCcsIF9vbkRyYWdTdG9wKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBsaXN0ZW5lcnMgZnJvbSBkcmFnZ2FibGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdpbml0JywgdGhpcy5fb25Jbml0KS5vZmYoJ2Rlc3Ryb3knLCB0aGlzLl9vbkRlc3Ryb3kpLm9mZignZHJhZzpzdGFydCcsIF9vbkRyYWdTdGFydCkub2ZmKCdkcmFnOnN0b3AnLCBfb25EcmFnU3RvcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50aWFsaXplIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gcGFyYW0uY29udGFpbmVyc1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfb25Jbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uSW5pdChfcmVmKSB7XG4gICAgICB2YXIgY29udGFpbmVycyA9IF9yZWYuY29udGFpbmVycztcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBjb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoQVJJQV9EUk9QRUZGRUNULCB0aGlzLmRyYWdnYWJsZS5vcHRpb25zLnR5cGUpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5kcmFnZ2FibGUub3B0aW9ucy5kcmFnZ2FibGUpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFRBQklOREVYLCAwKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoQVJJQV9HUkFCQkVELCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSBoYW5kbGVyIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gcGFyYW0uY29udGFpbmVyc1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfb25EZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRGVzdHJveShfcmVmMikge1xuICAgICAgdmFyIGNvbnRhaW5lcnMgPSBfcmVmMi5jb250YWluZXJzO1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBjb250YWluZXJzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lciA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoQVJJQV9EUk9QRUZGRUNUKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNCA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuZHJhZ2dhYmxlKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwNDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IChfc3RlcDQgPSBfaXRlcmF0b3I0Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IF9zdGVwNC52YWx1ZTtcblxuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShUQUJJTkRFWCwgMCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yNCA9IGVycjtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCAmJiBfaXRlcmF0b3I0LnJldHVybikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjQucmV0dXJuKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yMy5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjMucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEFjY2Vzc2liaWxpdHk7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFjY2Vzc2liaWxpdHk7XG5cblxuZnVuY3Rpb24gX29uRHJhZ1N0YXJ0KF9yZWYzKSB7XG4gIHZhciBzb3VyY2UgPSBfcmVmMy5zb3VyY2U7XG5cbiAgc291cmNlLnNldEF0dHJpYnV0ZShBUklBX0dSQUJCRUQsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBfb25EcmFnU3RvcChfcmVmNCkge1xuICB2YXIgc291cmNlID0gX3JlZjQuc291cmNlO1xuXG4gIHNvdXJjZS5zZXRBdHRyaWJ1dGUoQVJJQV9HUkFCQkVELCBmYWxzZSk7XG59XG5cbi8qKiovIH0pLFxuLyogMTM0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfRHJhZ2dhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzNSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnZ2FibGVFdmVudC5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ2dhYmxlRGVzdHJveUV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdnYWJsZUV2ZW50LkRyYWdnYWJsZURlc3Ryb3lFdmVudDtcbiAgfVxufSk7XG5cbi8qKiovIH0pLFxuLyogMTM1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRyYWdnYWJsZURlc3Ryb3lFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIGRyYWdnYWJsZSBldmVudFxuICogQGNsYXNzIERyYWdnYWJsZUV2ZW50XG4gKiBAbW9kdWxlIERyYWdnYWJsZUV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBEcmFnZ2FibGVFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ2dhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnZ2FibGVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdnYWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ2dhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdnYWJsZUV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdnYWJsZScsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBpbnN0YW5jZVxuICAgICAqIEBwcm9wZXJ0eSBkcmFnZ2FibGVcbiAgICAgKiBAdHlwZSB7RHJhZ2dhYmxlfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnZ2FibGU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnZ2FibGVFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIERyYWdnYWJsZSBpbml0aWFsaXplZCBldmVudFxuICogQGNsYXNzIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudFxuICogQGV4dGVuZHMgRHJhZ2dhYmxlRXZlbnRcbiAqL1xuXG5cbkRyYWdnYWJsZUV2ZW50LnR5cGUgPSAnZHJhZ2dhYmxlJztcblxudmFyIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQgPSBleHBvcnRzLkRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdnYWJsZUV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQsIF9EcmFnZ2FibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50O1xufShEcmFnZ2FibGVFdmVudCk7XG5cbi8qKlxuICogRHJhZ2dhYmxlIGRlc3RvcnkgZXZlbnRcbiAqIEBjbGFzcyBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50XG4gKiBAbW9kdWxlIERyYWdnYWJsZURlc3Ryb3lFdmVudFxuICogQGV4dGVuZHMgRHJhZ2dhYmxlRGVzdHJveUV2ZW50XG4gKi9cblxuXG5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50LnR5cGUgPSAnZHJhZ2dhYmxlOmluaXRpYWxpemUnO1xuXG52YXIgRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVEZXN0cm95RXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdnYWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnZ2FibGVEZXN0cm95RXZlbnQsIF9EcmFnZ2FibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZURlc3Ryb3lFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnZ2FibGVEZXN0cm95RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnZ2FibGVEZXN0cm95RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnZ2FibGVEZXN0cm95RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnZ2FibGVEZXN0cm95RXZlbnQ7XG59KERyYWdnYWJsZUV2ZW50KTtcblxuRHJhZ2dhYmxlRGVzdHJveUV2ZW50LnR5cGUgPSAnZHJhZ2dhYmxlOmRlc3Ryb3knO1xuXG4vKioqLyB9KSxcbi8qIDEzNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0RyYWdFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTM3KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnU3RhcnRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnRXZlbnQuRHJhZ1N0YXJ0RXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnTW92ZUV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdFdmVudC5EcmFnTW92ZUV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ091dENvbnRhaW5lckV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdFdmVudC5EcmFnT3V0Q29udGFpbmVyRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnT3V0RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ0V2ZW50LkRyYWdPdXRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdPdmVyQ29udGFpbmVyRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ0V2ZW50LkRyYWdPdmVyQ29udGFpbmVyRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnT3ZlckV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdFdmVudC5EcmFnT3ZlckV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ1N0b3BFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnRXZlbnQuRHJhZ1N0b3BFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdQcmVzc3VyZUV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdFdmVudC5EcmFnUHJlc3N1cmVFdmVudDtcbiAgfVxufSk7XG5cbi8qKiovIH0pLFxuLyogMTM3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRyYWdTdG9wRXZlbnQgPSBleHBvcnRzLkRyYWdQcmVzc3VyZUV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0Q29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdXRFdmVudCA9IGV4cG9ydHMuRHJhZ092ZXJFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0RXZlbnQgPSBleHBvcnRzLkRyYWdFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2UgZHJhZyBldmVudFxuICogQGNsYXNzIERyYWdFdmVudFxuICogQG1vZHVsZSBEcmFnRXZlbnRcbiAqIEBleHRlbmRzIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIERyYWdFdmVudCA9IGV4cG9ydHMuRHJhZ0V2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdFdmVudCwgW3tcbiAgICBrZXk6ICdoYXNNaXJyb3InLFxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgbWlycm9yIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNNaXJyb3IoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLm1pcnJvcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc291cmNlJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBzb3VyY2UgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBzb3VyY2VcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNvdXJjZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIG9yaWdpbmFsIHNvdXJjZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG9yaWdpbmFsU291cmNlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbFNvdXJjZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9yaWdpbmFsU291cmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgbWlycm9yIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgbWlycm9yXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdtaXJyb3InLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5taXJyb3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBzb3VyY2UgY29udGFpbmVyIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgc291cmNlQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzb3VyY2VDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2VDb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Vuc29yIGV2ZW50XG4gICAgICogQHByb3BlcnR5IHNlbnNvckV2ZW50XG4gICAgICogQHR5cGUge1NlbnNvckV2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZW5zb3JFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNlbnNvckV2ZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9yaWdpbmFsIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHNlbnNvciBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBvcmlnaW5hbEV2ZW50XG4gICAgICogQHR5cGUge0V2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbEV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIGlmICh0aGlzLnNlbnNvckV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvckV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ0V2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogRHJhZyBzdGFydCBldmVudFxuICogQGNsYXNzIERyYWdTdGFydEV2ZW50XG4gKiBAbW9kdWxlIERyYWdTdGFydEV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdFdmVudC50eXBlID0gJ2RyYWcnO1xuXG52YXIgRHJhZ1N0YXJ0RXZlbnQgPSBleHBvcnRzLkRyYWdTdGFydEV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1N0YXJ0RXZlbnQsIF9EcmFnRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdTdGFydEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdTdGFydEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1N0YXJ0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU3RhcnRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdTdGFydEV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgbW92ZSBldmVudFxuICogQGNsYXNzIERyYWdNb3ZlRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ01vdmVFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnU3RhcnRFdmVudC50eXBlID0gJ2RyYWc6c3RhcnQnO1xuRHJhZ1N0YXJ0RXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBEcmFnTW92ZUV2ZW50ID0gZXhwb3J0cy5EcmFnTW92ZUV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdNb3ZlRXZlbnQsIF9EcmFnRXZlbnQyKTtcblxuICBmdW5jdGlvbiBEcmFnTW92ZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdNb3ZlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnTW92ZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ01vdmVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdNb3ZlRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbi8qKlxuICogRHJhZyBvdmVyIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ092ZXJFdmVudFxuICogQG1vZHVsZSBEcmFnT3ZlckV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdNb3ZlRXZlbnQudHlwZSA9ICdkcmFnOm1vdmUnO1xuXG52YXIgRHJhZ092ZXJFdmVudCA9IGV4cG9ydHMuRHJhZ092ZXJFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnT3ZlckV2ZW50LCBfRHJhZ0V2ZW50Myk7XG5cbiAgZnVuY3Rpb24gRHJhZ092ZXJFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnT3ZlckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ092ZXJFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdPdmVyRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdPdmVyRXZlbnQsIFt7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBjb250YWluZXIgeW91IGFyZSBvdmVyXG4gICAgICogQHByb3BlcnR5IG92ZXJDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXJDb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGVsZW1lbnQgeW91IGFyZSBvdmVyXG4gICAgICogQHByb3BlcnR5IG92ZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ292ZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ092ZXJFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIG91dCBldmVudFxuICogQGNsYXNzIERyYWdPdXRFdmVudFxuICogQG1vZHVsZSBEcmFnT3V0RXZlbnRcbiAqIEBleHRlbmRzIERyYWdFdmVudFxuICovXG5cblxuRHJhZ092ZXJFdmVudC50eXBlID0gJ2RyYWc6b3Zlcic7XG5EcmFnT3ZlckV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgRHJhZ091dEV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0RXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ091dEV2ZW50LCBfRHJhZ0V2ZW50NCk7XG5cbiAgZnVuY3Rpb24gRHJhZ091dEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdXRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdPdXRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ091dEV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyIHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBlbGVtZW50IHlvdSBsZWZ0XG4gICAgICogQHByb3BlcnR5IG92ZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ292ZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ091dEV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgb3ZlciBjb250YWluZXIgZXZlbnRcbiAqIEBjbGFzcyBEcmFnT3ZlckNvbnRhaW5lckV2ZW50XG4gKiBAbW9kdWxlIERyYWdPdmVyQ29udGFpbmVyRXZlbnRcbiAqIEBleHRlbmRzIERyYWdFdmVudFxuICovXG5cblxuRHJhZ091dEV2ZW50LnR5cGUgPSAnZHJhZzpvdXQnO1xuXG52YXIgRHJhZ092ZXJDb250YWluZXJFdmVudCA9IGV4cG9ydHMuRHJhZ092ZXJDb250YWluZXJFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50NSkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnT3ZlckNvbnRhaW5lckV2ZW50LCBfRHJhZ0V2ZW50NSk7XG5cbiAgZnVuY3Rpb24gRHJhZ092ZXJDb250YWluZXJFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnT3ZlckNvbnRhaW5lckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ092ZXJDb250YWluZXJFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdPdmVyQ29udGFpbmVyRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdPdmVyQ29udGFpbmVyRXZlbnQsIFt7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBjb250YWluZXIgeW91IGFyZSBvdmVyXG4gICAgICogQHByb3BlcnR5IG92ZXJDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXJDb250YWluZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnT3ZlckNvbnRhaW5lckV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgb3V0IGNvbnRhaW5lciBldmVudFxuICogQGNsYXNzIERyYWdPdXRDb250YWluZXJFdmVudFxuICogQG1vZHVsZSBEcmFnT3V0Q29udGFpbmVyRXZlbnRcbiAqIEBleHRlbmRzIERyYWdFdmVudFxuICovXG5cblxuRHJhZ092ZXJDb250YWluZXJFdmVudC50eXBlID0gJ2RyYWc6b3Zlcjpjb250YWluZXInO1xuXG52YXIgRHJhZ091dENvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0Q29udGFpbmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDYpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ091dENvbnRhaW5lckV2ZW50LCBfRHJhZ0V2ZW50Nik7XG5cbiAgZnVuY3Rpb24gRHJhZ091dENvbnRhaW5lckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdXRDb250YWluZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdXRDb250YWluZXJFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdPdXRDb250YWluZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ091dENvbnRhaW5lckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyIHlvdSBsZWZ0XG4gICAgICogQHByb3BlcnR5IG92ZXJDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXJDb250YWluZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnT3V0Q29udGFpbmVyRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbi8qKlxuICogRHJhZyBwcmVzc3VyZSBldmVudFxuICogQGNsYXNzIERyYWdQcmVzc3VyZUV2ZW50XG4gKiBAbW9kdWxlIERyYWdQcmVzc3VyZUV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdPdXRDb250YWluZXJFdmVudC50eXBlID0gJ2RyYWc6b3V0OmNvbnRhaW5lcic7XG5cbnZhciBEcmFnUHJlc3N1cmVFdmVudCA9IGV4cG9ydHMuRHJhZ1ByZXNzdXJlRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDcpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1ByZXNzdXJlRXZlbnQsIF9EcmFnRXZlbnQ3KTtcblxuICBmdW5jdGlvbiBEcmFnUHJlc3N1cmVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnUHJlc3N1cmVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdQcmVzc3VyZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1ByZXNzdXJlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdQcmVzc3VyZUV2ZW50LCBbe1xuICAgIGtleTogJ3ByZXNzdXJlJyxcblxuXG4gICAgLyoqXG4gICAgICogUHJlc3N1cmUgYXBwbGllZCBvbiBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBwcmVzc3VyZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnByZXNzdXJlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ1ByZXNzdXJlRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbi8qKlxuICogRHJhZyBzdG9wIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ1N0b3BFdmVudFxuICogQG1vZHVsZSBEcmFnU3RvcEV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdQcmVzc3VyZUV2ZW50LnR5cGUgPSAnZHJhZzpwcmVzc3VyZSc7XG5cbnZhciBEcmFnU3RvcEV2ZW50ID0gZXhwb3J0cy5EcmFnU3RvcEV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ4KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTdG9wRXZlbnQsIF9EcmFnRXZlbnQ4KTtcblxuICBmdW5jdGlvbiBEcmFnU3RvcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdTdG9wRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU3RvcEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0b3BFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdTdG9wRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbkRyYWdTdG9wRXZlbnQudHlwZSA9ICdkcmFnOnN0b3AnO1xuXG4vKioqLyB9KSxcbi8qIDEzOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX01pcnJvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzkpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ01pcnJvckNyZWF0ZWRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9NaXJyb3JFdmVudC5NaXJyb3JDcmVhdGVkRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdNaXJyb3JBdHRhY2hlZEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX01pcnJvckV2ZW50Lk1pcnJvckF0dGFjaGVkRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdNaXJyb3JNb3ZlRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfTWlycm9yRXZlbnQuTWlycm9yTW92ZUV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTWlycm9yRGVzdHJveUV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX01pcnJvckV2ZW50Lk1pcnJvckRlc3Ryb3lFdmVudDtcbiAgfVxufSk7XG5cbi8qKiovIH0pLFxuLyogMTM5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk1pcnJvckRlc3Ryb3lFdmVudCA9IGV4cG9ydHMuTWlycm9yTW92ZUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JBdHRhY2hlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JDcmVhdGVkRXZlbnQgPSBleHBvcnRzLk1pcnJvckV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBtaXJyb3IgZXZlbnRcbiAqIEBjbGFzcyBNaXJyb3JFdmVudFxuICogQG1vZHVsZSBNaXJyb3JFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgTWlycm9yRXZlbnQgPSBleHBvcnRzLk1pcnJvckV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShNaXJyb3JFdmVudCwgW3tcbiAgICBrZXk6ICdoYXNNaXJyb3InLFxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgbWlycm9yIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNNaXJyb3IoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLm1pcnJvcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc291cmNlJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBzb3VyY2UgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBzb3VyY2VcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNvdXJjZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIG9yaWdpbmFsIHNvdXJjZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG9yaWdpbmFsU291cmNlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbFNvdXJjZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9yaWdpbmFsU291cmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgbWlycm9yIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgbWlycm9yXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdtaXJyb3InLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5taXJyb3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBzb3VyY2UgY29udGFpbmVyIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgc291cmNlQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzb3VyY2VDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2VDb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Vuc29yIGV2ZW50XG4gICAgICogQHByb3BlcnR5IHNlbnNvckV2ZW50XG4gICAgICogQHR5cGUge1NlbnNvckV2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZW5zb3JFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNlbnNvckV2ZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9yaWdpbmFsIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHNlbnNvciBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBvcmlnaW5hbEV2ZW50XG4gICAgICogQHR5cGUge0V2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbEV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIGlmICh0aGlzLnNlbnNvckV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnNvckV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWlycm9yRXZlbnQ7XG59KF9BYnN0cmFjdEV2ZW50My5kZWZhdWx0KTtcblxuLyoqXG4gKiBNaXJyb3IgY3JlYXRlZCBldmVudFxuICogQGNsYXNzIE1pcnJvckNyZWF0ZWRFdmVudFxuICogQG1vZHVsZSBNaXJyb3JDcmVhdGVkRXZlbnRcbiAqIEBleHRlbmRzIE1pcnJvckV2ZW50XG4gKi9cblxuXG52YXIgTWlycm9yQ3JlYXRlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JDcmVhdGVkRXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckNyZWF0ZWRFdmVudCwgX01pcnJvckV2ZW50KTtcblxuICBmdW5jdGlvbiBNaXJyb3JDcmVhdGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yQ3JlYXRlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yQ3JlYXRlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWlycm9yQ3JlYXRlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gTWlycm9yQ3JlYXRlZEV2ZW50O1xufShNaXJyb3JFdmVudCk7XG5cbi8qKlxuICogTWlycm9yIGF0dGFjaGVkIGV2ZW50XG4gKiBAY2xhc3MgTWlycm9yQXR0YWNoZWRFdmVudFxuICogQG1vZHVsZSBNaXJyb3JBdHRhY2hlZEV2ZW50XG4gKiBAZXh0ZW5kcyBNaXJyb3JFdmVudFxuICovXG5cblxuTWlycm9yQ3JlYXRlZEV2ZW50LnR5cGUgPSAnbWlycm9yOmNyZWF0ZWQnO1xuXG52YXIgTWlycm9yQXR0YWNoZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yQXR0YWNoZWRFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckF0dGFjaGVkRXZlbnQsIF9NaXJyb3JFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckF0dGFjaGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yQXR0YWNoZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvckF0dGFjaGVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JBdHRhY2hlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gTWlycm9yQXR0YWNoZWRFdmVudDtcbn0oTWlycm9yRXZlbnQpO1xuXG4vKipcbiAqIE1pcnJvciBtb3ZlIGV2ZW50XG4gKiBAY2xhc3MgTWlycm9yTW92ZUV2ZW50XG4gKiBAbW9kdWxlIE1pcnJvck1vdmVFdmVudFxuICogQGV4dGVuZHMgTWlycm9yRXZlbnRcbiAqL1xuXG5cbk1pcnJvckF0dGFjaGVkRXZlbnQudHlwZSA9ICdtaXJyb3I6YXR0YWNoZWQnO1xuXG52YXIgTWlycm9yTW92ZUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JNb3ZlRXZlbnQsIF9NaXJyb3JFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvck1vdmVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JNb3ZlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JNb3ZlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JNb3ZlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JNb3ZlRXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuLyoqXG4gKiBNaXJyb3IgZGVzdHJveSBldmVudFxuICogQGNsYXNzIE1pcnJvckRlc3Ryb3lFdmVudFxuICogQG1vZHVsZSBNaXJyb3JEZXN0cm95RXZlbnRcbiAqIEBleHRlbmRzIE1pcnJvckV2ZW50XG4gKi9cblxuXG5NaXJyb3JNb3ZlRXZlbnQudHlwZSA9ICdtaXJyb3I6bW92ZSc7XG5NaXJyb3JNb3ZlRXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBNaXJyb3JEZXN0cm95RXZlbnQgPSBleHBvcnRzLk1pcnJvckRlc3Ryb3lFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvckRlc3Ryb3lFdmVudCwgX01pcnJvckV2ZW50NCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yRGVzdHJveUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckRlc3Ryb3lFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvckRlc3Ryb3lFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckRlc3Ryb3lFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIE1pcnJvckRlc3Ryb3lFdmVudDtcbn0oTWlycm9yRXZlbnQpO1xuXG5NaXJyb3JEZXN0cm95RXZlbnQudHlwZSA9ICdtaXJyb3I6ZGVzdHJveSc7XG5NaXJyb3JEZXN0cm95RXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbi8qKiovIH0pLFxuLyogMTQwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfRHJvcHBhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNDEpO1xuXG52YXIgX0Ryb3BwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ecm9wcGFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfRHJvcHBhYmxlMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDE0MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MiA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvQ29uc3VtYWJsZUFycmF5Mik7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfZ2V0MiA9IF9fd2VicGFja19yZXF1aXJlX18oNDIpO1xuXG52YXIgX2dldDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXQyKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxudmFyIF9EcmFnZ2FibGUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cbnZhciBfRHJhZ2dhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdnYWJsZTIpO1xuXG52YXIgX0Ryb3BwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNDgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb25EcmFnU3RhcnQgPSBTeW1ib2woJ29uRHJhZ1N0YXJ0Jyk7XG52YXIgb25EcmFnTW92ZSA9IFN5bWJvbCgnb25EcmFnTW92ZScpO1xudmFyIG9uRHJhZ1N0b3AgPSBTeW1ib2woJ29uRHJhZ1N0b3AnKTtcbnZhciBkcm9wID0gU3ltYm9sKCdkcm9wJyk7XG52YXIgcmVsZWFzZSA9IFN5bWJvbCgncmVsZWFzZScpO1xudmFyIGNsb3Nlc3REcm9wcGFibGUgPSBTeW1ib2woJ2Nsb3Nlc3REcm9wcGFibGUnKTtcbnZhciBnZXREcm9wcGFibGVzID0gU3ltYm9sKCdnZXREcm9wcGFibGVzJyk7XG5cbnZhciBjbGFzc2VzID0ge1xuICAnZHJvcHBhYmxlOmFjdGl2ZSc6ICdkcmFnZ2FibGUtZHJvcHBhYmxlLS1hY3RpdmUnLFxuICAnZHJvcHBhYmxlOm9jY3VwaWVkJzogJ2RyYWdnYWJsZS1kcm9wcGFibGUtLW9jY3VwaWVkJ1xufTtcblxudmFyIGRlZmF1bHRzID0ge1xuICBkcm9wcGFibGU6ICcuZHJhZ2dhYmxlLWRyb3BwYWJsZSdcbn07XG5cbi8qKlxuICogRHJvcHBhYmxlIGlzIGJ1aWx0IG9uIHRvcCBvZiBEcmFnZ2FibGUgYW5kIGFsbG93cyBkcm9wcGluZyBkcmFnZ2FibGUgZWxlbWVudHNcbiAqIGludG8gZHJvcHBhYmxlIGVsZW1lbnRcbiAqIEBjbGFzcyBEcm9wcGFibGVcbiAqIEBtb2R1bGUgRHJvcHBhYmxlXG4gKiBAZXh0ZW5kcyBEcmFnZ2FibGVcbiAqL1xuXG52YXIgRHJvcHBhYmxlID0gZnVuY3Rpb24gKF9EcmFnZ2FibGUpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJvcHBhYmxlLCBfRHJhZ2dhYmxlKTtcblxuICAvKipcbiAgICogRHJvcHBhYmxlIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBEcm9wcGFibGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gRHJvcHBhYmxlIGNvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBEcm9wcGFibGVcbiAgICovXG4gIGZ1bmN0aW9uIERyb3BwYWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyb3BwYWJsZSk7XG5cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcm9wcGFibGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wcGFibGUpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgX3RoaXMub3B0aW9ucyk7XG5cbiAgICAvKipcbiAgICAgKiBBbGwgZHJvcHBhYmxlIGVsZW1lbnRzIG9uIGRyYWcgc3RhcnRcbiAgICAgKiBAcHJvcGVydHkgZHJvcHBhYmxlc1xuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIF90aGlzLmRyb3BwYWJsZXMgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogTGFzdCBkcm9wcGFibGUgZWxlbWVudCB0aGF0IHRoZSBzb3VyY2Ugd2FzIGRyb3BwZWQgaW50b1xuICAgICAqIEBwcm9wZXJ0eSBsYXN0RHJvcHBhYmxlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIF90aGlzLmxhc3REcm9wcGFibGUgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbCBkcm9wcGFibGUgZWxlbWVudCB0aGF0IHRoZSBzb3VyY2Ugd2FzIGRyYWcgZnJvbVxuICAgICAqIEBwcm9wZXJ0eSBpbml0aWFsRHJvcHBhYmxlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIF90aGlzLmluaXRpYWxEcm9wcGFibGUgPSBudWxsO1xuXG4gICAgX3RoaXNbb25EcmFnU3RhcnRdID0gX3RoaXNbb25EcmFnU3RhcnRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ01vdmVdID0gX3RoaXNbb25EcmFnTW92ZV0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnU3RvcF0gPSBfdGhpc1tvbkRyYWdTdG9wXS5iaW5kKF90aGlzKTtcblxuICAgIF90aGlzLm9uKCdkcmFnOnN0YXJ0JywgX3RoaXNbb25EcmFnU3RhcnRdKS5vbignZHJhZzptb3ZlJywgX3RoaXNbb25EcmFnTW92ZV0pLm9uKCdkcmFnOnN0b3AnLCBfdGhpc1tvbkRyYWdTdG9wXSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIERyb3BwYWJsZSBpbnN0YW5jZS5cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcm9wcGFibGUsIFt7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAoMCwgX2dldDMuZGVmYXVsdCkoRHJvcHBhYmxlLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZS5wcm90b3R5cGUpLCAnZGVzdHJveScsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgIHRoaXMub2ZmKCdkcmFnOnN0YXJ0JywgdGhpc1tvbkRyYWdTdGFydF0pLm9mZignZHJhZzptb3ZlJywgdGhpc1tvbkRyYWdNb3ZlXSkub2ZmKCdkcmFnOnN0b3AnLCB0aGlzW29uRHJhZ1N0b3BdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNsYXNzIG5hbWUgZm9yIGNsYXNzIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5hbWUgb2YgY2xhc3MgaWRlbnRpZmllclxuICAgICAqIEByZXR1cm4ge1N0cmluZ3xudWxsfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDbGFzc05hbWVGb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbGFzc05hbWVGb3IobmFtZSkge1xuICAgICAgcmV0dXJuICgwLCBfZ2V0My5kZWZhdWx0KShEcm9wcGFibGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJvcHBhYmxlLnByb3RvdHlwZSksICdnZXRDbGFzc05hbWVGb3InLCB0aGlzKS5jYWxsKHRoaXMsIG5hbWUpIHx8IGNsYXNzZXNbbmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdGFydCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdTdGFydEV2ZW50fSBldmVudCAtIERyYWcgc3RhcnQgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdGFydCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcm9wcGFibGVzID0gW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXNbZ2V0RHJvcHBhYmxlc10oKSkpO1xuICAgICAgdmFyIGRyb3BwYWJsZSA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoZXZlbnQuc2Vuc29yRXZlbnQudGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJvcHBhYmxlKTtcblxuICAgICAgaWYgKCFkcm9wcGFibGUpIHtcbiAgICAgICAgZXZlbnQuY2FuY2VsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbml0aWFsRHJvcHBhYmxlID0gZHJvcHBhYmxlO1xuXG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5kcm9wcGFibGVzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBkcm9wcGFibGVFbGVtZW50ID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6YWN0aXZlJykpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIG1vdmUgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnTW92ZUV2ZW50fSBldmVudCAtIERyYWcgbW92ZSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ01vdmUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBkcm9wcGFibGUgPSB0aGlzW2Nsb3Nlc3REcm9wcGFibGVdKGV2ZW50LnNlbnNvckV2ZW50LnRhcmdldCk7XG4gICAgICB2YXIgb3ZlckVtcHR5RHJvcHBhYmxlID0gZHJvcHBhYmxlICYmICFkcm9wcGFibGUuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6b2NjdXBpZWQnKSk7XG5cbiAgICAgIGlmIChvdmVyRW1wdHlEcm9wcGFibGUgJiYgdGhpc1tkcm9wXShldmVudCwgZHJvcHBhYmxlKSkge1xuICAgICAgICB0aGlzLmxhc3REcm9wcGFibGUgPSBkcm9wcGFibGU7XG4gICAgICB9IGVsc2UgaWYgKCghZHJvcHBhYmxlIHx8IGRyb3BwYWJsZSA9PT0gdGhpcy5pbml0aWFsRHJvcHBhYmxlKSAmJiB0aGlzLmxhc3REcm9wcGFibGUpIHtcbiAgICAgICAgdGhpc1tyZWxlYXNlXShldmVudCk7XG4gICAgICAgIHRoaXMubGFzdERyb3BwYWJsZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdG9wIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ1N0b3BFdmVudH0gZXZlbnQgLSBEcmFnIHN0b3AgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdG9wLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICAgIHZhciBvY2N1cGllZENsYXNzID0gdGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpO1xuXG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMuZHJvcHBhYmxlc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBkcm9wcGFibGUgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICBkcm9wcGFibGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOmFjdGl2ZScpKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5sYXN0RHJvcHBhYmxlICYmIHRoaXMubGFzdERyb3BwYWJsZSAhPT0gdGhpcy5pbml0aWFsRHJvcHBhYmxlKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbERyb3BwYWJsZS5jbGFzc0xpc3QucmVtb3ZlKG9jY3VwaWVkQ2xhc3MpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyb3BwYWJsZXMgPSBudWxsO1xuICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlID0gbnVsbDtcbiAgICAgIHRoaXMuaW5pdGlhbERyb3BwYWJsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJvcCBtZXRob2QgZHJvcHMgYSBkcmFnZ2FibGUgZWxlbWVudCBpbnRvIGEgZHJvcHBhYmxlIGVsZW1lbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ01vdmVFdmVudH0gZXZlbnQgLSBEcmFnIG1vdmUgZXZlbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkcm9wcGFibGUgLSBEcm9wcGFibGUgZWxlbWVudCB0byBkcm9wIGRyYWdnYWJsZSBpbnRvXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogZHJvcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQsIGRyb3BwYWJsZSkge1xuICAgICAgdmFyIGRyb3BwYWJsZU92ZXJFdmVudCA9IG5ldyBfRHJvcHBhYmxlRXZlbnQuRHJvcHBhYmxlT3ZlckV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgZHJvcHBhYmxlOiBkcm9wcGFibGVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoZHJvcHBhYmxlT3ZlckV2ZW50KTtcblxuICAgICAgaWYgKGRyb3BwYWJsZU92ZXJFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9jY3VwaWVkQ2xhc3MgPSB0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJyk7XG5cbiAgICAgIGlmICh0aGlzLmxhc3REcm9wcGFibGUpIHtcbiAgICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUob2NjdXBpZWRDbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIGRyb3BwYWJsZS5hcHBlbmRDaGlsZChldmVudC5zb3VyY2UpO1xuICAgICAgZHJvcHBhYmxlLmNsYXNzTGlzdC5hZGQob2NjdXBpZWRDbGFzcyk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbGVhc2UgbWV0aG9kIG1vdmVzIHRoZSBwcmV2aW91c2x5IGRyb3BwZWQgZWxlbWVudCBiYWNrIGludG8gaXRzIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdNb3ZlRXZlbnR9IGV2ZW50IC0gRHJhZyBtb3ZlIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogcmVsZWFzZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBkcm9wcGFibGVPdXRFdmVudCA9IG5ldyBfRHJvcHBhYmxlRXZlbnQuRHJvcHBhYmxlT3V0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBkcm9wcGFibGU6IHRoaXMubGFzdERyb3BwYWJsZVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihkcm9wcGFibGVPdXRFdmVudCk7XG5cbiAgICAgIGlmIChkcm9wcGFibGVPdXRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbml0aWFsRHJvcHBhYmxlLmFwcGVuZENoaWxkKGV2ZW50LnNvdXJjZSk7XG4gICAgICB0aGlzLmxhc3REcm9wcGFibGUuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY2xvc2VzdCBkcm9wcGFibGUgZWxlbWVudCBmb3IgZXZlbiB0YXJnZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldCAtIEV2ZW50IHRhcmdldFxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fG51bGx9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogY2xvc2VzdERyb3BwYWJsZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUodGFyZ2V0KSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgaWYgKCF0aGlzLmRyb3BwYWJsZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5kcm9wcGFibGVzLmluY2x1ZGVzKGVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgY3VycmVudCBkcm9wcGFibGUgZWxlbWVudHMgZm9yIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcmV0dXJuIHtOb2RlTGlzdHxIVE1MRWxlbWVudFtdfEFycmF5fVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IGdldERyb3BwYWJsZXMsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgdmFyIGRyb3BwYWJsZXMgPSB0aGlzLm9wdGlvbnMuZHJvcHBhYmxlO1xuXG4gICAgICBpZiAodHlwZW9mIGRyb3BwYWJsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRyb3BwYWJsZXMpO1xuICAgICAgfSBlbHNlIGlmIChkcm9wcGFibGVzIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZHJvcHBhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBkcm9wcGFibGVzO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZHJvcHBhYmxlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZHJvcHBhYmxlcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJvcHBhYmxlO1xufShfRHJhZ2dhYmxlMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRHJvcHBhYmxlO1xuXG4vKioqLyB9KSxcbi8qIDE0MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oMTQzKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDE0MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDE0NCk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNCkuT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG4vKioqLyB9KSxcbi8qIDE0NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuICAsICRnZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDU2KSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG4vKioqLyB9KSxcbi8qIDE0NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oMTQ2KSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDE0NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDE0Nyk7XG52YXIgJE9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oNCkuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIHJldHVybiAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMTQ3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbnZhciB0b0lPYmplY3QgICAgICAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKS5mO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDU2KSgnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7XG5cbi8qKiovIH0pLFxuLyogMTQ4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfRHJvcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0OSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJvcHBhYmxlT3ZlckV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0Ryb3BwYWJsZUV2ZW50LkRyb3BwYWJsZU92ZXJFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0Ryb3BwYWJsZU91dEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0Ryb3BwYWJsZUV2ZW50LkRyb3BwYWJsZU91dEV2ZW50O1xuICB9XG59KTtcblxuLyoqKi8gfSksXG4vKiAxNDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHJvcHBhYmxlT3V0RXZlbnQgPSBleHBvcnRzLkRyb3BwYWJsZU92ZXJFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIGRyb3BwYWJsZSBldmVudFxuICogQGNsYXNzIERyb3BwYWJsZUV2ZW50XG4gKiBAbW9kdWxlIERyb3BwYWJsZUV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBEcm9wcGFibGVFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJvcHBhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBEcm9wcGFibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcm9wcGFibGVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyb3BwYWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJvcHBhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyb3BwYWJsZUV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdFdmVudCcsXG5cblxuICAgIC8qKlxuICAgICAqIE9yaWdpbmFsIGRyYWcgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhpcyBkcm9wcGFibGUgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgZHJhZ0V2ZW50XG4gICAgICogQHR5cGUge0RyYWdFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJvcHBhYmxlRXZlbnQ7XG59KF9BYnN0cmFjdEV2ZW50My5kZWZhdWx0KTtcblxuLyoqXG4gKiBEcm9wcGFibGUgb3ZlciBldmVudFxuICogQGNsYXNzIERyb3BwYWJsZU92ZXJFdmVudFxuICogQG1vZHVsZSBEcm9wcGFibGVPdmVyRXZlbnRcbiAqIEBleHRlbmRzIERyb3BwYWJsZUV2ZW50XG4gKi9cblxuXG5Ecm9wcGFibGVFdmVudC50eXBlID0gJ2Ryb3BwYWJsZSc7XG5cbnZhciBEcm9wcGFibGVPdmVyRXZlbnQgPSBleHBvcnRzLkRyb3BwYWJsZU92ZXJFdmVudCA9IGZ1bmN0aW9uIChfRHJvcHBhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJvcHBhYmxlT3ZlckV2ZW50LCBfRHJvcHBhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyb3BwYWJsZU92ZXJFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcm9wcGFibGVPdmVyRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcm9wcGFibGVPdmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wcGFibGVPdmVyRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyb3BwYWJsZU92ZXJFdmVudCwgW3tcbiAgICBrZXk6ICdkcm9wcGFibGUnLFxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJvcHBhYmxlIGVsZW1lbnQgeW91IGFyZSBvdmVyXG4gICAgICogQHByb3BlcnR5IGRyb3BwYWJsZVxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJvcHBhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJvcHBhYmxlT3ZlckV2ZW50O1xufShEcm9wcGFibGVFdmVudCk7XG5cbi8qKlxuICogRHJvcHBhYmxlIG91dCBldmVudFxuICogQGNsYXNzIERyb3BwYWJsZU91dEV2ZW50XG4gKiBAbW9kdWxlIERyb3BwYWJsZU91dEV2ZW50XG4gKiBAZXh0ZW5kcyBEcm9wcGFibGVFdmVudFxuICovXG5cblxuRHJvcHBhYmxlT3ZlckV2ZW50LnR5cGUgPSAnZHJvcHBhYmxlOm92ZXInO1xuRHJvcHBhYmxlT3ZlckV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgRHJvcHBhYmxlT3V0RXZlbnQgPSBleHBvcnRzLkRyb3BwYWJsZU91dEV2ZW50ID0gZnVuY3Rpb24gKF9Ecm9wcGFibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJvcHBhYmxlT3V0RXZlbnQsIF9Ecm9wcGFibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyb3BwYWJsZU91dEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyb3BwYWJsZU91dEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJvcHBhYmxlT3V0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wcGFibGVPdXRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJvcHBhYmxlT3V0RXZlbnQsIFt7XG4gICAga2V5OiAnZHJvcHBhYmxlJyxcblxuXG4gICAgLyoqXG4gICAgICogVGhlIGRyb3BwYWJsZSBlbGVtZW50IHlvdSBfd2VyZV8gb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBkcm9wcGFibGVcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyb3BwYWJsZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyb3BwYWJsZU91dEV2ZW50O1xufShEcm9wcGFibGVFdmVudCk7XG5cbkRyb3BwYWJsZU91dEV2ZW50LnR5cGUgPSAnZHJvcHBhYmxlOm91dCc7XG5Ecm9wcGFibGVPdXRFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxuLyoqKi8gfSksXG4vKiAxNTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Td2FwcGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1MSk7XG5cbnZhciBfU3dhcHBhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N3YXBwYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Td2FwcGFibGUyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTUxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfZ2V0MiA9IF9fd2VicGFja19yZXF1aXJlX18oNDIpO1xuXG52YXIgX2dldDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXQyKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfRHJhZ2dhYmxlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG52YXIgX0RyYWdnYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EcmFnZ2FibGUyKTtcblxudmFyIF9Td2FwcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTUyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uRHJhZ1N0YXJ0ID0gU3ltYm9sKCdvbkRyYWdTdGFydCcpO1xudmFyIG9uRHJhZ092ZXIgPSBTeW1ib2woJ29uRHJhZ092ZXInKTtcbnZhciBvbkRyYWdTdG9wID0gU3ltYm9sKCdvbkRyYWdTdG9wJyk7XG5cbi8qKlxuICogU3dhcHBhYmxlIGlzIGJ1aWx0IG9uIHRvcCBvZiBEcmFnZ2FibGUgYW5kIGFsbG93cyBzd2FwcGluZyBvZiBkcmFnZ2FibGUgZWxlbWVudHMuXG4gKiBPcmRlciBpcyBpcnJlbGV2YW50IHRvIFN3YXBwYWJsZS5cbiAqIEBjbGFzcyBTd2FwcGFibGVcbiAqIEBtb2R1bGUgU3dhcHBhYmxlXG4gKiBAZXh0ZW5kcyBEcmFnZ2FibGVcbiAqL1xuXG52YXIgU3dhcHBhYmxlID0gZnVuY3Rpb24gKF9EcmFnZ2FibGUpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlLCBfRHJhZ2dhYmxlKTtcblxuICAvKipcbiAgICogU3dhcHBhYmxlIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBTd2FwcGFibGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gU3dhcHBhYmxlIGNvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBTd2FwcGFibGVcbiAgICovXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZSk7XG5cbiAgICAvKipcbiAgICAgKiBMYXN0IGRyYWdnYWJsZSBlbGVtZW50IHRoYXQgd2FzIGRyYWdnZWQgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBsYXN0T3ZlclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGUpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLmxhc3RPdmVyID0gbnVsbDtcblxuICAgIF90aGlzW29uRHJhZ1N0YXJ0XSA9IF90aGlzW29uRHJhZ1N0YXJ0XS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdPdmVyXSA9IF90aGlzW29uRHJhZ092ZXJdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ1N0b3BdID0gX3RoaXNbb25EcmFnU3RvcF0uYmluZChfdGhpcyk7XG5cbiAgICBfdGhpcy5vbignZHJhZzpzdGFydCcsIF90aGlzW29uRHJhZ1N0YXJ0XSkub24oJ2RyYWc6b3ZlcicsIF90aGlzW29uRHJhZ092ZXJdKS5vbignZHJhZzpzdG9wJywgX3RoaXNbb25EcmFnU3RvcF0pO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBTd2FwcGFibGUgaW5zdGFuY2UuXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3dhcHBhYmxlLCBbe1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgKDAsIF9nZXQzLmRlZmF1bHQpKFN3YXBwYWJsZS5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGUucHJvdG90eXBlKSwgJ2Rlc3Ryb3knLCB0aGlzKS5jYWxsKHRoaXMpO1xuXG4gICAgICB0aGlzLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdGFydCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdTdGFydEV2ZW50fSBldmVudCAtIERyYWcgc3RhcnQgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdGFydCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBzd2FwcGFibGVTdGFydEV2ZW50ID0gbmV3IF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTdGFydEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzd2FwcGFibGVTdGFydEV2ZW50KTtcblxuICAgICAgaWYgKHN3YXBwYWJsZVN0YXJ0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIG92ZXIgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnT3ZlckV2ZW50fSBldmVudCAtIERyYWcgb3ZlciBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ092ZXIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQub3ZlciA9PT0gZXZlbnQub3JpZ2luYWxTb3VyY2UgfHwgZXZlbnQub3ZlciA9PT0gZXZlbnQuc291cmNlIHx8IGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3dhcHBhYmxlU3dhcEV2ZW50ID0gbmV3IF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTd2FwRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBvdmVyOiBldmVudC5vdmVyLFxuICAgICAgICBvdmVyQ29udGFpbmVyOiBldmVudC5vdmVyQ29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHN3YXBwYWJsZVN3YXBFdmVudCk7XG5cbiAgICAgIGlmIChzd2FwcGFibGVTd2FwRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHN3YXAgb3JpZ2luYWxseSBzd2FwcGVkIGVsZW1lbnQgYmFja1xuICAgICAgaWYgKHRoaXMubGFzdE92ZXIgJiYgdGhpcy5sYXN0T3ZlciAhPT0gZXZlbnQub3Zlcikge1xuICAgICAgICBzd2FwKHRoaXMubGFzdE92ZXIsIGV2ZW50LnNvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxhc3RPdmVyID09PSBldmVudC5vdmVyKSB7XG4gICAgICAgIHRoaXMubGFzdE92ZXIgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sYXN0T3ZlciA9IGV2ZW50Lm92ZXI7XG4gICAgICB9XG5cbiAgICAgIHN3YXAoZXZlbnQuc291cmNlLCBldmVudC5vdmVyKTtcblxuICAgICAgdmFyIHN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IG5ldyBfU3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3dhcHBlZEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgc3dhcHBlZEVsZW1lbnQ6IGV2ZW50Lm92ZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc3dhcHBhYmxlU3dhcHBlZEV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0b3AgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnU3RvcEV2ZW50fSBldmVudCAtIERyYWcgc3RvcCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0b3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgc3dhcHBhYmxlU3RvcEV2ZW50ID0gbmV3IF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTdG9wRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHN3YXBwYWJsZVN0b3BFdmVudCk7XG4gICAgICB0aGlzLmxhc3RPdmVyID0gbnVsbDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZTtcbn0oX0RyYWdnYWJsZTMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN3YXBwYWJsZTtcblxuXG5mdW5jdGlvbiB3aXRoVGVtcEVsZW1lbnQoY2FsbGJhY2spIHtcbiAgdmFyIHRtcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2FsbGJhY2sodG1wRWxlbWVudCk7XG4gIHRtcEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0bXBFbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gc3dhcChzb3VyY2UsIG92ZXIpIHtcbiAgdmFyIG92ZXJQYXJlbnQgPSBvdmVyLnBhcmVudE5vZGU7XG4gIHZhciBzb3VyY2VQYXJlbnQgPSBzb3VyY2UucGFyZW50Tm9kZTtcblxuICB3aXRoVGVtcEVsZW1lbnQoZnVuY3Rpb24gKHRtcEVsZW1lbnQpIHtcbiAgICBzb3VyY2VQYXJlbnQuaW5zZXJ0QmVmb3JlKHRtcEVsZW1lbnQsIHNvdXJjZSk7XG4gICAgb3ZlclBhcmVudC5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyKTtcbiAgICBzb3VyY2VQYXJlbnQuaW5zZXJ0QmVmb3JlKG92ZXIsIHRtcEVsZW1lbnQpO1xuICB9KTtcbn1cblxuLyoqKi8gfSksXG4vKiAxNTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Td2FwcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTUzKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTd2FwcGFibGVTdGFydEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN0YXJ0RXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTd2FwcGFibGVTd2FwRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3dhcEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU3dhcHBhYmxlU3dhcHBlZEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN3YXBwZWRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1N3YXBwYWJsZVN0b3BFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTdG9wRXZlbnQ7XG4gIH1cbn0pO1xuXG4vKioqLyB9KSxcbi8qIDE1MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Td2FwcGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3dhcEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2Ugc3dhcHBhYmxlIGV2ZW50XG4gKiBAY2xhc3MgU3dhcHBhYmxlRXZlbnRcbiAqIEBtb2R1bGUgU3dhcHBhYmxlRXZlbnRcbiAqIEBleHRlbmRzIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIFN3YXBwYWJsZUV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3dhcHBhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcblxuXG4gICAgLyoqXG4gICAgICogT3JpZ2luYWwgZHJhZyBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGlzIHN3YXBwYWJsZSBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBkcmFnRXZlbnRcbiAgICAgKiBAdHlwZSB7RHJhZ0V2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTd2FwcGFibGVFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIFN3YXBwYWJsZSBzdGFydCBldmVudFxuICogQGNsYXNzIFN3YXBwYWJsZVN0YXJ0RXZlbnRcbiAqIEBtb2R1bGUgU3dhcHBhYmxlU3RhcnRFdmVudFxuICogQGV4dGVuZHMgU3dhcHBhYmxlRXZlbnRcbiAqL1xuXG5cblN3YXBwYWJsZUV2ZW50LnR5cGUgPSAnc3dhcHBhYmxlJztcblxudmFyIFN3YXBwYWJsZVN0YXJ0RXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN0YXJ0RXZlbnQgPSBmdW5jdGlvbiAoX1N3YXBwYWJsZUV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZVN0YXJ0RXZlbnQsIF9Td2FwcGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlU3RhcnRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGVTdGFydEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3RhcnRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZVN0YXJ0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBTd2FwcGFibGVTdGFydEV2ZW50O1xufShTd2FwcGFibGVFdmVudCk7XG5cbi8qKlxuICogU3dhcHBhYmxlIHN3YXAgZXZlbnRcbiAqIEBjbGFzcyBTd2FwcGFibGVTd2FwRXZlbnRcbiAqIEBtb2R1bGUgU3dhcHBhYmxlU3dhcEV2ZW50XG4gKiBAZXh0ZW5kcyBTd2FwcGFibGVFdmVudFxuICovXG5cblxuU3dhcHBhYmxlU3RhcnRFdmVudC50eXBlID0gJ3N3YXBwYWJsZTpzdGFydCc7XG5Td2FwcGFibGVTdGFydEV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgU3dhcHBhYmxlU3dhcEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTd2FwRXZlbnQgPSBmdW5jdGlvbiAoX1N3YXBwYWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGVTd2FwRXZlbnQsIF9Td2FwcGFibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZVN3YXBFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGVTd2FwRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGVTd2FwRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGVTd2FwRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBwYWJsZVN3YXBFdmVudCwgW3tcbiAgICBrZXk6ICdvdmVyJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGVsZW1lbnQgeW91IGFyZSBvdmVyXG4gICAgICogQHByb3BlcnR5IG92ZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnRhaW5lciB5b3UgYXJlIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlckNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXJDb250YWluZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTd2FwcGFibGVTd2FwRXZlbnQ7XG59KFN3YXBwYWJsZUV2ZW50KTtcblxuLyoqXG4gKiBTd2FwcGFibGUgc3dhcHBlZCBldmVudFxuICogQGNsYXNzIFN3YXBwYWJsZVN3YXBwZWRFdmVudFxuICogQG1vZHVsZSBTd2FwcGFibGVTd2FwcGVkRXZlbnRcbiAqIEBleHRlbmRzIFN3YXBwYWJsZUV2ZW50XG4gKi9cblxuXG5Td2FwcGFibGVTd2FwRXZlbnQudHlwZSA9ICdzd2FwcGFibGU6c3dhcCc7XG5Td2FwcGFibGVTd2FwRXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBTd2FwcGFibGVTd2FwcGVkRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IGZ1bmN0aW9uIChfU3dhcHBhYmxlRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZVN3YXBwZWRFdmVudCwgX1N3YXBwYWJsZUV2ZW50Myk7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlU3dhcHBlZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZVN3YXBwZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZVN3YXBwZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZVN3YXBwZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3dhcHBhYmxlU3dhcHBlZEV2ZW50LCBbe1xuICAgIGtleTogJ3N3YXBwZWRFbGVtZW50JyxcblxuXG4gICAgLyoqXG4gICAgICogVGhlIGRyYWdnYWJsZSBlbGVtZW50IHRoYXQgeW91IHN3YXBwZWQgd2l0aFxuICAgICAqIEBwcm9wZXJ0eSBzd2FwcGVkRWxlbWVudFxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc3dhcHBlZEVsZW1lbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTd2FwcGFibGVTd2FwcGVkRXZlbnQ7XG59KFN3YXBwYWJsZUV2ZW50KTtcblxuLyoqXG4gKiBTd2FwcGFibGUgc3RvcCBldmVudFxuICogQGNsYXNzIFN3YXBwYWJsZVN0b3BFdmVudFxuICogQG1vZHVsZSBTd2FwcGFibGVTdG9wRXZlbnRcbiAqIEBleHRlbmRzIFN3YXBwYWJsZUV2ZW50XG4gKi9cblxuXG5Td2FwcGFibGVTd2FwcGVkRXZlbnQudHlwZSA9ICdzd2FwcGFibGU6c3dhcHBlZCc7XG5cbnZhciBTd2FwcGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN0b3BFdmVudCA9IGZ1bmN0aW9uIChfU3dhcHBhYmxlRXZlbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZVN0b3BFdmVudCwgX1N3YXBwYWJsZUV2ZW50NCk7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlU3RvcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZVN0b3BFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZVN0b3BFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZVN0b3BFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIFN3YXBwYWJsZVN0b3BFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG5Td2FwcGFibGVTdG9wRXZlbnQudHlwZSA9ICdzd2FwcGFibGU6c3RvcCc7XG5cbi8qKiovIH0pLFxuLyogMTU0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfU29ydGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1NSk7XG5cbnZhciBfU29ydGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydGFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfU29ydGFibGUyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTU1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9Db25zdW1hYmxlQXJyYXkyKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9nZXQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mik7XG5cbnZhciBfZ2V0MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldDIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9EcmFnZ2FibGUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cbnZhciBfRHJhZ2dhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdnYWJsZTIpO1xuXG52YXIgX1NvcnRhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1Nik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkRyYWdTdGFydCA9IFN5bWJvbCgnb25EcmFnU3RhcnQnKTtcbnZhciBvbkRyYWdPdmVyQ29udGFpbmVyID0gU3ltYm9sKCdvbkRyYWdPdmVyQ29udGFpbmVyJyk7XG52YXIgb25EcmFnT3ZlciA9IFN5bWJvbCgnb25EcmFnT3ZlcicpO1xudmFyIG9uRHJhZ1N0b3AgPSBTeW1ib2woJ29uRHJhZ1N0b3AnKTtcblxuLyoqXG4gKiBTb3J0YWJsZSBpcyBidWlsdCBvbiB0b3Agb2YgRHJhZ2dhYmxlIGFuZCBhbGxvd3Mgc29ydGluZyBvZiBkcmFnZ2FibGUgZWxlbWVudHMuIFNvcnRhYmxlIHdpbGwga2VlcFxuICogdHJhY2sgb2YgdGhlIG9yaWdpbmFsIGluZGV4IGFuZCBlbWl0cyB0aGUgbmV3IGluZGV4IGFzIHlvdSBkcmFnIG92ZXIgZHJhZ2dhYmxlIGVsZW1lbnRzLlxuICogQGNsYXNzIFNvcnRhYmxlXG4gKiBAbW9kdWxlIFNvcnRhYmxlXG4gKiBAZXh0ZW5kcyBEcmFnZ2FibGVcbiAqL1xuXG52YXIgU29ydGFibGUgPSBmdW5jdGlvbiAoX0RyYWdnYWJsZSkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZSwgX0RyYWdnYWJsZSk7XG5cbiAgLyoqXG4gICAqIFNvcnRhYmxlIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBTb3J0YWJsZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBTb3J0YWJsZSBjb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgU29ydGFibGVcbiAgICovXG4gIGZ1bmN0aW9uIFNvcnRhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU29ydGFibGUpO1xuXG4gICAgLyoqXG4gICAgICogc3RhcnQgaW5kZXggb2Ygc291cmNlIG9uIGRyYWcgc3RhcnRcbiAgICAgKiBAcHJvcGVydHkgc3RhcnRJbmRleFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTb3J0YWJsZSkpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMuc3RhcnRJbmRleCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBzdGFydCBjb250YWluZXIgb24gZHJhZyBzdGFydFxuICAgICAqIEBwcm9wZXJ0eSBzdGFydENvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgX3RoaXMuc3RhcnRDb250YWluZXIgPSBudWxsO1xuXG4gICAgX3RoaXNbb25EcmFnU3RhcnRdID0gX3RoaXNbb25EcmFnU3RhcnRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ092ZXJDb250YWluZXJdID0gX3RoaXNbb25EcmFnT3ZlckNvbnRhaW5lcl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnT3Zlcl0gPSBfdGhpc1tvbkRyYWdPdmVyXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdTdG9wXSA9IF90aGlzW29uRHJhZ1N0b3BdLmJpbmQoX3RoaXMpO1xuXG4gICAgX3RoaXMub24oJ2RyYWc6c3RhcnQnLCBfdGhpc1tvbkRyYWdTdGFydF0pLm9uKCdkcmFnOm92ZXI6Y29udGFpbmVyJywgX3RoaXNbb25EcmFnT3ZlckNvbnRhaW5lcl0pLm9uKCdkcmFnOm92ZXInLCBfdGhpc1tvbkRyYWdPdmVyXSkub24oJ2RyYWc6c3RvcCcsIF90aGlzW29uRHJhZ1N0b3BdKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgU29ydGFibGUgaW5zdGFuY2UuXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGUsIFt7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAoMCwgX2dldDMuZGVmYXVsdCkoU29ydGFibGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGUucHJvdG90eXBlKSwgJ2Rlc3Ryb3knLCB0aGlzKS5jYWxsKHRoaXMpO1xuXG4gICAgICB0aGlzLm9mZignZHJhZzpzdGFydCcsIHRoaXNbb25EcmFnU3RhcnRdKS5vZmYoJ2RyYWc6b3Zlcjpjb250YWluZXInLCB0aGlzW29uRHJhZ092ZXJDb250YWluZXJdKS5vZmYoJ2RyYWc6b3ZlcicsIHRoaXNbb25EcmFnT3Zlcl0pLm9mZignZHJhZzpzdG9wJywgdGhpc1tvbkRyYWdTdG9wXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGluZGV4IG9mIGVsZW1lbnQgd2l0aGluIGl0cyBjb250YWluZXIgZHVyaW5nIGRyYWcgb3BlcmF0aW9uLCBpLmUuIGV4Y2x1ZGluZyBtaXJyb3IgYW5kIG9yaWdpbmFsIHNvdXJjZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBBbiBlbGVtZW50XG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpbmRleCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluZGV4KGVsZW1lbnQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZHJlbikpLmZpbHRlcihmdW5jdGlvbiAoY2hpbGRFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBjaGlsZEVsZW1lbnQgIT09IF90aGlzMi5vcmlnaW5hbFNvdXJjZSAmJiBjaGlsZEVsZW1lbnQgIT09IF90aGlzMi5taXJyb3I7XG4gICAgICB9KS5pbmRleE9mKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RhcnQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnU3RhcnRFdmVudH0gZXZlbnQgLSBEcmFnIHN0YXJ0IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnU3RhcnQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB0aGlzLnN0YXJ0Q29udGFpbmVyID0gZXZlbnQuc291cmNlLnBhcmVudE5vZGU7XG4gICAgICB0aGlzLnN0YXJ0SW5kZXggPSB0aGlzLmluZGV4KGV2ZW50LnNvdXJjZSk7XG5cbiAgICAgIHZhciBzb3J0YWJsZVN0YXJ0RXZlbnQgPSBuZXcgX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTdGFydEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgc3RhcnRJbmRleDogdGhpcy5zdGFydEluZGV4LFxuICAgICAgICBzdGFydENvbnRhaW5lcjogdGhpcy5zdGFydENvbnRhaW5lclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzb3J0YWJsZVN0YXJ0RXZlbnQpO1xuXG4gICAgICBpZiAoc29ydGFibGVTdGFydEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgZXZlbnQuY2FuY2VsKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBvdmVyIGNvbnRhaW5lciBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdPdmVyQ29udGFpbmVyRXZlbnR9IGV2ZW50IC0gRHJhZyBvdmVyIGNvbnRhaW5lciBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ092ZXJDb250YWluZXIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3VyY2UgPSBldmVudC5zb3VyY2UsXG4gICAgICAgICAgb3ZlciA9IGV2ZW50Lm92ZXIsXG4gICAgICAgICAgb3ZlckNvbnRhaW5lciA9IGV2ZW50Lm92ZXJDb250YWluZXI7XG5cbiAgICAgIHZhciBvbGRJbmRleCA9IHRoaXMuaW5kZXgoc291cmNlKTtcblxuICAgICAgdmFyIHNvcnRhYmxlU29ydEV2ZW50ID0gbmV3IF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY3VycmVudEluZGV4OiBvbGRJbmRleCxcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgIG92ZXI6IG92ZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc29ydGFibGVTb3J0RXZlbnQpO1xuXG4gICAgICBpZiAoc29ydGFibGVTb3J0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtb3ZlcyA9IG1vdmUoc291cmNlLCBvdmVyLCBvdmVyQ29udGFpbmVyKTtcblxuICAgICAgaWYgKCFtb3Zlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBvbGRDb250YWluZXIgPSBtb3Zlcy5vbGRDb250YWluZXIsXG4gICAgICAgICAgbmV3Q29udGFpbmVyID0gbW92ZXMubmV3Q29udGFpbmVyO1xuXG4gICAgICB2YXIgbmV3SW5kZXggPSB0aGlzLmluZGV4KGV2ZW50LnNvdXJjZSk7XG5cbiAgICAgIHZhciBzb3J0YWJsZVNvcnRlZEV2ZW50ID0gbmV3IF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydGVkRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBvbGRJbmRleDogb2xkSW5kZXgsXG4gICAgICAgIG5ld0luZGV4OiBuZXdJbmRleCxcbiAgICAgICAgb2xkQ29udGFpbmVyOiBvbGRDb250YWluZXIsXG4gICAgICAgIG5ld0NvbnRhaW5lcjogbmV3Q29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHNvcnRhYmxlU29ydGVkRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgb3ZlciBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdPdmVyRXZlbnR9IGV2ZW50IC0gRHJhZyBvdmVyIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnT3ZlcixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5vdmVyID09PSBldmVudC5vcmlnaW5hbFNvdXJjZSB8fCBldmVudC5vdmVyID09PSBldmVudC5zb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc291cmNlID0gZXZlbnQuc291cmNlLFxuICAgICAgICAgIG92ZXIgPSBldmVudC5vdmVyLFxuICAgICAgICAgIG92ZXJDb250YWluZXIgPSBldmVudC5vdmVyQ29udGFpbmVyO1xuXG4gICAgICB2YXIgb2xkSW5kZXggPSB0aGlzLmluZGV4KHNvdXJjZSk7XG5cbiAgICAgIHZhciBzb3J0YWJsZVNvcnRFdmVudCA9IG5ldyBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVNvcnRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGN1cnJlbnRJbmRleDogb2xkSW5kZXgsXG4gICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICBvdmVyOiBvdmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHNvcnRhYmxlU29ydEV2ZW50KTtcblxuICAgICAgaWYgKHNvcnRhYmxlU29ydEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbW92ZXMgPSBtb3ZlKHNvdXJjZSwgb3Zlciwgb3ZlckNvbnRhaW5lcik7XG5cbiAgICAgIGlmICghbW92ZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgb2xkQ29udGFpbmVyID0gbW92ZXMub2xkQ29udGFpbmVyLFxuICAgICAgICAgIG5ld0NvbnRhaW5lciA9IG1vdmVzLm5ld0NvbnRhaW5lcjtcblxuICAgICAgdmFyIG5ld0luZGV4ID0gdGhpcy5pbmRleChzb3VyY2UpO1xuXG4gICAgICB2YXIgc29ydGFibGVTb3J0ZWRFdmVudCA9IG5ldyBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVNvcnRlZEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgb2xkSW5kZXg6IG9sZEluZGV4LFxuICAgICAgICBuZXdJbmRleDogbmV3SW5kZXgsXG4gICAgICAgIG9sZENvbnRhaW5lcjogb2xkQ29udGFpbmVyLFxuICAgICAgICBuZXdDb250YWluZXI6IG5ld0NvbnRhaW5lclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzb3J0YWJsZVNvcnRlZEV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0b3AgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnU3RvcEV2ZW50fSBldmVudCAtIERyYWcgc3RvcCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0b3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgc29ydGFibGVTdG9wRXZlbnQgPSBuZXcgX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTdG9wRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBvbGRJbmRleDogdGhpcy5zdGFydEluZGV4LFxuICAgICAgICBuZXdJbmRleDogdGhpcy5pbmRleChldmVudC5zb3VyY2UpLFxuICAgICAgICBvbGRDb250YWluZXI6IHRoaXMuc3RhcnRDb250YWluZXIsXG4gICAgICAgIG5ld0NvbnRhaW5lcjogZXZlbnQuc291cmNlLnBhcmVudE5vZGVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc29ydGFibGVTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLnN0YXJ0SW5kZXggPSBudWxsO1xuICAgICAgdGhpcy5zdGFydENvbnRhaW5lciA9IG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZTtcbn0oX0RyYWdnYWJsZTMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNvcnRhYmxlO1xuXG5cbmZ1bmN0aW9uIGluZGV4KGVsZW1lbnQpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuLCBlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gbW92ZShzb3VyY2UsIG92ZXIsIG92ZXJDb250YWluZXIpIHtcbiAgdmFyIGVtcHR5T3ZlckNvbnRhaW5lciA9ICFvdmVyQ29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGRpZmZlcmVudENvbnRhaW5lciA9IG92ZXIgJiYgc291cmNlLnBhcmVudE5vZGUgIT09IG92ZXIucGFyZW50Tm9kZTtcbiAgdmFyIHNhbWVDb250YWluZXIgPSBvdmVyICYmIHNvdXJjZS5wYXJlbnROb2RlID09PSBvdmVyLnBhcmVudE5vZGU7XG5cbiAgaWYgKGVtcHR5T3ZlckNvbnRhaW5lcikge1xuICAgIHJldHVybiBtb3ZlSW5zaWRlRW1wdHlDb250YWluZXIoc291cmNlLCBvdmVyQ29udGFpbmVyKTtcbiAgfSBlbHNlIGlmIChzYW1lQ29udGFpbmVyKSB7XG4gICAgcmV0dXJuIG1vdmVXaXRoaW5Db250YWluZXIoc291cmNlLCBvdmVyKTtcbiAgfSBlbHNlIGlmIChkaWZmZXJlbnRDb250YWluZXIpIHtcbiAgICByZXR1cm4gbW92ZU91dHNpZGVDb250YWluZXIoc291cmNlLCBvdmVyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlSW5zaWRlRW1wdHlDb250YWluZXIoc291cmNlLCBvdmVyQ29udGFpbmVyKSB7XG4gIHZhciBvbGRDb250YWluZXIgPSBzb3VyY2UucGFyZW50Tm9kZTtcblxuICBvdmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNvdXJjZSk7XG5cbiAgcmV0dXJuIHsgb2xkQ29udGFpbmVyOiBvbGRDb250YWluZXIsIG5ld0NvbnRhaW5lcjogb3ZlckNvbnRhaW5lciB9O1xufVxuXG5mdW5jdGlvbiBtb3ZlV2l0aGluQ29udGFpbmVyKHNvdXJjZSwgb3Zlcikge1xuICB2YXIgb2xkSW5kZXggPSBpbmRleChzb3VyY2UpO1xuICB2YXIgbmV3SW5kZXggPSBpbmRleChvdmVyKTtcblxuICBpZiAob2xkSW5kZXggPCBuZXdJbmRleCkge1xuICAgIHNvdXJjZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzb3VyY2UsIG92ZXIubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgfSBlbHNlIHtcbiAgICBzb3VyY2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyKTtcbiAgfVxuXG4gIHJldHVybiB7IG9sZENvbnRhaW5lcjogc291cmNlLnBhcmVudE5vZGUsIG5ld0NvbnRhaW5lcjogc291cmNlLnBhcmVudE5vZGUgfTtcbn1cblxuZnVuY3Rpb24gbW92ZU91dHNpZGVDb250YWluZXIoc291cmNlLCBvdmVyKSB7XG4gIHZhciBvbGRDb250YWluZXIgPSBzb3VyY2UucGFyZW50Tm9kZTtcblxuICBvdmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNvdXJjZSwgb3Zlcik7XG5cbiAgcmV0dXJuIHsgb2xkQ29udGFpbmVyOiBvbGRDb250YWluZXIsIG5ld0NvbnRhaW5lcjogc291cmNlLnBhcmVudE5vZGUgfTtcbn1cblxuLyoqKi8gfSksXG4vKiAxNTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Tb3J0YWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNTcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NvcnRhYmxlU3RhcnRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU3RhcnRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NvcnRhYmxlU29ydEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTb3J0RXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTb3J0YWJsZVNvcnRlZEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTb3J0ZWRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NvcnRhYmxlU3RvcEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTdG9wRXZlbnQ7XG4gIH1cbn0pO1xuXG4vKioqLyB9KSxcbi8qIDE1NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Tb3J0YWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTb3J0ZWRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTb3J0RXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU3RhcnRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2Ugc29ydGFibGUgZXZlbnRcbiAqIEBjbGFzcyBTb3J0YWJsZUV2ZW50XG4gKiBAbW9kdWxlIFNvcnRhYmxlRXZlbnRcbiAqIEBleHRlbmRzIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIFNvcnRhYmxlRXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFNvcnRhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU29ydGFibGVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTb3J0YWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZUV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdFdmVudCcsXG5cblxuICAgIC8qKlxuICAgICAqIE9yaWdpbmFsIGRyYWcgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhpcyBzb3J0YWJsZSBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBkcmFnRXZlbnRcbiAgICAgKiBAdHlwZSB7RHJhZ0V2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZUV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogU29ydGFibGUgc3RhcnQgZXZlbnRcbiAqIEBjbGFzcyBTb3J0YWJsZVN0YXJ0RXZlbnRcbiAqIEBtb2R1bGUgU29ydGFibGVTdGFydEV2ZW50XG4gKiBAZXh0ZW5kcyBTb3J0YWJsZUV2ZW50XG4gKi9cblxuXG5Tb3J0YWJsZUV2ZW50LnR5cGUgPSAnc29ydGFibGUnO1xuXG52YXIgU29ydGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVN0YXJ0RXZlbnQgPSBmdW5jdGlvbiAoX1NvcnRhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGVTdGFydEV2ZW50LCBfU29ydGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gU29ydGFibGVTdGFydEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlU3RhcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlU3RhcnRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlU3RhcnRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVTdGFydEV2ZW50LCBbe1xuICAgIGtleTogJ3N0YXJ0SW5kZXgnLFxuXG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBpbmRleCBvZiBzb3VyY2Ugb24gc29ydGFibGUgc3RhcnRcbiAgICAgKiBAcHJvcGVydHkgc3RhcnRJbmRleFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnN0YXJ0SW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgY29udGFpbmVyIG9uIHNvcnRhYmxlIHN0YXJ0XG4gICAgICogQHByb3BlcnR5IHN0YXJ0Q29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzdGFydENvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnN0YXJ0Q29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVTdGFydEV2ZW50O1xufShTb3J0YWJsZUV2ZW50KTtcblxuLyoqXG4gKiBTb3J0YWJsZSBzb3J0IGV2ZW50XG4gKiBAY2xhc3MgU29ydGFibGVTb3J0RXZlbnRcbiAqIEBtb2R1bGUgU29ydGFibGVTb3J0RXZlbnRcbiAqIEBleHRlbmRzIFNvcnRhYmxlRXZlbnRcbiAqL1xuXG5cblNvcnRhYmxlU3RhcnRFdmVudC50eXBlID0gJ3NvcnRhYmxlOnN0YXJ0JztcblNvcnRhYmxlU3RhcnRFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIFNvcnRhYmxlU29ydEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVNvcnRFdmVudCA9IGZ1bmN0aW9uIChfU29ydGFibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGVTb3J0RXZlbnQsIF9Tb3J0YWJsZUV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gU29ydGFibGVTb3J0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU29ydGFibGVTb3J0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTb3J0YWJsZVNvcnRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlU29ydEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZVNvcnRFdmVudCwgW3tcbiAgICBrZXk6ICdjdXJyZW50SW5kZXgnLFxuXG5cbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiBjdXJyZW50IGRyYWdnYWJsZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IGN1cnJlbnRJbmRleFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmN1cnJlbnRJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgZWxlbWVudCB5b3UgYXJlIGhvdmVyaW5nIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3ZlcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9sZEluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBjb250YWluZXIgZWxlbWVudCB5b3UgYXJlIGhvdmVyaW5nIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlckNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm5ld0luZGV4O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVTb3J0RXZlbnQ7XG59KFNvcnRhYmxlRXZlbnQpO1xuXG4vKipcbiAqIFNvcnRhYmxlIHNvcnRlZCBldmVudFxuICogQGNsYXNzIFNvcnRhYmxlU29ydGVkRXZlbnRcbiAqIEBtb2R1bGUgU29ydGFibGVTb3J0ZWRFdmVudFxuICogQGV4dGVuZHMgU29ydGFibGVFdmVudFxuICovXG5cblxuU29ydGFibGVTb3J0RXZlbnQudHlwZSA9ICdzb3J0YWJsZTpzb3J0JztcblNvcnRhYmxlU29ydEV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgU29ydGFibGVTb3J0ZWRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTb3J0ZWRFdmVudCA9IGZ1bmN0aW9uIChfU29ydGFibGVFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGVTb3J0ZWRFdmVudCwgX1NvcnRhYmxlRXZlbnQzKTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZVNvcnRlZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlU29ydGVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTb3J0YWJsZVNvcnRlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVTb3J0ZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVTb3J0ZWRFdmVudCwgW3tcbiAgICBrZXk6ICdvbGRJbmRleCcsXG5cblxuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIGxhc3Qgc29ydGVkIGV2ZW50XG4gICAgICogQHByb3BlcnR5IG9sZEluZGV4XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub2xkSW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmV3IGluZGV4IG9mIHRoaXMgc29ydGVkIGV2ZW50XG4gICAgICogQHByb3BlcnR5IG5ld0luZGV4XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbmV3SW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5uZXdJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbGQgY29udGFpbmVyIG9mIGRyYWdnYWJsZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG9sZENvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb2xkQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub2xkQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5ldyBjb250YWluZXIgb2YgZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgbmV3Q29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICduZXdDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5uZXdDb250YWluZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZVNvcnRlZEV2ZW50O1xufShTb3J0YWJsZUV2ZW50KTtcblxuLyoqXG4gKiBTb3J0YWJsZSBzdG9wIGV2ZW50XG4gKiBAY2xhc3MgU29ydGFibGVTdG9wRXZlbnRcbiAqIEBtb2R1bGUgU29ydGFibGVTdG9wRXZlbnRcbiAqIEBleHRlbmRzIFNvcnRhYmxlRXZlbnRcbiAqL1xuXG5cblNvcnRhYmxlU29ydGVkRXZlbnQudHlwZSA9ICdzb3J0YWJsZTpzb3J0ZWQnO1xuXG52YXIgU29ydGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU3RvcEV2ZW50ID0gZnVuY3Rpb24gKF9Tb3J0YWJsZUV2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZVN0b3BFdmVudCwgX1NvcnRhYmxlRXZlbnQ0KTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZVN0b3BFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZVN0b3BFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlU3RvcEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVTdG9wRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlU3RvcEV2ZW50LCBbe1xuICAgIGtleTogJ29sZEluZGV4JyxcblxuXG4gICAgLyoqXG4gICAgICogT3JpZ2luYWwgaW5kZXggb24gc29ydGFibGUgc3RhcnRcbiAgICAgKiBAcHJvcGVydHkgb2xkSW5kZXhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vbGRJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOZXcgaW5kZXggb2YgZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgbmV3SW5kZXhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICduZXdJbmRleCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm5ld0luZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9yaWdpbmFsIGNvbnRhaW5lciBvZiBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBvbGRDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29sZENvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9sZENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOZXcgY29udGFpbmVyIG9mIGRyYWdnYWJsZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG5ld0NvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbmV3Q29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubmV3Q29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVTdG9wRXZlbnQ7XG59KFNvcnRhYmxlRXZlbnQpO1xuXG5Tb3J0YWJsZVN0b3BFdmVudC50eXBlID0gJ3NvcnRhYmxlOnN0b3AnO1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ac2hvcGlmeS9kcmFnZ2FibGUvbGliL2RyYWdnYWJsZS5idW5kbGUuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9