$(document).ready(function(){
  var navText = [
    '<svg><symbol id="arrow_left" viewBox="0 0 14 10"><path d="M5.627 3.983h8.305v2.373H5.627v3.56L.881 5.168 5.627.424z" fill-rule="evenodd"></path></symbol><use xlink:href="#arrow_left"></use></svg>',
    '<svg><symbol id="arrow_right" viewBox="0 0 14 10"><path d="M8.797 6.356H.492V3.983h8.305V.423l4.745 4.746-4.745 4.746z" fill-rule="evenodd"></path></symbol><use xlink:href="#arrow_right"></use></svg>'
  ];

  if ( $('.ddc_carousel--default .ddc_carousel__inner').length > 0 ) {
        $('.ddc_carousel--default .ddc_carousel__inner').owlCarousel({
            loop: true,
            autoplay: false,
            responsiveClass: true,
            stagePadding: 0,
            margin: 0,
            nav: true,
            navText: navText,
            responsive: {
                0: {
                    items: 1,
                    // stagePadding: 60 // Adds padding around the main image to show the prev/next slides on mobile
                },
                768: {
                    items: 2
                },
                1177: {
                  items: val
                }
            }
        });
    }

    if ( $('.ddc_carousel--image .ddc_carousel__inner').length > 0 ) {
      $('.ddc_carousel--image .ddc_carousel__inner').owlCarousel({
          loop: true,
          autoplay: false,
          responsiveClass: true,
          stagePadding: 0,
          margin: 0,
          nav: true,
          navText: navText,
          responsive: {
              0: {
                  items: 1
              },
              768: {
                  items: 2
              },
              1177: {
                items: visibleImageSlideCount
              }
          }
      });
  }

  if ( $('.ddc_carousel--video .ddc_carousel__inner').length > 0 ) {
    $('.ddc_carousel--video .ddc_carousel__inner').owlCarousel({
        loop: true,
        autoplay: false,
        responsiveClass: true,
        stagePadding: 0,
        margin: 0,
        nav: true,
        navText: navText,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: visibleVideoSlideCount
            }
        }
    });

    function resizeVideoToAspectRatio() {
      var $items = $('.ddc_carousel--video .ddc_carousel__item__inner');
      var itemWidth = $items.eq(0).outerWidth();

      $items.each(function() {
        $(this).find('.ddc_carousel__item').css('minHeight', itemWidth * .5625 + 'px');
      });
    }

    resizeVideoToAspectRatio();

    $(window).resize(resizeVideoToAspectRatio);
  }

  if ( $('.ddc_carousel--quote .ddc_carousel__inner').length > 0 ) {
    $('.ddc_carousel--quote .ddc_carousel__inner').owlCarousel({
        loop: true,
        autoplay: false,
        responsiveClass: true,
        stagePadding: 0,
        margin: 0,
        nav: true,
        navText: navText,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    function resizeQuoteVideoOnMobile() {
      var windowWidth = $(window).width();
  
      $('.quotee__video, .quotee__image').each(function() {
        if (windowWidth <= 768) {
          var videoWidth = $(this).outerWidth();
          var videoHeight = videoWidth * .5625;

          $(this).css('height', videoHeight + 'px');
        } else if (windowWidth > 768 && windowWidth <= 1024) {
          $(this).css('height', '202px');
        } else {
          $(this).css('height', '');
        }
      });
    }

    resizeQuoteVideoOnMobile();

    $(window).resize(resizeQuoteVideoOnMobile);
  }
});