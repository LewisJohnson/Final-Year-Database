<header id="header" class="">
	<img class="logo" src="/images/sussex-logo.jpg">
	<h1>Informatics Final Year Projects</h1>
		<a class="logout-button" href="{{ route('logout') }}"onclick="event.preventDefault();document.getElementById('logout-form').submit();">Logout</a>
		<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
			{{ csrf_field() }}
		</form>
</header>

<nav>
	<ul>
		<li class="nav-button"><a href="/" title="">Home</a></li>
			<li class="nav-button dropdown">
				<button class="dropbtn">Browse</button>
				<div class="dropdown-content">
					<a href="/ug/projects" title="">Projects</a>
					<a href="/ug/topics" title="">Topics</a>
					<a href="/ug/projectsBySupervisor" title="">By Supervisor</a>
			  </div>
			</li>
			@if($user->isUgAdmin() || $user->isSupervisor())
				<li class="nav-button"><a href="/ug/supervisor" title="">Supervisor</a></li>
			@endif
			@if($user->isUgAdmin())
				<li class="nav-button"><a href="/ug/admin" title="">Administrator</a></li>
			@endif
		<li class="nav-button dropdown">
		  <button class="dropbtn">Help</button>
		  <div class="dropdown-content">
			<a href="/help">System Help</a>
			<a href="/links">Links</a>
			<a href="/information">General Information</a>
			<a href="/about">About</a>
		  </div>
		</li>
	</ul>
</nav>
