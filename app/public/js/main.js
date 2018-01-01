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
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
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

					if ($(".topics-list.edit li.topic:last").length > 0) {
						$(".topics-list.edit li.topic:last").after('<li draggable class="topic" data-topic-id="' + data["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + data["name"] + '</p></li>');
					} else {
						$(".topics-list.edit").prepend('<li draggable class="topic first" data-topic-id="' + data["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + data["name"] + '</p></li>');
					}
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
						this.element.hide(400, function () {
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

	Marker.prototype.Urls_ = {
		ASSIGN_MARKER: '/admin/marker-assign'
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
		var studentId = marker.selectedStudent.data('student-id');
		var markerId = marker.selectedSupervisor.data('marker-id');

		$.ajax({
			type: "PATCH",
			url: marker.Urls_.ASSIGN_MARKER,
			data: {
				project_id: projectId,
				student_id: studentId,
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

	/* =========================
 	6. Dynamic Pagination
    ========================= */
	if ($('#project-table').hasClass("index")) {
		var projects_pageNumber = 2,
		    projects_endOfTable = false,
		    projects_awaitingResponse = false;

		$(window).scroll(function () {
			if ($(window).scrollTop() + $(window).height() == $(document).height()) {
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
	}

	if ($('#user-agent-table').length > 0) {
		var agents_pageNumber = 2,
		    agents_endOfTable = false,
		    agents_awaitingResponse = false;

		$(window).scroll(function () {
			if ($(window).scrollTop() + $(window).height() == $(document).height()) {
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
	}
	/* ======================
 	 7. SUPERVISOR
    ====================== */

	// Accept or Reject Student
	$('.supervisor-table .offer-action').on('click', function () {
		var actionButton = $(this);
		var actionType = actionButton.data('action-type');
		var tableRow = actionButton.parents().eq(1);
		var student_id = tableRow.data('student-id');

		actionButton.html('<div class="loader"></div>');
		$('.loader', actionButton).css('display', 'block');

		if (actionType === "accept") {
			var ajaxUrl = '/supervisor/student-accept';
		} else if (actionType === "reject") {
			var ajaxUrl = '/supervisor/student-reject';
		}

		if (ajaxUrl == null) {
			console.log("Invalid supervisor action.");
			return;
		}

		$.ajax({
			method: 'POST',
			url: ajaxUrl,
			data: {
				student_id: student_id
			},
			success: function success(data) {
				tableRow.hide(400, function () {
					tableRow.remove();
				});
				if (actionType === "accept") {
					showNotification('', 'Student has been accepted.');
					// todo: add to thingy to table
					// todo: maybe php that refreshes table instead
					// $("#supervisor-accepted-students-table tbody").prepend();
				} else if (actionType === "reject") {
					showNotification('', 'Student has been rejected.');
				}
			},
			error: function error() {
				actionButton.html(actionType);
			}
		});
	});

	$('#deleteProjectButton').on('click', function () {
		AjaxFunctions.prototype.deleteProject($('#title').val());
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

$(document).ajaxError(function (event, request, settings) {
	showNotification('error', 'Something went wrong with that request.');
});

function showNotification(type, message) {
	var notification = $('.notification');
	notification.addClass(type);
	$(notification).html("<p>" + message + "</p>");
	notification.show();

	setTimeout(function () {
		notification.hide(0);
	}, 3000);
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWUxMjM5MGJmOGE0YWIyMzA4NzAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2hvcGlmeS9kcmFnZ2FibGUvbGliL2RyYWdnYWJsZS5idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImFwcGVuZCIsInJlbW92ZUFsbFNoYWRvd0NsYXNzZXMiLCJlbGVtZW50IiwicmVtb3ZlQ2xhc3MiLCJpbmRleCIsImNsYXNzTmFtZSIsIm1hdGNoIiwiam9pbiIsIk1vYmlsZU1lbnUiLCJ3aW5kb3ciLCJhY3RpdmF0b3IiLCJTZWxlY3RvcnNfIiwiSEFNQlVSR0VSX0NPTlRBSU5FUiIsInVuZGVybGF5IiwiVU5ERVJMQVkiLCJpbml0IiwicHJvdG90eXBlIiwiQ3NzQ2xhc3Nlc18iLCJWSVNJQkxFIiwiTU9CSUxFX01FTlUiLCJvcGVuTWVudSIsImFkZENsYXNzIiwiY2xvc2VNZW51IiwibW9iaWxlTWVudSIsIm9uIiwiYmluZCIsImluaXRBbGwiLCJlYWNoIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImRhdGEiLCJoZWFkZXIiLCJmaW5kIiwiRElBTE9HX0hFQURFUiIsImNvbnRlbnQiLCJESUFMT0dfQ09OVEVOVCIsImJlZm9yZSIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dMb2FkZXIiLCJzaG93IiwiaGlkZSIsImhpZGVMb2FkZXIiLCJzaG93RGlhbG9nIiwiaGlkZURpYWxvZyIsImRpYWxvZyIsInB1c2giLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJlcSIsImNzcyIsIlByb2plY3RUb3BpY3MiLCJBRERfVE9QSUNfSU5QVVQiLCJORVdfVE9QSUNfSU5QVVRfQ09OVEFJTkVSIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJwcm9qZWN0VG9waWNzIiwiYWRkVG9waWNUb1Byb2plY3QiLCJwcm9qZWN0SWQiLCJ0b3BpY05hbWUiLCJhamF4VXJsIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJ0b3BpY19uYW1lIiwicHJvamVjdF9pZCIsInN1Y2Nlc3MiLCJKU09OIiwicGFyc2UiLCJ2YWwiLCJsZW5ndGgiLCJhZnRlciIsInByZXBlbmQiLCJkb25lIiwicmVtb3ZlVG9waWNGcm9tUHJvamVjdCIsInRvcGljSWQiLCJ0b3BpY19pZCIsIm9iaiIsInJlbW92ZSIsInVwZGF0ZVByb2plY3RQcmltYXJ5VG9waWMiLCJzd2FwcGFibGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkcmFnZ2FibGUiLCJvcmlnaW5hbFByaW1hcnlUb3BpY0lkIiwia2V5cHJlc3MiLCJlIiwid2hpY2giLCJwYXJlbnQiLCJmb2N1cyIsIkFqYXhGdW5jdGlvbnMiLCJTRUFSQ0hfSU5QVVQiLCJTRUFSQ0hfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0JVVFRPTiIsIkxPR19JTl9ESUFMT0ciLCJDSEFOR0VfQVVUSF9ESUFMT0ciLCJkZWxldGVQcm9qZWN0IiwicHJvamVjdE5hbWUiLCJjb25maXJtIiwibG9jYXRpb24iLCJocmVmIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiaGFzQ2xhc3MiLCJFZGl0VG9waWMiLCJvcmlnaW5hbE5hbWUiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInJlc3BvbnNlIiwiaHRtbCIsIm1ldGhvZCIsImNvbnRleHQiLCJkZWxldGVUb3BpYyIsImNyZWF0ZUVkaXRUb3BpY0RPTSIsIk1hcmtlciIsInNlbGVjdGVkU3R1ZGVudCIsInNlbGVjdGVkU3VwZXJ2aXNvciIsInN0dWRlbnRUYWJsZSIsInN0dWRlbnREYXRhVGFibGUiLCJzdXBlcnZpc29yVGFibGUiLCJzdXBlcnZpc29yRGF0YVRhYmxlIiwiQVNTSUdOX01BUktFUiIsInNlbGVjdFN0dWRlbnQiLCJzdHVkZW50Um93RE9NIiwibWFya2VyIiwidW5zZWxlY3RBbGwiLCJzZWxlY3RTdXBlcnZpc29yIiwic3VwZXJ2aXNvclJvd0RPTSIsInJlc2V0VmlldyIsInN0dWRlbnROYW1lIiwic3VwZXJ2aXNvck5hbWUiLCJtYXJrZXJOYW1lIiwicHJvamVjdCIsInRleHQiLCJzdHVkZW50SWQiLCJtYXJrZXJJZCIsInN0dWRlbnRfaWQiLCJtYXJrZXJfaWQiLCJwcm9qZWN0c19wYWdlTnVtYmVyIiwicHJvamVjdHNfZW5kT2ZUYWJsZSIsInByb2plY3RzX2F3YWl0aW5nUmVzcG9uc2UiLCJzY3JvbGwiLCJzY3JvbGxUb3AiLCJoZWlnaHQiLCJ1cmxQYXRoIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImFnZW50c19wYWdlTnVtYmVyIiwiYWdlbnRzX2VuZE9mVGFibGUiLCJhZ2VudHNfYXdhaXRpbmdSZXNwb25zZSIsImFjdGlvbkJ1dHRvbiIsImFjdGlvblR5cGUiLCJ0YWJsZVJvdyIsInBhcmVudHMiLCJsb2ciLCJzaG93Tm90aWZpY2F0aW9uIiwic3RhdHVzIiwiZW1haWxTdHJpbmciLCJjaGVja2JveFNlbGVjdG9yIiwiZW1haWxCdXR0b25zZWxlY3RvciIsImFsZXJ0IiwicHJldmVudERlZmF1bHQiLCJzZXJpYWxpemUiLCJyZWxvYWQiLCJzdWJtaXRCdXR0b24iLCJhamF4RXJyb3IiLCJldmVudCIsInJlcXVlc3QiLCJzZXR0aW5ncyIsIm1lc3NhZ2UiLCJub3RpZmljYXRpb24iLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7O0FBRUFBLEVBQUUsWUFBVztBQUNiOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7O0FBR0FBLEdBQUVDLFNBQUYsQ0FBWTtBQUNYQyxXQUFTO0FBQ1IsbUJBQWdCRixFQUFFLHlCQUFGLEVBQTZCRyxJQUE3QixDQUFrQyxTQUFsQztBQURSO0FBREUsRUFBWjs7QUFNQTs7O0FBR0FILEdBQUUsTUFBRixFQUFVSSxNQUFWLENBQWlCLDhCQUFqQjs7QUFFQTs7O0FBR0EsVUFBU0Msc0JBQVQsQ0FBZ0NDLE9BQWhDLEVBQXdDO0FBQ3ZDTixJQUFFTSxPQUFGLEVBQVdDLFdBQVgsQ0FBd0IsVUFBVUMsS0FBVixFQUFpQkMsU0FBakIsRUFBNEI7QUFDbkQsVUFBTyxDQUFDQSxVQUFVQyxLQUFWLENBQWlCLGdCQUFqQixLQUFzQyxFQUF2QyxF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RUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0Q7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNB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RUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVFQUF1RSxnRUFBZ0U7QUFDdkk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlFQUF5RSxtRUFBbUU7QUFDNUk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3Rjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1DQUFtQzs7QUFFbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7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QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGdFQUFnRSw4QkFBOEI7QUFDOUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNB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O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3Rjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0IsZ0JBQWdCO0FBQ2hCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVCQUF1QjtBQUN0Qzs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxPQUFPO0FBQ1A7QUFDQSxDQUFDLEU7Ozs7OztBQ3ovUUQseUMiLCJmaWxlIjoiXFxqc1xcbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGVlMTIzOTBiZjhhNGFiMjMwODcwIiwiaW1wb3J0IHtTd2FwcGFibGV9IGZyb20gJ0BzaG9waWZ5L2RyYWdnYWJsZSc7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4xLiBBSkFYIFNldHVwXHJcbjIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG4zLiBIZWxwZXIgRnVuY3Rpb25zXHJcbjQuIENvbXBvbmVudHNcclxuXHQ0LjEgTW9iaWxlIE1lbnVcclxuXHQ0LjIgRGlhbG9nIC8gTW9kYWxcclxuXHQ0LjMgRGF0YSBUYWJsZVxyXG5cdDQuNCBQcm9qZWN0IFRvcGljcyBbU3VwZXJ2aXNvcl1cclxuXHQ0LjUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG5cdDQuNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcbjUuIFNlY29uZCBNYXJrZXJcclxuNi4gRHluYW1pYyBQYWdpbmF0aW9uXHJcbjcuIFN1cGVydmlzb3JcclxuOC4gT3RoZXJcclxuOS4gSW5pdGlhbGlzZSBFdmVyeXRoaW5nXHJcbiovXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09XHJcblx0MS4gQUpBWCBTZXR1cFxyXG4gICA9PT09PT09PT09PT09PT09ICovXHJcbiQuYWpheFNldHVwKHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKSxcclxuXHR9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Mi4gSFRNTCBNb2RpZmljYXRpb25zXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4kKCdib2R5JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwidW5kZXJsYXlcIj48L2Rpdj4nKTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHQzLiBIZWxwZXJzIEZ1bmN0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmZ1bmN0aW9uIHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoZWxlbWVudCl7XHJcblx0JChlbGVtZW50KS5yZW1vdmVDbGFzcyAoZnVuY3Rpb24gKGluZGV4LCBjbGFzc05hbWUpIHtcclxuXHRcdHJldHVybiAoY2xhc3NOYW1lLm1hdGNoICgvXFxic2hhZG93XFwtXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT1cclxuXHQ0LiBDb21wb25lbnRzXHJcbiAgID09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09XHJcblx0IDQuMSBNb2JpbGUgTWVudVxyXG4gICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIG1vYmlsZSBtZW51LlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgTW9iaWxlTWVudSA9ICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsZW1lbnQpIHtcclxuXHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdHdpbmRvd1snTW9iaWxlTWVudSddID0gdGhpcztcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0dGhpcy51bmRlcmxheSA9ICQodGhpcy5TZWxlY3RvcnNfLlVOREVSTEFZKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdEhBTUJVUkdFUl9DT05UQUlORVI6ICcuaGFtYnVyZ2VyLWNvbnRhaW5lcicsXHJcblx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlZJU0lCTEUpO1xyXG5cclxuXHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5WSVNJQkxFKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmNsb3NlTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVklTSUJMRSk7XHJcblxyXG5cdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVklTSUJMRSk7XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBtb2JpbGVNZW51ID0gdGhpcztcclxuXHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdHRoaXMudW5kZXJsYXkub24oJ2NsaWNrJywgbW9iaWxlTWVudS5jbG9zZU1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLk1PQklMRV9NRU5VKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5tb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUodGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PVxyXG5cdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG4gICA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG52YXIgRGlhbG9nID0gZnVuY3Rpb24gRGlhbG9nKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0dGhpcy51bmRlcmxheSA9ICQoJy51bmRlcmxheScpO1xyXG5cdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdHRoaXMubG9hZGVyID0gJChlbGVtZW50KS5maW5kKFwiLmxvYWRlclwiKTtcclxuXHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydEaWFsb2cnXSA9IERpYWxvZztcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0QUNUSVZFOiAnYWN0aXZlJyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0RElBTE9HX0NPTlRFTlQ6ICcuY29udGVudCcsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLnNob3coMCk7XHJcblx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHR2YXIgZGlhbG9nID0gdGhpcztcclxuXHJcblx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuZGF0YSgnYWN0aXZhdG9yJykgJiYgJCh0aGlzKS5kYXRhKCdkaWFsb2cnKSA9PSBkaWFsb2cuZGlhbG9nTmFtZSl7XHJcblx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIEFkZCBzZXBlcmF0b3IgYWZ0ZXIgaGVhZGVyXHJcblx0ZGlhbG9nLmhlYWRlci5hcHBlbmQoJzxocj4nKTtcclxuXHJcblx0Ly8gRm9yIGRpc2FiaWx0eVxyXG5cdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblxyXG5cdC8vIFNldCB1bmRlcmxheVxyXG5cdGRpYWxvZy51bmRlcmxheS5vbignY2xpY2snLCBkaWFsb2cuaGlkZURpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cclxuXHR0cnl7XHJcblx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGRpYWxvZy5zaG93RGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblx0XHR9KTtcclxuXHR9IGNhdGNoKGVycil7XHJcblx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIFwiICsgZGlhbG9nLmRpYWxvZ05hbWUgKyBcIiBoYXMgbm8gYWN0aXZhdG9yIGJ1dHRvbi5cIik7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmRpYWxvZyA9IG5ldyBEaWFsb2codGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09XHJcblx0NC4zIERhdGEgVGFibGVcclxuICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG4qXHJcbiogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHR0aGlzLnJvd3MgPSAkLm1lcmdlKHRoaXMuYm9keVJvd3MsIHRoaXMuZm9vdFJvd3MpO1xyXG5cdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG53aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdE1BU1RFUl9DSEVDS0JPWDogJ3RoZWFkIC5tYXN0ZXItY2hlY2tib3gnLFxyXG5cdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYodGhpcy5tYXN0ZXJDaGVja2JveC5pcygnOmNoZWNrZWQnKSl7XHJcblx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRpZiAocm93KSB7XHJcblx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcblx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHJcblx0JCh0aGlzLmNoZWNrYm94ZXMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0fSk7XHJcblxyXG5cdCQodGhpcy5oZWFkZXJzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdCQodGhpcykuY3NzKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcclxuXHR9KTtcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5kYXRhVGFibGUgPSBuZXcgRGF0YVRhYmxlKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0NC40IFByb2plY3QgVG9waWNzIFtTdXBlcnZpc29yXVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBwcm9qZWN0IHRvcGljcy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgUHJvamVjdFRvcGljcyA9ICBmdW5jdGlvbiBQcm9qZWN0VG9waWNzKCkge307XHJcbndpbmRvd1snUHJvamVjdFRvcGljcyddID0gUHJvamVjdFRvcGljcztcclxuXHJcblByb2plY3RUb3BpY3MucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuUHJvamVjdFRvcGljcy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRBRERfVE9QSUNfSU5QVVQ6ICcjYWRkVG9waWNJbnB1dCcsXHJcblx0TkVXX1RPUElDX0lOUFVUX0NPTlRBSU5FUjogJyNuZXctdG9waWMtaW5wdXQtY29udGFpbmVyJyxcclxufTtcclxuXHJcblByb2plY3RUb3BpY3MucHJvdG90eXBlLktleXNfID0ge1xyXG5cdFNQQUNFOiAzMixcclxuXHRFTlRFUjogMTMsXHJcblx0Q09NTUE6IDQ1XHJcbn07XHJcblxyXG52YXIgcHJvamVjdFRvcGljcyA9IG5ldyBQcm9qZWN0VG9waWNzKCk7XHJcblxyXG5Qcm9qZWN0VG9waWNzLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0YWRkVG9waWNUb1Byb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljTmFtZSkge1xyXG5cdFx0JCgnLmxvYWRlcicpLnNob3coMCk7XHJcblx0XHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL3RvcGljLWFkZFwiO1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJQT1NUXCIsXHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHRvcGljX25hbWU6IHRvcGljTmFtZSxcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0JChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uQUREX1RPUElDX0lOUFVUKS52YWwoJycpO1xyXG5cclxuXHRcdFx0XHRpZigkKFwiLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWM6bGFzdFwiKS5sZW5ndGggPiAwKXtcclxuXHRcdFx0XHRcdCQoXCIudG9waWNzLWxpc3QuZWRpdCBsaS50b3BpYzpsYXN0XCIpLmFmdGVyKCc8bGkgZHJhZ2dhYmxlIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIGRhdGFbXCJpZFwiXSArICdcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRvcGljLXJlbW92ZVwiPlg8L2J1dHRvbj48cCBjbGFzcz1cInRvcGljLW5hbWVcIj4nICsgZGF0YVtcIm5hbWVcIl0gKyAnPC9wPjwvbGk+Jyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQoXCIudG9waWNzLWxpc3QuZWRpdFwiKS5wcmVwZW5kKCc8bGkgZHJhZ2dhYmxlIGNsYXNzPVwidG9waWMgZmlyc3RcIiBkYXRhLXRvcGljLWlkPVwiJyArIGRhdGFbXCJpZFwiXSArICdcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRvcGljLXJlbW92ZVwiPlg8L2J1dHRvbj48cCBjbGFzcz1cInRvcGljLW5hbWVcIj4nICsgZGF0YVtcIm5hbWVcIl0gKyAnPC9wPjwvbGk+Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQkKCdib2R5JykuYXBwZW5kKGRhdGEpO1xyXG5cdFx0XHQkKCcubG9hZGVyJykuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZVRvcGljRnJvbVByb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljSWQpIHtcclxuXHRcdCQoJy5sb2FkZXInKS5zaG93KDApO1xyXG5cdFx0dmFyIGFqYXhVcmwgPSBcIi9wcm9qZWN0cy90b3BpYy1yZW1vdmVcIjtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiREVMRVRFXCIsXHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHRvcGljX2lkIDogdG9waWNJZCxcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcudG9waWNzLWxpc3QuZWRpdCBsaS50b3BpYycpLmVhY2goZnVuY3Rpb24oaSwgb2JqKSB7XHJcblx0XHRcdFx0XHRpZigkKHRoaXMpLmRhdGEoJ3RvcGljLWlkJykgPT0gdG9waWNJZCl7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5sb2FkZXInKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dXBkYXRlUHJvamVjdFByaW1hcnlUb3BpYzogZnVuY3Rpb24gKHByb2plY3RJZCwgdG9waWNJZCkge1xyXG5cdFx0JCgnLmxvYWRlcicpLnNob3coMCk7XHJcblx0XHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL3RvcGljLXVwZGF0ZS1wcmltYXJ5XCI7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHRvcGljX2lkIDogdG9waWNJZCxcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcjZWRpdFByb2plY3RGb3JtJykuYXR0cignZGF0YS1wcm9qZWN0LWlkJywgdG9waWNJZCk7XHJcblx0XHRcdFx0JCgnLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWMnKS5lYWNoKGZ1bmN0aW9uKGksIG9iaikge1xyXG5cdFx0XHRcdFx0aWYoJCh0aGlzKS5kYXRhKCd0b3BpYy1pZCcpID09IHRvcGljSWQpe1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwiZmlyc3RcIik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmlyc3RcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5sb2FkZXInKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSxcclxufTtcclxuXHJcbmNvbnN0IHN3YXBwYWJsZSA9IG5ldyBTd2FwcGFibGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvcGljcy1saXN0LmVkaXQnKSwge1xyXG5cdGRyYWdnYWJsZTogJy50b3BpYycsXHJcbn0pO1xyXG5cclxuc3dhcHBhYmxlLm9uKCdzd2FwcGFibGU6c3dhcHBlZCcsIGZ1bmN0aW9uKCl7XHJcblx0dmFyIHByb2plY3RJZCA9ICQoJyNlZGl0UHJvamVjdEZvcm0nKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0dmFyIG9yaWdpbmFsUHJpbWFyeVRvcGljSWQgPSAkKCcjZWRpdFByb2plY3RGb3JtJykuZGF0YSgncHJpbWFyeS10b3BpYy1pZCcpO1xyXG5cdHZhciB0b3BpY0lkID0gJChcIi50b3BpY3MtbGlzdC5lZGl0IGxpOmZpcnN0LWNoaWxkXCIpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0aWYodG9waWNJZCAhPSBvcmlnaW5hbFByaW1hcnlUb3BpY0lkKXtcclxuXHRcdHByb2plY3RUb3BpY3MuZnVuY3Rpb25zLnVwZGF0ZVByb2plY3RQcmltYXJ5VG9waWMocHJvamVjdElkLCB0b3BpY0lkKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gQWRkIG5ldyB0b3BpY1xyXG4kKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5BRERfVE9QSUNfSU5QVVQpLmtleXByZXNzKGZ1bmN0aW9uKGUpIHtcclxuXHRpZiAoZS53aGljaCA9PSBwcm9qZWN0VG9waWNzLktleXNfLkVOVEVSKSB7XHJcblx0XHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0cHJvamVjdFRvcGljcy5mdW5jdGlvbnMuYWRkVG9waWNUb1Byb2plY3QocHJvamVjdElkLCAkKHRoaXMpLnZhbCgpKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gUmVtb3ZlIHRvcGljXHJcbiQoJy50b3BpY3MtbGlzdC5lZGl0Jykub24oJ2NsaWNrJywgJy50b3BpYyAudG9waWMtcmVtb3ZlJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdHZhciB0b3BpY0lkID0gJCh0aGlzKS5wYXJlbnQoJ2xpJykuZGF0YSgndG9waWMtaWQnKTtcclxuXHRwcm9qZWN0VG9waWNzLmZ1bmN0aW9ucy5yZW1vdmVUb3BpY0Zyb21Qcm9qZWN0KHByb2plY3RJZCwgdG9waWNJZCk7XHJcbn0pO1xyXG5cclxuJChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uTkVXX1RPUElDX0lOUFVUX0NPTlRBSU5FUikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0JChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uQUREX1RPUElDX0lOUFVUKS5mb2N1cygpO1xyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQ0LjUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcbipcclxuKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG53aW5kb3dbJ0FqYXhGdW5jdGlvbnMnXSA9IEFqYXhGdW5jdGlvbnM7XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0U0VBUkNIX0lOUFVUOiAnLnNlYXJjaC1pbnB1dCcsXHJcblx0U0VBUkNIX0NPTlRBSU5FUjogJy5zZWFyY2gtY29udGFpbmVyJyxcclxuXHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0U0VBUkNIX0ZJTFRFUl9CVVRUT046ICcjc2VhcmNoLWZpbHRlci1idXR0b24nLFxyXG5cdExPR19JTl9ESUFMT0c6ICcubG9naW4uZGlhbG9nJyxcclxuXHRDSEFOR0VfQVVUSF9ESUFMT0c6ICcuY2hhbmdlLWF1dGguZGlhbG9nJ1xyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0U1BBQ0U6IDMyLFxyXG5cdEVOVEVSOiAxMyxcclxuXHRDT01NQTogNDVcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRkZWxldGVQcm9qZWN0OiBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcclxuXHRcdGlmKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIFxcXCJcIiArIHByb2plY3ROYW1lICtcIlxcXCI/XCIpKXtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR0eXBlOiBcIkRFTEVURVwiLFxyXG5cdFx0XHRcdHVybDogXCJlZGl0XCIsXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24odXJsKXtcclxuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuLi9cIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXNcclxuJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy1mb2N1cycpO1xyXG59KTtcclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXMgb3V0XHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1c291dCcsICBmdW5jdGlvbihlKXtcclxuXHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctMmRwJyk7XHJcbn0pO1xyXG5cclxuLy8gU0VBUkNIXHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0JVVFRPTikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIGNvbnRhaW5lciA9ICQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0NPTlRBSU5FUik7XHJcblx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdGlmKGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0Y29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0fSBlbHNle1xyXG5cdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgRWRpdFRvcGljID0gZnVuY3Rpb24gRWRpdFRvcGljKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHR0aGlzLnRvcGljSWQgPSAkKGVsZW1lbnQpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0dGhpcy5kZWxldGVCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5kZWxldGUtdG9waWMnKTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snRWRpdFRvcGljJ10gPSBFZGl0VG9waWM7XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge307XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFBBVENIX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciByZXNwb25zZSA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gXFxcIlwiICsgIHRoaXMub3JpZ2luYWxOYW1lICtcIlxcXCIgdG8gXFxcIlwiICsgIHRoaXMudG9waWNOYW1lSW5wdXQudmFsKCkgK1wiXFxcIj9cIik7XHJcblxyXG5cdFx0aWYocmVzcG9uc2Upe1xyXG5cdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdHRoaXMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdCQoJy5sb2FkZXInLCB0aGlzLmVsZW1lbnQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRtZXRob2Q6ICdQQVRDSCcsXHJcblx0XHRcdFx0dXJsOiB0aGlzLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRjb250ZXh0OiB0aGlzLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdHRvcGljX2lkOiB0aGlzLnRvcGljSWQsXHJcblx0XHRcdFx0XHR0b3BpY19uYW1lIDogdGhpcy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHRcdHRoaXMuZWRpdEJ1dHRvbi5odG1sKCdFZGl0Jyk7XHJcblx0XHRcdFx0dGhpcy5vcmlnaW5hbE5hbWUgPSB0aGlzLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudG9waWNOYW1lSW5wdXQudmFsKHRoaXMub3JpZ2luYWxOYW1lKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRkZWxldGVUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcmVzcG9uc2UgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgdG9waWMgXFxcIlwiICsgIHRoaXMub3JpZ2luYWxOYW1lICtcIlxcXCI/XCIpO1xyXG5cdFx0aWYocmVzcG9uc2Upe1xyXG5cdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcclxuXHRcdFx0XHR1cmw6IHRoaXMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdGNvbnRleHQ6IHRoaXMsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0dG9waWNfaWQ6IHRoaXMudG9waWNJZCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuaGlkZSg0MDAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjcmVhdGVFZGl0VG9waWNET006IGZ1bmN0aW9uKHRvcGljSWQsIG9yaWdpbmFsTmFtZSl7XHJcblx0XHQkKFwiLmVkaXQtdG9waWMtbGlzdFwiKS5wcmVwZW5kKCc8bGkgY2xhc3M9XCJ0b3BpY1wiIGRhdGEtdG9waWMtaWQ9XCInICsgdG9waWNJZCArJ1wiIGRhdGEtb3JpZ2luYWwtdG9waWMtbmFtZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48aW5wdXQgc3BlbGxjaGVjaz1cInRydWVcIiBuYW1lPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBlZGl0LXRvcGljXCIgdHlwZT1cInN1Ym1pdFwiPkVkaXQ8L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRlbGV0ZS10b3BpYyBidXR0b24tLWRhbmdlclwiPkRlbGV0ZTwvYnV0dG9uPjwvbGk+Jyk7XHJcblx0XHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHR9XHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGVkaXRUb3BpYyA9IHRoaXM7XHJcblx0dGhpcy5lZGl0QnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZWRpdFRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHR0aGlzLmRlbGV0ZUJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmRlbGV0ZVRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5FRElUX1RPUElDKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5FZGl0VG9waWMgPSBuZXcgRWRpdFRvcGljKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09XHJcblx0NS4gU2Vjb25kIE1hcmtlclxyXG4gICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbnZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbk1hcmtlci5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxufTtcclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCA9IGZ1bmN0aW9uKHN0dWRlbnRSb3dET00sIG1hcmtlcil7XHJcblx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdG1hcmtlci51bnNlbGVjdEFsbChtYXJrZXIpO1xyXG5cdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHRoaXMpLmRhdGEoJ21hcmtlci1pZCcpID09IHJvdy5kYXRhKCdzdXBlcnZpc29yLWlkJykpe1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdHZhciByb3cgPSAkKHN1cGVydmlzb3JSb3dET00pO1xyXG5cclxuXHRpZihyb3cuYXR0cignZGlzYWJsZWQnKSl7cmV0dXJuO31cclxuXHJcblx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IHJvdztcclxuXHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LW5hbWUnKSxcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdXBlcnZpc29yLW5hbWUnKSxcclxuXHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpKTtcclxuXHR9XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUucmVzZXRWaWV3ID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0JChcIiNzdHVkZW50LW5hbWVcIikudGV4dChzdHVkZW50TmFtZSk7XHJcblx0JChcIiNzdXBlcnZpc29yLW5hbWVcIikudGV4dChzdXBlcnZpc29yTmFtZSk7XHJcblx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHQkKFwiI3Byb2plY3QtdGl0bGVcIikuaHRtbCgnPGI+VGl0bGU6IDwvYj4nICsgcHJvamVjdFtcInRpdGxlXCJdKTtcclxuXHQkKFwiI3Byb2plY3QtZGVzY3JpcHRpb25cIikuaHRtbCgnPGI+RGVzY3JpcHRpb246IDwvYj4nICsgcHJvamVjdFtcImRlc2NyaXB0aW9uXCJdKTtcclxuXHJcblx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcbn1cclxuXHJcbiQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdHZhciBtYXJrZXIgPSB3aW5kb3dbJ01hcmtlciddO1xyXG5cclxuXHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9PSBudWxsKXtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH07XHJcblxyXG5cdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHR2YXIgcHJvamVjdElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JylbXCJpZFwiXTtcclxuXHR2YXIgc3R1ZGVudElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LWlkJyk7XHJcblx0dmFyIG1hcmtlcklkID0gbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvci5kYXRhKCdtYXJrZXItaWQnKTtcclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHR5cGU6IFwiUEFUQ0hcIixcclxuXHRcdHVybDogbWFya2VyLlVybHNfLkFTU0lHTl9NQVJLRVIsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZCxcclxuXHRcdFx0c3R1ZGVudF9pZDogc3R1ZGVudElkLFxyXG5cdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcblx0XHR9LFxyXG5cdFx0Ly8gQWRkIGZhaWxcclxuXHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQucmVtb3ZlKCk7XHJcblx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuTWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbWFya2VyID0gdGhpcztcclxuXHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxuXHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHR3aW5kb3dbJ01hcmtlciddID0gbmV3IE1hcmtlcigpO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ni4gRHluYW1pYyBQYWdpbmF0aW9uXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuaWYoJCgnI3Byb2plY3QtdGFibGUnKS5oYXNDbGFzcyhcImluZGV4XCIpKXtcclxuXHR2YXIgcHJvamVjdHNfcGFnZU51bWJlciA9IDIsXHJcblx0XHRwcm9qZWN0c19lbmRPZlRhYmxlID0gZmFsc2UsXHJcblx0XHRwcm9qZWN0c19hd2FpdGluZ1Jlc3BvbnNlID0gZmFsc2U7XHJcblxyXG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCkgPT0gJChkb2N1bWVudCkuaGVpZ2h0KCkpIHtcclxuXHRcdFx0aWYoIXByb2plY3RzX2VuZE9mVGFibGUgJiYgIXByb2plY3RzX2F3YWl0aW5nUmVzcG9uc2Upe1xyXG5cdFx0XHRcdCQoXCIubG9hZGVyLnByb2plY3RzXCIpLnNob3coKTtcclxuXHRcdFx0XHRwcm9qZWN0c19hd2FpdGluZ1Jlc3BvbnNlID0gdHJ1ZTtcclxuXHRcdFx0XHR2YXIgdXJsUGF0aCA9IFwiL3Byb2plY3RzP3BhcnRpYWw9dHJ1ZT9wYWdlPVwiICsgcHJvamVjdHNfcGFnZU51bWJlcjtcclxuXHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0dHlwZSA6ICdHRVQnLFxyXG5cdFx0XHRcdFx0dXJsOiB1cmxQYXRoLFxyXG5cdFx0XHRcdFx0c3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHQkKFwiLmxvYWRlci5wcm9qZWN0c1wiKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdGlmKGRhdGEubGVuZ3RoID09IDApe1xyXG5cdFx0XHRcdFx0XHRcdHByb2plY3RzX2VuZE9mVGFibGUgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNwcm9qZWN0LXRhYmxlJykuYWZ0ZXIoJzxkaXYgc3R5bGU9XCJ3aWR0aDogMTBweDtoZWlnaHQ6IDEwcHg7bWFyZ2luOiAxcmVtIGF1dG87YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjA3KTtib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTEpO2JvcmRlci1yYWRpdXM6IDkwcHg7XCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNwcm9qZWN0LXRhYmxlIHRib2R5JykuYXBwZW5kKCQoZGF0YSkpO1xyXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShcIlwiLCBcIlwiLCBcIi9wcm9qZWN0cz9wYWdlPVwiICsgcHJvamVjdHNfcGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cHJvamVjdHNfcGFnZU51bWJlciArPSAxO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0JCgnI3Byb2plY3QtdGFibGUnKS5hZnRlcignPHAgc3R5bGU9XCJtYXJnaW46MXJlbSBhdXRvO3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiNlMDA7XCI+VGhlcmVcXCdzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLjwvcD4nKTtcclxuXHRcdFx0XHRcdFx0cHJvamVjdHNfYXdhaXRpbmdSZXNwb25zZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHQkKFwiLmxvYWRlci5wcm9qZWN0c1wiKS5oaWRlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdHByb2plY3RzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCQoXCIubG9hZGVyLnByb2plY3RzXCIpLmhpZGUoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKFwiLmxvYWRlci5wcm9qZWN0c1wiKS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuXHJcblxyXG5pZigkKCcjdXNlci1hZ2VudC10YWJsZScpLmxlbmd0aCA+IDApe1xyXG5cdHZhciBhZ2VudHNfcGFnZU51bWJlciA9IDIsXHJcblx0XHRhZ2VudHNfZW5kT2ZUYWJsZSA9IGZhbHNlLFxyXG5cdFx0YWdlbnRzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSA9PSAkKGRvY3VtZW50KS5oZWlnaHQoKSkge1xyXG5cdFx0XHRpZighYWdlbnRzX2VuZE9mVGFibGUgJiYgIWFnZW50c19hd2FpdGluZ1Jlc3BvbnNlKXtcclxuXHRcdFx0XHQkKFwiLmxvYWRlci51c2VyLWFnZW50XCIpLnNob3coKTtcclxuXHRcdFx0XHRhZ2VudHNfYXdhaXRpbmdSZXNwb25zZSA9IHRydWU7XHJcblx0XHRcdFx0dmFyIHVybFBhdGggPSBcIi9zeXN0ZW0vdXNlci1hZ2VudD9wYXJ0aWFsPXRydWU/cGFnZT1cIiArIGFnZW50c19wYWdlTnVtYmVyO1xyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlIDogJ0dFVCcsXHJcblx0XHRcdFx0XHR1cmw6IHVybFBhdGgsXHJcblx0XHRcdFx0XHRzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdCQoXCIubG9hZGVyLnVzZXItYWdlbnRcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoZGF0YS5sZW5ndGggPT0gMCl7XHJcblx0XHRcdFx0XHRcdFx0YWdlbnRzX2VuZE9mVGFibGUgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyN1c2VyLWFnZW50LXRhYmxlJykuYWZ0ZXIoJzxkaXYgc3R5bGU9XCJ3aWR0aDogMTBweDtoZWlnaHQ6IDEwcHg7bWFyZ2luOiAxcmVtIGF1dG87YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjA3KTtib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTEpO2JvcmRlci1yYWRpdXM6IDkwcHg7XCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdCQoJyN1c2VyLWFnZW50LXRhYmxlIHRib2R5JykuYXBwZW5kKCQoZGF0YSkpO1xyXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShcIlwiLCBcIlwiLCBcIi9zeXN0ZW0vdXNlci1hZ2VudD9wYWdlPVwiICsgYWdlbnRzX3BhZ2VOdW1iZXIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRhZ2VudHNfcGFnZU51bWJlciArPSAxO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0JCgnI3VzZXItYWdlbnQtdGFibGUnKS5hZnRlcignPHAgc3R5bGU9XCJtYXJnaW46MXJlbSBhdXRvO3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiNlMDA7XCI+VGhlcmVcXCdzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLjwvcD4nKTtcclxuXHRcdFx0XHRcdFx0YWdlbnRzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0YWdlbnRzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCQoXCIubG9hZGVyLnVzZXItYWdlbnRcIikuaGlkZSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQoXCIubG9hZGVyLnVzZXItYWdlbnRcIikuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCA3LiBTVVBFUlZJU09SXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8vIEFjY2VwdCBvciBSZWplY3QgU3R1ZGVudFxyXG4kKCcuc3VwZXJ2aXNvci10YWJsZSAub2ZmZXItYWN0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIGFjdGlvbkJ1dHRvbiA9ICQodGhpcyk7XHJcblx0dmFyIGFjdGlvblR5cGUgPSBhY3Rpb25CdXR0b24uZGF0YSgnYWN0aW9uLXR5cGUnKTtcclxuXHR2YXIgdGFibGVSb3cgPSBhY3Rpb25CdXR0b24ucGFyZW50cygpLmVxKDEpO1xyXG5cdHZhciBzdHVkZW50X2lkID0gdGFibGVSb3cuZGF0YSgnc3R1ZGVudC1pZCcpO1xyXG5cclxuXHRhY3Rpb25CdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdCQoJy5sb2FkZXInLCBhY3Rpb25CdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRpZihhY3Rpb25UeXBlID09PSBcImFjY2VwdFwiKXtcclxuXHRcdHZhciBhamF4VXJsID0gJy9zdXBlcnZpc29yL3N0dWRlbnQtYWNjZXB0JztcclxuXHR9IGVsc2UgaWYgKGFjdGlvblR5cGUgPT09IFwicmVqZWN0XCIpe1xyXG5cdFx0dmFyIGFqYXhVcmwgPSAnL3N1cGVydmlzb3Ivc3R1ZGVudC1yZWplY3QnO1xyXG5cdH1cclxuXHJcblx0aWYoYWpheFVybCA9PSBudWxsKXtcclxuXHRcdGNvbnNvbGUubG9nKFwiSW52YWxpZCBzdXBlcnZpc29yIGFjdGlvbi5cIik7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHN0dWRlbnRfaWQgOiBzdHVkZW50X2lkXHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdHRhYmxlUm93LmhpZGUoNDAwLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR0YWJsZVJvdy5yZW1vdmUoKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmKGFjdGlvblR5cGUgPT09IFwiYWNjZXB0XCIpe1xyXG5cdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJycsICdTdHVkZW50IGhhcyBiZWVuIGFjY2VwdGVkLicpO1xyXG5cdFx0XHRcdC8vIHRvZG86IGFkZCB0byB0aGluZ3kgdG8gdGFibGVcclxuXHRcdFx0XHQvLyB0b2RvOiBtYXliZSBwaHAgdGhhdCByZWZyZXNoZXMgdGFibGUgaW5zdGVhZFxyXG5cdFx0XHRcdC8vICQoXCIjc3VwZXJ2aXNvci1hY2NlcHRlZC1zdHVkZW50cy10YWJsZSB0Ym9keVwiKS5wcmVwZW5kKCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoYWN0aW9uVHlwZSA9PT0gXCJyZWplY3RcIil7XHJcblx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignJywgJ1N0dWRlbnQgaGFzIGJlZW4gcmVqZWN0ZWQuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGFjdGlvbkJ1dHRvbi5odG1sKGFjdGlvblR5cGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoJyNkZWxldGVQcm9qZWN0QnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuZGVsZXRlUHJvamVjdCgkKCcjdGl0bGUnKS52YWwoKSk7XHJcbn0pO1xyXG5cclxuJCgnI3N0dWRlbnQtZWRpdC1saXN0JykuZmluZCgnLmNoZWNrYm94IGlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBzdGF0dXMgPSAkKHRoaXMpLnBhcmVudHMoKS5lcSgzKS5kYXRhKCdzdGF0dXMnKTtcclxuXHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcjc3R1ZGVudC1lZGl0LWxpc3QuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHR2YXIgZW1haWxCdXR0b25zZWxlY3RvciA9IFwiLmVtYWlsLXNlbGVjdGVkLlwiICsgc3RhdHVzO1xyXG5cdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cdFx0XHRlbWFpbFN0cmluZyArPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxufSk7XHJcblxyXG4kKCcuZWRpdC1zdHVkZW50LWxpc3QgLmVtYWlsLXNlbGVjdGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicpe1xyXG5cdFx0YWxlcnQoXCJZb3UgaGF2ZW4ndCBzZWxlY3RlZCBhbnlvbmUuXCIpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0IDguIE9USEVSXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuJCgnLnNob3ctbW9yZScpLm9uKCdjbGljaycsICBmdW5jdGlvbihlKSB7XHJcblx0JCh0aGlzKS5oaWRlKCk7XHJcblx0JCgnLnByb2plY3QnKS5hZGRDbGFzcygnZXhwYW5kJyk7XHJcbn0pO1xyXG5cclxuLy8gTWFrZXMgcHJpbWFyeSB0b3BpYyBmaXJzdFxyXG4kKFwiLnRvcGljcy1saXN0XCIpLnByZXBlbmQoJChcIi5maXJzdFwiKSk7XHJcblxyXG4vLyBTVVBFUlZJU09SXHJcbiQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdCQoJy5oZWxwLWJsb2NrJywgJyNsb2dpbkZvcm0nKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oc2hvd0RpYWxvZyl7XHJcblx0XHRcdGlmKHNob3dEaWFsb2cgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5DSEFOR0VfQVVUSF9ESUFMT0cpWzBdLmRpYWxvZy5pc0Nsb3NhYmxlID0gZmFsc2U7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkNIQU5HRV9BVVRIX0RJQUxPRylbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnNob3coKTtcclxuXHRcdFx0JCgnLmZvcm0tZmllbGQnLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmFkZENsYXNzKFwiaGFzLWVycm9yXCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdHZhciBzdWJtaXRCdXR0b24gPSAkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKTtcclxuXHRzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdCQoJy5sb2FkZXInLCBzdWJtaXRCdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0dHlwZTonUE9TVCcsXHJcblx0XHRjb250ZXh0OiAkKHRoaXMpLFxyXG5cdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucy5jcmVhdGVFZGl0VG9waWNET00oZGF0YVtcImlkXCJdLCBkYXRhW1wibmFtZVwiXSk7XHJcblx0XHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKCkge31cclxuXHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHRcdCQodGhpcykuZmluZCgnOnN1Ym1pdCcpLmh0bWwoJ0FkZCcpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbi8vIFVzZWQgZm9yIHRyYW5zYWN0aW9uc1xyXG4kKCcjc2hvdy1yYXctdGFibGUtZGF0YScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdGlmKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKXtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuaGlkZSgpO1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgndGFibGUuZnVsbC1kZXRhaWwnKS5zaG93KCk7XHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBORVcgVVNFUlxyXG4vLyBwdXQgdGhpcyBzdHVmZiBpbiBhbiBhcnJheVxyXG4kKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRpZigkKCcjc3R1ZGVudC1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNhZG1pbi1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBTVFJJTkdTXHJcbiQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG4kKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdGlmKCQoJyNzdHVkZW50LW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI2FkbWluLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT1cclxuXHQ5LiBJbml0aWFsaXNlXHJcbiAgID09PT09PT09PT09PT09PSAqL1xyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkRpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cclxuLy8gRU5EIE9GIEZJTEVcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5hamF4RXJyb3IoZnVuY3Rpb24oIGV2ZW50LCByZXF1ZXN0LCBzZXR0aW5ncyApIHtcclxuXHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoYXQgcmVxdWVzdC4nKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzaG93Tm90aWZpY2F0aW9uKHR5cGUsIG1lc3NhZ2Upe1xyXG5cdHZhciBub3RpZmljYXRpb24gPSAkKCcubm90aWZpY2F0aW9uJyk7XHJcblx0bm90aWZpY2F0aW9uLmFkZENsYXNzKHR5cGUpO1xyXG5cdCQobm90aWZpY2F0aW9uKS5odG1sKFwiPHA+XCIgKyBtZXNzYWdlICsgXCI8L3A+XCIpO1xyXG5cdG5vdGlmaWNhdGlvbi5zaG93KCk7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRub3RpZmljYXRpb24uaGlkZSgwKTtcclxuXHR9LCAzMDAwKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanMiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkRyYWdnYWJsZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEcmFnZ2FibGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRHJhZ2dhYmxlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDU3KTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OSk7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IF9fd2VicGFja19yZXF1aXJlX18oNDYpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oOTApO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk0KTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Nik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuLyoqKi8gfSksXG4vKiA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTgpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9BYnN0cmFjdEV2ZW50Mi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHN0b3JlICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMilcbiAgLCBTeW1ib2wgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuLyoqKi8gfSksXG4vKiA4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBhbk9iamVjdCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKVxuICAsIHRvUHJpbWl0aXZlICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSkgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuLyoqKi8gfSksXG4vKiA5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcxKVxuICAsIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDEwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgY29yZSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KVxuICAsIGN0eCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpXG4gICwgaGlkZSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuLyoqKi8gfSksXG4vKiAxMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cbi8qKiovIH0pLFxuLyogMTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRQICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpXG4gICwgY3JlYXRlRGVzYyA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cbi8qKiovIH0pLFxuLyogMTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cbi8qKiovIH0pLFxuLyogMTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuc2Nyb2xsID0gZXhwb3J0cy5jbG9zZXN0ID0gdW5kZWZpbmVkO1xuXG52YXIgX2Nsb3Nlc3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk3KTtcblxudmFyIF9jbG9zZXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Nsb3Nlc3QpO1xuXG52YXIgX3Njcm9sbCA9IF9fd2VicGFja19yZXF1aXJlX18oMTA4KTtcblxudmFyIF9zY3JvbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Nyb2xsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5jbG9zZXN0ID0gX2Nsb3Nlc3QyLmRlZmF1bHQ7XG5leHBvcnRzLnNjcm9sbCA9IF9zY3JvbGwyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG4vKioqLyB9KSxcbi8qIDE3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDE4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiAxOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1NlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oNjMpO1xuXG52YXIgX1NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZW5zb3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfU2Vuc29yMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDIwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5cbi8qKiovIH0pLFxuLyogMjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKVxuICAsIGVudW1CdWdLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMjIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMjMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5OSk7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59O1xuXG4vKioqLyB9KSxcbi8qIDI0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfU2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExMCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU2Vuc29yRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU2Vuc29yRXZlbnQuU2Vuc29yRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnU3RhcnRTZW5zb3JFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TZW5zb3JFdmVudC5EcmFnU3RhcnRTZW5zb3JFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdNb3ZlU2Vuc29yRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdTdG9wU2Vuc29yRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdQcmVzc3VyZVNlbnNvckV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NlbnNvckV2ZW50LkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50O1xuICB9XG59KTtcblxuLyoqKi8gfSksXG4vKiAyNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5NaXJyb3IgPSBleHBvcnRzLkFjY2Vzc2liaWxpdHkgPSB1bmRlZmluZWQ7XG5cbnZhciBfRHJhZ2dhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjgpO1xuXG52YXIgX0RyYWdnYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EcmFnZ2FibGUpO1xuXG52YXIgX1BsdWdpbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU1KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5BY2Nlc3NpYmlsaXR5ID0gX1BsdWdpbnMuQWNjZXNzaWJpbGl0eTtcbmV4cG9ydHMuTWlycm9yID0gX1BsdWdpbnMuTWlycm9yO1xuZXhwb3J0cy5kZWZhdWx0ID0gX0RyYWdnYWJsZTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAyNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYyKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cbi8qKiovIH0pLFxuLyogMjcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMjggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDI5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuLyoqKi8gfSksXG4vKiAzMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRydWU7XG5cbi8qKiovIH0pLFxuLyogMzEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuICAsIGRQcyAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MClcbiAgLCBlbnVtQnVnS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMzUpXG4gICwgSUVfUFJPVE8gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMzKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDQpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDc0KS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDMyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHNoYXJlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpKCdrZXlzJylcbiAgLCB1aWQgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDM1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG4vKioqLyB9KSxcbi8qIDM2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLmZcbiAgLCBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuICAsIFRBRyA9IF9fd2VicGFja19yZXF1aXJlX18oNikoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuZXhwb3J0cy5mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxuLyoqKi8gfSksXG4vKiAzOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgY29yZSAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpXG4gICwgTElCUkFSWSAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKVxuICAsIHdrc0V4dCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOClcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oOCkuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwge3ZhbHVlOiB3a3NFeHQuZihuYW1lKX0pO1xufTtcblxuLyoqKi8gfSksXG4vKiA0MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5leHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqKi8gfSksXG4vKiA0MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgcElFICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKVxuICAsIGNyZWF0ZURlc2MgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOClcbiAgLCB0b0lPYmplY3QgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjcpXG4gICwgaGFzICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuICAsIElFOF9ET01fREVGSU5FID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MylcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0Mik7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2dldE93blByb3BlcnR5RGVzY3JpcHRvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTQ1KTtcblxudmFyIF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGRlc2MgPSAoMCwgX2dldE93blByb3BlcnR5RGVzY3JpcHRvcjIuZGVmYXVsdCkob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShvYmplY3QpO1xuXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7XG4gICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O1xuXG4gICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogNDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSAhX193ZWJwYWNrX3JlcXVpcmVfXygxMSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18oMTcpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX3JlcXVpcmVfXyg0NCkoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cbi8qKiovIH0pLFxuLyogNDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNilcbiAgLCBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRm9yY2VUb3VjaFNlbnNvciA9IGV4cG9ydHMuRHJhZ1NlbnNvciA9IGV4cG9ydHMuVG91Y2hTZW5zb3IgPSBleHBvcnRzLk1vdXNlU2Vuc29yID0gZXhwb3J0cy5TZW5zb3IgPSB1bmRlZmluZWQ7XG5cbnZhciBfU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlbnNvcik7XG5cbnZhciBfTW91c2VTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY0KTtcblxudmFyIF9Nb3VzZVNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Nb3VzZVNlbnNvcik7XG5cbnZhciBfVG91Y2hTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExMSk7XG5cbnZhciBfVG91Y2hTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG91Y2hTZW5zb3IpO1xuXG52YXIgX0RyYWdTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExMyk7XG5cbnZhciBfRHJhZ1NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EcmFnU2Vuc29yKTtcblxudmFyIF9Gb3JjZVRvdWNoU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTUpO1xuXG52YXIgX0ZvcmNlVG91Y2hTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRm9yY2VUb3VjaFNlbnNvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuU2Vuc29yID0gX1NlbnNvcjIuZGVmYXVsdDtcbmV4cG9ydHMuTW91c2VTZW5zb3IgPSBfTW91c2VTZW5zb3IyLmRlZmF1bHQ7XG5leHBvcnRzLlRvdWNoU2Vuc29yID0gX1RvdWNoU2Vuc29yMi5kZWZhdWx0O1xuZXhwb3J0cy5EcmFnU2Vuc29yID0gX0RyYWdTZW5zb3IyLmRlZmF1bHQ7XG5leHBvcnRzLkZvcmNlVG91Y2hTZW5zb3IgPSBfRm9yY2VUb3VjaFNlbnNvcjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA0NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Nik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IF9fd2VicGFja19yZXF1aXJlX18oNzkpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTtcblxuLyoqKi8gfSksXG4vKiA0NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyICRhdCAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY4KSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxuX193ZWJwYWNrX3JlcXVpcmVfXyg0OCkoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7XG5cbi8qKiovIH0pLFxuLyogNDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBMSUJSQVJZICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzApXG4gICwgJGV4cG9ydCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKVxuICAsIHJlZGVmaW5lICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OSlcbiAgLCBoaWRlICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpXG4gICwgaGFzICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcbiAgLCAkaXRlckNyZWF0ZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNjkpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM2KVxuICAsIGdldFByb3RvdHlwZU9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MilcbiAgLCBJVEVSQVRPUiAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNikoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQ5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cbi8qKiovIH0pLFxuLyogNTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGhhcyAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpXG4gICwgdG9JT2JqZWN0ICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIGFycmF5SW5kZXhPZiA9IF9fd2VicGFja19yZXF1aXJlX18oNzIpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqKi8gfSksXG4vKiA1MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG4vKioqLyB9KSxcbi8qIDUyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuICAsIHRvT2JqZWN0ICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcbiAgLCBJRV9QUk9UTyAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuLyoqKi8gfSksXG4vKiA1MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4vKioqLyB9KSxcbi8qIDU0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MClcbiAgLCBoaWRkZW5LZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNSkuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQWNjZXNzaWJpbGl0eSA9IGV4cG9ydHMuZGVmYXVsdE1pcnJvck9wdGlvbiA9IGV4cG9ydHMuTWlycm9yID0gdW5kZWZpbmVkO1xuXG52YXIgX01pcnJvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTI5KTtcblxudmFyIF9NaXJyb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTWlycm9yKTtcblxudmFyIF9BY2Nlc3NpYmlsaXR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzIpO1xuXG52YXIgX0FjY2Vzc2liaWxpdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWNjZXNzaWJpbGl0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuTWlycm9yID0gX01pcnJvcjIuZGVmYXVsdDtcbmV4cG9ydHMuZGVmYXVsdE1pcnJvck9wdGlvbiA9IF9NaXJyb3IuZGVmYXVsdE1pcnJvck9wdGlvbjtcbmV4cG9ydHMuQWNjZXNzaWJpbGl0eSA9IF9BY2Nlc3NpYmlsaXR5Mi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDU2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKVxuICAsIGNvcmUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpXG4gICwgZmFpbHMgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcblxuLyoqKi8gfSksXG4vKiA1NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Tb3J0YWJsZSA9IGV4cG9ydHMuU3dhcHBhYmxlID0gZXhwb3J0cy5Ecm9wcGFibGUgPSBleHBvcnRzLkRyYWdnYWJsZSA9IGV4cG9ydHMuUGx1Z2lucyA9IGV4cG9ydHMuU2Vuc29ycyA9IGV4cG9ydHMuQmFzZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudCk7XG5cbnZhciBfU2Vuc29ycyA9IF9fd2VicGFja19yZXF1aXJlX18oNDUpO1xuXG52YXIgU2Vuc29ycyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9TZW5zb3JzKTtcblxudmFyIF9QbHVnaW5zID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTcpO1xuXG52YXIgUGx1Z2lucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9QbHVnaW5zKTtcblxudmFyIF9EcmFnZ2FibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxudmFyIF9EcmFnZ2FibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJhZ2dhYmxlKTtcblxudmFyIF9Ecm9wcGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0MCk7XG5cbnZhciBfRHJvcHBhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Ryb3BwYWJsZSk7XG5cbnZhciBfU3dhcHBhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNTApO1xuXG52YXIgX1N3YXBwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Td2FwcGFibGUpO1xuXG52YXIgX1NvcnRhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNTQpO1xuXG52YXIgX1NvcnRhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnRhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5CYXNlRXZlbnQgPSBfQWJzdHJhY3RFdmVudDIuZGVmYXVsdDtcbmV4cG9ydHMuU2Vuc29ycyA9IFNlbnNvcnM7XG5leHBvcnRzLlBsdWdpbnMgPSBQbHVnaW5zO1xuZXhwb3J0cy5EcmFnZ2FibGUgPSBfRHJhZ2dhYmxlMi5kZWZhdWx0O1xuZXhwb3J0cy5Ecm9wcGFibGUgPSBfRHJvcHBhYmxlMi5kZWZhdWx0O1xuZXhwb3J0cy5Td2FwcGFibGUgPSBfU3dhcHBhYmxlMi5kZWZhdWx0O1xuZXhwb3J0cy5Tb3J0YWJsZSA9IF9Tb3J0YWJsZTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA1OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQWxsIGV2ZW50cyBmaXJlZCBieSBkcmFnZ2FibGUgaW5oZXJpdCB0aGlzIGNsYXNzLiBZb3UgY2FuIGNhbGwgYGNhbmNlbCgpYCB0b1xuICogY2FuY2VsIGEgc3BlY2lmaWMgZXZlbnQgb3IgeW91IGNhbiBjaGVjayBpZiBhbiBldmVudCBoYXMgYmVlbiBjYW5jZWxlZCBieVxuICogY2FsbGluZyBgY2FuY2VsZWQoKWAuXG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBBYnN0cmFjdEV2ZW50XG4gKiBAbW9kdWxlIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIEFic3RyYWN0RXZlbnQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIEV2ZW50IHR5cGVcbiAgICogQHN0YXRpY1xuICAgKiBAYWJzdHJhY3RcbiAgICogQHByb3BlcnR5IHR5cGVcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIEFic3RyYWN0RXZlbnQoZGF0YSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEFic3RyYWN0RXZlbnQpO1xuXG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWQtb25seSB0eXBlXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIEV2ZW50IGNhbmNlbGFibGVcbiAgICogQHN0YXRpY1xuICAgKiBAYWJzdHJhY3RcbiAgICogQHByb3BlcnR5IGNhbmNlbGFibGVcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQWJzdHJhY3RFdmVudCwgW3tcbiAgICBrZXk6ICdjYW5jZWwnLFxuXG5cbiAgICAvKipcbiAgICAgKiBDYW5jZWxzIHRoZSBldmVudCBpbnN0YW5jZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICB0aGlzLl9jYW5jZWxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgZXZlbnQgaGFzIGJlZW4gY2FuY2VsZWRcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjYW5jZWxlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhbmNlbGVkKCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5fY2FuY2VsZWQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3R5cGUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkLW9ubHkgY2FuY2VsYWJsZVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NhbmNlbGFibGUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY2FuY2VsYWJsZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEFic3RyYWN0RXZlbnQ7XG59KCk7XG5cbkFic3RyYWN0RXZlbnQudHlwZSA9ICdldmVudCc7XG5BYnN0cmFjdEV2ZW50LmNhbmNlbGFibGUgPSBmYWxzZTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFic3RyYWN0RXZlbnQ7XG5cbi8qKiovIH0pLFxuLyogNTkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDYwKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDYwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oNjEpO1xudmFyICRPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuLyoqKi8gfSksXG4vKiA2MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIV9fd2VicGFja19yZXF1aXJlX18oMTEpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLmZ9KTtcblxuLyoqKi8gfSksXG4vKiA2MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuLyoqKi8gfSksXG4vKiA2MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBzZW5zb3IgY2xhc3MuIEV4dGVuZCBmcm9tIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbmV3IG9yIGN1c3RvbSBzZW5zb3JcbiAqIEBjbGFzcyBTZW5zb3JcbiAqIEBtb2R1bGUgU2Vuc29yXG4gKi9cbnZhciBTZW5zb3IgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIFNlbnNvciBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgU2Vuc29yXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTZW5zb3IpO1xuXG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGNvbnRhaW5lcnNcbiAgICAgKiBAcHJvcGVydHkgY29udGFpbmVyc1xuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIHRoaXMuY29udGFpbmVycyA9IGNvbnRhaW5lcnM7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IG9wdGlvbnNcbiAgICAgKiBAcHJvcGVydHkgb3B0aW9uc1xuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGRyYWcgc3RhdGVcbiAgICAgKiBAcHJvcGVydHkgZHJhZ2dpbmdcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGNvbnRhaW5lclxuICAgICAqIEBwcm9wZXJ0eSBjdXJyZW50Q29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgKiBAcmV0dXJuIHtTZW5zb3J9XG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU2Vuc29yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICAgKiBAcmV0dXJuIHtTZW5zb3J9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGV2ZW50IG9uIHRhcmdldCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIEVsZW1lbnQgdG8gdHJpZ2dlciBldmVudCBvblxuICAgICAqIEBwYXJhbSB7U2Vuc29yRXZlbnR9IHNlbnNvckV2ZW50IC0gU2Vuc29yIGV2ZW50IHRvIHRyaWdnZXJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndHJpZ2dlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIoZWxlbWVudCwgc2Vuc29yRXZlbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgZXZlbnQuZGV0YWlsID0gc2Vuc29yRXZlbnQ7XG4gICAgICBldmVudC5pbml0RXZlbnQoc2Vuc29yRXZlbnQudHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgdGhpcy5sYXN0RXZlbnQgPSBzZW5zb3JFdmVudDtcbiAgICAgIHJldHVybiBzZW5zb3JFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNlbnNvcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vuc29yO1xuXG4vKioqLyB9KSxcbi8qIDY0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfTW91c2VTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY1KTtcblxudmFyIF9Nb3VzZVNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Nb3VzZVNlbnNvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Nb3VzZVNlbnNvcjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA2NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG52YXIgX1NlbnNvcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9TZW5zb3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Vuc29yMik7XG5cbnZhciBfU2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uQ29udGV4dE1lbnVXaGlsZURyYWdnaW5nID0gU3ltYm9sKCdvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZycpO1xudmFyIG9uTW91c2VEb3duID0gU3ltYm9sKCdvbk1vdXNlRG93bicpO1xudmFyIG9uTW91c2VNb3ZlID0gU3ltYm9sKCdvbk1vdXNlTW92ZScpO1xudmFyIG9uTW91c2VVcCA9IFN5bWJvbCgnb25Nb3VzZVVwJyk7XG5cbi8qKlxuICogVGhpcyBzZW5zb3IgcGlja3MgdXAgbmF0aXZlIGJyb3dzZXIgbW91c2UgZXZlbnRzIGFuZCBkaWN0YXRlcyBkcmFnIG9wZXJhdGlvbnNcbiAqIEBjbGFzcyBNb3VzZVNlbnNvclxuICogQG1vZHVsZSBNb3VzZVNlbnNvclxuICogQGV4dGVuZHMgU2Vuc29yXG4gKi9cblxudmFyIE1vdXNlU2Vuc29yID0gZnVuY3Rpb24gKF9TZW5zb3IpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTW91c2VTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIC8qKlxuICAgKiBNb3VzZVNlbnNvciBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgTW91c2VTZW5zb3JcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gQ29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIE1vdXNlU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTW91c2VTZW5zb3IpO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGlmIG1vdXNlIGJ1dHRvbiBpcyBzdGlsbCBkb3duXG4gICAgICogQHByb3BlcnR5IG1vdXNlRG93blxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1vdXNlU2Vuc29yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW91c2VTZW5zb3IpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogTW91c2UgZG93biB0aW1lciB3aGljaCB3aWxsIGVuZCB1cCB0cmlnZ2VyaW5nIHRoZSBkcmFnIHN0YXJ0IG9wZXJhdGlvblxuICAgICAqIEBwcm9wZXJ0eSBtb3VzZURvd25UaW1lb3V0XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBfdGhpcy5tb3VzZURvd25UaW1lb3V0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBpZiBjb250ZXh0IG1lbnUgaGFzIGJlZW4gb3BlbmVkIGR1cmluZyBkcmFnIG9wZXJhdGlvblxuICAgICAqIEBwcm9wZXJ0eSBvcGVuZWRDb250ZXh0TWVudVxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIF90aGlzLm9wZW5lZENvbnRleHRNZW51ID0gZmFsc2U7XG5cbiAgICBfdGhpc1tvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZ10gPSBfdGhpc1tvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZ10uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZURvd25dID0gX3RoaXNbb25Nb3VzZURvd25dLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VNb3ZlXSA9IF90aGlzW29uTW91c2VNb3ZlXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlVXBdID0gX3RoaXNbb25Nb3VzZVVwXS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE1vdXNlU2Vuc29yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBkb3duIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZG93biBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VEb3duLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmIChldmVudC5idXR0b24gIT09IDAgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXNbb25Nb3VzZVVwXSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBwcmV2ZW50TmF0aXZlRHJhZ1N0YXJ0KTtcblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB2YXIgY29udGFpbmVyID0gKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIHRoaXMuY29udGFpbmVycyk7XG5cbiAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5tb3VzZURvd25UaW1lb3V0KTtcbiAgICAgIHRoaXMubW91c2VEb3duVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIV90aGlzMi5tb3VzZURvd24pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnU3RhcnRFdmVudCk7XG5cbiAgICAgICAgX3RoaXMyLmN1cnJlbnRDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIF90aGlzMi5kcmFnZ2luZyA9ICFkcmFnU3RhcnRFdmVudC5jYW5jZWxlZCgpO1xuXG4gICAgICAgIGlmIChfdGhpczIuZHJhZ2dpbmcpIHtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIF90aGlzMltvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZ10pO1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIF90aGlzMltvbk1vdXNlTW92ZV0pO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIG1vdmUgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBtb3ZlIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZU1vdmUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ01vdmVFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgdXAgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSB1cCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VVcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHRoaXMubW91c2VEb3duID0gQm9vbGVhbih0aGlzLm9wZW5lZENvbnRleHRNZW51KTtcblxuICAgICAgaWYgKHRoaXMub3BlbmVkQ29udGV4dE1lbnUpIHtcbiAgICAgICAgdGhpcy5vcGVuZWRDb250ZXh0TWVudSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgcHJldmVudE5hdGl2ZURyYWdTdGFydCk7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzW29uQ29udGV4dE1lbnVXaGlsZURyYWdnaW5nXSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzW29uTW91c2VNb3ZlXSk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udGV4dCBtZW51IGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQ29udGV4dCBtZW51IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Db250ZXh0TWVudVdoaWxlRHJhZ2dpbmcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5vcGVuZWRDb250ZXh0TWVudSA9IHRydWU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNb3VzZVNlbnNvcjtcbn0oX1NlbnNvcjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1vdXNlU2Vuc29yO1xuXG5cbmZ1bmN0aW9uIHByZXZlbnROYXRpdmVEcmFnU3RhcnQoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuLyoqKi8gfSksXG4vKiA2NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oNjcpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogNjcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg0Nyk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDc1KTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOCkuZignaXRlcmF0b3InKTtcblxuLyoqKi8gfSksXG4vKiA2OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOClcbiAgLCBkZWZpbmVkICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cbi8qKiovIH0pLFxuLyogNjkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjcmVhdGUgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzEpXG4gICwgZGVzY3JpcHRvciAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KVxuICAsIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNilcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxuX193ZWJwYWNrX3JlcXVpcmVfXygxMykoSXRlcmF0b3JQcm90b3R5cGUsIF9fd2VicGFja19yZXF1aXJlX18oNikoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDcwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBkUCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOClcbiAgLCBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG4gICwgZ2V0S2V5cyAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuXG4vKioqLyB9KSxcbi8qIDcxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMik7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDcyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIHRvTGVuZ3RoICA9IF9fd2VicGFja19yZXF1aXJlX18oNTEpXG4gICwgdG9JbmRleCAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3Myk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG4vKioqLyB9KSxcbi8qIDczICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciB0b0ludGVnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuLyoqKi8gfSksXG4vKiA3NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4vKioqLyB9KSxcbi8qIDc1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oNzYpO1xudmFyIGdsb2JhbCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgaGlkZSAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpXG4gICwgSXRlcmF0b3JzICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG4gICwgVE9fU1RSSU5HX1RBRyA9IF9fd2VicGFja19yZXF1aXJlX18oNikoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cbi8qKiovIH0pLFxuLyogNzYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3NylcbiAgLCBzdGVwICAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3OClcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcbiAgLCB0b0lPYmplY3QgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ4KShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuLyoqKi8gfSksXG4vKiA3NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07XG5cbi8qKiovIH0pLFxuLyogNzggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuLyoqKi8gfSksXG4vKiA3OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oODApLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogODAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg4MSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDg3KTtcbl9fd2VicGFja19yZXF1aXJlX18oODgpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyg4OSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNCkuU3ltYm9sO1xuXG4vKioqLyB9KSxcbi8qIDgxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG4gICwgaGFzICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuICAsIERFU0NSSVBUT1JTICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSlcbiAgLCAkZXhwb3J0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTApXG4gICwgcmVkZWZpbmUgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ5KVxuICAsIE1FVEEgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MikuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KVxuICAsIHNoYXJlZCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNClcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpXG4gICwgdWlkICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxuICAsIHdrcyAgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KVxuICAsIHdrc0V4dCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOClcbiAgLCB3a3NEZWZpbmUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG4gICwga2V5T2YgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgzKVxuICAsIGVudW1LZXlzICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NClcbiAgLCBpc0FycmF5ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oODUpXG4gICwgYW5PYmplY3QgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuICAsIHRvSU9iamVjdCAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIHRvUHJpbWl0aXZlICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNylcbiAgLCBjcmVhdGVEZXNjICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpXG4gICwgX2NyZWF0ZSAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKVxuICAsIGdPUE5FeHQgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NilcbiAgLCAkR09QRCAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDEpXG4gICwgJERQICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpXG4gICwgJGtleXMgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgVE9fUFJJTUlUSVZFICAgPSB3a3MoJ3RvUHJpbWl0aXZlJylcbiAgLCBpc0VudW0gICAgICAgICA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIE9QU3ltYm9scyAgICAgID0gc2hhcmVkKCdvcC1zeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvKSRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIGl0ICA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBJU19PUCAgPSBpdCA9PT0gT2JqZWN0UHJvdG9cbiAgICAsIG5hbWVzICA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIVVTRV9OQVRJVkUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZih0aGlzID09PSBPYmplY3RQcm90bykkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKXNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0fSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgX193ZWJwYWNrX3JlcXVpcmVfXyg1NCkuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgX193ZWJwYWNrX3JlcXVpcmVfXyg1MykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIV9fd2VicGFja19yZXF1aXJlX18oMzApKXtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24obmFtZSl7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfVxufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbmZvcih2YXIgc3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzKHN5bWJvbHNbaSsrXSk7XG5cbmZvcih2YXIgc3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3NEZWZpbmUoc3ltYm9sc1tpKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICBpZihpc1N5bWJvbChrZXkpKXJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgICB0aHJvdyBUeXBlRXJyb3Ioa2V5ICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgICAsIGkgICAgPSAxXG4gICAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZighaXNTeW1ib2wodmFsdWUpKXJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcblxuLyoqKi8gfSksXG4vKiA4MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgTUVUQSAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuICAsIGhhcyAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcbiAgLCBzZXREZXNjICA9IF9fd2VicGFja19yZXF1aXJlX18oOCkuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhX193ZWJwYWNrX3JlcXVpcmVfXygxNykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbihpdCl7XG4gIHNldERlc2MoaXQsIE1FVEEsIHt2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH19KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24oaXQpe1xuICBpZihGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6ICAgICAgTUVUQSxcbiAgTkVFRDogICAgIGZhbHNlLFxuICBmYXN0S2V5OiAgZmFzdEtleSxcbiAgZ2V0V2VhazogIGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuLyoqKi8gfSksXG4vKiA4MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2V0S2V5cyAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcbiAgLCB0b0lPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTtcblxuLyoqKi8gfSksXG4vKiA4NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuICAsIGdPUFMgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUzKVxuICAsIHBJRSAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKiovIH0pLFxuLyogODUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuLyoqKi8gfSksXG4vKiA4NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIGdPUE4gICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNTQpLmZcbiAgLCB0b1N0cmluZyAgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiA4NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cblxuLyoqKi8gfSksXG4vKiA4OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDM5KSgnYXN5bmNJdGVyYXRvcicpO1xuXG4vKioqLyB9KSxcbi8qIDg5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMzkpKCdvYnNlcnZhYmxlJyk7XG5cbi8qKiovIH0pLFxuLyogOTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDkxKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDkxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oOTIpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLk9iamVjdC5zZXRQcm90b3R5cGVPZjtcblxuLyoqKi8gfSksXG4vKiA5MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDkzKS5zZXR9KTtcblxuLyoqKi8gfSksXG4vKiA5MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuICAsIGFuT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uKHRlc3QsIGJ1Z2d5LCBzZXQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNikoRnVuY3Rpb24uY2FsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyg0MSkuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG4vKioqLyB9KSxcbi8qIDk0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg5NSksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA5NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDk2KTtcbnZhciAkT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcblxuLyoqKi8gfSksXG4vKiA5NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogX193ZWJwYWNrX3JlcXVpcmVfXygzMSl9KTtcblxuLyoqKi8gfSksXG4vKiA5NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2Nsb3Nlc3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk4KTtcblxudmFyIF9jbG9zZXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Nsb3Nlc3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfY2xvc2VzdDIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA5OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MiA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvQ29uc3VtYWJsZUFycmF5Mik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNsb3Nlc3Q7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBtYXRjaEZ1bmN0aW9uID0gRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXG5mdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIHZhbHVlKSB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIHNlbGVjdG9yID0gdmFsdWU7XG4gIHZhciBjYWxsYmFjayA9IHZhbHVlO1xuICB2YXIgbm9kZUxpc3QgPSB2YWx1ZTtcbiAgdmFyIHNpbmdsZUVsZW1lbnQgPSB2YWx1ZTtcblxuICB2YXIgaXNTZWxlY3RvciA9IEJvb2xlYW4odHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyk7XG4gIHZhciBpc0Z1bmN0aW9uID0gQm9vbGVhbih0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpO1xuICB2YXIgaXNOb2RlTGlzdCA9IEJvb2xlYW4odmFsdWUgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KTtcbiAgdmFyIGlzRWxlbWVudCA9IEJvb2xlYW4odmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCk7XG5cbiAgZnVuY3Rpb24gY29uZGl0aW9uRm4oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoIWN1cnJlbnRFbGVtZW50KSB7XG4gICAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmIChpc1NlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gbWF0Y2hGdW5jdGlvbi5jYWxsKGN1cnJlbnRFbGVtZW50LCBzZWxlY3Rvcik7XG4gICAgfSBlbHNlIGlmIChpc05vZGVMaXN0KSB7XG4gICAgICByZXR1cm4gW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKG5vZGVMaXN0KSkuaW5jbHVkZXMoY3VycmVudEVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAoaXNFbGVtZW50KSB7XG4gICAgICByZXR1cm4gc2luZ2xlRWxlbWVudCA9PT0gY3VycmVudEVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soY3VycmVudEVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICB2YXIgY3VycmVudCA9IGVsZW1lbnQ7XG5cbiAgZG8ge1xuICAgIGN1cnJlbnQgPSBjdXJyZW50LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50IHx8IGN1cnJlbnQuY29ycmVzcG9uZGluZ0VsZW1lbnQgfHwgY3VycmVudDtcbiAgICBpZiAoY29uZGl0aW9uRm4oY3VycmVudCkpIHtcbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cbiAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICB9IHdoaWxlIChjdXJyZW50ICYmIGN1cnJlbnQgIT09IGRvY3VtZW50LmJvZHkgJiYgY3VycmVudCAhPT0gZG9jdW1lbnQpO1xuXG4gIHJldHVybiBudWxsO1xufVxuXG4vKioqLyB9KSxcbi8qIDk5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXygxMDApLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogMTAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oNDcpO1xuX193ZWJwYWNrX3JlcXVpcmVfXygxMDEpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLkFycmF5LmZyb207XG5cbi8qKiovIH0pLFxuLyogMTAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY3R4ICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KVxuICAsICRleHBvcnQgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMClcbiAgLCB0b09iamVjdCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG4gICwgY2FsbCAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwMilcbiAgLCBpc0FycmF5SXRlciAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTAzKVxuICAsIHRvTGVuZ3RoICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSlcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oMTA0KVxuICAsIGdldEl0ZXJGbiAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFfX3dlYnBhY2tfcmVxdWlyZV9fKDEwNykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsIGFMZW4gICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuLyoqKi8gfSksXG4vKiAxMDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogMTAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcbiAgLCBJVEVSQVRPUiAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcblxuLyoqKi8gfSksXG4vKiAxMDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpXG4gICwgY3JlYXRlRGVzYyAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBpbmRleCwgdmFsdWUpe1xuICBpZihpbmRleCBpbiBvYmplY3QpJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG5cbi8qKiovIH0pLFxuLyogMTA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBjbGFzc29mICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwNilcbiAgLCBJVEVSQVRPUiAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMCk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNCkuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG4vKioqLyB9KSxcbi8qIDEwNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpXG4gICwgVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cbi8qKiovIH0pLFxuLyogMTA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBJVEVSQVRPUiAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyByZXR1cm4ge2RvbmU6IHNhZmUgPSB0cnVlfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuLyoqKi8gfSksXG4vKiAxMDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zY3JvbGwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwOSk7XG5cbnZhciBfc2Nyb2xsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Njcm9sbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9zY3JvbGwyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTA5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzY3JvbGw7XG52YXIgc2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIHNjcm9sbChlbGVtZW50LCBfcmVmKSB7XG4gIHZhciBjbGllbnRYID0gX3JlZi5jbGllbnRYLFxuICAgICAgY2xpZW50WSA9IF9yZWYuY2xpZW50WSxcbiAgICAgIHNwZWVkID0gX3JlZi5zcGVlZCxcbiAgICAgIHNlbnNpdGl2aXR5ID0gX3JlZi5zZW5zaXRpdml0eTtcblxuICBpZiAoc2Nyb2xsQW5pbWF0aW9uRnJhbWUpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShzY3JvbGxBbmltYXRpb25GcmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxGbigpIHtcbiAgICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIG9mZnNldFkgPSAoTWF0aC5hYnMocmVjdC5ib3R0b20gLSBjbGllbnRZKSA8PSBzZW5zaXRpdml0eSkgLSAoTWF0aC5hYnMocmVjdC50b3AgLSBjbGllbnRZKSA8PSBzZW5zaXRpdml0eSk7XG4gICAgdmFyIG9mZnNldFggPSAoTWF0aC5hYnMocmVjdC5yaWdodCAtIGNsaWVudFgpIDw9IHNlbnNpdGl2aXR5KSAtIChNYXRoLmFicyhyZWN0LmxlZnQgLSBjbGllbnRYKSA8PSBzZW5zaXRpdml0eSk7XG4gICAgZWxlbWVudC5zY3JvbGxUb3AgKz0gb2Zmc2V0WSAqIHNwZWVkO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArPSBvZmZzZXRYICogc3BlZWQ7XG4gICAgc2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsRm4pO1xuICB9XG5cbiAgc2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsRm4pO1xufVxuXG4vKioqLyB9KSxcbi8qIDExMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0b3BTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQgPSBleHBvcnRzLlNlbnNvckV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBzZW5zb3IgZXZlbnRcbiAqIEBjbGFzcyBTZW5zb3JFdmVudFxuICogQG1vZHVsZSBTZW5zb3JFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgU2Vuc29yRXZlbnQgPSBleHBvcnRzLlNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNlbnNvckV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTZW5zb3JFdmVudCwgW3tcbiAgICBrZXk6ICdvcmlnaW5hbEV2ZW50JyxcblxuXG4gICAgLyoqXG4gICAgICogT3JpZ2luYWwgYnJvd3NlciBldmVudCB0aGF0IHRyaWdnZXJlZCBhIHNlbnNvclxuICAgICAqIEBwcm9wZXJ0eSBvcmlnaW5hbEV2ZW50XG4gICAgICogQHR5cGUge0V2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vcmlnaW5hbEV2ZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZWQgY2xpZW50WCBmb3IgYm90aCB0b3VjaCBhbmQgbW91c2UgZXZlbnRzXG4gICAgICogQHByb3BlcnR5IGNsaWVudFhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjbGllbnRYJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY2xpZW50WDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemVkIGNsaWVudFkgZm9yIGJvdGggdG91Y2ggYW5kIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwcm9wZXJ0eSBjbGllbnRZXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2xpZW50WScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmNsaWVudFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplZCB0YXJnZXQgZm9yIGJvdGggdG91Y2ggYW5kIG1vdXNlIGV2ZW50c1xuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgdGhhdCBpcyBiZWhpbmQgY3Vyc29yIG9yIHRvdWNoIHBvaW50ZXJcbiAgICAgKiBAcHJvcGVydHkgdGFyZ2V0XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0YXJnZXQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS50YXJnZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udGFpbmVyIHRoYXQgaW5pdGlhdGVkIHRoZSBzZW5zb3JcbiAgICAgKiBAcHJvcGVydHkgY29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhY2twYWQgcHJlc3N1cmVcbiAgICAgKiBAcHJvcGVydHkgcHJlc3N1cmVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdwcmVzc3VyZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnByZXNzdXJlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2Vuc29yRXZlbnQ7XG59KF9BYnN0cmFjdEV2ZW50My5kZWZhdWx0KTtcblxuLyoqXG4gKiBEcmFnIHN0YXJ0IHNlbnNvciBldmVudFxuICogQGNsYXNzIERyYWdTdGFydFNlbnNvckV2ZW50XG4gKiBAbW9kdWxlIERyYWdTdGFydFNlbnNvckV2ZW50XG4gKiBAZXh0ZW5kcyBTZW5zb3JFdmVudFxuICovXG5cblxudmFyIERyYWdTdGFydFNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnU3RhcnRTZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfU2Vuc29yRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1N0YXJ0U2Vuc29yRXZlbnQsIF9TZW5zb3JFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1N0YXJ0U2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU3RhcnRTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdTdGFydFNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1N0YXJ0U2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuLyoqXG4gKiBEcmFnIG1vdmUgc2Vuc29yIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ01vdmVTZW5zb3JFdmVudFxuICogQG1vZHVsZSBEcmFnTW92ZVNlbnNvckV2ZW50XG4gKiBAZXh0ZW5kcyBTZW5zb3JFdmVudFxuICovXG5cblxuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQudHlwZSA9ICdkcmFnOnN0YXJ0JztcblxudmFyIERyYWdNb3ZlU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdNb3ZlU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnTW92ZVNlbnNvckV2ZW50LCBfU2Vuc29yRXZlbnQyKTtcblxuICBmdW5jdGlvbiBEcmFnTW92ZVNlbnNvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdNb3ZlU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnTW92ZVNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ01vdmVTZW5zb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdNb3ZlU2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuLyoqXG4gKiBEcmFnIHN0b3Agc2Vuc29yIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ1N0b3BTZW5zb3JFdmVudFxuICogQG1vZHVsZSBEcmFnU3RvcFNlbnNvckV2ZW50XG4gKiBAZXh0ZW5kcyBTZW5zb3JFdmVudFxuICovXG5cblxuRHJhZ01vdmVTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6bW92ZSc7XG5cbnZhciBEcmFnU3RvcFNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnU3RvcFNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9TZW5zb3JFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1N0b3BTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50Myk7XG5cbiAgZnVuY3Rpb24gRHJhZ1N0b3BTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RvcFNlbnNvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1N0b3BTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdTdG9wU2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RvcFNlbnNvckV2ZW50O1xufShTZW5zb3JFdmVudCk7XG5cbi8qKlxuICogRHJhZyBwcmVzc3VyZSBzZW5zb3IgZXZlbnRcbiAqIEBjbGFzcyBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudFxuICogQG1vZHVsZSBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudFxuICogQGV4dGVuZHMgU2Vuc29yRXZlbnRcbiAqL1xuXG5cbkRyYWdTdG9wU2Vuc29yRXZlbnQudHlwZSA9ICdkcmFnOnN0b3AnO1xuXG52YXIgRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9TZW5zb3JFdmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQsIF9TZW5zb3JFdmVudDQpO1xuXG4gIGZ1bmN0aW9uIERyYWdQcmVzc3VyZVNlbnNvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdQcmVzc3VyZVNlbnNvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdQcmVzc3VyZVNlbnNvckV2ZW50O1xufShTZW5zb3JFdmVudCk7XG5cbkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50LnR5cGUgPSAnZHJhZzpwcmVzc3VyZSc7XG5cbi8qKiovIH0pLFxuLyogMTExICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfVG91Y2hTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExMik7XG5cbnZhciBfVG91Y2hTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG91Y2hTZW5zb3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfVG91Y2hTZW5zb3IyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTEyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cbnZhciBfU2Vuc29yMiA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgX1NlbnNvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZW5zb3IyKTtcblxudmFyIF9TZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb25Ub3VjaFN0YXJ0ID0gU3ltYm9sKCdvblRvdWNoU3RhcnQnKTtcbnZhciBvblRvdWNoSG9sZCA9IFN5bWJvbCgnb25Ub3VjaEhvbGQnKTtcbnZhciBvblRvdWNoRW5kID0gU3ltYm9sKCdvblRvdWNoRW5kJyk7XG52YXIgb25Ub3VjaE1vdmUgPSBTeW1ib2woJ29uVG91Y2hNb3ZlJyk7XG52YXIgb25TY3JvbGwgPSBTeW1ib2woJ29uU2Nyb2xsJyk7XG5cbi8qKlxuICogQWRkcyBkZWZhdWx0IGRvY3VtZW50Lm9udG91Y2htb3ZlLiBXb3JrYXJvdW5kIGZvciBwcmV2ZW50aW5nIHNjcm9sbGluZyBvbiB0b3VjaG1vdmVcbiAqL1xuZG9jdW1lbnQub250b3VjaG1vdmUgPSBkb2N1bWVudC5vbnRvdWNobW92ZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBUaGlzIHNlbnNvciBwaWNrcyB1cCBuYXRpdmUgYnJvd3NlciB0b3VjaCBldmVudHMgYW5kIGRpY3RhdGVzIGRyYWcgb3BlcmF0aW9uc1xuICogQGNsYXNzIFRvdWNoU2Vuc29yXG4gKiBAbW9kdWxlIFRvdWNoU2Vuc29yXG4gKiBAZXh0ZW5kcyBTZW5zb3JcbiAqL1xuXG52YXIgVG91Y2hTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShUb3VjaFNlbnNvciwgX1NlbnNvcik7XG5cbiAgLyoqXG4gICAqIFRvdWNoU2Vuc29yIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBUb3VjaFNlbnNvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBDb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gVG91Y2hTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBUb3VjaFNlbnNvcik7XG5cbiAgICAvKipcbiAgICAgKiBDbG9zZXN0IHNjcm9sbGFibGUgY29udGFpbmVyIHNvIGFjY2lkZW50YWwgc2Nyb2xsIGNhbiBjYW5jZWwgbG9uZyB0b3VjaFxuICAgICAqIEBwcm9wZXJ0eSBjdXJyZW50U2Nyb2xsYWJsZVBhcmVudFxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChUb3VjaFNlbnNvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFRvdWNoU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBUaW1lb3V0SUQgZm9yIGxvbmcgdG91Y2hcbiAgICAgKiBAcHJvcGVydHkgdGFwVGltZW91dFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgX3RoaXMudGFwVGltZW91dCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiB0b3VjaE1vdmVkIGluZGljYXRlcyBpZiB0b3VjaCBoYXMgbW92ZWQgZHVyaW5nIHRhcFRpbWVvdXRcbiAgICAgKiBAcHJvcGVydHkgdG91Y2hNb3ZlZFxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIF90aGlzLnRvdWNoTW92ZWQgPSBmYWxzZTtcblxuICAgIF90aGlzW29uVG91Y2hTdGFydF0gPSBfdGhpc1tvblRvdWNoU3RhcnRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uVG91Y2hIb2xkXSA9IF90aGlzW29uVG91Y2hIb2xkXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvblRvdWNoRW5kXSA9IF90aGlzW29uVG91Y2hFbmRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uVG91Y2hNb3ZlXSA9IF90aGlzW29uVG91Y2hNb3ZlXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvblNjcm9sbF0gPSBfdGhpc1tvblNjcm9sbF0uYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShUb3VjaFNlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpc1tvblRvdWNoU3RhcnRdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzW29uVG91Y2hTdGFydF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvdWNoIHN0YXJ0IGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVG91Y2ggc3RhcnQgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvblRvdWNoU3RhcnQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgY29udGFpbmVyID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC50YXJnZXQsIHRoaXMuY29udGFpbmVycyk7XG5cbiAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpc1tvblRvdWNoTW92ZV0sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXNbb25Ub3VjaEVuZF0pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzW29uVG91Y2hFbmRdKTtcblxuICAgICAgLy8gZGV0ZWN0IGlmIGJvZHkgaXMgc2Nyb2xsaW5nIG9uIGlPU1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpc1tvblNjcm9sbF0pO1xuICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51Jywgb25Db250ZXh0TWVudSk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgICAgdGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoY29udGFpbmVyLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHQgPCBlbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXNbb25TY3JvbGxdKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50YXBUaW1lb3V0ID0gc2V0VGltZW91dCh0aGlzW29uVG91Y2hIb2xkXShldmVudCwgY29udGFpbmVyKSwgdGhpcy5vcHRpb25zLmRlbGF5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb3VjaCBob2xkIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVG91Y2ggc3RhcnQgZXZlbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXIgLSBDb250YWluZXIgZWxlbWVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uVG91Y2hIb2xkLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCwgY29udGFpbmVyKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF90aGlzMi50b3VjaE1vdmVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgICBjbGllbnRYOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgICBjbGllbnRZOiB0b3VjaC5wYWdlWSxcbiAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgICB9KTtcblxuICAgICAgICBfdGhpczIudHJpZ2dlcihjb250YWluZXIsIGRyYWdTdGFydEV2ZW50KTtcblxuICAgICAgICBfdGhpczIuZHJhZ2dpbmcgPSAhZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG91Y2ggbW92ZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRvdWNoIG1vdmUgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvblRvdWNoTW92ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHRoaXMudG91Y2hNb3ZlZCA9IHRydWU7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIENhbmNlbHMgc2Nyb2xsaW5nIHdoaWxlIGRyYWdnaW5nXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5wYWdlWCAtIHdpbmRvdy5zY3JvbGxYLCB0b3VjaC5wYWdlWSAtIHdpbmRvdy5zY3JvbGxZKTtcblxuICAgICAgdmFyIGRyYWdNb3ZlRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdNb3ZlU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgY2xpZW50WTogdG91Y2gucGFnZVksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnTW92ZUV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb3VjaCBlbmQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUb3VjaCBlbmQgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvblRvdWNoRW5kLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdGhpcy50b3VjaE1vdmVkID0gZmFsc2U7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpc1tvblRvdWNoRW5kXSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXNbb25Ub3VjaEVuZF0pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpc1tvblRvdWNoTW92ZV0sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXNbb25TY3JvbGxdKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudENvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBvbkNvbnRleHRNZW51KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzW29uU2Nyb2xsXSk7XG4gICAgICB9XG5cbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRhcFRpbWVvdXQpO1xuXG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2gucGFnZVggLSB3aW5kb3cuc2Nyb2xsWCwgdG91Y2gucGFnZVkgLSB3aW5kb3cuc2Nyb2xsWSk7XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogdG91Y2gucGFnZVgsXG4gICAgICAgIGNsaWVudFk6IHRvdWNoLnBhZ2VZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Nyb2xsIGhhbmRsZXIsIGNhbmNlbCBwb3RlbnRpYWwgZHJhZyBhbmQgYWxsb3cgc2Nyb2xsIG9uIGlPUyBvciBvdGhlciB0b3VjaCBkZXZpY2VzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvblNjcm9sbCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50YXBUaW1lb3V0KTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFRvdWNoU2Vuc29yO1xufShfU2Vuc29yMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVG91Y2hTZW5zb3I7XG5cblxuZnVuY3Rpb24gb25Db250ZXh0TWVudShldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbn1cblxuLyoqKi8gfSksXG4vKiAxMTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9EcmFnU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTQpO1xuXG52YXIgX0RyYWdTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJhZ1NlbnNvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9EcmFnU2Vuc29yMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDExNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG52YXIgX1NlbnNvcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9TZW5zb3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Vuc29yMik7XG5cbnZhciBfU2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uTW91c2VEb3duID0gU3ltYm9sKCdvbk1vdXNlRG93bicpO1xudmFyIG9uTW91c2VVcCA9IFN5bWJvbCgnb25Nb3VzZVVwJyk7XG52YXIgb25EcmFnU3RhcnQgPSBTeW1ib2woJ29uRHJhZ1N0YXJ0Jyk7XG52YXIgb25EcmFnT3ZlciA9IFN5bWJvbCgnb25EcmFnT3ZlcicpO1xudmFyIG9uRHJhZ0VuZCA9IFN5bWJvbCgnb25EcmFnRW5kJyk7XG52YXIgb25Ecm9wID0gU3ltYm9sKCdvbkRyb3AnKTtcbnZhciByZXNldCA9IFN5bWJvbCgncmVzZXQnKTtcblxuLyoqXG4gKiBUaGlzIHNlbnNvciBwaWNrcyB1cCBuYXRpdmUgYnJvd3NlciBkcmFnIGV2ZW50cyBhbmQgZGljdGF0ZXMgZHJhZyBvcGVyYXRpb25zXG4gKiBAY2xhc3MgRHJhZ1NlbnNvclxuICogQG1vZHVsZSBEcmFnU2Vuc29yXG4gKiBAZXh0ZW5kcyBTZW5zb3JcbiAqL1xuXG52YXIgRHJhZ1NlbnNvciA9IGZ1bmN0aW9uIChfU2Vuc29yKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTZW5zb3IsIF9TZW5zb3IpO1xuXG4gIC8qKlxuICAgKiBEcmFnU2Vuc29yIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBEcmFnU2Vuc29yXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBEcmFnU2Vuc29yKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1NlbnNvcik7XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBkb3duIHRpbWVyIHdoaWNoIHdpbGwgZW5kIHVwIHNldHRpbmcgdGhlIGRyYWdnYWJsZSBhdHRyaWJ1dGUsIHVubGVzcyBjYW5jZWxlZFxuICAgICAqIEBwcm9wZXJ0eSBtb3VzZURvd25UaW1lb3V0XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU2Vuc29yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1NlbnNvcikpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMubW91c2VEb3duVGltZW91dCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgZWxlbWVudCBuZWVkcyB0byBiZSByZW1lbWJlcmVkIHRvIHVuc2V0IHRoZSBkcmFnZ2FibGUgYXR0cmlidXRlIGFmdGVyIGRyYWcgb3BlcmF0aW9uIGhhcyBjb21wbGV0ZWRcbiAgICAgKiBAcHJvcGVydHkgZHJhZ2dhYmxlRWxlbWVudFxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBfdGhpcy5kcmFnZ2FibGVFbGVtZW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIE5hdGl2ZSBkcmFnZ2FibGUgZWxlbWVudCBjb3VsZCBiZSBsaW5rcyBvciBpbWFnZXMsIHRoZWlyIGRyYWdnYWJsZSBzdGF0ZSB3aWxsIGJlIGRpc2FibGVkIGR1cmluZyBkcmFnIG9wZXJhdGlvblxuICAgICAqIEBwcm9wZXJ0eSBuYXRpdmVEcmFnZ2FibGVFbGVtZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIF90aGlzLm5hdGl2ZURyYWdnYWJsZUVsZW1lbnQgPSBudWxsO1xuXG4gICAgX3RoaXNbb25Nb3VzZURvd25dID0gX3RoaXNbb25Nb3VzZURvd25dLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VVcF0gPSBfdGhpc1tvbk1vdXNlVXBdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ1N0YXJ0XSA9IF90aGlzW29uRHJhZ1N0YXJ0XS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdPdmVyXSA9IF90aGlzW29uRHJhZ092ZXJdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ0VuZF0gPSBfdGhpc1tvbkRyYWdFbmRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJvcF0gPSBfdGhpc1tvbkRyb3BdLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ1NlbnNvciwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzW29uTW91c2VEb3duXSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzW29uTW91c2VEb3duXSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdGFydCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERyYWcgc3RhcnQgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdGFydCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAvLyBOZWVkIGZvciBmaXJlZm94LiBcInRleHRcIiBrZXkgaXMgbmVlZGVkIGZvciBJRVxuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnJyk7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9IHRoaXMub3B0aW9ucy50eXBlO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoZXZlbnQudGFyZ2V0LCB0aGlzLmNvbnRhaW5lcnMpO1xuXG4gICAgICBpZiAoIXRoaXMuY3VycmVudENvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgLy8gV29ya2Fyb3VuZFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi50cmlnZ2VyKF90aGlzMi5jdXJyZW50Q29udGFpbmVyLCBkcmFnU3RhcnRFdmVudCk7XG5cbiAgICAgICAgaWYgKGRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgICBfdGhpczIuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpczIuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIG92ZXIgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBEcmFnIG92ZXIgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdPdmVyLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jdXJyZW50Q29udGFpbmVyO1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnTW92ZUV2ZW50KTtcblxuICAgICAgaWYgKCFkcmFnTW92ZUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSB0aGlzLm9wdGlvbnMudHlwZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIGVuZCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERyYWcgZW5kIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnRW5kLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXNbb25Nb3VzZVVwXSwgdHJ1ZSk7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY3VycmVudENvbnRhaW5lcjtcblxuICAgICAgdmFyIGRyYWdTdG9wRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdG9wU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgdGhpc1tyZXNldF0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcm9wIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRHJvcCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJvcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBkb3duIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZG93biBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VEb3duLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIC8vIEZpcmVmb3ggYnVnIGZvciBpbnB1dHMgd2l0aGluIGRyYWdnYWJsZXMgaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NzM5MDcxXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIChldmVudC50YXJnZXQuZm9ybSB8fCBldmVudC50YXJnZXQuY29udGVudGVkaXRhYmxlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBuYXRpdmVEcmFnZ2FibGVFbGVtZW50ID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC50YXJnZXQsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmRyYWdnYWJsZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobmF0aXZlRHJhZ2dhYmxlRWxlbWVudCkge1xuICAgICAgICBuYXRpdmVEcmFnZ2FibGVFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5hdGl2ZURyYWdnYWJsZUVsZW1lbnQgPSBuYXRpdmVEcmFnZ2FibGVFbGVtZW50O1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpc1tvbk1vdXNlVXBdLCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXNbb25EcmFnU3RhcnRdLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXNbb25EcmFnT3Zlcl0sIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzW29uRHJhZ0VuZF0sIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzW29uRHJvcF0sIGZhbHNlKTtcblxuICAgICAgdmFyIHRhcmdldCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoZXZlbnQudGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcblxuICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1vdXNlRG93blRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGFyZ2V0LmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIF90aGlzMy5kcmFnZ2FibGVFbGVtZW50ID0gdGFyZ2V0O1xuICAgICAgfSwgdGhpcy5vcHRpb25zLmRlbGF5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSB1cCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIHVwIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZVVwLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICAgIHRoaXNbcmVzZXRdKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgdXAgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSB1cCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IHJlc2V0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLm1vdXNlRG93blRpbWVvdXQpO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpc1tvbk1vdXNlVXBdLCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXNbb25EcmFnU3RhcnRdLCBmYWxzZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXNbb25EcmFnT3Zlcl0sIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzW29uRHJhZ0VuZF0sIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzW29uRHJvcF0sIGZhbHNlKTtcblxuICAgICAgaWYgKHRoaXMubmF0aXZlRHJhZ2dhYmxlRWxlbWVudCkge1xuICAgICAgICB0aGlzLm5hdGl2ZURyYWdnYWJsZUVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYXRpdmVEcmFnZ2FibGVFbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlRWxlbWVudCkge1xuICAgICAgICB0aGlzLmRyYWdnYWJsZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnU2Vuc29yO1xufShfU2Vuc29yMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRHJhZ1NlbnNvcjtcblxuLyoqKi8gfSksXG4vKiAxMTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Gb3JjZVRvdWNoU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMTYpO1xuXG52YXIgX0ZvcmNlVG91Y2hTZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRm9yY2VUb3VjaFNlbnNvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Gb3JjZVRvdWNoU2Vuc29yMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDExNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9TZW5zb3IyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfU2Vuc29yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlbnNvcjIpO1xuXG52YXIgX1NlbnNvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbk1vdXNlRm9yY2VXaWxsQmVnaW4gPSBTeW1ib2woJ29uTW91c2VGb3JjZVdpbGxCZWdpbicpO1xudmFyIG9uTW91c2VGb3JjZURvd24gPSBTeW1ib2woJ29uTW91c2VGb3JjZURvd24nKTtcbnZhciBvbk1vdXNlRG93biA9IFN5bWJvbCgnb25Nb3VzZURvd24nKTtcbnZhciBvbk1vdXNlRm9yY2VDaGFuZ2UgPSBTeW1ib2woJ29uTW91c2VGb3JjZUNoYW5nZScpO1xudmFyIG9uTW91c2VNb3ZlID0gU3ltYm9sKCdvbk1vdXNlTW92ZScpO1xudmFyIG9uTW91c2VVcCA9IFN5bWJvbCgnb25Nb3VzZVVwJyk7XG52YXIgb25Nb3VzZUZvcmNlR2xvYmFsQ2hhbmdlID0gU3ltYm9sKCdvbk1vdXNlRm9yY2VHbG9iYWxDaGFuZ2UnKTtcblxuLyoqXG4gKiBUaGlzIHNlbnNvciBwaWNrcyB1cCBuYXRpdmUgZm9yY2UgdG91Y2ggZXZlbnRzIGFuZCBkaWN0YXRlcyBkcmFnIG9wZXJhdGlvbnNcbiAqIEBjbGFzcyBGb3JjZVRvdWNoU2Vuc29yXG4gKiBAbW9kdWxlIEZvcmNlVG91Y2hTZW5zb3JcbiAqIEBleHRlbmRzIFNlbnNvclxuICovXG5cbnZhciBGb3JjZVRvdWNoU2Vuc29yID0gZnVuY3Rpb24gKF9TZW5zb3IpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRm9yY2VUb3VjaFNlbnNvciwgX1NlbnNvcik7XG5cbiAgLyoqXG4gICAqIEZvcmNlVG91Y2hTZW5zb3IgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIEZvcmNlVG91Y2hTZW5zb3JcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gQ29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIEZvcmNlVG91Y2hTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBGb3JjZVRvdWNoU2Vuc29yKTtcblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBlbGVtZW50IG5lZWRzIHRvIGJlIHJlbWVtYmVyZWQgdG8gdW5zZXQgdGhlIGRyYWdnYWJsZSBhdHRyaWJ1dGUgYWZ0ZXIgZHJhZyBvcGVyYXRpb24gaGFzIGNvbXBsZXRlZFxuICAgICAqIEBwcm9wZXJ0eSBtaWdodERyYWdcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChGb3JjZVRvdWNoU2Vuc29yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRm9yY2VUb3VjaFNlbnNvcikpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMubWlnaHREcmFnID0gZmFsc2U7XG5cbiAgICBfdGhpc1tvbk1vdXNlRm9yY2VXaWxsQmVnaW5dID0gX3RoaXNbb25Nb3VzZUZvcmNlV2lsbEJlZ2luXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlRm9yY2VEb3duXSA9IF90aGlzW29uTW91c2VGb3JjZURvd25dLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VEb3duXSA9IF90aGlzW29uTW91c2VEb3duXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlRm9yY2VDaGFuZ2VdID0gX3RoaXNbb25Nb3VzZUZvcmNlQ2hhbmdlXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlTW92ZV0gPSBfdGhpc1tvbk1vdXNlTW92ZV0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZVVwXSA9IF90aGlzW29uTW91c2VVcF0uYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShGb3JjZVRvdWNoU2Vuc29yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lciA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2V3aWxsYmVnaW4nLCB0aGlzW29uTW91c2VGb3JjZVdpbGxCZWdpbl0sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZWRvd24nLCB0aGlzW29uTW91c2VGb3JjZURvd25dLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZWNoYW5nZWQnLCB0aGlzW29uTW91c2VGb3JjZUNoYW5nZV0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXNbb25Nb3VzZU1vdmVdKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdG1vdXNlZm9yY2V3aWxsYmVnaW4nLCB0aGlzW29uTW91c2VGb3JjZVdpbGxCZWdpbl0sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZWRvd24nLCB0aGlzW29uTW91c2VGb3JjZURvd25dLCBmYWxzZSk7XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZWNoYW5nZWQnLCB0aGlzW29uTW91c2VGb3JjZUNoYW5nZV0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzW29uTW91c2VNb3ZlXSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpc1tvbk1vdXNlVXBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBmb3JjZSB3aWxsIGJlZ2luIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZm9yY2Ugd2lsbCBiZWdpbiBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VGb3JjZVdpbGxCZWdpbixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm1pZ2h0RHJhZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgZm9yY2UgZG93biBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIGZvcmNlIGRvd24gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlRm9yY2VEb3duLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihjb250YWluZXIsIGRyYWdTdGFydEV2ZW50KTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9ICFkcmFnU3RhcnRFdmVudC5jYW5jZWxlZCgpO1xuICAgICAgdGhpcy5taWdodERyYWcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSB1cCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIHVwIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZVVwLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRyYWdTdG9wRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdG9wU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5taWdodERyYWcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBkb3duIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZG93biBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VEb3duLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLm1pZ2h0RHJhZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIE5lZWQgd29ya2Fyb3VuZCBmb3IgcmVhbCBjbGlja1xuICAgICAgLy8gQ2FuY2VsIHBvdGVudGlhbCBkcmFnIGV2ZW50c1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgbW92ZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIGZvcmNlIHdpbGwgYmVnaW4gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlTW92ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnTW92ZUV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBmb3JjZSBjaGFuZ2UgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBmb3JjZSBjaGFuZ2UgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlRm9yY2VDaGFuZ2UsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICB2YXIgY29udGFpbmVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgdmFyIGRyYWdQcmVzc3VyZUV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudCh7XG4gICAgICAgIHByZXNzdXJlOiBldmVudC53ZWJraXRGb3JjZSxcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihjb250YWluZXIsIGRyYWdQcmVzc3VyZUV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBmb3JjZSBnbG9iYWwgY2hhbmdlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZm9yY2UgZ2xvYmFsIGNoYW5nZSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VGb3JjZUdsb2JhbENoYW5nZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnUHJlc3N1cmVFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQoe1xuICAgICAgICBwcmVzc3VyZTogZXZlbnQud2Via2l0Rm9yY2UsXG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnUHJlc3N1cmVFdmVudCk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBGb3JjZVRvdWNoU2Vuc29yO1xufShfU2Vuc29yMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRm9yY2VUb3VjaFNlbnNvcjtcblxuLyoqKi8gfSksXG4vKiAxMTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU3dhcEFuaW1hdGlvbiA9IGV4cG9ydHMuU25hcHBhYmxlID0gZXhwb3J0cy5Db2xsaWRhYmxlID0gdW5kZWZpbmVkO1xuXG52YXIgX0NvbGxpZGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExOCk7XG5cbnZhciBfQ29sbGlkYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2xsaWRhYmxlKTtcblxudmFyIF9TbmFwcGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyMik7XG5cbnZhciBfU25hcHBhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NuYXBwYWJsZSk7XG5cbnZhciBfU3dhcEFuaW1hdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMTI2KTtcblxudmFyIF9Td2FwQW5pbWF0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N3YXBBbmltYXRpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLkNvbGxpZGFibGUgPSBfQ29sbGlkYWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuU25hcHBhYmxlID0gX1NuYXBwYWJsZTIuZGVmYXVsdDtcbmV4cG9ydHMuU3dhcEFuaW1hdGlvbiA9IF9Td2FwQW5pbWF0aW9uMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDExOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0NvbGxpZGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExOSk7XG5cbnZhciBfQ29sbGlkYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2xsaWRhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0NvbGxpZGFibGUyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTE5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG52YXIgX0NvbGxpZGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTIwKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIENvbGxpZGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENvbGxpZGFibGUoZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQ29sbGlkYWJsZSk7XG5cbiAgICB0aGlzLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcblxuICAgIHRoaXMuX29uRHJhZ01vdmUgPSB0aGlzLl9vbkRyYWdNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnU3RvcCA9IHRoaXMuX29uRHJhZ1N0b3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vblJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHRoaXMuX29uUmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQodGhpcyk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShDb2xsaWRhYmxlLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdkcmFnOm1vdmUnLCB0aGlzLl9vbkRyYWdNb3ZlKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ2RyYWc6bW92ZScsIHRoaXMuX29uRHJhZ01vdmUpO1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnTW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQuc2Vuc29yRXZlbnQudGFyZ2V0O1xuXG4gICAgICB0aGlzLmN1cnJlbnRBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9vblJlcXVlc3RBbmltYXRpb25GcmFtZSh0YXJnZXQpKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbGxpZGFibGVJbkV2ZW50ID0gbmV3IF9Db2xsaWRhYmxlRXZlbnQuQ29sbGlkYWJsZUluRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBjb2xsaWRpbmdFbGVtZW50OiB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgY29sbGlkYWJsZU91dEV2ZW50ID0gbmV3IF9Db2xsaWRhYmxlRXZlbnQuQ29sbGlkYWJsZU91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY29sbGlkaW5nRWxlbWVudDogdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBlbnRlcmluZ0NvbGxpZGFibGUgPSBCb29sZWFuKHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCAmJiB0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50ICE9PSB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQpO1xuICAgICAgdmFyIGxlYXZpbmdDb2xsaWRhYmxlID0gQm9vbGVhbighdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50ICYmIHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQpO1xuXG4gICAgICBpZiAoZW50ZXJpbmdDb2xsaWRhYmxlKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlcihjb2xsaWRhYmxlT3V0RXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlcihjb2xsaWRhYmxlSW5FdmVudCk7XG4gICAgICB9IGVsc2UgaWYgKGxlYXZpbmdDb2xsaWRhYmxlKSB7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXIoY29sbGlkYWJsZU91dEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCA9IHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdG9wKGV2ZW50KSB7XG4gICAgICB2YXIgbGFzdENvbGxpZGluZ0VsZW1lbnQgPSB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQgfHwgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudDtcbiAgICAgIHZhciBjb2xsaWRhYmxlT3V0RXZlbnQgPSBuZXcgX0NvbGxpZGFibGVFdmVudC5Db2xsaWRhYmxlT3V0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBjb2xsaWRpbmdFbGVtZW50OiBsYXN0Q29sbGlkaW5nRWxlbWVudFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChsYXN0Q29sbGlkaW5nRWxlbWVudCkge1xuICAgICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyKGNvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGFyZ2V0KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGlkYWJsZXMgPSBfdGhpcy5fZ2V0Q29sbGlkYWJsZXMoKTtcbiAgICAgICAgX3RoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiBjb2xsaWRhYmxlcy5pbmNsdWRlcyhlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRDb2xsaWRhYmxlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRDb2xsaWRhYmxlcygpIHtcbiAgICAgIHZhciBjb2xsaWRhYmxlcyA9IHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuY29sbGlkYWJsZXM7XG5cbiAgICAgIGlmICh0eXBlb2YgY29sbGlkYWJsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbGxpZGFibGVzKSk7XG4gICAgICB9IGVsc2UgaWYgKGNvbGxpZGFibGVzIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgY29sbGlkYWJsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY29sbGlkYWJsZXMpO1xuICAgICAgfSBlbHNlIGlmIChjb2xsaWRhYmxlcyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBbY29sbGlkYWJsZXNdO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29sbGlkYWJsZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxpZGFibGVzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xsaWRhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb2xsaWRhYmxlO1xuXG4vKioqLyB9KSxcbi8qIDEyMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0NvbGxpZGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTIxKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdDb2xsaWRhYmxlSW5FdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Db2xsaWRhYmxlRXZlbnQuQ29sbGlkYWJsZUluRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdDb2xsaWRhYmxlT3V0RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQ29sbGlkYWJsZUV2ZW50LkNvbGxpZGFibGVPdXRFdmVudDtcbiAgfVxufSk7XG5cbi8qKiovIH0pLFxuLyogMTIxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNvbGxpZGFibGVPdXRFdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZUluRXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2UgY29sbGlkYWJsZSBldmVudFxuICogQGNsYXNzIENvbGxpZGFibGVFdmVudFxuICogQG1vZHVsZSBDb2xsaWRhYmxlRXZlbnRcbiAqIEBleHRlbmRzIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIENvbGxpZGFibGVFdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKENvbGxpZGFibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIENvbGxpZGFibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBDb2xsaWRhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChDb2xsaWRhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsaWRhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENvbGxpZGFibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoaXMgY29sbGlhYmxlIGV2ZW50XG4gICAgICogQHByb3BlcnR5IGRyYWdFdmVudFxuICAgICAqIEB0eXBlIHtEcmFnRXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbGxpZGFibGVFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIENvbGxpZGFibGUgaW4gZXZlbnRcbiAqIEBjbGFzcyBDb2xsaWRhYmxlSW5FdmVudFxuICogQG1vZHVsZSBDb2xsaWRhYmxlSW5FdmVudFxuICogQGV4dGVuZHMgQ29sbGlkYWJsZUV2ZW50XG4gKi9cblxuXG5Db2xsaWRhYmxlRXZlbnQudHlwZSA9ICdjb2xsaWRhYmxlJztcblxudmFyIENvbGxpZGFibGVJbkV2ZW50ID0gZXhwb3J0cy5Db2xsaWRhYmxlSW5FdmVudCA9IGZ1bmN0aW9uIChfQ29sbGlkYWJsZUV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKENvbGxpZGFibGVJbkV2ZW50LCBfQ29sbGlkYWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBDb2xsaWRhYmxlSW5FdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBDb2xsaWRhYmxlSW5FdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKENvbGxpZGFibGVJbkV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sbGlkYWJsZUluRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENvbGxpZGFibGVJbkV2ZW50LCBbe1xuICAgIGtleTogJ2NvbGxpZGluZ0VsZW1lbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBFbGVtZW50IHlvdSBhcmUgY3VycmVudGx5IGNvbGxpZGluZyB3aXRoXG4gICAgICogQHByb3BlcnR5IGNvbGxpZGluZ0VsZW1lbnRcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmNvbGxpZGluZ0VsZW1lbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xsaWRhYmxlSW5FdmVudDtcbn0oQ29sbGlkYWJsZUV2ZW50KTtcblxuLyoqXG4gKiBDb2xsaWRhYmxlIG91dCBldmVudFxuICogQGNsYXNzIENvbGxpZGFibGVPdXRFdmVudFxuICogQG1vZHVsZSBDb2xsaWRhYmxlT3V0RXZlbnRcbiAqIEBleHRlbmRzIENvbGxpZGFibGVFdmVudFxuICovXG5cblxuQ29sbGlkYWJsZUluRXZlbnQudHlwZSA9ICdjb2xsaWRhYmxlOmluJztcblxudmFyIENvbGxpZGFibGVPdXRFdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZU91dEV2ZW50ID0gZnVuY3Rpb24gKF9Db2xsaWRhYmxlRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKENvbGxpZGFibGVPdXRFdmVudCwgX0NvbGxpZGFibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIENvbGxpZGFibGVPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBDb2xsaWRhYmxlT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChDb2xsaWRhYmxlT3V0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsaWRhYmxlT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENvbGxpZGFibGVPdXRFdmVudCwgW3tcbiAgICBrZXk6ICdjb2xsaWRpbmdFbGVtZW50JyxcblxuXG4gICAgLyoqXG4gICAgICogRWxlbWVudCB5b3Ugd2VyZSBwcmV2aW91c2x5IGNvbGxpZGluZyB3aXRoXG4gICAgICogQHByb3BlcnR5IGNvbGxpZGluZ0VsZW1lbnRcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmNvbGxpZGluZ0VsZW1lbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xsaWRhYmxlT3V0RXZlbnQ7XG59KENvbGxpZGFibGVFdmVudCk7XG5cbkNvbGxpZGFibGVPdXRFdmVudC50eXBlID0gJ2NvbGxpZGFibGU6b3V0JztcblxuLyoqKi8gfSksXG4vKiAxMjIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9TbmFwcGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyMyk7XG5cbnZhciBfU25hcHBhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NuYXBwYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9TbmFwcGFibGUyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTIzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9TbmFwcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTI0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFNuYXBwYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU25hcHBhYmxlKGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNuYXBwYWJsZSk7XG5cbiAgICB0aGlzLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcblxuICAgIHRoaXMuX29uRHJhZ1N0YXJ0ID0gdGhpcy5fb25EcmFnU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdTdG9wID0gdGhpcy5fb25EcmFnU3RvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ092ZXIgPSB0aGlzLl9vbkRyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnT3V0ID0gdGhpcy5fb25EcmFnT3V0LmJpbmQodGhpcyk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTbmFwcGFibGUsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCkub24oJ2RyYWc6c3RvcCcsIHRoaXMuX29uRHJhZ1N0b3ApLm9uKCdkcmFnOm92ZXInLCB0aGlzLl9vbkRyYWdPdmVyKS5vbignZHJhZzpvdXQnLCB0aGlzLl9vbkRyYWdPdXQpLm9uKCdkcm9wcGFibGU6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9uKCdkcm9wcGFibGU6b3V0JywgdGhpcy5fb25EcmFnT3V0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ2RyYWc6c3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCkub2ZmKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKS5vZmYoJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJhZzpvdXQnLCB0aGlzLl9vbkRyYWdPdXQpLm9mZignZHJvcHBhYmxlOm92ZXInLCB0aGlzLl9vbkRyYWdPdmVyKS5vZmYoJ2Ryb3BwYWJsZTpvdXQnLCB0aGlzLl9vbkRyYWdPdXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdTdGFydChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpcnN0U291cmNlID0gZXZlbnQuc291cmNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdG9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0b3AoKSB7XG4gICAgICB0aGlzLmZpcnN0U291cmNlID0gbnVsbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnT3ZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdPdmVyKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3VyY2UgPSBldmVudC5zb3VyY2UgfHwgZXZlbnQuZHJhZ0V2ZW50LnNvdXJjZTtcbiAgICAgIHZhciBtaXJyb3IgPSBldmVudC5taXJyb3IgfHwgZXZlbnQuZHJhZ0V2ZW50Lm1pcnJvcjtcblxuICAgICAgaWYgKHNvdXJjZSA9PT0gdGhpcy5maXJzdFNvdXJjZSkge1xuICAgICAgICB0aGlzLmZpcnN0U291cmNlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc25hcEluRXZlbnQgPSBuZXcgX1NuYXBwYWJsZUV2ZW50LlNuYXBJbkV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXIoc25hcEluRXZlbnQpO1xuXG4gICAgICBpZiAoc25hcEluRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChtaXJyb3IpIHtcbiAgICAgICAgbWlycm9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG5cbiAgICAgIHNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgICAgc291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5kcmFnZ2FibGUuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6cGxhY2VkJykpO1xuXG4gICAgICAvLyBOZWVkIHRvIGNhbmNlbCB0aGlzIGluIGRyYWcgb3V0XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc291cmNlLmNsYXNzTGlzdC5yZW1vdmUoX3RoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOnBsYWNlZCcpKTtcbiAgICAgIH0sIHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMucGxhY2VkVGltZW91dCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ091dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRyYWdPdXQoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG1pcnJvciA9IGV2ZW50Lm1pcnJvciB8fCBldmVudC5kcmFnRXZlbnQubWlycm9yO1xuICAgICAgdmFyIHNvdXJjZSA9IGV2ZW50LnNvdXJjZSB8fCBldmVudC5kcmFnRXZlbnQuc291cmNlO1xuXG4gICAgICB2YXIgc25hcE91dEV2ZW50ID0gbmV3IF9TbmFwcGFibGVFdmVudC5TbmFwT3V0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlcihzbmFwT3V0RXZlbnQpO1xuXG4gICAgICBpZiAoc25hcE91dEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAobWlycm9yKSB7XG4gICAgICAgIG1pcnJvci5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU25hcHBhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTbmFwcGFibGU7XG5cbi8qKiovIH0pLFxuLyogMTI0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfU25hcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyNSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU25hcEluRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU25hcHBhYmxlRXZlbnQuU25hcEluRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTbmFwT3V0RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU25hcHBhYmxlRXZlbnQuU25hcE91dEV2ZW50O1xuICB9XG59KTtcblxuLyoqKi8gfSksXG4vKiAxMjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU25hcE91dEV2ZW50ID0gZXhwb3J0cy5TbmFwSW5FdmVudCA9IGV4cG9ydHMuU25hcEV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBzbmFwIGV2ZW50XG4gKiBAY2xhc3MgU25hcEV2ZW50XG4gKiBAbW9kdWxlIFNuYXBFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgU25hcEV2ZW50ID0gZXhwb3J0cy5TbmFwRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU25hcEV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU25hcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNuYXBFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNuYXBFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNuYXBFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU25hcEV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdFdmVudCcsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWcgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhpcyBzbmFwIGV2ZW50XG4gICAgICogQHByb3BlcnR5IGRyYWdFdmVudFxuICAgICAqIEB0eXBlIHtEcmFnRXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNuYXBFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIFNuYXAgaW4gZXZlbnRcbiAqIEBjbGFzcyBTbmFwSW5FdmVudFxuICogQG1vZHVsZSBTbmFwSW5FdmVudFxuICogQGV4dGVuZHMgU25hcEV2ZW50XG4gKi9cblxuXG5TbmFwRXZlbnQudHlwZSA9ICdzbmFwJztcblxudmFyIFNuYXBJbkV2ZW50ID0gZXhwb3J0cy5TbmFwSW5FdmVudCA9IGZ1bmN0aW9uIChfU25hcEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNuYXBJbkV2ZW50LCBfU25hcEV2ZW50KTtcblxuICBmdW5jdGlvbiBTbmFwSW5FdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTbmFwSW5FdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNuYXBJbkV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU25hcEluRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBTbmFwSW5FdmVudDtcbn0oU25hcEV2ZW50KTtcblxuLyoqXG4gKiBTbmFwIG91dCBldmVudFxuICogQGNsYXNzIFNuYXBPdXRFdmVudFxuICogQG1vZHVsZSBTbmFwT3V0RXZlbnRcbiAqIEBleHRlbmRzIFNuYXBFdmVudFxuICovXG5cblxuU25hcEluRXZlbnQudHlwZSA9ICdzbmFwOmluJztcblNuYXBJbkV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgU25hcE91dEV2ZW50ID0gZXhwb3J0cy5TbmFwT3V0RXZlbnQgPSBmdW5jdGlvbiAoX1NuYXBFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU25hcE91dEV2ZW50LCBfU25hcEV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gU25hcE91dEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNuYXBPdXRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNuYXBPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNuYXBPdXRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIFNuYXBPdXRFdmVudDtcbn0oU25hcEV2ZW50KTtcblxuU25hcE91dEV2ZW50LnR5cGUgPSAnc25hcDpvdXQnO1xuU25hcE91dEV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG4vKioqLyB9KSxcbi8qIDEyNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0U3dhcEFuaW1hdGlvbk9wdGlvbnMgPSB1bmRlZmluZWQ7XG5cbnZhciBfU3dhcEFuaW1hdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMTI3KTtcblxudmFyIF9Td2FwQW5pbWF0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N3YXBBbmltYXRpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfU3dhcEFuaW1hdGlvbjIuZGVmYXVsdDtcbmV4cG9ydHMuZGVmYXVsdFN3YXBBbmltYXRpb25PcHRpb25zID0gX1N3YXBBbmltYXRpb24uZGVmYXVsdE9wdGlvbnM7XG5cbi8qKiovIH0pLFxuLyogMTI3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHRPcHRpb25zID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBkZWZhdWx0T3B0aW9ucyA9IGV4cG9ydHMuZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGR1cmF0aW9uOiAxNTAsXG4gIGVhc2luZ0Z1bmN0aW9uOiAnZWFzZS1pbi1vdXQnXG59O1xuXG52YXIgU3dhcEFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3dhcEFuaW1hdGlvbihkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwQW5pbWF0aW9uKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHRoaXMuZ2V0T3B0aW9ucygpKTtcblxuICAgIHRoaXMub25Tb3J0YWJsZVNvcnRlZCA9IHRoaXMub25Tb3J0YWJsZVNvcnRlZC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3dhcEFuaW1hdGlvbiwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignc29ydGFibGU6c29ydGVkJywgdGhpcy5vblNvcnRhYmxlU29ydGVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ3NvcnRhYmxlOnNvcnRlZCcsIHRoaXMub25Tb3J0YWJsZVNvcnRlZCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25Tb3J0YWJsZVNvcnRlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uU29ydGFibGVTb3J0ZWQoX3JlZikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIG9sZEluZGV4ID0gX3JlZi5vbGRJbmRleCxcbiAgICAgICAgICBuZXdJbmRleCA9IF9yZWYubmV3SW5kZXgsXG4gICAgICAgICAgZHJhZ0V2ZW50ID0gX3JlZi5kcmFnRXZlbnQ7XG4gICAgICB2YXIgc291cmNlID0gZHJhZ0V2ZW50LnNvdXJjZSxcbiAgICAgICAgICBvdmVyID0gZHJhZ0V2ZW50Lm92ZXI7XG5cblxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXN0QW5pbWF0aW9uRnJhbWUpO1xuXG4gICAgICAvLyBDYW4gYmUgZG9uZSBpbiBhIHNlcGFyYXRlIGZyYW1lXG4gICAgICB0aGlzLmxhc3RBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChvbGRJbmRleCA+PSBuZXdJbmRleCkge1xuICAgICAgICAgIGFuaW1hdGUoc291cmNlLCBvdmVyLCBfdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbmltYXRlKG92ZXIsIHNvdXJjZSwgX3RoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldE9wdGlvbnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuc3dhcEFuaW1hdGlvbiB8fCB7fTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBBbmltYXRpb247XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN3YXBBbmltYXRpb247XG5cblxuZnVuY3Rpb24gYW5pbWF0ZSh0b3AsIGJvdHRvbSwgX3JlZjIpIHtcbiAgdmFyIGR1cmF0aW9uID0gX3JlZjIuZHVyYXRpb24sXG4gICAgICBlYXNpbmdGdW5jdGlvbiA9IF9yZWYyLmVhc2luZ0Z1bmN0aW9uO1xuXG4gIHZhciBoZWlnaHQgPSB0b3Aub2Zmc2V0SGVpZ2h0O1xuXG4gIHZhciBfYXJyID0gW3RvcCwgYm90dG9tXTtcbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IF9hcnIubGVuZ3RoOyBfaSsrKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBfYXJyW19pXTtcbiAgICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIH1cblxuICB0b3Auc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBoZWlnaHQgKyAncHgsIDApJztcbiAgYm90dG9tLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLCAtJyArIGhlaWdodCArICdweCwgMCknO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9hcnIyID0gW3RvcCwgYm90dG9tXTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IF9hcnIyLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBfZWxlbWVudCA9IF9hcnIyW19pMl07XG4gICAgICBfZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgcmVzZXRFbGVtZW50T25UcmFuc2l0aW9uRW5kKTtcbiAgICAgIF9lbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAndHJhbnNmb3JtICcgKyBkdXJhdGlvbiArICdtcyAnICsgZWFzaW5nRnVuY3Rpb247XG4gICAgICBfZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXNldEVsZW1lbnRPblRyYW5zaXRpb25FbmQoZXZlbnQpIHtcbiAgZXZlbnQudGFyZ2V0LnN0eWxlLnRyYW5zaXRpb24gPSAnJztcbiAgZXZlbnQudGFyZ2V0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnJztcbiAgZXZlbnQudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCByZXNldEVsZW1lbnRPblRyYW5zaXRpb25FbmQpO1xufVxuXG4vKioqLyB9KSxcbi8qIDEyOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MiA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvQ29uc3VtYWJsZUFycmF5Mik7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG52YXIgX1BsdWdpbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU1KTtcblxudmFyIF9TZW5zb3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NSk7XG5cbnZhciBfRHJhZ2dhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzNCk7XG5cbnZhciBfRHJhZ0V2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzYpO1xuXG52YXIgX01pcnJvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb25EcmFnU3RhcnQgPSBTeW1ib2woJ29uRHJhZ1N0YXJ0Jyk7XG52YXIgb25EcmFnTW92ZSA9IFN5bWJvbCgnb25EcmFnTW92ZScpO1xudmFyIG9uRHJhZ1N0b3AgPSBTeW1ib2woJ29uRHJhZ1N0b3AnKTtcbnZhciBvbkRyYWdQcmVzc3VyZSA9IFN5bWJvbCgnb25EcmFnUHJlc3N1cmUnKTtcbnZhciBnZXRBcHBlbmRhYmxlQ29udGFpbmVyID0gU3ltYm9sKCdnZXRBcHBlbmRhYmxlQ29udGFpbmVyJyk7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgZHJhZ2dhYmxlOiAnLmRyYWdnYWJsZS1zb3VyY2UnLFxuICBoYW5kbGU6IG51bGwsXG4gIGRlbGF5OiAxMDAsXG4gIHBsYWNlZFRpbWVvdXQ6IDgwMCxcbiAgcGx1Z2luczogW10sXG4gIHNlbnNvcnM6IFtdLFxuICBjbGFzc2VzOiB7XG4gICAgJ2NvbnRhaW5lcjpkcmFnZ2luZyc6ICdkcmFnZ2FibGUtY29udGFpbmVyLS1pcy1kcmFnZ2luZycsXG4gICAgJ3NvdXJjZTpkcmFnZ2luZyc6ICdkcmFnZ2FibGUtc291cmNlLS1pcy1kcmFnZ2luZycsXG4gICAgJ3NvdXJjZTpwbGFjZWQnOiAnZHJhZ2dhYmxlLXNvdXJjZS0tcGxhY2VkJyxcbiAgICAnY29udGFpbmVyOnBsYWNlZCc6ICdkcmFnZ2FibGUtY29udGFpbmVyLS1wbGFjZWQnLFxuICAgICdib2R5OmRyYWdnaW5nJzogJ2RyYWdnYWJsZS0taXMtZHJhZ2dpbmcnLFxuICAgICdkcmFnZ2FibGU6b3Zlcic6ICdkcmFnZ2FibGUtLW92ZXInLFxuICAgICdjb250YWluZXI6b3Zlcic6ICdkcmFnZ2FibGUtY29udGFpbmVyLS1vdmVyJyxcbiAgICBtaXJyb3I6ICdkcmFnZ2FibGUtbWlycm9yJ1xuICB9XG59O1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvcmUgZHJhZ2dhYmxlIGxpYnJhcnkgdGhhdCBkb2VzIHRoZSBoZWF2eSBsaWZ0aW5nXG4gKiBAY2xhc3MgRHJhZ2dhYmxlXG4gKiBAbW9kdWxlIERyYWdnYWJsZVxuICovXG5cbnZhciBEcmFnZ2FibGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIERyYWdnYWJsZSBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgRHJhZ2dhYmxlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIERyYWdnYWJsZSBjb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgZHJhZ2dhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBEcmFnZ2FibGUoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtkb2N1bWVudC5ib2R5XTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ2dhYmxlKTtcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnRhaW5lcnNcbiAgICAgKiBAcHJvcGVydHkgY29udGFpbmVyc1xuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIGlmIChjb250YWluZXJzIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgY29udGFpbmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLmNvbnRhaW5lcnMgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkoY29udGFpbmVycykpO1xuICAgIH0gZWxzZSBpZiAoY29udGFpbmVycyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICB0aGlzLmNvbnRhaW5lcnMgPSBbY29udGFpbmVyc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRHJhZ2dhYmxlIGNvbnRhaW5lcnMgYXJlIGV4cGVjdGVkIHRvIGJlIG9mIHR5cGUgYE5vZGVMaXN0YCwgYEhUTUxFbGVtZW50W11gIG9yIGBIVE1MRWxlbWVudGAnKTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5jYWxsYmFja3MgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgZHJhZyBzdGF0ZVxuICAgICAqIEBwcm9wZXJ0eSBkcmFnZ2luZ1xuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEFjdGl2ZSBwbHVnaW5zXG4gICAgICogQHByb3BlcnR5IHBsdWdpbnNcbiAgICAgKiBAdHlwZSB7UGx1Z2luW119XG4gICAgICovXG4gICAgdGhpcy5wbHVnaW5zID0gW107XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmUgc2Vuc29yc1xuICAgICAqIEBwcm9wZXJ0eSBzZW5zb3JzXG4gICAgICogQHR5cGUge1NlbnNvcltdfVxuICAgICAqL1xuICAgIHRoaXMuc2Vuc29ycyA9IFtdO1xuXG4gICAgdGhpc1tvbkRyYWdTdGFydF0gPSB0aGlzW29uRHJhZ1N0YXJ0XS5iaW5kKHRoaXMpO1xuICAgIHRoaXNbb25EcmFnTW92ZV0gPSB0aGlzW29uRHJhZ01vdmVdLmJpbmQodGhpcyk7XG4gICAgdGhpc1tvbkRyYWdTdG9wXSA9IHRoaXNbb25EcmFnU3RvcF0uYmluZCh0aGlzKTtcbiAgICB0aGlzW29uRHJhZ1ByZXNzdXJlXSA9IHRoaXNbb25EcmFnUHJlc3N1cmVdLmJpbmQodGhpcyk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOnN0YXJ0JywgdGhpc1tvbkRyYWdTdGFydF0sIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6bW92ZScsIHRoaXNbb25EcmFnTW92ZV0sIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6c3RvcCcsIHRoaXNbb25EcmFnU3RvcF0sIHRydWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6cHJlc3N1cmUnLCB0aGlzW29uRHJhZ1ByZXNzdXJlXSwgdHJ1ZSk7XG5cbiAgICB0aGlzLmFkZFBsdWdpbi5hcHBseSh0aGlzLCBbX1BsdWdpbnMuTWlycm9yLCBfUGx1Z2lucy5BY2Nlc3NpYmlsaXR5XS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5vcHRpb25zLnBsdWdpbnMpKSk7XG4gICAgdGhpcy5hZGRTZW5zb3IuYXBwbHkodGhpcywgW19TZW5zb3JzLk1vdXNlU2Vuc29yLCBfU2Vuc29ycy5Ub3VjaFNlbnNvcl0uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMub3B0aW9ucy5zZW5zb3JzKSkpO1xuXG4gICAgdmFyIGRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQgPSBuZXcgX0RyYWdnYWJsZUV2ZW50LkRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQoe1xuICAgICAgZHJhZ2dhYmxlOiB0aGlzXG4gICAgfSk7XG5cbiAgICB0aGlzLnRyaWdnZXIoZHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgRHJhZ2dhYmxlIGluc3RhbmNlLiBUaGlzIHJlbW92ZXMgYWxsIGludGVybmFsIGV2ZW50IGxpc3RlbmVycyBhbmRcbiAgICogZGVhY3RpdmF0ZXMgc2Vuc29ycyBhbmQgcGx1Z2luc1xuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdnYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6c3RhcnQnLCB0aGlzLmRyYWdTdGFydCwgdHJ1ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOm1vdmUnLCB0aGlzLmRyYWdNb3ZlLCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6c3RvcCcsIHRoaXMuZHJhZ1N0b3AsIHRydWUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZzpwcmVzc3VyZScsIHRoaXMuZHJhZ1ByZXNzdXJlLCB0cnVlKTtcblxuICAgICAgdmFyIGRyYWdnYWJsZURlc3Ryb3lFdmVudCA9IG5ldyBfRHJhZ2dhYmxlRXZlbnQuRHJhZ2dhYmxlRGVzdHJveUV2ZW50KHtcbiAgICAgICAgZHJhZ2dhYmxlOiB0aGlzXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyYWdnYWJsZURlc3Ryb3lFdmVudCk7XG5cbiAgICAgIHRoaXMucmVtb3ZlUGx1Z2luLmFwcGx5KHRoaXMsICgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMucGx1Z2lucy5tYXAoZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gcGx1Z2luLmNvbnN0cnVjdG9yO1xuICAgICAgfSkpKTtcbiAgICAgIHRoaXMucmVtb3ZlU2Vuc29yLmFwcGx5KHRoaXMsICgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKHRoaXMuc2Vuc29ycy5tYXAoZnVuY3Rpb24gKHNlbnNvcikge1xuICAgICAgICByZXR1cm4gc2Vuc29yLmNvbnN0cnVjdG9yO1xuICAgICAgfSkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHBsdWdpbiB0byB0aGlzIGRyYWdnYWJsZSBpbnN0YW5jZS4gVGhpcyB3aWxsIGVuZCB1cCBjYWxsaW5nIHRoZSBhdHRhY2ggbWV0aG9kIG9mIHRoZSBwbHVnaW5cbiAgICAgKiBAcGFyYW0gey4uLnR5cGVvZiBQbHVnaW59IHBsdWdpbnMgLSBQbHVnaW5zIHRoYXQgeW91IHdhbnQgYXR0YWNoZWQgdG8gZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5hZGRQbHVnaW4oQ3VzdG9tQTExeVBsdWdpbiwgQ3VzdG9tTWlycm9yUGx1Z2luKVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRQbHVnaW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRQbHVnaW4oKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGx1Z2lucyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBwbHVnaW5zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWN0aXZlUGx1Z2lucyA9IHBsdWdpbnMubWFwKGZ1bmN0aW9uIChQbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQbHVnaW4oX3RoaXMpO1xuICAgICAgfSk7XG4gICAgICBhY3RpdmVQbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gcGx1Z2luLmF0dGFjaCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnBsdWdpbnMgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5wbHVnaW5zKSwgKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkoYWN0aXZlUGx1Z2lucykpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBwbHVnaW5zIHRoYXQgYXJlIGFscmVhZHkgYXR0YWNoZWQgdG8gdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2UuIFRoaXMgd2lsbCBlbmQgdXAgY2FsbGluZ1xuICAgICAqIHRoZSBkZXRhY2ggbWV0aG9kIG9mIHRoZSBwbHVnaW5cbiAgICAgKiBAcGFyYW0gey4uLnR5cGVvZiBQbHVnaW59IHBsdWdpbnMgLSBQbHVnaW5zIHRoYXQgeW91IHdhbnQgZGV0YWNoZWQgZnJvbSBkcmFnZ2FibGVcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLnJlbW92ZVBsdWdpbihNaXJyb3JQbHVnaW4sIEN1c3RvbU1pcnJvclBsdWdpbilcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVtb3ZlUGx1Z2luJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlUGx1Z2luKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBwbHVnaW5zID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgcGx1Z2luc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVtb3ZlZFBsdWdpbnMgPSB0aGlzLnBsdWdpbnMuZmlsdGVyKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbnMuaW5jbHVkZXMocGx1Z2luLmNvbnN0cnVjdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmVtb3ZlZFBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW4uZGV0YWNoKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucGx1Z2lucyA9IHRoaXMucGx1Z2lucy5maWx0ZXIoZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gIXBsdWdpbnMuaW5jbHVkZXMocGx1Z2luLmNvbnN0cnVjdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBzZW5zb3JzIHRvIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlLiBUaGlzIHdpbGwgZW5kIHVwIGNhbGxpbmcgdGhlIGF0dGFjaCBtZXRob2Qgb2YgdGhlIHNlbnNvclxuICAgICAqIEBwYXJhbSB7Li4udHlwZW9mIFNlbnNvcn0gc2Vuc29ycyAtIFNlbnNvcnMgdGhhdCB5b3Ugd2FudCBhdHRhY2hlZCB0byBkcmFnZ2FibGVcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLmFkZFNlbnNvcihGb3JjZVRvdWNoU2Vuc29yLCBDdXN0b21TZW5zb3IpXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2FkZFNlbnNvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFNlbnNvcigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIHNlbnNvcnMgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICBzZW5zb3JzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVTZW5zb3JzID0gc2Vuc29ycy5tYXAoZnVuY3Rpb24gKFNlbnNvcikge1xuICAgICAgICByZXR1cm4gbmV3IFNlbnNvcihfdGhpczIuY29udGFpbmVycywgX3RoaXMyLm9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgICBhY3RpdmVTZW5zb3JzLmZvckVhY2goZnVuY3Rpb24gKHNlbnNvcikge1xuICAgICAgICByZXR1cm4gc2Vuc29yLmF0dGFjaCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbnNvcnMgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5zZW5zb3JzKSwgKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkoYWN0aXZlU2Vuc29ycykpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBzZW5zb3JzIHRoYXQgYXJlIGFscmVhZHkgYXR0YWNoZWQgdG8gdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2UuIFRoaXMgd2lsbCBlbmQgdXAgY2FsbGluZ1xuICAgICAqIHRoZSBkZXRhY2ggbWV0aG9kIG9mIHRoZSBzZW5zb3JcbiAgICAgKiBAcGFyYW0gey4uLnR5cGVvZiBTZW5zb3J9IHNlbnNvcnMgLSBTZW5zb3JzIHRoYXQgeW91IHdhbnQgYXR0YWNoZWQgdG8gZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5yZW1vdmVTZW5zb3IoVG91Y2hTZW5zb3IsIERyYWdTZW5zb3IpXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZVNlbnNvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVNlbnNvcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgc2Vuc29ycyA9IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIHNlbnNvcnNbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbW92ZWRTZW5zb3JzID0gdGhpcy5zZW5zb3JzLmZpbHRlcihmdW5jdGlvbiAoc2Vuc29yKSB7XG4gICAgICAgIHJldHVybiBzZW5zb3JzLmluY2x1ZGVzKHNlbnNvci5jb25zdHJ1Y3Rvcik7XG4gICAgICB9KTtcbiAgICAgIHJlbW92ZWRTZW5zb3JzLmZvckVhY2goZnVuY3Rpb24gKHNlbnNvcikge1xuICAgICAgICByZXR1cm4gc2Vuc29yLmRldGFjaCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbnNvcnMgPSB0aGlzLnNlbnNvcnMuZmlsdGVyKGZ1bmN0aW9uIChzZW5zb3IpIHtcbiAgICAgICAgcmV0dXJuICFzZW5zb3JzLmluY2x1ZGVzKHNlbnNvci5jb25zdHJ1Y3Rvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgY29udGFpbmVyIHRvIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHsuLi5IVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnMgeW91IHdhbnQgdG8gYWRkIHRvIGRyYWdnYWJsZVxuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUuYWRkUGx1Z2luKEN1c3RvbUExMXlQbHVnaW4sIEN1c3RvbU1pcnJvclBsdWdpbilcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYWRkQ29udGFpbmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkQ29udGFpbmVyKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBjb250YWluZXJzID0gQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgY29udGFpbmVyc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lcnMgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5jb250YWluZXJzKSwgY29udGFpbmVycyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGNvbnRhaW5lciBmcm9tIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHsuLi5IVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnMgeW91IHdhbnQgdG8gcmVtb3ZlIGZyb20gZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5yZW1vdmVQbHVnaW4oTWlycm9yUGx1Z2luLCBDdXN0b21NaXJyb3JQbHVnaW4pXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZUNvbnRhaW5lcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUNvbnRhaW5lcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgY29udGFpbmVycyA9IEFycmF5KF9sZW42KSwgX2tleTYgPSAwOyBfa2V5NiA8IF9sZW42OyBfa2V5NisrKSB7XG4gICAgICAgIGNvbnRhaW5lcnNbX2tleTZdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXJzID0gdGhpcy5jb250YWluZXJzLmZpbHRlcihmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiAhY29udGFpbmVycy5pbmNsdWRlcyhjb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGxpc3RlbmVyIGZvciBkcmFnZ2FibGUgZXZlbnRzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBFdmVudCBuYW1lXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBFdmVudCBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUub24oJ2RyYWc6c3RhcnQnLCAoZHJhZ0V2ZW50KSA9PiBkcmFnRXZlbnQuY2FuY2VsKCkpO1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoIXRoaXMuY2FsbGJhY2tzW3R5cGVdKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzW3R5cGVdID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2FsbGJhY2tzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lciBmcm9tIGRyYWdnYWJsZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gRXZlbnQgbmFtZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRXZlbnQgY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIGhhbmRsZXJGdW5jdGlvbik7XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29mZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgaWYgKCF0aGlzLmNhbGxiYWNrc1t0eXBlXSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBjb3B5ID0gdGhpcy5jYWxsYmFja3NbdHlwZV0uc2xpY2UoMCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrID09PSBjb3B5W2ldKSB7XG4gICAgICAgICAgdGhpcy5jYWxsYmFja3NbdHlwZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBkcmFnZ2FibGUgZXZlbnRcbiAgICAgKiBAcGFyYW0ge0Fic3RyYWN0RXZlbnR9IGV2ZW50IC0gRXZlbnQgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLnRyaWdnZXIoZXZlbnQpO1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmNhbGxiYWNrc1tldmVudC50eXBlXSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBjYWxsYmFja3MgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5jYWxsYmFja3NbZXZlbnQudHlwZV0pKTtcbiAgICAgIGZvciAodmFyIGkgPSBjYWxsYmFja3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldO1xuICAgICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNsYXNzIG5hbWUgZm9yIGNsYXNzIGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5hbWUgb2YgY2xhc3MgaWRlbnRpZmllclxuICAgICAqIEByZXR1cm4ge1N0cmluZ3xudWxsfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDbGFzc05hbWVGb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbGFzc05hbWVGb3IobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jbGFzc2VzW25hbWVdIHx8IGRlZmF1bHRzLmNsYXNzZXNbbmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlIGlzIGN1cnJlbnRseSBkcmFnZ2luZ1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzRHJhZ2dpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0RyYWdnaW5nKCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5kcmFnZ2luZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdGFydCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERPTSBEcmFnIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnU3RhcnQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgc2Vuc29yRXZlbnQgPSBnZXRTZW5zb3JFdmVudChldmVudCk7XG4gICAgICB2YXIgdGFyZ2V0ID0gc2Vuc29yRXZlbnQudGFyZ2V0LFxuICAgICAgICAgIGNvbnRhaW5lciA9IHNlbnNvckV2ZW50LmNvbnRhaW5lcixcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50ID0gc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudDtcblxuXG4gICAgICBpZiAoIXRoaXMuY29udGFpbmVycy5pbmNsdWRlcyhjb250YWluZXIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5oYW5kbGUgJiYgdGFyZ2V0ICYmICEoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgdGhpcy5vcHRpb25zLmhhbmRsZSkpIHtcbiAgICAgICAgc2Vuc29yRXZlbnQuY2FuY2VsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRmluZCBkcmFnZ2FibGUgc291cmNlIGVsZW1lbnRcbiAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2UgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSk7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuICAgICAgaWYgKCF0aGlzLm9yaWdpbmFsU291cmNlKSB7XG4gICAgICAgIHNlbnNvckV2ZW50LmNhbmNlbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICB0aGlzLnNvdXJjZSA9IHRoaXMub3JpZ2luYWxTb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICBpZiAoIWlzRHJhZ0V2ZW50KG9yaWdpbmFsRXZlbnQpKSB7XG4gICAgICAgIHZhciBhcHBlbmRhYmxlQ29udGFpbmVyID0gdGhpc1tnZXRBcHBlbmRhYmxlQ29udGFpbmVyXSh7IHNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSB9KTtcbiAgICAgICAgdGhpcy5taXJyb3IgPSB0aGlzLnNvdXJjZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgdmFyIG1pcnJvckNyZWF0ZWRFdmVudCA9IG5ldyBfTWlycm9yRXZlbnQuTWlycm9yQ3JlYXRlZEV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBtaXJyb3JBdHRhY2hlZEV2ZW50ID0gbmV3IF9NaXJyb3JFdmVudC5NaXJyb3JBdHRhY2hlZEV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihtaXJyb3JDcmVhdGVkRXZlbnQpO1xuICAgICAgICBhcHBlbmRhYmxlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubWlycm9yKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKG1pcnJvckF0dGFjaGVkRXZlbnQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9yaWdpbmFsU291cmNlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuc291cmNlLCB0aGlzLm9yaWdpbmFsU291cmNlKTtcblxuICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5zb3VyY2UuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOmRyYWdnaW5nJykpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdib2R5OmRyYWdnaW5nJykpO1xuICAgICAgYXBwbHlVc2VyU2VsZWN0KGRvY3VtZW50LmJvZHksICdub25lJyk7XG5cbiAgICAgIGlmICh0aGlzLm1pcnJvcikge1xuICAgICAgICB2YXIgbWlycm9yTW92ZUV2ZW50ID0gbmV3IF9NaXJyb3JFdmVudC5NaXJyb3JNb3ZlRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKG1pcnJvck1vdmVFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBkcmFnRXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnU3RhcnRFdmVudCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyYWdFdmVudCk7XG5cbiAgICAgIGlmICghZHJhZ0V2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taXJyb3IpIHtcbiAgICAgICAgdGhpcy5taXJyb3IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm1pcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpkcmFnZ2luZycpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignYm9keTpkcmFnZ2luZycpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIG1vdmUgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBET00gRHJhZyBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ01vdmUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2Vuc29yRXZlbnQgPSBnZXRTZW5zb3JFdmVudChldmVudCk7XG4gICAgICB2YXIgY29udGFpbmVyID0gc2Vuc29yRXZlbnQuY29udGFpbmVyO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gc2Vuc29yRXZlbnQudGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdNb3ZlRXZlbnQoe1xuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihkcmFnTW92ZUV2ZW50KTtcblxuICAgICAgaWYgKGRyYWdNb3ZlRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWlycm9yICYmICFkcmFnTW92ZUV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgdmFyIG1pcnJvck1vdmVFdmVudCA9IG5ldyBfTWlycm9yRXZlbnQuTWlycm9yTW92ZUV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihtaXJyb3JNb3ZlRXZlbnQpO1xuICAgICAgfVxuXG4gICAgICB0YXJnZXQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSk7XG4gICAgICB2YXIgd2l0aGluQ29ycmVjdENvbnRhaW5lciA9ICgwLCBfdXRpbHMuY2xvc2VzdCkoc2Vuc29yRXZlbnQudGFyZ2V0LCB0aGlzLmNvbnRhaW5lcnMpO1xuICAgICAgdmFyIG92ZXJDb250YWluZXIgPSBzZW5zb3JFdmVudC5vdmVyQ29udGFpbmVyIHx8IHdpdGhpbkNvcnJlY3RDb250YWluZXI7XG4gICAgICB2YXIgaXNMZWF2aW5nQ29udGFpbmVyID0gdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lciAmJiBvdmVyQ29udGFpbmVyICE9PSB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyO1xuICAgICAgdmFyIGlzTGVhdmluZ0RyYWdnYWJsZSA9IHRoaXMuY3VycmVudE92ZXIgJiYgdGFyZ2V0ICE9PSB0aGlzLmN1cnJlbnRPdmVyO1xuICAgICAgdmFyIGlzT3ZlckNvbnRhaW5lciA9IG92ZXJDb250YWluZXIgJiYgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lciAhPT0gb3ZlckNvbnRhaW5lcjtcbiAgICAgIHZhciBpc092ZXJEcmFnZ2FibGUgPSB3aXRoaW5Db3JyZWN0Q29udGFpbmVyICYmIHRhcmdldCAmJiB0aGlzLmN1cnJlbnRPdmVyICE9PSB0YXJnZXQ7XG5cbiAgICAgIGlmIChpc0xlYXZpbmdEcmFnZ2FibGUpIHtcbiAgICAgICAgdmFyIGRyYWdPdXRFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdPdXRFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyOiB0aGlzLmN1cnJlbnRPdmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihkcmFnT3V0RXZlbnQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudE92ZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignZHJhZ2dhYmxlOm92ZXInKSk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNMZWF2aW5nQ29udGFpbmVyKSB7XG4gICAgICAgIHZhciBkcmFnT3V0Q29udGFpbmVyRXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnT3V0Q29udGFpbmVyRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgICAgb3ZlckNvbnRhaW5lcjogdGhpcy5vdmVyQ29udGFpbmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihkcmFnT3V0Q29udGFpbmVyRXZlbnQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOm92ZXInKSk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNPdmVyQ29udGFpbmVyKSB7XG4gICAgICAgIG92ZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOm92ZXInKSk7XG5cbiAgICAgICAgdmFyIGRyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnT3ZlckNvbnRhaW5lckV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICAgIG92ZXJDb250YWluZXI6IG92ZXJDb250YWluZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKGRyYWdPdmVyQ29udGFpbmVyRXZlbnQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgPSBvdmVyQ29udGFpbmVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNPdmVyRHJhZ2dhYmxlKSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcmFnZ2FibGU6b3ZlcicpKTtcblxuICAgICAgICB2YXIgZHJhZ092ZXJFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdPdmVyRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgICAgb3ZlckNvbnRhaW5lcjogb3ZlckNvbnRhaW5lcixcbiAgICAgICAgICBvdmVyOiB0YXJnZXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKGRyYWdPdmVyRXZlbnQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudE92ZXIgPSB0YXJnZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdG9wIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRE9NIERyYWcgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdG9wLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgdmFyIHNlbnNvckV2ZW50ID0gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpO1xuICAgICAgdmFyIGRyYWdTdG9wRXZlbnQgPSBuZXcgX0RyYWdFdmVudC5EcmFnU3RvcEV2ZW50KHtcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgIHNlbnNvckV2ZW50OiBldmVudC5zZW5zb3JFdmVudCxcbiAgICAgICAgc291cmNlQ29udGFpbmVyOiB0aGlzLnNvdXJjZUNvbnRhaW5lclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5zb3VyY2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5vcmlnaW5hbFNvdXJjZSwgdGhpcy5zb3VyY2UpO1xuICAgICAgdGhpcy5zb3VyY2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNvdXJjZSk7XG4gICAgICB0aGlzLm9yaWdpbmFsU291cmNlLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgdGhpcy5zb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6cGxhY2VkJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOnBsYWNlZCcpKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2NvbnRhaW5lcjpkcmFnZ2luZycpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignYm9keTpkcmFnZ2luZycpKTtcbiAgICAgIGFwcGx5VXNlclNlbGVjdChkb2N1bWVudC5ib2R5LCAnJyk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPdmVyKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignZHJhZ2dhYmxlOm92ZXInKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOm92ZXInKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1pcnJvcikge1xuICAgICAgICB2YXIgbWlycm9yRGVzdHJveUV2ZW50ID0gbmV3IF9NaXJyb3JFdmVudC5NaXJyb3JEZXN0cm95RXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IHNlbnNvckV2ZW50LmNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKG1pcnJvckRlc3Ryb3lFdmVudCk7XG5cbiAgICAgICAgaWYgKCFtaXJyb3JEZXN0cm95RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICAgIHRoaXMubWlycm9yLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5taXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBsYXN0U291cmNlID0gdGhpcy5vcmlnaW5hbFNvdXJjZTtcbiAgICAgIHZhciBsYXN0U291cmNlQ29udGFpbmVyID0gdGhpcy5zb3VyY2VDb250YWluZXI7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobGFzdFNvdXJjZSkge1xuICAgICAgICAgIGxhc3RTb3VyY2UuY2xhc3NMaXN0LnJlbW92ZShfdGhpczMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6cGxhY2VkJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3RTb3VyY2VDb250YWluZXIpIHtcbiAgICAgICAgICBsYXN0U291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoX3RoaXMzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOnBsYWNlZCcpKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5vcHRpb25zLnBsYWNlZFRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgICB0aGlzLm1pcnJvciA9IG51bGw7XG4gICAgICB0aGlzLm9yaWdpbmFsU291cmNlID0gbnVsbDtcbiAgICAgIHRoaXMuY3VycmVudE92ZXJDb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50T3ZlciA9IG51bGw7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lciA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBwcmVzc3VyZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERPTSBEcmFnIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnUHJlc3N1cmUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2Vuc29yRXZlbnQgPSBnZXRTZW5zb3JFdmVudChldmVudCk7XG4gICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2UgfHwgKDAsIF91dGlscy5jbG9zZXN0KShzZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSk7XG5cbiAgICAgIHZhciBkcmFnUHJlc3N1cmVFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdQcmVzc3VyZUV2ZW50KHtcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgcHJlc3N1cmU6IHNlbnNvckV2ZW50LnByZXNzdXJlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyYWdQcmVzc3VyZUV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFwcGVuZGFibGUgY29udGFpbmVyIGZvciBtaXJyb3IgYmFzZWQgb24gdGhlIGFwcGVuZFRvIG9wdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBvcHRpb25zLnNvdXJjZSAtIEN1cnJlbnQgc291cmNlXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogZ2V0QXBwZW5kYWJsZUNvbnRhaW5lcixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3JlZikge1xuICAgICAgdmFyIHNvdXJjZSA9IF9yZWYuc291cmNlO1xuXG4gICAgICB2YXIgYXBwZW5kVG8gPSB0aGlzLm9wdGlvbnMuYXBwZW5kVG87XG5cbiAgICAgIGlmICh0eXBlb2YgYXBwZW5kVG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFwcGVuZFRvKTtcbiAgICAgIH0gZWxzZSBpZiAoYXBwZW5kVG8gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gYXBwZW5kVG87XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gYXBwZW5kVG8oc291cmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ2dhYmxlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcmFnZ2FibGU7XG5cblxuZnVuY3Rpb24gZ2V0U2Vuc29yRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LmRldGFpbDtcbn1cblxuZnVuY3Rpb24gaXNEcmFnRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuICgvXmRyYWcvLnRlc3QoZXZlbnQudHlwZSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlVc2VyU2VsZWN0KGVsZW1lbnQsIHZhbHVlKSB7XG4gIGVsZW1lbnQuc3R5bGUud2Via2l0VXNlclNlbGVjdCA9IHZhbHVlO1xuICBlbGVtZW50LnN0eWxlLm1velVzZXJTZWxlY3QgPSB2YWx1ZTtcbiAgZWxlbWVudC5zdHlsZS5tc1VzZXJTZWxlY3QgPSB2YWx1ZTtcbiAgZWxlbWVudC5zdHlsZS5vVXNlclNlbGVjdCA9IHZhbHVlO1xuICBlbGVtZW50LnN0eWxlLnVzZXJTZWxlY3QgPSB2YWx1ZTtcbn1cblxuLyoqKi8gfSksXG4vKiAxMjkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdE1pcnJvck9wdGlvbiA9IHVuZGVmaW5lZDtcblxudmFyIF9NaXJyb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzMCk7XG5cbnZhciBfTWlycm9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01pcnJvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9NaXJyb3IyLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHRNaXJyb3JPcHRpb24gPSBfTWlycm9yLmRlZmF1bHRPcHRpb25zO1xuXG4vKioqLyB9KSxcbi8qIDEzMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0T3B0aW9ucyA9IHVuZGVmaW5lZDtcblxudmFyIF9vYmplY3RXaXRob3V0UHJvcGVydGllczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzMSk7XG5cbnZhciBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMyKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdE9wdGlvbnMgPSBleHBvcnRzLmRlZmF1bHRPcHRpb25zID0ge1xuICBjb25zdHJhaW5EaW1lbnNpb25zOiBmYWxzZSxcbiAgeEF4aXM6IHRydWUsXG4gIHlBeGlzOiB0cnVlXG59O1xuXG52YXIgTWlycm9yID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNaXJyb3IoZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCB0aGlzLmdldE9wdGlvbnMoKSk7XG5cbiAgICB0aGlzLm9uTWlycm9yQ3JlYXRlZCA9IHRoaXMub25NaXJyb3JDcmVhdGVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk1pcnJvck1vdmUgPSB0aGlzLm9uTWlycm9yTW92ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTWlycm9yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdtaXJyb3I6Y3JlYXRlZCcsIHRoaXMub25NaXJyb3JDcmVhdGVkKS5vbignbWlycm9yOm1vdmUnLCB0aGlzLm9uTWlycm9yTW92ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub2ZmKCdtaXJyb3I6Y3JlYXRlZCcsIHRoaXMub25NaXJyb3JDcmVhdGVkKS5vZmYoJ21pcnJvcjptb3ZlJywgdGhpcy5vbk1pcnJvck1vdmUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldE9wdGlvbnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMubWlycm9yIHx8IHt9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uTWlycm9yQ3JlYXRlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTWlycm9yQ3JlYXRlZChfcmVmKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgbWlycm9yID0gX3JlZi5taXJyb3IsXG4gICAgICAgICAgc291cmNlID0gX3JlZi5zb3VyY2UsXG4gICAgICAgICAgc2Vuc29yRXZlbnQgPSBfcmVmLnNlbnNvckV2ZW50O1xuXG4gICAgICB2YXIgbWlycm9yQ2xhc3MgPSB0aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ21pcnJvcicpO1xuXG4gICAgICB2YXIgc2V0U3RhdGUgPSBmdW5jdGlvbiBzZXRTdGF0ZShfcmVmMikge1xuICAgICAgICB2YXIgbWlycm9yT2Zmc2V0ID0gX3JlZjIubWlycm9yT2Zmc2V0LFxuICAgICAgICAgICAgaW5pdGlhbFggPSBfcmVmMi5pbml0aWFsWCxcbiAgICAgICAgICAgIGluaXRpYWxZID0gX3JlZjIuaW5pdGlhbFksXG4gICAgICAgICAgICBhcmdzID0gKDAsIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMuZGVmYXVsdCkoX3JlZjIsIFsnbWlycm9yT2Zmc2V0JywgJ2luaXRpYWxYJywgJ2luaXRpYWxZJ10pO1xuXG4gICAgICAgIF90aGlzLm1pcnJvck9mZnNldCA9IG1pcnJvck9mZnNldDtcbiAgICAgICAgX3RoaXMuaW5pdGlhbFggPSBpbml0aWFsWDtcbiAgICAgICAgX3RoaXMuaW5pdGlhbFkgPSBpbml0aWFsWTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBtaXJyb3JPZmZzZXQ6IG1pcnJvck9mZnNldCwgaW5pdGlhbFg6IGluaXRpYWxYLCBpbml0aWFsWTogaW5pdGlhbFkgfSwgYXJncyk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgICBtaXJyb3I6IG1pcnJvcixcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgbWlycm9yQ2xhc3M6IG1pcnJvckNsYXNzLFxuICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnNcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5pdGlhbFN0YXRlKVxuICAgICAgLy8gRml4IHJlZmxvdyBoZXJlXG4gICAgICAudGhlbihjb21wdXRlTWlycm9yRGltZW5zaW9ucykudGhlbihjYWxjdWxhdGVNaXJyb3JPZmZzZXQpLnRoZW4ocmVzZXRNaXJyb3IpLnRoZW4oYWRkTWlycm9yQ2xhc3NlcykudGhlbihwb3NpdGlvbk1pcnJvcih7IGluaXRpYWw6IHRydWUgfSkpLnRoZW4ocmVtb3ZlTWlycm9ySUQpLnRoZW4oc2V0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uTWlycm9yTW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTWlycm9yTW92ZShfcmVmMykge1xuICAgICAgdmFyIG1pcnJvciA9IF9yZWYzLm1pcnJvcixcbiAgICAgICAgICBzZW5zb3JFdmVudCA9IF9yZWYzLnNlbnNvckV2ZW50O1xuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgICBtaXJyb3I6IG1pcnJvcixcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICBtaXJyb3JPZmZzZXQ6IHRoaXMubWlycm9yT2Zmc2V0LFxuICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGluaXRpYWxYOiB0aGlzLmluaXRpYWxYLFxuICAgICAgICBpbml0aWFsWTogdGhpcy5pbml0aWFsWVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbml0aWFsU3RhdGUpLnRoZW4ocG9zaXRpb25NaXJyb3IoeyByYWY6IHRydWUgfSkpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWlycm9yO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNaXJyb3I7XG5cblxuZnVuY3Rpb24gY29tcHV0ZU1pcnJvckRpbWVuc2lvbnMoX3JlZjQpIHtcbiAgdmFyIHNvdXJjZSA9IF9yZWY0LnNvdXJjZSxcbiAgICAgIGFyZ3MgPSAoMCwgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMy5kZWZhdWx0KShfcmVmNCwgWydzb3VyY2UnXSk7XG5cbiAgcmV0dXJuIHdpdGhQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIHNvdXJjZVJlY3QgPSBzb3VyY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHsgc291cmNlOiBzb3VyY2UsIHNvdXJjZVJlY3Q6IHNvdXJjZVJlY3QgfSwgYXJncykpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlTWlycm9yT2Zmc2V0KF9yZWY1KSB7XG4gIHZhciBzZW5zb3JFdmVudCA9IF9yZWY1LnNlbnNvckV2ZW50LFxuICAgICAgc291cmNlUmVjdCA9IF9yZWY1LnNvdXJjZVJlY3QsXG4gICAgICBhcmdzID0gKDAsIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMuZGVmYXVsdCkoX3JlZjUsIFsnc2Vuc29yRXZlbnQnLCAnc291cmNlUmVjdCddKTtcblxuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgbWlycm9yT2Zmc2V0ID0ge1xuICAgICAgdG9wOiBzZW5zb3JFdmVudC5jbGllbnRZIC0gc291cmNlUmVjdC50b3AsXG4gICAgICBsZWZ0OiBzZW5zb3JFdmVudC5jbGllbnRYIC0gc291cmNlUmVjdC5sZWZ0XG4gICAgfTtcblxuICAgIHJlc29sdmUoT2JqZWN0LmFzc2lnbih7IHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCwgc291cmNlUmVjdDogc291cmNlUmVjdCwgbWlycm9yT2Zmc2V0OiBtaXJyb3JPZmZzZXQgfSwgYXJncykpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRNaXJyb3IoX3JlZjYpIHtcbiAgdmFyIG1pcnJvciA9IF9yZWY2Lm1pcnJvcixcbiAgICAgIHNvdXJjZSA9IF9yZWY2LnNvdXJjZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmNi5vcHRpb25zLFxuICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWY2LCBbJ21pcnJvcicsICdzb3VyY2UnLCAnb3B0aW9ucyddKTtcblxuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgb2Zmc2V0SGVpZ2h0ID0gdm9pZCAwO1xuICAgIHZhciBvZmZzZXRXaWR0aCA9IHZvaWQgMDtcblxuICAgIGlmIChvcHRpb25zLmNvbnN0cmFpbkRpbWVuc2lvbnMpIHtcbiAgICAgIG9mZnNldEhlaWdodCA9IHNvdXJjZS5vZmZzZXRIZWlnaHQ7XG4gICAgICBvZmZzZXRXaWR0aCA9IHNvdXJjZS5vZmZzZXRXaWR0aDtcbiAgICB9XG5cbiAgICBtaXJyb3Iuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgIG1pcnJvci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIG1pcnJvci5zdHlsZS50b3AgPSAwO1xuICAgIG1pcnJvci5zdHlsZS5sZWZ0ID0gMDtcblxuICAgIGlmIChvcHRpb25zLmNvbnN0cmFpbkRpbWVuc2lvbnMpIHtcbiAgICAgIG1pcnJvci5zdHlsZS5oZWlnaHQgPSBvZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgbWlycm9yLnN0eWxlLndpZHRoID0gb2Zmc2V0V2lkdGggKyAncHgnO1xuICAgIH1cblxuICAgIHJlc29sdmUoT2JqZWN0LmFzc2lnbih7IG1pcnJvcjogbWlycm9yLCBzb3VyY2U6IHNvdXJjZSwgb3B0aW9uczogb3B0aW9ucyB9LCBhcmdzKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRNaXJyb3JDbGFzc2VzKF9yZWY3KSB7XG4gIHZhciBtaXJyb3IgPSBfcmVmNy5taXJyb3IsXG4gICAgICBtaXJyb3JDbGFzcyA9IF9yZWY3Lm1pcnJvckNsYXNzLFxuICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWY3LCBbJ21pcnJvcicsICdtaXJyb3JDbGFzcyddKTtcblxuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICBtaXJyb3IuY2xhc3NMaXN0LmFkZChtaXJyb3JDbGFzcyk7XG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHsgbWlycm9yOiBtaXJyb3IsIG1pcnJvckNsYXNzOiBtaXJyb3JDbGFzcyB9LCBhcmdzKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVNaXJyb3JJRChfcmVmOCkge1xuICB2YXIgbWlycm9yID0gX3JlZjgubWlycm9yLFxuICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWY4LCBbJ21pcnJvciddKTtcblxuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICBtaXJyb3IucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgIGRlbGV0ZSBtaXJyb3IuaWQ7XG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHsgbWlycm9yOiBtaXJyb3IgfSwgYXJncykpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25NaXJyb3IoKSB7XG4gIHZhciBfcmVmOSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICBfcmVmOSR3aXRoRnJhbWUgPSBfcmVmOS53aXRoRnJhbWUsXG4gICAgICB3aXRoRnJhbWUgPSBfcmVmOSR3aXRoRnJhbWUgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZjkkd2l0aEZyYW1lLFxuICAgICAgX3JlZjkkaW5pdGlhbCA9IF9yZWY5LmluaXRpYWwsXG4gICAgICBpbml0aWFsID0gX3JlZjkkaW5pdGlhbCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmOSRpbml0aWFsO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZjEwKSB7XG4gICAgdmFyIG1pcnJvciA9IF9yZWYxMC5taXJyb3IsXG4gICAgICAgIHNlbnNvckV2ZW50ID0gX3JlZjEwLnNlbnNvckV2ZW50LFxuICAgICAgICBtaXJyb3JPZmZzZXQgPSBfcmVmMTAubWlycm9yT2Zmc2V0LFxuICAgICAgICBpbml0aWFsWSA9IF9yZWYxMC5pbml0aWFsWSxcbiAgICAgICAgaW5pdGlhbFggPSBfcmVmMTAuaW5pdGlhbFgsXG4gICAgICAgIG9wdGlvbnMgPSBfcmVmMTAub3B0aW9ucyxcbiAgICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWYxMCwgWydtaXJyb3InLCAnc2Vuc29yRXZlbnQnLCAnbWlycm9yT2Zmc2V0JywgJ2luaXRpYWxZJywgJ2luaXRpYWxYJywgJ29wdGlvbnMnXSk7XG5cbiAgICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIHZhciByZXN1bHQgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgbWlycm9yOiBtaXJyb3IsXG4gICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgbWlycm9yT2Zmc2V0OiBtaXJyb3JPZmZzZXQsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgIH0sIGFyZ3MpO1xuXG4gICAgICBpZiAobWlycm9yT2Zmc2V0KSB7XG4gICAgICAgIHZhciB4ID0gc2Vuc29yRXZlbnQuY2xpZW50WCAtIG1pcnJvck9mZnNldC5sZWZ0O1xuICAgICAgICB2YXIgeSA9IHNlbnNvckV2ZW50LmNsaWVudFkgLSBtaXJyb3JPZmZzZXQudG9wO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnhBeGlzICYmIG9wdGlvbnMueUF4aXMgfHwgaW5pdGlhbCkge1xuICAgICAgICAgIG1pcnJvci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwKSc7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy54QXhpcyAmJiAhb3B0aW9ucy55QXhpcykge1xuICAgICAgICAgIG1pcnJvci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyBpbml0aWFsWSArICdweCwgMCknO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMueUF4aXMgJiYgIW9wdGlvbnMueEF4aXMpIHtcbiAgICAgICAgICBtaXJyb3Iuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBpbml0aWFsWCArICdweCwgJyArIHkgKyAncHgsIDApJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbml0aWFsKSB7XG4gICAgICAgICAgcmVzdWx0LmluaXRpYWxYID0geDtcbiAgICAgICAgICByZXN1bHQuaW5pdGlhbFkgPSB5O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICB9LCB7IGZyYW1lOiB3aXRoRnJhbWUgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdpdGhQcm9taXNlKGNhbGxiYWNrKSB7XG4gIHZhciBfcmVmMTEgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgX3JlZjExJHJhZiA9IF9yZWYxMS5yYWYsXG4gICAgICByYWYgPSBfcmVmMTEkcmFmID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYxMSRyYWY7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAocmFmKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKHJlc29sdmUsIHJlamVjdCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqKi8gfSksXG4vKiAxMzEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICB2YXIgdGFyZ2V0ID0ge307XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlO1xuICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDEzMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0FjY2Vzc2liaWxpdHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzMyk7XG5cbnZhciBfQWNjZXNzaWJpbGl0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY2Nlc3NpYmlsaXR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0FjY2Vzc2liaWxpdHkyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTMzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEFSSUFfR1JBQkJFRCA9ICdhcmlhLWdyYWJiZWQnO1xudmFyIEFSSUFfRFJPUEVGRkVDVCA9ICdhcmlhLWRyb3BlZmZlY3QnO1xudmFyIFRBQklOREVYID0gJ3RhYmluZGV4JztcblxuLyoqXG4gKiBfX1dJUF9fIEFjY2Vzc2liaWxpdHkgcGx1Z2luXG4gKiBAY2xhc3MgQWNjZXNzaWJpbGl0eVxuICogQG1vZHVsZSBBY2Nlc3NpYmlsaXR5XG4gKi9cblxudmFyIEFjY2Vzc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIEFjY2Vzc2liaWxpdHkgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIEFjY2Vzc2liaWxpdHlcbiAgICogQHBhcmFtIHtEcmFnZ2FibGV9IGRyYWdnYWJsZSAtIERyYWdnYWJsZSBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gQWNjZXNzaWJpbGl0eShkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBBY2Nlc3NpYmlsaXR5KTtcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGluc3RhbmNlXG4gICAgICogQHByb3BlcnR5IGRyYWdnYWJsZVxuICAgICAqIEB0eXBlIHtEcmFnZ2FibGV9XG4gICAgICovXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLl9vbkluaXQgPSB0aGlzLl9vbkluaXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kgPSB0aGlzLl9vbkRlc3Ryb3kuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBsaXN0ZW5lcnMgdG8gZHJhZ2dhYmxlXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQWNjZXNzaWJpbGl0eSwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignaW5pdCcsIHRoaXMuX29uSW5pdCkub24oJ2Rlc3Ryb3knLCB0aGlzLl9vbkRlc3Ryb3kpLm9uKCdkcmFnOnN0YXJ0JywgX29uRHJhZ1N0YXJ0KS5vbignZHJhZzpzdG9wJywgX29uRHJhZ1N0b3ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIGxpc3RlbmVycyBmcm9tIGRyYWdnYWJsZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ2luaXQnLCB0aGlzLl9vbkluaXQpLm9mZignZGVzdHJveScsIHRoaXMuX29uRGVzdHJveSkub2ZmKCdkcmFnOnN0YXJ0JywgX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6c3RvcCcsIF9vbkRyYWdTdG9wKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRpYWxpemUgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBwYXJhbS5jb250YWluZXJzXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19vbkluaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Jbml0KF9yZWYpIHtcbiAgICAgIHZhciBjb250YWluZXJzID0gX3JlZi5jb250YWluZXJzO1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lciA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShBUklBX0RST1BFRkZFQ1QsIHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMudHlwZSk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCh0aGlzLmRyYWdnYWJsZS5vcHRpb25zLmRyYWdnYWJsZSlbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoVEFCSU5ERVgsIDApO1xuICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShBUklBX0dSQUJCRUQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IGhhbmRsZXIgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBwYXJhbS5jb250YWluZXJzXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19vbkRlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EZXN0cm95KF9yZWYyKSB7XG4gICAgICB2YXIgY29udGFpbmVycyA9IF9yZWYyLmNvbnRhaW5lcnM7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IGNvbnRhaW5lcnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAzLnZhbHVlO1xuXG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShBUklBX0RST1BFRkZFQ1QpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yNCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5kcmFnZ2FibGUub3B0aW9ucy5kcmFnZ2FibGUpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA0OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gKF9zdGVwNCA9IF9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFRBQklOREVYLCAwKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoQVJJQV9HUkFCQkVELCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjQgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3I0ID0gZXJyO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ICYmIF9pdGVyYXRvcjQucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yNC5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNCkge1xuICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yMyA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yMy5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQWNjZXNzaWJpbGl0eTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQWNjZXNzaWJpbGl0eTtcblxuXG5mdW5jdGlvbiBfb25EcmFnU3RhcnQoX3JlZjMpIHtcbiAgdmFyIHNvdXJjZSA9IF9yZWYzLnNvdXJjZTtcblxuICBzb3VyY2Uuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIF9vbkRyYWdTdG9wKF9yZWY0KSB7XG4gIHZhciBzb3VyY2UgPSBfcmVmNC5zb3VyY2U7XG5cbiAgc291cmNlLnNldEF0dHJpYnV0ZShBUklBX0dSQUJCRUQsIGZhbHNlKTtcbn1cblxuLyoqKi8gfSksXG4vKiAxMzQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9EcmFnZ2FibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTM1KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdnYWJsZUV2ZW50LkRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnZ2FibGVEZXN0cm95RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ2dhYmxlRXZlbnQuRHJhZ2dhYmxlRGVzdHJveUV2ZW50O1xuICB9XG59KTtcblxuLyoqKi8gfSksXG4vKiAxMzUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2UgZHJhZ2dhYmxlIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ2dhYmxlRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ2dhYmxlRXZlbnRcbiAqIEBleHRlbmRzIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIERyYWdnYWJsZUV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnZ2FibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ2dhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnZ2FibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ2dhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ2dhYmxlJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGluc3RhbmNlXG4gICAgICogQHByb3BlcnR5IGRyYWdnYWJsZVxuICAgICAqIEB0eXBlIHtEcmFnZ2FibGV9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdnYWJsZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdnYWJsZUV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogRHJhZ2dhYmxlIGluaXRpYWxpemVkIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudFxuICogQG1vZHVsZSBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnZ2FibGVFdmVudFxuICovXG5cblxuRHJhZ2dhYmxlRXZlbnQudHlwZSA9ICdkcmFnZ2FibGUnO1xuXG52YXIgRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ2dhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCwgX0RyYWdnYWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQ7XG59KERyYWdnYWJsZUV2ZW50KTtcblxuLyoqXG4gKiBEcmFnZ2FibGUgZGVzdG9yeSBldmVudFxuICogQGNsYXNzIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ2dhYmxlRGVzdHJveUV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnZ2FibGVEZXN0cm95RXZlbnRcbiAqL1xuXG5cbkRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQudHlwZSA9ICdkcmFnZ2FibGU6aW5pdGlhbGl6ZSc7XG5cbnZhciBEcmFnZ2FibGVEZXN0cm95RXZlbnQgPSBleHBvcnRzLkRyYWdnYWJsZURlc3Ryb3lFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ2dhYmxlRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdnYWJsZURlc3Ryb3lFdmVudCwgX0RyYWdnYWJsZUV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJhZ2dhYmxlRGVzdHJveUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdnYWJsZURlc3Ryb3lFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdnYWJsZURlc3Ryb3lFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdnYWJsZURlc3Ryb3lFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdnYWJsZURlc3Ryb3lFdmVudDtcbn0oRHJhZ2dhYmxlRXZlbnQpO1xuXG5EcmFnZ2FibGVEZXN0cm95RXZlbnQudHlwZSA9ICdkcmFnZ2FibGU6ZGVzdHJveSc7XG5cbi8qKiovIH0pLFxuLyogMTM2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfRHJhZ0V2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdTdGFydEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdFdmVudC5EcmFnU3RhcnRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdNb3ZlRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ0V2ZW50LkRyYWdNb3ZlRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnT3V0Q29udGFpbmVyRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ0V2ZW50LkRyYWdPdXRDb250YWluZXJFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdPdXRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnRXZlbnQuRHJhZ091dEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ092ZXJDb250YWluZXJFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnRXZlbnQuRHJhZ092ZXJDb250YWluZXJFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdPdmVyRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ0V2ZW50LkRyYWdPdmVyRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnU3RvcEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdFdmVudC5EcmFnU3RvcEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ1ByZXNzdXJlRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ0V2ZW50LkRyYWdQcmVzc3VyZUV2ZW50O1xuICB9XG59KTtcblxuLyoqKi8gfSksXG4vKiAxMzcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRHJhZ1N0b3BFdmVudCA9IGV4cG9ydHMuRHJhZ1ByZXNzdXJlRXZlbnQgPSBleHBvcnRzLkRyYWdPdXRDb250YWluZXJFdmVudCA9IGV4cG9ydHMuRHJhZ092ZXJDb250YWluZXJFdmVudCA9IGV4cG9ydHMuRHJhZ091dEV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckV2ZW50ID0gZXhwb3J0cy5EcmFnTW92ZUV2ZW50ID0gZXhwb3J0cy5EcmFnU3RhcnRFdmVudCA9IGV4cG9ydHMuRHJhZ0V2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBkcmFnIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ0V2ZW50XG4gKiBAbW9kdWxlIERyYWdFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgRHJhZ0V2ZW50ID0gZXhwb3J0cy5EcmFnRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ0V2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ0V2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ0V2ZW50LCBbe1xuICAgIGtleTogJ2hhc01pcnJvcicsXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBtaXJyb3IgaGFzIGJlZW4gY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc01pcnJvcigpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMubWlycm9yKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzb3VyY2UnLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIHNvdXJjZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IHNvdXJjZVxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgb3JpZ2luYWwgc291cmNlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgb3JpZ2luYWxTb3VyY2VcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29yaWdpbmFsU291cmNlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3JpZ2luYWxTb3VyY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBtaXJyb3IgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBtaXJyb3JcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ21pcnJvcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm1pcnJvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIHNvdXJjZSBjb250YWluZXIgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBzb3VyY2VDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NvdXJjZUNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNvdXJjZUNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5zb3IgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgc2Vuc29yRXZlbnRcbiAgICAgKiBAdHlwZSB7U2Vuc29yRXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NlbnNvckV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc2Vuc29yRXZlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3JpZ2luYWwgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgc2Vuc29yIGV2ZW50XG4gICAgICogQHByb3BlcnR5IG9yaWdpbmFsRXZlbnRcbiAgICAgKiBAdHlwZSB7RXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29yaWdpbmFsRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgaWYgKHRoaXMuc2Vuc29yRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnRXZlbnQ7XG59KF9BYnN0cmFjdEV2ZW50My5kZWZhdWx0KTtcblxuLyoqXG4gKiBEcmFnIHN0YXJ0IGV2ZW50XG4gKiBAY2xhc3MgRHJhZ1N0YXJ0RXZlbnRcbiAqIEBtb2R1bGUgRHJhZ1N0YXJ0RXZlbnRcbiAqIEBleHRlbmRzIERyYWdFdmVudFxuICovXG5cblxuRHJhZ0V2ZW50LnR5cGUgPSAnZHJhZyc7XG5cbnZhciBEcmFnU3RhcnRFdmVudCA9IGV4cG9ydHMuRHJhZ1N0YXJ0RXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RhcnRFdmVudCwgX0RyYWdFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1N0YXJ0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1N0YXJ0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU3RhcnRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdTdGFydEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1N0YXJ0RXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbi8qKlxuICogRHJhZyBtb3ZlIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ01vdmVFdmVudFxuICogQG1vZHVsZSBEcmFnTW92ZUV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdTdGFydEV2ZW50LnR5cGUgPSAnZHJhZzpzdGFydCc7XG5EcmFnU3RhcnRFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIERyYWdNb3ZlRXZlbnQgPSBleHBvcnRzLkRyYWdNb3ZlRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ01vdmVFdmVudCwgX0RyYWdFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyYWdNb3ZlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ01vdmVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdNb3ZlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnTW92ZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ01vdmVFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIG92ZXIgZXZlbnRcbiAqIEBjbGFzcyBEcmFnT3ZlckV2ZW50XG4gKiBAbW9kdWxlIERyYWdPdmVyRXZlbnRcbiAqIEBleHRlbmRzIERyYWdFdmVudFxuICovXG5cblxuRHJhZ01vdmVFdmVudC50eXBlID0gJ2RyYWc6bW92ZSc7XG5cbnZhciBEcmFnT3ZlckV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdPdmVyRXZlbnQsIF9EcmFnRXZlbnQzKTtcblxuICBmdW5jdGlvbiBEcmFnT3ZlckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdmVyRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnT3ZlckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ092ZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ092ZXJFdmVudCwgW3tcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnRhaW5lciB5b3UgYXJlIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlckNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlckNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgZWxlbWVudCB5b3UgYXJlIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3ZlcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnT3ZlckV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgb3V0IGV2ZW50XG4gKiBAY2xhc3MgRHJhZ091dEV2ZW50XG4gKiBAbW9kdWxlIERyYWdPdXRFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnT3ZlckV2ZW50LnR5cGUgPSAnZHJhZzpvdmVyJztcbkRyYWdPdmVyRXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBEcmFnT3V0RXZlbnQgPSBleHBvcnRzLkRyYWdPdXRFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnT3V0RXZlbnQsIF9EcmFnRXZlbnQ0KTtcblxuICBmdW5jdGlvbiBEcmFnT3V0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ091dEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ091dEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ091dEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3V0RXZlbnQsIFt7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBjb250YWluZXIgeW91IGFyZSBvdmVyXG4gICAgICogQHByb3BlcnR5IG92ZXJDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXJDb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGVsZW1lbnQgeW91IGxlZnRcbiAgICAgKiBAcHJvcGVydHkgb3ZlclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3ZlcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm92ZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnT3V0RXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbi8qKlxuICogRHJhZyBvdmVyIGNvbnRhaW5lciBldmVudFxuICogQGNsYXNzIERyYWdPdmVyQ29udGFpbmVyRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ092ZXJDb250YWluZXJFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnT3V0RXZlbnQudHlwZSA9ICdkcmFnOm91dCc7XG5cbnZhciBEcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ1KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdPdmVyQ29udGFpbmVyRXZlbnQsIF9EcmFnRXZlbnQ1KTtcblxuICBmdW5jdGlvbiBEcmFnT3ZlckNvbnRhaW5lckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdPdmVyQ29udGFpbmVyRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnT3ZlckNvbnRhaW5lckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ092ZXJDb250YWluZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ092ZXJDb250YWluZXJFdmVudCwgW3tcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnRhaW5lciB5b3UgYXJlIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlckNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlckNvbnRhaW5lcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdPdmVyQ29udGFpbmVyRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbi8qKlxuICogRHJhZyBvdXQgY29udGFpbmVyIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ091dENvbnRhaW5lckV2ZW50XG4gKiBAbW9kdWxlIERyYWdPdXRDb250YWluZXJFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnT3ZlckNvbnRhaW5lckV2ZW50LnR5cGUgPSAnZHJhZzpvdmVyOmNvbnRhaW5lcic7XG5cbnZhciBEcmFnT3V0Q29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdXRDb250YWluZXJFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50Nikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnT3V0Q29udGFpbmVyRXZlbnQsIF9EcmFnRXZlbnQ2KTtcblxuICBmdW5jdGlvbiBEcmFnT3V0Q29udGFpbmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ091dENvbnRhaW5lckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ091dENvbnRhaW5lckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ091dENvbnRhaW5lckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3V0Q29udGFpbmVyRXZlbnQsIFt7XG4gICAga2V5OiAnb3ZlckNvbnRhaW5lcicsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBjb250YWluZXIgeW91IGxlZnRcbiAgICAgKiBAcHJvcGVydHkgb3ZlckNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlckNvbnRhaW5lcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdPdXRDb250YWluZXJFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIHByZXNzdXJlIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ1ByZXNzdXJlRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ1ByZXNzdXJlRXZlbnRcbiAqIEBleHRlbmRzIERyYWdFdmVudFxuICovXG5cblxuRHJhZ091dENvbnRhaW5lckV2ZW50LnR5cGUgPSAnZHJhZzpvdXQ6Y29udGFpbmVyJztcblxudmFyIERyYWdQcmVzc3VyZUV2ZW50ID0gZXhwb3J0cy5EcmFnUHJlc3N1cmVFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50Nykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnUHJlc3N1cmVFdmVudCwgX0RyYWdFdmVudDcpO1xuXG4gIGZ1bmN0aW9uIERyYWdQcmVzc3VyZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdQcmVzc3VyZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1ByZXNzdXJlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnUHJlc3N1cmVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ1ByZXNzdXJlRXZlbnQsIFt7XG4gICAga2V5OiAncHJlc3N1cmUnLFxuXG5cbiAgICAvKipcbiAgICAgKiBQcmVzc3VyZSBhcHBsaWVkIG9uIGRyYWdnYWJsZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IHByZXNzdXJlXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEucHJlc3N1cmU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnUHJlc3N1cmVFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIHN0b3AgZXZlbnRcbiAqIEBjbGFzcyBEcmFnU3RvcEV2ZW50XG4gKiBAbW9kdWxlIERyYWdTdG9wRXZlbnRcbiAqIEBleHRlbmRzIERyYWdFdmVudFxuICovXG5cblxuRHJhZ1ByZXNzdXJlRXZlbnQudHlwZSA9ICdkcmFnOnByZXNzdXJlJztcblxudmFyIERyYWdTdG9wRXZlbnQgPSBleHBvcnRzLkRyYWdTdG9wRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDgpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1N0b3BFdmVudCwgX0RyYWdFdmVudDgpO1xuXG4gIGZ1bmN0aW9uIERyYWdTdG9wRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1N0b3BFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdG9wRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU3RvcEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1N0b3BFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuRHJhZ1N0b3BFdmVudC50eXBlID0gJ2RyYWc6c3RvcCc7XG5cbi8qKiovIH0pLFxuLyogMTM4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfTWlycm9yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzOSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTWlycm9yQ3JlYXRlZEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX01pcnJvckV2ZW50Lk1pcnJvckNyZWF0ZWRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ01pcnJvckF0dGFjaGVkRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfTWlycm9yRXZlbnQuTWlycm9yQXR0YWNoZWRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ01pcnJvck1vdmVFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9NaXJyb3JFdmVudC5NaXJyb3JNb3ZlRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdNaXJyb3JEZXN0cm95RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfTWlycm9yRXZlbnQuTWlycm9yRGVzdHJveUV2ZW50O1xuICB9XG59KTtcblxuLyoqKi8gfSksXG4vKiAxMzkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuTWlycm9yRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JNb3ZlRXZlbnQgPSBleHBvcnRzLk1pcnJvckF0dGFjaGVkRXZlbnQgPSBleHBvcnRzLk1pcnJvckNyZWF0ZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIG1pcnJvciBldmVudFxuICogQGNsYXNzIE1pcnJvckV2ZW50XG4gKiBAbW9kdWxlIE1pcnJvckV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBNaXJyb3JFdmVudCA9IGV4cG9ydHMuTWlycm9yRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTWlycm9yRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBNaXJyb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWlycm9yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE1pcnJvckV2ZW50LCBbe1xuICAgIGtleTogJ2hhc01pcnJvcicsXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBtaXJyb3IgaGFzIGJlZW4gY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc01pcnJvcigpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMubWlycm9yKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzb3VyY2UnLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIHNvdXJjZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IHNvdXJjZVxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgb3JpZ2luYWwgc291cmNlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgb3JpZ2luYWxTb3VyY2VcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29yaWdpbmFsU291cmNlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3JpZ2luYWxTb3VyY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBtaXJyb3IgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBtaXJyb3JcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ21pcnJvcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm1pcnJvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIHNvdXJjZSBjb250YWluZXIgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBzb3VyY2VDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NvdXJjZUNvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnNvdXJjZUNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5zb3IgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgc2Vuc29yRXZlbnRcbiAgICAgKiBAdHlwZSB7U2Vuc29yRXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NlbnNvckV2ZW50JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc2Vuc29yRXZlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3JpZ2luYWwgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgc2Vuc29yIGV2ZW50XG4gICAgICogQHByb3BlcnR5IG9yaWdpbmFsRXZlbnRcbiAgICAgKiBAdHlwZSB7RXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29yaWdpbmFsRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgaWYgKHRoaXMuc2Vuc29yRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vuc29yRXZlbnQub3JpZ2luYWxFdmVudDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNaXJyb3JFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIE1pcnJvciBjcmVhdGVkIGV2ZW50XG4gKiBAY2xhc3MgTWlycm9yQ3JlYXRlZEV2ZW50XG4gKiBAbW9kdWxlIE1pcnJvckNyZWF0ZWRFdmVudFxuICogQGV4dGVuZHMgTWlycm9yRXZlbnRcbiAqL1xuXG5cbnZhciBNaXJyb3JDcmVhdGVkRXZlbnQgPSBleHBvcnRzLk1pcnJvckNyZWF0ZWRFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTWlycm9yQ3JlYXRlZEV2ZW50LCBfTWlycm9yRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckNyZWF0ZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JDcmVhdGVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JDcmVhdGVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JDcmVhdGVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JDcmVhdGVkRXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuLyoqXG4gKiBNaXJyb3IgYXR0YWNoZWQgZXZlbnRcbiAqIEBjbGFzcyBNaXJyb3JBdHRhY2hlZEV2ZW50XG4gKiBAbW9kdWxlIE1pcnJvckF0dGFjaGVkRXZlbnRcbiAqIEBleHRlbmRzIE1pcnJvckV2ZW50XG4gKi9cblxuXG5NaXJyb3JDcmVhdGVkRXZlbnQudHlwZSA9ICdtaXJyb3I6Y3JlYXRlZCc7XG5cbnZhciBNaXJyb3JBdHRhY2hlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JBdHRhY2hlZEV2ZW50ID0gZnVuY3Rpb24gKF9NaXJyb3JFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTWlycm9yQXR0YWNoZWRFdmVudCwgX01pcnJvckV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gTWlycm9yQXR0YWNoZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JBdHRhY2hlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yQXR0YWNoZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckF0dGFjaGVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JBdHRhY2hlZEV2ZW50O1xufShNaXJyb3JFdmVudCk7XG5cbi8qKlxuICogTWlycm9yIG1vdmUgZXZlbnRcbiAqIEBjbGFzcyBNaXJyb3JNb3ZlRXZlbnRcbiAqIEBtb2R1bGUgTWlycm9yTW92ZUV2ZW50XG4gKiBAZXh0ZW5kcyBNaXJyb3JFdmVudFxuICovXG5cblxuTWlycm9yQXR0YWNoZWRFdmVudC50eXBlID0gJ21pcnJvcjphdHRhY2hlZCc7XG5cbnZhciBNaXJyb3JNb3ZlRXZlbnQgPSBleHBvcnRzLk1pcnJvck1vdmVFdmVudCA9IGZ1bmN0aW9uIChfTWlycm9yRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1pcnJvck1vdmVFdmVudCwgX01pcnJvckV2ZW50Myk7XG5cbiAgZnVuY3Rpb24gTWlycm9yTW92ZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvck1vdmVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvck1vdmVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvck1vdmVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIE1pcnJvck1vdmVFdmVudDtcbn0oTWlycm9yRXZlbnQpO1xuXG4vKipcbiAqIE1pcnJvciBkZXN0cm95IGV2ZW50XG4gKiBAY2xhc3MgTWlycm9yRGVzdHJveUV2ZW50XG4gKiBAbW9kdWxlIE1pcnJvckRlc3Ryb3lFdmVudFxuICogQGV4dGVuZHMgTWlycm9yRXZlbnRcbiAqL1xuXG5cbk1pcnJvck1vdmVFdmVudC50eXBlID0gJ21pcnJvcjptb3ZlJztcbk1pcnJvck1vdmVFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIE1pcnJvckRlc3Ryb3lFdmVudCA9IGV4cG9ydHMuTWlycm9yRGVzdHJveUV2ZW50ID0gZnVuY3Rpb24gKF9NaXJyb3JFdmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTWlycm9yRGVzdHJveUV2ZW50LCBfTWlycm9yRXZlbnQ0KTtcblxuICBmdW5jdGlvbiBNaXJyb3JEZXN0cm95RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yRGVzdHJveUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yRGVzdHJveUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWlycm9yRGVzdHJveUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gTWlycm9yRGVzdHJveUV2ZW50O1xufShNaXJyb3JFdmVudCk7XG5cbk1pcnJvckRlc3Ryb3lFdmVudC50eXBlID0gJ21pcnJvcjpkZXN0cm95Jztcbk1pcnJvckRlc3Ryb3lFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxuLyoqKi8gfSksXG4vKiAxNDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Ecm9wcGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0MSk7XG5cbnZhciBfRHJvcHBhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Ryb3BwYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Ecm9wcGFibGUyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTQxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9Db25zdW1hYmxlQXJyYXkyKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9nZXQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mik7XG5cbnZhciBfZ2V0MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldDIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG52YXIgX0RyYWdnYWJsZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxudmFyIF9EcmFnZ2FibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJhZ2dhYmxlMik7XG5cbnZhciBfRHJvcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0OCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkRyYWdTdGFydCA9IFN5bWJvbCgnb25EcmFnU3RhcnQnKTtcbnZhciBvbkRyYWdNb3ZlID0gU3ltYm9sKCdvbkRyYWdNb3ZlJyk7XG52YXIgb25EcmFnU3RvcCA9IFN5bWJvbCgnb25EcmFnU3RvcCcpO1xudmFyIGRyb3AgPSBTeW1ib2woJ2Ryb3AnKTtcbnZhciByZWxlYXNlID0gU3ltYm9sKCdyZWxlYXNlJyk7XG52YXIgY2xvc2VzdERyb3BwYWJsZSA9IFN5bWJvbCgnY2xvc2VzdERyb3BwYWJsZScpO1xudmFyIGdldERyb3BwYWJsZXMgPSBTeW1ib2woJ2dldERyb3BwYWJsZXMnKTtcblxudmFyIGNsYXNzZXMgPSB7XG4gICdkcm9wcGFibGU6YWN0aXZlJzogJ2RyYWdnYWJsZS1kcm9wcGFibGUtLWFjdGl2ZScsXG4gICdkcm9wcGFibGU6b2NjdXBpZWQnOiAnZHJhZ2dhYmxlLWRyb3BwYWJsZS0tb2NjdXBpZWQnXG59O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGRyb3BwYWJsZTogJy5kcmFnZ2FibGUtZHJvcHBhYmxlJ1xufTtcblxuLyoqXG4gKiBEcm9wcGFibGUgaXMgYnVpbHQgb24gdG9wIG9mIERyYWdnYWJsZSBhbmQgYWxsb3dzIGRyb3BwaW5nIGRyYWdnYWJsZSBlbGVtZW50c1xuICogaW50byBkcm9wcGFibGUgZWxlbWVudFxuICogQGNsYXNzIERyb3BwYWJsZVxuICogQG1vZHVsZSBEcm9wcGFibGVcbiAqIEBleHRlbmRzIERyYWdnYWJsZVxuICovXG5cbnZhciBEcm9wcGFibGUgPSBmdW5jdGlvbiAoX0RyYWdnYWJsZSkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGUsIF9EcmFnZ2FibGUpO1xuXG4gIC8qKlxuICAgKiBEcm9wcGFibGUgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIERyb3BwYWJsZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBEcm9wcGFibGUgY29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIERyb3BwYWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gRHJvcHBhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlKTtcblxuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyb3BwYWJsZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZSkpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBfdGhpcy5vcHRpb25zKTtcblxuICAgIC8qKlxuICAgICAqIEFsbCBkcm9wcGFibGUgZWxlbWVudHMgb24gZHJhZyBzdGFydFxuICAgICAqIEBwcm9wZXJ0eSBkcm9wcGFibGVzXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgX3RoaXMuZHJvcHBhYmxlcyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBMYXN0IGRyb3BwYWJsZSBlbGVtZW50IHRoYXQgdGhlIHNvdXJjZSB3YXMgZHJvcHBlZCBpbnRvXG4gICAgICogQHByb3BlcnR5IGxhc3REcm9wcGFibGVcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgX3RoaXMubGFzdERyb3BwYWJsZSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsIGRyb3BwYWJsZSBlbGVtZW50IHRoYXQgdGhlIHNvdXJjZSB3YXMgZHJhZyBmcm9tXG4gICAgICogQHByb3BlcnR5IGluaXRpYWxEcm9wcGFibGVcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgX3RoaXMuaW5pdGlhbERyb3BwYWJsZSA9IG51bGw7XG5cbiAgICBfdGhpc1tvbkRyYWdTdGFydF0gPSBfdGhpc1tvbkRyYWdTdGFydF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnTW92ZV0gPSBfdGhpc1tvbkRyYWdNb3ZlXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdTdG9wXSA9IF90aGlzW29uRHJhZ1N0b3BdLmJpbmQoX3RoaXMpO1xuXG4gICAgX3RoaXMub24oJ2RyYWc6c3RhcnQnLCBfdGhpc1tvbkRyYWdTdGFydF0pLm9uKCdkcmFnOm1vdmUnLCBfdGhpc1tvbkRyYWdNb3ZlXSkub24oJ2RyYWc6c3RvcCcsIF90aGlzW29uRHJhZ1N0b3BdKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgRHJvcHBhYmxlIGluc3RhbmNlLlxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyb3BwYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICgwLCBfZ2V0My5kZWZhdWx0KShEcm9wcGFibGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJvcHBhYmxlLnByb3RvdHlwZSksICdkZXN0cm95JywgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgdGhpcy5vZmYoJ2RyYWc6c3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSkub2ZmKCdkcmFnOm1vdmUnLCB0aGlzW29uRHJhZ01vdmVdKS5vZmYoJ2RyYWc6c3RvcCcsIHRoaXNbb25EcmFnU3RvcF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY2xhc3MgbmFtZSBmb3IgY2xhc3MgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiBjbGFzcyBpZGVudGlmaWVyXG4gICAgICogQHJldHVybiB7U3RyaW5nfG51bGx9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldENsYXNzTmFtZUZvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsYXNzTmFtZUZvcihuYW1lKSB7XG4gICAgICByZXR1cm4gKDAsIF9nZXQzLmRlZmF1bHQpKERyb3BwYWJsZS5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wcGFibGUucHJvdG90eXBlKSwgJ2dldENsYXNzTmFtZUZvcicsIHRoaXMpLmNhbGwodGhpcywgbmFtZSkgfHwgY2xhc3Nlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0YXJ0IGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ1N0YXJ0RXZlbnR9IGV2ZW50IC0gRHJhZyBzdGFydCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyb3BwYWJsZXMgPSBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpc1tnZXREcm9wcGFibGVzXSgpKSk7XG4gICAgICB2YXIgZHJvcHBhYmxlID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC5zZW5zb3JFdmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy5kcm9wcGFibGUpO1xuXG4gICAgICBpZiAoIWRyb3BwYWJsZSkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluaXRpYWxEcm9wcGFibGUgPSBkcm9wcGFibGU7XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLmRyb3BwYWJsZXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGRyb3BwYWJsZUVsZW1lbnQgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJykpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTphY3RpdmUnKSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgbW92ZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdNb3ZlRXZlbnR9IGV2ZW50IC0gRHJhZyBtb3ZlIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnTW92ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRyb3BwYWJsZSA9IHRoaXNbY2xvc2VzdERyb3BwYWJsZV0oZXZlbnQuc2Vuc29yRXZlbnQudGFyZ2V0KTtcbiAgICAgIHZhciBvdmVyRW1wdHlEcm9wcGFibGUgPSBkcm9wcGFibGUgJiYgIWRyb3BwYWJsZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpKTtcblxuICAgICAgaWYgKG92ZXJFbXB0eURyb3BwYWJsZSAmJiB0aGlzW2Ryb3BdKGV2ZW50LCBkcm9wcGFibGUpKSB7XG4gICAgICAgIHRoaXMubGFzdERyb3BwYWJsZSA9IGRyb3BwYWJsZTtcbiAgICAgIH0gZWxzZSBpZiAoKCFkcm9wcGFibGUgfHwgZHJvcHBhYmxlID09PSB0aGlzLmluaXRpYWxEcm9wcGFibGUpICYmIHRoaXMubGFzdERyb3BwYWJsZSkge1xuICAgICAgICB0aGlzW3JlbGVhc2VdKGV2ZW50KTtcbiAgICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0b3AgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnU3RvcEV2ZW50fSBldmVudCAtIERyYWcgc3RvcCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0b3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgdmFyIG9jY3VwaWVkQ2xhc3MgPSB0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJyk7XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5kcm9wcGFibGVzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGRyb3BwYWJsZSA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgIGRyb3BwYWJsZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6YWN0aXZlJykpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxhc3REcm9wcGFibGUgJiYgdGhpcy5sYXN0RHJvcHBhYmxlICE9PSB0aGlzLmluaXRpYWxEcm9wcGFibGUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsRHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUob2NjdXBpZWRDbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJvcHBhYmxlcyA9IG51bGw7XG4gICAgICB0aGlzLmxhc3REcm9wcGFibGUgPSBudWxsO1xuICAgICAgdGhpcy5pbml0aWFsRHJvcHBhYmxlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcm9wIG1ldGhvZCBkcm9wcyBhIGRyYWdnYWJsZSBlbGVtZW50IGludG8gYSBkcm9wcGFibGUgZWxlbWVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnTW92ZUV2ZW50fSBldmVudCAtIERyYWcgbW92ZSBldmVudFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRyb3BwYWJsZSAtIERyb3BwYWJsZSBlbGVtZW50IHRvIGRyb3AgZHJhZ2dhYmxlIGludG9cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBkcm9wLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCwgZHJvcHBhYmxlKSB7XG4gICAgICB2YXIgZHJvcHBhYmxlT3ZlckV2ZW50ID0gbmV3IF9Ecm9wcGFibGVFdmVudC5Ecm9wcGFibGVPdmVyRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBkcm9wcGFibGU6IGRyb3BwYWJsZVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihkcm9wcGFibGVPdmVyRXZlbnQpO1xuXG4gICAgICBpZiAoZHJvcHBhYmxlT3ZlckV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgb2NjdXBpZWRDbGFzcyA9IHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6b2NjdXBpZWQnKTtcblxuICAgICAgaWYgKHRoaXMubGFzdERyb3BwYWJsZSkge1xuICAgICAgICB0aGlzLmxhc3REcm9wcGFibGUuY2xhc3NMaXN0LnJlbW92ZShvY2N1cGllZENsYXNzKTtcbiAgICAgIH1cblxuICAgICAgZHJvcHBhYmxlLmFwcGVuZENoaWxkKGV2ZW50LnNvdXJjZSk7XG4gICAgICBkcm9wcGFibGUuY2xhc3NMaXN0LmFkZChvY2N1cGllZENsYXNzKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZSBtZXRob2QgbW92ZXMgdGhlIHByZXZpb3VzbHkgZHJvcHBlZCBlbGVtZW50IGJhY2sgaW50byBpdHMgb3JpZ2luYWwgcG9zaXRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ01vdmVFdmVudH0gZXZlbnQgLSBEcmFnIG1vdmUgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiByZWxlYXNlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIGRyb3BwYWJsZU91dEV2ZW50ID0gbmV3IF9Ecm9wcGFibGVFdmVudC5Ecm9wcGFibGVPdXRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGRyb3BwYWJsZTogdGhpcy5sYXN0RHJvcHBhYmxlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyb3BwYWJsZU91dEV2ZW50KTtcblxuICAgICAgaWYgKGRyb3BwYWJsZU91dEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluaXRpYWxEcm9wcGFibGUuYXBwZW5kQ2hpbGQoZXZlbnQuc291cmNlKTtcbiAgICAgIHRoaXMubGFzdERyb3BwYWJsZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6b2NjdXBpZWQnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjbG9zZXN0IGRyb3BwYWJsZSBlbGVtZW50IGZvciBldmVuIHRhcmdldFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0IC0gRXZlbnQgdGFyZ2V0XG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR8bnVsbH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBjbG9zZXN0RHJvcHBhYmxlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSh0YXJnZXQpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMuZHJvcHBhYmxlcykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmRyb3BwYWJsZXMuaW5jbHVkZXMoZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBjdXJyZW50IGRyb3BwYWJsZSBlbGVtZW50cyBmb3IgdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm4ge05vZGVMaXN0fEhUTUxFbGVtZW50W118QXJyYXl9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogZ2V0RHJvcHBhYmxlcyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgICB2YXIgZHJvcHBhYmxlcyA9IHRoaXMub3B0aW9ucy5kcm9wcGFibGU7XG5cbiAgICAgIGlmICh0eXBlb2YgZHJvcHBhYmxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZHJvcHBhYmxlcyk7XG4gICAgICB9IGVsc2UgaWYgKGRyb3BwYWJsZXMgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBkcm9wcGFibGVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGRyb3BwYWJsZXM7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkcm9wcGFibGVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBkcm9wcGFibGVzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcm9wcGFibGU7XG59KF9EcmFnZ2FibGUzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcm9wcGFibGU7XG5cbi8qKiovIH0pLFxuLyogMTQyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXygxNDMpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogMTQzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMTQ0KTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cbi8qKiovIH0pLFxuLyogMTQ0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG4gICwgJGdldFByb3RvdHlwZU9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Mik7XG5cbl9fd2VicGFja19yZXF1aXJlX18oNTYpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cbi8qKiovIH0pLFxuLyogMTQ1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXygxNDYpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogMTQ2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMTQ3KTtcbnZhciAkT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgcmV0dXJuICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xufTtcblxuLyoqKi8gfSksXG4vKiAxNDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxudmFyIHRvSU9iamVjdCAgICAgICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpXG4gICwgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IF9fd2VicGFja19yZXF1aXJlX18oNDEpLmY7XG5cbl9fd2VicGFja19yZXF1aXJlX18oNTYpKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvSU9iamVjdChpdCksIGtleSk7XG4gIH07XG59KTtcblxuLyoqKi8gfSksXG4vKiAxNDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Ecm9wcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQ5KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcm9wcGFibGVPdmVyRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJvcHBhYmxlRXZlbnQuRHJvcHBhYmxlT3ZlckV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJvcHBhYmxlT3V0RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJvcHBhYmxlRXZlbnQuRHJvcHBhYmxlT3V0RXZlbnQ7XG4gIH1cbn0pO1xuXG4vKioqLyB9KSxcbi8qIDE0OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Ecm9wcGFibGVPdXRFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlT3ZlckV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2UgZHJvcHBhYmxlIGV2ZW50XG4gKiBAY2xhc3MgRHJvcHBhYmxlRXZlbnRcbiAqIEBtb2R1bGUgRHJvcHBhYmxlRXZlbnRcbiAqIEBleHRlbmRzIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIERyb3BwYWJsZUV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGVFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyb3BwYWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyb3BwYWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJvcHBhYmxlRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wcGFibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJvcHBhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcblxuXG4gICAgLyoqXG4gICAgICogT3JpZ2luYWwgZHJhZyBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGlzIGRyb3BwYWJsZSBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBkcmFnRXZlbnRcbiAgICAgKiBAdHlwZSB7RHJhZ0V2ZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcmFnRXZlbnQ7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcm9wcGFibGVFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIERyb3BwYWJsZSBvdmVyIGV2ZW50XG4gKiBAY2xhc3MgRHJvcHBhYmxlT3ZlckV2ZW50XG4gKiBAbW9kdWxlIERyb3BwYWJsZU92ZXJFdmVudFxuICogQGV4dGVuZHMgRHJvcHBhYmxlRXZlbnRcbiAqL1xuXG5cbkRyb3BwYWJsZUV2ZW50LnR5cGUgPSAnZHJvcHBhYmxlJztcblxudmFyIERyb3BwYWJsZU92ZXJFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlT3ZlckV2ZW50ID0gZnVuY3Rpb24gKF9Ecm9wcGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGVPdmVyRXZlbnQsIF9Ecm9wcGFibGVFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJvcHBhYmxlT3ZlckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyb3BwYWJsZU92ZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyb3BwYWJsZU92ZXJFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZU92ZXJFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJvcHBhYmxlT3ZlckV2ZW50LCBbe1xuICAgIGtleTogJ2Ryb3BwYWJsZScsXG5cblxuICAgIC8qKlxuICAgICAqIFRoZSBkcm9wcGFibGUgZWxlbWVudCB5b3UgYXJlIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgZHJvcHBhYmxlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcm9wcGFibGU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcm9wcGFibGVPdmVyRXZlbnQ7XG59KERyb3BwYWJsZUV2ZW50KTtcblxuLyoqXG4gKiBEcm9wcGFibGUgb3V0IGV2ZW50XG4gKiBAY2xhc3MgRHJvcHBhYmxlT3V0RXZlbnRcbiAqIEBtb2R1bGUgRHJvcHBhYmxlT3V0RXZlbnRcbiAqIEBleHRlbmRzIERyb3BwYWJsZUV2ZW50XG4gKi9cblxuXG5Ecm9wcGFibGVPdmVyRXZlbnQudHlwZSA9ICdkcm9wcGFibGU6b3Zlcic7XG5Ecm9wcGFibGVPdmVyRXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBEcm9wcGFibGVPdXRFdmVudCA9IGV4cG9ydHMuRHJvcHBhYmxlT3V0RXZlbnQgPSBmdW5jdGlvbiAoX0Ryb3BwYWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcm9wcGFibGVPdXRFdmVudCwgX0Ryb3BwYWJsZUV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJvcHBhYmxlT3V0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcm9wcGFibGVPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZU91dEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcm9wcGFibGVPdXRFdmVudCwgW3tcbiAgICBrZXk6ICdkcm9wcGFibGUnLFxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJvcHBhYmxlIGVsZW1lbnQgeW91IF93ZXJlXyBvdmVyXG4gICAgICogQHByb3BlcnR5IGRyb3BwYWJsZVxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJvcHBhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJvcHBhYmxlT3V0RXZlbnQ7XG59KERyb3BwYWJsZUV2ZW50KTtcblxuRHJvcHBhYmxlT3V0RXZlbnQudHlwZSA9ICdkcm9wcGFibGU6b3V0JztcbkRyb3BwYWJsZU91dEV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG4vKioqLyB9KSxcbi8qIDE1MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1N3YXBwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTUxKTtcblxudmFyIF9Td2FwcGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3dhcHBhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1N3YXBwYWJsZTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxNTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9nZXQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mik7XG5cbnZhciBfZ2V0MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldDIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9EcmFnZ2FibGUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cbnZhciBfRHJhZ2dhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdnYWJsZTIpO1xuXG52YXIgX1N3YXBwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNTIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb25EcmFnU3RhcnQgPSBTeW1ib2woJ29uRHJhZ1N0YXJ0Jyk7XG52YXIgb25EcmFnT3ZlciA9IFN5bWJvbCgnb25EcmFnT3ZlcicpO1xudmFyIG9uRHJhZ1N0b3AgPSBTeW1ib2woJ29uRHJhZ1N0b3AnKTtcblxuLyoqXG4gKiBTd2FwcGFibGUgaXMgYnVpbHQgb24gdG9wIG9mIERyYWdnYWJsZSBhbmQgYWxsb3dzIHN3YXBwaW5nIG9mIGRyYWdnYWJsZSBlbGVtZW50cy5cbiAqIE9yZGVyIGlzIGlycmVsZXZhbnQgdG8gU3dhcHBhYmxlLlxuICogQGNsYXNzIFN3YXBwYWJsZVxuICogQG1vZHVsZSBTd2FwcGFibGVcbiAqIEBleHRlbmRzIERyYWdnYWJsZVxuICovXG5cbnZhciBTd2FwcGFibGUgPSBmdW5jdGlvbiAoX0RyYWdnYWJsZSkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGUsIF9EcmFnZ2FibGUpO1xuXG4gIC8qKlxuICAgKiBTd2FwcGFibGUgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIFN3YXBwYWJsZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBTd2FwcGFibGUgY29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIFN3YXBwYWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gU3dhcHBhYmxlKCkge1xuICAgIHZhciBjb250YWluZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlKTtcblxuICAgIC8qKlxuICAgICAqIExhc3QgZHJhZ2dhYmxlIGVsZW1lbnQgdGhhdCB3YXMgZHJhZ2dlZCBvdmVyXG4gICAgICogQHByb3BlcnR5IGxhc3RPdmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZSkpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMubGFzdE92ZXIgPSBudWxsO1xuXG4gICAgX3RoaXNbb25EcmFnU3RhcnRdID0gX3RoaXNbb25EcmFnU3RhcnRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ092ZXJdID0gX3RoaXNbb25EcmFnT3Zlcl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnU3RvcF0gPSBfdGhpc1tvbkRyYWdTdG9wXS5iaW5kKF90aGlzKTtcblxuICAgIF90aGlzLm9uKCdkcmFnOnN0YXJ0JywgX3RoaXNbb25EcmFnU3RhcnRdKS5vbignZHJhZzpvdmVyJywgX3RoaXNbb25EcmFnT3Zlcl0pLm9uKCdkcmFnOnN0b3AnLCBfdGhpc1tvbkRyYWdTdG9wXSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIFN3YXBwYWJsZSBpbnN0YW5jZS5cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTd2FwcGFibGUsIFt7XG4gICAga2V5OiAnZGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAoMCwgX2dldDMuZGVmYXVsdCkoU3dhcHBhYmxlLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZS5wcm90b3R5cGUpLCAnZGVzdHJveScsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgIHRoaXMub2ZmKCdkcmFnOnN0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQpLm9mZignZHJhZzpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub2ZmKCdkcmFnOnN0b3AnLCB0aGlzLl9vbkRyYWdTdG9wKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0YXJ0IGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ1N0YXJ0RXZlbnR9IGV2ZW50IC0gRHJhZyBzdGFydCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIHN3YXBwYWJsZVN0YXJ0RXZlbnQgPSBuZXcgX1N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN0YXJ0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHN3YXBwYWJsZVN0YXJ0RXZlbnQpO1xuXG4gICAgICBpZiAoc3dhcHBhYmxlU3RhcnRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgb3ZlciBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdPdmVyRXZlbnR9IGV2ZW50IC0gRHJhZyBvdmVyIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnT3ZlcixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5vdmVyID09PSBldmVudC5vcmlnaW5hbFNvdXJjZSB8fCBldmVudC5vdmVyID09PSBldmVudC5zb3VyY2UgfHwgZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzd2FwcGFibGVTd2FwRXZlbnQgPSBuZXcgX1N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN3YXBFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIG92ZXI6IGV2ZW50Lm92ZXIsXG4gICAgICAgIG92ZXJDb250YWluZXI6IGV2ZW50Lm92ZXJDb250YWluZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc3dhcHBhYmxlU3dhcEV2ZW50KTtcblxuICAgICAgaWYgKHN3YXBwYWJsZVN3YXBFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gc3dhcCBvcmlnaW5hbGx5IHN3YXBwZWQgZWxlbWVudCBiYWNrXG4gICAgICBpZiAodGhpcy5sYXN0T3ZlciAmJiB0aGlzLmxhc3RPdmVyICE9PSBldmVudC5vdmVyKSB7XG4gICAgICAgIHN3YXAodGhpcy5sYXN0T3ZlciwgZXZlbnQuc291cmNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGFzdE92ZXIgPT09IGV2ZW50Lm92ZXIpIHtcbiAgICAgICAgdGhpcy5sYXN0T3ZlciA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxhc3RPdmVyID0gZXZlbnQub3ZlcjtcbiAgICAgIH1cblxuICAgICAgc3dhcChldmVudC5zb3VyY2UsIGV2ZW50Lm92ZXIpO1xuXG4gICAgICB2YXIgc3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gbmV3IF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTd2FwcGVkRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBzd2FwcGVkRWxlbWVudDogZXZlbnQub3ZlclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzd2FwcGFibGVTd2FwcGVkRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RvcCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdTdG9wRXZlbnR9IGV2ZW50IC0gRHJhZyBzdG9wIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnU3RvcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBzd2FwcGFibGVTdG9wRXZlbnQgPSBuZXcgX1N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN0b3BFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc3dhcHBhYmxlU3RvcEV2ZW50KTtcbiAgICAgIHRoaXMubGFzdE92ZXIgPSBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3dhcHBhYmxlO1xufShfRHJhZ2dhYmxlMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3dhcHBhYmxlO1xuXG5cbmZ1bmN0aW9uIHdpdGhUZW1wRWxlbWVudChjYWxsYmFjaykge1xuICB2YXIgdG1wRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjYWxsYmFjayh0bXBFbGVtZW50KTtcbiAgdG1wRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRtcEVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBzd2FwKHNvdXJjZSwgb3Zlcikge1xuICB2YXIgb3ZlclBhcmVudCA9IG92ZXIucGFyZW50Tm9kZTtcbiAgdmFyIHNvdXJjZVBhcmVudCA9IHNvdXJjZS5wYXJlbnROb2RlO1xuXG4gIHdpdGhUZW1wRWxlbWVudChmdW5jdGlvbiAodG1wRWxlbWVudCkge1xuICAgIHNvdXJjZVBhcmVudC5pbnNlcnRCZWZvcmUodG1wRWxlbWVudCwgc291cmNlKTtcbiAgICBvdmVyUGFyZW50Lmluc2VydEJlZm9yZShzb3VyY2UsIG92ZXIpO1xuICAgIHNvdXJjZVBhcmVudC5pbnNlcnRCZWZvcmUob3ZlciwgdG1wRWxlbWVudCk7XG4gIH0pO1xufVxuXG4vKioqLyB9KSxcbi8qIDE1MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1N3YXBwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNTMpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1N3YXBwYWJsZVN0YXJ0RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3RhcnRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1N3YXBwYWJsZVN3YXBFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTd2FwRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTd2FwcGFibGVTd2FwcGVkRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3dhcHBlZEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU3dhcHBhYmxlU3RvcEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN0b3BFdmVudDtcbiAgfVxufSk7XG5cbi8qKiovIH0pLFxuLyogMTUzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlN3YXBwYWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTd2FwRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN0YXJ0RXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBzd2FwcGFibGUgZXZlbnRcbiAqIEBjbGFzcyBTd2FwcGFibGVFdmVudFxuICogQG1vZHVsZSBTd2FwcGFibGVFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgU3dhcHBhYmxlRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTd2FwcGFibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBkcmFnIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoaXMgc3dhcHBhYmxlIGV2ZW50XG4gICAgICogQHByb3BlcnR5IGRyYWdFdmVudFxuICAgICAqIEB0eXBlIHtEcmFnRXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZUV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogU3dhcHBhYmxlIHN0YXJ0IGV2ZW50XG4gKiBAY2xhc3MgU3dhcHBhYmxlU3RhcnRFdmVudFxuICogQG1vZHVsZSBTd2FwcGFibGVTdGFydEV2ZW50XG4gKiBAZXh0ZW5kcyBTd2FwcGFibGVFdmVudFxuICovXG5cblxuU3dhcHBhYmxlRXZlbnQudHlwZSA9ICdzd2FwcGFibGUnO1xuXG52YXIgU3dhcHBhYmxlU3RhcnRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3RhcnRFdmVudCA9IGZ1bmN0aW9uIChfU3dhcHBhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3RhcnRFdmVudCwgX1N3YXBwYWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTdGFydEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZVN0YXJ0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGVTdGFydEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3RhcnRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIFN3YXBwYWJsZVN0YXJ0RXZlbnQ7XG59KFN3YXBwYWJsZUV2ZW50KTtcblxuLyoqXG4gKiBTd2FwcGFibGUgc3dhcCBldmVudFxuICogQGNsYXNzIFN3YXBwYWJsZVN3YXBFdmVudFxuICogQG1vZHVsZSBTd2FwcGFibGVTd2FwRXZlbnRcbiAqIEBleHRlbmRzIFN3YXBwYWJsZUV2ZW50XG4gKi9cblxuXG5Td2FwcGFibGVTdGFydEV2ZW50LnR5cGUgPSAnc3dhcHBhYmxlOnN0YXJ0JztcblN3YXBwYWJsZVN0YXJ0RXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBTd2FwcGFibGVTd2FwRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN3YXBFdmVudCA9IGZ1bmN0aW9uIChfU3dhcHBhYmxlRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZVN3YXBFdmVudCwgX1N3YXBwYWJsZUV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gU3dhcHBhYmxlU3dhcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBwYWJsZVN3YXBFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZVN3YXBFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXBwYWJsZVN3YXBFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3dhcHBhYmxlU3dhcEV2ZW50LCBbe1xuICAgIGtleTogJ292ZXInLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgZWxlbWVudCB5b3UgYXJlIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyIHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlckNvbnRhaW5lcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZVN3YXBFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG4vKipcbiAqIFN3YXBwYWJsZSBzd2FwcGVkIGV2ZW50XG4gKiBAY2xhc3MgU3dhcHBhYmxlU3dhcHBlZEV2ZW50XG4gKiBAbW9kdWxlIFN3YXBwYWJsZVN3YXBwZWRFdmVudFxuICogQGV4dGVuZHMgU3dhcHBhYmxlRXZlbnRcbiAqL1xuXG5cblN3YXBwYWJsZVN3YXBFdmVudC50eXBlID0gJ3N3YXBwYWJsZTpzd2FwJztcblN3YXBwYWJsZVN3YXBFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIFN3YXBwYWJsZVN3YXBwZWRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3dhcHBlZEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQzKTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTd2FwcGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3dhcHBlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3dhcHBlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3dhcHBlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTd2FwcGFibGVTd2FwcGVkRXZlbnQsIFt7XG4gICAga2V5OiAnc3dhcHBlZEVsZW1lbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJhZ2dhYmxlIGVsZW1lbnQgdGhhdCB5b3Ugc3dhcHBlZCB3aXRoXG4gICAgICogQHByb3BlcnR5IHN3YXBwZWRFbGVtZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zd2FwcGVkRWxlbWVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN3YXBwYWJsZVN3YXBwZWRFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG4vKipcbiAqIFN3YXBwYWJsZSBzdG9wIGV2ZW50XG4gKiBAY2xhc3MgU3dhcHBhYmxlU3RvcEV2ZW50XG4gKiBAbW9kdWxlIFN3YXBwYWJsZVN0b3BFdmVudFxuICogQGV4dGVuZHMgU3dhcHBhYmxlRXZlbnRcbiAqL1xuXG5cblN3YXBwYWJsZVN3YXBwZWRFdmVudC50eXBlID0gJ3N3YXBwYWJsZTpzd2FwcGVkJztcblxudmFyIFN3YXBwYWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3RvcEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3RvcEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQ0KTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTdG9wRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3RvcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3RvcEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3RvcEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gU3dhcHBhYmxlU3RvcEV2ZW50O1xufShTd2FwcGFibGVFdmVudCk7XG5cblN3YXBwYWJsZVN0b3BFdmVudC50eXBlID0gJ3N3YXBwYWJsZTpzdG9wJztcblxuLyoqKi8gfSksXG4vKiAxNTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Tb3J0YWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTU1KTtcblxudmFyIF9Tb3J0YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0YWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Tb3J0YWJsZTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxNTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b0NvbnN1bWFibGVBcnJheTIpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2dldDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKTtcblxudmFyIF9nZXQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0Mik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0RyYWdnYWJsZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxudmFyIF9EcmFnZ2FibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJhZ2dhYmxlMik7XG5cbnZhciBfU29ydGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTU2KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uRHJhZ1N0YXJ0ID0gU3ltYm9sKCdvbkRyYWdTdGFydCcpO1xudmFyIG9uRHJhZ092ZXJDb250YWluZXIgPSBTeW1ib2woJ29uRHJhZ092ZXJDb250YWluZXInKTtcbnZhciBvbkRyYWdPdmVyID0gU3ltYm9sKCdvbkRyYWdPdmVyJyk7XG52YXIgb25EcmFnU3RvcCA9IFN5bWJvbCgnb25EcmFnU3RvcCcpO1xuXG4vKipcbiAqIFNvcnRhYmxlIGlzIGJ1aWx0IG9uIHRvcCBvZiBEcmFnZ2FibGUgYW5kIGFsbG93cyBzb3J0aW5nIG9mIGRyYWdnYWJsZSBlbGVtZW50cy4gU29ydGFibGUgd2lsbCBrZWVwXG4gKiB0cmFjayBvZiB0aGUgb3JpZ2luYWwgaW5kZXggYW5kIGVtaXRzIHRoZSBuZXcgaW5kZXggYXMgeW91IGRyYWcgb3ZlciBkcmFnZ2FibGUgZWxlbWVudHMuXG4gKiBAY2xhc3MgU29ydGFibGVcbiAqIEBtb2R1bGUgU29ydGFibGVcbiAqIEBleHRlbmRzIERyYWdnYWJsZVxuICovXG5cbnZhciBTb3J0YWJsZSA9IGZ1bmN0aW9uIChfRHJhZ2dhYmxlKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNvcnRhYmxlLCBfRHJhZ2dhYmxlKTtcblxuICAvKipcbiAgICogU29ydGFibGUgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIFNvcnRhYmxlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIFNvcnRhYmxlIGNvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBTb3J0YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gU29ydGFibGUoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZSk7XG5cbiAgICAvKipcbiAgICAgKiBzdGFydCBpbmRleCBvZiBzb3VyY2Ugb24gZHJhZyBzdGFydFxuICAgICAqIEBwcm9wZXJ0eSBzdGFydEluZGV4XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTb3J0YWJsZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5zdGFydEluZGV4ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IGNvbnRhaW5lciBvbiBkcmFnIHN0YXJ0XG4gICAgICogQHByb3BlcnR5IHN0YXJ0Q29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBfdGhpcy5zdGFydENvbnRhaW5lciA9IG51bGw7XG5cbiAgICBfdGhpc1tvbkRyYWdTdGFydF0gPSBfdGhpc1tvbkRyYWdTdGFydF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnT3ZlckNvbnRhaW5lcl0gPSBfdGhpc1tvbkRyYWdPdmVyQ29udGFpbmVyXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdPdmVyXSA9IF90aGlzW29uRHJhZ092ZXJdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ1N0b3BdID0gX3RoaXNbb25EcmFnU3RvcF0uYmluZChfdGhpcyk7XG5cbiAgICBfdGhpcy5vbignZHJhZzpzdGFydCcsIF90aGlzW29uRHJhZ1N0YXJ0XSkub24oJ2RyYWc6b3Zlcjpjb250YWluZXInLCBfdGhpc1tvbkRyYWdPdmVyQ29udGFpbmVyXSkub24oJ2RyYWc6b3ZlcicsIF90aGlzW29uRHJhZ092ZXJdKS5vbignZHJhZzpzdG9wJywgX3RoaXNbb25EcmFnU3RvcF0pO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBTb3J0YWJsZSBpbnN0YW5jZS5cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICgwLCBfZ2V0My5kZWZhdWx0KShTb3J0YWJsZS5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTb3J0YWJsZS5wcm90b3R5cGUpLCAnZGVzdHJveScsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgIHRoaXMub2ZmKCdkcmFnOnN0YXJ0JywgdGhpc1tvbkRyYWdTdGFydF0pLm9mZignZHJhZzpvdmVyOmNvbnRhaW5lcicsIHRoaXNbb25EcmFnT3ZlckNvbnRhaW5lcl0pLm9mZignZHJhZzpvdmVyJywgdGhpc1tvbkRyYWdPdmVyXSkub2ZmKCdkcmFnOnN0b3AnLCB0aGlzW29uRHJhZ1N0b3BdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaW5kZXggb2YgZWxlbWVudCB3aXRoaW4gaXRzIGNvbnRhaW5lciBkdXJpbmcgZHJhZyBvcGVyYXRpb24sIGkuZS4gZXhjbHVkaW5nIG1pcnJvciBhbmQgb3JpZ2luYWwgc291cmNlXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIEFuIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2luZGV4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5kZXgoZWxlbWVudCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkoZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuKSkuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkRWxlbWVudCAhPT0gX3RoaXMyLm9yaWdpbmFsU291cmNlICYmIGNoaWxkRWxlbWVudCAhPT0gX3RoaXMyLm1pcnJvcjtcbiAgICAgIH0pLmluZGV4T2YoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdGFydCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdTdGFydEV2ZW50fSBldmVudCAtIERyYWcgc3RhcnQgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdGFydCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHRoaXMuc3RhcnRDb250YWluZXIgPSBldmVudC5zb3VyY2UucGFyZW50Tm9kZTtcbiAgICAgIHRoaXMuc3RhcnRJbmRleCA9IHRoaXMuaW5kZXgoZXZlbnQuc291cmNlKTtcblxuICAgICAgdmFyIHNvcnRhYmxlU3RhcnRFdmVudCA9IG5ldyBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVN0YXJ0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBzdGFydEluZGV4OiB0aGlzLnN0YXJ0SW5kZXgsXG4gICAgICAgIHN0YXJ0Q29udGFpbmVyOiB0aGlzLnN0YXJ0Q29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHNvcnRhYmxlU3RhcnRFdmVudCk7XG5cbiAgICAgIGlmIChzb3J0YWJsZVN0YXJ0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBldmVudC5jYW5jZWwoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIG92ZXIgY29udGFpbmVyIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ092ZXJDb250YWluZXJFdmVudH0gZXZlbnQgLSBEcmFnIG92ZXIgY29udGFpbmVyIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnT3ZlckNvbnRhaW5lcixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNvdXJjZSA9IGV2ZW50LnNvdXJjZSxcbiAgICAgICAgICBvdmVyID0gZXZlbnQub3ZlcixcbiAgICAgICAgICBvdmVyQ29udGFpbmVyID0gZXZlbnQub3ZlckNvbnRhaW5lcjtcblxuICAgICAgdmFyIG9sZEluZGV4ID0gdGhpcy5pbmRleChzb3VyY2UpO1xuXG4gICAgICB2YXIgc29ydGFibGVTb3J0RXZlbnQgPSBuZXcgX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTb3J0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBjdXJyZW50SW5kZXg6IG9sZEluZGV4LFxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgb3Zlcjogb3ZlclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzb3J0YWJsZVNvcnRFdmVudCk7XG5cbiAgICAgIGlmIChzb3J0YWJsZVNvcnRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG1vdmVzID0gbW92ZShzb3VyY2UsIG92ZXIsIG92ZXJDb250YWluZXIpO1xuXG4gICAgICBpZiAoIW1vdmVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG9sZENvbnRhaW5lciA9IG1vdmVzLm9sZENvbnRhaW5lcixcbiAgICAgICAgICBuZXdDb250YWluZXIgPSBtb3Zlcy5uZXdDb250YWluZXI7XG5cbiAgICAgIHZhciBuZXdJbmRleCA9IHRoaXMuaW5kZXgoZXZlbnQuc291cmNlKTtcblxuICAgICAgdmFyIHNvcnRhYmxlU29ydGVkRXZlbnQgPSBuZXcgX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTb3J0ZWRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIG9sZEluZGV4OiBvbGRJbmRleCxcbiAgICAgICAgbmV3SW5kZXg6IG5ld0luZGV4LFxuICAgICAgICBvbGRDb250YWluZXI6IG9sZENvbnRhaW5lcixcbiAgICAgICAgbmV3Q29udGFpbmVyOiBuZXdDb250YWluZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc29ydGFibGVTb3J0ZWRFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBvdmVyIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ092ZXJFdmVudH0gZXZlbnQgLSBEcmFnIG92ZXIgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdPdmVyLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKGV2ZW50Lm92ZXIgPT09IGV2ZW50Lm9yaWdpbmFsU291cmNlIHx8IGV2ZW50Lm92ZXIgPT09IGV2ZW50LnNvdXJjZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3VyY2UgPSBldmVudC5zb3VyY2UsXG4gICAgICAgICAgb3ZlciA9IGV2ZW50Lm92ZXIsXG4gICAgICAgICAgb3ZlckNvbnRhaW5lciA9IGV2ZW50Lm92ZXJDb250YWluZXI7XG5cbiAgICAgIHZhciBvbGRJbmRleCA9IHRoaXMuaW5kZXgoc291cmNlKTtcblxuICAgICAgdmFyIHNvcnRhYmxlU29ydEV2ZW50ID0gbmV3IF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgY3VycmVudEluZGV4OiBvbGRJbmRleCxcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgIG92ZXI6IG92ZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc29ydGFibGVTb3J0RXZlbnQpO1xuXG4gICAgICBpZiAoc29ydGFibGVTb3J0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtb3ZlcyA9IG1vdmUoc291cmNlLCBvdmVyLCBvdmVyQ29udGFpbmVyKTtcblxuICAgICAgaWYgKCFtb3Zlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBvbGRDb250YWluZXIgPSBtb3Zlcy5vbGRDb250YWluZXIsXG4gICAgICAgICAgbmV3Q29udGFpbmVyID0gbW92ZXMubmV3Q29udGFpbmVyO1xuXG4gICAgICB2YXIgbmV3SW5kZXggPSB0aGlzLmluZGV4KHNvdXJjZSk7XG5cbiAgICAgIHZhciBzb3J0YWJsZVNvcnRlZEV2ZW50ID0gbmV3IF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydGVkRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBvbGRJbmRleDogb2xkSW5kZXgsXG4gICAgICAgIG5ld0luZGV4OiBuZXdJbmRleCxcbiAgICAgICAgb2xkQ29udGFpbmVyOiBvbGRDb250YWluZXIsXG4gICAgICAgIG5ld0NvbnRhaW5lcjogbmV3Q29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHNvcnRhYmxlU29ydGVkRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RvcCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdTdG9wRXZlbnR9IGV2ZW50IC0gRHJhZyBzdG9wIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnU3RvcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBzb3J0YWJsZVN0b3BFdmVudCA9IG5ldyBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVN0b3BFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIG9sZEluZGV4OiB0aGlzLnN0YXJ0SW5kZXgsXG4gICAgICAgIG5ld0luZGV4OiB0aGlzLmluZGV4KGV2ZW50LnNvdXJjZSksXG4gICAgICAgIG9sZENvbnRhaW5lcjogdGhpcy5zdGFydENvbnRhaW5lcixcbiAgICAgICAgbmV3Q29udGFpbmVyOiBldmVudC5zb3VyY2UucGFyZW50Tm9kZVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzb3J0YWJsZVN0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuc3RhcnRJbmRleCA9IG51bGw7XG4gICAgICB0aGlzLnN0YXJ0Q29udGFpbmVyID0gbnVsbDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNvcnRhYmxlO1xufShfRHJhZ2dhYmxlMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU29ydGFibGU7XG5cblxuZnVuY3Rpb24gaW5kZXgoZWxlbWVudCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChlbGVtZW50LnBhcmVudE5vZGUuY2hpbGRyZW4sIGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBtb3ZlKHNvdXJjZSwgb3Zlciwgb3ZlckNvbnRhaW5lcikge1xuICB2YXIgZW1wdHlPdmVyQ29udGFpbmVyID0gIW92ZXJDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgZGlmZmVyZW50Q29udGFpbmVyID0gb3ZlciAmJiBzb3VyY2UucGFyZW50Tm9kZSAhPT0gb3Zlci5wYXJlbnROb2RlO1xuICB2YXIgc2FtZUNvbnRhaW5lciA9IG92ZXIgJiYgc291cmNlLnBhcmVudE5vZGUgPT09IG92ZXIucGFyZW50Tm9kZTtcblxuICBpZiAoZW1wdHlPdmVyQ29udGFpbmVyKSB7XG4gICAgcmV0dXJuIG1vdmVJbnNpZGVFbXB0eUNvbnRhaW5lcihzb3VyY2UsIG92ZXJDb250YWluZXIpO1xuICB9IGVsc2UgaWYgKHNhbWVDb250YWluZXIpIHtcbiAgICByZXR1cm4gbW92ZVdpdGhpbkNvbnRhaW5lcihzb3VyY2UsIG92ZXIpO1xuICB9IGVsc2UgaWYgKGRpZmZlcmVudENvbnRhaW5lcikge1xuICAgIHJldHVybiBtb3ZlT3V0c2lkZUNvbnRhaW5lcihzb3VyY2UsIG92ZXIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVJbnNpZGVFbXB0eUNvbnRhaW5lcihzb3VyY2UsIG92ZXJDb250YWluZXIpIHtcbiAgdmFyIG9sZENvbnRhaW5lciA9IHNvdXJjZS5wYXJlbnROb2RlO1xuXG4gIG92ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc291cmNlKTtcblxuICByZXR1cm4geyBvbGRDb250YWluZXI6IG9sZENvbnRhaW5lciwgbmV3Q29udGFpbmVyOiBvdmVyQ29udGFpbmVyIH07XG59XG5cbmZ1bmN0aW9uIG1vdmVXaXRoaW5Db250YWluZXIoc291cmNlLCBvdmVyKSB7XG4gIHZhciBvbGRJbmRleCA9IGluZGV4KHNvdXJjZSk7XG4gIHZhciBuZXdJbmRleCA9IGluZGV4KG92ZXIpO1xuXG4gIGlmIChvbGRJbmRleCA8IG5ld0luZGV4KSB7XG4gICAgc291cmNlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNvdXJjZSwgb3Zlci5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICB9IGVsc2Uge1xuICAgIHNvdXJjZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzb3VyY2UsIG92ZXIpO1xuICB9XG5cbiAgcmV0dXJuIHsgb2xkQ29udGFpbmVyOiBzb3VyY2UucGFyZW50Tm9kZSwgbmV3Q29udGFpbmVyOiBzb3VyY2UucGFyZW50Tm9kZSB9O1xufVxuXG5mdW5jdGlvbiBtb3ZlT3V0c2lkZUNvbnRhaW5lcihzb3VyY2UsIG92ZXIpIHtcbiAgdmFyIG9sZENvbnRhaW5lciA9IHNvdXJjZS5wYXJlbnROb2RlO1xuXG4gIG92ZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyKTtcblxuICByZXR1cm4geyBvbGRDb250YWluZXI6IG9sZENvbnRhaW5lciwgbmV3Q29udGFpbmVyOiBzb3VyY2UucGFyZW50Tm9kZSB9O1xufVxuXG4vKioqLyB9KSxcbi8qIDE1NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1NvcnRhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1Nyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU29ydGFibGVTdGFydEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTdGFydEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU29ydGFibGVTb3J0RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVNvcnRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NvcnRhYmxlU29ydGVkRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVNvcnRlZEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU29ydGFibGVTdG9wRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVN0b3BFdmVudDtcbiAgfVxufSk7XG5cbi8qKiovIH0pLFxuLyogMTU3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNvcnRhYmxlU3RvcEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVNvcnRlZEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVNvcnRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBzb3J0YWJsZSBldmVudFxuICogQGNsYXNzIFNvcnRhYmxlRXZlbnRcbiAqIEBtb2R1bGUgU29ydGFibGVFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgU29ydGFibGVFdmVudCA9IGV4cG9ydHMuU29ydGFibGVFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gU29ydGFibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcblxuXG4gICAgLyoqXG4gICAgICogT3JpZ2luYWwgZHJhZyBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGlzIHNvcnRhYmxlIGV2ZW50XG4gICAgICogQHByb3BlcnR5IGRyYWdFdmVudFxuICAgICAqIEB0eXBlIHtEcmFnRXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNvcnRhYmxlRXZlbnQ7XG59KF9BYnN0cmFjdEV2ZW50My5kZWZhdWx0KTtcblxuLyoqXG4gKiBTb3J0YWJsZSBzdGFydCBldmVudFxuICogQGNsYXNzIFNvcnRhYmxlU3RhcnRFdmVudFxuICogQG1vZHVsZSBTb3J0YWJsZVN0YXJ0RXZlbnRcbiAqIEBleHRlbmRzIFNvcnRhYmxlRXZlbnRcbiAqL1xuXG5cblNvcnRhYmxlRXZlbnQudHlwZSA9ICdzb3J0YWJsZSc7XG5cbnZhciBTb3J0YWJsZVN0YXJ0RXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU3RhcnRFdmVudCA9IGZ1bmN0aW9uIChfU29ydGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZVN0YXJ0RXZlbnQsIF9Tb3J0YWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZVN0YXJ0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU29ydGFibGVTdGFydEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGVTdGFydEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVTdGFydEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZVN0YXJ0RXZlbnQsIFt7XG4gICAga2V5OiAnc3RhcnRJbmRleCcsXG5cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGluZGV4IG9mIHNvdXJjZSBvbiBzb3J0YWJsZSBzdGFydFxuICAgICAqIEBwcm9wZXJ0eSBzdGFydEluZGV4XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc3RhcnRJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBjb250YWluZXIgb24gc29ydGFibGUgc3RhcnRcbiAgICAgKiBAcHJvcGVydHkgc3RhcnRDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3N0YXJ0Q29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc3RhcnRDb250YWluZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZVN0YXJ0RXZlbnQ7XG59KFNvcnRhYmxlRXZlbnQpO1xuXG4vKipcbiAqIFNvcnRhYmxlIHNvcnQgZXZlbnRcbiAqIEBjbGFzcyBTb3J0YWJsZVNvcnRFdmVudFxuICogQG1vZHVsZSBTb3J0YWJsZVNvcnRFdmVudFxuICogQGV4dGVuZHMgU29ydGFibGVFdmVudFxuICovXG5cblxuU29ydGFibGVTdGFydEV2ZW50LnR5cGUgPSAnc29ydGFibGU6c3RhcnQnO1xuU29ydGFibGVTdGFydEV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgU29ydGFibGVTb3J0RXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU29ydEV2ZW50ID0gZnVuY3Rpb24gKF9Tb3J0YWJsZUV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZVNvcnRFdmVudCwgX1NvcnRhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZVNvcnRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZVNvcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlU29ydEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVTb3J0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlU29ydEV2ZW50LCBbe1xuICAgIGtleTogJ2N1cnJlbnRJbmRleCcsXG5cblxuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIGN1cnJlbnQgZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgY3VycmVudEluZGV4XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY3VycmVudEluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBlbGVtZW50IHlvdSBhcmUgaG92ZXJpbmcgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvdmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub2xkSW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnRhaW5lciBlbGVtZW50IHlvdSBhcmUgaG92ZXJpbmcgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubmV3SW5kZXg7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZVNvcnRFdmVudDtcbn0oU29ydGFibGVFdmVudCk7XG5cbi8qKlxuICogU29ydGFibGUgc29ydGVkIGV2ZW50XG4gKiBAY2xhc3MgU29ydGFibGVTb3J0ZWRFdmVudFxuICogQG1vZHVsZSBTb3J0YWJsZVNvcnRlZEV2ZW50XG4gKiBAZXh0ZW5kcyBTb3J0YWJsZUV2ZW50XG4gKi9cblxuXG5Tb3J0YWJsZVNvcnRFdmVudC50eXBlID0gJ3NvcnRhYmxlOnNvcnQnO1xuU29ydGFibGVTb3J0RXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBTb3J0YWJsZVNvcnRlZEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVNvcnRlZEV2ZW50ID0gZnVuY3Rpb24gKF9Tb3J0YWJsZUV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTb3J0YWJsZVNvcnRlZEV2ZW50LCBfU29ydGFibGVFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIFNvcnRhYmxlU29ydGVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU29ydGFibGVTb3J0ZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlU29ydGVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTb3J0YWJsZVNvcnRlZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZVNvcnRlZEV2ZW50LCBbe1xuICAgIGtleTogJ29sZEluZGV4JyxcblxuXG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgbGFzdCBzb3J0ZWQgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgb2xkSW5kZXhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vbGRJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOZXcgaW5kZXggb2YgdGhpcyBzb3J0ZWQgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgbmV3SW5kZXhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICduZXdJbmRleCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm5ld0luZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9sZCBjb250YWluZXIgb2YgZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgb2xkQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbGRDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vbGRDb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmV3IGNvbnRhaW5lciBvZiBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBuZXdDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ25ld0NvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm5ld0NvbnRhaW5lcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNvcnRhYmxlU29ydGVkRXZlbnQ7XG59KFNvcnRhYmxlRXZlbnQpO1xuXG4vKipcbiAqIFNvcnRhYmxlIHN0b3AgZXZlbnRcbiAqIEBjbGFzcyBTb3J0YWJsZVN0b3BFdmVudFxuICogQG1vZHVsZSBTb3J0YWJsZVN0b3BFdmVudFxuICogQGV4dGVuZHMgU29ydGFibGVFdmVudFxuICovXG5cblxuU29ydGFibGVTb3J0ZWRFdmVudC50eXBlID0gJ3NvcnRhYmxlOnNvcnRlZCc7XG5cbnZhciBTb3J0YWJsZVN0b3BFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTdG9wRXZlbnQgPSBmdW5jdGlvbiAoX1NvcnRhYmxlRXZlbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNvcnRhYmxlU3RvcEV2ZW50LCBfU29ydGFibGVFdmVudDQpO1xuXG4gIGZ1bmN0aW9uIFNvcnRhYmxlU3RvcEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlU3RvcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGVTdG9wRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTb3J0YWJsZVN0b3BFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVTdG9wRXZlbnQsIFt7XG4gICAga2V5OiAnb2xkSW5kZXgnLFxuXG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBpbmRleCBvbiBzb3J0YWJsZSBzdGFydFxuICAgICAqIEBwcm9wZXJ0eSBvbGRJbmRleFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9sZEluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5ldyBpbmRleCBvZiBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBuZXdJbmRleFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ25ld0luZGV4JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubmV3SW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3JpZ2luYWwgY29udGFpbmVyIG9mIGRyYWdnYWJsZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG9sZENvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb2xkQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub2xkQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5ldyBjb250YWluZXIgb2YgZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgbmV3Q29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICduZXdDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5uZXdDb250YWluZXI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTb3J0YWJsZVN0b3BFdmVudDtcbn0oU29ydGFibGVFdmVudCk7XG5cblNvcnRhYmxlU3RvcEV2ZW50LnR5cGUgPSAnc29ydGFibGU6c3RvcCc7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzaG9waWZ5L2RyYWdnYWJsZS9saWIvZHJhZ2dhYmxlLmJ1bmRsZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=