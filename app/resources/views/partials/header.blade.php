<header id="header" class="desktop">
	<img class="logo" src="/images/sussex-logo.jpg">
	@if(Session::get('db_type') == 'ug')
		<h1>@lang("messages_ug.homepage_main_header")</h1>
	@else
		<h1>@lang("messages_masters.homepage_main_header"))</h1>
	@endif
	<button class="logout-button button button--raised" onclick="document.getElementById('logout-form').submit();">Logout</a>
	@if($user->isSupervisorOrSuperior())
		<button class="change-auth-button button button--raised" data-activator="true" data-dialog="change-auth">Authentication</button>
	@endif
</header>

<nav class="desktop">
	<ul>
		{{-- <li class="nav-button nav-button--desktop"><img class="logo" src="/images/sussex-logo-no-text.png" style="width: 50px; height: 50px;"></li> --}}
		<li class="nav-button nav-button--desktop"><a href="/" title="">Home</a></li>
		<li class="nav-button nav-button--desktop dropdown">
			<button class="dropbtn">Browse</button>
			@include('svg.arrow-down')
			<div class="dropdown-content shadow-2dp">
				<a href="/projects" title="Browse all projects">Projects</a>
				<a href="/projects/bySupervisor" title="Browse projects sorted by supervisor">Projects by Supervisor</a>
				<a href="/projects/byTopic" title="Browse projects sorted by topic">Projects by Topics</a>
			</div>
		</li>
		@if(strpos(Session::get("auth_type"), 'supervisor') !== false)
			<li class="nav-button nav-button--desktop"><a href="/supervisor" title="Supervisor options">Supervisor</a></li>
		@endif
		@if(strpos(Session::get("auth_type"), 'admin') !== false)
			<li class="nav-button nav-button--desktop"><a href="/admin" title="Administrator options">Administrator</a></li>
		@endif

		@if($user->isStudent())
			<li class="nav-button nav-button--desktop dropdown">
				<button class="dropbtn">Student</button>
				@include('svg.arrow-down')
				<div class="dropdown-content shadow-2dp">
					<a href="/students/project-propose">Propose Project</a>
					<a href="/reports/supervisor">Report by Supervisor</a>
				</div>
			</li>
		@endif

		<li class="nav-button nav-button--desktop dropdown">
			<button class="dropbtn">Help</button>
			@include('svg.arrow-down')
			<div class="dropdown-content shadow-2dp">
				<a href="/help">System Help</a>
				<div class="sub-dropdown">
					<button class="sub-dropbtn">Links</button>
					@include('svg.arrow-right')
					<div class="dropdown-content shadow-2dp">
						@for ($i = 1; $i <= 20; $i++)
							@if(Lang::has("messages_ug.help_link_".$i))
								<a href="@lang("messages_ug.help_link_".$i."_url")">@lang("messages_ug.help_link_".$i)</a>
							@endif
						@endfor
					</div>
				</div>
				<a href="/information">General Information</a>
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
			<button class="button button--raised button--accent" onclick="document.getElementById('logout-form').submit();">Logout</a>
			<button class="button button--raised button--accent" data-activator="true" data-dialog="change-auth">Authentication</button>
		</li>
	</ul>
</div>
</nav>

<div class="mobile-nav-underlay">
</div>

<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
