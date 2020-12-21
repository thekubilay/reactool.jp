<template>
  <v-sheet class="d-flex" v-if="get_project_load == 2">
    <navigation-drawer></navigation-drawer>
    <gmap></gmap>
  </v-sheet>
</template>
<script>
import navigationDrawer from '../components/map-sidebar'
import gmap from '@/modules/gmap/components/gmap'
import { mapGetters } from 'vuex'
export default {
  components: {
    navigationDrawer,
    gmap,
  },
  computed: {
    ...mapGetters([
      "get_project_load"
    ])
  }
}
</script>