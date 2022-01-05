var dtDirectorySinglePageUtils = {

	dtDirectoryMapInitialize : function(this_item) {

	    var listing_latitude = this_item.attr('data-latitude');
	    var listing_longitude = this_item.attr('data-longitude');
	    var map_color = this_item.attr('data-mapcolor');

	    if(map_color == '') {
	    	map_color = dtdrmapobject.defaultMapColor;
	    }

	    var default_zoom_level = dtdrmapobject.defaultZoomLevel;
	    var default_map_type = dtdrmapobject.defaultMapType;

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
							center: new google.maps.LatLng(listing_latitude, listing_longitude),
							mapTypeId: default_map_type.toLowerCase(),
							styles: [
								{stylers: [{hue: map_color}]},
							],

							mapTypeControl: enableMapTypeControl,
							zoomControl: enableZoomControl,
							scaleControl: enableScaleControl,
							streetViewControl: enableStreetViewControl,
							fullscreenControl: enableFullscreenControl
						};


	    var map_id = this_item.find('.dtdr-listings-map-holder').attr('id');
	    if(document.getElementById(map_id)) {
	        var map_sp = new google.maps.Map(document.getElementById(map_id), mapOptions);
	    } else {
	        return;
	    }

	    google.maps.visualRefresh = true;

	    var point = new google.maps.LatLng(listing_latitude, listing_longitude);

	    dtDirectorySinglePageUtils.dtDirectoryMapLocationMarker(point, map_sp, this_item);

	},

	dtDirectoryMapLocationMarker : function(location, map_sp, this_item) {

		var marker_image = this_item.attr('data-markerimage');

    	var mapMarker = new dtDirectoryCustomMarker(
			location,
			map_sp,
			{
				map_icon: marker_image,
				add_info: false,
			},
			''
		);

		return mapMarker;

	},

    dtDirectoryCheckReadyState :  function(printWindow) {

        //if (printWindow.document.readyState == "complete") {
            printWindow.focus(); // necessary for IE >= 10
            printWindow.print();
            printWindow.close();
        //}

    },

};

var dtDirectorySinglePage = {

	dtInit : function() {

		// Initialze Map

			jQuery('.dtdr-listings-map-container').each(function() {
				google.maps.event.addDomListener(window, 'load', dtDirectorySinglePageUtils.dtDirectoryMapInitialize(jQuery(this)));
			});


		// Add to favourite list

			jQuery( 'body' ).delegate( '.dtdr-listings-utils-favourite-item', 'click', function(e) {

				if(!jQuery(this).hasClass('dtdr-login-link')) {

					var this_item = jQuery(this);
					var listing_id = this_item.attr('data-listingid');
					var user_id = this_item.attr('data-userid');

					if(jQuery(this).hasClass('addtofavourite')) {
						var favourite_label = 'addtofavourite';
					} else {
						var favourite_label = 'removefavourite';
					}

					jQuery.ajax({
						type: "POST",
						url: dtdrfrontendobject.ajaxurl,
						data:
						{
							action: 'dtdr_listing_favourite_marker',
							listing_id: listing_id,
							user_id: user_id,
						},
						beforeSend: function(){
							this_item.parents('.dtdr-listings-utils-favourite').prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
						},
						success: function (response) {
							if(favourite_label == 'addtofavourite') {
								this_item.html('<span class="fa fa-heart"></span>');
								this_item.removeClass('addtofavourite');
								this_item.addClass('removefavourite');
							} else {
								this_item.html('<span class="far fa-heart"></span>');
								this_item.removeClass('removefavourite');
								this_item.addClass('addtofavourite');
							}
						},
						complete: function(){
							this_item.parents('.dtdr-listings-utils-favourite').find("span:first").remove();
						}
					});

				}

				e.preventDefault();

			});

		// Print page

			jQuery( 'body' ).delegate( '.dtdr-listings-utils-print-item', 'click', function(e) {

				var data = jQuery('body').find('#main').html();

				var printWindow = window.open('', dtdrfrontendobject.printerTitle, 'height=600,width=1900');
				printWindow.document.write('<html><head><title>'+dtdrfrontendobject.printerTitle+'</title>');

				// Directory Plugin CSS
				jQuery('link[id$="-css"]').each(function () {
					printWindow.document.write('<link rel="stylesheet" href="'+jQuery(this).attr('href')+'" type="text/css" media="all" />');
				});

				// Inline CSS
				jQuery('style[id$="-css"]').each(function () {
					printWindow.document.write('<style id="'+jQuery(this).attr('id')+'" type="text/css">'+jQuery(this).html()+'</style>');
				});

				printWindow.document.write('<link rel="stylesheet" href="'+dtdrfrontendobject.pluginPath+'assets/css/print.css" type="text/css" media="all" />');

				printWindow.document.write('</head><body>');
				printWindow.document.write(data);
				printWindow.document.write('</body></html>');
				printWindow.document.close();

				setTimeout(function() {
					dtDirectorySinglePageUtils.dtDirectoryCheckReadyState(printWindow);
				}, 1200);

				e.preventDefault();

			});


		// Contact form submit

			jQuery( 'body' ).delegate( '.dtdr-contactform-submit-button', 'click', function(e) {

				var this_item = jQuery(this);
				var notification_box = this_item.parents('.dtdr-listings-contactform').find('.dtdr-contactform-notification-box');

				var form = jQuery('.dtdr-listings-contactform')[0];
				var data = new FormData(form);
				data.append('action', 'dtdr_process_listing_contactform');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data: data,
					processData: false,
					contentType: false,
					cache: false,
					dataType: "JSON",
					beforeSend: function() {
						this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
					},
					success: function (response) {
						notification_box.removeClass('dtdr-success dtdr-failure');
						if(response.success) {
							notification_box.addClass('dtdr-success');
							notification_box.html(response.message);
						} else {
							notification_box.addClass('dtdr-failure');
							notification_box.html(response.message);
						}
					},
					complete: function() {
						this_item.find('span').remove();
					}
				});

				e.preventDefault();

			});


		// Send request to view contact details

			jQuery( 'body' ).delegate( '.dtdr-listings-contactdetails-request', 'click', function(e) {

				var this_item = jQuery(this);
				var listing_id = this_item.attr('data-listingid');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action: 'dtdr_listing_contactdetails_request',
						listing_id: listing_id,
					},
					dataType: "JSON",
					beforeSend: function() {
						this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
					},
					success: function (response) {
						if(response.success) {
							location.reload();
						} else {
							this_item.parents('.dtdr-listings-contactdetails-request-container').append('<div class="dtdr-contactdetails-request-notification-box">'+response.message+'</div>');
							window.setTimeout(function(){
								this_item.parents('.dtdr-listings-contactdetails-request-container').find('.dtdr-contactdetails-request-notification-box').remove();
							}, 2000);
						}
					},
					complete: function() {
						this_item.find('span').remove();
					}
				});

				e.preventDefault();

			});


		// Activity Tracker - Website Visit, Phone & Mobile Click

			jQuery( 'body' ).delegate( '.dtdr-listings-contactdetails-list a.web, .dtdr-listings-contactdetails-list a.phone, .dtdr-listings-contactdetails-list a.mobile', 'click', function(e) {

				var this_item  = jQuery(this);
				var listing_id = this_item.attr('data-listingid');
				var user_id    = this_item.attr('data-userid');

				var activity_type = '';
				if(this_item.hasClass('web')) {
					activity_type = 'website';
				} else if(this_item.hasClass('phone')) {
					activity_type = 'phone';
				} else if(this_item.hasClass('mobile')) {
					activity_type = 'mobile';
				}

				jQuery.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?').done(function(location) {

					var country = location.country_name;
					var city    = location.city;
					var zip     = location.postal;

					jQuery.ajax({
						type: "POST",
						url: dtdrfrontendobject.ajaxurl,
						data:
						{
							action       : 'dtdr_listing_activity_tracker_contactdetails',
							activity_type: activity_type,
							listing_id   : listing_id,
							user_id      : user_id,
							country      : country,
							city         : city,
							zip          : zip
						},
						dataType: "JSON",
						success: function (response) {
						}
					});

				});

			});


	}

};

jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorySinglePage.dtInit();
	}

});


( function( $ ) {

	var dtDirectorySinglePageJs = function($scope, $){
		dtDirectorySinglePage.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sp-map.default', dtDirectorySinglePageJs);
		}
	});

} )( jQuery );