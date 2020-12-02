<template>
  <v-dialog v-model="dialog" width="500" id="form-dialog">
    <v-card v-if="get_form != null">
      <v-card-title class="headline grey mb-4 lighten-2">{{selected_form.title}}</v-card-title>
        <v-row class="px-5">
          <v-col class="pt-0 mt-0" :sm="form.col" :md="form.span" v-for="(form, index) in selected_form.content" :key="index">
            <!-- text field -->
            <v-text-field v-if="form.kind === 'text'" class="xsm--txt" :label="form.label" :placeholder="form.holder" v-model="form.model" outlined dense></v-text-field>
            <!-- hidden field -->
            <input v-if="form.kind === 'hidden'" type="hidden">
            <!-- image field -->
            <v-file-input
              v-if="form.kind === 'file'"
              :rules="rules"
              v-model="form.model"
              label="画像"
              outlined
              class="sm-txt"
              dense
              prepend-icon="mdi-camera"
              show-size
              placeholder="画像追加"
              :hint="form.hint"
            ></v-file-input>
            <!-- pdf field -->
            <v-file-input
              v-if="form.kind === 'pdf'"
              :rules="rules"
              v-model="form.model"
              label="PDF"
              outlined
              class="sm-txt"
              dense
              prepend-icon="mdi-file-pdf-box-outline"
              show-size
              placeholder="PDF追加"
              :hint="form.hint"
            ></v-file-input>
            <!-- select field -->
            <v-select
              v-if="form.kind === 'select' && form.name !== 'sub_floor'"
              dense
              :placeholder="form.holder"
              :items="form.selects"
              :label="form.label"
              v-model="form.model"
              outlined
            ></v-select>
            <v-select
              v-if="form.kind === 'select' && form.name === 'sub_floor'"
              dense
              :items="form.selects"
              :item-value="'val'" 
              :item-text="'txt'"
              label="共用部の場合"
              v-model="form.model"
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <p>{{form.selects}}</p>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" v-if="get_form.hasOwnProperty('plan') && get_form.form_name !== 'update_plan_image'" text @click="remove(selected_form.delete, get_form.plan.id)">削除</v-btn>
        <v-btn color="error" v-if="get_form.hasOwnProperty('vista') && get_form.form_name !== 'update_vista_image'" text @click="remove(selected_form.delete, get_form.vista.id)">削除</v-btn>
        <v-btn color="error" v-if="get_form.hasOwnProperty('coord')" text @click="remove(selected_form.delete, get_form.coord.id)">削除</v-btn>
        <v-btn color="error" v-if="get_form.hasOwnProperty('doc') && get_form.form_name !== 'update_doc_image' && get_form.form_name !== 'update_doc_pdf'" text @click="remove(selected_form.delete, get_form.doc.id)">削除</v-btn>
        <v-btn color="primary" text @click="submit()">登録</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {basicMixin} from '@/mixins/basicMixin'
import {formMixer} from '@/mixins/form-mixer'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { mapGetters } from 'vuex'
export default {
  mixins:[basicMixin, formMixer],
  data(){
    return {
      dialog: false,
      rules: [
        value => !value || value.size < 700000 || '700KB以下でイメージロードしてください!',
      ],
    }
  },
  async mounted() {
    await GoogleMapsApiLoader({
			apiKey: this.GOOGLE_API
    })
  },  
  watch: {    
    get_form(val){
      this.dialog = val.status
      this.findSelectedForm(val)
    }
  },
  computed: {
    ...mapGetters([
      "get_form",
    ]),
    selected_form(){
      return this.findSelectedForm()[0]
    }
  },
  methods: {
    findSelectedForm(){
      if (this.get_form != null) {
        let keys = ["content", "plan", "vista", "coord", "unit", "doc"]
        let form_key = null
        keys.forEach(element => {
          if (this.get_form.hasOwnProperty(element)) {
            form_key = element
          }          
        });
        return this.whichFormToUpdate(form_key, this.form, this.get_form)
      }
    },
    codeAddress(address) {
      return new Promise((resolve) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode( {'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve({lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()})
          } else {
            alert('問題が発生しました。住所を確認してください: ' + status);
          }
        });
      })
      
    }, 
    submit(){
      if (this.get_form != null) {
        let form = this.form.filter(item => {
          return item.form_name == this.get_form.form_name
        }) 

        let obj = {}
        form[0].content.forEach(element => {
          obj[element.name] = element.model
        });

        let address = Object.keys(obj).filter(element => {
          return element == "address"
        });
        let file = Object.keys(obj).filter(element => {
          return element == "file"
        });

        const self = this
        if (address.length) {
          // this runs if there is address field inside the object.
          this.codeAddress(obj.address)
          .then(response => {
            obj.lat = response.lat
            obj.lng = response.lng
            if (self.get_form.hasOwnProperty("coord")) {
              obj.project = self.$route.params.id
              obj.id = self.get_form.coord.id
            }
            obj.project = self.$route.params.id
            this.$store.dispatch(form[0].dispatch, obj)
          })          
        }
        else if (file.length) {
          // this runs if there is image field inside the object.
          const fd = new FormData();
          if (this.get_form.hasOwnProperty("plan")) {
            localStorage.setItem("planId", this.get_form.plan.id)
            fd.append("id", this.get_form.plan.id)
            fd.append("image", obj["file"], obj["file"].name)
          }
          else if (this.get_form.hasOwnProperty("vista")) {
            localStorage.setItem("vistaId", this.get_form.vista.id)
            fd.append("id", this.get_form.vista.id)
            fd.append("image", obj["file"], obj["file"].name)
          }
          else if (this.get_form.hasOwnProperty("doc")) {
            localStorage.setItem("docId", this.get_form.doc.id) 
            fd.append("id", this.get_form.doc.id)
            if (obj["file"].type === "application/pdf") {
              fd.append("pdf", obj["file"], obj["file"].name)
            } else {
              fd.append("image", obj["file"], obj["file"].name)
            }
          } else {
            // project avatar update
            fd.append("image", obj["file"], obj["file"].name)
            fd.append("id", this.$route.params.id)            
          }

          fd.append("project", this.$route.params.id)
          this.$store.dispatch(form[0].dispatch, fd)
        }
        else {
          // without specific fields 
          if (this.get_form.hasOwnProperty("plan")) {
            obj.room_m2 = obj.room_m2.replace(".", "")
            obj.room_m2 = parseFloat(obj.room_m2)
            obj.id = this.get_form.plan.id
          }
          else if (this.get_form.hasOwnProperty("unit")) {
            obj.room_m2 = obj.room_m2.replace(".", "")
            obj.price = obj.price.replaceAll(",", "")
            obj.room_m2 = parseFloat(obj.room_m2)
            obj.price = parseFloat(obj.price)
            obj.id = this.get_form.unit.id
          }
          else if (this.get_form.hasOwnProperty("vista")) {
            obj.id = this.get_form.vista.id
          }
          else if (this.get_form.hasOwnProperty("coord")) {
            obj.id = this.get_form.coord.id
          }
          else if (this.get_form.hasOwnProperty("doc")) {
            obj.id = this.get_form.doc.id
          }
          obj.project = this.$route.params.id
          this.$store.dispatch(form[0].dispatch, obj)
        }
        // close form dialog
        this.dialog = false
      }
    },
    remove(dispatch, id){
      this.$store.dispatch(dispatch, id)
    }
  },
}
</script>
<style>
.v-text-field {
  font-size: 13px !important;
}
.v-select__slot > .v-label {
  font-size: 12px;
}
.v-select__slot > .v-label--active {
  font-size: 14px !important;
}
.v-select__slot > * > .v-select__selection {
  font-size: 12px !important;
}
  
</style>