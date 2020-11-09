<template>
  <v-sheet height="100vh" color="#f5f6fa" class="d-flex align-center justify-center pb-14">
    <v-card width="100%" max-width="900px" height="600px" max-height="600px">
      <div class="result__wrapper d-flex align-center px-10">
        <h2 class="vw100 font-weight-regular d-flex align-center justify-space-around">
          <span class="d-flex align-center" v-if="get_selected_room != null">{{this.get_selected_room.room != null ? this.get_selected_room.room+" 号室の場合" : ""}}</span>
          <div class="d-flex align-center"><span class="d-flex align-center">月々返済額</span><span class="d-flex align-center price--txt">50,000 円</span></div>
        </h2>
      </div>
      <div class="sliders__wrapper px-10">
        <div class="slider--content--wrapper" v-for="(item, index) in sliders" :key="index">
          <div class="txt--wrapper d-flex"><v-icon class="mr-3" :color="item.color" large>{{item.icon}}</v-icon><h4>{{item.name}}</h4></div>
          <div class="input--wrapper d-flex"><input type="text" v-model.number="item.model" class="mr-3"><h4>{{item.type}}</h4></div>
          <div class="slider--wrapper d-flex align-center">
            <vue-slider v-model="item.model" v-bind="item.options" />
          </div>
        </div>
      </div>
    </v-card>
  </v-sheet>
</template>
<script>
import { mapGetters } from 'vuex'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
export default {
  components: {
    VueSlider
  },
  data(){
    return {
      isInputActive: false,
      sliders: [
        {
          icon: "mdi-office-building-outline",
          name: "物件価格",
          model: 40000000,
          color:"blue",
          type: "万円",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 100000000,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'blue' },
          },
        },
        {
          icon: "mdi-trending-up",
          name: "金利",
          model: 0.1,
          color:"orange",
          type: "%",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 10,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'orange' },
          },          
        },
        {
          icon: "mdi-cash",
          name: "頭金",
          model: 300000,
          color:"red",
          type: "万円",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 100000000,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'red' },
          },          
        },
        {
          icon: "mdi-cash-multiple",
          name: "ボーナス支払い",
          model: 300000,
          color:"green" ,
          type: "万円",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 500000,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'green' },
          },    
        },
        {
          icon: "mdi-clock-time-five-outline",
          name: "返済時間",
          model: 30,
          color:"purple",
          type: "年",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 50,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'purple' },
          },
        },
      ]
    }
  },
  mounted(){
    if (this.get_selected_room != null && this.get_selected_room.price != null){
      let index = ""
      this.sliders.forEach((element, i) => {
        if (element.name == "物件価格") {
          index = i
        }
      });
      this.sliders[index].model = this.get_selected_room.price
    }
  },
  computed: {
    ...mapGetters([
      "get_selected_room",
    ]),
    result(){

      let result = this.thePMT()
      return ""
    },
    model: {
      get: function() {
        if (this.isInputActive) {
            return this.value.toString()
        } else {
            return this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "1,")
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""))
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
            newValue = 0
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    thePMT(ir, np, pv, fv, type) {
      /*
      * ir   - interest rate per month
      * np   - number of periods (months)
      * pv   - present value
      * fv   - future value
      * type - when the payments are due:
      *        0: end of the period, e.g. end of month (default)
      *        1: beginning of period
      */
      var pmt, pvif;

      fv || (fv = 0);
      type || (type = 0);

      if (ir === 0)
          return -(pv + fv)/np;

      pvif = Math.pow(1 + ir, np);
      pmt = - ir * pv * (pvif + fv) / (pvif - 1);

      if (type === 1)
          pmt /= (1 + ir);

      return pmt;
    }
  },  
}
</script>
<style>
.result__wrapper {
  height: 100px;
  width: 100%;
}
.result__wrapper h2 {
  height: 100%;
}
.result__wrapper h2 > span {
  height: 100%;
}
.result__wrapper h2 > div > span {
  height: 100%;
  display: inline-block;
}
.result__wrapper span.price--txt{
  font-size: 40px;
  margin-left: 20px;
  position: relative;
  border-bottom: 4px solid black;
}

.sliders__wrapper {
  height: 500px;
  width: 100%;
  overflow: hidden;
}
.sliders__wrapper .slider--content--wrapper {
  height: 20%;
  display: flex;
  align-items: center;
}
.sliders__wrapper .slider--content--wrapper .txt--wrapper,
.sliders__wrapper .slider--content--wrapper .input--wrapper {
  width: 25%;
  align-items: center;
}
.sliders__wrapper .slider--content--wrapper .input--wrapper > input {
  width: 100px;
  outline: 0;
  border: 1px solid #dcdde1;
  border-radius: 8px;
  height: 42px;
  padding-right: 5px;
  text-align: right;
}
.sliders__wrapper .slider--content--wrapper .slider--wrapper {
  width: 50%;
}
.sliders__wrapper .slider--content--wrapper .slider--wrapper * > .v-messages  {
  display: none;
}
.sliders__wrapper .slider--content--wrapper .slider--wrapper * > .v-input__slot  {
  margin-bottom: 0;
}
.v-slider__track-container{
  height: 10px !important;
}
/* .sliders__wrapper .slider--content--wrapper .slider--wrapper * > .v-slider__thumb {
    height: 20px;
    width: 20px;
  }

.sliders__wrapper .slider--content--wrapper .slider--wrapper * > .v-slider--horizontal .v-slider__track-container {
  height: 4px;
} */
</style>