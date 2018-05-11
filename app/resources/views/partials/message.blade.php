@if(Session::get('message'))
	<div class="notification {{ Session::get('message_type') }}" role="alert">
		<p>{{ Session::get('message') }}</p>
	</div>
@endif