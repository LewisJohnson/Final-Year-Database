/*
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */


/*
|--------------------------------------------------------------------------
| CONFIGURATION
|--------------------------------------------------------------------------
|
| An object literal of settings used through the JavaScript.
|
*/

"use strict";

var config = {
	// Animations
	animtions: {
		slow: 400,
		medium: 300,
		fast: 200,
		superFast: 100,
	},

	// The width mobile view should kick in (Make sure is corresponds to SCSS)
	mobileWidth: 720,

	// Show help footer in help pages
	showHelpFooter: true,

	// Ohhh... Fancy (Entrance animations)
	fancyAnimations: true,

	// Y-offset to show scroll to top button
	showScrollToTopButtonOffset: 50,

	// How long should scroll to top take
	scrollToTopDuration: 600,

	// The red banner "Something went wrong with that request"
	// Unless you implement a custom request fail for-each AJAX request, leave this as true
	showAjaxRequestFailNotification: true,

	// How long should a user have to hold to show project preview
	// Used on "on-offer" project page
	// In milliseconds
	tapHeldTime: 500,

	ajaxBaseUrl: "https://www.informatics.sussex.ac.uk/courses/Final-Year-Database/app/public/"
}

// Make config available to all files
window["config"] = config;