@extends('layouts.supervisor')

@section ('scripts')
<script src="/js/project-topics.js" type="text/javascript" charset="utf-8"></script>
@endsection

@section ('content')

{!! App\Topic::getDatalist() !!}

<div class="supervisor-panel">
	<h2>Supervisor Panel</h2>
	<ul class="buttons">
		<li class="nav-button">
			<button id="deleteProjectButton">Delete Project</button>
		</li>
	</ul>
</div>

<h1>You are editing "{{ $project->title }}".</h1>

<form id="editProjectForm" role="form" method="POST" action="{{URL::to('/project/'.$project->id).'/edit' }}">
	{{ csrf_field() }}
	{{ method_field('PATCH') }}

	<div class="form-field">
		<label class="hover-label" for="title">Title</label>
		<input maxlength="255" type="text" name="title" id="title" value="{{ $project->title }}">
	</div>
	
	<div class="form-field">
		<label class="hover-label" for="description">Description</label>
		<textarea maxlength="16777215" type="text" name="description" id="description">{{ $project->description }}</textarea>
	</div>

	<div class="form-field">
		<label class="hover-label" for="skills">Skills</label>
		<input maxlength="255" type="text" name="skills" id="skills" value="{{ $project->skills }}"></input>
	</div>

	<div class="form-field">
		<p>Topics</p>
		<div id="newTopicInputContainer" class="fake-input">
			<ul class="topics-list edit">
				@foreach($project->topics as $topic)
					<li class="topic{!! ($topic->id == App\ProjectTopic::getProjectPrimaryTopicId($project)) ? ' first': '' !!}">
						<button type="button" class="topic-remove">X</button>
						<p class="topic-name">{{$topic->name}}</p>
					</li>
				@endforeach
				<input list="topicsDataList" style="border:none" type="text" name="name" id="addTopicInput">
			</ul>
		</div>
	</div>

	<div class="form-field">
		<select name="status">
			<option value="on-offer">On Offer</option>
			<option value="withdrawn">Withdrawn</option>
		</select>
	</div>

	<div class="form-field">
		<button type="submit" value="Submit">Update</button>
	</div>
	@include ('partials.errors')
</form>

<a href="{{ action('ProjectController@show', $project) }}">Back</a>
@endsection
