<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model{
	public $timestamps = false;
	protected $guarded = ['id'];
	protected $dates = ['transaction_date'];

	
}
