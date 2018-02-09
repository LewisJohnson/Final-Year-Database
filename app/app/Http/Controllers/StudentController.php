<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;
use SussexProjects\StudentUg;
use SussexProjects\StudentMasters;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectMasters;
use SussexProjects\TransactionUg;
use SussexProjects\TransactionMasters;
use SussexProjects\Supervisor;
use Auth;

class StudentController extends Controller{

	public function __construct(){
		$this->middleware('auth');
	}

	public function report(){
		if(Session::get("db_type") == "ug"){
			$studentCount = count(StudentUg::all());
		} elseif(Session::get("db_type") == "masters") {
			$studentCount = count(StudentMasters::all());
		}
		return view('students.report')->with('studentCount', $studentCount);
	}

	public function addFavouriteProject(Request $request){
		if(Session::get("db_type") == "ug"){
			$project = ProjectUg::findOrFail(request('project_id'));
		} elseif(Session::get("db_type") == "masters") {
			$project = ProjectMasters::findOrFail(request('project_id'));
		}

		if(Cookie::get('fp') == "none" || Cookie::get('fp') == "a:0:{}" || empty(Cookie::get('fp'))){
			Cookie::queue('fp', serialize(array($project->id)), 525600);
		} else {
			$projectInCookie = false;
			$favProjects = unserialize(Cookie::get('fp'));

			if (($key = array_search($project->id, $favProjects)) !== false) {
				$projectInCookie = true;
			}

			if(!$projectInCookie){
				$favProjects[] = $project->id;
				Cookie::queue('fp', serialize($favProjects), 525600);
			}
		}
		return;
	}

	public function removeFavouriteProject(Request $request){
		if(Session::get("db_type") == "ug"){
			$project = ProjectUg::findOrFail(request('project_id'));
		} elseif(Session::get("db_type") == "masters") {
			$project = ProjectMasters::findOrFail(request('project_id'));
		}

		$favProjects = unserialize(Cookie::get('fp'));
		if (($key = array_search($project->id, $favProjects)) !== false) {
			unset($favProjects[$key]);
		}

		Cookie::queue('fp', serialize($favProjects), 525600);
		return;
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
			DB::transaction(function() use ($request) {
				$student = Auth::user()->student;

				// Student has already selected a project
				if($student->project_id != null){
					session()->flash('message', 'You have already selected a project.');
					session()->flash('message_type', 'danger');
					return redirect()->action('HomeController@index');
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
		$student->share_project = isset($request->share_project);
		$student->save();
		return json_encode(array('share_project' => $student->share_project));
	}

	public function selectProject(Request $request){
		// todo: check mode selection date before selecting project
		try {
			DB::transaction(function() use ($request) {
				$student = Auth::user()->student;

				// Student has already selected a project
				if($student->project_id != null){
					session()->flash('message', 'You have already selected a project.');
					session()->flash('message_type', 'danger');
					return redirect()->action('HomeController@index');
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

	public function updateMarker(Request $request) {
		//todo: make sure user is authorized to perform this action
		$result = DB::transaction(function() use ($request) {
			if(Session::get("db_type") == "ug"){
				$project = ProjectUg::findOrFail(request('project_id'));
				$student = StudentUg::findOrFail(request('student_id'));
				$transaction = new TransactionUg;
			} else {
				$project = ProjectMasters::findOrFail(request('project_id'));
				$student = StudentMasters::findOrFail(request('student_id'));
				$transaction = new TransactionMasters;
			}

			$marker = Supervisor::findOrFail(request('marker_id'));

			$transaction->fill(array(
				'transaction_type' => 'marker-assigned',
				'project_id' => $project->id,
				'student_id' => $student->id,
				'supervisor_id' => $project->supervisor_id,
				'marker_id' => $marker->id,
				'admin_id' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();

			$student->marker_id = $marker->id;
			$student->save();
		});
		return $result;
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
