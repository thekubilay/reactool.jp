<template>
  <div class="card__hdr pa-4 d-flex align-center justify-space-between rounded-0">
    <div class="d-flex align-center">
      <v-icon>mdi-camera-image</v-icon>
      <h5 class="ml-4">{{card.name}}</h5>
    </div>
    <div class="d-flex align-center">
      <v-btn 
        v-if="card.name != '住戸表'" 
        @click="updateFormStatus({form_name:card.form, status:true})" 
        class="ml-4" 
        elevation="1" 
        small>
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
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
    }
  },
  mixins:[formMixer],
  
}
</script>