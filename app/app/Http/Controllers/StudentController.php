<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;
use SussexProjects\StudentUg;
use SussexProjects\StudentMasters;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectMasters;
use SussexProjects\TransactionUg;
use SussexProjects\TransactionMasters;
use SussexProjects\Supervisor;

/**
 * The student controller.
 *
 * Methods in this controller are used for project and system administrators.
 * 
 * @see SussexProjects\StudentUg Undergraduate students
 * @see SussexProjects\StudentMasters Postgraduate students
*/
class StudentController extends Controller{

	public function __construct(){
		$this->middleware('auth');
	}

	/**
	 * The student report view.
	 *
	 * @return \Illuminate\Http\Response
	*/
	public function report(){
		if(Session::get("db_type") == "ug"){
			$studentCount = count(StudentUg::all());
		} elseif(Session::get("db_type") == "masters") {
			$studentCount = count(StudentMasters::all());
		}
		return view('students.report')->with('studentCount', $studentCount);
	}

	/**
	 * Adds project to favourite projects.
	 *	
	 * @param \Illuminate\Http\Request $request includes project to add
	 * @return \Illuminate\Http\Response
	*/
	public function addFavouriteProject(Request $request){
		if(Session::get("db_type") == "ug"){
			$project = ProjectUg::findOrFail(request('project_id'));
		} elseif(Session::get("db_type") == "masters") {
			$project = ProjectMasters::findOrFail(request('project_id'));
		}

		if(Cookie::get('favourite_projects') === "null" || Cookie::get('favourite_projects') == "a:0:{}" || empty(Cookie::get('favourite_projects'))){
			Cookie::queue('favourite_projects', serialize(array($project->id)), 525600);
		} else {
			$projectInCookie = false;
			$favProjects = unserialize(Cookie::get('favourite_projects'));

			if (($key = array_search($project->id, $favProjects)) !== false) {
				$projectInCookie = true;
			}

			if(!$projectInCookie){
				$favProjects[] = $project->id;
				Cookie::queue('favourite_projects', serialize($favProjects), 525600);
			}
		}
		return;
	}

	/**
	 * Removes project to favourite projects.
	 *	
	 * @param \Illuminate\Http\Request $request includes project to remove
	 * @return \Illuminate\Http\Response
	*/
	public function removeFavouriteProject(Request $request){
		if(Session::get("db_type") == "ug"){
			$project = ProjectUg::findOrFail(request('project_id'));
		} elseif(Session::get("db_type") == "masters") {
			$project = ProjectMasters::findOrFail(request('project_id'));
		}

		$favProjects = unserialize(Cookie::get('favourite_projects'));
		if (($key = array_search($project->id, $favProjects)) !== false) {
			unset($favProjects[$key]);
		}

		Cookie::queue('favourite_projects', serialize($favProjects), 525600);
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

	/**
	 * The student propose a project view (Form).
	 *	
	 * @return \Illuminate\Http\Response
	*/
	public function proposeProjectView(){
		return view("students.propose-project");
	}

	/**
	 * Adds student proposed project to the database
	 *	
	 * @param \Illuminate\Http\Request $request Student proposed project
	 * @return \Illuminate\Http\Response
	*/
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
				$project->fill(array(
					'title' => request('title'),
					'description' => request('description'),
					'status' => "student-proposed",
					'skills' => request('skills')
				));

				$project->save();

				$transaction->fill(array(
					'type' =>'project',
					'action' =>'proposed',
					'project' => $project->id,
					'student' => Auth::user()->student->id,
					'supervisor' => $supervisor->id,
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

	/**
	 * Updates the students share name to other students preference.
	 *	
	 * @param \Illuminate\Http\Request
	 * @return \Illuminate\Http\Response
	*/
	public function shareName(Request $request){
		$student = Auth::user()->student;
		$student->share_name = isset($request->share_name);
		$student->save();
		return response()->json(array('share_name' => $student->share_name)); 
	}

	/**
	 * Selects the requested project.
	 *
	 * The student will now have to wait to be approved or rejected.
	 *  	
	 * @param \Illuminate\Http\Request $request Included project ID
	 * @return \Illuminate\Http\Response Home page
	*/
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
				} elseif(Session::get("db_type") == "masters") {
					$project = ProjectMasters::findOrFail(request('project_id'));
					$transaction = new TransactionMasters;
				}

				$student->project_id = $project->id;
				$student->project_status = 'selected';
				$student->save();

				$transaction->fill(array(
					'type' =>'project',
					'action' =>'selected',
					'project' => request('project_id'),
					'student' => Auth::user()->student->id,
					'supervisor' => $project->supervisor->id,
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


	/**
	 * Updates the students second marker
	 *	
	 * @param \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	*/
	public function updateSecondMarker(Request $request) {
		//todo: make sure user is authorized to perform this action
		$result = DB::transaction(function() use ($request) {
			if(Session::get("db_type") == "ug"){
				$project = ProjectUg::findOrFail(request('project_id'));
				$student = StudentUg::findOrFail(request('student_id'));
				$transaction = new TransactionUg;
			} elseif(Session::get("db_type") == "masters") {
				$project = ProjectMasters::findOrFail(request('project_id'));
				$student = StudentMasters::findOrFail(request('student_id'));
				$transaction = new TransactionMasters;
			}

			$marker = Supervisor::findOrFail(request('marker_id'));

			$transaction->fill(array(
				'type' =>'project',
				'action' => 'marker-assigned',
				'project' => $project->id,
				'student' => $student->id,
				'supervisor' => $project->supervisor_id,
				'marker' => $marker->id,
				'admin' => Auth::user()->supervisor->id,
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

	/**
	 * Returns the first student in the DB without a second marker.
	 *
	 * @return Student
	 */
	public static function getStudentWithoutSecondMarker(){
		if(Session::get("db_type") == "ug"){
			return $student = StudentUg::whereNull('marker_id')->first();
		} elseif(Session::get("db_type") == "masters") {
			return $student = StudentMasters::whereNull('marker_id')->first();
		}
	}
}
