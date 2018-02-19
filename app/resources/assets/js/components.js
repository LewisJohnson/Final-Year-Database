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
	var MobileMenu =  function MobileMenu(element) {
		if(window['MobileMenu'] == null){
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
	};

	MobileMenu.prototype.initAll = function () {
		$(this.Selectors_.MOBILE_MENU).each(function() {
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
		LOADER: '<div class="loader" style="width: 100px; height: 100px;top: 25%;"></div>',
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
		this.loader.show(0);
		this.content.hide(0);
	};

	Dialog.prototype.hideLoader = function(){
		this.loader.hide(0);
		this.content.show(0);
	};

	Dialog.prototype.showDialog = function(){
		this.element.attr("aria-hidden", "false");
		this.underlay.addClass(this.CssClasses_.ACTIVE);
		this.underlay.data("owner", this.dialogName);
		this.element.addClass(this.CssClasses_.ACTIVE);
		window['Dialog'] = this;
		window['MobileMenu'].closeMenu();
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
		$('button').each(function() {
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

		toggleColumn: function(columnIndex, table, checked) {
			if(checked){
				table.head.children().eq(columnIndex).removeAttr('hidden');
				table.head.children().eq(columnIndex).show();
			} else {
				table.head.children().eq(columnIndex).attr('hidden', "true");
				table.head.children().eq(columnIndex).hide();
			}

			table.bodyRows.each(function(){
				if(checked){
					$(this).children().eq(columnIndex).show();
				} else {
					$(this).children().eq(columnIndex).hide();
				}
			});
		},

		refresh: function(table) {
			var hideIndices = [];

			table.bodyRows = table.element.find('tbody tr');

			table.headers.each(function(){
				if($(this).attr('hidden')){
					hideIndices.push($(this).index());
				}
			});

			table.bodyRows.each(function(){
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

		if(!this.element.attr('id')){
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

		this.headers.each(function (){
			var checked = $(this).data("default") ? "checked" : "";
			$(this).data('visible', $(this).data("default"));

			columnSelectorMenu.append('\
				<li class="dot-menu__item dot-menu__item--padded"> \
					<div class="checkbox"> \
						<input class="column-toggle" id="column-' + $(this).text() + '" type="checkbox" '+ checked +'> \
						<label for="column-' + $(this).text() + '">' + $(this).text() + '</label> \
					</div> \
				</li>');
		});

		$("body").on("change", ".column-toggle", function(){
			var index = $('.column-toggle').index(this);
			ColumnToggleTable.prototype.functions.toggleColumn(index, toggleTable, $(this).prop('checked'));
		});
	};

	ColumnToggleTable.prototype.initAll = function () {
		$(this.Selectors_.TOGGLE_TABLE).each(function() {
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
	var AjaxFunctions =  function AjaxFunctions() {};
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
	};

	AjaxFunctions.prototype.Keys_ = {
		SPACE: 32,
		ENTER: 13,
		COMMA: 45
	};

	// Project page search focus
	$(AjaxFunctions.prototype.Selectors_.SEARCH_INPUT).on('focus',  function(e){
		removeAllShadowClasses(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER);
		$(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER).addClass('shadow-focus');
	});

	// Project page search focus out
	$(AjaxFunctions.prototype.Selectors_.SEARCH_INPUT).on('focusout',  function(e){
		removeAllShadowClasses(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER);
		$(AjaxFunctions.prototype.Selectors_.SEARCH_CONTAINER).addClass('shadow-2dp');
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
		EDIT_TOPIC: '.edit-topic-list .topic',
	};

	EditTopic.prototype.Urls_ = {
		DELETE_TOPIC: '/topics/',
		PATCH_TOPIC: '/topics/',
		NEW_TOPIC: '/topics/'
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
				content: 'Are you sure you want to change the topic name from <b>"' +  topic.originalName + '"</b> to <b>"' +  topic.topicNameInput.val() +'"</b>?',
				buttons: {
					confirm: {
						btnClass: 'btn-blue',
						action: function(){
							topic.topicNameInput.prop('disabled', true);
							topic.editButton.html('<div class="loader"></div>');
							$('.loader', topic.element).css('display', 'block');

							$.ajax({
								method: 'PATCH',
								url: topic.Urls_.DELETE_TOPIC,
								context: topic,
								data: {
									topic_id: topic.topicId,
									topic_name : topic.topicNameInput.val()
								},
							}).done(function(){
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
				title: 'Delete',
				type: 'red',
				icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',
				theme: 'modern',
				escapeKey: true,
				backgroundDismiss: true,
				animateFromElement : false,
				content: 'Are you sure you want to delete <b>"' +  topic.topicNameInput.val() + '"</b>?',
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
									topic.element.hide(config.animtions.slow, function() {
										topic.remove();
									});
								}
							});
						}
					}
				}
			});
		},

		createEditTopicDOM: function(topicId, originalName){
			$(".edit-topic-list").prepend('<li class="topic" data-topic-id="' + topicId +'" data-original-topic-name="' + originalName +'"><input spellcheck="true" name="name" type="text" value="' + originalName +'"><button class="button edit-topic" type="submit">Edit</button><button class="button delete-topic button--danger">Delete</button></li>');
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
		IS_VISIBLE: '.is-visible',
	};

	DotMenu.prototype.CssClasses_ = {
		IS_VISIBLE: 'is-visible',
		BOTTOM_LEFT: 'dot-menu--bottom-left',
		BOTTOM_RIGHT: 'dot-menu--bottom-right',
		TOP_LEFT: 'dot-menu--top-left',
		TOP_RIGHT: 'dot-menu--top-right',
		TABLE_DOT_MENU: 'dot-menu--table'
	};

	DotMenu.prototype.positionMenu = function(){
		var buttonRect = this.button[0].getBoundingClientRect();

		if(this.menu.hasClass(this.CssClasses_.BOTTOM_LEFT)){
			this.menu.css('top', buttonRect.bottom);
			this.menu.css('left', buttonRect.left - parseInt(this.button.css('width'), 10));
			this.menu.css('transform-origin', 'top right');
		} else if(this.menu.hasClass(this.CssClasses_.BOTTOM_RIGHT)){
			this.menu.css('top', buttonRect.bottom);
			this.menu.css('left', buttonRect.left - 120);
			this.menu.css('transform-origin', 'top left');
		} else if(this.menu.hasClass(this.CssClasses_.TOP_LEFT)){
			this.menu.css('top', buttonRect.top - 150);
			this.menu.css('left', buttonRect.right - parseInt(this.button.css('width'), 10));
			this.menu.css('transform-origin', 'bottom right');
		} else if(this.menu.hasClass(this.CssClasses_.TOP_RIGHT)){
			this.menu.css('top', buttonRect.top - 150);
			this.menu.css('left', buttonRect.left - 120);
			this.menu.css('transform-origin', 'bottom left');
		} else {
			this.menu.css('top', buttonRect.bottom);
			this.menu.css('transform-origin', 'top');
		}
	}

	DotMenu.prototype.show = function(){
		DotMenu.prototype.positionMenu.bind(this)();
		this.menu.addClass(DotMenu.prototype.CssClasses_.IS_VISIBLE);
		this.menu.show();
	}

	DotMenu.prototype.hide = function(){
		this.menu.removeClass(DotMenu.prototype.CssClasses_.IS_VISIBLE);
		this.menu.hide();
	}

	DotMenu.prototype.toggle = function(){
		if(this.menu.hasClass(DotMenu.prototype.CssClasses_.IS_VISIBLE)){
			DotMenu.prototype.hide.bind(this)();
		} else {
			DotMenu.prototype.show.bind(this)();
		}
	}

	DotMenu.prototype.init = function () {
		var dotMenu = this;
		var menuId = $(this.button).attr('id') + '-menu';

		this.menu = $('#' + menuId);
		this.isTableDotMenu = this.menu.hasClass(DotMenu.prototype.CssClasses_.TABLE_DOT_MENU);

		this.button.on('click', function(e) {
			e.stopPropagation();
			DotMenu.prototype.toggle.bind(dotMenu)();
		});

		$(document).on('scroll', function(e) {
			if(dotMenu.menu.hasClass(DotMenu.prototype.CssClasses_.IS_VISIBLE)){
				DotMenu.prototype.positionMenu.bind(dotMenu)();
			}
		});

		$(window).on('resize', function(e) {
			if(dotMenu.menu.hasClass(DotMenu.prototype.CssClasses_.IS_VISIBLE)){
				DotMenu.prototype.positionMenu.bind(dotMenu)();
			}
		});

		$(document).on('click', function(e) {
			var target = $(e.target);
			if(!target.is(dotMenu.menu) || !target.is(dotMenu.button)) {
				if(!$.contains($(dotMenu.menu)[0], e.target)){
					DotMenu.prototype.hide.bind(dotMenu)();
				}
			}
		});
	};

	DotMenu.prototype.initAll = function() {
		$(this.Selectors_.ACTIVATOR).each(function() {
			this.DotMenu = new DotMenu(this);
		});
	};

	/* ==================
		5. Second Marker
	   ================== */

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
		ASSIGN_MARKER: '/admin/marker-assign',
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

		if(row.attr('disabled')){return;}

		if(marker.selectedStudent != null){
			row.addClass("is-selected");
			marker.selectedSupervisor = row;
			Marker.prototype.showDialog(
				marker.selectedStudent.data('student-name'),
				marker.selectedStudent.data('supervisor-name'),
				row.data('marker-name'),
				marker.selectedStudent.data('project'));
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

	Marker.prototype.showDialog = function(studentName, supervisorName, markerName, project){
		$("#student-name").text(studentName);
		$("#supervisor-name").text(supervisorName);
		$("#marker-name").text(markerName);

		$("#project-title").html('<b>Title: </b>' + project['title']);
		$("#project-description").html('<b>Description: </b>' + project['description']);

		$("#assign-dialog")[0].dialog.showDialog();
	}

	$('#submitAssignMarker').on('click', function(){
		var marker = window['Marker'];

		if(marker.selectedStudent == null || marker.selectedSupervisor == null){
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
				marker_id: markerId,

			},
			success: function(data){

			},
		}).done(function(data){
			$("#assign-dialog")[0].dialog.hideDialog();
			$("#assign-dialog")[0].dialog.hideLoader();
			marker.selectedStudent.remove();
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

	MobileMenu.prototype.initAll();
	Dialog.prototype.initAll();
	DataTable.prototype.initAll();
	ColumnToggleTable.prototype.initAll();
	EditTopic.prototype.initAll();
	Marker.prototype.initAll();
	DotMenu.prototype.initAll();
});