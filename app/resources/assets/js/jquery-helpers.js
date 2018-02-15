$(function() {
	$(window).scroll(function(){
		if ($(this).scrollTop() > config.showScrollToTopButtonOffset) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

	$("body").on("click", ".scroll-to-top", function(e) {
		$('html, body').animate({
			scrollTop: 0
		}, config.scrollToTopDuration);
	});

	// Student home page project preview
	$("body").on("click", ".show-more",  function(e) {
		$(this).hide();
		$('.project').addClass('expand');
	});

	// Toggle label flips toggle
	$("body").on("click", ".switch-label.switch-label--toggle",  function(e) {
		var id = "#" + $(this).attr('for');
		$(id).click();
	});


	// Checkbox form toggle
	$("body").on("click", ".form-field--toggle",  function(e) {
		if($(e.target).hasClass("toggle") || $(e.target).parent().hasClass("toggle")){
			return;
		}

		$(this).find('input:checkbox').click();
	});

	// Cookie Banner
	$(".cookie-banner").on("click", "button",  function(e) {
		$.ajax({method: 'POST', url: '/seen-cookie-banner'});
		$(this).parent().hide(config.animtions.medium);
	});

	$(".db-type-form").on("submit",  function(e) {
		$.ajax({
			method: 'POST',
			url: $(this).prop('action'),
			data: $(this).serialize()
		}).done(function(){
			location.reload(true);
		});
	});


	$(".boolean-checkbox").each(function() {
		$(this).parent().parent().after('<input type="hidden" name="' + $(this).attr("name") + '" value="' + $(this).is(':checked') +'" />');
	});

	$("body").on("click", ".boolean-checkbox",  function(e) {
		if($(this).is(':checked')) {
			$(this).parent().parent().next().val("true");
		} else {
			$(this).parent().parent().next().val("false");
		}
	});

	$('#show-raw-table-data').on('click', function() {
		if($(this).prop('checked')){
			$('table.raw-detail').css('width', $('table.full-detail').css('width'));
			$('table.full-detail').css('position', 'absolute');
			$('table.raw-detail').css('position', 'absolute');

			$('table.full-detail').fadeOut(config.animtions.fast);
			$('table.raw-detail').fadeIn(config.animtions.fast, function(){
				$(this).css('position', 'relative');
			});
		} else {
			$('table.full-detail').css('width', $('table.raw-detail').css('width'));
			$('table.full-detail').css('position', 'absolute');
			$('table.raw-detail').css('position', 'absolute');

			$('table.raw-detail').fadeOut(config.animtions.fast);
			$('table.full-detail').fadeIn(config.animtions.fast, function(){
				$(this).css('position', 'relative');
			});
		}
	});

	$('.remember-with-cookie:checkbox').on('change', function() {
		rememberFormValues("checkbox");
	});

	repopulateCheckboxes();
});
