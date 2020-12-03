<template>
  <v-sheet width="100%" class="pd-14 d-flex wh100 align-center text-center">
    <div class="hw100per image-content" style="max-height: 900px">
      <v-img class="dynamic-absolute-image opaque" :src="absoluteImageOpaque"></v-img>
      <v-img class="dynamic-absolute-image transparent" :src="absoluteImageTransparent.floor"></v-img>
      <v-img class="dynamic-absolute-image transparent" :src="absoluteImageTransparent.bar"></v-img>
      <v-img class="dynamic-absolute-image transparent" :src="absoluteImageTransparent.desk"></v-img>
    </div>
    <color-sidebar></color-sidebar>
  </v-sheet>
</template>
<script>
import colorSidebar from "../components/color-sidebar"
import {mapGetters} from "vuex";
export default {
  name:"color-select",
  components:{
    colorSidebar,
  },
  computed: {
    ...mapGetters([
      "get_selected_color_room",
      "get_selected_color_type",
      "get_selected_base_color",
      "get_selected_kitchen_bar_color",
      "get_selected_kitchen_desk_color",
    ]),
    absoluteImageOpaque() {
      return require("../../../assets/images/" + this.get_selected_color_type + "-type/" + this.get_selected_color_room + ".jpg")
    },
    absoluteImageTransparent() {
      let obj = {}
      obj.floor = require("../../../assets/images/" + this.get_selected_color_type + "-type/" + this.get_selected_color_room + "-floor-" + this.get_selected_base_color + ".png")

      if (this.get_selected_color_room === 'kitchen') {
        obj.bar = require("../../../assets/images/" + this.get_selected_color_type + "-type/" + this.get_selected_color_room + "-bar-" + this.get_selected_kitchen_bar_color + ".png")
        if (this.get_selected_color_type === "r") {
          obj.desk = require("../../../assets/images/" + this.get_selected_color_type + "-type/" + this.get_selected_color_room + "-desk-" + this.get_selected_kitchen_desk_color + ".png")
        }
      }

      return obj
    }
  },

}
</script>
<style>
.image-content {
  width: calc(100% - 300px);
  color: rgb(65, 48, 35);
  position: relative;
}
.image-content .dynamic-absolute-image {
  position:  absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.image-content .dynamic-absolute-image.opaque {
  z-index: 1;
}
.image-content .dynamic-absolute-image.transparent {
  z-index: 2;
}

</style>