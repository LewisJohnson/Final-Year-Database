{{-- ===============================================================
	NOTICE: You MUST use boolean checkbox values.
			Failure to do so will result in a broken POST request.

			<input type="checkbox" class="boolean-checkbox">

	================================================================ --}}


@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/tab-view.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1000">
	<h1>System Settings</h1>
	<h5>Configure {{ ucfirst(Session::get('department')) }} {{ ucfirst(get_el_long_name()) }} system settings.</h5>

	<div class="card tab-card mt-5">
		<ul class="tab-container mb-0" data-cookie-name="cadt">
			<li class="tab" data-tab-name="Style">
				<button class="btn w-100 text-left js-tab-button">Style</button>
				<div class="content" aria-expanded="false" aria-hidden="true">
					<h2>Style</h2>
					<form class="form d-flex flex-column" role="form" method="POST" action="{{ action('SystemSettingsController@update') }}">
						{{ csrf_field() }}

						@foreach (SussexProjects\SystemSettings::getBySection('style') as $setting)
							<div class="form-group w-100">
								<span>{{ title_case(str_replace('_', ' ', $setting->name)) }}</span>
								<br>	
								<label class="text-muted" style="position: relative; top: -5px"><small>{{ $setting->description }}</small></label>

								@switch($setting->type)
									@case("string")
										<input class="form-control" type="text" name="{{ $setting->name }}" value="{{ $setting->value }}">
										@break
									@case("bool")
										<br>
										<label class="toggle">
											<input type="checkbox" name="{{ $setting->name }}" class="boolean-checkbox" @if($setting->value == "true") checked @endif>
											<span class="slider"></span>
										</label>
										@break
									@default
										<p class="text-danger">PLEASE CONTACT DEVELOPER</p>
								@endswitch
							</div>
						@endforeach
						<div class="text-right mt-3">
							<button class="btn btn-primary" type="submit">Save</button>
						</div>
					</form>
				</div>
			</li>

			
			<li class="tab" data-tab-name="Telemetry">
				<button class="btn w-100 text-left js-tab-button">Telemetry</button>
				<div class="content" aria-expanded="false" aria-hidden="true">
					<h2>Telemetry</h2>
					<form class="form d-flex flex-column" role="form" method="POST" action="{{ action('SystemSettingsController@update') }}">
						{{ csrf_field() }}

						@foreach (SussexProjects\SystemSettings::getBySection('telemetry') as $setting)
							<div class="form-group w-100">
								<span>{{ title_case(str_replace('_', ' ', $setting->name)) }}</span>
								<br>	
								<label class="text-muted" style="position: relative; top: -5px"><small>{{ $setting->description }}</small></label>

								@switch($setting->type)
									@case("string")
										<input class="form-control" type="text" name="{{ $setting->name }}" value="{{ $setting->value }}">
										@break
									@case("bool")
										<br>
										<label class="toggle">
											<input type="checkbox" name="{{ $setting->name }}" class="boolean-checkbox" @if($setting->value == "true") checked @endif>
											<span class="slider"></span>
										</label>
										@break
									@default
										<p class="text-danger">PLEASE CONTACT DEVELOPER</p>
								@endswitch
							</div>
						@endforeach
						<div class="text-right mt-3">
							<button class="btn btn-primary" type="submit">Save</button>
						</div>
					</form>
				</div>
			</li>

			<li><hr style="opacity: 0.6;"></li>

			<li class="tab" data-tab-name="Info">
				<button class="btn w-100 text-left js-tab-button">Info</button>
				<div class="content" aria-expanded="false" aria-hidden="true">
					<h2>Info</h2>
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
		</ul>

		<div class="content-host">
			<div class="content"></div>
		</div>
	</div>
</div>
@endsection
