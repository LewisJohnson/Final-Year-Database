@extends('layouts.app')
@section ('content')
<div class="centered width-1200 show--scroll-to-top">

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
		<h1>Project Search</h1>
		@include('partials.search')
		<p> We found <b>{{count($projects)}}</b> projects with the term "<b>{{ $searchTerm }}</b>".</p>
	@endif

	<table id="project-table" class="data-table table--dark-head table-column-toggle shadow-2dp {{ $view }}">
		<thead>
			<tr>
				<th data-default="true" >Topic</th>
				<th data-default="true" >Title</th>
				<th data-default="false" hidden>Description</th>
				<th data-default="true" >Skills</th>
				<th @if($view == "supervisor") data-default="false" hidden @else data-default="true" @endif >Supervisor</th>
	
			</tr>
		</thead>

		<tbody>
			@include('projects.partials.full-project-table-row')
		</tbody>
	</table>

	<div style="margin: 1rem auto" class="loader loader--medium projects"></div>
</div>
@endsection
