<header id="header" class="">
	<img src="/images/logo.gif">
	<h1>Informatics Final Year Projects</h1>
	@if (Auth::user())
    	<a href="{{ route('logout') }}"
    	    onclick="event.preventDefault();
    	             document.getElementById('logout-form').submit();">
    	    Logout
    	</a>
    	<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
    	    {{ csrf_field() }}
    	</form>
	@else
		<a href="{{ route('login') }}" title="">Log in</a>
	@endif

	<nav>
		<ul>
			<li class="nav-button"><a href="/" title="">Home</a></li>
			<li class="nav-button"><a href="/projects" title="">Projects</a></li>
			<li class="nav-button"><a href="/help" title="">Help</a></li>
			<li class="nav-button"><a href="/about" title="">About</a></li>

			@if($user = Auth::user())
				@if($user->isAdmin() || $user->isSupervisor())
					<li class="nav-button"><a href="/supervisor" title="">Supervisor</a></li>
				@endif
				@if($user->isAdmin())
					<li class="nav-button"><a href="/admin" title="">Administrator</a></li>
				@endif
    		@endif
			
		</ul>
	</nav>
</header>