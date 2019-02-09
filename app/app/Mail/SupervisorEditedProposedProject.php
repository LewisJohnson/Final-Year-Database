<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\Project;

/**
 * The email sent to the student when a supervisor edits their proposed project.
 */
class SupervisorEditedProposedProject extends Mailable{
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
	 * @param Supervisor $supervisor
	 * @param Student    $student
	 * @param            $projectId
	 */
	public function __construct(Supervisor $supervisor, Student $student, Project $project){
		$this->supervisor = $supervisor;
		$this->student = $student;
		$this->project = $project;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build(){
		return $this->view('emails.student.changed')->with([
			'supervisor' => $this->supervisor,
			'student' => $this->student,
			'project' => $this->project
		]);
	}
}
