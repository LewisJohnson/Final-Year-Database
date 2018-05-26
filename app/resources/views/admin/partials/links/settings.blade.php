<ul class="icon-list">
	<li>
		<a class="icon" href="{{ action('ProjectAdminController@amendTopicsView') }}">
			@include('svg.playlist-edit')
			<p>Edit Topics</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('ProjectAdminController@amendProgrammesView') }}">
			@include('svg.playlist-edit')
			<p>Edit Programmes</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('ProjectAdminController@computeSecondMarkerView') }}">
			@include('svg.spanner')
			<p>Amend Parameters</p>
		</a>
	</li>
</ul>
