import { mapGetters } from "vuex";
export const basicMixin = {
  data(){
    return {
      DIR: process.env.VUE_APP_MEDIA_URL,
      DIR2: process.env.VUE_APP_MEDIA_URL+"/media/",  
      GOOGLE_API: process.env.VUE_APP_GOOGLE_API,      
    }
  },
  methods: {
    loadFrontEndProject(){
      this.$route.params.pid = window.location.href.split("/")[4]
      this.$store.dispatch("RETRIEVE_PROJECT", {pid:window.location.href.split("/")[4]})
    },
    isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          /* next line works with strings and numbers, 
          * and you may want to customize it to your needs
          */
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
    },
    loadUsers(){
      this.$store.dispatch("LOAD_USERS")
    },
    loadProject(){
      localStorage.setItem("projectId", this.$route.params.id)
      this.$store.dispatch("LOAD_PROJECT", this.$route.params.id)
    },
    defaultSep(text){
      text = text+""
      if (text.length == 4) {
        let part1g = text.slice(0,2)
        let part2g = text.slice(2,4)
        return part1g+"."+part2g
      } 
      else if (text.length == 5) {
        let part1 = text.slice(0,3)
        let part2 = text.slice(3,6)
        return part1+"."+part2
      } else {
        let part1 = text.slice(0,2)
        let part2 = text.slice(2,5)
        let part3 = text.slice(5,8)
        return part1+","+part2+","+part3 
      }
    },
    buildingUnits(units, wide_floor){
      let holder = []
      units.forEach((element,index) => {
        if (index % wide_floor === 0) {
          holder.push(units.slice(index-8, index))
        }
      });

      // remove the empty arr.       
      holder.shift()
      // create last nested arr. 
      let lastArrStart = holder[holder.length-1][wide_floor-1]
      let lastArrFinish = units.length
      holder.push(units.slice(lastArrStart.id, lastArrFinish))
      // final floor #1 ~ #floor
      return holder

    }
  },
}