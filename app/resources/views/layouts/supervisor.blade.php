@extends('layouts.app')

@section ('scripts')
<script src="{{ asset('js/supervisor.js') }}"></script>
@endsection
{{-- @if (Auth::user()->isAdmin() || Auth::user()->isSupervisor())
<script type="text/javascript">
    window.location = "{{ url('/login') }}";
</script>
@endif --}}