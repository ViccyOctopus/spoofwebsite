$(document).ready(function(){
  resizeHeaderVideo();
});

$(window).resize(function(){
	resizeHeaderVideo();
});

function resizeHeaderVideo() {
  $('.ddc_page_header').each(function(){
    var width = $(this).outerWidth();
    var height = $(this).outerHeight();
    var videoDimensions = getVideoDimensions(width, height);

    $(this).find('.ddc_page_header__video_wrap').css({
      'width': videoDimensions.width,
      'height': videoDimensions.height,
      'top': videoDimensions.offset.top,
      'left': videoDimensions.offset.left
    });

	});
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