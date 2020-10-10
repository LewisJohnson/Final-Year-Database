<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Request;
use SussexProjects\Http\Controllers\UserController;
use SussexProjects\User;

class UserForm extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		if(Auth::user()->isAdminOfEducationLevel() || Auth::user()->isSystemAdmin()){
			return true;
		}

		return false;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		if(!empty($this->id)){
			$user = User::find($this->id);
		}

		$userDb = new User;

		if(empty($user)){
			return [
				'username' => 	['required', 'max:32', Rule::unique($userDb->getTable())],
				'email' => 		['required', 'max:128', Rule::unique($userDb->getTable())],
				'first_name' => ['required', 'max:128'],
				'last_name' => 	['required', 'max:128']
			];
		} else {
			return [
				'username' => 	['required', 'max:32', Rule::unique($userDb->getTable())->ignore($user->id)],
				'email' => 		['required', 'max:128', Rule::unique($userDb->getTable())->ignore($user->id)],
				'first_name' => ['required', 'max:128'],
				'last_name' => 	['required', 'max:128']
			];
		}
	}

	/**
	 * Configure the validator instance.
	 *
	 * @param  \Illuminate\Validation\Validator $validator
	 *
	 * @return void
	 */
	public function withValidator($validator)
	{
		$validator->after(function(){
			UserController::checkPrivilegeConditions(Request::get('privileges'));
		});
	}
}
