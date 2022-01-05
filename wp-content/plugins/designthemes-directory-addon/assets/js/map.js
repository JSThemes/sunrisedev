var map;
var geocoder;
var gmarkers = [];

var dtDirectoryMapUtils = {

	dtDirectoryMapInitialize : function() {

    	geocoder = new google.maps.Geocoder();

	    var listing_latitude = jQuery('#dtdr_latitude').val();
	    var listing_longitude = jQuery('#dtdr_longitude').val();

		var showMapMarker = true;
	    if(listing_latitude == '' || listing_longitude == '') {
	        listing_latitude = dtdrmapobject.defaultLatitude;
			listing_longitude = dtdrmapobject.defaultLongitude;
			showMapMarker = false;
	    }

	    var default_zoom_level = dtdrmapobject.defaultZoomLevel;
	    var default_map_type = dtdrmapobject.defaultMapType;

	    var mapOptions = {
							flat:false,
							noClear:false,
							zoom: parseInt(default_zoom_level, 10),
							scrollwheel: false,
							draggable: true,
							disableDefaultUI:false,
							center: new google.maps.LatLng( listing_latitude, listing_longitude),
							mapTypeId: default_map_type.toLowerCase()
						};


	    if(document.getElementById('dtdr-addlist-map-holder')) {
	        map = new google.maps.Map(document.getElementById('dtdr-addlist-map-holder'), mapOptions);
	    } else {
	        return;
	    }

	    google.maps.visualRefresh = true;

		if(showMapMarker) {
			var point = new google.maps.LatLng(listing_latitude, listing_longitude);
			dtDirectoryMapUtils.dtDirectoryMapPlaceSavedMarker(point);
		}

	    google.maps.event.addListener(map, 'click', function(event) {
	        dtDirectoryMapUtils.dtDirectoryMapPlaceMarker(event.latLng);
	    });

	},

	dtDirectoryMapPlaceSavedMarker : function(location) {

		dtDirectoryMapUtils.dtDirectoryMapRemoveMarkers();

		var marker = new google.maps.Marker({
			position: location,
			map: map
		});
		gmarkers.push(marker);

		var infowindow = new google.maps.InfoWindow({
			content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
		});

		infowindow.open(map,marker);

	},

	dtDirectoryMapPlaceMarker : function(location) {

		dtDirectoryMapUtils.dtDirectoryMapRemoveMarkers();

		var marker = new google.maps.Marker({
			position: location,
			map: map
		});
		gmarkers.push(marker);

		var infowindow = new google.maps.InfoWindow({
			content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
		});

		infowindow.open(map,marker);

		document.getElementById("dtdr_latitude").value=location.lat();
		document.getElementById("dtdr_longitude").value=location.lng();

	},

	dtDirectoryMapRemoveMarkers : function() {

	    for (i = 0; i<gmarkers.length; i++){
	        gmarkers[i].setMap(null);
	    }

	},

	dtDirectoryMapRegenerateMap : function() {

		dtDirectoryMapUtils.dtDirectoryMapRemoveMarkers();

		var address = document.getElementById('dtdr_address').value;
		var full_address = address;

		if( document.getElementById('dtdr_city') ) {
			var city = document.getElementById('dtdr_city').value;
			if(city) {
				full_address = full_address +','+ city;
			}
		}

		if( document.getElementById('dtdr_countystate') ) {
			var state = document.getElementById('dtdr_countystate').value;
			if(state) {
				full_address = full_address +','+ state;
			}
		}

		if( document.getElementById('dtdr_country') ) {
			var country   = document.getElementById('dtdr_country').value;
			if(country){
				full_address = full_address +','+ country;
			}
		}

		geocoder.geocode( { 'address': full_address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
				gmarkers.push(marker);

				var infowindow = new google.maps.InfoWindow({
					content: 'Latitude: ' + results[0].geometry.location.lat() + '<br>Longitude: ' + results[0].geometry.location.lng()
				});

				infowindow.open(map,marker);
				document.getElementById("dtdr_latitude").value=results[0].geometry.location.lat();
				document.getElementById("dtdr_longitude").value=results[0].geometry.location.lng();

			}
		});

	},

	dtDirectoryMapFillAddress : function(place) {

	    var componentForm = {
	        establishment:'long_name',
	        street_number: 'short_name',
	        route: 'long_name',
	        locality: 'long_name',
	        administrative_area_level_1: 'long_name',
	        administrative_area_level_2: 'long_name',
	        country: 'short_name',
	        postal_code: 'short_name',
	        postal_code_prefix:'short_name',
	        neighborhood:'long_name'
	    };

    	jQuery('#dtdr_city').val('');
        jQuery('#dtdr_neighborhood').val('');
        jQuery('#dtdr_zip').val('');
        jQuery('#dtdr_countystate').val('');
        jQuery('#dtdr_country').val('');

        for(var i = 0; i < place.address_components.length; i++) {

          	var addressType = place.address_components[i].types[0];

            var temp = '';
            var val = place.address_components[i][componentForm[addressType]];

            if(addressType=== 'street_number' || addressType=== 'route') {
            } else if(addressType=== 'neighborhood') {
                jQuery('#dtdr_neighborhood').val(val);
            } else if(addressType=== 'postal_code_prefix') {
                jQuery('#dtdr_zip').val(val);
            } else if(addressType=== 'postal_code') {
                jQuery('#dtdr_zip').val(val);
            } else if(addressType=== 'administrative_area_level_2') {
                jQuery('#dtdr_countystate').val(val);
            } else if(addressType=== 'administrative_area_level_1') {
                jQuery('#dtdr_countystate').val(val);
            } else if(addressType=== 'locality') {
                jQuery('#dtdr_city').val(val);
            } else if(addressType=== 'country') {
                jQuery('#dtdr_country').val(val);
            }

        }

	},

};

var dtDirectoryMap = {

	dtInit : function() {
		//dtDirectoryMap.dtDefault();
		dtDirectoryMap.dtLoadMap();
		dtDirectoryMap.dtMapEvents();
	},

	dtDefault : function() {

		if(('ul.dtdr-tabs-vertical').length > 0) {
			jQuery('.dtdr-tabs-vertical li').click(function(){
				dtDirectoryMap.dtLoadMap();
			});
		}

	},

	dtLoadMap : function() {

		google.maps.event.addDomListener(window, 'load', dtDirectoryMapUtils.dtDirectoryMapInitialize());

	},

	dtMapEvents : function() {

	    if( document.getElementById('dtdr_address') ) {

	        var address_autocomplete = new google.maps.places.Autocomplete(( document.getElementById('dtdr_address')), {
	        	types: ['geocode'],
	            "partial_match" : true
	        });

	        var input = document.getElementById('dtdr_address');
            google.maps.event.addDomListener(input, 'keydown', function(e) {
                if (e.keyCode == 13) {
                    e.stopPropagation();
                    e.preventDefault();
                }
	        });

	        google.maps.event.addListener(address_autocomplete, 'place_changed', function(event) {
	            var place = address_autocomplete.getPlace();
	            dtDirectoryMapUtils.dtDirectoryMapFillAddress(place);
	            dtDirectoryMapUtils.dtDirectoryMapRegenerateMap();
	        });

	   }

	   if( document.getElementById('dtdr_city') ) {

	        city_autocomplete = new google.maps.places.Autocomplete(( document.getElementById('dtdr_city')), {
	        	types: ['(cities)']
	        });

	        var input = document.getElementById('dtdr_city');
	            google.maps.event.addDomListener(input, 'keydown', function(e) {
	                if (e.keyCode == 13) {
	                    e.stopPropagation();
	                    e.preventDefault();
	                }
	        });

	        google.maps.event.addListener(city_autocomplete, 'place_changed', function() {
	            var place = city_autocomplete.getPlace();
	            dtDirectoryMapUtils.dtDirectoryMapFillAddress(place);
	            dtDirectoryMapUtils.dtDirectoryMapRegenerateMap();
	        });

	    }

	},

};

jQuery(document).ready(function() {

	dtDirectoryMap.dtInit();

});