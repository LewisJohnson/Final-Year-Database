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
| MAIN
|--------------------------------------------------------------------------
|
| A bunch of stuff.
|
|------------------
| FILE STRUCTURE
|------------------
|
|  	1. AJAX Setup
|	2. HTML Modifications
|	3. Forms
|	4. Click Events
| 	5. Change Events
|	6. HTML Editor
*/



"use strict";
;$(function () {

	var animatedCardEntranceAnimationDelay = 0;

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

	$('.animate-cards .card').css("opacity", 0);

	// Animate all cards
	$('.animate-cards .card').each(function (index, value) {
		animatedCardEntranceAnimationDelay += 200;
		setTimeout(function () {
			$(this).addClass("slideInUp animated");

			$(this).animate({
				opacity: 1
			}, 800);
		}.bind(this), animatedCardEntranceAnimationDelay);
	});

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
 	 3. FORMS
    ====================== */

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

	/**
 	* Toggle reverencing emails.
 	*
 	* Visible on supervisor homepage
 */
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

	/**
 * Submit login details
 */
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

	/**
 	* Create a new topic form submit
 */
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

	/* ======================
 	 4. CLICK EVENTS
    ====================== */

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

	// Site-wide feedback
	$('#leave-feedback-button').on('click', function (e) {

		$.confirm({
			title: 'Feedback',
			content: function content() {
				var self = this;
				return $.ajax({
					url: '/feedback',
					dataType: 'html',
					method: 'GET'
				}).done(function (response) {
					self.setContent(response);
				}).fail(function () {
					self.setContent('Something went wrong.');
				});
			},
			type: 'blue',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path  d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg></div>',
			theme: 'material',
			escapeKey: true,
			backgroundDismiss: false,
			animateFromElement: false,
			buttons: {
				formSubmit: {
					text: 'Submit',
					btnClass: 'btn-blue',
					action: function action() {
						var comment = this.$content.find('.comment').val();
						if (!comment) {
							$.alert('Please provide some feedback');
							return false;
						}

						$.ajax({
							url: '/feedback',
							method: 'POST',
							data: this.$content.find('form').serialize(),
							success: function success(response) {
								if (response.successful) {
									createToast('success', response.message);
								} else {
									createToast('error', response.message);
								}
							}
						});
					}
				},
				cancel: function cancel() {
					//close
				}
			},
			onContentReady: function onContentReady() {
				$('#feedback-page').val(window.location.pathname);

				// bind to events
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					e.preventDefault();
					jc.$$formSubmit.trigger('click');
				});
			}
		});
	});

	// Submit receive email form when checkbox toggled
	$('.receive-emails-checkbox').on('click', function (e) {
		$(this).submit();
	});

	// Adds or removes a project from a student favourites
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

	/* ======================
 	 5. CHANGE EVENTS
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

	/* ======================
 	 6. HTML EDITOR
    ====================== */
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

/*
|--------------------------------------------------------------------------
| COMPONENTS
|--------------------------------------------------------------------------
|
| Definitions and nationalisations of custom components.
|
|------------------
| FILE STRUCTURE
|------------------
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
			// Is ESC key is pressed, hide dialogs and mobile menu
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
		this.head = $(element).find('> thead tr');
		this.headers = $(element).find('> thead tr th');
		this.bodyRows = $(element).find('> tbody tr');
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

	// Initialise all components
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzAwMjM4ZjRiZDU4ZWExZjBiMDUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYW5pbWF0ZWRDYXJkRW50cmFuY2VBbmltYXRpb25EZWxheSIsImFqYXhTZXR1cCIsImhlYWRlcnMiLCJhdHRyIiwibGVuZ3RoIiwiYXBwZW5kIiwiY3NzIiwiZWFjaCIsImluZGV4IiwidmFsdWUiLCJzZXRUaW1lb3V0IiwiYWRkQ2xhc3MiLCJhbmltYXRlIiwib3BhY2l0eSIsImJpbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwibGlzdCIsImhhc0NsYXNzIiwiY29uc29sZSIsImVycm9yIiwiYmVmb3JlIiwiYWRkTGFzdE5hbWVIZWFkZXJzVG9MaXN0IiwiYWRkQWxwaGFIZWFkZXJzVG9MaXN0IiwiYWRkVGl0bGVIZWFkZXJzVG9MaXN0Iiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJhamF4IiwidXJsIiwicHJvcCIsInR5cGUiLCJkYXRhIiwic2VyaWFsaXplIiwic3VjY2VzcyIsInJlc3BvbnNlIiwic2hhcmVfbmFtZSIsImNyZWF0ZVRvYXN0Iiwic3VjY2Vzc2Z1bCIsIm1lc3NhZ2UiLCJBamF4RnVuY3Rpb25zIiwicHJvdG90eXBlIiwiU2VsZWN0b3JzXyIsIkxPR19JTl9ESUFMT0ciLCJkaWFsb2ciLCJzaG93TG9hZGVyIiwiaGlkZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiaGlkZUxvYWRlciIsInNob3ciLCJ0ZXh0Iiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiSlNPTiIsInBhcnNlIiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsImlzIiwiYWxlcnQiLCJlbGVtVG9IaWRlU2VsZWN0b3IiLCJlbGVtVG9SZXBsYWNlIiwicmVtb3ZlQ2xhc3MiLCJhZnRlciIsImRyb3Bkb3duIiwiY29udGVudCIsIm1lZGl1bSIsImNhcmQiLCJwYXJlbnQiLCJjb25maXJtIiwidGl0bGUiLCJpY29uIiwidGhlbWUiLCJlc2NhcGVLZXkiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsImFuaW1hdGVGcm9tRWxlbWVudCIsImF1dG9DbG9zZSIsImJ1dHRvbnMiLCJidG5DbGFzcyIsImFjdGlvbiIsIm1ldGhvZCIsInJlbW92ZSIsImNhbmNlbCIsInNlbGYiLCJkYXRhVHlwZSIsInNldENvbnRlbnQiLCJmYWlsIiwiZm9ybVN1Ym1pdCIsImNvbW1lbnQiLCIkY29udGVudCIsIm9uQ29udGVudFJlYWR5Iiwid2luZG93IiwicGF0aG5hbWUiLCJqYyIsIiQkZm9ybVN1Ym1pdCIsInRyaWdnZXIiLCJzdWJtaXQiLCJzdmdDb250YWluZXIiLCJzdmciLCJwcm9qZWN0SWQiLCJhamF4VXJsIiwicHJvamVjdF9pZCIsInNlbGVjdCIsImRvbSIsInN0YXR1cyIsInBhcmVudHMiLCJlcSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJyZXN1bHQiLCJidXR0b25zSHRtbCIsInByZXZpZXdIdG1sIiwiaW5zZXJ0QXRDYXJldCIsIndyYXBUZXh0V2l0aFRhZyIsImlucHV0VXJsIiwicHJvbXB0IiwiaW5wdXRBbHQiLCJpbnB1dFRleHQiLCJNb2JpbGVNZW51IiwiZWxlbWVudCIsImFjdGl2YXRvciIsIkhBTUJVUkdFUl9DT05UQUlORVIiLCJ1bmRlcmxheSIsIlVOREVSTEFZIiwiaW5pdCIsImxvZyIsIkNzc0NsYXNzZXNfIiwiSVNfVklTSUJMRSIsIk1PQklMRV9NRU5VIiwib3Blbk1lbnUiLCJjbG9zZU1lbnUiLCJtb2JpbGVNZW51IiwiaW5pdEFsbCIsIkRpYWxvZyIsImRpYWxvZ05hbWUiLCJoZWFkZXIiLCJESUFMT0dfSEVBREVSIiwiRElBTE9HX0NPTlRFTlQiLCJIdG1sU25pcHBldHNfIiwiTE9BREVSIiwibG9hZGVyIiwiaXNDbG9zYWJsZSIsImFjdGl2YXRvckJ1dHRvbnMiLCJBQ1RJVkUiLCJESUFMT0ciLCJzaG93RGlhbG9nIiwiaGlkZURpYWxvZyIsInB1c2giLCJlcnIiLCJkb2N1bWVudCIsInJlYWR5Iiwia2V5ZG93biIsImtleUNvZGUiLCJEYXRhVGFibGUiLCJib2R5Um93cyIsImZvb3RSb3dzIiwicm93cyIsIm1lcmdlIiwiY2hlY2tib3hlcyIsIkNIRUNLQk9YIiwibWFzdGVyQ2hlY2tib3giLCJNQVNURVJfQ0hFQ0tCT1giLCJEQVRBX1RBQkxFIiwiSVNfU0VMRUNURUQiLCJzZWxlY3RBbGxSb3dzIiwic2VsZWN0Um93IiwiY2hlY2tib3giLCJyb3ciLCJkYXRhVGFibGUiLCJwcm94eSIsImkiLCJDb2x1bW5Ub2dnbGVUYWJsZSIsImhlYWQiLCJzZWxlY3Rvck1lbnUiLCJzZWxlY3RvckJ1dHRvbiIsIlRPR0dMRV9UQUJMRSIsIkNPTFVNTl9TRUxFQ1RPUl9CVVRUT04iLCJDT0xVTU5fU0VMRUNUT1JfTUVOVSIsInRvZ2dsZUNvbHVtbiIsImNvbHVtbkluZGV4IiwidGFibGUiLCJjaGVja2VkIiwiY2hpbGRyZW4iLCJyZW1vdmVBdHRyIiwicmVmcmVzaCIsImhpZGVJbmRpY2VzIiwicmVmcmVzaEFsbCIsInRvZ2dsZVRhYmxlIiwiY29sdW1uU2VsZWN0b3JCdXR0b24iLCJjb2x1bW5TZWxlY3Rvck1lbnUiLCJjb2x1bW5TZWxlY3RvckJ1dHRvbkRvdE1lbnVJZCIsIlNFQVJDSF9JTlBVVCIsIlNFQVJDSF9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUiIsIlNFQVJDSF9GSUxURVJfQlVUVE9OIiwiS2V5c18iLCJTUEFDRSIsIkVOVEVSIiwiQ09NTUEiLCJyZW1vdmVBbGxTaGFkb3dDbGFzc2VzIiwiY29udGFpbmVyIiwiZmlsdGVyQnV0dG9uIiwiYmx1ciIsIm9yaWdpbmFsTmFtZSIsInRvcGljSWQiLCJ0b3BpY05hbWVJbnB1dCIsImVkaXRCdXR0b24iLCJkZWxldGVCdXR0b24iLCJFRElUX1RPUElDIiwiVXJsc18iLCJERUxFVEVfVE9QSUMiLCJQQVRDSF9UT1BJQyIsIk5FV19UT1BJQyIsImVkaXRUb3BpYyIsInRvcGljIiwidG9waWNfaWQiLCJ0b3BpY19uYW1lIiwiZGVsZXRlVG9waWMiLCJkZWxldGUiLCJzbG93IiwiRG90TWVudSIsIk1lbnUiLCJidXR0b24iLCJtZW51IiwiaXNUYWJsZURvdE1lbnUiLCJET1RfTUVOVSIsIkFDVElWQVRPUiIsIkJPVFRPTV9MRUZUIiwiQk9UVE9NX1JJR0hUIiwiVE9QX0xFRlQiLCJUT1BfUklHSFQiLCJUQUJMRV9ET1RfTUVOVSIsInBvc2l0aW9uTWVudSIsImJ1dHRvblJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJsZWZ0IiwicGFyc2VJbnQiLCJ0b3AiLCJyaWdodCIsInRvZ2dsZSIsImRvdE1lbnUiLCJtZW51SWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJjb250YWlucyIsIk1hcmtlciIsInNlbGVjdGVkU3R1ZGVudCIsInNlbGVjdGVkU3VwZXJ2aXNvciIsInN0dWRlbnRUYWJsZSIsInN0dWRlbnREYXRhVGFibGUiLCJzdXBlcnZpc29yVGFibGUiLCJzdXBlcnZpc29yRGF0YVRhYmxlIiwiQVNTSUdOX01BUktFUiIsInNlbGVjdFN0dWRlbnQiLCJzdHVkZW50Um93RE9NIiwibWFya2VyIiwidW5zZWxlY3RBbGwiLCJzZWxlY3RTdXBlcnZpc29yIiwic3VwZXJ2aXNvclJvd0RPTSIsInJlc2V0VmlldyIsInN0dWRlbnROYW1lIiwic3VwZXJ2aXNvck5hbWUiLCJtYXJrZXJOYW1lIiwicHJvamVjdCIsInN0dWRlbnRJZCIsIm1hcmtlcklkIiwic3R1ZGVudF9pZCIsIm1hcmtlcl9pZCJdLCJtYXBwaW5ncyI6IjtBQUFB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QUlBO0FBQ0FoSSxZQUFXbkYsU0FBWCxDQUFxQmlHLE9BQXJCO0FBQ0FDLFFBQU9sRyxTQUFQLENBQWlCaUcsT0FBakI7QUFDQXFCLFdBQVV0SCxTQUFWLENBQW9CaUcsT0FBcEI7QUFDQXVDLG1CQUFrQnhJLFNBQWxCLENBQTRCaUcsT0FBNUI7QUFDQWhGLFdBQVVqQixTQUFWLENBQW9CaUcsT0FBcEI7QUFDQWtILFFBQU9uTixTQUFQLENBQWlCaUcsT0FBakI7QUFDQXdGLFNBQVF6TCxTQUFSLENBQWtCaUcsT0FBbEI7QUFDQSxDQWh5QkEsRSIsImZpbGUiOiJcXGpzXFxtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDcwMDIzOGY0YmQ1OGVhMWYwYjA1IiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IE1BSU5cclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCBBIGJ1bmNoIG9mIHN0dWZmLlxyXG58XHJcbnwtLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCAgXHQxLiBBSkFYIFNldHVwXHJcbnxcdDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG58XHQzLiBGb3Jtc1xyXG58XHQ0LiBDbGljayBFdmVudHNcclxufCBcdDUuIENoYW5nZSBFdmVudHNcclxufFx0Ni4gSFRNTCBFZGl0b3JcclxuKi9cclxuXHJcbmltcG9ydCAnLi4vanMvY29tcG9uZW50cyc7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuOyQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdHZhciBhbmltYXRlZENhcmRFbnRyYW5jZUFuaW1hdGlvbkRlbGF5ID0gMDtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0MS4gQUpBWCBTZXR1cFxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQkLmFqYXhTZXR1cCh7XHJcblx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpLFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHRpZigkKCcuc2hvdy0tc2Nyb2xsLXRvLXRvcCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0JCgnLm1haW4tY29udGVudCcpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBidXR0b24tLWFjY2VudCBzY3JvbGwtdG8tdG9wXCI+U2Nyb2xsIHRvIFRvcDwvYnV0dG9uPicpO1xyXG5cdH1cclxuXHJcblx0JCgnLmFuaW1hdGUtY2FyZHMgLmNhcmQnKS5jc3MoXCJvcGFjaXR5XCIsIDApO1xyXG5cclxuXHQvLyBBbmltYXRlIGFsbCBjYXJkc1xyXG5cdCQoJy5hbmltYXRlLWNhcmRzIC5jYXJkJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdGFuaW1hdGVkQ2FyZEVudHJhbmNlQW5pbWF0aW9uRGVsYXkgKz0gMjAwO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwic2xpZGVJblVwIGFuaW1hdGVkXCIpO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5hbmltYXRlKHtcclxuXHRcdFx0XHRvcGFjaXR5OiAxXHJcblx0XHRcdH0sIDgwMCk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpLCBhbmltYXRlZENhcmRFbnRyYW5jZUFuaW1hdGlvbkRlbGF5KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gQWNjZXNzaWJpbGl0eVxyXG5cdCQoJy5kcm9wZG93bicpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHQkKCcuZHJvcGRvd24gPiBidXR0b24nKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xyXG5cdCQoJy5kcm9wZG93biAuZHJvcGRvd24tY29udGVudCBhJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cclxuXHQvLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcblx0JCgnLnRvcGljcy1saXN0JykucHJlcGVuZCgkKCcuZmlyc3QnKSk7XHJcblx0JCgnLnRvcGljcy1saXN0IC5sb2FkZXInKS5mYWRlT3V0KDApO1xyXG5cdCQoJy50b3BpY3MtbGlzdCBsaScpLmZpcnN0KCkuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCwgZnVuY3Rpb24gc2hvd05leHRUb3BpYygpIHtcclxuXHRcdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIHNob3dOZXh0VG9waWMpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcub3JkZXItbGlzdC1qcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0XHQvLyBzb3J0VW5vcmRlcmVkTGlzdChsaXN0KTtcclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdsYXN0LW5hbWUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdhbHBoYS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkQWxwaGFIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ3RpdGxlLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRUaXRsZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCAzLiBGT1JNU1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIiNzaGFyZS1uYW1lLWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5zaGFyZV9uYW1lKXtcclxuXHRcdFx0XHRcdGNyZWF0ZVRvYXN0KCdzdWNjZXNzJywgJ1lvdXIgbmFtZSBpcyBiZWluZyBzaGFyZWQgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y3JlYXRlVG9hc3QoJycsICdZb3UgYXJlIG5vIGxvbmdlciBzaGFyaW5nIHlvdXIgbmFtZSB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKCcjc2hhcmVfbmFtZScpLnByb3AoJ2NoZWNrZWQnLCByZXNwb25zZS5zaGFyZV9uYW1lKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyoqXHJcblx0XHQqIFRvZ2dsZSByZXZlcmVuY2luZyBlbWFpbHMuXHJcblx0XHQqXHJcblx0XHQqIFZpc2libGUgb24gc3VwZXJ2aXNvciBob21lcGFnZVxyXG5cdCovXHJcblx0JChcIi5yZWNlaXZlLWVtYWlscy1mb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc3VjY2Vzc2Z1bCl7XHJcblx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnc3VjY2VzcycsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnZXJyb3InLCByZXNwb25zZS5tZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCogU3VibWl0IGxvZ2luIGRldGFpbHNcclxuXHQqL1xyXG5cdCQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkKCcuaGVscC1ibG9jaycsICcjbG9naW5Gb3JtJykuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLnNob3dMb2FkZXIoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLmhpZGUoKTtcclxuXHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRcdCQoQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuc2hvdygpO1xyXG5cdFx0XHRcdCQoJyNsb2dpbi11c2VybmFtZScsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykuYWRkQ2xhc3MoXCJoYXMtZXJyb3JcIik7XHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnRleHQoZGF0YVtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yc1wiXVtcInVzZXJuYW1lXCJdWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKipcclxuXHRcdCogQ3JlYXRlIGEgbmV3IHRvcGljIGZvcm0gc3VibWl0XHJcblx0Ki9cclxuXHQkKCcjbmV3LXRvcGljLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciBzdWJtaXRCdXR0b24gPSAkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKTtcclxuXHRcdHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHQkKCcubG9hZGVyJywgc3VibWl0QnV0dG9uKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRjb250ZXh0OiAkKHRoaXMpLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zLmNyZWF0ZUVkaXRUb3BpY0RPTShkYXRhW1wiaWRcIl0sIGRhdGFbXCJuYW1lXCJdKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0XHRcdCQodGhpcykuZmluZCgnOnN1Ym1pdCcpLmh0bWwoJ0FkZCcpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8vIE5FVyBVU0VSXHJcblx0Ly8gcHV0IHRoaXMgc3R1ZmYgaW4gYW4gYXJyYXlcclxuXHQvLyB0b2RvOiBpZiBzdHVkZW50IGlzIHNlbGVjdGVkLCBkZXNlbGVjdCB0aGUgcmVzdCBhbmQgZGlzYWJsZSB0aGVtIChsaWtld2lzZSBmb3Igb3RoZXIgY2hlY2tib3hlcylcclxuXHJcblx0JCgnLnVzZXItZm9ybSAjdXNlcm5hbWUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy51c2VyLWZvcm0gI2VtYWlsJykudmFsKCQodGhpcykudmFsKCkgKyBcIkBzdXNzZXguYWMudWtcIik7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNzdXBlcnZpc29yLWZvcm0nKS5oaWRlKCk7XHJcblx0JCgnI3N0dWRlbnQtZm9ybScpLmhpZGUoKTtcclxuXHJcblx0JCgnI2NyZWF0ZS1mb3JtLWFjY2Vzcy1zZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdGlmKCQoJy5uZXctdXNlci1zdHVkZW50JykuaXMoXCI6c2VsZWN0ZWRcIikpIHtcclxuXHRcdFx0JCgnI3N0dWRlbnQtZm9ybScpLnNob3coKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJyNzdHVkZW50LWZvcm0nKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0XHRpZigkKCcjc3VwZXJ2aXNvci1vcHRpb24nKS5pcyhcIjpzZWxlY3RlZFwiKSkge1xyXG5cdFx0XHQkKCcjc3VwZXJ2aXNvci1mb3JtJykuc2hvdygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnI3N1cGVydmlzb3ItZm9ybScpLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0IDQuIENMSUNLIEVWRU5UU1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5lbWFpbC1zZWxlY3RlZFwiLCBmdW5jdGlvbihlKSB7XHJcblx0XHRpZigkKHRoaXMpLnByb3AoJ2hyZWYnKSA9PT0gJ21haWx0bzonIHx8ICQodGhpcykucHJvcCgnaHJlZicpID09PSBudWxsKXtcclxuXHRcdFx0YWxlcnQoXCJZb3UgaGF2ZW4ndCBzZWxlY3RlZCBhbnlvbmUuXCIpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIEV4dGVybmFsIGxpbmtzIGdpdmUgYW4gaWxsdXNpb24gb2YgQUpBWFxyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIuZXh0ZXJuYWwtbGlua1wiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIGVsZW1Ub0hpZGVTZWxlY3RvciA9ICQoJCh0aGlzKS5kYXRhKCdlbGVtZW50LXRvLWhpZGUtc2VsZWN0b3InKSk7XHJcblx0XHR2YXIgZWxlbVRvUmVwbGFjZSA9ICQoJCh0aGlzKS5kYXRhKCdlbGVtZW50LXRvLXJlcGxhY2Utd2l0aC1sb2FkZXItc2VsZWN0b3InKSk7XHJcblxyXG5cdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdFx0ZWxlbVRvSGlkZVNlbGVjdG9yLmhpZGUoKTtcclxuXHRcdGVsZW1Ub1JlcGxhY2UuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5hZnRlcignPGRpdiBpZD1cImNvbnRlbnQtcmVwbGFjZWQtY29udGFpbmVyXCIgY2xhc3M9XCJsb2FkZXIgbG9hZGVyLS14LWxhcmdlXCI+PC9kaXY+Jyk7XHJcblxyXG5cdFx0JCgnI2NvbnRlbnQtcmVwbGFjZWQtY29udGFpbmVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0fSk7XHJcblxyXG5cdCQoJ25hdi5tb2JpbGUgLnN1Yi1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZHJvcGRvd24gPSAkKHRoaXMpO1xyXG5cdFx0dmFyIGNvbnRlbnQgPSBkcm9wZG93bi5maW5kKCcuZHJvcGRvd24tY29udGVudCcpO1xyXG5cclxuXHRcdGlmKGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIpID09IFwidHJ1ZVwiKXtcclxuXHRcdFx0ZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duLmZpbmQoXCIuc3ZnLWNvbnRhaW5lciBzdmdcIikuY3NzKFwidHJhbnNmb3JtXCIsIFwicm90YXRlWigwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuaGlkZShjb25maWcuYW5pbXRpb25zLm1lZGl1bSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCB0cnVlKTtcclxuXHRcdFx0Y29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgZmFsc2UpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDE4MGRlZylcIik7XHJcblx0XHRcdGRyb3Bkb3duLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRjb250ZW50LnNob3coY29uZmlnLmFuaW10aW9ucy5tZWRpdW0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKCcuc3R1ZGVudC11bmRvLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBjYXJkID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnVW5kbyBQcm9qZWN0IFNlbGVjdGlvbicsXHJcblx0XHRcdHR5cGU6ICdyZWQnLFxyXG5cdFx0XHRpY29uOiAnPGRpdiBjbGFzcz1cInN2Zy1jb250YWluZXJcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTEyLjUsOEM5Ljg1LDggNy40NSw5IDUuNiwxMC42TDIsN1YxNkgxMUw3LjM4LDEyLjM4QzguNzcsMTEuMjIgMTAuNTQsMTAuNSAxMi41LDEwLjVDMTYuMDQsMTAuNSAxOS4wNSwxMi44MSAyMC4xLDE2TDIyLjQ3LDE1LjIyQzIxLjA4LDExLjAzIDE3LjE1LDggMTIuNSw4WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0YXV0b0Nsb3NlOiAnY2FuY2VsfDEwMDAwJyxcclxuXHRcdFx0Y29udGVudDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byB1bi1zZWxlY3QgeW91ciBzZWxlY3RlZCBwcm9qZWN0PzwvYj4nLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0Y29uZmlybToge1xyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQQVRDSCcsXHJcblx0XHRcdFx0XHRcdFx0dXJsOiAnL3N0dWRlbnRzL3VuZG8tc2VsZWN0ZWQtcHJvamVjdCcsXHJcblx0XHRcdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FyZC5oaWRlKDQwMCwgZnVuY3Rpb24oKSB7IGNhcmQucmVtb3ZlKCk7IH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnc3VjY2VzcycsICdVbmRvIHN1Y2Nlc3NmdWwuJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnZXJyb3InLCByZXNwb25zZS5tZXNzYWdlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2FuY2VsOiB7fSxcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdFxyXG5cdC8vIFNpdGUtd2lkZSBmZWVkYmFja1xyXG5cdCQoJyNsZWF2ZS1mZWVkYmFjay1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuXHRcdFxyXG5cclxuXHRcdCQuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiAnRmVlZGJhY2snLFxyXG5cdFx0XHRjb250ZW50OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHRcdFx0dXJsOiAnL2ZlZWRiYWNrJyxcclxuXHRcdFx0XHRcdGRhdGFUeXBlOiAnaHRtbCcsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRzZWxmLnNldENvbnRlbnQocmVzcG9uc2UpO1xyXG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHNlbGYuc2V0Q29udGVudCgnU29tZXRoaW5nIHdlbnQgd3JvbmcuJyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHR5cGU6ICdibHVlJyxcclxuXHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggIGQ9XCJNMTcsOUg3VjdIMTdNMTcsMTNIN1YxMUgxN00xNCwxN0g3VjE1SDE0TTEyLDNBMSwxIDAgMCwxIDEzLDRBMSwxIDAgMCwxIDEyLDVBMSwxIDAgMCwxIDExLDRBMSwxIDAgMCwxIDEyLDNNMTksM0gxNC44MkMxNC40LDEuODQgMTMuMywxIDEyLDFDMTAuNywxIDkuNiwxLjg0IDkuMTgsM0g1QTIsMiAwIDAsMCAzLDVWMTlBMiwyIDAgMCwwIDUsMjFIMTlBMiwyIDAgMCwwIDIxLDE5VjVBMiwyIDAgMCwwIDE5LDNaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHR0aGVtZTogJ21hdGVyaWFsJyxcclxuXHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogZmFsc2UsXHJcblx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0Zm9ybVN1Ym1pdDoge1xyXG5cdFx0XHRcdFx0dGV4dDogJ1N1Ym1pdCcsXHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1ibHVlJyxcclxuXHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgY29tbWVudCA9IHRoaXMuJGNvbnRlbnQuZmluZCgnLmNvbW1lbnQnKS52YWwoKTtcclxuXHRcdFx0XHRcdFx0aWYoIWNvbW1lbnQpe1xyXG5cdFx0XHRcdFx0XHRcdCQuYWxlcnQoJ1BsZWFzZSBwcm92aWRlIHNvbWUgZmVlZGJhY2snKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHRcdFx0dXJsOiAnL2ZlZWRiYWNrJyxcclxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHRcdFx0XHRkYXRhOiB0aGlzLiRjb250ZW50LmZpbmQoJ2Zvcm0nKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRcdFx0XHRcdGlmKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnc3VjY2VzcycsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRlVG9hc3QoJ2Vycm9yJywgcmVzcG9uc2UubWVzc2FnZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Ly9jbG9zZVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdG9uQ29udGVudFJlYWR5OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0JCgnI2ZlZWRiYWNrLXBhZ2UnKS52YWwod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcclxuXHJcblx0XHRcdFx0Ly8gYmluZCB0byBldmVudHNcclxuXHRcdFx0XHR2YXIgamMgPSB0aGlzO1xyXG5cdFx0XHRcdHRoaXMuJGNvbnRlbnQuZmluZCgnZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0amMuJCRmb3JtU3VibWl0LnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBTdWJtaXQgcmVjZWl2ZSBlbWFpbCBmb3JtIHdoZW4gY2hlY2tib3ggdG9nZ2xlZFxyXG5cdCQoJy5yZWNlaXZlLWVtYWlscy1jaGVja2JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0JCh0aGlzKS5zdWJtaXQoKTtcclxuXHR9KTtcclxuXHRcclxuXHQvLyBBZGRzIG9yIHJlbW92ZXMgYSBwcm9qZWN0IGZyb20gYSBzdHVkZW50IGZhdm91cml0ZXNcclxuXHQkKFwiLmZhdm91cml0ZS1jb250YWluZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc3ZnQ29udGFpbmVyID0gJCh0aGlzKTtcclxuXHRcdHZhciBzdmcgPSBzdmdDb250YWluZXIuZmluZCgnc3ZnJyk7XHJcblxyXG5cdFx0aWYod2luZG93Wydwcm9qZWN0J10gIT0gbnVsbCl7XHJcblx0XHRcdHZhciBwcm9qZWN0SWQgPSB3aW5kb3dbJ3Byb2plY3QnXS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcHJvamVjdElkID0gJCh0aGlzKS5kYXRhKCdwcm9qZWN0LWlkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3ZnLmhpZGUoMCk7XHJcblx0XHQkKCcubG9hZGVyJywgc3ZnQ29udGFpbmVyKS5zaG93KDApO1xyXG5cclxuXHRcdGlmKHN2Zy5oYXNDbGFzcygnZmF2b3VyaXRlJykpe1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ3JlbW92ZSc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9yZW1vdmUtZmF2b3VyaXRlJztcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgYWN0aW9uID0gJ2FkZCc7XHJcblx0XHRcdHZhciBhamF4VXJsID0gJy9zdHVkZW50cy9hZGQtZmF2b3VyaXRlJztcclxuXHRcdH1cclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGFqYXhVcmwsXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdHByb2plY3RfaWQ6IHByb2plY3RJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoYWN0aW9uID09IFwiYWRkXCIpe1xyXG5cdFx0XHRcdFx0c3ZnLmFkZENsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3ZnLnJlbW92ZUNsYXNzKCdmYXZvdXJpdGUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdHN2Zy5mYWRlSW4oY29uZmlnLmFuaW10aW9ucy5mYXN0KTtcclxuXHRcdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuaGlkZSgwKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCA1LiBDSEFOR0UgRVZFTlRTXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdCQoXCJib2R5XCIpLm9uKFwiY2hhbmdlXCIsIFwiLmVtYWlsLXRhYmxlIC5jaGVja2JveCBpbnB1dFwiLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzZWxlY3QgPSBmdW5jdGlvbihkb20pe1xyXG5cdFx0XHR2YXIgc3RhdHVzID0gZG9tLnBhcmVudHMoKS5lcSg0KS5kYXRhKCdzdGF0dXMnKTtcclxuXHRcdFx0dmFyIGVtYWlsU3RyaW5nID0gXCJtYWlsdG86XCI7XHJcblx0XHRcdHZhciBjaGVja2JveFNlbGVjdG9yID0gJy5lbWFpbC10YWJsZS4nICsgc3RhdHVzICsgJyAuY2hlY2tib3ggaW5wdXQnO1xyXG5cdFx0XHR2YXIgZW1haWxCdXR0b25zZWxlY3RvciA9IFwiLmVtYWlsLXNlbGVjdGVkLlwiICsgc3RhdHVzO1xyXG5cclxuXHRcdFx0JChjaGVja2JveFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0XHRcdGlmKCQodmFsdWUpLmlzKFwiOmNoZWNrZWRcIikgJiYgISQodmFsdWUpLmhhc0NsYXNzKFwibWFzdGVyLWNoZWNrYm94XCIpKSB7XHJcblx0XHRcdFx0XHRlbWFpbFN0cmluZyArPSAkKHZhbHVlKS5kYXRhKCdlbWFpbCcpO1xyXG5cdFx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gXCIsXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0JChlbWFpbEJ1dHRvbnNlbGVjdG9yKS5wcm9wKCdocmVmJywgZW1haWxTdHJpbmcpO1xyXG5cdFx0fTtcclxuXHRcdHNldFRpbWVvdXQoc2VsZWN0KCQodGhpcykpLCAyMDAwKTtcclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0IDYuIEhUTUwgRURJVE9SXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdCQoJy5odG1sLWVkaXRvcicpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKXtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJy9zbmlwcGV0P3NuaXBwZXQ9aHRtbC1lZGl0b3ItdG9vbGJhcicsXHJcblx0XHRcdHR5cGU6J0dFVCcsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzdWx0KXtcclxuXHRcdFx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykuYWZ0ZXIocmVzdWx0KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBidXR0b25zSHRtbCA9IFwiPGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXRvcC1idXR0b25zIGZsZXgnPjxidXR0b24gY2xhc3M9J2h0bWwnIHR5cGU9J2J1dHRvbic+SFRNTDwvYnV0dG9uPjxidXR0b24gY2xhc3M9J3ByZXZpZXcnIHR5cGU9J2J1dHRvbic+UFJFVklFVzwvYnV0dG9uPjwvZGl2PlwiO1xyXG5cdFx0dmFyIHByZXZpZXdIdG1sID0gXCI8ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tcHJldmlldy1jb250YWluZXInPjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS1wcmV2aWV3Jz48L2Rpdj48L2Rpdj5cIjtcclxuXHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykuYmVmb3JlKGJ1dHRvbnNIdG1sKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvcicpLmFmdGVyKHByZXZpZXdIdG1sKTtcclxuXHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3JykuaHRtbCgkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykudmFsKCkpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXcnKS5odG1sKCQodGhpcykudmFsKCkpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuaHRtbC1lZGl0b3ItLXRvcC1idXR0b25zIC5odG1sJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5zaG93KCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXRvb2xiYXInKS5zaG93KCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJykuaGlkZSgpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuaHRtbC1lZGl0b3ItLXRvcC1idXR0b25zIC5wcmV2aWV3Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0taW5wdXQnKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXRvb2xiYXInKS5oaWRlKCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJykuc2hvdygpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBUb2dnbGUgbGFiZWwgZmxpcHMgdG9nZ2xlXHJcblx0JChcIi5odG1sLWVkaXRvclwiKS5vbihcImNsaWNrXCIsIFwiLmh0bWwtZWRpdG9yLS10b29sYmFyIGxpIGJ1dHRvblwiLCAgZnVuY3Rpb24oZSkge1xyXG5cdFx0c3dpdGNoKCQodGhpcykuZGF0YSgndHlwZScpKXtcclxuXHRcdFx0Y2FzZSBcImxpbmVicmVha1wiOlxyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8YnI+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwib2xcIjpcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnXFxuPG9sPlxcblxcdDxsaT5JdGVtIDE8L2xpPlxcblxcdDxsaT5JdGVtIDI8L2xpPlxcblxcdDxsaT5JdGVtIDM8L2xpPlxcbjwvb2w+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidWxcIjpcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnXFxuPHVsPlxcblxcdDxsaT5JdGVtIHg8L2xpPlxcblxcdDxsaT5JdGVtIHk8L2xpPlxcblxcdDxsaT5JdGVtIHo8L2xpPlxcbjwvdWw+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiYm9sZFwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ2InKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ0dFwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3R0Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiaXRhbGljXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAnaScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInVuZGVybGluZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ3UnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpbWdcIjpcclxuXHRcdFx0XHR2YXIgaW5wdXRVcmwgPSBwcm9tcHQoXCJFbnRlciB0aGUgaW1hZ2UgVVJMXCIsIFwiaHR0cHM6Ly93d3cuXCIpO1xyXG5cdFx0XHRcdHZhciBpbnB1dEFsdCA9IHByb21wdChcIkVudGVyIGFsdCB0ZXh0XCIsIFwiSW1hZ2Ugb2YgU3Vzc2V4IGNhbXB1c1wiKTtcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGltZyBhbHQ9XCInICsgaW5wdXRBbHQgKyAnXCIgc3JjPVwiJyArIGlucHV0VXJsICsgJ1wiPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImxpbmtcIjpcclxuXHRcdFx0XHR2YXIgaW5wdXRVcmwgPSBwcm9tcHQoXCJFbnRlciB0aGUgVVJMXCIsIFwiaHR0cHM6Ly93d3cuXCIpO1xyXG5cdFx0XHRcdHZhciBpbnB1dFRleHQgPSBwcm9tcHQoXCJFbnRlciBkaXNwbGF5IHRleHRcIiwgXCJTdXNzZXhcIik7XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxhIGhyZWY9XCInICsgaW5wdXRVcmwgKyAnXCI+JyArIGlucHV0VGV4dCArICc8L2E+Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiY29kZVwiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ2NvZGUnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJwcmVcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdwcmUnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJpbmZvXCI6XHJcblx0XHRcdFx0JC5kaWFsb2coe1xyXG5cdFx0XHRcdFx0dGhlbWU6ICdtYXRlcmlhbCcsXHJcblx0XHRcdFx0XHRlc2NhcGVLZXk6IHRydWUsXHJcblx0XHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICdIVE1MIEVkaXRvciBJbmZvJyxcclxuXHRcdFx0XHRcdGNvbnRlbnQ6ICdBbGwgbGlua3MgeW91IGFkZCB3aWxsIG9wZW4gaW4gYSBuZXcgdGFiLiBBbGwgSFRNTCA1IGVsZW1lbnRzIGFyZSB2YWxpZCBmb3IgdGhlIGRlc2NyaXB0aW9uIGZpZWxkLCBleGNsdWRpbmc7IDxicj48YnI+IDx1bD48bGk+U2NyaXB0IHRhZ3M8L2xpPjxsaT5IZWFkaW5nIHRhZ3M8L2xpPjxsaT5IVE1MIHJvb3QgdGFnczwvbGk+PGxpPkJvZHkgdGFnczwvbGk+PC91bD4nLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBDT01QT05FTlRTXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnwgRGVmaW5pdGlvbnMgYW5kIG5hdGlvbmFsaXNhdGlvbnMgb2YgY3VzdG9tIGNvbXBvbmVudHMuXHJcbnxcclxufC0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZJTEUgU1RSVUNUVVJFXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58XHQxLiBNb2JpbGUgTWVudVxyXG58XHQyLiBEaWFsb2cgLyBNb2RhbFxyXG58XHQzLiBEYXRhIFRhYmxlXHJcbnxcdDQuIENvbHVtbiBUb2dnbGUgVGFibGVcclxufFx0NS4gRm9ybXMgLyBBSkFYIEZ1bmN0aW9uc1xyXG58XHQ2LiBFZGl0IFRvcGljcyBbQWRtaW5dXHJcbnxcdDcuIE1lbnVcclxufFxyXG4qL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbjskKGZ1bmN0aW9uKCkge1xyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0IDEuIE1vYmlsZSBNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdFx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgbW9iaWxlIG1lbnUuXHJcblx0XHQqXHJcblx0XHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIE1vYmlsZU1lbnUgPSAgZnVuY3Rpb24gTW9iaWxlTWVudShlbGVtZW50KSB7XHJcblx0XHRpZih3aW5kb3dbJ01vYmlsZU1lbnUnXSA9PSBudWxsKXtcclxuXHRcdFx0d2luZG93WydNb2JpbGVNZW51J10gPSB0aGlzO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0XHR0aGlzLmFjdGl2YXRvciA9ICQodGhpcy5TZWxlY3RvcnNfLkhBTUJVUkdFUl9DT05UQUlORVIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5ID0gJCh0aGlzLlNlbGVjdG9yc18uVU5ERVJMQVkpO1xyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlcmUgY2FuIG9ubHkgYmUgb25lIG1vYmlsZSBtZW51LlwiKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJ1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRNT0JJTEVfTUVOVTogJ25hdi5tb2JpbGUnLFxyXG5cdFx0SEFNQlVSR0VSX0NPTlRBSU5FUjogJy5oYW1idXJnZXItY29udGFpbmVyJyxcclxuXHRcdFVOREVSTEFZOiAnLm1vYmlsZS1uYXYtdW5kZXJsYXknXHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUub3Blbk1lbnUgPSBmdW5jdGlvbiAoKXtcclxuXHRcdHRoaXMuYWN0aXZhdG9yLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuY2xvc2VNZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblxyXG5cdFx0dGhpcy51bmRlcmxheS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbW9iaWxlTWVudSA9IHRoaXM7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5vbignY2xpY2snLCBtb2JpbGVNZW51Lm9wZW5NZW51LmJpbmQobW9iaWxlTWVudSkpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5vbignY2xpY2snLCBtb2JpbGVNZW51LmNsb3NlTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uTU9CSUxFX01FTlUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDIuIERpYWxvZyAvIE1vZGFsXHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHR2YXIgRGlhbG9nID0gZnVuY3Rpb24gRGlhbG9nKGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR0aGlzLmRpYWxvZ05hbWUgPSAkKGVsZW1lbnQpLmRhdGEoJ2RpYWxvZycpO1xyXG5cdFx0dGhpcy51bmRlcmxheSA9ICQoJy51bmRlcmxheScpO1xyXG5cdFx0dGhpcy5oZWFkZXIgPSAkKGVsZW1lbnQpLmZpbmQodGhpcy5TZWxlY3RvcnNfLkRJQUxPR19IRUFERVIpO1xyXG5cdFx0dGhpcy5jb250ZW50ID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfQ09OVEVOVCk7XHJcblxyXG5cdFx0Ly8gUmVnaXN0ZXIgQ29tcG9uZW50XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoXCJyZWdpc3RlcmVkXCIpO1xyXG5cclxuXHRcdC8vIEFSSUFcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwicm9sZVwiLCBcImRpYWxvZ1wiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1sYWJlbGxlZGJ5XCIsIFwiZGlhbG9nLXRpdGxlXCIpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIFwiZGlhbG9nLWRlc2NcIik7XHJcblx0XHR0aGlzLmhlYWRlci5hdHRyKCd0aXRsZScsIHRoaXMuaGVhZGVyLmZpbmQoJyNkaWFsb2ctZGVzYycpLmh0bWwoKSk7XHJcblxyXG5cdFx0dGhpcy5jb250ZW50LmJlZm9yZSh0aGlzLkh0bWxTbmlwcGV0c18uTE9BREVSKTtcclxuXHRcdHRoaXMubG9hZGVyID0gJChlbGVtZW50KS5maW5kKFwiLmxvYWRlclwiKTtcclxuXHRcdHRoaXMuaXNDbG9zYWJsZSA9IHRydWU7XHJcblx0XHR0aGlzLmFjdGl2YXRvckJ1dHRvbnMgPSBbXTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRcdExPQURFUjogJzxkaXYgY2xhc3M9XCJsb2FkZXJcIiBzdHlsZT1cIndpZHRoOiAxMDBweDsgaGVpZ2h0OiAxMDBweDt0b3A6IDI1JTtcIj48L2Rpdj4nLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRBQ1RJVkU6ICdhY3RpdmUnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERJQUxPRzogJy5kaWFsb2cnLFxyXG5cdFx0RElBTE9HX0hFQURFUjogJy5oZWFkZXInLFxyXG5cdFx0RElBTE9HX0NPTlRFTlQ6ICcuY29udGVudCcsXHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5zaG93TG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLnNob3coMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuaGlkZSgwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmhpZGVMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5sb2FkZXIuaGlkZSgwKTtcclxuXHRcdHRoaXMuY29udGVudC5zaG93KDApO1xyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblx0XHR0aGlzLnVuZGVybGF5LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIsIHRoaXMuZGlhbG9nTmFtZSk7XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5BQ1RJVkUpO1xyXG5cdFx0d2luZG93WydEaWFsb2cnXSA9IHRoaXM7XHJcblx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXS5jbG9zZU1lbnUoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmhpZGVEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5pc0Nsb3NhYmxlICYmIHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIpID09IHRoaXMuZGlhbG9nTmFtZSl7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0Ly8gTmVlZGVkIGZvciBjb250ZXh0XHJcblx0XHR2YXIgZGlhbG9nID0gdGhpcztcclxuXHJcblx0XHQvLyBGaW5kIGFjdGl2YXRvciBidXR0b25cclxuXHRcdCQoJ2J1dHRvbicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQodGhpcykuZGF0YSgnYWN0aXZhdG9yJykgJiYgJCh0aGlzKS5kYXRhKCdkaWFsb2cnKSA9PSBkaWFsb2cuZGlhbG9nTmFtZSl7XHJcblx0XHRcdFx0ZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMucHVzaCgkKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQVJJQVxyXG5cdFx0ZGlhbG9nLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdGRpYWxvZy51bmRlcmxheS5vbignY2xpY2snLCBkaWFsb2cuaGlkZURpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cclxuXHRcdHRyeXtcclxuXHRcdFx0JChkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGRpYWxvZy5zaG93RGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBjYXRjaChlcnIpe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIFwiICsgZGlhbG9nLmRpYWxvZ05hbWUgKyBcIiBoYXMgbm8gYWN0aXZhdG9yIGJ1dHRvbi5cIik7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRElBTE9HKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRpYWxvZyA9IG5ldyBEaWFsb2codGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcykua2V5ZG93bihmdW5jdGlvbihlKSB7XHJcblx0XHRcdC8vIElzIEVTQyBrZXkgaXMgcHJlc3NlZCwgaGlkZSBkaWFsb2dzIGFuZCBtb2JpbGUgbWVudVxyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydEaWFsb2cnXS5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0My4gRGF0YSBUYWJsZVxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLmZvb3RSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Zm9vdCB0cicpO1xyXG5cdFx0dGhpcy5yb3dzID0gJC5tZXJnZSh0aGlzLmJvZHlSb3dzLCB0aGlzLmZvb3RSb3dzKTtcclxuXHRcdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdFx0dGhpcy5tYXN0ZXJDaGVja2JveCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uTUFTVEVSX0NIRUNLQk9YKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snRGF0YVRhYmxlJ10gPSBEYXRhVGFibGU7XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICcuZGF0YS10YWJsZScsXHJcblx0XHRNQVNURVJfQ0hFQ0tCT1g6ICd0aGVhZCAubWFzdGVyLWNoZWNrYm94JyxcclxuXHRcdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRcdElTX1NFTEVDVEVEOiAnLmlzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0c2VsZWN0QWxsUm93czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKHRoaXMubWFzdGVyQ2hlY2tib3guaXMoJzpjaGVja2VkJykpe1xyXG5cdFx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHNlbGVjdFJvdzogZnVuY3Rpb24gKGNoZWNrYm94LCByb3cpIHtcclxuXHRcdFx0aWYgKHJvdykge1xyXG5cdFx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdFx0cm93LmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuIENvbHVtbiBUb2dnbGUgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQ29sdW1uVG9nZ2xlVGFibGUgPSBmdW5jdGlvbiBDb2x1bW5Ub2dnbGVUYWJsZShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5oZWFkID0gJChlbGVtZW50KS5maW5kKCc+IHRoZWFkIHRyJyk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJz4gdGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJz4gdGJvZHkgdHInKTtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBudWxsO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydDb2x1bW5Ub2dnbGVUYWJsZSddID0gQ29sdW1uVG9nZ2xlVGFibGU7XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRUT0dHTEVfVEFCTEU6ICcudGFibGUtY29sdW1uLXRvZ2dsZSdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9CVVRUT046ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGRvdC1tZW51X19hY3RpdmF0b3JcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1sZWZ0OmF1dG87XCI+Q29sdW1uczwvYnV0dG9uPicsXHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfTUVOVTogJzx1bCBjbGFzcz1cImRvdC1tZW51IGRvdC1tZW51LS1ib3R0b20tbGVmdFwiPjwvdWw+J1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0XHR0b2dnbGVDb2x1bW46IGZ1bmN0aW9uKGNvbHVtbkluZGV4LCB0YWJsZSwgY2hlY2tlZCkge1xyXG5cdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuYXR0cignaGlkZGVuJywgXCJ0cnVlXCIpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaDogZnVuY3Rpb24odGFibGUpIHtcclxuXHRcdFx0dmFyIGhpZGVJbmRpY2VzID0gW107XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cyA9IHRhYmxlLmVsZW1lbnQuZmluZCgndGJvZHkgdHInKTtcclxuXHRcdFx0dGFibGUuaGVhZGVycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoJCh0aGlzKS5hdHRyKCdoaWRkZW4nKSl7XHJcblx0XHRcdFx0XHRoaWRlSW5kaWNlcy5wdXNoKCQodGhpcykuaW5kZXgoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZGVJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoaGlkZUluZGljZXNbaV0pLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JChDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy5yZWZyZXNoKHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZighdGhpcy5lbGVtZW50LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkNvbHVtblRvZ2dsZVRhYmxlIHJlcXVpcmVzIHRoZSB0YWJsZSB0byBoYXZlIGFuIHVuaXF1ZSBJRC5cIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdG9nZ2xlVGFibGUgPSB0aGlzO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX0JVVFRPTik7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JNZW51ID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX01FTlUpO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkID0gJ0NvbHVtblRvZ2dsZVRhYmxlLScgKyB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmJlZm9yZShjb2x1bW5TZWxlY3RvckJ1dHRvbik7XHJcblxyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYWZ0ZXIoY29sdW1uU2VsZWN0b3JNZW51KTtcclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JNZW51LmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgKyAnLW1lbnUnKTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gY29sdW1uU2VsZWN0b3JCdXR0b247XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IGNvbHVtblNlbGVjdG9yTWVudTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudS5maW5kKCd1bCcpLmRhdGEoXCJ0YWJsZVwiLCB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJykpO1xyXG5cclxuXHRcdHRoaXMuaGVhZGVycy5lYWNoKGZ1bmN0aW9uICgpe1xyXG5cdFx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuZGF0YShcImRlZmF1bHRcIikgPyBcImNoZWNrZWRcIiA6IFwiXCI7XHJcblx0XHRcdCQodGhpcykuZGF0YSgndmlzaWJsZScsICQodGhpcykuZGF0YShcImRlZmF1bHRcIikpO1xyXG5cclxuXHRcdFx0Y29sdW1uU2VsZWN0b3JNZW51LmFwcGVuZCgnXFxcclxuXHRcdFx0XHQ8bGkgY2xhc3M9XCJkb3QtbWVudV9faXRlbSBkb3QtbWVudV9faXRlbS0tcGFkZGVkXCI+IFxcXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4gXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY29sdW1uLXRvZ2dsZVwiIGlkPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIiB0eXBlPVwiY2hlY2tib3hcIiAnKyBjaGVja2VkICsnPiBcXFxyXG5cdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIj4nICsgJCh0aGlzKS50ZXh0KCkgKyAnPC9sYWJlbD4gXFxcclxuXHRcdFx0XHRcdDwvZGl2PiBcXFxyXG5cdFx0XHRcdDwvbGk+Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5jb2x1bW4tdG9nZ2xlXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpbmRleCA9ICQoJy5jb2x1bW4tdG9nZ2xlJykuaW5kZXgodGhpcyk7XHJcblx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMudG9nZ2xlQ29sdW1uKGluZGV4LCB0b2dnbGVUYWJsZSwgJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUgPSBuZXcgQ29sdW1uVG9nZ2xlVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ1IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG5cdHdpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRcdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0XHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0XHRTUEFDRTogMzIsXHJcblx0XHRFTlRFUjogMTMsXHJcblx0XHRDT01NQTogNDVcclxuXHR9O1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU0VBUkNIXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdFx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdFx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHRcdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHRcdHRoaXMudG9waWNOYW1lSW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRORVdfVE9QSUM6ICcvdG9waWNzLydcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdGVkaXRUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRcdGlmKHRvcGljLm9yaWdpbmFsTmFtZSA9PSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSl7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQuY29uZmlybSh7XHJcblx0XHRcdFx0dGl0bGU6ICdDaGFuZ2UgVG9waWMgTmFtZScsXHJcblx0XHRcdFx0dHlwZTogJ2JsdWUnLFxyXG5cdFx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIDxiPlwiJyArICB0b3BpYy5vcmlnaW5hbE5hbWUgKyAnXCI8L2I+IHRvIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCB0b3BpYy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19uYW1lIDogdG9waWMudG9waWNOYW1lSW5wdXQudmFsKClcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLm9yaWdpbmFsTmFtZSA9IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2FuY2VsOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRlbGV0ZVRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZScsXHJcblx0XHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArICdcIjwvYj4/JyxcclxuXHRcdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0XHRkZWxldGU6IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lbGVtZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5zbG93LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRjcmVhdGVFZGl0VG9waWNET006IGZ1bmN0aW9uKHRvcGljSWQsIG9yaWdpbmFsTmFtZSl7XHJcblx0XHRcdCQoXCIuZWRpdC10b3BpYy1saXN0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyB0b3BpY0lkICsnXCIgZGF0YS1vcmlnaW5hbC10b3BpYy1uYW1lPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxpbnB1dCBzcGVsbGNoZWNrPVwidHJ1ZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGVkaXQtdG9waWNcIiB0eXBlPVwic3VibWl0XCI+RWRpdDwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidXR0b24gZGVsZXRlLXRvcGljIGJ1dHRvbi0tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC9saT4nKTtcclxuXHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGVkaXRUb3BpYyA9IHRoaXM7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5lZGl0VG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdFx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5FZGl0VG9waWMgPSBuZXcgRWRpdFRvcGljKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNyBEb3RNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIERvdE1lbnUgPSBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMubWVudSA9IG51bGw7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RE9UX01FTlU6ICcuZG90LW1lbnUnLFxyXG5cdFx0QUNUSVZBVE9SOiAnLmRvdC1tZW51X19hY3RpdmF0b3InLFxyXG5cdFx0SVNfVklTSUJMRTogJy5pcy12aXNpYmxlJyxcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJyxcclxuXHRcdEJPVFRPTV9MRUZUOiAnZG90LW1lbnUtLWJvdHRvbS1sZWZ0JyxcclxuXHRcdEJPVFRPTV9SSUdIVDogJ2RvdC1tZW51LS1ib3R0b20tcmlnaHQnLFxyXG5cdFx0VE9QX0xFRlQ6ICdkb3QtbWVudS0tdG9wLWxlZnQnLFxyXG5cdFx0VE9QX1JJR0hUOiAnZG90LW1lbnUtLXRvcC1yaWdodCcsXHJcblx0XHRUQUJMRV9ET1RfTUVOVTogJ2RvdC1tZW51LS10YWJsZSdcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJ1dHRvblJlY3QgPSB0aGlzLmJ1dHRvblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIGxlZnQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LnJpZ2h0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSBsZWZ0Jyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKHRoaXMpKCk7XHJcblx0XHR0aGlzLm1lbnUuYWRkQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLm1lbnUucmVtb3ZlQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuaGlkZSgpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZCh0aGlzKSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuc2hvdy5iaW5kKHRoaXMpKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvdE1lbnUgPSB0aGlzO1xyXG5cdFx0dmFyIG1lbnVJZCA9ICQodGhpcy5idXR0b24pLmF0dHIoJ2lkJykgKyAnLW1lbnUnO1xyXG5cclxuXHRcdHRoaXMubWVudSA9ICQoJyMnICsgbWVudUlkKTtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSB0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uVEFCTEVfRE9UX01FTlUpO1xyXG5cclxuXHRcdHRoaXMuYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGlmKCF0YXJnZXQuaXMoZG90TWVudS5tZW51KSB8fCAhdGFyZ2V0LmlzKGRvdE1lbnUuYnV0dG9uKSkge1xyXG5cdFx0XHRcdGlmKCEkLmNvbnRhaW5zKCQoZG90TWVudS5tZW51KVswXSwgZS50YXJnZXQpKXtcclxuXHRcdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uQUNUSVZBVE9SKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkRvdE1lbnUgPSBuZXcgRG90TWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0NS4gU2Vjb25kIE1hcmtlclxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHR2YXIgTWFya2VyID0gZnVuY3Rpb24gTWFya2VyKCkge1xyXG5cdFx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdFx0dGhpcy5zdHVkZW50VGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvclRhYmxlID0gJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIik7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JEYXRhVGFibGUgPSB0aGlzLnN1cGVydmlzb3JUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdFx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdtYXJrZXItaWQnKSA9PSByb3cuZGF0YSgnc3VwZXJ2aXNvci1pZCcpKXtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdFx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksXHJcblx0XHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5yZXNldFZpZXcgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0XHQkKFwiI3N0dWRlbnQtbmFtZVwiKS50ZXh0KHN0dWRlbnROYW1lKTtcclxuXHRcdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdFx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHRcdCQoXCIjcHJvamVjdC10aXRsZVwiKS5odG1sKCc8Yj5UaXRsZTogPC9iPicgKyBwcm9qZWN0Wyd0aXRsZSddKTtcclxuXHRcdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0WydkZXNjcmlwdGlvbiddKTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHR9XHJcblxyXG5cdCQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHdpbmRvd1snTWFya2VyJ107XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9O1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdHZhciBwcm9qZWN0SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKVsnaWQnXTtcclxuXHRcdHZhciBzdHVkZW50SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtaWQnKTtcclxuXHRcdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0XHR1cmw6IG1hcmtlci5VcmxzXy5BU1NJR05fTUFSS0VSLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkLFxyXG5cdFx0XHRcdHN0dWRlbnRfaWQ6IHN0dWRlbnRJZCxcclxuXHRcdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LnJlbW92ZSgpO1xyXG5cdFx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB0aGlzO1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCh0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTsgfSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxuXHR9XHJcblxyXG5cdC8vIEluaXRpYWxpc2UgYWxsIGNvbXBvbmVudHNcclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=