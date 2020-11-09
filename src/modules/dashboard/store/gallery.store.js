
import galleryApi from "./gallery.api"
export const gallery = {
  actions: {   
    NEW_PROJECT_GALLERY({commit, dispatch}, payload){
      galleryApi.NEW_PROJECT_GALLERY_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    DELETE_PROJECT_GALLERY({commit, dispatch}, payload){
      galleryApi.DELETE_PROJECT_GALLERY_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },  
  }
}