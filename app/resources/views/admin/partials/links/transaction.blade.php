<ul class="icon-list">
{{-- 	<li>
		<a class="icon" href="">
			@include('svg.file')
			<p>Browse Transactions by Project</p>
		</a>
	</li> --}}
	<li>
		<a class="icon" href="{{ action('TransactionController@index') }}">
			@include('svg.clock')
			<p>Browse Transactions by Time</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('ProjectAdminController@archiveView') }}">
			@include('svg.archive')
			<p>End of Year Archive</p>
		</a>
	</li>
</ul>
