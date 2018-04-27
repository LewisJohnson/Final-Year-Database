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

				$('#login-username', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).addClass("has-error");

				$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).show();
				$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).text(data.responseJSON.message);
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

	/**
 	* New/Edit user form
 */
	var supervisorForm = $('#supervisor-form');
	var studentForm = $('#student-form');

	supervisorForm.hide();
	studentForm.hide();

	$('.user-form-supervisor').each(function () {
		if ($(this).prop('checked')) {
			supervisorForm.show();
		}
	});

	$('.user-form-supervisor').on('change', function () {
		if ($(this).prop('checked')) {
			supervisorForm.show();
		} else {
			var checked = false;
			$('.user-form-supervisor').each(function () {
				if ($(this).prop('checked')) {
					checked = true;
				}
			});

			if (!checked) {
				supervisorForm.hide();
			}
		}
	});

	$('.user-form-student').each(function () {
		if ($(this).prop('checked')) {
			studentForm.show();
		}
	});

	$('.user-form-student').on('change', function () {
		if ($(this).prop('checked')) {
			studentForm.show();
		} else {
			var checked = false;
			$('.user-form-student').each(function () {
				if ($(this).prop('checked')) {
					checked = true;
				}
			});

			if (!checked) {
				studentForm.hide();
			}
		}
	});

	$('.user-form #username').on('change', function () {
		$('.user-form #email').val($(this).val() + "@sussex.ac.uk");
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

	// Site-wide feedback form
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

		if (typeof window['MobileMenu'] != "undefined") {
			window['MobileMenu'].closeMenu();
		}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmJlYTRiMzJkMmMzNzVkMzcyYzkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyIkIiwiYW5pbWF0ZWRDYXJkRW50cmFuY2VBbmltYXRpb25EZWxheSIsImFqYXhTZXR1cCIsImhlYWRlcnMiLCJhdHRyIiwibGVuZ3RoIiwiYXBwZW5kIiwiY3NzIiwiZWFjaCIsImluZGV4IiwidmFsdWUiLCJzZXRUaW1lb3V0IiwiYWRkQ2xhc3MiLCJhbmltYXRlIiwib3BhY2l0eSIsImJpbmQiLCJwcmVwZW5kIiwiZmFkZU91dCIsImZpcnN0IiwiZmFkZUluIiwiY29uZmlnIiwiYW5pbXRpb25zIiwiZmFzdCIsInNob3dOZXh0VG9waWMiLCJuZXh0IiwibGlzdCIsImhhc0NsYXNzIiwiY29uc29sZSIsImVycm9yIiwiYmVmb3JlIiwiYWRkTGFzdE5hbWVIZWFkZXJzVG9MaXN0IiwiYWRkQWxwaGFIZWFkZXJzVG9MaXN0IiwiYWRkVGl0bGVIZWFkZXJzVG9MaXN0Iiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJhamF4IiwidXJsIiwicHJvcCIsInR5cGUiLCJkYXRhIiwic2VyaWFsaXplIiwic3VjY2VzcyIsInJlc3BvbnNlIiwic2hhcmVfbmFtZSIsImNyZWF0ZVRvYXN0Iiwic3VjY2Vzc2Z1bCIsIm1lc3NhZ2UiLCJBamF4RnVuY3Rpb25zIiwicHJvdG90eXBlIiwiU2VsZWN0b3JzXyIsIkxPR19JTl9ESUFMT0ciLCJkaWFsb2ciLCJzaG93TG9hZGVyIiwiaGlkZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiaGlkZUxvYWRlciIsInNob3ciLCJ0ZXh0IiwicmVzcG9uc2VKU09OIiwic3VibWl0QnV0dG9uIiwiZmluZCIsImh0bWwiLCJjb250ZXh0IiwiSlNPTiIsInBhcnNlIiwiRWRpdFRvcGljIiwiZnVuY3Rpb25zIiwiY3JlYXRlRWRpdFRvcGljRE9NIiwiZG9uZSIsInZhbCIsInN1cGVydmlzb3JGb3JtIiwic3R1ZGVudEZvcm0iLCJjaGVja2VkIiwiYWxlcnQiLCJlbGVtVG9IaWRlU2VsZWN0b3IiLCJlbGVtVG9SZXBsYWNlIiwicmVtb3ZlQ2xhc3MiLCJhZnRlciIsImRyb3Bkb3duIiwiY29udGVudCIsIm1lZGl1bSIsImNhcmQiLCJwYXJlbnQiLCJjb25maXJtIiwidGl0bGUiLCJpY29uIiwidGhlbWUiLCJlc2NhcGVLZXkiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsImFuaW1hdGVGcm9tRWxlbWVudCIsImF1dG9DbG9zZSIsImJ1dHRvbnMiLCJidG5DbGFzcyIsImFjdGlvbiIsIm1ldGhvZCIsInJlbW92ZSIsImNhbmNlbCIsInNlbGYiLCJkYXRhVHlwZSIsInNldENvbnRlbnQiLCJmYWlsIiwiZm9ybVN1Ym1pdCIsImNvbW1lbnQiLCIkY29udGVudCIsIm9uQ29udGVudFJlYWR5Iiwid2luZG93IiwicGF0aG5hbWUiLCJqYyIsIiQkZm9ybVN1Ym1pdCIsInRyaWdnZXIiLCJzdWJtaXQiLCJzdmdDb250YWluZXIiLCJzdmciLCJwcm9qZWN0SWQiLCJhamF4VXJsIiwicHJvamVjdF9pZCIsInNlbGVjdCIsImRvbSIsInN0YXR1cyIsInBhcmVudHMiLCJlcSIsImVtYWlsU3RyaW5nIiwiY2hlY2tib3hTZWxlY3RvciIsImVtYWlsQnV0dG9uc2VsZWN0b3IiLCJpcyIsInJlc3VsdCIsImJ1dHRvbnNIdG1sIiwicHJldmlld0h0bWwiLCJpbnNlcnRBdENhcmV0Iiwid3JhcFRleHRXaXRoVGFnIiwiaW5wdXRVcmwiLCJwcm9tcHQiLCJpbnB1dEFsdCIsImlucHV0VGV4dCIsIk1vYmlsZU1lbnUiLCJlbGVtZW50IiwiYWN0aXZhdG9yIiwiSEFNQlVSR0VSX0NPTlRBSU5FUiIsInVuZGVybGF5IiwiVU5ERVJMQVkiLCJpbml0IiwibG9nIiwiQ3NzQ2xhc3Nlc18iLCJJU19WSVNJQkxFIiwiTU9CSUxFX01FTlUiLCJvcGVuTWVudSIsImNsb3NlTWVudSIsIm1vYmlsZU1lbnUiLCJpbml0QWxsIiwiRGlhbG9nIiwiZGlhbG9nTmFtZSIsImhlYWRlciIsIkRJQUxPR19IRUFERVIiLCJESUFMT0dfQ09OVEVOVCIsIkh0bWxTbmlwcGV0c18iLCJMT0FERVIiLCJsb2FkZXIiLCJpc0Nsb3NhYmxlIiwiYWN0aXZhdG9yQnV0dG9ucyIsIkFDVElWRSIsIkRJQUxPRyIsInNob3dEaWFsb2ciLCJoaWRlRGlhbG9nIiwicHVzaCIsImVyciIsImRvY3VtZW50IiwicmVhZHkiLCJrZXlkb3duIiwia2V5Q29kZSIsIkRhdGFUYWJsZSIsImJvZHlSb3dzIiwiZm9vdFJvd3MiLCJyb3dzIiwibWVyZ2UiLCJjaGVja2JveGVzIiwiQ0hFQ0tCT1giLCJtYXN0ZXJDaGVja2JveCIsIk1BU1RFUl9DSEVDS0JPWCIsIkRBVEFfVEFCTEUiLCJJU19TRUxFQ1RFRCIsInNlbGVjdEFsbFJvd3MiLCJzZWxlY3RSb3ciLCJjaGVja2JveCIsInJvdyIsImRhdGFUYWJsZSIsInByb3h5IiwiaSIsIkNvbHVtblRvZ2dsZVRhYmxlIiwiaGVhZCIsInNlbGVjdG9yTWVudSIsInNlbGVjdG9yQnV0dG9uIiwiVE9HR0xFX1RBQkxFIiwiQ09MVU1OX1NFTEVDVE9SX0JVVFRPTiIsIkNPTFVNTl9TRUxFQ1RPUl9NRU5VIiwidG9nZ2xlQ29sdW1uIiwiY29sdW1uSW5kZXgiLCJ0YWJsZSIsImNoaWxkcmVuIiwicmVtb3ZlQXR0ciIsInJlZnJlc2giLCJoaWRlSW5kaWNlcyIsInJlZnJlc2hBbGwiLCJ0b2dnbGVUYWJsZSIsImNvbHVtblNlbGVjdG9yQnV0dG9uIiwiY29sdW1uU2VsZWN0b3JNZW51IiwiY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQiLCJTRUFSQ0hfSU5QVVQiLCJTRUFSQ0hfQ09OVEFJTkVSIiwiU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIiLCJTRUFSQ0hfRklMVEVSX0JVVFRPTiIsIktleXNfIiwiU1BBQ0UiLCJFTlRFUiIsIkNPTU1BIiwicmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyIsImNvbnRhaW5lciIsImZpbHRlckJ1dHRvbiIsImJsdXIiLCJvcmlnaW5hbE5hbWUiLCJ0b3BpY0lkIiwidG9waWNOYW1lSW5wdXQiLCJlZGl0QnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwiRURJVF9UT1BJQyIsIlVybHNfIiwiREVMRVRFX1RPUElDIiwiUEFUQ0hfVE9QSUMiLCJORVdfVE9QSUMiLCJlZGl0VG9waWMiLCJ0b3BpYyIsInRvcGljX2lkIiwidG9waWNfbmFtZSIsImRlbGV0ZVRvcGljIiwiZGVsZXRlIiwic2xvdyIsIkRvdE1lbnUiLCJNZW51IiwiYnV0dG9uIiwibWVudSIsImlzVGFibGVEb3RNZW51IiwiRE9UX01FTlUiLCJBQ1RJVkFUT1IiLCJCT1RUT01fTEVGVCIsIkJPVFRPTV9SSUdIVCIsIlRPUF9MRUZUIiwiVE9QX1JJR0hUIiwiVEFCTEVfRE9UX01FTlUiLCJwb3NpdGlvbk1lbnUiLCJidXR0b25SZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwibGVmdCIsInBhcnNlSW50IiwidG9wIiwicmlnaHQiLCJ0b2dnbGUiLCJkb3RNZW51IiwibWVudUlkIiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0IiwiY29udGFpbnMiLCJNYXJrZXIiLCJzZWxlY3RlZFN0dWRlbnQiLCJzZWxlY3RlZFN1cGVydmlzb3IiLCJzdHVkZW50VGFibGUiLCJzdHVkZW50RGF0YVRhYmxlIiwic3VwZXJ2aXNvclRhYmxlIiwic3VwZXJ2aXNvckRhdGFUYWJsZSIsIkFTU0lHTl9NQVJLRVIiLCJzZWxlY3RTdHVkZW50Iiwic3R1ZGVudFJvd0RPTSIsIm1hcmtlciIsInVuc2VsZWN0QWxsIiwic2VsZWN0U3VwZXJ2aXNvciIsInN1cGVydmlzb3JSb3dET00iLCJyZXNldFZpZXciLCJzdHVkZW50TmFtZSIsInN1cGVydmlzb3JOYW1lIiwibWFya2VyTmFtZSIsInByb2plY3QiLCJzdHVkZW50SWQiLCJtYXJrZXJJ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QVVsQixTQUFWLENBQW9CcUcsT0FBcEI7QUFDQWlILFFBQU90TixTQUFQLENBQWlCcUcsT0FBakI7QUFDQXVGLFNBQVE1TCxTQUFSLENBQWtCcUcsT0FBbEI7QUFDQSxDQW55QkEsRSIsImZpbGUiOiJcXGpzXFxtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZiZWE0YjMyZDJjMzc1ZDM3MmM5IiwiLypcclxuICogQ29weXJpZ2h0IChDKSBVbml2ZXJzaXR5IG9mIFN1c3NleCAyMDE4LlxyXG4gKiBVbmF1dGhvcml6ZWQgY29weWluZyBvZiB0aGlzIGZpbGUsIHZpYSBhbnkgbWVkaXVtIGlzIHN0cmljdGx5IHByb2hpYml0ZWRcclxuICogV3JpdHRlbiBieSBMZXdpcyBKb2huc29uIDxsajIzNEBzdXNzZXguY29tPlxyXG4gKi9cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IE1BSU5cclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCBBIGJ1bmNoIG9mIHN0dWZmLlxyXG58XHJcbnwtLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCAgXHQxLiBBSkFYIFNldHVwXHJcbnxcdDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG58XHQzLiBGb3Jtc1xyXG58XHQ0LiBDbGljayBFdmVudHNcclxufCBcdDUuIENoYW5nZSBFdmVudHNcclxufFx0Ni4gSFRNTCBFZGl0b3JcclxuKi9cclxuXHJcbmltcG9ydCAnLi4vanMvY29tcG9uZW50cyc7XHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuOyQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdHZhciBhbmltYXRlZENhcmRFbnRyYW5jZUFuaW1hdGlvbkRlbGF5ID0gMDtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0MS4gQUpBWCBTZXR1cFxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQkLmFqYXhTZXR1cCh7XHJcblx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdCdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpLFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDIuIEhUTUwgTW9kaWZpY2F0aW9uc1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHRpZigkKCcuc2hvdy0tc2Nyb2xsLXRvLXRvcCcpLmxlbmd0aCA+IDApe1xyXG5cdFx0JCgnLm1haW4tY29udGVudCcpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXJhaXNlZCBidXR0b24tLWFjY2VudCBzY3JvbGwtdG8tdG9wXCI+U2Nyb2xsIHRvIFRvcDwvYnV0dG9uPicpO1xyXG5cdH1cclxuXHJcblx0JCgnLmFuaW1hdGUtY2FyZHMgLmNhcmQnKS5jc3MoXCJvcGFjaXR5XCIsIDApO1xyXG5cclxuXHQvLyBBbmltYXRlIGFsbCBjYXJkc1xyXG5cdCQoJy5hbmltYXRlLWNhcmRzIC5jYXJkJykuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdGFuaW1hdGVkQ2FyZEVudHJhbmNlQW5pbWF0aW9uRGVsYXkgKz0gMjAwO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwic2xpZGVJblVwIGFuaW1hdGVkXCIpO1xyXG5cclxuXHRcdFx0JCh0aGlzKS5hbmltYXRlKHtcclxuXHRcdFx0XHRvcGFjaXR5OiAxXHJcblx0XHRcdH0sIDgwMCk7XHJcblxyXG5cdFx0fS5iaW5kKHRoaXMpLCBhbmltYXRlZENhcmRFbnRyYW5jZUFuaW1hdGlvbkRlbGF5KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gQWNjZXNzaWJpbGl0eVxyXG5cdCQoJy5kcm9wZG93bicpLmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcclxuXHQkKCcuZHJvcGRvd24gPiBidXR0b24nKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xyXG5cdCQoJy5kcm9wZG93biAuZHJvcGRvd24tY29udGVudCBhJykuYXR0cigndGFiaW5kZXgnLCAnMCcpO1xyXG5cclxuXHQvLyBNYWtlcyBwcmltYXJ5IHRvcGljIGZpcnN0XHJcblx0JCgnLnRvcGljcy1saXN0JykucHJlcGVuZCgkKCcuZmlyc3QnKSk7XHJcblx0JCgnLnRvcGljcy1saXN0IC5sb2FkZXInKS5mYWRlT3V0KDApO1xyXG5cdCQoJy50b3BpY3MtbGlzdCBsaScpLmZpcnN0KCkuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCwgZnVuY3Rpb24gc2hvd05leHRUb3BpYygpIHtcclxuXHRcdCQodGhpcykubmV4dCggXCIudG9waWNzLWxpc3QgbGlcIiApLmZhZGVJbihjb25maWcuYW5pbXRpb25zLmZhc3QsIHNob3dOZXh0VG9waWMpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcub3JkZXItbGlzdC1qcycpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGlzdCA9ICQodGhpcyk7XHJcblx0XHQvLyBzb3J0VW5vcmRlcmVkTGlzdChsaXN0KTtcclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdsYXN0LW5hbWUtaGVhZGVyLWxpc3QtanMnKSl7XHJcblx0XHRcdGlmKCFsaXN0LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0EgdW5pcXVlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGlzdC5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXItbGlua3NcIiBpZD1cIicgKyBsaXN0LmF0dHIoJ2lkJykgKyAnLWxpbmtzXCI+PC9kaXY+Jyk7XHJcblx0XHRcdGFkZExhc3ROYW1lSGVhZGVyc1RvTGlzdChsaXN0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZihsaXN0Lmhhc0NsYXNzKCdhbHBoYS1oZWFkZXItbGlzdC1qcycpKXtcclxuXHRcdFx0aWYoIWxpc3QuYXR0cignaWQnKSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQSB1bmlxdWUgaWQgaXMgcmVxdWlyZWQuJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsaXN0LmJlZm9yZSgnPGRpdiBjbGFzcz1cImhlYWRlci1saW5rc1wiIGlkPVwiJyArIGxpc3QuYXR0cignaWQnKSArICctbGlua3NcIj48L2Rpdj4nKTtcclxuXHRcdFx0YWRkQWxwaGFIZWFkZXJzVG9MaXN0KGxpc3QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGxpc3QuaGFzQ2xhc3MoJ3RpdGxlLWhlYWRlci1saXN0LWpzJykpe1xyXG5cdFx0XHRpZighbGlzdC5hdHRyKCdpZCcpKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdBIHVuaXF1ZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxpc3QuYmVmb3JlKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWxpbmtzXCIgaWQ9XCInICsgbGlzdC5hdHRyKCdpZCcpICsgJy1saW5rc1wiPjwvZGl2PicpO1xyXG5cdFx0XHRhZGRUaXRsZUhlYWRlcnNUb0xpc3QobGlzdCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCAzLiBGT1JNU1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0Ly8gVXNlZCBvbiB0aGUgc3R1ZGVudCBpbmRleCBwYWdlXHJcblx0JChcIiNzaGFyZS1uYW1lLWZvcm1cIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogJCh0aGlzKS5wcm9wKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZTonUEFUQ0gnLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRpZihyZXNwb25zZS5zaGFyZV9uYW1lKXtcclxuXHRcdFx0XHRcdGNyZWF0ZVRvYXN0KCdzdWNjZXNzJywgJ1lvdXIgbmFtZSBpcyBiZWluZyBzaGFyZWQgd2l0aCBvdGhlciBzdHVkZW50cy4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y3JlYXRlVG9hc3QoJycsICdZb3UgYXJlIG5vIGxvbmdlciBzaGFyaW5nIHlvdXIgbmFtZSB3aXRoIG90aGVyIHN0dWRlbnRzLicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKCcjc2hhcmVfbmFtZScpLnByb3AoJ2NoZWNrZWQnLCByZXNwb25zZS5zaGFyZV9uYW1lKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyoqXHJcblx0XHQqIFRvZ2dsZSByZXZlcmVuY2luZyBlbWFpbHMuXHJcblx0XHQqXHJcblx0XHQqIFZpc2libGUgb24gc3VwZXJ2aXNvciBob21lcGFnZVxyXG5cdCovXHJcblx0JChcIi5yZWNlaXZlLWVtYWlscy1mb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BBVENIJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0aWYocmVzcG9uc2Uuc3VjY2Vzc2Z1bCl7XHJcblx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnc3VjY2VzcycsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjcmVhdGVUb2FzdCgnZXJyb3InLCByZXNwb25zZS5tZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0XHQqIFN1Ym1pdCBsb2dpbiBkZXRhaWxzXHJcblx0Ki9cclxuXHQkKFwiI2xvZ2luRm9ybVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0JCgnLmhlbHAtYmxvY2snLCAnI2xvZ2luRm9ybScpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpWzBdLmRpYWxvZy5zaG93TG9hZGVyKCk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiAkKHRoaXMpLnByb3AoJ2FjdGlvbicpLFxyXG5cdFx0XHR0eXBlOidQT1NUJyxcclxuXHRcdFx0ZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoJy5oZWxwLWJsb2NrJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5oaWRlKCk7XHJcblx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKHRydWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRylbMF0uZGlhbG9nLmhpZGVMb2FkZXIoKTtcclxuXHJcblx0XHRcdFx0JCgnI2xvZ2luLXVzZXJuYW1lJywgQWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuU2VsZWN0b3JzXy5MT0dfSU5fRElBTE9HKS5hZGRDbGFzcyhcImhhcy1lcnJvclwiKTtcclxuXHJcblx0XHRcdFx0JCgnLmhlbHAtYmxvY2snLCBBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLkxPR19JTl9ESUFMT0cpLnNob3coKTtcclxuXHRcdFx0XHQkKCcuaGVscC1ibG9jaycsIEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uTE9HX0lOX0RJQUxPRykudGV4dChkYXRhLnJlc3BvbnNlSlNPTi5tZXNzYWdlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuXHQvKipcclxuXHRcdCogQ3JlYXRlIGEgbmV3IHRvcGljIGZvcm0gc3VibWl0XHJcblx0Ki9cclxuXHQkKCcjbmV3LXRvcGljLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciBzdWJtaXRCdXR0b24gPSAkKHRoaXMpLmZpbmQoJzpzdWJtaXQnKTtcclxuXHRcdHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+Jyk7XHJcblx0XHQkKCcubG9hZGVyJywgc3VibWl0QnV0dG9uKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICQodGhpcykucHJvcCgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGU6J1BPU1QnLFxyXG5cdFx0XHRjb250ZXh0OiAkKHRoaXMpLFxyXG5cdFx0XHRkYXRhOiAkKHRoaXMpLnNlcmlhbGl6ZSgpLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdEVkaXRUb3BpYy5wcm90b3R5cGUuZnVuY3Rpb25zLmNyZWF0ZUVkaXRUb3BpY0RPTShkYXRhW1wiaWRcIl0sIGRhdGFbXCJuYW1lXCJdKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24oKXtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0XHRcdCQodGhpcykuZmluZCgnOnN1Ym1pdCcpLmh0bWwoJ0FkZCcpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdFx0KiBOZXcvRWRpdCB1c2VyIGZvcm1cclxuXHQqL1xyXG5cdHZhciBzdXBlcnZpc29yRm9ybSA9ICQoJyNzdXBlcnZpc29yLWZvcm0nKTtcclxuXHR2YXIgc3R1ZGVudEZvcm0gPSAkKCcjc3R1ZGVudC1mb3JtJyk7XHJcblxyXG5cdHN1cGVydmlzb3JGb3JtLmhpZGUoKTtcclxuXHRzdHVkZW50Rm9ybS5oaWRlKCk7XHJcblxyXG5cdCQoJy51c2VyLWZvcm0tc3VwZXJ2aXNvcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSl7XHJcblx0XHRcdHN1cGVydmlzb3JGb3JtLnNob3coKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JCgnLnVzZXItZm9ybS1zdXBlcnZpc29yJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRpZigkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSl7XHJcblx0XHRcdHN1cGVydmlzb3JGb3JtLnNob3coKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBjaGVja2VkID0gZmFsc2U7XHJcblx0XHRcdCQoJy51c2VyLWZvcm0tc3VwZXJ2aXNvcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpe1xyXG5cdFx0XHRcdFx0Y2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmKCFjaGVja2VkKXtcclxuXHRcdFx0XHRzdXBlcnZpc29yRm9ybS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JCgnLnVzZXItZm9ybS1zdHVkZW50JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKXtcclxuXHRcdFx0c3R1ZGVudEZvcm0uc2hvdygpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKCcudXNlci1mb3JtLXN0dWRlbnQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKXtcclxuXHRcdFx0c3R1ZGVudEZvcm0uc2hvdygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGNoZWNrZWQgPSBmYWxzZTtcclxuXHRcdFx0JCgnLnVzZXItZm9ybS1zdHVkZW50JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZigkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSl7XHJcblx0XHRcdFx0XHRjaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYoIWNoZWNrZWQpe1xyXG5cdFx0XHRcdHN0dWRlbnRGb3JtLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKCcudXNlci1mb3JtICN1c2VybmFtZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLnVzZXItZm9ybSAjZW1haWwnKS52YWwoJCh0aGlzKS52YWwoKSArIFwiQHN1c3NleC5hYy51a1wiKTtcclxuXHR9KTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0IDQuIENMSUNLIEVWRU5UU1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiLmVtYWlsLXNlbGVjdGVkXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGlmKCQodGhpcykucHJvcCgnaHJlZicpID09PSAnbWFpbHRvOicgfHwgJCh0aGlzKS5wcm9wKCdocmVmJykgPT09IG51bGwpe1xyXG5cdFx0XHRhbGVydChcIllvdSBoYXZlbid0IHNlbGVjdGVkIGFueW9uZS5cIik7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gRXh0ZXJuYWwgbGlua3MgZ2l2ZSBhbiBpbGx1c2lvbiBvZiBBSkFYXHJcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIi5leHRlcm5hbC1saW5rXCIsICBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgZWxlbVRvSGlkZVNlbGVjdG9yID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8taGlkZS1zZWxlY3RvcicpKTtcclxuXHRcdHZhciBlbGVtVG9SZXBsYWNlID0gJCgkKHRoaXMpLmRhdGEoJ2VsZW1lbnQtdG8tcmVwbGFjZS13aXRoLWxvYWRlci1zZWxlY3RvcicpKTtcclxuXHJcblx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRlbGVtVG9IaWRlU2VsZWN0b3IuaGlkZSgpO1xyXG5cdFx0ZWxlbVRvUmVwbGFjZS5oaWRlKCk7XHJcblx0XHRlbGVtVG9SZXBsYWNlLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudC1yZXBsYWNlZC1jb250YWluZXJcIiBjbGFzcz1cImxvYWRlciBsb2FkZXItLXgtbGFyZ2VcIj48L2Rpdj4nKTtcclxuXHJcblx0XHQkKCcjY29udGVudC1yZXBsYWNlZC1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHR9KTtcclxuXHJcblx0JCgnbmF2Lm1vYmlsZSAuc3ViLWRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBkcm9wZG93biA9ICQodGhpcyk7XHJcblx0XHR2YXIgY29udGVudCA9IGRyb3Bkb3duLmZpbmQoJy5kcm9wZG93bi1jb250ZW50Jyk7XHJcblxyXG5cdFx0aWYoZHJvcGRvd24uYXR0cihcImFyaWEtZXhwYW5kZWRcIikgPT0gXCJ0cnVlXCIpe1xyXG5cdFx0XHRkcm9wZG93bi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBmYWxzZSk7XHJcblx0XHRcdGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24uZmluZChcIi5zdmctY29udGFpbmVyIHN2Z1wiKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGVaKDBkZWcpXCIpO1xyXG5cdFx0XHRkcm9wZG93bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Y29udGVudC5oaWRlKGNvbmZpZy5hbmltdGlvbnMubWVkaXVtKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRyb3Bkb3duLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIHRydWUpO1xyXG5cdFx0XHRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBmYWxzZSk7XHJcblxyXG5cdFx0XHRkcm9wZG93bi5maW5kKFwiLnN2Zy1jb250YWluZXIgc3ZnXCIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInJvdGF0ZVooMTgwZGVnKVwiKTtcclxuXHRcdFx0ZHJvcGRvd24uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdGNvbnRlbnQuc2hvdyhjb25maWcuYW5pbXRpb25zLm1lZGl1bSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCQoJy5zdHVkZW50LXVuZG8tc2VsZWN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIGNhcmQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cdFx0JC5jb25maXJtKHtcclxuXHRcdFx0dGl0bGU6ICdVbmRvIFByb2plY3QgU2VsZWN0aW9uJyxcclxuXHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTIuNSw4QzkuODUsOCA3LjQ1LDkgNS42LDEwLjZMMiw3VjE2SDExTDcuMzgsMTIuMzhDOC43NywxMS4yMiAxMC41NCwxMC41IDEyLjUsMTAuNUMxNi4wNCwxMC41IDE5LjA1LDEyLjgxIDIwLjEsMTZMMjIuNDcsMTUuMjJDMjEuMDgsMTEuMDMgMTcuMTUsOCAxMi41LDhaXCIgLz48L3N2Zz48L2Rpdj4nLFxyXG5cdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0YmFja2dyb3VuZERpc21pc3M6IHRydWUsXHJcblx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRhdXRvQ2xvc2U6ICdjYW5jZWx8MTAwMDAnLFxyXG5cdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHVuLXNlbGVjdCB5b3VyIHNlbGVjdGVkIHByb2plY3Q/PC9iPicsXHJcblx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRjb25maXJtOiB7XHJcblx0XHRcdFx0XHRidG5DbGFzczogJ2J0bi1yZWQnLFxyXG5cdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHR1cmw6ICcvc3R1ZGVudHMvdW5kby1zZWxlY3RlZC1wcm9qZWN0JyxcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHRcdFx0XHRcdFx0XHRcdGlmKHJlc3BvbnNlLnN1Y2Nlc3NmdWwpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXJkLmhpZGUoNDAwLCBmdW5jdGlvbigpIHsgY2FyZC5yZW1vdmUoKTsgfSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZVRvYXN0KCdzdWNjZXNzJywgJ1VuZG8gc3VjY2Vzc2Z1bC4nKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZVRvYXN0KCdlcnJvcicsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IHt9LFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU2l0ZS13aWRlIGZlZWRiYWNrIGZvcm1cclxuXHQkKCcjbGVhdmUtZmVlZGJhY2stYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblx0XHQkLmNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogJ0ZlZWRiYWNrJyxcclxuXHRcdFx0Y29udGVudDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRyZXR1cm4gJC5hamF4KHtcclxuXHRcdFx0XHRcdHVybDogJy9mZWVkYmFjaycsXHJcblx0XHRcdFx0XHRkYXRhVHlwZTogJ2h0bWwnLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0c2VsZi5zZXRDb250ZW50KHJlc3BvbnNlKTtcclxuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRzZWxmLnNldENvbnRlbnQoJ1NvbWV0aGluZyB3ZW50IHdyb25nLicpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0eXBlOiAnYmx1ZScsXHJcblx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoICBkPVwiTTE3LDlIN1Y3SDE3TTE3LDEzSDdWMTFIMTdNMTQsMTdIN1YxNUgxNE0xMiwzQTEsMSAwIDAsMSAxMyw0QTEsMSAwIDAsMSAxMiw1QTEsMSAwIDAsMSAxMSw0QTEsMSAwIDAsMSAxMiwzTTE5LDNIMTQuODJDMTQuNCwxLjg0IDEzLjMsMSAxMiwxQzEwLjcsMSA5LjYsMS44NCA5LjE4LDNINUEyLDIgMCAwLDAgMyw1VjE5QTIsMiAwIDAsMCA1LDIxSDE5QTIsMiAwIDAsMCAyMSwxOVY1QTIsMiAwIDAsMCAxOSwzWlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0dGhlbWU6ICdtYXRlcmlhbCcsXHJcblx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0YmFja2dyb3VuZERpc21pc3M6IGZhbHNlLFxyXG5cdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0YnV0dG9uczoge1xyXG5cdFx0XHRcdGZvcm1TdWJtaXQ6IHtcclxuXHRcdFx0XHRcdHRleHQ6ICdTdWJtaXQnLFxyXG5cdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRhY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGNvbW1lbnQgPSB0aGlzLiRjb250ZW50LmZpbmQoJy5jb21tZW50JykudmFsKCk7XHJcblx0XHRcdFx0XHRcdGlmKCFjb21tZW50KXtcclxuXHRcdFx0XHRcdFx0XHQkLmFsZXJ0KCdQbGVhc2UgcHJvdmlkZSBzb21lIGZlZWRiYWNrJyk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHRcdHVybDogJy9mZWVkYmFjaycsXHJcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdFx0XHRcdFx0ZGF0YTogdGhpcy4kY29udGVudC5maW5kKCdmb3JtJykuc2VyaWFsaXplKCksXHJcblx0XHRcdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihyZXNwb25zZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZihyZXNwb25zZS5zdWNjZXNzZnVsKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRlVG9hc3QoJ3N1Y2Nlc3MnLCByZXNwb25zZS5tZXNzYWdlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0ZVRvYXN0KCdlcnJvcicsIHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdC8vY2xvc2VcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbkNvbnRlbnRSZWFkeTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdCQoJyNmZWVkYmFjay1wYWdlJykudmFsKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XHJcblxyXG5cdFx0XHRcdC8vIGJpbmQgdG8gZXZlbnRzXHJcblx0XHRcdFx0dmFyIGpjID0gdGhpcztcclxuXHRcdFx0XHR0aGlzLiRjb250ZW50LmZpbmQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGpjLiQkZm9ybVN1Ym1pdC50cmlnZ2VyKCdjbGljaycpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU3VibWl0IHJlY2VpdmUgZW1haWwgZm9ybSB3aGVuIGNoZWNrYm94IHRvZ2dsZWRcclxuXHQkKCcucmVjZWl2ZS1lbWFpbHMtY2hlY2tib3gnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuXHRcdCQodGhpcykuc3VibWl0KCk7XHJcblx0fSk7XHJcblx0XHJcblx0Ly8gQWRkcyBvciByZW1vdmVzIGEgcHJvamVjdCBmcm9tIGEgc3R1ZGVudCBmYXZvdXJpdGVzXHJcblx0JChcIi5mYXZvdXJpdGUtY29udGFpbmVyXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHN2Z0NvbnRhaW5lciA9ICQodGhpcyk7XHJcblx0XHR2YXIgc3ZnID0gc3ZnQ29udGFpbmVyLmZpbmQoJ3N2ZycpO1xyXG5cclxuXHRcdGlmKHdpbmRvd1sncHJvamVjdCddICE9IG51bGwpe1xyXG5cdFx0XHR2YXIgcHJvamVjdElkID0gd2luZG93Wydwcm9qZWN0J10uZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHByb2plY3RJZCA9ICQodGhpcykuZGF0YSgncHJvamVjdC1pZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN2Zy5oaWRlKDApO1xyXG5cdFx0JCgnLmxvYWRlcicsIHN2Z0NvbnRhaW5lcikuc2hvdygwKTtcclxuXHJcblx0XHRpZihzdmcuaGFzQ2xhc3MoJ2Zhdm91cml0ZScpKXtcclxuXHRcdFx0dmFyIGFjdGlvbiA9ICdyZW1vdmUnO1xyXG5cdFx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvcmVtb3ZlLWZhdm91cml0ZSc7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGFjdGlvbiA9ICdhZGQnO1xyXG5cdFx0XHR2YXIgYWpheFVybCA9ICcvc3R1ZGVudHMvYWRkLWZhdm91cml0ZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiBhamF4VXJsLFxyXG5cdFx0XHR0eXBlOidQQVRDSCcsXHJcblx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRwcm9qZWN0X2lkOiBwcm9qZWN0SWRcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKGFjdGlvbiA9PSBcImFkZFwiKXtcclxuXHRcdFx0XHRcdHN2Zy5hZGRDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHN2Zy5yZW1vdmVDbGFzcygnZmF2b3VyaXRlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRzdmcuZmFkZUluKGNvbmZpZy5hbmltdGlvbnMuZmFzdCk7XHJcblx0XHRcdCQoJy5sb2FkZXInLCBzdmdDb250YWluZXIpLmhpZGUoMCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHRcclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQgNS4gQ0hBTkdFIEVWRU5UU1xyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5lbWFpbC10YWJsZSAuY2hlY2tib3ggaW5wdXRcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc2VsZWN0ID0gZnVuY3Rpb24oZG9tKXtcclxuXHRcdFx0dmFyIHN0YXR1cyA9IGRvbS5wYXJlbnRzKCkuZXEoNCkuZGF0YSgnc3RhdHVzJyk7XHJcblx0XHRcdHZhciBlbWFpbFN0cmluZyA9IFwibWFpbHRvOlwiO1xyXG5cdFx0XHR2YXIgY2hlY2tib3hTZWxlY3RvciA9ICcuZW1haWwtdGFibGUuJyArIHN0YXR1cyArICcgLmNoZWNrYm94IGlucHV0JztcclxuXHRcdFx0dmFyIGVtYWlsQnV0dG9uc2VsZWN0b3IgPSBcIi5lbWFpbC1zZWxlY3RlZC5cIiArIHN0YXR1cztcclxuXHJcblx0XHRcdCQoY2hlY2tib3hTZWxlY3RvcikuZWFjaChmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdFx0XHRpZigkKHZhbHVlKS5pcyhcIjpjaGVja2VkXCIpICYmICEkKHZhbHVlKS5oYXNDbGFzcyhcIm1hc3Rlci1jaGVja2JveFwiKSkge1xyXG5cdFx0XHRcdFx0ZW1haWxTdHJpbmcgKz0gJCh2YWx1ZSkuZGF0YSgnZW1haWwnKTtcclxuXHRcdFx0XHRcdGVtYWlsU3RyaW5nICs9IFwiLFwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdCQoZW1haWxCdXR0b25zZWxlY3RvcikucHJvcCgnaHJlZicsIGVtYWlsU3RyaW5nKTtcclxuXHRcdH07XHJcblx0XHRzZXRUaW1lb3V0KHNlbGVjdCgkKHRoaXMpKSwgMjAwMCk7XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCA2LiBIVE1MIEVESVRPUlxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHQkKCcuaHRtbC1lZGl0b3InKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSl7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICcvc25pcHBldD9zbmlwcGV0PWh0bWwtZWRpdG9yLXRvb2xiYXInLFxyXG5cdFx0XHR0eXBlOidHRVQnLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlc3VsdCl7XHJcblx0XHRcdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmFmdGVyKHJlc3VsdCk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHR2YXIgYnV0dG9uc0h0bWwgPSBcIjxkaXYgY2xhc3M9J2h0bWwtZWRpdG9yLS10b3AtYnV0dG9ucyBmbGV4Jz48YnV0dG9uIGNsYXNzPSdodG1sJyB0eXBlPSdidXR0b24nPkhUTUw8L2J1dHRvbj48YnV0dG9uIGNsYXNzPSdwcmV2aWV3JyB0eXBlPSdidXR0b24nPlBSRVZJRVc8L2J1dHRvbj48L2Rpdj5cIjtcclxuXHRcdHZhciBwcmV2aWV3SHRtbCA9IFwiPGRpdiBjbGFzcz0naHRtbC1lZGl0b3ItLXByZXZpZXctY29udGFpbmVyJz48ZGl2IGNsYXNzPSdodG1sLWVkaXRvci0tcHJldmlldyc+PC9kaXY+PC9kaXY+XCI7XHJcblxyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLmJlZm9yZShidXR0b25zSHRtbCk7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3InKS5hZnRlcihwcmV2aWV3SHRtbCk7XHJcblxyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcicpLmhpZGUoKTtcclxuXHRcdCQoJy5odG1sLWVkaXRvci0tcHJldmlldycpLmh0bWwoJCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLnZhbCgpKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yLS1pbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3JykuaHRtbCgkKHRoaXMpLnZhbCgpKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yLS10b3AtYnV0dG9ucyAuaHRtbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0Jykuc2hvdygpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS10b29sYmFyJykuc2hvdygpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcicpLmhpZGUoKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLmh0bWwtZWRpdG9yLS10b3AtYnV0dG9ucyAucHJldmlldycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcuaHRtbC1lZGl0b3ItLWlucHV0JykuaGlkZSgpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS10b29sYmFyJykuaGlkZSgpO1xyXG5cdFx0JCgnLmh0bWwtZWRpdG9yLS1wcmV2aWV3LWNvbnRhaW5lcicpLnNob3coKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gVG9nZ2xlIGxhYmVsIGZsaXBzIHRvZ2dsZVxyXG5cdCQoXCIuaHRtbC1lZGl0b3JcIikub24oXCJjbGlja1wiLCBcIi5odG1sLWVkaXRvci0tdG9vbGJhciBsaSBidXR0b25cIiwgIGZ1bmN0aW9uKGUpIHtcclxuXHRcdHN3aXRjaCgkKHRoaXMpLmRhdGEoJ3R5cGUnKSl7XHJcblx0XHRcdGNhc2UgXCJsaW5lYnJlYWtcIjpcclxuXHRcdFx0XHRpbnNlcnRBdENhcmV0KCdodG1sLWVkaXRvci0taW5wdXQnLCAnPGJyPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIm9sXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJ1xcbjxvbD5cXG5cXHQ8bGk+SXRlbSAxPC9saT5cXG5cXHQ8bGk+SXRlbSAyPC9saT5cXG5cXHQ8bGk+SXRlbSAzPC9saT5cXG48L29sPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInVsXCI6XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJ1xcbjx1bD5cXG5cXHQ8bGk+SXRlbSB4PC9saT5cXG5cXHQ8bGk+SXRlbSB5PC9saT5cXG5cXHQ8bGk+SXRlbSB6PC9saT5cXG48L3VsPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImJvbGRcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdiJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwidHRcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICd0dCcpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIml0YWxpY1wiOlxyXG5cdFx0XHRcdHdyYXBUZXh0V2l0aFRhZygnaHRtbC1lZGl0b3ItLWlucHV0JywgJ2knKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJ1bmRlcmxpbmVcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICd1Jyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiaW1nXCI6XHJcblx0XHRcdFx0dmFyIGlucHV0VXJsID0gcHJvbXB0KFwiRW50ZXIgdGhlIGltYWdlIFVSTFwiLCBcImh0dHBzOi8vd3d3LlwiKTtcclxuXHRcdFx0XHR2YXIgaW5wdXRBbHQgPSBwcm9tcHQoXCJFbnRlciBhbHQgdGV4dFwiLCBcIkltYWdlIG9mIFN1c3NleCBjYW1wdXNcIik7XHJcblx0XHRcdFx0aW5zZXJ0QXRDYXJldCgnaHRtbC1lZGl0b3ItLWlucHV0JywgJzxpbWcgYWx0PVwiJyArIGlucHV0QWx0ICsgJ1wiIHNyYz1cIicgKyBpbnB1dFVybCArICdcIj4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJsaW5rXCI6XHJcblx0XHRcdFx0dmFyIGlucHV0VXJsID0gcHJvbXB0KFwiRW50ZXIgdGhlIFVSTFwiLCBcImh0dHBzOi8vd3d3LlwiKTtcclxuXHRcdFx0XHR2YXIgaW5wdXRUZXh0ID0gcHJvbXB0KFwiRW50ZXIgZGlzcGxheSB0ZXh0XCIsIFwiU3Vzc2V4XCIpO1xyXG5cdFx0XHRcdGluc2VydEF0Q2FyZXQoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICc8YSBocmVmPVwiJyArIGlucHV0VXJsICsgJ1wiPicgKyBpbnB1dFRleHQgKyAnPC9hPicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImNvZGVcIjpcclxuXHRcdFx0XHR3cmFwVGV4dFdpdGhUYWcoJ2h0bWwtZWRpdG9yLS1pbnB1dCcsICdjb2RlJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwicHJlXCI6XHJcblx0XHRcdFx0d3JhcFRleHRXaXRoVGFnKCdodG1sLWVkaXRvci0taW5wdXQnLCAncHJlJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiaW5mb1wiOlxyXG5cdFx0XHRcdCQuZGlhbG9nKHtcclxuXHRcdFx0XHRcdHRoZW1lOiAnbWF0ZXJpYWwnLFxyXG5cdFx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdFx0YW5pbWF0ZUZyb21FbGVtZW50IDogZmFsc2UsXHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRcdHRpdGxlOiAnSFRNTCBFZGl0b3IgSW5mbycsXHJcblx0XHRcdFx0XHRjb250ZW50OiAnQWxsIGxpbmtzIHlvdSBhZGQgd2lsbCBvcGVuIGluIGEgbmV3IHRhYi4gQWxsIEhUTUwgNSBlbGVtZW50cyBhcmUgdmFsaWQgZm9yIHRoZSBkZXNjcmlwdGlvbiBmaWVsZCwgZXhjbHVkaW5nOyA8YnI+PGJyPiA8dWw+PGxpPlNjcmlwdCB0YWdzPC9saT48bGk+SGVhZGluZyB0YWdzPC9saT48bGk+SFRNTCByb290IHRhZ3M8L2xpPjxsaT5Cb2R5IHRhZ3M8L2xpPjwvdWw+JyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvbWFpbi5qcyIsIi8qXHJcbiAqIENvcHlyaWdodCAoQykgVW5pdmVyc2l0eSBvZiBTdXNzZXggMjAxOC5cclxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXHJcbiAqIFdyaXR0ZW4gYnkgTGV3aXMgSm9obnNvbiA8bGoyMzRAc3Vzc2V4LmNvbT5cclxuICovXHJcblxyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgQ09NUE9ORU5UU1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58IERlZmluaXRpb25zIGFuZCBuYXRpb25hbGlzYXRpb25zIG9mIGN1c3RvbSBjb21wb25lbnRzLlxyXG58XHJcbnwtLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGSUxFIFNUUlVDVFVSRVxyXG58LS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufFx0MS4gTW9iaWxlIE1lbnVcclxufFx0Mi4gRGlhbG9nIC8gTW9kYWxcclxufFx0My4gRGF0YSBUYWJsZVxyXG58XHQ0LiBDb2x1bW4gVG9nZ2xlIFRhYmxlXHJcbnxcdDUuIEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxufFx0Ni4gRWRpdCBUb3BpY3MgW0FkbWluXVxyXG58XHQ3LiBNZW51XHJcbnxcclxuKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG47JChmdW5jdGlvbigpIHtcclxuXHQvKiA9PT09PT09PT09PT09PT09PT1cclxuXHRcdCAxLiBNb2JpbGUgTWVudVxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHRcdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIG1vYmlsZSBtZW51LlxyXG5cdFx0KlxyXG5cdFx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBNb2JpbGVNZW51ID0gIGZ1bmN0aW9uIE1vYmlsZU1lbnUoZWxlbWVudCkge1xyXG5cdFx0aWYod2luZG93WydNb2JpbGVNZW51J10gPT0gbnVsbCl7XHJcblx0XHRcdHdpbmRvd1snTW9iaWxlTWVudSddID0gdGhpcztcclxuXHRcdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdFx0dGhpcy5hY3RpdmF0b3IgPSAkKHRoaXMuU2VsZWN0b3JzXy5IQU1CVVJHRVJfQ09OVEFJTkVSKTtcclxuXHRcdFx0dGhpcy51bmRlcmxheSA9ICQodGhpcy5TZWxlY3RvcnNfLlVOREVSTEFZKTtcclxuXHRcdFx0dGhpcy5pbml0KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlRoZXJlIGNhbiBvbmx5IGJlIG9uZSBtb2JpbGUgbWVudS5cIik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHRJU19WSVNJQkxFOiAnaXMtdmlzaWJsZSdcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0TU9CSUxFX01FTlU6ICduYXYubW9iaWxlJyxcclxuXHRcdEhBTUJVUkdFUl9DT05UQUlORVI6ICcuaGFtYnVyZ2VyLWNvbnRhaW5lcicsXHJcblx0XHRVTkRFUkxBWTogJy5tb2JpbGUtbmF2LXVuZGVybGF5J1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLm9wZW5NZW51ID0gZnVuY3Rpb24gKCl7XHJcblx0XHR0aGlzLmFjdGl2YXRvci5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHJcblx0XHR0aGlzLnVuZGVybGF5LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cdH07XHJcblxyXG5cdE1vYmlsZU1lbnUucHJvdG90eXBlLmNsb3NlTWVudSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0dGhpcy5hY3RpdmF0b3IuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xyXG5cclxuXHRcdHRoaXMudW5kZXJsYXkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdHRoaXMudW5kZXJsYXkucmVtb3ZlQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKTtcclxuXHR9O1xyXG5cclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG1vYmlsZU1lbnUgPSB0aGlzO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3Iub24oJ2NsaWNrJywgbW9iaWxlTWVudS5vcGVuTWVudS5iaW5kKG1vYmlsZU1lbnUpKTtcclxuXHRcdHRoaXMudW5kZXJsYXkub24oJ2NsaWNrJywgbW9iaWxlTWVudS5jbG9zZU1lbnUuYmluZChtb2JpbGVNZW51KSk7XHJcblx0fTtcclxuXHJcblx0TW9iaWxlTWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdCQodGhpcy5TZWxlY3RvcnNfLk1PQklMRV9NRU5VKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLm1vYmlsZU1lbnUgPSBuZXcgTW9iaWxlTWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09XHJcblx0XHQyLiBEaWFsb2cgLyBNb2RhbFxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09ICovXHJcblx0dmFyIERpYWxvZyA9IGZ1bmN0aW9uIERpYWxvZyhlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5kaWFsb2dOYW1lID0gJChlbGVtZW50KS5kYXRhKCdkaWFsb2cnKTtcclxuXHRcdHRoaXMudW5kZXJsYXkgPSAkKCcudW5kZXJsYXknKTtcclxuXHRcdHRoaXMuaGVhZGVyID0gJChlbGVtZW50KS5maW5kKHRoaXMuU2VsZWN0b3JzXy5ESUFMT0dfSEVBREVSKTtcclxuXHRcdHRoaXMuY29udGVudCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uRElBTE9HX0NPTlRFTlQpO1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIENvbXBvbmVudFxyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKFwicmVnaXN0ZXJlZFwiKTtcclxuXHJcblx0XHQvLyBBUklBXHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcInJvbGVcIiwgXCJkaWFsb2dcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuYXR0cihcImFyaWEtbGFiZWxsZWRieVwiLCBcImRpYWxvZy10aXRsZVwiKTtcclxuXHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBcImRpYWxvZy1kZXNjXCIpO1xyXG5cdFx0dGhpcy5oZWFkZXIuYXR0cigndGl0bGUnLCB0aGlzLmhlYWRlci5maW5kKCcjZGlhbG9nLWRlc2MnKS5odG1sKCkpO1xyXG5cclxuXHRcdHRoaXMuY29udGVudC5iZWZvcmUodGhpcy5IdG1sU25pcHBldHNfLkxPQURFUik7XHJcblx0XHR0aGlzLmxvYWRlciA9ICQoZWxlbWVudCkuZmluZChcIi5sb2FkZXJcIik7XHJcblx0XHR0aGlzLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5hY3RpdmF0b3JCdXR0b25zID0gW107XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkh0bWxTbmlwcGV0c18gPSB7XHJcblx0XHRMT0FERVI6ICc8ZGl2IGNsYXNzPVwibG9hZGVyXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7dG9wOiAyNSU7XCI+PC9kaXY+JyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLkNzc0NsYXNzZXNfID0ge1xyXG5cdFx0QUNUSVZFOiAnYWN0aXZlJyxcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRESUFMT0c6ICcuZGlhbG9nJyxcclxuXHRcdERJQUxPR19IRUFERVI6ICcuaGVhZGVyJyxcclxuXHRcdERJQUxPR19DT05URU5UOiAnLmNvbnRlbnQnLFxyXG5cdH07XHJcblxyXG5cdERpYWxvZy5wcm90b3R5cGUuc2hvd0xvYWRlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmxvYWRlci5zaG93KDApO1xyXG5cdFx0dGhpcy5jb250ZW50LmhpZGUoMCk7XHJcblx0fTtcclxuXHJcblx0RGlhbG9nLnByb3RvdHlwZS5oaWRlTG9hZGVyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMubG9hZGVyLmhpZGUoMCk7XHJcblx0XHR0aGlzLmNvbnRlbnQuc2hvdygwKTtcclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLnNob3dEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5lbGVtZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xyXG5cdFx0dGhpcy51bmRlcmxheS5hZGRDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLkFDVElWRSk7XHJcblx0XHR0aGlzLnVuZGVybGF5LmRhdGEoXCJvd25lclwiLCB0aGlzLmRpYWxvZ05hbWUpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdHdpbmRvd1snRGlhbG9nJ10gPSB0aGlzO1xyXG5cclxuXHRcdGlmICh0eXBlb2Yod2luZG93WydNb2JpbGVNZW51J10pICE9IFwidW5kZWZpbmVkXCIpe1xyXG5cdFx0XHR3aW5kb3dbJ01vYmlsZU1lbnUnXS5jbG9zZU1lbnUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmhpZGVEaWFsb2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYodGhpcy5pc0Nsb3NhYmxlICYmIHRoaXMudW5kZXJsYXkuZGF0YShcIm93bmVyXCIpID09IHRoaXMuZGlhbG9nTmFtZSl7XHJcblx0XHRcdHRoaXMuZWxlbWVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG5cdFx0XHR0aGlzLnVuZGVybGF5LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQUNUSVZFKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0Ly8gTmVlZGVkIGZvciBjb250ZXh0XHJcblx0XHR2YXIgZGlhbG9nID0gdGhpcztcclxuXHJcblx0XHQvLyBGaW5kIGFjdGl2YXRvciBidXR0b25cclxuXHRcdCQoJ2J1dHRvbicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQodGhpcykuZGF0YSgnYWN0aXZhdG9yJykgJiYgJCh0aGlzKS5kYXRhKCdkaWFsb2cnKSA9PSBkaWFsb2cuZGlhbG9nTmFtZSl7XHJcblx0XHRcdFx0ZGlhbG9nLmFjdGl2YXRvckJ1dHRvbnMucHVzaCgkKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQVJJQVxyXG5cdFx0ZGlhbG9nLmVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuXHRcdGRpYWxvZy51bmRlcmxheS5vbignY2xpY2snLCBkaWFsb2cuaGlkZURpYWxvZy5iaW5kKGRpYWxvZykpO1xyXG5cclxuXHRcdHRyeXtcclxuXHRcdFx0JChkaWFsb2cuYWN0aXZhdG9yQnV0dG9ucykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGRpYWxvZy5zaG93RGlhbG9nLmJpbmQoZGlhbG9nKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBjYXRjaChlcnIpe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRGlhbG9nIFwiICsgZGlhbG9nLmRpYWxvZ05hbWUgKyBcIiBoYXMgbm8gYWN0aXZhdG9yIGJ1dHRvbi5cIik7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREaWFsb2cucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRElBTE9HKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRpYWxvZyA9IG5ldyBEaWFsb2codGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcykua2V5ZG93bihmdW5jdGlvbihlKSB7XHJcblx0XHRcdC8vIElzIEVTQyBrZXkgaXMgcHJlc3NlZCwgaGlkZSBkaWFsb2dzIGFuZCBtb2JpbGUgbWVudVxyXG5cdFx0XHRpZihlLmtleUNvZGUgPT0gMjcgJiYgd2luZG93WydEaWFsb2cnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydEaWFsb2cnXS5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGUua2V5Q29kZSA9PSAyNyAmJiB3aW5kb3dbJ01vYmlsZU1lbnUnXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0d2luZG93WydNb2JpbGVNZW51J10uY2xvc2VNZW51KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0LyogPT09PT09PT09PT09PT09PVxyXG5cdFx0My4gRGF0YSBUYWJsZVxyXG5cdCAgID09PT09PT09PT09PT09PT0gKi9cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBkYXRhIHRhYmxlcy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBEYXRhVGFibGUgPSBmdW5jdGlvbiBEYXRhVGFibGUoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMuaGVhZGVycyA9ICQoZWxlbWVudCkuZmluZCgndGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJ3Rib2R5IHRyJyk7XHJcblx0XHR0aGlzLmZvb3RSb3dzID0gJChlbGVtZW50KS5maW5kKCd0Zm9vdCB0cicpO1xyXG5cdFx0dGhpcy5yb3dzID0gJC5tZXJnZSh0aGlzLmJvZHlSb3dzLCB0aGlzLmZvb3RSb3dzKTtcclxuXHRcdHRoaXMuY2hlY2tib3hlcyA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uQ0hFQ0tCT1gpO1xyXG5cdFx0dGhpcy5tYXN0ZXJDaGVja2JveCA9ICQoZWxlbWVudCkuZmluZCh0aGlzLlNlbGVjdG9yc18uTUFTVEVSX0NIRUNLQk9YKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH07XHJcblxyXG5cdHdpbmRvd1snRGF0YVRhYmxlJ10gPSBEYXRhVGFibGU7XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICcuZGF0YS10YWJsZScsXHJcblx0XHRNQVNURVJfQ0hFQ0tCT1g6ICd0aGVhZCAubWFzdGVyLWNoZWNrYm94JyxcclxuXHRcdENIRUNLQk9YOiAndGJvZHkgLmNoZWNrYm94LWlucHV0JyxcclxuXHRcdElTX1NFTEVDVEVEOiAnLmlzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdERhdGFUYWJsZS5wcm90b3R5cGUuZnVuY3Rpb25zID0ge1xyXG5cdFx0c2VsZWN0QWxsUm93czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKHRoaXMubWFzdGVyQ2hlY2tib3guaXMoJzpjaGVja2VkJykpe1xyXG5cdFx0XHRcdHRoaXMucm93cy5hZGRDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucm93cy5yZW1vdmVDbGFzcyhEYXRhVGFibGUucHJvdG90eXBlLkNzc0NsYXNzZXNfLklTX1NFTEVDVEVEKTtcclxuXHRcdFx0XHR0aGlzLmNoZWNrYm94ZXMucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHNlbGVjdFJvdzogZnVuY3Rpb24gKGNoZWNrYm94LCByb3cpIHtcclxuXHRcdFx0aWYgKHJvdykge1xyXG5cdFx0XHRcdGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdFx0cm93LmFkZENsYXNzKERhdGFUYWJsZS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfU0VMRUNURUQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyb3cucmVtb3ZlQ2xhc3MoRGF0YVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19TRUxFQ1RFRCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRhdGFUYWJsZSA9IHRoaXM7XHJcblxyXG5cdFx0dGhpcy5tYXN0ZXJDaGVja2JveC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5zZWxlY3RBbGxSb3dzLCBkYXRhVGFibGUpKTtcclxuXHRcdCQodGhpcy5jaGVja2JveGVzKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0JCh0aGlzKS5vbignY2hhbmdlJywgJC5wcm94eShkYXRhVGFibGUuZnVuY3Rpb25zLnNlbGVjdFJvdywgdGhpcywgJCh0aGlzKSwgZGF0YVRhYmxlLmJvZHlSb3dzLmVxKGkpKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRhVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5EQVRBX1RBQkxFKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdDQuIENvbHVtbiBUb2dnbGUgVGFibGVcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcblx0LyoqXHJcblx0KiBDbGFzcyBjb25zdHJ1Y3RvciBmb3IgZGF0YSB0YWJsZXMuXHJcblx0KlxyXG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgdXBncmFkZWQuXHJcblx0Ki9cclxuXHR2YXIgQ29sdW1uVG9nZ2xlVGFibGUgPSBmdW5jdGlvbiBDb2x1bW5Ub2dnbGVUYWJsZShlbGVtZW50KSB7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0dGhpcy5oZWFkID0gJChlbGVtZW50KS5maW5kKCc+IHRoZWFkIHRyJyk7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSAkKGVsZW1lbnQpLmZpbmQoJz4gdGhlYWQgdHIgdGgnKTtcclxuXHRcdHRoaXMuYm9keVJvd3MgPSAkKGVsZW1lbnQpLmZpbmQoJz4gdGJvZHkgdHInKTtcclxuXHRcdHRoaXMuc2VsZWN0b3JNZW51ID0gbnVsbDtcclxuXHRcdHRoaXMuc2VsZWN0b3JCdXR0b24gPSBudWxsO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydDb2x1bW5Ub2dnbGVUYWJsZSddID0gQ29sdW1uVG9nZ2xlVGFibGU7XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdERBVEFfVEFCTEU6ICdkYXRhLXRhYmxlJyxcclxuXHRcdElTX1NFTEVDVEVEOiAnaXMtc2VsZWN0ZWQnXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRUT0dHTEVfVEFCTEU6ICcudGFibGUtY29sdW1uLXRvZ2dsZSdcclxuXHR9O1xyXG5cclxuXHRDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuSHRtbFNuaXBwZXRzXyA9IHtcclxuXHRcdENPTFVNTl9TRUxFQ1RPUl9CVVRUT046ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcmFpc2VkIGRvdC1tZW51X19hY3RpdmF0b3JcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWFyZ2luLXRvcDoycmVtO21hcmdpbi1sZWZ0OmF1dG87XCI+Q29sdW1uczwvYnV0dG9uPicsXHJcblx0XHRDT0xVTU5fU0VMRUNUT1JfTUVOVTogJzx1bCBjbGFzcz1cImRvdC1tZW51IGRvdC1tZW51LS1ib3R0b20tbGVmdFwiPjwvdWw+J1xyXG5cdH07XHJcblxyXG5cdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMgPSB7XHJcblx0XHR0b2dnbGVDb2x1bW46IGZ1bmN0aW9uKGNvbHVtbkluZGV4LCB0YWJsZSwgY2hlY2tlZCkge1xyXG5cdFx0XHRpZihjaGVja2VkKXtcclxuXHRcdFx0XHR0YWJsZS5oZWFkLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuc2hvdygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuYXR0cignaGlkZGVuJywgXCJ0cnVlXCIpO1xyXG5cdFx0XHRcdHRhYmxlLmhlYWQuY2hpbGRyZW4oKS5lcShjb2x1bW5JbmRleCkuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoY2hlY2tlZCl7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoY29sdW1uSW5kZXgpLnNob3coKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jaGlsZHJlbigpLmVxKGNvbHVtbkluZGV4KS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0cmVmcmVzaDogZnVuY3Rpb24odGFibGUpIHtcclxuXHRcdFx0dmFyIGhpZGVJbmRpY2VzID0gW107XHJcblxyXG5cdFx0XHR0YWJsZS5ib2R5Um93cyA9IHRhYmxlLmVsZW1lbnQuZmluZCgndGJvZHkgdHInKTtcclxuXHRcdFx0dGFibGUuaGVhZGVycy5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoJCh0aGlzKS5hdHRyKCdoaWRkZW4nKSl7XHJcblx0XHRcdFx0XHRoaWRlSW5kaWNlcy5wdXNoKCQodGhpcykuaW5kZXgoKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhYmxlLmJvZHlSb3dzLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhpZGVJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmNoaWxkcmVuKCkuZXEoaGlkZUluZGljZXNbaV0pLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRyZWZyZXNoQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JChDb2x1bW5Ub2dnbGVUYWJsZS5wcm90b3R5cGUuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmZ1bmN0aW9ucy5yZWZyZXNoKHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZighdGhpcy5lbGVtZW50LmF0dHIoJ2lkJykpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkNvbHVtblRvZ2dsZVRhYmxlIHJlcXVpcmVzIHRoZSB0YWJsZSB0byBoYXZlIGFuIHVuaXF1ZSBJRC5cIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdG9nZ2xlVGFibGUgPSB0aGlzO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX0JVVFRPTik7XHJcblx0XHR2YXIgY29sdW1uU2VsZWN0b3JNZW51ID0gJCh0aGlzLkh0bWxTbmlwcGV0c18uQ09MVU1OX1NFTEVDVE9SX01FTlUpO1xyXG5cdFx0dmFyIGNvbHVtblNlbGVjdG9yQnV0dG9uRG90TWVudUlkID0gJ0NvbHVtblRvZ2dsZVRhYmxlLScgKyB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJyk7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmJlZm9yZShjb2x1bW5TZWxlY3RvckJ1dHRvbik7XHJcblxyXG5cdFx0Y29sdW1uU2VsZWN0b3JCdXR0b24uYWZ0ZXIoY29sdW1uU2VsZWN0b3JNZW51KTtcclxuXHRcdGNvbHVtblNlbGVjdG9yQnV0dG9uLmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQpO1xyXG5cdFx0Y29sdW1uU2VsZWN0b3JNZW51LmF0dHIoJ2lkJywgY29sdW1uU2VsZWN0b3JCdXR0b25Eb3RNZW51SWQgKyAnLW1lbnUnKTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yQnV0dG9uID0gY29sdW1uU2VsZWN0b3JCdXR0b247XHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudSA9IGNvbHVtblNlbGVjdG9yTWVudTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdG9yTWVudS5maW5kKCd1bCcpLmRhdGEoXCJ0YWJsZVwiLCB0b2dnbGVUYWJsZS5lbGVtZW50LmF0dHIoJ2lkJykpO1xyXG5cclxuXHRcdHRoaXMuaGVhZGVycy5lYWNoKGZ1bmN0aW9uICgpe1xyXG5cdFx0XHR2YXIgY2hlY2tlZCA9ICQodGhpcykuZGF0YShcImRlZmF1bHRcIikgPyBcImNoZWNrZWRcIiA6IFwiXCI7XHJcblx0XHRcdCQodGhpcykuZGF0YSgndmlzaWJsZScsICQodGhpcykuZGF0YShcImRlZmF1bHRcIikpO1xyXG5cclxuXHRcdFx0Y29sdW1uU2VsZWN0b3JNZW51LmFwcGVuZCgnXFxcclxuXHRcdFx0XHQ8bGkgY2xhc3M9XCJkb3QtbWVudV9faXRlbSBkb3QtbWVudV9faXRlbS0tcGFkZGVkXCI+IFxcXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4gXFxcclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY29sdW1uLXRvZ2dsZVwiIGlkPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIiB0eXBlPVwiY2hlY2tib3hcIiAnKyBjaGVja2VkICsnPiBcXFxyXG5cdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiY29sdW1uLScgKyAkKHRoaXMpLnRleHQoKSArICdcIj4nICsgJCh0aGlzKS50ZXh0KCkgKyAnPC9sYWJlbD4gXFxcclxuXHRcdFx0XHRcdDwvZGl2PiBcXFxyXG5cdFx0XHRcdDwvbGk+Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKFwiYm9keVwiKS5vbihcImNoYW5nZVwiLCBcIi5jb2x1bW4tdG9nZ2xlXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpbmRleCA9ICQoJy5jb2x1bW4tdG9nZ2xlJykuaW5kZXgodGhpcyk7XHJcblx0XHRcdENvbHVtblRvZ2dsZVRhYmxlLnByb3RvdHlwZS5mdW5jdGlvbnMudG9nZ2xlQ29sdW1uKGluZGV4LCB0b2dnbGVUYWJsZSwgJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMuU2VsZWN0b3JzXy5UT0dHTEVfVEFCTEUpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuQ29sdW1uVG9nZ2xlVGFibGUgPSBuZXcgQ29sdW1uVG9nZ2xlVGFibGUodGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQ1IEZvcm1zIC8gQUpBWCBGdW5jdGlvbnNcclxuXHQgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIEFqYXhGdW5jdGlvbnMgPSAgZnVuY3Rpb24gQWpheEZ1bmN0aW9ucygpIHt9O1xyXG5cdHdpbmRvd1snQWpheEZ1bmN0aW9ucyddID0gQWpheEZ1bmN0aW9ucztcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18gPSB7XHJcblx0XHREQVRBX1RBQkxFOiAnZGF0YS10YWJsZScsXHJcblx0XHRJU19TRUxFQ1RFRDogJ2lzLXNlbGVjdGVkJ1xyXG5cdH07XHJcblxyXG5cdEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18gPSB7XHJcblx0XHRTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0JyxcclxuXHRcdFNFQVJDSF9DT05UQUlORVI6ICcuc2VhcmNoLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0NPTlRBSU5FUjogJy5zZWFyY2gtZmlsdGVyLWNvbnRhaW5lcicsXHJcblx0XHRTRUFSQ0hfRklMVEVSX0JVVFRPTjogJyNzZWFyY2gtZmlsdGVyLWJ1dHRvbicsXHJcblx0XHRMT0dfSU5fRElBTE9HOiAnLmxvZ2luLmRpYWxvZycsXHJcblx0fTtcclxuXHJcblx0QWpheEZ1bmN0aW9ucy5wcm90b3R5cGUuS2V5c18gPSB7XHJcblx0XHRTUEFDRTogMzIsXHJcblx0XHRFTlRFUjogMTMsXHJcblx0XHRDT01NQTogNDVcclxuXHR9O1xyXG5cclxuXHQvLyBQcm9qZWN0IHBhZ2Ugc2VhcmNoIGZvY3VzXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9JTlBVVCkub24oJ2ZvY3VzJywgIGZ1bmN0aW9uKGUpe1xyXG5cdFx0cmVtb3ZlQWxsU2hhZG93Q2xhc3NlcyhBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpO1xyXG5cdFx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9DT05UQUlORVIpLmFkZENsYXNzKCdzaGFkb3ctZm9jdXMnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gUHJvamVjdCBwYWdlIHNlYXJjaCBmb2N1cyBvdXRcclxuXHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0lOUFVUKS5vbignZm9jdXNvdXQnLCAgZnVuY3Rpb24oZSl7XHJcblx0XHRyZW1vdmVBbGxTaGFkb3dDbGFzc2VzKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUik7XHJcblx0XHQkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0NPTlRBSU5FUikuYWRkQ2xhc3MoJ3NoYWRvdy0yZHAnKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU0VBUkNIXHJcblx0JChBamF4RnVuY3Rpb25zLnByb3RvdHlwZS5TZWxlY3RvcnNfLlNFQVJDSF9GSUxURVJfQlVUVE9OKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKEFqYXhGdW5jdGlvbnMucHJvdG90eXBlLlNlbGVjdG9yc18uU0VBUkNIX0ZJTFRFUl9DT05UQUlORVIpO1xyXG5cdFx0dmFyIGZpbHRlckJ1dHRvbiA9ICQodGhpcyk7XHJcblxyXG5cdFx0aWYoY29udGFpbmVyLmhhc0NsYXNzKCdhY3RpdmUnKSl7XHJcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5ibHVyKCk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdGNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdGZpbHRlckJ1dHRvbi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdCAgIDYgRWRpdCBUb3BpY3MgW0FkbWluXVxyXG5cdCAgID09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHQvKipcclxuXHQqIENsYXNzIGNvbnN0cnVjdG9yIGZvciBhamF4IGZ1bmN0aW9ucy5cclxuXHQqXHJcblx0KiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cclxuXHQqL1xyXG5cdHZhciBFZGl0VG9waWMgPSBmdW5jdGlvbiBFZGl0VG9waWMoZWxlbWVudCkge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMub3JpZ2luYWxOYW1lID0gJChlbGVtZW50KS5kYXRhKFwib3JpZ2luYWwtdG9waWMtbmFtZVwiKTtcclxuXHRcdHRoaXMudG9waWNJZCA9ICQoZWxlbWVudCkuZGF0YSgndG9waWMtaWQnKTtcclxuXHRcdHRoaXMudG9waWNOYW1lSW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24gPSAkKGVsZW1lbnQpLmZpbmQoJy5lZGl0LXRvcGljJyk7XHJcblx0XHR0aGlzLmRlbGV0ZUJ1dHRvbiA9ICQoZWxlbWVudCkuZmluZCgnLmRlbGV0ZS10b3BpYycpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fTtcclxuXHJcblx0d2luZG93WydFZGl0VG9waWMnXSA9IEVkaXRUb3BpYztcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RURJVF9UT1BJQzogJy5lZGl0LXRvcGljLWxpc3QgLnRvcGljJyxcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0REVMRVRFX1RPUElDOiAnL3RvcGljcy8nLFxyXG5cdFx0UEFUQ0hfVE9QSUM6ICcvdG9waWNzLycsXHJcblx0XHRORVdfVE9QSUM6ICcvdG9waWNzLydcclxuXHR9O1xyXG5cclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmZ1bmN0aW9ucyA9IHtcclxuXHRcdGVkaXRUb3BpYzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0b3BpYyA9IHRoaXM7XHJcblx0XHRcdGlmKHRvcGljLm9yaWdpbmFsTmFtZSA9PSB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSl7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQuY29uZmlybSh7XHJcblx0XHRcdFx0dGl0bGU6ICdDaGFuZ2UgVG9waWMgTmFtZScsXHJcblx0XHRcdFx0dHlwZTogJ2JsdWUnLFxyXG5cdFx0XHRcdGljb246ICc8ZGl2IGNsYXNzPVwic3ZnLWNvbnRhaW5lclwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTksNEgxNS41TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5TTYsMTlBMiwyIDAgMCwwIDgsMjFIMTZBMiwyIDAgMCwwIDE4LDE5VjdINlYxOVpcIiAvPjwvc3ZnPjwvZGl2PicsXHJcblx0XHRcdFx0dGhlbWU6ICdtb2Rlcm4nLFxyXG5cdFx0XHRcdGVzY2FwZUtleTogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogdHJ1ZSxcclxuXHRcdFx0XHRhbmltYXRlRnJvbUVsZW1lbnQgOiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgdG9waWMgbmFtZSBmcm9tIDxiPlwiJyArICB0b3BpYy5vcmlnaW5hbE5hbWUgKyAnXCI8L2I+IHRvIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArJ1wiPC9iPj8nLFxyXG5cdFx0XHRcdGJ1dHRvbnM6IHtcclxuXHRcdFx0XHRcdGNvbmZpcm06IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tYmx1ZScsXHJcblx0XHRcdFx0XHRcdGFjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLmVkaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJy5sb2FkZXInLCB0b3BpYy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BBVENIJyxcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogdG9waWMuVXJsc18uREVMRVRFX1RPUElDLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dDogdG9waWMsXHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvcGljX2lkOiB0b3BpYy50b3BpY0lkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19uYW1lIDogdG9waWMudG9waWNOYW1lSW5wdXQudmFsKClcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lZGl0QnV0dG9uLmh0bWwoJ0VkaXQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRvcGljLm9yaWdpbmFsTmFtZSA9IHRvcGljLnRvcGljTmFtZUlucHV0LnZhbCgpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2FuY2VsOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR0b3BpYy50b3BpY05hbWVJbnB1dC52YWwodG9waWMub3JpZ2luYWxOYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dG9waWMudG9waWNOYW1lSW5wdXQudmFsKHRvcGljLm9yaWdpbmFsTmFtZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGRlbGV0ZVRvcGljOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRvcGljID0gdGhpcztcclxuXHRcdFx0JC5jb25maXJtKHtcclxuXHRcdFx0XHR0aXRsZTogJ0RlbGV0ZScsXHJcblx0XHRcdFx0dHlwZTogJ3JlZCcsXHJcblx0XHRcdFx0aWNvbjogJzxkaXYgY2xhc3M9XCJzdmctY29udGFpbmVyXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSw0SDE1LjVMMTQuNSwzSDkuNUw4LjUsNEg1VjZIMTlNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5WlwiIC8+PC9zdmc+PC9kaXY+JyxcclxuXHRcdFx0XHR0aGVtZTogJ21vZGVybicsXHJcblx0XHRcdFx0ZXNjYXBlS2V5OiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmREaXNtaXNzOiB0cnVlLFxyXG5cdFx0XHRcdGFuaW1hdGVGcm9tRWxlbWVudCA6IGZhbHNlLFxyXG5cdFx0XHRcdGNvbnRlbnQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIDxiPlwiJyArICB0b3BpYy50b3BpY05hbWVJbnB1dC52YWwoKSArICdcIjwvYj4/JyxcclxuXHRcdFx0XHRidXR0b25zOiB7XHJcblx0XHRcdFx0XHRkZWxldGU6IHtcclxuXHRcdFx0XHRcdFx0YnRuQ2xhc3M6ICdidG4tcmVkJyxcclxuXHRcdFx0XHRcdFx0YWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHRvcGljLnRvcGljTmFtZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHRvcGljLlVybHNfLkRFTEVURV9UT1BJQyxcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQ6IHRvcGljLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpY19pZDogdG9waWMudG9waWNJZCxcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5lbGVtZW50LmhpZGUoY29uZmlnLmFuaW10aW9ucy5zbG93LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0b3BpYy5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRjcmVhdGVFZGl0VG9waWNET006IGZ1bmN0aW9uKHRvcGljSWQsIG9yaWdpbmFsTmFtZSl7XHJcblx0XHRcdCQoXCIuZWRpdC10b3BpYy1saXN0XCIpLnByZXBlbmQoJzxsaSBjbGFzcz1cInRvcGljXCIgZGF0YS10b3BpYy1pZD1cIicgKyB0b3BpY0lkICsnXCIgZGF0YS1vcmlnaW5hbC10b3BpYy1uYW1lPVwiJyArIG9yaWdpbmFsTmFtZSArJ1wiPjxpbnB1dCBzcGVsbGNoZWNrPVwidHJ1ZVwiIG5hbWU9XCJuYW1lXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIicgKyBvcmlnaW5hbE5hbWUgKydcIj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGVkaXQtdG9waWNcIiB0eXBlPVwic3VibWl0XCI+RWRpdDwvYnV0dG9uPjxidXR0b24gY2xhc3M9XCJidXR0b24gZGVsZXRlLXRvcGljIGJ1dHRvbi0tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+PC9saT4nKTtcclxuXHRcdFx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGVkaXRUb3BpYyA9IHRoaXM7XHJcblx0XHR0aGlzLmVkaXRCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5lZGl0VG9waWMsIHRoaXMsIGVkaXRUb3BpYykpO1xyXG5cdFx0dGhpcy5kZWxldGVCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLmZ1bmN0aW9ucy5kZWxldGVUb3BpYywgdGhpcywgZWRpdFRvcGljKSk7XHJcblx0fTtcclxuXHJcblx0RWRpdFRvcGljLnByb3RvdHlwZS5pbml0QWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uRURJVF9UT1BJQykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5FZGl0VG9waWMgPSBuZXcgRWRpdFRvcGljKHRoaXMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0ICAgNyBEb3RNZW51XHJcblx0ICAgPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5cdC8qKlxyXG5cdCogQ2xhc3MgY29uc3RydWN0b3IgZm9yIGFqYXggZnVuY3Rpb25zLlxyXG5cdCpcclxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVwZ3JhZGVkLlxyXG5cdCovXHJcblx0dmFyIERvdE1lbnUgPSBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMubWVudSA9IG51bGw7XHJcblx0XHR0aGlzLmlzVGFibGVEb3RNZW51ID0gZmFsc2U7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5TZWxlY3RvcnNfID0ge1xyXG5cdFx0RE9UX01FTlU6ICcuZG90LW1lbnUnLFxyXG5cdFx0QUNUSVZBVE9SOiAnLmRvdC1tZW51X19hY3RpdmF0b3InLFxyXG5cdFx0SVNfVklTSUJMRTogJy5pcy12aXNpYmxlJyxcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXyA9IHtcclxuXHRcdElTX1ZJU0lCTEU6ICdpcy12aXNpYmxlJyxcclxuXHRcdEJPVFRPTV9MRUZUOiAnZG90LW1lbnUtLWJvdHRvbS1sZWZ0JyxcclxuXHRcdEJPVFRPTV9SSUdIVDogJ2RvdC1tZW51LS1ib3R0b20tcmlnaHQnLFxyXG5cdFx0VE9QX0xFRlQ6ICdkb3QtbWVudS0tdG9wLWxlZnQnLFxyXG5cdFx0VE9QX1JJR0hUOiAnZG90LW1lbnUtLXRvcC1yaWdodCcsXHJcblx0XHRUQUJMRV9ET1RfTUVOVTogJ2RvdC1tZW51LS10YWJsZSdcclxuXHR9O1xyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5wb3NpdGlvbk1lbnUgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGJ1dHRvblJlY3QgPSB0aGlzLmJ1dHRvblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcblx0XHRpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5CT1RUT01fTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSBwYXJzZUludCh0aGlzLmJ1dHRvbi5jc3MoJ3dpZHRoJyksIDEwKSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIHJpZ2h0Jyk7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5tZW51Lmhhc0NsYXNzKHRoaXMuQ3NzQ2xhc3Nlc18uQk9UVE9NX1JJR0hUKSl7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RvcCcsIGJ1dHRvblJlY3QuYm90dG9tKTtcclxuXHRcdFx0dGhpcy5tZW51LmNzcygnbGVmdCcsIGJ1dHRvblJlY3QubGVmdCAtIDEyMCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wIGxlZnQnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLm1lbnUuaGFzQ2xhc3ModGhpcy5Dc3NDbGFzc2VzXy5UT1BfTEVGVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LnJpZ2h0IC0gcGFyc2VJbnQodGhpcy5idXR0b24uY3NzKCd3aWR0aCcpLCAxMCkpO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSByaWdodCcpO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMubWVudS5oYXNDbGFzcyh0aGlzLkNzc0NsYXNzZXNfLlRPUF9SSUdIVCkpe1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LnRvcCAtIDE1MCk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ2xlZnQnLCBidXR0b25SZWN0LmxlZnQgLSAxMjApO1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgJ2JvdHRvbSBsZWZ0Jyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1lbnUuY3NzKCd0b3AnLCBidXR0b25SZWN0LmJvdHRvbSk7XHJcblx0XHRcdHRoaXMubWVudS5jc3MoJ3RyYW5zZm9ybS1vcmlnaW4nLCAndG9wJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdERvdE1lbnUucHJvdG90eXBlLnBvc2l0aW9uTWVudS5iaW5kKHRoaXMpKCk7XHJcblx0XHR0aGlzLm1lbnUuYWRkQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLm1lbnUucmVtb3ZlQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uSVNfVklTSUJMRSk7XHJcblx0XHR0aGlzLm1lbnUuaGlkZSgpO1xyXG5cdH1cclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZCh0aGlzKSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUuc2hvdy5iaW5kKHRoaXMpKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvdE1lbnUgPSB0aGlzO1xyXG5cdFx0dmFyIG1lbnVJZCA9ICQodGhpcy5idXR0b24pLmF0dHIoJ2lkJykgKyAnLW1lbnUnO1xyXG5cclxuXHRcdHRoaXMubWVudSA9ICQoJyMnICsgbWVudUlkKTtcclxuXHRcdHRoaXMuaXNUYWJsZURvdE1lbnUgPSB0aGlzLm1lbnUuaGFzQ2xhc3MoRG90TWVudS5wcm90b3R5cGUuQ3NzQ2xhc3Nlc18uVEFCTEVfRE9UX01FTlUpO1xyXG5cclxuXHRcdHRoaXMuYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0RG90TWVudS5wcm90b3R5cGUudG9nZ2xlLmJpbmQoZG90TWVudSkoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKGRvdE1lbnUubWVudS5oYXNDbGFzcyhEb3RNZW51LnByb3RvdHlwZS5Dc3NDbGFzc2VzXy5JU19WSVNJQkxFKSl7XHJcblx0XHRcdFx0RG90TWVudS5wcm90b3R5cGUucG9zaXRpb25NZW51LmJpbmQoZG90TWVudSkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGlmKCF0YXJnZXQuaXMoZG90TWVudS5tZW51KSB8fCAhdGFyZ2V0LmlzKGRvdE1lbnUuYnV0dG9uKSkge1xyXG5cdFx0XHRcdGlmKCEkLmNvbnRhaW5zKCQoZG90TWVudS5tZW51KVswXSwgZS50YXJnZXQpKXtcclxuXHRcdFx0XHRcdERvdE1lbnUucHJvdG90eXBlLmhpZGUuYmluZChkb3RNZW51KSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RG90TWVudS5wcm90b3R5cGUuaW5pdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzLlNlbGVjdG9yc18uQUNUSVZBVE9SKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLkRvdE1lbnUgPSBuZXcgRG90TWVudSh0aGlzKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qID09PT09PT09PT09PT09PT09PVxyXG5cdFx0NS4gU2Vjb25kIE1hcmtlclxyXG5cdCAgID09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHR2YXIgTWFya2VyID0gZnVuY3Rpb24gTWFya2VyKCkge1xyXG5cdFx0aWYoJChcIiMybmQtbWFya2VyLXN0dWRlbnQtdGFibGVcIikubGVuZ3RoIDwgMSB8fCAkKFwiIzJuZC1tYXJrZXItc3VwZXJ2aXNvci10YWJsZVwiKS5sZW5ndGggPCAxKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZWxlY3RlZFN0dWRlbnQgPSBudWxsO1xyXG5cdFx0dGhpcy5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdFx0dGhpcy5zdHVkZW50VGFibGUgPSAkKFwiIzJuZC1tYXJrZXItc3R1ZGVudC10YWJsZVwiKTtcclxuXHRcdHRoaXMuc3R1ZGVudERhdGFUYWJsZSA9IHRoaXMuc3R1ZGVudFRhYmxlWzBdLmRhdGFUYWJsZTtcclxuXHRcdHRoaXMuc3VwZXJ2aXNvclRhYmxlID0gJChcIiMybmQtbWFya2VyLXN1cGVydmlzb3ItdGFibGVcIik7XHJcblx0XHR0aGlzLnN1cGVydmlzb3JEYXRhVGFibGUgPSB0aGlzLnN1cGVydmlzb3JUYWJsZVswXS5kYXRhVGFibGU7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLlVybHNfID0ge1xyXG5cdFx0QVNTSUdOX01BUktFUjogJy9hZG1pbi9tYXJrZXItYXNzaWduJyxcclxuXHR9O1xyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN0dWRlbnQgPSBmdW5jdGlvbihzdHVkZW50Um93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3R1ZGVudFJvd0RPTSk7XHJcblxyXG5cdFx0bWFya2VyLnVuc2VsZWN0QWxsKG1hcmtlcik7XHJcblx0XHRyb3cuYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQgPSAkKHJvdyk7XHJcblxyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYoJCh0aGlzKS5kYXRhKCdtYXJrZXItaWQnKSA9PSByb3cuZGF0YSgnc3VwZXJ2aXNvci1pZCcpKXtcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IgPSBmdW5jdGlvbihzdXBlcnZpc29yUm93RE9NLCBtYXJrZXIpe1xyXG5cdFx0dmFyIHJvdyA9ICQoc3VwZXJ2aXNvclJvd0RPTSk7XHJcblxyXG5cdFx0aWYocm93LmF0dHIoJ2Rpc2FibGVkJykpe3JldHVybjt9XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCAhPSBudWxsKXtcclxuXHRcdFx0cm93LmFkZENsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSByb3c7XHJcblx0XHRcdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyhcclxuXHRcdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtbmFtZScpLFxyXG5cdFx0XHRcdG1hcmtlci5zZWxlY3RlZFN0dWRlbnQuZGF0YSgnc3VwZXJ2aXNvci1uYW1lJyksXHJcblx0XHRcdFx0cm93LmRhdGEoJ21hcmtlci1uYW1lJyksXHJcblx0XHRcdFx0bWFya2VyLnNlbGVjdGVkU3R1ZGVudC5kYXRhKCdwcm9qZWN0JykpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5yZXNldFZpZXcgPSBmdW5jdGlvbihtYXJrZXIpe1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLnJlbW92ZUNsYXNzKFwiaXMtc2VsZWN0ZWRcIik7XHJcblx0XHQkKG1hcmtlci5zdXBlcnZpc29yRGF0YVRhYmxlLmJvZHlSb3dzKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50ID0gbnVsbDtcclxuXHRcdG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG1hcmtlcil7XHJcblx0XHQkKG1hcmtlci5zdHVkZW50RGF0YVRhYmxlLmJvZHlSb3dzKS5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xyXG5cdFx0JChtYXJrZXIuc3VwZXJ2aXNvckRhdGFUYWJsZS5ib2R5Um93cykucmVtb3ZlQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcclxuXHR9XHJcblxyXG5cdE1hcmtlci5wcm90b3R5cGUuc2hvd0RpYWxvZyA9IGZ1bmN0aW9uKHN0dWRlbnROYW1lLCBzdXBlcnZpc29yTmFtZSwgbWFya2VyTmFtZSwgcHJvamVjdCl7XHJcblx0XHQkKFwiI3N0dWRlbnQtbmFtZVwiKS50ZXh0KHN0dWRlbnROYW1lKTtcclxuXHRcdCQoXCIjc3VwZXJ2aXNvci1uYW1lXCIpLnRleHQoc3VwZXJ2aXNvck5hbWUpO1xyXG5cdFx0JChcIiNtYXJrZXItbmFtZVwiKS50ZXh0KG1hcmtlck5hbWUpO1xyXG5cclxuXHRcdCQoXCIjcHJvamVjdC10aXRsZVwiKS5odG1sKCc8Yj5UaXRsZTogPC9iPicgKyBwcm9qZWN0Wyd0aXRsZSddKTtcclxuXHRcdCQoXCIjcHJvamVjdC1kZXNjcmlwdGlvblwiKS5odG1sKCc8Yj5EZXNjcmlwdGlvbjogPC9iPicgKyBwcm9qZWN0WydkZXNjcmlwdGlvbiddKTtcclxuXHJcblx0XHQkKFwiI2Fzc2lnbi1kaWFsb2dcIilbMF0uZGlhbG9nLnNob3dEaWFsb2coKTtcclxuXHR9XHJcblxyXG5cdCQoJyNzdWJtaXRBc3NpZ25NYXJrZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG1hcmtlciA9IHdpbmRvd1snTWFya2VyJ107XHJcblxyXG5cdFx0aWYobWFya2VyLnNlbGVjdGVkU3R1ZGVudCA9PSBudWxsIHx8IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IgPT0gbnVsbCl7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZURpYWxvZygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9O1xyXG5cclxuXHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuc2hvd0xvYWRlcigpO1xyXG5cclxuXHRcdHZhciBwcm9qZWN0SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3Byb2plY3QnKVsnaWQnXTtcclxuXHRcdHZhciBzdHVkZW50SWQgPSBtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LmRhdGEoJ3N0dWRlbnQtaWQnKTtcclxuXHRcdHZhciBtYXJrZXJJZCA9IG1hcmtlci5zZWxlY3RlZFN1cGVydmlzb3IuZGF0YSgnbWFya2VyLWlkJyk7XHJcblxyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dHlwZTogXCJQQVRDSFwiLFxyXG5cdFx0XHR1cmw6IG1hcmtlci5VcmxzXy5BU1NJR05fTUFSS0VSLFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0cHJvamVjdF9pZDogcHJvamVjdElkLFxyXG5cdFx0XHRcdHN0dWRlbnRfaWQ6IHN0dWRlbnRJZCxcclxuXHRcdFx0XHRtYXJrZXJfaWQ6IG1hcmtlcklkLFxyXG5cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0fSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0JChcIiNhc3NpZ24tZGlhbG9nXCIpWzBdLmRpYWxvZy5oaWRlRGlhbG9nKCk7XHJcblx0XHRcdCQoXCIjYXNzaWduLWRpYWxvZ1wiKVswXS5kaWFsb2cuaGlkZUxvYWRlcigpO1xyXG5cdFx0XHRtYXJrZXIuc2VsZWN0ZWRTdHVkZW50LnJlbW92ZSgpO1xyXG5cdFx0XHRtYXJrZXIucmVzZXRWaWV3KG1hcmtlcik7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0TWFya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBtYXJrZXIgPSB0aGlzO1xyXG5cdFx0JChtYXJrZXIuc3R1ZGVudERhdGFUYWJsZS5ib2R5Um93cykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7IE1hcmtlci5wcm90b3R5cGUuc2VsZWN0U3R1ZGVudCh0aGlzLCBtYXJrZXIpOyB9KTtcclxuXHRcdCQobWFya2VyLnN1cGVydmlzb3JEYXRhVGFibGUuYm9keVJvd3MpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyBNYXJrZXIucHJvdG90eXBlLnNlbGVjdFN1cGVydmlzb3IodGhpcywgbWFya2VyKTsgfSk7XHJcblx0fVxyXG5cclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwgPSBmdW5jdGlvbigpe1xyXG5cdFx0d2luZG93WydNYXJrZXInXSA9IG5ldyBNYXJrZXIoKTtcclxuXHR9XHJcblxyXG5cdC8vIEluaXRpYWxpc2UgYWxsIGNvbXBvbmVudHNcclxuXHRNb2JpbGVNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGlhbG9nLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0RGF0YVRhYmxlLnByb3RvdHlwZS5pbml0QWxsKCk7XHJcblx0Q29sdW1uVG9nZ2xlVGFibGUucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRFZGl0VG9waWMucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHRNYXJrZXIucHJvdG90eXBlLmluaXRBbGwoKTtcclxuXHREb3RNZW51LnByb3RvdHlwZS5pbml0QWxsKCk7XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=