
import {Swappable} from '@shopify/draggable';

$(function() {
"use strict";

// Adds token to all AJAX calls
$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
});

// Adds global underlay
$('body').append('<div class="underlay"></div>');

// Functions
function sortTable(table, col, reverse) {
	var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
		tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
		i;
	reverse = -((+reverse) || -1);
	tr = tr.sort(function (a, b) { // sort rows
		return reverse // `-1 *` if want opposite order
			* (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
				.localeCompare(b.cells[col].textContent.trim())
			);
	});
	for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}

function makeSortable(table) {
	var th = table.tHead, i;
	th && (th = th.rows[0]) && (th = th.cells);
	if (th) i = th.length;
	else return; // if no `<thead>` then do nothing
	while (--i >= 0) (function (i) {
		var dir = 1;
		th[i].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir))});
	}(i));
}

function makeAllSortable(parent) {
	parent = parent || document.body;
	var t = parent.getElementsByTagName('table'), i = t.length;
	while (--i >= 0) makeSortable(t[i]);
}

var Dialog = function Dialog(element) {
	this.element = $(element);
	this.dialogName = $(element).data('dialog');
	this.underlay = $('.underlay');
	this.header = $(element).find(this.Selectors_.DIALOG_HEADER);
	this.content = $(element).find(this.Selectors_.DIALOG_CONTENT);
	this.loader = this.content.prepend('<div class="loader" style="width: 75px; height: 75px;"></div>');
	this.isClosable = true;
	this.activatorButtons = [];
	this.isActive = $();
	this.init();
	
};

window['Dialog'] = Dialog;

Dialog.prototype.CssClasses_ = {
	ACTIVE: 'active',
};

Dialog.prototype.Selectors_ = {
	DIALOG: '.dialog',
	DIALOG_HEADER: '.header',
	DIALOG_CONTENT: '.content',
};

Dialog.prototype.functions = {
	hideDialog: function() {
		if(this.isClosable){
			this.element.attr("aria-hidden", "true");
			this.underlay.removeClass(this.CssClasses_.ACTIVE);
			this.element.removeClass(this.CssClasses_.ACTIVE);
			this.isActive = false;
		}
	},
	showDialog: function() {
		this.element.attr("aria-hidden", "false");
		this.underlay.addClass(this.CssClasses_.ACTIVE);
		this.element.addClass(this.CssClasses_.ACTIVE);
		this.isActive = true;

		// Replace this
		$('.mobile-nav-underlay').attr("aria-hidden", "true");
		$('.hamburger-container').attr("aria-expanded", "false");
		$('nav.mobile').removeClass("is-visible");
		$('.mobile-nav-underlay').removeClass("is-visible");
	},
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
	this.header.append('<hr>');

	// For disabilty
	this.element.attr("aria-hidden", "true");

	// Set underlay
	this.underlay.on('click', $.proxy(this.functions.hideDialog, dialog));

	try{
		$(dialog.activatorButtons).each(function() {
			$(this).on('click', $.proxy(dialog.functions.showDialog, dialog));
		});
	} catch(err){
		console.error("Dialog " + dialog.dialogName + " has no activator button.");
		console.error(err);
	}
};

Dialog.prototype.initAll = function(){
	$(this.Selectors_.DIALOG).each(function() {
		var dialog = new Dialog(this);
		this.dialog = dialog;
		console.log($(this));
	});
};

/* DATA TABLE */

var DataTable = function DataTable(element) {
	this.element = $(element);
	this.headers = $('thead tr th');
	this.bodyRows = $('tbody tr');
	this.footRows = $('tfoot tr');
	this.rows = $.merge(this.bodyRows, this.footRows);
	this.checkboxes = $(this.Selectors_.CHECKBOX);
	this.masterCheckbox = $(this.Selectors_.MASTERCHECKBOX);
	this.sortDirection = "asc";
	this.init();
};

window['DataTable'] = DataTable;

DataTable.prototype.CssClasses_ = {
	DATATABLE: 'data-table',
	IS_SELECTED: 'is-selected'
};

DataTable.prototype.Selectors_ = {
	DATATABLE: '.data-table',
	MASTERCHECKBOX: 'thead .master-checkbox',
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
	},
	sortTable: function(sortNumber, dataTable) {

	}
};

DataTable.prototype.init = function () {
	var dt = this;
	this.masterCheckbox.on('change', $.proxy(this.functions.selectAllRows, dt));


	var dt = this;

	$(this.checkboxes).each(function(i) {
		$(this).on('change', $.proxy(dt.functions.selectRow, this, $(this), dt.bodyRows.eq(i)));
	});

	$(this.headers).each(function(i) {
		$(this).css("cursor", "pointer");
	// 	// $(this).on('click', $.proxy(dt.functions.sortTable, this, j, dt));
		
	});
};

DataTable.prototype.initAll = function () {
	$(this.Selectors_.DATATABLE).each(function() {
		$(this).DataTable = new DataTable(this);
	});
};

DataTable.prototype.initAll();


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
	updateProjectPrimaryTopic: function(projectId, topicId){
		$('.loader').show(0);
		var ajaxUrl = "/projects/updatePrimaryTopic";
		$.ajax({
			type: "PATCH",
			url: ajaxUrl,
			data: {
				topic_id: topicId, 
				project_id: projectId
			},
		}).done(function(){
			$('.loader').hide(0);
		});;
	},

	addTopicToProject: function (projectId, topicName) {
		$('.loader').show(0);
		var ajaxUrl = "/projects/addTopic";
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
		var ajaxUrl = "/projects/removeTopic";
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
		});;
	}
}

const swappable = new Swappable(document.querySelectorAll('ul'), {
  draggable: '.topic',
});

swappable.on('swappable:swapped', function(){
	var projectId = $('#editProjectForm').data('project-id');
	projectTopics.functions.updateProjectPrimaryTopic(projectId, $(".topics-list.edit li:first-child").data('topic-id'));
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

$("#editProjectForm").on('submit', function(e){
	e.preventDefault();
});

$(projectTopics.Selectors_.NEW_TOPIC_INPUT_CONTAINER).on('click', function() { 
	$(projectTopics.Selectors_.ADD_TOPIC_INPUT).focus(); 
});


makeAllSortable();

$('.show-more').on('click',  function(e) {
	$(this).hide();
	$('.project').addClass('expand');
});

$('.mobile-nav-underlay').on('click',  function(e) {
	$('.mobile-nav-underlay').attr("aria-hidden", "true");
	$('.hamburger-container').attr("aria-expanded", "false");
	$('nav.mobile').removeClass("is-visible");
	$('.mobile-nav-underlay').removeClass("is-visible");
});


$('.hamburger-container').on('click',  function(e) {
	$('.mobile-nav-underlay').attr("aria-hidden", "false");
	$('.hamburger-container').attr("aria-expanded", "true");
	$('nav.mobile').addClass("is-visible");
	$('.mobile-nav-underlay').addClass("is-visible");
});

Dialog.prototype.initAll();


/* FORMS */


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
}

var ajax = new AjaxFunctions();

function removeAllShadowClasses(element){
	$(element).removeClass (function (index, className) {
		return (className.match (/\bshadow\-\S+/g) || []).join(' ');
	});
}

// PROJECT PAGE
$(ajax.Selectors_.SEARCH_INPUT).on('focus',  function(e){
	removeAllShadowClasses(ajax.Selectors_.SEARCH_CONTAINER);
	$(ajax.Selectors_.SEARCH_CONTAINER).addClass('shadow-focus');
});

$(ajax.Selectors_.SEARCH_INPUT).on('focusout',  function(e){
	removeAllShadowClasses(ajax.Selectors_.SEARCH_CONTAINER);
	$(ajax.Selectors_.SEARCH_CONTAINER).addClass('shadow-2dp');
});

// Makes primary topic first
$(".topics-list").prepend($(".first"));

// SUPERVISOR
$('#deleteProjectButton').on('click', function() { Ajax.deleteProject($('#title').val()); });

// SEARCH
$(ajax.Selectors_.SEARCH_FILTER_BUTTON).on('click', function() {
	var container = $(ajax.Selectors_.SEARCH_FILTER_CONTAINER);
	var filterButton = $(this);

	if(container.hasClass('active')){
		container.removeClass('active');
		filterButton.removeClass('active');
	} else{
		container.addClass('active');
		filterButton.addClass('active');
	}
});

$("#loginForm").on('submit', function(e){
	e.preventDefault();

	$('.help-block', '#loginForm').css("display", "none");
	$('.form-field', this).css("display", "none");
	$('#login-loader').css("display", "block");

	$.ajax({
		url: $(this).prop('action'),
		type:'POST',
		data: $(this).serialize(),
		success:function(data){
			$('#login-loader').css("display", "none");
			console.log($(ajax.Selectors_.LOG_IN_DIALOG));
			$(ajax.Selectors_.LOG_IN_DIALOG).removeClass('active');
			$(ajax.Selectors_.CHANGE_AUTH_DIALOG).addClass('active');
		},
		error: function (data) {
			$('.help-block', '#loginForm').css("display", "block");
			$('.help-block', '#loginForm').text(data["responseJSON"]["errors"]["username"][0]);
			
			$('.form-field', '#loginForm').css("display", "block");
			$('.form-field', '#loginForm').addClass("has-error");
			
			$('#login-loader').css("display", "none");
		}
	});
});


/* SUPERVISOR */
$('.accept').on('click', function() {
	acceptStudent($(this).data('student_id'));
});

$('.reject').on('click', function() {
	rejectStudent($(this).data('student_id'), $(this).data('project_id'));
});

function acceptStudent(student_id) {
	$.ajax({
		method: 'POST',
		url: '/supervisor/acceptStudent',
		data: {
			student_id : student_id
		},
		success: function(){
			
		}
	});
}

function rejectStudent(student_id, project_id) {
	$.ajax({
		method: 'POST',
		url: '/supervisor/rejectStudent',
		data: {
			project_id : project_id,
			student_id : student_id
		},
		success: function(){
			
		}
	});
}
});