<ul class="icon-list">
	<li>
		<a class="icon" href="{{ action('UserController@create') }}">
			@include('svg.account-plus')
			<p>Add User</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('StudentController@importStudentsView') }}">
			@include('svg.account-multiple-plus')
			<p>Import Students</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('UserController@index', 'view=edit') }}">
			@include('svg.account-edit')
			<p>Edit User</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('ProjectAdminController@amendSupervisorArrangementsView') }}">
			@include('svg.account-settings')
			<p>Amend Supervisors Arrangements</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('ProjectAdminController@loginAsView')}}">
			@include('svg.login')
			<p>Log in as Another User</p>
		</a>
	</li>
</ul>
