import axios from "axios";
import {API_HANDLER} from "@/config";

export default {   
  NEW_OR_UPDATE_VISTA_API(payload){
    if (payload.hasOwnProperty("id")) {
      return axios.put(API_HANDLER.database_api+"vistas/"+payload.id, payload)            
    } else {
      return axios.post(API_HANDLER.database_api+"vistas/", payload)            
    }
  },
  DELETE_VISTA_API(payload){
    return axios.delete(API_HANDLER.database_api+"vistas/"+payload)
  },
  UPDATE_VISTA_IMAGE_API(payload){
    return axios.put(API_HANDLER.database_api+"vista-image/"+localStorage.getItem("vistaId"), payload)      
  },
}