<template>
  <v-sheet class="px-10 d-flex" height="calc(100% - 90px)" :class="{'justify-center':plan === null, 'justify-space-between':plan !== null}" width="100%" v-if="get_project_load == 2">
    <v-card class="mt-5 overflow-y-auto floor--card" width="60%" :class="{specHcard:ipad}" min-width="500px">
      <ul class="floor--wrapper" v-for="(floor, index) in rooms" :key="index">
        <li class="floor--number rel">
          <h3 class="d-flex align-center justify-center">{{get_project.floor - index}}階</h3>

          <div v-for="(item, index) in floor" 
            :key="index+33" class="floor--rooms d-flex" 
            :class="{no__border:item.type == null && !item.sub_floor, 'align-center':item.sub_floor, 'justify-center':item.sub_floor}">

            <h4 v-if="!item.sub_floor" :class="{no__show:item.type == null}">{{item.type}}<br>{{item.room_number}}</h4>
            <div class="ww100per pointer" v-if="item.type != null" @click="findPlan(item)">
              <div class="room--top-wrapper">
                <h5>{{item.menu}}</h5>
                <h6 class="xsm--txt" :class="{orellow: item.status == '商談中', greeni: item.status == '販売中', }">{{item.status}}</h6>
              </div>
              <div class="xsm--txt text-center room--bottom-wrapper d-flex align-center justify-space-around">
                <div class="border-right">{{item.room_plan}}<br>{{defaultSep(item.room_m2)}} &#13217;</div>
                <div v-if="item.status == '販売中'">{{defaultSep(item.price)}}円</div>
              </div>
            </div>

            <div v-else-if="item.sub_floor">{{item.sub_floor_content}}</div>
          </div>
        </li>
      </ul>
    </v-card>

    <v-card class="my-10 botton_content_wrapper text-center py-4 ma-0" width="38%" v-if="plan != null" :class="{specHcardImgWrap:ipad}">
      <img :src="DIR+plan.image" class="side--img">
      <v-card color="#f1f2f6" class="mx-auto d-flex flex-column py-2 px-4 plan-card text-left" :class="{pointer:plan.status == '販売中' || plan.status == '商談中'}" max-width="270px" @click="toLoanWithSelectedRoom(plan)">   
        <div class="d-flex align-center mb-2">
          <div>
            <h5 class="display-1 font-weight-bold mr-2">{{plan.type}}<span class="ml-1 body-2">type</span></h5>
            <h6 class="title">{{plan.menu}}</h6>
          </div>
          <div class="mx-5">
            <p class="sm--txt mb-0 mt-2"><span class="dt">間取り:</span> {{plan.room_plan}}</p>          
            <p class="sm--txt mb-0 mt-1"><span class="pr-4 ">広さ:</span> {{defaultSep(plan.room_m2)}}㎡</p>          
            <p class="sm--txt mb-0 mt-1" v-if="plan.status == '販売中' || plan.status == '商談中'"><span class="pr-4 ">価格:</span> {{defaultSep(plan.price)}}㎡</p>  
          </div>    
        </div>              
        <v-card-actions class="pa-0" v-if="plan.status == '販売中' || plan.status == '商談中'">
          <v-btn
          width="100%"
            outlined
            text
          >
            資金計画
          </v-btn>
        </v-card-actions>                   
      </v-card>
    </v-card>
  </v-sheet>
</template>
<script>
import {basicMixin} from '@/mixins/basicMixin'
import { mapGetters } from 'vuex'
export default {
  mixins:[basicMixin],
  data(){
    return {
      ipad:false,
      plan:null,
    }
  },
  mounted(){
    const navigator = window.navigator;
    if ((navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) || navigator.userAgent.match("iPad")) {
      this.ipad = true
    }
  },
  computed: {
    ...mapGetters([
      "get_project",
      "get_project_load",
    ]),
    rooms(){
      return this.buildingUnits(this.get_project.units, this.get_project.wide_floor)
    }
  },
  methods: {
    findPlan(obj) {
      const plan = this.get_project.plans.filter(element => {
        return element.type == obj.type && element.menu == obj.menu
      });
      this.plan = obj
      this.plan.image = plan[0].image
    },
    priceShort(price){
      if (price != null) {
        price = price+""
        return price.substring(0,4)+"万円"
      } else {
        return ""
      }
    },
    toLoanWithSelectedRoom(val){
      if (val.status == '販売中' || val.status == '商談中') {
        this.$store.dispatch("UPDATE_SELECTED_ROOM", {price:val.price, room: val.type+" "+val.room_number})
        this.$router.push({name:'loan'})        
      }
    }
  },
}
</script>
<style>
/* side img */
img.side--img {
  width: 85%;
  height: calc(100% - 142px);
}

.botton_content_wrapper > .detail__content {
  height: 100px;
  min-height: 100px;
  color: black;
  border-radius: 8px;
  background: #dcdde1;
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  justify-content: space-between;
}
.botton_content_wrapper > .detail__content>h3 {
  background: white;
  border-radius: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 35px;
  width: 75px;
  margin-right: 20px;
}
.botton_content_wrapper > .detail__content>h3>span {
  font-size: 14px;
}
.botton_content_wrapper > .detail__content>div>p {
  margin-bottom: 2px;
  text-transform: uppercase;
  font-size: 13px;
}
.botton_content_wrapper > .detail__content>div.to__loan {
  cursor: pointer;
  background: teal;
  padding: 10px;
  border-radius: 8px;
  margin-left: 20px; 
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.botton_content_wrapper > .detail__content>div.to__loan>.fa-chevron-right {
  font-size: 30px;
}
.specHcard {
  height: calc(100% - 120px);
}
.specHcardImgWrap {
  height: calc(100% - 165px);
}

</style>