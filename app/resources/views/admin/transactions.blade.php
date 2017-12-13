@extends('layouts.admin')
@section('content')
<div class="centered width-1400">
<h1>Transactions</h1>
<div style="overflow: auto;">
<table class="data-table shadow-2dp full-detail">
	<thead>
		<tr>
			<th>Id</th>
			<th>Type</th>
			<th>Project</th>
			<th>Student</th>
			<th>Supervisor</th>
			<th>Marker</th>
			<th>Admin</th>
			<th>Topic</th>
			<th>Date</th>
		</tr>
	</thead>
	<tbody>
	@foreach($transactions as $transaction)
		<tr>
			<td>{{ $transaction->id }}</td>
			<td>{{ ucfirst($transaction->transaction_type) }}</td>

			@if(Session::get("db_type") == "ug")
				@if($project = SussexProjects\ProjectUg::find($transaction->project_id))
					<td><a href="{{ action("ProjectController@show", $project->id)}}">{{ $project->title }}</a></td>
				@else
					<td></td>
				@endif
			@else
				@if($project = SussexProjects\ProjectMasters::find($transaction->project_id))
					<td><a href="{{ action("ProjectController@show", $project->id)}}">{{ $project->title }}</a></td>
				@else
					<td></td>
				@endif
			@endif

			@if($student = SussexProjects\User::find($transaction->student_id))
				<td>{{ $student->getFullName() }}</td>
			@else
				<td></td>
			@endif
			
			@if($supervisor = SussexProjects\Supervisor::find($transaction->supervisor_id))
				<td>{{ $supervisor->user->getFullName() }}</td>
			@else
				<td></td>
			@endif

			@if($marker = SussexProjects\Supervisor::find($transaction->marker_id))
				<td>{{ $marker->getFullName() }}</td>
			@else
				<td></td>
			@endif

			@if($admin = SussexProjects\User::find($transaction->admin_id))
				<td>{{ $admin->getFullName() }}</td>
			@else
				<td></td>
			@endif

			@if(Session::get("db_type") == "ug")
				@if($topic = SussexProjects\TopicUg::find($transaction->topic_id))
					<td>{{ $topic->name }}</td>
				@else
					<td></td>
				@endif
			@else
				@if($topic = SussexProjects\TopicMasters::find($transaction->topic_id))
					<td>{{ $topic->name }}</td>
				@else
					<td></td>
				@endif
			@endif

			<td>{{ $transaction->transaction_date }}</td>
		</tr>
	@endforeach
	</tbody>
</table>

<table class="shadow-2dp raw-detail">
	<thead>
		<tr>
			<th>Id</th>
			<th>Type</th>
			<th>Project Id</th>
			<th>Student Id</th>
			<th>Supervisor Id</th>
			<th>Marker Id</th>
			<th>Admin Id</th>
			<th>Topic Id</th>
			<th>Date</th>
		</tr>
	</thead>
	<tbody>
	@foreach($transactions as $transaction)
		<tr>
			<td>{{ $transaction->id }}</td>
			<td>{{ $transaction->transaction_type }}</td>
			<td>{{ $transaction->project_id }}</td>
			<td>{{ $transaction->student_id }}</td>
			<td>{{ $transaction->supervisor_id }}</td>
			<td>{{ $transaction->marker_id }}</td>
			<td>{{ $transaction->admin_id }}</td>
			<td>{{ $transaction->topic_id }}</td>
			<td>{{ $transaction->transaction_date }}</td>
		</tr>
	@endforeach
	</tbody>
</table>

</div>
<div class="checkbox" style="margin-top: 15px;">
	<input class="checkbox-input" id="show-raw-table-data" type="checkbox">
	<label for="show-raw-table-data">Show raw data</label>
</div>
</div>
@endsection