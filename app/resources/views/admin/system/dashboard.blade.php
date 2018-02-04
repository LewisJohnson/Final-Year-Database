@extends('layouts.app')
@section('content')
@section('scripts')
	<script src="{{ asset('js/views/tab-view.js') }}"></script>
@endsection
<div class="centered width-1000">
	<h1>System Dashboard</h1>
	<h3>Configure system variables and parameters.</h3>

	<div class="admin hub">
		<div class="card tab-card">
			<ul class="tab-container" data-help-footer="false" data-cookie-name="cadt">
				<li class="tab" data-tab-name="System">
					<button class="button open-tab">System</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<div class="dashboard-section">
							<h2>Enviroment</h2>
							<p>To configure enviroment variables, edit the <b>.env</b> file in the <b>root</b> directory. A server restart is required for changes to take effect.</p>
							<div class="config-danger">
								<p class="text-icon">&#9888;&#65039;</p>
								<p><b>Be careful!</b> You might break something making the website unusable.</p>
							</div>
						</div>

						<div class="dashboard-section">
							<h2>Laravel</h2>
							<p>To configure Lavavel (Server) variables, edit any <b>config\*.php</b> file. A server restart <em>might be</em> required for changes to take effect.</p>
						</div>

						<div class="dashboard-section">
							<h2>System</h2>
							<p>To manually configure system variables, edit the <b>config\config.json</b>, otherwise use the system dashboard. Changes will take effect immediately.</p>
						</div>

						<div class="dashboard-section">
							<h2>Style</h2>
							<p>To configure style variables, edit <b>resources\assets\sass\_variables.scss</b>.
								The SCSS\SASS bundle will have to be recompiled for changes to take effect.
								To do this, run this command in the <b>root</b> directory.</p>
							<code>npm run production</code>
						</div>

						<div class="dashboard-section">
							<h2>JavaScript</h2>
							<p>To configure JavaScript variables, edit <b>resources\assets\config.js</b>.
								You will have to re-bundle the JavaScript files with Webpack for changes to take effect.
								To do this, run this command in the <b>root</b> directory.</p>

							<code>npm run production</code>

							<h3>Hotfix</h3>
							<p>If you want to apply a hotfix (Apply changes without having to re-bundle JavaScript), you may edit the <b>\public\js\config.js</b> file.</p>

							<div class="config-tip">
								<p class="text-icon">&#128161;</p>
								<p>Hotfix changes will be overwritten when Webpack is re-bundled.</p>
							</div>

							<div class="config-danger">
								<p class="text-icon">&#9888;&#65039;</p>
								<p><b>Be careful!</b> You might break something making the website unusable.</p>
							</div>
						</div>
					</div>
				</li>

				<li class="tab" data-tab-name="authentication">
					<button class="button open-tab">Authentication</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>Authentication</h2>
						<form class="form" role="form" method="POST" action="{{ action('AdminController@configure') }}">
							{{ csrf_field() }}

							<label for="access_type">Authorisation Access</label>
							<label class="description">{{ env_json("system.authorisation_access.description") }}</label>
							
							<input type="hidden" name="access_type-json" value="system.authorisation_access">
							<select name="access_type" id="access_type">
								@foreach(env_json("system.authorisation_access.type") as $type)
									<option @if($type == env_json("system.authorisation_access.value")) selected @endif value="{{ $type }}">{{ ucfirst($type) }}</option>
								@endforeach
							</select>


							<div class="form-field form-field--flex form-field--toggle">
								<button class="button button--raised button--accent" type="submit">Save</button>
							</div>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="User Agent">
					<button class="button open-tab">User Agent</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>User Agent</h2>
						<form class="form form--flex" role="form" method="POST" action="/d">
							{{ csrf_field() }}
							<div class="form-field form-field--flex form-field--toggle">
								<p class="switch-label" for="userAgentToggle">Collect user agent strings</p>
								<label class="toggle">
									<input id="userAgentToggle" type="checkbox">
									<span class="slider"></span>
								</label>
							</div>

							<div class="form-field form-field--flex form-field--toggle">
								<p class="switch-label" for="referrerToggle">Collect referrer url</p>
								<label class="toggle">
									<input id="referrerToggle" type="checkbox">
									<span class="slider"></span>
								</label>
							</div>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="Header">
					<button class="button open-tab">Header</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>Header</h2>
						<form class="form form--flex" role="form" method="POST" action="/d">
							{{ csrf_field() }}
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
						<form class="form" role="form" method="POST" action="/">
							{{ csrf_field() }}
							<div class="form-field form-field--flex form-field--toggle">
								<p class="switch-label" for="accButtonsToggle">Show accessibilty buttons</p>
								<label class="toggle">
									<input id="accButtonsToggle" type="checkbox">
									<span class="slider"></span>
								</label>
							</div>

							<div class="form-field form-field--flex form-field--toggle">
								<p class="switch-label" for="rainbowToggle">Show rainbow</p>
								<label class="toggle">
									<input id="rainbowToggle" type="checkbox">
									<span class="slider"></span>
								</label>
							</div>
						</form>
					</div>
				</li>

				<li style="width: 100%; height: 100%; background: rgba(0,0,0,0.01)"></li>
			</ul>

			<div class="content-host">
				<div class="content"></div>
			</div>
		</div>
	</div>
</div>
@endsection
