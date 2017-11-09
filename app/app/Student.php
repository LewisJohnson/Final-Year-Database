<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model{

	public $timestamps = false;

	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'registration_number', 'programme'
    ];

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
		  	case 'approved':
		        $return = 'Congratulations. You\'ve been approved.';
		        break;
		}
		return $return;
	}

	public function user(){
        return $this->hasOne(User::class, 'id');
    }

    public function getProject(){
        return Project::where('id', $this->project_id)->first();
    }

    public static function getMailtoStringByProjectStatus($status){
    	$return = 'mailto:';
    	$students = Student::Where('project_status', $status)->get();

    	foreach ($students as $key => $student) {
    		$return .= $student->user->email;
    		$return .= ',';
    	}

    	return $return;
    }
    
}
