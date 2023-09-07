
// Templating in JS https://wesbos.com/template-strings-html/
const sample_video_content_object = {
	iframe: '<iframe width="640" height="360" src="https://www.youtube.com/embed/ScMzIvxBSi4?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
}

const sample_content_object = {
	title: 'Sup Dude?',
	body: '<p>This is my body copy</p>'
}

var ddc_modal__debug = true;
var $modal = $('.ddc_modal');
var transition_time = 600;

// Log
if ( ddc_modal__debug ) {
	console.log( 'ddc_modal: layout.js loaded');
}

// Close button
$(document).on('click', '.ddc_modal__close, .ddc_modal__overlay', function(e){

	// Prevent default click
	e.preventDefault();

	// Find the parent modal
	var $modal = $(this).closest('.ddc_modal');

	ddc_modal__close( $modal );

});

// Trigger modal with a click
$(document).on('click', '[href="#ddc_modal"]', function(e){

	// Prevent default click
	e.preventDefault();

	var content_object = $(this).data();

	if ( ddc_modal__debug ) {
		console.log(content_object);
	}

	ddc_modal__show( content_object.modal_type, content_object );

});

// Classify Modal
function ddc_modal__classify( type, $thismodal ) {

	// Get global modal if not specified
	if ( !$thismodal ) {
		$thismodal = $modal;
	}

	// Clear modal type
	$thismodal.removeClass('ddc_modal--video');
	$thismodal.removeClass('ddc_modal--followup');
	$thismodal.removeClass('ddc_modal--landingpage');
	$thismodal.removeClass('ddc_modal--generic');

	if ( type ) {
		// Add type as class
		$thismodal.addClass( 'ddc_modal--' + type );
	}
}

function ddc_modal__set_transitioning( $thismodal ) {

	// Get global modal if not specified
	if ( !$thismodal ) {
		$thismodal = $modal;
	}

	// Log
	if ( ddc_modal__debug ) {
		console.log('ddc_modal: set transitioning');
	}


	// start transition
	$thismodal.addClass('ddc_modal--transitioning');

}

function ddc_modal__remove_transitioning( $thismodal ) {

	// Get global modal if not specified
	if ( !$thismodal ) {
		$thismodal = $modal;
	}

	// Log
	if ( ddc_modal__debug ) {
		console.log('ddc_modal: remove transitioning');
	}

	// start transition
	$thismodal.removeClass('ddc_modal--transitioning');

}

// Close function
function ddc_modal__close( $thismodal ) {

	// Get global modal if not specified
	if ( !$thismodal ) {
		$thismodal = $modal;
	}

	// Log
	if ( ddc_modal__debug ) {
		console.log('ddc_modal: close modal');
	}

	// If modal is not open, do nothing
	if ( ! $thismodal.hasClass('ddc_modal--shown') ) {
		return false;
	}

	// if thismodal not in transition
	if ( ! $thismodal.hasClass('ddc_modal--transitioning') ) {

		// start transition
		ddc_modal__set_transitioning( $thismodal );

		// Remove the shown class
		$thismodal.removeClass('ddc_modal--shown');

		// Wait transition miliseconds then remove content
		setTimeout(function(){

			// remove contents
			$thismodal.find('.ddc_modal__contents').each(function(){
				$(this).remove();
			});

			// Remove Transitioning
			ddc_modal__remove_transitioning( $thismodal );
			ddc_modal__classify( false, $thismodal );

		}, transition_time);

	}
}

function ddc_modal__show( type, content_object, $thismodal ){


	// Get global modal if not specified
	if ( !$thismodal ) {
		$thismodal = $modal;
	}

	// if no contents, or modal already visible do nothing
	// if ( ! content_object || $thismodal.hasClass('.ddc_modal--shown') ) {
	// 	return false;
	// }

	// if already shown, should hide and then show with new contents
	var shownTimeout = 0;

	// If is already shown
	if ( $thismodal.hasClass('ddc_modal--shown') ) {

		// close it
		ddc_modal__close( $thismodal );

		// set timeout equal to transition time
		shownTimeout = transition_time;
	}

	// Log
	if ( ddc_modal__debug ) {
		console.log('ddc_modal: show modal');
	}

	// Get markup for modal contents
	var modal_contents = ddc_modal__get_template( type, content_object );

	setTimeout( function() {
		// if thismodal not in transition, and there are contents to display
		if ( ! $thismodal.hasClass('ddc_modal--transitioning') && modal_contents ) {

			// start transition
			ddc_modal__set_transitioning( $thismodal );

			// Add contents
			$thismodal.find('.ddc_modal__contents__wrapper').each(function(){
				$(this).html( modal_contents );
			});

			// Classify
			ddc_modal__classify( type, $thismodal );

			// Show modal
			$thismodal.addClass( 'ddc_modal--shown' );

			// Remove Transitioning
			ddc_modal__remove_transitioning( $thismodal );
		}
	}, shownTimeout );


}

function ddc_modal__get_template( type, content_object ) {

	var markup = false;

	// If no content object, do nothing
	if ( ! content_object ) {
		return false;
	}

	switch(type){

		case 'generic':
			// if we have an iframe in the content_object, create the contents markup
			if ( content_object.body ){
					markup = '<div class="ddc_modal__contents">' + (content_object.title ? '<h1>' + content_object.title + '</h1>' : '') + '<div>' + content_object.body + '</div></div>';


				}
 else {
				if ( ddc_modal__debug ) {
					console.log( 'A body is required.');
				}
			}


			break;


		case 'video':

			// if we have an iframe in the content_object, create the contents markup
			if ( content_object.iframe ){
				markup ="<div class='ddc_modal__contents'><div class='ddc_modal__embed'>" + content_object.iframe + "</div></div>";
			} else {
				if ( ddc_modal__debug ) {
					console.log( 'A video modal type requires an iframe to be passed with the content_object.');
				}
			}

			break;

		default:

			break;
	}

	return markup;

}
