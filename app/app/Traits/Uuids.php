<?php

/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */
namespace SussexProjects\Traits;

use Illuminate\Support\Str;
use Webpatser\Uuid\Uuid;

/**
 * The UUID trait.
 * This replaces the model's ID with a V4 UUID when the model is saved.
 * 
 */
trait Uuids {

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