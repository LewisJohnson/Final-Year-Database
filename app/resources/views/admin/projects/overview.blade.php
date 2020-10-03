@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1600 js-show-scroll-top">
	<h1>{{ ucfirst(Session::get('education_level')["longName"]) }} Project Overview</h1>

	@if(count(SussexProjects\Mode::all()) > 1)
		<div class="form-group">
			<label for="project_year">Project Year <a href="{{ action('UserController@byYear') }}">(Click here for more)</a></label>
			<br>
			<select class="form-control w-auto js-projectYear">
				@foreach(SussexProjects\Mode::all() as $mode)
					<option @if(!empty(Request::get('project_year')) && (Request::get('project_year') == $mode->project_year)) selected @elseif(empty(Request::get('project_year'))) @if(SussexProjects\Mode::getProjectYear() == $mode->project_year) selected @endif @endif data-href="{{ action('ProjectController@overview', ['project_year' => $mode->project_year]) }}">{{ $mode->project_year }}</option>
				@endforeach
			</select>
		</div>

		<hr>
	@endif

	<div class="table-responsive">
		<table class="table bg-white data-table sort-table shadow-sm mt-3" id="ProjectTableOverview">
			<thead>
				<tr>
					<th>Student</th>
					<th>Project Title</th>
					<th class="border-left">Supervisor<br><span class="text-muted">Name</span></th>
					<th class="border-left">2<sup>nd</sup> Marker<br><span class="text-muted">Name</span></th>
					<th class="border-left d-print-none js-unsortable"></th>
				</tr>
			</thead>
			<tbody>
				@foreach($students as $student)
					@if(empty($student->project))
						<tr style="opacity: 0.7">
							<td>{{ $student->getName() }}</td>
							<td>No project</td>
							<td class="border-left"></td>
							<td>-</td>
							<td>-</td>
							<td class="border-left"></td>
							<td>-</td>
							<td>-</td>
							<td class="border-left">-</td>
							<td>-</td>
							<td>-</td>
						</tr>
					@else
						@php
							$project = $student->project;
						@endphp
						<tr>
							<td>{{ $student->user->getFullName() }}</td>
							<td><a href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
	
							<td class="border-left"><a href="mailto:{{ $project->supervisor->user->email }}">{{ $project->supervisor->user->getFullName() }}</a></td>
							<td class="border-left">
								@if(empty($project->marker))
									-
								@else
									<a href="mailto:{{ $project->marker->user->email }}">{{ $project->marker->user->getFullName() }}</a>
								@endif
							</td>
	
							<td class="border-left text-right">
								@if($student->project_status == 'accepted')
									<button class="btn btn-sm btn-outline-danger supervisor-undo-accept"
										title="Un-accept {{ $student->user->getFullName() }} for {{ $project->title }}" 
										data-student-id="{{ $student->id }}" data-student-name="{{ $student->user->getFullName() }}" 
										data-project-title="{{ $project->title }}">Undo</button>
								@else
									<button class="btn btn-sm btn-outline-danger disabled" disabled title="Student not accepted.">Undo</button>
								@endif
							</td>
						</tr>
						
					@endif
				@endforeach
			</tbody>
		</table>
	</div>
</div>
@endsection
