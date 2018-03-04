@extends('layouts.app')
@section('content')
<div class="centered animate-cards width--1000">
	<h1>Welcome.</h1>
	<h4>Please select a department.</h4>

	<div class="department-select flex flex--row flex--wrap">
		@foreach (departments() as $key => $department)
			<form role="form" method="POST" action="{{ action('HomeController@setDepartment') }}">
				{{ csrf_field() }}
				<input type="hidden" name="department" value="{{ $department }}">
				<button type="submit" style="background-image: url('{{ asset('images/thumbnails/'.$department.'.jpg') }}')"">
					<p>{{ ucfirst($department) }}</p>
				</button>
			</form>
		@endforeach
	</div>
</div>
@endsection