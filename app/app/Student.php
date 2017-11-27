<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Session;

class Student extends Model{
	protected $table = null;
	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['id', 'registration_number', 'programme'];

	public function getStatusString(){
		$return = '';
		switch($this->project_status) {
			case 'none':
				$return = 'You haven\'t selected a project.';
				break;
			case 'selected':
				$return = 'You\'re awating supervisor approval.';
				break;
			case 'proposed':
				$return = 'You haven\'t selected a project.';
				break;
			case 'accepted':
				$return = 'Congratulations. You\'ve been accepted.';
				break;
		}
		return $return;
	}

	public static function getMailtoStringByProjectStatus($status){
		$return = 'mailto:';
		if(Session::get("db_type") == "ug"){
			$students = StudentUg::Where('project_status', $status)->get();
		} else {
			$students = StudentMasters::Where('project_status', $status)->get();
		}

		foreach ($students as $key => $student) {
			$return .= $student->user->email;
			$return .= ',';
		}

		return $return;
	}
	
}
