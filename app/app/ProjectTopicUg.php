<?php
namespace SussexProjects;

/**
 * The undergraduate project topic model.
 * 
 * @see SussexProjects\Http\Controllers\ProjectTopicController
*/
class ProjectTopicUg extends ProjectTopic{

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	protected $table = 'project_topics_ug';
}