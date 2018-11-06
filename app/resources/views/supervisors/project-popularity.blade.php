@extends('layouts.app')

@section('scripts')
	<script type="text/javascript">
		Window["pageEnabled"] = {{ count($projects) >= 3 ? 'true' : 'false' }};
	</script>
	<script src="{{ asset('js/views/project-popularity.js') }}"></script>
@endsection

@section('content')
	@if(count($projects) < 3)
		<div class="centered width--800">
			<div class="fancy-page">
				<h1>Project Popularity</h1>
				<p class="subtitle">We need to gather a little bit more data before showing you this page, check back soon.</p>

				<div id="cogs">
					<div class="cog cog--large">@include('svg.cog')</div>
					<div class="cog cog--medium">@include('svg.cog')</div>
					<div class="cog cog--small">@include('svg.cog')</div>
				</div>
			</div>
		</div>
	@else
		<div class="centered width--800">
			<h1>Project Popularity</h1>
			<p class="subtitle">Your {{ count($projects) }} most popular on-offer {{ Session::get('education_level')["longName"] }} projects viewed by students.</p>

			<table class="data-table table--dark-head sort-table">
				<thead>
					<tr>
						<th class="pointer">Project</th>
						<th title="A view is counted when a student vists one of your project pages for longer than 5 seconds." class="pointer"><span class="dashed-underline">View Count</span></th>
					</tr>
				</thead>
				<tbody>
					@foreach($projects as $project)
						<tr class="project-row">
							<td><a class="title" href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a></td>
							<td class="views">{{ $project->view_count }}</td>
						</tr>
					@endforeach
				</tbody>
			</table>

			<h2>Word Cloud</h2>
			<div id="word-cloud" style="height: 800px"></div>
		</div>
	@endif
@endsection
