@extends('layouts.app')
@section('pageTitle', 'Help')

@section('scripts')
	<script src="{{ asset('js/views/tab-view.js') }}"></script>
@endsection

@section ('content')
<div class="centered mw-1000">
	<h1>Help</h1>

	@if($user = Auth::user())
		<h5>Need some help, {{ Auth::user()->first_name }}? Here you can find help relevant to you.</h5>
	@else
		<h5>Need some help? Here you can find help relevant to you.</h5>
	@endif

	<div class="card tab-card mt-5">
		<ul class="tab-container mb-0" data-help-footer="true" data-cookie-name="cht">
			@for ($i = 1; $i <= 20; $i++)
				@if(Lang::has("help.help_tab_".$i))
					<li class="tab" data-tab-name="@lang('help.help_tab_'.$i)">
						<button class="btn w-100 text-left js-tab-button">@lang("help.help_tab_".$i)</button>
						<div class="content" aria-expanded="false" aria-hidden="true" >
							<h2>@lang("help.help_tab_".$i)</h2>
							@lang("help.help_tab_".$i."_content")
						</div>
					</li>
				@endif
			@endfor

			@if(Auth::check())
				<li><hr style="opacity: 0.6;"></li>
				@if(Auth::user()->isStudent())
					<li class="tab" data-tab-name="@lang('help.help_tab_student')">
						<button class="btn w-100 text-left js-tab-button">@lang("help.help_tab_student")</button>
						<div class="content" aria-expanded="false" aria-hidden="true">
							<h2>@lang("help.help_tab_student")</h2>
							@lang("help.help_tab_student_content")
						</div>
					</li>
				@endif

				@if(Auth::user()->isSupervisor())
					<li class="tab" data-tab-name="@lang('help.help_tab_supervisor')">
						<button class="btn w-100 text-left js-tab-button">@lang("help.help_tab_supervisor")</button>
						<div class="content" aria-expanded="false" aria-hidden="true">
							<h2>@lang("help.help_tab_supervisor")</h2>
							@lang("help.help_tab_supervisor_content")
						</div>
					</li>
				@endif

				@if(Auth::user()->isProjectAdmin())
					<li class="tab" data-tab-name="@lang('help.help_tab_project_admin')">
						<button class="btn w-100 text-left js-tab-button">@lang("help.help_tab_project_admin")</button>
						<div class="content" aria-expanded="false" aria-hidden="true">
							<h2>@lang("help.help_tab_project_admin")</h2>
							@lang("help.help_tab_project_admin_content")
						</div>
					</li>
				@endif

				@if(Auth::user()->isSystemAdmin())
					<li class="tab" data-tab-name="@lang('help.help_tab_system_admin')">
						<button class="btn w-100 text-left js-tab-button">@lang("help.help_tab_system_admin")</button>
						<div class="content" aria-expanded="false" aria-hidden="true">
							<h2>@lang("help.help_tab_system_admin")</h2>
							@lang("help.help_tab_system_admin_content")
						</div>
					</li>
				@endif
			@endif
		</ul>

		<div class="content-host">
			<div class="content"></div>
		</div>
	</div>
</div>

<style>
	.content li {
		margin-bottom: 1rem;
	}
</style>
@endsection
