<template>
  <v-sheet class="d-flex wh100">
    <navigation-drawer></navigation-drawer>
    <router-view></router-view>
  </v-sheet>
</template>
<script>
import navigationDrawer from '../components/plan-sidebar'
export default {
  components: {
    navigationDrawer,
  }
}
</script>
<style>
.wh100 {
  height: calc(100vh - 80px);
}
  
</style>