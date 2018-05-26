<ul class="icon-list">
	<li>
		<a class="icon" href="{{ action('AdminController@computeSecondMarkerView') }}">
			@include('svg.memory')
			<p>Compute Second Markers</p>
		</a>
	</li>

	<li>
		<a class="icon" href="{{ action('ProjectAdminController@swapSecondMarkerView') }}">
			@include('svg.swap')
			<p>Swap Second Markers</p>
		</a>
	</li>

	<li>
		<a class="icon" href="{{ action('ProjectAdminController@manualSecondMarkerView') }}">
			@include('svg.account-multiple-plus')
			<p>Manually Assign Second Markers</p>
		</a>
	</li>

	<li>
		<a class="icon" href="{{ action('ProjectAdminController@exportSecondMarkerDataView') }}">
			@include('svg.database-export')
			<p>Export Second Marker Data</p>
		</a>
	</li>
</ul>
