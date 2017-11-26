@extends('layouts.supervisor')

@section ('scripts')
<script src="/js/project-topics.js" type="text/javascript" charset="utf-8"></script>
@endsection

@section ('content')

@if(Session::get('db_type') == 'ug')
	{!! SussexInformaticsProjects\TopicUg::getDatalist() !!}
@else
	{!! SussexInformaticsProjects\TopicMasters::getDatalist() !!}
@endif

<div class="centered width-800">

<h1>You are editing "{{ $project->title }}".</h1>

<div class="card card--margin-vertical">
<form id="editProjectForm" role="form" method="POST" action="{{URL::to('/project/'.$project->id).'/edit' }}">
	{{ csrf_field() }}
	{{ method_field('PATCH') }}

	<div class="form-field">
		<label for="title">Title</label>
		<input maxlength="255" type="text" name="title" id="title" value="{{ $project->title }}">
	</div>
	
	<div class="form-field">
		<label for="description">Description</label>
		<textarea maxlength="16777215" type="text" name="description" id="description">{{ $project->description }}</textarea>
	</div>

	<div class="form-field">
		<label for="skills">Skills</label>
		<input maxlength="255" type="text" name="skills" id="skills" value="{{ $project->skills }}"></input>
	</div>

	<div class="form-field">
		<label>Topics</label>
		<div id="newTopicInputContainer" class="fake-input">
			<ul class="topics-list edit">
				@foreach($project->topics as $topic)
					@if(Session::get('db_type') == 'ug')
					<li class="topic{!! ($topic->id == SussexInformaticsProjects\ProjectTopicUg::getProjectPrimaryTopicId($project)) ? ' first': '' !!}">
					@else
					<li class="topic{!! ($topic->id == SussexInformaticsProjects\ProjectTopicMasters::getProjectPrimaryTopicId($project)) ? ' first': '' !!}">
					@endif
						<button type="button" class="topic-remove">X</button>
						<p class="topic-name">{{$topic->name}}</p>
					</li>
				@endforeach
				<input list="topicsDataList" style="border:none" type="text" name="name" id="addTopicInput">
			</ul>
		</div>
	</div>

	<div class="form-field">
		<label for="status">Project Status</label>
		<select name="status">
			<option value="on-offer">On Offer</option>
			<option value="withdrawn">Withdrawn</option>
		</select>
	</div>

	<div class="form-field">
		<button class="button button--raised button--accent" type="submit" value="Submit">Update</button>
	</div>
	@include ('partials.errors')
</form>
</div>
<a class="button button--raised" href="javascript:history.back()">Back</a>
</div>
@endsection
