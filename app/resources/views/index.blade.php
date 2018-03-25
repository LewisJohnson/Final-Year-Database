@extends('layouts.app')
@section('content')

<div class="centered animate-cards width--1000">
	@if(Auth::check())
		<h1>Welcome, {{ Auth::user()->first_name }}.</h1>
		<div class="card-container card--margin-vertical">
			<div class="card @if(Auth::user()->isStudent() || Auth::user()->isSupervisor()) card--half @endif">
				<h2>Your Privileges</h2>
				<p>You are a {{ Auth::user()->getPrettyPrivilegesString() }}.</p>
			</div>

			@if(Auth::user()->isStudent())
				<div class="card card--half">
					<h2>Options</h2>
					<p>You may hide your name from other students in the supervisor report.</p>
					<form id="#share-name-form" class="form form--flex" action="{{ action('StudentController@shareName') }}" method="POST" accept-charset="utf-8">
						{{ csrf_field() }}
						<div class="form-field">
							<div class="checkbox">
								<input onChange="$('#share-name-form').submit();" type="checkbox" name="share_name" id="share_name" @if(Auth::user()->student->share_name) checked @endif >
								<label for="share_name">Share name</label>
							</div>

						</div>
					</form>
				</div>
			@endif

			@if(Auth::user()->isSupervisor())
				<div class="card card--half">
					<h2>Options</h2>
					<p>You may opt-out from receiving emails.</p>
					@foreach (get_education_levels() as $educationLevel)
						<form id='#receive-emails-{{ $educationLevel["shortName"] }}' class="receive-emails-form form form--flex" action="{{ action('SupervisorController@receiveEmails') }}" method="POST" accept-charset="utf-8">
							{{ csrf_field() }}

							<input type="hidden" name="education_level" value="{{ $educationLevel["shortName"] }}">
							<div class="form-field">
								<div class="checkbox">
									<input class="receive-emails-checkbox" type="checkbox" name="accept_emails_{{ $educationLevel["shortName"] }}" id="accept_emails_{{ $educationLevel["shortName"] }}" @if(Auth::user()->supervisor->getAcceptingEmails($educationLevel["shortName"])) checked @endif >
									<label for="accept_emails_{{ $educationLevel["shortName"] }}">Receive {{ $educationLevel["longName"] }} emails</label>
								</div>
							</div>
						</form>
					@endforeach
				</div>
				{{-- DELETE THIS --}}
				<div style="display: none" class="card card--half"></div>
			@endif

			@if(Session::get('seen-welcome') != true)
				@if(Auth::user()->isSupervisor())
					<div class="card">
						<h2>@lang("messages_supervisor.homepage_introduction_header")</h2>
						<p>@lang("messages_supervisor.homepage_introduction_body")</p>
						<h2>@lang("messages_supervisor.homepage_overview_header")</h2>
						<p>@lang("messages_supervisor.homepage_overview_body")</p>
					</div>
				@endif

				@if(Auth::user()->isStudent())
					<div class="card">
						<h2>{{ lang_sess('homepage_introduction_header') }}</h2>
						<p>{{ lang_sess('homepage_introduction_body') }}</p>
						<h2>{{ lang_sess('homepage_overview_header') }}</h2>
						<p>{{ lang_sess('homepage_overview_body') }}</p>
					</div>
				@endif
				{{ Session::put('seen-welcome', true) }}
			@endif


			@if(Auth::user()->isSupervisor())
				<div class="card card--full">
					<h2>{{ ucfirst(Session::get('education_level')["longName"]) }} Overview</h2>
					@if(count(Auth::user()->supervisor->getSelectedStudents()) > 0)
						<p>A total of {{ count(Auth::user()->supervisor->getSelectedStudents()) }} are awaiting approval.</p>
					@else
						<p>No students are awaiting approval.</p>
					@endif

					@if(count(Auth::user()->supervisor->getStudentProjectProposals()) > 0)
						<p>A total of {{ count(Auth::user()->supervisor->getStudentProjectProposals()) }} have proposed a project to you.</p>
					@else
						<p>No students have currently proposed a project to you.</p>
					@endif

					<p>You have accepted students {{ count(Auth::user()->supervisor->getAcceptedStudents()) }}.</p>

					@if(count(Auth::user()->supervisor->getSecondSupervisingStudents()) > 0)
						<p>You are second supervisor to {{ count(Auth::user()->supervisor->getSecondSupervisingStudents()) }} students.</p>
					@else
						<p>You have not been assigned as second supervisor to any students.</p>
					@endif
				</div>

				@foreach(get_education_levels() as $level)
					<div class="card card--half">
						<h2>{{ ucfirst($level["longName"]) }} Supervisor</h2>
						<p>Your {{ $level["longName"] }} project load is {{ Auth::user()->supervisor['project_load_'.$level["shortName"]]}}</p>

						@if(Auth::user()->supervisor['take_students_'.$level["shortName"]])
							<p>You are accepting {{ $level["longName"] }} students</p>
						@else
							<p>You are NOT accepting {{ $level["longName"] }} students</p>
						@endif

						@if(Auth::user()->supervisor['accept_email_'.$level["shortName"]])
							<p>You are receiving emails</p>
						@else
							<p>You are NOT currently receiving emails</p>
						@endif

						<div class="footer">
							<a class="button--small hover--dark td-none" href="{{ action('UserController@projects', ['user' => Auth::user(), 'educationLevel' => $level['shortName']]) }}">{{ ucfirst($level["longName"]) }} Projects</a>
							<a class="button--small hover--dark td-none" href="{{ action('SupervisorController@projectReport', ['user' => Auth::user(), 'educationLevel' => $level['shortName']]) }}">Project Report</a>
						</div>
					</div>
				@endforeach
			@endif

			@foreach(get_education_levels() as $level)
				@if(Auth::user()->isAdminOfEducationLevel($level["shortName"]))
					<div class="card card--half">
						<h2>{{ ucfirst($level["longName"]) }} Administrator</h2>
						<p>{{ Auth::user()->first_name }}, you are an {{ $level["longName"] }} administrator. Take a look at the hub to see what actions you can perform.</p>

						<div class="footer">
							<a class="button--small hover--dark td-none" href="{{ action('AdminController@index', 'educationLevel='.$level["shortName"]) }}">{{ ucfirst($level["longName"]) }} Administrator Hub</a>
						</div>
					</div>
				@endif
			@endforeach

			@if(Auth::user()->isSystemAdmin())
				<div class="card card--half">
					<h2>System Administrator</h2>
					<p>{{ Auth::user()->first_name }}, you are a system administrator. Take a look at the system dashboard to see what actions you can perform.</p>

					<div class="footer">
						<a class="button--small hover--dark td-none" href="{{ action('AdminController@dashboard') }}">System Dashboard</a>
					</div>
				</div>
			@endif

			@if(Auth::user()->isStudent())
				<div class="card card--margin-vertical">
					@if(Auth::user()->student->project_status == 'selected')
						<a class="button button--danger student-undo-select fr" title="Un-select {{ Auth::user()->student->project->title }}" >UNDO</a>
					@endif

					@if(Auth::user()->student->project_status == 'proposed')
						<h2>Your Proposed Project</h2>
					@else
						<h2>Your Project</h2>
					@endif
					<p><b>Status:</b> {{ Auth::user()->student->getStatusString() }}</p>

					@if(Auth::user()->student->project_status != 'none')
						@include ('projects.partials.student-project-preview', array('project'=> Auth::user()->student->project))
					@endif
				</div>

				<div class="card card--margin-vertical favourite-projects-container">
					<h2>Favourite Projects</h2>
					@if($projects = Auth::user()->student->getFavouriteProjects())
						<div class="favourite-projects flex flex--row flex--wrap">
							@foreach($projects as $project)
								<div>
									<div class="favourite-container index pointer" data-project-id="{{ $project->id }}">
										<svg viewBox="0 0 24 24" height="24" width="24" class="favourite">
											<polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"></polygon>
										</svg>
										<div class="loader"></div>
									</div>
									<a href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a>
								</div>
							@endforeach
						</div>
					@else
						<p title="Simply press the star in the upper right corner on a project page to add it to your favourites.">You haven't added any projects to your favourites yet.</p>
					@endif
				</div>
			</div>
		@endif
	@else
		<h1>Welcome.</h1>
		<div class="card card--margin-vertical">
			<h2>@lang("messages.homepage_introduction_header")</h2>
			<p>@lang("messages.homepage_introduction_body")</p>
			<h2>@lang("messages.homepage_overview_header")</h2>
			<p>@lang("messages.homepage_overview_body")</p>
		</div>
	@endif
</div>
@endsection
