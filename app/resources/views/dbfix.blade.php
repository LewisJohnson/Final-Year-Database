@foreach($projects as $project)
	<p>{!! html_entity_decode($project->description) !!}</p>
@endforeach
