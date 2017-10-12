@extends ('layout')

@section ('scripts')
<script src="/js/project-topics.js" type="text/javascript" charset="utf-8"></script>
@endsection

@section ('content')

@if($user = Auth::user())
	@if($user->isAdmin() || $user->isSupervisor())
		
	@endif
@endif

{!! App\Topic::getDatalist() !!}

<div class="supervisor-panel">
	<h1>Supervisor Panel</h1>
	<ul>
		<li class="nav-button">
			<button id="deleteProjectButton">Delete Project</button>
		</li>
	</ul>
</div>

<h1>You are editing "{{ $project->title }}"</h1>

<form id="editProjectForm" role="form" method="POST" action="{{URL::to('/projects/'.$project->id).'/edit' }}">
	{{ csrf_field() }}
	{{ method_field('PATCH') }}

	<div class="form-field">
		<label class="hover-label" for="supervisor">Supervisor</label>
		<input type="text" value="{{ $project->supervisor }}" name="supervisor" id="supervisor">
	</div>
	
	<div class="form-field">
		<label class="hover-label" for="title">Title</label>
		<input type="text" value="{{ $project->title }}" name="title" id="title">
	</div>
	
	<div class="form-field">
		<label class="hover-label" for="description">Description</label>
		<textarea type="text" name="description" id="description">{{ $project->description }}</textarea>
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
		<label for="archived">Mark as archived?</label>
		<input class="bitValueCheckbox" id="archived" name="archived" value="{{ $project->archived }}" type="checkbox">
	</div>
	<div class="form-field">
		<button type="submit" value="Submit">Update</button>
	</div>
	@include ('partials.errors')
</form>

<a href="/projects" title="">Back</a>
@endsection
