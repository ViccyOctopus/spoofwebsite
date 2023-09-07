$(document).ready(function(){


	// target the handle of every accordion item
	// on click of the handle
	$('.ddc_accordion__item__handle').on('click', function(){
		//find the parent accordion item
		var $parent = $(this).closest('.ddc_accordion__item');

		// toggle ddc_accordion__item--open class
		$parent.toggleClass('ddc_accordion__item--open');

	});

});