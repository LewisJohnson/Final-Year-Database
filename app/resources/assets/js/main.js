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

	$('.login-button').on('click',  function(e) {
		$('.login.dialog').fadeIn(400);
	});

	$('.login.dialog .underlay').on('click',  function(e) {
		$('.login.dialog').fadeOut(400);
	});

	$('#changeModeButton').on('click',  function(e) {
		$('.change-auth.dialog').fadeIn(400);
	});

	$('.change-auth .underlay').on('click',  function(e) {
		$('.change-auth.dialog').fadeOut(400);
	});

	$('.mobile-nav-underlay').on('click',  function(e) {
		$('.mobile-nav-underlay').prop("aria-hidden", "true");
		$('.hamburger-container').prop("aria-expanded", "false");
		$('nav.mobile').removeClass("is-visible");
		$('.mobile-nav-underlay').removeClass("is-visible");
	});

	$('.hamburger-container').on('click',  function(e) {
		$('.mobile-nav-underlay').prop("aria-hidden", "false");
		$('.hamburger-container').prop("aria-expanded", "true");
		$('nav.mobile').addClass("is-visible");
		$('.mobile-nav-underlay').addClass("is-visible");
	});
	
})