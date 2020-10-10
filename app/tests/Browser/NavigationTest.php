<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class NavigationTest extends DuskTestCase
{

	/**
	 * A Dusk test example.
	 *
	 * @return void
	 */
	public function testDesktopNavigation()
	{
		$this->browse(function (Browser $browser)
		{

			$broswer->loginAs(User::find('admin'))
			        ->visit('/home');

			$browser->assertSee('Home');
			$browser->assertSee('Browse');
			$browser->assertSee('Student');
			$browser->assertSee('Help');

			$browser->hover('nav.desktop li.nav-button.dropdown:nth-child(1n)')
			        ->assertSee('Projects')
			        ->assertSee('Projects by Supervisor')
			        ->assertSee('Projects by Topics');

			$browser->hover('nav.desktop li.nav-button.dropdown:nth-child(3n)')
			        ->assertSee('Propose Project')
			        ->assertSee('Report by Supervisor');

			$browser->hover('nav.desktop li.nav-button.dropdown:nth-child(4n)')
			        ->assertSee('System Help')
			        ->assertSee('About')
			        ->assertSee('Links');
		});
	}
}
