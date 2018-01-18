<tr>
	<td><a href="{{ action('ProjectController@show', $project->id) }}" class="project-link">{{ $project->title }}</a></td>
	@if($project->getPrimaryTopic() != null)
		<td>
			<a href="{{ action('ProjectController@byTopic', $project->getPrimaryTopic()->id) }}">{{ $project->getPrimaryTopic()->name }}</a>
		</td>
	@else
		<td>No Topic</td>
	@endif
	<td>{{ ucfirst(str_replace('-', ' ', $project->status)) }}</td>
	<td class="table-action">
		<a class="button button--svg" title="Edit {{ $project->title }}" href="{{ action('ProjectController@edit', $project->id) }}">
			@include('svg.pencil')
		</a>
	</td>
	<td class="table-action">
		<a class="button button--svg" title="Browse transactions for {{ $project->title }}" href="{{ action('ProjectController@transactions', $project->id) }}">
			@include('svg.database')
		</a>
	</td>
	<td class="table-action">
		<form class="delete-project" action="{{ action('ProjectController@destroy', $project->id) }}" data-project-title="{{ $project->title }}" method="DELETE" accept-charset="utf-8">
			<button type="submit" class="button button--svg button--danger" title="Delete {{ $project->title }}">
				@include('svg.bin')
			</button>
		</form>
	</td>

	<td class="table-mobile-menu">
		<button id="menu-actions-{{ $project->id }}" class="button button--svg dot-menu__activator">
			@include('svg.dots-vertical')
		</button>

		<ul tabindex="0" class="dot-menu icon-list dot-menu--table-right" id="menu-actions-{{ $project->id }}-menu">
			<li class="dot-menu__item">
				<a class="dot-menu__action icon" href="{{ action('ProjectController@edit', $project->id) }}" title="Edit {{ $project->title }}">
					@include('svg.pencil')
					<p>Edit</p>
				</a>
			</li>
			<li class="dot-menu__item">
				<a class="dot-menu__action icon" href="{{ action('ProjectController@transactions', $project->id) }}" title="Browse transactions for {{ $project->title }}">
					@include('svg.database')
					<p>Transactions</p>
				</a>
			</li>
			<li class="dot-menu__item dot-menu__item--form">
				<form class="delete-project" action="{{ action('ProjectController@destroy', $project->id) }}" data-project-title="{{ $project->title }}" method="DELETE" accept-charset="utf-8">
					<button type="submit" class="dot-menu__action icon button--danger" title="Delete {{ $project->title }}">
						@include('svg.bin')
						<p>Delete</p>
					</button>
				</form>
			</li>
		</ul>
	</td>
</tr>

