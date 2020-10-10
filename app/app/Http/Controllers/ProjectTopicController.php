<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Controllers;

use SussexProjects\ProjectTopic;

/**
 * The project topic controller.
 * Most functions you might expect to find here will be found in ProjectController.
 *
 * @see ProjectController
 */
class ProjectTopicController extends Controller{

	public function __construct(){
		parent::__construct();
		$this->middleware('auth');
	}

	public function index(ProjectTopic $projectTopic){
		return ProjectTopic::findOrFail($projectTopic);
	}
}

