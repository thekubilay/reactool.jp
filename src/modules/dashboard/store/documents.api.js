import axios from "axios";
import {API_HANDLER} from "@/config";

export default {   
  NEW_OR_UPDATE_DOCUMENT_API(payload){
    if (payload.hasOwnProperty("id")) {
      return axios.put(API_HANDLER.database_api+"document/"+payload.id, payload)            
    } else {
      return axios.post(API_HANDLER.database_api+"document/", payload)            
    }
  },
  DELETE_DOCUMENT_API(payload){
    return axios.delete(API_HANDLER.database_api+"document/"+payload)
  },
  UPDATE_DOCUMENT_PDF_API(payload){
    return axios.put(API_HANDLER.database_api+"document-pdf/"+localStorage.getItem("docId"), payload)      
  },
  UPDATE_DOCUMENT_IMAGE_API(payload){
    return axios.put(API_HANDLER.database_api+"document-image/"+localStorage.getItem("docId"), payload)      
  },
}
