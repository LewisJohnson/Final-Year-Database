@extends('layouts.app')
@section ('content')
<div class="centered width-1200">

	@if($view == "index")
		<h1>Projects</h1>
		@include('partials.search')
		@section('scripts')
			<script src="{{ asset('js/pagination/projects-pagination.js') }}"></script>
		@endsection
	@endif

	@if($view == "supervisor")
		<h1>Projects by Supervisor</h1>
		<h3>Projects on-offer by {{ $supervisor_name }}</h3>
	@endif

	@if($view == "topic")
		<h1>Projects by Topic</h1>
		<h3>Projects with the topic "{{ $topic->name }}"</h3>
	@endif

	@if($view == "transaction")
		<h1>Project Transactions</h1>
		<h3>Click a project to browse it's transactions.</h3>
	@endif

	{{-- We have search results--}}
	@if($view == "search")
		<p> We found <b>{{count($projects)}}</b> projects with the term "<b>{{ $searchTerm }}</b>".</p>
	@endif

	<table id="project-table" class="data-table table--dark-head shadow-2dp {{$view}}">
		<thead>
			<tr>
				<th>Topic</th>
				<th>Title</th>
				{{-- todo: add table customisation (hide/show all columns) --}}
				{{-- <th>Description</th> --}}
				<th @if($view != "supervisor") class="mobile--hidden" @endif style="@if($view == "supervisor") text-align: left; @endif">Skills</th>
				@if($view != "supervisor")
					<th>Supervisor</th>
				@endif
			</tr>
		</thead>

		<tbody>
			@include('projects.partials.project-table-row')
		</tbody>
	</table>

	<div style="margin: 1rem auto" class="loader loader--medium projects"></div>
</div>
@endsection
