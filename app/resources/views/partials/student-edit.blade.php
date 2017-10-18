<li class="student-edit-item" data-email="{{ $student->user->email }}">
	<input class="checkbox" type="checkbox">
	<a href="mailto:{{ $student->user->email }}">{{ $student->user->first_name }} {{ $student->user->last_name }}</a>

	@if($student->user->last_login === null)
		<p>Never</p>
	@else
		<p>{{ $student->user->last_login->diffForHumans() }}</p>
	@endif
</li>