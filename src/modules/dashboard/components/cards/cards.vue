<template>
  <v-card ref="card" :loading="loading" width="48%" height="424px" class="project--card mx-2 my-3 rounded-lg">

    <!-- progress loading -->
    <template slot="progress">
      <v-progress-linear color="teal" height="6" indeterminate></v-progress-linear>
    </template>

    <!-- card header  -->
    <card-header :card="card"></card-header>
    <!-- card skeleton loading -->
    <card-skeleton :loading="loading"></card-skeleton>
    <!-- card SLIDESHOW -->
    <card-slideshow :card="card" :loading="loading"></card-slideshow>
    <!-- card LANDPLAN -->
    <card-landplan :card="card" :loading="loading"></card-landplan>
    <!-- card ELEVATION --> 
    <card-elevation :card="card" :loading="loading"></card-elevation>
    <!-- card FLOORPLAN --> 
    <card-floorplan :card="card" :loading="loading"></card-floorplan>
    <!-- card VISTA --> 
    <card-vista :card="card" :loading="loading"></card-vista>
    <!-- card PLAN --> 
    <card-plan :card="card" :loading="loading"></card-plan>
    <!-- card COORD --> 
    <card-coord :card="card" :loading="loading"></card-coord>
    <!-- card GALLERY --> 
    <card-gallery :card="card" :loading="loading"></card-gallery>
    <!-- card DOCUMENT -->
    <card-document :card="card" :loading="loading"></card-document>
    <!-- card UNIT -->
    <card-unit :card="card" :loading="loading" :units="get_project.units" :wide_floor="get_project.wide_floor" :floor_num="get_project.floor"></card-unit>
  </v-card>
</template>
<script>
import cardHeader from "./card-header"
import cardSkeleton from "./card-skeleton"
import cardSlideshow from "./card-slideshow"
import cardLandplan from "./card-landplan"
import cardElevation from "./card-elevation"
import cardFloorplan from "./card-floorplan"
import cardPlan from "./card-plan"
import cardVista from "./card-vista"
import cardCoord from "./card-coord"
import cardGallery from "./card-gallery"
import cardDocument from "./card-document"
import cardUnit from "./card-unit"
import {basicMixin} from '@/mixins/basicMixin'
import {mapGetters} from 'vuex';
export default {
  components:{
    cardHeader,
    cardSkeleton,
    cardSlideshow,
    cardLandplan,
    cardElevation,
    cardFloorplan,
    cardPlan,
    cardVista,
    cardCoord,
    cardGallery,
    cardDocument,
    cardUnit,
  },
  mixins: [basicMixin],
  props: {
    card: Object,
    required: true,
  },
  data() {
    return {
      dialog: false,
      loading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 2000);
  },
  computed: {
    ...mapGetters([
      "get_form_content_id",
      "get_form",
      "get_project",
    ]),
  },
}
</script>
<style>
.card__border {
  border-top: 6px solid teal !important;
}

.card__hdr {
  border-bottom: 1px solid #dcdde1;
}

.card__img {
  border: 1px solid teal !important;
}

.del {
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 99;
  top: -10px;
  right: -10px;
  cursor: pointer;
}

.card__content_height {
  height: 350px;
  overflow-y: auto;
}

.img-wrapper {
  width: 70px;
  min-width: 70px;
  border-radius: 8px;
  height: 70px;
}

.content-wrapper {
  font-size: 12px;
  width: 50%;
}

.content-wrapper>dl>dt {
  font-weight: 600;
  width: 60px;
}
</style>