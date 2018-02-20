@extends('layouts.app')
@section('content')

<div class="centered width--800">
	@if($project->archived)
		<h1>This project is archived.</h1>
	@endif

	<div class="card project-card card--margin-vertical {!! ($project->archived) ? ' archived': '' !!}" data-project-id="{{ $project->id }}" >
		@if(Auth::user()->isStudent())
			<div class="favourite-container pointer">
				<svg viewBox="0 0 24 24" height="30" width="30" @if(Auth::user()->student->isFavouriteProject($project->id)) class="favourite" @endif>
					<polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"></polygon>
				</svg>
				<div class="loader"></div>
			</div>
		@endif
		<h1 class="title">{{ $project->title }}</h1>

		@if($view == "StudentProject")
			<h2 class="supervisor">Proposed by {{ $student_name }} to {{ $project->supervisor->user->getFullName() }}</h2>
		@else
			<h2 class="supervisor">{{ $project->supervisor->user->getFullName() }}</h2>
		@endif

		<h3>Description</h3>
		<div>
			<p>{!! html_entity_decode($project->description) !!}</p>
		</div>

		<h3>Skills</h3>
		<p>{{ $project->skills }}</p>

		<h3>Topics</h3>
		<ul class="topics-list">
			@if (count($project->topics))
				@foreach($project->topics as $topic)
					<li style="display: none" class="pointer topic @if($project->getPrimaryTopic()) {!! ($topic->id == $project->getPrimaryTopic()->id) ? ' primary first': '' !!} @endif">
						<a title="Browse projects with the topic {{ $topic->name }}" href="{{ action('ProjectController@byTopic', $topic->id) }}">{{$topic->name}}</a>
					</li>
				@endforeach
				<li>
					<div class="loader loader--medium" style="display: block"></div>
				</li>
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

	<div class="button-group button-group--horizontal ">
		<a class="button button--raised" href="javascript:history.back()">Back</a>
		{{-- STUDENT SELECT --}}
		@if(Auth::user()->isStudent())
			@if(Auth::user()->student->project_status == 'none')
				<form class="form form--flex" action="{{ action('StudentController@selectProject') }}" role="form" method="POST" >
					{{ csrf_field() }}
					{{ method_field('PATCH') }}
					<input type="hidden" name="project_id" value="{{ $project->id }}">
					<button class="button button--raised button--accent">Select project</button>
				</form>
			@else
				<button class="button button--raised button--accent" disabled>Select project</button>
			@endif
		@endif

		@if($project->isOwnedByUser())
			<a class="button button--raised" href="{{ action('ProjectController@edit', $project->id) }}">Edit Project</a>

			@if(Auth::user()->isSupervisor())
				<a class="button button--raised" href="{{ action('ProjectController@transactions', $project->id) }}">Browse Transactions</a>
			@endif
		@endif

	</div>
</div>
@endsection
