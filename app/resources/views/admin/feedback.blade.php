@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1400">
	<h1>User Feedback</h1>
	<h5>Browse all of the user submitted feedback</h5>

	<table id="UserFeedbackTable" class="table bg-white data-table table-column-toggle sort-table shadow-sm mt-3">
		<thead>
			<tr>
				<th data-default="false" class="cursor--pointer">Page</th>
				<th data-default="true" class="cursor--pointer">Department</th>
				<th data-default="false" class="cursor--pointer">Education Level</th>
				<th data-default="true" class="cursor--pointer">Comment</th>
				<th data-default="true" class="cursor--pointer">Email</th>
				<th data-default="true" class="cursor--pointer">Date</th>
				<th data-default="true" class="text-white">Action</th>
			</tr>
		</thead>
		<tbody>
			@foreach($feedback as $piece)
				<tr>
					<td>{{ $piece->page }}</td>
					<td>{{ $piece->department }}</td>
					<td>{{ $piece->education_level }}</td>
					<td>{{ $piece->comment }}</td>
					<td><a class="blue-link" href="mailto:{{ $piece->email }}">{{ empty($piece->email) ? 'A User' : $piece->email }}</a></td>
					<td data-use-hover-value data-hover="{{ $piece->date }}">{{ $piece->date->format('d/m/Y, H:i') }}</td>
					<td class="text-right">
						<a class="js-delete-feedback btn btn-sm text-danger" data-id="{{ $piece->id }}" href="{{ action('SystemAdminController@destroyFeedback') }}">X</a>
					</td>
				</tr>
			@endforeach
		</tbody>
	</table>

	{{ $feedback->links() }}
</div>
@endsection
