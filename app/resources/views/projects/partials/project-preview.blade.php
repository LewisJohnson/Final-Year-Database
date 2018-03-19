<div class="project-preview">
	<div class="project">
		<h1 class="title">{{ $project->title }}</h1>
		<h2 class="supervisor">{{ $project->supervisor->user->getFullName() }}</h2>

		<h3>Description</h3>
		<p>{!! html_entity_decode($project->description) !!}</p>

		<h3>Skills</h3>
		<p>{{ $project->skills }}</p>

		<h3>Topics</h3>
		<ul class="topics-list">
			@if(count($project->topics))
				@foreach($project->topics as $topic)
					@if($project->getPrimaryTopic())
						<li class="pointer topic{!! ($topic->id == $project->getPrimaryTopic()->id) ? ' primary first': '' !!}" onclick="window.location='{{ action('ProjectController@byTopic', $topic) }}';">
							<p>{{ $topic->name }}</p>
						</li>
					@else
						<li class="pointer topic" onclick="window.location='{{ action('ProjectController@byTopic', $topic) }}';">
							<p>{{ $topic->name }}</p>
						</li>
					@endif
				@endforeach
			@else
				<p>This project has no associated topics.</p>
			@endif
		</ul>
	</div>
</div>
