<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use SussexProjects\ProjectTopicMasters;
use SussexProjects\ProjectTopicUg;
use SussexProjects\TopicMasters;
use SussexProjects\TopicUg;
use SussexProjects\ProjectTopic;
use SussexProjects\Project;
use SussexProjects\Topic;

/**
 * The project topic controller.
 *
 * Most functions you might expect to find here will be found in ProjectController.
 * 
 * @see ProjectController
 * 
*/
class ProjectTopicController extends Controller{

	public function __construct(){
		$this->middleware('auth');
	}

	public function index(ProjectTopic $projectTopic){
		return ProjectTopic::findOrFail($projectTopic);
	}
}

