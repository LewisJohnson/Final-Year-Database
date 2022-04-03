@extends('layouts.app')
@section('pageTitle', 'Edit Project')

@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@section ('content')
{!! SussexProjects\Topic::getDatalist() !!}

<div class="centered mw-1200">
	<form class="js-project-form" id="edit-project-form" role="form" method="POST" action="{{ action('ProjectController@edit', $project->id) }}" data-project-id="{{ $project->id }}" @if($project->getPrimaryTopic()) data-primary-topic-id="{{ $project->getPrimaryTopic()->id }}" @endif >
		{{ csrf_field() }}
		{{ method_field('PATCH') }}

		<div class="row">	
			<div class="col-12">
				<div class="card js-project project-card" >
					<h2 class="main-title">Projects <small class="text-muted">/ Edit</small></h2>
					
					<div class="card-body">
						<div class="row">
						
							{{-- Accepted warning --}}
							@if(!Auth::user()->isStudent())
								@if($project->status != "student-proposed")
									@if($project->getAcceptedStudent() != null)
										<div class="col-12">
											<div class="alert alert-warning" role="alert">
												<span>⚠️</span><span class="ml-2">You are editing an accepted project.</span>
											</div>
										</div>
									@endif
								@endif
							@endif
							
							<div class="col-12 col-lg-4">
								{{-- Title --}}
								<div class="form-group">
									<label class="h5 w-100 mb-1" for="title">Title</label>

									<small class="w-100 d-block text-muted">
										<span class="d-inline-block">We recommended a maximum of 40 characters</span>
										<span id="title-character-count" class="d-inline-block fr transition--medium"></span>
									</small>

									<input class="js-project-title form-control" maxlength="255" type="text" name="title" id="title" autofocus="true" value="{{ $project->title }}" placeholder="Project Title" required>

									<div class="alert alert-danger mt-2" role="alert" id="title-already-used" style="display: none;">
										This project title is already in use.
									</div>

									<div class="alert alert-primary mt-2" role="alert" id="similar-title-already-used" style="display: none;">
										A similar project title is already in use.
									</div>
								</div>

								{{-- Project by --}}
								@if($project->status == "student-proposed")
									@if($project->supervisor == null)
										<h4 class="text-capitalize text-muted">Created by {{ $project->student->getName() }}</h4>
									@else
										<h4 class="text-capitalize text-muted">Proposed by {{ $project->student->getName() }} to {{ $project->supervisor->user->getFullName() }}</h4>
									@endif
								@else
									<h4 class="text-capitalize text-muted">By {{ $project->supervisor->user->getFullName() }}</h4>
								@endif

								<hr>

								{{-- Skills --}}
								<div class="form-group">
									<label class="h5 mt-4" for="skills">Skills</label>
									<input class="form-control" maxlength="255" type="text" name="skills" id="skills" value="{{ $project->skills }}" placeholder="Skills required for project">
								</div>

								{{-- Topics --}}
								@if(!Auth::user()->isStudent())
									<div class="form-group">
										<label for="topicsDataList" class="h5 mb-1">Topics</label>
										<small class="w-100 d-block text-muted">
											<span class="d-inline-block">Press COMMA key to save topic</span>
										</small>

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
												<input class="form-control" list="topicsDataList" type="text" name="topic-name" id="add-topic-input">
											</ul>

											<div class="spinner spinner-border text-primary" style="display: none">
											</div>
										</div>
									</div>
								@endif

								{{-- Status --}}
								@if(!Auth::user()->isStudent())
									@if($project->status != "student-proposed")
										@if($project->getAcceptedStudent() == null)
											<div class="form-group">
												<label for="status" class="h5">Status</label>
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
							</div>
							
							{{-- Description & Error --}}
							<div class="col-12 col-lg-8 mt-3 mt-lg-0">
								<div class="form-group">
									<label class="h3" for="description">Description</label>
									<div class="html-editor">
										<textarea id="html-editor--input" class="form-control html-editor--input" maxlength="16777215" type="text" name="description" id="description">{{ $project->description }}</textarea>
									</div>
								</div>

								<div class="text-right mt-3">
									@include('partials.errors')
								</div>
							</div>
						</div>
					</div>
					
					<div class="card-footer text-muted text-right">
						<button class="btn btn-primary" type="submit" value="Submit">Update</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>

@endsection
