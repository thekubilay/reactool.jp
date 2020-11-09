<template>
  <v-sheet width="100%" color="#f5f6fa" class="d-flex align-center jusitfy-center wh100" v-if="get_project_load == 2">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile flat>
        <v-toolbar dark color="#2323a2d" min-height="40px" height="40px" class="fixed">
          <v-spacer></v-spacer>
          <v-btn color="#df9100" class="mr-1" icon dark @click="dialog = false">
            <v-icon color="#df9100">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <img class="ma-auto dialog__img" :src="DIR+get_project.landplans[0].image">
      </v-card>
    </v-dialog>

    <div v-if="get_project.landplans.length" class="d-flex justify-center align-center ww100per hw100per text-center">
      <img :src="DIR+get_project.landplans[0].image" class="bg--white rounded-lg ma-auto" @click="setImage(get_project.landplans[0].image)"
        :style="{width: dialog ? '100%' : '80%'}">
    </div>
    
    <h1 class="vw100 text-center mx-auto" v-else>画像が登録されていない</h1>   
  </v-sheet>
</template>
<script>
import {mapGetters} from 'vuex'
import {basicMixin} from '@/mixins/basicMixin'
export default {
  mixins:[basicMixin],
  data() {
    return {
      dialog: false,
      image: null,
    }
  },
  computed: {
    ...mapGetters([
      "get_project",
      "get_project_load",
    ])
  },
  methods: {
    setImage(img) {
      this.image = this.DIR+img
      this.dialog = true
    },
  },
}
</script>
<style scoped>
  img {
    width: 100%;
    height: 95%;
  }

  .dialog__img {
    height: 100% !important;
  }
</style>