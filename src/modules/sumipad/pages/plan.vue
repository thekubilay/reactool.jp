<template>
  <v-sheet class="wh100" width="100%" color="#fdfdfd" v-if="get_project_load == 2">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" class="pa-15">
      <v-card tile flat class="text-center">
        <v-toolbar dark color="#2323a2d" min-height="40px" height="40px" class="fixed">
          <v-spacer></v-spacer>
          <v-btn class="mr-1" icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <img class="ma-auto dialog--img" :src="image">
      </v-card>
    </v-dialog>

    <v-container class="d-flex justify-space-between align-center">
      <router-link class="return__btn" :to="{name:'madori'}">戻る</router-link>

      <div class="filter__wrapper d-flex pa-2 rounded-lg">
        <div class="select-wrap">
          <h4>現在の間取り</h4>
          <select select v-model="plan">
            <option :value="item.id" v-for="(item, index) in compares" :key="index">{{item.type+" "+item.menu}}</option>
          </select>
          <i class="fas fa-sort-down"></i>
        </div>          
        <div class="select-wrap">
          <h4>比べたい間取り</h4>
          <select class="text-uppercase" v-model="selected_compare">
            <option :value="null">選択</option>
            <option :value="item.id" v-for="(item, index) in compares" :key="index">{{item.type+" "+item.menu}}</option>  
          </select>
          <i class="fas fa-sort-down"></i>
        </div>
      </div>
    </v-container>

    <v-container class="d-flex plan__wrapper" :class="{'justify-center': compare_detail == null}">
      <div class="detail__content__wrapper d-flex flex-column align-center justify-center hw100per" v-if="plan_detail != null">
        <img :src="DIR+plan_detail.image" @click="setImage(plan_detail.image)">
        <v-card color="#f1f2f6" class="d-flex py-2 px-4 plan-card pointer ma-0" @click="toLoanWithSelectedRoom(plan_detail)">      
          <div>
            <h5 class="display-1 font-weight-bold mr-2">{{plan_detail.type}}<span class="ml-1 body-2">type</span></h5>
            <h6 class="title">{{plan_detail.menu}}</h6>
            <v-divider></v-divider>
          </div>
          <div class="mx-5">
            <p class="sm--txt mb-0 mt-2"><span class="dt">間取り:</span> {{plan_detail.room_plan}}</p>          
            <p class="sm--txt mb-0 mt-1"><span class="pr-4 ">広さ:</span> {{defaultSep(plan_detail.room_m2)}}㎡</p>          
            <p class="sm--txt mb-0 mt-1"><span class="pr-4 ">価格:</span> {{defaultSep(plan_detail.price)}}㎡</p>  
          </div>                  
          <v-card-actions class="pa-0">
            <v-btn
              outlined
              text
            >
              資金計画
            </v-btn>
          </v-card-actions>
        </v-card>      
      </div>
      <div class="detail__content__wrapper d-flex flex-column align-center justify-center hw100per"
        v-if="compare_detail != null">
        <img :src="DIR+compare_detail.image" @click="setImage(compare_detail.image)">
        <v-card color="#f1f2f6" class="d-flex py-2 px-4 plan-card pointer ma-0" @click="toLoanWithSelectedRoom(compare_detail)">   
          <div>
            <h5 class="display-1 font-weight-bold mr-2">{{compare_detail.type}}<span class="ml-1 body-2">type</span></h5>
            <h6 class="title">{{compare_detail.menu}}</h6>
            <v-divider></v-divider>
          </div>
          <div class="mx-5">
            <p class="sm--txt mb-0 mt-2"><span class="dt">間取り:</span> {{plan_detail.room_plan}}</p>          
            <p class="sm--txt mb-0 mt-1"><span class="pr-4 ">広さ:</span> {{defaultSep(plan_detail.room_m2)}}㎡</p>          
            <p class="sm--txt mb-0 mt-1"><span class="pr-4 ">価格:</span> {{defaultSep(plan_detail.price)}}㎡</p>  
          </div>                  
          <v-card-actions class="pa-0">
            <v-btn
              outlined
              text
            >
              資金計画
            </v-btn>
          </v-card-actions>                   
        </v-card>
      </div>
    </v-container>

  </v-sheet>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    basicMixin
  } from '@/mixins/basicMixin'
  export default {
    mixins: [basicMixin],
    data() {
      return {
        dialog:false,
        image:null,
        selected_compare: null,
        plan_detail: null,
        plan: null,
        compares: null,
        compare_detail: null,
      }
    },
    mounted(){
      if (this.get_project != null) {
        this.findPlan()
        this.findCompares()
      }
    },  
    watch: {
      get_project(val){
        this.findPlan()
        this.findCompares()
      },
      selected_compare(val) {
        const plan = this.get_project.plans.filter(element => {
          return element.id == val
        });
        this.compare_detail = plan[0]
      },
      plan(val) {
        if (this.$route.params.planId != val) {
          this.$router.push({
            name: "plan",
            params: {
              planId: val
            }
          })
          this.findPlan()
        }
      }
    },
    computed: {
      ...mapGetters([
        "get_project",
        "get_project_load",
      ]),
    },
    methods: {
      setImage(img){
        this.image = this.DIR+img
        this.dialog = true
      },
      findPlan() {
        let plan = this.get_project.plans.filter(element => {
          return element.id == this.$route.params.planId
        });
        let unitObj = this.get_project.units.filter(element => {
          return element.id == plan[0].id
        });
        let unit = unitObj[0]
            unit.image = plan[0].image
        
        this.plan_detail = unit
        this.plan = plan[0].id
      },
      findCompares() {
        this.compares = this.get_project.plans
      },
      toLoanWithSelectedRoom(val){
        this.$store.dispatch("UPDATE_SELECTED_ROOM", {price:val.price, room: val.type+" "+val.room_number})
        this.$router.push({name:'loan'})
      }
    },
  }
</script>
<style>
img.dialog--img {
  width: 90%;
  padding: 75px;
}
a.return__btn {
  text-decoration: none;
  padding: 5px 10px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  background: #32323a;
  color: #df9100;
  margin-left: 10px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

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

.plan__wrapper {
  height: calc(100% - 100px);
}
.detail__content__wrapper {
  width: 50%;
  padding: 10px;
}
.detail__content__wrapper > img {
  max-height: 700px;
  min-height: 400px;
  height: 100%;
}
.plan-card {
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.132) !important;
}
.plan-card p > span.dt {
  padding-right: 3px;
}

</style>