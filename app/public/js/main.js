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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTU4MmYxZTY1MTgyOTY4NzYzMGQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIm9uIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVxIiwiZGF0YSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpbmRleCIsInZhbHVlIiwiaXMiLCJwcm9wIiwic2V0VGltZW91dCIsImUiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInJlbW92ZUNsYXNzIiwiaGlkZSIsImFmdGVyIiwiY3NzIiwiYWpheCIsInVybCIsInR5cGUiLCJzZXJpYWxpemUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJzaGFyZV9uYW1lIiwic2hvd05vdGlmaWNhdGlvbiIsIkFqYXhGdW5jdGlvbnMiLCJwcm90b3R5cGUiLCJTZWxlY3RvcnNfIiwiTE9HX0lOX0RJQUxPRyIsImRpYWxvZyIsInNob3dMb2FkZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhpZGVMb2FkZXIiLCJzaG93IiwiYWRkQ2xhc3MiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiSlNPTiIsInBhcnNlIiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsInN2Z0NvbnRhaW5lciIsInN2ZyIsIndpbmRvdyIsInByb2plY3RJZCIsImFjdGlvbiIsImFqYXhVcmwiLCJwcm9qZWN0X2lkIiwiZHJvcGRvd24iLCJjb250ZW50IiwibWVkaXVtIiwicmVzdWx0IiwiYnV0dG9uc0h0bWwiLCJwcmV2aWV3SHRtbCIsImluc2VydEF0Q2FyZXQiLCJ3cmFwVGV4dFdpdGhUYWciLCJpbnB1dFVybCIsInByb21wdCIsImlucHV0QWx0IiwiaW5wdXRUZXh0IiwidGhlbWUiLCJlc2NhcGVLZXkiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsInRpdGxlIiwiY2FyZCIsInBhcmVudCIsImNvbmZpcm0iLCJpY29uIiwiYXV0b0Nsb3NlIiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwibWV0aG9kIiwic3VjY2Vzc2Z1bCIsInJlbW92ZSIsIm1lc3NhZ2UiLCJjYW5jZWwiLCJkZWxheSIsImFuaW1hdGUiLCJvcGFjaXR5IiwiYmluZCIsImRvY3VtZW50IiwiYWpheEVycm9yIiwiZXZlbnQiLCJyZXF1ZXN0Iiwic2V0dGluZ3MiLCJzaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uIiwiTW9iaWxlTWVudSIsImVsZW1lbnQiLCJhY3RpdmF0b3IiLCJIQU1CVVJHRVJfQ09OVEFJTkVSIiwidW5kZXJsYXkiLCJVTkRFUkxBWSIsImluaXQiLCJsb2ciLCJDc3NDbGFzc2VzXyIsIklTX1ZJU0lCTEUiLCJNT0JJTEVfTUVOVSIsIm9wZW5NZW51IiwiY2xvc2VNZW51IiwibW9iaWxlTWVudSIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiaGVhZGVyIiwiRElBTE9HX0hFQURFUiIsIkRJQUxPR19DT05URU5UIiwiSHRtbFNuaXBwZXRzXyIsIkxPQURFUiIsImxvYWRlciIsImlzQ2xvc2FibGUiLCJhY3RpdmF0b3JCdXR0b25zIiwiQUNUSVZFIiwiRElBTE9HIiwic2hvd0RpYWxvZyIsImhpZGVEaWFsb2ciLCJwdXNoIiwiZXJyIiwicmVhZHkiLCJrZXlkb3duIiwia2V5Q29kZSIsIkRhdGFUYWJsZSIsImJvZHlSb3dzIiwiZm9vdFJvd3MiLCJyb3dzIiwibWVyZ2UiLCJjaGVja2JveGVzIiwiQ0hFQ0tCT1giLCJtYXN0ZXJDaGVja2JveCIsIk1BU1RFUl9DSEVDS0JPWCIsIkRBVEFfVEFCTEUiLCJJU19TRUxFQ1RFRCIsInNlbGVjdEFsbFJvd3MiLCJzZWxlY3RSb3ciLCJjaGVja2JveCIsInJvdyIsImRhdGFUYWJsZSIsInByb3h5IiwiaSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJyZWZyZXNoQWxsIiwidG9nZ2xlVGFibGUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbiIsImNvbHVtblNlbGVjdG9yTWVudSIsImNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInJlbW92ZUFsbFNoYWRvd0NsYXNzZXMiLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJibHVyIiwib3JpZ2luYWxOYW1lIiwidG9waWNJZCIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwidG9waWMiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkZWxldGVUb3BpYyIsImRlbGV0ZSIsInNsb3ciLCJEb3RNZW51IiwiTWVudSIsImJ1dHRvbiIsIm1lbnUiLCJpc1RhYmxlRG90TWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIlRBQkxFX0RPVF9NRU5VIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImxlZnQiLCJwYXJzZUludCIsInRvcCIsInJpZ2h0IiwidG9nZ2xlIiwiZG90TWVudSIsIm1lbnVJZCIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNvbnRhaW5zIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0Iiwic3R1ZGVudElkIiwibWFya2VySWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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LElBQWpCLEdBQXdCLFlBQVU7QUFDakMsTUFBSW1JLFNBQVMsSUFBYjtBQUNBdFEsSUFBRXNRLE9BQU9OLGdCQUFQLENBQXdCaEcsUUFBMUIsRUFBb0N4SSxFQUFwQyxDQUF1QyxPQUF2QyxFQUFnRCxZQUFXO0FBQUVvTyxVQUFPbk0sU0FBUCxDQUFpQjJNLGFBQWpCLENBQStCLElBQS9CLEVBQXFDRSxNQUFyQztBQUErQyxHQUE1RztBQUNBdFEsSUFBRXNRLE9BQU9KLG1CQUFQLENBQTJCbEcsUUFBN0IsRUFBdUN4SSxFQUF2QyxDQUEwQyxPQUExQyxFQUFtRCxZQUFXO0FBQUVvTyxVQUFPbk0sU0FBUCxDQUFpQitNLGdCQUFqQixDQUFrQyxJQUFsQyxFQUF3Q0YsTUFBeEM7QUFBa0QsR0FBbEg7QUFDQSxFQUpEOztBQU1BVixRQUFPbk0sU0FBUCxDQUFpQmtGLE9BQWpCLEdBQTJCLFlBQVU7QUFDcEMxRCxTQUFPLFFBQVAsSUFBbUIsSUFBSTJLLE1BQUosRUFBbkI7QUFDQSxFQUZEOztBQUlBL0gsWUFBV3BFLFNBQVgsQ0FBcUJrRixPQUFyQjtBQUNBQyxRQUFPbkYsU0FBUCxDQUFpQmtGLE9BQWpCO0FBQ0FvQixXQUFVdEcsU0FBVixDQUFvQmtGLE9BQXBCO0FBQ0FzQyxtQkFBa0J4SCxTQUFsQixDQUE0QmtGLE9BQTVCO0FBQ0FqRSxXQUFVakIsU0FBVixDQUFvQmtGLE9BQXBCO0FBQ0FpSCxRQUFPbk0sU0FBUCxDQUFpQmtGLE9BQWpCO0FBQ0F1RixTQUFRekssU0FBUixDQUFrQmtGLE9BQWxCO0FBQ0EsQ0FueUJBLEUiLCJmaWxlIjoiXFxqc1xcbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNTgyZjFlNjUxODI5Njg3NjMwZCIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58ICBcdDEuIEFKQVggU2V0dXBcclxufFx0Mi4gSFRNTCBNb2RpZmljYXRpb25zXHJcbnxcdDMuIE90aGVyXHJcbnxcclxuKi9cclxuXHJcbmltcG9ydCAnLi4vanMvY29tcG9uZW50cyc7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuOyQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDEuIEFKQVggU2V0dXBcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0JC5hamF4U2V0dXAoe1xyXG5cdFx0aGVhZGVyczoge1xyXG5cdFx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKSxcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0aWYoJCgnLnNob3ctLXNjcm9sbC10by10b3AnKS5sZW5ndGggPiAwKXtcclxuXHRcdCQoJy5tYWluLWNvbnRlbnQnKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgYnV0dG9uLS1hY2NlbnQgc2Nyb2xsLXRvLXRvcFwiPlNjcm9sbCB0byBUb3A8L2J1dHRvbj4nKTtcclxuXHR9XHJcblxyXG5cdC8vIEFjY2Vzc2liaWxpdHlcclxuXHQkKCcuZHJvcGRvd24nKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblx0JCgnLmRyb3Bkb3duID4gYnV0dG9uJykuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcclxuXHQkKCcuZHJvcGRvd24gLmRyb3Bkb3duLWNvbnRlbnQgYScpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHJcblx0Ly8gTWFrZXMgcHJpbWFyeSB0b3BpYyBmaXJzdFxyXG5cdCQoJy50b3BpY3MtbGlzdCcpLnByZXBlbmQoJCgnLmZpcnN0JykpO1xyXG5cdCQoJy50b3BpY3MtbGlzdCAubG9hZGVyJykuZmFkZU91dCgwKTtcclxuXHQkKCcudG9waWNzLWxpc3QgbGknKS5maXJzdCgpLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIGZ1bmN0aW9uIHNob3dOZXh0VG9waWMoKSB7XHJcblx0XHQkKHRoaXMpLm5leHQoIFwiLnRvcGljcy1saXN0IGxpXCIgKS5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0LCBzaG93TmV4dFRvcGljKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLm9yZGVyLWxpc3QtanMnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGxpc3QgPSAkKHRoaXMpO1xyXG5cdFx0Ly8gc29ydFVub3JkZXJlZExpc3QobGlzdCk7XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnbGFzdC1uYW1lLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRMYXN0TmFtZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnYWxwaGEtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZEFscGhhSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCd0aXRsZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkVGl0bGVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQgMy4gT1RIRVJcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuZW1haWwtdGFibGUgLmNoZWNrYm94IGlucHV0XCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGVjdCA9IGZ1bmN0aW9uKGRvbSl7XHJcblx0XHRcdHZhciBzdGF0dXMgPSBkb20ucGFyZW50cygpLmVxKDQpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdFx0XHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHRcdFx0dmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmVtYWlsLXRhYmxlLicgKyBzdGF0dXMgKyAnIC5jaGVja2JveCBpbnB1dCc7XHJcblx0XHRcdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblxyXG5cdFx0XHQkKGNoZWNrYm94U2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRcdFx0aWYoJCh2YWx1ZSkuaXMoXCI6Y2hlY2tlZFwiKSAmJiAhJCh2YWx1ZSkuaGFzQ2xhc3MoXCJtYXN0ZXItY2hlY2tib3hcIikpIHtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9ICQodmFsdWUpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSBcIixcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKGVtYWlsQnV0dG9uc2VsZWN0b3IpLnByb3AoJ2hyZWYnLCBlbWFpbFN0cmluZyk7XHJcblx0XHR9O1xyXG5cdFx0c2V0VGltZW91dChzZWxlY3QoJCh0aGlzKSksIDIwMDApO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmVtYWlsLXNlbGVjdGVkXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicgfHwgJCh0aGlzKS5wcm9wKCdocmVmJykgPT09IG51bGwpe1xyXG5cdFx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5leHRlcm5hbC1saW5rXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHRcdHZhciBlbGVtVG9SZXBsYWNlID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8tcmVwbGFjZS13aXRoLWxvYWRlci1zZWxlY3RvcicpKTtcclxuXHJcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRlbGVtVG9IaWRlU2VsZWN0b3IuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudC1yZXBsYWNlZC1jb250YWluZXJcIiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHJcblx0XHQkKCcjY29udGVudC1yZXBsYWNlZC1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIiNzaGFyZS1wcm9qZWN0LWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5zaGFyZV9uYW1lKXtcclxuXHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJ3N1Y2Nlc3MnLCAnWW91ciBuYW1lIGlzIGJlaW5nIHNoYXJlZCB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCcnLCAnWW91IGFyZSBubyBsb25nZXIgc2hhcmluZyB5b3VyIG5hbWUgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JCgnI3NoYXJlX25hbWUnKS5wcm9wKCdjaGVja2VkJywgcmVzcG9uc2Uuc2hhcmVfbmFtZSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JChcIiNsb2dpbkZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQoJy5oZWxwLWJsb2NrJywgJyNsb2dpbkZvcm0nKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuaGlkZSgpO1xyXG5cdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblxyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdFx0JCgnI2xvZ2luLXVzZXJuYW1lJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykudGV4dChkYXRhW1wicmVzcG9uc2VKU09OXCJdW1wiZXJyb3JzXCJdW1widXNlcm5hbWVcIl1bMF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnI25ldy10b3BpYy1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0XHRzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN1Ym1pdEJ1dHRvbikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0Y29udGV4dDogJCh0aGlzKSxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucy5jcmVhdGVFZGl0VG9waWNET00oZGF0YVtcImlkXCJdLCBkYXRhW1wibmFtZVwiXSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKS5odG1sKCdBZGQnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBORVcgVVNFUlxyXG5cdC8vIHB1dCB0aGlzIHN0dWZmIGluIGFuIGFycmF5XHJcblx0Ly8gJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHQvLyAkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cclxuXHQvLyAkKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdC8vIFx0aWYoJCgnLm5ldy11c2VyLXN0dWRlbnQnKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdC8vIFx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdC8vIFx0fSBlbHNlIHtcclxuXHQvLyBcdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHQvLyBcdH1cclxuXHQvLyBcdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0Ly8gXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0Ly8gXHR9IGVsc2Uge1xyXG5cdC8vIFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH0pO1xyXG5cclxuXHQkKFwiLmZhdm91cml0ZS1jb250YWluZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc3ZnQ29udGFpbmVyID0gJCh0aGlzKTtcclxuXHRcdHZhciBzdmcgPSBzdmdDb250YWluZXIuZmluZCgnc3ZnJyk7XHJcblxyXG5cdFx0aWYod2luZG93Wydwcm9qZWN0J10gIT0gbnVsbCl7XHJcblx0XHRcdHZhciBwcm9qZWN0SWQgPSB3aW5kb3dbJ3Byb2plY3QnXS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcHJvamVjdElkID0gJCh0aGlzKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3ZnLmhpZGUoMCk7XHJcblx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5zaG93KDApO1xyXG5cclxuXHRcdGlmKHN2Zy5oYXNDbGFzcygnZmF2b3VyaXRlJykpe1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ3JlbW92ZSc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9yZW1vdmUtZmF2b3VyaXRlJztcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ2FkZCc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9hZGQtZmF2b3VyaXRlJztcclxuXHRcdH1cclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoYWN0aW9uID09IFwiYWRkXCIpe1xyXG5cdFx0XHRcdFx0c3ZnLmFkZENsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3ZnLnJlbW92ZUNsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdHN2Zy5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0KTtcclxuXHRcdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCduYXYubW9iaWxlIC5zdWItZHJvcGRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGRyb3Bkb3duID0gJCh0aGlzKTtcclxuXHRcdHZhciBjb250ZW50ID0gZHJvcGRvd24uZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKTtcclxuXHJcblx0XHRpZihkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiKSA9PSBcInRydWVcIil7XHJcblx0XHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcclxuXHRcdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMGRlZylcIik7XHJcblx0XHRcdGRyb3Bkb3duLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRjb250ZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5tZWRpdW0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIGZhbHNlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigxODBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5zaG93KGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cdC8vIEhUTUwgRURJVE9SXHJcblx0JCgnLmh0bWwtZWRpdG9yJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpe1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAnL3NuaXBwZXQ/c25pcHBldD1odG1sLWVkaXRvci10b29sYmFyJyxcclxuXHRcdFx0dHlwZTonR0VUJyxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXN1bHQpe1xyXG5cdFx0XHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5hZnRlcihyZXN1bHQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvbnNIdG1sID0gXCI8ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgZmxleCc+PGJ1dHRvbiBjbGFzcz0naHRtbCcgdHlwZT0nYnV0dG9uJz5IVE1MPC9idXR0b24+PGJ1dHRvbiBjbGFzcz0ncHJldmlldycgdHlwZT0nYnV0dG9uJz5QUkVWSUVXPC9idXR0b24+PC9kaXY+XCI7XHJcblx0XHR2YXIgcHJldmlld0h0bWwgPSBcIjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcic+PGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXByZXZpZXcnPjwvZGl2PjwvZGl2PlwiO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5iZWZvcmUoYnV0dG9uc0h0bWwpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yJykuYWZ0ZXIocHJldmlld0h0bWwpO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXcnKS5odG1sKCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldycpLmh0bWwoJCh0aGlzKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLmh0bWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLnByZXZpZXcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5zaG93KCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFRvZ2dsZSBsYWJlbCBmbGlwcyB0b2dnbGVcclxuXHQkKFwiLmh0bWwtZWRpdG9yXCIpLm9uKFwiY2xpY2tcIiwgXCIuaHRtbC1lZGl0b3ItLXRvb2xiYXIgbGkgYnV0dG9uXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRzd2l0Y2goJCh0aGlzKS5kYXRhKCd0eXBlJykpe1xyXG5cdFx0XHRjYXNlIFwibGluZWJyZWFrXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxicj4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJvbFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48b2w+XFxuXFx0PGxpPkl0ZW0gMTwvbGk+XFxuXFx0PGxpPkl0ZW0gMjwvbGk+XFxuXFx0PGxpPkl0ZW0gMzwvbGk+XFxuPC9vbD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ1bFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48dWw+XFxuXFx0PGxpPkl0ZW0geDwvbGk+XFxuXFx0PGxpPkl0ZW0geTwvbGk+XFxuXFx0PGxpPkl0ZW0gejwvbGk+XFxuPC91bD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJib2xkXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnYicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInR0XCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndHQnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpdGFsaWNcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdpJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidW5kZXJsaW5lXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImltZ1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBpbWFnZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0QWx0ID0gcHJvbXB0KFwiRW50ZXIgYWx0IHRleHRcIiwgXCJJbWFnZSBvZiBTdXNzZXggY2FtcHVzXCIpO1xyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8aW1nIGFsdD1cIicgKyBpbnB1dEFsdCArICdcIiBzcmM9XCInICsgaW5wdXRVcmwgKyAnXCI+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwibGlua1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0VGV4dCA9IHByb21wdChcIkVudGVyIGRpc3BsYXkgdGV4dFwiLCBcIlN1c3NleFwiKTtcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGEgaHJlZj1cIicgKyBpbnB1dFVybCArICdcIj4nICsgaW5wdXRUZXh0ICsgJzwvYT4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJjb2RlXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnY29kZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInByZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3ByZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImluZm9cIjpcclxuXHRcdFx0XHQkLmRpYWxvZyh7XHJcblx0XHRcdFx0XHR0aGVtZTogJ21hdGVyaWFsJyxcclxuXHRcdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0hUTUwgRWRpdG9yIEluZm8nLFxyXG5cdFx0XHRcdFx0Y29udGVudDogJ0FsbCBsaW5rcyB5b3UgYWRkIHdpbGwgb3BlbiBpbiBhIG5ldyB0YWIuIEFsbCBIVE1MIDUgZWxlbWVudHMgYXJlIHZhbGlkIGZvciB0aGUgZGVzY3JpcHRpb24gZmllbGQsIGV4Y2x1ZGluZzsgPGJyPjxicj4gPHVsPjxsaT5TY3JpcHQgdGFnczwvbGk+PGxpPkhlYWRpbmcgdGFnczwvbGk+PGxpPkhUTUwgcm9vdCB0YWdzPC9saT48bGk+Qm9keSB0YWdzPC9saT48L3VsPicsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHQkKCcuc3R1ZGVudC11bmRvLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBjYXJkID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHJcblx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogJ1VuZG8gUHJvamVjdCBTZWxlY3Rpb24nLFxyXG5cdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xMi41LDhDOS44NSw4IDcuNDUsOSA1LjYsMTAuNkwyLDdWMTZIMTFMNy4zOCwxMi4zOEM4Ljc3LDExLjIyIDEwLjU0LDEwLjUgMTIuNSwxMC41QzE2LjA0LDEwLjUgMTkuMDUsMTIuODEgMjAuMSwxNkwyMi40NywxNS4yMkMyMS4wOCwxMS4wMyAxNy4xNSw4IDEyLjUsOFpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGF1dG9DbG9zZTogJ2NhbmNlbHwxMDAwMCcsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gdW4tc2VsZWN0IHlvdXIgc2VsZWN0ZWQgcHJvamVjdD88L2I+JyxcclxuXHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdGJ0bkNsYXNzOiAnYnRuLXJlZCcsXHJcblx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdHVybDogJy9zdHVkZW50cy91bmRvLXNlbGVjdGVkLXByb2plY3QnLFxyXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYocmVzcG9uc2Uuc3VjY2Vzc2Z1bCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNhcmQuaGlkZSg0MDAsIGZ1bmN0aW9uKCkgeyBjYXJkLnJlbW92ZSgpOyB9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignc3VjY2VzcycsICdVbmRvIHN1Y2Nlc3NmdWwuJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IHt9LFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09XHJcblx0XHQ5LiBJbml0aWFsaXNlXHJcblx0ICAgPT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8vIFVzZWQgYXMgYW4gZWFzeSB3YXkgZm9yIGZ1bmN0aW9ucyB0byBnZXQgY3VycmVudCBwcm9qZWN0IGRhdGFcclxuXHRpZigkKCcucHJvamVjdC1jYXJkJykubGVuZ3RoID4gMCl7XHJcblx0XHR3aW5kb3dbJ3Byb2plY3QnXSA9ICQoJy5wcm9qZWN0LWNhcmQnKTtcclxuXHR9XHJcblxyXG5cdCQoJy5hbmltYXRlLWNhcmRzIC5jYXJkJykuY3NzKFwib3BhY2l0eVwiLCAwKTtcclxuXHJcblx0dmFyIGRlbGF5ID0gMDtcclxuXHQkKCcuYW5pbWF0ZS1jYXJkcyAuY2FyZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRkZWxheSArPSAyMDA7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJzbGlkZUluVXAgYW5pbWF0ZWRcIik7XHJcblxyXG5cdFx0XHQkKHRoaXMpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdG9wYWNpdHk6IDFcclxuXHRcdFx0fSwgODAwKTtcclxuXHJcblx0XHR9LmJpbmQodGhpcyksIGRlbGF5KTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5hamF4RXJyb3IoZnVuY3Rpb24oIGV2ZW50LCByZXF1ZXN0LCBzZXR0aW5ncyApIHtcclxuXHRpZihjb25maWcuc2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbil7XHJcblx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoYXQgcmVxdWVzdC4nKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4qL1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgRklMRSBTVFJVQ1RVUkVcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufFx0MS4gTW9iaWxlIE1lbnVcclxufFx0Mi4gRGlhbG9nIC8gTW9kYWxcclxufFx0My4gRGF0YSBUYWJsZVxyXG58XHQ0LiBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcbnxcdDUuIEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxufFx0Ni4gRWRpdCBUb3BpY3MgW0FkbWluXVxyXG58XHQ3LiBNZW51XHJcbnxcclxuKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHQvKiA9PT09PT09PT09PT09PT09PT1cclxuXHRcdCAxLiBNb2JpbGUgTWVudVxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHRcdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIG1vYmlsZSBtZW51LlxyXG5cdFx0KlxyXG5cdFx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBNb2JpbGVNZW51ID0gIGZ1bmN0aW9uIE1vYmlsZU1lbnUoZWxlbWVudCkge1xyXG5cdFx0aWYod2luZG93WydNb2JpbGVNZW51J10gPT0gbnVsbCl7XHJcblx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddID0gdGhpcztcclxuXHRcdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdFx0dGhpcy5hY3RpdmF0b3IgPSAkKHRoaXMuU2VsZWN0b3JzXy5IQU1CVVJHRVJfQ09OVEFJTkVSKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheSA9ICQodGhpcy5TZWxlY3RvcnNfLlVOREVSTEFZKTtcclxuXHRcdFx0dGhpcy5pbml0KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlRoZXJlIGNhbiBvbmx5IGJlIG9uZSBtb2JpbGUgbWVudS5cIik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZSdcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0TU9CSUxFX01FTlU6ICduYXYubW9iaWxlJyxcclxuXHRcdEhBTUJVUkdFUl9DT05UQUlORVI6ICcuaGFtYnVyZ2VyLWNvbnRhaW5lcicsXHJcblx0XHRVTkRFUkxBWTogJy5tb2JpbGUtbmF2LXVuZGVybGF5J1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0XHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmNsb3NlTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG1vYmlsZU1lbnUgPSB0aGlzO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3Iub24oJ2NsaWNrJywgbW9iaWxlTWVudS5vcGVuTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHRcdHRoaXMudW5kZXJsYXkub24oJ2NsaWNrJywgbW9iaWxlTWVudS5jbG9zZU1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLk1PQklMRV9NRU5VKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLm1vYmlsZU1lbnUgPSBuZXcgTW9iaWxlTWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09XHJcblx0XHQyLiBEaWFsb2cgLyBNb2RhbFxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09ICovXHJcblx0dmFyIERpYWxvZyA9IGZ1bmN0aW9uIERpYWxvZyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5kaWFsb2dOYW1lID0gJChlbGVtZW50KS5kYXRhKCdkaWFsb2cnKTtcclxuXHRcdHRoaXMudW5kZXJsYXkgPSAkKCcudW5kZXJsYXknKTtcclxuXHRcdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHRcdHRoaXMuY29udGVudCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0NPTlRFTlQpO1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIENvbXBvbmVudFxyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwicmVnaXN0ZXJlZFwiKTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcInJvbGVcIiwgXCJkaWFsb2dcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtbGFiZWxsZWRieVwiLCBcImRpYWxvZy10aXRsZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImRpYWxvZy1kZXNjXCIpO1xyXG5cdFx0dGhpcy5oZWFkZXIuYXR0cigndGl0bGUnLCB0aGlzLmhlYWRlci5maW5kKCcjZGlhbG9nLWRlc2MnKS5odG1sKCkpO1xyXG5cclxuXHRcdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0XHR0aGlzLmxvYWRlciA9ICQoZWxlbWVudCkuZmluZChcIi5sb2FkZXJcIik7XHJcblx0XHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0QUNUSVZFOiAnYWN0aXZlJyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRcdERJQUxPR19IRUFERVI6ICcuaGVhZGVyJyxcclxuXHRcdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0xvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdFx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuc2hvdygwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHdpbmRvd1snRGlhbG9nJ10gPSB0aGlzO1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlRGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdC8vIE5lZWRlZCBmb3IgY29udGV4dFxyXG5cdFx0dmFyIGRpYWxvZyA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0XHQkKCdidXR0b24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ2FjdGl2YXRvcicpICYmICQodGhpcykuZGF0YSgnZGlhbG9nJykgPT0gZGlhbG9nLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFSSUFcclxuXHRcdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRkaWFsb2cudW5kZXJsYXkub24oJ2NsaWNrJywgZGlhbG9nLmhpZGVEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHJcblx0XHR0cnl7XHJcblx0XHRcdCQoZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBkaWFsb2cuc2hvd0RpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2goZXJyKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkRpYWxvZyBcIiArIGRpYWxvZy5kaWFsb2dOYW1lICsgXCIgaGFzIG5vIGFjdGl2YXRvciBidXR0b24uXCIpO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkRJQUxPRykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5kaWFsb2cgPSBuZXcgRGlhbG9nKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydEaWFsb2cnXS5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0My4gRGF0YSBUYWJsZVxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLmZvb3RSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Zm9vdCB0cicpO1xyXG5cdFx0dGhpcy5yb3dzID0gJC5tZXJnZSh0aGlzLmJvZHlSb3dzLCB0aGlzLmZvb3RSb3dzKTtcclxuXHRcdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdFx0dGhpcy5tYXN0ZXJDaGVja2JveCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uTUFTVEVSX0NIRUNLQk9YKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snRGF0YVRhYmxlJ10gPSBEYXRhVGFibGU7XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICcuZGF0YS10YWJsZScsXHJcblx0XHRNQVNURVJfQ0hFQ0tCT1g6ICd0aGVhZCAubWFzdGVyLWNoZWNrYm94JyxcclxuXHRcdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRcdElTX1NFTEVDVEVEOiAnLmlzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0c2VsZWN0QWxsUm93czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKHRoaXMubWFzdGVyQ2hlY2tib3guaXMoJzpjaGVja2VkJykpe1xyXG5cdFx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHNlbGVjdFJvdzogZnVuY3Rpb24gKGNoZWNrYm94LCByb3cpIHtcclxuXHRcdFx0aWYgKHJvdykge1xyXG5cdFx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdFx0cm93LmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBkYXRhVGFibGUgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3gub24oJ2NoYW5nZScsICQucHJveHkodGhpcy5mdW5jdGlvbnMuc2VsZWN0QWxsUm93cywgZGF0YVRhYmxlKSk7XHJcblxyXG5cdFx0JCh0aGlzLmNoZWNrYm94ZXMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0XHQkKHRoaXMpLm9uKCdjaGFuZ2UnLCAkLnByb3h5KGRhdGFUYWJsZS5mdW5jdGlvbnMuc2VsZWN0Um93LCB0aGlzLCAkKHRoaXMpLCBkYXRhVGFibGUuYm9keVJvd3MuZXEoaSkpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkRBVEFfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZGF0YVRhYmxlID0gbmV3IERhdGFUYWJsZSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0NC4gQ29sdW1uIFRvZ2dsZSBUYWJsZVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBDb2x1bW5Ub2dnbGVUYWJsZSA9IGZ1bmN0aW9uIENvbHVtblRvZ2dsZVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWQgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyJyk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0NvbHVtblRvZ2dsZVRhYmxlJ10gPSBDb2x1bW5Ub2dnbGVUYWJsZTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdFRPR0dMRV9UQUJMRTogJy50YWJsZS1jb2x1bW4tdG9nZ2xlJ1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdFx0Q09MVU1OX1NFTEVDVE9SX0JVVFRPTjogJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgZG90LW1lbnVfX2FjdGl2YXRvclwiIHN0eWxlPVwiZGlzcGxheTpibG9jazttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWxlZnQ6YXV0bztcIj5Db2x1bW5zPC9idXR0b24+JyxcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9NRU5VOiAnPHVsIGNsYXNzPVwiZG90LW1lbnUgZG90LW1lbnUtLWJvdHRvbS1sZWZ0XCI+PC91bD4nXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHJcblx0XHR0b2dnbGVDb2x1bW46IGZ1bmN0aW9uKGNvbHVtbkluZGV4LCB0YWJsZSwgY2hlY2tlZCkge1xyXG5cdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuYXR0cignaGlkZGVuJywgXCJ0cnVlXCIpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaDogZnVuY3Rpb24odGFibGUpIHtcclxuXHRcdFx0dmFyIGhpZGVJbmRpY2VzID0gW107XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cyA9IHRhYmxlLmVsZW1lbnQuZmluZCgndGJvZHkgdHInKTtcclxuXHJcblx0XHRcdHRhYmxlLmhlYWRlcnMuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKCQodGhpcykuYXR0cignaGlkZGVuJykpe1xyXG5cdFx0XHRcdFx0aGlkZUluZGljZXMucHVzaCgkKHRoaXMpLmluZGV4KCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoaWRlSW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGhpZGVJbmRpY2VzW2ldKS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaEFsbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMucmVmcmVzaCh0aGlzLkNvbHVtblRvZ2dsZVRhYmxlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmKCF0aGlzLmVsZW1lbnQuYXR0cignaWQnKSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiQ29sdW1uVG9nZ2xlVGFibGUgcmVxdWlyZXMgdGhlIHRhYmxlIHRvIGhhdmUgYW4gdW5pcXVlIElELlwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0b2dnbGVUYWJsZSA9IHRoaXM7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JCdXR0b24gPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfQlVUVE9OKTtcclxuXHRcdHZhciBjb2x1bW5TZWxlY3Rvck1lbnUgPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfTUVOVSk7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgPSAnQ29sdW1uVG9nZ2xlVGFibGUtJyArIHRvZ2dsZVRhYmxlLmVsZW1lbnQuYXR0cignaWQnKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuYmVmb3JlKGNvbHVtblNlbGVjdG9yQnV0dG9uKTtcclxuXHJcblx0XHRjb2x1bW5TZWxlY3RvckJ1dHRvbi5hZnRlcihjb2x1bW5TZWxlY3Rvck1lbnUpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCk7XHJcblx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCArICctbWVudScpO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBjb2x1bW5TZWxlY3RvckJ1dHRvbjtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gY29sdW1uU2VsZWN0b3JNZW51O1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51LmZpbmQoJ3VsJykuZGF0YShcInRhYmxlXCIsIHRvZ2dsZVRhYmxlLmVsZW1lbnQuYXR0cignaWQnKSk7XHJcblxyXG5cdFx0dGhpcy5oZWFkZXJzLmVhY2goZnVuY3Rpb24gKCl7XHJcblx0XHRcdHZhciBjaGVja2VkID0gJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSA/IFwiY2hlY2tlZFwiIDogXCJcIjtcclxuXHRcdFx0JCh0aGlzKS5kYXRhKCd2aXNpYmxlJywgJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSk7XHJcblxyXG5cdFx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXBwZW5kKCdcXFxyXG5cdFx0XHRcdDxsaSBjbGFzcz1cImRvdC1tZW51X19pdGVtIGRvdC1tZW51X19pdGVtLS1wYWRkZWRcIj4gXFxcclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjaGVja2JveFwiPiBcXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJjb2x1bW4tdG9nZ2xlXCIgaWQ9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiIHR5cGU9XCJjaGVja2JveFwiICcrIGNoZWNrZWQgKyc+IFxcXHJcblx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiPicgKyAkKHRoaXMpLnRleHQoKSArICc8L2xhYmVsPiBcXFxyXG5cdFx0XHRcdFx0PC9kaXY+IFxcXHJcblx0XHRcdFx0PC9saT4nKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCJib2R5XCIpLm9uKFwiY2hhbmdlXCIsIFwiLmNvbHVtbi10b2dnbGVcIiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCgnLmNvbHVtbi10b2dnbGUnKS5pbmRleCh0aGlzKTtcclxuXHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy50b2dnbGVDb2x1bW4oaW5kZXgsIHRvZ2dsZVRhYmxlLCAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSA9IG5ldyBDb2x1bW5Ub2dnbGVUYWJsZSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQWpheEZ1bmN0aW9ucyA9ICBmdW5jdGlvbiBBamF4RnVuY3Rpb25zKCkge307XHJcblx0d2luZG93WydBamF4RnVuY3Rpb25zJ10gPSBBamF4RnVuY3Rpb25zO1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdFNFQVJDSF9JTlBVVDogJy5zZWFyY2gtaW5wdXQnLFxyXG5cdFx0U0VBUkNIX0NPTlRBSU5FUjogJy5zZWFyY2gtY29udGFpbmVyJyxcclxuXHRcdFNFQVJDSF9GSUxURVJfQ09OVEFJTkVSOiAnLnNlYXJjaC1maWx0ZXItY29udGFpbmVyJyxcclxuXHRcdFNFQVJDSF9GSUxURVJfQlVUVE9OOiAnI3NlYXJjaC1maWx0ZXItYnV0dG9uJyxcclxuXHRcdExPR19JTl9ESUFMT0c6ICcubG9naW4uZGlhbG9nJyxcclxuXHR9O1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5LZXlzXyA9IHtcclxuXHRcdFNQQUNFOiAzMixcclxuXHRcdEVOVEVSOiAxMyxcclxuXHRcdENPTU1BOiA0NVxyXG5cdH07XHJcblxyXG5cdC8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXNcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXMnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy1mb2N1cycpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzIG91dFxyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1c291dCcsICBmdW5jdGlvbihlKXtcclxuXHRcdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LTJkcCcpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBTRUFSQ0hcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9CVVRUT04pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9ICQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0NPTlRBSU5FUik7XHJcblx0XHR2YXIgZmlsdGVyQnV0dG9uID0gJCh0aGlzKTtcclxuXHJcblx0XHRpZihjb250YWluZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0Y29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLmJsdXIoKTtcclxuXHRcdH0gZWxzZXtcclxuXHRcdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEVkaXRUb3BpYyA9IGZ1bmN0aW9uIEVkaXRUb3BpYyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5vcmlnaW5hbE5hbWUgPSAkKGVsZW1lbnQpLmRhdGEoXCJvcmlnaW5hbC10b3BpYy1uYW1lXCIpO1xyXG5cdFx0dGhpcy50b3BpY0lkID0gJChlbGVtZW50KS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdFx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmVkaXQtdG9waWMnKTtcclxuXHRcdHRoaXMuZGVsZXRlQnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZGVsZXRlLXRvcGljJyk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0VkaXRUb3BpYyddID0gRWRpdFRvcGljO1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRFRElUX1RPUElDOiAnLmVkaXQtdG9waWMtbGlzdCAudG9waWMnLFxyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRERUxFVEVfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRQQVRDSF9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRcdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0aWYodG9waWMub3JpZ2luYWxOYW1lID09IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0NoYW5nZSBUb3BpYyBOYW1lJyxcclxuXHRcdFx0XHR0eXBlOiAnYmx1ZScsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gPGI+XCInICsgIHRvcGljLm9yaWdpbmFsTmFtZSArICdcIjwvYj4gdG8gPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsnXCI8L2I+PycsXHJcblx0XHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ibHVlJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdFx0JCgnLmxvYWRlcicsIHRvcGljLmVsZW1lbnQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX25hbWUgOiB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMub3JpZ2luYWxOYW1lID0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjYW5jZWw6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHRcdHRpdGxlOiAnRGVsZXRlJyxcclxuXHRcdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsgJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGRlbGV0ZToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLmVsZW1lbnQuaGlkZShjb25maWcuYW5pbXRpb25zLnNsb3csIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNyZWF0ZUVkaXRUb3BpY0RPTTogZnVuY3Rpb24odG9waWNJZCwgb3JpZ2luYWxOYW1lKXtcclxuXHRcdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZWRpdFRvcGljID0gdGhpcztcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmRlbGV0ZVRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5FRElUX1RPUElDKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkVkaXRUb3BpYyA9IG5ldyBFZGl0VG9waWModGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgICA3IERvdE1lbnVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRG90TWVudSA9IGZ1bmN0aW9uIE1lbnUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5idXR0b24gPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5tZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSBmYWxzZTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRET1RfTUVOVTogJy5kb3QtbWVudScsXHJcblx0XHRBQ1RJVkFUT1I6ICcuZG90LW1lbnVfX2FjdGl2YXRvcicsXHJcblx0XHRJU19WSVNJQkxFOiAnLmlzLXZpc2libGUnLFxyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnLFxyXG5cdFx0Qk9UVE9NX0xFRlQ6ICdkb3QtbWVudS0tYm90dG9tLWxlZnQnLFxyXG5cdFx0Qk9UVE9NX1JJR0hUOiAnZG90LW1lbnUtLWJvdHRvbS1yaWdodCcsXHJcblx0XHRUT1BfTEVGVDogJ2RvdC1tZW51LS10b3AtbGVmdCcsXHJcblx0XHRUT1BfUklHSFQ6ICdkb3QtbWVudS0tdG9wLXJpZ2h0JyxcclxuXHRcdFRBQkxFX0RPVF9NRU5VOiAnZG90LW1lbnUtLXRhYmxlJ1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYnV0dG9uUmVjdCA9IHRoaXMuYnV0dG9uWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9MRUZUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AgcmlnaHQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fUklHSFQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AgbGVmdCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9MRUZUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QucmlnaHQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAnYm90dG9tIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAnYm90dG9tIGxlZnQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpe1xyXG5cdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQodGhpcykoKTtcclxuXHRcdHRoaXMubWVudS5hZGRDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHRcdHRoaXMubWVudS5zaG93KCk7XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubWVudS5yZW1vdmVDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHRcdHRoaXMubWVudS5oaWRlKCk7XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKHRoaXMpKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS5zaG93LmJpbmQodGhpcykoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZG90TWVudSA9IHRoaXM7XHJcblx0XHR2YXIgbWVudUlkID0gJCh0aGlzLmJ1dHRvbikuYXR0cignaWQnKSArICctbWVudSc7XHJcblxyXG5cdFx0dGhpcy5tZW51ID0gJCgnIycgKyBtZW51SWQpO1xyXG5cdFx0dGhpcy5pc1RhYmxlRG90TWVudSA9IHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5UQUJMRV9ET1RfTUVOVSk7XHJcblxyXG5cdFx0dGhpcy5idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS50b2dnbGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0aWYoIXRhcmdldC5pcyhkb3RNZW51Lm1lbnUpIHx8ICF0YXJnZXQuaXMoZG90TWVudS5idXR0b24pKSB7XHJcblx0XHRcdFx0aWYoISQuY29udGFpbnMoJChkb3RNZW51Lm1lbnUpWzBdLCBlLnRhcmdldCkpe1xyXG5cdFx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5BQ1RJVkFUT1IpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuRG90TWVudSA9IG5ldyBEb3RNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQ1LiBTZWNvbmQgTWFya2VyXHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdHZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0XHRpZigkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKS5sZW5ndGggPCAxIHx8ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpLmxlbmd0aCA8IDEpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0XHR0aGlzLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0XHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdFx0dGhpcy5zdHVkZW50RGF0YVRhYmxlID0gdGhpcy5zdHVkZW50VGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdFx0dGhpcy5zdXBlcnZpc29yVGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRBU1NJR05fTUFSS0VSOiAnL2FkbWluL21hcmtlci1hc3NpZ24nLFxyXG5cdH07XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCA9IGZ1bmN0aW9uKHN0dWRlbnRSb3dET00sIG1hcmtlcil7XHJcblx0XHR2YXIgcm93ID0gJChzdHVkZW50Um93RE9NKTtcclxuXHJcblx0XHRtYXJrZXIudW5zZWxlY3RBbGwobWFya2VyKTtcclxuXHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9ICQocm93KTtcclxuXHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ21hcmtlci1pZCcpID09IHJvdy5kYXRhKCdzdXBlcnZpc29yLWlkJykpe1xyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvciA9IGZ1bmN0aW9uKHN1cGVydmlzb3JSb3dET00sIG1hcmtlcil7XHJcblx0XHR2YXIgcm93ID0gJChzdXBlcnZpc29yUm93RE9NKTtcclxuXHJcblx0XHRpZihyb3cuYXR0cignZGlzYWJsZWQnKSl7cmV0dXJuO31cclxuXHJcblx0XHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ICE9IG51bGwpe1xyXG5cdFx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IHJvdztcclxuXHRcdFx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nKFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdXBlcnZpc29yLW5hbWUnKSxcclxuXHRcdFx0XHRyb3cuZGF0YSgnbWFya2VyLW5hbWUnKSxcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnJlc2V0VmlldyA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oc3R1ZGVudE5hbWUsIHN1cGVydmlzb3JOYW1lLCBtYXJrZXJOYW1lLCBwcm9qZWN0KXtcclxuXHRcdCQoXCIjc3R1ZGVudC1uYW1lXCIpLnRleHQoc3R1ZGVudE5hbWUpO1xyXG5cdFx0JChcIiNzdXBlcnZpc29yLW5hbWVcIikudGV4dChzdXBlcnZpc29yTmFtZSk7XHJcblx0XHQkKFwiI21hcmtlci1uYW1lXCIpLnRleHQobWFya2VyTmFtZSk7XHJcblxyXG5cdFx0JChcIiNwcm9qZWN0LXRpdGxlXCIpLmh0bWwoJzxiPlRpdGxlOiA8L2I+JyArIHByb2plY3RbJ3RpdGxlJ10pO1xyXG5cdFx0JChcIiNwcm9qZWN0LWRlc2NyaXB0aW9uXCIpLmh0bWwoJzxiPkRlc2NyaXB0aW9uOiA8L2I+JyArIHByb2plY3RbJ2Rlc2NyaXB0aW9uJ10pO1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdH1cclxuXHJcblx0JCgnI3N1Ym1pdEFzc2lnbk1hcmtlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbWFya2VyID0gd2luZG93WydNYXJrZXInXTtcclxuXHJcblx0XHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9PSBudWxsKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH07XHJcblxyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdFx0dmFyIHByb2plY3RJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpWydpZCddO1xyXG5cdFx0dmFyIHN0dWRlbnRJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1pZCcpO1xyXG5cdFx0dmFyIG1hcmtlcklkID0gbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvci5kYXRhKCdtYXJrZXItaWQnKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHRcdHVybDogbWFya2VyLlVybHNfLkFTU0lHTl9NQVJLRVIsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWQsXHJcblx0XHRcdFx0c3R1ZGVudF9pZDogc3R1ZGVudElkLFxyXG5cdFx0XHRcdG1hcmtlcl9pZDogbWFya2VySWQsXHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQucmVtb3ZlKCk7XHJcblx0XHRcdG1hcmtlci5yZXNldFZpZXcobWFya2VyKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHRoaXM7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50KHRoaXMsIG1hcmtlcik7IH0pO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvcih0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR3aW5kb3dbJ01hcmtlciddID0gbmV3IE1hcmtlcigpO1xyXG5cdH1cclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMuanMiXSwic291cmNlUm9vdCI6IiJ9