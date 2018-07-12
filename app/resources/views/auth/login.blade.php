@if(isset($view) && $view == "main")
	@include ('partials.html-head')
	@include ('partials.header')

	<div class="width--600 centered card" style="margin-top: 3rem;">
		<div class="header">
			<h2 id="dialog-title">LOG IN</h2>
			<p id="dialog-desc">Use your Sussex ITS login details to log in to this system</p>
		</div>

		<div class="content">
			<form class="form form--flex" role="form" method="POST" action="{{ action('Auth\LoginController@login')}}" accept-charset="utf-8">
				{{ csrf_field() }}

				<div id="login-username" type="email" autocorrect="off" autocapitalize="none" class="form-field {{ $errors->has('username') ? ' has-error' : '' }}">
					<label for="username">Username/Email</label>
					@include('forms.partials.error-block', ['name' => 'username'])
					<input id="username" type="text" name="username" value="{{ old('username') }}" required autofocus>
				</div>

				<div class="form-field  {{ $errors->has('password') ? ' has-error' : '' }}">
					<label for="password">Password</label>
					@include('forms.partials.error-block', ['name' => 'password'])
					<input id="password" type="password" name="password" required>
				</div>

				<div class="form-field" title="This is not recommended for shared devices">
					<div class="checkbox">
						<input id="remember" name="title" type="checkbox" {{ old('remember') ? 'checked' : '' }}>
						<label for="remember">Remember Me</label>
					</div>
				</div>

				@if(isset($errors))
					<p class="help-block">
						{{ $errors->first('username') }}
					</p>
				@endif
				
				<div class="flex flex--row">
					<button class="button button--raised button--accent" type="submit">LOG IN</button>
				</div>
			</form>
		</div>
	</div>
@else
	<div id="login-dialog" class="dialog login" data-dialog="login">
		<div class="header">
			<h2 id="dialog-title">LOG IN</h2>
			<p id="dialog-desc" hidden>Use your Sussex ITS login details to log in to this system</p>
		</div>

		<div class="content">
			<form id="loginForm" class="form form--flex" role="form" method="POST" action="{{ action('Auth\LoginController@login')}}">
				{{ csrf_field() }}

				<div type="email" autocorrect="off" autocapitalize="none" id="login-username" class="form-field">
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

				@if(isset($errors))
					<p class="help-block">
						{{ $errors->first('username') }}
					</p>
				@endif

				<div class="footer footer--dark">
					<button class="button button--raised button--accent" type="submit">LOG IN</button>
				</div>
			</form>
		</div>
	</div>
@endif

