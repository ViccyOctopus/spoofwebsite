$(document).ready(function(){

	$('.ddc_intro_hero__icon').on('click', function(){

		var offset = $(this).offset().top + $(this).outerHeight();

		$('html,body').stop().animate( { 'scrollTop' : offset } );

	});

	trim_intro_hero_height();

});



$(window).resize(function(){
	trim_intro_hero_height();
});




function trim_intro_hero_height() {
  var isNavOpen = $('.ddc_header').hasClass('ddc_header--is-open');

  // If the nav is open, close it temporarily in order to calculate
  //   the new intro hero height correctly.
  if (isNavOpen) {
    // Close nav
    $('.ddc_header').removeClass('ddc_header--is-open');
    $('html').removeClass('html--ddc_header--is-open');
    $('body').removeClass('body--ddc_header--is-open');
  }

    // Calculate header height
	var ddc_header__height = $('.ddc_header').outerHeight();

	// Add padding to body
	$('body').css({'padding-top' : ddc_header__height });
	
	// Trim intro hero height
	$('.ddc_intro_hero').each(function(){

		var height = $(window).height() - ddc_header__height;

		$(this).find('.ddc_intro_hero__wrap').css({
			'height' : height
		})

  });

  // Reopen the nav after height calculations are done
  if (isNavOpen) {
    $('.ddc_header').addClass('ddc_header--is-open');
    $('html').addClass('html--ddc_header--is-open');
    $('body').addClass('body--ddc_header--is-open');
  }
}