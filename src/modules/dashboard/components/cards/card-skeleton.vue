<template>
  <div class="wv100 mt-14 d-flex flex-column align-center" v-if="loading">
    <v-skeleton-loader class="ma-auto" max-width="300" min-width="300" type="table-heading, list-item-two-line">
    </v-skeleton-loader>
    <v-skeleton-loader class="ma-auto" max-width="300" min-width="300" type="table-heading, list-item-two-line">
    </v-skeleton-loader>
  </div>
</template>
<script>
export default {  
  props:{
    loading: {
      type: Boolean,
      required: true,
    }
  },
  watch: {
    loading(){}
  },
  
}
</script>