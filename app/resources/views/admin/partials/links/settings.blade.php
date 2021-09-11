<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendTopicsView') }}">
			<span>@include('svg.playlist-edit')<span>Topics</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendProgrammesView') }}">
			<span>@include('svg.playlist-edit')<span>Programmes</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendSupervisorArrangementsView') }}">
			<span>@include('svg.account-settings')<span>Supervisor Arrangements</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ModeController@index') }}">
			<span>@include('svg.globe')<span>{{ ucfirst(get_el_long_name()) }} Parameters</span></span>
		</a>
	</li>
</ul>
