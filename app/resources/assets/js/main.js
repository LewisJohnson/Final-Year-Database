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

});