@extends('layouts.app')
@section('content')

@if(SussexProjects\SystemSettings::get('collect_user_agent')->value == "true")
	<div class="centered mw-1200">
		<h1>User Agent Strings</h1>
		<h3>An overview of user agent strings.</h3>

		<div class="d-flex mt-3">
			@if(isset($_GET["unique"]))
				<a class="chip external-link" data-element-to-replace-with-loader-selector="#user-agent-table" data-element-to-hide-selector=".search-container, .button-group--links" href="{{ action('SystemAdminController@userAgentView')}}">Only first visits</a>
			@else
				<a class="chip active external-link" data-element-to-replace-with-loader-selector="#user-agent-table" data-element-to-hide-selector=".search-container, .button-group--links" href="{{ action('SystemAdminController@userAgentView', 'unique=true') }}">Only first visits</a>
			@endif
		</div>

		@if(SussexProjects\SystemSettings::get('collect_referrer')->value != "true")
			<div class="alert alert-info mt-3">
				<span>&#128161;</span><span class="ml-2">Referral URLs are currently not being collected. You can turn it back on in the System Settings.</span>
			</div>
		@endif

		<table id="user-agent-table" class="table data-table shadow-sm">
			<thead>
				<tr>
					<th>User Agent</th>

					@if(SussexProjects\SystemSettings::get('collect_referrer')->value == "true")
						<th>Referrer</th>
					@else
						<th></th>
					@endif
				</tr>
			</thead>
			<tbody>
				@include('system.partials.user-agent-row')
			</tbody>
		</table>
		<div style="margin: 1rem auto" class="loader loader--medium user-agent"></div>
	</div>
@else
	<div class="centered mw-800 text-center">
		<h1>User Agent String collection is currently disabled.</h1>
		<p class="text-muted">You can turn it back on in the <a href="{{ action('SystemSettingsController@index') }}">System Settings</a>.</p>
	</div>
@endif

@endsection
