
export const vista = {
  state: {
    current_vista:{
      time: "DAY",
      floor: "2",
    }
  },
  mutations: {
    set_current_vista(state, val){
      state.current_vista = val
    }
  },
  getters: {
    get_current_vista(state){
      return state.current_vista
    }
  },
  actions: {     
  }
}