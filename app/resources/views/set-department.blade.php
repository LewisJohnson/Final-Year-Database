@extends('layouts.app')
@section('content')

<div class="centered mw-800">
	<div class="text-center">
		<h1>Welcome.</h1>
		<p class="text-muted">Please select a department.</p>
	</div>

	<div class="department-select d-flex flex-wrap mt-5">
		@foreach(get_departments() as $key => $department)
			<form role="form" method="POST" action="{{ action('HomeController@setDepartment') }}">
				{{ csrf_field() }}
				<input type="hidden" name="department" value="{{ $department }}">
				<button type="submit" class="btn border-0 rounded-0" style="background-image: url('{{ asset('images/thumbnails/'.$department.'.jpg') }}')">
					<span>{{ ucfirst($department) }}</span>
				</button>
			</form>
		@endforeach
	</div>
</div>
@endsection
