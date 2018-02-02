@extends('layouts.app')
@section('content')
<div class="centered card width-1000">
<h2>Import Students With XML</h2>
<p>Select file to upload.</p>
<script>
  function handleFileSelect()
  {
	if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
	  alert('The File APIs are not fully supported in this browser.');
	  return;
	}

	input = document.getElementById('fileinput');
	if (!input) {
	  alert("Um, couldn't find the fileinput element.");
	}
	else if (!input.files) {
	  alert("This browser doesn't seem to support the `files` property of file inputs.");
	}
	else if (!input.files[0]) {
	  alert("Please select a file before clicking 'Load'");
	}
	else {
	  file = input.files[0];
	  fr = new FileReader();
	  fr.onload = receivedText;
	  //fr.readAsText(file);
	  fr.readAsDataURL(file);
	}
  }

  function receivedText() {
	document.getElementById('editor').appendChild(document.createTextNode(fr.result));
  }

</script>

<input type="file" id="fileinput"/>
<input type='button' id='btnLoad' value='Load' onclick='handleFileSelect();'>
<div id="editor"></div>
<ul>
	@foreach(SussexProjects\User::Where('access_type', 'admin')->get() as $user)
		<li>
			<a href="{{ action('AdminController@loginAs', Auth::user()->id) }}">{{ Auth::user()->getFullName() }}</a>
		</li>
	@endforeach
</ul>
</div>
@endsection
