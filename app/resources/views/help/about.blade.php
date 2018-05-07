@extends('layouts.app')
@section ('content')
	<div class="centered fancy-page width--800">
		<h1>About</h1>
		<div>
			<p>@lang("help.about")</p>

			<h2>Build with</h2>
			<ul class="flex flex--wrap flex--row" style="list-style: none;">
				<li style="width: 50%">
					<a href="#" title="">
						<img style="width: 100%; padding: 0 15%;" src="{{ asset('images/laravel-text-logo.png') }}" alt="">
					</a>
				</li>

				<li style="width: 50%">
					<a href="#" title="">
						<img style="width: 100%; padding: 0 15%;" src="{{ asset('images/nodejs-logo.png') }}" alt="">
					</a>
				</li>
			</ul>
		</div>
	</div>
@endsection
