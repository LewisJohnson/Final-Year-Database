@extends('layouts.app')
@section ('content')
	<div class="centered fancy-page about-page animated-entrance mw-800">
		<h1>About</h1>
		
		<div class="card card--margin-vertical">
			<p>@lang("help.about")</p>
		</div>

		<ul class="flex flex--wrap flex--row card card--margin-vertical list-style--none list--thirds">
			<li>
				<a href="https://github.com/lewisJohnson/Final-Year-Database" title="Laravel">
					<img src="{{ asset('images/github-logo.png') }}" alt="">
				</a>
			</li>

			<li>
				<a href="https://laravel.com" title="Laravel">
					<img src="{{ asset('images/laravel-text-logo.png') }}" alt="">
				</a>
			</li>

			<li>
				<a href="https://nodejs.org" title="NodeJs">
					<img src="{{ asset('images/nodejs-logo.png') }}" alt="">
				</a>
			</li>
		</ul>
	</div>
@endsection
