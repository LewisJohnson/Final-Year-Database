@extends('layouts.admin')
@section('content')
<h2>Login As Another User</h2>
<p>There are a total of {{ count(App\User::get()) }} users.</p>

<h3>Supervisors</h3>
<ul>
	@foreach(App\User::Where('access_type', 'supervisor')->get() as $user)
		<li>
			<a href="{{ action('AdminController@loginAs', $user->id) }}">{{ $user->getFullName() }}</a>
		</li>
	@endforeach
</ul>

<h3>Students</h3>
<ul>
	@foreach(App\User::Where('access_type', 'student')->get() as $user)
		<li>
			<a href="{{ action('AdminController@loginAs', $user->id) }}">{{ $user->getFullName() }}</a>
		</li>
	@endforeach
</ul>

<h3>Staff</h3>
<ul>
	@foreach(App\User::Where('access_type', 'staff')->get() as $user)
		<li>
			<a href="{{ action('AdminController@loginAs', $user->id) }}">{{ $user->getFullName() }}</a>
		</li>
	@endforeach
</ul>


<h3>Administrators</h3>
<ul>
	@foreach(App\User::Where('access_type', 'admin')->get() as $user)
		<li>
			<a href="{{ action('AdminController@loginAs', $user->id) }}">{{ $user->getFullName() }}</a>
		</li>
	@endforeach
</ul>
@endsection