<template>
  <v-sheet class="wh100 gallery text-center d-flex flex-column justify-space-between" v-if="get_project != null">
    <div></div>
    <carousel :paginationEnabled0="false" :scrollPerPage="true" :perPageCustom="[[480, 2], [768, 3],[1024, 4]]">
      <slide v-for="(item, index) in get_project.gallery" :key="index">
        <v-img style="width: 200px; max-width: 100%;" class="mx-auto" :src="DIR+item.image"></v-img>
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
      DIRR: process.env.VUE_APP_MEDIA_URL,
      selected_index: 0,
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
<style scoped>
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
</style>