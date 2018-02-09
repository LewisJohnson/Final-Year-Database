@extends('layouts.app')
@section('content')
<div class="centered width-600 card">
	<h1>Add New User</h1>
	
	@include('forms.user', ['type' => 'new'])
</div>
@endsection
