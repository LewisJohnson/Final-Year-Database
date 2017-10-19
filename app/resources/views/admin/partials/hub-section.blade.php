<div class="col-12 col-md-6 d-flex align-items-stretch mb-3">
	<div class="card w-100">
		<div class="card-header py-2">
			@include('svg.'.$svg) {{ $title }}
		</div>
		<div class="card-body p-2">
			@include('admin.partials.links.'.$links)
		</div>
	</div>
</div>
