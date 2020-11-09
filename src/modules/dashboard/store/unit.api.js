import axios from "axios";
import {API_HANDLER} from "@/config";

export default {   
  UPDATE_UNIT_API(payload){
    return axios.put(API_HANDLER.database_api+"unit/"+payload.id, payload)      
  },
}
