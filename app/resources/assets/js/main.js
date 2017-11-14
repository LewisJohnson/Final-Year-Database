$(function() {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	$('.bitValueCheckbox').each(function(i, obj) {
		if($(obj).val() == 1){
			$(obj).prop('checked', true);
		}
	});

	$('.bitValueCheckbox').click(function() {
		if($(this).is(':checked')){
			$(this).val(1);
		} else {
			$(this).val(0);
		}
	});

	$('.show-more').click(function() {
		$(this).hide();
		$('.project').addClass('expand');
	});

	$('.login-button').click(function() {
		$('.login').fadeIn(400);
	});

	$('.login-underlay').click(function() {
		$('.login').fadeOut(400);
	});
});