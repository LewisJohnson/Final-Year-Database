<form class="form form--flex" method="POST" action="{{ action('HomeController@feedback') }}">
	{{ csrf_field() }}
	<p>Please send us any comments or feedback, or problems you may be experiencing.</p>

	<div class="form-field">
		<label>Comment</label>
		<textarea class="comment" type="text" name="comment" required></textarea>
	</div>

	@if(Auth::check())
		<div class="form-field">
			<div style="width: 170px;margin: 4px auto;" class="checkbox">
				<input type="checkbox" id="anonymous" name="anonymous" class="checkbox-input">
				<label for="anonymous">Send Anonymously</label>
			</div>
			<ins>Your email will not be recorded.</ins>
		</div>
	@else
		<div class="form-field">
			<label>Email</label>
			<input type="text" name="email" placeholder="Optional"/>
		</div>
	@endif

	<input type="hidden" name="page" id="feedback-page" value="">

	@include ('partials.errors')
</form>
