<tr class="student-edit-item">
	<td>
		<div class="checkbox">
			<input class="checkbox-input" id="student-{{ $student->user->id }}" data-email="{{ $student->user->email }}" type="checkbox">
			<label for="student-{{ $student->user->id }}" name="student-{{ $student->user->id }}"></label>
		</div>
	</td>
	<td><a @if($student->project != null) href="{{ action('ProjectController@show', $student->project) }}" @endif>{{ $student->user->first_name }} {{ $student->user->last_name }}</a></td>
	<td>{{ $student->reject_count }}</td>
	@if($student->user->last_login)
		<td>{{ $student->user->last_login->diffForHumans() }}</td>
	@else
		<td>Never</td>
	@endif
</tr>
