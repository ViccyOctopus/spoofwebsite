function pic_fix_quote_heights(){
    $('.ddc_card-carousel--quotes').each(function(){
        var $quote_height = 0,
            $attribution_height = 0;

        $(this).find('.ddc_card-carousel__slide-inner').each(function(){
            if ($(this).find('.ddc_card-carousel__slide-image-wrapper').height() > $quote_height){
                $quote_height = $(this).find('.ddc_card-carousel__slide-image-wrapper').height();
            }

            if ($(this).find('.ddc_card-carousel__slide-attribution').height() > $attribution_height){
                $attribution_height = $(this).find('.ddc_card-carousel__slide-attribution').height();
            }
        });

        $(this).find('.ddc_card-carousel__slide-image-wrapper').css('min-height', $quote_height);
        $(this).find('.ddc_card-carousel__slide-attribution').css('min-height', $attribution_height);
    });
}

jQuery(document).ready(function($){

    $('.ddc_card-masonry__tiles').each(function() {
        var $this = $(this);

        $this.masonry({
            itemSelector: '.invisible_container',
            horizontalOrder: true,
            percentPosition: true
        });
    });

    $('.ddc_card-carousel__slides').each(function(){
        var $this = $(this),
            $arrow_container = $this.closest('.ddc_card-carousel').find('.ddc_card-carousel-arrows');

        $this.on('init', function(){
            pic_fix_quote_heights();
        });

        $this.slick({
            slidesToShow: $this.attr('data-slides-to-show'),
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            appendArrows: $arrow_container,
            prevArrow: '<div class="ddc_card-carousel__prev-arrow"><button type="button" class="slick-prev"><svg><symbol id="arrow_left" viewBox="0 0 14 10"><path d="M5.627 3.983h8.305v2.373H5.627v3.56L.881 5.168 5.627.424z" fill-rule="evenodd"></path></symbol><use xlink:href="#arrow_left"></use></svg></button></div>',
            nextArrow: '<div class="ddc_card-carousel__prev-arrow"><button type="button" class="slick-next"><svg><symbol id="arrow_right" viewBox="0 0 14 10"><path d="M8.797 6.356H.492V3.983h8.305V.423l4.745 4.746-4.745 4.746z" fill-rule="evenodd"></path></symbol><use xlink:href="#arrow_right"></use></svg></button></div>',
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
            ]
        });
    });
});