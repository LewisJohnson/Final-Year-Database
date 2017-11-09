<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

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

    public function getOffers(){
        if($this->user->isAdmin() || $this->user->isSupervisor()){
        	$offers = Project::
        		select('projects.id','projects.title', 'students.id as student_id')
	            ->join('students', 'students.project_id', '=', 'projects.id')
	            ->where('projects.supervisor_id', $this->id)
                ->where('students.project_status', '!=', 'approved')
                ->whereNotNull('students.project_id')
	            ->get();
            foreach ($offers as $key => $value) {
                $student = DB::table('users')->select('first_name', 'last_name', 'email')->where('id', $value->student_id)->first();
                $value->student_name = $student->first_name." ".$student->last_name;
                $value->student_email = $student->email;
            }
            return $offers;
        } else {
            return null;
        }
    }

    public function getAcceptedStudents(){
        if($this->user->isAdmin() || $this->user->isSupervisor()){
            $offers = Project::
                select('projects.id','projects.title', 'students.id as student_id')
                ->join('students', 'students.project_id', '=', 'projects.id')
                ->where('projects.supervisor_id', $this->id)
                ->where('students.project_status', '=', 'approved')
                ->whereNotNull('students.project_id')
                ->get();
            foreach ($offers as $key => $value) {
                $student = DB::table('users')->select('first_name', 'last_name', 'email')->where('id', $value->student_id)->first();
                $value->student_name = $student->first_name." ".$student->last_name;
                $value->student_email = $student->email;
            }
            return $offers;
        } else {
            return null;
        }
    }
}

