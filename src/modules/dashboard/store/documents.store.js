
import documentsApi from "./documents.api"
export const documents = {
  actions: {   
    NEW_OR_UPDATE_PROJECT_DOCUMENT({commit, dispatch}, payload){
      documentsApi.NEW_OR_UPDATE_DOCUMENT_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    DELETE_DOCUMENT({commit, dispatch}, payload){
      documentsApi.DELETE_DOCUMENT_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },  
    UPDATE_DOCUMENT_PDF({commit, dispatch}, payload){
      documentsApi.UPDATE_DOCUMENT_PDF_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    }, 
    UPDATE_DOCUMENT_IMAGE({commit, dispatch}, payload){
      documentsApi.UPDATE_DOCUMENT_IMAGE_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },  
  }
}