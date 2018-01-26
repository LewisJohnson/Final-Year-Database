@foreach($projects as $project)
	<tr class="pointer" tabindex="0" @if($view == "transaction") title="Browse transactions for {{ $project->title }}" onclick="window.location='{{ action('ProjectController@transactions', $project->id)}}';" @else onclick="window.location='{{ action('ProjectController@show', $project->id)}}';"@endif >
		@if($project->getPrimaryTopic() != null)
			<td>
				<a href="{{ action('ProjectController@byTopic', $project->getPrimaryTopic()->id) }}">{{ $project->getPrimaryTopic()->name }}</a>
			</td>
		@else
			<td>No Topic</td>
		@endif

		<td>{{ $project->title }}</td>
		
		<td>{{ $project->description }}</td>

		<td @if($view != "supervisor") class="mobile--hidden" @endif style="@if($view == "supervisor") text-align: left; @endif">{{ $project->skills }}</td>
		@if($view != "supervisor")
			@if($project->supervisor)
				<td>
					<a href="{{ action('ProjectController@bySupervisor', $project->supervisor->id) }}">{{ $project->supervisor->user->getFullName() }}</a>
				</td>
			@else
				<td>
					<p>Error</p>
				</td>
			@endif
		@endif
	</tr>
@endforeach
