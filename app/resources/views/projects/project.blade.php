@extends('layouts.app')
@section('content')

<div class="centered width--800">

	@if($view != "StudentProject")
		@if(Auth::check())
			@if(Auth::user()->isStudent())
				@if(SussexProjects\Mode::getProjectSelectionDate()->gt(\Carbon\Carbon::now()))
					<p style="width: 100%; margin: 0;">You may select this project {{ SussexProjects\Mode::getProjectSelectionDate()->diffForHumans() }}.</p>
				@endif
			@endif
		@endif
	@endif

	@if($project->status != 'on-offer')
		<p class="config-tip">This project is {{ $project->status }}.</p>
	@endif

	<div class="card project-card fadeIn animated card--margin-vertical {!! ($project->status == 'archived') ? ' archived': '' !!}" data-project-id="{{ $project->id }}" >
		@if(Auth::check())
			@if(Auth::user()->isStudent())
				<div class="favourite-container pointer">
					<svg viewBox="0 0 24 24" height="30" width="30" @if(Auth::user()->student->isFavouriteProject($project->id)) class="favourite" @endif>
						<polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"></polygon>
					</svg>
					<div class="loader"></div>
				</div>
			@endif
		@endif
		<h1 class="title">{{ $project->title }}</h1>

		@if($view == "StudentProject")
			@if($project->supervisor == null)
				<h2 class="supervisor">Created by {{ $project->student->getName() }}</h2>
			@else
				<h2 class="supervisor">Proposed by {{ $project->student->getName() }} to {{ $project->supervisor->user->getFullName() }}</h2>
			@endif
		@else
			<h2 class="supervisor">{{ $project->supervisor->user->getFullName() }}</h2>
		@endif

		<h3>Description</h3>
		<div class="description">
			<p>{!! html_entity_decode($project->description, ENT_HTML5 | ENT_COMPAT) !!}</p>
		</div>

		<h3>Skills</h3>
		<p>{{ $project->skills }}</p>

		<h3>Topics</h3>
		<ul class="topics-list">
			@if(count($project->topics))
				@foreach($project->topics as $topic)
					<li class="pointer topic @if($project->getPrimaryTopic()) {!! ($topic->id == $project->getPrimaryTopic()->id) ? ' primary first': '' !!} @endif">
						<a title="Browse projects with the topic {{ $topic->name }}" href="{{ action('ProjectController@byTopic', $topic->id) }}">{{$topic->name}}</a>
					</li>
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

	<div class="button-group button-group--horizontal ">
		<a class="button button--raised" href="javascript:history.back()">Back</a>

		{{-- STUDENT SELECT --}}
		@if(Auth::check())
			@if($view != "StudentProject")
				@if($project->status == "on-offer")
					@if(Auth::user()->isStudent())
						@if(Auth::user()->student->project_status == 'none')
							@if(SussexProjects\Mode::getProjectSelectionDate()->lte(\Carbon\Carbon::now()))
								<form class="form form--flex" action="{{ action('StudentController@selectProject') }}" role="form" method="POST" >
									{{ csrf_field() }}
									{{ method_field('PATCH') }}
									<input type="hidden" name="project_id" value="{{ $project->id }}">
									<button class="button button--raised button--accent">Select project</button>
								</form>
							@endif
						@endif
					@endif
			@else
				<button class="button button--raised button--accent" disabled>Select project</button>
			@endif
		@endif

			@if($project->isOwnedByUser() || $project->isUserSupervisorOfProject())
				<a class="button button--raised" href="{{ action('ProjectController@edit', $project->id) }}">Edit Project</a>

				@if($project->isOwnedByUser())
					<form class="delete-project" action="{{ action('ProjectController@destroy', $project->id) }}" data-project-title="{{ $project->title }}" data-project-id="{{ $project->id }}" method="POST" accept-charset="utf-8">
						{{ csrf_field() }}
						<button type="submit" class="button button--raised button--danger" title="Delete {{ $project->title }}">Delete Project</button>
					</form>
				@endif
			@endif
		@endif
	</div>
</div>
@endsection
