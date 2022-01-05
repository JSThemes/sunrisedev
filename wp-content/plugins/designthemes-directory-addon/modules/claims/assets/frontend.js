var dtDirectorClaims = {

	dtInit : function() {

		// Claim Form

			jQuery( 'body' ).delegate( '.dtdr-generate-claimform', 'click', function(e){

				var this_item  = jQuery(this);
				var user_id    = this_item.attr('data-userid');
				var listing_id = this_item.attr('data-listingid');
				var author_id  = this_item.attr('data-authorid');
				var claim_submitted  = this_item.attr('data-claimsubmitted');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action    : 'dtdr_generate_claimform',
						user_id   : user_id,
						listing_id: listing_id,
						author_id : author_id,
						claim_submitted : claim_submitted
					},
					beforeSend: function(){
						dtDirectoryCommonUtils.dtDirectoryAjaxBeforeSend(undefined);
					},
					success: function (response) {

						jQuery('body').find('.dtdr-claim-form-container').remove();
						jQuery('body').find('.dtdr-claim-form-overlay').remove();
						jQuery('body').append(response);

						// File Upload

							jQuery('body').on('change', '.dtdr-claimform-verification-file-upload', function() {
								var input = jQuery(this),
								inputFiles = input.get(0).files,
								selectedFiles = '';

								selectedFiles = inputFiles[0]['name'];
								if(inputFiles.length > 1) {
									selectedFiles = selectedFiles + ' + ' + (inputFiles.length-1);
								}

								jQuery('.dtdr-claimform-verification-file-label').html(selectedFiles);

							});

					},
					complete: function() {
						dtDirectoryCommonUtils.dtDirectoryAjaxAfterSend(undefined);
					}
				});

				e.preventDefault();

			});


		// Close Claim Form

			jQuery( 'body' ).delegate( '.dtdr-claim-form-overlay', 'click', function(e){

				jQuery('body').find('.dtdr-claim-form-container').fadeOut();
				jQuery('body').find('.dtdr-claim-form-overlay').fadeOut();

				e.preventDefault();

			});


		// Claim form submit

			jQuery( 'body' ).delegate( '.dtdr-claimform-submit-button', 'click', function(e) {

				var this_item = jQuery(this);
				var notification_box = this_item.parents('.dtdr-listings-claim-form').find('.dtdr-claimform-notification-box');

				var form = jQuery('.dtdr-listings-claim-form')[0];
				var data = new FormData(form);
				data.append('action', 'dtdr_process_listing_claimform');

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data: data,
					enctype: 'multipart/form-data',
					processData: false,
					contentType: false,
					cache: false,
					dataType: "JSON",
					async : true,
					beforeSend: function() {
						this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
					},
					success: function (response) {
						notification_box.removeClass('dtdr-success dtdr-failure');
						if(response.success) {

							notification_box.addClass('dtdr-success');
							notification_box.html(response.message);

							window.setTimeout(function(){
								location.reload();
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

	}

};


jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorClaims.dtInit();
	}

});


( function( $ ) {

	var dtDirectorClaimsJs = function($scope, $){
		dtDirectorClaims.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sp-claim-listing.default', dtDirectorClaimsJs);
		}
	});

} )( jQuery );