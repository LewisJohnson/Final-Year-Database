<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\Mail;
use SussexProjects\Mail\StudentSelected;
use SussexProjects\Mail\StudentUnselected;
use SussexProjects\Mail\StudentProposed;
use SussexProjects\Mail\StudentAccepted;
use SussexProjects\Mail\StudentRejected;
use SussexProjects\Supervisor;
use SussexProjects\Project;
use SussexProjects\Student;

class MailableTest extends TestCase{
	use RefreshDatabase;

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
	 * Creates a student, supervisor and email needed for testing.
	 *
	 * @return void
	 */
	public function setUp(){
		parent::setUp();

		// Set up supervisor
		$this->supervisor = factory(Supervisor::class)->make();

		// Set up student
		$this->student = factory(Student::class)->make();

		// Set up project
		$this->project = factory(Project::class)->make([
			'supervisor_id' => $this->supervisor->id,
		]);
	}

	/**
	 * Student selected email test.
	 *
	 * @return void
	 */
	public function testStudentSelected(){
		Mail::fake();

		// POST request to your controller@action
		$response = $this->action('POST', 'StudentController@selectProject', ['project_id' => $this->project->id]);

		// you can check if response was ok
		$this->assertTrue($response->isOk(), "Something went wrong.");


		// Perform order shipping...
		Mail::assertSent(StudentSelected::class, function ($mail) {
			return $mail->order->id === $order->id;
		});

		Mail::to($this->supervisor->user->email)->send(new StudentSelected($this->supervisor, $this->student));

		// Assert a mailable was sent twice...
		Mail::assertSent(StudentSelected::class);

		// Assert a message was sent to supervisor
		Mail::assertSent(StudentSelected::class, function ($mail) use ($user) {
			return $mail->hasTo($this->supervisor->user->email);
		});

		// Assert the rest of the mailables was not sent
		Mail::assertNotSent(StudentUnselected::class);
		Mail::assertNotSent(StudentProposed::class);
		Mail::assertNotSent(StudentAccepted::class);
		Mail::assertNotSent(StudentRejected::class);
	}
}
