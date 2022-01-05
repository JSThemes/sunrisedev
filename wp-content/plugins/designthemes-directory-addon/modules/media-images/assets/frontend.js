jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectoryFrontendUtils.dtDirectoryListingImageSwiperGallery();
	}

});


( function( $ ) {

	var dtDirectorMediaImagesJs = function($scope, $){
		dtDirectoryFrontendUtils.dtDirectoryListingImageSwiperGallery();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sp-media-images.default', dtDirectorMediaImagesJs);
		}
	});

} )( jQuery );