<template>
  <v-sheet width="ww100" class="noselect d-flex align-center pan" v-if="get_project_load === 2">
    <app-vista-controller />
    <div class="slider__list"
         ref="panorama" v-pan="compass"
         :style="{ backgroundImage: 'url(' + DIR+vistas.image + ')' }">
    </div>
    <button v-longclick="() => buttonLeft(-5)" class="left-btn"><i class="fas fa-chevron-left"></i></button>
    <button v-longclick="() => buttonLeft(5)" class="right-btn"><i class="fas fa-chevron-right"></i></button>
  </v-sheet>
</template>
<script>
import appVistaController from "../components/vista-controller"
import {basicMixin} from '@/mixins/basicMixin'
import { mapGetters } from 'vuex'
import Vue from "vue"

const longClickInstance = window['vue-long-click'].longClickDirective({delay: 0, interval: 120})
Vue.directive('longclick', longClickInstance)
export default {
  components: {
    appVistaController,
  },
  directives:{
    pan: {
      bind: function(el, binding) {
        if (typeof binding.value === "function") {
          const mc = new Hammer(el);
          mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
          mc.on("pan", binding.value);
        }
      }
    },
  },
  mixins:[basicMixin],
  data(){
    return {
      position:0,
      compass_change: false,
      currentOffset: 0,
      counter: 0,
      watchPos: null,
    }
  },
  computed: {
    ...mapGetters([
      "get_project_load",
      "get_project",
      "get_current_vista"
    ]),
    vistas(){
      let images = this.get_project.vistas
      let image =  images.filter(item => {
        return item.floor == this.get_current_vista.floor && item.time == this.get_current_vista.time
      })
      return image[0]
    },
    overflowRatio() {
      return this.$refs.panorama.scrollWidth / this.$refs.panorama.offsetWidth;
    },
    itemWidth() {
      return this.$refs.panorama.scrollWidth;
    },
    count() {
      return 1
    },
  },

	methods: {

    compass(e){

      let drag = -44
      let position
      this.$refs.panorama.style.transition = "unset"

      position = drag / this.itemWidth * e.deltaX / this.count * this.overflowRatio
      position = parseInt(position)
      position = this.currentOffset + position
      this.$refs.panorama.style.setProperty("--x", position);

      if (e.isFinal){
        this.$refs.panorama.style.transition = "1s ease"
        if (e.velocityX < -1 || e.velocityX > 1) {
          let drag = -140
          position = drag / this.itemWidth * e.deltaX / this.count * this.overflowRatio
          position = position + this.currentOffset
          this.$refs.panorama.style.setProperty("--x", position);
          // console.log(position + " pos")
        }
        this.currentOffset = position
        // console.log(this.currentOffset + " ofset")
      }
    },
    buttonLeft(pos){
      let style = getComputedStyle(this.$refs.panorama)
      this.position = parseFloat(style.backgroundPosition.match(/.*?(?=p|$)/i)[0])
      this.position = this.position + pos
      this.$refs.panorama.style.transition = "1s ease"
      this.$refs.panorama.style.setProperty("--x", this.position);
    },
    buttonRight(pos){
      let style = getComputedStyle(this.$refs.panorama)
      this.position = parseFloat(style.backgroundPosition.match(/.*?(?=p|$)/i)[0])
      this.position = this.position + pos
      this.$refs.panorama.style.transition = "1s ease"
      this.$refs.panorama.style.setProperty("--x", this.position);
    },
	}
}
</script>
<style>
p.compass {
  position: absolute;
  top: 40px;
  right: 100px;
  z-index: 9999;
  background: white;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
}
.pan {
  background-repeat: repeat-x;
}
.slider__list {
  display: -webkit-box;
  display: flex;
  width: 100%;
  background-size: cover;
  height: 100%;
  background-repeat: repeat-x;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  background-position-x: calc(var(--x, 0) * 1%);
}
.left-btn,
.right-btn {
  position: absolute;
  height: 100%;
  width: 60px;
  background: rgba(255, 255, 255, 0.479);
  outline: 0;
  border: 0;
  padding-bottom: 56px;
}
.left-btn .fa-chevron-left,
.right-btn .fa-chevron-right {
  font-size: 27px;
  position: relative;
}
.left-btn {
  top: 0;
  left: 0;
}
.right-btn {
  top: 0;
  right: 0;
}

</style>