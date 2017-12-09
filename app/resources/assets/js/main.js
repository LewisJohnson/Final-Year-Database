import {Swappable} from '@shopify/draggable';


$(function() {

$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
});

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
});