@extends('layouts.admin')
@section('content')

<h2>Students</h2>
<p>There are a total of <b>{{ count(App\Student::get()) }}</b> undergraduate students.</p>

@php($statuses = ['none', 'proposed', 'selected', 'accepted'])
<div class="section-container">
@foreach($statuses as $status)
<div class="horizontal">
	<h3>{{ ucfirst($status) }}</h3>
	<ul class="table-list tl-checkbox student-edit-list {{ $status }} shadow-2dp">
		<li>
			<div class="checkbox">
				<input class="checkbox-input master-checkbox" id="{{ $status }}" type="checkbox">
				<label for="{{ $status }}" name="{{ $status }}"></label>
			</div>
			<h3>Name</h3>
			<h3>Last Login</h3>
		</li>

		@foreach(App\Student::Where('project_status', $status)->get() as $student)
			@include ('partials.student-edit', array('student'=> $student))
		@endforeach

		<li>
			<a href="{{ App\Student::getMailtoStringByProjectStatus($status) }}">Email all</a>
		</li>
	</ul>
</div>
@endforeach
</div>

<hr>
<ul class="edit-student-list">
	<li>
		<button type="">Delete Selected</button>
		<a class="email-selected" href="mailto:" >Email Selected</a>
	</li>
</ul>
@endsection