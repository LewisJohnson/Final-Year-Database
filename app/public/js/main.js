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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTVlOTJjMGUwNDE4MmViMjY5YTMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImxlbmd0aCIsImFwcGVuZCIsInByZXBlbmQiLCJoaWRlIiwiY29uZmlnIiwiZmFzdEFuaW1hdGlvbiIsImZpcnN0IiwiZmFkZUluIiwic2hvd05leHQiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIk1vYmlsZU1lbnUiLCJlbGVtZW50Iiwid2luZG93IiwiYWN0aXZhdG9yIiwiU2VsZWN0b3JzXyIsIkhBTUJVUkdFUl9DT05UQUlORVIiLCJ1bmRlcmxheSIsIlVOREVSTEFZIiwiaW5pdCIsImxvZyIsInByb3RvdHlwZSIsIkNzc0NsYXNzZXNfIiwiSVNfVklTSUJMRSIsIk1PQklMRV9NRU5VIiwib3Blbk1lbnUiLCJhZGRDbGFzcyIsImNsb3NlTWVudSIsInJlbW92ZUNsYXNzIiwibW9iaWxlTWVudSIsIm9uIiwiYmluZCIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiZGF0YSIsImhlYWRlciIsImZpbmQiLCJESUFMT0dfSEVBREVSIiwiY29udGVudCIsIkRJQUxPR19DT05URU5UIiwiaHRtbCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dMb2FkZXIiLCJzaG93IiwiaGlkZUxvYWRlciIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwiZGlhbG9nIiwicHVzaCIsImVyciIsImRvY3VtZW50IiwicmVhZHkiLCJrZXlkb3duIiwiZSIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJlcSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJpbmRleCIsInJlZnJlc2hBbGwiLCJ0b2dnbGVUYWJsZSIsImNvbHVtblNlbGVjdG9yQnV0dG9uIiwiY29sdW1uU2VsZWN0b3JNZW51IiwiYWZ0ZXIiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCIsInRleHQiLCJBamF4RnVuY3Rpb25zIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJMT0dfSU5fRElBTE9HIiwiQ0hBTkdFX0FVVEhfRElBTE9HIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwidmFsIiwiY29uZmlybSIsInRpdGxlIiwidHlwZSIsImljb24iLCJ0aGVtZSIsImVzY2FwZUtleSIsImJhY2tncm91bmREaXNtaXNzIiwiYW5pbWF0ZUZyb21FbGVtZW50IiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwiYWN0aW9uIiwiY3NzIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImNvbnRleHQiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkb25lIiwiY2FuY2VsIiwiZGVsZXRlVG9waWMiLCJkZWxldGUiLCJzdWNjZXNzIiwic2xvd0FuaW1hdGlvbiIsInJlbW92ZSIsImNyZWF0ZUVkaXRUb3BpY0RPTSIsIkRvdE1lbnUiLCJNZW51IiwiYnV0dG9uIiwibWVudSIsImlzVGFibGVEb3RNZW51IiwiRE9UX01FTlUiLCJBQ1RJVkFUT1IiLCJCT1RUT01fTEVGVCIsIkJPVFRPTV9SSUdIVCIsIlRPUF9MRUZUIiwiVE9QX1JJR0hUIiwiVEFCTEVfRE9UX01FTlUiLCJwb3NpdGlvbk1lbnUiLCJidXR0b25SZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwibGVmdCIsInBhcnNlSW50IiwidG9wIiwicmlnaHQiLCJ0b2dnbGUiLCJkb3RNZW51IiwibWVudUlkIiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0IiwiY29udGFpbnMiLCJNYXJrZXIiLCJzZWxlY3RlZFN0dWRlbnQiLCJzZWxlY3RlZFN1cGVydmlzb3IiLCJzdHVkZW50VGFibGUiLCJzdHVkZW50RGF0YVRhYmxlIiwic3VwZXJ2aXNvclRhYmxlIiwic3VwZXJ2aXNvckRhdGFUYWJsZSIsIkFTU0lHTl9NQVJLRVIiLCJzZWxlY3RTdHVkZW50Iiwic3R1ZGVudFJvd0RPTSIsIm1hcmtlciIsInVuc2VsZWN0QWxsIiwic2VsZWN0U3VwZXJ2aXNvciIsInN1cGVydmlzb3JSb3dET00iLCJyZXNldFZpZXciLCJzdHVkZW50TmFtZSIsInN1cGVydmlzb3JOYW1lIiwibWFya2VyTmFtZSIsInByb2plY3QiLCJwcm9qZWN0SWQiLCJzdHVkZW50SWQiLCJtYXJrZXJJZCIsInByb2plY3RfaWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJ2YWx1ZSIsInNldFRpbWVvdXQiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInNlcmlhbGl6ZSIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwic2hhcmVfcHJvamVjdCIsInNob3dOb3RpZmljYXRpb24iLCJsb2NhdGlvbiIsInJlbG9hZCIsInN1Ym1pdEJ1dHRvbiIsImZhZGVPdXQiLCJzdmdDb250YWluZXIiLCJzdmciLCJhamF4VXJsIiwiZHJvcGRvd24iLCJtZWRpdW1BbmltYXRpb24iLCJhamF4RXJyb3IiLCJldmVudCIsInJlcXVlc3QiLCJzZXR0aW5ncyIsInNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7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RUFBWXdMLFNBQVosQ0FBc0IsVUFBVUMsS0FBVixFQUFpQkMsT0FBakIsRUFBMEJDLFFBQTFCLEVBQXFDO0FBQzFELEtBQUd4UCxPQUFPeVAsK0JBQVYsRUFBMEM7QUFDekNkLG1CQUFpQixPQUFqQixFQUEwQix5Q0FBMUI7QUFDQTtBQUNELENBSkQsRSIsImZpbGUiOiJcXGpzXFxtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE1ZTkyYzBlMDQxODJlYjI2OWEzIiwiXHJcbi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4xLiBBSkFYIFNldHVwXHJcbjMuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG40LiBDb21wb25lbnRzXHJcblx0NC4xIE1vYmlsZSBNZW51XHJcblx0NC4yIERpYWxvZyAvIE1vZGFsXHJcblx0NC4zIERhdGEgVGFibGVcclxuXHQ0LjUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG5cdDQuNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcblx0NC43IE1lbnVcclxuNS4gU2Vjb25kIE1hcmtlclxyXG44LiBPdGhlclxyXG45LiBJbml0aWFsaXNlIEV2ZXJ5dGhpbmdcclxuKi9cclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qID09PT09PT09PT09PT09PT1cclxuXHQxLiBBSkFYIFNldHVwXHJcbiAgID09PT09PT09PT09PT09PT0gKi9cclxuJC5hamF4U2V0dXAoe1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpLFxyXG5cdH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQzLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5pZigkKCcuc2hvdy0tc2Nyb2xsLXRvLXRvcCcpLmxlbmd0aCA+IDApe1xyXG5cdCQoJy5tYWluLWNvbnRlbnQnKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgYnV0dG9uLS1hY2NlbnQgc2Nyb2xsLXRvLXRvcFwiPlNjcm9sbCB0byBUb3A8L2J1dHRvbj4nKTtcclxufVxyXG5cclxuLy8gQWNjZXNzaWJpbGl0eVxyXG4kKCcuZHJvcGRvd24nKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcbiQoJy5kcm9wZG93biA+IGJ1dHRvbicpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XHJcbiQoJy5kcm9wZG93biAuZHJvcGRvd24tY29udGVudCBhJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cclxuLy8gTWFrZXMgcHJpbWFyeSB0b3BpYyBmaXJzdFxyXG4kKCcudG9waWNzLWxpc3QnKS5wcmVwZW5kKCQoJy5maXJzdCcpKTtcclxuJCgnLnRvcGljcy1saXN0IC5sb2FkZXInKS5oaWRlKGNvbmZpZy5mYXN0QW5pbWF0aW9uKTtcclxuJCgnLnRvcGljcy1saXN0IGxpJykuZmlyc3QoKS5mYWRlSW4oY29uZmlnLmZhc3RBbmltYXRpb24sIGZ1bmN0aW9uIHNob3dOZXh0KCkge1xyXG5cdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbiwgc2hvd05leHQpO1xyXG59KTtcclxuXHJcbiQoJy5vcmRlci1saXN0LWpzJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0Ly8gc29ydFVub3JkZXJlZExpc3QobGlzdCk7XHJcblxyXG5cdGlmKGxpc3QuaGFzQ2xhc3MoJ2xhc3QtbmFtZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0YWRkTGFzdE5hbWVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdH1cclxuXHJcblx0aWYobGlzdC5oYXNDbGFzcygnYWxwaGEtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdGFkZEFscGhhSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHR9XHJcblxyXG5cdGlmKGxpc3QuaGFzQ2xhc3MoJ3RpdGxlLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRhZGRUaXRsZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT1cclxuXHQ0LiBDb21wb25lbnRzXHJcbiAgID09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09XHJcblx0IDQuMSBNb2JpbGUgTWVudVxyXG4gICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIG1vYmlsZSBtZW51LlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgTW9iaWxlTWVudSA9ICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsZW1lbnQpIHtcclxuXHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdHdpbmRvd1snTW9iaWxlTWVudSddID0gdGhpcztcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0dGhpcy51bmRlcmxheSA9ICQodGhpcy5TZWxlY3RvcnNfLlVOREVSTEFZKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIlRoZXJlIGNhbiBvbmx5IGJlIG9uZSBtb2JpbGUgbWVudS5cIik7XHJcblx0fVxyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnXHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdE1PQklMRV9NRU5VOiAnbmF2Lm1vYmlsZScsXHJcblx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRVTkRFUkxBWTogJy5tb2JpbGUtbmF2LXVuZGVybGF5J1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XHJcblx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIG1vYmlsZU1lbnUgPSB0aGlzO1xyXG5cdHRoaXMuYWN0aXZhdG9yLm9uKCdjbGljaycsIG1vYmlsZU1lbnUub3Blbk1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0dGhpcy51bmRlcmxheS5vbignY2xpY2snLCBtb2JpbGVNZW51LmNsb3NlTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uTU9CSUxFX01FTlUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLm1vYmlsZU1lbnUgPSBuZXcgTW9iaWxlTWVudSh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09XHJcblx0NC4yIERpYWxvZyAvIE1vZGFsXHJcbiAgID09PT09PT09PT09PT09PT09PT09ICovXHJcbnZhciBEaWFsb2cgPSBmdW5jdGlvbiBEaWFsb2coZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5kaWFsb2dOYW1lID0gJChlbGVtZW50KS5kYXRhKCdkaWFsb2cnKTtcclxuXHR0aGlzLnVuZGVybGF5ID0gJCgnLnVuZGVybGF5Jyk7XHJcblx0dGhpcy5oZWFkZXIgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19IRUFERVIpO1xyXG5cdHRoaXMuY29udGVudCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0NPTlRFTlQpO1xyXG5cclxuXHQvLyBSZWdpc3RlciBDb21wb25lbnRcclxuXHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoXCJyZWdpc3RlcmVkXCIpO1xyXG5cclxuXHQvLyBBUklBXHJcblx0dGhpcy5lbGVtZW50LmF0dHIoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xyXG5cdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1sYWJlbGxlZGJ5XCIsIFwiZGlhbG9nLXRpdGxlXCIpO1xyXG5cdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImRpYWxvZy1kZXNjXCIpO1xyXG5cdHRoaXMuaGVhZGVyLmF0dHIoJ3RpdGxlJywgdGhpcy5oZWFkZXIuZmluZCgnI2RpYWxvZy1kZXNjJykuaHRtbCgpKTtcclxuXHJcblx0dGhpcy5jb250ZW50LmJlZm9yZSh0aGlzLkh0bWxTbmlwcGV0c18uTE9BREVSKTtcclxuXHR0aGlzLmxvYWRlciA9ICQoZWxlbWVudCkuZmluZChcIi5sb2FkZXJcIik7XHJcblx0dGhpcy5pc0Nsb3NhYmxlID0gdHJ1ZTtcclxuXHR0aGlzLmFjdGl2YXRvckJ1dHRvbnMgPSBbXTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0QUNUSVZFOiAnYWN0aXZlJyxcclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0RElBTE9HX0NPTlRFTlQ6ICcuY29udGVudCcsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLnNob3coMCk7XHJcblx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0d2luZG93WydEaWFsb2cnXSA9IHRoaXM7XHJcblx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmhpZGVEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0fVxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHR2YXIgZGlhbG9nID0gdGhpcztcclxuXHJcblx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykuZGF0YSgnYWN0aXZhdG9yJykgJiYgJCh0aGlzKS5kYXRhKCdkaWFsb2cnKSA9PSBkaWFsb2cuZGlhbG9nTmFtZSl7XHJcblx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIEFSSUFcclxuXHRkaWFsb2cuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cclxuXHRkaWFsb2cudW5kZXJsYXkub24oJ2NsaWNrJywgZGlhbG9nLmhpZGVEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHJcblx0dHJ5e1xyXG5cdFx0JChkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBkaWFsb2cuc2hvd0RpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cdFx0fSk7XHJcblx0fSBjYXRjaChlcnIpe1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIkRpYWxvZyBcIiArIGRpYWxvZy5kaWFsb2dOYW1lICsgXCIgaGFzIG5vIGFjdGl2YXRvciBidXR0b24uXCIpO1xyXG5cdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdH1cclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uRElBTE9HKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5kaWFsb2cgPSBuZXcgRGlhbG9nKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0JCh0aGlzKS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ0RpYWxvZyddICE9IG51bGwpIHtcclxuXHRcdFx0d2luZG93WydEaWFsb2cnXS5oaWRlRGlhbG9nKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZS5rZXlDb2RlID09IDI3ICYmIHdpbmRvd1snTW9iaWxlTWVudSddICE9IG51bGwpIHtcclxuXHRcdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PVxyXG5cdDQuMyBEYXRhIFRhYmxlXHJcbiAgID09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdHRoaXMuZm9vdFJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rmb290IHRyJyk7XHJcblx0dGhpcy5yb3dzID0gJC5tZXJnZSh0aGlzLmJvZHlSb3dzLCB0aGlzLmZvb3RSb3dzKTtcclxuXHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHR0aGlzLm1hc3RlckNoZWNrYm94ID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5NQVNURVJfQ0hFQ0tCT1gpO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydEYXRhVGFibGUnXSA9IERhdGFUYWJsZTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0REFUQV9UQUJMRTogJy5kYXRhLXRhYmxlJyxcclxuXHRNQVNURVJfQ0hFQ0tCT1g6ICd0aGVhZCAubWFzdGVyLWNoZWNrYm94JyxcclxuXHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0SVNfU0VMRUNURUQ6ICcuaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRzZWxlY3RBbGxSb3dzOiBmdW5jdGlvbigpIHtcclxuXHRcdGlmKHRoaXMubWFzdGVyQ2hlY2tib3guaXMoJzpjaGVja2VkJykpe1xyXG5cdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdHRoaXMuY2hlY2tib3hlcy5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdHRoaXMuY2hlY2tib3hlcy5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2VsZWN0Um93OiBmdW5jdGlvbiAoY2hlY2tib3gsIHJvdykge1xyXG5cdFx0aWYgKHJvdykge1xyXG5cdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRyb3cuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBkYXRhVGFibGUgPSB0aGlzO1xyXG5cdHRoaXMubWFzdGVyQ2hlY2tib3gub24oJ2NoYW5nZScsICQucHJveHkodGhpcy5mdW5jdGlvbnMuc2VsZWN0QWxsUm93cywgZGF0YVRhYmxlKSk7XHJcblxyXG5cdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdCQodGhpcykub24oJ2NoYW5nZScsICQucHJveHkoZGF0YVRhYmxlLmZ1bmN0aW9ucy5zZWxlY3RSb3csIHRoaXMsICQodGhpcyksIGRhdGFUYWJsZS5ib2R5Um93cy5lcShpKSkpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLkRBVEFfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09XHJcblx0NC4zIENvbHVtbiBUb2dnbGUgVGFibGVcclxuICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG4qXHJcbiogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBDb2x1bW5Ub2dnbGVUYWJsZSA9IGZ1bmN0aW9uIENvbHVtblRvZ2dsZVRhYmxlKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMuaGVhZCA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHInKTtcclxuXHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHR0aGlzLnNlbGVjdG9yTWVudSA9IG51bGw7XHJcblx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IG51bGw7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG53aW5kb3dbJ0NvbHVtblRvZ2dsZVRhYmxlJ10gPSBDb2x1bW5Ub2dnbGVUYWJsZTtcclxuXHJcbkNvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxufTtcclxuXHJcbkNvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFRPR0dMRV9UQUJMRTogJy50YWJsZS1jb2x1bW4tdG9nZ2xlJ1xyXG59O1xyXG5cclxuQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0Q09MVU1OX1NFTEVDVE9SX0JVVFRPTjogJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgZG90LW1lbnVfX2FjdGl2YXRvclwiIHN0eWxlPVwiZGlzcGxheTpibG9jazttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWxlZnQ6YXV0bztcIj5Db2x1bW5zPC9idXR0b24+JyxcclxuXHRDT0xVTU5fU0VMRUNUT1JfTUVOVTogJzx1bCBjbGFzcz1cImRvdC1tZW51IGRvdC1tZW51LS1ib3R0b20tbGVmdFwiPjwvdWw+J1xyXG59O1xyXG5cclxuQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHJcblx0dG9nZ2xlQ29sdW1uOiBmdW5jdGlvbihjb2x1bW5JbmRleCwgdGFibGUsIGNoZWNrZWQpIHtcclxuXHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG5cdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuYXR0cignaGlkZGVuJywgXCJ0cnVlXCIpO1xyXG5cdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRyZWZyZXNoOiBmdW5jdGlvbih0YWJsZSkge1xyXG5cdFx0dGFibGUuYm9keVJvd3MgPSB0YWJsZS5lbGVtZW50LmZpbmQoJ3Rib2R5IHRyJyk7XHJcblxyXG5cdFx0dmFyIGhpZGVJbmRpY2VzID0gW107XHJcblxyXG5cdFx0dGFibGUuaGVhZGVycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCQodGhpcykuYXR0cignaGlkZGVuJykpe1xyXG5cdFx0XHRcdGhpZGVJbmRpY2VzLnB1c2goJCh0aGlzKS5pbmRleCgpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZGVJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGhpZGVJbmRpY2VzW2ldKS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHJlZnJlc2hBbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0JChDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMucmVmcmVzaCh0aGlzLkNvbHVtblRvZ2dsZVRhYmxlKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcbn07XHJcblxyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0aWYoIXRoaXMuZWxlbWVudC5hdHRyKCdpZCcpKXtcclxuXHRcdGNvbnNvbGUubG9nKFwiQ29sdW1uVG9nZ2xlVGFibGUgcmVxdWlyZXMgdGhlIHRhYmxlIHRvIGhhdmUgYW4gdW5pcXVlIElELlwiKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHZhciB0b2dnbGVUYWJsZSA9IHRoaXM7XHJcblx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX0JVVFRPTik7XHJcblx0dmFyIGNvbHVtblNlbGVjdG9yTWVudSA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9NRU5VKTtcclxuXHJcblx0dGhpcy5lbGVtZW50LmJlZm9yZShjb2x1bW5TZWxlY3RvckJ1dHRvbik7XHJcblx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYWZ0ZXIoY29sdW1uU2VsZWN0b3JNZW51KTtcclxuXHJcblx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkID0gJ0NvbHVtblRvZ2dsZVRhYmxlLScgKyB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJyk7XHJcblx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCk7XHJcblx0Y29sdW1uU2VsZWN0b3JNZW51LmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgKyAnLW1lbnUnKTtcclxuXHJcblx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IGNvbHVtblNlbGVjdG9yQnV0dG9uO1xyXG5cdHRoaXMuc2VsZWN0b3JNZW51ID0gY29sdW1uU2VsZWN0b3JNZW51O1xyXG5cclxuXHR0aGlzLnNlbGVjdG9yTWVudS5maW5kKCd1bCcpLmRhdGEoXCJ0YWJsZVwiLCB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJykpO1xyXG5cclxuXHR0aGlzLmhlYWRlcnMuZWFjaChmdW5jdGlvbiAoKXtcclxuXHRcdHZhciBjaGVja2VkID0gJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSA/IFwiY2hlY2tlZFwiIDogXCJcIjtcclxuXHRcdCQodGhpcykuZGF0YSgndmlzaWJsZScsICQodGhpcykuZGF0YShcImRlZmF1bHRcIikpO1xyXG5cclxuXHRcdGNvbHVtblNlbGVjdG9yTWVudS5hcHBlbmQoJ1xcXHJcblx0XHRcdDxsaSBjbGFzcz1cImRvdC1tZW51X19pdGVtIGRvdC1tZW51X19pdGVtLS1wYWRkZWRcIj4gXFxcclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4gXFxcclxuXHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNvbHVtbi10b2dnbGVcIiBpZD1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCIgdHlwZT1cImNoZWNrYm94XCIgJysgY2hlY2tlZCArJz4gXFxcclxuXHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiPicgKyAkKHRoaXMpLnRleHQoKSArICc8L2xhYmVsPiBcXFxyXG5cdFx0XHRcdDwvZGl2PiBcXFxyXG5cdFx0XHQ8L2xpPicpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuY29sdW1uLXRvZ2dsZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGluZGV4ID0gJCgnLmNvbHVtbi10b2dnbGUnKS5pbmRleCh0aGlzKTtcclxuXHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMudG9nZ2xlQ29sdW1uKGluZGV4LCB0b2dnbGVUYWJsZSwgJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpO1xyXG5cdH0pO1xyXG5cclxufTtcclxuXHJcbkNvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUgPSBuZXcgQ29sdW1uVG9nZ2xlVGFibGUodGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG4qXHJcbiogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBBamF4RnVuY3Rpb25zID0gIGZ1bmN0aW9uIEFqYXhGdW5jdGlvbnMoKSB7fTtcclxud2luZG93WydBamF4RnVuY3Rpb25zJ10gPSBBamF4RnVuY3Rpb25zO1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFNFQVJDSF9JTlBVVDogJy5zZWFyY2gtaW5wdXQnLFxyXG5cdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0U0VBUkNIX0ZJTFRFUl9DT05UQUlORVI6ICcuc2VhcmNoLWZpbHRlci1jb250YWluZXInLFxyXG5cdFNFQVJDSF9GSUxURVJfQlVUVE9OOiAnI3NlYXJjaC1maWx0ZXItYnV0dG9uJyxcclxuXHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0Q0hBTkdFX0FVVEhfRElBTE9HOiAnLmNoYW5nZS1hdXRoLmRpYWxvZydcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLktleXNfID0ge1xyXG5cdFNQQUNFOiAzMixcclxuXHRFTlRFUjogMTMsXHJcblx0Q09NTUE6IDQ1XHJcbn07XHJcblxyXG4vLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1cycsICBmdW5jdGlvbihlKXtcclxuXHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxufSk7XHJcblxyXG4vLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzIG91dFxyXG4kKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LTJkcCcpO1xyXG59KTtcclxuXHJcbi8vIFNFQVJDSFxyXG4kKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9CVVRUT04pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdHZhciBmaWx0ZXJCdXR0b24gPSAkKHRoaXMpO1xyXG5cclxuXHRpZihjb250YWluZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRmaWx0ZXJCdXR0b24ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0ZmlsdGVyQnV0dG9uLmJsdXIoKTtcclxuXHR9IGVsc2V7XHJcblx0XHRjb250YWluZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0ZmlsdGVyQnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDQuNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG4qXHJcbiogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5vcmlnaW5hbE5hbWUgPSAkKGVsZW1lbnQpLmRhdGEoXCJvcmlnaW5hbC10b3BpYy1uYW1lXCIpO1xyXG5cdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHR0aGlzLnRvcGljTmFtZUlucHV0ID0gJChlbGVtZW50KS5maW5kKCdpbnB1dCcpO1xyXG5cdHRoaXMuZWRpdEJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmVkaXQtdG9waWMnKTtcclxuXHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7fTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRFRElUX1RPUElDOiAnLmVkaXQtdG9waWMtbGlzdCAudG9waWMnLFxyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRERUxFVEVfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0TkVXX1RPUElDOiAnL3RvcGljcy8nXHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRlZGl0VG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdGlmKHRvcGljLm9yaWdpbmFsTmFtZSA9PSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnQ2hhbmdlIFRvcGljIE5hbWUnLFxyXG5cdFx0XHR0eXBlOiAnYmx1ZScsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gPGI+XCInICsgIHRvcGljLm9yaWdpbmFsTmFtZSArICdcIjwvYj4gdG8gPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsnXCI8L2I+PycsXHJcblx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRjb25maXJtOiB7XHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ibHVlJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCB0b3BpYy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWNfbmFtZSA6IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLm9yaWdpbmFsTmFtZSA9IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNhbmNlbDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0YmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRkZWxldGVUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0JC5jb25maXJtKHtcclxuXHRcdFx0dGl0bGU6ICdEZWxldGUnLFxyXG5cdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsgJ1wiPC9iPj8nLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0ZGVsZXRlOiB7XHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMuZWxlbWVudC5oaWRlKGNvbmZpZy5zbG93QW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWMucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlRWRpdFRvcGljRE9NOiBmdW5jdGlvbih0b3BpY0lkLCBvcmlnaW5hbE5hbWUpe1xyXG5cdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0fVxyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBlZGl0VG9waWMgPSB0aGlzO1xyXG5cdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuRWRpdFRvcGljID0gbmV3IEVkaXRUb3BpYyh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjcgRG90TWVudVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgRG90TWVudSA9IGZ1bmN0aW9uIE1lbnUoZWxlbWVudCkge1xyXG5cdHRoaXMuYnV0dG9uID0gJChlbGVtZW50KTtcclxuXHR0aGlzLm1lbnUgPSBudWxsO1xyXG5cdHRoaXMuaXNUYWJsZURvdE1lbnUgPSBmYWxzZTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RE9UX01FTlU6ICcuZG90LW1lbnUnLFxyXG5cdEFDVElWQVRPUjogJy5kb3QtbWVudV9fYWN0aXZhdG9yJyxcclxuXHRJU19WSVNJQkxFOiAnLmlzLXZpc2libGUnLFxyXG59O1xyXG5cclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJyxcclxuXHRCT1RUT01fTEVGVDogJ2RvdC1tZW51LS1ib3R0b20tbGVmdCcsXHJcblx0Qk9UVE9NX1JJR0hUOiAnZG90LW1lbnUtLWJvdHRvbS1yaWdodCcsXHJcblx0VE9QX0xFRlQ6ICdkb3QtbWVudS0tdG9wLWxlZnQnLFxyXG5cdFRPUF9SSUdIVDogJ2RvdC1tZW51LS10b3AtcmlnaHQnLFxyXG5cdFRBQkxFX0RPVF9NRU5VOiAnZG90LW1lbnUtLXRhYmxlJ1xyXG59O1xyXG5cclxuRG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgYnV0dG9uUmVjdCA9IHRoaXMuYnV0dG9uWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCkpe1xyXG5cdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIHJpZ2h0Jyk7XHJcblx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9SSUdIVCkpe1xyXG5cdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCBsZWZ0Jyk7XHJcblx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9MRUZUKSl7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5yaWdodCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAnYm90dG9tIHJpZ2h0Jyk7XHJcblx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9SSUdIVCkpe1xyXG5cdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSBsZWZ0Jyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wJyk7XHJcblx0fVxyXG59XHJcblxyXG5Eb3RNZW51LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuXHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZCh0aGlzKSgpO1xyXG5cdHRoaXMubWVudS5hZGRDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR0aGlzLm1lbnUuc2hvdygpO1xyXG59XHJcblxyXG5Eb3RNZW51LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLm1lbnUucmVtb3ZlQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0dGhpcy5tZW51LmhpZGUoKTtcclxufVxyXG5cclxuRG90TWVudS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKHRoaXMpKCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLnNob3cuYmluZCh0aGlzKSgpO1xyXG5cdH1cclxufVxyXG5cclxuRG90TWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgZG90TWVudSA9IHRoaXM7XHJcblx0dmFyIG1lbnVJZCA9ICQodGhpcy5idXR0b24pLmF0dHIoJ2lkJykgKyAnLW1lbnUnO1xyXG5cclxuXHR0aGlzLm1lbnUgPSAkKCcjJyArIG1lbnVJZCk7XHJcblx0dGhpcy5pc1RhYmxlRG90TWVudSA9IHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5UQUJMRV9ET1RfTUVOVSk7XHJcblxyXG5cdHRoaXMuYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHREb3RNZW51LnByb3RvdHlwZS50b2dnbGUuYmluZChkb3RNZW51KSgpO1xyXG5cdH0pO1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYoIXRhcmdldC5pcyhkb3RNZW51Lm1lbnUpIHx8ICF0YXJnZXQuaXMoZG90TWVudS5idXR0b24pKSB7XHJcblx0XHRcdGlmKCEkLmNvbnRhaW5zKCQoZG90TWVudS5tZW51KVswXSwgZS50YXJnZXQpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuRG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLkFDVElWQVRPUikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuRG90TWVudSA9IG5ldyBEb3RNZW51KHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09XHJcblx0NS4gU2Vjb25kIE1hcmtlclxyXG4gICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbnZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbk1hcmtlci5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxufTtcclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCA9IGZ1bmN0aW9uKHN0dWRlbnRSb3dET00sIG1hcmtlcil7XHJcblx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdG1hcmtlci51bnNlbGVjdEFsbChtYXJrZXIpO1xyXG5cdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHRoaXMpLmRhdGEoJ21hcmtlci1pZCcpID09IHJvdy5kYXRhKCdzdXBlcnZpc29yLWlkJykpe1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdHZhciByb3cgPSAkKHN1cGVydmlzb3JSb3dET00pO1xyXG5cclxuXHRpZihyb3cuYXR0cignZGlzYWJsZWQnKSl7cmV0dXJuO31cclxuXHJcblx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IHJvdztcclxuXHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LW5hbWUnKSxcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdXBlcnZpc29yLW5hbWUnKSxcclxuXHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpKTtcclxuXHR9XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUucmVzZXRWaWV3ID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0JChcIiNzdHVkZW50LW5hbWVcIikudGV4dChzdHVkZW50TmFtZSk7XHJcblx0JChcIiNzdXBlcnZpc29yLW5hbWVcIikudGV4dChzdXBlcnZpc29yTmFtZSk7XHJcblx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHQkKFwiI3Byb2plY3QtdGl0bGVcIikuaHRtbCgnPGI+VGl0bGU6IDwvYj4nICsgcHJvamVjdFsndGl0bGUnXSk7XHJcblx0JChcIiNwcm9qZWN0LWRlc2NyaXB0aW9uXCIpLmh0bWwoJzxiPkRlc2NyaXB0aW9uOiA8L2I+JyArIHByb2plY3RbJ2Rlc2NyaXB0aW9uJ10pO1xyXG5cclxuXHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxufVxyXG5cclxuJCgnI3N1Ym1pdEFzc2lnbk1hcmtlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0dmFyIG1hcmtlciA9IHdpbmRvd1snTWFya2VyJ107XHJcblxyXG5cdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPT0gbnVsbCB8fCBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID09IG51bGwpe1xyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRyZXR1cm47XHJcblx0fTtcclxuXHJcblx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdHZhciBwcm9qZWN0SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKVsnaWQnXTtcclxuXHR2YXIgc3R1ZGVudElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LWlkJyk7XHJcblx0dmFyIG1hcmtlcklkID0gbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvci5kYXRhKCdtYXJrZXItaWQnKTtcclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHR5cGU6IFwiUEFUQ0hcIixcclxuXHRcdHVybDogbWFya2VyLlVybHNfLkFTU0lHTl9NQVJLRVIsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZCxcclxuXHRcdFx0c3R1ZGVudF9pZDogc3R1ZGVudElkLFxyXG5cdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcblx0XHR9LFxyXG5cdFx0Ly8gQWRkIGZhaWxcclxuXHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQucmVtb3ZlKCk7XHJcblx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuTWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbWFya2VyID0gdGhpcztcclxuXHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxuXHJcblx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTtcclxuXHR9KTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHR3aW5kb3dbJ01hcmtlciddID0gbmV3IE1hcmtlcigpO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0IDguIE9USEVSXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblxyXG4kKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5lbWFpbC10YWJsZSAuY2hlY2tib3ggaW5wdXRcIiwgZnVuY3Rpb24oKSB7XHJcblx0dmFyIHNlbGVjdCA9IGZ1bmN0aW9uKGRvbSl7XHJcblx0XHR2YXIgc3RhdHVzID0gZG9tLnBhcmVudHMoKS5lcSg0KS5kYXRhKCdzdGF0dXMnKTtcclxuXHRcdHZhciBlbWFpbFN0cmluZyA9IFwibWFpbHRvOlwiO1xyXG5cdFx0dmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmVtYWlsLXRhYmxlLicgKyBzdGF0dXMgKyAnIC5jaGVja2JveCBpbnB1dCc7XHJcblx0XHR2YXIgZW1haWxCdXR0b25zZWxlY3RvciA9IFwiLmVtYWlsLXNlbGVjdGVkLlwiICsgc3RhdHVzO1xyXG5cclxuXHRcdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdFx0aWYoJCh2YWx1ZSkuaXMoXCI6Y2hlY2tlZFwiKSAmJiAhJCh2YWx1ZSkuaGFzQ2xhc3MoXCJtYXN0ZXItY2hlY2tib3hcIikpIHtcclxuXHRcdFx0XHRlbWFpbFN0cmluZyArPSAkKHZhbHVlKS5kYXRhKCdlbWFpbCcpO1xyXG5cdFx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxuXHR9O1xyXG5cdHNldFRpbWVvdXQoMjAwMCwgc2VsZWN0KCQodGhpcykpKTtcclxufSk7XHJcblxyXG4kKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmVtYWlsLXNlbGVjdGVkXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRpZigkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gJ21haWx0bzonIHx8ICQodGhpcykucHJvcCgnaHJlZicpID09PSBudWxsKXtcclxuXHRcdGFsZXJ0KFwiWW91IGhhdmVuJ3Qgc2VsZWN0ZWQgYW55b25lLlwiKTtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcbiQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuZXh0ZXJuYWwtbGlua1wiLCAgZnVuY3Rpb24oZSkge1xyXG5cdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHZhciBlbGVtVG9IaWRlU2VsZWN0b3IgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1oaWRlLXNlbGVjdG9yJykpO1xyXG5cdHZhciBlbGVtVG9SZXBsYWNlID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8tcmVwbGFjZS13aXRoLWxvYWRlci1zZWxlY3RvcicpKTtcclxuXHJcblx0ZWxlbVRvSGlkZVNlbGVjdG9yLmhpZGUoKTtcclxuXHRlbGVtVG9SZXBsYWNlLmhpZGUoKTtcclxuXHRlbGVtVG9SZXBsYWNlLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudC1yZXBsYWNlZC1jb250YWluZXJcIiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHJcblx0JCgnI2NvbnRlbnQtcmVwbGFjZWQtY29udGFpbmVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0pO1xyXG5cclxuLy8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcbiQoXCIjc2hhcmUtcHJvamVjdC1mb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcblx0XHRcdGlmKHJlc3BvbnNlLnNoYXJlX3Byb2plY3Qpe1xyXG5cdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJ3N1Y2Nlc3MnLCAnWW91ciBuYW1lIGlzIGJlaW5nIHNoYXJlZCB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJycsICdZb3UgYXJlIG5vIGxvbmdlciBzaGFyaW5nIHlvdXIgbmFtZSB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQoJyNzaGFyZV9wcm9qZWN0JykucHJvcCgnY2hlY2tlZCcsIHJlc3BvbnNlLnNoYXJlX3Byb2plY3QpO1xyXG5cdFx0fSxcclxuXHR9KTtcclxufSk7XHJcblxyXG4kKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQT1NUJyxcclxuXHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRzdWNjZXNzOmZ1bmN0aW9uKHNob3dEaWFsb2cpe1xyXG5cdFx0XHRpZihzaG93RGlhbG9nID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkNIQU5HRV9BVVRIX0RJQUxPRylbMF0uZGlhbG9nLmlzQ2xvc2FibGUgPSBmYWxzZTtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uQ0hBTkdFX0FVVEhfRElBTE9HKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblxyXG5cdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykudGV4dChkYXRhW1wicmVzcG9uc2VKU09OXCJdW1wiZXJyb3JzXCJdW1widXNlcm5hbWVcIl1bMF0pO1xyXG5cdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuc2hvdygpO1xyXG5cdFx0XHQkKCcuZm9ybS1maWVsZCcsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuYWRkQ2xhc3MoXCJoYXMtZXJyb3JcIik7XHJcblx0XHR9XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJCgnI25ldy10b3BpYy1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0dmFyIHN1Ym1pdEJ1dHRvbiA9ICQodGhpcykuZmluZCgnOnN1Ym1pdCcpO1xyXG5cdHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0JCgnLmxvYWRlcicsIHN1Ym1pdEJ1dHRvbikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHR0eXBlOidQT1NUJyxcclxuXHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zLmNyZWF0ZUVkaXRUb3BpY0RPTShkYXRhW1wiaWRcIl0sIGRhdGFbXCJuYW1lXCJdKTtcclxuXHRcdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAoKSB7fVxyXG5cdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuLy8gVXNlZCBmb3IgdHJhbnNhY3Rpb25zXHJcbiQoJyNzaG93LXJhdy10YWJsZS1kYXRhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0aWYoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpe1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLmNzcygnd2lkdGgnLCAkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmNzcygnd2lkdGgnKSk7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XHJcblxyXG5cdFx0JCgndGFibGUuZnVsbC1kZXRhaWwnKS5mYWRlT3V0KGNvbmZpZy5mYXN0QW5pbWF0aW9uKTtcclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5mYWRlSW4oY29uZmlnLmZhc3RBbmltYXRpb24sIGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuY3NzKCd3aWR0aCcsICQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5jc3MoJ3dpZHRoJykpO1xyXG5cdFx0JCgndGFibGUuZnVsbC1kZXRhaWwnKS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xyXG5cclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5mYWRlT3V0KGNvbmZpZy5mYXN0QW5pbWF0aW9uKTtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuZmFkZUluKGNvbmZpZy5mYXN0QW5pbWF0aW9uLCBmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBORVcgVVNFUlxyXG4vLyBwdXQgdGhpcyBzdHVmZiBpbiBhbiBhcnJheVxyXG4kKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRpZigkKCcjc3R1ZGVudC1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNhZG1pbi1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyBTVFJJTkdTXHJcbiQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG4kKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG4kKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdGlmKCQoJyNzdHVkZW50LW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3R1ZGVudC1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI2FkbWluLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG59KTtcclxuXHJcbiQoXCIuZmF2b3VyaXRlLWNvbnRhaW5lclwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgc3ZnQ29udGFpbmVyID0gJCh0aGlzKTtcclxuXHR2YXIgc3ZnID0gc3ZnQ29udGFpbmVyLmZpbmQoJ3N2ZycpO1xyXG5cdHZhciBwcm9qZWN0SWQgPSB3aW5kb3dbJ3Byb2plY3QnXS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblxyXG5cdHN2Zy5oaWRlKDApO1xyXG5cdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLnNob3coMCk7XHJcblxyXG5cdGlmKHN2Zy5oYXNDbGFzcygnZmF2b3VyaXRlJykpe1xyXG5cdFx0dmFyIGFjdGlvbiA9ICdyZW1vdmUnO1xyXG5cdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL3JlbW92ZS1mYXZvdXJpdGUnO1xyXG5cclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGFjdGlvbiA9ICdhZGQnO1xyXG5cdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL2FkZC1mYXZvdXJpdGUnO1xyXG5cdH1cclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogYWpheFVybCxcclxuXHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczpmdW5jdGlvbigpe1xyXG5cdFx0XHRpZihhY3Rpb24gPT0gXCJhZGRcIil7XHJcblx0XHRcdFx0c3ZnLmFkZENsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzdmcucmVtb3ZlQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdHN2Zy5mYWRlSW4oY29uZmlnLmZhc3RBbmltYXRpb24pO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuaGlkZSgwKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4kKCduYXYubW9iaWxlIC5zdWItZHJvcGRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdHZhciBkcm9wZG93biA9ICQodGhpcyk7XHJcblx0dmFyIGNvbnRlbnQgPSBkcm9wZG93bi5maW5kKCcuZHJvcGRvd24tY29udGVudCcpO1xyXG5cclxuXHRpZihkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiKSA9PSBcInRydWVcIil7XHJcblx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBmYWxzZSk7XHJcblx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcclxuXHJcblx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMGRlZylcIik7XHJcblx0XHRkcm9wZG93bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdGNvbnRlbnQuaGlkZShjb25maWcubWVkaXVtQW5pbWF0aW9uKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgdHJ1ZSk7XHJcblx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBmYWxzZSk7XHJcblxyXG5cdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDE4MGRlZylcIik7XHJcblx0XHRkcm9wZG93bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdGNvbnRlbnQuc2hvdyhjb25maWcubWVkaXVtQW5pbWF0aW9uKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09XHJcblx0OS4gSW5pdGlhbGlzZVxyXG4gICA9PT09PT09PT09PT09PT0gKi9cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5EaWFsb2cucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkNvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5NYXJrZXIucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cclxuaWYoJCgnLnByb2plY3QtY2FyZCcpLmxlbmd0aCA+IDApe1xyXG5cdHdpbmRvd1sncHJvamVjdCddID0gJCgnLnByb2plY3QtY2FyZCcpO1xyXG59XHJcblxyXG4vLyBFTkQgT0YgRE9DIFJFQURZIEZJTEVcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5hamF4RXJyb3IoZnVuY3Rpb24oIGV2ZW50LCByZXF1ZXN0LCBzZXR0aW5ncyApIHtcclxuXHRpZihjb25maWcuc2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbil7XHJcblx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoYXQgcmVxdWVzdC4nKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==