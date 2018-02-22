<?php
namespace SussexProjects;

/**
 * The masters project model.
 * 
 * @see SussexProjects\Http\Controllers\ProjectController
*/
class ProjectMasters extends Project{

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	protected $table = 'projects_masters';

    public function topics(){
        return $this->belongsToMany(TopicMasters::class, 'project_topics_masters', 'project_id', 'topic_id')->withPivot('primary');
    }

	public function student(){
		return $this->belongsTo(StudentMasters::class, 'id', 'student_id');
	}
	
	public function undertakenStudent(){
		return $this->belongsTo(StudentMasters::class, 'project_id', 'id');
	}

	public function getPrimaryTopic(){
		foreach ($this->topics as $key => $value) {
			if($value->pivot->primary){
				return $value;
			}
		}
	}

	public function getStudentsWithThisProjectSelected(){
		return StudentMasters::where('project_id', $this->id)->where('project_status', 'selected')->get();
	}

	public function getAcceptStudent(){
		return StudentMasters::where('project_id', $this->id)->where('project_status', 'accepted')->first();
	}
}
