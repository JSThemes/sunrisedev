var dtDirectoryFrontendLocationUtils = {

	dtDirectoryMapInitialize : function(map_output_container, mapdata, mapdefaults) {

		if(mapdefaults[0].zoom_level == '') {
			var default_zoom_level = dtdrmapobject.defaultZoomLevel;
		} else {
			var default_zoom_level = mapdefaults[0].zoom_level;
		}

		if(mapdefaults[0].map_type == '') {
			var default_map_type = dtdrmapobject.defaultMapType;
		} else {
			var default_map_type = mapdefaults[0].map_type;
		}

		if(mapdefaults[0].map_color == '') {
			var default_map_color = dtdrmapobject.defaultMapColor;
		} else {
			var default_map_color = mapdefaults[0].map_color;
		}

		var enableMapTypeControl = dtdrmapobject.enableMapTypeControl;
		var enableZoomControl = dtdrmapobject.enableZoomControl;
		var enableScaleControl = dtdrmapobject.enableScaleControl;
		var enableStreetViewControl = dtdrmapobject.enableStreetViewControl;
		var enableFullscreenControl = dtdrmapobject.enableFullscreenControl;

		var mapOptions = {
							flat:false,
							noClear:false,
							zoom: parseInt(default_zoom_level, 10),
							scrollwheel: false,
							draggable: true,
							disableDefaultUI:false,
							center: new google.maps.LatLng(mapdefaults[0].latitude, mapdefaults[0].longitude),
							mapTypeId: default_map_type.toLowerCase(),
							styles: [
								{stylers: [{hue: default_map_color}]},
							],

							mapTypeControl: enableMapTypeControl,
							zoomControl: enableZoomControl,
							scaleControl: enableScaleControl,
							streetViewControl: enableStreetViewControl,
							fullscreenControl: enableFullscreenControl
						};

		var map_id = map_output_container.find('.dtdr-listing-output-map').attr('id');
		if(document.getElementById(map_id)) {
			var map_sf = new google.maps.Map(document.getElementById(map_id), mapOptions);
		} else {
			return;
		}

		var mapMarkers = new Array();
		jQuery.each(mapdata, function(index, item) {
			var mapMarker = dtDirectoryFrontendLocationUtils.dtDirectoryMapCustomMarker(item, map_sf);
			mapMarkers.push( mapMarker );
		});

		// Add user location
		if(mapdefaults[0].origin == 'user') {
			dtDirectoryFrontendLocationUtils.dtDirectoryMapCustomMarker(mapdefaults[0], map_sf);
		}

		// Marker Cluster
		new MarkerClusterer( map_sf, mapMarkers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'} );

		// Clear All Info Boxes
		google.maps.event.addListener(map_sf, 'click', function(){
			dtDirectoryFrontendLocationUtils.dtDirectoryMapClearInfoWindow(mapMarkers);
		});

		google.maps.visualRefresh = true;

	},

	dtDirectoryMapClearInfoWindow : function(mapMarkers) {

		for (var i = 0; i < mapMarkers.length; i++) {
			if (typeof mapMarkers[i].infobox !== 'undefined') {
				mapMarkers[i].infobox.setOptions({
					boxClass: 'dtdr-marker-info-box',
				});
			}
		}

	},

	dtDirectoryMapInfoBox : function(options) {

		 var opts = jQuery.extend({}, {
			content: '',
			disableAutoPan: false,
			maxWidth: 0,
			pixelOffset: new google.maps.Size(50, -50),
			zIndex: 500000000,
			boxClass: 'dtdr-info-box',
			boxStyle: {
				width: '300px',
				zIndex: 5000000,
			},
			closeBoxURL: '',
			infoBoxClearance: new google.maps.Size(20, 20),
			isHidden: false,
			pane: 'floatPane',
			enableEventPropagation: true,
		}, options);

		return new InfoBox(opts);

	},

	dtDirectoryMapCustomMarker : function(item, map_sf) {

		var location = new google.maps.LatLng(item.latitude, item.longitude);
		var mapMarker = new dtDirectoryCustomMarker(
			location,
			map_sf,
			{
				listingid: item.listingid,
				map_icon: item.image,
				info_content: item.infocontent,
				add_info: true,
				additional_info_type: item.additionalinfotype,
				additional_info: item.additionalinfo,
				category_background_color: item.categorybackgroundcolor,
				category_color: item.categorycolor,
			},
			dtDirectoryFrontendLocationUtils.dtDirectoryMapInfoBox()
		);

		return mapMarker;

	},

	dtDirectoryLoadMapOutput : function(itemids, map_output_container) {

		var parent_item = map_output_container;

		var map_output = map_output_container.find('.dtdr-listing-output-map-holder');
		var user_latitude = jQuery('.dtdr-sf-location-latitude').val();
		var user_longitude = jQuery('.dtdr-sf-location-longitude').val();
		if(jQuery('.dtdr-sf-radius-unit').length) {
			var radius_unit = jQuery('.dtdr-sf-radius-unit').val();
		} else {
			var radius_unit = jQuery('.dtdr-sf-location-radius-unit').val();
		}

		var type = map_output.attr('data-type');

		var zoom_level = map_output.attr('data-zoomlevel');
		var map_type = map_output.attr('data-maptype');
		var map_color = map_output.attr('data-mapcolor');
		var additional_info = map_output.attr('data-additionalinfo');
		var category_background_color = map_output.attr('data-categorybackgroundcolor');
		var category_color = map_output.attr('data-categorycolor');

		jQuery.ajax({
			type: "POST",
			url: dtdrfrontendobject.ajaxurl,
			dataType: "JSON",
			data:
			{
				action: 'dtdr_generate_load_search_map_ouput',
				type: type,
				zoom_level: zoom_level,
				map_type: map_type,
				map_color: map_color,
				user_latitude: user_latitude,
				user_longitude: user_longitude,
				radius_unit: radius_unit,
				itemids: itemids,

				additional_info: additional_info,
				category_background_color: category_background_color,
				category_color: category_color,
			},
			beforeSend: function(){
				dtDirectoryCommonUtils.dtDirectoryAjaxBeforeSend(parent_item);
			},
			success: function (response) {

				dtDirectoryFrontendLocationUtils.dtDirectoryMapInitialize(map_output_container, response.mapdata, response.mapdefaults);

			},
			complete: function(){
				dtDirectoryCommonUtils.dtDirectoryAjaxAfterSend(parent_item);
			}
		});

	}

}

var dtDirectoryFrontendLocation = {

	dtInit : function() {

		dtDirectoryFrontendLocationUtils;

	}

};

jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectoryFrontendLocation.dtInit();
	}

});

( function( $ ) {

	var dtDirectoryFrontendLocationJs = function($scope, $){
		dtDirectoryFrontendLocation.dtInit();
		dtDirectoryFrontend.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-df-listings-map.default', dtDirectoryFrontendLocationJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-output-map-container.default', dtDirectoryFrontendLocationJs);
		}
	});

} )( jQuery );