var dtDirectoryFrontendPackagesUtils = {

	dtDirectoryPackagesListingIsotope : function() {

	    jQuery('.dtdr-packages-item-apply-isotope').each(function() {

	    	var this_item = jQuery(this);

	        this_item.isotope({
				itemSelector: '.dtdr-column',
				percentPosition: true,
				masonry: {
					columnWidth: '.grid-sizer'
				}
	        });

			window.setTimeout(function(){
				this_item.isotope();
			}, 800);

	    });

	},

	dtDirectoryPackageLoadDataOutput : function(output_container) {


		var parent_item = output_container;

		// Default options

		var type = output_container.find('.dtdr-package-output-data-holder').attr('data-type');
		var post_per_page = output_container.find('.dtdr-package-output-data-holder').attr('data-postperpage');
		var columns = output_container.find('.dtdr-package-output-data-holder').attr('data-columns');
		var apply_isotope = output_container.find('.dtdr-package-output-data-holder').attr('data-applyisotope');
		var package_type = output_container.find('.dtdr-package-output-data-holder').attr('data-packagetype');
		var enable_carousel = output_container.attr('data-enablecarousel');

		var package_items = '';

		var package_item_ids = output_container.find('.dtdr-package-output-data-holder').attr('data-packageitemids');
		if(package_item_ids != undefined && package_item_ids != '') {
			package_items = package_item_ids.split(',');
		}

		var excerpt_length = output_container.find('.dtdr-package-output-data-holder').attr('data-excerptlength');
		var show_featured_image = output_container.find('.dtdr-package-output-data-holder').attr('data-showfeaturedimage');
		var apply_equal_height = output_container.find('.dtdr-package-output-data-holder').attr('data-applyequalheight');


		jQuery.ajax({
			type: "POST",
			url: dtdrfrontendobject.ajaxurl,
			dataType: "JSON",
			data:
			{
				action             : 'dtdr_generate_packages_listing_data',
				type               : type,
				post_per_page      : post_per_page,
				columns            : columns,
				apply_isotope      : apply_isotope,
				package_type       : package_type,
				excerpt_length     : excerpt_length,
				show_featured_image: show_featured_image,
				apply_equal_height : apply_equal_height,
				enable_carousel    : enable_carousel,

				package_items      : package_items,
			},
			beforeSend: function(){
				dtDirectoryCommonUtils.dtDirectoryAjaxBeforeSend(parent_item);
			},
			success: function (response) {

				output_container.find('.dtdr-package-output-data-holder').html(response.data);

				if(apply_isotope == 'true') {
					// Isotope
					dtDirectoryFrontendPackagesUtils.dtDirectoryPackagesListingIsotope();
				} else if(enable_carousel == 'true') {
					// Carousel
					dtDirectoryFrontendPackagesUtils.dtDirectoryPackageCarousel(output_container);
				} else if(apply_equal_height == 'true') {
					//Equal Height
					output_container.find('.dtdr-packages-item-wrapper').matchHeight({ property:"min-height" });
				}

			},
			complete: function(){
				dtDirectoryCommonUtils.dtDirectoryAjaxAfterSend(parent_item);
			}
		});

	},

	dtDirectoryPackageAjaxPagination : function() {

		jQuery( 'body' ).delegate( '.dtdr-package-pagination a', 'click', function(e) {

			var this_item = jQuery(this);

			// Pagination Data
			if(this_item.parent().hasClass('prev-post')) {
				current_page = parseInt(this_item.attr('data-currentpage'), 10)-1;
			} else if(this_item.parent().hasClass('next-post')) {
				current_page = parseInt(this_item.attr('data-currentpage'), 10)+1;
			} else {
				current_page = this_item.text();
			}

			var post_per_page = this_item.parents('.dtdr-pagination').attr('data-postperpage');

			if(current_page == 1) {
				var offset = 0;
			} else if(current_page > 1) {
				var offset = ((current_page-1)*post_per_page);
			}

			var function_call = this_item.parents('.dtdr-pagination').attr('data-functioncall');
			var output_div = this_item.parents('.dtdr-pagination').attr('data-outputdiv');

			var type = this_item.parents('.dtdr-pagination').attr('data-type');
			var loader = this_item.parents('.dtdr-pagination').attr('data-loader');
			var loader_parent = this_item.parents('.dtdr-pagination').attr('data-loaderparent');
			var columns = this_item.parents('.dtdr-pagination').attr('data-columns');
			var load_data = this_item.parents('.dtdr-pagination').attr('data-loaddata');
			var apply_isotope = this_item.parents('.dtdr-pagination').attr('data-applyisotope');
			var show_featured_image = this_item.parents('.dtdr-pagination').attr('data-showfeaturedimage');
			var apply_equal_height = this_item.parents('.dtdr-pagination').attr('data-applyequalheight');


			var package_items = output_container = '';

			if(this_item.parents().hasClass('dtdr-direct-package-items')) {

				var output_container = this_item.parents('.dtdr-direct-package-items');

				var package_item_ids = this_item.parents('.dtdr-direct-package-items').find('.dtdr-package-output-data-holder').attr('data-listitemids');
				if(package_item_ids != undefined && package_item_ids != '') {
					package_items = package_item_ids.split(',');
				}

			}

			// ajax call
			jQuery.ajax({
				type: "POST",
				url: dtdrcommonobject.ajaxurl,
				dataType: "JSON",
				data:
				{
					action             : function_call,
					ajax_call          : true,
					current_page       : current_page,
					offset             : offset,
					post_per_page      : post_per_page,
					function_call      : function_call,
					output_div         : output_div,
					type               : type,
					columns            : columns,
					apply_isotope      : apply_isotope,
					show_featured_image: show_featured_image,
					apply_equal_height : apply_equal_height,
					package_items      : package_items,
				},
				beforeSend: function(){
					if(loader == 'true') {
						dtDirectoryCommonUtils.dtDirectoryAjaxBeforeSend(jQuery(loader_parent));
					}
				},
				success: function (response) {

					this_item.parents('.'+output_div).html(response.data);

					if(apply_isotope == 'true') {
						// Isotope
						dtDirectoryFrontendPackagesUtils.dtDirectoryPackagesListingIsotope();
					} else if(apply_equal_height == 'true') {
						//Equal Height
						output_container.find('.dtdr-packages-item-wrapper').matchHeight({ property:"min-height" });
					}

				},
				complete: function(){
					if(loader == 'true') {
						dtDirectoryCommonUtils.dtDirectoryAjaxAfterSend(jQuery(loader_parent));
					}
				}
			});

			e.preventDefault();

		});

	},

	dtDirectoryPackageCarousel : function(output_container) {

		var swiperGalleryPackage = [];
		var swiperGalleryPackageOptions = [];
		var swiperListingIterator = 1;

		output_container.find('.swiper-container').each(function() {

			var $swiperItem = jQuery(this);
			var swiperUniqueId = 'swiperuniqueid-'+swiperListingIterator;
			swiperGalleryPackageOptions[swiperUniqueId] = [];
			$swiperItem.attr('id', swiperUniqueId);

			// Get swiper options
			var effect = output_container.attr('data-carouseleffect');

			var autoplay = parseInt(output_container.attr('data-carouselautoplay'), 10);
			var autoplay_enable = false;
			if(autoplay > 0) {
				autoplay_enable = true;
				swiperGalleryPackageOptions[swiperUniqueId]['autoplay'] = autoplay;
			} else {
				swiperGalleryPackageOptions[swiperUniqueId]['autoplay'] = 0;
			}

			var slidesperview = parseInt(output_container.attr('data-carouselslidesperview'), 10);
			var loopmode = (output_container.attr('data-carouselloopmode') == 'true') ? true : false;
			var mousewheelcontrol = (output_container.attr('data-carouselmousewheelcontrol') == 'true') ? true : false;

			var pagination_class = '';
			var pagination_type = '';

			if(output_container.attr('data-carouselbulletpagination') == 'true') {
				var pagination_class = output_container.find('.dtdr-swiper-bullet-pagination');
				var pagination_type = 'bullets';
			}

			var spacebetween = parseInt(output_container.attr('data-carouselspacebetween'), 10);
			if(spacebetween) {
				spacebetween = spacebetween;
			} else {
				spacebetween = 0;
			}

			if(slidesperview == 1) {
				var breakpoint_slides_1 = breakpoint_slides_2 = breakpoint_slides_3 = breakpoint_slides_4 = breakpoint_slides_5 = 1;
			} else if(slidesperview == 2) {
				var breakpoint_slides_1 = 2; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
			} else if(slidesperview == 3) {
				var breakpoint_slides_1 = 3; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
			} else if(slidesperview >= 4) {
				var breakpoint_slides_1 = 3; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 2; var breakpoint_slides_4 = 2; var breakpoint_slides_5 = 1;
			}

			// Generate swiper
		    swiperGalleryPackage[swiperUniqueId] = new Swiper($swiperItem, {

     			initialSlide: 0,
                simulateTouch: true,
                roundLengths: true,
                spaceBetween: spacebetween,
                keyboardControl: true,
                paginationClickable: true,
                autoHeight: true,

                grabCursor: true,
                autoplay: {
                			enabled: autoplay_enable,
						    delay: autoplay,
						},
                slidesPerView: slidesperview,
                loop:loopmode,
                mousewheel: mousewheelcontrol,

				pagination: {
					el: pagination_class,
					type: pagination_type,
					clickable: true,
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' +
								'<span class="dtdr-separator"></span>' +
								'<span class="' + totalClass + '"></span>';
					}
				},

                effect: effect,
				coverflowEffect: {
					slideShadows: false,
					rotate: 0,
					stretch: 0,
					depth: 200,
					modifier: 1,
				},
		        cubeEffect: {
		        	slideShadows: true,
		            shadow: true,
		            shadowOffset: 20,
		            shadowScale: 0.94
		        },

		        breakpoints: {
		            1280: {
		                slidesPerView: breakpoint_slides_1,
		            },
		            1024: {
		                slidesPerView: breakpoint_slides_2,
		            },
		            768: {
		                slidesPerView: breakpoint_slides_3,
		            },
		            640: {
		                slidesPerView: breakpoint_slides_4,
		            },
		            320: {
		                slidesPerView: breakpoint_slides_5,
		            }
		        },

		    });

		    if(output_container.attr('data-carouselarrowpagination') == 'true') {

			    output_container.find('.dtdr-swiper-arrow-pagination .dtdr-swiper-arrow-prev').on('click', function(e) {
			    	var swiperUniqueId = $swiperItem.attr('id');
			        swiperGalleryPackage[swiperUniqueId].slidePrev();
			        if(swiperGalleryPackageOptions[swiperUniqueId]['autoplay'] > 0) {
			        	swiperGalleryPackage[swiperUniqueId].autoplay.start();
			        }
			        e.preventDefault();
			    });

			    output_container.find('.dtdr-swiper-arrow-pagination .dtdr-swiper-arrow-next').on('click', function(e) {
			    	var swiperUniqueId = $swiperItem.attr('id');
			        swiperGalleryPackage[swiperUniqueId].slideNext();
			        if(swiperGalleryPackageOptions[swiperUniqueId]['autoplay'] > 0 ) {
			        	swiperGalleryPackage[swiperUniqueId].autoplay.start();
			        }
			        e.preventDefault();
			    });

			}

		    swiperListingIterator++;

		});

	}

};

var dtDirectoryFrontendPackages = {

	dtInit : function() {

        jQuery(window).bind('resize', function() {
			dtDirectoryFrontendPackagesUtils.dtDirectoryPackagesListingIsotope();
        });

		// Pagination
        dtDirectoryFrontendPackagesUtils.dtDirectoryPackageAjaxPagination();

        // Load by Default
        jQuery('.dtdr-direct-package-items').each(function() {
			dtDirectoryFrontendPackagesUtils.dtDirectoryPackageLoadDataOutput(jQuery(this));
		});

	}

};

jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectoryFrontendPackages.dtInit();
	}

});

( function( $ ) {

	var dtDirectoryFrontendPackagesJs = function($scope, $){
		dtDirectoryFrontendPackages.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-df-packages-listing.default', dtDirectoryFrontendPackagesJs);
		}
	});

} )( jQuery );