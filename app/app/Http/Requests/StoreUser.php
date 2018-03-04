<?php
namespace SussexProjects\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use SussexProjects\Http\Controllers\UserController;

class StoreUser extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize(){
		if(Auth::user()->isProjectAdmin() || Auth::user()->isSystemAdmin() ){
			return true;
		}
		return false;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules(){
		return [
			'username' => 'required|unique:users,username|max:32',
			'first_name' => 'required|max:128',
			'last_name' => 'required|max:128',
			'email' => 'required|unique:users,email|max:128',
			'password' => 'required|confirmed',
			'privileges' => 'required',

			'title' => 'max:6',
			'project_load_ug' => 'min:0|max:255',
			'project_load_pg' => 'min:0|max:255',
		];
	}

	/**
	 * Configure the validator instance.
	 *
	 * @param  \Illuminate\Validation\Validator  $validator
	 * @return void
	 */
	public function withValidator($validator){
		$validator->after(function ($validator) {
			UserController::checkPrivilegeConditions(Request::get('privileges'));
		});
	}
}