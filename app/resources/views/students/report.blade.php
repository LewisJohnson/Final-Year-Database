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
	<table class="data-table {{ $status }} shadow-2dp" id="student-edit-list">
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
		<button class="button button--raised" type="">Accept Selected</button>
		<button class="button button--raised" type="">Reject Selected</button>
	</div>
</div>
@endforeach
</div>
@endsection