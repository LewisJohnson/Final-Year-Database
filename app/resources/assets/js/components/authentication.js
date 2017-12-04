$("#loginForm").on('submit', function(e){
	e.preventDefault();

	$('.help-block', '#loginForm').css("display", "none");
	$('.form-field', this).css("display", "none");
	$('#login-loader').css("display", "block");

	$.ajax({
		url: $(this).prop('action'),
		type:'POST',
		data: $(this).serialize(),
		success:function(data){
			$('#login-loader').css("display", "none");
			$('#loginForm').append(data);
			$(ajax.Selectors_.LOG_IN_DIALOG).hide();
			$(ajax.Selectors_.CHANGE_AUTH_DIALOG).show();
		},
		error: function (data) {
			$('.help-block', '#loginForm').css("display", "block");
			$('.help-block', '#loginForm').text(data["responseJSON"]["errors"]["username"][0]);
			
			$('.form-field', '#loginForm').css("display", "block");
			$('.form-field', '#loginForm').addClass("has-error");
			
			$('#login-loader').css("display", "none");
		}
	});
});