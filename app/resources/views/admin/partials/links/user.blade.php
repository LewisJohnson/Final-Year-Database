<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('UserController@create') }}">
			<span>@include('svg.account-plus')<span>Add User</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('StudentController@importStudentsView') }}">
			<span>@include('svg.account-multiple-plus')<span>Import Students</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('UserController@index') }}">
			<span>@include('svg.account-edit')<span>Edit User</span></span>
		</a>
	</li>
	@if(SussexProjects\Mode::count() > 1)
		<li>
			<a class="btn w-100 text-left text-primary" href="{{ action('UserController@byYear') }}">
				<span>@include('svg.clock')<span>Students by Year</span></span>
			</a>
		</li>
	@endif
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@loginAsView')}}">
			<span>@include('svg.login')<span>Log in as Another User</span></span>
		</a>
	</li>
</ul>
