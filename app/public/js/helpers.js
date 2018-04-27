"use strict";function createToast(e,t){$(".toast").remove();var a=$(toastHtmlSnippet).appendTo("body");$(a).html("<p>"+t+"</p>"),$(a).addClass("notification "+e),setTimeout(function(){$(a).remove()},3e3)}function removeAllShadowClasses(e){$(e).removeClass(function(e,t){return(t.match(/\bshadow\-\S+/g)||[]).join(" ")})}function sortUnorderedList(e){var t=e.children("li").get();t.sort(function(e,t){return $(e).text().toUpperCase().localeCompare($(t).text().toUpperCase())}),$.each(t,function(t,a){e.append(a)})}function addLastNameHeadersToList(e){for(var t=e.children("li").get(),a=$("#"+e.attr("id")+"-links"),r=0;r<t.length;r++){var i=$(t[r]).text(),o=i.toUpperCase().split(" "),n=o[o.length-1].charAt(0);if(0!=r){var s=$(t[r-1]).text(),l=s.toUpperCase().split(" ");n!=l[l.length-1].charAt(0)&&($(t[r]).before("<li class='alpha-header' id='"+e.attr("id")+"-"+n+"'><h3>"+n+"</h3</li>"),a.append("<a href='#"+e.attr("id")+"-"+n+"'>"+n+"</a>"))}else $(t[r]).before("<li class='alpha-header' id='"+e.attr("id")+"-"+n+"'><h3>"+n+"</h3</li>"),a.append("<a href='#"+e.attr("id")+"-"+n+"'>"+n+"</a>")}}function addAlphaHeadersToList(e){for(var t=e.children("li").get(),a=$("#"+e.attr("id")+"-links"),r=0;r<t.length;r++){var i=$(t[r]).text().replace(/\s/g,"").charAt(0).toUpperCase();if(0!=r){i!=$(t[r-1]).text().replace(/\s/g,"").charAt(0).toUpperCase()&&($(t[r]).before("<li class='alpha-header' id='"+e.attr("id")+"-"+i+"'><h3>"+i+"</h3</li>"),a.append("<a href='#"+e.attr("id")+"-"+i+"'>"+i+"</a>"))}else $(t[r]).before("<li class='alpha-header' id='"+e.attr("id")+"-"+i+"'><h3>"+i+"</h3</li>"),a.append("<a href='#"+e.attr("id")+"-"+i+"'>"+i+"</a>")}}function addTitleHeadersToList(e){for(var t=e.children("li").get(),a=$("#"+e.attr("id")+"-links"),r=0;r<t.length;r++){var i=$(t[r]).text(),o=/[^[, ]*]*/.exec(i)[0].toUpperCase().replace(/\s/g,"");if(0!=r){o!=/[^[, ]*]*/.exec($(t[r-1]).text())[0].toUpperCase().replace(/\s/g,"")&&($(t[r]).before("<li class='alpha-header' id='"+e.attr("id")+"-"+o+"'><h3>"+o+"</h3</li>"),a.append("<a href='#"+e.attr("id")+"-"+o+"'>"+o+"</a>"))}else $(t[r]).before("<li class='alpha-header' id='"+e.attr("id")+"-"+o+"'><h3>"+o+"</h3</li>"),a.append("<a href='#"+e.attr("id")+"-"+o+"'>"+o+"</a>")}}function setCookie(e,t,a){var r=new Date;r.setTime(r.getTime()+24*a*60*60*1e3);var i="expires="+r.toUTCString();document.cookie=e+"="+t+";"+i+";path=/"}function getCookie(e){for(var t=e+"=",a=document.cookie.split(";"),r=0;r<a.length;r++){for(var i=a[r];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(t))return i.substring(t.length,i.length)}return null}function formCookie(e){var t={};$(".remember-with-cookie:"+e).each(function(){t[this.id]=this.checked})}function rememberFormValues(e){var t={};$(".remember-with-cookie:"+e).each(function(){t[this.id]=this.checked}),"undefined"!=typeof Storage?sessionStorage.setItem("rwc-"+e,JSON.stringify(t)):setCookie("rwc-"+e,JSON.stringify(t),365)}function repopulateCheckboxes(){if("undefined"!=typeof Storage)var e=JSON.parse(sessionStorage.getItem("rwc-checkbox"));if(null==e&&null!=getCookie("rwc-checkbox"))var e=JSON.parse(getCookie("rwc-checkbox"));null!=e&&Object.keys(e).forEach(function(t){var a=e[t];$("#"+t).prop("checked",a)})}function insertAtCaret(e,t){var a=document.getElementById(e);if(a&&t){var r=a.scrollTop,i=a.selectionStart,o=a.value.substring(0,i),n=a.value.substring(i,a.value.length);a.value=o+t+n,i+=t.length,a.selectionStart=i,a.selectionEnd=i,$(a).trigger("change"),a.focus(),a.scrollTop=r}}function wrapTextWithTag(e,t){var a=document.getElementById(e);if(a&&t){var r=a.scrollTop,i="<"+t+">",o="</"+t+">",n=a.selectionStart+i.length,s=a.selectionEnd+o.length-1,l=a.value.substring(0,a.selectionStart),c=a.value.substring(a.selectionEnd,a.value.length),d=a.value.substring(a.selectionStart,a.selectionEnd);a.value=l+i+d+o+c,$(a).trigger("change"),a.focus(),a.selectionStart=n,a.selectionEnd=s,a.scrollTop=r}}function sortTable(e,t){var a,r,i,o,n,s,l,c=0;for(e instanceof jQuery||(e=$(e)),t instanceof jQuery||(t=$(t)),r=!0,l="asc";r;){for(r=!1,a=t.find("TR"),i=1;i<a.length-1;i++)if(s=!1,o=$(a[i]).find("TD").get(e.index()),n=$(a[i+1]).find("TD").get(e.index()),"asc"==l){if(o.innerHTML.toLowerCase()>n.innerHTML.toLowerCase()){s=!0;break}}else if("desc"==l&&o.innerHTML.toLowerCase()<n.innerHTML.toLowerCase()){s=!0;break}s?($(a[i]).before($(a[i+1])),r=!0,c++):0==c&&"asc"==l&&(l="desc",r=!0)}}var config={animtions:{slow:400,medium:300,fast:200,superFast:100},mobileWidth:970,showHelpFooter:!0,fancyAnimations:!0,showScrollToTopButtonOffset:50,scrollToTopDuration:600,showAjaxRequestFailNotification:!0,tapHeldTime:500};window.config=config;const toastHtmlSnippet='<div class="toast" role="alert"></div>';