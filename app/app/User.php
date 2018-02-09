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
	protected $fillable = ['username', 'first_name', 'last_name', 'email', 'password'];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [ 'password', 'remember_token'];

	public function isGuest(){
		return in_array("guest", $this->getPrivileges());
	}
	public function isStaff(){
		return in_array("staff", $this->getPrivileges());
	}

	public function isStudent(){
		return in_array("student", $this->getPrivileges());
	}

	public function isSupervisor(){
		return in_array("supervisor", $this->getPrivileges());
	}

	public function isUgAdmin(){
		return in_array("admin_ug", $this->getPrivileges());
	}

	public function isMastersAdmin(){
		return in_array("admin_masters", $this->getPrivileges());
	}

	public function isProjectAdmin(){
		return $this->isUgAdmin() || $this->isMastersAdmin();
	}

	public function isSystemAdmin(){
		return in_array("admin_system", $this->getPrivileges());
	}

	public function getPrettyPrivilegesString(){
		$returnString = "";
		$privileges = $this->getPrivileges();
		$count = count($privileges);
		$indx = 1;

		// This is because of how privileges are stored in the db
		// 1. administrator_system
		// 2. administrator system
		// 3. ['administrator', 'system']
		// 4. ['system', 'administrator']
		// 5. system administrator
		foreach ($privileges as $key => $value) {
			$value = str_replace('admin', 'administrator', $value);
			$value = str_replace('_ug', '_undergraduate', $value);
			$value = str_replace('_', ' ', $value);

			$words = explode(' ', $value);
			$words = array_reverse($words);
			$words = implode(" ",$words);

			if($count == 1){
				$returnString.=$words;
				break;
			}

			if($indx != $count){
				$returnString.=$words;
				$returnString.=", ";
			} else {
				$returnString.="and ";
				$returnString.=$words;
			}
			$indx++;
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
		if($this->isSupervisor()){
			$format = '%s %s %s';
			return sprintf($format, $this->supervisor->title, $this->first_name, $this->last_name);
		} else {
			$format = '%s %s';
			return sprintf($format, $this->first_name, $this->last_name);
		}
	}
}
