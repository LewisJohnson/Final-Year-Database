@extends('layouts.admin')
@section('content')
<h2>Students</h2>
<p>There are a total of {{ count(App\Student::get()) }} students.</p>

<h3>Approved</h3>
<ul>
@foreach(App\Student::Where('project_status', 'approved')->get() as $student)
	<li>
		<a href="mailto:{{ $student->user->email }}">{{ $student->user->first_name }} {{ $student->user->last_name }}</a>
		<p>{{ $student->project_status }}</p>
		@if($student->user->last_login !== null)
		<p>{{ $student->user->last_login->diffForHumans() }}</p>
		@else
		<p>Never</p>
		@endif
	</li>
@endforeach


<h3>Selected</h3>
<ul>
@foreach(App\Student::Where('project_status', 'selected')->get() as $student)
	<li>
		<a href="mailto:{{ $student->user->email }}">{{ $student->user->first_name }} {{ $student->user->last_name }}</a>
		<p>{{ $student->project_status }}</p>
		@if($student->user->last_login !== null)
		<p>{{ $student->user->last_login->diffForHumans() }}</p>
		@else
		<p>Never</p>
		@endif
	</li>
@endforeach


<h3>Proposed</h3>
<ul>
@foreach(App\Student::Where('project_status', 'propsed')->get() as $student)
	<li>
		<a href="mailto:{{ $student->user->email }}">{{ $student->user->first_name }} {{ $student->user->last_name }}</a>
		<p>{{ $student->project_status }}</p>
		@if($student->user->last_login !== null)
		<p>{{ $student->user->last_login->diffForHumans() }}</p>
		@else
		<p>Never</p>
		@endif
	</li>
@endforeach
</ul>

<h3>None</h3>
<ul>
@foreach(App\Student::Where('project_status', 'none')->get() as $student)
	<li>
		<a href="mailto:{{ $student->user->email }}">{{ $student->user->first_name }} {{ $student->user->last_name }}</a>
		<p>{{ $student->project_status }}</p>
		@if($student->user->last_login !== null)
		<p>{{ $student->user->last_login->diffForHumans() }}</p>
		@else
		<p>Never</p>
		@endif
	</li>
@endforeach

@endsection