@if(Auth::user()->isProjectAdmin())
	<li class="nav-button dropdown">
		<a href="/admin" title="Administrator Options">Administrator</a>
		@include('svg.arrow-down')

		<div class="dropdown-content shadow-2dp">
			<a href="/admin">Admin Hub</a>
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
			<a href="{{ action('AdminController@dashboard') }}">System Dashboard</a>
			<a href="{{ action('AdminController@userAgentView') }}">User Agent Strings</a>
			<a href="{{ action('AdminController@feedback') }}">User Feedback</a>
			<div class="sub-dropdown">
				<button class="sub-dropbtn">Users</button>
				@include('svg.arrow-right')
				<div class="dropdown-content shadow-2dp">
					<ul class="icon-list">
						<li>
							<a class="icon" href="/users/create">
								@include('svg.account-plus')
								<p>Add User</p>
							</a>
						</li>
						<li>
							<a class="icon" href="{{ action('UserController@index', 'view=edit') }}">
								@include('svg.account-edit')
								<p>Edit User</p>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</li>
@endif
