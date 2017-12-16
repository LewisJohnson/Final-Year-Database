<tr class="student-edit-item" data-email="{{ $student->user->email }}">
	<td>
		<div class="checkbox">
			<input class="checkbox-input" id="student-{{ $student->user->id }}" type="checkbox">
			<label for="student-{{ $student->user->id }}" name="student-{{ $student->user->id }}"></label>
		</div>
	</td>
	<td><a href="mailto:{{ $student->user->email }}">{{ $student->user->first_name }} {{ $student->user->last_name }}</a></td>
	@if($student->user->last_login)
		<td>{{ $student->user->last_login->diffForHumans() }}</td>
	@else
		<td>Never</td>
	@endif
</tr>