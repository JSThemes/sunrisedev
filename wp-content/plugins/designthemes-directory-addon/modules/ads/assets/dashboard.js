var dtDirectoryDashboardAdsUtils = {

	dtAdAddtoCartPurchasePreview :  function(this_item) {

		var parent_item = this_item.parents('.dtdr-dashbord-ad-form');

		var limelight = parent_item.find('.dtdr-ad-limelight:checked').val();
		var singlepage = parent_item.find('.dtdr-ad-singlepage:checked').val();
		var topofsearch = parent_item.find('.dtdr-ad-topofsearch:checked').val();

		var limelight_productid = '';
		if(limelight) {
			limelight_productid = parent_item.find('.dtdr-ad-limelight').data('productid');
		}

		var singlepage_productid = '';
		if(singlepage) {
			singlepage_productid = parent_item.find('.dtdr-ad-singlepage').data('productid');
		}

		var topofsearch_productid = '';
		if(topofsearch) {
			topofsearch_productid = parent_item.find('.dtdr-ad-topofsearch').data('productid');
		}

		var duration = parent_item.find('.dtdr-ad-duration').val();

		var listing_id = parent_item.find('.dtdr-ad-listing').val();

		jQuery.ajax({
			type: "POST",
			url: dtdrfrontendobject.ajaxurl,
			data:
			{
				action               : 'dtdr_populate_ad_addtocart_purchase_preview',
				limelight            : limelight,
				singlepage           : singlepage,
				topofsearch          : topofsearch,
				limelight_productid  : limelight_productid,
				singlepage_productid : singlepage_productid,
				topofsearch_productid: topofsearch_productid,
				duration             : duration,
				listing_id           : listing_id
			},
			success: function (response) {
				parent_item.find('.dtdr-ad-addtocart-purchase-preview').html(response);
			}
		});

	},

	adsListingLoader :  function() {

		if(jQuery('.dtdr-dashbord-ads-listing').length) {

			var	this_item = jQuery('.dtdr-dashbord-ads-listing');

			jQuery.ajax({
				type: "POST",
				url: dtdrfrontendobject.ajaxurl,
				data:
				{
					action : 'dtdr_dashbord_ads_listing'
				},
				success: function (response) {

					this_item.html(response);

				}
			});

		}

	}

};

var dtDirectoryDashboardAds = {

	dtInit : function() {


		// Ads Listing Loader

            dtDirectoryDashboardAdsUtils.adsListingLoader();


		// Add Ad Form

			jQuery('body').delegate('.dtdr-add-ad-button', 'click', function(e) {

				var	this_item = jQuery(this);

				if(this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-ads-addnew-wrapper').hasClass('active')) {
					this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-ads-addnew-wrapper').slideToggle();
				}

				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action         : 'dtdr_dashbord_populate_ad_form'
					},
					success: function (response) {

						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-ads-addnew-wrapper').html(response);
						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-ads-addnew-wrapper').slideToggle();
						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-ads-addnew-wrapper').addClass('active');

						// Chosen jQuery
						dtDirectoryCommonUtils.dtDirectoryChosenSelect('.dtdr-chosen-select');

					}
				});

				e.preventDefault();

			});


		// Add to Cart Purchase Preview

			jQuery( 'body' ).delegate( '.dtdr-ad-limelight, .dtdr-ad-singlepage, .dtdr-ad-topofsearch, .dtdr-ad-listing', 'change', function() {

				dtDirectoryDashboardAdsUtils.dtAdAddtoCartPurchasePreview(jQuery(this));

			});


		// Add to Cart Purchase Preview

			jQuery( 'body' ).delegate( '.dtdr-ad-duration', 'blur', function(e) {

				dtDirectoryDashboardAdsUtils.dtAdAddtoCartPurchasePreview(jQuery(this));

			});


		// Add to Cart In Action

			jQuery('body').delegate('.dtdr-ad-addtocart-button', 'click', function(e) {

				var this_item = jQuery(this);
				var parent_item = this_item.parents('.dtdr-dashbord-ad-form');

				var limelight = parent_item.find('.dtdr-ad-limelight:checked').val();
				var singlepage = parent_item.find('.dtdr-ad-singlepage:checked').val();
				var topofsearch = parent_item.find('.dtdr-ad-topofsearch:checked').val();

				var limelight_productid = '';
				if(limelight) {
					limelight_productid = parent_item.find('.dtdr-ad-limelight').data('productid');
				}

				var singlepage_productid = '';
				if(singlepage) {
					singlepage_productid = parent_item.find('.dtdr-ad-singlepage').data('productid');
				}

				var topofsearch_productid = '';
				if(topofsearch) {
					topofsearch_productid = parent_item.find('.dtdr-ad-topofsearch').data('productid');
				}

				var duration = parent_item.find('.dtdr-ad-duration').val();

				var listing_id = parent_item.find('.dtdr-ad-listing').val();

				if(duration == '') {
					alert(dtdrfrontendobject.adDurationWarning);
					return false;
				}

				if(limelight_productid == '' && singlepage_productid == '' && topofsearch_productid == '') {
					alert(dtdrfrontendobject.adPricingWarning);
					return false;
				}


				jQuery.ajax({
					type: "POST",
					url: dtdrfrontendobject.ajaxurl,
					data:
					{
						action               : 'dtdr_ad_addtocart_in_action',
						limelight            : limelight,
						singlepage           : singlepage,
						topofsearch          : topofsearch,
						limelight_productid  : limelight_productid,
						singlepage_productid : singlepage_productid,
						topofsearch_productid: topofsearch_productid,
						duration             : duration,
						listing_id           : listing_id
					},
					beforeSend: function(){
						this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
					},
					success: function () {

						this_item.parents('.dtdr-dashbord-section-holder').find('.dtdr-dashbord-ads-addnew-wrapper').slideToggle();

						window.setTimeout(function(){
							// Ads Listing Loader
							dtDirectoryDashboardAdsUtils.adsListingLoader();
						}, 800);

					},
					complete: function(){
						this_item.find('span').remove();
					}
				});

				e.preventDefault();

			});

	}

};

jQuery(document).ready(function() {
	dtDirectoryDashboardAds.dtInit();
});