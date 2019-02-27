<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('TransactionController@index') }}">
			<span>@include('svg.database')<span>Browse Transactions</span></span>
		</a>
	</li>
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@archiveView') }}">
			<span>@include('svg.archive')<span>End of Year Archive</span></span>
		</a>
	</li>
</ul>
