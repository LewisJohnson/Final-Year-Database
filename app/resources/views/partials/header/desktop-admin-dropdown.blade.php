@if(strpos(Session::get("auth_type"), 'admin') !== false)
	<li class="nav-button nav-button--desktop dropdown">
		<a href="/admin" title="Administrator Options">Administrator</a>
		@include('svg.arrow-down')
		<div class="dropdown-content shadow-2dp">
			<div class="sub-dropdown">
				<button class="sub-dropbtn">Users</button>
				@include('svg.arrow-right')
				<div class="dropdown-content shadow-2dp">
					<ul class="icon-list">
						<li>
							@include('svg.account-plus')
							<a href="/users/create">Add User</a>
						</li>
						<li>
							@include('svg.account-settings')
							<a href="/users/edit">Edit User</a>
						</li>
						<li>
							@include('svg.account-multiple-plus')
							<a href="/admin/students/import">Import Students</a>
						</li>
						<li>
							@include('svg.account-settings')
							<a href="/admin/supervisor-arrangements-amend">Edit Supervisors Arrangements</a>
						</li>
						<li>
							@include('svg.login')
							<a href="/admin/login-as">Log in as Another User</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="sub-dropdown">
				<button class="sub-dropbtn">Reports</button>
				@include('svg.arrow-right')
				<div class="dropdown-content shadow-2dp">
					<a href="/reports/student">Report by Student</a>
					<a href="/reports/supervisor">Report by Supervisor</a>
				</div>
			</div>

			<div class="sub-dropdown">
				<button class="sub-dropbtn">Transactions</button>
				@include('svg.arrow-right')
				<div class="dropdown-content shadow-2dp">
					<ul class="icon-list">
						<li>
							@include('svg.file')
							<a href="/admin/transactions/by-project">Browse Transactions by Project</a>
						</li>
						<li>
							@include('svg.clock')
							<a href="/admin/transactions">Browse Transactions by Time</a>
						</li>
						<li>
							@include('svg.archive')
							<a href="/admin/archive">End of Year Archive</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="sub-dropdown">
				<button class="sub-dropbtn">Settings</button>
				@include('svg.arrow-right')
				<div class="dropdown-content shadow-2dp">
					{{-- todo: make this look  pretty --}}
					<ul class="icon-list">
						<li>
							@include('svg.account-multiple-plus')
							<a href="/admin/marker-assign">Assign Second Marker</a>
						</li>
						<li>
							@include('svg.pencil')
							<a href="/admin/topics-amend">Edit Topics</a>
						</li>
						<li>
							@include('svg.globe')
							<a href="/admin/parameters">Change Global Parameters</a>
						</li>
						<li>
							@include('svg.pencil')
							<a href="/system/user-agent">User Agent Strings Overview</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</li>
@endif
