@extends('layouts.app')
@section('content')
@php ($user = Auth::user())

<div class="centered width-800">
@if($project->archived)
	<h1>This project is archived.</h1>
@endif

<div class="card card--margin-vertical {!! ($project->archived) ? ' archived': '' !!}">
	<h1 class="title">{{ $project->title }}</h1>

	@if($view == "StudentProject")
		<h2 class="supervisor">Proposed by {{ $student_name }} to {{ $project->supervisor->user->getFullName() }}</h2>
	@else
		<h2 class="supervisor">{{ $project->supervisor->user->getFullName() }}</h2>
	@endif

	<h3>Description</h3>
	<p>{{ $project->description }}</p>

	<h3>Skills</h3>
	<p>{{ $project->skills }}</p>

	<h3>Topics</h3>
	<ul class="topics-list">
		@if (count($project->topics))
			@foreach($project->topics as $topic)
				@if($project->getPrimaryTopic())
					<li class="pointer topic{!! ($topic->id == $project->getPrimaryTopic()->id) ? ' primary first': '' !!}" draggable onclick="window.location='{{ action('ProjectController@byTopic', $topic->id) }}';">
						<p>{{$topic->name}}</p>
					</li>
				@else
					<li class="pointer topic" draggable onclick="window.location='{{ action('ProjectController@byTopic', $topic->id) }}';">
						<p>{{$topic->name}}</p>
					</li>
				@endif
			@endforeach
		@endif
		@if(!count($project->topics))
			<li class="no-topics">
				<svg style="width:24px;height:24px;position: relative;top: 5px;" viewBox="0 0 24 24">
					<path fill="#fff" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
				</svg>
				<p>This project has no associated topics.</p>
			</li>
		@elseif(!$project->getPrimaryTopic())
			{{-- This should never be shown. --}}
			<li class="no-topics">
				<svg style="width:24px;height:24px;position: relative;top: 5px;" viewBox="0 0 24 24">
					<path fill="#fff" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
				</svg>
				<p>This project has no primary topic.</p>
			</li>
		@endif
	</ul>
</div>

<div class="button-group button-group--horizontal" >
	<a class="button button--raised" href="javascript:history.back()">Back</a>
	@if($project->isOwnedByUser())
		<a class="button button--raised" href="{{ action('ProjectController@edit', $project->id) }}">Edit Project</a>
		<a class="button button--raised" href="{{ action('ProjectController@transactions', $project->id) }}">Browse Transactions</a>
	@endif
</div>

{{-- STUDENT SELECT --}}
@if($user->student != null)
	@if($user->student->project_status == 'none')
		<form class="form form--flex" action="{{ action('StudentController@selectProject') }}" role="form" method="POST" style="width: 150px; display: inline-block;">
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
