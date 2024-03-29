<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Stevebauman\Purify\Facades\Purify;
use SussexProjects\Http\Requests\ProjectForm;
use SussexProjects\Mail\StudentProposed;
use SussexProjects\Mail\StudentSelected;
use SussexProjects\Mail\StudentUnselected;
use SussexProjects\Mode;
use SussexProjects\Programme;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\Transaction;
use SussexProjects\User;

/**
 * The student controller.
 * Methods in this controller are used for project and system administrators.
 *
 * @see SussexProjects\Student
 */
class StudentController extends Controller
{

	/**
	 * The HTML purifier configuration used to sanitise project descriptions.
	 *
	 * @var string[] ~HTML purifier configuration
	 * @see http://htmlpurifier.org/live/configdoc/plain.html HTML purifier configuration documentation.
	 * @see https://github.com/ezyang/htmlpurifier The Laravel implementation of HTML purifier.
	 */
	public $htmlPurifyConfig;

	public function __construct()
	{
		parent::__construct();
		$this->middleware('auth');

		$purifier = Purify::getPurifier();
		$config = $purifier->config;

		$config->set('Core.RemoveProcessingInstructions', true);
		$config->set('Attr.ID.HTML5', true);
		$config->set('AutoFormat.Linkify', true);
		$config->set('HTML.TargetBlank', true);
		$config->set('HTML.SafeObject', true);
		$config->set('HTML.SafeScripting', '');
		$config->set('HTML.ForbiddenElements', 'h1,h2,h3,h4,h5,h6,script,html,body');
		$config->set('Output.FlashCompat', true);
		$config->set('Cache.SerializerPath', base_path('storage/framework/cache'));

		$htmlPurifyConfig = $config;
	}

	/**
	 * The student report view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function report()
	{
		return view('students.report')
			->with('studentCount', Student::getAllStudentsQuery()->count());
	}

	/**
	 * Adds project to the students favourite projects list.
	 *
	 * @return void
	 */
	public function addFavouriteProject(Request $request)
	{
		$project = Project::findOrFail($request->project_id);

		if (!Student::favouriteProjectCookieIsValid())
		{
			Cookie::queue('favourite_projects', serialize(array($project->id)), 525600);
		}
		else
		{
			$projectInCookie = false;
			$favProjects = unserialize(Cookie::get('favourite_projects'));

			if (($key = array_search($project->id, $favProjects)) !== false)
			{
				$projectInCookie = true;
			}

			if (!$projectInCookie)
			{
				$favProjects[] = $project->id;
				Cookie::queue('favourite_projects', serialize($favProjects), 525600);
			}
		}

		return;
	}

	/**
	 * Removes a project from the students favourite projects list.
	 *
	 * @return void
	 */
	public function removeFavouriteProject(Request $request)
	{
		$project = Project::findOrFail($request->project_id);
		$favProjects = unserialize(Cookie::get('favourite_projects'));

		if (($key = array_search($project->id, $favProjects)) !== false)
		{
			unset($favProjects[$key]);
		}

		Cookie::queue('favourite_projects', serialize($favProjects), 525600);

		return;
	}

	/**
	 * Updates the students share name to other students preference.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function shareName(Request $request)
	{
		$student = Auth::user()->student;
		$student->share_name = isset($request->share_name);
		$student->save();

		parent::logInfo(__METHOD__, "Changed share name value", ["value" => isset($request->share_name)]);

		return response()->json(array('share_name' => $student->share_name));
	}

	/**
	 * The student propose a project view (Form).
	 *
	 * @return \Illuminate\View\View|\Illuminate\Http\Response
	 */
	public function proposeProjectView()
	{
		$supervisors = Supervisor::getAllSupervisorsQuery()
			->where("take_students_" . get_el_short_name(), true)
			->get();

		if (Auth::user()->student->project_status == "none")
		{
			return view("students.propose-project")->with('supervisors', $supervisors);
		}
		else
		{
			session()->flash('message_type', 'error');
			session()->flash('message', 'You already have a project selected.');
			return redirect()->action('HomeController@index');
		}
	}

	/**
	 * Adds student proposed project to the database.
	 *
	 *
	 * @param  ProjectForm                 $request Student proposed project
	 * @return \Illuminate\Http\Response
	 */
	public function proposeProject(ProjectForm $request)
	{

		$student = Auth::user()->student;
		$result = DB::transaction(function () use ($request, $student)
		{
			$project = new Project();
			$projectController = new ProjectController();
			$newlineFixedDescription = nl2br(request('description'));
			$clean_html = Purify::clean($newlineFixedDescription, $this->htmlPurifyConfig);

			$transaction = new Transaction();
			$supervisor = Supervisor::findOrFail(request('supervisor_id'));

			if (Mode::getProjectSelectionDate()->gt(Carbon::now()))
			{
				session()->flash('message', 'You are not allowed to propose a project until ' . Mode::getProjectSelectionDate(true) . '.');
				session()->flash('message_type', 'error');
				return false;
			}

			if ($student->project_status != 'none' || $student->project_id != null)
			{
				session()->flash('message', 'You have already selected a project.');
				session()->flash('message_type', 'error');
				return false;
			}

			if (!$supervisor->user->isSupervisor())
			{
				session()->flash('message', 'Sorry, you\'re not allowed to propose a project to this supervisor.');
				session()->flash('message_type', 'error');
				return false;
			}

			if (!$supervisor->getTakingStudents())
			{
				session()->flash('message', 'Sorry, this supervisor is no longer accepting students.');
				session()->flash('message_type', 'error');
				return false;
			}

			$project->supervisor_id = request('supervisor_id');
			$project->student_id = Auth::user()->student->id;

			$project->fill(array(
				'title'       => request('title'),
				'description' => $clean_html,
				'status'      => "student-proposed",
				'skills'      => request('skills'),
			));

			$project->save();

			$transaction->fill(array(
				'type'             => 'project',
				'action'           => 'proposed',
				'project'          => $project->id,
				'student'          => Auth::user()->student->id,
				'supervisor'       => $supervisor->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();

			$student->project_id = $project->id;
			$student->project_status = 'proposed';

			$student->save();

			session()->flash('message', 'You have proposed "' . $project->title . '" to ' . $supervisor->user->getFullName());
			session()->flash('message_type', 'success');

			parent::logInfo(__METHOD__, "Proposed a new project", ["project" => $project->id]);

			return true;
		});

		// Send student proposed email
		if ($result)
		{

			if ($student->project->supervisor->getAcceptingEmails())
			{
				try
				{
					// Send accepted email
					Mail::to($student->project->supervisor->user->email)
						->send(new StudentProposed($student->project->supervisor, Auth::user()->student));
				}
				catch (Exception $e)
				{
				}
			}
		}

		return redirect()->action('HomeController@index');
	}

	/**
	 * The student propose a project view (Form).
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function proposeExistingProjectView(Project $project)
	{
		$supervisors = Supervisor::getAllSupervisorsQuery()
			->where("take_students_" . get_el_short_name(), true)
			->get();

		if (Auth::user()->student->project_status == "none")
		{
			return view("students.propose-existing-project")->with('project', $project)->with('supervisors', $supervisors);
		}
		else
		{
			session()->flash('message_type', 'error');
			session()->flash('message', 'You already have a project selected.');
			return redirect()->action('HomeController@index');
		}
	}

	/**
	 * Adds student proposed project to the database.
	 *
	 *
	 * @param  Request|ProjectForm         $request Student proposed project
	 * @return \Illuminate\Http\Response
	 */
	public function proposeExistingProject(Request $request)
	{
		$request->validate([
			'project_id'    => 'required',
			'supervisor_id' => 'required',
		]);

		$student = Auth::user()->student;
		$result = DB::transaction(function () use ($request, $student)
		{
			$project = Project::findOrFail(request('project_id'));
			$supervisor = Supervisor::findOrFail(request('supervisor_id'));
			$transaction = new Transaction();

			if (Mode::getProjectSelectionDate()->gt(Carbon::now()))
			{
				session()->flash('message', 'You are not allowed to propose a project until ' . Mode::getProjectSelectionDate(true) . '.');
				session()->flash('message_type', 'error');
				return false;
			}

			if ($student->project_status != 'none' || $student->project_id != null)
			{
				session()->flash('message', 'You have already selected a project.');
				session()->flash('message_type', 'error');
				return false;
			}

			if (!$supervisor->user->isSupervisor())
			{
				session()->flash('message', 'Sorry, you\'re not allowed to propose a project to this supervisor.');
				session()->flash('message_type', 'error');
				return false;
			}

			if ($project->supervisor_id != null)
			{
				session()->flash('message', 'You have already proposed this project to someone.');
				session()->flash('message_type', 'error');
				return false;
			}

			if ($project->status != 'student-proposed')
			{
				session()->flash('message', 'This project is not a student proposed project.');
				session()->flash('message_type', 'error');
				return false;
			}

			if (!$supervisor->getTakingStudents())
			{
				session()->flash('message', 'Sorry, this supervisor is no longer accepting students.');
				session()->flash('message_type', 'error');
				return false;
			}

			if (!$project->isOwnedByUser())
			{
				session()->flash('message', 'This project does not belong to you.');
				session()->flash('message_type', 'error');
				return false;
			}

			$project->supervisor_id = $supervisor->id;

			$transaction->fill(array(
				'type'             => 'project',
				'action'           => 'proposed',
				'project'          => $project->id,
				'student'          => Auth::user()->student->id,
				'supervisor'       => $supervisor->id,
				'transaction_date' => new Carbon(),
			));

			$project->save();
			$transaction->save();

			$student->project_id = $project->id;
			$student->project_status = 'proposed';

			$student->save();

			parent::logInfo(__METHOD__, "Proposed an existing project", ["project" => $project]);

			session()->flash('message', 'You have proposed "' . $project->title . '" to ' . $supervisor->user->getFullName());
			session()->flash('message_type', 'success');
			return true;
		});

		if ($result)
		{
			// Send student proposed email
			if ($student->project->supervisor->getAcceptingEmails())
			{
				try
				{
					// Send accepted email
					Mail::to($student->project->supervisor->user->email)
						->send(new StudentProposed($student->project->supervisor, Auth::user()->student));
				}
				catch (Exception $e)
				{
				}
			}
		}

		return redirect()->action('HomeController@index');
	}

	/**
	 * Selects the requested project.
	 * If successful, the student will now have to wait to be approved or rejected.
	 *
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response Home page
	 */
	public function selectProject(Request $request)
	{
		$request->validate([
			'project_id' => 'required',
		]);

		$student = Auth::user()->student;
		$project = Project::findOrFail(request('project_id'));

		$result = DB::transaction(function () use ($request, $student, $project)
		{
			if (Mode::getProjectSelectionDate()->gt(Carbon::now()))
			{
				session()->flash('message', 'You are not allowed to select a project until ' . Mode::getProjectSelectionDate(true) . '.');
				session()->flash('message_type', 'error');
				return false;
			}

			if ($student->project_status != 'none' || $student->project_id != null)
			{
				session()->flash('message', 'You have already selected a project.');
				session()->flash('message_type', 'error');
				return false;
			}

			if ($project->status != "on-offer")
			{
				session()->flash('message', 'Sorry, this project is no longer on offer.');
				session()->flash('message_type', 'error');
				return false;
			}

			if (!$project->supervisor->user->isSupervisor())
			{
				session()->flash('message', 'Sorry, you\'re not allowed to propose a project to this supervisor.');
				session()->flash('message_type', 'error');
				return false;
			}

			if (!$project->supervisor->getTakingStudents())
			{
				session()->flash('message', 'Sorry, this supervisor is no longer accepting students.');
				session()->flash('message_type', 'error');
				return false;
			}

			$transaction = new Transaction();

			$student->project_id = $project->id;
			$student->project_status = 'selected';
			$student->save();

			$transaction->fill(array(
				'type'             => 'project',
				'action'           => 'selected',
				'project'          => request('project_id'),
				'student'          => Auth::user()->student->id,
				'supervisor'       => $project->supervisor->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();


			session()->flash('message', 'You have selected "' . $project->title . '".');
			session()->flash('message_type', 'success');

			return true;
		});

		if ($result)
		{
			parent::logInfo(__METHOD__, "Selected a project", ["project" => $project->id]);

			if ($student->project->supervisor->getAcceptingEmails())
			{
				try
				{
					// Send selected email
					if ($student->project->supervisor->getAcceptingEmails())
					{
						Mail::to($student->project->supervisor->user->email)
							->send(new StudentSelected($student->project->supervisor, Auth::user()->student));
					}
				}
				catch (Exception $e)
				{
				}
			}
		}

		return redirect()->action('HomeController@index');
	}

	/**
	 * Undoes a selected project.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response JSON
	 */
	public function undoSelectedProject()
	{
		if (Auth::user()->student->project == null || Auth::user()->student->project_status == 'none')
		{
			return response()->json(array(
				'error'   => true,
				'message' => "You currently have no project selected.",
			));
		}

		if (Auth::user()->student->project_status == 'accepted')
		{
			return response()->json(array(
				'error'   => true,
				'message' => "You have already been accepted for this project.",
			));
		}

		$student = Auth::user()->student;
		$projectId = Auth::user()->student->project_id;

		DB::transaction(function () use ($student, $projectId)
		{
			$transaction = new Transaction();
			$transaction->fill(array(
				'type'             => 'student',
				'action'           => 'undo',
				'project'          => $student->project->id,
				'student'          => $student->id,
				'supervisor'       => $student->project->supervisor->id,
				'transaction_date' => new Carbon(),
			));
			$transaction->save();

			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();

			if ($student->project->status == "student-proposed")
			{
				$student->project->supervisor_id = null;
			}

			$student->project->save();
		});

		parent::logInfo(__METHOD__, "Un-selected a project");

		if ($student->project->supervisor->getAcceptingEmails())
		{
			try
			{
				// Send selected email
				if ($student->project->supervisor->getAcceptingEmails())
				{
					Mail::to($student->project->supervisor->user->email)
						->send(new StudentUnselected($student->project->supervisor, $student, $projectId));
				}
			}
			catch (Exception $e)
			{
			}
		}

		return response()->json(array(
			'successful' => true,
			'message'    => "You have un-selected a project.",
		));
	}

	/**
	 * The import students view.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function importStudentsView()
	{
		return view('admin.import');
	}

	/**
	 * Import students to the production or test database.
	 *
	 *
	 * @param  Request                     $request
	 * @return \Illuminate\Http\Response
	 */
	public function importStudents(Request $request)
	{
		$request->validate(['studentFile' => 'required']);

		if (strtolower($request->file('studentFile')->getClientOriginalExtension()) != "csv")
		{
			return response()->json(array(
				'successful' => false,
				'message'    => 'Invalid file format. Please upload a CSV file.',
			));
		}

		if (mb_detect_encoding($request->file('studentFile'), 'UTF-8', true) != 'UTF-8')
		{
			return response()->json(array(
				'successful' => false,
				'message'    => 'Invalid file encoding (Must be UTF-8).',
			));
		}

		if ($request->file('studentFile')->isValid())
		{
			$userUpload = $request->file('studentFile');
			$userTable = (new User())->getTable();
			$studentTable = (new Student())->getTable();

			$students = Student::select($studentTable . '.*')
				->join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
				->get();

			// Move uploaded file to temp dir
			$file = file($userUpload->getRealPath());

			// Map CSV data into array
			$csv = array_map('str_getcsv', $file);

			if ($request->query('test') == 1)
			{
				parent::logInfo(__METHOD__, "Test Student import started");

				return $this->testImportStudents($csv);
			}
			else
			{
				// Import to prod tables
				parent::logInfo(__METHOD__, "Real Student import started");

				// EMPTY STUDENTS
				if (isset($request->empty_students))
				{
					parent::logInfo(__METHOD__, "Emptying Students via Student import");

					$studentsToDelete = Student::all();

					foreach ($studentsToDelete as $student)
					{
						User::destroy($student->id);
					}
				}

				// EMPTY PROGRAMMES
				if (isset($request->empty_programmes))
				{
					parent::logInfo(__METHOD__, "Emptying Programmes via Student import");

					$userTable = new User();

					DB::beginTransaction();

					try
					{
						DB::table($userTable->getTable())->update(array('programme' => null));
						DB::statement("SET foreign_key_checks=0");
						Programme::truncate();
						DB::statement("SET foreign_key_checks=1");

						DB::commit();
					}
					catch (\Illuminate\Database\QueryException $e)
					{
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message'    => 'Error with emptying programmes. Query Exception: ' . $e,
						));
					}
					catch (Exception $e)
					{
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message'    => 'Error with emptying programmes. General Exception: ' . $e,
						));
					}
					catch (Throwable $e)
					{
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message'    => 'Error with emptying programmes. Throwable Exception: ' . $e,
						));
					}
				}

				// AUTO PROGRAMMES
				if (isset($request->auto_programmes))
				{
					parent::logInfo(__METHOD__, "Importing Programmes via Student import");

					DB::beginTransaction();

					try
					{
						// Remove CSV header and tail
						for ($i = 1; $i < count($csv); $i++)
						{
							unset($studentProgramme, $autoProgramme);

							if ($csv[$i][3] == null)
							{
								throw new Exception("Student at row:" . $i . " has an invalid programme.");
							}
							$studentProgramme = $csv[$i][3];
							$studentProgramme = trim($studentProgramme);

							if (Programme::where('name', $studentProgramme)->first() == null)
							{
								$autoProgramme = new Programme();
								$autoProgramme->name = $studentProgramme;
								$autoProgramme->save();
							}
						}

						DB::commit();
					}
					catch (\Illuminate\Database\QueryException $e)
					{
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message'    => 'Query Exception: ' . $e,
						));
					}
					catch (Exception $e)
					{
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message'    => 'General Exception: ' . $e,
						));
					}
					catch (Throwable $e)
					{
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message'    => 'Throwable Exception: ' . $e,
						));
					}
				}

				$importedStudentIds = [];

				// ACTUALLY IMPORT STUDENTS
				DB::beginTransaction();
				try
				{
					// Remove CSV header and tail
					for ($i = 1; $i < count($csv); $i++)
					{
						unset($user, $student, $studentProgramme, $studentProgrammeModel);

						if ($csv[$i][0] == null)
						{
							return response()->json(array(
								'successful' => false,
								'message'    => "Student at row:" . $i . " has an invalid candidate number.",
							));
						}

						if ((!isset($request->ignore_duplicate_entries) && !isset($request->update_duplicate_entries)) && $students->where('registration_number', $csv[$i][0])->first() != null)
						{
							return response()->json(array(
								'successful' => false,
								'message'    => "Student at row:" . $i . ". The Candidate Number \"" . $csv[$i][0] . "\" is already in use.",
							));
						}

						if ($csv[$i][1] == null)
						{
							return response()->json(array(
								'successful' => false,
								'message'    => "Student at row:" . $i . " has an invalid last name.",
							));
						}

						if ($csv[$i][2] == null)
						{
							return response()->json(array(
								'successful' => false,
								'message'    => "Student at row:" . $i . " has an invalid first name.",
							));
						}

						if ($csv[$i][3] == null)
						{
							return response()->json(array(
								'successful' => false,
								'message'    => "Student at row:" . $i . " has an invalid programme.",
							));
						}

						if ($csv[$i][4] == null)
						{
							return response()->json(array(
								'successful' => false,
								'message'    => "Student at row:" . $i . " has an invalid username.",
							));
						}

						if ((!isset($request->ignore_duplicate_entries) && !isset($request->update_duplicate_entries)) && User::where('username', $csv[$i][4])->first() != null)
						{
							return response()->json(array(
								'successful' => false,
								'message'    => "Student at row:" . $i . ". The username \"" . $csv[$i][4] . "\" is already in use.",
							));
						}

						$user = new User();
						$student = new Student();
						$studentProgramme = $csv[$i][3];
						$studentProgrammeModel = Programme::where('name', $studentProgramme)->first();

						if (empty($studentProgrammeModel))
						{
							throw new Exception("There was a problem at row:" . $i . ". The programme name \"" . $studentProgrammeModel . "\" could not be imported.");
						}

						// Check to see if student already exists
						$existingStudent = $students->where('registration_number', $csv[$i][0])->first();

						// If student doesn't exist, normal import
						if (empty($existingStudent))
						{
							$user->fill(array(
								'privileges'  => 'student',
								'first_name'  => $csv[$i][2],
								'last_name'   => $csv[$i][1],
								'username'    => $csv[$i][4],
								'programme'   => $studentProgrammeModel->id,
								'email'       => $csv[$i][4] . "@sussex.ac.uk",
								'active_year' => Mode::getProjectYear(),
							));
							$user->save();

							$student->fill(array(
								'id'                  => $user->id,
								'registration_number' => $csv[$i][0],
							));

							$student->save();
						}
						else
						{
							// Student already exists
							// If ignore duplicate it's fine
							if (isset($request->ignore_duplicate_entries))
							{
								continue;
							}
							// If update is selected, update a few properties
							else if (isset($request->update_duplicate_entries))
							{
								$user = $existingStudent->user;

								$user->fill(array(
									'first_name' => $csv[$i][2],
									'last_name'  => $csv[$i][1],
									'username'   => $csv[$i][4],
									'programme'  => $studentProgrammeModel->id,
								));
								$user->save();
							}
							else
							{
								// Should be caught from before
								throw new Exception("Student at row:" . $i . ". The Candidate Number \"" . $csv[$i][0] . "\" is already in use.");
							}
						}

						array_push($importedStudentIds, $user->id);
					}


					DB::commit();
				}
				catch (\Illuminate\Database\QueryException $e)
				{
					DB::rollBack();
					return response()->json(array(
						'successful' => false,
						'message'    => 'Query Exception: ' . $e,
					));
				}
				catch (Exception $e)
				{
					DB::rollBack();
					return response()->json(array(
						'successful' => false,
						'message'    => 'General Exception: ' . $e,
					));
				}
				catch (Throwable $e)
				{
					DB::rollBack();
					return response()->json(array(
						'successful' => false,
						'message'    => 'Throwable Exception: ' . $e,
					));
				}

				$students = Student::getAllStudentsQuery()
					->whereIn('user.id', $importedStudentIds)
					->get();

				$users = User::whereIn('id', $students->pluck('id')->toArray())->get();

				$view = view('admin.partials.import-student-table')
					->with('users', $users)
					->with('students', $students)
					->with('test', false)
					->render();

				return response()->json(array(
					'successful' => true,
					'message'    => $view,
				));
			}
		}

		parent::logInfo(__METHOD__, "Import students finished");

		return response()->json(array(
			'successful' => false,
			'message'    => 'Invalid file.',
		));
	}

	/**
	 * Imports the students to the test database.
	 *
	 *
	 * @param  $csv
	 * @return \Illuminate\Http\Response
	 */
	public function testImportStudents($csv)
	{
		// Empty test tables
		DB::table('test_users')->truncate();
		DB::table('test_students')->truncate();

		// Remove CSV header and tail
		for ($i = 1; $i < count($csv); $i++)
		{
			$id = $i;
			if ($csv[$i][0] == null)
			{
				continue;
			}
			DB::table('test_users')->insert(array(
				'id'         => $id,
				'last_name'  => $csv[$i][1],
				'first_name' => $csv[$i][2],
				'programme'  => $csv[$i][3],
				'username'   => $csv[$i][4],
				'email'      => $csv[$i][4] . "@test.ac.uk",
			));

			DB::table('test_students')->insert(array(
				'id'                  => $id,
				'registration_number' => $csv[$i][0],
			));
		}

		$students = DB::table('test_students')
			->select('*')
			->get();

		$users = DB::table('test_users')
			->whereIn('id', $students->pluck('id')->toArray())
			->get();

		$view = view('admin.partials.import-student-table')
			->with('users', $users)
			->with('students', $students)
			->with('test', true)
			->render();

		return response()->json(array(
			'successful' => true,
			'message'    => $view,
		));
	}

	public static function studentsPendingDecision()
	{
		return Student::getAllStudentsQuery()->where('project_status', 'selected')->count();
	}

	public static function studentsPendingProposedDecision()
	{
		return Student::getAllStudentsQuery()->where('project_status', 'proposed')->count();
	}
}
