@extends('layouts.admin')
@section('content')
<div class="centered width-800">
<h1>User Agent Strings</h1>
<h3>An overview of user agent strings of everyone who has visited the index page.</h3>

<table id="user-agent-table" class="data-table shadow-2dp" style="text-align: left">
	<thead>
		<tr>
			<th>User Agent</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		@include('system.partials.user-agent-row')
	</tbody>
</table>
<div style="margin: 1rem auto" class="loader loader--medium user-agent"></div>
</div>
@endsection