<div id="login-dialog" class="login dialog">
<div class="underlay">
</div>
<div class="content">
	<h2>Log in</h2>
	<hr>
	<form id="loginForm" role="form" method="POST" action="{{ route('login') }}">
		{{ csrf_field() }}
		<div id="login-loader" class="loader" style="width: 75px; height: 75px;"></div>

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
			<button class="submit" type="submit">Login</button>
		</div>
	</form>
</div>
</div>