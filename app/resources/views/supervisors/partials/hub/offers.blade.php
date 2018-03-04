<div class="section section--full-width shadow-2dp">
	{{-- HEADER --}}
	<div class="header">
		@include('svg.tag')
		<h2>Offers</h2>
		<div class="svg-container expand pointer" style="margin-left: auto;">
			<svg class="transition--medium" viewBox="0 0 24 24">
				<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
			</svg>
		</div>
	</div>

	{{-- PROJECTS OFFER --}}
	<div class="content" data-cookie-name="hide-offers" @if(!empty($_COOKIE["hide-offers"])) @if($_COOKIE["hide-offers"] == "true") style="display: none;" aria-expanded="false" @else aria-expanded="true" @endif @endif>
		<h5>Project Offers</h5>
		<div class="responsive-table">
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
						@foreach(Auth::user()->supervisor->getProjectOffers() as $offer)
							<tr data-student-id="{{ $offer['student']->id }}" data-project-id="{{ $offer['project']->id }}">
								<td>
									<div class="checkbox">
										<input class="checkbox-input" id="offer-{{ $offer['student']->user->getFullName() }}" type="checkbox">
										<label for="offer-{{ $offer['student']->user->getFullName() }}" name="offer-{{ $offer['student']->user->getFullName() }}"></label>
									</div>
								</td>
								<td><a href="mailto:{{ $offer['student']->user->email }}">{{ $offer['student']->user->getFullName() }}</a></td>
								<td><a href="{{ action('ProjectController@show', $offer['project']) }}">{{ $offer['project']->title }}</a></td>

								<td class="table-action">
									<a class="button button--svg offer-action button--danger-text" title="Reject {{ $offer['student']->user->getFullName() }} for {{ $offer['project']->title }}" data-action-type="reject">
										@include('svg.close-circle-outline')
									</a>
								</td>
								
								<td class="table-action">
									<a class="button button--svg offer-action button--success-text" title="Accept {{ $offer['student']->user->getFullName() }} for {{ $offer['project']->title }}" data-action-type="accept">
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
		<div class="responsive-table">
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
							<td><a class="flex--stretch" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
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
