$(function() {

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


});

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

window.onload = function () {makeAllSortable();};