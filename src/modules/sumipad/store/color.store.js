export const color = {
  state: {
    selected_color_type: "r",
    selected_color_room: "living_room",
    selected_base_color: "dark",
    selected_kitchen_bar_color: "dark",
    selected_kitchen_desk_color: "brownie",
  },
  mutations: {
    set_selected_color_type(state, val){
      state.selected_color_type = val
    },
    set_selected_color_room(state, val) {
      state.selected_color_room = val
    },
    set_selected_base_color(state, val){
      state.selected_base_color = val
    },
    set_selected_kitchen_bar_color(state, val){
      state.selected_kitchen_bar_color = val
    },
    set_selected_kitchen_desk_color(state, val){
      state.selected_kitchen_desk_color = val
    }
  },
  getters: {
    get_selected_color_type(state){
      return state.selected_color_type
    },
    get_selected_color_room(state) {
      return state.selected_color_room
    },
    get_selected_base_color(state){
      return state.selected_base_color
    },
    get_selected_kitchen_bar_color(state){
      return state.selected_kitchen_bar_color
    },
    get_selected_kitchen_desk_color(state){
      return state.selected_kitchen_desk_color
    }
  },
  actions: {
    UPDATE_TYPE_ACTION({commit}, payload){
      this.commit("set_selected_color_type", payload)
    },
    UPDATE_ROOM_ACTION({commit}, payload){
      this.commit("set_selected_color_room", payload)
    },
    UPDATE_BASE_COLOR_ACTION({commit}, payload){
      this.commit("set_selected_base_color", payload)
    },
    UPDATE_BAR_COLOR_ACTION({commit}, payload){
      this.commit("set_selected_kitchen_bar_color", payload)
    },
    UPDATE_DESK_COLOR_ACTION({commit}, payload){
      this.commit("set_selected_kitchen_desk_color", payload)
    }
  }
}