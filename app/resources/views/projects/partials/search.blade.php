<form id="project-search-form" class="form form--flex" action="{{ action('ProjectController@search') }}" role="form" method="GET" accept-charset="utf-8">
	{{ csrf_field() }}
	<div class="search-container shadow-4dp">
		<input class="search-input" style="flex-grow: 1;" type="search" name="searchTerm" placeholder="Search..." @if($view == "search") value="{{ Request::get("searchTerm") }}" @endif>

		<button class="svg button--dark external-link" type="submit" data-element-to-replace-with-loader-selector="#project-search-form" data-element-to-hide-selector=".table-responsive">
			<svg style="width:24px;height:24px" viewBox="0 0 24 24">
				<path fill="rgba(0, 0, 0, 0.5)" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
			</svg>
		</button>

		<button id="search-filter-button" class="svg button--dark" type="button">
			<svg style="width:24px;height:24px" viewBox="0 0 24 24">
				<path fill="rgba(0, 0, 0, 0.5)" d="M3,2H21V2H21V4H20.92L14,10.92V22.91L10,18.91V10.91L3.09,4H3V2Z" />
			</svg>
		</button>

		<div class="search-filter-container">
			<ul class="search-filter">
				<li>
					<div class="checkbox">
						<input class="remember-with-cookie" id="search-title-checkbox" type="checkbox" name="filter[]" value="title" checked>
						<label for="search-title-checkbox">Title</label>
					</div>
				</li>
				<li>
					<div class="checkbox">
						<input class="remember-with-cookie" id="search-description-checkbox" type="checkbox" name="filter[]" value="description" checked>
						<label for="search-description-checkbox">Description</label>
					</div>
				</li>
				<li>
					<div class="checkbox">
						<input class="remember-with-cookie" id="search-skills-checkbox" type="checkbox" name="filter[]" value="skills" checked>
						<label for="search-skills-checkbox">Skills</label>
					</div>
				</li>
				<li title="Results may take some time.">
					<div class="checkbox">
						<input class="remember-with-cookie" id="search-topics-checkbox" type="checkbox" name="filter[]" value="topics">
						<label for="search-topics-checkbox">Topics</label>
					</div>
				</li>
			</ul>
		</div>
	</div>
</form>