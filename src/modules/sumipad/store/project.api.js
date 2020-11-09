import axios from "axios";
import {API_HANDLER} from "@/config";

export default {   
  API_RETRIEVE(payload){
    return axios.post(API_HANDLER.database_api+"project/", payload)
  },  
}