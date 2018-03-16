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
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

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
	$('.topics-list .loader').fadeOut(0);
	$('.topics-list li').first().fadeIn(config.animtions.fast, function showNextTopic() {
		$(this).next(".topics-list li").fadeIn(config.animtions.fast, showNextTopic);
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

	$('.html-editor').each(function (index, value) {
		$.ajax({
			url: '/snippet?snippet=html-editor-toolbar',
			type: 'GET',
			success: function success(result) {
				$('.html-editor--input').after(result);
			}
		});

		var buttonsHtml = "<div class='html-editor--top-buttons flex'><button class='html' type='button'>HTML</button><button class='preview' type='button'>PREVIEW</button></div>";
		var previewHtml = "<div class='html-editor--preview-container'><div class='html-editor--preview'></div></div>";

		$('.html-editor--input').before(buttonsHtml);
		$('.html-editor').after(previewHtml);

		$('.html-editor--preview-container').hide();
		$('.html-editor--preview').html($('.html-editor--input').val());
	});

	$('.html-editor--input').on('change', function () {
		$('.html-editor--preview').html($(this).val());
	});

	$('.html-editor--top-buttons .html').on('click', function () {
		$('.html-editor--input').show();
		$('.html-editor--toolbar').show();
		$('.html-editor--preview-container').hide();
	});

	$('.html-editor--top-buttons .preview').on('click', function () {
		$('.html-editor--input').hide();
		$('.html-editor--toolbar').hide();
		$('.html-editor--preview-container').show();
	});

	// Toggle label flips toggle
	$(".html-editor").on("click", ".html-editor--toolbar li button", function (e) {
		switch ($(this).data('type')) {
			case "linebreak":
				insertAtCaret('html-editor--input', '<br>');
				break;

			case "ol":
				insertAtCaret('html-editor--input', '\n<ol>\n\t<li>Item 1</li>\n\t<li>Item 2</li>\n\t<li>Item 3</li>\n</ol>');
				break;

			case "ul":
				insertAtCaret('html-editor--input', '\n<ul>\n\t<li>Item x</li>\n\t<li>Item y</li>\n\t<li>Item z</li>\n</ul>');
				break;

			case "bold":
				wrapTextWithTag('html-editor--input', 'b');
				break;

			case "tt":
				wrapTextWithTag('html-editor--input', 'tt');
				break;

			case "italic":
				wrapTextWithTag('html-editor--input', 'i');
				break;

			case "underline":
				wrapTextWithTag('html-editor--input', 'u');
				break;

			case "img":
				var inputUrl = prompt("Enter the image URL", "https://www.");
				var inputAlt = prompt("Enter alt text", "Image of Sussex campus");
				insertAtCaret('html-editor--input', '<img alt="' + inputAlt + '" src="' + inputUrl + '">');
				break;

			case "link":
				var inputUrl = prompt("Enter the URL", "https://www.");
				var inputText = prompt("Enter display text", "Sussex");
				insertAtCaret('html-editor--input', '<a href="' + inputUrl + '">' + inputText + '</a>');
				break;

			case "code":
				wrapTextWithTag('html-editor--input', 'code');
				break;

			case "pre":
				wrapTextWithTag('html-editor--input', 'pre');
				break;

			case "info":
				$.dialog({
					theme: 'material',
					escapeKey: true,
					animateFromElement: false,
					backgroundDismiss: true,
					title: 'HTML Editor Info',
					content: 'All links you add will open in a new tab. All HTML 5 elements are valid for the description field, excluding; <br><br> <ul><li>Script tags</li><li>Heading tags</li><li>HTML root tags</li><li>Body tags</li></ul>'
				});
				break;
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
			$(this).addClass("slideInUp animated");

			$(this).animate({
				opacity: 1
			}, 800);
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
/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

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
|	4. Column Toggle Table
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
 	4. Column Toggle Table
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmVmMzY3YjVlOTkxOTcwOTMxYjkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIm9uIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVxIiwiZGF0YSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpbmRleCIsInZhbHVlIiwiaXMiLCJwcm9wIiwic2V0VGltZW91dCIsImUiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInJlbW92ZUNsYXNzIiwiaGlkZSIsImFmdGVyIiwiY3NzIiwiYWpheCIsInVybCIsInR5cGUiLCJzZXJpYWxpemUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJzaGFyZV9uYW1lIiwic2hvd05vdGlmaWNhdGlvbiIsIkFqYXhGdW5jdGlvbnMiLCJwcm90b3R5cGUiLCJTZWxlY3RvcnNfIiwiTE9HX0lOX0RJQUxPRyIsImRpYWxvZyIsInNob3dMb2FkZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhpZGVMb2FkZXIiLCJzaG93IiwiYWRkQ2xhc3MiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsInN2Z0NvbnRhaW5lciIsInN2ZyIsInByb2plY3RJZCIsIndpbmRvdyIsImFjdGlvbiIsImFqYXhVcmwiLCJwcm9qZWN0X2lkIiwiZHJvcGRvd24iLCJjb250ZW50IiwibWVkaXVtIiwicmVzdWx0IiwiYnV0dG9uc0h0bWwiLCJwcmV2aWV3SHRtbCIsImluc2VydEF0Q2FyZXQiLCJ3cmFwVGV4dFdpdGhUYWciLCJpbnB1dFVybCIsInByb21wdCIsImlucHV0QWx0IiwiaW5wdXRUZXh0IiwidGhlbWUiLCJlc2NhcGVLZXkiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsInRpdGxlIiwiZGVsYXkiLCJhbmltYXRlIiwib3BhY2l0eSIsImJpbmQiLCJkb2N1bWVudCIsImFqYXhFcnJvciIsImV2ZW50IiwicmVxdWVzdCIsInNldHRpbmdzIiwic2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbiIsIk1vYmlsZU1lbnUiLCJlbGVtZW50IiwiYWN0aXZhdG9yIiwiSEFNQlVSR0VSX0NPTlRBSU5FUiIsInVuZGVybGF5IiwiVU5ERVJMQVkiLCJpbml0IiwibG9nIiwiQ3NzQ2xhc3Nlc18iLCJJU19WSVNJQkxFIiwiTU9CSUxFX01FTlUiLCJvcGVuTWVudSIsImNsb3NlTWVudSIsIm1vYmlsZU1lbnUiLCJpbml0QWxsIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImhlYWRlciIsIkRJQUxPR19IRUFERVIiLCJESUFMT0dfQ09OVEVOVCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwicHVzaCIsImVyciIsInJlYWR5Iiwia2V5ZG93biIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJzZWxlY3RBbGxSb3dzIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJDb2x1bW5Ub2dnbGVUYWJsZSIsImhlYWQiLCJzZWxlY3Rvck1lbnUiLCJzZWxlY3RvckJ1dHRvbiIsIlRPR0dMRV9UQUJMRSIsIkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04iLCJDT0xVTU5fU0VMRUNUT1JfTUVOVSIsInRvZ2dsZUNvbHVtbiIsImNvbHVtbkluZGV4IiwidGFibGUiLCJjaGVja2VkIiwiY2hpbGRyZW4iLCJyZW1vdmVBdHRyIiwicmVmcmVzaCIsImhpZGVJbmRpY2VzIiwicmVmcmVzaEFsbCIsInRvZ2dsZVRhYmxlIiwiY29sdW1uU2VsZWN0b3JCdXR0b24iLCJjb2x1bW5TZWxlY3Rvck1lbnUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCIsIlNFQVJDSF9JTlBVVCIsIlNFQVJDSF9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQlVUVE9OIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwiY29uZmlybSIsImljb24iLCJidXR0b25zIiwiYnRuQ2xhc3MiLCJtZXRob2QiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJjYW5jZWwiLCJkZWxldGVUb3BpYyIsImRlbGV0ZSIsInNsb3ciLCJyZW1vdmUiLCJEb3RNZW51IiwiTWVudSIsImJ1dHRvbiIsIm1lbnUiLCJpc1RhYmxlRG90TWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIlRBQkxFX0RPVF9NRU5VIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImxlZnQiLCJwYXJzZUludCIsInRvcCIsInJpZ2h0IiwidG9nZ2xlIiwiZG90TWVudSIsIm1lbnVJZCIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNvbnRhaW5zIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0Iiwic3R1ZGVudElkIiwibWFya2VySWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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LEdBakJEO0FBa0JBLEVBaENEOztBQWtDQVYsUUFBTzVMLFNBQVAsQ0FBaUI0RCxJQUFqQixHQUF3QixZQUFVO0FBQ2pDLE1BQUkwSSxTQUFTLElBQWI7QUFDQWpRLElBQUVpUSxPQUFPTixnQkFBUCxDQUF3QnZHLFFBQTFCLEVBQW9DNUgsRUFBcEMsQ0FBdUMsT0FBdkMsRUFBZ0QsWUFBVztBQUFFK04sVUFBTzVMLFNBQVAsQ0FBaUJvTSxhQUFqQixDQUErQixJQUEvQixFQUFxQ0UsTUFBckM7QUFBK0MsR0FBNUc7QUFDQWpRLElBQUVpUSxPQUFPSixtQkFBUCxDQUEyQnpHLFFBQTdCLEVBQXVDNUgsRUFBdkMsQ0FBMEMsT0FBMUMsRUFBbUQsWUFBVztBQUFFK04sVUFBTzVMLFNBQVAsQ0FBaUJ3TSxnQkFBakIsQ0FBa0MsSUFBbEMsRUFBd0NGLE1BQXhDO0FBQWtELEdBQWxIO0FBQ0EsRUFKRDs7QUFNQVYsUUFBTzVMLFNBQVAsQ0FBaUJvRSxPQUFqQixHQUEyQixZQUFVO0FBQ3BDN0MsU0FBTyxRQUFQLElBQW1CLElBQUlxSyxNQUFKLEVBQW5CO0FBQ0EsRUFGRDs7QUFJQXRJLFlBQVd0RCxTQUFYLENBQXFCb0UsT0FBckI7QUFDQUMsUUFBT3JFLFNBQVAsQ0FBaUJvRSxPQUFqQjtBQUNBb0IsV0FBVXhGLFNBQVYsQ0FBb0JvRSxPQUFwQjtBQUNBc0MsbUJBQWtCMUcsU0FBbEIsQ0FBNEJvRSxPQUE1QjtBQUNBckQsV0FBVWYsU0FBVixDQUFvQm9FLE9BQXBCO0FBQ0F3SCxRQUFPNUwsU0FBUCxDQUFpQm9FLE9BQWpCO0FBQ0E4RixTQUFRbEssU0FBUixDQUFrQm9FLE9BQWxCO0FBQ0EsQ0FueUJBLEUiLCJmaWxlIjoiXFxqc1xcbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZlZjM2N2I1ZTk5MTk3MDkzMWI5IiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZJTEUgU1RSVUNUVVJFXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnwgIFx0MS4gQUpBWCBTZXR1cFxyXG58XHQyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxufFx0My4gT3RoZXJcclxufFxyXG4qL1xyXG5cclxuaW1wb3J0ICcuLi9qcy9jb21wb25lbnRzJztcclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG47JChmdW5jdGlvbigpIHtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0MS4gQUpBWCBTZXR1cFxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQkLmFqYXhTZXR1cCh7XHJcblx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpLFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHRpZigkKCcuc2hvdy0tc2Nyb2xsLXRvLXRvcCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0JCgnLm1haW4tY29udGVudCcpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBidXR0b24tLWFjY2VudCBzY3JvbGwtdG8tdG9wXCI+U2Nyb2xsIHRvIFRvcDwvYnV0dG9uPicpO1xyXG5cdH1cclxuXHJcblx0Ly8gQWNjZXNzaWJpbGl0eVxyXG5cdCQoJy5kcm9wZG93bicpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHQkKCcuZHJvcGRvd24gPiBidXR0b24nKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xyXG5cdCQoJy5kcm9wZG93biAuZHJvcGRvd24tY29udGVudCBhJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cclxuXHQvLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcblx0JCgnLnRvcGljcy1saXN0JykucHJlcGVuZCgkKCcuZmlyc3QnKSk7XHJcblx0JCgnLnRvcGljcy1saXN0IC5sb2FkZXInKS5mYWRlT3V0KDApO1xyXG5cdCQoJy50b3BpY3MtbGlzdCBsaScpLmZpcnN0KCkuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCwgZnVuY3Rpb24gc2hvd05leHRUb3BpYygpIHtcclxuXHRcdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIHNob3dOZXh0VG9waWMpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcub3JkZXItbGlzdC1qcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0XHQvLyBzb3J0VW5vcmRlcmVkTGlzdChsaXN0KTtcclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdsYXN0LW5hbWUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdhbHBoYS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkQWxwaGFIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ3RpdGxlLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRUaXRsZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCAzLiBPVEhFUlxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5lbWFpbC10YWJsZSAuY2hlY2tib3ggaW5wdXRcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc2VsZWN0ID0gZnVuY3Rpb24oZG9tKXtcclxuXHRcdFx0dmFyIHN0YXR1cyA9IGRvbS5wYXJlbnRzKCkuZXEoNCkuZGF0YSgnc3RhdHVzJyk7XHJcblx0XHRcdHZhciBlbWFpbFN0cmluZyA9IFwibWFpbHRvOlwiO1xyXG5cdFx0XHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcuZW1haWwtdGFibGUuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHRcdFx0dmFyIGVtYWlsQnV0dG9uc2VsZWN0b3IgPSBcIi5lbWFpbC1zZWxlY3RlZC5cIiArIHN0YXR1cztcclxuXHJcblx0XHRcdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdFx0XHRpZigkKHZhbHVlKS5pcyhcIjpjaGVja2VkXCIpICYmICEkKHZhbHVlKS5oYXNDbGFzcyhcIm1hc3Rlci1jaGVja2JveFwiKSkge1xyXG5cdFx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gJCh2YWx1ZSkuZGF0YSgnZW1haWwnKTtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxuXHRcdH07XHJcblx0XHRzZXRUaW1lb3V0KHNlbGVjdCgkKHRoaXMpKSwgMjAwMCk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuZW1haWwtc2VsZWN0ZWRcIiwgZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYoJCh0aGlzKS5wcm9wKCdocmVmJykgPT09ICdtYWlsdG86JyB8fCAkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gbnVsbCl7XHJcblx0XHRcdGFsZXJ0KFwiWW91IGhhdmVuJ3Qgc2VsZWN0ZWQgYW55b25lLlwiKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBFeHRlcm5hbCBsaW5rcyBnaXZlIGFuIGlsbHVzaW9uIG9mIEFKQVhcclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmV4dGVybmFsLWxpbmtcIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBlbGVtVG9IaWRlU2VsZWN0b3IgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1oaWRlLXNlbGVjdG9yJykpO1xyXG5cdFx0dmFyIGVsZW1Ub1JlcGxhY2UgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1yZXBsYWNlLXdpdGgtbG9hZGVyLXNlbGVjdG9yJykpO1xyXG5cclxuXHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdGVsZW1Ub0hpZGVTZWxlY3Rvci5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmhpZGUoKTtcclxuXHRcdGVsZW1Ub1JlcGxhY2UuYWZ0ZXIoJzxkaXYgaWQ9XCJjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lclwiIGNsYXNzPVwibG9hZGVyIGxvYWRlci0teC1sYXJnZVwiPjwvZGl2PicpO1xyXG5cclxuXHRcdCQoJyNjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBVc2VkIG9uIHRoZSBzdHVkZW50IGluZGV4IHBhZ2VcclxuXHQkKFwiI3NoYXJlLXByb2plY3QtZm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc2hhcmVfbmFtZSl7XHJcblx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1lvdXIgbmFtZSBpcyBiZWluZyBzaGFyZWQgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignJywgJ1lvdSBhcmUgbm8gbG9uZ2VyIHNoYXJpbmcgeW91ciBuYW1lIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoJyNzaGFyZV9uYW1lJykucHJvcCgnY2hlY2tlZCcsIHJlc3BvbnNlLnNoYXJlX25hbWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmhpZGUoKTtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuc2hvdygpO1xyXG5cdFx0XHRcdCQoJyNsb2dpbi11c2VybmFtZScsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuYWRkQ2xhc3MoXCJoYXMtZXJyb3JcIik7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyIHN1Ym1pdEJ1dHRvbiA9ICQodGhpcykuZmluZCgnOnN1Ym1pdCcpO1xyXG5cdFx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdWJtaXRCdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMuY3JlYXRlRWRpdFRvcGljRE9NKGRhdGFbXCJpZFwiXSwgZGF0YVtcIm5hbWVcIl0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gTkVXIFVTRVJcclxuXHQvLyBwdXQgdGhpcyBzdHVmZiBpbiBhbiBhcnJheVxyXG5cdC8vICQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0Ly8gJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHJcblx0Ly8gJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHQvLyBcdGlmKCQoJy5uZXctdXNlci1zdHVkZW50JykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHQvLyBcdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHQvLyBcdH0gZWxzZSB7XHJcblx0Ly8gXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gXHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdC8vIFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdC8vIFx0fSBlbHNlIHtcclxuXHQvLyBcdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHQvLyBcdH1cclxuXHQvLyB9KTtcclxuXHJcblx0JChcIi5mYXZvdXJpdGUtY29udGFpbmVyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHN2Z0NvbnRhaW5lciA9ICQodGhpcyk7XHJcblx0XHR2YXIgc3ZnID0gc3ZnQ29udGFpbmVyLmZpbmQoJ3N2ZycpO1xyXG5cdFx0dmFyIHByb2plY3RJZCA9IHdpbmRvd1sncHJvamVjdCddLmRhdGEoJ3Byb2plY3QtaWQnKTtcclxuXHJcblx0XHRzdmcuaGlkZSgwKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLnNob3coMCk7XHJcblxyXG5cdFx0aWYoc3ZnLmhhc0NsYXNzKCdmYXZvdXJpdGUnKSl7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAncmVtb3ZlJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL3JlbW92ZS1mYXZvdXJpdGUnO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAnYWRkJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL2FkZC1mYXZvdXJpdGUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihhY3Rpb24gPT0gXCJhZGRcIil7XHJcblx0XHRcdFx0XHRzdmcuYWRkQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzdmcucmVtb3ZlQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0c3ZnLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QpO1xyXG5cdFx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJ25hdi5tb2JpbGUgLnN1Yi1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZHJvcGRvd24gPSAkKHRoaXMpO1xyXG5cdFx0dmFyIGNvbnRlbnQgPSBkcm9wZG93bi5maW5kKCcuZHJvcGRvd24tY29udGVudCcpO1xyXG5cclxuXHRcdGlmKGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuaGlkZShjb25maWcuYW5pbXRpb25zLm1lZGl1bSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCB0cnVlKTtcclxuXHRcdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgZmFsc2UpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDE4MGRlZylcIik7XHJcblx0XHRcdGRyb3Bkb3duLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRjb250ZW50LnNob3coY29uZmlnLmFuaW10aW9ucy5tZWRpdW0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpe1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAnL3NuaXBwZXQ/c25pcHBldD1odG1sLWVkaXRvci10b29sYmFyJyxcclxuXHRcdFx0dHlwZTonR0VUJyxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXN1bHQpe1xyXG5cdFx0XHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5hZnRlcihyZXN1bHQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvbnNIdG1sID0gXCI8ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgZmxleCc+PGJ1dHRvbiBjbGFzcz0naHRtbCcgdHlwZT0nYnV0dG9uJz5IVE1MPC9idXR0b24+PGJ1dHRvbiBjbGFzcz0ncHJldmlldycgdHlwZT0nYnV0dG9uJz5QUkVWSUVXPC9idXR0b24+PC9kaXY+XCI7XHJcblx0XHR2YXIgcHJldmlld0h0bWwgPSBcIjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcic+PGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXByZXZpZXcnPjwvZGl2PjwvZGl2PlwiO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5iZWZvcmUoYnV0dG9uc0h0bWwpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yJykuYWZ0ZXIocHJldmlld0h0bWwpO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXcnKS5odG1sKCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldycpLmh0bWwoJCh0aGlzKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLmh0bWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLnByZXZpZXcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5zaG93KCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFRvZ2dsZSBsYWJlbCBmbGlwcyB0b2dnbGVcclxuXHQkKFwiLmh0bWwtZWRpdG9yXCIpLm9uKFwiY2xpY2tcIiwgXCIuaHRtbC1lZGl0b3ItLXRvb2xiYXIgbGkgYnV0dG9uXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRzd2l0Y2goJCh0aGlzKS5kYXRhKCd0eXBlJykpe1xyXG5cdFx0XHRjYXNlIFwibGluZWJyZWFrXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxicj4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJvbFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48b2w+XFxuXFx0PGxpPkl0ZW0gMTwvbGk+XFxuXFx0PGxpPkl0ZW0gMjwvbGk+XFxuXFx0PGxpPkl0ZW0gMzwvbGk+XFxuPC9vbD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ1bFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48dWw+XFxuXFx0PGxpPkl0ZW0geDwvbGk+XFxuXFx0PGxpPkl0ZW0geTwvbGk+XFxuXFx0PGxpPkl0ZW0gejwvbGk+XFxuPC91bD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJib2xkXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnYicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInR0XCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndHQnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpdGFsaWNcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdpJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidW5kZXJsaW5lXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImltZ1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBpbWFnZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0QWx0ID0gcHJvbXB0KFwiRW50ZXIgYWx0IHRleHRcIiwgXCJJbWFnZSBvZiBTdXNzZXggY2FtcHVzXCIpO1xyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8aW1nIGFsdD1cIicgKyBpbnB1dEFsdCArICdcIiBzcmM9XCInICsgaW5wdXRVcmwgKyAnXCI+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwibGlua1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0VGV4dCA9IHByb21wdChcIkVudGVyIGRpc3BsYXkgdGV4dFwiLCBcIlN1c3NleFwiKTtcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGEgaHJlZj1cIicgKyBpbnB1dFVybCArICdcIj4nICsgaW5wdXRUZXh0ICsgJzwvYT4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJjb2RlXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnY29kZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInByZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3ByZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImluZm9cIjpcclxuXHRcdFx0XHQkLmRpYWxvZyh7XHJcblx0XHRcdFx0XHR0aGVtZTogJ21hdGVyaWFsJyxcclxuXHRcdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0hUTUwgRWRpdG9yIEluZm8nLFxyXG5cdFx0XHRcdFx0Y29udGVudDogJ0FsbCBsaW5rcyB5b3UgYWRkIHdpbGwgb3BlbiBpbiBhIG5ldyB0YWIuIEFsbCBIVE1MIDUgZWxlbWVudHMgYXJlIHZhbGlkIGZvciB0aGUgZGVzY3JpcHRpb24gZmllbGQsIGV4Y2x1ZGluZzsgPGJyPjxicj4gPHVsPjxsaT5TY3JpcHQgdGFnczwvbGk+PGxpPkhlYWRpbmcgdGFnczwvbGk+PGxpPkhUTUwgcm9vdCB0YWdzPC9saT48bGk+Qm9keSB0YWdzPC9saT48L3VsPicsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PVxyXG5cdFx0OS4gSW5pdGlhbGlzZVxyXG5cdCAgID09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvLyBVc2VkIGFzIGFuIGVhc3kgd2F5IGZvciBmdW5jdGlvbnMgdG8gZ2V0IGN1cnJlbnQgcHJvamVjdCBkYXRhXHJcblx0aWYoJCgnLnByb2plY3QtY2FyZCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0d2luZG93Wydwcm9qZWN0J10gPSAkKCcucHJvamVjdC1jYXJkJyk7XHJcblx0fVxyXG5cclxuXHQkKCcuYW5pbWF0ZS1jYXJkcyAuY2FyZCcpLmNzcyhcIm9wYWNpdHlcIiwgMCk7XHJcblxyXG5cdHZhciBkZWxheSA9IDA7XHJcblx0JCgnLmFuaW1hdGUtY2FyZHMgLmNhcmQnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0ZGVsYXkgKz0gMjAwO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwic2xpZGVJblVwIGFuaW1hdGVkXCIpO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5hbmltYXRlKHtcclxuXHRcdFx0XHRvcGFjaXR5OiAxXHJcblx0XHRcdH0sIDgwMCk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpLCBkZWxheSk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uKCBldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MgKSB7XHJcblx0aWYoY29uZmlnLnNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24pe1xyXG5cdFx0c2hvd05vdGlmaWNhdGlvbignZXJyb3InLCAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGF0IHJlcXVlc3QuJyk7XHJcblx0fVxyXG59KTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG4vKiBGSUxFIFNUUlVDVFVSRVxyXG5cclxuKi9cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZJTEUgU1RSVUNUVVJFXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnxcdDEuIE1vYmlsZSBNZW51XHJcbnxcdDIuIERpYWxvZyAvIE1vZGFsXHJcbnxcdDMuIERhdGEgVGFibGVcclxufFx0NC4gQ29sdW1uIFRvZ2dsZSBUYWJsZVxyXG58XHQ1LiBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcbnxcdDYuIEVkaXQgVG9waWNzIFtBZG1pbl1cclxufFx0Ny4gTWVudVxyXG58XHJcbiovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuOyQoZnVuY3Rpb24oKSB7XHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQgMS4gTW9iaWxlIE1lbnVcclxuXHQgICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0XHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBtb2JpbGUgbWVudS5cclxuXHRcdCpcclxuXHRcdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgTW9iaWxlTWVudSA9ICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsZW1lbnQpIHtcclxuXHRcdGlmKHdpbmRvd1snTW9iaWxlTWVudSddID09IG51bGwpe1xyXG5cdFx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXSA9IHRoaXM7XHJcblx0XHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHRcdHRoaXMuYWN0aXZhdG9yID0gJCh0aGlzLlNlbGVjdG9yc18uSEFNQlVSR0VSX0NPTlRBSU5FUik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkgPSAkKHRoaXMuU2VsZWN0b3JzXy5VTkRFUkxBWSk7XHJcblx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJUaGVyZSBjYW4gb25seSBiZSBvbmUgbW9iaWxlIG1lbnUuXCIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdE1PQklMRV9NRU5VOiAnbmF2Lm1vYmlsZScsXHJcblx0XHRIQU1CVVJHRVJfQ09OVEFJTkVSOiAnLmhhbWJ1cmdlci1jb250YWluZXInLFxyXG5cdFx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0XHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtb2JpbGVNZW51ID0gdGhpcztcclxuXHRcdHRoaXMuYWN0aXZhdG9yLm9uKCdjbGljaycsIG1vYmlsZU1lbnUub3Blbk1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0XHR0aGlzLnVuZGVybGF5Lm9uKCdjbGljaycsIG1vYmlsZU1lbnUuY2xvc2VNZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5NT0JJTEVfTUVOVSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5tb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Mi4gRGlhbG9nIC8gTW9kYWxcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdHZhciBEaWFsb2cgPSBmdW5jdGlvbiBEaWFsb2coZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0XHR0aGlzLnVuZGVybGF5ID0gJCgnLnVuZGVybGF5Jyk7XHJcblx0XHR0aGlzLmhlYWRlciA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0hFQURFUik7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHJcblx0XHQvLyBSZWdpc3RlciBDb21wb25lbnRcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyhcInJlZ2lzdGVyZWRcIik7XHJcblxyXG5cdFx0Ly8gQVJJQVxyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJkaWFsb2ctdGl0bGVcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJkaWFsb2ctZGVzY1wiKTtcclxuXHRcdHRoaXMuaGVhZGVyLmF0dHIoJ3RpdGxlJywgdGhpcy5oZWFkZXIuZmluZCgnI2RpYWxvZy1kZXNjJykuaHRtbCgpKTtcclxuXHJcblx0XHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdFx0dGhpcy5sb2FkZXIgPSAkKGVsZW1lbnQpLmZpbmQoXCIubG9hZGVyXCIpO1xyXG5cdFx0dGhpcy5pc0Nsb3NhYmxlID0gdHJ1ZTtcclxuXHRcdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdFx0TE9BREVSOiAnPGRpdiBjbGFzcz1cImxvYWRlclwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4O3RvcDogMjUlO1wiPjwvZGl2PicsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdEFDVElWRTogJ2FjdGl2ZScsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RElBTE9HOiAnLmRpYWxvZycsXHJcblx0XHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0XHRESUFMT0dfQ09OVEVOVDogJy5jb250ZW50JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5sb2FkZXIuc2hvdygwKTtcclxuXHRcdHRoaXMuY29udGVudC5oaWRlKDApO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZUxvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5oaWRlKDApO1xyXG5cdFx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIiwgdGhpcy5kaWFsb2dOYW1lKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR3aW5kb3dbJ0RpYWxvZyddID0gdGhpcztcclxuXHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZURpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmlzQ2xvc2FibGUgJiYgdGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIikgPT0gdGhpcy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHRcdHZhciBkaWFsb2cgPSB0aGlzO1xyXG5cclxuXHRcdC8vIEZpbmQgYWN0aXZhdG9yIGJ1dHRvblxyXG5cdFx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdhY3RpdmF0b3InKSAmJiAkKHRoaXMpLmRhdGEoJ2RpYWxvZycpID09IGRpYWxvZy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0XHRkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucy5wdXNoKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHRkaWFsb2cuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0ZGlhbG9nLnVuZGVybGF5Lm9uKCdjbGljaycsIGRpYWxvZy5oaWRlRGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblxyXG5cdFx0dHJ5e1xyXG5cdFx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykub24oJ2NsaWNrJywgZGlhbG9nLnNob3dEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoKGVycil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJEaWFsb2cgXCIgKyBkaWFsb2cuZGlhbG9nTmFtZSArIFwiIGhhcyBubyBhY3RpdmF0b3IgYnV0dG9uLlwiKTtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZGlhbG9nID0gbmV3IERpYWxvZyh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzKS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZS5rZXlDb2RlID09IDI3ICYmIHdpbmRvd1snRGlhbG9nJ10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snRGlhbG9nJ10uaGlkZURpYWxvZygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydNb2JpbGVNZW51J10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDMuIERhdGEgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHRcdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0XHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdFx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0XHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0XHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRcdGlmIChyb3cpIHtcclxuXHRcdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuIENvbHVtbiBUb2dnbGUgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQ29sdW1uVG9nZ2xlVGFibGUgPSBmdW5jdGlvbiBDb2x1bW5Ub2dnbGVUYWJsZShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5oZWFkID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0cicpO1xyXG5cdFx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdFx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBudWxsO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydDb2x1bW5Ub2dnbGVUYWJsZSddID0gQ29sdW1uVG9nZ2xlVGFibGU7XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRUT0dHTEVfVEFCTEU6ICcudGFibGUtY29sdW1uLXRvZ2dsZSdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9CVVRUT046ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGRvdC1tZW51X19hY3RpdmF0b3JcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1sZWZ0OmF1dG87XCI+Q29sdW1uczwvYnV0dG9uPicsXHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfTUVOVTogJzx1bCBjbGFzcz1cImRvdC1tZW51IGRvdC1tZW51LS1ib3R0b20tbGVmdFwiPjwvdWw+J1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblxyXG5cdFx0dG9nZ2xlQ29sdW1uOiBmdW5jdGlvbihjb2x1bW5JbmRleCwgdGFibGUsIGNoZWNrZWQpIHtcclxuXHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5yZW1vdmVBdHRyKCdoaWRkZW4nKTtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmF0dHIoJ2hpZGRlbicsIFwidHJ1ZVwiKTtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJlZnJlc2g6IGZ1bmN0aW9uKHRhYmxlKSB7XHJcblx0XHRcdHZhciBoaWRlSW5kaWNlcyA9IFtdO1xyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MgPSB0YWJsZS5lbGVtZW50LmZpbmQoJ3Rib2R5IHRyJyk7XHJcblxyXG5cdFx0XHR0YWJsZS5oZWFkZXJzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZigkKHRoaXMpLmF0dHIoJ2hpZGRlbicpKXtcclxuXHRcdFx0XHRcdGhpZGVJbmRpY2VzLnB1c2goJCh0aGlzKS5pbmRleCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGlkZUluZGljZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShoaWRlSW5kaWNlc1tpXSkuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJlZnJlc2hBbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnJlZnJlc2godGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRpZighdGhpcy5lbGVtZW50LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkNvbHVtblRvZ2dsZVRhYmxlIHJlcXVpcmVzIHRoZSB0YWJsZSB0byBoYXZlIGFuIHVuaXF1ZSBJRC5cIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdG9nZ2xlVGFibGUgPSB0aGlzO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX0JVVFRPTik7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JNZW51ID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX01FTlUpO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkID0gJ0NvbHVtblRvZ2dsZVRhYmxlLScgKyB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmJlZm9yZShjb2x1bW5TZWxlY3RvckJ1dHRvbik7XHJcblxyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYWZ0ZXIoY29sdW1uU2VsZWN0b3JNZW51KTtcclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JNZW51LmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgKyAnLW1lbnUnKTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gY29sdW1uU2VsZWN0b3JCdXR0b247XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IGNvbHVtblNlbGVjdG9yTWVudTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudS5maW5kKCd1bCcpLmRhdGEoXCJ0YWJsZVwiLCB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJykpO1xyXG5cclxuXHRcdHRoaXMuaGVhZGVycy5lYWNoKGZ1bmN0aW9uICgpe1xyXG5cdFx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuZGF0YShcImRlZmF1bHRcIikgPyBcImNoZWNrZWRcIiA6IFwiXCI7XHJcblx0XHRcdCQodGhpcykuZGF0YSgndmlzaWJsZScsICQodGhpcykuZGF0YShcImRlZmF1bHRcIikpO1xyXG5cclxuXHRcdFx0Y29sdW1uU2VsZWN0b3JNZW51LmFwcGVuZCgnXFxcclxuXHRcdFx0XHQ8bGkgY2xhc3M9XCJkb3QtbWVudV9faXRlbSBkb3QtbWVudV9faXRlbS0tcGFkZGVkXCI+IFxcXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4gXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY29sdW1uLXRvZ2dsZVwiIGlkPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIiB0eXBlPVwiY2hlY2tib3hcIiAnKyBjaGVja2VkICsnPiBcXFxyXG5cdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIj4nICsgJCh0aGlzKS50ZXh0KCkgKyAnPC9sYWJlbD4gXFxcclxuXHRcdFx0XHRcdDwvZGl2PiBcXFxyXG5cdFx0XHRcdDwvbGk+Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5jb2x1bW4tdG9nZ2xlXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpbmRleCA9ICQoJy5jb2x1bW4tdG9nZ2xlJykuaW5kZXgodGhpcyk7XHJcblx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMudG9nZ2xlQ29sdW1uKGluZGV4LCB0b2dnbGVUYWJsZSwgJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUgPSBuZXcgQ29sdW1uVG9nZ2xlVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ1IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG5cdHdpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRcdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0XHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0XHRTUEFDRTogMzIsXHJcblx0XHRFTlRFUjogMTMsXHJcblx0XHRDT01NQTogNDVcclxuXHR9O1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU0VBUkNIXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdFx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdFx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHRcdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHRcdHRoaXMudG9waWNOYW1lSW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRORVdfVE9QSUM6ICcvdG9waWNzLydcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdGVkaXRUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRcdGlmKHRvcGljLm9yaWdpbmFsTmFtZSA9PSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSl7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQuY29uZmlybSh7XHJcblx0XHRcdFx0dGl0bGU6ICdDaGFuZ2UgVG9waWMgTmFtZScsXHJcblx0XHRcdFx0dHlwZTogJ2JsdWUnLFxyXG5cdFx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIDxiPlwiJyArICB0b3BpYy5vcmlnaW5hbE5hbWUgKyAnXCI8L2I+IHRvIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCB0b3BpYy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19uYW1lIDogdG9waWMudG9waWNOYW1lSW5wdXQudmFsKClcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLm9yaWdpbmFsTmFtZSA9IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2FuY2VsOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRlbGV0ZVRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZScsXHJcblx0XHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArICdcIjwvYj4/JyxcclxuXHRcdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0XHRkZWxldGU6IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lbGVtZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5zbG93LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRjcmVhdGVFZGl0VG9waWNET006IGZ1bmN0aW9uKHRvcGljSWQsIG9yaWdpbmFsTmFtZSl7XHJcblx0XHRcdCQoXCIuZWRpdC10b3BpYy1saXN0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyB0b3BpY0lkICsnXCIgZGF0YS1vcmlnaW5hbC10b3BpYy1uYW1lPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxpbnB1dCBzcGVsbGNoZWNrPVwidHJ1ZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGVkaXQtdG9waWNcIiB0eXBlPVwic3VibWl0XCI+RWRpdDwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidXR0b24gZGVsZXRlLXRvcGljIGJ1dHRvbi0tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC9saT4nKTtcclxuXHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGVkaXRUb3BpYyA9IHRoaXM7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5lZGl0VG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdFx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5FZGl0VG9waWMgPSBuZXcgRWRpdFRvcGljKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNyBEb3RNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIERvdE1lbnUgPSBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMubWVudSA9IG51bGw7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RE9UX01FTlU6ICcuZG90LW1lbnUnLFxyXG5cdFx0QUNUSVZBVE9SOiAnLmRvdC1tZW51X19hY3RpdmF0b3InLFxyXG5cdFx0SVNfVklTSUJMRTogJy5pcy12aXNpYmxlJyxcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJyxcclxuXHRcdEJPVFRPTV9MRUZUOiAnZG90LW1lbnUtLWJvdHRvbS1sZWZ0JyxcclxuXHRcdEJPVFRPTV9SSUdIVDogJ2RvdC1tZW51LS1ib3R0b20tcmlnaHQnLFxyXG5cdFx0VE9QX0xFRlQ6ICdkb3QtbWVudS0tdG9wLWxlZnQnLFxyXG5cdFx0VE9QX1JJR0hUOiAnZG90LW1lbnUtLXRvcC1yaWdodCcsXHJcblx0XHRUQUJMRV9ET1RfTUVOVTogJ2RvdC1tZW51LS10YWJsZSdcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJ1dHRvblJlY3QgPSB0aGlzLmJ1dHRvblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIGxlZnQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LnJpZ2h0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSBsZWZ0Jyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKHRoaXMpKCk7XHJcblx0XHR0aGlzLm1lbnUuYWRkQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLm1lbnUucmVtb3ZlQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuaGlkZSgpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZCh0aGlzKSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuc2hvdy5iaW5kKHRoaXMpKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvdE1lbnUgPSB0aGlzO1xyXG5cdFx0dmFyIG1lbnVJZCA9ICQodGhpcy5idXR0b24pLmF0dHIoJ2lkJykgKyAnLW1lbnUnO1xyXG5cclxuXHRcdHRoaXMubWVudSA9ICQoJyMnICsgbWVudUlkKTtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSB0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uVEFCTEVfRE9UX01FTlUpO1xyXG5cclxuXHRcdHRoaXMuYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGlmKCF0YXJnZXQuaXMoZG90TWVudS5tZW51KSB8fCAhdGFyZ2V0LmlzKGRvdE1lbnUuYnV0dG9uKSkge1xyXG5cdFx0XHRcdGlmKCEkLmNvbnRhaW5zKCQoZG90TWVudS5tZW51KVswXSwgZS50YXJnZXQpKXtcclxuXHRcdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uQUNUSVZBVE9SKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkRvdE1lbnUgPSBuZXcgRG90TWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0NS4gU2Vjb25kIE1hcmtlclxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHR2YXIgTWFya2VyID0gZnVuY3Rpb24gTWFya2VyKCkge1xyXG5cdFx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdFx0dGhpcy5zdHVkZW50VGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvclRhYmxlID0gJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIik7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JEYXRhVGFibGUgPSB0aGlzLnN1cGVydmlzb3JUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdFx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdtYXJrZXItaWQnKSA9PSByb3cuZGF0YSgnc3VwZXJ2aXNvci1pZCcpKXtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdFx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksXHJcblx0XHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5yZXNldFZpZXcgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0XHQkKFwiI3N0dWRlbnQtbmFtZVwiKS50ZXh0KHN0dWRlbnROYW1lKTtcclxuXHRcdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdFx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHRcdCQoXCIjcHJvamVjdC10aXRsZVwiKS5odG1sKCc8Yj5UaXRsZTogPC9iPicgKyBwcm9qZWN0Wyd0aXRsZSddKTtcclxuXHRcdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0WydkZXNjcmlwdGlvbiddKTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHR9XHJcblxyXG5cdCQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHdpbmRvd1snTWFya2VyJ107XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9O1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdHZhciBwcm9qZWN0SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKVsnaWQnXTtcclxuXHRcdHZhciBzdHVkZW50SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtaWQnKTtcclxuXHRcdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0XHR1cmw6IG1hcmtlci5VcmxzXy5BU1NJR05fTUFSS0VSLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkLFxyXG5cdFx0XHRcdHN0dWRlbnRfaWQ6IHN0dWRlbnRJZCxcclxuXHRcdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LnJlbW92ZSgpO1xyXG5cdFx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB0aGlzO1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCh0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTsgfSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxuXHR9XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREaWFsb2cucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==