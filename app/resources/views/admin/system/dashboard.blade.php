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
<div class="centered width--1000">
	<h1>System Dashboard</h1>
	<h3>Configure system variables and parameters.</h3>

	<div class="admin hub">
		<div class="card tab-card">
			<ul class="tab-container" data-help-footer="false" data-cookie-name="cadt">
				<li class="tab" data-tab-name="System">
					<button class="button open-tab">System</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>System</h2>
						<div class="dashboard-section">
							<h3>Environment</h3>
							<p>To configure environment variables, edit the <b>.env</b> file in the <b>root</b> directory. A server restart is required for changes to take effect.</p>
							<div class="config-danger">
								<p class="text-icon">&#9888;&#65039;</p>
								<p><b>Be careful!</b> You might break something making the website unusable.</p>
							</div>
						</div>

						<div class="dashboard-section">
							<h3>Laravel</h3>
							<p>To configure Lavavel (Server) variables, edit any <b>config\*.php</b> file. A server restart <em>might be</em> required for changes to take effect.</p>
						</div>

						<div class="dashboard-section">
							<h3>System</h3>
							<p>To manually configure system variables, edit the <b>storage\app\config\config.json</b>, otherwise use the system dashboard. Changes will take effect immediately.</p>
						</div>

						<div class="dashboard-section">
							<h3>Style</h3>
							<p>To configure style variables, edit <b>resources\assets\sass\_variables.scss</b>.
								The SCSS\SASS bundle will have to be recompiled for changes to take effect.
								To do this, run this command in the <b>root</b> directory.</p>
							<code>npm run production</code>
						</div>

						<div class="dashboard-section">
							<h3>JavaScript</h3>
							<p>To configure JavaScript variables, edit <b>resources\assets\config.js</b>.
								You will have to re-bundle the JavaScript files with Webpack for changes to take effect.
								To do this, run this command in the <b>root</b> directory.</p>

							<code>npm run production</code>

							<h4>Hotfix</h4>
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

				<li class="tab" data-tab-name="Departments">
					<button class="button open-tab">Departments</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>Departments</h2>

						<h3>Existing</h3>
						<ul class="department-list">
							@foreach(departments() as $dep)
								<li class="flex flex--row" style="margin-bottom: 5px">
									<p>{{ ucfirst($dep) }}</p>
									<button type="button" class="button button--danger ml-auto">DELETE</button>
								</li>
							@endforeach
						</ul>

						<h3>Add New Department</h3>
						<form class="form form--flex" role="form" method="POST" action="{{ action('AdminController@addNewDepartment') }}">
							{{ csrf_field() }}
							<input type="text" name="" value="" placeholder="">
							<div class="form-field form-field--flex">
								<button class="button button--raised button--accent" type="submit">Save</button>
							</div>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="Display">
					<button class="button open-tab">Display</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>Display</h2>
						<form class="form form--flex" role="form" method="POST" action="{{ action('AdminController@configure') }}">
							{{ csrf_field() }}

							<label for="names">Names</label>
							<label class="description">{{ config_json("display.names.description") }}</label>
							<input type="hidden" name="names-json" value="display.names">
							<select name="names" id="names">
								@foreach(config_json("display.names.type") as $type)
									<option @if($type == config_json("display.names.value")) selected @endif value="{{ $type }}">{{ ucfirst($type) }}</option>
								@endforeach
							</select>

							<div class="form-field form-field--flex">
								<button class="button button--raised button--accent" type="submit">Save</button>
							</div>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="User Agent">
					<button class="button open-tab">User Agent</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>User Agent</h2>
						<form class="form form--flex" role="form" method="POST" action="{{ action('AdminController@configure') }}">
							{{ csrf_field() }}

							<div class="form-field form-field--flex form-field--toggle">
								<p class="switch-label" for="user_agent">Collect user agent strings</p>
								<label class="toggle">
									<input type="checkbox" name="coolect_user_agent" id="coolect_user_agent"class="boolean-checkbox" @if(config_json('user_agent.collect_user_agent.value')) checked @endif>
									<span class="slider"></span>
								</label>
							</div>
							<label class="description">{{ config_json("user_agent.collect_user_agent.description") }}</label>
							<input type="hidden" name="coolect_user_agent-json" value="user_agent.collect_user_agent">

							<div class="form-field form-field--flex form-field--toggle">
								<p class="switch-label" for="collect_referrer">Collect referrer url</p>
								<label class="toggle">
									<input type="checkbox" name="collect_referrer" id="collect_referrer" class="boolean-checkbox" @if(config_json('user_agent.collect_referrer.value')) checked @endif>
									<span class="slider"></span>
								</label>
							</div>
							<label class="description">{{ config_json("user_agent.collect_referrer.description") }}</label>
							<input type="hidden" name="collect_referrer-json" value="user_agent.collect_referrer">

							<div class="form-field form-field--flex">
								<button class="button button--raised button--accent" type="submit">Save</button>
							</div>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="Header">
					<button class="button open-tab">Header</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>Header</h2>
						<form class="form form--flex" role="form" method="POST" action="{{ action('AdminController@configure') }}">
							{{ csrf_field() }}

							<div class="form-field">
								<label for="header_logo_url">Logo URL</label>
								<label class="description">{{ config_json("header.logo_url.description") }}</label>
								<input type="text" name="header_logo_url" id="header_logo_url" value="{{ config_json("header.logo_url.value") }}">
							</div>
							<input type="hidden" name="header_logo_url-json" value="header.logo_url">

							<div class="form-field">
								<label for="header_background">Background</label>
								<label class="description">{{ config_json("header.background.description") }}</label>
								<label class="description"> Accepted types:
									@foreach(config_json("header.background.type") as $type)
										<span>{{ $type }}@if(!$loop->last), @endif</span>
									@endforeach
								</label>
								<input type="text" name="header_background" id="header_background" value="{{ config_json("header.background.value") }}">
							</div>

							<input type="hidden" name="header_background-json" value="header.background">

							<div class="form-field form-field--flex">
								<button class="button button--raised button--accent" type="submit">Save</button>
							</div>
						</form>
					</div>
				</li>

				<li class="tab" data-tab-name="Footer">
					<button class="button open-tab">Footer</button>
					<div class="content" aria-expanded="false" aria-hidden="true">
						<h2>Footer</h2>
						<form class="form" role="form" method="POST" action="{{ action('AdminController@configure') }}">
							{{ csrf_field() }}

							<div class="form-field form-field--flex form-field--toggle">
								<p class="switch-label" for="accessibility_buttons">Show accessibility buttons</p>
								<label class="toggle">
									<input type="checkbox" name="accessibility_buttons" id="accessibility_buttons" class="boolean-checkbox" @if(config_json("footer.accessibility_buttons.value")) checked @endif>
									<span class="slider"></span>
								</label>
							</div>
							<label class="description">{{ config_json("footer.accessibility_buttons.description") }}</label>
							<input type="hidden" name="accessibility_buttons-json" value="footer.accessibility_buttons">

							<div class="form-field form-field--flex form-field--toggle">
								<p class="switch-label" for="footer_rainbow">Show rainbow</p>
								<label class="toggle">
									<input type="checkbox" name="footer_rainbow" id="footer_rainbow" class="boolean-checkbox" @if(config_json("footer.rainbow.value")) checked @endif>
									<span class="slider"></span>
								</label>
							</div>
							<label class="description">{{ config_json("footer.rainbow.description") }}</label>
							<input type="hidden" name="footer_rainbow-json" value="footer.rainbow">

							<div class="form-field form-field--flex">
								<button type="submit" class="button button--raised button--accent">Save</button>
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
