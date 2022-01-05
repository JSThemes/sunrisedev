
var dtDirectoryBackendPackages = {

	dtInit : function() {

		// Switch options between Buyer and Seller pacakge
		jQuery('body').delegate('.dtdr-package-type', 'change', function(e){

			jQuery('.dtdr-package-type-seller').slideUp();
			if(jQuery(this).val() == 'seller') {
				jQuery('.dtdr-package-type-seller').slideDown();
			}
			e.preventDefault();

		});

	}

};

jQuery(document).ready(function() {

	dtDirectoryBackendPackages.dtInit();

});