@extends('layouts.app')
@section ('content')
<div class="centered width-1000">
<h1>Help</h1>
<h3>Need a helping hand? Here you can find help relative to you.</h3>
<div class="card">
<ul class="tab-container">
	@for ($i = 1; $i <= 20; $i++)
		@if(Lang::has("help.help_tab_".$i))
			<li class="tab" data-tab-name="@lang('help.help_tab_'.$i)">
				<button class="button open-tab @if($i == 1) button--accent @endif">@lang("help.help_tab_".$i)</button>
				<div class="content" @if($i == 1) aria-expanded="true" aria-hidden="false" @else aria-expanded="false" aria-hidden="true" @endif>
					<h4>@lang("help.help_tab_".$i)</h4>
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
					<h4>@lang("help.help_tab_supervisor")</h4>
					@lang("help.help_tab_supervisor_content")
				</div>
			</li>
		@endif

		@if($user->isAdmin())
			<li class="tab" data-tab-name="@lang('help.help_tab_admin')">
				<button class="button open-tab">@lang("help.help_tab_admin")</button>
				<div class="content" aria-expanded="false" aria-hidden="true">
					<h4>@lang("help.help_tab_admin")</h4>
					@lang("help.help_tab_admin_content")
				</div>
			</li>
		@endif
	@endif
</ul>
<div class="content-host">
	<div class="content">
		<h4>@lang("help.help_tab_1")</h4>
		@lang("help.help_tab_1_content")
	</div>
</div>
</div>
</div>
@endsection
