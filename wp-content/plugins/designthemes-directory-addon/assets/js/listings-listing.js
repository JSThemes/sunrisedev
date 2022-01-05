( function( $ ) {

	var dtDirectoryListingsListing = function($scope, $){
		dtDirectoryFrontend.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-df-listings-listing.default', dtDirectoryListingsListing);
    });

} )( jQuery );