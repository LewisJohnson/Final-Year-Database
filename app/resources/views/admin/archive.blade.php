@extends('layouts.app')
@section('content')

<div class="centered card width--1000">
	<h1>End of Year Archive</h1>
	<p>The end of year archive will do the following in a single transaction;</p>

	<ul>
		<li>Add “This student was undertaken by [STUDENT NAME]” to project description.</li>
		<li>Set all projects status to archived.</li>
		<li>Empty the student tables.</li>
		<li>Empty the transaction tables.</li>
		<li>Remove all students from the user table.</li>
	</ul>

	<p>Would you like to download any of these tables? (JSON)</p>
	<div class="button-group">
		<form action="/admin/export" method="GET" accept-charset="utf-8">
			{{ csrf_field() }}
			<input type="hidden" name="db" value="tran_ug">
			<button type="submit" class="button button--raised">Undergraduate Transaction</button>
		</form>

		<form action="/admin/export" method="GET" accept-charset="utf-8">
			{{ csrf_field() }}
			<input type="hidden" name="db" value="tran_masters">
			<button type="submit" class="button button--raised">Masters Transaction</button>
		</form>

		<form action="/admin/export" method="GET" accept-charset="utf-8">
			{{ csrf_field() }}
			<input type="hidden" name="db" value="uas">
			<button type="submit" class="button button--raised">User Agent Strings</button>
		</form>
	</div>

	<hr>
	<form action="/admin/archive" method="GET" accept-charset="utf-8">
		<button type="submit" class="button button--raised button--danger">Archive</button>
	</form>

</div>

@endsection
