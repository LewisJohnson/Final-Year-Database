@extends('layouts.app')
@section('content')

@php
	$helloArray = array("Hello", "Welcome", "Hi", "Bonjour", "Olá", "Guten Tag", "Ahoj", "Merhaba", "Buongiorno", "Γειά σου!", "여보세요!", "你好!", "Здрастуйте!", "Halló!", "👋");
	$randIndex = array_rand($helloArray, 1);
@endphp

<div class="centered mw-1200 container-fluid">
	@if(Auth::check())
		<h1 class="text-center">{{ $helloArray[$randIndex] }}, {{ Auth::user()->first_name }}.</h1>
		<h6 class="text-center" style="opacity: 0.5">{{ ucfirst(Session::get('department')) }} | {{ ucfirst(get_el_long_name()) }}</h6>

		<div class="row mt-4">
			<div class="col-12">
				<div class="search-container w-100 d-flex shadow-sm">
					<input id="universal-search-input" class="search-input form-control flex-grow-1" type="text" minlength="3" name="searchTerm" placeholder="Search everywhere...">
				</div>
		
				<div id="universal-search-results" style="display: none" class="p-2 shadow-sm"></div>
			</div>
		</div>

		@if(!Session::get('seen-welcome'))
			@if(Auth::user()->isSupervisor())
				<div class="card mt-4">
					<div class="card-body">
						<h3 class="card-title">@lang("messages_supervisor.homepage_introduction_header")</h3>
						<p>@lang("messages_supervisor.homepage_introduction_body")</p>
						
						<h5>@lang("messages_supervisor.homepage_overview_header")</h5>
						<p>@lang("messages_supervisor.homepage_overview_body")</p>
					</div>
				</div>
			@endif

			@if(Auth::user()->isStudent())
				<div class="card mt-4">
					<div class="card-body">
						<h3 class="card-title">{{ lang_sess('homepage_introduction_header') }}</h3>
						<p>{{ lang_sess('homepage_introduction_body') }}</p>
	
						<h5>{{ lang_sess('homepage_overview_header') }}</h5>
						<p>{{ lang_sess('homepage_overview_body') }}</p>
					</div>
				</div>
			@endif
			{{ Session::put('seen-welcome', true) }}
		@endif

		<div class="row">
			<div class="col-12 col-md-6 mt-4 d-flex align-items-stretch">
				<div class="card w-100">
					<div class="card-body">
						<h3 class="card-title">Privileges</h3>
						<p>You are a {{ Auth::user()->getPrettyPrivilegesString() }}.</p>
					</div>
				</div>
			</div>

			@if(Auth::user()->isStudent())
				<div class="col-12 col-md-6 mt-3 mt-md-4">
					<div class="card">
						<div class="card-body">
							<h3 class="card-title">Options</h3>
							<p>You may hide your name from other students in the supervisor report.</p>
							<form id="share-name-form" class="form d-flex" action="{{ action('StudentController@shareName') }}" method="POST" accept-charset="utf-8">
								{{ csrf_field() }}
								<div class="form-field">
									<div class="checkbox">
										<input onchange="$('#share-name-form').submit();" type="checkbox" name="share_name" id="share_name" @if(Auth::user()->student->share_name) checked @endif >
										<label class="ml-1" for="share_name">Share name</label>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			@endif
		
			@if(Auth::user()->isSupervisor())
				@if(empty(Request::get('project_year')) || (Request::get('project_year') == SussexProjects\Mode::getProjectYear()))
					<div class="col-12 col-md-6 mt-3 mt-md-4">
						<div class="card">
							<div class="card-body">
								<h3 class="card-title">Options</h3>
								<p>Here you can change your email preferences.</p>
								
								@foreach(get_education_levels() as $educationLevel)
									<form id='receive-emails-{{ $educationLevel["shortName"] }}' class="receive-emails-form" action="{{ action('SupervisorController@receiveEmails') }}" method="POST" accept-charset="utf-8">
										{{ csrf_field() }}
				
										<input type="hidden" name="education_level" value="{{ $educationLevel["shortName"] }}">
										<div class="form-field mb-2">
											<div class="checkbox">
												<input class="receive-emails-checkbox" type="checkbox" name="accept_emails_{{ $educationLevel["shortName"] }}" id="accept_emails_{{ $educationLevel["shortName"] }}" @if(Auth::user()->supervisor->getAcceptingEmails($educationLevel["shortName"])) checked @endif >
												<label class="ml-1" for="accept_emails_{{ $educationLevel["shortName"] }}">Receive {{ $educationLevel["longName"] }} emails</label>
											</div>
										</div>
									</form>
								@endforeach
							</div>
						</div>
					</div>
				@endif
			@endif
		</div>

		@if(Auth::user()->isSupervisor())

			@if(count(SussexProjects\Mode::all()) > 1)
			<div class="row mt-3">
				<div class="col-12">
					<div class="card">
						<div class="card-body">
							<h3 class="card-title">Project Year</h3>
							<p>
								You can still see un-finalised evaluations from last year.<br>
								This option will disappear once everyone has finalised their evaluations from last year.
							</p>
							<div class="form-group">
								<label for="project_year">Project Year</label>
								<br>
								<select class="form-control w-auto js-projectYear">
									@foreach(SussexProjects\Mode::all() as $mode)
										<option @if(!empty(Request::get('project_year')) && (Request::get('project_year') == $mode->project_year)) selected @elseif(empty(Request::get('project_year'))) @if(SussexProjects\Mode::getProjectYear() == $mode->project_year) selected @endif @endif data-href="{{ action('HomeController@index', ['project_year' => $mode->project_year]) }}">{{ $mode->project_year }}</option>
									@endforeach
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
			@endif

			@include('supervisors.project-report')

			@if(empty(Request::get('project_year')) || (Request::get('project_year') == SussexProjects\Mode::getProjectYear()))
				<div class="row mt-3">
					<div class="col-12">
						<div class="card">
							<div class="card-body">
								<h3 class="card-title">{{ ucfirst(get_el_long_name()) }} Supervisor Overview</h3>

								<div>
									<ul class="list-group list-group-flush">
										<li class="list-group-item">Your {{ get_el_long_name() }} project load is {{ Auth::user()->supervisor->getProjectLoad() }}.</li>
						
										@if(Auth::user()->supervisor->getTakingStudents())
											<li class="list-group-item">You are accepting {{ get_el_long_name() }} students.</li>
										@else
											<li class="list-group-item">You are NOT accepting {{ get_el_long_name() }} students.</li>
										@endif
						
										@if(count(Auth::user()->supervisor->getInterestedStudents()) > 0)
											<li class="list-group-item">A total of {{ count(Auth::user()->supervisor->getInterestedStudents()) }} student(s) are awaiting approval.</li>
										@else
											<li class="list-group-item">No students are awaiting approval.</li>
										@endif
						
										@if(count(Auth::user()->supervisor->getStudentProjectProposals()) > 0)
											<li class="list-group-item">A total of {{ count(Auth::user()->supervisor->getStudentProjectProposals()) }} student(s) have proposed a project to you.</li>
										@else
											<li class="list-group-item">No students have currently proposed a project to you.</li>
										@endif
						
										@if(count(Auth::user()->supervisor->getAcceptedStudents()) > 0)
											<li class="list-group-item">You have accepted {{ count(Auth::user()->supervisor->getAcceptedStudents()) }} students.</li>
										@else
											<li class="list-group-item">You have accepted no students.</li>
										@endif
						
										@if(count(Auth::user()->supervisor->getSecondMarkingProjects()) > 0)
											<li class="list-group-item">You are second marker to {{ count(Auth::user()->supervisor->getSecondMarkingProjects()) }} projects.</li>
										@else
											<li class="list-group-item">You have not been assigned as second marker to any projects.</li>
										@endif
									</ul>
								</div>
							</div>

							<div class="card-footer">
								<a href="{{ action('UserController@projects', ['user' => Auth::user(), 'educationLevel' => get_el_short_name()]) }}">{{ ucfirst(get_el_long_name()) }} Projects</a>
							</div>
						</div>
					</div>
				</div>
			@endif
		@endif

		<div class="row">
			@if(Auth::user()->isAdminOfEducationLevel())
				<div class="col-12 col-md-6 mt-3">
					<div class="card">
						<div class="card-body">
							<h3 class="card-title">{{ ucfirst(get_el_long_name()) }} Administrator</h3>
							<p>
								{{ Auth::user()->first_name }}, you are an {{ get_el_long_name() }} administrator.
								Take a look at the {{ get_el_long_name() }} admin hub to see the actions you can perform.
							</p>

							<h5>At a Glance</h5>
							<b>Users</b>
							<ul>
								<li>Students: {{ SussexProjects\Student::getAllStudentsQuery()->count() }}</li>
								<li>Supervisors: {{ SussexProjects\Supervisor::getAllSupervisorsQuery()->count() }}</li>
							</ul>

							<b>Projects</b>
							<ul>
								<li>Projects Pending Decision: {{ SussexProjects\Http\Controllers\StudentController::studentsPendingDecision() }}</li>
								<li>Proposed Projects Pending Decision: {{ SussexProjects\Http\Controllers\StudentController::studentsPendingProposedDecision() }}</li>
								<li>Projects Accepted: {{ SussexProjects\Http\Controllers\ProjectController::getAcceptedProjectCount() }}</li>
								<li>Projects Accepted Without 2<sup>nd</sup> Marker: {{ SussexProjects\Http\Controllers\ProjectController::getAcceptedProjectWithoutSecondMarkerCount() }}</li>
							</ul>

							<b>Supervisors</b>
							<ul>
								<li>Sum of Project Loads: {{ SussexProjects\Http\Controllers\SupervisorController::sumOfProjectLoads() }}</li>
							</ul>
					
						</div>
						<div class="card-footer">
							<a href="{{ action('ProjectAdminController@index', 'educationLevel='.get_el_short_name()) }}">{{ ucfirst(get_el_long_name()) }} Administrator Hub</a>
						</div>
					</div>
				</div>
			@endif

			@if(Auth::user()->isSystemAdmin())
				<div class="col-12 col-md-6 mt-3">
					<div class="card">
						<div class="card-body">
							<h3 class="card-title">System Administrator</h3>
							<p>{{ Auth::user()->first_name }}, you are a system administrator. Take a look at the System Settings to see the actions you can perform.</p>
		
						</div>
						<div class="card-footer">
							<a href="{{ action('SystemSettingsController@index') }}">System Settings</a>
						</div>
					</div>
				</div>
			@endif

			@if(Auth::user()->isStudent())
				<div class="col-12 mt-3">
					<div class="card">
						<div class="card-body">
							@if((Auth::user()->student->project_status == 'selected' || Auth::user()->student->project_status == 'proposed'))
								<button id="student-undo-select" class="btn btn-sm btn-outline-danger fr" title="Un-select {{ Auth::user()->student->project->title }}">UNDO</button>
							@endif
			
							@if(Auth::user()->student->project_status == 'proposed')
								<h3 class="card-title">Your Proposed Project</h3>
							@else
								<h3 class="card-title">Your Project</h3>
							@endif
							<p><b>Status:</b> {{ Auth::user()->student->getStatusString() }}</p>
			
							@if(Auth::user()->student->project_status != 'none')
								@include ('projects.partials.student-project-preview', array('project'=> Auth::user()->student->project))
							@endif
						</div>
					</div>
				</div>

				@if(count(Auth::user()->student->getProposedProjectsWithoutSupervisor()) > 0 && Auth::user()->student->project_status == 'none')
					<div class="col-12 mt-3">
						<div class="card">
							<div class="card-body">
								<h3 class="card-title">Your Proposed Projects</h3>
								<h6 class="card-subtitle mb-2 text-muted">Without a supervisor</h6>
		
								<div class="row mt-3">
									@foreach(Auth::user()->student->getProposedProjectsWithoutSupervisor() as $project)
										<div class="col-12 col-md-6 mb-2">
											<div class="border p-2 bg-light d-flex">
												<a class="w-75 d-inline-block text-truncate" style="vertical-align: middle;" href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a>
																						
												<div class="ml-auto">
													<a class="btn btn-sm btn-secondary" href="{{ action('StudentController@proposeExistingProjectView', $project) }}">Re-propose</a>
												</div>
											</div>
										</div>
									@endforeach
								</div>
							</div>
						</div>
					</div>
				@endif

				<div class="col-12 mt-3">
					<div class="card">
						<div class="card-body">
							<h3 class="card-title">Your Favourite Projects</h3>
							@if($projects = Auth::user()->student->getFavouriteProjects())
								<div class="row">
									@foreach($projects as $project)
										<div class="col-12 col-md-6 mb-2">
											<div class="border p-2 bg-light">
												<a class="w-75 d-inline-block text-truncate" style="vertical-align: middle;" href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a>

												<div class="favourite-container cursor--pointer" data-project-id="{{ $project->id }}">
													<svg class="favourite" title="Remove from favourites" viewBox="0 0 24 24" height="24" width="24">
														<polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"></polygon>
													</svg>
													<div class="spinner-grow text-warning" style="display: none"></div>
												</div>
											</div>
										</div>
									@endforeach
								</div>
							@else
								<p class="subtitle" title="Simply press the star in the upper right corner on a project page to add it to your favourites.">You haven't added any projects to your favourites yet.</p>
							@endif
						</div>
					</div>
				</div>
			@endif
		</div>
	@else
		@if(ldap_guest())
			<h1>Hello, Guest.</h1>
			<div class="card card--margin-vertical">
				<p>
					You are in Guest Mode.
					This means you are a member of the University of Sussex, however, you do not have an account on the system.
					You can only perform basic tasks such as browsing projects.
				</p>
			</div>
		@else
			<div class="row">
				<div class="col-12">
					<h1 class="text-center">Hello.</h1>
	
					<div class="mt-4">
						<div class="card">
							<div class="card-body">
								<h3 class="card-title">@lang("messages.homepage_introduction_header")</h3>
								<p>@lang("messages.homepage_introduction_body")</p>
			
								<h4>@lang("messages.homepage_overview_header")</h4>
								<p>@lang("messages.homepage_overview_body")</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		@endif
	@endif
</div>

@endsection
