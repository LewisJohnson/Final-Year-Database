@extends('layouts.app')
@section('content')
<div class="centered mw-800 card">
	<h1>Edit User</h1>
	<h3>You are editing {{ $user->getFullName() }}</h3>

	@include('forms.user', ['view' => 'edit'])
</div>
@endsection

