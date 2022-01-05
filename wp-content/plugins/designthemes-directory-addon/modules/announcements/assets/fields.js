jQuery(document).ready(function() {

	// Media Video

		jQuery('body').delegate('.dtdr-add-announcements-box', 'click', function(e) {

			var clone = jQuery('.dtdr-announcements-box-item-toclone').clone();
			clone.attr('class', 'dtdr-announcements-box-item').removeClass('hidden');
			clone.find('#dtdr_announcements').attr('name', 'dtdr_announcements[]').removeAttr('id').addClass('dtdr_announcements');

			clone.appendTo('.dtdr-announcements-box-item-holder');

			e.preventDefault();

		});

		jQuery('body').delegate('.dtdr-remove-announcements','click', function(e){

			jQuery(this).parents('.dtdr-announcements-box-item').remove();
			e.preventDefault();

		});

		if (jQuery().sortable) {
			jQuery('.dtdr-announcements-box-item-holder').sortable({
				placeholder: 'sortable-placeholder'
			});
		}

});