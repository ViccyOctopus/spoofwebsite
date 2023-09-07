//provide a callback mechanism to halt form submission
//and give developers a chance to inject other functionality
//ahead of form validation
var ADV_CC_HALT_FORM_SUBMISSION = false;
var ADV_CC_HALT_FORM_SUBMISSION_CALLBACKS = jQuery.Callbacks("unique");
//ADV_CC_HALT_FORM_SUBMISSION_CALLBACKS.add(myFunction);

//USAGE:
//* *************************USAGE******************************** */
//ADV_CC_HALT_FORM_SUBMISSION_CALLBACKS.add(myFunction);
// function myFunction() { 
//     var ADV_CC_HALT_FORM_SUBMISSION = true;
//}
//the "myFunction" method should set the global 
//ADV_CC_HALT_FORM_SUBMISSION variable to true if the intent
//is to halt form submission
//* *************************USAGE******************************** */

//any of our forms should prevent the user
//from double-clicking upon form submission
jQuery(document).ready(function() {
    jQuery('input.adv-capconnect').parents('form').on('submit', function(e) {

        //any callbacks will fire pre-validation
        if (ADV_CC_HALT_FORM_SUBMISSION_CALLBACKS.has()) {
            ADV_CC_HALT_FORM_SUBMISSION_CALLBACKS.fire(this, e);
        }

        if (ADV_CC_HALT_FORM_SUBMISSION) {
            //reset the global variable for the next attempt
            ADV_CC_HALT_FORM_SUBMISSION = false;
            return;
        }

        if (jQuery(this).valid()) {
            jQuery(this).find('input[type="submit"]').css('pointer-events', 'none');
        }

        //reset the global variable for the next attempt
        ADV_CC_HALT_FORM_SUBMISSION = false;
    });
});