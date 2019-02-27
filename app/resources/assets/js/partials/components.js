/*
 * Copyright (C) University of Sussex 2019.
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
|	1.1 Desktop Menu
|	2. Dialog / Modal
|	3. Data Table
|	3.1 Column Toggle Table
|	4. Edit Topics [Project Admin]
|	4.1 Edit Programmes [Project Admin]
|	5. Second Marker [Assign]
|	5.1 Second Marker [Swap]
|	6. Universal Search
|	7. Forms / AJAX Functions
|
*/
"use strict";

;$(function() {

	/* ==================
		 1. Mobile Menu
	   ================== */

	/**
		* Class constructor for mobile menu.
		*
		* @param {HTMLElement} element The element that will be upgraded.
	*/
	var MobileMenu = function MobileMenu(element) {
		if(window['MobileMenu'] == null){
			window['MobileMenu'] = this;
			this.element = $(element);
			this.activator = $(this.Selectors_.HAMBURGER_CONTAINER);
			this.underlay = $(this.Selectors_.UNDERLAY);
			this.closeButton = $(element).find('.close-menu');
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
		HAMBURGER_CONTAINER: '.mobile-menu-container',
		UNDERLAY: '.mobile-nav-underlay'
	};

	MobileMenu.prototype.openMenu = function (){
		this.activator.attr("aria-expanded", "true");
		this.element.addClass(this.CssClasses_.IS_VISIBLE);

		this.underlay.attr("aria-hidden", "false");
		this.underlay.addClass(this.CssClasses_.IS_VISIBLE);
	};

	MobileMenu.prototype.closeMenu = function (){
		this.activator.attr("aria-expanded", "false");
		this.element.removeClass(this.CssClasses_.IS_VISIBLE);

		this.underlay.attr("aria-hidden", "true");
		this.underlay.removeClass(this.CssClasses_.IS_VISIBLE);
	};

	MobileMenu.prototype.init = function () {
		var mobileMenu = this;
		this.activator.on('click', mobileMenu.openMenu.bind(mobileMenu));
		this.underlay.on('click', mobileMenu.closeMenu.bind(mobileMenu));
		this.closeButton.on('click', mobileMenu.closeMenu.bind(mobileMenu));
	};

	MobileMenu.prototype.initAll = function () {
		$(this.Selectors_.MOBILE_MENU).each(function() {
			this.mobileMenu = new MobileMenu(this);
		});
	};

	/* =========================
		1.1 Desktop menu (MORPH)
	   ========================= */
	function morphDropdown( element ) {
		this.element = element;
		this.mainNavigation = this.element.find('.main-nav');
		this.mainNavigationItems = this.mainNavigation.find('.has-dropdown');
		this.dropdownList = this.element.find('.dropdown-list');
		this.dropdownWrappers = this.dropdownList.find('.dropdown');
		this.dropdownItems = this.dropdownList.find('.content');
		this.dropdownBg = this.dropdownList.find('.bg-layer');
		this.mq = this.checkMq();
		this.bindEvents();
	}

	morphDropdown.prototype.checkMq = function() {
		//check screen size
		var self = this;
		return window.getComputedStyle(self.element.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
	};

	morphDropdown.prototype.bindEvents = function() {
		var self = this;
		//hover over an item in the main navigation
		this.mainNavigationItems.mouseenter(function(event){
			//hover over one of the nav items -> show dropdown
			self.showDropdown($(this));
		}).mouseleave(function(){
			setTimeout(function(){
				//if not hovering over a nav item or a dropdown -> hide dropdown
				if( self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) self.hideDropdown();
			}, 50);
		});

		//hover over the dropdown
		this.dropdownList.mouseleave(function(){
			setTimeout(function(){
				//if not hovering over a dropdown or a nav item -> hide dropdown
				(self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) && self.hideDropdown();
			}, 50);
		});

		//click on an item in the main navigation -> open a dropdown on a touch device
		this.mainNavigationItems.on('touchstart', function(event){
			var selectedDropdown = self.dropdownList.find('#'+$(this).data('content'));
			if( !self.element.hasClass('is-dropdown-visible') || !selectedDropdown.hasClass('active') ) {
				event.preventDefault();
				self.showDropdown($(this));
			}
		});
	};

	morphDropdown.prototype.showDropdown = function(item) {
		this.mq = this.checkMq();

		var self = this;
		var selectedDropdown = this.dropdownList.find('#'+item.data('content')),
			selectedDropdownHeight = selectedDropdown.innerHeight(),
			selectedDropdownWidth = selectedDropdown.children('.content').innerWidth(),
			selectedDropdownLeft = item.offset().left + item.innerWidth()/2 - selectedDropdownWidth/2;

		//update dropdown position and size
		this.updateDropdown(selectedDropdown, parseInt(selectedDropdownHeight), selectedDropdownWidth, parseInt(selectedDropdownLeft));
		//add active class to the proper dropdown item
		this.element.find('.active').removeClass('active');
		selectedDropdown.addClass('active').removeClass('move-left move-right').prevAll().addClass('move-left').end().nextAll().addClass('move-right');
		item.addClass('active');
		//show the dropdown wrapper if not visible yet
		if( !this.element.hasClass('is-dropdown-visible') ) {
			setTimeout(function(){
				self.element.addClass('is-dropdown-visible');
			}, 10);
		}

	};

	morphDropdown.prototype.updateDropdown = function(dropdownItem, height, width, left) {
		this.dropdownList.css({
			'-moz-transform': 'translateX(' + left + 'px)',
			'-webkit-transform': 'translateX(' + left + 'px)',
			'-ms-transform': 'translateX(' + left + 'px)',
			'-o-transform': 'translateX(' + left + 'px)',
			'transform': 'translateX(' + left + 'px)',
			'width': width+'px',
			'height': height+'px'
		});

		this.dropdownBg.css({
			'-moz-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'-webkit-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'-ms-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'-o-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
			'transform': 'scaleX(' + width + ') scaleY(' + height + ')'
		});
	};

	morphDropdown.prototype.hideDropdown = function() {
		this.mq = this.checkMq();
		this.element
			.removeClass('is-dropdown-visible')
			.find('.active')
			.removeClass('active')
			.end()
			.find('.move-left')
			.removeClass('move-left')
			.end()
			.find('.move-right')
			.removeClass('move-right');
	};

	morphDropdown.prototype.resetDropdown = function() {
		this.mq = this.checkMq();
	};

	var morphDropdowns = [];
	if( $('.cd-morph-dropdown').length > 0) {
		$('.cd-morph-dropdown').each(function(){
			//create a morphDropdown object for each .cd-morph-dropdown
			morphDropdowns.push(new morphDropdown($(this)));
		});

		var resizing = false;

		//on resize, reset dropdown style property
		updateDropdownPosition();
		$(window).on('resize', function(){
			if( !resizing ) {
				resizing = true;
				(!window.requestAnimationFrame) ? setTimeout(updateDropdownPosition, 300) : window.requestAnimationFrame(updateDropdownPosition);
			}
		});

		function updateDropdownPosition() {
			morphDropdowns.forEach(function(element){
				element.resetDropdown();
			});

			resizing = false;
		};
	}

	/* ====================
		2. Dialog / Modal
	   ==================== */
	var Dialog = function Dialog(element) {
		this.element = $(element);
		this.dialogName = $(element).data('dialog');
		this.underlay = $('.underlay');
		this.header = $(element).find(this.Selectors_.DIALOG_HEADER);
		this.content = $(element).find(this.Selectors_.DIALOG_CONTENT);

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

		window[this.dialogName + 'Dialog'] = this;
	};

	Dialog.prototype.HtmlSnippets_ = {
		LOADER: '<div class="w-100 loader text-center p-4" style="display:none"><div class="spinner-border text-primary"></div></div>',
	};

	Dialog.prototype.CssClasses_ = {
		ACTIVE: 'active',
	};

	Dialog.prototype.Selectors_ = {
		DIALOG: '.dialog',
		DIALOG_HEADER: '.header',
		DIALOG_CONTENT: '.content',
	};

	Dialog.prototype.showLoader = function(){
		this.loader.show();
		this.content.hide();
	};

	Dialog.prototype.hideLoader = function(){
		this.loader.hide();
		this.content.show();
	};

	Dialog.prototype.showDialog = function(){
		this.element.attr("aria-hidden", "false");
		this.underlay.addClass(this.CssClasses_.ACTIVE);
		this.underlay.data("owner", this.dialogName);
		this.element.addClass(this.CssClasses_.ACTIVE);
		window['Dialog'] = this;

		if (typeof(window['MobileMenu']) != "undefined"){
			window['MobileMenu'].closeMenu();
		}
	};

	Dialog.prototype.hideDialog = function(){
		if(this.isClosable && this.underlay.data("owner") == this.dialogName){
			this.element.attr("aria-hidden", "true");
			this.underlay.removeClass(this.CssClasses_.ACTIVE);
			this.element.removeClass(this.CssClasses_.ACTIVE);
		}
	};

	Dialog.prototype.init = function(){
		// Needed for context
		var dialog = this;

		// Find activator button
		$('button, a').each(function() {
			if($(this).data('activator') && $(this).data('dialog') == dialog.dialogName){
				dialog.activatorButtons.push($(this));
			}
		});

		// ARIA
		dialog.element.attr("aria-hidden", "true");
		dialog.underlay.on('click', dialog.hideDialog.bind(dialog));

		try{
			$(dialog.activatorButtons).each(function() {
				$(this).on('click', dialog.showDialog.bind(dialog));
			});
		} catch(err){
			console.error("Dialog " + dialog.dialogName + " has no activator button.");
			console.error(err);
		}
	};

	Dialog.prototype.initAll = function(){
		$(this.Selectors_.DIALOG).each(function() {
			this.dialog = new Dialog(this);
		});
	};

	$(document).ready(function() {
		$(this).keydown(function(e) {
			// Is ESC key is pressed, hide dialogs and mobile menu
			if(e.keyCode == 27 && window['Dialog'] != null) {
				window['Dialog'].hideDialog();
			}

			if(e.keyCode == 27 && window['MobileMenu'] != null) {
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
		selectAllRows: function() {
			if(this.masterCheckbox.is(':checked')){
				this.rows.addClass(DataTable.prototype.CssClasses_.IS_SELECTED);
				this.checkboxes.prop('checked', true);
			} else {
				this.rows.removeClass(DataTable.prototype.CssClasses_.IS_SELECTED);
				this.checkboxes.prop('checked', false);
			}
		},
		selectRow: function (checkbox, row) {
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
		$(this.checkboxes).each(function(i) {
			$(this).on('change', $.proxy(dataTable.functions.selectRow, this, $(this), dataTable.bodyRows.eq(i)));
		});
	};

	DataTable.prototype.initAll = function () {
		$(this.Selectors_.DATA_TABLE).each(function() {
			this.dataTable = new DataTable(this);
		});
	};

	/* ========================
		3.1. Column Toggle Table
	   ======================== */

	/**
	* Class constructor for data tables.
	*/
	var ColumnToggleTable = function ColumnToggleTable(element) {
		this.table = $(element);
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
		COLUMN_SELECTOR_BUTTON: '<button class="btn btn-light d-block ml-auto mb-3" style="position: relative;">Columns</button>',
		COLUMN_SELECTOR_MENU: '<ul class="p-2 mt-2 rounded shadow bg-white list-unstyled text-left" style="display: none;position: absolute;right: 0px;width: 200px;"></ul>'
	};

	ColumnToggleTable.prototype.functions = {
		toggleColumn: function(columnIndex, toggleTable, checked) {
			if(checked){
				toggleTable.head.children().eq(columnIndex).removeAttr('hidden');
				toggleTable.head.children().eq(columnIndex).show();
			} else {
				toggleTable.head.children().eq(columnIndex).attr('hidden', "true");
				toggleTable.head.children().eq(columnIndex).hide();
			}

			toggleTable.bodyRows.each(function(){
				if(checked){
					$(this).children().eq(columnIndex).show();
				} else {
					$(this).children().eq(columnIndex).hide();
				}
			});
		},

		refresh: function(toggleTable) {
			var hideIndices = [];

			toggleTable.bodyRows = toggleTable.table.find('tbody tr');
			toggleTable.headers.each(function(){
				if($(this).attr('hidden')){
					hideIndices.push($(this).index());
				}
			});

			toggleTable.bodyRows.each(function(){
				for (var i = 0; i < hideIndices.length; i++) {
					$(this).children().eq(hideIndices[i]).hide();
				}
			});
		},

		refreshAll: function() {
			$(ColumnToggleTable.prototype.Selectors_.TOGGLE_TABLE).each(function() {
				ColumnToggleTable.prototype.functions.refresh(this.ColumnToggleTable);
			});
		},
	};

	ColumnToggleTable.prototype.init = function () {
		var toggleTable = this;
		var columnSelectorButton = $(this.HtmlSnippets_.COLUMN_SELECTOR_BUTTON);
		var columnSelectorMenu = $(this.HtmlSnippets_.COLUMN_SELECTOR_MENU);


		this.table.before(columnSelectorButton);
		columnSelectorButton.append(columnSelectorMenu);

		this.selectorButton = columnSelectorButton;
		this.selectorMenu = columnSelectorMenu;

		this.headers.each(function (){
			var checked = $(this).data("default") ? "checked" : "";

			if($(this).data("default") == false){
				$(this).attr("hidden", "true");
			}

			if($(this).data("default") == "desktop" && $(window).width() <= config.mobileWidth){
				$(this).attr("hidden", "true");
			}

			columnSelectorMenu.append('\
				<li class="p-2 p-md-1"> \
					<div class="checkbox"> \
						<input class="column-toggle" id="column-' + $(this).text() + '" type="checkbox" '+ checked +'> \
						<label class="ml-1" for="column-' + $(this).text() + '">' + $(this).text() + '</label> \
					</div> \
				</li>');
		});

		columnSelectorButton.on("click", function(e){
			if($(e.target).hasClass("btn")){
				columnSelectorMenu.fadeToggle(config.animtions.medium);
			}
		})

		$("body").on("change", ".column-toggle", function(){
			var index = $('.column-toggle').index(this);
			ColumnToggleTable.prototype.functions.toggleColumn(index, toggleTable, $(this).prop('checked'));
		});
	};


	ColumnToggleTable.prototype.initAll = function () {
		$(this.Selectors_.TOGGLE_TABLE).each(function() {
			this.ColumnToggleTable = new ColumnToggleTable(this);
		});

		ColumnToggleTable.prototype.functions.refreshAll();
	};

	/* ==================================
		4. Edit Topics [Project Admin]
	================================== */

	/**
	* Class constructor for edit topics component.
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
		EDIT_TOPIC: '#edit-topic-list > div',
	};

	EditTopic.prototype.Urls_ = {
		DELETE_TOPIC: 'topics/',
		PATCH_TOPIC: 'topics/',
		NEW_TOPIC: 'topics/'
	};

	EditTopic.prototype.functions = {
		editTopic: function() {
			var topic = this;
			if(topic.originalName == topic.topicNameInput.val()){
				return;
			}
			$.confirm({
				title: 'Change Topic Name',
				type: 'blue',
				icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
				theme: 'modern',
				escapeKey: true,
				backgroundDismiss: true,
				animateFromElement : false,
				content: 'Are you sure you want to change the topic name from <b>"' + topic.originalName + '"</b> to <b>"' + topic.topicNameInput.val() +'"</b>?',
				buttons: {
					confirm: {
						btnClass: 'btn-blue',
						action: function(){
							topic.topicNameInput.prop('disabled', true);
							topic.editButton.html('<div class="spinner-border text-primary"</div>');

							$.ajax({
								method: 'PATCH',
								url: topic.Urls_.DELETE_TOPIC,
								context: topic,
								data: {
									topic_id: topic.topicId,
									topic_name : topic.topicNameInput.val()
								},
							}).always(function(){
								topic.topicNameInput.prop('disabled', false);
								topic.editButton.html('Edit');
								topic.originalName = topic.topicNameInput.val();
							});
						}
					},
					cancel: function(){
						topic.topicNameInput.val(topic.originalName);
					}
				},
				backgroundDismiss: function(){
					topic.topicNameInput.val(topic.originalName);
				},
			});
		},

		deleteTopic: function() {
			var topic = this;
			$.confirm({
				title: 'Delete Topic',
				type: 'red',
				icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
				theme: 'modern',
				escapeKey: true,
				backgroundDismiss: true,
				animateFromElement : false,
				content: 'Are you sure you want to delete <b>"' + topic.topicNameInput.val() + '"</b>?',
				autoClose: 'cancel|10000',
				buttons: {
					delete: {
						btnClass: 'btn-red',
						action: function(){
							topic.topicNameInput.prop('disabled', true);
							$.ajax({
								method: 'DELETE',
								url: topic.Urls_.DELETE_TOPIC,
								context: topic,
								data: {
									topic_id: topic.topicId,
								},
								success: function(){
									topic.element.fadeOut(config.animtions.medium, function() {
										topic.element.remove();
									});
								}
							});
						}
					},
					cancel: {},
				}
			});
		},

		createEditTopicDOM: function(topicId, originalName){
			var elem = $('<div class="col-12 col-md-6 d-flex mt-2" data-topic-id="' + topicId +'" data-original-topic-name="' + originalName +'"><input class="flex-grow-1" spellcheck="true" name="name" type="text" value="' + originalName +'"><button class="btn ml-1 border border-primary edit-topic" type="submit">Edit</button><button class="btn ml-1 border border-danger delete-topic">Delete</button></div>');
			$("#edit-topic-list").prepend(elem);
			elem.hide(0);
			elem.fadeIn(config.animtions.medium);
			EditTopic.prototype.initAll();
		}
	};

	EditTopic.prototype.init = function () {
		var editTopic = this;
		this.editButton.on('click', $.proxy(this.functions.editTopic, this, editTopic));
		this.deleteButton.on('click', $.proxy(this.functions.deleteTopic, this, editTopic));
	};

	EditTopic.prototype.initAll = function () {
		$(this.Selectors_.EDIT_TOPIC).each(function() {
			this.EditTopic = new EditTopic(this);
		});
	};

	/* ===================================
		4.1 Edit Programmes [Project Admin]
	====================================== */

	/**
	* Class constructor for edit programmes component.
	*/
	var EditProgramme = function EditProgramme(element) {
		this.element = $(element);
		this.originalName = $(element).data("original-programme-name");
		this.programmeId = $(element).data('programme-id');
		this.programmeNameInput = $(element).find('input');
		this.editButton = $(element).find('.edit-programme');
		this.deleteButton = $(element).find('.delete-programme');
		this.init();
	};

	window['EditProgramme'] = EditProgramme;

	EditProgramme.prototype.Selectors_ = {
		EDIT_PROGRAMME: '#edit-programme-list > div',
	};

	EditProgramme.prototype.Urls_ = {
		DELETE_PROGRAMME: 'programmes/',
		PATCH_PROGRAMME: 'programmes/',
		NEW_PROGRAMME: 'programmes/'
	};

	EditProgramme.prototype.functions = {
		EditProgramme: function() {
			var programme = this;
			if(programme.originalName == programme.programmeNameInput.val()){
				return;
			}
			$.confirm({
				title: 'Change Programme Name',
				type: 'blue',
				icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
				theme: 'modern',
				escapeKey: true,
				backgroundDismiss: true,
				animateFromElement : false,
				content: 'Are you sure you want to change the programme name from <b>"' + programme.originalName + '"</b> to <b>"' + programme.programmeNameInput.val() +'"</b>?',
				buttons: {
					confirm: {
						btnClass: 'btn-blue',
						action: function(){
							programme.programmeNameInput.prop('disabled', true);
							programme.editButton.html('<div class="spinner-border text-primary"</div>');

							$.ajax({
								method: 'PATCH',
								url: programme.Urls_.DELETE_PROGRAMME,
								context: programme,
								data: {
									programme_id: programme.programmeId,
									programme_name : programme.programmeNameInput.val()
								},
							}).always(function(){
								programme.programmeNameInput.prop('disabled', false);
								programme.editButton.html('Edit');
								programme.originalName = programme.programmeNameInput.val();
							});
						}
					},
					cancel: function(){
						programme.programmeNameInput.val(programme.originalName);
					}
				},
				backgroundDismiss: function(){
					programme.programmeNameInput.val(programme.originalName);
				},
			});
		},

		deleteProgramme: function() {
			var programme = this;
			$.confirm({
				title: 'Delete Programme',
				type: 'red',
				icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
				theme: 'modern',
				escapeKey: true,
				backgroundDismiss: true,
				animateFromElement : false,
				content: 'Are you sure you want to delete <b>"' + programme.programmeNameInput.val() + '"</b>?',
				autoClose: 'cancel|10000',
				buttons: {
					delete: {
						btnClass: 'btn-red',
						action: function(){
							programme.programmeNameInput.prop('disabled', true);
							$.ajax({
								method: 'DELETE',
								url: programme.Urls_.DELETE_PROGRAMME,
								context: programme,
								data: {
									programme_id: programme.programmeId,
								},
								success: function(){
									programme.element.fadeOut(config.animtions.medium, function() {
										programme.element.remove();
									});
								}
							});
						}
					},
					cancel: {},
				}
			});
		},

		createEditProgrammeDOM: function(programmeId, originalName){
			var elem = $('<div class="col-12 col-md-6 d-flex mt-2" data-programme-id="' + programmeId +'" data-original-programme-name="' + originalName +'"><input class="flex-grow-1" spellcheck="true" name="name" type="text" value="' + originalName +'"><button class="btn ml-1 border border-primary edit-programme" type="submit">Edit</button><button class="btn ml-1 border border-danger delete-programme">Delete</button></div>');
			$("#edit-programme-list").prepend(elem);
			elem.hide(0);
			elem.fadeIn(config.animtions.medium);
			EditProgramme.prototype.initAll();
		}
	};

	EditProgramme.prototype.init = function () {
		var EditProgramme = this;
		this.editButton.on('click', $.proxy(this.functions.EditProgramme, this, EditProgramme));
		this.deleteButton.on('click', $.proxy(this.functions.deleteProgramme, this, EditProgramme));
	};

	EditProgramme.prototype.initAll = function () {
		$(this.Selectors_.EDIT_PROGRAMME).each(function() {
			this.EditProgramme = new EditProgramme(this);
		});
	};

	/* ============================
		5. Second Marker [Assign]
	=============================== */
	var Marker = function Marker() {
		if($("#2nd-marker-student-table").length < 1 || $("#2nd-marker-supervisor-table").length < 1){
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
		ASSIGN_MARKER: 'admin/marker',
	};

	Marker.prototype.selectStudent = function(studentRowDOM, marker){
		var row = $(studentRowDOM);

		marker.unselectAll(marker);
		row.addClass("is-selected");
		marker.selectedStudent = $(row);

		$(marker.supervisorDataTable.bodyRows).each(function() {
			if($(this).data('marker-id') == row.data('supervisor-id')){
				$(this).attr('disabled', true);
			} else {
				$(this).attr('disabled', false);
			}
		});
	}

	Marker.prototype.selectSupervisor = function(supervisorRowDOM, marker){
		var row = $(supervisorRowDOM);

		if(row.attr('disabled')){ return; }

		if(marker.selectedStudent != null){
			row.addClass("is-selected");
			marker.selectedSupervisor = row;
			Marker.prototype.showDialog(
				marker.selectedStudent.data('student-name'),
				marker.selectedStudent.data('supervisor-name'),
				row.data('marker-name'),
				marker.selectedStudent.data('project-title'));
		}
	}

	Marker.prototype.resetView = function(marker){
		$(marker.studentDataTable.bodyRows).removeClass("is-selected");
		$(marker.supervisorDataTable.bodyRows).removeClass("is-selected");
		$(marker.supervisorDataTable.bodyRows).attr("disabled", true);
		marker.selectedStudent = null;
		marker.selectedSupervisor = null;
	}

	Marker.prototype.unselectAll = function(marker){
		$(marker.studentDataTable.bodyRows).removeClass("is-selected");
		$(marker.supervisorDataTable.bodyRows).removeClass("is-selected");
	}

	Marker.prototype.showDialog = function(studentName, supervisorName, markerName, projectTitle){
		$("#student-name").text(studentName);
		$("#supervisor-name").text(supervisorName);
		$("#marker-name").text(markerName);
		$("#project-title").text(projectTitle);

		$("#assign-dialog")[0].dialog.showDialog();
	}

	$('#submitAssignMarker').on('click', function(){
		var marker = window['Marker'];

		if(marker.selectedStudent == null || marker.selectedSupervisor == null){
			$("#assign-dialog")[0].dialog.hideDialog();
			return;
		};

		$("#assign-dialog")[0].dialog.showLoader();

		var projectId = marker.selectedStudent.data('project-id');
		var studentId = marker.selectedStudent.data('student-id');
		var markerId = marker.selectedSupervisor.data('marker-id');

		$.ajax({
			type: "PATCH",
			url: marker.Urls_.ASSIGN_MARKER,
			data: {
				project_id: projectId,
				student_id: studentId,
				marker_id: markerId,
			}
		}).always(function(data){
			$("#assign-dialog")[0].dialog.hideDialog();
			$("#assign-dialog")[0].dialog.hideLoader();
			marker.resetView(marker);
		});
	});

	Marker.prototype.init = function(){
		var marker = this;
		$(marker.studentDataTable.bodyRows).on('click', function() { Marker.prototype.selectStudent(this, marker); });
		$(marker.supervisorDataTable.bodyRows).on('click', function() { Marker.prototype.selectSupervisor(this, marker); });
	}

	Marker.prototype.initAll = function(){
		window['Marker'] = new Marker();
	}


	/* ==========================
		5.1 Second Marker [Swap]
	============================= */
	var Swap = function Swap() {
		if($("#swap-marker-student-table").length < 1){
			return;
		}
		this.projectA = null;
		this.projectB = null;
		this.markerTable = $("#swap-marker-student-table");
		this.markerDataTable = this.markerTable[0].dataTable;
		this.underlay = $('.underlay');
		this.init();
	};

	Swap.prototype.Urls_ = {
		SWAP_MARKER: 'admin/marker/swap',
	};

	Swap.prototype.selectStudent = function(studentRowDOM, swap){
		var row = $(studentRowDOM);

		if(swap.projectA == null){
			row.addClass("is-selected");
			swap.projectA = $(row);
		} else if(swap.projectB == null){
			// If user clicks same project again, reset the view (Unselect all)
			if(row.index() == swap.projectA.index()){
				swap.resetView(swap);
				return;
			}

			if(row.attr('disabled')){ 
				return;
			}

			row.addClass("is-selected");
			swap.projectB = $(row);
		}

		if(swap.projectA != null){
			$(swap.markerDataTable.bodyRows).each(function (index, student){
				if(swap.projectA.index() != index) {			
					debugger;	
					if(swap.projectA.data('supervisor-id') == $(student).data('marker-id') ||
						swap.projectA.data('marker-id') == $(student).data('marker-id') ||
						swap.projectA.data('marker-id') == $(student).data('supervisor-id')
					){
						$(student).attr('disabled', true);
					} else {
						$(student).attr('disabled', false);
					}
				}
			});
		}

		if(swap.projectA != null && swap.projectB != null){
			Swap.prototype.showDialog(
				swap.projectA.data('student-name'),
				swap.projectA.data('marker-name'),
				swap.projectB.data('student-name'),
				swap.projectB.data('marker-name'));
		}
	}

	Swap.prototype.resetView = function(swap){
		$(swap.markerDataTable.bodyRows).removeClass("is-selected");
		$(swap.markerDataTable.bodyRows).attr('disabled', false);
		swap.projectA = null;
		swap.projectB = null;
	}

	Swap.prototype.unselectAll = function(swap){
		$(swap.markerDataTable.bodyRows).removeClass("is-selected");
	}

	Swap.prototype.showDialog = function(projectA_Student, projectA_Marker, projectB_Student, projectB_Marker){
		$("#projectA-name").text(projectA_Student);
		$("#projectA-marker").text(projectA_Marker);

		$("#projectB-name").text(projectB_Student);
		$("#projectB-marker").text(projectB_Marker);
		$("#swap-dialog")[0].dialog.showDialog();
	}

	$('#submitSwapMarker').on('click', function(){
		var swap = window['Swap'];

		if(swap.projectB == null || swap.projectB == null){
			$("#swap-dialog")[0].dialog.hideDialog();
			return;
		};

		$("#swap-dialog")[0].dialog.showLoader();

		$.ajax({
			type: "PATCH",
			url: swap.Urls_.SWAP_MARKER,
			data: {
				projectA: swap.projectA.data('project-id'),
				projectB: swap.projectB.data('project-id'),
			},
			success: function(response){
				if(response.successful){
					// eq.(3) is the marker name
					var markerAName = swap.projectA.find('td').eq(3).text();
					var markerAId = swap.projectA.data('marker-id');

					var markerBName = swap.projectB.find('td').eq(3).text();
					var markerBId = swap.projectA.data('marker-id');

					swap.projectA.find('td').eq(3).text(markerBName);
					swap.projectB.find('td').eq(3).text(markerAName);

					swap.projectA.data('marker-id', markerBId);
					swap.projectB.data('marker-id', markerAId);

					swap.resetView(swap);

					createToast('success', 'Second markers have been swapped.');
				} else {
					createToast('error', 'The selected project(s) could not be found.');
				}
			},
		}).always(function(response){
			$("#swap-dialog")[0].dialog.hideDialog();
			$("#swap-dialog")[0].dialog.hideLoader();
			swap.resetView(swap);
		});
	});

	Swap.prototype.init = function(){
		var swap = this;
		$(swap.markerDataTable.bodyRows).on('click', function() { Swap.prototype.selectStudent(this, swap); });
		$(swap.underlay).on('click', function() { swap.resetView(swap); });
	}

	Swap.prototype.initAll = function(){
		window['Swap'] = new Swap();
	}

	/* ============================
		7. Search
	 ============================== */

	var Search = function Search() {
		if($("#universal-search-input").length < 1){
			return;
		}

		this.SearchInput = $("#universal-search-input");
		this.SearchResults = $("#universal-search-results");
		this.init();
	};

	Search.prototype.Urls_ = {
		SEARCH: 'search',
	};

	Search.prototype.functions = {
		get: function(search, searchTerm) {
			if(searchTerm.length < 2){
				return;
			}

			$.ajax({
				method: 'GET',
				url: search.Urls_.SEARCH,
				data: {
					search_term: searchTerm,
				},
				success: function(response){
					if(response.successful) {
						var html = "";

						$.each(response.results, function(key, value) {
							value = JSON.parse(value);
							html += '<ul class="list-unstyled">';
							html += "<li><b>" + key + "</b></li>";

							if(Array.isArray(value) && value.length > 0) {
								var resultType = key;
								$.each(value, function(innerKey, innerValue) {
									switch(resultType){
										case "projects":
											html += '<li><a class="btn text-primary w-100 text-left" href="' + config.ajaxBaseUrl + 'projects/' + innerValue.id + '">';
											html += innerValue.title;
											html += "</li></a>";
											break;
										case "topics":
											html += '<li><a class="btn text-primary w-100 text-left" href="' + config.ajaxBaseUrl + 'projects/by-topic/' + innerValue.id + '">';
											html += innerValue.name;
											html += "</li></a>";
											break;
									}
									
								});
							} else {
								html += '<li class="text-muted m-2">No results found.</li>';
							}

							html += "</ul>";
						});

						search.SearchResults.html(html);
					}
				}
			});

			search.SearchResults.fadeIn(config.animtions.medium);
		},

		clear: function(search){
			search.SearchResults.fadeOut(config.animtions.medium);
			search.SearchResults.html('');
		}
	}

	Search.prototype.init = function(){
		var search = this;
		$(search.SearchInput).on('keydown change', function() { Search.prototype.functions.get(search, $(this).val()); });
		$('body').on('click', function(e){
			if(e.target != $("#universal-search-results *")){
				 Search.prototype.functions.clear(search);
			}
		});
	}

	Search.prototype.initAll = function(){
		window['Search'] = new Search();
	}


	/* ============================
		7. Forms / AJAX Functions
	   ============================ */

	/**
	* Class constructor for ajax functions.
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
		LOG_IN_DIALOG: '.login.dialog',
		LOG_IN_FORM: '#loginForm',
	};

	AjaxFunctions.prototype.Keys_ = {
		SPACE: 32,
		ENTER: 13,
		COMMA: 45
	};

	// Project page search focus
	$(AjaxFunctions.prototype.Selectors_.SEARCH_INPUT).on('focus', function(e){
		$(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER).removeClass('shadow-sm');
		$(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER).addClass('shadow');
	});

	// Project page search focus out
	$(AjaxFunctions.prototype.Selectors_.SEARCH_INPUT).on('focusout', function(e){
		$(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER).removeClass('shadow');
		$(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER).addClass('shadow-sm');
	});

	// SEARCH
	$(AjaxFunctions.prototype.Selectors_.SEARCH_FILTER_BUTTON).on('click', function() {
		var container = $(AjaxFunctions.prototype.Selectors_.SEARCH_FILTER_CONTAINER);
		var filterButton = $(this);

		if(container.hasClass('active')){
			container.removeClass('active');
			filterButton.removeClass('active');
			filterButton.blur();
		} else{
			container.addClass('active');
			filterButton.addClass('active');
		}
	});

	// Initialise all components
	MobileMenu.prototype.initAll();
	Dialog.prototype.initAll();
	DataTable.prototype.initAll();
	ColumnToggleTable.prototype.initAll();
	EditTopic.prototype.initAll();
	EditProgramme.prototype.initAll();
	Marker.prototype.initAll();
	Swap.prototype.initAll();
	Search.prototype.initAll();

	if(window["showLoginDialog"] == true){
		window["loginDialog"].showDialog();
		$("#redirect-block p").text(window["redirectUrl"]);
		$("#redirect-block").show();
	}

});
