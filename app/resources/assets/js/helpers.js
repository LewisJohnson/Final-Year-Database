"use strict";

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
	return '';
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
		// HTML < 5 fallback
		setCookie('rwc-'+inputType, JSON.stringify(checkboxValues), 365);
	}
}

function repopulateCheckboxes(){
	if (typeof(Storage) !== "undefined") {
		var checkboxValues = JSON.parse(sessionStorage.getItem('rwc-checkbox'));
	} else {
		var checkboxValues = JSON.parse(getCookie('rwc-checkbox'));
	}

	if(checkboxValues){
		Object.keys(checkboxValues).forEach(function(element) {
			var checked = checkboxValues[element];
			$("#" + element).prop('checked', checked);
		});
	}
}

/* ================
	JQUERY HELPERS
   ================ */

$(function() {
	$(window).scroll(function(){
		if ($(this).scrollTop() > config.showScrollToTopButtonOffset) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

	$("body").on("click", ".scroll-to-top", function(e) {
		$('html, body').animate({
			scrollTop: 0
		}, config.scrollToTopDuration);
	});

	$("body").on("click", ".show-more",  function(e) {
		$(this).hide();
		$('.project').addClass('expand');
	});

	$('#show-raw-table-data').on('click', function() {
		if($(this).prop('checked')){
			$('table.raw-detail').css('width', $('table.full-detail').css('width'));
			$('table.full-detail').css('position', 'absolute');
			$('table.raw-detail').css('position', 'absolute');

			$('table.full-detail').fadeOut(config.fastAnimation);
			$('table.raw-detail').fadeIn(config.fastAnimation, function(){
				$(this).css('position', 'relative');
			});
		} else {
			$('table.full-detail').css('width', $('table.raw-detail').css('width'));
			$('table.full-detail').css('position', 'absolute');
			$('table.raw-detail').css('position', 'absolute');

			$('table.raw-detail').fadeOut(config.fastAnimation);
			$('table.full-detail').fadeIn(config.fastAnimation, function(){
				$(this).css('position', 'relative');
			});
		}
	});

	$('.remember-with-cookie:checkbox').on('change', function() {
		rememberFormValues("checkbox");
	});

	repopulateCheckboxes();
});
