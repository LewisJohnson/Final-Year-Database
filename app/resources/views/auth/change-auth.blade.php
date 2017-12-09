@if(Auth::user())
<div id="change-auth-dialog" class="dialog change-auth" data-dialog="change-auth">
	<div class="header">
		<h2>Change Authentication</h2>
	</div>

	<div class="content">
		<form id="authForm" class="form form--flex" role="form" method="POST" action="/authChange">
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
				<button class="submit button button--raised button--accent" type="submit">Change</button>
			</div>
		</form>
	</div>
</div>
@endif