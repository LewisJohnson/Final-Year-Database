<div id="change-auth-dialog" class="dialog change-auth" data-dialog="change-auth">
	<div class="header">
		<h2>Change Authentication</h2>
	</div>

	<div class="content">
		<form id="authForm" class="form form--flex" role="form" method="POST" action="/authenticaion-change">
			{{ csrf_field() }}
			<div class="form-field">
				<select class="text" name="auth_type">
					
					<option selected value="admin_ug">Undergraduate Admin</option>
					<option value="supervisor_ug">Undergraduate Supervisor</option>
					<option value="admin_masters">Masters Admin</option>
					<option value="supervisor_masters">Masters Supervisor</option>
				</select>
			</div>

			<div class="form-field">
				<button class="button button--raised button--accent" type="submit">CHANGE AUTHENTICATION</button>
			</div>
		</form>
	</div>
</div>