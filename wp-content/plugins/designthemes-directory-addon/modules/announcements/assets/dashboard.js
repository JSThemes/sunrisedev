var dtDirectoryDashboardAnnouncementsUtils = {

    announcementsListingLoader :  function() {

		if(jQuery('.dtdr-dashbord-announcements-listing').length) {

			var	this_item = jQuery('.dtdr-dashbord-announcements-listing');

			jQuery.ajax({
				type: "POST",
				url: dtdrannouncementsdashboardobject.ajaxurl,
				data:
				{
					action : 'dtdr_dashbord_announcements_listing'
				},
				success: function (response) {

					this_item.html(response);

				}
			});

		}

    }

};

var dtDirectoryDashboardAnnouncements = {

	dtInit : function() {

		// Add Announcement Fields

			jQuery('body').delegate('.dtdr-add-announcements-button, .dtdr-dashboard-announcement-edit', 'click', function(e) {

				var	this_item = jQuery(this);
				var mode = 'add';

				var listing_id = this_item.attr('data-listing-id');
				var announcement_id = this_item.attr('data-announcement-id');
				var nonce = this_item.attr('data-nonce');
				if (typeof listing_id !== typeof undefined && listing_id !== false) {
					mode = 'edit';
				}

				if(this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-announcements-addnew-wrapper').hasClass('active')) {
					this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-announcements-addnew-wrapper').slideToggle();
				}

				jQuery.ajax({
					type: "POST",
					url: dtdrannouncementsdashboardobject.ajaxurl,
					data:
					{
						action         : 'dtdr_dashbord_populate_announcement_fields',
						mode           : mode,
						listing_id     : listing_id,
						announcement_id: announcement_id,
						nonce          : nonce
					},
					success: function (response) {

						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-announcements-addnew-wrapper').html(response);
						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-announcements-addnew-wrapper').slideToggle();
						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-announcements-addnew-wrapper').addClass('active');

						// Chosen jQuery
						dtDirectoryCommonUtils.dtDirectoryChosenSelect('.dtdr-chosen-select');

					}
				});

				e.preventDefault();

			});


		// Submit Announcement

			jQuery( 'body' ).delegate( '.dtdr-submit-announcement-button', 'click', function(){

				var this_item = jQuery(this);

				var form = jQuery('.dtdr-dashbord-submit-announcement')[0];
				var data = new FormData(form);
				data.append('action', 'dtdr_submit_announcement');

				jQuery.ajax({
					type: "POST",
					url: dtdrannouncementsdashboardobject.ajaxurl,
					data: data,
					processData: false,
					contentType: false,
					cache: false,
					beforeSend: function(){
						this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
					},
					success: function (response) {

						form.reset();
						this_item.parents('.dtdr-dashbord-announcements-addnew-wrapper').slideToggle('slow');

						this_item.parents('.dtdr-dashbord-section-holder-content').find('.dtdr-dashboard-notices').addClass('dtdr-success-notice');
						this_item.parents('.dtdr-dashbord-section-holder-content').find('.dtdr-dashboard-notices').html(dtdrannouncementsdashboardobject.addAnnouncementSuccess);
						this_item.parents('.dtdr-dashbord-section-holder-content').find('.dtdr-dashboard-notices').slideToggle('slow');

						// Announcement Listing Loader
						dtDirectoryDashboardAnnouncementsUtils.announcementsListingLoader();

						window.setTimeout(function(){
							this_item.parents('.dtdr-dashbord-section-holder-content').find('.dtdr-dashboard-notices').slideToggle();
						}, 1600);

						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-announcements-addnew-wrapper').removeClass('active');

					},
					complete: function(){
						this_item.find('span').remove();
					}
				});

			});

			jQuery( 'body' ).delegate( '.dtdr-close-announcement-button', 'click', function(){

				var this_item = jQuery(this);

				this_item.parents('.dtdr-dashbord-announcements-addnew-wrapper').slideToggle('slow').html('').removeClass('active');;

			});


		// Announcement Listing Loader

			dtDirectoryDashboardAnnouncementsUtils.announcementsListingLoader();


		// Announcement Listing - Switch Active Status

			jQuery( 'body' ).delegate( '.dtdr-dashboard-announcement-status-marker', 'click', function(e) {

				var this_item = jQuery(this);
				var announcement_id = this_item.attr('data-announcement-id');
				var listing_id      = this_item.attr('data-listing-id');


				if(this_item.find('i').hasClass('fas fa-toggle-on')) {
					var action_type = 'remove';
				} else {
					var action_type = 'add';
				}


				jQuery.ajax({
					type: "POST",
					url: dtdrannouncementsdashboardobject.ajaxurl,
					data:
					{
						action         : 'dtdr_dashboard_announcement_status_marker',
						announcement_id: announcement_id,
						listing_id     : listing_id,
						action_type    : action_type,
					},
					success: function (response) {

						if(response == 'success-add') {
							this_item.html('<i class="fas fa-toggle-on"></i>');
						} else if(response == 'success-remove') {
							this_item.html('<i class="fas fa-toggle-off"></i>');
						}

					},
				});

				e.preventDefault();

			});


		// Announcement Listing - Delete

			jQuery( 'body' ).delegate( '.dtdr-dashboard-announcement-delete', 'click', function(e) {

				if(!confirm(dtdrannouncementsdashboardobject.confirmDeleteAnnouncement)) {
					return false;
				}

				var this_item       = jQuery(this);
				var announcement_id = this_item.attr('data-announcement-id');
				var listing_id      = this_item.attr('data-listing-id');
				var nonce           = this_item.attr('data-nonce');

				jQuery.ajax({
					type: "POST",
					url: dtdrannouncementsdashboardobject.ajaxurl,
					data:
					{
						action         : 'dtdr_dashboard_announcement_delete',
						announcement_id: announcement_id,
						listing_id     : listing_id,
						nonce          : nonce
					},
					success: function (response) {

						if(response == 'success') {

							// Announcement Listing Loader
							dtDirectoryDashboardAnnouncementsUtils.announcementsListingLoader();

						} else {

							var jsonParsed = JSON.parse(response);

							var data = '<ul>';
							jQuery.each( jsonParsed, function( i, val ) {
								data += '<li>' + val + '</li>';
							});
							data += '</ul>';

							this_item.parents('.dtdr-dashbord-section-holder-content').find('.dtdr-dashboard-notices').addClass('dtdr-success-notice');
							this_item.parents('.dtdr-dashbord-section-holder-content').find('.dtdr-dashboard-notices').html(data);
							this_item.parents('.dtdr-dashbord-section-holder-content').find('.dtdr-dashboard-notices').slideToggle('slow');

							window.setTimeout(function(){
								this_item.parents('.dtdr-dashbord-section-holder-content').find('.dtdr-dashboard-notices').slideToggle();
							}, 1600);

						}

					},
				});

				e.preventDefault();

			});

	}

};

jQuery(document).ready(function() {
	dtDirectoryDashboardAnnouncements.dtInit();
});