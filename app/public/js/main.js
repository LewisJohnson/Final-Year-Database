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
		setTimeout(2000, select($(this)));
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
				location.reload();
			},
			error: function error(data) {
				$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.showDialog();
				$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideLoader();

				$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).show();
				$('.form-field', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).addClass("has-error");
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
	$('#supervisor-form').hide();
	$('#student-form').show();

	$('#create-form-access-select').on('change', function () {
		if ($('.new-user-student').is(":selected")) {
			$('#student-form').show();
		} else {
			$('#student-form').hide();
		}
		if ($('#supervisor-option').is(":selected")) {
			$('#supervisor-form').show();
		} else {
			$('#supervisor-form').hide();
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

	// Used as an easy way for functions to get current project data
	if ($('.project-card').length > 0) {
		window['project'] = $('.project-card');
	}
});

$(document).ajaxError(function (event, request, settings) {
	if (config.showAjaxRequestFailNotification) {
		showNotification('error', 'Something went wrong with that request.');
	}
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDZiMTRkOGMyODJhZmEzZTJlNmYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImxlbmd0aCIsImFwcGVuZCIsInByZXBlbmQiLCJoaWRlIiwiY29uZmlnIiwiZmFzdEFuaW1hdGlvbiIsImZpcnN0IiwiZmFkZUluIiwic2hvd05leHQiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIk1vYmlsZU1lbnUiLCJlbGVtZW50Iiwid2luZG93IiwiYWN0aXZhdG9yIiwiU2VsZWN0b3JzXyIsIkhBTUJVUkdFUl9DT05UQUlORVIiLCJ1bmRlcmxheSIsIlVOREVSTEFZIiwiaW5pdCIsImxvZyIsInByb3RvdHlwZSIsIkNzc0NsYXNzZXNfIiwiSVNfVklTSUJMRSIsIk1PQklMRV9NRU5VIiwib3Blbk1lbnUiLCJhZGRDbGFzcyIsImNsb3NlTWVudSIsInJlbW92ZUNsYXNzIiwibW9iaWxlTWVudSIsIm9uIiwiYmluZCIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiZGF0YSIsImhlYWRlciIsImZpbmQiLCJESUFMT0dfSEVBREVSIiwiY29udGVudCIsIkRJQUxPR19DT05URU5UIiwiaHRtbCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dMb2FkZXIiLCJzaG93IiwiaGlkZUxvYWRlciIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwiZGlhbG9nIiwicHVzaCIsImVyciIsImRvY3VtZW50IiwicmVhZHkiLCJrZXlkb3duIiwiZSIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJlcSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJpbmRleCIsInJlZnJlc2hBbGwiLCJ0b2dnbGVUYWJsZSIsImNvbHVtblNlbGVjdG9yQnV0dG9uIiwiY29sdW1uU2VsZWN0b3JNZW51IiwiY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQiLCJhZnRlciIsInRleHQiLCJBamF4RnVuY3Rpb25zIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJMT0dfSU5fRElBTE9HIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwidmFsIiwiY29uZmlybSIsInRpdGxlIiwidHlwZSIsImljb24iLCJ0aGVtZSIsImVzY2FwZUtleSIsImJhY2tncm91bmREaXNtaXNzIiwiYW5pbWF0ZUZyb21FbGVtZW50IiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwiYWN0aW9uIiwiY3NzIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImNvbnRleHQiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkb25lIiwiY2FuY2VsIiwiZGVsZXRlVG9waWMiLCJkZWxldGUiLCJzdWNjZXNzIiwic2xvd0FuaW1hdGlvbiIsInJlbW92ZSIsImNyZWF0ZUVkaXRUb3BpY0RPTSIsIkRvdE1lbnUiLCJNZW51IiwiYnV0dG9uIiwibWVudSIsImlzVGFibGVEb3RNZW51IiwiRE9UX01FTlUiLCJBQ1RJVkFUT1IiLCJCT1RUT01fTEVGVCIsIkJPVFRPTV9SSUdIVCIsIlRPUF9MRUZUIiwiVE9QX1JJR0hUIiwiVEFCTEVfRE9UX01FTlUiLCJwb3NpdGlvbk1lbnUiLCJidXR0b25SZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwibGVmdCIsInBhcnNlSW50IiwidG9wIiwicmlnaHQiLCJ0b2dnbGUiLCJkb3RNZW51IiwibWVudUlkIiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0IiwiY29udGFpbnMiLCJNYXJrZXIiLCJzZWxlY3RlZFN0dWRlbnQiLCJzZWxlY3RlZFN1cGVydmlzb3IiLCJzdHVkZW50VGFibGUiLCJzdHVkZW50RGF0YVRhYmxlIiwic3VwZXJ2aXNvclRhYmxlIiwic3VwZXJ2aXNvckRhdGFUYWJsZSIsIkFTU0lHTl9NQVJLRVIiLCJzZWxlY3RTdHVkZW50Iiwic3R1ZGVudFJvd0RPTSIsIm1hcmtlciIsInVuc2VsZWN0QWxsIiwic2VsZWN0U3VwZXJ2aXNvciIsInN1cGVydmlzb3JSb3dET00iLCJyZXNldFZpZXciLCJzdHVkZW50TmFtZSIsInN1cGVydmlzb3JOYW1lIiwibWFya2VyTmFtZSIsInByb2plY3QiLCJwcm9qZWN0SWQiLCJzdHVkZW50SWQiLCJtYXJrZXJJZCIsInByb2plY3RfaWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJ2YWx1ZSIsInNldFRpbWVvdXQiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInNlcmlhbGl6ZSIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwic2hhcmVfcHJvamVjdCIsInNob3dOb3RpZmljYXRpb24iLCJsb2NhdGlvbiIsInJlbG9hZCIsInN1Ym1pdEJ1dHRvbiIsInN2Z0NvbnRhaW5lciIsInN2ZyIsImFqYXhVcmwiLCJkcm9wZG93biIsIm1lZGl1bUFuaW1hdGlvbiIsImFqYXhFcnJvciIsImV2ZW50IiwicmVxdWVzdCIsInNldHRpbmdzIiwic2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1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Q3pDYixtQkFBaUIsT0FBakIsRUFBMEIseUNBQTFCO0FBQ0E7QUFDRCxDQUpELEUiLCJmaWxlIjoiXFxqc1xcbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwNmIxNGQ4YzI4MmFmYTNlMmU2ZiIsIlxyXG4vKiBGSUxFIFNUUlVDVFVSRVxyXG5cclxuMS4gQUpBWCBTZXR1cFxyXG4zLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuNC4gQ29tcG9uZW50c1xyXG5cdDQuMSBNb2JpbGUgTWVudVxyXG5cdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG5cdDQuMyBEYXRhIFRhYmxlXHJcblx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQ0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdDQuNyBNZW51XHJcbjUuIFNlY29uZCBNYXJrZXJcclxuOC4gT3RoZXJcclxuOS4gSW5pdGlhbGlzZSBFdmVyeXRoaW5nXHJcbiovXHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09XHJcblx0XHQxLiBBSkFYIFNldHVwXHJcblx0ICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cdCQuYWpheFNldHVwKHtcclxuXHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0J1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JyksXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0My4gSFRNTCBNb2RpZmljYXRpb25zXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdGlmKCQoJy5zaG93LS1zY3JvbGwtdG8tdG9wJykubGVuZ3RoID4gMCl7XHJcblx0XHQkKCcubWFpbi1jb250ZW50JykuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGJ1dHRvbi0tYWNjZW50IHNjcm9sbC10by10b3BcIj5TY3JvbGwgdG8gVG9wPC9idXR0b24+Jyk7XHJcblx0fVxyXG5cclxuXHQvLyBBY2Nlc3NpYmlsaXR5XHJcblx0JCgnLmRyb3Bkb3duJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cdCQoJy5kcm9wZG93biA+IGJ1dHRvbicpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XHJcblx0JCgnLmRyb3Bkb3duIC5kcm9wZG93bi1jb250ZW50IGEnKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblxyXG5cdC8vIE1ha2VzIHByaW1hcnkgdG9waWMgZmlyc3RcclxuXHQkKCcudG9waWNzLWxpc3QnKS5wcmVwZW5kKCQoJy5maXJzdCcpKTtcclxuXHQkKCcudG9waWNzLWxpc3QgLmxvYWRlcicpLmhpZGUoY29uZmlnLmZhc3RBbmltYXRpb24pO1xyXG5cdCQoJy50b3BpY3MtbGlzdCBsaScpLmZpcnN0KCkuZmFkZUluKGNvbmZpZy5mYXN0QW5pbWF0aW9uLCBmdW5jdGlvbiBzaG93TmV4dCgpIHtcclxuXHRcdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbiwgc2hvd05leHQpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcub3JkZXItbGlzdC1qcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0XHQvLyBzb3J0VW5vcmRlcmVkTGlzdChsaXN0KTtcclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdsYXN0LW5hbWUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdhbHBoYS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkQWxwaGFIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ3RpdGxlLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRUaXRsZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT1cclxuXHRcdDQuIENvbXBvbmVudHNcclxuXHQgICA9PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQgNC4xIE1vYmlsZSBNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdFx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgbW9iaWxlIG1lbnUuXHJcblx0XHQqXHJcblx0XHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIE1vYmlsZU1lbnUgPSAgZnVuY3Rpb24gTW9iaWxlTWVudShlbGVtZW50KSB7XHJcblx0XHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlcmUgY2FuIG9ubHkgYmUgb25lIG1vYmlsZSBtZW51LlwiKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdFx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRcdFVOREVSTEFZOiAnLm1vYmlsZS1uYXYtdW5kZXJsYXknXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbW9iaWxlTWVudSA9IHRoaXM7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5vbignY2xpY2snLCBtb2JpbGVNZW51LmNsb3NlTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uTU9CSUxFX01FTlUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09ICovXHJcblx0dmFyIERpYWxvZyA9IGZ1bmN0aW9uIERpYWxvZyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5kaWFsb2dOYW1lID0gJChlbGVtZW50KS5kYXRhKCdkaWFsb2cnKTtcclxuXHRcdHRoaXMudW5kZXJsYXkgPSAkKCcudW5kZXJsYXknKTtcclxuXHRcdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHRcdHRoaXMuY29udGVudCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0NPTlRFTlQpO1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIENvbXBvbmVudFxyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwicmVnaXN0ZXJlZFwiKTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcInJvbGVcIiwgXCJkaWFsb2dcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtbGFiZWxsZWRieVwiLCBcImRpYWxvZy10aXRsZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImRpYWxvZy1kZXNjXCIpO1xyXG5cdFx0dGhpcy5oZWFkZXIuYXR0cigndGl0bGUnLCB0aGlzLmhlYWRlci5maW5kKCcjZGlhbG9nLWRlc2MnKS5odG1sKCkpO1xyXG5cclxuXHRcdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0XHR0aGlzLmxvYWRlciA9ICQoZWxlbWVudCkuZmluZChcIi5sb2FkZXJcIik7XHJcblx0XHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0QUNUSVZFOiAnYWN0aXZlJyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRcdERJQUxPR19IRUFERVI6ICcuaGVhZGVyJyxcclxuXHRcdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0xvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdFx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuc2hvdygwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHdpbmRvd1snRGlhbG9nJ10gPSB0aGlzO1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlRGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdC8vIE5lZWRlZCBmb3IgY29udGV4dFxyXG5cdFx0dmFyIGRpYWxvZyA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0XHQkKCdidXR0b24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ2FjdGl2YXRvcicpICYmICQodGhpcykuZGF0YSgnZGlhbG9nJykgPT0gZGlhbG9nLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFSSUFcclxuXHRcdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRkaWFsb2cudW5kZXJsYXkub24oJ2NsaWNrJywgZGlhbG9nLmhpZGVEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHJcblx0XHR0cnl7XHJcblx0XHRcdCQoZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBkaWFsb2cuc2hvd0RpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2goZXJyKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkRpYWxvZyBcIiArIGRpYWxvZy5kaWFsb2dOYW1lICsgXCIgaGFzIG5vIGFjdGl2YXRvciBidXR0b24uXCIpO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkRJQUxPRykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5kaWFsb2cgPSBuZXcgRGlhbG9nKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydEaWFsb2cnXS5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0NC4zIERhdGEgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHRcdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0XHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdFx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0XHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0XHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRcdGlmIChyb3cpIHtcclxuXHRcdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuMyBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIENvbHVtblRvZ2dsZVRhYmxlID0gZnVuY3Rpb24gQ29sdW1uVG9nZ2xlVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZCA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHInKTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IG51bGw7XHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snQ29sdW1uVG9nZ2xlVGFibGUnXSA9IENvbHVtblRvZ2dsZVRhYmxlO1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0VE9HR0xFX1RBQkxFOiAnLnRhYmxlLWNvbHVtbi10b2dnbGUnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfQlVUVE9OOiAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBkb3QtbWVudV9fYWN0aXZhdG9yXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO21hcmdpbi10b3A6MnJlbTttYXJnaW4tbGVmdDphdXRvO1wiPkNvbHVtbnM8L2J1dHRvbj4nLFxyXG5cdFx0Q09MVU1OX1NFTEVDVE9SX01FTlU6ICc8dWwgY2xhc3M9XCJkb3QtbWVudSBkb3QtbWVudS0tYm90dG9tLWxlZnRcIj48L3VsPidcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cclxuXHRcdHRvZ2dsZUNvbHVtbjogZnVuY3Rpb24oY29sdW1uSW5kZXgsIHRhYmxlLCBjaGVja2VkKSB7XHJcblx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkucmVtb3ZlQXR0cignaGlkZGVuJyk7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5hdHRyKCdoaWRkZW4nLCBcInRydWVcIik7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoOiBmdW5jdGlvbih0YWJsZSkge1xyXG5cdFx0XHR2YXIgaGlkZUluZGljZXMgPSBbXTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzID0gdGFibGUuZWxlbWVudC5maW5kKCd0Ym9keSB0cicpO1xyXG5cclxuXHRcdFx0dGFibGUuaGVhZGVycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoJCh0aGlzKS5hdHRyKCdoaWRkZW4nKSl7XHJcblx0XHRcdFx0XHRoaWRlSW5kaWNlcy5wdXNoKCQodGhpcykuaW5kZXgoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZGVJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoaGlkZUluZGljZXNbaV0pLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JChDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy5yZWZyZXNoKHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYoIXRoaXMuZWxlbWVudC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJDb2x1bW5Ub2dnbGVUYWJsZSByZXF1aXJlcyB0aGUgdGFibGUgdG8gaGF2ZSBhbiB1bmlxdWUgSUQuXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHRvZ2dsZVRhYmxlID0gdGhpcztcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbiA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04pO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yTWVudSA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9NRU5VKTtcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCA9ICdDb2x1bW5Ub2dnbGVUYWJsZS0nICsgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudC5iZWZvcmUoY29sdW1uU2VsZWN0b3JCdXR0b24pO1xyXG5cclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmFmdGVyKGNvbHVtblNlbGVjdG9yTWVudSk7XHJcblx0XHRjb2x1bW5TZWxlY3RvckJ1dHRvbi5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkKTtcclxuXHRcdGNvbHVtblNlbGVjdG9yTWVudS5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkICsgJy1tZW51Jyk7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IGNvbHVtblNlbGVjdG9yQnV0dG9uO1xyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUgPSBjb2x1bW5TZWxlY3Rvck1lbnU7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUuZmluZCgndWwnKS5kYXRhKFwidGFibGVcIiwgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpKTtcclxuXHJcblx0XHR0aGlzLmhlYWRlcnMuZWFjaChmdW5jdGlvbiAoKXtcclxuXHRcdFx0dmFyIGNoZWNrZWQgPSAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpID8gXCJjaGVja2VkXCIgOiBcIlwiO1xyXG5cdFx0XHQkKHRoaXMpLmRhdGEoJ3Zpc2libGUnLCAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpKTtcclxuXHJcblx0XHRcdGNvbHVtblNlbGVjdG9yTWVudS5hcHBlbmQoJ1xcXHJcblx0XHRcdFx0PGxpIGNsYXNzPVwiZG90LW1lbnVfX2l0ZW0gZG90LW1lbnVfX2l0ZW0tLXBhZGRlZFwiPiBcXFxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+IFxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNvbHVtbi10b2dnbGVcIiBpZD1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCIgdHlwZT1cImNoZWNrYm94XCIgJysgY2hlY2tlZCArJz4gXFxcclxuXHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCI+JyArICQodGhpcykudGV4dCgpICsgJzwvbGFiZWw+IFxcXHJcblx0XHRcdFx0XHQ8L2Rpdj4gXFxcclxuXHRcdFx0XHQ8L2xpPicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuY29sdW1uLXRvZ2dsZVwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKCcuY29sdW1uLXRvZ2dsZScpLmluZGV4KHRoaXMpO1xyXG5cdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnRvZ2dsZUNvbHVtbihpbmRleCwgdG9nZ2xlVGFibGUsICQodGhpcykucHJvcCgnY2hlY2tlZCcpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkNvbHVtblRvZ2dsZVRhYmxlID0gbmV3IENvbHVtblRvZ2dsZVRhYmxlKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG5cdHdpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRcdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0XHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0XHRTUEFDRTogMzIsXHJcblx0XHRFTlRFUjogMTMsXHJcblx0XHRDT01NQTogNDVcclxuXHR9O1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU0VBUkNIXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdFx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdFx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDQuNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEVkaXRUb3BpYyA9IGZ1bmN0aW9uIEVkaXRUb3BpYyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5vcmlnaW5hbE5hbWUgPSAkKGVsZW1lbnQpLmRhdGEoXCJvcmlnaW5hbC10b3BpYy1uYW1lXCIpO1xyXG5cdFx0dGhpcy50b3BpY0lkID0gJChlbGVtZW50KS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdFx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmVkaXQtdG9waWMnKTtcclxuXHRcdHRoaXMuZGVsZXRlQnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZGVsZXRlLXRvcGljJyk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0VkaXRUb3BpYyddID0gRWRpdFRvcGljO1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRFRElUX1RPUElDOiAnLmVkaXQtdG9waWMtbGlzdCAudG9waWMnLFxyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRERUxFVEVfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRQQVRDSF9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRcdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0aWYodG9waWMub3JpZ2luYWxOYW1lID09IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0NoYW5nZSBUb3BpYyBOYW1lJyxcclxuXHRcdFx0XHR0eXBlOiAnYmx1ZScsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gPGI+XCInICsgIHRvcGljLm9yaWdpbmFsTmFtZSArICdcIjwvYj4gdG8gPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsnXCI8L2I+PycsXHJcblx0XHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ibHVlJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdFx0JCgnLmxvYWRlcicsIHRvcGljLmVsZW1lbnQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX25hbWUgOiB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMub3JpZ2luYWxOYW1lID0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjYW5jZWw6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHRcdHRpdGxlOiAnRGVsZXRlJyxcclxuXHRcdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsgJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGRlbGV0ZToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLmVsZW1lbnQuaGlkZShjb25maWcuc2xvd0FuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG9waWMucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Y3JlYXRlRWRpdFRvcGljRE9NOiBmdW5jdGlvbih0b3BpY0lkLCBvcmlnaW5hbE5hbWUpe1xyXG5cdFx0XHQkKFwiLmVkaXQtdG9waWMtbGlzdFwiKS5wcmVwZW5kKCc8bGkgY2xhc3M9XCJ0b3BpY1wiIGRhdGEtdG9waWMtaWQ9XCInICsgdG9waWNJZCArJ1wiIGRhdGEtb3JpZ2luYWwtdG9waWMtbmFtZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48aW5wdXQgc3BlbGxjaGVjaz1cInRydWVcIiBuYW1lPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBlZGl0LXRvcGljXCIgdHlwZT1cInN1Ym1pdFwiPkVkaXQ8L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRlbGV0ZS10b3BpYyBidXR0b24tLWRhbmdlclwiPkRlbGV0ZTwvYnV0dG9uPjwvbGk+Jyk7XHJcblx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBlZGl0VG9waWMgPSB0aGlzO1xyXG5cdFx0dGhpcy5lZGl0QnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZWRpdFRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHRcdHRoaXMuZGVsZXRlQnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZGVsZXRlVG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkVESVRfVE9QSUMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuRWRpdFRvcGljID0gbmV3IEVkaXRUb3BpYyh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDQuNyBEb3RNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIERvdE1lbnUgPSBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMubWVudSA9IG51bGw7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RE9UX01FTlU6ICcuZG90LW1lbnUnLFxyXG5cdFx0QUNUSVZBVE9SOiAnLmRvdC1tZW51X19hY3RpdmF0b3InLFxyXG5cdFx0SVNfVklTSUJMRTogJy5pcy12aXNpYmxlJyxcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJyxcclxuXHRcdEJPVFRPTV9MRUZUOiAnZG90LW1lbnUtLWJvdHRvbS1sZWZ0JyxcclxuXHRcdEJPVFRPTV9SSUdIVDogJ2RvdC1tZW51LS1ib3R0b20tcmlnaHQnLFxyXG5cdFx0VE9QX0xFRlQ6ICdkb3QtbWVudS0tdG9wLWxlZnQnLFxyXG5cdFx0VE9QX1JJR0hUOiAnZG90LW1lbnUtLXRvcC1yaWdodCcsXHJcblx0XHRUQUJMRV9ET1RfTUVOVTogJ2RvdC1tZW51LS10YWJsZSdcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJ1dHRvblJlY3QgPSB0aGlzLmJ1dHRvblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIGxlZnQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LnJpZ2h0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSBsZWZ0Jyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKHRoaXMpKCk7XHJcblx0XHR0aGlzLm1lbnUuYWRkQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLm1lbnUucmVtb3ZlQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuaGlkZSgpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZCh0aGlzKSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuc2hvdy5iaW5kKHRoaXMpKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvdE1lbnUgPSB0aGlzO1xyXG5cdFx0dmFyIG1lbnVJZCA9ICQodGhpcy5idXR0b24pLmF0dHIoJ2lkJykgKyAnLW1lbnUnO1xyXG5cclxuXHRcdHRoaXMubWVudSA9ICQoJyMnICsgbWVudUlkKTtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSB0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uVEFCTEVfRE9UX01FTlUpO1xyXG5cclxuXHRcdHRoaXMuYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGlmKCF0YXJnZXQuaXMoZG90TWVudS5tZW51KSB8fCAhdGFyZ2V0LmlzKGRvdE1lbnUuYnV0dG9uKSkge1xyXG5cdFx0XHRcdGlmKCEkLmNvbnRhaW5zKCQoZG90TWVudS5tZW51KVswXSwgZS50YXJnZXQpKXtcclxuXHRcdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uQUNUSVZBVE9SKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkRvdE1lbnUgPSBuZXcgRG90TWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0NS4gU2Vjb25kIE1hcmtlclxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHR2YXIgTWFya2VyID0gZnVuY3Rpb24gTWFya2VyKCkge1xyXG5cdFx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdFx0dGhpcy5zdHVkZW50VGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvclRhYmxlID0gJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIik7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JEYXRhVGFibGUgPSB0aGlzLnN1cGVydmlzb3JUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdFx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdtYXJrZXItaWQnKSA9PSByb3cuZGF0YSgnc3VwZXJ2aXNvci1pZCcpKXtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdFx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksXHJcblx0XHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5yZXNldFZpZXcgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0XHQkKFwiI3N0dWRlbnQtbmFtZVwiKS50ZXh0KHN0dWRlbnROYW1lKTtcclxuXHRcdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdFx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHRcdCQoXCIjcHJvamVjdC10aXRsZVwiKS5odG1sKCc8Yj5UaXRsZTogPC9iPicgKyBwcm9qZWN0Wyd0aXRsZSddKTtcclxuXHRcdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0WydkZXNjcmlwdGlvbiddKTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHR9XHJcblxyXG5cdCQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHdpbmRvd1snTWFya2VyJ107XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9O1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdHZhciBwcm9qZWN0SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKVsnaWQnXTtcclxuXHRcdHZhciBzdHVkZW50SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtaWQnKTtcclxuXHRcdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0XHR1cmw6IG1hcmtlci5VcmxzXy5BU1NJR05fTUFSS0VSLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkLFxyXG5cdFx0XHRcdHN0dWRlbnRfaWQ6IHN0dWRlbnRJZCxcclxuXHRcdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LnJlbW92ZSgpO1xyXG5cdFx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB0aGlzO1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCh0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTsgfSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCA4LiBPVEhFUlxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5lbWFpbC10YWJsZSAuY2hlY2tib3ggaW5wdXRcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc2VsZWN0ID0gZnVuY3Rpb24oZG9tKXtcclxuXHRcdFx0dmFyIHN0YXR1cyA9IGRvbS5wYXJlbnRzKCkuZXEoNCkuZGF0YSgnc3RhdHVzJyk7XHJcblx0XHRcdHZhciBlbWFpbFN0cmluZyA9IFwibWFpbHRvOlwiO1xyXG5cdFx0XHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcuZW1haWwtdGFibGUuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHRcdFx0dmFyIGVtYWlsQnV0dG9uc2VsZWN0b3IgPSBcIi5lbWFpbC1zZWxlY3RlZC5cIiArIHN0YXR1cztcclxuXHJcblx0XHRcdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdFx0XHRpZigkKHZhbHVlKS5pcyhcIjpjaGVja2VkXCIpICYmICEkKHZhbHVlKS5oYXNDbGFzcyhcIm1hc3Rlci1jaGVja2JveFwiKSkge1xyXG5cdFx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gJCh2YWx1ZSkuZGF0YSgnZW1haWwnKTtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxuXHRcdH07XHJcblx0XHRzZXRUaW1lb3V0KDIwMDAsIHNlbGVjdCgkKHRoaXMpKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuZW1haWwtc2VsZWN0ZWRcIiwgZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYoJCh0aGlzKS5wcm9wKCdocmVmJykgPT09ICdtYWlsdG86JyB8fCAkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gbnVsbCl7XHJcblx0XHRcdGFsZXJ0KFwiWW91IGhhdmVuJ3Qgc2VsZWN0ZWQgYW55b25lLlwiKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBFeHRlcm5hbCBsaW5rcyBnaXZlIGFuIGlsbHVzaW9uIG9mIEFKQVhcclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmV4dGVybmFsLWxpbmtcIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBlbGVtVG9IaWRlU2VsZWN0b3IgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1oaWRlLXNlbGVjdG9yJykpO1xyXG5cdFx0dmFyIGVsZW1Ub1JlcGxhY2UgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1yZXBsYWNlLXdpdGgtbG9hZGVyLXNlbGVjdG9yJykpO1xyXG5cclxuXHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdGVsZW1Ub0hpZGVTZWxlY3Rvci5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmhpZGUoKTtcclxuXHRcdGVsZW1Ub1JlcGxhY2UuYWZ0ZXIoJzxkaXYgaWQ9XCJjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lclwiIGNsYXNzPVwibG9hZGVyIGxvYWRlci0teC1sYXJnZVwiPjwvZGl2PicpO1xyXG5cclxuXHRcdCQoJyNjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBVc2VkIG9uIHRoZSBzdHVkZW50IGluZGV4IHBhZ2VcclxuXHQkKFwiI3NoYXJlLXByb2plY3QtZm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc2hhcmVfcHJvamVjdCl7XHJcblx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1lvdXIgbmFtZSBpcyBiZWluZyBzaGFyZWQgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignJywgJ1lvdSBhcmUgbm8gbG9uZ2VyIHNoYXJpbmcgeW91ciBuYW1lIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoJyNzaGFyZV9wcm9qZWN0JykucHJvcCgnY2hlY2tlZCcsIHJlc3BvbnNlLnNoYXJlX3Byb2plY3QpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHNob3dEaWFsb2cpe1xyXG5cdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnNob3coKTtcclxuXHRcdFx0XHQkKCcuZm9ybS1maWVsZCcsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuYWRkQ2xhc3MoXCJoYXMtZXJyb3JcIik7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyIHN1Ym1pdEJ1dHRvbiA9ICQodGhpcykuZmluZCgnOnN1Ym1pdCcpO1xyXG5cdFx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdWJtaXRCdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMuY3JlYXRlRWRpdFRvcGljRE9NKGRhdGFbXCJpZFwiXSwgZGF0YVtcIm5hbWVcIl0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gTkVXIFVTRVJcclxuXHQvLyBwdXQgdGhpcyBzdHVmZiBpbiBhbiBhcnJheVxyXG5cdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHJcblx0JCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdGlmKCQoJy5uZXctdXNlci1zdHVkZW50JykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0XHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JChcIi5mYXZvdXJpdGUtY29udGFpbmVyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHN2Z0NvbnRhaW5lciA9ICQodGhpcyk7XHJcblx0XHR2YXIgc3ZnID0gc3ZnQ29udGFpbmVyLmZpbmQoJ3N2ZycpO1xyXG5cdFx0dmFyIHByb2plY3RJZCA9IHdpbmRvd1sncHJvamVjdCddLmRhdGEoJ3Byb2plY3QtaWQnKTtcclxuXHJcblx0XHRzdmcuaGlkZSgwKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLnNob3coMCk7XHJcblxyXG5cdFx0aWYoc3ZnLmhhc0NsYXNzKCdmYXZvdXJpdGUnKSl7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAncmVtb3ZlJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL3JlbW92ZS1mYXZvdXJpdGUnO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAnYWRkJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL2FkZC1mYXZvdXJpdGUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihhY3Rpb24gPT0gXCJhZGRcIil7XHJcblx0XHRcdFx0XHRzdmcuYWRkQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzdmcucmVtb3ZlQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0c3ZnLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbik7XHJcblx0XHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLmhpZGUoMCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnbmF2Lm1vYmlsZSAuc3ViLWRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBkcm9wZG93biA9ICQodGhpcyk7XHJcblx0XHR2YXIgY29udGVudCA9IGRyb3Bkb3duLmZpbmQoJy5kcm9wZG93bi1jb250ZW50Jyk7XHJcblxyXG5cdFx0aWYoZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBmYWxzZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5oaWRlKGNvbmZpZy5tZWRpdW1BbmltYXRpb24pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIGZhbHNlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigxODBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5zaG93KGNvbmZpZy5tZWRpdW1BbmltYXRpb24pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT1cclxuXHRcdDkuIEluaXRpYWxpc2VcclxuXHQgICA9PT09PT09PT09PT09PT0gKi9cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblxyXG5cdC8vIFVzZWQgYXMgYW4gZWFzeSB3YXkgZm9yIGZ1bmN0aW9ucyB0byBnZXQgY3VycmVudCBwcm9qZWN0IGRhdGFcclxuXHRpZigkKCcucHJvamVjdC1jYXJkJykubGVuZ3RoID4gMCl7XHJcblx0XHR3aW5kb3dbJ3Byb2plY3QnXSA9ICQoJy5wcm9qZWN0LWNhcmQnKTtcclxuXHR9XHJcblxyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLmFqYXhFcnJvcihmdW5jdGlvbiggZXZlbnQsIHJlcXVlc3QsIHNldHRpbmdzICkge1xyXG5cdGlmKGNvbmZpZy5zaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uKXtcclxuXHRcdHNob3dOb3RpZmljYXRpb24oJ2Vycm9yJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggdGhhdCByZXF1ZXN0LicpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanMiXSwic291cmNlUm9vdCI6IiJ9