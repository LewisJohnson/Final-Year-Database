@extends('layouts.app')
@section ('content')
@if($user = Auth::user())
	@if($user->isAdmin() || $user->isSupervisor())
		<div class="supervisor-panel">
			<h2>Supervisor Panel</h2>
			<ul class="buttons">
				<li class="nav-button"><a href="/projects/create" title="">New Project</a></li>
				<li class="nav-button"><a href="/supervisor" title="">My Projects</a></li>
			</ul>
		</div>
	@endif
@endif


<h2>Projects</h2>
<form action="/search" method="get" accept-charset="utf-8">
	<div>
		<h4>Search fields:</h3>
		<ul class="form-field search-filter">
			<li>
				<label><input checked type="checkbox" name="title">Title</label>
				
			</li>
			<li>
				<label><input checked type="checkbox" name="description">Description</label>
				
			</li>
			<li>
				<label><input checked type="checkbox" name="supervisor">Supervisor</label>
				
			</li>
			<li>
				<label><input checked type="checkbox" name="topic">Topics</label>
				
			</li>
		</ul>
	</div>
	<div style="display: flex;"">
		<input style="flex-grow: 1;" type="search" name="searchTerm"  placeholder="Search...">
		<button style="display: inline-block; width: 20%; background: white; border: 1px solid #888; border-left: 0;" type="submit">Search</button>
	</div>
</form>



<ul class="projects-list">
	<li class="project">
		<h3 class="primary-topic">Topic</h3>
		<h3>Project Title</h3>
		<h3 class="supervisor">Supervisor</h3>
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
	@elseif(isset($projects))
	{{-- We don't have any search results --}}
		@foreach($projects as $project)
			@php ($pt = App\ProjectTopic::getProjectPrimaryTopicName($project))
			<li class="project{!! ($project->archived) ? ' archived': '' !!}">
				<a class="primary-topic" href="/topics/{{$pt}}">{{ $pt }}</a>
				<a class="project-link" href="/projects/{{$project->id}}">{{ $project->title }}</a>
				<p class="supervisor">{{ $project->getSupervisor()->user->getFullName() }}</p>
			</li>
		@endforeach

    @endif
</ul>
@endsection