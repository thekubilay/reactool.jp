<template>
  <v-sheet class="pb-14" height="100vh" width="100%" color="#f5f6fa" v-if="get_project != null">
    <ul class="files d-flex flex-wrap scrollable">
      <li class="files-file" v-for="(item, index) in get_project.documents" :key="index">
        <a :href="item.pdf" target="_blank">
          <figure class="files-file-img d-flex justify-center py-2">
            <img class="mx-auto pdf__img" :src="DIR+item.image"></figure>            
          <p class="files-file-txt">{{ item.name }}</p>
        </a>  
      </li>
    </ul>
  </v-sheet>
</template>
<script>
import {basicMixin} from '@/mixins/basicMixin'
import { mapGetters } from 'vuex'
export default {
  mixins:[basicMixin],
  computed: {
    ...mapGetters([
      "get_project",
    ])
  }
}
</script>
<style>
.files {
  width: 100%;
  list-style: none;
  align-content: flex-start;
  align-items: flex-start;
}
.files-file {
  max-width: 300px;
  height: auto;
  width: 20%;
  background: white;
  min-width: 150px;
  margin: 3%;
  list-style: none;
  border-radius: 8px !important;
  border: 1px solid #f5f6fa;
  border-top: 5px solid #eb4d4b;
  box-shadow: 0 25px 20px -21px rgba(104, 78, 78, .1);
}
.files-file-img {
  padding: 15px;
}
.files-file-img > img.pdf__img {
  border-radius: 8px;
  margin-top: 10px;
  width: 100%;
}
.files-file-txt {
  text-align: center;
  color: #545454;
  padding-bottom: 20px;
}
</style>