<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;

/**
 * The topic model.
 * 
 * @see SussexProjects\Http\Controllers\topicController
*/
class Topic extends Model{
	public $primaryKey = 'id';

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	protected $table = null;

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;
	
	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	public $fillable = ['name'];
}
