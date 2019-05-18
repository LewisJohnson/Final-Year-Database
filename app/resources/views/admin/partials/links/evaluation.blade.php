<ul class="list-unstyled">
	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectEvaluationController@studentFeedback') }}">
			<span>@include('svg.bullhorn')<span>Student Feedback</span></span>
		</a>
	</li>

	<li>
		<a class="btn w-100 text-left text-primary" href="{{ action('ProjectEvaluationController@manualFinaliseView') }}">
			<span>@include('svg.gavel')<span>Manual Finalisation</span></span>
		</a>
	</li>
</ul>
