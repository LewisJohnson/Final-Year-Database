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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWM1NDZjMTU5ZWY3MGNmNTNmNjYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImxlbmd0aCIsImFwcGVuZCIsInByZXBlbmQiLCJoaWRlIiwiY29uZmlnIiwiZmFzdEFuaW1hdGlvbiIsImZpcnN0IiwiZmFkZUluIiwic2hvd05leHQiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIk1vYmlsZU1lbnUiLCJlbGVtZW50Iiwid2luZG93IiwiYWN0aXZhdG9yIiwiU2VsZWN0b3JzXyIsIkhBTUJVUkdFUl9DT05UQUlORVIiLCJ1bmRlcmxheSIsIlVOREVSTEFZIiwiaW5pdCIsImxvZyIsInByb3RvdHlwZSIsIkNzc0NsYXNzZXNfIiwiSVNfVklTSUJMRSIsIk1PQklMRV9NRU5VIiwib3Blbk1lbnUiLCJhZGRDbGFzcyIsImNsb3NlTWVudSIsInJlbW92ZUNsYXNzIiwibW9iaWxlTWVudSIsIm9uIiwiYmluZCIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiZGF0YSIsImhlYWRlciIsImZpbmQiLCJESUFMT0dfSEVBREVSIiwiY29udGVudCIsIkRJQUxPR19DT05URU5UIiwiaHRtbCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dMb2FkZXIiLCJzaG93IiwiaGlkZUxvYWRlciIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwiZGlhbG9nIiwicHVzaCIsImVyciIsImRvY3VtZW50IiwicmVhZHkiLCJrZXlkb3duIiwiZSIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJmdW5jdGlvbnMiLCJzZWxlY3RBbGxSb3dzIiwiaXMiLCJwcm9wIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJlcSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJpbmRleCIsInJlZnJlc2hBbGwiLCJ0b2dnbGVUYWJsZSIsImNvbHVtblNlbGVjdG9yQnV0dG9uIiwiY29sdW1uU2VsZWN0b3JNZW51IiwiY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQiLCJhZnRlciIsInRleHQiLCJBamF4RnVuY3Rpb25zIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJMT0dfSU5fRElBTE9HIiwiQ0hBTkdFX0FVVEhfRElBTE9HIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIkVkaXRUb3BpYyIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwidmFsIiwiY29uZmlybSIsInRpdGxlIiwidHlwZSIsImljb24iLCJ0aGVtZSIsImVzY2FwZUtleSIsImJhY2tncm91bmREaXNtaXNzIiwiYW5pbWF0ZUZyb21FbGVtZW50IiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwiYWN0aW9uIiwiY3NzIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImNvbnRleHQiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkb25lIiwiY2FuY2VsIiwiZGVsZXRlVG9waWMiLCJkZWxldGUiLCJzdWNjZXNzIiwic2xvd0FuaW1hdGlvbiIsInJlbW92ZSIsImNyZWF0ZUVkaXRUb3BpY0RPTSIsIkRvdE1lbnUiLCJNZW51IiwiYnV0dG9uIiwibWVudSIsImlzVGFibGVEb3RNZW51IiwiRE9UX01FTlUiLCJBQ1RJVkFUT1IiLCJCT1RUT01fTEVGVCIsIkJPVFRPTV9SSUdIVCIsIlRPUF9MRUZUIiwiVE9QX1JJR0hUIiwiVEFCTEVfRE9UX01FTlUiLCJwb3NpdGlvbk1lbnUiLCJidXR0b25SZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwibGVmdCIsInBhcnNlSW50IiwidG9wIiwicmlnaHQiLCJ0b2dnbGUiLCJkb3RNZW51IiwibWVudUlkIiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0IiwiY29udGFpbnMiLCJNYXJrZXIiLCJzZWxlY3RlZFN0dWRlbnQiLCJzZWxlY3RlZFN1cGVydmlzb3IiLCJzdHVkZW50VGFibGUiLCJzdHVkZW50RGF0YVRhYmxlIiwic3VwZXJ2aXNvclRhYmxlIiwic3VwZXJ2aXNvckRhdGFUYWJsZSIsIkFTU0lHTl9NQVJLRVIiLCJzZWxlY3RTdHVkZW50Iiwic3R1ZGVudFJvd0RPTSIsIm1hcmtlciIsInVuc2VsZWN0QWxsIiwic2VsZWN0U3VwZXJ2aXNvciIsInN1cGVydmlzb3JSb3dET00iLCJyZXNldFZpZXciLCJzdHVkZW50TmFtZSIsInN1cGVydmlzb3JOYW1lIiwibWFya2VyTmFtZSIsInByb2plY3QiLCJwcm9qZWN0SWQiLCJzdHVkZW50SWQiLCJtYXJrZXJJZCIsInByb2plY3RfaWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJ2YWx1ZSIsInNldFRpbWVvdXQiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInNlcmlhbGl6ZSIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwic2hhcmVfcHJvamVjdCIsInNob3dOb3RpZmljYXRpb24iLCJsb2NhdGlvbiIsInJlbG9hZCIsInN1Ym1pdEJ1dHRvbiIsInN2Z0NvbnRhaW5lciIsInN2ZyIsImFqYXhVcmwiLCJkcm9wZG93biIsIm1lZGl1bUFuaW1hdGlvbiIsImFqYXhFcnJvciIsImV2ZW50IiwicmVxdWVzdCIsInNldHRpbmdzIiwic2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNB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eUNBQTFCO0FBQ0E7QUFDRCxDQUpELEUiLCJmaWxlIjoiXFxqc1xcbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhYzU0NmMxNTllZjcwY2Y1M2Y2NiIsIlxyXG4vKiBGSUxFIFNUUlVDVFVSRVxyXG5cclxuMS4gQUpBWCBTZXR1cFxyXG4zLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuNC4gQ29tcG9uZW50c1xyXG5cdDQuMSBNb2JpbGUgTWVudVxyXG5cdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG5cdDQuMyBEYXRhIFRhYmxlXHJcblx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQ0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdDQuNyBNZW51XHJcbjUuIFNlY29uZCBNYXJrZXJcclxuOC4gT3RoZXJcclxuOS4gSW5pdGlhbGlzZSBFdmVyeXRoaW5nXHJcbiovXHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09XHJcblx0XHQxLiBBSkFYIFNldHVwXHJcblx0ICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cdCQuYWpheFNldHVwKHtcclxuXHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0J1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JyksXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0My4gSFRNTCBNb2RpZmljYXRpb25zXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdGlmKCQoJy5zaG93LS1zY3JvbGwtdG8tdG9wJykubGVuZ3RoID4gMCl7XHJcblx0XHQkKCcubWFpbi1jb250ZW50JykuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGJ1dHRvbi0tYWNjZW50IHNjcm9sbC10by10b3BcIj5TY3JvbGwgdG8gVG9wPC9idXR0b24+Jyk7XHJcblx0fVxyXG5cclxuXHQvLyBBY2Nlc3NpYmlsaXR5XHJcblx0JCgnLmRyb3Bkb3duJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cdCQoJy5kcm9wZG93biA+IGJ1dHRvbicpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XHJcblx0JCgnLmRyb3Bkb3duIC5kcm9wZG93bi1jb250ZW50IGEnKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblxyXG5cdC8vIE1ha2VzIHByaW1hcnkgdG9waWMgZmlyc3RcclxuXHQkKCcudG9waWNzLWxpc3QnKS5wcmVwZW5kKCQoJy5maXJzdCcpKTtcclxuXHQkKCcudG9waWNzLWxpc3QgLmxvYWRlcicpLmhpZGUoY29uZmlnLmZhc3RBbmltYXRpb24pO1xyXG5cdCQoJy50b3BpY3MtbGlzdCBsaScpLmZpcnN0KCkuZmFkZUluKGNvbmZpZy5mYXN0QW5pbWF0aW9uLCBmdW5jdGlvbiBzaG93TmV4dCgpIHtcclxuXHRcdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbiwgc2hvd05leHQpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcub3JkZXItbGlzdC1qcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0XHQvLyBzb3J0VW5vcmRlcmVkTGlzdChsaXN0KTtcclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdsYXN0LW5hbWUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdhbHBoYS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkQWxwaGFIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ3RpdGxlLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRUaXRsZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT1cclxuXHRcdDQuIENvbXBvbmVudHNcclxuXHQgICA9PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQgNC4xIE1vYmlsZSBNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdFx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgbW9iaWxlIG1lbnUuXHJcblx0XHQqXHJcblx0XHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIE1vYmlsZU1lbnUgPSAgZnVuY3Rpb24gTW9iaWxlTWVudShlbGVtZW50KSB7XHJcblx0XHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlcmUgY2FuIG9ubHkgYmUgb25lIG1vYmlsZSBtZW51LlwiKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdFx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRcdFVOREVSTEFZOiAnLm1vYmlsZS1uYXYtdW5kZXJsYXknXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbW9iaWxlTWVudSA9IHRoaXM7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5vbignY2xpY2snLCBtb2JpbGVNZW51LmNsb3NlTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uTU9CSUxFX01FTlUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09ICovXHJcblx0dmFyIERpYWxvZyA9IGZ1bmN0aW9uIERpYWxvZyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5kaWFsb2dOYW1lID0gJChlbGVtZW50KS5kYXRhKCdkaWFsb2cnKTtcclxuXHRcdHRoaXMudW5kZXJsYXkgPSAkKCcudW5kZXJsYXknKTtcclxuXHRcdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHRcdHRoaXMuY29udGVudCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0NPTlRFTlQpO1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIENvbXBvbmVudFxyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwicmVnaXN0ZXJlZFwiKTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcInJvbGVcIiwgXCJkaWFsb2dcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtbGFiZWxsZWRieVwiLCBcImRpYWxvZy10aXRsZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImRpYWxvZy1kZXNjXCIpO1xyXG5cdFx0dGhpcy5oZWFkZXIuYXR0cigndGl0bGUnLCB0aGlzLmhlYWRlci5maW5kKCcjZGlhbG9nLWRlc2MnKS5odG1sKCkpO1xyXG5cclxuXHRcdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0XHR0aGlzLmxvYWRlciA9ICQoZWxlbWVudCkuZmluZChcIi5sb2FkZXJcIik7XHJcblx0XHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0QUNUSVZFOiAnYWN0aXZlJyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRcdERJQUxPR19IRUFERVI6ICcuaGVhZGVyJyxcclxuXHRcdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0xvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdFx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuc2hvdygwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHdpbmRvd1snRGlhbG9nJ10gPSB0aGlzO1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlRGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdC8vIE5lZWRlZCBmb3IgY29udGV4dFxyXG5cdFx0dmFyIGRpYWxvZyA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0XHQkKCdidXR0b24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ2FjdGl2YXRvcicpICYmICQodGhpcykuZGF0YSgnZGlhbG9nJykgPT0gZGlhbG9nLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFSSUFcclxuXHRcdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRkaWFsb2cudW5kZXJsYXkub24oJ2NsaWNrJywgZGlhbG9nLmhpZGVEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHJcblx0XHR0cnl7XHJcblx0XHRcdCQoZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBkaWFsb2cuc2hvd0RpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2goZXJyKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkRpYWxvZyBcIiArIGRpYWxvZy5kaWFsb2dOYW1lICsgXCIgaGFzIG5vIGFjdGl2YXRvciBidXR0b24uXCIpO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkRJQUxPRykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5kaWFsb2cgPSBuZXcgRGlhbG9nKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydEaWFsb2cnXS5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0NC4zIERhdGEgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHRcdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0XHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdFx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0XHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0XHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRcdGlmIChyb3cpIHtcclxuXHRcdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuMyBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIENvbHVtblRvZ2dsZVRhYmxlID0gZnVuY3Rpb24gQ29sdW1uVG9nZ2xlVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZCA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHInKTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IG51bGw7XHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snQ29sdW1uVG9nZ2xlVGFibGUnXSA9IENvbHVtblRvZ2dsZVRhYmxlO1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0VE9HR0xFX1RBQkxFOiAnLnRhYmxlLWNvbHVtbi10b2dnbGUnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfQlVUVE9OOiAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBkb3QtbWVudV9fYWN0aXZhdG9yXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO21hcmdpbi10b3A6MnJlbTttYXJnaW4tbGVmdDphdXRvO1wiPkNvbHVtbnM8L2J1dHRvbj4nLFxyXG5cdFx0Q09MVU1OX1NFTEVDVE9SX01FTlU6ICc8dWwgY2xhc3M9XCJkb3QtbWVudSBkb3QtbWVudS0tYm90dG9tLWxlZnRcIj48L3VsPidcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cclxuXHRcdHRvZ2dsZUNvbHVtbjogZnVuY3Rpb24oY29sdW1uSW5kZXgsIHRhYmxlLCBjaGVja2VkKSB7XHJcblx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkucmVtb3ZlQXR0cignaGlkZGVuJyk7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5hdHRyKCdoaWRkZW4nLCBcInRydWVcIik7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoOiBmdW5jdGlvbih0YWJsZSkge1xyXG5cdFx0XHR2YXIgaGlkZUluZGljZXMgPSBbXTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzID0gdGFibGUuZWxlbWVudC5maW5kKCd0Ym9keSB0cicpO1xyXG5cclxuXHRcdFx0dGFibGUuaGVhZGVycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoJCh0aGlzKS5hdHRyKCdoaWRkZW4nKSl7XHJcblx0XHRcdFx0XHRoaWRlSW5kaWNlcy5wdXNoKCQodGhpcykuaW5kZXgoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZGVJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoaGlkZUluZGljZXNbaV0pLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JChDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy5yZWZyZXNoKHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYoIXRoaXMuZWxlbWVudC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJDb2x1bW5Ub2dnbGVUYWJsZSByZXF1aXJlcyB0aGUgdGFibGUgdG8gaGF2ZSBhbiB1bmlxdWUgSUQuXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHRvZ2dsZVRhYmxlID0gdGhpcztcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbiA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04pO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yTWVudSA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9NRU5VKTtcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCA9ICdDb2x1bW5Ub2dnbGVUYWJsZS0nICsgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudC5iZWZvcmUoY29sdW1uU2VsZWN0b3JCdXR0b24pO1xyXG5cclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmFmdGVyKGNvbHVtblNlbGVjdG9yTWVudSk7XHJcblx0XHRjb2x1bW5TZWxlY3RvckJ1dHRvbi5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkKTtcclxuXHRcdGNvbHVtblNlbGVjdG9yTWVudS5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkICsgJy1tZW51Jyk7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IGNvbHVtblNlbGVjdG9yQnV0dG9uO1xyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUgPSBjb2x1bW5TZWxlY3Rvck1lbnU7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUuZmluZCgndWwnKS5kYXRhKFwidGFibGVcIiwgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpKTtcclxuXHJcblx0XHR0aGlzLmhlYWRlcnMuZWFjaChmdW5jdGlvbiAoKXtcclxuXHRcdFx0dmFyIGNoZWNrZWQgPSAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpID8gXCJjaGVja2VkXCIgOiBcIlwiO1xyXG5cdFx0XHQkKHRoaXMpLmRhdGEoJ3Zpc2libGUnLCAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpKTtcclxuXHJcblx0XHRcdGNvbHVtblNlbGVjdG9yTWVudS5hcHBlbmQoJ1xcXHJcblx0XHRcdFx0PGxpIGNsYXNzPVwiZG90LW1lbnVfX2l0ZW0gZG90LW1lbnVfX2l0ZW0tLXBhZGRlZFwiPiBcXFxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+IFxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNvbHVtbi10b2dnbGVcIiBpZD1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCIgdHlwZT1cImNoZWNrYm94XCIgJysgY2hlY2tlZCArJz4gXFxcclxuXHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCI+JyArICQodGhpcykudGV4dCgpICsgJzwvbGFiZWw+IFxcXHJcblx0XHRcdFx0XHQ8L2Rpdj4gXFxcclxuXHRcdFx0XHQ8L2xpPicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuY29sdW1uLXRvZ2dsZVwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKCcuY29sdW1uLXRvZ2dsZScpLmluZGV4KHRoaXMpO1xyXG5cdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnRvZ2dsZUNvbHVtbihpbmRleCwgdG9nZ2xlVGFibGUsICQodGhpcykucHJvcCgnY2hlY2tlZCcpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkNvbHVtblRvZ2dsZVRhYmxlID0gbmV3IENvbHVtblRvZ2dsZVRhYmxlKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG5cdHdpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRcdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0XHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0XHRDSEFOR0VfQVVUSF9ESUFMT0c6ICcuY2hhbmdlLWF1dGguZGlhbG9nJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLktleXNfID0ge1xyXG5cdFx0U1BBQ0U6IDMyLFxyXG5cdFx0RU5URVI6IDEzLFxyXG5cdFx0Q09NTUE6IDQ1XHJcblx0fTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1c1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1cycsICBmdW5jdGlvbihlKXtcclxuXHRcdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LWZvY3VzJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXMgb3V0XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3Vzb3V0JywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctMmRwJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFNFQVJDSFxyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0JVVFRPTikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSKTtcclxuXHRcdHZhciBmaWx0ZXJCdXR0b24gPSAkKHRoaXMpO1xyXG5cclxuXHRcdGlmKGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0XHRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmaWx0ZXJCdXR0b24ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmaWx0ZXJCdXR0b24uYmx1cigpO1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHRjb250YWluZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmaWx0ZXJCdXR0b24uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgICA0LjYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHRcdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHRcdHRoaXMudG9waWNOYW1lSW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRORVdfVE9QSUM6ICcvdG9waWNzLydcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdGVkaXRUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRcdGlmKHRvcGljLm9yaWdpbmFsTmFtZSA9PSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSl7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQuY29uZmlybSh7XHJcblx0XHRcdFx0dGl0bGU6ICdDaGFuZ2UgVG9waWMgTmFtZScsXHJcblx0XHRcdFx0dHlwZTogJ2JsdWUnLFxyXG5cdFx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIDxiPlwiJyArICB0b3BpYy5vcmlnaW5hbE5hbWUgKyAnXCI8L2I+IHRvIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCB0b3BpYy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19uYW1lIDogdG9waWMudG9waWNOYW1lSW5wdXQudmFsKClcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLm9yaWdpbmFsTmFtZSA9IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2FuY2VsOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRlbGV0ZVRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZScsXHJcblx0XHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArICdcIjwvYj4/JyxcclxuXHRcdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0XHRkZWxldGU6IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lbGVtZW50LmhpZGUoY29uZmlnLnNsb3dBbmltYXRpb24sIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNyZWF0ZUVkaXRUb3BpY0RPTTogZnVuY3Rpb24odG9waWNJZCwgb3JpZ2luYWxOYW1lKXtcclxuXHRcdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZWRpdFRvcGljID0gdGhpcztcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmRlbGV0ZVRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5FRElUX1RPUElDKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkVkaXRUb3BpYyA9IG5ldyBFZGl0VG9waWModGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgICA0LjcgRG90TWVudVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBEb3RNZW51ID0gZnVuY3Rpb24gTWVudShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmJ1dHRvbiA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLm1lbnUgPSBudWxsO1xyXG5cdFx0dGhpcy5pc1RhYmxlRG90TWVudSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERPVF9NRU5VOiAnLmRvdC1tZW51JyxcclxuXHRcdEFDVElWQVRPUjogJy5kb3QtbWVudV9fYWN0aXZhdG9yJyxcclxuXHRcdElTX1ZJU0lCTEU6ICcuaXMtdmlzaWJsZScsXHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZScsXHJcblx0XHRCT1RUT01fTEVGVDogJ2RvdC1tZW51LS1ib3R0b20tbGVmdCcsXHJcblx0XHRCT1RUT01fUklHSFQ6ICdkb3QtbWVudS0tYm90dG9tLXJpZ2h0JyxcclxuXHRcdFRPUF9MRUZUOiAnZG90LW1lbnUtLXRvcC1sZWZ0JyxcclxuXHRcdFRPUF9SSUdIVDogJ2RvdC1tZW51LS10b3AtcmlnaHQnLFxyXG5cdFx0VEFCTEVfRE9UX01FTlU6ICdkb3QtbWVudS0tdGFibGUnXHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBidXR0b25SZWN0ID0gdGhpcy5idXR0b25bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX0xFRlQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCBsZWZ0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX0xFRlQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5yaWdodCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICdib3R0b20gcmlnaHQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfUklHSFQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICdib3R0b20gbGVmdCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcblx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZCh0aGlzKSgpO1xyXG5cdFx0dGhpcy5tZW51LmFkZENsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdFx0dGhpcy5tZW51LnNob3coKTtcclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5tZW51LnJlbW92ZUNsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdFx0dGhpcy5tZW51LmhpZGUoKTtcclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQodGhpcykoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLnNob3cuYmluZCh0aGlzKSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBkb3RNZW51ID0gdGhpcztcclxuXHRcdHZhciBtZW51SWQgPSAkKHRoaXMuYnV0dG9uKS5hdHRyKCdpZCcpICsgJy1tZW51JztcclxuXHJcblx0XHR0aGlzLm1lbnUgPSAkKCcjJyArIG1lbnVJZCk7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gdGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLlRBQkxFX0RPVF9NRU5VKTtcclxuXHJcblx0XHR0aGlzLmJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLnRvZ2dsZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihkb3RNZW51Lm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRpZighdGFyZ2V0LmlzKGRvdE1lbnUubWVudSkgfHwgIXRhcmdldC5pcyhkb3RNZW51LmJ1dHRvbikpIHtcclxuXHRcdFx0XHRpZighJC5jb250YWlucygkKGRvdE1lbnUubWVudSlbMF0sIGUudGFyZ2V0KSl7XHJcblx0XHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkFDVElWQVRPUikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5Eb3RNZW51ID0gbmV3IERvdE1lbnUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT1cclxuXHRcdDUuIFNlY29uZCBNYXJrZXJcclxuXHQgICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0dmFyIE1hcmtlciA9IGZ1bmN0aW9uIE1hcmtlcigpIHtcclxuXHRcdGlmKCQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpLmxlbmd0aCA8IDEgfHwgJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIikubGVuZ3RoIDwgMSl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHRcdHRoaXMuc3R1ZGVudFRhYmxlID0gJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIik7XHJcblx0XHR0aGlzLnN0dWRlbnREYXRhVGFibGUgPSB0aGlzLnN0dWRlbnRUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdFx0dGhpcy5zdXBlcnZpc29yRGF0YVRhYmxlID0gdGhpcy5zdXBlcnZpc29yVGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRcdEFTU0lHTl9NQVJLRVI6ICcvYWRtaW4vbWFya2VyLWFzc2lnbicsXHJcblx0fTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50ID0gZnVuY3Rpb24oc3R1ZGVudFJvd0RPTSwgbWFya2VyKXtcclxuXHRcdHZhciByb3cgPSAkKHN0dWRlbnRSb3dET00pO1xyXG5cclxuXHRcdG1hcmtlci51bnNlbGVjdEFsbChtYXJrZXIpO1xyXG5cdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gJChyb3cpO1xyXG5cclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQodGhpcykuZGF0YSgnbWFya2VyLWlkJykgPT0gcm93LmRhdGEoJ3N1cGVydmlzb3ItaWQnKSl7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yID0gZnVuY3Rpb24oc3VwZXJ2aXNvclJvd0RPTSwgbWFya2VyKXtcclxuXHRcdHZhciByb3cgPSAkKHN1cGVydmlzb3JSb3dET00pO1xyXG5cclxuXHRcdGlmKHJvdy5hdHRyKCdkaXNhYmxlZCcpKXtyZXR1cm47fVxyXG5cclxuXHRcdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgIT0gbnVsbCl7XHJcblx0XHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gcm93O1xyXG5cdFx0XHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2coXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LW5hbWUnKSxcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N1cGVydmlzb3ItbmFtZScpLFxyXG5cdFx0XHRcdHJvdy5kYXRhKCdtYXJrZXItbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUucmVzZXRWaWV3ID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUudW5zZWxlY3RBbGwgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihzdHVkZW50TmFtZSwgc3VwZXJ2aXNvck5hbWUsIG1hcmtlck5hbWUsIHByb2plY3Qpe1xyXG5cdFx0JChcIiNzdHVkZW50LW5hbWVcIikudGV4dChzdHVkZW50TmFtZSk7XHJcblx0XHQkKFwiI3N1cGVydmlzb3ItbmFtZVwiKS50ZXh0KHN1cGVydmlzb3JOYW1lKTtcclxuXHRcdCQoXCIjbWFya2VyLW5hbWVcIikudGV4dChtYXJrZXJOYW1lKTtcclxuXHJcblx0XHQkKFwiI3Byb2plY3QtdGl0bGVcIikuaHRtbCgnPGI+VGl0bGU6IDwvYj4nICsgcHJvamVjdFsndGl0bGUnXSk7XHJcblx0XHQkKFwiI3Byb2plY3QtZGVzY3JpcHRpb25cIikuaHRtbCgnPGI+RGVzY3JpcHRpb246IDwvYj4nICsgcHJvamVjdFsnZGVzY3JpcHRpb24nXSk7XHJcblxyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0fVxyXG5cclxuXHQkKCcjc3VibWl0QXNzaWduTWFya2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB3aW5kb3dbJ01hcmtlciddO1xyXG5cclxuXHRcdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPT0gbnVsbCB8fCBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID09IG51bGwpe1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHR2YXIgcHJvamVjdElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JylbJ2lkJ107XHJcblx0XHR2YXIgc3R1ZGVudElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LWlkJyk7XHJcblx0XHR2YXIgbWFya2VySWQgPSBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yLmRhdGEoJ21hcmtlci1pZCcpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiUEFUQ0hcIixcclxuXHRcdFx0dXJsOiBtYXJrZXIuVXJsc18uQVNTSUdOX01BUktFUixcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZCxcclxuXHRcdFx0XHRzdHVkZW50X2lkOiBzdHVkZW50SWQsXHJcblx0XHRcdFx0bWFya2VyX2lkOiBtYXJrZXJJZCxcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5yZW1vdmUoKTtcclxuXHRcdFx0bWFya2VyLnJlc2V0VmlldyhtYXJrZXIpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbWFya2VyID0gdGhpcztcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQodGhpcywgbWFya2VyKTsgfSk7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yKHRoaXMsIG1hcmtlcik7IH0pO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdHdpbmRvd1snTWFya2VyJ10gPSBuZXcgTWFya2VyKCk7XHJcblx0fVxyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQgOC4gT1RIRVJcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuZW1haWwtdGFibGUgLmNoZWNrYm94IGlucHV0XCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGVjdCA9IGZ1bmN0aW9uKGRvbSl7XHJcblx0XHRcdHZhciBzdGF0dXMgPSBkb20ucGFyZW50cygpLmVxKDQpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdFx0XHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHRcdFx0dmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmVtYWlsLXRhYmxlLicgKyBzdGF0dXMgKyAnIC5jaGVja2JveCBpbnB1dCc7XHJcblx0XHRcdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblxyXG5cdFx0XHQkKGNoZWNrYm94U2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRcdFx0aWYoJCh2YWx1ZSkuaXMoXCI6Y2hlY2tlZFwiKSAmJiAhJCh2YWx1ZSkuaGFzQ2xhc3MoXCJtYXN0ZXItY2hlY2tib3hcIikpIHtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9ICQodmFsdWUpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSBcIixcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKGVtYWlsQnV0dG9uc2VsZWN0b3IpLnByb3AoJ2hyZWYnLCBlbWFpbFN0cmluZyk7XHJcblx0XHR9O1xyXG5cdFx0c2V0VGltZW91dCgyMDAwLCBzZWxlY3QoJCh0aGlzKSkpO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmVtYWlsLXNlbGVjdGVkXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicgfHwgJCh0aGlzKS5wcm9wKCdocmVmJykgPT09IG51bGwpe1xyXG5cdFx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5leHRlcm5hbC1saW5rXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHRcdHZhciBlbGVtVG9SZXBsYWNlID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8tcmVwbGFjZS13aXRoLWxvYWRlci1zZWxlY3RvcicpKTtcclxuXHJcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRlbGVtVG9IaWRlU2VsZWN0b3IuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudC1yZXBsYWNlZC1jb250YWluZXJcIiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHJcblx0XHQkKCcjY29udGVudC1yZXBsYWNlZC1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIiNzaGFyZS1wcm9qZWN0LWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cdFx0XHRcdGlmKHJlc3BvbnNlLnNoYXJlX3Byb2plY3Qpe1xyXG5cdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignc3VjY2VzcycsICdZb3VyIG5hbWUgaXMgYmVpbmcgc2hhcmVkIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJycsICdZb3UgYXJlIG5vIGxvbmdlciBzaGFyaW5nIHlvdXIgbmFtZSB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKCcjc2hhcmVfcHJvamVjdCcpLnByb3AoJ2NoZWNrZWQnLCByZXNwb25zZS5zaGFyZV9wcm9qZWN0KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JCgnLmhlbHAtYmxvY2snLCAnI2xvZ2luRm9ybScpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihzaG93RGlhbG9nKXtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblxyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdFx0JCgnLmZvcm0tZmllbGQnLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmFkZENsYXNzKFwiaGFzLWVycm9yXCIpO1xyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS50ZXh0KGRhdGFbXCJyZXNwb25zZUpTT05cIl1bXCJlcnJvcnNcIl1bXCJ1c2VybmFtZVwiXVswXSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcjbmV3LXRvcGljLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciBzdWJtaXRCdXR0b24gPSAkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKTtcclxuXHRcdHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHQkKCcubG9hZGVyJywgc3VibWl0QnV0dG9uKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRjb250ZXh0OiAkKHRoaXMpLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zLmNyZWF0ZUVkaXRUb3BpY0RPTShkYXRhW1wiaWRcIl0sIGRhdGFbXCJuYW1lXCJdKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0XHRcdCQodGhpcykuZmluZCgnOnN1Ym1pdCcpLmh0bWwoJ0FkZCcpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8vIE5FVyBVU0VSXHJcblx0Ly8gcHV0IHRoaXMgc3R1ZmYgaW4gYW4gYXJyYXlcclxuXHQkKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuXHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblxyXG5cdCQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRpZigkKCcjc3R1ZGVudC1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHRcdH1cclxuXHRcdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoJCgnI2FkbWluLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHRcdCQoJyNhZG1pbi1mb3JtJykuc2hvdygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCQoXCIuZmF2b3VyaXRlLWNvbnRhaW5lclwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzdmdDb250YWluZXIgPSAkKHRoaXMpO1xyXG5cdFx0dmFyIHN2ZyA9IHN2Z0NvbnRhaW5lci5maW5kKCdzdmcnKTtcclxuXHRcdHZhciBwcm9qZWN0SWQgPSB3aW5kb3dbJ3Byb2plY3QnXS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblxyXG5cdFx0c3ZnLmhpZGUoMCk7XHJcblx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5zaG93KDApO1xyXG5cclxuXHRcdGlmKHN2Zy5oYXNDbGFzcygnZmF2b3VyaXRlJykpe1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ3JlbW92ZSc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9yZW1vdmUtZmF2b3VyaXRlJztcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ2FkZCc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9hZGQtZmF2b3VyaXRlJztcclxuXHRcdH1cclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoYWN0aW9uID09IFwiYWRkXCIpe1xyXG5cdFx0XHRcdFx0c3ZnLmFkZENsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3ZnLnJlbW92ZUNsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdHN2Zy5mYWRlSW4oY29uZmlnLmZhc3RBbmltYXRpb24pO1xyXG5cdFx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJ25hdi5tb2JpbGUgLnN1Yi1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZHJvcGRvd24gPSAkKHRoaXMpO1xyXG5cdFx0dmFyIGNvbnRlbnQgPSBkcm9wZG93bi5maW5kKCcuZHJvcGRvd24tY29udGVudCcpO1xyXG5cclxuXHRcdGlmKGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuaGlkZShjb25maWcubWVkaXVtQW5pbWF0aW9uKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIHRydWUpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBmYWxzZSk7XHJcblxyXG5cdFx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMTgwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuc2hvdyhjb25maWcubWVkaXVtQW5pbWF0aW9uKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09XHJcblx0XHQ5LiBJbml0aWFsaXNlXHJcblx0ICAgPT09PT09PT09PT09PT09ICovXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cclxuXHQvLyBVc2VkIGFzIGFuIGVhc3kgd2F5IGZvciBmdW5jdGlvbnMgdG8gZ2V0IGN1cnJlbnQgcHJvamVjdCBkYXRhXHJcblx0aWYoJCgnLnByb2plY3QtY2FyZCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0d2luZG93Wydwcm9qZWN0J10gPSAkKCcucHJvamVjdC1jYXJkJyk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5hamF4RXJyb3IoZnVuY3Rpb24oIGV2ZW50LCByZXF1ZXN0LCBzZXR0aW5ncyApIHtcclxuXHRpZihjb25maWcuc2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbil7XHJcblx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoYXQgcmVxdWVzdC4nKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==