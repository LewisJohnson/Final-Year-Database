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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmVhYjAyYTMzNGNmNmFmYzlmMjAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIm9uIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVxIiwiZGF0YSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpbmRleCIsInZhbHVlIiwiaXMiLCJwcm9wIiwic2V0VGltZW91dCIsImUiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInJlbW92ZUNsYXNzIiwiaGlkZSIsImFmdGVyIiwiY3NzIiwiYWpheCIsInVybCIsInR5cGUiLCJzZXJpYWxpemUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJzaGFyZV9uYW1lIiwic2hvd05vdGlmaWNhdGlvbiIsIkFqYXhGdW5jdGlvbnMiLCJwcm90b3R5cGUiLCJTZWxlY3RvcnNfIiwiTE9HX0lOX0RJQUxPRyIsImRpYWxvZyIsInNob3dMb2FkZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhpZGVMb2FkZXIiLCJzaG93IiwiYWRkQ2xhc3MiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsInN2Z0NvbnRhaW5lciIsInN2ZyIsInByb2plY3RJZCIsIndpbmRvdyIsImFjdGlvbiIsImFqYXhVcmwiLCJwcm9qZWN0X2lkIiwiZHJvcGRvd24iLCJjb250ZW50IiwibWVkaXVtIiwicmVzdWx0IiwiYnV0dG9uc0h0bWwiLCJwcmV2aWV3SHRtbCIsImluc2VydEF0Q2FyZXQiLCJ3cmFwVGV4dFdpdGhUYWciLCJpbnB1dFVybCIsInByb21wdCIsImlucHV0QWx0IiwiaW5wdXRUZXh0IiwidGhlbWUiLCJlc2NhcGVLZXkiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsInRpdGxlIiwiY2FyZCIsInBhcmVudCIsImNvbmZpcm0iLCJpY29uIiwiYXV0b0Nsb3NlIiwiYnV0dG9ucyIsImJ0bkNsYXNzIiwibWV0aG9kIiwic3VjY2Vzc2Z1bCIsInJlbW92ZSIsIm1lc3NhZ2UiLCJjYW5jZWwiLCJkZWxheSIsImFuaW1hdGUiLCJvcGFjaXR5IiwiYmluZCIsImRvY3VtZW50IiwiYWpheEVycm9yIiwiZXZlbnQiLCJyZXF1ZXN0Iiwic2V0dGluZ3MiLCJzaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uIiwiTW9iaWxlTWVudSIsImVsZW1lbnQiLCJhY3RpdmF0b3IiLCJIQU1CVVJHRVJfQ09OVEFJTkVSIiwidW5kZXJsYXkiLCJVTkRFUkxBWSIsImluaXQiLCJsb2ciLCJDc3NDbGFzc2VzXyIsIklTX1ZJU0lCTEUiLCJNT0JJTEVfTUVOVSIsIm9wZW5NZW51IiwiY2xvc2VNZW51IiwibW9iaWxlTWVudSIsImluaXRBbGwiLCJEaWFsb2ciLCJkaWFsb2dOYW1lIiwiaGVhZGVyIiwiRElBTE9HX0hFQURFUiIsIkRJQUxPR19DT05URU5UIiwiSHRtbFNuaXBwZXRzXyIsIkxPQURFUiIsImxvYWRlciIsImlzQ2xvc2FibGUiLCJhY3RpdmF0b3JCdXR0b25zIiwiQUNUSVZFIiwiRElBTE9HIiwic2hvd0RpYWxvZyIsImhpZGVEaWFsb2ciLCJwdXNoIiwiZXJyIiwicmVhZHkiLCJrZXlkb3duIiwia2V5Q29kZSIsIkRhdGFUYWJsZSIsImJvZHlSb3dzIiwiZm9vdFJvd3MiLCJyb3dzIiwibWVyZ2UiLCJjaGVja2JveGVzIiwiQ0hFQ0tCT1giLCJtYXN0ZXJDaGVja2JveCIsIk1BU1RFUl9DSEVDS0JPWCIsIkRBVEFfVEFCTEUiLCJJU19TRUxFQ1RFRCIsInNlbGVjdEFsbFJvd3MiLCJzZWxlY3RSb3ciLCJjaGVja2JveCIsInJvdyIsImRhdGFUYWJsZSIsInByb3h5IiwiaSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoZWNrZWQiLCJjaGlsZHJlbiIsInJlbW92ZUF0dHIiLCJyZWZyZXNoIiwiaGlkZUluZGljZXMiLCJyZWZyZXNoQWxsIiwidG9nZ2xlVGFibGUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbiIsImNvbHVtblNlbGVjdG9yTWVudSIsImNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkIiwiU0VBUkNIX0lOUFVUIiwiU0VBUkNIX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9CVVRUT04iLCJLZXlzXyIsIlNQQUNFIiwiRU5URVIiLCJDT01NQSIsInJlbW92ZUFsbFNoYWRvd0NsYXNzZXMiLCJjb250YWluZXIiLCJmaWx0ZXJCdXR0b24iLCJibHVyIiwib3JpZ2luYWxOYW1lIiwidG9waWNJZCIsInRvcGljTmFtZUlucHV0IiwiZWRpdEJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsIkVESVRfVE9QSUMiLCJVcmxzXyIsIkRFTEVURV9UT1BJQyIsIlBBVENIX1RPUElDIiwiTkVXX1RPUElDIiwiZWRpdFRvcGljIiwidG9waWMiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJkZWxldGVUb3BpYyIsImRlbGV0ZSIsInNsb3ciLCJEb3RNZW51IiwiTWVudSIsImJ1dHRvbiIsIm1lbnUiLCJpc1RhYmxlRG90TWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIlRBQkxFX0RPVF9NRU5VIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImxlZnQiLCJwYXJzZUludCIsInRvcCIsInJpZ2h0IiwidG9nZ2xlIiwiZG90TWVudSIsIm1lbnVJZCIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNvbnRhaW5zIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0Iiwic3R1ZGVudElkIiwibWFya2VySWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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dUMsT0FBdkMsRUFBZ0QsWUFBVztBQUFFb08sVUFBT2pNLFNBQVAsQ0FBaUJ5TSxhQUFqQixDQUErQixJQUEvQixFQUFxQ0UsTUFBckM7QUFBK0MsR0FBNUc7QUFDQXRRLElBQUVzUSxPQUFPSixtQkFBUCxDQUEyQmxHLFFBQTdCLEVBQXVDeEksRUFBdkMsQ0FBMEMsT0FBMUMsRUFBbUQsWUFBVztBQUFFb08sVUFBT2pNLFNBQVAsQ0FBaUI2TSxnQkFBakIsQ0FBa0MsSUFBbEMsRUFBd0NGLE1BQXhDO0FBQWtELEdBQWxIO0FBQ0EsRUFKRDs7QUFNQVYsUUFBT2pNLFNBQVAsQ0FBaUJnRixPQUFqQixHQUEyQixZQUFVO0FBQ3BDekQsU0FBTyxRQUFQLElBQW1CLElBQUkwSyxNQUFKLEVBQW5CO0FBQ0EsRUFGRDs7QUFJQS9ILFlBQVdsRSxTQUFYLENBQXFCZ0YsT0FBckI7QUFDQUMsUUFBT2pGLFNBQVAsQ0FBaUJnRixPQUFqQjtBQUNBb0IsV0FBVXBHLFNBQVYsQ0FBb0JnRixPQUFwQjtBQUNBc0MsbUJBQWtCdEgsU0FBbEIsQ0FBNEJnRixPQUE1QjtBQUNBakUsV0FBVWYsU0FBVixDQUFvQmdGLE9BQXBCO0FBQ0FpSCxRQUFPak0sU0FBUCxDQUFpQmdGLE9BQWpCO0FBQ0F1RixTQUFRdkssU0FBUixDQUFrQmdGLE9BQWxCO0FBQ0EsQ0FueUJBLEUiLCJmaWxlIjoiXFxqc1xcbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZlYWIwMmEzMzRjZjZhZmM5ZjIwIiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZJTEUgU1RSVUNUVVJFXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnwgIFx0MS4gQUpBWCBTZXR1cFxyXG58XHQyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxufFx0My4gT3RoZXJcclxufFxyXG4qL1xyXG5cclxuaW1wb3J0ICcuLi9qcy9jb21wb25lbnRzJztcclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG47JChmdW5jdGlvbigpIHtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0MS4gQUpBWCBTZXR1cFxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQkLmFqYXhTZXR1cCh7XHJcblx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpLFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHRpZigkKCcuc2hvdy0tc2Nyb2xsLXRvLXRvcCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0JCgnLm1haW4tY29udGVudCcpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBidXR0b24tLWFjY2VudCBzY3JvbGwtdG8tdG9wXCI+U2Nyb2xsIHRvIFRvcDwvYnV0dG9uPicpO1xyXG5cdH1cclxuXHJcblx0Ly8gQWNjZXNzaWJpbGl0eVxyXG5cdCQoJy5kcm9wZG93bicpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHQkKCcuZHJvcGRvd24gPiBidXR0b24nKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xyXG5cdCQoJy5kcm9wZG93biAuZHJvcGRvd24tY29udGVudCBhJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cclxuXHQvLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcblx0JCgnLnRvcGljcy1saXN0JykucHJlcGVuZCgkKCcuZmlyc3QnKSk7XHJcblx0JCgnLnRvcGljcy1saXN0IC5sb2FkZXInKS5mYWRlT3V0KDApO1xyXG5cdCQoJy50b3BpY3MtbGlzdCBsaScpLmZpcnN0KCkuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCwgZnVuY3Rpb24gc2hvd05leHRUb3BpYygpIHtcclxuXHRcdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIHNob3dOZXh0VG9waWMpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcub3JkZXItbGlzdC1qcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0XHQvLyBzb3J0VW5vcmRlcmVkTGlzdChsaXN0KTtcclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdsYXN0LW5hbWUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdhbHBoYS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkQWxwaGFIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ3RpdGxlLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRUaXRsZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCAzLiBPVEhFUlxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5lbWFpbC10YWJsZSAuY2hlY2tib3ggaW5wdXRcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc2VsZWN0ID0gZnVuY3Rpb24oZG9tKXtcclxuXHRcdFx0dmFyIHN0YXR1cyA9IGRvbS5wYXJlbnRzKCkuZXEoNCkuZGF0YSgnc3RhdHVzJyk7XHJcblx0XHRcdHZhciBlbWFpbFN0cmluZyA9IFwibWFpbHRvOlwiO1xyXG5cdFx0XHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcuZW1haWwtdGFibGUuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHRcdFx0dmFyIGVtYWlsQnV0dG9uc2VsZWN0b3IgPSBcIi5lbWFpbC1zZWxlY3RlZC5cIiArIHN0YXR1cztcclxuXHJcblx0XHRcdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdFx0XHRpZigkKHZhbHVlKS5pcyhcIjpjaGVja2VkXCIpICYmICEkKHZhbHVlKS5oYXNDbGFzcyhcIm1hc3Rlci1jaGVja2JveFwiKSkge1xyXG5cdFx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gJCh2YWx1ZSkuZGF0YSgnZW1haWwnKTtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxuXHRcdH07XHJcblx0XHRzZXRUaW1lb3V0KHNlbGVjdCgkKHRoaXMpKSwgMjAwMCk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuZW1haWwtc2VsZWN0ZWRcIiwgZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYoJCh0aGlzKS5wcm9wKCdocmVmJykgPT09ICdtYWlsdG86JyB8fCAkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gbnVsbCl7XHJcblx0XHRcdGFsZXJ0KFwiWW91IGhhdmVuJ3Qgc2VsZWN0ZWQgYW55b25lLlwiKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBFeHRlcm5hbCBsaW5rcyBnaXZlIGFuIGlsbHVzaW9uIG9mIEFKQVhcclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmV4dGVybmFsLWxpbmtcIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBlbGVtVG9IaWRlU2VsZWN0b3IgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1oaWRlLXNlbGVjdG9yJykpO1xyXG5cdFx0dmFyIGVsZW1Ub1JlcGxhY2UgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1yZXBsYWNlLXdpdGgtbG9hZGVyLXNlbGVjdG9yJykpO1xyXG5cclxuXHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdGVsZW1Ub0hpZGVTZWxlY3Rvci5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmhpZGUoKTtcclxuXHRcdGVsZW1Ub1JlcGxhY2UuYWZ0ZXIoJzxkaXYgaWQ9XCJjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lclwiIGNsYXNzPVwibG9hZGVyIGxvYWRlci0teC1sYXJnZVwiPjwvZGl2PicpO1xyXG5cclxuXHRcdCQoJyNjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBVc2VkIG9uIHRoZSBzdHVkZW50IGluZGV4IHBhZ2VcclxuXHQkKFwiI3NoYXJlLXByb2plY3QtZm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc2hhcmVfbmFtZSl7XHJcblx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1lvdXIgbmFtZSBpcyBiZWluZyBzaGFyZWQgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignJywgJ1lvdSBhcmUgbm8gbG9uZ2VyIHNoYXJpbmcgeW91ciBuYW1lIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoJyNzaGFyZV9uYW1lJykucHJvcCgnY2hlY2tlZCcsIHJlc3BvbnNlLnNoYXJlX25hbWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmhpZGUoKTtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuc2hvdygpO1xyXG5cdFx0XHRcdCQoJyNsb2dpbi11c2VybmFtZScsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuYWRkQ2xhc3MoXCJoYXMtZXJyb3JcIik7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyIHN1Ym1pdEJ1dHRvbiA9ICQodGhpcykuZmluZCgnOnN1Ym1pdCcpO1xyXG5cdFx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdWJtaXRCdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMuY3JlYXRlRWRpdFRvcGljRE9NKGRhdGFbXCJpZFwiXSwgZGF0YVtcIm5hbWVcIl0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gTkVXIFVTRVJcclxuXHQvLyBwdXQgdGhpcyBzdHVmZiBpbiBhbiBhcnJheVxyXG5cdC8vICQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0Ly8gJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHJcblx0Ly8gJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHQvLyBcdGlmKCQoJy5uZXctdXNlci1zdHVkZW50JykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHQvLyBcdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHQvLyBcdH0gZWxzZSB7XHJcblx0Ly8gXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gXHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdC8vIFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdC8vIFx0fSBlbHNlIHtcclxuXHQvLyBcdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHQvLyBcdH1cclxuXHQvLyB9KTtcclxuXHJcblx0JChcIi5mYXZvdXJpdGUtY29udGFpbmVyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHN2Z0NvbnRhaW5lciA9ICQodGhpcyk7XHJcblx0XHR2YXIgc3ZnID0gc3ZnQ29udGFpbmVyLmZpbmQoJ3N2ZycpO1xyXG5cdFx0dmFyIHByb2plY3RJZCA9IHdpbmRvd1sncHJvamVjdCddLmRhdGEoJ3Byb2plY3QtaWQnKTtcclxuXHJcblx0XHRzdmcuaGlkZSgwKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLnNob3coMCk7XHJcblxyXG5cdFx0aWYoc3ZnLmhhc0NsYXNzKCdmYXZvdXJpdGUnKSl7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAncmVtb3ZlJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL3JlbW92ZS1mYXZvdXJpdGUnO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAnYWRkJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL2FkZC1mYXZvdXJpdGUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihhY3Rpb24gPT0gXCJhZGRcIil7XHJcblx0XHRcdFx0XHRzdmcuYWRkQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzdmcucmVtb3ZlQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0c3ZnLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QpO1xyXG5cdFx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJ25hdi5tb2JpbGUgLnN1Yi1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZHJvcGRvd24gPSAkKHRoaXMpO1xyXG5cdFx0dmFyIGNvbnRlbnQgPSBkcm9wZG93bi5maW5kKCcuZHJvcGRvd24tY29udGVudCcpO1xyXG5cclxuXHRcdGlmKGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuaGlkZShjb25maWcuYW5pbXRpb25zLm1lZGl1bSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCB0cnVlKTtcclxuXHRcdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgZmFsc2UpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDE4MGRlZylcIik7XHJcblx0XHRcdGRyb3Bkb3duLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRjb250ZW50LnNob3coY29uZmlnLmFuaW10aW9ucy5tZWRpdW0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8gSFRNTCBFRElUT1JcclxuXHQkKCcuaHRtbC1lZGl0b3InKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSl7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICcvc25pcHBldD9zbmlwcGV0PWh0bWwtZWRpdG9yLXRvb2xiYXInLFxyXG5cdFx0XHR0eXBlOidHRVQnLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3VsdCl7XHJcblx0XHRcdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmFmdGVyKHJlc3VsdCk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHR2YXIgYnV0dG9uc0h0bWwgPSBcIjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS10b3AtYnV0dG9ucyBmbGV4Jz48YnV0dG9uIGNsYXNzPSdodG1sJyB0eXBlPSdidXR0b24nPkhUTUw8L2J1dHRvbj48YnV0dG9uIGNsYXNzPSdwcmV2aWV3JyB0eXBlPSdidXR0b24nPlBSRVZJRVc8L2J1dHRvbj48L2Rpdj5cIjtcclxuXHRcdHZhciBwcmV2aWV3SHRtbCA9IFwiPGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJz48ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tcHJldmlldyc+PC9kaXY+PC9kaXY+XCI7XHJcblxyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmJlZm9yZShidXR0b25zSHRtbCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3InKS5hZnRlcihwcmV2aWV3SHRtbCk7XHJcblxyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcicpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldycpLmh0bWwoJCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLnZhbCgpKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3JykuaHRtbCgkKHRoaXMpLnZhbCgpKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yLS10b3AtYnV0dG9ucyAuaHRtbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0Jykuc2hvdygpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS10b29sYmFyJykuc2hvdygpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcicpLmhpZGUoKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yLS10b3AtYnV0dG9ucyAucHJldmlldycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykuaGlkZSgpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS10b29sYmFyJykuaGlkZSgpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcicpLnNob3coKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVG9nZ2xlIGxhYmVsIGZsaXBzIHRvZ2dsZVxyXG5cdCQoXCIuaHRtbC1lZGl0b3JcIikub24oXCJjbGlja1wiLCBcIi5odG1sLWVkaXRvci0tdG9vbGJhciBsaSBidXR0b25cIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHN3aXRjaCgkKHRoaXMpLmRhdGEoJ3R5cGUnKSl7XHJcblx0XHRcdGNhc2UgXCJsaW5lYnJlYWtcIjpcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGJyPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIm9sXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJ1xcbjxvbD5cXG5cXHQ8bGk+SXRlbSAxPC9saT5cXG5cXHQ8bGk+SXRlbSAyPC9saT5cXG5cXHQ8bGk+SXRlbSAzPC9saT5cXG48L29sPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInVsXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJ1xcbjx1bD5cXG5cXHQ8bGk+SXRlbSB4PC9saT5cXG5cXHQ8bGk+SXRlbSB5PC9saT5cXG5cXHQ8bGk+SXRlbSB6PC9saT5cXG48L3VsPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImJvbGRcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdiJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidHRcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICd0dCcpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIml0YWxpY1wiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ2knKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ1bmRlcmxpbmVcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICd1Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiaW1nXCI6XHJcblx0XHRcdFx0dmFyIGlucHV0VXJsID0gcHJvbXB0KFwiRW50ZXIgdGhlIGltYWdlIFVSTFwiLCBcImh0dHBzOi8vd3d3LlwiKTtcclxuXHRcdFx0XHR2YXIgaW5wdXRBbHQgPSBwcm9tcHQoXCJFbnRlciBhbHQgdGV4dFwiLCBcIkltYWdlIG9mIFN1c3NleCBjYW1wdXNcIik7XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxpbWcgYWx0PVwiJyArIGlucHV0QWx0ICsgJ1wiIHNyYz1cIicgKyBpbnB1dFVybCArICdcIj4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJsaW5rXCI6XHJcblx0XHRcdFx0dmFyIGlucHV0VXJsID0gcHJvbXB0KFwiRW50ZXIgdGhlIFVSTFwiLCBcImh0dHBzOi8vd3d3LlwiKTtcclxuXHRcdFx0XHR2YXIgaW5wdXRUZXh0ID0gcHJvbXB0KFwiRW50ZXIgZGlzcGxheSB0ZXh0XCIsIFwiU3Vzc2V4XCIpO1xyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8YSBocmVmPVwiJyArIGlucHV0VXJsICsgJ1wiPicgKyBpbnB1dFRleHQgKyAnPC9hPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImNvZGVcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdjb2RlJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwicHJlXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAncHJlJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiaW5mb1wiOlxyXG5cdFx0XHRcdCQuZGlhbG9nKHtcclxuXHRcdFx0XHRcdHRoZW1lOiAnbWF0ZXJpYWwnLFxyXG5cdFx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRcdHRpdGxlOiAnSFRNTCBFZGl0b3IgSW5mbycsXHJcblx0XHRcdFx0XHRjb250ZW50OiAnQWxsIGxpbmtzIHlvdSBhZGQgd2lsbCBvcGVuIGluIGEgbmV3IHRhYi4gQWxsIEhUTUwgNSBlbGVtZW50cyBhcmUgdmFsaWQgZm9yIHRoZSBkZXNjcmlwdGlvbiBmaWVsZCwgZXhjbHVkaW5nOyA8YnI+PGJyPiA8dWw+PGxpPlNjcmlwdCB0YWdzPC9saT48bGk+SGVhZGluZyB0YWdzPC9saT48bGk+SFRNTCByb290IHRhZ3M8L2xpPjxsaT5Cb2R5IHRhZ3M8L2xpPjwvdWw+JyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cdCQoJy5zdHVkZW50LXVuZG8tc2VsZWN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIGNhcmQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnVW5kbyBQcm9qZWN0IFNlbGVjdGlvbicsXHJcblx0XHRcdHR5cGU6ICdyZWQnLFxyXG5cdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTEyLjUsOEM5Ljg1LDggNy40NSw5IDUuNiwxMC42TDIsN1YxNkgxMUw3LjM4LDEyLjM4QzguNzcsMTEuMjIgMTAuNTQsMTAuNSAxMi41LDEwLjVDMTYuMDQsMTAuNSAxOS4wNSwxMi44MSAyMC4xLDE2TDIyLjQ3LDE1LjIyQzIxLjA4LDExLjAzIDE3LjE1LDggMTIuNSw4WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0YXV0b0Nsb3NlOiAnY2FuY2VsfDEwMDAwJyxcclxuXHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byB1bi1zZWxlY3QgeW91ciBzZWxlY3RlZCBwcm9qZWN0PzwvYj4nLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQQVRDSCcsXHJcblx0XHRcdFx0XHRcdFx0dXJsOiAnL3N0dWRlbnRzL3VuZG8tc2VsZWN0ZWQtcHJvamVjdCcsXHJcblx0XHRcdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FyZC5oaWRlKDQwMCwgZnVuY3Rpb24oKSB7IGNhcmQucmVtb3ZlKCk7IH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1VuZG8gc3VjY2Vzc2Z1bC4nKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJ2Vycm9yJywgcmVzcG9uc2UubWVzc2FnZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNhbmNlbDoge30sXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT1cclxuXHRcdDkuIEluaXRpYWxpc2VcclxuXHQgICA9PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0Ly8gVXNlZCBhcyBhbiBlYXN5IHdheSBmb3IgZnVuY3Rpb25zIHRvIGdldCBjdXJyZW50IHByb2plY3QgZGF0YVxyXG5cdGlmKCQoJy5wcm9qZWN0LWNhcmQnKS5sZW5ndGggPiAwKXtcclxuXHRcdHdpbmRvd1sncHJvamVjdCddID0gJCgnLnByb2plY3QtY2FyZCcpO1xyXG5cdH1cclxuXHJcblx0JCgnLmFuaW1hdGUtY2FyZHMgLmNhcmQnKS5jc3MoXCJvcGFjaXR5XCIsIDApO1xyXG5cclxuXHR2YXIgZGVsYXkgPSAwO1xyXG5cdCQoJy5hbmltYXRlLWNhcmRzIC5jYXJkJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdGRlbGF5ICs9IDIwMDtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcInNsaWRlSW5VcCBhbmltYXRlZFwiKTtcclxuXHJcblx0XHRcdCQodGhpcykuYW5pbWF0ZSh7XHJcblx0XHRcdFx0b3BhY2l0eTogMVxyXG5cdFx0XHR9LCA4MDApO1xyXG5cclxuXHRcdH0uYmluZCh0aGlzKSwgZGVsYXkpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLmFqYXhFcnJvcihmdW5jdGlvbiggZXZlbnQsIHJlcXVlc3QsIHNldHRpbmdzICkge1xyXG5cdGlmKGNvbmZpZy5zaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uKXtcclxuXHRcdHNob3dOb3RpZmljYXRpb24oJ2Vycm9yJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggdGhhdCByZXF1ZXN0LicpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanMiLCIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIFVuaXZlcnNpdHkgb2YgU3Vzc2V4IDIwMTguXHJcbiAqIFVuYXV0aG9yaXplZCBjb3B5aW5nIG9mIHRoaXMgZmlsZSwgdmlhIGFueSBtZWRpdW0gaXMgc3RyaWN0bHkgcHJvaGliaXRlZFxyXG4gKiBXcml0dGVuIGJ5IExld2lzIEpvaG5zb24gPGxqMjM0QHN1c3NleC5jb20+XHJcbiAqL1xyXG5cclxuLyogRklMRSBTVFJVQ1RVUkVcclxuXHJcbiovXHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58XHQxLiBNb2JpbGUgTWVudVxyXG58XHQyLiBEaWFsb2cgLyBNb2RhbFxyXG58XHQzLiBEYXRhIFRhYmxlXHJcbnxcdDQuIENvbHVtbiBUb2dnbGUgVGFibGVcclxufFx0NS4gRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG58XHQ2LiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcbnxcdDcuIE1lbnVcclxufFxyXG4qL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0IDEuIE1vYmlsZSBNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdFx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgbW9iaWxlIG1lbnUuXHJcblx0XHQqXHJcblx0XHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIE1vYmlsZU1lbnUgPSAgZnVuY3Rpb24gTW9iaWxlTWVudShlbGVtZW50KSB7XHJcblx0XHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlcmUgY2FuIG9ubHkgYmUgb25lIG1vYmlsZSBtZW51LlwiKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdFx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRcdFVOREVSTEFZOiAnLm1vYmlsZS1uYXYtdW5kZXJsYXknXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbW9iaWxlTWVudSA9IHRoaXM7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5vbignY2xpY2snLCBtb2JpbGVNZW51LmNsb3NlTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uTU9CSUxFX01FTlUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDIuIERpYWxvZyAvIE1vZGFsXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHR2YXIgRGlhbG9nID0gZnVuY3Rpb24gRGlhbG9nKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmRpYWxvZ05hbWUgPSAkKGVsZW1lbnQpLmRhdGEoJ2RpYWxvZycpO1xyXG5cdFx0dGhpcy51bmRlcmxheSA9ICQoJy51bmRlcmxheScpO1xyXG5cdFx0dGhpcy5oZWFkZXIgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19IRUFERVIpO1xyXG5cdFx0dGhpcy5jb250ZW50ID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfQ09OVEVOVCk7XHJcblxyXG5cdFx0Ly8gUmVnaXN0ZXIgQ29tcG9uZW50XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoXCJyZWdpc3RlcmVkXCIpO1xyXG5cclxuXHRcdC8vIEFSSUFcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwicm9sZVwiLCBcImRpYWxvZ1wiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1sYWJlbGxlZGJ5XCIsIFwiZGlhbG9nLXRpdGxlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIFwiZGlhbG9nLWRlc2NcIik7XHJcblx0XHR0aGlzLmhlYWRlci5hdHRyKCd0aXRsZScsIHRoaXMuaGVhZGVyLmZpbmQoJyNkaWFsb2ctZGVzYycpLmh0bWwoKSk7XHJcblxyXG5cdFx0dGhpcy5jb250ZW50LmJlZm9yZSh0aGlzLkh0bWxTbmlwcGV0c18uTE9BREVSKTtcclxuXHRcdHRoaXMubG9hZGVyID0gJChlbGVtZW50KS5maW5kKFwiLmxvYWRlclwiKTtcclxuXHRcdHRoaXMuaXNDbG9zYWJsZSA9IHRydWU7XHJcblx0XHR0aGlzLmFjdGl2YXRvckJ1dHRvbnMgPSBbXTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRcdExPQURFUjogJzxkaXYgY2xhc3M9XCJsb2FkZXJcIiBzdHlsZT1cIndpZHRoOiAxMDBweDsgaGVpZ2h0OiAxMDBweDt0b3A6IDI1JTtcIj48L2Rpdj4nLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRBQ1RJVkU6ICdhY3RpdmUnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERJQUxPRzogJy5kaWFsb2cnLFxyXG5cdFx0RElBTE9HX0hFQURFUjogJy5oZWFkZXInLFxyXG5cdFx0RElBTE9HX0NPTlRFTlQ6ICcuY29udGVudCcsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5zaG93TG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLnNob3coMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuaGlkZSgwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmhpZGVMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5sb2FkZXIuaGlkZSgwKTtcclxuXHRcdHRoaXMuY29udGVudC5zaG93KDApO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIsIHRoaXMuZGlhbG9nTmFtZSk7XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0d2luZG93WydEaWFsb2cnXSA9IHRoaXM7XHJcblx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXS5jbG9zZU1lbnUoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmhpZGVEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5pc0Nsb3NhYmxlICYmIHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIpID09IHRoaXMuZGlhbG9nTmFtZSl7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0Ly8gTmVlZGVkIGZvciBjb250ZXh0XHJcblx0XHR2YXIgZGlhbG9nID0gdGhpcztcclxuXHJcblx0XHQvLyBGaW5kIGFjdGl2YXRvciBidXR0b25cclxuXHRcdCQoJ2J1dHRvbicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQodGhpcykuZGF0YSgnYWN0aXZhdG9yJykgJiYgJCh0aGlzKS5kYXRhKCdkaWFsb2cnKSA9PSBkaWFsb2cuZGlhbG9nTmFtZSl7XHJcblx0XHRcdFx0ZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMucHVzaCgkKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQVJJQVxyXG5cdFx0ZGlhbG9nLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdGRpYWxvZy51bmRlcmxheS5vbignY2xpY2snLCBkaWFsb2cuaGlkZURpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cclxuXHRcdHRyeXtcclxuXHRcdFx0JChkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGRpYWxvZy5zaG93RGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBjYXRjaChlcnIpe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIFwiICsgZGlhbG9nLmRpYWxvZ05hbWUgKyBcIiBoYXMgbm8gYWN0aXZhdG9yIGJ1dHRvbi5cIik7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRElBTE9HKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRpYWxvZyA9IG5ldyBEaWFsb2codGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcykua2V5ZG93bihmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ0RpYWxvZyddICE9IG51bGwpIHtcclxuXHRcdFx0XHR3aW5kb3dbJ0RpYWxvZyddLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoZS5rZXlDb2RlID09IDI3ICYmIHdpbmRvd1snTW9iaWxlTWVudSddICE9IG51bGwpIHtcclxuXHRcdFx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXS5jbG9zZU1lbnUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09XHJcblx0XHQzLiBEYXRhIFRhYmxlXHJcblx0ICAgPT09PT09PT09PT09PT09PSAqL1xyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIERhdGFUYWJsZSA9IGZ1bmN0aW9uIERhdGFUYWJsZShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdFx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHRcdHRoaXMuZm9vdFJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rmb290IHRyJyk7XHJcblx0XHR0aGlzLnJvd3MgPSAkLm1lcmdlKHRoaXMuYm9keVJvd3MsIHRoaXMuZm9vdFJvd3MpO1xyXG5cdFx0dGhpcy5jaGVja2JveGVzID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5DSEVDS0JPWCk7XHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94ID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5NQVNURVJfQ0hFQ0tCT1gpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydEYXRhVGFibGUnXSA9IERhdGFUYWJsZTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJy5kYXRhLXRhYmxlJyxcclxuXHRcdE1BU1RFUl9DSEVDS0JPWDogJ3RoZWFkIC5tYXN0ZXItY2hlY2tib3gnLFxyXG5cdFx0Q0hFQ0tCT1g6ICd0Ym9keSAuY2hlY2tib3gtaW5wdXQnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICcuaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0XHRzZWxlY3RBbGxSb3dzOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYodGhpcy5tYXN0ZXJDaGVja2JveC5pcygnOmNoZWNrZWQnKSl7XHJcblx0XHRcdFx0dGhpcy5yb3dzLmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hlcy5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5yb3dzLnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hlcy5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c2VsZWN0Um93OiBmdW5jdGlvbiAoY2hlY2tib3gsIHJvdykge1xyXG5cdFx0XHRpZiAocm93KSB7XHJcblx0XHRcdFx0aWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0XHRyb3cuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJvdy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHJcblx0XHQkKHRoaXMuY2hlY2tib3hlcykuZWFjaChmdW5jdGlvbihpKSB7XHJcblx0XHRcdCQodGhpcykub24oJ2NoYW5nZScsICQucHJveHkoZGF0YVRhYmxlLmZ1bmN0aW9ucy5zZWxlY3RSb3csIHRoaXMsICQodGhpcyksIGRhdGFUYWJsZS5ib2R5Um93cy5lcShpKSkpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uREFUQV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5kYXRhVGFibGUgPSBuZXcgRGF0YVRhYmxlKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ0LiBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGRhdGEgdGFibGVzLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIENvbHVtblRvZ2dsZVRhYmxlID0gZnVuY3Rpb24gQ29sdW1uVG9nZ2xlVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZCA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHInKTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IG51bGw7XHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gbnVsbDtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snQ29sdW1uVG9nZ2xlVGFibGUnXSA9IENvbHVtblRvZ2dsZVRhYmxlO1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0VE9HR0xFX1RBQkxFOiAnLnRhYmxlLWNvbHVtbi10b2dnbGUnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfQlVUVE9OOiAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBkb3QtbWVudV9fYWN0aXZhdG9yXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO21hcmdpbi10b3A6MnJlbTttYXJnaW4tbGVmdDphdXRvO1wiPkNvbHVtbnM8L2J1dHRvbj4nLFxyXG5cdFx0Q09MVU1OX1NFTEVDVE9SX01FTlU6ICc8dWwgY2xhc3M9XCJkb3QtbWVudSBkb3QtbWVudS0tYm90dG9tLWxlZnRcIj48L3VsPidcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cclxuXHRcdHRvZ2dsZUNvbHVtbjogZnVuY3Rpb24oY29sdW1uSW5kZXgsIHRhYmxlLCBjaGVja2VkKSB7XHJcblx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkucmVtb3ZlQXR0cignaGlkZGVuJyk7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5hdHRyKCdoaWRkZW4nLCBcInRydWVcIik7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoOiBmdW5jdGlvbih0YWJsZSkge1xyXG5cdFx0XHR2YXIgaGlkZUluZGljZXMgPSBbXTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzID0gdGFibGUuZWxlbWVudC5maW5kKCd0Ym9keSB0cicpO1xyXG5cclxuXHRcdFx0dGFibGUuaGVhZGVycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoJCh0aGlzKS5hdHRyKCdoaWRkZW4nKSl7XHJcblx0XHRcdFx0XHRoaWRlSW5kaWNlcy5wdXNoKCQodGhpcykuaW5kZXgoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZGVJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoaGlkZUluZGljZXNbaV0pLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JChDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy5yZWZyZXNoKHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYoIXRoaXMuZWxlbWVudC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJDb2x1bW5Ub2dnbGVUYWJsZSByZXF1aXJlcyB0aGUgdGFibGUgdG8gaGF2ZSBhbiB1bmlxdWUgSUQuXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHRvZ2dsZVRhYmxlID0gdGhpcztcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbiA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04pO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yTWVudSA9ICQodGhpcy5IdG1sU25pcHBldHNfLkNPTFVNTl9TRUxFQ1RPUl9NRU5VKTtcclxuXHRcdHZhciBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCA9ICdDb2x1bW5Ub2dnbGVUYWJsZS0nICsgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudC5iZWZvcmUoY29sdW1uU2VsZWN0b3JCdXR0b24pO1xyXG5cclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmFmdGVyKGNvbHVtblNlbGVjdG9yTWVudSk7XHJcblx0XHRjb2x1bW5TZWxlY3RvckJ1dHRvbi5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkKTtcclxuXHRcdGNvbHVtblNlbGVjdG9yTWVudS5hdHRyKCdpZCcsIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkICsgJy1tZW51Jyk7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IGNvbHVtblNlbGVjdG9yQnV0dG9uO1xyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUgPSBjb2x1bW5TZWxlY3Rvck1lbnU7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUuZmluZCgndWwnKS5kYXRhKFwidGFibGVcIiwgdG9nZ2xlVGFibGUuZWxlbWVudC5hdHRyKCdpZCcpKTtcclxuXHJcblx0XHR0aGlzLmhlYWRlcnMuZWFjaChmdW5jdGlvbiAoKXtcclxuXHRcdFx0dmFyIGNoZWNrZWQgPSAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpID8gXCJjaGVja2VkXCIgOiBcIlwiO1xyXG5cdFx0XHQkKHRoaXMpLmRhdGEoJ3Zpc2libGUnLCAkKHRoaXMpLmRhdGEoXCJkZWZhdWx0XCIpKTtcclxuXHJcblx0XHRcdGNvbHVtblNlbGVjdG9yTWVudS5hcHBlbmQoJ1xcXHJcblx0XHRcdFx0PGxpIGNsYXNzPVwiZG90LW1lbnVfX2l0ZW0gZG90LW1lbnVfX2l0ZW0tLXBhZGRlZFwiPiBcXFxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNoZWNrYm94XCI+IFxcXHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNvbHVtbi10b2dnbGVcIiBpZD1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCIgdHlwZT1cImNoZWNrYm94XCIgJysgY2hlY2tlZCArJz4gXFxcclxuXHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImNvbHVtbi0nICsgJCh0aGlzKS50ZXh0KCkgKyAnXCI+JyArICQodGhpcykudGV4dCgpICsgJzwvbGFiZWw+IFxcXHJcblx0XHRcdFx0XHQ8L2Rpdj4gXFxcclxuXHRcdFx0XHQ8L2xpPicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuY29sdW1uLXRvZ2dsZVwiLCBmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKCcuY29sdW1uLXRvZ2dsZScpLmluZGV4KHRoaXMpO1xyXG5cdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnRvZ2dsZUNvbHVtbihpbmRleCwgdG9nZ2xlVGFibGUsICQodGhpcykucHJvcCgnY2hlY2tlZCcpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkNvbHVtblRvZ2dsZVRhYmxlID0gbmV3IENvbHVtblRvZ2dsZVRhYmxlKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0NSBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBBamF4RnVuY3Rpb25zID0gIGZ1bmN0aW9uIEFqYXhGdW5jdGlvbnMoKSB7fTtcclxuXHR3aW5kb3dbJ0FqYXhGdW5jdGlvbnMnXSA9IEFqYXhGdW5jdGlvbnM7XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0U0VBUkNIX0lOUFVUOiAnLnNlYXJjaC1pbnB1dCcsXHJcblx0XHRTRUFSQ0hfQ09OVEFJTkVSOiAnLnNlYXJjaC1jb250YWluZXInLFxyXG5cdFx0U0VBUkNIX0ZJTFRFUl9DT05UQUlORVI6ICcuc2VhcmNoLWZpbHRlci1jb250YWluZXInLFxyXG5cdFx0U0VBUkNIX0ZJTFRFUl9CVVRUT046ICcjc2VhcmNoLWZpbHRlci1idXR0b24nLFxyXG5cdFx0TE9HX0lOX0RJQUxPRzogJy5sb2dpbi5kaWFsb2cnLFxyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLktleXNfID0ge1xyXG5cdFx0U1BBQ0U6IDMyLFxyXG5cdFx0RU5URVI6IDEzLFxyXG5cdFx0Q09NTUE6IDQ1XHJcblx0fTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1c1xyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1cycsICBmdW5jdGlvbihlKXtcclxuXHRcdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LWZvY3VzJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXMgb3V0XHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3Vzb3V0JywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctMmRwJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFNFQVJDSFxyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0JVVFRPTikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gJChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQ09OVEFJTkVSKTtcclxuXHRcdHZhciBmaWx0ZXJCdXR0b24gPSAkKHRoaXMpO1xyXG5cclxuXHRcdGlmKGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG5cdFx0XHRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmaWx0ZXJCdXR0b24ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmaWx0ZXJCdXR0b24uYmx1cigpO1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHRjb250YWluZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRmaWx0ZXJCdXR0b24uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgICA2IEVkaXQgVG9waWNzIFtBZG1pbl1cclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRWRpdFRvcGljID0gZnVuY3Rpb24gRWRpdFRvcGljKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLm9yaWdpbmFsTmFtZSA9ICQoZWxlbWVudCkuZGF0YShcIm9yaWdpbmFsLXRvcGljLW5hbWVcIik7XHJcblx0XHR0aGlzLnRvcGljSWQgPSAkKGVsZW1lbnQpLmRhdGEoJ3RvcGljLWlkJyk7XHJcblx0XHR0aGlzLnRvcGljTmFtZUlucHV0ID0gJChlbGVtZW50KS5maW5kKCdpbnB1dCcpO1xyXG5cdFx0dGhpcy5lZGl0QnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZWRpdC10b3BpYycpO1xyXG5cdFx0dGhpcy5kZWxldGVCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5kZWxldGUtdG9waWMnKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snRWRpdFRvcGljJ10gPSBFZGl0VG9waWM7XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdEVESVRfVE9QSUM6ICcuZWRpdC10b3BpYy1saXN0IC50b3BpYycsXHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRcdERFTEVURV9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRcdFBBVENIX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFx0TkVXX1RPUElDOiAnL3RvcGljcy8nXHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0XHRlZGl0VG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0XHRpZih0b3BpYy5vcmlnaW5hbE5hbWUgPT0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCkpe1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHRcdHRpdGxlOiAnQ2hhbmdlIFRvcGljIE5hbWUnLFxyXG5cdFx0XHRcdHR5cGU6ICdibHVlJyxcclxuXHRcdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIHRvcGljIG5hbWUgZnJvbSA8Yj5cIicgKyAgdG9waWMub3JpZ2luYWxOYW1lICsgJ1wiPC9iPiB0byA8Yj5cIicgKyAgdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCkgKydcIjwvYj4/JyxcclxuXHRcdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0XHRjb25maXJtOiB7XHJcblx0XHRcdFx0XHRcdGJ0bkNsYXNzOiAnYnRuLWJsdWUnLFxyXG5cdFx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHRcdFx0XHRcdFx0XHQkKCcubG9hZGVyJywgdG9waWMuZWxlbWVudCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQQVRDSCcsXHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfbmFtZSA6IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCdFZGl0Jyk7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy5vcmlnaW5hbE5hbWUgPSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGNhbmNlbDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRkZWxldGVUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRcdCQuY29uZmlybSh7XHJcblx0XHRcdFx0dGl0bGU6ICdEZWxldGUnLFxyXG5cdFx0XHRcdHR5cGU6ICdyZWQnLFxyXG5cdFx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSA8Yj5cIicgKyAgdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCkgKyAnXCI8L2I+PycsXHJcblx0XHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdFx0ZGVsZXRlOiB7XHJcblx0XHRcdFx0XHRcdGJ0bkNsYXNzOiAnYnRuLXJlZCcsXHJcblx0XHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWMuZWxlbWVudC5oaWRlKGNvbmZpZy5hbmltdGlvbnMuc2xvdywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG9waWMucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Y3JlYXRlRWRpdFRvcGljRE9NOiBmdW5jdGlvbih0b3BpY0lkLCBvcmlnaW5hbE5hbWUpe1xyXG5cdFx0XHQkKFwiLmVkaXQtdG9waWMtbGlzdFwiKS5wcmVwZW5kKCc8bGkgY2xhc3M9XCJ0b3BpY1wiIGRhdGEtdG9waWMtaWQ9XCInICsgdG9waWNJZCArJ1wiIGRhdGEtb3JpZ2luYWwtdG9waWMtbmFtZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48aW5wdXQgc3BlbGxjaGVjaz1cInRydWVcIiBuYW1lPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBlZGl0LXRvcGljXCIgdHlwZT1cInN1Ym1pdFwiPkVkaXQ8L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRlbGV0ZS10b3BpYyBidXR0b24tLWRhbmdlclwiPkRlbGV0ZTwvYnV0dG9uPjwvbGk+Jyk7XHJcblx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBlZGl0VG9waWMgPSB0aGlzO1xyXG5cdFx0dGhpcy5lZGl0QnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZWRpdFRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHRcdHRoaXMuZGVsZXRlQnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5mdW5jdGlvbnMuZGVsZXRlVG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkVESVRfVE9QSUMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuRWRpdFRvcGljID0gbmV3IEVkaXRUb3BpYyh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDcgRG90TWVudVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBEb3RNZW51ID0gZnVuY3Rpb24gTWVudShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmJ1dHRvbiA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLm1lbnUgPSBudWxsO1xyXG5cdFx0dGhpcy5pc1RhYmxlRG90TWVudSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERPVF9NRU5VOiAnLmRvdC1tZW51JyxcclxuXHRcdEFDVElWQVRPUjogJy5kb3QtbWVudV9fYWN0aXZhdG9yJyxcclxuXHRcdElTX1ZJU0lCTEU6ICcuaXMtdmlzaWJsZScsXHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZScsXHJcblx0XHRCT1RUT01fTEVGVDogJ2RvdC1tZW51LS1ib3R0b20tbGVmdCcsXHJcblx0XHRCT1RUT01fUklHSFQ6ICdkb3QtbWVudS0tYm90dG9tLXJpZ2h0JyxcclxuXHRcdFRPUF9MRUZUOiAnZG90LW1lbnUtLXRvcC1sZWZ0JyxcclxuXHRcdFRPUF9SSUdIVDogJ2RvdC1tZW51LS10b3AtcmlnaHQnLFxyXG5cdFx0VEFCTEVfRE9UX01FTlU6ICdkb3QtbWVudS0tdGFibGUnXHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBidXR0b25SZWN0ID0gdGhpcy5idXR0b25bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX0xFRlQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCBsZWZ0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX0xFRlQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5yaWdodCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICdib3R0b20gcmlnaHQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfUklHSFQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC50b3AgLSAxNTApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICdib3R0b20gbGVmdCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RvcCcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcblx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZCh0aGlzKSgpO1xyXG5cdFx0dGhpcy5tZW51LmFkZENsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdFx0dGhpcy5tZW51LnNob3coKTtcclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5tZW51LnJlbW92ZUNsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdFx0dGhpcy5tZW51LmhpZGUoKTtcclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQodGhpcykoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLnNob3cuYmluZCh0aGlzKSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBkb3RNZW51ID0gdGhpcztcclxuXHRcdHZhciBtZW51SWQgPSAkKHRoaXMuYnV0dG9uKS5hdHRyKCdpZCcpICsgJy1tZW51JztcclxuXHJcblx0XHR0aGlzLm1lbnUgPSAkKCcjJyArIG1lbnVJZCk7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gdGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLlRBQkxFX0RPVF9NRU5VKTtcclxuXHJcblx0XHR0aGlzLmJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLnRvZ2dsZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihkb3RNZW51Lm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihkb3RNZW51Lm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSkpe1xyXG5cdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRpZighdGFyZ2V0LmlzKGRvdE1lbnUubWVudSkgfHwgIXRhcmdldC5pcyhkb3RNZW51LmJ1dHRvbikpIHtcclxuXHRcdFx0XHRpZighJC5jb250YWlucygkKGRvdE1lbnUubWVudSlbMF0sIGUudGFyZ2V0KSl7XHJcblx0XHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5oaWRlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkFDVElWQVRPUikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5Eb3RNZW51ID0gbmV3IERvdE1lbnUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT1cclxuXHRcdDUuIFNlY29uZCBNYXJrZXJcclxuXHQgICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0dmFyIE1hcmtlciA9IGZ1bmN0aW9uIE1hcmtlcigpIHtcclxuXHRcdGlmKCQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpLmxlbmd0aCA8IDEgfHwgJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIikubGVuZ3RoIDwgMSl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHRcdHRoaXMuc3R1ZGVudFRhYmxlID0gJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIik7XHJcblx0XHR0aGlzLnN0dWRlbnREYXRhVGFibGUgPSB0aGlzLnN0dWRlbnRUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpO1xyXG5cdFx0dGhpcy5zdXBlcnZpc29yRGF0YVRhYmxlID0gdGhpcy5zdXBlcnZpc29yVGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5VcmxzXyA9IHtcclxuXHRcdEFTU0lHTl9NQVJLRVI6ICcvYWRtaW4vbWFya2VyLWFzc2lnbicsXHJcblx0fTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50ID0gZnVuY3Rpb24oc3R1ZGVudFJvd0RPTSwgbWFya2VyKXtcclxuXHRcdHZhciByb3cgPSAkKHN0dWRlbnRSb3dET00pO1xyXG5cclxuXHRcdG1hcmtlci51bnNlbGVjdEFsbChtYXJrZXIpO1xyXG5cdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gJChyb3cpO1xyXG5cclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQodGhpcykuZGF0YSgnbWFya2VyLWlkJykgPT0gcm93LmRhdGEoJ3N1cGVydmlzb3ItaWQnKSl7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yID0gZnVuY3Rpb24oc3VwZXJ2aXNvclJvd0RPTSwgbWFya2VyKXtcclxuXHRcdHZhciByb3cgPSAkKHN1cGVydmlzb3JSb3dET00pO1xyXG5cclxuXHRcdGlmKHJvdy5hdHRyKCdkaXNhYmxlZCcpKXtyZXR1cm47fVxyXG5cclxuXHRcdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgIT0gbnVsbCl7XHJcblx0XHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gcm93O1xyXG5cdFx0XHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2coXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LW5hbWUnKSxcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N1cGVydmlzb3ItbmFtZScpLFxyXG5cdFx0XHRcdHJvdy5kYXRhKCdtYXJrZXItbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUucmVzZXRWaWV3ID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUudW5zZWxlY3RBbGwgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbihzdHVkZW50TmFtZSwgc3VwZXJ2aXNvck5hbWUsIG1hcmtlck5hbWUsIHByb2plY3Qpe1xyXG5cdFx0JChcIiNzdHVkZW50LW5hbWVcIikudGV4dChzdHVkZW50TmFtZSk7XHJcblx0XHQkKFwiI3N1cGVydmlzb3ItbmFtZVwiKS50ZXh0KHN1cGVydmlzb3JOYW1lKTtcclxuXHRcdCQoXCIjbWFya2VyLW5hbWVcIikudGV4dChtYXJrZXJOYW1lKTtcclxuXHJcblx0XHQkKFwiI3Byb2plY3QtdGl0bGVcIikuaHRtbCgnPGI+VGl0bGU6IDwvYj4nICsgcHJvamVjdFsndGl0bGUnXSk7XHJcblx0XHQkKFwiI3Byb2plY3QtZGVzY3JpcHRpb25cIikuaHRtbCgnPGI+RGVzY3JpcHRpb246IDwvYj4nICsgcHJvamVjdFsnZGVzY3JpcHRpb24nXSk7XHJcblxyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93RGlhbG9nKCk7XHJcblx0fVxyXG5cclxuXHQkKCcjc3VibWl0QXNzaWduTWFya2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB3aW5kb3dbJ01hcmtlciddO1xyXG5cclxuXHRcdGlmKG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPT0gbnVsbCB8fCBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yID09IG51bGwpe1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHR2YXIgcHJvamVjdElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JylbJ2lkJ107XHJcblx0XHR2YXIgc3R1ZGVudElkID0gbWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdHVkZW50LWlkJyk7XHJcblx0XHR2YXIgbWFya2VySWQgPSBtYXJrZXIuc2VsZWN0ZWRTdXBlcnZpc29yLmRhdGEoJ21hcmtlci1pZCcpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGU6IFwiUEFUQ0hcIixcclxuXHRcdFx0dXJsOiBtYXJrZXIuVXJsc18uQVNTSUdOX01BUktFUixcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZCxcclxuXHRcdFx0XHRzdHVkZW50X2lkOiBzdHVkZW50SWQsXHJcblx0XHRcdFx0bWFya2VyX2lkOiBtYXJrZXJJZCxcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5yZW1vdmUoKTtcclxuXHRcdFx0bWFya2VyLnJlc2V0VmlldyhtYXJrZXIpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbWFya2VyID0gdGhpcztcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQodGhpcywgbWFya2VyKTsgfSk7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdXBlcnZpc29yKHRoaXMsIG1hcmtlcik7IH0pO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdHdpbmRvd1snTWFya2VyJ10gPSBuZXcgTWFya2VyKCk7XHJcblx0fVxyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=