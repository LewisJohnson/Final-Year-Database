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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_components__ = __webpack_require__(12);
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
	// todo: add automatic email, when username field is filled out, put username@sussex.ac.uk in the email field
	// todo: if student is selected, deselect the rest and disable them (likewise for other checkboxes)

	$('.user-form #username').on('change', function () {
		$('.user-form #email').val($(this).val() + "@sussex.ac.uk");
	});

	$('#supervisor-form').hide();
	$('#student-form').hide();

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

		if (window['project'] != null) {
			var projectId = window['project'].data('project-id');
		} else {
			var projectId = $(this).data('project-id');
		}

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

	// HTML EDITOR
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

	$('.student-undo-select').on('click', function (e) {
		var card = $(this).parent();

		$.confirm({
			title: 'Undo Project Selection',
			type: 'red',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			backgroundDismiss: true,
			animateFromElement: false,
			autoClose: 'cancel|10000',
			content: 'Are you sure you want to un-select your selected project?</b>',
			buttons: {
				confirm: {
					btnClass: 'btn-red',
					action: function action() {
						$.ajax({
							method: 'PATCH',
							url: '/students/undo-selected-project',
							success: function success(response) {
								if (response.successful) {
									card.hide(400, function () {
										card.remove();
									});
									showNotification('success', 'Undo successful.');
								} else {
									showNotification('error', response.message);
								}
							}
						});
					}
				},
				cancel: {}
			}
		});
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

/***/ 12:
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjZiNTViMTUxNWQwY2E0MzY2MGMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIm9uIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVxIiwiZGF0YSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpbmRleCIsInZhbHVlIiwiaXMiLCJwcm9wIiwic2V0VGltZW91dCIsImUiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInJlbW92ZUNsYXNzIiwiaGlkZSIsImFmdGVyIiwiY3NzIiwiYWpheCIsInVybCIsInR5cGUiLCJzZXJpYWxpemUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJzaGFyZV9uYW1lIiwic2hvd05vdGlmaWNhdGlvbiIsIkFqYXhGdW5jdGlvbnMiLCJwcm90b3R5cGUiLCJTZWxlY3RvcnNfIiwiTE9HX0lOX0RJQUxPRyIsImRpYWxvZyIsInNob3dMb2FkZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhpZGVMb2FkZXIiLCJzaG93IiwiYWRkQ2xhc3MiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiSlNPTiIsInBhcnNlIiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsInN2Z0NvbnRhaW5lciIsInN2ZyIsIndpbmRvdyIsInByb2plY3RJZCIsImFjdGlvbiIsImFqYXhVcmwiLCJwcm9qZWN0X2lkIiwiZHJvcGRvd24iLCJjb250ZW50IiwibWVkaXVtIiwicmVzdWx0IiwiYnV0dG9uc0h0bWwiLCJwcmV2aWV3SHRtbCIsImluc2VydEF0Q2FyZXQiLCJ3cmFwVGV4dFdpdGhUYWciLCJpbnB1dFVybCIsInByb21wdCIsImlucHV0QWx0IiwiaW5wdXRUZXh0IiwidGhlbWUiLCJlc2NhcGVLZXkiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsInRpdGxlIiwiY2FyZCIsInBhcmVudCIsImNvbmZpcm0iLCJpY29uIiwiYXV0b0Nsb3NlIiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwibWV0aG9kIiwic3VjY2Vzc2Z1bCIsInJlbW92ZSIsIm1lc3NhZ2UiLCJjYW5jZWwiLCJkZWxheSIsImFuaW1hdGUiLCJvcGFjaXR5IiwiYmluZCIsImRvY3VtZW50IiwiYWpheEVycm9yIiwiZXZlbnQiLCJyZXF1ZXN0Iiwic2V0dGluZ3MiLCJzaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uIiwiTW9iaWxlTWVudSIsImVsZW1lbnQiLCJhY3RpdmF0b3IiLCJIQU1CVVJHRVJfQ09OVEFJTkVSIiwidW5kZXJsYXkiLCJVTkRFUkxBWSIsImluaXQiLCJsb2ciLCJDc3NDbGFzc2VzXyIsIklTX1ZJU0lCTEUiLCJNT0JJTEVfTUVOVSIsIm9wZW5NZW51IiwiY2xvc2VNZW51IiwibW9iaWxlTWVudSIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiaGVhZGVyIiwiRElBTE9HX0hFQURFUiIsIkRJQUxPR19DT05URU5UIiwiSHRtbFNuaXBwZXRzXyIsIkxPQURFUiIsImxvYWRlciIsImlzQ2xvc2FibGUiLCJhY3RpdmF0b3JCdXR0b25zIiwiQUNUSVZFIiwiRElBTE9HIiwic2hvd0RpYWxvZyIsImhpZGVEaWFsb2ciLCJwdXNoIiwiZXJyIiwicmVhZHkiLCJrZXlkb3duIiwia2V5Q29kZSIsIkRhdGFUYWJsZSIsImJvZHlSb3dzIiwiZm9vdFJvd3MiLCJyb3dzIiwibWVyZ2UiLCJjaGVja2JveGVzIiwiQ0hFQ0tCT1giLCJtYXN0ZXJDaGVja2JveCIsIk1BU1RFUl9DSEVDS0JPWCIsIkRBVEFfVEFCTEUiLCJJU19TRUxFQ1RFRCIsInNlbGVjdEFsbFJvd3MiLCJzZWxlY3RSb3ciLCJjaGVja2JveCIsInJvdyIsImRhdGFUYWJsZSIsInByb3h5IiwiaSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJyZWZyZXNoQWxsIiwidG9nZ2xlVGFibGUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbiIsImNvbHVtblNlbGVjdG9yTWVudSIsImNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInJlbW92ZUFsbFNoYWRvd0NsYXNzZXMiLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJibHVyIiwib3JpZ2luYWxOYW1lIiwidG9waWNJZCIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwidG9waWMiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkZWxldGVUb3BpYyIsImRlbGV0ZSIsInNsb3ciLCJEb3RNZW51IiwiTWVudSIsImJ1dHRvbiIsIm1lbnUiLCJpc1RhYmxlRG90TWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIlRBQkxFX0RPVF9NRU5VIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImxlZnQiLCJwYXJzZUludCIsInRvcCIsInJpZ2h0IiwidG9nZ2xlIiwiZG90TWVudSIsIm1lbnVJZCIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNvbnRhaW5zIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0Iiwic3R1ZGVudElkIiwibWFya2VySWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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TyxRQUFQLElBQW1CLElBQUkySyxNQUFKLEVBQW5CO0FBQ0EsRUFGRDs7QUFJQS9ILFlBQVdwRSxTQUFYLENBQXFCa0YsT0FBckI7QUFDQUMsUUFBT25GLFNBQVAsQ0FBaUJrRixPQUFqQjtBQUNBb0IsV0FBVXRHLFNBQVYsQ0FBb0JrRixPQUFwQjtBQUNBc0MsbUJBQWtCeEgsU0FBbEIsQ0FBNEJrRixPQUE1QjtBQUNBakUsV0FBVWpCLFNBQVYsQ0FBb0JrRixPQUFwQjtBQUNBaUgsUUFBT25NLFNBQVAsQ0FBaUJrRixPQUFqQjtBQUNBdUYsU0FBUXpLLFNBQVIsQ0FBa0JrRixPQUFsQjtBQUNBLENBbnlCQSxFIiwiZmlsZSI6IlxcanNcXG1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjZiNTViMTUxNWQwY2E0MzY2MGMiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgRklMRSBTVFJVQ1RVUkVcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCAgXHQxLiBBSkFYIFNldHVwXHJcbnxcdDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG58XHQzLiBPdGhlclxyXG58XHJcbiovXHJcblxyXG5pbXBvcnQgJy4uL2pzL2NvbXBvbmVudHMnO1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09XHJcblx0XHQxLiBBSkFYIFNldHVwXHJcblx0ICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cdCQuYWpheFNldHVwKHtcclxuXHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0J1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JyksXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Mi4gSFRNTCBNb2RpZmljYXRpb25zXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdGlmKCQoJy5zaG93LS1zY3JvbGwtdG8tdG9wJykubGVuZ3RoID4gMCl7XHJcblx0XHQkKCcubWFpbi1jb250ZW50JykuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGJ1dHRvbi0tYWNjZW50IHNjcm9sbC10by10b3BcIj5TY3JvbGwgdG8gVG9wPC9idXR0b24+Jyk7XHJcblx0fVxyXG5cclxuXHQvLyBBY2Nlc3NpYmlsaXR5XHJcblx0JCgnLmRyb3Bkb3duJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cdCQoJy5kcm9wZG93biA+IGJ1dHRvbicpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XHJcblx0JCgnLmRyb3Bkb3duIC5kcm9wZG93bi1jb250ZW50IGEnKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblxyXG5cdC8vIE1ha2VzIHByaW1hcnkgdG9waWMgZmlyc3RcclxuXHQkKCcudG9waWNzLWxpc3QnKS5wcmVwZW5kKCQoJy5maXJzdCcpKTtcclxuXHQkKCcudG9waWNzLWxpc3QgLmxvYWRlcicpLmZhZGVPdXQoMCk7XHJcblx0JCgnLnRvcGljcy1saXN0IGxpJykuZmlyc3QoKS5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0LCBmdW5jdGlvbiBzaG93TmV4dFRvcGljKCkge1xyXG5cdFx0JCh0aGlzKS5uZXh0KCBcIi50b3BpY3MtbGlzdCBsaVwiICkuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCwgc2hvd05leHRUb3BpYyk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5vcmRlci1saXN0LWpzJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHZhciBsaXN0ID0gJCh0aGlzKTtcclxuXHRcdC8vIHNvcnRVbm9yZGVyZWRMaXN0KGxpc3QpO1xyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ2xhc3QtbmFtZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkTGFzdE5hbWVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ2FscGhhLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRBbHBoYUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygndGl0bGUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZFRpdGxlSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0IDMuIE9USEVSXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2hhbmdlXCIsIFwiLmVtYWlsLXRhYmxlIC5jaGVja2JveCBpbnB1dFwiLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzZWxlY3QgPSBmdW5jdGlvbihkb20pe1xyXG5cdFx0XHR2YXIgc3RhdHVzID0gZG9tLnBhcmVudHMoKS5lcSg0KS5kYXRhKCdzdGF0dXMnKTtcclxuXHRcdFx0dmFyIGVtYWlsU3RyaW5nID0gXCJtYWlsdG86XCI7XHJcblx0XHRcdHZhciBjaGVja2JveFNlbGVjdG9yID0gJy5lbWFpbC10YWJsZS4nICsgc3RhdHVzICsgJyAuY2hlY2tib3ggaW5wdXQnO1xyXG5cdFx0XHR2YXIgZW1haWxCdXR0b25zZWxlY3RvciA9IFwiLmVtYWlsLXNlbGVjdGVkLlwiICsgc3RhdHVzO1xyXG5cclxuXHRcdFx0JChjaGVja2JveFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0XHRcdGlmKCQodmFsdWUpLmlzKFwiOmNoZWNrZWRcIikgJiYgISQodmFsdWUpLmhhc0NsYXNzKFwibWFzdGVyLWNoZWNrYm94XCIpKSB7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSAkKHZhbHVlKS5kYXRhKCdlbWFpbCcpO1xyXG5cdFx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gXCIsXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0JChlbWFpbEJ1dHRvbnNlbGVjdG9yKS5wcm9wKCdocmVmJywgZW1haWxTdHJpbmcpO1xyXG5cdFx0fTtcclxuXHRcdHNldFRpbWVvdXQoc2VsZWN0KCQodGhpcykpLCAyMDAwKTtcclxuXHR9KTtcclxuXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5lbWFpbC1zZWxlY3RlZFwiLCBmdW5jdGlvbihlKSB7XHJcblx0XHRpZigkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gJ21haWx0bzonIHx8ICQodGhpcykucHJvcCgnaHJlZicpID09PSBudWxsKXtcclxuXHRcdFx0YWxlcnQoXCJZb3UgaGF2ZW4ndCBzZWxlY3RlZCBhbnlvbmUuXCIpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIEV4dGVybmFsIGxpbmtzIGdpdmUgYW4gaWxsdXNpb24gb2YgQUpBWFxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuZXh0ZXJuYWwtbGlua1wiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIGVsZW1Ub0hpZGVTZWxlY3RvciA9ICQoJCh0aGlzKS5kYXRhKCdlbGVtZW50LXRvLWhpZGUtc2VsZWN0b3InKSk7XHJcblx0XHR2YXIgZWxlbVRvUmVwbGFjZSA9ICQoJCh0aGlzKS5kYXRhKCdlbGVtZW50LXRvLXJlcGxhY2Utd2l0aC1sb2FkZXItc2VsZWN0b3InKSk7XHJcblxyXG5cdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdFx0ZWxlbVRvSGlkZVNlbGVjdG9yLmhpZGUoKTtcclxuXHRcdGVsZW1Ub1JlcGxhY2UuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5hZnRlcignPGRpdiBpZD1cImNvbnRlbnQtcmVwbGFjZWQtY29udGFpbmVyXCIgY2xhc3M9XCJsb2FkZXIgbG9hZGVyLS14LWxhcmdlXCI+PC9kaXY+Jyk7XHJcblxyXG5cdFx0JCgnI2NvbnRlbnQtcmVwbGFjZWQtY29udGFpbmVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFVzZWQgb24gdGhlIHN0dWRlbnQgaW5kZXggcGFnZVxyXG5cdCQoXCIjc2hhcmUtcHJvamVjdC1mb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc2hhcmVfbmFtZSl7XHJcblx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1lvdXIgbmFtZSBpcyBiZWluZyBzaGFyZWQgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignJywgJ1lvdSBhcmUgbm8gbG9uZ2VyIHNoYXJpbmcgeW91ciBuYW1lIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoJyNzaGFyZV9uYW1lJykucHJvcCgnY2hlY2tlZCcsIHJlc3BvbnNlLnNoYXJlX25hbWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmhpZGUoKTtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuc2hvdygpO1xyXG5cdFx0XHRcdCQoJyNsb2dpbi11c2VybmFtZScsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuYWRkQ2xhc3MoXCJoYXMtZXJyb3JcIik7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyIHN1Ym1pdEJ1dHRvbiA9ICQodGhpcykuZmluZCgnOnN1Ym1pdCcpO1xyXG5cdFx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdWJtaXRCdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMuY3JlYXRlRWRpdFRvcGljRE9NKGRhdGFbXCJpZFwiXSwgZGF0YVtcIm5hbWVcIl0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gTkVXIFVTRVJcclxuXHQvLyBwdXQgdGhpcyBzdHVmZiBpbiBhbiBhcnJheVxyXG5cdC8vIHRvZG86IGFkZCBhdXRvbWF0aWMgZW1haWwsIHdoZW4gdXNlcm5hbWUgZmllbGQgaXMgZmlsbGVkIG91dCwgcHV0IHVzZXJuYW1lQHN1c3NleC5hYy51ayBpbiB0aGUgZW1haWwgZmllbGRcclxuXHQvLyB0b2RvOiBpZiBzdHVkZW50IGlzIHNlbGVjdGVkLCBkZXNlbGVjdCB0aGUgcmVzdCBhbmQgZGlzYWJsZSB0aGVtIChsaWtld2lzZSBmb3Igb3RoZXIgY2hlY2tib3hlcylcclxuXHJcblx0JCgnLnVzZXItZm9ybSAjdXNlcm5hbWUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy51c2VyLWZvcm0gI2VtYWlsJykudmFsKCQodGhpcykudmFsKCkgKyBcIkBzdXNzZXguYWMudWtcIik7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHJcblx0JCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdGlmKCQoJy5uZXctdXNlci1zdHVkZW50JykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0XHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JChcIi5mYXZvdXJpdGUtY29udGFpbmVyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHN2Z0NvbnRhaW5lciA9ICQodGhpcyk7XHJcblx0XHR2YXIgc3ZnID0gc3ZnQ29udGFpbmVyLmZpbmQoJ3N2ZycpO1xyXG5cclxuXHRcdGlmKHdpbmRvd1sncHJvamVjdCddICE9IG51bGwpe1xyXG5cdFx0XHR2YXIgcHJvamVjdElkID0gd2luZG93Wydwcm9qZWN0J10uZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHByb2plY3RJZCA9ICQodGhpcykuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN2Zy5oaWRlKDApO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuc2hvdygwKTtcclxuXHJcblx0XHRpZihzdmcuaGFzQ2xhc3MoJ2Zhdm91cml0ZScpKXtcclxuXHRcdFx0dmFyIGFjdGlvbiA9ICdyZW1vdmUnO1xyXG5cdFx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvcmVtb3ZlLWZhdm91cml0ZSc7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGFjdGlvbiA9ICdhZGQnO1xyXG5cdFx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvYWRkLWZhdm91cml0ZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKGFjdGlvbiA9PSBcImFkZFwiKXtcclxuXHRcdFx0XHRcdHN2Zy5hZGRDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHN2Zy5yZW1vdmVDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRzdmcuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCk7XHJcblx0XHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLmhpZGUoMCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnbmF2Lm1vYmlsZSAuc3ViLWRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBkcm9wZG93biA9ICQodGhpcyk7XHJcblx0XHR2YXIgY29udGVudCA9IGRyb3Bkb3duLmZpbmQoJy5kcm9wZG93bi1jb250ZW50Jyk7XHJcblxyXG5cdFx0aWYoZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBmYWxzZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5oaWRlKGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIHRydWUpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBmYWxzZSk7XHJcblxyXG5cdFx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMTgwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuc2hvdyhjb25maWcuYW5pbXRpb25zLm1lZGl1bSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHQvLyBIVE1MIEVESVRPUlxyXG5cdCQoJy5odG1sLWVkaXRvcicpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKXtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJy9zbmlwcGV0P3NuaXBwZXQ9aHRtbC1lZGl0b3ItdG9vbGJhcicsXHJcblx0XHRcdHR5cGU6J0dFVCcsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzdWx0KXtcclxuXHRcdFx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykuYWZ0ZXIocmVzdWx0KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBidXR0b25zSHRtbCA9IFwiPGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXRvcC1idXR0b25zIGZsZXgnPjxidXR0b24gY2xhc3M9J2h0bWwnIHR5cGU9J2J1dHRvbic+SFRNTDwvYnV0dG9uPjxidXR0b24gY2xhc3M9J3ByZXZpZXcnIHR5cGU9J2J1dHRvbic+UFJFVklFVzwvYnV0dG9uPjwvZGl2PlwiO1xyXG5cdFx0dmFyIHByZXZpZXdIdG1sID0gXCI8ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInPjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS1wcmV2aWV3Jz48L2Rpdj48L2Rpdj5cIjtcclxuXHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykuYmVmb3JlKGJ1dHRvbnNIdG1sKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvcicpLmFmdGVyKHByZXZpZXdIdG1sKTtcclxuXHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3JykuaHRtbCgkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykudmFsKCkpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXcnKS5odG1sKCQodGhpcykudmFsKCkpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuaHRtbC1lZGl0b3ItLXRvcC1idXR0b25zIC5odG1sJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5zaG93KCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXRvb2xiYXInKS5zaG93KCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuaHRtbC1lZGl0b3ItLXRvcC1idXR0b25zIC5wcmV2aWV3Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXRvb2xiYXInKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJykuc2hvdygpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBUb2dnbGUgbGFiZWwgZmxpcHMgdG9nZ2xlXHJcblx0JChcIi5odG1sLWVkaXRvclwiKS5vbihcImNsaWNrXCIsIFwiLmh0bWwtZWRpdG9yLS10b29sYmFyIGxpIGJ1dHRvblwiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0c3dpdGNoKCQodGhpcykuZGF0YSgndHlwZScpKXtcclxuXHRcdFx0Y2FzZSBcImxpbmVicmVha1wiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8YnI+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwib2xcIjpcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnXFxuPG9sPlxcblxcdDxsaT5JdGVtIDE8L2xpPlxcblxcdDxsaT5JdGVtIDI8L2xpPlxcblxcdDxsaT5JdGVtIDM8L2xpPlxcbjwvb2w+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidWxcIjpcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnXFxuPHVsPlxcblxcdDxsaT5JdGVtIHg8L2xpPlxcblxcdDxsaT5JdGVtIHk8L2xpPlxcblxcdDxsaT5JdGVtIHo8L2xpPlxcbjwvdWw+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiYm9sZFwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ2InKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ0dFwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3R0Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiaXRhbGljXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnaScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInVuZGVybGluZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3UnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpbWdcIjpcclxuXHRcdFx0XHR2YXIgaW5wdXRVcmwgPSBwcm9tcHQoXCJFbnRlciB0aGUgaW1hZ2UgVVJMXCIsIFwiaHR0cHM6Ly93d3cuXCIpO1xyXG5cdFx0XHRcdHZhciBpbnB1dEFsdCA9IHByb21wdChcIkVudGVyIGFsdCB0ZXh0XCIsIFwiSW1hZ2Ugb2YgU3Vzc2V4IGNhbXB1c1wiKTtcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGltZyBhbHQ9XCInICsgaW5wdXRBbHQgKyAnXCIgc3JjPVwiJyArIGlucHV0VXJsICsgJ1wiPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImxpbmtcIjpcclxuXHRcdFx0XHR2YXIgaW5wdXRVcmwgPSBwcm9tcHQoXCJFbnRlciB0aGUgVVJMXCIsIFwiaHR0cHM6Ly93d3cuXCIpO1xyXG5cdFx0XHRcdHZhciBpbnB1dFRleHQgPSBwcm9tcHQoXCJFbnRlciBkaXNwbGF5IHRleHRcIiwgXCJTdXNzZXhcIik7XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxhIGhyZWY9XCInICsgaW5wdXRVcmwgKyAnXCI+JyArIGlucHV0VGV4dCArICc8L2E+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiY29kZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ2NvZGUnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJwcmVcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdwcmUnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpbmZvXCI6XHJcblx0XHRcdFx0JC5kaWFsb2coe1xyXG5cdFx0XHRcdFx0dGhlbWU6ICdtYXRlcmlhbCcsXHJcblx0XHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdIVE1MIEVkaXRvciBJbmZvJyxcclxuXHRcdFx0XHRcdGNvbnRlbnQ6ICdBbGwgbGlua3MgeW91IGFkZCB3aWxsIG9wZW4gaW4gYSBuZXcgdGFiLiBBbGwgSFRNTCA1IGVsZW1lbnRzIGFyZSB2YWxpZCBmb3IgdGhlIGRlc2NyaXB0aW9uIGZpZWxkLCBleGNsdWRpbmc7IDxicj48YnI+IDx1bD48bGk+U2NyaXB0IHRhZ3M8L2xpPjxsaT5IZWFkaW5nIHRhZ3M8L2xpPjxsaT5IVE1MIHJvb3QgdGFnczwvbGk+PGxpPkJvZHkgdGFnczwvbGk+PC91bD4nLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0JCgnLnN0dWRlbnQtdW5kby1zZWxlY3QnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgY2FyZCA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG5cdFx0JC5jb25maXJtKHtcclxuXHRcdFx0dGl0bGU6ICdVbmRvIFByb2plY3QgU2VsZWN0aW9uJyxcclxuXHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTIuNSw4QzkuODUsOCA3LjQ1LDkgNS42LDEwLjZMMiw3VjE2SDExTDcuMzgsMTIuMzhDOC43NywxMS4yMiAxMC41NCwxMC41IDEyLjUsMTAuNUMxNi4wNCwxMC41IDE5LjA1LDEyLjgxIDIwLjEsMTZMMjIuNDcsMTUuMjJDMjEuMDgsMTEuMDMgMTcuMTUsOCAxMi41LDhaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRhdXRvQ2xvc2U6ICdjYW5jZWx8MTAwMDAnLFxyXG5cdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHVuLXNlbGVjdCB5b3VyIHNlbGVjdGVkIHByb2plY3Q/PC9iPicsXHJcblx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRjb25maXJtOiB7XHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHR1cmw6ICcvc3R1ZGVudHMvdW5kby1zZWxlY3RlZC1wcm9qZWN0JyxcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRcdFx0XHRcdGlmKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXJkLmhpZGUoNDAwLCBmdW5jdGlvbigpIHsgY2FyZC5yZW1vdmUoKTsgfSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJ3N1Y2Nlc3MnLCAnVW5kbyBzdWNjZXNzZnVsLicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignZXJyb3InLCByZXNwb25zZS5tZXNzYWdlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2FuY2VsOiB7fSxcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PVxyXG5cdFx0OS4gSW5pdGlhbGlzZVxyXG5cdCAgID09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvLyBVc2VkIGFzIGFuIGVhc3kgd2F5IGZvciBmdW5jdGlvbnMgdG8gZ2V0IGN1cnJlbnQgcHJvamVjdCBkYXRhXHJcblx0aWYoJCgnLnByb2plY3QtY2FyZCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0d2luZG93Wydwcm9qZWN0J10gPSAkKCcucHJvamVjdC1jYXJkJyk7XHJcblx0fVxyXG5cclxuXHQkKCcuYW5pbWF0ZS1jYXJkcyAuY2FyZCcpLmNzcyhcIm9wYWNpdHlcIiwgMCk7XHJcblxyXG5cdHZhciBkZWxheSA9IDA7XHJcblx0JCgnLmFuaW1hdGUtY2FyZHMgLmNhcmQnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0ZGVsYXkgKz0gMjAwO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwic2xpZGVJblVwIGFuaW1hdGVkXCIpO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5hbmltYXRlKHtcclxuXHRcdFx0XHRvcGFjaXR5OiAxXHJcblx0XHRcdH0sIDgwMCk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpLCBkZWxheSk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uKCBldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MgKSB7XHJcblx0aWYoY29uZmlnLnNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24pe1xyXG5cdFx0c2hvd05vdGlmaWNhdGlvbignZXJyb3InLCAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGF0IHJlcXVlc3QuJyk7XHJcblx0fVxyXG59KTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG4vKiBGSUxFIFNUUlVDVFVSRVxyXG5cclxuKi9cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZJTEUgU1RSVUNUVVJFXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnxcdDEuIE1vYmlsZSBNZW51XHJcbnxcdDIuIERpYWxvZyAvIE1vZGFsXHJcbnxcdDMuIERhdGEgVGFibGVcclxufFx0NC4gQ29sdW1uIFRvZ2dsZSBUYWJsZVxyXG58XHQ1LiBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcbnxcdDYuIEVkaXQgVG9waWNzIFtBZG1pbl1cclxufFx0Ny4gTWVudVxyXG58XHJcbiovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuOyQoZnVuY3Rpb24oKSB7XHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQgMS4gTW9iaWxlIE1lbnVcclxuXHQgICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0XHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBtb2JpbGUgbWVudS5cclxuXHRcdCpcclxuXHRcdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgTW9iaWxlTWVudSA9ICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsZW1lbnQpIHtcclxuXHRcdGlmKHdpbmRvd1snTW9iaWxlTWVudSddID09IG51bGwpe1xyXG5cdFx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXSA9IHRoaXM7XHJcblx0XHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHRcdHRoaXMuYWN0aXZhdG9yID0gJCh0aGlzLlNlbGVjdG9yc18uSEFNQlVSR0VSX0NPTlRBSU5FUik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkgPSAkKHRoaXMuU2VsZWN0b3JzXy5VTkRFUkxBWSk7XHJcblx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJUaGVyZSBjYW4gb25seSBiZSBvbmUgbW9iaWxlIG1lbnUuXCIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdE1PQklMRV9NRU5VOiAnbmF2Lm1vYmlsZScsXHJcblx0XHRIQU1CVVJHRVJfQ09OVEFJTkVSOiAnLmhhbWJ1cmdlci1jb250YWluZXInLFxyXG5cdFx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0XHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtb2JpbGVNZW51ID0gdGhpcztcclxuXHRcdHRoaXMuYWN0aXZhdG9yLm9uKCdjbGljaycsIG1vYmlsZU1lbnUub3Blbk1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0XHR0aGlzLnVuZGVybGF5Lm9uKCdjbGljaycsIG1vYmlsZU1lbnUuY2xvc2VNZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5NT0JJTEVfTUVOVSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5tb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Mi4gRGlhbG9nIC8gTW9kYWxcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdHZhciBEaWFsb2cgPSBmdW5jdGlvbiBEaWFsb2coZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0XHR0aGlzLnVuZGVybGF5ID0gJCgnLnVuZGVybGF5Jyk7XHJcblx0XHR0aGlzLmhlYWRlciA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0hFQURFUik7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHJcblx0XHQvLyBSZWdpc3RlciBDb21wb25lbnRcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyhcInJlZ2lzdGVyZWRcIik7XHJcblxyXG5cdFx0Ly8gQVJJQVxyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJkaWFsb2ctdGl0bGVcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJkaWFsb2ctZGVzY1wiKTtcclxuXHRcdHRoaXMuaGVhZGVyLmF0dHIoJ3RpdGxlJywgdGhpcy5oZWFkZXIuZmluZCgnI2RpYWxvZy1kZXNjJykuaHRtbCgpKTtcclxuXHJcblx0XHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdFx0dGhpcy5sb2FkZXIgPSAkKGVsZW1lbnQpLmZpbmQoXCIubG9hZGVyXCIpO1xyXG5cdFx0dGhpcy5pc0Nsb3NhYmxlID0gdHJ1ZTtcclxuXHRcdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdFx0TE9BREVSOiAnPGRpdiBjbGFzcz1cImxvYWRlclwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4O3RvcDogMjUlO1wiPjwvZGl2PicsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdEFDVElWRTogJ2FjdGl2ZScsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RElBTE9HOiAnLmRpYWxvZycsXHJcblx0XHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0XHRESUFMT0dfQ09OVEVOVDogJy5jb250ZW50JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5sb2FkZXIuc2hvdygwKTtcclxuXHRcdHRoaXMuY29udGVudC5oaWRlKDApO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZUxvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5oaWRlKDApO1xyXG5cdFx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIiwgdGhpcy5kaWFsb2dOYW1lKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR3aW5kb3dbJ0RpYWxvZyddID0gdGhpcztcclxuXHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZURpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmlzQ2xvc2FibGUgJiYgdGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIikgPT0gdGhpcy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHRcdHZhciBkaWFsb2cgPSB0aGlzO1xyXG5cclxuXHRcdC8vIEZpbmQgYWN0aXZhdG9yIGJ1dHRvblxyXG5cdFx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdhY3RpdmF0b3InKSAmJiAkKHRoaXMpLmRhdGEoJ2RpYWxvZycpID09IGRpYWxvZy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0XHRkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucy5wdXNoKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHRkaWFsb2cuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0ZGlhbG9nLnVuZGVybGF5Lm9uKCdjbGljaycsIGRpYWxvZy5oaWRlRGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblxyXG5cdFx0dHJ5e1xyXG5cdFx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykub24oJ2NsaWNrJywgZGlhbG9nLnNob3dEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoKGVycil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJEaWFsb2cgXCIgKyBkaWFsb2cuZGlhbG9nTmFtZSArIFwiIGhhcyBubyBhY3RpdmF0b3IgYnV0dG9uLlwiKTtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZGlhbG9nID0gbmV3IERpYWxvZyh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzKS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZS5rZXlDb2RlID09IDI3ICYmIHdpbmRvd1snRGlhbG9nJ10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snRGlhbG9nJ10uaGlkZURpYWxvZygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydNb2JpbGVNZW51J10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDMuIERhdGEgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHRcdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0XHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdFx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0XHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0XHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRcdGlmIChyb3cpIHtcclxuXHRcdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuIENvbHVtbiBUb2dnbGUgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQ29sdW1uVG9nZ2xlVGFibGUgPSBmdW5jdGlvbiBDb2x1bW5Ub2dnbGVUYWJsZShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5oZWFkID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0cicpO1xyXG5cdFx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdFx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBudWxsO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydDb2x1bW5Ub2dnbGVUYWJsZSddID0gQ29sdW1uVG9nZ2xlVGFibGU7XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRUT0dHTEVfVEFCTEU6ICcudGFibGUtY29sdW1uLXRvZ2dsZSdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9CVVRUT046ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGRvdC1tZW51X19hY3RpdmF0b3JcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1sZWZ0OmF1dG87XCI+Q29sdW1uczwvYnV0dG9uPicsXHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfTUVOVTogJzx1bCBjbGFzcz1cImRvdC1tZW51IGRvdC1tZW51LS1ib3R0b20tbGVmdFwiPjwvdWw+J1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblxyXG5cdFx0dG9nZ2xlQ29sdW1uOiBmdW5jdGlvbihjb2x1bW5JbmRleCwgdGFibGUsIGNoZWNrZWQpIHtcclxuXHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5yZW1vdmVBdHRyKCdoaWRkZW4nKTtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmF0dHIoJ2hpZGRlbicsIFwidHJ1ZVwiKTtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJlZnJlc2g6IGZ1bmN0aW9uKHRhYmxlKSB7XHJcblx0XHRcdHZhciBoaWRlSW5kaWNlcyA9IFtdO1xyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MgPSB0YWJsZS5lbGVtZW50LmZpbmQoJ3Rib2R5IHRyJyk7XHJcblxyXG5cdFx0XHR0YWJsZS5oZWFkZXJzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZigkKHRoaXMpLmF0dHIoJ2hpZGRlbicpKXtcclxuXHRcdFx0XHRcdGhpZGVJbmRpY2VzLnB1c2goJCh0aGlzKS5pbmRleCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGlkZUluZGljZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShoaWRlSW5kaWNlc1tpXSkuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJlZnJlc2hBbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnJlZnJlc2godGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRpZighdGhpcy5lbGVtZW50LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkNvbHVtblRvZ2dsZVRhYmxlIHJlcXVpcmVzIHRoZSB0YWJsZSB0byBoYXZlIGFuIHVuaXF1ZSBJRC5cIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdG9nZ2xlVGFibGUgPSB0aGlzO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX0JVVFRPTik7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JNZW51ID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX01FTlUpO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkID0gJ0NvbHVtblRvZ2dsZVRhYmxlLScgKyB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmJlZm9yZShjb2x1bW5TZWxlY3RvckJ1dHRvbik7XHJcblxyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYWZ0ZXIoY29sdW1uU2VsZWN0b3JNZW51KTtcclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JNZW51LmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgKyAnLW1lbnUnKTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gY29sdW1uU2VsZWN0b3JCdXR0b247XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IGNvbHVtblNlbGVjdG9yTWVudTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudS5maW5kKCd1bCcpLmRhdGEoXCJ0YWJsZVwiLCB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJykpO1xyXG5cclxuXHRcdHRoaXMuaGVhZGVycy5lYWNoKGZ1bmN0aW9uICgpe1xyXG5cdFx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuZGF0YShcImRlZmF1bHRcIikgPyBcImNoZWNrZWRcIiA6IFwiXCI7XHJcblx0XHRcdCQodGhpcykuZGF0YSgndmlzaWJsZScsICQodGhpcykuZGF0YShcImRlZmF1bHRcIikpO1xyXG5cclxuXHRcdFx0Y29sdW1uU2VsZWN0b3JNZW51LmFwcGVuZCgnXFxcclxuXHRcdFx0XHQ8bGkgY2xhc3M9XCJkb3QtbWVudV9faXRlbSBkb3QtbWVudV9faXRlbS0tcGFkZGVkXCI+IFxcXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4gXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY29sdW1uLXRvZ2dsZVwiIGlkPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIiB0eXBlPVwiY2hlY2tib3hcIiAnKyBjaGVja2VkICsnPiBcXFxyXG5cdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIj4nICsgJCh0aGlzKS50ZXh0KCkgKyAnPC9sYWJlbD4gXFxcclxuXHRcdFx0XHRcdDwvZGl2PiBcXFxyXG5cdFx0XHRcdDwvbGk+Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5jb2x1bW4tdG9nZ2xlXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpbmRleCA9ICQoJy5jb2x1bW4tdG9nZ2xlJykuaW5kZXgodGhpcyk7XHJcblx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMudG9nZ2xlQ29sdW1uKGluZGV4LCB0b2dnbGVUYWJsZSwgJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUgPSBuZXcgQ29sdW1uVG9nZ2xlVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ1IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG5cdHdpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRcdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0XHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0XHRTUEFDRTogMzIsXHJcblx0XHRFTlRFUjogMTMsXHJcblx0XHRDT01NQTogNDVcclxuXHR9O1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU0VBUkNIXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdFx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdFx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHRcdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHRcdHRoaXMudG9waWNOYW1lSW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRORVdfVE9QSUM6ICcvdG9waWNzLydcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdGVkaXRUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRcdGlmKHRvcGljLm9yaWdpbmFsTmFtZSA9PSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSl7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQuY29uZmlybSh7XHJcblx0XHRcdFx0dGl0bGU6ICdDaGFuZ2UgVG9waWMgTmFtZScsXHJcblx0XHRcdFx0dHlwZTogJ2JsdWUnLFxyXG5cdFx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIDxiPlwiJyArICB0b3BpYy5vcmlnaW5hbE5hbWUgKyAnXCI8L2I+IHRvIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCB0b3BpYy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19uYW1lIDogdG9waWMudG9waWNOYW1lSW5wdXQudmFsKClcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLm9yaWdpbmFsTmFtZSA9IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2FuY2VsOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRlbGV0ZVRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZScsXHJcblx0XHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArICdcIjwvYj4/JyxcclxuXHRcdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0XHRkZWxldGU6IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lbGVtZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5zbG93LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRjcmVhdGVFZGl0VG9waWNET006IGZ1bmN0aW9uKHRvcGljSWQsIG9yaWdpbmFsTmFtZSl7XHJcblx0XHRcdCQoXCIuZWRpdC10b3BpYy1saXN0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyB0b3BpY0lkICsnXCIgZGF0YS1vcmlnaW5hbC10b3BpYy1uYW1lPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxpbnB1dCBzcGVsbGNoZWNrPVwidHJ1ZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGVkaXQtdG9waWNcIiB0eXBlPVwic3VibWl0XCI+RWRpdDwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidXR0b24gZGVsZXRlLXRvcGljIGJ1dHRvbi0tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC9saT4nKTtcclxuXHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGVkaXRUb3BpYyA9IHRoaXM7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5lZGl0VG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdFx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5FZGl0VG9waWMgPSBuZXcgRWRpdFRvcGljKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNyBEb3RNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIERvdE1lbnUgPSBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMubWVudSA9IG51bGw7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RE9UX01FTlU6ICcuZG90LW1lbnUnLFxyXG5cdFx0QUNUSVZBVE9SOiAnLmRvdC1tZW51X19hY3RpdmF0b3InLFxyXG5cdFx0SVNfVklTSUJMRTogJy5pcy12aXNpYmxlJyxcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJyxcclxuXHRcdEJPVFRPTV9MRUZUOiAnZG90LW1lbnUtLWJvdHRvbS1sZWZ0JyxcclxuXHRcdEJPVFRPTV9SSUdIVDogJ2RvdC1tZW51LS1ib3R0b20tcmlnaHQnLFxyXG5cdFx0VE9QX0xFRlQ6ICdkb3QtbWVudS0tdG9wLWxlZnQnLFxyXG5cdFx0VE9QX1JJR0hUOiAnZG90LW1lbnUtLXRvcC1yaWdodCcsXHJcblx0XHRUQUJMRV9ET1RfTUVOVTogJ2RvdC1tZW51LS10YWJsZSdcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJ1dHRvblJlY3QgPSB0aGlzLmJ1dHRvblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIGxlZnQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LnJpZ2h0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSBsZWZ0Jyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKHRoaXMpKCk7XHJcblx0XHR0aGlzLm1lbnUuYWRkQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLm1lbnUucmVtb3ZlQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuaGlkZSgpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZCh0aGlzKSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuc2hvdy5iaW5kKHRoaXMpKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvdE1lbnUgPSB0aGlzO1xyXG5cdFx0dmFyIG1lbnVJZCA9ICQodGhpcy5idXR0b24pLmF0dHIoJ2lkJykgKyAnLW1lbnUnO1xyXG5cclxuXHRcdHRoaXMubWVudSA9ICQoJyMnICsgbWVudUlkKTtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSB0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uVEFCTEVfRE9UX01FTlUpO1xyXG5cclxuXHRcdHRoaXMuYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGlmKCF0YXJnZXQuaXMoZG90TWVudS5tZW51KSB8fCAhdGFyZ2V0LmlzKGRvdE1lbnUuYnV0dG9uKSkge1xyXG5cdFx0XHRcdGlmKCEkLmNvbnRhaW5zKCQoZG90TWVudS5tZW51KVswXSwgZS50YXJnZXQpKXtcclxuXHRcdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uQUNUSVZBVE9SKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkRvdE1lbnUgPSBuZXcgRG90TWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0NS4gU2Vjb25kIE1hcmtlclxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHR2YXIgTWFya2VyID0gZnVuY3Rpb24gTWFya2VyKCkge1xyXG5cdFx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdFx0dGhpcy5zdHVkZW50VGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvclRhYmxlID0gJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIik7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JEYXRhVGFibGUgPSB0aGlzLnN1cGVydmlzb3JUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdFx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdtYXJrZXItaWQnKSA9PSByb3cuZGF0YSgnc3VwZXJ2aXNvci1pZCcpKXtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdFx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksXHJcblx0XHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5yZXNldFZpZXcgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0XHQkKFwiI3N0dWRlbnQtbmFtZVwiKS50ZXh0KHN0dWRlbnROYW1lKTtcclxuXHRcdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdFx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHRcdCQoXCIjcHJvamVjdC10aXRsZVwiKS5odG1sKCc8Yj5UaXRsZTogPC9iPicgKyBwcm9qZWN0Wyd0aXRsZSddKTtcclxuXHRcdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0WydkZXNjcmlwdGlvbiddKTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHR9XHJcblxyXG5cdCQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHdpbmRvd1snTWFya2VyJ107XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9O1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdHZhciBwcm9qZWN0SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKVsnaWQnXTtcclxuXHRcdHZhciBzdHVkZW50SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtaWQnKTtcclxuXHRcdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0XHR1cmw6IG1hcmtlci5VcmxzXy5BU1NJR05fTUFSS0VSLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkLFxyXG5cdFx0XHRcdHN0dWRlbnRfaWQ6IHN0dWRlbnRJZCxcclxuXHRcdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LnJlbW92ZSgpO1xyXG5cdFx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB0aGlzO1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCh0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTsgfSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxuXHR9XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREaWFsb2cucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==