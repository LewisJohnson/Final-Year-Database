<?php
namespace SussexInformaticsProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use SussexInformaticsProjects\StudentUg;
use SussexInformaticsProjects\StudentMasters;
use SussexInformaticsProjects\ProjectUg;
use SussexInformaticsProjects\ProjectMasters;
use SussexInformaticsProjects\TransactionUg;
use SussexInformaticsProjects\TransactionMasters;
use DB;
use Session;
use Auth;

class StudentController extends Controller{

	public function __construct(){ 
		$this->middleware('auth'); 
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id){
		//
	}

	public function showProposeProject(){
		return view("students.propose-project");
	}

	public function proposeProject(){

	}

	public function selectProject(Request $request){
		try {
			DB::transaction(function ($request) use ($request) {
				if(Session::get("db_type") == "ug"){
					$project = ProjectUg::findOrFail(request('project_id'));
					$transaction = new TransactionUg;
				} else {
					$project = ProjectMasters::findOrFail(request('project_id'));
					$transaction = new TransactionMasters;
				}
				
				$student = Auth::user()->student;
				if($student->project_id != null){
					session()->flash('message', 'You have already selected a project.');
					session()->flash('message_type', 'danger');
					return redirect('/');
				}

				$student->project_id = $project->id;
				$student->project_status = 'selected';
				$student->save();

				$transaction->fill(array(
					'transaction_type' =>'selected',
					'project_id' => request('project_id'),
					'student_id' => Auth::user()->student->id,
					'transaction_date' => new Carbon
				));
				$transaction->save();
				
				session()->flash('message', 'You have selected a project.');
				session()->flash('message_type', 'success');
				return redirect()->action('HomeController@index');
			});
		} catch(ModelNotFoundException $err){
			session()->flash('message', 'There was a problem selected the project.');
			session()->flash('message_type', 'danger');
			return redirect()->action('HomeController@index');
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}
}
