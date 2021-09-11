<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('UserController@create') }}">
			<span>@include('svg.account-plus')<span>Add User</span></span>
		</a>
	</li>
    <li>
		<a class="btn w-100 text-left text-primary" href="{{ action('UserController@index') }}">
			<span>@include('svg.account-edit')<span>Edit User</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@loginAsView')}}">
			<span>@include('svg.login')<span>Login As</span></span>
		</a>
	</li>
</ul>
