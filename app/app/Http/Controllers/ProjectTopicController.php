<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ProjectTopic;
use App\Project;
use App\Topic;

class ProjectTopicController extends Controller
{
	public function index(ProjectTopic $projectTopic){
		return ProjectTopic::find($projectTopic);
    }

    public function store(Project $project){
        $topic = Topic::where('name', request('topic'))->first();

        // If topic isn't in topics, add it to DB
        if(count($topic) == 0){
            $newTopic = new Topic;
            $newTopic->name = Topic::returnValidName(request('topic'));
            $newTopic->save();
            $topic = $newTopic;
        }

        // Validate data
        $projectTopic = new ProjectTopic;
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
        // Destroy Topic
        $topic = Topic::where('name', request('topic'))->first();

        ProjectTopic::where('project_id', $project->id)->where('topic_id', $topic->id)->delete();
        return $topic->name;
    }


}

