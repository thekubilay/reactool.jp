<template>
  <v-sheet width="100%">
    <app-sub-header />
    <div class="cards--wrapper px-5 pt-5 d-flex pb-14 flex-wrap wh100 scrollable justify-space-between" v-if="get_project !== null">
      <app-card v-for="(card, index) in project_cards" :key="index" :card="card"></app-card> 
    </div>
  </v-sheet>
</template>
<script>
import appSubHeader from '../components/sub-header'
import appCard from '../components/cards/cards'
import { mapGetters } from 'vuex'
import {basicMixin} from "@/mixins/basicMixin"
export default {
  components: {
    appSubHeader,
    appCard,
  },
  mixins:[basicMixin],
  mounted(){
    this.loadProject()
  },
  computed: {
    ...mapGetters([
      "get_project",
      "get_project_load",
      "get_form"
    ]),
    project_cards(){
      let cards = []
      cards.push({name: "スライドショー", arr:this.get_project.slideshows, form:"update_slideshow"})
      cards.push({name: "敷地配置図", arr:this.get_project.landplans, form:"update_landplan"})
      cards.push({name: "立面図", arr:this.get_project.elevation_plans, form:"update_elevation"})
      cards.push({name: "各階平面図", arr:this.get_project.floor_plans, form:"update_floorplan"})
      cards.push({name: "間取り", arr:this.get_project.plans, form:"crud_plan"})
      cards.push({name: "眺望", arr:this.get_project.vistas, form:"crud_vista"})
      cards.push({name: "地図", arr:this.get_project.coords, form:"crud_coord"})
      cards.push({name: "ギャラリー", arr:this.get_project.gallery, form:"update_gallery_image"})
      cards.push({name: "ファイル", arr:this.get_project.documents, form:"crud_doc"})
      cards.push({name: "住戸表", arr:this.get_project.units, form:"crud_unit"})
      return cards
    },
  },
}
</script>