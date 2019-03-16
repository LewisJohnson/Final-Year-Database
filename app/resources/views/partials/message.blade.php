@if(Session::has('message'))
	<div class="notification shadow-lg {{ Session::get('message_type') }}" role="alert">
		<p>{{ Session::get('message') }}</p>
	</div>
@endif