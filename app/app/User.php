<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects;

use Exception;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Session;

/**
 * The user model.
 *
 * @see SussexProjects\Http\Controllers\UserController
 */
class User extends Authenticatable
{
	use Traits\Uuids;
	use Notifiable;

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['privileges', 'first_name', 'last_name', 'username', 'programme', 'email', 'active_year'];

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
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'active_year' => 'integer',
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = ['username', 'programme', 'remember_token', 'last_login', 'privileges'];

	/**
	 * The table to retrieve data from.
	 *
	 * @throws Exception Database not found
	 * @return string    Table string
	 */
	public function getTable()
	{
		if (Session::get('department') !== null)
		{
			return Session::get('department') . '_users';
		}
		else
		{
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Returns authenticated user's full name.
	 * Includes title is user is a supervisor.
	 *
	 * @return string
	 */
	public function getFullName()
	{
		if ($this->isSupervisor())
		{
			$format = '%s %s %s';

			return sprintf($format, $this->supervisor->title, $this->first_name, $this->last_name);
		}
		else
		{
			$format = '%s %s';

			return sprintf($format, $this->first_name, $this->last_name);
		}
	}

	/**
	 * Returns authenticated users privileges as a a PHP array.
	 *
	 * @return string[]
	 */
	public function getPrivileges()
	{
		if ($this->isGuest())
		{
			return ['guest'];
		}
		else
		{
			return explode(',', $this->privileges);
		}
	}

	/**
	 * Returns the programme related to this user.
	 *
	 * @return Programme
	 */
	public function getProgrammeName()
	{
		if (empty($this->programme_relationship))
		{
			return "-";
		}
		else
		{
			return $this->programme_relationship->name;
		}
	}

	/**
	 * Returns the programme related to this user.
	 *
	 * @return Programme
	 */
	public function programme_relationship()
	{
		return $this->hasOne(Programme::class, 'id', 'programme');
	}

	/**
	 * Returns the student related to this user.
	 *
	 * @return Student
	 */
	public function student()
	{
		return $this->hasOne(Student::class, 'id');
	}

	/**
	 * Returns the supervisor related to this user.
	 *
	 * @return Supervisor
	 */
	public function supervisor()
	{
		return $this->hasOne(Supervisor::class, 'id');
	}

	/**
	 * Returns all projects related to this user.
	 *
	 * @return Project
	 */
	public function projects()
	{
		return $this->hasMany(Project::class, 'supervisor_id');
	}

	/**
	 * Indicates if authenticated used is a guest.
	 *
	 * @return boolean
	 */
	public function isGuest()
	{
		return $this->privileges == null;
	}

	/**
	 * Indicates if authenticated used is a supervisor.
	 *
	 * @return boolean
	 */
	public function isSupervisor()
	{
		return in_array("supervisor", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a project administrator.
	 *
	 * @return boolean
	 */
	public function isProjectAdmin()
	{
		$isProjectAdmin = false;

		foreach (get_education_levels(true) as $key => $level)
		{
			if (in_array("admin_" . $level, $this->getPrivileges()))
			{
				$isProjectAdmin = true;
			}
		}

		return $isProjectAdmin;
	}

	/**
	 * Indicates if authenticated used is a system administrator.
	 *
	 * @return boolean
	 */
	public function isSystemAdmin()
	{
		return in_array("admin_system", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a student.
	 *
	 * @return boolean
	 */
	public function isStudent()
	{
		return in_array("student", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a staff member.
	 *
	 * @return boolean
	 */
	public function isStaff()
	{
		return in_array("staff", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is a staff member.
	 *
	 * @return boolean
	 */
	public function isExternalMarker()
	{
		return in_array("external_marker", $this->getPrivileges());
	}

	/**
	 * Indicates if authenticated used is an administrator of the parameters education level.
	 *
	 *
	 * @param  string    ShortName of an education level
	 * @return boolean
	 */
	public function isAdminOfEducationLevel($educationLevel = null)
	{
		if (empty($educationLevel))
		{
			$educationLevel = get_el_short_name();
		}

		return in_array("admin_" . $educationLevel, $this->getPrivileges());
	}

	/**
	 * An array of all education levels the user has permission too
	 *
	 *
	 * @param  null  $shortName
	 * @param  null  $longName
	 * @return array Short-name array of education levels (e.g. [ug, pg])
	 */
	public function allowedEducationLevel($shortName = null, $longName = null)
	{
		$allowedLevels = array();

		foreach (get_education_levels() as $key => $level)
		{
			if (in_array("admin_" . $level["shortName"], $this->getPrivileges()))
			{
				array_push($allowedLevels, $level);
			}
		}

		// Adds all education levels for supervisors, guests and system administrators
		if ($this->isSupervisor() || $this->isGuest() || $this->isSystemAdmin())
		{
			foreach (get_education_levels() as $key => $level)
			{
				if (!in_array($level, $allowedLevels))
				{
					array_push($allowedLevels, $level);
				}
			}
		}

		if ($this->isStudent())
		{
			array_push($allowedLevels, $this->studentType());
		}

		if ($this->isStaff() || $this->isExternalMarker())
		{
			foreach (get_education_levels() as $key => $level)
			{
				array_push($allowedLevels, $level);
			}
		}

		$allowedLevels = array_unique($allowedLevels, SORT_REGULAR);
		if ($shortName)
		{
			$shortAllowedLevels = array();
			foreach ($allowedLevels as $key => $level)
			{
				array_push($shortAllowedLevels, $level["shortName"]);
			}

			return $shortAllowedLevels;
		}

		if ($longName)
		{
			$longAllowedLevels = array();
			foreach ($allowedLevels as $key => $level)
			{
				array_push($longAllowedLevels, $level["longName"]);
			}

			return $longAllowedLevels;
		}

		return $allowedLevels;
	}

	/**
	 * An array of all education levels an Ldap guest can use.
	 *
	 *
	 * @param  null  $shortName
	 * @param  null  $longName
	 * @return array Short-name array of education levels (e.g. [ug, pg])
	 */
	public static function guestEducationLevel($shortName = null, $longName = null)
	{
		$allowedLevels = array();

		foreach (get_education_levels() as $key => $level)
		{
			array_push($allowedLevels, $level);
		}

		$allowedLevels = array_unique($allowedLevels, SORT_REGULAR);
		if ($shortName)
		{
			$shortAllowedLevels = array();
			foreach ($allowedLevels as $key => $level)
			{
				array_push($shortAllowedLevels, $level["shortName"]);
			}

			return $shortAllowedLevels;
		}

		if ($longName)
		{
			$longAllowedLevels = array();
			foreach ($allowedLevels as $key => $level)
			{
				array_push($longAllowedLevels, $level["longName"]);
			}

			return $longAllowedLevels;
		}

		return $allowedLevels;
	}

	/**
	 * Returns student type (undergraduate or postgraduate).
	 * Do not try to move this to the student model.
	 * It will cause an exception and no students will be able to log in.
	 *
	 * @return string
	 */
	public function studentType()
	{
		// Temp variable
		$currentEducationLevel = Session::get('education_level');

		// Check to see if student is in any database
		foreach (get_education_levels() as $key => $level)
		{
			Session::put('education_level', $level);
			if (Student::find($this->id) != null)
			{
				// Restore session from temp variable
				Session::put('education_level', $currentEducationLevel);

				// Return education level
				return $level;
			}
		}
		// Restore session from temp variable
		Session::put('education_level', $currentEducationLevel);

		// We couldn't find them in any student database
		return null;
	}

	/**
	 * Returns authenticated users privileges as a pretty string.
	 *
	 * @return string
	 */
	public function getPrettyPrivilegesString()
	{
		$returnString = "";
		$privileges = $this->getPrivileges();
		$count = count($privileges);
		$indx = 1;

		/* This slew of functions are needed because of how privileges are stored in the DB
		1. administrator_system
		2. administrator system
		3. ['administrator', 'system']
		4. ['system', 'administrator']
		5. system administrator
		 */

		foreach ($privileges as $privilege)
		{
			$privilege = str_replace('admin', 'administrator', $privilege);

			// Replaces short-hand names with long-hand names (e.g. _ug to _undergraduate)
			foreach (get_education_levels() as $level)
			{
				$privilege = str_replace('_' . $level["shortName"], '_' . $level["longName"], $privilege);
			}

			$privilege = str_replace('_', ' ', $privilege);

			if ($privilege == "staff")
			{
				// Replace staff with staff member
				// You are a staff looks dumb
				$words = str_replace('staff', 'staff member', $privilege);
			}
			else
			{
				$words = explode(' ', $privilege);
				$words = array_reverse($words);
				$words = implode(" ", $words);
			}

			if ($count == 1)
			{
				$returnString .= $words;
				break;
			}

			if ($indx != $count)
			{
				$returnString .= $words;
				$returnString .= ", ";
			}
			else
			{
				$returnString .= "and ";
				$returnString .= $words;
			}

			$indx++;
		}

		return $returnString;
	}
}
