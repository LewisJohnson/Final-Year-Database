@extends('layouts.app')
@section ('content')
<h2>Help</h2>
<div id="TabbedPanels1" class="TabbedPanels">
<ul class="TabbedPanelsTabGroup">
<!-- <li class="TabbedPanelsTab">Information</li>
-->
<li class="TabbedPanelsTab">Log in</li>
<li class="TabbedPanelsTab">Browse</li>
<li class="TabbedPanelsTab">Student Options</li>
<li class="TabbedPanelsTab">Supervisor Options</li>
<li class="TabbedPanelsTab">Administrator Options</li>
<li class="TabbedPanelsTab TabbedPanelsTabSelected">Help</li>
</ul>
<div class="TabbedPanelsContentGroup">
<div class="TabbedPanelsContent" style="display: none;">
<h2>Log in</h2>
<p>Once you receive an email from the project convenor, you will be able to log in to the database. If there is a problem logging in, please contact the database administrator Andrew Philippides (andrewop AT sussex.ac.uk)</p>
</div>
<div class="TabbedPanelsContent" style="display: none;">
<h2>Browse</h2>
<p>When logged in, you can browse existing and historic projects:</p>
<ul>
	<li>An active user (student/supervisor/administrator) can browse current projects.</li>
	<li>An active user (student/supervisor/administrator) can browse projects by supervisor.</li>
	<li>An active user (student/supervisor/administrator) can search by keyword or project topic.</li>
	<li>A supervisor (or administrator) user can additionally browse their own projects.</li>
	<li>A supervisor (or administrator) user can also browse by status of projects and create new projects by making a copy of old ones.</li>
</ul>
</div>
<div class="TabbedPanelsContent" style="display: none;">
<h2>Student Options</h2>
<p>A user logged in with student permissions will have the Student Options menu displayed, this will make the following available: </p>
<ul>
	<li>Propose a Project gives the student the ability to propose a project to either a specific supervisor or generally to any supervisor.</li>
  	<li>List all supervisors, their load and what/whom they supervise.</li>
 	<li>List all students and what projects they have selected.</li>
 	<li>Withdraw and edit a proposed project. The corresponding buttons can be found on the student's home page just below the project descritpion.</li>
 	<li>Note that a project selected from a specific supervisor's list can't be withdrawn. In this case the student needs to ask the supervisor to reject the selection to release the student.</li>
 </ul>
</div>

<div class="TabbedPanelsContent" style="display: none;">
	<h2>Supervisor Options</h2>
	<p>A user logged in with supervisor (or administrator) permissions will have the Supervisor Options menu displayed, this will make the following available: </p>
	<ul>
		<li>Propose a project allows the supervisor to add a new project.</li>
		<li>Add project topic allows the supervisor to create a new category of project topic.</li>
		<li>List all supervisors, their load and what/whom they supervise.</li>
		<li>Browse transactions related to their own projects.</li>
		<li>List all students and what projects they have selected.</li>
		<li>A supervisor or administrator can choose to opt-in or opt-out of emails refering to transcations on their projects.</li>
	</ul>
</div>

<div class="TabbedPanelsContent" style="display: none;">
	<h2>Administrator Options</h2>
	<p>A user logged in with administrator permissions will have the Administrator Options menu displayed, this will make the following available: </p>
	<ul>
		<li>Summary Report Students - A report showing which students have selected which projects giving the administrator the ability to email groups.</li>
		<li>Summary Report Supervisors - A report showing which students are allocated to which supervisors, links can be removed.</li>
		<li>Log in as Different User - A method for administrator to perform tasks for other users.</li>
		<li>Amend Supervisor Arrangements - The ability to change limits and preferences for supervisors.</li>
		<li>Overall Parameters - The selection of year and earliest dates.</li>
		<li>Add User - The ability to manually add a new student or supervisor.</li>
		<li>Edit User Details - Manually change a users' detail.s</li>
		<li>Browse Transactions by Project - examine project transactions. </li>
		<li>Browse Transactions by Time - examine all transactions by date.</li>
		<li>Amend Topics - amend or delete project topics.</li>
		<li>End of Year Archive - archive old data at the end of an academic year.</li>
		<li>Import New Students - Imports an XML file of new students.</li>
		<li>A supervisor or administrator can choose to opt-in or opt-out of emails refering to transcations on their projects.</li>
	</ul>
	<p>Data resetting options are also available whilst the system is under development</p>
</div>

<div class="TabbedPanelsContent TabbedPanelsContentVisible" style="display: block;">
<h2>Help</h2>
<p>This menu allows the following options:</p>
<ul> 
	<li>System Help - displays this screen</li>  
	<li>General Information - displays the public home page</li>  
	<li>About - shows information about the devlopment of the system</li>
</ul></div>
</div>
</div>
@endsection