
var dtDirectorSocialShare = {

	dtInit : function() {

		// Social Share Toggle

			jQuery('.dtdr-listings-social-share-container').each(function () {

				jQuery(this).find('.dtdr-listings-social-share-item-icon').click(function(e) {
					jQuery('.dtdr-listings-social-share-container').removeClass('active');
					jQuery(this).parents('.dtdr-listings-social-share-container').toggleClass('active');
					e.stopPropagation();
				});

			});

			jQuery('body:not(.dtdr-listings-social-share-container)').on('click', function() {
				jQuery('.dtdr-listings-social-share-container').each(function () {

					if(jQuery(this).length > 0 && jQuery(this).hasClass('active')) {
						jQuery(this).toggleClass('active');
					}

				});
			});


	}

};


jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorSocialShare.dtInit();
	}

});


( function( $ ) {

	var dtDirectorSocialShareJs = function($scope, $){
		dtDirectorSocialShare.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sp-social-share.default', dtDirectorSocialShareJs);
		}
	});

} )( jQuery );