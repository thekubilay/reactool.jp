
import unitApi from "./unit.api"
export const unit = {
  actions: {
    UPDATE_PROJECT_UNIT({commit, dispatch}, payload){
      unitApi.UPDATE_UNIT_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },   
  }
}