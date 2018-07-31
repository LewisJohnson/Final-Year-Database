<?php

/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */
namespace SussexProjects\Traits;

use Illuminate\Support\Str;
use Webpatser\Uuid\Uuid;

/**
 * The UUID trait.
 * If a model is using the UUID trait, 
 * the model's ID will be replaced with a Version 4 UUID
 * when the model is saved.
 * 
 * E.g
 * 
 * $User = new User();
 * $User->save(); (Here the UUID will be injected.);
 * 
 */
trait Uuids{

	/**
	 * Boot function from Laravel (This is used to start to trait when the application starts).
	 * This is used to start to trait when the application starts.
	 */
	protected static function boot(){
		parent::boot();

		static::creating(function($model){
			$model->{$model->getKeyName()} = (string) Uuid::generate(4);;
		});
	}
}