@php
	$supervisor = $project->supervisor->user;
	$marker = $project->marker->user;

	$questions = $evaluation->getQuestions();

	if($evaluation->hasPosterPresentationQuestion()){
		$poster = $evaluation->getPosterPresentationQuestion();
	}

	if($evaluation->hasOralPresentationQuestion()){
		$presentation = $evaluation->getOralPresentationQuestion();
	}

	if($evaluation->hasDissertationQuestion()){
		$dissertation = $evaluation->getDissertationQuestion();
	}

	if($evaluation->hasStudentFeedbackQuestion()){
		$studentFeedback = $evaluation->getStudentFeedbackQuestion();
	}
@endphp

<div class="evaluation">
	<div class="card">
		<div class="card-body">
			<h1 class="d-flex">
				Project Evaluation
				@if($evaluation->project_year != SussexProjects\Mode::getProjectYear())
					<span class="text-muted">&nbsp;/ {{ $evaluation->project_year }} </span>
				@endif
				<span class="ml-auto {{ $evaluation->getStatusBootstrapClass() }}">{{ $evaluation->getStatus() }}</span>
			</h1>
			<div class="row">
				<div class="col-4">
					<p>
						 <span class="d-inline-block" style="width: 110px">Student:</span> {{ empty($project->getAcceptedStudent()) ? 'Unavailable' : $project->getAcceptedStudent()->user->getFullName() }}
					 <br><span class="d-inline-block" style="width: 110px">Project:</span> {{ $project->title }}
					 <br><span class="d-inline-block" style="width: 110px">Programme:</span> {{ empty($project->getAcceptedStudent()) ? 'Unavailable' : $project->getAcceptedStudent()->user->programme_relationship->name }}
					 <br><span class="d-inline-block" style="width: 110px">Supervisor:</span> {{ $supervisor->getFullName() }}
					 <br><span class="d-inline-block" style="width: 110px">Second Marker:</span> {{ $marker->getFullName() }}
					</p>
				</div>

				@if($evaluation->is_finalised)
					<div class="col-4">
							<span class="d-inline-block" style="width: 150px">Poster:</span> {{ $poster->supervisorOmitSubmission && $poster->markerOmitSubmission ? 'Omitted' : $poster->finalValue.'%' }}
						<br><span class="d-inline-block" style="width: 150px">Presentation:</span> {{ $presentation->supervisorOmitSubmission && $presentation->markerOmitSubmission ? 'Omitted' : $presentation->finalValue.'%' }}
						<br><span class="d-inline-block" style="width: 150px">Dissertation Mark:</span> {{ $dissertation->supervisorOmitSubmission && $dissertation->markerOmitSubmission ? 'Omitted' : $dissertation->finalValue.'%' }}
					</div>
				@endif
			</div>

			<hr>


			<div>
				@php
					$prevQuestionGroup = null;
				@endphp

				@foreach($questions as $question)
					<div class="row">
						<div class="col-12">
							@if(is_null($prevQuestionGroup))
								<h1 class="mb-3">{{ $question->group }}</h1>
							@endif
						</div>

						<div class="col-12">
							@if($prevQuestionGroup != $question->group)
								@if($prevQuestionGroup != null)
									<h1 class="mt-2 mb-3">{{ $question->group }}</h1>
								@endif

								@php
									$prevQuestionGroup = $question->group;
								@endphp
							@endif
						</div>

						{{-- QUESTION TITLE / DESCRIPTION --}}
						<div class="col-12 mb-2">
							<h6 class="text-uppercase font-weight-bold">{{ $loop->iteration.". ".$question->title }}</h6>
						</div>

						@foreach(['supervisor', 'marker'] as $type)
							@php
								$valueAccessor = $type.'Value';
								$commentAccessor = $type.'Comment';
								$omissionAccessor = $type.'OmitSubmission';
							@endphp


							<div class="col-6 mb-4">
								<p class="m-0">{{ ucfirst($type) }}</p>

								@switch($question->type)
									@case(SussexProjects\PEQValueTypes::Scale)
										<p class="js-value {{ $type }} pl-2"></p>
										@break

									@case(SussexProjects\PEQValueTypes::Number)
									@case(SussexProjects\PEQValueTypes::PosterPresentation)
									@case(SussexProjects\PEQValueTypes::OralPresentation)
									@case(SussexProjects\PEQValueTypes::Dissertation)
										<p class="js-value {{ $type }} pl-2">{{ is_null($question->$valueAccessor) ? 'Not Set' : $question->$valueAccessor }}</p>
										@break

									@case(SussexProjects\PEQValueTypes::YesNo)
										<p data-group="{{ $question->group }}" class="js-value {{ $type }} pl-2">
											@if(is_null($question->$valueAccessor))
												Not Set
											@elseif($question->$valueAccessor == 0)
												No
											@elseif($question->$valueAccessor == 1)
												Yes
											@endif
										</p>
										@break

									@case(SussexProjects\PEQValueTypes::YesPossiblyNo)
										<p data-group="{{ $question->group }}" class="js-value {{ $type }} pl-2">
											@if(is_null($question->$valueAccessor))
												Not Set
											@elseif($question->$valueAccessor === 0)
												No
											@elseif($question->$valueAccessor === 1)
												Possibly
											@elseif($question->$valueAccessor === 2)
												Yes
											@endif
										</p>
										@break
								
									@case(SussexProjects\PEQValueTypes::CommentOnly)
									@case(SussexProjects\PEQValueTypes::StudentFeedback)
										<p class="js-value text-pre-wrap {{ $type }} pl-2">{{ $question->$valueAccessor }}</p>
										@break

									@default
										<p class="js-value {{ $type }}">{{ $question->$valueAccessor }}</p>
								@endswitch

								@if($question->type != SussexProjects\PEQValueTypes::CommentOnly && 
										$question->type != SussexProjects\PEQValueTypes::StudentFeedback)
									<p class="mt-3 mb-1 {{ $loop->index > 0 ? 'invisible' : '' }}">Comments:</p>
								@endif

								<p class="text-pre-wrap {{ $type }} pl-2 mt-3">{{ $question->$commentAccessor }}</p>
							</div>
						@endforeach
					</div>
				@endforeach
			</div>
		</div>
	</div>
</div>

<p style="page-break-after: always"></p>