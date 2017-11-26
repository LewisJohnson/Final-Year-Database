@extends('layouts.admin')
@section('content')
<div class="centered width-1000">
<h1>Transactions</h1>
<div style="overflow: auto;">
<table class="shadow-2dp full-detail">
	<tr>
		<th>Id</th>
		<th>Type</th>
		<th>Project</th>
		<th>Student</th>
		<th>Supervisor</th>
		<th>Admin</th>
		<th>Date</th>
	</tr>
	@foreach($transactions as $transaction)
		<tr id="{{ $transaction->id }}">
			<td>{{ $transaction->id }}</td>
			<td>{{ ucfirst($transaction->transaction_type) }}</td>
			@if(Session::get("db_type") == "ug")
				@if($project = App\ProjectUg::where('id', $transaction->project_id)->first())
					<td><a href="{{ action("ProjectController@show", $project->id)}}">{{ $project->title }}</a></td>
				@else
					<td></td>
				@endif
			@else
				@if($project = App\ProjectMasters::where('id', $transaction->project_id)->first())
					<td><a href="{{ action("ProjectController@show", $project->id)}}">{{ $project->title }}</a></td>
				@else
					<td></td>
				@endif
			@endif
			@if($student = App\User::where('id', $transaction->student_id)->first())
				<td>{{ $student->getFullName() }}</td>
			@else
				<td></td>
			@endif
			
			@if($supervisor = App\Supervisor::where('id', $transaction->supervisor_id)->first())
				<td>{{ $supervisor->user->getFullName() }}</td>
			@else
				<td></td>
			@endif

			@if($admin = App\User::where('id', $transaction->admin_id)->first())
				<td>{{ $admin->getFullName() }}</td>
			@else
				<td></td>
			@endif
			<td>{{ $transaction->transaction_date }}</td>
		</tr>
	@endforeach
</table>

<table class="shadow-2dp raw-detail">
	<tr>
		<th>Id</th>
		<th>Type</th>
		<th>Project Id</th>
		<th>Student Id</th>
		<th>Supervisor Id</th>
		<th>Admin Id</th>
		<th>Date</th>
	</tr>
	@foreach($transactions as $transaction)
		<tr>
			<td>{{ $transaction->id }}</td>
			<td>{{ $transaction->transaction_type }}</td>
			<td>{{ $transaction->project_id }}</td>
			<td>{{ $transaction->student_id }}</td>
			<td>{{ $transaction->supervisor_id }}</td>
			<td>{{ $transaction->admin_id }}</td>
			<td>{{ $transaction->transaction_date }}</td>
		</tr>
	@endforeach
</table>

</div>
<div class="checkbox" style="margin-top: 15px;">
	<input class="checkbox-input" id="show-raw-table-data" type="checkbox">
	<label for="show-raw-table-data">Show raw data</label>
</div>
</div>
@endsection