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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_components__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__js_components__);
/*
|--------------------------------------------------------------------------
| FILE STRUCTURE
|--------------------------------------------------------------------------
|
|  	1. AJAX Setup
|	2. HTML Modifications
|	3. Other
|
*/



"use strict";
;$(function () {

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

	if ($('.show--scroll-to-top').length > 0) {
		$('.main-content').append('<button class="button button--raised button--accent scroll-to-top">Scroll to Top</button>');
	}

	// Accessibility
	$('.dropdown').attr('tabindex', '0');
	$('.dropdown > button').attr('tabindex', '-1');
	$('.dropdown .dropdown-content a').attr('tabindex', '0');

	// Makes primary topic first
	$('.topics-list').prepend($('.first'));
	$('.topics-list .loader').fadeOut(config.animtions.superFast);
	$('.topics-list li').first().fadeIn(config.animtions.fast, function showNext() {
		$(this).next(".topics-list li").fadeIn(config.animtions.fast, showNext);
	});

	$('.order-list-js').each(function () {
		var list = $(this);
		// sortUnorderedList(list);

		if (list.hasClass('last-name-header-list-js')) {
			if (!list.attr('id')) {
				console.error('A unique id is required.');
				return;
			}

			list.before('<div class="header-links" id="' + list.attr('id') + '-links"></div>');
			addLastNameHeadersToList(list);
		}

		if (list.hasClass('alpha-header-list-js')) {
			if (!list.attr('id')) {
				console.error('A unique id is required.');
				return;
			}

			list.before('<div class="header-links" id="' + list.attr('id') + '-links"></div>');
			addAlphaHeadersToList(list);
		}

		if (list.hasClass('title-header-list-js')) {
			if (!list.attr('id')) {
				console.error('A unique id is required.');
				return;
			}

			list.before('<div class="header-links" id="' + list.attr('id') + '-links"></div>');
			addTitleHeadersToList(list);
		}
	});

	/* ======================
 	 3. OTHER
    ====================== */
	$("body").on("change", ".email-table .checkbox input", function () {
		var select = function select(dom) {
			var status = dom.parents().eq(4).data('status');
			var emailString = "mailto:";
			var checkboxSelector = '.email-table.' + status + ' .checkbox input';
			var emailButtonselector = ".email-selected." + status;

			$(checkboxSelector).each(function (index, value) {
				if ($(value).is(":checked") && !$(value).hasClass("master-checkbox")) {
					emailString += $(value).data('email');
					emailString += ",";
				}
			});
			$(emailButtonselector).prop('href', emailString);
		};
		setTimeout(select($(this)), 2000);
	});

	$("body").on("click", ".email-selected", function (e) {
		if ($(this).prop('href') === 'mailto:' || $(this).prop('href') === null) {
			alert("You haven't selected anyone.");
			e.preventDefault();
		}
	});

	// External links give an illusion of AJAX
	$("body").on("click", ".external-link", function (e) {
		var elemToHideSelector = $($(this).data('element-to-hide-selector'));
		var elemToReplace = $($(this).data('element-to-replace-with-loader-selector'));

		$(this).removeClass('active');

		elemToHideSelector.hide();
		elemToReplace.hide();
		elemToReplace.after('<div id="content-replaced-container" class="loader loader--x-large"></div>');

		$('#content-replaced-container').css('display', 'block');
	});

	// Used on the student index page
	$("#share-project-form").on('submit', function (e) {
		e.preventDefault();

		$.ajax({
			url: $(this).prop('action'),
			type: 'PATCH',
			data: $(this).serialize(),
			success: function success(response) {
				response = JSON.parse(response);
				if (response.share_name) {
					showNotification('success', 'Your name is being shared with other students.');
				} else {
					showNotification('', 'You are no longer sharing your name with other students.');
				}
				$('#share_name').prop('checked', response.share_name);
			}
		});
	});

	$("#loginForm").on('submit', function (e) {
		e.preventDefault();

		$('.help-block', '#loginForm').css("display", "none");
		$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.showLoader();

		$.ajax({
			url: $(this).prop('action'),
			type: 'POST',
			data: $(this).serialize(),
			success: function success() {
				$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).hide();
				location.reload(true);
			},
			error: function error(data) {
				$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideLoader();

				$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).show();
				$('#login-username', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).addClass("has-error");
				$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).text(data["responseJSON"]["errors"]["username"][0]);
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
			}
		}).done(function () {
			$(this).find('input').val('');
			$(this).find(':submit').html('Add');
		});
	});

	// NEW USER
	// put this stuff in an array
	// $('#supervisor-form').hide();
	// $('#student-form').show();

	// $('#create-form-access-select').on('change', function(){
	// 	if($('.new-user-student').is(":selected")) {
	// 		$('#student-form').show();
	// 	} else {
	// 		$('#student-form').hide();
	// 	}
	// 	if($('#supervisor-option').is(":selected")) {
	// 		$('#supervisor-form').show();
	// 	} else {
	// 		$('#supervisor-form').hide();
	// 	}
	// });

	$(".favourite-container").on('click', function () {
		var svgContainer = $(this);
		var svg = svgContainer.find('svg');
		var projectId = window['project'].data('project-id');

		svg.hide(0);
		$('.loader', svgContainer).show(0);

		if (svg.hasClass('favourite')) {
			var action = 'remove';
			var ajaxUrl = '/students/remove-favourite';
		} else {
			var action = 'add';
			var ajaxUrl = '/students/add-favourite';
		}

		$.ajax({
			url: ajaxUrl,
			type: 'PATCH',
			data: {
				project_id: projectId
			},
			success: function success() {
				if (action == "add") {
					svg.addClass('favourite');
				} else {
					svg.removeClass('favourite');
				}
			}
		}).done(function (data) {
			svg.fadeIn(config.animtions.fast);
			$('.loader', svgContainer).hide(0);
		});
	});

	$('nav.mobile .sub-dropdown').on('click', function () {
		var dropdown = $(this);
		var content = dropdown.find('.dropdown-content');

		if (dropdown.attr("aria-expanded") == "true") {
			dropdown.attr("aria-expanded", false);
			content.attr("aria-hidden", true);

			dropdown.find(".svg-container svg").css("transform", "rotateZ(0deg)");
			dropdown.removeClass("active");
			content.hide(config.animtions.medium);
		} else {
			dropdown.attr("aria-expanded", true);
			content.attr("aria-hidden", false);

			dropdown.find(".svg-container svg").css("transform", "rotateZ(180deg)");
			dropdown.addClass("active");
			content.show(config.animtions.medium);
		}
	});

	/* ===============
 	9. Initialise
    =============== */

	// Used as an easy way for functions to get current project data
	if ($('.project-card').length > 0) {
		window['project'] = $('.project-card');
	}

	$('.animate-cards .card').css("opacity", 0);

	var delay = 0;
	$('.animate-cards .card').each(function (index, value) {
		delay += 200;
		setTimeout(function () {
			$(this).animate({
				opacity: 1
			}, 400);

			$(this).addClass("slideInUp animated");
		}.bind(this), delay);
	});
});

$(document).ajaxError(function (event, request, settings) {
	if (config.showAjaxRequestFailNotification) {
		showNotification('error', 'Something went wrong with that request.');
	}
});

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* FILE STRUCTURE

*/

/*
|--------------------------------------------------------------------------
| FILE STRUCTURE
|--------------------------------------------------------------------------
|
|	1. Mobile Menu
|	2. Dialog / Modal
|	3. Data Table
|	5. Forms / AJAX Functions
|	6. Edit Topics [Admin]
|	7. Menu
|
*/


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;$(function () {

	/* ==================
 	 1. Mobile Menu
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
		} else {
			console.log("There can only be one mobile menu.");
		}
	};

	MobileMenu.prototype.CssClasses_ = {
		IS_VISIBLE: 'is-visible'
	};

	MobileMenu.prototype.Selectors_ = {
		MOBILE_MENU: 'nav.mobile',
		HAMBURGER_CONTAINER: '.hamburger-container',
		UNDERLAY: '.mobile-nav-underlay'
	};

	MobileMenu.prototype.openMenu = function () {
		this.activator.attr("aria-expanded", "true");
		this.element.addClass(this.CssClasses_.IS_VISIBLE);

		this.underlay.attr("aria-hidden", "false");
		this.underlay.addClass(this.CssClasses_.IS_VISIBLE);
	};

	MobileMenu.prototype.closeMenu = function () {
		this.activator.attr("aria-expanded", "false");
		this.element.removeClass(this.CssClasses_.IS_VISIBLE);

		this.underlay.attr("aria-hidden", "true");
		this.underlay.removeClass(this.CssClasses_.IS_VISIBLE);
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
 	2. Dialog / Modal
    ==================== */
	var Dialog = function Dialog(element) {
		this.element = $(element);
		this.dialogName = $(element).data('dialog');
		this.underlay = $('.underlay');
		this.header = $(element).find(this.Selectors_.DIALOG_HEADER);
		this.content = $(element).find(this.Selectors_.DIALOG_CONTENT);

		// Register Component
		this.element.addClass("registered");

		// ARIA
		this.element.attr("role", "dialog");
		this.element.attr("aria-labelledby", "dialog-title");
		this.element.attr("aria-describedby", "dialog-desc");
		this.header.attr('title', this.header.find('#dialog-desc').html());

		this.content.before(this.HtmlSnippets_.LOADER);
		this.loader = $(element).find(".loader");
		this.isClosable = true;
		this.activatorButtons = [];
		this.init();
	};

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
		window['Dialog'] = this;
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

		// ARIA
		dialog.element.attr("aria-hidden", "true");
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

	$(document).ready(function () {
		$(this).keydown(function (e) {
			if (e.keyCode == 27 && window['Dialog'] != null) {
				window['Dialog'].hideDialog();
			}

			if (e.keyCode == 27 && window['MobileMenu'] != null) {
				window['MobileMenu'].closeMenu();
			}
		});
	});

	/* ================
 	3. Data Table
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
	};

	DataTable.prototype.initAll = function () {
		$(this.Selectors_.DATA_TABLE).each(function () {
			this.dataTable = new DataTable(this);
		});
	};

	/* ========================
 	3 Column Toggle Table
    ======================== */

	/**
 * Class constructor for data tables.
 *
 * @param {HTMLElement} element The element that will be upgraded.
 */
	var ColumnToggleTable = function ColumnToggleTable(element) {
		this.element = $(element);
		this.head = $(element).find('thead tr');
		this.headers = $(element).find('thead tr th');
		this.bodyRows = $(element).find('tbody tr');
		this.selectorMenu = null;
		this.selectorButton = null;
		this.init();
	};

	window['ColumnToggleTable'] = ColumnToggleTable;

	ColumnToggleTable.prototype.CssClasses_ = {
		DATA_TABLE: 'data-table',
		IS_SELECTED: 'is-selected'
	};

	ColumnToggleTable.prototype.Selectors_ = {
		TOGGLE_TABLE: '.table-column-toggle'
	};

	ColumnToggleTable.prototype.HtmlSnippets_ = {
		COLUMN_SELECTOR_BUTTON: '<button class="button button--raised dot-menu__activator" style="display:block;margin-top:2rem;margin-left:auto;">Columns</button>',
		COLUMN_SELECTOR_MENU: '<ul class="dot-menu dot-menu--bottom-left"></ul>'
	};

	ColumnToggleTable.prototype.functions = {

		toggleColumn: function toggleColumn(columnIndex, table, checked) {
			if (checked) {
				table.head.children().eq(columnIndex).removeAttr('hidden');
				table.head.children().eq(columnIndex).show();
			} else {
				table.head.children().eq(columnIndex).attr('hidden', "true");
				table.head.children().eq(columnIndex).hide();
			}

			table.bodyRows.each(function () {
				if (checked) {
					$(this).children().eq(columnIndex).show();
				} else {
					$(this).children().eq(columnIndex).hide();
				}
			});
		},

		refresh: function refresh(table) {
			var hideIndices = [];

			table.bodyRows = table.element.find('tbody tr');

			table.headers.each(function () {
				if ($(this).attr('hidden')) {
					hideIndices.push($(this).index());
				}
			});

			table.bodyRows.each(function () {
				for (var i = 0; i < hideIndices.length; i++) {
					$(this).children().eq(hideIndices[i]).hide();
				}
			});
		},

		refreshAll: function refreshAll() {
			$(ColumnToggleTable.prototype.Selectors_.TOGGLE_TABLE).each(function () {
				ColumnToggleTable.prototype.functions.refresh(this.ColumnToggleTable);
			});
		}
	};

	ColumnToggleTable.prototype.init = function () {

		if (!this.element.attr('id')) {
			console.log("ColumnToggleTable requires the table to have an unique ID.");
			return;
		}

		var toggleTable = this;
		var columnSelectorButton = $(this.HtmlSnippets_.COLUMN_SELECTOR_BUTTON);
		var columnSelectorMenu = $(this.HtmlSnippets_.COLUMN_SELECTOR_MENU);
		var columnSelectorButtonDotMenuId = 'ColumnToggleTable-' + toggleTable.element.attr('id');

		this.element.before(columnSelectorButton);

		columnSelectorButton.after(columnSelectorMenu);
		columnSelectorButton.attr('id', columnSelectorButtonDotMenuId);
		columnSelectorMenu.attr('id', columnSelectorButtonDotMenuId + '-menu');

		this.selectorButton = columnSelectorButton;
		this.selectorMenu = columnSelectorMenu;

		this.selectorMenu.find('ul').data("table", toggleTable.element.attr('id'));

		this.headers.each(function () {
			var checked = $(this).data("default") ? "checked" : "";
			$(this).data('visible', $(this).data("default"));

			columnSelectorMenu.append('\
				<li class="dot-menu__item dot-menu__item--padded"> \
					<div class="checkbox"> \
						<input class="column-toggle" id="column-' + $(this).text() + '" type="checkbox" ' + checked + '> \
						<label for="column-' + $(this).text() + '">' + $(this).text() + '</label> \
					</div> \
				</li>');
		});

		$("body").on("change", ".column-toggle", function () {
			var index = $('.column-toggle').index(this);
			ColumnToggleTable.prototype.functions.toggleColumn(index, toggleTable, $(this).prop('checked'));
		});
	};

	ColumnToggleTable.prototype.initAll = function () {
		$(this.Selectors_.TOGGLE_TABLE).each(function () {
			this.ColumnToggleTable = new ColumnToggleTable(this);
		});
	};

	/* ============================
 	5 Forms / AJAX Functions
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
		LOG_IN_DIALOG: '.login.dialog'
	};

	AjaxFunctions.prototype.Keys_ = {
		SPACE: 32,
		ENTER: 13,
		COMMA: 45
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
			filterButton.blur();
		} else {
			container.addClass('active');
			filterButton.addClass('active');
		}
	});

	/* ========================
    6 Edit Topics [Admin]
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
			var topic = this;
			if (topic.originalName == topic.topicNameInput.val()) {
				return;
			}
			$.confirm(_defineProperty({
				title: 'Change Topic Name',
				type: 'blue',
				icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
				theme: 'modern',
				escapeKey: true,
				backgroundDismiss: true,
				animateFromElement: false,
				content: 'Are you sure you want to change the topic name from <b>"' + topic.originalName + '"</b> to <b>"' + topic.topicNameInput.val() + '"</b>?',
				buttons: {
					confirm: {
						btnClass: 'btn-blue',
						action: function action() {
							topic.topicNameInput.prop('disabled', true);
							topic.editButton.html('<div class="loader"></div>');
							$('.loader', topic.element).css('display', 'block');

							$.ajax({
								method: 'PATCH',
								url: topic.Urls_.DELETE_TOPIC,
								context: topic,
								data: {
									topic_id: topic.topicId,
									topic_name: topic.topicNameInput.val()
								}
							}).done(function () {
								topic.topicNameInput.prop('disabled', false);
								topic.editButton.html('Edit');
								topic.originalName = topic.topicNameInput.val();
							});
						}
					},
					cancel: function cancel() {
						topic.topicNameInput.val(topic.originalName);
					}
				}
			}, 'backgroundDismiss', function backgroundDismiss() {
				topic.topicNameInput.val(topic.originalName);
			}));
		},

		deleteTopic: function deleteTopic() {
			var topic = this;
			$.confirm({
				title: 'Delete',
				type: 'red',
				icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
				theme: 'modern',
				escapeKey: true,
				backgroundDismiss: true,
				animateFromElement: false,
				content: 'Are you sure you want to delete <b>"' + topic.topicNameInput.val() + '"</b>?',
				buttons: {
					delete: {
						btnClass: 'btn-red',
						action: function action() {
							topic.topicNameInput.prop('disabled', true);
							$.ajax({
								method: 'DELETE',
								url: topic.Urls_.DELETE_TOPIC,
								context: topic,
								data: {
									topic_id: topic.topicId
								},
								success: function success() {
									topic.element.hide(config.animtions.slow, function () {
										topic.remove();
									});
								}
							});
						}
					}
				}
			});
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

	/* ========================
    7 DotMenu
    ======================== */

	/**
 * Class constructor for ajax functions.
 *
 * @param {HTMLElement} element The element that will be upgraded.
 */
	var DotMenu = function Menu(element) {
		this.button = $(element);
		this.menu = null;
		this.isTableDotMenu = false;
		this.init();
	};

	DotMenu.prototype.Selectors_ = {
		DOT_MENU: '.dot-menu',
		ACTIVATOR: '.dot-menu__activator',
		IS_VISIBLE: '.is-visible'
	};

	DotMenu.prototype.CssClasses_ = {
		IS_VISIBLE: 'is-visible',
		BOTTOM_LEFT: 'dot-menu--bottom-left',
		BOTTOM_RIGHT: 'dot-menu--bottom-right',
		TOP_LEFT: 'dot-menu--top-left',
		TOP_RIGHT: 'dot-menu--top-right',
		TABLE_DOT_MENU: 'dot-menu--table'
	};

	DotMenu.prototype.positionMenu = function () {
		var buttonRect = this.button[0].getBoundingClientRect();

		if (this.menu.hasClass(this.CssClasses_.BOTTOM_LEFT)) {
			this.menu.css('top', buttonRect.bottom);
			this.menu.css('left', buttonRect.left - parseInt(this.button.css('width'), 10));
			this.menu.css('transform-origin', 'top right');
		} else if (this.menu.hasClass(this.CssClasses_.BOTTOM_RIGHT)) {
			this.menu.css('top', buttonRect.bottom);
			this.menu.css('left', buttonRect.left - 120);
			this.menu.css('transform-origin', 'top left');
		} else if (this.menu.hasClass(this.CssClasses_.TOP_LEFT)) {
			this.menu.css('top', buttonRect.top - 150);
			this.menu.css('left', buttonRect.right - parseInt(this.button.css('width'), 10));
			this.menu.css('transform-origin', 'bottom right');
		} else if (this.menu.hasClass(this.CssClasses_.TOP_RIGHT)) {
			this.menu.css('top', buttonRect.top - 150);
			this.menu.css('left', buttonRect.left - 120);
			this.menu.css('transform-origin', 'bottom left');
		} else {
			this.menu.css('top', buttonRect.bottom);
			this.menu.css('transform-origin', 'top');
		}
	};

	DotMenu.prototype.show = function () {
		DotMenu.prototype.positionMenu.bind(this)();
		this.menu.addClass(DotMenu.prototype.CssClasses_.IS_VISIBLE);
		this.menu.show();
	};

	DotMenu.prototype.hide = function () {
		this.menu.removeClass(DotMenu.prototype.CssClasses_.IS_VISIBLE);
		this.menu.hide();
	};

	DotMenu.prototype.toggle = function () {
		if (this.menu.hasClass(DotMenu.prototype.CssClasses_.IS_VISIBLE)) {
			DotMenu.prototype.hide.bind(this)();
		} else {
			DotMenu.prototype.show.bind(this)();
		}
	};

	DotMenu.prototype.init = function () {
		var dotMenu = this;
		var menuId = $(this.button).attr('id') + '-menu';

		this.menu = $('#' + menuId);
		this.isTableDotMenu = this.menu.hasClass(DotMenu.prototype.CssClasses_.TABLE_DOT_MENU);

		this.button.on('click', function (e) {
			e.stopPropagation();
			DotMenu.prototype.toggle.bind(dotMenu)();
		});

		$(document).on('scroll', function (e) {
			if (dotMenu.menu.hasClass(DotMenu.prototype.CssClasses_.IS_VISIBLE)) {
				DotMenu.prototype.positionMenu.bind(dotMenu)();
			}
		});

		$(window).on('resize', function (e) {
			if (dotMenu.menu.hasClass(DotMenu.prototype.CssClasses_.IS_VISIBLE)) {
				DotMenu.prototype.positionMenu.bind(dotMenu)();
			}
		});

		$(document).on('click', function (e) {
			var target = $(e.target);
			if (!target.is(dotMenu.menu) || !target.is(dotMenu.button)) {
				if (!$.contains($(dotMenu.menu)[0], e.target)) {
					DotMenu.prototype.hide.bind(dotMenu)();
				}
			}
		});
	};

	DotMenu.prototype.initAll = function () {
		$(this.Selectors_.ACTIVATOR).each(function () {
			this.DotMenu = new DotMenu(this);
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

		$("#project-title").html('<b>Title: </b>' + project['title']);
		$("#project-description").html('<b>Description: </b>' + project['description']);

		$("#assign-dialog")[0].dialog.showDialog();
	};

	$('#submitAssignMarker').on('click', function () {
		var marker = window['Marker'];

		if (marker.selectedStudent == null || marker.selectedSupervisor == null) {
			$("#assign-dialog")[0].dialog.hideDialog();
			return;
		};

		$("#assign-dialog")[0].dialog.showLoader();

		var projectId = marker.selectedStudent.data('project')['id'];
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

	MobileMenu.prototype.initAll();
	Dialog.prototype.initAll();
	DataTable.prototype.initAll();
	ColumnToggleTable.prototype.initAll();
	EditTopic.prototype.initAll();
	Marker.prototype.initAll();
	DotMenu.prototype.initAll();
});

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGI0OTc2MjcxN2IzOTk3ZWExZmEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImNvbmZpZyIsImFuaW10aW9ucyIsInN1cGVyRmFzdCIsImZpcnN0IiwiZmFkZUluIiwiZmFzdCIsInNob3dOZXh0IiwibmV4dCIsImVhY2giLCJsaXN0IiwiaGFzQ2xhc3MiLCJjb25zb2xlIiwiZXJyb3IiLCJiZWZvcmUiLCJhZGRMYXN0TmFtZUhlYWRlcnNUb0xpc3QiLCJhZGRBbHBoYUhlYWRlcnNUb0xpc3QiLCJhZGRUaXRsZUhlYWRlcnNUb0xpc3QiLCJvbiIsInNlbGVjdCIsImRvbSIsInN0YXR1cyIsInBhcmVudHMiLCJlcSIsImRhdGEiLCJlbWFpbFN0cmluZyIsImNoZWNrYm94U2VsZWN0b3IiLCJlbWFpbEJ1dHRvbnNlbGVjdG9yIiwiaW5kZXgiLCJ2YWx1ZSIsImlzIiwicHJvcCIsInNldFRpbWVvdXQiLCJlIiwiYWxlcnQiLCJwcmV2ZW50RGVmYXVsdCIsImVsZW1Ub0hpZGVTZWxlY3RvciIsImVsZW1Ub1JlcGxhY2UiLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJhZnRlciIsImNzcyIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwic2VyaWFsaXplIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwic2hhcmVfbmFtZSIsInNob3dOb3RpZmljYXRpb24iLCJBamF4RnVuY3Rpb25zIiwicHJvdG90eXBlIiwiU2VsZWN0b3JzXyIsIkxPR19JTl9ESUFMT0ciLCJkaWFsb2ciLCJzaG93TG9hZGVyIiwibG9jYXRpb24iLCJyZWxvYWQiLCJoaWRlTG9hZGVyIiwic2hvdyIsImFkZENsYXNzIiwidGV4dCIsInN1Ym1pdEJ1dHRvbiIsImZpbmQiLCJodG1sIiwiY29udGV4dCIsIkVkaXRUb3BpYyIsImZ1bmN0aW9ucyIsImNyZWF0ZUVkaXRUb3BpY0RPTSIsImRvbmUiLCJ2YWwiLCJzdmdDb250YWluZXIiLCJzdmciLCJwcm9qZWN0SWQiLCJ3aW5kb3ciLCJhY3Rpb24iLCJhamF4VXJsIiwicHJvamVjdF9pZCIsImRyb3Bkb3duIiwiY29udGVudCIsIm1lZGl1bSIsImRlbGF5IiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJiaW5kIiwiZG9jdW1lbnQiLCJhamF4RXJyb3IiLCJldmVudCIsInJlcXVlc3QiLCJzZXR0aW5ncyIsInNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24iLCJNb2JpbGVNZW51IiwiZWxlbWVudCIsImFjdGl2YXRvciIsIkhBTUJVUkdFUl9DT05UQUlORVIiLCJ1bmRlcmxheSIsIlVOREVSTEFZIiwiaW5pdCIsImxvZyIsIkNzc0NsYXNzZXNfIiwiSVNfVklTSUJMRSIsIk1PQklMRV9NRU5VIiwib3Blbk1lbnUiLCJjbG9zZU1lbnUiLCJtb2JpbGVNZW51IiwiaW5pdEFsbCIsIkRpYWxvZyIsImRpYWxvZ05hbWUiLCJoZWFkZXIiLCJESUFMT0dfSEVBREVSIiwiRElBTE9HX0NPTlRFTlQiLCJIdG1sU25pcHBldHNfIiwiTE9BREVSIiwibG9hZGVyIiwiaXNDbG9zYWJsZSIsImFjdGl2YXRvckJ1dHRvbnMiLCJBQ1RJVkUiLCJESUFMT0ciLCJzaG93RGlhbG9nIiwiaGlkZURpYWxvZyIsInB1c2giLCJlcnIiLCJyZWFkeSIsImtleWRvd24iLCJrZXlDb2RlIiwiRGF0YVRhYmxlIiwiYm9keVJvd3MiLCJmb290Um93cyIsInJvd3MiLCJtZXJnZSIsImNoZWNrYm94ZXMiLCJDSEVDS0JPWCIsIm1hc3RlckNoZWNrYm94IiwiTUFTVEVSX0NIRUNLQk9YIiwiREFUQV9UQUJMRSIsIklTX1NFTEVDVEVEIiwic2VsZWN0QWxsUm93cyIsInNlbGVjdFJvdyIsImNoZWNrYm94Iiwicm93IiwiZGF0YVRhYmxlIiwicHJveHkiLCJpIiwiQ29sdW1uVG9nZ2xlVGFibGUiLCJoZWFkIiwic2VsZWN0b3JNZW51Iiwic2VsZWN0b3JCdXR0b24iLCJUT0dHTEVfVEFCTEUiLCJDT0xVTU5fU0VMRUNUT1JfQlVUVE9OIiwiQ09MVU1OX1NFTEVDVE9SX01FTlUiLCJ0b2dnbGVDb2x1bW4iLCJjb2x1bW5JbmRleCIsInRhYmxlIiwiY2hlY2tlZCIsImNoaWxkcmVuIiwicmVtb3ZlQXR0ciIsInJlZnJlc2giLCJoaWRlSW5kaWNlcyIsInJlZnJlc2hBbGwiLCJ0b2dnbGVUYWJsZSIsImNvbHVtblNlbGVjdG9yQnV0dG9uIiwiY29sdW1uU2VsZWN0b3JNZW51IiwiY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQiLCJTRUFSQ0hfSU5QVVQiLCJTRUFSQ0hfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0JVVFRPTiIsIktleXNfIiwiU1BBQ0UiLCJFTlRFUiIsIkNPTU1BIiwicmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyIsImNvbnRhaW5lciIsImZpbHRlckJ1dHRvbiIsImJsdXIiLCJvcmlnaW5hbE5hbWUiLCJ0b3BpY0lkIiwidG9waWNOYW1lSW5wdXQiLCJlZGl0QnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwiRURJVF9UT1BJQyIsIlVybHNfIiwiREVMRVRFX1RPUElDIiwiUEFUQ0hfVE9QSUMiLCJORVdfVE9QSUMiLCJlZGl0VG9waWMiLCJ0b3BpYyIsImNvbmZpcm0iLCJ0aXRsZSIsImljb24iLCJ0aGVtZSIsImVzY2FwZUtleSIsImJhY2tncm91bmREaXNtaXNzIiwiYW5pbWF0ZUZyb21FbGVtZW50IiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwibWV0aG9kIiwidG9waWNfaWQiLCJ0b3BpY19uYW1lIiwiY2FuY2VsIiwiZGVsZXRlVG9waWMiLCJkZWxldGUiLCJzbG93IiwicmVtb3ZlIiwiRG90TWVudSIsIk1lbnUiLCJidXR0b24iLCJtZW51IiwiaXNUYWJsZURvdE1lbnUiLCJET1RfTUVOVSIsIkFDVElWQVRPUiIsIkJPVFRPTV9MRUZUIiwiQk9UVE9NX1JJR0hUIiwiVE9QX0xFRlQiLCJUT1BfUklHSFQiLCJUQUJMRV9ET1RfTUVOVSIsInBvc2l0aW9uTWVudSIsImJ1dHRvblJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJsZWZ0IiwicGFyc2VJbnQiLCJ0b3AiLCJyaWdodCIsInRvZ2dsZSIsImRvdE1lbnUiLCJtZW51SWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJjb250YWlucyIsIk1hcmtlciIsInNlbGVjdGVkU3R1ZGVudCIsInNlbGVjdGVkU3VwZXJ2aXNvciIsInN0dWRlbnRUYWJsZSIsInN0dWRlbnREYXRhVGFibGUiLCJzdXBlcnZpc29yVGFibGUiLCJzdXBlcnZpc29yRGF0YVRhYmxlIiwiQVNTSUdOX01BUktFUiIsInNlbGVjdFN0dWRlbnQiLCJzdHVkZW50Um93RE9NIiwibWFya2VyIiwidW5zZWxlY3RBbGwiLCJzZWxlY3RTdXBlcnZpc29yIiwic3VwZXJ2aXNvclJvd0RPTSIsInJlc2V0VmlldyIsInN0dWRlbnROYW1lIiwic3VwZXJ2aXNvck5hbWUiLCJtYXJrZXJOYW1lIiwicHJvamVjdCIsInN0dWRlbnRJZCIsIm1hcmtlcklkIiwic3R1ZGVudF9pZCIsIm1hcmtlcl9pZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFD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R0FBbEg7QUFDQSxFQUpEOztBQU1BVixRQUFPbkwsU0FBUCxDQUFpQnNELE9BQWpCLEdBQTJCLFlBQVU7QUFDcEMvQixTQUFPLFFBQVAsSUFBbUIsSUFBSTRKLE1BQUosRUFBbkI7QUFDQSxFQUZEOztBQUlBM0ksWUFBV3hDLFNBQVgsQ0FBcUJzRCxPQUFyQjtBQUNBQyxRQUFPdkQsU0FBUCxDQUFpQnNELE9BQWpCO0FBQ0FvQixXQUFVMUUsU0FBVixDQUFvQnNELE9BQXBCO0FBQ0FzQyxtQkFBa0I1RixTQUFsQixDQUE0QnNELE9BQTVCO0FBQ0F2QyxXQUFVZixTQUFWLENBQW9Cc0QsT0FBcEI7QUFDQTZILFFBQU9uTCxTQUFQLENBQWlCc0QsT0FBakI7QUFDQW1HLFNBQVF6SixTQUFSLENBQWtCc0QsT0FBbEI7QUFDQSxDQXJ5QkEsRSIsImZpbGUiOiJcXGpzXFxtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGI0OTc2MjcxN2IzOTk3ZWExZmEiLCIvKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58ICBcdDEuIEFKQVggU2V0dXBcclxufFx0Mi4gSFRNTCBNb2RpZmljYXRpb25zXHJcbnxcdDMuIE90aGVyXHJcbnxcclxuKi9cclxuXHJcbmltcG9ydCAnLi4vanMvY29tcG9uZW50cyc7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuOyQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDEuIEFKQVggU2V0dXBcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0JC5hamF4U2V0dXAoe1xyXG5cdFx0aGVhZGVyczoge1xyXG5cdFx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKSxcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0aWYoJCgnLnNob3ctLXNjcm9sbC10by10b3AnKS5sZW5ndGggPiAwKXtcclxuXHRcdCQoJy5tYWluLWNvbnRlbnQnKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgYnV0dG9uLS1hY2NlbnQgc2Nyb2xsLXRvLXRvcFwiPlNjcm9sbCB0byBUb3A8L2J1dHRvbj4nKTtcclxuXHR9XHJcblxyXG5cdC8vIEFjY2Vzc2liaWxpdHlcclxuXHQkKCcuZHJvcGRvd24nKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblx0JCgnLmRyb3Bkb3duID4gYnV0dG9uJykuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcclxuXHQkKCcuZHJvcGRvd24gLmRyb3Bkb3duLWNvbnRlbnQgYScpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHJcblx0Ly8gTWFrZXMgcHJpbWFyeSB0b3BpYyBmaXJzdFxyXG5cdCQoJy50b3BpY3MtbGlzdCcpLnByZXBlbmQoJCgnLmZpcnN0JykpO1xyXG5cdCQoJy50b3BpY3MtbGlzdCAubG9hZGVyJykuZmFkZU91dChjb25maWcuYW5pbXRpb25zLnN1cGVyRmFzdCk7XHJcblx0JCgnLnRvcGljcy1saXN0IGxpJykuZmlyc3QoKS5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0LCBmdW5jdGlvbiBzaG93TmV4dCgpIHtcclxuXHRcdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIHNob3dOZXh0KTtcclxuXHR9KTtcclxuXHJcblx0JCgnLm9yZGVyLWxpc3QtanMnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGxpc3QgPSAkKHRoaXMpO1xyXG5cdFx0Ly8gc29ydFVub3JkZXJlZExpc3QobGlzdCk7XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnbGFzdC1uYW1lLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRMYXN0TmFtZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnYWxwaGEtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZEFscGhhSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCd0aXRsZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkVGl0bGVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQgMy4gT1RIRVJcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuZW1haWwtdGFibGUgLmNoZWNrYm94IGlucHV0XCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGVjdCA9IGZ1bmN0aW9uKGRvbSl7XHJcblx0XHRcdHZhciBzdGF0dXMgPSBkb20ucGFyZW50cygpLmVxKDQpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdFx0XHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHRcdFx0dmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmVtYWlsLXRhYmxlLicgKyBzdGF0dXMgKyAnIC5jaGVja2JveCBpbnB1dCc7XHJcblx0XHRcdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblxyXG5cdFx0XHQkKGNoZWNrYm94U2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRcdFx0aWYoJCh2YWx1ZSkuaXMoXCI6Y2hlY2tlZFwiKSAmJiAhJCh2YWx1ZSkuaGFzQ2xhc3MoXCJtYXN0ZXItY2hlY2tib3hcIikpIHtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9ICQodmFsdWUpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSBcIixcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKGVtYWlsQnV0dG9uc2VsZWN0b3IpLnByb3AoJ2hyZWYnLCBlbWFpbFN0cmluZyk7XHJcblx0XHR9O1xyXG5cdFx0c2V0VGltZW91dChzZWxlY3QoJCh0aGlzKSksIDIwMDApO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmVtYWlsLXNlbGVjdGVkXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicgfHwgJCh0aGlzKS5wcm9wKCdocmVmJykgPT09IG51bGwpe1xyXG5cdFx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5leHRlcm5hbC1saW5rXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHRcdHZhciBlbGVtVG9SZXBsYWNlID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8tcmVwbGFjZS13aXRoLWxvYWRlci1zZWxlY3RvcicpKTtcclxuXHJcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRlbGVtVG9IaWRlU2VsZWN0b3IuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudC1yZXBsYWNlZC1jb250YWluZXJcIiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHJcblx0XHQkKCcjY29udGVudC1yZXBsYWNlZC1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIiNzaGFyZS1wcm9qZWN0LWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cdFx0XHRcdGlmKHJlc3BvbnNlLnNoYXJlX25hbWUpe1xyXG5cdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignc3VjY2VzcycsICdZb3VyIG5hbWUgaXMgYmVpbmcgc2hhcmVkIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJycsICdZb3UgYXJlIG5vIGxvbmdlciBzaGFyaW5nIHlvdXIgbmFtZSB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKCcjc2hhcmVfbmFtZScpLnByb3AoJ2NoZWNrZWQnLCByZXNwb25zZS5zaGFyZV9uYW1lKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JCgnLmhlbHAtYmxvY2snLCAnI2xvZ2luRm9ybScpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbigpeyBcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuaGlkZSgpO1xyXG5cdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblxyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdFx0JCgnI2xvZ2luLXVzZXJuYW1lJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykudGV4dChkYXRhW1wicmVzcG9uc2VKU09OXCJdW1wiZXJyb3JzXCJdW1widXNlcm5hbWVcIl1bMF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnI25ldy10b3BpYy1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0XHRzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN1Ym1pdEJ1dHRvbikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0Y29udGV4dDogJCh0aGlzKSxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucy5jcmVhdGVFZGl0VG9waWNET00oZGF0YVtcImlkXCJdLCBkYXRhW1wibmFtZVwiXSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKS5odG1sKCdBZGQnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBORVcgVVNFUlxyXG5cdC8vIHB1dCB0aGlzIHN0dWZmIGluIGFuIGFycmF5XHJcblx0Ly8gJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHQvLyAkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cclxuXHQvLyAkKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdC8vIFx0aWYoJCgnLm5ldy11c2VyLXN0dWRlbnQnKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdC8vIFx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdC8vIFx0fSBlbHNlIHtcclxuXHQvLyBcdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHQvLyBcdH1cclxuXHQvLyBcdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0Ly8gXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0Ly8gXHR9IGVsc2Uge1xyXG5cdC8vIFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH0pO1xyXG5cclxuXHQkKFwiLmZhdm91cml0ZS1jb250YWluZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc3ZnQ29udGFpbmVyID0gJCh0aGlzKTtcclxuXHRcdHZhciBzdmcgPSBzdmdDb250YWluZXIuZmluZCgnc3ZnJyk7XHJcblx0XHR2YXIgcHJvamVjdElkID0gd2luZG93Wydwcm9qZWN0J10uZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cclxuXHRcdHN2Zy5oaWRlKDApO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuc2hvdygwKTtcclxuXHJcblx0XHRpZihzdmcuaGFzQ2xhc3MoJ2Zhdm91cml0ZScpKXtcclxuXHRcdFx0dmFyIGFjdGlvbiA9ICdyZW1vdmUnO1xyXG5cdFx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvcmVtb3ZlLWZhdm91cml0ZSc7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGFjdGlvbiA9ICdhZGQnO1xyXG5cdFx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvYWRkLWZhdm91cml0ZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKGFjdGlvbiA9PSBcImFkZFwiKXtcclxuXHRcdFx0XHRcdHN2Zy5hZGRDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHN2Zy5yZW1vdmVDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRzdmcuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCk7XHJcblx0XHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLmhpZGUoMCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnbmF2Lm1vYmlsZSAuc3ViLWRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBkcm9wZG93biA9ICQodGhpcyk7XHJcblx0XHR2YXIgY29udGVudCA9IGRyb3Bkb3duLmZpbmQoJy5kcm9wZG93bi1jb250ZW50Jyk7XHJcblxyXG5cdFx0aWYoZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBmYWxzZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5oaWRlKGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIHRydWUpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBmYWxzZSk7XHJcblxyXG5cdFx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMTgwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuc2hvdyhjb25maWcuYW5pbXRpb25zLm1lZGl1bSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PVxyXG5cdFx0OS4gSW5pdGlhbGlzZVxyXG5cdCAgID09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvLyBVc2VkIGFzIGFuIGVhc3kgd2F5IGZvciBmdW5jdGlvbnMgdG8gZ2V0IGN1cnJlbnQgcHJvamVjdCBkYXRhXHJcblx0aWYoJCgnLnByb2plY3QtY2FyZCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0d2luZG93Wydwcm9qZWN0J10gPSAkKCcucHJvamVjdC1jYXJkJyk7XHJcblx0fVxyXG5cclxuXHQkKCcuYW5pbWF0ZS1jYXJkcyAuY2FyZCcpLmNzcyhcIm9wYWNpdHlcIiwgMCk7XHJcblxyXG5cdHZhciBkZWxheSA9IDA7XHJcblx0JCgnLmFuaW1hdGUtY2FyZHMgLmNhcmQnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0ZGVsYXkgKz0gMjAwO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdG9wYWNpdHk6IDFcclxuXHRcdFx0fSw0MDApO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcInNsaWRlSW5VcCBhbmltYXRlZFwiKTtcclxuXHRcdH0uYmluZCh0aGlzKSwgZGVsYXkpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLmFqYXhFcnJvcihmdW5jdGlvbiggZXZlbnQsIHJlcXVlc3QsIHNldHRpbmdzICkge1xyXG5cdGlmKGNvbmZpZy5zaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uKXtcclxuXHRcdHNob3dOb3RpZmljYXRpb24oJ2Vycm9yJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggdGhhdCByZXF1ZXN0LicpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanMiLCIvKiBGSUxFIFNUUlVDVFVSRVxyXG5cclxuKi9cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZJTEUgU1RSVUNUVVJFXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnxcdDEuIE1vYmlsZSBNZW51XHJcbnxcdDIuIERpYWxvZyAvIE1vZGFsXHJcbnxcdDMuIERhdGEgVGFibGVcclxufFx0NS4gRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG58XHQ2LiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcbnxcdDcuIE1lbnVcclxufFxyXG4qL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQgMS4gTW9iaWxlIE1lbnVcclxuXHQgICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0XHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBtb2JpbGUgbWVudS5cclxuXHRcdCpcclxuXHRcdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgTW9iaWxlTWVudSA9ICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsZW1lbnQpIHtcclxuXHRcdGlmKHdpbmRvd1snTW9iaWxlTWVudSddID09IG51bGwpe1xyXG5cdFx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXSA9IHRoaXM7XHJcblx0XHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHRcdHRoaXMuYWN0aXZhdG9yID0gJCh0aGlzLlNlbGVjdG9yc18uSEFNQlVSR0VSX0NPTlRBSU5FUik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkgPSAkKHRoaXMuU2VsZWN0b3JzXy5VTkRFUkxBWSk7XHJcblx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJUaGVyZSBjYW4gb25seSBiZSBvbmUgbW9iaWxlIG1lbnUuXCIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdE1PQklMRV9NRU5VOiAnbmF2Lm1vYmlsZScsXHJcblx0XHRIQU1CVVJHRVJfQ09OVEFJTkVSOiAnLmhhbWJ1cmdlci1jb250YWluZXInLFxyXG5cdFx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0XHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtb2JpbGVNZW51ID0gdGhpcztcclxuXHRcdHRoaXMuYWN0aXZhdG9yLm9uKCdjbGljaycsIG1vYmlsZU1lbnUub3Blbk1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0XHR0aGlzLnVuZGVybGF5Lm9uKCdjbGljaycsIG1vYmlsZU1lbnUuY2xvc2VNZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5NT0JJTEVfTUVOVSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5tb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Mi4gRGlhbG9nIC8gTW9kYWxcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdHZhciBEaWFsb2cgPSBmdW5jdGlvbiBEaWFsb2coZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0XHR0aGlzLnVuZGVybGF5ID0gJCgnLnVuZGVybGF5Jyk7XHJcblx0XHR0aGlzLmhlYWRlciA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0hFQURFUik7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHJcblx0XHQvLyBSZWdpc3RlciBDb21wb25lbnRcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyhcInJlZ2lzdGVyZWRcIik7XHJcblxyXG5cdFx0Ly8gQVJJQVxyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJkaWFsb2ctdGl0bGVcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJkaWFsb2ctZGVzY1wiKTtcclxuXHRcdHRoaXMuaGVhZGVyLmF0dHIoJ3RpdGxlJywgdGhpcy5oZWFkZXIuZmluZCgnI2RpYWxvZy1kZXNjJykuaHRtbCgpKTtcclxuXHJcblx0XHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdFx0dGhpcy5sb2FkZXIgPSAkKGVsZW1lbnQpLmZpbmQoXCIubG9hZGVyXCIpO1xyXG5cdFx0dGhpcy5pc0Nsb3NhYmxlID0gdHJ1ZTtcclxuXHRcdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdFx0TE9BREVSOiAnPGRpdiBjbGFzcz1cImxvYWRlclwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4O3RvcDogMjUlO1wiPjwvZGl2PicsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdEFDVElWRTogJ2FjdGl2ZScsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RElBTE9HOiAnLmRpYWxvZycsXHJcblx0XHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0XHRESUFMT0dfQ09OVEVOVDogJy5jb250ZW50JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5sb2FkZXIuc2hvdygwKTtcclxuXHRcdHRoaXMuY29udGVudC5oaWRlKDApO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZUxvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5oaWRlKDApO1xyXG5cdFx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIiwgdGhpcy5kaWFsb2dOYW1lKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR3aW5kb3dbJ0RpYWxvZyddID0gdGhpcztcclxuXHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZURpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmlzQ2xvc2FibGUgJiYgdGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIikgPT0gdGhpcy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHRcdHZhciBkaWFsb2cgPSB0aGlzO1xyXG5cclxuXHRcdC8vIEZpbmQgYWN0aXZhdG9yIGJ1dHRvblxyXG5cdFx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdhY3RpdmF0b3InKSAmJiAkKHRoaXMpLmRhdGEoJ2RpYWxvZycpID09IGRpYWxvZy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0XHRkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucy5wdXNoKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHRkaWFsb2cuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0ZGlhbG9nLnVuZGVybGF5Lm9uKCdjbGljaycsIGRpYWxvZy5oaWRlRGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblxyXG5cdFx0dHJ5e1xyXG5cdFx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykub24oJ2NsaWNrJywgZGlhbG9nLnNob3dEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoKGVycil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJEaWFsb2cgXCIgKyBkaWFsb2cuZGlhbG9nTmFtZSArIFwiIGhhcyBubyBhY3RpdmF0b3IgYnV0dG9uLlwiKTtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZGlhbG9nID0gbmV3IERpYWxvZyh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzKS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZS5rZXlDb2RlID09IDI3ICYmIHdpbmRvd1snRGlhbG9nJ10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snRGlhbG9nJ10uaGlkZURpYWxvZygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydNb2JpbGVNZW51J10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDMuIERhdGEgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHRcdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0XHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdFx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0XHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0XHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRcdGlmIChyb3cpIHtcclxuXHRcdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDMgQ29sdW1uIFRvZ2dsZSBUYWJsZVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBDb2x1bW5Ub2dnbGVUYWJsZSA9IGZ1bmN0aW9uIENvbHVtblRvZ2dsZVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWQgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyJyk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0NvbHVtblRvZ2dsZVRhYmxlJ10gPSBDb2x1bW5Ub2dnbGVUYWJsZTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdFRPR0dMRV9UQUJMRTogJy50YWJsZS1jb2x1bW4tdG9nZ2xlJ1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdFx0Q09MVU1OX1NFTEVDVE9SX0JVVFRPTjogJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgZG90LW1lbnVfX2FjdGl2YXRvclwiIHN0eWxlPVwiZGlzcGxheTpibG9jazttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWxlZnQ6YXV0bztcIj5Db2x1bW5zPC9idXR0b24+JyxcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9NRU5VOiAnPHVsIGNsYXNzPVwiZG90LW1lbnUgZG90LW1lbnUtLWJvdHRvbS1sZWZ0XCI+PC91bD4nXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHJcblx0XHR0b2dnbGVDb2x1bW46IGZ1bmN0aW9uKGNvbHVtbkluZGV4LCB0YWJsZSwgY2hlY2tlZCkge1xyXG5cdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuYXR0cignaGlkZGVuJywgXCJ0cnVlXCIpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaDogZnVuY3Rpb24odGFibGUpIHtcclxuXHRcdFx0dmFyIGhpZGVJbmRpY2VzID0gW107XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cyA9IHRhYmxlLmVsZW1lbnQuZmluZCgndGJvZHkgdHInKTtcclxuXHJcblx0XHRcdHRhYmxlLmhlYWRlcnMuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKCQodGhpcykuYXR0cignaGlkZGVuJykpe1xyXG5cdFx0XHRcdFx0aGlkZUluZGljZXMucHVzaCgkKHRoaXMpLmluZGV4KCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoaWRlSW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGhpZGVJbmRpY2VzW2ldKS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaEFsbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMucmVmcmVzaCh0aGlzLkNvbHVtblRvZ2dsZVRhYmxlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmKCF0aGlzLmVsZW1lbnQuYXR0cignaWQnKSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiQ29sdW1uVG9nZ2xlVGFibGUgcmVxdWlyZXMgdGhlIHRhYmxlIHRvIGhhdmUgYW4gdW5pcXVlIElELlwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0b2dnbGVUYWJsZSA9IHRoaXM7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JCdXR0b24gPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfQlVUVE9OKTtcclxuXHRcdHZhciBjb2x1bW5TZWxlY3Rvck1lbnUgPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfTUVOVSk7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgPSAnQ29sdW1uVG9nZ2xlVGFibGUtJyArIHRvZ2dsZVRhYmxlLmVsZW1lbnQuYXR0cignaWQnKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuYmVmb3JlKGNvbHVtblNlbGVjdG9yQnV0dG9uKTtcclxuXHJcblx0XHRjb2x1bW5TZWxlY3RvckJ1dHRvbi5hZnRlcihjb2x1bW5TZWxlY3Rvck1lbnUpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCk7XHJcblx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCArICctbWVudScpO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBjb2x1bW5TZWxlY3RvckJ1dHRvbjtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gY29sdW1uU2VsZWN0b3JNZW51O1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51LmZpbmQoJ3VsJykuZGF0YShcInRhYmxlXCIsIHRvZ2dsZVRhYmxlLmVsZW1lbnQuYXR0cignaWQnKSk7XHJcblxyXG5cdFx0dGhpcy5oZWFkZXJzLmVhY2goZnVuY3Rpb24gKCl7XHJcblx0XHRcdHZhciBjaGVja2VkID0gJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSA/IFwiY2hlY2tlZFwiIDogXCJcIjtcclxuXHRcdFx0JCh0aGlzKS5kYXRhKCd2aXNpYmxlJywgJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSk7XHJcblxyXG5cdFx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXBwZW5kKCdcXFxyXG5cdFx0XHRcdDxsaSBjbGFzcz1cImRvdC1tZW51X19pdGVtIGRvdC1tZW51X19pdGVtLS1wYWRkZWRcIj4gXFxcclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjaGVja2JveFwiPiBcXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJjb2x1bW4tdG9nZ2xlXCIgaWQ9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiIHR5cGU9XCJjaGVja2JveFwiICcrIGNoZWNrZWQgKyc+IFxcXHJcblx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiPicgKyAkKHRoaXMpLnRleHQoKSArICc8L2xhYmVsPiBcXFxyXG5cdFx0XHRcdFx0PC9kaXY+IFxcXHJcblx0XHRcdFx0PC9saT4nKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCJib2R5XCIpLm9uKFwiY2hhbmdlXCIsIFwiLmNvbHVtbi10b2dnbGVcIiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCgnLmNvbHVtbi10b2dnbGUnKS5pbmRleCh0aGlzKTtcclxuXHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy50b2dnbGVDb2x1bW4oaW5kZXgsIHRvZ2dsZVRhYmxlLCAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSA9IG5ldyBDb2x1bW5Ub2dnbGVUYWJsZSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQWpheEZ1bmN0aW9ucyA9ICBmdW5jdGlvbiBBamF4RnVuY3Rpb25zKCkge307XHJcblx0d2luZG93WydBamF4RnVuY3Rpb25zJ10gPSBBamF4RnVuY3Rpb25zO1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdFNFQVJDSF9JTlBVVDogJy5zZWFyY2gtaW5wdXQnLFxyXG5cdFx0U0VBUkNIX0NPTlRBSU5FUjogJy5zZWFyY2gtY29udGFpbmVyJyxcclxuXHRcdFNFQVJDSF9GSUxURVJfQ09OVEFJTkVSOiAnLnNlYXJjaC1maWx0ZXItY29udGFpbmVyJyxcclxuXHRcdFNFQVJDSF9GSUxURVJfQlVUVE9OOiAnI3NlYXJjaC1maWx0ZXItYnV0dG9uJyxcclxuXHRcdExPR19JTl9ESUFMT0c6ICcubG9naW4uZGlhbG9nJyxcclxuXHR9O1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5LZXlzXyA9IHtcclxuXHRcdFNQQUNFOiAzMixcclxuXHRcdEVOVEVSOiAxMyxcclxuXHRcdENPTU1BOiA0NVxyXG5cdH07XHJcblxyXG5cdC8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXNcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXMnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy1mb2N1cycpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzIG91dFxyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1c291dCcsICBmdW5jdGlvbihlKXtcclxuXHRcdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LTJkcCcpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBTRUFSQ0hcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9CVVRUT04pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9ICQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0NPTlRBSU5FUik7XHJcblx0XHR2YXIgZmlsdGVyQnV0dG9uID0gJCh0aGlzKTtcclxuXHJcblx0XHRpZihjb250YWluZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0Y29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLmJsdXIoKTtcclxuXHRcdH0gZWxzZXtcclxuXHRcdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEVkaXRUb3BpYyA9IGZ1bmN0aW9uIEVkaXRUb3BpYyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5vcmlnaW5hbE5hbWUgPSAkKGVsZW1lbnQpLmRhdGEoXCJvcmlnaW5hbC10b3BpYy1uYW1lXCIpO1xyXG5cdFx0dGhpcy50b3BpY0lkID0gJChlbGVtZW50KS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdFx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmVkaXQtdG9waWMnKTtcclxuXHRcdHRoaXMuZGVsZXRlQnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZGVsZXRlLXRvcGljJyk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0VkaXRUb3BpYyddID0gRWRpdFRvcGljO1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRFRElUX1RPUElDOiAnLmVkaXQtdG9waWMtbGlzdCAudG9waWMnLFxyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRERUxFVEVfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRQQVRDSF9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRcdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0aWYodG9waWMub3JpZ2luYWxOYW1lID09IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0NoYW5nZSBUb3BpYyBOYW1lJyxcclxuXHRcdFx0XHR0eXBlOiAnYmx1ZScsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gPGI+XCInICsgIHRvcGljLm9yaWdpbmFsTmFtZSArICdcIjwvYj4gdG8gPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsnXCI8L2I+PycsXHJcblx0XHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ibHVlJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdFx0JCgnLmxvYWRlcicsIHRvcGljLmVsZW1lbnQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX25hbWUgOiB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMub3JpZ2luYWxOYW1lID0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjYW5jZWw6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHRcdHRpdGxlOiAnRGVsZXRlJyxcclxuXHRcdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsgJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGRlbGV0ZToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLmVsZW1lbnQuaGlkZShjb25maWcuYW5pbXRpb25zLnNsb3csIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNyZWF0ZUVkaXRUb3BpY0RPTTogZnVuY3Rpb24odG9waWNJZCwgb3JpZ2luYWxOYW1lKXtcclxuXHRcdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZWRpdFRvcGljID0gdGhpcztcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmRlbGV0ZVRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5FRElUX1RPUElDKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkVkaXRUb3BpYyA9IG5ldyBFZGl0VG9waWModGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgICA3IERvdE1lbnVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRG90TWVudSA9IGZ1bmN0aW9uIE1lbnUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5idXR0b24gPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5tZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSBmYWxzZTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRET1RfTUVOVTogJy5kb3QtbWVudScsXHJcblx0XHRBQ1RJVkFUT1I6ICcuZG90LW1lbnVfX2FjdGl2YXRvcicsXHJcblx0XHRJU19WSVNJQkxFOiAnLmlzLXZpc2libGUnLFxyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnLFxyXG5cdFx0Qk9UVE9NX0xFRlQ6ICdkb3QtbWVudS0tYm90dG9tLWxlZnQnLFxyXG5cdFx0Qk9UVE9NX1JJR0hUOiAnZG90LW1lbnUtLWJvdHRvbS1yaWdodCcsXHJcblx0XHRUT1BfTEVGVDogJ2RvdC1tZW51LS10b3AtbGVmdCcsXHJcblx0XHRUT1BfUklHSFQ6ICdkb3QtbWVudS0tdG9wLXJpZ2h0JyxcclxuXHRcdFRBQkxFX0RPVF9NRU5VOiAnZG90LW1lbnUtLXRhYmxlJ1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYnV0dG9uUmVjdCA9IHRoaXMuYnV0dG9uWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9MRUZUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AgcmlnaHQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fUklHSFQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AgbGVmdCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9MRUZUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QucmlnaHQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAnYm90dG9tIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAnYm90dG9tIGxlZnQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpe1xyXG5cdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQodGhpcykoKTtcclxuXHRcdHRoaXMubWVudS5hZGRDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHRcdHRoaXMubWVudS5zaG93KCk7XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubWVudS5yZW1vdmVDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHRcdHRoaXMubWVudS5oaWRlKCk7XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKHRoaXMpKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS5zaG93LmJpbmQodGhpcykoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZG90TWVudSA9IHRoaXM7XHJcblx0XHR2YXIgbWVudUlkID0gJCh0aGlzLmJ1dHRvbikuYXR0cignaWQnKSArICctbWVudSc7XHJcblxyXG5cdFx0dGhpcy5tZW51ID0gJCgnIycgKyBtZW51SWQpO1xyXG5cdFx0dGhpcy5pc1RhYmxlRG90TWVudSA9IHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5UQUJMRV9ET1RfTUVOVSk7XHJcblxyXG5cdFx0dGhpcy5idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS50b2dnbGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0aWYoIXRhcmdldC5pcyhkb3RNZW51Lm1lbnUpIHx8ICF0YXJnZXQuaXMoZG90TWVudS5idXR0b24pKSB7XHJcblx0XHRcdFx0aWYoISQuY29udGFpbnMoJChkb3RNZW51Lm1lbnUpWzBdLCBlLnRhcmdldCkpe1xyXG5cdFx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5BQ1RJVkFUT1IpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuRG90TWVudSA9IG5ldyBEb3RNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQ1LiBTZWNvbmQgTWFya2VyXHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdHZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0XHRpZigkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKS5sZW5ndGggPCAxIHx8ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpLmxlbmd0aCA8IDEpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0XHR0aGlzLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0XHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdFx0dGhpcy5zdHVkZW50RGF0YVRhYmxlID0gdGhpcy5zdHVkZW50VGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdFx0dGhpcy5zdXBlcnZpc29yVGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRBU1NJR05fTUFSS0VSOiAnL2FkbWluL21hcmtlci1hc3NpZ24nLFxyXG5cdH07XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCA9IGZ1bmN0aW9uKHN0dWRlbnRSb3dET00sIG1hcmtlcil7XHJcblx0XHR2YXIgcm93ID0gJChzdHVkZW50Um93RE9NKTtcclxuXHJcblx0XHRtYXJrZXIudW5zZWxlY3RBbGwobWFya2VyKTtcclxuXHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9ICQocm93KTtcclxuXHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ21hcmtlci1pZCcpID09IHJvdy5kYXRhKCdzdXBlcnZpc29yLWlkJykpe1xyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvciA9IGZ1bmN0aW9uKHN1cGVydmlzb3JSb3dET00sIG1hcmtlcil7XHJcblx0XHR2YXIgcm93ID0gJChzdXBlcnZpc29yUm93RE9NKTtcclxuXHJcblx0XHRpZihyb3cuYXR0cignZGlzYWJsZWQnKSl7cmV0dXJuO31cclxuXHJcblx0XHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ICE9IG51bGwpe1xyXG5cdFx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IHJvdztcclxuXHRcdFx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nKFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdXBlcnZpc29yLW5hbWUnKSxcclxuXHRcdFx0XHRyb3cuZGF0YSgnbWFya2VyLW5hbWUnKSxcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnJlc2V0VmlldyA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oc3R1ZGVudE5hbWUsIHN1cGVydmlzb3JOYW1lLCBtYXJrZXJOYW1lLCBwcm9qZWN0KXtcclxuXHRcdCQoXCIjc3R1ZGVudC1uYW1lXCIpLnRleHQoc3R1ZGVudE5hbWUpO1xyXG5cdFx0JChcIiNzdXBlcnZpc29yLW5hbWVcIikudGV4dChzdXBlcnZpc29yTmFtZSk7XHJcblx0XHQkKFwiI21hcmtlci1uYW1lXCIpLnRleHQobWFya2VyTmFtZSk7XHJcblxyXG5cdFx0JChcIiNwcm9qZWN0LXRpdGxlXCIpLmh0bWwoJzxiPlRpdGxlOiA8L2I+JyArIHByb2plY3RbJ3RpdGxlJ10pO1xyXG5cdFx0JChcIiNwcm9qZWN0LWRlc2NyaXB0aW9uXCIpLmh0bWwoJzxiPkRlc2NyaXB0aW9uOiA8L2I+JyArIHByb2plY3RbJ2Rlc2NyaXB0aW9uJ10pO1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdH1cclxuXHJcblx0JCgnI3N1Ym1pdEFzc2lnbk1hcmtlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbWFya2VyID0gd2luZG93WydNYXJrZXInXTtcclxuXHJcblx0XHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9PSBudWxsKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH07XHJcblxyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdFx0dmFyIHByb2plY3RJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpWydpZCddO1xyXG5cdFx0dmFyIHN0dWRlbnRJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1pZCcpO1xyXG5cdFx0dmFyIG1hcmtlcklkID0gbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvci5kYXRhKCdtYXJrZXItaWQnKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHRcdHVybDogbWFya2VyLlVybHNfLkFTU0lHTl9NQVJLRVIsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWQsXHJcblx0XHRcdFx0c3R1ZGVudF9pZDogc3R1ZGVudElkLFxyXG5cdFx0XHRcdG1hcmtlcl9pZDogbWFya2VySWQsXHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQucmVtb3ZlKCk7XHJcblx0XHRcdG1hcmtlci5yZXNldFZpZXcobWFya2VyKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHRoaXM7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50KHRoaXMsIG1hcmtlcik7IH0pO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvcih0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR3aW5kb3dbJ01hcmtlciddID0gbmV3IE1hcmtlcigpO1xyXG5cdH1cclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMuanMiXSwic291cmNlUm9vdCI6IiJ9