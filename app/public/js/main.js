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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* FILE STRUCTURE

1. AJAX Setup
3. HTML Modifications
4. Components
	4.1 Mobile Menu
	4.2 Dialog / Modal
	4.3 Data Table
	4.5 Forms / AJAX Functions
	4.6 Edit Topics [Admin]
	4.7 Menu
5. Second Marker
8. Other
9. Initialise Everything
*/



function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 	3. HTML Modifications
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
 	4.2 Dialog / Modal
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
	};

	DataTable.prototype.initAll = function () {
		$(this.Selectors_.DATA_TABLE).each(function () {
			this.dataTable = new DataTable(this);
		});
	};

	/* ========================
 	4.3 Column Toggle Table
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
    4.7 DotMenu
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

	/* ======================
 	 8. OTHER
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
	MobileMenu.prototype.initAll();
	Dialog.prototype.initAll();
	DataTable.prototype.initAll();
	ColumnToggleTable.prototype.initAll();
	EditTopic.prototype.initAll();
	Marker.prototype.initAll();
	DotMenu.prototype.initAll();

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjZlYTA3NGYwYzliZjEyN2E2NjMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImxlbmd0aCIsImFwcGVuZCIsInByZXBlbmQiLCJmYWRlT3V0IiwiY29uZmlnIiwiYW5pbXRpb25zIiwic3VwZXJGYXN0IiwiZmlyc3QiLCJmYWRlSW4iLCJmYXN0Iiwic2hvd05leHQiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIk1vYmlsZU1lbnUiLCJlbGVtZW50Iiwid2luZG93IiwiYWN0aXZhdG9yIiwiU2VsZWN0b3JzXyIsIkhBTUJVUkdFUl9DT05UQUlORVIiLCJ1bmRlcmxheSIsIlVOREVSTEFZIiwiaW5pdCIsImxvZyIsInByb3RvdHlwZSIsIkNzc0NsYXNzZXNfIiwiSVNfVklTSUJMRSIsIk1PQklMRV9NRU5VIiwib3Blbk1lbnUiLCJhZGRDbGFzcyIsImNsb3NlTWVudSIsInJlbW92ZUNsYXNzIiwibW9iaWxlTWVudSIsIm9uIiwiYmluZCIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiZGF0YSIsImhlYWRlciIsImZpbmQiLCJESUFMT0dfSEVBREVSIiwiY29udGVudCIsIkRJQUxPR19DT05URU5UIiwiaHRtbCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dMb2FkZXIiLCJzaG93IiwiaGlkZSIsImhpZGVMb2FkZXIiLCJzaG93RGlhbG9nIiwiaGlkZURpYWxvZyIsImRpYWxvZyIsInB1c2giLCJlcnIiLCJkb2N1bWVudCIsInJlYWR5Iiwia2V5ZG93biIsImUiLCJrZXlDb2RlIiwiRGF0YVRhYmxlIiwiYm9keVJvd3MiLCJmb290Um93cyIsInJvd3MiLCJtZXJnZSIsImNoZWNrYm94ZXMiLCJDSEVDS0JPWCIsIm1hc3RlckNoZWNrYm94IiwiTUFTVEVSX0NIRUNLQk9YIiwiREFUQV9UQUJMRSIsIklTX1NFTEVDVEVEIiwiZnVuY3Rpb25zIiwic2VsZWN0QWxsUm93cyIsImlzIiwicHJvcCIsInNlbGVjdFJvdyIsImNoZWNrYm94Iiwicm93IiwiZGF0YVRhYmxlIiwicHJveHkiLCJpIiwiZXEiLCJDb2x1bW5Ub2dnbGVUYWJsZSIsImhlYWQiLCJzZWxlY3Rvck1lbnUiLCJzZWxlY3RvckJ1dHRvbiIsIlRPR0dMRV9UQUJMRSIsIkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04iLCJDT0xVTU5fU0VMRUNUT1JfTUVOVSIsInRvZ2dsZUNvbHVtbiIsImNvbHVtbkluZGV4IiwidGFibGUiLCJjaGVja2VkIiwiY2hpbGRyZW4iLCJyZW1vdmVBdHRyIiwicmVmcmVzaCIsImhpZGVJbmRpY2VzIiwiaW5kZXgiLCJyZWZyZXNoQWxsIiwidG9nZ2xlVGFibGUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbiIsImNvbHVtblNlbGVjdG9yTWVudSIsImNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkIiwiYWZ0ZXIiLCJ0ZXh0IiwiQWpheEZ1bmN0aW9ucyIsIlNFQVJDSF9JTlBVVCIsIlNFQVJDSF9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQlVUVE9OIiwiTE9HX0lOX0RJQUxPRyIsIktleXNfIiwiU1BBQ0UiLCJFTlRFUiIsIkNPTU1BIiwicmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyIsImNvbnRhaW5lciIsImZpbHRlckJ1dHRvbiIsImJsdXIiLCJFZGl0VG9waWMiLCJvcmlnaW5hbE5hbWUiLCJ0b3BpY0lkIiwidG9waWNOYW1lSW5wdXQiLCJlZGl0QnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwiRURJVF9UT1BJQyIsIlVybHNfIiwiREVMRVRFX1RPUElDIiwiUEFUQ0hfVE9QSUMiLCJORVdfVE9QSUMiLCJlZGl0VG9waWMiLCJ0b3BpYyIsInZhbCIsImNvbmZpcm0iLCJ0aXRsZSIsInR5cGUiLCJpY29uIiwidGhlbWUiLCJlc2NhcGVLZXkiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsImFuaW1hdGVGcm9tRWxlbWVudCIsImJ1dHRvbnMiLCJidG5DbGFzcyIsImFjdGlvbiIsImNzcyIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJjb250ZXh0IiwidG9waWNfaWQiLCJ0b3BpY19uYW1lIiwiZG9uZSIsImNhbmNlbCIsImRlbGV0ZVRvcGljIiwiZGVsZXRlIiwic3VjY2VzcyIsInNsb3ciLCJyZW1vdmUiLCJjcmVhdGVFZGl0VG9waWNET00iLCJEb3RNZW51IiwiTWVudSIsImJ1dHRvbiIsIm1lbnUiLCJpc1RhYmxlRG90TWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIlRBQkxFX0RPVF9NRU5VIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImxlZnQiLCJwYXJzZUludCIsInRvcCIsInJpZ2h0IiwidG9nZ2xlIiwiZG90TWVudSIsIm1lbnVJZCIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNvbnRhaW5zIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0IiwicHJvamVjdElkIiwic3R1ZGVudElkIiwibWFya2VySWQiLCJwcm9qZWN0X2lkIiwic3R1ZGVudF9pZCIsIm1hcmtlcl9pZCIsInNlbGVjdCIsImRvbSIsInN0YXR1cyIsInBhcmVudHMiLCJlbWFpbFN0cmluZyIsImNoZWNrYm94U2VsZWN0b3IiLCJlbWFpbEJ1dHRvbnNlbGVjdG9yIiwidmFsdWUiLCJzZXRUaW1lb3V0IiwiYWxlcnQiLCJwcmV2ZW50RGVmYXVsdCIsImVsZW1Ub0hpZGVTZWxlY3RvciIsImVsZW1Ub1JlcGxhY2UiLCJzZXJpYWxpemUiLCJyZXNwb25zZSIsIkpTT04iLCJwYXJzZSIsInNoYXJlX25hbWUiLCJzaG93Tm90aWZpY2F0aW9uIiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdWJtaXRCdXR0b24iLCJzdmdDb250YWluZXIiLCJzdmciLCJhamF4VXJsIiwiZHJvcGRvd24iLCJtZWRpdW0iLCJkZWxheSIsImFuaW1hdGUiLCJvcGFjaXR5IiwiYWpheEVycm9yIiwiZXZlbnQiLCJyZXF1ZXN0Iiwic2V0dGluZ3MiLCJzaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNB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QSxDQXRqQ0E7O0FBd2pDRDlQLEVBQUV3RSxRQUFGLEVBQVl5TCxTQUFaLENBQXNCLFVBQVVDLEtBQVYsRUFBaUJDLE9BQWpCLEVBQTBCQyxRQUExQixFQUFxQztBQUMxRCxLQUFHNVAsT0FBTzZQLCtCQUFWLEVBQTBDO0FBQ3pDaEIsbUJBQWlCLE9BQWpCLEVBQTBCLHlDQUExQjtBQUNBO0FBQ0QsQ0FKRCxFIiwiZmlsZSI6IlxcanNcXG1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjZlYTA3NGYwYzliZjEyN2E2NjMiLCJcclxuLyogRklMRSBTVFJVQ1RVUkVcclxuXHJcbjEuIEFKQVggU2V0dXBcclxuMy4gSFRNTCBNb2RpZmljYXRpb25zXHJcbjQuIENvbXBvbmVudHNcclxuXHQ0LjEgTW9iaWxlIE1lbnVcclxuXHQ0LjIgRGlhbG9nIC8gTW9kYWxcclxuXHQ0LjMgRGF0YSBUYWJsZVxyXG5cdDQuNSBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcblx0NC42IEVkaXQgVG9waWNzIFtBZG1pbl1cclxuXHQ0LjcgTWVudVxyXG41LiBTZWNvbmQgTWFya2VyXHJcbjguIE90aGVyXHJcbjkuIEluaXRpYWxpc2UgRXZlcnl0aGluZ1xyXG4qL1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0MS4gQUpBWCBTZXR1cFxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQkLmFqYXhTZXR1cCh7XHJcblx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpLFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDMuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHRpZigkKCcuc2hvdy0tc2Nyb2xsLXRvLXRvcCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0JCgnLm1haW4tY29udGVudCcpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBidXR0b24tLWFjY2VudCBzY3JvbGwtdG8tdG9wXCI+U2Nyb2xsIHRvIFRvcDwvYnV0dG9uPicpO1xyXG5cdH1cclxuXHJcblx0Ly8gQWNjZXNzaWJpbGl0eVxyXG5cdCQoJy5kcm9wZG93bicpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHQkKCcuZHJvcGRvd24gPiBidXR0b24nKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xyXG5cdCQoJy5kcm9wZG93biAuZHJvcGRvd24tY29udGVudCBhJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cclxuXHQvLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcblx0JCgnLnRvcGljcy1saXN0JykucHJlcGVuZCgkKCcuZmlyc3QnKSk7XHJcblx0JCgnLnRvcGljcy1saXN0IC5sb2FkZXInKS5mYWRlT3V0KGNvbmZpZy5hbmltdGlvbnMuc3VwZXJGYXN0KTtcclxuXHQkKCcudG9waWNzLWxpc3QgbGknKS5maXJzdCgpLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIGZ1bmN0aW9uIHNob3dOZXh0KCkge1xyXG5cdFx0JCh0aGlzKS5uZXh0KCBcIi50b3BpY3MtbGlzdCBsaVwiICkuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCwgc2hvd05leHQpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcub3JkZXItbGlzdC1qcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0XHQvLyBzb3J0VW5vcmRlcmVkTGlzdChsaXN0KTtcclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdsYXN0LW5hbWUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdhbHBoYS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkQWxwaGFIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ3RpdGxlLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRUaXRsZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT1cclxuXHRcdDQuIENvbXBvbmVudHNcclxuXHQgICA9PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQgNC4xIE1vYmlsZSBNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdFx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgbW9iaWxlIG1lbnUuXHJcblx0XHQqXHJcblx0XHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIE1vYmlsZU1lbnUgPSAgZnVuY3Rpb24gTW9iaWxlTWVudShlbGVtZW50KSB7XHJcblx0XHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlcmUgY2FuIG9ubHkgYmUgb25lIG1vYmlsZSBtZW51LlwiKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdFx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRcdFVOREVSTEFZOiAnLm1vYmlsZS1uYXYtdW5kZXJsYXknXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbW9iaWxlTWVudSA9IHRoaXM7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5vbignY2xpY2snLCBtb2JpbGVNZW51LmNsb3NlTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uTU9CSUxFX01FTlUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09ICovXHJcblx0dmFyIERpYWxvZyA9IGZ1bmN0aW9uIERpYWxvZyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5kaWFsb2dOYW1lID0gJChlbGVtZW50KS5kYXRhKCdkaWFsb2cnKTtcclxuXHRcdHRoaXMudW5kZXJsYXkgPSAkKCcudW5kZXJsYXknKTtcclxuXHRcdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHRcdHRoaXMuY29udGVudCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0NPTlRFTlQpO1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIENvbXBvbmVudFxyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwicmVnaXN0ZXJlZFwiKTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcInJvbGVcIiwgXCJkaWFsb2dcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtbGFiZWxsZWRieVwiLCBcImRpYWxvZy10aXRsZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImRpYWxvZy1kZXNjXCIpO1xyXG5cdFx0dGhpcy5oZWFkZXIuYXR0cigndGl0bGUnLCB0aGlzLmhlYWRlci5maW5kKCcjZGlhbG9nLWRlc2MnKS5odG1sKCkpO1xyXG5cclxuXHRcdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0XHR0aGlzLmxvYWRlciA9ICQoZWxlbWVudCkuZmluZChcIi5sb2FkZXJcIik7XHJcblx0XHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0QUNUSVZFOiAnYWN0aXZlJyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRcdERJQUxPR19IRUFERVI6ICcuaGVhZGVyJyxcclxuXHRcdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0xvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdFx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuc2hvdygwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHdpbmRvd1snRGlhbG9nJ10gPSB0aGlzO1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlRGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdC8vIE5lZWRlZCBmb3IgY29udGV4dFxyXG5cdFx0dmFyIGRpYWxvZyA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0XHQkKCdidXR0b24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ2FjdGl2YXRvcicpICYmICQodGhpcykuZGF0YSgnZGlhbG9nJykgPT0gZGlhbG9nLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFSSUFcclxuXHRcdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRkaWFsb2cudW5kZXJsYXkub24oJ2NsaWNrJywgZGlhbG9nLmhpZGVEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHJcblx0XHR0cnl7XHJcblx0XHRcdCQoZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBkaWFsb2cuc2hvd0RpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2goZXJyKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkRpYWxvZyBcIiArIGRpYWxvZy5kaWFsb2dOYW1lICsgXCIgaGFzIG5vIGFjdGl2YXRvciBidXR0b24uXCIpO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkRJQUxPRykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5kaWFsb2cgPSBuZXcgRGlhbG9nKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydEaWFsb2cnXS5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0NC4zIERhdGEgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHRcdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0XHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdFx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0XHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0XHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRcdGlmIChyb3cpIHtcclxuXHRcdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuMyBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIENvbHVtblRvZ2dsZVRhYmxlID0gZnVuY3Rpb24gQ29sdW1uVG9nZ2xlVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZCA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHInKTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IG51bGw7XHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snQ29sdW1uVG9nZ2xlVGFibGUnXSA9IENvbHVtblRvZ2dsZVRhYmxlO1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0VE9HR0xFX1RBQkxFOiAnLnRhYmxlLWNvbHVtbi10b2dnbGUnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfQlVUVE9OOiAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBkb3QtbWVudV9fYWN0aXZhdG9yXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO21hcmdpbi10b3A6MnJlbTttYXJnaW4tbGVmdDphdXRvO1wiPkNvbHVtbnM8L2J1dHRvbj4nLFxyXG5cdFx0Q09MVU1OX1NFTEVDVE9SX01FTlU6ICc8dWwgY2xhc3M9XCJkb3QtbWVudSBkb3QtbWVudS0tYm90dG9tLWxlZnRcIj48L3VsPidcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cclxuXHRcdHRvZ2dsZUNvbHVtbjogZnVuY3Rpb24oY29sdW1uSW5kZXgsIHRhYmxlLCBjaGVja2VkKSB7XHJcblx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkucmVtb3ZlQXR0cignaGlkZGVuJyk7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5hdHRyKCdoaWRkZW4nLCBcInRydWVcIik7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoOiBmdW5jdGlvbih0YWJsZSkge1xyXG5cdFx0XHR2YXIgaGlkZUluZGljZXMgPSBbXTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzID0gdGFibGUuZWxlbWVudC5maW5kKCd0Ym9keSB0cicpO1xyXG5cclxuXHRcdFx0dGFibGUuaGVhZGVycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoJCh0aGlzKS5hdHRyKCdoaWRkZW4nKSl7XHJcblx0XHRcdFx0XHRoaWRlSW5kaWNlcy5wdXNoKCQodGhpcykuaW5kZXgoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZGVJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoaGlkZUluZGljZXNbaV0pLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JChDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy5yZWZyZXNoKHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYoIXRoaXMuZWxlbWVudC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJDb2x1bW5Ub2dnbGVUYWJsZSByZXF1aXJlcyB0aGUgdGFibGUgdG8gaGF2ZSBhbiB1bmlxdWUgSUQuXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHRvZ2dsZVRhYmxlID0gdGhpcztcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbiA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04pO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yTWVudSA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9NRU5VKTtcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCA9ICdDb2x1bW5Ub2dnbGVUYWJsZS0nICsgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudC5iZWZvcmUoY29sdW1uU2VsZWN0b3JCdXR0b24pO1xyXG5cclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmFmdGVyKGNvbHVtblNlbGVjdG9yTWVudSk7XHJcblx0XHRjb2x1bW5TZWxlY3RvckJ1dHRvbi5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkKTtcclxuXHRcdGNvbHVtblNlbGVjdG9yTWVudS5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkICsgJy1tZW51Jyk7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IGNvbHVtblNlbGVjdG9yQnV0dG9uO1xyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUgPSBjb2x1bW5TZWxlY3Rvck1lbnU7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUuZmluZCgndWwnKS5kYXRhKFwidGFibGVcIiwgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpKTtcclxuXHJcblx0XHR0aGlzLmhlYWRlcnMuZWFjaChmdW5jdGlvbiAoKXtcclxuXHRcdFx0dmFyIGNoZWNrZWQgPSAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpID8gXCJjaGVja2VkXCIgOiBcIlwiO1xyXG5cdFx0XHQkKHRoaXMpLmRhdGEoJ3Zpc2libGUnLCAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpKTtcclxuXHJcblx0XHRcdGNvbHVtblNlbGVjdG9yTWVudS5hcHBlbmQoJ1xcXHJcblx0XHRcdFx0PGxpIGNsYXNzPVwiZG90LW1lbnVfX2l0ZW0gZG90LW1lbnVfX2l0ZW0tLXBhZGRlZFwiPiBcXFxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+IFxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNvbHVtbi10b2dnbGVcIiBpZD1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCIgdHlwZT1cImNoZWNrYm94XCIgJysgY2hlY2tlZCArJz4gXFxcclxuXHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCI+JyArICQodGhpcykudGV4dCgpICsgJzwvbGFiZWw+IFxcXHJcblx0XHRcdFx0XHQ8L2Rpdj4gXFxcclxuXHRcdFx0XHQ8L2xpPicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuY29sdW1uLXRvZ2dsZVwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKCcuY29sdW1uLXRvZ2dsZScpLmluZGV4KHRoaXMpO1xyXG5cdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnRvZ2dsZUNvbHVtbihpbmRleCwgdG9nZ2xlVGFibGUsICQodGhpcykucHJvcCgnY2hlY2tlZCcpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkNvbHVtblRvZ2dsZVRhYmxlID0gbmV3IENvbHVtblRvZ2dsZVRhYmxlKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG5cdHdpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRcdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0XHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0XHRTUEFDRTogMzIsXHJcblx0XHRFTlRFUjogMTMsXHJcblx0XHRDT01NQTogNDVcclxuXHR9O1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU0VBUkNIXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdFx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdFx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDQuNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEVkaXRUb3BpYyA9IGZ1bmN0aW9uIEVkaXRUb3BpYyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5vcmlnaW5hbE5hbWUgPSAkKGVsZW1lbnQpLmRhdGEoXCJvcmlnaW5hbC10b3BpYy1uYW1lXCIpO1xyXG5cdFx0dGhpcy50b3BpY0lkID0gJChlbGVtZW50KS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdFx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmVkaXQtdG9waWMnKTtcclxuXHRcdHRoaXMuZGVsZXRlQnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZGVsZXRlLXRvcGljJyk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0VkaXRUb3BpYyddID0gRWRpdFRvcGljO1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRFRElUX1RPUElDOiAnLmVkaXQtdG9waWMtbGlzdCAudG9waWMnLFxyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRERUxFVEVfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRQQVRDSF9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRcdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0aWYodG9waWMub3JpZ2luYWxOYW1lID09IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0NoYW5nZSBUb3BpYyBOYW1lJyxcclxuXHRcdFx0XHR0eXBlOiAnYmx1ZScsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gPGI+XCInICsgIHRvcGljLm9yaWdpbmFsTmFtZSArICdcIjwvYj4gdG8gPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsnXCI8L2I+PycsXHJcblx0XHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ibHVlJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdFx0JCgnLmxvYWRlcicsIHRvcGljLmVsZW1lbnQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX25hbWUgOiB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMub3JpZ2luYWxOYW1lID0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjYW5jZWw6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHRcdHRpdGxlOiAnRGVsZXRlJyxcclxuXHRcdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsgJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGRlbGV0ZToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLmVsZW1lbnQuaGlkZShjb25maWcuYW5pbXRpb25zLnNsb3csIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNyZWF0ZUVkaXRUb3BpY0RPTTogZnVuY3Rpb24odG9waWNJZCwgb3JpZ2luYWxOYW1lKXtcclxuXHRcdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZWRpdFRvcGljID0gdGhpcztcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmRlbGV0ZVRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5FRElUX1RPUElDKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkVkaXRUb3BpYyA9IG5ldyBFZGl0VG9waWModGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgICA0LjcgRG90TWVudVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBEb3RNZW51ID0gZnVuY3Rpb24gTWVudShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmJ1dHRvbiA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLm1lbnUgPSBudWxsO1xyXG5cdFx0dGhpcy5pc1RhYmxlRG90TWVudSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERPVF9NRU5VOiAnLmRvdC1tZW51JyxcclxuXHRcdEFDVElWQVRPUjogJy5kb3QtbWVudV9fYWN0aXZhdG9yJyxcclxuXHRcdElTX1ZJU0lCTEU6ICcuaXMtdmlzaWJsZScsXHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZScsXHJcblx0XHRCT1RUT01fTEVGVDogJ2RvdC1tZW51LS1ib3R0b20tbGVmdCcsXHJcblx0XHRCT1RUT01fUklHSFQ6ICdkb3QtbWVudS0tYm90dG9tLXJpZ2h0JyxcclxuXHRcdFRPUF9MRUZUOiAnZG90LW1lbnUtLXRvcC1sZWZ0JyxcclxuXHRcdFRPUF9SSUdIVDogJ2RvdC1tZW51LS10b3AtcmlnaHQnLFxyXG5cdFx0VEFCTEVfRE9UX01FTlU6ICdkb3QtbWVudS0tdGFibGUnXHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBidXR0b25SZWN0ID0gdGhpcy5idXR0b25bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX0xFRlQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCBsZWZ0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX0xFRlQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5yaWdodCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICdib3R0b20gcmlnaHQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfUklHSFQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICdib3R0b20gbGVmdCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcblx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZCh0aGlzKSgpO1xyXG5cdFx0dGhpcy5tZW51LmFkZENsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdFx0dGhpcy5tZW51LnNob3coKTtcclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5tZW51LnJlbW92ZUNsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdFx0dGhpcy5tZW51LmhpZGUoKTtcclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQodGhpcykoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLnNob3cuYmluZCh0aGlzKSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBkb3RNZW51ID0gdGhpcztcclxuXHRcdHZhciBtZW51SWQgPSAkKHRoaXMuYnV0dG9uKS5hdHRyKCdpZCcpICsgJy1tZW51JztcclxuXHJcblx0XHR0aGlzLm1lbnUgPSAkKCcjJyArIG1lbnVJZCk7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gdGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLlRBQkxFX0RPVF9NRU5VKTtcclxuXHJcblx0XHR0aGlzLmJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLnRvZ2dsZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihkb3RNZW51Lm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihkb3RNZW51Lm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRpZighdGFyZ2V0LmlzKGRvdE1lbnUubWVudSkgfHwgIXRhcmdldC5pcyhkb3RNZW51LmJ1dHRvbikpIHtcclxuXHRcdFx0XHRpZighJC5jb250YWlucygkKGRvdE1lbnUubWVudSlbMF0sIGUudGFyZ2V0KSl7XHJcblx0XHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkFDVElWQVRPUikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5Eb3RNZW51ID0gbmV3IERvdE1lbnUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT1cclxuXHRcdDUuIFNlY29uZCBNYXJrZXJcclxuXHQgICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0dmFyIE1hcmtlciA9IGZ1bmN0aW9uIE1hcmtlcigpIHtcclxuXHRcdGlmKCQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpLmxlbmd0aCA8IDEgfHwgJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIikubGVuZ3RoIDwgMSl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHRcdHRoaXMuc3R1ZGVudFRhYmxlID0gJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIik7XHJcblx0XHR0aGlzLnN0dWRlbnREYXRhVGFibGUgPSB0aGlzLnN0dWRlbnRUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdFx0dGhpcy5zdXBlcnZpc29yRGF0YVRhYmxlID0gdGhpcy5zdXBlcnZpc29yVGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRcdEFTU0lHTl9NQVJLRVI6ICcvYWRtaW4vbWFya2VyLWFzc2lnbicsXHJcblx0fTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50ID0gZnVuY3Rpb24oc3R1ZGVudFJvd0RPTSwgbWFya2VyKXtcclxuXHRcdHZhciByb3cgPSAkKHN0dWRlbnRSb3dET00pO1xyXG5cclxuXHRcdG1hcmtlci51bnNlbGVjdEFsbChtYXJrZXIpO1xyXG5cdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gJChyb3cpO1xyXG5cclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQodGhpcykuZGF0YSgnbWFya2VyLWlkJykgPT0gcm93LmRhdGEoJ3N1cGVydmlzb3ItaWQnKSl7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yID0gZnVuY3Rpb24oc3VwZXJ2aXNvclJvd0RPTSwgbWFya2VyKXtcclxuXHRcdHZhciByb3cgPSAkKHN1cGVydmlzb3JSb3dET00pO1xyXG5cclxuXHRcdGlmKHJvdy5hdHRyKCdkaXNhYmxlZCcpKXtyZXR1cm47fVxyXG5cclxuXHRcdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgIT0gbnVsbCl7XHJcblx0XHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gcm93O1xyXG5cdFx0XHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2coXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LW5hbWUnKSxcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N1cGVydmlzb3ItbmFtZScpLFxyXG5cdFx0XHRcdHJvdy5kYXRhKCdtYXJrZXItbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUucmVzZXRWaWV3ID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUudW5zZWxlY3RBbGwgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihzdHVkZW50TmFtZSwgc3VwZXJ2aXNvck5hbWUsIG1hcmtlck5hbWUsIHByb2plY3Qpe1xyXG5cdFx0JChcIiNzdHVkZW50LW5hbWVcIikudGV4dChzdHVkZW50TmFtZSk7XHJcblx0XHQkKFwiI3N1cGVydmlzb3ItbmFtZVwiKS50ZXh0KHN1cGVydmlzb3JOYW1lKTtcclxuXHRcdCQoXCIjbWFya2VyLW5hbWVcIikudGV4dChtYXJrZXJOYW1lKTtcclxuXHJcblx0XHQkKFwiI3Byb2plY3QtdGl0bGVcIikuaHRtbCgnPGI+VGl0bGU6IDwvYj4nICsgcHJvamVjdFsndGl0bGUnXSk7XHJcblx0XHQkKFwiI3Byb2plY3QtZGVzY3JpcHRpb25cIikuaHRtbCgnPGI+RGVzY3JpcHRpb246IDwvYj4nICsgcHJvamVjdFsnZGVzY3JpcHRpb24nXSk7XHJcblxyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0fVxyXG5cclxuXHQkKCcjc3VibWl0QXNzaWduTWFya2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB3aW5kb3dbJ01hcmtlciddO1xyXG5cclxuXHRcdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPT0gbnVsbCB8fCBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID09IG51bGwpe1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHR2YXIgcHJvamVjdElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JylbJ2lkJ107XHJcblx0XHR2YXIgc3R1ZGVudElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LWlkJyk7XHJcblx0XHR2YXIgbWFya2VySWQgPSBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yLmRhdGEoJ21hcmtlci1pZCcpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiUEFUQ0hcIixcclxuXHRcdFx0dXJsOiBtYXJrZXIuVXJsc18uQVNTSUdOX01BUktFUixcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZCxcclxuXHRcdFx0XHRzdHVkZW50X2lkOiBzdHVkZW50SWQsXHJcblx0XHRcdFx0bWFya2VyX2lkOiBtYXJrZXJJZCxcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5yZW1vdmUoKTtcclxuXHRcdFx0bWFya2VyLnJlc2V0VmlldyhtYXJrZXIpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbWFya2VyID0gdGhpcztcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQodGhpcywgbWFya2VyKTsgfSk7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yKHRoaXMsIG1hcmtlcik7IH0pO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdHdpbmRvd1snTWFya2VyJ10gPSBuZXcgTWFya2VyKCk7XHJcblx0fVxyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQgOC4gT1RIRVJcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuZW1haWwtdGFibGUgLmNoZWNrYm94IGlucHV0XCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGVjdCA9IGZ1bmN0aW9uKGRvbSl7XHJcblx0XHRcdHZhciBzdGF0dXMgPSBkb20ucGFyZW50cygpLmVxKDQpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdFx0XHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHRcdFx0dmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmVtYWlsLXRhYmxlLicgKyBzdGF0dXMgKyAnIC5jaGVja2JveCBpbnB1dCc7XHJcblx0XHRcdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblxyXG5cdFx0XHQkKGNoZWNrYm94U2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRcdFx0aWYoJCh2YWx1ZSkuaXMoXCI6Y2hlY2tlZFwiKSAmJiAhJCh2YWx1ZSkuaGFzQ2xhc3MoXCJtYXN0ZXItY2hlY2tib3hcIikpIHtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9ICQodmFsdWUpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSBcIixcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKGVtYWlsQnV0dG9uc2VsZWN0b3IpLnByb3AoJ2hyZWYnLCBlbWFpbFN0cmluZyk7XHJcblx0XHR9O1xyXG5cdFx0c2V0VGltZW91dChzZWxlY3QoJCh0aGlzKSksIDIwMDApO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmVtYWlsLXNlbGVjdGVkXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicgfHwgJCh0aGlzKS5wcm9wKCdocmVmJykgPT09IG51bGwpe1xyXG5cdFx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5leHRlcm5hbC1saW5rXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHRcdHZhciBlbGVtVG9SZXBsYWNlID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8tcmVwbGFjZS13aXRoLWxvYWRlci1zZWxlY3RvcicpKTtcclxuXHJcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRlbGVtVG9IaWRlU2VsZWN0b3IuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudC1yZXBsYWNlZC1jb250YWluZXJcIiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHJcblx0XHQkKCcjY29udGVudC1yZXBsYWNlZC1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIiNzaGFyZS1wcm9qZWN0LWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cdFx0XHRcdGlmKHJlc3BvbnNlLnNoYXJlX25hbWUpe1xyXG5cdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignc3VjY2VzcycsICdZb3VyIG5hbWUgaXMgYmVpbmcgc2hhcmVkIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJycsICdZb3UgYXJlIG5vIGxvbmdlciBzaGFyaW5nIHlvdXIgbmFtZSB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKCcjc2hhcmVfbmFtZScpLnByb3AoJ2NoZWNrZWQnLCByZXNwb25zZS5zaGFyZV9uYW1lKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JCgnLmhlbHAtYmxvY2snLCAnI2xvZ2luRm9ybScpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbigpeyBcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuaGlkZSgpO1xyXG5cdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblxyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdFx0JCgnI2xvZ2luLXVzZXJuYW1lJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykudGV4dChkYXRhW1wicmVzcG9uc2VKU09OXCJdW1wiZXJyb3JzXCJdW1widXNlcm5hbWVcIl1bMF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnI25ldy10b3BpYy1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0XHRzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN1Ym1pdEJ1dHRvbikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0Y29udGV4dDogJCh0aGlzKSxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucy5jcmVhdGVFZGl0VG9waWNET00oZGF0YVtcImlkXCJdLCBkYXRhW1wibmFtZVwiXSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKS5odG1sKCdBZGQnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBORVcgVVNFUlxyXG5cdC8vIHB1dCB0aGlzIHN0dWZmIGluIGFuIGFycmF5XHJcblx0Ly8gJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHQvLyAkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cclxuXHQvLyAkKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdC8vIFx0aWYoJCgnLm5ldy11c2VyLXN0dWRlbnQnKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdC8vIFx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdC8vIFx0fSBlbHNlIHtcclxuXHQvLyBcdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHQvLyBcdH1cclxuXHQvLyBcdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0Ly8gXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0Ly8gXHR9IGVsc2Uge1xyXG5cdC8vIFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH0pO1xyXG5cclxuXHQkKFwiLmZhdm91cml0ZS1jb250YWluZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc3ZnQ29udGFpbmVyID0gJCh0aGlzKTtcclxuXHRcdHZhciBzdmcgPSBzdmdDb250YWluZXIuZmluZCgnc3ZnJyk7XHJcblx0XHR2YXIgcHJvamVjdElkID0gd2luZG93Wydwcm9qZWN0J10uZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cclxuXHRcdHN2Zy5oaWRlKDApO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuc2hvdygwKTtcclxuXHJcblx0XHRpZihzdmcuaGFzQ2xhc3MoJ2Zhdm91cml0ZScpKXtcclxuXHRcdFx0dmFyIGFjdGlvbiA9ICdyZW1vdmUnO1xyXG5cdFx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvcmVtb3ZlLWZhdm91cml0ZSc7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGFjdGlvbiA9ICdhZGQnO1xyXG5cdFx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvYWRkLWZhdm91cml0ZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKGFjdGlvbiA9PSBcImFkZFwiKXtcclxuXHRcdFx0XHRcdHN2Zy5hZGRDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHN2Zy5yZW1vdmVDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRzdmcuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCk7XHJcblx0XHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLmhpZGUoMCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnbmF2Lm1vYmlsZSAuc3ViLWRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBkcm9wZG93biA9ICQodGhpcyk7XHJcblx0XHR2YXIgY29udGVudCA9IGRyb3Bkb3duLmZpbmQoJy5kcm9wZG93bi1jb250ZW50Jyk7XHJcblxyXG5cdFx0aWYoZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBmYWxzZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5oaWRlKGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIHRydWUpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBmYWxzZSk7XHJcblxyXG5cdFx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMTgwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuc2hvdyhjb25maWcuYW5pbXRpb25zLm1lZGl1bSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PVxyXG5cdFx0OS4gSW5pdGlhbGlzZVxyXG5cdCAgID09PT09PT09PT09PT09PSAqL1xyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREaWFsb2cucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHJcblx0Ly8gVXNlZCBhcyBhbiBlYXN5IHdheSBmb3IgZnVuY3Rpb25zIHRvIGdldCBjdXJyZW50IHByb2plY3QgZGF0YVxyXG5cdGlmKCQoJy5wcm9qZWN0LWNhcmQnKS5sZW5ndGggPiAwKXtcclxuXHRcdHdpbmRvd1sncHJvamVjdCddID0gJCgnLnByb2plY3QtY2FyZCcpO1xyXG5cdH1cclxuXHJcblx0JCgnLmFuaW1hdGUtY2FyZHMgLmNhcmQnKS5jc3MoXCJvcGFjaXR5XCIsIDApO1xyXG5cclxuXHR2YXIgZGVsYXkgPSAwO1xyXG5cdCQoJy5hbmltYXRlLWNhcmRzIC5jYXJkJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdGRlbGF5ICs9IDIwMDtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5hbmltYXRlKHtcclxuXHRcdFx0XHRvcGFjaXR5OiAxXHJcblx0XHRcdH0sNDAwKTtcclxuXHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJzbGlkZUluVXAgYW5pbWF0ZWRcIik7XHJcblx0XHR9LmJpbmQodGhpcyksIGRlbGF5KTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5hamF4RXJyb3IoZnVuY3Rpb24oIGV2ZW50LCByZXF1ZXN0LCBzZXR0aW5ncyApIHtcclxuXHRpZihjb25maWcuc2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbil7XHJcblx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoYXQgcmVxdWVzdC4nKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==