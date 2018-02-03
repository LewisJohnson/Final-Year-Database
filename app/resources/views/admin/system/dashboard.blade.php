@extends('layouts.app')
@section('content')
@section('scripts')
	<script src="{{ asset('js/views/tab-view.js') }}"></script>
@endsection
<div class="centered width-1000">
	<h1>System Dashboard</h1>
	<h3>Adjust system parameters.</h3>

	<div class="admin hub">
		<div class="card card--margin-vertical tab-card--horizontal">
			<ul class="tab-container tab-container--vertical" data-help-footer="false" data-cookie-name="cadt">
				<li class="tab selected" data-tab-name="system">
					<button class="button open-tab">System</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>System</h2>
						<form class="form" role="form" method="POST" action"/d">
							<div class="form-field">
								<label class="toggle">
									<input type="checkbox">
									<span class="slider"></span>
									<span class="switch-label">Debug Mode</span>
								</label>
							</div>

							<div class="form-field">
								<label for="access_type">Application Environment</label>
								<select name="access_type" name="access_type">
									<option value="student">Production</option>
									<option value="staff">Development</option>
								</select>
							</div>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="authentication">
					<button class="button open-tab">Authentication</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>Authentication</h2>
						<form class="form" role="form" method="POST" action"/d">
							<label for="access_type">Authorisation Access</label>
							<select name="access_type" name="access_type">
								<option value="student">Strict</option>
								<option value="staff">Lax</option>
								<option selected value="supervisor">Warn</option>
							</select>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="User Agent">
					<button class="button open-tab">User Agent</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>User Agent</h2>
						<form class="form form--flex" role="form" method="POST" action"/d">
							<div class="form-field">
								<label class="toggle">
									<input type="checkbox">
									<span class="slider"></span>
									<span class="switch-label">Collect user agent strings</span>
								</label>
							</div>

							<div class="form-field">
								<label class="toggle">
									<input type="checkbox">
									<span class="slider"></span>
									<span class="switch-label">Collect referrer url</span>
								</label>
							</div>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="Header">
					<button class="button open-tab">Header</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>Header</h2>
						<form class="form form--flex" role="form" method="POST" action"/d">
							<div class="form-field">
								<label for="title">Logo</label>
								<input id="title" type="text" name="title">
							</div>

							<div class="form-field">
								<label for="title">Background</label>
								<input id="title" type="text" name="title">
							</div>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="Footer">
					<button class="button open-tab">Footer</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>Footer</h2>
						<form class="form form--flex" role="form" method="POST" action"/d">
							<div class="form-field">
								<label class="toggle">
									<input type="checkbox">
									<span class="slider"></span>
									<span class="switch-label">Show rainbow</span>
								</label>
							</div>

							<div class="form-field">
								<label class="toggle">
									<input type="checkbox">
									<span class="slider"></span>
									<span class="switch-label">Show accessibilty buttons</span>
								</label>
							</div>
						</form>
					</div>
				</li>
			</ul>

			<div class="content-host">
				<div class="content"></div>
			</div>
		</div>
	</div>
</div>
@endsection
