@foreach($userAgents as $agent)
<tr tabindex="0"><td>{{ $agent->user_agent }}</td><td></td></tr>
@endforeach