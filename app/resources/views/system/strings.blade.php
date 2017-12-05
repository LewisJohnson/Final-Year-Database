@extends('layouts.admin')
@section('content')
<div class="centered width-1200">
<h1>Language Strings</h1>

@foreach ($strings as $string)
<form class="form form--flex" role="form" action="" method="POST">
	<div class="form-field">
		<label for="{{ $string->key }}">{{ ucfirst(str_replace('_', ' ', $string->key)) }}</label>
		<input id="{{ $string->key }}" type="text" class="form-control" name="{{ $string->key }}" value="{{ $string->value }}">
	</div>
</form>
@endforeach

<h3>Undergraduate Strings</h3>
@foreach ($strings_ug as $string)
<form class="form form--flex" role="form" action="" method="POST">
	<div class="form-field">
		<label for="{{ $string->key }}">{{ ucfirst(str_replace('_', ' ', $string->key)) }}</label>
		<input id="{{ $string->key }}" type="text" class="form-control" name="{{ $string->key }}" value="{{ $string->value }}">
	</div>
</form>
@endforeach

<h3>Masters Strings</h3>
@foreach ($strings_masters as $string)
<form class="form form--flex" role="form" action="" method="POST">
	<div class="form-field">
		<label for="{{ $string->key }}">{{ ucfirst(str_replace('_', ' ', $string->key)) }}</label>
		<input id="{{ $string->key }}" type="text" class="form-control" name="{{ $string->key }}" value="{{ $string->value }}">
	</div>
</form>
@endforeach
</div>
@endsection