import projectsApi from "./projects.api"
export const projects = {
  state: {
    projects_load:0,    
    projects: [],
    form: null,
  },
  mutations: {
    set_projects_load(state, val){
      state.projects_load = val
    },
    set_projects(state, val){
      state.projects = val
    },
    set_form(state, val){
      state.form = val
    }
  },
  getters: {
    get_projects_load(state){
      return state.projects_load
    },
    get_projects(state){
      return state.projects
    }, 
    get_form(state){
      return state.form
    }
  },
  actions: {
    LOAD_PROJECTS({commit}){
      this.commit("set_projects_load", 1)
      projectsApi.LOAD_PROJECTS_API()
      .then(response => {
        this.commit("set_projects", response.data)
        this.commit("set_projects_load", 2)
      })
      .catch(err => {
        this.commit("set_projects_load", 3)
        console.log(err)
      })
    }, 
    LOAD_PROJECT({commit}, payload){
      if (payload === undefined) {
        payload = localStorage.getItem("projectId")
      }
      this.commit("set_project_load", 1)
      projectsApi.LOAD_PROJECT_API(payload)
      .then(response => {
        this.commit("set_project", response.data)
        this.commit("set_project_load", 2)
      })
      .catch(err => {
        console.log(err)
      })
    },
    UPDATE_FORM({commit}, payload) {
      this.commit("set_form", payload)
    },
    CREATE_NEW_PROJECT({commit, dispatch}, payload){
      console.log(payload)
      projectsApi.CREATE_NEW_PROJECT_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECTS")
      })
      .catch(err => {
        console.log(err)
      })
    },
    UPDATE_PROJECT_CONTENT({commit, dispatch}, payload){
      projectsApi.UPDATE_PROJECT_CONTENT_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    UPDATE_PROJECT_AVATAR({commit, dispatch}, payload){
      projectsApi.UPDATE_PROJECT_AVATAR_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    NEW_PROJECT_SLIDESHOW({commit, dispatch}, payload){
      projectsApi.NEW_PROJECT_SLIDESHOW_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    DELETE_PROJECT_SLIDESHOW({commit, dispatch}, payload){
      projectsApi.DELETE_PROJECT_SLIDESHOW_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
}