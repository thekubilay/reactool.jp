<template>
  <v-sheet class="wh100 gallery text-center d-flex flex-column justify-space-between" v-if="get_project != null">

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

</style>