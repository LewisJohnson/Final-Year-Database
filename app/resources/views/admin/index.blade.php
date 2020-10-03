@extends('layouts.app')

@section('content')
<style>
	.centered.mw-800 .svg-container{
		display: inline-block;
		width: 20px;
		height: 18px;
	}
</style>
	<div class="centered mw-800">
		<h1>{{ lang_sess("admin_hub_title") }}</h1>
		<div class="row mt-3">
			@include('admin.partials.hub-section', ['title' => 'Users', 'links' => 'user', 'svg' => 'account-multiple'])
			@include('admin.partials.hub-section', ['title' => 'Reports', 'links' => 'report', 'svg' => 'clipboard'])
			@include('admin.partials.hub-section', ['title' => 'Transactions', 'links' => 'transaction', 'svg' => 'clock'])
			@include('admin.partials.hub-section', ['title' => 'Settings', 'links' => 'settings', 'svg' => 'cog'])
			@include('admin.partials.hub-section', ['title' => 'Second Marker', 'links' => 'marker', 'svg' => 'account-multiple'])
			@include('admin.partials.hub-section', ['title' => 'Project Evaluation', 'links' => 'evaluation', 'svg' => 'clipboard-check'])
			@include('admin.partials.hub-section', ['title' => 'Projects', 'links' => 'projects', 'svg' => 'file'])
		</div>
	</div>
@endsection
