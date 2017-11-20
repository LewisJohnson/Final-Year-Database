<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Topic;
use App\ProjectTopic;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        if(Session::get("db_type") == "ug"){
            $topics = Topic_Ug::all();
        } else {
            $topics = Topic_Masters::all();
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
            $topic = new Topic_Ug;
        } else {
            $topic = new Topic_Masters;
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
            $topic = Topic_Ug::where('id', $id);
        } else {
            $topic = Topic_Masters::where('id', $id);
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
            $topic = Topic_Ug::where('id', $id);
        } else {
            $topic = Topic_Masters::where('id', $id);
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
