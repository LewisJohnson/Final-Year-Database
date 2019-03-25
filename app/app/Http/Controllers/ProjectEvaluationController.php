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
		$this->middleware('auth');
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
			if(!Auth::user()->isAdminOfEducationLevel(Session::get('education_level')["shortName"])){
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
				'questions' => $evaluation->getPresetQuestions(),
				'project_year' => Mode::getProjectYear()
			));

			$evaluation->save();
			$evaluation = ProjectEvaluation::find($evaluation->id);
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

		if($evaluation->is_finalised) {
			session()->flash('message', 'This project evaluation has been finalised.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $project);
		}

		$questions = $project->evaluation->questions;

		$finalise = !empty($request->finalise);
		for ($i = 0; $i < count($questions); $i++) { 
			if($isProjectSupervisor) {
				$accessor = "supervisor";
			} elseif($isProjectMarker) {
				$accessor = "marker";
			}

			if($finalise && $i == ProjectEvaluation::DissertationMarkIndex) {
				$value = $request->final_mark;
			} else {
				$value = $request[$i.'_'.$accessor.'_value'];
			}

			switch ($questions[$i]->type) {
				case PEQValueTypes::Scale:
					$value = (int)max(0, min(7, $value));
					break;

				case PEQValueTypes::Number:
					$value = (int)max(0, min(100, $value));
					break;

				case PEQValueTypes::YesNo:
					$value = (bool)$value;
					break;

				case PEQValueTypes::YesNoPossibly:
					$value = (int)max(0, min(2, $value));
					break;
			}

			if($finalise && $i == ProjectEvaluation::DissertationMarkIndex) {
				$valueAccessor = 'FinalValue';
				$commentAccessor ='FinalComment';

				$questions[$i]->$valueAccessor = $value;

				if(!empty($request->joint_report)){
					$questions[$i]->$commentAccessor = $request->joint_report;
				} else {
					$questions[$i]->$commentAccessor = "Not required.";
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
		$evaluation->is_finalised = false;
		$evaluation->save();

		session()->flash('message', 'The project evaluation has been un-finalised');
		session()->flash('message_type', 'warning');

		return redirect()->action('ProjectEvaluationController@show', $evaluation->project);
	}
}
