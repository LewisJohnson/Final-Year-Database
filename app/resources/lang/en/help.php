<?php

return [

	/*
	|--------------------------------------------------------------------------
	| Help Language Lines
	|--------------------------------------------------------------------------
	|
	| The following language lines are used for the help,
	| information and about pages.
	|
	*/

	'help_tab_1' => 'Log in',
	'help_tab_1_content' => '<p>Once you receive an email from the project convenor, you will be able to log in to the database. If there is a problem logging in, please contact the administrator.</p>',

	/* HELP TAB 2 */
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

	/* HELP TAB 3 */
	'help_tab_3' => 'Student',
	'help_tab_3_content' =>
	'<p>A user logged in with student permissions will have the Student Options menu displayed, this will make the following available: </p>
	<ul>
		<li>Propose a Project gives the student the ability to propose a project to either a specific supervisor or generally to any supervisor.</li>
	 	<li>List all supervisors, their load and what/whom they supervise.</li>
		<li>List all students and what projects they have selected.</li>
		<li>Withdraw and edit a proposed project. The corresponding buttons can be found on the student\'s home page just below the project descritpion.</li>
		<li>Note that a project selected from a specific supervisor\'s list can\'t be withdrawn. In this case the student needs to ask the supervisor to reject the selection to release the student.</li>
	</ul>',

	/* HELP TAB 4 */
	'help_tab_4' => 'Help',
	'help_tab_4_content' =>
	'<p>This menu allows the following options:</p>
	<ul>
		<li>System Help - displays this screen</li>
		<li>General Information - displays the public home page</li>
		<li>About - shows information about the devlopment of the system</li>
	</ul>',

	/* SUPERVISOR HELP TAB */
	'help_tab_supervisor' => 'Supervisor',
	'help_tab_supervisor_content' =>
	'<p>A user logged in with supervisor (or administrator) permissions will have the Supervisor Options menu displayed, this will make the following available: </p>
	<ul>
		<li>Propose a project allows the supervisor to add a new project.</li>
		<li>Add project topic allows the supervisor to create a new category of project topic.</li>
		<li>List all supervisors, their load and what/whom they supervise.</li>
		<li>Browse transactions related to their own projects.</li>
		<li>List all students and what projects they have selected.</li>
		<li>A supervisor or administrator can choose to opt-in or opt-out of emails refering to transcations on their projects.</li>
	</ul>',

	/* ADMIN HELP TAB */
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
		<li>Browse Transactions by Project - examine project transactions. </li>
		<li>Browse Transactions by Time - examine all transactions by date.</li>
		<li>Amend Topics - amend or delete project topics.</li>
		<li>End of Year Archive - archive old data at the end of an academic year.</li>
		<li>Import New Students - Imports an XML file of new students.</li>
		<li>A supervisor or administrator can choose to opt-in or opt-out of emails refering to transcations on their projects.</li>
	</ul>
	<p>Data resetting options are also available whilst the system is under development</p>',

	// About
	'about' => "This software manages project selection and allocation for final year and masters students in the Informatics Department at the University of Sussex.
				<br><br>
				Final year projects are managed by a member of staff, the Project Coordinator, by means of a system that endeavours to match student and supervisor requirements. Supervisors can propose projects that students can accept and, additionally, students can propose their own projects either generally or to a specific supervisor.
				<br><br>
				The current system had not been maintained for several years and was in need of updating. This update took the form of adding new functionality and a general overhaul of both look and feel. The updating of capabilities due to advances in software and browser technologies has also been addressed.
				<br><br>
				As the system runs on the department’s web servers it has been written using available technologies such as PHP and MySQL.
				<br><br>
				It has been produced in 2017/2018 as a final year project by <a href='http://www.lewisdavidjohnson.com'>Lewis Johnson</a> under the supervision of Bernhard Reus.",

];

