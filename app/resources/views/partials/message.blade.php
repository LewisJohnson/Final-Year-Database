@if (session('message'))
<div class="message {{ session('message_type') }}" role="alert">
	<p>{{ session('message') }}</p>
</div>
@endif