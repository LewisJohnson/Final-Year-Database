!function(t){var e={};function i(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=10)}({10:function(t,e,i){t.exports=i(11)},11:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(12);i.n(o);$(function(){var t=0;$.ajaxSetup({headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}}),$(".show--scroll-to-top").length>0&&$(".main-content").append('<button class="button button--raised button--accent scroll-to-top">Scroll to Top</button>'),$(".animate-cards .card").css("opacity",0),$(".animate-cards .card").each(function(e,i){t+=200,setTimeout(function(){$(this).addClass("slideInUp animated"),$(this).animate({opacity:1},800)}.bind(this),t)}),$(".dropdown").attr("tabindex","0"),$(".dropdown > button").attr("tabindex","-1"),$(".dropdown .dropdown-content a").attr("tabindex","0"),$(".topics-list").prepend($(".first")),$(".topics-list .loader").fadeOut(0),$(".topics-list li").first().fadeIn(config.animtions.fast,function t(){$(this).next(".topics-list li").fadeIn(config.animtions.fast,t)}),$(".order-list-js").each(function(){var t=$(this);if(t.hasClass("last-name-header-list-js")){if(!t.attr("id"))return void console.error("A unique id is required.");t.before('<div class="header-links" id="'+t.attr("id")+'-links"></div>'),addLastNameHeadersToList(t)}if(t.hasClass("alpha-header-list-js")){if(!t.attr("id"))return void console.error("A unique id is required.");t.before('<div class="header-links" id="'+t.attr("id")+'-links"></div>'),addAlphaHeadersToList(t)}if(t.hasClass("title-header-list-js")){if(!t.attr("id"))return void console.error("A unique id is required.");t.before('<div class="header-links" id="'+t.attr("id")+'-links"></div>'),addTitleHeadersToList(t)}}),$("#share-name-form").on("submit",function(t){t.preventDefault(),$.ajax({url:$(this).prop("action"),type:"PATCH",data:$(this).serialize(),success:function(t){t.share_name?createToast("success","Your name is being shared with other students."):createToast("","You are no longer sharing your name with other students."),$("#share_name").prop("checked",t.share_name)}})}),$(".receive-emails-form").on("submit",function(t){t.preventDefault(),$.ajax({url:$(this).prop("action"),type:"PATCH",data:$(this).serialize(),success:function(t){t.successful?createToast("success",t.message):createToast("error",t.message)}})}),$("#loginForm").on("submit",function(t){t.preventDefault(),$(".help-block","#loginForm").css("display","none"),$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.showLoader(),$.ajax({url:$(this).prop("action"),type:"POST",data:$(this).serialize(),success:function(){$(".help-block",AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).hide(),location.reload(!0)},error:function(t){$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideLoader(),$("#login-username",AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).addClass("has-error"),$(".help-block",AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).show(),$(".help-block",AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).text(t.responseJSON.message)}})}),$("#new-topic-form").on("submit",function(t){t.preventDefault();var e=$(this).find(":submit");e.html('<div class="loader"></div>'),$(".loader",e).css("display","block"),$.ajax({url:$(this).prop("action"),type:"POST",context:$(this),data:$(this).serialize(),success:function(t){t=JSON.parse(t);EditTopic.prototype.functions.createEditTopicDOM(t.id,t.name)}}).done(function(){$(this).find("input").val(""),$(this).find(":submit").html("Add")})});var e=$("#supervisor-form"),i=$("#student-form");e.hide(),i.hide(),$(".user-form-supervisor").each(function(){$(this).prop("checked")&&e.show()}),$(".user-form-supervisor").on("change",function(){if($(this).prop("checked"))e.show();else{var t=!1;$(".user-form-supervisor").each(function(){$(this).prop("checked")&&(t=!0)}),t||e.hide()}}),$(".user-form-student").each(function(){$(this).prop("checked")&&i.show()}),$(".user-form-student").on("change",function(){if($(this).prop("checked"))i.show();else{var t=!1;$(".user-form-student").each(function(){$(this).prop("checked")&&(t=!0)}),t||i.hide()}}),$(".user-form #username").on("change",function(){$(".user-form #email").val($(this).val()+"@sussex.ac.uk")}),$("body").on("click",".email-selected",function(t){"mailto:"!==$(this).prop("href")&&null!==$(this).prop("href")||(alert("You haven't selected anyone."),t.preventDefault())}),$("body").on("click",".external-link",function(t){var e=$($(this).data("element-to-hide-selector")),i=$($(this).data("element-to-replace-with-loader-selector"));$(this).removeClass("active"),e.hide(),i.hide(),i.after('<div id="content-replaced-container" class="loader loader--x-large"></div>'),$("#content-replaced-container").css("display","block")}),$("nav.mobile .sub-dropdown").on("click",function(){var t=$(this),e=t.find(".dropdown-content");"true"==t.attr("aria-expanded")?(t.attr("aria-expanded",!1),e.attr("aria-hidden",!0),t.find(".svg-container svg").css("transform","rotateZ(0deg)"),t.removeClass("active"),e.hide(config.animtions.medium)):(t.attr("aria-expanded",!0),e.attr("aria-hidden",!1),t.find(".svg-container svg").css("transform","rotateZ(180deg)"),t.addClass("active"),e.show(config.animtions.medium))}),$(".student-undo-select").on("click",function(t){var e=$(this).parent();$.confirm({title:"Undo Project Selection",type:"red",icon:'<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" /></svg></div>',theme:"modern",escapeKey:!0,backgroundDismiss:!0,animateFromElement:!1,autoClose:"cancel|10000",content:"Are you sure you want to un-select your selected project?</b>",buttons:{confirm:{btnClass:"btn-red",action:function(){$.ajax({method:"PATCH",url:"/students/undo-selected-project",success:function(t){t.successful?(e.hide(400,function(){e.remove()}),createToast("success","Undo successful.")):createToast("error",t.message)}})}},cancel:{}}})}),$("#leave-feedback-button").on("click",function(t){$.confirm({title:"Feedback",content:function(){var t=this;return $.ajax({url:"/feedback",dataType:"html",method:"GET"}).done(function(e){t.setContent(e)}).fail(function(){t.setContent("Something went wrong.")})},type:"blue",icon:'<div class="svg-container"><svg viewBox="0 0 24 24"><path  d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg></div>',theme:"material",escapeKey:!0,backgroundDismiss:!1,animateFromElement:!1,buttons:{formSubmit:{text:"Submit",btnClass:"btn-blue",action:function(){if(!this.$content.find(".comment").val())return $.alert("Please provide some feedback"),!1;$.ajax({url:"/feedback",method:"POST",data:this.$content.find("form").serialize(),success:function(t){t.successful?createToast("success",t.message):createToast("error",t.message)}})}},cancel:function(){}},onContentReady:function(){$("#feedback-page").val(window.location.pathname);var t=this;this.$content.find("form").on("submit",function(e){e.preventDefault(),t.$$formSubmit.trigger("click")})}})}),$(".receive-emails-checkbox").on("click",function(t){$(this).submit()}),$(".favourite-container").on("click",function(){var t=$(this),e=t.find("svg");if(null!=window.project)var i=window.project.data("project-id");else i=$(this).data("project-id");if(e.hide(0),$(".loader",t).show(0),e.hasClass("favourite"))var o="remove",s="/students/remove-favourite";else o="add",s="/students/add-favourite";$.ajax({url:s,type:"PATCH",data:{project_id:i},success:function(){"add"==o?e.addClass("favourite"):e.removeClass("favourite")}}).done(function(i){e.fadeIn(config.animtions.fast),$(".loader",t).hide(0)})}),$("body").on("change",".email-table .checkbox input",function(){var t,e,i,o;setTimeout((t=$(this),e=t.parents().eq(4).data("status"),i="mailto:",o=".email-selected."+e,$(".email-table."+e+" .checkbox input").each(function(t,e){$(e).is(":checked")&&!$(e).hasClass("master-checkbox")&&(i+=$(e).data("email"),i+=",")}),void $(o).prop("href",i)),2e3)}),$(".html-editor").each(function(t,e){$.ajax({url:"/snippet?snippet=html-editor-toolbar",type:"GET",success:function(t){$(".html-editor--input").after(t)}});$(".html-editor--input").before("<div class='html-editor--top-buttons flex'><button class='html' type='button'>HTML</button><button class='preview' type='button'>PREVIEW</button></div>"),$(".html-editor").after("<div class='html-editor--preview-container'><div class='html-editor--preview'></div></div>"),$(".html-editor--preview-container").hide(),$(".html-editor--preview").html($(".html-editor--input").val())}),$(".html-editor--input").on("change",function(){$(".html-editor--preview").html($(this).val())}),$(".html-editor--top-buttons .html").on("click",function(){$(".html-editor--input").show(),$(".html-editor--toolbar").show(),$(".html-editor--preview-container").hide()}),$(".html-editor--top-buttons .preview").on("click",function(){$(".html-editor--input").hide(),$(".html-editor--toolbar").hide(),$(".html-editor--preview-container").show()}),$(".html-editor").on("click",".html-editor--toolbar li button",function(t){switch($(this).data("type")){case"linebreak":insertAtCaret("html-editor--input","<br>");break;case"ol":insertAtCaret("html-editor--input","\n<ol>\n\t<li>Item 1</li>\n\t<li>Item 2</li>\n\t<li>Item 3</li>\n</ol>");break;case"ul":insertAtCaret("html-editor--input","\n<ul>\n\t<li>Item x</li>\n\t<li>Item y</li>\n\t<li>Item z</li>\n</ul>");break;case"bold":wrapTextWithTag("html-editor--input","b");break;case"tt":wrapTextWithTag("html-editor--input","tt");break;case"italic":wrapTextWithTag("html-editor--input","i");break;case"underline":wrapTextWithTag("html-editor--input","u");break;case"img":var e=prompt("Enter the image URL","https://www."),i=prompt("Enter alt text","Image of Sussex campus");insertAtCaret("html-editor--input",'<img alt="'+i+'" src="'+e+'">');break;case"link":e=prompt("Enter the URL","https://www.");var o=prompt("Enter display text","Sussex");insertAtCaret("html-editor--input",'<a href="'+e+'">'+o+"</a>");break;case"code":wrapTextWithTag("html-editor--input","code");break;case"pre":wrapTextWithTag("html-editor--input","pre");break;case"info":$.dialog({theme:"material",escapeKey:!0,animateFromElement:!1,backgroundDismiss:!0,title:"HTML Editor Info",content:"All links you add will open in a new tab. All HTML 5 elements are valid for the description field, excluding; <br><br> <ul><li>Script tags</li><li>Heading tags</li><li>HTML root tags</li><li>Body tags</li></ul>"})}})})},12:function(t,e,i){"use strict";$(function(){var t=function(t){null==window.MobileMenu?(window.MobileMenu=this,this.element=$(t),this.activator=$(this.Selectors_.HAMBURGER_CONTAINER),this.underlay=$(this.Selectors_.UNDERLAY),this.init()):console.log("There can only be one mobile menu.")};t.prototype.CssClasses_={IS_VISIBLE:"is-visible"},t.prototype.Selectors_={MOBILE_MENU:"nav.mobile",HAMBURGER_CONTAINER:".hamburger-container",UNDERLAY:".mobile-nav-underlay"},t.prototype.openMenu=function(){this.activator.attr("aria-expanded","true"),this.element.addClass(this.CssClasses_.IS_VISIBLE),this.underlay.attr("aria-hidden","false"),this.underlay.addClass(this.CssClasses_.IS_VISIBLE)},t.prototype.closeMenu=function(){this.activator.attr("aria-expanded","false"),this.element.removeClass(this.CssClasses_.IS_VISIBLE),this.underlay.attr("aria-hidden","true"),this.underlay.removeClass(this.CssClasses_.IS_VISIBLE)},t.prototype.init=function(){this.activator.on("click",this.openMenu.bind(this)),this.underlay.on("click",this.closeMenu.bind(this))},t.prototype.initAll=function(){$(this.Selectors_.MOBILE_MENU).each(function(){this.mobileMenu=new t(this)})};var e=function(t){this.element=$(t),this.dialogName=$(t).data("dialog"),this.underlay=$(".underlay"),this.header=$(t).find(this.Selectors_.DIALOG_HEADER),this.content=$(t).find(this.Selectors_.DIALOG_CONTENT),this.element.addClass("registered"),this.element.attr("role","dialog"),this.element.attr("aria-labelledby","dialog-title"),this.element.attr("aria-describedby","dialog-desc"),this.header.attr("title",this.header.find("#dialog-desc").html()),this.content.before(this.HtmlSnippets_.LOADER),this.loader=$(t).find(".loader"),this.isClosable=!0,this.activatorButtons=[],this.init()};e.prototype.HtmlSnippets_={LOADER:'<div class="loader" style="width: 100px; height: 100px;top: 25%;"></div>'},e.prototype.CssClasses_={ACTIVE:"active"},e.prototype.Selectors_={DIALOG:".dialog",DIALOG_HEADER:".header",DIALOG_CONTENT:".content"},e.prototype.showLoader=function(){this.loader.show(0),this.content.hide(0)},e.prototype.hideLoader=function(){this.loader.hide(0),this.content.show(0)},e.prototype.showDialog=function(){this.element.attr("aria-hidden","false"),this.underlay.addClass(this.CssClasses_.ACTIVE),this.underlay.data("owner",this.dialogName),this.element.addClass(this.CssClasses_.ACTIVE),window.Dialog=this,void 0!==window.MobileMenu&&window.MobileMenu.closeMenu()},e.prototype.hideDialog=function(){this.isClosable&&this.underlay.data("owner")==this.dialogName&&(this.element.attr("aria-hidden","true"),this.underlay.removeClass(this.CssClasses_.ACTIVE),this.element.removeClass(this.CssClasses_.ACTIVE))},e.prototype.init=function(){var t=this;$("button").each(function(){$(this).data("activator")&&$(this).data("dialog")==t.dialogName&&t.activatorButtons.push($(this))}),t.element.attr("aria-hidden","true"),t.underlay.on("click",t.hideDialog.bind(t));try{$(t.activatorButtons).each(function(){$(this).on("click",t.showDialog.bind(t))})}catch(e){console.error("Dialog "+t.dialogName+" has no activator button."),console.error(e)}},e.prototype.initAll=function(){$(this.Selectors_.DIALOG).each(function(){this.dialog=new e(this)})},$(document).ready(function(){$(this).keydown(function(t){27==t.keyCode&&null!=window.Dialog&&window.Dialog.hideDialog(),27==t.keyCode&&null!=window.MobileMenu&&window.MobileMenu.closeMenu()})});var i=function(t){this.element=$(t),this.headers=$(t).find("thead tr th"),this.bodyRows=$(t).find("tbody tr"),this.footRows=$(t).find("tfoot tr"),this.rows=$.merge(this.bodyRows,this.footRows),this.checkboxes=$(t).find(this.Selectors_.CHECKBOX),this.masterCheckbox=$(t).find(this.Selectors_.MASTER_CHECKBOX),this.init()};window.DataTable=i,i.prototype.CssClasses_={DATA_TABLE:"data-table",IS_SELECTED:"is-selected"},i.prototype.Selectors_={DATA_TABLE:".data-table",MASTER_CHECKBOX:"thead .master-checkbox",CHECKBOX:"tbody .checkbox-input",IS_SELECTED:".is-selected"},i.prototype.functions={selectAllRows:function(){this.masterCheckbox.is(":checked")?(this.rows.addClass(i.prototype.CssClasses_.IS_SELECTED),this.checkboxes.prop("checked",!0)):(this.rows.removeClass(i.prototype.CssClasses_.IS_SELECTED),this.checkboxes.prop("checked",!1))},selectRow:function(t,e){e&&(t.is(":checked")?e.addClass(i.prototype.CssClasses_.IS_SELECTED):e.removeClass(i.prototype.CssClasses_.IS_SELECTED))}},i.prototype.init=function(){var t=this;this.masterCheckbox.on("change",$.proxy(this.functions.selectAllRows,t)),$(this.checkboxes).each(function(e){$(this).on("change",$.proxy(t.functions.selectRow,this,$(this),t.bodyRows.eq(e)))})},i.prototype.initAll=function(){$(this.Selectors_.DATA_TABLE).each(function(){this.dataTable=new i(this)})};var o=function(t){this.element=$(t),this.head=$(t).find("> thead tr"),this.headers=$(t).find("> thead tr th"),this.bodyRows=$(t).find("> tbody tr"),this.selectorMenu=null,this.selectorButton=null,this.init()};window.ColumnToggleTable=o,o.prototype.CssClasses_={DATA_TABLE:"data-table",IS_SELECTED:"is-selected"},o.prototype.Selectors_={TOGGLE_TABLE:".table-column-toggle"},o.prototype.HtmlSnippets_={COLUMN_SELECTOR_BUTTON:'<button class="button button--raised dot-menu__activator" style="display:block;margin-top:2rem;margin-left:auto;">Columns</button>',COLUMN_SELECTOR_MENU:'<ul class="dot-menu dot-menu--bottom-left"></ul>'},o.prototype.functions={toggleColumn:function(t,e,i){i?(e.head.children().eq(t).removeAttr("hidden"),e.head.children().eq(t).show()):(e.head.children().eq(t).attr("hidden","true"),e.head.children().eq(t).hide()),e.bodyRows.each(function(){i?$(this).children().eq(t).show():$(this).children().eq(t).hide()})},refresh:function(t){var e=[];t.bodyRows=t.element.find("tbody tr"),t.headers.each(function(){$(this).attr("hidden")&&e.push($(this).index())}),t.bodyRows.each(function(){for(var t=0;t<e.length;t++)$(this).children().eq(e[t]).hide()})},refreshAll:function(){$(o.prototype.Selectors_.TOGGLE_TABLE).each(function(){o.prototype.functions.refresh(this.ColumnToggleTable)})}},o.prototype.init=function(){if(this.element.attr("id")){var t=this,e=$(this.HtmlSnippets_.COLUMN_SELECTOR_BUTTON),i=$(this.HtmlSnippets_.COLUMN_SELECTOR_MENU),s="ColumnToggleTable-"+t.element.attr("id");this.element.before(e),e.after(i),e.attr("id",s),i.attr("id",s+"-menu"),this.selectorButton=e,this.selectorMenu=i,this.selectorMenu.find("ul").data("table",t.element.attr("id")),this.headers.each(function(){var t=$(this).data("default")?"checked":"";$(this).data("visible",$(this).data("default")),i.append('\t\t\t\t<li class="dot-menu__item dot-menu__item--padded"> \t\t\t\t\t<div class="checkbox"> \t\t\t\t\t\t<input class="column-toggle" id="column-'+$(this).text()+'" type="checkbox" '+t+'> \t\t\t\t\t\t<label for="column-'+$(this).text()+'">'+$(this).text()+"</label> \t\t\t\t\t</div> \t\t\t\t</li>")}),$("body").on("change",".column-toggle",function(){var e=$(".column-toggle").index(this);o.prototype.functions.toggleColumn(e,t,$(this).prop("checked"))})}else console.log("ColumnToggleTable requires the table to have an unique ID.")},o.prototype.initAll=function(){$(this.Selectors_.TOGGLE_TABLE).each(function(){this.ColumnToggleTable=new o(this)})};var s=function(){};window.AjaxFunctions=s,s.prototype.CssClasses_={DATA_TABLE:"data-table",IS_SELECTED:"is-selected"},s.prototype.Selectors_={SEARCH_INPUT:".search-input",SEARCH_CONTAINER:".search-container",SEARCH_FILTER_CONTAINER:".search-filter-container",SEARCH_FILTER_BUTTON:"#search-filter-button",LOG_IN_DIALOG:".login.dialog"},s.prototype.Keys_={SPACE:32,ENTER:13,COMMA:45},$(s.prototype.Selectors_.SEARCH_INPUT).on("focus",function(t){removeAllShadowClasses(s.prototype.Selectors_.SEARCH_CONTAINER),$(s.prototype.Selectors_.SEARCH_CONTAINER).addClass("shadow-focus")}),$(s.prototype.Selectors_.SEARCH_INPUT).on("focusout",function(t){removeAllShadowClasses(s.prototype.Selectors_.SEARCH_CONTAINER),$(s.prototype.Selectors_.SEARCH_CONTAINER).addClass("shadow-2dp")}),$(s.prototype.Selectors_.SEARCH_FILTER_BUTTON).on("click",function(){var t=$(s.prototype.Selectors_.SEARCH_FILTER_CONTAINER),e=$(this);t.hasClass("active")?(t.removeClass("active"),e.removeClass("active"),e.blur()):(t.addClass("active"),e.addClass("active"))});var n=function(t){this.element=$(t),this.originalName=$(t).data("original-topic-name"),this.topicId=$(t).data("topic-id"),this.topicNameInput=$(t).find("input"),this.editButton=$(t).find(".edit-topic"),this.deleteButton=$(t).find(".delete-topic"),this.init()};window.EditTopic=n,n.prototype.Selectors_={EDIT_TOPIC:".edit-topic-list .topic"},n.prototype.Urls_={DELETE_TOPIC:"/topics/",PATCH_TOPIC:"/topics/",NEW_TOPIC:"/topics/"},n.prototype.functions={editTopic:function(){var t,e,i,o=this;o.originalName!=o.topicNameInput.val()&&$.confirm((t={title:"Change Topic Name",type:"blue",icon:'<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',theme:"modern",escapeKey:!0,backgroundDismiss:!0,animateFromElement:!1,content:'Are you sure you want to change the topic name from <b>"'+o.originalName+'"</b> to <b>"'+o.topicNameInput.val()+'"</b>?',buttons:{confirm:{btnClass:"btn-blue",action:function(){o.topicNameInput.prop("disabled",!0),o.editButton.html('<div class="loader"></div>'),$(".loader",o.element).css("display","block"),$.ajax({method:"PATCH",url:o.Urls_.DELETE_TOPIC,context:o,data:{topic_id:o.topicId,topic_name:o.topicNameInput.val()}}).done(function(){o.topicNameInput.prop("disabled",!1),o.editButton.html("Edit"),o.originalName=o.topicNameInput.val()})}},cancel:function(){o.topicNameInput.val(o.originalName)}}},i=function(){o.topicNameInput.val(o.originalName)},(e="backgroundDismiss")in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t))},deleteTopic:function(){var t=this;$.confirm({title:"Delete",type:"red",icon:'<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',theme:"modern",escapeKey:!0,backgroundDismiss:!0,animateFromElement:!1,content:'Are you sure you want to delete <b>"'+t.topicNameInput.val()+'"</b>?',buttons:{delete:{btnClass:"btn-red",action:function(){t.topicNameInput.prop("disabled",!0),$.ajax({method:"DELETE",url:t.Urls_.DELETE_TOPIC,context:t,data:{topic_id:t.topicId},success:function(){t.element.hide(config.animtions.slow,function(){t.element.remove()})}})}}}})},createEditTopicDOM:function(t,e){var i=$('<li class="topic" data-topic-id="'+t+'" data-original-topic-name="'+e+'"><input spellcheck="true" name="name" type="text" value="'+e+'"><button class="button edit-topic" type="submit">Edit</button><button class="button delete-topic button--danger">Delete</button></li>');$(".edit-topic-list").prepend(i),i.hide(0),i.show(400),n.prototype.initAll()}},n.prototype.init=function(){this.editButton.on("click",$.proxy(this.functions.editTopic,this,this)),this.deleteButton.on("click",$.proxy(this.functions.deleteTopic,this,this))},n.prototype.initAll=function(){$(this.Selectors_.EDIT_TOPIC).each(function(){this.EditTopic=new n(this)})};var a=function(t){this.button=$(t),this.menu=null,this.isTableDotMenu=!1,this.init()};a.prototype.Selectors_={DOT_MENU:".dot-menu",ACTIVATOR:".dot-menu__activator",IS_VISIBLE:".is-visible"},a.prototype.CssClasses_={IS_VISIBLE:"is-visible",BOTTOM_LEFT:"dot-menu--bottom-left",BOTTOM_RIGHT:"dot-menu--bottom-right",TOP_LEFT:"dot-menu--top-left",TOP_RIGHT:"dot-menu--top-right",TABLE_DOT_MENU:"dot-menu--table"},a.prototype.positionMenu=function(){var t=this.button[0].getBoundingClientRect();this.menu.hasClass(this.CssClasses_.BOTTOM_LEFT)?(this.menu.css("top",t.bottom),this.menu.css("left",t.left-parseInt(this.button.css("width"),10)),this.menu.css("transform-origin","top right")):this.menu.hasClass(this.CssClasses_.BOTTOM_RIGHT)?(this.menu.css("top",t.bottom),this.menu.css("left",t.left-120),this.menu.css("transform-origin","top left")):this.menu.hasClass(this.CssClasses_.TOP_LEFT)?(this.menu.css("top",t.top-150),this.menu.css("left",t.right-parseInt(this.button.css("width"),10)),this.menu.css("transform-origin","bottom right")):this.menu.hasClass(this.CssClasses_.TOP_RIGHT)?(this.menu.css("top",t.top-150),this.menu.css("left",t.left-120),this.menu.css("transform-origin","bottom left")):(this.menu.css("top",t.bottom),this.menu.css("transform-origin","top"))},a.prototype.show=function(){a.prototype.positionMenu.bind(this)(),this.menu.addClass(a.prototype.CssClasses_.IS_VISIBLE),this.menu.show()},a.prototype.hide=function(){this.menu.removeClass(a.prototype.CssClasses_.IS_VISIBLE),this.menu.hide()},a.prototype.toggle=function(){this.menu.hasClass(a.prototype.CssClasses_.IS_VISIBLE)?a.prototype.hide.bind(this)():a.prototype.show.bind(this)()},a.prototype.init=function(){var t=this,e=$(this.button).attr("id")+"-menu";this.menu=$("#"+e),this.isTableDotMenu=this.menu.hasClass(a.prototype.CssClasses_.TABLE_DOT_MENU),this.button.on("click",function(e){e.stopPropagation(),a.prototype.toggle.bind(t)()}),$(document).on("scroll",function(e){t.menu.hasClass(a.prototype.CssClasses_.IS_VISIBLE)&&a.prototype.positionMenu.bind(t)()}),$(window).on("resize",function(e){t.menu.hasClass(a.prototype.CssClasses_.IS_VISIBLE)&&a.prototype.positionMenu.bind(t)()}),$(document).on("click",function(e){var i=$(e.target);i.is(t.menu)&&i.is(t.button)||$.contains($(t.menu)[0],e.target)||a.prototype.hide.bind(t)()})},a.prototype.initAll=function(){$(this.Selectors_.ACTIVATOR).each(function(){this.DotMenu=new a(this)})};var r=function(){$("#2nd-marker-student-table").length<1||$("#2nd-marker-supervisor-table").length<1||(this.selectedStudent=null,this.selectedSupervisor=null,this.studentTable=$("#2nd-marker-student-table"),this.studentDataTable=this.studentTable[0].dataTable,this.supervisorTable=$("#2nd-marker-supervisor-table"),this.supervisorDataTable=this.supervisorTable[0].dataTable,this.init())};r.prototype.Urls_={ASSIGN_MARKER:"/admin/marker-assign"},r.prototype.selectStudent=function(t,e){var i=$(t);e.unselectAll(e),i.addClass("is-selected"),e.selectedStudent=$(i),$(e.supervisorDataTable.bodyRows).each(function(){$(this).data("marker-id")==i.data("supervisor-id")?$(this).attr("disabled",!0):$(this).attr("disabled",!1)})},r.prototype.selectSupervisor=function(t,e){var i=$(t);i.attr("disabled")||null!=e.selectedStudent&&(i.addClass("is-selected"),e.selectedSupervisor=i,r.prototype.showDialog(e.selectedStudent.data("student-name"),e.selectedStudent.data("supervisor-name"),i.data("marker-name"),e.selectedStudent.data("project")))},r.prototype.resetView=function(t){$(t.studentDataTable.bodyRows).removeClass("is-selected"),$(t.supervisorDataTable.bodyRows).removeClass("is-selected"),$(t.supervisorDataTable.bodyRows).attr("disabled",!0),t.selectedStudent=null,t.selectedSupervisor=null},r.prototype.unselectAll=function(t){$(t.studentDataTable.bodyRows).removeClass("is-selected"),$(t.supervisorDataTable.bodyRows).removeClass("is-selected")},r.prototype.showDialog=function(t,e,i,o){$("#student-name").text(t),$("#supervisor-name").text(e),$("#marker-name").text(i),$("#project-title").html("<b>Title: </b>"+o.title),$("#project-description").html("<b>Description: </b>"+o.description),$("#assign-dialog")[0].dialog.showDialog()},$("#submitAssignMarker").on("click",function(){var t=window.Marker;if(null!=t.selectedStudent&&null!=t.selectedSupervisor){$("#assign-dialog")[0].dialog.showLoader();var e=t.selectedStudent.data("project").id,i=t.selectedStudent.data("student-id"),o=t.selectedSupervisor.data("marker-id");$.ajax({type:"PATCH",url:t.Urls_.ASSIGN_MARKER,data:{project_id:e,student_id:i,marker_id:o},success:function(t){}}).done(function(e){$("#assign-dialog")[0].dialog.hideDialog(),$("#assign-dialog")[0].dialog.hideLoader(),t.selectedStudent.remove(),t.resetView(t)})}else $("#assign-dialog")[0].dialog.hideDialog()}),r.prototype.init=function(){var t=this;$(t.studentDataTable.bodyRows).on("click",function(){r.prototype.selectStudent(this,t)}),$(t.supervisorDataTable.bodyRows).on("click",function(){r.prototype.selectSupervisor(this,t)})},r.prototype.initAll=function(){window.Marker=new r},t.prototype.initAll(),e.prototype.initAll(),i.prototype.initAll(),o.prototype.initAll(),n.prototype.initAll(),r.prototype.initAll(),a.prototype.initAll()})}});