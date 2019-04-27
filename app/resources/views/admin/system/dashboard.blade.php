{{-- ===============================================================
	NOTICE: You MUST use boolean checkbox values.
			Failure to do so will result in a broken POST request.

			<input type="checkbox" class="boolean-checkbox">

	================================================================ --}}

@extends('layouts.app')
@section('content')
@section('scripts')
	<script src="{{ asset('js/views/tab-view.js') }}"></script>
@endsection
<div class="centered mw-1000">
	<h1>System Dashboard</h1>
	<h5>Configure system variables and parameters.</h5>

	<div class="card tab-card mt-5">
		<ul class="tab-container mb-0" data-cookie-name="cadt">
			<li class="tab" data-tab-name="System">
				<button class="btn w-100 text-left js-tab-button">System</button>
				<div class="content" aria-expanded="false" aria-hidden="true">
					<h2>System</h2>
					<div class="dashboard-section">
						<h5>Environment</h5>
						<p>
							To configure environment variables, edit the <b>.env</b> file in the <b>root</b> directory.
							A server restart is required for changes to take effect.
						</p>
					</div>

					
					<h5 class="mt-3">Laravel</h5>
					<p>
						To configure Lavavel (Server) variables, edit any <code>config\*.php</code> file.
						A server restart <em>might be</em> required for changes to take effect.
					</p>
					
					<h5 class="mt-3">System</h5>
					<p>
						To manually configure system variables, edit the <code>storage\app\config\config.json</code>, otherwise use the system dashboard.
						Changes will take effect immediately.
					</p>
					
					<h5 class="mt-3">Style</h5>
					<p>
						To configure style variables, edit <code>resources\assets\sass\_variables.scss</code>.
						The SCSS\SASS bundle will have to be recompiled for changes to take effect.
						To do this, run the following command;
					</p>
					<code>npm run prod</code>
								
					<h5 class="mt-3">JavaScript</h5>
					<p>To configure JavaScript variables, edit <code>resources\assets\config.js</code>.
						You will have to re-bundle the JavaScript files with Webpack for changes to take effect.
						To do this, run the following command;
					</p>

					<code>npm run prod</code>
				</div>
			</li>

			<li class="tab" data-tab-name="Departments">
				<button class="btn w-100 text-left js-tab-button">Departments</button>
				<div class="content" aria-expanded="false" aria-hidden="true">
					<h2>Departments</h2>

					<h5>New Department</h5>
					<p>To add a new department, contact Lewis Johnson.</p>

					<h5>Existing Departments</h5>
					<ul>
						@foreach(get_departments() as $dep)
							<li>
								{{ ucfirst($dep) }}
							</li>
						@endforeach
					</ul>
				</div>
			</li>

			<li class="tab" data-tab-name="User Agent">
				<button class="btn w-100 text-left js-tab-button">User Agent</button>
				<div class="content" aria-expanded="false" aria-hidden="true">
					<h2>User Agent</h2>
					<form class="form d-flex flex-column" role="form" method="POST" action="{{ action('SystemAdminController@updateSystemConfiguration') }}">
						{{ csrf_field() }}

						<div class="form-group form-group--flex form-group--toggle">
							<p class="switch-label" for="user_agent">Collect user agent strings</p>
							<label class="toggle">
								<input type="checkbox" name="collect_user_agent" id="collect_user_agent"class="boolean-checkbox" @if(get_config_json('user_agent.collect_user_agent.value')) checked @endif>
								<span class="slider"></span>
							</label>
						</div>
						<label class="description">{{ get_config_json("user_agent.collect_user_agent.description") }}</label>
						<input type="hidden" name="collect_user_agent-json" value="user_agent.collect_user_agent">

						<div class="form-group form-group--flex form-group--toggle">
							<p class="switch-label" for="collect_referrer">Collect referrer url</p>
							<label class="toggle">
								<input type="checkbox" name="collect_referrer" id="collect_referrer" class="boolean-checkbox" @if(get_config_json('user_agent.collect_referrer.value')) checked @endif>
								<span class="slider"></span>
							</label>
						</div>
						<label class="description">{{ get_config_json("user_agent.collect_referrer.description") }}</label>
						<input type="hidden" name="collect_referrer-json" value="user_agent.collect_referrer">

						<div class="form-group form-group--flex">
							<button class="btn w-100 text-left button--raised button--accent" type="submit">Save</button>
						</div>
					</form>
				</div>
			</li>

			<li class="tab" data-tab-name="Header">
				<button class="btn w-100 text-left js-tab-button">Header</button>
				<div class="content" aria-expanded="false" aria-hidden="true">
					<h2>Header</h2>
					<form class="form d-flex flex-column" role="form" method="POST" action="{{ action('SystemAdminController@updateSystemConfiguration') }}">
						{{ csrf_field() }}
						<h5>Logo</h5>
						<div class="form-group">
							<p class="text-muted">{{ get_config_json("header.logo_url.description") }}</p>
							<input class="form-control" type="text" name="header_logo_url" id="header_logo_url" value="{{ get_config_json("header.logo_url.value") }}">
						</div>
						<input type="hidden" name="header_logo_url-json" value="header.logo_url">

						<h5>Accent Colour</h5>
						<div class="form-group">
							<label for="header_background">Background</label>
							<label class="text-muted">{{ get_config_json("header.background.description") }}</label>
							<label class="text-muted"> Accepted types:
								@foreach(get_config_json("header.background.type") as $type)
									<span>{{ $type }}@if(!$loop->last), @endif</span>
								@endforeach
							</label>
							<input class="form-control" type="text" name="header_background" id="header_background" value="{{ get_config_json("header.background.value") }}">
						</div>

						<input type="hidden" name="header_background-json" value="header.background">

						<div class="text-right">
							<button class="btn btn-primary" type="submit">Save</button>
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
@endsection
