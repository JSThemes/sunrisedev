jQuery(document).ready(function() {

	jQuery('.dtdr-radio-switch:not(.disabled)').each( function() {
		jQuery(this).click(function(e) {

			var $switchElement = jQuery(this);
			var $parentElement = jQuery(this).attr('data-radioswitch');

			var oldClassOn = false;
			if ($switchElement.hasClass('radio-switch-on')) {
				oldClassOn = true;
			}

			var old_claimer_id = parseInt($switchElement.parents('.dtdr-column').find('.dtdr_approved_old_claimer_id').val(), 10);

			$switchElement.parents('.dtdr-column').find('.dtdr_approved_claimer_id').val('');

			$switchElement.parents('.'+$parentElement).find('tr').each(function () {

				var listingsCountLoop = jQuery(this).find('.dtdr-package-listings').val();
				var usedListingsCountLoop = jQuery(this).find('.dtdr-package-used-listings').val();
				var current_claimer_id = jQuery(this).find('.dtdr-user-id').val();

				if(old_claimer_id == current_claimer_id) {
					usedListingsCountLoop = parseInt(usedListingsCountLoop, 10) - 1;
				}

				if(listingsCountLoop == -1) {
					var remainingListingsLoop = -1;
				} else {
					var remainingListingsLoop = parseInt(listingsCountLoop, 10) - parseInt(usedListingsCountLoop, 10);
				}

				jQuery(this).find('.dtdr-remaining-listings-label').html(remainingListingsLoop);
				jQuery(this).find('.dtdr-package-used-listings-updated').val(usedListingsCountLoop);

				jQuery(this).find('.dtdr-radio-switch').removeClass('radio-switch-on').addClass('radio-switch-off');
				jQuery(this).find('.dtdr-radio-switch-field').removeAttr('checked');

			});

			// Update active item

			if (!oldClassOn) {

				$switchElement.removeClass('radio-switch-off').addClass('radio-switch-on');
				var $switchElementField = '#' + $switchElement.attr('data-for');
				jQuery($switchElementField).attr('checked', 'checked');


				var listingsCount = $switchElement.parents('tr').find('.dtdr-package-listings').val();
				var usedListingsCount = $switchElement.parents('tr').find('.dtdr-package-used-listings-updated').val();
				usedListingsCount = parseInt(usedListingsCount, 10) + 1;

				var remainingListings = parseInt(listingsCount, 10) - parseInt(usedListingsCount, 10);

				$switchElement.parents('tr').find('.dtdr-remaining-listings-label').html(remainingListings);
				$switchElement.parents('tr').find('.dtdr-package-used-listings-updated').val(usedListingsCount);

				var $switchVal = $switchElement.parents('td').find('.dtdr-radio-switch-field').val();
				$switchElement.parents('.dtdr-column').find('.dtdr_approved_claimer_id').val($switchVal);

			}


			e.preventDefault();

		});
	});

});