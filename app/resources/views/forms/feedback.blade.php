<form class="form form--flex" method="POST" action="/feedback">
	{{ csrf_field() }}
	<p>Please send us any comments, feedback, or problems you may be experiencing.</p>

	<div class="form-field">
		<label>Comment</label>
		<textarea class="comment" type="text" name="comment" required></textarea>
	</div>

	@if(Auth::check())
		<div class="form-field">
			<div class="checkbox">
				<input type="checkbox" id="anonymous" name="anonymous" class="checkbox-input">
				<label for="anonymous">Send Anonymously <ins>Your email will not be recorded and you will not receive a response.</ins></label>
			</div>
		</div>
	@else
		<div class="form-field">
			<label>Email</label>
			<input type="text" name="email" placeholder="Optional - only if you would like a response"/>
		</div>
	@endif

	<input type="hidden" name="page" id="feedback-page" value="">

	@include ('partials.errors')
</form>
