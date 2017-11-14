@extends('layouts.admin')
@section('content')

<h2>Students</h2>
<p>There are a total of <b>{{ count(App\Student::get()) }}</b> undergraduate students.</p>

@php($statuses = ['accepted', 'selected', 'proposed', 'none'])
@foreach($statuses as $status)
	<h3>{{ ucfirst($status) }}</h3>
	<ul class="table-list tl-checkbox student-edit-list {{ $status }} shadow-2dp">
		<li>
			<div class="checkbox">
				<input class="checkbox-input master-checkbox" id="description" type="checkbox" checked>
				<label for="description" name="description"></label>
			</div>
			<h3>Name</h3>
			<h3>Last Login</h3>
		</li>

		@foreach(App\Student::Where('project_status', $status)->get() as $student)
			@include ('partials.student-edit', array('student'=> $student))
		@endforeach

		<li>
			<button class="select-all" data-project_status="{{ $status }}" >Select all</button>
			<button class="unselect-all" data-project_status="{{ $status }}">Unselect all</button>
			<a href="{{ App\Student::getMailtoStringByProjectStatus($status) }}">Email all</a>
		</li>
	</ul>
@endforeach

<hr>
<ul class="edit-student-list">
	<li>
		<button type="">Delete Selected</button>
		<a class="email-selected" href="mailto:" >Email Selected</a>
	</li>
</ul>
@endsection