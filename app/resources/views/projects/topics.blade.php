@extends('layouts.app')
@section ('content')
<div class="centered width--800">
	<h1>Projects by Topic</h1>
	<h3>Select a topic to browse related projects.</h3>
	<table class="data-table sort-table shadow-2dp">
		<thead>
			<tr>
				<th class="pointer">Topic</th>
				<th class="pointer">Projects</th>
			</tr>
		</thead>
		<tbody>
		@foreach($topics as $topic)
			@php
				$amountOfProjects = count($topic->getProjectsOnOffer());
			@endphp

			@if($amountOfProjects > 0)
				<tr tabindex="0" class="pointer" onclick="window.location='{{ action('ProjectController@byTopic', $topic->id)}}';">
					<td>{{ $topic->name }}</td>
					<td>{{ $amountOfProjects }}</td>
				</tr>
			@endif
		@endforeach
		</tbody>
	</table>
</div>
@endsection
