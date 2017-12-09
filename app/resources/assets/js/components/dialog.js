$(function() {

$('body').append('<div class="underlay"></div>');

var Dialog = function Dialog(element) {
	this.element = $(element);
	this.dialogName = $(element).data('dialog');
	this.underlay = $('.underlay');
	this.header = $(element).find(this.Selectors_.DIALOG_HEADER);
	this.content = $(element).find(this.Selectors_.DIALOG_CONTENT);
	this.activatorButtons = [];
	this.isActive = $();
	this.init();
	
};

window['Dialog'] = Dialog;

Dialog.prototype.CssClasses_ = {
	ACTIVE: 'active',
};

Dialog.prototype.Selectors_ = {
	DIALOG: '.dialog',
	DIALOG_HEADER: '.header',
	DIALOG_CONTENT: '.content',
};

Dialog.prototype.functions = {
	hideDialog: function(Dialog) {
		this.element.attr("aria-hidden", "true");
		this.underlay.removeClass(this.CssClasses_.ACTIVE);
		this.element.removeClass(this.CssClasses_.ACTIVE);
		this.isActive = false;
	},
	showDialog: function(Dialog) {
		this.element.attr("aria-hidden", "false");
		this.underlay.addClass(this.CssClasses_.ACTIVE);
		this.element.addClass(this.CssClasses_.ACTIVE);
		this.isActive = true;

		// Replace this
		$('.mobile-nav-underlay').attr("aria-hidden", "true");
		$('.hamburger-container').attr("aria-expanded", "false");
		$('nav.mobile').removeClass("is-visible");
		$('.mobile-nav-underlay').removeClass("is-visible");
	},
};

Dialog.prototype.init = function(){
	// Needed for context
	var dialog = this;

	// Find activator button
	$('button').each(function() {
		if($(this).data('activator') && $(this).data('dialog') == dialog.dialogName){
			dialog.activatorButtons.push($(this));
		}
	});

	// Add seperator after header 
	this.header.append('<hr>');

	// For disabilty
	this.element.attr("aria-hidden", "true");

	// Set underlay
	this.underlay.on('click', $.proxy(this.functions.hideDialog, this, dialog));

	try{
		$(dialog.activatorButtons).each(function() {
			$(this).on('click', $.proxy(dialog.functions.showDialog, dialog));
		});
	} catch(err){
		console.error("Dialog " + dialog.dialogName + " has no activator button.");
		console.error(err);
	}
};

Dialog.prototype.initAll = function(){
	$(this.Selectors_.DIALOG).each(function() {
		$(this).Dialog = new Dialog(this);
	});
};

Dialog.prototype.initAll();

});