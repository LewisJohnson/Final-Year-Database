<div class="change-auth dialog">
<div class="underlay">
</div>
<div class="content">
	<h2>Change Authentication</h2>
	<hr>
	<form id="loginForm" role="form" method="POST" action="/authChange">
		{{ csrf_field() }}
		<div id="login-loader" class="loader" style="width: 75px; height: 75px;"></div>
		<div class="form-field">
			<select class="text" name="auth_type">
				<option selected value="ug_admin">Undergraduate Admin</option>
				<option value="ug_supervisor">Undergraduate Supervisor</option>
				<option value="masters_admin">Masters Admin</option>
				<option value="masters_supervisor">Masters Supervisor</option>
			</select>
		</div>

		<div class="form-field">
			<button class="submit" type="submit">Change</button>
		</div>
	</form>
</div>
</div>

{{-- <script type="text/javascript">
	var selectName = $('select').attr('name');

// add a hidden element with the same name as the select
var hidden = $('<input type="hidden" name="'+selectName+'">');
hidden.val($('select').val());
hidden.insertAfter($('select'));

$("select option").unwrap().each(function() {
    var btn = $('<div class="btn">'+$(this).text()+'</div>');
    if($(this).is(':checked')) btn.addClass('on');
    $(this).replaceWith(btn);
});

$(document).on('click', '.btn', function() {
    $('.btn').removeClass('on');
    $(this).addClass('on');
    $('input[name="'+selectName+'"]').val($(this).text());
});

</script>

<style>
.on{
	background: red;
	color: black;
	font-weight: 900;
}
</style> --}}