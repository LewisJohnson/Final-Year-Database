<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Topic;
use App\TopicUG;
use App\TopicMasters;
use App\ProjectTopic;
use App\ProjectTopicUg;
use App\ProjectTopicMasters;
use Session;

class TopicController extends Controller{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        if(Session::get("db_type") == "ug"){
            $topics = TopicUg::all();
        } else {
            $topics = TopicMasters::all();
        }
        return view('topics.index', compact('topics'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        if(Session::get("db_type") == "ug"){
            $topic = new TopicUg;
        } else {
            $topic = new TopicMasters;
        }

        $topic->fill(array(
            'name' => Topic::getSluggedName(request('name'))
        ));
        $topic->save();
        return $topic;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        if(Session::get("db_type") == "ug"){
            $topic = TopicUg::where('id', $id);
        } else {
            $topic = TopicMasters::where('id', $id);
        }
        return view('topics.topic', compact('topic'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id){

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        if(Session::get("db_type") == "ug"){
            $topic = TopicUg::where('id', $id);
        } else {
            $topic = TopicMasters::where('id', $id);
        }
        $topic->name = request('name');
        $topic->save();
        return 'true';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Topic $topic){
        //todo: this first statment needs to be checked
        ProjectTopic::Where('topic_id', $topic->id)->delete();
        $topic->delete();
        return "true";
    }
}
