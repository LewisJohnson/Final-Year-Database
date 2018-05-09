<?php
namespace SussexProjects\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use SussexProjects\Student;
use SussexProjects\Supervisor;

class StudentUnselected extends Mailable{
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
	 * @return void
	 */
	public function __construct(Supervisor $supervisor, Student $student){
		$this->supervisor = $supervisor;
		$this->student = $student;
		$this->project = $this->student->project;
	}
	

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build(){
		return $this->view('emails.supervisor.student-unselected')
			->with([
				'supervisor' => $this->supervisor,
				'student' => $this->student,
				'project' => $this->project
			]);;
	}
}