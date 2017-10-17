@extends('layouts.app')
@section('content')
<h2>Log in with your Sussex credentails.</h2>
<form role="form" method="POST" action="{{ route('login') }}">
    {{ csrf_field() }}

    <div class="form-field{{ $errors->has('username') ? ' has-error' : '' }}">
        <label class="hover-label" for="username">Username</label>
        <input id="username"  type="text" name="username" value="{{ old('username') }}" required autofocus>

        @if($errors->has('username'))
            <span class="help-block">
                <strong>{{ $errors->first('username') }}</strong>
            </span>
        @endif
    </div>

    <div class="form-field{{ $errors->has('password') ? ' has-error' : '' }}">
        <label class="hover-label" for="password">Password</label>
        <input id="password" type="password" name="password" required>
        
        @if ($errors->has('password'))
            <span class="help-block">
                <strong>{{ $errors->first('password') }}</strong>
            </span>
        @endif
    </div>

    <div class="form-field">
        <div class="checkbox">
            <label>
                <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
            </label>
        </div>
    </div>

    <div class="form-field">
        <button type="submit">Login</button>
        
    </div>
</form>


@endsection
