@extends('layouts.app')
@section('scripts')
	<script src="{{ asset('js/views/project-preview.js') }}"></script>
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
		<h1>My {{ ucfirst(get_el_long_name()) }} Projects</h1>
		@if(count($projects) < 1)
			<div class="text-center mt-5">
				<h1>You have no projects...</h1>
				<p>Why not create a project for students right now? Just <a href="{{ action('ProjectController@create') }}">click here</a> to create a new project.</p>
			</div>
		@endif

		<a id="showArchivedToggleButton" @if($mp_hide_archived) href="{{ action('UserController@projects', [Auth::user(), 'mp_hide_archived' => false]) }}" @else href="{{ action('UserController@projects', [Auth::user(), 'mp_hide_archived'=> true]) }}" @endif>
		</a>

		<div class="form-row align-items-center form-inline ml-1 mt-3">
			<label>Archived Projects</label>
			<select class="ml-2 form-control" onchange="window.location.href = $('#showArchivedToggleButton').attr('href')">
				<option value="0" @if(!$mp_hide_archived) selected @endif>Shown</option>
				<option value="1" @if($mp_hide_archived) selected @endif>Hidden</option>
			</select>
		</div>
	@endif

	{{-- We have search results--}}
	@if($view == "search")
		<h1>Project Search</h1>
		<h3 class="mb-2">We found {{ count($projects) }} projects with the term "{{ $searchTerm }}".</h3>
		<h6 class="mt-0 text-muted">Search term limited to {{ Session::get('search_filters') }}.</h6>
		@include('projects.partials.search')
		@if(count($projects) >= 50)<div class="alert alert-warning" role="alert">You reached the results limit of 50.</div>@endif
	@endif

	@if(count($projects) > 0)
		<div class="table-responsive">
			<table id="project-table" class="table table-hover bg-white data-table table-column-toggle shadow-sm {{ $view }} @if($view != "search") server-sort-table @endif">
				<thead>
					<tr>
						@if($view != "topic")<th data-default="true" class="js-unsortable">Topic</th>@endif
						<th data-default="true">Title</th>
						<th data-default="false" class="js-unsortable">Short Description</th>
						<th data-default="false" class="js-unsortable">Full Description</th>
						<th data-default="desktop">Skills</th>
						@if(!($view == "supervisor" || $view == "personal"))<th class="js-unsortable" data-default="true">Supervisor</th>@endif
						@if($view == "personal") <th data-default="true">Status</th> @endif
					</tr>
				</thead>

				<tbody>
					@foreach($projects as $project)
						@include('projects.partials.project-table-row')
					@endforeach
				</tbody>
			</table>
		</div>
	@elseif($view != "personal")
		<p class="mt-5">There are no on-offer projects to show</p>
	@endif

	@if($view != "search")
		{{ $projects->links() }}
	@endif
</div>
@endsection
