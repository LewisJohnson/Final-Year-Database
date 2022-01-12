<div class="project-preview text-left text-dark">
	<div class="project">
		<h2 class="title">{{ $project->title }}</h2>
		<h3 class="supervisor">{{ $project->supervisor->user->getFullName() }}</h3>

		<h5>Description</h5>
		<p>{!! html_entity_decode($project->description) !!}</p>

		<h5>Skills</h5>
		<p>{{ $project->skills }}</p>

		<h5>Topics</h5>
		<ul class="topics-list">
			@if(count($project->topics))
				@foreach($project->topics as $topic)
					@if($project->getPrimaryTopic())
						<li class="cursor--pointer topic{!! ($topic->id == $project->getPrimaryTopic()->id) ? ' primary first': '' !!}" onclick="window.location='{{ action('ProjectController@byTopic', $topic) }}';">
							<p>{{ $topic->name }}</p>
						</li>
					@else
						<li class="cursor--pointer topic" onclick="window.location='{{ action('ProjectController@byTopic', $topic) }}';">
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
