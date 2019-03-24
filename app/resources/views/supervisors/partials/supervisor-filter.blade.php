@php
  $hideClosedToOffers = $hideClosedToOffers ?? true;
@endphp

{!! SussexProjects\Supervisor::getSupervisorNameDatalist($hideClosedToOffers) !!}
<div class="search-container w-100 shadow-sm mt-3">
	<input id="supervisor-report-search-input" list="supervisor-datalist" class="w-100 search-input" type="text" placeholder="Start typing to filter supervisors...">
</div>