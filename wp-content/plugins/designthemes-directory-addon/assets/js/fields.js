
var dtDirectoryFields = {

	dtInit : function() {

		// Chosen JS - Social Links

			dtDirectoryCommonUtils.dtDirectoryChosenSelect('.dtdr-social-chosen-select');


		// Generate MLS number

			jQuery( 'body' ).delegate( '.dtdr-generate-mls-number', 'click', function(){

				jQuery.ajax({
					type: "POST",
					url: dtdrcommonobject.ajaxurl,
					data:
					{
						action: 'dtdr_generate_mls_number'
					},
					success: function (response) {

						jQuery('.dtdr-mls-number').val(response);

					}
				});

			});


		// Features

			jQuery('body').delegate('.dtdr-add-features-box', 'click', function(e) {

				var clone = jQuery('.dtdr-features-box-item-toclone').clone();
				clone.attr('class', 'dtdr-features-box-item').removeClass('hidden');
				clone.find('#dtdr_tab_id').attr('class', 'dtdr_tab_id').removeAttr('id');
				clone.find('#dtdr_features_title').attr('name', 'dtdr_features_title[]').removeAttr('id');
				clone.find('#dtdr_features_subtitle').attr('name', 'dtdr_features_subtitle[]').removeAttr('id');
				clone.find('#dtdr_features_value').attr('name', 'dtdr_features_value[]').removeAttr('id');
				clone.find('#dtdr_features_valueunit').attr('name', 'dtdr_features_valueunit[]').removeAttr('id');
				clone.find('#dtdr_features_icon').attr('name', 'dtdr_features_icon[]').removeAttr('id');
				clone.find('#dtdr_features_image').attr('name', 'dtdr_features_image[]').removeAttr('id');

				clone.appendTo('.dtdr-features-box-item-holder');

				$i = 0;
				jQuery('.dtdr_tab_id').each(function() {
					jQuery(this).val($i);
					$i++;
				})

				e.preventDefault();

			});

			jQuery('body').delegate('.dtdr-remove-features','click', function(e){

				jQuery(this).parents('.dtdr-features-box-item').remove();
				$i = 0;
				jQuery('.dtdr_tab_id').each(function() {
					jQuery(this).val($i);
					$i++;
				})
				e.preventDefault();

			});

			if (jQuery().sortable) {
				jQuery('.dtdr-features-box-item-holder').sortable({
					placeholder: 'sortable-placeholder',
					update: function( event, ui ) {
						$i = 0;
						jQuery('.dtdr_tab_id').each(function() {
							jQuery(this).val($i);
							$i++;
						})
					}
				});
			}


		// Social Details

			jQuery('a.dtdr-add-social-details').click(function(e){

				var clone = jQuery('#dtdr-social-details-section-to-clone').clone();

				clone.attr('class', 'dtdr-social-item-section').removeClass('hidden').removeAttr('id');
				clone.find('select').attr('name', 'dtdr_social_items[]').addClass('dtdr-social-chosen-select');
				clone.find('input').attr('name', 'dtdr_social_items_value[]');
				clone.appendTo('.dtdr-social-item-details-container');

				dtDirectoryCommonUtils.dtDirectoryChosenSelect('.dtdr-social-chosen-select');

				e.preventDefault();

			});

			jQuery('body').delegate('span.dtdr-remove-social-item','click', function(e){

				jQuery(this).parents('.dtdr-social-item-section').remove();
				e.preventDefault();

			});

			if (jQuery().sortable) {
				jQuery('.dtdr-social-item-details-container').sortable({ placeholder: 'sortable-placeholder' });
			}

	}

};

jQuery(document).ready(function() {

	dtDirectoryFields.dtInit();

});