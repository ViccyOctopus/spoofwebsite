$(document).ready(function(){

	$('.pic_intro_hero__icon').on('click', function(){

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
	var pic_header__height = $('.ddc_header').outerHeight();

	// Add padding to body
	$('body').css({'padding-top' : pic_header__height });
	
	// Trim intro hero height
	$('.pic_intro_hero').each(function(){
    var width = $(this).outerWidth();
    var height = $(window).height() - pic_header__height;
    var windowWidth = $(window).width();

    if (windowWidth <= 1046) {
      height -= 32;
    }

    var videoDimensions = getVideoDimensions(width, height);

		$(this).find('.pic_intro_hero__wrap').css({
			'height' : height
    });
    $(this).find('.pic_intro_hero__video_wrap').css({
      'width': videoDimensions.width,
      //'height': videoDimensions.height,
      'top': videoDimensions.offset.top,
      'left': videoDimensions.offset.left
    });

  });
  
  // Reopen the nav after height calculations are done
  if (isNavOpen) {
    $('.ddc_header').addClass('ddc_header--is-open');
    $('html').addClass('html--ddc_header--is-open');
    $('body').addClass('body--ddc_header--is-open');
  }
}

function getVideoDimensions(containerWidth, containerHeight) {
  var containerRatio = containerWidth / containerHeight;
  var videoRatio = 16 / 9;
  var videoDimensions = {
    width: containerWidth,
    height: containerHeight,
    offset: {
      top: 0,
      left: 0
    }
  };

  if (containerRatio < videoRatio) {
    videoDimensions.width = containerHeight * videoRatio;
    videoDimensions.offset.left = -(videoDimensions.width - containerWidth) / 2;
  } else {
    videoDimensions.height = containerWidth * 9 / 16;
    videoDimensions.offset.top = -(videoDimensions.height - containerHeight) / 2;
  }

  return videoDimensions;
}