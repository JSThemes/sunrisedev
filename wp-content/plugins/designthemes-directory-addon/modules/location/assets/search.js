var dtDirectorySearchFormLocationUtils = {

	dtDirectoryMapFillLocation : function(place) {

	    jQuery('.dtdr-sf-location-latitude').val(place.geometry.location.lat());
	    jQuery('.dtdr-sf-location-longitude').val(place.geometry.location.lng());

	},

	dtDirectoryLoadLocationData : function(position, locationItem) {

		// Retrieving latitude and longitude

		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		jQuery('.dtdr-sf-location-latitude').val(latitude);
		jQuery('.dtdr-sf-location-longitude').val(longitude);


		// Retrieving address

		var latlng = new google.maps.LatLng(latitude, longitude);
		var geocoder = new google.maps.Geocoder;

		geocoder.geocode({'location': latlng}, function(results, status) {
			if (status === 'OK') {
				if (results[0]) {
					jQuery('.dtdr-sf-location').val(results[0].formatted_address);
				} else {
					alert(dtdrcommonobject.noResult);
				}
			} else {
				alert(status);
			}
		});


		// Load data
		if(locationItem.hasClass('dtdr-with-ajax-load')) {
			dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
		}

	}

}

var dtDirectorySearchFormLocation = {

	dtInit : function() {

		// Auto complete location

			if( document.getElementById('dtdr-sf-location') ) {

				var location_autocomplete = new google.maps.places.Autocomplete(( document.getElementById('dtdr-sf-location')), {
					types: ['geocode'],
					"partial_match" : true
				});

				var input = document.getElementById('dtdr-sf-location');

				if(jQuery(input).hasClass('dtdr-with-ajax-load')) {

					google.maps.event.addDomListener(input, 'keydown', function(e) {
						if (e.keyCode == 13) {
							e.stopPropagation();
							e.preventDefault();
						}
					});

					google.maps.event.addListener(location_autocomplete, 'place_changed', function(event) {

						jQuery('#dtdr-sf-location').one("blur",function() {
							if(jQuery(this).val() == '') {
								jQuery('.dtdr-sf-location-latitude').val('');
								jQuery('.dtdr-sf-location-longitude').val('');

								// Load data
								dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
							}
						});

						var place = location_autocomplete.getPlace();
						dtDirectorySearchFormLocationUtils.dtDirectoryMapFillLocation(place);

						// Load data
						dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();

					});

				}

			}


		// Location data is detected

			jQuery('#dtdr-sf-location').one("blur",function() {

				if(jQuery(this).val() == '') {
					jQuery('.dtdr-sf-location-latitude').val('');
					jQuery('.dtdr-sf-location-longitude').val('');

					// Load data
					if(jQuery(this).hasClass('dtdr-with-ajax-load')) {
						dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
					}
				}

			});


		// Detect user location

			jQuery( 'body' ).delegate( '.dtdr-detect-location', 'click', function(e) {

				var locationItem = jQuery(this);

				if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						dtDirectorySearchFormLocationUtils.dtDirectoryLoadLocationData(position, locationItem);
					});
				} else {
					alert(dtdrfrontendobject.naviagtorAlert);
				}

				e.preventDefault();

			});


		// Radius field slider

			jQuery('.dtdr-sf-radius-slider').each(function() {

				var slider_handle = jQuery(this).find('.dtdr-sf-radius-slider-handle');
				var handle = jQuery(this).parents('.dtdr-sf-radius-field-holder').find('.dtdr-sf-radius');

				var radius_min = parseInt(jQuery(this).attr('data-min'), 10);
				var radius_max = parseInt(jQuery(this).attr('data-max'), 10);
				var radius_default = parseInt(jQuery(this).attr('data-default'), 10);
				var radius_unit = jQuery(this).attr('data-unit');

				jQuery(this).slider({
					range: "min",
					min: radius_min,
					max: radius_max,
					slide: function(event, ui) {
						slider_handle.html(ui.value + radius_unit);
						handle.val(ui.value);
					},
					stop: function(event, ui) {
						if(jQuery(this).hasClass('dtdr-with-ajax-load')) {
							window.setTimeout(function(){
								dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
							}, 250);
						}
					},
				});
				jQuery(this).slider('option', 'value', radius_default);

			});


		// Ajax load on input change

			jQuery( 'body' ).delegate( '.dtdr-sf-countries.dtdr-with-ajax-load, .dtdr-sf-cities.dtdr-with-ajax-load, .dtdr-sf-neighborhood.dtdr-with-ajax-load, .dtdr-sf-countystate.dtdr-with-ajax-load', 'change', function() {

				window.setTimeout(function(){
					dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
				}, 250);

			});

	},

};

jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorySearchFormLocation.dtInit();
	}

});

( function( $ ) {

	var dtDirectorySearchFormLocationJs = function($scope, $){
		dtDirectorySearchFormLocation.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-location.default', dtDirectorySearchFormLocationJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-radius.default', dtDirectorySearchFormLocationJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-cities.default', dtDirectorySearchFormLocationJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-countries.default', dtDirectorySearchFormLocationJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-countystate.default', dtDirectorySearchFormLocationJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-nearby.default', dtDirectorySearchFormLocationJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-neighborhood.default', dtDirectorySearchFormLocationJs);
		}
	});

} )( jQuery );