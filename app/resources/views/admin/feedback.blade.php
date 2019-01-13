@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1400">
	<h1>User Feedback</h1>
	<h3>Browse all of the user submitted feedback</h3>

	<table class="data-table table--dark-head sort-table">
		<thead>
			<tr>
				<th class="cursor--pointer">Page</th>
				<th class="cursor--pointer">Department</th>
				<th class="cursor--pointer">Education Level</th>
				<th class="cursor--pointer">Comment</th>
				<th class="cursor--pointer">Email</th>
				<th class="cursor--pointer">Date</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			@foreach($feedback as $piece)
				<tr>
					<td>{{ $piece->page }}</td>
					<td>{{ $piece->department }}</td>
					<td>{{ $piece->education_level }}</td>
					<td>{{ $piece->comment }}</td>
					<td><a class="blue-link" href="mailto:{{ $piece->email }}">{{ $piece->email }}</a></td>
					<td>{{ $piece->date->format('M j, H:i') }}</td>
					<td style="width: 1%;padding: 7px;"><a class="delete-feedback td-none" data-id="{{ $piece->id }}" href="{{ action('SystemAdminController@destroyFeedback') }}" style="color: red;padding: 1rem;">X</a></td>
				</tr>
			@endforeach
		</tbody>
	</table>
</div>
@endsection
