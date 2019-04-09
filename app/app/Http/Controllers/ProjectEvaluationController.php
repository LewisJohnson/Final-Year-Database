<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use SussexProjects\Mode;
use SussexProjects\Student;
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
		$this->middleware('disableRoutes');
	}

	/**
	 * An overall view of project evaluations.
	 *
	 * @param  Project $project
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function index(){
		$students = Student::all();

		$studentsSorted = $students->sortByDesc(function ($student) {
			$weight = 0;

			if(!empty($student->project->evaluation)){
				$weight++;

				if($student->project->evaluation->getStatus() == "Finalised"){
					$weight += 2;
				}

				if($student->project->evaluation->getStatus() == "Submitted"){
					$weight++;
				}
			}

			if($student->project_status == "accepted"){
				$weight++;
			}

			return $weight;
		});


		return view('evaluation.index')
			->with("students", $studentsSorted);
	}

	/**
	 * An overall view of project evaluations.
	 *
	 * @param  Project $project
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function studentFeedback(){
		$students = Student::all();

		$studentsSorted = $students->sortByDesc(function ($student) {
			$weight = 0;

			if(!empty($student->project->evaluation)){
				$weight++;

				if($student->project->evaluation->getStatus() == "Finalised"){
					$weight += 2;
				}

				if($student->project->evaluation->getStatus() == "Submitted"){
					$weight++;
				}
			}

			if($student->project_status == "accepted"){
				$weight++;
			}

			return $weight;
		});


		return view('evaluation.feedback')
			->with("students", $studentsSorted);
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
	public function update(Project $project, Request $request){
		$isProjectSupervisor = Auth::user()->id == $project->supervisor->id;
		$isProjectMarker = Auth::user()->id == $project->marker->id;

		if(!$isProjectSupervisor && !$isProjectMarker) {
			session()->flash('message', 'Sorry, you are not allowed to perform this action.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$evaluation = ProjectEvaluation::find($project->evaluation->id);
		$questions = $project->evaluation->questions;

		$finalise = !empty($request->finalise);
		$submission = !empty($request->submission);

		if(!$finalise && 
			(($isProjectSupervisor && $project->evaluation->supervisor_submitted) ||
			($isProjectMarker && $project->evaluation->marker_submitted))
		){
			session()->flash('message', 'You have already submitted your marks.');
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

			if($finalise) {
				if($questions[$i]->type == PEQValueTypes::PosterPresentation) {
					$value = $request->poster_final_mark;
				} 
				elseif($questions[$i]->type == PEQValueTypes::OralPresentation) {
					$value = $request->presentation_final_mark;
				} 
				elseif($questions[$i]->type == PEQValueTypes::Dissertation) {
					$value = $request->dissertation_final_mark;
				} else {
					$value = $request[$i.'_'.$accessor.'_value'];
				}
			} else {
				$value = $request[$i.'_'.$accessor.'_value'];
			}

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

			if(($finalise && $questions[$i]->type == PEQValueTypes::PosterPresentation) ||
				($finalise && $questions[$i]->type == PEQValueTypes::OralPresentation) ||
				($finalise && $questions[$i]->type == PEQValueTypes::Dissertation)) {

				$valueAccessor = 'FinalValue';
				$commentAccessor ='FinalComment';

				$questions[$i]->$valueAccessor = $value;

				if($questions[$i]->type == PEQValueTypes::Dissertation) {
					if(!empty($request->joint_report)) {
						$questions[$i]->$commentAccessor = $request->joint_report;
					} else {
						$questions[$i]->$commentAccessor = "Not required.";
					}
				}
			} else {
				$valueAccessor = ucfirst($accessor).'Value';
				$questions[$i]->$valueAccessor = $value;

				$commentAccessor = ucfirst($accessor).'Comment';
				$questions[$i]->$commentAccessor = $request[$i.'_'.$accessor.'_comment'];
			}
		}

		$evaluation->update(array(
			'is_finalised' => $finalise,
			$isProjectSupervisor ? 'supervisor_submitted' : 'marker_submitted' => $submission,
			'questions' => $questions
		));

		session()->flash('message', 'The project evaluation for "'.$project->title.'" has been updated.');
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
					$questions[$i]->FinalValue = 0;
					$questions[$i]->FinalComment = "-";
			}
		}

		$evaluation->update(array(
			'is_finalised' => false,
			'supervisor_submitted' => false,
			'marker_submitted' => false,
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
				$ar["posterMark"] = $eval->getPosterPresentationQuestion()->FinalValue;
				$ar["presentationMark"] = $eval->getOralPresentationQuestion()->FinalValue;
				$ar["dissertationMark"] = $eval->getDissertationQuestion()->FinalValue;
			} else {
				$ar["posterMark"] = '-';
				$ar["presentationMark"] = '-';
				$ar["dissertationMark"] = '-';
			}

			array_push($results, $ar);
		}

		$tempFileName = tempnam(sys_get_temp_dir(), 'ProjectEvaluationData');
		$file = fopen($tempFileName, 'w');

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
		header('Content-Length: '.filesize($tempFileName));

		ob_clean();
		flush();
		readfile($tempFileName);
		unlink($tempFileName);

		return;
	}
}
