"use strict";

; $(function () {
	// APTS - Assign project to student
	// APV - Assign project view

	function AssignProjectView(studentTable, projectTable) {
		this.studentTable = studentTable;
		this.projectTable = projectTable;
		this.studentDataTable = this.studentTable[0].dataTable;
		this.projectDataTable = this.projectTable[0].dataTable;

		this.selectedStudent = null;
		this.selectedProject = null;

		this.urls = {
			ASSIGN_PROJECT: 'admin/students/assign-project',
		};
		
		// Methods
		this.init = function () {
			let self = this;

			$(self.studentDataTable.bodyRows).on('click', function () { self.selectStudent(this); });
			$(self.projectDataTable.bodyRows).on('click', function () { self.selectProject(this); });
		}

		this.selectStudent = function (studentRowDOM) {
			let warning = $("#StudentAlreadyHasProjectAssignedToThem");
			warning.hide();

			var row = $(studentRowDOM);

			this.unselectAll();
			row.addClass("is-selected");
			this.selectedStudent = $(row);

			$(this.projectDataTable.bodyRows).attr('disabled', false);

			if (this.selectedStudent.data('has-project') == true) {
				warning.fadeIn(200);
			}
		}

		this.selectProject = function (projectRowDOM) {
			var row = $(projectRowDOM);

			if (this.selectedStudent != null) {
				row.addClass("is-selected");
				this.selectedProject = row;

				this.showDialog();
			}
		}

		this.showDialog = function () {
			let studentName = this.selectedStudent.data('student-name');
			let supervisorName = this.selectedProject.data('supervisor-name');
			let projectTitle = this.selectedProject.data('project-title');
			
			$("#AssignProjectModal #StudentName").text(studentName);
			$("#AssignProjectModal #SupervisorName").text(supervisorName);
			$("#AssignProjectModal #ProjectTitle").text(projectTitle);

			$("#AssignProjectModal")[0].dialog.showDialog();
		}

		this.unselectAll = function () {
			$(this.studentDataTable.bodyRows).removeClass("is-selected");
			$(this.projectDataTable.bodyRows).removeClass("is-selected");
		}

		this.resetView = function () {
			$(this.studentDataTable.bodyRows).removeClass("is-selected");
			$(this.projectDataTable.bodyRows).removeClass("is-selected");
			$(this.projectDataTable.bodyRows).attr("disabled", true);

			this.selectedStudent = null;
			this.selectedProject = null;
		}

		this.init();
	};

	$('#SubmitAssignProjectButton').on('click', function () {
		var apv = window['Views/AssignProjectView'];

		if (apv.selectedStudent == null || apv.selectedProject == null) {
			$("#AssignProjectModal")[0].dialog.hideDialog();
			return;
		};

		$("#AssignProjectModal")[0].dialog.showLoader();

		var projectId = apv.selectedProject.data('project-id');
		var studentId = apv.selectedStudent.data('student-id');

		$.ajax({
			type: "POST",
			url: apv.urls.ASSIGN_PROJECT,
			data: {
				student_id: studentId,
				project_id: projectId
			},
			success: function (response) {
				window.location.reload();
			}
		}).always(function (data) {
			$("#AssignProjectModal")[0].dialog.hideDialog();
			$("#AssignProjectModal")[0].dialog.hideLoader();
			apv.resetView();
		});
	});

	// Initialise
	let studentTable = $("#APTSStudentTable");
	let projectTable = $("#APTSProjectTable");

	if (studentTable.length > 0 || projectTable.length > 0) {
		window['Views/AssignProjectView'] = new AssignProjectView(studentTable, projectTable);
	}
});