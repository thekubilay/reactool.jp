<template>
  <div v-if="!loading && card.name == '敷地配置図'" class="card__content d-flex flex-wrap pa-3 card__content_height">
    <div class="img-wrap rel ma-2 rounded-lg" v-for="(item, index) in card.arr" :key="index">
      <div class="del" @click="removeFormData('DELETE_PROJECT_LANDPLAN', item)"></div>
      <v-badge bordered color="error" icon="mdi-close" overlap>
        <v-img width="75px" max-width="75px" class="card__img rounded-lg" height="75px" :src="item.image" :key="index"
          alt="slideshow image" />
      </v-badge>
    </div>
    <div v-if="!card.arr.length" class="ww100 hw100 d-flex align-center justify-center">
      <h5 class="gray--text">画像をアップロードしてください</h5>
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
  mixins:[formMixer]
  
}
</script>