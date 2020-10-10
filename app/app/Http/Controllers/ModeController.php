<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use SussexProjects\User;
use SussexProjects\Mode;
use SussexProjects\ProjectEvaluation;
use SussexProjects\PEQValueTypes;
use SussexProjects\ProjectEvaluationQuestion;

/**
 * The mode controller.
 * Handles all mode functions.
 */
class ModeController extends Controller{

	public function __construct(){
		parent::__construct();
		$this->middleware('auth');
	}

	/**
	 * Amend parameters view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function index(){
		return view('admin.parameters');
	}

	/**
	 * Update parameters.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request){
		$mode = Mode::Instance();

		if($mode->project_year != $request->project_year){
			$mode = new Mode();
			$mode->marker_released_to_staff = false;

			if (Mode::where('project_year', $request->project_year)->first() != null)
			{
				session()->flash('message', 'This project year already exists.');
				session()->flash('message_type', 'error');

				return redirect()->action('ModeController@index');
			}
		}

		$questions = [];

		$amountOfPosterQuestions = 0;
		$amountOfOralQuestions = 0;
		$amountOfDissertationQuestions = 0;
		$amountOfStudentFeedbackQuestions = 0;

		for ($i = 0 ; $i < count($request->title); $i++) { 
			array_push($questions,
				new ProjectEvaluationQuestion(
					$request->title[$i],
					$request->description[$i],
					$request->type[$i],
					$request->group[$i],
					$request->minCommentLength[$i],
					$request->submissionType[$i]
				)
			);

			if($request->type[$i] == PEQValueTypes::PosterPresentation) {
				$amountOfPosterQuestions++;
			}

			if($request->type[$i] == PEQValueTypes::OralPresentation) {
				$amountOfOralQuestions++;
			}

			if($request->type[$i] == PEQValueTypes::Dissertation) {
				$amountOfDissertationQuestions++;
			}

			if($request->type[$i] == PEQValueTypes::StudentFeedback) {
				$amountOfStudentFeedbackQuestions++;
			}

			if(strlen($request->title[$i]) < 2){
				session()->flash('message', 'The question title "'.$request->title[$i].'" is too short');
				session()->flash('message_type', 'error');

				return redirect()->action('ModeController@index');
			}
		}

		if($amountOfPosterQuestions > 1) {
			session()->flash('message', 'There can be no more than 1 "Poster Presentation" question');
			session()->flash('message_type', 'error');

			return redirect()->action('ModeController@index');
		}

		if($amountOfOralQuestions > 1) {
			session()->flash('message', 'There can be no more than 1 "Oral Presentation" question');
			session()->flash('message_type', 'error');

			return redirect()->action('ModeController@index');
		}

		if($amountOfDissertationQuestions > 1) {
			session()->flash('message', 'There can be no more than 1 "Dissertation" question');
			session()->flash('message_type', 'error');

			return redirect()->action('ModeController@index');
		}

		if($amountOfStudentFeedbackQuestions > 1) {
			session()->flash('message', 'There can be no more than 1 "Student Feedback" question');
			session()->flash('message_type', 'error');

			return redirect()->action('ModeController@index');
		}

		if(!isset($request->project_selection)){
			session()->flash('message', 'Invalid project selection date.');
			session()->flash('message_type', 'error');

			return redirect()->action('ModeController@index');
		}

		if(!isset($request->supervisor_accept)){
			session()->flash('message', 'Invalid supervisor accept date.');
			session()->flash('message_type', 'error');

			return redirect()->action('ModeController@index');
		}

		if(!isset($request->project_year)){
			session()->flash('message', 'Invalid project year.');
			session()->flash('message_type', 'error');

			return redirect()->action('ModeController@index');
		}

		$mode->project_selection = $request->project_selection;
		$mode->supervisor_accept = $request->supervisor_accept;
		$mode->project_evaluation_date = $request->project_evaluation_date;

		$mode->project_year = $request->project_year;

		$mode->evaluation_questions = $questions;
		$mode->thresholds = $request->thresholds;
		$mode->project_evaluation_percentage_difference = $request->project_evaluation_percentage_difference;
		
		$mode->save();

		// Update all existing evaluations
		$evaluations = ProjectEvaluation::where('project_year', Mode::getProjectYear())->get();

		foreach ($evaluations as $evaluation) {
			$questions = $evaluation->questions;
			$updatedQuestions = Mode::getEvaluationQuestions();

			for ($i = 0; $i < count($questions); $i++) {
				$questions[$i]->title = $updatedQuestions[$i]->title;
				$questions[$i]->description = $updatedQuestions[$i]->description;
				$questions[$i]->type = $updatedQuestions[$i]->type;
				$questions[$i]->group = $updatedQuestions[$i]->group;
				$questions[$i]->minCommentLength = $updatedQuestions[$i]->minCommentLength;
				$questions[$i]->submissionType = $updatedQuestions[$i]->submissionType;
			}

			$evaluation->update(array(
				'questions' => $questions
			));
		}

		$userTable = (new User())->getTable();
		DB::table($userTable)->where('privileges', '<>', 'student')->update(array('active_year' => $request->project_year));

		// Update all with default 
		DB::table($userTable)->where('active_year', '1970')->update(array('active_year' => $request->project_year));

		session()->flash('message', 'Parameters and evaluations have been updated successfully.');
		session()->flash('message_type', 'success');

		return redirect()->action('ModeController@index');
	}
}
