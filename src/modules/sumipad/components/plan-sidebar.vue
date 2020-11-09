<template>
  <v-navigation-drawer permanent min-width="300px" width="300px" class="plan__side">
    <div class="d-flex flex-column px-1 py-2">
      <router-link class="rel plan-routes rounded d-flex justify-space-between" :to="{name: item.route}" v-for="(item, index) in items" :key="index">
        <div class="d-flex">
          <v-icon class="active--icon">{{item.icon}}</v-icon>
          <div class="ml-4 d-flex flex-column">
            <span>{{item.text}}</span><span>{{item.subtxt}}</span>
          </div>
        </div>
        <i class="fas fa-chevron-right"></i>
      </router-link>
    </div> 
  </v-navigation-drawer>
</template>
<script>
export default {
  data(){
    return {
      items: [
        { text: '敷地配置図', subtxt:"land plan", route:'landplan', icon: 'mdi-floor-plan' },
        { text: '立面図', subtxt:"elevations" , route:'elevation', icon: 'mdi-floor-plan' },
        { text: '各階平面図', subtxt:"floor plans", route:'floorplan', icon: 'mdi-floor-plan' },
        { text: '間取り', subtxt:"rooms", route:'madori', icon: 'mdi-format-list-bulleted' },
      ],
    }
  }
}
</script>
<style>
.theme--light.v-navigation-drawer.plan__side {
  background-color: #f1f2f6;
  /* border-right: 1px solid #dfe6e9; */
  position: relative;
  z-index: 1;
  overflow: hidden;
}
a.plan-routes {
  text-decoration: none;
  height: 48px;
  display: flex;
  line-height: 1.4;
  padding-left: 10px;
  align-items: center;
  margin-bottom: 5px;
  background: #ffffff;
  color: #8395a7;  
  /* background: white; */
}
a.plan-routes > div > div > span:first-child {
  font-size: 18px;
}
a.plan-routes > div > div > span:last-child {
  font-size: 10px;
  text-transform: uppercase;
}
a.plan-routes > div > .active--icon {
  width: 34px;
  border-radius: 6px;
  height: 34px;
}
a.plan-routes.router-link-exact-active {
  color: aliceblue;
  background-color: #2f3542;
}
a.plan-routes.router-link-exact-active > div > .active--icon {
  color: #df9100;
  background-color: #32323a2d;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.432);
  width: 34px;
  border-radius: 6px;
  height: 34px;
}
a.plan-routes > .fa-chevron-right {
  transition: .5s;
  width: 25px;
  height: 100%;
  background-color: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: white;
}
  a.plan-routes.router-link-exact-active > .fa-chevron-right {
  transition: .2s;
  width: 25px;
  height: 100%;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.200);
  background-color: #32323a2d;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #df9100;
}
  
</style>