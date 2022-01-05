
var dtDirectorFloorPlan = {

	dtInit : function() {

		// Floor Plan Expansion

			if(jQuery('.dtdr-listings-floorplan-expand-bottom-section').length) {

				jQuery('.dtdr-listings-floorplan-expand-bottom-section').toggle(function() {
					jQuery(this).addClass('open').removeClass('close');
				}, function() {
					jQuery(this).addClass('close').removeClass('open');
				});

				jQuery('.dtdr-listings-floorplan-expand-bottom-section').click(function(){
					jQuery(this).parents('.dtdr-listings-floorplan-box-item').find('.dtdr-listings-floorplan-bottom-section').slideToggle();
				});

			}

	}

};


jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorFloorPlan.dtInit();
	}

});


( function( $ ) {

	var dtDirectorFloorPlanJs = function($scope, $){
		dtDirectorFloorPlan.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sp-floor-plan.default', dtDirectorFloorPlanJs);
		}
	});

} )( jQuery );