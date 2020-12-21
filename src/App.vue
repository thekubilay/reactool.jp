<template>
  <v-app :class="{'ipad-size': ipad}">
    <v-main>
      <router-view class="bg--color" :class="{'ipad-size': ipad, 'wh100': !ipad }"></router-view>
      <bottom-navigation v-if="this.$route.name !== 'projects' && this.$route.name !== 'project' && this.$route.name !== 'login'"></bottom-navigation>
    </v-main>
  </v-app>
</template>
<script>
import {mapGetters} from 'vuex'
import bottomNavigation from './modules/sumipad/components/bottom-navigation'
export default {
  name: 'App',
  components:{bottomNavigation,},
  data(){
    return {
      ipad: false
    }
  },
  created(){
    const navigator = window.navigator;
    // || userAgent.match(/iPhone/i)
    // console.log(navigator)
    if ((navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) || navigator.userAgent.match("iPad")) {
      this.ipad = true
    }
    if (window.location.href.split("/")[3] !== "projects" &&
        window.location.href.split("/")[3] !== "project" &&
        window.location.href.split("/")[3] !== "login" &&
        window.location.href.split("/")[3] !== "") {
      this.$route.params.slug = window.location.href.split("/")[3]
      this.$store.dispatch("RETRIEVE_PROJECT", {pid:window.location.href.split("/")[3]})      
    } else {
      this.$route.params.slug = "dummy"
      if (this.get_token) {
        const payload = null
        this.$store.dispatch("LOAD_USER", payload)      
        this.$store.dispatch("LOAD_PROJECTS")      
        if(this.$route.name === "users"){
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
.ipad-size {
  height: 97vh !important;

}
.ipad-size > .v-application--wrap {
  min-height: unset !important;
}

</style>
