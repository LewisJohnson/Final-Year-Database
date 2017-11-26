<?php

namespace SussexInformaticsProjects;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
	public $timestamps = false;
	protected $table = null;
	protected $primaryKey = 'id';
	protected $guarded = ['id'];
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name'
	];

	public function getRouteKeyName(){
		return 'name';
	}
}
