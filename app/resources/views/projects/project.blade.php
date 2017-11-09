@extends('layouts.app')
@section ('content')
@php ($user = Auth::user())

@if($project->isOwnedByUser())
	<div class="supervisor-panel">
		<h2>Supervisor Panel</h2>
		<ul class="buttons">
			<li class="nav-button"><a href="{{ action('ProjectController@create') }}">New Project</a></li>
			<li class="nav-button"><a href="{{ action('ProjectController@edit', $project) }}">Edit Project</a></li>
			<li class="nav-button"><a href="{{ action('ProjectController@destroy', $project) }}">Delete Project</a></li>
		</ul>
		<h3>Project Information</h3>
		<ul>
			<li><p>Created {{ $project->created_at->toFormattedDateString() }}</p></li>
			<li><p>Last updated {{ $project->updated_at->toFormattedDateString() }} ({{ $project->updated_at->diffForHumans() }})</p></li>
		</ul>
	</div>
	<hr>
@endif

@if($project->archived)
	<h1>This project is archived.</h1>
@endif

<div class="project{!! ($project->archived) ? ' archived': '' !!}">
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
					<a href="{{ action('TopicController@show', $topic) }}">{{$topic->getUnsluggedName()}}</a>
				</li>
			@endforeach
		@else
			<li class="no-topics">This project has no associated topics.</li>
		@endif
	</ul>
</div>

<hr>

@if($user->isStudent())
	@if($user->student->project_status == 'none')
		<form action="{{ action('StudentController@selectProject', $user->student)}}" role="form" method="POST">
			{{ csrf_field() }}
			{{ method_field('PATCH') }}
			<input type="hidden" name="project_id" value="{{ $project->id }}">
			<button>Select project</button>
		</form>
	@else
		{{-- Show selected/proposed topic --}}
		<p>You have already selected/proposed a project.</p>
	@endif

@endif

<a href="{{ action('ProjectController@index') }}">Back</a>
@endsection


