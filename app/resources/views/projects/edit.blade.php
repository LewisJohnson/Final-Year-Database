@extends('layouts.app')
@section ('content')

@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@if(Session::get('db_type') == 'ug')
	{!! SussexProjects\TopicUg::getDatalist() !!}
@elseif(Session::get('db_type') == 'masters')
	{!! SussexProjects\TopicMasters::getDatalist() !!}
@endif

<div class="centered width--800">
	<h1>You are editing "{{ $project->title }}".</h1>

	<div class="card project-card card--margin-vertical">
		<form id="editProjectForm" class="form form--flex" role="form" method="POST" action="{{ action('ProjectController@edit', $project->id)}}" data-project-id="{{ $project->id }}" @if($project->getPrimaryTopic()) data-primary-topic-id="{{ $project->getPrimaryTopic()->id }}" @endif >
			{{ csrf_field() }}
			{{ method_field('PATCH') }}

			<div class="form-field">
				<label for="title">Title</label>
				<input maxlength="255" type="text" name="title" id="title" value="{{ $project->title }}">
			</div>

			<div class="form-field">
				<label for="description">Description</label>
				<div class="html-editor">
					<textarea id="html-editor--input" class="html-editor--input" maxlength="16777215" type="text" name="description" id="description">{{ $project->description }}</textarea>
				</div>
			</div>

			<div class="form-field">
				<label for="skills">Skills</label>
				<input maxlength="255" type="text" name="skills" id="skills" value="{{ $project->skills }}"></input>
			</div>

			<div class="form-field">
				<label>Topics</label>
				<div id="new-topic-input-container" class="fake-input">
					<ul class="topics-list edit">
						@foreach($project->topics as $topic)
							@if($project->getPrimaryTopic())
								<li style="display: none" class="topic{!! ($topic->id == $project->getPrimaryTopic()->id) ? ' first': '' !!}" data-topic-id="{{ $topic->id }}">
									<button type="button" class="topic-remove">X</button>
									<p class="topic-name">{{$topic->name}}</p>
								</li>
							@else
								<li style="display: none" class="topic" data-topic-id="{{ $topic->id }}">
									<button type="button" class="topic-remove">X</button>
									<p class="topic-name">{{$topic->name}}</p>
								</li>
							@endif
						@endforeach
						<input list="topicsDataList" type="text" name="name" id="addTopicInput">
						<div style="display: block" class="loader"></div>
					</ul>
					<div class="loader"></div>
				</div>
			</div>

			<div class="form-field">
				<label for="status">Project Status</label>
				<select name="status">
					<option @if($project->status == "on-offer") selected @endif value="on-offer">On Offer</option>
					<option @if($project->status == "withdrawn") selected @endif value="withdrawn">Withdrawn</option>
					<option @if($project->status == "archived") selected @endif value="archived">Archived</option>
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
