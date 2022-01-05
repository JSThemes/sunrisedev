jQuery(document).ready(function() {

	// Floor Plan

		jQuery('body').delegate('.dtdr-add-floorplan-box', 'click', function(e) {

			var clone = jQuery('.dtdr-floorplan-box-item-toclone').clone();
			clone.attr('class', 'dtdr-floorplan-box-item').removeClass('hidden');
			clone.find('#dtdr_floorplan_title').attr('name', 'dtdr_floorplan_title[]').removeAttr('id');
			clone.find('#dtdr_floorplan_description').attr('name', 'dtdr_floorplan_description[]').removeAttr('id');
			clone.find('#dtdr_floorplan_image').attr('name', 'dtdr_floorplan_image[]').removeAttr('id');
			clone.find('#dtdr_floorplan_size').attr('name', 'dtdr_floorplan_size[]').removeAttr('id');
			clone.find('#dtdr_floorplan_rooms').attr('name', 'dtdr_floorplan_rooms[]').removeAttr('id');
			clone.find('#dtdr_floorplan_baths').attr('name', 'dtdr_floorplan_baths[]').removeAttr('id');
			clone.find('#dtdr_floorplan_price').attr('name', 'dtdr_floorplan_price[]').removeAttr('id');

			clone.appendTo('.dtdr-floorplan-box-item-holder');

			e.preventDefault();

		});

		jQuery('body').delegate('.dtdr-remove-floorplan','click', function(e){

			jQuery(this).parents('.dtdr-floorplan-box-item').remove();
			e.preventDefault();

		});

		if (jQuery().sortable) {
			jQuery('.dtdr-floorplan-box-item-holder').sortable({
				placeholder: 'sortable-placeholder'
			});
		}

});