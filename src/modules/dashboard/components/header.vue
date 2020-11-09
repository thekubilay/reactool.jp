<template>
  <div class="main_header d-flex align-ver pa-0 px-0">
    <div class="mh-left px-4 d-flex align-center">reactool</div>
    <div class="mh-center px-4 d-flex justify-start align-center"></div>
    <div class="mh-right px-4 d-flex justify-end align-center">
      <!-- <v-menu transition="slide-y-transition" bottom width=40px>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs" v-on="on" color="#4834d4" width="28px" min-width="36px" height="28px" class="profile-icon rounded-lg">
            <span v-if="get_user_load == 2" class="sm-txt white--text text-uppercase">{{get_user.username.length > 2 ? get_user.username.substring(0,1) : get_user.username.substring(0,2)}}</span>
          </v-avatar>
        </template>
        <v-list class="pa-0 profile-list">
          <v-list-item class="d-flex flex-column pa-0 profile-menu-wrap">
            <v-list-item-title class="menu-list-item px-4 py-3" @click="open()">プロファイル設定</v-list-item-title>
            <v-list-item-title class="menu-list-item px-4 py-3" @click="logout()">ログアウト</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->

      <v-btn @click="logout()" width="34px" min-width="34px" color="red" class="ml-2" small><v-icon class="white--text" small>mdi-logout</v-icon></v-btn>
    
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    open() {
      this.$store.commit("set_form", {name:"update_profile", status:true})
    },
    logout(){
      this.$store.dispatch("DESTROY_TOKEN")
    }
  },
  computed:{
    ...mapGetters([
      "get_user_load",
      "get_user",
    ])
  }
}
</script>
<style scoped>
.main_header {
  background: #141a1f;
  color: aliceblue !important;
  height: 40px;
  width: 100%;
  position: relative;
  z-index: 999;
}
.main_header .toolbar {
  width: 100%;
}
.main_header .mh-left {
  width: 255px;
  height: 100%;
  font-size: 14px;
  min-width: 255px;
}
.main_header .mh-center,
.main_header .mh-right {
  height: 100%;
  width: 50%;
}

.profile-menu-wrap::after {
  content: unset !important;
}
.menu-list-item {
  width: 100%;
  cursor: pointer;
  font-size: 12px !important;
  text-align: center;
}
.menu-list-item:hover {
  background: #dcdde1;
  background-color: #dcdde1;
}
</style>