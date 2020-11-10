<template>
  <v-app>
    <v-main>
      <router-view class="bg--color"></router-view>
      <bottom-navigation v-if="this.$route.name != 'projects' && this.$route.name != 'project' && this.$route.name != 'login'"></bottom-navigation>
    </v-main>
  </v-app>
</template>
<script>
import {mapGetters} from 'vuex'
import bottomNavigation from './modules/sumipad/components/bottom-navigation'
export default {
  name: 'App',
  components:{bottomNavigation,},
  created(){    
    if (window.location.href.split("/")[4] != "projects" && 
        window.location.href.split("/")[4] != "project" && 
        window.location.href.split("/")[4] != "login" && 
        window.location.href.split("/")[4] != "") {
      this.$route.params.slug = window.location.href.split("/")[4]
      this.$store.dispatch("RETRIEVE_PROJECT", {pid:window.location.href.split("/")[4]})      
    } else {
      this.$route.params.slug = "dummy"
      if (this.get_token) {
        const payload = null
        this.$store.dispatch("LOAD_USER", payload)      
        this.$store.dispatch("LOAD_PROJECTS")      
        if(this.$route.name == "users"){
          this.$store.dispatch("LOAD_USERS")      
        }
      }  
    }    
  },
  computed:{
    ...mapGetters([
      "get_token",
    ]),
  },
}
</script>
<style>
@import "./assets/css/master.css";
@import "./assets/css/unit.css";
@import "./assets/css/media.css";
</style>
