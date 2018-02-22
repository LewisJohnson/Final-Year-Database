<?php
namespace SussexProjects;

/**
 * The undergraduate project model.
 * 
 * @see SussexProjects\Http\Controllers\ProjectController
*/
class ProjectUg extends Project{
	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	protected $table = 'projects_ug';

	public function topics(){
		return $this->belongsToMany(TopicUg::class, 'project_topics_ug', 'project_id', 'topic_id')->withPivot('primary');
	}

	// Student proposed project
	public function student(){
		return $this->belongsTo(StudentUg::class, 'id', 'student_id');
	}

	public function getPrimaryTopic(){
		foreach ($this->topics as $key => $value) {
			if($value->pivot->primary){
				return $value;
			}
		}
	}

	public function getStudentsWithThisProjectSelected(){
		return StudentUg::where('project_id', $this->id)->where('project_status', 'selected')->get();
	}

	public function getAcceptStudent(){
		return StudentUg::where('project_id', $this->id)->where('project_status', 'accepted')->first();
	}
}
