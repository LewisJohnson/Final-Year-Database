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

			<div class="loader-container">
				<div class="loader loader--large"></div>
				<p>One moment, the numbers are being crunched...</p>
			</div>

			<div class="content">
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
							<tr class="project-row" data-title="{{ $project->title }}" data-description="{{ $project->description }}">
								<td><a href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a></td>
								<td>{{ $project->view_count }}</td>
							</tr>
						@endforeach
					</tbody>
				</table>

				<hr style="margin: 20px 0 ">

				<h2>Word Cloud</h2>

				<div class="flex flex--row flex--stretch-children">
					<span>The Word Cloud shows the most used words in your projects.</span>

					<div class="form-field--toggle" style="text-align: right">
						<p class="switch-label" style="top: 0" >Exclude descriptions</p>
						<label class="toggle">
							<input type="checkbox" id="word-cloud-exclude-description" class="boolean-checkbox">
							<span class="slider"></span>
						</label>
					</div>
				</div>

				<canvas width="800" height="400" id="word-cloud"></canvas>
				<canvas width="800" height="400" hidden id="word-cloud-title-only"></canvas>
			</div>
		</div>
	@endif
@endsection
