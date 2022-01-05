
var dtDirectorFeaturedCommentsCommon = {

	dtInit : function() {

		jQuery('.dtdr-ratings-holder span').mouseover(function(e) {
			if(!jQuery(this).parents('.dtdr-ratings-holder').hasClass('rated')) {
				jQuery('.dtdr-ratings-holder span').removeClass('zmdi zmdi-star');
				jQuery( this ).prevAll( 'span' ).andSelf().addClass('zmdi zmdi-star');
				jQuery( this ).nextAll( 'span' ).addClass('zmdi zmdi-star-outline');
			} else {
				setTimeout(function() { jQuery('.dtdr-ratings-holder').removeClass('rated'); },100);
			}
			e.preventDefault;
		}).mouseout(function(e) {
			if(!jQuery(this).parents('.dtdr-ratings-holder').hasClass('rated')) {
				jQuery('.dtdr-ratings-holder span').removeClass('zmdi zmdi-star');
				jQuery( this ).prevAll( 'span' ).andSelf().addClass('zmdi zmdi-star');
				jQuery( this ).nextAll( 'span' ).addClass('zmdi zmdi-star-outline');
			} else {
				setTimeout(function() { jQuery('.dtdr-ratings-holder').removeClass('rated'); },100);
			}
			e.preventDefault;
		});

		jQuery('.dtdr-ratings-holder span').click(function(e) {
			if(!jQuery(this).parents('.dtdr-ratings-holder').hasClass('rated')) {
				jQuery(this).prevAll('span').andSelf().addClass('zmdi zmdi-star');
				jQuery(this).parents('.dtdr-ratings-holder').find('#dtdr_rating').val(parseInt(jQuery(this).html(), 10));
				jQuery(this).parents('.dtdr-ratings-holder').addClass('rated');
			}
			e.preventDefault;
		});

	},

};

jQuery(document).ready(function() {

	dtDirectorFeaturedCommentsCommon.dtInit();

});