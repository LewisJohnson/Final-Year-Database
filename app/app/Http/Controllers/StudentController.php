<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use SussexProjects\StudentUg;
use SussexProjects\StudentMasters;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectMasters;
use SussexProjects\TransactionUg;
use SussexProjects\TransactionMasters;
use SussexProjects\Supervisor;
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

	public function proposeProject(Request $request){
		// todo: check mode year
		try {
			DB::transaction(function ($request) use ($request) {
				$student = Auth::user()->student;

				// Student has already selected a project
				if($student->project_id != null){
					session()->flash('message', 'You have already selected a project.');
					session()->flash('message_type', 'danger');
					return redirect('/');
				}

				if(Session::get("db_type") == "ug"){
					$project = new ProjectUg;
					$transaction = new TransactionUg;
				} elseif(Session::get("db_type") == "masters") {
					$project = new ProjectMasters;
					$transaction = new TransactionMasters;
				}

				$supervisor = Supervisor::findOrFail(request('supervisor_id'));

				$project->supervisor_id = request('supervisor_id');
				$project->student_id = Auth::user()->student->id;
				$project->student_proposed_project = true;
				$project->fill(array(
					'title' => request('title'),
					'description' => request('description'),
					'status' => request('status'),
					'skills' => request('skills'),
					'author_programme' => 'Computer Science'
				));

				$project->save();

				$transaction->fill(array(
					'transaction_type' =>'proposed',
					'project_id' => $project->id,
					'student_id' => Auth::user()->student->id,
					'supervisor_id' => $supervisor->id,
					'transaction_date' => new Carbon
				));

				$student->project_id = $project->id;
				$student->project_status = 'proposed';

				$student->save();
				$transaction->save();

				session()->flash('message', 'You have proposed "'.$project->title.'" to '.$supervisor->user->getFullName());
				session()->flash('message_type', 'success');
			});
		} catch(ModelNotFoundException $err){
			session()->flash('message', 'There was a problem proposing the project.');
			session()->flash('message_type', 'danger');
		}

		return redirect()->action('HomeController@index');
	}

	public function shareProject(Request $request){
		$student = Auth::user()->student;
		$student->share_project = isset($_POST['share_project']);
		$student->save();

		if($student->share_project){
			session()->flash('message', 'Your name is now visible from other students.');
		} else {
			session()->flash('message', 'Your name is now hidden from other students.');
		}
		session()->flash('message_type', 'success');
		return redirect('/');
	}

	public function selectProject(Request $request){
		// todo: check mode selection date before selecting project
		try {
			DB::transaction(function ($request) use ($request) {
				$student = Auth::user()->student;

				// Student has already selected a project
				if($student->project_id != null){
					session()->flash('message', 'You have already selected a project.');
					session()->flash('message_type', 'danger');
					return redirect('/');
				}

				if(Session::get("db_type") == "ug"){
					$project = ProjectUg::findOrFail(request('project_id'));
					$transaction = new TransactionUg;
				} else {
					$project = ProjectMasters::findOrFail(request('project_id'));
					$transaction = new TransactionMasters;
				}

				$student->project_id = $project->id;
				$student->project_status = 'selected';
				$student->save();

				$transaction->fill(array(
					'transaction_type' =>'selected',
					'project_id' => request('project_id'),
					'student_id' => Auth::user()->student->id,
					'supervisor_id' => $project->supervisor->id,
					'transaction_date' => new Carbon
				));

				$transaction->save();
				session()->flash('message', 'You have selected "'.$project->title.'".');
				session()->flash('message_type', 'success');
			});
		} catch(ModelNotFoundException $err){
			session()->flash('message', 'There was a problem selecting the project.');
			session()->flash('message_type', 'danger');
		}

		return redirect()->action('HomeController@index');
	}

	public function report(){
		return view('students.report');
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
