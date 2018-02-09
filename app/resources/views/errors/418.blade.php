@extends('layouts.error')
@section('content')

<div class="centered width-800 flex flex--row pointer tea-error">
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
		var tea = $('.tea');
		var teafill = $('.tea-fill');
		var teapot = tea.prev();
		var animPlayed = false;

		$('.tea-error').on('click', function(){
			if(animPlayed){
				return;
			}
			animPlayed = true;
			positionTea();
			teapot.addClass('teapot-anim');

			setTimeout(function (){
				tea.css('display', 'block');
				tea.animate({
					height: window.innerHeight - tea.offset().top
				}, 2000);

			}, 600);

			setTimeout(function (){
				teafill.css('display', 'block');
				teafill.css('animation', 'teafill 6s forwards');
			}, 2600);

			setTimeout(function (){
				tea.animate({ height: 0 }, 1600);
			}, 6400);

			setTimeout(function (){
				teapot.removeClass('teapot-anim');
				teapot.addClass('shake animated');
			}, 8200);
		});

		function positionTea(){
			var teapotPos = teapot[0].getBoundingClientRect();
			tea.css('left', teapotPos.right + 3);
			tea.css('top', teapotPos.top + 60);
		}
	});
</script>
@endsection
