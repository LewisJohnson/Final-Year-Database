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
					createToast('success', 'Your name is being shared with other students.');
				} else {
					createToast('', 'You are no longer sharing your name with other students.');
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
					createToast('success', response.message);
				} else {
					createToast('error', response.message);
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
									createToast('success', 'Undo successful.');
								} else {
									createToast('error', response.message);
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
		createToast('error', 'Something went wrong with that request.');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGY3Nzc2N2MxYzNjMWY5OWEzMDQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIm9uIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVxIiwiZGF0YSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpbmRleCIsInZhbHVlIiwiaXMiLCJwcm9wIiwic2V0VGltZW91dCIsImUiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInJlbW92ZUNsYXNzIiwiaGlkZSIsImFmdGVyIiwiY3NzIiwiYWpheCIsInVybCIsInR5cGUiLCJzZXJpYWxpemUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJzaGFyZV9uYW1lIiwiY3JlYXRlVG9hc3QiLCJzdWNjZXNzZnVsIiwibWVzc2FnZSIsInN1Ym1pdCIsIkFqYXhGdW5jdGlvbnMiLCJwcm90b3R5cGUiLCJTZWxlY3RvcnNfIiwiTE9HX0lOX0RJQUxPRyIsImRpYWxvZyIsInNob3dMb2FkZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhpZGVMb2FkZXIiLCJzaG93IiwiYWRkQ2xhc3MiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiSlNPTiIsInBhcnNlIiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsInN2Z0NvbnRhaW5lciIsInN2ZyIsIndpbmRvdyIsInByb2plY3RJZCIsImFjdGlvbiIsImFqYXhVcmwiLCJwcm9qZWN0X2lkIiwiZHJvcGRvd24iLCJjb250ZW50IiwibWVkaXVtIiwicmVzdWx0IiwiYnV0dG9uc0h0bWwiLCJwcmV2aWV3SHRtbCIsImluc2VydEF0Q2FyZXQiLCJ3cmFwVGV4dFdpdGhUYWciLCJpbnB1dFVybCIsInByb21wdCIsImlucHV0QWx0IiwiaW5wdXRUZXh0IiwidGhlbWUiLCJlc2NhcGVLZXkiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsInRpdGxlIiwiY2FyZCIsInBhcmVudCIsImNvbmZpcm0iLCJpY29uIiwiYXV0b0Nsb3NlIiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwibWV0aG9kIiwicmVtb3ZlIiwiY2FuY2VsIiwiZGVsYXkiLCJhbmltYXRlIiwib3BhY2l0eSIsImJpbmQiLCJkb2N1bWVudCIsImFqYXhFcnJvciIsImV2ZW50IiwicmVxdWVzdCIsInNldHRpbmdzIiwic2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbiIsIk1vYmlsZU1lbnUiLCJlbGVtZW50IiwiYWN0aXZhdG9yIiwiSEFNQlVSR0VSX0NPTlRBSU5FUiIsInVuZGVybGF5IiwiVU5ERVJMQVkiLCJpbml0IiwibG9nIiwiQ3NzQ2xhc3Nlc18iLCJJU19WSVNJQkxFIiwiTU9CSUxFX01FTlUiLCJvcGVuTWVudSIsImNsb3NlTWVudSIsIm1vYmlsZU1lbnUiLCJpbml0QWxsIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImhlYWRlciIsIkRJQUxPR19IRUFERVIiLCJESUFMT0dfQ09OVEVOVCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwicHVzaCIsImVyciIsInJlYWR5Iiwia2V5ZG93biIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJzZWxlY3RBbGxSb3dzIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJDb2x1bW5Ub2dnbGVUYWJsZSIsImhlYWQiLCJzZWxlY3Rvck1lbnUiLCJzZWxlY3RvckJ1dHRvbiIsIlRPR0dMRV9UQUJMRSIsIkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04iLCJDT0xVTU5fU0VMRUNUT1JfTUVOVSIsInRvZ2dsZUNvbHVtbiIsImNvbHVtbkluZGV4IiwidGFibGUiLCJjaGVja2VkIiwiY2hpbGRyZW4iLCJyZW1vdmVBdHRyIiwicmVmcmVzaCIsImhpZGVJbmRpY2VzIiwicmVmcmVzaEFsbCIsInRvZ2dsZVRhYmxlIiwiY29sdW1uU2VsZWN0b3JCdXR0b24iLCJjb2x1bW5TZWxlY3Rvck1lbnUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCIsIlNFQVJDSF9JTlBVVCIsIlNFQVJDSF9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQlVUVE9OIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwidG9waWNfaWQiLCJ0b3BpY19uYW1lIiwiZGVsZXRlVG9waWMiLCJkZWxldGUiLCJzbG93IiwiRG90TWVudSIsIk1lbnUiLCJidXR0b24iLCJtZW51IiwiaXNUYWJsZURvdE1lbnUiLCJET1RfTUVOVSIsIkFDVElWQVRPUiIsIkJPVFRPTV9MRUZUIiwiQk9UVE9NX1JJR0hUIiwiVE9QX0xFRlQiLCJUT1BfUklHSFQiLCJUQUJMRV9ET1RfTUVOVSIsInBvc2l0aW9uTWVudSIsImJ1dHRvblJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJsZWZ0IiwicGFyc2VJbnQiLCJ0b3AiLCJyaWdodCIsInRvZ2dsZSIsImRvdE1lbnUiLCJtZW51SWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJjb250YWlucyIsIk1hcmtlciIsInNlbGVjdGVkU3R1ZGVudCIsInNlbGVjdGVkU3VwZXJ2aXNvciIsInN0dWRlbnRUYWJsZSIsInN0dWRlbnREYXRhVGFibGUiLCJzdXBlcnZpc29yVGFibGUiLCJzdXBlcnZpc29yRGF0YVRhYmxlIiwiQVNTSUdOX01BUktFUiIsInNlbGVjdFN0dWRlbnQiLCJzdHVkZW50Um93RE9NIiwibWFya2VyIiwidW5zZWxlY3RBbGwiLCJzZWxlY3RTdXBlcnZpc29yIiwic3VwZXJ2aXNvclJvd0RPTSIsInJlc2V0VmlldyIsInN0dWRlbnROYW1lIiwic3VwZXJ2aXNvck5hbWUiLCJtYXJrZXJOYW1lIiwicHJvamVjdCIsInN0dWRlbnRJZCIsIm1hcmtlcklkIiwic3R1ZGVudF9pZCIsIm1hcmtlcl9pZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFBOzs7Ozs7QUFNQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQTtBQUNBLENBQUNBLEVBQUUsWUFBVzs7QUFFYjs7O0FBR0FBLEdBQUVDLFNBQUYsQ0FBWTtBQUNYQyxXQUFTO0FBQ1IsbUJBQWdCRixFQUFFLHlCQUFGLEVBQTZCRyxJQUE3QixDQUFrQyxTQUFsQztBQURSO0FBREUsRUFBWjs7QUFNQTs7OztBQUlBLEtBQUdILEVBQUUsc0JBQUYsRUFBMEJJLE1BQTFCLEdBQW1DLENBQXRDLEVBQXdDO0FBQ3ZDSixJQUFFLGVBQUYsRUFBbUJLLE1BQW5CLENBQTBCLDJGQUExQjtBQUNBOztBQUVEO0FBQ0FMLEdBQUUsV0FBRixFQUFlRyxJQUFmLENBQW9CLFVBQXBCLEVBQWdDLEdBQWhDO0FBQ0FILEdBQUUsb0JBQUYsRUFBd0JHLElBQXhCLENBQTZCLFVBQTdCLEVBQXlDLElBQXpDO0FBQ0FILEdBQUUsK0JBQUYsRUFBbUNHLElBQW5DLENBQXdDLFVBQXhDLEVBQW9ELEdBQXBEOztBQUVBO0FBQ0FILEdBQUUsY0FBRixFQUFrQk0sT0FBbEIsQ0FBMEJOLEVBQUUsUUFBRixDQUExQjtBQUNBQSxHQUFFLHNCQUFGLEVBQTBCTyxPQUExQixDQUFrQyxDQUFsQztBQUNBUCxHQUFFLGlCQUFGLEVBQXFCUSxLQUFyQixHQUE2QkMsTUFBN0IsQ0FBb0NDLE9BQU9DLFNBQVAsQ0FBaUJDLElBQXJELEVBQTJELFNBQVNDLGFBQVQsR0FBeUI7QUFDbkZiLElBQUUsSUFBRixFQUFRYyxJQUFSLENBQWMsaUJBQWQsRUFBa0NMLE1BQWxDLENBQXlDQyxPQUFPQyxTQUFQLENBQWlCQyxJQUExRCxFQUFnRUMsYUFBaEU7QUFDQSxFQUZEOztBQUlBYixHQUFFLGdCQUFGLEVBQW9CZSxJQUFwQixDQUF5QixZQUFXO0FBQ25DLE1BQUlDLE9BQU9oQixFQUFFLElBQUYsQ0FBWDtBQUNBOztBQUVBLE1BQUdnQixLQUFLQyxRQUFMLENBQWMsMEJBQWQsQ0FBSCxFQUE2QztBQUM1QyxPQUFHLENBQUNELEtBQUtiLElBQUwsQ0FBVSxJQUFWLENBQUosRUFBb0I7QUFDbkJlLFlBQVFDLEtBQVIsQ0FBYywwQkFBZDtBQUNBO0FBQ0E7O0FBRURILFFBQUtJLE1BQUwsQ0FBWSxtQ0FBbUNKLEtBQUtiLElBQUwsQ0FBVSxJQUFWLENBQW5DLEdBQXFELGdCQUFqRTtBQUNBa0IsNEJBQXlCTCxJQUF6QjtBQUNBOztBQUVELE1BQUdBLEtBQUtDLFFBQUwsQ0FBYyxzQkFBZCxDQUFILEVBQXlDO0FBQ3hDLE9BQUcsQ0FBQ0QsS0FBS2IsSUFBTCxDQUFVLElBQVYsQ0FBSixFQUFvQjtBQUNuQmUsWUFBUUMsS0FBUixDQUFjLDBCQUFkO0FBQ0E7QUFDQTs7QUFFREgsUUFBS0ksTUFBTCxDQUFZLG1DQUFtQ0osS0FBS2IsSUFBTCxDQUFVLElBQVYsQ0FBbkMsR0FBcUQsZ0JBQWpFO0FBQ0FtQix5QkFBc0JOLElBQXRCO0FBQ0E7O0FBRUQsTUFBR0EsS0FBS0MsUUFBTCxDQUFjLHNCQUFkLENBQUgsRUFBeUM7QUFDeEMsT0FBRyxDQUFDRCxLQUFLYixJQUFMLENBQVUsSUFBVixDQUFKLEVBQW9CO0FBQ25CZSxZQUFRQyxLQUFSLENBQWMsMEJBQWQ7QUFDQTtBQUNBOztBQUVESCxRQUFLSSxNQUFMLENBQVksbUNBQW1DSixLQUFLYixJQUFMLENBQVUsSUFBVixDQUFuQyxHQUFxRCxnQkFBakU7QUFDQW9CLHlCQUFzQlAsSUFBdEI7QUFDQTtBQUNELEVBakNEOztBQW1DQTs7O0FBR0FoQixHQUFFLE1BQUYsRUFBVXdCLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLDhCQUF2QixFQUF1RCxZQUFXO0FBQ2pFLE1BQUlDLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxHQUFULEVBQWE7QUFDekIsT0FBSUMsU0FBU0QsSUFBSUUsT0FBSixHQUFjQyxFQUFkLENBQWlCLENBQWpCLEVBQW9CQyxJQUFwQixDQUF5QixRQUF6QixDQUFiO0FBQ0EsT0FBSUMsY0FBYyxTQUFsQjtBQUNBLE9BQUlDLG1CQUFtQixrQkFBa0JMLE1BQWxCLEdBQTJCLGtCQUFsRDtBQUNBLE9BQUlNLHNCQUFzQixxQkFBcUJOLE1BQS9DOztBQUVBM0IsS0FBRWdDLGdCQUFGLEVBQW9CakIsSUFBcEIsQ0FBeUIsVUFBU21CLEtBQVQsRUFBZ0JDLEtBQWhCLEVBQXVCO0FBQy9DLFFBQUduQyxFQUFFbUMsS0FBRixFQUFTQyxFQUFULENBQVksVUFBWixLQUEyQixDQUFDcEMsRUFBRW1DLEtBQUYsRUFBU2xCLFFBQVQsQ0FBa0IsaUJBQWxCLENBQS9CLEVBQXFFO0FBQ3BFYyxvQkFBZS9CLEVBQUVtQyxLQUFGLEVBQVNMLElBQVQsQ0FBYyxPQUFkLENBQWY7QUFDQUMsb0JBQWUsR0FBZjtBQUNBO0FBQ0QsSUFMRDtBQU1BL0IsS0FBRWlDLG1CQUFGLEVBQXVCSSxJQUF2QixDQUE0QixNQUE1QixFQUFvQ04sV0FBcEM7QUFDQSxHQWJEO0FBY0FPLGFBQVdiLE9BQU96QixFQUFFLElBQUYsQ0FBUCxDQUFYLEVBQTRCLElBQTVCO0FBQ0EsRUFoQkQ7O0FBa0JBQSxHQUFFLE1BQUYsRUFBVXdCLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGlCQUF0QixFQUF5QyxVQUFTZSxDQUFULEVBQVk7QUFDcEQsTUFBR3ZDLEVBQUUsSUFBRixFQUFRcUMsSUFBUixDQUFhLE1BQWIsTUFBeUIsU0FBekIsSUFBc0NyQyxFQUFFLElBQUYsRUFBUXFDLElBQVIsQ0FBYSxNQUFiLE1BQXlCLElBQWxFLEVBQXVFO0FBQ3RFRyxTQUFNLDhCQUFOO0FBQ0FELEtBQUVFLGNBQUY7QUFDQTtBQUNELEVBTEQ7O0FBT0E7QUFDQXpDLEdBQUUsTUFBRixFQUFVd0IsRUFBVixDQUFhLE9BQWIsRUFBc0IsZ0JBQXRCLEVBQXlDLFVBQVNlLENBQVQsRUFBWTtBQUNwRCxNQUFJRyxxQkFBcUIxQyxFQUFFQSxFQUFFLElBQUYsRUFBUThCLElBQVIsQ0FBYSwwQkFBYixDQUFGLENBQXpCO0FBQ0EsTUFBSWEsZ0JBQWdCM0MsRUFBRUEsRUFBRSxJQUFGLEVBQVE4QixJQUFSLENBQWEseUNBQWIsQ0FBRixDQUFwQjs7QUFFQTlCLElBQUUsSUFBRixFQUFRNEMsV0FBUixDQUFvQixRQUFwQjs7QUFFQUYscUJBQW1CRyxJQUFuQjtBQUNBRixnQkFBY0UsSUFBZDtBQUNBRixnQkFBY0csS0FBZCxDQUFvQiw0RUFBcEI7O0FBRUE5QyxJQUFFLDZCQUFGLEVBQWlDK0MsR0FBakMsQ0FBcUMsU0FBckMsRUFBZ0QsT0FBaEQ7QUFDQSxFQVhEOztBQWFBO0FBQ0EvQyxHQUFFLGtCQUFGLEVBQXNCd0IsRUFBdEIsQ0FBeUIsUUFBekIsRUFBbUMsVUFBU2UsQ0FBVCxFQUFXO0FBQzdDQSxJQUFFRSxjQUFGOztBQUVBekMsSUFBRWdELElBQUYsQ0FBTztBQUNOQyxRQUFLakQsRUFBRSxJQUFGLEVBQVFxQyxJQUFSLENBQWEsUUFBYixDQURDO0FBRU5hLFNBQUssT0FGQztBQUdOcEIsU0FBTTlCLEVBQUUsSUFBRixFQUFRbUQsU0FBUixFQUhBO0FBSU5DLFlBQVEsaUJBQVNDLFFBQVQsRUFBa0I7QUFDekIsUUFBR0EsU0FBU0MsVUFBWixFQUF1QjtBQUN0QkMsaUJBQVksU0FBWixFQUF1QixnREFBdkI7QUFDQSxLQUZELE1BRU87QUFDTkEsaUJBQVksRUFBWixFQUFnQiwwREFBaEI7QUFDQTtBQUNEdkQsTUFBRSxhQUFGLEVBQWlCcUMsSUFBakIsQ0FBc0IsU0FBdEIsRUFBaUNnQixTQUFTQyxVQUExQztBQUNBO0FBWEssR0FBUDtBQWFBLEVBaEJEOztBQWtCQTtBQUNBdEQsR0FBRSxzQkFBRixFQUEwQndCLEVBQTFCLENBQTZCLFFBQTdCLEVBQXVDLFVBQVNlLENBQVQsRUFBVztBQUNqREEsSUFBRUUsY0FBRjs7QUFFQXpDLElBQUVnRCxJQUFGLENBQU87QUFDTkMsUUFBS2pELEVBQUUsSUFBRixFQUFRcUMsSUFBUixDQUFhLFFBQWIsQ0FEQztBQUVOYSxTQUFLLE9BRkM7QUFHTnBCLFNBQU05QixFQUFFLElBQUYsRUFBUW1ELFNBQVIsRUFIQTtBQUlOQyxZQUFRLGlCQUFTQyxRQUFULEVBQWtCO0FBQ3pCLFFBQUdBLFNBQVNHLFVBQVosRUFBdUI7QUFDdEJELGlCQUFZLFNBQVosRUFBdUJGLFNBQVNJLE9BQWhDO0FBQ0EsS0FGRCxNQUVPO0FBQ05GLGlCQUFZLE9BQVosRUFBcUJGLFNBQVNJLE9BQTlCO0FBQ0E7QUFDRDtBQVZLLEdBQVA7QUFZQSxFQWZEOztBQWlCQXpELEdBQUUsMEJBQUYsRUFBOEJ3QixFQUE5QixDQUFpQyxPQUFqQyxFQUEwQyxVQUFTZSxDQUFULEVBQVc7QUFDcER2QyxJQUFFLElBQUYsRUFBUTBELE1BQVI7QUFDQSxFQUZEOztBQUtBMUQsR0FBRSxZQUFGLEVBQWdCd0IsRUFBaEIsQ0FBbUIsUUFBbkIsRUFBNkIsVUFBU2UsQ0FBVCxFQUFXO0FBQ3ZDQSxJQUFFRSxjQUFGOztBQUVBekMsSUFBRSxhQUFGLEVBQWlCLFlBQWpCLEVBQStCK0MsR0FBL0IsQ0FBbUMsU0FBbkMsRUFBOEMsTUFBOUM7QUFDQS9DLElBQUUyRCxjQUFjQyxTQUFkLENBQXdCQyxVQUF4QixDQUFtQ0MsYUFBckMsRUFBb0QsQ0FBcEQsRUFBdURDLE1BQXZELENBQThEQyxVQUE5RDs7QUFFQWhFLElBQUVnRCxJQUFGLENBQU87QUFDTkMsUUFBS2pELEVBQUUsSUFBRixFQUFRcUMsSUFBUixDQUFhLFFBQWIsQ0FEQztBQUVOYSxTQUFLLE1BRkM7QUFHTnBCLFNBQU05QixFQUFFLElBQUYsRUFBUW1ELFNBQVIsRUFIQTtBQUlOQyxZQUFRLG1CQUFVO0FBQ2pCcEQsTUFBRSxhQUFGLEVBQWlCMkQsY0FBY0MsU0FBZCxDQUF3QkMsVUFBeEIsQ0FBbUNDLGFBQXBELEVBQW1FakIsSUFBbkU7QUFDQW9CLGFBQVNDLE1BQVQsQ0FBZ0IsSUFBaEI7QUFDQSxJQVBLO0FBUU4vQyxVQUFPLGVBQVVXLElBQVYsRUFBZ0I7QUFDdEI5QixNQUFFMkQsY0FBY0MsU0FBZCxDQUF3QkMsVUFBeEIsQ0FBbUNDLGFBQXJDLEVBQW9ELENBQXBELEVBQXVEQyxNQUF2RCxDQUE4REksVUFBOUQ7O0FBRUFuRSxNQUFFLGFBQUYsRUFBaUIyRCxjQUFjQyxTQUFkLENBQXdCQyxVQUF4QixDQUFtQ0MsYUFBcEQsRUFBbUVNLElBQW5FO0FBQ0FwRSxNQUFFLGlCQUFGLEVBQXFCMkQsY0FBY0MsU0FBZCxDQUF3QkMsVUFBeEIsQ0FBbUNDLGFBQXhELEVBQXVFTyxRQUF2RSxDQUFnRixXQUFoRjtBQUNBckUsTUFBRSxhQUFGLEVBQWlCMkQsY0FBY0MsU0FBZCxDQUF3QkMsVUFBeEIsQ0FBbUNDLGFBQXBELEVBQW1FUSxJQUFuRSxDQUF3RXhDLEtBQUssY0FBTCxFQUFxQixRQUFyQixFQUErQixVQUEvQixFQUEyQyxDQUEzQyxDQUF4RTtBQUNBO0FBZEssR0FBUDtBQWdCQSxFQXRCRDs7QUF3QkE5QixHQUFFLGlCQUFGLEVBQXFCd0IsRUFBckIsQ0FBd0IsUUFBeEIsRUFBa0MsVUFBU2UsQ0FBVCxFQUFZO0FBQzdDQSxJQUFFRSxjQUFGOztBQUVBLE1BQUk4QixlQUFldkUsRUFBRSxJQUFGLEVBQVF3RSxJQUFSLENBQWEsU0FBYixDQUFuQjtBQUNBRCxlQUFhRSxJQUFiLENBQWtCLDRCQUFsQjtBQUNBekUsSUFBRSxTQUFGLEVBQWF1RSxZQUFiLEVBQTJCeEIsR0FBM0IsQ0FBK0IsU0FBL0IsRUFBMEMsT0FBMUM7O0FBRUEvQyxJQUFFZ0QsSUFBRixDQUFPO0FBQ05DLFFBQUtqRCxFQUFFLElBQUYsRUFBUXFDLElBQVIsQ0FBYSxRQUFiLENBREM7QUFFTmEsU0FBSyxNQUZDO0FBR053QixZQUFTMUUsRUFBRSxJQUFGLENBSEg7QUFJTjhCLFNBQU05QixFQUFFLElBQUYsRUFBUW1ELFNBQVIsRUFKQTtBQUtOQyxZQUFRLGlCQUFTdEIsSUFBVCxFQUFjO0FBQ3JCQSxXQUFPNkMsS0FBS0MsS0FBTCxDQUFXOUMsSUFBWCxDQUFQO0FBQ0ErQyxjQUFVakIsU0FBVixDQUFvQmtCLFNBQXBCLENBQThCQyxrQkFBOUIsQ0FBaURqRCxLQUFLLElBQUwsQ0FBakQsRUFBNkRBLEtBQUssTUFBTCxDQUE3RDtBQUNBO0FBUkssR0FBUCxFQVNHa0QsSUFUSCxDQVNRLFlBQVU7QUFDakJoRixLQUFFLElBQUYsRUFBUXdFLElBQVIsQ0FBYSxPQUFiLEVBQXNCUyxHQUF0QixDQUEwQixFQUExQjtBQUNBakYsS0FBRSxJQUFGLEVBQVF3RSxJQUFSLENBQWEsU0FBYixFQUF3QkMsSUFBeEIsQ0FBNkIsS0FBN0I7QUFDQSxHQVpEO0FBYUEsRUFwQkQ7O0FBc0JBO0FBQ0E7QUFDQTs7QUFFQXpFLEdBQUUsc0JBQUYsRUFBMEJ3QixFQUExQixDQUE2QixRQUE3QixFQUF1QyxZQUFVO0FBQ2hEeEIsSUFBRSxtQkFBRixFQUF1QmlGLEdBQXZCLENBQTJCakYsRUFBRSxJQUFGLEVBQVFpRixHQUFSLEtBQWdCLGVBQTNDO0FBQ0EsRUFGRDs7QUFJQWpGLEdBQUUsa0JBQUYsRUFBc0I2QyxJQUF0QjtBQUNBN0MsR0FBRSxlQUFGLEVBQW1CNkMsSUFBbkI7O0FBRUE3QyxHQUFFLDRCQUFGLEVBQWdDd0IsRUFBaEMsQ0FBbUMsUUFBbkMsRUFBNkMsWUFBVTtBQUN0RCxNQUFHeEIsRUFBRSxtQkFBRixFQUF1Qm9DLEVBQXZCLENBQTBCLFdBQTFCLENBQUgsRUFBMkM7QUFDMUNwQyxLQUFFLGVBQUYsRUFBbUJvRSxJQUFuQjtBQUNBLEdBRkQsTUFFTztBQUNOcEUsS0FBRSxlQUFGLEVBQW1CNkMsSUFBbkI7QUFDQTtBQUNELE1BQUc3QyxFQUFFLG9CQUFGLEVBQXdCb0MsRUFBeEIsQ0FBMkIsV0FBM0IsQ0FBSCxFQUE0QztBQUMzQ3BDLEtBQUUsa0JBQUYsRUFBc0JvRSxJQUF0QjtBQUNBLEdBRkQsTUFFTztBQUNOcEUsS0FBRSxrQkFBRixFQUFzQjZDLElBQXRCO0FBQ0E7QUFDRCxFQVhEOztBQWFBN0MsR0FBRSxzQkFBRixFQUEwQndCLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLFlBQVc7QUFDaEQsTUFBSTBELGVBQWVsRixFQUFFLElBQUYsQ0FBbkI7QUFDQSxNQUFJbUYsTUFBTUQsYUFBYVYsSUFBYixDQUFrQixLQUFsQixDQUFWOztBQUVBLE1BQUdZLE9BQU8sU0FBUCxLQUFxQixJQUF4QixFQUE2QjtBQUM1QixPQUFJQyxZQUFZRCxPQUFPLFNBQVAsRUFBa0J0RCxJQUFsQixDQUF1QixZQUF2QixDQUFoQjtBQUNBLEdBRkQsTUFFTztBQUNOLE9BQUl1RCxZQUFZckYsRUFBRSxJQUFGLEVBQVE4QixJQUFSLENBQWEsWUFBYixDQUFoQjtBQUNBOztBQUVEcUQsTUFBSXRDLElBQUosQ0FBUyxDQUFUO0FBQ0E3QyxJQUFFLFNBQUYsRUFBYWtGLFlBQWIsRUFBMkJkLElBQTNCLENBQWdDLENBQWhDOztBQUVBLE1BQUdlLElBQUlsRSxRQUFKLENBQWEsV0FBYixDQUFILEVBQTZCO0FBQzVCLE9BQUlxRSxTQUFTLFFBQWI7QUFDQSxPQUFJQyxVQUFVLDRCQUFkO0FBRUEsR0FKRCxNQUlPO0FBQ04sT0FBSUQsU0FBUyxLQUFiO0FBQ0EsT0FBSUMsVUFBVSx5QkFBZDtBQUNBOztBQUVEdkYsSUFBRWdELElBQUYsQ0FBTztBQUNOQyxRQUFLc0MsT0FEQztBQUVOckMsU0FBSyxPQUZDO0FBR05wQixTQUFNO0FBQ0wwRCxnQkFBWUg7QUFEUCxJQUhBO0FBTU5qQyxZQUFRLG1CQUFVO0FBQ2pCLFFBQUdrQyxVQUFVLEtBQWIsRUFBbUI7QUFDbEJILFNBQUlkLFFBQUosQ0FBYSxXQUFiO0FBQ0EsS0FGRCxNQUVPO0FBQ05jLFNBQUl2QyxXQUFKLENBQWdCLFdBQWhCO0FBQ0E7QUFDRDtBQVpLLEdBQVAsRUFhR29DLElBYkgsQ0FhUSxVQUFTbEQsSUFBVCxFQUFjO0FBQ3JCcUQsT0FBSTFFLE1BQUosQ0FBV0MsT0FBT0MsU0FBUCxDQUFpQkMsSUFBNUI7QUFDQVosS0FBRSxTQUFGLEVBQWFrRixZQUFiLEVBQTJCckMsSUFBM0IsQ0FBZ0MsQ0FBaEM7QUFDQSxHQWhCRDtBQWlCQSxFQXZDRDs7QUF5Q0E3QyxHQUFFLDBCQUFGLEVBQThCd0IsRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVTtBQUNuRCxNQUFJaUUsV0FBV3pGLEVBQUUsSUFBRixDQUFmO0FBQ0EsTUFBSTBGLFVBQVVELFNBQVNqQixJQUFULENBQWMsbUJBQWQsQ0FBZDs7QUFFQSxNQUFHaUIsU0FBU3RGLElBQVQsQ0FBYyxlQUFkLEtBQWtDLE1BQXJDLEVBQTRDO0FBQzNDc0YsWUFBU3RGLElBQVQsQ0FBYyxlQUFkLEVBQStCLEtBQS9CO0FBQ0F1RixXQUFRdkYsSUFBUixDQUFhLGFBQWIsRUFBNEIsSUFBNUI7O0FBRUFzRixZQUFTakIsSUFBVCxDQUFjLG9CQUFkLEVBQW9DekIsR0FBcEMsQ0FBd0MsV0FBeEMsRUFBcUQsZUFBckQ7QUFDQTBDLFlBQVM3QyxXQUFULENBQXFCLFFBQXJCO0FBQ0E4QyxXQUFRN0MsSUFBUixDQUFhbkMsT0FBT0MsU0FBUCxDQUFpQmdGLE1BQTlCO0FBQ0EsR0FQRCxNQU9PO0FBQ05GLFlBQVN0RixJQUFULENBQWMsZUFBZCxFQUErQixJQUEvQjtBQUNBdUYsV0FBUXZGLElBQVIsQ0FBYSxhQUFiLEVBQTRCLEtBQTVCOztBQUVBc0YsWUFBU2pCLElBQVQsQ0FBYyxvQkFBZCxFQUFvQ3pCLEdBQXBDLENBQXdDLFdBQXhDLEVBQXFELGlCQUFyRDtBQUNBMEMsWUFBU3BCLFFBQVQsQ0FBa0IsUUFBbEI7QUFDQXFCLFdBQVF0QixJQUFSLENBQWExRCxPQUFPQyxTQUFQLENBQWlCZ0YsTUFBOUI7QUFDQTtBQUNELEVBbkJEOztBQXNCQTtBQUNBM0YsR0FBRSxjQUFGLEVBQWtCZSxJQUFsQixDQUF1QixVQUFTbUIsS0FBVCxFQUFnQkMsS0FBaEIsRUFBc0I7QUFDNUNuQyxJQUFFZ0QsSUFBRixDQUFPO0FBQ05DLFFBQUssc0NBREM7QUFFTkMsU0FBSyxLQUZDO0FBR05FLFlBQVEsaUJBQVN3QyxNQUFULEVBQWdCO0FBQ3ZCNUYsTUFBRSxxQkFBRixFQUF5QjhDLEtBQXpCLENBQStCOEMsTUFBL0I7QUFDQTtBQUxLLEdBQVA7O0FBUUEsTUFBSUMsY0FBYyx5SkFBbEI7QUFDQSxNQUFJQyxjQUFjLDRGQUFsQjs7QUFFQTlGLElBQUUscUJBQUYsRUFBeUJvQixNQUF6QixDQUFnQ3lFLFdBQWhDO0FBQ0E3RixJQUFFLGNBQUYsRUFBa0I4QyxLQUFsQixDQUF3QmdELFdBQXhCOztBQUVBOUYsSUFBRSxpQ0FBRixFQUFxQzZDLElBQXJDO0FBQ0E3QyxJQUFFLHVCQUFGLEVBQTJCeUUsSUFBM0IsQ0FBZ0N6RSxFQUFFLHFCQUFGLEVBQXlCaUYsR0FBekIsRUFBaEM7QUFDQSxFQWpCRDs7QUFtQkFqRixHQUFFLHFCQUFGLEVBQXlCd0IsRUFBekIsQ0FBNEIsUUFBNUIsRUFBc0MsWUFBVTtBQUMvQ3hCLElBQUUsdUJBQUYsRUFBMkJ5RSxJQUEzQixDQUFnQ3pFLEVBQUUsSUFBRixFQUFRaUYsR0FBUixFQUFoQztBQUNBLEVBRkQ7O0FBSUFqRixHQUFFLGlDQUFGLEVBQXFDd0IsRUFBckMsQ0FBd0MsT0FBeEMsRUFBaUQsWUFBVTtBQUMxRHhCLElBQUUscUJBQUYsRUFBeUJvRSxJQUF6QjtBQUNBcEUsSUFBRSx1QkFBRixFQUEyQm9FLElBQTNCO0FBQ0FwRSxJQUFFLGlDQUFGLEVBQXFDNkMsSUFBckM7QUFDQSxFQUpEOztBQU1BN0MsR0FBRSxvQ0FBRixFQUF3Q3dCLEVBQXhDLENBQTJDLE9BQTNDLEVBQW9ELFlBQVU7QUFDN0R4QixJQUFFLHFCQUFGLEVBQXlCNkMsSUFBekI7QUFDQTdDLElBQUUsdUJBQUYsRUFBMkI2QyxJQUEzQjtBQUNBN0MsSUFBRSxpQ0FBRixFQUFxQ29FLElBQXJDO0FBQ0EsRUFKRDs7QUFNQTtBQUNBcEUsR0FBRSxjQUFGLEVBQWtCd0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsaUNBQTlCLEVBQWtFLFVBQVNlLENBQVQsRUFBWTtBQUM3RSxVQUFPdkMsRUFBRSxJQUFGLEVBQVE4QixJQUFSLENBQWEsTUFBYixDQUFQO0FBQ0MsUUFBSyxXQUFMO0FBQ0NpRSxrQkFBYyxvQkFBZCxFQUFvQyxNQUFwQztBQUNBOztBQUVELFFBQUssSUFBTDtBQUNDQSxrQkFBYyxvQkFBZCxFQUFvQyx3RUFBcEM7QUFDQTs7QUFFRCxRQUFLLElBQUw7QUFDQ0Esa0JBQWMsb0JBQWQsRUFBb0Msd0VBQXBDO0FBQ0E7O0FBRUQsUUFBSyxNQUFMO0FBQ0NDLG9CQUFnQixvQkFBaEIsRUFBc0MsR0FBdEM7QUFDQTs7QUFFRCxRQUFLLElBQUw7QUFDQ0Esb0JBQWdCLG9CQUFoQixFQUFzQyxJQUF0QztBQUNBOztBQUVELFFBQUssUUFBTDtBQUNDQSxvQkFBZ0Isb0JBQWhCLEVBQXNDLEdBQXRDO0FBQ0E7O0FBRUQsUUFBSyxXQUFMO0FBQ0NBLG9CQUFnQixvQkFBaEIsRUFBc0MsR0FBdEM7QUFDQTs7QUFFRCxRQUFLLEtBQUw7QUFDQyxRQUFJQyxXQUFXQyxPQUFPLHFCQUFQLEVBQThCLGNBQTlCLENBQWY7QUFDQSxRQUFJQyxXQUFXRCxPQUFPLGdCQUFQLEVBQXlCLHdCQUF6QixDQUFmO0FBQ0FILGtCQUFjLG9CQUFkLEVBQW9DLGVBQWVJLFFBQWYsR0FBMEIsU0FBMUIsR0FBc0NGLFFBQXRDLEdBQWlELElBQXJGO0FBQ0E7O0FBRUQsUUFBSyxNQUFMO0FBQ0MsUUFBSUEsV0FBV0MsT0FBTyxlQUFQLEVBQXdCLGNBQXhCLENBQWY7QUFDQSxRQUFJRSxZQUFZRixPQUFPLG9CQUFQLEVBQTZCLFFBQTdCLENBQWhCO0FBQ0FILGtCQUFjLG9CQUFkLEVBQW9DLGNBQWNFLFFBQWQsR0FBeUIsSUFBekIsR0FBZ0NHLFNBQWhDLEdBQTRDLE1BQWhGO0FBQ0E7O0FBRUQsUUFBSyxNQUFMO0FBQ0NKLG9CQUFnQixvQkFBaEIsRUFBc0MsTUFBdEM7QUFDQTs7QUFFRCxRQUFLLEtBQUw7QUFDQ0Esb0JBQWdCLG9CQUFoQixFQUFzQyxLQUF0QztBQUNBOztBQUVELFFBQUssTUFBTDtBQUNDaEcsTUFBRStELE1BQUYsQ0FBUztBQUNSc0MsWUFBTyxVQURDO0FBRVJDLGdCQUFXLElBRkg7QUFHUkMseUJBQXFCLEtBSGI7QUFJUkMsd0JBQW1CLElBSlg7QUFLUkMsWUFBTyxrQkFMQztBQU1SZixjQUFTO0FBTkQsS0FBVDtBQVFBO0FBMURGO0FBNERBLEVBN0REOztBQWdFQTFGLEdBQUUsc0JBQUYsRUFBMEJ3QixFQUExQixDQUE2QixPQUE3QixFQUFzQyxVQUFTZSxDQUFULEVBQVk7QUFDakQsTUFBSW1FLE9BQU8xRyxFQUFFLElBQUYsRUFBUTJHLE1BQVIsRUFBWDs7QUFFQTNHLElBQUU0RyxPQUFGLENBQVU7QUFDVEgsVUFBTyx3QkFERTtBQUVUdkQsU0FBTSxLQUZHO0FBR1QyRCxTQUFNLHlPQUhHO0FBSVRSLFVBQU8sUUFKRTtBQUtUQyxjQUFXLElBTEY7QUFNVEUsc0JBQW1CLElBTlY7QUFPVEQsdUJBQXFCLEtBUFo7QUFRVE8sY0FBVyxjQVJGO0FBU1RwQixZQUFTLCtEQVRBO0FBVVRxQixZQUFTO0FBQ1JILGFBQVM7QUFDUkksZUFBVSxTQURGO0FBRVIxQixhQUFRLGtCQUFVO0FBQ2pCdEYsUUFBRWdELElBQUYsQ0FBTztBQUNOaUUsZUFBUSxPQURGO0FBRU5oRSxZQUFLLGlDQUZDO0FBR05HLGdCQUFRLGlCQUFTQyxRQUFULEVBQWtCO0FBQ3pCLFlBQUdBLFNBQVNHLFVBQVosRUFBdUI7QUFDdEJrRCxjQUFLN0QsSUFBTCxDQUFVLEdBQVYsRUFBZSxZQUFXO0FBQUU2RCxlQUFLUSxNQUFMO0FBQWdCLFVBQTVDO0FBQ0EzRCxxQkFBWSxTQUFaLEVBQXVCLGtCQUF2QjtBQUNBLFNBSEQsTUFHTztBQUNOQSxxQkFBWSxPQUFaLEVBQXFCRixTQUFTSSxPQUE5QjtBQUNBO0FBQ0Q7QUFWSyxPQUFQO0FBWUE7QUFmTyxLQUREO0FBa0JSMEQsWUFBUTtBQWxCQTtBQVZBLEdBQVY7QUErQkEsRUFsQ0Q7O0FBb0NBOzs7O0FBSUE7QUFDQSxLQUFHbkgsRUFBRSxlQUFGLEVBQW1CSSxNQUFuQixHQUE0QixDQUEvQixFQUFpQztBQUNoQ2dGLFNBQU8sU0FBUCxJQUFvQnBGLEVBQUUsZUFBRixDQUFwQjtBQUNBOztBQUVEQSxHQUFFLHNCQUFGLEVBQTBCK0MsR0FBMUIsQ0FBOEIsU0FBOUIsRUFBeUMsQ0FBekM7O0FBRUEsS0FBSXFFLFFBQVEsQ0FBWjtBQUNBcEgsR0FBRSxzQkFBRixFQUEwQmUsSUFBMUIsQ0FBK0IsVUFBU21CLEtBQVQsRUFBZ0JDLEtBQWhCLEVBQXVCO0FBQ3JEaUYsV0FBUyxHQUFUO0FBQ0E5RSxhQUFXLFlBQVU7QUFDcEJ0QyxLQUFFLElBQUYsRUFBUXFFLFFBQVIsQ0FBaUIsb0JBQWpCOztBQUVBckUsS0FBRSxJQUFGLEVBQVFxSCxPQUFSLENBQWdCO0FBQ2ZDLGFBQVM7QUFETSxJQUFoQixFQUVHLEdBRkg7QUFJQSxHQVBVLENBT1RDLElBUFMsQ0FPSixJQVBJLENBQVgsRUFPY0gsS0FQZDtBQVFBLEVBVkQ7QUFXQSxDQTNiQTs7QUE2YkRwSCxFQUFFd0gsUUFBRixFQUFZQyxTQUFaLENBQXNCLFVBQVVDLEtBQVYsRUFBaUJDLE9BQWpCLEVBQTBCQyxRQUExQixFQUFxQztBQUMxRCxLQUFHbEgsT0FBT21ILCtCQUFWLEVBQTBDO0FBQ3pDdEUsY0FBWSxPQUFaLEVBQXFCLHlDQUFyQjtBQUNBO0FBQ0QsQ0FKRCxFOzs7Ozs7OztBQ2pkQTs7Ozs7O0FBTUE7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7OztBQUVBLENBQUN2RCxFQUFFLFlBQVc7QUFDYjs7OztBQUlBOzs7OztBQUtBLEtBQUk4SCxhQUFjLFNBQVNBLFVBQVQsQ0FBb0JDLE9BQXBCLEVBQTZCO0FBQzlDLE1BQUczQyxPQUFPLFlBQVAsS0FBd0IsSUFBM0IsRUFBZ0M7QUFDL0JBLFVBQU8sWUFBUCxJQUF1QixJQUF2QjtBQUNBLFFBQUsyQyxPQUFMLEdBQWUvSCxFQUFFK0gsT0FBRixDQUFmO0FBQ0EsUUFBS0MsU0FBTCxHQUFpQmhJLEVBQUUsS0FBSzZELFVBQUwsQ0FBZ0JvRSxtQkFBbEIsQ0FBakI7QUFDQSxRQUFLQyxRQUFMLEdBQWdCbEksRUFBRSxLQUFLNkQsVUFBTCxDQUFnQnNFLFFBQWxCLENBQWhCO0FBQ0EsUUFBS0MsSUFBTDtBQUNBLEdBTkQsTUFNTztBQUNObEgsV0FBUW1ILEdBQVIsQ0FBWSxvQ0FBWjtBQUNBO0FBQ0QsRUFWRDs7QUFZQVAsWUFBV2xFLFNBQVgsQ0FBcUIwRSxXQUFyQixHQUFtQztBQUNsQ0MsY0FBWTtBQURzQixFQUFuQzs7QUFJQVQsWUFBV2xFLFNBQVgsQ0FBcUJDLFVBQXJCLEdBQWtDO0FBQ2pDMkUsZUFBYSxZQURvQjtBQUVqQ1AsdUJBQXFCLHNCQUZZO0FBR2pDRSxZQUFVO0FBSHVCLEVBQWxDOztBQU1BTCxZQUFXbEUsU0FBWCxDQUFxQjZFLFFBQXJCLEdBQWdDLFlBQVc7QUFDMUMsT0FBS1QsU0FBTCxDQUFlN0gsSUFBZixDQUFvQixlQUFwQixFQUFxQyxNQUFyQztBQUNBLE9BQUs0SCxPQUFMLENBQWExRCxRQUFiLENBQXNCLEtBQUtpRSxXQUFMLENBQWlCQyxVQUF2Qzs7QUFFQSxPQUFLTCxRQUFMLENBQWMvSCxJQUFkLENBQW1CLGFBQW5CLEVBQWtDLE9BQWxDO0FBQ0EsT0FBSytILFFBQUwsQ0FBYzdELFFBQWQsQ0FBdUIsS0FBS2lFLFdBQUwsQ0FBaUJDLFVBQXhDO0FBQ0EsRUFORDs7QUFRQVQsWUFBV2xFLFNBQVgsQ0FBcUI4RSxTQUFyQixHQUFpQyxZQUFXO0FBQzNDLE9BQUtWLFNBQUwsQ0FBZTdILElBQWYsQ0FBb0IsZUFBcEIsRUFBcUMsT0FBckM7QUFDQSxPQUFLNEgsT0FBTCxDQUFhbkYsV0FBYixDQUF5QixLQUFLMEYsV0FBTCxDQUFpQkMsVUFBMUM7O0FBRUEsT0FBS0wsUUFBTCxDQUFjL0gsSUFBZCxDQUFtQixhQUFuQixFQUFrQyxNQUFsQztBQUNBLE9BQUsrSCxRQUFMLENBQWN0RixXQUFkLENBQTBCLEtBQUswRixXQUFMLENBQWlCQyxVQUEzQztBQUNBLEVBTkQ7O0FBUUFULFlBQVdsRSxTQUFYLENBQXFCd0UsSUFBckIsR0FBNEIsWUFBWTtBQUN2QyxNQUFJTyxhQUFhLElBQWpCO0FBQ0EsT0FBS1gsU0FBTCxDQUFleEcsRUFBZixDQUFrQixPQUFsQixFQUEyQm1ILFdBQVdGLFFBQVgsQ0FBb0JsQixJQUFwQixDQUF5Qm9CLFVBQXpCLENBQTNCO0FBQ0EsT0FBS1QsUUFBTCxDQUFjMUcsRUFBZCxDQUFpQixPQUFqQixFQUEwQm1ILFdBQVdELFNBQVgsQ0FBcUJuQixJQUFyQixDQUEwQm9CLFVBQTFCLENBQTFCO0FBQ0EsRUFKRDs7QUFNQWIsWUFBV2xFLFNBQVgsQ0FBcUJnRixPQUFyQixHQUErQixZQUFZO0FBQzFDNUksSUFBRSxLQUFLNkQsVUFBTCxDQUFnQjJFLFdBQWxCLEVBQStCekgsSUFBL0IsQ0FBb0MsWUFBVztBQUM5QyxRQUFLNEgsVUFBTCxHQUFrQixJQUFJYixVQUFKLENBQWUsSUFBZixDQUFsQjtBQUNBLEdBRkQ7QUFHQSxFQUpEOztBQU1BOzs7QUFHQSxLQUFJZSxTQUFTLFNBQVNBLE1BQVQsQ0FBZ0JkLE9BQWhCLEVBQXlCO0FBQ3JDLE9BQUtBLE9BQUwsR0FBZS9ILEVBQUUrSCxPQUFGLENBQWY7QUFDQSxPQUFLZSxVQUFMLEdBQWtCOUksRUFBRStILE9BQUYsRUFBV2pHLElBQVgsQ0FBZ0IsUUFBaEIsQ0FBbEI7QUFDQSxPQUFLb0csUUFBTCxHQUFnQmxJLEVBQUUsV0FBRixDQUFoQjtBQUNBLE9BQUsrSSxNQUFMLEdBQWMvSSxFQUFFK0gsT0FBRixFQUFXdkQsSUFBWCxDQUFnQixLQUFLWCxVQUFMLENBQWdCbUYsYUFBaEMsQ0FBZDtBQUNBLE9BQUt0RCxPQUFMLEdBQWUxRixFQUFFK0gsT0FBRixFQUFXdkQsSUFBWCxDQUFnQixLQUFLWCxVQUFMLENBQWdCb0YsY0FBaEMsQ0FBZjs7QUFFQTtBQUNBLE9BQUtsQixPQUFMLENBQWExRCxRQUFiLENBQXNCLFlBQXRCOztBQUVBO0FBQ0EsT0FBSzBELE9BQUwsQ0FBYTVILElBQWIsQ0FBa0IsTUFBbEIsRUFBMEIsUUFBMUI7QUFDQSxPQUFLNEgsT0FBTCxDQUFhNUgsSUFBYixDQUFrQixpQkFBbEIsRUFBcUMsY0FBckM7QUFDQSxPQUFLNEgsT0FBTCxDQUFhNUgsSUFBYixDQUFrQixrQkFBbEIsRUFBc0MsYUFBdEM7QUFDQSxPQUFLNEksTUFBTCxDQUFZNUksSUFBWixDQUFpQixPQUFqQixFQUEwQixLQUFLNEksTUFBTCxDQUFZdkUsSUFBWixDQUFpQixjQUFqQixFQUFpQ0MsSUFBakMsRUFBMUI7O0FBRUEsT0FBS2lCLE9BQUwsQ0FBYXRFLE1BQWIsQ0FBb0IsS0FBSzhILGFBQUwsQ0FBbUJDLE1BQXZDO0FBQ0EsT0FBS0MsTUFBTCxHQUFjcEosRUFBRStILE9BQUYsRUFBV3ZELElBQVgsQ0FBZ0IsU0FBaEIsQ0FBZDtBQUNBLE9BQUs2RSxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsT0FBS0MsZ0JBQUwsR0FBd0IsRUFBeEI7QUFDQSxPQUFLbEIsSUFBTDtBQUNBLEVBckJEOztBQXVCQVMsUUFBT2pGLFNBQVAsQ0FBaUJzRixhQUFqQixHQUFpQztBQUNoQ0MsVUFBUTtBQUR3QixFQUFqQzs7QUFJQU4sUUFBT2pGLFNBQVAsQ0FBaUIwRSxXQUFqQixHQUErQjtBQUM5QmlCLFVBQVE7QUFEc0IsRUFBL0I7O0FBSUFWLFFBQU9qRixTQUFQLENBQWlCQyxVQUFqQixHQUE4QjtBQUM3QjJGLFVBQVEsU0FEcUI7QUFFN0JSLGlCQUFlLFNBRmM7QUFHN0JDLGtCQUFnQjtBQUhhLEVBQTlCOztBQU1BSixRQUFPakYsU0FBUCxDQUFpQkksVUFBakIsR0FBOEIsWUFBVTtBQUN2QyxPQUFLb0YsTUFBTCxDQUFZaEYsSUFBWixDQUFpQixDQUFqQjtBQUNBLE9BQUtzQixPQUFMLENBQWE3QyxJQUFiLENBQWtCLENBQWxCO0FBQ0EsRUFIRDs7QUFLQWdHLFFBQU9qRixTQUFQLENBQWlCTyxVQUFqQixHQUE4QixZQUFVO0FBQ3ZDLE9BQUtpRixNQUFMLENBQVl2RyxJQUFaLENBQWlCLENBQWpCO0FBQ0EsT0FBSzZDLE9BQUwsQ0FBYXRCLElBQWIsQ0FBa0IsQ0FBbEI7QUFDQSxFQUhEOztBQUtBeUUsUUFBT2pGLFNBQVAsQ0FBaUI2RixVQUFqQixHQUE4QixZQUFVO0FBQ3ZDLE9BQUsxQixPQUFMLENBQWE1SCxJQUFiLENBQWtCLGFBQWxCLEVBQWlDLE9BQWpDO0FBQ0EsT0FBSytILFFBQUwsQ0FBYzdELFFBQWQsQ0FBdUIsS0FBS2lFLFdBQUwsQ0FBaUJpQixNQUF4QztBQUNBLE9BQUtyQixRQUFMLENBQWNwRyxJQUFkLENBQW1CLE9BQW5CLEVBQTRCLEtBQUtnSCxVQUFqQztBQUNBLE9BQUtmLE9BQUwsQ0FBYTFELFFBQWIsQ0FBc0IsS0FBS2lFLFdBQUwsQ0FBaUJpQixNQUF2QztBQUNBbkUsU0FBTyxRQUFQLElBQW1CLElBQW5CO0FBQ0FBLFNBQU8sWUFBUCxFQUFxQnNELFNBQXJCO0FBQ0EsRUFQRDs7QUFTQUcsUUFBT2pGLFNBQVAsQ0FBaUI4RixVQUFqQixHQUE4QixZQUFVO0FBQ3ZDLE1BQUcsS0FBS0wsVUFBTCxJQUFtQixLQUFLbkIsUUFBTCxDQUFjcEcsSUFBZCxDQUFtQixPQUFuQixLQUErQixLQUFLZ0gsVUFBMUQsRUFBcUU7QUFDcEUsUUFBS2YsT0FBTCxDQUFhNUgsSUFBYixDQUFrQixhQUFsQixFQUFpQyxNQUFqQztBQUNBLFFBQUsrSCxRQUFMLENBQWN0RixXQUFkLENBQTBCLEtBQUswRixXQUFMLENBQWlCaUIsTUFBM0M7QUFDQSxRQUFLeEIsT0FBTCxDQUFhbkYsV0FBYixDQUF5QixLQUFLMEYsV0FBTCxDQUFpQmlCLE1BQTFDO0FBQ0E7QUFDRCxFQU5EOztBQVFBVixRQUFPakYsU0FBUCxDQUFpQndFLElBQWpCLEdBQXdCLFlBQVU7QUFDakM7QUFDQSxNQUFJckUsU0FBUyxJQUFiOztBQUVBO0FBQ0EvRCxJQUFFLFFBQUYsRUFBWWUsSUFBWixDQUFpQixZQUFXO0FBQzNCLE9BQUdmLEVBQUUsSUFBRixFQUFROEIsSUFBUixDQUFhLFdBQWIsS0FBNkI5QixFQUFFLElBQUYsRUFBUThCLElBQVIsQ0FBYSxRQUFiLEtBQTBCaUMsT0FBTytFLFVBQWpFLEVBQTRFO0FBQzNFL0UsV0FBT3VGLGdCQUFQLENBQXdCSyxJQUF4QixDQUE2QjNKLEVBQUUsSUFBRixDQUE3QjtBQUNBO0FBQ0QsR0FKRDs7QUFNQTtBQUNBK0QsU0FBT2dFLE9BQVAsQ0FBZTVILElBQWYsQ0FBb0IsYUFBcEIsRUFBbUMsTUFBbkM7QUFDQTRELFNBQU9tRSxRQUFQLENBQWdCMUcsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEJ1QyxPQUFPMkYsVUFBUCxDQUFrQm5DLElBQWxCLENBQXVCeEQsTUFBdkIsQ0FBNUI7O0FBRUEsTUFBRztBQUNGL0QsS0FBRStELE9BQU91RixnQkFBVCxFQUEyQnZJLElBQTNCLENBQWdDLFlBQVc7QUFDMUNmLE1BQUUsSUFBRixFQUFRd0IsRUFBUixDQUFXLE9BQVgsRUFBb0J1QyxPQUFPMEYsVUFBUCxDQUFrQmxDLElBQWxCLENBQXVCeEQsTUFBdkIsQ0FBcEI7QUFDQSxJQUZEO0FBR0EsR0FKRCxDQUlFLE9BQU02RixHQUFOLEVBQVU7QUFDWDFJLFdBQVFDLEtBQVIsQ0FBYyxZQUFZNEMsT0FBTytFLFVBQW5CLEdBQWdDLDJCQUE5QztBQUNBNUgsV0FBUUMsS0FBUixDQUFjeUksR0FBZDtBQUNBO0FBQ0QsRUF2QkQ7O0FBeUJBZixRQUFPakYsU0FBUCxDQUFpQmdGLE9BQWpCLEdBQTJCLFlBQVU7QUFDcEM1SSxJQUFFLEtBQUs2RCxVQUFMLENBQWdCMkYsTUFBbEIsRUFBMEJ6SSxJQUExQixDQUErQixZQUFXO0FBQ3pDLFFBQUtnRCxNQUFMLEdBQWMsSUFBSThFLE1BQUosQ0FBVyxJQUFYLENBQWQ7QUFDQSxHQUZEO0FBR0EsRUFKRDs7QUFNQTdJLEdBQUV3SCxRQUFGLEVBQVlxQyxLQUFaLENBQWtCLFlBQVc7QUFDNUI3SixJQUFFLElBQUYsRUFBUThKLE9BQVIsQ0FBZ0IsVUFBU3ZILENBQVQsRUFBWTtBQUMzQixPQUFHQSxFQUFFd0gsT0FBRixJQUFhLEVBQWIsSUFBbUIzRSxPQUFPLFFBQVAsS0FBb0IsSUFBMUMsRUFBZ0Q7QUFDL0NBLFdBQU8sUUFBUCxFQUFpQnNFLFVBQWpCO0FBQ0E7O0FBRUQsT0FBR25ILEVBQUV3SCxPQUFGLElBQWEsRUFBYixJQUFtQjNFLE9BQU8sWUFBUCxLQUF3QixJQUE5QyxFQUFvRDtBQUNuREEsV0FBTyxZQUFQLEVBQXFCc0QsU0FBckI7QUFDQTtBQUNELEdBUkQ7QUFTQSxFQVZEOztBQWFBOzs7QUFHQTs7Ozs7QUFLQSxLQUFJc0IsWUFBWSxTQUFTQSxTQUFULENBQW1CakMsT0FBbkIsRUFBNEI7QUFDM0MsT0FBS0EsT0FBTCxHQUFlL0gsRUFBRStILE9BQUYsQ0FBZjtBQUNBLE9BQUs3SCxPQUFMLEdBQWVGLEVBQUUrSCxPQUFGLEVBQVd2RCxJQUFYLENBQWdCLGFBQWhCLENBQWY7QUFDQSxPQUFLeUYsUUFBTCxHQUFnQmpLLEVBQUUrSCxPQUFGLEVBQVd2RCxJQUFYLENBQWdCLFVBQWhCLENBQWhCO0FBQ0EsT0FBSzBGLFFBQUwsR0FBZ0JsSyxFQUFFK0gsT0FBRixFQUFXdkQsSUFBWCxDQUFnQixVQUFoQixDQUFoQjtBQUNBLE9BQUsyRixJQUFMLEdBQVluSyxFQUFFb0ssS0FBRixDQUFRLEtBQUtILFFBQWIsRUFBdUIsS0FBS0MsUUFBNUIsQ0FBWjtBQUNBLE9BQUtHLFVBQUwsR0FBa0JySyxFQUFFK0gsT0FBRixFQUFXdkQsSUFBWCxDQUFnQixLQUFLWCxVQUFMLENBQWdCeUcsUUFBaEMsQ0FBbEI7QUFDQSxPQUFLQyxjQUFMLEdBQXNCdkssRUFBRStILE9BQUYsRUFBV3ZELElBQVgsQ0FBZ0IsS0FBS1gsVUFBTCxDQUFnQjJHLGVBQWhDLENBQXRCO0FBQ0EsT0FBS3BDLElBQUw7QUFDQSxFQVREOztBQVdBaEQsUUFBTyxXQUFQLElBQXNCNEUsU0FBdEI7O0FBRUFBLFdBQVVwRyxTQUFWLENBQW9CMEUsV0FBcEIsR0FBa0M7QUFDakNtQyxjQUFZLFlBRHFCO0FBRWpDQyxlQUFhO0FBRm9CLEVBQWxDOztBQUtBVixXQUFVcEcsU0FBVixDQUFvQkMsVUFBcEIsR0FBaUM7QUFDaEM0RyxjQUFZLGFBRG9CO0FBRWhDRCxtQkFBaUIsd0JBRmU7QUFHaENGLFlBQVUsdUJBSHNCO0FBSWhDSSxlQUFhO0FBSm1CLEVBQWpDOztBQU9BVixXQUFVcEcsU0FBVixDQUFvQmtCLFNBQXBCLEdBQWdDO0FBQy9CNkYsaUJBQWUseUJBQVc7QUFDekIsT0FBRyxLQUFLSixjQUFMLENBQW9CbkksRUFBcEIsQ0FBdUIsVUFBdkIsQ0FBSCxFQUFzQztBQUNyQyxTQUFLK0gsSUFBTCxDQUFVOUYsUUFBVixDQUFtQjJGLFVBQVVwRyxTQUFWLENBQW9CMEUsV0FBcEIsQ0FBZ0NvQyxXQUFuRDtBQUNBLFNBQUtMLFVBQUwsQ0FBZ0JoSSxJQUFoQixDQUFxQixTQUFyQixFQUFnQyxJQUFoQztBQUNBLElBSEQsTUFHTztBQUNOLFNBQUs4SCxJQUFMLENBQVV2SCxXQUFWLENBQXNCb0gsVUFBVXBHLFNBQVYsQ0FBb0IwRSxXQUFwQixDQUFnQ29DLFdBQXREO0FBQ0EsU0FBS0wsVUFBTCxDQUFnQmhJLElBQWhCLENBQXFCLFNBQXJCLEVBQWdDLEtBQWhDO0FBQ0E7QUFDRCxHQVQ4QjtBQVUvQnVJLGFBQVcsbUJBQVVDLFFBQVYsRUFBb0JDLEdBQXBCLEVBQXlCO0FBQ25DLE9BQUlBLEdBQUosRUFBUztBQUNSLFFBQUlELFNBQVN6SSxFQUFULENBQVksVUFBWixDQUFKLEVBQTZCO0FBQzVCMEksU0FBSXpHLFFBQUosQ0FBYTJGLFVBQVVwRyxTQUFWLENBQW9CMEUsV0FBcEIsQ0FBZ0NvQyxXQUE3QztBQUNBLEtBRkQsTUFFTztBQUNOSSxTQUFJbEksV0FBSixDQUFnQm9ILFVBQVVwRyxTQUFWLENBQW9CMEUsV0FBcEIsQ0FBZ0NvQyxXQUFoRDtBQUNBO0FBQ0Q7QUFDRDtBQWxCOEIsRUFBaEM7O0FBcUJBVixXQUFVcEcsU0FBVixDQUFvQndFLElBQXBCLEdBQTJCLFlBQVk7O0FBRXRDLE1BQUkyQyxZQUFZLElBQWhCOztBQUVBLE9BQUtSLGNBQUwsQ0FBb0IvSSxFQUFwQixDQUF1QixRQUF2QixFQUFpQ3hCLEVBQUVnTCxLQUFGLENBQVEsS0FBS2xHLFNBQUwsQ0FBZTZGLGFBQXZCLEVBQXNDSSxTQUF0QyxDQUFqQzs7QUFFQS9LLElBQUUsS0FBS3FLLFVBQVAsRUFBbUJ0SixJQUFuQixDQUF3QixVQUFTa0ssQ0FBVCxFQUFZO0FBQ25DakwsS0FBRSxJQUFGLEVBQVF3QixFQUFSLENBQVcsUUFBWCxFQUFxQnhCLEVBQUVnTCxLQUFGLENBQVFELFVBQVVqRyxTQUFWLENBQW9COEYsU0FBNUIsRUFBdUMsSUFBdkMsRUFBNkM1SyxFQUFFLElBQUYsQ0FBN0MsRUFBc0QrSyxVQUFVZCxRQUFWLENBQW1CcEksRUFBbkIsQ0FBc0JvSixDQUF0QixDQUF0RCxDQUFyQjtBQUNBLEdBRkQ7QUFHQSxFQVREOztBQVdBakIsV0FBVXBHLFNBQVYsQ0FBb0JnRixPQUFwQixHQUE4QixZQUFZO0FBQ3pDNUksSUFBRSxLQUFLNkQsVUFBTCxDQUFnQjRHLFVBQWxCLEVBQThCMUosSUFBOUIsQ0FBbUMsWUFBVztBQUM3QyxRQUFLZ0ssU0FBTCxHQUFpQixJQUFJZixTQUFKLENBQWMsSUFBZCxDQUFqQjtBQUNBLEdBRkQ7QUFHQSxFQUpEOztBQU1BOzs7O0FBSUE7Ozs7O0FBS0EsS0FBSWtCLG9CQUFvQixTQUFTQSxpQkFBVCxDQUEyQm5ELE9BQTNCLEVBQW9DO0FBQzNELE9BQUtBLE9BQUwsR0FBZS9ILEVBQUUrSCxPQUFGLENBQWY7QUFDQSxPQUFLb0QsSUFBTCxHQUFZbkwsRUFBRStILE9BQUYsRUFBV3ZELElBQVgsQ0FBZ0IsVUFBaEIsQ0FBWjtBQUNBLE9BQUt0RSxPQUFMLEdBQWVGLEVBQUUrSCxPQUFGLEVBQVd2RCxJQUFYLENBQWdCLGFBQWhCLENBQWY7QUFDQSxPQUFLeUYsUUFBTCxHQUFnQmpLLEVBQUUrSCxPQUFGLEVBQVd2RCxJQUFYLENBQWdCLFVBQWhCLENBQWhCO0FBQ0EsT0FBSzRHLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxPQUFLQyxjQUFMLEdBQXNCLElBQXRCO0FBQ0EsT0FBS2pELElBQUw7QUFDQSxFQVJEOztBQVVBaEQsUUFBTyxtQkFBUCxJQUE4QjhGLGlCQUE5Qjs7QUFFQUEsbUJBQWtCdEgsU0FBbEIsQ0FBNEIwRSxXQUE1QixHQUEwQztBQUN6Q21DLGNBQVksWUFENkI7QUFFekNDLGVBQWE7QUFGNEIsRUFBMUM7O0FBS0FRLG1CQUFrQnRILFNBQWxCLENBQTRCQyxVQUE1QixHQUF5QztBQUN4Q3lILGdCQUFjO0FBRDBCLEVBQXpDOztBQUlBSixtQkFBa0J0SCxTQUFsQixDQUE0QnNGLGFBQTVCLEdBQTRDO0FBQzNDcUMsMEJBQXdCLG9JQURtQjtBQUUzQ0Msd0JBQXNCO0FBRnFCLEVBQTVDOztBQUtBTixtQkFBa0J0SCxTQUFsQixDQUE0QmtCLFNBQTVCLEdBQXdDOztBQUV2QzJHLGdCQUFjLHNCQUFTQyxXQUFULEVBQXNCQyxLQUF0QixFQUE2QkMsT0FBN0IsRUFBc0M7QUFDbkQsT0FBR0EsT0FBSCxFQUFXO0FBQ1ZELFVBQU1SLElBQU4sQ0FBV1UsUUFBWCxHQUFzQmhLLEVBQXRCLENBQXlCNkosV0FBekIsRUFBc0NJLFVBQXRDLENBQWlELFFBQWpEO0FBQ0FILFVBQU1SLElBQU4sQ0FBV1UsUUFBWCxHQUFzQmhLLEVBQXRCLENBQXlCNkosV0FBekIsRUFBc0N0SCxJQUF0QztBQUNBLElBSEQsTUFHTztBQUNOdUgsVUFBTVIsSUFBTixDQUFXVSxRQUFYLEdBQXNCaEssRUFBdEIsQ0FBeUI2SixXQUF6QixFQUFzQ3ZMLElBQXRDLENBQTJDLFFBQTNDLEVBQXFELE1BQXJEO0FBQ0F3TCxVQUFNUixJQUFOLENBQVdVLFFBQVgsR0FBc0JoSyxFQUF0QixDQUF5QjZKLFdBQXpCLEVBQXNDN0ksSUFBdEM7QUFDQTs7QUFFRDhJLFNBQU0xQixRQUFOLENBQWVsSixJQUFmLENBQW9CLFlBQVU7QUFDN0IsUUFBRzZLLE9BQUgsRUFBVztBQUNWNUwsT0FBRSxJQUFGLEVBQVE2TCxRQUFSLEdBQW1CaEssRUFBbkIsQ0FBc0I2SixXQUF0QixFQUFtQ3RILElBQW5DO0FBQ0EsS0FGRCxNQUVPO0FBQ05wRSxPQUFFLElBQUYsRUFBUTZMLFFBQVIsR0FBbUJoSyxFQUFuQixDQUFzQjZKLFdBQXRCLEVBQW1DN0ksSUFBbkM7QUFDQTtBQUNELElBTkQ7QUFPQSxHQWxCc0M7O0FBb0J2Q2tKLFdBQVMsaUJBQVNKLEtBQVQsRUFBZ0I7QUFDeEIsT0FBSUssY0FBYyxFQUFsQjs7QUFFQUwsU0FBTTFCLFFBQU4sR0FBaUIwQixNQUFNNUQsT0FBTixDQUFjdkQsSUFBZCxDQUFtQixVQUFuQixDQUFqQjs7QUFFQW1ILFNBQU16TCxPQUFOLENBQWNhLElBQWQsQ0FBbUIsWUFBVTtBQUM1QixRQUFHZixFQUFFLElBQUYsRUFBUUcsSUFBUixDQUFhLFFBQWIsQ0FBSCxFQUEwQjtBQUN6QjZMLGlCQUFZckMsSUFBWixDQUFpQjNKLEVBQUUsSUFBRixFQUFRa0MsS0FBUixFQUFqQjtBQUNBO0FBQ0QsSUFKRDs7QUFNQXlKLFNBQU0xQixRQUFOLENBQWVsSixJQUFmLENBQW9CLFlBQVU7QUFDN0IsU0FBSyxJQUFJa0ssSUFBSSxDQUFiLEVBQWdCQSxJQUFJZSxZQUFZNUwsTUFBaEMsRUFBd0M2SyxHQUF4QyxFQUE2QztBQUM1Q2pMLE9BQUUsSUFBRixFQUFRNkwsUUFBUixHQUFtQmhLLEVBQW5CLENBQXNCbUssWUFBWWYsQ0FBWixDQUF0QixFQUFzQ3BJLElBQXRDO0FBQ0E7QUFDRCxJQUpEO0FBS0EsR0FwQ3NDOztBQXNDdkNvSixjQUFZLHNCQUFXO0FBQ3RCak0sS0FBRWtMLGtCQUFrQnRILFNBQWxCLENBQTRCQyxVQUE1QixDQUF1Q3lILFlBQXpDLEVBQXVEdkssSUFBdkQsQ0FBNEQsWUFBVztBQUN0RW1LLHNCQUFrQnRILFNBQWxCLENBQTRCa0IsU0FBNUIsQ0FBc0NpSCxPQUF0QyxDQUE4QyxLQUFLYixpQkFBbkQ7QUFDQSxJQUZEO0FBR0E7QUExQ3NDLEVBQXhDOztBQTZDQUEsbUJBQWtCdEgsU0FBbEIsQ0FBNEJ3RSxJQUE1QixHQUFtQyxZQUFZOztBQUU5QyxNQUFHLENBQUMsS0FBS0wsT0FBTCxDQUFhNUgsSUFBYixDQUFrQixJQUFsQixDQUFKLEVBQTRCO0FBQzNCZSxXQUFRbUgsR0FBUixDQUFZLDREQUFaO0FBQ0E7QUFDQTs7QUFFRCxNQUFJNkQsY0FBYyxJQUFsQjtBQUNBLE1BQUlDLHVCQUF1Qm5NLEVBQUUsS0FBS2tKLGFBQUwsQ0FBbUJxQyxzQkFBckIsQ0FBM0I7QUFDQSxNQUFJYSxxQkFBcUJwTSxFQUFFLEtBQUtrSixhQUFMLENBQW1Cc0Msb0JBQXJCLENBQXpCO0FBQ0EsTUFBSWEsZ0NBQWdDLHVCQUF1QkgsWUFBWW5FLE9BQVosQ0FBb0I1SCxJQUFwQixDQUF5QixJQUF6QixDQUEzRDs7QUFFQSxPQUFLNEgsT0FBTCxDQUFhM0csTUFBYixDQUFvQitLLG9CQUFwQjs7QUFFQUEsdUJBQXFCckosS0FBckIsQ0FBMkJzSixrQkFBM0I7QUFDQUQsdUJBQXFCaE0sSUFBckIsQ0FBMEIsSUFBMUIsRUFBZ0NrTSw2QkFBaEM7QUFDQUQscUJBQW1Cak0sSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJrTSxnQ0FBZ0MsT0FBOUQ7O0FBRUEsT0FBS2hCLGNBQUwsR0FBc0JjLG9CQUF0QjtBQUNBLE9BQUtmLFlBQUwsR0FBb0JnQixrQkFBcEI7O0FBRUEsT0FBS2hCLFlBQUwsQ0FBa0I1RyxJQUFsQixDQUF1QixJQUF2QixFQUE2QjFDLElBQTdCLENBQWtDLE9BQWxDLEVBQTJDb0ssWUFBWW5FLE9BQVosQ0FBb0I1SCxJQUFwQixDQUF5QixJQUF6QixDQUEzQzs7QUFFQSxPQUFLRCxPQUFMLENBQWFhLElBQWIsQ0FBa0IsWUFBVztBQUM1QixPQUFJNkssVUFBVTVMLEVBQUUsSUFBRixFQUFROEIsSUFBUixDQUFhLFNBQWIsSUFBMEIsU0FBMUIsR0FBc0MsRUFBcEQ7QUFDQTlCLEtBQUUsSUFBRixFQUFROEIsSUFBUixDQUFhLFNBQWIsRUFBd0I5QixFQUFFLElBQUYsRUFBUThCLElBQVIsQ0FBYSxTQUFiLENBQXhCOztBQUVBc0ssc0JBQW1CL0wsTUFBbkIsQ0FBMEI7OzsrQ0FBQSxHQUdxQkwsRUFBRSxJQUFGLEVBQVFzRSxJQUFSLEVBSHJCLEdBR3NDLG9CQUh0QyxHQUc0RHNILE9BSDVELEdBR3FFOzBCQUhyRSxHQUlBNUwsRUFBRSxJQUFGLEVBQVFzRSxJQUFSLEVBSkEsR0FJaUIsSUFKakIsR0FJd0J0RSxFQUFFLElBQUYsRUFBUXNFLElBQVIsRUFKeEIsR0FJeUM7O1VBSm5FO0FBT0EsR0FYRDs7QUFhQXRFLElBQUUsTUFBRixFQUFVd0IsRUFBVixDQUFhLFFBQWIsRUFBdUIsZ0JBQXZCLEVBQXlDLFlBQVU7QUFDbEQsT0FBSVUsUUFBUWxDLEVBQUUsZ0JBQUYsRUFBb0JrQyxLQUFwQixDQUEwQixJQUExQixDQUFaO0FBQ0FnSixxQkFBa0J0SCxTQUFsQixDQUE0QmtCLFNBQTVCLENBQXNDMkcsWUFBdEMsQ0FBbUR2SixLQUFuRCxFQUEwRGdLLFdBQTFELEVBQXVFbE0sRUFBRSxJQUFGLEVBQVFxQyxJQUFSLENBQWEsU0FBYixDQUF2RTtBQUNBLEdBSEQ7QUFJQSxFQXhDRDs7QUEwQ0E2SSxtQkFBa0J0SCxTQUFsQixDQUE0QmdGLE9BQTVCLEdBQXNDLFlBQVk7QUFDakQ1SSxJQUFFLEtBQUs2RCxVQUFMLENBQWdCeUgsWUFBbEIsRUFBZ0N2SyxJQUFoQyxDQUFxQyxZQUFXO0FBQy9DLFFBQUttSyxpQkFBTCxHQUF5QixJQUFJQSxpQkFBSixDQUFzQixJQUF0QixDQUF6QjtBQUNBLEdBRkQ7QUFHQSxFQUpEOztBQU1BOzs7O0FBSUE7Ozs7O0FBS0EsS0FBSXZILGdCQUFpQixTQUFTQSxhQUFULEdBQXlCLENBQUUsQ0FBaEQ7QUFDQXlCLFFBQU8sZUFBUCxJQUEwQnpCLGFBQTFCOztBQUVBQSxlQUFjQyxTQUFkLENBQXdCMEUsV0FBeEIsR0FBc0M7QUFDckNtQyxjQUFZLFlBRHlCO0FBRXJDQyxlQUFhO0FBRndCLEVBQXRDOztBQUtBL0csZUFBY0MsU0FBZCxDQUF3QkMsVUFBeEIsR0FBcUM7QUFDcEN5SSxnQkFBYyxlQURzQjtBQUVwQ0Msb0JBQWtCLG1CQUZrQjtBQUdwQ0MsMkJBQXlCLDBCQUhXO0FBSXBDQyx3QkFBc0IsdUJBSmM7QUFLcEMzSSxpQkFBZTtBQUxxQixFQUFyQzs7QUFRQUgsZUFBY0MsU0FBZCxDQUF3QjhJLEtBQXhCLEdBQWdDO0FBQy9CQyxTQUFPLEVBRHdCO0FBRS9CQyxTQUFPLEVBRndCO0FBRy9CQyxTQUFPO0FBSHdCLEVBQWhDOztBQU1BO0FBQ0E3TSxHQUFFMkQsY0FBY0MsU0FBZCxDQUF3QkMsVUFBeEIsQ0FBbUN5SSxZQUFyQyxFQUFtRDlLLEVBQW5ELENBQXNELE9BQXRELEVBQWdFLFVBQVNlLENBQVQsRUFBVztBQUMxRXVLLHlCQUF1Qm5KLGNBQWNDLFNBQWQsQ0FBd0JDLFVBQXhCLENBQW1DMEksZ0JBQTFEO0FBQ0F2TSxJQUFFMkQsY0FBY0MsU0FBZCxDQUF3QkMsVUFBeEIsQ0FBbUMwSSxnQkFBckMsRUFBdURsSSxRQUF2RCxDQUFnRSxjQUFoRTtBQUNBLEVBSEQ7O0FBS0E7QUFDQXJFLEdBQUUyRCxjQUFjQyxTQUFkLENBQXdCQyxVQUF4QixDQUFtQ3lJLFlBQXJDLEVBQW1EOUssRUFBbkQsQ0FBc0QsVUFBdEQsRUFBbUUsVUFBU2UsQ0FBVCxFQUFXO0FBQzdFdUsseUJBQXVCbkosY0FBY0MsU0FBZCxDQUF3QkMsVUFBeEIsQ0FBbUMwSSxnQkFBMUQ7QUFDQXZNLElBQUUyRCxjQUFjQyxTQUFkLENBQXdCQyxVQUF4QixDQUFtQzBJLGdCQUFyQyxFQUF1RGxJLFFBQXZELENBQWdFLFlBQWhFO0FBQ0EsRUFIRDs7QUFLQTtBQUNBckUsR0FBRTJELGNBQWNDLFNBQWQsQ0FBd0JDLFVBQXhCLENBQW1DNEksb0JBQXJDLEVBQTJEakwsRUFBM0QsQ0FBOEQsT0FBOUQsRUFBdUUsWUFBVztBQUNqRixNQUFJdUwsWUFBWS9NLEVBQUUyRCxjQUFjQyxTQUFkLENBQXdCQyxVQUF4QixDQUFtQzJJLHVCQUFyQyxDQUFoQjtBQUNBLE1BQUlRLGVBQWVoTixFQUFFLElBQUYsQ0FBbkI7O0FBRUEsTUFBRytNLFVBQVU5TCxRQUFWLENBQW1CLFFBQW5CLENBQUgsRUFBZ0M7QUFDL0I4TCxhQUFVbkssV0FBVixDQUFzQixRQUF0QjtBQUNBb0ssZ0JBQWFwSyxXQUFiLENBQXlCLFFBQXpCO0FBQ0FvSyxnQkFBYUMsSUFBYjtBQUNBLEdBSkQsTUFJTTtBQUNMRixhQUFVMUksUUFBVixDQUFtQixRQUFuQjtBQUNBMkksZ0JBQWEzSSxRQUFiLENBQXNCLFFBQXRCO0FBQ0E7QUFDRCxFQVpEOztBQWNBOzs7O0FBSUE7Ozs7O0FBS0EsS0FBSVEsWUFBWSxTQUFTQSxTQUFULENBQW1Ca0QsT0FBbkIsRUFBNEI7QUFDM0MsT0FBS0EsT0FBTCxHQUFlL0gsRUFBRStILE9BQUYsQ0FBZjtBQUNBLE9BQUttRixZQUFMLEdBQW9CbE4sRUFBRStILE9BQUYsRUFBV2pHLElBQVgsQ0FBZ0IscUJBQWhCLENBQXBCO0FBQ0EsT0FBS3FMLE9BQUwsR0FBZW5OLEVBQUUrSCxPQUFGLEVBQVdqRyxJQUFYLENBQWdCLFVBQWhCLENBQWY7QUFDQSxPQUFLc0wsY0FBTCxHQUFzQnBOLEVBQUUrSCxPQUFGLEVBQVd2RCxJQUFYLENBQWdCLE9BQWhCLENBQXRCO0FBQ0EsT0FBSzZJLFVBQUwsR0FBa0JyTixFQUFFK0gsT0FBRixFQUFXdkQsSUFBWCxDQUFnQixhQUFoQixDQUFsQjtBQUNBLE9BQUs4SSxZQUFMLEdBQW9CdE4sRUFBRStILE9BQUYsRUFBV3ZELElBQVgsQ0FBZ0IsZUFBaEIsQ0FBcEI7QUFDQSxPQUFLNEQsSUFBTDtBQUNBLEVBUkQ7O0FBVUFoRCxRQUFPLFdBQVAsSUFBc0JQLFNBQXRCOztBQUVBQSxXQUFVakIsU0FBVixDQUFvQkMsVUFBcEIsR0FBaUM7QUFDaEMwSixjQUFZO0FBRG9CLEVBQWpDOztBQUlBMUksV0FBVWpCLFNBQVYsQ0FBb0I0SixLQUFwQixHQUE0QjtBQUMzQkMsZ0JBQWMsVUFEYTtBQUUzQkMsZUFBYSxVQUZjO0FBRzNCQyxhQUFXO0FBSGdCLEVBQTVCOztBQU1BOUksV0FBVWpCLFNBQVYsQ0FBb0JrQixTQUFwQixHQUFnQztBQUMvQjhJLGFBQVcscUJBQVc7QUFDckIsT0FBSUMsUUFBUSxJQUFaO0FBQ0EsT0FBR0EsTUFBTVgsWUFBTixJQUFzQlcsTUFBTVQsY0FBTixDQUFxQm5JLEdBQXJCLEVBQXpCLEVBQW9EO0FBQ25EO0FBQ0E7QUFDRGpGLEtBQUU0RyxPQUFGO0FBQ0NILFdBQU8sbUJBRFI7QUFFQ3ZELFVBQU0sTUFGUDtBQUdDMkQsVUFBTSxnS0FIUDtBQUlDUixXQUFPLFFBSlI7QUFLQ0MsZUFBVyxJQUxaO0FBTUNFLHVCQUFtQixJQU5wQjtBQU9DRCx3QkFBcUIsS0FQdEI7QUFRQ2IsYUFBUyw2REFBOERtSSxNQUFNWCxZQUFwRSxHQUFtRixlQUFuRixHQUFzR1csTUFBTVQsY0FBTixDQUFxQm5JLEdBQXJCLEVBQXRHLEdBQWtJLFFBUjVJO0FBU0M4QixhQUFTO0FBQ1JILGNBQVM7QUFDUkksZ0JBQVUsVUFERjtBQUVSMUIsY0FBUSxrQkFBVTtBQUNqQnVJLGFBQU1ULGNBQU4sQ0FBcUIvSyxJQUFyQixDQUEwQixVQUExQixFQUFzQyxJQUF0QztBQUNBd0wsYUFBTVIsVUFBTixDQUFpQjVJLElBQWpCLENBQXNCLDRCQUF0QjtBQUNBekUsU0FBRSxTQUFGLEVBQWE2TixNQUFNOUYsT0FBbkIsRUFBNEJoRixHQUE1QixDQUFnQyxTQUFoQyxFQUEyQyxPQUEzQzs7QUFFQS9DLFNBQUVnRCxJQUFGLENBQU87QUFDTmlFLGdCQUFRLE9BREY7QUFFTmhFLGFBQUs0SyxNQUFNTCxLQUFOLENBQVlDLFlBRlg7QUFHTi9JLGlCQUFTbUosS0FISDtBQUlOL0wsY0FBTTtBQUNMZ00sbUJBQVVELE1BQU1WLE9BRFg7QUFFTFkscUJBQWFGLE1BQU1ULGNBQU4sQ0FBcUJuSSxHQUFyQjtBQUZSO0FBSkEsUUFBUCxFQVFHRCxJQVJILENBUVEsWUFBVTtBQUNqQjZJLGNBQU1ULGNBQU4sQ0FBcUIvSyxJQUFyQixDQUEwQixVQUExQixFQUFzQyxLQUF0QztBQUNBd0wsY0FBTVIsVUFBTixDQUFpQjVJLElBQWpCLENBQXNCLE1BQXRCO0FBQ0FvSixjQUFNWCxZQUFOLEdBQXFCVyxNQUFNVCxjQUFOLENBQXFCbkksR0FBckIsRUFBckI7QUFDQSxRQVpEO0FBYUE7QUFwQk8sTUFERDtBQXVCUmtDLGFBQVEsa0JBQVU7QUFDakIwRyxZQUFNVCxjQUFOLENBQXFCbkksR0FBckIsQ0FBeUI0SSxNQUFNWCxZQUEvQjtBQUNBO0FBekJPO0FBVFYsMkJBb0NvQiw2QkFBVTtBQUM1QlcsVUFBTVQsY0FBTixDQUFxQm5JLEdBQXJCLENBQXlCNEksTUFBTVgsWUFBL0I7QUFDQSxJQXRDRjtBQXdDQSxHQTlDOEI7O0FBZ0QvQmMsZUFBYSx1QkFBVztBQUN2QixPQUFJSCxRQUFRLElBQVo7QUFDQTdOLEtBQUU0RyxPQUFGLENBQVU7QUFDVEgsV0FBTyxRQURFO0FBRVR2RCxVQUFNLEtBRkc7QUFHVDJELFVBQU0sZ0tBSEc7QUFJVFIsV0FBTyxRQUpFO0FBS1RDLGVBQVcsSUFMRjtBQU1URSx1QkFBbUIsSUFOVjtBQU9URCx3QkFBcUIsS0FQWjtBQVFUYixhQUFTLHlDQUEwQ21JLE1BQU1ULGNBQU4sQ0FBcUJuSSxHQUFyQixFQUExQyxHQUF1RSxRQVJ2RTtBQVNUOEIsYUFBUztBQUNSa0gsYUFBUTtBQUNQakgsZ0JBQVUsU0FESDtBQUVQMUIsY0FBUSxrQkFBVTtBQUNqQnVJLGFBQU1ULGNBQU4sQ0FBcUIvSyxJQUFyQixDQUEwQixVQUExQixFQUFzQyxJQUF0QztBQUNBckMsU0FBRWdELElBQUYsQ0FBTztBQUNOaUUsZ0JBQVEsUUFERjtBQUVOaEUsYUFBSzRLLE1BQU1MLEtBQU4sQ0FBWUMsWUFGWDtBQUdOL0ksaUJBQVNtSixLQUhIO0FBSU4vTCxjQUFNO0FBQ0xnTSxtQkFBVUQsTUFBTVY7QUFEWCxTQUpBO0FBT04vSixpQkFBUyxtQkFBVTtBQUNsQnlLLGVBQU05RixPQUFOLENBQWNsRixJQUFkLENBQW1CbkMsT0FBT0MsU0FBUCxDQUFpQnVOLElBQXBDLEVBQTBDLFlBQVc7QUFDcERMLGdCQUFNM0csTUFBTjtBQUNBLFVBRkQ7QUFHQTtBQVhLLFFBQVA7QUFhQTtBQWpCTTtBQURBO0FBVEEsSUFBVjtBQStCQSxHQWpGOEI7O0FBbUYvQm5DLHNCQUFvQiw0QkFBU29JLE9BQVQsRUFBa0JELFlBQWxCLEVBQStCO0FBQ2xEbE4sS0FBRSxrQkFBRixFQUFzQk0sT0FBdEIsQ0FBOEIsc0NBQXNDNk0sT0FBdEMsR0FBK0MsOEJBQS9DLEdBQWdGRCxZQUFoRixHQUE4Riw0REFBOUYsR0FBNkpBLFlBQTdKLEdBQTJLLHdJQUF6TTtBQUNBckksYUFBVWpCLFNBQVYsQ0FBb0JnRixPQUFwQjtBQUNBO0FBdEY4QixFQUFoQzs7QUF5RkEvRCxXQUFVakIsU0FBVixDQUFvQndFLElBQXBCLEdBQTJCLFlBQVk7QUFDdEMsTUFBSXdGLFlBQVksSUFBaEI7QUFDQSxPQUFLUCxVQUFMLENBQWdCN0wsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEJ4QixFQUFFZ0wsS0FBRixDQUFRLEtBQUtsRyxTQUFMLENBQWU4SSxTQUF2QixFQUFrQyxJQUFsQyxFQUF3Q0EsU0FBeEMsQ0FBNUI7QUFDQSxPQUFLTixZQUFMLENBQWtCOUwsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEJ4QixFQUFFZ0wsS0FBRixDQUFRLEtBQUtsRyxTQUFMLENBQWVrSixXQUF2QixFQUFvQyxJQUFwQyxFQUEwQ0osU0FBMUMsQ0FBOUI7QUFDQSxFQUpEOztBQU1BL0ksV0FBVWpCLFNBQVYsQ0FBb0JnRixPQUFwQixHQUE4QixZQUFZO0FBQ3pDNUksSUFBRSxLQUFLNkQsVUFBTCxDQUFnQjBKLFVBQWxCLEVBQThCeE0sSUFBOUIsQ0FBbUMsWUFBVztBQUM3QyxRQUFLOEQsU0FBTCxHQUFpQixJQUFJQSxTQUFKLENBQWMsSUFBZCxDQUFqQjtBQUNBLEdBRkQ7QUFHQSxFQUpEOztBQU1BOzs7O0FBSUE7Ozs7O0FBS0EsS0FBSXNKLFVBQVUsU0FBU0MsSUFBVCxDQUFjckcsT0FBZCxFQUF1QjtBQUNwQyxPQUFLc0csTUFBTCxHQUFjck8sRUFBRStILE9BQUYsQ0FBZDtBQUNBLE9BQUt1RyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUtDLGNBQUwsR0FBc0IsS0FBdEI7QUFDQSxPQUFLbkcsSUFBTDtBQUNBLEVBTEQ7O0FBT0ErRixTQUFRdkssU0FBUixDQUFrQkMsVUFBbEIsR0FBK0I7QUFDOUIySyxZQUFVLFdBRG9CO0FBRTlCQyxhQUFXLHNCQUZtQjtBQUc5QmxHLGNBQVk7QUFIa0IsRUFBL0I7O0FBTUE0RixTQUFRdkssU0FBUixDQUFrQjBFLFdBQWxCLEdBQWdDO0FBQy9CQyxjQUFZLFlBRG1CO0FBRS9CbUcsZUFBYSx1QkFGa0I7QUFHL0JDLGdCQUFjLHdCQUhpQjtBQUkvQkMsWUFBVSxvQkFKcUI7QUFLL0JDLGFBQVcscUJBTG9CO0FBTS9CQyxrQkFBZ0I7QUFOZSxFQUFoQzs7QUFTQVgsU0FBUXZLLFNBQVIsQ0FBa0JtTCxZQUFsQixHQUFpQyxZQUFVO0FBQzFDLE1BQUlDLGFBQWEsS0FBS1gsTUFBTCxDQUFZLENBQVosRUFBZVkscUJBQWYsRUFBakI7O0FBRUEsTUFBRyxLQUFLWCxJQUFMLENBQVVyTixRQUFWLENBQW1CLEtBQUtxSCxXQUFMLENBQWlCb0csV0FBcEMsQ0FBSCxFQUFvRDtBQUNuRCxRQUFLSixJQUFMLENBQVV2TCxHQUFWLENBQWMsS0FBZCxFQUFxQmlNLFdBQVdFLE1BQWhDO0FBQ0EsUUFBS1osSUFBTCxDQUFVdkwsR0FBVixDQUFjLE1BQWQsRUFBc0JpTSxXQUFXRyxJQUFYLEdBQWtCQyxTQUFTLEtBQUtmLE1BQUwsQ0FBWXRMLEdBQVosQ0FBZ0IsT0FBaEIsQ0FBVCxFQUFtQyxFQUFuQyxDQUF4QztBQUNBLFFBQUt1TCxJQUFMLENBQVV2TCxHQUFWLENBQWMsa0JBQWQsRUFBa0MsV0FBbEM7QUFDQSxHQUpELE1BSU8sSUFBRyxLQUFLdUwsSUFBTCxDQUFVck4sUUFBVixDQUFtQixLQUFLcUgsV0FBTCxDQUFpQnFHLFlBQXBDLENBQUgsRUFBcUQ7QUFDM0QsUUFBS0wsSUFBTCxDQUFVdkwsR0FBVixDQUFjLEtBQWQsRUFBcUJpTSxXQUFXRSxNQUFoQztBQUNBLFFBQUtaLElBQUwsQ0FBVXZMLEdBQVYsQ0FBYyxNQUFkLEVBQXNCaU0sV0FBV0csSUFBWCxHQUFrQixHQUF4QztBQUNBLFFBQUtiLElBQUwsQ0FBVXZMLEdBQVYsQ0FBYyxrQkFBZCxFQUFrQyxVQUFsQztBQUNBLEdBSk0sTUFJQSxJQUFHLEtBQUt1TCxJQUFMLENBQVVyTixRQUFWLENBQW1CLEtBQUtxSCxXQUFMLENBQWlCc0csUUFBcEMsQ0FBSCxFQUFpRDtBQUN2RCxRQUFLTixJQUFMLENBQVV2TCxHQUFWLENBQWMsS0FBZCxFQUFxQmlNLFdBQVdLLEdBQVgsR0FBaUIsR0FBdEM7QUFDQSxRQUFLZixJQUFMLENBQVV2TCxHQUFWLENBQWMsTUFBZCxFQUFzQmlNLFdBQVdNLEtBQVgsR0FBbUJGLFNBQVMsS0FBS2YsTUFBTCxDQUFZdEwsR0FBWixDQUFnQixPQUFoQixDQUFULEVBQW1DLEVBQW5DLENBQXpDO0FBQ0EsUUFBS3VMLElBQUwsQ0FBVXZMLEdBQVYsQ0FBYyxrQkFBZCxFQUFrQyxjQUFsQztBQUNBLEdBSk0sTUFJQSxJQUFHLEtBQUt1TCxJQUFMLENBQVVyTixRQUFWLENBQW1CLEtBQUtxSCxXQUFMLENBQWlCdUcsU0FBcEMsQ0FBSCxFQUFrRDtBQUN4RCxRQUFLUCxJQUFMLENBQVV2TCxHQUFWLENBQWMsS0FBZCxFQUFxQmlNLFdBQVdLLEdBQVgsR0FBaUIsR0FBdEM7QUFDQSxRQUFLZixJQUFMLENBQVV2TCxHQUFWLENBQWMsTUFBZCxFQUFzQmlNLFdBQVdHLElBQVgsR0FBa0IsR0FBeEM7QUFDQSxRQUFLYixJQUFMLENBQVV2TCxHQUFWLENBQWMsa0JBQWQsRUFBa0MsYUFBbEM7QUFDQSxHQUpNLE1BSUE7QUFDTixRQUFLdUwsSUFBTCxDQUFVdkwsR0FBVixDQUFjLEtBQWQsRUFBcUJpTSxXQUFXRSxNQUFoQztBQUNBLFFBQUtaLElBQUwsQ0FBVXZMLEdBQVYsQ0FBYyxrQkFBZCxFQUFrQyxLQUFsQztBQUNBO0FBQ0QsRUF2QkQ7O0FBeUJBb0wsU0FBUXZLLFNBQVIsQ0FBa0JRLElBQWxCLEdBQXlCLFlBQVU7QUFDbEMrSixVQUFRdkssU0FBUixDQUFrQm1MLFlBQWxCLENBQStCeEgsSUFBL0IsQ0FBb0MsSUFBcEM7QUFDQSxPQUFLK0csSUFBTCxDQUFVakssUUFBVixDQUFtQjhKLFFBQVF2SyxTQUFSLENBQWtCMEUsV0FBbEIsQ0FBOEJDLFVBQWpEO0FBQ0EsT0FBSytGLElBQUwsQ0FBVWxLLElBQVY7QUFDQSxFQUpEOztBQU1BK0osU0FBUXZLLFNBQVIsQ0FBa0JmLElBQWxCLEdBQXlCLFlBQVU7QUFDbEMsT0FBS3lMLElBQUwsQ0FBVTFMLFdBQVYsQ0FBc0J1TCxRQUFRdkssU0FBUixDQUFrQjBFLFdBQWxCLENBQThCQyxVQUFwRDtBQUNBLE9BQUsrRixJQUFMLENBQVV6TCxJQUFWO0FBQ0EsRUFIRDs7QUFLQXNMLFNBQVF2SyxTQUFSLENBQWtCMkwsTUFBbEIsR0FBMkIsWUFBVTtBQUNwQyxNQUFHLEtBQUtqQixJQUFMLENBQVVyTixRQUFWLENBQW1Ca04sUUFBUXZLLFNBQVIsQ0FBa0IwRSxXQUFsQixDQUE4QkMsVUFBakQsQ0FBSCxFQUFnRTtBQUMvRDRGLFdBQVF2SyxTQUFSLENBQWtCZixJQUFsQixDQUF1QjBFLElBQXZCLENBQTRCLElBQTVCO0FBQ0EsR0FGRCxNQUVPO0FBQ040RyxXQUFRdkssU0FBUixDQUFrQlEsSUFBbEIsQ0FBdUJtRCxJQUF2QixDQUE0QixJQUE1QjtBQUNBO0FBQ0QsRUFORDs7QUFRQTRHLFNBQVF2SyxTQUFSLENBQWtCd0UsSUFBbEIsR0FBeUIsWUFBWTtBQUNwQyxNQUFJb0gsVUFBVSxJQUFkO0FBQ0EsTUFBSUMsU0FBU3pQLEVBQUUsS0FBS3FPLE1BQVAsRUFBZWxPLElBQWYsQ0FBb0IsSUFBcEIsSUFBNEIsT0FBekM7O0FBRUEsT0FBS21PLElBQUwsR0FBWXRPLEVBQUUsTUFBTXlQLE1BQVIsQ0FBWjtBQUNBLE9BQUtsQixjQUFMLEdBQXNCLEtBQUtELElBQUwsQ0FBVXJOLFFBQVYsQ0FBbUJrTixRQUFRdkssU0FBUixDQUFrQjBFLFdBQWxCLENBQThCd0csY0FBakQsQ0FBdEI7O0FBRUEsT0FBS1QsTUFBTCxDQUFZN00sRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBU2UsQ0FBVCxFQUFZO0FBQ25DQSxLQUFFbU4sZUFBRjtBQUNBdkIsV0FBUXZLLFNBQVIsQ0FBa0IyTCxNQUFsQixDQUF5QmhJLElBQXpCLENBQThCaUksT0FBOUI7QUFDQSxHQUhEOztBQUtBeFAsSUFBRXdILFFBQUYsRUFBWWhHLEVBQVosQ0FBZSxRQUFmLEVBQXlCLFVBQVNlLENBQVQsRUFBWTtBQUNwQyxPQUFHaU4sUUFBUWxCLElBQVIsQ0FBYXJOLFFBQWIsQ0FBc0JrTixRQUFRdkssU0FBUixDQUFrQjBFLFdBQWxCLENBQThCQyxVQUFwRCxDQUFILEVBQW1FO0FBQ2xFNEYsWUFBUXZLLFNBQVIsQ0FBa0JtTCxZQUFsQixDQUErQnhILElBQS9CLENBQW9DaUksT0FBcEM7QUFDQTtBQUNELEdBSkQ7O0FBTUF4UCxJQUFFb0YsTUFBRixFQUFVNUQsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBU2UsQ0FBVCxFQUFZO0FBQ2xDLE9BQUdpTixRQUFRbEIsSUFBUixDQUFhck4sUUFBYixDQUFzQmtOLFFBQVF2SyxTQUFSLENBQWtCMEUsV0FBbEIsQ0FBOEJDLFVBQXBELENBQUgsRUFBbUU7QUFDbEU0RixZQUFRdkssU0FBUixDQUFrQm1MLFlBQWxCLENBQStCeEgsSUFBL0IsQ0FBb0NpSSxPQUFwQztBQUNBO0FBQ0QsR0FKRDs7QUFNQXhQLElBQUV3SCxRQUFGLEVBQVloRyxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFTZSxDQUFULEVBQVk7QUFDbkMsT0FBSW9OLFNBQVMzUCxFQUFFdUMsRUFBRW9OLE1BQUosQ0FBYjtBQUNBLE9BQUcsQ0FBQ0EsT0FBT3ZOLEVBQVAsQ0FBVW9OLFFBQVFsQixJQUFsQixDQUFELElBQTRCLENBQUNxQixPQUFPdk4sRUFBUCxDQUFVb04sUUFBUW5CLE1BQWxCLENBQWhDLEVBQTJEO0FBQzFELFFBQUcsQ0FBQ3JPLEVBQUU0UCxRQUFGLENBQVc1UCxFQUFFd1AsUUFBUWxCLElBQVYsRUFBZ0IsQ0FBaEIsQ0FBWCxFQUErQi9MLEVBQUVvTixNQUFqQyxDQUFKLEVBQTZDO0FBQzVDeEIsYUFBUXZLLFNBQVIsQ0FBa0JmLElBQWxCLENBQXVCMEUsSUFBdkIsQ0FBNEJpSSxPQUE1QjtBQUNBO0FBQ0Q7QUFDRCxHQVBEO0FBUUEsRUFoQ0Q7O0FBa0NBckIsU0FBUXZLLFNBQVIsQ0FBa0JnRixPQUFsQixHQUE0QixZQUFXO0FBQ3RDNUksSUFBRSxLQUFLNkQsVUFBTCxDQUFnQjRLLFNBQWxCLEVBQTZCMU4sSUFBN0IsQ0FBa0MsWUFBVztBQUM1QyxRQUFLb04sT0FBTCxHQUFlLElBQUlBLE9BQUosQ0FBWSxJQUFaLENBQWY7QUFDQSxHQUZEO0FBR0EsRUFKRDs7QUFNQTs7OztBQUlBLEtBQUkwQixTQUFTLFNBQVNBLE1BQVQsR0FBa0I7QUFDOUIsTUFBRzdQLEVBQUUsMkJBQUYsRUFBK0JJLE1BQS9CLEdBQXdDLENBQXhDLElBQTZDSixFQUFFLDhCQUFGLEVBQWtDSSxNQUFsQyxHQUEyQyxDQUEzRixFQUE2RjtBQUM1RjtBQUNBO0FBQ0QsT0FBSzBQLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxPQUFLQyxrQkFBTCxHQUEwQixJQUExQjtBQUNBLE9BQUtDLFlBQUwsR0FBb0JoUSxFQUFFLDJCQUFGLENBQXBCO0FBQ0EsT0FBS2lRLGdCQUFMLEdBQXdCLEtBQUtELFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUJqRixTQUE3QztBQUNBLE9BQUttRixlQUFMLEdBQXVCbFEsRUFBRSw4QkFBRixDQUF2QjtBQUNBLE9BQUttUSxtQkFBTCxHQUEyQixLQUFLRCxlQUFMLENBQXFCLENBQXJCLEVBQXdCbkYsU0FBbkQ7QUFDQSxPQUFLM0MsSUFBTDtBQUNBLEVBWEQ7O0FBYUF5SCxRQUFPak0sU0FBUCxDQUFpQjRKLEtBQWpCLEdBQXlCO0FBQ3hCNEMsaUJBQWU7QUFEUyxFQUF6Qjs7QUFJQVAsUUFBT2pNLFNBQVAsQ0FBaUJ5TSxhQUFqQixHQUFpQyxVQUFTQyxhQUFULEVBQXdCQyxNQUF4QixFQUErQjtBQUMvRCxNQUFJekYsTUFBTTlLLEVBQUVzUSxhQUFGLENBQVY7O0FBRUFDLFNBQU9DLFdBQVAsQ0FBbUJELE1BQW5CO0FBQ0F6RixNQUFJekcsUUFBSixDQUFhLGFBQWI7QUFDQWtNLFNBQU9ULGVBQVAsR0FBeUI5UCxFQUFFOEssR0FBRixDQUF6Qjs7QUFFQTlLLElBQUV1USxPQUFPSixtQkFBUCxDQUEyQmxHLFFBQTdCLEVBQXVDbEosSUFBdkMsQ0FBNEMsWUFBVztBQUN0RCxPQUFHZixFQUFFLElBQUYsRUFBUThCLElBQVIsQ0FBYSxXQUFiLEtBQTZCZ0osSUFBSWhKLElBQUosQ0FBUyxlQUFULENBQWhDLEVBQTBEO0FBQ3pEOUIsTUFBRSxJQUFGLEVBQVFHLElBQVIsQ0FBYSxVQUFiLEVBQXlCLElBQXpCO0FBQ0EsSUFGRCxNQUVPO0FBQ05ILE1BQUUsSUFBRixFQUFRRyxJQUFSLENBQWEsVUFBYixFQUF5QixLQUF6QjtBQUNBO0FBQ0QsR0FORDtBQU9BLEVBZEQ7O0FBZ0JBMFAsUUFBT2pNLFNBQVAsQ0FBaUI2TSxnQkFBakIsR0FBb0MsVUFBU0MsZ0JBQVQsRUFBMkJILE1BQTNCLEVBQWtDO0FBQ3JFLE1BQUl6RixNQUFNOUssRUFBRTBRLGdCQUFGLENBQVY7O0FBRUEsTUFBRzVGLElBQUkzSyxJQUFKLENBQVMsVUFBVCxDQUFILEVBQXdCO0FBQUM7QUFBUTs7QUFFakMsTUFBR29RLE9BQU9ULGVBQVAsSUFBMEIsSUFBN0IsRUFBa0M7QUFDakNoRixPQUFJekcsUUFBSixDQUFhLGFBQWI7QUFDQWtNLFVBQU9SLGtCQUFQLEdBQTRCakYsR0FBNUI7QUFDQStFLFVBQU9qTSxTQUFQLENBQWlCNkYsVUFBakIsQ0FDQzhHLE9BQU9ULGVBQVAsQ0FBdUJoTyxJQUF2QixDQUE0QixjQUE1QixDQURELEVBRUN5TyxPQUFPVCxlQUFQLENBQXVCaE8sSUFBdkIsQ0FBNEIsaUJBQTVCLENBRkQsRUFHQ2dKLElBQUloSixJQUFKLENBQVMsYUFBVCxDQUhELEVBSUN5TyxPQUFPVCxlQUFQLENBQXVCaE8sSUFBdkIsQ0FBNEIsU0FBNUIsQ0FKRDtBQUtBO0FBQ0QsRUFkRDs7QUFnQkErTixRQUFPak0sU0FBUCxDQUFpQitNLFNBQWpCLEdBQTZCLFVBQVNKLE1BQVQsRUFBZ0I7QUFDNUN2USxJQUFFdVEsT0FBT04sZ0JBQVAsQ0FBd0JoRyxRQUExQixFQUFvQ3JILFdBQXBDLENBQWdELGFBQWhEO0FBQ0E1QyxJQUFFdVEsT0FBT0osbUJBQVAsQ0FBMkJsRyxRQUE3QixFQUF1Q3JILFdBQXZDLENBQW1ELGFBQW5EO0FBQ0E1QyxJQUFFdVEsT0FBT0osbUJBQVAsQ0FBMkJsRyxRQUE3QixFQUF1QzlKLElBQXZDLENBQTRDLFVBQTVDLEVBQXdELElBQXhEO0FBQ0FvUSxTQUFPVCxlQUFQLEdBQXlCLElBQXpCO0FBQ0FTLFNBQU9SLGtCQUFQLEdBQTRCLElBQTVCO0FBQ0EsRUFORDs7QUFRQUYsUUFBT2pNLFNBQVAsQ0FBaUI0TSxXQUFqQixHQUErQixVQUFTRCxNQUFULEVBQWdCO0FBQzlDdlEsSUFBRXVRLE9BQU9OLGdCQUFQLENBQXdCaEcsUUFBMUIsRUFBb0NySCxXQUFwQyxDQUFnRCxhQUFoRDtBQUNBNUMsSUFBRXVRLE9BQU9KLG1CQUFQLENBQTJCbEcsUUFBN0IsRUFBdUNySCxXQUF2QyxDQUFtRCxhQUFuRDtBQUNBLEVBSEQ7O0FBS0FpTixRQUFPak0sU0FBUCxDQUFpQjZGLFVBQWpCLEdBQThCLFVBQVNtSCxXQUFULEVBQXNCQyxjQUF0QixFQUFzQ0MsVUFBdEMsRUFBa0RDLE9BQWxELEVBQTBEO0FBQ3ZGL1EsSUFBRSxlQUFGLEVBQW1Cc0UsSUFBbkIsQ0FBd0JzTSxXQUF4QjtBQUNBNVEsSUFBRSxrQkFBRixFQUFzQnNFLElBQXRCLENBQTJCdU0sY0FBM0I7QUFDQTdRLElBQUUsY0FBRixFQUFrQnNFLElBQWxCLENBQXVCd00sVUFBdkI7O0FBRUE5USxJQUFFLGdCQUFGLEVBQW9CeUUsSUFBcEIsQ0FBeUIsbUJBQW1Cc00sUUFBUSxPQUFSLENBQTVDO0FBQ0EvUSxJQUFFLHNCQUFGLEVBQTBCeUUsSUFBMUIsQ0FBK0IseUJBQXlCc00sUUFBUSxhQUFSLENBQXhEOztBQUVBL1EsSUFBRSxnQkFBRixFQUFvQixDQUFwQixFQUF1QitELE1BQXZCLENBQThCMEYsVUFBOUI7QUFDQSxFQVREOztBQVdBekosR0FBRSxxQkFBRixFQUF5QndCLEVBQXpCLENBQTRCLE9BQTVCLEVBQXFDLFlBQVU7QUFDOUMsTUFBSStPLFNBQVNuTCxPQUFPLFFBQVAsQ0FBYjs7QUFFQSxNQUFHbUwsT0FBT1QsZUFBUCxJQUEwQixJQUExQixJQUFrQ1MsT0FBT1Isa0JBQVAsSUFBNkIsSUFBbEUsRUFBdUU7QUFDdEUvUCxLQUFFLGdCQUFGLEVBQW9CLENBQXBCLEVBQXVCK0QsTUFBdkIsQ0FBOEIyRixVQUE5QjtBQUNBO0FBQ0E7O0FBRUQxSixJQUFFLGdCQUFGLEVBQW9CLENBQXBCLEVBQXVCK0QsTUFBdkIsQ0FBOEJDLFVBQTlCOztBQUVBLE1BQUlxQixZQUFZa0wsT0FBT1QsZUFBUCxDQUF1QmhPLElBQXZCLENBQTRCLFNBQTVCLEVBQXVDLElBQXZDLENBQWhCO0FBQ0EsTUFBSWtQLFlBQVlULE9BQU9ULGVBQVAsQ0FBdUJoTyxJQUF2QixDQUE0QixZQUE1QixDQUFoQjtBQUNBLE1BQUltUCxXQUFXVixPQUFPUixrQkFBUCxDQUEwQmpPLElBQTFCLENBQStCLFdBQS9CLENBQWY7O0FBRUE5QixJQUFFZ0QsSUFBRixDQUFPO0FBQ05FLFNBQU0sT0FEQTtBQUVORCxRQUFLc04sT0FBTy9DLEtBQVAsQ0FBYTRDLGFBRlo7QUFHTnRPLFNBQU07QUFDTDBELGdCQUFZSCxTQURQO0FBRUw2TCxnQkFBWUYsU0FGUDtBQUdMRyxlQUFXRjs7QUFITixJQUhBO0FBU043TixZQUFTLGlCQUFTdEIsSUFBVCxFQUFjLENBRXRCO0FBWEssR0FBUCxFQVlHa0QsSUFaSCxDQVlRLFVBQVNsRCxJQUFULEVBQWM7QUFDckI5QixLQUFFLGdCQUFGLEVBQW9CLENBQXBCLEVBQXVCK0QsTUFBdkIsQ0FBOEIyRixVQUE5QjtBQUNBMUosS0FBRSxnQkFBRixFQUFvQixDQUFwQixFQUF1QitELE1BQXZCLENBQThCSSxVQUE5QjtBQUNBb00sVUFBT1QsZUFBUCxDQUF1QjVJLE1BQXZCO0FBQ0FxSixVQUFPSSxTQUFQLENBQWlCSixNQUFqQjtBQUNBLEdBakJEO0FBa0JBLEVBaENEOztBQWtDQVYsUUFBT2pNLFNBQVAsQ0FBaUJ3RSxJQUFqQixHQUF3QixZQUFVO0FBQ2pDLE1BQUltSSxTQUFTLElBQWI7QUFDQXZRLElBQUV1USxPQUFPTixnQkFBUCxDQUF3QmhHLFFBQTFCLEVBQW9DekksRUFBcEMsQ0FBdUMsT0FBdkMsRUFBZ0QsWUFBVztBQUFFcU8sVUFBT2pNLFNBQVAsQ0FBaUJ5TSxhQUFqQixDQUErQixJQUEvQixFQUFxQ0UsTUFBckM7QUFBK0MsR0FBNUc7QUFDQXZRLElBQUV1USxPQUFPSixtQkFBUCxDQUEyQmxHLFFBQTdCLEVBQXVDekksRUFBdkMsQ0FBMEMsT0FBMUMsRUFBbUQsWUFBVztBQUFFcU8sVUFBT2pNLFNBQVAsQ0FBaUI2TSxnQkFBakIsQ0FBa0MsSUFBbEMsRUFBd0NGLE1BQXhDO0FBQWtELEdBQWxIO0FBQ0EsRUFKRDs7QUFNQVYsUUFBT2pNLFNBQVAsQ0FBaUJnRixPQUFqQixHQUEyQixZQUFVO0FBQ3BDeEQsU0FBTyxRQUFQLElBQW1CLElBQUl5SyxNQUFKLEVBQW5CO0FBQ0EsRUFGRDs7QUFJQS9ILFlBQVdsRSxTQUFYLENBQXFCZ0YsT0FBckI7QUFDQUMsUUFBT2pGLFNBQVAsQ0FBaUJnRixPQUFqQjtBQUNBb0IsV0FBVXBHLFNBQVYsQ0FBb0JnRixPQUFwQjtBQUNBc0MsbUJBQWtCdEgsU0FBbEIsQ0FBNEJnRixPQUE1QjtBQUNBL0QsV0FBVWpCLFNBQVYsQ0FBb0JnRixPQUFwQjtBQUNBaUgsUUFBT2pNLFNBQVAsQ0FBaUJnRixPQUFqQjtBQUNBdUYsU0FBUXZLLFNBQVIsQ0FBa0JnRixPQUFsQjtBQUNBLENBbnlCQSxFIiwiZmlsZSI6IlxcanNcXG1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGY3Nzc2N2MxYzNjMWY5OWEzMDQiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgRklMRSBTVFJVQ1RVUkVcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCAgXHQxLiBBSkFYIFNldHVwXHJcbnxcdDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG58XHQzLiBPdGhlclxyXG58XHJcbiovXHJcblxyXG5pbXBvcnQgJy4uL2pzL2NvbXBvbmVudHMnO1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09XHJcblx0XHQxLiBBSkFYIFNldHVwXHJcblx0ICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cdCQuYWpheFNldHVwKHtcclxuXHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0J1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JyksXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Mi4gSFRNTCBNb2RpZmljYXRpb25zXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdGlmKCQoJy5zaG93LS1zY3JvbGwtdG8tdG9wJykubGVuZ3RoID4gMCl7XHJcblx0XHQkKCcubWFpbi1jb250ZW50JykuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGJ1dHRvbi0tYWNjZW50IHNjcm9sbC10by10b3BcIj5TY3JvbGwgdG8gVG9wPC9idXR0b24+Jyk7XHJcblx0fVxyXG5cclxuXHQvLyBBY2Nlc3NpYmlsaXR5XHJcblx0JCgnLmRyb3Bkb3duJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cdCQoJy5kcm9wZG93biA+IGJ1dHRvbicpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XHJcblx0JCgnLmRyb3Bkb3duIC5kcm9wZG93bi1jb250ZW50IGEnKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblxyXG5cdC8vIE1ha2VzIHByaW1hcnkgdG9waWMgZmlyc3RcclxuXHQkKCcudG9waWNzLWxpc3QnKS5wcmVwZW5kKCQoJy5maXJzdCcpKTtcclxuXHQkKCcudG9waWNzLWxpc3QgLmxvYWRlcicpLmZhZGVPdXQoMCk7XHJcblx0JCgnLnRvcGljcy1saXN0IGxpJykuZmlyc3QoKS5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0LCBmdW5jdGlvbiBzaG93TmV4dFRvcGljKCkge1xyXG5cdFx0JCh0aGlzKS5uZXh0KCBcIi50b3BpY3MtbGlzdCBsaVwiICkuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCwgc2hvd05leHRUb3BpYyk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5vcmRlci1saXN0LWpzJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHZhciBsaXN0ID0gJCh0aGlzKTtcclxuXHRcdC8vIHNvcnRVbm9yZGVyZWRMaXN0KGxpc3QpO1xyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ2xhc3QtbmFtZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkTGFzdE5hbWVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ2FscGhhLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRBbHBoYUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygndGl0bGUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZFRpdGxlSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0IDMuIE9USEVSXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2hhbmdlXCIsIFwiLmVtYWlsLXRhYmxlIC5jaGVja2JveCBpbnB1dFwiLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzZWxlY3QgPSBmdW5jdGlvbihkb20pe1xyXG5cdFx0XHR2YXIgc3RhdHVzID0gZG9tLnBhcmVudHMoKS5lcSg0KS5kYXRhKCdzdGF0dXMnKTtcclxuXHRcdFx0dmFyIGVtYWlsU3RyaW5nID0gXCJtYWlsdG86XCI7XHJcblx0XHRcdHZhciBjaGVja2JveFNlbGVjdG9yID0gJy5lbWFpbC10YWJsZS4nICsgc3RhdHVzICsgJyAuY2hlY2tib3ggaW5wdXQnO1xyXG5cdFx0XHR2YXIgZW1haWxCdXR0b25zZWxlY3RvciA9IFwiLmVtYWlsLXNlbGVjdGVkLlwiICsgc3RhdHVzO1xyXG5cclxuXHRcdFx0JChjaGVja2JveFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0XHRcdGlmKCQodmFsdWUpLmlzKFwiOmNoZWNrZWRcIikgJiYgISQodmFsdWUpLmhhc0NsYXNzKFwibWFzdGVyLWNoZWNrYm94XCIpKSB7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSAkKHZhbHVlKS5kYXRhKCdlbWFpbCcpO1xyXG5cdFx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gXCIsXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0JChlbWFpbEJ1dHRvbnNlbGVjdG9yKS5wcm9wKCdocmVmJywgZW1haWxTdHJpbmcpO1xyXG5cdFx0fTtcclxuXHRcdHNldFRpbWVvdXQoc2VsZWN0KCQodGhpcykpLCAyMDAwKTtcclxuXHR9KTtcclxuXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5lbWFpbC1zZWxlY3RlZFwiLCBmdW5jdGlvbihlKSB7XHJcblx0XHRpZigkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gJ21haWx0bzonIHx8ICQodGhpcykucHJvcCgnaHJlZicpID09PSBudWxsKXtcclxuXHRcdFx0YWxlcnQoXCJZb3UgaGF2ZW4ndCBzZWxlY3RlZCBhbnlvbmUuXCIpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIEV4dGVybmFsIGxpbmtzIGdpdmUgYW4gaWxsdXNpb24gb2YgQUpBWFxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuZXh0ZXJuYWwtbGlua1wiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIGVsZW1Ub0hpZGVTZWxlY3RvciA9ICQoJCh0aGlzKS5kYXRhKCdlbGVtZW50LXRvLWhpZGUtc2VsZWN0b3InKSk7XHJcblx0XHR2YXIgZWxlbVRvUmVwbGFjZSA9ICQoJCh0aGlzKS5kYXRhKCdlbGVtZW50LXRvLXJlcGxhY2Utd2l0aC1sb2FkZXItc2VsZWN0b3InKSk7XHJcblxyXG5cdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdFx0ZWxlbVRvSGlkZVNlbGVjdG9yLmhpZGUoKTtcclxuXHRcdGVsZW1Ub1JlcGxhY2UuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5hZnRlcignPGRpdiBpZD1cImNvbnRlbnQtcmVwbGFjZWQtY29udGFpbmVyXCIgY2xhc3M9XCJsb2FkZXIgbG9hZGVyLS14LWxhcmdlXCI+PC9kaXY+Jyk7XHJcblxyXG5cdFx0JCgnI2NvbnRlbnQtcmVwbGFjZWQtY29udGFpbmVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFVzZWQgb24gdGhlIHN0dWRlbnQgaW5kZXggcGFnZVxyXG5cdCQoXCIjc2hhcmUtbmFtZS1mb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc2hhcmVfbmFtZSl7XHJcblx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnc3VjY2VzcycsICdZb3VyIG5hbWUgaXMgYmVpbmcgc2hhcmVkIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNyZWF0ZVRvYXN0KCcnLCAnWW91IGFyZSBubyBsb25nZXIgc2hhcmluZyB5b3VyIG5hbWUgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JCgnI3NoYXJlX25hbWUnKS5wcm9wKCdjaGVja2VkJywgcmVzcG9uc2Uuc2hhcmVfbmFtZSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIi5yZWNlaXZlLWVtYWlscy1mb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc3VjY2Vzc2Z1bCl7XHJcblx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnc3VjY2VzcycsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnZXJyb3InLCByZXNwb25zZS5tZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnLnJlY2VpdmUtZW1haWxzLWNoZWNrYm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblx0XHQkKHRoaXMpLnN1Ym1pdCgpO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0JChcIiNsb2dpbkZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQoJy5oZWxwLWJsb2NrJywgJyNsb2dpbkZvcm0nKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuaGlkZSgpO1xyXG5cdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblxyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdFx0JCgnI2xvZ2luLXVzZXJuYW1lJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykudGV4dChkYXRhW1wicmVzcG9uc2VKU09OXCJdW1wiZXJyb3JzXCJdW1widXNlcm5hbWVcIl1bMF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnI25ldy10b3BpYy1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0XHRzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN1Ym1pdEJ1dHRvbikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0Y29udGV4dDogJCh0aGlzKSxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucy5jcmVhdGVFZGl0VG9waWNET00oZGF0YVtcImlkXCJdLCBkYXRhW1wibmFtZVwiXSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKS5odG1sKCdBZGQnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBORVcgVVNFUlxyXG5cdC8vIHB1dCB0aGlzIHN0dWZmIGluIGFuIGFycmF5XHJcblx0Ly8gdG9kbzogaWYgc3R1ZGVudCBpcyBzZWxlY3RlZCwgZGVzZWxlY3QgdGhlIHJlc3QgYW5kIGRpc2FibGUgdGhlbSAobGlrZXdpc2UgZm9yIG90aGVyIGNoZWNrYm94ZXMpXHJcblxyXG5cdCQoJy51c2VyLWZvcm0gI3VzZXJuYW1lJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcudXNlci1mb3JtICNlbWFpbCcpLnZhbCgkKHRoaXMpLnZhbCgpICsgXCJAc3Vzc2V4LmFjLnVrXCIpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblxyXG5cdCQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRpZigkKCcubmV3LXVzZXItc3R1ZGVudCcpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0XHRcdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcjc3R1ZGVudC1mb3JtJykuaGlkZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLnNob3coKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCQoXCIuZmF2b3VyaXRlLWNvbnRhaW5lclwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzdmdDb250YWluZXIgPSAkKHRoaXMpO1xyXG5cdFx0dmFyIHN2ZyA9IHN2Z0NvbnRhaW5lci5maW5kKCdzdmcnKTtcclxuXHJcblx0XHRpZih3aW5kb3dbJ3Byb2plY3QnXSAhPSBudWxsKXtcclxuXHRcdFx0dmFyIHByb2plY3RJZCA9IHdpbmRvd1sncHJvamVjdCddLmRhdGEoJ3Byb2plY3QtaWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwcm9qZWN0SWQgPSAkKHRoaXMpLmRhdGEoJ3Byb2plY3QtaWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRzdmcuaGlkZSgwKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLnNob3coMCk7XHJcblxyXG5cdFx0aWYoc3ZnLmhhc0NsYXNzKCdmYXZvdXJpdGUnKSl7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAncmVtb3ZlJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL3JlbW92ZS1mYXZvdXJpdGUnO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAnYWRkJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL2FkZC1mYXZvdXJpdGUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihhY3Rpb24gPT0gXCJhZGRcIil7XHJcblx0XHRcdFx0XHRzdmcuYWRkQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzdmcucmVtb3ZlQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0c3ZnLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QpO1xyXG5cdFx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJ25hdi5tb2JpbGUgLnN1Yi1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZHJvcGRvd24gPSAkKHRoaXMpO1xyXG5cdFx0dmFyIGNvbnRlbnQgPSBkcm9wZG93bi5maW5kKCcuZHJvcGRvd24tY29udGVudCcpO1xyXG5cclxuXHRcdGlmKGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuaGlkZShjb25maWcuYW5pbXRpb25zLm1lZGl1bSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCB0cnVlKTtcclxuXHRcdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgZmFsc2UpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDE4MGRlZylcIik7XHJcblx0XHRcdGRyb3Bkb3duLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRjb250ZW50LnNob3coY29uZmlnLmFuaW10aW9ucy5tZWRpdW0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8gSFRNTCBFRElUT1JcclxuXHQkKCcuaHRtbC1lZGl0b3InKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSl7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICcvc25pcHBldD9zbmlwcGV0PWh0bWwtZWRpdG9yLXRvb2xiYXInLFxyXG5cdFx0XHR0eXBlOidHRVQnLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3VsdCl7XHJcblx0XHRcdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmFmdGVyKHJlc3VsdCk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHR2YXIgYnV0dG9uc0h0bWwgPSBcIjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS10b3AtYnV0dG9ucyBmbGV4Jz48YnV0dG9uIGNsYXNzPSdodG1sJyB0eXBlPSdidXR0b24nPkhUTUw8L2J1dHRvbj48YnV0dG9uIGNsYXNzPSdwcmV2aWV3JyB0eXBlPSdidXR0b24nPlBSRVZJRVc8L2J1dHRvbj48L2Rpdj5cIjtcclxuXHRcdHZhciBwcmV2aWV3SHRtbCA9IFwiPGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJz48ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tcHJldmlldyc+PC9kaXY+PC9kaXY+XCI7XHJcblxyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmJlZm9yZShidXR0b25zSHRtbCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3InKS5hZnRlcihwcmV2aWV3SHRtbCk7XHJcblxyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcicpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldycpLmh0bWwoJCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLnZhbCgpKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3JykuaHRtbCgkKHRoaXMpLnZhbCgpKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yLS10b3AtYnV0dG9ucyAuaHRtbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0Jykuc2hvdygpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS10b29sYmFyJykuc2hvdygpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcicpLmhpZGUoKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yLS10b3AtYnV0dG9ucyAucHJldmlldycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykuaGlkZSgpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS10b29sYmFyJykuaGlkZSgpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcicpLnNob3coKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVG9nZ2xlIGxhYmVsIGZsaXBzIHRvZ2dsZVxyXG5cdCQoXCIuaHRtbC1lZGl0b3JcIikub24oXCJjbGlja1wiLCBcIi5odG1sLWVkaXRvci0tdG9vbGJhciBsaSBidXR0b25cIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHN3aXRjaCgkKHRoaXMpLmRhdGEoJ3R5cGUnKSl7XHJcblx0XHRcdGNhc2UgXCJsaW5lYnJlYWtcIjpcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGJyPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIm9sXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJ1xcbjxvbD5cXG5cXHQ8bGk+SXRlbSAxPC9saT5cXG5cXHQ8bGk+SXRlbSAyPC9saT5cXG5cXHQ8bGk+SXRlbSAzPC9saT5cXG48L29sPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInVsXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJ1xcbjx1bD5cXG5cXHQ8bGk+SXRlbSB4PC9saT5cXG5cXHQ8bGk+SXRlbSB5PC9saT5cXG5cXHQ8bGk+SXRlbSB6PC9saT5cXG48L3VsPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImJvbGRcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdiJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidHRcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICd0dCcpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIml0YWxpY1wiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ2knKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ1bmRlcmxpbmVcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICd1Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiaW1nXCI6XHJcblx0XHRcdFx0dmFyIGlucHV0VXJsID0gcHJvbXB0KFwiRW50ZXIgdGhlIGltYWdlIFVSTFwiLCBcImh0dHBzOi8vd3d3LlwiKTtcclxuXHRcdFx0XHR2YXIgaW5wdXRBbHQgPSBwcm9tcHQoXCJFbnRlciBhbHQgdGV4dFwiLCBcIkltYWdlIG9mIFN1c3NleCBjYW1wdXNcIik7XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxpbWcgYWx0PVwiJyArIGlucHV0QWx0ICsgJ1wiIHNyYz1cIicgKyBpbnB1dFVybCArICdcIj4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJsaW5rXCI6XHJcblx0XHRcdFx0dmFyIGlucHV0VXJsID0gcHJvbXB0KFwiRW50ZXIgdGhlIFVSTFwiLCBcImh0dHBzOi8vd3d3LlwiKTtcclxuXHRcdFx0XHR2YXIgaW5wdXRUZXh0ID0gcHJvbXB0KFwiRW50ZXIgZGlzcGxheSB0ZXh0XCIsIFwiU3Vzc2V4XCIpO1xyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8YSBocmVmPVwiJyArIGlucHV0VXJsICsgJ1wiPicgKyBpbnB1dFRleHQgKyAnPC9hPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImNvZGVcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdjb2RlJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwicHJlXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAncHJlJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiaW5mb1wiOlxyXG5cdFx0XHRcdCQuZGlhbG9nKHtcclxuXHRcdFx0XHRcdHRoZW1lOiAnbWF0ZXJpYWwnLFxyXG5cdFx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRcdHRpdGxlOiAnSFRNTCBFZGl0b3IgSW5mbycsXHJcblx0XHRcdFx0XHRjb250ZW50OiAnQWxsIGxpbmtzIHlvdSBhZGQgd2lsbCBvcGVuIGluIGEgbmV3IHRhYi4gQWxsIEhUTUwgNSBlbGVtZW50cyBhcmUgdmFsaWQgZm9yIHRoZSBkZXNjcmlwdGlvbiBmaWVsZCwgZXhjbHVkaW5nOyA8YnI+PGJyPiA8dWw+PGxpPlNjcmlwdCB0YWdzPC9saT48bGk+SGVhZGluZyB0YWdzPC9saT48bGk+SFRNTCByb290IHRhZ3M8L2xpPjxsaT5Cb2R5IHRhZ3M8L2xpPjwvdWw+JyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cdCQoJy5zdHVkZW50LXVuZG8tc2VsZWN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIGNhcmQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnVW5kbyBQcm9qZWN0IFNlbGVjdGlvbicsXHJcblx0XHRcdHR5cGU6ICdyZWQnLFxyXG5cdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTEyLjUsOEM5Ljg1LDggNy40NSw5IDUuNiwxMC42TDIsN1YxNkgxMUw3LjM4LDEyLjM4QzguNzcsMTEuMjIgMTAuNTQsMTAuNSAxMi41LDEwLjVDMTYuMDQsMTAuNSAxOS4wNSwxMi44MSAyMC4xLDE2TDIyLjQ3LDE1LjIyQzIxLjA4LDExLjAzIDE3LjE1LDggMTIuNSw4WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0YXV0b0Nsb3NlOiAnY2FuY2VsfDEwMDAwJyxcclxuXHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byB1bi1zZWxlY3QgeW91ciBzZWxlY3RlZCBwcm9qZWN0PzwvYj4nLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQQVRDSCcsXHJcblx0XHRcdFx0XHRcdFx0dXJsOiAnL3N0dWRlbnRzL3VuZG8tc2VsZWN0ZWQtcHJvamVjdCcsXHJcblx0XHRcdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FyZC5oaWRlKDQwMCwgZnVuY3Rpb24oKSB7IGNhcmQucmVtb3ZlKCk7IH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnc3VjY2VzcycsICdVbmRvIHN1Y2Nlc3NmdWwuJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnZXJyb3InLCByZXNwb25zZS5tZXNzYWdlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2FuY2VsOiB7fSxcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PVxyXG5cdFx0OS4gSW5pdGlhbGlzZVxyXG5cdCAgID09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvLyBVc2VkIGFzIGFuIGVhc3kgd2F5IGZvciBmdW5jdGlvbnMgdG8gZ2V0IGN1cnJlbnQgcHJvamVjdCBkYXRhXHJcblx0aWYoJCgnLnByb2plY3QtY2FyZCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0d2luZG93Wydwcm9qZWN0J10gPSAkKCcucHJvamVjdC1jYXJkJyk7XHJcblx0fVxyXG5cclxuXHQkKCcuYW5pbWF0ZS1jYXJkcyAuY2FyZCcpLmNzcyhcIm9wYWNpdHlcIiwgMCk7XHJcblxyXG5cdHZhciBkZWxheSA9IDA7XHJcblx0JCgnLmFuaW1hdGUtY2FyZHMgLmNhcmQnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0ZGVsYXkgKz0gMjAwO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwic2xpZGVJblVwIGFuaW1hdGVkXCIpO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5hbmltYXRlKHtcclxuXHRcdFx0XHRvcGFjaXR5OiAxXHJcblx0XHRcdH0sIDgwMCk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpLCBkZWxheSk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uKCBldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MgKSB7XHJcblx0aWYoY29uZmlnLnNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24pe1xyXG5cdFx0Y3JlYXRlVG9hc3QoJ2Vycm9yJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggdGhhdCByZXF1ZXN0LicpO1xyXG5cdH1cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG4vKiBGSUxFIFNUUlVDVFVSRVxyXG5cclxuKi9cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZJTEUgU1RSVUNUVVJFXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnxcdDEuIE1vYmlsZSBNZW51XHJcbnxcdDIuIERpYWxvZyAvIE1vZGFsXHJcbnxcdDMuIERhdGEgVGFibGVcclxufFx0NC4gQ29sdW1uIFRvZ2dsZSBUYWJsZVxyXG58XHQ1LiBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcbnxcdDYuIEVkaXQgVG9waWNzIFtBZG1pbl1cclxufFx0Ny4gTWVudVxyXG58XHJcbiovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuOyQoZnVuY3Rpb24oKSB7XHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQgMS4gTW9iaWxlIE1lbnVcclxuXHQgICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0XHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBtb2JpbGUgbWVudS5cclxuXHRcdCpcclxuXHRcdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgTW9iaWxlTWVudSA9ICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsZW1lbnQpIHtcclxuXHRcdGlmKHdpbmRvd1snTW9iaWxlTWVudSddID09IG51bGwpe1xyXG5cdFx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXSA9IHRoaXM7XHJcblx0XHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHRcdHRoaXMuYWN0aXZhdG9yID0gJCh0aGlzLlNlbGVjdG9yc18uSEFNQlVSR0VSX0NPTlRBSU5FUik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkgPSAkKHRoaXMuU2VsZWN0b3JzXy5VTkRFUkxBWSk7XHJcblx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJUaGVyZSBjYW4gb25seSBiZSBvbmUgbW9iaWxlIG1lbnUuXCIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdE1PQklMRV9NRU5VOiAnbmF2Lm1vYmlsZScsXHJcblx0XHRIQU1CVVJHRVJfQ09OVEFJTkVSOiAnLmhhbWJ1cmdlci1jb250YWluZXInLFxyXG5cdFx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0XHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtb2JpbGVNZW51ID0gdGhpcztcclxuXHRcdHRoaXMuYWN0aXZhdG9yLm9uKCdjbGljaycsIG1vYmlsZU1lbnUub3Blbk1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0XHR0aGlzLnVuZGVybGF5Lm9uKCdjbGljaycsIG1vYmlsZU1lbnUuY2xvc2VNZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5NT0JJTEVfTUVOVSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5tb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Mi4gRGlhbG9nIC8gTW9kYWxcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdHZhciBEaWFsb2cgPSBmdW5jdGlvbiBEaWFsb2coZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0XHR0aGlzLnVuZGVybGF5ID0gJCgnLnVuZGVybGF5Jyk7XHJcblx0XHR0aGlzLmhlYWRlciA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0hFQURFUik7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHJcblx0XHQvLyBSZWdpc3RlciBDb21wb25lbnRcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyhcInJlZ2lzdGVyZWRcIik7XHJcblxyXG5cdFx0Ly8gQVJJQVxyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJkaWFsb2ctdGl0bGVcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJkaWFsb2ctZGVzY1wiKTtcclxuXHRcdHRoaXMuaGVhZGVyLmF0dHIoJ3RpdGxlJywgdGhpcy5oZWFkZXIuZmluZCgnI2RpYWxvZy1kZXNjJykuaHRtbCgpKTtcclxuXHJcblx0XHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdFx0dGhpcy5sb2FkZXIgPSAkKGVsZW1lbnQpLmZpbmQoXCIubG9hZGVyXCIpO1xyXG5cdFx0dGhpcy5pc0Nsb3NhYmxlID0gdHJ1ZTtcclxuXHRcdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdFx0TE9BREVSOiAnPGRpdiBjbGFzcz1cImxvYWRlclwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4O3RvcDogMjUlO1wiPjwvZGl2PicsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdEFDVElWRTogJ2FjdGl2ZScsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RElBTE9HOiAnLmRpYWxvZycsXHJcblx0XHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0XHRESUFMT0dfQ09OVEVOVDogJy5jb250ZW50JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5sb2FkZXIuc2hvdygwKTtcclxuXHRcdHRoaXMuY29udGVudC5oaWRlKDApO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZUxvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5oaWRlKDApO1xyXG5cdFx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIiwgdGhpcy5kaWFsb2dOYW1lKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR3aW5kb3dbJ0RpYWxvZyddID0gdGhpcztcclxuXHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZURpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmlzQ2xvc2FibGUgJiYgdGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIikgPT0gdGhpcy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHRcdHZhciBkaWFsb2cgPSB0aGlzO1xyXG5cclxuXHRcdC8vIEZpbmQgYWN0aXZhdG9yIGJ1dHRvblxyXG5cdFx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdhY3RpdmF0b3InKSAmJiAkKHRoaXMpLmRhdGEoJ2RpYWxvZycpID09IGRpYWxvZy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0XHRkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucy5wdXNoKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHRkaWFsb2cuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0ZGlhbG9nLnVuZGVybGF5Lm9uKCdjbGljaycsIGRpYWxvZy5oaWRlRGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblxyXG5cdFx0dHJ5e1xyXG5cdFx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykub24oJ2NsaWNrJywgZGlhbG9nLnNob3dEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoKGVycil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJEaWFsb2cgXCIgKyBkaWFsb2cuZGlhbG9nTmFtZSArIFwiIGhhcyBubyBhY3RpdmF0b3IgYnV0dG9uLlwiKTtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZGlhbG9nID0gbmV3IERpYWxvZyh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzKS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZS5rZXlDb2RlID09IDI3ICYmIHdpbmRvd1snRGlhbG9nJ10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snRGlhbG9nJ10uaGlkZURpYWxvZygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydNb2JpbGVNZW51J10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDMuIERhdGEgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHRcdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0XHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdFx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0XHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0XHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRcdGlmIChyb3cpIHtcclxuXHRcdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuIENvbHVtbiBUb2dnbGUgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQ29sdW1uVG9nZ2xlVGFibGUgPSBmdW5jdGlvbiBDb2x1bW5Ub2dnbGVUYWJsZShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5oZWFkID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0cicpO1xyXG5cdFx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdFx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBudWxsO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydDb2x1bW5Ub2dnbGVUYWJsZSddID0gQ29sdW1uVG9nZ2xlVGFibGU7XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRUT0dHTEVfVEFCTEU6ICcudGFibGUtY29sdW1uLXRvZ2dsZSdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9CVVRUT046ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGRvdC1tZW51X19hY3RpdmF0b3JcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1sZWZ0OmF1dG87XCI+Q29sdW1uczwvYnV0dG9uPicsXHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfTUVOVTogJzx1bCBjbGFzcz1cImRvdC1tZW51IGRvdC1tZW51LS1ib3R0b20tbGVmdFwiPjwvdWw+J1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblxyXG5cdFx0dG9nZ2xlQ29sdW1uOiBmdW5jdGlvbihjb2x1bW5JbmRleCwgdGFibGUsIGNoZWNrZWQpIHtcclxuXHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5yZW1vdmVBdHRyKCdoaWRkZW4nKTtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmF0dHIoJ2hpZGRlbicsIFwidHJ1ZVwiKTtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJlZnJlc2g6IGZ1bmN0aW9uKHRhYmxlKSB7XHJcblx0XHRcdHZhciBoaWRlSW5kaWNlcyA9IFtdO1xyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MgPSB0YWJsZS5lbGVtZW50LmZpbmQoJ3Rib2R5IHRyJyk7XHJcblxyXG5cdFx0XHR0YWJsZS5oZWFkZXJzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZigkKHRoaXMpLmF0dHIoJ2hpZGRlbicpKXtcclxuXHRcdFx0XHRcdGhpZGVJbmRpY2VzLnB1c2goJCh0aGlzKS5pbmRleCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGlkZUluZGljZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShoaWRlSW5kaWNlc1tpXSkuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJlZnJlc2hBbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnJlZnJlc2godGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRpZighdGhpcy5lbGVtZW50LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkNvbHVtblRvZ2dsZVRhYmxlIHJlcXVpcmVzIHRoZSB0YWJsZSB0byBoYXZlIGFuIHVuaXF1ZSBJRC5cIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdG9nZ2xlVGFibGUgPSB0aGlzO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX0JVVFRPTik7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JNZW51ID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX01FTlUpO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkID0gJ0NvbHVtblRvZ2dsZVRhYmxlLScgKyB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmJlZm9yZShjb2x1bW5TZWxlY3RvckJ1dHRvbik7XHJcblxyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYWZ0ZXIoY29sdW1uU2VsZWN0b3JNZW51KTtcclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JNZW51LmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgKyAnLW1lbnUnKTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gY29sdW1uU2VsZWN0b3JCdXR0b247XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IGNvbHVtblNlbGVjdG9yTWVudTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudS5maW5kKCd1bCcpLmRhdGEoXCJ0YWJsZVwiLCB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJykpO1xyXG5cclxuXHRcdHRoaXMuaGVhZGVycy5lYWNoKGZ1bmN0aW9uICgpe1xyXG5cdFx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuZGF0YShcImRlZmF1bHRcIikgPyBcImNoZWNrZWRcIiA6IFwiXCI7XHJcblx0XHRcdCQodGhpcykuZGF0YSgndmlzaWJsZScsICQodGhpcykuZGF0YShcImRlZmF1bHRcIikpO1xyXG5cclxuXHRcdFx0Y29sdW1uU2VsZWN0b3JNZW51LmFwcGVuZCgnXFxcclxuXHRcdFx0XHQ8bGkgY2xhc3M9XCJkb3QtbWVudV9faXRlbSBkb3QtbWVudV9faXRlbS0tcGFkZGVkXCI+IFxcXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4gXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY29sdW1uLXRvZ2dsZVwiIGlkPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIiB0eXBlPVwiY2hlY2tib3hcIiAnKyBjaGVja2VkICsnPiBcXFxyXG5cdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIj4nICsgJCh0aGlzKS50ZXh0KCkgKyAnPC9sYWJlbD4gXFxcclxuXHRcdFx0XHRcdDwvZGl2PiBcXFxyXG5cdFx0XHRcdDwvbGk+Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5jb2x1bW4tdG9nZ2xlXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpbmRleCA9ICQoJy5jb2x1bW4tdG9nZ2xlJykuaW5kZXgodGhpcyk7XHJcblx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMudG9nZ2xlQ29sdW1uKGluZGV4LCB0b2dnbGVUYWJsZSwgJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUgPSBuZXcgQ29sdW1uVG9nZ2xlVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ1IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG5cdHdpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRcdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0XHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0XHRTUEFDRTogMzIsXHJcblx0XHRFTlRFUjogMTMsXHJcblx0XHRDT01NQTogNDVcclxuXHR9O1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU0VBUkNIXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdFx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdFx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHRcdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHRcdHRoaXMudG9waWNOYW1lSW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRORVdfVE9QSUM6ICcvdG9waWNzLydcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdGVkaXRUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRcdGlmKHRvcGljLm9yaWdpbmFsTmFtZSA9PSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSl7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQuY29uZmlybSh7XHJcblx0XHRcdFx0dGl0bGU6ICdDaGFuZ2UgVG9waWMgTmFtZScsXHJcblx0XHRcdFx0dHlwZTogJ2JsdWUnLFxyXG5cdFx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIDxiPlwiJyArICB0b3BpYy5vcmlnaW5hbE5hbWUgKyAnXCI8L2I+IHRvIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCB0b3BpYy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19uYW1lIDogdG9waWMudG9waWNOYW1lSW5wdXQudmFsKClcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLm9yaWdpbmFsTmFtZSA9IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2FuY2VsOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRlbGV0ZVRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZScsXHJcblx0XHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArICdcIjwvYj4/JyxcclxuXHRcdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0XHRkZWxldGU6IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lbGVtZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5zbG93LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRjcmVhdGVFZGl0VG9waWNET006IGZ1bmN0aW9uKHRvcGljSWQsIG9yaWdpbmFsTmFtZSl7XHJcblx0XHRcdCQoXCIuZWRpdC10b3BpYy1saXN0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyB0b3BpY0lkICsnXCIgZGF0YS1vcmlnaW5hbC10b3BpYy1uYW1lPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxpbnB1dCBzcGVsbGNoZWNrPVwidHJ1ZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGVkaXQtdG9waWNcIiB0eXBlPVwic3VibWl0XCI+RWRpdDwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidXR0b24gZGVsZXRlLXRvcGljIGJ1dHRvbi0tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC9saT4nKTtcclxuXHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGVkaXRUb3BpYyA9IHRoaXM7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5lZGl0VG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdFx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5FZGl0VG9waWMgPSBuZXcgRWRpdFRvcGljKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNyBEb3RNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIERvdE1lbnUgPSBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMubWVudSA9IG51bGw7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RE9UX01FTlU6ICcuZG90LW1lbnUnLFxyXG5cdFx0QUNUSVZBVE9SOiAnLmRvdC1tZW51X19hY3RpdmF0b3InLFxyXG5cdFx0SVNfVklTSUJMRTogJy5pcy12aXNpYmxlJyxcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJyxcclxuXHRcdEJPVFRPTV9MRUZUOiAnZG90LW1lbnUtLWJvdHRvbS1sZWZ0JyxcclxuXHRcdEJPVFRPTV9SSUdIVDogJ2RvdC1tZW51LS1ib3R0b20tcmlnaHQnLFxyXG5cdFx0VE9QX0xFRlQ6ICdkb3QtbWVudS0tdG9wLWxlZnQnLFxyXG5cdFx0VE9QX1JJR0hUOiAnZG90LW1lbnUtLXRvcC1yaWdodCcsXHJcblx0XHRUQUJMRV9ET1RfTUVOVTogJ2RvdC1tZW51LS10YWJsZSdcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJ1dHRvblJlY3QgPSB0aGlzLmJ1dHRvblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIGxlZnQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LnJpZ2h0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSBsZWZ0Jyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKHRoaXMpKCk7XHJcblx0XHR0aGlzLm1lbnUuYWRkQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLm1lbnUucmVtb3ZlQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuaGlkZSgpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZCh0aGlzKSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuc2hvdy5iaW5kKHRoaXMpKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvdE1lbnUgPSB0aGlzO1xyXG5cdFx0dmFyIG1lbnVJZCA9ICQodGhpcy5idXR0b24pLmF0dHIoJ2lkJykgKyAnLW1lbnUnO1xyXG5cclxuXHRcdHRoaXMubWVudSA9ICQoJyMnICsgbWVudUlkKTtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSB0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uVEFCTEVfRE9UX01FTlUpO1xyXG5cclxuXHRcdHRoaXMuYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGlmKCF0YXJnZXQuaXMoZG90TWVudS5tZW51KSB8fCAhdGFyZ2V0LmlzKGRvdE1lbnUuYnV0dG9uKSkge1xyXG5cdFx0XHRcdGlmKCEkLmNvbnRhaW5zKCQoZG90TWVudS5tZW51KVswXSwgZS50YXJnZXQpKXtcclxuXHRcdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uQUNUSVZBVE9SKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkRvdE1lbnUgPSBuZXcgRG90TWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0NS4gU2Vjb25kIE1hcmtlclxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHR2YXIgTWFya2VyID0gZnVuY3Rpb24gTWFya2VyKCkge1xyXG5cdFx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdFx0dGhpcy5zdHVkZW50VGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvclRhYmxlID0gJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIik7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JEYXRhVGFibGUgPSB0aGlzLnN1cGVydmlzb3JUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdFx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdtYXJrZXItaWQnKSA9PSByb3cuZGF0YSgnc3VwZXJ2aXNvci1pZCcpKXtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdFx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksXHJcblx0XHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5yZXNldFZpZXcgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0XHQkKFwiI3N0dWRlbnQtbmFtZVwiKS50ZXh0KHN0dWRlbnROYW1lKTtcclxuXHRcdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdFx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHRcdCQoXCIjcHJvamVjdC10aXRsZVwiKS5odG1sKCc8Yj5UaXRsZTogPC9iPicgKyBwcm9qZWN0Wyd0aXRsZSddKTtcclxuXHRcdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0WydkZXNjcmlwdGlvbiddKTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHR9XHJcblxyXG5cdCQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHdpbmRvd1snTWFya2VyJ107XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9O1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdHZhciBwcm9qZWN0SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKVsnaWQnXTtcclxuXHRcdHZhciBzdHVkZW50SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtaWQnKTtcclxuXHRcdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0XHR1cmw6IG1hcmtlci5VcmxzXy5BU1NJR05fTUFSS0VSLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkLFxyXG5cdFx0XHRcdHN0dWRlbnRfaWQ6IHN0dWRlbnRJZCxcclxuXHRcdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LnJlbW92ZSgpO1xyXG5cdFx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB0aGlzO1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCh0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTsgfSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxuXHR9XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREaWFsb2cucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==