<template>
  <div v-if="!loading && card.name == 'ファイル'" class="card__content pa-3 card__content_height">
    <div v-for="(item, index) in card.arr" :key="index" class="d-flex pa-2 oddeven">
      <!-- image -->
      <v-badge bordered color="success" class="mr-7" icon="mdi-pen" overlap>
        <v-img class="img-wrapper" v-if="item.image != null" :src="item.image" @click="updateFormStatus({form_name:'update_doc_image', status:true, doc:item})"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"></v-img>
        <v-avatar v-else @click="updateFormStatus({form_name:'update_doc_image', status:true, doc:item})" class="img-wrapper rounded-lg" tile width="70px"
          height="70px" color="#f5f6fa">
          <v-icon dark color="#718093" x-large>
            mdi-camera-image
          </v-icon>
        </v-avatar>
      </v-badge>
      <!--  -->
      <v-badge bordered color="success" class="mr-7" icon="mdi-pen" overlap>
        <v-avatar @click="updateFormStatus({form_name:'update_doc_pdf', status:true, doc:item})" class="img-wrapper rounded-lg" tile width="70px" height="70px"
          color="#f5f6fa">
          <v-icon dark color="#718093" x-large>
            mdi-file-pdf-box-outline
          </v-icon>
        </v-avatar>
      </v-badge>
      <!--  -->
      <div class="content-wrapper d-flex justify-center flex-column pointer" @click="updateFormStatus({form_name:card.form, status:true, doc:item})">
        <dl class="d-flex mb-2">
          <dt>ネーム</dt>
          <dd>{{item.name}}</dd>
        </dl>
        <dl class="d-flex">
          <dt>PDF</dt>
          <dd>
            <a v-if="item.pdf != null" :href="item.pdf" target="_blank">PDFを見る</a>
            <p v-else>PDF登録されていない</p>
          </dd>
        </dl>
      </div>
    </div>

    <div v-if="!card.arr.length" class="ww100 hw100 d-flex align-center justify-center">
      <h5 class="gray--text">PDFを登録してください</h5>
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