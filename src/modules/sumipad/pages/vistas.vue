<template>
  <v-sheet v-pan="onPan" width="ww100" class="noselect d-flex align-center wh100 pan" v-if="get_project_load == 2">
    <p class="compass">{{compass}}</p>
    <app-vista-controller />
    <div class="slider__list" ref="list" :style="{ backgroundImage: 'url(' + DIR+vistas.image + ')' }"></div> 
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
          mc.options.domEvents = true
          mc.options.preventDefault = true
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
      compass: "東",
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
			return this.$refs.list.scrollWidth / this.$refs.list.offsetWidth;
		},
		itemWidth() {
			return this.$refs.list.scrollWidth;
		},
		count() {
			return 1
    },
  },
  watch: {
    position(oldpos, newpos){
      if (newpos < oldpos) {
        this.compassActionRight(newpos)
      } else {
        this.compassActionLeft(newpos)
      }
    }
  },
	methods: {
    calculateOverAll(dragSpeed, itemWidth, deltaX, count, overflowRatio){
      let dragOffset = dragSpeed / itemWidth * deltaX / count * overflowRatio
      let transform = this.currentOffset + dragOffset;
      this.$refs.list.style.setProperty("--x", transform);        
      return transform
    },
		onPan(e) {
      let dragSpeed = -22
      let transform
      if (parseInt(e.velocityX) > 1 || parseInt(e.velocityX) < -1) {
        this.$refs.list.style.transition = "1s ease"
        dragSpeed = -100
        transform = this.calculateOverAll(dragSpeed, this.itemWidth, e.deltaX, this.count, this.overflowRatio)
        let style = getComputedStyle(this.$refs.list)
        let pos = parseFloat(style.backgroundPosition.match(/.*?(?=p|$)/i)[0])
        // for (let i = 0; i < pos; i++) {
        //   this.position += parseInt(i)
        // }
      } else {
        // def dragspeed -22
        this.$refs.list.style.transition = "unset"
        transform = this.calculateOverAll(dragSpeed, this.itemWidth, e.deltaX, this.count, this.overflowRatio)
        let style = getComputedStyle(this.$refs.list)
        let pos = parseFloat(style.backgroundPosition.match(/.*?(?=p|$)/i)[0])
        this.position = parseInt(pos)
      }
      

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
					const index = this.currentOffset / this.overflowRatio / 100 * this.count;
					const nextIndex = e.deltaX <= 0 ? Math.floor(index) : Math.ceil(index);
					finalOffset = 100 * this.overflowRatio / this.count * nextIndex;
				}
      }
    },
    compassActionRight(position){
      let pos = position
      pos = parseInt(pos)

      const dirs = ["東", "南", "西", "北"]
      if (pos % 20 === 0) {
        if (this.compass_change) {
          if (this.counter < 3) {
            this.counter+=1            
          } else {
            this.counter = 0
          }
          this.compass = dirs[this.counter]
          this.compass_change = false
        } 
      } else {
        this.compass_change = true
      }  
    },
    compassActionLeft(position){
      let pos = position
      pos = parseInt(pos)

      const dirs = ["東", "南", "西", "北"]
      if (pos % 20 === 0) {
        if (this.compass_change) {
          if (this.counter > 0) {
            this.counter -= 1            
          } else {
            this.counter = 3
          }
          this.compass = dirs[this.counter]
          this.compass_change = false
        } 
      } else {
        this.compass_change = true
      }      
    },
    buttonLeft(pos){
      let style = getComputedStyle(this.$refs.list)
      this.position = parseFloat(style.backgroundPosition.match(/.*?(?=p|$)/i)[0])
      this.position = this.position + pos
      this.$refs.list.style.transition = "1s ease"
			this.$refs.list.style.setProperty("--x", this.position);
    },
    buttonRight(pos){
      let style = getComputedStyle(this.$refs.list)
      this.position = parseFloat(style.backgroundPosition.match(/.*?(?=p|$)/i)[0])
      this.position = this.position + pos
      this.$refs.list.style.transition = "1s ease"
			this.$refs.list.style.setProperty("--x", this.position);    
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