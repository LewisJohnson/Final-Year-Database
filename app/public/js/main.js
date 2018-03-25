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
	$("#share-name-form").on('submit', function (e) {
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

	// Used on the student index page
	$(".receive-emails-form").on('submit', function (e) {
		e.preventDefault();

		$.ajax({
			url: $(this).prop('action'),
			type: 'PATCH',
			data: $(this).serialize(),
			success: function success(response) {
				if (response.successful) {
					showNotification('success', response.message);
				} else {
					showNotification('error', response.message);
				}
			}
		});
	});

	$('.receive-emails-checkbox').on('click', function (e) {
		$(this).submit();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDNkZThiN2E4MjJkNzkzNzkyM2UiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIm9uIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVxIiwiZGF0YSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpbmRleCIsInZhbHVlIiwiaXMiLCJwcm9wIiwic2V0VGltZW91dCIsImUiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInJlbW92ZUNsYXNzIiwiaGlkZSIsImFmdGVyIiwiY3NzIiwiYWpheCIsInVybCIsInR5cGUiLCJzZXJpYWxpemUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJzaGFyZV9uYW1lIiwic2hvd05vdGlmaWNhdGlvbiIsInN1Y2Nlc3NmdWwiLCJtZXNzYWdlIiwic3VibWl0IiwiQWpheEZ1bmN0aW9ucyIsInByb3RvdHlwZSIsIlNlbGVjdG9yc18iLCJMT0dfSU5fRElBTE9HIiwiZGlhbG9nIiwic2hvd0xvYWRlciIsImxvY2F0aW9uIiwicmVsb2FkIiwiaGlkZUxvYWRlciIsInNob3ciLCJhZGRDbGFzcyIsInRleHQiLCJzdWJtaXRCdXR0b24iLCJmaW5kIiwiaHRtbCIsImNvbnRleHQiLCJKU09OIiwicGFyc2UiLCJFZGl0VG9waWMiLCJmdW5jdGlvbnMiLCJjcmVhdGVFZGl0VG9waWNET00iLCJkb25lIiwidmFsIiwic3ZnQ29udGFpbmVyIiwic3ZnIiwid2luZG93IiwicHJvamVjdElkIiwiYWN0aW9uIiwiYWpheFVybCIsInByb2plY3RfaWQiLCJkcm9wZG93biIsImNvbnRlbnQiLCJtZWRpdW0iLCJyZXN1bHQiLCJidXR0b25zSHRtbCIsInByZXZpZXdIdG1sIiwiaW5zZXJ0QXRDYXJldCIsIndyYXBUZXh0V2l0aFRhZyIsImlucHV0VXJsIiwicHJvbXB0IiwiaW5wdXRBbHQiLCJpbnB1dFRleHQiLCJ0aGVtZSIsImVzY2FwZUtleSIsImFuaW1hdGVGcm9tRWxlbWVudCIsImJhY2tncm91bmREaXNtaXNzIiwidGl0bGUiLCJjYXJkIiwicGFyZW50IiwiY29uZmlybSIsImljb24iLCJhdXRvQ2xvc2UiLCJidXR0b25zIiwiYnRuQ2xhc3MiLCJtZXRob2QiLCJyZW1vdmUiLCJjYW5jZWwiLCJkZWxheSIsImFuaW1hdGUiLCJvcGFjaXR5IiwiYmluZCIsImRvY3VtZW50IiwiYWpheEVycm9yIiwiZXZlbnQiLCJyZXF1ZXN0Iiwic2V0dGluZ3MiLCJzaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uIiwiTW9iaWxlTWVudSIsImVsZW1lbnQiLCJhY3RpdmF0b3IiLCJIQU1CVVJHRVJfQ09OVEFJTkVSIiwidW5kZXJsYXkiLCJVTkRFUkxBWSIsImluaXQiLCJsb2ciLCJDc3NDbGFzc2VzXyIsIklTX1ZJU0lCTEUiLCJNT0JJTEVfTUVOVSIsIm9wZW5NZW51IiwiY2xvc2VNZW51IiwibW9iaWxlTWVudSIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiaGVhZGVyIiwiRElBTE9HX0hFQURFUiIsIkRJQUxPR19DT05URU5UIiwiSHRtbFNuaXBwZXRzXyIsIkxPQURFUiIsImxvYWRlciIsImlzQ2xvc2FibGUiLCJhY3RpdmF0b3JCdXR0b25zIiwiQUNUSVZFIiwiRElBTE9HIiwic2hvd0RpYWxvZyIsImhpZGVEaWFsb2ciLCJwdXNoIiwiZXJyIiwicmVhZHkiLCJrZXlkb3duIiwia2V5Q29kZSIsIkRhdGFUYWJsZSIsImJvZHlSb3dzIiwiZm9vdFJvd3MiLCJyb3dzIiwibWVyZ2UiLCJjaGVja2JveGVzIiwiQ0hFQ0tCT1giLCJtYXN0ZXJDaGVja2JveCIsIk1BU1RFUl9DSEVDS0JPWCIsIkRBVEFfVEFCTEUiLCJJU19TRUxFQ1RFRCIsInNlbGVjdEFsbFJvd3MiLCJzZWxlY3RSb3ciLCJjaGVja2JveCIsInJvdyIsImRhdGFUYWJsZSIsInByb3h5IiwiaSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJyZWZyZXNoQWxsIiwidG9nZ2xlVGFibGUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbiIsImNvbHVtblNlbGVjdG9yTWVudSIsImNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInJlbW92ZUFsbFNoYWRvd0NsYXNzZXMiLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJibHVyIiwib3JpZ2luYWxOYW1lIiwidG9waWNJZCIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwidG9waWMiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkZWxldGVUb3BpYyIsImRlbGV0ZSIsInNsb3ciLCJEb3RNZW51IiwiTWVudSIsImJ1dHRvbiIsIm1lbnUiLCJpc1RhYmxlRG90TWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIlRBQkxFX0RPVF9NRU5VIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImxlZnQiLCJwYXJzZUludCIsInRvcCIsInJpZ2h0IiwidG9nZ2xlIiwiZG90TWVudSIsIm1lbnVJZCIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNvbnRhaW5zIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0Iiwic3R1ZGVudElkIiwibWFya2VySWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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O0FBQ0FvTSxVQUFPVCxlQUFQLENBQXVCNUksTUFBdkI7QUFDQXFKLFVBQU9JLFNBQVAsQ0FBaUJKLE1BQWpCO0FBQ0EsR0FqQkQ7QUFrQkEsRUFoQ0Q7O0FBa0NBVixRQUFPak0sU0FBUCxDQUFpQndFLElBQWpCLEdBQXdCLFlBQVU7QUFDakMsTUFBSW1JLFNBQVMsSUFBYjtBQUNBdlEsSUFBRXVRLE9BQU9OLGdCQUFQLENBQXdCaEcsUUFBMUIsRUFBb0N6SSxFQUFwQyxDQUF1QyxPQUF2QyxFQUFnRCxZQUFXO0FBQUVxTyxVQUFPak0sU0FBUCxDQUFpQnlNLGFBQWpCLENBQStCLElBQS9CLEVBQXFDRSxNQUFyQztBQUErQyxHQUE1RztBQUNBdlEsSUFBRXVRLE9BQU9KLG1CQUFQLENBQTJCbEcsUUFBN0IsRUFBdUN6SSxFQUF2QyxDQUEwQyxPQUExQyxFQUFtRCxZQUFXO0FBQUVxTyxVQUFPak0sU0FBUCxDQUFpQjZNLGdCQUFqQixDQUFrQyxJQUFsQyxFQUF3Q0YsTUFBeEM7QUFBa0QsR0FBbEg7QUFDQSxFQUpEOztBQU1BVixRQUFPak0sU0FBUCxDQUFpQmdGLE9BQWpCLEdBQTJCLFlBQVU7QUFDcEN4RCxTQUFPLFFBQVAsSUFBbUIsSUFBSXlLLE1BQUosRUFBbkI7QUFDQSxFQUZEOztBQUlBL0gsWUFBV2xFLFNBQVgsQ0FBcUJnRixPQUFyQjtBQUNBQyxRQUFPakYsU0FBUCxDQUFpQmdGLE9BQWpCO0FBQ0FvQixXQUFVcEcsU0FBVixDQUFvQmdGLE9BQXBCO0FBQ0FzQyxtQkFBa0J0SCxTQUFsQixDQUE0QmdGLE9BQTVCO0FBQ0EvRCxXQUFVakIsU0FBVixDQUFvQmdGLE9BQXBCO0FBQ0FpSCxRQUFPak0sU0FBUCxDQUFpQmdGLE9BQWpCO0FBQ0F1RixTQUFRdkssU0FBUixDQUFrQmdGLE9BQWxCO0FBQ0EsQ0FueUJBLEUiLCJmaWxlIjoiXFxqc1xcbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0M2RlOGI3YTgyMmQ3OTM3OTIzZSIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58ICBcdDEuIEFKQVggU2V0dXBcclxufFx0Mi4gSFRNTCBNb2RpZmljYXRpb25zXHJcbnxcdDMuIE90aGVyXHJcbnxcclxuKi9cclxuXHJcbmltcG9ydCAnLi4vanMvY29tcG9uZW50cyc7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuOyQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDEuIEFKQVggU2V0dXBcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0JC5hamF4U2V0dXAoe1xyXG5cdFx0aGVhZGVyczoge1xyXG5cdFx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKSxcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0aWYoJCgnLnNob3ctLXNjcm9sbC10by10b3AnKS5sZW5ndGggPiAwKXtcclxuXHRcdCQoJy5tYWluLWNvbnRlbnQnKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgYnV0dG9uLS1hY2NlbnQgc2Nyb2xsLXRvLXRvcFwiPlNjcm9sbCB0byBUb3A8L2J1dHRvbj4nKTtcclxuXHR9XHJcblxyXG5cdC8vIEFjY2Vzc2liaWxpdHlcclxuXHQkKCcuZHJvcGRvd24nKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblx0JCgnLmRyb3Bkb3duID4gYnV0dG9uJykuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcclxuXHQkKCcuZHJvcGRvd24gLmRyb3Bkb3duLWNvbnRlbnQgYScpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHJcblx0Ly8gTWFrZXMgcHJpbWFyeSB0b3BpYyBmaXJzdFxyXG5cdCQoJy50b3BpY3MtbGlzdCcpLnByZXBlbmQoJCgnLmZpcnN0JykpO1xyXG5cdCQoJy50b3BpY3MtbGlzdCAubG9hZGVyJykuZmFkZU91dCgwKTtcclxuXHQkKCcudG9waWNzLWxpc3QgbGknKS5maXJzdCgpLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIGZ1bmN0aW9uIHNob3dOZXh0VG9waWMoKSB7XHJcblx0XHQkKHRoaXMpLm5leHQoIFwiLnRvcGljcy1saXN0IGxpXCIgKS5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0LCBzaG93TmV4dFRvcGljKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLm9yZGVyLWxpc3QtanMnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGxpc3QgPSAkKHRoaXMpO1xyXG5cdFx0Ly8gc29ydFVub3JkZXJlZExpc3QobGlzdCk7XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnbGFzdC1uYW1lLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRMYXN0TmFtZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnYWxwaGEtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZEFscGhhSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCd0aXRsZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkVGl0bGVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQgMy4gT1RIRVJcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuZW1haWwtdGFibGUgLmNoZWNrYm94IGlucHV0XCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGVjdCA9IGZ1bmN0aW9uKGRvbSl7XHJcblx0XHRcdHZhciBzdGF0dXMgPSBkb20ucGFyZW50cygpLmVxKDQpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdFx0XHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHRcdFx0dmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmVtYWlsLXRhYmxlLicgKyBzdGF0dXMgKyAnIC5jaGVja2JveCBpbnB1dCc7XHJcblx0XHRcdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblxyXG5cdFx0XHQkKGNoZWNrYm94U2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRcdFx0aWYoJCh2YWx1ZSkuaXMoXCI6Y2hlY2tlZFwiKSAmJiAhJCh2YWx1ZSkuaGFzQ2xhc3MoXCJtYXN0ZXItY2hlY2tib3hcIikpIHtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9ICQodmFsdWUpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSBcIixcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKGVtYWlsQnV0dG9uc2VsZWN0b3IpLnByb3AoJ2hyZWYnLCBlbWFpbFN0cmluZyk7XHJcblx0XHR9O1xyXG5cdFx0c2V0VGltZW91dChzZWxlY3QoJCh0aGlzKSksIDIwMDApO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmVtYWlsLXNlbGVjdGVkXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicgfHwgJCh0aGlzKS5wcm9wKCdocmVmJykgPT09IG51bGwpe1xyXG5cdFx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5leHRlcm5hbC1saW5rXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHRcdHZhciBlbGVtVG9SZXBsYWNlID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8tcmVwbGFjZS13aXRoLWxvYWRlci1zZWxlY3RvcicpKTtcclxuXHJcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRlbGVtVG9IaWRlU2VsZWN0b3IuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudC1yZXBsYWNlZC1jb250YWluZXJcIiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHJcblx0XHQkKCcjY29udGVudC1yZXBsYWNlZC1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIiNzaGFyZS1uYW1lLWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5zaGFyZV9uYW1lKXtcclxuXHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJ3N1Y2Nlc3MnLCAnWW91ciBuYW1lIGlzIGJlaW5nIHNoYXJlZCB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCcnLCAnWW91IGFyZSBubyBsb25nZXIgc2hhcmluZyB5b3VyIG5hbWUgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JCgnI3NoYXJlX25hbWUnKS5wcm9wKCdjaGVja2VkJywgcmVzcG9uc2Uuc2hhcmVfbmFtZSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIi5yZWNlaXZlLWVtYWlscy1mb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc3VjY2Vzc2Z1bCl7XHJcblx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgcmVzcG9uc2UubWVzc2FnZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJ2Vycm9yJywgcmVzcG9uc2UubWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5yZWNlaXZlLWVtYWlscy1jaGVja2JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0JCh0aGlzKS5zdWJtaXQoKTtcclxuXHR9KTtcclxuXHJcblxyXG5cdCQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmhpZGUoKTtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuc2hvdygpO1xyXG5cdFx0XHRcdCQoJyNsb2dpbi11c2VybmFtZScsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuYWRkQ2xhc3MoXCJoYXMtZXJyb3JcIik7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyIHN1Ym1pdEJ1dHRvbiA9ICQodGhpcykuZmluZCgnOnN1Ym1pdCcpO1xyXG5cdFx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdWJtaXRCdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMuY3JlYXRlRWRpdFRvcGljRE9NKGRhdGFbXCJpZFwiXSwgZGF0YVtcIm5hbWVcIl0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gTkVXIFVTRVJcclxuXHQvLyBwdXQgdGhpcyBzdHVmZiBpbiBhbiBhcnJheVxyXG5cdC8vIHRvZG86IGlmIHN0dWRlbnQgaXMgc2VsZWN0ZWQsIGRlc2VsZWN0IHRoZSByZXN0IGFuZCBkaXNhYmxlIHRoZW0gKGxpa2V3aXNlIGZvciBvdGhlciBjaGVja2JveGVzKVxyXG5cclxuXHQkKCcudXNlci1mb3JtICN1c2VybmFtZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLnVzZXItZm9ybSAjZW1haWwnKS52YWwoJCh0aGlzKS52YWwoKSArIFwiQHN1c3NleC5hYy51a1wiKTtcclxuXHR9KTtcclxuXHJcblx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHQkKCcjc3R1ZGVudC1mb3JtJykuaGlkZSgpO1xyXG5cclxuXHQkKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdFx0aWYoJCgnLm5ldy11c2VyLXN0dWRlbnQnKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHRcdH1cclxuXHRcdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKFwiLmZhdm91cml0ZS1jb250YWluZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc3ZnQ29udGFpbmVyID0gJCh0aGlzKTtcclxuXHRcdHZhciBzdmcgPSBzdmdDb250YWluZXIuZmluZCgnc3ZnJyk7XHJcblxyXG5cdFx0aWYod2luZG93Wydwcm9qZWN0J10gIT0gbnVsbCl7XHJcblx0XHRcdHZhciBwcm9qZWN0SWQgPSB3aW5kb3dbJ3Byb2plY3QnXS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcHJvamVjdElkID0gJCh0aGlzKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3ZnLmhpZGUoMCk7XHJcblx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5zaG93KDApO1xyXG5cclxuXHRcdGlmKHN2Zy5oYXNDbGFzcygnZmF2b3VyaXRlJykpe1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ3JlbW92ZSc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9yZW1vdmUtZmF2b3VyaXRlJztcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ2FkZCc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9hZGQtZmF2b3VyaXRlJztcclxuXHRcdH1cclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoYWN0aW9uID09IFwiYWRkXCIpe1xyXG5cdFx0XHRcdFx0c3ZnLmFkZENsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3ZnLnJlbW92ZUNsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdHN2Zy5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0KTtcclxuXHRcdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCduYXYubW9iaWxlIC5zdWItZHJvcGRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGRyb3Bkb3duID0gJCh0aGlzKTtcclxuXHRcdHZhciBjb250ZW50ID0gZHJvcGRvd24uZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKTtcclxuXHJcblx0XHRpZihkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiKSA9PSBcInRydWVcIil7XHJcblx0XHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcclxuXHRcdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMGRlZylcIik7XHJcblx0XHRcdGRyb3Bkb3duLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRjb250ZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5tZWRpdW0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIGZhbHNlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigxODBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5zaG93KGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cdC8vIEhUTUwgRURJVE9SXHJcblx0JCgnLmh0bWwtZWRpdG9yJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpe1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAnL3NuaXBwZXQ/c25pcHBldD1odG1sLWVkaXRvci10b29sYmFyJyxcclxuXHRcdFx0dHlwZTonR0VUJyxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXN1bHQpe1xyXG5cdFx0XHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5hZnRlcihyZXN1bHQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvbnNIdG1sID0gXCI8ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgZmxleCc+PGJ1dHRvbiBjbGFzcz0naHRtbCcgdHlwZT0nYnV0dG9uJz5IVE1MPC9idXR0b24+PGJ1dHRvbiBjbGFzcz0ncHJldmlldycgdHlwZT0nYnV0dG9uJz5QUkVWSUVXPC9idXR0b24+PC9kaXY+XCI7XHJcblx0XHR2YXIgcHJldmlld0h0bWwgPSBcIjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcic+PGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXByZXZpZXcnPjwvZGl2PjwvZGl2PlwiO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5iZWZvcmUoYnV0dG9uc0h0bWwpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yJykuYWZ0ZXIocHJldmlld0h0bWwpO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXcnKS5odG1sKCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldycpLmh0bWwoJCh0aGlzKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLmh0bWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLnByZXZpZXcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5zaG93KCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFRvZ2dsZSBsYWJlbCBmbGlwcyB0b2dnbGVcclxuXHQkKFwiLmh0bWwtZWRpdG9yXCIpLm9uKFwiY2xpY2tcIiwgXCIuaHRtbC1lZGl0b3ItLXRvb2xiYXIgbGkgYnV0dG9uXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRzd2l0Y2goJCh0aGlzKS5kYXRhKCd0eXBlJykpe1xyXG5cdFx0XHRjYXNlIFwibGluZWJyZWFrXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxicj4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJvbFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48b2w+XFxuXFx0PGxpPkl0ZW0gMTwvbGk+XFxuXFx0PGxpPkl0ZW0gMjwvbGk+XFxuXFx0PGxpPkl0ZW0gMzwvbGk+XFxuPC9vbD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ1bFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48dWw+XFxuXFx0PGxpPkl0ZW0geDwvbGk+XFxuXFx0PGxpPkl0ZW0geTwvbGk+XFxuXFx0PGxpPkl0ZW0gejwvbGk+XFxuPC91bD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJib2xkXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnYicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInR0XCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndHQnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpdGFsaWNcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdpJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidW5kZXJsaW5lXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImltZ1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBpbWFnZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0QWx0ID0gcHJvbXB0KFwiRW50ZXIgYWx0IHRleHRcIiwgXCJJbWFnZSBvZiBTdXNzZXggY2FtcHVzXCIpO1xyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8aW1nIGFsdD1cIicgKyBpbnB1dEFsdCArICdcIiBzcmM9XCInICsgaW5wdXRVcmwgKyAnXCI+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwibGlua1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0VGV4dCA9IHByb21wdChcIkVudGVyIGRpc3BsYXkgdGV4dFwiLCBcIlN1c3NleFwiKTtcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGEgaHJlZj1cIicgKyBpbnB1dFVybCArICdcIj4nICsgaW5wdXRUZXh0ICsgJzwvYT4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJjb2RlXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnY29kZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInByZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3ByZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImluZm9cIjpcclxuXHRcdFx0XHQkLmRpYWxvZyh7XHJcblx0XHRcdFx0XHR0aGVtZTogJ21hdGVyaWFsJyxcclxuXHRcdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0hUTUwgRWRpdG9yIEluZm8nLFxyXG5cdFx0XHRcdFx0Y29udGVudDogJ0FsbCBsaW5rcyB5b3UgYWRkIHdpbGwgb3BlbiBpbiBhIG5ldyB0YWIuIEFsbCBIVE1MIDUgZWxlbWVudHMgYXJlIHZhbGlkIGZvciB0aGUgZGVzY3JpcHRpb24gZmllbGQsIGV4Y2x1ZGluZzsgPGJyPjxicj4gPHVsPjxsaT5TY3JpcHQgdGFnczwvbGk+PGxpPkhlYWRpbmcgdGFnczwvbGk+PGxpPkhUTUwgcm9vdCB0YWdzPC9saT48bGk+Qm9keSB0YWdzPC9saT48L3VsPicsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHQkKCcuc3R1ZGVudC11bmRvLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBjYXJkID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHJcblx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogJ1VuZG8gUHJvamVjdCBTZWxlY3Rpb24nLFxyXG5cdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xMi41LDhDOS44NSw4IDcuNDUsOSA1LjYsMTAuNkwyLDdWMTZIMTFMNy4zOCwxMi4zOEM4Ljc3LDExLjIyIDEwLjU0LDEwLjUgMTIuNSwxMC41QzE2LjA0LDEwLjUgMTkuMDUsMTIuODEgMjAuMSwxNkwyMi40NywxNS4yMkMyMS4wOCwxMS4wMyAxNy4xNSw4IDEyLjUsOFpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGF1dG9DbG9zZTogJ2NhbmNlbHwxMDAwMCcsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gdW4tc2VsZWN0IHlvdXIgc2VsZWN0ZWQgcHJvamVjdD88L2I+JyxcclxuXHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdGJ0bkNsYXNzOiAnYnRuLXJlZCcsXHJcblx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdHVybDogJy9zdHVkZW50cy91bmRvLXNlbGVjdGVkLXByb2plY3QnLFxyXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYocmVzcG9uc2Uuc3VjY2Vzc2Z1bCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNhcmQuaGlkZSg0MDAsIGZ1bmN0aW9uKCkgeyBjYXJkLnJlbW92ZSgpOyB9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignc3VjY2VzcycsICdVbmRvIHN1Y2Nlc3NmdWwuJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IHt9LFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09XHJcblx0XHQ5LiBJbml0aWFsaXNlXHJcblx0ICAgPT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8vIFVzZWQgYXMgYW4gZWFzeSB3YXkgZm9yIGZ1bmN0aW9ucyB0byBnZXQgY3VycmVudCBwcm9qZWN0IGRhdGFcclxuXHRpZigkKCcucHJvamVjdC1jYXJkJykubGVuZ3RoID4gMCl7XHJcblx0XHR3aW5kb3dbJ3Byb2plY3QnXSA9ICQoJy5wcm9qZWN0LWNhcmQnKTtcclxuXHR9XHJcblxyXG5cdCQoJy5hbmltYXRlLWNhcmRzIC5jYXJkJykuY3NzKFwib3BhY2l0eVwiLCAwKTtcclxuXHJcblx0dmFyIGRlbGF5ID0gMDtcclxuXHQkKCcuYW5pbWF0ZS1jYXJkcyAuY2FyZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRkZWxheSArPSAyMDA7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJzbGlkZUluVXAgYW5pbWF0ZWRcIik7XHJcblxyXG5cdFx0XHQkKHRoaXMpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdG9wYWNpdHk6IDFcclxuXHRcdFx0fSwgODAwKTtcclxuXHJcblx0XHR9LmJpbmQodGhpcyksIGRlbGF5KTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5hamF4RXJyb3IoZnVuY3Rpb24oIGV2ZW50LCByZXF1ZXN0LCBzZXR0aW5ncyApIHtcclxuXHRpZihjb25maWcuc2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbil7XHJcblx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoYXQgcmVxdWVzdC4nKTtcclxuXHR9XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanMiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxuLyogRklMRSBTVFJVQ1RVUkVcclxuXHJcbiovXHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58XHQxLiBNb2JpbGUgTWVudVxyXG58XHQyLiBEaWFsb2cgLyBNb2RhbFxyXG58XHQzLiBEYXRhIFRhYmxlXHJcbnxcdDQuIENvbHVtbiBUb2dnbGUgVGFibGVcclxufFx0NS4gRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG58XHQ2LiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcbnxcdDcuIE1lbnVcclxufFxyXG4qL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0IDEuIE1vYmlsZSBNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdFx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgbW9iaWxlIG1lbnUuXHJcblx0XHQqXHJcblx0XHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIE1vYmlsZU1lbnUgPSAgZnVuY3Rpb24gTW9iaWxlTWVudShlbGVtZW50KSB7XHJcblx0XHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlcmUgY2FuIG9ubHkgYmUgb25lIG1vYmlsZSBtZW51LlwiKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdFx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRcdFVOREVSTEFZOiAnLm1vYmlsZS1uYXYtdW5kZXJsYXknXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbW9iaWxlTWVudSA9IHRoaXM7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5vbignY2xpY2snLCBtb2JpbGVNZW51LmNsb3NlTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uTU9CSUxFX01FTlUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDIuIERpYWxvZyAvIE1vZGFsXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHR2YXIgRGlhbG9nID0gZnVuY3Rpb24gRGlhbG9nKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmRpYWxvZ05hbWUgPSAkKGVsZW1lbnQpLmRhdGEoJ2RpYWxvZycpO1xyXG5cdFx0dGhpcy51bmRlcmxheSA9ICQoJy51bmRlcmxheScpO1xyXG5cdFx0dGhpcy5oZWFkZXIgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19IRUFERVIpO1xyXG5cdFx0dGhpcy5jb250ZW50ID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfQ09OVEVOVCk7XHJcblxyXG5cdFx0Ly8gUmVnaXN0ZXIgQ29tcG9uZW50XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoXCJyZWdpc3RlcmVkXCIpO1xyXG5cclxuXHRcdC8vIEFSSUFcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwicm9sZVwiLCBcImRpYWxvZ1wiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1sYWJlbGxlZGJ5XCIsIFwiZGlhbG9nLXRpdGxlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIFwiZGlhbG9nLWRlc2NcIik7XHJcblx0XHR0aGlzLmhlYWRlci5hdHRyKCd0aXRsZScsIHRoaXMuaGVhZGVyLmZpbmQoJyNkaWFsb2ctZGVzYycpLmh0bWwoKSk7XHJcblxyXG5cdFx0dGhpcy5jb250ZW50LmJlZm9yZSh0aGlzLkh0bWxTbmlwcGV0c18uTE9BREVSKTtcclxuXHRcdHRoaXMubG9hZGVyID0gJChlbGVtZW50KS5maW5kKFwiLmxvYWRlclwiKTtcclxuXHRcdHRoaXMuaXNDbG9zYWJsZSA9IHRydWU7XHJcblx0XHR0aGlzLmFjdGl2YXRvckJ1dHRvbnMgPSBbXTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRcdExPQURFUjogJzxkaXYgY2xhc3M9XCJsb2FkZXJcIiBzdHlsZT1cIndpZHRoOiAxMDBweDsgaGVpZ2h0OiAxMDBweDt0b3A6IDI1JTtcIj48L2Rpdj4nLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRBQ1RJVkU6ICdhY3RpdmUnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERJQUxPRzogJy5kaWFsb2cnLFxyXG5cdFx0RElBTE9HX0hFQURFUjogJy5oZWFkZXInLFxyXG5cdFx0RElBTE9HX0NPTlRFTlQ6ICcuY29udGVudCcsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5zaG93TG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLnNob3coMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuaGlkZSgwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmhpZGVMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5sb2FkZXIuaGlkZSgwKTtcclxuXHRcdHRoaXMuY29udGVudC5zaG93KDApO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIsIHRoaXMuZGlhbG9nTmFtZSk7XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0d2luZG93WydEaWFsb2cnXSA9IHRoaXM7XHJcblx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXS5jbG9zZU1lbnUoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmhpZGVEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5pc0Nsb3NhYmxlICYmIHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIpID09IHRoaXMuZGlhbG9nTmFtZSl7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0Ly8gTmVlZGVkIGZvciBjb250ZXh0XHJcblx0XHR2YXIgZGlhbG9nID0gdGhpcztcclxuXHJcblx0XHQvLyBGaW5kIGFjdGl2YXRvciBidXR0b25cclxuXHRcdCQoJ2J1dHRvbicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQodGhpcykuZGF0YSgnYWN0aXZhdG9yJykgJiYgJCh0aGlzKS5kYXRhKCdkaWFsb2cnKSA9PSBkaWFsb2cuZGlhbG9nTmFtZSl7XHJcblx0XHRcdFx0ZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMucHVzaCgkKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQVJJQVxyXG5cdFx0ZGlhbG9nLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdGRpYWxvZy51bmRlcmxheS5vbignY2xpY2snLCBkaWFsb2cuaGlkZURpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cclxuXHRcdHRyeXtcclxuXHRcdFx0JChkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGRpYWxvZy5zaG93RGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBjYXRjaChlcnIpe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIFwiICsgZGlhbG9nLmRpYWxvZ05hbWUgKyBcIiBoYXMgbm8gYWN0aXZhdG9yIGJ1dHRvbi5cIik7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRElBTE9HKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRpYWxvZyA9IG5ldyBEaWFsb2codGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcykua2V5ZG93bihmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ0RpYWxvZyddICE9IG51bGwpIHtcclxuXHRcdFx0XHR3aW5kb3dbJ0RpYWxvZyddLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoZS5rZXlDb2RlID09IDI3ICYmIHdpbmRvd1snTW9iaWxlTWVudSddICE9IG51bGwpIHtcclxuXHRcdFx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXS5jbG9zZU1lbnUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09XHJcblx0XHQzLiBEYXRhIFRhYmxlXHJcblx0ICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIERhdGFUYWJsZSA9IGZ1bmN0aW9uIERhdGFUYWJsZShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdFx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHRcdHRoaXMuZm9vdFJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rmb290IHRyJyk7XHJcblx0XHR0aGlzLnJvd3MgPSAkLm1lcmdlKHRoaXMuYm9keVJvd3MsIHRoaXMuZm9vdFJvd3MpO1xyXG5cdFx0dGhpcy5jaGVja2JveGVzID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5DSEVDS0JPWCk7XHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94ID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5NQVNURVJfQ0hFQ0tCT1gpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydEYXRhVGFibGUnXSA9IERhdGFUYWJsZTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJy5kYXRhLXRhYmxlJyxcclxuXHRcdE1BU1RFUl9DSEVDS0JPWDogJ3RoZWFkIC5tYXN0ZXItY2hlY2tib3gnLFxyXG5cdFx0Q0hFQ0tCT1g6ICd0Ym9keSAuY2hlY2tib3gtaW5wdXQnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICcuaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0XHRzZWxlY3RBbGxSb3dzOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYodGhpcy5tYXN0ZXJDaGVja2JveC5pcygnOmNoZWNrZWQnKSl7XHJcblx0XHRcdFx0dGhpcy5yb3dzLmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hlcy5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5yb3dzLnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hlcy5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c2VsZWN0Um93OiBmdW5jdGlvbiAoY2hlY2tib3gsIHJvdykge1xyXG5cdFx0XHRpZiAocm93KSB7XHJcblx0XHRcdFx0aWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0XHRyb3cuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJvdy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHJcblx0XHQkKHRoaXMuY2hlY2tib3hlcykuZWFjaChmdW5jdGlvbihpKSB7XHJcblx0XHRcdCQodGhpcykub24oJ2NoYW5nZScsICQucHJveHkoZGF0YVRhYmxlLmZ1bmN0aW9ucy5zZWxlY3RSb3csIHRoaXMsICQodGhpcyksIGRhdGFUYWJsZS5ib2R5Um93cy5lcShpKSkpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uREFUQV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5kYXRhVGFibGUgPSBuZXcgRGF0YVRhYmxlKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ0LiBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIENvbHVtblRvZ2dsZVRhYmxlID0gZnVuY3Rpb24gQ29sdW1uVG9nZ2xlVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZCA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHInKTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IG51bGw7XHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snQ29sdW1uVG9nZ2xlVGFibGUnXSA9IENvbHVtblRvZ2dsZVRhYmxlO1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0VE9HR0xFX1RBQkxFOiAnLnRhYmxlLWNvbHVtbi10b2dnbGUnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfQlVUVE9OOiAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBkb3QtbWVudV9fYWN0aXZhdG9yXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO21hcmdpbi10b3A6MnJlbTttYXJnaW4tbGVmdDphdXRvO1wiPkNvbHVtbnM8L2J1dHRvbj4nLFxyXG5cdFx0Q09MVU1OX1NFTEVDVE9SX01FTlU6ICc8dWwgY2xhc3M9XCJkb3QtbWVudSBkb3QtbWVudS0tYm90dG9tLWxlZnRcIj48L3VsPidcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cclxuXHRcdHRvZ2dsZUNvbHVtbjogZnVuY3Rpb24oY29sdW1uSW5kZXgsIHRhYmxlLCBjaGVja2VkKSB7XHJcblx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkucmVtb3ZlQXR0cignaGlkZGVuJyk7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5hdHRyKCdoaWRkZW4nLCBcInRydWVcIik7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoOiBmdW5jdGlvbih0YWJsZSkge1xyXG5cdFx0XHR2YXIgaGlkZUluZGljZXMgPSBbXTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzID0gdGFibGUuZWxlbWVudC5maW5kKCd0Ym9keSB0cicpO1xyXG5cclxuXHRcdFx0dGFibGUuaGVhZGVycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoJCh0aGlzKS5hdHRyKCdoaWRkZW4nKSl7XHJcblx0XHRcdFx0XHRoaWRlSW5kaWNlcy5wdXNoKCQodGhpcykuaW5kZXgoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZGVJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoaGlkZUluZGljZXNbaV0pLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JChDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy5yZWZyZXNoKHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYoIXRoaXMuZWxlbWVudC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJDb2x1bW5Ub2dnbGVUYWJsZSByZXF1aXJlcyB0aGUgdGFibGUgdG8gaGF2ZSBhbiB1bmlxdWUgSUQuXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHRvZ2dsZVRhYmxlID0gdGhpcztcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbiA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04pO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yTWVudSA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9NRU5VKTtcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCA9ICdDb2x1bW5Ub2dnbGVUYWJsZS0nICsgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudC5iZWZvcmUoY29sdW1uU2VsZWN0b3JCdXR0b24pO1xyXG5cclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmFmdGVyKGNvbHVtblNlbGVjdG9yTWVudSk7XHJcblx0XHRjb2x1bW5TZWxlY3RvckJ1dHRvbi5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkKTtcclxuXHRcdGNvbHVtblNlbGVjdG9yTWVudS5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkICsgJy1tZW51Jyk7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IGNvbHVtblNlbGVjdG9yQnV0dG9uO1xyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUgPSBjb2x1bW5TZWxlY3Rvck1lbnU7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUuZmluZCgndWwnKS5kYXRhKFwidGFibGVcIiwgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpKTtcclxuXHJcblx0XHR0aGlzLmhlYWRlcnMuZWFjaChmdW5jdGlvbiAoKXtcclxuXHRcdFx0dmFyIGNoZWNrZWQgPSAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpID8gXCJjaGVja2VkXCIgOiBcIlwiO1xyXG5cdFx0XHQkKHRoaXMpLmRhdGEoJ3Zpc2libGUnLCAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpKTtcclxuXHJcblx0XHRcdGNvbHVtblNlbGVjdG9yTWVudS5hcHBlbmQoJ1xcXHJcblx0XHRcdFx0PGxpIGNsYXNzPVwiZG90LW1lbnVfX2l0ZW0gZG90LW1lbnVfX2l0ZW0tLXBhZGRlZFwiPiBcXFxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+IFxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNvbHVtbi10b2dnbGVcIiBpZD1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCIgdHlwZT1cImNoZWNrYm94XCIgJysgY2hlY2tlZCArJz4gXFxcclxuXHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCI+JyArICQodGhpcykudGV4dCgpICsgJzwvbGFiZWw+IFxcXHJcblx0XHRcdFx0XHQ8L2Rpdj4gXFxcclxuXHRcdFx0XHQ8L2xpPicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuY29sdW1uLXRvZ2dsZVwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKCcuY29sdW1uLXRvZ2dsZScpLmluZGV4KHRoaXMpO1xyXG5cdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnRvZ2dsZUNvbHVtbihpbmRleCwgdG9nZ2xlVGFibGUsICQodGhpcykucHJvcCgnY2hlY2tlZCcpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkNvbHVtblRvZ2dsZVRhYmxlID0gbmV3IENvbHVtblRvZ2dsZVRhYmxlKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0NSBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBBamF4RnVuY3Rpb25zID0gIGZ1bmN0aW9uIEFqYXhGdW5jdGlvbnMoKSB7fTtcclxuXHR3aW5kb3dbJ0FqYXhGdW5jdGlvbnMnXSA9IEFqYXhGdW5jdGlvbnM7XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0U0VBUkNIX0lOUFVUOiAnLnNlYXJjaC1pbnB1dCcsXHJcblx0XHRTRUFSQ0hfQ09OVEFJTkVSOiAnLnNlYXJjaC1jb250YWluZXInLFxyXG5cdFx0U0VBUkNIX0ZJTFRFUl9DT05UQUlORVI6ICcuc2VhcmNoLWZpbHRlci1jb250YWluZXInLFxyXG5cdFx0U0VBUkNIX0ZJTFRFUl9CVVRUT046ICcjc2VhcmNoLWZpbHRlci1idXR0b24nLFxyXG5cdFx0TE9HX0lOX0RJQUxPRzogJy5sb2dpbi5kaWFsb2cnLFxyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLktleXNfID0ge1xyXG5cdFx0U1BBQ0U6IDMyLFxyXG5cdFx0RU5URVI6IDEzLFxyXG5cdFx0Q09NTUE6IDQ1XHJcblx0fTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1c1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1cycsICBmdW5jdGlvbihlKXtcclxuXHRcdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LWZvY3VzJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXMgb3V0XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3Vzb3V0JywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctMmRwJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFNFQVJDSFxyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0JVVFRPTikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSKTtcclxuXHRcdHZhciBmaWx0ZXJCdXR0b24gPSAkKHRoaXMpO1xyXG5cclxuXHRcdGlmKGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0XHRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmaWx0ZXJCdXR0b24ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmaWx0ZXJCdXR0b24uYmx1cigpO1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHRjb250YWluZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmaWx0ZXJCdXR0b24uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgICA2IEVkaXQgVG9waWNzIFtBZG1pbl1cclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRWRpdFRvcGljID0gZnVuY3Rpb24gRWRpdFRvcGljKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLm9yaWdpbmFsTmFtZSA9ICQoZWxlbWVudCkuZGF0YShcIm9yaWdpbmFsLXRvcGljLW5hbWVcIik7XHJcblx0XHR0aGlzLnRvcGljSWQgPSAkKGVsZW1lbnQpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0XHR0aGlzLnRvcGljTmFtZUlucHV0ID0gJChlbGVtZW50KS5maW5kKCdpbnB1dCcpO1xyXG5cdFx0dGhpcy5lZGl0QnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZWRpdC10b3BpYycpO1xyXG5cdFx0dGhpcy5kZWxldGVCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5kZWxldGUtdG9waWMnKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snRWRpdFRvcGljJ10gPSBFZGl0VG9waWM7XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdEVESVRfVE9QSUM6ICcuZWRpdC10b3BpYy1saXN0IC50b3BpYycsXHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRcdERFTEVURV9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRcdFBBVENIX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFx0TkVXX1RPUElDOiAnL3RvcGljcy8nXHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0XHRlZGl0VG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0XHRpZih0b3BpYy5vcmlnaW5hbE5hbWUgPT0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCkpe1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHRcdHRpdGxlOiAnQ2hhbmdlIFRvcGljIE5hbWUnLFxyXG5cdFx0XHRcdHR5cGU6ICdibHVlJyxcclxuXHRcdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIHRvcGljIG5hbWUgZnJvbSA8Yj5cIicgKyAgdG9waWMub3JpZ2luYWxOYW1lICsgJ1wiPC9iPiB0byA8Yj5cIicgKyAgdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCkgKydcIjwvYj4/JyxcclxuXHRcdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0XHRjb25maXJtOiB7XHJcblx0XHRcdFx0XHRcdGJ0bkNsYXNzOiAnYnRuLWJsdWUnLFxyXG5cdFx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcubG9hZGVyJywgdG9waWMuZWxlbWVudCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQQVRDSCcsXHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfbmFtZSA6IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCdFZGl0Jyk7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy5vcmlnaW5hbE5hbWUgPSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGNhbmNlbDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRkZWxldGVUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRcdCQuY29uZmlybSh7XHJcblx0XHRcdFx0dGl0bGU6ICdEZWxldGUnLFxyXG5cdFx0XHRcdHR5cGU6ICdyZWQnLFxyXG5cdFx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSA8Yj5cIicgKyAgdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCkgKyAnXCI8L2I+PycsXHJcblx0XHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdFx0ZGVsZXRlOiB7XHJcblx0XHRcdFx0XHRcdGJ0bkNsYXNzOiAnYnRuLXJlZCcsXHJcblx0XHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWMuZWxlbWVudC5oaWRlKGNvbmZpZy5hbmltdGlvbnMuc2xvdywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG9waWMucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Y3JlYXRlRWRpdFRvcGljRE9NOiBmdW5jdGlvbih0b3BpY0lkLCBvcmlnaW5hbE5hbWUpe1xyXG5cdFx0XHQkKFwiLmVkaXQtdG9waWMtbGlzdFwiKS5wcmVwZW5kKCc8bGkgY2xhc3M9XCJ0b3BpY1wiIGRhdGEtdG9waWMtaWQ9XCInICsgdG9waWNJZCArJ1wiIGRhdGEtb3JpZ2luYWwtdG9waWMtbmFtZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48aW5wdXQgc3BlbGxjaGVjaz1cInRydWVcIiBuYW1lPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBlZGl0LXRvcGljXCIgdHlwZT1cInN1Ym1pdFwiPkVkaXQ8L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRlbGV0ZS10b3BpYyBidXR0b24tLWRhbmdlclwiPkRlbGV0ZTwvYnV0dG9uPjwvbGk+Jyk7XHJcblx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBlZGl0VG9waWMgPSB0aGlzO1xyXG5cdFx0dGhpcy5lZGl0QnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZWRpdFRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHRcdHRoaXMuZGVsZXRlQnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZGVsZXRlVG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkVESVRfVE9QSUMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuRWRpdFRvcGljID0gbmV3IEVkaXRUb3BpYyh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDcgRG90TWVudVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBEb3RNZW51ID0gZnVuY3Rpb24gTWVudShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmJ1dHRvbiA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLm1lbnUgPSBudWxsO1xyXG5cdFx0dGhpcy5pc1RhYmxlRG90TWVudSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERPVF9NRU5VOiAnLmRvdC1tZW51JyxcclxuXHRcdEFDVElWQVRPUjogJy5kb3QtbWVudV9fYWN0aXZhdG9yJyxcclxuXHRcdElTX1ZJU0lCTEU6ICcuaXMtdmlzaWJsZScsXHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZScsXHJcblx0XHRCT1RUT01fTEVGVDogJ2RvdC1tZW51LS1ib3R0b20tbGVmdCcsXHJcblx0XHRCT1RUT01fUklHSFQ6ICdkb3QtbWVudS0tYm90dG9tLXJpZ2h0JyxcclxuXHRcdFRPUF9MRUZUOiAnZG90LW1lbnUtLXRvcC1sZWZ0JyxcclxuXHRcdFRPUF9SSUdIVDogJ2RvdC1tZW51LS10b3AtcmlnaHQnLFxyXG5cdFx0VEFCTEVfRE9UX01FTlU6ICdkb3QtbWVudS0tdGFibGUnXHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBidXR0b25SZWN0ID0gdGhpcy5idXR0b25bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX0xFRlQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCBsZWZ0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX0xFRlQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5yaWdodCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICdib3R0b20gcmlnaHQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfUklHSFQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICdib3R0b20gbGVmdCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcblx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZCh0aGlzKSgpO1xyXG5cdFx0dGhpcy5tZW51LmFkZENsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdFx0dGhpcy5tZW51LnNob3coKTtcclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5tZW51LnJlbW92ZUNsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdFx0dGhpcy5tZW51LmhpZGUoKTtcclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQodGhpcykoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLnNob3cuYmluZCh0aGlzKSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBkb3RNZW51ID0gdGhpcztcclxuXHRcdHZhciBtZW51SWQgPSAkKHRoaXMuYnV0dG9uKS5hdHRyKCdpZCcpICsgJy1tZW51JztcclxuXHJcblx0XHR0aGlzLm1lbnUgPSAkKCcjJyArIG1lbnVJZCk7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gdGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLlRBQkxFX0RPVF9NRU5VKTtcclxuXHJcblx0XHR0aGlzLmJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLnRvZ2dsZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihkb3RNZW51Lm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihkb3RNZW51Lm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRpZighdGFyZ2V0LmlzKGRvdE1lbnUubWVudSkgfHwgIXRhcmdldC5pcyhkb3RNZW51LmJ1dHRvbikpIHtcclxuXHRcdFx0XHRpZighJC5jb250YWlucygkKGRvdE1lbnUubWVudSlbMF0sIGUudGFyZ2V0KSl7XHJcblx0XHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkFDVElWQVRPUikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5Eb3RNZW51ID0gbmV3IERvdE1lbnUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT1cclxuXHRcdDUuIFNlY29uZCBNYXJrZXJcclxuXHQgICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0dmFyIE1hcmtlciA9IGZ1bmN0aW9uIE1hcmtlcigpIHtcclxuXHRcdGlmKCQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpLmxlbmd0aCA8IDEgfHwgJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIikubGVuZ3RoIDwgMSl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHRcdHRoaXMuc3R1ZGVudFRhYmxlID0gJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIik7XHJcblx0XHR0aGlzLnN0dWRlbnREYXRhVGFibGUgPSB0aGlzLnN0dWRlbnRUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdFx0dGhpcy5zdXBlcnZpc29yRGF0YVRhYmxlID0gdGhpcy5zdXBlcnZpc29yVGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRcdEFTU0lHTl9NQVJLRVI6ICcvYWRtaW4vbWFya2VyLWFzc2lnbicsXHJcblx0fTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50ID0gZnVuY3Rpb24oc3R1ZGVudFJvd0RPTSwgbWFya2VyKXtcclxuXHRcdHZhciByb3cgPSAkKHN0dWRlbnRSb3dET00pO1xyXG5cclxuXHRcdG1hcmtlci51bnNlbGVjdEFsbChtYXJrZXIpO1xyXG5cdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gJChyb3cpO1xyXG5cclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQodGhpcykuZGF0YSgnbWFya2VyLWlkJykgPT0gcm93LmRhdGEoJ3N1cGVydmlzb3ItaWQnKSl7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yID0gZnVuY3Rpb24oc3VwZXJ2aXNvclJvd0RPTSwgbWFya2VyKXtcclxuXHRcdHZhciByb3cgPSAkKHN1cGVydmlzb3JSb3dET00pO1xyXG5cclxuXHRcdGlmKHJvdy5hdHRyKCdkaXNhYmxlZCcpKXtyZXR1cm47fVxyXG5cclxuXHRcdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgIT0gbnVsbCl7XHJcblx0XHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gcm93O1xyXG5cdFx0XHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2coXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LW5hbWUnKSxcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N1cGVydmlzb3ItbmFtZScpLFxyXG5cdFx0XHRcdHJvdy5kYXRhKCdtYXJrZXItbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUucmVzZXRWaWV3ID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUudW5zZWxlY3RBbGwgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihzdHVkZW50TmFtZSwgc3VwZXJ2aXNvck5hbWUsIG1hcmtlck5hbWUsIHByb2plY3Qpe1xyXG5cdFx0JChcIiNzdHVkZW50LW5hbWVcIikudGV4dChzdHVkZW50TmFtZSk7XHJcblx0XHQkKFwiI3N1cGVydmlzb3ItbmFtZVwiKS50ZXh0KHN1cGVydmlzb3JOYW1lKTtcclxuXHRcdCQoXCIjbWFya2VyLW5hbWVcIikudGV4dChtYXJrZXJOYW1lKTtcclxuXHJcblx0XHQkKFwiI3Byb2plY3QtdGl0bGVcIikuaHRtbCgnPGI+VGl0bGU6IDwvYj4nICsgcHJvamVjdFsndGl0bGUnXSk7XHJcblx0XHQkKFwiI3Byb2plY3QtZGVzY3JpcHRpb25cIikuaHRtbCgnPGI+RGVzY3JpcHRpb246IDwvYj4nICsgcHJvamVjdFsnZGVzY3JpcHRpb24nXSk7XHJcblxyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0fVxyXG5cclxuXHQkKCcjc3VibWl0QXNzaWduTWFya2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB3aW5kb3dbJ01hcmtlciddO1xyXG5cclxuXHRcdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPT0gbnVsbCB8fCBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID09IG51bGwpe1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHR2YXIgcHJvamVjdElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JylbJ2lkJ107XHJcblx0XHR2YXIgc3R1ZGVudElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LWlkJyk7XHJcblx0XHR2YXIgbWFya2VySWQgPSBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yLmRhdGEoJ21hcmtlci1pZCcpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiUEFUQ0hcIixcclxuXHRcdFx0dXJsOiBtYXJrZXIuVXJsc18uQVNTSUdOX01BUktFUixcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZCxcclxuXHRcdFx0XHRzdHVkZW50X2lkOiBzdHVkZW50SWQsXHJcblx0XHRcdFx0bWFya2VyX2lkOiBtYXJrZXJJZCxcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5yZW1vdmUoKTtcclxuXHRcdFx0bWFya2VyLnJlc2V0VmlldyhtYXJrZXIpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbWFya2VyID0gdGhpcztcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQodGhpcywgbWFya2VyKTsgfSk7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yKHRoaXMsIG1hcmtlcik7IH0pO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdHdpbmRvd1snTWFya2VyJ10gPSBuZXcgTWFya2VyKCk7XHJcblx0fVxyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=