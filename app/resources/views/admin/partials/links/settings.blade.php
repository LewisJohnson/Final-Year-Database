<ul class="icon-list">
	<li>
		<a class="icon" href="{{ action('AdminController@assignMarkerAutomaticView') }}">
			@include('svg.memory')
			<p>Compute Second Markers</p>
		</a>
	</li>

	<li>
		<a class="icon" href="{{ action('AdminController@swapMarkerView') }}">
			@include('svg.swap')
			<p>Swap Second Markers</p>
		</a>
	</li>

	<li>
		<a class="icon" href="{{ action('AdminController@assignMarkerManualView') }}">
			@include('svg.account-multiple-plus')
			<p>Manually Assign Second Markers</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('AdminController@amendTopicsView') }}">
			@include('svg.playlist-edit')
			<p>Edit Topics</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('AdminController@amendProgrammesView') }}">
			@include('svg.playlist-edit')
			<p>Edit Programmes</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('AdminController@amendParametersView') }}">
			@include('svg.spanner')
			<p>Amend Parameters</p>
		</a>
	</li>
</ul>
