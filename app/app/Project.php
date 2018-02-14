<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class Project extends Model{

	use SoftDeletes;
	// use Traits\Uuids;

	protected $table = null;

	public $timestamps = true;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'description', 'skills', 'status', 'author_programme'];

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['supervisor', 'destroy_at', 'deleted_at'];

	/**
	 * The attributes that should are dates.
	 *
	 * @var array
	 */
	protected $dates = ['created_at'. 'updated_at', 'destroy_at', 'deleted_at'];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = ['supervisor', 'created_at', 'updated_at'];
	

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	// public $incrementing = false;


	public function supervisor(){
		return $this->belongsTo(Supervisor::class, 'supervisor_id', 'id');
	}

	// I know statues is not a real word
	public static function getAllStatuses(){
		return ['none', 'student-proposed', 'selected', 'accepted'];
	}

	public function isOwnedByUser(){
		if(Auth::user()->isSupervisor()){
			return $this->supervisor_id === Auth::user()->supervisor->id;
		} elseif(Auth::user()->isStudent()){
			return $this->student_id === Auth::user()->student->id;
		}
	}
}
