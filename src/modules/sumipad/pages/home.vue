<template>
  <v-carousel hide-delimiters class="wh100" :continuous="true" :cycle="true" :interval="3500" :touch="{ left: () => activeSlide--,right: () => activeSlide++}" v-if="get_project_load == 2">    
    <v-carousel-item
      class="carousel"
      v-for="(item,i) in get_project.slideshows"
      :key="i"
      :src="DIR+item.image"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
import {basicMixin} from '@/mixins/basicMixin'
import {mapGetters} from 'vuex'
export default {
  mixins:[basicMixin],
  data(){
    return {
      DIR: process.env.VUE_APP_MEDIA_URL,
    }
  },
  mounted(){
    this.loadFrontEndProject()
  },  
  created(){
    if (this.get_project_load != 2) {
      this.loadFrontEndProject()
    }
  },
  computed: {
    ...mapGetters([
      "get_project",
      "get_project_load",
    ])
  }
}
</script>
<style>
.carousel > * {
  height: 100% !important;
}
  
</style>