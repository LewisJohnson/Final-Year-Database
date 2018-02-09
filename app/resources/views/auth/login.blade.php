@if(isset($view))
	@include ('partials.html-head')
	@include ('partials.header-guest')

	<div class="width--600 centered card" style="margin-top: 3rem;">
		<h1>LOG IN</h1>
		<h3>Use your Sussex ITS login details to log in to this system.</h3>

		<div class="content">
			<form class="form form--flex" role="form" method="POST" action="/login">
				{{ csrf_field() }}

				<div id="login-username" class="form-field {{ $errors->has('username') ? ' has-error' : '' }}">
					<label for="username">Username</label>
					@include('forms.partials.error-block', ['name' => 'username'])
					{{-- todo: Remove value="admin_ug" --}}
					<input value="lj234" id="username"  type="text" name="username" value="{{ old('username') }}" required autofocus>
				</div>

				<div class="form-field  {{ $errors->has('password') ? ' has-error' : '' }}">
					<label for="password">Password</label>
					{{-- todo: Remove value="password" --}}
					@include('forms.partials.error-block', ['name' => 'password'])
					<input value="password" id="password" type="password" name="password" required>
				</div>

				<div class="form-field" title="This is not recommended for shared devices">
					<div class="checkbox">
						<input id="remember" name="title" type="checkbox" {{ old('remember') ? 'checked' : '' }}>
						<label for="remember">Remember Me</label>
					</div>
				</div>


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
			<form id="loginForm" class="form form--flex" role="form" method="POST" action="/login">
				{{ csrf_field() }}

				<div id="login-username" class="form-field">
					<label for="username">Username</label>
					{{-- todo: Remove value="admin_ug" --}}
					<input value="lj234" id="username"  type="text" name="username" value="{{ old('username') }}" required autofocus>
				</div>

				<div class="form-field">
					<label for="password">Password</label>
					{{-- todo: Remove value="password" --}}
					<input value="password" id="password" type="password" name="password" required>
				</div>

				<div class="form-field" title="This is not recommended for shared devices">
					<div class="checkbox">
						<input id="remember" name="title" type="checkbox" {{ old('remember') ? 'checked' : '' }}>
						<label for="remember">Remember Me</label>
					</div>
				</div>

				<p class="help-block" style="display:none">
					{{ $errors->first('username') }}
				</p>

				<div class="footer footer--dark">
					<button class="button button--raised button--accent" type="submit">LOG IN</button>
				</div>
			</form>
		</div>
	</div>
@endif

