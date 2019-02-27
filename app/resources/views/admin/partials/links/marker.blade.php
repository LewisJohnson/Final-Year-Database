<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@computeSecondMarkerView') }}">
			<span>@include('svg.memory')<span class="ml-1">Automatic Second Marker Assignment</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@manualSecondMarkerView') }}">
			<span>@include('svg.account-supervisor')<span class="ml-1">Manual Second Marker Assignment</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@swapSecondMarkerView') }}">
			<span>@include('svg.swap')<span class="ml-1">Swap Second Markers</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@exportSecondMarkerDataView') }}">
			<span>@include('svg.database-export')<span class="ml-1">Export Second Marker Data</span></span>
		</a>
	</li>
</ul>
