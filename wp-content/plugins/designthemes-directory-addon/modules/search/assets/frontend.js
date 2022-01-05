var dtDirectorySearchForm = {

	dtInit : function() {


		// Features field slider

			jQuery('.dtdr-sf-features-slider').each(function() {

				var handle_start = jQuery(this).parents('.dtdr-sf-features-field-holder').find('.dtdr-sf-features-start');
				var handle_end = jQuery(this).parents('.dtdr-sf-features-field-holder').find('.dtdr-sf-features-end');

				var slider_handle_start = jQuery(this).find('.dtdr-sf-features-slider-start-handle');
				var slider_handle_end = jQuery(this).find('.dtdr-sf-features-slider-end-handle');

				var min_value = parseInt(jQuery(this).attr('data-min'), 10);
				var max_value = parseInt(jQuery(this).attr('data-max'), 10);
				var item_unit = jQuery(this).attr('data-itemunit');

				var updated_min_value = parseInt(jQuery(this).attr('data-updated-min'), 10);
				var updated_max_value = parseInt(jQuery(this).attr('data-updated-max'), 10);

				jQuery(this).slider({
					range: true,
					min: min_value,
					max: max_value,
					values: [ updated_min_value, updated_max_value ],
					slide: function(event, ui) {

						handle_start.val(ui.values[0]);
						handle_end.val(ui.values[1]);

						var features_range_start = ui.values[0] + item_unit;
						var features_range_end = ui.values[1] + item_unit;

						slider_handle_start.html(features_range_start);
						slider_handle_end.html(features_range_end);

					},
					stop: function(event, ui) {
						if(jQuery(this).hasClass('dtdr-with-ajax-load')) {
							window.setTimeout(function(){
								dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
							}, 250);
						}
					},
				});

			});


		// Submitting search form

			jQuery( 'body' ).delegate( '.dtdr-submit-searchform', 'click', function(e) {

				var this_item = jQuery(this);

				if(this_item.attr('data-outputtype') == 'separate-page') {

					var separate_page_url = this_item.attr('data-separatepageurl');

					// Creating form with datas

					var formData = '';
					formData += '<form class="dtdrSearchForm" action="' + separate_page_url + '" method="post"></form>';

					var searchForm = jQuery(formData);
					jQuery('body').append(searchForm);

					jQuery('.dtdr-sf-fields-holder').each(function() {

						if(jQuery(this).find('.dtdr-chosen-select').length) {

							var selected_items = [];
							selected_items.push(jQuery(this).find('.dtdr-chosen-select').val());

							var item_name = jQuery(this).find('.dtdr-chosen-select').attr('name');
							jQuery('.dtdrSearchForm').append('<input type="text" name="'+item_name+'" value="'+selected_items+'" />');

						} else {
							var item_data = jQuery(this).clone();
							jQuery('.dtdrSearchForm').append(item_data);
						}

					});

					jQuery(searchForm).submit();

					searchForm.remove();

				} else {

					dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();

				}

				e.preventDefault();

			});


		// On orderby item selection

			jQuery( 'body' ).delegate( '.dtdr-sf-orderby-list a', 'click', function(e) {

				if(jQuery(this).hasClass('active')) {
					jQuery(this).removeClass('active');
				} else {
					jQuery( '.dtdr-sf-orderby-list a' ).removeClass('active');
					jQuery(this).addClass('active');
				}

				if(jQuery(this).parents('.dtdr-sf-orderby-list').hasClass('dtdr-with-ajax-load')) {
					window.setTimeout(function(){
						dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
					}, 250);
				}

				e.preventDefault();

			});


		// On others item selection

			jQuery( 'body' ).delegate( '.dtdr-sf-others-list-item', 'click', function(e) {

				if(jQuery(this).hasClass('active')) {
					jQuery(this).removeClass('active');
				} else {
					jQuery(this).addClass('active');
				}

				if(!jQuery(this).hasClass('dtdr-detect-location') && jQuery(this).hasClass('dtdr-with-ajax-load')) {
					window.setTimeout(function(){
						dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
					}, 250);
				}

				e.preventDefault();

			});


		// Ajax load on input change

			jQuery( 'body' ).delegate( '.dtdr-sf-categories.dtdr-with-ajax-load, .dtdr-sf-features.dtdr-with-ajax-load, .dtdr-sf-tags.dtdr-with-ajax-load, .dtdr-sf-ctype.dtdr-with-ajax-load, .dtdr-sf-orderby.dtdr-with-ajax-load, .dtdr-sf-startdate.dtdr-with-ajax-load', 'change', function() {

				window.setTimeout(function(){
					dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
				}, 250);

			});

			jQuery( 'body' ).delegate( '.dtdr-sf-keyword.dtdr-with-ajax-load, .dtdr-sf-mls-number.dtdr-with-ajax-load', 'input', function() {

				window.setTimeout(function(){
					dtDirectoryFrontendUtils.dtDirectoryLoadDataOutput();
				}, 800);

			});

			jQuery( 'body' ).delegate( '.dtdr-sf-keyword, .dtdr-sf-mls-number', 'keypress', function(e) {

				if(e.which == 13) {
					jQuery('.dtdr-submit-searchform').trigger('click');
					return false;
				}

			});


		// Load data on search form submit click

			jQuery('.dtdr-submit-searchform.dtdr-execute').trigger('click');


	},

};

jQuery(document).ready(function() {

	if(!dtdrfrontendobject.elementorPreviewMode) {
		dtDirectorySearchForm.dtInit();
	}

});

( function( $ ) {

	var dtDirectorySearchFormJs = function($scope, $){
		dtDirectoryFrontend.dtInit();
		dtDirectorySearchForm.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtdrfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-output-data-container.default', dtDirectorySearchFormJs);
			elementorFrontend.hooks.addAction('frontend/element_ready/dtdr-widget-sf-submit-button.default', dtDirectorySearchFormJs);
		}
	});

} )( jQuery );