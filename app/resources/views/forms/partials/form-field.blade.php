@php	
	$type = empty($type) ? 'text' : $type;
	$required = empty($required) ? true : $required;
	$autofocus = empty($autofocus) ? false : $autofocus;
@endphp

<div class="form-group {{ $errors->has($name) ? 'has-error' : '' }}">
	<label for="{{ $name }}">{{ $label }}</label>

	@if($view === "new")
		<input class="form-control" type="{{ $type }}" id="{{ $name }}" name="{{ $name }}" value="{{ old($name) }}" @if($required) required @endif @if($autofocus) autofocus @endif>
	@elseif($view === "edit")
		<input class="form-control" type="{{ $type }}" id="{{ $name }}" name="{{ $name }}" value="{{ empty(old($name)) ? $user->$name : old($name) }}" @if($required) required @endif @if($autofocus) autofocus @endif>
	@endif

	@include('forms.partials.error-block', ['name' => $name])
</div>