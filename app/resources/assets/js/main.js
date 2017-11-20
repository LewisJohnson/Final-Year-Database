$(function() {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	$('.show-more').click(function() {
		$(this).hide();
		$('.project').addClass('expand');
	});

	$('.login-button').click(function() {
		$('.login.dialog').fadeIn(400);
	});

	$('.login.dialog .underlay').click(function() {
		$('.login.dialog').fadeOut(400);
	});

	$('#changeModeButton').click(function() {
		$('.change-auth.dialog').fadeIn(400);
	});

	$('.change-auth .underlay').click(function() {
		$('.change-auth.dialog').fadeOut(400);
	});
});