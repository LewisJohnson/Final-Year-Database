<style>
	@import url(https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,600,700,800,900);body{position:relative;min-height:calc(100% - 50px);margin:0 0 50px}ul{padding:0;margin:0}html{height:100%;-webkit-box-sizing:border-box;box-sizing:border-box}code{background:rgba(0,0,0,.03);padding:5px;display:inline-block}*,*:before,*:after{-webkit-box-sizing:inherit;box-sizing:inherit}.main-content{outline:none;-webkit-transition:.24s all ease-out;transition:.24s all ease-out;padding:3rem 0}body{font-family:"Roboto",sans-serif;font-size:16px}h1{color:#4f4f4f}h2{color:#565656}h3{color:#5e5e5e}h4{color:#666}h5{color:#6d6d6d}p,a{color:#757575}ul{color:#757575}ins{color:darkgray;text-decoration:none}.email-body{max-width:800px;margin:1rem auto 0;-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);border:1px solid rgba(0,0,0,.12);padding:1rem;word-wrap:break-word;border-radius:2px}.email-body p,.email-body a{margin:5px 0}.email-body h2{margin-top:5px}.email-body ul{padding-left:40px}.email-body .accept-date-in-future{background:#f77;color:white;padding:1rem;margin-top:1rem}.email-body .footer{margin:-1rem;margin-top:20px;padding:5px 1rem;border-top:1px solid rgba(0,0,0,.12);background:whitesmoke;position:relative;z-index:1;color:#757575}.email-body .footer img{padding-right:5px;width:75px;float:left}.email-body .footer p{margin:0}	
</style>

<div class="email-body">
	@yield('body')

	<div class="footer">
		<img src="{{ asset('images/email-logo.png') }}">
		<p style="margin-top: 6px;">Final Year Project Database</p>
		<p>Department of Engineering and Informatics</p>
		<p>University of Sussex</p>
		<br>
		<p style="opacity: 0.5;font-size: 12px;text-align: center;">To stop receiving these emails, login and un-check "receive emails" on your homepage.</p>
	</div>
</div>