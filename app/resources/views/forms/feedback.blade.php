<form class="form text-left" method="POST" action="{{ action('HomeController@feedback') }}">
	{{ csrf_field() }}
	<p>Please send us any comments, feedback, or problems you may be experiencing.</p>

	<div class="form-group">
		<label>Comment</label>
		<textarea class="form-control comment" type="text" name="comment" required></textarea>
	</div>

	@if(Auth::check())
		<div class="form-group">
			<div class="checkbox">
				<input type="checkbox" id="anonymous" name="anonymous" class="checkbox-input">
				<label for="anonymous">Send Anonymously <small><ins>Your email will not be recorded.</ins></small></label>
			</div>
		</div>
	@else
		<div class="form-group">
			<label>Email <small><ins>OPTIONAL</ins></small></label>
			<input class="form-control" type="email" name="email" placeholder="JohnSmith@sussex.ac.uk"/>
		</div>
	@endif

	<input type="hidden" name="page" id="feedback-page">

	@include ('partials.errors')
</form>
