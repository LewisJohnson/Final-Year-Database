<tr class="project-row @if($project->status != "on-offer") border-left border-{{ $project->getStatusAsBootstrapClass() }} @endif" data-project-id="{{ $project->id }}" data-preview-url="{{ action('ProjectController@show', ['project' => $project, 'preview' => true] )}}" >
	
	@if($view != "topic")
		@if($project->getPrimaryTopic() != null)
			<td>
				<a class="blue-link" href="{{ action('ProjectController@byTopic', $project->getPrimaryTopic()->id) }}">{{ $project->getPrimaryTopic()->name }}</a>
			</td>
		@else
			<td>-</td>
		@endif
	@endif
	
	<td><a href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
	<td>{{ $project->getShortDescription() }}</td>
	<td>{!! html_entity_decode($project->description, ENT_HTML5 | ENT_COMPAT) !!}</td>
	<td>{{ $project->skills }}</td>

	@if(!($view == "supervisor" || $view == "personal"))
		<td>
			<a href="{{ action('UserController@projects', $project->supervisor->user) }}">{{ $project->supervisor->user->getFullName() }}</a>
		</td>
	@endif

	@if($view == "personal")
		<td>{{ $project->getStatus() }}</td>
	@endif
</tr>
