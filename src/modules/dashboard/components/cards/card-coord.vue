<template>
  <div v-if="!loading && card.name == '地図'" class="card__content pa-3 overflow-y-auto card__content_height">
    <div class="d-flex rel pa-2 mb-3 ww100 rounded-lg oddeven" v-for="(item, index) in card.arr" :key="index">
      <div style="width:100%" class="content-wrapper ww100 d-flex justify-center flex-column" @click="updateFormStatus({form_name:card.form, status:true, coord:item})">
        <dl class="d-flex">
          <dt>場所</dt>
          <dd>{{item.place}}</dd>
        </dl>
        <dl class="d-flex">
          <dt>ネーム</dt>
          <dd>{{item.name}}</dd>
        </dl>
        <dl class="d-flex">
          <dt>住所</dt>
          <dd>{{item.address}}</dd>
        </dl>
      </div>
    </div>

    <div v-if="!card.arr.length" class="vw100 hw100 d-flex align-center justify-center">
      <h5 class="gray--text">場所を登録してください</h5>
    </div>
  </div>
</template>
<script>
import {formMixer} from '@/mixins/form-mixer'
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
  mixins:[formMixer],
}
</script>