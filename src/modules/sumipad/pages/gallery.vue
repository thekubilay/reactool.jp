<template>
  <v-sheet class="gallery text-center d-flex flex-column justify-space-between" v-if="get_project != null">
    <v-img class="selected--image" :src="DIR+get_project.gallery[selected_index].image"></v-img>
    <carousel :scrollPerPage="true" :perPageCustom="[[480, 2],[768, 3],[1024, 4]]" :class="{minH:ipad}">
      <slide v-for="(item, index) in get_project.gallery" :key="index">
        <v-img style="width: 200px; max-width: 100%;" class="mx-auto" :src="DIR+item.image" @click="selected_index = index"></v-img>
      </slide>
    </carousel>
  </v-sheet>
</template>
<script>
import {basicMixin} from '@/mixins/basicMixin'
import { mapGetters } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
export default {
  components: {
    Carousel,
    Slide
  },
  mixins:[basicMixin],
  data() {
    return {
      ipad:false,
      DIRR: process.env.VUE_APP_MEDIA_URL,
      selected_index: 0,
      selected_image: null
    }
  },
  mounted(){
    const navigator = window.navigator;
    if ((navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) || navigator.userAgent.match("iPad")) {
      this.ipad = true
    }
  },
  watch: {
    selected_index(val){
      console.log(val)
    }
  },
  computed: {
    ...mapGetters([
      "get_project",
    ]),    

  },   
  
}
</script>
<style>
.selected--image {
  width: auto;
  margin: 20px 20px;
  border-radius: 10px;
  height: calc(100% - 300px) !important;
}
.VueCarousel-slide {
  position: relative;
  background: #303952;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  min-height: 100px;
  padding: 10px 0;
}
.VueCarousel-pagination {
  display: none !important;
}
.minH {
  min-height: 260px;
}
</style>