@extends('layouts.app')
@section('content')
<div class="centered width--1600">
<h1>Language Strings</h1>

<div class="section-container">

<div class="section horizontal">
<h3>Guest Strings</h3>
@foreach ($strings as $string)
	<form class="form form--flex" role="form" action="" method="POST">
		<div class="form-field">
			<label for="{{ $string->key }}">{{ ucwords(str_replace('_', ' ', $string->key)) }}</label>
			<input id="{{ $string->key }}" type="text" class="form-control" name="{{ $string->key }}" value="{{ $string->value }}">
		</div>
	</form>
@endforeach
</div>

<div class="section horizontal">
<h3>Undergraduate Strings</h3>
	@foreach ($strings_ug as $string)
		<form class="form form--flex" role="form" action="" method="POST">
			<div class="form-field">
				<label for="{{ $string->key }}">{{ ucwords(str_replace('_', ' ', $string->key)) }}</label>
				<input id="{{ $string->key }}" type="text" class="form-control" name="{{ $string->key }}" value="{{ $string->value }}">
			</div>
		</form>
	@endforeach
</div>

<div class="section horizontal">
	<h3>Masters Strings</h3>
	@foreach ($strings_pg as $string)
		<form class="form form--flex" role="form" action="" method="POST">
			<div class="form-field">
				<label for="{{ $string->key }}">{{ ucwords(str_replace('_', ' ', $string->key)) }}</label>
				<input id="{{ $string->key }}" type="text" class="form-control" name="{{ $string->key }}" value="{{ $string->value }}">
			</div>
		</form>
	@endforeach
</div>

</div>
</div>
@endsection
