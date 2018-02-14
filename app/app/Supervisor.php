<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class Supervisor extends User{

	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'id', 'title', 'contact_type', 'project_load', 'take_students'
	];

	public function user(){
		return $this->hasOne(User::class, 'id');
	}

	public function getProjectsByStatus($status){
		if(Session::get("db_type") == "ug"){
			return ProjectUg::where("supervisor_id", $this->id)
			->whereNull('student_id')
			->where("status", "=", $status)
			->get();
		} elseif(Session::get("db_type") == "masters") {
			return ProjectMasters::where("supervisor_id", $this->id)
			->whereNull('student_id')
			->where("status", "=", $status)
			->get();
		}
	}

	public function getProjectsOrderByStatus($includeDeleted = false){
		if(Session::get("db_type") == "ug"){
			$proj =  ProjectUg::where("supervisor_id", $this->id)
			->orderBy('status', 'asc')
			->whereNull('student_id');
		} elseif(Session::get("db_type") == "masters") {
			$proj = ProjectMasters::where("supervisor_id", $this->id)
			->orderBy('status', 'asc')
			->whereNull('student_id');
		}

		if($includeDeleted){
			$proj->withTrashed();
		}
		return $proj->get();
	}

	public function getProjectOffers(){
		if(Session::get("db_type") == "ug"){
			$offers = ProjectUg::
				select('projects_ug.id','projects_ug.title', 'students_ug.id as student_id', 'students_ug.share_name as student_share')
				->join('students_ug', 'students_ug.project_id', '=', 'projects_ug.id')
				->where('projects_ug.supervisor_id', $this->id)
				->where('projects_ug.status', '!=', 'student-proposed')
				->where('students_ug.project_status', '=', 'selected')
				->whereNotNull('students_ug.project_id')
				->get();
		} elseif(Session::get("db_type") == "masters") {
			$offers = ProjectMasters::
				select('projects_masters.id','projects_masters.title', 'students_masters.id as student_id', 'students_masters.share_name as student_share')
				->join('students_masters', 'students_masters.project_id', '=', 'projects_masters.id')
				->where('projects_masters.supervisor_id', $this->id)
				->where('projects_masters.status', '!=', 'student-proposed')
				->where('students_masters.project_status', '=', 'selected')
				->whereNotNull('students_masters.project_id')
				->get();
		}

		foreach ($offers as $key => $value) {
			$student = DB::table('users')->select('first_name', 'last_name', 'email')->where('id', $value->student_id)->first();
			if($value->student_share || Auth::user()->isSupervisor()){
				$value->student_name = $student->first_name." ".$student->last_name;
			} else {
				$value->student_name = "Hidden";
			}
			$value->student_email = $student->email;
		}
		return $offers;
	}

	public function getAcceptedStudents($db_type = null){
		if(is_null($db_type)){
			$db_type = Session::get("db_type");
		}
		if($db_type == "ug"){
			$offers = ProjectUg::
				select('projects_ug.id','projects_ug.title', 'students_ug.id as student_id', 'students_ug.share_name as student_share', 'students_ug.marker_id as marker')
				->join('students_ug', 'students_ug.project_id', '=', 'projects_ug.id')
				->where('projects_ug.supervisor_id', $this->id)
				->where('students_ug.project_status', '=', 'accepted')
				->whereNotNull('students_ug.project_id')
				->get();
		} elseif($db_type == "masters") {
			$offers = ProjectMasters::
				select('projects_masters.id','projects_masters.title', 'students_masters.id as student_id', 'students_masters.share_name as student_share', 'students_masters.marker_id as marker')
				->join('students_masters', 'students_masters.project_id', '=', 'projects_masters.id')
				->where('projects_masters.supervisor_id', $this->id)
				->where('students_masters.project_status', '=', 'accepted')
				->whereNotNull('students_masters.project_id')
				->get();
		}

		foreach ($offers as $key => $value) {
			if($db_type == "ug"){
				$student = StudentUg::findOrFail($value->student_id);
			} elseif($db_type == "masters") {
				$student = StudentMasters::findOrFail($value->student_id);
			}

			if($value->student_share || Auth::user()->isSupervisor()){
				$value->student_name = $student->user->getFullName();
			} else {
				$value->student_name = "Hidden";
			}

			// dd($student->marker_id);
			$value->marker = Supervisor::where('id', $value->marker)->first();
			$value->student_email = $student->user->email;
		}
		return $offers;
	}

	public function getProjectProposals(){
		if(Session::get("db_type") == "ug"){
			$studentProposedProjects = ProjectUg::
				select('projects_ug.*', 'students_ug.id as student_id', 'students_ug.share_name as student_share')
				->join('students_ug', 'students_ug.project_id', '=', 'projects_ug.id')
				->where('projects_ug.supervisor_id', $this->id)
				->where('projects_ug.status', '=', 'student-proposed')
				->where('students_ug.project_status', '=', 'proposed')
				->whereNotNull('students_ug.project_id')
				->get();
		} elseif(Session::get("db_type") == "masters") {
			$studentProposedProjects = ProjectMasters::
				select('projects_masters.id','projects_masters.title', 'students_masters.id as student_id', 'students_masters.share_name as student_share')
				->join('students_masters', 'students_masters.project_id', '=', 'projects_masters.id')
				->where('projects_masters.supervisor_id', $this->id)
				->where('projects_masters.status', '=', 'student-proposed')
				->where('students_masters.project_status', '=', 'proposed')
				->whereNotNull('students_masters.project_id')
				->get();
		}

		foreach ($studentProposedProjects as $key => $value) {
			$student = DB::table('users')->select('first_name', 'last_name', 'email')->where('id', $value->student_id)->first();
			if($value->student_share || Auth::user()->isSupervisor()){
				$value->student_name = $student->first_name." ".$student->last_name;
			} else {
				$value->student_name = "Hidden";
			}

			$value->student_email = $student->email;
		}

		return $studentProposedProjects;
	}

	public static function getDatalist(){
		$supervisors = Supervisor::all();

		$rtnString = '<datalist id="supervisor-datalist">';
		foreach ($supervisors as $supervisor) {
			$rtnString .= '<option value="'. $supervisor->user->getFullName().'">';
		}
		$rtnString .= '</datalist>';

		return $rtnString;
	}
}


