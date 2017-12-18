@extends('layouts.admin')
@section('content')
<div class="centered width-800">
<h1>User Agent Strings</h1>
<h3>An overview of user agent strings</h3>

<table class="data-table shadow-2dp" style="text-align: left">
	<thead>
		<tr>
			<th>User Agent</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
	@foreach($userAgents as $agent)
		<tr tabindex="0">
			<td>{{ $agent->user_agent }}</td>
			<td></td>
		</tr>
	@endforeach
	</tbody>
</table>

{{ $userAgents->links() }}
</div>
@endsection