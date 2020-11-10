<template>
  <v-sheet height="100%" width="100%" class="rel">
		<div id="filters" class="d-flex pa-3">
			<v-select
				class="xsm-txt combobox mr-5"
				v-model="selected"
				:items="locations"
				label="マーカー絞りこみ"
				multiple
				dense
				filled
				outlined
			>
				<template v-slot:selection="{ item, index }">
					<span class="sm-txt mr-2" v-if="index === 0">{{ item }}</span>
					<span
						v-if="index === 1"
						class="grey--text caption"
					>
						(+{{ selected.length - 1 }})
					</span>
				</template>
			</v-select>
			<v-btn @click="removeDefaultMarkers()" color="#32323a" class="filter-btn" height="38px"><v-icon color="#df9100" v-if="get_default_markers">mdi-map-marker-off-outline</v-icon><v-icon color="#df9100" v-else>mdi-map-marker-outline</v-icon></v-btn>
		</div>

		<div ref="gmap" class="rounded-lg ww100per hw100per"></div>
		<div v-if="google != null && map != null"><app-marker v-for="(marker, index) in get_project.coords" :key="index" :google="google" :map="map" :info_window="info_window" :marker="marker" :index="index" /></div>
	</v-sheet>
</template>
<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import appMarker from './markers'
import {mapGetters} from "vuex";
import {mapSettings} from "../helpers/settings";
import {basicMixin} from '@/mixins/basicMixin'
export default {
	components: {
		appMarker,
	},
	mixins:[basicMixin],
	data() {
		return {
			google: null,
			map: null,
			info_window: null,
			locations: ["教育施設", "金融機関", "医療施設", "公共・文化施設", "公園・その他", "ショッピング施設",],
		}
	},
	async mounted() {
		this.google = await GoogleMapsApiLoader({
			apiKey: this.GOOGLE_API
		})
		this.$store.dispatch("UPDATE_ROUTE_RESULTS", null)
		this.$store.dispatch("UPDATE_TRAVEL_TYPE", null)
		this.initializeMap()
	},
	watch: {
		get_travel_type(val){
			this.initializeMap()
		},
		get_default_markers(){
			this.initializeMap()
		}
	},
	computed: {
		...mapGetters([
			"get_project",
			"get_pointed_coord",
			"get_travel_type",
			"get_default_markers"
		]),
		map_config() {
			const projectLatLng = { lat: parseFloat(this.get_project.lat), lng: parseFloat(this.get_project.lng) };
			mapSettings.styles[0].stylers[0].visibility = this.get_default_markers ? "on" : "off"
			return {
					...mapSettings,
					center: projectLatLng,
			}
		},
		selected:{
      set(val) {
        this.$store.dispatch("UPDATE_SELECTED_PLACES", val)
      },
      get() {
        return this.$store.state.coords.selected_places
      }
    },
	},
	methods: {
		initializeMap() {			
			const projectLatLng = { lat: parseFloat(this.get_project.lat), lng: parseFloat(this.get_project.lng) };
			this.map = new this.google.maps.Map(this.$refs.gmap, this.map_config)			
			this.info_window = new this.google.maps.InfoWindow({})
			new google.maps.Marker({
				position: projectLatLng,
				map: this.map,
				icon: {
					url:  require("@/assets/images/markers/project.svg"),
					anchor: new google.maps.Point(15, 60),
					scaledSize: new google.maps.Size(85, 85), // scaled size
				},
			});
			

			// route actions
			let directionsService = new google.maps.DirectionsService,
					directionsDisplay = new google.maps.DirectionsRenderer({
						map: this.map
					});

			directionsDisplay.setMap(this.map);
			directionsDisplay.setOptions( { suppressMarkers: true } );

			const pointA = new google.maps.LatLng(projectLatLng.lat, projectLatLng.lng)
			if (this.get_travel_type != null) {			
				const pointB = new google.maps.LatLng(this.get_pointed_coord.lat, this.get_pointed_coord.lng)
				this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);				
			}
		},
		calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
			const self = this
			directionsService.route({
				origin: pointA,
				destination: pointB,
				avoidTolls: true,
				avoidHighways: false,
				travelMode: this.get_travel_type == 'CAR' ? google.maps.TravelMode.DRIVING : 
					this.get_travel_type == 'WALKING' ? google.maps.TravelMode.WALKING :
					this.get_travel_type == 'BICYCLE' ? google.maps.TravelMode.BICYCLING :
					this.get_travel_type == 'TRANSIT' ? google.maps.TravelMode.TRANSIT : ""
				}, (response, status) => {
					this.$store.dispatch("UPDATE_ROUTE_RESULTS", {distance: response.routes[0].legs[0].distance.text, duration:response.routes[0].legs[0].duration.text})
					if (status == google.maps.DirectionsStatus.OK) {
							directionsDisplay.setDirections(response);
					} else {
							window.alert('問題が発生しました。もう一度試してください');
					}
			});
		},
		removeDefaultMarkers(){
      let val = this.get_default_markers ? false : true
      this.$store.dispatch("REMOVE_DEFAULT_MARKERS", val)
    },
	},
}
</script>
<style>
#filters {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 90;
}
#filters > .combobox {
	width: 200px;
	height: 38px !important;
	background: white;
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.700);
}
#filters > .combobox > * > .v-text-field--filled.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--filled.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--filled.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--full-width.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--full-width.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--full-width.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot {
	min-height: 38px !important;
}
#filters > .filter-btn {
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.700);
}
</style>