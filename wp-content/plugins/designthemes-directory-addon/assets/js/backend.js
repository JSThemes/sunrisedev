var dtDirectoryBackendUtils = {

	dtDirectoryCheckboxSwitch : function() {

		jQuery('.dtdr-checkbox-switch:not(.disabled)').each( function() {
			jQuery(this).click(function(e) {

				var $ele = '#' + jQuery(this).attr('data-for');
				jQuery(this).toggleClass('checkbox-switch-off checkbox-switch-on');

				if (jQuery(this).hasClass('checkbox-switch-on')) {
					jQuery($ele).attr('checked', 'checked');
				} else {
					jQuery($ele).removeAttr('checked');
				}

				e.preventDefault();

			});
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

	dtDirectoryVerticalTab : function(this_item) {

		if(('ul.dtdr-tabs-vertical').length > 0) {
			jQuery('ul.dtdr-tabs-vertical').each(function(){
				var $effect = jQuery(this).parent('.dtdr-tabs-vertical-container').attr('data-effect');
				jQuery(this).dtDirectoryTabs('> .dtdr-tabs-vertical-content', {
					effect: $effect
				});
			});

			jQuery('.dtdr-tabs-vertical').each(function(){
				jQuery(this).find('li:first').addClass('first').addClass('current');
				jQuery(this).find('li:last').addClass('last');
			});

			jQuery('.dtdr-tabs-vertical li').click(function(){
				jQuery(this).parent().children().removeClass('current');
				jQuery(this).addClass('current');
			});
		}

	}

};


var dtDirectoryBackend = {

	dtInit : function() {
		dtDirectoryBackend.dtDirectory();
		dtDirectoryBackend.dtSettings();
		dtDirectoryBackend.dtImport();
	},

	dtDirectory : function() {

		// Checkbox switch
		dtDirectoryBackendUtils.dtDirectoryCheckboxSwitch();

		// Vertical Tabs
		dtDirectoryBackendUtils.dtDirectoryVerticalTab();


		// Initaialize color picker
		if(jQuery('.dtdr-color-field').length) {
			jQuery('.dtdr-color-field').wpColorPicker();
		}

	},

	dtSettings : function() {

		// Save Backend Options

		jQuery( 'body' ).delegate( '.dtdr-save-options-settings', 'click', function(e) {

			var this_item = jQuery(this),
				settings = this_item.attr('data-settings');

	        var form = jQuery('.formOptionSettings')[0];
	        var data = new FormData(form);
	        data.append('action', 'dtdr_save_options_settings');
	        data.append('settings', settings);

			jQuery.ajax({
				type: "POST",
				url: dtdrbackendobject.ajaxurl,
				data: data,
	            processData: false,
	            contentType: false,
	            cache: false,
				beforeSend: function(){
					this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
				},
				success: function (response) {
					this_item.parents('.formOptionSettings').find('.dtdr-option-settings-response-holder').html(response);
					this_item.parents('.formOptionSettings').find('.dtdr-option-settings-response-holder').show();
					window.setTimeout(function(){
						this_item.parents('.formOptionSettings').find('.dtdr-option-settings-response-holder').fadeOut('slow');
					}, 2000);
				},
				complete: function(){
					this_item.find('span').remove();
				}
			});

			e.preventDefault();

		});

		// Skin

		jQuery( 'body' ).delegate( '.dtdr-save-skin-settings', 'click', function(e) {

			var this_item = jQuery(this);

	        var form = jQuery('.formSkinSettings')[0];
	        var data = new FormData(form);
	        data.append('action', 'dtdr_save_skin_settings');

			jQuery.ajax({
				type: "POST",
				url: dtdrbackendobject.ajaxurl,
				data: data,
	            processData: false,
	            contentType: false,
	            cache: false,
				beforeSend: function(){
					this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
				},
				success: function (response) {
					this_item.parents('.formSkinSettings').find('.dtdr-skin-settings-response-holder').html(response);
					window.setTimeout(function(){
						this_item.parents('.formSkinSettings').find('.dtdr-skin-settings-response-holder').fadeOut('slow');
					}, 2000);
				},
				complete: function(){
					this_item.find('span').remove();
				}
			});

			e.preventDefault();

		});

	},

	dtImport : function() {

		jQuery( 'body' ).delegate( '.dtdr-import-file-button', 'click', function(e) {

			if(!confirm(dtdrbackendobject.confirmImport)) {
				return false;
			}

			var this_item = jQuery(this);

			jQuery.ajax({
				type: "POST",
				url: dtdrbackendobject.ajaxurl,
				data:
				{
					action: 'dtdr_process_imported_file',
				},
				beforeSend: function(){
					this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
				},
				success: function (response) {
					this_item.parents('.dtdr-settings-import-container').find('.dtdr-import-settings-response-holder').html(response);
					this_item.parents('.dtdr-settings-import-container').find('.dtdr-import-settings-response-holder').show();
					window.setTimeout(function(){
						this_item.parents('.dtdr-settings-import-container').find('.dtdr-import-settings-response-holder').fadeOut('slow');
					}, 2000);
				},
				complete: function(){
					this_item.find('span').remove();
				}
			});

			e.preventDefault();

		});

	}

};

jQuery(document).ready(function() {

	dtDirectoryBackend.dtInit();

});