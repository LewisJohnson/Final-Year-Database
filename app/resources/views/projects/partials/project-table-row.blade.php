<tr class="pointer project-row" tabindex="0" data-project-id="{{ $project }}" data-preview-url="{{ action('ProjectController@show', ['project' => $project, 'preview' => true] )}}" onclick="window.location='{{ action('ProjectController@show', $project->id)}}';" >
	@if($project->getPrimaryTopic() != null)
		<td>
			<a href="{{ action('ProjectController@byTopic', $project->getPrimaryTopic()->id) }}">{{ $project->getPrimaryTopic()->name }}</a>
		</td>
	@else
		<td>-</td>
	@endif

	<td>{{ $project->title }}</td>
	<td class="short-description" hidden>{!! substr(html_entity_decode($project->description), 0, 100) !!}@if(strlen($project->description) > 100)...@endif</td>
	<td hidden>{!! html_entity_decode($project->description) !!}</td>
	<td>{{ $project->skills }}</td>

	<td @if($view == "supervisor") hidden @endif >
		<a href="{{ action('UserController@projects', $project->supervisor->user) }}">{{ $project->supervisor->user->getFullName() }}</a>
	</td>
</tr>