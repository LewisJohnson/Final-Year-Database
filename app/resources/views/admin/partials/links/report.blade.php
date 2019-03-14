<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('StudentController@report') }}">
			<span>@include('svg.school')<span>Student Report</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('SupervisorController@report') }}">
			<span>@include('svg.clipboard')<span>Supervisor Report</span></span>
		</a>
	</li>
</ul>
