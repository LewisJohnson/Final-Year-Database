<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendTopicsView') }}">
			<span>@include('svg.playlist-edit')<span>Edit Topics</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendProgrammesView') }}">
			<span>@include('svg.playlist-edit')<span>Edit Programmes</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendSupervisorArrangementsView') }}">
			<span>@include('svg.account-settings')<span>Amend Supervisors Arrangements</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ModeController@index') }}">
			<span>@include('svg.globe')<span>Amend <span class="text-uppercase">{{ get_el_short_name() }}</span> Parameters</span></span>
		</a>
	</li>
</ul>
