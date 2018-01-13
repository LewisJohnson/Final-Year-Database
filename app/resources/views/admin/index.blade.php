@extends('layouts.app')
@section('content')
@php($user = Auth::user())
<div class="centered width-800">
	<h1>@lang_sess("admin_hub_title")</h1>
	<div class="admin hub">
		@include('admin.partials.hub-section', ['title' => 'Users', 'links' => 'user', 'svg' => 'account-multiple'])
		@include('admin.partials.hub-section', ['title' => 'Reports', 'links' => 'report', 'svg' => 'file'])
		@include('admin.partials.hub-section', ['title' => 'Transactions', 'links' => 'transaction', 'svg' => 'database'])
		@include('admin.partials.hub-section', ['title' => 'Settings', 'links' => 'settings', 'svg' => 'cog'])
	</div>
</div>
@endsection
