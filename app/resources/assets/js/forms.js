var AjaxFunctions =  function AjaxFunctions() {};

window['AjaxFunctions'] = AjaxFunctions;

AjaxFunctions.prototype.CssClasses_ = {
	DATA_TABLE: 'data-table',
	IS_SELECTED: 'is-selected'
};

AjaxFunctions.prototype.Selectors_ = {
	SEARCH_INPUT: '.search-input',
	SEARCH_CONTAINER: '.search-container',
	SEARCH_FILTER_CONTAINER: '.search-filter-container',
	SEARCH_FILTER_BUTTON: '#search-filter-button',
	LOG_IN_DIALOG: '.login.dialog',
	CHANGE_AUTH_DIALOG: '.change-auth.dialog'
};

AjaxFunctions.prototype.Keys_ = {
	SPACE: 32,
	ENTER: 13,
	COMMA: 45
};

AjaxFunctions.prototype.functions = {
	deleteProject: function (projectName) {
		if(confirm("Are you sure you want to delete \"" + projectName +"\"?")){
			$.ajax({
				type: "DELETE",
				url: "edit",
				success: function(url){
					window.location.href = "../";
				}
			});
		}
		else{
			return false;
		}
	}
}

var ajax = new AjaxFunctions();

function removeAllShadowClasses(element){
	$(element).removeClass (function (index, className) {
		return (className.match (/\bshadow\-\S+/g) || []).join(' ');
	});
}

// PROJECT PAGE
$(ajax.Selectors_.SEARCH_INPUT).on('focus',  function(e){
	removeAllShadowClasses(ajax.Selectors_.SEARCH_CONTAINER);
	$(ajax.Selectors_.SEARCH_CONTAINER).addClass('shadow-focus');
});

$(ajax.Selectors_.SEARCH_INPUT).on('focusout',  function(e){
	removeAllShadowClasses(ajax.Selectors_.SEARCH_CONTAINER);
	$(ajax.Selectors_.SEARCH_CONTAINER).addClass('shadow-2dp');
});

// Makes primary topic first
$(".topics-list").prepend($(".first"));

// SUPERVISOR
$('#deleteProjectButton').on('click', function() { Ajax.deleteProject($('#title').val()); });

// SEARCH
$(ajax.Selectors_.SEARCH_FILTER_BUTTON).on('click', function() {
	var container = $(ajax.Selectors_.SEARCH_FILTER_CONTAINER);
	var filterButton = $(this);

	if(container.hasClass('active')){
		container.removeClass('active');
		filterButton.removeClass('active');
	} else{
		container.addClass('active');
		filterButton.addClass('active');
	}
});