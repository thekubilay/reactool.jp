import colorPalette from "./colorPalette";

const {
	COLOR_LANDSCAPE,
	COLOR_BORDERS,
	COLOR_WATER,
	COLOR_LINE,
	COLOR_POINT_FILL,
	COLOR_SELECTED_POINT
} = colorPalette;

const COLORS = {
	BORDERS: COLOR_BORDERS,
	LANDSCAPE: COLOR_LANDSCAPE,
	LINE: COLOR_LINE,
	POINT: COLOR_SELECTED_POINT,
	POINT_FILL: COLOR_POINT_FILL,
	WATER: COLOR_WATER
};

const POINT_MARKER_ICON_CONFIG = {
	path: "M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
	strokeOpacity: 0.7,
	strokeWeight: 4,
	strokeColor: COLORS.POINT,
	fillColor: COLORS.POINT_FILL,
	fillOpacity: 0.7,
	scale: 1
};

const LINE_SYMBOL_CONFIG = {
	path: "M 0,-2 0,2",
	strokeOpacity: 1,
	strokeWeight: 2,
	scale: 1
};

const LINE_PATH_CONFIG = {
	clickable: false,
	geodesic: false,
	strokeOpacity: 0,
	strokeColor: COLORS.LINE,
	icons: [{
		icon: LINE_SYMBOL_CONFIG,
		repeat: "10px"
	}]
};

const mapSettings = {
	clickableIcons: false,
	streetViewControl: false,
	panControlOptions: false,
	gestureHandling: "cooperative",
	mapTypeControl: false,
	zoomControlOptions: {
		style: "SMALL"
	},
	zoom: 18,
	minZoom: 14,
	maxZoom: 20,
	styles: [
		{
			"featureType": "all",
			"elementType": "labels.icon",
			"stylers": [
					{
							"visibility": "off"
					}
			]
		},
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    // {
    //     "featureType": "landscape",
    //     "elementType": "geometry",
    //     "stylers": [
    //         {
    //             "color": "#edebe4"
    //         },
    //         {
    //             "lightness": 20
    //         }
    //     ]
    // },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d1ecc7"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#8395a7"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#8395a7"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ced6e0"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3742fa"
            },
            {
                "lightness": 17
            }
        ]
    }
	]	
};

export {
	mapSettings
};