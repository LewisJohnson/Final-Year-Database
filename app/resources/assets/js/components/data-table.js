$(function() { 
"use strict";

var DataTable = function DataTable(element) {
	this.element_ = $(element);
	this.firstHeader_ = $('th');
	this.bodyRows_ = $('tbody tr');
	this.footRows_ = $('tfoot tr');
	this.rows_ = $.merge(this.bodyRows_, this.footRows_);
	this.checkboxes_ = $(this.Selectors_.CHECKBOX);
	this.masterCheckbox_ = $(this.Selectors_.MASTER_CHECKBOX);
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
	selectAllRows: function(table) {
		if(table.masterCheckbox_.is(':checked')){
			table.rows_.addClass("is-selected")
			table.checkboxes_.prop('checked', true);
		} else {
			table.rows_.removeClass("is-selected")
			table.checkboxes_.prop('checked', false);
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
	var dt = this;
	this.masterCheckbox_.on('change', $.proxy(this.functions.selectAllRows, this, dt));

	var i = 0;
	var dt = this;
	$(this.checkboxes_).each(function() {
		$(this).on('change', $.proxy(dt.functions.selectRow, this, $(this), $(dt.bodyRows_[i])));
	});
};

DataTable.prototype.initAll = function () {
	$(this.Selectors_.DATA_TABLE).each(function() {
		$(this).DataTable = new DataTable(this);
	});
};

DataTable.prototype.initAll();
});