<template>
  <v-sheet height="100vh" class="pb-14 gallery" v-if="get_project != null">
    <button @click="prev()"><i class="fas fa-chevron-left"></i></button>
    <div class="d-flex flex-column justify-space-between hw100 vw100">
      <div class="emoji d-flex align-center px-10 hw100" ref="emoji"><img class="vw100" :src="selectedContent"></div>
      <div class="list__wrapper">
        <ul class="slider__list" ref="list" v-pan="onPan">
          <li v-for="(image, index) in get_project.gallery" :key="index"
            class="slider__item rel">
            <img :src="image.image">
            <div class="img__cover" v-tap="(e) => onTap(e, image.id)"></div>
          </li>
        </ul>
      </div>
    </div>
    <button @click="next()"><i class="fas fa-chevron-right"></i></button>
  </v-sheet>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  directives: {
    pan: {
      bind: function (el, binding) {
        if (typeof binding.value === "function") {
          const mc = new Hammer(el);
          mc.get("pan").set({
            direction: Hammer.DIRECTION_ALL
          });
          mc.on("pan", binding.value);
        }
      },
    },
    tap: {
      bind: function (el, binding) {
        if (typeof binding.value === "function") {
          const mc = new Hammer(el);
          mc.on("tap", binding.value);
        }
      }
    }
  },
  data() {
    return {
      currentOffset: 0,
      selected: 0,      
    }
  },
  computed: {
    ...mapGetters([
      "get_project",
    ]),
    overflowRatio() {
      return this.$refs.list.scrollWidth / this.$refs.list.offsetWidth;
    },
    itemWidth() {
      return this.$refs.list.scrollWidth / this.get_project.gallery.length;
    },
    selectedContent() {
      if (this.selected) {
        let img = this.get_project.gallery.filter(item => {
          return item.id == this.selected
        })
        return img[0].image
      }
      return this.get_project.gallery[0].image;
    },
    count() {
      return this.get_project.gallery.length
    }
  },
  watch: {
    selected(newValue) {
      TweenMax.fromTo(
        this.$refs.emoji,
        0.6, {
          scale: 0
        }, {
          scale: 1,
          ease: Elastic.easeOut.config(1, 0.8)
        }
      );
    }
  },
  methods: {
    onPan(e) {
      const dragOffset = 100 / this.itemWidth * e.deltaX / this.count * this.overflowRatio;
      const transform = this.currentOffset + dragOffset;
      this.$refs.list.style.setProperty("--x", transform);
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

        // bounce back animation
        TweenMax.fromTo(
          this.$refs.list,
          0.4, {
            '--x': this.currentOffset
          }, {
            '--x': finalOffset,
            ease: Elastic.easeOut.config(1, 0.8),
            onComplete: () => {
              this.currentOffset = finalOffset;
            }
          }
        );
      }
    },
    onTap(e, value) {
      if (value) {
        TweenMax.to(e.target, 0.12, {
          scale: 1.1,
          yoyo: true,
          repeat: 1,
          ease: Sine.easeOut
        })
        this.selected = value;
      }
    },
    prev(){
      let img = this.selectedContent
      let index = this.get_project.gallery.findIndex(item => item.image === img);
      if (index === 0) {
        this.selected = this.get_project.gallery[this.get_project.gallery.length-1].id        
      } else {
        this.selected = this.get_project.gallery[index-1].id        
      }
    },
    next(){
      let img = this.selectedContent
      let index = this.get_project.gallery.findIndex(item => item.image === img);
      if (index === this.get_project.gallery.length-1) {
        this.selected = this.get_project.gallery[0].id        
      } else {
        this.selected = this.get_project.gallery[index+1].id        
      }
    }
  }
}
</script>
<style scoped>
.slider {
  width: 100%;
  height: 120px;
  overflow: visible;
  position: relative;
  white-space: nowrap;
}
.list__wrapper {
  position: relative;
  width: 100%;
  height: 140px;
  min-height: 140px;
  background: rgb(0, 48, 48);
  overflow-x: hidden;
  padding: 10px 0;
}
.slider__list {
  width: 400px;
  display: flex;
  list-style-type: none;
  z-index: 9999999;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translateX(calc(var(--x, 0) * 1%));
  transform: translateX(calc(var(--x, 0) * 1%));

}
.slider__item {
  height: 100%;
  position: relative;
  margin-right: 12px;
  box-sizing: border-box;
  text-align: center;
  -webkit-transition: opacity 0.15s ease;
  transition: opacity 0.15s ease;
  color: #fff;
}
.slider__item>img {
  height: 100%;
}
.slider__item:focus {
  opacity: 0.8;
}
.img__cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.gallery {
  display: flex;
  justify-content: space-between;
}
.gallery > button {
  width: 75px;
  min-width: 75px;
  outline: 0;
}
.gallery .emoji {
  background: #dcdde1;
}
.gallery .emoji > img {
  max-height: 700px;
  height: 100%;
  width: auto;
  margin: auto;
}


</style>