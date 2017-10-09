<?php

namespace App\Http\Controllers;

use Flash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $projects = Project::all();
        return view('projects.index', ['projects' => $projects]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
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
            'supervisor'  => 'required',
            'title'       => 'required',
            'description' => 'required',
        ]);

        // Submit data
        $project = Project::create(request(['supervisor', 'title', 'description', 'archived']));
        
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

            $post = Project::findOrFail($id);

            $post->update(request(['supervisor', 'title', 'description', 'archived']));

            $project = $post; 
            session()->flash('message', '"'.$project->title.'" has been updated.');
            return view('projects.project', compact('project'));

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
