/**
 * Used in Image Hotspots
 * To set Hotspot Repeater title
 */
function getHotspotType( type ) {
	return ElementorConfig.DTHotspots[type];	
}

/**
 * Used to get social icon name for Team Member Widget
 */
function getSocialIconName( $obj ) {

	return ElementorConfig.DTTeamSocial[$obj.name];	
}