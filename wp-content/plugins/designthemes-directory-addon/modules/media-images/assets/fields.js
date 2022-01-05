jQuery(document).ready(function() {

	// Make media element as featured item

		jQuery('body').delegate('.dtdr-featured-media-item', 'click', function(e) {

			var this_item = jQuery(this);

			this_item.parents('.dtdr-upload-media-items').find('.dtdr-featured-media-item span').attr('class', 'far fa-user')
			this_item.find('span').attr('class', 'fa fa-user')
			jQuery('#dtdr_featured_image_id').val(this_item.parent('li').find('.uploadfieldid').val());

			e.preventDefault();

		});

});