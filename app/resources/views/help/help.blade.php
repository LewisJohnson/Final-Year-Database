@extends('layouts.app')
@section('scripts')
	<script src="{{ asset('js/views/help.js') }}"></script>
@endsection
@section ('content')
<div class="centered width-1000">
	<h1>Help</h1>

	@if($user = Auth::user())
		<h3>Need a helping hand {{ $user->first_name }}? Here you can find help relevant to you.</h3>
	@else
		<h3>Need a helping hand? Here you can find help relevant to you.</h3>
	@endif
	<div class="card card--margin-vertical">
		<ul class="tab-container">
			@for ($i = 1; $i <= 20; $i++)
				@if(Lang::has("help.help_tab_".$i))
					<li class="tab @if($i == 1) selected @endif" data-tab-name="@lang('help.help_tab_'.$i)">
						<button class="button open-tab @if($i == 1) button--accent @endif">@lang("help.help_tab_".$i)</button>
						<div class="content" @if($i == 1) aria-expanded="true" aria-hidden="false" @else aria-expanded="false" aria-hidden="true" @endif>
							<h2>@lang("help.help_tab_".$i)</h2>
							@lang("help.help_tab_".$i."_content")
						</div>
					</li>
				@endif
			@endfor

			@if($user = Auth::user())
				@if($user->isSupervisorOrSuperior())
					<li class="tab" data-tab-name="@lang('help.help_tab_supervisor')">
						<button class="button open-tab">@lang("help.help_tab_supervisor")</button>
						<div class="content" aria-expanded="false" aria-hidden="true">
							<h2>@lang("help.help_tab_supervisor")</h2>
							@lang("help.help_tab_supervisor_content")
						</div>
					</li>
				@endif

				@if($user->isAdmin())
					<li class="tab" data-tab-name="@lang('help.help_tab_admin')">
						<button class="button open-tab">@lang("help.help_tab_admin")</button>
						<div class="content" aria-expanded="false" aria-hidden="true">
							<h2>@lang("help.help_tab_admin")</h2>
							@lang("help.help_tab_admin_content")
						</div>
					</li>
				@endif
			@endif

		</ul>

		<div class="mask"></div>
		<div class="content-host">
			<div class="content">
				<h2>@lang("help.help_tab_1")</h2>
				@lang("help.help_tab_1_content")
			</div>
		</div>
	</div>
</div>
@endsection
