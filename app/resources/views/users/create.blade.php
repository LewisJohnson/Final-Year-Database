@extends('layouts.app')
@section('content')
<div class="centered width--800 card">
	<h1>Add New User</h1>
	
	@include('forms.user', ['view' => 'new'])
</div>
@endsection
