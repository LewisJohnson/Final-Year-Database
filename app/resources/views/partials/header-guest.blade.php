<header id="header" class="desktop">
	<img class="logo" src="/images/sussex-logo.jpg">
	<h1>@lang("messages.homepage_main_header")</h1>
	<button class="button button--raised login-button" data-activator="true" data-dialog="login">Login</button>
</header>

<nav class="desktop">
	<ul>
		<li class="nav-button nav-button--desktop"><a href="/" title="">Home</a></li>
		<li class="nav-button nav-button--desktop dropdown">
		  <button class="dropbtn">Help</button>
		  <div class="dropdown-content">
			<a href="/help">System Help</a>
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
	<a href="/" title=""><h1>@lang("messages.homepage_main_header")</h1></a>
</header>

<nav class="mobile" aria-hidden="true" aria-expanded="false">
	<div>
		<ul>
			<li><h3>Help</h3></li>
			<li class="nav-button nav-button--mobile nav-button--grouped">
				<a href="/help" title="System Help">System Help</a>
				<a href="/information" title="General Information">General Information</a>
				<a href="/about" title="About this software">About</a>
			</li>

			</li>

			<li class="footer">
				<button class="button button--accent button--raised" data-activator="true" data-dialog="login">Login</button>
			</li>
		</ul>
	</div>
</nav>

<div class="mobile-nav-underlay">
</div>
