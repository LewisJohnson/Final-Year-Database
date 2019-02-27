<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('StudentController@report') }}">
			<span>@include('svg.school')<span class="ml-1">Student Report</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('SupervisorController@report') }}">
			<span>@include('svg.clipboard')<span class="ml-1">Supervisor Report</span></span>
		</a>
	</li>
</ul>
