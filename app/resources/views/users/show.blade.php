@extends('layouts.admin')

@section('content')
<h2>User Information</h2>
<p>ID: {{ $user->id }}</p>
<p>First Name: {{ $user->first_name }}</p>
<p>Last Name: {{ $user->last_name }}</p>
<p>Email: {{ $user->email }}</p>
<p>Username: {{ $user->username }}</p>
<p>Access Type: {{ $user->access_type }}</p>
<p>Last login: {{ $user->last_login }}</p>

<h3>Additional information</h3>
@if($user->access_type === "student")
    <p>RegNo: {{ $user->student->registration_number }}</p>
    <p>Programme: {{ $user->student->programme }}</p>
    <p>Project Status: {{ $user->student->project_status }}</p>
    <p>Project ID: {{ $user->student->project_id }}</p>
    <p>Share Project: {{ $user->student->share_project }}</p>
@elseif($user->access_type === "supervisor")
    <p>Title: {{ $user->supervisor->title }}</p>
    <p>Contact Type: {{ $user->supervisor->contact_type }}</p>
    <p>Project Load: {{ $user->supervisor->project_load }}</p>
    <p>Take Students: {{ $user->supervisor->take_students }}</p>
@else
    <p>None.</p>
@endif
@endsection
