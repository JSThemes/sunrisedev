function dtDirectoryCustomMarker( latlng, map, args, infobox ) {
	this.latlng  = latlng;
	this.map     = map;
	this.args    = args
	this.infobox = infobox;
	this.setMap(map);
}

dtDirectoryCustomMarker.prototype = new google.maps.OverlayView();

dtDirectoryCustomMarker.prototype.draw = function() {

	var self = this,
		div  = self.div;

	if (!div) {

		div = self.div = document.createElement('div');
		if(self.args.listingid == undefined) {
			div.id = 'dtdr-user';
		} else {
			div.id = 'dtdr-'+self.args.listingid;
		}

		div.className = 'dtdr-marker-container';
		div.style.position = 'absolute';
		div.style.cursor = 'pointer';
		div.style.zIndex = 10;

		// Marker
        if(self.args.map_icon != undefined) {

	        var maskimg = document.createElement('div');
			maskimg.className = 'dtdr-marker-image';

			maskimg.style.webkitMaskImage = 'url('+self.args.map_icon+')';
	        div.appendChild(maskimg);

	    }


	    // Additional detail along with marker
        if(self.args.additional_info_type == 'categoryimage') {

	        var addinfo = document.createElement('div');
			addinfo.className = 'dtdr-marker-addition-info dtdr-marker-addition-info-'+self.args.additional_info_type;
			addinfo.style.backgroundColor = self.args.category_background_color;

			if(self.args.additional_info != '') {

		        var addinfodiv = document.createElement('div');
				addinfodiv.className = 'dtdr-marker-addition-info-categoryimage-inner';
				addinfodiv.style.webkitMaskImage  = 'url("'+self.args.additional_info+'")';
				addinfodiv.style.backgroundColor = self.args.category_color;
				addinfo.appendChild(addinfodiv);

			}

			div.appendChild(addinfo);

        } else if(self.args.additional_info_type == 'categoryicon') {

	        var addinfo = document.createElement('div');
			addinfo.className = 'dtdr-marker-addition-info dtdr-marker-addition-info-'+self.args.additional_info_type;

			if(self.args.additional_info != '') {

		        var addinfospan = document.createElement('span');
				addinfospan.className = self.args.additional_info;
				addinfospan.style.color = self.args.category_color;
				addinfospan.style.backgroundColor = self.args.category_background_color;
				addinfo.appendChild(addinfospan);

			}

	        div.appendChild(addinfo);

        } else if(self.args.additional_info_type == 'totalviews' || self.args.additional_info_type == 'averageratings' || self.args.additional_info_type == 'distance') {

			if(self.args.additional_info != '') {

		        var addinfo = document.createElement('div');
				addinfo.className = 'dtdr-marker-addition-info dtdr-marker-addition-info-'+self.args.additional_info_type;

				var newContent = document.createTextNode(self.args.additional_info);

				addinfo.appendChild(newContent);

		        div.appendChild(addinfo);

			}

        }


        // Marker Info Box
		google.maps.event.addDomListener(div, 'click', function(event) {

			event.preventDefault();
			google.maps.event.trigger(self, 'click');

			jQuery('div.dtdr-marker-info-box').removeClass('show');

			if(self.args.info_content != undefined) {

				self.infobox.setContent(self.args.info_content);
				self.infobox.setPosition(self.latlng);
				self.infobox.open(self.map);
				setTimeout(function(){
					self.infobox.setOptions({
						boxClass: 'dtdr-marker-info-box show',
					});
				}, 10);

			}

		});

		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);

		var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

		if (point) {
			div.style.left = point.x + 'px';
			div.style.top = point.y + 'px';
		}

		this.div = div;
	}

	var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
	if (point) {
		div.style.left = point.x + 'px';
		div.style.top = point.y + 'px';
	}

};

dtDirectoryCustomMarker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}
};

dtDirectoryCustomMarker.prototype.getPosition = function() {
	return this.latlng;
};