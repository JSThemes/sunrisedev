var dtDirectoryCountDownTimer = {

	dtInit : function() {

		if(jQuery('.dtdr-countdown-holder').length) {
			jQuery('.dtdr-countdown-holder').each(function(){
				var $this = jQuery(this);
				$this.downCount({
					date	: $this.attr('data-date'),
					offset	: $this.attr('data-offset')
				}, function () {
					location.reload();
					return false;
				});
			});
		}

	}

};

jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectoryCountDownTimer.dtInit();
	}

});

( function( $ ) {

	var dtDirectoryCountDownTimerJs = function($scope, $){
		dtDirectoryCountDownTimer.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sp-countdown-timer.default', dtDirectoryCountDownTimerJs);
		}
	});

} )( jQuery );