!function(t){function e(o){if(i[o])return i[o].exports;var s=i[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=9)}({10:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(11);i.n(o);$(function(){$.ajaxSetup({headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}}),$(".show--scroll-to-top").length>0&&$(".main-content").append('<button class="button button--raised button--accent scroll-to-top">Scroll to Top</button>'),$(".dropdown").attr("tabindex","0"),$(".dropdown > button").attr("tabindex","-1"),$(".dropdown .dropdown-content a").attr("tabindex","0"),$(".topics-list").prepend($(".first")),$(".topics-list .loader").fadeOut(0),$(".topics-list li").first().fadeIn(config.animtions.fast,function t(){$(this).next(".topics-list li").fadeIn(config.animtions.fast,t)}),$(".order-list-js").each(function(){var t=$(this);if(t.hasClass("last-name-header-list-js")){if(!t.attr("id"))return;t.before('<div class="header-links" id="'+t.attr("id")+'-links"></div>'),addLastNameHeadersToList(t)}if(t.hasClass("alpha-header-list-js")){if(!t.attr("id"))return;t.before('<div class="header-links" id="'+t.attr("id")+'-links"></div>'),addAlphaHeadersToList(t)}if(t.hasClass("title-header-list-js")){if(!t.attr("id"))return;t.before('<div class="header-links" id="'+t.attr("id")+'-links"></div>'),addTitleHeadersToList(t)}}),$("body").on("change",".email-table .checkbox input",function(){setTimeout(function(t){var e=t.parents().eq(4).data("status"),i="mailto:",o=".email-table."+e+" .checkbox input",s=".email-selected."+e;$(o).each(function(t,e){$(e).is(":checked")&&!$(e).hasClass("master-checkbox")&&(i+=$(e).data("email"),i+=",")}),$(s).prop("href",i)}($(this)),2e3)}),$("body").on("click",".email-selected",function(t){"mailto:"!==$(this).prop("href")&&null!==$(this).prop("href")||(alert("You haven't selected anyone."),t.preventDefault())}),$("body").on("click",".external-link",function(t){var e=$($(this).data("element-to-hide-selector")),i=$($(this).data("element-to-replace-with-loader-selector"));$(this).removeClass("active"),e.hide(),i.hide(),i.after('<div id="content-replaced-container" class="loader loader--x-large"></div>'),$("#content-replaced-container").css("display","block")}),$("#share-project-form").on("submit",function(t){t.preventDefault(),$.ajax({url:$(this).prop("action"),type:"PATCH",data:$(this).serialize(),success:function(t){t=JSON.parse(t),t.share_name?showNotification("success","Your name is being shared with other students."):showNotification("","You are no longer sharing your name with other students."),$("#share_name").prop("checked",t.share_name)}})}),$("#loginForm").on("submit",function(t){t.preventDefault(),$(".help-block","#loginForm").css("display","none"),$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.showLoader(),$.ajax({url:$(this).prop("action"),type:"POST",data:$(this).serialize(),success:function(){$(".help-block",AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).hide(),location.reload(!0)},error:function(t){$(AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG)[0].dialog.hideLoader(),$(".help-block",AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).show(),$("#login-username",AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).addClass("has-error"),$(".help-block",AjaxFunctions.prototype.Selectors_.LOG_IN_DIALOG).text(t.responseJSON.errors.username[0])}})}),$("#new-topic-form").on("submit",function(t){t.preventDefault();var e=$(this).find(":submit");e.html('<div class="loader"></div>'),$(".loader",e).css("display","block"),$.ajax({url:$(this).prop("action"),type:"POST",context:$(this),data:$(this).serialize(),success:function(t){t=JSON.parse(t),EditTopic.prototype.functions.createEditTopicDOM(t.id,t.name)}}).done(function(){$(this).find("input").val(""),$(this).find(":submit").html("Add")})}),$(".favourite-container").on("click",function(){var t=$(this),e=t.find("svg"),i=window.project.data("project-id");if(e.hide(0),$(".loader",t).show(0),e.hasClass("favourite"))var o="remove",s="/students/remove-favourite";else var o="add",s="/students/add-favourite";$.ajax({url:s,type:"PATCH",data:{project_id:i},success:function(){"add"==o?e.addClass("favourite"):e.removeClass("favourite")}}).done(function(i){e.fadeIn(config.animtions.fast),$(".loader",t).hide(0)})}),$("nav.mobile .sub-dropdown").on("click",function(){var t=$(this),e=t.find(".dropdown-content");"true"==t.attr("aria-expanded")?(t.attr("aria-expanded",!1),e.attr("aria-hidden",!0),t.find(".svg-container svg").css("transform","rotateZ(0deg)"),t.removeClass("active"),e.hide(config.animtions.medium)):(t.attr("aria-expanded",!0),e.attr("aria-hidden",!1),t.find(".svg-container svg").css("transform","rotateZ(180deg)"),t.addClass("active"),e.show(config.animtions.medium))}),$(".html-editor").each(function(t,e){$.ajax({url:"/snippet?snippet=html-editor-toolbar",type:"GET",success:function(t){$(".html-editor--input").after(t)}});$(".html-editor--input").before("<div class='html-editor--top-buttons flex'><button class='html' type='button'>HTML</button><button class='preview' type='button'>PREVIEW</button></div>"),$(".html-editor").after("<div class='html-editor--preview-container'><div class='html-editor--preview'></div></div>"),$(".html-editor--preview-container").hide(),$(".html-editor--preview").html($(".html-editor--input").val())}),$(".html-editor--input").on("change",function(){$(".html-editor--preview").html($(this).val())}),$(".html-editor--top-buttons .html").on("click",function(){$(".html-editor--input").show(),$(".html-editor--toolbar").show(),$(".html-editor--preview-container").hide()}),$(".html-editor--top-buttons .preview").on("click",function(){$(".html-editor--input").hide(),$(".html-editor--toolbar").hide(),$(".html-editor--preview-container").show()}),$(".html-editor").on("click",".html-editor--toolbar li button",function(t){switch($(this).data("type")){case"linebreak":insertAtCaret("html-editor--input","<br>");break;case"ol":insertAtCaret("html-editor--input","\n<ol>\n\t<li>Item 1</li>\n\t<li>Item 2</li>\n\t<li>Item 3</li>\n</ol>");break;case"ul":insertAtCaret("html-editor--input","\n<ul>\n\t<li>Item x</li>\n\t<li>Item y</li>\n\t<li>Item z</li>\n</ul>");break;case"bold":wrapTextWithTag("html-editor--input","b");break;case"italic":wrapTextWithTag("html-editor--input","i");break;case"underline":wrapTextWithTag("html-editor--input","u");break;case"img":var e=prompt("Enter the image URL","https://www."),i=prompt("Enter alt text","Image of Sussex campus");insertAtCaret("html-editor--input",'<img alt="'+i+'" src="'+e+'">');break;case"link":var e=prompt("Enter the URL","https://www."),o=prompt("Enter display text","Sussex");insertAtCaret("html-editor--input",'<a href="'+e+'">'+o+"</a>");break;case"code":wrapTextWithTag("html-editor--input","code");break;case"pre":wrapTextWithTag("html-editor--input","pre");break;case"info":$.dialog({theme:"material",escapeKey:!0,animateFromElement:!1,backgroundDismiss:!0,title:"HTML Editor Info",content:"All HTML 5 elements are valid for the description field, excluding; <br><br> <ul><li>Script tags</li><li>Heading tags</li></ul>"})}}),$(".project-card").length>0&&(window.project=$(".project-card")),$(".animate-cards .card").css("opacity",0);var t=0;$(".animate-cards .card").each(function(e,i){t+=200,setTimeout(function(){$(this).animate({opacity:1},400),$(this).addClass("slideInUp animated")}.bind(this),t)})}),$(document).ajaxError(function(t,e,i){config.showAjaxRequestFailNotification&&showNotification("error","Something went wrong with that request.")})},11:function(t,e,i){"use strict";function o(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}$(function(){var t=function(t){null==window.MobileMenu&&(window.MobileMenu=this,this.element=$(t),this.activator=$(this.Selectors_.HAMBURGER_CONTAINER),this.underlay=$(this.Selectors_.UNDERLAY),this.init())};t.prototype.CssClasses_={IS_VISIBLE:"is-visible"},t.prototype.Selectors_={MOBILE_MENU:"nav.mobile",HAMBURGER_CONTAINER:".hamburger-container",UNDERLAY:".mobile-nav-underlay"},t.prototype.openMenu=function(){this.activator.attr("aria-expanded","true"),this.element.addClass(this.CssClasses_.IS_VISIBLE),this.underlay.attr("aria-hidden","false"),this.underlay.addClass(this.CssClasses_.IS_VISIBLE)},t.prototype.closeMenu=function(){this.activator.attr("aria-expanded","false"),this.element.removeClass(this.CssClasses_.IS_VISIBLE),this.underlay.attr("aria-hidden","true"),this.underlay.removeClass(this.CssClasses_.IS_VISIBLE)},t.prototype.init=function(){var t=this;this.activator.on("click",t.openMenu.bind(t)),this.underlay.on("click",t.closeMenu.bind(t))},t.prototype.initAll=function(){$(this.Selectors_.MOBILE_MENU).each(function(){this.mobileMenu=new t(this)})};var e=function(t){this.element=$(t),this.dialogName=$(t).data("dialog"),this.underlay=$(".underlay"),this.header=$(t).find(this.Selectors_.DIALOG_HEADER),this.content=$(t).find(this.Selectors_.DIALOG_CONTENT),this.element.addClass("registered"),this.element.attr("role","dialog"),this.element.attr("aria-labelledby","dialog-title"),this.element.attr("aria-describedby","dialog-desc"),this.header.attr("title",this.header.find("#dialog-desc").html()),this.content.before(this.HtmlSnippets_.LOADER),this.loader=$(t).find(".loader"),this.isClosable=!0,this.activatorButtons=[],this.init()};e.prototype.HtmlSnippets_={LOADER:'<div class="loader" style="width: 100px; height: 100px;top: 25%;"></div>'},e.prototype.CssClasses_={ACTIVE:"active"},e.prototype.Selectors_={DIALOG:".dialog",DIALOG_HEADER:".header",DIALOG_CONTENT:".content"},e.prototype.showLoader=function(){this.loader.show(0),this.content.hide(0)},e.prototype.hideLoader=function(){this.loader.hide(0),this.content.show(0)},e.prototype.showDialog=function(){this.element.attr("aria-hidden","false"),this.underlay.addClass(this.CssClasses_.ACTIVE),this.underlay.data("owner",this.dialogName),this.element.addClass(this.CssClasses_.ACTIVE),window.Dialog=this,window.MobileMenu.closeMenu()},e.prototype.hideDialog=function(){this.isClosable&&this.underlay.data("owner")==this.dialogName&&(this.element.attr("aria-hidden","true"),this.underlay.removeClass(this.CssClasses_.ACTIVE),this.element.removeClass(this.CssClasses_.ACTIVE))},e.prototype.init=function(){var t=this;$("button").each(function(){$(this).data("activator")&&$(this).data("dialog")==t.dialogName&&t.activatorButtons.push($(this))}),t.element.attr("aria-hidden","true"),t.underlay.on("click",t.hideDialog.bind(t));try{$(t.activatorButtons).each(function(){$(this).on("click",t.showDialog.bind(t))})}catch(t){}},e.prototype.initAll=function(){$(this.Selectors_.DIALOG).each(function(){this.dialog=new e(this)})},$(document).ready(function(){$(this).keydown(function(t){27==t.keyCode&&null!=window.Dialog&&window.Dialog.hideDialog(),27==t.keyCode&&null!=window.MobileMenu&&window.MobileMenu.closeMenu()})});var i=function(t){this.element=$(t),this.headers=$(t).find("thead tr th"),this.bodyRows=$(t).find("tbody tr"),this.footRows=$(t).find("tfoot tr"),this.rows=$.merge(this.bodyRows,this.footRows),this.checkboxes=$(t).find(this.Selectors_.CHECKBOX),this.masterCheckbox=$(t).find(this.Selectors_.MASTER_CHECKBOX),this.init()};window.DataTable=i,i.prototype.CssClasses_={DATA_TABLE:"data-table",IS_SELECTED:"is-selected"},i.prototype.Selectors_={DATA_TABLE:".data-table",MASTER_CHECKBOX:"thead .master-checkbox",CHECKBOX:"tbody .checkbox-input",IS_SELECTED:".is-selected"},i.prototype.functions={selectAllRows:function(){this.masterCheckbox.is(":checked")?(this.rows.addClass(i.prototype.CssClasses_.IS_SELECTED),this.checkboxes.prop("checked",!0)):(this.rows.removeClass(i.prototype.CssClasses_.IS_SELECTED),this.checkboxes.prop("checked",!1))},selectRow:function(t,e){e&&(t.is(":checked")?e.addClass(i.prototype.CssClasses_.IS_SELECTED):e.removeClass(i.prototype.CssClasses_.IS_SELECTED))}},i.prototype.init=function(){var t=this;this.masterCheckbox.on("change",$.proxy(this.functions.selectAllRows,t)),$(this.checkboxes).each(function(e){$(this).on("change",$.proxy(t.functions.selectRow,this,$(this),t.bodyRows.eq(e)))})},i.prototype.initAll=function(){$(this.Selectors_.DATA_TABLE).each(function(){this.dataTable=new i(this)})};var s=function(t){this.element=$(t),this.head=$(t).find("thead tr"),this.headers=$(t).find("thead tr th"),this.bodyRows=$(t).find("tbody tr"),this.selectorMenu=null,this.selectorButton=null,this.init()};window.ColumnToggleTable=s,s.prototype.CssClasses_={DATA_TABLE:"data-table",IS_SELECTED:"is-selected"},s.prototype.Selectors_={TOGGLE_TABLE:".table-column-toggle"},s.prototype.HtmlSnippets_={COLUMN_SELECTOR_BUTTON:'<button class="button button--raised dot-menu__activator" style="display:block;margin-top:2rem;margin-left:auto;">Columns</button>',COLUMN_SELECTOR_MENU:'<ul class="dot-menu dot-menu--bottom-left"></ul>'},s.prototype.functions={toggleColumn:function(t,e,i){i?(e.head.children().eq(t).removeAttr("hidden"),e.head.children().eq(t).show()):(e.head.children().eq(t).attr("hidden","true"),e.head.children().eq(t).hide()),e.bodyRows.each(function(){i?$(this).children().eq(t).show():$(this).children().eq(t).hide()})},refresh:function(t){var e=[];t.bodyRows=t.element.find("tbody tr"),t.headers.each(function(){$(this).attr("hidden")&&e.push($(this).index())}),t.bodyRows.each(function(){for(var t=0;t<e.length;t++)$(this).children().eq(e[t]).hide()})},refreshAll:function(){$(s.prototype.Selectors_.TOGGLE_TABLE).each(function(){s.prototype.functions.refresh(this.ColumnToggleTable)})}},s.prototype.init=function(){if(this.element.attr("id")){var t=this,e=$(this.HtmlSnippets_.COLUMN_SELECTOR_BUTTON),i=$(this.HtmlSnippets_.COLUMN_SELECTOR_MENU),o="ColumnToggleTable-"+t.element.attr("id");this.element.before(e),e.after(i),e.attr("id",o),i.attr("id",o+"-menu"),this.selectorButton=e,this.selectorMenu=i,this.selectorMenu.find("ul").data("table",t.element.attr("id")),this.headers.each(function(){var t=$(this).data("default")?"checked":"";$(this).data("visible",$(this).data("default")),i.append('\t\t\t\t<li class="dot-menu__item dot-menu__item--padded"> \t\t\t\t\t<div class="checkbox"> \t\t\t\t\t\t<input class="column-toggle" id="column-'+$(this).text()+'" type="checkbox" '+t+'> \t\t\t\t\t\t<label for="column-'+$(this).text()+'">'+$(this).text()+"</label> \t\t\t\t\t</div> \t\t\t\t</li>")}),$("body").on("change",".column-toggle",function(){var e=$(".column-toggle").index(this);s.prototype.functions.toggleColumn(e,t,$(this).prop("checked"))})}},s.prototype.initAll=function(){$(this.Selectors_.TOGGLE_TABLE).each(function(){this.ColumnToggleTable=new s(this)})};var n=function(){};window.AjaxFunctions=n,n.prototype.CssClasses_={DATA_TABLE:"data-table",IS_SELECTED:"is-selected"},n.prototype.Selectors_={SEARCH_INPUT:".search-input",SEARCH_CONTAINER:".search-container",SEARCH_FILTER_CONTAINER:".search-filter-container",SEARCH_FILTER_BUTTON:"#search-filter-button",LOG_IN_DIALOG:".login.dialog"},n.prototype.Keys_={SPACE:32,ENTER:13,COMMA:45},$(n.prototype.Selectors_.SEARCH_INPUT).on("focus",function(t){removeAllShadowClasses(n.prototype.Selectors_.SEARCH_CONTAINER),$(n.prototype.Selectors_.SEARCH_CONTAINER).addClass("shadow-focus")}),$(n.prototype.Selectors_.SEARCH_INPUT).on("focusout",function(t){removeAllShadowClasses(n.prototype.Selectors_.SEARCH_CONTAINER),$(n.prototype.Selectors_.SEARCH_CONTAINER).addClass("shadow-2dp")}),$(n.prototype.Selectors_.SEARCH_FILTER_BUTTON).on("click",function(){var t=$(n.prototype.Selectors_.SEARCH_FILTER_CONTAINER),e=$(this);t.hasClass("active")?(t.removeClass("active"),e.removeClass("active"),e.blur()):(t.addClass("active"),e.addClass("active"))});var a=function(t){this.element=$(t),this.originalName=$(t).data("original-topic-name"),this.topicId=$(t).data("topic-id"),this.topicNameInput=$(t).find("input"),this.editButton=$(t).find(".edit-topic"),this.deleteButton=$(t).find(".delete-topic"),this.init()};window.EditTopic=a,a.prototype.Selectors_={EDIT_TOPIC:".edit-topic-list .topic"},a.prototype.Urls_={DELETE_TOPIC:"/topics/",PATCH_TOPIC:"/topics/",NEW_TOPIC:"/topics/"},a.prototype.functions={editTopic:function(){var t=this;t.originalName!=t.topicNameInput.val()&&$.confirm(o({title:"Change Topic Name",type:"blue",icon:'<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',theme:"modern",escapeKey:!0,backgroundDismiss:!0,animateFromElement:!1,content:'Are you sure you want to change the topic name from <b>"'+t.originalName+'"</b> to <b>"'+t.topicNameInput.val()+'"</b>?',buttons:{confirm:{btnClass:"btn-blue",action:function(){t.topicNameInput.prop("disabled",!0),t.editButton.html('<div class="loader"></div>'),$(".loader",t.element).css("display","block"),$.ajax({method:"PATCH",url:t.Urls_.DELETE_TOPIC,context:t,data:{topic_id:t.topicId,topic_name:t.topicNameInput.val()}}).done(function(){t.topicNameInput.prop("disabled",!1),t.editButton.html("Edit"),t.originalName=t.topicNameInput.val()})}},cancel:function(){t.topicNameInput.val(t.originalName)}}},"backgroundDismiss",function(){t.topicNameInput.val(t.originalName)}))},deleteTopic:function(){var t=this;$.confirm({title:"Delete",type:"red",icon:'<div class="svg-container"><svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>',theme:"modern",escapeKey:!0,backgroundDismiss:!0,animateFromElement:!1,content:'Are you sure you want to delete <b>"'+t.topicNameInput.val()+'"</b>?',buttons:{delete:{btnClass:"btn-red",action:function(){t.topicNameInput.prop("disabled",!0),$.ajax({method:"DELETE",url:t.Urls_.DELETE_TOPIC,context:t,data:{topic_id:t.topicId},success:function(){t.element.hide(config.animtions.slow,function(){t.remove()})}})}}}})},createEditTopicDOM:function(t,e){$(".edit-topic-list").prepend('<li class="topic" data-topic-id="'+t+'" data-original-topic-name="'+e+'"><input spellcheck="true" name="name" type="text" value="'+e+'"><button class="button edit-topic" type="submit">Edit</button><button class="button delete-topic button--danger">Delete</button></li>'),a.prototype.initAll()}},a.prototype.init=function(){var t=this;this.editButton.on("click",$.proxy(this.functions.editTopic,this,t)),this.deleteButton.on("click",$.proxy(this.functions.deleteTopic,this,t))},a.prototype.initAll=function(){$(this.Selectors_.EDIT_TOPIC).each(function(){this.EditTopic=new a(this)})};var r=function(t){this.button=$(t),this.menu=null,this.isTableDotMenu=!1,this.init()};r.prototype.Selectors_={DOT_MENU:".dot-menu",ACTIVATOR:".dot-menu__activator",IS_VISIBLE:".is-visible"},r.prototype.CssClasses_={IS_VISIBLE:"is-visible",BOTTOM_LEFT:"dot-menu--bottom-left",BOTTOM_RIGHT:"dot-menu--bottom-right",TOP_LEFT:"dot-menu--top-left",TOP_RIGHT:"dot-menu--top-right",TABLE_DOT_MENU:"dot-menu--table"},r.prototype.positionMenu=function(){var t=this.button[0].getBoundingClientRect();this.menu.hasClass(this.CssClasses_.BOTTOM_LEFT)?(this.menu.css("top",t.bottom),this.menu.css("left",t.left-parseInt(this.button.css("width"),10)),this.menu.css("transform-origin","top right")):this.menu.hasClass(this.CssClasses_.BOTTOM_RIGHT)?(this.menu.css("top",t.bottom),this.menu.css("left",t.left-120),this.menu.css("transform-origin","top left")):this.menu.hasClass(this.CssClasses_.TOP_LEFT)?(this.menu.css("top",t.top-150),this.menu.css("left",t.right-parseInt(this.button.css("width"),10)),this.menu.css("transform-origin","bottom right")):this.menu.hasClass(this.CssClasses_.TOP_RIGHT)?(this.menu.css("top",t.top-150),this.menu.css("left",t.left-120),this.menu.css("transform-origin","bottom left")):(this.menu.css("top",t.bottom),this.menu.css("transform-origin","top"))},r.prototype.show=function(){r.prototype.positionMenu.bind(this)(),this.menu.addClass(r.prototype.CssClasses_.IS_VISIBLE),this.menu.show()},r.prototype.hide=function(){this.menu.removeClass(r.prototype.CssClasses_.IS_VISIBLE),this.menu.hide()},r.prototype.toggle=function(){this.menu.hasClass(r.prototype.CssClasses_.IS_VISIBLE)?r.prototype.hide.bind(this)():r.prototype.show.bind(this)()},r.prototype.init=function(){var t=this,e=$(this.button).attr("id")+"-menu";this.menu=$("#"+e),this.isTableDotMenu=this.menu.hasClass(r.prototype.CssClasses_.TABLE_DOT_MENU),this.button.on("click",function(e){e.stopPropagation(),r.prototype.toggle.bind(t)()}),$(document).on("scroll",function(e){t.menu.hasClass(r.prototype.CssClasses_.IS_VISIBLE)&&r.prototype.positionMenu.bind(t)()}),$(window).on("resize",function(e){t.menu.hasClass(r.prototype.CssClasses_.IS_VISIBLE)&&r.prototype.positionMenu.bind(t)()}),$(document).on("click",function(e){var i=$(e.target);i.is(t.menu)&&i.is(t.button)||$.contains($(t.menu)[0],e.target)||r.prototype.hide.bind(t)()})},r.prototype.initAll=function(){$(this.Selectors_.ACTIVATOR).each(function(){this.DotMenu=new r(this)})};var l=function(){$("#2nd-marker-student-table").length<1||$("#2nd-marker-supervisor-table").length<1||(this.selectedStudent=null,this.selectedSupervisor=null,this.studentTable=$("#2nd-marker-student-table"),this.studentDataTable=this.studentTable[0].dataTable,this.supervisorTable=$("#2nd-marker-supervisor-table"),this.supervisorDataTable=this.supervisorTable[0].dataTable,this.init())};l.prototype.Urls_={ASSIGN_MARKER:"/admin/marker-assign"},l.prototype.selectStudent=function(t,e){var i=$(t);e.unselectAll(e),i.addClass("is-selected"),e.selectedStudent=$(i),$(e.supervisorDataTable.bodyRows).each(function(){$(this).data("marker-id")==i.data("supervisor-id")?$(this).attr("disabled",!0):$(this).attr("disabled",!1)})},l.prototype.selectSupervisor=function(t,e){var i=$(t);i.attr("disabled")||null!=e.selectedStudent&&(i.addClass("is-selected"),e.selectedSupervisor=i,l.prototype.showDialog(e.selectedStudent.data("student-name"),e.selectedStudent.data("supervisor-name"),i.data("marker-name"),e.selectedStudent.data("project")))},l.prototype.resetView=function(t){$(t.studentDataTable.bodyRows).removeClass("is-selected"),$(t.supervisorDataTable.bodyRows).removeClass("is-selected"),$(t.supervisorDataTable.bodyRows).attr("disabled",!0),t.selectedStudent=null,t.selectedSupervisor=null},l.prototype.unselectAll=function(t){$(t.studentDataTable.bodyRows).removeClass("is-selected"),$(t.supervisorDataTable.bodyRows).removeClass("is-selected")},l.prototype.showDialog=function(t,e,i,o){$("#student-name").text(t),$("#supervisor-name").text(e),$("#marker-name").text(i),$("#project-title").html("<b>Title: </b>"+o.title),$("#project-description").html("<b>Description: </b>"+o.description),$("#assign-dialog")[0].dialog.showDialog()},$("#submitAssignMarker").on("click",function(){var t=window.Marker;if(null==t.selectedStudent||null==t.selectedSupervisor)return void $("#assign-dialog")[0].dialog.hideDialog();$("#assign-dialog")[0].dialog.showLoader();var e=t.selectedStudent.data("project").id,i=t.selectedStudent.data("student-id"),o=t.selectedSupervisor.data("marker-id");$.ajax({type:"PATCH",url:t.Urls_.ASSIGN_MARKER,data:{project_id:e,student_id:i,marker_id:o},success:function(t){}}).done(function(e){$("#assign-dialog")[0].dialog.hideDialog(),$("#assign-dialog")[0].dialog.hideLoader(),t.selectedStudent.remove(),t.resetView(t)})}),l.prototype.init=function(){var t=this;$(t.studentDataTable.bodyRows).on("click",function(){l.prototype.selectStudent(this,t)}),$(t.supervisorDataTable.bodyRows).on("click",function(){l.prototype.selectSupervisor(this,t)})},l.prototype.initAll=function(){window.Marker=new l},t.prototype.initAll(),e.prototype.initAll(),i.prototype.initAll(),s.prototype.initAll(),a.prototype.initAll(),l.prototype.initAll(),r.prototype.initAll()})},9:function(t,e,i){t.exports=i(10)}});
//# sourceMappingURL=main.js.map