import authApi from "./api"
export const auth = {
  state: {
    token: localStorage.getItem("token") || null,
    error: null,
    user_load: 0,
    users: [],
    user: {},
    new_user_form: false,
    profile_form: false,
    user_content_form: false,
    user_content: null,
  },
  mutations: {
    set_token(state, val) {
      state.token = val
    },
    set_error(state, val){
      state.error = val
    },
    set_user_load(state, val) {
      state.user_load = val
    },
    set_users(state, val) {
      state.users = val
    },
    set_user(state, val) {
      state.user = val
    },
    set_new_user_form(state, val) {
      state.new_user_form = val
    },
    set_profile_form(state, val){
      state.profile_form = val
    },
    set_user_content_form(state, val){
      state.user_content_form = val
    },
    set_user_content(state, val){
      state.user_content = val
    },
  },
  getters: {
    get_token(state) {
      return state.token !== null
    },
    get_error(state){
      return state.error
    },
    get_user_load(state) {
      return state.user_load
    },
    get_users(state) {
      return state.users
    },
    get_user(state) {
      return state.user
    },
    get_new_user_form(state) {
      return state.new_user_form
    },
    get_profile_form(state){
      return state.profile_form
    },
    get_user_content_form(state){
      return state.user_content_form
    },
    get_user_content(state){
      return state.user_content
    },
  },
  actions: {
    retrieve_token({commit,dispatch}, payload) {
      return new Promise((resolve, reject) => {
        authApi.LOAD_TOKEN(payload)
          .then(response => {
            const token = response.data.key
            localStorage.setItem("token", token)
            this.commit("set_token", token)
            localStorage.setItem("userId", response.data.user.id)
            const payload = null
            dispatch("LOAD_USER", payload)
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DESTROY_TOKEN({commit}) {
      authApi.LOG_OUT()
        .then(() => {
          localStorage.removeItem("token")
          localStorage.removeItem("userId")
          localStorage.removeItem("projectId")
          this.commit("set_token", null)
          location.reload();
        })
    },
    LOAD_USERS({commit}) {
      authApi.LOAD_USERS_API()
        .then(response => {
          this.commit("set_users", response.data)
        })
        .catch(err => {
          console.log("err: ", err)
        })
    },
    LOAD_USER({commit}, payload) {
      this.commit("set_user_load", 1)
      authApi.LOAD_USER_API(payload)
        .then(response => {
          this.commit("set_user_load", 2)
          this.commit("set_user", response.data)
        })
        .catch(err => {
          this.commit("set_user_load", 3)
          localStorage.removeItem("token")
          router.push({
            name: 'login'
          })
        })
    },
    CREATE_NEW_USER({commit, dispatch}, payload) {
      authApi.CREATE_NEW_USER_API(payload)
        .then(() => {
          dispatch("LOAD_USERS")
        })
        .catch(err => {
          console.log("errors: ", err)
        })
    },
    UPDATE_LIMITATIONS({commit, dispatch}, payload){
      authApi.UPDATE_LIMITATIONS_API(payload)
      .then(() => {
        dispatch("LOAD_USERS")
      })
    },
  }
}