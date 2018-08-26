@extends('layouts.app')
@section('content')

<div class="centered fancy-page width--800">
	<h1>Welcome.</h1>
	<p class="subtitle" style="margin-bottom: 3rem;">Please select a department.</p>

	<div class="department-select">
		@foreach(get_departments() as $key => $department)
			<form role="form" method="POST" action="{{ action('HomeController@setDepartment') }}">
				{{ csrf_field() }}
				<input type="hidden" name="department" value="{{ $department }}">
				<button type="submit" class="js-tilt {{ $department }}">
					<span>{{ ucfirst($department) }}</span>
				</button>
			</form>
		@endforeach
	</div>
</div>
@endsection
