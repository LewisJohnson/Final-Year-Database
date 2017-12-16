@extends('layouts.admin')
@section('content')
@php($statuses = ['none', 'proposed', 'selected', 'accepted'])

<div class="centered width-1600">
<h1>Report by Student</h1>
@if(Session::get('db_type') == 'ug')
	<h5>There are a total of <b>{{ count(SussexProjects\StudentUg::get()) }}</b> undergraduate students.</h5>
@else
	<h5>There are a total of <b>{{ count(SussexProjects\StudentMasters::get()) }}</b> masters students.</h5>
@endif

<div class="section-container">
@foreach($statuses as $status)
<div class="section horizontal" data-status= "{{ $status }}">
	<h3>{{ ucfirst($status) }}</h3>
	<table class="data-table {{ $status }}  full-detail shadow-2dp" id="student-edit-list">
		<thead>
			<tr>
				<th>			
					<div class="checkbox">
						<input class="checkbox-input master-checkbox" id="{{ $status }}" type="checkbox">
						<label for="{{ $status }}" name="{{ $status }}"></label>
					</div>
				</th>
				<th>Name</th>
				<th>Last Login</th>
			</tr>
		</thead>
		<tbody>
			@if(Session::get('db_type') == 'ug')
				@foreach(SussexProjects\StudentUg::Where('project_status', $status)->get() as $student)
					@include ('partials.student-edit', array('student'=> $student))
				@endforeach
			@else
				@foreach(SussexProjects\StudentMasters::Where('project_status', $status)->get() as $student)
					@include ('partials.student-edit', array('student'=> $student))
				@endforeach
			@endif
		</tbody>
	</table>
	<div class="button-group">
		<button class="button button--raised email-selected {{ $status }}" type="">Email Selected</button>
	</div>
</div>
@endforeach
</div>
</div>
@endsection