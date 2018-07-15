<?php

/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */
namespace SussexProjects\Traits;

use Illuminate\Support\Str;
use Webpatser\Uuid;

trait Uuids{
	/**
	 * Boot function from laravel.
	 */
	protected static function boot(){
		parent::boot();

		static::creating(function($model){
			$model->{$model->getKeyName()} = (string) Uuid::generate(4);;
		});
	}
}