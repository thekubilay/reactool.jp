<template>
  <v-sheet height="100vh" width="100%">
    <app-header />
    <app-form />
    <project-list v-if="this.$route.name == 'projects'" /> 
    <router-view v-else></router-view>
  </v-sheet>
</template>
<script>
import appHeader from '../components/header'
import appForm from "../components/form"
import projectList from '../components/project-list'
export default { 
  components:{appHeader, appForm, projectList},
}
</script>
