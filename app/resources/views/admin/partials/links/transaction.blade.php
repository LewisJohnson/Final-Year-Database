<ul class="icon-list">
	<li>
		<a class="icon" href="{{ action('TransactionController@index') }}">
			@include('svg.database')
			<p>Browse Transactions</p>
		</a>
	</li>
	<li>
		<a class="icon" href="{{ action('ProjectAdminController@archiveView') }}">
			@include('svg.archive')
			<p>End of Year Archive</p>
		</a>
	</li>
</ul>
