!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=24)}({24:function(e,t,n){e.exports=n(25)},25:function(e,t){$(function(){"use strict";var e=$("#supervisor-report-search-button"),t=$("#supervisor-report-search-input");function n(){var e=$("#"+t.val().replace(/[\s.]+/g,""));e.length<1?createToast("error",'Supervisor "'+t.val()+'" can not be found.'):(e.removeClass("animated shake"),$("html, body").animate({scrollTop:e.offset().top-150},600,function(){e.addClass("animated shake"),e.focus()})),t.val("")}$(e).on("click",function(){n()}),$(document).keyup(function(e){t.is(":focus")&&13===e.keyCode&&n()})})}});