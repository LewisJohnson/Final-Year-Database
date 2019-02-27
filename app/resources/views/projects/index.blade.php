@extends('layouts.app')
@section('scripts')
	<script src="{{ asset('js/views/project-preview.js') }}"></script>

	@if($view == "index")
		<script src="{{ asset('js/pagination/projects-pagination.js') }}"></script>
	@endif
@endsection

@section ('content')
<div class="centered mw-1200 js-show-scroll-top">
	@if($view == "index")
		<h1>Projects</h1>
		@include('projects.partials.search')
	@endif

	@if($view == "supervisor")
		<h1>Projects by Supervisor</h1>
		<h5>Projects on-offer by {{ $owner->getFullName() }}</h5>
	@endif

	@if($view == "topic")
		<h1>Projects by Topic</h1>
		<h5>Projects with the topic "{{ $topic->name }}"</h5>
	@endif

	@if($view == "transaction")
		<h1>Project Transactions</h1>
		<h5>Click a project to browse it's transactions</h5>
	@endif

	@if($view == "personal")
		<h1>My {{ ucfirst(Session::get('education_level')["longName"]) }} Projects</h1>
		@if(count($projects) < 1)
			<div class="text-center">
				<h1>You have no projects...</h1>
				<p>Why not create a project for students right now? Just <a href="{{ action('ProjectController@create') }}">click here</a> to create a new project.</p>
			</div>
		@endif

		<a id="showArchivedToggleButton" @if($mp_hide_archived) href="{{ action('UserController@projects', [Auth::user(), 'mp_hide_archived' => false]) }}" @else href="{{ action('UserController@projects', [Auth::user(), 'mp_hide_archived'=> true]) }}" @endif>
		</a>

		<div class="form-row align-items-center form-inline ml-1 mt-3">
			<label for="inlineFormCustomSelect">Archived Projects</label>
			<select class="custom-select ml-2" id="inlineFormCustomSelect" onchange="window.location.href = $('#showArchivedToggleButton').attr('href')">
				<option value="0" @if(!$mp_hide_archived) selected @endif>Shown</option>
				<option value="1" @if($mp_hide_archived) selected @endif>Hidden</option>
			</select>
		</div>
	@endif

	{{-- We have search results--}}
	@if($view == "search")
		<h1>Project Search</h1>
		<h3 style="margin-bottom: 5px; word-break: break-all;">We found {{ count($projects) }} projects with the term "{{ $searchTerm }}".</h3>
		<h5 style="margin-top: 0;">Search term limited to {{ Session::get('search_filters') }}.</h5>
		@include('projects.partials.search')
	@endif

	@if(count($projects) > 0)
		<div class="table-responsive">
			<table id="project-table" class="table table-hover bg-white data-table table-column-toggle table--dark-head shadow-2dp {{ $view }} @if($view != "index") sort-table @endif">
				<thead>
					<tr>
						<th @if($view != "index") class="cursor--pointer" @endif data-default="true">Topic</th>
						<th @if($view != "index") class="cursor--pointer" @endif data-default="true">Title</th>
						<th @if($view != "index") class="cursor--pointer" @endif data-default="false">Short Description</th>
						<th @if($view != "index") class="cursor--pointer" @endif data-default="false">Full Description</th>
						<th @if($view != "index") class="cursor--pointer" @endif data-default="desktop">Skills</th>
						@if(!($view == "supervisor" || $view == "personal"))<th @if($view != "index") class="cursor--pointer" @endif data-default="true">Supervisor</th>@endif
						@if($view == "personal") <th @if($view != "index") class="cursor--pointer" @endif data-default="true">Status</th> @endif
					</tr>
				</thead>

				<tbody>
					@foreach($projects as $project)
						@include('projects.partials.project-table-row')
					@endforeach
				</tbody>
			</table>
		</div>
		<div style="margin: 1rem auto" class="loader loader--medium projects"></div>
	@endif
</div>
@endsection
