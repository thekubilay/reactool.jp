<template>
  <v-card flat tile class="tabbar-wrapper">
    <v-toolbar flat extension-height="1px" class="toolbar" v-if="get_project_load == 2">
      <!-- top project content -->
      <v-badge avatar bordered overlap bottom class="project_thumbsnail">
        <template v-slot:badge>
          <v-avatar color="#718093">
            <v-icon>mdi-plus</v-icon>
          </v-avatar>
        </template>
        <v-avatar size="38" class="rounded-lg" @click="updateProjectAvatar()">
          <v-img v-if="get_project.image != ''" :src="DIR2+get_project.image"></v-img>
          <v-icon v-else>mdi-office-building-outline</v-icon>
        </v-avatar>
      </v-badge>

      <!-- title and path content -->
      <v-badge avatar bordered overlap top offset-x="-5px">
        <template v-slot:badge>
          <v-avatar color="orange">
            <v-icon>mdi-pen</v-icon>
          </v-avatar>
        </template>
        <v-toolbar-title 
          @click="updateProjectContent()" 
          class="text-lg-h6 pl-7 font-weight-bold">
            {{get_project.project_name}} <br> 
            <span class="sm--txt font-weight-regular">{{get_project.project_path}}</span>
        </v-toolbar-title>
      </v-badge>      

      <v-spacer></v-spacer>
      <!-- sumaipad button -->
      <v-btn @click="toSumaipad()" class="sm-txt rounded-lg black--text font-weight-bold" color="#c7ecee" elevation="0">公開サイトへ</v-btn>
      
      <!-- bottom navigation -->
      <template v-slot:extension extension-height="30px" height=34px>
        <v-tabs color="#01b6b3" class="tabbar" v-model="tab" align-with-title height="34px" slider-size="3">
          <v-tabs-slider color="#28a09e"></v-tabs-slider>
          <v-tab class="navtab tabbar-item" v-for="(item,index) in items" :key="index" :to="{name:item.route}">{{ item.text }}
          </v-tab>
        </v-tabs>
      </template>

    </v-toolbar>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { basicMixin } from '@/mixins/basicMixin'
export default {
  mixins:[basicMixin],
  data() {
    return {
      tab: null,
      items: [
        // this loads sub routes (not arranged yet)
      ],
    }
  },
  computed:{
    ...mapGetters([
      "get_project",
      "get_project_load",
    ])
  },
  methods: {
    toSumaipad(){
      this.$router.push({name:'home', params:{slug: this.get_project.project_path}})
    },
    updateProjectAvatar(){
      this.$store.commit("set_form",{form_name:"update_project_avatar", status:true})
    },
    updateProjectContent(){
      this.$store.commit("set_form",{form_name:"update_project", status:true, content:this.get_project})
    }
  },
}
</script>
<style scoped>
.tabbar-wrapper {
  z-index: 99;
  border-bottom: 1px solid #dcdde1;
}
.toolbar {
  box-shadow: 0 25px 20px -30px rgba(104, 78, 78, .1) !important;
}

img.project-img {
  width: 34px;
  height: 34px;
  border: 1px solid #dfe6e9;
  border-radius: 6px;
}

.v-toolbar__title {
  font-size: 1rem !important;
  line-height: 1.2; 
}

.tabbar-item {
  font-weight: 600;
  font-size: 12px;
  text-transform: capitalize;
  color: #28a09e !important;
}
.v-application--is-ltr .v-tabs--align-with-title>.v-tabs-bar:not(.v-tabs-bar--show-arrows):not(.v-slide-group--is-overflowing)>.v-slide-group__wrapper>.v-tabs-bar__content>.v-tab:first-child,
.v-application--is-ltr .v-tabs--align-with-title>.v-tabs-bar:not(.v-tabs-bar--show-arrows):not(.v-slide-group--is-overflowing)>.v-slide-group__wrapper>.v-tabs-bar__content>.v-tabs-slider-wrapper+.navtab {
  margin-left: 64px !important;
}

.sumaipad-link {
  display: inline-block;
  overflow: hidden;
  height: 35px;
  padding: 0 3px;
  padding-top: 5px;
  border-radius: 5px;
  background: rgba(223, 145, 0, 0.219);
  font-size: 13px;
  line-height: 25px;
  font-weight: 500;
  text-decoration: none;
  color: #df9100;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sumaipad-link>span {
  padding: 7px 6px;
  background: linear-gradient(90deg, #f98a3f, #fab35c);
  color: white;
  border-radius: 5px;;
}

.sumaipad-link>span>.fa-angle-right {
  position: relative;
  top: 1.22px
}
.v-badge__badge {
  height: 19px;
}
.v-badge__badge .v-icon {
    font-size: 14px;
}
.project_thumbsnail {
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #dcdde1 !important;
}
  

</style>