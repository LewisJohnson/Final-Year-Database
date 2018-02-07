<?php
namespace SussexProjects;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Session;
use Auth;
class User extends Authenticatable{

	use Notifiable;
	public $timestamps = false;
	protected $dates = ['last_login'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'username', 'first_name', 'last_name', 'email', 'password', 'access_type'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password', 'remember_token',
	];

	public function isUgAdmin(){
		return in_array("admin_ug", $this->getPrivileges());
	}

	public function isMastersAdmin(){
		return in_array("admin_masters", $this->getPrivileges());
	}

	public function isSystemAdmin(){
		return in_array("admin_system", $this->getPrivileges());
	}

	public function isSupervisor(){
		return in_array("supervisor", $this->getPrivileges());
	}

	public function isStudent(){
		return in_array("student", $this->getPrivileges());
	}

	public function getPrettyPrivilegesString(){
		$returnString = "";
		$priv = $this->getPrivileges();
		$lastElement = end($priv);

		foreach ($priv as $key => $value) {
			$returnString.=$value;

			if($value != $lastElement){
				$returnString.=", ";
			}
		}

		return $returnString;
	}

	public function getPrivileges(){
		return explode(',', $this->privileges);
	}

	public function studentType(){
		if($this->hasOne(StudentUg::class, 'id')->exists()){
			return "ug";
		}
		if($this->hasOne(StudentMasters::class, 'id')->exists()){
			return "masters";
		}
		return null;
	}

	public function student(){
		if(Session::get("db_type") == "ug"){
			return $this->hasOne(StudentUg::class, 'id');
		} elseif(Session::get("db_type") == "masters"){
			return $this->hasOne(StudentMasters::class, 'id');
		}
	}

	public function supervisor(){
		return $this->hasOne(Supervisor::class, 'id');
	}

	public function projects(){
		if(Session::get("db_type") == "ug"){
			return $this->hasMany(ProjectUg::class, 'supervisor_id');
		} else {
		   return $this->hasMany(ProjectMasters::class, 'supervisor_id');
		}
	}

	public function getFullName(){
		if($this->isSupervisorOrSuperior()){
			$format = '%s %s %s';
			return sprintf($format, $this->supervisor->title, $this->first_name, $this->last_name);
		} else {
			$format = '%s %s';
			return sprintf($format, $this->first_name, $this->last_name);
		}
	}
}
