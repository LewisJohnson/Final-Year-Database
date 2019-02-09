<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class LoginTest extends DuskTestCase{
	
	/**
	 * Tests log in.
	 *
	 * @return void
	 */
	public function testLogin(){
		$this->browse(function (Browser $browser) {
			$browser->visit('/')
				->click('.department-select form button');

			$browser->visit('/login')
				->type('username', 'testUser')
				->type('password', 'password')
				->press('LOG IN')
				->assertPathIs('/home');
		});
	}


}
