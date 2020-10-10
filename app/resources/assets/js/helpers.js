/*
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
|
| Helper functions.
|
*/

/**
 * Creates a new toast.
 * @param {string} type The css class to add to the toast
 * @param {string} message The message to add to the toast
 */
function createToast(type, message, quick) {
	if (quick == null || quick == 'undefined') {
		quick = false;
	}
	
	// Create new toast
	var toast = $('<div class="notification shadow-lg" role="alert"></div>').appendTo('body');

	// Add message to toast
	$(toast).html("<p>" + message + "</p>");

	var timeout = 9000;

	if (quick === true) {
		$(toast).addClass('quick');
		timeout = 2000;
	}

	// Add classes to toast
	$(toast).addClass(type);

	setTimeout(function() {
		// Delete toast
		$(toast).remove();
	}, timeout);
}

function addLastNameHeadersToList(ul) {
	var listItems = $("li", ul);
	var links = $('#' + ul.attr('id') + '-links');

	for (var i = 0; i < listItems.length; i++) {

		var firstCharOflastName = $(listItems[i])
			.data("sort-name")
			.toString()
			.toUpperCase()
			.charAt(0);

		if(i == 0){
			$(listItems[i]).before("<li class='alpha-header' id='" + ul.attr('id') + "-" + firstCharOflastName + "'><h4>" + firstCharOflastName + "</h4</li>");
			links.append("<a href='#" + ul.attr('id') + "-" + firstCharOflastName + "'>"+ firstCharOflastName +"</a>");
			continue;
		}

		var prevfirstCharOflastName = $(listItems[i - 1])
			.data("sort-name")
			.toString()
			.toUpperCase()
			.charAt(0);

		if(firstCharOflastName != prevfirstCharOflastName){
			$(listItems[i]).before("<li class='alpha-header' id='" + ul.attr('id') + "-" + firstCharOflastName + "'><h4>" + firstCharOflastName + "</h4</li>");
			links.append("<a href='#" + ul.attr('id') + "-" + firstCharOflastName + "'>"+ firstCharOflastName +"</a>");
		}
	}
}

/**
 * Creates a new cookie.
 *
 * @param {string} cname The name of the cookie
 * @param {string} cvalue The value of the cookie
 * @param {int} exdays The duration of days the cookie should lsat 
 */
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Retrieves a cookie.
 *
 * @param {string} cname The name of the cookie
 */
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

function rememberFormValues(inputType){
	var checkboxValues = {};

	$(".js-cookie:" + inputType).each(function(){
		checkboxValues[this.id] = this.checked;
	});

	if (typeof(Storage) !== "undefined") {
		sessionStorage.setItem('rwc-'+inputType, JSON.stringify(checkboxValues));
	} else {
		// Cookie fallback
		setCookie('rwc-'+inputType, JSON.stringify(checkboxValues), 365);
	}
}

function repopulateCheckboxes(){
	if (typeof(Storage) !== "undefined") {
		// Check session storage first
		var checkboxValues = JSON.parse(sessionStorage.getItem('rwc-checkbox'));
	}

	if(checkboxValues == null){
		// Fallback to see if cookie is set
		if(getCookie('rwc-checkbox') != null){
			var checkboxValues = JSON.parse(getCookie('rwc-checkbox'));
		}
	}

	if(checkboxValues != null){
		Object.keys(checkboxValues).forEach(function(element) {
			var checked = checkboxValues[element];
			$("#" + element).prop('checked', checked);
			$("#" + element).trigger('change');
		});
	}
}

/**
 * Inserts text at a caret (Cursor)
 *
 * @param {string} areaId The ID of the element to search the caret for (Should be an input)
 * @param {string} text The value of the text to insert

 * A modified version of http://web.archive.org/web/20110102112946/http://www.scottklarr.com/topic/425/how-to-insert-text-into-a-textarea-where-the-cursor-is/
 * Posted On Oct 11, 2008 at 10:16 pm
 * Can not find an author to credit
 */
function insertAtCaret(areaId, text) {
	var txtarea = document.getElementById(areaId);
	if (!txtarea || !text) { return; }

	var scrollPos = txtarea.scrollTop;
	var strPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0, strPos);
	var back = (txtarea.value).substring(strPos, txtarea.value.length);

	txtarea.value = front + text + back;
	strPos = strPos + text.length;
	txtarea.selectionStart = strPos;
	txtarea.selectionEnd = strPos;
	$(txtarea).trigger("change");
	txtarea.focus();

	txtarea.scrollTop = scrollPos;
}

/**
 * Inserts text around a caret (Cursor)
 *
 * @param {string} areaId The ID of the element to search the caret for (Should be an input)
 * @param {string} text The value of the text to insert
 */
function wrapTextWithTag(areaId, tag) {
	var txtarea = document.getElementById(areaId);
	if (!txtarea || !tag) { return; }

	var scrollPos = txtarea.scrollTop;
	var frontTag = "<" + tag + ">";
	var backTag = "</" + tag + ">";

	var strPos = txtarea.selectionStart + frontTag.length;
	var endPos = txtarea.selectionEnd + backTag.length - 1;


	var start = txtarea.value.substring(0, txtarea.selectionStart);
	var end = txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
	var selection = txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd)
	txtarea.value = start + frontTag + selection + backTag + end;

	$(txtarea).trigger("change");

	txtarea.focus();

	txtarea.selectionStart = strPos;
	txtarea.selectionEnd = endPos;
	txtarea.scrollTop = scrollPos;
}

function sortTable(header, table) {
	var i, shouldSwitch, switchcount = 0;
	var rows, x, y = $();
	var switching = true;
	var dir = "asc";

	if(!(header instanceof jQuery)){
		header = $(header);
	}

	if(!(table instanceof jQuery)){
		table = $(table);
	}

	// If the header is a checkbox, ignore it
	if(header.find('.checkbox').length > 0){
		return;
	}

	table.find('th').each(function(key, th) {
		if(!$(th).is(header)){
			$(th).find('.js-colSortDir').remove();
		}
	});

	if(header.find('.js-colSortDir').length < 1){
		header.append('<span class="js-colSortDir">&#x25B2;</span>');
		header.attr('data-asc', '');
	} else {
		if(header.attr('data-asc') == ""){
			header.removeAttr('data-asc');
			header.attr('data-desc', '');
			
			header.find('.js-colSortDir').remove();
			header.append('<span class="js-colSortDir">&#x25BC;</span>');
		} else if(header.attr('data-desc') == ""){
			header.removeAttr('data-desc');
			header.attr('data-asc', '');

			header.find('.js-colSortDir').remove();
			header.append('<span class="js-colSortDir">&#x25B2;</span>');
		}
	}

	/* Make a loop that will continue until
	no switching has been done: */
	while (switching){
		// Start by saying: no switching is done:
		switching = false;
		rows = table.find("TR");
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows.eq(i).find("TD").eq(header.index());
			y = rows.eq(i + 1).find("TD").eq(header.index());

			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
				if(typeof x.data('use-hover-value') !== 'undefined'){
					if (x.data('hover').toLowerCase().localeCompare(y.data('hover').toLowerCase()) == 1) {
						// If so, mark as a switch and break the loop:
						shouldSwitch= true;
						break;
					}
				}

				if (x.text().toLowerCase().localeCompare(y.text().toLowerCase()) == 1) {
					// If so, mark as a switch and break the loop:
					shouldSwitch= true;
					break;
				}
			} else if (dir == "desc") {
				if(typeof x.data('use-hover-value') !== 'undefined'){
					if (x.data('hover').toLowerCase().localeCompare(y.data('hover').toLowerCase()) == -1) {
						// If so, mark as a switch and break the loop:
						shouldSwitch= true;
						break;
					}
				}

				if (x.text().toLowerCase().localeCompare(y.text().toLowerCase()) == -1) {
					// If so, mark as a switch and break the loop:
					shouldSwitch= true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows.eq(i).before(rows.eq(i + 1));

			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++; 
		} else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

function serverSortTable(header) {
	var urlParams = new URLSearchParams(window.location.search);
	var sortDir = urlParams.get('sortDir');

	var headerText = $(header).contents().get(0).nodeValue;

	if(sortDir == "asc"){
		var sorturl = updateQueryStringParameter(window.location.href, "sortDir", "desc");
		var finalUrl = updateQueryStringParameter(sorturl, "sortCol", headerText.toLowerCase());
		window.location.href = finalUrl;
	} else {
		var sorturl = updateQueryStringParameter(window.location.href, "sortDir", "asc");
		var finalUrl = updateQueryStringParameter(sorturl, "sortCol", headerText.toLowerCase());
		window.location.href = finalUrl;
	}	
}

function updateQueryStringParameter(uri, key, value) {
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	} else {
		return uri + separator + key + "=" + value;
	}
}
