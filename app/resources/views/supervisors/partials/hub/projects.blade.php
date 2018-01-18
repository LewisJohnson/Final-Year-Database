<div class="section section--full-width shadow-2dp">
	<div class="header">
		@include('svg.file')
		<h2>Projects</h2>
		<div class="svg-container expand pointer" style="margin-left: auto;">
			<svg class="transition--medium" viewBox="0 0 24 24">
				<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
			</svg>
		</div>
	</div>
	<div class="content" data-cookie-name="hide-projects" @if(!empty($_COOKIE["hide-projects"])) @if($_COOKIE["hide-projects"] == "true") style="display: none;" aria-expanded="false" @else aria-expanded="true" @endif @endif>
		<div style="overflow: auto;">
			<table class="data-table supervisor-table">
				@if(count($user->supervisor->getProjectsOrderByStatus(true)))
					<thead>
						<tr>
							<th>Title</th>
							<th>Topic</th>
							<th>Status</th>
							<th class="table-action-header"></th>
							<th class="table-action-header"></th>
							<th class="table-action-header"></th>
							<th class="table-mobile-menu-header"></th>
						</tr>
					</thead>
					<tbody>
						@foreach($user->supervisor->getProjectsOrderByStatus(true) as $project)
							@if ($project->trashed())
								@if(\Carbon\Carbon::now()->gt($project->destroy_at))
									@include('supervisors.partials.queued-for-deletion-project-row', $project)
								@else
									@include('supervisors.partials.restore-project-row', $project)
								@endif
							@else
								@include('supervisors.partials.project-row', $project)
							@endif
						@endforeach
					</tbody>
				@else
					<tfoot>
						<tr><td>You have not created any projects yet.</td></tr>
					</tfoot>
				@endif
			</table>
		</div>
	</div>
</div>