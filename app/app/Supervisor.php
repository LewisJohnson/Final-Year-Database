<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

/**
 * The supervisor model.
 * 
 * @see SussexProjects\Http\Controllers\SupervisorController
*/
class Supervisor extends User{
	use Traits\Uuids;

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_supervisors';
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
	protected $fillable = [ 'id', 'title', 'contact_type', 'project_load', 'take_students' ];

	/**
	 * Returns the user related to this supervisor.
	 *
	 * @return User
	 */
	public function user(){
		return $this->hasOne(User::class, 'id');
	}

	public function takeStudents(){
		if(Session::get("db_type") == "ug"){
			return $this->take_students_ug;
		} elseif(Session::get("db_type") == "masters") {
			return $this->take_students_masters;
		}
	}

	public function getProjectsByStatus($status){
		return Project::where("supervisor_id", $this->id)
			->whereNull('student_id')
			->where("status", "=", $status)
			->get();
	}

	public function getProjects(){
		return Project::where("supervisor_id", $this->id)
			->orderBy('status', 'asc')
			->whereNull('student_id')
			->get();
	}

	public function getProjectOffers(){
		$students = Student::all();
		$offers = array();

		$students = $students->filter(function($student, $key) {
			if($student->project->supervisor_id !== $this->id){
				return false;
			}

			if($student->project_status !== 'selected'){
				return false;
			}

			return true;
		});

		//todo: re-add name hiding for students
		foreach ($students as $key => $student) {
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}
		
		return $offers;
	}

	public function getAcceptedStudents(){
		$students = Student::all();
		$offers = array();

		$students = $students->filter(function($student, $key) {
			if($student->project->supervisor_id !== $this->id){
				return false;
			}

			if($student->project_status !== 'accepted'){
				return false;
			}

			return true;
		});

		//todo: re-add name hiding for students
		foreach ($students as $key => $student) {
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}
		
		return $offers;
	}

	public function getProjectProposals(){
		$students = Student::all();
		$offers = array();

		$students = $students->filter(function($student, $key) {
			if($student->project->supervisor_id !== $this->id){
				return false;
			}

			if($student->project_status !== 'student-proposed'){
				return false;
			}

			if($student->project->staus !== 'proposed'){
				return false;
			}
			return true;
		});

		//todo: re-add name hiding for students
		foreach ($students as $key => $student) {
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}
		
		return $offers;
	}

	public function getSupervisingStudents(){
		$students = Student::all();
		$offers = array();

		$students = $students->filter(function($student, $key) {
			return $student->project->marker_id == $this->id;
		});

		//todo: re-add name hiding for students
		foreach ($students as $key => $student) {
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}
		
		return $offers;
	}


	/**
	 * A HTML 5 data list snippet containing all supervisors.
	 * This is used for auto-complete.
	 *	
	 * @return string The resulting HTML
	*/
	public static function getDatalist(){
		$supervisors = Supervisor::all();

		$dataListHtml = '<datalist id="supervisor-datalist">';
		foreach ($supervisors as $supervisor) {
			$dataListHtml .= '<option value="'. $supervisor->user->getFullName().'">';
		}
		$dataListHtml .= '</datalist>';

		return $dataListHtml;
	}
}


