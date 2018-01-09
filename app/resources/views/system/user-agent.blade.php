@extends('layouts.admin')
@section('content')
<div class="centered width-800">
<h1>User Agent Strings</h1>
<h3>An overview of user agent strings of everyone who has visited the index page.</h3>

<div class="checkbox" style="margin-top: 15px;">
	<input class="checkbox-input" id="show-fv-only" type="checkbox"
	@if($_GET["unqiue"] == 1) checked data-goto="{{ action('AdminController@userAgent', "unqiue=0")}}" @else data-goto="{{ action('AdminController@userAgent', "unqiue=1")}}" @endif>
	<label for="show-fv-only">Show first visits only</label>
</div>

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
