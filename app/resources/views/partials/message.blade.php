@if (session('message'))
<div class="notification {{ session('message_type') }}" role="alert">
	<p>{{ session('message') }}</p>
</div>
@endif