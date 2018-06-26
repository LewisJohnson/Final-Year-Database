@if(Session::has('message'))
	<div class="notification {{ Session::get('message_type') }}" role="alert">
		<p>{{ Session::get('message') }}</p>
	</div>
@endif

@if(Session::has('ldap_guest_message'))
	<script>
		var message = "You are in Guest Mode. This means you are a member of the University of Sussex, however, you do not have an account on the system. You can only perform basic tasks such as browsing projects."
		$.confirm({
			type: 'blue',
			icon: '<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg></div>',
			theme: 'modern',
			escapeKey: true,
			animateFromElement : true,
			backgroundDismiss: false,
			title: 'Guest Mode',
			content: message,
			buttons: {
				okay: {},
			}
		});
	</script>
@endif