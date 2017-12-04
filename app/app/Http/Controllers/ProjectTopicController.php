<?php

namespace SussexProjects\Http\Controllers;

use SussexProjects\ProjectTopicMasters;
use SussexProjects\ProjectTopicUg;
use SussexProjects\TopicMasters;
use SussexProjects\TopicUg;
use SussexProjects\ProjectTopic;
use SussexProjects\Project;
use SussexProjects\Topic;
use DB;
use Session;
use Illuminate\Support\Carbon;
class ProjectTopicController extends Controller{

	public function __construct(){ 
		$this->middleware('auth'); 
	}
	
	public function index(ProjectTopic $projectTopic){
		return ProjectTopic::find($projectTopic);
	}

	// This logic is handeled in the ProjectController
}

