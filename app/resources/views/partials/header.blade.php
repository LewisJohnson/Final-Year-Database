<header id="header" class="">
	<img class="logo" src="/images/sussex-logo.jpg">
	@if(Session::get('db_type') == 'ug')
		<h1>Informatics Final Year Projects</h1>
	@else
		<h1>Informatics Masters Projects</h1>
	@endif
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
					<a href="/projects" title="">Projects</a>
					<a href="/projects?sort=supervisor" title="">By Supervisor</a>
					<a href="/topics" title="">Topics</a>
			  </div>
			</li>
			@if(strpos(Session::get("auth_type"), 'supervisor') !== false)
				<li class="nav-button"><a href="/supervisor" title="">Supervisor</a></li>
			@endif
			@if(strpos(Session::get("auth_type"), 'admin') !== false)
				<li class="nav-button"><a href="/admin" title="">Administrator</a></li>
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