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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzliYWE1MGY3YmEzOTIzMTY3ZTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYWpheFNldHVwIiwiaGVhZGVycyIsImF0dHIiLCJsZW5ndGgiLCJhcHBlbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwiZWFjaCIsImxpc3QiLCJoYXNDbGFzcyIsImNvbnNvbGUiLCJlcnJvciIsImJlZm9yZSIsImFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdCIsImFkZEFscGhhSGVhZGVyc1RvTGlzdCIsImFkZFRpdGxlSGVhZGVyc1RvTGlzdCIsIm9uIiwic2VsZWN0IiwiZG9tIiwic3RhdHVzIiwicGFyZW50cyIsImVxIiwiZGF0YSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpbmRleCIsInZhbHVlIiwiaXMiLCJwcm9wIiwic2V0VGltZW91dCIsImUiLCJhbGVydCIsInByZXZlbnREZWZhdWx0IiwiZWxlbVRvSGlkZVNlbGVjdG9yIiwiZWxlbVRvUmVwbGFjZSIsInJlbW92ZUNsYXNzIiwiaGlkZSIsImFmdGVyIiwiY3NzIiwiYWpheCIsInVybCIsInR5cGUiLCJzZXJpYWxpemUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJzaGFyZV9uYW1lIiwic2hvd05vdGlmaWNhdGlvbiIsIkFqYXhGdW5jdGlvbnMiLCJwcm90b3R5cGUiLCJTZWxlY3RvcnNfIiwiTE9HX0lOX0RJQUxPRyIsImRpYWxvZyIsInNob3dMb2FkZXIiLCJsb2NhdGlvbiIsInJlbG9hZCIsImhpZGVMb2FkZXIiLCJzaG93IiwiYWRkQ2xhc3MiLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsInN2Z0NvbnRhaW5lciIsInN2ZyIsInByb2plY3RJZCIsIndpbmRvdyIsImFjdGlvbiIsImFqYXhVcmwiLCJwcm9qZWN0X2lkIiwiZHJvcGRvd24iLCJjb250ZW50IiwibWVkaXVtIiwicmVzdWx0IiwiYnV0dG9uc0h0bWwiLCJwcmV2aWV3SHRtbCIsImluc2VydEF0Q2FyZXQiLCJ3cmFwVGV4dFdpdGhUYWciLCJpbnB1dFVybCIsInByb21wdCIsImlucHV0QWx0IiwiaW5wdXRUZXh0IiwidGhlbWUiLCJlc2NhcGVLZXkiLCJhbmltYXRlRnJvbUVsZW1lbnQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsInRpdGxlIiwiZGVsYXkiLCJhbmltYXRlIiwib3BhY2l0eSIsImJpbmQiLCJkb2N1bWVudCIsImFqYXhFcnJvciIsImV2ZW50IiwicmVxdWVzdCIsInNldHRpbmdzIiwic2hvd0FqYXhSZXF1ZXN0RmFpbE5vdGlmaWNhdGlvbiIsIk1vYmlsZU1lbnUiLCJlbGVtZW50IiwiYWN0aXZhdG9yIiwiSEFNQlVSR0VSX0NPTlRBSU5FUiIsInVuZGVybGF5IiwiVU5ERVJMQVkiLCJpbml0IiwibG9nIiwiQ3NzQ2xhc3Nlc18iLCJJU19WSVNJQkxFIiwiTU9CSUxFX01FTlUiLCJvcGVuTWVudSIsImNsb3NlTWVudSIsIm1vYmlsZU1lbnUiLCJpbml0QWxsIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImhlYWRlciIsIkRJQUxPR19IRUFERVIiLCJESUFMT0dfQ09OVEVOVCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwicHVzaCIsImVyciIsInJlYWR5Iiwia2V5ZG93biIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJzZWxlY3RBbGxSb3dzIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJDb2x1bW5Ub2dnbGVUYWJsZSIsImhlYWQiLCJzZWxlY3Rvck1lbnUiLCJzZWxlY3RvckJ1dHRvbiIsIlRPR0dMRV9UQUJMRSIsIkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04iLCJDT0xVTU5fU0VMRUNUT1JfTUVOVSIsInRvZ2dsZUNvbHVtbiIsImNvbHVtbkluZGV4IiwidGFibGUiLCJjaGVja2VkIiwiY2hpbGRyZW4iLCJyZW1vdmVBdHRyIiwicmVmcmVzaCIsImhpZGVJbmRpY2VzIiwicmVmcmVzaEFsbCIsInRvZ2dsZVRhYmxlIiwiY29sdW1uU2VsZWN0b3JCdXR0b24iLCJjb2x1bW5TZWxlY3Rvck1lbnUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCIsIlNFQVJDSF9JTlBVVCIsIlNFQVJDSF9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQlVUVE9OIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwiY29uZmlybSIsImljb24iLCJidXR0b25zIiwiYnRuQ2xhc3MiLCJtZXRob2QiLCJ0b3BpY19pZCIsInRvcGljX25hbWUiLCJjYW5jZWwiLCJkZWxldGVUb3BpYyIsImRlbGV0ZSIsInNsb3ciLCJyZW1vdmUiLCJEb3RNZW51IiwiTWVudSIsImJ1dHRvbiIsIm1lbnUiLCJpc1RhYmxlRG90TWVudSIsIkRPVF9NRU5VIiwiQUNUSVZBVE9SIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfTEVGVCIsIlRPUF9SSUdIVCIsIlRBQkxFX0RPVF9NRU5VIiwicG9zaXRpb25NZW51IiwiYnV0dG9uUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImxlZnQiLCJwYXJzZUludCIsInRvcCIsInJpZ2h0IiwidG9nZ2xlIiwiZG90TWVudSIsIm1lbnVJZCIsInN0b3BQcm9wYWdhdGlvbiIsInRhcmdldCIsImNvbnRhaW5zIiwiTWFya2VyIiwic2VsZWN0ZWRTdHVkZW50Iiwic2VsZWN0ZWRTdXBlcnZpc29yIiwic3R1ZGVudFRhYmxlIiwic3R1ZGVudERhdGFUYWJsZSIsInN1cGVydmlzb3JUYWJsZSIsInN1cGVydmlzb3JEYXRhVGFibGUiLCJBU1NJR05fTUFSS0VSIiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRSb3dET00iLCJtYXJrZXIiLCJ1bnNlbGVjdEFsbCIsInNlbGVjdFN1cGVydmlzb3IiLCJzdXBlcnZpc29yUm93RE9NIiwicmVzZXRWaWV3Iiwic3R1ZGVudE5hbWUiLCJzdXBlcnZpc29yTmFtZSIsIm1hcmtlck5hbWUiLCJwcm9qZWN0Iiwic3R1ZGVudElkIiwibWFya2VySWQiLCJzdHVkZW50X2lkIiwibWFya2VyX2lkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QUFrQ0FWLFFBQU81TCxTQUFQLENBQWlCNEQsSUFBakIsR0FBd0IsWUFBVTtBQUNqQyxNQUFJMEksU0FBUyxJQUFiO0FBQ0FqUSxJQUFFaVEsT0FBT04sZ0JBQVAsQ0FBd0J2RyxRQUExQixFQUFvQzVILEVBQXBDLENBQXVDLE9BQXZDLEVBQWdELFlBQVc7QUFBRStOLFVBQU81TCxTQUFQLENBQWlCb00sYUFBakIsQ0FBK0IsSUFBL0IsRUFBcUNFLE1BQXJDO0FBQStDLEdBQTVHO0FBQ0FqUSxJQUFFaVEsT0FBT0osbUJBQVAsQ0FBMkJ6RyxRQUE3QixFQUF1QzVILEVBQXZDLENBQTBDLE9BQTFDLEVBQW1ELFlBQVc7QUFBRStOLFVBQU81TCxTQUFQLENBQWlCd00sZ0JBQWpCLENBQWtDLElBQWxDLEVBQXdDRixNQUF4QztBQUFrRCxHQUFsSDtBQUNBLEVBSkQ7O0FBTUFWLFFBQU81TCxTQUFQLENBQWlCb0UsT0FBakIsR0FBMkIsWUFBVTtBQUNwQzdDLFNBQU8sUUFBUCxJQUFtQixJQUFJcUssTUFBSixFQUFuQjtBQUNBLEVBRkQ7O0FBSUF0SSxZQUFXdEQsU0FBWCxDQUFxQm9FLE9BQXJCO0FBQ0FDLFFBQU9yRSxTQUFQLENBQWlCb0UsT0FBakI7QUFDQW9CLFdBQVV4RixTQUFWLENBQW9Cb0UsT0FBcEI7QUFDQXNDLG1CQUFrQjFHLFNBQWxCLENBQTRCb0UsT0FBNUI7QUFDQXJELFdBQVVmLFNBQVYsQ0FBb0JvRSxPQUFwQjtBQUNBd0gsUUFBTzVMLFNBQVAsQ0FBaUJvRSxPQUFqQjtBQUNBOEYsU0FBUWxLLFNBQVIsQ0FBa0JvRSxPQUFsQjtBQUNBLENBbnlCQSxFIiwiZmlsZSI6IlxcanNcXG1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzOWJhYTUwZjdiYTM5MjMxNjdlMSIsIi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZJTEUgU1RSVUNUVVJFXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnwgIFx0MS4gQUpBWCBTZXR1cFxyXG58XHQyLiBIVE1MIE1vZGlmaWNhdGlvbnNcclxufFx0My4gT3RoZXJcclxufFxyXG4qL1xyXG5cclxuaW1wb3J0ICcuLi9qcy9jb21wb25lbnRzJztcclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG47JChmdW5jdGlvbigpIHtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0MS4gQUpBWCBTZXR1cFxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQkLmFqYXhTZXR1cCh7XHJcblx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpLFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHRpZigkKCcuc2hvdy0tc2Nyb2xsLXRvLXRvcCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0JCgnLm1haW4tY29udGVudCcpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBidXR0b24tLWFjY2VudCBzY3JvbGwtdG8tdG9wXCI+U2Nyb2xsIHRvIFRvcDwvYnV0dG9uPicpO1xyXG5cdH1cclxuXHJcblx0Ly8gQWNjZXNzaWJpbGl0eVxyXG5cdCQoJy5kcm9wZG93bicpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHQkKCcuZHJvcGRvd24gPiBidXR0b24nKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xyXG5cdCQoJy5kcm9wZG93biAuZHJvcGRvd24tY29udGVudCBhJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cclxuXHQvLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcblx0JCgnLnRvcGljcy1saXN0JykucHJlcGVuZCgkKCcuZmlyc3QnKSk7XHJcblx0JCgnLnRvcGljcy1saXN0IC5sb2FkZXInKS5mYWRlT3V0KDApO1xyXG5cdCQoJy50b3BpY3MtbGlzdCBsaScpLmZpcnN0KCkuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCwgZnVuY3Rpb24gc2hvd05leHRUb3BpYygpIHtcclxuXHRcdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIHNob3dOZXh0VG9waWMpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcub3JkZXItbGlzdC1qcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0XHQvLyBzb3J0VW5vcmRlcmVkTGlzdChsaXN0KTtcclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdsYXN0LW5hbWUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdhbHBoYS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkQWxwaGFIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ3RpdGxlLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRUaXRsZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCAzLiBPVEhFUlxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5lbWFpbC10YWJsZSAuY2hlY2tib3ggaW5wdXRcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc2VsZWN0ID0gZnVuY3Rpb24oZG9tKXtcclxuXHRcdFx0dmFyIHN0YXR1cyA9IGRvbS5wYXJlbnRzKCkuZXEoNCkuZGF0YSgnc3RhdHVzJyk7XHJcblx0XHRcdHZhciBlbWFpbFN0cmluZyA9IFwibWFpbHRvOlwiO1xyXG5cdFx0XHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcuZW1haWwtdGFibGUuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHRcdFx0dmFyIGVtYWlsQnV0dG9uc2VsZWN0b3IgPSBcIi5lbWFpbC1zZWxlY3RlZC5cIiArIHN0YXR1cztcclxuXHJcblx0XHRcdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdFx0XHRpZigkKHZhbHVlKS5pcyhcIjpjaGVja2VkXCIpICYmICEkKHZhbHVlKS5oYXNDbGFzcyhcIm1hc3Rlci1jaGVja2JveFwiKSkge1xyXG5cdFx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gJCh2YWx1ZSkuZGF0YSgnZW1haWwnKTtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxuXHRcdH07XHJcblx0XHRzZXRUaW1lb3V0KHNlbGVjdCgkKHRoaXMpKSwgMjAwMCk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuZW1haWwtc2VsZWN0ZWRcIiwgZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYoJCh0aGlzKS5wcm9wKCdocmVmJykgPT09ICdtYWlsdG86JyB8fCAkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gbnVsbCl7XHJcblx0XHRcdGFsZXJ0KFwiWW91IGhhdmVuJ3Qgc2VsZWN0ZWQgYW55b25lLlwiKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBFeHRlcm5hbCBsaW5rcyBnaXZlIGFuIGlsbHVzaW9uIG9mIEFKQVhcclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmV4dGVybmFsLWxpbmtcIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBlbGVtVG9IaWRlU2VsZWN0b3IgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1oaWRlLXNlbGVjdG9yJykpO1xyXG5cdFx0dmFyIGVsZW1Ub1JlcGxhY2UgPSAkKCQodGhpcykuZGF0YSgnZWxlbWVudC10by1yZXBsYWNlLXdpdGgtbG9hZGVyLXNlbGVjdG9yJykpO1xyXG5cclxuXHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdGVsZW1Ub0hpZGVTZWxlY3Rvci5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmhpZGUoKTtcclxuXHRcdGVsZW1Ub1JlcGxhY2UuYWZ0ZXIoJzxkaXYgaWQ9XCJjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lclwiIGNsYXNzPVwibG9hZGVyIGxvYWRlci0teC1sYXJnZVwiPjwvZGl2PicpO1xyXG5cclxuXHRcdCQoJyNjb250ZW50LXJlcGxhY2VkLWNvbnRhaW5lcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBVc2VkIG9uIHRoZSBzdHVkZW50IGluZGV4IHBhZ2VcclxuXHQkKFwiI3NoYXJlLXByb2plY3QtZm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cdFx0XHRcdHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc2hhcmVfbmFtZSl7XHJcblx0XHRcdFx0XHRzaG93Tm90aWZpY2F0aW9uKCdzdWNjZXNzJywgJ1lvdXIgbmFtZSBpcyBiZWluZyBzaGFyZWQgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbignJywgJ1lvdSBhcmUgbm8gbG9uZ2VyIHNoYXJpbmcgeW91ciBuYW1lIHdpdGggb3RoZXIgc3R1ZGVudHMuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoJyNzaGFyZV9uYW1lJykucHJvcCgnY2hlY2tlZCcsIHJlc3BvbnNlLnNoYXJlX25hbWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmhpZGUoKTtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuc2hvdygpO1xyXG5cdFx0XHRcdCQoJyNsb2dpbi11c2VybmFtZScsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuYWRkQ2xhc3MoXCJoYXMtZXJyb3JcIik7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNuZXctdG9waWMtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0dmFyIHN1Ym1pdEJ1dHRvbiA9ICQodGhpcykuZmluZCgnOnN1Ym1pdCcpO1xyXG5cdFx0c3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj4nKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdWJtaXRCdXR0b24pLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUE9TVCcsXHJcblx0XHRcdGNvbnRleHQ6ICQodGhpcyksXHJcblx0XHRcdGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5mdW5jdGlvbnMuY3JlYXRlRWRpdFRvcGljRE9NKGRhdGFbXCJpZFwiXSwgZGF0YVtcIm5hbWVcIl0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCc6c3VibWl0JykuaHRtbCgnQWRkJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gTkVXIFVTRVJcclxuXHQvLyBwdXQgdGhpcyBzdHVmZiBpbiBhbiBhcnJheVxyXG5cdC8vICQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0Ly8gJCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHJcblx0Ly8gJCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHQvLyBcdGlmKCQoJy5uZXctdXNlci1zdHVkZW50JykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHQvLyBcdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHQvLyBcdH0gZWxzZSB7XHJcblx0Ly8gXHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gXHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdC8vIFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdC8vIFx0fSBlbHNlIHtcclxuXHQvLyBcdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHQvLyBcdH1cclxuXHQvLyB9KTtcclxuXHJcblx0JChcIi5mYXZvdXJpdGUtY29udGFpbmVyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHN2Z0NvbnRhaW5lciA9ICQodGhpcyk7XHJcblx0XHR2YXIgc3ZnID0gc3ZnQ29udGFpbmVyLmZpbmQoJ3N2ZycpO1xyXG5cdFx0dmFyIHByb2plY3RJZCA9IHdpbmRvd1sncHJvamVjdCddLmRhdGEoJ3Byb2plY3QtaWQnKTtcclxuXHJcblx0XHRzdmcuaGlkZSgwKTtcclxuXHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLnNob3coMCk7XHJcblxyXG5cdFx0aWYoc3ZnLmhhc0NsYXNzKCdmYXZvdXJpdGUnKSl7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAncmVtb3ZlJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL3JlbW92ZS1mYXZvdXJpdGUnO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBhY3Rpb24gPSAnYWRkJztcclxuXHRcdFx0dmFyIGFqYXhVcmwgPSAnL3N0dWRlbnRzL2FkZC1mYXZvdXJpdGUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogYWpheFVybCxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZihhY3Rpb24gPT0gXCJhZGRcIil7XHJcblx0XHRcdFx0XHRzdmcuYWRkQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzdmcucmVtb3ZlQ2xhc3MoJ2Zhdm91cml0ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0c3ZnLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QpO1xyXG5cdFx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5oaWRlKDApO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJ25hdi5tb2JpbGUgLnN1Yi1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZHJvcGRvd24gPSAkKHRoaXMpO1xyXG5cdFx0dmFyIGNvbnRlbnQgPSBkcm9wZG93bi5maW5kKCcuZHJvcGRvd24tY29udGVudCcpO1xyXG5cclxuXHRcdGlmKGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuaGlkZShjb25maWcuYW5pbXRpb25zLm1lZGl1bSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCB0cnVlKTtcclxuXHRcdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgZmFsc2UpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDE4MGRlZylcIik7XHJcblx0XHRcdGRyb3Bkb3duLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRjb250ZW50LnNob3coY29uZmlnLmFuaW10aW9ucy5tZWRpdW0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpe1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAnL3NuaXBwZXQ/c25pcHBldD1odG1sLWVkaXRvci10b29sYmFyJyxcclxuXHRcdFx0dHlwZTonR0VUJyxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXN1bHQpe1xyXG5cdFx0XHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5hZnRlcihyZXN1bHQpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvbnNIdG1sID0gXCI8ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgZmxleCc+PGJ1dHRvbiBjbGFzcz0naHRtbCcgdHlwZT0nYnV0dG9uJz5IVE1MPC9idXR0b24+PGJ1dHRvbiBjbGFzcz0ncHJldmlldycgdHlwZT0nYnV0dG9uJz5QUkVWSUVXPC9idXR0b24+PC9kaXY+XCI7XHJcblx0XHR2YXIgcHJldmlld0h0bWwgPSBcIjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcic+PGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXByZXZpZXcnPjwvZGl2PjwvZGl2PlwiO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5iZWZvcmUoYnV0dG9uc0h0bWwpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yJykuYWZ0ZXIocHJldmlld0h0bWwpO1xyXG5cclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXcnKS5odG1sKCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldycpLmh0bWwoJCh0aGlzKS52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLmh0bWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLnNob3coKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5oaWRlKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5odG1sLWVkaXRvci0tdG9wLWJ1dHRvbnMgLnByZXZpZXcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tdG9vbGJhcicpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInKS5zaG93KCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFRvZ2dsZSBsYWJlbCBmbGlwcyB0b2dnbGVcclxuXHQkKFwiLmh0bWwtZWRpdG9yXCIpLm9uKFwiY2xpY2tcIiwgXCIuaHRtbC1lZGl0b3ItLXRvb2xiYXIgbGkgYnV0dG9uXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHRzd2l0Y2goJCh0aGlzKS5kYXRhKCd0eXBlJykpe1xyXG5cdFx0XHRjYXNlIFwibGluZWJyZWFrXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxicj4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJvbFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48b2w+XFxuXFx0PGxpPkl0ZW0gMTwvbGk+XFxuXFx0PGxpPkl0ZW0gMjwvbGk+XFxuXFx0PGxpPkl0ZW0gMzwvbGk+XFxuPC9vbD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ1bFwiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdcXG48dWw+XFxuXFx0PGxpPkl0ZW0geDwvbGk+XFxuXFx0PGxpPkl0ZW0geTwvbGk+XFxuXFx0PGxpPkl0ZW0gejwvbGk+XFxuPC91bD4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJib2xkXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnYicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInR0XCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndHQnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpdGFsaWNcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdpJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidW5kZXJsaW5lXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAndScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImltZ1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBpbWFnZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0QWx0ID0gcHJvbXB0KFwiRW50ZXIgYWx0IHRleHRcIiwgXCJJbWFnZSBvZiBTdXNzZXggY2FtcHVzXCIpO1xyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8aW1nIGFsdD1cIicgKyBpbnB1dEFsdCArICdcIiBzcmM9XCInICsgaW5wdXRVcmwgKyAnXCI+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwibGlua1wiOlxyXG5cdFx0XHRcdHZhciBpbnB1dFVybCA9IHByb21wdChcIkVudGVyIHRoZSBVUkxcIiwgXCJodHRwczovL3d3dy5cIik7XHJcblx0XHRcdFx0dmFyIGlucHV0VGV4dCA9IHByb21wdChcIkVudGVyIGRpc3BsYXkgdGV4dFwiLCBcIlN1c3NleFwiKTtcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGEgaHJlZj1cIicgKyBpbnB1dFVybCArICdcIj4nICsgaW5wdXRUZXh0ICsgJzwvYT4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJjb2RlXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnY29kZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInByZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3ByZScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImluZm9cIjpcclxuXHRcdFx0XHQkLmRpYWxvZyh7XHJcblx0XHRcdFx0XHR0aGVtZTogJ21hdGVyaWFsJyxcclxuXHRcdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdFx0XHR0aXRsZTogJ0hUTUwgRWRpdG9yIEluZm8nLFxyXG5cdFx0XHRcdFx0Y29udGVudDogJ0FsbCBIVE1MIDUgZWxlbWVudHMgYXJlIHZhbGlkIGZvciB0aGUgZGVzY3JpcHRpb24gZmllbGQsIGV4Y2x1ZGluZzsgPGJyPjxicj4gPHVsPjxsaT5TY3JpcHQgdGFnczwvbGk+PGxpPkhlYWRpbmcgdGFnczwvbGk+PC91bD4nLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT1cclxuXHRcdDkuIEluaXRpYWxpc2VcclxuXHQgICA9PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0Ly8gVXNlZCBhcyBhbiBlYXN5IHdheSBmb3IgZnVuY3Rpb25zIHRvIGdldCBjdXJyZW50IHByb2plY3QgZGF0YVxyXG5cdGlmKCQoJy5wcm9qZWN0LWNhcmQnKS5sZW5ndGggPiAwKXtcclxuXHRcdHdpbmRvd1sncHJvamVjdCddID0gJCgnLnByb2plY3QtY2FyZCcpO1xyXG5cdH1cclxuXHJcblx0JCgnLmFuaW1hdGUtY2FyZHMgLmNhcmQnKS5jc3MoXCJvcGFjaXR5XCIsIDApO1xyXG5cclxuXHR2YXIgZGVsYXkgPSAwO1xyXG5cdCQoJy5hbmltYXRlLWNhcmRzIC5jYXJkJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdGRlbGF5ICs9IDIwMDtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcInNsaWRlSW5VcCBhbmltYXRlZFwiKTtcclxuXHJcblx0XHRcdCQodGhpcykuYW5pbWF0ZSh7XHJcblx0XHRcdFx0b3BhY2l0eTogMVxyXG5cdFx0XHR9LCA4MDApO1xyXG5cclxuXHRcdH0uYmluZCh0aGlzKSwgZGVsYXkpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLmFqYXhFcnJvcihmdW5jdGlvbiggZXZlbnQsIHJlcXVlc3QsIHNldHRpbmdzICkge1xyXG5cdGlmKGNvbmZpZy5zaG93QWpheFJlcXVlc3RGYWlsTm90aWZpY2F0aW9uKXtcclxuXHRcdHNob3dOb3RpZmljYXRpb24oJ2Vycm9yJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggdGhhdCByZXF1ZXN0LicpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL21haW4uanMiLCIvKiBGSUxFIFNUUlVDVFVSRVxyXG5cclxuKi9cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZJTEUgU1RSVUNUVVJFXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnxcdDEuIE1vYmlsZSBNZW51XHJcbnxcdDIuIERpYWxvZyAvIE1vZGFsXHJcbnxcdDMuIERhdGEgVGFibGVcclxufFx0NC4gQ29sdW1uIFRvZ2dsZSBUYWJsZVxyXG58XHQ1LiBGb3JtcyAvIEFKQVggRnVuY3Rpb25zXHJcbnxcdDYuIEVkaXQgVG9waWNzIFtBZG1pbl1cclxufFx0Ny4gTWVudVxyXG58XHJcbiovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuOyQoZnVuY3Rpb24oKSB7XHJcblx0LyogPT09PT09PT09PT09PT09PT09XHJcblx0XHQgMS4gTW9iaWxlIE1lbnVcclxuXHQgICA9PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0XHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBtb2JpbGUgbWVudS5cclxuXHRcdCpcclxuXHRcdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgTW9iaWxlTWVudSA9ICBmdW5jdGlvbiBNb2JpbGVNZW51KGVsZW1lbnQpIHtcclxuXHRcdGlmKHdpbmRvd1snTW9iaWxlTWVudSddID09IG51bGwpe1xyXG5cdFx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXSA9IHRoaXM7XHJcblx0XHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHRcdHRoaXMuYWN0aXZhdG9yID0gJCh0aGlzLlNlbGVjdG9yc18uSEFNQlVSR0VSX0NPTlRBSU5FUik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkgPSAkKHRoaXMuU2VsZWN0b3JzXy5VTkRFUkxBWSk7XHJcblx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJUaGVyZSBjYW4gb25seSBiZSBvbmUgbW9iaWxlIG1lbnUuXCIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0SVNfVklTSUJMRTogJ2lzLXZpc2libGUnXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdE1PQklMRV9NRU5VOiAnbmF2Lm1vYmlsZScsXHJcblx0XHRIQU1CVVJHRVJfQ09OVEFJTkVSOiAnLmhhbWJ1cmdlci1jb250YWluZXInLFxyXG5cdFx0VU5ERVJMQVk6ICcubW9iaWxlLW5hdi11bmRlcmxheSdcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5vcGVuTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0XHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtb2JpbGVNZW51ID0gdGhpcztcclxuXHRcdHRoaXMuYWN0aXZhdG9yLm9uKCdjbGljaycsIG1vYmlsZU1lbnUub3Blbk1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0XHR0aGlzLnVuZGVybGF5Lm9uKCdjbGljaycsIG1vYmlsZU1lbnUuY2xvc2VNZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5NT0JJTEVfTUVOVSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5tb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Mi4gRGlhbG9nIC8gTW9kYWxcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdHZhciBEaWFsb2cgPSBmdW5jdGlvbiBEaWFsb2coZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuZGlhbG9nTmFtZSA9ICQoZWxlbWVudCkuZGF0YSgnZGlhbG9nJyk7XHJcblx0XHR0aGlzLnVuZGVybGF5ID0gJCgnLnVuZGVybGF5Jyk7XHJcblx0XHR0aGlzLmhlYWRlciA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0hFQURFUik7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19DT05URU5UKTtcclxuXHJcblx0XHQvLyBSZWdpc3RlciBDb21wb25lbnRcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyhcInJlZ2lzdGVyZWRcIik7XHJcblxyXG5cdFx0Ly8gQVJJQVxyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWxhYmVsbGVkYnlcIiwgXCJkaWFsb2ctdGl0bGVcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJkaWFsb2ctZGVzY1wiKTtcclxuXHRcdHRoaXMuaGVhZGVyLmF0dHIoJ3RpdGxlJywgdGhpcy5oZWFkZXIuZmluZCgnI2RpYWxvZy1kZXNjJykuaHRtbCgpKTtcclxuXHJcblx0XHR0aGlzLmNvbnRlbnQuYmVmb3JlKHRoaXMuSHRtbFNuaXBwZXRzXy5MT0FERVIpO1xyXG5cdFx0dGhpcy5sb2FkZXIgPSAkKGVsZW1lbnQpLmZpbmQoXCIubG9hZGVyXCIpO1xyXG5cdFx0dGhpcy5pc0Nsb3NhYmxlID0gdHJ1ZTtcclxuXHRcdHRoaXMuYWN0aXZhdG9yQnV0dG9ucyA9IFtdO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5IdG1sU25pcHBldHNfID0ge1xyXG5cdFx0TE9BREVSOiAnPGRpdiBjbGFzcz1cImxvYWRlclwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4O3RvcDogMjUlO1wiPjwvZGl2PicsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdEFDVElWRTogJ2FjdGl2ZScsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RElBTE9HOiAnLmRpYWxvZycsXHJcblx0XHRESUFMT0dfSEVBREVSOiAnLmhlYWRlcicsXHJcblx0XHRESUFMT0dfQ09OVEVOVDogJy5jb250ZW50JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5sb2FkZXIuc2hvdygwKTtcclxuXHRcdHRoaXMuY29udGVudC5oaWRlKDApO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZUxvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5oaWRlKDApO1xyXG5cdFx0dGhpcy5jb250ZW50LnNob3coMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIiwgdGhpcy5kaWFsb2dOYW1lKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR3aW5kb3dbJ0RpYWxvZyddID0gdGhpcztcclxuXHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaGlkZURpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmlzQ2xvc2FibGUgJiYgdGhpcy51bmRlcmxheS5kYXRhKFwib3duZXJcIikgPT0gdGhpcy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcblx0XHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQvLyBOZWVkZWQgZm9yIGNvbnRleHRcclxuXHRcdHZhciBkaWFsb2cgPSB0aGlzO1xyXG5cclxuXHRcdC8vIEZpbmQgYWN0aXZhdG9yIGJ1dHRvblxyXG5cdFx0JCgnYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdhY3RpdmF0b3InKSAmJiAkKHRoaXMpLmRhdGEoJ2RpYWxvZycpID09IGRpYWxvZy5kaWFsb2dOYW1lKXtcclxuXHRcdFx0XHRkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucy5wdXNoKCQodGhpcykpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHRkaWFsb2cuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0ZGlhbG9nLnVuZGVybGF5Lm9uKCdjbGljaycsIGRpYWxvZy5oaWRlRGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblxyXG5cdFx0dHJ5e1xyXG5cdFx0XHQkKGRpYWxvZy5hY3RpdmF0b3JCdXR0b25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykub24oJ2NsaWNrJywgZGlhbG9nLnNob3dEaWFsb2cuYmluZChkaWFsb2cpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoKGVycil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJEaWFsb2cgXCIgKyBkaWFsb2cuZGlhbG9nTmFtZSArIFwiIGhhcyBubyBhY3RpdmF0b3IgYnV0dG9uLlwiKTtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuZGlhbG9nID0gbmV3IERpYWxvZyh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzKS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoZS5rZXlDb2RlID09IDI3ICYmIHdpbmRvd1snRGlhbG9nJ10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snRGlhbG9nJ10uaGlkZURpYWxvZygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydNb2JpbGVNZW51J10gIT0gbnVsbCkge1xyXG5cdFx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddLmNsb3NlTWVudSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT1cclxuXHRcdDMuIERhdGEgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09ICovXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgRGF0YVRhYmxlID0gZnVuY3Rpb24gRGF0YVRhYmxlKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRyIHRoJyk7XHJcblx0XHR0aGlzLmJvZHlSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Ym9keSB0cicpO1xyXG5cdFx0dGhpcy5mb290Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGZvb3QgdHInKTtcclxuXHRcdHRoaXMucm93cyA9ICQubWVyZ2UodGhpcy5ib2R5Um93cywgdGhpcy5mb290Um93cyk7XHJcblx0XHR0aGlzLmNoZWNrYm94ZXMgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkNIRUNLQk9YKTtcclxuXHRcdHRoaXMubWFzdGVyQ2hlY2tib3ggPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLk1BU1RFUl9DSEVDS0JPWCk7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHR3aW5kb3dbJ0RhdGFUYWJsZSddID0gRGF0YVRhYmxlO1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0REFUQV9UQUJMRTogJ2RhdGEtdGFibGUnLFxyXG5cdFx0SVNfU0VMRUNURUQ6ICdpcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnLmRhdGEtdGFibGUnLFxyXG5cdFx0TUFTVEVSX0NIRUNLQk9YOiAndGhlYWQgLm1hc3Rlci1jaGVja2JveCcsXHJcblx0XHRDSEVDS0JPWDogJ3Rib2R5IC5jaGVja2JveC1pbnB1dCcsXHJcblx0XHRJU19TRUxFQ1RFRDogJy5pcy1zZWxlY3RlZCdcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdHNlbGVjdEFsbFJvd3M6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZih0aGlzLm1hc3RlckNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKXtcclxuXHRcdFx0XHR0aGlzLnJvd3MuYWRkQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnJvd3MucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveGVzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RSb3c6IGZ1bmN0aW9uIChjaGVja2JveCwgcm93KSB7XHJcblx0XHRcdGlmIChyb3cpIHtcclxuXHRcdFx0XHRpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdHJvdy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cm93LnJlbW92ZUNsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZGF0YVRhYmxlID0gdGhpcztcclxuXHJcblx0XHR0aGlzLm1hc3RlckNoZWNrYm94Lm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuZnVuY3Rpb25zLnNlbGVjdEFsbFJvd3MsIGRhdGFUYWJsZSkpO1xyXG5cclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuIENvbHVtbiBUb2dnbGUgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQ29sdW1uVG9nZ2xlVGFibGUgPSBmdW5jdGlvbiBDb2x1bW5Ub2dnbGVUYWJsZShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5oZWFkID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0cicpO1xyXG5cdFx0dGhpcy5oZWFkZXJzID0gJChlbGVtZW50KS5maW5kKCd0aGVhZCB0ciB0aCcpO1xyXG5cdFx0dGhpcy5ib2R5Um93cyA9ICQoZWxlbWVudCkuZmluZCgndGJvZHkgdHInKTtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBudWxsO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydDb2x1bW5Ub2dnbGVUYWJsZSddID0gQ29sdW1uVG9nZ2xlVGFibGU7XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRUT0dHTEVfVEFCTEU6ICcudGFibGUtY29sdW1uLXRvZ2dsZSdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9CVVRUT046ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGRvdC1tZW51X19hY3RpdmF0b3JcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1sZWZ0OmF1dG87XCI+Q29sdW1uczwvYnV0dG9uPicsXHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfTUVOVTogJzx1bCBjbGFzcz1cImRvdC1tZW51IGRvdC1tZW51LS1ib3R0b20tbGVmdFwiPjwvdWw+J1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblxyXG5cdFx0dG9nZ2xlQ29sdW1uOiBmdW5jdGlvbihjb2x1bW5JbmRleCwgdGFibGUsIGNoZWNrZWQpIHtcclxuXHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0dGFibGUuaGVhZC5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5yZW1vdmVBdHRyKCdoaWRkZW4nKTtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmF0dHIoJ2hpZGRlbicsIFwidHJ1ZVwiKTtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKGNoZWNrZWQpe1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5zaG93KCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJlZnJlc2g6IGZ1bmN0aW9uKHRhYmxlKSB7XHJcblx0XHRcdHZhciBoaWRlSW5kaWNlcyA9IFtdO1xyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MgPSB0YWJsZS5lbGVtZW50LmZpbmQoJ3Rib2R5IHRyJyk7XHJcblxyXG5cdFx0XHR0YWJsZS5oZWFkZXJzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZigkKHRoaXMpLmF0dHIoJ2hpZGRlbicpKXtcclxuXHRcdFx0XHRcdGhpZGVJbmRpY2VzLnB1c2goJCh0aGlzKS5pbmRleCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGFibGUuYm9keVJvd3MuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGlkZUluZGljZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5lcShoaWRlSW5kaWNlc1tpXSkuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHJlZnJlc2hBbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5TZWxlY3RvcnNfLlRPR0dMRV9UQUJMRSkuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zLnJlZnJlc2godGhpcy5Db2x1bW5Ub2dnbGVUYWJsZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRpZighdGhpcy5lbGVtZW50LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkNvbHVtblRvZ2dsZVRhYmxlIHJlcXVpcmVzIHRoZSB0YWJsZSB0byBoYXZlIGFuIHVuaXF1ZSBJRC5cIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdG9nZ2xlVGFibGUgPSB0aGlzO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX0JVVFRPTik7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JNZW51ID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX01FTlUpO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkID0gJ0NvbHVtblRvZ2dsZVRhYmxlLScgKyB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmJlZm9yZShjb2x1bW5TZWxlY3RvckJ1dHRvbik7XHJcblxyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYWZ0ZXIoY29sdW1uU2VsZWN0b3JNZW51KTtcclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JNZW51LmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgKyAnLW1lbnUnKTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gY29sdW1uU2VsZWN0b3JCdXR0b247XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IGNvbHVtblNlbGVjdG9yTWVudTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudS5maW5kKCd1bCcpLmRhdGEoXCJ0YWJsZVwiLCB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJykpO1xyXG5cclxuXHRcdHRoaXMuaGVhZGVycy5lYWNoKGZ1bmN0aW9uICgpe1xyXG5cdFx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuZGF0YShcImRlZmF1bHRcIikgPyBcImNoZWNrZWRcIiA6IFwiXCI7XHJcblx0XHRcdCQodGhpcykuZGF0YSgndmlzaWJsZScsICQodGhpcykuZGF0YShcImRlZmF1bHRcIikpO1xyXG5cclxuXHRcdFx0Y29sdW1uU2VsZWN0b3JNZW51LmFwcGVuZCgnXFxcclxuXHRcdFx0XHQ8bGkgY2xhc3M9XCJkb3QtbWVudV9faXRlbSBkb3QtbWVudV9faXRlbS0tcGFkZGVkXCI+IFxcXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4gXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY29sdW1uLXRvZ2dsZVwiIGlkPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIiB0eXBlPVwiY2hlY2tib3hcIiAnKyBjaGVja2VkICsnPiBcXFxyXG5cdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIj4nICsgJCh0aGlzKS50ZXh0KCkgKyAnPC9sYWJlbD4gXFxcclxuXHRcdFx0XHRcdDwvZGl2PiBcXFxyXG5cdFx0XHRcdDwvbGk+Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5jb2x1bW4tdG9nZ2xlXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpbmRleCA9ICQoJy5jb2x1bW4tdG9nZ2xlJykuaW5kZXgodGhpcyk7XHJcblx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMudG9nZ2xlQ29sdW1uKGluZGV4LCB0b2dnbGVUYWJsZSwgJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUgPSBuZXcgQ29sdW1uVG9nZ2xlVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ1IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG5cdHdpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRcdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0XHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0XHRTUEFDRTogMzIsXHJcblx0XHRFTlRFUjogMTMsXHJcblx0XHRDT01NQTogNDVcclxuXHR9O1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU0VBUkNIXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdFx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdFx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHRcdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHRcdHRoaXMudG9waWNOYW1lSW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRORVdfVE9QSUM6ICcvdG9waWNzLydcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdGVkaXRUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRcdGlmKHRvcGljLm9yaWdpbmFsTmFtZSA9PSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSl7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQuY29uZmlybSh7XHJcblx0XHRcdFx0dGl0bGU6ICdDaGFuZ2UgVG9waWMgTmFtZScsXHJcblx0XHRcdFx0dHlwZTogJ2JsdWUnLFxyXG5cdFx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIDxiPlwiJyArICB0b3BpYy5vcmlnaW5hbE5hbWUgKyAnXCI8L2I+IHRvIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCB0b3BpYy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19uYW1lIDogdG9waWMudG9waWNOYW1lSW5wdXQudmFsKClcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLm9yaWdpbmFsTmFtZSA9IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2FuY2VsOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRlbGV0ZVRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZScsXHJcblx0XHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArICdcIjwvYj4/JyxcclxuXHRcdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0XHRkZWxldGU6IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lbGVtZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5zbG93LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRjcmVhdGVFZGl0VG9waWNET006IGZ1bmN0aW9uKHRvcGljSWQsIG9yaWdpbmFsTmFtZSl7XHJcblx0XHRcdCQoXCIuZWRpdC10b3BpYy1saXN0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyB0b3BpY0lkICsnXCIgZGF0YS1vcmlnaW5hbC10b3BpYy1uYW1lPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxpbnB1dCBzcGVsbGNoZWNrPVwidHJ1ZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGVkaXQtdG9waWNcIiB0eXBlPVwic3VibWl0XCI+RWRpdDwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidXR0b24gZGVsZXRlLXRvcGljIGJ1dHRvbi0tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC9saT4nKTtcclxuXHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGVkaXRUb3BpYyA9IHRoaXM7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5lZGl0VG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdFx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5FZGl0VG9waWMgPSBuZXcgRWRpdFRvcGljKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNyBEb3RNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIERvdE1lbnUgPSBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMubWVudSA9IG51bGw7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RE9UX01FTlU6ICcuZG90LW1lbnUnLFxyXG5cdFx0QUNUSVZBVE9SOiAnLmRvdC1tZW51X19hY3RpdmF0b3InLFxyXG5cdFx0SVNfVklTSUJMRTogJy5pcy12aXNpYmxlJyxcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJyxcclxuXHRcdEJPVFRPTV9MRUZUOiAnZG90LW1lbnUtLWJvdHRvbS1sZWZ0JyxcclxuXHRcdEJPVFRPTV9SSUdIVDogJ2RvdC1tZW51LS1ib3R0b20tcmlnaHQnLFxyXG5cdFx0VE9QX0xFRlQ6ICdkb3QtbWVudS0tdG9wLWxlZnQnLFxyXG5cdFx0VE9QX1JJR0hUOiAnZG90LW1lbnUtLXRvcC1yaWdodCcsXHJcblx0XHRUQUJMRV9ET1RfTUVOVTogJ2RvdC1tZW51LS10YWJsZSdcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJ1dHRvblJlY3QgPSB0aGlzLmJ1dHRvblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIGxlZnQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LnJpZ2h0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSBsZWZ0Jyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKHRoaXMpKCk7XHJcblx0XHR0aGlzLm1lbnUuYWRkQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLm1lbnUucmVtb3ZlQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuaGlkZSgpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZCh0aGlzKSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuc2hvdy5iaW5kKHRoaXMpKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvdE1lbnUgPSB0aGlzO1xyXG5cdFx0dmFyIG1lbnVJZCA9ICQodGhpcy5idXR0b24pLmF0dHIoJ2lkJykgKyAnLW1lbnUnO1xyXG5cclxuXHRcdHRoaXMubWVudSA9ICQoJyMnICsgbWVudUlkKTtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSB0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uVEFCTEVfRE9UX01FTlUpO1xyXG5cclxuXHRcdHRoaXMuYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGlmKCF0YXJnZXQuaXMoZG90TWVudS5tZW51KSB8fCAhdGFyZ2V0LmlzKGRvdE1lbnUuYnV0dG9uKSkge1xyXG5cdFx0XHRcdGlmKCEkLmNvbnRhaW5zKCQoZG90TWVudS5tZW51KVswXSwgZS50YXJnZXQpKXtcclxuXHRcdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uQUNUSVZBVE9SKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkRvdE1lbnUgPSBuZXcgRG90TWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0NS4gU2Vjb25kIE1hcmtlclxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHR2YXIgTWFya2VyID0gZnVuY3Rpb24gTWFya2VyKCkge1xyXG5cdFx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdFx0dGhpcy5zdHVkZW50VGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvclRhYmxlID0gJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIik7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JEYXRhVGFibGUgPSB0aGlzLnN1cGVydmlzb3JUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdFx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdtYXJrZXItaWQnKSA9PSByb3cuZGF0YSgnc3VwZXJ2aXNvci1pZCcpKXtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdFx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksXHJcblx0XHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5yZXNldFZpZXcgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0XHQkKFwiI3N0dWRlbnQtbmFtZVwiKS50ZXh0KHN0dWRlbnROYW1lKTtcclxuXHRcdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdFx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHRcdCQoXCIjcHJvamVjdC10aXRsZVwiKS5odG1sKCc8Yj5UaXRsZTogPC9iPicgKyBwcm9qZWN0Wyd0aXRsZSddKTtcclxuXHRcdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0WydkZXNjcmlwdGlvbiddKTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHR9XHJcblxyXG5cdCQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHdpbmRvd1snTWFya2VyJ107XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9O1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdHZhciBwcm9qZWN0SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKVsnaWQnXTtcclxuXHRcdHZhciBzdHVkZW50SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtaWQnKTtcclxuXHRcdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0XHR1cmw6IG1hcmtlci5VcmxzXy5BU1NJR05fTUFSS0VSLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkLFxyXG5cdFx0XHRcdHN0dWRlbnRfaWQ6IHN0dWRlbnRJZCxcclxuXHRcdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LnJlbW92ZSgpO1xyXG5cdFx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB0aGlzO1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCh0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTsgfSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxuXHR9XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREaWFsb2cucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdEVkaXRUb3BpYy5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdE1hcmtlci5wcm90b3R5cGUuaW5pdEFsbCgpO1xyXG5cdERvdE1lbnUucHJvdG90eXBlLmluaXRBbGwoKTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==