var dtDirectorySinglePageUsers = {

	dtInit : function() {


		// Author Swiper

			var swiperGalleryIncharge = [];
			var swiperInchargeIterator = 1;

			jQuery('.dtdr-listings-author-container.swiper-container').each(function() {

				var $swiperItem = jQuery(this);
				var swiperUniqueId = 'swiperuniqueid-'+swiperInchargeIterator;

				$swiperItem.attr('id', swiperUniqueId);

				// Get swiper options

				var slidesperview = parseInt($swiperItem.attr('data-carouselslidesperview'), 10);
				var loopmode = true;
				var mousewheelcontrol = true;

				var pagination_class = '';
				var pagination_type = '';

				var pagination = ($swiperItem.attr('data-carouselpagination') != '') ? $swiperItem.attr('data-carouselpagination') : 'bullets';

				if(pagination == 'bullets') {
					var pagination_class = $swiperItem.find('.dtdr-swiper-bullet-pagination');
					var pagination_type = 'bullets';
				}

				var spacebetween = parseInt($swiperItem.attr('data-carouselspacebetween'), 10);
				if(spacebetween) {
					spacebetween = spacebetween;
				} else {
					spacebetween = 0;
				}

				// Generate swiper
				swiperGalleryIncharge[swiperUniqueId] = new Swiper($swiperItem, {

					initialSlide: 0,
					simulateTouch: true,
					roundLengths: true,
					keyboardControl: true,
					paginationClickable: true,
					autoHeight: true,
					spaceBetween: spacebetween,

					grabCursor: true,
					slidesPerView: slidesperview,
					loop:loopmode,
					mousewheel: mousewheelcontrol,
					direction: 'horizontal',

					pagination: {
						el: pagination_class,
						type: pagination_type,
						clickable: true,
					},

				});

				if(pagination == 'arrows') {

					$swiperItem.find('.dtdr-swiper-arrow-pagination .dtdr-swiper-arrow-prev').on('click', function(e) {
						var swiperUniqueId = $swiperItem.attr('id');
						swiperGalleryIncharge[swiperUniqueId].slidePrev();
						e.preventDefault();
					});

					$swiperItem.find('.dtdr-swiper-arrow-pagination .dtdr-swiper-arrow-next').on('click', function(e) {
						var swiperUniqueId = $swiperItem.attr('id');
						swiperGalleryIncharge[swiperUniqueId].slideNext();
						e.preventDefault();
					});

				}

				swiperInchargeIterator++;

			});


		// Add to favourite author

			jQuery( 'body' ).delegate( '.dtdr-listings-utils-favourite-author', 'click', function(e) {

				if(!jQuery(this).hasClass('dtdr-login-link')) {

					var this_item = jQuery(this);
					var author_id = this_item.attr('data-authorid');
					var user_id = this_item.attr('data-userid');

					if(jQuery(this).hasClass('addtofavourite')) {
						var favourite_label = 'addtofavourite';
					} else {
						var favourite_label = 'removefavourite';
					}

					jQuery.ajax({
						type: "POST",
						url: dtdrfrontendobject.ajaxurl,
						data:
						{
							action: 'dtdr_listing_favourite_author_marker',
							author_id: author_id,
							user_id: user_id,
						},
						beforeSend: function(){
							this_item.parents('.dtdr-listings-utils-favourite').prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
						},
						success: function (response) {
							if(favourite_label == 'addtofavourite') {
								this_item.html('<span class="fa fa-heart"></span>');
								this_item.removeClass('addtofavourite');
								this_item.addClass('removefavourite');
							} else {
								this_item.html('<span class="far fa-heart"></span>');
								this_item.removeClass('removefavourite');
								this_item.addClass('addtofavourite');
							}
						},
						complete: function(){
							this_item.parents('.dtdr-listings-utils-favourite').find("span:first").remove();
						}
					});

				}

				e.preventDefault();

			});

	}

};

jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorySinglePageUsers.dtInit();
	}

});


( function( $ ) {

	var dtDirectorySinglePageUsersJs = function($scope, $){
		dtDirectorySinglePageUsers.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sp-author.default', dtDirectorySinglePageUsersJs);
		}
	});

} )( jQuery );