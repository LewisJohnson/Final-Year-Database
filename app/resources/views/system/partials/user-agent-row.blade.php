@foreach($userAgents as $agent)
<tr tabindex="0">
	<td>{{ $agent->user_agent }}</td>
	<td>{{ $agent->referrer }}</td>
</tr>
@endforeach