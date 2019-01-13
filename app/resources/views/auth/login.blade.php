@if(isset($view) && $view == "main")
	@include('partials.html-head')
	@include('partials.header')

	<div class="mw-600 centered card" style="margin-top: 3rem;">
		<div class="header">
			<h2 id="dialog-title">LOG IN</h2>
			<p id="dialog-desc">Use your Sussex ITS login details to log in to this system</p>
		</div>

		<div class="content">
			<form id="loginForm" class="form form--flex" role="form" method="POST" action="{{ action('Auth\LoginController@login')}}" accept-charset="utf-8">
				{{ csrf_field() }}

				<div type="email" autocorrect="off" autocapitalize="none" class="form-field">
					<label for="username">Username/Email</label>
					<input id="username"  type="text" name="username" value="{{ old('username') }}" required autofocus>
				</div>

				<div class="form-field">
					<label for="password">Password</label>
					<input id="password" type="password" name="password" required>
				</div>

				<div class="form-field" title="This is not recommended for shared devices">
					<div class="checkbox">
						<input id="remember" name="title" type="checkbox" {{ old('remember') ? 'checked' : '' }}>
						<label for="remember">Remember Me</label>
					</div>
				</div>

				<p class="help-block" style="display: none;"></p>
				<div id="redirect-block" style="display: none;">
					<h3 style="margin-bottom: 5px">After login, you will be redirected to</h3>
					<p style="margin-top: 0"></p>
				</div>

				<div class="flex flex--row">
					<button class="button button--raised button--accent" type="submit">LOG IN</button>
				</div>
			</form>
		</div>
	</div>

	<script>
		@if(Session::get("after_login") != null)
			$("#redirect-block p").text("{{ Session::get('after_login') }}");
			$("#redirect-block").show();
		@endif
	</script>
@else
	<div id="login-dialog" data-type="ajax" class="dialog login" data-dialog="login">
		<div class="header">
			<h2 id="dialog-title">LOG IN</h2>
			<p id="dialog-desc" hidden>Use your Sussex ITS login details to log in to this system</p>
		</div>

		<div class="content">
			<form id="loginForm" class="form form--flex" role="form" method="POST" action="{{ action('Auth\LoginController@login')}}" accept-charset="utf-8">
				{{ csrf_field() }}

				<div type="email" autocorrect="off" autocapitalize="none" class="form-field">
					<label for="username">Username/Email</label>
					<input id="username"  type="text" name="username" value="{{ old('username') }}" required autofocus>
				</div>

				<div class="form-field">
					<label for="password">Password</label>
					<input id="password" type="password" name="password" required>
				</div>

				<div class="form-field" title="This is not recommended for shared devices">
					<div class="checkbox">
						<input id="remember" name="title" type="checkbox" {{ old('remember') ? 'checked' : '' }}>
						<label for="remember">Remember Me</label>
					</div>
				</div>

				<p class="help-block" style="display: none;"></p>
				<div id="redirect-block" style="display: none;">
					<h3 style="margin-bottom: 5px">After login, you will be redirected to</h3>
					<p style="margin-top: 0"></p>
				</div>

				<div class="footer footer--dark">
					<button class="button button--raised button--accent" type="submit">LOG IN</button>
				</div>
			</form>
		</div>
	</div>
@endif

