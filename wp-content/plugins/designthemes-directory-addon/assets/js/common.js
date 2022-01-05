var dtDirectoryCommonUtils = {

	dtDirectoryBackendAjaxPagination : function() {

		jQuery( 'body' ).delegate( '.dtdr-default-pagination a', 'click', function(e) {

			var this_item = jQuery(this);

			if(jQuery(this).parent().hasClass('prev-post')) {
				current_page = parseInt(jQuery(this).attr('data-currentpage'), 10)-1;
			} else if(jQuery(this).parent().hasClass('next-post')) {
				current_page = parseInt(jQuery(this).attr('data-currentpage'), 10)+1;
			} else {
				current_page = jQuery(this).text();
			}

			var post_per_page = jQuery(this).parents('.dtdr-pagination').attr('data-postperpage');

			if(current_page == 1) {
				var offset = 0;
			} else if(current_page > 1) {
				var offset = ((current_page-1)*post_per_page);
			}

			var function_call = jQuery(this).parents('.dtdr-pagination').attr('data-functioncall');
			var output_div = jQuery(this).parents('.dtdr-pagination').attr('data-outputdiv');

			var user_id = jQuery(this).parents('.dtdr-pagination').attr('data-userid');
			var dashboard_page_id = jQuery(this).parents('.dtdr-pagination').attr('data-dashboardpageid');

			var loader = jQuery(this).parents('.dtdr-pagination').attr('data-loader');
			var loader_parent = jQuery(this).parents('.dtdr-pagination').attr('data-loaderparent');

			var seller_id = jQuery(this).parents('.dtdr-pagination').attr('data-sellerid');


			// ajax call
			jQuery.ajax({
				type: "POST",
				url: dtdrcommonobject.ajaxurl,
				data:
				{
					action: function_call,
					ajax_call: true,
					current_page: current_page,
					offset: offset,
					post_per_page: post_per_page,
					function_call: function_call,
					output_div: output_div,
					user_id: user_id,
					dashboard_page_id: dashboard_page_id,
					seller_id: seller_id,
				},
				beforeSend: function(){
					if(loader == 'true') {
						dtDirectoryCommonUtils.dtDirectoryAjaxBeforeSend(jQuery(loader_parent));
					}
				},
				success: function (response) {
					this_item.parents('.'+output_div).html(response);
				},
				complete: function(){
					if(loader == 'true') {
						dtDirectoryCommonUtils.dtDirectoryAjaxAfterSend(jQuery(loader_parent));
					}
				}
			});

			e.preventDefault();

		});

	},

	dtDirectoryAjaxBeforeSend : function(this_item) {

		if(this_item != undefined) {
			if(!this_item.find('.dtdr-ajax-load-image').hasClass('first')) {
				this_item.find('.dtdr-ajax-load-image').show();
			} else {
				this_item.find('.dtdr-ajax-load-image').removeClass('first');
			}
		} else {
			if(!jQuery('.dtdr-ajax-load-image').hasClass('first')) {
				jQuery('.dtdr-ajax-load-image').show();
			} else {
				jQuery('.dtdr-ajax-load-image').removeClass('first');
			}
		}

	},

	dtDirectoryAjaxAfterSend : function(this_item) {
		if(this_item != undefined) {
			this_item.find('.dtdr-ajax-load-image').hide();
		} else {
			jQuery('.dtdr-ajax-load-image').hide();
		}

	},

	dtDirectoryChosenSelect : function(this_item) {

		if (jQuery().chosen) {

			if(this_item == '.dtdr-social-chosen-select') {
				jQuery(this_item).chosen('destroy');
			}

			jQuery(this_item).chosen({
				no_results_text: dtdrcommonobject.noResult,
				inherit_select_classes: true,
				width: '100%'
			}).change(function(e) {
			    jQuery(this_item).find('option').each(function() {
			        if (this_item.selected == true) {
			            jQuery(this_item).trigger('liszt:updated');
			        }
			    });
			});

			jQuery('.dtdr-sf-fields-holder .selection-box').each(function() {
				jQuery( '<span></span>' ).insertAfter( jQuery(this).find('.chosen-search-input') );
			});

		}

	},

};

var dtDirectoryCommon = {

	dtInit : function() {
		dtDirectoryCommon.dtDefault();
		dtDirectoryCommon.dtMediaUploader();
	},

	dtDefault : function() {

		// Pagination - Used in Backend and Dashboard
		dtDirectoryCommonUtils.dtDirectoryBackendAjaxPagination();

		// Chosen jQuery
		dtDirectoryCommonUtils.dtDirectoryChosenSelect('.dtdr-chosen-select');

	},

	dtMediaUploader : function() {

		jQuery('body').delegate('.dtdr-upload-media-item-button', 'click', function(e){

			var file_frame = null;
			var item_clicked = jQuery(this);
			var multiple = false;
			var button_text = "Insert Image";

			if(item_clicked.hasClass('multiple')) {
				multiple = true;
				button_text = "Insert Image(s)";
			}

		    file_frame = wp.media.frames.file_frame = wp.media({
		    	multiple: multiple,
		    	title : "Upload / Select Media",
		    	button :{
		    		text : button_text
		    	}
		    });

		    // When an image is selected, run a callback.
		    file_frame.on( 'select', function() {

		    	var attachments = file_frame.state().get('selection').toJSON();

		    	if(item_clicked.hasClass('multiple')) {

			        var items = '';
			        jQuery.each( attachments, function(key, value) {

				        var id = value.id;
				        var title = value.title;
						var image_url = '';

						if(jQuery.type(value.sizes.thumbnail) != 'undefined') {
							image_url =  value.sizes.thumbnail.url;
						} else {
							image_url =  value.sizes.full.url;
						}

			        	items += '<li>'+
			        				'<img src="'+image_url+'"/>'+
                                    '<input name="dtdr_media_attachment_ids[]" type="hidden" class="uploadfieldid hidden" readonly value="'+id+'"/>'+
                                    '<input name="dtdr_media_attachment_titles[]" type="text" class="media-attachment-titles" value="'+title+'"/>'+
                                    '<span class="dtdr-remove-media-item"><span class="fas fa-times"></span></span>'+
                                    '<span class="dtdr-featured-media-item"><span class="far fa-user"></span></span>'+
                                '</li>';

					});

					if(item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-upload-media-items').length) {
						item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-upload-media-items').append(items);
					} else {
						var data = '<div class="dtdr-upload-media-items-holder">';
								data += '<ul class="dtdr-upload-media-items">';
								data += items;
								data += '</ul>';
							data += '</div>';
						item_clicked.parents('.dtdr-upload-media-items-container').prepend(data);
					}


		    	} else {

			        var id = attachments[0].id;
			        var url = attachments[0].url;

			        item_clicked.parents('.dtdr-upload-media-items-container').find('.uploadfieldurl').val(url);
			        item_clicked.parents('.dtdr-upload-media-items-container').find('.uploadfieldid').val(id);

			        if(item_clicked.hasClass('show-preview')) {
			        	item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-image-preview-tooltip img').attr('src', url);
			        } else if(item_clicked.hasClass('show-image-holder')) {
			        	item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-image-holder img').attr('src', url);
			        }

			    }

		    });

		    // Finally, open the modal
		    file_frame.open();

		});

		jQuery('body').delegate('.dtdr-upload-media-item-reset', 'click', function(e) {

			var item_clicked = jQuery(this);

			if(item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-upload-media-item-button').hasClass('multiple')) {

				item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-upload-media-items').html('');

			} else {

		        item_clicked.parents('.dtdr-upload-media-items-container').find('.uploadfieldurl').val('');
		        item_clicked.parents('.dtdr-upload-media-items-container').find('.uploadfieldid').val('');

		        if(item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-upload-media-item-button').hasClass('show-preview')) {
					var $noimage = item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-image-preview-tooltip img').attr('data-default');
					item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-image-preview-tooltip img').attr('src', $noimage);
				} else if(item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-upload-media-item-button').hasClass('show-image-holder')) {
					var $noimage = item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-image-holder img').attr('data-default');
					item_clicked.parents('.dtdr-upload-media-items-container').find('.dtdr-image-holder img').attr('src', $noimage);
				}

			}

			e.preventDefault();

		});

		jQuery('body').delegate('.dtdr-remove-media-item', 'click', function(e) {

			jQuery(this).parents('li').remove();
			e.preventDefault();

		});

		if (jQuery().sortable) {
			jQuery('.dtdr-upload-media-items').sortable({ placeholder: 'sortable-placeholder' });
		}

	}

};

jQuery(document).ready(function() {

	dtDirectoryCommon.dtInit();

});