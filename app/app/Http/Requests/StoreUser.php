<?php

namespace SussexProjects\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Request;
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
			'username' => 'required|unique:users,username',
			'first_name' => 'required',
			'last_name' => 'required',
			'email' => 'required|unique:users,email',
			'password' => 'required|confirmed',
			'privileges' => 'required',
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