@foreach($userAgents as $agent)
<tr tabindex="0">
	<td>{{ $agent->user_agent }}</td>

	@if(config('app.collect_referrer'))
		<td>{{ $agent->referrer }}</td>
	@else
		<td></td>
	@endif
</tr>
@endforeach