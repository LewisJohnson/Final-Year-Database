<link rel="stylesheet" href="{{ asset('css/app.css') }}">

@foreach($students as $student)
	<div>
		@php
			$project = $student->project;
			$evaluation = $project->evaluation ?? null;
		@endphp

		@if(!empty($project) && !is_null($evaluation) && !empty($student->getSecondMarker()))
			@php
				$view = view('evaluation.body')
						->with("project", $project)
						->with("evaluation", $evaluation); 
			@endphp

			{!! $view->render() !!}
		
		@elseif(!empty($project))
			<h5>{{ $student->user->getFullName() }}</h5>
			<h6>{{ $project->title }}</h6>
			<p>Evaluation not finalised</p>
		@else
			<h5>{{ $student->user->getFullName() }}</h5>
			<h6>No Project</h6>
		@endif
		<br>
	</div>
@endforeach


<script>
	window.print();
</script>