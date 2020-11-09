<template>
  <v-sheet width="100%" color="#f5f6fa" class="scrollable d-flex align-center jusitfy-center wh100" v-if="get_project_load == 2">
    <div v-if="get_project.elevation_plans.length" class="d-flex align-center jusitfy-center flex-wrap ww100per hw100per">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card tile flat>
        <v-toolbar dark color="#2323a2d" min-height="40px" height="40px" class="fixed">
            <v-spacer></v-spacer>
            <v-btn class="mr-1" icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <img class="ma-auto dialog__img" :src="image">
        </v-card>
      </v-dialog>

      <div class="vw50 hw50 pa-5 d-flex justify-center align-center" v-for="(item, index) in get_project.elevation_plans" :key="index">
        <img class="hw100per ww100per ma-auto bg--white rounded-lg" :src="DIR+item.image" @click="setImage(item.image)"/>
      </div>       
    </div>  

    <h1 class="vw100 text-center mx-auto" v-else>画像が登録されていない</h1>   
  </v-sheet>
</template>
<script>
import { mapGetters } from 'vuex'
import {basicMixin} from '@/mixins/basicMixin'
export default {
  mixins:[basicMixin],
  data(){
    return {
      dialog:false,
      image:null,
    }
  },
  computed: {
    ...mapGetters([
      "get_project",
      "get_project_load",
    ])
  },
  methods: {
    setImage(img){
      this.image = this.DIR+img
      this.dialog = true
    },
  },
}
</script>
