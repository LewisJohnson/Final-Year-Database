@extends('layouts.app')
@section('content')

<div class="centered animate-cards width--1000">
	@if(Auth::check())
		<h1>Welcome, {{ Auth::user()->first_name }}.</h1>
		<div class="card-container card--margin-vertical">
			<div class="card card--margin-vertical">
				<h2>Your Privileges</h2>
				<p>{{ ucfirst(Auth::user()->getPrettyPrivilegesString()) }}</p>
			</div>

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
					<h2>Overview</h2>
					<p>A total of {{ count(Auth::user()->supervisor->getSelectedStudents()) }} are awaiting approval.</p>
					<p>Students proposals {{ count(Auth::user()->supervisor->getStudentProjectProposals()) }}.</p>
					<p>Students accepted {{ count(Auth::user()->supervisor->getAcceptedStudents()) }}.</p>
					<p>You are second supervisor to {{ count(Auth::user()->supervisor->getSupervisingStudents()) }} students.</p>
				</div>

				@foreach(education_levels() as $level)
				
				<div class="card card--half">
					<h2>{{ ucfirst($level["longName"]) }} Supervisor</h2>
					<p>Your {{ $level["longName"] }} project load is {{ Auth::user()->supervisor['project_load_'.$level["shortName"]]}}</p>

					@if(Auth::user()->supervisor['take_students_'.$level["shortName"]])
						<p>You are accepting {{ $level["longName"] }} students</p>
					@else
						<p>You are NOT accepting {{ $level["longName"] }} students</p>
					@endif

					{{-- TODO: Add form to stop emails --}}
					@if(Auth::user()->supervisor['accept_email_'.$level["shortName"]])
						<p>You are receiving emails</p>
					@else
						<p>You are NOT currently receiving emails</p>
					@endif

					<div class="footer">
						<a class="button--small hover--dark td-none" href="{{ action('SupervisorController@index', 'educationLevel='.$level["shortName"]) }}">{{ ucfirst($level["longName"]) }} Projects</a>
						<a class="button--small hover--dark td-none" href="{{ action('SupervisorController@index', 'educationLevel='.$level["shortName"]) }}">Project Report</a>
					</div>
				</div>
				@endforeach
			@endif

			@foreach(education_levels() as $level)
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
					<h2>Your Project</h2>
					<p><b>Status:</b> {{ Auth::user()->student->getStatusString() }}</p>
					@if(Auth::user()->student->project_status != 'none')
						@include ('projects.partials.student-project-preview', array('project'=> Auth::user()->student->project))
					@endif
				</div>

				<div class="card card--margin-vertical">
					<h2>Favourite Projects</h2>
					@if($projects = Auth::user()->student->getFavouriteProjects())
						<div class="favourite-projects flex flex--row flex--wrap">
							@foreach($projects as $project)
								<a href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a>
							@endforeach	
						</div>
					@else
						<p title="Simply press the star in the upper right corner on a project page to add it to your favourites.">You haven't added any projects to your favourites yet.</p>
					@endif
				</div>

				<div class="card card--margin-vertical">
					<h2>Options</h2>
					<p>You may hide your name from other students in the supervisor report.</p>
					<form id="share-project-form" class="form form--flex" action="{{ action('StudentController@shareName') }}" method="POST" accept-charset="utf-8">
						{{ csrf_field() }}
						<div class="form-field">
							<div class="checkbox">
								<input onChange="$('#share-project-form').submit();" type="checkbox" name="share_name" id="share_name" @if(Auth::user()->student->share_name) checked @endif >
								<label for="share_name">Share name</label>
							</div>
						</div>
					</form>
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
