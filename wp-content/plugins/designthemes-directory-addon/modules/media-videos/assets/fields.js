jQuery(document).ready(function() {

	// Media Video

		jQuery('body').delegate('.dtdr-add-media-videos-box', 'click', function(e) {

			var clone = jQuery('.dtdr-media-videos-box-item-toclone').clone();
			clone.attr('class', 'dtdr-media-videos-box-item').removeClass('hidden');
			clone.find('#dtdr_media_videos').attr('name', 'dtdr_media_videos[]').removeAttr('id').addClass('dtdr_media_videos');

			clone.appendTo('.dtdr-media-videos-box-item-holder');

			e.preventDefault();

		});

		jQuery('body').delegate('.dtdr-remove-media-videos','click', function(e){

			jQuery(this).parents('.dtdr-media-videos-box-item').remove();
			e.preventDefault();

		});

		if (jQuery().sortable) {
			jQuery('.dtdr-media-videos-box-item-holder').sortable({
				placeholder: 'sortable-placeholder'
			});
		}

});