<ul class="icon-list">
	<li>
		<a class="icon" href="{{ action('AdminController@assignMarkerManualView') }}">
			@include('svg.account-multiple-plus')
			<p>Manual Assign Second Marker</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('AdminController@assignMarkerAutomaticView') }}">
			@include('svg.account-multiple-plus')
			<p>Automatic Assign Second Marker</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('AdminController@amendTopicsView') }}">
			@include('svg.spanner')
			<p>Edit Topics</p>
		</a>
	</li>
	{{-- <li>
		<a class="icon" href="{{ action('AdminController@Parameters') }}">
			@include('svg.globe')
			<p>Change Global Parameters</p>
		</a>
	</li> --}}
</ul>
