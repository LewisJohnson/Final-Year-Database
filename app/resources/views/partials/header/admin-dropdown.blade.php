@if(Auth::user()->isProjectAdmin())
	<li class="nav-button dropdown">
		<a href="/admin" title="Administrator Options">Administrator</a>
		@include('svg.arrow-down')

		<div class="dropdown-content shadow-2dp">
			@include('partials.header.admin-sub-dropdown', ['title' => 'Users', 'links' => 'user'])
			@include('partials.header.admin-sub-dropdown', ['title' => 'Reports', 'links' => 'report'])
			@include('partials.header.admin-sub-dropdown', ['title' => 'Transactions', 'links' => 'transaction'])
			@include('partials.header.admin-sub-dropdown', ['title' => 'Settings', 'links' => 'settings'])
		</div>
	</li>
@endif

@if(Auth::user()->isSystemAdmin())
	<li class="nav-button dropdown">
		<a href="/admin/dashboard" title="Administrator Options">System Administrator</a>
		@include('svg.arrow-down')

		<div class="dropdown-content shadow-2dp">

			<a class="icon" href="{{ action('AdminController@dashboard') }}">
				@include('svg.cog')
				<p>System Dashboard</p>
			</a>

			<a class="icon" href="{{ action('AdminController@userAgent') }}">
				@include('svg.eye')
				<p>User Agent Strings</p>
			</a>

			<a class="icon" href="{{ action('UserController@index', 'view=edit') }}">
				@include('svg.account-edit')
				<p>Edit User</p>
			</a>
		</div>
	</li>
@endif
