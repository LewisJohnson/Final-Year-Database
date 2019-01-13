@extends('layouts.app')
@section('scripts')
	<script src="{{ asset('js/views/project-preview.js') }}"></script>

	@if($view == "index")
		<script src="{{ asset('js/pagination/projects-pagination.js') }}"></script>
	@endif
@endsection

@section ('content')
<div class="centered mw-1200 show--scroll-to-top">
	@if($view == "index")
		<h1>Projects</h1>
		@include('projects.partials.search')
	@endif

	@if($view == "supervisor")
		<h1>Projects by Supervisor</h1>
		<h3>Projects on-offer by {{ $owner->getFullName() }}</h3>
	@endif

	@if($view == "topic")
		<h1>Projects by Topic</h1>
		<h3>Projects with the topic "{{ $topic->name }}"</h3>
	@endif

	@if($view == "transaction")
		<h1>Project Transactions</h1>
		<h3>Click a project to browse it's transactions</h3>
	@endif

	@if($view == "personal")
		<h1>My Projects</h1>
		@if(count($projects) < 1)
			<div style="text-align: center;">
				<h1>You have no projects...</h1>
				<p>Why not create a project for students right now? Just <a href="{{ action('ProjectController@create') }}">click here</a> to create a new project.</p>
			</div>
		@endif

		<a class="form-field form-field--toggle" style="position: relative;top: 35px;" @if($hide_archived) href="{{ action('UserController@projects', [Auth::user(), 'hide_archived' => false]) }}" @else href="{{ action('UserController@projects', [Auth::user(), 'hide_archived'=> true]) }}" @endif>
			<p class="switch-label" for="collect_referrer">Hide archived projects</p>
			<label onclick="window.location.href = this.closest('a').getAttribute('href')" class="toggle">
				<input type="checkbox" class="checkbox" @if($hide_archived) checked @endif>
				<span class="slider"></span>
			</label>
		</a>
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
			<table id="project-table" class="data-table table-column-toggle table--dark-head shadow-2dp {{ $view }} @if($view != "index") sort-table @endif">
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
