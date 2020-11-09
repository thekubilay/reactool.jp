<template>
  <v-sheet class="wh100 gallery text-center py-5" v-if="get_project != null">
    <img class="dynaimg" :src="dynamicly_selected">
    <!-- <div :style=""></div> -->
    <vue-glide :perView="6" :bound="false" :rewind="false">
      <vue-glide-slide      
        v-for="(item, index) in get_project.gallery"
        :key="index">
        <img class="slide-img" :src="DIRR+item.image" @click="selected_index = index">
      </vue-glide-slide>
    </vue-glide>
  </v-sheet>
</template>
<script>
import 'vue-glide-js/dist/vue-glide.css'
import {basicMixin} from '@/mixins/basicMixin'
import { mapGetters } from 'vuex';
import { Glide, GlideSlide } from 'vue-glide-js'
export default {
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  mixins:[basicMixin],
  data() {
    return {
      DIRR: process.env.VUE_APP_MEDIA_URL,
      selected_index: 0,
    }
  },
  mounted(){
    this.select
  },
  computed: {
    ...mapGetters([
      "get_project",
    ]),    
    dynamicly_selected(){
      console.log(this.get_project.gallery[this.selected_index].image)
      return this.DIRR+this.get_project.gallery[this.selected_index].image
    }
  },
  methods: {
  },    
}
</script>
<style scoped>

.glide {
  width: 90%;
  margin: auto;
  text-align: center;
}
img.slide-img {
  width: 100%;
  cursor: pointer;
}
img.dynaimg {
  width: auto;
  margin: auto;
  margin-bottom: 20px;
  height: calc(100% - 190px);
}
</style>