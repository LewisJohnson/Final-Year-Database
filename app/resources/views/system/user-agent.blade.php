@extends('layouts.app')
@section('content')

@section('scripts')
	<script src="{{ asset('js/pagination/user-agent-pagination.js') }}"></script>

@endsection

@if(get_config_json('user_agent.collect_user_agent.value'))
	<div class="centered width--1200">
		<h1>User Agent Strings</h1>
		<h3>An overview of user agent strings.</h3>

		<div class="button-group button-group--horizontal button-group--links">
			@if(isset($_GET["unique"]))
				<a class="chip external-link" data-element-to-replace-with-loader-selector="#user-agent-table" data-element-to-hide-selector=".search-container, .button-group--links" href="{{ action('AdminController@userAgent')}}">Only first visits</a>
			@else
				<a class="chip active external-link" data-element-to-replace-with-loader-selector="#user-agent-table" data-element-to-hide-selector=".search-container, .button-group--links" href="{{ action('AdminController@userAgent', 'unique=true') }}">Only first visits</a>
			@endif
		</div>

		@if(!config_json('user_agent.collect_referrer.value'))
			<div class="config-tip">
				<p class="text-icon">&#128161;</p>
				<p>Referral URLs are currently not being collected. You can turn it back on in the system dashboard.</p>
			</div>
		@endif

		<table id="user-agent-table" class="data-table shadow-2dp" style="text-align: left">
			<thead>
				<tr>
					<th>User Agent</th>

					@if(get_config_json('user_agent.collect_referrer.value'))
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
	<div class="centered width--800 fancy-page">
		<div>
			<h1>User agent string collection is disabled.</h1>
			<p style="text-align: center;">You can turn it back on in the <a href="{{ action('AdminController@dashboard') }}">system dashboard</a>.</p>
		</div>
	</div>
@endif

@endsection
