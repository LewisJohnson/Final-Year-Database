<ul class="icon-list">
	<li>
		<a class="icon" href="{{ action('AdminController@assignMarkerManual') }}">
			@include('svg.account-multiple-plus')
			<p>Manual Assign Second Marker</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('AdminController@assignMarkerAutomatic') }}">
			@include('svg.account-multiple-plus')
			<p>Automatic Assign Second Marker</p>
		</a>
	</li>
	<li>
		<a class="icon" href="/admin/topics-amend">
			@include('svg.spanner')
			<p>Edit Topics</p>
		</a>
	</li>
	<li>
		<a class="icon" href="/admin/parameters">
			@include('svg.globe')
			<p>Change Global Parameters</p>
		</a>
	</li>
</ul>
