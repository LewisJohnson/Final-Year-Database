@extends('layouts.admin')
@section('content')
<h2>Amend Topics</h2>
<p>There are a total of {{ count(App\Student::get()) }} students.</p>
<ul class="edit-topic-list">
@foreach(App\Topic::get() as $topic)
	<li>
		<form  action="{{ action('TopicController@edit', $topic)}}" role="form" method="post">
			{{ csrf_field() }}
			{{ method_field('PATCH') }}
			<input name="name" type="text" value="{{ $topic->name }}"></input>
			<button>Edit</button>
		</form>
	</li>
@endforeach
</ul>
@endsection