<div class="section section--full-width">
	<div class="header">
		@include('svg.check-circle')
		<h3>Accepted Students</h3>
		<div class="svg-container expand pointer" style="margin-left: auto;">
			<svg class="transition--medium" viewBox="0 0 24 24">
				<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
			</svg>
		</div>
	</div>
	<div class="content" data-cookie-name="hide_accepted"  @if(!empty($_COOKIE["hide_accepted"])) @if($_COOKIE["hide_accepted"] == "true") style="display: none;" aria-expanded="false" @else aria-expanded="true" @endif @endif>
		<div style="overflow-x: auto;">
			@include ('supervisors.partials.accepted-students-table')
		</div>
		@if(count(Auth::user()->supervisor->getAcceptedStudents()))
			<div class="button-group">
				<a class="button email-selected accepted-students" href="#">Email Selected</a>
			</div>
		@endif
	</div>
</div>
