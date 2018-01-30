<form id="project-search-form" action="/projects/search" class="form form--flex" role="form" method="GET" accept-charset="utf-8">
	{{ csrf_field() }}
	<div class="search-container shadow-4dp">
		<input class="search-input" style="flex-grow: 1;" type="search" name="searchTerm"  placeholder="Search...">

		<button class="svg button--dark external-link" type="submit" data-element-to-replace-with-loader-selector="#project-search-form" data-element-to-hide-selector="#project-table">
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
						<input id="title" name="title" type="checkbox" checked>
						<label for="title">Title</label>
					</div>
				</li>
				<li>
					<div class="checkbox">
						<input id="description" name="description" type="checkbox" checked>
						<label for="description">Description</label>
					</div>
				</li>
				<li>
					<div class="checkbox">
						<input id="skills" type="checkbox" name="skills" checked>
						<label for="skills">Skills</label>
					</div>
				</li>
				<li>
					<div class="checkbox">
						<input id="topic" type="checkbox"  name="topic" checked>
						<label for="topic">Topics</label>
					</div>
				</li>
			</ul>
		</div>
	</div>
</form>