jQuery(document).ready(function() {

	// Attachments

		jQuery('body').delegate('.dtdr-add-attachments-box', 'click', function(e) {

			var clone = jQuery('.dtdr-attachments-box-item-toclone').clone();
			clone.attr('class', 'dtdr-attachments-box-item').removeClass('hidden');
			clone.find('#dtdr_media_attachments_titles').attr('name', 'dtdr_media_attachments_titles[]').removeAttr('id').addClass('dtdr_media_attachments_titles');
			clone.find('#dtdr_media_attachments_items').attr('name', 'dtdr_media_attachments_items[]').removeAttr('id');

			clone.appendTo('.dtdr-attachments-box-item-holder');

			e.preventDefault();

		});

		jQuery('body').delegate('.dtdr-remove-attachments','click', function(e){

			jQuery(this).parents('.dtdr-attachments-box-item').remove();
			e.preventDefault();

		});

		if (jQuery().sortable) {
			jQuery('.dtdr-attachments-box-item-holder').sortable({
				placeholder: 'sortable-placeholder'
			});
		}

});