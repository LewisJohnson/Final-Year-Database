import {Swappable} from '@shopify/draggable';

$(function() {
"use strict";

/* FILE STRUCTURE

1. AJAX Setup
2. HTML Modifications
3. Helper Functions
4. Components
	4.1 Mobile Menu
	4.2 Dialog / Modal
	4.3 Data Table
	4.4 Project Topics [Supervisor]
	4.5 Forms / AJAX Functions
	4.6 Edit Topics [Admin]
5. Second Marker
6. Dynamic Pagination
7. Supervisor
8. Other
9. Initialise Everything
*/

/* ================
	1. AJAX Setup
   ================ */
$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
	}
});

/* ========================
	2. HTML Modifications
   ======================== */
$('body').append('<div class="underlay"></div>');

/* ======================
	3. Helpers Functions
   ====================== */
function removeAllShadowClasses(element){
	$(element).removeClass (function (index, className) {
		return (className.match (/\bshadow\-\S+/g) || []).join(' ');
	});
}

/* ===============
	4. Components
   =============== */

/* ==================
	 4.1 Mobile Menu
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
	}
};

MobileMenu.prototype.CssClasses_ = {
	VISIBLE: 'is-visible'
};

MobileMenu.prototype.Selectors_ = {
	MOBILE_MENU: 'nav.mobile',
	HAMBURGER_CONTAINER: '.hamburger-container',
	UNDERLAY: '.mobile-nav-underlay'
};

MobileMenu.prototype.openMenu = function (){
	this.activator.attr("aria-expanded", "true");
	this.element.addClass(this.CssClasses_.VISIBLE);

	this.underlay.attr("aria-hidden", "false");
	this.underlay.addClass(this.CssClasses_.VISIBLE);
};

MobileMenu.prototype.closeMenu = function (){
	this.activator.attr("aria-expanded", "false");
	this.element.removeClass(this.CssClasses_.VISIBLE);

	this.underlay.attr("aria-hidden", "true");
	this.underlay.removeClass(this.CssClasses_.VISIBLE);
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
	4.2 Dialog / Modal
   ==================== */
var Dialog = function Dialog(element) {
	this.element = $(element);
	this.dialogName = $(element).data('dialog');
	this.underlay = $('.underlay');
	this.header = $(element).find(this.Selectors_.DIALOG_HEADER);
	this.content = $(element).find(this.Selectors_.DIALOG_CONTENT);
	this.content.before(this.HtmlSnippets_.LOADER);
	this.loader = $(element).find(".loader");
	this.isClosable = true;
	this.activatorButtons = [];
	this.init();
};

window['Dialog'] = Dialog;

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

	// Add seperator after header
	dialog.header.append('<hr>');

	// For disabilty
	dialog.element.attr("aria-hidden", "true");

	// Set underlay
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

/* ================
	4.3 Data Table
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

	$(this.headers).each(function(i) {
		$(this).css("cursor", "pointer");
	});
};

DataTable.prototype.initAll = function () {
	$(this.Selectors_.DATA_TABLE).each(function() {
		this.dataTable = new DataTable(this);
	});
};

/* =================================
	4.4 Project Topics [Supervisor]
   ================================= */

/**
* Class constructor for project topics.
*
* @param {HTMLElement} element The element that will be upgraded.
*/
var ProjectTopics =  function ProjectTopics() {};
window['ProjectTopics'] = ProjectTopics;

ProjectTopics.prototype.CssClasses_ = {
	DATA_TABLE: 'data-table',
	IS_SELECTED: 'is-selected'
};

ProjectTopics.prototype.Selectors_ = {
	ADD_TOPIC_INPUT: '#addTopicInput',
	NEW_TOPIC_INPUT_CONTAINER: '#new-topic-input-container',
};

ProjectTopics.prototype.Keys_ = {
	SPACE: 32,
	ENTER: 13,
	COMMA: 45
};

var projectTopics = new ProjectTopics();

ProjectTopics.prototype.functions = {
	addTopicToProject: function (projectId, topicName) {
		$('.loader').show(0);
		var ajaxUrl = "/projects/topic-add";
		$.ajax({
			type: "POST",
			url: ajaxUrl,
			data: {
				topic_name: topicName,
				project_id: projectId
			},
			success: function(data){
				data = JSON.parse(data);
				$(projectTopics.Selectors_.ADD_TOPIC_INPUT).val('');
				$(".topics-list.edit li.topic:last").after('<li class="topic" data-topic-id="' + data["id"] + '"><button type="button" class="topic-remove">X</button><p class="topic-name">' + data["name"] + '</p></li>');
			}
		}).done(function(data){
			$('body').append(data);
			$('.loader').hide(0);
		});
	},

	removeTopicFromProject: function (projectId, topicId) {
		$('.loader').show(0);
		var ajaxUrl = "/projects/topic-remove";
		$.ajax({
			type: "DELETE",
			url: ajaxUrl,
			data: {
				topic_id : topicId,
				project_id: projectId
			},
			success: function(){
				$('.topics-list.edit li.topic').each(function(i, obj) {
					if($(this).data('topic-id') == topicId){
						$(this).remove();
					}
				});
			},
		}).done(function(){
			$('.loader').hide(0);
		});
	},

	updateProjectPrimaryTopic: function (projectId, topicId) {
		$('.loader').show(0);
		var ajaxUrl = "/projects/topic-update-primary";
		$.ajax({
			type: "PATCH",
			url: ajaxUrl,
			data: {
				topic_id : topicId,
				project_id: projectId
			},
			success: function(){
				$('#editProjectForm').attr('data-project-id', topicId);
				$('.topics-list.edit li.topic').each(function(i, obj) {
					if($(this).data('topic-id') == topicId){
						$(this).addClass("first");
					} else {
						$(this).removeClass("first");
					}
				});
			},
		}).done(function(){
			$('.loader').hide(0);
		});
	},
};

const swappable = new Swappable(document.querySelectorAll('.topics-list.edit'), {
	draggable: '.topic',
});

swappable.on('swappable:swapped', function(){
	var projectId = $('#editProjectForm').data('project-id');
	var originalPrimaryTopicId = $('#editProjectForm').data('primary-topic-id');
	var topicId = $(".topics-list.edit li:first-child").data('topic-id');
	if(topicId != originalPrimaryTopicId){
		projectTopics.functions.updateProjectPrimaryTopic(projectId, topicId);
	}
});

// Add new topic
$(projectTopics.Selectors_.ADD_TOPIC_INPUT).keypress(function(e) {
	if (e.which == projectTopics.Keys_.ENTER) {
		var projectId = $("#editProjectForm").data('project-id');
		projectTopics.functions.addTopicToProject(projectId, $(this).val());
	}
});

// Remove topic
$('.topics-list.edit').on('click', '.topic .topic-remove', function(){
	var projectId = $("#editProjectForm").data('project-id');
	var topicId = $(this).parent('li').data('topic-id');
	projectTopics.functions.removeTopicFromProject(projectId, topicId);
});

$(projectTopics.Selectors_.NEW_TOPIC_INPUT_CONTAINER).on('click', function() {
	$(projectTopics.Selectors_.ADD_TOPIC_INPUT).focus();
});

/* ============================
	4.5 Forms / AJAX Functions
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
	CHANGE_AUTH_DIALOG: '.change-auth.dialog'
};

AjaxFunctions.prototype.Keys_ = {
	SPACE: 32,
	ENTER: 13,
	COMMA: 45
};

AjaxFunctions.prototype.functions = {
	deleteProject: function (projectName) {
		if(confirm("Are you sure you want to delete \"" + projectName +"\"?")){
			$.ajax({
				type: "DELETE",
				url: "edit",
				success: function(url){
					window.location.href = "../";
				}
			});
		}
		else{
			return false;
		}
	}
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
	} else{
		container.addClass('active');
		filterButton.addClass('active');
	}
});

/* ========================
   4.6 Edit Topics [Admin]
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

EditTopic.prototype.CssClasses_ = {};

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
		var response = confirm("Are you sure you want to change the topic name from \"" +  this.originalName +"\" to \"" +  this.topicNameInput.val() +"\"?");

		if(response){
			this.topicNameInput.prop('disabled', true);
			this.editButton.html('<div class="loader"></div>');
			$('.loader', this.element).css('display', 'block');

			$.ajax({
				method: 'PATCH',
				url: this.Urls_.DELETE_TOPIC,
				context: this,
				data: {
					topic_id: this.topicId,
					topic_name : this.topicNameInput.val()
				},
			}).done(function(){
				this.topicNameInput.prop('disabled', false);
				this.editButton.html('Edit');
				this.originalName = this.topicNameInput.val();
			});
		} else {
			this.topicNameInput.val(this.originalName);
		}
	},

	deleteTopic: function() {
		var response = confirm("Are you sure you want to delete the topic \"" +  this.originalName +"\"?");
		if(response){
			this.topicNameInput.prop('disabled', true);
			$.ajax({
				method: 'DELETE',
				url: this.Urls_.DELETE_TOPIC,
				context: this,
				data: {
					topic_id: this.topicId,
				},
				success: function(){
					this.element.hide(400, function() {
						this.remove();
					});
				}
			});
		}
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

Marker.prototype.init = function(){
	var marker = this;

	$(marker.studentDataTable.bodyRows).on('click', function() {
		Marker.prototype.selectStudent(this, marker);
	});

	$(marker.supervisorDataTable.bodyRows).on('click', function() {
		Marker.prototype.selectSupervisor(this, marker);
	});
}

Marker.prototype.initAll = function(){
	window['Marker'] = new Marker();
}

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

	$("#project-title").html('<b>Title: </b>' + project["title"]);
	$("#project-description").html('<b>Description: </b>' + project["description"]);

	$("#assign-dialog")[0].dialog.showDialog();
}

$('#submitAssignMarker').on('click', function(){
	var marker = window['Marker'];

	if(marker.selectedStudent == null || marker.selectedSupervisor == null){
		$("#assign-dialog")[0].dialog.hideDialog();
		return;
	};

	$("#assign-dialog")[0].dialog.showLoader();

	var projectId = marker.selectedStudent.data('project')["id"];
	var markerId = marker.selectedSupervisor.data('marker-id');
	var ajaxUrl = "/projects/marker-assign";

	$.ajax({
		type: "PATCH",
		url: ajaxUrl,
		data: {
			project_id: projectId,
			marker_id: markerId
		},
		success: function(data){

		},
		// Add fail
	}).done(function(data){
		$("#assign-dialog")[0].dialog.hideDialog();
		$("#assign-dialog")[0].dialog.hideLoader();
		marker.selectedStudent.remove();
		marker.resetView(marker);
	});
});


/* =========================
	6. Dynamic Pagination
   ========================= */
var projects_pageNumber = 2,
	projects_endOfTable = false,
	projects_awaitingResponse = false;

$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == $(document).height()) {

		if(!$('#project-table').hasClass("index")){
			return;
		}

		if(!projects_endOfTable && !projects_awaitingResponse){
			$(".loader.projects").show();
			projects_awaitingResponse = true;
			var urlPath = "/projects?partial=true?page=" + projects_pageNumber;
			$.ajax({
				type : 'GET',
				url: urlPath,
				success : function(data){
					$(".loader.projects").hide();
					if(data.length == 0){
						projects_endOfTable = true;
						$('#project-table').after('<div style="width: 10px;height: 10px;margin: 1rem auto;background: rgba(0, 0, 0, 0.07);border: 1px solid rgba(0, 0, 0, 0.11);border-radius: 90px;"></div>');
					}else{
						$('#project-table tbody').append($(data));
						window.history.replaceState("", "", "/projects?page=" + projects_pageNumber);
					}
					projects_pageNumber += 1;
				},
				error: function(data){
					$('#project-table').after('<p style="margin:1rem auto;text-align:center;color:#e00;">There\'s a problem reaching the server.</p>');
					projects_awaitingResponse = false;
					$(".loader.projects").hide();
				}
			}).done(function(data){
				projects_awaitingResponse = false;
				$(".loader.projects").hide();
			});
		} else {
			$(".loader.projects").hide();
		}
	}
});

var agents_pageNumber = 2,
	agents_endOfTable = false,
	agents_awaitingResponse = false;

$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == $(document).height()) {

		if(!$('#user-agent-table')){
			return;
		}

		if(!agents_endOfTable && !agents_awaitingResponse){
			$(".loader.user-agent").show();
			agents_awaitingResponse = true;
			var urlPath = "/system/user-agent?partial=true?page=" + agents_pageNumber;
			$.ajax({
				type : 'GET',
				url: urlPath,
				success : function(data){
					$(".loader.user-agent").hide();

					if(data.length == 0){
						agents_endOfTable = true;
						$('#user-agent-table').after('<div style="width: 10px;height: 10px;margin: 1rem auto;background: rgba(0, 0, 0, 0.07);border: 1px solid rgba(0, 0, 0, 0.11);border-radius: 90px;"></div>');
					}else{
						$('#user-agent-table tbody').append($(data));
						window.history.replaceState("", "", "/system/user-agent?page=" + agents_pageNumber);
					}

					agents_pageNumber += 1;
				},
				error: function(data){
					$('#user-agent-table').after('<p style="margin:1rem auto;text-align:center;color:#e00;">There\'s a problem reaching the server.</p>');
					agents_awaitingResponse = false;
				}
			}).done(function(data){
				agents_awaitingResponse = false;
				$(".loader.user-agent").hide();
			});
		} else {
			$(".loader.user-agent").hide();
		}
	}
});

/* ======================
	 7. SUPERVISOR
   ====================== */

// Accept Student
$('.supervisor-table .offer-action').on('click', function() {
	var actionButton = $(this);
	var actionType = actionButton.data('action-type');
	var tableRow = actionButton.parents().eq(1);
	var student_id = tableRow.data('student-id');

	actionButton.html('<div class="loader"></div>');
	$('.loader', actionButton).css('display', 'block');

	if(actionType === "accept"){
		var ajaxUrl = '/supervisor/student-accept';
	} else if (actionType === "reject"){
		var ajaxUrl = '/supervisor/student-reject';
	}

	if(ajaxUrl == null){
		console.log("Invalid supervisor action.");
		return;
	}

	$.ajax({
		method: 'POST',
		url: ajaxUrl,
		data: {
			student_id : student_id
		},
		success: function(data){
			tableRow.hide(400, function() {
				tableRow.remove();
			});
			if(actionType === "accept"){
				showNotification('', 'Student has been accepted.');
				// todo: add to thingy to table
				// todo: maybe php that refreshes table instead
				// $("#supervisor-accepted-students-table tbody").prepend();
			} else if (actionType === "reject"){
				showNotification('', 'Student has been rejected.');
			}
		},
		error: function() {
			actionButton.html(actionType);
		}
	});
});

$('#deleteProjectButton').on('click', function() {
	AjaxFunctions.prototype.deleteProject($('#title').val());
});


$('#student-edit-list').find('.checkbox input').on('change', function() {
	var status = $(this).parents().eq(3).data('status');
	var emailString = "mailto:";
	var checkboxSelector = '#student-edit-list.' + status + ' .checkbox input';
	var emailButtonselector = ".email-selected." + status;
	$(checkboxSelector).each(function() {
		if($(this).is(":checked")) {
			emailString += $(this).parent().parent().data('email');
			emailString += ",";
		}
	});
	$(emailButtonselector).prop('href', emailString);
});

$('.edit-student-list .email-selected').on('click', function(e) {
	if($(this).prop('href') === 'mailto:'){
		alert("You haven't selected anyone.");
		e.preventDefault();
	}
});

/* ======================
	 8. OTHER
   ====================== */
$('.show-more').on('click',  function(e) {
	$(this).hide();
	$('.project').addClass('expand');
});

// Makes primary topic first
$(".topics-list").prepend($(".first"));

// SUPERVISOR
$("#loginForm").on('submit', function(e){
	e.preventDefault();

	$('.help-block', '#loginForm').css("display", "none");
	$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.showLoader();

	$.ajax({
		url: $(this).prop('action'),
		type:'POST',
		data: $(this).serialize(),
		success:function(showDialog){
			if(showDialog == "true"){
				$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideDialog();
				$(AjaxFunctions.prototype.Selectors_.CHANGE_AUTH_DIALOG)[0].dialog.isClosable = false;
				$(AjaxFunctions.prototype.Selectors_.CHANGE_AUTH_DIALOG)[0].dialog.showDialog();
			} else {
				location.reload();
			}

		},
		error: function (data) {
			$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.showDialog();
			$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideLoader();

			$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).text(data["responseJSON"]["errors"]["username"][0]);
			$('.help-block', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).show();
			$('.form-field', AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).addClass("has-error");
		}
	});
});

$('#new-topic-form').on('submit', function(e) {
	e.preventDefault();
	var submitButton = $(this).find(':submit');
	submitButton.html('<div class="loader"></div>');
	$('.loader', submitButton).css('display', 'block');

	$.ajax({
		url: $(this).prop('action'),
		type:'POST',
		context: $(this),
		data: $(this).serialize(),
		success:function(data){
			data = JSON.parse(data);
			EditTopic.prototype.functions.createEditTopicDOM(data["id"], data["name"]);
			},
		error: function () {}
	}).done(function(){
		$(this).find('input').val('');
		$(this).find(':submit').html('Add');
	});
});

// Used for transactions
$('#show-raw-table-data').on('click', function() {
	if($(this).prop('checked')){
		$('table.full-detail').hide();
		$('table.raw-detail').show();
	} else {
		$('table.full-detail').show();
		$('table.raw-detail').hide();
	}
});

// NEW USER
// put this stuff in an array
$('#admin-form').hide();
$('#supervisor-form').hide();
$('#student-form').show();
$('#create-form-access-select').on('change', function(){
	if($('#student-option').is(":selected")) {
		$('#student-form').show();
	} else {
		$('#student-form').hide();
	}
	if($('#supervisor-option').is(":selected")) {
		$('#supervisor-form').show();
	} else {
		$('#supervisor-form').hide();
	}
	if($('#admin-option').is(":selected")) {
		$('#admin-form').show();
	} else {
		$('#admin-form').hide();
	}
});

// STRINGS
$('#admin-form').hide();
$('#supervisor-form').hide();
$('#student-form').show();
$('#create-form-access-select').on('change', function(){
	if($('#student-option').is(":selected")) {
		$('#student-form').show();
	} else {
		$('#student-form').hide();
	}
	if($('#supervisor-option').is(":selected")) {
		$('#supervisor-form').show();
	} else {
		$('#supervisor-form').hide();
	}
	if($('#admin-option').is(":selected")) {
		$('#admin-form').show();
	} else {
		$('#admin-form').hide();
	}
});


/* ===============
	9. Initialise
   =============== */
MobileMenu.prototype.initAll();
Dialog.prototype.initAll();
DataTable.prototype.initAll();
EditTopic.prototype.initAll();
Marker.prototype.initAll();

// END OF FILE
});

$(document).ajaxError(function( event, request, settings ) {
	showNotification('error', 'Something went wrong with that request.');
});

function showNotification(type, message){
	var notification = $('.notification');
	notification.addClass(type);
	$(notification).html("<p>" + message + "</p>");
	notification.show();

	setTimeout(function() {
		notification.hide(0);
	}, 3000);
}
