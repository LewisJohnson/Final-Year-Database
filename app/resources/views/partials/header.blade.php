<header id="header" class="desktop">
	<img class="logo" src="/images/sussex-logo.jpg">
	@if(Session::get('db_type') == 'ug')
		<h1>@string("homepage_main_header", "ug")</h1>
	@else
		<h1>@string("homepage_main_header", "masters")</h1>
	@endif
	<a class="logout-button 
	button button--raised" href="{{ route('logout') }}"onclick="event.preventDefault();document.getElementById('logout-form').submit();">Logout</a>
	<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
</header>


<nav class="desktop">
	<ul>
		<li class="nav-button nav-button--desktop"><a href="/" title="">Home</a></li>
		<li class="nav-button nav-button--desktop dropdown">
			<button class="dropbtn">Browse</button>
			<div class="dropdown-content">
				<a href="/projects" title="">Projects</a>
				<a href="/projects/bySupervisor" title="">By Supervisor</a>
				<a href="/projects/byTopic" title="">Topics</a>
			</div>
		</li>
		@if(strpos(Session::get("auth_type"), 'supervisor') !== false)
			<li class="nav-button nav-button--desktop"><a href="/supervisor" title="">Supervisor</a></li>
		@endif
		@if(strpos(Session::get("auth_type"), 'admin') !== false)
			<li class="nav-button nav-button--desktop"><a href="/admin" title="">Administrator</a></li>
		@endif
		<li class="nav-button nav-button--desktop dropdown">
			<button class="dropbtn">Student</button>
			<div class="dropdown-content">
			<a href="/students/proposeProject">Propose Project</a>
			<a href="/reports/supervisor">Report by Supervisor</a>
			</div>
		</li>
		<li class="nav-button nav-button--desktop dropdown">
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

<header id="header" class="mobile">
	<div class="hamburger-container" role="button">
		<ul class="hamburger-list">
			<li class="hamburger-line hamburger-line--short"></li>
			<li class="hamburger-line"></li>
			<li class="hamburger-line hamburger-line--short"></li>
		</ul>
	</div>
	@if(Session::get('db_type') == 'ug')
		<a href="/" title=""><h1>Informatics Final Year Projects</h1></a>
	@else
		<a href="/" title=""><h1>Informatics Masters Projects</h1></a>
	@endif
</header>

<nav class="mobile" aria-hidden="true">
	<div style="width: 100%; height: 100%; overflow-y: scroll;">
	<ul>
		@if(strpos(Session::get("auth_type"), 'supervisor') !== false)
			<li class="nav-button nav-button--mobile"><a href="/supervisor" title="">Supervisor</a></li>
		@endif
		@if(strpos(Session::get("auth_type"), 'admin') !== false)
			<li class="nav-button nav-button--mobile"><a href="/admin" title="">Administrator</a></li>
		@endif

		<h3>Browse</h3>
		<li class="nav-button nav-button--mobile nav-button--grouped">
			<a href="/projects" title="">Projects</a>
		</li>

		<li class="nav-button nav-button--mobile nav-button--grouped">
			<a href="/projects?sort=supervisor" title="">By Supervisor</a>
		</li>

		<li class="nav-button nav-button--mobile nav-button--grouped">
			<a href="/topics" title="">Topics</a>
		</li>

		<h3>Help</h3>
		<li class="nav-button nav-button--mobile nav-button--grouped">
			<a href="/help">System Help</a>
		</li>

		<li class="nav-button nav-button--mobile nav-button--grouped">
			<a href="/links">Links</a>
		</li>
		
		<li class="nav-button nav-button--mobile nav-button--grouped">
			<a href="/information">General Information</a>	
		</li>
		
		<li class="nav-button nav-button--mobile nav-button--grouped">
			<a href="/about">About</a>
		</li>
		<li class="footer">
			<a href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">Logout</a>
			<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
				{{ csrf_field() }}
			</form>
		</li>
	</ul>
</div>
</nav>

<div class="mobile-nav-underlay">
</div>