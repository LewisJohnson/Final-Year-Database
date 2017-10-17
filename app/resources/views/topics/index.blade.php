@extends('layouts.app')
@section ('content')

<h2>Topics</h2>
<ul>
@foreach($topics as $topic)
	<li>
		 <a class="primary-topic" href="/topics/{{$topic->name}}">{{ $topic->name }}</a>
	</li>
@endforeach
</ul>
@endsection