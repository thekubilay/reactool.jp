import axios from "axios";
import {API_HANDLER} from "@/config";

export default {   
  CREATE_NEW_COORD_API(payload){
    if (payload.hasOwnProperty("id")) {
      return axios.put(API_HANDLER.database_api+"gmap/"+payload.id, payload)            
    } else {
      return axios.post(API_HANDLER.database_api+"coords/", payload)            
    }
  },
  DELETE_COORD_API(payload){
    return axios.delete(API_HANDLER.database_api+"gmap/"+payload)
  },
}