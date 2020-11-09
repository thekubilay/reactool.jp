import axios from "axios";
import {API_HANDLER} from "@/config";

export default {   
  NEW_PROJECT_GALLERY_API(payload){
    return axios.post(API_HANDLER.database_api+"gallery/", payload)
  },
  DELETE_PROJECT_GALLERY_API(payload){
    return axios.delete(API_HANDLER.database_api+"gallery/"+payload.id)
  },
}