// Carousel js
(function ($) {

	var dtAnyCarouselsWidgetHandler = function($scope, $){

        var carouselElement = $scope.find('.dt-sc-any-carousel-wrapper.carousel_items').each(function(){
            var carouselSettings 	  = $(this).data('settings'),
				slides_to_show	 	  = (carouselSettings['slides_to_show'] !== undefined) ? parseInt(carouselSettings['slides_to_show']) : 1,
				slides_to_scroll 	  = (carouselSettings['slides_to_scroll'] !== undefined) ? parseInt(carouselSettings['slides_to_scroll']) : 1,
				
				effect			  	  = (carouselSettings['effect'] !== undefined) ? (carouselSettings['effect']) : 'slide',
				arrows			  	  = (carouselSettings['arrows'] !== undefined) ? (carouselSettings['arrows'] == 'yes') : false,
				direction		  	  = (carouselSettings['direction'] !== undefined) ? (carouselSettings['direction']) : 'horizontal',
				pagination			  = (carouselSettings['pagination'] !== undefined) ? (carouselSettings['pagination']) : '',
				speed			 	  = (carouselSettings['speed'] !== undefined) ? parseInt(carouselSettings['speed']) : 400,
				auto			  	  = (carouselSettings['autoplay'] !== undefined) ? (carouselSettings['autoplay'] == 'yes') : false,
				autoplay_speed	 	  = (carouselSettings['autoplay_speed'] !== undefined) ? parseInt(carouselSettings['autoplay_speed']) : 2500,
				loop				  = (carouselSettings['loop'] !== undefined) ? (carouselSettings['loop'] == 'yes') : false,
				pause_on_interaction  = (carouselSettings['pause_on_interaction'] !== undefined) ? (carouselSettings['pause_on_interaction'] == 'yes') : false,

				slides_to_show_tablet = (carouselSettings['slides_to_show_tablet'] !== undefined) ? parseInt(carouselSettings['slides_to_show_tablet']) : 1,
				slides_to_scroll_tablet = (carouselSettings['slides_to_scroll_tablet'] !== undefined) ? parseInt(carouselSettings['slides_to_scroll_tablet']) : 1,

				slides_to_show_mobile = (carouselSettings['slides_to_show_mobile'] !== undefined) ? parseInt(carouselSettings['slides_to_show_mobile']) : 1,
				slides_to_scroll_mobile = (carouselSettings['slides_to_scroll_mobile'] !== undefined) ? parseInt(carouselSettings['slides_to_scroll_mobile']) : 1;

			var $swiperItem = $(this);

			var swiperOptions = {
				initialSlide: 0,
				simulateTouch: true,
				roundLengths: true,
				keyboardControl: true,
				paginationClickable: true,
				autoHeight: true,
				grabCursor: true,

				slidesPerView: slides_to_show,
				slidesPerGroup: slides_to_scroll,
				loop:loop,

				effect: effect,
				direction: direction,
				speed: speed,

				breakpoints: {
					1024: {
						slidesPerView: slides_to_show_tablet,
						slidesPerGroup: slides_to_scroll_tablet,
					},
					768: {
						slidesPerView: slides_to_show_tablet,
						slidesPerGroup: slides_to_scroll_tablet,
					},
					640: {
						slidesPerView: slides_to_show_mobile,
						slidesPerGroup: slides_to_scroll_mobile,
					},
					320: {
						slidesPerView: slides_to_show_mobile,
						slidesPerGroup: slides_to_scroll_mobile,
					}
				}
			}

			if (arrows) {
				swiperOptions.navigation = {
					prevEl: $(this).find('.swiper-button-prev'),
					nextEl: $(this).find('.swiper-button-next')
				};
			}

			if (pagination != '') {
				if( pagination == 'scrollbar' ) {
					swiperOptions.scrollbar = {
						el: $(this).find('.swiper-scrollbar'),
						type: pagination,
						hide: true
					};
				} else {
					swiperOptions.pagination = {
						el: $(this).find('.swiper-pagination'),
						type: pagination,
						clickable: true
					};
				}
			}

			if (auto) {
				swiperOptions.autoplay = {
					delay: autoplay_speed,
					disableOnInteraction: pause_on_interaction
				};
			}

			var swiper = new Swiper($swiperItem, swiperOptions);			

		});
	};

    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function () {

		elementorFrontend.hooks.addAction('frontend/element_ready/dt-anycarousel.default', dtAnyCarouselsWidgetHandler);

    });

})(jQuery);