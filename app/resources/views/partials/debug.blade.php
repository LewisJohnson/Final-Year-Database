{{-- <section id="debug">
	<h1>Debug</h1>
	<div class="debug-user">
		<h2>User Information</h2>
		<p>Logged in: <b>{{ $user = Auth::user() ? 'Yes' : 'No' }}</b></p>
		@if($user = Auth::user())
			<ul>
				<li>ID: {{ $user->id }}</li>
				<li>Username: {{ $user->username }}</li>
				<li>First Name: {{ $user->first_name }}</li>
				<li>Last Name: {{ $user->last_name }}</li>
				<li>Email: {{ $user->email }}</li>
				<li>Access Type: {{ $user->access_type }}</li>
				<li>Last login: {{ $user->last_login }}</li>
				<li>Remeber Token: {{ $user->remember_token }}</li>
			</ul>
		@else
		<p>You are a guest.</p>
		@endif
	</div>
	<div class="debug-project">
		<h2>Project Information</h2>
		@isset ($project)
			<ul>
				<li>
					{{ $project }}
				</li>
			</ul>
		@else
		<p>You are not on a project page.</p>
		@endisset
	</div> --}}
{{-- 	<div class="debug-topic">
		<h2>User Information</h2>
		<p>Logged in: <b>{{ $user = Auth::user() ? 'Yes' : 'No' }}</b></p>
		@if($user = Auth::user())
			<ul>
				<li>ID: {{ $user->id }}</li>
				<li>Username: {{ $user->username }}</li>
				<li>First Name: {{ $user->first_name }}</li>
				<li>Last Name: {{ $user->last_name }}</li>
				<li>Email: {{ $user->email }}</li>
				<li>Access Type: {{ $user->access_type }}</li>
				<li>Last login: {{ $user->last_login }}</li>
				<li>Remeber Token: {{ $user->remember_token }}</li>
			</ul>
		@endif
	</div> --}}
</section>