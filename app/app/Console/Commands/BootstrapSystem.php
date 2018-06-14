<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Console\Commands;

use Illuminate\Console\Command;

class BootstrapSystem extends Command{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'bootstrap:system';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Creates a system admin in each department to bootstrap the system.';

	/**
	 * Create a new command instance.
	 */
	public function __construct(){
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function handle(){
		//todo: this
		// https://laravel.com/docs/5.6/artisan#writing-commands
		return true;
	}
}
