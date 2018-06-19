<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */
use SussexProjects\User;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/


Artisan::command('make:admin', function () {
	$this->error("+++ YOU ARE CREATING A SYSTEM ADMINISTRATOR!!! +++");
	$this->error("+++ This should only be used when first deploying the system. +++");
	$this->line("==================================================================");
	$this->line("PLEASE READ: You only need to create a single system administrator, then you can create every other type of user using the website, including project administrators. There is not a table solely for the system administrator, so the user must be kept in a departments user table (e.g. informatics_users). It does not matter which department you select.");

	$department = $this->choice('Which department would you like the system administrator to be created in?', get_departments(), 0);

	$username = $this->ask('Sussex ITS username? (e.g. br123)');
	$firstName = $this->ask('First name?');
	$lastName = $this->ask('Last name?');

	Session::put('department', $department);
	
	$this->line("Username: {$username}");
	$this->line("First Name: {$firstName}");
	$this->line("Last Name: {$lastName}");

	if ($this->confirm('Is this correct?')) {
		$user = new User;
		$user->fill(array(
			'first_name' => $firstName,
			'last_name' => $lastName,
			'username' => $username,
			'email' => $username."@sussex.ac.uk",
			'privileges' => 'admin_system'
		));
		$user->save();
	}

	Session::flush();
	$this->info("System administrator successfully created, you may now log-in.");
})->describe('Creates a system administrator.');
