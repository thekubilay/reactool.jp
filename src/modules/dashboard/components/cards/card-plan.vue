<template>
  <div v-if="!loading && card.name == '間取り'" class="card__content pa-3 card__content_height">
    <div class="d-flex rel pa-2 rounded-lg oddeven" v-for="(item, index) in card.arr" :key="index">
      <v-badge bordered color="success" class="mr-7" icon="mdi-pen" overlap>
        <v-img class="img-wrapper" v-if="item.image != ''" :src="item.image" @click="updateFormStatus({form_name:'update_plan_image', status:true, plan:item})"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"></v-img>
        <v-avatar v-else width="70px" height="70px" @click="updateFormStatus({form_name:'update_plan_image', status:true, plan:item})" class="img-wrapper rounded-lg" tile
          color="#f5f6fa">
          <v-icon dark color="#718093" x-large>
            mdi-floor-plan
          </v-icon>
        </v-avatar>
      </v-badge>
      <!--  -->
      <div class="d-flex ww100 pointer" @click="updateFormStatus({form_name:card.form, status:true, plan:item})">
        <div class="content-wrapper ww100 d-flex mr-5 justify-center flex-column">
          <dl class="d-flex">
            <dt>タイプ</dt>
            <dd>{{item.type}}</dd>
          </dl>
          <dl class="d-flex">
            <dt>メニュー</dt>
            <dd>{{item.menu}}</dd>
          </dl>
        </div>
        <div class="content-wrapper d-flex justify-center flex-column">
          <dl class="d-flex">
            <dt>間取り</dt>
            <dd>{{item.room_plan}}</dd>
          </dl>
          <dl class="d-flex">
            <dt>専有面積</dt>
            <dd>{{defaultSep(item.room_m2)}} &#13217;</dd>
          </dl>
        </div>
      </div>
    </div>
    <div v-if="!card.arr.length" class="ww100 hw100 d-flex align-center justify-center">
      <h5 class="gray--text">画像をアップロードしてください</h5>
    </div>
  </div>
</template>
<script>
import {formMixer} from '@/mixins/form-mixer'
import {basicMixin} from '@/mixins/basicMixin'
export default {  
  props:{
    card: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true
    }
  },  
  mixins:[formMixer,basicMixin],
}
</script>