@extends ('layout')
@section ('content')
<div class="supervisor-panel">
	<h1>Supervisor Panel</h1>
	<ul>
		<li class="nav-button"><a href="/projects/{{ $project->id }}/edit" >Edit Project</a></li>
	</ul>
</div>

@if($project->archived)
<h1>This project is archived.</h1>
@endif

<div class="project{!! ($project->archived) ? ' archived': '' !!}">
	<h1 class="title">{{ $project->title }}</h1>
	<h2 class="supervisor">{{ $project->supervisor }}</h2>
	<h3>Created {{ $project->created_at->toFormattedDateString() }} - Last updated {{ $project->updated_at->diffForHumans() }}</h3>
	 
	<p>{{ $project->description }}</p>

	<h3>Topics</h3>
	<ul class="topics-list">
		@if (count($project->topics))
			@foreach($project->topics as $topic)
				<li class="topic{!! ($topic->id == App\ProjectTopic::getProjectPrimaryTopicId($project)) ? ' primary first': '' !!}">
					<a href="/projects/topics/{{ $topic->name }}">{{$topic->name}}</a>
				</li>
			@endforeach
		@else
			<li class="no-topics">This project has no associated topics.</li>
		@endif
	</ul>
</div>

<a href="/projects" title="">Back</a>
@endsection
