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
		return $this->access_type === "admin_ug";
	}

	public function isMastersAdmin(){
		return $this->access_type === "admin_masters";
	}

	public function isAdmin(){
		return $this->access_type == "admin_ug" ||
		$this->access_type == "admin_masters" ||
		$this->access_type == "admin_department" ||
		$this->access_type == "admin_system";
	}

	public function isSupervisor(){
		return $this->access_type === "supervisor";
	}

	public function isSupervisorOrSuperior(){
		return $this->access_type == "supervisor" ||
		$this->access_type == "admin_ug" ||
		$this->access_type == "admin_masters" ||
		$this->access_type == "admin_department" ||
		$this->access_type == "admin_system";
	}

	public function isStudent(){
		if($this->access_type != "student"){
			return false;
		}

		return !is_null($this->student);
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
