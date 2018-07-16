<tr class="pointer project-row" tabindex="0" data-project-id="{{ $project->id }}" data-preview-url="{{ action('ProjectController@show', ['project' => $project, 'preview' => true] )}}" >
	@if($project->getPrimaryTopic() != null)
		<td>
			<a class="blue-link" href="{{ action('ProjectController@byTopic', $project->getPrimaryTopic()->id) }}">{{ $project->getPrimaryTopic()->name }}</a>
		</td>
	@else
		<td>-</td>
	@endif

	<td><a href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
	<td class="short-description" >{!! substr(html_entity_decode($project->description), 0, 100) !!}@if(strlen($project->description) > 100)...@endif</td>
	<td>{!! html_entity_decode($project->description) !!}</td>
	<td>{{ $project->skills }}</td>

	@if($view != "supervisor" || $view != "personal")
		<td>
			<a href="{{ action('UserController@projects', $project->supervisor->user) }}">{{ $project->supervisor->user->getFullName() }}</a>
		</td>
	 @endif

	 @if($view == "personal")
	 	<td>{{ $project->status }}</td>
	 @endif
</tr>
