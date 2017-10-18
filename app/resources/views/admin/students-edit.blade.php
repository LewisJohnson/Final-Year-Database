@extends('layouts.admin')
@section('content')
<h2>Students</h2>
<p>There are a total of {{ count(App\Student::get()) }} students.</p>

{{-- APPROVED --}}
<h3>Approved</h3>
<ul class="edit-student-list approved">
@foreach(App\Student::Where('project_status', 'approved')->get() as $student)
	@include ('partials.student-edit', array('student'=> $student))
@endforeach
<li><button class="select-all" data-project_status="approved" >Select all</button><a href="#">Email all</a></li>
</ul>

{{-- SELECTED --}}
<h3>Selected</h3>
<ul class="edit-student-list selected">
@foreach(App\Student::Where('project_status', 'selected')->get() as $student)
	@include ('partials.student-edit', array('student'=> $student))
@endforeach
<li><button class="select-all" data-project_status="selected" >Select all</button><a href="#">Email all</a></li>
</ul>

{{-- PROPOSED --}}
<h3>Proposed</h3>
<ul class="edit-student-list proposed">
@foreach(App\Student::Where('project_status', 'proposed')->get() as $student)
	@include ('partials.student-edit', array('student'=> $student))
@endforeach
<li><button class="select-all" data-project_status="proposed" >Select all</button><a href="#">Email all</a></li>
</ul>

{{-- NONE --}}
<h3>None</h3>
<ul class="edit-student-list none">
@foreach(App\Student::Where('project_status', 'none')->get() as $student)
	@include ('partials.student-edit', array('student'=> $student))
@endforeach
<li><button class="select-all" data-project_status="none" >Select all</button><a href="#">Email all</a></li>
<li><button class="unselect-all" data-project_status="none" >Unselect all</button><button type="">Delete Selected</button><button type="">Email Selected</button></li>
</ul>

@endsection