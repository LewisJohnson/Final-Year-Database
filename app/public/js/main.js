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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTQ3MzdhZTRiNTM2NGJjZDRlM2YiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIm9uIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVxIiwiZGF0YSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpbmRleCIsInZhbHVlIiwiaXMiLCJwcm9wIiwic2V0VGltZW91dCIsImUiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInJlbW92ZUNsYXNzIiwiaGlkZSIsImFmdGVyIiwiY3NzIiwiYWpheCIsInVybCIsInR5cGUiLCJzZXJpYWxpemUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJzaGFyZV9uYW1lIiwic2hvd05vdGlmaWNhdGlvbiIsIkFqYXhGdW5jdGlvbnMiLCJwcm90b3R5cGUiLCJTZWxlY3RvcnNfIiwiTE9HX0lOX0RJQUxPRyIsImRpYWxvZyIsInNob3dMb2FkZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhpZGVMb2FkZXIiLCJzaG93IiwiYWRkQ2xhc3MiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiSlNPTiIsInBhcnNlIiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsInN2Z0NvbnRhaW5lciIsInN2ZyIsIndpbmRvdyIsInByb2plY3RJZCIsImFjdGlvbiIsImFqYXhVcmwiLCJwcm9qZWN0X2lkIiwiZHJvcGRvd24iLCJjb250ZW50IiwibWVkaXVtIiwicmVzdWx0IiwiYnV0dG9uc0h0bWwiLCJwcmV2aWV3SHRtbCIsImluc2VydEF0Q2FyZXQiLCJ3cmFwVGV4dFdpdGhUYWciLCJpbnB1dFVybCIsInByb21wdCIsImlucHV0QWx0IiwiaW5wdXRUZXh0IiwidGhlbWUiLCJlc2NhcGVLZXkiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsInRpdGxlIiwiY2FyZCIsInBhcmVudCIsImNvbmZpcm0iLCJpY29uIiwiYXV0b0Nsb3NlIiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwibWV0aG9kIiwic3VjY2Vzc2Z1bCIsInJlbW92ZSIsIm1lc3NhZ2UiLCJjYW5jZWwiLCJkZWxheSIsImFuaW1hdGUiLCJvcGFjaXR5IiwiYmluZCIsImRvY3VtZW50IiwiYWpheEVycm9yIiwiZXZlbnQiLCJyZXF1ZXN0Iiwic2V0dGluZ3MiLCJzaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uIiwiTW9iaWxlTWVudSIsImVsZW1lbnQiLCJhY3RpdmF0b3IiLCJIQU1CVVJHRVJfQ09OVEFJTkVSIiwidW5kZXJsYXkiLCJVTkRFUkxBWSIsImluaXQiLCJsb2ciLCJDc3NDbGFzc2VzXyIsIklTX1ZJU0lCTEUiLCJNT0JJTEVfTUVOVSIsIm9wZW5NZW51IiwiY2xvc2VNZW51IiwibW9iaWxlTWVudSIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiaGVhZGVyIiwiRElBTE9HX0hFQURFUiIsIkRJQUxPR19DT05URU5UIiwiSHRtbFNuaXBwZXRzXyIsIkxPQURFUiIsImxvYWRlciIsImlzQ2xvc2FibGUiLCJhY3RpdmF0b3JCdXR0b25zIiwiQUNUSVZFIiwiRElBTE9HIiwic2hvd0RpYWxvZyIsImhpZGVEaWFsb2ciLCJwdXNoIiwiZXJyIiwicmVhZHkiLCJrZXlkb3duIiwia2V5Q29kZSIsIkRhdGFUYWJsZSIsImJvZHlSb3dzIiwiZm9vdFJvd3MiLCJyb3dzIiwibWVyZ2UiLCJjaGVja2JveGVzIiwiQ0hFQ0tCT1giLCJtYXN0ZXJDaGVja2JveCIsIk1BU1RFUl9DSEVDS0JPWCIsIkRBVEFfVEFCTEUiLCJJU19TRUxFQ1RFRCIsInNlbGVjdEFsbFJvd3MiLCJzZWxlY3RSb3ciLCJjaGVja2JveCIsInJvdyIsImRhdGFUYWJsZSIsInByb3h5IiwiaSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJyZWZyZXNoQWxsIiwidG9nZ2xlVGFibGUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbiIsImNvbHVtblNlbGVjdG9yTWVudSIsImNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInJlbW92ZUFsbFNoYWRvd0NsYXNzZXMiLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJibHVyIiwib3JpZ2luYWxOYW1lIiwidG9waWNJZCIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwidG9waWMiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkZWxldGVUb3BpYyIsImRlbGV0ZSIsInNsb3ciLCJEb3RNZW51IiwiTWVudSIsImJ1dHRvbiIsIm1lbnUiLCJpc1RhYmxlRG90TWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIlRBQkxFX0RPVF9NRU5VIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImxlZnQiLCJwYXJzZUludCIsInRvcCIsInJpZ2h0IiwidG9nZ2xlIiwiZG90TWVudSIsIm1lbnVJZCIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNvbnRhaW5zIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0Iiwic3R1ZGVudElkIiwibWFya2VySWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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QUF3QixZQUFVO0FBQ2pDLE1BQUltSSxTQUFTLElBQWI7QUFDQXRRLElBQUVzUSxPQUFPTixnQkFBUCxDQUF3QmhHLFFBQTFCLEVBQW9DeEksRUFBcEMsQ0FBdUMsT0FBdkMsRUFBZ0QsWUFBVztBQUFFb08sVUFBT25NLFNBQVAsQ0FBaUIyTSxhQUFqQixDQUErQixJQUEvQixFQUFxQ0UsTUFBckM7QUFBK0MsR0FBNUc7QUFDQXRRLElBQUVzUSxPQUFPSixtQkFBUCxDQUEyQmxHLFFBQTdCLEVBQXVDeEksRUFBdkMsQ0FBMEMsT0FBMUMsRUFBbUQsWUFBVztBQUFFb08sVUFBT25NLFNBQVAsQ0FBaUIrTSxnQkFBakIsQ0FBa0MsSUFBbEMsRUFBd0NGLE1BQXhDO0FBQWtELEdBQWxIO0FBQ0EsRUFKRDs7QUFNQVYsUUFBT25NLFNBQVAsQ0FBaUJrRixPQUFqQixHQUEyQixZQUFVO0FBQ3BDMUQsU0FBTyxRQUFQLElBQW1CLElBQUkySyxNQUFKLEVBQW5CO0FBQ0EsRUFGRDs7QUFJQS9ILFlBQVdwRSxTQUFYLENBQXFCa0YsT0FBckI7QUFDQUMsUUFBT25GLFNBQVAsQ0FBaUJrRixPQUFqQjtBQUNBb0IsV0FBVXRHLFNBQVYsQ0FBb0JrRixPQUFwQjtBQUNBc0MsbUJBQWtCeEgsU0FBbEIsQ0FBNEJrRixPQUE1QjtBQUNBakUsV0FBVWpCLFNBQVYsQ0FBb0JrRixPQUFwQjtBQUNBaUgsUUFBT25NLFNBQVAsQ0FBaUJrRixPQUFqQjtBQUNBdUYsU0FBUXpLLFNBQVIsQ0FBa0JrRixPQUFsQjtBQUNBLENBbnlCQSxFIiwiZmlsZSI6IlxcanNcXG1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5NDczN2FlNGI1MzY0YmNkNGUzZiIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58ICBcdDEuIEFKQVggU2V0dXBcclxufFx0Mi4gSFRNTCBNb2RpZmljYXRpb25zXHJcbnxcdDMuIE90aGVyXHJcbnxcclxuKi9cclxuXHJcbmltcG9ydCAnLi4vanMvY29tcG9uZW50cyc7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuOyQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDEuIEFKQVggU2V0dXBcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0JC5hamF4U2V0dXAoe1xyXG5cdFx0aGVhZGVyczoge1xyXG5cdFx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKSxcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0aWYoJCgnLnNob3ctLXNjcm9sbC10by10b3AnKS5sZW5ndGggPiAwKXtcclxuXHRcdCQoJy5tYWluLWNvbnRlbnQnKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgYnV0dG9uLS1hY2NlbnQgc2Nyb2xsLXRvLXRvcFwiPlNjcm9sbCB0byBUb3A8L2J1dHRvbj4nKTtcclxuXHR9XHJcblxyXG5cdC8vIEFjY2Vzc2liaWxpdHlcclxuXHQkKCcuZHJvcGRvd24nKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblx0JCgnLmRyb3Bkb3duID4gYnV0dG9uJykuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcclxuXHQkKCcuZHJvcGRvd24gLmRyb3Bkb3duLWNvbnRlbnQgYScpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHJcblx0Ly8gTWFrZXMgcHJpbWFyeSB0b3BpYyBmaXJzdFxyXG5cdCQoJy50b3BpY3MtbGlzdCcpLnByZXBlbmQoJCgnLmZpcnN0JykpO1xyXG5cdCQoJy50b3BpY3MtbGlzdCAubG9hZGVyJykuZmFkZU91dCgwKTtcclxuXHQkKCcudG9waWNzLWxpc3QgbGknKS5maXJzdCgpLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIGZ1bmN0aW9uIHNob3dOZXh0VG9waWMoKSB7XHJcblx0XHQkKHRoaXMpLm5leHQoIFwiLnRvcGljcy1saXN0IGxpXCIgKS5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0LCBzaG93TmV4dFRvcGljKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLm9yZGVyLWxpc3QtanMnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGxpc3QgPSAkKHRoaXMpO1xyXG5cdFx0Ly8gc29ydFVub3JkZXJlZExpc3QobGlzdCk7XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnbGFzdC1uYW1lLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRMYXN0TmFtZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnYWxwaGEtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZEFscGhhSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCd0aXRsZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkVGl0bGVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQgMy4gT1RIRVJcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuZW1haWwtdGFibGUgLmNoZWNrYm94IGlucHV0XCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGVjdCA9IGZ1bmN0aW9uKGRvbSl7XHJcblx0XHRcdHZhciBzdGF0dXMgPSBkb20ucGFyZW50cygpLmVxKDQpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdFx0XHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHRcdFx0dmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmVtYWlsLXRhYmxlLicgKyBzdGF0dXMgKyAnIC5jaGVja2JveCBpbnB1dCc7XHJcblx0XHRcdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblxyXG5cdFx0XHQkKGNoZWNrYm94U2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRcdFx0aWYoJCh2YWx1ZSkuaXMoXCI6Y2hlY2tlZFwiKSAmJiAhJCh2YWx1ZSkuaGFzQ2xhc3MoXCJtYXN0ZXItY2hlY2tib3hcIikpIHtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9ICQodmFsdWUpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSBcIixcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKGVtYWlsQnV0dG9uc2VsZWN0b3IpLnByb3AoJ2hyZWYnLCBlbWFpbFN0cmluZyk7XHJcblx0XHR9O1xyXG5cdFx0c2V0VGltZW91dChzZWxlY3QoJCh0aGlzKSksIDIwMDApO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmVtYWlsLXNlbGVjdGVkXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicgfHwgJCh0aGlzKS5wcm9wKCdocmVmJykgPT09IG51bGwpe1xyXG5cdFx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5leHRlcm5hbC1saW5rXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHRcdHZhciBlbGVtVG9SZXBsYWNlID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8tcmVwbGFjZS13aXRoLWxvYWRlci1zZWxlY3RvcicpKTtcclxuXHJcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRlbGVtVG9IaWRlU2VsZWN0b3IuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudC1yZXBsYWNlZC1jb250YWluZXJcIiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHJcblx0XHQkKCcjY29udGVudC1yZXBsYWNlZC1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIiNzaGFyZS1wcm9qZWN0LWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5zaGFyZV9uYW1lKXtcclxuXHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJ3N1Y2Nlc3MnLCAnWW91ciBuYW1lIGlzIGJlaW5nIHNoYXJlZCB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCcnLCAnWW91IGFyZSBubyBsb25nZXIgc2hhcmluZyB5b3VyIG5hbWUgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JCgnI3NoYXJlX25hbWUnKS5wcm9wKCdjaGVja2VkJywgcmVzcG9uc2Uuc2hhcmVfbmFtZSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JChcIiNsb2dpbkZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQoJy5oZWxwLWJsb2NrJywgJyNsb2dpbkZvcm0nKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuaGlkZSgpO1xyXG5cdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblxyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5zaG93KCk7XHJcblx0XHRcdFx0JCgnI2xvZ2luLXVzZXJuYW1lJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykudGV4dChkYXRhW1wicmVzcG9uc2VKU09OXCJdW1wiZXJyb3JzXCJdW1widXNlcm5hbWVcIl1bMF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0JCgnI25ldy10b3BpYy1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgc3VibWl0QnV0dG9uID0gJCh0aGlzKS5maW5kKCc6c3VibWl0Jyk7XHJcblx0XHRzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN1Ym1pdEJ1dHRvbikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0Y29udGV4dDogJCh0aGlzKSxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucy5jcmVhdGVFZGl0VG9waWNET00oZGF0YVtcImlkXCJdLCBkYXRhW1wibmFtZVwiXSk7XHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKS5odG1sKCdBZGQnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBORVcgVVNFUlxyXG5cdC8vIHB1dCB0aGlzIHN0dWZmIGluIGFuIGFycmF5XHJcblx0Ly8gJCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHQvLyAkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cclxuXHQvLyAkKCcjY3JlYXRlLWZvcm0tYWNjZXNzLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdC8vIFx0aWYoJCgnLm5ldy11c2VyLXN0dWRlbnQnKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdC8vIFx0XHQkKCcjc3R1ZGVudC1mb3JtJykuc2hvdygpO1xyXG5cdC8vIFx0fSBlbHNlIHtcclxuXHQvLyBcdFx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHQvLyBcdH1cclxuXHQvLyBcdGlmKCQoJyNzdXBlcnZpc29yLW9wdGlvbicpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0Ly8gXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5zaG93KCk7XHJcblx0Ly8gXHR9IGVsc2Uge1xyXG5cdC8vIFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH0pO1xyXG5cclxuXHQkKFwiLmZhdm91cml0ZS1jb250YWluZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc3ZnQ29udGFpbmVyID0gJCh0aGlzKTtcclxuXHRcdHZhciBzdmcgPSBzdmdDb250YWluZXIuZmluZCgnc3ZnJyk7XHJcblxyXG5cdFx0aWYod2luZG93Wydwcm9qZWN0J10gIT0gbnVsbCl7XHJcblx0XHRcdHZhciBwcm9qZWN0SWQgPSB3aW5kb3dbJ3Byb2plY3QnXS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcHJvamVjdElkID0gJCh0aGlzKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3ZnLmhpZGUoMCk7XHJcblx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5zaG93KDApO1xyXG5cclxuXHRcdGlmKHN2Zy5oYXNDbGFzcygnZmF2b3VyaXRlJykpe1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ3JlbW92ZSc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9yZW1vdmUtZmF2b3VyaXRlJztcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ2FkZCc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9hZGQtZmF2b3VyaXRlJztcclxuXHRcdH1cclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoYWN0aW9uID09IFwiYWRkXCIpe1xyXG5cdFx0XHRcdFx0c3ZnLmFkZENsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3ZnLnJlbW92ZUNsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdHN2Zy5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0KTtcclxuXHRcdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCduYXYubW9iaWxlIC5zdWItZHJvcGRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGRyb3Bkb3duID0gJCh0aGlzKTtcclxuXHRcdHZhciBjb250ZW50ID0gZHJvcGRvd24uZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKTtcclxuXHJcblx0XHRpZihkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiKSA9PSBcInRydWVcIil7XHJcblx0XHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcclxuXHRcdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMGRlZylcIik7XHJcblx0XHRcdGRyb3Bkb3duLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRjb250ZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5tZWRpdW0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIGZhbHNlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigxODBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5zaG93KGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cdC8vIEhUTUwgRURJVE9SXHJcblx0JCgnLmh0bWwtZWRpdG9yJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpe1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAnL3NuaXBwZXQ/c25pcHBldD1odG1sLWVkaXRvci10b29sYmFyJyxcclxuXHRcdFx0dHlwZTonR0VUJyxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXN1bHQpe1xyXG5cdFx0XHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5hZnRlcihyZXN1bHQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvbnNIdG1sID0gXCI8ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgZmxleCc+PGJ1dHRvbiBjbGFzcz0naHRtbCcgdHlwZT0nYnV0dG9uJz5IVE1MPC9idXR0b24+PGJ1dHRvbiBjbGFzcz0ncHJldmlldycgdHlwZT0nYnV0dG9uJz5QUkVWSUVXPC9idXR0b24+PC9kaXY+XCI7XHJcblx0XHR2YXIgcHJldmlld0h0bWwgPSBcIjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcic+PGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXByZXZpZXcnPjwvZGl2PjwvZGl2PlwiO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5iZWZvcmUoYnV0dG9uc0h0bWwpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yJykuYWZ0ZXIocHJldmlld0h0bWwpO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXcnKS5odG1sKCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldycpLmh0bWwoJCh0aGlzKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLmh0bWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLnByZXZpZXcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5zaG93KCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFRvZ2dsZSBsYWJlbCBmbGlwcyB0b2dnbGVcclxuXHQkKFwiLmh0bWwtZWRpdG9yXCIpLm9uKFwiY2xpY2tcIiwgXCIuaHRtbC1lZGl0b3ItLXRvb2xiYXIgbGkgYnV0dG9uXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRzd2l0Y2goJCh0aGlzKS5kYXRhKCd0eXBlJykpe1xyXG5cdFx0XHRjYXNlIFwibGluZWJyZWFrXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxicj4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJvbFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48b2w+XFxuXFx0PGxpPkl0ZW0gMTwvbGk+XFxuXFx0PGxpPkl0ZW0gMjwvbGk+XFxuXFx0PGxpPkl0ZW0gMzwvbGk+XFxuPC9vbD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ1bFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48dWw+XFxuXFx0PGxpPkl0ZW0geDwvbGk+XFxuXFx0PGxpPkl0ZW0geTwvbGk+XFxuXFx0PGxpPkl0ZW0gejwvbGk+XFxuPC91bD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJib2xkXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnYicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInR0XCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndHQnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpdGFsaWNcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdpJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidW5kZXJsaW5lXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImltZ1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBpbWFnZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0QWx0ID0gcHJvbXB0KFwiRW50ZXIgYWx0IHRleHRcIiwgXCJJbWFnZSBvZiBTdXNzZXggY2FtcHVzXCIpO1xyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8aW1nIGFsdD1cIicgKyBpbnB1dEFsdCArICdcIiBzcmM9XCInICsgaW5wdXRVcmwgKyAnXCI+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwibGlua1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0VGV4dCA9IHByb21wdChcIkVudGVyIGRpc3BsYXkgdGV4dFwiLCBcIlN1c3NleFwiKTtcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGEgaHJlZj1cIicgKyBpbnB1dFVybCArICdcIj4nICsgaW5wdXRUZXh0ICsgJzwvYT4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJjb2RlXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnY29kZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInByZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3ByZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImluZm9cIjpcclxuXHRcdFx0XHQkLmRpYWxvZyh7XHJcblx0XHRcdFx0XHR0aGVtZTogJ21hdGVyaWFsJyxcclxuXHRcdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0hUTUwgRWRpdG9yIEluZm8nLFxyXG5cdFx0XHRcdFx0Y29udGVudDogJ0FsbCBsaW5rcyB5b3UgYWRkIHdpbGwgb3BlbiBpbiBhIG5ldyB0YWIuIEFsbCBIVE1MIDUgZWxlbWVudHMgYXJlIHZhbGlkIGZvciB0aGUgZGVzY3JpcHRpb24gZmllbGQsIGV4Y2x1ZGluZzsgPGJyPjxicj4gPHVsPjxsaT5TY3JpcHQgdGFnczwvbGk+PGxpPkhlYWRpbmcgdGFnczwvbGk+PGxpPkhUTUwgcm9vdCB0YWdzPC9saT48bGk+Qm9keSB0YWdzPC9saT48L3VsPicsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHQkKCcuc3R1ZGVudC11bmRvLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBjYXJkID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHJcblx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogJ1VuZG8gUHJvamVjdCBTZWxlY3Rpb24nLFxyXG5cdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xMi41LDhDOS44NSw4IDcuNDUsOSA1LjYsMTAuNkwyLDdWMTZIMTFMNy4zOCwxMi4zOEM4Ljc3LDExLjIyIDEwLjU0LDEwLjUgMTIuNSwxMC41QzE2LjA0LDEwLjUgMTkuMDUsMTIuODEgMjAuMSwxNkwyMi40NywxNS4yMkMyMS4wOCwxMS4wMyAxNy4xNSw4IDEyLjUsOFpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdGF1dG9DbG9zZTogJ2NhbmNlbHwxMDAwMCcsXHJcblx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gdW4tc2VsZWN0IHlvdXIgc2VsZWN0ZWQgcHJvamVjdD88L2I+JyxcclxuXHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdGJ0bkNsYXNzOiAnYnRuLXJlZCcsXHJcblx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdHVybDogJy9zdHVkZW50cy91bmRvLXNlbGVjdGVkLXByb2plY3QnLFxyXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYocmVzcG9uc2Uuc3VjY2Vzc2Z1bCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNhcmQuaGlkZSg0MDAsIGZ1bmN0aW9uKCkgeyBjYXJkLnJlbW92ZSgpOyB9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignc3VjY2VzcycsICdVbmRvIHN1Y2Nlc3NmdWwuJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IHt9LFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09XHJcblx0XHQ5LiBJbml0aWFsaXNlXHJcblx0ICAgPT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8vIFVzZWQgYXMgYW4gZWFzeSB3YXkgZm9yIGZ1bmN0aW9ucyB0byBnZXQgY3VycmVudCBwcm9qZWN0IGRhdGFcclxuXHRpZigkKCcucHJvamVjdC1jYXJkJykubGVuZ3RoID4gMCl7XHJcblx0XHR3aW5kb3dbJ3Byb2plY3QnXSA9ICQoJy5wcm9qZWN0LWNhcmQnKTtcclxuXHR9XHJcblxyXG5cdCQoJy5hbmltYXRlLWNhcmRzIC5jYXJkJykuY3NzKFwib3BhY2l0eVwiLCAwKTtcclxuXHJcblx0dmFyIGRlbGF5ID0gMDtcclxuXHQkKCcuYW5pbWF0ZS1jYXJkcyAuY2FyZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRkZWxheSArPSAyMDA7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJzbGlkZUluVXAgYW5pbWF0ZWRcIik7XHJcblxyXG5cdFx0XHQkKHRoaXMpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdG9wYWNpdHk6IDFcclxuXHRcdFx0fSwgODAwKTtcclxuXHJcblx0XHR9LmJpbmQodGhpcyksIGRlbGF5KTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5hamF4RXJyb3IoZnVuY3Rpb24oIGV2ZW50LCByZXF1ZXN0LCBzZXR0aW5ncyApIHtcclxuXHRpZihjb25maWcuc2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbil7XHJcblx0XHRzaG93Tm90aWZpY2F0aW9uKCdlcnJvcicsICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aXRoIHRoYXQgcmVxdWVzdC4nKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4qL1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgRklMRSBTVFJVQ1RVUkVcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufFx0MS4gTW9iaWxlIE1lbnVcclxufFx0Mi4gRGlhbG9nIC8gTW9kYWxcclxufFx0My4gRGF0YSBUYWJsZVxyXG58XHQ0LiBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcbnxcdDUuIEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxufFx0Ni4gRWRpdCBUb3BpY3MgW0FkbWluXVxyXG58XHQ3LiBNZW51XHJcbnxcclxuKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHQvKiA9PT09PT09PT09PT09PT09PT1cclxuXHRcdCAxLiBNb2JpbGUgTWVudVxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHRcdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIG1vYmlsZSBtZW51LlxyXG5cdFx0KlxyXG5cdFx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBNb2JpbGVNZW51ID0gIGZ1bmN0aW9uIE1vYmlsZU1lbnUoZWxlbWVudCkge1xyXG5cdFx0aWYod2luZG93WydNb2JpbGVNZW51J10gPT0gbnVsbCl7XHJcblx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddID0gdGhpcztcclxuXHRcdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdFx0dGhpcy5hY3RpdmF0b3IgPSAkKHRoaXMuU2VsZWN0b3JzXy5IQU1CVVJHRVJfQ09OVEFJTkVSKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheSA9ICQodGhpcy5TZWxlY3RvcnNfLlVOREVSTEFZKTtcclxuXHRcdFx0dGhpcy5pbml0KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlRoZXJlIGNhbiBvbmx5IGJlIG9uZSBtb2JpbGUgbWVudS5cIik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZSdcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0TU9CSUxFX01FTlU6ICduYXYubW9iaWxlJyxcclxuXHRcdEhBTUJVUkdFUl9DT05UQUlORVI6ICcuaGFtYnVyZ2VyLWNvbnRhaW5lcicsXHJcblx0XHRVTkRFUkxBWTogJy5tb2JpbGUtbmF2LXVuZGVybGF5J1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0XHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmNsb3NlTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG1vYmlsZU1lbnUgPSB0aGlzO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3Iub24oJ2NsaWNrJywgbW9iaWxlTWVudS5vcGVuTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHRcdHRoaXMudW5kZXJsYXkub24oJ2NsaWNrJywgbW9iaWxlTWVudS5jbG9zZU1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLk1PQklMRV9NRU5VKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLm1vYmlsZU1lbnUgPSBuZXcgTW9iaWxlTWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09XHJcblx0XHQyLiBEaWFsb2cgLyBNb2RhbFxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09ICovXHJcblx0dmFyIERpYWxvZyA9IGZ1bmN0aW9uIERpYWxvZyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5kaWFsb2dOYW1lID0gJChlbGVtZW50KS5kYXRhKCdkaWFsb2cnKTtcclxuXHRcdHRoaXMudW5kZXJsYXkgPSAkKCcudW5kZXJsYXknKTtcclxuXHRcdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHRcdHRoaXMuY29udGVudCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0NPTlRFTlQpO1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIENvbXBvbmVudFxyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwicmVnaXN0ZXJlZFwiKTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcInJvbGVcIiwgXCJkaWFsb2dcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtbGFiZWxsZWRieVwiLCBcImRpYWxvZy10aXRsZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImRpYWxvZy1kZXNjXCIpO1xyXG5cdFx0dGhpcy5oZWFkZXIuYXR0cigndGl0bGUnLCB0aGlzLmhlYWRlci5maW5kKCcjZGlhbG9nLWRlc2MnKS5odG1sKCkpO1xyXG5cclxuXHRcdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0XHR0aGlzLmxvYWRlciA9ICQoZWxlbWVudCkuZmluZChcIi5sb2FkZXJcIik7XHJcblx0XHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0QUNUSVZFOiAnYWN0aXZlJyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRcdERJQUxPR19IRUFERVI6ICcuaGVhZGVyJyxcclxuXHRcdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0xvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdFx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuc2hvdygwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHdpbmRvd1snRGlhbG9nJ10gPSB0aGlzO1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlRGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdC8vIE5lZWRlZCBmb3IgY29udGV4dFxyXG5cdFx0dmFyIGRpYWxvZyA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0XHQkKCdidXR0b24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ2FjdGl2YXRvcicpICYmICQodGhpcykuZGF0YSgnZGlhbG9nJykgPT0gZGlhbG9nLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFSSUFcclxuXHRcdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRkaWFsb2cudW5kZXJsYXkub24oJ2NsaWNrJywgZGlhbG9nLmhpZGVEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHJcblx0XHR0cnl7XHJcblx0XHRcdCQoZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBkaWFsb2cuc2hvd0RpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2goZXJyKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkRpYWxvZyBcIiArIGRpYWxvZy5kaWFsb2dOYW1lICsgXCIgaGFzIG5vIGFjdGl2YXRvciBidXR0b24uXCIpO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkRJQUxPRykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5kaWFsb2cgPSBuZXcgRGlhbG9nKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydEaWFsb2cnXS5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0My4gRGF0YSBUYWJsZVxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLmZvb3RSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Zm9vdCB0cicpO1xyXG5cdFx0dGhpcy5yb3dzID0gJC5tZXJnZSh0aGlzLmJvZHlSb3dzLCB0aGlzLmZvb3RSb3dzKTtcclxuXHRcdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdFx0dGhpcy5tYXN0ZXJDaGVja2JveCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uTUFTVEVSX0NIRUNLQk9YKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snRGF0YVRhYmxlJ10gPSBEYXRhVGFibGU7XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICcuZGF0YS10YWJsZScsXHJcblx0XHRNQVNURVJfQ0hFQ0tCT1g6ICd0aGVhZCAubWFzdGVyLWNoZWNrYm94JyxcclxuXHRcdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRcdElTX1NFTEVDVEVEOiAnLmlzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0c2VsZWN0QWxsUm93czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKHRoaXMubWFzdGVyQ2hlY2tib3guaXMoJzpjaGVja2VkJykpe1xyXG5cdFx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHNlbGVjdFJvdzogZnVuY3Rpb24gKGNoZWNrYm94LCByb3cpIHtcclxuXHRcdFx0aWYgKHJvdykge1xyXG5cdFx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdFx0cm93LmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBkYXRhVGFibGUgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3gub24oJ2NoYW5nZScsICQucHJveHkodGhpcy5mdW5jdGlvbnMuc2VsZWN0QWxsUm93cywgZGF0YVRhYmxlKSk7XHJcblxyXG5cdFx0JCh0aGlzLmNoZWNrYm94ZXMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0XHQkKHRoaXMpLm9uKCdjaGFuZ2UnLCAkLnByb3h5KGRhdGFUYWJsZS5mdW5jdGlvbnMuc2VsZWN0Um93LCB0aGlzLCAkKHRoaXMpLCBkYXRhVGFibGUuYm9keVJvd3MuZXEoaSkpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkRBVEFfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZGF0YVRhYmxlID0gbmV3IERhdGFUYWJsZSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0NC4gQ29sdW1uIFRvZ2dsZSBUYWJsZVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBDb2x1bW5Ub2dnbGVUYWJsZSA9IGZ1bmN0aW9uIENvbHVtblRvZ2dsZVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWQgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyJyk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0NvbHVtblRvZ2dsZVRhYmxlJ10gPSBDb2x1bW5Ub2dnbGVUYWJsZTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdFRPR0dMRV9UQUJMRTogJy50YWJsZS1jb2x1bW4tdG9nZ2xlJ1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdFx0Q09MVU1OX1NFTEVDVE9SX0JVVFRPTjogJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgZG90LW1lbnVfX2FjdGl2YXRvclwiIHN0eWxlPVwiZGlzcGxheTpibG9jazttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWxlZnQ6YXV0bztcIj5Db2x1bW5zPC9idXR0b24+JyxcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9NRU5VOiAnPHVsIGNsYXNzPVwiZG90LW1lbnUgZG90LW1lbnUtLWJvdHRvbS1sZWZ0XCI+PC91bD4nXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHJcblx0XHR0b2dnbGVDb2x1bW46IGZ1bmN0aW9uKGNvbHVtbkluZGV4LCB0YWJsZSwgY2hlY2tlZCkge1xyXG5cdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuYXR0cignaGlkZGVuJywgXCJ0cnVlXCIpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaDogZnVuY3Rpb24odGFibGUpIHtcclxuXHRcdFx0dmFyIGhpZGVJbmRpY2VzID0gW107XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cyA9IHRhYmxlLmVsZW1lbnQuZmluZCgndGJvZHkgdHInKTtcclxuXHJcblx0XHRcdHRhYmxlLmhlYWRlcnMuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKCQodGhpcykuYXR0cignaGlkZGVuJykpe1xyXG5cdFx0XHRcdFx0aGlkZUluZGljZXMucHVzaCgkKHRoaXMpLmluZGV4KCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoaWRlSW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGhpZGVJbmRpY2VzW2ldKS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaEFsbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMucmVmcmVzaCh0aGlzLkNvbHVtblRvZ2dsZVRhYmxlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmKCF0aGlzLmVsZW1lbnQuYXR0cignaWQnKSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiQ29sdW1uVG9nZ2xlVGFibGUgcmVxdWlyZXMgdGhlIHRhYmxlIHRvIGhhdmUgYW4gdW5pcXVlIElELlwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0b2dnbGVUYWJsZSA9IHRoaXM7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JCdXR0b24gPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfQlVUVE9OKTtcclxuXHRcdHZhciBjb2x1bW5TZWxlY3Rvck1lbnUgPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfTUVOVSk7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgPSAnQ29sdW1uVG9nZ2xlVGFibGUtJyArIHRvZ2dsZVRhYmxlLmVsZW1lbnQuYXR0cignaWQnKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuYmVmb3JlKGNvbHVtblNlbGVjdG9yQnV0dG9uKTtcclxuXHJcblx0XHRjb2x1bW5TZWxlY3RvckJ1dHRvbi5hZnRlcihjb2x1bW5TZWxlY3Rvck1lbnUpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCk7XHJcblx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCArICctbWVudScpO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBjb2x1bW5TZWxlY3RvckJ1dHRvbjtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gY29sdW1uU2VsZWN0b3JNZW51O1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51LmZpbmQoJ3VsJykuZGF0YShcInRhYmxlXCIsIHRvZ2dsZVRhYmxlLmVsZW1lbnQuYXR0cignaWQnKSk7XHJcblxyXG5cdFx0dGhpcy5oZWFkZXJzLmVhY2goZnVuY3Rpb24gKCl7XHJcblx0XHRcdHZhciBjaGVja2VkID0gJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSA/IFwiY2hlY2tlZFwiIDogXCJcIjtcclxuXHRcdFx0JCh0aGlzKS5kYXRhKCd2aXNpYmxlJywgJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSk7XHJcblxyXG5cdFx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXBwZW5kKCdcXFxyXG5cdFx0XHRcdDxsaSBjbGFzcz1cImRvdC1tZW51X19pdGVtIGRvdC1tZW51X19pdGVtLS1wYWRkZWRcIj4gXFxcclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjaGVja2JveFwiPiBcXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJjb2x1bW4tdG9nZ2xlXCIgaWQ9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiIHR5cGU9XCJjaGVja2JveFwiICcrIGNoZWNrZWQgKyc+IFxcXHJcblx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiPicgKyAkKHRoaXMpLnRleHQoKSArICc8L2xhYmVsPiBcXFxyXG5cdFx0XHRcdFx0PC9kaXY+IFxcXHJcblx0XHRcdFx0PC9saT4nKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCJib2R5XCIpLm9uKFwiY2hhbmdlXCIsIFwiLmNvbHVtbi10b2dnbGVcIiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCgnLmNvbHVtbi10b2dnbGUnKS5pbmRleCh0aGlzKTtcclxuXHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy50b2dnbGVDb2x1bW4oaW5kZXgsIHRvZ2dsZVRhYmxlLCAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSA9IG5ldyBDb2x1bW5Ub2dnbGVUYWJsZSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQWpheEZ1bmN0aW9ucyA9ICBmdW5jdGlvbiBBamF4RnVuY3Rpb25zKCkge307XHJcblx0d2luZG93WydBamF4RnVuY3Rpb25zJ10gPSBBamF4RnVuY3Rpb25zO1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdFNFQVJDSF9JTlBVVDogJy5zZWFyY2gtaW5wdXQnLFxyXG5cdFx0U0VBUkNIX0NPTlRBSU5FUjogJy5zZWFyY2gtY29udGFpbmVyJyxcclxuXHRcdFNFQVJDSF9GSUxURVJfQ09OVEFJTkVSOiAnLnNlYXJjaC1maWx0ZXItY29udGFpbmVyJyxcclxuXHRcdFNFQVJDSF9GSUxURVJfQlVUVE9OOiAnI3NlYXJjaC1maWx0ZXItYnV0dG9uJyxcclxuXHRcdExPR19JTl9ESUFMT0c6ICcubG9naW4uZGlhbG9nJyxcclxuXHR9O1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5LZXlzXyA9IHtcclxuXHRcdFNQQUNFOiAzMixcclxuXHRcdEVOVEVSOiAxMyxcclxuXHRcdENPTU1BOiA0NVxyXG5cdH07XHJcblxyXG5cdC8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXNcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXMnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy1mb2N1cycpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzIG91dFxyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1c291dCcsICBmdW5jdGlvbihlKXtcclxuXHRcdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LTJkcCcpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBTRUFSQ0hcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9CVVRUT04pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9ICQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0NPTlRBSU5FUik7XHJcblx0XHR2YXIgZmlsdGVyQnV0dG9uID0gJCh0aGlzKTtcclxuXHJcblx0XHRpZihjb250YWluZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0Y29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLmJsdXIoKTtcclxuXHRcdH0gZWxzZXtcclxuXHRcdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEVkaXRUb3BpYyA9IGZ1bmN0aW9uIEVkaXRUb3BpYyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5vcmlnaW5hbE5hbWUgPSAkKGVsZW1lbnQpLmRhdGEoXCJvcmlnaW5hbC10b3BpYy1uYW1lXCIpO1xyXG5cdFx0dGhpcy50b3BpY0lkID0gJChlbGVtZW50KS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdFx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmVkaXQtdG9waWMnKTtcclxuXHRcdHRoaXMuZGVsZXRlQnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZGVsZXRlLXRvcGljJyk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0VkaXRUb3BpYyddID0gRWRpdFRvcGljO1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRFRElUX1RPUElDOiAnLmVkaXQtdG9waWMtbGlzdCAudG9waWMnLFxyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRERUxFVEVfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRQQVRDSF9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRcdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0aWYodG9waWMub3JpZ2luYWxOYW1lID09IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0NoYW5nZSBUb3BpYyBOYW1lJyxcclxuXHRcdFx0XHR0eXBlOiAnYmx1ZScsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gPGI+XCInICsgIHRvcGljLm9yaWdpbmFsTmFtZSArICdcIjwvYj4gdG8gPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsnXCI8L2I+PycsXHJcblx0XHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ibHVlJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdFx0JCgnLmxvYWRlcicsIHRvcGljLmVsZW1lbnQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX25hbWUgOiB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMub3JpZ2luYWxOYW1lID0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjYW5jZWw6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHRcdHRpdGxlOiAnRGVsZXRlJyxcclxuXHRcdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsgJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGRlbGV0ZToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLmVsZW1lbnQuaGlkZShjb25maWcuYW5pbXRpb25zLnNsb3csIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNyZWF0ZUVkaXRUb3BpY0RPTTogZnVuY3Rpb24odG9waWNJZCwgb3JpZ2luYWxOYW1lKXtcclxuXHRcdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZWRpdFRvcGljID0gdGhpcztcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmRlbGV0ZVRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5FRElUX1RPUElDKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkVkaXRUb3BpYyA9IG5ldyBFZGl0VG9waWModGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgICA3IERvdE1lbnVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRG90TWVudSA9IGZ1bmN0aW9uIE1lbnUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5idXR0b24gPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5tZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSBmYWxzZTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRET1RfTUVOVTogJy5kb3QtbWVudScsXHJcblx0XHRBQ1RJVkFUT1I6ICcuZG90LW1lbnVfX2FjdGl2YXRvcicsXHJcblx0XHRJU19WSVNJQkxFOiAnLmlzLXZpc2libGUnLFxyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnLFxyXG5cdFx0Qk9UVE9NX0xFRlQ6ICdkb3QtbWVudS0tYm90dG9tLWxlZnQnLFxyXG5cdFx0Qk9UVE9NX1JJR0hUOiAnZG90LW1lbnUtLWJvdHRvbS1yaWdodCcsXHJcblx0XHRUT1BfTEVGVDogJ2RvdC1tZW51LS10b3AtbGVmdCcsXHJcblx0XHRUT1BfUklHSFQ6ICdkb3QtbWVudS0tdG9wLXJpZ2h0JyxcclxuXHRcdFRBQkxFX0RPVF9NRU5VOiAnZG90LW1lbnUtLXRhYmxlJ1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYnV0dG9uUmVjdCA9IHRoaXMuYnV0dG9uWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9MRUZUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AgcmlnaHQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fUklHSFQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AgbGVmdCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9MRUZUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QucmlnaHQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAnYm90dG9tIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAnYm90dG9tIGxlZnQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpe1xyXG5cdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQodGhpcykoKTtcclxuXHRcdHRoaXMubWVudS5hZGRDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHRcdHRoaXMubWVudS5zaG93KCk7XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubWVudS5yZW1vdmVDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHRcdHRoaXMubWVudS5oaWRlKCk7XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKHRoaXMpKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS5zaG93LmJpbmQodGhpcykoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZG90TWVudSA9IHRoaXM7XHJcblx0XHR2YXIgbWVudUlkID0gJCh0aGlzLmJ1dHRvbikuYXR0cignaWQnKSArICctbWVudSc7XHJcblxyXG5cdFx0dGhpcy5tZW51ID0gJCgnIycgKyBtZW51SWQpO1xyXG5cdFx0dGhpcy5pc1RhYmxlRG90TWVudSA9IHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5UQUJMRV9ET1RfTUVOVSk7XHJcblxyXG5cdFx0dGhpcy5idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS50b2dnbGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0aWYoIXRhcmdldC5pcyhkb3RNZW51Lm1lbnUpIHx8ICF0YXJnZXQuaXMoZG90TWVudS5idXR0b24pKSB7XHJcblx0XHRcdFx0aWYoISQuY29udGFpbnMoJChkb3RNZW51Lm1lbnUpWzBdLCBlLnRhcmdldCkpe1xyXG5cdFx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5BQ1RJVkFUT1IpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuRG90TWVudSA9IG5ldyBEb3RNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQ1LiBTZWNvbmQgTWFya2VyXHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdHZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0XHRpZigkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKS5sZW5ndGggPCAxIHx8ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpLmxlbmd0aCA8IDEpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0XHR0aGlzLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0XHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdFx0dGhpcy5zdHVkZW50RGF0YVRhYmxlID0gdGhpcy5zdHVkZW50VGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdFx0dGhpcy5zdXBlcnZpc29yVGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRBU1NJR05fTUFSS0VSOiAnL2FkbWluL21hcmtlci1hc3NpZ24nLFxyXG5cdH07XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCA9IGZ1bmN0aW9uKHN0dWRlbnRSb3dET00sIG1hcmtlcil7XHJcblx0XHR2YXIgcm93ID0gJChzdHVkZW50Um93RE9NKTtcclxuXHJcblx0XHRtYXJrZXIudW5zZWxlY3RBbGwobWFya2VyKTtcclxuXHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9ICQocm93KTtcclxuXHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ21hcmtlci1pZCcpID09IHJvdy5kYXRhKCdzdXBlcnZpc29yLWlkJykpe1xyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvciA9IGZ1bmN0aW9uKHN1cGVydmlzb3JSb3dET00sIG1hcmtlcil7XHJcblx0XHR2YXIgcm93ID0gJChzdXBlcnZpc29yUm93RE9NKTtcclxuXHJcblx0XHRpZihyb3cuYXR0cignZGlzYWJsZWQnKSl7cmV0dXJuO31cclxuXHJcblx0XHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ICE9IG51bGwpe1xyXG5cdFx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IHJvdztcclxuXHRcdFx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nKFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdXBlcnZpc29yLW5hbWUnKSxcclxuXHRcdFx0XHRyb3cuZGF0YSgnbWFya2VyLW5hbWUnKSxcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnJlc2V0VmlldyA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oc3R1ZGVudE5hbWUsIHN1cGVydmlzb3JOYW1lLCBtYXJrZXJOYW1lLCBwcm9qZWN0KXtcclxuXHRcdCQoXCIjc3R1ZGVudC1uYW1lXCIpLnRleHQoc3R1ZGVudE5hbWUpO1xyXG5cdFx0JChcIiNzdXBlcnZpc29yLW5hbWVcIikudGV4dChzdXBlcnZpc29yTmFtZSk7XHJcblx0XHQkKFwiI21hcmtlci1uYW1lXCIpLnRleHQobWFya2VyTmFtZSk7XHJcblxyXG5cdFx0JChcIiNwcm9qZWN0LXRpdGxlXCIpLmh0bWwoJzxiPlRpdGxlOiA8L2I+JyArIHByb2plY3RbJ3RpdGxlJ10pO1xyXG5cdFx0JChcIiNwcm9qZWN0LWRlc2NyaXB0aW9uXCIpLmh0bWwoJzxiPkRlc2NyaXB0aW9uOiA8L2I+JyArIHByb2plY3RbJ2Rlc2NyaXB0aW9uJ10pO1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdH1cclxuXHJcblx0JCgnI3N1Ym1pdEFzc2lnbk1hcmtlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbWFya2VyID0gd2luZG93WydNYXJrZXInXTtcclxuXHJcblx0XHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9PSBudWxsKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH07XHJcblxyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdFx0dmFyIHByb2plY3RJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpWydpZCddO1xyXG5cdFx0dmFyIHN0dWRlbnRJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1pZCcpO1xyXG5cdFx0dmFyIG1hcmtlcklkID0gbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvci5kYXRhKCdtYXJrZXItaWQnKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHRcdHVybDogbWFya2VyLlVybHNfLkFTU0lHTl9NQVJLRVIsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWQsXHJcblx0XHRcdFx0c3R1ZGVudF9pZDogc3R1ZGVudElkLFxyXG5cdFx0XHRcdG1hcmtlcl9pZDogbWFya2VySWQsXHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQucmVtb3ZlKCk7XHJcblx0XHRcdG1hcmtlci5yZXNldFZpZXcobWFya2VyKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHRoaXM7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50KHRoaXMsIG1hcmtlcik7IH0pO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvcih0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR3aW5kb3dbJ01hcmtlciddID0gbmV3IE1hcmtlcigpO1xyXG5cdH1cclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMuanMiXSwic291cmNlUm9vdCI6IiJ9