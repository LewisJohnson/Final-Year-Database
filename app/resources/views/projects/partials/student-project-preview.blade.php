<div class="project-preview project-preview--student">
	<div class="project">
		<h1 class="title">{{ $project->title }}</h1>
		<h2 class="supervisor">{{ $project->supervisor->user->getFullName() }}</h2>
		<h3>Description</h3>
		<p>{!! html_entity_decode($project->description) !!}</p>
		<h3>Skills</h3>
		<p>{{ $project->skills }}</p>
		<h3>Topics</h3>
		<ul class="topics-list">
			@if (count($project->topics))
				@foreach($project->topics as $topic)
					@if($project->getPrimaryTopic())
						<li style="display: none" class="pointer topic{!! ($topic->id == $project->getPrimaryTopic()->id) ? ' primary first': '' !!}" draggable onclick="window.location='{{ action('ProjectController@byTopic', $topic->id) }}';">
							<p>{{$topic->name}}</p>
						</li>
					@else
						<li style="display: none" class="pointer topic" onclick="window.location='{{ action('ProjectController@byTopic', $topic) }}';">
							<p>{{$topic->name}}</p>
						</li>
					@endif
				@endforeach
			@endif
			@if(!count($project->topics))
				<li class="no-topics">
					<svg style="width:24px;height:24px;position: relative;top: 5px;" viewBox="0 0 24 24">
						<path fill="#fff" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
					</svg>
					<p>This project has no associated topics.</p>
				</li>
			@elseif(!$project->getPrimaryTopic())
				{{-- This should never be shown. --}}
				<li class="no-topics">
					<svg style="width:24px;height:24px;position: relative;top: 5px;" viewBox="0 0 24 24">
						<path fill="#fff" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
					</svg>
					<p>This project has no primary topic.</p>
				</li>
			@endif
			<li>
				<div class="loader" style="display: block"></div>
			</li>
		</ul>
	</div>
	<a class="show-more" href="#show">Show more &raquo;</a>
</div>
