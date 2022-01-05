var dtDirectoryDashboard = {

	dtInit : function() {

		// Add incharge

			jQuery( 'body' ).delegate( '.dtdr-add-incharge-button', 'click', function(){

				var this_item          = jQuery(this),
					dashboard_page_url = jQuery('.dtdr_dashboard_page_url').val(),
					seller_id          = this_item.attr('data-seller-id'),
					incharge_id           = this_item.attr('data-incharge-edit-item-id'),
					incharge_mode         = this_item.attr('data-incharge-mode');

				var form = jQuery('.dtdr-dashboard-addincharge-form')[0];
				var data = new FormData(form);
				data.append('action', 'dtdr_dashboard_addincharge_profile');
				data.append('seller_id', seller_id);
				data.append('incharge_id', incharge_id);
				data.append('incharge_mode', incharge_mode);


				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data: data,
					processData: false,
					contentType: false,
					cache: false,
					beforeSend: function(){
						this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
					},
					success: function (response) {

						jQuery('.dtdr-dashboard-notices').removeClass('dtdr-success-notice').removeClass('dtdr-warning-notice');

						if(response == 'success') {

							jQuery('.dtdr-dashboard-notices').addClass('dtdr-success-notice');
							jQuery('.dtdr-dashboard-notices').html(dtdrfrontendobject.updateInchargeSuccess);

							window.setTimeout(function(){
								window.location.replace(dashboard_page_url + '?type=myincharges');
							}, 1200);

						} else {

							var jsonParsed = JSON.parse(response);

							var data = '<ul>';
							jQuery.each( jsonParsed, function( i, val ) {
								data += '<li>' + val + '</li>';
							});
							data += '</ul>';

							jQuery('.dtdr-dashboard-notices').addClass('dtdr-warning-notice');
							jQuery('.dtdr-dashboard-notices').html(data);

						}

					},
					complete: function(){
						this_item.find('span').remove();
					}
				});

			});


		// Remove incharge

			jQuery( 'body' ).delegate( '.dtdr-remove-incharge', 'click', function(){


				if(!confirm(dtdrfrontendobject.confirmRemoveIncharge)) {
					return false;
				}

				var this_item          = jQuery(this),
					dashboard_page_url = this_item.attr('data-dashboard-page-url'),
					seller_id          = this_item.attr('data-seller-id'),
					incharge_id           = this_item.attr('data-incharge-id'),
					nonce              = this_item.attr('data-nonce');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action: 'dtdr_remove_seller_incharge',
						seller_id: seller_id,
						incharge_id: incharge_id,
						nonce: nonce,
					},
					success: function (response) {

						if(response == 'success') {

							window.setTimeout(function(){
								window.location.replace(dashboard_page_url + '?type=myincharges');
							}, 1200);

						} else {

							var jsonParsed = JSON.parse(response);

							var data = '<ul>';
							jQuery.each( jsonParsed, function( i, val ) {
								data += '<li>' + val + '</li>';
							});
							data += '</ul>';

							jQuery('.dtdr-dashboard-notices').addClass('dtdr-info-notice');
							jQuery('.dtdr-dashboard-notices').html(data);

						}


					}
				});

			});


		// Activate incharge

			jQuery( 'body' ).delegate( '.dtdr-dashboard-activate-disabled-incharge', 'click', function(e) {

				var this_item               = jQuery(this);
				var incharge_id                = this_item.attr('data-incharge-id');
				var seller_id               = this_item.attr('data-seller-id');
				var requires_admin_approval = this_item.attr('data-requires-admin-approval');
				var nonce                   = this_item.attr('data-nonce');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action: 'dtdr_dashboard_activate_disabled_incharge',
						incharge_id: incharge_id,
						seller_id: seller_id,
						requires_admin_approval: requires_admin_approval,
						nonce: nonce
					},
					success: function (response) {

						var responseSplited = response.split('|');
						var response = responseSplited[0];
						var responseCount = responseSplited[1];

						if(response == 'success') {

							if(requires_admin_approval == 'true') {
								this_item.parents('tr').find('.dtdr-incharge-status').html(dtdrfrontendobject.inchargeStatusWaitingForApproval);
							} else {
								this_item.parents('tr').find('.dtdr-incharge-status').html(dtdrfrontendobject.inchargeStatusActive);
							}

							this_item.remove();

						} else if(response == 'fail') {

							this_item.html('<i class="far fa-share-square"></i>');
							setTimeout( function() {
								this_item.html('<i class="fas fa-share-square"></i>');
							}, 200);

						}

						jQuery('.dtdr-dashboard-package-detail-value.dtdr-incharges-remaining-data').html(responseCount);

					},
				});

				e.preventDefault();

			});


		// Add listings

			jQuery( 'body' ).delegate( '.dtdr-add-listing-button', 'click', function(){

				var this_item = jQuery(this),
					dashboard_page_url = jQuery('.dtdr_dashboard_page_url').val(),
					listing_mode = this_item.attr('data-listing-mode'),
					listing_edit_item_id = this_item.attr('data-listing-edit-item-id'),
					user_id = this_item.attr('data-user-id'),
					seller_id = this_item.attr('data-seller-id');

				var form = jQuery('.dtdr-add-listing')[0];
				var data = new FormData(form);
				data.append('action', 'dtdr_add_frontend_listing');
				data.append('dtdr_listing_mode', listing_mode);
				data.append('dtdr_listing_edit_item_id', listing_edit_item_id);
				data.append('user_id', user_id);
				data.append('seller_id', seller_id);

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data: data,
					processData: false,
					contentType: false,
					cache: false,
					beforeSend: function(){
						this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
					},
					success: function (response) {

						jQuery('.dtdr-dashboard-notices').removeClass('dtdr-success-notice').removeClass('dtdr-warning-notice');

						if(response == 'success') {

							jQuery('.dtdr-dashboard-notices').addClass('dtdr-success-notice');
							jQuery('.dtdr-dashboard-notices').html(dtdrfrontendobject.addListingSuccess);

							window.setTimeout(function(){
								window.location.replace(dashboard_page_url + '?type=mylistings');
							}, 1200);

						} else {

							var jsonParsed = JSON.parse(response);

							var data = '<ul>';
							jQuery.each( jsonParsed, function( i, val ) {
								data += '<li>' + val + '</li>';
							});
							data += '</ul>';

							jQuery('.dtdr-dashboard-notices').addClass('dtdr-warning-notice');
							jQuery('.dtdr-dashboard-notices').html(data);

						}

					},
					complete: function(){
						this_item.find('span').remove();
					}
				});

			});


		// Remove listing

			jQuery( 'body' ).delegate( '.dtdr-remove-listing', 'click', function(){


				if(!confirm(dtdrfrontendobject.confirmRemoveListing)) {
					return false;
				}

				var this_item          = jQuery(this),
					dashboard_page_url = this_item.attr('data-dashboard-page-url'),
					listing_id        = this_item.attr('data-listing-id'),
					user_id            = this_item.attr('data-user-id'),
					seller_id          = this_item.attr('data-seller-id'),
					nonce              = this_item.attr('data-nonce');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action: 'dtdr_remove_seller_listing',
						listing_id: listing_id,
						user_id: user_id,
						seller_id: seller_id,
						nonce: nonce,
					},
					success: function (response) {

						if(response == 'success') {

							window.setTimeout(function(){
								window.location.replace(dashboard_page_url + '?type=mylistings');
							}, 1200);

						} else {

							var jsonParsed = JSON.parse(response);

							var data = '<ul>';
							jQuery.each( jsonParsed, function( i, val ) {
								data += '<li>' + val + '</li>';
							});
							data += '</ul>';

							jQuery('.dtdr-dashboard-notices').addClass('dtdr-info-notice');
							jQuery('.dtdr-dashboard-notices').html(data);

						}


					}
				});

			});


		// Submit listing for approval

			jQuery( 'body' ).delegate( '.dtdr-dashboard-submit-listing-for-approval', 'click', function(e) {

				var this_item               = jQuery(this);
				var listing_id             = this_item.attr('data-listing-id');
				var seller_id               = this_item.attr('data-seller-id');
				var requires_admin_approval = this_item.attr('data-requires-admin-approval');
				var nonce                   = this_item.attr('data-nonce');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action: 'dtdr_dashboard_submit_listing_for_approval',
						listing_id: listing_id,
						seller_id: seller_id,
						requires_admin_approval: requires_admin_approval,
						nonce: nonce
					},
					success: function (response) {

						var responseSplited = response.split('|');
						var response = responseSplited[0];
						var responseCount = responseSplited[1];

						if(response == 'success') {

							if(requires_admin_approval == 'true') {
								this_item.parents('.dtdr-listing-details').find('.dtdr-listing-dashboard-status').html(dtdrfrontendobject.listingWaitingForApproval);
							} else {
								this_item.parents('.dtdr-listing-details').find('.dtdr-listing-dashboard-status').html(dtdrfrontendobject.listingPublish);
							}

							this_item.remove();

						} else if(response == 'fail') {

							this_item.html('<i class="far fa-share-square"></i>');
							setTimeout( function() {
								this_item.html('<i class="fas fa-share-square"></i>');
							}, 200);

						}

						jQuery('.dtdr-dashboard-package-detail-value.dtdr-listings-remaining-data').html(responseCount);

					},
				});

				e.preventDefault();

			});


		// Update user profile

			jQuery( 'body' ).delegate( '.dtdr-update-profile-button', 'click', function(){

				var this_item = jQuery(this),
					dashboard_page_url = jQuery('.dtdr_dashboard_page_url').val();

				var form = jQuery('.dtdr-dashboard-profile-form')[0];
				var data = new FormData(form);
				data.append('action', 'dtdr_dashboard_update_user_profile');


				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data: data,
					processData: false,
					contentType: false,
					cache: false,
					beforeSend: function(){
						this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
					},
					success: function (response) {

						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').removeClass('dtdr-success-notice').removeClass('dtdr-warning-notice');

						if(response == 'success') {

							this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').addClass('dtdr-success-notice');
							this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').html(dtdrfrontendobject.updateProfileSuccess);

							window.setTimeout(function(){
								window.location.replace(dashboard_page_url + '?type=myprofile');
							}, 1200);

						} else {

							var jsonParsed = JSON.parse(response);

							var data = '<ul>';
							jQuery.each( jsonParsed, function( i, val ) {
								data += '<li>' + val + '</li>';
							});
							data += '</ul>';

							this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').addClass('dtdr-warning-notice');
							this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').html(data);

						}

					},
					complete: function(){
						this_item.find('span').remove();
					}
				});

			});


		// Update user password

			jQuery( 'body' ).delegate( '.dtdr-update-userpwd-button', 'click', function(){

				var this_item = jQuery(this),
					dashboard_page_url = jQuery('.dtdr_dashboard_page_url').val();

				var form = jQuery('.dtdr-dashboard-profile-changepwd-form')[0];
				var data = new FormData(form);
				data.append('action', 'dtdr_dashboard_update_user_password');


				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data: data,
					processData: false,
					contentType: false,
					cache: false,
					beforeSend: function(){
						this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
					},
					success: function (response) {

						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').removeClass('dtdr-success-notice').removeClass('dtdr-warning-notice');

						if(response == 'success') {

							this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').addClass('dtdr-success-notice');
							this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').html(dtdrfrontendobject.updateProfilePwdSuccess);

							window.setTimeout(function(){
								window.location.replace(dashboard_page_url + '?type=mylistings');
							}, 1200);

						} else {

							var jsonParsed = JSON.parse(response);

							var data = '<ul>';
							jQuery.each( jsonParsed, function( i, val ) {
								data += '<li>' + val + '</li>';
							});
							data += '</ul>';

							this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').addClass('dtdr-warning-notice');
							this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashboard-notices').html(data);

						}

					},
					complete: function(){
						this_item.find('span').remove();
					}
				});

			});


		// Mark item as featured

			jQuery( 'body' ).delegate( '.dtdr-dashboard-markitem-featured', 'click', function(e) {

				var this_item = jQuery(this);
				var listing_id = this_item.attr('data-listing-id');
				var seller_id = this_item.attr('data-seller-id');
				var admin_id = this_item.attr('data-admin-id');

				if(this_item.find('i').hasClass('fas fa-star')) {
					var action_type = 'remove';
				} else {
					var action_type = 'add';
				}


				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action: 'dtdr_dashboard_markitem_featured',
						listing_id: listing_id,
						seller_id: seller_id,
						admin_id: admin_id,
						action_type: action_type,
					},
					success: function (response) {

						var responseSplited = response.split('|');
						var response = responseSplited[0];
						var responseCount = responseSplited[1];

						if(response == 'success-add') {
							this_item.html('<i class="fas fa-star"></i>');
						} else if(response == 'success-remove') {
							this_item.html('<i class="far fa-star"></i>');
						} else if(response == 'fail') {
							this_item.html('<i class="fas fa-star"></i>');
							setTimeout( function() {
								this_item.html('<i class="far fa-star"></i>');
							}, 200);
						}

						jQuery('.dtdr-dashboard-package-detail-value.dtdr-featured-remaining-data').html(responseCount);

					},
				});

				e.preventDefault();

			});


		// Contact admin form submit

			jQuery( 'body' ).delegate( '.dtdr-dashboard-contactadmin-submit-button', 'click', function(e) {

				var this_item = jQuery(this);
				var notification_box = this_item.parents('.dtdr-dashboard-contactadmin-form').find('.dtdr-dashboard-contactadmin-notification-box');

				var form = jQuery('.dtdr-dashboard-contactadmin-form')[0];
				var data = new FormData(form);
				data.append('action', 'dtdr_process_dashboard_contactadmin');

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


		// Remove favourite listing

			jQuery( 'body' ).delegate( '.dtdr-remove-favourite-listing', 'click', function() {


				if(!confirm(dtdrfrontendobject.confirmRemoveFavouriteListing)) {
					return false;
				}

				var	this_item          = jQuery(this),
					dashboard_page_url = this_item.attr('data-dashboard-page-url'),
					listing_id         = this_item.attr('data-listing-id'),
					user_id            = this_item.attr('data-user-id'),
					nonce              = this_item.attr('data-nonce');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action: 'dtdr_remove_favourite_listing',
						listing_id: listing_id,
						user_id: user_id,
						nonce: nonce,
					},
					success: function (response) {

						if(response == 'success') {

							window.setTimeout(function(){
								window.location.replace(dashboard_page_url + '?type=favouritelisting');
							}, 1200);

						} else {

							var jsonParsed = JSON.parse(response);

							var data = '<ul>';
							jQuery.each( jsonParsed, function( i, val ) {
								data += '<li>' + val + '</li>';
							});
							data += '</ul>';

							jQuery('.dtdr-dashboard-notices').addClass('dtdr-info-notice');
							jQuery('.dtdr-dashboard-notices').html(data);

						}


					}
				});

			});


		// Inbox Load Conversation

			jQuery( 'body' ).delegate( '.dtdr-dashbord-inbox-conversation-loader', 'click', function() {

				var	this_item = jQuery(this),
					author_id    = this_item.attr('data-authorid'),
					listing_id   = this_item.attr('data-listingid'),
					user_email   = this_item.attr('data-useremail');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action    : 'dtdr_inbox_conversation_loader',
						author_id : author_id,
						listing_id: listing_id,
						user_email: user_email
					},
					success: function (response) {

						jQuery( '.dtdr-dashbord-inbox-conversation-loader' ).removeClass('active');
						this_item.addClass('active');
						jQuery('.dtdr-dashbord-inbox-listing-conversation-wrapper').html(response);

					}
				});

			});


		// Inbox Reply Conversation

			jQuery( 'body' ).delegate( '.dtdr-dashbord-inbox-conversation-reply-loader', 'click', function() {

				jQuery('.dtdr-dashbord-inbox-conversation-reply-wrapper').addClass('hidden');
				jQuery(this).parent().find('.dtdr-dashbord-inbox-conversation-reply-wrapper').removeClass('hidden');

				jQuery(this).parents('li').find('.dtdr-inbox-conversation-reply-notification-box').html('');

			});


		// Inbox Reply Form

			jQuery( 'body' ).delegate( '.dtdr-inbox-conversation-reply-submit', 'click', function(e) {

				var this_item = jQuery(this);
				var notification_box = this_item.parents('.dtdr-inbox-conversation-reply-form').find('.dtdr-inbox-conversation-reply-notification-box');

				var form = this_item.parents('.dtdr-inbox-conversation-reply-form')[0];
				var data = new FormData(form);
				data.append('action', 'dtdr_process_inbox_conversation_reply_form');

				jQuery.ajax({
					type: 'POST',
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

							window.setTimeout(function() {

								this_item.parents('.dtdr-inbox-conversation-reply-form').find('textarea').val('');
								jQuery('.dtdr-dashbord-inbox-conversation-reply-wrapper').addClass('hidden');

								this_item.parents('li').find('.dtdr-dashbord-inbox-conversation-reply-list-wrapper').replaceWith(response.replay_message);

							}, 800);

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


		// Reviews Loader

			jQuery( 'body' ).delegate( '.dtdr-dashbord-reviews-loader', 'click', function() {

				var	this_item = jQuery(this),
					author_id    = this_item.attr('data-authorid');

				var review_type = '';
				if(this_item.hasClass('all')) {
					review_type = 'all';
				} else if(this_item.hasClass('received')) {
					review_type = 'received';
				} else if(this_item.hasClass('submitted')) {
					review_type = 'submitted';
				}

				jQuery( '.dtdr-dashbord-reviews-loader' ).removeClass('dtdr-active');
				this_item.addClass('dtdr-active');


				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action     : 'dtdr_dashbord_reviews_loader',
						author_id  : author_id,
						review_type: review_type
					},
					success: function (response) {

						jQuery('.dtdr-dashbord-reviews-listing-wrapper').html(response);

						jQuery('.dtdr_comment_gallery_item').each(function() {
							var attr = jQuery(this).attr('rel');
							if (jQuery('a[rel^="'+attr+'"]').length) {
								jQuery('a[rel^="'+attr+'"]').prettyPhoto({
									hook: 'rel',
									show_title: false,
									deeplinking: false,
									social_tools: false,
							});
							}
						});

					}
				});

			});

			if(jQuery('.dtdr-dashbord-reviews-loader.all').length) {
				jQuery('.dtdr-dashbord-reviews-loader.all').trigger('click');
			}


	}

};

jQuery(document).ready(function() {
	dtDirectoryDashboard.dtInit();
});