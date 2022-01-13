/*
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

/*
|--------------------------------------------------------------------------
| jQuery Helpers
|--------------------------------------------------------------------------
|
| Helper functions that need to be called after the DOM is ready.
|
*/

$(function() {

	/**
		* Show scroll to top button.
	*/
	$(window).scroll(function(){
		if ($(this).scrollTop() > config.showScrollToTopButtonOffset) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

	/**
		* Scroll to top when button is clicked.
	*/
	$("body").on("click", ".scroll-to-top", function(e) {
		$('html, body').animate({
			scrollTop: 0
		}, config.scrollToTopDuration);
	});

	/**
		* The "Show more" button on students homepage.
		* 
		* Only shown if a student has selected, proposed or been accepted for a project.
	*/
	$("body").on("click", "#expand-student-project-preview",  function(e) {
		$(this).hide();
		$('.project').addClass('expand');
	});

	/**
		* Toggle label flips toggle.
		*
		* Toggles a toggle if it's label is clicked.
	*/
	$("body").on("click", ".switch-label.switch-label--toggle",  function(e) {
		var id = "#" + $(this).attr('for');
		$(id).click();
	});


	/**
		* Checkbox form toggle.
		*
		* Toggles a toggle if it's form is clicked.
	*/
	$("body").on("click", ".form-field--toggle",  function(e) {
		if($(e.target).hasClass("toggle") || $(e.target).parent().hasClass("toggle")){
			return;
		}

		$(this).find('input:checkbox').click();
	});

	/**
		* EU Cookie banner.
		*
		* Hides banner when clicked.
	*/
	$("#cookie-banner").on("click", "button",  function(e) {
		setCookie('seen_cookie_banner', true, 365);
		$("#cookie-banner").hide(config.animtions.medium);
	});

	/**
		* Boolean valued checkbox.
		*
		* Instead of 'checked' attribute, the values will be true/false
	*/
	$(".boolean-checkbox").each(function() {
		$(this).parent().parent().after('<input type="hidden" name="' + $(this).attr("name") + '" value="' + $(this).is(':checked') +'" />');
	});

	$("body").on("click", ".boolean-checkbox",  function(e) {
		if($(this).is(':checked')) {
			$(this).parent().parent().next().val("true");
		} else {
			$(this).parent().parent().next().val("false");
		}
	});

	/**
		* Remember checkbox value with cookies.
		*
		* Toggles a toggle if it's form is clicked.
	*/
	$('body').on('change', '.js-cookie:checkbox', function() {
		rememberFormValues("checkbox");
	});

	/**
		* Assign project to window variable.
		*
		* Used as an easy way for functions to get current project data from other JS files.
	*/
	if($('.js-project').length > 0){
		window['project'] = $('.js-project');
	}

	/**
	 * Client side sort table
	*/
	$('body').on('click', '.sort-table thead tr th:not(.js-unsortable)', function() {
		sortTable($(this), $(this).closest('table'));
	});

	/**
	 * Server side Sort table
	*/

	if($('.server-sort-table').length > 0){
		var urlParams = new URLSearchParams(window.location.search);
		var sortCol = urlParams.get('sortCol');
		var sortDir = urlParams.get('sortDir');

		$(this).find('th').each(function() {
			if($(this).text().toLowerCase() == sortCol){
				if(sortDir == "asc"){
					$(this).append('<span class="js-colSortDir">&#x25BC;</span>');
				} else {
					$(this).append('<span class="js-colSortDir">&#x25B2;</span>');
				}
			}
		});
	}

	$('.server-sort-table thead tr th:not(.js-unsortable)').on('click', function() {
		serverSortTable($(this), $(this).closest('table'));
	});

	// Repopulate checkboxes
	repopulateCheckboxes();

	// Safari datalist polyfill
	// Fyrd MIT License
	(function(f){function w(e,h,g){var a=f.createElement("ul"),k=null;a.id=s;a.className=x;f.body.appendChild(a);for(var b=f.createDocumentFragment(),m=0;m<g.length;m++){var q=g[m],p=f.createElement("li");p.innerText=q.value;b.appendChild(p)}a.appendChild(b);var r=a.childNodes,t=function(c){for(var d=0;d<r.length;d++)c(r[d])},l=function(c,d,a){c.addEventListener?c.addEventListener(d,a,!1):c.attachEvent("on"+d,a)};h.parentNode.removeChild(h);l(e,"focus",function(){a.scrollTop=0});l(e,"blur",function(c){setTimeout(function(){a.style.display=
	"none";t(function(a){a.className=""})},100)});var u=function(){a.style.top=e.offsetTop+e.offsetHeight+"px";a.style.left=e.offsetLeft+"px";a.style.width=e.offsetWidth+"px"},v=function(c){e.value=c.innerText;y(e,"change");setTimeout(function(){a.style.display="none"},100)};h=function(c){a.style.display="block";u();k=[];t(function(a){var c=e.value.toLowerCase();(c=c.length&&-1<a.innerText.toLowerCase().indexOf(c))&&k.push(a);a.style.display=c?"block":"none"})};l(e,"keyup",h);l(e,"focus",h);t(function(a){l(a,
	"mouseover",function(d){t(function(d){d.className=a==d?n:""})});l(a,"mouseout",function(d){a.className=""});l(a,"mousedown",function(d){v(a)})});l(window,"resize",u);l(e,"keydown",function(c){var d=a.querySelector("."+n);if(k.length){var e=38==c.keyCode,f=40==c.keyCode;if(e||f)if(f&&!d)k[0].className=n;else if(d){for(var b=null,h=null,g=0;g<k.length;g++)if(k[g]==d){b=k[g-1];h=k[g+1];break}d.className="";e&&(b?(b.className=n,b.offsetTop<a.scrollTop&&(a.scrollTop-=b.offsetHeight)):k[k.length-1].className=
	n);f&&(h?(h.className=n,h.offsetTop+h.offsetHeight>a.scrollTop+a.offsetHeight&&(a.scrollTop+=h.offsetHeight)):k[0].className=n)}!d||13!=c.keyCode&&9!=c.keyCode||v(d)}})}var x="datalist-polyfill",n="datalist-polyfill__active",m=!(!f.createElement("datalist")||!window.HTMLDataListElement),b=navigator.userAgent,b=b.match(/Android/)&&!b.match(/(Firefox|Chrome|Opera|OPR)/);if(!m||b)for(var m=f.querySelectorAll("input[list]"),y=function(e,b){var g;f.createEvent?(g=f.createEvent("HTMLEvents"),g.initEvent(b,
	!0,!0),e.dispatchEvent(g)):(g=f.createEventObject(),g.eventType=b,e.fireEvent("on"+b,g))},b=0;b<m.length;b++){var r=m[b],s=r.getAttribute("list"),p=f.getElementById(s);if(!p){console.error("No datalist found for input: "+s);break}var q=f.querySelector('select[data-datalist="'+s+'"]'),z=(q||p).getElementsByTagName("option");w(r,p,z);q&&q.parentNode.removeChild(q)}})(document);
});