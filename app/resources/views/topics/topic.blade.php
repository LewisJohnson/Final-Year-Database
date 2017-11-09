@extends('layouts.app')
@section ('content')

<h2>Projects with the tag "{{ $topic->getUnsluggedName() }}".</h2>
<ul>
	@foreach($topic->projects as $project)
		<li>
			<a class="primary-topic" href="/projects/{{ $project->id }}">{{ $project->title }}</a>
		</li>
	@endforeach
</ul>
@endsection