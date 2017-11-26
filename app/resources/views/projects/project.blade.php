@extends('layouts.app')
@section ('content')
@php ($user = Auth::user())

<div class="centered width-800">
@if($project->archived)
	<h1>This project is archived.</h1>
@endif

<div class="card card--margin-vertical {!! ($project->archived) ? ' archived': '' !!}">
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
			<li class="no-topics">
			<svg style="width:24px;height:24px;position: relative;top: 5px;" viewBox="0 0 24 24">
				<path fill="#fff" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
			</svg>
			<p>This project has no associated topics.</p>
			</li>
		@endif
	</ul>
</div>
<a style="margin-right: 1rem;" class="button button--raised" href="javascript:history.back()">Back</a>
@if($user->student != null)
	@if($user->student->project_status == 'none')
		<form action="{{ action('StudentController@selectProject') }}" role="form" method="POST" style="width: 150px; display: inline-block;">
			{{ csrf_field() }}
			{{ method_field('PATCH') }}
			<input type="hidden" name="project_id" value="{{ $project->id }}">
			<button class="button button--raised button--accent">Select project</button>
		</form>
	@else
		<p>You have already selected or proposed a project.</p>
	@endif
@endif
</div>
@endsection