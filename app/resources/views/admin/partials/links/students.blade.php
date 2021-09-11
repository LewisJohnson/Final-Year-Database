<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@assignProjectView') }}">
			<span>@include('svg.file-plus')<span>Assign Project</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('StudentController@importStudentsView') }}">
			<span>@include('svg.account-multiple-plus')<span>Import Students</span></span>
		</a>
	</li>
	@if(SussexProjects\Mode::count() > 1)
		<li>
			<a class="btn w-100 text-left text-primary" href="{{ action('UserController@byYear') }}">
				<span>@include('svg.clock')<span>Students by Year</span></span>
			</a>
		</li>
	@endif
</ul>
