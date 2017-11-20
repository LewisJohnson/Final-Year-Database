<footer>
	@if ($user = Auth::user())
	<div class="footer-left">
		<button id="changeModeButton" class="">{{ Session::get("auth_type") }}</button>
{{-- 		<p class="seperator">|</p>
		<p >{{ ucwords($user->access_type) }} Access</p> --}}
		<p class="seperator">|</p>
		<p>{{ $user->username }}</p>
	</div>
	@endif
	<div class="footer-right">
		<a href="http://www.sussex.ac.uk/disclaimer/">Sussex websites Disclaimer</a>
		<p class="seperator">|</p>
		<p>Information maintained by Bernhard Reus</p>
	</div>
</footer>