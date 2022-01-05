
var dtDirectorEventsCommon = {

	dtInit : function() {

		// Date Picker
		if(jQuery('.dtdr-datepicker').length) {
			jQuery('.dtdr-datepicker').datepicker({
				minDate: '0d'
			});
		}

	},

};

jQuery(document).ready(function() {
	if((typeof dtdrfrontendobject === 'undefined') || !dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorEventsCommon.dtInit();
	}

});

( function( $ ) {

	var dtDirectorEventsCommonJs = function($scope, $){
		dtDirectorEventsCommon.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-start-date.default', dtDirectorEventsCommonJs);
		}
	});

} )( jQuery );