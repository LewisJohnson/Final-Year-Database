@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>

	<script type="text/javascript">
		Window["projectYear"] = {{ SussexProjects\Mode::getProjectYear() }};
	</script>

@endsection

@php
	$usersWithYear1970 = \SussexProjects\User::where('active_year', '1970')->count();
@endphp

@section('content')

<style>
	.svg-sm {
		position: relative;
		top: -2px;
		display: inline-block;
	}

	.border {
		border-top-width: 4px !important;
	}
</style>

<div class="centered mw-1000 eoya-container">
	<div class="text-center">
		<h1>End of Year Archive</h1>
		<p class="text-muted">The end of year archive will do the following in a single transaction</p>
	</div>

	@if($usersWithYear1970 > 0)
		<div class="bg-warning p-2 my-5">
			<span class="svg-sm">@include('svg.help')</span>
			<span>Warning, there are users with the default active year of 1970 in the database. Either update "{{ ucfirst(get_el_long_name()) }} Parameters" to update their year or edit their user manually.</span>
		</div>
	@endif

	@if(count(SussexProjects\Mode::all()) > 1)
		<p>
			You have the option to select a project year to archive because there are users with a different year than the current project year.<br>
			If you select {{ SussexProjects\Mode::getProjectYear() }} a normal archive will occur (As per the description below).
			Archiving any other year will delete all students regardless of conditions and the parameters entry for said year.
		</p>

		<div class="form-group">
			<label for="project_year">Project Year <a href="{{ action('UserController@byYear') }}">(Click here for more)</a></label>
			<br>
			<select class="form-control w-auto" id="project_year" name="project_year">
				@foreach(SussexProjects\Mode::all() as $mode)
					<option>{{ $mode->project_year }}</option>
				@endforeach
			</select>
		</div>

		<hr>
	@endif

	<div id="normalArchive" class="row">
		<div class="col-12">
			<div class="mt-3 card border border-warning">
				<div class="card-body">
					<h3 class="card-title text-center">Most Viewed Project</h3>

					<div class="mt-3">
						<span class="svg-sm">@include('svg.fire')</span>
						<span>Be sure to congratulate <b>{{ $mostPopularProject->supervisor->user->getFullName() }}</b> on having the most popular project of the year <b><a href="{{ action('ProjectController@show', $mostPopularProject) }}">{{ $mostPopularProject->title }}</a></b> with <b>{{ $mostPopularProject->view_count }}</b> views!</span>
					</div>
				</div>
			</div>
		</div>

		<div class="col-12 mt-5">
			<div class="card border border-primary">
				<div class="card-body">
					<h3 class="card-title text-center">Non-destructive Changes</h3>

					<ul class="list-group mt-4 shadow-sm">
						<li class="list-group-item py-2">
							<h5 class="m-0">Projects</h5>
						</li>
						<li class="list-group-item list-group-item-action">
							<span class="svg-sm">@include('svg.playlist-edit')</span>
							<span>The text <i>“In [PROJECT YEAR] this project was viewed [VIEW COUNT] times and undertaken by [STUDENT NAME]”</i><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will be added to the description of projects.</span>
						</li>
						<li class="list-group-item list-group-item-action">
							<span class="svg-sm">@include('svg.archive')</span>
							<span>All projects will be set to archived.</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="col-12 mt-5">
			<div class="card border border-danger">
				<div class="card-body">
					<h3 class="card-title text-center">Destructive Changes</h3>

					<ul class="list-group mt-4 shadow-sm">
						<li class="list-group-item py-2">
							<h5 class="m-0">Projects</h5>
						</li>

						<li class="list-group-item list-group-item-action">
							<span class="svg-sm ">@include('svg.delete-forever')</span>
							<span>Student proposed projects which we're not accepted will be deleted.</span>
						</li>
					</ul>

					<ul class="list-group mt-4 shadow-sm">
						<li class="list-group-item py-2">
							<h5 class="m-0">Users</h5>
						</li>

						<li class="list-group-item list-group-item-action">
							<span class="svg-sm">@include('svg.account-remove')</span>
							<span>Students without projects will be deleted.</span>
						</li>
						<li class="list-group-item list-group-item-action">
							<span class="svg-sm">@include('svg.account-remove')</span>
							<span>Students with finalised project evaluations will be deleted.</span>
						</li>
					</ul>

					<ul class="list-group mt-4 shadow-sm">
						<li class="list-group-item py-2">
							<h5 class="m-0">Transactions</h5>
						</li>
						<li class="list-group-item list-group-item-action">
							<span class="svg-sm">@include('svg.delete-forever')</span>
							<span>The transactions table will be emptied.</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="row d-none" id="prevYearArchive">
		<div class="col-12">
			<div class="card border border-danger">
				<div class="card-body">
					<h3 class="card-title text-center">Destructive Changes</h3>

					<ul class="list-group mt-4 shadow-sm">
						<li class="list-group-item py-2">
							<h5 class="m-0">Users</h5>
						</li>

						<li class="list-group-item list-group-item-action">
							<span class="svg-sm">@include('svg.account-remove')</span>
							<span>All students will be deleted.</span>
						</li>
					</ul>

					<ul class="list-group mt-4 shadow-sm">
						<li class="list-group-item py-2">
							<h5 class="m-0">Other</h5>
						</li>

						<li class="list-group-item list-group-item-action">
							<span class="svg-sm">@include('svg.bin')</span>
							<span>The parameters for this year will be deleted.</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="text-right mt-5">
		<div class="alert alert-info mt-3">
			<span>&#128161;</span><span class="ml-2">You must download the student data before archiving.</span>
		</div>

		<a class="btn btn-primary" id="studentData" href="{{ action('ProjectAdminController@exportStudentSummary') }}" data-base-url="{{ action('ProjectAdminController@exportStudentSummary') }}">Download Student Data</a>

		<form class="d-inline-block ml-2" id="endOfYearArchive" action="{{ action('ProjectAdminController@archive') }}" data-base-url="{{ action('ProjectAdminController@archive') }}" method="POST" accept-charset="utf-8">
			{{ csrf_field() }}
			<button title="You must download the student data before archiving" id="eoyaButton" type="submit" class="btn btn-danger disabled" disabled>Archive</button>
		</form>
	</div>
</div>
@endsection
