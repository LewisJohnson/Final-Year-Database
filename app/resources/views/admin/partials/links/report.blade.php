<ul class="icon-list links-list">
	<li>
		<a class="icon" href="{{ action('StudentController@report') }}">
			@include('svg.school')
			<p>Student Report</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('SupervisorController@report') }}">
			@include('svg.clipboard')
			<p>Supervisor Report</p>
		</a>
	</li>
</ul>
