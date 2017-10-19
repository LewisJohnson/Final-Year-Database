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
			
						<div class="form-group">
							<label for="title" class="w-100">
								Title
								<small>
									<span class="ml-1 text-muted">We recommended a maximum of 40 characters.</ins>
									<ins id="title-character-count" class="fr transition--medium"></ins>
								</small>
							</label>

							<input class="js-project-title form-control" maxlength="255" type="text" name="title" id="title" autofocus="true" value="{{ $project->title }}" required>

							<div class="alert alert-danger mt-2" role="alert" id="title-already-used" style="display: none;">
								This project title is already in use.
							</div>

							<div class="alert alert-primary mt-2" role="alert" id="similar-title-already-used" style="display: none;">
								A similar project title is already in use.
							</div>
						</div>
			
						<div class="form-group">
							<label for="description">Description</label>
							<div class="html-editor">
								<textarea id="html-editor--input" class="form-control html-editor--input" maxlength="16777215" type="text" name="description" id="description">{{ $project->description }}</textarea>
							</div>
						</div>
			
						<div class="form-group">
							<label for="skills">Skills</label>
							<input class="form-control" maxlength="255" type="text" name="skills" id="skills" value="{{ $project->skills }}">
						</div>
			
						@if(!Auth::user()->isStudent())
							<div class="form-group">
								<label>Topics <small><ins>Press COMMA to save topic.</ins></small></label>
								<div id="new-topic-input-container" class="border p-2">
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
										<input class="form-control" list="topicsDataList" type="text" name="name" id="add-topic-input">
									</ul>
									<div class="spinner spinner-border text-primary" style="display: none"></div>
								</div>
							</div>
						@endif
			
						@if(!Auth::user()->isStudent())
							@if($project->status != "student-proposed")
								@if($project->getAcceptedStudent() == null)
									<div class="form-group">
										<label for="status">Status</label>
										<br>
										<select class="form-control w-auto" name="status">
											<option @if($project->status == "on-offer") selected @endif value="on-offer">On Offer</option>
											<option @if($project->status == "withdrawn") selected @endif value="withdrawn">Withdrawn</option>
										</select>
									</div>
								@else
									<div class="alert alert-info" role="alert">
										You can not change the status of this project because <b>{{ $project->getAcceptedStudent()->user->getFullName() }}</b> has been accepted. 
									</div>
								@endif
							@endif
						@endif
			
						<div class="text-right mt-3">
							<button class="btn btn-primary" type="submit" value="Submit">Update</button>
						</div>
						@include ('partials.errors')
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
