<?php

namespace SussexInformaticsProjects\Http\Controllers;

use SussexInformaticsProjects\ProjectTopicMasters;
use SussexInformaticsProjects\ProjectTopicUg;
use SussexInformaticsProjects\TopicMasters;
use SussexInformaticsProjects\TopicUg;
use SussexInformaticsProjects\ProjectTopic;
use SussexInformaticsProjects\Project;
use SussexInformaticsProjects\Topic;
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

    public function store(Project $project){
        if(Session::get("db_type") == "ug"){
            $topic = TopicUg::where('name', request('topic'))->first();
        } else {
            $topic = TopicMasters::where('name', request('topic'))->first();
        }

        // If topic isn't in topics, add it to DB
        if(count($topic) == 0){
            $newTopic = Session::get("db_type") == "ug" ? new TopicUg : new TopicMasters;
            $newTopic->name = request('topic');
            $newTopic->save();
            $topic = $newTopic;
        }

        // Validate data
        $projectTopic = Session::get("db_type") == "ug" ? new ProjectTopicUg : new ProjectTopicMasters;
        $projectTopic->topic_id = $topic->id;
        $projectTopic->project_id = $project->id;
        $projectTopic->save();

        // Return
        return $topic->name;
    }

    public function updatePrimaryTopic(Project $project){
        $topicID = Topic::where('name', request('topic'))->first()->id;
        
        // Clear primary
        ProjectTopic::where('project_id', $project->id)
          ->update(['primary' => 0]);

        // Set new
          ProjectTopic::where('project_id', $project->id)
          ->where('topic_id', $topicID)
          ->update(['primary' => 1]);

        // Return
        return "";
    }

    public function destroy(Project $project){
        if(Session::get("db_type") == "ug"){
            $topic = TopicUg::where('name', request('topic'))->first();
            ProjectTopicUg::
                where('project_id', $project->id)
                ->where('topic_id', $topic->id)
                ->delete();
        } else {
            $topic = TopicMasters::where('name', request('topic'))->first();
            ProjectTopicMasters::
                where('project_id', $project->id)
                ->where('topic_id', $topic->id)
                ->delete();
        }

        $topic->delete();
        return 'true';
    }
}

