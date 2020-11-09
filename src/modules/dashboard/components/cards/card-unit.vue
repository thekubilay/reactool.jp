<template>
  <div v-if="!loading && card.name == '住戸表'" class="card__content pa-3 card__content_height">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable class="pt-10 mt-10">
      <v-card tile>
        <v-toolbar dark color="#32323a" min-height="40px" height="40px" class="fixed mt-10 pr-2">
          <v-spacer></v-spacer>
          <v-btn color="#df9100" icon dark @click="dialog = false">
            <v-icon color="#df9100">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div class="wh100raw unit-map px-10">
          <div class="unit-inner-map scrollable pt-10 pb-10">
            <ul class="floor--wrapper" v-for="(floor, index) in rooms" :key="index">
              <li class="floor--number rel">
                <h3 class="d-flex align-center justify-center">{{floor_num - index}}階</h3>
                <div 
                  @click="updateFormStatus({form_name:card.form, status:true, unit:item})"
                  v-for="(item, index) in floor" :key="index+33" 
                  class="floor--rooms d-flex" 
                  :class="{'align-center':item.sub_floor, 'justify-center':item.sub_floor}"
                  >
                  <h4 v-if="!item.sub_floor" 
                      :class="{no__show:item.type == null}">{{item.type}}<br>{{item.room_number}}</h4>
                  <div class="ww100" v-if="item.type != null && !item.sub_floor">
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
          </div>
        </div>
      </v-card>
    </v-dialog>

    <div class="vw100 hw100per d-flex align-center justify-center" @click="dialog = true">
      <h5 class="gray--text text-center">マッパーを開く <br>
        <v-icon large>mdi-domain</v-icon>
      </h5>
    </div>
  </div>
</template>
<script>
import {formMixer} from '@/mixins/form-mixer'
import {basicMixin} from '@/mixins/basicMixin'
import {mapGetters} from "vuex"
export default {  
  props:{
    card: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true
    },
    units: {
      type: Array,
      required: true
    },
    wide_floor: {
      type: Number,
      required: true
    },
    floor_num: {
      type: Number,
      required: true
    }
  },  
  data(){
    return {
      dialog: false,
    }
  },
  mixins:[formMixer, basicMixin],
  computed: {    
    rooms(){
      return this.buildingUnits(this.units, this.wide_floor)
    }
  },
}
</script>