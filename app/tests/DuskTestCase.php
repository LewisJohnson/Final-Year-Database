<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace Tests;

use Laravel\Dusk\TestCase as BaseTestCase;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\DesiredCapabilities;

abstract class DuskTestCase extends BaseTestCase{
	use CreatesApplication;

	/**
	 * Prepare for Dusk test execution.
	 *
	 * @beforeClass
	 * @return void
	 */
	public static function prepare(){
		static::startChromeDriver();
	}

	/**
	 * Create the RemoteWebDriver instance.
	 *
	 * @return \Facebook\WebDriver\Remote\RemoteWebDriver
	 */
	protected function driver(){
		$options = (new ChromeOptions)->addArguments([
			'--disable-gpu',
			'--headless'
		]);

		return RemoteWebDriver::create(
			'http://localhost:9515', DesiredCapabilities::chrome()->setCapability(
				ChromeOptions::CAPABILITY, $options
			)
		);
	}
}