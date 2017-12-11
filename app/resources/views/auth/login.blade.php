<div id="login-dialog" class="dialog login" data-dialog="login">
	<div class="header">
		<h2>LOG IN</h2>
	</div>

	<div class="content">
		<form id="loginForm" class="form form--flex" role="form" method="POST" action="{{ route('login') }}">
			{{ csrf_field() }}

			<div id="login-username" class="form-field">
				<label for="username">Username</label>
				<input value="ug_admin" id="username"  type="text" name="username" value="{{ old('username') }}" required autofocus>
			</div>

			<div class="form-field">
				<label for="password">Password</label>
				<input value="admin" id="password" type="password" name="password" required>
			</div>

			<div class="form-field">
				<div class="checkbox">
					<input id="remember" name="title" type="checkbox" {{ old('remember') ? 'checked' : '' }}>
					<label for="remember">Remember Me</label>
				</div>
			</div>

			<p class="help-block" style="display:none">
				{{ $errors->first('username') }}
			</p>

			<div class="form-field">
				<button class="button button--raised button--accent" type="submit">LOG IN</button>
			</div>
		</form>
	</div>
</div>