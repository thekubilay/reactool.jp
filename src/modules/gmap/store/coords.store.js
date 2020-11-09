export const coords = {
  state: {
    selected_places:["ショッピング施設", "教育施設", "金融機関", "医療施設", "公共・文化施設", "公園・その他"],
    pointed_coord: null,
    travel_type: null,
    route_results:null,
    default_markers: false, 
  },
  mutations:{
    set_project_coord(state, val){
      state.project_coord = val
    },
    set_coords(state, val){
      state.coords = val
    },
    set_selected_places(state, val){
      state.selected_places= val
    },
    set_pointed_coord(state, val){
      state.pointed_coord = val
    },
    set_travel_type(state, val){
      state.travel_type = val
    },
    set_route_results(state, val){
      state.route_results = val
    },
    set_default_markers(state, val){
      state.default_markers = val
    }
  },
  getters: {
    get_project_coord(state){
      return state.project_coord
    },
    get_coords(state){
      return state.coords
    },
    get_selected_places(state){
      return state.selected_places
    },
    get_pointed_coord(state){
      return state.pointed_coord
    },
    get_travel_type(state){
      return state.travel_type
    },
    get_route_results(state){
      return state.route_results
    },
    get_default_markers(state){
      return state.default_markers
    }
    
  },
  actions: {
    UPDATE_SELECTED_PLACES({commit}, payload){
      this.commit("set_selected_places", payload)
    },
    UPDATE_POINTED_COORD({commit}, payload){
      this.commit("set_pointed_coord", payload)
    },
    UPDATE_ROUTE_RESULTS({commit}, payload){
      this.commit("set_route_results", payload)
    },
    UPDATE_TRAVEL_TYPE({commit}, payload){
      this.commit("set_travel_type", payload)
    },
    REMOVE_DEFAULT_MARKERS({commit}, payload){
      this.commit("set_default_markers", payload)
    },
  }

}