<template>
  <v-navigation-drawer permanent right width="300px" class="color__side pt-5">
    <div class="px-4 xxsm--txt d-flex justify-space-between mb-6 mt-4">
      <v-btn elevation="0"
             width="48%"
             @click="changeTypeNdRoom('type', item.val)"
             v-for="(item, index) in types"
             :key="index">{{item.txt}}</v-btn>
    </div>
    <div class="px-4 d-flex flex-wrap justify-space-between mb-2">
      <v-btn elevation="0"
             width="48%"
             class="mb-2"
             @click="changeTypeNdRoom('room', item.val)"
             v-for="(item, index) in rooms"
             :key="index">{{item.txt}}</v-btn>
    </div>

    <h4 class="pl-4 py-2">基本カラー</h4>
    <div class="d-flex flex-wrap px-4">
      <div class="chip-wrapper" v-for="(item, index) in base_colors" :key="item+index">
        <div class="ww100per d-flex flex-column align-center">
          <p class="mb-1 xxsm--txt text-capitalize">{{item.color}}</p>
          <v-btn width="40px"
                 height="40px"
                 @click="changeColor('base', item.color)"
                 class="pa-0 text-lowercase font-weight-regular d-flex flex-column align-center"
                 :color="item.hex"
                 fab>
            <v-icon v-if="item.color === get_selected_base_color" :color="item.color !== 'white' ? 'white' : 'black'">mdi-check</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <h4 class="pl-4 py-2" v-if="get_selected_color_room === 'kitchen'">キッチン扉</h4>
    <div class="d-flex flex-wrap px-4" v-if="get_selected_color_room === 'kitchen'">
      <div class="chip-wrapper" v-for="(item, index) in kitchen_bars" :key="item+index">
        <div class="ww100per d-flex flex-column align-center">
          <p class="mb-1 xxsm--txt text-capitalize">{{item.color}}</p>
          <v-btn width="40px"
                 height="40px"
                 @click="changeColor('bar', item.color)"
                 class="pa-0 text-lowercase font-weight-regular d-flex flex-column align-center"
                 :color="item.hex"
                 fab>
            <v-icon v-if="item.color === get_selected_kitchen_bar_color" :color="item.color !== 'white' ? 'white' : 'black'">mdi-check</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <h4 class="pl-4 py-2" v-if="get_selected_color_room === 'kitchen'">キッチン天板</h4>
    <div class="d-flex flex-wrap px-4" v-if="get_selected_color_room === 'kitchen'">
      <div class="chip-wrapper" v-for="(item, index) in kitchen_desks" :key="item+index">
        <div class="ww100per d-flex flex-column align-center">
          <p class="mb-1 xxsm--txt text-capitalize">{{item.color}}</p>
          <v-btn width="40px"
                 height="40px"
                 @click="changeColor('desk', item.color)"
                 class="pa-0 text-lowercase font-weight-regular d-flex flex-column align-center"
                 :color="item.hex"
                 fab>
            <v-icon v-if="item.color === get_selected_kitchen_desk_color" :color="item.color !== 'white' ? 'white' : 'black'">mdi-check</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "color-sidebar",
  data(){
    return {
      types:[
        {val: "n", txt: "N タイプ"},
        {val: "r", txt: "R タイプ"},
      ],
      rooms: [
        {val: "living_room", txt: "リビングルーム"},
        {val: "kitchen", txt: "キッチン"},
        {val: "entrance", txt: "エントランス"},
      ],
      base_colors_n:[
        {color:"dark", hex:"#3C1616"},
        {color:"medium", hex:"#7D544E"},
        {color:"grayish", hex:"#B6ACB0"},
        {color:"natural", hex:"#855935"},
      ],
      base_colors_r:[
        {color:"dark", hex:"#3C1616"},
        {color:"medium", hex:"#7D544E"},
        {color:"grayish", hex:"#B6ACB0"},
        {color:"white", hex:"#F5F5F5"},
      ],
      kitchen_bars:[
        {color:"dark", hex:"#3C1616"},
        {color:"medium", hex:"#7D544E"},
        {color:"grayish", hex:"#B6ACB0"},
        {color:"white", hex:"#F5F5F5"},
        {color:"winered", hex:"#5b252c"},
        {color:"pearlwhite", hex:"#F5DEB3"},
        {color:"blue", hex:"#212180"},
        {color:"brownstone", hex:"#5b4f4c"},
        {color:"greige", hex:"#D1CFC2"},
      ],
      kitchen_desks:[
        {color:"sugarlock", hex:"#EBDCDC"},
        {color:"almond", hex:"#c6b68c"},
        {color:"crunch", hex:"#614634"},
        {color:"brownie", hex:"#413023"},
        {color:"dark", hex:"#3C1616"},
      ],
    }
  },
  computed: {
    ...mapGetters([
      "get_selected_color_type",
      "get_selected_color_room",
      "get_selected_base_color",
      "get_selected_kitchen_bar_color",
      "get_selected_kitchen_desk_color"
    ]),
    base_colors(){
      if (this.get_selected_color_type === "n"){
        return this.base_colors_n
      } else {
        return this.base_colors_r
      }
    }
  },
  methods:{
    changeColor(part, color){
      if (part === "base")
        this.$store.dispatch("UPDATE_BASE_COLOR_ACTION", color)
      else if (part === "bar")
        this.$store.dispatch("UPDATE_BAR_COLOR_ACTION", color)
      else if (part === "desk")
        this.$store.dispatch("UPDATE_DESK_COLOR_ACTION", color)
    },
    changeTypeNdRoom(part, value){
      if (part === "type")
        this.$store.dispatch("UPDATE_TYPE_ACTION", value)
      else
        this.$store.dispatch("UPDATE_ROOM_ACTION", value)
    }
  },

}
</script>

<style>
h4 {
  text-align: left;
}
.color__side .chip-wrapper {
  width: 25%;
  align-content: flex-start;
  margin-bottom: 10px;
}
.color__side .chip-wrapper p.label {
  text-align: center;
}
</style>