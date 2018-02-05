<nav class="desktop">
	<ul>
		{{-- <li class="nav-button"><img class="logo" src="/images/sussex-logo-no-text.png" style="width: 50px; height: 50px;"></li> --}}
		<li class="nav-button dropdown">
			<button>Browse</button>
			@include('svg.arrow-down')
			<div class="dropdown-content shadow-2dp">
				<a href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">Projects</a>
				<a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">Projects by Supervisor</a>
				<a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topics</a>
			</div>
		</li>
		<li class="nav-button dropdown">
			<button>Help</button>
			@include('svg.arrow-down')
			<div class="dropdown-content shadow-2dp">
				<a href="{{ action('HomeController@information') }}" title="General Information">General Information</a>
				<a href="{{ action('HomeController@help') }}" title="System Help">System Help</a>
				<a href="{{ action('HomeController@about') }}" title="About this software">About</a>
				@include('partials.header.help-links', ['platform' => 'desktop'])
			</div>
		</li>
		@if(Session::get('auth_level') == 'supervisor')
			<li class="nav-button dropdown">
				<a href="{{ action('SupervisorController@index') }}" title="Supervisor options">Supervisor</a>
				@include('svg.arrow-down')
				<div class="dropdown-content shadow-2dp">
					<a title="Create new project" href="{{ action('ProjectController@create') }}">New Project</a>
					<a title="Browse all transactions for your projects" href="{{ action('SupervisorController@transactions') }}">Transactions</a>
					<a href="{{ action('SupervisorController@report') }}">Report by Supervisor</a>
				</div>
			</li>
		@endif
		@include("partials.header.admin-dropdown")
		@if(Auth::user()->isStudent())
			<li class="nav-button dropdown">
				<button>Student</button>
				@include('svg.arrow-down')
				<div class="dropdown-content shadow-2dp">
					<a href="{{ action('StudentController@showProposeProject') }}">Propose Project</a>
					<a href="{{ action('SupervisorController@report') }}">Report by Supervisor</a>
				</div>
			</li>
		@endif
	</ul>
</nav>