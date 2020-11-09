<template>
  <v-sheet v-pan="onPan" width="ww100" class="noselect d-flex align-center wh100" v-if="get_project_load == 2">
    <app-vista-controller />
    <!-- <p class="transform">{{transform}}</p> -->
    <div class="vista__img" v-if="get_project.vistas.length" ref="list" :style="{ backgroundImage: 'url(' + DIR+vistas.image + ')' }"></div>
    <h1 class="ww100 text-center mx-auto text-center d-flex align-center black--text justify-center" v-else>眺望画像が登録されていない</h1>   
    <button v-longclick="() => buttonLeft(-15)" class="left-btn"><i class="fas fa-chevron-left"></i></button>
    <button v-longclick="() => buttonLeft(15)" class="right-btn"><i class="fas fa-chevron-right"></i></button>
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
      position: null,
      currentOffset: 0,      
      selected: null,
      transform: null
    }
  },
  computed: {
    ...mapGetters([
      "get_project",
      "get_project_load",
      "get_current_vista",
    ]),
    vistas(){
      let images = this.get_project.vistas
      let image =  images.filter(item => {
        return item.floor == this.get_current_vista.floor && item.time == this.get_current_vista.time
      })
      return image[0]
    },
    overflowRatio() {
			return this.$refs.list.scrollWidth / this.$refs.list.offsetWidth;
		},
		itemWidth() {
			return this.$refs.list.scrollWidth;
    },
  },
  watch: {

  },
  methods: {
    onPan(e) {
			const dragOffset = -100 / this.itemWidth * e.deltaX /this.overflowRatio;
			const transform = this.currentOffset + dragOffset;

      this.$refs.list.style.setProperty("--x", transform);
      this.transform = e.pointerType
              
      if (e.isFinal) {
				this.currentOffset = transform;
				const maxScroll = 100 - this.overflowRatio * 100;
        let finalOffset = this.currentOffset;

				// scrolled to last item
				if (this.currentOffset <= maxScroll) {
					finalOffset = maxScroll;
				} else if (this.currentOffset >= 0) {
					// scroll to first item
					finalOffset = 0;
				} else {
					// animate to next item according to pan direction
					const index = this.currentOffset / this.overflowRatio / 100 * 5;
					const nextIndex = e.deltaX <= 0 ? Math.floor(index) : Math.ceil(index);
					finalOffset = 100 * this.overflowRatio / this.count * nextIndex;
        }		      
      }
    },
    buttonLeft(pos){
      let style = getComputedStyle(this.$refs.list)
      this.position = parseFloat(style.backgroundPosition.match(/.*?(?=p|$)/i)[0])
      this.position = this.position + pos
			this.$refs.list.style.setProperty("--x", this.position);
    },
    buttonRight(pos){
      let style = getComputedStyle(this.$refs.list)
      this.position = parseFloat(style.backgroundPosition.match(/.*?(?=p|$)/i)[0])
      this.position = this.position + pos
			this.$refs.list.style.setProperty("--x", this.position);    
    },
  }
}
</script>
<style>
p.compass {
  position: absolute;
  top: 50px;
  right: 100px;
  z-index: 9999;
  background: white;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
}

/* swipter */
.vista__img {
  height: 100%;
  width: 100%;
  pointer-events: none;
  background-size: cover;
  background-repeat: repeat-x;
  /* background-position: -400px center; */
  background-position: calc(var(--x, center) * 1%);
  transition: 1.3s ease;
  /* transform: translateX(calc(var(--x, 0) * 1%)); */
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
  
.transform {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: black;
  margin-bottom: 0 !important;
  padding: 10px 20px;
  z-index: 99999999;
}
</style>