@extends('layouts.app')
@section('pageTitle', 'Project Popularity')

@section('scripts')
	<script src="{{ asset('js/views/project-popularity.js') }}"></script>
@endsection

@section('content')
	<div class="centered mw-800">
		<h1>Project Popularity</h1>

		<div class="loader-container">
			<div class="spinner spinner-grow"></div>
			<p>One moment, the numbers are being crunched...</p>
		</div>

		<div class="content">
			<p class="subtitle">Your {{ count($projects) }} most popular on-offer {{ get_el_long_name() }} projects viewed by students.</p>

			<table class="table table-hover bg-white data-table sort-table">
				<thead>
					<tr>
						<th class="cursor--pointer">Project</th>
						<th title="A view is counted when a student visits one of your project pages for longer than 5 seconds." class="cursor--pointer"><span class="dashed-underline">View Count</span></th>
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

			<div class="flex flex--row flex--stretch-children mb-3">
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
			<canvas width="800" height="400" id="word-cloud-title-only" style="display: none"></canvas>
		</div>
	</div>
@endsection
