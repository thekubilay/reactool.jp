import vistasApi from "./vistas.api"
export const vistas = {
  actions: {   
    NEW_OR_UPDATE_PROJECT_VISTA({commit, dispatch}, payload){
      vistasApi.NEW_OR_UPDATE_VISTA_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    DELETE_PROJECT_VISTA({commit, dispatch}, payload){
      vistasApi.DELETE_VISTA_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },  
    UPDATE_PROJECT_VISTA_IMAGE({commit, dispatch}, payload){
      vistasApi.UPDATE_VISTA_IMAGE_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },  
  }
}