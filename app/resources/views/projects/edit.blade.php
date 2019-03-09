@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@section ('content')
{!! SussexProjects\Topic::getDatalist() !!}

<div class="centered mw-800">
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">Edit Existing Project</div>
				
				<div class="card-body">
					 <h5 class="card-subtitle text-muted">You are editing "{{ $project->title }}".</h5>

					<form class="js-project-form mt-3" id="edit-project-form" role="form" method="POST" action="{{ action('ProjectController@edit', $project->id) }}" data-project-id="{{ $project->id }}" @if($project->getPrimaryTopic()) data-primary-topic-id="{{ $project->getPrimaryTopic()->id }}" @endif >
						{{ csrf_field() }}
						{{ method_field('PATCH') }}
			
						<div class="form-field">
							<label for="title" class="w-100">Title<span class="ml-1 text-muted" style="font-size: 12px">We recommended a maximum of 40 characters.</ins> <ins id="title-character-count" class="fr" style="font-size: 12px;"></ins></label>
							<input class="js-project-title" maxlength="255" type="text" name="title" id="title" autofocus="true" value="{{ $project->title }}" required>

							<div class="alert alert-danger" role="alert" id="title-already-used" style="display: none;">
								This project title is already in use.
							</div>

							<div class="alert alert-primary" role="alert" id="similar-title-already-used" style="display: none;">
								A similar project title is already in use.
							</div>
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
			
						@if(!Auth::user()->isStudent())
							<div class="form-field">
								<label>Topics <ins style="margin-left:5px; font-size: 12px;">Press COMMA to save topic.</ins></label>
								<div id="new-topic-input-container" class="fake-input">
									<ul class="topics-list edit">
										@foreach($project->topics as $topic)
											@if($project->getPrimaryTopic() != null)
												<li class="topic{!! ($topic->id == $project->getPrimaryTopic()->id) ? ' first': '' !!}" data-topic-id="{{ $topic->id }}">
													<button type="button" class="btn rounded-0 topic-remove">X</button>
													<p class="topic-name">{{ $topic->name }}</p>
												</li>
											@else
												<li class="topic" data-topic-id="{{ $topic->id }}">
													<button type="button" class="btn rounded-0 topic-remove">X</button>
													<p class="topic-name">{{ $topic->name }}</p>
												</li>
											@endif
										@endforeach
										<input list="topicsDataList" type="text" name="name" id="add-topic-input">
									</ul>
									<div class="loader"></div>
								</div>
							</div>
						@endif
			
						@if(!Auth::user()->isStudent())
							@if($project->status != "student-proposed")
								<div class="form-field">
									<label for="status">Project Status</label>
									<select name="status">
										<option @if($project->status == "on-offer") selected @endif value="on-offer">On Offer</option>
										<option @if($project->status == "withdrawn") selected @endif value="withdrawn">Withdrawn</option>
									</select>
								</div>
							@endif
						@endif
			
						<div class="text-right mt-3">
							<button class="btn btn-primary" type="submit" value="Submit">Update</button>
						</div>
						@include ('partials.errors')
					</form>
				</div>
			</div>

			<div class="mt-3">	
				<a class="btn btn-secondary" href="javascript:history.back()">Back</a>
			</div>
		</div>
	</div>
</div>
@endsection
