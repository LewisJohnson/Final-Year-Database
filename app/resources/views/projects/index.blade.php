@extends('layouts.app')
@section ('content')
<div class="centered width-1200">
<h1>Projects</h1>

@if($view == "supervisor")
	<h3>Projects by {{ $supervisor_name }}</h3>
@endif

@if($view == "topic")
	<h3>Projects with the topic "{{ $topic->name }}"</h3>
@endif

@if($view == "index")
<form action="/search" method="get" accept-charset="utf-8">
	<div class="search-container shadow-4dp">
		<input class="search-input" style="flex-grow: 1;" type="search" name="searchTerm"  placeholder="Search...">
		<button class="svg" type="submit">
			<svg style="width:24px;height:24px" viewBox="0 0 24 24">
				<path fill="rgba(0, 0, 0, 0.5)" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
			</svg>
		</button>
		<button id="search-filter-button" type="button" class="dropbtn svg">
			<svg style="width:24px;height:24px" viewBox="0 0 24 24">
				<path fill="rgba(0, 0, 0, 0.5)" d="M3,2H21V2H21V4H20.92L14,10.92V22.91L10,18.91V10.91L3.09,4H3V2Z" />
			</svg>
		</button>
		<div class="search-filter-container">
			<ul class="search-filter">
				<li>
					<div class="checkbox">
						<input id="title" type="checkbox" checked>
						<label for="title" name="title">Title</label>
					</div>
				</li>
				<li>
					<div class="checkbox">
						<input id="description" type="checkbox" checked>
						<label for="description" name="description">Description</label>
					</div>
				</li>
				<li>
					<div class="checkbox">
						<input id="supervisor" type="checkbox" checked>
						<label for="supervisor" name="supervisor">Supervisor</label>
					</div>
				</li>
				<li>
					<div class="checkbox">
						<input id="topic" type="checkbox" checked>
						<label for="topic" name="topic">Topics</label>
					</div>
				</li>
			</ul>
		</div>
	</div>
</form>
@endif

<ul class="table-list table-list--margined projects-list shadow-2dp">
	<li class="project">
		<h3 style="flex-basis: 175px">Topic</h3>
		<h3 style="flex-basis: 300px; flex-grow: 1;">Project Title</h3>
		<h3 class="skills" style="flex-basis: 535px; @if($view == "supervisor") text-align: left; @endif">Skills</h3>
		@if($view != "supervisor")
			<h3 class="supervisor">Supervisor</h3>
		@endif
	</li>

	{{-- We have search results--}}
	@if(isset($results))
		<p> We found <b>{{count($results)}}</b> projects with the term "<b> {{ $searchTerm }}</b>"</p>
		@foreach($results as $project)
			<li class="project">
				<a href="/projects/{{$project->id}}">{{ $project->title }}</a>
				<p class="supervisor">{{ $project->getSupervisor()->user->getFullName() }}</p>
			</li>
		@endforeach
	{{-- We don't have any search results --}}
	@else
		@foreach($projects as $project)
			@php ($primary_topic = SussexProjects\ProjectTopic::getProjectPrimaryTopicName($project))
			<li class="project{!! ($project->archived) ? ' archived': '' !!}">
				<a style="flex-basis: 175px;" href="/topics/{{$primary_topic}}">{{ $primary_topic }}</a>
				<a style="flex-basis: 300px; flex-grow: 1;" href="/projects/{{$project->id}}">{{ $project->title }}</a>
				<p class="skills" style="flex-basis: 500px; @if($view == "supervisor") text-align: left; @endif">{{ $project->skills }}</p>
				@if($view != "supervisor")
					<a href="projects/bySupervisor/{{ $project->getSupervisor()->id }}">{{ $project->getSupervisor()->user->getFullName() }}</a>
				@endif
			</li>
		@endforeach
	@endif
</ul>
</div>
@endsection