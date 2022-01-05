var dtDirectoryBackendStatisticsUtils = {

	dtDirectoryStatisticsSellers : function() {

		jQuery.ajax({
			type: "POST",
			url: dtdrbackendobject.ajaxurl,
			data:
			{
				action: 'dtdr_statistics_sellers',
			},
			beforeSend: function(){
				dtDirectoryBackendUtils.dtDirectoryAjaxBeforeSend(jQuery('.dtdr-statistics-sellers-container'));
			},
			success: function (response) {
				jQuery('.dtdr-statistics-sellers-container').find('.dtdr-statistics-sellers-data-container').html(response);
			},
			complete: function(){
				dtDirectoryBackendUtils.dtDirectoryAjaxAfterSend(jQuery('.dtdr-statistics-sellers-container'));
			}
		});

	}

};


var dtDirectorBackendStatistics = {

	dtInit : function() {

		// Listing - Statistics

			jQuery( 'body' ).delegate( '.dtdr-statistics-listings-seller', 'change', function(e) {

				var this_item = jQuery(this),
					seller_id = this_item.val();

				jQuery.ajax({
					type: "POST",
					url: dtdrbackendobject.ajaxurl,
					data:
					{
						action: 'dtdr_statistics_sellerwise_listings',
						seller_id: seller_id,
					},
					beforeSend: function(){
						dtDirectoryBackendUtils.dtDirectoryAjaxBeforeSend(this_item.parents('.dtdr-statistics-container'));
					},
					success: function (response) {
						this_item.parents('.dtdr-statistics-container').find('.dtdr-statistics-listings-data-container').html(response);
					},
					complete: function(){
						dtDirectoryBackendUtils.dtDirectoryAjaxAfterSend(this_item.parents('.dtdr-statistics-container'));
					}
				});

				e.preventDefault();

			});

			jQuery('.dtdr-statistics-listings-seller').trigger('change');


		// Listings Seller - Statistics

			if(jQuery('.dtdr-statistics-sellers-container').length) {
				dtDirectoryBackendStatisticsUtils.dtDirectoryStatisticsSellers();
			}


		// Seller Incharge - Statistics

			jQuery( 'body' ).delegate( '.dtdr-statistics-seller-incharges', 'click', function(e) {

				var this_item = jQuery(this),
					seller_id = this_item.attr('data-sellerid');

				jQuery.ajax({
					type: "POST",
					url: dtdrbackendobject.ajaxurl,
					data:
					{
						action: 'dtdr_statistics_seller_incharges',
						seller_id: seller_id,
					},
					beforeSend: function(){
						dtDirectoryBackendUtils.dtDirectoryAjaxBeforeSend(this_item.parents('.dtdr-statistics-container'));
					},
					success: function (response) {
						this_item.parents('.dtdr-statistics-container').find('.dtdr-statistics-sellers-inner-data-container').html(response);
					},
					complete: function(){
						dtDirectoryBackendUtils.dtDirectoryAjaxAfterSend(this_item.parents('.dtdr-statistics-container'));
					}
				});

				e.preventDefault();

			});


		// Seller Listings - Statistics

			jQuery( 'body' ).delegate( '.dtdr-statistics-seller-listings', 'click', function(e) {

				var this_item = jQuery(this),
					seller_id = this_item.attr('data-sellerid');

				jQuery.ajax({
					type: "POST",
					url: dtdrbackendobject.ajaxurl,
					data:
					{
						action: 'dtdr_statistics_seller_listings',
						seller_id: seller_id,
					},
					beforeSend: function(){
						dtDirectoryBackendUtils.dtDirectoryAjaxBeforeSend(this_item.parents('.dtdr-statistics-container'));
					},
					success: function (response) {
						this_item.parents('.dtdr-statistics-container').find('.dtdr-statistics-sellers-inner-data-container').html(response);
					},
					complete: function(){
						dtDirectoryBackendUtils.dtDirectoryAjaxAfterSend(this_item.parents('.dtdr-statistics-container'));
					}
				});

				e.preventDefault();

			});

	}

};

jQuery(document).ready(function() {

	dtDirectorBackendStatistics.dtInit();

});