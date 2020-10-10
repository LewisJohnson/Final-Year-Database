<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class DepartmentTest extends DuskTestCase
{

	/**
	 * A Dusk test example.
	 *
	 * @return void
	 */
	public function testDepartment()
	{
		$this->browse(function (Browser $browser)
		{
			$browser->visit('/')
			        ->click('.department-select form button')
			        ->assertSee('LOGIN');
		});
	}
}
