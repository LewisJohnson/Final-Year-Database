<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

/**
 * The student model.
 *
 * @see SussexProjects\Http\Controllers\StudentController
 */
class Student extends Model
{

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
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = [];

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
			return Session::get('department') . '_students_' . get_el_short_name();
		}
		else
		{
			throw new Exception('Database not found.');
		}
	}

	/**
	 * @param  $status
	 * @return mixed
	 */
	public static function getMailtoStringByProjectStatus($status)
	{
		$students = Student::Where('project_status', $status)->get();
		$return = 'mailto:' . Auth::user()->email;
		$return .= '?bcc=';

		foreach ($students as $student)
		{
			$return .= $student->user->email;
			$return .= ',';
		}

		return $return;
	}

	/**
	 * @return mixed
	 */
	public static function getAllStudentsMailtoString()
	{
		$students = Student::getAllStudentsQuery();
		$return = 'mailto:' . Auth::user()->email;
		$return .= '?bcc=';

		foreach ($students as $key => $student)
		{
			$return .= $student->user->email;
			$return .= ',';
		}

		return $return;
	}

	/**
	 * @return mixed
	 */
	public static function getAllStudentsNeverLoggedInMailtoString()
	{
		$userTable = new User();
		$studentTable = new Student();

		$students = Student::getAllStudentsQuery()
			->whereNull('user.last_login')
			->get();

		$return = 'mailto:' . Auth::user()->email;
		$return .= '?bcc=';

		foreach ($students as $key => $student)
		{
			$return .= $student->user->email;
			$return .= ',';
		}

		return $return;
	}

	/**
	 * @return mixed
	 */
	public static function getAllStudentsAcceptedMailtoString()
	{
		$students = Student::getAllStudentsQuery()->Where('project_status', 'accepted')->get();
		$return = 'mailto:' . Auth::user()->email;
		$return .= '?bcc=';

		foreach ($students as $key => $student)
		{
			$return .= $student->user->email;
			$return .= ',';
		}

		return $return;
	}

	/**
	 * @return mixed
	 */
	public static function getAllStudentsWithoutProjectMailtoString()
	{
		$students = Student::getAllStudentsQuery()->Where('project_status', '<>', 'accepted')->get();
		$return = 'mailto:' . Auth::user()->email;
		$return .= '?bcc=';

		foreach ($students as $key => $student)
		{
			$return .= $student->user->email;
			$return .= ',';
		}

		return $return;
	}

	public static function getAllStudentsWithoutProjectCount()
	{
		return Student::getAllStudentsQuery()->Where('project_status', '<>', 'accepted')->count();
	}

	/**
	 * A list of student in the current project year.
	 *
	 * @return QueryBuilder A query builder of all supervisors.
	 */
	public static function getAllStudentsQuery()
	{
		$userTable = new User();
		$studentTable = new Student();

		return Student::join($userTable->getTable() . ' as user', 'user.id', '=', $studentTable->getTable() . '.id')
			->select($studentTable->getTable() . '.*')
			->where('user.active_year', Mode::getProjectYear())
			->orderBy('user.last_name', 'asc');
	}

	/**
	 * A list of all potential student project statues.
	 *
	 * @return string[] An array of all statues'.
	 */
	public static function getAllStatuses()
	{
		return ['none', 'proposed', 'selected', 'accepted'];
	}

	/**
	 * The students name, hidden if they have they have their name hidden.
	 * The students name will also be visible to supervisors and administrators.
	 *
	 * @return string
	 */
	public function getName()
	{
		if (Auth::check())
		{
			// If authenticated user is this student, show full name
			if (Auth::user()->id == $this->id)
			{
				return $this->user->getFullName();
			}

			// If authenticated user is student, and this student is hiding there name, hide name
			if (Auth::user()->isStudent() && !$this->share_name)
			{
				return "A Student";
			}
			else
			{
				return $this->user->getFullName();
			}
		}

		return "A Student";
	}

	/**
	 * The user related to this student.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne Student
	 */
	public function user()
	{
		return $this->hasOne(User::class, 'id');
	}

	/**
	 * The project this student has selected.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne Project
	 */
	public function project()
	{
		return $this->hasOne(Project::class, 'id', 'project_id');
	}

	/**
	 * The status of the student in a pretty string.
	 *
	 * @return String status
	 */
	public function getStatusString()
	{
		$return = '';
		switch ($this->project_status)
		{
			case 'none':
				$return = 'You haven\'t selected a project.';
				break;
			case 'selected':
			case 'proposed':
				$return = 'You\'re awaiting supervisor approval.';
				break;
			case 'accepted':
				$return = 'Congratulations. You\'ve been accepted.';
				break;
		}

		return $return;
	}

	/**
	 * Returns all favourite projects.
	 *
	 * @return Project Projects
	 */
	public function getFavouriteProjects()
	{
		return Student::favouriteProjectCookieIsValid()
			? Project::whereIn('id', unserialize(Cookie::get('favourite_projects')))->get()
			: null;
	}

	/**
	 * Returns proposed projects without a supervisor.
	 *
	 * @return Project Projects
	 */
	public function getProposedProjectsWithoutSupervisor()
	{
		return Project::
			where('status', 'student-proposed')
			->where('student_id', $this->id)
			->whereNull('supervisor_id')
			->get();
	}

	/**
	 * Returns a boolean whether the parameter project is a favourite project.
	 *
	 *
	 * @param  $id     Project   ID
	 * @return boolean favourite project
	 */
	public function isFavouriteProject($id)
	{
		if (!Student::favouriteProjectCookieIsValid())
		{
			return false;
		}

		if (Cookie::get('favourite_projects') != "null")
		{
			$favProjects = unserialize(Cookie::get('favourite_projects'));

			if (($key = array_search($id, $favProjects)) !== false)
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * Returns a boolean whether the parameter project is a favourite project.
	 *
	 *
	 * @param  $id     Project   ID
	 * @return boolean favourite project
	 */
	public static function favouriteProjectCookieIsValid()
	{
		return !(
			Cookie::get('favourite_projects') == "none" ||
			Cookie::get('favourite_projects') == "a:0:{}" ||
			empty(Cookie::get('favourite_projects'))
		);
	}
}
