<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model{
	public $timestamps = false;
	protected $primaryKey = 'id';
	protected $table = null;
	protected $guarded = ['id'];
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name'
	];
}
