jQuery(function() {
    jQuery('.step-one-b form[id^="EditMyProfileForm"] [type="submit"]').val('SEND YOUR LETTER');
    jQuery('.page.additionalinformation [type="submit"]').val('SEND YOUR LETTER');

    jQuery('#homeaddress2').attr('placeholder','Optional');

    jQuery('#company').attr('placeholder','Optional');

    jQuery('[name^="EditMyProfileSubmitButton"]').siblings().hide();
});
