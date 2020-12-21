<template>
  <v-bottom-navigation flat color="#2f3542" absolute height="90px" class="bottomnav" grow v-if="get_project !== null">
    <v-btn height="100%" class="not--active pb-4" v-for="(item, index) in filterRoutes(routes)" :key="index" :to="{name:item.route}" :exact="true" exact-active-class="--active font-weight-bold">
      <span>{{item.name}}</span>
      <v-icon class="mx-0">{{item.icon}}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data(){
    return {
      routes:[
         {
          name: "ホーム",
          route: "home",
          icon: "mdi-home",
        },
        {
          name: "地図",
          route: "map",
          icon: "mdi-map-marker",
        },
        {
          name: "図面集",
          route: "landplan",
          icon: "mdi-floor-plan",
        },
        {
          name: "カラーセレクト",
          route: "colorSelect",
          icon: "mdi-palette",
        },
        {
          name: "眺望",
          route: "vistas",
          icon: "mdi-camera-image",
        },
        {
          name: "住戸表",
          route: "units",
          icon: "mdi-office-building-outline",
        },
        {
          name: "資金計画",
          route: "loan",
          icon: "mdi-view-list",
        },
        {
          name: "ギャラリー",
          route: "gallery",
          icon: "mdi-folder-multiple-image",
        },
        {
          name: "ファイル管理",
          route: "documents",
          icon: "mdi-file-pdf-box-outline",
        },
      ]
    }
  },
  computed:{
    ...mapGetters([
        "get_project"
    ])
  },
  methods:{
    filterRoutes(routes){
      return routes.filter(item => {
        if (this.get_project.project_path === 'branneed_nagai') {
          return item.route === 'home' || item.route === 'vistas'
        } else {
          return item
        }
      })
    }
  }
}
</script>
<style scoped>
.bottomnav {
  z-index: 999;
}
.v-item-group.v-bottom-navigation {
  box-shadow: none;
}  
.v-item-group.v-bottom-navigation .v-icon {
  position: relative;
  z-index: 1;
}  
.v-item-group.v-bottom-navigation span {
  font-size: 11px;
  margin-top: 3px;
}  
.v-item-group.v-bottom-navigation .not--active .v-icon {
  color: #bdc3c7;
  font-size: 26px;
}


.v-item-group.v-bottom-navigation .--active {
  background-color: #2f3542;
  box-shadow: 0px 15px 20px rgba(46, 95, 229, 0.4);
}  
.v-item-group.v-bottom-navigation .--active .v-icon {
  color: #2f3542;
  font-size: 30px;
}  
.v-item-group.v-bottom-navigation .--active span {
  color: #2f3542;
  font-size: 12px;
}  
</style>