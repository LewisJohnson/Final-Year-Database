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
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendParametersView') }}">
			<span>@include('svg.globe')<span>Amend Global <span class="text-uppercase">{{ Session::get('education_level')["shortName"] }}</span> Parameters</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendParametersView') }}">
			<span>@include('svg.tune')<span>Amend <span class="text-uppercase">{{ Session::get('education_level')["shortName"] }}</span> Thresholds</span></span>
		</a>
	</li>
</ul>
