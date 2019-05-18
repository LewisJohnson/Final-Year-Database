<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use SussexProjects\Mode;
use SussexProjects\Student;
use SussexProjects\User;
use SussexProjects\Project;
use SussexProjects\ProjectEvaluation;
use SussexProjects\PEQValueTypes;

/**
 * The admin controller.
 * Methods in this controller are used for project and system administrators.
 *
 * @see SussexProjects\User
 */
class ProjectEvaluationController extends Controller {

	public function __construct(){
		parent::__construct();
	}

	/**
	 * An overall view of project evaluations.
	 *
	 * @param  Project $project
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function index(){
		$student = new Student();
		$user = new User();

		$students = Student::select($student->getTable().'.*')
				->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
				->orderBy('last_name', 'asc')
				->get();

		return view('evaluation.index')
			->with("students", $students);
	}

	/**
	 * An overall view of project evaluations.
	 *
	 * @param  Project $project
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function studentFeedback(){
		$student = new Student();
		$user = new User();

		$students = Student::select($student->getTable().'.*')
				->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
				->orderBy('last_name', 'asc')
				->get();

		return view('evaluation.feedback')
			->with("students", $students);
	}

	/**
	 * The project evaluation view.
	 *
	 * @param  \Illuminate\Http\Project $project
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function show(Project $project){

		if(empty($project->marker_id)){
			session()->flash('message', 'A second marker is yet to be set up for this project.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		if(Auth::user()->id != $project->supervisor->id && Auth::user()->id != $project->marker_id){
			if(!Auth::user()->isAdminOfEducationLevel(Session::get('education_level')["shortName"]) && !Auth::user()->isExternalMarker()){
				session()->flash('message', 'Sorry, you are not allowed to perform this action.');
				session()->flash('message_type', 'error');
				return redirect()->action('HomeController@index');
			}
		}


		$evaluation = $project->evaluation;
		
		// If the evaluation is null, set up a new one
		if(is_null($evaluation)){
			$evaluation = new ProjectEvaluation;

			$evaluation->project_id = $project->id;
			$evaluation->fill(array(
				'is_finalised' => false,
				'questions' => Mode::getEvaluationQuestions(),
				'project_year' => Mode::getProjectYear()
			));

			$evaluation->save();

			return redirect()->action('ProjectEvaluationController@show', $project);
		}

		return view('evaluation.evaluation')
			->with("project", $project)
			->with("evaluation", $evaluation);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param Project	$project
	 * @param Request	$request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update(Project $project, Request $request) {
		$isProjectSupervisor = Auth::user()->id == $project->supervisor->id;
		$isProjectMarker = Auth::user()->id == $project->marker->id;

		if(!$isProjectSupervisor && !$isProjectMarker) {
			session()->flash('message', 'Sorry, you are not allowed to perform this action.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$evaluation = ProjectEvaluation::find($project->evaluation->id);
		$questions = $evaluation->questions;

		if(
			($isProjectSupervisor && $project->evaluation->supervisorHasSubmittedAllQuestions()) ||
			($isProjectMarker && $project->evaluation->markerHasSubmittedAllQuestions())
		){
			session()->flash('message', 'You have already submitted all your marks.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $project);
		}

		if($evaluation->is_finalised) {
			session()->flash('message', 'This project evaluation has been finalised.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $project);
		}

		for ($i = 0; $i < count($questions); $i++) {
			if($isProjectSupervisor) {
				$accessor = "supervisor";
			} elseif($isProjectMarker) {
				$accessor = "marker";
			}
			
			$submittedAccessor = $accessor.'Submitted';
			if($questions[$i]->$submittedAccessor) {
				continue;
			}

			$value = $request[$i.'_'.$accessor.'_value'];

			switch ($questions[$i]->type) {
				case PEQValueTypes::Scale:
					$value = (int)max(0, min(10, $value));
					break;

				case PEQValueTypes::Number:
				case PEQValueTypes::PosterPresentation:
				case PEQValueTypes::OralPresentation:
				case PEQValueTypes::Dissertation:
					$value = (int)max(0, min(100, $value));
					break;

				case PEQValueTypes::YesNo:
					$value = (bool)$value;
					break;

				case PEQValueTypes::YesPossiblyNo:
					$value = (int)max(0, min(2, $value));
					break;
			}

			$valueAccessor = $accessor.'Value';
			$questions[$i]->$valueAccessor = $value;

			$commentAccessor = $accessor.'Comment';
			$questions[$i]->$commentAccessor = $request[$i.'_'.$accessor.'_comment'];
		}

		$evaluation->update(array(
			'questions' => $questions
		));
		
		session()->flash('message', 'The project evaluation for "'.$project->title.'" has been updated.');
		session()->flash('message_type', 'success');

		return redirect()->action('ProjectEvaluationController@show', $project);
	}


	/**
	 * Submits the group for the evaluation
	 *
	 * @param Project	$project The project the evaluation belongs too
	 * @param string	$group The group to submit
	 * @param Request	$request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function submitGroup(Project $project, string $group, Request $request) {
		$isProjectSupervisor = Auth::user()->id == $project->supervisor->id;
		$isProjectMarker = Auth::user()->id == $project->marker->id;

		if(!$isProjectSupervisor && !$isProjectMarker) {
			session()->flash('message', 'Sorry, you are not allowed to perform this action.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$evaluation = ProjectEvaluation::find($project->evaluation->id);

		if($evaluation->is_finalised) {
			session()->flash('message', 'This project evaluation has been finalised.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $project);
		}

		$questions = $evaluation->questions;

		for ($i = 0; $i < count($questions); $i++) {
			if($isProjectSupervisor) {
				$accessor = "supervisorSubmitted";
			} elseif($isProjectMarker) {
				$accessor = "markerSubmitted";
			}

			if($questions[$i]->group == $group) {
				$questions[$i]->$accessor = true;
			}
		}

		$evaluation->update(array(
			'questions' => $questions
		));
		
		session()->flash('message', 'You have successfully submitted Group "'.$group.'".');
		session()->flash('message_type', 'success');

		return redirect()->action('ProjectEvaluationController@show', $project);
	}

	/**
	 * Un-submits the group for the evaluation
	 *
	 * @param Project	$project The project the evaluation belongs too
	 * @param string	$group The group to un-submit
	 * @param Request	$request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function unsubmitGroup(Project $project, string $group, Request $request) {
		$isProjectSupervisor = Auth::user()->id == $project->supervisor->id;
		$isProjectMarker = Auth::user()->id == $project->marker->id;

		if(!$isProjectSupervisor && !$isProjectMarker) {
			session()->flash('message', 'Sorry, you are not allowed to perform this action.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$evaluation = ProjectEvaluation::find($project->evaluation->id);

		if($evaluation->is_finalised) {
			session()->flash('message', 'This project evaluation has been finalised.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $project);
		}

		$questions = $evaluation->questions;

		for ($i = 0; $i < count($questions); $i++) {
			if($isProjectSupervisor) {
				$accessor = "supervisorSubmitted";
			} elseif($isProjectMarker) {
				$accessor = "markerSubmitted";
			}

			if($questions[$i]->group == $group) {
				$questions[$i]->$accessor = false;
			}
		}

		$evaluation->update(array(
			'questions' => $questions
		));
		
		session()->flash('message', 'You have un-submitted Group "'.$group.'".');
		session()->flash('message_type', 'warning');

		return redirect()->action('ProjectEvaluationController@show', $project);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param Project	$project
	 * @param Request	$request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function manualFinaliseView(Request $request){
		$student = new Student();
		$user = new User();

		$students = Student::select($student->getTable().'.*')
				->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
				->orderBy('last_name', 'asc')
				->get();

		$students = $students->filter(function ($student) {
			if(empty($student->project)){
				return false;
			}

			if(empty($student->project->evaluation)){
				return false;
			}

			return !$student->project->evaluation->is_finalised;
		});

		return view('evaluation.finalise-manual')
			->with("students", $students);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param Project	$project
	 * @param Request	$request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function manualFinalise(Request $request){
		$evaluations = ProjectEvaluation::all();
		$finaliseCount = 0;

		foreach($evaluations as $evaluation){
			$finalise = $request[$evaluation->id."_finalise"];

			if($finalise != null){
				$evaluation->is_finalised = true;
				$evaluation->save();

				$finaliseCount++;
			}
		}

		session()->flash('message', $finaliseCount.' project evaluation(s) have been finalised.');
		session()->flash('message_type', 'success');

		return redirect()->action('ProjectEvaluationController@manualFinaliseView');
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param Project	$project
	 * @param Request	$request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function finalise(Project $project, Request $request){
		$isProjectSupervisor = Auth::user()->id == $project->supervisor->id;
		$isProjectMarker = Auth::user()->id == $project->marker->id;

		if(!$isProjectSupervisor && !$isProjectMarker) {
			session()->flash('message', 'Sorry, you are not allowed to perform this action.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$evaluation = ProjectEvaluation::find($project->evaluation->id);
		$questions = $evaluation->questions;

		if($evaluation->is_finalised) {
			session()->flash('message', 'This project evaluation has already been finalised.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $project);
		}

		if(!empty($request->joint_report) && strlen($request->joint_report) < 30) {
			session()->flash('message', 'The joint report is too short.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $project);
		}
		
		for ($i = 0; $i < count($questions); $i++) {
			if($questions[$i]->type == PEQValueTypes::PosterPresentation) {
				$value = $request->poster_final_mark;
			} 
			elseif($questions[$i]->type == PEQValueTypes::OralPresentation) {
				$value = $request->presentation_final_mark;
			} 
			elseif($questions[$i]->type == PEQValueTypes::Dissertation) {
				$value = $request->dissertation_final_mark;
			} else {
				continue;
			}
			
			$value = (int)max(0, min(100, $value));

			$valueAccessor = 'finalValue';
			$commentAccessor ='finalComment';

			$questions[$i]->$valueAccessor = $value;

			if($questions[$i]->type == PEQValueTypes::Dissertation) {
				if(!empty($request->joint_report)) {
					$questions[$i]->$commentAccessor = $request->joint_report;
				} else {
					$questions[$i]->$commentAccessor = "Not required.";
				}
			}
		}

		$evaluation->update(array(
			'is_finalised' => true,
			'questions' => $questions
		));
		
		session()->flash('message', 'The project evaluation for "'.$project->title.'" has been finalised.');
		session()->flash('message_type', 'success');

		return redirect()->action('ProjectEvaluationController@show', $project);
	}

	/**
	 * Un-finalises a project evaluation.
	 *
	 * @param ProjectEvaluation	$evaluation
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function undoFinalise(ProjectEvaluation $evaluation){
		$questions = $evaluation->questions;

		for ($i = 0; $i < count($questions); $i++) {
			if(($questions[$i]->type == PEQValueTypes::PosterPresentation) ||
				($questions[$i]->type == PEQValueTypes::OralPresentation) ||
				($questions[$i]->type == PEQValueTypes::Dissertation)) {
					$questions[$i]->finalValue = 0;
					$questions[$i]->finalComment = "-";
					$questions[$i]->supervisorSubmitted = false;
					$questions[$i]->markerSubmitted = false;
			}
		}

		$evaluation->update(array(
			'is_finalised' => false,
			'questions' => $questions
		));

		$evaluation->save();

		session()->flash('message', 'The project evaluation has been un-finalised');
		session()->flash('message_type', 'warning');

		return redirect()->action('ProjectEvaluationController@show', $evaluation->project);
	}

	/**
	 * Exports the project evaluation data as CSV.
	 *
	 * @param Request	$request
	 *
	 * @return \Illuminate\Http\Response A CSV file
	 */
	public function export(Request $request){

		$students = Student::all();
		$results = array();

		foreach($students as $student){
			$ar = array();
			
			$ar["regNo"] = $student->registration_number;
			$ar["fName"] = $student->user->first_name;
			$ar["lName"] = $student->user->last_name;

			if(!empty($student->user->programme_relationship)){
				$ar["prog"] = $student->user->programme_relationship->name;
			} else {
				$ar["prog"] = '-';
			}

			if(!empty($student->project)){
				$ar["proj"] = $student->project->title;
			} else {
				$ar["proj"] = '-';
			}

			if(!empty($student->project->evaluation) && $student->project->evaluation->is_finalised){
				$eval = $student->project->evaluation;

				if($eval->hasPosterPresentationQuestion()){
					$ar["posterMark"] = $eval->getPosterPresentationQuestion()->finalValue;
				} else {
					$ar["posterMark"] = 'n/a';
				}

				if($eval->hasOralPresentationQuestion()){
					$ar["presentationMark"] = $eval->getOralPresentationQuestion()->finalValue;
				} else {
					$ar["presentationMark"] = 'n/a';
				}

				if($eval->hasDissertationQuestion()){
					$ar["dissertationMark"] = $eval->getDissertationQuestion()->finalValue;
				} else {
					$ar["dissertationMark"] = 'n/a';
				}

			} else {
				$ar["posterMark"] = '-';
				$ar["presentationMark"] = '-';
				$ar["dissertationMark"] = '-';
			}

			array_push($results, $ar);
		}

		$filepath = "../storage/app/ProjectEvaluationData.csv";
		$file = fopen($filepath, 'w');

		fputcsv($file, array(
			'Registration Number' , 'First name', 'Last name', 'Programme', 'Project Title',
			'Agreed Poster Mark', 'Agreed Presentation Mark', 'Agreed Dissertation Mark'
		));

		foreach($results as $result){
			fputcsv($file, $result);
		}

		fclose($file);

		header('Content-Description: File Transfer');
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename=ProjectEvaluationData.csv');
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: '.filesize($filepath));

		ob_clean();
		flush();
		readfile($filepath);
		unlink($filepath);

		return;
	}

	/**
	 * Exports the student feedback in all project evaluations as CSV.
	 *
	 * @param Request	$request
	 *
	 * @return \Illuminate\Http\Response A CSV file
	 */
	public function exportStudentFeedback(Request $request){

		$students = Student::all();
		$results = array();

		foreach($students as $student){
			$ar = array();
			
			$ar["regNo"] = $student->registration_number;
			$ar["fName"] = $student->user->first_name;
			$ar["lName"] = $student->user->last_name;

			if(!empty($student->user->programme_relationship)){
				$ar["prog"] = $student->user->programme_relationship->name;
			} else {
				$ar["prog"] = '-';
			}

			if(!empty($student->project)){
				$ar["proj"] = $student->project->title;

				$ar["supervisor"] = $student->project->supervisor->user->getFullName();

				if(!empty($student->project->marker)){
					$ar["marker"] = $student->project->marker->user->getFullName();
				} else {
					$ar["marker"] = '-';
				}

				if(!empty($student->project->evaluation) && $student->project->evaluation->is_finalised){
					$ar["feedback"] = $student->project->evaluation->getStudentFeedbackQuestion()->supervisorComment;
				} else {
					$ar["feedback"] = '-';
				}
			} else {
				$ar["proj"] = '-';
				$ar["supervisor"] = '-';
				$ar["marker"] = '-';
			}

			array_push($results, $ar);
		}

		$filepath = "../storage/app/ProjectEvaluationStudentFeedbackData.csv";
		$file = fopen($filepath, 'w');

		fputcsv($file, array(
			'Registration Number' , 'Student First name', 'Student Last name', 'Programme', 
			'Project Title', 'Supervisor Name', 'Marker Name', 'Feedback'
		));

		foreach($results as $result){
			fputcsv($file, $result);
		}

		fclose($file);

		header('Content-Description: File Transfer');
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename=ProjectEvaluationStudentFeedbackData.csv');
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: '.filesize($filepath));

		ob_clean();
		flush();
		readfile($filepath);
		unlink($filepath);

		return;
	}
}
