@extends('layouts.app')
@section('content')

<div class="centered mw-1200">
	@if($view != "StudentProject")
		@if(Auth::check())
			@if(Auth::user()->isStudent())
				@if(SussexProjects\Mode::getProjectSelectionDate()->gt(\Carbon\Carbon::now()))
					<div class="alert alert-info" role="alert">
						You may select this project {{ SussexProjects\Mode::getProjectSelectionDate()->diffForHumans() }}.
					</div>
				@endif
			@endif
		@endif
	@endif

	@if($project->status != 'on-offer')
		<div class="alert alert-{{ $project->getStatusAsBootstrapClass() }}" role="alert">
			This project is {{ $project->getStatus() }}.
		</div>
	@endif

	<div class="row">	
		<div class="col-12">
			<div class="card js-project project-card" data-project-id="{{ $project->id }}" >
				<div class="card-body">
					@if(Auth::check())
						@if(Auth::user()->isStudent())
							<div class="favourite-container cursor--pointer" style="position: absolute; top: 20px; right: 15px;" title="Click to add project to your favourites.">
								<svg viewBox="0 0 24 24" height="30" width="30" @if(Auth::user()->student->isFavouriteProject($project->id)) class="favourite" @endif>
									<polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"></polygon>
								</svg>
								<div class="spinner-grow text-warning" style="display: none"></div>
							</div>
						@endif
					@endif

					<div class="row">
						<div class="col-12 col-lg-4">
							<h2 class="text-capitalize mb-4">
								{{ $project->title }}
							</h2>
					
							@if($view == "StudentProject")
								@if($project->supervisor == null)
									<h4 class="text-capitalize text-muted">Created by {{ $project->student->getName() }}</h4>
								@else
									<h4 class="text-capitalize text-muted">Proposed by {{ $project->student->getName() }} to {{ $project->supervisor->user->getFullName() }}</h4>
								@endif
							@else
								<h4 class="text-capitalize text-muted">By {{ $project->supervisor->user->getFullName() }}</h4>
							@endif

							<hr>
							
							<h5 class="mt-4">Skills</h5>
							<p class="text-muted">{{ $project->skills }}</p>
					
							<h5 class="mt-3">Topics</h5>
							<ul class="topics-list">
								@if(count($project->topics))
									@foreach($project->topics as $topic)
										<li class="cursor--pointer topic @if($project->getPrimaryTopic()) {!! ($topic->id == $project->getPrimaryTopic()->id) ? ' primary first': '' !!} @endif">
											<a title="Browse projects with the topic {{ $topic->name }}" href="{{ action('ProjectController@byTopic', $topic->id) }}">{{$topic->name}}</a>
										</li>
									@endforeach
								@endif
					
								@if(!count($project->topics))
									<li class="text-muted">
										This project has no associated topic(s).
									</li>
								@endif
							</ul>
						</div>
					
						<div class="col-12 col-lg-8 mt-3 mt-lg-0">
							<h3>Description</h3>
							<div class="description text-muted">
								<p>{!! html_entity_decode($project->description, ENT_HTML5 | ENT_COMPAT) !!}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-12 mt-3 text-right">
			{{-- STUDENT SELECT --}}
			@if(Auth::check())
				@if($view != "StudentProject")
					@if(Auth::user()->isStudent())
						@if(Auth::user()->student->project_status == 'none' 
							&& SussexProjects\Mode::getProjectSelectionDate()->lte(\Carbon\Carbon::now()) 
							&& $project->status == "on-offer")
							<form id="selectForm" action="{{ action('StudentController@selectProject') }}" role="form" method="POST" >
								{{ csrf_field() }}
								{{ method_field('PATCH') }}
								<input type="hidden" name="project_id" value="{{ $project->id }}">
							</form>

							<button class="btn btn-primary" onclick="$('#selectForm').submit()">Select project</button>
						@endif
					@endif
				@endif

				@if($project->isOwnedByUser() && $project->status != 'archived' && $project->getAcceptedStudent() == null)
					<form class="d-none" id="delete-project" action="{{ action('ProjectController@destroy', $project->id) }}" data-project-title="{{ $project->title }}" data-project-id="{{ $project->id }}" method="POST" accept-charset="utf-8">
						{{ csrf_field() }}
					</form>

					<button type="submit" class="btn btn-outline-danger" title="Delete {{ $project->title }}" onclick="$('#delete-project').submit()">Delete Project</button>
				@endif

				@if($project->isOwnedByUser() || $project->isUserSupervisorOfProject())
					@if($project->status != 'archived')
						<a class="btn btn-primary" href="{{ action('ProjectController@edit', $project->id) }}">Edit Project</a>
					@else
						@if($project->isUserSupervisorOfProject())
							<form class="d-none" id="copy-project" action="{{ action('ProjectController@copy', $project->id) }}" method="POST" accept-charset="utf-8">
								{{ csrf_field() }}
							</form>

							<button type="submit" class="btn btn-primary" title="Copy {{ $project->title }}" onclick="$('#copy-project').submit()">Copy Project</button>
						@endif
					@endif
				@endif

				@if($project->isUserSupervisorOfProject() || $project->isUserMarkerOfProject())
					@if(SussexProjects\Mode::getProjectEvaluationDate()->lte(\Carbon\Carbon::now()))
						<a class="btn btn-primary" href="{{ action('ProjectEvaluationController@show', $project->id) }}">Evaluation</a>
					@endif
				@endif
			@endif
		</div>
	</div>
</div>
@endsection
