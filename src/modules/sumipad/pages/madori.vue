<template>
  <v-sheet width="100%" class="wh100" color="#fdfdfd" v-if="get_project_load == 2">
      <v-container class="d-flex justify-space-between align-center">
        <h3 class="black--text ml-3">一覧</h3>
        <div class="filter__wrapper d-flex pa-2 rounded-lg">
          <div class="select-wrap">
            <h4>間取り</h4>
            <select select v-model="selected_madori">
              <option value="全て">全て</option>
              <option :value="item" v-for="(item, index) in madori" :key="index">{{item}}</option>
            </select>
            <i class="fas fa-sort-down"></i>
          </div>          
          <div class="select-wrap">
            <h4>広さ</h4>
            <select v-model="selected_m2">
              <option :value="item.val" v-for="(item, index) in m2" :key="index">{{item.txt}}</option>
            </select>
            <i class="fas fa-sort-down"></i>
          </div>
        </div>
      </v-container>
      <div class="room-wrapper-container">
        <div class="d-flex flex-wrap px-6 room--wrapper">
          <v-card class="py-2 px-4 plan-card pointer" v-for="(plan, index) in filterPlans(get_project.plans)" :key="index" width="174px" max-width="200px" @click="pushToDetail(plan.id)">   
            <div>
              <h5 class="display-1 font-weight-bold mr-2">{{plan.type}}<span class="ml-1 body-2">type</span></h5>
              <h6 class="title">{{plan.menu}}</h6>
              <v-divider></v-divider>
            </div>
            <p class="sm--txt mb-0 mt-2"><span class="dt">間取り:</span> {{plan.room_plan}}</p>          
            <p class="sm--txt mb-0 mt-1"><span class="pr-4 ">広さ:</span> {{defaultSep(plan.room_m2)}}㎡</p>          
          </v-card>
        </div>
      </div>

      <h1 class="vw100 text-center hw100 d-flex align-center black--text justify-center" v-if="!get_project.plans.length">間取りが登録されていない</h1>   

      <router-view v-if="get_project != null && this.$route.name == 'plan' "></router-view>
  </v-sheet>
</template>
<script>
import {mapGetters} from 'vuex'
import {basicMixin} from "@/mixins/basicMixin"
export default {
  mixins:[basicMixin],
  data(){
    return {
      madori:[],
      selected_madori: "全て",
      m2: [{txt:"全て", val:"全て"}, {txt:"40,00㎡ 〜 50,00㎡", val:4000}, 
        {txt:"50,00㎡ 〜 60,00㎡", val:5000}, 
        {txt:"60,00㎡ 〜 70,00㎡", val:6000}, 
        {txt:"70,00㎡ 〜 80,00㎡", val:7000}, 
        {txt:"80,00㎡ 〜 90,00㎡", val:8000}, 
        {txt:"90,00㎡ 〜 100,00㎡", val:9000}, 
        {txt:"100,00㎡ 〜 110,00㎡", val:10000}, 
        {txt:"110,00㎡ 〜 120,00㎡", val:11000}, 
        {txt:"120,00㎡ 〜 130,00㎡", val:12000}, 
        {txt:"130,00㎡ 〜 140,00㎡", val:13000}, 
        {txt:"140,00㎡ 〜 以上", val:14000}],
      selected_m2: "全て",
    }
  },
  watch: {
    get_project(){
      this.selects()
    }
  },
  computed: {
    ...mapGetters([
      "get_project",
      "get_project_load",
    ]),  
  },
  mounted(){
    this.selects()
  },
  methods: {
    selects(){
      let madori = []
      let m2 = []
      this.get_project.plans.forEach(element => {
        madori.push(element.room_plan)        
      });
      this.madori = [...new Set(madori)]
      return;
    },
    filterPlans(plans){
      let p = JSON.parse(JSON.stringify(plans))
      if (this.selected_madori != "全て" || this.selected_m2 != "全て" ) {
        let filtered = p
        if (this.selected_madori != "全て") {
          filtered = plans.filter(item => {
            return item.room_plan == this.selected_madori
          })    
        }
        if (this.selected_m2 != "全て") {
          filtered = filtered.filter(item => {
            if (this.selected_m2 == 14000) {
              return item.room_m2 > this.selected_m2
            } else {
              let m2 = this.selected_m2+1000
              return item.room_m2 >= this.selected_m2 && item.room_m2 < m2
            }
          })   
        } 

        return filtered.sort(this.dynamicSort("type"));
      } else {
        return p.sort(this.dynamicSort("type"));
      }
    },
    pushToDetail(id){
      this.$router.push({name:'plan', params:{planId:id}})
    }
  },

}
</script>
<style>
.select-wrap {
  border: 1px solid #4d4d4d;
  background: #32323a;
  color: #df9100;
  border-radius: 8px;
  position: relative;
  width: 178px;
  height: 54px;
}
.select-wrap:first-child {
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.select-wrap:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.select-wrap > .fa-sort-down{
  position: absolute;
  right: 10px;
  bottom: 12px;
}
.select-wrap > h4 {
  font-weight: 400;
  font-size: 11px;
  margin-left: 10px;
  margin-top: 7px;
}
.select-wrap > select {
  width: 150px;
  color: whitesmoke;
  padding-top: 20px;
  padding-left: 10px;
  outline: 0;
  font-size: 12px;
  background: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  width: 100%;
}


/* card */
.room-wrapper-container {
  width: 100%;
  overflow: auto !important;
  height: 100% !important;
  padding-bottom: 125px !important;
}
.room--wrapper {
  margin: 0 auto;
  padding-top: 25px;
  width: 774px !important;
  align-content: flex-start !important;
}
.plan-card {
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.132) !important;
  margin-right: 10px;
  margin-bottom: 10px;
}
.plan-card:nth-child(4n) {
  margin-right: 0;
}
.plan-card p > span.dt {
  padding-right: 3px;
}
</style>