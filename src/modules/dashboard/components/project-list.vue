<template>
  <v-container class="project-list d-flex align-content-start flex-wrap">
    <div class="d-flex flex-column align-center add-btn-wrap mx-5 mt-6" v-if="get_user.is_superuser">
      <v-btn 
        width="75px" outlined 
        color="white" elevation="0" height="75px" 
        @click="updateForm({form_name:'new_project', status:true})"
        class="add-btn rounded-lg">
        <v-icon color="#dcdde1" x-large>mdi-folder-plus-outline</v-icon>
      </v-btn>
      <p class="sm-txt mt-2">新規プロジェクト <br> 追加</p>
    </div>
    
    <router-link 
      class="d-flex flex-column ma-3 project-card" 
      v-for="(project, index) in get_projects" 
      :key="index"
      :to="{name:'project', params:{id:project.id}}">
      <v-card width="100%" flat class="rounded-lg bordered">
        <v-img 
          v-if="project.image != ''" 
          :src="DIR2+project.image" 
          class="white--text align-end" 
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="100px"></v-img>

        <v-avatar
          v-else
          outlined
          class="rounded-lg"
          width="100%"
          height="100px"
          tile
          color="#f5f6fa"
        >
          <v-icon dark color="#718093" x-large>
            mdi-office-building-outline
          </v-icon>
        </v-avatar>
      </v-card>
      <h3 class="project-hdr-txt">{{project.project_name}}</h3>
    </router-link>
  </v-container>
</template>
<script>
import {basicMixin} from '@/mixins/basicMixin'
import { mapGetters } from 'vuex'
export default { 
  mixins:[basicMixin],
  computed:{
    ...mapGetters([
      "get_user",
      "get_projects",
      "get_form",
    ])
  },
  methods: {
    updateForm(form){
      this.$store.dispatch("UPDATE_FORM", form)
    }
  },
}
</script>
<style>
/* card */
.project-list .add-btn-wrap {
  width: 100px;
  padding-top: 10px;
  text-align: center;
}
.project-list .add-btn-wrap > p {
  font-size: 10px !important;
}
.project-list .add-btn {
  border: 2px solid #dcdde1;
  border-style: dashed;
}
.project-list a.project-card {
  padding: 10px;
  border-radius: 10px !important;
  width: 120px;
  height: auto;
  min-width: 120px;
  max-width: 120px;
  font-size: 12px;
  text-decoration: none;
}
.project-list a.project-card .bordered {
  border: 1px solid #dcdde1;
}
.project-list a.project-card:hover {
  border-radius: 10px;
  background: #e9e9ec;
}
.project-list a.project-card h3.project-hdr-txt {
  margin-top: 5px;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  color: black;
}
  
</style>