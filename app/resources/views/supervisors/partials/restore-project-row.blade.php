<tr style="background: #eee">
	<td>"{{ $project->title }}" has been deleted. You have {{ $project->destroy_at->diffInMinutes() }} minutes to restore it.</td>
	<td></td>
	<td></td>
	<td></td>
	<td style="width: 10px;">
		<form class="restore-project" action="{{ action('ProjectController@restore', $project->id) }}" data-project-title="{{ $project->title }}" method="PATCH" accept-charset="utf-8">
			<button type="submit" class="button button--svg" title="Restore {{ $project->title }}">
				@include('svg.restore')
			</button>
		</form>
	</td>
</tr>
