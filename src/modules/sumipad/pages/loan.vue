<template>
  <v-sheet height="100vh" color="#f5f6fa" class="d-flex align-center justify-center pb-14">
    <v-card width="100%" max-width="900px" height="600px" max-height="600px">
      <div class="result__wrapper align-center px-10">
        <h2 class="vw100 font-weight-regular align-center justify-space-around">
          <div class="d-flex align-center" :class="{active: room != null}"><span class="d-flex align-center">{{room != null ? room+" 室号 "+price+"万円 "  : ""}}</span><span class="d-flex align-center price--txt"><small>月々返済額</small>{{monthReturnAmountM}} 万円</span></div>
        </h2>
      </div>
      <div class="sliders__wrapper px-10">
        <div class="slider--content--wrapper" v-for="(item, index) in sliders" :key="index">
          <div class="txt--wrapper d-flex"><v-icon class="mr-3" :color="item.color" large>{{item.icon}}</v-icon><h4>{{item.name}}</h4></div>
          <div class="input--wrapper d-flex"><input type="text" v-model="item.model" class="mr-3"><h4>{{item.type}}</h4></div>
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
import BigNumber from "bignumber.js";
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
          model: 4000,
          color:"blue",
          type: "万円",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 10000,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'blue' },
          },
        },
        {
          icon: "mdi-trending-up",
          name: "金利",
          model: 0.001,
          color:"orange",
          type: "%",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 1,
            interval: 0.001,
            formatter: (val) => val/1000,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'orange' },
          },       
        },
        {
          icon: "mdi-cash",
          name: "頭金",
          model: 300,
          color:"red",
          type: "万円",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 1000,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'red' },
          },    
        },
        {
          icon: "mdi-cash-multiple",
          name: "ボーナス支払い",
          model: 100,
          color:"green" ,
          type: "万円",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 500,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'green' },
          },   
        },
        {
          icon: "mdi-clock-time-five-outline",
          name: "返済時間",
          model: 1,
          color:"purple",
          type: "年",
          options: {
            dotSize: 30,
            width: '100%',
            height: 8,
            min: 0,
            max: 40,
            tooltip: 'none',
            railStyle: {backgroundColor: 'gray' },
            processStyle: {backgroundColor: 'purple' },
          },
        },
      ],
      monthReturnAmountM:"",
      bukkenPrice:"",
      kinri:"",
      kinri_decimal:"",
      atamakin:"",
      bonusPay:"",
      hensaiPeriod:"",
      room:null,
    }
  },
  mounted(){
    this.reCalcurateM(this.sliders)
    if (this.get_selected_room != null && this.get_selected_room.price != null){
      let index = ""
      this.sliders.forEach((element, i) => {
        if (element.name == "物件価格") {
          index = i
        }
      });
      let price = this.get_selected_room.price+""
      this.room = this.get_selected_room.room
      this.price = price.substring(0,4)
      this.sliders[index].model = price.substring(0,4)
    }     
  },
  watch:{
    finance_decimal:function(val){
      this.modelFilter_push(val.model,this.sliders, "金利");
    },
    sliders:{
      handler:function(val){
        this.reCalcurateM(val);
      },
      deep:true,
    }
  },
  computed: {
    ...mapGetters(["get_selected_room"]),
  },
  methods: {

    modelFilter: function(array, str){
      return array.filter(item => {
        return item.name == str
      })
    },
    modelFilter_push: function(val, array, str){
       let arr = array.filter(item => {
        return item.name == str
      })
      arr[0].model = val
    },
    lengthCheck: function(targetName, number, maxLength) {
        var count = number.toString().length;
        var rtnNumber = new BigNumber(0);

        if (count > maxLength) {
            var rtnNumber = new BigNumber(number.toString().substr(0, maxLength));
            targetName =rtnNumber
            return rtnNumber;
        }
        return number;
    },
      
    // 月々支払額算出関数
    reCalcurateM: function(val) {
      
      this.bukkenPrice = this.modelFilter(val, "物件価格")[0];
      this.kinri = this.modelFilter(val, "金利")[0];
      this.atamakin = this.modelFilter(val, "頭金")[0];
      this.bonusPay = this.modelFilter(val, "ボーナス支払い")[0];
      this.hensaiPeriod = this.modelFilter(val, "返済時間")[0];


      // 数字が消されたら0にする
      if(this.bukkenPrice.model  == "" ){
        this.bukkenPrice.model  = 0;
      }
      if(this.kinri.model  == "" ){
        this.kinri.model  = 0;
      }
      if(this.atamakin.model  == "" ){
        this.atamakin.model  = 0;
      }
      if(this.bonusPay.model  == "" ){
        this.bonusPay.model  = 0;
      }
      if(this.hensaiPeriod.model  == "" ){
        this.hensaiPeriod.model  = 1;
      }


      // 借入希望価格(a)
      let purchaseRequestPrice = new BigNumber(this.bukkenPrice.model);
      // // // ローン金利(d)
      let finance = new BigNumber(this.kinri.model);
      // let finance_decimal = finance.times(0.01).toNumber();
      // // // 頭金
      let atamakin = new BigNumber(this.atamakin.model);
      // // // ボーナス返済額（1回分）(b)
      let bAmt = new BigNumber(this.bonusPay.model);
      // // // 返済期間(c)
      let payBackPeriod = new BigNumber(this.hensaiPeriod.model);


      // 頭金を借入金額から引いておく
      purchaseRequestPrice = new BigNumber(purchaseRequestPrice - atamakin);
        // this.kinri_decimal = new BigNumber(this.kinri).times(0.01).toNumber();

        var culc1 = finance.div(new BigNumber(100)).div(new BigNumber(2));
        var culc2 = finance.div(new BigNumber(100)).div(new BigNumber(12));
        var culc3 = payBackPeriod.times(new BigNumber(12));
        var culc4 = (culc2.plus(new BigNumber(1))).exponentiatedBy(culc3);

        // ボーナスで返済する借入金額 
        var returnAmountBonus = (bAmt.times((culc1.plus(new BigNumber(1))).exponentiatedBy(payBackPeriod.times(new BigNumber(2))).minus(new BigNumber(1)))).div(culc1.times((culc1.plus(new BigNumber(1))).exponentiatedBy(payBackPeriod.times(new BigNumber(2)))));
        var culc5 = ((purchaseRequestPrice.minus(returnAmountBonus)).times(culc2).times(culc4));
        // 月々支払額 x=((a-((b*((1+d/100/2)^(c*2)-1))/((d/100/2)*(1+d/100/2)^(c*2))))*(d/100/12)*((1+d/100/12)^(12*c)))/(((1+d/100/12)^(12*c))-1)
        var monthReturnAmount = ((purchaseRequestPrice.minus(returnAmountBonus)).times(culc2).times(culc4)).div(culc4.minus(new BigNumber(1)));
        if (monthReturnAmount.isNaN()) {
            monthReturnAmount = new BigNumber(0);
        }
        // 最終的にマイナス値の場合は0で返却
        if (monthReturnAmount.comparedTo(new BigNumber(0)) < 0) {
            monthReturnAmount = new BigNumber(0);
        }
        // 月々支払額は小数第三位を切り上げ
         this.monthReturnAmountM = monthReturnAmount.dp(1, BigNumber.ROUND_UP)
    }
  }
}
</script>
<style>
.result__wrapper {
  height: 100px;
  width: 100%;
}
.result__wrapper h2 {
  height: 100%;
  padding-top: 20px;
}
.result__wrapper h2 > span {
  height: 100%;
}
.result__wrapper h2 > div.active {
  justify-content: space-between;
}
.result__wrapper h2 > div > span {
  height: 100%;
  display: inline-block;
}
.result__wrapper span.price--txt{
  font-size: 40px;
  position: relative;
  border-bottom: 4px solid black;
}
.result__wrapper span.price--txt small{
  font-size: 24px;
  margin-right: 12px;
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