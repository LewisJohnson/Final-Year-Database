<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model{

	public $timestamps = false;

	// public static function getAll(){
	// 	return User::where('access_type', 'student')->get();
	// }

	// public static function getAllSortedStatus(){
	// 	return User::where('access_type', 'student')->get();
	// }

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

}
