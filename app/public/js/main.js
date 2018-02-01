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
		sortUnorderedList(list);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTUyNDEyZDJkN2VmYmQ4YmNhZmUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImxlbmd0aCIsImFwcGVuZCIsInByZXBlbmQiLCJoaWRlIiwiY29uZmlnIiwiZmFzdEFuaW1hdGlvbiIsImZpcnN0IiwiZmFkZUluIiwic2hvd05leHQiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJzb3J0VW5vcmRlcmVkTGlzdCIsImhhc0NsYXNzIiwiY29uc29sZSIsImVycm9yIiwiYmVmb3JlIiwiYWRkQWxwaGFIZWFkZXJzVG9MaXN0IiwiYWRkVGl0bGVIZWFkZXJzVG9MaXN0IiwiTW9iaWxlTWVudSIsImVsZW1lbnQiLCJ3aW5kb3ciLCJhY3RpdmF0b3IiLCJTZWxlY3RvcnNfIiwiSEFNQlVSR0VSX0NPTlRBSU5FUiIsInVuZGVybGF5IiwiVU5ERVJMQVkiLCJpbml0IiwibG9nIiwicHJvdG90eXBlIiwiQ3NzQ2xhc3Nlc18iLCJJU19WSVNJQkxFIiwiTU9CSUxFX01FTlUiLCJvcGVuTWVudSIsImFkZENsYXNzIiwiY2xvc2VNZW51IiwicmVtb3ZlQ2xhc3MiLCJtb2JpbGVNZW51Iiwib24iLCJiaW5kIiwiaW5pdEFsbCIsIkRpYWxvZyIsImRpYWxvZ05hbWUiLCJkYXRhIiwiaGVhZGVyIiwiZmluZCIsIkRJQUxPR19IRUFERVIiLCJjb250ZW50IiwiRElBTE9HX0NPTlRFTlQiLCJodG1sIiwiSHRtbFNuaXBwZXRzXyIsIkxPQURFUiIsImxvYWRlciIsImlzQ2xvc2FibGUiLCJhY3RpdmF0b3JCdXR0b25zIiwiQUNUSVZFIiwiRElBTE9HIiwic2hvd0xvYWRlciIsInNob3ciLCJoaWRlTG9hZGVyIiwic2hvd0RpYWxvZyIsImhpZGVEaWFsb2ciLCJkaWFsb2ciLCJwdXNoIiwiZXJyIiwiZG9jdW1lbnQiLCJyZWFkeSIsImtleWRvd24iLCJlIiwia2V5Q29kZSIsIkRhdGFUYWJsZSIsImJvZHlSb3dzIiwiZm9vdFJvd3MiLCJyb3dzIiwibWVyZ2UiLCJjaGVja2JveGVzIiwiQ0hFQ0tCT1giLCJtYXN0ZXJDaGVja2JveCIsIk1BU1RFUl9DSEVDS0JPWCIsIkRBVEFfVEFCTEUiLCJJU19TRUxFQ1RFRCIsImZ1bmN0aW9ucyIsInNlbGVjdEFsbFJvd3MiLCJpcyIsInByb3AiLCJzZWxlY3RSb3ciLCJjaGVja2JveCIsInJvdyIsImRhdGFUYWJsZSIsInByb3h5IiwiaSIsImVxIiwiQ29sdW1uVG9nZ2xlVGFibGUiLCJoZWFkIiwic2VsZWN0b3JNZW51Iiwic2VsZWN0b3JCdXR0b24iLCJUT0dHTEVfVEFCTEUiLCJDT0xVTU5fU0VMRUNUT1JfQlVUVE9OIiwiQ09MVU1OX1NFTEVDVE9SX01FTlUiLCJ0b2dnbGVDb2x1bW4iLCJjb2x1bW5JbmRleCIsInRhYmxlIiwiY2hlY2tlZCIsImNoaWxkcmVuIiwicmVtb3ZlQXR0ciIsInJlZnJlc2giLCJoaWRlSW5kaWNlcyIsImluZGV4IiwicmVmcmVzaEFsbCIsInRvZ2dsZVRhYmxlIiwiY29sdW1uU2VsZWN0b3JCdXR0b24iLCJjb2x1bW5TZWxlY3Rvck1lbnUiLCJhZnRlciIsImNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkIiwidGV4dCIsIkFqYXhGdW5jdGlvbnMiLCJTRUFSQ0hfSU5QVVQiLCJTRUFSQ0hfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0JVVFRPTiIsIkxPR19JTl9ESUFMT0ciLCJDSEFOR0VfQVVUSF9ESUFMT0ciLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInJlbW92ZUFsbFNoYWRvd0NsYXNzZXMiLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJibHVyIiwiRWRpdFRvcGljIiwib3JpZ2luYWxOYW1lIiwidG9waWNJZCIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwidG9waWMiLCJ2YWwiLCJjb25maXJtIiwidGl0bGUiLCJ0eXBlIiwiaWNvbiIsInRoZW1lIiwiZXNjYXBlS2V5IiwiYmFja2dyb3VuZERpc21pc3MiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJidXR0b25zIiwiYnRuQ2xhc3MiLCJhY3Rpb24iLCJjc3MiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiY29udGV4dCIsInRvcGljX2lkIiwidG9waWNfbmFtZSIsImRvbmUiLCJjYW5jZWwiLCJkZWxldGVUb3BpYyIsImRlbGV0ZSIsInN1Y2Nlc3MiLCJzbG93QW5pbWF0aW9uIiwicmVtb3ZlIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiRG90TWVudSIsIk1lbnUiLCJidXR0b24iLCJtZW51IiwiRE9UX01FTlUiLCJBQ1RJVkFUT1IiLCJCT1RUT01fTEVGVCIsIkJPVFRPTV9SSUdIVCIsIlRPUF9MRUZUIiwiVE9QX1JJR0hUIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsInJpZ2h0IiwibGVmdCIsInRvcCIsInRvZ2dsZSIsImRvdE1lbnUiLCJtZW51SWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJjb250YWlucyIsIk1hcmtlciIsInNlbGVjdGVkU3R1ZGVudCIsInNlbGVjdGVkU3VwZXJ2aXNvciIsInN0dWRlbnRUYWJsZSIsInN0dWRlbnREYXRhVGFibGUiLCJzdXBlcnZpc29yVGFibGUiLCJzdXBlcnZpc29yRGF0YVRhYmxlIiwiQVNTSUdOX01BUktFUiIsInNlbGVjdFN0dWRlbnQiLCJzdHVkZW50Um93RE9NIiwibWFya2VyIiwidW5zZWxlY3RBbGwiLCJzZWxlY3RTdXBlcnZpc29yIiwic3VwZXJ2aXNvclJvd0RPTSIsInJlc2V0VmlldyIsInN0dWRlbnROYW1lIiwic3VwZXJ2aXNvck5hbWUiLCJtYXJrZXJOYW1lIiwicHJvamVjdCIsInByb2plY3RJZCIsInN0dWRlbnRJZCIsIm1hcmtlcklkIiwicHJvamVjdF9pZCIsInN0dWRlbnRfaWQiLCJtYXJrZXJfaWQiLCJzZWxlY3QiLCJkb20iLCJzdGF0dXMiLCJwYXJlbnRzIiwiZW1haWxTdHJpbmciLCJjaGVja2JveFNlbGVjdG9yIiwiZW1haWxCdXR0b25zZWxlY3RvciIsInZhbHVlIiwic2V0VGltZW91dCIsImFsZXJ0IiwicHJldmVudERlZmF1bHQiLCJlbGVtVG9IaWRlU2VsZWN0b3IiLCJlbGVtVG9SZXBsYWNlIiwic2VyaWFsaXplIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJzaGFyZV9wcm9qZWN0Iiwic2hvd05vdGlmaWNhdGlvbiIsImxvY2F0aW9uIiwicmVsb2FkIiwic3VibWl0QnV0dG9uIiwiZmFkZU91dCIsInN2Z0NvbnRhaW5lciIsInN2ZyIsImFqYXhVcmwiLCJkcm9wZG93biIsIm1lZGl1bUFuaW1hdGlvbiIsImFqYXhFcnJvciIsImV2ZW50IiwicmVxdWVzdCIsInNldHRpbmdzIiwic2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1REE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFn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QVIsQ0FBa0JXLE9BQWxCOztBQUVBLEtBQUc1QyxFQUFFLGVBQUYsRUFBbUJJLE1BQW5CLEdBQTRCLENBQS9CLEVBQWlDO0FBQ2hDcUIsU0FBTyxTQUFQLElBQW9CekIsRUFBRSxlQUFGLENBQXBCO0FBQ0E7O0FBRUQ7QUFDQyxDQXhsQ0E7O0FBMGxDREEsRUFBRXFFLFFBQUYsRUFBWXFMLFNBQVosQ0FBc0IsVUFBVUMsS0FBVixFQUFpQkMsT0FBakIsRUFBMEJDLFFBQTFCLEVBQXFDO0FBQzFELEtBQUdyUCxPQUFPc1AsK0JBQVYsRUFBMEM7QUFDekNkLG1CQUFpQixPQUFqQixFQUEwQix5Q0FBMUI7QUFDQTtBQUNELENBSkQsRSIsImZpbGUiOiJcXGpzXFxtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU1MjQxMmQyZDdlZmJkOGJjYWZlIiwiXHJcbi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4xLiBBSkFYIFNldHVwXHJcbjMuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG40LiBDb21wb25lbnRzXHJcblx0NC4xIE1vYmlsZSBNZW51XHJcblx0NC4yIERpYWxvZyAvIE1vZGFsXHJcblx0NC4zIERhdGEgVGFibGVcclxuXHQ0LjUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG5cdDQuNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcblx0NC43IE1lbnVcclxuNS4gU2Vjb25kIE1hcmtlclxyXG44LiBPdGhlclxyXG45LiBJbml0aWFsaXNlIEV2ZXJ5dGhpbmdcclxuKi9cclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qID09PT09PT09PT09PT09PT1cclxuXHQxLiBBSkFYIFNldHVwXHJcbiAgID09PT09PT09PT09PT09PT0gKi9cclxuJC5hamF4U2V0dXAoe1xyXG5cdGhlYWRlcnM6IHtcclxuXHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpLFxyXG5cdH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQzLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5pZigkKCcuc2hvdy0tc2Nyb2xsLXRvLXRvcCcpLmxlbmd0aCA+IDApe1xyXG5cdCQoJy5tYWluLWNvbnRlbnQnKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgYnV0dG9uLS1hY2NlbnQgc2Nyb2xsLXRvLXRvcFwiPlNjcm9sbCB0byBUb3A8L2J1dHRvbj4nKTtcclxufVxyXG5cclxuLy8gQWNjZXNzaWJpbGl0eVxyXG4kKCcuZHJvcGRvd24nKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcbiQoJy5kcm9wZG93biA+IGJ1dHRvbicpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XHJcbiQoJy5kcm9wZG93biAuZHJvcGRvd24tY29udGVudCBhJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cclxuLy8gTWFrZXMgcHJpbWFyeSB0b3BpYyBmaXJzdFxyXG4kKCcudG9waWNzLWxpc3QnKS5wcmVwZW5kKCQoJy5maXJzdCcpKTtcclxuJCgnLnRvcGljcy1saXN0IC5sb2FkZXInKS5oaWRlKGNvbmZpZy5mYXN0QW5pbWF0aW9uKTtcclxuJCgnLnRvcGljcy1saXN0IGxpJykuZmlyc3QoKS5mYWRlSW4oY29uZmlnLmZhc3RBbmltYXRpb24sIGZ1bmN0aW9uIHNob3dOZXh0KCkge1xyXG5cdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbiwgc2hvd05leHQpO1xyXG59KTtcclxuXHJcbiQoJy5vcmRlci1saXN0LWpzJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0c29ydFVub3JkZXJlZExpc3QobGlzdCk7XHJcblxyXG5cdGlmKGxpc3QuaGFzQ2xhc3MoJ2FscGhhLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRhZGRBbHBoYUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0fVxyXG5cclxuXHRpZihsaXN0Lmhhc0NsYXNzKCd0aXRsZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0YWRkVGl0bGVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09XHJcblx0NC4gQ29tcG9uZW50c1xyXG4gICA9PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PVxyXG5cdCA0LjEgTW9iaWxlIE1lbnVcclxuICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBtb2JpbGUgbWVudS5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIE1vYmlsZU1lbnUgPSAgZnVuY3Rpb24gTW9iaWxlTWVudShlbGVtZW50KSB7XHJcblx0aWYod2luZG93WydNb2JpbGVNZW51J10gPT0gbnVsbCl7XHJcblx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXSA9IHRoaXM7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IgPSAkKHRoaXMuU2VsZWN0b3JzXy5IQU1CVVJHRVJfQ09OVEFJTkVSKTtcclxuXHRcdHRoaXMudW5kZXJsYXkgPSAkKHRoaXMuU2VsZWN0b3JzXy5VTkRFUkxBWSk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc29sZS5sb2coXCJUaGVyZSBjYW4gb25seSBiZSBvbmUgbW9iaWxlIG1lbnUuXCIpO1xyXG5cdH1cclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG59O1xyXG5cclxuTW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdEhBTUJVUkdFUl9DT05UQUlORVI6ICcuaGFtYnVyZ2VyLWNvbnRhaW5lcicsXHJcblx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxufTtcclxuXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmNsb3NlTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBtb2JpbGVNZW51ID0gdGhpcztcclxuXHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdHRoaXMudW5kZXJsYXkub24oJ2NsaWNrJywgbW9iaWxlTWVudS5jbG9zZU1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcbn07XHJcblxyXG5Nb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLk1PQklMRV9NRU5VKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5tb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUodGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PVxyXG5cdDQuMiBEaWFsb2cgLyBNb2RhbFxyXG4gICA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG52YXIgRGlhbG9nID0gZnVuY3Rpb24gRGlhbG9nKGVsZW1lbnQpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0dGhpcy51bmRlcmxheSA9ICQoJy51bmRlcmxheScpO1xyXG5cdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHJcblx0Ly8gUmVnaXN0ZXIgQ29tcG9uZW50XHJcblx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwicmVnaXN0ZXJlZFwiKTtcclxuXHJcblx0Ly8gQVJJQVxyXG5cdHRoaXMuZWxlbWVudC5hdHRyKFwicm9sZVwiLCBcImRpYWxvZ1wiKTtcclxuXHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtbGFiZWxsZWRieVwiLCBcImRpYWxvZy10aXRsZVwiKTtcclxuXHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJkaWFsb2ctZGVzY1wiKTtcclxuXHR0aGlzLmhlYWRlci5hdHRyKCd0aXRsZScsIHRoaXMuaGVhZGVyLmZpbmQoJyNkaWFsb2ctZGVzYycpLmh0bWwoKSk7XHJcblxyXG5cdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0dGhpcy5sb2FkZXIgPSAkKGVsZW1lbnQpLmZpbmQoXCIubG9hZGVyXCIpO1xyXG5cdHRoaXMuaXNDbG9zYWJsZSA9IHRydWU7XHJcblx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0TE9BREVSOiAnPGRpdiBjbGFzcz1cImxvYWRlclwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4O3RvcDogMjUlO1wiPjwvZGl2PicsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdEFDVElWRTogJ2FjdGl2ZScsXHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0RElBTE9HOiAnLmRpYWxvZycsXHJcblx0RElBTE9HX0hFQURFUjogJy5oZWFkZXInLFxyXG5cdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5zaG93TG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdHRoaXMuY29udGVudC5oaWRlKDApO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmxvYWRlci5oaWRlKDApO1xyXG5cdHRoaXMuY29udGVudC5zaG93KDApO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0dGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIiwgdGhpcy5kaWFsb2dOYW1lKTtcclxuXHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdHdpbmRvd1snRGlhbG9nJ10gPSB0aGlzO1xyXG5cdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG59O1xyXG5cclxuRGlhbG9nLnByb3RvdHlwZS5oaWRlRGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLmlzQ2xvc2FibGUgJiYgdGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIikgPT0gdGhpcy5kaWFsb2dOYW1lKXtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdH1cclxufTtcclxuXHJcbkRpYWxvZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0Ly8gTmVlZGVkIGZvciBjb250ZXh0XHJcblx0dmFyIGRpYWxvZyA9IHRoaXM7XHJcblxyXG5cdC8vIEZpbmQgYWN0aXZhdG9yIGJ1dHRvblxyXG5cdCQoJ2J1dHRvbicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHRoaXMpLmRhdGEoJ2FjdGl2YXRvcicpICYmICQodGhpcykuZGF0YSgnZGlhbG9nJykgPT0gZGlhbG9nLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHRkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucy5wdXNoKCQodGhpcykpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBBUklBXHJcblx0ZGlhbG9nLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHJcblx0ZGlhbG9nLnVuZGVybGF5Lm9uKCdjbGljaycsIGRpYWxvZy5oaWRlRGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblxyXG5cdHRyeXtcclxuXHRcdCQoZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcykub24oJ2NsaWNrJywgZGlhbG9nLnNob3dEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHRcdH0pO1xyXG5cdH0gY2F0Y2goZXJyKXtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJEaWFsb2cgXCIgKyBkaWFsb2cuZGlhbG9nTmFtZSArIFwiIGhhcyBubyBhY3RpdmF0b3IgYnV0dG9uLlwiKTtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHR9XHJcbn07XHJcblxyXG5EaWFsb2cucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLkRJQUxPRykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuZGlhbG9nID0gbmV3IERpYWxvZyh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdCQodGhpcykua2V5ZG93bihmdW5jdGlvbihlKSB7XHJcblx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdHdpbmRvd1snRGlhbG9nJ10uaGlkZURpYWxvZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT1cclxuXHQ0LjMgRGF0YSBUYWJsZVxyXG4gICA9PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuKiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcbipcclxuKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuKi9cclxudmFyIERhdGFUYWJsZSA9IGZ1bmN0aW9uIERhdGFUYWJsZShlbGVtZW50KSB7XHJcblx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHR0aGlzLmZvb3RSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Zm9vdCB0cicpO1xyXG5cdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0dGhpcy5jaGVja2JveGVzID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5DSEVDS0JPWCk7XHJcblx0dGhpcy5tYXN0ZXJDaGVja2JveCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uTUFTVEVSX0NIRUNLQk9YKTtcclxuXHR0aGlzLmluaXQoKTtcclxufTtcclxuXHJcbndpbmRvd1snRGF0YVRhYmxlJ10gPSBEYXRhVGFibGU7XHJcblxyXG5EYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdERBVEFfVEFCTEU6ICcuZGF0YS10YWJsZScsXHJcblx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0Q0hFQ0tCT1g6ICd0Ym9keSAuY2hlY2tib3gtaW5wdXQnLFxyXG5cdElTX1NFTEVDVEVEOiAnLmlzLXNlbGVjdGVkJ1xyXG59O1xyXG5cclxuRGF0YVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0c2VsZWN0QWxsUm93czogZnVuY3Rpb24oKSB7XHJcblx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0dGhpcy5yb3dzLmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5yb3dzLnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNlbGVjdFJvdzogZnVuY3Rpb24gKGNoZWNrYm94LCByb3cpIHtcclxuXHRcdGlmIChyb3cpIHtcclxuXHRcdFx0aWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0cm93LmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJvdy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHQkKHRoaXMuY2hlY2tib3hlcykuZWFjaChmdW5jdGlvbihpKSB7XHJcblx0XHQkKHRoaXMpLm9uKCdjaGFuZ2UnLCAkLnByb3h5KGRhdGFUYWJsZS5mdW5jdGlvbnMuc2VsZWN0Um93LCB0aGlzLCAkKHRoaXMpLCBkYXRhVGFibGUuYm9keVJvd3MuZXEoaSkpKTtcclxuXHR9KTtcclxufTtcclxuXHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5kYXRhVGFibGUgPSBuZXcgRGF0YVRhYmxlKHRoaXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PVxyXG5cdDQuMyBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcbiAgID09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgQ29sdW1uVG9nZ2xlVGFibGUgPSBmdW5jdGlvbiBDb2x1bW5Ub2dnbGVUYWJsZShlbGVtZW50KSB7XHJcblx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHR0aGlzLmhlYWQgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyJyk7XHJcblx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0dGhpcy5zZWxlY3Rvck1lbnUgPSBudWxsO1xyXG5cdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBudWxsO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydDb2x1bW5Ub2dnbGVUYWJsZSddID0gQ29sdW1uVG9nZ2xlVGFibGU7XHJcblxyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRUT0dHTEVfVEFCTEU6ICcudGFibGUtY29sdW1uLXRvZ2dsZSdcclxufTtcclxuXHJcbkNvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdENPTFVNTl9TRUxFQ1RPUl9CVVRUT046ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGRvdC1tZW51X19hY3RpdmF0b3JcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDJyZW07XCI+Q29sdW1uczwvYnV0dG9uPicsXHJcblx0Q09MVU1OX1NFTEVDVE9SX01FTlU6ICc8dWwgY2xhc3M9XCJkb3QtbWVudVwiPjwvdWw+J1xyXG59O1xyXG5cclxuQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHJcblx0dG9nZ2xlQ29sdW1uOiBmdW5jdGlvbihjb2x1bW5JbmRleCwgdGFibGUsIGNoZWNrZWQpIHtcclxuXHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG5cdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuYXR0cignaGlkZGVuJywgXCJ0cnVlXCIpO1xyXG5cdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRyZWZyZXNoOiBmdW5jdGlvbih0YWJsZSkge1xyXG5cdFx0dGFibGUuYm9keVJvd3MgPSB0YWJsZS5lbGVtZW50LmZpbmQoJ3Rib2R5IHRyJyk7XHJcblxyXG5cdFx0dmFyIGhpZGVJbmRpY2VzID0gW107XHJcblxyXG5cdFx0dGFibGUuaGVhZGVycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCQodGhpcykuYXR0cignaGlkZGVuJykpe1xyXG5cdFx0XHRcdGhpZGVJbmRpY2VzLnB1c2goJCh0aGlzKS5pbmRleCgpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZGVJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGhpZGVJbmRpY2VzW2ldKS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdHJlZnJlc2hBbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0JChDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMucmVmcmVzaCh0aGlzLkNvbHVtblRvZ2dsZVRhYmxlKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcbn07XHJcblxyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0aWYoIXRoaXMuZWxlbWVudC5hdHRyKCdpZCcpKXtcclxuXHRcdGNvbnNvbGUubG9nKFwiQ29sdW1uVG9nZ2xlVGFibGUgcmVxdWlyZXMgdGhlIHRhYmxlIHRvIGhhdmUgYW4gdW5pcXVlIElELlwiKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHZhciB0b2dnbGVUYWJsZSA9IHRoaXM7XHJcblx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX0JVVFRPTik7XHJcblx0dmFyIGNvbHVtblNlbGVjdG9yTWVudSA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9NRU5VKTtcclxuXHJcblx0dGhpcy5lbGVtZW50LmJlZm9yZShjb2x1bW5TZWxlY3RvckJ1dHRvbik7XHJcblx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYWZ0ZXIoY29sdW1uU2VsZWN0b3JNZW51KTtcclxuXHJcblx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkID0gJ0NvbHVtblRvZ2dsZVRhYmxlLScgKyB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJyk7XHJcblx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCk7XHJcblx0Y29sdW1uU2VsZWN0b3JNZW51LmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgKyAnLW1lbnUnKTtcclxuXHJcblx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IGNvbHVtblNlbGVjdG9yQnV0dG9uO1xyXG5cdHRoaXMuc2VsZWN0b3JNZW51ID0gY29sdW1uU2VsZWN0b3JNZW51O1xyXG5cclxuXHR0aGlzLnNlbGVjdG9yTWVudS5maW5kKCd1bCcpLmRhdGEoXCJ0YWJsZVwiLCB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJykpO1xyXG5cclxuXHR0aGlzLmhlYWRlcnMuZWFjaChmdW5jdGlvbiAoKXtcclxuXHRcdHZhciBjaGVja2VkID0gJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSA/IFwiY2hlY2tlZFwiIDogXCJcIjtcclxuXHRcdCQodGhpcykuZGF0YSgndmlzaWJsZScsICQodGhpcykuZGF0YShcImRlZmF1bHRcIikpO1xyXG5cclxuXHRcdGNvbHVtblNlbGVjdG9yTWVudS5hcHBlbmQoJ1xcXHJcblx0XHRcdDxsaSBjbGFzcz1cImRvdC1tZW51X19pdGVtIGRvdC1tZW51X19pdGVtLS1wYWRkZWRcIj4gXFxcclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4gXFxcclxuXHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNvbHVtbi10b2dnbGVcIiBpZD1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCIgdHlwZT1cImNoZWNrYm94XCIgJysgY2hlY2tlZCArJz4gXFxcclxuXHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiPicgKyAkKHRoaXMpLnRleHQoKSArICc8L2xhYmVsPiBcXFxyXG5cdFx0XHRcdDwvZGl2PiBcXFxyXG5cdFx0XHQ8L2xpPicpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuY29sdW1uLXRvZ2dsZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGluZGV4ID0gJCgnLmNvbHVtbi10b2dnbGUnKS5pbmRleCh0aGlzKTtcclxuXHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMudG9nZ2xlQ29sdW1uKGluZGV4LCB0b2dnbGVUYWJsZSwgJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpO1xyXG5cdH0pO1xyXG5cclxufTtcclxuXHJcbkNvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdCQodGhpcy5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUgPSBuZXcgQ29sdW1uVG9nZ2xlVGFibGUodGhpcyk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0NC41IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG4qXHJcbiogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBBamF4RnVuY3Rpb25zID0gIGZ1bmN0aW9uIEFqYXhGdW5jdGlvbnMoKSB7fTtcclxud2luZG93WydBamF4RnVuY3Rpb25zJ10gPSBBamF4RnVuY3Rpb25zO1xyXG5cclxuQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcbn07XHJcblxyXG5BamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFNFQVJDSF9JTlBVVDogJy5zZWFyY2gtaW5wdXQnLFxyXG5cdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0U0VBUkNIX0ZJTFRFUl9DT05UQUlORVI6ICcuc2VhcmNoLWZpbHRlci1jb250YWluZXInLFxyXG5cdFNFQVJDSF9GSUxURVJfQlVUVE9OOiAnI3NlYXJjaC1maWx0ZXItYnV0dG9uJyxcclxuXHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0Q0hBTkdFX0FVVEhfRElBTE9HOiAnLmNoYW5nZS1hdXRoLmRpYWxvZydcclxufTtcclxuXHJcbkFqYXhGdW5jdGlvbnMucHJvdG90eXBlLktleXNfID0ge1xyXG5cdFNQQUNFOiAzMixcclxuXHRFTlRFUjogMTMsXHJcblx0Q09NTUE6IDQ1XHJcbn07XHJcblxyXG4vLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcbiQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1cycsICBmdW5jdGlvbihlKXtcclxuXHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxufSk7XHJcblxyXG4vLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzIG91dFxyXG4kKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LTJkcCcpO1xyXG59KTtcclxuXHJcbi8vIFNFQVJDSFxyXG4kKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9CVVRUT04pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdHZhciBmaWx0ZXJCdXR0b24gPSAkKHRoaXMpO1xyXG5cclxuXHRpZihjb250YWluZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRmaWx0ZXJCdXR0b24ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0ZmlsdGVyQnV0dG9uLmJsdXIoKTtcclxuXHR9IGVsc2V7XHJcblx0XHRjb250YWluZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0ZmlsdGVyQnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIDQuNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcbiAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG4qXHJcbiogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcbiovXHJcbnZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0dGhpcy5vcmlnaW5hbE5hbWUgPSAkKGVsZW1lbnQpLmRhdGEoXCJvcmlnaW5hbC10b3BpYy1uYW1lXCIpO1xyXG5cdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHR0aGlzLnRvcGljTmFtZUlucHV0ID0gJChlbGVtZW50KS5maW5kKCdpbnB1dCcpO1xyXG5cdHRoaXMuZWRpdEJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmVkaXQtdG9waWMnKTtcclxuXHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxud2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7fTtcclxuXHJcbkVkaXRUb3BpYy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRFRElUX1RPUElDOiAnLmVkaXQtdG9waWMtbGlzdCAudG9waWMnLFxyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRERUxFVEVfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0TkVXX1RPUElDOiAnL3RvcGljcy8nXHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRlZGl0VG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdGlmKHRvcGljLm9yaWdpbmFsTmFtZSA9PSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnQ2hhbmdlIFRvcGljIE5hbWUnLFxyXG5cdFx0XHR0eXBlOiAnYmx1ZScsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gPGI+XCInICsgIHRvcGljLm9yaWdpbmFsTmFtZSArICdcIjwvYj4gdG8gPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsnXCI8L2I+PycsXHJcblx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRjb25maXJtOiB7XHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ibHVlJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCB0b3BpYy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWNfbmFtZSA6IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLm9yaWdpbmFsTmFtZSA9IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNhbmNlbDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0YmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRkZWxldGVUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0JC5jb25maXJtKHtcclxuXHRcdFx0dGl0bGU6ICdEZWxldGUnLFxyXG5cdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsgJ1wiPC9iPj8nLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0ZGVsZXRlOiB7XHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMuZWxlbWVudC5oaWRlKGNvbmZpZy5zbG93QW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWMucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlRWRpdFRvcGljRE9NOiBmdW5jdGlvbih0b3BpY0lkLCBvcmlnaW5hbE5hbWUpe1xyXG5cdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0fVxyXG59O1xyXG5cclxuRWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBlZGl0VG9waWMgPSB0aGlzO1xyXG5cdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcbn07XHJcblxyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuRWRpdFRvcGljID0gbmV3IEVkaXRUb3BpYyh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICA0LjcgRG90TWVudVxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4qIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuKlxyXG4qIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG4qL1xyXG52YXIgRG90TWVudSA9IGZ1bmN0aW9uIE1lbnUoZWxlbWVudCkge1xyXG5cdHRoaXMuYnV0dG9uID0gJChlbGVtZW50KTtcclxuXHR0aGlzLm1lbnUgPSBudWxsO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59O1xyXG5cclxuRG90TWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRET1RfTUVOVTogJy5kb3QtbWVudScsXHJcblx0QUNUSVZBVE9SOiAnLmRvdC1tZW51X19hY3RpdmF0b3InLFxyXG5cdElTX1ZJU0lCTEU6ICcuaXMtdmlzaWJsZScsXHJcbn07XHJcblxyXG5cclxuRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnLFxyXG5cdEJPVFRPTV9MRUZUOiAnZG90LW1lbnUtLWJvdHRvbS1sZWZ0JyxcclxuXHRCT1RUT01fUklHSFQ6ICdkb3QtbWVudS0tYm90dG9tLXJpZ2h0JyxcclxuXHRUT1BfTEVGVDogJ2RvdC1tZW51LS10b3AtbGVmdCcsXHJcblx0VE9QX1JJR0hUOiAnZG90LW1lbnUtLXRvcC1yaWdodCcsXHJcbn07XHJcblxyXG5Eb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBidXR0b25SZWN0ID0gdGhpcy5idXR0b25bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9MRUZUKSl7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5yaWdodCAgLSB0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJykpO1xyXG5cdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fUklHSFQpKXtcclxuXHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCkpe1xyXG5cdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QucmlnaHQgIC0gdGhpcy5idXR0b24uY3NzKCd3aWR0aCcpKTtcclxuXHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX1JJR0hUKSl7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdH1cclxufVxyXG5cclxuRG90TWVudS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcblx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQodGhpcykoKTtcclxuXHR0aGlzLm1lbnUuYWRkQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0dGhpcy5tZW51LnNob3coKTtcclxufVxyXG5cclxuRG90TWVudS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5tZW51LnJlbW92ZUNsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdHRoaXMubWVudS5oaWRlKCk7XHJcbn1cclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZCh0aGlzKSgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHREb3RNZW51LnByb3RvdHlwZS5zaG93LmJpbmQodGhpcykoKTtcclxuXHR9XHJcbn1cclxuXHJcbkRvdE1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGRvdE1lbnUgPSB0aGlzO1xyXG5cdHZhciBtZW51SWQgPSAkKHRoaXMuYnV0dG9uKS5hdHRyKCdpZCcpICsgJy1tZW51JztcclxuXHJcblx0dGhpcy5tZW51ID0gJCgnIycgKyBtZW51SWQpO1xyXG5cclxuXHR0aGlzLmJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlLmJpbmQoZG90TWVudSkoKTtcclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZihkb3RNZW51Lm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYoIXRhcmdldC5pcyhkb3RNZW51Lm1lbnUpIHx8ICF0YXJnZXQuaXMoZG90TWVudS5idXR0b24pKSB7XHJcblx0XHRcdGlmKCEkLmNvbnRhaW5zKCQoZG90TWVudS5tZW51KVswXSwgZS50YXJnZXQpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuRG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKHRoaXMuU2VsZWN0b3JzXy5BQ1RJVkFUT1IpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLkRvdE1lbnUgPSBuZXcgRG90TWVudSh0aGlzKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PVxyXG5cdDUuIFNlY29uZCBNYXJrZXJcclxuICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG52YXIgTWFya2VyID0gZnVuY3Rpb24gTWFya2VyKCkge1xyXG5cdGlmKCQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpLmxlbmd0aCA8IDEgfHwgJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIikubGVuZ3RoIDwgMSl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHR0aGlzLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0dGhpcy5zdHVkZW50VGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKTtcclxuXHR0aGlzLnN0dWRlbnREYXRhVGFibGUgPSB0aGlzLnN0dWRlbnRUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0dGhpcy5zdXBlcnZpc29yVGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKTtcclxuXHR0aGlzLnN1cGVydmlzb3JEYXRhVGFibGUgPSB0aGlzLnN1cGVydmlzb3JUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0dGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdEFTU0lHTl9NQVJLRVI6ICcvYWRtaW4vbWFya2VyLWFzc2lnbicsXHJcbn07XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdHZhciByb3cgPSAkKHN0dWRlbnRSb3dET00pO1xyXG5cclxuXHRtYXJrZXIudW5zZWxlY3RBbGwobWFya2VyKTtcclxuXHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gJChyb3cpO1xyXG5cclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoJCh0aGlzKS5kYXRhKCdtYXJrZXItaWQnKSA9PSByb3cuZGF0YSgnc3VwZXJ2aXNvci1pZCcpKXtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yID0gZnVuY3Rpb24oc3VwZXJ2aXNvclJvd0RPTSwgbWFya2VyKXtcclxuXHR2YXIgcm93ID0gJChzdXBlcnZpc29yUm93RE9NKTtcclxuXHJcblx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgIT0gbnVsbCl7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2coXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1uYW1lJyksXHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksXHJcblx0XHRcdHJvdy5kYXRhKCdtYXJrZXItbmFtZScpLFxyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKSk7XHJcblx0fVxyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnJlc2V0VmlldyA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxufVxyXG5cclxuTWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG59XHJcblxyXG5NYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihzdHVkZW50TmFtZSwgc3VwZXJ2aXNvck5hbWUsIG1hcmtlck5hbWUsIHByb2plY3Qpe1xyXG5cdCQoXCIjc3R1ZGVudC1uYW1lXCIpLnRleHQoc3R1ZGVudE5hbWUpO1xyXG5cdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdCQoXCIjbWFya2VyLW5hbWVcIikudGV4dChtYXJrZXJOYW1lKTtcclxuXHJcblx0JChcIiNwcm9qZWN0LXRpdGxlXCIpLmh0bWwoJzxiPlRpdGxlOiA8L2I+JyArIHByb2plY3RbJ3RpdGxlJ10pO1xyXG5cdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0WydkZXNjcmlwdGlvbiddKTtcclxuXHJcblx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcbn1cclxuXHJcbiQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdHZhciBtYXJrZXIgPSB3aW5kb3dbJ01hcmtlciddO1xyXG5cclxuXHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9PSBudWxsKXtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH07XHJcblxyXG5cdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHR2YXIgcHJvamVjdElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JylbJ2lkJ107XHJcblx0dmFyIHN0dWRlbnRJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1pZCcpO1xyXG5cdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHR1cmw6IG1hcmtlci5VcmxzXy5BU1NJR05fTUFSS0VSLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWQsXHJcblx0XHRcdHN0dWRlbnRfaWQ6IHN0dWRlbnRJZCxcclxuXHRcdFx0bWFya2VyX2lkOiBtYXJrZXJJZCxcclxuXHJcblx0XHR9LFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG5cdFx0fSxcclxuXHRcdC8vIEFkZCBmYWlsXHJcblx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LnJlbW92ZSgpO1xyXG5cdFx0bWFya2VyLnJlc2V0VmlldyhtYXJrZXIpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIG1hcmtlciA9IHRoaXM7XHJcblxyXG5cdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50KHRoaXMsIG1hcmtlcik7XHJcblx0fSk7XHJcblxyXG5cdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yKHRoaXMsIG1hcmtlcik7XHJcblx0fSk7XHJcbn1cclxuXHJcbk1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCA4LiBPVEhFUlxyXG4gICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4kKCcuZW1haWwtdGFibGUgLmNoZWNrYm94IGlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHR2YXIgc2VsZWN0ID0gZnVuY3Rpb24oZG9tKXtcclxuXHRcdHZhciBzdGF0dXMgPSBkb20ucGFyZW50cygpLmVxKDQpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdFx0dmFyIGVtYWlsU3RyaW5nID0gXCJtYWlsdG86XCI7XHJcblx0XHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcuZW1haWwtdGFibGUuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHRcdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblxyXG5cdFx0JChjaGVja2JveFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0XHRpZigkKHZhbHVlKS5pcyhcIjpjaGVja2VkXCIpICYmICEkKHZhbHVlKS5oYXNDbGFzcyhcIm1hc3Rlci1jaGVja2JveFwiKSkge1xyXG5cdFx0XHRcdGVtYWlsU3RyaW5nICs9ICQodmFsdWUpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gXCIsXCI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JChlbWFpbEJ1dHRvbnNlbGVjdG9yKS5wcm9wKCdocmVmJywgZW1haWxTdHJpbmcpO1xyXG5cdH07XHJcblx0c2V0VGltZW91dCgyMDAwLCBzZWxlY3QoJCh0aGlzKSkpO1xyXG59KTtcclxuXHJcbiQoJy5lbWFpbC1zZWxlY3RlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRpZigkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gJ21haWx0bzonIHx8ICQodGhpcykucHJvcCgnaHJlZicpID09PSBudWxsKXtcclxuXHRcdGFsZXJ0KFwiWW91IGhhdmVuJ3Qgc2VsZWN0ZWQgYW55b25lLlwiKTtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcbiQoJy5leHRlcm5hbC1saW5rJykub24oJ2NsaWNrJywgIGZ1bmN0aW9uKGUpIHtcclxuXHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHR2YXIgZWxlbVRvUmVwbGFjZSA9ICQoJCh0aGlzKS5kYXRhKCdlbGVtZW50LXRvLXJlcGxhY2Utd2l0aC1sb2FkZXItc2VsZWN0b3InKSk7XHJcblxyXG5cdGVsZW1Ub0hpZGVTZWxlY3Rvci5oaWRlKCk7XHJcblx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0ZWxlbVRvUmVwbGFjZS5hZnRlcignPGRpdiBpZD1cImNvbnRlbnQtcmVwbGFjZWQtY29udGFpbmVyXCIgY2xhc3M9XCJsb2FkZXIgbG9hZGVyLS14LWxhcmdlXCI+PC9kaXY+Jyk7XHJcblxyXG5cdCQoJyNjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG59KTtcclxuXHJcbi8vIFVzZWQgb24gdGhlIHN0dWRlbnQgaW5kZXggcGFnZVxyXG4kKFwiI3NoYXJlLXByb2plY3QtZm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cdFx0XHRpZihyZXNwb25zZS5zaGFyZV9wcm9qZWN0KXtcclxuXHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1lvdXIgbmFtZSBpcyBiZWluZyBzaGFyZWQgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCcnLCAnWW91IGFyZSBubyBsb25nZXIgc2hhcmluZyB5b3VyIG5hbWUgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQkKCcjc2hhcmVfcHJvamVjdCcpLnByb3AoJ2NoZWNrZWQnLCByZXNwb25zZS5zaGFyZV9wcm9qZWN0KTtcclxuXHRcdH0sXHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJChcIiNsb2dpbkZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0JCgnLmhlbHAtYmxvY2snLCAnI2xvZ2luRm9ybScpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0dHlwZTonUE9TVCcsXHJcblx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0c3VjY2VzczpmdW5jdGlvbihzaG93RGlhbG9nKXtcclxuXHRcdFx0aWYoc2hvd0RpYWxvZyA9PSBcInRydWVcIil7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblxyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5DSEFOR0VfQVVUSF9ESUFMT0cpWzBdLmRpYWxvZy5pc0Nsb3NhYmxlID0gZmFsc2U7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkNIQU5HRV9BVVRIX0RJQUxPRylbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnNob3coKTtcclxuXHRcdFx0JCgnLmZvcm0tZmllbGQnLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmFkZENsYXNzKFwiaGFzLWVycm9yXCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdHZhciBzdWJtaXRCdXR0b24gPSAkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKTtcclxuXHRzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdCQoJy5sb2FkZXInLCBzdWJtaXRCdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0dHlwZTonUE9TVCcsXHJcblx0XHRjb250ZXh0OiAkKHRoaXMpLFxyXG5cdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucy5jcmVhdGVFZGl0VG9waWNET00oZGF0YVtcImlkXCJdLCBkYXRhW1wibmFtZVwiXSk7XHJcblx0XHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKCkge31cclxuXHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHRcdCQodGhpcykuZmluZCgnOnN1Ym1pdCcpLmh0bWwoJ0FkZCcpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbi8vIFVzZWQgZm9yIHRyYW5zYWN0aW9uc1xyXG4kKCcjc2hvdy1yYXctdGFibGUtZGF0YScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdGlmKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKXtcclxuXHRcdCQoJ3RhYmxlLnJhdy1kZXRhaWwnKS5jc3MoJ3dpZHRoJywgJCgndGFibGUuZnVsbC1kZXRhaWwnKS5jc3MoJ3dpZHRoJykpO1xyXG5cdFx0JCgndGFibGUuZnVsbC1kZXRhaWwnKS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xyXG5cclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuZmFkZU91dChjb25maWcuZmFzdEFuaW1hdGlvbik7XHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuZmFkZUluKGNvbmZpZy5mYXN0QW5pbWF0aW9uLCBmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmNzcygnd2lkdGgnLCAkKCd0YWJsZS5yYXctZGV0YWlsJykuY3NzKCd3aWR0aCcpKTtcclxuXHRcdCQoJ3RhYmxlLmZ1bGwtZGV0YWlsJykuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xyXG5cdFx0JCgndGFibGUucmF3LWRldGFpbCcpLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcclxuXHJcblx0XHQkKCd0YWJsZS5yYXctZGV0YWlsJykuZmFkZU91dChjb25maWcuZmFzdEFuaW1hdGlvbik7XHJcblx0XHQkKCd0YWJsZS5mdWxsLWRldGFpbCcpLmZhZGVJbihjb25maWcuZmFzdEFuaW1hdGlvbiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gTkVXIFVTRVJcclxuLy8gcHV0IHRoaXMgc3R1ZmYgaW4gYW4gYXJyYXlcclxuJCgnI2FkbWluLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcbiQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcbiQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0aWYoJCgnI3N0dWRlbnQtb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxuXHRpZigkKCcjYWRtaW4tb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuc2hvdygpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gU1RSSU5HU1xyXG4kKCcjYWRtaW4tZm9ybScpLmhpZGUoKTtcclxuJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRpZigkKCcjc3R1ZGVudC1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHR9XHJcblx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0fVxyXG5cdGlmKCQoJyNhZG1pbi1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0JCgnI2FkbWluLWZvcm0nKS5zaG93KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyNhZG1pbi1mb3JtJykuaGlkZSgpO1xyXG5cdH1cclxufSk7XHJcblxyXG4kKFwiLmZhdm91cml0ZS1jb250YWluZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIHN2Z0NvbnRhaW5lciA9ICQodGhpcyk7XHJcblx0dmFyIHN2ZyA9IHN2Z0NvbnRhaW5lci5maW5kKCdzdmcnKTtcclxuXHR2YXIgcHJvamVjdElkID0gd2luZG93Wydwcm9qZWN0J10uZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cclxuXHRzdmcuaGlkZSgwKTtcclxuXHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5zaG93KDApO1xyXG5cclxuXHRpZihzdmcuaGFzQ2xhc3MoJ2Zhdm91cml0ZScpKXtcclxuXHRcdHZhciBhY3Rpb24gPSAncmVtb3ZlJztcclxuXHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9yZW1vdmUtZmF2b3VyaXRlJztcclxuXHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBhY3Rpb24gPSAnYWRkJztcclxuXHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9hZGQtZmF2b3VyaXRlJztcclxuXHR9XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRkYXRhOiB7XHJcblx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0fSxcclxuXHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYoYWN0aW9uID09IFwiYWRkXCIpe1xyXG5cdFx0XHRcdHN2Zy5hZGRDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c3ZnLnJlbW92ZUNsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRzdmcuZmFkZUluKGNvbmZpZy5mYXN0QW5pbWF0aW9uKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLmhpZGUoMCk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJCgnbmF2Lm1vYmlsZSAuc3ViLWRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHR2YXIgZHJvcGRvd24gPSAkKHRoaXMpO1xyXG5cdHZhciBjb250ZW50ID0gZHJvcGRvd24uZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKTtcclxuXHJcblx0aWYoZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xyXG5cdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XHJcblxyXG5cdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDBkZWcpXCIpO1xyXG5cdFx0ZHJvcGRvd24ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRjb250ZW50LmhpZGUoY29uZmlnLm1lZGl1bUFuaW1hdGlvbik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIHRydWUpO1xyXG5cdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgZmFsc2UpO1xyXG5cclxuXHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigxODBkZWcpXCIpO1xyXG5cdFx0ZHJvcGRvd24uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRjb250ZW50LnNob3coY29uZmlnLm1lZGl1bUFuaW1hdGlvbik7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PVxyXG5cdDkuIEluaXRpYWxpc2VcclxuICAgPT09PT09PT09PT09PT09ICovXHJcbk1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuRGlhbG9nLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkRhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5Db2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5FZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuTWFya2VyLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbkRvdE1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHJcbmlmKCQoJy5wcm9qZWN0LWNhcmQnKS5sZW5ndGggPiAwKXtcclxuXHR3aW5kb3dbJ3Byb2plY3QnXSA9ICQoJy5wcm9qZWN0LWNhcmQnKTtcclxufVxyXG5cclxuLy8gRU5EIE9GIERPQyBSRUFEWSBGSUxFXHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uKCBldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MgKSB7XHJcblx0aWYoY29uZmlnLnNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24pe1xyXG5cdFx0c2hvd05vdGlmaWNhdGlvbignZXJyb3InLCAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGF0IHJlcXVlc3QuJyk7XHJcblx0fVxyXG59KTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=