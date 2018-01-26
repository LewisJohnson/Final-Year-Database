@foreach($projects as $project)
	<tr class="pointer" tabindex="0" onclick="window.location='{{ action('ProjectController@show', $project->id)}}';" >
		@if($project->getPrimaryTopic() != null)
			<td>
				<a href="{{ action('ProjectController@byTopic', $project->getPrimaryTopic()->id) }}">{{ $project->getPrimaryTopic()->name }}</a>
			</td>
		@else
			<td>No Topic</td>
		@endif

		<td>{{ $project->title }}</td>

		<td hidden>{{ $project->description }}</td>

		<td>{{ $project->skills }}</td>

		<td  @if($view == "supervisor") hidden @endif ><a href="{{ action('ProjectController@bySupervisor', $project->supervisor->id) }}">{{ $project->supervisor->user->getFullName() }}</a></td>
	</tr>
@endforeach
