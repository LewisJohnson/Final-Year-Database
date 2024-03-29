<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\Supervisor;

/**
 * The email sent to the student when they are rejected.
 */
class StudentRejected extends Mailable
{
	use Queueable, SerializesModels;

	/**
	 * The student instance.
	 *
	 * @var Supervisor
	 */
	public $supervisor;

	/**
	 * The supervisor instance.
	 *
	 * @var Student
	 */
	public $student;

	/**
	 * The supervisor instance.
	 *
	 * @var Project
	 */
	public $project;

	/**
	 * Create a new message instance.
	 *
	 * @param Supervisor   $supervisor
	 * @param Student      $student
	 * @param $projectId
	 */
	public function __construct(Supervisor $supervisor, Student $student, $projectId)
	{
		$this->supervisor = $supervisor;
		$this->student = $student;
		$this->project = Project::findOrFail($projectId);
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->view('emails.student.rejected')->with([
			'supervisor' => $this->supervisor,
			'student'    => $this->student,
			'project'    => $this->project,
		]);
	}
}
