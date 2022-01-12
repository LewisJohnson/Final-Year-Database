<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@secondMarkerView') }}">
			<span>@include('svg.memory')<span>Automatic Assignment</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@manualSecondMarkerView') }}">
			<span>@include('svg.account-supervisor')<span>Manual Assignment</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@swapSecondMarkerView') }}">
			<span>@include('svg.swap')<span>Swap Second Markers</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@exportSecondMarkerDataView') }}">
			<span>@include('svg.database-export')<span>Export Data</span></span>
		</a>
	</li>
</ul>
