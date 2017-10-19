@extends('layouts.app')
@section ('content')
<div class="centered mw-800">
	<h1>Projects by Topic</h1>
	<h5>Select a topic to browse related projects.</h5>
	
	<table class="table table-hover bg-white data-table mt-3 sort-table shadow-sm">
		<thead>
			<tr>
				<th>Topic</th>
				<th class="text-right">Projects</th>
			</tr>
		</thead>
		<tbody>
			@foreach($topics as $topic)
				<tr class="cursor--pointer" onclick="window.location='{{ action('ProjectController@byTopic', $topic->id)}}'">
					<td>{{ $topic->name }}</td>
					<td class="text-right">{{ $topic->project_count }}</td>
				</tr>
			@endforeach
		</tbody>
	</table>
</div>
@endsection
