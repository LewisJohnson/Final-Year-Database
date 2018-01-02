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

	// Makes primary topic first
	$(".topics-list").prepend($(".first"));
	$(".topics-list .loader").hide(200);
	$(".topics-list li").first().fadeIn(200, function showNext() {
		$(this).next(".topics-list li").fadeIn(200, showNext);
	});

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

	$('.expand').on('click', function (e) {
		var content = $(this).parents().eq(1).find('.content');
		if (content.attr("aria-expanded") == "true") {
			$(this).find("svg").css("transform", "rotateZ(0deg)");
			content.hide(200);
			content.attr("aria-expanded", "false");
			setCookie(content.data("cookie-name"), true, 365);
		} else {
			$(this).find("svg").css("transform", "rotateZ(180deg)");
			content.show(200);
			content.attr("aria-expanded", "true");
			setCookie(content.data("cookie-name"), false, 365);
		}
	});

	/* ======================
 	 8. OTHER
    ====================== */
	$('.show-more').on('click', function (e) {
		$(this).hide();
		$('.project').addClass('expand');
	});

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

	$(".open-tab").on('click', function () {
		var currentTab = $(this).parent();
		var currentContent = currentTab.find(".content");
		var tabs = $(".tab-container li");
		var tabsContent = tabs.find(".content");
		var buttons = tabs.find("button");
		var host = $(".content-host");

		if (currentContent.attr("aria-hidden") == "true") {
			host.html("");
			tabsContent.attr("aria-expanded", "false");
			tabsContent.attr("aria-hidden", "true");
			buttons.removeClass("button--accent");

			host.html(currentContent.html());
			currentContent.attr("aria-expanded", "true");
			currentContent.attr("aria-hidden", "false");
			$(this).addClass("button--accent");
			// setCookie(content.data("cookie-name"), false, 365);
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

	// END OF DOC READY FILE
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

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmNjZTZjZDIwYjExMjk5YzI5NjciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2hvcGlmeS9kcmFnZ2FibGUvbGliL2RyYWdnYWJsZS5idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImFwcGVuZCIsInByZXBlbmQiLCJoaWRlIiwiZmlyc3QiLCJmYWRlSW4iLCJzaG93TmV4dCIsIm5leHQiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiZWxlbWVudCIsInJlbW92ZUNsYXNzIiwiaW5kZXgiLCJjbGFzc05hbWUiLCJtYXRjaCIsImpvaW4iLCJNb2JpbGVNZW51Iiwid2luZG93IiwiYWN0aXZhdG9yIiwiU2VsZWN0b3JzXyIsIkhBTUJVUkdFUl9DT05UQUlORVIiLCJ1bmRlcmxheSIsIlVOREVSTEFZIiwiaW5pdCIsInByb3RvdHlwZSIsIkNzc0NsYXNzZXNfIiwiVklTSUJMRSIsIk1PQklMRV9NRU5VIiwib3Blbk1lbnUiLCJhZGRDbGFzcyIsImNsb3NlTWVudSIsIm1vYmlsZU1lbnUiLCJvbiIsImJpbmQiLCJpbml0QWxsIiwiZWFjaCIsIkRpYWxvZyIsImRpYWxvZ05hbWUiLCJkYXRhIiwiaGVhZGVyIiwiZmluZCIsIkRJQUxPR19IRUFERVIiLCJjb250ZW50IiwiRElBTE9HX0NPTlRFTlQiLCJiZWZvcmUiLCJIdG1sU25pcHBldHNfIiwiTE9BREVSIiwibG9hZGVyIiwiaXNDbG9zYWJsZSIsImFjdGl2YXRvckJ1dHRvbnMiLCJBQ1RJVkUiLCJESUFMT0ciLCJzaG93TG9hZGVyIiwic2hvdyIsImhpZGVMb2FkZXIiLCJzaG93RGlhbG9nIiwiaGlkZURpYWxvZyIsImRpYWxvZyIsInB1c2giLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJlcSIsImNzcyIsIlByb2plY3RUb3BpY3MiLCJBRERfVE9QSUNfSU5QVVQiLCJORVdfVE9QSUNfSU5QVVRfQ09OVEFJTkVSIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJwcm9qZWN0VG9waWNzIiwiYWRkVG9waWNUb1Byb2plY3QiLCJwcm9qZWN0SWQiLCJ0b3BpY05hbWUiLCJhamF4VXJsIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJ0b3BpY19uYW1lIiwicHJvamVjdF9pZCIsInN1Y2Nlc3MiLCJKU09OIiwicGFyc2UiLCJ2YWwiLCJsZW5ndGgiLCJhZnRlciIsImRvbmUiLCJyZW1vdmVUb3BpY0Zyb21Qcm9qZWN0IiwidG9waWNJZCIsInRvcGljX2lkIiwib2JqIiwicmVtb3ZlIiwidXBkYXRlUHJvamVjdFByaW1hcnlUb3BpYyIsInN3YXBwYWJsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImRyYWdnYWJsZSIsIm9yaWdpbmFsUHJpbWFyeVRvcGljSWQiLCJrZXlwcmVzcyIsImUiLCJ3aGljaCIsInBhcmVudCIsImZvY3VzIiwiQWpheEZ1bmN0aW9ucyIsIlNFQVJDSF9JTlBVVCIsIlNFQVJDSF9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQlVUVE9OIiwiTE9HX0lOX0RJQUxPRyIsIkNIQU5HRV9BVVRIX0RJQUxPRyIsImRlbGV0ZVByb2plY3QiLCJwcm9qZWN0TmFtZSIsImNvbmZpcm0iLCJsb2NhdGlvbiIsImhyZWYiLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJoYXNDbGFzcyIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwicmVzcG9uc2UiLCJodG1sIiwibWV0aG9kIiwiY29udGV4dCIsImRlbGV0ZVRvcGljIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0IiwidGV4dCIsInN0dWRlbnRJZCIsIm1hcmtlcklkIiwic3R1ZGVudF9pZCIsIm1hcmtlcl9pZCIsInByb2plY3RzX3BhZ2VOdW1iZXIiLCJwcm9qZWN0c19lbmRPZlRhYmxlIiwicHJvamVjdHNfYXdhaXRpbmdSZXNwb25zZSIsInNjcm9sbCIsInNjcm9sbFRvcCIsImhlaWdodCIsInVybFBhdGgiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwiYWdlbnRzX3BhZ2VOdW1iZXIiLCJhZ2VudHNfZW5kT2ZUYWJsZSIsImFnZW50c19hd2FpdGluZ1Jlc3BvbnNlIiwiYWN0aW9uQnV0dG9uIiwiYWN0aW9uVHlwZSIsInRhYmxlUm93IiwicGFyZW50cyIsImxvZyIsInNob3dOb3RpZmljYXRpb24iLCJzdGF0dXMiLCJlbWFpbFN0cmluZyIsImNoZWNrYm94U2VsZWN0b3IiLCJlbWFpbEJ1dHRvbnNlbGVjdG9yIiwiYWxlcnQiLCJwcmV2ZW50RGVmYXVsdCIsInNldENvb2tpZSIsInNlcmlhbGl6ZSIsInJlbG9hZCIsInN1Ym1pdEJ1dHRvbiIsImN1cnJlbnRUYWIiLCJjdXJyZW50Q29udGVudCIsInRhYnMiLCJ0YWJzQ29udGVudCIsImJ1dHRvbnMiLCJob3N0IiwiYWpheEVycm9yIiwiZXZlbnQiLCJyZXF1ZXN0Iiwic2V0dGluZ3MiLCJtZXNzYWdlIiwibm90aWZpY2F0aW9uIiwic2V0VGltZW91dCIsImNuYW1lIiwiY3ZhbHVlIiwiZXhkYXlzIiwiZCIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsImV4cGlyZXMiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsImdldENvb2tpZSIsIm5hbWUiLCJjYSIsInNwbGl0IiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7QUFFQUEsRUFBRSxZQUFXO0FBQ2I7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkE7Ozs7QUFHQUEsR0FBRUMsU0FBRixDQUFZO0FBQ1hDLFdBQVM7QUFD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QTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0Q7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1DQUFtQztBQUNoRCxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWlFLGlCQUFpQjtBQUNsRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckIsZUFBZSxZQUFZO0FBQzNCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvRUFBb0UsaUJBQWlCOztBQUVyRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1DQUFtQztBQUNoRCxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNB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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1DQUFtQzs7QUFFbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtB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Q0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7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QUFDQSxDQUFDOztBQUVELE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3Rjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0IsZ0JBQWdCO0FBQ2hCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVCQUF1QjtBQUN0Qzs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELE9BQU87QUFDUDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSxPQUFPO0FBQ1A7QUFDQSxDQUFDLEU7Ozs7OztBQ3ovUUQseUMiLCJmaWxlIjoiXFxqc1xcbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJjY2U2Y2QyMGIxMTI5OWMyOTY3IiwiaW1wb3J0IHtTd2FwcGFibGV9IGZyb20gJ0BzaG9waWZ5L2RyYWdnYWJsZSc7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4xLiBBSkFYIFNldHVwXHJcbjIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG4zLiBIZWxwZXIgRnVuY3Rpb25zXHJcbjQuIENvbXBvbmVudHNcclxuXHQ0LjEgTW9iaWxlIE1lbnVcclxuXHQ0LjIgRGlhbG9nIC8gTW9kYWxcclxuXHQ0LjMgRGF0YSBUYWJsZVxyXG5cdDQuNCBQcm9qZWN0IFRvcGljcyBbU3VwZXJ2aXNvcl1cclxuXHQ0LjUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG5cdDQuNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcbjUuIFNlY29uZCBNYXJrZXJcclxuNi4gRHluYW1pYyBQYWdpbmF0aW9uXHJcbjcuIFN1cGVydmlzb3JcclxuOC4gT3RoZXJcclxuOS4gSW5pdGlhbGlzZSBFdmVyeXRoaW5nXHJcbiovXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09XHJcblx0MS4gQUpBWCBTZXR1cFxyXG4gICA9PT09PT09PT09PT09PT09ICovXHJcbiQuYWpheFNldHVwKHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKSxcclxuXHR9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Mi4gSFRNTCBNb2RpZmljYXRpb25zXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4kKCdib2R5JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwidW5kZXJsYXlcIj48L2Rpdj4nKTtcclxuXHJcbi8vIE1ha2VzIHByaW1hcnkgdG9waWMgZmlyc3RcclxuJChcIi50b3BpY3MtbGlzdFwiKS5wcmVwZW5kKCQoXCIuZmlyc3RcIikpO1xyXG4kKFwiLnRvcGljcy1saXN0IC5sb2FkZXJcIikuaGlkZSgyMDApO1xyXG4kKFwiLnRvcGljcy1saXN0IGxpXCIpLmZpcnN0KCkuZmFkZUluKDIwMCwgZnVuY3Rpb24gc2hvd05leHQoKSB7XHJcblx0JCh0aGlzKS5uZXh0KCBcIi50b3BpY3MtbGlzdCBsaVwiICkuZmFkZUluKDIwMCwgc2hvd05leHQpO1xyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHQzLiBIZWxwZXJzIEZ1bmN0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmZ1bmN0aW9uIHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoZWxlbWVudCl7XHJcblx0JChlbGVtZW50KS5yZW1vdmVDbGFzcyAoZnVuY3Rpb24gKGluZGV4LCBjbGFzc05hbWUpIHtcclxuXHRcdHJldHVybiAoY2xhc3NOYW1lLm1hdGNoICgvXFxic2hhZG93XFwtXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT1cclxuXHQ0LiBDb21wb25lbnRzXHJcbiAgID09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09XHJcblx0IDQuMSBNb2JpbGUgTWVudVxyXG4gICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIG1vYmlsZSBtZW51LlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgTW9iaWxlTWVudSA9ICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsZW1lbnQpIHtcclxuXHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdHdpbmRvd1snTW9iaWxlTWVudSddID0gdGhpcztcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0dGhpcy51bmRlcmxheSA9ICQodGhpcy5TZWxlY3RvcnNfLlVOREVSTEFZKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdEhBTUJVUkdFUl9DT05UQUlORVI6ICcuaGFtYnVyZ2VyLWNvbnRhaW5lcicsXHJcblx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlZJU0lCTEUpO1xyXG5cclxuXHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5WSVNJQkxFKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmNsb3NlTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVklTSUJMRSk7XHJcblxyXG5cdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVklTSUJMRSk7XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBtb2JpbGVNZW51ID0gdGhpcztcclxuXHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdHRoaXMudW5kZXJsYXkub24oJ2NsaWNrJywgbW9iaWxlTWVudS5jbG9zZU1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLk1PQklMRV9NRU5VKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5tb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUodGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PVxyXG5cdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG4gICA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG52YXIgRGlhbG9nID0gZnVuY3Rpb24gRGlhbG9nKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0dGhpcy51bmRlcmxheSA9ICQoJy51bmRlcmxheScpO1xyXG5cdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdHRoaXMubG9hZGVyID0gJChlbGVtZW50KS5maW5kKFwiLmxvYWRlclwiKTtcclxuXHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydEaWFsb2cnXSA9IERpYWxvZztcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0QUNUSVZFOiAnYWN0aXZlJyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0RElBTE9HX0NPTlRFTlQ6ICcuY29udGVudCcsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLnNob3coMCk7XHJcblx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHR2YXIgZGlhbG9nID0gdGhpcztcclxuXHJcblx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuZGF0YSgnYWN0aXZhdG9yJykgJiYgJCh0aGlzKS5kYXRhKCdkaWFsb2cnKSA9PSBkaWFsb2cuZGlhbG9nTmFtZSl7XHJcblx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIEFkZCBzZXBlcmF0b3IgYWZ0ZXIgaGVhZGVyXHJcblx0ZGlhbG9nLmhlYWRlci5hcHBlbmQoJzxocj4nKTtcclxuXHJcblx0Ly8gRm9yIGRpc2FiaWx0eVxyXG5cdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblxyXG5cdC8vIFNldCB1bmRlcmxheVxyXG5cdGRpYWxvZy51bmRlcmxheS5vbignY2xpY2snLCBkaWFsb2cuaGlkZURpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cclxuXHR0cnl7XHJcblx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGRpYWxvZy5zaG93RGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblx0XHR9KTtcclxuXHR9IGNhdGNoKGVycil7XHJcblx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIFwiICsgZGlhbG9nLmRpYWxvZ05hbWUgKyBcIiBoYXMgbm8gYWN0aXZhdG9yIGJ1dHRvbi5cIik7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmRpYWxvZyA9IG5ldyBEaWFsb2codGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09XHJcblx0NC4zIERhdGEgVGFibGVcclxuICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG4qXHJcbiogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHR0aGlzLnJvd3MgPSAkLm1lcmdlKHRoaXMuYm9keVJvd3MsIHRoaXMuZm9vdFJvd3MpO1xyXG5cdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG53aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdE1BU1RFUl9DSEVDS0JPWDogJ3RoZWFkIC5tYXN0ZXItY2hlY2tib3gnLFxyXG5cdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYodGhpcy5tYXN0ZXJDaGVja2JveC5pcygnOmNoZWNrZWQnKSl7XHJcblx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRpZiAocm93KSB7XHJcblx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcblx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHJcblx0JCh0aGlzLmNoZWNrYm94ZXMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0fSk7XHJcblxyXG5cdCQodGhpcy5oZWFkZXJzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdCQodGhpcykuY3NzKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcclxuXHR9KTtcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5kYXRhVGFibGUgPSBuZXcgRGF0YVRhYmxlKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0NC40IFByb2plY3QgVG9waWNzIFtTdXBlcnZpc29yXVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBwcm9qZWN0IHRvcGljcy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgUHJvamVjdFRvcGljcyA9ICBmdW5jdGlvbiBQcm9qZWN0VG9waWNzKCkge307XHJcbndpbmRvd1snUHJvamVjdFRvcGljcyddID0gUHJvamVjdFRvcGljcztcclxuXHJcblByb2plY3RUb3BpY3MucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuUHJvamVjdFRvcGljcy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRBRERfVE9QSUNfSU5QVVQ6ICcjYWRkVG9waWNJbnB1dCcsXHJcblx0TkVXX1RPUElDX0lOUFVUX0NPTlRBSU5FUjogJyNuZXctdG9waWMtaW5wdXQtY29udGFpbmVyJyxcclxufTtcclxuXHJcblByb2plY3RUb3BpY3MucHJvdG90eXBlLktleXNfID0ge1xyXG5cdFNQQUNFOiAzMixcclxuXHRFTlRFUjogMTMsXHJcblx0Q09NTUE6IDQ1XHJcbn07XHJcblxyXG52YXIgcHJvamVjdFRvcGljcyA9IG5ldyBQcm9qZWN0VG9waWNzKCk7XHJcblxyXG5Qcm9qZWN0VG9waWNzLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0YWRkVG9waWNUb1Byb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljTmFtZSkge1xyXG5cdFx0JCgnLmxvYWRlcicpLnNob3coMCk7XHJcblx0XHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL3RvcGljLWFkZFwiO1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJQT1NUXCIsXHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHRvcGljX25hbWU6IHRvcGljTmFtZSxcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0JChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uQUREX1RPUElDX0lOUFVUKS52YWwoJycpO1xyXG5cclxuXHRcdFx0XHRpZigkKFwiLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWM6bGFzdFwiKS5sZW5ndGggPiAwKXtcclxuXHRcdFx0XHRcdCQoXCIudG9waWNzLWxpc3QuZWRpdCBsaS50b3BpYzpsYXN0XCIpLmFmdGVyKCc8bGkgZHJhZ2dhYmxlIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIGRhdGFbXCJpZFwiXSArICdcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRvcGljLXJlbW92ZVwiPlg8L2J1dHRvbj48cCBjbGFzcz1cInRvcGljLW5hbWVcIj4nICsgZGF0YVtcIm5hbWVcIl0gKyAnPC9wPjwvbGk+Jyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQoXCIudG9waWNzLWxpc3QuZWRpdFwiKS5wcmVwZW5kKCc8bGkgZHJhZ2dhYmxlIGNsYXNzPVwidG9waWMgZmlyc3RcIiBkYXRhLXRvcGljLWlkPVwiJyArIGRhdGFbXCJpZFwiXSArICdcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRvcGljLXJlbW92ZVwiPlg8L2J1dHRvbj48cCBjbGFzcz1cInRvcGljLW5hbWVcIj4nICsgZGF0YVtcIm5hbWVcIl0gKyAnPC9wPjwvbGk+Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQkKCdib2R5JykuYXBwZW5kKGRhdGEpO1xyXG5cdFx0XHQkKCcubG9hZGVyJykuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZVRvcGljRnJvbVByb2plY3Q6IGZ1bmN0aW9uIChwcm9qZWN0SWQsIHRvcGljSWQpIHtcclxuXHRcdCQoJy5sb2FkZXInKS5zaG93KDApO1xyXG5cdFx0dmFyIGFqYXhVcmwgPSBcIi9wcm9qZWN0cy90b3BpYy1yZW1vdmVcIjtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiREVMRVRFXCIsXHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHRvcGljX2lkIDogdG9waWNJZCxcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcudG9waWNzLWxpc3QuZWRpdCBsaS50b3BpYycpLmVhY2goZnVuY3Rpb24oaSwgb2JqKSB7XHJcblx0XHRcdFx0XHRpZigkKHRoaXMpLmRhdGEoJ3RvcGljLWlkJykgPT0gdG9waWNJZCl7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5sb2FkZXInKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0dXBkYXRlUHJvamVjdFByaW1hcnlUb3BpYzogZnVuY3Rpb24gKHByb2plY3RJZCwgdG9waWNJZCkge1xyXG5cdFx0JCgnLmxvYWRlcicpLnNob3coMCk7XHJcblx0XHR2YXIgYWpheFVybCA9IFwiL3Byb2plY3RzL3RvcGljLXVwZGF0ZS1wcmltYXJ5XCI7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHRvcGljX2lkIDogdG9waWNJZCxcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcjZWRpdFByb2plY3RGb3JtJykuYXR0cignZGF0YS1wcm9qZWN0LWlkJywgdG9waWNJZCk7XHJcblx0XHRcdFx0JCgnLnRvcGljcy1saXN0LmVkaXQgbGkudG9waWMnKS5lYWNoKGZ1bmN0aW9uKGksIG9iaikge1xyXG5cdFx0XHRcdFx0aWYoJCh0aGlzKS5kYXRhKCd0b3BpYy1pZCcpID09IHRvcGljSWQpe1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwiZmlyc3RcIik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmlyc3RcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5sb2FkZXInKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSxcclxufTtcclxuXHJcbmNvbnN0IHN3YXBwYWJsZSA9IG5ldyBTd2FwcGFibGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvcGljcy1saXN0LmVkaXQnKSwge1xyXG5cdGRyYWdnYWJsZTogJy50b3BpYycsXHJcbn0pO1xyXG5cclxuc3dhcHBhYmxlLm9uKCdzd2FwcGFibGU6c3dhcHBlZCcsIGZ1bmN0aW9uKCl7XHJcblx0dmFyIHByb2plY3RJZCA9ICQoJyNlZGl0UHJvamVjdEZvcm0nKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0dmFyIG9yaWdpbmFsUHJpbWFyeVRvcGljSWQgPSAkKCcjZWRpdFByb2plY3RGb3JtJykuZGF0YSgncHJpbWFyeS10b3BpYy1pZCcpO1xyXG5cdHZhciB0b3BpY0lkID0gJChcIi50b3BpY3MtbGlzdC5lZGl0IGxpOmZpcnN0LWNoaWxkXCIpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0aWYodG9waWNJZCAhPSBvcmlnaW5hbFByaW1hcnlUb3BpY0lkKXtcclxuXHRcdHByb2plY3RUb3BpY3MuZnVuY3Rpb25zLnVwZGF0ZVByb2plY3RQcmltYXJ5VG9waWMocHJvamVjdElkLCB0b3BpY0lkKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gQWRkIG5ldyB0b3BpY1xyXG4kKHByb2plY3RUb3BpY3MuU2VsZWN0b3JzXy5BRERfVE9QSUNfSU5QVVQpLmtleXByZXNzKGZ1bmN0aW9uKGUpIHtcclxuXHRpZiAoZS53aGljaCA9PSBwcm9qZWN0VG9waWNzLktleXNfLkVOVEVSKSB7XHJcblx0XHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0cHJvamVjdFRvcGljcy5mdW5jdGlvbnMuYWRkVG9waWNUb1Byb2plY3QocHJvamVjdElkLCAkKHRoaXMpLnZhbCgpKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gUmVtb3ZlIHRvcGljXHJcbiQoJy50b3BpY3MtbGlzdC5lZGl0Jykub24oJ2NsaWNrJywgJy50b3BpYyAudG9waWMtcmVtb3ZlJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgcHJvamVjdElkID0gJChcIiNlZGl0UHJvamVjdEZvcm1cIikuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdHZhciB0b3BpY0lkID0gJCh0aGlzKS5wYXJlbnQoJ2xpJykuZGF0YSgndG9waWMtaWQnKTtcclxuXHRwcm9qZWN0VG9waWNzLmZ1bmN0aW9ucy5yZW1vdmVUb3BpY0Zyb21Qcm9qZWN0KHByb2plY3RJZCwgdG9waWNJZCk7XHJcbn0pO1xyXG5cclxuJChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uTkVXX1RPUElDX0lOUFVUX0NPTlRBSU5FUikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0JChwcm9qZWN0VG9waWNzLlNlbGVjdG9yc18uQUREX1RPUElDX0lOUFVUKS5mb2N1cygpO1xyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQ0LjUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcbipcclxuKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG53aW5kb3dbJ0FqYXhGdW5jdGlvbnMnXSA9IEFqYXhGdW5jdGlvbnM7XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0U0VBUkNIX0lOUFVUOiAnLnNlYXJjaC1pbnB1dCcsXHJcblx0U0VBUkNIX0NPTlRBSU5FUjogJy5zZWFyY2gtY29udGFpbmVyJyxcclxuXHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0U0VBUkNIX0ZJTFRFUl9CVVRUT046ICcjc2VhcmNoLWZpbHRlci1idXR0b24nLFxyXG5cdExPR19JTl9ESUFMT0c6ICcubG9naW4uZGlhbG9nJyxcclxuXHRDSEFOR0VfQVVUSF9ESUFMT0c6ICcuY2hhbmdlLWF1dGguZGlhbG9nJ1xyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0U1BBQ0U6IDMyLFxyXG5cdEVOVEVSOiAxMyxcclxuXHRDT01NQTogNDVcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRkZWxldGVQcm9qZWN0OiBmdW5jdGlvbiAocHJvamVjdE5hbWUpIHtcclxuXHRcdGlmKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIFxcXCJcIiArIHByb2plY3ROYW1lICtcIlxcXCI/XCIpKXtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR0eXBlOiBcIkRFTEVURVwiLFxyXG5cdFx0XHRcdHVybDogXCJlZGl0XCIsXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24odXJsKXtcclxuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuLi9cIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXNcclxuJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy1mb2N1cycpO1xyXG59KTtcclxuXHJcbi8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXMgb3V0XHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1c291dCcsICBmdW5jdGlvbihlKXtcclxuXHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctMmRwJyk7XHJcbn0pO1xyXG5cclxuLy8gU0VBUkNIXHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0JVVFRPTikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIGNvbnRhaW5lciA9ICQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0NPTlRBSU5FUik7XHJcblx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdGlmKGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0Y29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0fSBlbHNle1xyXG5cdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgRWRpdFRvcGljID0gZnVuY3Rpb24gRWRpdFRvcGljKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHR0aGlzLnRvcGljSWQgPSAkKGVsZW1lbnQpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0dGhpcy5kZWxldGVCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5kZWxldGUtdG9waWMnKTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snRWRpdFRvcGljJ10gPSBFZGl0VG9waWM7XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge307XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFBBVENIX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciByZXNwb25zZSA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gXFxcIlwiICsgIHRoaXMub3JpZ2luYWxOYW1lICtcIlxcXCIgdG8gXFxcIlwiICsgIHRoaXMudG9waWNOYW1lSW5wdXQudmFsKCkgK1wiXFxcIj9cIik7XHJcblxyXG5cdFx0aWYocmVzcG9uc2Upe1xyXG5cdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdHRoaXMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdCQoJy5sb2FkZXInLCB0aGlzLmVsZW1lbnQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRtZXRob2Q6ICdQQVRDSCcsXHJcblx0XHRcdFx0dXJsOiB0aGlzLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRjb250ZXh0OiB0aGlzLFxyXG5cdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdHRvcGljX2lkOiB0aGlzLnRvcGljSWQsXHJcblx0XHRcdFx0XHR0b3BpY19uYW1lIDogdGhpcy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHRcdHRoaXMuZWRpdEJ1dHRvbi5odG1sKCdFZGl0Jyk7XHJcblx0XHRcdFx0dGhpcy5vcmlnaW5hbE5hbWUgPSB0aGlzLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudG9waWNOYW1lSW5wdXQudmFsKHRoaXMub3JpZ2luYWxOYW1lKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRkZWxldGVUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcmVzcG9uc2UgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgdG9waWMgXFxcIlwiICsgIHRoaXMub3JpZ2luYWxOYW1lICtcIlxcXCI/XCIpO1xyXG5cdFx0aWYocmVzcG9uc2Upe1xyXG5cdFx0XHR0aGlzLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcclxuXHRcdFx0XHR1cmw6IHRoaXMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdGNvbnRleHQ6IHRoaXMsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0dG9waWNfaWQ6IHRoaXMudG9waWNJZCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuaGlkZSg0MDAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjcmVhdGVFZGl0VG9waWNET006IGZ1bmN0aW9uKHRvcGljSWQsIG9yaWdpbmFsTmFtZSl7XHJcblx0XHQkKFwiLmVkaXQtdG9waWMtbGlzdFwiKS5wcmVwZW5kKCc8bGkgY2xhc3M9XCJ0b3BpY1wiIGRhdGEtdG9waWMtaWQ9XCInICsgdG9waWNJZCArJ1wiIGRhdGEtb3JpZ2luYWwtdG9waWMtbmFtZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48aW5wdXQgc3BlbGxjaGVjaz1cInRydWVcIiBuYW1lPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBlZGl0LXRvcGljXCIgdHlwZT1cInN1Ym1pdFwiPkVkaXQ8L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRlbGV0ZS10b3BpYyBidXR0b24tLWRhbmdlclwiPkRlbGV0ZTwvYnV0dG9uPjwvbGk+Jyk7XHJcblx0XHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHR9XHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGVkaXRUb3BpYyA9IHRoaXM7XHJcblx0dGhpcy5lZGl0QnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZWRpdFRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHR0aGlzLmRlbGV0ZUJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmRlbGV0ZVRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5FRElUX1RPUElDKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5FZGl0VG9waWMgPSBuZXcgRWRpdFRvcGljKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09XHJcblx0NS4gU2Vjb25kIE1hcmtlclxyXG4gICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbnZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbk1hcmtlci5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxufTtcclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCA9IGZ1bmN0aW9uKHN0dWRlbnRSb3dET00sIG1hcmtlcil7XHJcblx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdG1hcmtlci51bnNlbGVjdEFsbChtYXJrZXIpO1xyXG5cdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHRoaXMpLmRhdGEoJ21hcmtlci1pZCcpID09IHJvdy5kYXRhKCdzdXBlcnZpc29yLWlkJykpe1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdHZhciByb3cgPSAkKHN1cGVydmlzb3JSb3dET00pO1xyXG5cclxuXHRpZihyb3cuYXR0cignZGlzYWJsZWQnKSl7cmV0dXJuO31cclxuXHJcblx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IHJvdztcclxuXHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LW5hbWUnKSxcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdXBlcnZpc29yLW5hbWUnKSxcclxuXHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpKTtcclxuXHR9XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUucmVzZXRWaWV3ID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0JChcIiNzdHVkZW50LW5hbWVcIikudGV4dChzdHVkZW50TmFtZSk7XHJcblx0JChcIiNzdXBlcnZpc29yLW5hbWVcIikudGV4dChzdXBlcnZpc29yTmFtZSk7XHJcblx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHQkKFwiI3Byb2plY3QtdGl0bGVcIikuaHRtbCgnPGI+VGl0bGU6IDwvYj4nICsgcHJvamVjdFtcInRpdGxlXCJdKTtcclxuXHQkKFwiI3Byb2plY3QtZGVzY3JpcHRpb25cIikuaHRtbCgnPGI+RGVzY3JpcHRpb246IDwvYj4nICsgcHJvamVjdFtcImRlc2NyaXB0aW9uXCJdKTtcclxuXHJcblx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcbn1cclxuXHJcbiQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdHZhciBtYXJrZXIgPSB3aW5kb3dbJ01hcmtlciddO1xyXG5cclxuXHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9PSBudWxsKXtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH07XHJcblxyXG5cdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHR2YXIgcHJvamVjdElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JylbXCJpZFwiXTtcclxuXHR2YXIgc3R1ZGVudElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LWlkJyk7XHJcblx0dmFyIG1hcmtlcklkID0gbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvci5kYXRhKCdtYXJrZXItaWQnKTtcclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHR5cGU6IFwiUEFUQ0hcIixcclxuXHRcdHVybDogbWFya2VyLlVybHNfLkFTU0lHTl9NQVJLRVIsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZCxcclxuXHRcdFx0c3R1ZGVudF9pZDogc3R1ZGVudElkLFxyXG5cdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcblx0XHR9LFxyXG5cdFx0Ly8gQWRkIGZhaWxcclxuXHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQucmVtb3ZlKCk7XHJcblx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuTWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbWFya2VyID0gdGhpcztcclxuXHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxuXHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHR3aW5kb3dbJ01hcmtlciddID0gbmV3IE1hcmtlcigpO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ni4gRHluYW1pYyBQYWdpbmF0aW9uXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuaWYoJCgnI3Byb2plY3QtdGFibGUnKS5oYXNDbGFzcyhcImluZGV4XCIpKXtcclxuXHR2YXIgcHJvamVjdHNfcGFnZU51bWJlciA9IDIsXHJcblx0XHRwcm9qZWN0c19lbmRPZlRhYmxlID0gZmFsc2UsXHJcblx0XHRwcm9qZWN0c19hd2FpdGluZ1Jlc3BvbnNlID0gZmFsc2U7XHJcblxyXG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCkgPT0gJChkb2N1bWVudCkuaGVpZ2h0KCkpIHtcclxuXHRcdFx0aWYoIXByb2plY3RzX2VuZE9mVGFibGUgJiYgIXByb2plY3RzX2F3YWl0aW5nUmVzcG9uc2Upe1xyXG5cdFx0XHRcdCQoXCIubG9hZGVyLnByb2plY3RzXCIpLnNob3coKTtcclxuXHRcdFx0XHRwcm9qZWN0c19hd2FpdGluZ1Jlc3BvbnNlID0gdHJ1ZTtcclxuXHRcdFx0XHR2YXIgdXJsUGF0aCA9IFwiL3Byb2plY3RzP3BhcnRpYWw9dHJ1ZT9wYWdlPVwiICsgcHJvamVjdHNfcGFnZU51bWJlcjtcclxuXHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0dHlwZSA6ICdHRVQnLFxyXG5cdFx0XHRcdFx0dXJsOiB1cmxQYXRoLFxyXG5cdFx0XHRcdFx0c3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHQkKFwiLmxvYWRlci5wcm9qZWN0c1wiKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdGlmKGRhdGEubGVuZ3RoID09IDApe1xyXG5cdFx0XHRcdFx0XHRcdHByb2plY3RzX2VuZE9mVGFibGUgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNwcm9qZWN0LXRhYmxlJykuYWZ0ZXIoJzxkaXYgc3R5bGU9XCJ3aWR0aDogMTBweDtoZWlnaHQ6IDEwcHg7bWFyZ2luOiAxcmVtIGF1dG87YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjA3KTtib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTEpO2JvcmRlci1yYWRpdXM6IDkwcHg7XCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNwcm9qZWN0LXRhYmxlIHRib2R5JykuYXBwZW5kKCQoZGF0YSkpO1xyXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShcIlwiLCBcIlwiLCBcIi9wcm9qZWN0cz9wYWdlPVwiICsgcHJvamVjdHNfcGFnZU51bWJlcik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cHJvamVjdHNfcGFnZU51bWJlciArPSAxO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0JCgnI3Byb2plY3QtdGFibGUnKS5hZnRlcignPHAgc3R5bGU9XCJtYXJnaW46MXJlbSBhdXRvO3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiNlMDA7XCI+VGhlcmVcXCdzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLjwvcD4nKTtcclxuXHRcdFx0XHRcdFx0cHJvamVjdHNfYXdhaXRpbmdSZXNwb25zZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHQkKFwiLmxvYWRlci5wcm9qZWN0c1wiKS5oaWRlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdHByb2plY3RzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCQoXCIubG9hZGVyLnByb2plY3RzXCIpLmhpZGUoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKFwiLmxvYWRlci5wcm9qZWN0c1wiKS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuXHJcblxyXG5pZigkKCcjdXNlci1hZ2VudC10YWJsZScpLmxlbmd0aCA+IDApe1xyXG5cdHZhciBhZ2VudHNfcGFnZU51bWJlciA9IDIsXHJcblx0XHRhZ2VudHNfZW5kT2ZUYWJsZSA9IGZhbHNlLFxyXG5cdFx0YWdlbnRzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSA9PSAkKGRvY3VtZW50KS5oZWlnaHQoKSkge1xyXG5cdFx0XHRpZighYWdlbnRzX2VuZE9mVGFibGUgJiYgIWFnZW50c19hd2FpdGluZ1Jlc3BvbnNlKXtcclxuXHRcdFx0XHQkKFwiLmxvYWRlci51c2VyLWFnZW50XCIpLnNob3coKTtcclxuXHRcdFx0XHRhZ2VudHNfYXdhaXRpbmdSZXNwb25zZSA9IHRydWU7XHJcblx0XHRcdFx0dmFyIHVybFBhdGggPSBcIi9zeXN0ZW0vdXNlci1hZ2VudD9wYXJ0aWFsPXRydWU/cGFnZT1cIiArIGFnZW50c19wYWdlTnVtYmVyO1xyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlIDogJ0dFVCcsXHJcblx0XHRcdFx0XHR1cmw6IHVybFBhdGgsXHJcblx0XHRcdFx0XHRzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdCQoXCIubG9hZGVyLnVzZXItYWdlbnRcIikuaGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoZGF0YS5sZW5ndGggPT0gMCl7XHJcblx0XHRcdFx0XHRcdFx0YWdlbnRzX2VuZE9mVGFibGUgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyN1c2VyLWFnZW50LXRhYmxlJykuYWZ0ZXIoJzxkaXYgc3R5bGU9XCJ3aWR0aDogMTBweDtoZWlnaHQ6IDEwcHg7bWFyZ2luOiAxcmVtIGF1dG87YmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjA3KTtib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTEpO2JvcmRlci1yYWRpdXM6IDkwcHg7XCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdCQoJyN1c2VyLWFnZW50LXRhYmxlIHRib2R5JykuYXBwZW5kKCQoZGF0YSkpO1xyXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShcIlwiLCBcIlwiLCBcIi9zeXN0ZW0vdXNlci1hZ2VudD9wYWdlPVwiICsgYWdlbnRzX3BhZ2VOdW1iZXIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRhZ2VudHNfcGFnZU51bWJlciArPSAxO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0JCgnI3VzZXItYWdlbnQtdGFibGUnKS5hZnRlcignPHAgc3R5bGU9XCJtYXJnaW46MXJlbSBhdXRvO3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiNlMDA7XCI+VGhlcmVcXCdzIGEgcHJvYmxlbSByZWFjaGluZyB0aGUgc2VydmVyLjwvcD4nKTtcclxuXHRcdFx0XHRcdFx0YWdlbnRzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0YWdlbnRzX2F3YWl0aW5nUmVzcG9uc2UgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCQoXCIubG9hZGVyLnVzZXItYWdlbnRcIikuaGlkZSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQoXCIubG9hZGVyLnVzZXItYWdlbnRcIikuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCA3LiBTVVBFUlZJU09SXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8vIEFjY2VwdCBvciBSZWplY3QgU3R1ZGVudFxyXG4kKCcuc3VwZXJ2aXNvci10YWJsZSAub2ZmZXItYWN0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIGFjdGlvbkJ1dHRvbiA9ICQodGhpcyk7XHJcblx0dmFyIGFjdGlvblR5cGUgPSBhY3Rpb25CdXR0b24uZGF0YSgnYWN0aW9uLXR5cGUnKTtcclxuXHR2YXIgdGFibGVSb3cgPSBhY3Rpb25CdXR0b24ucGFyZW50cygpLmVxKDEpO1xyXG5cdHZhciBzdHVkZW50X2lkID0gdGFibGVSb3cuZGF0YSgnc3R1ZGVudC1pZCcpO1xyXG5cclxuXHRhY3Rpb25CdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdCQoJy5sb2FkZXInLCBhY3Rpb25CdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRpZihhY3Rpb25UeXBlID09PSBcImFjY2VwdFwiKXtcclxuXHRcdHZhciBhamF4VXJsID0gJy9zdXBlcnZpc29yL3N0dWRlbnQtYWNjZXB0JztcclxuXHR9IGVsc2UgaWYgKGFjdGlvblR5cGUgPT09IFwicmVqZWN0XCIpe1xyXG5cdFx0dmFyIGFqYXhVcmwgPSAnL3N1cGVydmlzb3Ivc3R1ZGVudC1yZWplY3QnO1xyXG5cdH1cclxuXHJcblx0aWYoYWpheFVybCA9PSBudWxsKXtcclxuXHRcdGNvbnNvbGUubG9nKFwiSW52YWxpZCBzdXBlcnZpc29yIGFjdGlvbi5cIik7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHN0dWRlbnRfaWQgOiBzdHVkZW50X2lkXHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdHRhYmxlUm93LmhpZGUoNDAwLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR0YWJsZVJvdy5yZW1vdmUoKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmKGFjdGlvblR5cGUgPT09IFwiYWNjZXB0XCIpe1xyXG5cdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJycsICdTdHVkZW50IGhhcyBiZWVuIGFjY2VwdGVkLicpO1xyXG5cdFx0XHRcdC8vIHRvZG86IGFkZCB0byB0aGluZ3kgdG8gdGFibGVcclxuXHRcdFx0XHQvLyB0b2RvOiBtYXliZSBwaHAgdGhhdCByZWZyZXNoZXMgdGFibGUgaW5zdGVhZFxyXG5cdFx0XHRcdC8vICQoXCIjc3VwZXJ2aXNvci1hY2NlcHRlZC1zdHVkZW50cy10YWJsZSB0Ym9keVwiKS5wcmVwZW5kKCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoYWN0aW9uVHlwZSA9PT0gXCJyZWplY3RcIil7XHJcblx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignJywgJ1N0dWRlbnQgaGFzIGJlZW4gcmVqZWN0ZWQuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGFjdGlvbkJ1dHRvbi5odG1sKGFjdGlvblR5cGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoJyNkZWxldGVQcm9qZWN0QnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuZGVsZXRlUHJvamVjdCgkKCcjdGl0bGUnKS52YWwoKSk7XHJcbn0pO1xyXG5cclxuJCgnI3N0dWRlbnQtZWRpdC1saXN0JykuZmluZCgnLmNoZWNrYm94IGlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBzdGF0dXMgPSAkKHRoaXMpLnBhcmVudHMoKS5lcSgzKS5kYXRhKCdzdGF0dXMnKTtcclxuXHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcjc3R1ZGVudC1lZGl0LWxpc3QuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHR2YXIgZW1haWxCdXR0b25zZWxlY3RvciA9IFwiLmVtYWlsLXNlbGVjdGVkLlwiICsgc3RhdHVzO1xyXG5cdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cdFx0XHRlbWFpbFN0cmluZyArPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxufSk7XHJcblxyXG4kKCcuZWRpdC1zdHVkZW50LWxpc3QgLmVtYWlsLXNlbGVjdGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicpe1xyXG5cdFx0YWxlcnQoXCJZb3UgaGF2ZW4ndCBzZWxlY3RlZCBhbnlvbmUuXCIpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4kKCcuZXhwYW5kJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdHZhciBjb250ZW50ID0gJCh0aGlzKS5wYXJlbnRzKCkuZXEoMSkuZmluZCgnLmNvbnRlbnQnKTtcclxuXHRpZihjb250ZW50LmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdCQodGhpcykuZmluZChcInN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDBkZWcpXCIpO1xyXG5cdFx0Y29udGVudC5oaWRlKDIwMCk7XHJcblx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0XHRzZXRDb29raWUoY29udGVudC5kYXRhKFwiY29va2llLW5hbWVcIiksIHRydWUsIDM2NSk7XHJcblxyXG5cdH0gZWxzZSB7XHJcblx0XHQkKHRoaXMpLmZpbmQoXCJzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigxODBkZWcpXCIpO1xyXG5cdFx0Y29udGVudC5zaG93KDIwMCk7XHJcblx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHNldENvb2tpZShjb250ZW50LmRhdGEoXCJjb29raWUtbmFtZVwiKSwgZmFsc2UsIDM2NSk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0IDguIE9USEVSXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuJCgnLnNob3ctbW9yZScpLm9uKCdjbGljaycsICBmdW5jdGlvbihlKSB7XHJcblx0JCh0aGlzKS5oaWRlKCk7XHJcblx0JCgnLnByb2plY3QnKS5hZGRDbGFzcygnZXhwYW5kJyk7XHJcbn0pO1xyXG5cclxuLy8gU1VQRVJWSVNPUlxyXG4kKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQT1NUJyxcclxuXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKHNob3dEaWFsb2cpe1xyXG5cdFx0XHRpZihzaG93RGlhbG9nID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uQ0hBTkdFX0FVVEhfRElBTE9HKVswXS5kaWFsb2cuaXNDbG9zYWJsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5DSEFOR0VfQVVUSF9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS50ZXh0KGRhdGFbXCJyZXNwb25zZUpTT05cIl1bXCJlcnJvcnNcIl1bXCJ1c2VybmFtZVwiXVswXSk7XHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdCQoJy5mb3JtLWZpZWxkJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4kKCcjbmV3LXRvcGljLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHQkKCcubG9hZGVyJywgc3VibWl0QnV0dG9uKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0Y29udGV4dDogJCh0aGlzKSxcclxuXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMuY3JlYXRlRWRpdFRvcGljRE9NKGRhdGFbXCJpZFwiXSwgZGF0YVtcIm5hbWVcIl0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uICgpIHt9XHJcblx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0XHQkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKS5odG1sKCdBZGQnKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyBVc2VkIGZvciB0cmFuc2FjdGlvbnNcclxuJCgnI3Nob3ctcmF3LXRhYmxlLWRhdGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRpZigkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSl7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmhpZGUoKTtcclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuc2hvdygpO1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gTkVXIFVTRVJcclxuLy8gcHV0IHRoaXMgc3R1ZmYgaW4gYW4gYXJyYXlcclxuJCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcbiQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0aWYoJCgnI3N0dWRlbnQtb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjYWRtaW4tb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gU1RSSU5HU1xyXG4kKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRpZigkKCcjc3R1ZGVudC1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNhZG1pbi1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuJChcIi5vcGVuLXRhYlwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgY3VycmVudFRhYiA9ICQodGhpcykucGFyZW50KCk7XHJcblx0dmFyIGN1cnJlbnRDb250ZW50ID0gY3VycmVudFRhYi5maW5kKFwiLmNvbnRlbnRcIik7XHJcblx0dmFyIHRhYnMgPSAkKFwiLnRhYi1jb250YWluZXIgbGlcIik7XHJcblx0dmFyIHRhYnNDb250ZW50ID0gdGFicy5maW5kKFwiLmNvbnRlbnRcIik7XHJcblx0dmFyIGJ1dHRvbnMgPSB0YWJzLmZpbmQoXCJidXR0b25cIik7XHJcblx0dmFyIGhvc3QgPSAkKFwiLmNvbnRlbnQtaG9zdFwiKTtcclxuXHJcblx0aWYoY3VycmVudENvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdGhvc3QuaHRtbChcIlwiKTtcclxuXHRcdHRhYnNDb250ZW50LmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0YWJzQ29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0YnV0dG9ucy5yZW1vdmVDbGFzcyhcImJ1dHRvbi0tYWNjZW50XCIpO1xyXG5cclxuXHRcdGhvc3QuaHRtbChjdXJyZW50Q29udGVudC5odG1sKCkpO1xyXG5cdFx0Y3VycmVudENvbnRlbnQuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdFx0Y3VycmVudENvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHQkKHRoaXMpLmFkZENsYXNzKFwiYnV0dG9uLS1hY2NlbnRcIik7XHJcblx0XHQvLyBzZXRDb29raWUoY29udGVudC5kYXRhKFwiY29va2llLW5hbWVcIiksIGZhbHNlLCAzNjUpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT1cclxuXHQ5LiBJbml0aWFsaXNlXHJcbiAgID09PT09PT09PT09PT09PSAqL1xyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkRpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cclxuLy8gRU5EIE9GIERPQyBSRUFEWSBGSUxFXHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uKCBldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MgKSB7XHJcblx0c2hvd05vdGlmaWNhdGlvbignZXJyb3InLCAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGF0IHJlcXVlc3QuJyk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2hvd05vdGlmaWNhdGlvbih0eXBlLCBtZXNzYWdlKXtcclxuXHR2YXIgbm90aWZpY2F0aW9uID0gJCgnLm5vdGlmaWNhdGlvbicpO1xyXG5cdG5vdGlmaWNhdGlvbi5hZGRDbGFzcyh0eXBlKTtcclxuXHQkKG5vdGlmaWNhdGlvbikuaHRtbChcIjxwPlwiICsgbWVzc2FnZSArIFwiPC9wPlwiKTtcclxuXHRub3RpZmljYXRpb24uc2hvdygpO1xyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0bm90aWZpY2F0aW9uLmhpZGUoMCk7XHJcblx0fSwgMzAwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENvb2tpZShjbmFtZSwgY3ZhbHVlLCBleGRheXMpIHtcclxuXHR2YXIgZCA9IG5ldyBEYXRlKCk7XHJcblx0ZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgKGV4ZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHR2YXIgZXhwaXJlcyA9IFwiZXhwaXJlcz1cIitkLnRvVVRDU3RyaW5nKCk7XHJcblx0ZG9jdW1lbnQuY29va2llID0gY25hbWUgKyBcIj1cIiArIGN2YWx1ZSArIFwiO1wiICsgZXhwaXJlcyArIFwiO3BhdGg9L1wiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb29raWUoY25hbWUpIHtcclxuXHR2YXIgbmFtZSA9IGNuYW1lICsgXCI9XCI7XHJcblx0dmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgYyA9IGNhW2ldO1xyXG5cdFx0d2hpbGUgKGMuY2hhckF0KDApID09ICcgJykge1xyXG5cdFx0XHRjID0gYy5zdWJzdHJpbmcoMSk7XHJcblx0XHR9XHJcblx0XHRpZiAoYy5pbmRleE9mKG5hbWUpID09IDApIHtcclxuXHRcdFx0cmV0dXJuIGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBjLmxlbmd0aCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBcIlwiO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiRHJhZ2dhYmxlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRyYWdnYWJsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEcmFnZ2FibGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTcpO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU5KTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Nik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5MCk7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oOTQpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OCk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0Fic3RyYWN0RXZlbnQyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgc3RvcmUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxuICAsIFN5bWJvbCAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG4vKioqLyB9KSxcbi8qIDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4vKioqLyB9KSxcbi8qIDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGFuT2JqZWN0ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcbiAgLCBJRThfRE9NX0RFRklORSA9IF9fd2VicGFja19yZXF1aXJlX18oNDMpXG4gICwgdG9QcmltaXRpdmUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG4vKioqLyB9KSxcbi8qIDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oNzEpXG4gICwgZGVmaW5lZCA9IF9fd2VicGFja19yZXF1aXJlX18oMjkpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cbi8qKiovIH0pLFxuLyogMTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBjb3JlICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpXG4gICwgY3R4ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNilcbiAgLCBoaWRlICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG4vKioqLyB9KSxcbi8qIDExICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIV9fd2VicGFja19yZXF1aXJlX18oMTcpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuLyoqKi8gfSksXG4vKiAxMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuLyoqKi8gfSksXG4vKiAxMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZFAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOClcbiAgLCBjcmVhdGVEZXNjID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuLyoqKi8gfSksXG4vKiAxNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuLyoqKi8gfSksXG4vKiAxNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5zY3JvbGwgPSBleHBvcnRzLmNsb3Nlc3QgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xvc2VzdCA9IF9fd2VicGFja19yZXF1aXJlX18oOTcpO1xuXG52YXIgX2Nsb3Nlc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xvc2VzdCk7XG5cbnZhciBfc2Nyb2xsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDgpO1xuXG52YXIgX3Njcm9sbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY3JvbGwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmNsb3Nlc3QgPSBfY2xvc2VzdDIuZGVmYXVsdDtcbmV4cG9ydHMuc2Nyb2xsID0gX3Njcm9sbDIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbi8qKiovIH0pLFxuLyogMTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogMTggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG4vKioqLyB9KSxcbi8qIDE5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfU2Vuc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Myk7XG5cbnZhciBfU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlbnNvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9TZW5zb3IyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMjAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLyoqKi8gfSksXG4vKiAyMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG4gICwgZW51bUJ1Z0tleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM1KTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuLyoqKi8gfSksXG4vKiAyMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuLyoqKi8gfSksXG4vKiAyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk5KTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07XG5cbi8qKiovIH0pLFxuLyogMjQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9TZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEwKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTZW5zb3JFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TZW5zb3JFdmVudC5TZW5zb3JFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdTdGFydFNlbnNvckV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1NlbnNvckV2ZW50LkRyYWdTdGFydFNlbnNvckV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ01vdmVTZW5zb3JFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TZW5zb3JFdmVudC5EcmFnTW92ZVNlbnNvckV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ1N0b3BTZW5zb3JFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU2Vuc29yRXZlbnQuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQ7XG4gIH1cbn0pO1xuXG4vKioqLyB9KSxcbi8qIDI1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk1pcnJvciA9IGV4cG9ydHMuQWNjZXNzaWJpbGl0eSA9IHVuZGVmaW5lZDtcblxudmFyIF9EcmFnZ2FibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyOCk7XG5cbnZhciBfRHJhZ2dhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdnYWJsZSk7XG5cbnZhciBfUGx1Z2lucyA9IF9fd2VicGFja19yZXF1aXJlX18oNTUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLkFjY2Vzc2liaWxpdHkgPSBfUGx1Z2lucy5BY2Nlc3NpYmlsaXR5O1xuZXhwb3J0cy5NaXJyb3IgPSBfUGx1Z2lucy5NaXJyb3I7XG5leHBvcnRzLmRlZmF1bHQgPSBfRHJhZ2dhYmxlMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDI2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNjIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiAyNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuLyoqKi8gfSksXG4vKiAyOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMjkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDMwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuLyoqKi8gfSksXG4vKiAzMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG4gICwgZFBzICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcwKVxuICAsIGVudW1CdWdLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNSlcbiAgLCBJRV9QUk9UTyAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NCkoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIF9fd2VicGFja19yZXF1aXJlX18oNzQpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMzIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgc2hhcmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNCkoJ2tleXMnKVxuICAsIHVpZCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cbi8qKiovIH0pLFxuLyogMzUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cbi8qKiovIH0pLFxuLyogMzYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRlZiA9IF9fd2VicGFja19yZXF1aXJlX18oOCkuZlxuICAsIGhhcyA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpXG4gICwgVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTtcblxuLyoqKi8gfSksXG4vKiAzNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IF9fd2VicGFja19yZXF1aXJlX18oMjkpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuLyoqKi8gfSksXG4vKiAzOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5leHBvcnRzLmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG4vKioqLyB9KSxcbi8qIDM5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBjb3JlICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNClcbiAgLCBMSUJSQVJZICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzApXG4gICwgd2tzRXh0ICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM4KVxuICAsIGRlZmluZVByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbmV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKioqLyB9KSxcbi8qIDQxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBwSUUgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDApXG4gICwgY3JlYXRlRGVzYyAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KVxuICAsIHRvSU9iamVjdCAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuICAsIHRvUHJpbWl0aXZlICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNylcbiAgLCBoYXMgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKVxuICAsIGdPUEQgICAgICAgICAgID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSkgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9nZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oMTQyKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRQcm90b3R5cGVPZik7XG5cbnZhciBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNDUpO1xuXG52YXIgX2dldE93blByb3BlcnR5RGVzY3JpcHRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgZGVzYyA9ICgwLCBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yMi5kZWZhdWx0KShvYmplY3QsIHByb3BlcnR5KTtcblxuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHBhcmVudCA9ICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKG9iamVjdCk7XG5cbiAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHtcbiAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7XG5cbiAgICBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTtcbiAgfVxufTtcblxuLyoqKi8gfSksXG4vKiA0MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXygxNykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfcmVxdWlyZV9fKDQ0KSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuLyoqKi8gfSksXG4vKiA0NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuICAsIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuLyoqKi8gfSksXG4vKiA0NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Gb3JjZVRvdWNoU2Vuc29yID0gZXhwb3J0cy5EcmFnU2Vuc29yID0gZXhwb3J0cy5Ub3VjaFNlbnNvciA9IGV4cG9ydHMuTW91c2VTZW5zb3IgPSBleHBvcnRzLlNlbnNvciA9IHVuZGVmaW5lZDtcblxudmFyIF9TZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9TZW5zb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Vuc29yKTtcblxudmFyIF9Nb3VzZVNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oNjQpO1xuXG52YXIgX01vdXNlU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01vdXNlU2Vuc29yKTtcblxudmFyIF9Ub3VjaFNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTExKTtcblxudmFyIF9Ub3VjaFNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub3VjaFNlbnNvcik7XG5cbnZhciBfRHJhZ1NlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTEzKTtcblxudmFyIF9EcmFnU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RyYWdTZW5zb3IpO1xuXG52YXIgX0ZvcmNlVG91Y2hTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExNSk7XG5cbnZhciBfRm9yY2VUb3VjaFNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Gb3JjZVRvdWNoU2Vuc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5TZW5zb3IgPSBfU2Vuc29yMi5kZWZhdWx0O1xuZXhwb3J0cy5Nb3VzZVNlbnNvciA9IF9Nb3VzZVNlbnNvcjIuZGVmYXVsdDtcbmV4cG9ydHMuVG91Y2hTZW5zb3IgPSBfVG91Y2hTZW5zb3IyLmRlZmF1bHQ7XG5leHBvcnRzLkRyYWdTZW5zb3IgPSBfRHJhZ1NlbnNvcjIuZGVmYXVsdDtcbmV4cG9ydHMuRm9yY2VUb3VjaFNlbnNvciA9IF9Gb3JjZVRvdWNoU2Vuc29yMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDQ2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY2KTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3OSk7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59O1xuXG4vKioqLyB9KSxcbi8qIDQ3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgJGF0ICA9IF9fd2VicGFja19yZXF1aXJlX18oNjgpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDQ4KShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuLyoqKi8gfSksXG4vKiA0OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIExJQlJBUlkgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMClcbiAgLCAkZXhwb3J0ICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTApXG4gICwgcmVkZWZpbmUgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ5KVxuICAsIGhpZGUgICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMylcbiAgLCBoYXMgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpXG4gICwgSXRlcmF0b3JzICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuICAsICRpdGVyQ3JlYXRlICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2OSlcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKVxuICAsIElURVJBVE9SICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cbi8qKiovIH0pLFxuLyogNDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblxuLyoqKi8gfSksXG4vKiA1MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaGFzICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcbiAgLCB0b0lPYmplY3QgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpXG4gICwgYXJyYXlJbmRleE9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MikoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDUxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cbi8qKiovIH0pLFxuLyogNTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpXG4gICwgdG9PYmplY3QgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuICAsIElFX1BST1RPICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuXG4vKioqLyB9KSxcbi8qIDUzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbi8qKiovIH0pLFxuLyogNTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKVxuICAsIGhpZGRlbktleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM1KS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcblxuLyoqKi8gfSksXG4vKiA1NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5BY2Nlc3NpYmlsaXR5ID0gZXhwb3J0cy5kZWZhdWx0TWlycm9yT3B0aW9uID0gZXhwb3J0cy5NaXJyb3IgPSB1bmRlZmluZWQ7XG5cbnZhciBfTWlycm9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjkpO1xuXG52YXIgX01pcnJvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9NaXJyb3IpO1xuXG52YXIgX0FjY2Vzc2liaWxpdHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzMik7XG5cbnZhciBfQWNjZXNzaWJpbGl0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY2Nlc3NpYmlsaXR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5NaXJyb3IgPSBfTWlycm9yMi5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0TWlycm9yT3B0aW9uID0gX01pcnJvci5kZWZhdWx0TWlycm9yT3B0aW9uO1xuZXhwb3J0cy5BY2Nlc3NpYmlsaXR5ID0gX0FjY2Vzc2liaWxpdHkyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogNTYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApXG4gICwgY29yZSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNClcbiAgLCBmYWlscyAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciBmbiAgPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDU3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNvcnRhYmxlID0gZXhwb3J0cy5Td2FwcGFibGUgPSBleHBvcnRzLkRyb3BwYWJsZSA9IGV4cG9ydHMuRHJhZ2dhYmxlID0gZXhwb3J0cy5QbHVnaW5zID0gZXhwb3J0cy5TZW5zb3JzID0gZXhwb3J0cy5CYXNlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfQWJzdHJhY3RFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50KTtcblxudmFyIF9TZW5zb3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NSk7XG5cbnZhciBTZW5zb3JzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX1NlbnNvcnMpO1xuXG52YXIgX1BsdWdpbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExNyk7XG5cbnZhciBQbHVnaW5zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX1BsdWdpbnMpO1xuXG52YXIgX0RyYWdnYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG52YXIgX0RyYWdnYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EcmFnZ2FibGUpO1xuXG52YXIgX0Ryb3BwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTQwKTtcblxudmFyIF9Ecm9wcGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJvcHBhYmxlKTtcblxudmFyIF9Td2FwcGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1MCk7XG5cbnZhciBfU3dhcHBhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N3YXBwYWJsZSk7XG5cbnZhciBfU29ydGFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1NCk7XG5cbnZhciBfU29ydGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydGFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLkJhc2VFdmVudCA9IF9BYnN0cmFjdEV2ZW50Mi5kZWZhdWx0O1xuZXhwb3J0cy5TZW5zb3JzID0gU2Vuc29ycztcbmV4cG9ydHMuUGx1Z2lucyA9IFBsdWdpbnM7XG5leHBvcnRzLkRyYWdnYWJsZSA9IF9EcmFnZ2FibGUyLmRlZmF1bHQ7XG5leHBvcnRzLkRyb3BwYWJsZSA9IF9Ecm9wcGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLlN3YXBwYWJsZSA9IF9Td2FwcGFibGUyLmRlZmF1bHQ7XG5leHBvcnRzLlNvcnRhYmxlID0gX1NvcnRhYmxlMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDU4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBBbGwgZXZlbnRzIGZpcmVkIGJ5IGRyYWdnYWJsZSBpbmhlcml0IHRoaXMgY2xhc3MuIFlvdSBjYW4gY2FsbCBgY2FuY2VsKClgIHRvXG4gKiBjYW5jZWwgYSBzcGVjaWZpYyBldmVudCBvciB5b3UgY2FuIGNoZWNrIGlmIGFuIGV2ZW50IGhhcyBiZWVuIGNhbmNlbGVkIGJ5XG4gKiBjYWxsaW5nIGBjYW5jZWxlZCgpYC5cbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIEFic3RyYWN0RXZlbnRcbiAqIEBtb2R1bGUgQWJzdHJhY3RFdmVudFxuICovXG52YXIgQWJzdHJhY3RFdmVudCA9IGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogRXZlbnQgdHlwZVxuICAgKiBAc3RhdGljXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcHJvcGVydHkgdHlwZVxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gQWJzdHJhY3RFdmVudChkYXRhKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgQWJzdHJhY3RFdmVudCk7XG5cbiAgICB0aGlzLl9jYW5jZWxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogUmVhZC1vbmx5IHR5cGVcbiAgICogQGFic3RyYWN0XG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG5cblxuICAvKipcbiAgICogRXZlbnQgY2FuY2VsYWJsZVxuICAgKiBAc3RhdGljXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcHJvcGVydHkgY2FuY2VsYWJsZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShBYnN0cmFjdEV2ZW50LCBbe1xuICAgIGtleTogJ2NhbmNlbCcsXG5cblxuICAgIC8qKlxuICAgICAqIENhbmNlbHMgdGhlIGV2ZW50IGluc3RhbmNlXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgIHRoaXMuX2NhbmNlbGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBldmVudCBoYXMgYmVlbiBjYW5jZWxlZFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NhbmNlbGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2FuY2VsZWQoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLl9jYW5jZWxlZCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndHlwZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQtb25seSBjYW5jZWxhYmxlXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2FuY2VsYWJsZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jYW5jZWxhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQWJzdHJhY3RFdmVudDtcbn0oKTtcblxuQWJzdHJhY3RFdmVudC50eXBlID0gJ2V2ZW50JztcbkFic3RyYWN0RXZlbnQuY2FuY2VsYWJsZSA9IGZhbHNlO1xuZXhwb3J0cy5kZWZhdWx0ID0gQWJzdHJhY3RFdmVudDtcblxuLyoqKi8gfSksXG4vKiA1OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oNjApLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogNjAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg2MSk7XG52YXIgJE9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oNCkuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDYxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhX193ZWJwYWNrX3JlcXVpcmVfXygxMSksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IF9fd2VicGFja19yZXF1aXJlX18oOCkuZn0pO1xuXG4vKioqLyB9KSxcbi8qIDYyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG4vKioqLyB9KSxcbi8qIDYzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIHNlbnNvciBjbGFzcy4gRXh0ZW5kIGZyb20gdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBuZXcgb3IgY3VzdG9tIHNlbnNvclxuICogQGNsYXNzIFNlbnNvclxuICogQG1vZHVsZSBTZW5zb3JcbiAqL1xudmFyIFNlbnNvciA9IGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogU2Vuc29yIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBTZW5zb3JcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gQ29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIFNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNlbnNvcik7XG5cblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgY29udGFpbmVyc1xuICAgICAqIEBwcm9wZXJ0eSBjb250YWluZXJzXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgdGhpcy5jb250YWluZXJzID0gY29udGFpbmVycztcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgb3B0aW9uc1xuICAgICAqIEBwcm9wZXJ0eSBvcHRpb25zXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgZHJhZyBzdGF0ZVxuICAgICAqIEBwcm9wZXJ0eSBkcmFnZ2luZ1xuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgY29udGFpbmVyXG4gICAgICogQHByb3BlcnR5IGN1cnJlbnRDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAqIEByZXR1cm4ge1NlbnNvcn1cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgICAqIEByZXR1cm4ge1NlbnNvcn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgZXZlbnQgb24gdGFyZ2V0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gRWxlbWVudCB0byB0cmlnZ2VyIGV2ZW50IG9uXG4gICAgICogQHBhcmFtIHtTZW5zb3JFdmVudH0gc2Vuc29yRXZlbnQgLSBTZW5zb3IgZXZlbnQgdG8gdHJpZ2dlclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihlbGVtZW50LCBzZW5zb3JFdmVudCkge1xuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBldmVudC5kZXRhaWwgPSBzZW5zb3JFdmVudDtcbiAgICAgIGV2ZW50LmluaXRFdmVudChzZW5zb3JFdmVudC50eXBlLCB0cnVlLCB0cnVlKTtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB0aGlzLmxhc3RFdmVudCA9IHNlbnNvckV2ZW50O1xuICAgICAgcmV0dXJuIHNlbnNvckV2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2Vuc29yO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTZW5zb3I7XG5cbi8qKiovIH0pLFxuLyogNjQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Nb3VzZVNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oNjUpO1xuXG52YXIgX01vdXNlU2Vuc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01vdXNlU2Vuc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX01vdXNlU2Vuc29yMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDY1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cbnZhciBfU2Vuc29yMiA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgX1NlbnNvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZW5zb3IyKTtcblxudmFyIF9TZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb25Db250ZXh0TWVudVdoaWxlRHJhZ2dpbmcgPSBTeW1ib2woJ29uQ29udGV4dE1lbnVXaGlsZURyYWdnaW5nJyk7XG52YXIgb25Nb3VzZURvd24gPSBTeW1ib2woJ29uTW91c2VEb3duJyk7XG52YXIgb25Nb3VzZU1vdmUgPSBTeW1ib2woJ29uTW91c2VNb3ZlJyk7XG52YXIgb25Nb3VzZVVwID0gU3ltYm9sKCdvbk1vdXNlVXAnKTtcblxuLyoqXG4gKiBUaGlzIHNlbnNvciBwaWNrcyB1cCBuYXRpdmUgYnJvd3NlciBtb3VzZSBldmVudHMgYW5kIGRpY3RhdGVzIGRyYWcgb3BlcmF0aW9uc1xuICogQGNsYXNzIE1vdXNlU2Vuc29yXG4gKiBAbW9kdWxlIE1vdXNlU2Vuc29yXG4gKiBAZXh0ZW5kcyBTZW5zb3JcbiAqL1xuXG52YXIgTW91c2VTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNb3VzZVNlbnNvciwgX1NlbnNvcik7XG5cbiAgLyoqXG4gICAqIE1vdXNlU2Vuc29yIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBNb3VzZVNlbnNvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBDb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gTW91c2VTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNb3VzZVNlbnNvcik7XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgaWYgbW91c2UgYnV0dG9uIGlzIHN0aWxsIGRvd25cbiAgICAgKiBAcHJvcGVydHkgbW91c2VEb3duXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTW91c2VTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNb3VzZVNlbnNvcikpLmNhbGwodGhpcywgY29udGFpbmVycywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMubW91c2VEb3duID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBkb3duIHRpbWVyIHdoaWNoIHdpbGwgZW5kIHVwIHRyaWdnZXJpbmcgdGhlIGRyYWcgc3RhcnQgb3BlcmF0aW9uXG4gICAgICogQHByb3BlcnR5IG1vdXNlRG93blRpbWVvdXRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIF90aGlzLm1vdXNlRG93blRpbWVvdXQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGlmIGNvbnRleHQgbWVudSBoYXMgYmVlbiBvcGVuZWQgZHVyaW5nIGRyYWcgb3BlcmF0aW9uXG4gICAgICogQHByb3BlcnR5IG9wZW5lZENvbnRleHRNZW51XG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgX3RoaXMub3BlbmVkQ29udGV4dE1lbnUgPSBmYWxzZTtcblxuICAgIF90aGlzW29uQ29udGV4dE1lbnVXaGlsZURyYWdnaW5nXSA9IF90aGlzW29uQ29udGV4dE1lbnVXaGlsZURyYWdnaW5nXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlRG93bl0gPSBfdGhpc1tvbk1vdXNlRG93bl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZU1vdmVdID0gX3RoaXNbb25Nb3VzZU1vdmVdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VVcF0gPSBfdGhpc1tvbk1vdXNlVXBdLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTW91c2VTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpc1tvbk1vdXNlRG93bl0sIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpc1tvbk1vdXNlRG93bl0sIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGRvd24gaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBkb3duIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZURvd24sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpc1tvbk1vdXNlVXBdKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHByZXZlbnROYXRpdmVEcmFnU3RhcnQpO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHZhciBjb250YWluZXIgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKHRhcmdldCwgdGhpcy5jb250YWluZXJzKTtcblxuICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG5cbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLm1vdXNlRG93blRpbWVvdXQpO1xuICAgICAgdGhpcy5tb3VzZURvd25UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghX3RoaXMyLm1vdXNlRG93bikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgICB9KTtcblxuICAgICAgICBfdGhpczIudHJpZ2dlcihjb250YWluZXIsIGRyYWdTdGFydEV2ZW50KTtcblxuICAgICAgICBfdGhpczIuY3VycmVudENvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgX3RoaXMyLmRyYWdnaW5nID0gIWRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCk7XG5cbiAgICAgICAgaWYgKF90aGlzMi5kcmFnZ2luZykge1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgX3RoaXMyW29uQ29udGV4dE1lbnVXaGlsZURyYWdnaW5nXSk7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgX3RoaXMyW29uTW91c2VNb3ZlXSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMub3B0aW9ucy5kZWxheSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2UgbW92ZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIG1vdmUgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlTW92ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnTW92ZUV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSB1cCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIHVwIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZVVwLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdGhpcy5tb3VzZURvd24gPSBCb29sZWFuKHRoaXMub3BlbmVkQ29udGV4dE1lbnUpO1xuXG4gICAgICBpZiAodGhpcy5vcGVuZWRDb250ZXh0TWVudSkge1xuICAgICAgICB0aGlzLm9wZW5lZENvbnRleHRNZW51ID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXNbb25Nb3VzZVVwXSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBwcmV2ZW50TmF0aXZlRHJhZ1N0YXJ0KTtcblxuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHZhciBkcmFnU3RvcEV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnU3RvcFNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHRoaXNbb25Db250ZXh0TWVudVdoaWxlRHJhZ2dpbmddKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXNbb25Nb3VzZU1vdmVdKTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb250ZXh0IG1lbnUgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBDb250ZXh0IG1lbnUgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkNvbnRleHRNZW51V2hpbGVEcmFnZ2luZyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm9wZW5lZENvbnRleHRNZW51ID0gdHJ1ZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1vdXNlU2Vuc29yO1xufShfU2Vuc29yMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTW91c2VTZW5zb3I7XG5cblxuZnVuY3Rpb24gcHJldmVudE5hdGl2ZURyYWdTdGFydChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG4vKioqLyB9KSxcbi8qIDY2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg2NyksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA2NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KTtcbl9fd2VicGFja19yZXF1aXJlX18oNzUpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM4KS5mKCdpdGVyYXRvcicpO1xuXG4vKioqLyB9KSxcbi8qIDY4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciB0b0ludGVnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuICAsIGRlZmluZWQgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjkpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuLyoqKi8gfSksXG4vKiA2OSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNyZWF0ZSAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMSlcbiAgLCBkZXNjcmlwdG9yICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM2KVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDEzKShJdGVyYXRvclByb3RvdHlwZSwgX193ZWJwYWNrX3JlcXVpcmVfXyg2KSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cbi8qKiovIH0pLFxuLyogNzAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRQICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KVxuICAsIGFuT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcbiAgLCBnZXRLZXlzICA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cbi8qKiovIH0pLFxuLyogNzEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cbi8qKiovIH0pLFxuLyogNzIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpXG4gICwgdG9MZW5ndGggID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSlcbiAgLCB0b0luZGV4ICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDczKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbi8qKiovIH0pLFxuLyogNzMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHRvSW50ZWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDc0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbi8qKiovIH0pLFxuLyogNzUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg3Nik7XG52YXIgZ2xvYmFsICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBoaWRlICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMylcbiAgLCBJdGVyYXRvcnMgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcbiAgLCBUT19TVFJJTkdfVEFHID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuLyoqKi8gfSksXG4vKiA3NiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGFkZFRvVW5zY29wYWJsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc3KVxuICAsIHN0ZXAgICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc4KVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNDgpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG4vKioqLyB9KSxcbi8qIDc3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcblxuLyoqKi8gfSksXG4vKiA3OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59O1xuXG4vKioqLyB9KSxcbi8qIDc5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXyg4MCksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiA4MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKDgxKTtcbl9fd2VicGFja19yZXF1aXJlX18oODcpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyg4OCk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDg5KTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5TeW1ib2w7XG5cbi8qKiovIH0pLFxuLyogODEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNylcbiAgLCBoYXMgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpXG4gICwgREVTQ1JJUFRPUlMgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKVxuICAsICRleHBvcnQgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMClcbiAgLCByZWRlZmluZSAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDkpXG4gICwgTUVUQSAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgyKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpXG4gICwgc2hhcmVkICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KVxuICAsIHNldFRvU3RyaW5nVGFnID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNilcbiAgLCB1aWQgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpXG4gICwgd2tzICAgICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpXG4gICwgd2tzRXh0ICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM4KVxuICAsIHdrc0RlZmluZSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSlcbiAgLCBrZXlPZiAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oODMpXG4gICwgZW51bUtleXMgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg0KVxuICAsIGlzQXJyYXkgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NSlcbiAgLCBhbk9iamVjdCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG4gICwgdG9JT2JqZWN0ICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpXG4gICwgdG9QcmltaXRpdmUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KVxuICAsIGNyZWF0ZURlc2MgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOClcbiAgLCBfY3JlYXRlICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzEpXG4gICwgZ09QTkV4dCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg2KVxuICAsICRHT1BEICAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSlcbiAgLCAkRFAgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOClcbiAgLCAka2V5cyAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpXG4gICwgZ09QRCAgICAgICAgICAgPSAkR09QRC5mXG4gICwgZFAgICAgICAgICAgICAgPSAkRFAuZlxuICAsIGdPUE4gICAgICAgICAgID0gZ09QTkV4dC5mXG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBUT19QUklNSVRJVkUgICA9IHdrcygndG9QcmltaXRpdmUnKVxuICAsIGlzRW51bSAgICAgICAgID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgT1BTeW1ib2xzICAgICAgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKVxuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0W1BST1RPVFlQRV1cbiAgLCBVU0VfTkFUSVZFICAgICA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbidcbiAgLCBRT2JqZWN0ICAgICAgICA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8pJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZih0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgaXQgID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnT1BOKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIElTX09QICA9IGl0ID09PSBPYmplY3RQcm90b1xuICAgICwgbmFtZXMgID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighVVNFX05BVElWRSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKHRoaXMgPT09IE9iamVjdFByb3RvKSRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZihERVNDUklQVE9SUyAmJiBzZXR0ZXIpc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7Y29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXR9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiAgID0gJGRlZmluZVByb3BlcnR5O1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDU0KS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIF9fd2VicGFja19yZXF1aXJlX18oNDApLmYgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICBfX3dlYnBhY2tfcmVxdWlyZV9fKDUzKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXygzMCkpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbihuYW1lKXtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuZm9yKHZhciBzeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3Moc3ltYm9sc1tpKytdKTtcblxuZm9yKHZhciBzeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrc0RlZmluZShzeW1ib2xzW2krK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIGlmKGlzU3ltYm9sKGtleSkpcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICAgIHRocm93IFR5cGVFcnJvcihrZXkgKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgICBpZihpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSlyZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF1cbiAgICAgICwgaSAgICA9IDFcbiAgICAgICwgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICBpZigkcmVwbGFjZXIpdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IF9fd2VicGFja19yZXF1aXJlX18oMTMpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG4vKioqLyB9KSxcbi8qIDgyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBNRVRBICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpXG4gICwgaGFzICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuICAsIHNldERlc2MgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KS5mXG4gICwgaWQgICAgICAgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG4vKioqLyB9KSxcbi8qIDgzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnZXRLZXlzICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuICAsIHRvSU9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDg0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpXG4gICwgZ09QUyAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNTMpXG4gICwgcElFICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDApO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciByZXN1bHQgICAgID0gZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9IHBJRS5mXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqKi8gfSksXG4vKiA4NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG4vKioqLyB9KSxcbi8qIDg2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpXG4gICwgZ09QTiAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NCkuZlxuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24oaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDg3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblxuXG4vKioqLyB9KSxcbi8qIDg4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oMzkpKCdhc3luY0l0ZXJhdG9yJyk7XG5cbi8qKiovIH0pLFxuLyogODkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygzOSkoJ29ic2VydmFibGUnKTtcblxuLyoqKi8gfSksXG4vKiA5MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IF9fd2VicGFja19yZXF1aXJlX18oOTEpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogOTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg5Mik7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNCkuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuXG4vKioqLyB9KSxcbi8qIDkyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IF9fd2VicGFja19yZXF1aXJlX18oOTMpLnNldH0pO1xuXG4vKioqLyB9KSxcbi8qIDkzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpXG4gICwgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KShGdW5jdGlvbi5jYWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cbi8qKiovIH0pLFxuLyogOTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDk1KSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDk1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbl9fd2VicGFja19yZXF1aXJlX18oOTYpO1xudmFyICRPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDk2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMClcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKX0pO1xuXG4vKioqLyB9KSxcbi8qIDk3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xvc2VzdCA9IF9fd2VicGFja19yZXF1aXJlX18oOTgpO1xuXG52YXIgX2Nsb3Nlc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xvc2VzdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9jbG9zZXN0Mi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDk4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9Db25zdW1hYmxlQXJyYXkyKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY2xvc2VzdDtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG1hdGNoRnVuY3Rpb24gPSBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3I7XG5cbmZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudCwgdmFsdWUpIHtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgc2VsZWN0b3IgPSB2YWx1ZTtcbiAgdmFyIGNhbGxiYWNrID0gdmFsdWU7XG4gIHZhciBub2RlTGlzdCA9IHZhbHVlO1xuICB2YXIgc2luZ2xlRWxlbWVudCA9IHZhbHVlO1xuXG4gIHZhciBpc1NlbGVjdG9yID0gQm9vbGVhbih0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSBCb29sZWFuKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyk7XG4gIHZhciBpc05vZGVMaXN0ID0gQm9vbGVhbih2YWx1ZSBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpO1xuICB2YXIgaXNFbGVtZW50ID0gQm9vbGVhbih2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KTtcblxuICBmdW5jdGlvbiBjb25kaXRpb25GbihjdXJyZW50RWxlbWVudCkge1xuICAgIGlmICghY3VycmVudEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcbiAgICB9IGVsc2UgaWYgKGlzU2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBtYXRjaEZ1bmN0aW9uLmNhbGwoY3VycmVudEVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgICB9IGVsc2UgaWYgKGlzTm9kZUxpc3QpIHtcbiAgICAgIHJldHVybiBbXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkobm9kZUxpc3QpKS5pbmNsdWRlcyhjdXJyZW50RWxlbWVudCk7XG4gICAgfSBlbHNlIGlmIChpc0VsZW1lbnQpIHtcbiAgICAgIHJldHVybiBzaW5nbGVFbGVtZW50ID09PSBjdXJyZW50RWxlbWVudDtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhjdXJyZW50RWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50ID0gZWxlbWVudDtcblxuICBkbyB7XG4gICAgY3VycmVudCA9IGN1cnJlbnQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQgfHwgY3VycmVudC5jb3JyZXNwb25kaW5nRWxlbWVudCB8fCBjdXJyZW50O1xuICAgIGlmIChjb25kaXRpb25GbihjdXJyZW50KSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gIH0gd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gZG9jdW1lbnQuYm9keSAmJiBjdXJyZW50ICE9PSBkb2N1bWVudCk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiovIH0pLFxuLyogOTkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwMCksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiAxMDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg0Nyk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKDEwMSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNCkuQXJyYXkuZnJvbTtcblxuLyoqKi8gfSksXG4vKiAxMDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjdHggICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpXG4gICwgJGV4cG9ydCAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKVxuICAsIHRvT2JqZWN0ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcbiAgLCBjYWxsICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTAyKVxuICAsIGlzQXJyYXlJdGVyICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDMpXG4gICwgdG9MZW5ndGggICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUxKVxuICAsIGNyZWF0ZVByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMDQpXG4gICwgZ2V0SXRlckZuICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwNSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIV9fd2VicGFja19yZXF1aXJlX18oMTA3KShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcblxuXG4vKioqLyB9KSxcbi8qIDEwMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuLyoqKi8gfSksXG4vKiAxMDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuICAsIElURVJBVE9SICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDEwNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oOClcbiAgLCBjcmVhdGVEZXNjICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGluZGV4LCB2YWx1ZSl7XG4gIGlmKGluZGV4IGluIG9iamVjdCkkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTtcblxuLyoqKi8gfSksXG4vKiAxMDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGNsYXNzb2YgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTA2KVxuICAsIElURVJBVE9SICA9IF9fd2VicGFja19yZXF1aXJlX18oNikoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cbi8qKiovIH0pLFxuLyogMTA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMilcbiAgLCBUQUcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcblxuLyoqKi8gfSksXG4vKiAxMDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIElURVJBVE9SICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNikoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuXG4vKioqLyB9KSxcbi8qIDEwOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3Njcm9sbCA9IF9fd2VicGFja19yZXF1aXJlX18oMTA5KTtcblxudmFyIF9zY3JvbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Nyb2xsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX3Njcm9sbDIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNjcm9sbDtcbnZhciBzY3JvbGxBbmltYXRpb25GcmFtZSA9IHZvaWQgMDtcblxuZnVuY3Rpb24gc2Nyb2xsKGVsZW1lbnQsIF9yZWYpIHtcbiAgdmFyIGNsaWVudFggPSBfcmVmLmNsaWVudFgsXG4gICAgICBjbGllbnRZID0gX3JlZi5jbGllbnRZLFxuICAgICAgc3BlZWQgPSBfcmVmLnNwZWVkLFxuICAgICAgc2Vuc2l0aXZpdHkgPSBfcmVmLnNlbnNpdGl2aXR5O1xuXG4gIGlmIChzY3JvbGxBbmltYXRpb25GcmFtZSkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHNjcm9sbEFuaW1hdGlvbkZyYW1lKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbEZuKCkge1xuICAgIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB2YXIgb2Zmc2V0WSA9IChNYXRoLmFicyhyZWN0LmJvdHRvbSAtIGNsaWVudFkpIDw9IHNlbnNpdGl2aXR5KSAtIChNYXRoLmFicyhyZWN0LnRvcCAtIGNsaWVudFkpIDw9IHNlbnNpdGl2aXR5KTtcbiAgICB2YXIgb2Zmc2V0WCA9IChNYXRoLmFicyhyZWN0LnJpZ2h0IC0gY2xpZW50WCkgPD0gc2Vuc2l0aXZpdHkpIC0gKE1hdGguYWJzKHJlY3QubGVmdCAtIGNsaWVudFgpIDw9IHNlbnNpdGl2aXR5KTtcbiAgICBlbGVtZW50LnNjcm9sbFRvcCArPSBvZmZzZXRZICogc3BlZWQ7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0ICs9IG9mZnNldFggKiBzcGVlZDtcbiAgICBzY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxGbik7XG4gIH1cblxuICBzY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxGbik7XG59XG5cbi8qKiovIH0pLFxuLyogMTEwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnU3RvcFNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnTW92ZVNlbnNvckV2ZW50ID0gZXhwb3J0cy5EcmFnU3RhcnRTZW5zb3JFdmVudCA9IGV4cG9ydHMuU2Vuc29yRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIHNlbnNvciBldmVudFxuICogQGNsYXNzIFNlbnNvckV2ZW50XG4gKiBAbW9kdWxlIFNlbnNvckV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBTZW5zb3JFdmVudCA9IGV4cG9ydHMuU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU2Vuc29yRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNlbnNvckV2ZW50LCBbe1xuICAgIGtleTogJ29yaWdpbmFsRXZlbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBicm93c2VyIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIGEgc2Vuc29yXG4gICAgICogQHByb3BlcnR5IG9yaWdpbmFsRXZlbnRcbiAgICAgKiBAdHlwZSB7RXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9yaWdpbmFsRXZlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplZCBjbGllbnRYIGZvciBib3RoIHRvdWNoIGFuZCBtb3VzZSBldmVudHNcbiAgICAgKiBAcHJvcGVydHkgY2xpZW50WFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NsaWVudFgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jbGllbnRYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZWQgY2xpZW50WSBmb3IgYm90aCB0b3VjaCBhbmQgbW91c2UgZXZlbnRzXG4gICAgICogQHByb3BlcnR5IGNsaWVudFlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjbGllbnRZJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY2xpZW50WTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemVkIHRhcmdldCBmb3IgYm90aCB0b3VjaCBhbmQgbW91c2UgZXZlbnRzXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCB0aGF0IGlzIGJlaGluZCBjdXJzb3Igb3IgdG91Y2ggcG9pbnRlclxuICAgICAqIEBwcm9wZXJ0eSB0YXJnZXRcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RhcmdldCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnRhcmdldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb250YWluZXIgdGhhdCBpbml0aWF0ZWQgdGhlIHNlbnNvclxuICAgICAqIEBwcm9wZXJ0eSBjb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFja3BhZCBwcmVzc3VyZVxuICAgICAqIEBwcm9wZXJ0eSBwcmVzc3VyZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3ByZXNzdXJlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEucHJlc3N1cmU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTZW5zb3JFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIERyYWcgc3RhcnQgc2Vuc29yIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ1N0YXJ0U2Vuc29yRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ1N0YXJ0U2Vuc29yRXZlbnRcbiAqIEBleHRlbmRzIFNlbnNvckV2ZW50XG4gKi9cblxuXG52YXIgRHJhZ1N0YXJ0U2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdGFydFNlbnNvckV2ZW50ID0gZnVuY3Rpb24gKF9TZW5zb3JFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RhcnRTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnU3RhcnRTZW5zb3JFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RhcnRTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdGFydFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0YXJ0U2Vuc29yRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RhcnRTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgbW92ZSBzZW5zb3IgZXZlbnRcbiAqIEBjbGFzcyBEcmFnTW92ZVNlbnNvckV2ZW50XG4gKiBAbW9kdWxlIERyYWdNb3ZlU2Vuc29yRXZlbnRcbiAqIEBleHRlbmRzIFNlbnNvckV2ZW50XG4gKi9cblxuXG5EcmFnU3RhcnRTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6c3RhcnQnO1xuXG52YXIgRHJhZ01vdmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVTZW5zb3JFdmVudCA9IGZ1bmN0aW9uIChfU2Vuc29yRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdNb3ZlU2Vuc29yRXZlbnQsIF9TZW5zb3JFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIERyYWdNb3ZlU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ01vdmVTZW5zb3JFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdNb3ZlU2Vuc29yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnTW92ZVNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ01vdmVTZW5zb3JFdmVudDtcbn0oU2Vuc29yRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgc3RvcCBzZW5zb3IgZXZlbnRcbiAqIEBjbGFzcyBEcmFnU3RvcFNlbnNvckV2ZW50XG4gKiBAbW9kdWxlIERyYWdTdG9wU2Vuc29yRXZlbnRcbiAqIEBleHRlbmRzIFNlbnNvckV2ZW50XG4gKi9cblxuXG5EcmFnTW92ZVNlbnNvckV2ZW50LnR5cGUgPSAnZHJhZzptb3ZlJztcblxudmFyIERyYWdTdG9wU2Vuc29yRXZlbnQgPSBleHBvcnRzLkRyYWdTdG9wU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RvcFNlbnNvckV2ZW50LCBfU2Vuc29yRXZlbnQzKTtcblxuICBmdW5jdGlvbiBEcmFnU3RvcFNlbnNvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERyYWdTdG9wU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnU3RvcFNlbnNvckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0b3BTZW5zb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIERyYWdTdG9wU2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuLyoqXG4gKiBEcmFnIHByZXNzdXJlIHNlbnNvciBldmVudFxuICogQGNsYXNzIERyYWdQcmVzc3VyZVNlbnNvckV2ZW50XG4gKiBAbW9kdWxlIERyYWdQcmVzc3VyZVNlbnNvckV2ZW50XG4gKiBAZXh0ZW5kcyBTZW5zb3JFdmVudFxuICovXG5cblxuRHJhZ1N0b3BTZW5zb3JFdmVudC50eXBlID0gJ2RyYWc6c3RvcCc7XG5cbnZhciBEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCA9IGV4cG9ydHMuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQgPSBmdW5jdGlvbiAoX1NlbnNvckV2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnUHJlc3N1cmVTZW5zb3JFdmVudCwgX1NlbnNvckV2ZW50NCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnUHJlc3N1cmVTZW5zb3JFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdQcmVzc3VyZVNlbnNvckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQ7XG59KFNlbnNvckV2ZW50KTtcblxuRHJhZ1ByZXNzdXJlU2Vuc29yRXZlbnQudHlwZSA9ICdkcmFnOnByZXNzdXJlJztcblxuLyoqKi8gfSksXG4vKiAxMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Ub3VjaFNlbnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTEyKTtcblxudmFyIF9Ub3VjaFNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Ub3VjaFNlbnNvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Ub3VjaFNlbnNvcjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxudmFyIF9TZW5zb3IyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbnZhciBfU2Vuc29yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlbnNvcjIpO1xuXG52YXIgX1NlbnNvckV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvblRvdWNoU3RhcnQgPSBTeW1ib2woJ29uVG91Y2hTdGFydCcpO1xudmFyIG9uVG91Y2hIb2xkID0gU3ltYm9sKCdvblRvdWNoSG9sZCcpO1xudmFyIG9uVG91Y2hFbmQgPSBTeW1ib2woJ29uVG91Y2hFbmQnKTtcbnZhciBvblRvdWNoTW92ZSA9IFN5bWJvbCgnb25Ub3VjaE1vdmUnKTtcbnZhciBvblNjcm9sbCA9IFN5bWJvbCgnb25TY3JvbGwnKTtcblxuLyoqXG4gKiBBZGRzIGRlZmF1bHQgZG9jdW1lbnQub250b3VjaG1vdmUuIFdvcmthcm91bmQgZm9yIHByZXZlbnRpbmcgc2Nyb2xsaW5nIG9uIHRvdWNobW92ZVxuICovXG5kb2N1bWVudC5vbnRvdWNobW92ZSA9IGRvY3VtZW50Lm9udG91Y2htb3ZlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFRoaXMgc2Vuc29yIHBpY2tzIHVwIG5hdGl2ZSBicm93c2VyIHRvdWNoIGV2ZW50cyBhbmQgZGljdGF0ZXMgZHJhZyBvcGVyYXRpb25zXG4gKiBAY2xhc3MgVG91Y2hTZW5zb3JcbiAqIEBtb2R1bGUgVG91Y2hTZW5zb3JcbiAqIEBleHRlbmRzIFNlbnNvclxuICovXG5cbnZhciBUb3VjaFNlbnNvciA9IGZ1bmN0aW9uIChfU2Vuc29yKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFRvdWNoU2Vuc29yLCBfU2Vuc29yKTtcblxuICAvKipcbiAgICogVG91Y2hTZW5zb3IgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIFRvdWNoU2Vuc29yXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIENvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBUb3VjaFNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFRvdWNoU2Vuc29yKTtcblxuICAgIC8qKlxuICAgICAqIENsb3Nlc3Qgc2Nyb2xsYWJsZSBjb250YWluZXIgc28gYWNjaWRlbnRhbCBzY3JvbGwgY2FuIGNhbmNlbCBsb25nIHRvdWNoXG4gICAgICogQHByb3BlcnR5IGN1cnJlbnRTY3JvbGxhYmxlUGFyZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFRvdWNoU2Vuc29yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVG91Y2hTZW5zb3IpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFRpbWVvdXRJRCBmb3IgbG9uZyB0b3VjaFxuICAgICAqIEBwcm9wZXJ0eSB0YXBUaW1lb3V0XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBfdGhpcy50YXBUaW1lb3V0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIHRvdWNoTW92ZWQgaW5kaWNhdGVzIGlmIHRvdWNoIGhhcyBtb3ZlZCBkdXJpbmcgdGFwVGltZW91dFxuICAgICAqIEBwcm9wZXJ0eSB0b3VjaE1vdmVkXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgX3RoaXMudG91Y2hNb3ZlZCA9IGZhbHNlO1xuXG4gICAgX3RoaXNbb25Ub3VjaFN0YXJ0XSA9IF90aGlzW29uVG91Y2hTdGFydF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Ub3VjaEhvbGRdID0gX3RoaXNbb25Ub3VjaEhvbGRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uVG91Y2hFbmRdID0gX3RoaXNbb25Ub3VjaEVuZF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Ub3VjaE1vdmVdID0gX3RoaXNbb25Ub3VjaE1vdmVdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uU2Nyb2xsXSA9IF90aGlzW29uU2Nyb2xsXS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFRvdWNoU2Vuc29yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzW29uVG91Y2hTdGFydF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXNbb25Ub3VjaFN0YXJ0XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG91Y2ggc3RhcnQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUb3VjaCBzdGFydCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uVG91Y2hTdGFydCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBjb250YWluZXIgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGV2ZW50LnRhcmdldCwgdGhpcy5jb250YWluZXJzKTtcblxuICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzW29uVG91Y2hNb3ZlXSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpc1tvblRvdWNoRW5kXSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXNbb25Ub3VjaEVuZF0pO1xuXG4gICAgICAvLyBkZXRlY3QgaWYgYm9keSBpcyBzY3JvbGxpbmcgb24gaU9TXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzW29uU2Nyb2xsXSk7XG4gICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBvbkNvbnRleHRNZW51KTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgICB0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50ID0gKDAsIF91dGlscy5jbG9zZXN0KShjb250YWluZXIsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm9mZnNldEhlaWdodCA8IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbGFibGVQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpc1tvblNjcm9sbF0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhcFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXNbb25Ub3VjaEhvbGRdKGV2ZW50LCBjb250YWluZXIpLCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvdWNoIGhvbGQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUb3VjaCBzdGFydCBldmVudFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciAtIENvbnRhaW5lciBlbGVtZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Ub3VjaEhvbGQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50LCBjb250YWluZXIpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX3RoaXMyLnRvdWNoTW92ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICAgIGNsaWVudFg6IHRvdWNoLnBhZ2VYLFxuICAgICAgICAgIGNsaWVudFk6IHRvdWNoLnBhZ2VZLFxuICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICAgIF90aGlzMi5kcmFnZ2luZyA9ICFkcmFnU3RhcnRFdmVudC5jYW5jZWxlZCgpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb3VjaCBtb3ZlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVG91Y2ggbW92ZSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uVG91Y2hNb3ZlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdGhpcy50b3VjaE1vdmVkID0gdHJ1ZTtcblxuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FuY2VscyBzY3JvbGxpbmcgd2hpbGUgZHJhZ2dpbmdcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHRvdWNoLnBhZ2VYIC0gd2luZG93LnNjcm9sbFgsIHRvdWNoLnBhZ2VZIC0gd2luZG93LnNjcm9sbFkpO1xuXG4gICAgICB2YXIgZHJhZ01vdmVFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ01vdmVTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IHRvdWNoLnBhZ2VYLFxuICAgICAgICBjbGllbnRZOiB0b3VjaC5wYWdlWSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvdWNoIGVuZCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRvdWNoIGVuZCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uVG91Y2hFbmQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB0aGlzLnRvdWNoTW92ZWQgPSBmYWxzZTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzW29uVG91Y2hFbmRdKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpc1tvblRvdWNoRW5kXSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzW29uVG91Y2hNb3ZlXSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpc1tvblNjcm9sbF0pO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50Q29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIG9uQ29udGV4dE1lbnUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2Nyb2xsYWJsZVBhcmVudCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JvbGxhYmxlUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXNbb25TY3JvbGxdKTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGFwVGltZW91dCk7XG5cbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5wYWdlWCAtIHdpbmRvdy5zY3JvbGxYLCB0b3VjaC5wYWdlWSAtIHdpbmRvdy5zY3JvbGxZKTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIGRyYWdTdG9wRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdTdG9wU2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgY2xpZW50WTogdG91Y2gucGFnZVksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5jdXJyZW50Q29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgaGFuZGxlciwgY2FuY2VsIHBvdGVudGlhbCBkcmFnIGFuZCBhbGxvdyBzY3JvbGwgb24gaU9TIG9yIG90aGVyIHRvdWNoIGRldmljZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uU2Nyb2xsLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRhcFRpbWVvdXQpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG91Y2hTZW5zb3I7XG59KF9TZW5zb3IzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUb3VjaFNlbnNvcjtcblxuXG5mdW5jdGlvbiBvbkNvbnRleHRNZW51KGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xufVxuXG4vKioqLyB9KSxcbi8qIDExMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0RyYWdTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExNCk7XG5cbnZhciBfRHJhZ1NlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EcmFnU2Vuc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0RyYWdTZW5zb3IyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTE0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cbnZhciBfU2Vuc29yMiA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgX1NlbnNvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZW5zb3IyKTtcblxudmFyIF9TZW5zb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb25Nb3VzZURvd24gPSBTeW1ib2woJ29uTW91c2VEb3duJyk7XG52YXIgb25Nb3VzZVVwID0gU3ltYm9sKCdvbk1vdXNlVXAnKTtcbnZhciBvbkRyYWdTdGFydCA9IFN5bWJvbCgnb25EcmFnU3RhcnQnKTtcbnZhciBvbkRyYWdPdmVyID0gU3ltYm9sKCdvbkRyYWdPdmVyJyk7XG52YXIgb25EcmFnRW5kID0gU3ltYm9sKCdvbkRyYWdFbmQnKTtcbnZhciBvbkRyb3AgPSBTeW1ib2woJ29uRHJvcCcpO1xudmFyIHJlc2V0ID0gU3ltYm9sKCdyZXNldCcpO1xuXG4vKipcbiAqIFRoaXMgc2Vuc29yIHBpY2tzIHVwIG5hdGl2ZSBicm93c2VyIGRyYWcgZXZlbnRzIGFuZCBkaWN0YXRlcyBkcmFnIG9wZXJhdGlvbnNcbiAqIEBjbGFzcyBEcmFnU2Vuc29yXG4gKiBAbW9kdWxlIERyYWdTZW5zb3JcbiAqIEBleHRlbmRzIFNlbnNvclxuICovXG5cbnZhciBEcmFnU2Vuc29yID0gZnVuY3Rpb24gKF9TZW5zb3IpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ1NlbnNvciwgX1NlbnNvcik7XG5cbiAgLyoqXG4gICAqIERyYWdTZW5zb3IgY29uc3RydWN0b3IuXG4gICAqIEBjb25zdHJ1Y3RzIERyYWdTZW5zb3JcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gQ29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIERyYWdTZW5zb3IoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU2Vuc29yKTtcblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGRvd24gdGltZXIgd2hpY2ggd2lsbCBlbmQgdXAgc2V0dGluZyB0aGUgZHJhZ2dhYmxlIGF0dHJpYnV0ZSwgdW5sZXNzIGNhbmNlbGVkXG4gICAgICogQHByb3BlcnR5IG1vdXNlRG93blRpbWVvdXRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5tb3VzZURvd25UaW1lb3V0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBlbGVtZW50IG5lZWRzIHRvIGJlIHJlbWVtYmVyZWQgdG8gdW5zZXQgdGhlIGRyYWdnYWJsZSBhdHRyaWJ1dGUgYWZ0ZXIgZHJhZyBvcGVyYXRpb24gaGFzIGNvbXBsZXRlZFxuICAgICAqIEBwcm9wZXJ0eSBkcmFnZ2FibGVFbGVtZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIF90aGlzLmRyYWdnYWJsZUVsZW1lbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogTmF0aXZlIGRyYWdnYWJsZSBlbGVtZW50IGNvdWxkIGJlIGxpbmtzIG9yIGltYWdlcywgdGhlaXIgZHJhZ2dhYmxlIHN0YXRlIHdpbGwgYmUgZGlzYWJsZWQgZHVyaW5nIGRyYWcgb3BlcmF0aW9uXG4gICAgICogQHByb3BlcnR5IG5hdGl2ZURyYWdnYWJsZUVsZW1lbnRcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgX3RoaXMubmF0aXZlRHJhZ2dhYmxlRWxlbWVudCA9IG51bGw7XG5cbiAgICBfdGhpc1tvbk1vdXNlRG93bl0gPSBfdGhpc1tvbk1vdXNlRG93bl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZVVwXSA9IF90aGlzW29uTW91c2VVcF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnU3RhcnRdID0gX3RoaXNbb25EcmFnU3RhcnRdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ092ZXJdID0gX3RoaXNbb25EcmFnT3Zlcl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnRW5kXSA9IF90aGlzW29uRHJhZ0VuZF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Ecm9wXSA9IF90aGlzW29uRHJvcF0uYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBET01cbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnU2Vuc29yLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXNbb25Nb3VzZURvd25dLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0YXJ0IGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRHJhZyBzdGFydCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIC8vIE5lZWQgZm9yIGZpcmVmb3guIFwidGV4dFwiIGtleSBpcyBuZWVkZWQgZm9yIElFXG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICcnKTtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gdGhpcy5vcHRpb25zLnR5cGU7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdGhpcy5jdXJyZW50Q29udGFpbmVyID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC50YXJnZXQsIHRoaXMuY29udGFpbmVycyk7XG5cbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRyYWdTdGFydEV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnU3RhcnRTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IHRoaXMuY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXb3JrYXJvdW5kXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoX3RoaXMyLmN1cnJlbnRDb250YWluZXIsIGRyYWdTdGFydEV2ZW50KTtcblxuICAgICAgICBpZiAoZHJhZ1N0YXJ0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICAgIF90aGlzMi5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzMi5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgb3ZlciBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERyYWcgb3ZlciBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ092ZXIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmN1cnJlbnRDb250YWluZXI7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnTW92ZVNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihjb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuXG4gICAgICBpZiAoIWRyYWdNb3ZlRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IHRoaXMub3B0aW9ucy50eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgZW5kIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRHJhZyBlbmQgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdFbmQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpc1tvbk1vdXNlVXBdLCB0cnVlKTtcblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jdXJyZW50Q29udGFpbmVyO1xuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoY29udGFpbmVyLCBkcmFnU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICB0aGlzW3Jlc2V0XSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyb3AgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBEcm9wIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Ecm9wLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGRvd24gaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBkb3duIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZURvd24sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgLy8gRmlyZWZveCBidWcgZm9yIGlucHV0cyB3aXRoaW4gZHJhZ2dhYmxlcyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03MzkwNzFcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgKGV2ZW50LnRhcmdldC5mb3JtIHx8IGV2ZW50LnRhcmdldC5jb250ZW50ZWRpdGFibGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG5hdGl2ZURyYWdnYWJsZUVsZW1lbnQgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGV2ZW50LnRhcmdldCwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZHJhZ2dhYmxlO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChuYXRpdmVEcmFnZ2FibGVFbGVtZW50KSB7XG4gICAgICAgIG5hdGl2ZURyYWdnYWJsZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmF0aXZlRHJhZ2dhYmxlRWxlbWVudCA9IG5hdGl2ZURyYWdnYWJsZUVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0sIHRydWUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpc1tvbkRyYWdTdGFydF0sIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpc1tvbkRyYWdPdmVyXSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXNbb25EcmFnRW5kXSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXNbb25Ecm9wXSwgZmFsc2UpO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gKDAsIF91dGlscy5jbG9zZXN0KShldmVudC50YXJnZXQsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpO1xuXG4gICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMubW91c2VEb3duVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0YXJnZXQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMzLmRyYWdnYWJsZUVsZW1lbnQgPSB0YXJnZXQ7XG4gICAgICB9LCB0aGlzLm9wdGlvbnMuZGVsYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIHVwIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgdXAgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlVXAsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgdGhpc1tyZXNldF0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSB1cCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIHVwIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogcmVzZXQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubW91c2VEb3duVGltZW91dCk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0sIHRydWUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpc1tvbkRyYWdTdGFydF0sIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpc1tvbkRyYWdPdmVyXSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXNbb25EcmFnRW5kXSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXNbb25Ecm9wXSwgZmFsc2UpO1xuXG4gICAgICBpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMubmF0aXZlRHJhZ2dhYmxlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5hdGl2ZURyYWdnYWJsZUVsZW1lbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlRWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVFbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdTZW5zb3I7XG59KF9TZW5zb3IzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcmFnU2Vuc29yO1xuXG4vKioqLyB9KSxcbi8qIDExNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0ZvcmNlVG91Y2hTZW5zb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExNik7XG5cbnZhciBfRm9yY2VUb3VjaFNlbnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Gb3JjZVRvdWNoU2Vuc29yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0ZvcmNlVG91Y2hTZW5zb3IyLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX1NlbnNvcjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIF9TZW5zb3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Vuc29yMik7XG5cbnZhciBfU2Vuc29yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uTW91c2VGb3JjZVdpbGxCZWdpbiA9IFN5bWJvbCgnb25Nb3VzZUZvcmNlV2lsbEJlZ2luJyk7XG52YXIgb25Nb3VzZUZvcmNlRG93biA9IFN5bWJvbCgnb25Nb3VzZUZvcmNlRG93bicpO1xudmFyIG9uTW91c2VEb3duID0gU3ltYm9sKCdvbk1vdXNlRG93bicpO1xudmFyIG9uTW91c2VGb3JjZUNoYW5nZSA9IFN5bWJvbCgnb25Nb3VzZUZvcmNlQ2hhbmdlJyk7XG52YXIgb25Nb3VzZU1vdmUgPSBTeW1ib2woJ29uTW91c2VNb3ZlJyk7XG52YXIgb25Nb3VzZVVwID0gU3ltYm9sKCdvbk1vdXNlVXAnKTtcbnZhciBvbk1vdXNlRm9yY2VHbG9iYWxDaGFuZ2UgPSBTeW1ib2woJ29uTW91c2VGb3JjZUdsb2JhbENoYW5nZScpO1xuXG4vKipcbiAqIFRoaXMgc2Vuc29yIHBpY2tzIHVwIG5hdGl2ZSBmb3JjZSB0b3VjaCBldmVudHMgYW5kIGRpY3RhdGVzIGRyYWcgb3BlcmF0aW9uc1xuICogQGNsYXNzIEZvcmNlVG91Y2hTZW5zb3JcbiAqIEBtb2R1bGUgRm9yY2VUb3VjaFNlbnNvclxuICogQGV4dGVuZHMgU2Vuc29yXG4gKi9cblxudmFyIEZvcmNlVG91Y2hTZW5zb3IgPSBmdW5jdGlvbiAoX1NlbnNvcikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShGb3JjZVRvdWNoU2Vuc29yLCBfU2Vuc29yKTtcblxuICAvKipcbiAgICogRm9yY2VUb3VjaFNlbnNvciBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgRm9yY2VUb3VjaFNlbnNvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W118Tm9kZUxpc3R8SFRNTEVsZW1lbnR9IGNvbnRhaW5lcnMgLSBDb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gRm9yY2VUb3VjaFNlbnNvcigpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEZvcmNlVG91Y2hTZW5zb3IpO1xuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGVsZW1lbnQgbmVlZHMgdG8gYmUgcmVtZW1iZXJlZCB0byB1bnNldCB0aGUgZHJhZ2dhYmxlIGF0dHJpYnV0ZSBhZnRlciBkcmFnIG9wZXJhdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICogQHByb3BlcnR5IG1pZ2h0RHJhZ1xuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKEZvcmNlVG91Y2hTZW5zb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihGb3JjZVRvdWNoU2Vuc29yKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5taWdodERyYWcgPSBmYWxzZTtcblxuICAgIF90aGlzW29uTW91c2VGb3JjZVdpbGxCZWdpbl0gPSBfdGhpc1tvbk1vdXNlRm9yY2VXaWxsQmVnaW5dLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VGb3JjZURvd25dID0gX3RoaXNbb25Nb3VzZUZvcmNlRG93bl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25Nb3VzZURvd25dID0gX3RoaXNbb25Nb3VzZURvd25dLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VGb3JjZUNoYW5nZV0gPSBfdGhpc1tvbk1vdXNlRm9yY2VDaGFuZ2VdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uTW91c2VNb3ZlXSA9IF90aGlzW29uTW91c2VNb3ZlXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbk1vdXNlVXBdID0gX3RoaXNbb25Nb3VzZVVwXS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEZvcmNlVG91Y2hTZW5zb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZXdpbGxiZWdpbicsIHRoaXNbb25Nb3VzZUZvcmNlV2lsbEJlZ2luXSwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlZG93bicsIHRoaXNbb25Nb3VzZUZvcmNlRG93bl0sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpc1tvbk1vdXNlRG93bl0sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlY2hhbmdlZCcsIHRoaXNbb25Nb3VzZUZvcmNlQ2hhbmdlXSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpc1tvbk1vdXNlTW92ZV0pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXNbb25Nb3VzZVVwXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMuY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0bW91c2Vmb3JjZXdpbGxiZWdpbicsIHRoaXNbb25Nb3VzZUZvcmNlV2lsbEJlZ2luXSwgZmFsc2UpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlZG93bicsIHRoaXNbb25Nb3VzZUZvcmNlRG93bl0sIGZhbHNlKTtcbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpc1tvbk1vdXNlRG93bl0sIHRydWUpO1xuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRtb3VzZWZvcmNlY2hhbmdlZCcsIHRoaXNbb25Nb3VzZUZvcmNlQ2hhbmdlXSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXNbb25Nb3VzZU1vdmVdKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzW29uTW91c2VVcF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGZvcmNlIHdpbGwgYmVnaW4gaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBmb3JjZSB3aWxsIGJlZ2luIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZUZvcmNlV2lsbEJlZ2luLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMubWlnaHREcmFnID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBmb3JjZSBkb3duIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZm9yY2UgZG93biBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VGb3JjZURvd24sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgdmFyIGNvbnRhaW5lciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnU3RhcnRFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0YXJ0U2Vuc29yRXZlbnQoe1xuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1N0YXJ0RXZlbnQpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gIWRyYWdTdGFydEV2ZW50LmNhbmNlbGVkKCk7XG4gICAgICB0aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIHVwIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgdXAgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbk1vdXNlVXAsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfU2Vuc29yRXZlbnQuRHJhZ1N0b3BTZW5zb3JFdmVudCh7XG4gICAgICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXG4gICAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmN1cnJlbnRDb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuY3VycmVudENvbnRhaW5lciwgZHJhZ1N0b3BFdmVudCk7XG5cbiAgICAgIHRoaXMuY3VycmVudENvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLm1pZ2h0RHJhZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGRvd24gaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBkb3duIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZURvd24sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMubWlnaHREcmFnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTmVlZCB3b3JrYXJvdW5kIGZvciByZWFsIGNsaWNrXG4gICAgICAvLyBDYW5jZWwgcG90ZW50aWFsIGRyYWcgZXZlbnRzXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZSBtb3ZlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gTW91c2UgZm9yY2Ugd2lsbCBiZWdpbiBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VNb3ZlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnTW92ZVNlbnNvckV2ZW50KHtcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdNb3ZlRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGZvcmNlIGNoYW5nZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIE1vdXNlIGZvcmNlIGNoYW5nZSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uTW91c2VGb3JjZUNoYW5nZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIHZhciBjb250YWluZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICB2YXIgZHJhZ1ByZXNzdXJlRXZlbnQgPSBuZXcgX1NlbnNvckV2ZW50LkRyYWdQcmVzc3VyZVNlbnNvckV2ZW50KHtcbiAgICAgICAgcHJlc3N1cmU6IGV2ZW50LndlYmtpdEZvcmNlLFxuICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGNvbnRhaW5lciwgZHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlIGZvcmNlIGdsb2JhbCBjaGFuZ2UgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBNb3VzZSBmb3JjZSBnbG9iYWwgY2hhbmdlIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25Nb3VzZUZvcmNlR2xvYmFsQ2hhbmdlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgdmFyIGRyYWdQcmVzc3VyZUV2ZW50ID0gbmV3IF9TZW5zb3JFdmVudC5EcmFnUHJlc3N1cmVTZW5zb3JFdmVudCh7XG4gICAgICAgIHByZXNzdXJlOiBldmVudC53ZWJraXRGb3JjZSxcbiAgICAgICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jdXJyZW50Q29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmN1cnJlbnRDb250YWluZXIsIGRyYWdQcmVzc3VyZUV2ZW50KTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEZvcmNlVG91Y2hTZW5zb3I7XG59KF9TZW5zb3IzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGb3JjZVRvdWNoU2Vuc29yO1xuXG4vKioqLyB9KSxcbi8qIDExNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Td2FwQW5pbWF0aW9uID0gZXhwb3J0cy5TbmFwcGFibGUgPSBleHBvcnRzLkNvbGxpZGFibGUgPSB1bmRlZmluZWQ7XG5cbnZhciBfQ29sbGlkYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTE4KTtcblxudmFyIF9Db2xsaWRhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbGxpZGFibGUpO1xuXG52YXIgX1NuYXBwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTIyKTtcblxudmFyIF9TbmFwcGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU25hcHBhYmxlKTtcblxudmFyIF9Td2FwQW5pbWF0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjYpO1xuXG52YXIgX1N3YXBBbmltYXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3dhcEFuaW1hdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuQ29sbGlkYWJsZSA9IF9Db2xsaWRhYmxlMi5kZWZhdWx0O1xuZXhwb3J0cy5TbmFwcGFibGUgPSBfU25hcHBhYmxlMi5kZWZhdWx0O1xuZXhwb3J0cy5Td2FwQW5pbWF0aW9uID0gX1N3YXBBbmltYXRpb24yLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTE4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQ29sbGlkYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTE5KTtcblxudmFyIF9Db2xsaWRhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbGxpZGFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQ29sbGlkYWJsZTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMTkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cbnZhciBfQ29sbGlkYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjApO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgQ29sbGlkYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29sbGlkYWJsZShkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBDb2xsaWRhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuXG4gICAgdGhpcy5fb25EcmFnTW92ZSA9IHRoaXMuX29uRHJhZ01vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdTdG9wID0gdGhpcy5fb25EcmFnU3RvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gdGhpcy5fb25SZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZCh0aGlzKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKENvbGxpZGFibGUsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24oJ2RyYWc6bW92ZScsIHRoaXMuX29uRHJhZ01vdmUpO1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24oJ2RyYWc6c3RvcCcsIHRoaXMuX29uRHJhZ1N0b3ApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzptb3ZlJywgdGhpcy5fb25EcmFnTW92ZSk7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ2RyYWc6c3RvcCcsIHRoaXMuX29uRHJhZ1N0b3ApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIHZhciB0YXJnZXQgPSBldmVudC5zZW5zb3JFdmVudC50YXJnZXQ7XG5cbiAgICAgIHRoaXMuY3VycmVudEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX29uUmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRhcmdldCkpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50KSB7XG4gICAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29sbGlkYWJsZUluRXZlbnQgPSBuZXcgX0NvbGxpZGFibGVFdmVudC5Db2xsaWRhYmxlSW5FdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGNvbGxpZGluZ0VsZW1lbnQ6IHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBjb2xsaWRhYmxlT3V0RXZlbnQgPSBuZXcgX0NvbGxpZGFibGVFdmVudC5Db2xsaWRhYmxlT3V0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBjb2xsaWRpbmdFbGVtZW50OiB0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50XG4gICAgICB9KTtcblxuICAgICAgdmFyIGVudGVyaW5nQ29sbGlkYWJsZSA9IEJvb2xlYW4odGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50ICYmIHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQgIT09IHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCk7XG4gICAgICB2YXIgbGVhdmluZ0NvbGxpZGFibGUgPSBCb29sZWFuKCF0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQgJiYgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCk7XG5cbiAgICAgIGlmIChlbnRlcmluZ0NvbGxpZGFibGUpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdENvbGxpZGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyKGNvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyKGNvbGxpZGFibGVJbkV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAobGVhdmluZ0NvbGxpZGFibGUpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlcihjb2xsaWRhYmxlT3V0RXZlbnQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50ID0gdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdTdG9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0b3AoZXZlbnQpIHtcbiAgICAgIHZhciBsYXN0Q29sbGlkaW5nRWxlbWVudCA9IHRoaXMuY3VycmVudGx5Q29sbGlkaW5nRWxlbWVudCB8fCB0aGlzLmxhc3RDb2xsaWRpbmdFbGVtZW50O1xuICAgICAgdmFyIGNvbGxpZGFibGVPdXRFdmVudCA9IG5ldyBfQ29sbGlkYWJsZUV2ZW50LkNvbGxpZGFibGVPdXRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGNvbGxpZGluZ0VsZW1lbnQ6IGxhc3RDb2xsaWRpbmdFbGVtZW50XG4gICAgICB9KTtcblxuICAgICAgaWYgKGxhc3RDb2xsaWRpbmdFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlLnRyaWdnZXIoY29sbGlkYWJsZU91dEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0Q29sbGlkaW5nRWxlbWVudCA9IG51bGw7XG4gICAgICB0aGlzLmN1cnJlbnRseUNvbGxpZGluZ0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblJlcXVlc3RBbmltYXRpb25GcmFtZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblJlcXVlc3RBbmltYXRpb25GcmFtZSh0YXJnZXQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsaWRhYmxlcyA9IF90aGlzLl9nZXRDb2xsaWRhYmxlcygpO1xuICAgICAgICBfdGhpcy5jdXJyZW50bHlDb2xsaWRpbmdFbGVtZW50ID0gKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGxpZGFibGVzLmluY2x1ZGVzKGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldENvbGxpZGFibGVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldENvbGxpZGFibGVzKCkge1xuICAgICAgdmFyIGNvbGxpZGFibGVzID0gdGhpcy5kcmFnZ2FibGUub3B0aW9ucy5jb2xsaWRhYmxlcztcblxuICAgICAgaWYgKHR5cGVvZiBjb2xsaWRhYmxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29sbGlkYWJsZXMpKTtcbiAgICAgIH0gZWxzZSBpZiAoY29sbGlkYWJsZXMgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBjb2xsaWRhYmxlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjb2xsaWRhYmxlcyk7XG4gICAgICB9IGVsc2UgaWYgKGNvbGxpZGFibGVzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIFtjb2xsaWRhYmxlc107XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb2xsaWRhYmxlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gY29sbGlkYWJsZXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbGxpZGFibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbGxpZGFibGU7XG5cbi8qKiovIH0pLFxuLyogMTIwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQ29sbGlkYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjEpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0NvbGxpZGFibGVJbkV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0NvbGxpZGFibGVFdmVudC5Db2xsaWRhYmxlSW5FdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0NvbGxpZGFibGVPdXRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Db2xsaWRhYmxlRXZlbnQuQ29sbGlkYWJsZU91dEV2ZW50O1xuICB9XG59KTtcblxuLyoqKi8gfSksXG4vKiAxMjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQ29sbGlkYWJsZU91dEV2ZW50ID0gZXhwb3J0cy5Db2xsaWRhYmxlSW5FdmVudCA9IGV4cG9ydHMuQ29sbGlkYWJsZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBjb2xsaWRhYmxlIGV2ZW50XG4gKiBAY2xhc3MgQ29sbGlkYWJsZUV2ZW50XG4gKiBAbW9kdWxlIENvbGxpZGFibGVFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgQ29sbGlkYWJsZUV2ZW50ID0gZXhwb3J0cy5Db2xsaWRhYmxlRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoQ29sbGlkYWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gQ29sbGlkYWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIENvbGxpZGFibGVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKENvbGxpZGFibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbGxpZGFibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ29sbGlkYWJsZUV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdFdmVudCcsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWcgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhpcyBjb2xsaWFibGUgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgZHJhZ0V2ZW50XG4gICAgICogQHR5cGUge0RyYWdFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29sbGlkYWJsZUV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogQ29sbGlkYWJsZSBpbiBldmVudFxuICogQGNsYXNzIENvbGxpZGFibGVJbkV2ZW50XG4gKiBAbW9kdWxlIENvbGxpZGFibGVJbkV2ZW50XG4gKiBAZXh0ZW5kcyBDb2xsaWRhYmxlRXZlbnRcbiAqL1xuXG5cbkNvbGxpZGFibGVFdmVudC50eXBlID0gJ2NvbGxpZGFibGUnO1xuXG52YXIgQ29sbGlkYWJsZUluRXZlbnQgPSBleHBvcnRzLkNvbGxpZGFibGVJbkV2ZW50ID0gZnVuY3Rpb24gKF9Db2xsaWRhYmxlRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoQ29sbGlkYWJsZUluRXZlbnQsIF9Db2xsaWRhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIENvbGxpZGFibGVJbkV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIENvbGxpZGFibGVJbkV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoQ29sbGlkYWJsZUluRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsaWRhYmxlSW5FdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ29sbGlkYWJsZUluRXZlbnQsIFt7XG4gICAga2V5OiAnY29sbGlkaW5nRWxlbWVudCcsXG5cblxuICAgIC8qKlxuICAgICAqIEVsZW1lbnQgeW91IGFyZSBjdXJyZW50bHkgY29sbGlkaW5nIHdpdGhcbiAgICAgKiBAcHJvcGVydHkgY29sbGlkaW5nRWxlbWVudFxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY29sbGlkaW5nRWxlbWVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbGxpZGFibGVJbkV2ZW50O1xufShDb2xsaWRhYmxlRXZlbnQpO1xuXG4vKipcbiAqIENvbGxpZGFibGUgb3V0IGV2ZW50XG4gKiBAY2xhc3MgQ29sbGlkYWJsZU91dEV2ZW50XG4gKiBAbW9kdWxlIENvbGxpZGFibGVPdXRFdmVudFxuICogQGV4dGVuZHMgQ29sbGlkYWJsZUV2ZW50XG4gKi9cblxuXG5Db2xsaWRhYmxlSW5FdmVudC50eXBlID0gJ2NvbGxpZGFibGU6aW4nO1xuXG52YXIgQ29sbGlkYWJsZU91dEV2ZW50ID0gZXhwb3J0cy5Db2xsaWRhYmxlT3V0RXZlbnQgPSBmdW5jdGlvbiAoX0NvbGxpZGFibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoQ29sbGlkYWJsZU91dEV2ZW50LCBfQ29sbGlkYWJsZUV2ZW50Mik7XG5cbiAgZnVuY3Rpb24gQ29sbGlkYWJsZU91dEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIENvbGxpZGFibGVPdXRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKENvbGxpZGFibGVPdXRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbGxpZGFibGVPdXRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoQ29sbGlkYWJsZU91dEV2ZW50LCBbe1xuICAgIGtleTogJ2NvbGxpZGluZ0VsZW1lbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBFbGVtZW50IHlvdSB3ZXJlIHByZXZpb3VzbHkgY29sbGlkaW5nIHdpdGhcbiAgICAgKiBAcHJvcGVydHkgY29sbGlkaW5nRWxlbWVudFxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuY29sbGlkaW5nRWxlbWVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbGxpZGFibGVPdXRFdmVudDtcbn0oQ29sbGlkYWJsZUV2ZW50KTtcblxuQ29sbGlkYWJsZU91dEV2ZW50LnR5cGUgPSAnY29sbGlkYWJsZTpvdXQnO1xuXG4vKioqLyB9KSxcbi8qIDEyMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1NuYXBwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTIzKTtcblxudmFyIF9TbmFwcGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU25hcHBhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1NuYXBwYWJsZTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMjMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX1NuYXBwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU25hcHBhYmxlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTbmFwcGFibGUoZHJhZ2dhYmxlKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU25hcHBhYmxlKTtcblxuICAgIHRoaXMuZHJhZ2dhYmxlID0gZHJhZ2dhYmxlO1xuXG4gICAgdGhpcy5fb25EcmFnU3RhcnQgPSB0aGlzLl9vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJhZ1N0b3AgPSB0aGlzLl9vbkRyYWdTdG9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25EcmFnT3ZlciA9IHRoaXMuX29uRHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRyYWdPdXQgPSB0aGlzLl9vbkRyYWdPdXQuYmluZCh0aGlzKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNuYXBwYWJsZSwgW3tcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vbignZHJhZzpzdG9wJywgdGhpcy5fb25EcmFnU3RvcCkub24oJ2RyYWc6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9uKCdkcmFnOm91dCcsIHRoaXMuX29uRHJhZ091dCkub24oJ2Ryb3BwYWJsZTpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub24oJ2Ryb3BwYWJsZTpvdXQnLCB0aGlzLl9vbkRyYWdPdXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignZHJhZzpzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KS5vZmYoJ2RyYWc6c3RvcCcsIHRoaXMuX29uRHJhZ1N0b3ApLm9mZignZHJhZzpvdmVyJywgdGhpcy5fb25EcmFnT3Zlcikub2ZmKCdkcmFnOm91dCcsIHRoaXMuX29uRHJhZ091dCkub2ZmKCdkcm9wcGFibGU6b3ZlcicsIHRoaXMuX29uRHJhZ092ZXIpLm9mZignZHJvcHBhYmxlOm91dCcsIHRoaXMuX29uRHJhZ091dCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlyc3RTb3VyY2UgPSBldmVudC5zb3VyY2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uRHJhZ1N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25EcmFnU3RvcCgpIHtcbiAgICAgIHRoaXMuZmlyc3RTb3VyY2UgPSBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbkRyYWdPdmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGlmIChldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNvdXJjZSA9IGV2ZW50LnNvdXJjZSB8fCBldmVudC5kcmFnRXZlbnQuc291cmNlO1xuICAgICAgdmFyIG1pcnJvciA9IGV2ZW50Lm1pcnJvciB8fCBldmVudC5kcmFnRXZlbnQubWlycm9yO1xuXG4gICAgICBpZiAoc291cmNlID09PSB0aGlzLmZpcnN0U291cmNlKSB7XG4gICAgICAgIHRoaXMuZmlyc3RTb3VyY2UgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzbmFwSW5FdmVudCA9IG5ldyBfU25hcHBhYmxlRXZlbnQuU25hcEluRXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmFnZ2FibGUudHJpZ2dlcihzbmFwSW5FdmVudCk7XG5cbiAgICAgIGlmIChzbmFwSW5FdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG1pcnJvcikge1xuICAgICAgICBtaXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cblxuICAgICAgc291cmNlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kcmFnZ2FibGUuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgICBzb3VyY2UuY2xhc3NMaXN0LmFkZCh0aGlzLmRyYWdnYWJsZS5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpwbGFjZWQnKSk7XG5cbiAgICAgIC8vIE5lZWQgdG8gY2FuY2VsIHRoaXMgaW4gZHJhZyBvdXRcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzb3VyY2UuY2xhc3NMaXN0LnJlbW92ZShfdGhpcy5kcmFnZ2FibGUuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6cGxhY2VkJykpO1xuICAgICAgfSwgdGhpcy5kcmFnZ2FibGUub3B0aW9ucy5wbGFjZWRUaW1lb3V0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25EcmFnT3V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uRHJhZ091dChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWlycm9yID0gZXZlbnQubWlycm9yIHx8IGV2ZW50LmRyYWdFdmVudC5taXJyb3I7XG4gICAgICB2YXIgc291cmNlID0gZXZlbnQuc291cmNlIHx8IGV2ZW50LmRyYWdFdmVudC5zb3VyY2U7XG5cbiAgICAgIHZhciBzbmFwT3V0RXZlbnQgPSBuZXcgX1NuYXBwYWJsZUV2ZW50LlNuYXBPdXRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRyYWdnYWJsZS50cmlnZ2VyKHNuYXBPdXRFdmVudCk7XG5cbiAgICAgIGlmIChzbmFwT3V0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChtaXJyb3IpIHtcbiAgICAgICAgbWlycm9yLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgIH1cblxuICAgICAgc291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5kcmFnZ2FibGUuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTbmFwcGFibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNuYXBwYWJsZTtcblxuLyoqKi8gfSksXG4vKiAxMjQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9TbmFwcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTI1KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTbmFwSW5FdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TbmFwcGFibGVFdmVudC5TbmFwSW5FdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NuYXBPdXRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TbmFwcGFibGVFdmVudC5TbmFwT3V0RXZlbnQ7XG4gIH1cbn0pO1xuXG4vKioqLyB9KSxcbi8qIDEyNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5TbmFwT3V0RXZlbnQgPSBleHBvcnRzLlNuYXBJbkV2ZW50ID0gZXhwb3J0cy5TbmFwRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIHNuYXAgZXZlbnRcbiAqIEBjbGFzcyBTbmFwRXZlbnRcbiAqIEBtb2R1bGUgU25hcEV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBTbmFwRXZlbnQgPSBleHBvcnRzLlNuYXBFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTbmFwRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBTbmFwRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU25hcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU25hcEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU25hcEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTbmFwRXZlbnQsIFt7XG4gICAga2V5OiAnZHJhZ0V2ZW50JyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZyBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGlzIHNuYXAgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgZHJhZ0V2ZW50XG4gICAgICogQHR5cGUge0RyYWdFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU25hcEV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogU25hcCBpbiBldmVudFxuICogQGNsYXNzIFNuYXBJbkV2ZW50XG4gKiBAbW9kdWxlIFNuYXBJbkV2ZW50XG4gKiBAZXh0ZW5kcyBTbmFwRXZlbnRcbiAqL1xuXG5cblNuYXBFdmVudC50eXBlID0gJ3NuYXAnO1xuXG52YXIgU25hcEluRXZlbnQgPSBleHBvcnRzLlNuYXBJbkV2ZW50ID0gZnVuY3Rpb24gKF9TbmFwRXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU25hcEluRXZlbnQsIF9TbmFwRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFNuYXBJbkV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNuYXBJbkV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU25hcEluRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTbmFwSW5FdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIFNuYXBJbkV2ZW50O1xufShTbmFwRXZlbnQpO1xuXG4vKipcbiAqIFNuYXAgb3V0IGV2ZW50XG4gKiBAY2xhc3MgU25hcE91dEV2ZW50XG4gKiBAbW9kdWxlIFNuYXBPdXRFdmVudFxuICogQGV4dGVuZHMgU25hcEV2ZW50XG4gKi9cblxuXG5TbmFwSW5FdmVudC50eXBlID0gJ3NuYXA6aW4nO1xuU25hcEluRXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBTbmFwT3V0RXZlbnQgPSBleHBvcnRzLlNuYXBPdXRFdmVudCA9IGZ1bmN0aW9uIChfU25hcEV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTbmFwT3V0RXZlbnQsIF9TbmFwRXZlbnQyKTtcblxuICBmdW5jdGlvbiBTbmFwT3V0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU25hcE91dEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU25hcE91dEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU25hcE91dEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gU25hcE91dEV2ZW50O1xufShTbmFwRXZlbnQpO1xuXG5TbmFwT3V0RXZlbnQudHlwZSA9ICdzbmFwOm91dCc7XG5TbmFwT3V0RXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbi8qKiovIH0pLFxuLyogMTI2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHRTd2FwQW5pbWF0aW9uT3B0aW9ucyA9IHVuZGVmaW5lZDtcblxudmFyIF9Td2FwQW5pbWF0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMjcpO1xuXG52YXIgX1N3YXBBbmltYXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3dhcEFuaW1hdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Td2FwQW5pbWF0aW9uMi5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0U3dhcEFuaW1hdGlvbk9wdGlvbnMgPSBfU3dhcEFuaW1hdGlvbi5kZWZhdWx0T3B0aW9ucztcblxuLyoqKi8gfSksXG4vKiAxMjcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdE9wdGlvbnMgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGRlZmF1bHRPcHRpb25zID0gZXhwb3J0cy5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgZHVyYXRpb246IDE1MCxcbiAgZWFzaW5nRnVuY3Rpb246ICdlYXNlLWluLW91dCdcbn07XG5cbnZhciBTd2FwQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTd2FwQW5pbWF0aW9uKGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFN3YXBBbmltYXRpb24pO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgdGhpcy5nZXRPcHRpb25zKCkpO1xuXG4gICAgdGhpcy5vblNvcnRhYmxlU29ydGVkID0gdGhpcy5vblNvcnRhYmxlU29ydGVkLmJpbmQodGhpcyk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTd2FwQW5pbWF0aW9uLCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdzb3J0YWJsZTpzb3J0ZWQnLCB0aGlzLm9uU29ydGFibGVTb3J0ZWQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignc29ydGFibGU6c29ydGVkJywgdGhpcy5vblNvcnRhYmxlU29ydGVkKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvblNvcnRhYmxlU29ydGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25Tb3J0YWJsZVNvcnRlZChfcmVmKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgb2xkSW5kZXggPSBfcmVmLm9sZEluZGV4LFxuICAgICAgICAgIG5ld0luZGV4ID0gX3JlZi5uZXdJbmRleCxcbiAgICAgICAgICBkcmFnRXZlbnQgPSBfcmVmLmRyYWdFdmVudDtcbiAgICAgIHZhciBzb3VyY2UgPSBkcmFnRXZlbnQuc291cmNlLFxuICAgICAgICAgIG92ZXIgPSBkcmFnRXZlbnQub3ZlcjtcblxuXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxhc3RBbmltYXRpb25GcmFtZSk7XG5cbiAgICAgIC8vIENhbiBiZSBkb25lIGluIGEgc2VwYXJhdGUgZnJhbWVcbiAgICAgIHRoaXMubGFzdEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKG9sZEluZGV4ID49IG5ld0luZGV4KSB7XG4gICAgICAgICAgYW5pbWF0ZShzb3VyY2UsIG92ZXIsIF90aGlzLm9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFuaW1hdGUob3Zlciwgc291cmNlLCBfdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0T3B0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGUub3B0aW9ucy5zd2FwQW5pbWF0aW9uIHx8IHt9O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3dhcEFuaW1hdGlvbjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3dhcEFuaW1hdGlvbjtcblxuXG5mdW5jdGlvbiBhbmltYXRlKHRvcCwgYm90dG9tLCBfcmVmMikge1xuICB2YXIgZHVyYXRpb24gPSBfcmVmMi5kdXJhdGlvbixcbiAgICAgIGVhc2luZ0Z1bmN0aW9uID0gX3JlZjIuZWFzaW5nRnVuY3Rpb247XG5cbiAgdmFyIGhlaWdodCA9IHRvcC5vZmZzZXRIZWlnaHQ7XG5cbiAgdmFyIF9hcnIgPSBbdG9wLCBib3R0b21dO1xuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgX2Fyci5sZW5ndGg7IF9pKyspIHtcbiAgICB2YXIgZWxlbWVudCA9IF9hcnJbX2ldO1xuICAgIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgfVxuXG4gIHRvcC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoMCwgJyArIGhlaWdodCArICdweCwgMCknO1xuICBib3R0b20uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKDAsIC0nICsgaGVpZ2h0ICsgJ3B4LCAwKSc7XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX2FycjIgPSBbdG9wLCBib3R0b21dO1xuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgX2FycjIubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIF9lbGVtZW50ID0gX2FycjJbX2kyXTtcbiAgICAgIF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCByZXNldEVsZW1lbnRPblRyYW5zaXRpb25FbmQpO1xuICAgICAgX2VsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gJyArIGR1cmF0aW9uICsgJ21zICcgKyBlYXNpbmdGdW5jdGlvbjtcbiAgICAgIF9lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0RWxlbWVudE9uVHJhbnNpdGlvbkVuZChldmVudCkge1xuICBldmVudC50YXJnZXQuc3R5bGUudHJhbnNpdGlvbiA9ICcnO1xuICBldmVudC50YXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICcnO1xuICBldmVudC50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHJlc2V0RWxlbWVudE9uVHJhbnNpdGlvbkVuZCk7XG59XG5cbi8qKiovIH0pLFxuLyogMTI4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9Db25zdW1hYmxlQXJyYXkyKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cbnZhciBfUGx1Z2lucyA9IF9fd2VicGFja19yZXF1aXJlX18oNTUpO1xuXG52YXIgX1NlbnNvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ1KTtcblxudmFyIF9EcmFnZ2FibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTM0KTtcblxudmFyIF9EcmFnRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzNik7XG5cbnZhciBfTWlycm9yRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzOCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkRyYWdTdGFydCA9IFN5bWJvbCgnb25EcmFnU3RhcnQnKTtcbnZhciBvbkRyYWdNb3ZlID0gU3ltYm9sKCdvbkRyYWdNb3ZlJyk7XG52YXIgb25EcmFnU3RvcCA9IFN5bWJvbCgnb25EcmFnU3RvcCcpO1xudmFyIG9uRHJhZ1ByZXNzdXJlID0gU3ltYm9sKCdvbkRyYWdQcmVzc3VyZScpO1xudmFyIGdldEFwcGVuZGFibGVDb250YWluZXIgPSBTeW1ib2woJ2dldEFwcGVuZGFibGVDb250YWluZXInKTtcblxudmFyIGRlZmF1bHRzID0ge1xuICBkcmFnZ2FibGU6ICcuZHJhZ2dhYmxlLXNvdXJjZScsXG4gIGhhbmRsZTogbnVsbCxcbiAgZGVsYXk6IDEwMCxcbiAgcGxhY2VkVGltZW91dDogODAwLFxuICBwbHVnaW5zOiBbXSxcbiAgc2Vuc29yczogW10sXG4gIGNsYXNzZXM6IHtcbiAgICAnY29udGFpbmVyOmRyYWdnaW5nJzogJ2RyYWdnYWJsZS1jb250YWluZXItLWlzLWRyYWdnaW5nJyxcbiAgICAnc291cmNlOmRyYWdnaW5nJzogJ2RyYWdnYWJsZS1zb3VyY2UtLWlzLWRyYWdnaW5nJyxcbiAgICAnc291cmNlOnBsYWNlZCc6ICdkcmFnZ2FibGUtc291cmNlLS1wbGFjZWQnLFxuICAgICdjb250YWluZXI6cGxhY2VkJzogJ2RyYWdnYWJsZS1jb250YWluZXItLXBsYWNlZCcsXG4gICAgJ2JvZHk6ZHJhZ2dpbmcnOiAnZHJhZ2dhYmxlLS1pcy1kcmFnZ2luZycsXG4gICAgJ2RyYWdnYWJsZTpvdmVyJzogJ2RyYWdnYWJsZS0tb3ZlcicsXG4gICAgJ2NvbnRhaW5lcjpvdmVyJzogJ2RyYWdnYWJsZS1jb250YWluZXItLW92ZXInLFxuICAgIG1pcnJvcjogJ2RyYWdnYWJsZS1taXJyb3InXG4gIH1cbn07XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgY29yZSBkcmFnZ2FibGUgbGlicmFyeSB0aGF0IGRvZXMgdGhlIGhlYXZ5IGxpZnRpbmdcbiAqIEBjbGFzcyBEcmFnZ2FibGVcbiAqIEBtb2R1bGUgRHJhZ2dhYmxlXG4gKi9cblxudmFyIERyYWdnYWJsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogRHJhZ2dhYmxlIGNvbnN0cnVjdG9yLlxuICAgKiBAY29uc3RydWN0cyBEcmFnZ2FibGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gRHJhZ2dhYmxlIGNvbnRhaW5lcnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBkcmFnZ2FibGVcbiAgICovXG4gIGZ1bmN0aW9uIERyYWdnYWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW2RvY3VtZW50LmJvZHldO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnZ2FibGUpO1xuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyc1xuICAgICAqIEBwcm9wZXJ0eSBjb250YWluZXJzXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgaWYgKGNvbnRhaW5lcnMgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBjb250YWluZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuY29udGFpbmVycyA9IFtdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KShjb250YWluZXJzKSk7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXJzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY29udGFpbmVycyA9IFtjb250YWluZXJzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEcmFnZ2FibGUgY29udGFpbmVycyBhcmUgZXhwZWN0ZWQgdG8gYmUgb2YgdHlwZSBgTm9kZUxpc3RgLCBgSFRNTEVsZW1lbnRbXWAgb3IgYEhUTUxFbGVtZW50YCcpO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBkcmFnIHN0YXRlXG4gICAgICogQHByb3BlcnR5IGRyYWdnaW5nXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQWN0aXZlIHBsdWdpbnNcbiAgICAgKiBAcHJvcGVydHkgcGx1Z2luc1xuICAgICAqIEB0eXBlIHtQbHVnaW5bXX1cbiAgICAgKi9cbiAgICB0aGlzLnBsdWdpbnMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEFjdGl2ZSBzZW5zb3JzXG4gICAgICogQHByb3BlcnR5IHNlbnNvcnNcbiAgICAgKiBAdHlwZSB7U2Vuc29yW119XG4gICAgICovXG4gICAgdGhpcy5zZW5zb3JzID0gW107XG5cbiAgICB0aGlzW29uRHJhZ1N0YXJ0XSA9IHRoaXNbb25EcmFnU3RhcnRdLmJpbmQodGhpcyk7XG4gICAgdGhpc1tvbkRyYWdNb3ZlXSA9IHRoaXNbb25EcmFnTW92ZV0uYmluZCh0aGlzKTtcbiAgICB0aGlzW29uRHJhZ1N0b3BdID0gdGhpc1tvbkRyYWdTdG9wXS5iaW5kKHRoaXMpO1xuICAgIHRoaXNbb25EcmFnUHJlc3N1cmVdID0gdGhpc1tvbkRyYWdQcmVzc3VyZV0uYmluZCh0aGlzKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWc6c3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzptb3ZlJywgdGhpc1tvbkRyYWdNb3ZlXSwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpzdG9wJywgdGhpc1tvbkRyYWdTdG9wXSwgdHJ1ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpwcmVzc3VyZScsIHRoaXNbb25EcmFnUHJlc3N1cmVdLCB0cnVlKTtcblxuICAgIHRoaXMuYWRkUGx1Z2luLmFwcGx5KHRoaXMsIFtfUGx1Z2lucy5NaXJyb3IsIF9QbHVnaW5zLkFjY2Vzc2liaWxpdHldLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzLm9wdGlvbnMucGx1Z2lucykpKTtcbiAgICB0aGlzLmFkZFNlbnNvci5hcHBseSh0aGlzLCBbX1NlbnNvcnMuTW91c2VTZW5zb3IsIF9TZW5zb3JzLlRvdWNoU2Vuc29yXS5jb25jYXQoKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5vcHRpb25zLnNlbnNvcnMpKSk7XG5cbiAgICB2YXIgZHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCA9IG5ldyBfRHJhZ2dhYmxlRXZlbnQuRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCh7XG4gICAgICBkcmFnZ2FibGU6IHRoaXNcbiAgICB9KTtcblxuICAgIHRoaXMudHJpZ2dlcihkcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBEcmFnZ2FibGUgaW5zdGFuY2UuIFRoaXMgcmVtb3ZlcyBhbGwgaW50ZXJuYWwgZXZlbnQgbGlzdGVuZXJzIGFuZFxuICAgKiBkZWFjdGl2YXRlcyBzZW5zb3JzIGFuZCBwbHVnaW5zXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJhZ2dhYmxlLCBbe1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZzpzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0LCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWc6bW92ZScsIHRoaXMuZHJhZ01vdmUsIHRydWUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZzpzdG9wJywgdGhpcy5kcmFnU3RvcCwgdHJ1ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnOnByZXNzdXJlJywgdGhpcy5kcmFnUHJlc3N1cmUsIHRydWUpO1xuXG4gICAgICB2YXIgZHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gbmV3IF9EcmFnZ2FibGVFdmVudC5EcmFnZ2FibGVEZXN0cm95RXZlbnQoe1xuICAgICAgICBkcmFnZ2FibGU6IHRoaXNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoZHJhZ2dhYmxlRGVzdHJveUV2ZW50KTtcblxuICAgICAgdGhpcy5yZW1vdmVQbHVnaW4uYXBwbHkodGhpcywgKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5wbHVnaW5zLm1hcChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW4uY29uc3RydWN0b3I7XG4gICAgICB9KSkpO1xuICAgICAgdGhpcy5yZW1vdmVTZW5zb3IuYXBwbHkodGhpcywgKDAsIF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkodGhpcy5zZW5zb3JzLm1hcChmdW5jdGlvbiAoc2Vuc29yKSB7XG4gICAgICAgIHJldHVybiBzZW5zb3IuY29uc3RydWN0b3I7XG4gICAgICB9KSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgcGx1Z2luIHRvIHRoaXMgZHJhZ2dhYmxlIGluc3RhbmNlLiBUaGlzIHdpbGwgZW5kIHVwIGNhbGxpbmcgdGhlIGF0dGFjaCBtZXRob2Qgb2YgdGhlIHBsdWdpblxuICAgICAqIEBwYXJhbSB7Li4udHlwZW9mIFBsdWdpbn0gcGx1Z2lucyAtIFBsdWdpbnMgdGhhdCB5b3Ugd2FudCBhdHRhY2hlZCB0byBkcmFnZ2FibGVcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLmFkZFBsdWdpbihDdXN0b21BMTF5UGx1Z2luLCBDdXN0b21NaXJyb3JQbHVnaW4pXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2FkZFBsdWdpbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFBsdWdpbigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBwbHVnaW5zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHBsdWdpbnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVQbHVnaW5zID0gcGx1Z2lucy5tYXAoZnVuY3Rpb24gKFBsdWdpbikge1xuICAgICAgICByZXR1cm4gbmV3IFBsdWdpbihfdGhpcyk7XG4gICAgICB9KTtcbiAgICAgIGFjdGl2ZVBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW4uYXR0YWNoKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucGx1Z2lucyA9IFtdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzLnBsdWdpbnMpLCAoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KShhY3RpdmVQbHVnaW5zKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHBsdWdpbnMgdGhhdCBhcmUgYWxyZWFkeSBhdHRhY2hlZCB0byB0aGlzIGRyYWdnYWJsZSBpbnN0YW5jZS4gVGhpcyB3aWxsIGVuZCB1cCBjYWxsaW5nXG4gICAgICogdGhlIGRldGFjaCBtZXRob2Qgb2YgdGhlIHBsdWdpblxuICAgICAqIEBwYXJhbSB7Li4udHlwZW9mIFBsdWdpbn0gcGx1Z2lucyAtIFBsdWdpbnMgdGhhdCB5b3Ugd2FudCBkZXRhY2hlZCBmcm9tIGRyYWdnYWJsZVxuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUucmVtb3ZlUGx1Z2luKE1pcnJvclBsdWdpbiwgQ3VzdG9tTWlycm9yUGx1Z2luKVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZW1vdmVQbHVnaW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVQbHVnaW4oKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBsdWdpbnMgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBwbHVnaW5zW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHZhciByZW1vdmVkUGx1Z2lucyA9IHRoaXMucGx1Z2lucy5maWx0ZXIoZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gcGx1Z2lucy5pbmNsdWRlcyhwbHVnaW4uY29uc3RydWN0b3IpO1xuICAgICAgfSk7XG4gICAgICByZW1vdmVkUGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbi5kZXRhY2goKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wbHVnaW5zID0gdGhpcy5wbHVnaW5zLmZpbHRlcihmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiAhcGx1Z2lucy5pbmNsdWRlcyhwbHVnaW4uY29uc3RydWN0b3IpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHNlbnNvcnMgdG8gdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2UuIFRoaXMgd2lsbCBlbmQgdXAgY2FsbGluZyB0aGUgYXR0YWNoIG1ldGhvZCBvZiB0aGUgc2Vuc29yXG4gICAgICogQHBhcmFtIHsuLi50eXBlb2YgU2Vuc29yfSBzZW5zb3JzIC0gU2Vuc29ycyB0aGF0IHlvdSB3YW50IGF0dGFjaGVkIHRvIGRyYWdnYWJsZVxuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUuYWRkU2Vuc29yKEZvcmNlVG91Y2hTZW5zb3IsIEN1c3RvbVNlbnNvcilcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYWRkU2Vuc29yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkU2Vuc29yKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgc2Vuc29ycyA9IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIHNlbnNvcnNbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjdGl2ZVNlbnNvcnMgPSBzZW5zb3JzLm1hcChmdW5jdGlvbiAoU2Vuc29yKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2Vuc29yKF90aGlzMi5jb250YWluZXJzLCBfdGhpczIub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICAgIGFjdGl2ZVNlbnNvcnMuZm9yRWFjaChmdW5jdGlvbiAoc2Vuc29yKSB7XG4gICAgICAgIHJldHVybiBzZW5zb3IuYXR0YWNoKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2Vuc29ycyA9IFtdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzLnNlbnNvcnMpLCAoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KShhY3RpdmVTZW5zb3JzKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHNlbnNvcnMgdGhhdCBhcmUgYWxyZWFkeSBhdHRhY2hlZCB0byB0aGlzIGRyYWdnYWJsZSBpbnN0YW5jZS4gVGhpcyB3aWxsIGVuZCB1cCBjYWxsaW5nXG4gICAgICogdGhlIGRldGFjaCBtZXRob2Qgb2YgdGhlIHNlbnNvclxuICAgICAqIEBwYXJhbSB7Li4udHlwZW9mIFNlbnNvcn0gc2Vuc29ycyAtIFNlbnNvcnMgdGhhdCB5b3Ugd2FudCBhdHRhY2hlZCB0byBkcmFnZ2FibGVcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLnJlbW92ZVNlbnNvcihUb3VjaFNlbnNvciwgRHJhZ1NlbnNvcilcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVtb3ZlU2Vuc29yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlU2Vuc29yKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBzZW5zb3JzID0gQXJyYXkoX2xlbjQpLCBfa2V5NCA9IDA7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgICAgc2Vuc29yc1tfa2V5NF0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVtb3ZlZFNlbnNvcnMgPSB0aGlzLnNlbnNvcnMuZmlsdGVyKGZ1bmN0aW9uIChzZW5zb3IpIHtcbiAgICAgICAgcmV0dXJuIHNlbnNvcnMuaW5jbHVkZXMoc2Vuc29yLmNvbnN0cnVjdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmVtb3ZlZFNlbnNvcnMuZm9yRWFjaChmdW5jdGlvbiAoc2Vuc29yKSB7XG4gICAgICAgIHJldHVybiBzZW5zb3IuZGV0YWNoKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2Vuc29ycyA9IHRoaXMuc2Vuc29ycy5maWx0ZXIoZnVuY3Rpb24gKHNlbnNvcikge1xuICAgICAgICByZXR1cm4gIXNlbnNvcnMuaW5jbHVkZXMoc2Vuc29yLmNvbnN0cnVjdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBjb250YWluZXIgdG8gdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gey4uLkhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gQ29udGFpbmVycyB5b3Ugd2FudCB0byBhZGQgdG8gZHJhZ2dhYmxlXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5hZGRQbHVnaW4oQ3VzdG9tQTExeVBsdWdpbiwgQ3VzdG9tTWlycm9yUGx1Z2luKVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRDb250YWluZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRDb250YWluZXIoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGNvbnRhaW5lcnMgPSBBcnJheShfbGVuNSksIF9rZXk1ID0gMDsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgICBjb250YWluZXJzW19rZXk1XSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGFpbmVycyA9IFtdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzLmNvbnRhaW5lcnMpLCBjb250YWluZXJzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgY29udGFpbmVyIGZyb20gdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gey4uLkhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gQ29udGFpbmVycyB5b3Ugd2FudCB0byByZW1vdmUgZnJvbSBkcmFnZ2FibGVcbiAgICAgKiBAcmV0dXJuIHtEcmFnZ2FibGV9XG4gICAgICogQGV4YW1wbGUgZHJhZ2dhYmxlLnJlbW92ZVBsdWdpbihNaXJyb3JQbHVnaW4sIEN1c3RvbU1pcnJvclBsdWdpbilcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVtb3ZlQ29udGFpbmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlQ29udGFpbmVyKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjYgPSBhcmd1bWVudHMubGVuZ3RoLCBjb250YWluZXJzID0gQXJyYXkoX2xlbjYpLCBfa2V5NiA9IDA7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgICAgY29udGFpbmVyc1tfa2V5Nl0gPSBhcmd1bWVudHNbX2tleTZdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lcnMgPSB0aGlzLmNvbnRhaW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuICFjb250YWluZXJzLmluY2x1ZGVzKGNvbnRhaW5lcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgbGlzdGVuZXIgZm9yIGRyYWdnYWJsZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEV2ZW50IG5hbWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEV2ZW50IGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7RHJhZ2dhYmxlfVxuICAgICAqIEBleGFtcGxlIGRyYWdnYWJsZS5vbignZHJhZzpzdGFydCcsIChkcmFnRXZlbnQpID0+IGRyYWdFdmVudC5jYW5jZWwoKSk7XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICghdGhpcy5jYWxsYmFja3NbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3NbdHlwZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYWxsYmFja3NbdHlwZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGxpc3RlbmVyIGZyb20gZHJhZ2dhYmxlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBFdmVudCBuYW1lXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBFdmVudCBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUub2ZmKCdkcmFnOnN0YXJ0JywgaGFuZGxlckZ1bmN0aW9uKTtcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb2ZmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoIXRoaXMuY2FsbGJhY2tzW3R5cGVdKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgdmFyIGNvcHkgPSB0aGlzLmNhbGxiYWNrc1t0eXBlXS5zbGljZSgwKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29weS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2FsbGJhY2sgPT09IGNvcHlbaV0pIHtcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrc1t0eXBlXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGRyYWdnYWJsZSBldmVudFxuICAgICAqIEBwYXJhbSB7QWJzdHJhY3RFdmVudH0gZXZlbnQgLSBFdmVudCBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0RyYWdnYWJsZX1cbiAgICAgKiBAZXhhbXBsZSBkcmFnZ2FibGUudHJpZ2dlcihldmVudCk7XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RyaWdnZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuY2FsbGJhY2tzW2V2ZW50LnR5cGVdKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgdmFyIGNhbGxiYWNrcyA9IFtdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzLmNhbGxiYWNrc1tldmVudC50eXBlXSkpO1xuICAgICAgZm9yICh2YXIgaSA9IGNhbGxiYWNrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV07XG4gICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY2xhc3MgbmFtZSBmb3IgY2xhc3MgaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiBjbGFzcyBpZGVudGlmaWVyXG4gICAgICogQHJldHVybiB7U3RyaW5nfG51bGx9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldENsYXNzTmFtZUZvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsYXNzTmFtZUZvcihuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNsYXNzZXNbbmFtZV0gfHwgZGVmYXVsdHMuY2xhc3Nlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBkcmFnZ2FibGUgaW5zdGFuY2UgaXMgY3VycmVudGx5IGRyYWdnaW5nXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNEcmFnZ2luZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRHJhZ2dpbmcoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmRyYWdnaW5nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0YXJ0IGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRE9NIERyYWcgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdGFydCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciB0YXJnZXQgPSBzZW5zb3JFdmVudC50YXJnZXQsXG4gICAgICAgICAgY29udGFpbmVyID0gc2Vuc29yRXZlbnQuY29udGFpbmVyLFxuICAgICAgICAgIG9yaWdpbmFsRXZlbnQgPSBzZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50O1xuXG5cbiAgICAgIGlmICghdGhpcy5jb250YWluZXJzLmluY2x1ZGVzKGNvbnRhaW5lcikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhhbmRsZSAmJiB0YXJnZXQgJiYgISgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuaGFuZGxlKSkge1xuICAgICAgICBzZW5zb3JFdmVudC5jYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIGRyYWdnYWJsZSBzb3VyY2UgZWxlbWVudFxuICAgICAgdGhpcy5vcmlnaW5hbFNvdXJjZSA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgICBpZiAoIXRoaXMub3JpZ2luYWxTb3VyY2UpIHtcbiAgICAgICAgc2Vuc29yRXZlbnQuY2FuY2VsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgIHRoaXMuc291cmNlID0gdGhpcy5vcmlnaW5hbFNvdXJjZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgIGlmICghaXNEcmFnRXZlbnQob3JpZ2luYWxFdmVudCkpIHtcbiAgICAgICAgdmFyIGFwcGVuZGFibGVDb250YWluZXIgPSB0aGlzW2dldEFwcGVuZGFibGVDb250YWluZXJdKHsgc291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlIH0pO1xuICAgICAgICB0aGlzLm1pcnJvciA9IHRoaXMuc291cmNlLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgICB2YXIgbWlycm9yQ3JlYXRlZEV2ZW50ID0gbmV3IF9NaXJyb3JFdmVudC5NaXJyb3JDcmVhdGVkRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1pcnJvckF0dGFjaGVkRXZlbnQgPSBuZXcgX01pcnJvckV2ZW50Lk1pcnJvckF0dGFjaGVkRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKG1pcnJvckNyZWF0ZWRFdmVudCk7XG4gICAgICAgIGFwcGVuZGFibGVDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5taXJyb3IpO1xuICAgICAgICB0aGlzLnRyaWdnZXIobWlycm9yQXR0YWNoZWRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5zb3VyY2UsIHRoaXMub3JpZ2luYWxTb3VyY2UpO1xuXG4gICAgICB0aGlzLm9yaWdpbmFsU291cmNlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLnNvdXJjZS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6ZHJhZ2dpbmcnKSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2JvZHk6ZHJhZ2dpbmcnKSk7XG4gICAgICBhcHBseVVzZXJTZWxlY3QoZG9jdW1lbnQuYm9keSwgJ25vbmUnKTtcblxuICAgICAgaWYgKHRoaXMubWlycm9yKSB7XG4gICAgICAgIHZhciBtaXJyb3JNb3ZlRXZlbnQgPSBuZXcgX01pcnJvckV2ZW50Lk1pcnJvck1vdmVFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIobWlycm9yTW92ZUV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGRyYWdFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdTdGFydEV2ZW50KHtcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoZHJhZ0V2ZW50KTtcblxuICAgICAgaWYgKCFkcmFnRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1pcnJvcikge1xuICAgICAgICB0aGlzLm1pcnJvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubWlycm9yKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zb3VyY2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignc291cmNlOmRyYWdnaW5nJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOmRyYWdnaW5nJykpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdib2R5OmRyYWdnaW5nJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgbW92ZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIERPTSBEcmFnIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnTW92ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciBjb250YWluZXIgPSBzZW5zb3JFdmVudC5jb250YWluZXI7XG5cbiAgICAgIHZhciB0YXJnZXQgPSBzZW5zb3JFdmVudC50YXJnZXQ7XG5cbiAgICAgIHZhciBkcmFnTW92ZUV2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ01vdmVFdmVudCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyYWdNb3ZlRXZlbnQpO1xuXG4gICAgICBpZiAoZHJhZ01vdmVFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHNlbnNvckV2ZW50LmNhbmNlbCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taXJyb3IgJiYgIWRyYWdNb3ZlRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICB2YXIgbWlycm9yTW92ZUV2ZW50ID0gbmV3IF9NaXJyb3JFdmVudC5NaXJyb3JNb3ZlRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKG1pcnJvck1vdmVFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIHRhcmdldCA9ICgwLCBfdXRpbHMuY2xvc2VzdCkodGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcbiAgICAgIHZhciB3aXRoaW5Db3JyZWN0Q29udGFpbmVyID0gKDAsIF91dGlscy5jbG9zZXN0KShzZW5zb3JFdmVudC50YXJnZXQsIHRoaXMuY29udGFpbmVycyk7XG4gICAgICB2YXIgb3ZlckNvbnRhaW5lciA9IHNlbnNvckV2ZW50Lm92ZXJDb250YWluZXIgfHwgd2l0aGluQ29ycmVjdENvbnRhaW5lcjtcbiAgICAgIHZhciBpc0xlYXZpbmdDb250YWluZXIgPSB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyICYmIG92ZXJDb250YWluZXIgIT09IHRoaXMuY3VycmVudE92ZXJDb250YWluZXI7XG4gICAgICB2YXIgaXNMZWF2aW5nRHJhZ2dhYmxlID0gdGhpcy5jdXJyZW50T3ZlciAmJiB0YXJnZXQgIT09IHRoaXMuY3VycmVudE92ZXI7XG4gICAgICB2YXIgaXNPdmVyQ29udGFpbmVyID0gb3ZlckNvbnRhaW5lciAmJiB0aGlzLmN1cnJlbnRPdmVyQ29udGFpbmVyICE9PSBvdmVyQ29udGFpbmVyO1xuICAgICAgdmFyIGlzT3ZlckRyYWdnYWJsZSA9IHdpdGhpbkNvcnJlY3RDb250YWluZXIgJiYgdGFyZ2V0ICYmIHRoaXMuY3VycmVudE92ZXIgIT09IHRhcmdldDtcblxuICAgICAgaWYgKGlzTGVhdmluZ0RyYWdnYWJsZSkge1xuICAgICAgICB2YXIgZHJhZ091dEV2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ091dEV2ZW50KHtcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1pcnJvcjogdGhpcy5taXJyb3IsXG4gICAgICAgICAgb3JpZ2luYWxTb3VyY2U6IHRoaXMub3JpZ2luYWxTb3VyY2UsXG4gICAgICAgICAgc291cmNlQ29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICAgIG92ZXI6IHRoaXMuY3VycmVudE92ZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKGRyYWdPdXRFdmVudCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3Zlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcmFnZ2FibGU6b3ZlcicpKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlciA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0xlYXZpbmdDb250YWluZXIpIHtcbiAgICAgICAgdmFyIGRyYWdPdXRDb250YWluZXJFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdPdXRDb250YWluZXJFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyQ29udGFpbmVyOiB0aGlzLm92ZXJDb250YWluZXJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKGRyYWdPdXRDb250YWluZXJFdmVudCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6b3ZlcicpKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lciA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc092ZXJDb250YWluZXIpIHtcbiAgICAgICAgb3ZlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6b3ZlcicpKTtcblxuICAgICAgICB2YXIgZHJhZ092ZXJDb250YWluZXJFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdPdmVyQ29udGFpbmVyRXZlbnQoe1xuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWlycm9yOiB0aGlzLm1pcnJvcixcbiAgICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VDb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgICAgb3ZlckNvbnRhaW5lcjogb3ZlckNvbnRhaW5lclxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoZHJhZ092ZXJDb250YWluZXJFdmVudCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lciA9IG92ZXJDb250YWluZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc092ZXJEcmFnZ2FibGUpIHtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2RyYWdnYWJsZTpvdmVyJykpO1xuXG4gICAgICAgIHZhciBkcmFnT3ZlckV2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ092ZXJFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIG9yaWdpbmFsU291cmNlOiB0aGlzLm9yaWdpbmFsU291cmNlLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudCxcbiAgICAgICAgICBvdmVyQ29udGFpbmVyOiBvdmVyQ29udGFpbmVyLFxuICAgICAgICAgIG92ZXI6IHRhcmdldFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoZHJhZ092ZXJFdmVudCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlciA9IHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0b3AgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBET00gRHJhZyBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0b3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICB2YXIgc2Vuc29yRXZlbnQgPSBnZXRTZW5zb3JFdmVudChldmVudCk7XG4gICAgICB2YXIgZHJhZ1N0b3BFdmVudCA9IG5ldyBfRHJhZ0V2ZW50LkRyYWdTdG9wRXZlbnQoe1xuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICBvcmlnaW5hbFNvdXJjZTogdGhpcy5vcmlnaW5hbFNvdXJjZSxcbiAgICAgICAgc2Vuc29yRXZlbnQ6IGV2ZW50LnNlbnNvckV2ZW50LFxuICAgICAgICBzb3VyY2VDb250YWluZXI6IHRoaXMuc291cmNlQ29udGFpbmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyYWdTdG9wRXZlbnQpO1xuXG4gICAgICB0aGlzLnNvdXJjZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm9yaWdpbmFsU291cmNlLCB0aGlzLnNvdXJjZSk7XG4gICAgICB0aGlzLnNvdXJjZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc291cmNlKTtcbiAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2Uuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICB0aGlzLnNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdzb3VyY2U6ZHJhZ2dpbmcnKSk7XG4gICAgICB0aGlzLm9yaWdpbmFsU291cmNlLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpwbGFjZWQnKSk7XG4gICAgICB0aGlzLnNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6cGxhY2VkJykpO1xuICAgICAgdGhpcy5zb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmdldENsYXNzTmFtZUZvcignY29udGFpbmVyOmRyYWdnaW5nJykpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdib2R5OmRyYWdnaW5nJykpO1xuICAgICAgYXBwbHlVc2VyU2VsZWN0KGRvY3VtZW50LmJvZHksICcnKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudE92ZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50T3Zlci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcmFnZ2FibGU6b3ZlcicpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudE92ZXJDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6b3ZlcicpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWlycm9yKSB7XG4gICAgICAgIHZhciBtaXJyb3JEZXN0cm95RXZlbnQgPSBuZXcgX01pcnJvckV2ZW50Lk1pcnJvckRlc3Ryb3lFdmVudCh7XG4gICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICBtaXJyb3I6IHRoaXMubWlycm9yLFxuICAgICAgICAgIHNvdXJjZUNvbnRhaW5lcjogc2Vuc29yRXZlbnQuY29udGFpbmVyLFxuICAgICAgICAgIHNlbnNvckV2ZW50OiBzZW5zb3JFdmVudFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIobWlycm9yRGVzdHJveUV2ZW50KTtcblxuICAgICAgICBpZiAoIW1pcnJvckRlc3Ryb3lFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgICAgdGhpcy5taXJyb3IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm1pcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGxhc3RTb3VyY2UgPSB0aGlzLm9yaWdpbmFsU291cmNlO1xuICAgICAgdmFyIGxhc3RTb3VyY2VDb250YWluZXIgPSB0aGlzLnNvdXJjZUNvbnRhaW5lcjtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChsYXN0U291cmNlKSB7XG4gICAgICAgICAgbGFzdFNvdXJjZS5jbGFzc0xpc3QucmVtb3ZlKF90aGlzMy5nZXRDbGFzc05hbWVGb3IoJ3NvdXJjZTpwbGFjZWQnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdFNvdXJjZUNvbnRhaW5lcikge1xuICAgICAgICAgIGxhc3RTb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShfdGhpczMuZ2V0Q2xhc3NOYW1lRm9yKCdjb250YWluZXI6cGxhY2VkJykpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLm9wdGlvbnMucGxhY2VkVGltZW91dCk7XG5cbiAgICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgICAgIHRoaXMubWlycm9yID0gbnVsbDtcbiAgICAgIHRoaXMub3JpZ2luYWxTb3VyY2UgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50T3ZlckNvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLmN1cnJlbnRPdmVyID0gbnVsbDtcbiAgICAgIHRoaXMuc291cmNlQ29udGFpbmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHByZXNzdXJlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRE9NIERyYWcgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdQcmVzc3VyZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzZW5zb3JFdmVudCA9IGdldFNlbnNvckV2ZW50KGV2ZW50KTtcbiAgICAgIHZhciBzb3VyY2UgPSB0aGlzLnNvdXJjZSB8fCAoMCwgX3V0aWxzLmNsb3Nlc3QpKHNlbnNvckV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0LCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKTtcblxuICAgICAgdmFyIGRyYWdQcmVzc3VyZUV2ZW50ID0gbmV3IF9EcmFnRXZlbnQuRHJhZ1ByZXNzdXJlRXZlbnQoe1xuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICBwcmVzc3VyZTogc2Vuc29yRXZlbnQucHJlc3N1cmVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoZHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYXBwZW5kYWJsZSBjb250YWluZXIgZm9yIG1pcnJvciBiYXNlZCBvbiB0aGUgYXBwZW5kVG8gb3B0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9wdGlvbnMuc291cmNlIC0gQ3VycmVudCBzb3VyY2VcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBnZXRBcHBlbmRhYmxlQ29udGFpbmVyLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfcmVmKSB7XG4gICAgICB2YXIgc291cmNlID0gX3JlZi5zb3VyY2U7XG5cbiAgICAgIHZhciBhcHBlbmRUbyA9IHRoaXMub3B0aW9ucy5hcHBlbmRUbztcblxuICAgICAgaWYgKHR5cGVvZiBhcHBlbmRUbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXBwZW5kVG8pO1xuICAgICAgfSBlbHNlIGlmIChhcHBlbmRUbyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBhcHBlbmRUbztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBhcHBlbmRUbyhzb3VyY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcmFnZ2FibGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERyYWdnYWJsZTtcblxuXG5mdW5jdGlvbiBnZXRTZW5zb3JFdmVudChldmVudCkge1xuICByZXR1cm4gZXZlbnQuZGV0YWlsO1xufVxuXG5mdW5jdGlvbiBpc0RyYWdFdmVudChldmVudCkge1xuICByZXR1cm4gKC9eZHJhZy8udGVzdChldmVudC50eXBlKVxuICApO1xufVxuXG5mdW5jdGlvbiBhcHBseVVzZXJTZWxlY3QoZWxlbWVudCwgdmFsdWUpIHtcbiAgZWxlbWVudC5zdHlsZS53ZWJraXRVc2VyU2VsZWN0ID0gdmFsdWU7XG4gIGVsZW1lbnQuc3R5bGUubW96VXNlclNlbGVjdCA9IHZhbHVlO1xuICBlbGVtZW50LnN0eWxlLm1zVXNlclNlbGVjdCA9IHZhbHVlO1xuICBlbGVtZW50LnN0eWxlLm9Vc2VyU2VsZWN0ID0gdmFsdWU7XG4gIGVsZW1lbnQuc3R5bGUudXNlclNlbGVjdCA9IHZhbHVlO1xufVxuXG4vKioqLyB9KSxcbi8qIDEyOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0TWlycm9yT3B0aW9uID0gdW5kZWZpbmVkO1xuXG52YXIgX01pcnJvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTMwKTtcblxudmFyIF9NaXJyb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTWlycm9yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX01pcnJvcjIuZGVmYXVsdDtcbmV4cG9ydHMuZGVmYXVsdE1pcnJvck9wdGlvbiA9IF9NaXJyb3IuZGVmYXVsdE9wdGlvbnM7XG5cbi8qKiovIH0pLFxuLyogMTMwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHRPcHRpb25zID0gdW5kZWZpbmVkO1xuXG52YXIgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMTMxKTtcblxudmFyIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RXaXRob3V0UHJvcGVydGllczIpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBkZWZhdWx0T3B0aW9ucyA9IGV4cG9ydHMuZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGNvbnN0cmFpbkRpbWVuc2lvbnM6IGZhbHNlLFxuICB4QXhpczogdHJ1ZSxcbiAgeUF4aXM6IHRydWVcbn07XG5cbnZhciBNaXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1pcnJvcihkcmFnZ2FibGUpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3IpO1xuXG4gICAgdGhpcy5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHRoaXMuZ2V0T3B0aW9ucygpKTtcblxuICAgIHRoaXMub25NaXJyb3JDcmVhdGVkID0gdGhpcy5vbk1pcnJvckNyZWF0ZWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uTWlycm9yTW92ZSA9IHRoaXMub25NaXJyb3JNb3ZlLmJpbmQodGhpcyk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShNaXJyb3IsIFt7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgdGhpcy5kcmFnZ2FibGUub24oJ21pcnJvcjpjcmVhdGVkJywgdGhpcy5vbk1pcnJvckNyZWF0ZWQpLm9uKCdtaXJyb3I6bW92ZScsIHRoaXMub25NaXJyb3JNb3ZlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXRhY2goKSB7XG4gICAgICB0aGlzLmRyYWdnYWJsZS5vZmYoJ21pcnJvcjpjcmVhdGVkJywgdGhpcy5vbk1pcnJvckNyZWF0ZWQpLm9mZignbWlycm9yOm1vdmUnLCB0aGlzLm9uTWlycm9yTW92ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0T3B0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGUub3B0aW9ucy5taXJyb3IgfHwge307XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25NaXJyb3JDcmVhdGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25NaXJyb3JDcmVhdGVkKF9yZWYpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBtaXJyb3IgPSBfcmVmLm1pcnJvcixcbiAgICAgICAgICBzb3VyY2UgPSBfcmVmLnNvdXJjZSxcbiAgICAgICAgICBzZW5zb3JFdmVudCA9IF9yZWYuc2Vuc29yRXZlbnQ7XG5cbiAgICAgIHZhciBtaXJyb3JDbGFzcyA9IHRoaXMuZHJhZ2dhYmxlLmdldENsYXNzTmFtZUZvcignbWlycm9yJyk7XG5cbiAgICAgIHZhciBzZXRTdGF0ZSA9IGZ1bmN0aW9uIHNldFN0YXRlKF9yZWYyKSB7XG4gICAgICAgIHZhciBtaXJyb3JPZmZzZXQgPSBfcmVmMi5taXJyb3JPZmZzZXQsXG4gICAgICAgICAgICBpbml0aWFsWCA9IF9yZWYyLmluaXRpYWxYLFxuICAgICAgICAgICAgaW5pdGlhbFkgPSBfcmVmMi5pbml0aWFsWSxcbiAgICAgICAgICAgIGFyZ3MgPSAoMCwgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMy5kZWZhdWx0KShfcmVmMiwgWydtaXJyb3JPZmZzZXQnLCAnaW5pdGlhbFgnLCAnaW5pdGlhbFknXSk7XG5cbiAgICAgICAgX3RoaXMubWlycm9yT2Zmc2V0ID0gbWlycm9yT2Zmc2V0O1xuICAgICAgICBfdGhpcy5pbml0aWFsWCA9IGluaXRpYWxYO1xuICAgICAgICBfdGhpcy5pbml0aWFsWSA9IGluaXRpYWxZO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IG1pcnJvck9mZnNldDogbWlycm9yT2Zmc2V0LCBpbml0aWFsWDogaW5pdGlhbFgsIGluaXRpYWxZOiBpbml0aWFsWSB9LCBhcmdzKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBpbml0aWFsU3RhdGUgPSB7XG4gICAgICAgIG1pcnJvcjogbWlycm9yLFxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICBtaXJyb3JDbGFzczogbWlycm9yQ2xhc3MsXG4gICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9uc1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbml0aWFsU3RhdGUpXG4gICAgICAvLyBGaXggcmVmbG93IGhlcmVcbiAgICAgIC50aGVuKGNvbXB1dGVNaXJyb3JEaW1lbnNpb25zKS50aGVuKGNhbGN1bGF0ZU1pcnJvck9mZnNldCkudGhlbihyZXNldE1pcnJvcikudGhlbihhZGRNaXJyb3JDbGFzc2VzKS50aGVuKHBvc2l0aW9uTWlycm9yKHsgaW5pdGlhbDogdHJ1ZSB9KSkudGhlbihyZW1vdmVNaXJyb3JJRCkudGhlbihzZXRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25NaXJyb3JNb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25NaXJyb3JNb3ZlKF9yZWYzKSB7XG4gICAgICB2YXIgbWlycm9yID0gX3JlZjMubWlycm9yLFxuICAgICAgICAgIHNlbnNvckV2ZW50ID0gX3JlZjMuc2Vuc29yRXZlbnQ7XG5cbiAgICAgIHZhciBpbml0aWFsU3RhdGUgPSB7XG4gICAgICAgIG1pcnJvcjogbWlycm9yLFxuICAgICAgICBzZW5zb3JFdmVudDogc2Vuc29yRXZlbnQsXG4gICAgICAgIG1pcnJvck9mZnNldDogdGhpcy5taXJyb3JPZmZzZXQsXG4gICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgaW5pdGlhbFg6IHRoaXMuaW5pdGlhbFgsXG4gICAgICAgIGluaXRpYWxZOiB0aGlzLmluaXRpYWxZXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluaXRpYWxTdGF0ZSkudGhlbihwb3NpdGlvbk1pcnJvcih7IHJhZjogdHJ1ZSB9KSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBNaXJyb3I7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1pcnJvcjtcblxuXG5mdW5jdGlvbiBjb21wdXRlTWlycm9yRGltZW5zaW9ucyhfcmVmNCkge1xuICB2YXIgc291cmNlID0gX3JlZjQuc291cmNlLFxuICAgICAgYXJncyA9ICgwLCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMzLmRlZmF1bHQpKF9yZWY0LCBbJ3NvdXJjZSddKTtcblxuICByZXR1cm4gd2l0aFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICB2YXIgc291cmNlUmVjdCA9IHNvdXJjZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oeyBzb3VyY2U6IHNvdXJjZSwgc291cmNlUmVjdDogc291cmNlUmVjdCB9LCBhcmdzKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVNaXJyb3JPZmZzZXQoX3JlZjUpIHtcbiAgdmFyIHNlbnNvckV2ZW50ID0gX3JlZjUuc2Vuc29yRXZlbnQsXG4gICAgICBzb3VyY2VSZWN0ID0gX3JlZjUuc291cmNlUmVjdCxcbiAgICAgIGFyZ3MgPSAoMCwgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzMy5kZWZhdWx0KShfcmVmNSwgWydzZW5zb3JFdmVudCcsICdzb3VyY2VSZWN0J10pO1xuXG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHZhciBtaXJyb3JPZmZzZXQgPSB7XG4gICAgICB0b3A6IHNlbnNvckV2ZW50LmNsaWVudFkgLSBzb3VyY2VSZWN0LnRvcCxcbiAgICAgIGxlZnQ6IHNlbnNvckV2ZW50LmNsaWVudFggLSBzb3VyY2VSZWN0LmxlZnRcbiAgICB9O1xuXG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHsgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LCBzb3VyY2VSZWN0OiBzb3VyY2VSZWN0LCBtaXJyb3JPZmZzZXQ6IG1pcnJvck9mZnNldCB9LCBhcmdzKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXNldE1pcnJvcihfcmVmNikge1xuICB2YXIgbWlycm9yID0gX3JlZjYubWlycm9yLFxuICAgICAgc291cmNlID0gX3JlZjYuc291cmNlLFxuICAgICAgb3B0aW9ucyA9IF9yZWY2Lm9wdGlvbnMsXG4gICAgICBhcmdzID0gKDAsIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMuZGVmYXVsdCkoX3JlZjYsIFsnbWlycm9yJywgJ3NvdXJjZScsICdvcHRpb25zJ10pO1xuXG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHZhciBvZmZzZXRIZWlnaHQgPSB2b2lkIDA7XG4gICAgdmFyIG9mZnNldFdpZHRoID0gdm9pZCAwO1xuXG4gICAgaWYgKG9wdGlvbnMuY29uc3RyYWluRGltZW5zaW9ucykge1xuICAgICAgb2Zmc2V0SGVpZ2h0ID0gc291cmNlLm9mZnNldEhlaWdodDtcbiAgICAgIG9mZnNldFdpZHRoID0gc291cmNlLm9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIG1pcnJvci5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgbWlycm9yLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgbWlycm9yLnN0eWxlLnRvcCA9IDA7XG4gICAgbWlycm9yLnN0eWxlLmxlZnQgPSAwO1xuXG4gICAgaWYgKG9wdGlvbnMuY29uc3RyYWluRGltZW5zaW9ucykge1xuICAgICAgbWlycm9yLnN0eWxlLmhlaWdodCA9IG9mZnNldEhlaWdodCArICdweCc7XG4gICAgICBtaXJyb3Iuc3R5bGUud2lkdGggPSBvZmZzZXRXaWR0aCArICdweCc7XG4gICAgfVxuXG4gICAgcmVzb2x2ZShPYmplY3QuYXNzaWduKHsgbWlycm9yOiBtaXJyb3IsIHNvdXJjZTogc291cmNlLCBvcHRpb25zOiBvcHRpb25zIH0sIGFyZ3MpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZE1pcnJvckNsYXNzZXMoX3JlZjcpIHtcbiAgdmFyIG1pcnJvciA9IF9yZWY3Lm1pcnJvcixcbiAgICAgIG1pcnJvckNsYXNzID0gX3JlZjcubWlycm9yQ2xhc3MsXG4gICAgICBhcmdzID0gKDAsIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMuZGVmYXVsdCkoX3JlZjcsIFsnbWlycm9yJywgJ21pcnJvckNsYXNzJ10pO1xuXG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIG1pcnJvci5jbGFzc0xpc3QuYWRkKG1pcnJvckNsYXNzKTtcbiAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oeyBtaXJyb3I6IG1pcnJvciwgbWlycm9yQ2xhc3M6IG1pcnJvckNsYXNzIH0sIGFyZ3MpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU1pcnJvcklEKF9yZWY4KSB7XG4gIHZhciBtaXJyb3IgPSBfcmVmOC5taXJyb3IsXG4gICAgICBhcmdzID0gKDAsIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMuZGVmYXVsdCkoX3JlZjgsIFsnbWlycm9yJ10pO1xuXG4gIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIG1pcnJvci5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgZGVsZXRlIG1pcnJvci5pZDtcbiAgICByZXNvbHZlKE9iamVjdC5hc3NpZ24oeyBtaXJyb3I6IG1pcnJvciB9LCBhcmdzKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvbk1pcnJvcigpIHtcbiAgdmFyIF9yZWY5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIF9yZWY5JHdpdGhGcmFtZSA9IF9yZWY5LndpdGhGcmFtZSxcbiAgICAgIHdpdGhGcmFtZSA9IF9yZWY5JHdpdGhGcmFtZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmOSR3aXRoRnJhbWUsXG4gICAgICBfcmVmOSRpbml0aWFsID0gX3JlZjkuaW5pdGlhbCxcbiAgICAgIGluaXRpYWwgPSBfcmVmOSRpbml0aWFsID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWY5JGluaXRpYWw7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmMTApIHtcbiAgICB2YXIgbWlycm9yID0gX3JlZjEwLm1pcnJvcixcbiAgICAgICAgc2Vuc29yRXZlbnQgPSBfcmVmMTAuc2Vuc29yRXZlbnQsXG4gICAgICAgIG1pcnJvck9mZnNldCA9IF9yZWYxMC5taXJyb3JPZmZzZXQsXG4gICAgICAgIGluaXRpYWxZID0gX3JlZjEwLmluaXRpYWxZLFxuICAgICAgICBpbml0aWFsWCA9IF9yZWYxMC5pbml0aWFsWCxcbiAgICAgICAgb3B0aW9ucyA9IF9yZWYxMC5vcHRpb25zLFxuICAgICAgICBhcmdzID0gKDAsIF9vYmplY3RXaXRob3V0UHJvcGVydGllczMuZGVmYXVsdCkoX3JlZjEwLCBbJ21pcnJvcicsICdzZW5zb3JFdmVudCcsICdtaXJyb3JPZmZzZXQnLCAnaW5pdGlhbFknLCAnaW5pdGlhbFgnLCAnb3B0aW9ucyddKTtcblxuICAgIHJldHVybiB3aXRoUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBtaXJyb3I6IG1pcnJvcixcbiAgICAgICAgc2Vuc29yRXZlbnQ6IHNlbnNvckV2ZW50LFxuICAgICAgICBtaXJyb3JPZmZzZXQ6IG1pcnJvck9mZnNldCxcbiAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgfSwgYXJncyk7XG5cbiAgICAgIGlmIChtaXJyb3JPZmZzZXQpIHtcbiAgICAgICAgdmFyIHggPSBzZW5zb3JFdmVudC5jbGllbnRYIC0gbWlycm9yT2Zmc2V0LmxlZnQ7XG4gICAgICAgIHZhciB5ID0gc2Vuc29yRXZlbnQuY2xpZW50WSAtIG1pcnJvck9mZnNldC50b3A7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMueEF4aXMgJiYgb3B0aW9ucy55QXhpcyB8fCBpbml0aWFsKSB7XG4gICAgICAgICAgbWlycm9yLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsIDApJztcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnhBeGlzICYmICFvcHRpb25zLnlBeGlzKSB7XG4gICAgICAgICAgbWlycm9yLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIGluaXRpYWxZICsgJ3B4LCAwKSc7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy55QXhpcyAmJiAhb3B0aW9ucy54QXhpcykge1xuICAgICAgICAgIG1pcnJvci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGluaXRpYWxYICsgJ3B4LCAnICsgeSArICdweCwgMCknO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluaXRpYWwpIHtcbiAgICAgICAgICByZXN1bHQuaW5pdGlhbFggPSB4O1xuICAgICAgICAgIHJlc3VsdC5pbml0aWFsWSA9IHk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgIH0sIHsgZnJhbWU6IHdpdGhGcmFtZSB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd2l0aFByb21pc2UoY2FsbGJhY2spIHtcbiAgdmFyIF9yZWYxMSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge30sXG4gICAgICBfcmVmMTEkcmFmID0gX3JlZjExLnJhZixcbiAgICAgIHJhZiA9IF9yZWYxMSRyYWYgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZjExJHJhZjtcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmIChyYWYpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2socmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKioqLyB9KSxcbi8qIDEzMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7XG4gICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbi8qKiovIH0pLFxuLyogMTMyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQWNjZXNzaWJpbGl0eSA9IF9fd2VicGFja19yZXF1aXJlX18oMTMzKTtcblxudmFyIF9BY2Nlc3NpYmlsaXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjY2Vzc2liaWxpdHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQWNjZXNzaWJpbGl0eTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMzMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgQVJJQV9HUkFCQkVEID0gJ2FyaWEtZ3JhYmJlZCc7XG52YXIgQVJJQV9EUk9QRUZGRUNUID0gJ2FyaWEtZHJvcGVmZmVjdCc7XG52YXIgVEFCSU5ERVggPSAndGFiaW5kZXgnO1xuXG4vKipcbiAqIF9fV0lQX18gQWNjZXNzaWJpbGl0eSBwbHVnaW5cbiAqIEBjbGFzcyBBY2Nlc3NpYmlsaXR5XG4gKiBAbW9kdWxlIEFjY2Vzc2liaWxpdHlcbiAqL1xuXG52YXIgQWNjZXNzaWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogQWNjZXNzaWJpbGl0eSBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgQWNjZXNzaWJpbGl0eVxuICAgKiBAcGFyYW0ge0RyYWdnYWJsZX0gZHJhZ2dhYmxlIC0gRHJhZ2dhYmxlIGluc3RhbmNlXG4gICAqL1xuICBmdW5jdGlvbiBBY2Nlc3NpYmlsaXR5KGRyYWdnYWJsZSkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIEFjY2Vzc2liaWxpdHkpO1xuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgaW5zdGFuY2VcbiAgICAgKiBAcHJvcGVydHkgZHJhZ2dhYmxlXG4gICAgICogQHR5cGUge0RyYWdnYWJsZX1cbiAgICAgKi9cbiAgICB0aGlzLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcblxuICAgIHRoaXMuX29uSW5pdCA9IHRoaXMuX29uSW5pdC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRGVzdHJveSA9IHRoaXMuX29uRGVzdHJveS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIGxpc3RlbmVycyB0byBkcmFnZ2FibGVcbiAgICovXG5cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShBY2Nlc3NpYmlsaXR5LCBbe1xuICAgIGtleTogJ2F0dGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9uKCdpbml0JywgdGhpcy5fb25Jbml0KS5vbignZGVzdHJveScsIHRoaXMuX29uRGVzdHJveSkub24oJ2RyYWc6c3RhcnQnLCBfb25EcmFnU3RhcnQpLm9uKCdkcmFnOnN0b3AnLCBfb25EcmFnU3RvcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgbGlzdGVuZXJzIGZyb20gZHJhZ2dhYmxlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlLm9mZignaW5pdCcsIHRoaXMuX29uSW5pdCkub2ZmKCdkZXN0cm95JywgdGhpcy5fb25EZXN0cm95KS5vZmYoJ2RyYWc6c3RhcnQnLCBfb25EcmFnU3RhcnQpLm9mZignZHJhZzpzdG9wJywgX29uRHJhZ1N0b3ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGlhbGl6ZSBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IHBhcmFtLmNvbnRhaW5lcnNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX29uSW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkluaXQoX3JlZikge1xuICAgICAgdmFyIGNvbnRhaW5lcnMgPSBfcmVmLmNvbnRhaW5lcnM7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKEFSSUFfRFJPUEVGRkVDVCwgdGhpcy5kcmFnZ2FibGUub3B0aW9ucy50eXBlKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuZHJhZ2dhYmxlLm9wdGlvbnMuZHJhZ2dhYmxlKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShUQUJJTkRFWCwgMCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgaGFuZGxlciBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IHBhcmFtLmNvbnRhaW5lcnNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX29uRGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbkRlc3Ryb3koX3JlZjIpIHtcbiAgICAgIHZhciBjb250YWluZXJzID0gX3JlZjIuY29udGFpbmVycztcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gY29udGFpbmVyc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMzsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IChfc3RlcDMgPSBfaXRlcmF0b3IzLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBjb250YWluZXIgPSBfc3RlcDMudmFsdWU7XG5cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKEFSSUFfRFJPUEVGRkVDVCk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlO1xuICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCh0aGlzLmRyYWdnYWJsZS5vcHRpb25zLmRyYWdnYWJsZSlbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDQ7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSAoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWUpIHtcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBfc3RlcDQudmFsdWU7XG5cbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoVEFCSU5ERVgsIDApO1xuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShBUklBX0dSQUJCRUQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjQgPSBlcnI7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgJiYgX2l0ZXJhdG9yNC5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3I0LnJldHVybigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IzLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBBY2Nlc3NpYmlsaXR5O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBY2Nlc3NpYmlsaXR5O1xuXG5cbmZ1bmN0aW9uIF9vbkRyYWdTdGFydChfcmVmMykge1xuICB2YXIgc291cmNlID0gX3JlZjMuc291cmNlO1xuXG4gIHNvdXJjZS5zZXRBdHRyaWJ1dGUoQVJJQV9HUkFCQkVELCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gX29uRHJhZ1N0b3AoX3JlZjQpIHtcbiAgdmFyIHNvdXJjZSA9IF9yZWY0LnNvdXJjZTtcblxuICBzb3VyY2Uuc2V0QXR0cmlidXRlKEFSSUFfR1JBQkJFRCwgZmFsc2UpO1xufVxuXG4vKioqLyB9KSxcbi8qIDEzNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0RyYWdnYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMzUpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ2dhYmxlRXZlbnQuRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdnYWJsZURlc3Ryb3lFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnZ2FibGVFdmVudC5EcmFnZ2FibGVEZXN0cm95RXZlbnQ7XG4gIH1cbn0pO1xuXG4vKioqLyB9KSxcbi8qIDEzNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5EcmFnZ2FibGVEZXN0cm95RXZlbnQgPSBleHBvcnRzLkRyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQgPSBleHBvcnRzLkRyYWdnYWJsZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBkcmFnZ2FibGUgZXZlbnRcbiAqIEBjbGFzcyBEcmFnZ2FibGVFdmVudFxuICogQG1vZHVsZSBEcmFnZ2FibGVFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgRHJhZ2dhYmxlRXZlbnQgPSBleHBvcnRzLkRyYWdnYWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdnYWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJhZ2dhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ2dhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnZ2FibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdnYWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnZ2FibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnZ2FibGUnLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgaW5zdGFuY2VcbiAgICAgKiBAcHJvcGVydHkgZHJhZ2dhYmxlXG4gICAgICogQHR5cGUge0RyYWdnYWJsZX1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ2dhYmxlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ2dhYmxlRXZlbnQ7XG59KF9BYnN0cmFjdEV2ZW50My5kZWZhdWx0KTtcblxuLyoqXG4gKiBEcmFnZ2FibGUgaW5pdGlhbGl6ZWQgZXZlbnRcbiAqIEBjbGFzcyBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50XG4gKiBAbW9kdWxlIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnRcbiAqIEBleHRlbmRzIERyYWdnYWJsZUV2ZW50XG4gKi9cblxuXG5EcmFnZ2FibGVFdmVudC50eXBlID0gJ2RyYWdnYWJsZSc7XG5cbnZhciBEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gZXhwb3J0cy5EcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnZ2FibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50LCBfRHJhZ2dhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdnYWJsZUluaXRpYWxpemVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnZ2FibGVJbml0aWFsaXplZEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudDtcbn0oRHJhZ2dhYmxlRXZlbnQpO1xuXG4vKipcbiAqIERyYWdnYWJsZSBkZXN0b3J5IGV2ZW50XG4gKiBAY2xhc3MgRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudFxuICogQG1vZHVsZSBEcmFnZ2FibGVEZXN0cm95RXZlbnRcbiAqIEBleHRlbmRzIERyYWdnYWJsZURlc3Ryb3lFdmVudFxuICovXG5cblxuRHJhZ2dhYmxlSW5pdGlhbGl6ZWRFdmVudC50eXBlID0gJ2RyYWdnYWJsZTppbml0aWFsaXplJztcblxudmFyIERyYWdnYWJsZURlc3Ryb3lFdmVudCA9IGV4cG9ydHMuRHJhZ2dhYmxlRGVzdHJveUV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnZ2FibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ2dhYmxlRGVzdHJveUV2ZW50LCBfRHJhZ2dhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGVEZXN0cm95RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ2dhYmxlRGVzdHJveUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ2dhYmxlRGVzdHJveUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ2dhYmxlRGVzdHJveUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gRHJhZ2dhYmxlRGVzdHJveUV2ZW50O1xufShEcmFnZ2FibGVFdmVudCk7XG5cbkRyYWdnYWJsZURlc3Ryb3lFdmVudC50eXBlID0gJ2RyYWdnYWJsZTpkZXN0cm95JztcblxuLyoqKi8gfSksXG4vKiAxMzYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9EcmFnRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzNyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ1N0YXJ0RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ0V2ZW50LkRyYWdTdGFydEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ01vdmVFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnRXZlbnQuRHJhZ01vdmVFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdPdXRDb250YWluZXJFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnRXZlbnQuRHJhZ091dENvbnRhaW5lckV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ091dEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdFdmVudC5EcmFnT3V0RXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnT3ZlckNvbnRhaW5lckV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdFdmVudC5EcmFnT3ZlckNvbnRhaW5lckV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRHJhZ092ZXJFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnRXZlbnQuRHJhZ092ZXJFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0RyYWdTdG9wRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRHJhZ0V2ZW50LkRyYWdTdG9wRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcmFnUHJlc3N1cmVFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9EcmFnRXZlbnQuRHJhZ1ByZXNzdXJlRXZlbnQ7XG4gIH1cbn0pO1xuXG4vKioqLyB9KSxcbi8qIDEzNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5EcmFnU3RvcEV2ZW50ID0gZXhwb3J0cy5EcmFnUHJlc3N1cmVFdmVudCA9IGV4cG9ydHMuRHJhZ091dENvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3ZlckNvbnRhaW5lckV2ZW50ID0gZXhwb3J0cy5EcmFnT3V0RXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyRXZlbnQgPSBleHBvcnRzLkRyYWdNb3ZlRXZlbnQgPSBleHBvcnRzLkRyYWdTdGFydEV2ZW50ID0gZXhwb3J0cy5EcmFnRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIGRyYWcgZXZlbnRcbiAqIEBjbGFzcyBEcmFnRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ0V2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBEcmFnRXZlbnQgPSBleHBvcnRzLkRyYWdFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ0V2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ0V2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ0V2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnRXZlbnQsIFt7XG4gICAga2V5OiAnaGFzTWlycm9yJyxcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIG1pcnJvciBoYXMgYmVlbiBjcmVhdGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzTWlycm9yKCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5taXJyb3IpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NvdXJjZScsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgc291cmNlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgc291cmNlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBvcmlnaW5hbCBzb3VyY2UgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBvcmlnaW5hbFNvdXJjZVxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3JpZ2luYWxTb3VyY2UnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vcmlnaW5hbFNvdXJjZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIG1pcnJvciBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG1pcnJvclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbWlycm9yJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubWlycm9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgc291cmNlIGNvbnRhaW5lciBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IHNvdXJjZUNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc291cmNlQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbnNvciBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBzZW5zb3JFdmVudFxuICAgICAqIEB0eXBlIHtTZW5zb3JFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29yRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zZW5zb3JFdmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBldmVudCB0aGF0IHRyaWdnZXJlZCBzZW5zb3IgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgb3JpZ2luYWxFdmVudFxuICAgICAqIEB0eXBlIHtFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3JpZ2luYWxFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBpZiAodGhpcy5zZW5zb3JFdmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIERyYWcgc3RhcnQgZXZlbnRcbiAqIEBjbGFzcyBEcmFnU3RhcnRFdmVudFxuICogQG1vZHVsZSBEcmFnU3RhcnRFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnRXZlbnQudHlwZSA9ICdkcmFnJztcblxudmFyIERyYWdTdGFydEV2ZW50ID0gZXhwb3J0cy5EcmFnU3RhcnRFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdTdGFydEV2ZW50LCBfRHJhZ0V2ZW50KTtcblxuICBmdW5jdGlvbiBEcmFnU3RhcnRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RhcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdTdGFydEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJhZ1N0YXJ0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RhcnRFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIG1vdmUgZXZlbnRcbiAqIEBjbGFzcyBEcmFnTW92ZUV2ZW50XG4gKiBAbW9kdWxlIERyYWdNb3ZlRXZlbnRcbiAqIEBleHRlbmRzIERyYWdFdmVudFxuICovXG5cblxuRHJhZ1N0YXJ0RXZlbnQudHlwZSA9ICdkcmFnOnN0YXJ0JztcbkRyYWdTdGFydEV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgRHJhZ01vdmVFdmVudCA9IGV4cG9ydHMuRHJhZ01vdmVFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnTW92ZUV2ZW50LCBfRHJhZ0V2ZW50Mik7XG5cbiAgZnVuY3Rpb24gRHJhZ01vdmVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnTW92ZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ01vdmVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdNb3ZlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnTW92ZUV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgb3ZlciBldmVudFxuICogQGNsYXNzIERyYWdPdmVyRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ092ZXJFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnTW92ZUV2ZW50LnR5cGUgPSAnZHJhZzptb3ZlJztcblxudmFyIERyYWdPdmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ092ZXJFdmVudCwgX0RyYWdFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ092ZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3ZlckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3ZlckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyIHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBlbGVtZW50IHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvdmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdPdmVyRXZlbnQ7XG59KERyYWdFdmVudCk7XG5cbi8qKlxuICogRHJhZyBvdXQgZXZlbnRcbiAqIEBjbGFzcyBEcmFnT3V0RXZlbnRcbiAqIEBtb2R1bGUgRHJhZ091dEV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdPdmVyRXZlbnQudHlwZSA9ICdkcmFnOm92ZXInO1xuRHJhZ092ZXJFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIERyYWdPdXRFdmVudCA9IGV4cG9ydHMuRHJhZ091dEV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ0KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdPdXRFdmVudCwgX0RyYWdFdmVudDQpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnT3V0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnT3V0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdPdXRFdmVudCwgW3tcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnRhaW5lciB5b3UgYXJlIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgb3ZlckNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlckNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgZWxlbWVudCB5b3UgbGVmdFxuICAgICAqIEBwcm9wZXJ0eSBvdmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvdmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub3ZlcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdPdXRFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIG92ZXIgY29udGFpbmVyIGV2ZW50XG4gKiBAY2xhc3MgRHJhZ092ZXJDb250YWluZXJFdmVudFxuICogQG1vZHVsZSBEcmFnT3ZlckNvbnRhaW5lckV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdPdXRFdmVudC50eXBlID0gJ2RyYWc6b3V0JztcblxudmFyIERyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBleHBvcnRzLkRyYWdPdmVyQ29udGFpbmVyRXZlbnQgPSBmdW5jdGlvbiAoX0RyYWdFdmVudDUpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRHJhZ092ZXJDb250YWluZXJFdmVudCwgX0RyYWdFdmVudDUpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdmVyQ29udGFpbmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ092ZXJDb250YWluZXJFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyYWdPdmVyQ29udGFpbmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3ZlckNvbnRhaW5lckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnT3ZlckNvbnRhaW5lckV2ZW50LCBbe1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuXG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyIHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ092ZXJDb250YWluZXJFdmVudDtcbn0oRHJhZ0V2ZW50KTtcblxuLyoqXG4gKiBEcmFnIG91dCBjb250YWluZXIgZXZlbnRcbiAqIEBjbGFzcyBEcmFnT3V0Q29udGFpbmVyRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ091dENvbnRhaW5lckV2ZW50XG4gKiBAZXh0ZW5kcyBEcmFnRXZlbnRcbiAqL1xuXG5cbkRyYWdPdmVyQ29udGFpbmVyRXZlbnQudHlwZSA9ICdkcmFnOm92ZXI6Y29udGFpbmVyJztcblxudmFyIERyYWdPdXRDb250YWluZXJFdmVudCA9IGV4cG9ydHMuRHJhZ091dENvbnRhaW5lckV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ2KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdPdXRDb250YWluZXJFdmVudCwgX0RyYWdFdmVudDYpO1xuXG4gIGZ1bmN0aW9uIERyYWdPdXRDb250YWluZXJFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnT3V0Q29udGFpbmVyRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnT3V0Q29udGFpbmVyRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcmFnT3V0Q29udGFpbmVyRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyYWdPdXRDb250YWluZXJFdmVudCwgW3tcbiAgICBrZXk6ICdvdmVyQ29udGFpbmVyJyxcblxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGNvbnRhaW5lciB5b3UgbGVmdFxuICAgICAqIEBwcm9wZXJ0eSBvdmVyQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRHJhZ091dENvbnRhaW5lckV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgcHJlc3N1cmUgZXZlbnRcbiAqIEBjbGFzcyBEcmFnUHJlc3N1cmVFdmVudFxuICogQG1vZHVsZSBEcmFnUHJlc3N1cmVFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnT3V0Q29udGFpbmVyRXZlbnQudHlwZSA9ICdkcmFnOm91dDpjb250YWluZXInO1xuXG52YXIgRHJhZ1ByZXNzdXJlRXZlbnQgPSBleHBvcnRzLkRyYWdQcmVzc3VyZUV2ZW50ID0gZnVuY3Rpb24gKF9EcmFnRXZlbnQ3KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyYWdQcmVzc3VyZUV2ZW50LCBfRHJhZ0V2ZW50Nyk7XG5cbiAgZnVuY3Rpb24gRHJhZ1ByZXNzdXJlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJhZ1ByZXNzdXJlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcmFnUHJlc3N1cmVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdQcmVzc3VyZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcmFnUHJlc3N1cmVFdmVudCwgW3tcbiAgICBrZXk6ICdwcmVzc3VyZScsXG5cblxuICAgIC8qKlxuICAgICAqIFByZXNzdXJlIGFwcGxpZWQgb24gZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgcHJlc3N1cmVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5wcmVzc3VyZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyYWdQcmVzc3VyZUV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG4vKipcbiAqIERyYWcgc3RvcCBldmVudFxuICogQGNsYXNzIERyYWdTdG9wRXZlbnRcbiAqIEBtb2R1bGUgRHJhZ1N0b3BFdmVudFxuICogQGV4dGVuZHMgRHJhZ0V2ZW50XG4gKi9cblxuXG5EcmFnUHJlc3N1cmVFdmVudC50eXBlID0gJ2RyYWc6cHJlc3N1cmUnO1xuXG52YXIgRHJhZ1N0b3BFdmVudCA9IGV4cG9ydHMuRHJhZ1N0b3BFdmVudCA9IGZ1bmN0aW9uIChfRHJhZ0V2ZW50OCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShEcmFnU3RvcEV2ZW50LCBfRHJhZ0V2ZW50OCk7XG5cbiAgZnVuY3Rpb24gRHJhZ1N0b3BFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcmFnU3RvcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJhZ1N0b3BFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyYWdTdG9wRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBEcmFnU3RvcEV2ZW50O1xufShEcmFnRXZlbnQpO1xuXG5EcmFnU3RvcEV2ZW50LnR5cGUgPSAnZHJhZzpzdG9wJztcblxuLyoqKi8gfSksXG4vKiAxMzggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9NaXJyb3JFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTM5KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdNaXJyb3JDcmVhdGVkRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfTWlycm9yRXZlbnQuTWlycm9yQ3JlYXRlZEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTWlycm9yQXR0YWNoZWRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9NaXJyb3JFdmVudC5NaXJyb3JBdHRhY2hlZEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTWlycm9yTW92ZUV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX01pcnJvckV2ZW50Lk1pcnJvck1vdmVFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ01pcnJvckRlc3Ryb3lFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9NaXJyb3JFdmVudC5NaXJyb3JEZXN0cm95RXZlbnQ7XG4gIH1cbn0pO1xuXG4vKioqLyB9KSxcbi8qIDEzOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5NaXJyb3JEZXN0cm95RXZlbnQgPSBleHBvcnRzLk1pcnJvck1vdmVFdmVudCA9IGV4cG9ydHMuTWlycm9yQXR0YWNoZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yQ3JlYXRlZEV2ZW50ID0gZXhwb3J0cy5NaXJyb3JFdmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfQWJzdHJhY3RFdmVudDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJzdHJhY3RFdmVudDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEJhc2UgbWlycm9yIGV2ZW50XG4gKiBAY2xhc3MgTWlycm9yRXZlbnRcbiAqIEBtb2R1bGUgTWlycm9yRXZlbnRcbiAqIEBleHRlbmRzIEFic3RyYWN0RXZlbnRcbiAqL1xudmFyIE1pcnJvckV2ZW50ID0gZXhwb3J0cy5NaXJyb3JFdmVudCA9IGZ1bmN0aW9uIChfQWJzdHJhY3RFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JFdmVudCwgX0Fic3RyYWN0RXZlbnQpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoTWlycm9yRXZlbnQsIFt7XG4gICAga2V5OiAnaGFzTWlycm9yJyxcblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIG1pcnJvciBoYXMgYmVlbiBjcmVhdGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzTWlycm9yKCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5taXJyb3IpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NvdXJjZScsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgc291cmNlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgc291cmNlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb3VyY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlcyBvcmlnaW5hbCBzb3VyY2UgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBvcmlnaW5hbFNvdXJjZVxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3JpZ2luYWxTb3VyY2UnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vcmlnaW5hbFNvdXJjZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGVzIG1pcnJvciBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG1pcnJvclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbWlycm9yJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubWlycm9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZXMgc291cmNlIGNvbnRhaW5lciBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IHNvdXJjZUNvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc291cmNlQ29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuc291cmNlQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbnNvciBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBzZW5zb3JFdmVudFxuICAgICAqIEB0eXBlIHtTZW5zb3JFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2Vuc29yRXZlbnQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zZW5zb3JFdmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBldmVudCB0aGF0IHRyaWdnZXJlZCBzZW5zb3IgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgb3JpZ2luYWxFdmVudFxuICAgICAqIEB0eXBlIHtFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb3JpZ2luYWxFdmVudCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBpZiAodGhpcy5zZW5zb3JFdmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5zb3JFdmVudC5vcmlnaW5hbEV2ZW50O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE1pcnJvckV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogTWlycm9yIGNyZWF0ZWQgZXZlbnRcbiAqIEBjbGFzcyBNaXJyb3JDcmVhdGVkRXZlbnRcbiAqIEBtb2R1bGUgTWlycm9yQ3JlYXRlZEV2ZW50XG4gKiBAZXh0ZW5kcyBNaXJyb3JFdmVudFxuICovXG5cblxudmFyIE1pcnJvckNyZWF0ZWRFdmVudCA9IGV4cG9ydHMuTWlycm9yQ3JlYXRlZEV2ZW50ID0gZnVuY3Rpb24gKF9NaXJyb3JFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JDcmVhdGVkRXZlbnQsIF9NaXJyb3JFdmVudCk7XG5cbiAgZnVuY3Rpb24gTWlycm9yQ3JlYXRlZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckNyZWF0ZWRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE1pcnJvckNyZWF0ZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1pcnJvckNyZWF0ZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIE1pcnJvckNyZWF0ZWRFdmVudDtcbn0oTWlycm9yRXZlbnQpO1xuXG4vKipcbiAqIE1pcnJvciBhdHRhY2hlZCBldmVudFxuICogQGNsYXNzIE1pcnJvckF0dGFjaGVkRXZlbnRcbiAqIEBtb2R1bGUgTWlycm9yQXR0YWNoZWRFdmVudFxuICogQGV4dGVuZHMgTWlycm9yRXZlbnRcbiAqL1xuXG5cbk1pcnJvckNyZWF0ZWRFdmVudC50eXBlID0gJ21pcnJvcjpjcmVhdGVkJztcblxudmFyIE1pcnJvckF0dGFjaGVkRXZlbnQgPSBleHBvcnRzLk1pcnJvckF0dGFjaGVkRXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JBdHRhY2hlZEV2ZW50LCBfTWlycm9yRXZlbnQyKTtcblxuICBmdW5jdGlvbiBNaXJyb3JBdHRhY2hlZEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1pcnJvckF0dGFjaGVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JBdHRhY2hlZEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWlycm9yQXR0YWNoZWRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIE1pcnJvckF0dGFjaGVkRXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuLyoqXG4gKiBNaXJyb3IgbW92ZSBldmVudFxuICogQGNsYXNzIE1pcnJvck1vdmVFdmVudFxuICogQG1vZHVsZSBNaXJyb3JNb3ZlRXZlbnRcbiAqIEBleHRlbmRzIE1pcnJvckV2ZW50XG4gKi9cblxuXG5NaXJyb3JBdHRhY2hlZEV2ZW50LnR5cGUgPSAnbWlycm9yOmF0dGFjaGVkJztcblxudmFyIE1pcnJvck1vdmVFdmVudCA9IGV4cG9ydHMuTWlycm9yTW92ZUV2ZW50ID0gZnVuY3Rpb24gKF9NaXJyb3JFdmVudDMpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTWlycm9yTW92ZUV2ZW50LCBfTWlycm9yRXZlbnQzKTtcblxuICBmdW5jdGlvbiBNaXJyb3JNb3ZlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTWlycm9yTW92ZUV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoTWlycm9yTW92ZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTWlycm9yTW92ZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gTWlycm9yTW92ZUV2ZW50O1xufShNaXJyb3JFdmVudCk7XG5cbi8qKlxuICogTWlycm9yIGRlc3Ryb3kgZXZlbnRcbiAqIEBjbGFzcyBNaXJyb3JEZXN0cm95RXZlbnRcbiAqIEBtb2R1bGUgTWlycm9yRGVzdHJveUV2ZW50XG4gKiBAZXh0ZW5kcyBNaXJyb3JFdmVudFxuICovXG5cblxuTWlycm9yTW92ZUV2ZW50LnR5cGUgPSAnbWlycm9yOm1vdmUnO1xuTWlycm9yTW92ZUV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgTWlycm9yRGVzdHJveUV2ZW50ID0gZXhwb3J0cy5NaXJyb3JEZXN0cm95RXZlbnQgPSBmdW5jdGlvbiAoX01pcnJvckV2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShNaXJyb3JEZXN0cm95RXZlbnQsIF9NaXJyb3JFdmVudDQpO1xuXG4gIGZ1bmN0aW9uIE1pcnJvckRlc3Ryb3lFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBNaXJyb3JEZXN0cm95RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNaXJyb3JEZXN0cm95RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNaXJyb3JEZXN0cm95RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBNaXJyb3JEZXN0cm95RXZlbnQ7XG59KE1pcnJvckV2ZW50KTtcblxuTWlycm9yRGVzdHJveUV2ZW50LnR5cGUgPSAnbWlycm9yOmRlc3Ryb3knO1xuTWlycm9yRGVzdHJveUV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG4vKioqLyB9KSxcbi8qIDE0MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0Ryb3BwYWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTQxKTtcblxudmFyIF9Ecm9wcGFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJvcHBhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0Ryb3BwYWJsZTIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxNDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b0NvbnN1bWFibGVBcnJheTIpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2dldDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKTtcblxudmFyIF9nZXQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0Mik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cbnZhciBfRHJhZ2dhYmxlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG52YXIgX0RyYWdnYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EcmFnZ2FibGUyKTtcblxudmFyIF9Ecm9wcGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQ4KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9uRHJhZ1N0YXJ0ID0gU3ltYm9sKCdvbkRyYWdTdGFydCcpO1xudmFyIG9uRHJhZ01vdmUgPSBTeW1ib2woJ29uRHJhZ01vdmUnKTtcbnZhciBvbkRyYWdTdG9wID0gU3ltYm9sKCdvbkRyYWdTdG9wJyk7XG52YXIgZHJvcCA9IFN5bWJvbCgnZHJvcCcpO1xudmFyIHJlbGVhc2UgPSBTeW1ib2woJ3JlbGVhc2UnKTtcbnZhciBjbG9zZXN0RHJvcHBhYmxlID0gU3ltYm9sKCdjbG9zZXN0RHJvcHBhYmxlJyk7XG52YXIgZ2V0RHJvcHBhYmxlcyA9IFN5bWJvbCgnZ2V0RHJvcHBhYmxlcycpO1xuXG52YXIgY2xhc3NlcyA9IHtcbiAgJ2Ryb3BwYWJsZTphY3RpdmUnOiAnZHJhZ2dhYmxlLWRyb3BwYWJsZS0tYWN0aXZlJyxcbiAgJ2Ryb3BwYWJsZTpvY2N1cGllZCc6ICdkcmFnZ2FibGUtZHJvcHBhYmxlLS1vY2N1cGllZCdcbn07XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgZHJvcHBhYmxlOiAnLmRyYWdnYWJsZS1kcm9wcGFibGUnXG59O1xuXG4vKipcbiAqIERyb3BwYWJsZSBpcyBidWlsdCBvbiB0b3Agb2YgRHJhZ2dhYmxlIGFuZCBhbGxvd3MgZHJvcHBpbmcgZHJhZ2dhYmxlIGVsZW1lbnRzXG4gKiBpbnRvIGRyb3BwYWJsZSBlbGVtZW50XG4gKiBAY2xhc3MgRHJvcHBhYmxlXG4gKiBAbW9kdWxlIERyb3BwYWJsZVxuICogQGV4dGVuZHMgRHJhZ2dhYmxlXG4gKi9cblxudmFyIERyb3BwYWJsZSA9IGZ1bmN0aW9uIChfRHJhZ2dhYmxlKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyb3BwYWJsZSwgX0RyYWdnYWJsZSk7XG5cbiAgLyoqXG4gICAqIERyb3BwYWJsZSBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgRHJvcHBhYmxlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIERyb3BwYWJsZSBjb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgRHJvcHBhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBEcm9wcGFibGUoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcm9wcGFibGUpO1xuXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJvcHBhYmxlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJvcHBhYmxlKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIF90aGlzLm9wdGlvbnMpO1xuXG4gICAgLyoqXG4gICAgICogQWxsIGRyb3BwYWJsZSBlbGVtZW50cyBvbiBkcmFnIHN0YXJ0XG4gICAgICogQHByb3BlcnR5IGRyb3BwYWJsZXNcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnRbXX1cbiAgICAgKi9cbiAgICBfdGhpcy5kcm9wcGFibGVzID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIExhc3QgZHJvcHBhYmxlIGVsZW1lbnQgdGhhdCB0aGUgc291cmNlIHdhcyBkcm9wcGVkIGludG9cbiAgICAgKiBAcHJvcGVydHkgbGFzdERyb3BwYWJsZVxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBfdGhpcy5sYXN0RHJvcHBhYmxlID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWwgZHJvcHBhYmxlIGVsZW1lbnQgdGhhdCB0aGUgc291cmNlIHdhcyBkcmFnIGZyb21cbiAgICAgKiBAcHJvcGVydHkgaW5pdGlhbERyb3BwYWJsZVxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBfdGhpcy5pbml0aWFsRHJvcHBhYmxlID0gbnVsbDtcblxuICAgIF90aGlzW29uRHJhZ1N0YXJ0XSA9IF90aGlzW29uRHJhZ1N0YXJ0XS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdNb3ZlXSA9IF90aGlzW29uRHJhZ01vdmVdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ1N0b3BdID0gX3RoaXNbb25EcmFnU3RvcF0uYmluZChfdGhpcyk7XG5cbiAgICBfdGhpcy5vbignZHJhZzpzdGFydCcsIF90aGlzW29uRHJhZ1N0YXJ0XSkub24oJ2RyYWc6bW92ZScsIF90aGlzW29uRHJhZ01vdmVdKS5vbignZHJhZzpzdG9wJywgX3RoaXNbb25EcmFnU3RvcF0pO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBEcm9wcGFibGUgaW5zdGFuY2UuXG4gICAqL1xuXG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoRHJvcHBhYmxlLCBbe1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgKDAsIF9nZXQzLmRlZmF1bHQpKERyb3BwYWJsZS5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wcGFibGUucHJvdG90eXBlKSwgJ2Rlc3Ryb3knLCB0aGlzKS5jYWxsKHRoaXMpO1xuXG4gICAgICB0aGlzLm9mZignZHJhZzpzdGFydCcsIHRoaXNbb25EcmFnU3RhcnRdKS5vZmYoJ2RyYWc6bW92ZScsIHRoaXNbb25EcmFnTW92ZV0pLm9mZignZHJhZzpzdG9wJywgdGhpc1tvbkRyYWdTdG9wXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjbGFzcyBuYW1lIGZvciBjbGFzcyBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIGNsYXNzIGlkZW50aWZpZXJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd8bnVsbH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2xhc3NOYW1lRm9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lRm9yKG5hbWUpIHtcbiAgICAgIHJldHVybiAoMCwgX2dldDMuZGVmYXVsdCkoRHJvcHBhYmxlLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZS5wcm90b3R5cGUpLCAnZ2V0Q2xhc3NOYW1lRm9yJywgdGhpcykuY2FsbCh0aGlzLCBuYW1lKSB8fCBjbGFzc2VzW25hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RhcnQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnU3RhcnRFdmVudH0gZXZlbnQgLSBEcmFnIHN0YXJ0IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnU3RhcnQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJvcHBhYmxlcyA9IFtdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KSh0aGlzW2dldERyb3BwYWJsZXNdKCkpKTtcbiAgICAgIHZhciBkcm9wcGFibGUgPSAoMCwgX3V0aWxzLmNsb3Nlc3QpKGV2ZW50LnNlbnNvckV2ZW50LnRhcmdldCwgdGhpcy5vcHRpb25zLmRyb3BwYWJsZSk7XG5cbiAgICAgIGlmICghZHJvcHBhYmxlKSB7XG4gICAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5pdGlhbERyb3BwYWJsZSA9IGRyb3BwYWJsZTtcblxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuZHJvcHBhYmxlc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgZHJvcHBhYmxlRWxlbWVudCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6b2NjdXBpZWQnKSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOmFjdGl2ZScpKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBtb3ZlIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ01vdmVFdmVudH0gZXZlbnQgLSBEcmFnIG1vdmUgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdNb3ZlLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZHJvcHBhYmxlID0gdGhpc1tjbG9zZXN0RHJvcHBhYmxlXShldmVudC5zZW5zb3JFdmVudC50YXJnZXQpO1xuICAgICAgdmFyIG92ZXJFbXB0eURyb3BwYWJsZSA9IGRyb3BwYWJsZSAmJiAhZHJvcHBhYmxlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmdldENsYXNzTmFtZUZvcignZHJvcHBhYmxlOm9jY3VwaWVkJykpO1xuXG4gICAgICBpZiAob3ZlckVtcHR5RHJvcHBhYmxlICYmIHRoaXNbZHJvcF0oZXZlbnQsIGRyb3BwYWJsZSkpIHtcbiAgICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlID0gZHJvcHBhYmxlO1xuICAgICAgfSBlbHNlIGlmICgoIWRyb3BwYWJsZSB8fCBkcm9wcGFibGUgPT09IHRoaXMuaW5pdGlhbERyb3BwYWJsZSkgJiYgdGhpcy5sYXN0RHJvcHBhYmxlKSB7XG4gICAgICAgIHRoaXNbcmVsZWFzZV0oZXZlbnQpO1xuICAgICAgICB0aGlzLmxhc3REcm9wcGFibGUgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RvcCBoYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdTdG9wRXZlbnR9IGV2ZW50IC0gRHJhZyBzdG9wIGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnU3RvcCxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgICB2YXIgb2NjdXBpZWRDbGFzcyA9IHRoaXMuZ2V0Q2xhc3NOYW1lRm9yKCdkcm9wcGFibGU6b2NjdXBpZWQnKTtcblxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmRyb3BwYWJsZXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgZHJvcHBhYmxlID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgZHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTphY3RpdmUnKSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGFzdERyb3BwYWJsZSAmJiB0aGlzLmxhc3REcm9wcGFibGUgIT09IHRoaXMuaW5pdGlhbERyb3BwYWJsZSkge1xuICAgICAgICB0aGlzLmluaXRpYWxEcm9wcGFibGUuY2xhc3NMaXN0LnJlbW92ZShvY2N1cGllZENsYXNzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kcm9wcGFibGVzID0gbnVsbDtcbiAgICAgIHRoaXMubGFzdERyb3BwYWJsZSA9IG51bGw7XG4gICAgICB0aGlzLmluaXRpYWxEcm9wcGFibGUgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyb3AgbWV0aG9kIGRyb3BzIGEgZHJhZ2dhYmxlIGVsZW1lbnQgaW50byBhIGRyb3BwYWJsZSBlbGVtZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0RyYWdNb3ZlRXZlbnR9IGV2ZW50IC0gRHJhZyBtb3ZlIGV2ZW50XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZHJvcHBhYmxlIC0gRHJvcHBhYmxlIGVsZW1lbnQgdG8gZHJvcCBkcmFnZ2FibGUgaW50b1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IGRyb3AsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50LCBkcm9wcGFibGUpIHtcbiAgICAgIHZhciBkcm9wcGFibGVPdmVyRXZlbnQgPSBuZXcgX0Ryb3BwYWJsZUV2ZW50LkRyb3BwYWJsZU92ZXJFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGRyb3BwYWJsZTogZHJvcHBhYmxlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKGRyb3BwYWJsZU92ZXJFdmVudCk7XG5cbiAgICAgIGlmIChkcm9wcGFibGVPdmVyRXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBvY2N1cGllZENsYXNzID0gdGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpO1xuXG4gICAgICBpZiAodGhpcy5sYXN0RHJvcHBhYmxlKSB7XG4gICAgICAgIHRoaXMubGFzdERyb3BwYWJsZS5jbGFzc0xpc3QucmVtb3ZlKG9jY3VwaWVkQ2xhc3MpO1xuICAgICAgfVxuXG4gICAgICBkcm9wcGFibGUuYXBwZW5kQ2hpbGQoZXZlbnQuc291cmNlKTtcbiAgICAgIGRyb3BwYWJsZS5jbGFzc0xpc3QuYWRkKG9jY3VwaWVkQ2xhc3MpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWxlYXNlIG1ldGhvZCBtb3ZlcyB0aGUgcHJldmlvdXNseSBkcm9wcGVkIGVsZW1lbnQgYmFjayBpbnRvIGl0cyBvcmlnaW5hbCBwb3NpdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnTW92ZUV2ZW50fSBldmVudCAtIERyYWcgbW92ZSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IHJlbGVhc2UsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgZHJvcHBhYmxlT3V0RXZlbnQgPSBuZXcgX0Ryb3BwYWJsZUV2ZW50LkRyb3BwYWJsZU91dEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgZHJvcHBhYmxlOiB0aGlzLmxhc3REcm9wcGFibGVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoZHJvcHBhYmxlT3V0RXZlbnQpO1xuXG4gICAgICBpZiAoZHJvcHBhYmxlT3V0RXZlbnQuY2FuY2VsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5pdGlhbERyb3BwYWJsZS5hcHBlbmRDaGlsZChldmVudC5zb3VyY2UpO1xuICAgICAgdGhpcy5sYXN0RHJvcHBhYmxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5nZXRDbGFzc05hbWVGb3IoJ2Ryb3BwYWJsZTpvY2N1cGllZCcpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNsb3Nlc3QgZHJvcHBhYmxlIGVsZW1lbnQgZm9yIGV2ZW4gdGFyZ2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSBFdmVudCB0YXJnZXRcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudHxudWxsfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IGNsb3Nlc3REcm9wcGFibGUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHRhcmdldCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICghdGhpcy5kcm9wcGFibGVzKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKDAsIF91dGlscy5jbG9zZXN0KSh0YXJnZXQsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuZHJvcHBhYmxlcy5pbmNsdWRlcyhlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGN1cnJlbnQgZHJvcHBhYmxlIGVsZW1lbnRzIGZvciB0aGlzIGRyYWdnYWJsZSBpbnN0YW5jZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybiB7Tm9kZUxpc3R8SFRNTEVsZW1lbnRbXXxBcnJheX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBnZXREcm9wcGFibGVzLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICAgIHZhciBkcm9wcGFibGVzID0gdGhpcy5vcHRpb25zLmRyb3BwYWJsZTtcblxuICAgICAgaWYgKHR5cGVvZiBkcm9wcGFibGVzID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChkcm9wcGFibGVzKTtcbiAgICAgIH0gZWxzZSBpZiAoZHJvcHBhYmxlcyBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGRyb3BwYWJsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gZHJvcHBhYmxlcztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRyb3BwYWJsZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGRyb3BwYWJsZXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyb3BwYWJsZTtcbn0oX0RyYWdnYWJsZTMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERyb3BwYWJsZTtcblxuLyoqKi8gfSksXG4vKiAxNDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0MyksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiAxNDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygxNDQpO1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuLyoqKi8gfSksXG4vKiAxNDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcbiAgLCAkZ2V0UHJvdG90eXBlT2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg1NikoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KXtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuLyoqKi8gfSksXG4vKiAxNDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0NiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiAxNDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygxNDcpO1xudmFyICRPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICByZXR1cm4gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG59O1xuXG4vKioqLyB9KSxcbi8qIDE0NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG52YXIgdG9JT2JqZWN0ICAgICAgICAgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcbiAgLCAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSkuZjtcblxuX193ZWJwYWNrX3JlcXVpcmVfXyg1NikoJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG9JT2JqZWN0KGl0KSwga2V5KTtcbiAgfTtcbn0pO1xuXG4vKioqLyB9KSxcbi8qIDE0OCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0Ryb3BwYWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNDkpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0Ryb3BwYWJsZU92ZXJFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Ecm9wcGFibGVFdmVudC5Ecm9wcGFibGVPdmVyRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdEcm9wcGFibGVPdXRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Ecm9wcGFibGVFdmVudC5Ecm9wcGFibGVPdXRFdmVudDtcbiAgfVxufSk7XG5cbi8qKiovIH0pLFxuLyogMTQ5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRyb3BwYWJsZU91dEV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVPdmVyRXZlbnQgPSBleHBvcnRzLkRyb3BwYWJsZUV2ZW50ID0gdW5kZWZpbmVkO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfQWJzdHJhY3RFdmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BYnN0cmFjdEV2ZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQmFzZSBkcm9wcGFibGUgZXZlbnRcbiAqIEBjbGFzcyBEcm9wcGFibGVFdmVudFxuICogQG1vZHVsZSBEcm9wcGFibGVFdmVudFxuICogQGV4dGVuZHMgQWJzdHJhY3RFdmVudFxuICovXG52YXIgRHJvcHBhYmxlRXZlbnQgPSBleHBvcnRzLkRyb3BwYWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyb3BwYWJsZUV2ZW50LCBfQWJzdHJhY3RFdmVudCk7XG5cbiAgZnVuY3Rpb24gRHJvcHBhYmxlRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChEcm9wcGFibGVFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3BwYWJsZUV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcm9wcGFibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBkcmFnIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoaXMgZHJvcHBhYmxlIGV2ZW50XG4gICAgICogQHByb3BlcnR5IGRyYWdFdmVudFxuICAgICAqIEB0eXBlIHtEcmFnRXZlbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyYWdFdmVudDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyb3BwYWJsZUV2ZW50O1xufShfQWJzdHJhY3RFdmVudDMuZGVmYXVsdCk7XG5cbi8qKlxuICogRHJvcHBhYmxlIG92ZXIgZXZlbnRcbiAqIEBjbGFzcyBEcm9wcGFibGVPdmVyRXZlbnRcbiAqIEBtb2R1bGUgRHJvcHBhYmxlT3ZlckV2ZW50XG4gKiBAZXh0ZW5kcyBEcm9wcGFibGVFdmVudFxuICovXG5cblxuRHJvcHBhYmxlRXZlbnQudHlwZSA9ICdkcm9wcGFibGUnO1xuXG52YXIgRHJvcHBhYmxlT3ZlckV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVPdmVyRXZlbnQgPSBmdW5jdGlvbiAoX0Ryb3BwYWJsZUV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyb3BwYWJsZU92ZXJFdmVudCwgX0Ryb3BwYWJsZUV2ZW50KTtcblxuICBmdW5jdGlvbiBEcm9wcGFibGVPdmVyRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRHJvcHBhYmxlT3ZlckV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRHJvcHBhYmxlT3ZlckV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJvcHBhYmxlT3ZlckV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEcm9wcGFibGVPdmVyRXZlbnQsIFt7XG4gICAga2V5OiAnZHJvcHBhYmxlJyxcblxuXG4gICAgLyoqXG4gICAgICogVGhlIGRyb3BwYWJsZSBlbGVtZW50IHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBkcm9wcGFibGVcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLmRyb3BwYWJsZTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERyb3BwYWJsZU92ZXJFdmVudDtcbn0oRHJvcHBhYmxlRXZlbnQpO1xuXG4vKipcbiAqIERyb3BwYWJsZSBvdXQgZXZlbnRcbiAqIEBjbGFzcyBEcm9wcGFibGVPdXRFdmVudFxuICogQG1vZHVsZSBEcm9wcGFibGVPdXRFdmVudFxuICogQGV4dGVuZHMgRHJvcHBhYmxlRXZlbnRcbiAqL1xuXG5cbkRyb3BwYWJsZU92ZXJFdmVudC50eXBlID0gJ2Ryb3BwYWJsZTpvdmVyJztcbkRyb3BwYWJsZU92ZXJFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIERyb3BwYWJsZU91dEV2ZW50ID0gZXhwb3J0cy5Ecm9wcGFibGVPdXRFdmVudCA9IGZ1bmN0aW9uIChfRHJvcHBhYmxlRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKERyb3BwYWJsZU91dEV2ZW50LCBfRHJvcHBhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBEcm9wcGFibGVPdXRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBEcm9wcGFibGVPdXRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKERyb3BwYWJsZU91dEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJvcHBhYmxlT3V0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKERyb3BwYWJsZU91dEV2ZW50LCBbe1xuICAgIGtleTogJ2Ryb3BwYWJsZScsXG5cblxuICAgIC8qKlxuICAgICAqIFRoZSBkcm9wcGFibGUgZWxlbWVudCB5b3UgX3dlcmVfIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgZHJvcHBhYmxlXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kcm9wcGFibGU7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBEcm9wcGFibGVPdXRFdmVudDtcbn0oRHJvcHBhYmxlRXZlbnQpO1xuXG5Ecm9wcGFibGVPdXRFdmVudC50eXBlID0gJ2Ryb3BwYWJsZTpvdXQnO1xuRHJvcHBhYmxlT3V0RXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbi8qKiovIH0pLFxuLyogMTUwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfU3dhcHBhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNTEpO1xuXG52YXIgX1N3YXBwYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Td2FwcGFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfU3dhcHBhYmxlMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDE1MSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2dldDIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKTtcblxudmFyIF9nZXQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0Mik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0RyYWdnYWJsZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxudmFyIF9EcmFnZ2FibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRHJhZ2dhYmxlMik7XG5cbnZhciBfU3dhcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBvbkRyYWdTdGFydCA9IFN5bWJvbCgnb25EcmFnU3RhcnQnKTtcbnZhciBvbkRyYWdPdmVyID0gU3ltYm9sKCdvbkRyYWdPdmVyJyk7XG52YXIgb25EcmFnU3RvcCA9IFN5bWJvbCgnb25EcmFnU3RvcCcpO1xuXG4vKipcbiAqIFN3YXBwYWJsZSBpcyBidWlsdCBvbiB0b3Agb2YgRHJhZ2dhYmxlIGFuZCBhbGxvd3Mgc3dhcHBpbmcgb2YgZHJhZ2dhYmxlIGVsZW1lbnRzLlxuICogT3JkZXIgaXMgaXJyZWxldmFudCB0byBTd2FwcGFibGUuXG4gKiBAY2xhc3MgU3dhcHBhYmxlXG4gKiBAbW9kdWxlIFN3YXBwYWJsZVxuICogQGV4dGVuZHMgRHJhZ2dhYmxlXG4gKi9cblxudmFyIFN3YXBwYWJsZSA9IGZ1bmN0aW9uIChfRHJhZ2dhYmxlKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFN3YXBwYWJsZSwgX0RyYWdnYWJsZSk7XG5cbiAgLyoqXG4gICAqIFN3YXBwYWJsZSBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgU3dhcHBhYmxlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXXxOb2RlTGlzdHxIVE1MRWxlbWVudH0gY29udGFpbmVycyAtIFN3YXBwYWJsZSBjb250YWluZXJzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgU3dhcHBhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBTd2FwcGFibGUoKSB7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGUpO1xuXG4gICAgLyoqXG4gICAgICogTGFzdCBkcmFnZ2FibGUgZWxlbWVudCB0aGF0IHdhcyBkcmFnZ2VkIG92ZXJcbiAgICAgKiBAcHJvcGVydHkgbGFzdE92ZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdmFyIF90aGlzID0gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlKSkuY2FsbCh0aGlzLCBjb250YWluZXJzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5sYXN0T3ZlciA9IG51bGw7XG5cbiAgICBfdGhpc1tvbkRyYWdTdGFydF0gPSBfdGhpc1tvbkRyYWdTdGFydF0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnT3Zlcl0gPSBfdGhpc1tvbkRyYWdPdmVyXS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdTdG9wXSA9IF90aGlzW29uRHJhZ1N0b3BdLmJpbmQoX3RoaXMpO1xuXG4gICAgX3RoaXMub24oJ2RyYWc6c3RhcnQnLCBfdGhpc1tvbkRyYWdTdGFydF0pLm9uKCdkcmFnOm92ZXInLCBfdGhpc1tvbkRyYWdPdmVyXSkub24oJ2RyYWc6c3RvcCcsIF90aGlzW29uRHJhZ1N0b3BdKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgU3dhcHBhYmxlIGluc3RhbmNlLlxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBwYWJsZSwgW3tcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICgwLCBfZ2V0My5kZWZhdWx0KShTd2FwcGFibGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlLnByb3RvdHlwZSksICdkZXN0cm95JywgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgdGhpcy5vZmYoJ2RyYWc6c3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCkub2ZmKCdkcmFnOm92ZXInLCB0aGlzLl9vbkRyYWdPdmVyKS5vZmYoJ2RyYWc6c3RvcCcsIHRoaXMuX29uRHJhZ1N0b3ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgc3RhcnQgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnU3RhcnRFdmVudH0gZXZlbnQgLSBEcmFnIHN0YXJ0IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogb25EcmFnU3RhcnQsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICB2YXIgc3dhcHBhYmxlU3RhcnRFdmVudCA9IG5ldyBfU3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3RhcnRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc3dhcHBhYmxlU3RhcnRFdmVudCk7XG5cbiAgICAgIGlmIChzd2FwcGFibGVTdGFydEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgZXZlbnQuY2FuY2VsKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBvdmVyIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ092ZXJFdmVudH0gZXZlbnQgLSBEcmFnIG92ZXIgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdPdmVyLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKGV2ZW50Lm92ZXIgPT09IGV2ZW50Lm9yaWdpbmFsU291cmNlIHx8IGV2ZW50Lm92ZXIgPT09IGV2ZW50LnNvdXJjZSB8fCBldmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHN3YXBwYWJsZVN3YXBFdmVudCA9IG5ldyBfU3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3dhcEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgb3ZlcjogZXZlbnQub3ZlcixcbiAgICAgICAgb3ZlckNvbnRhaW5lcjogZXZlbnQub3ZlckNvbnRhaW5lclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzd2FwcGFibGVTd2FwRXZlbnQpO1xuXG4gICAgICBpZiAoc3dhcHBhYmxlU3dhcEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBzd2FwIG9yaWdpbmFsbHkgc3dhcHBlZCBlbGVtZW50IGJhY2tcbiAgICAgIGlmICh0aGlzLmxhc3RPdmVyICYmIHRoaXMubGFzdE92ZXIgIT09IGV2ZW50Lm92ZXIpIHtcbiAgICAgICAgc3dhcCh0aGlzLmxhc3RPdmVyLCBldmVudC5zb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5sYXN0T3ZlciA9PT0gZXZlbnQub3Zlcikge1xuICAgICAgICB0aGlzLmxhc3RPdmVyID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGFzdE92ZXIgPSBldmVudC5vdmVyO1xuICAgICAgfVxuXG4gICAgICBzd2FwKGV2ZW50LnNvdXJjZSwgZXZlbnQub3Zlcik7XG5cbiAgICAgIHZhciBzd2FwcGFibGVTd2FwcGVkRXZlbnQgPSBuZXcgX1N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN3YXBwZWRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIHN3YXBwZWRFbGVtZW50OiBldmVudC5vdmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHN3YXBwYWJsZVN3YXBwZWRFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdG9wIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ1N0b3BFdmVudH0gZXZlbnQgLSBEcmFnIHN0b3AgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdG9wLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIHN3YXBwYWJsZVN0b3BFdmVudCA9IG5ldyBfU3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3RvcEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzd2FwcGFibGVTdG9wRXZlbnQpO1xuICAgICAgdGhpcy5sYXN0T3ZlciA9IG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTd2FwcGFibGU7XG59KF9EcmFnZ2FibGUzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTd2FwcGFibGU7XG5cblxuZnVuY3Rpb24gd2l0aFRlbXBFbGVtZW50KGNhbGxiYWNrKSB7XG4gIHZhciB0bXBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNhbGxiYWNrKHRtcEVsZW1lbnQpO1xuICB0bXBFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodG1wRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHN3YXAoc291cmNlLCBvdmVyKSB7XG4gIHZhciBvdmVyUGFyZW50ID0gb3Zlci5wYXJlbnROb2RlO1xuICB2YXIgc291cmNlUGFyZW50ID0gc291cmNlLnBhcmVudE5vZGU7XG5cbiAgd2l0aFRlbXBFbGVtZW50KGZ1bmN0aW9uICh0bXBFbGVtZW50KSB7XG4gICAgc291cmNlUGFyZW50Lmluc2VydEJlZm9yZSh0bXBFbGVtZW50LCBzb3VyY2UpO1xuICAgIG92ZXJQYXJlbnQuaW5zZXJ0QmVmb3JlKHNvdXJjZSwgb3Zlcik7XG4gICAgc291cmNlUGFyZW50Lmluc2VydEJlZm9yZShvdmVyLCB0bXBFbGVtZW50KTtcbiAgfSk7XG59XG5cbi8qKiovIH0pLFxuLyogMTUyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfU3dhcHBhYmxlRXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1Myk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU3dhcHBhYmxlU3RhcnRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTdGFydEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU3dhcHBhYmxlU3dhcEV2ZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1N3YXBwYWJsZUV2ZW50LlN3YXBwYWJsZVN3YXBFdmVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1N3YXBwYWJsZVN3YXBwZWRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Td2FwcGFibGVFdmVudC5Td2FwcGFibGVTd2FwcGVkRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTd2FwcGFibGVTdG9wRXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU3dhcHBhYmxlRXZlbnQuU3dhcHBhYmxlU3RvcEV2ZW50O1xuICB9XG59KTtcblxuLyoqKi8gfSksXG4vKiAxNTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU3dhcHBhYmxlU3RvcEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTd2FwcGVkRXZlbnQgPSBleHBvcnRzLlN3YXBwYWJsZVN3YXBFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3RhcnRFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIHN3YXBwYWJsZSBldmVudFxuICogQGNsYXNzIFN3YXBwYWJsZUV2ZW50XG4gKiBAbW9kdWxlIFN3YXBwYWJsZUV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBTd2FwcGFibGVFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlRXZlbnQgPSBmdW5jdGlvbiAoX0Fic3RyYWN0RXZlbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGVFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBwYWJsZUV2ZW50LCBbe1xuICAgIGtleTogJ2RyYWdFdmVudCcsXG5cblxuICAgIC8qKlxuICAgICAqIE9yaWdpbmFsIGRyYWcgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhpcyBzd2FwcGFibGUgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgZHJhZ0V2ZW50XG4gICAgICogQHR5cGUge0RyYWdFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3dhcHBhYmxlRXZlbnQ7XG59KF9BYnN0cmFjdEV2ZW50My5kZWZhdWx0KTtcblxuLyoqXG4gKiBTd2FwcGFibGUgc3RhcnQgZXZlbnRcbiAqIEBjbGFzcyBTd2FwcGFibGVTdGFydEV2ZW50XG4gKiBAbW9kdWxlIFN3YXBwYWJsZVN0YXJ0RXZlbnRcbiAqIEBleHRlbmRzIFN3YXBwYWJsZUV2ZW50XG4gKi9cblxuXG5Td2FwcGFibGVFdmVudC50eXBlID0gJ3N3YXBwYWJsZSc7XG5cbnZhciBTd2FwcGFibGVTdGFydEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTdGFydEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGVTdGFydEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZVN0YXJ0RXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3RhcnRFdmVudCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFN3YXBwYWJsZVN0YXJ0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGVTdGFydEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gU3dhcHBhYmxlU3RhcnRFdmVudDtcbn0oU3dhcHBhYmxlRXZlbnQpO1xuXG4vKipcbiAqIFN3YXBwYWJsZSBzd2FwIGV2ZW50XG4gKiBAY2xhc3MgU3dhcHBhYmxlU3dhcEV2ZW50XG4gKiBAbW9kdWxlIFN3YXBwYWJsZVN3YXBFdmVudFxuICogQGV4dGVuZHMgU3dhcHBhYmxlRXZlbnRcbiAqL1xuXG5cblN3YXBwYWJsZVN0YXJ0RXZlbnQudHlwZSA9ICdzd2FwcGFibGU6c3RhcnQnO1xuU3dhcHBhYmxlU3RhcnRFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIFN3YXBwYWJsZVN3YXBFdmVudCA9IGV4cG9ydHMuU3dhcHBhYmxlU3dhcEV2ZW50ID0gZnVuY3Rpb24gKF9Td2FwcGFibGVFdmVudDIpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU3dhcHBhYmxlU3dhcEV2ZW50LCBfU3dhcHBhYmxlRXZlbnQyKTtcblxuICBmdW5jdGlvbiBTd2FwcGFibGVTd2FwRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU3dhcHBhYmxlU3dhcEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU3dhcHBhYmxlU3dhcEV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3dhcHBhYmxlU3dhcEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTd2FwcGFibGVTd2FwRXZlbnQsIFt7XG4gICAga2V5OiAnb3ZlcicsXG5cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBlbGVtZW50IHlvdSBhcmUgb3ZlclxuICAgICAqIEBwcm9wZXJ0eSBvdmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdnYWJsZSBjb250YWluZXIgeW91IGFyZSBvdmVyXG4gICAgICogQHByb3BlcnR5IG92ZXJDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vdmVyQ29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3dhcHBhYmxlU3dhcEV2ZW50O1xufShTd2FwcGFibGVFdmVudCk7XG5cbi8qKlxuICogU3dhcHBhYmxlIHN3YXBwZWQgZXZlbnRcbiAqIEBjbGFzcyBTd2FwcGFibGVTd2FwcGVkRXZlbnRcbiAqIEBtb2R1bGUgU3dhcHBhYmxlU3dhcHBlZEV2ZW50XG4gKiBAZXh0ZW5kcyBTd2FwcGFibGVFdmVudFxuICovXG5cblxuU3dhcHBhYmxlU3dhcEV2ZW50LnR5cGUgPSAnc3dhcHBhYmxlOnN3YXAnO1xuU3dhcHBhYmxlU3dhcEV2ZW50LmNhbmNlbGFibGUgPSB0cnVlO1xuXG52YXIgU3dhcHBhYmxlU3dhcHBlZEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTd2FwcGVkRXZlbnQgPSBmdW5jdGlvbiAoX1N3YXBwYWJsZUV2ZW50Mykge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGVTd2FwcGVkRXZlbnQsIF9Td2FwcGFibGVFdmVudDMpO1xuXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZVN3YXBwZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGVTd2FwcGVkRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGVTd2FwcGVkRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGVTd2FwcGVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFN3YXBwYWJsZVN3YXBwZWRFdmVudCwgW3tcbiAgICBrZXk6ICdzd2FwcGVkRWxlbWVudCcsXG5cblxuICAgIC8qKlxuICAgICAqIFRoZSBkcmFnZ2FibGUgZWxlbWVudCB0aGF0IHlvdSBzd2FwcGVkIHdpdGhcbiAgICAgKiBAcHJvcGVydHkgc3dhcHBlZEVsZW1lbnRcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnN3YXBwZWRFbGVtZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3dhcHBhYmxlU3dhcHBlZEV2ZW50O1xufShTd2FwcGFibGVFdmVudCk7XG5cbi8qKlxuICogU3dhcHBhYmxlIHN0b3AgZXZlbnRcbiAqIEBjbGFzcyBTd2FwcGFibGVTdG9wRXZlbnRcbiAqIEBtb2R1bGUgU3dhcHBhYmxlU3RvcEV2ZW50XG4gKiBAZXh0ZW5kcyBTd2FwcGFibGVFdmVudFxuICovXG5cblxuU3dhcHBhYmxlU3dhcHBlZEV2ZW50LnR5cGUgPSAnc3dhcHBhYmxlOnN3YXBwZWQnO1xuXG52YXIgU3dhcHBhYmxlU3RvcEV2ZW50ID0gZXhwb3J0cy5Td2FwcGFibGVTdG9wRXZlbnQgPSBmdW5jdGlvbiAoX1N3YXBwYWJsZUV2ZW50NCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTd2FwcGFibGVTdG9wRXZlbnQsIF9Td2FwcGFibGVFdmVudDQpO1xuXG4gIGZ1bmN0aW9uIFN3YXBwYWJsZVN0b3BFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTd2FwcGFibGVTdG9wRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTd2FwcGFibGVTdG9wRXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2FwcGFibGVTdG9wRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBTd2FwcGFibGVTdG9wRXZlbnQ7XG59KFN3YXBwYWJsZUV2ZW50KTtcblxuU3dhcHBhYmxlU3RvcEV2ZW50LnR5cGUgPSAnc3dhcHBhYmxlOnN0b3AnO1xuXG4vKioqLyB9KSxcbi8qIDE1NCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX1NvcnRhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNTUpO1xuXG52YXIgX1NvcnRhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnRhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1NvcnRhYmxlMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDE1NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MiA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvQ29uc3VtYWJsZUFycmF5Mik7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfZ2V0MiA9IF9fd2VicGFja19yZXF1aXJlX18oNDIpO1xuXG52YXIgX2dldDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXQyKTtcblxudmFyIF9pbmhlcml0czIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbnZhciBfRHJhZ2dhYmxlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG52YXIgX0RyYWdnYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EcmFnZ2FibGUyKTtcblxudmFyIF9Tb3J0YWJsZUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNTYpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb25EcmFnU3RhcnQgPSBTeW1ib2woJ29uRHJhZ1N0YXJ0Jyk7XG52YXIgb25EcmFnT3ZlckNvbnRhaW5lciA9IFN5bWJvbCgnb25EcmFnT3ZlckNvbnRhaW5lcicpO1xudmFyIG9uRHJhZ092ZXIgPSBTeW1ib2woJ29uRHJhZ092ZXInKTtcbnZhciBvbkRyYWdTdG9wID0gU3ltYm9sKCdvbkRyYWdTdG9wJyk7XG5cbi8qKlxuICogU29ydGFibGUgaXMgYnVpbHQgb24gdG9wIG9mIERyYWdnYWJsZSBhbmQgYWxsb3dzIHNvcnRpbmcgb2YgZHJhZ2dhYmxlIGVsZW1lbnRzLiBTb3J0YWJsZSB3aWxsIGtlZXBcbiAqIHRyYWNrIG9mIHRoZSBvcmlnaW5hbCBpbmRleCBhbmQgZW1pdHMgdGhlIG5ldyBpbmRleCBhcyB5b3UgZHJhZyBvdmVyIGRyYWdnYWJsZSBlbGVtZW50cy5cbiAqIEBjbGFzcyBTb3J0YWJsZVxuICogQG1vZHVsZSBTb3J0YWJsZVxuICogQGV4dGVuZHMgRHJhZ2dhYmxlXG4gKi9cblxudmFyIFNvcnRhYmxlID0gZnVuY3Rpb24gKF9EcmFnZ2FibGUpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGUsIF9EcmFnZ2FibGUpO1xuXG4gIC8qKlxuICAgKiBTb3J0YWJsZSBjb25zdHJ1Y3Rvci5cbiAgICogQGNvbnN0cnVjdHMgU29ydGFibGVcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfE5vZGVMaXN0fEhUTUxFbGVtZW50fSBjb250YWluZXJzIC0gU29ydGFibGUgY29udGFpbmVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIFNvcnRhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBTb3J0YWJsZSgpIHtcbiAgICB2YXIgY29udGFpbmVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlKTtcblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IGluZGV4IG9mIHNvdXJjZSBvbiBkcmFnIHN0YXJ0XG4gICAgICogQHByb3BlcnR5IHN0YXJ0SW5kZXhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKFNvcnRhYmxlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGUpKS5jYWxsKHRoaXMsIGNvbnRhaW5lcnMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLnN0YXJ0SW5kZXggPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogc3RhcnQgY29udGFpbmVyIG9uIGRyYWcgc3RhcnRcbiAgICAgKiBAcHJvcGVydHkgc3RhcnRDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIF90aGlzLnN0YXJ0Q29udGFpbmVyID0gbnVsbDtcblxuICAgIF90aGlzW29uRHJhZ1N0YXJ0XSA9IF90aGlzW29uRHJhZ1N0YXJ0XS5iaW5kKF90aGlzKTtcbiAgICBfdGhpc1tvbkRyYWdPdmVyQ29udGFpbmVyXSA9IF90aGlzW29uRHJhZ092ZXJDb250YWluZXJdLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzW29uRHJhZ092ZXJdID0gX3RoaXNbb25EcmFnT3Zlcl0uYmluZChfdGhpcyk7XG4gICAgX3RoaXNbb25EcmFnU3RvcF0gPSBfdGhpc1tvbkRyYWdTdG9wXS5iaW5kKF90aGlzKTtcblxuICAgIF90aGlzLm9uKCdkcmFnOnN0YXJ0JywgX3RoaXNbb25EcmFnU3RhcnRdKS5vbignZHJhZzpvdmVyOmNvbnRhaW5lcicsIF90aGlzW29uRHJhZ092ZXJDb250YWluZXJdKS5vbignZHJhZzpvdmVyJywgX3RoaXNbb25EcmFnT3Zlcl0pLm9uKCdkcmFnOnN0b3AnLCBfdGhpc1tvbkRyYWdTdG9wXSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIFNvcnRhYmxlIGluc3RhbmNlLlxuICAgKi9cblxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlLCBbe1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgKDAsIF9nZXQzLmRlZmF1bHQpKFNvcnRhYmxlLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlLnByb3RvdHlwZSksICdkZXN0cm95JywgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgdGhpcy5vZmYoJ2RyYWc6c3RhcnQnLCB0aGlzW29uRHJhZ1N0YXJ0XSkub2ZmKCdkcmFnOm92ZXI6Y29udGFpbmVyJywgdGhpc1tvbkRyYWdPdmVyQ29udGFpbmVyXSkub2ZmKCdkcmFnOm92ZXInLCB0aGlzW29uRHJhZ092ZXJdKS5vZmYoJ2RyYWc6c3RvcCcsIHRoaXNbb25EcmFnU3RvcF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpbmRleCBvZiBlbGVtZW50IHdpdGhpbiBpdHMgY29udGFpbmVyIGR1cmluZyBkcmFnIG9wZXJhdGlvbiwgaS5lLiBleGNsdWRpbmcgbWlycm9yIGFuZCBvcmlnaW5hbCBzb3VyY2VcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gQW4gZWxlbWVudFxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaW5kZXgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmRleChlbGVtZW50KSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgcmV0dXJuIFtdLmNvbmNhdCgoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KShlbGVtZW50LnBhcmVudE5vZGUuY2hpbGRyZW4pKS5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gY2hpbGRFbGVtZW50ICE9PSBfdGhpczIub3JpZ2luYWxTb3VyY2UgJiYgY2hpbGRFbGVtZW50ICE9PSBfdGhpczIubWlycm9yO1xuICAgICAgfSkuaW5kZXhPZihlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIHN0YXJ0IGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ1N0YXJ0RXZlbnR9IGV2ZW50IC0gRHJhZyBzdGFydCBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ1N0YXJ0LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdGhpcy5zdGFydENvbnRhaW5lciA9IGV2ZW50LnNvdXJjZS5wYXJlbnROb2RlO1xuICAgICAgdGhpcy5zdGFydEluZGV4ID0gdGhpcy5pbmRleChldmVudC5zb3VyY2UpO1xuXG4gICAgICB2YXIgc29ydGFibGVTdGFydEV2ZW50ID0gbmV3IF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU3RhcnRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuc3RhcnRJbmRleCxcbiAgICAgICAgc3RhcnRDb250YWluZXI6IHRoaXMuc3RhcnRDb250YWluZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc29ydGFibGVTdGFydEV2ZW50KTtcblxuICAgICAgaWYgKHNvcnRhYmxlU3RhcnRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWcgb3ZlciBjb250YWluZXIgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnT3ZlckNvbnRhaW5lckV2ZW50fSBldmVudCAtIERyYWcgb3ZlciBjb250YWluZXIgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdPdmVyQ29udGFpbmVyLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc291cmNlID0gZXZlbnQuc291cmNlLFxuICAgICAgICAgIG92ZXIgPSBldmVudC5vdmVyLFxuICAgICAgICAgIG92ZXJDb250YWluZXIgPSBldmVudC5vdmVyQ29udGFpbmVyO1xuXG4gICAgICB2YXIgb2xkSW5kZXggPSB0aGlzLmluZGV4KHNvdXJjZSk7XG5cbiAgICAgIHZhciBzb3J0YWJsZVNvcnRFdmVudCA9IG5ldyBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVNvcnRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIGN1cnJlbnRJbmRleDogb2xkSW5kZXgsXG4gICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICBvdmVyOiBvdmVyXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHNvcnRhYmxlU29ydEV2ZW50KTtcblxuICAgICAgaWYgKHNvcnRhYmxlU29ydEV2ZW50LmNhbmNlbGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbW92ZXMgPSBtb3ZlKHNvdXJjZSwgb3Zlciwgb3ZlckNvbnRhaW5lcik7XG5cbiAgICAgIGlmICghbW92ZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgb2xkQ29udGFpbmVyID0gbW92ZXMub2xkQ29udGFpbmVyLFxuICAgICAgICAgIG5ld0NvbnRhaW5lciA9IG1vdmVzLm5ld0NvbnRhaW5lcjtcblxuICAgICAgdmFyIG5ld0luZGV4ID0gdGhpcy5pbmRleChldmVudC5zb3VyY2UpO1xuXG4gICAgICB2YXIgc29ydGFibGVTb3J0ZWRFdmVudCA9IG5ldyBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVNvcnRlZEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgb2xkSW5kZXg6IG9sZEluZGV4LFxuICAgICAgICBuZXdJbmRleDogbmV3SW5kZXgsXG4gICAgICAgIG9sZENvbnRhaW5lcjogb2xkQ29udGFpbmVyLFxuICAgICAgICBuZXdDb250YWluZXI6IG5ld0NvbnRhaW5lclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzb3J0YWJsZVNvcnRlZEV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnIG92ZXIgaGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtEcmFnT3ZlckV2ZW50fSBldmVudCAtIERyYWcgb3ZlciBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IG9uRHJhZ092ZXIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQub3ZlciA9PT0gZXZlbnQub3JpZ2luYWxTb3VyY2UgfHwgZXZlbnQub3ZlciA9PT0gZXZlbnQuc291cmNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNvdXJjZSA9IGV2ZW50LnNvdXJjZSxcbiAgICAgICAgICBvdmVyID0gZXZlbnQub3ZlcixcbiAgICAgICAgICBvdmVyQ29udGFpbmVyID0gZXZlbnQub3ZlckNvbnRhaW5lcjtcblxuICAgICAgdmFyIG9sZEluZGV4ID0gdGhpcy5pbmRleChzb3VyY2UpO1xuXG4gICAgICB2YXIgc29ydGFibGVTb3J0RXZlbnQgPSBuZXcgX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTb3J0RXZlbnQoe1xuICAgICAgICBkcmFnRXZlbnQ6IGV2ZW50LFxuICAgICAgICBjdXJyZW50SW5kZXg6IG9sZEluZGV4LFxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgb3Zlcjogb3ZlclxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihzb3J0YWJsZVNvcnRFdmVudCk7XG5cbiAgICAgIGlmIChzb3J0YWJsZVNvcnRFdmVudC5jYW5jZWxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG1vdmVzID0gbW92ZShzb3VyY2UsIG92ZXIsIG92ZXJDb250YWluZXIpO1xuXG4gICAgICBpZiAoIW1vdmVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG9sZENvbnRhaW5lciA9IG1vdmVzLm9sZENvbnRhaW5lcixcbiAgICAgICAgICBuZXdDb250YWluZXIgPSBtb3Zlcy5uZXdDb250YWluZXI7XG5cbiAgICAgIHZhciBuZXdJbmRleCA9IHRoaXMuaW5kZXgoc291cmNlKTtcblxuICAgICAgdmFyIHNvcnRhYmxlU29ydGVkRXZlbnQgPSBuZXcgX1NvcnRhYmxlRXZlbnQuU29ydGFibGVTb3J0ZWRFdmVudCh7XG4gICAgICAgIGRyYWdFdmVudDogZXZlbnQsXG4gICAgICAgIG9sZEluZGV4OiBvbGRJbmRleCxcbiAgICAgICAgbmV3SW5kZXg6IG5ld0luZGV4LFxuICAgICAgICBvbGRDb250YWluZXI6IG9sZENvbnRhaW5lcixcbiAgICAgICAgbmV3Q29udGFpbmVyOiBuZXdDb250YWluZXJcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoc29ydGFibGVTb3J0ZWRFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZyBzdG9wIGhhbmRsZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RHJhZ1N0b3BFdmVudH0gZXZlbnQgLSBEcmFnIHN0b3AgZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBvbkRyYWdTdG9wLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShldmVudCkge1xuICAgICAgdmFyIHNvcnRhYmxlU3RvcEV2ZW50ID0gbmV3IF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU3RvcEV2ZW50KHtcbiAgICAgICAgZHJhZ0V2ZW50OiBldmVudCxcbiAgICAgICAgb2xkSW5kZXg6IHRoaXMuc3RhcnRJbmRleCxcbiAgICAgICAgbmV3SW5kZXg6IHRoaXMuaW5kZXgoZXZlbnQuc291cmNlKSxcbiAgICAgICAgb2xkQ29udGFpbmVyOiB0aGlzLnN0YXJ0Q29udGFpbmVyLFxuICAgICAgICBuZXdDb250YWluZXI6IGV2ZW50LnNvdXJjZS5wYXJlbnROb2RlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50cmlnZ2VyKHNvcnRhYmxlU3RvcEV2ZW50KTtcblxuICAgICAgdGhpcy5zdGFydEluZGV4ID0gbnVsbDtcbiAgICAgIHRoaXMuc3RhcnRDb250YWluZXIgPSBudWxsO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGU7XG59KF9EcmFnZ2FibGUzLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTb3J0YWJsZTtcblxuXG5mdW5jdGlvbiBpbmRleChlbGVtZW50KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZHJlbiwgZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIG1vdmUoc291cmNlLCBvdmVyLCBvdmVyQ29udGFpbmVyKSB7XG4gIHZhciBlbXB0eU92ZXJDb250YWluZXIgPSAhb3ZlckNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGg7XG4gIHZhciBkaWZmZXJlbnRDb250YWluZXIgPSBvdmVyICYmIHNvdXJjZS5wYXJlbnROb2RlICE9PSBvdmVyLnBhcmVudE5vZGU7XG4gIHZhciBzYW1lQ29udGFpbmVyID0gb3ZlciAmJiBzb3VyY2UucGFyZW50Tm9kZSA9PT0gb3Zlci5wYXJlbnROb2RlO1xuXG4gIGlmIChlbXB0eU92ZXJDb250YWluZXIpIHtcbiAgICByZXR1cm4gbW92ZUluc2lkZUVtcHR5Q29udGFpbmVyKHNvdXJjZSwgb3ZlckNvbnRhaW5lcik7XG4gIH0gZWxzZSBpZiAoc2FtZUNvbnRhaW5lcikge1xuICAgIHJldHVybiBtb3ZlV2l0aGluQ29udGFpbmVyKHNvdXJjZSwgb3Zlcik7XG4gIH0gZWxzZSBpZiAoZGlmZmVyZW50Q29udGFpbmVyKSB7XG4gICAgcmV0dXJuIG1vdmVPdXRzaWRlQ29udGFpbmVyKHNvdXJjZSwgb3Zlcik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZUluc2lkZUVtcHR5Q29udGFpbmVyKHNvdXJjZSwgb3ZlckNvbnRhaW5lcikge1xuICB2YXIgb2xkQ29udGFpbmVyID0gc291cmNlLnBhcmVudE5vZGU7XG5cbiAgb3ZlckNvbnRhaW5lci5hcHBlbmRDaGlsZChzb3VyY2UpO1xuXG4gIHJldHVybiB7IG9sZENvbnRhaW5lcjogb2xkQ29udGFpbmVyLCBuZXdDb250YWluZXI6IG92ZXJDb250YWluZXIgfTtcbn1cblxuZnVuY3Rpb24gbW92ZVdpdGhpbkNvbnRhaW5lcihzb3VyY2UsIG92ZXIpIHtcbiAgdmFyIG9sZEluZGV4ID0gaW5kZXgoc291cmNlKTtcbiAgdmFyIG5ld0luZGV4ID0gaW5kZXgob3Zlcik7XG5cbiAgaWYgKG9sZEluZGV4IDwgbmV3SW5kZXgpIHtcbiAgICBzb3VyY2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc291cmNlLCBvdmVyLm5leHRFbGVtZW50U2libGluZyk7XG4gIH0gZWxzZSB7XG4gICAgc291cmNlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNvdXJjZSwgb3Zlcik7XG4gIH1cblxuICByZXR1cm4geyBvbGRDb250YWluZXI6IHNvdXJjZS5wYXJlbnROb2RlLCBuZXdDb250YWluZXI6IHNvdXJjZS5wYXJlbnROb2RlIH07XG59XG5cbmZ1bmN0aW9uIG1vdmVPdXRzaWRlQ29udGFpbmVyKHNvdXJjZSwgb3Zlcikge1xuICB2YXIgb2xkQ29udGFpbmVyID0gc291cmNlLnBhcmVudE5vZGU7XG5cbiAgb3Zlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzb3VyY2UsIG92ZXIpO1xuXG4gIHJldHVybiB7IG9sZENvbnRhaW5lcjogb2xkQ29udGFpbmVyLCBuZXdDb250YWluZXI6IHNvdXJjZS5wYXJlbnROb2RlIH07XG59XG5cbi8qKiovIH0pLFxuLyogMTU2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfU29ydGFibGVFdmVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMTU3KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTb3J0YWJsZVN0YXJ0RXZlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU29ydGFibGVFdmVudC5Tb3J0YWJsZVN0YXJ0RXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTb3J0YWJsZVNvcnRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydEV2ZW50O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU29ydGFibGVTb3J0ZWRFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU29ydGVkRXZlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTb3J0YWJsZVN0b3BFdmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Tb3J0YWJsZUV2ZW50LlNvcnRhYmxlU3RvcEV2ZW50O1xuICB9XG59KTtcblxuLyoqKi8gfSksXG4vKiAxNTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU29ydGFibGVTdG9wRXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU29ydGVkRXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU29ydEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVN0YXJ0RXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlRXZlbnQgPSB1bmRlZmluZWQ7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX0Fic3RyYWN0RXZlbnQyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9BYnN0cmFjdEV2ZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fic3RyYWN0RXZlbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCYXNlIHNvcnRhYmxlIGV2ZW50XG4gKiBAY2xhc3MgU29ydGFibGVFdmVudFxuICogQG1vZHVsZSBTb3J0YWJsZUV2ZW50XG4gKiBAZXh0ZW5kcyBBYnN0cmFjdEV2ZW50XG4gKi9cbnZhciBTb3J0YWJsZUV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZUV2ZW50ID0gZnVuY3Rpb24gKF9BYnN0cmFjdEV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNvcnRhYmxlRXZlbnQsIF9BYnN0cmFjdEV2ZW50KTtcblxuICBmdW5jdGlvbiBTb3J0YWJsZUV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTb3J0YWJsZUV2ZW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU29ydGFibGVFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVFdmVudCwgW3tcbiAgICBrZXk6ICdkcmFnRXZlbnQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBkcmFnIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoaXMgc29ydGFibGUgZXZlbnRcbiAgICAgKiBAcHJvcGVydHkgZHJhZ0V2ZW50XG4gICAgICogQHR5cGUge0RyYWdFdmVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEuZHJhZ0V2ZW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVFdmVudDtcbn0oX0Fic3RyYWN0RXZlbnQzLmRlZmF1bHQpO1xuXG4vKipcbiAqIFNvcnRhYmxlIHN0YXJ0IGV2ZW50XG4gKiBAY2xhc3MgU29ydGFibGVTdGFydEV2ZW50XG4gKiBAbW9kdWxlIFNvcnRhYmxlU3RhcnRFdmVudFxuICogQGV4dGVuZHMgU29ydGFibGVFdmVudFxuICovXG5cblxuU29ydGFibGVFdmVudC50eXBlID0gJ3NvcnRhYmxlJztcblxudmFyIFNvcnRhYmxlU3RhcnRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTdGFydEV2ZW50ID0gZnVuY3Rpb24gKF9Tb3J0YWJsZUV2ZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNvcnRhYmxlU3RhcnRFdmVudCwgX1NvcnRhYmxlRXZlbnQpO1xuXG4gIGZ1bmN0aW9uIFNvcnRhYmxlU3RhcnRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZVN0YXJ0RXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTb3J0YWJsZVN0YXJ0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTb3J0YWJsZVN0YXJ0RXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlU3RhcnRFdmVudCwgW3tcbiAgICBrZXk6ICdzdGFydEluZGV4JyxcblxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgaW5kZXggb2Ygc291cmNlIG9uIHNvcnRhYmxlIHN0YXJ0XG4gICAgICogQHByb3BlcnR5IHN0YXJ0SW5kZXhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zdGFydEluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGNvbnRhaW5lciBvbiBzb3J0YWJsZSBzdGFydFxuICAgICAqIEBwcm9wZXJ0eSBzdGFydENvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc3RhcnRDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zdGFydENvbnRhaW5lcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNvcnRhYmxlU3RhcnRFdmVudDtcbn0oU29ydGFibGVFdmVudCk7XG5cbi8qKlxuICogU29ydGFibGUgc29ydCBldmVudFxuICogQGNsYXNzIFNvcnRhYmxlU29ydEV2ZW50XG4gKiBAbW9kdWxlIFNvcnRhYmxlU29ydEV2ZW50XG4gKiBAZXh0ZW5kcyBTb3J0YWJsZUV2ZW50XG4gKi9cblxuXG5Tb3J0YWJsZVN0YXJ0RXZlbnQudHlwZSA9ICdzb3J0YWJsZTpzdGFydCc7XG5Tb3J0YWJsZVN0YXJ0RXZlbnQuY2FuY2VsYWJsZSA9IHRydWU7XG5cbnZhciBTb3J0YWJsZVNvcnRFdmVudCA9IGV4cG9ydHMuU29ydGFibGVTb3J0RXZlbnQgPSBmdW5jdGlvbiAoX1NvcnRhYmxlRXZlbnQyKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNvcnRhYmxlU29ydEV2ZW50LCBfU29ydGFibGVFdmVudDIpO1xuXG4gIGZ1bmN0aW9uIFNvcnRhYmxlU29ydEV2ZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIFNvcnRhYmxlU29ydEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGVTb3J0RXZlbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTb3J0YWJsZVNvcnRFdmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU29ydGFibGVTb3J0RXZlbnQsIFt7XG4gICAga2V5OiAnY3VycmVudEluZGV4JyxcblxuXG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgY3VycmVudCBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBjdXJyZW50SW5kZXhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jdXJyZW50SW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhZ2dhYmxlIGVsZW1lbnQgeW91IGFyZSBob3ZlcmluZyBvdmVyXG4gICAgICogQHByb3BlcnR5IG92ZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ292ZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vbGRJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmFnZ2FibGUgY29udGFpbmVyIGVsZW1lbnQgeW91IGFyZSBob3ZlcmluZyBvdmVyXG4gICAgICogQHByb3BlcnR5IG92ZXJDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ292ZXJDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5uZXdJbmRleDtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNvcnRhYmxlU29ydEV2ZW50O1xufShTb3J0YWJsZUV2ZW50KTtcblxuLyoqXG4gKiBTb3J0YWJsZSBzb3J0ZWQgZXZlbnRcbiAqIEBjbGFzcyBTb3J0YWJsZVNvcnRlZEV2ZW50XG4gKiBAbW9kdWxlIFNvcnRhYmxlU29ydGVkRXZlbnRcbiAqIEBleHRlbmRzIFNvcnRhYmxlRXZlbnRcbiAqL1xuXG5cblNvcnRhYmxlU29ydEV2ZW50LnR5cGUgPSAnc29ydGFibGU6c29ydCc7XG5Tb3J0YWJsZVNvcnRFdmVudC5jYW5jZWxhYmxlID0gdHJ1ZTtcblxudmFyIFNvcnRhYmxlU29ydGVkRXZlbnQgPSBleHBvcnRzLlNvcnRhYmxlU29ydGVkRXZlbnQgPSBmdW5jdGlvbiAoX1NvcnRhYmxlRXZlbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKFNvcnRhYmxlU29ydGVkRXZlbnQsIF9Tb3J0YWJsZUV2ZW50Myk7XG5cbiAgZnVuY3Rpb24gU29ydGFibGVTb3J0ZWRFdmVudCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTb3J0YWJsZVNvcnRlZEV2ZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoU29ydGFibGVTb3J0ZWRFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlU29ydGVkRXZlbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNvcnRhYmxlU29ydGVkRXZlbnQsIFt7XG4gICAga2V5OiAnb2xkSW5kZXgnLFxuXG5cbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiBsYXN0IHNvcnRlZCBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBvbGRJbmRleFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9sZEluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5ldyBpbmRleCBvZiB0aGlzIHNvcnRlZCBldmVudFxuICAgICAqIEBwcm9wZXJ0eSBuZXdJbmRleFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ25ld0luZGV4JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubmV3SW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2xkIGNvbnRhaW5lciBvZiBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBvbGRDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29sZENvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm9sZENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOZXcgY29udGFpbmVyIG9mIGRyYWdnYWJsZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG5ld0NvbnRhaW5lclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbmV3Q29udGFpbmVyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEubmV3Q29udGFpbmVyO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU29ydGFibGVTb3J0ZWRFdmVudDtcbn0oU29ydGFibGVFdmVudCk7XG5cbi8qKlxuICogU29ydGFibGUgc3RvcCBldmVudFxuICogQGNsYXNzIFNvcnRhYmxlU3RvcEV2ZW50XG4gKiBAbW9kdWxlIFNvcnRhYmxlU3RvcEV2ZW50XG4gKiBAZXh0ZW5kcyBTb3J0YWJsZUV2ZW50XG4gKi9cblxuXG5Tb3J0YWJsZVNvcnRlZEV2ZW50LnR5cGUgPSAnc29ydGFibGU6c29ydGVkJztcblxudmFyIFNvcnRhYmxlU3RvcEV2ZW50ID0gZXhwb3J0cy5Tb3J0YWJsZVN0b3BFdmVudCA9IGZ1bmN0aW9uIChfU29ydGFibGVFdmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoU29ydGFibGVTdG9wRXZlbnQsIF9Tb3J0YWJsZUV2ZW50NCk7XG5cbiAgZnVuY3Rpb24gU29ydGFibGVTdG9wRXZlbnQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU29ydGFibGVTdG9wRXZlbnQpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTb3J0YWJsZVN0b3BFdmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNvcnRhYmxlU3RvcEV2ZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShTb3J0YWJsZVN0b3BFdmVudCwgW3tcbiAgICBrZXk6ICdvbGRJbmRleCcsXG5cblxuICAgIC8qKlxuICAgICAqIE9yaWdpbmFsIGluZGV4IG9uIHNvcnRhYmxlIHN0YXJ0XG4gICAgICogQHByb3BlcnR5IG9sZEluZGV4XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEub2xkSW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmV3IGluZGV4IG9mIGRyYWdnYWJsZSBlbGVtZW50XG4gICAgICogQHByb3BlcnR5IG5ld0luZGV4XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbmV3SW5kZXgnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5uZXdJbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcmlnaW5hbCBjb250YWluZXIgb2YgZHJhZ2dhYmxlIGVsZW1lbnRcbiAgICAgKiBAcHJvcGVydHkgb2xkQ29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbGRDb250YWluZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5vbGRDb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmV3IGNvbnRhaW5lciBvZiBkcmFnZ2FibGUgZWxlbWVudFxuICAgICAqIEBwcm9wZXJ0eSBuZXdDb250YWluZXJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ25ld0NvbnRhaW5lcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLm5ld0NvbnRhaW5lcjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFNvcnRhYmxlU3RvcEV2ZW50O1xufShTb3J0YWJsZUV2ZW50KTtcblxuU29ydGFibGVTdG9wRXZlbnQudHlwZSA9ICdzb3J0YWJsZTpzdG9wJztcblxuLyoqKi8gfSlcbi8qKioqKiovIF0pO1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHNob3BpZnkvZHJhZ2dhYmxlL2xpYi9kcmFnZ2FibGUuYnVuZGxlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==