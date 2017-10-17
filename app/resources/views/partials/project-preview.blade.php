<div class="project-preview">
	<div class="project">
		<h1 class="title">{{ $project->title }}</h1>
		<h2 class="supervisor">{{ $project->getSupervisor()->user->getFullName() }}</h2>
		<h3>Description</h3>
		<p>{{ $project->description }}</p>
		<h3>Skills</h3>
		<p>{{ $project->skills }}</p>
		<h3>Topics</h3>
		<ul class="topics-list">
			@if (count($project->topics))
				@foreach($project->topics as $topic)
					<li class="topic{!! ($topic->id == App\ProjectTopic::getProjectPrimaryTopicId($project)) ? ' primary first': '' !!}">
						<a href="{{ action('TopicController@show', $topic) }}">{{$topic->name}}</a>
					</li>
				@endforeach
			@else
				<li class="no-topics">This project has no associated topics.</li>
			@endif
		</ul>
	</div>
	<a class="show-more" href="#show">Show more &raquo;</a>
</div>