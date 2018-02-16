<div class="section section--full-width shadow-2dp">
	<div class="header">
		@include('svg.check-circle')
		<h2>Accepted Students</h2>
		<div class="svg-container expand pointer" style="margin-left: auto;">
			<svg class="transition--medium" viewBox="0 0 24 24">
				<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
			</svg>
		</div>
	</div>
	<div class="content" data-cookie-name="hide-accepted"  @if(!empty($_COOKIE["hide-accepted"])) @if($_COOKIE["hide-accepted"] == "true") style="display: none;" aria-expanded="false" @else aria-expanded="true" @endif @endif>
		<div style="overflow-x: auto;">
			@include ('supervisors.partials.accepted-students-table')
		</div>
		@if (count(Auth::user()->supervisor->getAcceptedStudents()))
			<div class="button-group">
				<button class="button button--raised" type="button">Email Selected</button>
			</div>
		@endif
	</div>
</div>
