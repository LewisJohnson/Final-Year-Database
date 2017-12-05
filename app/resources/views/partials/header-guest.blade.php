<header id="header" class="desktop">
	<img class="logo" src="/images/sussex-logo.jpg">
	<h1>@string("homepage_main_header")</h1>
	<button class="login-button button button--raised">Login</button>
</header>

<nav class="desktop">
	<ul>
		<li class="nav-button nav-button--desktop"><a href="/" title="">Home</a></li>
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
	<a href="/" title=""><h1>@string("homepage_main_header")</h1></a>
</header>

<nav class="mobile" aria-hidden="true">
	<div style="width: 100%; height: 100%; overflow-y: scroll;">
	<ul>

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
			<a href="{{ route('logout') }}"onclick="event.preventDefault();document.getElementById('logout-form').submit();">Logout</a>
			<form id="logout-form" class="form form--flex" action="{{ route('logout') }}" method="POST" style="display: none;">
				{{ csrf_field() }}
			</form>
		</li>
	</ul>
</div>
</nav>

<div class="mobile-nav-underlay">
</div>