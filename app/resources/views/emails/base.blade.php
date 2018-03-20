<link rel="stylesheet" href="{{ asset('css/email.css') }}">

<div class="email-body">
@yield('body')

<footer class="footer">
	<img src="{{ asset('images/email-logo.png') }}">
	<p style="margin-top: 6px;">Final Year Project Database</p>
	<p>Department of Engineering and Informatics</p>
	<p>University of Sussex</p>
	<br>
	<p style="opacity: 0.5; font-size: 12px;">This is an automated message, to stop receiving these emails, login and untick "receive emails" on your homepage.</p>
</footer>
</div>