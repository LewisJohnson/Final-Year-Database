<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Controllers;

use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use SussexProjects\Mail\SupervisorUndo;
use SussexProjects\Mode;
use SussexProjects\Programme;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\Topic;
use SussexProjects\Transaction;
use SussexProjects\User;
use SussexProjects\ProjectEvaluation;
use SussexProjects\SecondMarkerPivot;
use SussexProjects\Interfaces\IFactoryRepository;
use Log;

/**
 * The admin controller.
 * Methods in this controller are used for project and system administrators.
 *
 * @see SussexProjects\User
 */
class ProjectAdminController extends Controller
{

	private $projectRepository;
	private $supervisorRepository;
	private $secondMarkerPivotRepository;
	private $studentRepository;

	public function __construct(IFactoryRepository $factoryRepository)
	{
		parent::__construct();
		$this->middleware('auth');

		$this->projectRepository = $factoryRepository->getProjectRepository();
		$this->supervisorRepository = $factoryRepository->getSupervisorRepository();
		$this->secondMarkerPivotRepository = $factoryRepository->getSecondMarkerPivotRepository();
		$this->studentRepository = $factoryRepository->getStudentRepository();
	}

	/**
	 * Administrator hub view.
	 * This is mainly used for mobile.
	 *
	 * @return \Illuminate\View\View
	 */
	public function index()
	{
		return view('admin.index');
	}

	/**
	 * The amend supervisor arrangements view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function amendSupervisorArrangementsView()
	{
		$supervisors = Supervisor::getAllSupervisorsQuery()->get();

		return view('admin.arrangements')->with('supervisors', $supervisors);
	}

	/**
	 * Amends supervisor arrangements.
	 *
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\View\View
	 */
	public function amendSupervisorArrangements(Request $request)
	{
		$supervisors = Supervisor::getAllSupervisorsQuery()->get();

		foreach ($supervisors as $supervisor)
		{
			$project_load = $request[$supervisor->id . "_project_load"];
			$take_students = $request[$supervisor->id . "_take_students"];

			if ($project_load != null)
			{
				$supervisor->setProjectLoad($project_load);
			}
			$supervisor->setTakingStudents(isset($take_students) ? 1 : 0);
		}

		session()->flash('message', 'Supervisor arrangements have been updated successfully');
		session()->flash('message_type', 'success');

		parent::logInfo(__METHOD__, "Amended supervisor arrangements");

		return view('admin.arrangements')->with('supervisors', $supervisors);
	}

	/**
	 * The amend topics view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function amendTopicsView()
	{
		$topics = Topic::all();

		return view('admin.amend-topics')->with('topics', $topics);
	}

	/**
	 * The amend programmes view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function amendProgrammesView()
	{
		$programmes = Programme::all();

		return view('admin.amend-programmes')->with('programmes', $programmes);
	}

	/**
	 * The log-in as another user view.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\View\View
	 */
	public function loginAsView(Request $request)
	{
		$student = new Student();
		$user = new User();

		$supervisors = Supervisor::getAllSupervisorsQuery()
			->get();

		if (!empty($request->student_year))
		{
			$students = Student::select($student->getTable() . '.*')
				->join($user->getTable() . ' as user', 'user.id', '=', $student->getTable() . '.id')
				->where('user.active_year', $request->student_year)
				->orderBy('last_name', 'asc')
				->get();
		}
		else
		{
			$students = Student::select($student->getTable() . '.*')
				->join($user->getTable() . ' as user', 'user.id', '=', $student->getTable() . '.id')
				->orderBy('last_name', 'asc')
				->get();
		}

		$staffUsers = User::where('privileges', 'LIKE', '%staff%')
			->orderBy('last_name', 'asc')
			->get();
		$externalMarkers = User::where('privileges', 'LIKE', '%external_marker%')
			->orderBy('last_name', 'asc')
			->get();

		$noPrivilegesUsers = User::whereNull('privileges')
			->orderBy('last_name', 'asc')
			->get();

		return view('admin.login-as')
			->with('supervisors', $supervisors)
			->with('staffUsers', $staffUsers)
			->with('students', $students)
			->with('externalMarkers', $externalMarkers)
			->with('noPrivilegesUsers', $noPrivilegesUsers);
	}

	/**
	 * Log-in the currently authenticated user as another user.
	 *
	 *
	 * @param  string                  $id User ID
	 * @return \Illuminate\View\View
	 */
	public function loginAs($id)
	{
		$userToLoginAs = User::findOrFail($id);

		if ($userToLoginAs->isSystemAdmin() || $userToLoginAs->isProjectAdmin())
		{
			session()->flash('message', 'You may not log in as an administrator.');
			session()->flash('message_type', 'error');

			return redirect()->action('ProjectAdminController@loginAsView');
		}

		Auth::login($userToLoginAs);

		// Redirect
		session()->flash('message', 'You have logged in as ' . $userToLoginAs->getFullName());
		session()->flash('message_type', 'success');
		Session::put('logged_in_as', true);

		parent::logInfo(__METHOD__, "Logged in-as");

		return redirect()->action('HomeController@index');
	}

	/**
	 * The end of year archive view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function archiveView()
	{
		$mostPopularProject = Project::whereNull('student_id')
			->limit(1)
			->orderBy('view_count', 'desc')
			->first();

		return view('admin.archive')->with('mostPopularProject', $mostPopularProject);
	}

	/**
	 * Runs the end of year archive script
	 * PROJECTS:
	 * - Adds This student was undertaken by [STUDENT NAME]” to project description.
	 * - Set all projects status to archived.
	 * - Remove student-proposed projects which haven't been accepted.
	 *
	 * STUDENTS:
	 * - Remove students without projects
	 * - Remove students with a project and finalised project evaluation.
	 *
	 * OTHER:
	 * - Empty the transaction tables.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function archive(Request $request)
	{
		parent::logInfo(__METHOD__, "Running archive for current year");

		if (!empty($request->project_year))
		{
			if ($request->project_year != Mode::getProjectYear())
			{
				$this::prevYearArchive($request->project_year);
			}
		}

		DB::transaction(function ()
		{
			$projects = Project::all();
			$studentsToDelete = Student::all();

			// Archive all projects
			foreach ($projects as $project)
			{
				if ($project->getAcceptedStudent() != null)
				{
					$project->description = $project->description . " (++ In " . Mode::getFriendlyProjectYear() . " this project was viewed " . $project->view_count . " times and undertaken by " . $project->getAcceptedStudent()->user->getFullName() . " ++)";
					$project->status = 'archived';
					$project->save();
				}

				// Removed
				if ($project->getAcceptedStudent() == null && $project->status == 'student-proposed')
				{
					$project->delete();
				}
			}

			// Empty the students table
			foreach ($studentsToDelete as $student)
			{
				if (empty($student->project))
				{
					User::destroy($student->id);
				}
				else if (empty($student->project->evaluation))
				{
					User::destroy($student->id);
				}
				else if ($student->project->evaluation->is_finalised)
				{
					User::destroy($student->id);
				}
			}

			// Empty the transaction table
			$transaction = new Transaction();
			DB::table($transaction->getTable())->delete();
		});

		parent::logInfo(__METHOD__, "Finished archive for current year");

		return response()->json(array('successful' => true));
	}

	/**
	 * @param $year
	 */
	public function prevYearArchive($year)
	{
		parent::logInfo(__METHOD__, "Running archive for year ($year)");

		DB::transaction(function () use ($year)
		{
			$projects = Project::all();

			$userTable = (new User())->getTable();
			$studentTable = (new Student())->getTable();

			$studentsToDelete = Student::select($studentTable . '.*')
				->join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
				->where('user.active_year', $year)
				->orderBy('last_name', 'asc')
				->get();

			// Empty the students table
			foreach ($studentsToDelete as $student)
			{
				User::destroy($student->id);
			}

			Mode::where('project_year', $year)->delete();
		});

		parent::logInfo(__METHOD__, "Finished archiving for year ($year)");

		return response()->json(array('successful' => true));
	}

	/**
	 * The manual assign second marker view.
	 *
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\View\View
	 */
	public function manualSecondMarkerView(Request $request)
	{
		$projectYear = $request->project_year ?? Mode::getProjectYear();

		$supervisors = Supervisor::getAllSupervisorsQuery()->get();

		$userTable = (new User())->getTable();
		$studentTable = (new Student())->getTable();

		$students = Student::join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
			->select($studentTable . '.*')
			->where('user.active_year', $projectYear)
			->orderBy('user.last_name', 'asc')
			->get();

		return view('admin.assign-marker-manual')
			->with('supervisors', $supervisors)
			->with('students', $students);
	}

	/**
	 * Updates a student's second marker.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function updateSecondMarker(Request $request)
	{
		if (!Auth::user()->isAdminOfEducationLevel() && !Auth::user()->isStaff())
		{
			return parent::Unauthorised(__METHOD__);
		}

		// We don't need the project ID
		$request->validate([
			'student_id' => 'required',
			'marker_id' => 'required'
		]);

		$secondMarkerPivot = SecondMarkerPivot::where('student_id', $request->student_id)->first();

		if (empty($secondMarkerPivot))
		{
			DB::transaction(function () use ($request)
			{
				$secondMarkerPivot = new SecondMarkerPivot();
				$secondMarkerPivot->student_id = $request->student_id;
				$secondMarkerPivot->save();
			});
		}

		DB::transaction(function () use ($request)
		{
			$secondMarkerPivot = SecondMarkerPivot::where('student_id', $request->student_id)->first();

			if (empty($secondMarkerPivot))
			{
				session()->flash('message', 'Sorry, something went wrong.');
				session()->flash('message_type', 'error');

				parent::logError(__METHOD__, "SecondMarkerPivot was not generated in previous transaction");

				return redirect()->action('HomeController@index');
			}

			$project = Project::find($request->project_id);
			$student = Student::findOrFail($request->student_id);
			$marker = Supervisor::findOrFail($request->marker_id);
			$transaction = new Transaction();

			$secondMarkerPivot->marker_id = $marker->id;

			if (!empty($project))
			{
				$secondMarkerPivot->project_id = $project->id;
			}

			$secondMarkerPivot->save();

			$transaction->fill(array(
				'type'             => 'marker',
				'action'           => 'marker-assigned',
				'student'          => $student->id,
				'marker'           => $marker->id,
				'admin'            => Auth::user()->id,
				'transaction_date' => new Carbon()
			));

			parent::logInfo(__METHOD__, "Manual assignment of second marker");

			if (!empty($project))
			{
				$transaction->project = $project->id;
				$transaction->supervisor = $project->supervisor_id;
			}

			$transaction->save();
		});

		return response()->json(array('successful' => true));
	}

	/**
	 * The automatic (Algorithmic) assign second marker view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function secondMarkerView()
	{
		return view('admin.assign-marker-automatic')
			->with('allProjectsHaveMarkerAssigned', empty($this->projectRepository->getAcceptedProjectsWithoutSecondMarker()));
	}

	/**
	 * The actual action of assigning second markers to students.
	 *
	 * @return \Illuminate\Http\Response A HTML report of assigned markers
	 */
	public function calculateSecondMarkers(Request $request)
	{
		// Increase timeout limit as this can take a little longer
		set_time_limit(120);

		parent::logInfo(__METHOD__, "Running calculate second markers");

		$maxStudentsPerSupervisor = PHP_INT_MAX;

		// OPTION: Max students per supervisor
		if (!empty($request->max_students_per_supervisor))
		{
			$maxStudentsPerSupervisor = max(1, $request->max_students_per_supervisor);
		}

		parent::logInfo(__METHOD__, "Max number of students per supervisor", ["max" => $maxStudentsPerSupervisor]);

		parent::logInfo(__METHOD__, "Checking if max students per supervisor is high enough");

		if (ProjectController::getAcceptedProjectCount() > (Supervisor::getAllSupervisorsQuery()
			->where('project_load_' . get_el_short_name(), '>', 0)
			->count() * $maxStudentsPerSupervisor))
		{

			parent::logInfo(__METHOD__, "Max students not high enough");

			return response()->json(array(
				'successful' => false,
				'message'    => "Please increase the maximum students per supervisor.",
			));
		}

		// OPTION: Keep assigned markers?
		if ($request->keep_assigned_markers == 0)
		{
			parent::logInfo(__METHOD__, "Clearing second markers");

			// Reset every student's second marker
			SecondMarkerPivot::truncate();
		}
		else
		{
			parent::logInfo(__METHOD__, "NOT clearing second markers");
		}


		$onlyAcceptedStudents = $request->only_assign_accepted == 1;

		if ($onlyAcceptedStudents)
		{
			parent::logInfo(__METHOD__, "Only assigning student WITH an accepted project");
		}
		else
		{
			parent::logInfo(__METHOD__, "Assigning student regardless of project status");
		}

		// Assign students taking lazy score in to consideration
		$students = $this->studentRepository->getStudentsWithoutSecondMarker($onlyAcceptedStudents);

		parent::logInfo(__METHOD__, "Number of students to assign", ['amount' => count($students)]);
		foreach ($students as $student)
		{

			$studentArr = [
				'student-id' => $student->id,
				'student-full-name' => $student->user->getFullName()
			];

			parent::logInfo(__METHOD__, "Attempting to assign second marker student", ["student" => $studentArr]);

			// Recalculate scores
			$studentSupervisorId = NULL;
			$studentProjectId = NULL;

			if (!empty($student->project))
			{
				$studentSupervisorId = $student->project->supervisor_id;
				$studentProjectId = $student->project->id;
			}

			$supervisorsWithLazyScore = $this->supervisorRepository->getSupervisorsWithLazyScore(false, $maxStudentsPerSupervisor, $studentSupervisorId);

			// Get the laziest supervisor
			$secondMarkerToAssign = $supervisorsWithLazyScore->sortByDesc('lazy_score')->first();

			parent::logInfo(
				__METHOD__,
				"Got supervisor with highest lazy score",
				[
					'second-marker-id' => $secondMarkerToAssign->id,
					'second-marker-full-name' => $secondMarkerToAssign->user->getFullName(),
					'lazy-score' => $secondMarkerToAssign["lazy_score"]
				]
			);

			$this->secondMarkerPivotRepository->update($student->id, $secondMarkerToAssign->id, $studentProjectId);

			parent::logInfo(
				__METHOD__,
				"Student assigned with second marker",
				[
					'student-full-name' => $student->user->getFullName(),
					'second-marker-full-name' => $secondMarkerToAssign->user->getFullName(),
				]
			);

			$transaction = new Transaction();
			$transaction->fill(array(
				'type'             => 'marker',
				'action'           => 'marker-assigned',
				'project'          => empty($student->project) ? NULL : $student->project->id,
				'student'          => $student->id,
				'marker'           => $secondMarkerToAssign->id,
				'admin'            => Auth::user()->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();
		}


		return redirect()->action('ProjectAdminController@secondMarkerReport');
	}

	/**
	 * An overview of each supervisor and which students they are second marker to.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function secondMarkerReport()
	{
		$supervisors = Supervisor::getAllSupervisorsQuery()->get();

		$view = view('admin.partials.second-supervisor-assignment-report-table')
			->with('supervisors', $supervisors);

		return response()->json(array(
			'successful' => true,
			'html'       => json_encode($view->render()),
		));
	}

	/**
	 * An overview of each automatically assigned second marker.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function automaticSecondMarkerPreview()
	{
		$supervisorsWithLazyScore = $this->supervisorRepository->getSupervisorsWithLazyScore(true, PHP_INT_MAX, "");

		$view = view('admin.partials.automatic-marker-assignment-table')
			->with('supervisors', $supervisorsWithLazyScore);

		return response()->json(array(
			'successful' => true,
			'html'       => $view->render(),
		));
	}

	/**
	 * The swap second marker view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function swapSecondMarkerView(Request $request)
	{
		$projectYear = $request->project_year ?? Mode::getProjectYear();

		$projectTable = (new Project())->getTable();
		$studentTable = (new Student())->getTable();
		$pivotTable = (new SecondMarkerPivot())->getTable();
		$userTable = (new User())->getTable();

		$projects = Project::join($pivotTable . ' as piv', 'piv.project_id', '=', $projectTable . '.id')
			->join($studentTable . ' as student', $projectTable . '.id', '=', 'student.project_id')
			->join($userTable . ' as user', 'user.id', '=', 'student.id')
			->where('user.active_year', $projectYear)
			->whereNotNull('piv.marker_id')
			->select($projectTable . '.*')
			->get();

		return view('admin.swap-marker')->with('projects', $projects);
	}

	/**
	 * Swap student A's and student B's second markers.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function swapSecondMarker(Request $request)
	{
		$request->validate([
			'student_a' => 'required',
			'student_b' => 'required'
		]);

		try
		{
			$studentAId = $request->student_a;
			$studentBId = $request->student_b;

			$studentAPivot = SecondMarkerPivot::findOrFail($studentAId);
			$studentBPivot = SecondMarkerPivot::findOrFail($studentBId);

			$studentA = Student::findOrFail($studentAId);
			$studentB = Student::findOrFail($studentBId);

			$markerA = User::findOrFail($studentAPivot->marker_id);
			$markerB = User::findOrFail($studentBPivot->marker_id);

			DB::transaction(function () use ($studentAPivot, $studentBPivot, $studentA, $studentB, $markerA, $markerB)
			{
				$projectA = $studentAPivot->project_id;
				$projectB = $studentBPivot->project_id;

				// Update values to null so we don't have a unique constraint failure
				$studentAPivot->marker_id = null;
				$studentAPivot->project_id = null;

				$studentBPivot->marker_id = null;
				$studentBPivot->project_id = null;

				$studentAPivot->save();
				$studentBPivot->save();

				// Set values to correct values
				$studentAPivot->marker_id = $markerB->id;
				$studentAPivot->project_id = $projectB;

				$studentBPivot->marker_id = $markerA->id;
				$studentBPivot->project_id = $projectA;

				$studentAPivot->save();
				$studentBPivot->save();

				// Student A transaction
				$transaction = new Transaction();
				$transaction->fill(array(
					'type'             => 'marker',
					'action'           => 'marker-swap',
					'student'          => $studentA->id,
					'marker'           => $markerA->id . ' -> ' . $markerB->id,
					'admin'            => Auth::user()->id,
					'transaction_date' => new Carbon(),
				));

				$transaction->save();

				// Student B transaction
				$transaction = new Transaction();
				$transaction->fill(array(
					'type'             => 'marker',
					'action'           => 'marker-swap',
					'student'          => $studentB->id,
					'marker'           => $markerB->id . ' -> ' . $markerA->id,
					'admin'            => Auth::user()->id,
					'transaction_date' => new Carbon(),
				));

				$transaction->save();

				// Save to log
				parent::logInfo(__METHOD__, "Swapped second markers");
			});
		}
		catch (ModelNotFoundException $e)
		{
			return response()->json(array('successful' => false));
		}

		return response()->json(array('successful' => true));
	}

	/**
	 * The export second marker data view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function exportSecondMarkerDataView()
	{
		return view('admin.export-marker');
	}

	/**
	 * Exports the second marker data to either JSON or CSV.
	 *
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response The second marker data.
	 */
	public function exportSecondMarkerData(Request $request)
	{
		$studentTable = (new Student())->getTable();
		$pivotTable = (new SecondMarkerPivot())->getTable();

		$students = Student::join($pivotTable . ' as piv', 'piv.student_id', '=', $studentTable . '.id')
			->select($studentTable . '.*')
			->whereNotNull('piv.marker_id')
			->get();


		$results = array();

		foreach ($students as $student)
		{
			$ar = array();

			$ar["fName"] = $student->user->first_name;
			$ar["lName"] = $student->user->last_name;
			$ar["cNo"] = $student->registration_number;
			$ar["projectTitle"] = empty($student->project) ? 'None' : $student->project->title;
			$ar["supervisorName"] = empty($student->project) ? 'None' : $student->project->supervisor->user->getFullName();
			$ar["markerName"] = empty($student->getSecondMarker()) ? 'None' : $student->getSecondMarker()->getFullName();

			array_push($results, $ar);
		}

		$filepath = "../storage/app/SecondMarkerData.csv";
		$file = fopen($filepath, 'w');

		fputcsv($file, array(
			'First Name', 'Last Name', 'Candidate Number', 'Project Title', 'Supervisor', 'Second Marker',
		));

		foreach ($results as $result)
		{
			fputcsv($file, $result);
		}

		fclose($file);

		header('Content-Description: File Transfer');
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename=SecondMarkerData.csv');
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($filepath));

		ob_clean();
		flush();
		readfile($filepath);
		unlink($filepath);

		return;
	}

	/**
	 * The student propose a project view (Form).
	 *
	 * @return \Illuminate\View\View|\Illuminate\Http\Response
	 */
	public function exportStudentSummary(Request $request)
	{
		if (!empty($request->project_year))
		{
			$userTable = (new User())->getTable();
			$studentTable = (new Student())->getTable();

			$students = Student::join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
				->select($studentTable . '.*')
				->where('user.active_year', $request->project_year)
				->orderBy('user.last_name', 'asc')
				->get();
		}
		else
		{
			$students = Student::getAllStudentsQuery()->get();
		}

		$results = array();
		foreach ($students as $student)
		{
			$ar = array();

			$ar["regNo"] = $student->registration_number;
			$ar["username"] = $student->user->username;
			$ar["programme"] = $student->user->getProgrammeName();

			$ar["fName"] = $student->user->first_name;
			$ar["lName"] = $student->user->last_name;

			if (!empty($student->project))
			{
				$ar["projectTitle"] = $student->project->title;

				if (!empty($student->project->supervisor))
				{
					$ar["supervisorName"] = $student->project->supervisor->user->getFullName();
				}
				else
				{
					$ar["supervisorName"] = '-';
				}

				if (!empty($student->getSecondMarker()))
				{
					$ar["markerName"] = $student->getSecondMarker()->getFullName();
				}
				else
				{
					$ar["markerName"] = '-';
				}

				if (!empty($student->project->evaluation) && $student->project->evaluation->is_finalised)
				{
					$eval = $student->project->evaluation;

					if ($eval->hasPosterPresentationQuestion())
					{
						$ar["posterMark"] = $eval->getPosterPresentationQuestion()->finalValue;
					}
					else
					{
						$ar["posterMark"] = '-';
					}

					if ($eval->hasOralPresentationQuestion())
					{
						$ar["presentationMark"] = $eval->getOralPresentationQuestion()->finalValue;
					}
					else
					{
						$ar["presentationMark"] = '-';
					}

					if ($eval->hasDissertationQuestion())
					{
						$ar["dissertationMark"] = $eval->getDissertationQuestion()->finalValue;
					}
					else
					{
						$ar["dissertationMark"] = '-';
					}
				}
				else
				{
					$ar["posterMark"] = '-';
					$ar["presentationMark"] = '-';
					$ar["dissertationMark"] = '-';
				}
			}
			else
			{
				$ar["projectTitle"] = '-';
				$ar["supervisorName"] = '-';
				$ar["markerName"] = '-';
				$ar["posterMark"] = '-';
				$ar["presentationMark"] = '-';
				$ar["dissertationMark"] = '-';
			}

			array_push($results, $ar);
		}

		if (!empty($request->project_year))
		{
			$fileName = "StudentData-" . $request->project_year . ".csv";
		}
		else
		{
			$fileName = "StudentData-" . Mode::getProjectYear() . ".csv";
		}

		$filepath = "../storage/app/" . $fileName;

		$file = fopen($filepath, 'w');

		fputcsv($file, array(
			'Candidate Number', 'Username', 'Programme',
			'First Name', 'Last Name',
			'Project Title', 'Supervisor', 'Second Marker',
			'Agreed Poster Mark', 'Agreed Presentation Mark', 'Agreed Dissertation Mark',
		));

		foreach ($results as $result)
		{
			fputcsv($file, $result);
		}

		fclose($file);

		header('Content-Description: File Transfer');
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename=' . $fileName);
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($filepath));

		ob_clean();
		flush();
		readfile($filepath);
		unlink($filepath);

		return;
	}

	/**
	 * Undoes an accepted student.
	 *
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response JSON
	 */
	public function undoStudent(Request $request)
	{
		$student = Student::findOrFail(request('student_id'));
		$projectId = $student->project->id;

		DB::transaction(function () use ($request, $student, $projectId)
		{
			$transaction = new Transaction();

			$transaction->fill(array(
				'type'             => 'student',
				'action'           => 'undo',
				'project'          => $student->project->name,
				'student'          => $student->id,
				'supervisor'       => $student->project->supervisor->id,
				'admin'            => Auth::user()->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();

			$this->secondMarkerPivotRepository->clearSecondMarker($student->id);

			if ($student->project->status == "student-proposed")
			{
				$student->project->supervisor_id = null;
				$student->project->save();
			}

			if (!empty($student->getEvaluation()))
			{
				$student->getEvaluation()->delete();
			}

			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();
		});

		$emailError = false;

		try
		{
			// Send undo email
			Mail::to($student->user->email)
				->send(new SupervisorUndo(Auth::user()->supervisor, $student, $projectId));
		}
		catch (\Exception $e)
		{
			$emailError = true;
		}

		$message = $student->getName() . " is no longer accepted.";

		if ($emailError)
		{
			return response()->json(array(
				'successful'       => true,
				'email_successful' => false,
				'message'          => $message,
			));
		}

		return response()->json(array(
			'successful'       => true,
			'email_successful' => true,
			'message'          => $message,
		));
	}

	/**
	 * The assign a project to a student view.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\View\View
	 */
	public function assignProjectView(Request $request)
	{
		if (empty($request->project_year))
		{
			$request->project_year = Mode::getProjectYear();
		}

		$userTable = (new User())->getTable();
		$studentTable = (new Student())->getTable();

		$students = Student::select($studentTable . '.*')
			->join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
			->where('user.active_year', $request->project_year)
			->orderBy('last_name', 'asc')
			->get();

		$projects = Project::whereNotNull('supervisor_id')
			->where('status', '<>', 'archived')
			->get();

		if ($request->accepted_projects == false)
		{
			$projects = $projects->filter(function ($project)
			{
				return empty($project->getAcceptedStudent());
			});
		}

		if (is_null($request->students_with_project) || $request->students_with_project == false)
		{
			$students = $students->filter(function ($student)
			{
				return empty($student->project);
			});
		}

		$request->flash();

		return view('admin.assign-project')
			->with('projects', $projects)
			->with('students', $students);
	}

	/**
	 * Assigns a project to a student
	 *
	 * @return \Illuminate\View\View
	 */
	public function assignProject(Request $request)
	{
		$this->validate(request(), [
			'student_id' => 'required',
			'project_id' => 'required',
		]);

		$student = Student::findOrFail($request->student_id);
		$supervisorRepo = $this->supervisorRepository;

		// We must return the error because the return in the transaction will not break out of the function.
		$error = DB::transaction(function () use ($request, $student, $supervisorRepo)
		{
			$project = Project::findOrFail($request->project_id);

			$acceptedStudent = $project->getAcceptedStudent();
			$acceptedStudentId = empty($acceptedStudent) ? NULL : $acceptedStudent->id;

			// Reject currently accepted student
			if ($acceptedStudent != null)
			{
				$supervisorRepo->rejectStudent($acceptedStudentId);
			}

			// Reject all other students
			foreach ($project->getStudentsWithProjectSelected() as $student)
			{
				$studentId = $student->id;

				// We don't need to reject the previously accepted student again
				if ($studentId != $acceptedStudentId)
				{
					$supervisorRepo->rejectStudent($studentId);
				}
			}

			$supervisorRepo->acceptStudent($student->id, $project->id);

			return null;
		});

		if ($error != null)
		{
			return $error;
		}

		return response()->json(array(
			'successful' => true,
		));
	}
}
