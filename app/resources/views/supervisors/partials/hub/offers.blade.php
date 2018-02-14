<div class="section section--full-width shadow-2dp">
	<div class="header">
		@include('svg.tag')
		<h2>Offers</h2>
		<div class="svg-container expand pointer" style="margin-left: auto;">
			<svg class="transition--medium" viewBox="0 0 24 24">
				<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
			</svg>
		</div>
	</div>
	<div class="content" data-cookie-name="hide-offers" @if(!empty($_COOKIE["hide-offers"])) @if($_COOKIE["hide-offers"] == "true") style="display: none;" aria-expanded="false" @else aria-expanded="true" @endif @endif>
		<h5>Projects Selected</h5>
		<div style="overflow: auto;">
		<table class="data-table supervisor-table">
			@if (count(Auth::user()->supervisor->getProjectOffers()))
			<thead>
				<tr>
					<th>
						<div class="checkbox">
							<input class="checkbox-input master-checkbox" id="offers" type="checkbox">
							<label for="offers" name="offers"></label>
						</div>
					</th>
					<th>Student</th>
					<th>Project</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				@foreach(Auth::user()->supervisor->getProjectOffers() as $project)
					<tr data-student-id="{{ $project->student_id }}" data-project-id="{{ $project->id }}">
						<td>
							<div class="checkbox">
								<input class="checkbox-input" id="offer-{{ $project->student_name }}" type="checkbox">
								<label for="offer-{{ $project->student_name }}" name="offer-{{ $project->student_name }}"></label>
							</div>
						</td>
						<td><a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a></td>
						<td><a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>

						<td class="table-action">
							<a class="button button--svg offer-action button--danger-text" title="Reject {{ $project->student_name }} for {{ $project->title }}" data-action-type="reject">
								@include('svg.close-circle-outline')
							</a>
						</td>
						
						<td class="table-action">
							<a class="button button--svg offer-action button--success-text" title="Accept {{ $project->student_name }} for {{ $project->title }}" data-action-type="accept">
								@include('svg.check-circle-outline')
							</a>
						</td>
					</tr>
				@endforeach
			</tbody>
			@else
				<tfoot>
					<tr><td>You have no offers yet.</td></tr>
				</tfoot>
			@endif
		</table>
		</div>
		<h5>Students Proposals</h5>
		<div style="overflow: auto;">
		<table class="data-table supervisor-table">
			@if (count(Auth::user()->supervisor->getProjectProposals()))
			<thead>
				<tr>
					<th>
						<div class="checkbox">
							<input class="checkbox-input master-checkbox" id="offers" type="checkbox">
							<label for="offers" name="offers"></label>
						</div>
					</th>
					<th>Student</th>
					<th>Project</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				@foreach(Auth::user()->supervisor->getProjectProposals() as $project)
					<tr data-student-id="{{ $project->student_id }}" data-project-id="{{ $project->id }}">
						<td>
							<div class="checkbox">
								<input class="checkbox-input" id="offer-{{ $project->student_name }}" type="checkbox">
								<label for="offer-{{ $project->student_name }}" name="offer-{{ $project->student_name }}"></label>
							</div>
						</td>
						<td><a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a></td>
						<td><a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
						<td><button class="offer-action button button--success" data-action-type="accept">Accept</button></td>
						<td><button class="offer-action button button--danger" data-action-type="reject">Reject</button></td>
					</tr>
				@endforeach
			</tbody>
			@else
				<tfoot>
					<tr><td>You have no student project proposals yet.</td></tr>
				</tfoot>
			@endif
		</table>
		</div>
		@if (count(Auth::user()->supervisor->getProjectProposals()))
			<div class="button-group">
				<button class="button button--raised" type="">Email Selected</button>
				<button class="button button--raised" type="">Accept Selected</button>
				<button class="button button--raised" type="">Reject Selected</button>
			</div>
		@endif
	</div>
</div>
