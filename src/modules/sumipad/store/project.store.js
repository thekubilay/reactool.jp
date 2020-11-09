import projectApi from './project.api'
export const project = {
  state: {
    project: null,
    project_load: 0,
  },
  mutations: {
    set_project(state, val){
      state.project = val
    },
    set_project_load(state, val){
      state.project_load = val
    }
  },
  getters: {
    get_project(state){
      return state.project
    },
    get_project_load(state){
      return state.project_load
    }
  },
  actions:{
    RETRIEVE_PROJECT({commit}, payload){
      this.commit("set_project_load", 1)
      projectApi.API_RETRIEVE(payload)
      .then(response => {
        this.commit("set_project", response.data)
        this.commit("set_project_load", 2)
      })
      .catch(err => {
        console.log(err)
        this.commit("set_project_load", 3)
      })
    }
  }
}