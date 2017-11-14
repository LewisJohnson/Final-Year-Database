<?php

namespace App\Http\Controllers;

use App\Project;
use Flash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;


class Ug_ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        //Check supervisor cookie if(cookie = "master side") only get master projects
        // if(Auth::user()->isUgSupervisor()){
        //     $projects = Project::all();
        //     // Project::whereNotNull('supervisor_id');
        //     // ->where('student_proposed_project', 0)
        //     // ->where('status', 'on-offer');
        // } else if {

        // }else if {
            
        // }else if {
            
        // }
            $projects = Project::all();
        
        return view('projects.index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
        return view('projects.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        // Validate data
        $this->validate(request(), [
            'title'       => 'required|max:255',
            'description' => 'required|max:16777215',
            'skills' => 'required|max:255',
            'status' => 'required',
        ]);

        $project = new Project;
        $project->fill(array(
            'title' => request('title'),
            'description' => request('description'),
            'status' => request('status'),
            'skills' => request('skills'),
            'start_date' => new Carbon
        ));

        $project->author_programme = 'no idea';
        $project->supervisor_id = Auth::user()->supervisor->id;

        $project->save();

        session()->flash('message', 'Project "'.$project->title.'"" created.');

        // Redirect
        return redirect()->action('ProjectController@show', ['project' => $project]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project) {
        return view('projects.project', compact('project'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project){
        return view('projects.edit', compact('project'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id) {
        // todo: add form validation
        try {
            $project = Project::findOrFail($id);
            $project->update(request(['title', 'description', 'skills']));
            session()->flash('message', '"'.$project->title.'" has been updated.');
            return redirect()->action('ProjectController@show', $project);

        } catch(ModelNotFoundException $err){
            //Show error page
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        // Get data
        $project = Project::findOrFail($id);
        $title = $project-> title;
        Project::destroy($id);

        session()->flash('message', 'Project "'.$title.'" deleted.');

        // Redirect
        return 'done';
    }

    public function search() {
        $searchterm = Input::get('searchTerm');
        $sByTitle = isset($_GET['title']) ? true : false;
        $sByDesc = isset($_GET['description']) ? true : false;
        $sBySuprv = isset($_GET['supervisor']) ? true : false;
        $sByTopic = isset($_GET['topic']) ? true : false;

        // Get data
        $projects = Project::Search($searchterm, $sByTitle, $sByDesc, $sBySuprv, $sByTopic);

        
        // Redirect if we have results
        if (count($projects) === 1) {
            $project = $projects[0];
            session()->flash('message', 'We only found this project.');
            return view('projects.project');

        } else if (count($projects) > 1) {
            return view('projects.index')
            ->with('results', $projects)->with('searchTerm', $searchterm);

        } else {
            session()->flash('message', 'We couldn\'t find anything for "' . $searchterm . '".');
            $projects = Project::all();
            return view('projects.index', compact('projects'));
        }
    }
}
