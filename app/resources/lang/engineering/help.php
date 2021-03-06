<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
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
	| 2. System administrator Help
	| 3. Project administrator Help
	| 4. Student Help
	| 5. About Page
	| 6. Help Tabs
	*/

	/* 1. SUPERVISOR HELP TAB */
	'help_tab_supervisor' => 'Supervisor',
	'help_tab_supervisor_content' =>
		'<p>You are a supervisor, this will make the following pages available to you: </p>

		<h5>Homepage</h5>
		<ul>
			<li>
				<b>Options</b><br>
				Here you can change whether or not you receive email notifications.
			</li>

			<li>
				<b>Pending Decisions</b><br>
				A list of all your pending decisions, the subtitle includes your current project load.<br>
				It is also the page where you can accept or reject interested students.
				You may also undo accepted students, which will remove them from your accepted students, and they will have to find a new project.<br>
				
				<span class="text-primary"><b>3</b></span> - The blue number indicates how many decisions you have left to make.
			</li>

			<li>
				<b>Accepted Students</b><br>
				A list of all the students you have accepted this year.
				You can see the student\'s name, the project title and, if assigned, the project\'s second marker.<br>

				<span class="text-primary"><b>5</b></span> - The blue number indicates how many students you have accepted.

				<br>

				<small>
					NOTE: You may ask a project administrator to "undo" an accepted student.
					This will remove the student from your accepted students, and they will have to find a new project.
				</small>
			</li>

			<li>
				<b>Second Marker Projects</b><br>
				A list of project you are second marker to this year.
				These project are assigned to you by the project administrator.
				Depending on the date (Defined by the administrator), you may see a button labelled "Evaluation".
				Pressing this button will take you to the evaluation of project.	
			</li>

			<li>
				<b>[Education Level] Supervisor Overview</b><br>
				A quick overview of your supervisor values, such as project load and accepted student count. 
			</li>
		</ul>

		<h5>Projects</h5>
		<ul>
			<li>
				<b>My [Education Level] Projects</b><br>
				<span class="sub-help">Supervisor > My Projects</span><br>

				Displays all the projects you have created.
				From here you can click on a project title, which leads you to the project page. (Here you can edit, add topics or delete your project).
				For your convenience, the projects are colour coded;<br>

				Accepted - <span class="text-success">Green</span><br>
				Withdrawn - <span class="text-warning">Yellow</span><br>
				Archived - <span class="text-danger">Red</span><br><br>

				<small>
					NOTE: There is a toggle at the top of the page for you to hide or show your archived projects.
				</small>
			</li>

			<li>
				<b>View Project</b><br>
				If the project you are viewing a project which belongs to you, you will see additional options at the bottom on the page.
				The additional options depend on the project\'s status.<br><br>

				Accepted - Edit<br>
				Withdrawn - Edit / Delete<br>
				Archived - Copy<br><br>

				<b>Edit</b> allows you to edit the project and add new topics.<br>
				<b>Delete</b> allows you to permanently delete a project.<br>
				<b>Copy</b> will create a new copy of the project for you to reuse for the next year.
			</li>

			<li>
				<b>New Project</b><br>
				<span class="sub-help">Supervisor > New Project</span><br>

				Allows you to create a new project.<br>
			</li>

			<li>
				<b>Edit Project</b><br>
				While editing a project you can change the title, description, skills and topics.<br><br>

				<b class="text-muted">Topics</b><br>
				New topics can be added to a project by typing the topic name into the "Topics" input, followed by the COMMA key.
				A topic can be removed from the project by clicking the "X" next to the topic name.<br>
				The order of the topics can be changed by dragging a topic, you should see a "grabbing" hand. This is a desktop only feature.<br>
				The golden topic (first in the list of topics) is called the "Primary topic", this is the topic displayed when people are browsing through projects.<br><br>

				<b class="text-muted">Status</b><br>
				While editing a project you can switch the project\'s to either On-offer or Archived.
				You may not edit the status if the project has been accepted or is archived.<br><br>

				On-offer - Available for everyone to see and students to select<br>
				Withdrawn - Hidden from students and can not be selected<br>

			</li>
		</ul>

		<h5>Project Evaluation</h5>
		<p>There are 2 types of participants for a project evaluation. A Supervisor, and a second marker. Depending on your role, you will have different actions available to you.</p>
		<ul>
			<li>
				<b>Submission & Groups</b><br>
				Questions are split into alphabetical groups.
				Once you have submitted a group, you will be able to see the other participants marks and comments.
				You must fill out every question and write a comment to submit a group.
			</li>

			<li>
				<b>Finalise</b><br>
				Once both participants have completed all groups of project evaluation, the supervisor will be able to finalise the evaluation.
				Once an evaluation has been finalised, neither participant will be able to edit their marks or comments.<br><br>

				There is a chance the marks will straddle a threshold or have a large difference in percentage.
				If this is the case, the finalise modal will explain which threshold/percentage you have passed,
				and you will have to fill in a joint report. 
			</li>
		</ul>

		<h5>Reports</h5>
		<ul>
			<li>
				<b>Supervisor Report</b><br>
				<span class="sub-help">Supervisor > Reports > Supervisor Report</span><br>

				A list of all supervisors, their projects, their project load and what/whom they supervise.<br>

				<small>
					NOTE: There is a toggle at the top of the page for you to hide or show supervisors closed to projects.
				</small>
			</li>

			<li>
				<b>Project Popularity</b><br>
				<span class="sub-help">Supervisor > Reports > Project Popularity</span><br>

				This page shows <i>upto</i> your 10 most popular projects and how many views they have.
			</li>
		</ul>
		',

	/* 2. SYSTEM ADMIN HELP TAB */
	'help_tab_system_admin' => 'System Administrator',
	'help_tab_system_admin_content' =>
		'<p>A user logged in with administrator permissions will have the Administrator Options menu displayed, this will make the following available: </p>
		<ul>
			<li><b>System Dashboard</b><br>
				Here you can configure parameters for the system. Please note, each department has a separate configuration, so you will have to swap departments to change the one you want.</li>
			<li class="sub-help">System Admin > System Dashboard</li>

			<li><b>User Agent Strings</b><br>
				If enabled, here you can see the <a href="https://en.wikipedia.org/wiki/User_agent">user agent strings</a> of users and which page they were on.</li>
			<li class="sub-help">System Admin > User Agent Strings</li>

			<li><b>User Feedback</b><br>
				A list of the user feedback given.</li>
			<li class="sub-help">System Admin > User Feedback</li>

			<li><b>Add User</b><br>
				Here you can add a new user to the system.</li>
			<li class="sub-help">System Admin > New User</li>

			<li><b>Edit User Details</b><br>
				Edit a users\' details and privileges.</li>
			<li class="sub-help">System Admin > Edit User</li>
		</ul>',

	/* 3. PROJECT ADMIN HELP TAB */
	'help_tab_project_admin' => 'Project Administrator',
	'help_tab_project_admin_content' =>
		'<p>A user logged in with project administrator permission will have the "Admin" menu available, this will make the following available: </p>
		
		<h3>Users</h3>
		<ul>
			<li><b>Add User</b><br>
				Here you can add a new user to the system.</li>
			<li class="sub-help">Admin > Add User</li>

			<li><b>Import Students</b><br>
				Here you can upload a UTF-8 CSV document of students to import into the system. There is also a test feature available.</li>
			<li class="sub-help">Admin > Import Students</li>

			<li><b>Edit User Details</b><br>
				Edit a users\' details and privileges.</li>
			<li class="sub-help">Admin > Edit User</li>

			<li><b>Amend Supervisor Arrangements</b><br>
				The ability to change limits and preferences for supervisors.</li>
			<li class="sub-help">Admin > Amend Supervisors Arrangements</li>

			<li><b>Log in as Different User</b><br>
				You may log-in as another user <em>(Expect administrators)</em> and bypass authentication. This should only be used to help other users.</li>
			<li class="sub-help">Admin > Log in as Another User</li>
		</ul>

		<h3>Reports</h3>
		<ul>
			<li><b>Supervisor Report</b><br>
				A list of all supervisors, their projects, their project load and what/whom they supervise.</li>
			<li class="sub-help">Admin > Supervisor Report</li>

			<li><b>Student Report</b><br>
				A list of all student grouped by project status.</li>
			<li class="sub-help">Admin > Student Report</li>
		</ul>

		<h3>Second Marker</h3>
		<ul>
			<li><b>Compute Second Markers</b><br>
				Automatically assign student second markers based on their project load and amount of students they have accepted.</li>
			<li class="sub-help">Admin > Compute Second Markers</li>

			<li><b>Swap Second Markers</b><br>
				Manually swap two students second markers.</li>
			<li class="sub-help">Admin > Swap Second Markers</li>

			<li><b>Manually Assign Second Markers</b><br>
				Manually assign a second marker to student.</li>
			<li class="sub-help">Admin > Manually Assign Second Markers</li>

			<li><b>Export Second Marker Data</b><br>
				Export either a CSV or JSON file of information about students and their second markers.</li>
			<li class="sub-help">Admin > Export Second Marker Data</li>

		</ul>

		<h3>Settings</h3>
		<ul>
			<li><b>Edit Topics</b><br>
				Add, edit or delete project topics.</li>
			<li class="sub-help">Admin > Edit Topics</li>

			<li><b>Edit Programmes</b><br>
				Add, edit or delete user programmes.</li>
			<li class="sub-help">Admin > Edit Programmes</li>

			<li><b>Amend Parameters</b><br>
				 Here you can set dates used throughout the system.</li>
			<li class="sub-help">Admin > Amend Parameters</li>
		</ul>

		<h3>Transactions</h3>
		<ul>
			<li><b>Browse Transactions</b><br>
				Examine all transactions by date. Transactions are grouped into types, you can easily switch between them.</li>
			<li class="sub-help">Admin > Browse Transactions</li>

			<li><b>End of Year Archive</b><br>
				Archive information at the end of an academic year.</li>
			<li class="sub-help">Admin > End of Year Archive</li>
		</ul>',

	/* 4. STUDENT HELP TAB */
	'help_tab_student' => 'Student',
	'help_tab_student_content' =>
		'<p>A user logged in as a student will have a different homepage, and a menu labelled "Student" available to them. The student menu includes: </p>
		<ul>
			<li><b>Propose Project</b><br>
				Gives you the ability to create a new project and propose it to a supervisor.</li>
			<li class="sub-help">Student > Propose Project</li>
			<li><b>Supervisor Report</b><br>
				A list all supervisors, their projects, their project load and what/whom they supervise.</li>
			<li class="sub-help">Student > Supervisor Report</li>
		</ul>
		<h3>Student Features</h3>
		<ul>
			<li><b>Favourite projects</b><br>
				Your favourite projects will appear on your homepage. To favourite a project, navigate to the project and press the grey star in the upper right corner. The star will then turn gold, and appear on your homepage. Press the gold star to un-favourite a project.</li>
			<li><b>Share name</b><br>
				Found on your homepage, you have the ability to hide or show your name to other students in the supervisor report.</li>
			<li class="sub-help">Supervisors and administrators can still see your name.</li>
			<li><b>Your proposed projects</b><br>
				If you proposed a project to a supervisor and either undo or be rejected, you can see these projects on your homepage. You can then press "Proposed to supervisor" to propose the same project to another supervisor. Additionally, you can edit or delete the project by clicking on the title.</li>
		</ul>
		',

	/* 5. ABOUT PAGE */
	'about' =>
		'This website manages project selection and allocation for final year and masters students at the University of Sussex. 
		<br><br>

		Final year and masters projects are managed by a member of staff, the Project Coordinator, by means of a system that endeavours to match student and supervisor requirements.
		Supervisors can propose projects that students can accept and, additionally, students can propose their own projects to a supervisor. 
		<br><br>

		The old website had not been updated to support the modern web and lacked compatibility for modern browsers.
		This new website took inspiration for the old website in terms of functionality, 
		but was crafted from the ground to be fast and support mobile devices.
		<br><br>

		This project is open-source, which means the source code is freely available for you to browse on Github.
		The backend of this website is written in PHP and uses the popular framework Laravel,
		while the frontend is <i>mostly</i> written in jQuery, styled with SASS and LESS.
		This website is hosted by the department of Engineering and Informatics.
		<br><br>

		This website was created in 2017/2018 as a final year project by <a href="http://www.lewisdavidjohnson.com">Lewis Johnson</a> under the supervision of <a href="http://www.sussex.ac.uk/profiles/115097">Dr. Bernhard Reus.</a>',

	/*
	| 6. Help Tabs
	| You may add up to 20 help tabs.
	| Help pages 2-20 are optional.
	| Admin and supervisor help tabs do not count towards the 20 limit.
	|
	| WARNING: The help page will break without help_tab_1 and help_tab_1_content strings.
	| WARNING: The content strings are parsed as HTML, do not use <script> tags.
	*/

	// HELP TAB 1 *REQUIRED*
	'help_tab_1' => 'Log in',
		'help_tab_1_content' => '<p>Once you receive an email from the project conveyor, you will be able to log in to the database using your Sussex ITS username/email and password.
		If there is a problem logging in, please contact the administrator.</p>',

	// HELP TAB 2
	'help_tab_2' => 'Browse',
	'help_tab_2_content' =>
		'<p>When logged in, you can browse projects created by supervisors:</p>
		<ul>
			<li>You can browse on-offer projects.</li>
			<li>You can use the search function to search by title, description, skills and topic.</li>
			<li class="sub-help">Browse > Projects</li>
			<li>You can browse projects by supervisor.</li>
			<li class="sub-help">Browse > Projects by Supervisor</li>
			<li>You can browse projects by topic.</li>
			<li class="sub-help">Browse > Projects by Topic</li>
			<li>A supervisor can additionally browse withdrawn, archived, and student proposed projects.</li>
		</ul>',

	// HELP TAB 3
	'help_tab_3' => 'Help',
	'help_tab_3_content' =>
		'<p>This menu allows the following options:</p>
		<ul>
			<li><b>System Help</b><br>
				I think you know this one.</li>
			<li class="sub-help">Help > System Help</li>
			<li><b>About</b><br>
				Shows information about the development of the system.</li>
			<li class="sub-help">Help > About</li>
			<li><b>External Links</b><br>
				A collection of links you may find helpful.</li>
			<li class="sub-help">Help > External Links</li>
		</ul>',

	// HELP TAB 4
	'help_tab_4' => 'Feedback',
	'help_tab_4_content' =>
		'<p>You may have noticed, this website is new and different from the previous website. Because of this there, is a feedback system.
		We would appreciate it if you used the in-built feedback system to leave general comments or report your problems and issues.</p>
		<p>The button for leaving feedback is just below, in the footer, labelled "<b>Leave Feedback</b>".</p>',

	// HELP TAB 5
	'help_tab_5' => 'Cookies',
	'help_tab_5_content' =>
		'
		<p>To make this site work properly, we sometimes place small data files called cookies on your device. Most big websites do this too.</p>

		<h3>What are cookies?</h3>
		<p>A cookie is a small text file that a website saves on your computer or mobile device when you visit the site.
		It enables the website to remember your actions and preferences (such as login, font size and other display preferences) over a period of time,
		so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>

		<h3>How do we use cookies?</h3>

		<table class="table">
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
					<td>high_contrast</td>
					<td>Determines if high contrast is enabled</td>
				</tr>
				<tr>
					<td>Accessibility</td>
					<td>large_font</td>
					<td>Determines if large font is enabled.</td>
				</tr>
				<tr>
					<td>Security</td>
					<td>XSRF-TOKEN</td>
					<td>This cookie helps prevent malicious activity.</td>
				</tr>
				<tr>
					<td>Security</td>
					<td>sussexprojects_session</td>
					<td>Your unique session identifier.</td>
				</tr>
				<tr>
					<td>Analytics</td>
					<td>vb</td>
					<td>Determines if you have visited before.</td>
				</tr>
				<tr>
					<td>Analytics</td>
					<td>seen_cookie_banner</td>
					<td>Determines if you have acknowledged the cookie banner.</td>
				</tr>
				<tr>
					<td>Usability</td>
					<td>sr_hide_closed</td>
					<td>Determines if supervisors not currently accepting offers are shown in the "Supervisor Report".</td>
				</tr>
				<tr>
					<td>Usability</td>
					<td>favourite_projects</td>
					<td><b>Students only</b><br>A list of your favourite projects.</td>
				</tr>
				<tr>
					<td>Usability</td>
					<td>mp_hide_archived</td>
					<td><b>Supervisors only</b><br>Determines if the user is displaying archived projects in "My Projects".</td>
				</tr>
			</tbody>
		</table>

		<h3>Session Storage</h3>
		<p>Session storage is a way of storing information on your device for a short amount of time.
		These little tokens will be cleared as soon as you close your browser.
		If your browser does not support session storage, we will store these values as cookies instead.</p>

		<table class="table">
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
					<td><b>System administrators only</b><br>The current tab selected in the administrator dashboard.</td>
				</tr>
			</tbody>
		</table>
		'
];
