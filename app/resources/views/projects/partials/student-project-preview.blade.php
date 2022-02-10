<div class="project-preview project-preview--student">
	<div class="project">
		<hr>
		<h2 class="text-capitalize">{{ $project->title }}</h2>

		@if($project->status == "student-proposed")
			<h4 class="text text-muted">Proposed to {{ $project->supervisor->user->getFullName() }}</h3>
		@else
			<h4 class="text-capitalize text-muted">{{ $project->supervisor->user->getFullName() }}</h3>
		@endif
	</div>
</div>