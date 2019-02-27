@extends('layouts.app')
@section ('content')
	<div class="centered animated-entrance mw-800">
		<div class="card">
			<h5 class="card-header">About</h5>
			<div class="card-body">
				<p>@lang("help.about")</p>

				<div class="row">
					<div class="col-3">
						<a href="https://github.com/lewisJohnson/Final-Year-Database">
							<img src="{{ asset('images/github-logo.png') }}" alt="The github logo" class="img-thumbnail">
						</a>
					</div>
		
					<div class="col-3">
						<a href="https://laravel.com" title="Laravel">
							<img src="{{ asset('images/laravel-logo.png') }}" alt="The Laravel logo" class="img-thumbnail">
						</a>
					</div>
		
					<div class="col-3">
						<a href="https://nodejs.org" title="NodeJs">
							<img src="{{ asset('images/nodejs-logo.png') }}" alt="The NodeJs logo" class="img-thumbnail">
						</a>
					</div>
		
					<div class="col-3">
						<a href="https://getbootstrap.com" title="Bootstrap">
							<img src="{{ asset('images/bootstrap-logo.png') }}" alt="The Bootstrap logo" class="img-thumbnail">
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
@endsection
