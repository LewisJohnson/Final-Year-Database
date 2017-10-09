import {Swappable} from '@shopify/draggable';


$(function() { 
	const swappable = new Swappable(document.querySelectorAll('ul'), {
	  draggable: '.topic',
	});

	// swappable.on('swappable:start', () => console.log('swappable:start'))
	// swappable.on('swappable:swapped', () => console.log('swappable:swapped'));
	swappable.on('swappable:stop', function(){
		
	});

	$("#editProjectForm").submit(function( event ) {
		updatePrimaryTopicAjax($(".topics-list.edit li:first-child .topic-name").text());
	});

});

function updatePrimaryTopicAjax(topic){
	$.ajax({
		type: "PATCH",
		url: "edit/topic",
		data: {topic : topic},
	});
}