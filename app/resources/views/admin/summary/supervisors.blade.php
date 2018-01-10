@extends('layouts.app')
@section('content')
<div class="centered width-800 card">
<h2>Supervisors</h2>
<p>There are a total of {{ count(SussexProjects\Supervisor::get()) }} supervisors.</p>

<table>
	<thead>
		<tr>
			<th>Supervisor</th>
			<th>Project Status</th>
		</tr>
	</thead>
	<tbody>
		@foreach(SussexProjects\Supervisor::get() as $supervisor)
		<tr>
			<td><a href="/admin/supervisors/arrangements/{{ $supervisor->user->id }}">{{ $supervisor->user->getFullName() }}<a></td>
			<td>{{ $supervisor->project_status }}</td>
		</tr>
		@endforeach
	</tbody>
</table>
</div>
@endsection
