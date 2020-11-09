<template>
  <v-card elevation="0" class="bg d-flex justify-center align-center rounded-0" height="100%">
    <v-card width="400px" class="card pa-5 rounded-lg" elevation="1">
        <v-card elevation="0" class="mb-10 card d-flex justify-space-between align-center rounded-0">
          <h3 class="ma-0"></h3>
          <div class="d-flex align-center img-wrap"><img src="@/assets/images/reactool_logo.svg" alt="">reactool</div>
        </v-card>
        <label class="input-wrap">
          <p class="mb-2 mt-4">メール *</p>
          <input type="email" class="rounded-lg" placeholder="example@example.com" v-model="form.email">
        </label>
        <label class="input-wrap">
          <p class="mb-2 mt-4">パスワード *</p>
          <input type="password" class="rounded-lg" placeholder="パスワード" v-model="form.password" v-on:keyup="loginWithEnter">
        </label>
        <p class="errors rounded-lg pl-3 py-1 mt-4" v-if="error != ''">{{error}}</p>
        <button class="mt-5 rounded-lg" @click="login()">ログイン</button>
    </v-card>
  </v-card>
</template>
<script>
export default {
  data(){
    return {
      error: "",
      form: {
        email: "",
        password: "",
      }
    }
  },
  methods: {
    login(){
      let values = Object.values(this.form)
      let validate = true;
      values.forEach(element => {
        if (element == "") {
          validate = false
        }
      });
      if (validate) {
        this.$store.dispatch("retrieve_token", this.form)
        .then(response => {
          this.$router.push({name:'projects'})  
          const payload = null
          this.$store.dispatch("LOAD_USER", payload)      
          this.$store.dispatch("LOAD_PROJECTS")    
        })    
        .catch(err => {
          console.log(err.email)
          this.error = "メールアドレスかパスワードか間違っております。"
        })    
      } else {
        this.error = "全ての項目を入力してください"
      }
    },
    loginWithEnter(e){
      if(e.keyCode === 13){
        let values = Object.values(this.form)
        let validate = true;
        values.forEach(element => {
          if (element == "") {
            validate = false
          }
        });
        if (validate) {
          this.$store.dispatch("retrieve_token", this.form)
          .then(response => {
            this.$router.push({name:'projects'})  
            const payload = null
            this.$store.dispatch("LOAD_USER", payload)      
            this.$store.dispatch("LOAD_PROJECTS")    
          })    
          .catch(err => {
            console.log(err.email)
            this.error = "メールアドレスかパスワードか間違っております。"
          })    
        } else {
          this.error = "全ての項目を入力してください"
        }
      } 
    }
  },
}
</script>
<style scoped>
.card {
  background-color: #e7eff9;
}
.card .img-wrap {
  font-size: 12px;
}
.card img {
  margin-right: 7px;
  height: 20px;
}
.card label p {
  color: #7ed6df;
  font-weight: 600;
  font-size: 11px;
}
.card label input {
  font-size: 14px !important;
  background: white;
  border: 1px solid #dcdde1;
  height: 40px;
  padding-left: 15px;
  width: 100%;
}
.card label input::placeholder {
  font-size: 13px;
}
.card button {
  font-family: 'Titillium Web', sans-serif;
  height: 46px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  background: #22a6b3;
  color: white;
}
  
</style>