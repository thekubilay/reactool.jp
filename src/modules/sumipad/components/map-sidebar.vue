<template>
  <v-navigation-drawer permanent min-width="300px" width="300px" class="side__nav" touchless>   
    <div class="map--filters d-flex align-center justify-end">
      <a :href="'https://maps.google.com/?q='+get_project.lat+','+get_project.lng" target="_blank" class="to-google">in google <i class="fas fa-chevron-right"></i></a>     
    </div>

    <v-expansion-panels flat tile>
      <v-expansion-panel v-for="(coord, index) in filterMarkers(get_project.coords)" :key="index" @click="openSideMarker(coord)" class="mb-1 rounded" active-class="--active">
        <v-expansion-panel-header>
          <div class="mkr d-flex align-center justify-start rel">
            <span class="xsm--txt text-center" style="position:absolute; top:10px; left:15px; width:14px; z-index:99">{{index+1}}</span>
            <img v-if="coord.place == '公共・文化施設'" style="height:120%; top:2px" class="rel"
              src="@/assets/images/markers/public.svg" alt="gmap marker">
            <img v-if="coord.place == 'ショッピング施設'" style="height:120%; top:2px" class="rel"
              src="@/assets/images/markers/shopping.svg" alt="gmap marker">
            <img v-if="coord.place == '公園・その他'" style="height:120%; top:2px" class="rel"
              src="@/assets/images/markers/park.svg" alt="gmap marker">
            <img v-if="coord.place == '教育施設'" style="height:120%; top:2px" class="rel"
              src="@/assets/images/markers/education.svg" alt="gmap marker">
            <img v-if="coord.place == '金融機関'" style="height:120%; top:2px" class="rel"
              src="@/assets/images/markers/bank.svg" alt="gmap marker">
            <img v-if="coord.place == '医療施設'" style="height:120%; top:2px" class="rel"
              src="@/assets/images/markers/hospital.svg" alt="gmap marker">

            <h4 class="font-weight-thin d-flex flex-column align-start">
              <span class="xsm--txt mb-1">{{coord.place}}</span>
              
              <span v-if="coord.place == '公共・文化施設'" class="xxsm--txt text-capitalize">public facility</span>
              <span v-if="coord.place == 'ショッピング施設'" class="xxsm--txt text-capitalize">shopping</span>
              <span v-if="coord.place == '医療施設'" class="xxsm--txt text-capitalize">hospital</span>
              <span v-if="coord.place == '教育施設'" class="xxsm--txt text-capitalize">education</span>
              <span v-if="coord.place == '金融機関'" class="xxsm--txt text-capitalize">bank</span>
              <span v-if="coord.place == '公園・その他'" class="xxsm--txt text-capitalize">park</span>
            </h4>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <ul>
            <li @click="updateTravelType('CAR')" :class="{'--active': get_travel_type == 'CAR'}"><i class="fas fa-car"></i></li>
            <li @click="updateTravelType('TRANSIT')" :class="{'--active': get_travel_type == 'TRANSIT'}"><i class="fas fa-train"></i></li>
            <li @click="updateTravelType('BICYCLE')" :class="{'--active': get_travel_type == 'BICYCLE'}"><i class="fas fa-bicycle"></i></li>
            <li @click="updateTravelType('WALKING')" :class="{'--active': get_travel_type == 'WALKING'}"><i class="fas fa-walking"></i></li>
          </ul>
          <div class="context--wrapper" >
            <div class="context-top d-flex justify-end align-center" v-if="get_route_results != null">
              <p class="xsm--txt mb-0 mr-3 result">
                <i v-if="get_travel_type == 'CAR'" class="result--icon fas fa-car"></i> 
                <i v-if="get_travel_type == 'TRANSIT'" class="result--icon fas fa-train"></i> 
                <i v-if="get_travel_type == 'BICYCLE'" class="result--icon fas fa-bicycle"></i> 
                <i v-if="get_travel_type == 'WALKING'" class="result--icon fas fa-walking"></i> 
                {{get_route_results.distance+ ", "+get_route_results.duration}}</p>
            </div>
            <v-divider></v-divider>
            <div class="px-3 xsm--txt"><h4 class="mb-0 py-2">{{coord.name}}</h4><p class="mb-0 pb-2">{{coord.address}}</p></div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      locations: ["教育施設", "金融機関", "医療施設", "公共・文化施設", "公園・その他", "ショッピング施設",],
    }
  },
  computed: {
    ...mapGetters([
      "get_project",
      "get_travel_type",
      "get_route_results",
      "get_default_markers",
      "get_selected_places"
    ]),    
  },
  methods: {
    filterMarkers(array){
      let coords = []
      array.forEach(element => {
        this.get_selected_places.forEach(item => {
          if (item == element.place) {
            coords.push(element)
          }
        })
      });
      return coords
    },
    openSideMarker(obj){
      this.$store.dispatch("UPDATE_TRAVEL_TYPE", null)
      this.$store.dispatch("UPDATE_ROUTE_RESULTS", null)
      this.$store.dispatch("UPDATE_POINTED_COORD", obj)
    },
    updateTravelType(type){
      this.$store.dispatch("UPDATE_TRAVEL_TYPE", type)
    },
  },
}
</script>
<style>
.theme--light.v-navigation-drawer.side__nav {
  background-color: #f1f2f6;
  padding: 0 5px;
  position: relative;
  z-index: 99;
  overflow: hidden;
  -webkit-box-shadow: 2px 0px 15px -6px rgba(0,0,0,0.36) !important;
  -moz-box-shadow: 2px 0px 15px -6px rgba(0,0,0,0.36) !important;
  box-shadow: 2px 0px 15px -6px rgba(0,0,0,0.36) !important;
}
.v-navigation-drawer__content {
  overflow: hidden;
  padding-bottom: 60px;
  border-radius: 0;
}
.theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  background-color: unset;
}



/* filters */
.combobox > * > .v-text-field__details {
  display: none;
}
.theme--light.v-list-item:hover::before { opacity: 0.64; }
.v-navigation-drawer__content {
  overflow: hidden !important;
  /* margin-bottom: 12px; */
}
.v-select.v-input--dense .v-select__selection--comma {
  margin-bottom: 0 !important;
}
.v-input--dense > .v-input__control > .v-input__slot {
  margin-bottom: 0;
}
.v-select.v-input--dense .v-select__selection--comma:nth-child(3),
.v-select.v-input--dense .v-select__selection--comma:nth-child(4),
.v-select.v-input--dense .v-select__selection--comma:nth-child(5),
.v-select.v-input--dense .v-select__selection--comma:nth-child(6) {
  margin-bottom: 0 !important;
  margin-top: 0;
}
.v-autocomplete__content.v-menu__content .v-select-list {
  padding-bottom: 0;
}
.v-text-field--filled.v-input--dense:not(.v-text-field--single-line).v-text-field--outlined input {
  padding: 0;
}
.v-select.v-text-field--outlined:not(.v-text-field--single-line).v-input--dense .v-select__selections {
  padding: 4px 0;
  font-size: 12px;
}


.map--filters {
  margin-bottom: 5px;
  padding: 0 10px;
}
.map--filters a.to-google{
  margin: 10px 0;
  border-radius: 8px;
  font-weight: 500;
  background: rgba(223, 145, 0, 0.137);
  color: #df9100;
  height: 22px;
  text-align: center;
  padding: 0 10px;
  font-size: 11px;
  display: flex;
  align-items: center;
  display: inline-block;
  text-decoration: none;
  padding-top: 3px;
}
.map--filters a.to-google > .fas{
  font-size: 10px;
  position: relative;
  top: 1px;
}


/* side bar markers list */
.v-expansion-panels {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  overflow: auto;
  overflow-y: auto;
  padding: 0;
  width: 100%;
  z-index: 1;
  height: 100%;
  align-content: flex-start;
}
.v-expansion-panel-header {
  padding: 0 10px !important;
  min-height: 48px !important;
  height: 48px !important;
}
.v-expansion-panel-header>div.mkr {
  height: 36px;
}
.--active {
  transition: .5s;
  /* box-shadow: 0 1px 10px rgba(0, 0, 0, 0.432); */
}

.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
.v-expansion-panel-content__wrap>ul {
  display: flex;
  list-style-type: none;
  width: 100%;
  padding-left: 0;
  background: #2f3542;
  color: white;
}

.v-expansion-panel-content__wrap>ul>li {
  width: 25%;
  display: flex;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid #191d24;
  cursor: pointer;
}
.v-expansion-panel-content__wrap>ul>li.--active {
  border-bottom: 3px solid #df9100;
}
.v-expansion-panel-content__wrap>ul>li>.fas {
  font-size: 22px;
  color: #666b74;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-expansion-panel-content__wrap>ul>li.--active > .fas {
  color: #df9100;
  background: #2C3A47;
  border-radius: 6px;
  font-size: 18px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.432);
}


.v-expansion-panel-content__wrap>div.context--wrapper {
  background: #1e272e;
  color: whitesmoke;
}
.v-expansion-panel-content__wrap>div.context--wrapper .context-top{
  height: 40px;  
}
.v-expansion-panel-content__wrap>div.context--wrapper .context-top p.result{
  border-radius: 8px;
  font-weight: 500;
  background: rgba(245, 245, 245, 0.253);
  color: #f7b731;
  height: 22px;
  text-align: center;
  padding: 0 10px;
  display: flex;
  align-items: center;
}
.v-expansion-panel-content__wrap>div.context--wrapper .context-top p.result .result--icon{
  color: #fa8231;
  margin-right: 5px;
}

</style>