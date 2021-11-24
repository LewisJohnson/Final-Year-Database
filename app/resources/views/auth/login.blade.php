@if(isset($view) && $view == "main")
	@include('partials.html-head')
	@include('partials.header')

	<div class="mw-600 centered mt-3">
		<div class="card">
			<div class="card-header text-uppercase">{{ Session::get('department') }} LOG IN</div>
		
			<div class="card-body">
				<form id="loginForm" class="form" role="form" method="POST" action="{{ action('Auth\LoginController@login')}}" accept-charset="utf-8">
					{{ csrf_field() }}
	
					<div class="form-group" type="email" autocorrect="off" autocapitalize="none">
						<label for="username">Username/Email</label>
						<input class="form-control" id="username"  type="text" name="username" value="{{ old('username') }}" required autofocus>
					</div>
	
					<div class="form-group">
						<label for="password">Password</label>
						<input class="form-control" id="password" type="password" name="password" required>
					</div>
	
					<div class="form-group" title="This is not recommended for shared devices">
						<div class="checkbox">
							<input id="remember" name="title" type="checkbox" {{ old('remember') ? 'checked' : '' }}>
							<label class="ml-1" for="remember">Remember Me</label>
						</div>
					</div>
	
					<p class="help-block" style="display: none;"></p>

					@if(Session::get("after_login") != null)
						<div id="RedirectBlock" style="display: none;">
							<h3 style="margin-bottom: 5px">After login, you will be redirected to</h3>
							<p style="margin-top: 0">{{ Session::get('after_login') }}</p>
						</div>
					@endif
	
					<div class="text-right mt-3">
						<button class="btn btn-primary" type="submit">LOG IN</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<script>
		
	</script>
@else
	<div id="login-dialog" data-type="ajax" class="dialog login" data-dialog="login">
		<div class="border-bottom">
			<h4 id="dialog-title" class="text-center p-3 m-0 font-weight-bold text-uppercase">{{ Session::get('department') }} LOG IN</h4>
			<p id="dialog-desc" hidden>Use your Sussex ITS login details to log in to this system</p>
		</div>

		<form id="loginForm" role="form" method="POST" action="{{ action('Auth\LoginController@login')}}" accept-charset="utf-8">
			<div class="container px-4 pb-3">
				<div class="row mt-3">
					<div class="col-12">
						{{ csrf_field() }}
									
						<div class="form-group">
							<label for="username">Username/Email</label>
							<input class="form-control" id="username" type="text" name="username" value="{{ old('username') }}" required autofocus>
						</div>
		
						<div class="form-group">
							<label for="password">Password</label>
							<input class="form-control" id="password" type="password" name="password" required value="password">
						</div>
		
						<div class="form-group" title="This is not recommended for shared devices">
							<div class="checkbox">
								<input id="remember" name="title" type="checkbox" {{ old('remember') ? 'checked' : '' }}>
								<label class="ml-1" for="remember">Remember Me</label>
							</div>
						</div>
		
						<p class="help-block" style="display: none;"></p>

						<div id="RedirectBlock" style="display: none;" class="alert alert-info mt-3">
							<span><span>&#128161;</span> After login, you will be redirected to <b id="RedirectBlockUrl"></b></span>
						</div>
					</div>
				</div>
	
				<div class="footer bg-light border-top p-2 text-right">
					<button class="btn btn-primary" type="submit">LOG IN</button>
				</div>
			</div>
		</form>
	</div>
@endif

