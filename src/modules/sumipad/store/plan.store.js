export const plan = {
  state: {
    selected_room: null,
  },
  mutations: {
    set_selected_room(state, val){
      state.selected_room = val
    }
  },
  getters: {
    get_selected_room(state){
      return state.selected_room
    }
  },
  actions: {   
    UPDATE_SELECTED_ROOM({commit}, payload){
      this.commit("set_selected_room", payload)
    }
  }
}