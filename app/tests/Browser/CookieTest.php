<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CookieTest extends DuskTestCase{

	/**
	 * A Dusk test example.
	 *
	 * @return void
	 */
	public function testRequiredCookies()
	{
		$this->browse(function (Browser $browser) {
			$browser->visit('/')
				->assertHasCookie("accessibility-font")
				->assertHasCookie("accessibility-contrast")
				->assertHasCookie("favourite_projects");
		});
	}
}
