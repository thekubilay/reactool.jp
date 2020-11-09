<script>
import {mapGetters} from 'vuex';
export default {
	props: {
		google: {
			type: Object,
			required: true
		},
		map: {
			type: Object,
			required: true
		},
		marker: {
			type: Object,
			required: true
		},
		info_window: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			map_marker: null,
		}
	},
	watch: {
		map(){
			this.initializeMarker()
		},
    map_markers() {},
    get_selected_places(val){
      if(val.includes(this.marker.place)){
        this.map_marker.setVisible(true)
			} else {
				this.map_marker.setVisible(false)
      }
    },
    get_pointed_coord(val){
      if (val.id == this.marker.id) {
        var contentString = "<b>"+this.marker.place+"</b>"+"<br>"+ this.marker.name;
				this.map.setCenter(this.map_marker.getPosition());
				this.map.panTo(this.map_marker.getPosition());
				this.info_window.setContent(contentString)
				this.info_window.close()
				this.info_window.open(this.map, this.map_marker); 
      }
    }
	},
	mounted(){
		this.initializeMarker()
  },
  computed:{
    ...mapGetters([
      "get_selected_places",
			"get_pointed_coord",
    ])
  },
	methods: {
		initializeMarker(){
			this.marker.lat = parseFloat(this.marker.lat)
      this.marker.lng = parseFloat(this.marker.lng)
      const latLng = {lat:this.marker.lat, lng:this.marker.lng }
			const index = this.index+1
			this.map_marker = new this.google.maps.Marker({
				position: latLng,
				map: this.map,
				icon: {
					url: 
						this.marker.place == "ショッピング施設" ? require("@/assets/images/markers/shopping.svg") : 
						this.marker.place == "教育施設" ? require("@/assets/images/markers/education.svg") : 
						this.marker.place == "金融機関" ? require("@/assets/images/markers/bank.svg") : 
						this.marker.place == "医療施設" ? require("@/assets/images/markers/hospital.svg") : 
						this.marker.place == "公共・文化施設" ? require("@/assets/images/markers/public.svg") : 
						this.marker.place == "公園・その他" ? require("@/assets/images/markers/park.svg") : "" ,
					anchor: new google.maps.Point(15, 60),
					scaledSize: new google.maps.Size(58, 58), // scaled size
					labelOrigin: new google.maps.Point(29, 23)
				},
				label: {text:index+"", color: 'black', labelOrigin: new google.maps.Point(13.5, 11)},
			})

			var contentString = "<b>"+this.marker.place+"</b>"+"<br>"+ this.marker.name;
			
			this.google.maps.event.addListener(this.map_marker, 'click', () => {
       	this.map.setCenter(this.map_marker.getPosition());
				this.map.panTo(this.map_marker.getPosition());
				this.info_window.setContent(contentString)
				this.info_window.close()
				this.info_window.open(this.map, this.map_marker);    
			});
		}
	},
	render() {},
}
</script>