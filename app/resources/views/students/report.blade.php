@extends('layouts.admin')
@section('content')

<h1>Students</h1>
@if(Session::get('db_type') == 'ug')
	<p>There are a total of <b>{{ count(SussexProjects\StudentUg::get()) }}</b> undergraduate students.</p>
@else
	<p>There are a total of <b>{{ count(SussexProjects\StudentMasters::get()) }}</b> masters students.</p>
@endif


@php($statuses = ['none', 'proposed', 'selected', 'accepted'])
<div class="section-container">
@foreach($statuses as $status)
<div class="section horizontal" data-status= "{{ $status }}">
	<h3>{{ ucfirst($status) }}</h3>
	<ul style="list-style: none">
		<li>
			<a class="button button--raised email-selected {{ $status }}" href="mailto:" disabled >Email Selected</a>
		</li>
	</ul>

	<ul id="student-edit-list" class="table-list table-list--checkbox {{ $status }} shadow-2dp">
		<li>
			<div class="checkbox">
				<input class="checkbox-input master-checkbox" id="{{ $status }}" type="checkbox">
				<label for="{{ $status }}" name="{{ $status }}"></label>
			</div>
			<h3>Name</h3>
			<h3>Last Login</h3>
		</li>
		@if(Session::get('db_type') == 'ug')
			@foreach(SussexProjects\StudentUg::Where('project_status', $status)->get() as $student)
				@include ('partials.student-edit', array('student'=> $student))
			@endforeach
		@else
			@foreach(SussexProjects\StudentMasters::Where('project_status', $status)->get() as $student)
				@include ('partials.student-edit', array('student'=> $student))
			@endforeach
		@endif
	</ul>
</div>
@endforeach
</div>
@endsection