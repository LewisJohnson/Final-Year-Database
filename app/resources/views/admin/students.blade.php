@extends('layouts.admin')
@section('content')

<h2>Students</h2>
<p>There are a total of {{ count(App\Student::get()) }} students.</p>

@php($statuses = ['approved', 'selected', 'proposed', 'none'])
@foreach($statuses as $status)
	<h3>Approved</h3>
	<ul class="edit-student-list {{ $status }}">
	@foreach(App\Student::Where('project_status', $status)->get() as $student)
		@include ('partials.student-edit', array('student'=> $student))
	@endforeach
	<li>
		<button class="select-all" data-project_status="{{ $status }}" >Select all</button>
		<a href="{{ App\Student::getMailtoStringByProjectStatus($status) }}">Email all</a>
	</li>
</ul>
@endforeach

<hr>
<li>
	<button class="unselect-all" data-project_status="none">Unselect all</button>
	<button type="">Delete Selected</button>
	<a class="email-selected" href="mailto:" >Email Selected</a>
</li>
</ul>
@endsection