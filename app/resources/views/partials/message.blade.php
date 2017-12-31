@if (session('message'))
<div class="notification {{ session('message_type') }}" role="alert">
	<p>{{ session('message') }}</p>
</div>
@else
<div class="notification" role="alert" style="display: none;">
	<p></p>
</div>
@endif
