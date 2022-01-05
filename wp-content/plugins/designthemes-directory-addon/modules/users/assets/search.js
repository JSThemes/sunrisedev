var dtDirectorySearchFormUsers = {

	dtInit : function() {

		// Ajax load on input change

			jQuery( 'body' ).delegate( '.dtdr-sf-sellers.dtdr-with-ajax-load, .dtdr-sf-incharges.dtdr-with-ajax-load', 'change', function() {

				window.setTimeout(function(){
					dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
				}, 250);

			});

	},

};

jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorySearchFormUsers.dtInit();
	}

});

( function( $ ) {

	var dtDirectorySearchFormUsersJs = function($scope, $){
		dtDirectorySearchFormUsers.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-incharges.default', dtDirectorySearchFormUsersJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-sellers.default', dtDirectorySearchFormUsersJs);
		}
	});

} )( jQuery );