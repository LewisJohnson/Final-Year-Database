<ul class="icon-list links-list">
	<li>
		<a class="icon" href="{{ action('StudentController@report') }}">
			@include('svg.school')
			<p>Report by Student</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('SupervisorController@report') }}">
			@include('svg.shield')
			<p>Report by Supervisor</p>
		</a>
	</li>
</ul>
