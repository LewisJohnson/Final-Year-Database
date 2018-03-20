/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

"use strict";

var config = {
	// Animations
	animtions: {
		slow: 400,
		medium: 300,
		fast: 200,
		superFast: 100,
	},

	mobileWidth: 970,
	showHelpFooter: true,
	fancyAnimations: true,
	showScrollToTopButtonOffset: 50,
	scrollToTopDuration: 600,
	showAjaxRequestFailNotification: true,
	tapHeldTime: 500
}

window["config"] = config;
/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

/* ================
	HELPERS
	 ================ */
function showNotification(type, message){
	var notification = $('.notification');
	notification.removeClass();

	notification.addClass('notification ' + type);
	$(notification).html("<p>" + message + "</p>");

	notification.show();

	var animDuration = notification.css("animation-duration").toString().replace(/s/g, '') * 1000;

	setTimeout(function() {
		notification.hide(0);
	}, animDuration);
}

function removeAllShadowClasses(element){
	$(element).removeClass (function (index, className) {
		return (className.match (/\bshadow\-\S+/g) || []).join(' ');
	});
}

function sortUnorderedList(ul) {
	var listitems = ul.children('li').get();

	listitems.sort(function(a, b) {
		return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
	})

	$.each(listitems, function(idx, itm) { ul.append(itm); });
}

function addLastNameHeadersToList(ul) {
	var listitems = ul.children('li').get();
	var links = $('#' + ul.attr('id') + '-links');

	for (var i = 0; i < listitems.length; i++) {

		var name = $(listitems[i]).text();
		var nameSplit = name.toUpperCase().split(" ");
		var firstCharOflastName = nameSplit[nameSplit.length - 1].charAt(0);

		if(i == 0){
			$(listitems[i]).before("<li class='alpha-header' id='" + ul.attr('id') + "-" + firstCharOflastName + "'><h3>" + firstCharOflastName + "</h3</li>");
			links.append("<a href='#" + ul.attr('id') + "-" + firstCharOflastName + "'>"+ firstCharOflastName +"</a>");
			continue;
		}

		var prevName = $(listitems[i - 1]).text();
		var prevNameSplit = prevName.toUpperCase().split(" ");
		var prevfirstCharOflastName = prevNameSplit[prevNameSplit.length - 1].charAt(0);

		if(firstCharOflastName != prevfirstCharOflastName){
			$(listitems[i]).before("<li class='alpha-header' id='" + ul.attr('id') + "-" + firstCharOflastName + "'><h3>" + firstCharOflastName + "</h3</li>");
			links.append("<a href='#" + ul.attr('id') + "-" + firstCharOflastName + "'>"+ firstCharOflastName +"</a>");
		}
	}
}

function addAlphaHeadersToList(ul) {
	var listitems = ul.children('li').get();
	var links = $('#' + ul.attr('id') + '-links');

	for (var i = 0; i < listitems.length; i++) {
		var firstChar = $(listitems[i]).text().replace(/\s/g, '').charAt(0).toUpperCase();

		if(i == 0){
			$(listitems[i]).before("<li class='alpha-header' id='" + ul.attr('id') + "-" + firstChar + "'><h3>" + firstChar + "</h3</li>");
			links.append("<a href='#" + ul.attr('id') + "-" + firstChar + "'>"+ firstChar +"</a>");
			continue;
		}
		var prevFirstChar = $(listitems[i - 1]).text().replace(/\s/g, '').charAt(0).toUpperCase();
		if(firstChar != prevFirstChar){
			$(listitems[i]).before("<li class='alpha-header' id='" + ul.attr('id') + "-" + firstChar + "'><h3>" + firstChar + "</h3</li>");
			links.append("<a href='#" + ul.attr('id') + "-" + firstChar + "'>"+ firstChar +"</a>");
		}
	}
}

function addTitleHeadersToList(ul) {
	var listitems = ul.children('li').get();
	var links = $('#' + ul.attr('id') + '-links');

	for (var i = 0; i < listitems.length; i++) {
		var t = $(listitems[i]).text();
		var nameTitle = /[^[, ]*]*/.exec(t)[0].toUpperCase().replace(/\s/g, '');

		if(i == 0){
			$(listitems[i]).before("<li class='alpha-header' id='" + ul.attr('id') + "-" + nameTitle + "'><h3>" + nameTitle + "</h3</li>");
			links.append("<a href='#" + ul.attr('id') + "-" + nameTitle + "'>"+ nameTitle +"</a>");
			continue;
		}

		var pt = $(listitems[i - 1]).text();
		var prevNameTitle = /[^[, ]*]*/.exec(pt)[0].toUpperCase().replace(/\s/g, '');

		if(nameTitle != prevNameTitle){
			$(listitems[i]).before("<li class='alpha-header' id='" + ul.attr('id') + "-" + nameTitle + "'><h3>" + nameTitle + "</h3</li>");
			links.append("<a href='#" + ul.attr('id') + "-" + nameTitle + "'>"+ nameTitle +"</a>");
		}
	}
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

function formCookie(inputType){
	var checkboxValues = {};

	$(".remember-with-cookie:"+inputType).each(function(){
		checkboxValues[this.id] = this.checked;
	});
}

function rememberFormValues(inputType){
	var checkboxValues = {};

	$(".remember-with-cookie:"+inputType).each(function(){
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
		});
	}
}

/*
* From http://web.archive.org/web/20110102112946/http://www.scottklarr.com/topic/425/how-to-insert-text-into-a-textarea-where-the-cursor-is/
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

	// txtarea.selectionEnd
	txtarea.focus();

	txtarea.selectionStart = strPos;
	txtarea.selectionEnd = endPos;
	txtarea.scrollTop = scrollPos;
}