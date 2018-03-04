<?php
namespace SussexProjects;

use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * The user model.
 * 
 * @see SussexProjects\Http\Controllers\UserController
*/
class User extends Authenticatable{
	use Notifiable;
	
	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_users';
		} else {
			return 'UNSET';
		}
	}

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['username', 'first_name', 'last_name', 'email', 'password'];

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];

	/**
	 * The columns to be parsed as dates.
	 *
	 * @var array
	 */
	protected $dates = ['last_login'];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [ 'password', 'remember_token'];

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = true;


	/**
	 * Indicates if authenticated used is a guest.
	 *
	 * @return boolean
	 */
	public function isGuest(){
		return in_array("guest", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a staff member.
	 *
	 * @return boolean
	 */
	public function isStaff(){
		return in_array("staff", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a student.
	 *
	 * @return boolean
	 */
	public function isStudent(){
		return in_array("student", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a supervisor.
	 *
	 * @return boolean
	 */
	public function isSupervisor(){
		return in_array("supervisor", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a undergraduate project administrator.
	 *
	 * @return boolean
	 */
	public function isUgAdmin(){
		return in_array("admin_ug", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a masters project administrator.
	 *
	 * @return boolean
	 */
	public function isMastersAdmin(){
		return in_array("admin_masters", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a project administrator.
	 *
	 * @return boolean
	 */
	public function isProjectAdmin(){
		return $this->isUgAdmin() || $this->isMastersAdmin();
	}

	/**
	 * Indicates if authenticated used is a system administrator.
	 *
	 * @return boolean
	 */
	public function isSystemAdmin(){
		return in_array("admin_system", $this->getPrivileges());
	}


	/**
	 * Returns authenticated users privileges as a pretty string.
	 *
	 * @return string
	 */
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


	/**
	 * Returns authenticated users privileges as a a PHP array.
	 *
	 * @return string[]
	 */
	public function getPrivileges(){
		return explode(',', $this->privileges);
	}


	/**
	 * Returns student type (undergraduate or postgraduate).
	 *
	 * @return string
	 */
	public function studentType(){
		if($this->hasOne(StudentUg::class, 'id')->exists()){
			return "ug";
		}
		if($this->hasOne(StudentMasters::class, 'id')->exists()){
			return "masters";
		}
		return null;
	}

	/**
	 * Returns the student related to this user.
	 *
	 * @return Student
	*/
	public function student(){
		if(Session::get("db_type") == "ug"){
			return $this->hasOne(StudentUg::class, 'id');
		} elseif(Session::get("db_type") == "masters"){
			return $this->hasOne(StudentMasters::class, 'id');
		}
	}

	/**
	 * Returns the supervisor related to this user.
	 *
	 * @return Supervisor
	*/
	public function supervisor(){
		return $this->hasOne(Supervisor::class, 'id');
	}


	/**
	 * Returns all projects related to this user.
	 *
	 * @return Project
	*/
	public function projects(){
		if(Session::get("db_type") == "ug"){
			return $this->hasMany(ProjectUg::class, 'supervisor_id');
		} else {
		   return $this->hasMany(ProjectMasters::class, 'supervisor_id');
		}
	}

	/**
	 * Returns authenticated user's full name.
	 *
	 * Includes title is user is a supervisor.
	 * 
	 * @return string
	*/
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
