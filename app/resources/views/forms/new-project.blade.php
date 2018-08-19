{!! SussexProjects\Topic::getDatalist() !!}

@if($user_type == "student")
	@if(SussexProjects\Mode::getProjectSelectionDate()->gt(\Carbon\Carbon::now()))
		<p class="config-tip">You may not propose a project until {{ SussexProjects\Mode::getSupervisorAcceptDate(true) }}.</p>
		<script>
			$(function() {
				$('.form-field *').attr('disabled', true);
			});
		</script>
	@endif
@endif

<form id="create-project-form" class="project-form form form--flex" method="POST" autocomplete="off" @if($user_type == "student") action="{{ action('StudentController@proposeProject') }}" @elseif($user_type == "supervisor") action="{{ action('ProjectController@store') }}" @endif>
	{{ csrf_field() }}
	@if($user_type == "supervisor")
		<p><b>Supervisor: </b>{{ Auth::user()->getFullName() }}</p>
	@elseif($user_type == "student")
		<p><b>Student: </b>{{ Auth::user()->getFullName() }}</p>
	@endif

	<div class="form-field">
		<label for="title">Title<ins style="margin-left:8px; font-size: 12px">We recommended a maximum of 40 characters.</ins> <ins id="title-character-count" style="font-size: 12px; float: right"></ins></label>
		<input class="project-title" maxlength="255" type="text" name="title" id="title" autofocus="true" value="{{ old('title') }}" required>
		<p id="title-already-used" style="display: none;" class="inline-error-block">This project title is already in use.</p>
		<p id="similar-title-already-used" style="display: none;" class="inline-info-block">A similar project title is already in use.</p>
	</div>

	<div class="form-field">
		<label style="float: left;" for="description">Description</label>
		<div class="html-editor">
			<textarea id="html-editor--input" required class="html-editor--input" maxlength="16777215" type="text" name="description" id="description">{{ old('description') }}</textarea>
		</div>
	</div>

	<div class="form-field">
		<label for="skills">Skills</label>
		<input maxlength="255" type="text" name="skills" id="skills" required value="{{ old('skills') }}"></input>
	</div>

	@if($user_type == "supervisor")
		<div class="form-field">
			<label>Topics <ins style="margin-left:5px; font-size: 12px;">Press COMMA to save topic.</ins></label>
			<div id="create-topic-input-container" class="fake-input">
				<ul class="topics-list create">
					<input list="topicsDataList" type="text" id="create-project-add-topic-input">
				</ul>
				<div class="loader"></div>
			</div>
		</div>

		<div class="form-field">
			<label for="skills">Status</label>
			<select name="status" id="status">
				<option value="on-offer">On Offer</option>
				<option value="withdrawn">Withdrawn</option>
				<option value="archived">Archived</option>
			</select>
		</div>
	@elseif($user_type == "student")
		<input type="hidden" name="status" value="student-proposed">
	@endif

	@if($user_type == "student")
		<div class="form-field">
			<label for="supervisor_id">Supervisor</label>
			<select id="supervisor_id" name="supervisor_id">
				@foreach($supervisors as $supervisor)
					<option value="{{ $supervisor->user->id }}">{{ $supervisor->user->getFullName() }}</option>
				@endforeach
			</select>
		</div>
	@endif

	@include ('partials.errors')

	<div class="form-field">
		<button class="button button--raised button--accent" type="submit" value="Submit">Create</button>
	</div>
</form>
