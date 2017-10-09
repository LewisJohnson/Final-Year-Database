<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Topic;

class TopicController extends Controller{

    public function index(){
        return view('index');
    }

    public function show(Topic $topic){
    	$projects = $topic->posts;
    	return view('projects.index', compact('projects'));
    }

    public function store(Request $request){
    	// Validate data
        // rplace space witrh dash
        $name = str_replace('-', ' ', request('name')); 

        // Create new topic
        $topic = Topic::create($name);
        return $topic;
    }

    public function destroy($id){
    	// Destroy Topic
        Project::destroy($id);

        // Redirect
        return true;
    }
}
