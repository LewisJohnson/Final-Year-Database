@extends('layouts.app')
@section('content')

@section('scripts')
	<script src="{{ asset('js/pagination/user-agent-pagination.js') }}"></script>

@endsection

<div class="centered width-1200">
	<h1>User Agent Strings</h1>
	<h3>An overview of user agent strings.</h3>


	<div class="button-group button-group--horizontal button-group--links">
		@if(isset($_GET["unique"]))
			<a class="chip external-link" data-element-to-replace-with-loader-selector="#user-agent-table" data-element-to-hide-selector=".search-container, .button-group--links" href="{{ action('AdminController@userAgent')}}">Only first visits</a>
		@else
			<a class="chip active external-link" data-element-to-replace-with-loader-selector="#user-agent-table" data-element-to-hide-selector=".search-container, .button-group--links" href="{{ action('AdminController@userAgent', 'unique=true') }}">Only first visits</a>
		@endif
	</div>

	<table id="user-agent-table" class="data-table shadow-2dp" style="text-align: left">
		<thead>
			<tr>
				<th>User Agent</th>

				@if(config_json('user_agent.collect_referrer.value'))
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
@endsection
