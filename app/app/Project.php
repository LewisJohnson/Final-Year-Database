<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

/**
 * The project model.
 * 
 * @see SussexProjects\Http\Controllers\ProjectController
*/
class Project extends Model{
	use Traits\Uuids;

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_projects_'.Session::get('education_level');
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = true;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'description', 'skills', 'status'];

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['supervisor', 'deleted_at'];

	/**
	 * The attributes that should are dates.
	 *
	 * @var array
	 */
	protected $dates = ['created_at'. 'updated_at', 'deleted_at'];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = ['supervisor', 'created_at', 'updated_at'];

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	public function topics(){
		$projectTopic = new ProjectTopic;
		return $this->belongsToMany(Topic::class, $projectTopic->getTable(), 'project_id', 'topic_id')->withPivot('primary');
	}

	// Student proposed project
	public function student(){
		return $this->belongsTo(Student::class, 'id', 'student_id');
	}

	public function getPrimaryTopic(){
		foreach ($this->topics as $key => $value) {
			if($value->pivot->primary){
				return $value;
			}
		}
	}

	public function getStudentsWithThisProjectSelected(){
		return Student::where('project_id', $this->id)->where('project_status', 'selected')->get();
	}

	public function getAcceptStudent(){
		return Student::where('project_id', $this->id)->where('project_status', 'accepted')->first();
	}

	public function supervisor(){
		return $this->belongsTo(Supervisor::class, 'supervisor_id', 'id');
	}

	/**
	 * A list of all potential project statues.
	 *
	 * @return string[] An array of all statues'.
	*/
	public static function getAllStatuses(){
		return ['none', 'student-proposed', 'selected', 'accepted'];
	}

	/**
	 * Determines if this project is owned by the current authenticated used.
	 *
	 * @return boolean
	*/
	public function isOwnedByUser(){
		if(Auth::user()->isSupervisor()){
			return $this->supervisor_id === Auth::user()->supervisor->id;
		} elseif(Auth::user()->isStudent()){
			return $this->student_id === Auth::user()->student->id;
		}
	}
}
