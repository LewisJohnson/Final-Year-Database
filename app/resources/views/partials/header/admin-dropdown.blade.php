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
			<a href="/admin/dashboard">System Dashboard</a>
			<a href="/system/user-agent">User Agent Strings</a>
		</div>
	</li>
@endif
