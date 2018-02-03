@foreach($projects as $project)
	<tr class="pointer project-row" tabindex="0" data-project-id="{{ $project->id }}" data-preview-url="{{ action('ProjectController@show', $project->id.'?preview=true' )}}" onclick="window.location='{{ action('ProjectController@show', $project->id)}}';" >
		@if($project->getPrimaryTopic() != null)
			<td>
				<a href="{{ action('ProjectController@byTopic', $project->getPrimaryTopic()->id) }}">{{ $project->getPrimaryTopic()->name }}</a>
			</td>
		@else
			<td>-</td>
		@endif

		<td>{{ $project->title }}</td>

		<td hidden title="{{ $project->description }}">{{ substr($project->description, 0, 50) }}...</td>

		<td hidden>{{ $project->description }}</td>

		<td>{{ $project->skills }}</td>

		<td @if($view == "supervisor") hidden @endif ><a href="{{ action('ProjectController@bySupervisor', $project->supervisor->id) }}">{{ $project->supervisor->user->getFullName() }}</a></td>
	</tr>
@endforeach
