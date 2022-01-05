(function ($) {

	var dtPortfolioOnePageNavigationHandler = function($scope, $){

		// One page navigation scripts
		if($('.dtportfolio-onepage-navigation-title-holder').length) {

			$('.dtportfolio-onepage-navigation-title-holder li a').click(function(event) {

				if($(this).parents('.dtportfolio-onepage-navigation-title-holder').hasClass('rounded')) {

					$('.dtportfolio-onepage-navigation-title-holder li').removeClass('active');
					$(this).parent('li').addClass('active');

					var target = $(this).attr('href'); 
					if( target.length ) { 
						event.preventDefault(); 
						$('html, body').stop().animate({ scrollTop: $(target).offset().top }, 1000); 
					} 

				} else {

					$('.dtportfolio-onepage-navigation-title-holder li a').removeClass('active');
					$(this).addClass('active');

					var target = $(this).attr('href'); 
					if( target.length ) { 
						event.preventDefault(); 
						$('html, body').stop().animate({ scrollTop: $(target).offset().top }, 1000); 
					} 

				}
			});

			$(window).scroll(function() {
				$('.dtportfolio-onepage-navigation-title-holder li a').each(function(){
					var section_id = $(this).attr('href');

					if($(window).scrollTop() == 0) {

						if($(this).parents('.dtportfolio-onepage-navigation-title-holder').hasClass('rounded')) {
							$('.dtportfolio-onepage-navigation-title-holder li').removeClass('active');
							$('.dtportfolio-onepage-navigation-title-holder li:first').addClass('active');
						} else {
							$('.dtportfolio-onepage-navigation-title-holder li a').removeClass('active');
							$('.dtportfolio-onepage-navigation-title-holder li a:first').addClass('active');
						}

					} else {

						var top_of_element = $(section_id).offset().top+200;
						var bottom_of_element = $(section_id).offset().top + $(section_id).outerHeight();
						var bottom_of_screen = $(window).scrollTop() + $(window).height();

						if((bottom_of_screen > top_of_element) && (bottom_of_screen < bottom_of_element)){
							if($(this).parents('.dtportfolio-onepage-navigation-title-holder').hasClass('rounded')) {
								$('.dtportfolio-onepage-navigation-title-holder li').removeClass('active');
								$('.dtportfolio-onepage-navigation-title-holder li a[href="'+section_id+'"]').parent('li').addClass('active');
							} else {				    	
								$('.dtportfolio-onepage-navigation-title-holder li a').removeClass('active');
								$('.dtportfolio-onepage-navigation-title-holder li a[href="'+section_id+'"]').addClass('active');
							}
						}

					}
				});
			});
			
		}

	};


    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function () {

    	elementorFrontend.hooks.addAction('frontend/element_ready/dt-portfolio-single-onepagenavigation.default', dtPortfolioOnePageNavigationHandler);

    });

})(jQuery);