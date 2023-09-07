jQuery(function() {
    $('.sidebar_legislatorsearch [type="checkbox"] + label').each(function() {
        $(this).attr('for',$(this).prev().attr('id'));
    });
    $('.contact-info img').wrap('<div class="image-container"></div>');
});