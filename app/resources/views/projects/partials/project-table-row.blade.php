<tr class="pointer project-row" tabindex="0" data-project-id="{{ $project }}" data-preview-url="{{ action('ProjectController@show', ['project' => $project, 'preview' => true] )}}" >
	@if($project->getPrimaryTopic() != null)
		<td>
			<a class="blue-link" href="{{ action('ProjectController@byTopic', $project->getPrimaryTopic()->id) }}">{{ $project->getPrimaryTopic()->name }}</a>
		</td>
	@else
		<td>-</td>
	@endif

	<td class="pointer" onclick="window.location='http://ce0ebc19.eu.ngrok.io/projects/8b1f596c-102f-44b6-a977-a1e1dbc39df0';">{{ $project->title }}</td>
	<td class="short-description" class="pointer" onclick="window.location='http://ce0ebc19.eu.ngrok.io/projects/8b1f596c-102f-44b6-a977-a1e1dbc39df0';">{!! substr(html_entity_decode($project->description), 0, 100) !!}@if(strlen($project->description) > 100)...@endif</td>
	<td class="pointer" onclick="window.location='http://ce0ebc19.eu.ngrok.io/projects/8b1f596c-102f-44b6-a977-a1e1dbc39df0';" >{!! html_entity_decode($project->description) !!}</td>
	<td class="pointer" onclick="window.location='http://ce0ebc19.eu.ngrok.io/projects/8b1f596c-102f-44b6-a977-a1e1dbc39df0';">{{ $project->skills }}</td>

	@if($view != "supervisor" || $view != "personal")
		<td>
			<a href="{{ action('UserController@projects', $project->supervisor->user) }}">{{ $project->supervisor->user->getFullName() }}</a>
		</td>
	 @endif

	 @if($view == "personal")
	 	<td>{{ $project->status }}</td>
	 @endif
</tr>
