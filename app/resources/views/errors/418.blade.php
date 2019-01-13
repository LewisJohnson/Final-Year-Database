@extends('layouts.error')
@section('content')

<div class="centered mw-800 flex flex--row cursor--pointer tea-error">
	@include('svg.teapot')
	<div class="tea"></div>
	<div class="tea-fill"></div>
	<div style="margin-left: auto;">
		<h1>Error 418 - I'm a teapot.</h1>
		<p>The requested entity body is short and stout. <ins>Tip me over and pour me out.</ins></p>
	</div>
</div>

<script>
	$(function() {
		// Set body height
		$('body').css({
			'height': '100vh',
			'overflow-y': 'hidden'
		});

		var flowingTea = $('.tea');
		var teafill = $('.tea-fill');
		var teapot = flowingTea.prev();
		var animPlayed = false;

		$('.tea-error').on('click', function(){
			if(animPlayed){
				return;
			}
			animPlayed = true;
			positionTea();
			teapot.addClass('teapot-anim');

			setTimeout(function (){
				flowingTea.css('display', 'block');
				flowingTea.animate({
					height: window.innerHeight - flowingTea.offset().top
				}, 2000);

			}, 600);

			setTimeout(function (){
				teafill.css('display', 'block');
				teafill.css('animation', 'teafill 6s forwards');
			}, 2600);

			setTimeout(function (){
				flowingTea.animate({ height: 0 }, 1600);
			}, 6400);

			setTimeout(function (){
				teapot.removeClass('teapot-anim');
				teapot.addClass('shake animated');
				teafill.animate({ opacity: 0 }, 300);
			}, 8400);
		});

		function positionTea(){
			var teapotPos = teapot[0].getBoundingClientRect();
			flowingTea.css('left', teapotPos.right + 3);
			flowingTea.css('top', teapotPos.top + 60);
		}
	});
</script>
@endsection
