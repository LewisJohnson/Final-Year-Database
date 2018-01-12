<tr>
	<td><a href="{{ action('ProjectController@show', $project->id) }}" class="project-link">{{ $project->title }}</a></td>
	@if($project->getPrimaryTopic() != null)
		<td>
			<a href="{{ action('ProjectController@byTopic', $project->getPrimaryTopic()->id) }}">{{ $project->getPrimaryTopic()->name }}</a>
		</td>
	@else
		<td>No Topic</td>
	@endif
	<td>{{ ucfirst(str_replace('-', ' ', $project->status)) }}</td>
	<td style="width: 10px;">
		<a class="button button--svg" title="Edit {{ $project->title }}" href="{{ action('ProjectController@edit', $project->id) }}">
			@include('svg.pencil')
		</a>
	</td>
	<td style="width: 10px;">
		<form class="delete-project" action="{{ action('ProjectController@destroy', $project->id) }}" data-project-title="{{ $project->title }}" method="DELETE" accept-charset="utf-8">
			<button type="submit" class="button button--svg button--danger" title="Delete {{ $project->title }}">
				@include('svg.bin')
			</button>
		</form>
	</td>
</tr>
