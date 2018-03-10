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
					content: 'All HTML 5 elements are valid for the description field, excluding; <br><br> <ul><li>Script tags</li><li>Heading tags</li></ul>'
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
			$(this).animate({
				opacity: 1
			}, 400);

			$(this).addClass("slideInUp animated");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTQ2YzcyMzZlYTBjYTY1NjQwNGQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIm9uIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVxIiwiZGF0YSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpbmRleCIsInZhbHVlIiwiaXMiLCJwcm9wIiwic2V0VGltZW91dCIsImUiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInJlbW92ZUNsYXNzIiwiaGlkZSIsImFmdGVyIiwiY3NzIiwiYWpheCIsInVybCIsInR5cGUiLCJzZXJpYWxpemUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJzaGFyZV9uYW1lIiwic2hvd05vdGlmaWNhdGlvbiIsIkFqYXhGdW5jdGlvbnMiLCJwcm90b3R5cGUiLCJTZWxlY3RvcnNfIiwiTE9HX0lOX0RJQUxPRyIsImRpYWxvZyIsInNob3dMb2FkZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhpZGVMb2FkZXIiLCJzaG93IiwiYWRkQ2xhc3MiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsInN2Z0NvbnRhaW5lciIsInN2ZyIsInByb2plY3RJZCIsIndpbmRvdyIsImFjdGlvbiIsImFqYXhVcmwiLCJwcm9qZWN0X2lkIiwiZHJvcGRvd24iLCJjb250ZW50IiwibWVkaXVtIiwicmVzdWx0IiwiYnV0dG9uc0h0bWwiLCJwcmV2aWV3SHRtbCIsImluc2VydEF0Q2FyZXQiLCJ3cmFwVGV4dFdpdGhUYWciLCJpbnB1dFVybCIsInByb21wdCIsImlucHV0QWx0IiwiaW5wdXRUZXh0IiwidGhlbWUiLCJlc2NhcGVLZXkiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsInRpdGxlIiwiZGVsYXkiLCJhbmltYXRlIiwib3BhY2l0eSIsImJpbmQiLCJkb2N1bWVudCIsImFqYXhFcnJvciIsImV2ZW50IiwicmVxdWVzdCIsInNldHRpbmdzIiwic2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbiIsIk1vYmlsZU1lbnUiLCJlbGVtZW50IiwiYWN0aXZhdG9yIiwiSEFNQlVSR0VSX0NPTlRBSU5FUiIsInVuZGVybGF5IiwiVU5ERVJMQVkiLCJpbml0IiwibG9nIiwiQ3NzQ2xhc3Nlc18iLCJJU19WSVNJQkxFIiwiTU9CSUxFX01FTlUiLCJvcGVuTWVudSIsImNsb3NlTWVudSIsIm1vYmlsZU1lbnUiLCJpbml0QWxsIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImhlYWRlciIsIkRJQUxPR19IRUFERVIiLCJESUFMT0dfQ09OVEVOVCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwicHVzaCIsImVyciIsInJlYWR5Iiwia2V5ZG93biIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJzZWxlY3RBbGxSb3dzIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJDb2x1bW5Ub2dnbGVUYWJsZSIsImhlYWQiLCJzZWxlY3Rvck1lbnUiLCJzZWxlY3RvckJ1dHRvbiIsIlRPR0dMRV9UQUJMRSIsIkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04iLCJDT0xVTU5fU0VMRUNUT1JfTUVOVSIsInRvZ2dsZUNvbHVtbiIsImNvbHVtbkluZGV4IiwidGFibGUiLCJjaGVja2VkIiwiY2hpbGRyZW4iLCJyZW1vdmVBdHRyIiwicmVmcmVzaCIsImhpZGVJbmRpY2VzIiwicmVmcmVzaEFsbCIsInRvZ2dsZVRhYmxlIiwiY29sdW1uU2VsZWN0b3JCdXR0b24iLCJjb2x1bW5TZWxlY3Rvck1lbnUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCIsIlNFQVJDSF9JTlBVVCIsIlNFQVJDSF9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQlVUVE9OIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwiY29uZmlybSIsImljb24iLCJidXR0b25zIiwiYnRuQ2xhc3MiLCJtZXRob2QiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJjYW5jZWwiLCJkZWxldGVUb3BpYyIsImRlbGV0ZSIsInNsb3ciLCJyZW1vdmUiLCJEb3RNZW51IiwiTWVudSIsImJ1dHRvbiIsIm1lbnUiLCJpc1RhYmxlRG90TWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIlRBQkxFX0RPVF9NRU5VIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImxlZnQiLCJwYXJzZUludCIsInRvcCIsInJpZ2h0IiwidG9nZ2xlIiwiZG90TWVudSIsIm1lbnVJZCIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNvbnRhaW5zIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0Iiwic3R1ZGVudElkIiwibWFya2VySWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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O0FBa0NBVixRQUFPNUwsU0FBUCxDQUFpQjRELElBQWpCLEdBQXdCLFlBQVU7QUFDakMsTUFBSTBJLFNBQVMsSUFBYjtBQUNBalEsSUFBRWlRLE9BQU9OLGdCQUFQLENBQXdCdkcsUUFBMUIsRUFBb0M1SCxFQUFwQyxDQUF1QyxPQUF2QyxFQUFnRCxZQUFXO0FBQUUrTixVQUFPNUwsU0FBUCxDQUFpQm9NLGFBQWpCLENBQStCLElBQS9CLEVBQXFDRSxNQUFyQztBQUErQyxHQUE1RztBQUNBalEsSUFBRWlRLE9BQU9KLG1CQUFQLENBQTJCekcsUUFBN0IsRUFBdUM1SCxFQUF2QyxDQUEwQyxPQUExQyxFQUFtRCxZQUFXO0FBQUUrTixVQUFPNUwsU0FBUCxDQUFpQndNLGdCQUFqQixDQUFrQyxJQUFsQyxFQUF3Q0YsTUFBeEM7QUFBa0QsR0FBbEg7QUFDQSxFQUpEOztBQU1BVixRQUFPNUwsU0FBUCxDQUFpQm9FLE9BQWpCLEdBQTJCLFlBQVU7QUFDcEM3QyxTQUFPLFFBQVAsSUFBbUIsSUFBSXFLLE1BQUosRUFBbkI7QUFDQSxFQUZEOztBQUlBdEksWUFBV3RELFNBQVgsQ0FBcUJvRSxPQUFyQjtBQUNBQyxRQUFPckUsU0FBUCxDQUFpQm9FLE9BQWpCO0FBQ0FvQixXQUFVeEYsU0FBVixDQUFvQm9FLE9BQXBCO0FBQ0FzQyxtQkFBa0IxRyxTQUFsQixDQUE0Qm9FLE9BQTVCO0FBQ0FyRCxXQUFVZixTQUFWLENBQW9Cb0UsT0FBcEI7QUFDQXdILFFBQU81TCxTQUFQLENBQWlCb0UsT0FBakI7QUFDQThGLFNBQVFsSyxTQUFSLENBQWtCb0UsT0FBbEI7QUFDQSxDQW55QkEsRSIsImZpbGUiOiJcXGpzXFxtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTQ2YzcyMzZlYTBjYTY1NjQwNGQiLCIvKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58ICBcdDEuIEFKQVggU2V0dXBcclxufFx0Mi4gSFRNTCBNb2RpZmljYXRpb25zXHJcbnxcdDMuIE90aGVyXHJcbnxcclxuKi9cclxuXHJcbmltcG9ydCAnLi4vanMvY29tcG9uZW50cyc7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuOyQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDEuIEFKQVggU2V0dXBcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0JC5hamF4U2V0dXAoe1xyXG5cdFx0aGVhZGVyczoge1xyXG5cdFx0XHQnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKSxcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0aWYoJCgnLnNob3ctLXNjcm9sbC10by10b3AnKS5sZW5ndGggPiAwKXtcclxuXHRcdCQoJy5tYWluLWNvbnRlbnQnKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgYnV0dG9uLS1hY2NlbnQgc2Nyb2xsLXRvLXRvcFwiPlNjcm9sbCB0byBUb3A8L2J1dHRvbj4nKTtcclxuXHR9XHJcblxyXG5cdC8vIEFjY2Vzc2liaWxpdHlcclxuXHQkKCcuZHJvcGRvd24nKS5hdHRyKCd0YWJpbmRleCcsICcwJyk7XHJcblx0JCgnLmRyb3Bkb3duID4gYnV0dG9uJykuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcclxuXHQkKCcuZHJvcGRvd24gLmRyb3Bkb3duLWNvbnRlbnQgYScpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHJcblx0Ly8gTWFrZXMgcHJpbWFyeSB0b3BpYyBmaXJzdFxyXG5cdCQoJy50b3BpY3MtbGlzdCcpLnByZXBlbmQoJCgnLmZpcnN0JykpO1xyXG5cdCQoJy50b3BpY3MtbGlzdCAubG9hZGVyJykuZmFkZU91dCgwKTtcclxuXHQkKCcudG9waWNzLWxpc3QgbGknKS5maXJzdCgpLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIGZ1bmN0aW9uIHNob3dOZXh0VG9waWMoKSB7XHJcblx0XHQkKHRoaXMpLm5leHQoIFwiLnRvcGljcy1saXN0IGxpXCIgKS5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0LCBzaG93TmV4dFRvcGljKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLm9yZGVyLWxpc3QtanMnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGxpc3QgPSAkKHRoaXMpO1xyXG5cdFx0Ly8gc29ydFVub3JkZXJlZExpc3QobGlzdCk7XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnbGFzdC1uYW1lLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRMYXN0TmFtZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYobGlzdC5oYXNDbGFzcygnYWxwaGEtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZEFscGhhSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCd0aXRsZS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkVGl0bGVIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQgMy4gT1RIRVJcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09ICovXHJcblx0JChcImJvZHlcIikub24oXCJjaGFuZ2VcIiwgXCIuZW1haWwtdGFibGUgLmNoZWNrYm94IGlucHV0XCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGVjdCA9IGZ1bmN0aW9uKGRvbSl7XHJcblx0XHRcdHZhciBzdGF0dXMgPSBkb20ucGFyZW50cygpLmVxKDQpLmRhdGEoJ3N0YXR1cycpO1xyXG5cdFx0XHR2YXIgZW1haWxTdHJpbmcgPSBcIm1haWx0bzpcIjtcclxuXHRcdFx0dmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmVtYWlsLXRhYmxlLicgKyBzdGF0dXMgKyAnIC5jaGVja2JveCBpbnB1dCc7XHJcblx0XHRcdHZhciBlbWFpbEJ1dHRvbnNlbGVjdG9yID0gXCIuZW1haWwtc2VsZWN0ZWQuXCIgKyBzdGF0dXM7XHJcblxyXG5cdFx0XHQkKGNoZWNrYm94U2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRcdFx0aWYoJCh2YWx1ZSkuaXMoXCI6Y2hlY2tlZFwiKSAmJiAhJCh2YWx1ZSkuaGFzQ2xhc3MoXCJtYXN0ZXItY2hlY2tib3hcIikpIHtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9ICQodmFsdWUpLmRhdGEoJ2VtYWlsJyk7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSBcIixcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKGVtYWlsQnV0dG9uc2VsZWN0b3IpLnByb3AoJ2hyZWYnLCBlbWFpbFN0cmluZyk7XHJcblx0XHR9O1xyXG5cdFx0c2V0VGltZW91dChzZWxlY3QoJCh0aGlzKSksIDIwMDApO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmVtYWlsLXNlbGVjdGVkXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicgfHwgJCh0aGlzKS5wcm9wKCdocmVmJykgPT09IG51bGwpe1xyXG5cdFx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5leHRlcm5hbC1saW5rXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHRcdHZhciBlbGVtVG9SZXBsYWNlID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8tcmVwbGFjZS13aXRoLWxvYWRlci1zZWxlY3RvcicpKTtcclxuXHJcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRlbGVtVG9IaWRlU2VsZWN0b3IuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudC1yZXBsYWNlZC1jb250YWluZXJcIiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHJcblx0XHQkKCcjY29udGVudC1yZXBsYWNlZC1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIiNzaGFyZS1wcm9qZWN0LWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG5cdFx0XHRcdGlmKHJlc3BvbnNlLnNoYXJlX25hbWUpe1xyXG5cdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignc3VjY2VzcycsICdZb3VyIG5hbWUgaXMgYmVpbmcgc2hhcmVkIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNob3dOb3RpZmljYXRpb24oJycsICdZb3UgYXJlIG5vIGxvbmdlciBzaGFyaW5nIHlvdXIgbmFtZSB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKCcjc2hhcmVfbmFtZScpLnByb3AoJ2NoZWNrZWQnLCByZXNwb25zZS5zaGFyZV9uYW1lKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JCgnLmhlbHAtYmxvY2snLCAnI2xvZ2luRm9ybScpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5oaWRlKCk7XHJcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKHRydWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnNob3coKTtcclxuXHRcdFx0XHQkKCcjbG9naW4tdXNlcm5hbWUnLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmFkZENsYXNzKFwiaGFzLWVycm9yXCIpO1xyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS50ZXh0KGRhdGFbXCJyZXNwb25zZUpTT05cIl1bXCJlcnJvcnNcIl1bXCJ1c2VybmFtZVwiXVswXSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcjbmV3LXRvcGljLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciBzdWJtaXRCdXR0b24gPSAkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKTtcclxuXHRcdHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHQkKCcubG9hZGVyJywgc3VibWl0QnV0dG9uKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRjb250ZXh0OiAkKHRoaXMpLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zLmNyZWF0ZUVkaXRUb3BpY0RPTShkYXRhW1wiaWRcIl0sIGRhdGFbXCJuYW1lXCJdKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0XHRcdCQodGhpcykuZmluZCgnOnN1Ym1pdCcpLmh0bWwoJ0FkZCcpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8vIE5FVyBVU0VSXHJcblx0Ly8gcHV0IHRoaXMgc3R1ZmYgaW4gYW4gYXJyYXlcclxuXHQvLyAkKCcjc3VwZXJ2aXNvci1mb3JtJykuaGlkZSgpO1xyXG5cdC8vICQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblxyXG5cdC8vICQoJyNjcmVhdGUtZm9ybS1hY2Nlc3Mtc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0Ly8gXHRpZigkKCcubmV3LXVzZXItc3R1ZGVudCcpLmlzKFwiOnNlbGVjdGVkXCIpKSB7XHJcblx0Ly8gXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5zaG93KCk7XHJcblx0Ly8gXHR9IGVsc2Uge1xyXG5cdC8vIFx0XHQkKCcjc3R1ZGVudC1mb3JtJykuaGlkZSgpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIFx0aWYoJCgnI3N1cGVydmlzb3Itb3B0aW9uJykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHQvLyBcdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLnNob3coKTtcclxuXHQvLyBcdH0gZWxzZSB7XHJcblx0Ly8gXHRcdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gfSk7XHJcblxyXG5cdCQoXCIuZmF2b3VyaXRlLWNvbnRhaW5lclwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzdmdDb250YWluZXIgPSAkKHRoaXMpO1xyXG5cdFx0dmFyIHN2ZyA9IHN2Z0NvbnRhaW5lci5maW5kKCdzdmcnKTtcclxuXHRcdHZhciBwcm9qZWN0SWQgPSB3aW5kb3dbJ3Byb2plY3QnXS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblxyXG5cdFx0c3ZnLmhpZGUoMCk7XHJcblx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5zaG93KDApO1xyXG5cclxuXHRcdGlmKHN2Zy5oYXNDbGFzcygnZmF2b3VyaXRlJykpe1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ3JlbW92ZSc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9yZW1vdmUtZmF2b3VyaXRlJztcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ2FkZCc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9hZGQtZmF2b3VyaXRlJztcclxuXHRcdH1cclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoYWN0aW9uID09IFwiYWRkXCIpe1xyXG5cdFx0XHRcdFx0c3ZnLmFkZENsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3ZnLnJlbW92ZUNsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdHN2Zy5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0KTtcclxuXHRcdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCduYXYubW9iaWxlIC5zdWItZHJvcGRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGRyb3Bkb3duID0gJCh0aGlzKTtcclxuXHRcdHZhciBjb250ZW50ID0gZHJvcGRvd24uZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKTtcclxuXHJcblx0XHRpZihkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiKSA9PSBcInRydWVcIil7XHJcblx0XHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcclxuXHRcdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMGRlZylcIik7XHJcblx0XHRcdGRyb3Bkb3duLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRjb250ZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5tZWRpdW0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIGZhbHNlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigxODBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5zaG93KGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cdCQoJy5odG1sLWVkaXRvcicpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKXtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJy9zbmlwcGV0P3NuaXBwZXQ9aHRtbC1lZGl0b3ItdG9vbGJhcicsXHJcblx0XHRcdHR5cGU6J0dFVCcsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzdWx0KXtcclxuXHRcdFx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykuYWZ0ZXIocmVzdWx0KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBidXR0b25zSHRtbCA9IFwiPGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXRvcC1idXR0b25zIGZsZXgnPjxidXR0b24gY2xhc3M9J2h0bWwnIHR5cGU9J2J1dHRvbic+SFRNTDwvYnV0dG9uPjxidXR0b24gY2xhc3M9J3ByZXZpZXcnIHR5cGU9J2J1dHRvbic+UFJFVklFVzwvYnV0dG9uPjwvZGl2PlwiO1xyXG5cdFx0dmFyIHByZXZpZXdIdG1sID0gXCI8ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInPjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS1wcmV2aWV3Jz48L2Rpdj48L2Rpdj5cIjtcclxuXHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykuYmVmb3JlKGJ1dHRvbnNIdG1sKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvcicpLmFmdGVyKHByZXZpZXdIdG1sKTtcclxuXHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3JykuaHRtbCgkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykudmFsKCkpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXcnKS5odG1sKCQodGhpcykudmFsKCkpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuaHRtbC1lZGl0b3ItLXRvcC1idXR0b25zIC5odG1sJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5zaG93KCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXRvb2xiYXInKS5zaG93KCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuaHRtbC1lZGl0b3ItLXRvcC1idXR0b25zIC5wcmV2aWV3Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXRvb2xiYXInKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJykuc2hvdygpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBUb2dnbGUgbGFiZWwgZmxpcHMgdG9nZ2xlXHJcblx0JChcIi5odG1sLWVkaXRvclwiKS5vbihcImNsaWNrXCIsIFwiLmh0bWwtZWRpdG9yLS10b29sYmFyIGxpIGJ1dHRvblwiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0c3dpdGNoKCQodGhpcykuZGF0YSgndHlwZScpKXtcclxuXHRcdFx0Y2FzZSBcImxpbmVicmVha1wiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8YnI+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwib2xcIjpcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnXFxuPG9sPlxcblxcdDxsaT5JdGVtIDE8L2xpPlxcblxcdDxsaT5JdGVtIDI8L2xpPlxcblxcdDxsaT5JdGVtIDM8L2xpPlxcbjwvb2w+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidWxcIjpcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnXFxuPHVsPlxcblxcdDxsaT5JdGVtIHg8L2xpPlxcblxcdDxsaT5JdGVtIHk8L2xpPlxcblxcdDxsaT5JdGVtIHo8L2xpPlxcbjwvdWw+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiYm9sZFwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ2InKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ0dFwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3R0Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiaXRhbGljXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnaScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInVuZGVybGluZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3UnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpbWdcIjpcclxuXHRcdFx0XHR2YXIgaW5wdXRVcmwgPSBwcm9tcHQoXCJFbnRlciB0aGUgaW1hZ2UgVVJMXCIsIFwiaHR0cHM6Ly93d3cuXCIpO1xyXG5cdFx0XHRcdHZhciBpbnB1dEFsdCA9IHByb21wdChcIkVudGVyIGFsdCB0ZXh0XCIsIFwiSW1hZ2Ugb2YgU3Vzc2V4IGNhbXB1c1wiKTtcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGltZyBhbHQ9XCInICsgaW5wdXRBbHQgKyAnXCIgc3JjPVwiJyArIGlucHV0VXJsICsgJ1wiPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImxpbmtcIjpcclxuXHRcdFx0XHR2YXIgaW5wdXRVcmwgPSBwcm9tcHQoXCJFbnRlciB0aGUgVVJMXCIsIFwiaHR0cHM6Ly93d3cuXCIpO1xyXG5cdFx0XHRcdHZhciBpbnB1dFRleHQgPSBwcm9tcHQoXCJFbnRlciBkaXNwbGF5IHRleHRcIiwgXCJTdXNzZXhcIik7XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxhIGhyZWY9XCInICsgaW5wdXRVcmwgKyAnXCI+JyArIGlucHV0VGV4dCArICc8L2E+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiY29kZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ2NvZGUnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJwcmVcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdwcmUnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpbmZvXCI6XHJcblx0XHRcdFx0JC5kaWFsb2coe1xyXG5cdFx0XHRcdFx0dGhlbWU6ICdtYXRlcmlhbCcsXHJcblx0XHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdIVE1MIEVkaXRvciBJbmZvJyxcclxuXHRcdFx0XHRcdGNvbnRlbnQ6ICdBbGwgSFRNTCA1IGVsZW1lbnRzIGFyZSB2YWxpZCBmb3IgdGhlIGRlc2NyaXB0aW9uIGZpZWxkLCBleGNsdWRpbmc7IDxicj48YnI+IDx1bD48bGk+U2NyaXB0IHRhZ3M8L2xpPjxsaT5IZWFkaW5nIHRhZ3M8L2xpPjwvdWw+JyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09XHJcblx0XHQ5LiBJbml0aWFsaXNlXHJcblx0ICAgPT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8vIFVzZWQgYXMgYW4gZWFzeSB3YXkgZm9yIGZ1bmN0aW9ucyB0byBnZXQgY3VycmVudCBwcm9qZWN0IGRhdGFcclxuXHRpZigkKCcucHJvamVjdC1jYXJkJykubGVuZ3RoID4gMCl7XHJcblx0XHR3aW5kb3dbJ3Byb2plY3QnXSA9ICQoJy5wcm9qZWN0LWNhcmQnKTtcclxuXHR9XHJcblxyXG5cdCQoJy5hbmltYXRlLWNhcmRzIC5jYXJkJykuY3NzKFwib3BhY2l0eVwiLCAwKTtcclxuXHJcblx0dmFyIGRlbGF5ID0gMDtcclxuXHQkKCcuYW5pbWF0ZS1jYXJkcyAuY2FyZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRkZWxheSArPSAyMDA7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQodGhpcykuYW5pbWF0ZSh7XHJcblx0XHRcdFx0b3BhY2l0eTogMVxyXG5cdFx0XHR9LDQwMCk7XHJcblxyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwic2xpZGVJblVwIGFuaW1hdGVkXCIpO1xyXG5cdFx0fS5iaW5kKHRoaXMpLCBkZWxheSk7XHJcblx0fSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkuYWpheEVycm9yKGZ1bmN0aW9uKCBldmVudCwgcmVxdWVzdCwgc2V0dGluZ3MgKSB7XHJcblx0aWYoY29uZmlnLnNob3dBamF4UmVxdWVzdEZhaWxOb3RpZmljYXRpb24pe1xyXG5cdFx0c2hvd05vdGlmaWNhdGlvbignZXJyb3InLCAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGF0IHJlcXVlc3QuJyk7XHJcblx0fVxyXG59KTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyIsIi8qIEZJTEUgU1RSVUNUVVJFXHJcblxyXG4qL1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgRklMRSBTVFJVQ1RVUkVcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufFx0MS4gTW9iaWxlIE1lbnVcclxufFx0Mi4gRGlhbG9nIC8gTW9kYWxcclxufFx0My4gRGF0YSBUYWJsZVxyXG58XHQ0LiBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcbnxcdDUuIEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxufFx0Ni4gRWRpdCBUb3BpY3MgW0FkbWluXVxyXG58XHQ3LiBNZW51XHJcbnxcclxuKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHQvKiA9PT09PT09PT09PT09PT09PT1cclxuXHRcdCAxLiBNb2JpbGUgTWVudVxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHRcdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIG1vYmlsZSBtZW51LlxyXG5cdFx0KlxyXG5cdFx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBNb2JpbGVNZW51ID0gIGZ1bmN0aW9uIE1vYmlsZU1lbnUoZWxlbWVudCkge1xyXG5cdFx0aWYod2luZG93WydNb2JpbGVNZW51J10gPT0gbnVsbCl7XHJcblx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddID0gdGhpcztcclxuXHRcdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdFx0dGhpcy5hY3RpdmF0b3IgPSAkKHRoaXMuU2VsZWN0b3JzXy5IQU1CVVJHRVJfQ09OVEFJTkVSKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheSA9ICQodGhpcy5TZWxlY3RvcnNfLlVOREVSTEFZKTtcclxuXHRcdFx0dGhpcy5pbml0KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlRoZXJlIGNhbiBvbmx5IGJlIG9uZSBtb2JpbGUgbWVudS5cIik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZSdcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0TU9CSUxFX01FTlU6ICduYXYubW9iaWxlJyxcclxuXHRcdEhBTUJVUkdFUl9DT05UQUlORVI6ICcuaGFtYnVyZ2VyLWNvbnRhaW5lcicsXHJcblx0XHRVTkRFUkxBWTogJy5tb2JpbGUtbmF2LXVuZGVybGF5J1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0XHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmNsb3NlTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG1vYmlsZU1lbnUgPSB0aGlzO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3Iub24oJ2NsaWNrJywgbW9iaWxlTWVudS5vcGVuTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHRcdHRoaXMudW5kZXJsYXkub24oJ2NsaWNrJywgbW9iaWxlTWVudS5jbG9zZU1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLk1PQklMRV9NRU5VKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLm1vYmlsZU1lbnUgPSBuZXcgTW9iaWxlTWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09XHJcblx0XHQyLiBEaWFsb2cgLyBNb2RhbFxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09ICovXHJcblx0dmFyIERpYWxvZyA9IGZ1bmN0aW9uIERpYWxvZyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5kaWFsb2dOYW1lID0gJChlbGVtZW50KS5kYXRhKCdkaWFsb2cnKTtcclxuXHRcdHRoaXMudW5kZXJsYXkgPSAkKCcudW5kZXJsYXknKTtcclxuXHRcdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHRcdHRoaXMuY29udGVudCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0NPTlRFTlQpO1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIENvbXBvbmVudFxyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwicmVnaXN0ZXJlZFwiKTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcInJvbGVcIiwgXCJkaWFsb2dcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtbGFiZWxsZWRieVwiLCBcImRpYWxvZy10aXRsZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImRpYWxvZy1kZXNjXCIpO1xyXG5cdFx0dGhpcy5oZWFkZXIuYXR0cigndGl0bGUnLCB0aGlzLmhlYWRlci5maW5kKCcjZGlhbG9nLWRlc2MnKS5odG1sKCkpO1xyXG5cclxuXHRcdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0XHR0aGlzLmxvYWRlciA9ICQoZWxlbWVudCkuZmluZChcIi5sb2FkZXJcIik7XHJcblx0XHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0QUNUSVZFOiAnYWN0aXZlJyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRcdERJQUxPR19IRUFERVI6ICcuaGVhZGVyJyxcclxuXHRcdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0xvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdFx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuc2hvdygwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHdpbmRvd1snRGlhbG9nJ10gPSB0aGlzO1xyXG5cdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlRGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuaXNDbG9zYWJsZSAmJiB0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiKSA9PSB0aGlzLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdC8vIE5lZWRlZCBmb3IgY29udGV4dFxyXG5cdFx0dmFyIGRpYWxvZyA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gRmluZCBhY3RpdmF0b3IgYnV0dG9uXHJcblx0XHQkKCdidXR0b24nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ2FjdGl2YXRvcicpICYmICQodGhpcykuZGF0YSgnZGlhbG9nJykgPT0gZGlhbG9nLmRpYWxvZ05hbWUpe1xyXG5cdFx0XHRcdGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zLnB1c2goJCh0aGlzKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFSSUFcclxuXHRcdGRpYWxvZy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRkaWFsb2cudW5kZXJsYXkub24oJ2NsaWNrJywgZGlhbG9nLmhpZGVEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHJcblx0XHR0cnl7XHJcblx0XHRcdCQoZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBkaWFsb2cuc2hvd0RpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2goZXJyKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkRpYWxvZyBcIiArIGRpYWxvZy5kaWFsb2dOYW1lICsgXCIgaGFzIG5vIGFjdGl2YXRvciBidXR0b24uXCIpO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkRJQUxPRykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5kaWFsb2cgPSBuZXcgRGlhbG9nKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydEaWFsb2cnXS5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0My4gRGF0YSBUYWJsZVxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLmZvb3RSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Zm9vdCB0cicpO1xyXG5cdFx0dGhpcy5yb3dzID0gJC5tZXJnZSh0aGlzLmJvZHlSb3dzLCB0aGlzLmZvb3RSb3dzKTtcclxuXHRcdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdFx0dGhpcy5tYXN0ZXJDaGVja2JveCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uTUFTVEVSX0NIRUNLQk9YKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snRGF0YVRhYmxlJ10gPSBEYXRhVGFibGU7XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICcuZGF0YS10YWJsZScsXHJcblx0XHRNQVNURVJfQ0hFQ0tCT1g6ICd0aGVhZCAubWFzdGVyLWNoZWNrYm94JyxcclxuXHRcdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRcdElTX1NFTEVDVEVEOiAnLmlzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0c2VsZWN0QWxsUm93czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKHRoaXMubWFzdGVyQ2hlY2tib3guaXMoJzpjaGVja2VkJykpe1xyXG5cdFx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHNlbGVjdFJvdzogZnVuY3Rpb24gKGNoZWNrYm94LCByb3cpIHtcclxuXHRcdFx0aWYgKHJvdykge1xyXG5cdFx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdFx0cm93LmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBkYXRhVGFibGUgPSB0aGlzO1xyXG5cclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3gub24oJ2NoYW5nZScsICQucHJveHkodGhpcy5mdW5jdGlvbnMuc2VsZWN0QWxsUm93cywgZGF0YVRhYmxlKSk7XHJcblxyXG5cdFx0JCh0aGlzLmNoZWNrYm94ZXMpLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0XHQkKHRoaXMpLm9uKCdjaGFuZ2UnLCAkLnByb3h5KGRhdGFUYWJsZS5mdW5jdGlvbnMuc2VsZWN0Um93LCB0aGlzLCAkKHRoaXMpLCBkYXRhVGFibGUuYm9keVJvd3MuZXEoaSkpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLkRBVEFfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZGF0YVRhYmxlID0gbmV3IERhdGFUYWJsZSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0NC4gQ29sdW1uIFRvZ2dsZSBUYWJsZVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBDb2x1bW5Ub2dnbGVUYWJsZSA9IGZ1bmN0aW9uIENvbHVtblRvZ2dsZVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWQgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyJyk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5zZWxlY3Rvck1lbnUgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RvckJ1dHRvbiA9IG51bGw7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0NvbHVtblRvZ2dsZVRhYmxlJ10gPSBDb2x1bW5Ub2dnbGVUYWJsZTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdFRPR0dMRV9UQUJMRTogJy50YWJsZS1jb2x1bW4tdG9nZ2xlJ1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdFx0Q09MVU1OX1NFTEVDVE9SX0JVVFRPTjogJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1yYWlzZWQgZG90LW1lbnVfX2FjdGl2YXRvclwiIHN0eWxlPVwiZGlzcGxheTpibG9jazttYXJnaW4tdG9wOjJyZW07bWFyZ2luLWxlZnQ6YXV0bztcIj5Db2x1bW5zPC9idXR0b24+JyxcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9NRU5VOiAnPHVsIGNsYXNzPVwiZG90LW1lbnUgZG90LW1lbnUtLWJvdHRvbS1sZWZ0XCI+PC91bD4nXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHJcblx0XHR0b2dnbGVDb2x1bW46IGZ1bmN0aW9uKGNvbHVtbkluZGV4LCB0YWJsZSwgY2hlY2tlZCkge1xyXG5cdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuYXR0cignaGlkZGVuJywgXCJ0cnVlXCIpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaDogZnVuY3Rpb24odGFibGUpIHtcclxuXHRcdFx0dmFyIGhpZGVJbmRpY2VzID0gW107XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cyA9IHRhYmxlLmVsZW1lbnQuZmluZCgndGJvZHkgdHInKTtcclxuXHJcblx0XHRcdHRhYmxlLmhlYWRlcnMuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKCQodGhpcykuYXR0cignaGlkZGVuJykpe1xyXG5cdFx0XHRcdFx0aGlkZUluZGljZXMucHVzaCgkKHRoaXMpLmluZGV4KCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoaWRlSW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGhpZGVJbmRpY2VzW2ldKS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaEFsbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoQ29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18uVE9HR0xFX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMucmVmcmVzaCh0aGlzLkNvbHVtblRvZ2dsZVRhYmxlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmKCF0aGlzLmVsZW1lbnQuYXR0cignaWQnKSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiQ29sdW1uVG9nZ2xlVGFibGUgcmVxdWlyZXMgdGhlIHRhYmxlIHRvIGhhdmUgYW4gdW5pcXVlIElELlwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0b2dnbGVUYWJsZSA9IHRoaXM7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JCdXR0b24gPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfQlVUVE9OKTtcclxuXHRcdHZhciBjb2x1bW5TZWxlY3Rvck1lbnUgPSAkKHRoaXMuSHRtbFNuaXBwZXRzXy5DT0xVTU5fU0VMRUNUT1JfTUVOVSk7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgPSAnQ29sdW1uVG9nZ2xlVGFibGUtJyArIHRvZ2dsZVRhYmxlLmVsZW1lbnQuYXR0cignaWQnKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuYmVmb3JlKGNvbHVtblNlbGVjdG9yQnV0dG9uKTtcclxuXHJcblx0XHRjb2x1bW5TZWxlY3RvckJ1dHRvbi5hZnRlcihjb2x1bW5TZWxlY3Rvck1lbnUpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCk7XHJcblx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXR0cignaWQnLCBjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCArICctbWVudScpO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBjb2x1bW5TZWxlY3RvckJ1dHRvbjtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gY29sdW1uU2VsZWN0b3JNZW51O1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51LmZpbmQoJ3VsJykuZGF0YShcInRhYmxlXCIsIHRvZ2dsZVRhYmxlLmVsZW1lbnQuYXR0cignaWQnKSk7XHJcblxyXG5cdFx0dGhpcy5oZWFkZXJzLmVhY2goZnVuY3Rpb24gKCl7XHJcblx0XHRcdHZhciBjaGVja2VkID0gJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSA/IFwiY2hlY2tlZFwiIDogXCJcIjtcclxuXHRcdFx0JCh0aGlzKS5kYXRhKCd2aXNpYmxlJywgJCh0aGlzKS5kYXRhKFwiZGVmYXVsdFwiKSk7XHJcblxyXG5cdFx0XHRjb2x1bW5TZWxlY3Rvck1lbnUuYXBwZW5kKCdcXFxyXG5cdFx0XHRcdDxsaSBjbGFzcz1cImRvdC1tZW51X19pdGVtIGRvdC1tZW51X19pdGVtLS1wYWRkZWRcIj4gXFxcclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjaGVja2JveFwiPiBcXFxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJjb2x1bW4tdG9nZ2xlXCIgaWQ9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiIHR5cGU9XCJjaGVja2JveFwiICcrIGNoZWNrZWQgKyc+IFxcXHJcblx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJjb2x1bW4tJyArICQodGhpcykudGV4dCgpICsgJ1wiPicgKyAkKHRoaXMpLnRleHQoKSArICc8L2xhYmVsPiBcXFxyXG5cdFx0XHRcdFx0PC9kaXY+IFxcXHJcblx0XHRcdFx0PC9saT4nKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoXCJib2R5XCIpLm9uKFwiY2hhbmdlXCIsIFwiLmNvbHVtbi10b2dnbGVcIiwgZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCgnLmNvbHVtbi10b2dnbGUnKS5pbmRleCh0aGlzKTtcclxuXHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy50b2dnbGVDb2x1bW4oaW5kZXgsIHRvZ2dsZVRhYmxlLCAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSA9IG5ldyBDb2x1bW5Ub2dnbGVUYWJsZSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDUgRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQWpheEZ1bmN0aW9ucyA9ICBmdW5jdGlvbiBBamF4RnVuY3Rpb25zKCkge307XHJcblx0d2luZG93WydBamF4RnVuY3Rpb25zJ10gPSBBamF4RnVuY3Rpb25zO1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdFNFQVJDSF9JTlBVVDogJy5zZWFyY2gtaW5wdXQnLFxyXG5cdFx0U0VBUkNIX0NPTlRBSU5FUjogJy5zZWFyY2gtY29udGFpbmVyJyxcclxuXHRcdFNFQVJDSF9GSUxURVJfQ09OVEFJTkVSOiAnLnNlYXJjaC1maWx0ZXItY29udGFpbmVyJyxcclxuXHRcdFNFQVJDSF9GSUxURVJfQlVUVE9OOiAnI3NlYXJjaC1maWx0ZXItYnV0dG9uJyxcclxuXHRcdExPR19JTl9ESUFMT0c6ICcubG9naW4uZGlhbG9nJyxcclxuXHR9O1xyXG5cclxuXHRBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5LZXlzXyA9IHtcclxuXHRcdFNQQUNFOiAzMixcclxuXHRcdEVOVEVSOiAxMyxcclxuXHRcdENPTU1BOiA0NVxyXG5cdH07XHJcblxyXG5cdC8vIFByb2plY3QgcGFnZSBzZWFyY2ggZm9jdXNcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXMnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy1mb2N1cycpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzIG91dFxyXG5cdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfSU5QVVQpLm9uKCdmb2N1c291dCcsICBmdW5jdGlvbihlKXtcclxuXHRcdHJlbW92ZUFsbFNoYWRvd0NsYXNzZXMoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKTtcclxuXHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfQ09OVEFJTkVSKS5hZGRDbGFzcygnc2hhZG93LTJkcCcpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBTRUFSQ0hcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9CVVRUT04pLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9ICQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5TRUFSQ0hfRklMVEVSX0NPTlRBSU5FUik7XHJcblx0XHR2YXIgZmlsdGVyQnV0dG9uID0gJCh0aGlzKTtcclxuXHJcblx0XHRpZihjb250YWluZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuXHRcdFx0Y29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLmJsdXIoKTtcclxuXHRcdH0gZWxzZXtcclxuXHRcdFx0Y29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0ZmlsdGVyQnV0dG9uLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEVkaXRUb3BpYyA9IGZ1bmN0aW9uIEVkaXRUb3BpYyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5vcmlnaW5hbE5hbWUgPSAkKGVsZW1lbnQpLmRhdGEoXCJvcmlnaW5hbC10b3BpYy1uYW1lXCIpO1xyXG5cdFx0dGhpcy50b3BpY0lkID0gJChlbGVtZW50KS5kYXRhKCd0b3BpYy1pZCcpO1xyXG5cdFx0dGhpcy50b3BpY05hbWVJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmVkaXQtdG9waWMnKTtcclxuXHRcdHRoaXMuZGVsZXRlQnV0dG9uID0gJChlbGVtZW50KS5maW5kKCcuZGVsZXRlLXRvcGljJyk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0VkaXRUb3BpYyddID0gRWRpdFRvcGljO1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRFRElUX1RPUElDOiAnLmVkaXQtdG9waWMtbGlzdCAudG9waWMnLFxyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRERUxFVEVfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRQQVRDSF9UT1BJQzogJy90b3BpY3MvJyxcclxuXHRcdE5FV19UT1BJQzogJy90b3BpY3MvJ1xyXG5cdH07XHJcblxyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0ZWRpdFRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0aWYodG9waWMub3JpZ2luYWxOYW1lID09IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0NoYW5nZSBUb3BpYyBOYW1lJyxcclxuXHRcdFx0XHR0eXBlOiAnYmx1ZScsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSB0b3BpYyBuYW1lIGZyb20gPGI+XCInICsgIHRvcGljLm9yaWdpbmFsTmFtZSArICdcIjwvYj4gdG8gPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsnXCI8L2I+PycsXHJcblx0XHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ibHVlJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMuZWRpdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdFx0JCgnLmxvYWRlcicsIHRvcGljLmVsZW1lbnQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiB0b3BpYy5VcmxzXy5ERUxFVEVfVE9QSUMsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0OiB0b3BpYyxcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9waWNfaWQ6IHRvcGljLnRvcGljSWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX25hbWUgOiB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnRWRpdCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMub3JpZ2luYWxOYW1lID0gdG9waWMudG9waWNOYW1lSW5wdXQudmFsKCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjYW5jZWw6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCh0b3BpYy5vcmlnaW5hbE5hbWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZGVsZXRlVG9waWM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdG9waWMgPSB0aGlzO1xyXG5cdFx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHRcdHRpdGxlOiAnRGVsZXRlJyxcclxuXHRcdFx0XHR0eXBlOiAncmVkJyxcclxuXHRcdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5LDRIMTUuNUwxNC41LDNIOS41TDguNSw0SDVWNkgxOU02LDE5QTIsMiAwIDAsMCA4LDIxSDE2QTIsMiAwIDAsMCAxOCwxOVY3SDZWMTlaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHRcdHRoZW1lOiAnbW9kZXJuJyxcclxuXHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgPGI+XCInICsgIHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpICsgJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGRlbGV0ZToge1xyXG5cdFx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLmVsZW1lbnQuaGlkZShjb25maWcuYW5pbXRpb25zLnNsb3csIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRvcGljLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNyZWF0ZUVkaXRUb3BpY0RPTTogZnVuY3Rpb24odG9waWNJZCwgb3JpZ2luYWxOYW1lKXtcclxuXHRcdFx0JChcIi5lZGl0LXRvcGljLWxpc3RcIikucHJlcGVuZCgnPGxpIGNsYXNzPVwidG9waWNcIiBkYXRhLXRvcGljLWlkPVwiJyArIHRvcGljSWQgKydcIiBkYXRhLW9yaWdpbmFsLXRvcGljLW5hbWU9XCInICsgb3JpZ2luYWxOYW1lICsnXCI+PGlucHV0IHNwZWxsY2hlY2s9XCJ0cnVlXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxidXR0b24gY2xhc3M9XCJidXR0b24gZWRpdC10b3BpY1wiIHR5cGU9XCJzdWJtaXRcIj5FZGl0PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkZWxldGUtdG9waWMgYnV0dG9uLS1kYW5nZXJcIj5EZWxldGU8L2J1dHRvbj48L2xpPicpO1xyXG5cdFx0XHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZWRpdFRvcGljID0gdGhpcztcclxuXHRcdHRoaXMuZWRpdEJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmVkaXRUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLmRlbGV0ZVRvcGljLCB0aGlzLCBlZGl0VG9waWMpKTtcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5FRElUX1RPUElDKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkVkaXRUb3BpYyA9IG5ldyBFZGl0VG9waWModGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQgICA3IERvdE1lbnVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgYWpheCBmdW5jdGlvbnMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRG90TWVudSA9IGZ1bmN0aW9uIE1lbnUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5idXR0b24gPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5tZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSBmYWxzZTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRET1RfTUVOVTogJy5kb3QtbWVudScsXHJcblx0XHRBQ1RJVkFUT1I6ICcuZG90LW1lbnVfX2FjdGl2YXRvcicsXHJcblx0XHRJU19WSVNJQkxFOiAnLmlzLXZpc2libGUnLFxyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnLFxyXG5cdFx0Qk9UVE9NX0xFRlQ6ICdkb3QtbWVudS0tYm90dG9tLWxlZnQnLFxyXG5cdFx0Qk9UVE9NX1JJR0hUOiAnZG90LW1lbnUtLWJvdHRvbS1yaWdodCcsXHJcblx0XHRUT1BfTEVGVDogJ2RvdC1tZW51LS10b3AtbGVmdCcsXHJcblx0XHRUT1BfUklHSFQ6ICdkb3QtbWVudS0tdG9wLXJpZ2h0JyxcclxuXHRcdFRBQkxFX0RPVF9NRU5VOiAnZG90LW1lbnUtLXRhYmxlJ1xyXG5cdH07XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYnV0dG9uUmVjdCA9IHRoaXMuYnV0dG9uWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkJPVFRPTV9MRUZUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIHBhcnNlSW50KHRoaXMuYnV0dG9uLmNzcygnd2lkdGgnKSwgMTApKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AgcmlnaHQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fUklHSFQpKXtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndG9wJywgYnV0dG9uUmVjdC5ib3R0b20pO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCdsZWZ0JywgYnV0dG9uUmVjdC5sZWZ0IC0gMTIwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AgbGVmdCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9MRUZUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QucmlnaHQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAnYm90dG9tIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uVE9QX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QudG9wIC0gMTUwKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAnYm90dG9tIGxlZnQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygndHJhbnNmb3JtLW9yaWdpbicsICd0b3AnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpe1xyXG5cdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQodGhpcykoKTtcclxuXHRcdHRoaXMubWVudS5hZGRDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHRcdHRoaXMubWVudS5zaG93KCk7XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubWVudS5yZW1vdmVDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHRcdHRoaXMubWVudS5oaWRlKCk7XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKHRoaXMpKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS5zaG93LmJpbmQodGhpcykoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZG90TWVudSA9IHRoaXM7XHJcblx0XHR2YXIgbWVudUlkID0gJCh0aGlzLmJ1dHRvbikuYXR0cignaWQnKSArICctbWVudSc7XHJcblxyXG5cdFx0dGhpcy5tZW51ID0gJCgnIycgKyBtZW51SWQpO1xyXG5cdFx0dGhpcy5pc1RhYmxlRG90TWVudSA9IHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5UQUJMRV9ET1RfTUVOVSk7XHJcblxyXG5cdFx0dGhpcy5idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHREb3RNZW51LnByb3RvdHlwZS50b2dnbGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZG90TWVudS5tZW51Lmhhc0NsYXNzKERvdE1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpKXtcclxuXHRcdFx0XHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0aWYoIXRhcmdldC5pcyhkb3RNZW51Lm1lbnUpIHx8ICF0YXJnZXQuaXMoZG90TWVudS5idXR0b24pKSB7XHJcblx0XHRcdFx0aWYoISQuY29udGFpbnMoJChkb3RNZW51Lm1lbnUpWzBdLCBlLnRhcmdldCkpe1xyXG5cdFx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUuaGlkZS5iaW5kKGRvdE1lbnUpKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5BQ1RJVkFUT1IpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuRG90TWVudSA9IG5ldyBEb3RNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQ1LiBTZWNvbmQgTWFya2VyXHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdHZhciBNYXJrZXIgPSBmdW5jdGlvbiBNYXJrZXIoKSB7XHJcblx0XHRpZigkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKS5sZW5ndGggPCAxIHx8ICQoXCIjMm5kLW1hcmtlci1zdXBlcnZpc29yLXRhYmxlXCIpLmxlbmd0aCA8IDEpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLnNlbGVjdGVkU3R1ZGVudCA9IG51bGw7XHJcblx0XHR0aGlzLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0XHR0aGlzLnN0dWRlbnRUYWJsZSA9ICQoXCIjMm5kLW1hcmtlci1zdHVkZW50LXRhYmxlXCIpO1xyXG5cdFx0dGhpcy5zdHVkZW50RGF0YVRhYmxlID0gdGhpcy5zdHVkZW50VGFibGVbMF0uZGF0YVRhYmxlO1xyXG5cdFx0dGhpcy5zdXBlcnZpc29yVGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvckRhdGFUYWJsZSA9IHRoaXMuc3VwZXJ2aXNvclRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuVXJsc18gPSB7XHJcblx0XHRBU1NJR05fTUFSS0VSOiAnL2FkbWluL21hcmtlci1hc3NpZ24nLFxyXG5cdH07XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCA9IGZ1bmN0aW9uKHN0dWRlbnRSb3dET00sIG1hcmtlcil7XHJcblx0XHR2YXIgcm93ID0gJChzdHVkZW50Um93RE9NKTtcclxuXHJcblx0XHRtYXJrZXIudW5zZWxlY3RBbGwobWFya2VyKTtcclxuXHRcdHJvdy5hZGRDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9ICQocm93KTtcclxuXHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZigkKHRoaXMpLmRhdGEoJ21hcmtlci1pZCcpID09IHJvdy5kYXRhKCdzdXBlcnZpc29yLWlkJykpe1xyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvciA9IGZ1bmN0aW9uKHN1cGVydmlzb3JSb3dET00sIG1hcmtlcil7XHJcblx0XHR2YXIgcm93ID0gJChzdXBlcnZpc29yUm93RE9NKTtcclxuXHJcblx0XHRpZihyb3cuYXR0cignZGlzYWJsZWQnKSl7cmV0dXJuO31cclxuXHJcblx0XHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ICE9IG51bGwpe1xyXG5cdFx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IHJvdztcclxuXHRcdFx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nKFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdzdXBlcnZpc29yLW5hbWUnKSxcclxuXHRcdFx0XHRyb3cuZGF0YSgnbWFya2VyLW5hbWUnKSxcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnJlc2V0VmlldyA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0bWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24obWFya2VyKXtcclxuXHRcdCQobWFya2VyLnN0dWRlbnREYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oc3R1ZGVudE5hbWUsIHN1cGVydmlzb3JOYW1lLCBtYXJrZXJOYW1lLCBwcm9qZWN0KXtcclxuXHRcdCQoXCIjc3R1ZGVudC1uYW1lXCIpLnRleHQoc3R1ZGVudE5hbWUpO1xyXG5cdFx0JChcIiNzdXBlcnZpc29yLW5hbWVcIikudGV4dChzdXBlcnZpc29yTmFtZSk7XHJcblx0XHQkKFwiI21hcmtlci1uYW1lXCIpLnRleHQobWFya2VyTmFtZSk7XHJcblxyXG5cdFx0JChcIiNwcm9qZWN0LXRpdGxlXCIpLmh0bWwoJzxiPlRpdGxlOiA8L2I+JyArIHByb2plY3RbJ3RpdGxlJ10pO1xyXG5cdFx0JChcIiNwcm9qZWN0LWRlc2NyaXB0aW9uXCIpLmh0bWwoJzxiPkRlc2NyaXB0aW9uOiA8L2I+JyArIHByb2plY3RbJ2Rlc2NyaXB0aW9uJ10pO1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0RpYWxvZygpO1xyXG5cdH1cclxuXHJcblx0JCgnI3N1Ym1pdEFzc2lnbk1hcmtlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbWFya2VyID0gd2luZG93WydNYXJrZXInXTtcclxuXHJcblx0XHRpZihtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID09IG51bGwgfHwgbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvciA9PSBudWxsKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH07XHJcblxyXG5cdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdFx0dmFyIHByb2plY3RJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgncHJvamVjdCcpWydpZCddO1xyXG5cdFx0dmFyIHN0dWRlbnRJZCA9IG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3R1ZGVudC1pZCcpO1xyXG5cdFx0dmFyIG1hcmtlcklkID0gbWFya2VyLnNlbGVjdGVkU3VwZXJ2aXNvci5kYXRhKCdtYXJrZXItaWQnKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBBVENIXCIsXHJcblx0XHRcdHVybDogbWFya2VyLlVybHNfLkFTU0lHTl9NQVJLRVIsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWQsXHJcblx0XHRcdFx0c3R1ZGVudF9pZDogc3R1ZGVudElkLFxyXG5cdFx0XHRcdG1hcmtlcl9pZDogbWFya2VySWQsXHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcblx0XHRcdH0sXHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLmhpZGVEaWFsb2coKTtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlTG9hZGVyKCk7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQucmVtb3ZlKCk7XHJcblx0XHRcdG1hcmtlci5yZXNldFZpZXcobWFya2VyKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHRoaXM7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgTWFya2VyLnByb3RvdHlwZS5zZWxlY3RTdHVkZW50KHRoaXMsIG1hcmtlcik7IH0pO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3VwZXJ2aXNvcih0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHR3aW5kb3dbJ01hcmtlciddID0gbmV3IE1hcmtlcigpO1xyXG5cdH1cclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMuanMiXSwic291cmNlUm9vdCI6IiJ9