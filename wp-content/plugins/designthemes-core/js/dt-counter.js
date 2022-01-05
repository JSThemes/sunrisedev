// Counter js
(function ($) {

	var dtCounterWidgetHandler = function($scope, $){


        var counterElement = $scope.find('.dt-sc-counter-wrapper').each(function(){
		   
			$(this).one('inview', function (event, visible) {
				if(visible === true) {
					var val = $(this).find('.dt-sc-counter-number').attr('data-value');
					var suffix = $(this).find('.dt-sc-counter-number').attr('data-suffix');
					var percent_number_step = $.animateNumber.numberStepFactories.append(' '+suffix);
					$(this).find('.dt-sc-counter-number').animateNumber({ 
						number: val,
						numberStep: percent_number_step
					}, 4000);
				}
			});

		});
		
	};

    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function () {

		elementorFrontend.hooks.addAction('frontend/element_ready/dt-counter.default', dtCounterWidgetHandler);

	});

})(jQuery);