<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model{
	public $timestamps = false;
	public $primaryKey = 'id';
	public $table = null;
	
	public $guarded = ['id'];
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	public $fillable = [
		'name'
	];
}
