<div class="section section--full-width">
	{{-- HEADER --}}
	<div class="header">
		@include('svg.clipboard')
		<h2>Interested Students</h2>
		<div class="svg-container expand pointer" style="margin-left: auto;">
			<svg class="transition--medium" viewBox="0 0 24 24">
				<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
			</svg>
		</div>
	</div>

	{{-- PROJECTS OFFER --}}
	<div class="content" data-cookie-name="hide-selected-students" @if(!empty($_COOKIE["hide-selected-students"])) @if($_COOKIE["hide-selected-students"] == "true") style="display: none;" aria-expanded="false" @else aria-expanded="true" @endif @endif>
		<h5>Selected Students</h5>
		<div class="responsive-table">
			<table class="data-table sort-table supervisor-table table--dark-head">
				@if(Auth::user()->supervisor->getIntrestedStudents())
					<thead>
						<tr>
							<th>
								<div class="checkbox">
									<input class="checkbox-input master-checkbox" id="selected-students" type="checkbox">
									<label for="selected-students" name="selected-students"></label>
								</div>
							</th>
							<th class="pointer">Student</th>
							<th class="pointer">Project</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						@foreach(Auth::user()->supervisor->getIntrestedStudents() as $offer)
							<tr data-student-id="{{ $offer['student']->id }}" data-project-id="{{ $offer['project']->id }}">
								<td style="width: 6%;">
									<div class="checkbox">
										<input class="checkbox-input" id="offer-{{ $offer['student']->user->getFullName() }}" type="checkbox">
										<label for="offer-{{ $offer['student']->user->getFullName() }}" name="offer-{{ $offer['student']->user->getFullName() }}"></label>
									</div>
								</td>

								<td style="width:20%"><a href="mailto:{{ $offer['student']->user->email }}">{{ $offer['student']->user->getFullName() }}</a></td>

								<td><a href="{{ action('ProjectController@show', $offer['project']) }}">{{ $offer['project']->title }}</a></td>

								<td style="width: 14%;">
									<button class="button offer-action button--danger-text" title="Reject {{ $offer['student']->user->getFullName() }} for {{ $offer['project']->title }}" data-action-type="reject">Reject</button>
								</td>
								
								<td style="width: 14%;">
									<button class="button offer-action button--success" title="Accept {{ $offer['student']->user->getFullName() }} for {{ $offer['project']->title }}" data-action-type="accept">Accept</button>
								</td>
							</tr>
						@endforeach
					</tbody>
				@else
					<tfoot>
						<tr><td>No students have selected one of your projects yet.</td></tr>
					</tfoot>
				@endif
			</table>
		</div>

		<h5>Students Proposals</h5>
		<div class="responsive-table">
			<table class="data-table sort-table supervisor-table table--dark-head">
				@if(Auth::user()->supervisor->getStudentProjectProposals())
					<thead>
						<tr>
							<th>
								<div class="checkbox">
									<input class="checkbox-input master-checkbox" id="selected-students" type="checkbox">
									<label for="selected-students" name="selected-students"></label>
								</div>
							</th>
							<th class="pointer">Student</th>
							<th class="pointer">Project</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						@foreach(Auth::user()->supervisor->getStudentProjectProposals() as $proposal)
							<tr data-student-id="{{ $proposal['student']->id }}" data-project-id="{{ $proposal['project']->id }}">
								<td style="width: 6%;">
									<div class="checkbox">
										<input class="checkbox-input" id="offer-{{ $proposal['student']->user->getFullName() }}" type="checkbox">
										<label for="offer-{{ $proposal['student']->user->getFullName() }}" name="offer-{{ $proposal['student']->user->getFullName() }}"></label>
									</div>
								</td>

								<td style="width:20%"><a href="mailto:{{ $proposal['student']->user->email }}">{{ $proposal['student']->user->getFullName() }}</a></td>

								<td><a href="{{ action('ProjectController@show', $proposal['project']) }}">{{ $proposal['project']->title }}</a></td>

								<td style="width: 14%;">
									<button class="button offer-action button--danger-text" title="Reject {{ $proposal['student']->user->getFullName() }} for {{ $proposal['project']->title }}" data-action-type="reject">Reject</button>
								</td>
								
								<td style="width: 14%;">
									<button class="button offer-action button--success" title="Accept {{ $proposal['student']->user->getFullName() }} for {{ $proposal['project']->title }}" data-action-type="accept">Accept</button>
								</td>
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
{{-- 		@if (count(Auth::user()->supervisor->getStudentProjectProposals()))
			<div class="button-group">
				<button class="button button--raised" type="">Email Selected</button>
				<button class="button button--raised" type="">Accept Selected</button>
				<button class="button button--raised" type="">Reject Selected</button>
			</div>
		@endif --}}
	</div>
</div>
