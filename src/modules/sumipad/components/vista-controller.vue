<template>
  <div class="d-flex py-2 px-3 align-center controller rounded-lg">
    <div>
      <p class="xtxt mb-1 pr-2" v-if="time">DAY</p>
      <p class="xtxt mb-1 pr-2" v-else>NIGHT</p>
      <v-switch class="switcher mt-0 ml-2 pa-0" v-model="time" inset></v-switch>
    </div>
    <div class="d-flex align-center justify-center flex-column">
      <!-- day images -->
      <div class="d-flex" v-if="!isEmpty(get_project)">
        <v-btn elevation="0" width="35px" min-width="35px" class="mx-2 px-3" 
          v-for="item in divisableFloors(get_project.floor)" 
          :key="item"           
          outlined
          :class="{activebtn: activeFloor == item, disabled: !unIncludedFloors(item)}"
          @click="changeCurrentVista(item)">{{item}}F</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import {basicMixin} from "@/mixins/basicMixin"
import { mapGetters } from 'vuex'
  export default {
    mixins:[basicMixin],
    data () {
      return {
        time:true,
        activeFloor: 2,
      }
    },
    computed: {
      ...mapGetters([
        "get_project",
        "get_current_vista"
      ]),
      day_images(){          
      },
    },

    methods:{
      unIncludedFloors(vista){
        let val = null
        if (this.time) {
          val = "DAY"
        } else {
          val = "NIGHT"
        }
        
        let floors = []
        let bool = null
        this.get_project.vistas.forEach(element => {
          floors.push(element.floor)
        });
        let times = this.get_project.vistas.filter(element => {
          return vista == element.floor && element.time == val
        });

        if (floors.includes(vista) && times.length) {
          return true
        } else {
          return false
        }
      },
      divisableFloors(floors){
        let arranged = []
        for (let i = 2; i < floors; i++) {
          if (i % 2 === 0) {
            arranged.push(i)
          }          
        }        
        let len = arranged.length
        arranged.push(arranged[len-1] + 2)
        return arranged
      },
      changeCurrentVista(floor){
        let bool = this.unIncludedFloors(floor)
        if (bool) {
          this.activeFloor = floor
          let val = ""
          if (this.time) {
            val = "DAY"
          } else {
            val = "NIGHT"
          }
          this.$store.commit("set_current_vista", {"time":val, "floor":floor})         
        } 
      },
    }
    
  }
</script>
<style>
.switcher {
  height: 40px;
}
.controller {
  position: absolute;
  z-index: 99;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.945);
}
.controller p {
  font-size: 11px;
  text-align: center;
}
.activebtn {
  background: #4834d4;
  background-color: #4834d4 !important;
  color: white !important;
}
.disabled {
  opacity: .2;  
}
</style>