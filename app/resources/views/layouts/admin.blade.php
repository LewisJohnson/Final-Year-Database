@extends('layouts.app')
@section ('scripts')
<script src="{{ asset('js/admin.js') }}"></script>
@endsection

@section ('styles')
	<link rel="stylesheet" href="{{ asset('css/admin.css') }}">
@endsection

{{-- @if (Auth::user()->isAdmin() !== true)
<script type="text/javascript">
    window.location = "{{ url('/login') }}";
</script>
@endif --}}