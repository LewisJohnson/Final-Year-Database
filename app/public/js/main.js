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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODQxZGQ0ZDAxNmNhZDFlZGMyNTIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImxlbmd0aCIsImFwcGVuZCIsInByZXBlbmQiLCJoaWRlIiwiY29uZmlnIiwiZmFzdEFuaW1hdGlvbiIsImZpcnN0IiwiZmFkZUluIiwic2hvd05leHQiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIk1vYmlsZU1lbnUiLCJlbGVtZW50Iiwid2luZG93IiwiYWN0aXZhdG9yIiwiU2VsZWN0b3JzXyIsIkhBTUJVUkdFUl9DT05UQUlORVIiLCJ1bmRlcmxheSIsIlVOREVSTEFZIiwiaW5pdCIsImxvZyIsInByb3RvdHlwZSIsIkNzc0NsYXNzZXNfIiwiSVNfVklTSUJMRSIsIk1PQklMRV9NRU5VIiwib3Blbk1lbnUiLCJhZGRDbGFzcyIsImNsb3NlTWVudSIsInJlbW92ZUNsYXNzIiwibW9iaWxlTWVudSIsIm9uIiwiYmluZCIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiZGF0YSIsImhlYWRlciIsImZpbmQiLCJESUFMT0dfSEVBREVSIiwiY29udGVudCIsIkRJQUxPR19DT05URU5UIiwiaHRtbCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dMb2FkZXIiLCJzaG93IiwiaGlkZUxvYWRlciIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwiZGlhbG9nIiwicHVzaCIsImVyciIsImRvY3VtZW50IiwicmVhZHkiLCJrZXlkb3duIiwiZSIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJlcSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJpbmRleCIsInJlZnJlc2hBbGwiLCJ0b2dnbGVUYWJsZSIsImNvbHVtblNlbGVjdG9yQnV0dG9uIiwiY29sdW1uU2VsZWN0b3JNZW51IiwiYWZ0ZXIiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCIsInRleHQiLCJBamF4RnVuY3Rpb25zIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJMT0dfSU5fRElBTE9HIiwiQ0hBTkdFX0FVVEhfRElBTE9HIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwidmFsIiwiY29uZmlybSIsInRpdGxlIiwidHlwZSIsImljb24iLCJ0aGVtZSIsImVzY2FwZUtleSIsImJhY2tncm91bmREaXNtaXNzIiwiYW5pbWF0ZUZyb21FbGVtZW50IiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwiYWN0aW9uIiwiY3NzIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImNvbnRleHQiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkb25lIiwiY2FuY2VsIiwiZGVsZXRlVG9waWMiLCJkZWxldGUiLCJzdWNjZXNzIiwic2xvd0FuaW1hdGlvbiIsInJlbW92ZSIsImNyZWF0ZUVkaXRUb3BpY0RPTSIsIkRvdE1lbnUiLCJNZW51IiwiYnV0dG9uIiwibWVudSIsImlzVGFibGVEb3RNZW51IiwiRE9UX01FTlUiLCJBQ1RJVkFUT1IiLCJCT1RUT01fTEVGVCIsIkJPVFRPTV9SSUdIVCIsIlRPUF9MRUZUIiwiVE9QX1JJR0hUIiwiVEFCTEVfRE9UX01FTlUiLCJwb3NpdGlvbk1lbnUiLCJidXR0b25SZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwibGVmdCIsInBhcnNlSW50IiwidG9wIiwicmlnaHQiLCJ0b2dnbGUiLCJkb3RNZW51IiwibWVudUlkIiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0IiwiY29udGFpbnMiLCJNYXJrZXIiLCJzZWxlY3RlZFN0dWRlbnQiLCJzZWxlY3RlZFN1cGVydmlzb3IiLCJzdHVkZW50VGFibGUiLCJzdHVkZW50RGF0YVRhYmxlIiwic3VwZXJ2aXNvclRhYmxlIiwic3VwZXJ2aXNvckRhdGFUYWJsZSIsIkFTU0lHTl9NQVJLRVIiLCJzZWxlY3RTdHVkZW50Iiwic3R1ZGVudFJvd0RPTSIsIm1hcmtlciIsInVuc2VsZWN0QWxsIiwic2VsZWN0U3VwZXJ2aXNvciIsInN1cGVydmlzb3JSb3dET00iLCJyZXNldFZpZXciLCJzdHVkZW50TmFtZSIsInN1cGVydmlzb3JOYW1lIiwibWFya2VyTmFtZSIsInByb2plY3QiLCJwcm9qZWN0SWQiLCJzdHVkZW50SWQiLCJtYXJrZXJJZCIsInByb2plY3RfaWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJ2YWx1ZSIsInNldFRpbWVvdXQiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInNlcmlhbGl6ZSIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwic2hhcmVfcHJvamVjdCIsInNob3dOb3RpZmljYXRpb24iLCJsb2NhdGlvbiIsInJlbG9hZCIsInN1Ym1pdEJ1dHRvbiIsImZhZGVPdXQiLCJzdmdDb250YWluZXIiLCJzdmciLCJhamF4VXJsIiwiZHJvcGRvd24iLCJtZWRpdW1BbmltYXRpb24iLCJhamF4RXJyb3IiLCJldmVudCIsInJlcXVlc3QiLCJzZXR0aW5ncyIsInNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7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LEtBQVYsRUFBaUJDLE9BQWpCLEVBQTBCQyxRQUExQixFQUFxQztBQUMxRCxLQUFHeFAsT0FBT3lQLCtCQUFWLEVBQTBDO0FBQ3pDZCxtQkFBaUIsT0FBakIsRUFBMEIseUNBQTFCO0FBQ0E7QUFDRCxDQUpELEUiLCJmaWxlIjoiXFxqc1xcbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4NDFkZDRkMDE2Y2FkMWVkYzI1MiIsIlxyXG4vKiBGSUxFIFNUUlVDVFVSRVxyXG5cclxuMS4gQUpBWCBTZXR1cFxyXG4zLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuNC4gQ29tcG9uZW50c1xyXG5cdDQuMSBNb2JpbGUgTWVudVxyXG5cdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG5cdDQuMyBEYXRhIFRhYmxlXHJcblx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQ0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdDQuNyBNZW51XHJcbjUuIFNlY29uZCBNYXJrZXJcclxuOC4gT3RoZXJcclxuOS4gSW5pdGlhbGlzZSBFdmVyeXRoaW5nXHJcbiovXHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09XHJcblx0MS4gQUpBWCBTZXR1cFxyXG4gICA9PT09PT09PT09PT09PT09ICovXHJcbiQuYWpheFNldHVwKHtcclxuXHRoZWFkZXJzOiB7XHJcblx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKSxcclxuXHR9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0My4gSFRNTCBNb2RpZmljYXRpb25zXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuaWYoJCgnLnNob3ctLXNjcm9sbC10by10b3AnKS5sZW5ndGggPiAwKXtcclxuXHQkKCcubWFpbi1jb250ZW50JykuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGJ1dHRvbi0tYWNjZW50IHNjcm9sbC10by10b3BcIj5TY3JvbGwgdG8gVG9wPC9idXR0b24+Jyk7XHJcbn1cclxuXHJcbi8vIEFjY2Vzc2liaWxpdHlcclxuJCgnLmRyb3Bkb3duJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG4kKCcuZHJvcGRvd24gPiBidXR0b24nKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xyXG4kKCcuZHJvcGRvd24gLmRyb3Bkb3duLWNvbnRlbnQgYScpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHJcbi8vIE1ha2VzIHByaW1hcnkgdG9waWMgZmlyc3RcclxuJCgnLnRvcGljcy1saXN0JykucHJlcGVuZCgkKCcuZmlyc3QnKSk7XHJcbiQoJy50b3BpY3MtbGlzdCAubG9hZGVyJykuaGlkZShjb25maWcuZmFzdEFuaW1hdGlvbik7XHJcbiQoJy50b3BpY3MtbGlzdCBsaScpLmZpcnN0KCkuZmFkZUluKGNvbmZpZy5mYXN0QW5pbWF0aW9uLCBmdW5jdGlvbiBzaG93TmV4dCgpIHtcclxuXHQkKHRoaXMpLm5leHQoIFwiLnRvcGljcy1saXN0IGxpXCIgKS5mYWRlSW4oY29uZmlnLmZhc3RBbmltYXRpb24sIHNob3dOZXh0KTtcclxufSk7XHJcblxyXG4kKCcub3JkZXItbGlzdC1qcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSAkKHRoaXMpO1xyXG5cdC8vIHNvcnRVbm9yZGVyZWRMaXN0KGxpc3QpO1xyXG5cclxuXHRpZihsaXN0Lmhhc0NsYXNzKCdsYXN0LW5hbWUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdGFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHR9XHJcblxyXG5cdGlmKGxpc3QuaGFzQ2xhc3MoJ2FscGhhLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRhZGRBbHBoYUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0fVxyXG5cclxuXHRpZihsaXN0Lmhhc0NsYXNzKCd0aXRsZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0YWRkVGl0bGVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09XHJcblx0NC4gQ29tcG9uZW50c1xyXG4gICA9PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PVxyXG5cdCA0LjEgTW9iaWxlIE1lbnVcclxuICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBtb2JpbGUgbWVudS5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIE1vYmlsZU1lbnUgPSAgZnVuY3Rpb24gTW9iaWxlTWVudShlbGVtZW50KSB7XHJcblx0aWYod2luZG93WydNb2JpbGVNZW51J10gPT0gbnVsbCl7XHJcblx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXSA9IHRoaXM7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IgPSAkKHRoaXMuU2VsZWN0b3JzXy5IQU1CVVJHRVJfQ09OVEFJTkVSKTtcclxuXHRcdHRoaXMudW5kZXJsYXkgPSAkKHRoaXMuU2VsZWN0b3JzXy5VTkRFUkxBWSk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc29sZS5sb2coXCJUaGVyZSBjYW4gb25seSBiZSBvbmUgbW9iaWxlIG1lbnUuXCIpO1xyXG5cdH1cclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdEhBTUJVUkdFUl9DT05UQUlORVI6ICcuaGFtYnVyZ2VyLWNvbnRhaW5lcicsXHJcblx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmNsb3NlTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBtb2JpbGVNZW51ID0gdGhpcztcclxuXHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdHRoaXMudW5kZXJsYXkub24oJ2NsaWNrJywgbW9iaWxlTWVudS5jbG9zZU1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLk1PQklMRV9NRU5VKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5tb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUodGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PVxyXG5cdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG4gICA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG52YXIgRGlhbG9nID0gZnVuY3Rpb24gRGlhbG9nKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0dGhpcy51bmRlcmxheSA9ICQoJy51bmRlcmxheScpO1xyXG5cdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHJcblx0Ly8gUmVnaXN0ZXIgQ29tcG9uZW50XHJcblx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwicmVnaXN0ZXJlZFwiKTtcclxuXHJcblx0Ly8gQVJJQVxyXG5cdHRoaXMuZWxlbWVudC5hdHRyKFwicm9sZVwiLCBcImRpYWxvZ1wiKTtcclxuXHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtbGFiZWxsZWRieVwiLCBcImRpYWxvZy10aXRsZVwiKTtcclxuXHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJkaWFsb2ctZGVzY1wiKTtcclxuXHR0aGlzLmhlYWRlci5hdHRyKCd0aXRsZScsIHRoaXMuaGVhZGVyLmZpbmQoJyNkaWFsb2ctZGVzYycpLmh0bWwoKSk7XHJcblxyXG5cdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0dGhpcy5sb2FkZXIgPSAkKGVsZW1lbnQpLmZpbmQoXCIubG9hZGVyXCIpO1xyXG5cdHRoaXMuaXNDbG9zYWJsZSA9IHRydWU7XHJcblx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0TE9BREVSOiAnPGRpdiBjbGFzcz1cImxvYWRlclwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4O3RvcDogMjUlO1wiPjwvZGl2PicsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdEFDVElWRTogJ2FjdGl2ZScsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RElBTE9HOiAnLmRpYWxvZycsXHJcblx0RElBTE9HX0hFQURFUjogJy5oZWFkZXInLFxyXG5cdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5zaG93TG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdHRoaXMuY29udGVudC5oaWRlKDApO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmxvYWRlci5oaWRlKDApO1xyXG5cdHRoaXMuY29udGVudC5zaG93KDApO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0dGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIiwgdGhpcy5kaWFsb2dOYW1lKTtcclxuXHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdHdpbmRvd1snRGlhbG9nJ10gPSB0aGlzO1xyXG5cdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5oaWRlRGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLmlzQ2xvc2FibGUgJiYgdGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIikgPT0gdGhpcy5kaWFsb2dOYW1lKXtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdH1cclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0Ly8gTmVlZGVkIGZvciBjb250ZXh0XHJcblx0dmFyIGRpYWxvZyA9IHRoaXM7XHJcblxyXG5cdC8vIEZpbmQgYWN0aXZhdG9yIGJ1dHRvblxyXG5cdCQoJ2J1dHRvbicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHRoaXMpLmRhdGEoJ2FjdGl2YXRvcicpICYmICQodGhpcykuZGF0YSgnZGlhbG9nJykgPT0gZGlhbG9nLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHRkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucy5wdXNoKCQodGhpcykpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBBUklBXHJcblx0ZGlhbG9nLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHJcblx0ZGlhbG9nLnVuZGVybGF5Lm9uKCdjbGljaycsIGRpYWxvZy5oaWRlRGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblxyXG5cdHRyeXtcclxuXHRcdCQoZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcykub24oJ2NsaWNrJywgZGlhbG9nLnNob3dEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHRcdH0pO1xyXG5cdH0gY2F0Y2goZXJyKXtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJEaWFsb2cgXCIgKyBkaWFsb2cuZGlhbG9nTmFtZSArIFwiIGhhcyBubyBhY3RpdmF0b3IgYnV0dG9uLlwiKTtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHR9XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLkRJQUxPRykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuZGlhbG9nID0gbmV3IERpYWxvZyh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdCQodGhpcykua2V5ZG93bihmdW5jdGlvbihlKSB7XHJcblx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdHdpbmRvd1snRGlhbG9nJ10uaGlkZURpYWxvZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT1cclxuXHQ0LjMgRGF0YSBUYWJsZVxyXG4gICA9PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcbipcclxuKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIERhdGFUYWJsZSA9IGZ1bmN0aW9uIERhdGFUYWJsZShlbGVtZW50KSB7XHJcblx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHR0aGlzLmZvb3RSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Zm9vdCB0cicpO1xyXG5cdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0dGhpcy5jaGVja2JveGVzID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5DSEVDS0JPWCk7XHJcblx0dGhpcy5tYXN0ZXJDaGVja2JveCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uTUFTVEVSX0NIRUNLQk9YKTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snRGF0YVRhYmxlJ10gPSBEYXRhVGFibGU7XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICcuZGF0YS10YWJsZScsXHJcblx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0Q0hFQ0tCT1g6ICd0Ym9keSAuY2hlY2tib3gtaW5wdXQnLFxyXG5cdElTX1NFTEVDVEVEOiAnLmlzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0c2VsZWN0QWxsUm93czogZnVuY3Rpb24oKSB7XHJcblx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0dGhpcy5yb3dzLmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5yb3dzLnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNlbGVjdFJvdzogZnVuY3Rpb24gKGNoZWNrYm94LCByb3cpIHtcclxuXHRcdGlmIChyb3cpIHtcclxuXHRcdFx0aWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0cm93LmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJvdy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHQkKHRoaXMuY2hlY2tib3hlcykuZWFjaChmdW5jdGlvbihpKSB7XHJcblx0XHQkKHRoaXMpLm9uKCdjaGFuZ2UnLCAkLnByb3h5KGRhdGFUYWJsZS5mdW5jdGlvbnMuc2VsZWN0Um93LCB0aGlzLCAkKHRoaXMpLCBkYXRhVGFibGUuYm9keVJvd3MuZXEoaSkpKTtcclxuXHR9KTtcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5kYXRhVGFibGUgPSBuZXcgRGF0YVRhYmxlKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PVxyXG5cdDQuMyBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcbiAgID09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgQ29sdW1uVG9nZ2xlVGFibGUgPSBmdW5jdGlvbiBDb2x1bW5Ub2dnbGVUYWJsZShlbGVtZW50KSB7XHJcblx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHR0aGlzLmhlYWQgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyJyk7XHJcblx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0dGhpcy5zZWxlY3Rvck1lbnUgPSBudWxsO1xyXG5cdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBudWxsO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydDb2x1bW5Ub2dnbGVUYWJsZSddID0gQ29sdW1uVG9nZ2xlVGFibGU7XHJcblxyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRUT0dHTEVfVEFCTEU6ICcudGFibGUtY29sdW1uLXRvZ2dsZSdcclxufTtcclxuXHJcbkNvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdENPTFVNTl9TRUxFQ1RPUl9CVVRUT046ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGRvdC1tZW51X19hY3RpdmF0b3JcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1sZWZ0OmF1dG87XCI+Q29sdW1uczwvYnV0dG9uPicsXHJcblx0Q09MVU1OX1NFTEVDVE9SX01FTlU6ICc8dWwgY2xhc3M9XCJkb3QtbWVudSBkb3QtbWVudS0tYm90dG9tLWxlZnRcIj48L3VsPidcclxufTtcclxuXHJcbkNvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblxyXG5cdHRvZ2dsZUNvbHVtbjogZnVuY3Rpb24oY29sdW1uSW5kZXgsIHRhYmxlLCBjaGVja2VkKSB7XHJcblx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5yZW1vdmVBdHRyKCdoaWRkZW4nKTtcclxuXHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmF0dHIoJ2hpZGRlbicsIFwidHJ1ZVwiKTtcclxuXHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVmcmVzaDogZnVuY3Rpb24odGFibGUpIHtcclxuXHRcdHRhYmxlLmJvZHlSb3dzID0gdGFibGUuZWxlbWVudC5maW5kKCd0Ym9keSB0cicpO1xyXG5cclxuXHRcdHZhciBoaWRlSW5kaWNlcyA9IFtdO1xyXG5cclxuXHRcdHRhYmxlLmhlYWRlcnMuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigkKHRoaXMpLmF0dHIoJ2hpZGRlbicpKXtcclxuXHRcdFx0XHRoaWRlSW5kaWNlcy5wdXNoKCQodGhpcykuaW5kZXgoKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoaWRlSW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShoaWRlSW5kaWNlc1tpXSkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRyZWZyZXNoQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdCQoQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnJlZnJlc2godGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG59O1xyXG5cclxuQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdGlmKCF0aGlzLmVsZW1lbnQuYXR0cignaWQnKSl7XHJcblx0XHRjb25zb2xlLmxvZyhcIkNvbHVtblRvZ2dsZVRhYmxlIHJlcXVpcmVzIHRoZSB0YWJsZSB0byBoYXZlIGFuIHVuaXF1ZSBJRC5cIik7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgdG9nZ2xlVGFibGUgPSB0aGlzO1xyXG5cdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbiA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04pO1xyXG5cdHZhciBjb2x1bW5TZWxlY3Rvck1lbnUgPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfTUVOVSk7XHJcblxyXG5cdHRoaXMuZWxlbWVudC5iZWZvcmUoY29sdW1uU2VsZWN0b3JCdXR0b24pO1xyXG5cdGNvbHVtblNlbGVjdG9yQnV0dG9uLmFmdGVyKGNvbHVtblNlbGVjdG9yTWVudSk7XHJcblxyXG5cdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCA9ICdDb2x1bW5Ub2dnbGVUYWJsZS0nICsgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpO1xyXG5cdGNvbHVtblNlbGVjdG9yQnV0dG9uLmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQpO1xyXG5cdGNvbHVtblNlbGVjdG9yTWVudS5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkICsgJy1tZW51Jyk7XHJcblxyXG5cdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBjb2x1bW5TZWxlY3RvckJ1dHRvbjtcclxuXHR0aGlzLnNlbGVjdG9yTWVudSA9IGNvbHVtblNlbGVjdG9yTWVudTtcclxuXHJcblx0dGhpcy5zZWxlY3Rvck1lbnUuZmluZCgndWwnKS5kYXRhKFwidGFibGVcIiwgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpKTtcclxuXHJcblx0dGhpcy5oZWFkZXJzLmVhY2goZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuZGF0YShcImRlZmF1bHRcIikgPyBcImNoZWNrZWRcIiA6IFwiXCI7XHJcblx0XHQkKHRoaXMpLmRhdGEoJ3Zpc2libGUnLCAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpKTtcclxuXHJcblx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXBwZW5kKCdcXFxyXG5cdFx0XHQ8bGkgY2xhc3M9XCJkb3QtbWVudV9faXRlbSBkb3QtbWVudV9faXRlbS0tcGFkZGVkXCI+IFxcXHJcblx0XHRcdFx0PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+IFxcXHJcblx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJjb2x1bW4tdG9nZ2xlXCIgaWQ9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiIHR5cGU9XCJjaGVja2JveFwiICcrIGNoZWNrZWQgKyc+IFxcXHJcblx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIj4nICsgJCh0aGlzKS50ZXh0KCkgKyAnPC9sYWJlbD4gXFxcclxuXHRcdFx0XHQ8L2Rpdj4gXFxcclxuXHRcdFx0PC9saT4nKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmNvbHVtbi10b2dnbGUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBpbmRleCA9ICQoJy5jb2x1bW4tdG9nZ2xlJykuaW5kZXgodGhpcyk7XHJcblx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnRvZ2dsZUNvbHVtbihpbmRleCwgdG9nZ2xlVGFibGUsICQodGhpcykucHJvcCgnY2hlY2tlZCcpKTtcclxuXHR9KTtcclxuXHJcbn07XHJcblxyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLkNvbHVtblRvZ2dsZVRhYmxlID0gbmV3IENvbHVtblRvZ2dsZVRhYmxlKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdDQuNSBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgQWpheEZ1bmN0aW9ucyA9ICBmdW5jdGlvbiBBamF4RnVuY3Rpb25zKCkge307XHJcbndpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRTRUFSQ0hfQ09OVEFJTkVSOiAnLnNlYXJjaC1jb250YWluZXInLFxyXG5cdFNFQVJDSF9GSUxURVJfQ09OVEFJTkVSOiAnLnNlYXJjaC1maWx0ZXItY29udGFpbmVyJyxcclxuXHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0TE9HX0lOX0RJQUxPRzogJy5sb2dpbi5kaWFsb2cnLFxyXG5cdENIQU5HRV9BVVRIX0RJQUxPRzogJy5jaGFuZ2UtYXV0aC5kaWFsb2cnXHJcbn07XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5LZXlzXyA9IHtcclxuXHRTUEFDRTogMzIsXHJcblx0RU5URVI6IDEzLFxyXG5cdENPTU1BOiA0NVxyXG59O1xyXG5cclxuLy8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1c1xyXG4kKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXMnLCAgZnVuY3Rpb24oZSl7XHJcblx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LWZvY3VzJyk7XHJcbn0pO1xyXG5cclxuLy8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3Vzb3V0JywgIGZ1bmN0aW9uKGUpe1xyXG5cdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxufSk7XHJcblxyXG4vLyBTRUFSQ0hcclxuJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgY29udGFpbmVyID0gJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSKTtcclxuXHR2YXIgZmlsdGVyQnV0dG9uID0gJCh0aGlzKTtcclxuXHJcblx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0ZmlsdGVyQnV0dG9uLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0fSBlbHNle1xyXG5cdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgRWRpdFRvcGljID0gZnVuY3Rpb24gRWRpdFRvcGljKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHR0aGlzLnRvcGljSWQgPSAkKGVsZW1lbnQpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0dGhpcy5kZWxldGVCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5kZWxldGUtdG9waWMnKTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snRWRpdFRvcGljJ10gPSBFZGl0VG9waWM7XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge307XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFBBVENIX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRpZih0b3BpYy5vcmlnaW5hbE5hbWUgPT0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCkpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogJ0NoYW5nZSBUb3BpYyBOYW1lJyxcclxuXHRcdFx0dHlwZTogJ2JsdWUnLFxyXG5cdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIDxiPlwiJyArICB0b3BpYy5vcmlnaW5hbE5hbWUgKyAnXCI8L2I+IHRvIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArJ1wiPC9iPj8nLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHQkKCcubG9hZGVyJywgdG9waWMuZWxlbWVudCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljX25hbWUgOiB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy5vcmlnaW5hbE5hbWUgPSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnRGVsZXRlJyxcclxuXHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArICdcIjwvYj4/JyxcclxuXHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdGRlbGV0ZToge1xyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxyXG5cdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLmVsZW1lbnQuaGlkZShjb25maWcuc2xvd0FuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZUVkaXRUb3BpY0RPTTogZnVuY3Rpb24odG9waWNJZCwgb3JpZ2luYWxOYW1lKXtcclxuXHRcdCQoXCIuZWRpdC10b3BpYy1saXN0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyB0b3BpY0lkICsnXCIgZGF0YS1vcmlnaW5hbC10b3BpYy1uYW1lPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxpbnB1dCBzcGVsbGNoZWNrPVwidHJ1ZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGVkaXQtdG9waWNcIiB0eXBlPVwic3VibWl0XCI+RWRpdDwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidXR0b24gZGVsZXRlLXRvcGljIGJ1dHRvbi0tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC9saT4nKTtcclxuXHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdH1cclxufTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgZWRpdFRvcGljID0gdGhpcztcclxuXHR0aGlzLmVkaXRCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5lZGl0VG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdHRoaXMuZGVsZXRlQnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZGVsZXRlVG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLkVESVRfVE9QSUMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLkVkaXRUb3BpYyA9IG5ldyBFZGl0VG9waWModGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgNC43IERvdE1lbnVcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcbipcclxuKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIERvdE1lbnUgPSBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcclxuXHR0aGlzLmJ1dHRvbiA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5tZW51ID0gbnVsbDtcclxuXHR0aGlzLmlzVGFibGVEb3RNZW51ID0gZmFsc2U7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG5Eb3RNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdERPVF9NRU5VOiAnLmRvdC1tZW51JyxcclxuXHRBQ1RJVkFUT1I6ICcuZG90LW1lbnVfX2FjdGl2YXRvcicsXHJcblx0SVNfVklTSUJMRTogJy5pcy12aXNpYmxlJyxcclxufTtcclxuXHJcblxyXG5Eb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZScsXHJcblx0Qk9UVE9NX0xFRlQ6ICdkb3QtbWVudS0tYm90dG9tLWxlZnQnLFxyXG5cdEJPVFRPTV9SSUdIVDogJ2RvdC1tZW51LS1ib3R0b20tcmlnaHQnLFxyXG5cdFRPUF9MRUZUOiAnZG90LW1lbnUtLXRvcC1sZWZ0JyxcclxuXHRUT1BfUklHSFQ6ICdkb3QtbWVudS0tdG9wLXJpZ2h0JyxcclxuXHRUQUJMRV9ET1RfTUVOVTogJ2RvdC1tZW51LS10YWJsZSdcclxufTtcclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGJ1dHRvblJlY3QgPSB0aGlzLmJ1dHRvblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX0xFRlQpKXtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCByaWdodCcpO1xyXG5cdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fUklHSFQpKXtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AgbGVmdCcpO1xyXG5cdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCkpe1xyXG5cdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QucmlnaHQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSByaWdodCcpO1xyXG5cdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfUklHSFQpKXtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICdib3R0b20gbGVmdCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCcpO1xyXG5cdH1cclxufVxyXG5cclxuRG90TWVudS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcblx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQodGhpcykoKTtcclxuXHR0aGlzLm1lbnUuYWRkQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0dGhpcy5tZW51LnNob3coKTtcclxufVxyXG5cclxuRG90TWVudS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5tZW51LnJlbW92ZUNsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdHRoaXMubWVudS5oaWRlKCk7XHJcbn1cclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZCh0aGlzKSgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHREb3RNZW51LnByb3RvdHlwZS5zaG93LmJpbmQodGhpcykoKTtcclxuXHR9XHJcbn1cclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGRvdE1lbnUgPSB0aGlzO1xyXG5cdHZhciBtZW51SWQgPSAkKHRoaXMuYnV0dG9uKS5hdHRyKCdpZCcpICsgJy1tZW51JztcclxuXHJcblx0dGhpcy5tZW51ID0gJCgnIycgKyBtZW51SWQpO1xyXG5cdHRoaXMuaXNUYWJsZURvdE1lbnUgPSB0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uVEFCTEVfRE9UX01FTlUpO1xyXG5cclxuXHR0aGlzLmJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlLmJpbmQoZG90TWVudSkoKTtcclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKCF0YXJnZXQuaXMoZG90TWVudS5tZW51KSB8fCAhdGFyZ2V0LmlzKGRvdE1lbnUuYnV0dG9uKSkge1xyXG5cdFx0XHRpZighJC5jb250YWlucygkKGRvdE1lbnUubWVudSlbMF0sIGUudGFyZ2V0KSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5BQ1RJVkFUT1IpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLkRvdE1lbnUgPSBuZXcgRG90TWVudSh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PVxyXG5cdDUuIFNlY29uZCBNYXJrZXJcclxuICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG52YXIgTWFya2VyID0gZnVuY3Rpb24gTWFya2VyKCkge1xyXG5cdGlmKCQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpLmxlbmd0aCA8IDEgfHwgJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIikubGVuZ3RoIDwgMSl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHR0aGlzLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0dGhpcy5zdHVkZW50VGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKTtcclxuXHR0aGlzLnN0dWRlbnREYXRhVGFibGUgPSB0aGlzLnN0dWRlbnRUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0dGhpcy5zdXBlcnZpc29yVGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKTtcclxuXHR0aGlzLnN1cGVydmlzb3JEYXRhVGFibGUgPSB0aGlzLnN1cGVydmlzb3JUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdEFTU0lHTl9NQVJLRVI6ICcvYWRtaW4vbWFya2VyLWFzc2lnbicsXHJcbn07XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdHZhciByb3cgPSAkKHN0dWRlbnRSb3dET00pO1xyXG5cclxuXHRtYXJrZXIudW5zZWxlY3RBbGwobWFya2VyKTtcclxuXHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gJChyb3cpO1xyXG5cclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoJCh0aGlzKS5kYXRhKCdtYXJrZXItaWQnKSA9PSByb3cuZGF0YSgnc3VwZXJ2aXNvci1pZCcpKXtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yID0gZnVuY3Rpb24oc3VwZXJ2aXNvclJvd0RPTSwgbWFya2VyKXtcclxuXHR2YXIgcm93ID0gJChzdXBlcnZpc29yUm93RE9NKTtcclxuXHJcblx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgIT0gbnVsbCl7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2coXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1uYW1lJyksXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksXHJcblx0XHRcdHJvdy5kYXRhKCdtYXJrZXItbmFtZScpLFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKSk7XHJcblx0fVxyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnJlc2V0VmlldyA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihzdHVkZW50TmFtZSwgc3VwZXJ2aXNvck5hbWUsIG1hcmtlck5hbWUsIHByb2plY3Qpe1xyXG5cdCQoXCIjc3R1ZGVudC1uYW1lXCIpLnRleHQoc3R1ZGVudE5hbWUpO1xyXG5cdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdCQoXCIjbWFya2VyLW5hbWVcIikudGV4dChtYXJrZXJOYW1lKTtcclxuXHJcblx0JChcIiNwcm9qZWN0LXRpdGxlXCIpLmh0bWwoJzxiPlRpdGxlOiA8L2I+JyArIHByb2plY3RbJ3RpdGxlJ10pO1xyXG5cdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0WydkZXNjcmlwdGlvbiddKTtcclxuXHJcblx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcbn1cclxuXHJcbiQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdHZhciBtYXJrZXIgPSB3aW5kb3dbJ01hcmtlciddO1xyXG5cclxuXHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9PSBudWxsKXtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH07XHJcblxyXG5cdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHR2YXIgcHJvamVjdElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JylbJ2lkJ107XHJcblx0dmFyIHN0dWRlbnRJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1pZCcpO1xyXG5cdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHR1cmw6IG1hcmtlci5VcmxzXy5BU1NJR05fTUFSS0VSLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWQsXHJcblx0XHRcdHN0dWRlbnRfaWQ6IHN0dWRlbnRJZCxcclxuXHRcdFx0bWFya2VyX2lkOiBtYXJrZXJJZCxcclxuXHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG5cdFx0fSxcclxuXHRcdC8vIEFkZCBmYWlsXHJcblx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LnJlbW92ZSgpO1xyXG5cdFx0bWFya2VyLnJlc2V0VmlldyhtYXJrZXIpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIG1hcmtlciA9IHRoaXM7XHJcblxyXG5cdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50KHRoaXMsIG1hcmtlcik7XHJcblx0fSk7XHJcblxyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yKHRoaXMsIG1hcmtlcik7XHJcblx0fSk7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCA4LiBPVEhFUlxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4kKCcuZW1haWwtdGFibGUgLmNoZWNrYm94IGlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHR2YXIgc2VsZWN0ID0gZnVuY3Rpb24oZG9tKXtcclxuXHRcdHZhciBzdGF0dXMgPSBkb20ucGFyZW50cygpLmVxKDQpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdFx0dmFyIGVtYWlsU3RyaW5nID0gXCJtYWlsdG86XCI7XHJcblx0XHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcuZW1haWwtdGFibGUuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHRcdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblxyXG5cdFx0JChjaGVja2JveFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0XHRpZigkKHZhbHVlKS5pcyhcIjpjaGVja2VkXCIpICYmICEkKHZhbHVlKS5oYXNDbGFzcyhcIm1hc3Rlci1jaGVja2JveFwiKSkge1xyXG5cdFx0XHRcdGVtYWlsU3RyaW5nICs9ICQodmFsdWUpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gXCIsXCI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JChlbWFpbEJ1dHRvbnNlbGVjdG9yKS5wcm9wKCdocmVmJywgZW1haWxTdHJpbmcpO1xyXG5cdH07XHJcblx0c2V0VGltZW91dCgyMDAwLCBzZWxlY3QoJCh0aGlzKSkpO1xyXG59KTtcclxuXHJcbiQoJy5lbWFpbC1zZWxlY3RlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRpZigkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gJ21haWx0bzonIHx8ICQodGhpcykucHJvcCgnaHJlZicpID09PSBudWxsKXtcclxuXHRcdGFsZXJ0KFwiWW91IGhhdmVuJ3Qgc2VsZWN0ZWQgYW55b25lLlwiKTtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcbiQoJy5leHRlcm5hbC1saW5rJykub24oJ2NsaWNrJywgIGZ1bmN0aW9uKGUpIHtcclxuXHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHR2YXIgZWxlbVRvUmVwbGFjZSA9ICQoJCh0aGlzKS5kYXRhKCdlbGVtZW50LXRvLXJlcGxhY2Utd2l0aC1sb2FkZXItc2VsZWN0b3InKSk7XHJcblxyXG5cdGVsZW1Ub0hpZGVTZWxlY3Rvci5oaWRlKCk7XHJcblx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0ZWxlbVRvUmVwbGFjZS5hZnRlcignPGRpdiBpZD1cImNvbnRlbnQtcmVwbGFjZWQtY29udGFpbmVyXCIgY2xhc3M9XCJsb2FkZXIgbG9hZGVyLS14LWxhcmdlXCI+PC9kaXY+Jyk7XHJcblxyXG5cdCQoJyNjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG59KTtcclxuXHJcbi8vIFVzZWQgb24gdGhlIHN0dWRlbnQgaW5kZXggcGFnZVxyXG4kKFwiI3NoYXJlLXByb2plY3QtZm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cdFx0XHRpZihyZXNwb25zZS5zaGFyZV9wcm9qZWN0KXtcclxuXHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1lvdXIgbmFtZSBpcyBiZWluZyBzaGFyZWQgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCcnLCAnWW91IGFyZSBubyBsb25nZXIgc2hhcmluZyB5b3VyIG5hbWUgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQkKCcjc2hhcmVfcHJvamVjdCcpLnByb3AoJ2NoZWNrZWQnLCByZXNwb25zZS5zaGFyZV9wcm9qZWN0KTtcclxuXHRcdH0sXHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJChcIiNsb2dpbkZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0JCgnLmhlbHAtYmxvY2snLCAnI2xvZ2luRm9ybScpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0dHlwZTonUE9TVCcsXHJcblx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0c3VjY2VzczpmdW5jdGlvbihzaG93RGlhbG9nKXtcclxuXHRcdFx0aWYoc2hvd0RpYWxvZyA9PSBcInRydWVcIil7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblxyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5DSEFOR0VfQVVUSF9ESUFMT0cpWzBdLmRpYWxvZy5pc0Nsb3NhYmxlID0gZmFsc2U7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkNIQU5HRV9BVVRIX0RJQUxPRylbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnNob3coKTtcclxuXHRcdFx0JCgnLmZvcm0tZmllbGQnLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmFkZENsYXNzKFwiaGFzLWVycm9yXCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdHZhciBzdWJtaXRCdXR0b24gPSAkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKTtcclxuXHRzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdCQoJy5sb2FkZXInLCBzdWJtaXRCdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0dHlwZTonUE9TVCcsXHJcblx0XHRjb250ZXh0OiAkKHRoaXMpLFxyXG5cdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucy5jcmVhdGVFZGl0VG9waWNET00oZGF0YVtcImlkXCJdLCBkYXRhW1wibmFtZVwiXSk7XHJcblx0XHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKCkge31cclxuXHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHRcdCQodGhpcykuZmluZCgnOnN1Ym1pdCcpLmh0bWwoJ0FkZCcpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbi8vIFVzZWQgZm9yIHRyYW5zYWN0aW9uc1xyXG4kKCcjc2hvdy1yYXctdGFibGUtZGF0YScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdGlmKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKXtcclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5jc3MoJ3dpZHRoJywgJCgndGFibGUuZnVsbC1kZXRhaWwnKS5jc3MoJ3dpZHRoJykpO1xyXG5cdFx0JCgndGFibGUuZnVsbC1kZXRhaWwnKS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xyXG5cclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuZmFkZU91dChjb25maWcuZmFzdEFuaW1hdGlvbik7XHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuZmFkZUluKGNvbmZpZy5mYXN0QW5pbWF0aW9uLCBmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmNzcygnd2lkdGgnLCAkKCd0YWJsZS5yYXctZGV0YWlsJykuY3NzKCd3aWR0aCcpKTtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcclxuXHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuZmFkZU91dChjb25maWcuZmFzdEFuaW1hdGlvbik7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gTkVXIFVTRVJcclxuLy8gcHV0IHRoaXMgc3R1ZmYgaW4gYW4gYXJyYXlcclxuJCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcbiQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0aWYoJCgnI3N0dWRlbnQtb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjYWRtaW4tb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gU1RSSU5HU1xyXG4kKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRpZigkKCcjc3R1ZGVudC1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNhZG1pbi1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4kKFwiLmZhdm91cml0ZS1jb250YWluZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIHN2Z0NvbnRhaW5lciA9ICQodGhpcyk7XHJcblx0dmFyIHN2ZyA9IHN2Z0NvbnRhaW5lci5maW5kKCdzdmcnKTtcclxuXHR2YXIgcHJvamVjdElkID0gd2luZG93Wydwcm9qZWN0J10uZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cclxuXHRzdmcuaGlkZSgwKTtcclxuXHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5zaG93KDApO1xyXG5cclxuXHRpZihzdmcuaGFzQ2xhc3MoJ2Zhdm91cml0ZScpKXtcclxuXHRcdHZhciBhY3Rpb24gPSAncmVtb3ZlJztcclxuXHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9yZW1vdmUtZmF2b3VyaXRlJztcclxuXHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBhY3Rpb24gPSAnYWRkJztcclxuXHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9hZGQtZmF2b3VyaXRlJztcclxuXHR9XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYoYWN0aW9uID09IFwiYWRkXCIpe1xyXG5cdFx0XHRcdHN2Zy5hZGRDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c3ZnLnJlbW92ZUNsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRzdmcuZmFkZUluKGNvbmZpZy5mYXN0QW5pbWF0aW9uKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLmhpZGUoMCk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJCgnbmF2Lm1vYmlsZSAuc3ViLWRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgZHJvcGRvd24gPSAkKHRoaXMpO1xyXG5cdHZhciBjb250ZW50ID0gZHJvcGRvd24uZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKTtcclxuXHJcblx0aWYoZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xyXG5cdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XHJcblxyXG5cdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDBkZWcpXCIpO1xyXG5cdFx0ZHJvcGRvd24ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRjb250ZW50LmhpZGUoY29uZmlnLm1lZGl1bUFuaW1hdGlvbik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIHRydWUpO1xyXG5cdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgZmFsc2UpO1xyXG5cclxuXHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigxODBkZWcpXCIpO1xyXG5cdFx0ZHJvcGRvd24uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRjb250ZW50LnNob3coY29uZmlnLm1lZGl1bUFuaW1hdGlvbik7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PVxyXG5cdDkuIEluaXRpYWxpc2VcclxuICAgPT09PT09PT09PT09PT09ICovXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRGlhbG9nLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuTWFya2VyLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkRvdE1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHJcbmlmKCQoJy5wcm9qZWN0LWNhcmQnKS5sZW5ndGggPiAwKXtcclxuXHR3aW5kb3dbJ3Byb2plY3QnXSA9ICQoJy5wcm9qZWN0LWNhcmQnKTtcclxufVxyXG5cclxuLy8gRU5EIE9GIERPQyBSRUFEWSBGSUxFXHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uKCBldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MgKSB7XHJcblx0aWYoY29uZmlnLnNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24pe1xyXG5cdFx0c2hvd05vdGlmaWNhdGlvbignZXJyb3InLCAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGF0IHJlcXVlc3QuJyk7XHJcblx0fVxyXG59KTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=