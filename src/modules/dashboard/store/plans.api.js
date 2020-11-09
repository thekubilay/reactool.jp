import axios from "axios";
import {API_HANDLER} from "@/config";

export default {   
  NEW_PROJECT_LANDPLAN_API(payload){
    return axios.post(API_HANDLER.database_api+"landplans/", payload)
  },
  DELETE_PROJECT_LANDPLAN_API(payload){
    return axios.delete(API_HANDLER.database_api+"landplans/"+payload.id)
  },
  NEW_PROJECT_ELEVATION_API(payload){
    return axios.post(API_HANDLER.database_api+"elevations/", payload)
  },
  DELETE_PROJECT_ELEVATION_API(payload){
    return axios.delete(API_HANDLER.database_api+"elevations/"+payload.id)
  },
  NEW_PROJECT_FLOORPLAN_API(payload){
    return axios.post(API_HANDLER.database_api+"floorplans/", payload)
  },
  DELETE_PROJECT_FLOORPLAN_API(payload){
    return axios.delete(API_HANDLER.database_api+"floorplans/"+payload.id)
  },
  NEW_OR_UPDATE_PROJECT_PLAN_API(payload){
    if (payload.hasOwnProperty("id")) {
      return axios.put(API_HANDLER.database_api+"plans/"+payload.id, payload)            
    } else {
      return axios.post(API_HANDLER.database_api+"plans/", payload)            
    }
  },
  DELETE_PLAN_API(payload){
    return axios.delete(API_HANDLER.database_api+"plans/"+payload)          
  },
  UPDATE_PROJECT_PLAN_IMAGE_API(payload){
    return axios.put(API_HANDLER.database_api+"plan-image/"+localStorage.getItem("planId"), payload)      
  },
}
