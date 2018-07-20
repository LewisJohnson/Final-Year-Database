<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

return [

	/*
	|--------------------------------------------------------------------------
	| Help Language Lines
	|--------------------------------------------------------------------------
	|
	| The following language lines are used for the help,
	| information and about pages.
	|
	| 1. Supervisor Help
	| 2. Administrator Help
	| 3. About Page
	| 4. Help Tabs
	*/

	/* 1. SUPERVISOR HELP TAB */
	'help_tab_supervisor' => 'Supervisor',
	'help_tab_supervisor_content' =>
	'<p>A user logged in with supervisor (or administrator) permissions will have the Supervisor Options menu displayed,this will make the following available: </p>
	<ul>
		<li>Propose a project allows the supervisor to add a new project.</li>
		<li>Add project topic allows the supervisor to create a new category of project topic.</li>
		<li>List all supervisors, their load and what/whom they supervise.</li>
		<li>Browse transactions related to their own projects.</li>
		<li>List all students and what projects they have selected.</li>
		<li>A supervisor or administrator can choose to opt-in or opt-out of emails referring to transactions on their projects.</li>
	</ul>',

	/* 2. ADMIN HELP TAB */
	'help_tab_admin' => 'Administrator',
	'help_tab_admin_content' =>
	'<p>A user logged in with administrator permissions will have the Administrator Options menu displayed, this will make the following available: </p>
	<ul>
		<li>Summary Report Students - A report showing which students have selected which projects giving the administrator the ability to email groups.</li>
		<li>Summary Report Supervisors - A report showing which students are allocated to which supervisors, links can be removed.</li>
		<li>Log in as Different User - A method for administrator to perform tasks for other users.</li>
		<li>Amend Supervisor Arrangements - The ability to change limits and preferences for supervisors.</li>
		<li>Overall Parameters - The selection of year and earliest dates.</li>
		<li>Add User - The ability to manually add a new student or supervisor.</li>
		<li>Edit User Details - Manually change a users\' details.</li>
		<li>Browse Transactions - examine all transactions by date.</li>
		<li>Amend Topics - amend or delete project topics.</li>
		<li>End of Year Archive - archive old data at the end of an academic year.</li>
		<li>Import New Students - Imports an XML file of new students.</li>
		<li>A supervisor or administrator can choose to opt-in or opt-out of emails referring to transactions on their projects.</li>
	</ul>
	<p>Data resetting options are also available whilst the system is under development</p>',

	/* 3. ABOUT PAGE */
	'about' =>
		'This software manages project selection and allocation for final year and masters students at the University of Sussex. 
		<br><br>
		Final year and masters projects are managed by a member of staff, the Project Coordinator, by means of a system that endeavours to match student and supervisor requirements. Supervisors can propose projects that students can accept and, additionally, students can propose their own projects either generally or to a specific supervisor. 
		<br><br>
		The current system had not been maintained for several years and needed updating. This update took the form of adding new functionality and a general overhaul of both look and feel. The updating of capabilities due to advances in software and browser technologies has also been addressed. 
		<br><br>
		This website is hosted by the department of Engineering and Informatics. It was written using Laravel, MySQL and other technologies. The source code is available <a href="https://github.com/lewisJohnson/Final-Year-Database">on Github.</a> 
		<br><br>
		This website was created in 2017/2018 as a final year project by <a href="http://www.lewisdavidjohnson.com">Lewis Johnson</a> under the supervision of <a href="mailto:bernhard@sussex.ac.uk">Dr. Bernhard Reus.</a>',
	/*
	| 4. Help Tabs
	| You may add up to 20 help tabs.
	| Help pages 2-20 are optional.
	| Admin and supervisor help tabs do not count towards the 20 limit.
	|
	| WARNING: The help page will break without help_tab_1 and help_tab_1_content strings.
	| WARNING: The content strings are parsed as HTML, do not use <script> tags.
	*/

	// HELP TAB 1 *REQUIRED*
	'help_tab_1' => 'Log in',
	'help_tab_1_content' => '<p>Once you receive an email from the project conveyor, you will be able to log in to the database.
	If there is a problem logging in, please contact the administrator.</p>',

	// HELP TAB 2
	'help_tab_2' => 'Browse',
	'help_tab_2_content' =>
	'<p>When logged in, you can browse existing and historic projects:</p>
	<ul>
		<li>An active user (student/supervisor/administrator) can browse current projects.</li>
		<li>An active user (student/supervisor/administrator) can browse projects by supervisor.</li>
		<li>An active user (student/supervisor/administrator) can search by keyword or project topic.</li>
		<li>A supervisor (or administrator) user can additionally browse their own projects.</li>
		<li>A supervisor (or administrator) user can also browse by status of projects and create new projects by making a copy of old ones.</li>
	</ul>',

	// HELP TAB 3
	'help_tab_3' => 'Student',
	'help_tab_3_content' =>
	'<p>A user logged in with student permissions will have the Student Options menu displayed, this will make the following available: </p>
	<ul>
		<li>Propose a Project gives the student the ability to propose a project to either a specific supervisor or generally to any supervisor.</li>
	 	<li>List all supervisors, their load and what/whom they supervise.</li>
		<li>List all students and what projects they have selected.</li>
		<li>Withdraw and edit a proposed project. The corresponding buttons can be found on the student\'s home page just below the project description.</li>
		<li>Note that a project selected from a specific supervisor\'s list can\'t be withdrawn. In this case the student needs to ask the supervisor to reject the selection to release the student.</li>
	</ul>',

	// HELP TAB 4
	'help_tab_4' => 'Help',
	'help_tab_4_content' =>
	'<p>This menu allows the following options:</p>
	<ul>
		<li>System Help - displays this screen</li>
		<li>General Information - displays the public home page</li>
		<li>About - shows information about the development of the system</li>
	</ul>',

	// HELP TAB 4
	'help_tab_4' => 'Cookies',
	'help_tab_4_content' =>
	'
	<p>To make this site work properly, we sometimes place small data files called cookies on your device. Most big websites do this too.</p>

	<h3>What are cookies?</h3>
	<p>A cookie is a small text file that a website saves on your computer or mobile device when you visit the site.
	It enables the website to remember your actions and preferences (such as login, font size and other display preferences) over a period of time,
	so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>

	<h3>How do we use cookies?</h3>

	<table class="data-table">
		<thead>
			<tr>
				<th>Category</th>
				<th>Name</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Accessibility</td>
				<td>highContrast</td>
				<td>Determines if high contrast is enabled</td>
			</tr>
			<tr>
				<td>Accessibility</td>
				<td>largeFont</td>
				<td>Determines if large font is enabled.</td>
			</tr>
			<tr>
				<td>Security</td>
				<td>XSRF-TOKEN</td>
				<td>This cookie helps prevent malicious activity.</td>
			</tr>
			<tr>
				<td>Security</td>
				<td>[APP_NAME]_session</td>
				<td>Your unique session identifier.</td>
			</tr>
			<tr>
				<td>Analytics</td>
				<td>vb</td>
				<td>Determines if you have visited before.</td>
			</tr>
			<tr>
				<td>Analytics</td>
				<td>seen-cookie-banner</td>
				<td>Determines if you have acknowledged the cookie banner.</td>
			</tr>
			<tr>
				<td>Usability</td>
				<td>favourite_projects</td>
				<td><b>Students only</b> - A list of your favourite projects.</td>
			</tr>
			<tr>
				<td>Usability</td>
				<td>hide-accepted</td>
				<td><b>Supervisors only</b> - Determines if the tab "Accepted Students" supervisor tab is hidden.</td>
			</tr>
			<tr>
				<td>Usability</td>
				<td>hide-offers</td>
				<td><b>Supervisors only</b> - Determines if the tab "Offers" supervisor tab is hidden.</td>
			</tr>
			<tr>
				<td>Usability</td>
				<td>hide-projects</td>
				<td><b>Supervisors only</b> - Determines if the tab "Projects" supervisor tab is hidden.</td>
			</tr>
		</tbody>
	</table>

	<h3>Session Storage</h3>
	<p>Session storage is a way of storing information on your device for a short amount of time.
	These little tokens will be cleared as soon as you close your browser.
	If your browser does not support session storage, we will store these values as cookies instead.</p>

	<table class="data-table">
		<thead>
			<tr>
				<th>Category</th>
				<th>Name</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Usability</td>
				<td>rwc-[TYPE]</td>
				<td>Used to remember your form values, so you don\'t have to.</td>
			</tr>
			<tr>
				<td>Usability</td>
				<td>cht</td>
				<td>The current tab selected in the help page.</td>
			</tr>
			<tr>
				<td>Usability</td>
				<td>cadt</td>
				<td><b>System administrators only</b> - The current tab selected in the administrator dashboard.</td>
			</tr>
		</tbody>
	</table>
	',
];
