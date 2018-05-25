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
		<a class="icon" href="{{ action('AdminController@exportMarkerDataView') }}">
			@include('svg.database-export')
			<p>Export Second Marker Data</p>
		</a>
	</li>
</ul>
