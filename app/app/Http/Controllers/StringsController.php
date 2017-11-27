<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use SussexProjects\Strings;
use SussexProjects\StringsUg;
use SussexProjects\StringsMasters;

class StringsController extends Controller{
    /**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit(){
		return view("system.strings")
		->with('strings', Strings::all())
		->with('strings_ug', StringsUg::all())
		->with('strings_masters', StringsMasters::all());
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		//
	}
}
