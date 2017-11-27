<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use DB;
use Session;

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

	public function getProjectOffers(){
		if(Session::get("db_type") == "ug"){
			$offers = ProjectUg::
				select('projects_ug.id','projects_ug.title', 'students_ug.id as student_id')
				->join('students_ug', 'students_ug.project_id', '=', 'projects_ug.id')
				->where('projects_ug.supervisor_id', $this->id)
				->where('students_ug.project_status', '!=', 'accepted')
				->whereNotNull('students_ug.project_id')
				->get();
		} else {
			$offers = ProjectMasters::
				select('projects_masters.id','projects_masters.title', 'students_masters.id as student_id')
				->join('students_masters', 'students_masters.project_id', '=', 'projects_masters.id')
				->where('projects_masters.supervisor_id', $this->id)
				->where('students_masters.project_status', '!=', 'accepted')
				->whereNotNull('students_masters.project_id')
				->get();
		}

		foreach ($offers as $key => $value) {
			$student = DB::table('users')->select('first_name', 'last_name', 'email')->where('id', $value->student_id)->first();
			$value->student_name = $student->first_name." ".$student->last_name;
			$value->student_email = $student->email;
		}
		return $offers;
	}

	public function getAcceptedStudents(){
		if(Session::get("db_type") == "ug"){
			$offers = ProjectUg::
				select('projects_ug.id','projects_ug.title', 'students_ug.id as student_id')
				->join('students_ug', 'students_ug.project_id', '=', 'projects_ug.id')
				->where('projects_ug.supervisor_id', $this->id)
				->where('students_ug.project_status', '=', 'accepted')
				->whereNotNull('students_ug.project_id')
				->get();
		} else {
			$offers = ProjectMasters::
				select('projects_masters.id','projects_masters.title', 'students_masters.id as student_id')
				->join('students_masters', 'students_masters.project_id', '=', 'projects_masters.id')
				->where('projects_masters.supervisor_id', $this->id)
				->where('students_masters.project_status', '=', 'accepted')
				->whereNotNull('students_masters.project_id')
				->get();
		}

		foreach ($offers as $key => $value) {
			$student = DB::table('users')->select('first_name', 'last_name', 'email')->where('id', $value->student_id)->first();
			$value->student_name = $student->first_name." ".$student->last_name;
			$value->student_email = $student->email;
		}
		return $offers;
	}

	public function amountOfProjectsOnOffer(){
		if(Session::get("db_type") == "ug"){
			return ProjectUg::where('supervisor_id', $this->id)->count();
		} else {
			return ProjectMasters::where('supervisor_id', $this->id)->count();
		}
	}
}

		