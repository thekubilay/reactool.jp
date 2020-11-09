import plansApi from "./plans.api"
export const plans = {
  actions: {
    NEW_PROJECT_LANDPLAN({commit, dispatch}, payload){
      plansApi.NEW_PROJECT_LANDPLAN_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    DELETE_PROJECT_LANDPLAN({commit, dispatch}, payload){
      plansApi.DELETE_PROJECT_LANDPLAN_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    NEW_PROJECT_ELEVATION({commit, dispatch}, payload){
      plansApi.NEW_PROJECT_ELEVATION_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    DELETE_PROJECT_ELEVATION({commit, dispatch}, payload){
      plansApi.DELETE_PROJECT_ELEVATION_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    NEW_PROJECT_FLOORPLAN({commit, dispatch}, payload){
      plansApi.NEW_PROJECT_FLOORPLAN_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    DELETE_PROJECT_FLOORPLAN({commit, dispatch}, payload){
      plansApi.DELETE_PROJECT_FLOORPLAN_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    NEW_OR_UPDATE_PROJECT_PLAN({commit, dispatch}, payload){
      plansApi.NEW_OR_UPDATE_PROJECT_PLAN_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    DELETE_PROJECT_PLAN({commit, dispatch}, payload){
      plansApi.DELETE_PLAN_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },
    UPDATE_PROJECT_PLAN_IMAGE({commit, dispatch}, payload){
      plansApi.UPDATE_PROJECT_PLAN_IMAGE_API(payload)
      .then(() => {
        dispatch("LOAD_PROJECT")
      })
      .catch(err => {
        console.log(err)
      })
    },    
  }
}