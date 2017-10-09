@if ($notification = session('message'))
<div class="notification" role="alert">
	<p>{{ $notification }}</p>
</div>
@endif