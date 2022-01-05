var dtDirectoryBackendStatisticsPackagesUtils = {

	dtDirectoryStatisticsPackageListings : function() {

		jQuery.ajax({
			type: "POST",
			url: dtdrbackendobject.ajaxurl,
			data:
			{
				action: 'dtdr_statistics_packages',
			},
			beforeSend: function(){
				dtDirectoryBackendUtils.dtDirectoryAjaxBeforeSend(jQuery('.dtdr-statistics-packages-container'));
			},
			success: function (response) {
				jQuery('.dtdr-statistics-packages-container').find('.dtdr-statistics-packages-data-container').html(response);
			},
			complete: function(){
				dtDirectoryBackendUtils.dtDirectoryAjaxAfterSend(jQuery('.dtdr-statistics-packages-container'));
			}
		});

	}

};


var dtDirectorBackendStatisticsPackages = {

	dtInit : function() {

		// Packages - Statistics

			if(jQuery('.dtdr-statistics-packages-container').length) {
				dtDirectoryBackendStatisticsPackagesUtils.dtDirectoryStatisticsPackageListings();
			}


		// Packages Inner Data - Statistics

			jQuery( 'body' ).delegate( '.dtdr-statistics-package-purchases', 'click', function(e) {

				var this_item = jQuery(this),
					package_id = this_item.attr('data-packageid');

				jQuery.ajax({
					type: "POST",
					url: dtdrbackendobject.ajaxurl,
					data:
					{
						action: 'dtdr_statistics_packages_purchases_user_details',
						package_id: package_id,
					},
					beforeSend: function(){
						dtDirectoryBackendUtils.dtDirectoryAjaxBeforeSend(this_item.parents('.dtdr-statistics-container'));
					},
					success: function (response) {
						this_item.parents('.dtdr-statistics-container').find('.dtdr-statistics-packages-inner-data-container').html(response);
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

	dtDirectorBackendStatisticsPackages.dtInit();

});