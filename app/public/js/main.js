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
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

;$(function () {
	"use strict";

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
	$('.topics-list .loader').hide(config.fastAnimation);
	$('.topics-list li').first().fadeIn(config.fastAnimation, function showNext() {
		$(this).next(".topics-list li").fadeIn(config.fastAnimation, showNext);
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

	/* ================
 	4.3 Column Toggle Table
    ================ */

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
		COLUMN_SELECTOR_BUTTON: '<button class="button button--raised dot-menu__activator" style="margin-top: 2rem;">Columns</button>',
		COLUMN_SELECTOR_MENU: '<ul class="dot-menu"></ul>'
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
			table.bodyRows = table.element.find('tbody tr');

			var hideIndices = [];

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

		this.element.before(columnSelectorButton);
		columnSelectorButton.after(columnSelectorMenu);

		var columnSelectorButtonDotMenuId = 'ColumnToggleTable-' + toggleTable.element.attr('id');
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

		$('.column-toggle').on('change', function () {
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
		LOG_IN_DIALOG: '.login.dialog',
		CHANGE_AUTH_DIALOG: '.change-auth.dialog'
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
									topic.element.hide(config.slowAnimation, function () {
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
		TOP_RIGHT: 'dot-menu--top-right'
	};

	DotMenu.prototype.positionMenu = function () {
		var buttonRect = this.button[0].getBoundingClientRect();

		if (this.menu.hasClass(this.CssClasses_.BOTTOM_LEFT)) {
			this.menu.css('top', buttonRect.bottom);
			this.menu.css('left', buttonRect.right - this.button.css('width'));
		} else if (this.menu.hasClass(this.CssClasses_.BOTTOM_RIGHT)) {
			this.menu.css('top', buttonRect.bottom);
			this.menu.css('left', buttonRect.left - 120);
		} else if (this.menu.hasClass(this.CssClasses_.TOP_LEFT)) {
			this.menu.css('top', buttonRect.top - 150);
			this.menu.css('left', buttonRect.right - this.button.css('width'));
		} else if (this.menu.hasClass(this.CssClasses_.TOP_RIGHT)) {
			this.menu.css('top', buttonRect.top - 150);
			this.menu.css('left', buttonRect.left - 120);
		} else {
			this.menu.css('top', buttonRect.bottom);
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

		this.button.on('click', function (e) {
			e.stopPropagation();
			DotMenu.prototype.toggle.bind(dotMenu)();
		});

		$(document).on('scroll', function (e) {
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

	/* ======================
 	 8. OTHER
    ====================== */

	$('.email-table .checkbox input').on('change', function () {

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
		setTimeout(2000, select($(this)));
	});

	$('.email-selected').on('click', function (e) {
		if ($(this).prop('href') === 'mailto:' || $(this).prop('href') === null) {
			alert("You haven't selected anyone.");
			e.preventDefault();
		}
	});

	// External links give an illusion of AJAX
	$('.external-link').on('click', function (e) {
		$(this).removeClass('active');
		var elemToHideSelector = $($(this).data('element-to-hide-selector'));
		var elemToReplace = $($(this).data('element-to-replace-with-loader-selector'));

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
				if (response.share_project) {
					showNotification('success', 'Your name is being shared with other students.');
				} else {
					showNotification('', 'You are no longer sharing your name with other students.');
				}
				$('#share_project').prop('checked', response.share_project);
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
			$('table.raw-detail').css('width', $('table.full-detail').css('width'));
			$('table.full-detail').css('position', 'absolute');
			$('table.raw-detail').css('position', 'absolute');

			$('table.full-detail').fadeOut(config.fastAnimation);
			$('table.raw-detail').fadeIn(config.fastAnimation, function () {
				$(this).css('position', 'relative');
			});
		} else {
			$('table.full-detail').css('width', $('table.raw-detail').css('width'));
			$('table.full-detail').css('position', 'absolute');
			$('table.raw-detail').css('position', 'absolute');

			$('table.raw-detail').fadeOut(config.fastAnimation);
			$('table.full-detail').fadeIn(config.fastAnimation, function () {
				$(this).css('position', 'relative');
			});
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
			svg.fadeIn(config.fastAnimation);
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
			content.hide(config.mediumAnimation);
		} else {
			dropdown.attr("aria-expanded", true);
			content.attr("aria-hidden", false);

			dropdown.find(".svg-container svg").css("transform", "rotateZ(180deg)");
			dropdown.addClass("active");
			content.show(config.mediumAnimation);
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

	if ($('.project-card').length > 0) {
		window['project'] = $('.project-card');
	}

	// END OF DOC READY FILE
});

$(document).ajaxError(function (event, request, settings) {
	if (config.showAjaxRequestFailNotification) {
		showNotification('error', 'Something went wrong with that request.');
	}
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzI4NTNhYjIyODdiMTViMjkxZGQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImxlbmd0aCIsImFwcGVuZCIsInByZXBlbmQiLCJoaWRlIiwiY29uZmlnIiwiZmFzdEFuaW1hdGlvbiIsImZpcnN0IiwiZmFkZUluIiwic2hvd05leHQiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIk1vYmlsZU1lbnUiLCJlbGVtZW50Iiwid2luZG93IiwiYWN0aXZhdG9yIiwiU2VsZWN0b3JzXyIsIkhBTUJVUkdFUl9DT05UQUlORVIiLCJ1bmRlcmxheSIsIlVOREVSTEFZIiwiaW5pdCIsImxvZyIsInByb3RvdHlwZSIsIkNzc0NsYXNzZXNfIiwiSVNfVklTSUJMRSIsIk1PQklMRV9NRU5VIiwib3Blbk1lbnUiLCJhZGRDbGFzcyIsImNsb3NlTWVudSIsInJlbW92ZUNsYXNzIiwibW9iaWxlTWVudSIsIm9uIiwiYmluZCIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiZGF0YSIsImhlYWRlciIsImZpbmQiLCJESUFMT0dfSEVBREVSIiwiY29udGVudCIsIkRJQUxPR19DT05URU5UIiwiaHRtbCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dMb2FkZXIiLCJzaG93IiwiaGlkZUxvYWRlciIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwiZGlhbG9nIiwicHVzaCIsImVyciIsImRvY3VtZW50IiwicmVhZHkiLCJrZXlkb3duIiwiZSIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJlcSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJpbmRleCIsInJlZnJlc2hBbGwiLCJ0b2dnbGVUYWJsZSIsImNvbHVtblNlbGVjdG9yQnV0dG9uIiwiY29sdW1uU2VsZWN0b3JNZW51IiwiYWZ0ZXIiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCIsInRleHQiLCJBamF4RnVuY3Rpb25zIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJMT0dfSU5fRElBTE9HIiwiQ0hBTkdFX0FVVEhfRElBTE9HIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwidmFsIiwiY29uZmlybSIsInRpdGxlIiwidHlwZSIsImljb24iLCJ0aGVtZSIsImVzY2FwZUtleSIsImJhY2tncm91bmREaXNtaXNzIiwiYW5pbWF0ZUZyb21FbGVtZW50IiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwiYWN0aW9uIiwiY3NzIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImNvbnRleHQiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkb25lIiwiY2FuY2VsIiwiZGVsZXRlVG9waWMiLCJkZWxldGUiLCJzdWNjZXNzIiwic2xvd0FuaW1hdGlvbiIsInJlbW92ZSIsImNyZWF0ZUVkaXRUb3BpY0RPTSIsIkRvdE1lbnUiLCJNZW51IiwiYnV0dG9uIiwibWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsInBvc2l0aW9uTWVudSIsImJ1dHRvblJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJyaWdodCIsImxlZnQiLCJ0b3AiLCJ0b2dnbGUiLCJkb3RNZW51IiwibWVudUlkIiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0IiwiY29udGFpbnMiLCJNYXJrZXIiLCJzZWxlY3RlZFN0dWRlbnQiLCJzZWxlY3RlZFN1cGVydmlzb3IiLCJzdHVkZW50VGFibGUiLCJzdHVkZW50RGF0YVRhYmxlIiwic3VwZXJ2aXNvclRhYmxlIiwic3VwZXJ2aXNvckRhdGFUYWJsZSIsIkFTU0lHTl9NQVJLRVIiLCJzZWxlY3RTdHVkZW50Iiwic3R1ZGVudFJvd0RPTSIsIm1hcmtlciIsInVuc2VsZWN0QWxsIiwic2VsZWN0U3VwZXJ2aXNvciIsInN1cGVydmlzb3JSb3dET00iLCJyZXNldFZpZXciLCJzdHVkZW50TmFtZSIsInN1cGVydmlzb3JOYW1lIiwibWFya2VyTmFtZSIsInByb2plY3QiLCJwcm9qZWN0SWQiLCJzdHVkZW50SWQiLCJtYXJrZXJJZCIsInByb2plY3RfaWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJ2YWx1ZSIsInNldFRpbWVvdXQiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInNlcmlhbGl6ZSIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwic2hhcmVfcHJvamVjdCIsInNob3dOb3RpZmljYXRpb24iLCJsb2NhdGlvbiIsInJlbG9hZCIsInN1Ym1pdEJ1dHRvbiIsImZhZGVPdXQiLCJzdmdDb250YWluZXIiLCJzdmciLCJhamF4VXJsIiwiZHJvcGRvd24iLCJtZWRpdW1BbmltYXRpb24iLCJhamF4RXJyb3IiLCJldmVudCIsInJlcXVlc3QiLCJzZXR0aW5ncyIsInNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNURBOzs7Ozs7Ozs7Ozs7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bkJEOztBQXFCQTs7O0FBR0FsTyxZQUFXVSxTQUFYLENBQXFCVyxPQUFyQjtBQUNBQyxRQUFPWixTQUFQLENBQWlCVyxPQUFqQjtBQUNBOEIsV0FBVXpDLFNBQVYsQ0FBb0JXLE9BQXBCO0FBQ0FvRCxtQkFBa0IvRCxTQUFsQixDQUE0QlcsT0FBNUI7QUFDQTBGLFdBQVVyRyxTQUFWLENBQW9CVyxPQUFwQjtBQUNBeUosUUFBT3BLLFNBQVAsQ0FBaUJXLE9BQWpCO0FBQ0FrSSxTQUFRN0ksU0FBUixDQUFrQlcsT0FBbEI7O0FBRUEsS0FBRzVDLEVBQUUsZUFBRixFQUFtQkksTUFBbkIsR0FBNEIsQ0FBL0IsRUFBaUM7QUFDaENxQixTQUFPLFNBQVAsSUFBb0J6QixFQUFFLGVBQUYsQ0FBcEI7QUFDQTs7QUFFRDtBQUNDLENBbG1DQTs7QUFvbUNEQSxFQUFFcUUsUUFBRixFQUFZcUwsU0FBWixDQUFzQixVQUFVQyxLQUFWLEVBQWlCQyxPQUFqQixFQUEwQkMsUUFBMUIsRUFBcUM7QUFDMUQsS0FBR3JQLE9BQU9zUCwrQkFBVixFQUEwQztBQUN6Q2QsbUJBQWlCLE9BQWpCLEVBQTBCLHlDQUExQjtBQUNBO0FBQ0QsQ0FKRCxFIiwiZmlsZSI6IlxcanNcXG1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzI4NTNhYjIyODdiMTViMjkxZGQiLCJcclxuLyogRklMRSBTVFJVQ1RVUkVcclxuXHJcbjEuIEFKQVggU2V0dXBcclxuMy4gSFRNTCBNb2RpZmljYXRpb25zXHJcbjQuIENvbXBvbmVudHNcclxuXHQ0LjEgTW9iaWxlIE1lbnVcclxuXHQ0LjIgRGlhbG9nIC8gTW9kYWxcclxuXHQ0LjMgRGF0YSBUYWJsZVxyXG5cdDQuNSBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcblx0NC42IEVkaXQgVG9waWNzIFtBZG1pbl1cclxuXHQ0LjcgTWVudVxyXG41LiBTZWNvbmQgTWFya2VyXHJcbjguIE90aGVyXHJcbjkuIEluaXRpYWxpc2UgRXZlcnl0aGluZ1xyXG4qL1xyXG5cclxuOyQoZnVuY3Rpb24oKSB7XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PVxyXG5cdDEuIEFKQVggU2V0dXBcclxuICAgPT09PT09PT09PT09PT09PSAqL1xyXG4kLmFqYXhTZXR1cCh7XHJcblx0aGVhZGVyczoge1xyXG5cdFx0J1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JyksXHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdDMuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmlmKCQoJy5zaG93LS1zY3JvbGwtdG8tdG9wJykubGVuZ3RoID4gMCl7XHJcblx0JCgnLm1haW4tY29udGVudCcpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBidXR0b24tLWFjY2VudCBzY3JvbGwtdG8tdG9wXCI+U2Nyb2xsIHRvIFRvcDwvYnV0dG9uPicpO1xyXG59XHJcblxyXG4vLyBBY2Nlc3NpYmlsaXR5XHJcbiQoJy5kcm9wZG93bicpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuJCgnLmRyb3Bkb3duID4gYnV0dG9uJykuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcclxuJCgnLmRyb3Bkb3duIC5kcm9wZG93bi1jb250ZW50IGEnKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblxyXG4vLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcbiQoJy50b3BpY3MtbGlzdCcpLnByZXBlbmQoJCgnLmZpcnN0JykpO1xyXG4kKCcudG9waWNzLWxpc3QgLmxvYWRlcicpLmhpZGUoY29uZmlnLmZhc3RBbmltYXRpb24pO1xyXG4kKCcudG9waWNzLWxpc3QgbGknKS5maXJzdCgpLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbiwgZnVuY3Rpb24gc2hvd05leHQoKSB7XHJcblx0JCh0aGlzKS5uZXh0KCBcIi50b3BpY3MtbGlzdCBsaVwiICkuZmFkZUluKGNvbmZpZy5mYXN0QW5pbWF0aW9uLCBzaG93TmV4dCk7XHJcbn0pO1xyXG5cclxuJCgnLm9yZGVyLWxpc3QtanMnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gJCh0aGlzKTtcclxuXHQvLyBzb3J0VW5vcmRlcmVkTGlzdChsaXN0KTtcclxuXHJcblx0aWYobGlzdC5oYXNDbGFzcygnbGFzdC1uYW1lLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRhZGRMYXN0TmFtZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0fVxyXG5cclxuXHRpZihsaXN0Lmhhc0NsYXNzKCdhbHBoYS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0YWRkQWxwaGFIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdH1cclxuXHJcblx0aWYobGlzdC5oYXNDbGFzcygndGl0bGUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdGFkZFRpdGxlSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PVxyXG5cdDQuIENvbXBvbmVudHNcclxuICAgPT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT1cclxuXHQgNC4xIE1vYmlsZSBNZW51XHJcbiAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgbW9iaWxlIG1lbnUuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBNb2JpbGVNZW51ID0gIGZ1bmN0aW9uIE1vYmlsZU1lbnUoZWxlbWVudCkge1xyXG5cdGlmKHdpbmRvd1snTW9iaWxlTWVudSddID09IG51bGwpe1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuYWN0aXZhdG9yID0gJCh0aGlzLlNlbGVjdG9yc18uSEFNQlVSR0VSX0NPTlRBSU5FUik7XHJcblx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiVGhlcmUgY2FuIG9ubHkgYmUgb25lIG1vYmlsZSBtZW51LlwiKTtcclxuXHR9XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZSdcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0TU9CSUxFX01FTlU6ICduYXYubW9iaWxlJyxcclxuXHRIQU1CVVJHRVJfQ09OVEFJTkVSOiAnLmhhbWJ1cmdlci1jb250YWluZXInLFxyXG5cdFVOREVSTEFZOiAnLm1vYmlsZS1uYXYtdW5kZXJsYXknXHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG5cdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgbW9iaWxlTWVudSA9IHRoaXM7XHJcblx0dGhpcy5hY3RpdmF0b3Iub24oJ2NsaWNrJywgbW9iaWxlTWVudS5vcGVuTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHR0aGlzLnVuZGVybGF5Lm9uKCdjbGljaycsIG1vYmlsZU1lbnUuY2xvc2VNZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5NT0JJTEVfTUVOVSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMubW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT1cclxuXHQ0LjIgRGlhbG9nIC8gTW9kYWxcclxuICAgPT09PT09PT09PT09PT09PT09PT0gKi9cclxudmFyIERpYWxvZyA9IGZ1bmN0aW9uIERpYWxvZyhlbGVtZW50KSB7XHJcblx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHR0aGlzLmRpYWxvZ05hbWUgPSAkKGVsZW1lbnQpLmRhdGEoJ2RpYWxvZycpO1xyXG5cdHRoaXMudW5kZXJsYXkgPSAkKCcudW5kZXJsYXknKTtcclxuXHR0aGlzLmhlYWRlciA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0hFQURFUik7XHJcblx0dGhpcy5jb250ZW50ID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfQ09OVEVOVCk7XHJcblxyXG5cdC8vIFJlZ2lzdGVyIENvbXBvbmVudFxyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyhcInJlZ2lzdGVyZWRcIik7XHJcblxyXG5cdC8vIEFSSUFcclxuXHR0aGlzLmVsZW1lbnQuYXR0cihcInJvbGVcIiwgXCJkaWFsb2dcIik7XHJcblx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJkaWFsb2ctdGl0bGVcIik7XHJcblx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIFwiZGlhbG9nLWRlc2NcIik7XHJcblx0dGhpcy5oZWFkZXIuYXR0cigndGl0bGUnLCB0aGlzLmhlYWRlci5maW5kKCcjZGlhbG9nLWRlc2MnKS5odG1sKCkpO1xyXG5cclxuXHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdHRoaXMubG9hZGVyID0gJChlbGVtZW50KS5maW5kKFwiLmxvYWRlclwiKTtcclxuXHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdExPQURFUjogJzxkaXYgY2xhc3M9XCJsb2FkZXJcIiBzdHlsZT1cIndpZHRoOiAxMDBweDsgaGVpZ2h0OiAxMDBweDt0b3A6IDI1JTtcIj48L2Rpdj4nLFxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRBQ1RJVkU6ICdhY3RpdmUnLFxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdERJQUxPRzogJy5kaWFsb2cnLFxyXG5cdERJQUxPR19IRUFERVI6ICcuaGVhZGVyJyxcclxuXHRESUFMT0dfQ09OVEVOVDogJy5jb250ZW50JyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuc2hvd0xvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5sb2FkZXIuc2hvdygwKTtcclxuXHR0aGlzLmNvbnRlbnQuaGlkZSgwKTtcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuaGlkZUxvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5sb2FkZXIuaGlkZSgwKTtcclxuXHR0aGlzLmNvbnRlbnQuc2hvdygwKTtcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIsIHRoaXMuZGlhbG9nTmFtZSk7XHJcblx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHR3aW5kb3dbJ0RpYWxvZyddID0gdGhpcztcclxuXHR3aW5kb3dbJ01vYmlsZU1lbnUnXS5jbG9zZU1lbnUoKTtcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuaGlkZURpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5pc0Nsb3NhYmxlICYmIHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIpID09IHRoaXMuZGlhbG9nTmFtZSl7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHR9XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdC8vIE5lZWRlZCBmb3IgY29udGV4dFxyXG5cdHZhciBkaWFsb2cgPSB0aGlzO1xyXG5cclxuXHQvLyBGaW5kIGFjdGl2YXRvciBidXR0b25cclxuXHQkKCdidXR0b24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoJCh0aGlzKS5kYXRhKCdhY3RpdmF0b3InKSAmJiAkKHRoaXMpLmRhdGEoJ2RpYWxvZycpID09IGRpYWxvZy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0ZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMucHVzaCgkKHRoaXMpKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gQVJJQVxyXG5cdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblxyXG5cdGRpYWxvZy51bmRlcmxheS5vbignY2xpY2snLCBkaWFsb2cuaGlkZURpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cclxuXHR0cnl7XHJcblx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGRpYWxvZy5zaG93RGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblx0XHR9KTtcclxuXHR9IGNhdGNoKGVycil7XHJcblx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIFwiICsgZGlhbG9nLmRpYWxvZ05hbWUgKyBcIiBoYXMgbm8gYWN0aXZhdG9yIGJ1dHRvbi5cIik7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmRpYWxvZyA9IG5ldyBEaWFsb2codGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHQkKHRoaXMpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYoZS5rZXlDb2RlID09IDI3ICYmIHdpbmRvd1snRGlhbG9nJ10gIT0gbnVsbCkge1xyXG5cdFx0XHR3aW5kb3dbJ0RpYWxvZyddLmhpZGVEaWFsb2coKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydNb2JpbGVNZW51J10gIT0gbnVsbCkge1xyXG5cdFx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXS5jbG9zZU1lbnUoKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09XHJcblx0NC4zIERhdGEgVGFibGVcclxuICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG4qXHJcbiogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHR0aGlzLnJvd3MgPSAkLm1lcmdlKHRoaXMuYm9keVJvd3MsIHRoaXMuZm9vdFJvd3MpO1xyXG5cdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG53aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdE1BU1RFUl9DSEVDS0JPWDogJ3RoZWFkIC5tYXN0ZXItY2hlY2tib3gnLFxyXG5cdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYodGhpcy5tYXN0ZXJDaGVja2JveC5pcygnOmNoZWNrZWQnKSl7XHJcblx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRpZiAocm93KSB7XHJcblx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcblx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHJcblx0JCh0aGlzLmNoZWNrYm94ZXMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0fSk7XHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uREFUQV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuZGF0YVRhYmxlID0gbmV3IERhdGFUYWJsZSh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT1cclxuXHQ0LjMgQ29sdW1uIFRvZ2dsZSBUYWJsZVxyXG4gICA9PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcbipcclxuKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIENvbHVtblRvZ2dsZVRhYmxlID0gZnVuY3Rpb24gQ29sdW1uVG9nZ2xlVGFibGUoZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5oZWFkID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0cicpO1xyXG5cdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdHRoaXMuc2VsZWN0b3JNZW51ID0gbnVsbDtcclxuXHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gbnVsbDtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snQ29sdW1uVG9nZ2xlVGFibGUnXSA9IENvbHVtblRvZ2dsZVRhYmxlO1xyXG5cclxuQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0VE9HR0xFX1RBQkxFOiAnLnRhYmxlLWNvbHVtbi10b2dnbGUnXHJcbn07XHJcblxyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRDT0xVTU5fU0VMRUNUT1JfQlVUVE9OOiAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBkb3QtbWVudV9fYWN0aXZhdG9yXCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAycmVtO1wiPkNvbHVtbnM8L2J1dHRvbj4nLFxyXG5cdENPTFVNTl9TRUxFQ1RPUl9NRU5VOiAnPHVsIGNsYXNzPVwiZG90LW1lbnVcIj48L3VsPidcclxufTtcclxuXHJcbkNvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblxyXG5cdHRvZ2dsZUNvbHVtbjogZnVuY3Rpb24oY29sdW1uSW5kZXgsIHRhYmxlLCBjaGVja2VkKSB7XHJcblx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5yZW1vdmVBdHRyKCdoaWRkZW4nKTtcclxuXHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmF0dHIoJ2hpZGRlbicsIFwidHJ1ZVwiKTtcclxuXHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVmcmVzaDogZnVuY3Rpb24odGFibGUpIHtcclxuXHRcdHRhYmxlLmJvZHlSb3dzID0gdGFibGUuZWxlbWVudC5maW5kKCd0Ym9keSB0cicpO1xyXG5cclxuXHRcdHZhciBoaWRlSW5kaWNlcyA9IFtdO1xyXG5cclxuXHRcdHRhYmxlLmhlYWRlcnMuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigkKHRoaXMpLmF0dHIoJ2hpZGRlbicpKXtcclxuXHRcdFx0XHRoaWRlSW5kaWNlcy5wdXNoKCQodGhpcykuaW5kZXgoKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoaWRlSW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShoaWRlSW5kaWNlc1tpXSkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRyZWZyZXNoQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdCQoQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnJlZnJlc2godGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG59O1xyXG5cclxuQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdGlmKCF0aGlzLmVsZW1lbnQuYXR0cignaWQnKSl7XHJcblx0XHRjb25zb2xlLmxvZyhcIkNvbHVtblRvZ2dsZVRhYmxlIHJlcXVpcmVzIHRoZSB0YWJsZSB0byBoYXZlIGFuIHVuaXF1ZSBJRC5cIik7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgdG9nZ2xlVGFibGUgPSB0aGlzO1xyXG5cdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbiA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04pO1xyXG5cdHZhciBjb2x1bW5TZWxlY3Rvck1lbnUgPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfTUVOVSk7XHJcblxyXG5cdHRoaXMuZWxlbWVudC5iZWZvcmUoY29sdW1uU2VsZWN0b3JCdXR0b24pO1xyXG5cdGNvbHVtblNlbGVjdG9yQnV0dG9uLmFmdGVyKGNvbHVtblNlbGVjdG9yTWVudSk7XHJcblxyXG5cdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCA9ICdDb2x1bW5Ub2dnbGVUYWJsZS0nICsgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpO1xyXG5cdGNvbHVtblNlbGVjdG9yQnV0dG9uLmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQpO1xyXG5cdGNvbHVtblNlbGVjdG9yTWVudS5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkICsgJy1tZW51Jyk7XHJcblxyXG5cdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBjb2x1bW5TZWxlY3RvckJ1dHRvbjtcclxuXHR0aGlzLnNlbGVjdG9yTWVudSA9IGNvbHVtblNlbGVjdG9yTWVudTtcclxuXHJcblx0dGhpcy5zZWxlY3Rvck1lbnUuZmluZCgndWwnKS5kYXRhKFwidGFibGVcIiwgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpKTtcclxuXHJcblx0dGhpcy5oZWFkZXJzLmVhY2goZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuZGF0YShcImRlZmF1bHRcIikgPyBcImNoZWNrZWRcIiA6IFwiXCI7XHJcblx0XHQkKHRoaXMpLmRhdGEoJ3Zpc2libGUnLCAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpKTtcclxuXHJcblx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXBwZW5kKCdcXFxyXG5cdFx0XHQ8bGkgY2xhc3M9XCJkb3QtbWVudV9faXRlbSBkb3QtbWVudV9faXRlbS0tcGFkZGVkXCI+IFxcXHJcblx0XHRcdFx0PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+IFxcXHJcblx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJjb2x1bW4tdG9nZ2xlXCIgaWQ9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiIHR5cGU9XCJjaGVja2JveFwiICcrIGNoZWNrZWQgKyc+IFxcXHJcblx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIj4nICsgJCh0aGlzKS50ZXh0KCkgKyAnPC9sYWJlbD4gXFxcclxuXHRcdFx0XHQ8L2Rpdj4gXFxcclxuXHRcdFx0PC9saT4nKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmNvbHVtbi10b2dnbGUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBpbmRleCA9ICQoJy5jb2x1bW4tdG9nZ2xlJykuaW5kZXgodGhpcyk7XHJcblx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnRvZ2dsZUNvbHVtbihpbmRleCwgdG9nZ2xlVGFibGUsICQodGhpcykucHJvcCgnY2hlY2tlZCcpKTtcclxuXHR9KTtcclxuXHJcbn07XHJcblxyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLkNvbHVtblRvZ2dsZVRhYmxlID0gbmV3IENvbHVtblRvZ2dsZVRhYmxlKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdDQuNSBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgQWpheEZ1bmN0aW9ucyA9ICBmdW5jdGlvbiBBamF4RnVuY3Rpb25zKCkge307XHJcbndpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRTRUFSQ0hfQ09OVEFJTkVSOiAnLnNlYXJjaC1jb250YWluZXInLFxyXG5cdFNFQVJDSF9GSUxURVJfQ09OVEFJTkVSOiAnLnNlYXJjaC1maWx0ZXItY29udGFpbmVyJyxcclxuXHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0TE9HX0lOX0RJQUxPRzogJy5sb2dpbi5kaWFsb2cnLFxyXG5cdENIQU5HRV9BVVRIX0RJQUxPRzogJy5jaGFuZ2UtYXV0aC5kaWFsb2cnXHJcbn07XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5LZXlzXyA9IHtcclxuXHRTUEFDRTogMzIsXHJcblx0RU5URVI6IDEzLFxyXG5cdENPTU1BOiA0NVxyXG59O1xyXG5cclxuLy8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1c1xyXG4kKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXMnLCAgZnVuY3Rpb24oZSl7XHJcblx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LWZvY3VzJyk7XHJcbn0pO1xyXG5cclxuLy8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3Vzb3V0JywgIGZ1bmN0aW9uKGUpe1xyXG5cdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxufSk7XHJcblxyXG4vLyBTRUFSQ0hcclxuJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgY29udGFpbmVyID0gJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSKTtcclxuXHR2YXIgZmlsdGVyQnV0dG9uID0gJCh0aGlzKTtcclxuXHJcblx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0ZmlsdGVyQnV0dG9uLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0fSBlbHNle1xyXG5cdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgRWRpdFRvcGljID0gZnVuY3Rpb24gRWRpdFRvcGljKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHR0aGlzLnRvcGljSWQgPSAkKGVsZW1lbnQpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0dGhpcy5kZWxldGVCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5kZWxldGUtdG9waWMnKTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snRWRpdFRvcGljJ10gPSBFZGl0VG9waWM7XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge307XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFBBVENIX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRpZih0b3BpYy5vcmlnaW5hbE5hbWUgPT0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCkpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogJ0NoYW5nZSBUb3BpYyBOYW1lJyxcclxuXHRcdFx0dHlwZTogJ2JsdWUnLFxyXG5cdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIDxiPlwiJyArICB0b3BpYy5vcmlnaW5hbE5hbWUgKyAnXCI8L2I+IHRvIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArJ1wiPC9iPj8nLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHQkKCcubG9hZGVyJywgdG9waWMuZWxlbWVudCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljX25hbWUgOiB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy5vcmlnaW5hbE5hbWUgPSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnRGVsZXRlJyxcclxuXHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArICdcIjwvYj4/JyxcclxuXHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdGRlbGV0ZToge1xyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxyXG5cdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLmVsZW1lbnQuaGlkZShjb25maWcuc2xvd0FuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZUVkaXRUb3BpY0RPTTogZnVuY3Rpb24odG9waWNJZCwgb3JpZ2luYWxOYW1lKXtcclxuXHRcdCQoXCIuZWRpdC10b3BpYy1saXN0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyB0b3BpY0lkICsnXCIgZGF0YS1vcmlnaW5hbC10b3BpYy1uYW1lPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxpbnB1dCBzcGVsbGNoZWNrPVwidHJ1ZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGVkaXQtdG9waWNcIiB0eXBlPVwic3VibWl0XCI+RWRpdDwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidXR0b24gZGVsZXRlLXRvcGljIGJ1dHRvbi0tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC9saT4nKTtcclxuXHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdH1cclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgZWRpdFRvcGljID0gdGhpcztcclxuXHR0aGlzLmVkaXRCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5lZGl0VG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdHRoaXMuZGVsZXRlQnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZGVsZXRlVG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLkVESVRfVE9QSUMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLkVkaXRUb3BpYyA9IG5ldyBFZGl0VG9waWModGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC43IERvdE1lbnVcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcbipcclxuKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIERvdE1lbnUgPSBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcclxuXHR0aGlzLmJ1dHRvbiA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5tZW51ID0gbnVsbDtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RE9UX01FTlU6ICcuZG90LW1lbnUnLFxyXG5cdEFDVElWQVRPUjogJy5kb3QtbWVudV9fYWN0aXZhdG9yJyxcclxuXHRJU19WSVNJQkxFOiAnLmlzLXZpc2libGUnLFxyXG59O1xyXG5cclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJyxcclxuXHRCT1RUT01fTEVGVDogJ2RvdC1tZW51LS1ib3R0b20tbGVmdCcsXHJcblx0Qk9UVE9NX1JJR0hUOiAnZG90LW1lbnUtLWJvdHRvbS1yaWdodCcsXHJcblx0VE9QX0xFRlQ6ICdkb3QtbWVudS0tdG9wLWxlZnQnLFxyXG5cdFRPUF9SSUdIVDogJ2RvdC1tZW51LS10b3AtcmlnaHQnLFxyXG59O1xyXG5cclxuRG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgYnV0dG9uUmVjdCA9IHRoaXMuYnV0dG9uWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCkpe1xyXG5cdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QucmlnaHQgIC0gdGhpcy5idXR0b24uY3NzKCd3aWR0aCcpKTtcclxuXHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX1JJR0hUKSl7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX0xFRlQpKXtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LnJpZ2h0ICAtIHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSk7XHJcblx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9SSUdIVCkpe1xyXG5cdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHR9XHJcbn1cclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpe1xyXG5cdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKHRoaXMpKCk7XHJcblx0dGhpcy5tZW51LmFkZENsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdHRoaXMubWVudS5zaG93KCk7XHJcbn1cclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubWVudS5yZW1vdmVDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR0aGlzLm1lbnUuaGlkZSgpO1xyXG59XHJcblxyXG5Eb3RNZW51LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQodGhpcykoKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0RG90TWVudS5wcm90b3R5cGUuc2hvdy5iaW5kKHRoaXMpKCk7XHJcblx0fVxyXG59XHJcblxyXG5Eb3RNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBkb3RNZW51ID0gdGhpcztcclxuXHR2YXIgbWVudUlkID0gJCh0aGlzLmJ1dHRvbikuYXR0cignaWQnKSArICctbWVudSc7XHJcblxyXG5cdHRoaXMubWVudSA9ICQoJyMnICsgbWVudUlkKTtcclxuXHJcblx0dGhpcy5idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLnRvZ2dsZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKCF0YXJnZXQuaXMoZG90TWVudS5tZW51KSB8fCAhdGFyZ2V0LmlzKGRvdE1lbnUuYnV0dG9uKSkge1xyXG5cdFx0XHRpZighJC5jb250YWlucygkKGRvdE1lbnUubWVudSlbMF0sIGUudGFyZ2V0KSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uQUNUSVZBVE9SKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5Eb3RNZW51ID0gbmV3IERvdE1lbnUodGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT1cclxuXHQ1LiBTZWNvbmQgTWFya2VyXHJcbiAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxudmFyIE1hcmtlciA9IGZ1bmN0aW9uIE1hcmtlcigpIHtcclxuXHRpZigkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKS5sZW5ndGggPCAxIHx8ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpLmxlbmd0aCA8IDEpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0dGhpcy5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdHRoaXMuc3R1ZGVudFRhYmxlID0gJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIik7XHJcblx0dGhpcy5zdHVkZW50RGF0YVRhYmxlID0gdGhpcy5zdHVkZW50VGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdHRoaXMuc3VwZXJ2aXNvclRhYmxlID0gJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIik7XHJcblx0dGhpcy5zdXBlcnZpc29yRGF0YVRhYmxlID0gdGhpcy5zdXBlcnZpc29yVGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxuTWFya2VyLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRBU1NJR05fTUFSS0VSOiAnL2FkbWluL21hcmtlci1hc3NpZ24nLFxyXG59O1xyXG5cclxuTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50ID0gZnVuY3Rpb24oc3R1ZGVudFJvd0RPTSwgbWFya2VyKXtcclxuXHR2YXIgcm93ID0gJChzdHVkZW50Um93RE9NKTtcclxuXHJcblx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9ICQocm93KTtcclxuXHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuZGF0YSgnbWFya2VyLWlkJykgPT0gcm93LmRhdGEoJ3N1cGVydmlzb3ItaWQnKSl7XHJcblx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvciA9IGZ1bmN0aW9uKHN1cGVydmlzb3JSb3dET00sIG1hcmtlcil7XHJcblx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdGlmKHJvdy5hdHRyKCdkaXNhYmxlZCcpKXtyZXR1cm47fVxyXG5cclxuXHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ICE9IG51bGwpe1xyXG5cdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gcm93O1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nKFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N1cGVydmlzb3ItbmFtZScpLFxyXG5cdFx0XHRyb3cuZGF0YSgnbWFya2VyLW5hbWUnKSxcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JykpO1xyXG5cdH1cclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5yZXNldFZpZXcgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUudW5zZWxlY3RBbGwgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oc3R1ZGVudE5hbWUsIHN1cGVydmlzb3JOYW1lLCBtYXJrZXJOYW1lLCBwcm9qZWN0KXtcclxuXHQkKFwiI3N0dWRlbnQtbmFtZVwiKS50ZXh0KHN0dWRlbnROYW1lKTtcclxuXHQkKFwiI3N1cGVydmlzb3ItbmFtZVwiKS50ZXh0KHN1cGVydmlzb3JOYW1lKTtcclxuXHQkKFwiI21hcmtlci1uYW1lXCIpLnRleHQobWFya2VyTmFtZSk7XHJcblxyXG5cdCQoXCIjcHJvamVjdC10aXRsZVwiKS5odG1sKCc8Yj5UaXRsZTogPC9iPicgKyBwcm9qZWN0Wyd0aXRsZSddKTtcclxuXHQkKFwiI3Byb2plY3QtZGVzY3JpcHRpb25cIikuaHRtbCgnPGI+RGVzY3JpcHRpb246IDwvYj4nICsgcHJvamVjdFsnZGVzY3JpcHRpb24nXSk7XHJcblxyXG5cdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG59XHJcblxyXG4kKCcjc3VibWl0QXNzaWduTWFya2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgbWFya2VyID0gd2luZG93WydNYXJrZXInXTtcclxuXHJcblx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdHJldHVybjtcclxuXHR9O1xyXG5cclxuXHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0dmFyIHByb2plY3RJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpWydpZCddO1xyXG5cdHZhciBzdHVkZW50SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtaWQnKTtcclxuXHR2YXIgbWFya2VySWQgPSBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yLmRhdGEoJ21hcmtlci1pZCcpO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0dXJsOiBtYXJrZXIuVXJsc18uQVNTSUdOX01BUktFUixcclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkLFxyXG5cdFx0XHRzdHVkZW50X2lkOiBzdHVkZW50SWQsXHJcblx0XHRcdG1hcmtlcl9pZDogbWFya2VySWQsXHJcblxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuXHRcdH0sXHJcblx0XHQvLyBBZGQgZmFpbFxyXG5cdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5yZW1vdmUoKTtcclxuXHRcdG1hcmtlci5yZXNldFZpZXcobWFya2VyKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBtYXJrZXIgPSB0aGlzO1xyXG5cclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCh0aGlzLCBtYXJrZXIpO1xyXG5cdH0pO1xyXG5cclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvcih0aGlzLCBtYXJrZXIpO1xyXG5cdH0pO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdHdpbmRvd1snTWFya2VyJ10gPSBuZXcgTWFya2VyKCk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgOC4gT1RIRVJcclxuICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuJCgnLmVtYWlsLXRhYmxlIC5jaGVja2JveCBpbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0dmFyIHNlbGVjdCA9IGZ1bmN0aW9uKGRvbSl7XHJcblx0XHR2YXIgc3RhdHVzID0gZG9tLnBhcmVudHMoKS5lcSg0KS5kYXRhKCdzdGF0dXMnKTtcclxuXHRcdHZhciBlbWFpbFN0cmluZyA9IFwibWFpbHRvOlwiO1xyXG5cdFx0dmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmVtYWlsLXRhYmxlLicgKyBzdGF0dXMgKyAnIC5jaGVja2JveCBpbnB1dCc7XHJcblx0XHR2YXIgZW1haWxCdXR0b25zZWxlY3RvciA9IFwiLmVtYWlsLXNlbGVjdGVkLlwiICsgc3RhdHVzO1xyXG5cclxuXHRcdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdFx0aWYoJCh2YWx1ZSkuaXMoXCI6Y2hlY2tlZFwiKSAmJiAhJCh2YWx1ZSkuaGFzQ2xhc3MoXCJtYXN0ZXItY2hlY2tib3hcIikpIHtcclxuXHRcdFx0XHRlbWFpbFN0cmluZyArPSAkKHZhbHVlKS5kYXRhKCdlbWFpbCcpO1xyXG5cdFx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxuXHR9O1xyXG5cdHNldFRpbWVvdXQoMjAwMCwgc2VsZWN0KCQodGhpcykpKTtcclxufSk7XHJcblxyXG4kKCcuZW1haWwtc2VsZWN0ZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0aWYoJCh0aGlzKS5wcm9wKCdocmVmJykgPT09ICdtYWlsdG86JyB8fCAkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gbnVsbCl7XHJcblx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIEV4dGVybmFsIGxpbmtzIGdpdmUgYW4gaWxsdXNpb24gb2YgQUpBWFxyXG4kKCcuZXh0ZXJuYWwtbGluaycpLm9uKCdjbGljaycsICBmdW5jdGlvbihlKSB7XHJcblx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0dmFyIGVsZW1Ub0hpZGVTZWxlY3RvciA9ICQoJCh0aGlzKS5kYXRhKCdlbGVtZW50LXRvLWhpZGUtc2VsZWN0b3InKSk7XHJcblx0dmFyIGVsZW1Ub1JlcGxhY2UgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1yZXBsYWNlLXdpdGgtbG9hZGVyLXNlbGVjdG9yJykpO1xyXG5cclxuXHRlbGVtVG9IaWRlU2VsZWN0b3IuaGlkZSgpO1xyXG5cdGVsZW1Ub1JlcGxhY2UuaGlkZSgpO1xyXG5cdGVsZW1Ub1JlcGxhY2UuYWZ0ZXIoJzxkaXYgaWQ9XCJjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lclwiIGNsYXNzPVwibG9hZGVyIGxvYWRlci0teC1sYXJnZVwiPjwvZGl2PicpO1xyXG5cclxuXHQkKCcjY29udGVudC1yZXBsYWNlZC1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSk7XHJcblxyXG4vLyBVc2VkIG9uIHRoZSBzdHVkZW50IGluZGV4IHBhZ2VcclxuJChcIiNzaGFyZS1wcm9qZWN0LWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0cmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuXHRcdFx0aWYocmVzcG9uc2Uuc2hhcmVfcHJvamVjdCl7XHJcblx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignc3VjY2VzcycsICdZb3VyIG5hbWUgaXMgYmVpbmcgc2hhcmVkIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignJywgJ1lvdSBhcmUgbm8gbG9uZ2VyIHNoYXJpbmcgeW91ciBuYW1lIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0JCgnI3NoYXJlX3Byb2plY3QnKS5wcm9wKCdjaGVja2VkJywgcmVzcG9uc2Uuc2hhcmVfcHJvamVjdCk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdCQoJy5oZWxwLWJsb2NrJywgJyNsb2dpbkZvcm0nKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oc2hvd0RpYWxvZyl7XHJcblx0XHRcdGlmKHNob3dEaWFsb2cgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uQ0hBTkdFX0FVVEhfRElBTE9HKVswXS5kaWFsb2cuaXNDbG9zYWJsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5DSEFOR0VfQVVUSF9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS50ZXh0KGRhdGFbXCJyZXNwb25zZUpTT05cIl1bXCJlcnJvcnNcIl1bXCJ1c2VybmFtZVwiXVswXSk7XHJcblx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdCQoJy5mb3JtLWZpZWxkJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4kKCcjbmV3LXRvcGljLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHQkKCcubG9hZGVyJywgc3VibWl0QnV0dG9uKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0Y29udGV4dDogJCh0aGlzKSxcclxuXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMuY3JlYXRlRWRpdFRvcGljRE9NKGRhdGFbXCJpZFwiXSwgZGF0YVtcIm5hbWVcIl0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uICgpIHt9XHJcblx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0XHQkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKS5odG1sKCdBZGQnKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyBVc2VkIGZvciB0cmFuc2FjdGlvbnNcclxuJCgnI3Nob3ctcmF3LXRhYmxlLWRhdGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRpZigkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSl7XHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuY3NzKCd3aWR0aCcsICQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuY3NzKCd3aWR0aCcpKTtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcclxuXHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmZhZGVPdXQoY29uZmlnLmZhc3RBbmltYXRpb24pO1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgndGFibGUuZnVsbC1kZXRhaWwnKS5jc3MoJ3dpZHRoJywgJCgndGFibGUucmF3LWRldGFpbCcpLmNzcygnd2lkdGgnKSk7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XHJcblxyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLmZhZGVPdXQoY29uZmlnLmZhc3RBbmltYXRpb24pO1xyXG5cdFx0JCgndGFibGUuZnVsbC1kZXRhaWwnKS5mYWRlSW4oY29uZmlnLmZhc3RBbmltYXRpb24sIGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIE5FVyBVU0VSXHJcbi8vIHB1dCB0aGlzIHN0dWZmIGluIGFuIGFycmF5XHJcbiQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG4kKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdGlmKCQoJyNzdHVkZW50LW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI2FkbWluLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIFNUUklOR1NcclxuJCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcbiQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0aWYoJCgnI3N0dWRlbnQtb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjYWRtaW4tb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuJChcIi5mYXZvdXJpdGUtY29udGFpbmVyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBzdmdDb250YWluZXIgPSAkKHRoaXMpO1xyXG5cdHZhciBzdmcgPSBzdmdDb250YWluZXIuZmluZCgnc3ZnJyk7XHJcblx0dmFyIHByb2plY3RJZCA9IHdpbmRvd1sncHJvamVjdCddLmRhdGEoJ3Byb2plY3QtaWQnKTtcclxuXHJcblx0c3ZnLmhpZGUoMCk7XHJcblx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuc2hvdygwKTtcclxuXHJcblx0aWYoc3ZnLmhhc0NsYXNzKCdmYXZvdXJpdGUnKSl7XHJcblx0XHR2YXIgYWN0aW9uID0gJ3JlbW92ZSc7XHJcblx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvcmVtb3ZlLWZhdm91cml0ZSc7XHJcblxyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgYWN0aW9uID0gJ2FkZCc7XHJcblx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvYWRkLWZhdm91cml0ZSc7XHJcblx0fVxyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKGFjdGlvbiA9PSBcImFkZFwiKXtcclxuXHRcdFx0XHRzdmcuYWRkQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHN2Zy5yZW1vdmVDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0c3ZnLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbik7XHJcblx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5oaWRlKDApO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoJ25hdi5tb2JpbGUgLnN1Yi1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0dmFyIGRyb3Bkb3duID0gJCh0aGlzKTtcclxuXHR2YXIgY29udGVudCA9IGRyb3Bkb3duLmZpbmQoJy5kcm9wZG93bi1jb250ZW50Jyk7XHJcblxyXG5cdGlmKGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcclxuXHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xyXG5cclxuXHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigwZGVnKVwiKTtcclxuXHRcdGRyb3Bkb3duLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0Y29udGVudC5oaWRlKGNvbmZpZy5tZWRpdW1BbmltYXRpb24pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCB0cnVlKTtcclxuXHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIGZhbHNlKTtcclxuXHJcblx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMTgwZGVnKVwiKTtcclxuXHRcdGRyb3Bkb3duLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0Y29udGVudC5zaG93KGNvbmZpZy5tZWRpdW1BbmltYXRpb24pO1xyXG5cdH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT1cclxuXHQ5LiBJbml0aWFsaXNlXHJcbiAgID09PT09PT09PT09PT09PSAqL1xyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkRpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5EYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5Eb3RNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblxyXG5pZigkKCcucHJvamVjdC1jYXJkJykubGVuZ3RoID4gMCl7XHJcblx0d2luZG93Wydwcm9qZWN0J10gPSAkKCcucHJvamVjdC1jYXJkJyk7XHJcbn1cclxuXHJcbi8vIEVORCBPRiBET0MgUkVBRFkgRklMRVxyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLmFqYXhFcnJvcihmdW5jdGlvbiggZXZlbnQsIHJlcXVlc3QsIHNldHRpbmdzICkge1xyXG5cdGlmKGNvbmZpZy5zaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uKXtcclxuXHRcdHNob3dOb3RpZmljYXRpb24oJ2Vycm9yJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggdGhhdCByZXF1ZXN0LicpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanMiXSwic291cmNlUm9vdCI6IiJ9