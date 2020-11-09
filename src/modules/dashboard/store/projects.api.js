import axios from "axios";
import {API_HANDLER} from "@/config";

export default {   
  LOAD_PROJECTS_API(){
    return axios.get(API_HANDLER.database_api+"projects/")
  },
  LOAD_PROJECT_API(payload){
    return axios.get(API_HANDLER.database_api+"projects/"+payload+"/")
  },
  CREATE_NEW_PROJECT_API(payload){
    return axios.post(API_HANDLER.database_api+"projects/", payload)
  },
  UPDATE_PROJECT_AVATAR_API(payload){
    return axios.put(API_HANDLER.database_api+"thumbsnail/", payload)
  },
  UPDATE_PROJECT_CONTENT_API(payload){
    return axios.put(API_HANDLER.database_api+"projects/"+localStorage.getItem("projectId")+"/", payload)
  },
  NEW_PROJECT_SLIDESHOW_API(payload){
    return axios.post(API_HANDLER.database_api+"slideshows/", payload)
  },
  DELETE_PROJECT_SLIDESHOW_API(payload){
    return axios.delete(API_HANDLER.database_api+"slideshows/"+payload.id)
  },
}