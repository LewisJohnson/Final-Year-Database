<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendTopicsView') }}">
			<span>@include('svg.playlist-edit')<span class="ml-1">Edit Topics</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendProgrammesView') }}">
			<span>@include('svg.playlist-edit')<span class="ml-1">Edit Programmes</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@amendParametersView') }}">
			<span>@include('svg.spanner')<span class="ml-1">Amend Parameters</span></span>
		</a>
	</li>
</ul>
