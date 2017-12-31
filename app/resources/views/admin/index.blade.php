@extends('layouts.admin')
@section('content')
@php($user = Auth::user())
<div class="centered width-800">
	@if(Session::get('db_type') == 'ug')
		<h1>Undergraduate Administrator Hub</h1>
	@else
		<h1>Masters Administrator Hub</h1>
	@endif
	<div class="admin hub">

		{{-- USERS --}}
		<div class="section shadow-2dp">
			<div class="header">
				@include('svg.account-multiple')
				<h2>Users</h2>
			</div>
			<div class="content">
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

		{{-- REPORTS --}}
		<div class="section shadow-2dp">
			<div class="header">
				@include('svg.file')
				<h2>Reports</h2>
			</div>
			<div class="content">
				<ul class="icon-list">
					<li>
						@include('svg.account')
						<a href="/reports/student">Report by Student</a>
					</li>
					<li>
						@include('svg.account')
						<a href="/reports/supervisor">Report by Supervisor</a>
					</li>
				</ul>
			</div>
		</div>

		{{-- Transactions --}}
		<div class="section shadow-2dp">
			<div class="header">
				<div class="svg-container">
					<svg viewBox="0 0 24 24">
						<path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
					</svg>
				</div>
				<h2>Transactions</h2>
			</div>
			<div class="content">
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

    	{{-- SETTINGS --}}
		<div class="section shadow-2dp">
			<div class="header">
				@include('svg.cog')
				<h2>Settings</h2>
			</div>
			<div class="content">
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
					<hr>
					<li>
						@include('svg.pencil')
						<a href="/system/strings">Edit Language Strings</a>
					</li>
					<li>
						@include('svg.pencil')
						<a href="/system/user-agent">User Agent Strings Overview</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
@endsection
