jQuery(function(){
    if ( jQuery('#hdnAlertID').length > 0) {
        jQuery('#hdnAlertID').attr('form',jQuery('form[id^="RegistrationForm"]').attr('id'));
        jQuery('#hdnAlertID').appendTo(jQuery('form[id^="RegistrationForm"]'));
    }

});
