<div id="change-auth-dialog" class="dialog change-auth" data-dialog="change-auth">
	<div class="header">
		<h2 id="dialog-title">Change Authentication</h2>
		<p  id="dialog-desc" hidden>Select the authentication type you would like</p>
	</div>

	<div class="content">
		<form id="authForm" class="form form--flex" role="form" method="POST" action="/authenticaion-change">
			{{ csrf_field() }}
			<div class="form-field">
				<select class="text" name="auth_type">
					<option value="admin_system">System Admin</option>

					<option value="admin_ug">Undergraduate Admin</option>
					<option value="supervisor_ug">Undergraduate Supervisor</option>

					<option value="admin_masters">Masters Admin</option>
					<option value="supervisor_masters">Masters Supervisor</option>
				</select>
			</div>

			<div class="footer footer--dark">
				<button onclick="window['Dialog'].showLoader();" class="button button--raised button--accent" type="submit">CHANGE AUTHENTICATION</button>
			</div>
		</form>
	</div>
</div>
