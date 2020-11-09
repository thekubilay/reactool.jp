import coordsApi from "./coords.api"
export const gmapApi = {
  actions: {
    NEW_OR_UPDATE_PROJECT_COORD({commit, dispatch}, payload){
      coordsApi.CREATE_NEW_COORD_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    DELETE_COORD({commit, dispatch}, payload){
      coordsApi.DELETE_COORD_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}