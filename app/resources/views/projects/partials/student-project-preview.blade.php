<div class="project-preview project-preview--student">
	<div class="project">
		
		<h2 class="text-capitalize text-center">{{ $project->title }}</h2>

		@if($project->status == "student-proposed")
			<h4 class="text-center text-muted">Proposed to {{ $project->supervisor->user->getFullName() }}</h3>
		@else
			<h4 class="text-capitalize text-center text-muted">{{ $project->supervisor->user->getFullName() }}</h3>
		@endif

		<h5>Description</h5>
		<div>
			<p>{!! html_entity_decode($project->description) !!}</p>
		</div>

		<h5>Skills</h5>
		<p>{{ $project->skills }}</p>

		<h5>Topics</h5>
		<ul class="topics-list">
			@if (count($project->topics))
				@foreach($project->topics as $topic)
					@if($project->getPrimaryTopic())
						<li class="cursor--pointer topic{!! ($topic->id == $project->getPrimaryTopic()->id) ? ' primary first': '' !!}" onclick="window.location='{{ action('ProjectController@byTopic', $topic->id) }}';">
							<p>{{$topic->name}}</p>
						</li>
					@else
						<li class="cursor--pointer topic" onclick="window.location='{{ action('ProjectController@byTopic', $topic) }}';">
							<p>{{$topic->name}}</p>
						</li>
					@endif
				@endforeach
			@endif
			@if(!count($project->topics))
				<li class="text-muted">
					This project has no associated topic(s).
				</li>
			@endif
		</ul>
	</div>
	<div class="text-center">
		<a id="expand-student-project-preview" class="text-center w-100 btn text-dark" href="#expand">Show more ↓</a>
	</div>
</div>
