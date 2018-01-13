<div class="sub-dropdown">
	<button class="sub-dropbtn">{{ $title }}</button>
	@include('svg.arrow-right')
	<div class="dropdown-content shadow-2dp">
		@include('admin.partials.links.'.$links)
	</div>
</div>
